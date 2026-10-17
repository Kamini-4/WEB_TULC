import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { INSTITUTIONAL_ARTICLES } from '../src/lib/articles.ts';
import { EXECUTIVE_FAQS } from '../src/data/executiveFaqData.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function hydrateHtmlMetadata(html: string, url: string): string {
  let hydratedHtml = html;
  const cleanPath = url.split('?')[0].replace(/\/$/, '') || '/';
  const articleMatch = cleanPath.match(/^\/(?:library|article|dispatch|articles|blogs|blog)\/([a-zA-Z0-9\-_]+)/);

  // 1. Article Page Ingestion
  if (articleMatch) {
    const slug = articleMatch[1];
    const article = INSTITUTIONAL_ARTICLES.find(a => a.slug === slug || a.id === slug);

    if (article) {
      const pageTitle = `${article.title} | The Unbounded Leadership Co.`;
      const pageDesc = article.excerpt;
      const articleSchema = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.title,
        "description": article.excerpt,
        "datePublished": "2026-01-01",
        "author": {
          "@type": "Person",
          "name": "Suchita Sancheti",
          "jobTitle": "Founder & Enterprise Architect",
          "url": "https://theunboundedleadership.com/about"
        },
        "publisher": {
          "@type": "Organization",
          "name": "The Unbounded Leadership Co.",
          "url": "https://theunboundedleadership.com/"
        },
        "mainEntityOfPage": `https://theunboundedleadership.com/library/${article.slug}`
      });

      hydratedHtml = hydratedHtml
        .replace(/<title>.*?<\/title>/i, `<title>${pageTitle}</title>`)
        .replace(/<meta name="description" content=".*?"\/?>/i, `<meta name="description" content="${pageDesc}">`)
        .replace(/<meta property="og:title" content=".*?"\/?>/i, `<meta property="og:title" content="${pageTitle}">`)
        .replace(/<meta property="og:description" content=".*?"\/?>/i, `<meta property="og:description" content="${pageDesc}">`)
        .replace(/<meta name="twitter:title" content=".*?"\/?>/i, `<meta name="twitter:title" content="${pageTitle}">`)
        .replace(/<meta name="twitter:description" content=".*?"\/?>/i, `<meta name="twitter:description" content="${pageDesc}">`)
        .replace(/<link rel="canonical" href=".*?"\/?>/i, `<link rel="canonical" href="https://theunboundedleadership.com/library/${article.slug}">`)
        .replace('</head>', `<script type="application/ld+json">${articleSchema}</script></head>`);

      // Inject full article semantic body for non-JS crawlers, Claude, and search engines
      const semanticBody = `
        <article style="max-width: 900px; margin: 40px auto; padding: 0 20px; font-family: 'Playfair Display', Georgia, serif;">
          <header style="margin-bottom: 30px;">
            <div style="font-size: 11px; text-transform: uppercase; color: #8c6708; font-weight: bold; letter-spacing: 0.1em;">${article.category} • The Unbounded Leadership Co.</div>
            <h1 style="font-size: 38px; line-height: 1.2; margin: 15px 0; color: #1c1917;">${article.title}</h1>
            <p style="font-size: 18px; line-height: 1.6; color: #57534e; font-style: italic;">${article.excerpt}</p>
            <div style="font-size: 12px; color: #78716c; margin-top: 15px;">By Suchita Sancheti, Founder & Enterprise Architect</div>
          </header>
          <div style="font-size: 16px; line-height: 1.8; color: #292524;">
            ${article.content.map(p => {
              if (p.startsWith('## ')) return `<h2 style="font-size: 24px; margin: 30px 0 15px; color: #1c1917;">${p.slice(3)}</h2>`;
              if (p.startsWith('### ')) return `<h3 style="font-size: 20px; margin: 25px 0 10px; color: #8c6708;">${p.slice(4)}</h3>`;
              if (p.startsWith('> ')) return `<blockquote style="border-left: 3px solid #b8860b; padding-left: 20px; margin: 20px 0; font-style: italic; color: #44403c;">${p.slice(2)}</blockquote>`;
              return `<p style="margin-bottom: 20px;">${p}</p>`;
            }).join('')}
          </div>
          <footer style="margin-top: 50px; padding-top: 30px; border-top: 1px solid #ded6c5;">
            <p><strong>About Suchita Sancheti:</strong> Computer Science Engineer & Industrial Psychologist specializing in organizational decision architecture and founder bottleneck elimination.</p>
            <p>Direct executive inquiry: <a href="mailto:suchita@theunboundedleadership.com">suchita@theunboundedleadership.com</a> | <a href="/library">Back to Research Library</a></p>
          </footer>
        </article>
      `;

      hydratedHtml = hydratedHtml.replace('<div id="root"></div>', `<div id="root">${semanticBody}</div>`);
      return hydratedHtml;
    }
  }

  // 2. FAQ Page Ingestion
  if (cleanPath === '/faq') {
    const pageTitle = "Executive FAQ & Founder Governance Inquiries | The Unbounded Leadership Co.";
    const pageDesc = "Direct, authoritative answers to high-stakes scaling dilemmas, founder bottlenecks, delegation thresholds, and board alignment.";
    
    const faqEntities = EXECUTIVE_FAQS.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": `${faq.answer} ${faq.executiveContext ? `(Context: ${faq.executiveContext})` : ''}`
      }
    }));

    const faqSchema = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqEntities
    });

    hydratedHtml = hydratedHtml
      .replace(/<title>.*?<\/title>/i, `<title>${pageTitle}</title>`)
      .replace(/<meta name="description" content=".*?"\/?>/i, `<meta name="description" content="${pageDesc}">`)
      .replace('</head>', `<script type="application/ld+json">${faqSchema}</script></head>`);

    const faqSemanticBody = `
      <main style="max-width: 1000px; margin: 40px auto; padding: 0 20px; font-family: 'Playfair Display', Georgia, serif;">
        <h1 style="font-size: 36px; margin-bottom: 20px;">Executive FAQ & Governance Clarifications</h1>
        <p style="font-size: 16px; color: #57534e; margin-bottom: 40px;">Intersection of real-world enterprise founder dilemmas and TULC architectural solutions.</p>
        <div>
          ${EXECUTIVE_FAQS.map(faq => `
            <div style="margin-bottom: 30px; padding: 20px; background: #ffffff; border: 1px solid #ded6c5;">
              <h3 style="font-size: 18px; color: #1c1917; margin-bottom: 10px;">${faq.question}</h3>
              <p style="font-size: 14px; line-height: 1.7; color: #44403c;">${faq.answer}</p>
              ${faq.executiveContext ? `<div style="font-size: 12px; color: #78716c; font-style: italic; margin-top: 10px;">Context: ${faq.executiveContext}</div>` : ''}
            </div>
          `).join('')}
        </div>
      </main>
    `;

    hydratedHtml = hydratedHtml.replace('<div id="root"></div>', `<div id="root">${faqSemanticBody}</div>`);
    return hydratedHtml;
  }

  // 3. Services Page
  if (cleanPath === '/services' || cleanPath === '/mandates') {
    const pageTitle = "Institutional Advisory Mandates | The Unbounded Leadership Co.";
    const pageDesc = "Sovereign advisory mandates to eliminate founder bottlenecks, install autonomous delegation thresholds, and defend valuation multiples.";
    hydratedHtml = hydratedHtml
      .replace(/<title>.*?<\/title>/i, `<title>${pageTitle}</title>`)
      .replace(/<meta name="description" content=".*?"\/?>/i, `<meta name="description" content="${pageDesc}">`);
    return hydratedHtml;
  }

  // 4. About Founders Page
  if (cleanPath === '/about') {
    const pageTitle = "Founders & Governance Philosophy | The Unbounded Leadership Co.";
    const pageDesc = "Suchita Sancheti (Founder & Enterprise Architect) and Kamini Agnihotri (Client Relations Coordinator) engineering institutional permanence.";
    hydratedHtml = hydratedHtml
      .replace(/<title>.*?<\/title>/i, `<title>${pageTitle}</title>`)
      .replace(/<meta name="description" content=".*?"\/?>/i, `<meta name="description" content="${pageDesc}">`);
    return hydratedHtml;
  }

  // 5. Methodology
  if (cleanPath === '/methodology') {
    const pageTitle = "The Alignment Protocol | Leadership Architecture Methodology";
    const pageDesc = "Formulaic 4-phase transformation from hero-led bottlenecks to systemic governance for $10M to $100M+ enterprises.";
    hydratedHtml = hydratedHtml
      .replace(/<title>.*?<\/title>/i, `<title>${pageTitle}</title>`)
      .replace(/<meta name="description" content=".*?"\/?>/i, `<meta name="description" content="${pageDesc}">`);
    return hydratedHtml;
  }

  // 6. Assessment
  if (cleanPath === '/assessment') {
    const pageTitle = "Two-Week Step-Away Test | Adversarial Enterprise Diagnostic";
    const pageDesc = "Benchmark your enterprise against our adversarial standard: does the company compound autonomously when the founder is completely offline?";
    hydratedHtml = hydratedHtml
      .replace(/<title>.*?<\/title>/i, `<title>${pageTitle}</title>`)
      .replace(/<meta name="description" content=".*?"\/?>/i, `<meta name="description" content="${pageDesc}">`);
    return hydratedHtml;
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
  '/faq',
  '/cognitive-tax',
  '/quantify-friction',
  '/toolkits',
  '/toolkit',
  '/systems',
  '/products',
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
    cleanPath.startsWith('/articles/') ||
    cleanPath.startsWith('/article/') ||
    cleanPath.startsWith('/dispatch/')
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
