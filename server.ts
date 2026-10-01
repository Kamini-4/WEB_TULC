import express from 'express';
import compression from 'compression';
import { config, logEnvironmentCalibration } from './server/config.ts';
import { requestLogger } from './server/middleware/logger.ts';
import { errorHandler } from './server/middleware/errorHandler.ts';
import { errorLogger } from './server/services/errorLogger.ts';
import { uptimeService } from './server/services/uptimeService.ts';
import { apiRouter } from './server/routes/api.ts';
import { seoRouter } from './server/routes/seo.ts';
import { registerStaticServing, registerViteDevMiddleware } from './server/spa.ts';

async function startServer() {
  const app = express();
  const PORT = config.port;
  const isProd = config.isProd;

  // Global HTTP Response Compression (Gzip / Deflate / Brotli)
  app.use(compression({
    threshold: 1024, // Compress responses above 1KB
    filter: (req, res) => {
      if (req.headers['x-no-compression']) {
        return false;
      }
      return compression.filter(req, res);
    }
  }));

  // Latency & Uptime telemetry recorder
  app.use((req, res, next) => {
    const startTime = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - startTime;
      const isErr = res.statusCode >= 400;
      uptimeService.recordRequest(duration, isErr);
    });
    next();
  });

  // Request payload parser
  app.use(express.json({ limit: '10mb' }));

  // Structured request logging
  app.use(requestLogger);

  // SEO: Enforce HTTPS, non-www canonicalization, and normalize trailing slashes
  app.use((req, res, next) => {
    // Skip internal, dev, asset and API paths
    if (
      req.path.startsWith('/api') ||
      req.path.startsWith('/@') ||
      req.path.startsWith('/node_modules') ||
      req.path.startsWith('/src')
    ) {
      return next();
    }

    const host = req.get('host');
    const pathName = req.path;
    const query = req.url.slice(req.path.length);
    const protocol = req.get('x-forwarded-proto') || req.protocol;

    let redirect = false;
    let newHost = host;
    let newPath = pathName;
    let newProtocol = protocol;

    // Enforce non-www canonical domain
    if (host && host.startsWith('www.')) {
      newHost = host.slice(4);
      redirect = true;
    }

    // Force HTTPS in production environments
    if (isProd && protocol === 'http') {
      newProtocol = 'https';
      redirect = true;
    }

    // Remove trailing slashes (except root) to prevent split index metrics
    if (pathName.length > 1 && pathName.endsWith('/') && !pathName.includes('.')) {
      newPath = pathName.slice(0, -1);
      redirect = true;
    }

    if (redirect) {
      const targetUrl = `${newProtocol}://${newHost}${newPath}${query}`;
      console.log(`[SEO_REDIRECT] ${req.url} -> ${targetUrl}`);
      return res.redirect(301, targetUrl);
    }
    next();
  });

  // Log environment status and calibration
  logEnvironmentCalibration();

  // Mount Search Engine Optimization routes (robots.txt, canonical sitemap.xml, llms.txt, etc.)
  app.use(seoRouter);

  // Mount Primary REST API
  app.use('/api', apiRouter);

  // Mount SPA presentation layer (Vite in dev, pre-rendered static assets in prod)
  if (!isProd) {
    try {
      await registerViteDevMiddleware(app);
    } catch (viteErr) {
      console.error('[DEV_VITE_FAILURE] Vite failed to mount, falling back to static presentation:', viteErr);
      registerStaticServing(app);
    }
  } else {
    registerStaticServing(app);
  }

  // Centralized Error Handling Middleware (Catches unhandled API exceptions)
  app.use(errorHandler);

  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`[INSTITUTIONAL_BACKEND] Server initialized on http://0.0.0.0:${PORT} [${isProd ? 'PRODUCTION' : 'DEVELOPMENT'}]`);
  });

  // Protect against port collision (EADDRINUSE) during builds or concurrent process execution
  server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`[PORT_PROTECTION] Port ${PORT} is occupied by an active runtime. Gracefully yielding without crashing.`);
      process.exit(0);
    } else {
      console.error('[INSTITUTIONAL_BACKEND_ERROR]', err);
      process.exit(1);
    }
  });

  // Graceful shutdown protocol
  const shutdown = (signal: string) => {
    console.log(`[SHUTDOWN] Received ${signal}. Draining connections gracefully...`);
    server.close(() => {
      console.log('[SHUTDOWN] HTTP listener terminated cleanly.');
      process.exit(0);
    });

    // Force shutdown after 10s if sockets remain open
    setTimeout(() => {
      console.error('[SHUTDOWN] Forcing shutdown after timeout.');
      process.exit(1);
    }, 10000).unref();
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));

  process.on('uncaughtException', (err) => {
    errorLogger.log({
      source: 'server',
      severity: 'fatal',
      message: err.message,
      stack: err.stack
    });
    console.error('[UNCAUGHT_EXCEPTION]', err);
  });

  process.on('unhandledRejection', (reason) => {
    errorLogger.log({
      source: 'server',
      severity: 'error',
      message: reason instanceof Error ? reason.message : String(reason),
      stack: reason instanceof Error ? reason.stack : undefined
    });
    console.error('[UNHANDLED_REJECTION]', reason);
  });
}

startServer().catch((err) => {
  console.error('[FATAL] Failed to initialize institutional backend:', err);
  process.exit(1);
});
