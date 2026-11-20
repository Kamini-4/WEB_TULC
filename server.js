// Production & Preview Server for The Unbounded Leadership Co.
// Pure Node.js runtime (zero external HTTP dependencies)
// Security hardened:
// - Fail-fast environment validation & TLS/credential checks
// - Native HS256 JWT authentication + HttpOnly/SameSite cookies + jti logout blacklist
// - scrypt password hashing + anti-IDOR ownership checks + 15-min single-use password reset
// - Server-authoritative payment pricing, tax calculation & Razorpay HMAC-SHA256 verification
// - Raw-body Razorpay webhook signature verification & idempotency
// - Strict CSP (no unsafe-inline scripts), CORS allowlist, sliding-window rate limits, & upload rejection

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NODE_ENV = (process.env.NODE_ENV || 'development').trim().toLowerCase();
const IS_PROD = NODE_ENV === 'production';
const DEBUG_MODE = !IS_PROD && process.env.DEBUG === 'true';
const TRUST_PROXY = process.env.TRUST_PROXY !== 'false';
const TRUST_PROXY_HOPS = Math.max(1, Number.parseInt(process.env.TRUST_PROXY_HOPS || '1', 10) || 1);
const PORT = Number.parseInt(process.env.PORT || '3000', 10);
const HOST = '0.0.0.0';

const DIST_DIR = path.resolve(__dirname, 'dist');
const PUBLIC_DIR = path.resolve(__dirname, 'public');
const PROTECTED_ASSETS_DIR = path.resolve(__dirname, 'protected-assets');
const ROOT_DIR = path.resolve(__dirname);
const MAX_BODY_BYTES = 64 * 1024; // 64 KB strict payload cap
const MAX_USERS = 10_000;
const MAX_ORDERS = 10_000;

const DEFAULT_DEV_ORIGINS = [
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'https://theunboundedleadership.com',
  'https://www.theunboundedleadership.com',
];

const PLACEHOLDER_SECRET_MARKERS = [
  'your_',
  'replace_with_',
  'changeme',
  'placeholder',
  'key_enterprise_alpha_01',
  'key_enterprise_beta_02',
  'tulc-clearance-2026',
  '<secret',
];

const WEAK_DB_PATTERNS = [
  /postgres:postgres@/i,
  /root:root@/i,
  /admin:admin@/i,
  /:password@/i,
  /:changeme@/i,
  /:123456@/i,
  /^[a-z0-9+]+:\/\/[^:@/]+@/i,
];

const BLOCKED_TEST_ENDPOINTS = /^\/(?:api\/)?(?:test|debug|admin-backdoor|seed-data)(?:\/|$)/i;
const BLOCKED_INTERNAL_PATHS = /^\/(?:\.git(?:\/|$)|\.env|src(?:\/|$)|scripts(?:\/|$)|node_modules(?:\/|$)|protected-assets(?:\/|$)|downloadables(?:\/|$)|swagger(?:-ui)?(?:\.json|\.ya?ml)?(?:\/|$)|openapi(?:\.json|\.ya?ml)?(?:\/|$)|api-docs(?:\/|$)|phpmyadmin(?:\/|$)|adminer(?:\/|$)|pgadmin(?:\/|$)|db-admin(?:\/|$)|wp-admin(?:\/|$)|graphql(?:\/|$)|server\.js$|package(?:-lock)?\.json$|vite\.config|tsconfig\.json)/i;
const EMAIL_REGEX = /^[^\s@]{1,64}@[^\s@]{1,253}\.[^\s@]{2,63}$/;

function containsPlaceholder(value) {
  if (!value) return true;
  const lower = value.trim().toLowerCase();
  return PLACEHOLDER_SECRET_MARKERS.some((marker) => lower.includes(marker));
}

function parseAllowedOrigins() {
  const raw = (process.env.ALLOWED_ORIGINS || '').trim();
  if (raw.includes('*')) {
    console.error('[STARTUP_ABORT] ALLOWED_ORIGINS must never contain wildcard "*".');
    process.exit(1);
  }

  if (!raw) {
    if (IS_PROD) {
      return new Set();
    }
    return new Set(DEFAULT_DEV_ORIGINS);
  }

  const origins = raw
    .split(',')
    .map((origin) => origin.trim().replace(/\/+$/, ''))
    .filter(Boolean);

  for (const origin of origins) {
    let parsed;
    try {
      parsed = new URL(origin);
    } catch {
      console.error(`[STARTUP_ABORT] Invalid origin configured in ALLOWED_ORIGINS: ${origin}`);
      process.exit(1);
    }
    if (IS_PROD && parsed.protocol !== 'https:') {
      console.error('[STARTUP_ABORT] Production ALLOWED_ORIGINS entries must use HTTPS.');
      process.exit(1);
    }
  }

  return new Set(origins);
}

function validateDatabaseUrl(dbUrl) {
  if (!dbUrl) return;

  for (const pattern of WEAK_DB_PATTERNS) {
    if (pattern.test(dbUrl)) {
      console.error('[STARTUP_ABORT] DATABASE_URL contains default or missing credentials.');
      process.exit(1);
    }
  }

  if (IS_PROD) {
    const lower = dbUrl.toLowerCase();
    const hasTls =
      lower.startsWith('rediss://') ||
      lower.startsWith('mongodb+srv://') ||
      /[?&]sslmode=(require|verify-ca|verify-full)\b/.test(lower) ||
      /[?&](ssl|tls)=true\b/.test(lower);

    if (!hasTls) {
      console.error('[STARTUP_ABORT] Production DATABASE_URL must enforce TLS/SSL (e.g. ?sslmode=require).');
      process.exit(1);
    }
  }
}

function loadAuthorizedPasskeyDigests() {
  const keys = (process.env.PORTAL_CLEARANCE_KEYS || '')
    .split(',')
    .map((k) => k.trim().toUpperCase())
    .filter(Boolean);

  return keys.map((key) => ({
    invalidPlaceholder: containsPlaceholder(key),
    digest: crypto.createHash('sha256').update(key, 'utf8').digest(),
  }));
}

function validateEnvironment() {
  if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
    console.error('[STARTUP_ABORT] PORT must be a valid integer between 1 and 65535.');
    process.exit(1);
  }

  const allowedOrigins = parseAllowedOrigins();
  const geminiKey = (process.env.GEMINI_API_KEY || '').trim();
  const passkeys = loadAuthorizedPasskeyDigests();
  const databaseUrl = (process.env.DATABASE_URL || '').trim();
  const requireDatabase = process.env.REQUIRE_DATABASE === 'true';

  const configuredJwtSecret = (process.env.JWT_SECRET || '').trim();
  const hasValidJwtSecret =
    configuredJwtSecret.length >= 32 && !containsPlaceholder(configuredJwtSecret);

  const razorpayKeyId = (process.env.RAZORPAY_KEY_ID || '').trim();
  const razorpayKeySecret = (process.env.RAZORPAY_KEY_SECRET || '').trim();
  const razorpayWebhookSecret = (process.env.RAZORPAY_WEBHOOK_SECRET || '').trim();

  const hasLiveRazorpay =
    Boolean(razorpayKeyId) &&
    !containsPlaceholder(razorpayKeyId) &&
    Boolean(razorpayKeySecret) &&
    !containsPlaceholder(razorpayKeySecret);

  const hasValidWebhookSecret =
    Boolean(razorpayWebhookSecret) && !containsPlaceholder(razorpayWebhookSecret);

  const devSandboxEnabled = !IS_PROD && process.env.RAZORPAY_TEST_SANDBOX === 'true';

  if (databaseUrl) {
    validateDatabaseUrl(databaseUrl);
  } else if (IS_PROD && requireDatabase) {
    console.error('[STARTUP_ABORT] Missing required production variable: DATABASE_URL.');
    process.exit(1);
  }

  if (IS_PROD) {
    const failures = [];

    if (!hasValidJwtSecret) {
      failures.push('JWT_SECRET (must be >= 32 non-placeholder characters)');
    }
    if (!geminiKey || containsPlaceholder(geminiKey)) {
      failures.push('GEMINI_API_KEY (missing or still placeholder)');
    }
    if (passkeys.length === 0 || passkeys.some((p) => p.invalidPlaceholder)) {
      failures.push('PORTAL_CLEARANCE_KEYS (missing or contains placeholder values)');
    }
    if (allowedOrigins.size === 0) {
      failures.push('ALLOWED_ORIGINS (must list explicit HTTPS frontend origins in production)');
    }

    if (failures.length > 0) {
      console.error(
        `[STARTUP_ABORT] Refusing production start due to invalid/missing required environment variables: ${failures.join('; ')}`
      );
      process.exit(1);
    }
  } else {
    const warnings = [];
    if (!hasValidJwtSecret) warnings.push('JWT_SECRET (using ephemeral dev secret)');
    if (!geminiKey || containsPlaceholder(geminiKey)) warnings.push('GEMINI_API_KEY');
    if (passkeys.length === 0 || passkeys.some((p) => p.invalidPlaceholder)) {
      warnings.push('PORTAL_CLEARANCE_KEYS');
    }
    if (!hasLiveRazorpay && !devSandboxEnabled) {
      warnings.push('RAZORPAY_KEY_ID/SECRET');
    }
    if (warnings.length > 0) {
      console.warn(
        `[CONFIG_NOTICE] Running in development without configured ${warnings.join(', ')}. Unconfigured protected endpoints fail closed.`
      );
    }
  }

  const jwtSecret = hasValidJwtSecret
    ? configuredJwtSecret
    : crypto.randomBytes(64).toString('hex');

  const hasValidRzpSecret =
    Boolean(razorpayKeySecret) && !containsPlaceholder(razorpayKeySecret);
  const sandboxSecret = devSandboxEnabled
    ? (hasValidRzpSecret ? razorpayKeySecret : crypto.randomBytes(32).toString('hex'))
    : '';
  const sandboxWebhookSecret = devSandboxEnabled
    ? (hasValidWebhookSecret ? razorpayWebhookSecret : crypto.randomBytes(32).toString('hex'))
    : '';

  return {
    allowedOrigins,
    passkeyDigests: passkeys.map((p) => p.digest),
    jwtSecret,
    razorpayKeyId: hasLiveRazorpay ? razorpayKeyId : (devSandboxEnabled ? 'rzp_test_sandbox' : ''),
    razorpayKeySecret: hasLiveRazorpay ? razorpayKeySecret : sandboxSecret,
    razorpayWebhookSecret: hasValidWebhookSecret ? razorpayWebhookSecret : sandboxWebhookSecret,
    hasLiveRazorpay,
    devSandboxEnabled,
  };
}

const CONFIG = validateEnvironment();

const CSP_POLICY = [
  "default-src 'self'",
  "script-src 'self' https://www.googletagmanager.com https://checkout.razorpay.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: https:",
  "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://api.razorpay.com https://lumberjack.razorpay.com",
  "frame-src 'self' https://calendly.com https://drive.google.com https://www.youtube.com https://api.razorpay.com https://checkout.razorpay.com",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  'upgrade-insecure-requests',
].join('; ') + ';';

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

// ==============================================================================
// Authoritative Server-Side Payment Catalog, Currencies & Tax Schedule
// Prices are denominated in INR paise (integer arithmetic only).
// Client-supplied price, amount, tax, or discount values are ALWAYS rejected.
// ==============================================================================
const PAYMENT_CATALOG = Object.freeze({
  'delegation-matrix': {
    title: 'The ₹425000 Delegation Matrix',
    unitPriceINRPaise: 685000, // ₹2750.00 Rulebook + ₹2250.00 Capital Matrix + ₹1850.00 AI & DB Pack = ₹6850.00
    category: 'toolkit',
    maxQty: 5,
    deliverables: ['Founder-Delegation-Covenant-Master.html'],
  },
  'execution-loop': {
    title: 'The 14-Day Autonomous Execution Loop',
    unitPriceINRPaise: 985000, // ₹3950.00 Sprint Spec + ₹3250.00 Async Cadence + ₹2650.00 AI & DB Schema = ₹9850.00
    category: 'toolkit',
    maxQty: 5,
    deliverables: ['TULC-72-Hour-Founder-Absence-Readiness-Audit.html'],
  },
  'founder-decoupling-suite': {
    title: 'The Complete Founder Decoupling Suite',
    unitPriceINRPaise: 1485000, // ₹6150.00 Runbook + ₹4950.00 Charter + ₹3750.00 AI & Vault Pack = ₹14850.00
    category: 'toolkit',
    maxQty: 5,
    deliverables: [
      'Founder-Delegation-Covenant-Master.html',
      'TULC-72-Hour-Founder-Absence-Readiness-Audit.html',
    ],
  },
  'complete-executive-bundle': {
    title: 'The Complete 3-Toolkit Sovereign Suite',
    unitPriceINRPaise: 2366250, // ₹31550.00 individual sum less 25.00% (₹7887.50) = ₹23662.50
    category: 'toolkit',
    maxQty: 5,
    deliverables: [
      'Founder-Delegation-Covenant-Master.html',
      'TULC-72-Hour-Founder-Absence-Readiness-Audit.html',
    ],
  },
  'mandate-deposit-diagnostic': {
    title: 'Track 01: Solo CEO Diagnostic Deposit (50% of ₹38450)',
    unitPriceINRPaise: 1922500,
    category: 'retainer_deposit',
    maxQty: 1,
    deliverables: ['TULC-72-Hour-Founder-Absence-Readiness-Audit.html'],
  },
  'mandate-deposit-diagnostic-group': {
    title: 'Track 01: Group CXO Cohort Diagnostic Deposit (3+ CXOs · 50% of ₹89450)',
    unitPriceINRPaise: 4472500,
    category: 'retainer_deposit',
    maxQty: 1,
    deliverables: ['TULC-72-Hour-Founder-Absence-Readiness-Audit.html'],
  },
  'mandate-deposit-embedding': {
    title: 'Track 02: 90-Day Operating Embedding Deposit (25% of ₹284650)',
    unitPriceINRPaise: 7116250,
    category: 'retainer_deposit',
    maxQty: 1,
    deliverables: ['TULC-72-Hour-Founder-Absence-Readiness-Audit.html'],
  },
  'mandate-deposit-retainer': {
    title: 'Track 03: Fractional COO Quarter Lock Deposit (30% of ₹205350)',
    unitPriceINRPaise: 6160500,
    category: 'retainer_deposit',
    maxQty: 1,
    deliverables: [
      'Founder-Delegation-Covenant-Master.html',
      'TULC-72-Hour-Founder-Absence-Readiness-Audit.html',
    ],
  },
  'mandate-retainer-instalment-monthly': {
    title: 'Track 03: Fractional COO Retainer — Monthly Instalment 1 of 3 (₹68450/mo)',
    unitPriceINRPaise: 6845000,
    category: 'retainer_deposit',
    maxQty: 1,
    deliverables: [
      'Founder-Delegation-Covenant-Master.html',
      'TULC-72-Hour-Founder-Absence-Readiness-Audit.html',
    ],
  },
  'mandate-retainer-instalment-split': {
    title: 'Track 03: Fractional COO Retainer — Bi-Monthly Instalment 1 of 2 (₹102675 × 2)',
    unitPriceINRPaise: 10267500,
    category: 'retainer_deposit',
    maxQty: 1,
    deliverables: [
      'Founder-Delegation-Covenant-Master.html',
      'TULC-72-Hour-Founder-Absence-Readiness-Audit.html',
    ],
  },
  'conclave-seat-reservation': {
    title: 'Executive Advisory Board Conclave Seat (₹24850)',
    unitPriceINRPaise: 2485000,
    category: 'conclave_seat',
    maxQty: 2,
    deliverables: ['Founder-Delegation-Covenant-Master.html'],
  },
});

const CURRENCY_CONFIG = Object.freeze({
  INR: { rate: 1, intlParityBps: 0, fxFeeBps: 0, taxBps: 1800 }, // 18.00% IGST / GST computed strictly server-side
  USD: { rate: 1 / 84.5, intlParityBps: 2000, fxFeeBps: 450, taxBps: 0 }, // +20.00% cross-border delivery parity + 4.50% FX/gateway fee
  EUR: { rate: 0.92 / 84.5, intlParityBps: 2000, fxFeeBps: 450, taxBps: 0 },
  GBP: { rate: 0.79 / 84.5, intlParityBps: 2000, fxFeeBps: 450, taxBps: 0 },
  AED: { rate: 3.67 / 84.5, intlParityBps: 2000, fxFeeBps: 450, taxBps: 0 },
});

const FORBIDDEN_CLIENT_PRICING_FIELDS = new Set([
  'price',
  'priceusd',
  'unitprice',
  'amount',
  'amountsmallestunit',
  'subtotal',
  'tax',
  'taxamount',
  'discount',
  'discountamount',
  'total',
  'totaldisplay',
  'status',
  'paid',
  'verified',
  'creditvouchercode',
  'razorpayorderid',
]);

const FORBIDDEN_PRIVILEGE_FIELDS = new Set([
  'role',
  'roles',
  'isadmin',
  'admin',
  'permissions',
  'scopes',
  'tier',
  'tokenversion',
]);

function hasForbiddenPrivilegeKeys(obj) {
  return Object.keys(obj).some((k) => FORBIDDEN_PRIVILEGE_FIELDS.has(k.toLowerCase()));
}

function sanitizeControlChars(str) {
  return typeof str === 'string' ? str.replace(/[\x00-\x1f\x7f]/g, '').trim() : '';
}

function loadServerCouponMap() {
  const raw = (process.env.PAYMENT_COUPONS_JSON || '').trim();
  const map = new Map();
  if (!raw) return map;
  try {
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      for (const [code, pct] of Object.entries(parsed)) {
        const cleanCode = String(code).trim().toUpperCase();
        const discountPct = Number(pct);
        if (cleanCode && Number.isFinite(discountPct) && discountPct > 0 && discountPct <= 50) {
          map.set(cleanCode, Math.round(discountPct));
        }
      }
    }
  } catch {
    console.warn('[CONFIG_NOTICE] Invalid PAYMENT_COUPONS_JSON ignored.');
  }
  return map;
}
const SERVER_COUPONS = loadServerCouponMap();

// ==============================================================================
// In-Memory Stores with Periodic Cleanup & Capacity Bounds
// ==============================================================================
const rateLimitStore = new Map();
const usersById = new Map();
const usersByEmail = new Map();
const revokedTokenJtis = new Map(); // jti -> expiresAtMs
const passwordResetTokens = new Map(); // sha256(rawToken) -> { userId, expiresAt, used }
const ordersStore = new Map(); // orderId -> orderRecord
const razorpayOrderToInternalId = new Map(); // rzpOrderId -> orderId
const usedRazorpayPaymentIds = new Map(); // rzpPaymentId -> orderId
const processedWebhookEvents = new Map(); // eventKey -> timestampMs
const couponRedemptions = new Set(); // "CODE:email" and "CODE:ownerSub"
const inFlightPaymentLocks = new Set(); // "order:<orderId>" / "pay:<rzpPaymentId>"

const cleanupTimer = setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt <= now) rateLimitStore.delete(key);
  }
  for (const [jti, expMs] of revokedTokenJtis.entries()) {
    if (expMs <= now) revokedTokenJtis.delete(jti);
  }
  for (const [hash, record] of passwordResetTokens.entries()) {
    if (record.expiresAt <= now || record.used) passwordResetTokens.delete(hash);
  }
  for (const [eventKey, ts] of processedWebhookEvents.entries()) {
    if (now - ts > 7 * 24 * 60 * 60 * 1000) processedWebhookEvents.delete(eventKey);
  }
  for (const [orderId, order] of ordersStore.entries()) {
    if (
      (order.status === 'created' || order.status === 'failed') &&
      now - Date.parse(order.createdAt) > 24 * 60 * 60 * 1000
    ) {
      ordersStore.delete(orderId);
      if (order.razorpayOrderId) razorpayOrderToInternalId.delete(order.razorpayOrderId);
    }
  }
}, 60_000);
cleanupTimer.unref();

// ==============================================================================
// Cryptographic Utilities: Password scrypt, JWT (HS256), Timing-Safe Helpers
// ==============================================================================
const DUMMY_SCRYPT_SALT = crypto.randomBytes(16).toString('hex');
const DUMMY_SCRYPT_HASH = crypto
  .scryptSync('constant-time-dummy-password-value', DUMMY_SCRYPT_SALT, 64, { N: 16384, r: 8, p: 1 })
  .toString('hex');

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const derived = crypto
    .scryptSync(password, salt, 64, { N: 16384, r: 8, p: 1 })
    .toString('hex');
  return `scrypt$${salt}$${derived}`;
}

function verifyPassword(password, storedHash) {
  if (typeof storedHash !== 'string' || !storedHash.startsWith('scrypt$')) {
    crypto.scryptSync(password, DUMMY_SCRYPT_SALT, 64, { N: 16384, r: 8, p: 1 });
    return false;
  }
  const parts = storedHash.split('$');
  if (parts.length !== 3) {
    crypto.scryptSync(password, DUMMY_SCRYPT_SALT, 64, { N: 16384, r: 8, p: 1 });
    return false;
  }
  const [, salt, expectedHex] = parts;
  const derivedBuf = crypto.scryptSync(password, salt, 64, { N: 16384, r: 8, p: 1 });
  const expectedBuf = Buffer.from(expectedHex, 'hex');
  if (derivedBuf.length !== expectedBuf.length) return false;
  return crypto.timingSafeEqual(derivedBuf, expectedBuf);
}

function runDummyScryptWork(password) {
  const derived = crypto.scryptSync(password || 'dummy', DUMMY_SCRYPT_SALT, 64, { N: 16384, r: 8, p: 1 });
  const dummyBuf = Buffer.from(DUMMY_SCRYPT_HASH, 'hex');
  crypto.timingSafeEqual(derived, dummyBuf);
}

function base64UrlEncode(input) {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(String(input), 'utf8');
  return buf.toString('base64').replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
}

function base64UrlDecode(str) {
  const normalized = str.replace(/-/g, '+').replace(/_/g, '/');
  const padLen = (4 - (normalized.length % 4)) % 4;
  return Buffer.from(normalized + '='.repeat(padLen), 'base64');
}

function signJwt(payload, expiresInSec = 3600) {
  const nowSec = Math.floor(Date.now() / 1000);
  const header = { alg: 'HS256', typ: 'JWT' };
  const claims = {
    ...payload,
    iss: 'tulc-auth',
    aud: 'tulc-app',
    jti: crypto.randomUUID(),
    iat: nowSec,
    exp: nowSec + expiresInSec,
  };
  const encodedHeader = base64UrlEncode(JSON.stringify(header));
  const encodedPayload = base64UrlEncode(JSON.stringify(claims));
  const signingInput = `${encodedHeader}.${encodedPayload}`;
  const sig = crypto
    .createHmac('sha256', CONFIG.jwtSecret)
    .update(signingInput, 'utf8')
    .digest();
  return `${signingInput}.${base64UrlEncode(sig)}`;
}

function verifyJwt(token) {
  if (typeof token !== 'string' || token.length > 4096) return null;
  const parts = token.split('.');
  if (parts.length !== 3 || !parts.every((p) => /^[A-Za-z0-9_-]+$/.test(p))) return null;

  const [encodedHeader, encodedPayload, encodedSig] = parts;
  let header;
  let payload;
  try {
    header = JSON.parse(base64UrlDecode(encodedHeader).toString('utf8'));
    payload = JSON.parse(base64UrlDecode(encodedPayload).toString('utf8'));
  } catch {
    return null;
  }

  // Strictly require HS256 to prevent alg:none and asymmetric key confusion attacks
  if (!header || header.alg !== 'HS256' || header.typ !== 'JWT') return null;

  const expectedSig = crypto
    .createHmac('sha256', CONFIG.jwtSecret)
    .update(`${encodedHeader}.${encodedPayload}`, 'utf8')
    .digest();
  const actualSig = base64UrlDecode(encodedSig);
  if (actualSig.length !== expectedSig.length || !crypto.timingSafeEqual(actualSig, expectedSig)) {
    return null;
  }

  const nowSec = Math.floor(Date.now() / 1000);
  if (
    !payload ||
    typeof payload !== 'object' ||
    typeof payload.sub !== 'string' ||
    typeof payload.jti !== 'string' ||
    typeof payload.iat !== 'number' ||
    !Number.isFinite(payload.iat) ||
    payload.iat > nowSec + 30 ||
    typeof payload.exp !== 'number' ||
    !Number.isFinite(payload.exp) ||
    payload.exp <= nowSec ||
    payload.exp - payload.iat > 86400 ||
    payload.iss !== 'tulc-auth' ||
    payload.aud !== 'tulc-app'
  ) {
    return null;
  }

  if (revokedTokenJtis.has(payload.jti)) {
    return null;
  }

  // If this token belongs to a registered user, enforce tokenVersion to invalidate old tokens on password reset
  if (usersById.has(payload.sub)) {
    const user = usersById.get(payload.sub);
    if (typeof payload.ver !== 'number' || payload.ver !== user.tokenVersion) {
      return null;
    }
  }

  return payload;
}

function parseCookies(req) {
  const cookieHeader = req.headers.cookie;
  const out = Object.create(null);
  if (typeof cookieHeader !== 'string' || !cookieHeader) return out;
  for (const part of cookieHeader.split(';')) {
    const idx = part.indexOf('=');
    if (idx === -1) continue;
    const key = part.slice(0, idx).trim();
    const rawVal = part.slice(idx + 1).trim();
    if (!key) continue;
    try {
      out[key] = decodeURIComponent(rawVal);
    } catch {
      out[key] = rawVal;
    }
  }
  return out;
}

function isSecureRequest(req) {
  if (IS_PROD) return true;
  const proto = String(req.headers['x-forwarded-proto'] || '').toLowerCase();
  return proto === 'https' || Boolean(req.socket?.encrypted);
}

function buildSessionCookie(token, maxAgeSec, req) {
  const secureFlag = isSecureRequest(req) ? '; Secure' : '';
  return `tulc_session=${encodeURIComponent(token)}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${maxAgeSec}${secureFlag}`;
}

function buildClearSessionCookie(req) {
  const secureFlag = isSecureRequest(req) ? '; Secure' : '';
  return `tulc_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0${secureFlag}`;
}

function extractAuthToken(req) {
  const authHeader = req.headers.authorization;
  if (typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7).trim();
    if (token) return token;
  }
  const cookies = parseCookies(req);
  return cookies.tulc_session || null;
}

function getOptionalAuthUser(req) {
  const token = extractAuthToken(req);
  if (!token) return null;
  return verifyJwt(token);
}

function requireAuth(req, res, correlationId, origin, extraHeaders = {}, requiredRole = null) {
  const token = extractAuthToken(req);
  const claims = token ? verifyJwt(token) : null;
  if (!claims) {
    sendJson(
      res,
      401,
      { error: 'Authentication required', correlationId },
      correlationId,
      origin,
      extraHeaders
    );
    return null;
  }
  if (requiredRole && claims.role !== requiredRole) {
    sendJson(
      res,
      403,
      { error: 'Insufficient clearance for this resource', correlationId },
      correlationId,
      origin,
      extraHeaders
    );
    return null;
  }
  return claims;
}

function timingSafeHexEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const cleanA = a.trim().toLowerCase();
  const cleanB = b.trim().toLowerCase();
  if (!/^[0-9a-f]+$/.test(cleanA) || !/^[0-9a-f]+$/.test(cleanB)) return false;
  const bufA = Buffer.from(cleanA, 'hex');
  const bufB = Buffer.from(cleanB, 'hex');
  if (bufA.length === 0 || bufA.length !== bufB.length) return false;
  return crypto.timingSafeEqual(bufA, bufB);
}

// ==============================================================================
// HTTP Helpers, Rate Limiting, Security Headers & Safe Static Serving
// ==============================================================================
function getClientIp(req) {
  if (TRUST_PROXY) {
    const forwarded = req.headers['x-forwarded-for'];
    if (typeof forwarded === 'string' && forwarded.trim()) {
      const ips = forwarded
        .split(',')
        .map((ip) => ip.trim())
        .filter((ip) => /^[0-9a-fA-F:.]{3,45}$/.test(ip));
      if (ips.length > 0) {
        // Select from right-hand trusted proxy hop count so leftmost spoofed headers cannot bypass rate limits
        return ips[Math.max(0, ips.length - TRUST_PROXY_HOPS)];
      }
    }
  }
  return req.socket?.remoteAddress || 'unknown';
}

function checkRateLimit(bucket, ip, maxAttempts, windowMs) {
  const now = Date.now();
  const key = `${bucket}:${ip}`;
  let entry = rateLimitStore.get(key);

  if (!entry || entry.resetAt <= now) {
    entry = { count: 0, resetAt: now + windowMs };
  }

  entry.count += 1;
  rateLimitStore.set(key, entry);

  const remaining = Math.max(0, maxAttempts - entry.count);
  const retryAfterSec = Math.max(1, Math.ceil((entry.resetAt - now) / 1000));

  return {
    allowed: entry.count <= maxAttempts,
    limit: maxAttempts,
    remaining,
    resetEpochSec: Math.ceil(entry.resetAt / 1000),
    retryAfterSec,
  };
}

function applyRateLimit(res, bucket, ip, maxAttempts, windowMs, correlationId, origin) {
  const rl = checkRateLimit(bucket, ip, maxAttempts, windowMs);
  const headers = {
    'X-RateLimit-Limit': String(rl.limit),
    'X-RateLimit-Remaining': String(rl.remaining),
    'X-RateLimit-Reset': String(rl.resetEpochSec),
  };

  if (!rl.allowed) {
    sendJson(
      res,
      429,
      { error: 'Too many requests. Please try again later.', correlationId },
      correlationId,
      origin,
      { ...headers, 'Retry-After': String(rl.retryAfterSec) }
    );
    return { blocked: true, headers };
  }

  return { blocked: false, headers };
}

function getSecurityHeaders(correlationId, origin) {
  const headers = {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    'Content-Security-Policy': CSP_POLICY,
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(self), geolocation=()',
    'X-Correlation-Id': correlationId,
  };

  if (origin && CONFIG.allowedOrigins.has(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
    headers['Access-Control-Allow-Credentials'] = 'true';
    headers['Vary'] = 'Origin';
    headers['Access-Control-Allow-Methods'] = 'GET, POST, HEAD, OPTIONS';
    headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Correlation-Id';
    headers['Access-Control-Max-Age'] = '600';
  }

  return headers;
}

function sendJson(res, statusCode, payload, correlationId, origin, extraHeaders = {}) {
  const headers = {
    ...getSecurityHeaders(correlationId, origin),
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...extraHeaders,
  };
  res.writeHead(statusCode, headers);
  res.end(JSON.stringify(payload));
}

function logServerError(correlationId, req, err) {
  const message = err instanceof Error ? err.message : 'Unexpected server error';
  const safePath = typeof req.url === 'string' ? req.url.split('?')[0] : '/';
  console.error(`[SERVER_ERROR] correlationId=${correlationId} method=${req.method} path=${safePath} detail=${message}`);
  if (DEBUG_MODE && err instanceof Error && err.stack) {
    console.error(err.stack);
  }
}

function readRawBody(req) {
  return new Promise((resolve, reject) => {
    let totalBytes = 0;
    const chunks = [];
    let settled = false;

    req.on('data', (chunk) => {
      if (settled) return;
      totalBytes += chunk.length;
      if (totalBytes > MAX_BODY_BYTES) {
        settled = true;
        const err = new Error('Payload too large');
        err.statusCode = 413;
        req.destroy();
        reject(err);
        return;
      }
      chunks.push(chunk);
    });

    req.on('end', () => {
      if (settled) return;
      settled = true;
      resolve(Buffer.concat(chunks));
    });

    req.on('error', (err) => {
      if (settled) return;
      settled = true;
      reject(err);
    });
  });
}

async function readJsonBody(req) {
  const rawBuf = await readRawBody(req);
  try {
    const raw = rawBuf.toString('utf8');
    const parsed = raw ? JSON.parse(raw) : {};
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      const err = new Error('JSON body must be an object');
      err.statusCode = 400;
      throw err;
    }
    return parsed;
  } catch (err) {
    if (err?.statusCode) throw err;
    const parseErr = new Error('Invalid JSON payload');
    parseErr.statusCode = 400;
    throw parseErr;
  }
}

function findForbiddenPricingKeys(obj) {
  const found = [];
  for (const key of Object.keys(obj)) {
    if (FORBIDDEN_CLIENT_PRICING_FIELDS.has(key.toLowerCase())) {
      found.push(key);
    }
  }
  return found;
}

function computeServerPricing(itemId, rawQty, rawCurrency, rawCouponCode, redemptionContext = null) {
  if (typeof itemId !== 'string' || !Object.prototype.hasOwnProperty.call(PAYMENT_CATALOG, itemId)) {
    return { error: 'Invalid or unknown catalog itemId', status: 400 };
  }
  const catalogItem = PAYMENT_CATALOG[itemId];

  if (rawQty !== undefined && (typeof rawQty !== 'number' || !Number.isInteger(rawQty))) {
    return { error: 'Quantity must be a positive integer', status: 400 };
  }
  const quantity = rawQty === undefined ? 1 : rawQty;
  if (quantity < 1 || quantity > catalogItem.maxQty) {
    return {
      error: `Quantity must be an integer between 1 and ${catalogItem.maxQty} for this item`,
      status: 400,
    };
  }

  const currency = typeof rawCurrency === 'string' ? rawCurrency.trim().toUpperCase() : 'INR';
  if (!Object.prototype.hasOwnProperty.call(CURRENCY_CONFIG, currency)) {
    return { error: 'Unsupported settlement currency', status: 400 };
  }
  const currCfg = CURRENCY_CONFIG[currency];

  let discountPct = 0;
  let appliedCoupon = null;
  if (rawCouponCode !== undefined) {
    if (typeof rawCouponCode !== 'string' || rawCouponCode.length > 64) {
      return { error: 'Invalid mandate discount code format', status: 400 };
    }
    const cleanCode = sanitizeControlChars(rawCouponCode).toUpperCase();
    if (cleanCode) {
      if (!SERVER_COUPONS.has(cleanCode)) {
        return { error: 'Invalid or expired mandate discount code', status: 400 };
      }
      if (redemptionContext) {
        const emailKey = `${cleanCode}:email:${redemptionContext.customerEmail}`;
        const subKey = `${cleanCode}:sub:${redemptionContext.ownerSub}`;
        if (couponRedemptions.has(emailKey) || couponRedemptions.has(subKey)) {
          return { error: 'Mandate discount code has already been redeemed', status: 409 };
        }
      }
      discountPct = SERVER_COUPONS.get(cleanCode);
      appliedCoupon = cleanCode;
    }
  }

  // Authoritative smallest-unit computation (paise / cents / fils)
  const basePaise = catalogItem.unitPriceINRPaise * quantity;
  const intlParityPaise = Math.round((basePaise * currCfg.intlParityBps) / 10000);
  const adjustedInrPaise = basePaise + intlParityPaise;
  const subtotalSmallest = Math.round(adjustedInrPaise * currCfg.rate);
  const discountSmallest = Math.round((subtotalSmallest * discountPct) / 100);
  const postDiscountSmallest = Math.max(0, subtotalSmallest - discountSmallest);
  const fxFeeSmallest = Math.round((postDiscountSmallest * currCfg.fxFeeBps) / 10000);
  const taxableSmallest = postDiscountSmallest + fxFeeSmallest;
  const taxSmallest = Math.round((taxableSmallest * currCfg.taxBps) / 10000);
  const totalSmallestUnit = taxableSmallest + taxSmallest;

  if (!Number.isSafeInteger(totalSmallestUnit) || totalSmallestUnit < 100) {
    return { error: 'Invalid calculated order total', status: 400 };
  }

  return {
    catalogItem,
    itemId,
    quantity,
    currency,
    appliedCoupon,
    subtotalSmallest,
    discountSmallest,
    fxFeeSmallest,
    taxSmallest,
    totalSmallestUnit,
    totalDisplay: Number((totalSmallestUnit / 100).toFixed(2)),
  };
}

function timingSafeVerifyPasskey(candidate) {
  if (CONFIG.passkeyDigests.length === 0) return false;
  const candidateDigest = crypto.createHash('sha256').update(candidate, 'utf8').digest();
  let matched = false;
  for (const expectedDigest of CONFIG.passkeyDigests) {
    if (
      expectedDigest.length === candidateDigest.length &&
      crypto.timingSafeEqual(expectedDigest, candidateDigest)
    ) {
      matched = true;
    }
  }
  return matched;
}

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return MIME_TYPES[ext] || 'application/octet-stream';
}

function isPathInside(baseDir, targetPath) {
  const resolvedBase = path.resolve(baseDir);
  const resolvedTarget = path.resolve(targetPath);
  return resolvedTarget === resolvedBase || resolvedTarget.startsWith(resolvedBase + path.sep);
}

function isSensitiveFilename(relPath) {
  const segments = relPath.split('/').filter(Boolean);
  for (const seg of segments) {
    if (seg === '.well-known') continue;
    if (seg.startsWith('.')) return true;
  }
  const lower = relPath.toLowerCase();
  if (lower.startsWith('protected-assets/') || lower.startsWith('downloadables/')) {
    return true;
  }
  const base = path.basename(relPath).toLowerCase();
  return (
    base === 'server.js' ||
    base === 'package.json' ||
    base === 'package-lock.json' ||
    base === 'bun.lock' ||
    base.startsWith('.env')
  );
}

function serveStaticFile(req, res, filePath, correlationId, origin) {
  try {
    const stat = fs.statSync(filePath);
    if (!stat.isFile()) return false;

    const contentType = getContentType(filePath);
    const headers = {
      ...getSecurityHeaders(correlationId, origin),
      'Content-Type': contentType,
      'Content-Length': stat.size,
    };

    if (filePath.includes(`${path.sep}assets${path.sep}`)) {
      headers['Cache-Control'] = 'public, max-age=31536000, immutable';
    } else if (contentType.startsWith('text/html')) {
      headers['Cache-Control'] = 'public, max-age=0, must-revalidate';
    } else {
      headers['Cache-Control'] = 'public, max-age=86400';
    }

    if (req.method === 'HEAD') {
      res.writeHead(200, headers);
      res.end();
      return true;
    }

    const acceptEncoding = String(req.headers['accept-encoding'] || '');
    const shouldCompress = /text|javascript|json|xml|svg/.test(contentType) && stat.size > 1024;

    if (shouldCompress && acceptEncoding.includes('gzip')) {
      headers['Content-Encoding'] = 'gzip';
      delete headers['Content-Length'];
      res.writeHead(200, headers);
      const rawStream = fs.createReadStream(filePath);
      const gzipStream = zlib.createGzip();
      rawStream.on('error', () => {
        if (!res.writableEnded) res.end();
      });
      rawStream.pipe(gzipStream).pipe(res);
      return true;
    }

    res.writeHead(200, headers);
    const rawStream = fs.createReadStream(filePath);
    rawStream.on('error', () => {
      if (!res.writableEnded) res.end();
    });
    rawStream.pipe(res);
    return true;
  } catch (err) {
    logServerError(correlationId, req, err);
    return false;
  }
}

function serveSpaHtml(req, res, correlationId, origin) {
  const distIndex = path.join(DIST_DIR, 'index.html');
  const rootIndex = path.join(ROOT_DIR, 'index.html');
  const targetIndex = fs.existsSync(distIndex) ? distIndex : rootIndex;

  if (fs.existsSync(targetIndex)) {
    return serveStaticFile(req, res, targetIndex, correlationId, origin);
  }

  sendJson(
    res,
    503,
    { error: 'Service temporarily unavailable', correlationId },
    correlationId,
    origin
  );
  return true;
}

// ==============================================================================
// HTTP Request Server
// ==============================================================================
const server = http.createServer(async (req, res) => {
  const correlationId = crypto.randomUUID();
  const originHeader = typeof req.headers.origin === 'string'
    ? req.headers.origin.trim().replace(/\/+$/, '')
    : '';

  try {
    const method = (req.method || 'GET').toUpperCase();

    let pathname;
    try {
      const urlObj = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);
      pathname = decodeURIComponent(urlObj.pathname);
    } catch {
      sendJson(res, 400, { error: 'Malformed request URL', correlationId }, correlationId, originHeader);
      return;
    }

    // Strict upload protection: multipart/form-data file uploads are explicitly disabled
    const contentTypeHeader = String(req.headers['content-type'] || '').toLowerCase();
    if (contentTypeHeader.includes('multipart/form-data')) {
      sendJson(
        res,
        415,
        { error: 'File uploads are not accepted by this application', correlationId },
        correlationId,
        originHeader
      );
      return;
    }

    // Strict CORS validation whenever an Origin header is supplied
    if (originHeader && !CONFIG.allowedOrigins.has(originHeader)) {
      if (method === 'OPTIONS' || pathname.startsWith('/api/')) {
        sendJson(
          res,
          403,
          { error: 'Cross-origin request denied', correlationId },
          correlationId,
          originHeader
        );
        return;
      }
    }

    if (method === 'OPTIONS') {
      res.writeHead(204, getSecurityHeaders(correlationId, originHeader));
      res.end();
      return;
    }

    if (BLOCKED_TEST_ENDPOINTS.test(pathname) || BLOCKED_INTERNAL_PATHS.test(pathname)) {
      sendJson(res, 404, { error: 'Resource not found', correlationId }, correlationId, originHeader);
      return;
    }

    // Health check endpoint (minimal, non-identifying)
    if ((pathname === '/health' || pathname === '/api/health') && (method === 'GET' || method === 'HEAD')) {
      if (method === 'HEAD') {
        res.writeHead(200, {
          ...getSecurityHeaders(correlationId, originHeader),
          'Content-Type': 'application/json; charset=utf-8',
          'Cache-Control': 'no-store',
        });
        res.end();
        return;
      }
      sendJson(res, 200, { status: 'ok', timestamp: new Date().toISOString() }, correlationId, originHeader);
      return;
    }

    const clientIp = getClientIp(req);

    // --------------------------------------------------------------------------
    // 1. Institutional Passkey Gate + JWT Session & Logout
    // --------------------------------------------------------------------------
    if (pathname === '/api/portal/verify-passkey' && method === 'POST') {
      const rl = applyRateLimit(res, 'auth', clientIp, 5, 60_000, correlationId, originHeader);
      if (rl.blocked) return;

      if (CONFIG.passkeyDigests.length === 0) {
        sendJson(
          res,
          503,
          { valid: false, error: 'Authentication service unconfigured', correlationId },
          correlationId,
          originHeader,
          rl.headers
        );
        return;
      }

      let parsed;
      try {
        parsed = await readJsonBody(req);
      } catch (bodyErr) {
        const statusCode = bodyErr?.statusCode === 413 ? 413 : 400;
        const msg = statusCode === 413 ? 'Request payload too large' : 'Invalid request payload';
        sendJson(res, statusCode, { valid: false, error: msg, correlationId }, correlationId, originHeader, rl.headers);
        return;
      }

      const key = typeof parsed.key === 'string' ? parsed.key.trim().toUpperCase() : '';
      if (!key || key.length > 128) {
        sendJson(
          res,
          400,
          { valid: false, error: 'Invalid passkey format', correlationId },
          correlationId,
          originHeader,
          rl.headers
        );
        return;
      }

      if (!timingSafeVerifyPasskey(key)) {
        sendJson(
          res,
          401,
          { valid: false, error: 'Invalid institutional passkey', correlationId },
          correlationId,
          originHeader,
          rl.headers
        );
        return;
      }

      const keyFingerprint = crypto.createHash('sha256').update(key, 'utf8').digest('hex').slice(0, 12);
      const token = signJwt({ sub: `portal:${keyFingerprint}`, role: 'portal_client' }, 4 * 3600);

      sendJson(
        res,
        200,
        {
          valid: true,
          organization: 'Enterprise Retainer Client',
          tier: 'Tier 3 Sovereign Retainer',
        },
        correlationId,
        originHeader,
        {
          ...rl.headers,
          'Set-Cookie': buildSessionCookie(token, 4 * 3600, req),
        }
      );
      return;
    }

    if (pathname === '/api/portal/session' && method === 'GET') {
      const authUser = requireAuth(req, res, correlationId, originHeader, {}, 'portal_client');
      if (!authUser) return;
      sendJson(
        res,
        200,
        {
          authenticated: true,
          organization: 'Enterprise Retainer Client',
          tier: 'Tier 3 Sovereign Retainer',
        },
        correlationId,
        originHeader
      );
      return;
    }

    if (pathname === '/api/portal/logout' && method === 'POST') {
      const token = extractAuthToken(req);
      const claims = token ? verifyJwt(token) : null;
      if (claims) {
        revokedTokenJtis.set(claims.jti, claims.exp * 1000);
      }
      sendJson(
        res,
        200,
        { loggedOut: true },
        correlationId,
        originHeader,
        { 'Set-Cookie': buildClearSessionCookie(req) }
      );
      return;
    }

    // --------------------------------------------------------------------------
    // 2. Account Auth (scrypt + JWT + Blacklist Logout + Anti-IDOR + 15m Reset)
    // --------------------------------------------------------------------------
    if (pathname === '/api/auth/signup' && method === 'POST') {
      // Stricter anti-abuse rate limit on account creation (3 signups / hour / IP)
      const rl = applyRateLimit(res, 'signup', clientIp, 3, 3_600_000, correlationId, originHeader);
      if (rl.blocked) return;

      if (usersById.size >= MAX_USERS) {
        sendJson(res, 503, { error: 'Registration temporarily unavailable', correlationId }, correlationId, originHeader, rl.headers);
        return;
      }

      let parsed;
      try {
        parsed = await readJsonBody(req);
      } catch (bodyErr) {
        const sc = bodyErr?.statusCode === 413 ? 413 : 400;
        sendJson(res, sc, { error: 'Invalid request payload', correlationId }, correlationId, originHeader, rl.headers);
        return;
      }

      if (hasForbiddenPrivilegeKeys(parsed)) {
        sendJson(res, 400, { error: 'Disallowed account privilege fields in request', correlationId }, correlationId, originHeader, rl.headers);
        return;
      }

      const email = typeof parsed.email === 'string' ? sanitizeControlChars(parsed.email).toLowerCase() : '';
      const password = typeof parsed.password === 'string' ? parsed.password : '';
      if (!EMAIL_REGEX.test(email) || email.length > 254) {
        sendJson(res, 400, { error: 'Valid email address is required', correlationId }, correlationId, originHeader, rl.headers);
        return;
      }
      if (password.length < 10 || password.length > 128) {
        sendJson(
          res,
          400,
          { error: 'Password must be between 10 and 128 characters', correlationId },
          correlationId,
          originHeader,
          rl.headers
        );
        return;
      }

      if (usersByEmail.has(email)) {
        sendJson(res, 409, { error: 'Unable to register with the provided email', correlationId }, correlationId, originHeader, rl.headers);
        return;
      }

      const userId = `usr_${crypto.randomUUID()}`;
      const userRecord = {
        id: userId,
        email,
        role: 'member',
        passwordHash: hashPassword(password),
        tokenVersion: 1,
        createdAt: new Date().toISOString(),
      };
      usersById.set(userId, userRecord);
      usersByEmail.set(email, userRecord);

      const token = signJwt({ sub: userRecord.id, role: userRecord.role, ver: userRecord.tokenVersion }, 3600);
      sendJson(
        res,
        201,
        { user: { id: userRecord.id, email: userRecord.email, role: userRecord.role } },
        correlationId,
        originHeader,
        { ...rl.headers, 'Set-Cookie': buildSessionCookie(token, 3600, req) }
      );
      return;
    }

    if (pathname === '/api/auth/login' && method === 'POST') {
      const rl = applyRateLimit(res, 'auth', clientIp, 5, 60_000, correlationId, originHeader);
      if (rl.blocked) return;

      let parsed;
      try {
        parsed = await readJsonBody(req);
      } catch (bodyErr) {
        const sc = bodyErr?.statusCode === 413 ? 413 : 400;
        sendJson(res, sc, { error: 'Invalid request payload', correlationId }, correlationId, originHeader, rl.headers);
        return;
      }

      if (hasForbiddenPrivilegeKeys(parsed)) {
        sendJson(res, 400, { error: 'Invalid request fields', correlationId }, correlationId, originHeader, rl.headers);
        return;
      }

      const email = typeof parsed.email === 'string' ? sanitizeControlChars(parsed.email).toLowerCase() : '';
      const password = typeof parsed.password === 'string' ? parsed.password : '';
      const user = email ? usersByEmail.get(email) : null;

      if (!user || !password || password.length > 128) {
        runDummyScryptWork(password);
        sendJson(res, 401, { error: 'Invalid credentials', correlationId }, correlationId, originHeader, rl.headers);
        return;
      }

      if (!verifyPassword(password, user.passwordHash)) {
        sendJson(res, 401, { error: 'Invalid credentials', correlationId }, correlationId, originHeader, rl.headers);
        return;
      }

      const token = signJwt({ sub: user.id, role: user.role, ver: user.tokenVersion }, 3600);
      sendJson(
        res,
        200,
        { user: { id: user.id, email: user.email, role: user.role } },
        correlationId,
        originHeader,
        { ...rl.headers, 'Set-Cookie': buildSessionCookie(token, 3600, req) }
      );
      return;
    }

    if (pathname === '/api/auth/logout' && method === 'POST') {
      const token = extractAuthToken(req);
      const claims = token ? verifyJwt(token) : null;
      if (claims) {
        revokedTokenJtis.set(claims.jti, claims.exp * 1000);
      }
      sendJson(
        res,
        200,
        { loggedOut: true },
        correlationId,
        originHeader,
        { 'Set-Cookie': buildClearSessionCookie(req) }
      );
      return;
    }

    if (pathname === '/api/auth/me' && method === 'GET') {
      const authUser = requireAuth(req, res, correlationId, originHeader);
      if (!authUser) return;
      const user = usersById.get(authUser.sub);
      if (!user) {
        sendJson(
          res,
          200,
          { user: { id: authUser.sub, role: authUser.role } },
          correlationId,
          originHeader
        );
        return;
      }
      sendJson(
        res,
        200,
        { user: { id: user.id, email: user.email, role: user.role } },
        correlationId,
        originHeader
      );
      return;
    }

    // Strict Anti-IDOR user resource check (rate-limited + ownership strictly enforced via JWT sub)
    if (pathname.startsWith('/api/users/') && method === 'GET') {
      const rl = applyRateLimit(res, 'user-read', clientIp, 30, 60_000, correlationId, originHeader);
      if (rl.blocked) return;

      const authUser = requireAuth(req, res, correlationId, originHeader, rl.headers);
      if (!authUser) return;

      const requestedUserId = pathname.slice('/api/users/'.length).trim();
      if (!requestedUserId || requestedUserId.includes('/')) {
        sendJson(res, 404, { error: 'Resource not found', correlationId }, correlationId, originHeader, rl.headers);
        return;
      }

      if (requestedUserId !== authUser.sub) {
        sendJson(
          res,
          403,
          { error: 'Forbidden: ownership verification failed', correlationId },
          correlationId,
          originHeader,
          rl.headers
        );
        return;
      }

      const user = usersById.get(requestedUserId);
      if (!user) {
        sendJson(res, 404, { error: 'User profile not found', correlationId }, correlationId, originHeader, rl.headers);
        return;
      }

      sendJson(
        res,
        200,
        { user: { id: user.id, email: user.email, role: user.role, createdAt: user.createdAt } },
        correlationId,
        originHeader,
        rl.headers
      );
      return;
    }

    // Password Reset Request (3/hr per IP AND 3/hr per target email, CSPRNG token, SHA-256 hash stored, 15m TTL)
    if (
      (pathname === '/api/auth/password-reset' || pathname === '/api/auth/forgot-password') &&
      method === 'POST'
    ) {
      const rl = applyRateLimit(res, 'pwd-reset', clientIp, 3, 3_600_000, correlationId, originHeader);
      if (rl.blocked) return;

      let parsed;
      try {
        parsed = await readJsonBody(req);
      } catch (bodyErr) {
        const sc = bodyErr?.statusCode === 413 ? 413 : 400;
        sendJson(res, sc, { error: 'Invalid request payload', correlationId }, correlationId, originHeader, rl.headers);
        return;
      }

      const email = typeof parsed.email === 'string' ? sanitizeControlChars(parsed.email).toLowerCase() : '';
      if (!EMAIL_REGEX.test(email) || email.length > 254) {
        sendJson(res, 400, { error: 'Valid email address is required', correlationId }, correlationId, originHeader, rl.headers);
        return;
      }

      const emailRl = applyRateLimit(res, 'pwd-reset-email', email, 3, 3_600_000, correlationId, originHeader);
      if (emailRl.blocked) return;

      const user = usersByEmail.get(email);
      if (user) {
        // Invalidate any prior active reset tokens bound to this user
        for (const [hashKey, existing] of passwordResetTokens.entries()) {
          if (existing.userId === user.id) {
            passwordResetTokens.delete(hashKey);
          }
        }

        const rawToken = crypto.randomBytes(32).toString('hex');
        const tokenHash = crypto.createHash('sha256').update(rawToken, 'utf8').digest('hex');
        passwordResetTokens.set(tokenHash, {
          userId: user.id,
          expiresAt: Date.now() + 15 * 60 * 1000, // 15 minutes max TTL
          used: false,
        });

        // Dispatch via Resend ONLY if configured; raw token is never echoed in API response or logs
        const resendKey = (process.env.RESEND_API_KEY || '').trim();
        if (resendKey && !containsPlaceholder(resendKey)) {
          const appUrl = (process.env.VITE_APP_URL || 'https://theunboundedleadership.com').replace(/\/+$/, '');
          const senderEmail = (process.env.SENDER_EMAIL || 'suchita@theunboundedleadership.com').trim();
          const resetUrl = `${appUrl}/reset-password?token=${rawToken}`;
          fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${resendKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: senderEmail,
              to: user.email,
              subject: 'Password Reset Request (Expires in 15 Minutes)',
              text: `Use this single-use link within 15 minutes to reset your password: ${resetUrl}`,
            }),
          }).catch(() => {
            console.error(`[EMAIL_DISPATCH_FAILED] correlationId=${correlationId}`);
          });
        }
      }

      sendJson(
        res,
        200,
        { message: 'If an eligible account exists, a single-use reset link valid for 15 minutes has been issued.' },
        correlationId,
        originHeader,
        rl.headers
      );
      return;
    }

    // Password Reset Confirm (single-use, 15m TTL, revokes all prior user JWTs)
    if (pathname === '/api/auth/password-reset/confirm' && method === 'POST') {
      const rl = applyRateLimit(res, 'pwd-reset-confirm', clientIp, 5, 60_000, correlationId, originHeader);
      if (rl.blocked) return;

      let parsed;
      try {
        parsed = await readJsonBody(req);
      } catch (bodyErr) {
        const sc = bodyErr?.statusCode === 413 ? 413 : 400;
        sendJson(res, sc, { error: 'Invalid request payload', correlationId }, correlationId, originHeader, rl.headers);
        return;
      }

      const rawToken = typeof parsed.token === 'string' ? parsed.token.trim() : '';
      const newPassword = typeof parsed.newPassword === 'string' ? parsed.newPassword : '';

      if (!/^[a-f0-9]{64}$/i.test(rawToken)) {
        sendJson(res, 400, { error: 'Invalid or expired reset token', correlationId }, correlationId, originHeader, rl.headers);
        return;
      }
      if (newPassword.length < 10 || newPassword.length > 128) {
        sendJson(
          res,
          400,
          { error: 'New password must be between 10 and 128 characters', correlationId },
          correlationId,
          originHeader,
          rl.headers
        );
        return;
      }

      const tokenHash = crypto.createHash('sha256').update(rawToken, 'utf8').digest('hex');
      const resetRecord = passwordResetTokens.get(tokenHash);

      if (!resetRecord || resetRecord.used || resetRecord.expiresAt <= Date.now()) {
        if (resetRecord) passwordResetTokens.delete(tokenHash);
        sendJson(res, 400, { error: 'Invalid or expired reset token', correlationId }, correlationId, originHeader, rl.headers);
        return;
      }

      // Atomically consume token (strict single-use enforcement)
      resetRecord.used = true;
      passwordResetTokens.delete(tokenHash);

      const user = usersById.get(resetRecord.userId);
      if (!user) {
        sendJson(res, 400, { error: 'Invalid or expired reset token', correlationId }, correlationId, originHeader, rl.headers);
        return;
      }

      user.passwordHash = hashPassword(newPassword);
      user.tokenVersion += 1; // Immediately invalidates all previously issued JWTs for this account

      sendJson(
        res,
        200,
        { passwordUpdated: true },
        correlationId,
        originHeader,
        { ...rl.headers, 'Set-Cookie': buildClearSessionCookie(req) }
      );
      return;
    }

    // --------------------------------------------------------------------------
    // 3. Server-Authoritative Razorpay Checkout, Verification & Webhooks
    // --------------------------------------------------------------------------
    if (pathname === '/api/payments/create-order' && method === 'POST') {
      const rl = applyRateLimit(res, 'payment-create', clientIp, 10, 60_000, correlationId, originHeader);
      if (rl.blocked) return;

      if (ordersStore.size >= MAX_ORDERS) {
        sendJson(res, 503, { error: 'Checkout service at capacity, please retry shortly.', correlationId }, correlationId, originHeader, rl.headers);
        return;
      }

      if (!CONFIG.razorpayKeyId || !CONFIG.razorpayKeySecret) {
        sendJson(
          res,
          503,
          { error: 'Online Razorpay checkout gateway is not configured on the server.', correlationId },
          correlationId,
          originHeader,
          rl.headers
        );
        return;
      }

      let parsed;
      try {
        parsed = await readJsonBody(req);
      } catch (bodyErr) {
        const sc = bodyErr?.statusCode === 413 ? 413 : 400;
        sendJson(res, sc, { error: 'Invalid request payload', correlationId }, correlationId, originHeader, rl.headers);
        return;
      }

      // Explicitly block client-side price / discount / tax / status / privilege tampering
      const tamperedKeys = findForbiddenPricingKeys(parsed);
      if (tamperedKeys.length > 0 || hasForbiddenPrivilegeKeys(parsed)) {
        sendJson(
          res,
          400,
          {
            error: 'Client-supplied pricing, discount, status, or privilege fields are rejected. Totals are calculated exclusively server-side.',
            correlationId,
          },
          correlationId,
          originHeader,
          rl.headers
        );
        return;
      }

      const customerEmail = typeof parsed.customerEmail === 'string' ? sanitizeControlChars(parsed.customerEmail).toLowerCase() : '';
      const organization = typeof parsed.organization === 'string' ? sanitizeControlChars(parsed.organization).slice(0, 140) : '';
      if (!EMAIL_REGEX.test(customerEmail) || customerEmail.length > 254) {
        sendJson(res, 400, { error: 'A valid corporate email address is required', correlationId }, correlationId, originHeader, rl.headers);
        return;
      }

      const existingAuth = getOptionalAuthUser(req);
      const ownerSub = existingAuth ? existingAuth.sub : `guest:${crypto.randomUUID()}`;

      const quote = computeServerPricing(parsed.itemId, parsed.quantity, parsed.currency, parsed.couponCode, {
        customerEmail,
        ownerSub,
      });
      if (quote.error) {
        sendJson(res, quote.status, { error: quote.error, correlationId }, correlationId, originHeader, rl.headers);
        return;
      }

      const orderId = `ORD_${crypto.randomUUID().replace(/-/g, '').slice(0, 16).toUpperCase()}`;
      let razorpayOrderId;

      if (CONFIG.hasLiveRazorpay) {
        const authBasic = Buffer.from(`${CONFIG.razorpayKeyId}:${CONFIG.razorpayKeySecret}`).toString('base64');
        const rzpResp = await fetch('https://api.razorpay.com/v1/orders', {
          method: 'POST',
          headers: {
            Authorization: `Basic ${authBasic}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: quote.totalSmallestUnit,
            currency: quote.currency,
            receipt: orderId,
            notes: {
              internalOrderId: orderId,
              itemId: quote.itemId,
              quantity: String(quote.quantity),
            },
          }),
        });

        if (!rzpResp.ok) {
          console.error(`[RAZORPAY_ORDER_ERROR] correlationId=${correlationId} status=${rzpResp.status}`);
          sendJson(
            res,
            502,
            { error: 'Payment gateway could not initialize order. Please try Corporate Wire or retry shortly.', correlationId },
            correlationId,
            originHeader,
            rl.headers
          );
          return;
        }
        const rzpData = await rzpResp.json();
        razorpayOrderId = rzpData.id;
      } else {
        razorpayOrderId = `order_sandbox_${crypto.randomBytes(8).toString('hex')}`;
      }

      if (quote.appliedCoupon) {
        couponRedemptions.add(`${quote.appliedCoupon}:email:${customerEmail}`);
        couponRedemptions.add(`${quote.appliedCoupon}:sub:${ownerSub}`);
      }

      const orderRecord = {
        orderId,
        razorpayOrderId,
        razorpayPaymentId: null,
        ownerSub,
        itemId: quote.itemId,
        itemTitle: quote.catalogItem.title,
        quantity: quote.quantity,
        currency: quote.currency,
        subtotalSmallest: quote.subtotalSmallest,
        discountSmallest: quote.discountSmallest,
        taxSmallest: quote.taxSmallest,
        amountSmallestUnit: quote.totalSmallestUnit,
        amountDisplay: quote.totalDisplay,
        appliedCoupon: quote.appliedCoupon,
        customerEmail,
        organization,
        status: 'created',
        creditVoucherCode: null,
        createdAt: new Date().toISOString(),
        paidAt: null,
      };

      ordersStore.set(orderId, orderRecord);
      razorpayOrderToInternalId.set(razorpayOrderId, orderId);

      const responseHeaders = { ...rl.headers };
      if (!existingAuth) {
        const customerToken = signJwt({ sub: ownerSub, role: 'order_customer' }, 2 * 3600);
        responseHeaders['Set-Cookie'] = buildSessionCookie(customerToken, 2 * 3600, req);
      }

      sendJson(
        res,
        201,
        {
          orderId,
          razorpayOrderId,
          razorpayKeyId: CONFIG.razorpayKeyId,
          currency: quote.currency,
          amountSmallestUnit: quote.totalSmallestUnit,
          subtotal: Number((quote.subtotalSmallest / 100).toFixed(2)),
          discountAmount: Number((quote.discountSmallest / 100).toFixed(2)),
          fxConversionFee: Number((quote.fxFeeSmallest / 100).toFixed(2)),
          taxAmount: Number((quote.taxSmallest / 100).toFixed(2)),
          totalDisplay: quote.totalDisplay,
          itemTitle: quote.catalogItem.title,
        },
        correlationId,
        originHeader,
        responseHeaders
      );
      return;
    }

    if (pathname === '/api/payments/wire-request' && method === 'POST') {
      const rl = applyRateLimit(res, 'payment-wire', clientIp, 5, 60_000, correlationId, originHeader);
      if (rl.blocked) return;

      if (ordersStore.size >= MAX_ORDERS) {
        sendJson(res, 503, { error: 'Invoice service at capacity, please retry shortly.', correlationId }, correlationId, originHeader, rl.headers);
        return;
      }

      let parsed;
      try {
        parsed = await readJsonBody(req);
      } catch (bodyErr) {
        const sc = bodyErr?.statusCode === 413 ? 413 : 400;
        sendJson(res, sc, { error: 'Invalid request payload', correlationId }, correlationId, originHeader, rl.headers);
        return;
      }

      const tamperedKeys = findForbiddenPricingKeys(parsed);
      if (tamperedKeys.length > 0 || hasForbiddenPrivilegeKeys(parsed)) {
        sendJson(
          res,
          400,
          { error: 'Client-supplied pricing, status, or privilege fields are not allowed.', correlationId },
          correlationId,
          originHeader,
          rl.headers
        );
        return;
      }

      const customerEmail = typeof parsed.customerEmail === 'string' ? sanitizeControlChars(parsed.customerEmail).toLowerCase() : '';
      const organization = typeof parsed.organization === 'string' ? sanitizeControlChars(parsed.organization).slice(0, 140) : '';
      if (!EMAIL_REGEX.test(customerEmail) || customerEmail.length > 254) {
        sendJson(res, 400, { error: 'A valid corporate email address is required', correlationId }, correlationId, originHeader, rl.headers);
        return;
      }

      const existingAuth = getOptionalAuthUser(req);
      const ownerSub = existingAuth ? existingAuth.sub : `guest:${crypto.randomUUID()}`;

      const quote = computeServerPricing(parsed.itemId, parsed.quantity, parsed.currency, parsed.couponCode, {
        customerEmail,
        ownerSub,
      });
      if (quote.error) {
        sendJson(res, quote.status, { error: quote.error, correlationId }, correlationId, originHeader, rl.headers);
        return;
      }

      const orderId = `WIRE_${crypto.randomUUID().replace(/-/g, '').slice(0, 14).toUpperCase()}`;

      if (quote.appliedCoupon) {
        couponRedemptions.add(`${quote.appliedCoupon}:email:${customerEmail}`);
        couponRedemptions.add(`${quote.appliedCoupon}:sub:${ownerSub}`);
      }

      const orderRecord = {
        orderId,
        razorpayOrderId: null,
        razorpayPaymentId: null,
        ownerSub,
        itemId: quote.itemId,
        itemTitle: quote.catalogItem.title,
        quantity: quote.quantity,
        currency: quote.currency,
        subtotalSmallest: quote.subtotalSmallest,
        discountSmallest: quote.discountSmallest,
        taxSmallest: quote.taxSmallest,
        amountSmallestUnit: quote.totalSmallestUnit,
        amountDisplay: quote.totalDisplay,
        appliedCoupon: quote.appliedCoupon,
        customerEmail,
        organization,
        status: 'pending_wire',
        creditVoucherCode: null,
        createdAt: new Date().toISOString(),
        paidAt: null,
      };
      ordersStore.set(orderId, orderRecord);

      const responseHeaders = { ...rl.headers };
      if (!existingAuth) {
        const customerToken = signJwt({ sub: ownerSub, role: 'order_customer' }, 2 * 3600);
        responseHeaders['Set-Cookie'] = buildSessionCookie(customerToken, 2 * 3600, req);
      }

      sendJson(
        res,
        201,
        {
          orderId,
          invoiceReference: orderId,
          timestamp: orderRecord.createdAt,
          amount: orderRecord.amountDisplay,
          currency: orderRecord.currency,
          customerEmail: orderRecord.customerEmail,
          itemTitle: orderRecord.itemTitle,
          status: 'pending_wire',
        },
        correlationId,
        originHeader,
        responseHeaders
      );
      return;
    }

    if (pathname === '/api/payments/verify' && method === 'POST') {
      const rl = applyRateLimit(res, 'payment-verify', clientIp, 10, 60_000, correlationId, originHeader);
      if (rl.blocked) return;

      const authUser = requireAuth(req, res, correlationId, originHeader, rl.headers);
      if (!authUser) return;

      if (!CONFIG.razorpayKeySecret) {
        sendJson(
          res,
          503,
          { verified: false, error: 'Payment verification secret unavailable', correlationId },
          correlationId,
          originHeader,
          rl.headers
        );
        return;
      }

      let parsed;
      try {
        parsed = await readJsonBody(req);
      } catch (bodyErr) {
        const sc = bodyErr?.statusCode === 413 ? 413 : 400;
        sendJson(res, sc, { verified: false, error: 'Invalid request payload', correlationId }, correlationId, originHeader, rl.headers);
        return;
      }

      const orderId = typeof parsed.orderId === 'string' ? parsed.orderId.trim() : '';
      const rzpOrderId = typeof parsed.razorpay_order_id === 'string' ? parsed.razorpay_order_id.trim() : '';
      const rzpPaymentId = typeof parsed.razorpay_payment_id === 'string' ? parsed.razorpay_payment_id.trim() : '';
      const rzpSignature = typeof parsed.razorpay_signature === 'string' ? parsed.razorpay_signature.trim() : '';

      if (!orderId || !rzpOrderId || !rzpPaymentId || !rzpSignature) {
        sendJson(
          res,
          400,
          { verified: false, error: 'Missing required Razorpay payment verification parameters', correlationId },
          correlationId,
          originHeader,
          rl.headers
        );
        return;
      }

      const order = ordersStore.get(orderId);
      if (!order) {
        sendJson(res, 404, { verified: false, error: 'Order not found', correlationId }, correlationId, originHeader, rl.headers);
        return;
      }

      // Strict anti-IDOR check
      if (order.ownerSub !== authUser.sub) {
        sendJson(
          res,
          403,
          { verified: false, error: 'Forbidden: you are not authorized to verify this order', correlationId },
          correlationId,
          originHeader,
          rl.headers
        );
        return;
      }

      if (order.razorpayOrderId !== rzpOrderId) {
        sendJson(
          res,
          400,
          { verified: false, error: 'Razorpay order ID mismatch', correlationId },
          correlationId,
          originHeader,
          rl.headers
        );
        return;
      }

      // Prevent payment ID replay across distinct orders
      const priorOrderForPayment = usedRazorpayPaymentIds.get(rzpPaymentId);
      if (priorOrderForPayment && priorOrderForPayment !== order.orderId) {
        sendJson(
          res,
          409,
          { verified: false, error: 'Payment identifier has already been redeemed', correlationId },
          correlationId,
          originHeader,
          rl.headers
        );
        return;
      }

      // Verify Razorpay HMAC-SHA256(razorpay_order_id|razorpay_payment_id, RAZORPAY_KEY_SECRET)
      const expectedSignature = crypto
        .createHmac('sha256', CONFIG.razorpayKeySecret)
        .update(`${rzpOrderId}|${rzpPaymentId}`, 'utf8')
        .digest('hex');

      if (!timingSafeHexEqual(expectedSignature, rzpSignature)) {
        sendJson(
          res,
          401,
          { verified: false, error: 'Cryptographic payment signature verification failed', correlationId },
          correlationId,
          originHeader,
          rl.headers
        );
        return;
      }

      // Synchronous atomic mutex lock to prevent TOCTOU double-verification race conditions
      const orderLockKey = `order:${order.orderId}`;
      const payLockKey = `pay:${rzpPaymentId}`;
      if (inFlightPaymentLocks.has(orderLockKey) || inFlightPaymentLocks.has(payLockKey)) {
        sendJson(
          res,
          409,
          { verified: false, error: 'Payment verification already in progress for this order', correlationId },
          correlationId,
          originHeader,
          rl.headers
        );
        return;
      }

      inFlightPaymentLocks.add(orderLockKey);
      inFlightPaymentLocks.add(payLockKey);

      try {
        // When live Razorpay keys are configured, verify actual captured status & amount directly with Razorpay API
        if (CONFIG.hasLiveRazorpay) {
          const authBasic = Buffer.from(`${CONFIG.razorpayKeyId}:${CONFIG.razorpayKeySecret}`).toString('base64');
          const paymentResp = await fetch(
            `https://api.razorpay.com/v1/payments/${encodeURIComponent(rzpPaymentId)}`,
            { headers: { Authorization: `Basic ${authBasic}` } }
          );
          if (!paymentResp.ok) {
            sendJson(
              res,
              502,
              { verified: false, error: 'Unable to confirm payment status with Razorpay API', correlationId },
              correlationId,
              originHeader,
              rl.headers
            );
            return;
          }
          const paymentData = await paymentResp.json();
          const statusOk = paymentData.status === 'captured' || paymentData.status === 'authorized';
          if (
            !statusOk ||
            paymentData.order_id !== order.razorpayOrderId ||
            Number(paymentData.amount) !== order.amountSmallestUnit ||
            String(paymentData.currency).toUpperCase() !== order.currency
          ) {
            sendJson(
              res,
              402,
              { verified: false, error: 'Payment amount, currency, or capture status did not match order', correlationId },
              correlationId,
              originHeader,
              rl.headers
            );
            return;
          }
        }

        if (order.status !== 'paid') {
          order.status = 'paid';
          order.razorpayPaymentId = rzpPaymentId;
          order.paidAt = new Date().toISOString();
          order.creditVoucherCode = `TULC-CRED-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
          usedRazorpayPaymentIds.set(rzpPaymentId, order.orderId);
        }

        sendJson(
          res,
          200,
          {
            verified: true,
            orderId: order.orderId,
            transactionId: order.razorpayPaymentId,
            timestamp: order.paidAt,
            amount: order.amountDisplay,
            currency: order.currency,
            customerEmail: order.customerEmail,
            itemTitle: order.itemTitle,
            creditVoucherCode: order.creditVoucherCode,
            status: 'paid',
          },
          correlationId,
          originHeader,
          rl.headers
        );
        return;
      } finally {
        inFlightPaymentLocks.delete(orderLockKey);
        inFlightPaymentLocks.delete(payLockKey);
      }
    }

    // Razorpay Server Webhook (rate-limited + raw Buffer HMAC-SHA256 verification before JSON parsing)
    if (pathname === '/api/payments/webhook/razorpay' && method === 'POST') {
      const rl = applyRateLimit(res, 'payment-webhook', clientIp, 60, 60_000, correlationId, originHeader);
      if (rl.blocked) return;

      if (!CONFIG.razorpayWebhookSecret) {
        sendJson(
          res,
          503,
          { error: 'Webhook verification secret not configured', correlationId },
          correlationId,
          originHeader,
          rl.headers
        );
        return;
      }

      const sigHeader = typeof req.headers['x-razorpay-signature'] === 'string'
        ? req.headers['x-razorpay-signature'].trim()
        : '';
      if (!sigHeader) {
        sendJson(res, 401, { error: 'Missing webhook signature header', correlationId }, correlationId, originHeader, rl.headers);
        return;
      }

      let rawBody;
      try {
        rawBody = await readRawBody(req);
      } catch (bodyErr) {
        const sc = bodyErr?.statusCode === 413 ? 413 : 400;
        sendJson(res, sc, { error: 'Invalid webhook payload', correlationId }, correlationId, originHeader, rl.headers);
        return;
      }

      const expectedWebhookSig = crypto
        .createHmac('sha256', CONFIG.razorpayWebhookSecret)
        .update(rawBody)
        .digest('hex');

      if (!timingSafeHexEqual(expectedWebhookSig, sigHeader)) {
        sendJson(res, 401, { error: 'Invalid webhook signature', correlationId }, correlationId, originHeader, rl.headers);
        return;
      }

      let eventPayload;
      try {
        eventPayload = JSON.parse(rawBody.toString('utf8'));
      } catch {
        sendJson(res, 400, { error: 'Malformed webhook JSON', correlationId }, correlationId, originHeader, rl.headers);
        return;
      }

      const eventType = String(eventPayload?.event || '');
      const paymentEntity = eventPayload?.payload?.payment?.entity;
      const eventIdHeader = String(req.headers['x-razorpay-event-id'] || '').trim();
      const idempotencyKey = eventIdHeader || `${eventType}:${paymentEntity?.id || crypto.createHash('sha256').update(rawBody).digest('hex')}`;

      if (processedWebhookEvents.has(idempotencyKey)) {
        sendJson(res, 200, { received: true, duplicate: true }, correlationId, originHeader, rl.headers);
        return;
      }
      processedWebhookEvents.set(idempotencyKey, Date.now());

      if (paymentEntity && typeof paymentEntity.order_id === 'string') {
        const internalOrderId = razorpayOrderToInternalId.get(paymentEntity.order_id);
        const order = internalOrderId ? ordersStore.get(internalOrderId) : null;

        if (order) {
          if (eventType === 'payment.captured' || eventType === 'order.paid') {
            if (
              Number(paymentEntity.amount) === order.amountSmallestUnit &&
              String(paymentEntity.currency || '').toUpperCase() === order.currency
            ) {
              order.status = 'paid';
              order.razorpayPaymentId = paymentEntity.id || order.razorpayPaymentId;
              order.paidAt = order.paidAt || new Date().toISOString();
              order.creditVoucherCode =
                order.creditVoucherCode || `TULC-CRED-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
              if (paymentEntity.id) {
                usedRazorpayPaymentIds.set(paymentEntity.id, order.orderId);
              }
            }
          } else if (eventType === 'payment.failed' && order.status !== 'paid') {
            order.status = 'failed';
          }
        }
      }

      sendJson(res, 200, { received: true }, correlationId, originHeader, rl.headers);
      return;
    }

    // Order Status Lookup (Rate-limited + Authenticated + Anti-IDOR)
    if (pathname.startsWith('/api/payments/orders/') && method === 'GET') {
      const rl = applyRateLimit(res, 'order-read', clientIp, 30, 60_000, correlationId, originHeader);
      if (rl.blocked) return;

      const authUser = requireAuth(req, res, correlationId, originHeader, rl.headers);
      if (!authUser) return;

      const orderId = pathname.slice('/api/payments/orders/'.length).trim();
      const order = ordersStore.get(orderId);
      if (!order) {
        sendJson(res, 404, { error: 'Order not found', correlationId }, correlationId, originHeader, rl.headers);
        return;
      }
      if (order.ownerSub !== authUser.sub) {
        sendJson(res, 403, { error: 'Forbidden: ownership check failed', correlationId }, correlationId, originHeader, rl.headers);
        return;
      }

      sendJson(
        res,
        200,
        {
          orderId: order.orderId,
          itemTitle: order.itemTitle,
          quantity: order.quantity,
          currency: order.currency,
          amount: order.amountDisplay,
          status: order.status,
          creditVoucherCode: order.status === 'paid' ? order.creditVoucherCode : null,
          createdAt: order.createdAt,
          paidAt: order.paidAt,
        },
        correlationId,
        originHeader,
        rl.headers
      );
      return;
    }

    // Paid Entitlement / Protected Deliverable Download (Rate-limited + Authenticated + Anti-IDOR + Paid-Status Gate)
    if (pathname.startsWith('/api/payments/entitlement/') && method === 'GET') {
      const rl = applyRateLimit(res, 'entitlement-read', clientIp, 30, 60_000, correlationId, originHeader);
      if (rl.blocked) return;

      const authUser = requireAuth(req, res, correlationId, originHeader, rl.headers);
      if (!authUser) return;

      const orderId = pathname.slice('/api/payments/entitlement/'.length).trim();
      const order = ordersStore.get(orderId);
      if (!order) {
        sendJson(res, 404, { error: 'Order not found', correlationId }, correlationId, originHeader, rl.headers);
        return;
      }
      if (order.ownerSub !== authUser.sub) {
        sendJson(
          res,
          403,
          { error: 'Forbidden: you do not own this order entitlement', correlationId },
          correlationId,
          originHeader,
          rl.headers
        );
        return;
      }
      if (order.status !== 'paid') {
        sendJson(
          res,
          402,
          { error: 'Payment verification required before accessing licensed deliverables', correlationId },
          correlationId,
          originHeader,
          rl.headers
        );
        return;
      }

      const catalogItem = PAYMENT_CATALOG[order.itemId];
      const filesIncluded = [];
      const textSections = [
        '====================================================================',
        'THE UNBOUNDED LEADERSHIP CO. - LICENSED EXECUTIVE DELIVERABLE',
        '====================================================================',
        `Order Reference: ${order.orderId}`,
        `Verified Payment ID: ${order.razorpayPaymentId}`,
        `Item: ${order.itemTitle}`,
        `Licensed To: ${order.organization || order.customerEmail} (${order.customerEmail})`,
        `100% Advisory Credit Voucher: ${order.creditVoucherCode}`,
        `Issued: ${order.paidAt}`,
        '====================================================================',
        '',
      ];

      for (const filename of catalogItem.deliverables) {
        const safePath = path.resolve(PROTECTED_ASSETS_DIR, path.basename(filename));
        if (isPathInside(PROTECTED_ASSETS_DIR, safePath) && fs.existsSync(safePath)) {
          filesIncluded.push(path.basename(filename));
          const rawHtml = fs.readFileSync(safePath, 'utf8');
          const stripped = rawHtml
            .replace(/<style[\s\S]*?<\/style>/gi, '')
            .replace(/<script[\s\S]*?<\/script>/gi, '')
            .replace(/<[^>]+>/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
          textSections.push(`--- INCLUDED ASSET: ${path.basename(filename)} ---`, stripped.slice(0, 12000), '');
        }
      }

      sendJson(
        res,
        200,
        {
          orderId: order.orderId,
          files: filesIncluded,
          deliverablePackageText: textSections.join('\n'),
        },
        correlationId,
        originHeader,
        rl.headers
      );
      return;
    }

    // --------------------------------------------------------------------------
    // 4. Tightly Rate-Limited & Origin-Scoped Gemini AI Proxy
    // --------------------------------------------------------------------------
    if (pathname === '/api/ai/generate' && method === 'POST') {
      const rlMin = applyRateLimit(res, 'ai-min', clientIp, 5, 60_000, correlationId, originHeader);
      if (rlMin.blocked) return;
      const rlHour = applyRateLimit(res, 'ai-hour', clientIp, 15, 3_600_000, correlationId, originHeader);
      if (rlHour.blocked) return;

      // In production, require explicit same-origin Origin header to prevent headless cross-site proxy abuse
      if (IS_PROD && (!originHeader || !CONFIG.allowedOrigins.has(originHeader))) {
        sendJson(
          res,
          403,
          { error: 'Authorized frontend origin required', correlationId },
          correlationId,
          originHeader,
          rlHour.headers
        );
        return;
      }

      const apiKey = (process.env.GEMINI_API_KEY || '').trim();
      if (!apiKey || containsPlaceholder(apiKey)) {
        sendJson(
          res,
          503,
          { error: 'AI service unavailable', correlationId },
          correlationId,
          originHeader,
          rlHour.headers
        );
        return;
      }

      let parsed;
      try {
        parsed = await readJsonBody(req);
      } catch (bodyErr) {
        const statusCode = bodyErr?.statusCode === 413 ? 413 : 400;
        const msg = statusCode === 413 ? 'Request payload too large' : 'Invalid request payload';
        sendJson(res, statusCode, { error: msg, correlationId }, correlationId, originHeader, rlHour.headers);
        return;
      }

      const prompt = typeof parsed.prompt === 'string' ? parsed.prompt.trim() : '';
      if (!prompt || prompt.length > 4000) {
        sendJson(
          res,
          400,
          { error: 'A valid prompt (max 4000 characters) is required', correlationId },
          correlationId,
          originHeader,
          rlHour.headers
        );
        return;
      }

      const model = 'gemini-2.5-flash';
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

      const aiResponse = await fetch(geminiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.5,
            maxOutputTokens: 2048,
          },
        }),
      });

      if (!aiResponse.ok) {
        console.error(`[AI_UPSTREAM_ERROR] correlationId=${correlationId} status=${aiResponse.status}`);
        sendJson(
          res,
          502,
          { error: 'Upstream generation unavailable', correlationId },
          correlationId,
          originHeader,
          rlHour.headers
        );
        return;
      }

      const data = await aiResponse.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      sendJson(res, 200, { text, success: true }, correlationId, originHeader, rlHour.headers);
      return;
    }

    // Unknown API routes return clean 404 JSON
    if (pathname.startsWith('/api/')) {
      sendJson(res, 404, { error: 'Endpoint not found', correlationId }, correlationId, originHeader);
      return;
    }

    if (method !== 'GET' && method !== 'HEAD') {
      sendJson(res, 405, { error: 'Method not allowed', correlationId }, correlationId, originHeader);
      return;
    }

    // Static asset serving with strict path traversal and sensitive-file protection
    const normalizedPath = pathname.replace(/^\/+|\/+$/g, '');
    if (normalizedPath) {
      if (normalizedPath.includes('\0') || isSensitiveFilename(normalizedPath)) {
        sendJson(res, 404, { error: 'Resource not found', correlationId }, correlationId, originHeader);
        return;
      }

      const distFilePath = path.resolve(DIST_DIR, normalizedPath);
      if (isPathInside(DIST_DIR, distFilePath) && fs.existsSync(distFilePath) && fs.statSync(distFilePath).isFile()) {
        if (serveStaticFile(req, res, distFilePath, correlationId, originHeader)) return;
      }

      const dirIndexPath = path.resolve(DIST_DIR, normalizedPath, 'index.html');
      if (isPathInside(DIST_DIR, dirIndexPath) && fs.existsSync(dirIndexPath) && fs.statSync(dirIndexPath).isFile()) {
        if (serveStaticFile(req, res, dirIndexPath, correlationId, originHeader)) return;
      }

      const publicFilePath = path.resolve(PUBLIC_DIR, normalizedPath);
      if (isPathInside(PUBLIC_DIR, publicFilePath) && fs.existsSync(publicFilePath) && fs.statSync(publicFilePath).isFile()) {
        if (serveStaticFile(req, res, publicFilePath, correlationId, originHeader)) return;
      }
    }

    serveSpaHtml(req, res, correlationId, originHeader);
  } catch (err) {
    logServerError(correlationId, req, err);
    if (!res.headersSent) {
      sendJson(
        res,
        500,
        { error: 'Internal server error', correlationId },
        correlationId,
        originHeader
      );
    } else if (!res.writableEnded) {
      res.end();
    }
  }
});

server.listen(PORT, HOST, () => {
  console.info(`[TULC_SERVER] Listening on ${HOST}:${PORT} (${NODE_ENV})`);
});

process.on('SIGTERM', () => {
  server.close(() => process.exit(0));
});
process.on('SIGINT', () => {
  server.close(() => process.exit(0));
});
