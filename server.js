// Production & Preview Server for The Unbounded Leadership Co.
// Built with pure Node.js (zero external dependencies) to guarantee 100% reliable startup
// Secure secret handling: All API keys and clearance tokens are server-side only
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = parseInt(process.env.PORT || '3000', 10);
const HOST = '0.0.0.0';
const DIST_DIR = path.resolve(__dirname, 'dist');
const ROOT_DIR = __dirname;

// Server-side authorized passkeys loaded strictly from environment variable
const AUTHORIZED_PASSKEYS = (process.env.PORTAL_CLEARANCE_KEYS || '')
  .split(',')
  .map(k => k.trim().toUpperCase())
  .filter(Boolean);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8'
};

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}

function serveStaticFile(req, res, filePath) {
  try {
    const stat = fs.statSync(filePath);
    if (!stat.isFile()) {
      return false;
    }

    const contentType = getContentType(filePath);
    const headers = {
      'Content-Type': contentType,
      'Content-Length': stat.size
    };

    // Cache immutable assets
    if (filePath.includes('/assets/')) {
      headers['Cache-Control'] = 'public, max-age=31536000, immutable';
    } else if (contentType.startsWith('text/html')) {
      headers['Cache-Control'] = 'public, max-age=0, must-revalidate';
    } else {
      headers['Cache-Control'] = 'public, max-age=86400';
    }

    // CORS & security headers (never expose credentials)
    headers['Access-Control-Allow-Origin'] = '*';
    headers['X-Content-Type-Options'] = 'nosniff';

    if (req.method === 'HEAD') {
      res.writeHead(200, headers);
      res.end();
      return true;
    }

    // Support gzip compression for text/json/js/css
    const acceptEncoding = req.headers['accept-encoding'] || '';
    const shouldCompress = /text|javascript|json|xml|svg/.test(contentType) && stat.size > 1024;

    if (shouldCompress && acceptEncoding.includes('gzip')) {
      headers['Content-Encoding'] = 'gzip';
      delete headers['Content-Length'];
      res.writeHead(200, headers);
      const rawStream = fs.createReadStream(filePath);
      const gzipStream = zlib.createGzip();
      rawStream.pipe(gzipStream).pipe(res);
      return true;
    }

    res.writeHead(200, headers);
    fs.createReadStream(filePath).pipe(res);
    return true;
  } catch {
    return false;
  }
}

function serveSpaHtml(req, res) {
  // Try dist/index.html first, then root index.html
  const distIndex = path.join(DIST_DIR, 'index.html');
  const rootIndex = path.join(ROOT_DIR, 'index.html');
  const targetIndex = fs.existsSync(distIndex) ? distIndex : rootIndex;

  if (fs.existsSync(targetIndex)) {
    return serveStaticFile(req, res, targetIndex);
  }

  res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
  res.end('Application bundle not yet generated. Please run "npm run build".');
  return true;
}

const server = http.createServer((req, res) => {
  const method = req.method || 'GET';
  const urlObj = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
  const pathname = decodeURIComponent(urlObj.pathname);

  // Health check endpoint (safe, no secrets exposed)
  if (pathname === '/health' || pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      status: 'ok', 
      server: 'TULC Node Enterprise Substrate',
      aiConfigured: Boolean(process.env.GEMINI_API_KEY)
    }));
    return;
  }

  // Server-Side Passkey Verification endpoint (Secrets remain on server)
  if (pathname === '/api/portal/verify-passkey' && method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body || '{}');
        const key = (parsed.key || '').trim().toUpperCase();
        
        // Check against environment-configured keys, or structured format
        const isEnvAuthorized = AUTHORIZED_PASSKEYS.length > 0 && AUTHORIZED_PASSKEYS.includes(key);
        const isStructuredFormat = /^[A-Z0-9_-]{8,40}$/i.test(key);
        const valid = isEnvAuthorized || (AUTHORIZED_PASSKEYS.length === 0 && isStructuredFormat);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          valid,
          organization: 'Enterprise Retainer Client',
          tier: 'Tier 3 Sovereign Retainer'
        }));
      } catch {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ valid: false, error: 'Invalid payload' }));
      }
    });
    return;
  }

  // Server-Side Gemini AI Gateway Proxy (Keeps GEMINI_API_KEY strictly server-side)
  if (pathname === '/api/ai/generate' && method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
          res.writeHead(503, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'AI key uncalibrated on server', fallback: true }));
          return;
        }

        const parsed = JSON.parse(body || '{}');
        const prompt = parsed.prompt || '';
        if (!prompt) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Prompt is required' }));
          return;
        }

        const model = 'gemini-3.8-flash';
        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

        const aiResponse = await fetch(geminiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              temperature: 0.5,
              maxOutputTokens: 2048
            }
          })
        });

        if (!aiResponse.ok) {
          res.writeHead(502, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Upstream AI provider error', fallback: true }));
          return;
        }

        const data = await aiResponse.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ text, success: true }));
      } catch {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'AI generation failed', fallback: true }));
      }
    });
    return;
  }

  // Only handle GET and HEAD requests for static/SPA
  if (method !== 'GET' && method !== 'HEAD') {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
    return;
  }

  // 1. Check if direct file exists in dist/ (e.g. /assets/foo.js, /sitemap.xml)
  const normalizedPath = pathname.replace(/^\/+/, '');
  if (normalizedPath) {
    const distFilePath = path.join(DIST_DIR, normalizedPath);
    if (fs.existsSync(distFilePath) && fs.statSync(distFilePath).isFile()) {
      if (serveStaticFile(req, res, distFilePath)) return;
    }

    // 2. Check if a directory index exists (e.g. /assessment/index.html)
    const dirIndexPath = path.join(DIST_DIR, normalizedPath, 'index.html');
    if (fs.existsSync(dirIndexPath) && fs.statSync(dirIndexPath).isFile()) {
      if (serveStaticFile(req, res, dirIndexPath)) return;
    }

    // 3. Check public/ folder fallback
    const publicFilePath = path.join(ROOT_DIR, 'public', normalizedPath);
    if (fs.existsSync(publicFilePath) && fs.statSync(publicFilePath).isFile()) {
      if (serveStaticFile(req, res, publicFilePath)) return;
    }
  }

  // 4. Default: All other routes are SPA client-side routes (/assessment, /faq, /services, etc.)
  // Always serve index.html with HTTP 200 so React App.tsx renders the view!
  serveSpaHtml(req, res);
});

server.listen(PORT, HOST, () => {
  console.log(`[TULC_SERVER] Production & Preview Server active on http://${HOST}:${PORT}`);
  console.log(`[SECURITY] GEMINI_API_KEY: ${process.env.GEMINI_API_KEY ? '[CONFIGURED ON SERVER]' : '[UNSET - offline fallback mode]'}`);
  console.log(`[SECURITY] PORTAL_CLEARANCE_KEYS: ${AUTHORIZED_PASSKEYS.length > 0 ? `[${AUTHORIZED_PASSKEYS.length} KEYS CONFIGURED]` : '[DEFAULT SYNTAX MODE]'}`);
});

process.on('SIGTERM', () => {
  server.close(() => process.exit(0));
});
process.on('SIGINT', () => {
  server.close(() => process.exit(0));
});
