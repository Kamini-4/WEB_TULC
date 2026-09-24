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
    hydratedHtml = hydratedHtml
      .replace(/<title>.*?<\/title>/i, `<title>${metadata.title} | Leadership Architecture Intelligence</title>`)
      .replace(/<meta name="description" content=".*?"\/?>/i, `<meta name="description" content="${metadata.description} Intelligence on Institutional Alignment.">`)
      .replace('</head>', `<script type="application/ld+json">${schema}</script></head>`);
  } else if (url === '/' || url === '/index.html') {
    const schema = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "The Unbounded Leadership Co.",
      "description": "Definitive leadership architecture for elite principals. Reclaim strategic bandwidth and achieve institutional alignment."
    });
    hydratedHtml = hydratedHtml
      .replace(/<title>.*?<\/title>/i, '<title>The Unbounded Leadership Co. | Leadership Architecture & Institutional Alignment</title>')
      .replace(/<meta name="description" content=".*?"\/?>/i, '<meta name="description" content="The definitive leadership architecture consultancy for elite principals. We engineer institutional alignment and reclaim strategic bandwidth for global market leaders.">')
      .replace('</head>', `<script type="application/ld+json">${schema}</script></head>`);
  } else if (url.includes('/library')) {
    hydratedHtml = hydratedHtml
      .replace(/<title>.*?<\/title>/i, '<title>Intellectual Authority | Global Leadership Registry & Research Hub</title>')
      .replace(/<meta name="description" content=".*?"\/?>/i, '<meta name="description" content="Our primary archive of leadership architecture dispatches and strategic intelligence for aligned institutional leaders. Forensic insights on bandwidth and friction.">');
  } else if (url.includes('/methodology')) {
    hydratedHtml = hydratedHtml
      .replace(/<title>.*?<\/title>/i, '<title>The Alignment Protocol | Engineering Institutional Velocity</title>')
      .replace(/<meta name="description" content=".*?"\/?>/i, '<meta name="description" content="Our formulaic Alignment Protocol for institutional stabilization: Baseline Audit, Structural Transformation, and Sustained Alignment. Anti-fragile substrate design.">');
  } else if (url.includes('/about')) {
    hydratedHtml = hydratedHtml
      .replace(/<title>.*?<\/title>/i, '<title>The Unbounded Philosophy | Architectural Leadership Excellence</title>')
      .replace(/<meta name="description" content=".*?"\/?>/i, '<meta name="description" content="We are the definitive leadership architecture consultancy for high-stakes principals. We engineering institutional permanence through systemic excellence.">');
  } else if (url.includes('/assessment')) {
    hydratedHtml = hydratedHtml
      .replace(/<title>.*?<\/title>/i, '<title>Institutional Diagnostic | The Alignment Audit</title>')
      .replace(/<meta name="description" content=".*?"\/?>/i, '<meta name="description" content="Execute a high-fidelity audit of your leadership architecture. Identify cognitive tax, institutional lag, and substrate friction.">');
  } else if (url.includes('/shop')) {
    hydratedHtml = hydratedHtml
      .replace(/<title>.*?<\/title>/i, '<title>The Sovereign Leverage Vault | Turnkey Leadership Operational Weapons</title>')
      .replace(/<meta name="description" content=".*?"\/?>/i, '<meta name="description" content="Battle-tested digital leverage assets. Reclaim 15+ hours of calendar sludge weekly, eliminate key-person dependency, and command enterprise velocity. Early bird allocations available.">');
  } else if (url.includes('/contact') || url.includes('/intake')) {
    hydratedHtml = hydratedHtml
      .replace(/<title>.*?<\/title>/i, '<title>Initiate Handover | The Unbounded Leadership Co.</title>')
      .replace(/<meta name="description" content=".*?"\/?>/i, '<meta name="description" content="Connect with the Principal Architect regarding institutional strategy, succession architecture, or high-stakes alignment.">');
  }

  return hydratedHtml;
}

export function registerStaticServing(app: express.Express) {
  let distPath = path.resolve(process.cwd(), 'dist');
  if (!fs.existsSync(distPath)) {
    distPath = path.resolve(__dirname, '..', 'dist');
  }

  console.log(`[STATIC_SERVING] Serving static assets from: ${distPath}`);

  // Serve static assets with appropriate caching
  app.use(express.static(distPath, {
    maxAge: '1d',
    etag: true
  }));

  // Fallback for SPA navigation
  app.get('*', (req, res) => {
    const indexPath = path.join(distPath, 'index.html');

    fs.readFile(indexPath, 'utf-8', (err, html) => {
      if (err) {
        console.error(`[SPA_ERROR] Failed reading index.html from ${indexPath}:`, err);
        return res.status(404).send('Application bundle loading error. Please refresh.');
      }
      res.send(hydrateHtmlMetadata(html, req.path));
    });
  });
}

export async function registerViteDevMiddleware(app: express.Express) {
  console.log('[DEV_MODE] Initializing Vite middleware for hot development...');
  const { createServer: createViteServer } = await import('vite');
  
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

    try {
      const indexPath = path.resolve(process.cwd(), 'index.html');
      if (!fs.existsSync(indexPath)) {
        return res.status(404).send('index.html not found');
      }

      let html = fs.readFileSync(indexPath, 'utf-8');
      html = await vite.transformIndexHtml(url, html);
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e: any) {
      vite.ssrFixStacktrace?.(e);
      next(e);
    }
  });
}
