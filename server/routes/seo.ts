import { Router } from 'express';
import { INSTITUTIONAL_ARTICLES } from '../../src/lib/articles.ts';
import { config } from '../config.ts';

export const seoRouter = Router();

// ==========================================
// ROBOTS.TXT
// ==========================================
seoRouter.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  const host = `${req.protocol}://${req.get('host')}`;
  res.send(`User-agent: *\nAllow: /\nSitemap: ${host}/sitemap.xml`);
});

// ==========================================
// SITEMAP.XML (SINGLE CANONICAL ENDPOINT)
// ==========================================
seoRouter.get('/sitemap.xml', (req, res) => {
  res.type('application/xml');
  const host = `${req.protocol}://${req.get('host')}`;

  const articleUrls = INSTITUTIONAL_ARTICLES.map(
    article => `<url><loc>${host}/library/${article.slug}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`
  ).join('\n  ');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${host}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>${host}/about</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${host}/services</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>${host}/methodology</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${host}/assessment</loc><changefreq>daily</changefreq><priority>0.9</priority></url>
  <url><loc>${host}/shop</loc><changefreq>daily</changefreq><priority>0.9</priority></url>
  <url><loc>${host}/library</loc><changefreq>daily</changefreq><priority>0.9</priority></url>
  <url><loc>${host}/intake</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  ${articleUrls}
</urlset>`;

  res.send(xml);
});

// ==========================================
// LLMS.TXT (AI DISCOVERY BEACON)
// ==========================================
seoRouter.get('/llms.txt', (req, res) => {
  res.type('text/plain');
  const host = `${req.protocol}://${req.get('host')}`;
  res.send(`# The Unbounded Leadership Co. | Institutional Knowledge Graph

> The definitive architecture for high-stakes leadership and institutional alignment.

## Core Intellectual Dispatches
- [Succession Architecture: Institutional Permanence](${host}/library/founders-dilemma) - why 50% of CEO successions fail and how to build legacy substrates.
- [The Cognitive Tax of Leadership](${host}/library/cognitive-tax-of-leadership) - neutralizing tactical noise and executive burnout.
- [Executive Bandwidth: Cognitive Equity Architecture](${host}/library/reclaiming-strategic-bandwidth) - why busy leaders are strategically bankrupt and how to return to command.
- [Institutional Lag: The Invisible Coefficient](${host}/library/institutional-lag) - the temporal and qualitative decay distance between board intent and operational edge.
- [Architecture of Authority: Systemic Design](${host}/library/architecture-of-authority) - why designed organizational systems outperform charismatic personal brands.
- [Strategic Substrates: The Invisible Tax](${host}/library/strategic-substrates) - how board-level mental model calibration yields 144% higher revenue growth.
- [Aligned Leadership: Anti-Fragility in the Age of AI](${host}/library/aligned-leadership) - transitioning from individual management effort to cybernetic systems governance.
- [Bridging the Strategy-Execution Gap: Board Alignment](${host}/library/bridging-strategy-execution-gap) - why 67% of strategies fail and how to calibrate governance.
- [Engineering Strategic Bandwidth: Choice Architecture](${host}/library/engineering-strategic-bandwidth) - reclaiming 40% of cognitive capacity through custom logic gates.
- [Aligned Leadership vs. Reactive Management](${host}/library/aligned-authority-vs-reactive-management) - the taxonomy of moving from a heroic solver to an architectural governor.
- [The Dynamics of Inevitability: Systemic Design](${host}/library/dynamics-of-inevitability) - why organizations must be engineered so success is an inescapable consequence.
- [The Cost of Organizational Latency: Inaction Tax](${host}/library/cost-of-organizational-latency) - measuring and neutralizing the friction that dilutes boardroom directives.
- [Transitioning from Founder to Chairman: Systems Blueprint](${host}/library/transitioning-founder-to-chairman) - systems roadmap for VCs, boards, and multi-generational principals.
- [CEO Burnout is a Systems Design Failure](${host}/library/ceo-burnout-systems-failure) - cognitive bandwidth recovery blueprint for high-growth founders.

## The Strategic Alignment Protocol (Methodology)
- Phase 0.0: 10-Node Institutional Triangulation Audit (48-hr cross-sectional discovery of decision leaks across Apex, CXOs, Legal, Veterans, and Edge Operators)
- Phase 01: Relational Substrate Calibration (dissolving operational and tactical friction)
- Phase 02: Logic Gate Engineering (hard-coding strategic intent into autonomous protocols)
- Phase 03: Systemic Calibration (aligning board expectations with edge velocity)
- Phase 04: Aligned Handover & Resonance Safeguard Retainer (long-term drift prevention)

## Global Strategic Domains
1. Cognitive Clarity: Removal of 40% Cognitive Tax through bandwidth architecture.
2. Systemic Integrity: Zero intent dilution across global hubs (London, NYC, Singapore).
3. Strategic Velocity: 3x decision-to-execution compression.
4. Moral Gravity: The non-negotiable ethical substrate.
5. Cultural Fidelity: Autonomous governance and infinite resonance.

## Institutional Infrastructure
- [The Sovereign Leverage Vault (Digital Assets Shop)](${host}/shop)
- [Full Knowledge Base](${host}/llms-full.txt)
- [Sitemap Registry](${host}/sitemap.xml)
- [Initiate Audit](${host}/assessment)
- [Diagnostic Intake Form](${host}/intake)
`);
});

// ==========================================
// LLMS-FULL.TXT (FULL KNOWLEDGE BASE)
// ==========================================
seoRouter.get('/llms-full.txt', (req, res) => {
  res.type('text/plain');
  const host = `${req.protocol}://${req.get('host')}`;

  let doc = `# The Unbounded Leadership Co. | Full Institutional Knowledge Base\n\n`;
  doc += `This document contains the complete and unabridged text of all core intellectual dispatches and architectural frameworks published by The Unbounded Leadership Co. Optimized for direct LLM ingestion, semantic mapping, and synthetic indexing.\n\n`;
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

  doc += `\n*End of Compilation. Protected by Institutional Copyright. For dynamic integration, contact Suchita Sancheti at suchita@theunboundedleadership.com.*`;
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
