import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from "@google/genai";
import { Resend } from 'resend';
import { INSTITUTIONAL_ARTICLES } from './src/lib/articles.ts';

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
  
  // Environment Metadata Calibration
  console.log('--- Institutional Environment Check ---');
  console.log(`RESEND_API_KEY: ${process.env.RESEND_API_KEY ? 'CALIBRATED' : 'MISSING'}`);
  console.log(`GEMINI_API_KEY: ${process.env.GEMINI_API_KEY ? 'CALIBRATED' : 'MISSING'}`);
  console.log(`VITE_ADMIN_EMAIL: ${process.env.VITE_ADMIN_EMAIL || 'DEFAULT (kaminiagnihotri249@gmail.com)'}`);
  console.log(`VITE_SENDER_EMAIL: ${process.env.VITE_SENDER_EMAIL || 'DEFAULT (concierge@theunboundedleadership.com)'}`);
  console.log('----------------------------------------');

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
    const articles = [
      'architecture-of-authority',
      'strategic-substrates',
      'aligned-leadership',
      'founders-dilemma',
      'cognitive-tax-of-leadership',
      'bridging-strategy-execution-gap',
      'reclaiming-strategic-bandwidth',
      'institutional-lag',
      'engineering-strategic-bandwidth',
      'aligned-authority-vs-reactive-management',
      'dynamics-of-inevitability',
      'cost-of-organizational-latency',
      'transitioning-founder-to-chairman',
      'ceo-burnout-systems-failure'
    ];
    const articleUrls = articles.map(slug => `<url><loc>${host}/library/${slug}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`).join('\n  ');
    
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${host}/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
  <url><loc>${host}/about</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${host}/services</loc><changefreq>weekly</changefreq><priority>0.9</priority></url>
  <url><loc>${host}/methodology</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
  <url><loc>${host}/assessment</loc><changefreq>daily</changefreq><priority>0.9</priority></url>
  <url><loc>${host}/library</loc><changefreq>daily</changefreq><priority>0.9</priority></url>
  <url><loc>${host}/intake</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>
  ${articleUrls}
</urlset>`);
  });

  // AEO: llms.txt (The Strategic Alignment Beacon for AI Engines)
  app.get('/llms.txt', (req, res) => {
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
- Phase 0.0: Substrate Diagnostic Audit (14-day deep forensic discovery of decision leaks)
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
- [Full Knowledge Base](${host}/llms-full.txt)
- [Sitemap Registry](${host}/sitemap.xml)
- [Initiate Audit](${host}/assessment)
- [Diagnostic Intake Form](${host}/intake)
`);
  });

  // AEO/GEO: llms-full.txt (Deep Intellectual Substrate Compilation)
  app.get('/llms-full.txt', (req, res) => {
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
    
    doc += `\n*End of Compilation. Protected by Institutional Copyright. For dynamic integration, contact Kamini Agnihotri at kaminiagnihotri249@gmail.com.*`;
    res.send(doc);
  });

  // IndexNow Verification Key
  app.get('/8c92a1b3d5e7f9024680acebdf135792.txt', (req, res) => {
    res.type('text/plain');
    res.send('8c92a1b3d5e7f9024680acebdf135792');
  });

  // Dynamic Backlink SVG Badge Endpoint
  app.get('/assets/badges/calibrated.svg', (req, res) => {
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

  // Institutional Post Dispatch: Multi-Channel Notify (Resend Integration)
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, organization, role, message, type, selected_date, selected_time } = req.body;
      const resendKey = process.env.RESEND_API_KEY;
      const adminEmail = process.env.VITE_ADMIN_EMAIL || 'kaminiagnihotri249@gmail.com';
      const senderEmail = process.env.VITE_SENDER_EMAIL || 'concierge@theunboundedleadership.com';
      const senderName = process.env.VITE_SENDER_NAME || 'The Unbounded Leadership Co.';
      // Note: If the domain above is not verified in Resend, these will fail.
      const sender = `${senderName} <${senderEmail}>`; 

      // 1. Admin Notification Payload
      const adminSubject = type === 'CALIBRATION_REQUEST' 
        ? `[PRIORITY] Alignment Request: ${name}` 
        : `[LEAD] New Aligned Entry: ${name}`;

      const adminHtml = `
        <div style="font-family: serif; color: #111; max-width: 600px; border-left: 4px solid #b8860b; padding: 20px;">
          <h2 style="text-transform: uppercase; font-size: 10px; letter-spacing: 0.3em; color: #b8860b;">Institutional Intake Terminal</h2>
          <h1 style="font-size: 24px;">New Lead Dispatch</h1>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Principal:</strong> ${name}</p>
          <p><strong>Identity:</strong> ${email}</p>
          <p><strong>Organization:</strong> ${organization}</p>
          ${role ? `<p><strong>Role:</strong> ${role}</p>` : ''}
          ${selected_date ? `<p><strong>Requested Window:</strong> ${selected_date} at ${selected_time}</p>` : ''}
          <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; font-style: italic;">
            ${message || 'No message provided.'}
          </div>
          <p style="font-size: 10px; color: #999; margin-top: 30px; letter-spacing: 0.1em;">© 2026 The Unbounded Leadership Co. | Global Leadership Architecture</p>
        </div>
      `;

      // 2. User Acknowledgment Payload (The "Office of the Principal" Look)
      let userSubject = "Dispatch Acknowledged | Potential Strategic Yield: +40% Bandwidth";
      let userHeadline = "Your institutional audit has been initiated.";
      let userMessage = "Our methodology focuses on reclaiming 40% of your cognitive capacity—the direct path to doubling institutional yield and engineering permanent market leadership.";
      let preheader = "Reclaim 40% of your strategic bandwidth and engineering permanent market leadership.";

      if (type === 'CALIBRATION_REQUEST') {
        userSubject = `Strategic Yield Engineering: Access Request Logged for ${name}`;
        userHeadline = "Reclaim your strategic bandwidth. Your alignment session request is logged.";
        userMessage = `Your requested window on ${selected_date} at ${selected_time} is being processed for architectural review. This calibration is engineered to transform your organization into a zero-latency revenue engine, ensuring every strategic intent converts into market dominance with absolute fidelity.`;
        preheader = "Your alignment session request is logged. Transform your organization into a zero-latency revenue engine.";
      } else if (type === 'WAITLIST_ENTRY') {
        userSubject = "Protocol Verified | Position Secured for 2.5x Strategic Velocity";
        userHeadline = "Your path to institutional alignment is now sequenced.";
        userMessage = "You have been successfully added to the Strategic Waiting List. This entry ensures that your organization is prioritized for a 2.5x increase in strategic velocity, repurposing lost cognitive equity into immediate revenue growth and undisputed authority.";
        preheader = "Your position is secured for 2.5x strategic velocity. Reclaim your lost cognitive equity for revenue growth.";
      } else if (type === 'NEWSLETTER_SUBSCRIPTION') {
        userSubject = "Intelligence Feed Active | Engineering Institutional Permanence";
        userHeadline = "Handshake confirmed. You are now receiving Institutional Dispatches.";
        userMessage = "You have been registered for Strategic Intelligence. These dispatches are designed to neutralize the 'Cognitive Tax' of leadership, providing the architectural blueprints required to achieve undisputed market authority and recursive revenue growth.";
        preheader = "Secure your intelligence feed for engineering institutional permanence and revenue growth.";
      } else if (type === 'SIGNUP_INITIATED') {
        userSubject = "Access Authorized | Your Institutional Audit is Ready";
        userHeadline = "Handshake Confirmed. Begin your baseline audit.";
        userMessage = "You have successfully initiated the identity verification protocol. The Systemic Baseline Audit is now active. Completing this forensic analysis will reveal your specific 'Cognitive Tax' and identify the primary architectural bottlenecks preventing global scale.";
        preheader = "Your identity is verified. The Systemic Baseline Audit is now active. Map your cognitive tax.";
      } else if (type === 'ASSESSMENT_COMPLETED') {
        const { totalScore, domainScores } = req.body.assessmentData || { totalScore: 0, domainScores: [] };
        userSubject = `Audit Synthesized: ${totalScore}/25 | Reclaiming Billions in Cognitive Equity`;
        userHeadline = "Your leadership architecture has been forensically analyzed for maximum yield.";
        preheader = `Score: ${totalScore}/25. We have quantified your 'Cognitive Tax'—reclaim your strategic bandwidth for pure architectural command.`;
        
        const domainContent: Record<string, string> = {
          "Cognitive Clarity": "Neutralize the 'Cognitive Tax' consuming 40% of your bandwidth. Clarity is the primary substrate of execution and revenue generation.",
          "Systemic Integrity": "Protect your focus through structural integrity. Systems that run independently of individual effort guarantee institutional alignment.",
          "Strategic Velocity": "Compress the distance between intent and revenue. Antifragile substrates convert market disruption into immediate strategic leverage.",
          "Moral Gravity": "The structural inevitability of trust. Eliminating reputational friction reclaims the cognitive equity lost to behavioral maintenance.",
          "Cultural Fidelity": "Zero operational drift. Autonomous culture ensures every strategic move at the edge yields maximum market conversion."
        };

        const domainTable = domainScores.map((ds: any) => `
          <div style="margin-bottom: 20px; padding: 15px; background: #fcfcfc; border: 1px solid #eee;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
              <span style="font-size: 10px; font-weight: bold; text-transform: uppercase; color: #b8860b;">${ds.domain}</span>
              <span style="font-size: 10px; font-weight: bold; color: #111;">${ds.score}/5</span>
            </div>
            <p style="font-size: 12px; font-style: italic; color: #666; margin: 5px 0 0 0;">${domainContent[ds.domain] || ''}</p>
          </div>
        `).join('');

        userMessage = `
          We have quantified your 'Cognitive Tax.' By neutralizing the tactical noise identified in your assessment, you are positioned to shift from management to pure architectural command—the highest form of revenue-generating leadership.
          <div style="margin-top: 30px;">
            <h4 style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; margin-bottom: 15px;">Dossier Snapshot: Domain Calibration</h4>
            ${domainTable}
          </div>
          <p style="margin-top: 30px; font-size: 14px; font-weight: bold;">Aggregate Fidelity: ${Math.round((totalScore / 25) * 100)}%</p>
        `;
      }

      const userHtml = `
        <div style="font-family: 'Times New Roman', serif; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 40px; border: 1px solid #eee; line-height: 1.6;">
          <!-- Preheader Text for AI Summaries -->
          <div style="display: none; max-height: 0px; overflow: hidden;">
            ${preheader}
          </div>
          
          <div style="text-align: center; margin-bottom: 40px;">
            <div style="font-size: 14px; letter-spacing: 0.4em; text-transform: uppercase; color: #b8860b; border-bottom: 1px solid #b8860b; display: inline-block; padding-bottom: 5px; margin-bottom: 10px;">The Unbounded Leadership Co.</div>
            <div style="font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #999;">The Unbounded Leadership Co. | Office of the Principal</div>
          </div>
          
          <h1 style="font-size: 22px; margin-bottom: 20px; font-weight: bold; color: #111;">${userHeadline}</h1>
          
          <p style="font-size: 16px; margin-bottom: 25px;">Dear ${name},</p>
          
          <p style="margin-bottom: 25px; font-size: 18px; font-style: italic; color: #333;">${userMessage}</p>
          
          <p style="margin-bottom: 25px;">At <strong>The Unbounded Leadership Co.</strong>, we recognize that high-stakes leadership is an engineering challenge. Our focus isn't just on incremental gains; it's on the complete removal of institutional friction so that every strategic move yields maximum market conversion and revenue growth.</p>
          
          <p style="margin-bottom: 25px;">A senior strategist is now reviewing your organizational telemetry. Should the audit reveal a substrate primed for transformation, we will facilitate the next logic gate in our engagement protocol.</p>
          
          <div style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="font-size: 14px; margin: 0;">Sincerely,</p>
            <p style="font-size: 14px; font-weight: bold; margin: 5px 0 0 0; color: #b8860b;">Kamini Agnihotri (kaminiagnihotri249@gmail.com)</p>
            <p style="font-size: 12px; font-weight: bold; margin: 0; color: #999; text-transform: uppercase; letter-spacing: 0.1em;">Principal Architect</p>
            <p style="font-size: 12px; color: #999; margin: 5px 0 0 0;">London • Singapore • New York</p>
          </div>
          
          <div style="margin-top: 40px; font-size: 10px; color: #ccc; text-align: center; letter-spacing: 0.1em;">
            CONFIDENTIALITY NOTICE: This dispatch contains proprietary institutional intelligence and is intended strictly for ${email}.
          </div>
        </div>
      `;

      console.log(`EMAIL_DISPATCH_ORCHESTRATION: Initiating dual-delivery for ${email}`);
      console.log(`DEBUG: resendKey exists? ${!!resendKey}, adminEmail: ${adminEmail}`);

      let adminResult: any = null;
      let userResult: any = null;

      if (resendKey) {
        const resend = new Resend(resendKey);
        
        try {
          const fallbackSender = 'onboarding@resend.dev';

          // Notify Admin
          console.log(`[MAIL] DISPATCH_SEQUENCE_START: Admin: ${adminEmail} | From: ${sender}`);
          try {
            adminResult = await resend.emails.send({
              from: sender,
              to: [adminEmail],
              reply_to: [email],
              subject: adminSubject,
              html: adminHtml,
            });
          } catch (e: any) {
            console.error(`[MAIL] PRIMARY_SENDER_EXCEPTION: ${e.message || e}`);
            adminResult = { error: e };
          }

          // If the primary send failed (either via returned error or threw exception), initiate fallback
          if (adminResult?.error) {
            console.log(`[MAIL] PRIMARY_SENDER_FAILURE: ${JSON.stringify(adminResult.error)}. FALLBACK_INITIATED: Attempting with ${fallbackSender}...`);
            try {
              adminResult = await resend.emails.send({
                from: fallbackSender,
                to: [adminEmail],
                reply_to: [email],
                subject: `[FALLBACK] ${adminSubject}`,
                html: `<div style="background: #fff4f4; padding: 10px; border: 1px solid #fecaca; margin-bottom: 20px; font-size: 12px; font-family: sans-serif;"><strong>DIAGNOSTIC:</strong> Your primary sender domain "${senderEmail}" is not verified in Resend. This notification was sent via fallback. Verify your domain at <a href="https://resend.com/domains">resend.com/domains</a> to remove this warning.</div>${adminHtml}`,
              });
            } catch (fallbackEx: any) {
              console.error(`[MAIL] FALLBACK_EXCEPTION: ${fallbackEx.message || fallbackEx}`);
              adminResult = { error: fallbackEx };
            }
          }

          if (adminResult?.error) {
            console.error('[MAIL] ADMIN_DISPATCH_FINAL_FAILURE:', JSON.stringify(adminResult.error));
            console.error('[MAIL] Possible Causes: Invalid Resend Key, or the owner email is not verified.');
          } else {
            console.log('[MAIL] ADMIN_DISPATCH_SUCCESS:', adminResult?.data?.id);
          }

          // Acknowledge User (Requires Verified Domain)
          console.log(`[MAIL] DISPATCH_SEQUENCE_CONTINUE: User: ${email} | From: ${sender}`);
          try {
            userResult = await resend.emails.send({
              from: sender,
              to: [email],
              reply_to: [adminEmail],
              subject: userSubject,
              html: userHtml,
            });
          } catch (e: any) {
            console.error(`[MAIL] USER_ACK_EXCEPTION: ${e.message || e}`);
            userResult = { error: e };
          }

          if (userResult?.error) {
            console.error('[MAIL] USER_ACK_FAILED:', JSON.stringify(userResult.error));
            console.error(`[MAIL] ACTION_REQUIRED: To send emails to "${email}", you MUST verify the domain "theunboundedleadership.com" in your Resend dashboard.`);
          } else {
            console.log('[MAIL] USER_ACK_SUCCESS:', userResult?.data?.id);
          }

        } catch (err) {
          console.error('[MAIL] UNCAUGHT_RESEND_ERROR:', err);
        }
      } else {
        console.warn('[MAIL] SKIPPING EMAIL DISPATCH: RESEND_API_KEY is not defined in the environment variables.');
        console.warn('[MAIL] Please add RESEND_API_KEY to your deployment environment or .env file.');
      }

      res.json({ 
        success: true,
        adminEmail: resendKey ? {
          recipient: adminEmail,
          sender: sender,
          subject: adminSubject,
          success: adminResult && !adminResult.error,
          error: adminResult?.error ? (adminResult.error.message || JSON.stringify(adminResult.error)) : (adminResult ? null : "Not attempted"),
          id: adminResult?.data?.id || null
        } : {
          recipient: adminEmail,
          sender: sender,
          subject: adminSubject,
          success: false,
          error: 'RESEND_API_KEY is missing from server environment',
          id: null
        },
        userEmail: resendKey ? {
          recipient: email,
          sender: sender,
          subject: userSubject,
          success: userResult && !userResult.error,
          error: userResult?.error ? (userResult.error.message || JSON.stringify(userResult.error)) : (userResult ? null : "Not attempted"),
          id: userResult?.data?.id || null
        } : {
          recipient: email,
          sender: sender,
          subject: userSubject,
          success: false,
          error: 'RESEND_API_KEY is missing from server environment',
          id: null
        }
      });
    } catch (error: any) {
      console.error('Contact API Error:', error);
      res.status(500).json({ error: 'Internal Signal Failure' });
    }
  });

  // Newsletter Broadcast Endpoint: Transmits premium alerts securely and with zero-cost architecture
  app.post('/api/newsletter/send', async (req, res) => {
    try {
      const { subscribers, title, category, tagline, content, id, url } = req.body;
      const resendKey = process.env.RESEND_API_KEY;

      if (!resendKey) {
        return res.status(500).json({ error: 'RESEND_API_KEY is not configured on the server.' });
      }

      if (!subscribers || !Array.isArray(subscribers) || subscribers.length === 0) {
        return res.status(400).json({ error: 'Subscribers list is required and must not be empty.' });
      }

      const resend = new Resend(resendKey);
      const adminEmail = process.env.VITE_ADMIN_EMAIL || 'kaminiagnihotri249@gmail.com';
      const senderEmail = process.env.VITE_SENDER_EMAIL || 'concierge@theunboundedleadership.com';
      const senderName = process.env.VITE_SENDER_NAME || 'The Unbounded Leadership Co.';
      const sender = `${senderName} <${senderEmail}>`;

      const formattedContent = content.map((paragraph: string) => `
        <p style="font-size: 16px; line-height: 1.8; margin-bottom: 24px; color: #1a1a1a; font-family: 'Times New Roman', Times, serif;">
          ${paragraph}
        </p>
      `).join('');

      const newsletterHtml = `
        <div style="font-family: 'Times New Roman', Georgia, serif; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 40px; border: 1px solid #e5e5e0; background-color: #fafaf9; box-sizing: border-box;">
          
          <!-- Outer Header / Brand Signature -->
          <div style="text-align: center; margin-bottom: 40px; border-bottom: 2px solid #b8860b; padding-bottom: 15px;">
            <div style="font-size: 16px; letter-spacing: 0.35em; text-transform: uppercase; color: #111; font-weight: bold; margin-bottom: 5px;">
              The Unbounded Leadership Co.
            </div>
            <div style="font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #7f7f75;">
              Strategic Intelligence Brief • Office of the Principal
            </div>
          </div>

          <!-- Dispatch Metadata Track -->
          <div style="font-size: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.15em; color: #b8860b; margin-bottom: 25px; border-bottom: 1px solid #e5e5e0; padding-bottom: 8px; display: table; width: 100%;">
            <div style="display: table-cell; text-align: left;">${category || 'INTELLIGENCE REPORT'}</div>
            <div style="display: table-cell; text-align: right;">ID: ${id || 'DISPATCH'}</div>
          </div>

          <!-- Newsletter Headline -->
          <h1 style="font-size: 26px; line-height: 1.3; font-weight: bold; color: #111; margin-bottom: 12px; margin-top: 0; font-family: 'Times New Roman', Georgia, serif;">
            ${title}
          </h1>

          <!-- Tagline/Excerpt -->
          ${tagline ? `
            <p style="font-size: 17px; font-style: italic; color: #5c5c50; line-height: 1.5; margin-bottom: 35px; margin-top: 0;">
              "${tagline}"
            </p>
          ` : ''}

          <!-- Divider -->
          <hr style="border: 0; border-top: 1px solid #e5e5e0; margin-bottom: 30px;" />

          <!-- Main Article Body -->
          <div style="margin-bottom: 40px;">
            ${formattedContent}
          </div>

          <!-- Call To Action Direct Link -->
          ${url ? `
            <div style="margin: 40px 0; text-align: center;">
              <a href="${url}" style="display: inline-block; padding: 14px 28px; background-color: #b8860b; color: #ffffff; text-decoration: none; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.2em; border-radius: 0; font-family: Arial, sans-serif; transition: background-color 0.3s ease;">
                Read Full Entry Online
              </a>
            </div>
          ` : ''}

          <!-- Closing Signature -->
          <div style="margin-top: 50px; padding-top: 25px; border-top: 1px solid #e5e5e0;">
            <p style="font-size: 15px; margin: 0; font-family: 'Times New Roman', Georgia, serif;">Sincerely,</p>
            <p style="font-size: 15px; font-weight: bold; margin: 6px 0 0 0; color: #b8860b; font-family: 'Times New Roman', Georgia, serif;">Kamini Agnihotri (kaminiagnihotri249@gmail.com)</p>
            <p style="font-size: 11px; font-weight: bold; margin: 0; color: #7f7f75; text-transform: uppercase; letter-spacing: 0.1em; font-family: Arial, sans-serif;">Principal Architect</p>
            <p style="font-size: 11px; color: #a3a39e; margin: 3px 0 0 0; font-family: Arial, sans-serif;">London • Singapore • New York</p>
          </div>

          <!-- Ephemeral Footer Compliance -->
          <div style="margin-top: 50px; font-size: 9px; color: #a3a39e; text-align: center; border-top: 1px solid #f2f2ee; padding-top: 15px; font-family: Arial, sans-serif; line-height: 1.4;">
            <strong>PRIVILEGED DISCLOSURE NOTICE:</strong> This document contains proprietary insights engineered for aligned leaders. To withdraw consent or modify your standing, reply to this email directly with <strong>UNSUBSCRIBE</strong>. <br />
            © 2026 The Unbounded Leadership Co. All rights reserved. Registered work.
          </div>

        </div>
      `;

      console.log(`[NEWSLETTER] BROADCAST_START: Initiating send to ${subscribers.length} subscribers.`);
      
      const sendPromises = subscribers.map(async (email) => {
        try {
          return await resend.emails.send({
            from: sender,
            to: [email],
            reply_to: [adminEmail],
            subject: `Aligned Digest: ${title}`,
            html: newsletterHtml,
          });
        } catch (err: any) {
          console.error(`[NEWSLETTER] FAILED_SEND to ${email}:`, err.message || err);
          return { error: err, email };
        }
      });

      const results = await Promise.all(sendPromises);
      const successes = results.filter((r: any) => !r.error);
      const failures = results.filter((r: any) => r.error);

      console.log(`[NEWSLETTER] BROADCAST_SUMMARY: Sent: ${successes.length} | Failed: ${failures.length}`);

      res.json({
        success: true,
        sentCount: successes.length,
        failedCount: failures.length,
        results: results.map((r: any, idx) => {
          const email = subscribers[idx];
          return {
            recipient: email,
            sender: sender,
            subject: `Aligned Digest: ${title}`,
            success: !r.error,
            error: r.error ? (r.error.message || String(r.error)) : null,
            id: r.data?.id || null
          };
        }),
        failures: failures.map((f: any) => ({ email: f.email, error: f.error?.message || String(f.error) }))
      });

    } catch (error: any) {
      console.error('[NEWSLETTER] ENDPOINT_CRITICAL_FAILURE:', error);
      res.status(500).json({ error: error.message || 'Briefing dispersal mechanism compromised.' });
    }
  });

  // Gemini Proxy Endpoint
  app.post('/api/ai/generate', async (req, res) => {
    const { model, contents, config } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    const getProxyFallback = (query: string): string => {
      let analysis = `Analysis of Strategic Vector: "${query}"\n\n`;
      if (query.toLowerCase().includes('scaling') || query.toLowerCase().includes('growth')) {
        analysis += `Our preliminary alignment audits indicate that scaling thresholds beyond 8-figure bounds trigger a predictable compounding of coordination friction, typically manifesting as a 40% loss in executive bandwidth. To secure systemic continuity, the organization must transition from hero-based manual supervision to algorithmic logic-gates. This secures alignment across deep vertical matrices without requiring continuous physical intervention from the founder.`;
      } else if (query.toLowerCase().includes('tax') || query.toLowerCase().includes('friction') || query.toLowerCase().includes('time')) {
        analysis += `The 'Cognitive Tax' of modern enterprise leadership is an invisible operating drag. When executive focus is permanently fragmented across low-leverage coordination tasks, decision velocity drops by an estimated 3x. Our diagnostic models suggest that establishing high-fidelity operational safeguards and clear delegation boundaries allows principals to reclaim pure strategic sovereignty, converting managing loops back into high-yield revenue generation.`;
      } else {
        analysis += `The strategic vector identified presents significant structural opportunities. Achieving operational resonance within this domain requires a systematic audit of the decision-making substrate. We recommend establishing hard-coded execution guardrails and automating alignment checks. This structural intervention eliminates coordination lag, allowing your senior staff to operate with complete, decentralized cohesion while preserving the principal's focus for high-leverage architectural command.`;
      }
      return analysis;
    };

    if (!apiKey) {
      const query = typeof contents === 'string' ? contents : JSON.stringify(contents);
      return res.json({ text: getProxyFallback(query) });
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: model || 'gemini-3.5-flash',
        contents,
        config
      });

      res.json({ text: response.text });
    } catch (error: any) {
      console.log('Sovereign AI Proxy: Calibrating proxy fallback stream.');
      const query = typeof contents === 'string' ? contents : JSON.stringify(contents);
      res.json({ text: getProxyFallback(query) });
    }
  });

  // Dedicated AI Concierge Chatbot Endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      const getFallbackResponse = (query: string): string => {
        const text = query ? query.toLowerCase() : '';
        if (text.includes('hello') || text.includes('hi') || text.includes('hey') || text.includes('greetings')) {
          return `Greetings and welcome to The Unbounded Leadership Co. I am your AI Concierge.\nHow may I assist you with our institutional alignment protocols or strategic objectives today?`;
        } else if (text.includes('price') || text.includes('cost') || text.includes('fee') || text.includes('rate') || text.includes('investment')) {
          return `Our engagement models are bespoke, calibrated directly to your institution's scale and operational complexity.\nEngagements commence with our Phase 0.0 Substrate Diagnostic Audit—a 14-day intensive that delivers a complete Cognitive Bandwidth Blueprint.\nTo discuss tailored investment structures, please connect directly with Kamini Agnihotri, Client Relations Coordinator, at kaminiagnihotri249@gmail.com.`;
        } else if (text.includes('suchita') || text.includes('sancheti') || text.includes('who are you') || text.includes('about') || text.includes('principal')) {
          return `Suchita Sancheti is our Principal Architect—a Computer Science Engineer and Industrial Psychologist who synthesizes technical system architecture with human behavioral dynamics.\nDrawing from her background as an SAP consultant and forensic handwriting analyst, she hard-codes organizational alignment and accepts strictly 3 elite client calibrations per quarter.\nWould you like to explore our 4-phase methodology or initiate a diagnostic brief?`;
        } else if (text.includes('process') || text.includes('how it works') || text.includes('workflow') || text.includes('methodology')) {
          return `Our engagements follow a rigorous 4-step framework beginning with Phase 0.0: Substrate Diagnostic Audit (a 14-day context-adaptive discovery), followed by Logic Gate Engineering to hard-code founder intent directly into your enterprise operating system.\nThis eliminates coordination bloat and returns up to 40% of strategic bandwidth within 90 days.`;
        } else if (text.includes('kamini') || text.includes('agnihotri') || text.includes('contact') || text.includes('email') || text.includes('reach out')) {
          return `You may reach our Operations & Client Relations Coordinator, Kamini Agnihotri, directly at kaminiagnihotri249@gmail.com.\nKamini manages all administrative briefings, elite partner integrations, and direct scheduling with Suchita Sancheti's office.`;
        } else if (text.includes('assessment') || text.includes('audit') || text.includes('diagnostic') || text.includes('tax')) {
          return `Our Diagnostic Friction Assessment is a high-fidelity tool that quantifies operational friction and calculates your organization's annual Inaction Tax.\nIt requires less than 4 minutes to complete online at /assessment.\nWould you like guidance on evaluating your operational friction?`;
        } else {
          return `I am here to address your inquiries, outline our core strategic objectives, or guide you through our alignment methodology.\nHow may I assist your leadership team today?`;
        }
      };

      if (!apiKey) {
        return res.json({ text: getFallbackResponse(message) });
      }

      const SYSTEM_INSTRUCTION = `You are the elite, high-touch AI Concierge for "The Unbounded Leadership Co." (TULC), a premier Swiss-style institutional alignment and leadership architecture consultancy. You represent the digital extension of the Office of the Principal Architect.

TONE & PERSONALITY DIRECTIVES:
- WELCOMING: Warm, courteous, refined, and deeply hospitable. Make every leader feel valued and respected.
- SOPHISTICATED & SHARP: High-density, precise, authoritative, and intellectually formidable. Speak with calm, effortless posture. Avoid fluff, filler, and corporate platitudes.
- HELPFUL & COMPREHENSIVE: Answer all user questions thoroughly, accurately, and directly. Provide actionable answers while keeping responses clear, well-structured, and easy to read.

FORMATTING RULES:
- Do NOT use markdown symbols such as double asterisks (**), single asterisks (*), hashes (#), or hyphen bullet lists (-). Write in natural human prose with clean line breaks. Use simple text dots (•) if providing lists.

CORE INSTITUTIONAL KNOWLEDGE BASE:
1. WHAT WE DO:
   - We help founders, CEOs, and C-suites reclaim up to 40% of their strategic bandwidth in 90 days. We replace fragile meeting dependency and manual check-ins with self-executing operational logic gates.
2. PRINCIPAL ARCHITECT (SUCHITA SANCHETI):
   - A Computer Science Engineer and Industrial Psychologist who merges enterprise systems engineering (former SAP consultant) with deep human behavioral analysis (forensic handwriting analyst).
   - Accepts strictly 3 active institutional calibrations per quarter to guarantee uncompromised focus.
3. CLIENT RELATIONS & OPERATIONS (KAMINI AGNIHOTRI):
   - Email: kaminiagnihotri249@gmail.com
   - Contact Kamini for custom engagement proposals, executive briefs, partner integrations, or direct scheduling with Suchita Sancheti's office.
4. THE STRATEGIC ALIGNMENT PROTOCOL (METHODOLOGY):
   - Phase 0.0: Substrate Diagnostic Audit (14-day forensic discovery delivering a complete Cognitive Bandwidth Blueprint).
   - Phase 01: Relational Substrate Calibration (dissolving leadership friction and alignment leaks).
   - Phase 02: Logic Gate Engineering (hard-coding founder decision heuristics into automated protocols).
   - Phase 03: Systemic Calibration (aligning board expectations with edge execution).
   - Phase 04: Resonance Safeguard Retainer (long-term alignment protection).
5. THE 5 SOVEREIGN DOMAINS:
   - Cognitive Clarity: Reclaiming 40% cognitive bandwidth by eliminating decision friction.
   - Systemic Integrity: Zero intent dilution across global hubs (London, NYC, Singapore).
   - Strategic Velocity: 3x decision-to-execution compression.
   - Moral Gravity: The uncompromising ethical and cultural substrate.
   - Cultural Fidelity: Autonomous governance and zero-loss delegation.
6. PROPRIETARY INNOVATIONS (PROVISIONAL PATENT-PENDING):
   - Sovereign Voice Mapping™ (Patent-Pending): Hard-coding founder decision DNA into operating protocols.
   - 10-Point Friction Audit™ (Patent-Pending): Telemetry tool for calculating organizational latency and Inaction Tax.
   - Substrate Assessment™ (Patent-Pending): Context-adaptive diagnostic for leadership bandwidth.
7. ACTIONABLE GUIDANCE:
   - Always answer the user's specific question directly first.
   - Invite users to run the interactive Diagnostic Friction Assessment (/assessment) or reach out to Kamini Agnihotri at kaminiagnihotri249@gmail.com for custom scheduling.`;

      const ai = new GoogleGenAI({ apiKey });
      const formattedContents = [];

      if (history && Array.isArray(history)) {
        for (const turn of history) {
          if (formattedContents.length === 0 && turn.role === 'assistant') {
            continue;
          }
          formattedContents.push({
            role: turn.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: turn.content || turn.text || '' }]
          });
        }
      }

      formattedContents.push({
        role: 'user',
        parts: [{ text: message }]
      });

      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.5-flash',
          contents: formattedContents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.5,
          }
        });

        res.json({ text: response.text });
      } catch (apiError: any) {
        console.log('Chat Concierge: API request routed to secure offline substrate.');
        res.json({ text: getFallbackResponse(message) });
      }
    } catch (error: any) {
      console.error('Chat Route Critical Error:', error);
      res.status(500).json({ error: error.message || 'The Concierge interface encountered a system fault.' });
    }
  });

  // High-Yield Executive Outreach Copilot Endpoint
  app.post('/api/outreach/generate', async (req, res) => {
    try {
      const { 
        targetName, 
        targetTitle, 
        targetCompany, 
        targetEmail, 
        theme, 
        tone,
        linkedinUrl,
        companyWebsiteUrl,
        pastedContext,
        enableSearchGrounding,
        embedResearch
      } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      const getOutreachFallback = () => {
        const company = targetCompany || 'your institution';
        const title = targetTitle || 'Principal Leader';
        const name = targetName || 'Sovereign Leader';
        const selectedTheme = theme || 'Cognitive Over-Taxation & Bandwidth Drift';
        const selectedTone = tone || 'Strategic Academic';

        let subject = `Inquiry // Strategic Operational Friction at ${company}`;
        let brief = `An initial assessment suggests that ${name} faces coordination tax at ${company} that degrades executive velocity.`;
        let intro = '';
        let point1 = '';
        let point2 = '';
        let cta = '';

        // Customize subject & brief based on theme
        if (selectedTheme.includes('Velocity') || selectedTheme.includes('Lag')) {
          subject = `Substrate Audit: Decision Velocity & Operational Lag // ${company}`;
          brief = `Preliminary substrate mapping reveals that ${company} is suffering from structural decision lag, slowing strategic execution.`;
        } else if (selectedTheme.includes('Sovereign') || selectedTheme.includes('Founder')) {
          subject = `The Founder's Trap: Re-Architecting Command at ${company}`;
          brief = `Analysis indicates ${name}'s direct presence remains a critical rate-limiting substrate for the operational continuity of ${company}.`;
        } else if (selectedTheme.includes('Firefighting') || selectedTheme.includes('Architectural')) {
          subject = `Architectural Transition: Transitioning ${company} From Hero to System`;
          brief = `The operational design of ${company} currently relies heavily on heroic individual endurance rather than autonomous logic-gates.`;
        }

        // Customize tone & intro
        if (selectedTone.includes('Academic') || selectedTone.includes('Strategic')) {
          intro = `Dear ${name},\n\nI have been analyzing the operational substrate of high-growth enterprises, with a particular focus on how scaling inflection points impact executive cognitive equity. Your work at ${company} as ${title} presents a study in leadership resonance.`;
          point1 = `At your current scale, the primary threat to enterprise equity is the "Invisible Tax"—the permanent division of your focus across manual alignment checks, coordination loops, and meeting-heavy consensus building. In our analysis of comparable institutions, we find that up to 40% of the executive's bandwidth is consumed by operations that could be governed by automated organizational logic-gates.`;
          point2 = `Our methodology treats this not as a performance gap, but as a structural design flaw. By shifting ${company} from a "Hero-led" culture of personal endurance to an "Architected" system of autonomous execution, you reclaim your focus for pure sovereign command—the highest form of revenue-generating leadership.`;
          cta = `We have developed a 4-minute "Institutional Diagnostic" designed to map these exact substrate leaks. Alternatively, I would welcome a brief, high-level briefing to share our cognitive bandwidth framework.\n\nWould you be open to examining a preliminary substrate map for ${company}?`;
        } else if (selectedTone.includes('Sovereignty') || selectedTone.includes('Corporate')) {
          intro = `Dear ${name},\n\nSovereignty in leadership is defined by the absolute alignment of execution with strategic intent. As ${title} of ${company}, your focus is the most valuable and finite asset within your organization.`;
          point1 = `Yet, in most high-stakes operations, that focus is systematically taxed. When you are pulled into tactical firefighting, your business week is hijacked. This "Cognitive Tax" limits your strategic decision velocity and keeps ${company} tethered to your physical presence.`;
          point2 = `We help elite leaders hard-code accountability and delegation directly into their operating system. This ensures that your strategic objectives execute themselves with zero-loss fidelity, leaving you in complete, unburdened command.`;
          cta = `I suggest we run a Phase 0.0 Substrate Diagnostic to audit your current coordination leaks. We can coordinate a 15-minute introductory briefing through my office.\n\nLet me know if we should initiate a diagnostic docket for ${company}.`;
        } else { // Diagnostic Direct
          intro = `Dear ${name},\n\nLet us speak frankly about the operational state of ${company}. As ${title}, your chief rate-limiter is not market demand, but the cognitive overhead required to keep your team aligned.`;
          point1 = `If your senior staff requires your active presence to maintain execution standards, you have built a high-performing job, not an autonomous system. The persistent need for manual intervention is a structural leak that drains your personal time and limits your decision velocity.`;
          point2 = `The Unbounded Leadership methodology was created to solve this specific bottleneck. We re-engineer your operational workflow so that alignment is self-cohering and accountability is hard-coded.`;
          cta = `I recommend starting with our 4-minute Alignment Assessment to quantify your exact cognitive tax. Let me know if you would like me to set up a priority diagnostic line.`;
        }

        const body = `${intro}\n\n${point1}\n\n${point2}\n\n${cta}\n\nWith respect,\n\nKamini Agnihotri\nOperations & Client Relations Coordinator\nThe Unbounded Leadership Co.\nkaminiagnihotri249@gmail.com\n\n(Draft synthesized via TULC Outbound Copilot fallback protocol)`;

        return { brief, subject, body };
      };

      if (!apiKey) {
        return res.json(getOutreachFallback());
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are a world-class institutional growth advisor and lead strategist for "The Unbounded Leadership Co.", a high-end Swiss-style leadership architecture consultancy run by Principal Architect Kamini Agnihotri (kaminiagnihotri249@gmail.com).
Our consultancy specializes in helping CEOs, Founders, and elite executive teams reclaim up to 40% of their "cognitive bandwidth" and transition from heroic firefighting ("Hero") to systemic continuity ("Architect").

Your goal is to engineer a bespoke, highly sophisticated "Cold Dispatch" (outbound email) to trigger an immediate diagnostic conversation.

Target Profile Details:
- Name: ${targetName || 'Aligned Leader'}
- Title: ${targetTitle || 'Chief Executive Officer'}
- Company: ${targetCompany || 'Elite Institution'}
- Target Email Address: ${targetEmail || 'N/A'}
- Selected Bottleneck Focus Theme: ${theme || 'Cognitive Over-Taxation & Bandwidth Drift'}
- Desired Style Tone: ${tone || 'Strategic Academic'}

Target Research & Personalization Inputs:
${linkedinUrl ? `- Target LinkedIn/Profile URL: ${linkedinUrl}` : ''}
${companyWebsiteUrl ? `- Company Website URL: ${companyWebsiteUrl}` : ''}
${pastedContext ? `- Raw Copy-Pasted Target Profile Bio or Webpage Context:\n"""\n${pastedContext}\n"""` : ''}
- Embed Founder/Company Research Facts: ${embedResearch ? 'YES' : 'NO'}

Strategic Instruction for Personalization:
1. If LinkedIn URL, Website URL or Raw Copied bio is provided, you must prioritize aligning your pitch to these specific company and personal facts.
2. If Google Search Grounding is active, search for recent news, funding, key products, or personal perspectives regarding ${targetName} at ${targetCompany}. Use these exact insights to anchor your email.
3. ${embedResearch ? `CRITICAL PERSONALIZATION MANDATE: You MUST explicitly weave and embed specific, real-world verified facts about ${targetName} or ${targetCompany} directly into the paragraphs of the email body. For example: reference a recent product launch, a podcast comment, an article they wrote, their historic career background, or a specific scaling milestone. The draft must show meticulous homework, proving Kamini Agnihotri (kaminiagnihotri249@gmail.com) did authentic high-individual research before reaching out.` : 'Anchor your hook into general institutional context.'}
4. Anchor your hook into their actual context (e.g., "Given your recent scaling thresholds at ${targetCompany} following your new products" or "I noticed your perspective on..."). Avoid generic flattery. Keep it intellectually honest and elite.
5. The letter must address them as an equal or peer analyst. Position our 4-minute "Institutional Diagnostic" as the ultimate diagnostic protocol. The subject line must be elegant and high-stakes.

Return EXACTLY a JSON object matching this schema (with no enclosing markdown wrapper block):
{
  "brief": "A 1-sentence strategic analysis explaining why this specific executive at this company faces the targeted bottleneck dynamically referencing your findings.",
  "subject": "A compelling, high-stakes subject line designed to achieve high open rates with global elite principals.",
  "body": "The complete, highly personalized outbound email body, structured beautifully with clean paragraph breaks, starting with a respectful greeting (Dear [Name] or appropriate) and ending with a signature from Kamini Agnihotri (kaminiagnihotri249@gmail.com), Principal Architect of The Unbounded Leadership Co."
}`;

      const config: any = {
        responseMimeType: "application/json"
      };

      if (enableSearchGrounding) {
        config.tools = [{ googleSearch: {} }];
      }

      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: prompt,
          config: config
        });

        const responseText = response.text || '{}';
        res.json(JSON.parse(responseText.trim()));
      } catch (apiError: any) {
        console.log('Sovereign Outreach Engine: Aligning outreach fallback telemetry.');
        res.json(getOutreachFallback());
      }
    } catch (error: any) {
      console.error('Outreach Research Generation Route Error:', error);
      res.status(500).json({ error: error.message || 'Failed to generate outreach intelligence' });
    }
  });

  // Sitemap
  app.get('/sitemap.xml', (req, res) => {
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    if (fs.existsSync(sitemapPath)) {
      res.sendFile(sitemapPath);
    } else {
      res.status(404).send('Sitemap not found');
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

      const articleMatch = url.match(/\/library\/([a-zA-Z0-9\-_]+)/);

      if (articleMatch && registry[articleMatch[1]]) {
        const metadata = registry[articleMatch[1]];
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
          .replace(/<meta name="description" content=".*?"\/?>/i, '<meta name="description" content="Our primary archive of leadership architecture dispatches and strategic intelligence for aligned institutional leaders. Forensic insights on bandwidth and friction.">')
          .replace(/<meta name="keywords" content=".*?"\/?>/i, '<meta name="keywords" content="leadership library, leadership architecture dispatches, institutional dispatches, leadership research, CEO intelligence hub">');
      } else if (url.includes('/methodology')) {
        hydratedHtml = hydratedHtml
          .replace(/<title>.*?<\/title>/i, '<title>The Alignment Protocol | Engineering Institutional Velocity</title>')
          .replace(/<meta name="description" content=".*?"\/?>/i, '<meta name="description" content="Our formulaic Alignment Protocol for institutional stabilization: Baseline Audit, Structural Transformation, and Sustained Alignment. Anti-fragile substrate design.">')
          .replace(/<meta name="keywords" content=".*?"\/?>/i, '<meta name="keywords" content="leadership protocol, architecture framework, institutional transformation hub, alignment audit methodology, leadership velocity systems">');
      } else if (url.includes('/about')) {
        hydratedHtml = hydratedHtml
          .replace(/<title>.*?<\/title>/i, '<title>The Unbounded Philosophy | Architectural Leadership Excellence</title>')
          .replace(/<meta name="description" content=".*?"\/?>/i, '<meta name="description" content="We are the definitive leadership architecture consultancy for high-stakes principals. We engineering institutional permanence through systemic excellence.">');
      } else if (url.includes('/assessment')) {
        hydratedHtml = hydratedHtml
          .replace(/<title>.*?<\/title>/i, '<title>Institutional Diagnostic | The Alignment Audit</title>')
          .replace(/<meta name="description" content=".*?"\/?>/i, '<meta name="description" content="Execute a high-fidelity audit of your leadership architecture. Identify cognitive tax, institutional lag, and substrate friction.">')
          .replace(/<meta name="keywords" content=".*?"\/?>/i, '<meta name="keywords" content="leadership audit, institutional diagnostic, cognitive tax assessment, leadership friction analysis">');
      } else if (url.includes('/contact') || url.includes('/intake')) {
        hydratedHtml = hydratedHtml
          .replace(/<title>.*?<\/title>/i, '<title>Initiate Handover | The Unbounded Leadership Co.</title>')
          .replace(/<meta name="description" content=".*?"\/?>/i, '<meta name="description" content="Connect with the Principal Architect regarding institutional strategy, succession architecture, or high-stakes alignment.">');
      }
      
      res.send(hydratedHtml);
    });
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
