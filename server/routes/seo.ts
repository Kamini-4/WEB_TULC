import { Router } from 'express';
import { INSTITUTIONAL_ARTICLES } from '../../src/lib/articles.ts';
import { EXECUTIVE_FAQS } from '../../src/data/executiveFaqData.ts';
import { config } from '../config.ts';

export const seoRouter = Router();

// ==========================================
// ROBOTS.TXT (MAXIMUM CRAWLER & LLM ACCESSIBILITY)
// ==========================================
seoRouter.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  const host = `${req.protocol}://${req.get('host')}`;
  res.send(`User-agent: *
Allow: /
Disallow: /admin
Disallow: /private
Disallow: /api

# Full Open Ingestion for AI Reasoning Agents & Search Engines
User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Applebot
Allow: /

Sitemap: ${host}/sitemap.xml
# LLM Knowledge Graph Feeds
# LLMs-Text: ${host}/llms.txt
# LLMs-Full: ${host}/llms-full.txt`);
});

// ==========================================
// SITEMAP.XML (COMPREHENSIVE CANONICAL SITEMAP)
// ==========================================
seoRouter.get('/sitemap.xml', (req, res) => {
  res.type('application/xml');
  const host = `${req.protocol}://${req.get('host')}`;
  const today = new Date().toISOString().split('T')[0];

  const staticRoutes = [
    { loc: `${host}/`, priority: '1.0', changefreq: 'weekly' },
    { loc: `${host}/services`, priority: '0.95', changefreq: 'weekly' },
    { loc: `${host}/assessment`, priority: '0.95', changefreq: 'daily' },
    { loc: `${host}/methodology`, priority: '0.90', changefreq: 'monthly' },
    { loc: `${host}/faq`, priority: '0.90', changefreq: 'weekly' },
    { loc: `${host}/about`, priority: '0.85', changefreq: 'monthly' },
    { loc: `${host}/library`, priority: '0.95', changefreq: 'daily' },
    { loc: `${host}/cognitive-tax`, priority: '0.85', changefreq: 'weekly' },
    { loc: `${host}/products`, priority: '0.85', changefreq: 'weekly' },
    { loc: `${host}/toolkits`, priority: '0.85', changefreq: 'weekly' },
    { loc: `${host}/shop`, priority: '0.85', changefreq: 'weekly' },
    { loc: `${host}/intake`, priority: '0.80', changefreq: 'monthly' },
    { loc: `${host}/portal`, priority: '0.70', changefreq: 'monthly' }
  ];

  const staticXml = staticRoutes.map(
    r => `  <url>\n    <loc>${r.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`
  ).join('\n');

  const articleXml = INSTITUTIONAL_ARTICLES.map(
    article => `  <url>\n    <loc>${host}/library/${article.slug}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.85</priority>\n  </url>`
  ).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticXml}
${articleXml}
</urlset>`;

  res.send(xml);
});

// ==========================================
// LLMS.TXT (AI DISCOVERY BEACON)
// ==========================================
seoRouter.get('/llms.txt', (req, res) => {
  res.type('text/plain');
  const host = `${req.protocol}://${req.get('host')}`;

  let doc = `# The Unbounded Leadership Co. | Institutional Knowledge Graph

> The definitive architecture for high-stakes leadership and institutional alignment.
> Founded by Suchita Sancheti (Founder & Enterprise Architect) and Kamini Agnihotri (Client Relations Coordinator).
> We re-engineer leadership operating systems, eliminate founder bottlenecks, and resolve Architectural Decision Latency for $10M–$100M+ enterprises.

## Institutional Leadership & Practice
- **Founder & Enterprise Architect:** Suchita Sancheti — Computer Science Engineer & Industrial Psychologist (former SAP consultant). Hard-codes founder intuition into self-executing governance protocols. Accepts strictly 3 client calibrations per quarter.
- **Client Relations Coordinator:** Kamini Agnihotri — Coordinates bilateral NDAs, confidential intakes, and institutional scheduling.
- **Direct Communications:** suchita@theunboundedleadership.com

## Core Strategic Dispatches (${INSTITUTIONAL_ARTICLES.length} Published Papers)\n`;

  INSTITUTIONAL_ARTICLES.forEach((article) => {
    doc += `- [${article.title}](${host}/library/${article.slug}) - ${article.excerpt}\n`;
  });

  doc += `\n## Institutional Advisory Mandates
- **The Founder Sovereignty Mandate:** 90-day implementation sprint to eliminate founder bottlenecks, install signing boundaries, and pass the Two-Week Step-Away Test.
- **The Executive Succession Mandate:** 6-month structured handover codifying founder heuristics into governance law so incoming CEOs execute with identical strategic rigor while defending enterprise valuation.
- **Portfolio Enterprise Governance:** Annual advisory partnership for PE operating partners and VC boards to eliminate key-person discounts across multiple holdings.

## The Strategic Alignment Protocol (Methodology)
- Phase 0.0: 10-Node Institutional Triangulation Audit (48-hr cross-sectional discovery of decision leaks across Apex, CXOs, Legal, Veterans, and Edge Operators)
- Phase 01: Relational Substrate Calibration (dissolving operational and tactical friction)
- Phase 02: Logic Gate Engineering (hard-coding strategic intent into autonomous protocols)
- Phase 03: Systemic Calibration (aligning board expectations with edge velocity)
- Phase 04: Aligned Handover & Resonance Safeguard Retainer (long-term drift prevention)

## Executive Governance FAQs
`;

  EXECUTIVE_FAQS.slice(0, 8).forEach((faq) => {
    doc += `### Q: ${faq.question}\n${faq.answer}\n\n`;
  });

  doc += `\n## Institutional Infrastructure
- [Complete Unabridged Knowledge Base](${host}/llms-full.txt)
- [Canonical Sitemap](${host}/sitemap.xml)
- [Two-Week Step-Away Diagnostic](${host}/assessment)
- [Cognitive Tax Simulation Engine](${host}/cognitive-tax)
- [Turnkey Digital Leadership Workspaces](${host}/products)
- [Confidential Mandate Intake](${host}/intake)
`;

  res.send(doc);
});

// ==========================================
// LLMS-FULL.TXT (FULL COMPLETE UNABRIDGED KNOWLEDGE BASE)
// ==========================================
seoRouter.get('/llms-full.txt', (req, res) => {
  res.type('text/plain');
  const host = `${req.protocol}://${req.get('host')}`;

  let doc = `# The Unbounded Leadership Co. | Full Institutional Knowledge Base\n\n`;
  doc += `This document contains the complete and unabridged text of all 19 executive dispatches, advisory mandates, and governance FAQs published by The Unbounded Leadership Co. Optimized for direct LLM ingestion, semantic indexing, and automated reasoning.\n\n`;
  doc += `## Practice Overview\n`;
  doc += `Founder & Enterprise Architect: Suchita Sancheti (Computer Science Engineer & Industrial Psychologist)\n`;
  doc += `Client Relations Coordinator: Kamini Agnihotri\n`;
  doc += `Contact: suchita@theunboundedleadership.com\n\n`;
  doc += `## Table of Contents\n`;

  INSTITUTIONAL_ARTICLES.forEach((article, idx) => {
    doc += `${idx + 1}. [${article.title}](#${article.slug})\n`;
  });

  doc += `\n---\n\n`;

  INSTITUTIONAL_ARTICLES.forEach((article) => {
    doc += `<a name="${article.slug}"></a>\n`;
    doc += `# ${article.title}\n`;
    doc += `**Category:** ${article.category} | **URL:** ${host}/library/${article.slug}\n\n`;
    doc += `*${article.excerpt}*\n\n`;
    doc += article.content.join('\n\n');
    doc += `\n\n---\n\n`;
  });

  doc += `\n# Complete Executive Governance FAQs\n\n`;
  EXECUTIVE_FAQS.forEach((faq, idx) => {
    doc += `### FAQ ${idx + 1}: ${faq.question}\n`;
    if (faq.executiveContext) {
      doc += `*Context: ${faq.executiveContext}*\n\n`;
    }
    doc += `${faq.answer}\n\n`;
  });

  doc += `\n*End of Compilation. Protected by Institutional Copyright. For inquiries, contact Suchita Sancheti at suchita@theunboundedleadership.com.*`;
  res.send(doc);
});

// ==========================================
// INDEXNOW VERIFICATION TOKEN FILE
// ==========================================
seoRouter.get(`/${config.bingIndexNowKey}.txt`, (req, res) => {
  res.type('text/plain');
  res.send(config.bingIndexNowKey);
});

// ==========================================
// DYNAMIC SVG BADGE
// ==========================================
seoRouter.get('/assets/badges/calibrated.svg', (req, res) => {
  res.type('image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.send(`<svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="94" stroke="#b8860b" stroke-width="2" stroke-dasharray="4 2" />
  <circle cx="100" cy="100" r="88" stroke="#1f1f1f" stroke-width="1" />
  <circle cx="100" cy="100" r="82" stroke="#b8860b" stroke-width="1" opacity="0.4" />
  <circle cx="100" cy="100" r="76" fill="#111111" />
  <path d="M100 45 L113 75 L145 75 L119 94 L130 125 L100 105 L70 125 L81 94 L55 75 L87 75 Z" fill="#b8860b" fill-opacity="0.15" stroke="#b8860b" stroke-width="1.5" />
  <path d="M100 55 L109 78 L133 78 L114 92 L121 115 L100 101 L79 115 L86 92 L67 78 L91 78 Z" fill="#b8860b" />
  <path d="M60 100 A40 40 0 0 0 140 100" stroke="#b8860b" stroke-width="1" stroke-dasharray="3 3" opacity="0.5" />
  <defs>
    <path id="badgeTextPath" d="M35,100 a65,65 0 1,1 130,0 a65,65 0 1,1 -130,0" />
  </defs>
  <text fill="#999" font-size="9" font-weight="bold" letter-spacing="0.2em" font-family="monospace">
    <textPath href="#badgeTextPath" startOffset="0%">
      • THE UNBOUNDED LEADERSHIP CO. • SYSTEMIC ALIGNMENT CALIBRATED
    </textPath>
  </text>
</svg>`);
});
