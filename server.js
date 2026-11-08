// Production & Preview Server for The Unbounded Leadership Co.
// Built with pure Node.js (zero external dependencies) to guarantee 100% reliable startup
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

    // CORS & iframe embedding headers
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

  // Health check endpoint
  if (pathname === '/health' || pathname === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', time: new Date().toISOString() }));
    return;
  }

  // API Passkey Verification endpoint
  if (pathname === '/api/portal/verify-passkey' && method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const parsed = JSON.parse(body || '{}');
        const key = (parsed.key || '').trim().toUpperCase();
        const valid = key.startsWith('TULC-') || key.length >= 8;
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
  // Always serve index.html with HTTP 200 so React Router / App.tsx renders the view!
  serveSpaHtml(req, res);
});

server.listen(PORT, HOST, () => {
  console.log(`[TULC_SERVER] Production & Preview Server active on http://${HOST}:${PORT}`);
});

process.on('SIGTERM', () => {
  server.close(() => process.exit(0));
});
process.on('SIGINT', () => {
  server.close(() => process.exit(0));
});
