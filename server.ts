import express from "express";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";
import fs from "fs-extra";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Persistence Setup
  const DATA_DIR = path.join(process.cwd(), "data");
  const REMINDERS_FILE = path.join(DATA_DIR, "reminders.json");
  await fs.ensureDir(DATA_DIR);
  if (!(await fs.pathExists(REMINDERS_FILE))) {
    await fs.writeJson(REMINDERS_FILE, []);
  }

  // Initialize Resend
  const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

  app.use(express.json());

  // API routes
  const adminEmail = process.env.NOTIFICATION_EMAIL || "suchita135sancheti@gmail.com";

  // Helper to schedule reminders
  const scheduleReminder = async (userData: any, daysFromNow: number, type: string) => {
    const reminders = await fs.readJson(REMINDERS_FILE);
    const scheduledDate = new Date();
    scheduledDate.setDate(scheduledDate.getDate() + daysFromNow);
    
    reminders.push({
      id: Math.random().toString(36).substr(2, 9),
      email: userData.email,
      name: userData.name,
      organization: userData.organization,
      type,
      scheduledFor: scheduledDate.toISOString(),
      sent: false
    });
    
    await fs.writeJson(REMINDERS_FILE, reminders);
  };

  // Background Scheduler Pulse
  const runSchedulerPulse = async () => {
    if (!resend) return;

    try {
      const reminders = await fs.readJson(REMINDERS_FILE);
      const now = new Date();
      let updated = false;

      for (const reminder of reminders) {
        if (!reminder.sent && new Date(reminder.scheduledFor) <= now) {
          console.log(`[Sovereign Scheduler] Dispatching ${reminder.type} to ${reminder.email}`);
          
          let subject = "";
          let html = "";

          if (reminder.type === "FOLLOW_UP_1") {
            subject = "Yield Calibration | Phase 02 Synthesis Update";
            html = `
              <div style="font-family: 'Georgia', serif; padding: 40px; color: #111; max-width: 600px; margin: auto; border: 1px solid #e5e5e5; line-height: 1.6;">
                <p style="font-size: 16px; margin-bottom: 25px;">${reminder.name},</p>
                <p style="margin-bottom: 20px;">As we approach the <strong>April 15th</strong> milestone, we are reviewing the structural profiles of our incoming cohort.</p>
                <p style="margin-bottom: 20px;">Strategic continuity requires a clear understanding of your current leverage points. If you have not yet finalized your <strong>Yield Calibration</strong> (Phase 01), we recommend doing so before the intake cycle concludes. This allows us to move directly into <strong>Phase 02: Strategic Domain Mapping</strong>.</p>
                <p style="margin-bottom: 30px;">Your progress is being monitored. No further action is required at this stage.</p>
                <div style="margin-top: 50px; border-top: 1px solid #eee; padding-top: 20px;">
                  <p style="font-size: 12px; margin: 0; font-weight: bold;">The Unbounded Concierge</p>
                  <p style="font-size: 11px; color: #999; margin: 5px 0 0 0; text-transform: uppercase; letter-spacing: 1px;">Office of the Sovereign Ledger</p>
                </div>
              </div>
            `;
          } else if (reminder.type === "FOLLOW_UP_2") {
            subject = "Final Calibration | Pre-Intake Checklist";
            html = `
              <div style="font-family: 'Georgia', serif; padding: 40px; color: #111; max-width: 600px; margin: auto; border: 1px solid #e5e5e5; line-height: 1.6;">
                <p style="font-size: 16px; margin-bottom: 25px;">${reminder.name},</p>
                <p style="margin-bottom: 20px;">The <strong>April 15th</strong> deadline is now imminent. This is your final briefing before the Sovereign Ledger transitions into the active phase.</p>
                <p style="margin-bottom: 20px;">Ensure your organization is prepared for the 4-phase architectural shift: Diagnostic, Synthesis, Calibration, and Integration. Your priority calendar link will be dispatched shortly after the deadline.</p>
                <p style="margin-bottom: 30px;">The future awaits.</p>
                <div style="margin-top: 50px; border-top: 1px solid #eee; padding-top: 20px;">
                  <p style="font-size: 12px; margin: 0; font-weight: bold;">The Unbounded Concierge</p>
                  <p style="font-size: 11px; color: #999; margin: 5px 0 0 0; text-transform: uppercase; letter-spacing: 1px;">Office of the Sovereign Ledger</p>
                </div>
              </div>
            `;
          }

          if (subject && html) {
            // 1. Send to User
            await resend.emails.send({
              from: "The Unbounded Concierge <notifications@resend.dev>",
              to: [reminder.email],
              subject,
              html
            });

            // 2. Notify Admin (The "Both Ends" Requirement)
            await resend.emails.send({
              from: "TULC Sovereign Scheduler <notifications@resend.dev>",
              to: [adminEmail],
              subject: `[Admin Alert] Follow-up Dispatched: ${reminder.name}`,
              html: `
                <div style="font-family: sans-serif; padding: 20px; color: #111; max-width: 600px; margin: auto; border: 1px solid #eee;">
                  <h2 style="color: #b8860b; text-transform: uppercase; letter-spacing: 2px; font-size: 14px;">Sovereign Scheduler Pulse</h2>
                  <p>A scheduled <strong>${reminder.type}</strong> transmission has been dispatched to:</p>
                  <div style="background: #f9f9f9; padding: 15px; margin: 15px 0;">
                    <p><strong>Name:</strong> ${reminder.name}</p>
                    <p><strong>Email:</strong> ${reminder.email}</p>
                    <p><strong>Organization:</strong> ${reminder.organization}</p>
                  </div>
                  <p style="font-size: 12px; color: #666;">This is an automated proprietary briefing. No manual action required.</p>
                </div>
              `
            });

            reminder.sent = true;
            updated = true;
          }
        }
      }

      if (updated) {
        await fs.writeJson(REMINDERS_FILE, reminders);
      }
    } catch (error) {
      console.error("[Sovereign Scheduler] Error:", error);
    }
  };

  // Run scheduler every 5 minutes (adjust as needed)
  setInterval(runSchedulerPulse, 5 * 60 * 1000);

  app.post("/api/waitlist", async (req, res) => {
    const { name, email, organization, role, message } = req.body;

    try {
      if (resend) {
        // 1. Internal Notification to Admin
        await resend.emails.send({
          from: "TULC Sovereign Ledger <notifications@resend.dev>",
          to: [adminEmail],
          subject: `New Sovereign Ledger Entry: ${name}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #111; max-width: 600px; margin: auto; border: 1px solid #eee;">
              <h2 style="color: #b8860b; text-transform: uppercase; letter-spacing: 2px; font-size: 18px;">New Sovereign Ledger Entry</h2>
              <div style="background: #f9f9f9; padding: 20px; margin: 20px 0; border-left: 4px solid #b8860b;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Organization:</strong> ${organization}</p>
                <p><strong>Role:</strong> ${role || "Not Specified"}</p>
              </div>
              <p style="text-transform: uppercase; font-size: 10px; font-weight: bold; color: #999; letter-spacing: 1px;">Institutional Yield Target</p>
              <p style="font-style: italic; color: #444; line-height: 1.6;">"${message}"</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
              <p style="font-size: 10px; color: #aaa; text-align: center; text-transform: uppercase; letter-spacing: 1px;">Zero Data Retention Protocol Active</p>
            </div>
          `,
        });

        // 2. Executive Confirmation to User
        await resend.emails.send({
          from: "The Unbounded Concierge <notifications@resend.dev>",
          to: [email],
          subject: `Mandate Confirmed | Structural Alignment for ${organization || "Your Organization"}`,
          html: `
            <div style="font-family: 'Georgia', serif; padding: 40px; color: #111; max-width: 600px; margin: auto; border: 1px solid #e5e5e5; line-height: 1.6;">
              <div style="text-align: center; margin-bottom: 40px;">
                <h2 style="font-weight: normal; letter-spacing: 4px; text-transform: uppercase; font-size: 14px; color: #b8860b;">Unbounded Leadership Co.</h2>
                <div style="height: 1px; width: 40px; background: #b8860b; margin: 20px auto;"></div>
              </div>
              
              <p style="font-size: 16px; margin-bottom: 25px;">${name},</p>
              
              <p style="margin-bottom: 20px;">Your accession to the <strong>Sovereign Ledger</strong> is confirmed.</p>
              
              <p style="margin-bottom: 20px;">At this level of leadership, the distinction between "management" and "sovereignty" is absolute. By engaging with <em>Unbounded Leadership Co.</em>, you have signaled an alignment with our core thesis: that structural integrity is the only true precursor to unbounded influence. We recognize the weight of your mandate and are prepared to steward it accordingly.</p>
              
              <div style="margin: 40px 0; padding: 20px; border-top: 1px solid #eee; border-bottom: 1px solid #eee;">
                <p style="text-transform: uppercase; font-size: 11px; letter-spacing: 2px; color: #b8860b; margin-bottom: 15px;">The Strategic Timeline</p>
                <p style="font-size: 14px; margin-bottom: 0;">Our current institutional intake cycle concludes on <strong>April 15th</strong>. Following this, we move through the 4-Phase Protocol: Diagnostic Calibration, Strategic Synthesis, Architectural Intervention, and Sovereign Integration.</p>
              </div>
              
              <p style="text-transform: uppercase; font-size: 11px; letter-spacing: 2px; color: #b8860b; margin-bottom: 15px;">Protocol for Accession</p>
              <ol style="font-size: 14px; padding-left: 20px; margin-bottom: 30px;">
                <li style="margin-bottom: 15px;"><strong>The Strategic Briefing:</strong> As an immediate resource, we have attached your copy of the <em>2026 Strategic Briefing: The Physics of Inevitability</em>. This document outlines the structural shifts required for the upcoming cycle. <br/><a href="#" style="color: #b8860b; font-weight: bold; text-decoration: underline; margin-top: 5px; display: inline-block;">Download Briefing (PDF)</a></li>
                <li style="margin-bottom: 15px;"><strong>The Yield Calibration:</strong> Following the April 15th milestone, you will receive a priority invitation to initiate Phase 01. This is a peer-level alignment to map your primary leverage points and isolate the Two Primary Domains for calibration.</li>
                <li><strong>Data Sovereignty:</strong> Your strategic profile is currently protected under our <strong>Zero Data Retention (ZDR)</strong> protocol. In an era of surveillance, we prioritize your invisibility as much as your impact.</li>
              </ol>
              
              <p style="margin-bottom: 30px;">We do not take your partnership lightly. We are here to ensure that your leadership is not just effective, but absolute.</p>
              
              <p style="margin-bottom: 5px;">Expect our next transmission upon the conclusion of the intake cycle.</p>
              
              <div style="margin-top: 50px; border-top: 1px solid #eee; padding-top: 20px;">
                <p style="font-size: 12px; margin: 0; font-weight: bold;">The Unbounded Concierge</p>
                <p style="font-size: 11px; color: #999; margin: 5px 0 0 0; text-transform: uppercase; letter-spacing: 1px;">Office of the Sovereign Ledger</p>
              </div>
            </div>
          `,
        });

        // 3. Schedule Future Reminders (Proprietary Automation)
        await scheduleReminder({ name, email, organization, role }, 3, "FOLLOW_UP_1");
        await scheduleReminder({ name, email, organization, role }, 7, "FOLLOW_UP_2");
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Resend Error:", error);
      res.status(500).json({ error: "Failed to send notification" });
    }
  });

  app.post("/api/assessment", async (req, res) => {
    const { email, score, analysis, constraint, leverage } = req.body;

    try {
      if (resend) {
        await resend.emails.send({
          from: "TULC Yield Calibration <notifications@resend.dev>",
          to: [adminEmail],
          subject: `New Yield Calibration: ${email}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; color: #111; max-width: 600px; margin: auto; border: 1px solid #eee;">
              <h2 style="color: #b8860b; text-transform: uppercase; letter-spacing: 2px; font-size: 18px;">Yield Calibration</h2>
              <div style="background: #111; color: white; padding: 30px; margin: 20px 0; text-align: center;">
                <p style="text-transform: uppercase; font-size: 10px; color: #b8860b; margin-bottom: 10px; letter-spacing: 2px;">Sovereign Grade</p>
                <h1 style="font-size: 60px; margin: 0; color: #b8860b;">${score}</h1>
                <p style="font-size: 14px; font-style: italic; color: #ccc; margin-top: 20px;">"${analysis}"</p>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                <div style="flex: 1;">
                  <p style="text-transform: uppercase; font-size: 10px; font-weight: bold; color: #999; letter-spacing: 1px;">Primary Constraint</p>
                  <p style="font-weight: bold; color: #111;">${constraint}</p>
                </div>
                <div style="flex: 1; text-align: right;">
                  <p style="text-transform: uppercase; font-size: 10px; font-weight: bold; color: #999; letter-spacing: 1px;">Primary Leverage</p>
                  <p style="font-weight: bold; color: #111;">${leverage}</p>
                </div>
              </div>
              <p><strong>Participant Email:</strong> ${email}</p>
              <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
              <p style="font-size: 10px; color: #aaa; text-align: center; text-transform: uppercase; letter-spacing: 1px;">Zero Data Retention Protocol Active</p>
            </div>
          `,
        });
      }
      res.json({ success: true });
    } catch (error) {
      console.error("Resend Error:", error);
      res.status(500).json({ error: "Failed to send notification" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve static files from dist
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile("dist/index.html", { root: "." });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
