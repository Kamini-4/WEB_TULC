import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

export const SITE_URL = 'https://theunboundedleadership.com';
export const DEFAULT_IMAGE = `${SITE_URL}/assets/tulc-gold-navy-crest.jpg`;

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function stripInlineMarkdown(str) {
  return String(str || '').replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1');
}

let cachedBlogPosts = null;

/**
 * Loads the live BLOG_POSTS array directly from src/data/blogData.ts + blogInsights.ts
 * using TypeScript's transpiler (installed in devDependencies) so pre-rendered article
 * pages never drift from the live React app.
 */
export function loadLiveBlogPosts() {
  if (cachedBlogPosts) return cachedBlogPosts;

  try {
    const require = createRequire(import.meta.url);
    const ts = require('typescript');

    const insightsPath = path.resolve('src/data/blogInsights.ts');
    const blogDataPath = path.resolve('src/data/blogData.ts');

    const insightsSrc = fs.readFileSync(insightsPath, 'utf8');
    const blogSrc = fs.readFileSync(blogDataPath, 'utf8');

    const insightsJs = ts.transpileModule(insightsSrc, {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
      },
    }).outputText;

    const blogJs = ts.transpileModule(blogSrc, {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
      },
    }).outputText;

    const insightsMod = { exports: {} };
    new Function('exports', 'module', insightsJs)(insightsMod.exports, insightsMod);

    const blogMod = { exports: {} };
    const customRequire = (specifier) => {
      if (specifier === './blogInsights') return insightsMod.exports;
      throw new Error(`Unexpected import in blogData.ts: ${specifier}`);
    };
    new Function('exports', 'require', 'module', blogJs)(blogMod.exports, customRequire, blogMod);

    cachedBlogPosts = Array.isArray(blogMod.exports.BLOG_POSTS) ? blogMod.exports.BLOG_POSTS : [];
    return cachedBlogPosts;
  } catch (err) {
    console.warn('[SEO_PRERENDER_WARN] Failed to load live blogData.ts:', err.message);
    return [];
  }
}

const SHARED_NAV_HTML = `
      <header style="padding: 1.5rem; background: #f8f6f0; border-bottom: 1px solid #e5decfe0;">
        <nav aria-label="Main Navigation" style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1rem; font-weight: bold;">
          <a href="/" style="color: #17181c; text-decoration: none;">Home</a>
          <a href="/assessment" style="color: #17181c; text-decoration: none;">60-Sec Assessment</a>
          <a href="/domains" style="color: #17181c; text-decoration: none;">5-Domain Model</a>
          <a href="/services" style="color: #17181c; text-decoration: none;">Services &amp; Pricing</a>
          <a href="/shop" style="color: #17181c; text-decoration: none;">Executive Toolkits</a>
          <a href="/case-studies" style="color: #17181c; text-decoration: none;">Case Studies</a>
          <a href="/briefing" style="color: #17181c; text-decoration: none;">Executive Briefing</a>
          <a href="/library" style="color: #17181c; text-decoration: none;">Insights Library</a>
          <a href="/about" style="color: #17181c; text-decoration: none;">About</a>
          <a href="/faq" style="color: #17181c; text-decoration: none;">FAQ</a>
          <a href="/booking" style="color: #17181c; text-decoration: none;">Book Briefing</a>
          <a href="/contact" style="color: #9d7b38; text-decoration: none;">Contact</a>
        </nav>
        <div style="font-size: 0.875rem; color: #4e5159; display: flex; gap: 1.25rem; flex-wrap: wrap;">
          <span>Phone: <a href="tel:+919325346704" style="color: #9d7b38; font-weight: bold;">+91 9325346704</a></span>
          <span>Email: <a href="mailto:suchita@theunboundedleadership.com" style="color: #9d7b38; font-weight: bold;">suchita@theunboundedleadership.com</a></span>
          <span>LinkedIn: <a href="https://www.linkedin.com/in/suchita-sancheti" target="_blank" rel="noopener noreferrer" style="color: #9d7b38; font-weight: bold;">Suchita Sancheti</a></span>
          <span>Instagram: <a href="https://www.instagram.com/transformingleadership" target="_blank" rel="noopener noreferrer" style="color: #9d7b38; font-weight: bold;">@transformingleadership</a></span>
        </div>
      </header>`;

const SHARED_FOOTER_HTML = `
      <footer style="padding: 2rem 1.5rem; background: #141416; color: #f4ecd8; font-size: 0.85rem;">
        <div style="display: flex; gap: 1.25rem; flex-wrap: wrap; margin-bottom: 1rem;">
          <a href="/" style="color: #d4af37;">Home</a>
          <a href="/assessment" style="color: #d4af37;">60-Sec Assessment</a>
          <a href="/domains" style="color: #d4af37;">5-Domain Model</a>
          <a href="/services" style="color: #d4af37;">Services</a>
          <a href="/shop" style="color: #d4af37;">Toolkits</a>
          <a href="/case-studies" style="color: #d4af37;">Case Studies</a>
          <a href="/briefing" style="color: #d4af37;">Briefing</a>
          <a href="/library" style="color: #d4af37;">Insights</a>
          <a href="/about" style="color: #d4af37;">About</a>
          <a href="/faq" style="color: #d4af37;">FAQ</a>
          <a href="/booking" style="color: #d4af37;">Booking</a>
          <a href="/contact" style="color: #d4af37;">Contact</a>
          <a href="/privacy" style="color: #d4af37;">Privacy Policy</a>
        </div>
        <p>© 2026 The Unbounded Leadership Co. Founded by Suchita Sancheti. All rights reserved.</p>
      </footer>`;

function wrapPageBody(mainInnerHtml) {
  return `${SHARED_NAV_HTML}
      <main style="padding: 2.5rem 1.5rem; max-width: 1200px; margin: 0 auto; line-height: 1.7; color: #17181c;">
        ${mainInnerHtml}
      </main>
${SHARED_FOOTER_HTML}`;
}

function buildBreadcrumbSchema(canonicalPath, pageName, parent) {
  const items = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
  ];
  if (parent) {
    items.push({ '@type': 'ListItem', position: 2, name: parent.name, item: `${SITE_URL}${parent.path}` });
    items.push({ '@type': 'ListItem', position: 3, name: pageName, item: `${SITE_URL}${canonicalPath}` });
  } else {
    items.push({ '@type': 'ListItem', position: 2, name: pageName, item: `${SITE_URL}${canonicalPath}` });
  }
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
}

/**
 * Primary canonical route definitions (every subpage in sitemap.xml).
 */
export function getCanonicalRoutes() {
  const posts = loadLiveBlogPosts();

  const libraryLinksHtml = posts
    .map(
      (p) => `
            <li style="margin-bottom: 1rem;">
              <h3 style="margin: 0 0 0.25rem 0; font-size: 1.15rem;">
                <a href="/library/${escapeHtml(p.slug)}" style="color: #17181c; text-decoration: underline;">${escapeHtml(p.title)}</a>
              </h3>
              <p style="margin: 0; font-size: 0.95rem; color: #4e5159;">
                <strong>${escapeHtml(p.category)}</strong> (${escapeHtml(p.readTime)}) — ${escapeHtml(p.executiveSummary || p.subtitle)}
              </p>
            </li>`
    )
    .join('');

  const primaryPages = [
    {
      path: '/assessment',
      name: '60-Second Executive Dependency Assessment',
      title: '60-Second Executive Dependency Assessment | The Unbounded Leadership Co.',
      description:
        'Take the free 60-second Executive Dependency Assessment by Suchita Sancheti. Score autonomy 0-100 across 5 domains, quantify weekly lost hours & INR execution drag, and download your 90-day PDF roadmap.',
      keywords:
        'founder dependency assessment, executive autonomy test, CEO bottleneck audit, 60-second leadership assessment, 90-day roadmap PDF, Suchita Sancheti',
      image: DEFAULT_IMAGE,
      type: 'website',
      bodyHtml: wrapPageBody(`
        <article>
          <p style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.08em; color: #9d7b38; font-weight: bold;">Free Executive Diagnostic · Instant 0–100 Score</p>
          <h1 style="font-size: 2.3rem; font-weight: bold; margin: 0.5rem 0 1rem;">60-Second Executive Dependency Assessment</h1>
          <p style="font-size: 1.1rem; margin-bottom: 1.25rem;">
            Measure how much of your company's daily execution still routes through the founder's desk. Complete 5 focused executive questions in under 60 seconds to receive your 0–100 Executive Autonomy Score, estimated weekly hours lost to routine escalations, annual INR execution drag, and a tailored downloadable 90-day PDF roadmap.
          </p>
          <h2 style="font-size: 1.5rem; margin-top: 1.75rem;">What the Free 60-Second Diagnostic Evaluates</h2>
          <ol style="padding-left: 1.5rem; margin-bottom: 1.5rem;">
            <li><strong>Executive Focus:</strong> Daily firefighting vs. high-leverage strategy and capital allocation.</li>
            <li><strong>Delegation Fidelity:</strong> Whether managers hold written authority thresholds or escalate routine decisions back to the CEO.</li>
            <li><strong>Decision Speed:</strong> Cycle time from issue identification to owned execution without committee stall.</li>
            <li><strong>Peer Accountability:</strong> Whether department heads enforce standards with one another before work reaches the founder.</li>
            <li><strong>Business Independence:</strong> Whether revenue, hiring, and delivery hold steady during a 30-day founder absence.</li>
          </ol>
          <p>
            Ready for a full leadership team forensic audit? Explore <a href="/services">Track 01 · Mandate Forensic Diagnostic</a> (Solo CEO ₹38450 | Group 3+ CXOs ₹89450) or inspect the <a href="/domains">5-Domain Operating Model</a>.
          </p>
        </article>
      `),
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebApplication',
            name: '60-Second Executive Dependency Assessment',
            url: `${SITE_URL}/assessment`,
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'All',
            description:
              'Free 5-domain founder dependency audit that scores executive autonomy from 0 to 100, quantifies weekly lost hours and annual INR execution drag, and exports a downloadable 90-day PDF roadmap.',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
            provider: { '@id': `${SITE_URL}/#organization` },
          },
          buildBreadcrumbSchema('/assessment', '60-Second Executive Dependency Assessment'),
        ],
      },
    },
    {
      path: '/domains',
      name: '5-Domain Executive Operating Model',
      title: 'The 5-Domain Executive Operating Model | The Unbounded Leadership Co.',
      description:
        'Explore the 5 operational domains — Executive Focus, Delegation Fidelity, Decision Speed, Peer Accountability, and Business Independence — used to eliminate founder dependency in 90 days.',
      keywords:
        '5-domain operating model, executive operating system, decision rights framework, delegation fidelity, peer accountability, business independence, leadership architecture',
      image: DEFAULT_IMAGE,
      type: 'website',
      bodyHtml: wrapPageBody(`
        <article>
          <p style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.08em; color: #9d7b38; font-weight: bold;">Proprietary Operating Architecture</p>
          <h1 style="font-size: 2.3rem; font-weight: bold; margin: 0.5rem 0 1rem;">The 5-Domain Executive Operating Model</h1>
          <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">
            When scaling companies stall, the root cause is rarely strategy or talent — it is operating architecture. The Unbounded Leadership Co. re-engineers five structural domains in 90 days so senior leaders execute with clarity, speed, and full ownership.
          </p>
          <ol style="padding-left: 1.5rem;">
            <li style="margin-bottom: 1rem;"><h2>1. Executive Focus</h2><p>Eliminates daily firefighting and approval queues so founders reclaim 15+ strategic hours every week.</p></li>
            <li style="margin-bottom: 1rem;"><h2>2. Delegation Fidelity</h2><p>Replaces verbal delegation with written ₹425000–₹4225000+ authority limits and quality gates for zero founder rework.</p></li>
            <li style="margin-bottom: 1rem;"><h2>3. Decision Speed</h2><p>Installs single-threaded ownership, 72-hour decision SLAs, and 14-day autonomous execution sprints.</p></li>
            <li style="margin-bottom: 1rem;"><h2>4. Peer Accountability</h2><p>Establishes weekly leadership scorecards and peer reviews so missed commitments are resolved across the C-suite without CEO mediation.</p></li>
            <li style="margin-bottom: 1rem;"><h2>5. Business Independence</h2><p>Stress-tests sales, hiring, and client delivery through a live 30-day founder absence validation protocol.</p></li>
          </ol>
          <p style="margin-top: 1.5rem;">
            Benchmark your company across all five domains in 60 seconds on our <a href="/assessment">Free Executive Assessment</a> or review <a href="/services">90-Day Embedding &amp; Fractional COO tracks</a>.
          </p>
        </article>
      `),
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebPage',
            name: 'The 5-Domain Executive Operating Model',
            url: `${SITE_URL}/domains`,
            description:
              'The 5-domain leadership architecture methodology developed by Suchita Sancheti to decouple founder bottlenecks in 90 days.',
          },
          buildBreadcrumbSchema('/domains', '5-Domain Operating Model'),
        ],
      },
    },
    {
      path: '/services',
      name: 'Services & Transparent Pricing',
      title: 'Leadership Architecture Services & Pricing | The Unbounded Leadership Co.',
      description:
        'Fixed INR & global FX pricing: Mandate Forensic Diagnostic (Solo CEO ₹38450 | Group 3+ CXOs ₹89450), 90-Day Operating Architecture Embedding (₹284650), Fractional COO Retainer (₹205350/Qtr with 0% instalments), and Advisory Conclave (₹24850).',
      keywords:
        'Fractional COO pricing India, executive leadership diagnostic pricing, 90-day organizational transformation, CXO cohort assessment, leadership consulting Mumbai Bengaluru, Suchita Sancheti',
      image: DEFAULT_IMAGE,
      type: 'website',
      bodyHtml: wrapPageBody(`
        <article>
          <p style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.08em; color: #9d7b38; font-weight: bold;">Fixed Scope · Transparent INR &amp; International FX Checkout</p>
          <h1 style="font-size: 2.3rem; font-weight: bold; margin: 0.5rem 0 1rem;">Leadership Architecture Services &amp; Partnership Tracks</h1>
          <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">
            Every mandate at The Unbounded Leadership Co. has a fixed timeline, measurable execution deliverables, and transparent India INR and global USD, EUR, GBP, and AED pricing.
          </p>

          <section style="margin-bottom: 1.5rem;">
            <h2>Track 01 · Mandate Forensic Diagnostic (14 Days — 1 Founder or 3+ Leaders Together)</h2>
            <ul>
              <li><strong>Solo CEO / Founder Diagnostic:</strong> ₹38450 (ex-GST) — single full payment (no instalments). Includes full 5-domain audit, bottleneck telemetry, written 90-day execution blueprint, and access to the private Council Chamber.</li>
              <li><strong>Group CXO Cohort Diagnostic (3+ Leaders):</strong> ₹89450 (ex-GST) — single full payment (no instalments). Multi-executive alignment audit, cross-functional friction mapping, unified leadership roadmap, and access to the private Council Chamber.</li>
            </ul>
          </section>

          <section style="margin-bottom: 1.5rem;">
            <h2>Track 02 · Operating Architecture Embedding (90 Days)</h2>
            <p><strong>₹284650 (ex-GST)</strong> — 0% markup instalment options: 3 monthly instalments (₹94884 + ₹94883 + ₹94883), 2 bi-monthly instalments of ₹142325, or 25% kickoff lock ₹71162.50. Full installation of written delegation thresholds, 14-day autonomous execution sprints, leadership scorecards, live 30-day absence stress-test, and clean Day-90 handoff.</p>
          </section>

          <section style="margin-bottom: 1.5rem;">
            <h2>Track 03 · Fractional COO &amp; Strategic Retainer (Quarterly)</h2>
            <p><strong>₹205350 / Quarter (ex-GST)</strong> — 0% markup instalment options: 3 monthly instalments of ₹68450, 2 bi-monthly instalments of ₹102675, or 30% quarter lock deposit of ₹61605.</p>
          </section>

          <section style="margin-bottom: 1.5rem;">
            <h2>Executive Advisory Board Conclave</h2>
            <p><strong>₹24850 per seat (ex-GST)</strong> — Curated peer boardroom roundtable under Chatham House non-disclosure rules.</p>
          </section>

          <p>
            Looking for self-paced playbooks? Visit the <a href="/shop">Executive Toolkits Store</a> (100% credited toward future mandates) or <a href="/booking">schedule a private executive briefing</a>.
          </p>
        </article>
      `),
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebPage',
            name: 'Leadership Architecture Services & Pricing',
            url: `${SITE_URL}/services`,
            mainEntity: { '@id': `${SITE_URL}/#offer-catalog` },
          },
          buildBreadcrumbSchema('/services', 'Services & Pricing'),
        ],
      },
    },
    {
      path: '/shop',
      name: 'Executive Toolkits & Blueprints',
      title: 'Executive Toolkits & Delegation Blueprints | The Unbounded Leadership Co.',
      description:
        'Codified executive operating playbooks: The ₹425000 Delegation Matrix (₹6850), 14-Day Autonomous Execution Loop (₹9850), Complete Founder Decoupling Suite (₹14850), and Complete 3-Toolkit Bundle (₹23662.50). 100% credited toward future mandates.',
      keywords:
        'delegation matrix template, founder decoupling playbook, executive operating system toolkit, 14-day execution loop, leadership SOP templates India',
      image: DEFAULT_IMAGE,
      type: 'website',
      bodyHtml: wrapPageBody(`
        <article>
          <p style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.08em; color: #9d7b38; font-weight: bold;">Instant Digital Access · 100% Credited Toward Future Mandates</p>
          <h1 style="font-size: 2.3rem; font-weight: bold; margin: 0.5rem 0 1rem;">Executive Blueprints &amp; Systems Toolkits</h1>
          <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">
            Battle-tested governance blueprints, delegation covenants, and execution templates extracted directly from 90-day client engagements. Available in India INR and international USD, EUR, GBP, and AED checkout.
          </p>
          <ul>
            <li style="margin-bottom: 1rem;"><h2>The ₹425000 Delegation Matrix — ₹6850</h2><p>Written financial and operational decision-rights framework empowering managers to approve and execute without founder bottlenecks.</p></li>
            <li style="margin-bottom: 1rem;"><h2>The 14-Day Autonomous Execution Loop — ₹9850</h2><p>Sprint cadence, scorecard architecture, and 72-hour SLA protocols that replace endless status meetings with measurable delivery.</p></li>
            <li style="margin-bottom: 1rem;"><h2>The Complete Founder Decoupling Suite — ₹14850</h2><p>End-to-end 90-day founder transition architecture, C-suite hiring rubrics, and 30-day absence stress-test playbooks.</p></li>
            <li style="margin-bottom: 1rem;"><h2>The Complete 3-Toolkit Sovereign Suite (25% Bundle Savings) — ₹23662.50</h2><p>All three institutional toolkits combined at 25% savings with 100% credit toward any diagnostic or 90-day advisory mandate.</p></li>
          </ul>
          <p>Explore full <a href="/services">Advisory &amp; Fractional COO Services</a> or take the <a href="/assessment">Free 60-Second Assessment</a>.</p>
        </article>
      `),
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'CollectionPage',
            name: 'Executive Blueprints & Systems Toolkits',
            url: `${SITE_URL}/shop`,
            description:
              'Digital executive toolkits for delegation governance, autonomous 14-day execution loops, and founder decoupling.',
          },
          buildBreadcrumbSchema('/shop', 'Executive Toolkits'),
        ],
      },
    },
    {
      path: '/about',
      name: 'About Suchita Sancheti & The Firm',
      title: 'About Suchita Sancheti & The Unbounded Leadership Co.',
      description:
        'Meet Suchita Sancheti — Computer Science Engineer, Industrial Psychologist, and Founder of The Unbounded Leadership Co. Advising founders and CXOs globally on leadership architecture and Fractional COO execution.',
      keywords:
        'Suchita Sancheti, The Unbounded Leadership Co., Enterprise Architect, Fractional COO India, Industrial Psychologist leadership consultant, Mumbai Bengaluru advisory',
      image: `${SITE_URL}/suchita-sancheti.jpg`,
      type: 'profile',
      bodyHtml: wrapPageBody(`
        <article>
          <p style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.08em; color: #9d7b38; font-weight: bold;">Founder &amp; Enterprise Architect</p>
          <h1 style="font-size: 2.3rem; font-weight: bold; margin: 0.5rem 0 1rem;">About Suchita Sancheti &amp; The Unbounded Leadership Co.</h1>
          <p style="font-size: 1.1rem; margin-bottom: 1.25rem;">
            Suchita Sancheti is a Computer Science Engineer, Industrial Psychologist, and Founder of The Unbounded Leadership Co. She combines systems engineering discipline with organizational psychology to re-architect leadership operating systems for high-growth founders, CEOs, and C-suite teams across India, Dubai, London, Zurich, Singapore, and North America.
          </p>
          <h2>Institutional Philosophy</h2>
          <p>
            Management is about compliance. Leadership is about courage. Most leadership consultancies sell open-ended executive coaching that creates permanent dependency. The Unbounded Leadership Co. operates on fixed 90-day architectural mandates: we audit decision bottlenecks, codify written authority matrices, install autonomous execution rhythms, verify performance through a live 30-day absence protocol, and exit cleanly with 100% client playbook ownership.
          </p>
          <p style="margin-top: 1.25rem;">
            Read Suchita's <a href="/library">18 Executive Research Dispatches</a>, view <a href="/case-studies">Verified Client Case Studies</a>, or <a href="/contact">initiate a confidential inquiry</a>.
          </p>
        </article>
      `),
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'ProfilePage',
            name: 'About Suchita Sancheti & The Unbounded Leadership Co.',
            url: `${SITE_URL}/about`,
            mainEntity: { '@id': `${SITE_URL}/#suchita-sancheti` },
          },
          buildBreadcrumbSchema('/about', 'About Suchita Sancheti'),
        ],
      },
    },
    {
      path: '/case-studies',
      name: 'Verified Client Case Studies',
      title: 'Institutional Case Studies & Execution Outcomes | The Unbounded Leadership Co.',
      description:
        'Quantitative outcomes and boardroom performance logs from 90-day leadership operating system transformations: reclaimed CEO hours, faster decision velocity, and autonomous C-suite execution.',
      keywords:
        'leadership architecture case studies, founder decoupling results, Fractional COO outcomes, 90-day transformation metrics, executive delegation case study',
      image: DEFAULT_IMAGE,
      type: 'website',
      bodyHtml: wrapPageBody(`
        <article>
          <p style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.08em; color: #9d7b38; font-weight: bold;">Empirical Performance Logs</p>
          <h1 style="font-size: 2.3rem; font-weight: bold; margin: 0.5rem 0 1rem;">Institutional Case Studies &amp; Verified Outcomes</h1>
          <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">
            Anonymized boardroom performance logs documented under Chatham House confidentiality covenants, tracking measurable shifts in founder bandwidth, decision cycle speed, peer accountability, and enterprise valuation readiness within 90 days.
          </p>
          <ul>
            <li><strong>Founder Strategic Bandwidth Reclaimed:</strong> 15+ hours per week shifted from routine operational approvals to capital allocation, M&amp;A, and market expansion.</li>
            <li><strong>Decision Cycle Compression:</strong> Approval lag compressed from 2–3 weeks of consensus meetings to enforced 72-hour decision SLAs.</li>
            <li><strong>30-Day Absence Validation:</strong> Live operational stress-tests confirming uninterrupted revenue delivery, hiring, and client retention without founder intervention.</li>
          </ul>
          <p style="margin-top: 1.25rem;">
            Evaluate where your organization stands today with the <a href="/assessment">Free 60-Second Assessment</a> or review <a href="/services">Partnership Tracks</a>.
          </p>
        </article>
      `),
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'CollectionPage',
            name: 'Institutional Case Studies & Execution Outcomes',
            url: `${SITE_URL}/case-studies`,
            description:
              'Quantitative evidence and performance logs from 90-day leadership operating system transformations.',
          },
          buildBreadcrumbSchema('/case-studies', 'Case Studies'),
        ],
      },
    },
    {
      path: '/briefing',
      name: 'Executive Video Briefing',
      title: 'Executive Video Briefing by Suchita Sancheti | The Unbounded Leadership Co.',
      description:
        'Watch the direct founder video briefing by Suchita Sancheti on the 90-day founder decoupling architecture, 5 operational domains, and how leadership teams scale without approval bottlenecks.',
      keywords:
        'executive video briefing, Suchita Sancheti briefing, 90-day founder decoupling methodology, sovereign operating architecture',
      image: DEFAULT_IMAGE,
      type: 'website',
      bodyHtml: wrapPageBody(`
        <article>
          <p style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.08em; color: #9d7b38; font-weight: bold;">Direct Founder Briefing</p>
          <h1 style="font-size: 2.3rem; font-weight: bold; margin: 0.5rem 0 1rem;">Executive Video Briefing by Suchita Sancheti</h1>
          <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">
            An unvarnished boardroom briefing explaining why high-growth companies hit an invisible ceiling when every critical decision routes through the founder, and how our 90-day operating system re-architecture removes that ceiling permanently.
          </p>
          <p>
            After watching the briefing, take the <a href="/assessment">60-Second Executive Assessment</a> or <a href="/booking">reserve a confidential 20-minute dialogue</a>.
          </p>
        </article>
      `),
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebPage',
            name: 'Executive Video Briefing by Suchita Sancheti',
            url: `${SITE_URL}/briefing`,
            description:
              'Direct founder briefing on 90-day decoupling methodology and executive operating architecture.',
          },
          buildBreadcrumbSchema('/briefing', 'Executive Video Briefing'),
        ],
      },
    },
    {
      path: '/library',
      name: 'Strategic Intelligence Library',
      title: 'Strategic Intelligence Library | 18 Executive Dispatches | The Unbounded Leadership Co.',
      description:
        'Read 18 institutional research dispatches and monographs by Suchita Sancheti on eliminating founder dependency, delegation architecture, decision speed, EBITDA leakage, and autonomous leadership systems.',
      keywords:
        'executive leadership articles, founder dependency monographs, delegation architecture essays, CEO burnout systems failure, Suchita Sancheti library',
      image: DEFAULT_IMAGE,
      type: 'website',
      bodyHtml: wrapPageBody(`
        <article>
          <p style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.08em; color: #9d7b38; font-weight: bold;">18 Institutional Research Dispatches by Suchita Sancheti</p>
          <h1 style="font-size: 2.3rem; font-weight: bold; margin: 0.5rem 0 1rem;">Strategic Intelligence Library &amp; Executive Monographs</h1>
          <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">
            Direct boardroom diagnoses, architecture blueprints, and battle-tested governance remedies for founders, CEOs, and C-suite leaders scaling complex enterprises.
          </p>
          <ol style="padding-left: 1.5rem;">
            ${libraryLinksHtml}
          </ol>
        </article>
      `),
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'CollectionPage',
            name: 'Strategic Intelligence Library — 18 Executive Dispatches',
            url: `${SITE_URL}/library`,
            description:
              '18 executive research dispatches by Suchita Sancheti on leadership architecture, delegation governance, and founder decoupling.',
            hasPart: posts.map((p) => ({
              '@type': 'Article',
              headline: p.title,
              url: `${SITE_URL}/library/${p.slug}`,
            })),
          },
          buildBreadcrumbSchema('/library', 'Intelligence Library'),
        ],
      },
    },
    {
      path: '/faq',
      name: 'Corporate FAQ & Leadership Architecture Guide',
      title: 'Corporate FAQ & Leadership Architecture Guide | The Unbounded Leadership Co.',
      description:
        '27 verified institutional answers on founder dependency, 90-day operating system embedding, Solo CEO vs Group CXO diagnostic pricing, Fractional COO retainers, and global engagement terms.',
      keywords:
        'leadership architecture FAQ, founder dependency questions, Fractional COO FAQ India, 90-day transformation FAQ, Suchita Sancheti FAQ',
      image: DEFAULT_IMAGE,
      type: 'website',
      bodyHtml: wrapPageBody(`
        <article>
          <p style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.08em; color: #9d7b38; font-weight: bold;">27 Verified Institutional Answers</p>
          <h1 style="font-size: 2.3rem; font-weight: bold; margin: 0.5rem 0 1rem;">Corporate FAQ &amp; Leadership Architecture Guide</h1>
          <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">
            Clear, direct answers on how The Unbounded Leadership Co. eliminates founder dependency in 90 days, structures Solo CEO (₹38450) and Group CXO (₹89450) diagnostics, delivers Fractional COO retainers with 0% instalments, and works with global leadership teams under Chatham House confidentiality.
          </p>
          <dl>
            <dt style="font-weight: bold; margin-top: 1rem;">How is Leadership Architecture different from executive coaching?</dt>
            <dd style="margin: 0.25rem 0 1rem 0;">Coaching focuses on personal habits over open-ended retainers. Leadership Architecture installs hard operating systems — written decision limits, 14-day delivery loops, leadership scorecards, and a 30-day absence stress-test — in a fixed 90-day mandate.</dd>
            <dt style="font-weight: bold; margin-top: 1rem;">What is the difference between the Solo CEO Diagnostic and Group CXO Cohort Diagnostic?</dt>
            <dd style="margin: 0.25rem 0 1rem 0;">The Solo CEO Diagnostic (₹38450 ex-GST) audits a single founder or CEO's bottleneck profile over 14 days. The Group CXO Cohort Diagnostic (₹89450 ex-GST) assesses 3 or more C-suite leaders together to uncover cross-functional misalignment and approval drag.</dd>
            <dt style="font-weight: bold; margin-top: 1rem;">Do you work with companies outside India?</dt>
            <dd style="margin: 0.25rem 0 1rem 0;">Yes. We advise founders and leadership teams across Dubai, London, Zurich, Singapore, Europe, and North America with automated USD, EUR, GBP, and AED checkout (0% export GST exempt).</dd>
          </dl>
          <p style="margin-top: 1.5rem;">Still have a specific boardroom question? <a href="/contact">Contact the Advisory Desk</a> or <a href="/booking">schedule a 20-minute briefing</a>.</p>
        </article>
      `),
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebPage',
            name: 'Corporate FAQ & Leadership Architecture Guide',
            url: `${SITE_URL}/faq`,
          },
          buildBreadcrumbSchema('/faq', 'Corporate FAQ'),
        ],
      },
    },
    {
      path: '/contact',
      name: 'Confidential Advisory Desk',
      title: 'Contact Advisory Desk | The Unbounded Leadership Co.',
      description:
        'Initiate a confidential executive mandate dialogue under Chatham House non-disclosure rules. Direct phone (+91 9325346704) and advisory desk email (suchita@theunboundedleadership.com).',
      keywords:
        'contact Suchita Sancheti, Fractional COO inquiry India, executive advisory desk, confidential mandate inquiry, The Unbounded Leadership Co. contact',
      image: DEFAULT_IMAGE,
      type: 'website',
      bodyHtml: wrapPageBody(`
        <article>
          <p style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.08em; color: #9d7b38; font-weight: bold;">Chatham House Protocol · In-Camera Privilege Enforced</p>
          <h1 style="font-size: 2.3rem; font-weight: bold; margin: 0.5rem 0 1rem;">Contact the Confidential Advisory Desk</h1>
          <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">
            All executive inquiries, diagnostic briefings, and boardroom consultations are handled directly under strict confidentiality.
          </p>
          <ul>
            <li><strong>Direct Executive Line:</strong> <a href="tel:+919325346704">+91 9325346704</a></li>
            <li><strong>Advisory Desk Email:</strong> <a href="mailto:suchita@theunboundedleadership.com">suchita@theunboundedleadership.com</a></li>
            <li><strong>Headquarters &amp; Global Practice:</strong> Mumbai &amp; Bengaluru, India — serving leadership teams worldwide (Dubai, London, Zurich, Singapore, North America).</li>
          </ul>
          <p style="margin-top: 1.25rem;">Prefer to lock a time directly? Use our <a href="/booking">Executive Scheduling Desk</a>.</p>
        </article>
      `),
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'ContactPage',
            name: 'Contact Advisory Desk — The Unbounded Leadership Co.',
            url: `${SITE_URL}/contact`,
            mainEntity: { '@id': `${SITE_URL}/#organization` },
          },
          buildBreadcrumbSchema('/contact', 'Contact'),
        ],
      },
    },
    {
      path: '/booking',
      name: 'Schedule Private Executive Briefing',
      title: 'Schedule Private Executive Briefing | The Unbounded Leadership Co.',
      description:
        'Reserve a confidential 20-minute executive briefing directly with Suchita Sancheti under Chatham House non-disclosure rules.',
      keywords:
        'book executive briefing, schedule consultation Suchita Sancheti, Fractional COO discovery call, CEO advisory booking',
      image: DEFAULT_IMAGE,
      type: 'website',
      bodyHtml: wrapPageBody(`
        <article>
          <p style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.08em; color: #9d7b38; font-weight: bold;">Direct Executive Calendar</p>
          <h1 style="font-size: 2.3rem; font-weight: bold; margin: 0.5rem 0 1rem;">Schedule a Private Executive Briefing</h1>
          <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">
            Reserve a confidential 20-minute briefing with Suchita Sancheti to review your leadership bottlenecks, diagnostic scope (Solo CEO or Group 3+ CXOs), or 90-day operating system embedding timeline.
          </p>
          <p>
            Before our call, you can optionally complete the <a href="/assessment">Free 60-Second Executive Assessment</a> or review <a href="/services">Transparent Track Pricing</a>.
          </p>
        </article>
      `),
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebPage',
            name: 'Schedule Private Executive Briefing',
            url: `${SITE_URL}/booking`,
          },
          buildBreadcrumbSchema('/booking', 'Schedule Briefing'),
        ],
      },
    },
    {
      path: '/privacy',
      name: 'Privacy Policy & Data Covenant',
      title: 'Privacy Policy & Data Covenant | The Unbounded Leadership Co.',
      description:
        'Institutional privacy policy, Chatham House confidentiality covenants, and GDPR/CCPA data protection standards for The Unbounded Leadership Co.',
      keywords:
        'The Unbounded Leadership Co. privacy policy, Chatham House confidentiality, executive advisory data governance',
      image: DEFAULT_IMAGE,
      type: 'website',
      bodyHtml: wrapPageBody(`
        <article>
          <p style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.08em; color: #9d7b38; font-weight: bold;">Institutional Governance &amp; Confidentiality</p>
          <h1 style="font-size: 2.3rem; font-weight: bold; margin: 0.5rem 0 1rem;">Privacy Policy &amp; Data Covenant</h1>
          <p style="font-size: 1.1rem; margin-bottom: 1.25rem;">
            The Unbounded Leadership Co. enforces Chatham House confidentiality and zero third-party data resale across all executive assessments, inquiries, and advisory engagements. Assessment telemetry and inquiry records are used solely to deliver your requested diagnostic report or consultation.
          </p>
          <p>For data access or deletion requests, email <a href="mailto:suchita@theunboundedleadership.com">suchita@theunboundedleadership.com</a>.</p>
        </article>
      `),
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebPage',
            name: 'Privacy Policy & Data Covenant',
            url: `${SITE_URL}/privacy`,
          },
          buildBreadcrumbSchema('/privacy', 'Privacy Policy'),
        ],
      },
    },
    {
      path: '/portal',
      name: 'Institutional Clearance Portal',
      title: 'Institutional Clearance & Client Portal | The Unbounded Leadership Co.',
      description:
        'Authorized client portal for active retainer partners, board directors, and 90-day executive architecture cohorts at The Unbounded Leadership Co.',
      keywords: 'client portal, executive retainer access, The Unbounded Leadership Co. portal',
      image: DEFAULT_IMAGE,
      type: 'website',
      robots: 'noindex, follow',
      bodyHtml: wrapPageBody(`
        <article>
          <h1 style="font-size: 2.2rem; font-weight: bold; margin: 0.5rem 0 1rem;">Institutional Clearance &amp; Client Portal</h1>
          <p>Authorized access gateway for active 90-day embedding and Fractional COO retainer partners. Prospective clients may <a href="/contact">initiate a confidential inquiry</a> or explore <a href="/services">Partnership Tracks</a>.</p>
        </article>
      `),
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebPage',
            name: 'Institutional Clearance & Client Portal',
            url: `${SITE_URL}/portal`,
          },
          buildBreadcrumbSchema('/portal', 'Client Portal'),
        ],
      },
    },
  ];

  // Dynamically generate full pre-rendered SEO route specs for all 18 live dispatches
  const articlePages = posts.map((post) => {
    const canonicalPath = `/library/${post.slug}`;
    const articleImage = post.imageUrl
      ? post.imageUrl.startsWith('http')
        ? post.imageUrl
        : `${SITE_URL}${post.imageUrl}`
      : DEFAULT_IMAGE;

    const sectionsHtml = (post.bodySections || [])
      .map(
        (sec) => `
          <section style="margin-top: 1.5rem;">
            <h2 style="font-size: 1.45rem; font-weight: bold; margin-bottom: 0.5rem;">${escapeHtml(sec.heading)}</h2>
            ${sec.subheading ? `<h3 style="font-size: 1rem; color: #9d7b38; margin-bottom: 0.5rem;">${escapeHtml(sec.subheading)}</h3>` : ''}
            ${(sec.content || []).map((p) => `<p style="margin-bottom: 0.85rem;">${escapeHtml(stripInlineMarkdown(p))}</p>`).join('')}
          </section>`
      )
      .join('');

    const takeawaysHtml = (post.keyTakeaways || []).length
      ? `
          <section style="margin-top: 1.75rem; padding: 1.25rem; background: #faf8f5; border: 1px solid #ded6c5;">
            <h2 style="font-size: 1.25rem; margin-top: 0;">Key Strategic Takeaways</h2>
            <ul style="padding-left: 1.25rem; margin-bottom: 0;">
              ${post.keyTakeaways.map((t) => `<li style="margin-bottom: 0.4rem;">${escapeHtml(t)}</li>`).join('')}
            </ul>
          </section>`
      : '';

    const faqHtml = (post.faqItems || []).length
      ? `
          <section style="margin-top: 1.75rem;">
            <h2 style="font-size: 1.35rem;">Executive Inquiries &amp; Frequently Asked Questions</h2>
            <dl>
              ${post.faqItems
                .map(
                  (f) => `
                <dt style="font-weight: bold; margin-top: 0.9rem;">${escapeHtml(f.question)}</dt>
                <dd style="margin: 0.25rem 0 0.75rem 0;">${escapeHtml(f.answer)}</dd>`
                )
                .join('')}
            </dl>
          </section>`
      : '';

    const directAnswerHtml = post.aeoDirectAnswer
      ? `
          <div style="background: #faf6ee; border-left: 4px solid #9d7b38; padding: 1.15rem; margin: 1.25rem 0;">
            <p style="font-weight: bold; margin: 0 0 0.5rem 0;">${escapeHtml(post.aeoDirectAnswer.coreDefinition)}</p>
            <p style="margin: 0; font-size: 0.95rem; color: #4e5159;"><strong>Actionable Protocol:</strong> ${escapeHtml(post.aeoDirectAnswer.executiveActionSnippet)}</p>
          </div>`
      : '';

    const graphNodes = [
      {
        '@type': 'Article',
        '@id': `${SITE_URL}${canonicalPath}#article`,
        headline: post.title,
        description: post.executiveSummary || post.subtitle,
        image: articleImage,
        datePublished: '2026-08-01T08:00:00+00:00',
        dateModified: '2026-11-18T00:00:00+00:00',
        articleSection: post.category,
        keywords: (post.keywords || []).join(', '),
        inLanguage: 'en',
        author: { '@id': `${SITE_URL}/#suchita-sancheti` },
        publisher: { '@id': `${SITE_URL}/#organization` },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${SITE_URL}${canonicalPath}`,
        },
      },
      buildBreadcrumbSchema(canonicalPath, post.title, {
        name: 'Intelligence Library',
        path: '/library',
      }),
    ];

    if (post.faqItems && post.faqItems.length > 0) {
      graphNodes.push({
        '@type': 'FAQPage',
        mainEntity: post.faqItems.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      });
    }

    return {
      path: canonicalPath,
      name: post.title,
      title: `${post.title} | The Unbounded Leadership Co.`,
      description: post.executiveSummary || post.subtitle,
      keywords: (post.keywords || []).join(', '),
      image: articleImage,
      type: 'article',
      bodyHtml: wrapPageBody(`
        <article>
          <p style="font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.08em; color: #9d7b38; font-weight: bold;">
            ${escapeHtml(post.category)} · ${escapeHtml(post.readTime)} · Authored by Suchita Sancheti
          </p>
          <h1 style="font-size: 2.2rem; font-weight: bold; margin: 0.5rem 0 0.75rem; line-height: 1.2;">${escapeHtml(post.title)}</h1>
          <p style="font-size: 1.1rem; font-style: italic; color: #57534e; margin-bottom: 1.25rem;">${escapeHtml(post.subtitle)}</p>
          ${directAnswerHtml}
          ${post.controversialOpening ? `<blockquote style="margin: 1.25rem 0; padding-left: 1rem; border-left: 3px solid #9d7b38; font-style: italic;">"${escapeHtml(post.controversialOpening)}"</blockquote>` : ''}
          ${sectionsHtml}
          ${takeawaysHtml}
          ${faqHtml}
          <nav aria-label="Library Navigation" style="margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #ded6c5; display: flex; gap: 1.5rem; flex-wrap: wrap;">
            <a href="/library" style="color: #9d7b38; font-weight: bold;">← All 18 Executive Dispatches</a>
            <a href="/assessment" style="color: #17181c; font-weight: bold;">Take Free 60-Second Assessment →</a>
            <a href="/services" style="color: #17181c; font-weight: bold;">Explore Advisory Services →</a>
          </nav>
        </article>
      `),
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': graphNodes,
      },
    };
  });

  return [...primaryPages, ...articlePages];
}

/**
 * Alias routes that resolve to a canonical subpage.
 * Each alias emits <link rel="canonical" href="https://theunboundedleadership.com<CANONICAL>">
 * so duplicate URLs consolidate link equity cleanly to the single canonical URL.
 */
export const ROUTE_ALIASES = {
  '/diagnostic': '/assessment',
  '/audit': '/assessment',
  '/simple-test': '/assessment',
  '/founder-assessment': '/assessment',
  '/deep-assessment': '/assessment',
  '/forensic-diagnostic': '/assessment',
  '/war-room': '/assessment',
  '/5-domains': '/domains',
  '/framework': '/domains',
  '/methodology': '/domains',
  '/partnerships': '/services',
  '/retainer': '/services',
  '/mandates': '/services',
  '/products': '/shop',
  '/toolkits': '/shop',
  '/vault': '/shop',
  '/store': '/shop',
  '/documents': '/shop',
  '/publications': '/shop',
  '/blueprints': '/shop',
  '/dispatches': '/library',
  '/blogs': '/library',
  '/blog': '/library',
  '/articles': '/library',
  '/article': '/library',
  '/dispatch': '/library',
  '/video': '/briefing',
  '/founder-briefing': '/briefing',
  '/founder': '/about',
  '/vision-mission': '/about',
  '/inquiry': '/contact',
  '/intake': '/contact',
  '/calendly': '/booking',
  '/calendar': '/booking',
  '/schedule': '/booking',
  '/clearance': '/portal',
  '/client-portal': '/portal',
  '/proof': '/case-studies',
  '/outcomes': '/case-studies',
  '/faqs': '/faq',
  '/questions': '/faq',
  '/terms': '/privacy',
  '/privacy-policy': '/privacy',
};

/**
 * Transforms an HTML template (either dist/index.html or root index.html)
 * into a route-specific, self-canonicalized, crawler-ready HTML document.
 */
export function renderRouteHtml(templateHtml, routeSpec) {
  const canonicalUrl = `${SITE_URL}${routeSpec.path}`;
  const titleEsc = escapeHtml(routeSpec.title);
  const descEsc = escapeHtml(routeSpec.description);
  const keywordsEsc = escapeHtml(routeSpec.keywords || '');
  const imageEsc = escapeHtml(routeSpec.image || DEFAULT_IMAGE);
  const ogType = escapeHtml(routeSpec.type || 'website');
  const robotsContent = escapeHtml(
    routeSpec.robots || 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
  );

  let html = templateHtml;

  // Replace <title>
  html = html.replace(/<title>[^<]*<\/title>/i, () => `<title>${titleEsc}</title>`);

  // Replace meta tags using strict single-tag regexes ([^>]*) so adjacent tags are never consumed
  html = html.replace(
    /<meta\b[^>]*\bname="title"[^>]*>/i,
    () => `<meta name="title" content="${titleEsc}" />`
  );
  html = html.replace(
    /<meta\b[^>]*\bname="description"[^>]*>/i,
    () => `<meta name="description" content="${descEsc}" />`
  );
  if (keywordsEsc) {
    html = html.replace(
      /<meta\b[^>]*\bname="keywords"[^>]*>/i,
      () => `<meta name="keywords" content="${keywordsEsc}" />`
    );
  }
  html = html.replace(
    /<meta\b[^>]*\bname="robots"[^>]*>/i,
    () => `<meta name="robots" content="${robotsContent}" />`
  );

  // Replace canonical URL (CRITICAL: self-referencing canonical, never "/")
  html = html.replace(
    /<link\b[^>]*\brel="canonical"[^>]*>/i,
    () => `<link rel="canonical" href="${canonicalUrl}" />`
  );

  // Replace Open Graph tags
  html = html.replace(
    /<meta\b[^>]*\bproperty="og:type"[^>]*>/i,
    () => `<meta property="og:type" content="${ogType}" />`
  );
  html = html.replace(
    /<meta\b[^>]*\bproperty="og:url"[^>]*>/i,
    () => `<meta property="og:url" content="${canonicalUrl}" />`
  );
  html = html.replace(
    /<meta\b[^>]*\bproperty="og:title"[^>]*>/i,
    () => `<meta property="og:title" content="${titleEsc}" />`
  );
  html = html.replace(
    /<meta\b[^>]*\bproperty="og:description"[^>]*>/i,
    () => `<meta property="og:description" content="${descEsc}" />`
  );
  html = html.replace(
    /<meta\b[^>]*\bproperty="og:image"[^>]*>/i,
    () => `<meta property="og:image" content="${imageEsc}" />`
  );

  // Replace Twitter tags
  html = html.replace(
    /<meta\b[^>]*\bname="twitter:url"[^>]*>/i,
    () => `<meta name="twitter:url" content="${canonicalUrl}" />`
  );
  html = html.replace(
    /<meta\b[^>]*\bname="twitter:title"[^>]*>/i,
    () => `<meta name="twitter:title" content="${titleEsc}" />`
  );
  html = html.replace(
    /<meta\b[^>]*\bname="twitter:description"[^>]*>/i,
    () => `<meta name="twitter:description" content="${descEsc}" />`
  );
  html = html.replace(
    /<meta\b[^>]*\bname="twitter:image"[^>]*>/i,
    () => `<meta name="twitter:image" content="${imageEsc}" />`
  );

  // Append route-specific JSON-LD right before </head>
  if (routeSpec.jsonLd) {
    const safeJsonLd = JSON.stringify(routeSpec.jsonLd).replace(/</g, '\\u003c');
    const routeJsonLdScript = `    <script type="application/ld+json" id="route-prerender-jsonld">${safeJsonLd}</script>\n  </head>`;
    html = html.replace(/<\/head>/i, () => routeJsonLdScript);
  }

  // Replace pre-rendered body content inside <div id="root">...</div> (works for both dev and Vite dist builds)
  if (routeSpec.bodyHtml) {
    html = html.replace(
      /<div id="root">[\s\S]*?<\/footer>\s*<\/div>/i,
      () => `<div id="root">${routeSpec.bodyHtml}\n    </div>`
    );
  }

  return html;
}
