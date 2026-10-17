import { GoogleGenAI } from "@google/genai";
import { config } from '../config.ts';

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI | null {
  if (!aiClient && config.geminiApiKey) {
    aiClient = new GoogleGenAI({ apiKey: config.geminiApiKey });
  }
  return aiClient;
}

const DEFAULT_MODEL = 'gemini-3.8-flash';

const CONCIERGE_SYSTEM_INSTRUCTION = `You are the elite AI Concierge for "The Unbounded Leadership Co." (TULC), a premier Swiss-style institutional alignment and leadership architecture consultancy. You represent the digital advisory desk of Founder & Enterprise Architect Suchita Sancheti and Client Coordinator Kamini Agnihotri.

CORE OPERATIONAL MANDATE:
- SCAN & ANSWER DIRECTLY: You must scan the firm's website knowledge base and answer every question asked directly, accurately, and authoritatively.
- NEVER ASK USERS TO FILL FORMS: Do NOT instruct leaders to fill out a form or docket. Give them direct, comprehensive, substantive answers immediately. If they wish to contact Suchita Sancheti directly, provide her direct email address: suchita@theunboundedleadership.com.
- EXECUTIVE TONE: Dignified, sharp, calm, intellectually formidable, and precise. No corporate fluff, no emojis, no infomercial buzzwords.
- FORMATTING: Write in clear, structured prose with natural line breaks. Use clean bullet points (•) when helpful. Do not use markdown headers (###) or bold asterisks.

COMPLETE INSTITUTIONAL CORPUS:
1. FIRM IDENTITY & PURPOSE:
   - We re-engineer leadership operating systems for CXOs, enterprise founders, and boards ($10M to $100M+ revenue).
   - We eliminate Architectural Decision Latency—the invisible operational drag that causes directives to lose 40%+ fidelity between boardroom intent and frontline delivery.
   - We replace founder bottlenecks with self-executing operational guardrails so the business compounds autonomously.

2. FOUNDERS:
   - Suchita Sancheti (Founder & Enterprise Architect): Computer Science Engineer and Industrial Psychologist who merges enterprise systems engineering (former SAP consultant) with human behavioral dynamics. She specializes in hard-coding founder intuition into autonomous operating substrates and accepts strictly 3 active institutional calibrations per quarter.
   - Forensic handwriting analysis is Suchita's personal diagnostic clinical strength, conducted exclusively in bespoke 1-on-1 private executive sessions, separate from digital software tools.
   - Kamini Agnihotri (Client Relations Coordinator): Coordinates bilateral non-disclosure agreements, executive intake dockets, and confidential scheduling.

3. ADVISORY MANDATES & SERVICES:
   - The Founder Sovereignty Mandate (90-Day Implementation Sprint): Eliminates founder decision bottlenecks, establishes decentralized signing thresholds (e.g. up to $50,000 without CEO sign-off), and passes the Two-Week Step-Away Test.
   - The Executive Succession & Transition Mandate (6-Month Structured Handover): Codifies founder heuristics into governance law so incoming CEOs execute with identical strategic rigor while defending enterprise valuation.
   - Portfolio Enterprise Governance (Annual Institutional Partnership): Objective governance for PE operating partners, VC boards, and holding chairs to eliminate key-person risk and install early-warning telemetry.
   - Turnkey Digital Workspaces: Complete pre-built operating workspaces, decision matrices, and delegation runbooks available at /products.

4. THE TWO-WEEK STEP-AWAY TEST:
   - The adversarial benchmark for institutional durability: if an enterprise cannot run for 14 continuous days without the founder's manual intervention, the founder owns an exhausting job rather than a scalable asset.

5. METHODOLOGY & 5 DOMAINS:
   - 4-Phase Alignment Protocol: Phase 0.0 (10-Node Institutional Triangulation Audit delivering Cognitive Bandwidth Blueprint), Phase 01 (Relational Substrate Calibration), Phase 02 (Logic Gate Engineering), Phase 03 (Systemic Calibration), Phase 04 (Resonance Safeguard).
   - 5 Strategic Domains: Cognitive Clarity, Systemic Integrity, Strategic Velocity, Moral Gravity, Cultural Fidelity.

6. RESEARCH LIBRARY (19 EXECUTIVE DISPATCHES):
   - Topics include: Architecture of Authority (/library/architecture-of-authority), Strategic Substrates (/library/strategic-substrates), The Delegation Fallacy (/library/the-delegation-fallacy), Succession Architecture (/library/founders-dilemma), Cognitive Tax of Leadership (/library/cognitive-tax-of-leadership), Bridging the Strategy-Execution Gap (/library/bridging-strategy-execution-gap), Transitioning from Founder to Chairman (/library/transitioning-founder-to-chairman), CEO Burnout as a Systems Failure (/library/ceo-burnout-systems-failure).

7. PROCUREMENT, NDAs & INVOICING:
   - Bilateral NDAs executed under strict Fiduciary Non-Disclosure.
   - International Procurement: Supported via corporate SWIFT/Wire transfer invoices in USD, EUR, GBP, SGD.
   - Indian Entities: Fully GST-compliant invoices, NEFT/RTGS bank clearance, or Razorpay checkout.`;

export const aiService = {
  /**
   * Generates general strategic analysis for queries or prompts
   */
  async generateAnalysis(contents: any, modelName?: string, customConfig?: any): Promise<string> {
    const ai = getAiClient();
    const query = typeof contents === 'string' ? contents : JSON.stringify(contents);

    const getFallback = (q: string): string => {
      let analysis = `Analysis of Strategic Vector: "${q}"\n\n`;
      if (q.toLowerCase().includes('scaling') || q.toLowerCase().includes('growth')) {
        analysis += `Our preliminary alignment audits indicate that scaling thresholds beyond 8-figure bounds trigger a predictable compounding of coordination friction, typically manifesting as a 40% loss in executive bandwidth. To secure systemic continuity, the organization must transition from hero-based manual supervision to algorithmic logic-gates. This secures alignment across deep vertical matrices without requiring continuous physical intervention from the founder.`;
      } else if (q.toLowerCase().includes('tax') || q.toLowerCase().includes('friction') || q.toLowerCase().includes('time')) {
        analysis += `The 'Cognitive Tax' of modern enterprise leadership is an invisible operating drag. When executive focus is permanently fragmented across low-leverage coordination tasks, decision velocity drops by an estimated 3x. Our diagnostic models suggest that establishing high-fidelity operational safeguards and clear delegation boundaries allows principals to reclaim pure strategic sovereignty, converting managing loops back into high-yield revenue generation.`;
      } else {
        analysis += `The strategic vector identified presents significant structural opportunities. Achieving operational resonance within this domain requires a systematic audit of the decision-making substrate. We recommend establishing hard-coded execution guardrails and automating alignment checks. This structural intervention eliminates coordination lag, allowing your senior staff to operate with complete, decentralized cohesion while preserving the principal's focus for high-leverage architectural command.`;
      }
      return analysis;
    };

    if (!ai) {
      return getFallback(query);
    }

    try {
      const response = await ai.models.generateContent({
        model: modelName || DEFAULT_MODEL,
        contents,
        config: customConfig
      });
      return response.text || getFallback(query);
    } catch (err: any) {
      console.warn('[AI_FALLBACK] AI generation routed to offline substrate:', err.message);
      return getFallback(query);
    }
  },

  /**
   * Generates conversational concierge response
   */
  async chatConcierge(message: string, history?: Array<{ role: string; content?: string; text?: string }>): Promise<string> {
    const ai = getAiClient();

    const getFallback = (query: string): string => {
      const text = query ? query.toLowerCase() : '';
      if (text.includes('hello') || text.includes('hi') || text.includes('hey') || text.includes('greetings')) {
        return `Greetings and welcome to The Unbounded Leadership Co. I am your AI Concierge.\nHow may I assist you with our institutional alignment protocols or strategic objectives today?`;
      } else if (text.includes('price') || text.includes('cost') || text.includes('fee') || text.includes('rate') || text.includes('investment')) {
        return `Our engagement models are bespoke, calibrated directly to your institution's scale and operational complexity.\nEngagements commence with our Phase 0.0 10-Node Institutional Triangulation Audit—a high-fidelity diagnostic across Apex, CXOs, Legal, Veterans, and Edge Operators delivering a complete Cognitive Bandwidth Blueprint in under 48 hours.\nTo discuss tailored investment structures, please connect directly with the Office of Suchita Sancheti at suchita@theunboundedleadership.com.`;
      } else if (text.includes('handwriting') || text.includes('graphology') || text.includes('script')) {
        return `Forensic handwriting analysis is not an automated in-app feature; it is a core clinical strength of Founder Suchita Sancheti offered exclusively as a private, bespoke 1-on-1 executive consultation.\nLeaders wishing to include 1-on-1 handwriting and behavioral profiling in their executive engagement can request it directly during their intake briefing.`;
      } else if (text.includes('suchita') || text.includes('sancheti') || text.includes('who are you') || text.includes('about') || text.includes('founder')) {
        return `Suchita Sancheti is the Founder of The Unbounded Leadership Co.—a Computer Science Engineer and Industrial Psychologist who synthesizes technical system architecture with human behavioral dynamics.\nDrawing from her expertise as an SAP consultant and certified handwriting analyst (conducted in bespoke 1-on-1 sessions, separate from automated app tools), she hard-codes organizational alignment and accepts strictly 3 elite client calibrations per quarter.\nWould you like to explore our 4-phase methodology or initiate a diagnostic brief?`;
      } else if (text.includes('process') || text.includes('how it works') || text.includes('workflow') || text.includes('methodology')) {
        return `Our engagements follow a rigorous 4-step framework beginning with Phase 0.0: 10-Node Institutional Triangulation Audit (a rapid 48-hr cross-sectional diagnostic across Apex and frontline edge), followed by Logic Gate Engineering to hard-code founder intent directly into your enterprise operating system.\nThis eliminates coordination bloat and returns up to 40% of strategic bandwidth within 90 days.`;
      } else if (text.includes('contact') || text.includes('email') || text.includes('reach out')) {
        return `You may reach Suchita Sancheti and the executive advisory desk directly at suchita@theunboundedleadership.com.\nOur office coordinates all administrative briefings, client calibrations, and direct consultations with Suchita Sancheti.`;
      } else if (text.includes('assessment') || text.includes('audit') || text.includes('diagnostic') || text.includes('tax')) {
        return `Our Diagnostic Friction Assessment is a high-fidelity tool that quantifies operational friction and calculates your organization's annual Inaction Tax.\nIt requires less than 4 minutes to complete online at /assessment.\nWould you like guidance on evaluating your operational friction?`;
      } else {
        return `I am here to address your inquiries, outline our core strategic objectives, or guide you through our alignment methodology.\nHow may I assist your leadership team today?`;
      }
    };

    if (!ai) {
      return getFallback(message);
    }

    const formattedContents: any[] = [];
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
        model: DEFAULT_MODEL,
        contents: formattedContents,
        config: {
          systemInstruction: CONCIERGE_SYSTEM_INSTRUCTION,
          temperature: 0.5,
        }
      });
      return response.text || getFallback(message);
    } catch (err: any) {
      console.warn('[CHAT_FALLBACK] Concierge response routed to offline substrate:', err.message);
      return getFallback(message);
    }
  },

  /**
   * Generates personalized executive outreach draft
   */
  async generateOutreach(payload: any): Promise<{ brief: string; subject: string; body: string }> {
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
    } = payload;

    const getFallback = () => {
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
      } else {
        intro = `Dear ${name},\n\nLet us speak frankly about the operational state of ${company}. As ${title}, your chief rate-limiter is not market demand, but the cognitive overhead required to keep your team aligned.`;
        point1 = `If your senior staff requires your active presence to maintain execution standards, you have built a high-performing job, not an autonomous system. The persistent need for manual intervention is a structural leak that drains your personal time and limits your decision velocity.`;
        point2 = `The Unbounded Leadership methodology was created to solve this specific bottleneck. We re-engineer your operational workflow so that alignment is self-cohering and accountability is hard-coded.`;
        cta = `I recommend starting with our 4-minute Alignment Assessment to quantify your exact cognitive tax. Let me know if you would like me to set up a priority diagnostic line.`;
      }

      const body = `${intro}\n\n${point1}\n\n${point2}\n\n${cta}\n\nWith respect,\n\nSuchita Sancheti\nFounder & Principal Architect\nThe Unbounded Leadership Co.\nsuchita@theunboundedleadership.com\n\n(Draft synthesized via TULC Outbound Copilot protocol)`;
      return { brief, subject, body };
    };

    const ai = getAiClient();
    if (!ai) {
      return getFallback();
    }

    const prompt = `You are a world-class institutional growth advisor and lead strategist for "The Unbounded Leadership Co.", a high-end Swiss-style leadership architecture consultancy run by Founder & Principal Architect Suchita Sancheti (suchita@theunboundedleadership.com).
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
1. If LinkedIn URL, Website URL or Raw Copied bio is provided, prioritize aligning your pitch to these specific company and personal facts.
2. If Google Search Grounding is active, search for recent news, funding, key products, or personal perspectives regarding ${targetName} at ${targetCompany}. Use these exact insights to anchor your email.
3. ${embedResearch ? `CRITICAL PERSONALIZATION MANDATE: You MUST explicitly weave and embed specific, real-world verified facts about ${targetName} or ${targetCompany} directly into the paragraphs of the email body. The draft must show meticulous homework, proving Suchita Sancheti (suchita@theunboundedleadership.com) did authentic research.` : 'Anchor your hook into general institutional context.'}
4. Address them as an equal or peer analyst. Position our 4-minute "Institutional Diagnostic" as the ultimate diagnostic protocol.

Return EXACTLY a JSON object matching this schema (with no enclosing markdown wrapper block):
{
  "brief": "A 1-sentence strategic analysis explaining why this specific executive at this company faces the targeted bottleneck.",
  "subject": "A compelling, high-stakes subject line designed to achieve high open rates with global elite principals.",
  "body": "The complete, highly personalized outbound email body with clean paragraph breaks, starting with a respectful greeting and ending with a signature from Suchita Sancheti (suchita@theunboundedleadership.com), Founder & Principal Architect of The Unbounded Leadership Co."
}`;

    const configObj: any = {
      responseMimeType: "application/json"
    };

    if (enableSearchGrounding) {
      configObj.tools = [{ googleSearch: {} }];
    }

    try {
      const response = await ai.models.generateContent({
        model: DEFAULT_MODEL,
        contents: prompt,
        config: configObj
      });

      const responseText = response.text || '{}';
      return JSON.parse(responseText.trim());
    } catch (err: any) {
      console.warn('[OUTREACH_FALLBACK] Outreach generation fallback triggered:', err.message);
      return getFallback();
    }
  }
};
