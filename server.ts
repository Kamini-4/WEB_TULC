import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;
  const isProd = process.env.NODE_ENV === 'production';
  const isAISPreview = process.env.K_SERVICE === undefined || process.env.DISABLE_HMR === 'true';

  app.use(express.json());

  // Force development mode in AIS preview unless explicitly set to production
  const useVite = !isProd && isAISPreview;

  // SEO: Enforce HTTPS, non-www, and remove trailing slashes
  app.use((req, res, next) => {
    const host = req.get('host');
    const pathName = req.path;
    const query = req.url.slice(req.path.length);
    const protocol = req.get('x-forwarded-proto') || req.protocol;
    
    let redirect = false;
    let newHost = host;
    let newPath = pathName;
    let newProtocol = protocol;

    // Enforce non-www (Total Brand Authority)
    if (host && host.startsWith('www.')) {
      newHost = host.slice(4);
      redirect = true;
    }

    // Force HTTPS in production (Institutional Trust)
    if (isProd && protocol === 'http') {
      newProtocol = 'https';
      redirect = true;
    }

    // Remove trailing slashes (except for root) to prevent duplicate content
    if (pathName.length > 1 && pathName.endsWith('/')) {
      newPath = pathName.slice(0, -1);
      redirect = true;
    }

    if (redirect) {
      const targetUrl = `${newProtocol}://${newHost}${newPath}${query}`;
      console.log(`SEO REDIRECT: ${req.url} -> ${targetUrl}`);
      return res.redirect(301, targetUrl);
    }
    next();
  });

  console.log(`SERVER STARTING V5 - PORT: ${PORT} - IS_PROD: ${isProd}`);

  // Diagnostic: Check if dist folder exists and list files
  const distPath = path.join(process.cwd(), 'dist');
  import('fs').then(fs => {
    if (fs.existsSync(distPath)) {
      console.log(`Diagnostic: dist folder found at ${distPath}`);
      const files = fs.readdirSync(distPath);
      console.log(`Diagnostic: Files in dist: ${files.join(', ')}`);
    } else {
      console.error(`Diagnostic: dist folder NOT FOUND at ${distPath}`);
    }
  }).catch(err => console.error('Diagnostic: Failed to run file check', err));

  // API routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // SEO: Robots.txt
  app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send(`User-agent: *\nAllow: /\nSitemap: ${req.protocol}://${req.get('host')}/sitemap.xml`);
  });

  // SEO: Sitemap.xml
  app.get('/sitemap.xml', (req, res) => {
    res.type('application/xml');
    const host = `${req.protocol}://${req.get('host')}`;
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${host}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>${host}/about</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${host}/methodology</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${host}/library</loc><changefreq>daily</changefreq><priority>0.9</priority></url>
  <url><loc>${host}/case-studies</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
</urlset>`);
  });

  // Gemini Proxy Endpoint
  app.post('/api/ai/generate', async (req, res) => {
    try {
      const { model, contents, config } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(500).json({ error: 'GEMINI_API_KEY is not configured on the server.' });
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: model || 'gemini-2.0-flash',
        contents,
        config
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.error('Gemini Proxy Error:', error);
      res.status(500).json({ error: error.message || 'Failed to generate content' });
    }
  });

  if (useVite) {
    // Vite middleware for development
    console.log('Starting in DEVELOPMENT mode (Vite Middleware)');
    try {
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    } catch (e) {
      console.error('Vite failed to load, falling back to static serving', e);
      serveStatic(app);
    }
  } else {
    // Serve static files in production
    console.log('Starting in PRODUCTION mode');
    serveStatic(app);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

function serveStatic(app: express.Express) {
  // Use __dirname for more reliable path resolution in containers
  let distPath = path.resolve(__dirname, 'dist');
  
  // Fallback to process.cwd() if __dirname/dist doesn't exist
  if (!fs.existsSync(distPath)) {
    distPath = path.resolve(process.cwd(), 'dist');
  }
  
  console.log(`Diagnostic: Serving static files from: ${distPath}`);

  app.use(express.static(distPath));
  
  // SPA fallback: serve index.html for all other routes
  app.get('*', (req, res) => {
    const indexPath = path.join(distPath, 'index.html');
    
    fs.readFile(indexPath, 'utf-8', (err, html) => {
      if (err) {
        console.error(`Error reading index.html from ${indexPath}:`, err);
        return res.status(404).send('Application Loading Errors.');
      }

      // Metadata Hydration: Inject dynamic meta tags based on the route
      let hydratedHtml = html;
      const url = req.path;

      if (url.includes('/library')) {
        hydratedHtml = hydratedHtml
          .replace(/<title>.*?<\/title>/i, '<title>The Registry | Unbounded Leadership Registry & Executive Consultancy dispatches</title>')
          .replace(/<meta name="description" content=".*?"\/?>/i, '<meta name="description" content="A curated archive of leadership architecture dispatches and strategic intelligence for sovereign leaders.">')
          .replace(/<meta name="keywords" content=".*?"\/?>/i, '<meta name="keywords" content="leadership library, executive consultancy dispatches, institutional dispatches, leadership research, CEO intelligence">');
      } else if (url.includes('/methodology')) {
        hydratedHtml = hydratedHtml
          .replace(/<title>.*?<\/title>/i, '<title>The Sovereign Methodology | Architectural Leadership Consultancy</title>')
          .replace(/<meta name="description" content=".*?"\/?>/i, '<meta name="description" content="Our formulaic approach to institutional stability: Baseline Audit, Structural Transformation, and Sustained Sovereignty.">')
          .replace(/<meta name="keywords" content=".*?"\/?>/i, '<meta name="keywords" content="leadership methodology, consultancy framework, institutional transformation, sovereignty audit, leadership systems">');
      } else if (url.includes('/about')) {
        hydratedHtml = hydratedHtml
          .replace(/<title>.*?<\/title>/i, '<title>About Us | The Premium Leadership Architecture Consultancy</title>')
          .replace(/<meta name="description" content=".*?"\/?>/i, '<meta name="description" content="We are the definitive leadership architecture consultancy for high-stakes principals.">');
      }
      
      res.send(hydratedHtml);
    });
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
