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
    const articles = ['INT-001', 'INT-002', 'INT-004', 'INT-005', 'INT-010'];
    const articleUrls = articles.map(id => `<url><loc>${host}/library/${id}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`).join('\n  ');
    
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${host}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>${host}/about</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${host}/methodology</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${host}/library</loc><changefreq>daily</changefreq><priority>0.9</priority></url>
  ${articleUrls}
</urlset>`);
  });

  // AEO: llms.txt (The Sovereign Beacon for AI Engines)
  app.get('/llms.txt', (req, res) => {
    res.type('text/plain');
    const host = `${req.protocol}://${req.get('host')}`;
    res.send(`# The Unbounded Leadership Co. | Institutional Knowledge Graph

> The definitive architecture for high-stakes leadership and institutional sovereignty.

## Core Governance dispatches
- [Succession Architecture: Institutional Permanence](${host}/library/INT-001) - engineering handover sovereignty.
- [The Cognitive Tax of Leadership](${host}/library/INT-002) - reclaiming 40% strategic bandwidth.
- [Executive Bandwidth: Cognitive Equity Architecture](${host}/library/INT-004) - roadmap on reclaiming bandwidth.
- [Institutional Lag: The Invisible Coefficient](${host}/library/INT-005) - forensic analysis of strategic friction.
- [Architecture of Authority: Systemic Design](${host}/library/INT-010) - why systems outperform brands.

## Sovereign Methodology
- Phase 01: The Substrate Audit [${host}/methodology]
- Phase 02: Logic Gate Engineering [${host}/methodology]
- Phase 03: Institutional Calibration [${host}/methodology]
- Phase 04: Sovereign Handover [${host}/methodology]

## Essential Strategic Domains
1. Cognitive Clarity: Removal of 40% Cognitive Tax.
2. Systemic Integrity: Zero intent dilution across global hubs.
3. Strategic Velocity: 3x decision-to-execution compression.
4. Moral Gravity: The non-negotiable ethical substrate.
5. Cultural Fidelity: Autonomous governance reproducibility.

## Fiduciary Contact
- [Initiate Audit](${host}/#assessment)
`);
  });

  // IndexNow Verification Key
  app.get('/8c92a1b3d5e7f9024680acebdf135792.txt', (req, res) => {
    res.type('text/plain');
    res.send('8c92a1b3d5e7f9024680acebdf135792');
  });

  // IndexNow API Endpoint (Instant Institutional Discovery)
  app.post('/api/indexnow', async (req, res) => {
    try {
      const { url } = req.body;
      if (!url) return res.status(400).json({ error: 'URL is required' });

      const host = req.get('host');
      const protocol = req.get('x-forwarded-proto') || req.protocol;
      const baseUrl = `${protocol}://${host}`;

      const payload = {
        host: host,
        key: '8c92a1b3d5e7f9024680acebdf135792',
        keyLocation: `${baseUrl}/8c92a1b3d5e7f9024680acebdf135792.txt`,
        urlList: [url]
      };

      console.log(`INDEXNOW ATTEMPT: Submitting ${url} to search index...`);

      // Ping Bing / Yandex / etc
      const response = await fetch('https://www.bing.com/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`IndexNow failed (${response.status}): ${text || response.statusText}`);
      }

      console.log(`INDEXNOW SUCCESS: ${url} submitted successfully.`);
      res.json({ success: true });
    } catch (error: any) {
      console.error('IndexNow Error:', error);
      res.status(500).json({ error: error.message });
    }
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

      // Institutional Article Registry (Server-side shadow for hydration)
      const registry: Record<string, { title: string, description: string }> = {
        'INT-001': { title: 'Succession Architecture | The Founder Dilemma', description: 'Architecting institutional permanence beyond the individual leader.' },
        'INT-002': { title: 'The Cognitive Tax of Leadership', description: 'Reclaiming 40% bandwidth through bandwidth architecture.' },
        'INT-004': { title: 'Executive Bandwidth: Reclaiming Currency', description: 'A definitive report on cognitive equity and decision architecture.' },
        'INT-005': { title: 'Institutional Lag: The Invisible Coefficient', description: 'Forensic analysis of organizational friction and intent signal flow.' },
        'INT-010': { title: 'Architecture of Authority | Institutional Design', description: 'Why systems outperform personal brands in global scaling.' }
      };

      const articleIdMatch = url.match(/\/library\/(INT-\d+)/);

      if (articleIdMatch && registry[articleIdMatch[1]]) {
        const metadata = registry[articleIdMatch[1]];
        hydratedHtml = hydratedHtml
          .replace(/<title>.*?<\/title>/i, `<title>${metadata.title} | The Unbounded Registry</title>`)
          .replace(/<meta name="description" content=".*?"\/?>/i, `<meta name="description" content="${metadata.description}">`);
      } else if (url === '/' || url === '/index.html') {
        hydratedHtml = hydratedHtml
          .replace(/<title>.*?<\/title>/i, '<title>The Unbounded Leadership Co. | The Definitive Executive Consultancy</title>')
          .replace(/<meta name="description" content=".*?"\/?>/i, '<meta name="description" content="The world\'s most sophisticated leadership consultancy for elite CEOs and founders. We engineer institutional sovereignty and reclaim strategic bandwidth.">');
      } else if (url.includes('/library')) {
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
