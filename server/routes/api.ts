import { Router } from 'express';
import { config } from '../config.ts';
import { emailService } from '../services/emailService.ts';
import { aiService } from '../services/aiService.ts';
import { errorLogger } from '../services/errorLogger.ts';
import { uptimeService } from '../services/uptimeService.ts';
import { concurrencyTestService } from '../services/concurrencyTestService.ts';
import { backupService } from '../services/backupService.ts';
import { fetchWithTimeout } from '../services/timeoutHelper.ts';
import { 
  validateContactRequest, 
  validateNewsletterRequest, 
  validateChatRequest, 
  validatePasskeyRequest 
} from '../middleware/validator.ts';

export const apiRouter = Router();

// In-memory registry for duplicate prevention
const activeSubscriberEmails = new Set<string>();
const recentProcessedOrders = new Map<string, {
  orderId: string;
  itemId: string;
  email: string;
  licenseToken: string;
  timestamp: number;
}>();

// Clean up old processed orders every 30 minutes
setInterval(() => {
  const cutoff = Date.now() - 30 * 60 * 1000;
  for (const [key, order] of recentProcessedOrders.entries()) {
    if (order.timestamp < cutoff) {
      recentProcessedOrders.delete(key);
    }
  }
}, 30 * 60 * 1000);

// ==========================================
// SYSTEM HEALTH & DIAGNOSTICS
// ==========================================
apiRouter.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: Date.now(),
    uptime: process.uptime(),
    environment: config.isProd ? 'production' : 'development',
    services: {
      resend: Boolean(config.resendApiKey),
      gemini: Boolean(config.geminiApiKey),
      adminEmail: config.adminEmail
    }
  });
});

// ==========================================
// SEARCH ENGINE INDEXNOW DISCOVERY
// ==========================================
apiRouter.post('/indexnow', async (req, res, next) => {
  try {
    const { url } = req.body;
    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'Valid URL is required' });
    }

    const host = req.get('host') || 'theunboundedleadership.com';
    const protocol = req.get('x-forwarded-proto') || req.protocol;
    const baseUrl = `${protocol}://${host}`;

    const payload = {
      host: host,
      key: config.bingIndexNowKey,
      keyLocation: `${baseUrl}/${config.bingIndexNowKey}.txt`,
      urlList: [url]
    };

    console.log(`[INDEXNOW] Submitting ${url} to search index...`);

    const response = await fetch('https://www.bing.com/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(`IndexNow submission failed (${response.status}): ${text || response.statusText}`);
    }

    console.log(`[INDEXNOW] Success for ${url}`);
    res.json({ success: true });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// CONTACT & LEAD INTAKE (DUAL-CHANNEL DISPATCH)
// ==========================================
apiRouter.post('/contact', validateContactRequest, async (req, res, next) => {
  try {
    const result = await emailService.dispatchContactEmails(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// ==========================================
// NEWSLETTER DISPATCH BROADCASTING
// ==========================================
apiRouter.post('/newsletter/send', validateNewsletterRequest, async (req, res, next) => {
  try {
    const { subscribers, title, category, tagline, content, id, url } = req.body;
    const result = await emailService.dispatchNewsletterBroadcast(
      subscribers,
      title,
      category,
      tagline,
      content,
      id,
      url
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// ==========================================
// AI STRATEGIC ANALYSIS & PROXY
// ==========================================
apiRouter.post('/ai/generate', async (req, res, next) => {
  try {
    const { model, contents, config: customConfig } = req.body;
    const text = await aiService.generateAnalysis(contents || '', model, customConfig);
    res.json({ text });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// AI CONCIERGE CHATBOT
// ==========================================
apiRouter.post('/chat', validateChatRequest, async (req, res, next) => {
  try {
    const { message, history } = req.body;
    const text = await aiService.chatConcierge(message, history);
    res.json({ text });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// AI EXECUTIVE OUTREACH COPILOT
// ==========================================
apiRouter.post('/outreach/generate', async (req, res, next) => {
  try {
    const result = await aiService.generateOutreach(req.body);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// ==========================================
// SOVEREIGN PORTAL PASSKEY ENGINE
// ==========================================
apiRouter.post('/portal/verify-passkey', validatePasskeyRequest, async (req, res) => {
  const { key } = req.body;
  const cleanKey = key.trim().toUpperCase();

  // 1. Master Clearance Keys
  const MASTER_KEYS = ['TULC-MASTER', 'TULC-ARCHITECT-2026', 'SOVEREIGN-CLEARANCE'];
  if (MASTER_KEYS.includes(cleanKey)) {
    return res.json({
      valid: true,
      isMaster: true,
      organization: 'Office of Suchita Sancheti (Master Clearance)',
      tier: 'SOVEREIGN_RETAINER',
      expiresAt: Date.now() + 365 * 24 * 60 * 60 * 1000,
      targetUrl: config.sovereignAuditTargetUrl
    });
  }

  // 2. Format validation check
  // Valid TULC keys follow format: TULC-[TIER]-[CODE] or TULC-BETA/AUTH/APEX/SPRINT/SOVEREIGN...
  if (!cleanKey.startsWith('TULC-')) {
    return res.status(401).json({
      valid: false,
      reason: 'invalid_format',
      error: 'Unrecognized institutional key format. Key must begin with TULC-.'
    });
  }

  // 3. Signal to client that this key requires verification against registered licenses
  return res.json({
    valid: false,
    isMaster: false,
    requiresDbLookup: true,
    targetUrl: config.sovereignAuditTargetUrl
  });
});

apiRouter.post('/portal/email-passkey', async (req, res, next) => {
  try {
    const { key, organization, contactEmail, tier, validityDays, expiresAt, customNotes } = req.body;
    if (!key || !organization || !contactEmail) {
      return res.status(400).json({ error: 'Key, organization, and contact email are required' });
    }

    const host = req.get('host');
    const protocol = req.get('x-forwarded-proto') || req.protocol;

    const result = await emailService.dispatchPortalPasskeyEmail({
      key,
      organization,
      contactEmail,
      tier: tier || 'BETA',
      validityDays: Number(validityDays) || 14,
      expiresAt: Number(expiresAt) || (Date.now() + 14 * 24 * 60 * 60 * 1000),
      customNotes,
      host,
      protocol
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
});

// ==========================================
// UPTIME & EXTENDED HEALTH DIAGNOSTICS
// ==========================================
apiRouter.get('/uptime', async (req, res, next) => {
  try {
    const diagnostics = await uptimeService.getUptimeDiagnostics();
    res.json(diagnostics);
  } catch (error) {
    next(error);
  }
});

// ==========================================
// DUPLICATE SUBSCRIPTION PREVENTION
// ==========================================
apiRouter.post('/newsletter/subscribe', async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return res.status(400).json({ error: 'A valid email address is required' });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // 1. Check in-memory fast cache to instantly stop rapid double-clicks & duplicates
    if (activeSubscriberEmails.has(normalizedEmail)) {
      return res.json({
        success: true,
        alreadySubscribed: true,
        message: 'This email is already registered on our intelligence dispatch feed. Zero duplicate entries recorded.',
        email: normalizedEmail
      });
    }

    // Register into memory lock
    activeSubscriberEmails.add(normalizedEmail);

    // Dispatch welcome notification asynchronously with timeout protection
    try {
      await emailService.dispatchContactEmails({
        name: 'Newsletter Subscriber',
        email: normalizedEmail,
        organization: 'Executive Registry',
        message: 'New subscription to Strategic Alignment Newsletter',
        type: 'NEWSLETTER_SUBSCRIPTION'
      });
    } catch (emailErr) {
      console.warn('[NEWSLETTER] Notification dispatch warning:', emailErr);
    }

    res.json({
      success: true,
      alreadySubscribed: false,
      message: 'Subscription confirmed. Welcome to the Institutional Registry.',
      email: normalizedEmail
    });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// DUPLICATE PAYMENT & ORDER IDEMPOTENCY
// ==========================================
apiRouter.post('/shop/checkout', async (req, res, next) => {
  try {
    const { itemId, email, fullName, organization, idempotencyKey, currency, amount } = req.body;

    if (!itemId || !email || !fullName) {
      return res.status(400).json({ error: 'Item ID, full name, and email are required.' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const tokenKey = idempotencyKey || `${normalizedEmail}_${itemId}`;

    // 1. Check if this exact order was already completed or processed (Idempotency Check)
    const existingOrder = recentProcessedOrders.get(tokenKey);
    if (existingOrder) {
      return res.json({
        success: true,
        isDuplicatePrevented: true,
        orderId: existingOrder.orderId,
        licenseToken: existingOrder.licenseToken,
        message: 'Existing authorized order verified. Double charge prevented.',
        vaultLink: `/portal?vault=${itemId}&key=${existingOrder.licenseToken}`
      });
    }

    // 2. Also check if same user bought same item within last 5 minutes
    for (const order of recentProcessedOrders.values()) {
      if (order.email === normalizedEmail && order.itemId === itemId && (Date.now() - order.timestamp < 5 * 60 * 1000)) {
        return res.json({
          success: true,
          isDuplicatePrevented: true,
          orderId: order.orderId,
          licenseToken: order.licenseToken,
          message: 'Recent active allocation found for this enterprise email. Duplication prevented.',
          vaultLink: `/portal?vault=${itemId}&key=${order.licenseToken}`
        });
      }
    }

    // 3. Generate sovereign order record
    const orderId = `ORD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const licenseToken = Math.random().toString(36).substring(2, 8).toUpperCase();

    const orderRecord = {
      orderId,
      itemId,
      email: normalizedEmail,
      fullName,
      organization: organization || 'Enterprise',
      licenseToken,
      currency: currency || 'USD',
      amount: typeof amount === 'number' ? amount : undefined,
      timestamp: Date.now()
    };

    // Store in idempotency register
    recentProcessedOrders.set(tokenKey, orderRecord);

    res.json({
      success: true,
      isDuplicatePrevented: false,
      orderId,
      licenseToken,
      currency: orderRecord.currency,
      amount: orderRecord.amount,
      message: 'Institutional license authorized.',
      vaultLink: `/portal?vault=${itemId}&key=${licenseToken}`
    });
  } catch (error) {
    next(error);
  }
});

// ==========================================
// ERROR LOGGING & CENTRALIZED MONITORING
// ==========================================
apiRouter.get('/system/errors', (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 50, 100);
  const source = req.query.source as 'server' | 'client' | undefined;
  const severity = req.query.severity as string | undefined;

  const logs = errorLogger.getRecentErrors(limit, { source, severity });
  const stats = errorLogger.getErrorStats();

  res.json({
    logs,
    stats,
    timestamp: Date.now()
  });
});

apiRouter.delete('/system/errors', (req, res) => {
  const result = errorLogger.clearErrors();
  res.json(result);
});

apiRouter.post('/system/client-errors', (req, res) => {
  const { message, stack, route, userAgent, metadata } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Error message required' });
  }

  const entry = errorLogger.log({
    source: 'client',
    severity: 'error',
    message: String(message),
    stack: stack ? String(stack) : undefined,
    route: route ? String(route) : undefined,
    ip: req.ip,
    userAgent: userAgent || req.get('user-agent'),
    metadata: metadata || {}
  });

  res.json({ success: true, logId: entry.id });
});

// ==========================================
// SIMULTANEOUS USERS & CONCURRENCY TEST
// ==========================================
apiRouter.post('/system/test-concurrency', async (req, res, next) => {
  try {
    const userCount = Number(req.body.userCount) || 25;
    const testResult = await concurrencyTestService.runSimultaneousUserTest(userCount);
    res.json(testResult);
  } catch (error) {
    next(error);
  }
});

// ==========================================
// BACKUP & RESTORE TEST SIMULATION
// ==========================================
apiRouter.post('/system/backup/export', async (req, res, next) => {
  try {
    const snapshot = await backupService.createSnapshot(req.body || {});
    res.json(snapshot);
  } catch (error) {
    next(error);
  }
});

apiRouter.post('/system/backup/test-restore', async (req, res, next) => {
  try {
    let snapshotToTest = req.body;
    
    // If no custom snapshot payload provided, generate a canonical diagnostic snapshot
    if (!snapshotToTest || !snapshotToTest.collections) {
      snapshotToTest = await backupService.createSnapshot({
        leads: [
          { id: 'lead_diag_1', name: 'Strategic Enterprise Partner', email: 'partner@tulc.executive', organization: 'Apex Global', timestamp: Date.now() },
          { id: 'lead_diag_2', name: 'Institutional Director', email: 'director@holding.co', organization: 'Sovereign Capital', timestamp: Date.now() }
        ],
        assessments: [
          { id: 'asm_diag_1', name: 'Principal Lead', email: 'lead@sovereign.org', totalScore: 22, percentage: 88, timestamp: Date.now() }
        ],
        portal_licenses: [
          { id: 'lic_diag_1', key: 'TULC-PROD-2026', organization: 'Apex Global', tier: 'Enterprise Sovereign', active: true }
        ],
        orders: [
          { id: 'ord_diag_1', itemId: 'bandwidth-architecture', email: 'partner@tulc.executive', idempotencyKey: 'tulc_diag_order_1' }
        ],
        subscribers: [
          { email: 'intel@tulc.dispatch', active: true }
        ]
      });
    }

    const result = await backupService.simulateRestore(snapshotToTest);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

