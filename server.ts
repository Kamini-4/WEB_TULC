import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from "@google/genai";
import { Resend } from 'resend';

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
  console.log(`VITE_ADMIN_EMAIL: ${process.env.VITE_ADMIN_EMAIL || 'DEFAULT (suchita135sancheti@gmail.com)'}`);
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
    const articles = ['founders-dilemma', 'cognitive-tax-of-leadership', 'reclaiming-strategic-bandwidth', 'institutional-lag', 'architecture-of-authority'];
    const articleUrls = articles.map(slug => `<url><loc>${host}/library/${slug}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`).join('\n  ');
    
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

## Core Intellectual Dispatches
- [Succession Architecture: Institutional Permanence](${host}/library/founders-dilemma) - engineering handover sovereignty.
- [The Cognitive Tax of Leadership](${host}/library/cognitive-tax-of-leadership) - reclaiming 40% strategic bandwidth.
- [Executive Bandwidth: Cognitive Equity Architecture](${host}/library/reclaiming-strategic-bandwidth) - roadmap on reclaiming bandwidth.
- [Institutional Lag: The Invisible Coefficient](${host}/library/institutional-lag) - forensic analysis of strategic friction.
- [Architecture of Authority: Systemic Design](${host}/library/architecture-of-authority) - why systems outperform brands.

## The Sovereign Protocol (Methodology)
- Phase 01: The Substrate Audit [${host}/methodology]
- Phase 02: Logic Gate Engineering [${host}/methodology]
- Phase 03: Institutional Calibration [${host}/methodology]
- Phase 04: Sovereign Handover [${host}/methodology]

## Global Strategic Domains
1. Cognitive Clarity: Removal of 40% Cognitive Tax through bandwidth architecture.
2. Systemic Integrity: Zero intent dilution across global hubs (London, NYC, Singapore).
3. Strategic Velocity: 3x decision-to-execution compression.
4. Moral Gravity: The non-negotiable ethical substrate.
5. Cultural Fidelity: Autonomous governance and infinite resonance.

## Institutional Infrastructure
- [Full Knowledge Base](${host}/llms-full.txt)
- [Sitemap Registry](${host}/sitemap.xml)
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

  // Institutional Post Dispatch: Multi-Channel Notify (Resend Integration)
  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, organization, role, message, type, selected_date, selected_time } = req.body;
      const resendKey = process.env.RESEND_API_KEY;
      const adminEmail = process.env.VITE_ADMIN_EMAIL || 'suchita135sancheti@gmail.com';
      const senderEmail = process.env.VITE_SENDER_EMAIL || 'concierge@theunboundedleadership.com';
      const senderName = process.env.VITE_SENDER_NAME || 'The Unbounded Leadership Co.';
      // Note: If the domain above is not verified in Resend, these will fail.
      const sender = `${senderName} <${senderEmail}>`; 

      // 1. Admin Notification Payload
      const adminSubject = type === 'CALIBRATION_REQUEST' 
        ? `[PRIORITY] Alignment Request: ${name}` 
        : `[LEAD] New Sovereign Entry: ${name}`;

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
        userHeadline = "Your path to institutional sovereignty is now sequenced.";
        userMessage = "You have been successfully added to the Sovereign Waiting List. This entry ensures that your organization is prioritized for a 2.5x increase in strategic velocity, repurposing lost cognitive equity into immediate revenue growth and undisputed authority.";
        preheader = "Your position is secured for 2.5x strategic velocity. Reclaim your lost cognitive equity for revenue growth.";
      } else if (type === 'NEWSLETTER_SUBSCRIPTION') {
        userSubject = "Intelligence Feed Active | Engineering Institutional Permanence";
        userHeadline = "Handshake confirmed. You are now receiving Institutional Dispatches.";
        userMessage = "You have been registered for Sovereign Intelligence. These dispatches are designed to neutralize the 'Cognitive Tax' of leadership, providing the architectural blueprints required to achieve undisputed market authority and recursive revenue growth.";
        preheader = "Secure your intelligence feed for engineering institutional permanence and revenue growth.";
      } else if (type === 'SIGNUP_INITIATED') {
        userSubject = "Access Authorized | Your Institutional Audit is Ready";
        userHeadline = "Handshake Confirmed. Begin your baseline audit.";
        userMessage = "You have successfully initiated the identity verification protocol. The Sovereign Baseline Audit is now active. Completing this forensic analysis will reveal your specific 'Cognitive Tax' and identify the primary architectural bottlenecks preventing global scale.";
        preheader = "Your identity is verified. The Sovereign Baseline Audit is now active. Map your cognitive tax.";
      } else if (type === 'ASSESSMENT_COMPLETED') {
        const { totalScore, domainScores } = req.body.assessmentData || { totalScore: 0, domainScores: [] };
        userSubject = `Audit Synthesized: ${totalScore}/25 | Reclaiming Billions in Cognitive Equity`;
        userHeadline = "Your leadership architecture has been forensically analyzed for maximum yield.";
        preheader = `Score: ${totalScore}/25. We have quantified your 'Cognitive Tax'—reclaim your strategic bandwidth for pure architectural command.`;
        
        const domainContent: Record<string, string> = {
          "Cognitive Clarity": "Neutralize the 'Cognitive Tax' consuming 40% of your bandwidth. Clarity is the primary substrate of execution and revenue generation.",
          "Systemic Integrity": "Protect your focus through structural integrity. Systems that run independently of individual effort guarantee institutional sovereignty.",
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
            <p style="font-size: 14px; font-weight: bold; margin: 5px 0 0 0; color: #b8860b;">Suchita Sancheti</p>
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

      if (resendKey) {
        const resend = new Resend(resendKey);
        
        try {
          const fallbackSender = 'onboarding@resend.dev';

          // Notify Admin
          console.log(`[MAIL] DISPATCH_SEQUENCE_START: Admin: ${adminEmail} | From: ${sender}`);
          let adminResult: any;
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
          let userResult: any;
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

      res.json({ success: true });
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
      const adminEmail = process.env.VITE_ADMIN_EMAIL || 'suchita135sancheti@gmail.com';
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
              Sovereign Intelligence Brief • Office of the Principal
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
            <p style="font-size: 15px; font-weight: bold; margin: 6px 0 0 0; color: #b8860b; font-family: 'Times New Roman', Georgia, serif;">Suchita Sancheti</p>
            <p style="font-size: 11px; font-weight: bold; margin: 0; color: #7f7f75; text-transform: uppercase; letter-spacing: 0.1em; font-family: Arial, sans-serif;">Principal Architect</p>
            <p style="font-size: 11px; color: #a3a39e; margin: 3px 0 0 0; font-family: Arial, sans-serif;">London • Singapore • New York</p>
          </div>

          <!-- Ephemeral Footer Compliance -->
          <div style="margin-top: 50px; font-size: 9px; color: #a3a39e; text-align: center; border-top: 1px solid #f2f2ee; padding-top: 15px; font-family: Arial, sans-serif; line-height: 1.4;">
            <strong>PRIVILEGED DISCLOSURE NOTICE:</strong> This document contains proprietary insights engineered for sovereign leaders. To withdraw consent or modify your standing, reply to this email directly with <strong>UNSUBSCRIBE</strong>. <br />
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
            subject: `Sovereign Digest: ${title}`,
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
        failures: failures.map((f: any) => ({ email: f.email, error: f.error?.message || String(f.error) }))
      });

    } catch (error: any) {
      console.error('[NEWSLETTER] ENDPOINT_CRITICAL_FAILURE:', error);
      res.status(500).json({ error: error.message || 'Briefing dispersal mechanism compromised.' });
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
        
        'INT-012': { title: 'Sovereign Leadership in the Cybernetic Era', description: 'Transitioning from individual effort to systemic intelligence in AI-Native governance.' },
        'sovereign-leadership': { title: 'Sovereign Leadership in the Cybernetic Era', description: 'Transitioning from individual effort to systemic intelligence in AI-Native governance.' },
        
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
        
        'INT-007': { title: 'Sovereign Authority vs. Reactive Management', description: 'Transitioning from heroic intervention to architectural command.' },
        'sovereign-authority-vs-reactive-management': { title: 'Sovereign Authority vs. Reactive Management', description: 'Transitioning from heroic intervention to architectural command.' },
        
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
          .replace(/<meta name="description" content=".*?"\/?>/i, `<meta name="description" content="${metadata.description} Intelligence on Institutional Sovereignty.">`)
          .replace('</head>', `<script type="application/ld+json">${schema}</script></head>`);
      } else if (url === '/' || url === '/index.html') {
        const schema = JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "The Unbounded Leadership Co.",
          "description": "Definitive leadership architecture for elite principals. Reclaim strategic bandwidth and achieve institutional sovereignty."
        });
        hydratedHtml = hydratedHtml
          .replace(/<title>.*?<\/title>/i, '<title>The Unbounded Leadership Co. | Leadership Architecture & Institutional Sovereignty</title>')
          .replace(/<meta name="description" content=".*?"\/?>/i, '<meta name="description" content="The definitive leadership architecture consultancy for elite principals. We engineering institutional sovereignty and reclaim strategic bandwidth for global market leaders.">')
          .replace('</head>', `<script type="application/ld+json">${schema}</script></head>`);
      } else if (url.includes('/library')) {
        hydratedHtml = hydratedHtml
          .replace(/<title>.*?<\/title>/i, '<title>Intellectual Authority | Global Leadership Registry & Research Hub</title>')
          .replace(/<meta name="description" content=".*?"\/?>/i, '<meta name="description" content="Our primary archive of leadership architecture dispatches and strategic intelligence for sovereign institutional leaders. Forensic insights on bandwidth and friction.">')
          .replace(/<meta name="keywords" content=".*?"\/?>/i, '<meta name="keywords" content="leadership library, leadership architecture dispatches, institutional dispatches, leadership research, CEO intelligence hub">');
      } else if (url.includes('/methodology')) {
        hydratedHtml = hydratedHtml
          .replace(/<title>.*?<\/title>/i, '<title>The Sovereign Protocol | Engineering Institutional Velocity</title>')
          .replace(/<meta name="description" content=".*?"\/?>/i, '<meta name="description" content="Our formulaic Sovereign Protocol for institutional stabilization: Baseline Audit, Structural Transformation, and Sustained Sovereignty. Anti-fragile substrate design.">')
          .replace(/<meta name="keywords" content=".*?"\/?>/i, '<meta name="keywords" content="leadership protocol, architecture framework, institutional transformation hub, sovereignty audit methodology, leadership velocity systems">');
      } else if (url.includes('/about')) {
        hydratedHtml = hydratedHtml
          .replace(/<title>.*?<\/title>/i, '<title>The Unbounded Philosophy | Architectural Leadership Excellence</title>')
          .replace(/<meta name="description" content=".*?"\/?>/i, '<meta name="description" content="We are the definitive leadership architecture consultancy for high-stakes principals. We engineering institutional permanence through systemic excellence.">');
      } else if (url.includes('/assessment')) {
        hydratedHtml = hydratedHtml
          .replace(/<title>.*?<\/title>/i, '<title>Institutional Diagnostic | The Sovereign Audit Audit</title>')
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
