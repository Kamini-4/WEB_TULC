import { Resend } from 'resend';
import { config } from '../config.ts';

let resendClient: Resend | null = null;

function getResend(): Resend | null {
  if (!resendClient && config.resendApiKey) {
    resendClient = new Resend(config.resendApiKey);
  }
  return resendClient;
}

export interface ContactDispatchPayload {
  name: string;
  email: string;
  organization?: string;
  role?: string;
  message?: string;
  type?: string;
  selected_date?: string;
  selected_time?: string;
  assessmentData?: {
    totalScore: number;
    domainScores: Array<{ domain: string; score: number }>;
  };
}

export interface EmailDispatchResult {
  recipient: string;
  sender: string;
  subject: string;
  success: boolean;
  error: string | null;
  id: string | null;
}

export interface ContactDispatchResponse {
  success: boolean;
  adminEmail: EmailDispatchResult;
  userEmail: EmailDispatchResult;
}

export interface PasskeyEmailPayload {
  key: string;
  organization: string;
  contactEmail: string;
  tier: string;
  validityDays: number;
  expiresAt: number;
  customNotes?: string;
  host?: string;
  protocol?: string;
}

export const emailService = {
  /**
   * Dispatches contact lead notifications to the administrator and acknowledgment to the user
   */
  async dispatchContactEmails(payload: ContactDispatchPayload): Promise<ContactDispatchResponse> {
    const { name, email, organization = 'Institutional Inquiry', role, message, type, selected_date, selected_time, assessmentData } = payload;
    const resend = getResend();
    const sender = `${config.senderName} <${config.senderEmail}>`;
    const adminEmail = config.adminEmail;

    // Build Admin Subject & HTML
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

    // Build User Acknowledgment Subject & HTML
    let userSubject = "Dispatch Acknowledged | Potential Strategic Yield: +40% Bandwidth";
    let userHeadline = "Your institutional audit has been initiated.";
    let userMessage = "Our methodology focuses on reclaiming 40% of your cognitive capacity—the direct path to doubling institutional yield and engineering permanent market leadership.";
    let preheader = "Reclaim 40% of your strategic bandwidth and engineer permanent market leadership.";

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
      const { totalScore, domainScores } = assessmentData || { totalScore: 0, domainScores: [] };
      userSubject = `Audit Synthesized: ${totalScore}/25 | Reclaiming Billions in Cognitive Equity`;
      userHeadline = "Your leadership architecture has been forensically analyzed for maximum yield.";
      preheader = `Score: ${totalScore}/25. We have quantified your 'Cognitive Tax'—reclaim your strategic bandwidth for pure architectural command.`;

      const domainContent: Record<string, string> = {
        "Cognitive Clarity": "Neutralize the 'Cognitive Tax' consuming 40% of your bandwidth. Clarity is the primary substrate of execution and revenue generation.",
        "Systemic Integrity": "Protect your focus through structural integrity. Systems that run independently of individual effort foster institutional alignment.",
        "Strategic Velocity": "Compress the distance between intent and revenue. Antifragile substrates convert market disruption into immediate strategic leverage.",
        "Moral Gravity": "The structural inevitability of trust. Eliminating reputational friction reclaims the cognitive equity lost to behavioral maintenance.",
        "Cultural Fidelity": "Zero operational drift. Autonomous culture ensures every strategic move at the edge yields maximum market conversion."
      };

      const domainTable = domainScores.map((ds) => `
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
        <div style="display: none; max-height: 0px; overflow: hidden;">
          ${preheader}
        </div>
        
        <div style="text-align: center; margin-bottom: 40px;">
          <div style="font-size: 14px; letter-spacing: 0.4em; text-transform: uppercase; color: #b8860b; border-bottom: 1px solid #b8860b; display: inline-block; padding-bottom: 5px; margin-bottom: 10px;">The Unbounded Leadership Co.</div>
          <div style="font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #999;">The Unbounded Leadership Co. | Office of the Principal</div>
        </div>
        
        <h1 style="font-size: 22px; margin-bottom: 20px; font-weight: bold; color: #111;">${userHeadline}</h1>
        
        <p style="font-size: 16px; margin-bottom: 25px;">Dear ${name},</p>
        
        <div style="margin-bottom: 25px; font-size: 17px; color: #333;">${userMessage}</div>
        
        <p style="margin-bottom: 25px;">At <strong>The Unbounded Leadership Co.</strong>, we recognize that high-stakes leadership is an engineering challenge. Our focus isn't just on incremental gains; it's on the complete removal of institutional friction so that every strategic move yields maximum market conversion and revenue growth.</p>
        
        <p style="margin-bottom: 25px;">A senior strategist is now reviewing your organizational telemetry. Should the audit reveal a substrate primed for transformation, we will facilitate the next logic gate in our engagement protocol.</p>
        
        <div style="margin-top: 50px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="font-size: 14px; margin: 0;">Sincerely,</p>
          <p style="font-size: 14px; font-weight: bold; margin: 5px 0 0 0; color: #b8860b;">Suchita Sancheti (suchita@theunboundedleadership.com)</p>
          <p style="font-size: 12px; font-weight: bold; margin: 0; color: #999; text-transform: uppercase; letter-spacing: 0.1em;">Founder & Principal Architect</p>
          <p style="font-size: 12px; color: #999; margin: 5px 0 0 0;">London • Singapore • New York</p>
        </div>
        
        <div style="margin-top: 40px; font-size: 10px; color: #ccc; text-align: center; letter-spacing: 0.1em;">
          CONFIDENTIALITY NOTICE: This dispatch contains proprietary institutional intelligence and is intended strictly for ${email}.
        </div>
      </div>
    `;

    if (!resend) {
      console.warn('[MAIL] RESEND_API_KEY uncalibrated. Simulating email transmission.');
      return {
        success: true,
        adminEmail: {
          recipient: adminEmail,
          sender: sender,
          subject: adminSubject,
          success: false,
          error: 'RESEND_API_KEY is uncalibrated in server environment (simulation mode).',
          id: null
        },
        userEmail: {
          recipient: email,
          sender: sender,
          subject: userSubject,
          success: false,
          error: 'RESEND_API_KEY is uncalibrated in server environment (simulation mode).',
          id: null
        }
      };
    }

    let adminResult: any = null;
    let userResult: any = null;
    const fallbackSender = 'onboarding@resend.dev';

    // 1. Dispatch to Admin
    try {
      adminResult = await resend.emails.send({
        from: sender,
        to: [adminEmail],
        replyTo: [email],
        subject: adminSubject,
        html: adminHtml,
      });
    } catch (e: any) {
      console.error(`[MAIL] Primary admin send failed: ${e.message}`);
      adminResult = { error: e };
    }

    // Fallback send if primary sender domain fails
    if (adminResult?.error) {
      try {
        console.log(`[MAIL] Retrying admin notification using verified fallback sender: ${fallbackSender}`);
        adminResult = await resend.emails.send({
          from: fallbackSender,
          to: [adminEmail],
          replyTo: [email],
          subject: `[FALLBACK] ${adminSubject}`,
          html: `<div style="background: #fff4f4; padding: 10px; border: 1px solid #fecaca; margin-bottom: 20px; font-size: 12px; font-family: sans-serif;"><strong>NOTE:</strong> Notification transmitted via fallback sender while domain verification is in progress.</div>${adminHtml}`,
        });
      } catch (fallbackErr: any) {
        console.error(`[MAIL] Fallback admin send exception: ${fallbackErr.message}`);
        adminResult = { error: fallbackErr };
      }
    }

    // 2. Dispatch Acknowledgment to User
    try {
      userResult = await resend.emails.send({
        from: sender,
        to: [email],
        replyTo: [adminEmail],
        subject: userSubject,
        html: userHtml,
      });
    } catch (e: any) {
      console.error(`[MAIL] User acknowledgment send exception: ${e.message}`);
      userResult = { error: e };
    }

    return {
      success: true,
      adminEmail: {
        recipient: adminEmail,
        sender: sender,
        subject: adminSubject,
        success: Boolean(adminResult && !adminResult.error),
        error: adminResult?.error ? (adminResult.error.message || JSON.stringify(adminResult.error)) : null,
        id: adminResult?.data?.id || null
      },
      userEmail: {
        recipient: email,
        sender: sender,
        subject: userSubject,
        success: Boolean(userResult && !userResult.error),
        error: userResult?.error ? (userResult.error.message || JSON.stringify(userResult.error)) : null,
        id: userResult?.data?.id || null
      }
    };
  },

  /**
   * Broadcasts newsletter briefings to verified subscribers
   */
  async dispatchNewsletterBroadcast(subscribers: string[], title: string, category: string, tagline: string, content: string[], id?: string, url?: string) {
    const resend = getResend();
    if (!resend) {
      throw new Error('RESEND_API_KEY is not configured on the server.');
    }

    const sender = `${config.senderName} <${config.senderEmail}>`;
    const adminEmail = config.adminEmail;

    const formattedContent = content.map((paragraph: string) => `
      <p style="font-size: 16px; line-height: 1.8; margin-bottom: 24px; color: #1a1a1a; font-family: 'Times New Roman', Times, serif;">
        ${paragraph}
      </p>
    `).join('');

    const newsletterHtml = `
      <div style="font-family: 'Times New Roman', Georgia, serif; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 40px; border: 1px solid #e5e5e0; background-color: #fafaf9; box-sizing: border-box;">
        <div style="text-align: center; margin-bottom: 40px; border-bottom: 2px solid #b8860b; padding-bottom: 15px;">
          <div style="font-size: 16px; letter-spacing: 0.35em; text-transform: uppercase; color: #111; font-weight: bold; margin-bottom: 5px;">
            The Unbounded Leadership Co.
          </div>
          <div style="font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: #7f7f75;">
            Strategic Intelligence Brief • Office of the Principal
          </div>
        </div>

        <div style="font-size: 10px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.15em; color: #b8860b; margin-bottom: 25px; border-bottom: 1px solid #e5e5e0; padding-bottom: 8px; display: table; width: 100%;">
          <div style="display: table-cell; text-align: left;">${category || 'INTELLIGENCE REPORT'}</div>
          <div style="display: table-cell; text-align: right;">ID: ${id || 'DISPATCH'}</div>
        </div>

        <h1 style="font-size: 26px; line-height: 1.3; font-weight: bold; color: #111; margin-bottom: 12px; margin-top: 0; font-family: 'Times New Roman', Georgia, serif;">
          ${title}
        </h1>

        ${tagline ? `
          <p style="font-size: 17px; font-style: italic; color: #5c5c50; line-height: 1.5; margin-bottom: 35px; margin-top: 0;">
            "${tagline}"
          </p>
        ` : ''}

        <hr style="border: 0; border-top: 1px solid #e5e5e0; margin-bottom: 30px;" />

        <div style="margin-bottom: 40px;">
          ${formattedContent}
        </div>

        ${url ? `
          <div style="margin: 40px 0; text-align: center;">
            <a href="${url}" style="display: inline-block; padding: 14px 28px; background-color: #b8860b; color: #ffffff; text-decoration: none; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.2em; font-family: Arial, sans-serif;">
              Read Full Entry Online
            </a>
          </div>
        ` : ''}

        <div style="margin-top: 50px; padding-top: 25px; border-top: 1px solid #e5e5e0;">
          <p style="font-size: 15px; margin: 0; font-family: 'Times New Roman', Georgia, serif;">Sincerely,</p>
          <p style="font-size: 15px; font-weight: bold; margin: 6px 0 0 0; color: #b8860b; font-family: 'Times New Roman', Georgia, serif;">Suchita Sancheti (suchita@theunboundedleadership.com)</p>
          <p style="font-size: 11px; font-weight: bold; margin: 0; color: #7f7f75; text-transform: uppercase; letter-spacing: 0.1em; font-family: Arial, sans-serif;">Founder & Principal Architect</p>
          <p style="font-size: 11px; color: #a3a39e; margin: 3px 0 0 0; font-family: Arial, sans-serif;">London • Singapore • New York</p>
        </div>

        <div style="margin-top: 50px; font-size: 9px; color: #a3a39e; text-align: center; border-top: 1px solid #f2f2ee; padding-top: 15px; font-family: Arial, sans-serif; line-height: 1.4;">
          <strong>PRIVILEGED DISCLOSURE NOTICE:</strong> This document contains proprietary insights engineered for aligned leaders. To withdraw consent or modify your standing, reply to this email directly with <strong>UNSUBSCRIBE</strong>. <br />
          © 2026 The Unbounded Leadership Co. All rights reserved. Registered work.
        </div>
      </div>
    `;

    const sendPromises = subscribers.map(async (recipient) => {
      try {
        const result = await resend.emails.send({
          from: sender,
          to: [recipient],
          replyTo: [adminEmail],
          subject: `Aligned Digest: ${title}`,
          html: newsletterHtml,
        });
        return {
          recipient,
          sender,
          subject: `Aligned Digest: ${title}`,
          success: !result.error,
          error: result.error ? (result.error.message || String(result.error)) : null,
          id: result.data?.id || null
        };
      } catch (err: any) {
        return {
          recipient,
          sender,
          subject: `Aligned Digest: ${title}`,
          success: false,
          error: err.message || String(err),
          id: null
        };
      }
    });

    const results = await Promise.all(sendPromises);
    const sentCount = results.filter(r => r.success).length;
    const failedCount = results.filter(r => !r.success).length;

    return {
      success: true,
      sentCount,
      failedCount,
      results,
      failures: results.filter(r => !r.success).map(r => ({ email: r.recipient, error: r.error }))
    };
  },

  /**
   * Dispatches institutional passkey clearance emails to client organizations
   */
  async dispatchPortalPasskeyEmail(payload: PasskeyEmailPayload) {
    const { key, organization, contactEmail, tier, validityDays, expiresAt, customNotes, host, protocol = 'https' } = payload;
    const resend = getResend();
    const sender = `${config.senderName} <${config.senderEmail}>`;
    const adminEmail = config.adminEmail;

    const currentHost = host || 'theunboundedleadership.com';
    const portalUrl = `${protocol}://${currentHost}/portal?key=${encodeURIComponent(key)}`;

    const tierLabels: Record<string, string> = {
      'BETA': 'Beta Testing Access Mandate',
      'TIER_1_DIAGNOSTIC': 'Phase 0.0 Diagnostic Audit',
      'TIER_2_SPRINT': '90-Day Protocol Transformation Sprint',
      'TIER_3_SOVEREIGN_RETAINER': 'Sovereign Retainer & Board Seat',
      'CUSTOM': 'Custom Executive Access'
    };

    const readableTier = tierLabels[tier] || tier;
    const formattedDate = new Date(expiresAt).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const emailSubject = `Sovereign Clearance Key // ${organization} — Assessment Access Granted`;
    const emailHtml = `
      <div style="font-family: 'Times New Roman', Georgia, serif; color: #1a1a1a; max-width: 620px; margin: 0 auto; padding: 40px 30px; border: 1px solid #e5e5e0; background-color: #fafaf9; box-sizing: border-box; line-height: 1.6;">
        <div style="text-align: center; margin-bottom: 35px; border-bottom: 2px solid #b8860b; padding-bottom: 18px;">
          <div style="font-size: 14px; letter-spacing: 0.35em; text-transform: uppercase; color: #111; font-weight: bold; margin-bottom: 6px;">
            The Unbounded Leadership Co.
          </div>
          <div style="font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase; color: #b8860b; font-family: monospace;">
            Executive Clearance & Assessment Substrate
          </div>
        </div>

        <h2 style="font-size: 22px; color: #111; margin-bottom: 15px; font-weight: bold;">
          Institutional Access Authorized
        </h2>

        <p style="font-size: 15px; margin-bottom: 20px; color: #222;">
          Clearance credentials have been issued for <strong>${organization}</strong> to access the Sovereign Assessment and Institutional Stress-Testing Suite.
        </p>

        <div style="background: #111111; color: #ffffff; padding: 25px 20px; text-align: center; border: 1px solid #b8860b; margin: 25px 0;">
          <div style="font-size: 9px; letter-spacing: 0.25em; text-transform: uppercase; color: #b8860b; font-family: monospace; margin-bottom: 8px;">
            Your Master Organization Key
          </div>
          <div style="font-size: 24px; font-weight: bold; letter-spacing: 0.15em; font-family: 'Courier New', monospace; color: #ffffff; padding: 8px 0;">
            ${key}
          </div>
          <div style="font-size: 11px; color: #a1a1aa; margin-top: 8px;">
            Tier: <strong style="color: #b8860b;">${readableTier}</strong> • Active Window: <strong>${validityDays} Days</strong>
          </div>
          <div style="font-size: 10px; color: #71717a; margin-top: 4px;">
            Valid Through: ${formattedDate}
          </div>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${portalUrl}" style="background-color: #b8860b; color: #ffffff; padding: 14px 28px; text-decoration: none; font-size: 11px; font-weight: bold; letter-spacing: 0.2em; text-transform: uppercase; display: inline-block; font-family: Arial, sans-serif;">
            Direct Access to Assessment Terminal
          </a>
        </div>

        ${customNotes ? `
          <div style="background: #ffffff; border-left: 3px solid #b8860b; padding: 15px; margin: 25px 0; font-size: 13px; color: #444; font-style: italic;">
            <strong>Executive Briefing Note:</strong> ${customNotes}
          </div>
        ` : ''}

        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e5e0; font-size: 12px; color: #555;">
          <p style="margin: 0 0 5px 0;">Issued by: <strong>Office of Suchita Sancheti</strong> (suchita@theunboundedleadership.com)</p>
          <p style="margin: 0;">London • Singapore • New York</p>
        </div>
      </div>
    `;

    if (!resend) {
      console.log(`[PASSKEY SIMULATION] Issued ${key} to ${organization} (${contactEmail})`);
      return {
        success: true,
        simulated: true,
        portalUrl,
        sender: sender,
        recipient: contactEmail,
        key
      };
    }

    const sendRes = await resend.emails.send({
      from: sender,
      to: [contactEmail],
      replyTo: [adminEmail],
      subject: emailSubject,
      html: emailHtml
    });

    if (sendRes.error) {
      console.warn(`[PASSKEY MAIL] Primary send failed (${sendRes.error.message}), retrying via fallback sender...`);
      const fallbackSender = 'onboarding@resend.dev';
      const fallbackRes = await resend.emails.send({
        from: fallbackSender,
        to: [contactEmail],
        replyTo: [adminEmail],
        subject: `[CLEARANCE] ${emailSubject}`,
        html: emailHtml
      });

      if (fallbackRes.error) {
        throw new Error(fallbackRes.error.message || 'Passkey delivery failed on both primary and fallback channels');
      }

      return {
        success: true,
        emailId: fallbackRes.data?.id,
        portalUrl,
        key
      };
    }

    return {
      success: true,
      emailId: sendRes.data?.id,
      portalUrl,
      key
    };
  }
};
