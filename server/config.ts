export interface ServerConfig {
  port: number;
  isProd: boolean;
  adminEmail: string;
  senderEmail: string;
  senderName: string;
  resendApiKey?: string;
  geminiApiKey?: string;
  bingIndexNowKey: string;
  sovereignAuditTargetUrl: string;
}

export const config: ServerConfig = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
  isProd: process.env.NODE_ENV === 'production',
  adminEmail: process.env.VITE_ADMIN_EMAIL || 'suchita@theunboundedleadership.com',
  senderEmail: process.env.VITE_SENDER_EMAIL || 'suchita@theunboundedleadership.com',
  senderName: process.env.VITE_SENDER_NAME || 'The Unbounded Leadership Co.',
  resendApiKey: process.env.RESEND_API_KEY,
  geminiApiKey: process.env.GEMINI_API_KEY,
  bingIndexNowKey: '8c92a1b3d5e7f9024680acebdf135792',
  sovereignAuditTargetUrl: 'https://sovereign-audit-the-institutional-stress-test-942902734370.us-west1.run.app'
};

export function logEnvironmentCalibration() {
  console.log('--- Institutional Environment Check ---');
  console.log(`PORT: ${config.port}`);
  console.log(`ENVIRONMENT: ${config.isProd ? 'PRODUCTION' : 'DEVELOPMENT'}`);
  console.log(`RESEND_API_KEY: ${config.resendApiKey ? 'CALIBRATED' : 'MISSING (simulation mode active)'}`);
  console.log(`GEMINI_API_KEY: ${config.geminiApiKey ? 'CALIBRATED' : 'MISSING (offline substrate active)'}`);
  console.log(`ADMIN_EMAIL: ${config.adminEmail}`);
  console.log(`SENDER_EMAIL: ${config.senderEmail}`);
  console.log('----------------------------------------');
}
