// Server Configuration Module
// Strictly reads from environment variables with no hardcoded fallback secrets

export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  isProd: process.env.NODE_ENV === 'production',
  adminEmail: process.env.ADMIN_EMAIL || process.env.VITE_ADMIN_EMAIL || 'suchita@theunboundedleadership.com',
  senderEmail: process.env.SENDER_EMAIL || process.env.VITE_SENDER_EMAIL || 'suchita@theunboundedleadership.com',
  senderName: process.env.SENDER_NAME || 'The Unbounded Leadership Co.',
  resendApiKey: process.env.RESEND_API_KEY || '',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  bingIndexNowKey: process.env.BING_INDEXNOW_KEY || '',
  portalClearanceKeys: (process.env.PORTAL_CLEARANCE_KEYS || '').split(',').map(k => k.trim().toUpperCase()).filter(Boolean),
  sovereignAuditTargetUrl: process.env.SOVEREIGN_AUDIT_TARGET_URL || 'https://institutional-assessment.ai.studio/'
};

export function logEnvironmentCalibration(): void {
  console.log('--- Institutional Environment Check ---');
  console.log(`PORT: ${config.port}`);
  console.log(`ENVIRONMENT: ${config.isProd ? 'PRODUCTION' : 'DEVELOPMENT'}`);
  console.log(`RESEND_API_KEY: ${config.resendApiKey ? '[CALIBRATED]' : '[UNSET - simulation mode]'}`);
  console.log(`GEMINI_API_KEY: ${config.geminiApiKey ? '[CALIBRATED]' : '[UNSET - offline substrate active]'}`);
  console.log(`BING_INDEXNOW_KEY: ${config.bingIndexNowKey ? '[CONFIGURED]' : '[UNSET]'}`);
  console.log('----------------------------------------');
}
