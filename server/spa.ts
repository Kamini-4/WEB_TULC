import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Institutional Article Registry (Server-side shadow for hydration)
const ARTICLE_METADATA_REGISTRY: Record<string, { title: string; description: string }> = {
  'INT-010': { title: 'Architecture of Authority | Institutional Design', description: 'Why systems outperform personal brands in global scaling.' },
  'architecture-of-authority': { title: 'Architecture of Authority | Institutional Design', description: 'Why systems outperform personal brands in global scaling.' },
  
  'INT-011': { title: 'Strategic Substrates | The Invisible Tax', description: 'How aligning mental models at the board level yields compounding institutional velocity.' },
  'strategic-substrates': { title: 'Strategic Substrates | The Invisible Tax', description: 'How aligning mental models at the board level yields compounding institutional velocity.' },
  
  'INT-012': { title: 'Aligned Leadership in the Cybernetic Era', description: 'Transitioning from individual effort to systemic intelligence in AI-Native governance.' },
  'aligned-leadership': { title: 'Aligned Leadership in the Cybernetic Era', description: 'Transitioning from individual effort to systemic intelligence in AI-Native governance.' },
  
  'INT-001': { title: 'Succession Architecture | The Founder Dilemma', description: 'Architecting institutional permanence beyond the individual leader.' },
  'founders-dilemma': { title: 'Succession Architecture | The Founder Dilemma', description: 'Architecting institutional permanence beyond the individual leader.' },
  
  'INT-002': { title: 'The Cognitive Tax of Leadership', description: 'Reclaiming 40% bandwidth through bandwidth architecture.' },
  'cognitive-tax-of-leadership': { title: 'The Cognitive Tax of Leadership', description: 'Reclaiming 40% bandwidth through bandwidth architecture.' },
  
  'INT-003': { title: 'Bridging the Strategy-Execution Gap', description: 'Calibrating the gap between Board expectations and operational reality.' },
  'bridging-strategy-execution-gap': { title: 'Bridging the Strategy-Execution Gap', description: 'Calibrating the gap between Board expectations and operational reality.' },
  
  'INT-004': { title: 'Executive Bandwidth: Reclaiming Currency', description: 'A definitive report on cognitive equity and decision architecture.' },
  'reclaiming-strategic-bandwidth': { title: 'Executive Bandwidth: Reclaiming Currency', description: 'A definitive report on cognitive equity and decision architecture.' },
  
  'INT-005': { title: 'Institutional Lag: The Invisible Coefficient', description: 'Forensic analysis of organizational friction and intent signal flow.' },
  'institutional-lag': { title: 'Institutional Lag: The Invisible Coefficient', description: 'Forensic analysis of organizational friction and intent signal flow.' },
  
  'INT-006': { title: 'Engineering Strategic Bandwidth', description: 'Reclaiming up to 40% of cognitive capacity at scale.' },
  'engineering-strategic-bandwidth': { title: 'Engineering Strategic Bandwidth', description: 'Reclaiming up to 40% of cognitive capacity at scale.' },
  
  'INT-007': { title: 'Aligned Leadership vs. Reactive Management', description: 'Transitioning from heroic intervention to architectural command.' },
  'aligned-authority-vs-reactive-management': { title: 'Aligned Leadership vs. Reactive Management', description: 'Transitioning from heroic intervention to architectural command.' },
  
  'INT-008': { title: 'The Physics of Inevitability', description: 'Why systems outperform individual talent in organizational design.' },
  'physics-of-inevitability': { title: 'The Physics of Inevitability', description: 'Why systems outperform individual talent in organizational design.' },
  
  'INT-009': { title: 'The Cost of Organizational Latency', description: 'Measuring and neutralizing the inaction tax in global enterprises.' },
  'cost-of-organizational-latency': { title: 'The Cost of Organizational Latency', description: 'Measuring and neutralizing the inaction tax in global enterprises.' }
};

export function hydrateHtmlMetadata(html: string, url: string): string {
  let hydratedHtml = html;
  const articleMatch = url.match(/\/library\/([a-zA-Z0-9\-_]+)/);

  if (articleMatch && ARTICLE_METADATA_REGISTRY[articleMatch[1]]) {
    const metadata = ARTICLE_METADATA_REGISTRY[articleMatch[1]];
    const schema = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": metadata.title,
      "description": metadata.description,
      "author": { "@type": "Organization", "name": "The Unbounded Leadership Co." },
      "publisher": { "@type": "Organization", "name": "The Unbounded Leadership Co." }
    });
    const pageTitle = `${metadata.title.length > 32 ? metadata.title.slice(0, 32) + '...' : metadata.title} | Unbounded`;
    const pageDesc = `${metadata.description.slice(0, 120)} Leadership architecture intelligence.`;
    hydratedHtml = hydratedHtml
      .replace(/<title>.*?<\/title>/i, `<title>${pageTitle}</title>`)
      .replace(/<meta name="description" content=".*?"\/?>/i, `<meta name="description" content="${pageDesc}">`)
      .replace('</head>', `<script type="application/ld+json">${schema}</script></head>`);
  } else if (url === '/' || url === '/index.html' || url === '') {
    const schema = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "The Unbounded Leadership Co.",
      "description": "Definitive executive consultancy and leadership architecture firm for elite leaders, driving institutional alignment, cognitive clarity, and structural growth."
    });
    hydratedHtml = hydratedHtml
      .replace(/<title>.*?<\/title>/i, '<title>The Unbounded Leadership Co. | Executive Consulting</title>')
      .replace(/<meta name="description" content=".*?"\/?>/i, '<meta name="description" content="Definitive executive consultancy and leadership architecture firm for elite leaders, driving institutional alignment, cognitive clarity, and structural growth.">')
      .replace('</head>', `<script type="application/ld+json">${schema}</script></head>`);
  } else if (url.includes('/library')) {
    hydratedHtml = hydratedHtml
      .replace(/<title>.*?<\/title>/i, '<title>Executive Insights & Research | The Unbounded Leadership</title>')
      .replace(/<meta name="description" content=".*?"\/?>/i, '<meta name="description" content="Strategic library of leadership architecture dispatches and white papers on organizational design, cognitive clarity, and institutional alignment.">');
  } else if (url.includes('/methodology')) {
    hydratedHtml = hydratedHtml
      .replace(/<title>.*?<\/title>/i, '<title>The Alignment Protocol | Leadership Architecture</title>')
      .replace(/<meta name="description" content=".*?"\/?>/i, '<meta name="description" content="Formulaic Alignment Protocol for institutional stability: Baseline Audit, Structural Transformation, and Sustained Alignment for scaling enterprises.">');
  } else if (url.includes('/about')) {
    hydratedHtml = hydratedHtml
      .replace(/<title>.*?<\/title>/i, '<title>Principal Pedigree & Philosophy | The Unbounded Leadership</title>')
      .replace(/<meta name="description" content=".*?"\/?>/i, '<meta name="description" content="Boutique leadership architecture consultancy for consequential founders and CXOs, engineering institutional permanence and eliminating operational drag.">');
  } else if (url.includes('/assessment')) {
    hydratedHtml = hydratedHtml
      .replace(/<title>.*?<\/title>/i, '<title>Yield Calibration Audit | Institutional Diagnostic</title>')
      .replace(/<meta name="description" content=".*?"\/?>/i, '<meta name="description" content="High-fidelity executive diagnostic to benchmark organizational alignment, cognitive tax, and institutional lag across five critical business substrates.">');
  } else if (url.includes('/mandates')) {
    hydratedHtml = hydratedHtml
      .replace(/<title>.*?<\/title>/i, '<title>Strategic Mandates | The Unbounded Leadership Co.</title>')
      .replace(/<meta name="description" content=".*?"\/?>/i, '<meta name="description" content="High-stakes advisory mandates for enterprise recalibration, board-level alignment, and structural sovereignty. Strictly three mandates accepted per quarter.">');
  } else if (url.includes('/cognitive-tax') || url.includes('/quantify-friction')) {
    hydratedHtml = hydratedHtml
      .replace(/<title>.*?<\/title>/i, '<title>Quantify Your Cognitive Tax | Simulation Engine</title>')
      .replace(/<meta name="description" content=".*?"\/?>/i, '<meta name="description" content="Interactive simulation engine to calculate annual inaction tax, coordination friction, and leadership equity drained by systemic organizational bottlenecks.">');
  } else if (url.includes('/toolkits') || url.includes('/toolkit') || url.includes('/systems') || url.includes('/shop') || url.includes('/vault') || url.includes('/operational-vault')) {
    hydratedHtml = hydratedHtml
      .replace(/<title>.*?<\/title>/i, '<title>Founder Toolkits | Turnkey Digital Leadership Workspaces</title>')
      .replace(/<meta name="description" content=".*?"\/?>/i, '<meta name="description" content="Plug-and-play Notion & Coda master workspaces, decision matrices, and delegation runbooks to eliminate founder bottlenecks and reclaim 15+ weekly hours.">');
  } else if (url.includes('/contact') || url.includes('/intake')) {
    hydratedHtml = hydratedHtml
      .replace(/<title>.*?<\/title>/i, '<title>Executive Mandate Intake | The Unbounded Leadership</title>')
      .replace(/<meta name="description" content=".*?"\/?>/i, '<meta name="description" content="Submit confidential inquiry to the Principal Architect regarding strategic advisory, enterprise restructuring, or board alignment mandates.">');
  }

  return hydratedHtml;
}

const VALID_STATIC_ROUTES = new Set([
  '/',
  '/about',
  '/services',
  '/methodology',
  '/assessment',
  '/mandates',
  '/cognitive-tax',
  '/quantify-friction',
  '/toolkits',
  '/toolkit',
  '/systems',
  '/shop',
  '/vault',
  '/operational-vault',
  '/store',
  '/portal',
  '/intake',
  '/library',
  '/blogs',
  '/blog',
  '/articles',
  '/founders-dilemma',
  '/the-founders-dilemma',
  '/dynamics-of-inevitability',
  '/index.html'
]);

export function isRecognizedAppRoute(pathname: string): boolean {
  const cleanPath = pathname.split('?')[0].replace(/\/$/, '') || '/';
  if (VALID_STATIC_ROUTES.has(cleanPath)) {
    return true;
  }
  if (
    cleanPath.startsWith('/library/') ||
    cleanPath.startsWith('/blogs/') ||
    cleanPath.startsWith('/blog/') ||
    cleanPath.startsWith('/articles/')
  ) {
    return true;
  }
  return false;
}

export function generate404Html(requestPath: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>404: Strategic Signal Not Found | The Unbounded Leadership Co.</title>
  <meta name="robots" content="noindex, nofollow">
  <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23111111'/%3E%3Ctext y='50%25' x='50%25' dominant-baseline='middle' text-anchor='middle' font-family='serif' font-weight='bold' font-size='60' fill='%23b8860b'%3EU%3C/text%3E%3C/svg%3E">
  <style>
    body {
      margin: 0;
      padding: 0;
      background: #111111;
      color: #f5f5f0;
      font-family: Georgia, 'Playfair Display', serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      box-sizing: border-box;
    }
    .container {
      max-width: 640px;
      padding: 2.5rem 1.5rem;
    }
    .badge {
      display: inline-block;
      font-family: monospace;
      font-size: 11px;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: #b8860b;
      margin-bottom: 1.5rem;
    }
    h1 {
      font-size: 2.5rem;
      margin: 0 0 1rem 0;
      font-weight: 700;
      letter-spacing: -0.02em;
    }
    h1 span {
      color: #b8860b;
      font-style: italic;
    }
    p {
      color: #a1a1aa;
      font-size: 1rem;
      line-height: 1.6;
      margin-bottom: 2rem;
    }
    .requested-path {
      font-family: monospace;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 0.25rem 0.5rem;
      color: #e4e4e7;
      font-size: 0.85rem;
    }
    .links {
      display: flex;
      gap: 1rem;
      justify-content: center;
      flex-wrap: wrap;
    }
    a.btn-primary {
      background: #b8860b;
      color: #111111;
      text-decoration: none;
      font-weight: 700;
      font-size: 0.85rem;
      padding: 0.75rem 1.5rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      transition: background 0.2s ease;
    }
    a.btn-primary:hover {
      background: #ffffff;
    }
    a.btn-secondary {
      border: 1px solid #3f3f46;
      color: #f5f5f0;
      text-decoration: none;
      font-size: 0.85rem;
      padding: 0.75rem 1.5rem;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      transition: border-color 0.2s ease;
    }
    a.btn-secondary:hover {
      border-color: #b8860b;
      color: #b8860b;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="badge">Error Code 404 • Institutional Deviation</div>
    <h1>Strategic Signal <span>Not Found</span></h1>
    <p>The requested route <span class="requested-path">${requestPath.replace(/</g, '&lt;')}</span> does not exist within our leadership architecture graph. It may have been decommissioned or relocated.</p>
    <div class="links">
      <a href="/" class="btn-primary">Return to Command</a>
      <a href="/services" class="btn-secondary">Explore Services</a>
      <a href="/assessment" class="btn-secondary">Run Diagnostic</a>
      <a href="/library" class="btn-secondary">Research Library</a>
    </div>
  </div>
</body>
</html>`;
}

export function registerStaticServing(app: express.Express) {
  let distPath = path.resolve(process.cwd(), 'dist');
  if (!fs.existsSync(distPath)) {
    distPath = path.resolve(__dirname, '..', 'dist');
  }

  console.log(`[STATIC_SERVING] Serving static assets from: ${distPath}`);

  // Hashed assets in /assets/ get 1 year immutable caching
  app.use('/assets', express.static(path.join(distPath, 'assets'), {
    maxAge: '1y',
    immutable: true
  }));

  // General static assets
  app.use(express.static(distPath, {
    maxAge: '1d',
    etag: true
  }));

  // SPA navigation & 404 enforcement
  app.get('*', (req, res) => {
    const requestPath = req.path;

    // Check if this is a known route
    if (!isRecognizedAppRoute(requestPath)) {
      console.warn(`[404_NOT_FOUND] Route not recognized: ${requestPath}`);
      return res.status(404).send(generate404Html(requestPath));
    }

    const indexPath = path.join(distPath, 'index.html');
    fs.readFile(indexPath, 'utf-8', (err, html) => {
      if (err) {
        console.error(`[SPA_ERROR] Failed reading index.html from ${indexPath}:`, err);
        return res.status(500).send('Application bundle loading error. Please refresh.');
      }
      res.status(200).send(hydrateHtmlMetadata(html, requestPath));
    });
  });
}

export async function registerViteDevMiddleware(app: express.Express) {
  console.log('[DEV_MODE] Initializing Vite middleware for hot development...');
  const { createServer: createViteServer } = await import('vite');
  
  // Intercept unknown routes before Vite SPA fallback
  app.use((req, res, next) => {
    const cleanPath = req.path;
    if (
      cleanPath.startsWith('/api') ||
      cleanPath.startsWith('/@') ||
      cleanPath.startsWith('/node_modules') ||
      cleanPath.startsWith('/src') ||
      cleanPath.includes('.')
    ) {
      return next();
    }

    if (!isRecognizedAppRoute(cleanPath)) {
      console.warn(`[404_DETECTED] Route deviation in dev: ${cleanPath}`);
      return res.status(404).send(generate404Html(cleanPath));
    }
    next();
  });

  const vite = await createViteServer({
    server: { 
      middlewareMode: true,
      hmr: false
    },
    appType: 'spa',
  });

  app.use(vite.middlewares);

  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;
    if (url.startsWith('/api')) {
      return next();
    }

    const cleanPath = req.path;
    if (!isRecognizedAppRoute(cleanPath)) {
      return res.status(404).send(generate404Html(cleanPath));
    }

    try {
      const indexPath = path.resolve(process.cwd(), 'index.html');
      if (!fs.existsSync(indexPath)) {
        return res.status(404).send('index.html not found');
      }

      let html = fs.readFileSync(indexPath, 'utf-8');
      html = await vite.transformIndexHtml(url, html);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(hydrateHtmlMetadata(html, cleanPath));
    } catch (e: any) {
      vite.ssrFixStacktrace?.(e);
      next(e);
    }
  });
}
