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

## Core Intellectual Dispatches
- [Succession Architecture: Institutional Permanence](${host}/library/INT-001) - engineering handover sovereignty.
- [The Cognitive Tax of Leadership](${host}/library/INT-002) - reclaiming 40% strategic bandwidth.
- [Executive Bandwidth: Cognitive Equity Architecture](${host}/library/INT-004) - roadmap on reclaiming bandwidth.
- [Institutional Lag: The Invisible Coefficient](${host}/library/INT-005) - forensic analysis of strategic friction.
- [Architecture of Authority: Systemic Design](${host}/library/INT-010) - why systems outperform brands.

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
      let userSubject = "Institutional Acknowledgment | The Unbounded Leadership Co.";
      let userMessage = "We have received your dispatch. Your request is currently being processed by the Office of the Principal.";
      
      if (type === 'CALIBRATION_REQUEST') {
        userSubject = "Calibration Confirmed | Institutional Sovereignty Architecture";
        userMessage = `Your request for a structural alignment on ${selected_date} at ${selected_time} has been logged. A senior strategist will review your organizational profile shortly.`;
      } else if (type === 'WAITLIST_ENTRY') {
        userSubject = "Terminal Access: Protocol Sequential | Waiting List Acknowledged";
        userMessage = "You have been successfully added to our Sovereign Waiting List. Admission to the full Architectural Audit is strictly sequenced based on institutional readiness.";
      } else if (type === 'ASSESSMENT_COMPLETED') {
        userSubject = "Sovereign Audit Complete | Institutional Diagnostic Report";
        userMessage = "Your institutional diagnostic data has been synthesized. Our team is reviewing your results to identify the primary friction points in your leadership architecture.";
      }

      const userHtml = `
        <div style="font-family: 'Times New Roman', serif; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 40px; border: 1px solid #eee; line-height: 1.6;">
          <div style="text-align: center; margin-bottom: 40px;">
            <div style="font-size: 14px; letter-spacing: 0.4em; text-transform: uppercase; color: #b8860b; border-bottom: 1px solid #b8860b; display: inline-block; padding-bottom: 5px; margin-bottom: 10px;">The Unbounded Leadership Co.</div>
            <div style="font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #999;">Office of the Principal | Institutional Sovereignty</div>
          </div>
          
          <p style="font-size: 16px; margin-bottom: 20px;">Dear ${name},</p>
          
          <p style="margin-bottom: 25px;">${userMessage}</p>
          
          <p style="margin-bottom: 25px;">At <strong>The Unbounded Leadership Co.</strong>, we understand that high-stakes leadership requires a substrate of absolute clarity. Your interest in our architecture indicates a commitment to reclaiming both bandwidth and institutional permanence.</p>
          
          <p style="margin-bottom: 25px;">Should your profile align with our current capacity for structural transformation, a representative will reach out to facilitate the next logic gate in our engagement protocol.</p>
          
          <div style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="font-size: 14px; margin: 0;">Sincerely,</p>
            <p style="font-size: 14px; font-weight: bold; margin: 5px 0 0 0; color: #b8860b;">The Office of the Principal</p>
            <p style="font-size: 12px; color: #999; margin: 5px 0 0 0;">London • Singapore • New York</p>
          </div>
          
          <div style="margin-top: 40px; font-size: 10px; color: #ccc; text-align: center; letter-spacing: 0.1em;">
            CONFIDENTIALITY NOTICE: This dispatch is intended solely for the addressee and contains proprietary institutional intelligence.
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
          console.log(`[MAIL] Attempting Admin Notification to ${adminEmail} from ${sender}...`);
          const adminResult = await resend.emails.send({
            from: sender,
            to: [adminEmail],
            reply_to: email,
            subject: adminSubject,
            html: adminHtml,
          }).catch(async (e: any) => {
            console.warn('[MAIL] Primary sender failed for admin. Likely domain is not verified in Resend. Attempting fallback sender (onboarding@resend.dev)...', e.message);
            return await resend.emails.send({
              from: fallbackSender,
              to: [adminEmail],
              reply_to: email,
              subject: adminSubject,
              html: adminHtml,
            });
          });

          if (adminResult.error) {
            console.error('[MAIL] ADMIN_DISPATCH_FAILED:', JSON.stringify(adminResult.error));
            console.error('[MAIL] CONFIG_TIPS: If error 403, verify the "to" email is verified in Resend or domain is verified.');
          } else {
            console.log('[MAIL] ADMIN_DISPATCH_SUCCESS:', adminResult.data?.id);
          }

          // Acknowledge User (The Premium Touch)
          console.log(`[MAIL] Attempting User Acknowledgment to: ${email} from ${sender}...`);
          const userResult = await resend.emails.send({
            from: sender,
            to: [email],
            reply_to: adminEmail,
            subject: userSubject,
            html: userHtml,
          }).catch(e => {
            console.error('[MAIL] USER_ACK_CRITICAL_FAILURE:', e);
            console.error('[MAIL] CONFIG_TIPS: User emails CANNOT be sent using onboarding@resend.dev unless they are verified in your Resend account. You MUST verify the domain "theunboundedleadership.com" in Resend to send these emails.');
            return { error: e };
          });

          if (userResult.error) {
            console.error('[MAIL] USER_ACK_FAILED:', JSON.stringify(userResult.error));
          } else {
            console.log('[MAIL] USER_ACK_SUCCESS:', userResult.data?.id);
          }

        } catch (err) {
          console.error('[MAIL] UNCAUGHT_RESEND_ERROR:', err);
        }
      } else {
        console.warn('[MAIL] SKIPPING: RESEND_API_KEY is not defined in environment.');
      }

      res.json({ success: true });
    } catch (error: any) {
      console.error('Contact API Error:', error);
      res.status(500).json({ error: 'Internal Signal Failure' });
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
        'INT-001': { title: 'Succession Architecture | The Founder Dilemma', description: 'Architecting institutional permanence beyond the individual leader.' },
        'INT-002': { title: 'The Cognitive Tax of Leadership', description: 'Reclaiming 40% bandwidth through bandwidth architecture.' },
        'INT-004': { title: 'Executive Bandwidth: Reclaiming Currency', description: 'A definitive report on cognitive equity and decision architecture.' },
        'INT-005': { title: 'Institutional Lag: The Invisible Coefficient', description: 'Forensic analysis of organizational friction and intent signal flow.' },
        'INT-010': { title: 'Architecture of Authority | Institutional Design', description: 'Why systems outperform personal brands in global scaling.' }
      };

      const articleIdMatch = url.match(/\/library\/(INT-\d+)/);

      if (articleIdMatch && registry[articleIdMatch[1]]) {
        const metadata = registry[articleIdMatch[1]];
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
      } else if (url.includes('/contact')) {
        hydratedHtml = hydratedHtml
          .replace(/<title>.*?<\/title>/i, '<title>Initiate Handover | Office of the Principal</title>')
          .replace(/<meta name="description" content=".*?"\/?>/i, '<meta name="description" content="Connect with The Unbounded Leadership Co. regarding institutional strategy, succession architecture, or high-stakes alignment.">');
      }
      
      res.send(hydratedHtml);
    });
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
