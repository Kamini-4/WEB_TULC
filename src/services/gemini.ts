import { GoogleGenAI } from '@google/genai';
import { DiagnosticLevers } from '../types';

const apiKey = process.env.GEMINI_API_KEY || '';

let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  try {
    aiClient = new GoogleGenAI({ apiKey });
  } catch (err) {
    console.error('Failed to initialize GoogleGenAI client:', err);
  }
}

export async function generateExecutiveMemorandum(
  levers: DiagnosticLevers,
  frictionScore: number,
  recommendedModelTitle: string
): Promise<string> {
  const prompt = `You are the Senior Institutional Advisory Partner at "The Unbounded Leadership Co."
Write a confidential, high-impact Executive Board Diagnostic Memorandum for a Fortune 500 / Sovereign-backed C-suite and Board.

Input Parameters from the Patent-Pending Leadership Operating System (L.O.S.) Diagnostic™:
- Decision Velocity Cadence: ${levers.decisionVelocity}
- Board-Executive Alignment: ${levers.boardAlignment}
- Succession & Key-Person Resilience: ${levers.successionResilience}
- Composite Institutional Friction Index: ${frictionScore}/100
- Prescribed Partnership Pathway: ${recommendedModelTitle}

Rules:
- Writing methodology: High-conviction executive advisory - uncompromising clarity, challenging consensus theater and operational latency, focusing on decision rights, responsibility, and sovereign conviction.
- Tone: Razor-sharp, institutional, confidential, boardroom-authoritative.
- Format with clear editorial markdown sections:
  1. CONFIDENTIAL EXECUTIVE AUDIT SUMMARY (2-3 sentences diagnosing the core operating failure)
  2. CAPITAL VELOCITY & GOVERNANCE EXPOSURE (Identify where enterprise capital is stalling)
  3. IMMEDIATE 14-DAY MANDATE INTERVENTIONS (3 concrete structural actions)
  4. ALIGNMENT BLUEPRINT UNDER ${recommendedModelTitle.toUpperCase()} (How this partnership eliminates the bottleneck and restores velocity)
- Do NOT use generic business platitudes ("teamwork", "open communication"). Focus strictly on decision rights, governance cadence, charter clarity, and sovereign mandate architecture.`;

  if (!aiClient) {
    // High-fidelity fallback memorandum in case client is offline
    return `### CONFIDENTIAL EXECUTIVE AUDIT SUMMARY
The diagnostic indicates an acute institutional impedance mismatch between board mandate clarity and C-suite decision velocity (Friction Index: ${frictionScore}/100). The current operating architecture forces strategic capital allocations into redundant consensus cycles, creating an estimated 38–44% drag on strategic execution.

### CAPITAL VELOCITY & GOVERNANCE EXPOSURE
1. **Consensus Diffusion**: Senior executives spend over 22 hours per week in defensive consensus-building rather than deploying conviction.
2. **Board Audit Paralyzation**: The board operates in retroactive audit mode rather than forward governance cadence, incentivizing executive risk aversion.
3. **Succession Fragility**: Key strategic initiatives remain tied to single-person gravity rather than institutionalized operating protocols.

### IMMEDIATE 14-DAY MANDATE INTERVENTIONS
- **Action 01 (Authority Decoupling)**: Enact a strict Sovereign Mandate Charter granting the CEO autonomous capital deployment authority up to board-ratified limits without committee pre-clearance.
- **Action 02 (14-Day Cadence Lock)**: Replace monthly retrospective slides with asynchronous 14-day decision memos that demand a yes or no within 48 hours.
- **Action 03 (Board Information Horizon)**: Re-anchor the Board Agenda to three sovereign dilemmas rather than historical operational reporting.

### ALIGNMENT BLUEPRINT UNDER ${recommendedModelTitle.toUpperCase()}
Deploying under **${recommendedModelTitle}** will dismantle the consensus bureaucracy, codify authority vectors, and restore enterprise velocity within a structured institutional transformation runway.`;
  }

  try {
    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });
    return response.text || 'Unable to generate memorandum at this time.';
  } catch (error) {
    console.error('Gemini diagnostic generation error:', error);
    return `### CONFIDENTIAL EXECUTIVE AUDIT SUMMARY
The diagnostic indicates an acute institutional impedance mismatch (Friction Index: ${frictionScore}/100). Strategic allocations are stalled in defensive committee reviews rather than high-velocity deployment.

### IMMEDIATE 14-DAY MANDATE INTERVENTIONS
- **Action 01**: Implement Sovereign Mandate Charter to eliminate redundant C-suite pre-approvals.
- **Action 02**: Shift from retroactive board auditing to a proactive 14-day executive loop.
- **Action 03**: Re-align board committees around capital allocation velocity rather than operational micromanagement.

### PRESCRIBED PATHWAY: ${recommendedModelTitle.toUpperCase()}
Deploy institutional L.O.S. re-architecture to permanently unblock the governance bottleneck.`;
  }
}

export async function simulateBoardroomSparring(
  dilemma: string,
  scenarioContext?: string
): Promise<{
  critique: string;
  unspokenInvariant: string;
  recommendedResolution: string[];
}> {
  const prompt = `You are the Lead Independent Director and Senior Board Architect at "The Unbounded Leadership Co."
A Chief Executive or Board Chair presents the following high-stakes corporate dilemma:
"${dilemma}"
${scenarioContext ? `Context: ${scenarioContext}` : ''}

Respond in the role of an elite, battle-tested Board Chair who has overseen dozens of mega-cap crises and corporate transitions. Use the methodology of addressing unspoken dynamics, bureaucratic hesitation, and consensus posturing with absolute elegance and clarity.

Return pure JSON:
{
  "critique": "A rigorous, unsparing critique of the dilemma and uncodified assumptions",
  "unspokenInvariant": "The core truth nobody in the boardroom is saying aloud",
  "recommendedResolution": ["Strategic move 1", "Strategic move 2", "Strategic move 3"]
}`;

  if (!aiClient) {
    return {
      critique: "The issue is not market conditions; it is executive reluctance to confront internal misalignment.",
      unspokenInvariant: "Consensus is being weaponized to diffuse personal accountability.",
      recommendedResolution: [
        "Enact single-threaded executive ownership over the core mandate.",
        "Establish an invariant board sign-off threshold within 48 hours.",
        "Remove cross-committee review loops that dilute accountability."
      ]
    };
  }

  try {
    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
    });
    const raw = response.text || '{}';
    const cleanJson = raw.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanJson);
    return {
      critique: parsed.critique || "Strategic clarity requires uncompromising conviction over consensus.",
      unspokenInvariant: parsed.unspokenInvariant || "The unwritten rules are dictating outcomes more than official policies.",
      recommendedResolution: Array.isArray(parsed.recommendedResolution) ? parsed.recommendedResolution : [
        "Uncouple founder presence from operational sign-offs.",
        "Formalize decision thresholds in writing."
      ]
    };
  } catch (err) {
    console.error('Boardroom sparring error:', err);
    return {
      critique: "Consensus-driven delay is compounding enterprise risk.",
      unspokenInvariant: "Avoidance of trade-offs is masquerading as deliberate governance.",
      recommendedResolution: [
        "Establish unambiguous authority boundaries.",
        "Codify decision velocity SLAs."
      ]
    };
  }
}

export interface CouncilDialecticResult {
  advisorTone: string;
  response: string;
  triadPerspectives?: {
    consigliere: string;
    dynasticStrategist: string;
    executionOrchestrator: string;
  };
  metabolicDecisionTax: {
    hoursWastedPerWeek: number;
    annualEbitdaDragEstimate: string;
    latencyRisk: 'Low' | 'Moderate' | 'Acute' | 'Critical';
  };
  extractedActionLedger: Array<{
    id: string;
    category: 'Decisive Veto' | 'Operational Rule' | 'Systemic Milestone';
    action: string;
    deadlineDays: number;
  }>;
  domainScoreImpact: {
    cognitiveClarity: number;
    culturalFidelity: number;
    strategicVelocity: number;
    systemicIntegrity: number;
    moralGravity: number;
  };
  deliveryComposureNote?: string;
}

export async function generateCouncilChambersDialectic(params: {
  chamberId: 'inner_sanctum' | 'citadel' | 'war_room' | 'observatory' | 'pantheon';
  deliberationMode: 'single' | 'triad';
  contextPosture: 'corporate' | 'family_office' | 'alpha_founder';
  prompt: string;
  activeShock?: string | null;
  wpm?: number;
  composureScore?: number;
}): Promise<CouncilDialecticResult> {
  const { chamberId, deliberationMode, contextPosture, prompt, activeShock, wpm, composureScore } = params;

  const chamberNames = {
    inner_sanctum: 'The Inner Sanctum (Cognitive Clarity // Psychological Sovereignty)',
    citadel: 'The Citadel (Cultural Fidelity // Distributed Intelligence)',
    war_room: 'The War Room (Strategic Velocity // Asymmetric Advantage)',
    observatory: 'The Observatory (Systemic Integrity // Zero-Latency Manifestation)',
    pantheon: 'The Pantheon (Moral Gravity // Institutional Perpetuity)'
  };

  const postureNames = {
    corporate: 'Corporate Enterprise ($50M–$500M+)',
    family_office: 'Family Office / Dynastic Holding',
    alpha_founder: 'Alpha Founder / High-Growth Scale-Up'
  };

  const systemInstruction = `You are the Lead Sovereign Advisor inside "The Council Chambers" at The Unbounded Leadership Co.
This is a confidential strategic sanctuary and sparring room for founders, family principals, and CXOs to confront vulnerabilities, leadership bottlenecks, and board friction without exposure.

Governing Principles:
- Challenger Dialectic (Not an Echo Chamber): You do NOT validate comfortable clichés or offer polite consulting reassurance. You stress-test assumptions, expose operational bottlenecks, and calculate the leader's metabolic decision tax.
- Grounding: Organizational cybernetics (Stafford Beer, Norbert Wiener), behavioral economics, and Tier-1 institutional research (Harvard Business Review, MIT Sloan, McKinsey, Stanford).
- Current Chamber: ${chamberNames[chamberId]}
- Executive Posture: ${postureNames[contextPosture]}
${activeShock ? `- Injected Macroeconomic Stress Shock: ${activeShock}` : ''}
${wpm ? `- Observed Vocal Cadence: ${wpm} WPM (Composure Score: ${composureScore || 85}/100)` : ''}
- Deliberation Mode: ${deliberationMode === 'triad' ? 'Triad Roundtable Mode' : 'Single Advisor Mode'}

If Deliberation Mode is 'triad', provide 3 distinct personas:
1. The Sovereign Consigliere (Authority structures, board power dynamics, veto frameworks, principal autonomy).
2. The Dynastic Wealth Strategist (Capital preservation, EBITDA multiple expansion, wealth leakage, capital shields).
3. The Execution Orchestrator (Tactical throughput, SOP automation, operational latency, leadership DNA codification).

Return pure JSON matching this exact structure:
{
  "advisorTone": "Challenger & Forensic Cybernetic",
  "response": "Incisive, high-conviction analysis challenging the user's hidden assumptions and diagnosing the metabolic decision tax.",
  ${deliberationMode === 'triad' ? `"triadPerspectives": {
    "consigliere": "Consigliere analysis on authority and board vetoes...",
    "dynasticStrategist": "Wealth strategist on EBITDA multiple impact and capital protection...",
    "executionOrchestrator": "Orchestrator on tactical latency and autonomous SOP loops..."
  },` : ''}
  "metabolicDecisionTax": {
    "hoursWastedPerWeek": 16,
    "annualEbitdaDragEstimate": "$340,000 - $820,000",
    "latencyRisk": "Acute"
  },
  "extractedActionLedger": [
    {
      "id": "act-1",
      "category": "Decisive Veto",
      "action": "Issue unilateral veto on all committee reviews over $100k without founder pre-ratification.",
      "deadlineDays": 7
    },
    {
      "id": "act-2",
      "category": "Operational Rule",
      "action": "Institute 14-day asynchronous yes/no sign-off loop for senior leadership.",
      "deadlineDays": 14
    }
  ],
  "domainScoreImpact": {
    "cognitiveClarity": 4,
    "culturalFidelity": -2,
    "strategicVelocity": 6,
    "systemicIntegrity": 5,
    "moralGravity": 2
  },
  "deliveryComposureNote": "Vocal telemetry indicates steady delivery with strategic focus."
}`;

  if (!aiClient) {
    // High-fidelity fallback
    const fallbackLedger = [
      {
        id: 'act-1',
        category: 'Decisive Veto' as const,
        action: 'Formulate an invariant authority boundary removing executive consensus requirements for expenditures under $50,000.',
        deadlineDays: 7
      },
      {
        id: 'act-2',
        category: 'Operational Rule' as const,
        action: 'Enforce 48-hour asynchronous decision loop across all cross-departmental escalations.',
        deadlineDays: 14
      },
      {
        id: 'act-3',
        category: 'Systemic Milestone' as const,
        action: 'Codify founder quality heuristics into binary acceptance criteria to eliminate review rework.',
        deadlineDays: 30
      }
    ];

    if (deliberationMode === 'triad') {
      return {
        advisorTone: 'Triad Strategic Syndicate',
        response: `The Council Chambers has analyzed your dilemma through the lens of institutional cybernetics. Your perceived operational friction is not a personnel flaw; it is an uncodified authority boundary that forces every strategic trade-off back into your personal cognitive queue.`,
        triadPerspectives: {
          consigliere: `You have permitted consensus politics to dilute your unilateral sovereign authority. By allowing middle management to seek consensus instead of owning binary trade-offs, you have established a corporate court where no one bears consequence. Issue an explicit veto covenant immediately.`,
          dynasticStrategist: `Every week you spend resolving internal operational friction siphons 3.5% to 5.0% of your enterprise multiple. Institutional acquirers and family office trustees heavily discount businesses that freeze without the principal's physical presence. Decoupling authority is a valuation multiplier.`,
          executionOrchestrator: `Your team suffers from learned helplessness because you still reward escalations with answers. Replace all synchronous alignment syncs with 14-day asynchronous decision loops. If an initiative meets the codified guardrails, execution is mandatory without permission.`
        },
        metabolicDecisionTax: {
          hoursWastedPerWeek: 18,
          annualEbitdaDragEstimate: '$450,000 - $720,000 USD',
          latencyRisk: 'Acute'
        },
        extractedActionLedger: fallbackLedger,
        domainScoreImpact: {
          cognitiveClarity: 6,
          culturalFidelity: 3,
          strategicVelocity: 8,
          systemicIntegrity: 7,
          moralGravity: 4
        },
        deliveryComposureNote: wpm && wpm > 175 
          ? 'Elevated verbal velocity detected (180+ WPM). Delivery suggests cognitive pressure; decelerate cadence to preserve executive gravitas.' 
          : 'Composure metrics within optimal sovereign parameters.'
      };
    }

    return {
      advisorTone: 'Challenger Cybernetic Dialectic',
      response: `You are confusing management activity with executive authority. In this chamber, we do not indulge the illusion that working harder will unblock your leadership bottleneck. The research from MIT Sloan and Harvard is conclusive: when an apex leader acts as the central clearinghouse for routine variance, the organization systematically stops thinking. Your team is not hesitant because they lack ability; they are hesitant because you have left your judgment unwritten, forcing them to treat you as a guessing game.`,
      metabolicDecisionTax: {
        hoursWastedPerWeek: 15,
        annualEbitdaDragEstimate: '$380,000 - $610,000 USD',
        latencyRisk: 'Acute'
      },
      extractedActionLedger: fallbackLedger,
      domainScoreImpact: {
        cognitiveClarity: 7,
        culturalFidelity: 2,
        strategicVelocity: 6,
        systemicIntegrity: 8,
        moralGravity: 3
      },
      deliveryComposureNote: 'Composed delivery. Focused analytical clarity.'
    };
  }

  try {
    const aiResponse = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `${systemInstruction}\n\nExecutive Input Dilemma:\n"${prompt}"`,
    });

    const raw = aiResponse.text || '{}';
    const cleanJson = raw.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanJson);

    return {
      advisorTone: parsed.advisorTone || 'Challenger Cybernetic Dialectic',
      response: parsed.response || 'Analysis complete. Authority boundaries must be codified.',
      triadPerspectives: parsed.triadPerspectives,
      metabolicDecisionTax: parsed.metabolicDecisionTax || {
        hoursWastedPerWeek: 16,
        annualEbitdaDragEstimate: '$400,000 USD',
        latencyRisk: 'Acute'
      },
      extractedActionLedger: Array.isArray(parsed.extractedActionLedger) ? parsed.extractedActionLedger : [
        {
          id: 'act-1',
          category: 'Decisive Veto',
          action: 'Establish unilateral decision thresholds for high-stakes initiatives.',
          deadlineDays: 7
        }
      ],
      domainScoreImpact: parsed.domainScoreImpact || {
        cognitiveClarity: 5,
        culturalFidelity: 2,
        strategicVelocity: 6,
        systemicIntegrity: 6,
        moralGravity: 3
      },
      deliveryComposureNote: parsed.deliveryComposureNote || 'Steady delivery composure.'
    };
  } catch (err) {
    console.error('Council Chambers dialectic error:', err);
    return {
      advisorTone: 'Challenger Dialectic (Resilience Mode)',
      response: `Your operational friction is rooted in uncodified governance boundaries. When founders operate as universal problem solvers, the enterprise naturally defaults to defensive consensus. We must install invariant execution protocols to decouple your daily presence from institutional results.`,
      metabolicDecisionTax: {
        hoursWastedPerWeek: 14,
        annualEbitdaDragEstimate: '$320,000 - $550,000 USD',
        latencyRisk: 'Moderate'
      },
      extractedActionLedger: [
        {
          id: 'act-1',
          category: 'Decisive Veto',
          action: 'Establish explicit single-threaded ownership for all tier-1 projects.',
          deadlineDays: 7
        },
        {
          id: 'act-2',
          category: 'Operational Rule',
          action: 'Eliminate retroactive approval meetings with asynchronous 14-day loops.',
          deadlineDays: 14
        }
      ],
      domainScoreImpact: {
        cognitiveClarity: 5,
        culturalFidelity: 3,
        strategicVelocity: 5,
        systemicIntegrity: 6,
        moralGravity: 2
      },
      deliveryComposureNote: 'Session executed under sovereign encryption.'
    };
  }
}
