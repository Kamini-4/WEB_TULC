import React, { useState, useEffect } from 'react';
import { db } from '../src/firebase';
import { SovereignDB } from '../lib/database.ts';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Shield, Zap, Layers, ArrowRight, Lock, Download, ChevronRight, AlertCircle, ExternalLink, AlertTriangle, TrendingDown, Check, Copy } from 'lucide-react';

type ContextType = 'dynamic' | 'established' | 'generational';
type Step = 'intro' | 'auth' | 'context' | 'questions' | 'calculating' | 'dossier';

interface Option {
  label: string;
  scores: Record<string, number>;
  description: string;
}

interface Question {
  text: {
    dynamic: string;
    established: string;
    generational: string;
  };
  options: Option[];
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const QUESTIONS: Question[] = [
  {
    text: {
      dynamic: "When executing a high-stakes strategic pivot, how does your core intent translate into execution without creating immediate operational bottlenecks or leadership burnout?",
      established: "During a major post-merger integration or structural transition, how does your strategic directive cascade to the front lines without losing fidelity or stalling operations?",
      generational: "When a major transition of governing power of the family enterprise is initiated, how do your strategic mandates and core legacy remain uncompromised?"
    },
    options: [
      { 
        label: "Direct Involvement", 
        scores: { "Cognitive Clarity": 4, "Systemic Integrity": 1, "Strategic Velocity": 2 }, 
        description: "We rely on frequent, high-touch coordination meetings led personally by me to keep everyone aligned." 
      },
      { 
        label: "Rigid Playbooks", 
        scores: { "Cognitive Clarity": 3, "Systemic Integrity": 4, "Strategic Velocity": 1 }, 
        description: "Decisions are fully codified in static manual playbooks, resulting in clear delegation but a noticeable delay in reacting to swift market opportunities." 
      },
      { 
        label: "Autonomous Containers", 
        scores: { "Cognitive Clarity": 3, "Systemic Integrity": 5, "Strategic Velocity": 5, "Cultural Fidelity": 2 }, 
        description: "Execution parameters are hard-coded into automated alignment gates. Strategic velocity is maximum, but the system occasionally operates with cold mechanical efficiency, threatening cultural warmth." 
      }
    ]
  },
  {
    text: {
      dynamic: "What happens to your operational rhythm if you are completely offline and unreachable for 30 consecutive days during a market disruption?",
      established: "If the executive committee must run the primary business unit for 4 weeks without any direct communication from the principal, what is the impact on speed and standard of execution?",
      generational: "If the family principal is suddenly incapacitated, how swiftly and autonomously do your governance and trust structures mobilize to maintain stability?"
    },
    options: [
      { 
        label: "Algorithmic Continuity", 
        scores: { "Systemic Integrity": 5, "Strategic Velocity": 4, "Cultural Fidelity": 2 }, 
        description: "The system runs flawlessly on pre-set parameters and automated software guards, though the original 'founder's touch' and cultural intensity begin to fade or experience edge drift." 
      },
      { 
        label: "Hesitant Approvals", 
        scores: { "Systemic Integrity": 3, "Strategic Velocity": 1, "Cognitive Clarity": 4 }, 
        description: "Operations continue but critical approvals stall. The team hesitates to make major strategic moves to avoid potential misalignment with my vision." 
      },
      { 
        label: "Ad-hoc Interventions", 
        scores: { "Systemic Integrity": 1, "Strategic Velocity": 2, "Cultural Fidelity": 5 }, 
        description: "Immediate friction occurs. The business relies heavily on my personal crisis management; without direct intervention, key accounts or strategic momentum would suffer." 
      }
    ]
  },
  {
    text: {
      dynamic: "When a high-performing lead operator acts in a way that violates core cultural tenets but continues to deliver exceptional short-term numbers, how does your system react?",
      established: "If a highly profitable business division consistently exhibits behavior that deviates from your declared corporate values, how is this misalignment resolved?",
      generational: "If an influential member of your inner circle or family council begins to compromise the family's long-term reputation for quick wins, how does your governance respond?"
    },
    options: [
      { 
        label: "Ethical Compromise", 
        scores: { "Moral Gravity": 1, "Cultural Fidelity": 2, "Cognitive Clarity": 3 }, 
        description: "Values are documented, but we must compromise occasionally to prevent immediate revenue loss while we work on coaching them." 
      },
      { 
        label: "Embedded Reward Realignment", 
        scores: { "Moral Gravity": 5, "Cultural Fidelity": 5, "Systemic Integrity": 4 }, 
        description: "The deviation is resolved instantly and systematically because our reward structures and core parameters are topologically hard-coded to reward ethical alignment over raw volume." 
      },
      { 
        label: "Direct Personal Admonishment", 
        scores: { "Moral Gravity": 3, "Cultural Fidelity": 4, "Systemic Integrity": 2 }, 
        description: "I would intervene personally to counsel the individual and enforce values, but the process is highly exhausting and relies entirely on my behavioral vigilance." 
      }
    ]
  },
  {
    text: {
      dynamic: "How does your organization calibrate and approve strategic investments or capital reallocations when sudden macroeconomic disruptions occur?",
      established: "When evaluating high-capital division pivots under highly volatile market conditions, how are decisions authorized and risk managed?",
      generational: "When family assets require rapid reallocation due to global political/market volatility, who initiates and verifies the move?"
    },
    options: [
      { 
        label: "Pre-authorized Guardrails", 
        scores: { "Strategic Velocity": 5, "Systemic Integrity": 4, "Cognitive Clarity": 4 }, 
        description: "We have pre-authorized 'autonomous maneuver parameters' with hard-coded risk metrics, allowing tactical leads to reallocate capital instantly within safe boundaries." 
      },
      { 
        label: "Deliberate Manual Approvals", 
        scores: { "Strategic Velocity": 2, "Systemic Integrity": 3, "Moral Gravity": 5 }, 
        description: "The board or principal reviews and debates every transition manually. This protects capital from reckless decisions, but we frequently miss the ideal windows of opportunity." 
      },
      { 
        label: "Speculative Realignment", 
        scores: { "Strategic Velocity": 4, "Systemic Integrity": 1, "Moral Gravity": 2 }, 
        description: "We pivot quickly because we have a tight-knit executive circle, but the decisions are highly speculative, often bypassing structured risk mitigation controls." 
      }
    ]
  },
  {
    text: {
      dynamic: "As you hire and scale your team, how does your founder's intensity and original execution standard replicate at the outermost edges of the organization?",
      established: "How do you ensure that standard operating procedures are executed at the absolute highest tier across all distant business units without constant corporate inspection?",
      generational: "How is the family's core philosophy and sense of stewardship transmitted and active in newly hired external executives or trustees?"
    },
    options: [
      { 
        label: "Programmatic Alignment", 
        scores: { "Cultural Fidelity": 5, "Cognitive Clarity": 4, "Systemic Integrity": 4 }, 
        description: "We have automated, high-frequency resonance loops and programmatic alignment gates built into our onboarding, ensuring high cultural fidelity with minimal manual input." 
      },
      { 
        label: "Ad-hoc Local Standards", 
        scores: { "Cultural Fidelity": 1, "Cognitive Clarity": 2, "Systemic Integrity": 2 }, 
        description: "The standard is highly diluted at the edges. Outstanding execution is highly dependent on local leadership's personal talent and motivation, causing unpredictable variances." 
      },
      { 
        label: "Personal Transmission Meetings", 
        scores: { "Cultural Fidelity": 4, "Cognitive Clarity": 3, "Systemic Integrity": 1 }, 
        description: "We achieve outstanding standards only through my direct oversight, heavy personal training, and frequent inspections, which limits our expansion capacity." 
      }
    ]
  }
];

const Assessment: React.FC = () => {
  const [step, setStep] = useState<Step>('intro');
  const [identity, setIdentity] = useState({ name: '', email: '', organization: '' });
  const [context, setContext] = useState<ContextType | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isPaid, setIsPaid] = useState(false);
  const [assessmentId, setAssessmentId] = useState<string | null>(null);
  const [dossierId, setDossierId] = useState(() => Math.floor(Math.random() * 100000).toString().padStart(6, '0'));

  // Playbook Interactive Add-on State
  const [showPlaybookOnboard, setShowPlaybookOnboard] = useState(false);
  const [playbookSubmitted, setPlaybookSubmitted] = useState(false);
  const [isGeneratingPlaybook, setIsGeneratingPlaybook] = useState(false);
  const [playbookAnswers, setPlaybookAnswers] = useState({
    handoverHorizon: '',
    focusBottleneck: '',
    keyRiskLevel: ''
  });

  // Anticheat Shuffled Questions & Options
  interface ShuffledQuestion {
    text: {
      dynamic: string;
      established: string;
      generational: string;
    };
    shuffledOptions: { option: Option; originalIdx: number }[];
  }
  const [shuffledQuestions, setShuffledQuestions] = useState<ShuffledQuestion[]>([]);

  // Simple clean array shuffler (Fisher-Yates) Code
  const shuffleArray = <T,>(array: T[]): T[] => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // State Recovery Engine
  const [restoredSession, setRestoredSession] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem('TULC_ASSESSMENT_SESSION');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.step && parsed.step !== 'intro') {
          setRestoredSession(parsed);
        }
      } catch (e) {
        console.error("Failed to recover TULC session", e);
      }
    }
  }, []);

  // Save session state reactively
  useEffect(() => {
    if (step !== 'intro') {
      const sessionData = {
        identity,
        context,
        currentQuestion,
        answers,
        step,
        assessmentId,
        dossierId,
        playbookAnswers,
        playbookSubmitted,
        showPlaybookOnboard,
        isPaid
      };
      localStorage.setItem('TULC_ASSESSMENT_SESSION', JSON.stringify(sessionData));
    }
  }, [identity, context, currentQuestion, answers, step, assessmentId, dossierId, playbookAnswers, playbookSubmitted, showPlaybookOnboard, isPaid]);

  const handleResume = () => {
    if (restoredSession) {
      setIdentity(restoredSession.identity || { name: '', email: '', organization: '' });
      setContext(restoredSession.context || null);
      setCurrentQuestion(restoredSession.currentQuestion || 0);
      setAnswers(restoredSession.answers || {});
      setStep(restoredSession.step || 'intro');
      setAssessmentId(restoredSession.assessmentId || null);
      if (restoredSession.dossierId) {
        setDossierId(restoredSession.dossierId);
      }
      setPlaybookAnswers(restoredSession.playbookAnswers || { handoverHorizon: '', focusBottleneck: '', keyRiskLevel: '' });
      setPlaybookSubmitted(restoredSession.playbookSubmitted || false);
      setShowPlaybookOnboard(restoredSession.showPlaybookOnboard || false);
      setIsPaid(restoredSession.isPaid || false);

      // Re-trigger dynamic question shuffling so we have options present if we resumed to questions
      if (restoredSession.context && restoredSession.step === 'questions') {
        const shuffled = QUESTIONS.map(q => {
          const optsWithIdx = q.options.map((option, originalIdx) => ({ option, originalIdx }));
          return {
            text: q.text,
            shuffledOptions: shuffleArray(optsWithIdx)
          };
        });
        setShuffledQuestions(shuffled);
      }
    }
    setRestoredSession(null);
  };

  const handleReset = () => {
    localStorage.removeItem('TULC_ASSESSMENT_SESSION');
    setRestoredSession(null);
    setStep('intro');
  };

  // VIP Invoice Fallback
  const [showVIPInvoicePanel, setShowVIPInvoicePanel] = useState(false);
  const [vipInvoiceInputs, setVipInvoiceInputs] = useState({ phone: '', mode: 'Email', comments: '' });
  const [vipInvoiceSuccess, setVipInvoiceSuccess] = useState(false);
  const [isSubmittingVIPWire, setIsSubmittingVIPWire] = useState(false);

  // Copy Badge Embed Code state
  const [badgeCopySuccess, setBadgeCopySuccess] = useState(false);

  const handleVIPInvoiceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingVIPWire(true);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: identity.name,
          email: identity.email,
          organization: identity.organization,
          message: `VIP MANUAL INVOICE DRIVEN HANDSHAKE REQUESTED // Phone: ${vipInvoiceInputs.phone}, Delivery Mode: ${vipInvoiceInputs.mode}, Executive Request Comments: ${vipInvoiceInputs.comments}`,
          type: 'VIP_WIRE_REQUESTED'
        })
      });
      setVipInvoiceSuccess(true);
    } catch (e) {
      console.error("VIP Invoice request failure:", e);
    } finally {
      setIsSubmittingVIPWire(false);
    }
  };

  const handleStart = () => {
    setStep('auth');
  };

  const handleIdentitySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identity.name || !identity.email || !identity.organization) {
      setAuthError("All institutional identifiers are required for verification.");
      return;
    }

    try {
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: identity.name,
          email: identity.email,
          organization: identity.organization,
          type: 'SIGNUP_INITIATED'
        })
      });
    } catch (e) {
      console.error("Initial handshake failure:", e);
    }

    setStep('context');
  };

  const handleRazorpayPayment = () => {
    window.open('https://rzp.io/rzp/8H0bV3bW', '_blank');
    setIsPaid(true);
    if (assessmentId) {
      SovereignDB.updateAssessmentPayment(assessmentId);
    }
  };

  const handleContextSelect = (c: ContextType) => {
    setContext(c);
    const shuffled = QUESTIONS.map(q => {
      const optsWithIdx = q.options.map((option, originalIdx) => ({ option, originalIdx }));
      return {
        text: q.text,
        shuffledOptions: shuffleArray(optsWithIdx)
      };
    });
    setShuffledQuestions(shuffled);
    setStep('questions');
  };

  const handleAnswer = (optionIdx: number) => {
    const newAnswers = { ...answers, [currentQuestion]: optionIdx };
    setAnswers(newAnswers);
    
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitAssessment(newAnswers);
    }
  };

  const computeDomainScores = (currentAnswers: Record<number, number>) => {
    const domains = [
      "Cognitive Clarity",
      "Systemic Integrity",
      "Strategic Velocity",
      "Moral Gravity",
      "Cultural Fidelity"
    ];
    
    const rawScores: Record<string, number> = {
      "Cognitive Clarity": 0,
      "Systemic Integrity": 0,
      "Strategic Velocity": 0,
      "Moral Gravity": 0,
      "Cultural Fidelity": 0
    };

    Object.entries(currentAnswers).forEach(([qIdx, optIdx]) => {
      const question = QUESTIONS[Number(qIdx)];
      if (question) {
        const option = question.options[optIdx];
        if (option && option.scores) {
          Object.entries(option.scores).forEach(([domain, val]) => {
            if (rawScores[domain] !== undefined) {
              rawScores[domain] += val;
            }
          });
        }
      }
    });

    const maxRaw: Record<string, number> = {
      "Cognitive Clarity": 15,
      "Systemic Integrity": 18,
      "Strategic Velocity": 14,
      "Moral Gravity": 10,
      "Cultural Fidelity": 12
    };

    return domains.map(domain => {
      const raw = rawScores[domain] || 0;
      const maxVal = maxRaw[domain] || 15;
      const scaled = Math.max(1, Math.min(5, Math.round((raw / maxVal) * 5)));
      return { domain, score: scaled, raw };
    });
  };

  const submitAssessment = async (finalAnswers: Record<number, number>) => {
    setStep('calculating');
    setIsSubmitting(true);
    
    try {
      const domainScores = computeDomainScores(finalAnswers);
      const totalScoreValue = domainScores.reduce((a, b) => a + b.score, 0);
      const maxScore = 25;
      const percentage = (totalScoreValue / maxScore) * 100;

      const result = await SovereignDB.saveAssessment({
        userId: 'anonymous-sovereign',
        name: identity.name,
        email: identity.email,
        organization: identity.organization,
        context: context!,
        answers: finalAnswers,
        totalScore: totalScoreValue,
        percentage,
        domainScores: domainScores.map(d => ({ domain: d.domain, score: d.score }))
      });

      if (result?.id) {
        setAssessmentId(result.id);
        
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: identity.name,
            email: identity.email,
            organization: identity.organization,
            message: `Free Assessment Completed. Total Score: ${totalScoreValue}/25. Domain Scores: ${domainScores.map(d => `${d.domain}: ${d.score}`).join(', ')}`,
            type: 'ASSESSMENT_COMPLETED',
            assessmentData: {
              totalScore: totalScoreValue,
              domainScores: domainScores.map(d => ({ domain: d.domain, score: d.score }))
            }
          })
        }).catch(err => console.error("Assessment notify failed", err));
      }

      setTimeout(() => {
        setStep('dossier');
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      console.error("Error saving assessment", error);
      setIsSubmitting(false);
    }
  };

  const getGrade = () => {
    const domainScores = computeDomainScores(answers);
    const totalScoreValue = domainScores.reduce((a, b) => a + b.score, 0);
    if (totalScoreValue >= 22) return 'Sovereign';
    if (totalScoreValue >= 17) return 'Architectural';
    if (totalScoreValue >= 11) return 'Systemic';
    return 'Manual';
  };

  const getReportDetails = () => {
    const domainScores = computeDomainScores(answers);
    const totalScoreValue = domainScores.reduce((a, b) => a + b.score, 0);
    
    const sortedScores = [...domainScores].sort((a, b) => b.score - a.score);
    const strengthDomain = sortedScores[0].domain;
    
    // Exactly 2 domains that need attention (lowest two)
    const attentionDomain1 = sortedScores[sortedScores.length - 1].domain;
    const attentionDomain2 = sortedScores[sortedScores.length - 2].domain;

    const insights: Record<string, { 
      definition: string; 
      strength: string; 
      refinement: string;
      urgency: string;
      objection: string;
      benefit: string;
      symptoms: string[];
      impact: string;
      prescription: string;
    }> = {
      "Cognitive Clarity": {
        definition: "The exactness through which leadership's foundational intent is externalized, translated, and locked down into absolute operational parameters.",
        strength: "Your organization demonstrates exceptional capability in long-term visioning and raw strategic intent. You possess a unique creative compass to see major market developments before they happen.",
        refinement: "However, this vision operates with a high 'manual confirmation tax'. Every strategic move requires your direct verbal approval, meaning scale is permanently bottlenecked by your personal physical stamina.",
        urgency: "Why Now: As market windows contract, relying on manual translation drains 40% of your executive capacity, leaving you vulnerable to swift competitors who build and execute standardized operations.",
        objection: "Addressing 'I don't have time to document this': Sovereign distillation does not require writing tedious corporate wikis. It means automating your core decision algorithms once, so you never have to re-explain yourself.",
        benefit: "Your Benefit: Reclaim 15+ hours weekly instantly, allowing you to focus on high-leverage compound moves instead of repetitive tactical alignment.",
        symptoms: [
          "Leadership spending more than 15 hours weekly on manual alignment check-ins",
          "Delayed project executions because key stakeholders 'need to hear it from the Principal directly'",
          "Ambiguities in strategic mandates leading to wasted team bandwidth and speculative execution paths"
        ],
        impact: "Severe Strategic Friction. Your organization is paying a hidden 'clarification tax' which acts as a permanent handbrake on capital deployment. The opportunity cost is estimated to be 15-20% of your operational run-rate.",
        prescription: "Deploy the Substrate Diagnostic Protocol (Phase 0.0) immediately. We will forensically capture your unique mental models, map your core decision-making vectors, and translate them into standard-operating algorithms, allowing your executive layer to execute your intent autonomously."
      },
      "Systemic Integrity": {
        definition: "The structural self-regulation of your firm's protocols—ensuring that business processes keep running smoothly regardless of human behavior or individual heroics.",
        strength: "Your leadership has spent immense personal equity building deep loyalty within the team. The business processes are kept alive because key heroes consistently step up.",
        refinement: "However, this makes your operation 'hero-dependent'. If even 2 crucial leaders are suddenly unavailable, operations would experience severe strain, creating extreme key-person risk.",
        urgency: "Why Now: Scale is mathematically capped by your team's exhaustion threshold. Running an enterprise on sheer willpower leads to systemic fatigue and inevitable talent turnover at critical junctures.",
        objection: "Addressing 'My organization is too dynamic for rigid software protocols': Sovereign architecture is not bureaucratic micromanagement; it is cybernetic regulation. It replaces rigid managers with flexible self-correcting containers.",
        benefit: "Your Benefit: Fully stress-tested operations that can run autonomously for 30 consecutive days, protecting equity value and ensuring absolute asset security.",
        symptoms: [
          "Crises and strategic variances requiring direct escalation to the executive team",
          "High friction in onboarding and delegation because tasks are poorly structured and rely heavily on personal intuition",
          "Friction in handoffs between departments resulting in variable and unpredictable results"
        ],
        impact: "Continuous Operational Exposure. Since stability is maintained through the sheer force of will of key individuals, the architecture suffers from structural fatigue. Scale is mathematically capped at your leaders' stress limits.",
        prescription: "Integrate Phase 01 of the Sovereign Protocol. We will replace fragile manual oversight channels with self-maintaining operational containers. This eliminates hero-dependency and hard-codes your standard operating logic into the very substrate of the company."
      },
      "Strategic Velocity": {
        definition: "The conversion index—measuring how fast your organization can pivot capital, human resources, and execution lines to exploit market gaps.",
        strength: "You possess high localized reaction speeds. When a major crisis occurs, your core circle reacts with massive emotional focus and quick, decisive adjustments.",
        refinement: "However, this reaction speed is manual and highly draining. True corporate velocity should exist as a default structural state, rather than being triggered by adrenaline-fueled panic.",
        urgency: "Why Now: In volatile markets, delayed responses are directly penalized by capital decay. A single bottlenecked board cycle or delayed delegation window can cost millions in lost momentum.",
        objection: "Addressing 'Moving fast compromises risk protection': We do not advocate for reckless execution. We construct pre-authorized 'autonomous maneuver parameters' where safety boundaries are hard-coded.",
        benefit: "Your Benefit: Accelerate implementation index by up to 3.5x, transforming market uncertainty into an active weapon to capture first-mover market share.",
        symptoms: [
          "Capital reallocation opportunities remaining static for months due to internal consensus-seeking delays",
          "More than 3 coordination layers required to execute a tactical pivot",
          "Competitive response latency exceeding standard market windows"
        ],
        impact: "Capital Latency Tax. Delayed reactions to dynamic environments bleed strategic equity. For an institutional scale firm, a 30-day bottleneck in strategic execution can erode market value and destroy permanent first-mover advantage.",
        prescription: "Inject our Decision Velocity Calibration Matrix. Through the In-depth Assessment, we build dedicated, pre-authorized 'autonomous maneuver parameters' for your leaders. They execute high-priority decisions instantly within pre-calibrated guardrails, bypassing unnecessary board cycles."
      },
      "Moral Gravity": {
        definition: "The structural resonance of ethics, core values, and corporate trust—transforming voluntary alignment into an inevitable operating reality.",
        strength: "Your enterprise stands on a deep, uncompromised foundation of trust and values, making your brand highly respected among elite partners and high-profile clientele.",
        refinement: "However, these values exist purely as behavioral expectations. Unless they are programmatically built into performance reviews and reward channels, they remain vulnerable to local compromises.",
        urgency: "Why Now: Trust is your most valuable asset, yet it is currently relying on constant manual vigilance. A single cultural deviation at the operational edge can wipe out years of built-up branding in seconds.",
        objection: "Addressing 'Culture and trust cannot be metricized': They absolutely can. By mapping trust boundaries directly to incentive metrics, we turn ethics into an automated gate rather than an optional guideline.",
        benefit: "Your Benefit: Minimize compliance auditing noise by 90% while ensuring your corporate reputation acts as an unshakeable, self-regulating gravity well.",
        symptoms: [
          "Minor compliance or value variances requiring top-level behavioral interventions",
          "Variable external relationship fidelity because values are defined but not locked into systemic client delivery gates",
          "Decision-making at the edge that occasionally sacrifices long-term trust for short-term convenience"
        ],
        impact: "Reputational Exposure and Elevated Coordination Cost. When values rely purely on individual compliance, you pay an continuous 'assessment fee' of time and anxiety to monitor behavioral alignment.",
        prescription: "Audit and embed unchangeable reputational metrics. Through our Annual Retainer or complete Sovereign Protocol, we align incentives, strategic limits, and operational dispatches into a single ecosystem where non-aligned action is structurally impossible."
      },
      "Cultural Fidelity": {
        definition: "The exact replication index of your founder's original culture and intensity as they cascade down to the newest hire.",
        strength: "Your founding core possesses immense pride and passion, carrying the brand's original flame with deep personal dedication and enthusiasm.",
        refinement: "However, as the organization expands, the cultural spark experiences severe 'edge drift', diluting your original intensity and excellence by the time it reaches frontline employees.",
        urgency: "Why Now: Unaligned hiring and drifting standards degrade client delivery, dragging your corporate performance down to high-turnover mediocrity.",
        objection: "Addressing 'You cannot automate passion': We do not automate feeling; we automate the structural checkpoints and high-resonance rituals that make compliance with the culture unavoidable.",
        benefit: "Your Benefit: Create a self-sustaining talent incubator where new hires onboard into an inevitable culture of peak execution, with zero active instruction from you.",
        symptoms: [
          "A noticeable disconnect in passion and alignment between core leadership and entry-level employees",
          "Core strategic mandates and brand dispatches losing their urgency as they travel through the ranks",
          "Hiring new team members is a gamble, requiring months to determine if they truly understand the company's identity"
        ],
        impact: "Severe Brand Erosion. Culture drift directly degrades customer experiences and dilutes operational standards. When the principal's original energy cannot cascade programmatically, standard execution declines toward market mediocrity.",
        prescription: "Implement our Cultural Resonance Cascades. We code your core values into employee journey maps, programmatic performance calibrations, and cultural protocols. This ensures that every worker executes with the precise fidelity of the original principal."
      }
    };

    return {
      strength: insights[strengthDomain]?.strength || "The organization demonstrates foundational stability in its core protocols.",
      refinement1: insights[attentionDomain1]?.refinement || "The substrate is reaching its stress limits and is optimized for manual checks.",
      refinement2: insights[attentionDomain2]?.refinement || "Edge scaling is exhibiting significant operational drift.",
      symptoms1: insights[attentionDomain1]?.symptoms || [],
      symptoms2: insights[attentionDomain2]?.symptoms || [],
      impact1: insights[attentionDomain1]?.impact || "",
      impact2: insights[attentionDomain2]?.impact || "",
      prescription1: insights[attentionDomain1]?.prescription || "",
      prescription2: insights[attentionDomain2]?.prescription || "",
      strengthDomain,
      attentionDomain1,
      attentionDomain2,
      domainInsights: insights,
      priority: totalScoreValue < 17 
        ? "IMMEDIATE CALIBRATION REQUIRED: Your current institutional substrate is performing with some localized resilience but is bleeding strategic bandwidth. Scaling your existing strengths while building autonomous logic gates is the correct next move to unlock strategic velocity and preserve your leadership legacy."
        : "ARCHITECTURAL SCALE SECURED: You are positioned beautifully for institutional permanence. Challenging your organization to move beyond 'Heroic Management' into 'Pure Architecture' is the definitive next step to insulate your brand and scale your genius."
    };
  };

  return (
    <section id="assessment" className="py-12 md:py-16 bg-[#f5f5f0] scroll-mt-28 md:scroll-mt-32 min-h-[650px] flex flex-col justify-center relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#b8860b_1px,transparent_1px)] [background-size:40px_40px]"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 w-full">
        <AnimatePresence mode="wait">
          {step === 'intro' && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <h2 className="text-[#b8860b] text-[10px] font-black uppercase mb-6 tracking-[0.4em]">The Free Yield Calibration</h2>
              <h3 className="text-4xl sm:text-6xl font-bold mb-8 text-[#111111] leading-tight font-serif">
                Architectural <span className="italic text-[#b8860b]">Maturity.</span>
              </h3>
              <p className="text-zinc-600 text-xl mb-12 font-light italic leading-relaxed max-w-2xl mx-auto">
                A free 5-domain diagnostic to map your institutional substrate. Identify the primary constraints preventing your transition from Hero to Architect.
              </p>

              {restoredSession && (
                <div className="mb-10 max-w-lg mx-auto bg-[#fafafa] border border-zinc-200/60 p-6 shadow-md text-left relative overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-1 bg-[#b8860b]" />
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-[#b8860b] mb-2 flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-[#b8860b]" /> Active Protocol State Found
                  </h4>
                  <p className="text-zinc-600 text-[11px] font-light leading-relaxed mb-4 italic">
                    We detected an incomplete yield calibration session for <strong className="font-medium text-black">{restoredSession.identity?.name || 'an Executive'}</strong> at <strong className="font-medium text-black">{restoredSession.identity?.organization}</strong>. Reconnect immediately to resume protocol mapping.
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={handleResume}
                      className="px-4 py-2.5 bg-[#111111] text-white hover:bg-[#b8860b] text-[9px] font-bold uppercase tracking-wider transition-all shadow-sm"
                    >
                      Resume Protocol
                    </button>
                    <button
                      onClick={handleReset}
                      className="px-4 py-2.5 bg-transparent border border-zinc-300 hover:border-red-600 hover:text-red-600 text-zinc-500 text-[9px] font-bold uppercase tracking-wider transition-all"
                    >
                      Discard Session
                    </button>
                  </div>
                </div>
              )}

              <div className="flex flex-col items-center gap-8">
                <button 
                  onClick={handleStart}
                  className="px-12 py-6 bg-[#111111] text-white text-[11px] font-black uppercase tracking-[0.3em] hover:bg-[#b8860b] transition-all shadow-2xl"
                >
                  Initiate Identity Verification
                </button>
                
                <div className="flex flex-col items-center gap-2">
                  <div className="text-[9px] uppercase text-zinc-600 tracking-[0.5em] font-black">Already a Principal?</div>
                  <a 
                    href="https://ai.studio/apps/bc205532-cdb0-43d3-a8fb-919809372614"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#b8860b] text-xs font-mono hover:underline tracking-widest flex items-center gap-2"
                  >
                    Enter The Sovereign Portal <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'auth' && (
            <motion.div 
              key="auth"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="bg-white p-8 md:p-12 shadow-2xl border border-zinc-100 text-center max-w-2xl mx-auto"
            >
              <Shield className="w-12 h-12 text-[#b8860b] mx-auto mb-8" />
              <h3 className="text-2xl font-bold mb-4 text-[#111111] uppercase tracking-wider">Identity Protocol</h3>
              <p className="text-zinc-700 mb-10 italic font-light">
                Access to the Sovereign Protocol requires institutional verification. Please provide your strategic identifiers.
              </p>
              
              <form onSubmit={handleIdentitySubmit} className="space-y-6 text-left">
                <div>
                  <label className="text-[9px] font-black uppercase text-zinc-600 tracking-[0.3em] block mb-2 font-sans">Institutional Identity</label>
                  <input 
                    type="text"
                    required
                    placeholder="Full Name"
                    value={identity.name}
                    onChange={(e) => setIdentity({...identity, name: e.target.value})}
                    className="w-full px-4 py-4 bg-zinc-50 border border-zinc-200 text-xs focus:outline-none focus:border-[#b8860b] italic"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase text-zinc-600 tracking-[0.3em] block mb-2 font-sans">Strategic Email</label>
                  <input 
                    type="email"
                    required
                    placeholder="Institutional Email"
                    value={identity.email}
                    onChange={(e) => setIdentity({...identity, email: e.target.value})}
                    className="w-full px-4 py-4 bg-zinc-50 border border-zinc-200 text-xs focus:outline-none focus:border-[#b8860b] italic"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase text-zinc-600 tracking-[0.3em] block mb-2 font-sans">Organization</label>
                  <input 
                    type="text"
                    required
                    placeholder="Principal Institution"
                    value={identity.organization}
                    onChange={(e) => setIdentity({...identity, organization: e.target.value})}
                    className="w-full px-4 py-4 bg-zinc-50 border border-zinc-200 text-xs focus:outline-none focus:border-[#b8860b] italic"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-6 bg-[#111111] text-white text-[11px] font-black uppercase tracking-[0.3em] hover:bg-[#b8860b] transition-all shadow-xl"
                >
                  Initiate Verification
                </button>
              </form>
              
              {authError && (
                <div className="mt-6 p-4 bg-red-50 border border-red-100 text-red-600 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>Verification Error</span>
                  </div>
                  {authError}
                </div>
              )}

              <div className="text-[9px] uppercase text-zinc-600 tracking-widest mt-8">
                Zero Data Retention (ZDR) Mandate Active
              </div>
            </motion.div>
          )}

          {step === 'context' && (
            <motion.div 
              key="context"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center max-w-5xl mx-auto"
            >
              <h3 className="text-2xl font-bold mb-4 text-[#111111] uppercase tracking-widest font-mono">Select Institutional Substrate</h3>
              <p className="text-zinc-700 mb-12 italic font-light max-w-2xl mx-auto">
                The diagnostic must be calibrated to your specific theater of operation. Select the substrate that most accurately reflects your current institutional complexity.
              </p>
              
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  { 
                    id: 'dynamic', 
                    label: 'Dynamic Protocol', 
                    icon: Zap, 
                    desc: 'Agility & Innovation',
                    longDesc: 'Optimized for high-velocity environments and disruptive strategic pivots. Ideal for growth-stage ventures and agile leadership.'
                  },
                  { 
                    id: 'established', 
                    label: 'Established Protocol', 
                    icon: Layers, 
                    desc: 'Stability & Scale',
                    longDesc: 'Designed for mature institutions requiring systemic stability, operational scale, and complex authority preservation.'
                  },
                  { 
                    id: 'generational', 
                    label: 'Generational Protocol', 
                    icon: Shield, 
                    desc: 'Legacy & Continuity',
                    longDesc: 'Engineered for the long-term preservation of legacy, family governance, and the multi-decade transition of power.'
                  }
                ].map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => handleContextSelect(item.id as ContextType)}
                    className="bg-white p-10 border border-zinc-100 hover:border-[#b8860b] hover:shadow-2xl transition-all group flex flex-col items-center text-center relative overflow-hidden h-full"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-zinc-100 group-hover:bg-[#b8860b] transition-colors" />
                    <item.icon className="w-10 h-10 text-zinc-300 group-hover:text-[#b8860b] mb-6 transition-colors" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#111111] mb-2">{item.label}</span>
                    <span className="text-[8px] text-[#b8860b] uppercase tracking-widest font-black mb-4">{item.desc}</span>
                    <p className="text-[10px] text-zinc-600 leading-relaxed font-light italic">
                      {item.longDesc}
                    </p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'questions' && (
            <motion.div 
              key="questions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white p-12 shadow-2xl border border-zinc-100"
            >
              <div className="flex justify-between items-center mb-12 select-none">
                <span className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.4em]">Integrated Calibration 0{currentQuestion + 1}</span>
                <div className="flex gap-1">
                  {QUESTIONS.map((_, i) => (
                    <div key={i} className={`h-1 w-8 ${i <= currentQuestion ? 'bg-[#b8860b]' : 'bg-zinc-100'} transition-colors`} />
                  ))}
                </div>
              </div>

              <h4 className="text-2xl sm:text-3xl font-bold mb-12 text-[#111111] leading-tight italic font-serif">
                "{shuffledQuestions[currentQuestion] ? shuffledQuestions[currentQuestion].text[context!] : QUESTIONS[currentQuestion].text[context!]}"
              </h4>

              <div className="space-y-4">
                {shuffledQuestions[currentQuestion] ? (
                  shuffledQuestions[currentQuestion].shuffledOptions.map((item, optIdx) => (
                    <button 
                      key={optIdx}
                      onClick={() => handleAnswer(item.originalIdx)}
                      className="w-full p-8 border border-zinc-100 hover:border-[#b8860b] hover:bg-zinc-50 transition-all text-left group flex justify-between items-center"
                    >
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-[#b8860b] mb-2">{item.option.label}</div>
                        <div className="text-zinc-700 font-light italic text-xs sm:text-sm">{item.option.description}</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-zinc-300 group-hover:text-[#b8860b] shrink-0 ml-4 transition-colors" />
                    </button>
                  ))
                ) : (
                  QUESTIONS[currentQuestion].options.map((opt, optIdx) => (
                    <button 
                      key={optIdx}
                      onClick={() => handleAnswer(optIdx)}
                      className="w-full p-8 border border-zinc-100 hover:border-[#b8860b] hover:bg-zinc-50 transition-all text-left group flex justify-between items-center"
                    >
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-[#b8860b] mb-2">{opt.label}</div>
                        <div className="text-zinc-700 font-light italic text-xs sm:text-sm">{opt.description}</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-zinc-300 group-hover:text-[#b8860b] shrink-0 ml-4 transition-colors" />
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          )}

          {step === 'calculating' && (
            <motion.div 
              key="calculating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="relative w-24 h-24 mx-auto mb-12">
                <div className="absolute inset-0 border-4 border-zinc-100 rounded-full"></div>
                <motion.div 
                  className="absolute inset-0 border-4 border-t-[#b8860b] rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#111111] uppercase tracking-[0.3em] font-mono">Cross-Domain Mapping in Progress</h3>
              <p className="text-zinc-500 italic font-light animate-pulse font-serif">Synthesizing multi-vector alignment and estimating key-person risk thresholds...</p>
            </motion.div>
          )}

          {step === 'dossier' && (() => {
            const rDetails = getReportDetails();
            const dScores = computeDomainScores(answers);
            const totalScoreValue = dScores.reduce((a, b) => a + b.score, 0);

            return (
              <motion.div 
                key="dossier"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#111111] text-white p-8 sm:p-16 shadow-[0_0_100px_rgba(184,134,11,0.1)] border border-[#b8860b]/30 relative overflow-hidden"
              >
                {/* Decorative Watermark */}
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] select-none pointer-events-none">
                  <Shield className="w-64 h-64" />
                </div>

                <div className="relative z-10">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 pb-8 border-b border-white/10 gap-8 text-left">
                    <div>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-2 h-2 bg-[#b8860b] animate-pulse" />
                        <h3 className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.5em] font-mono">Institutional Snapshot</h3>
                      </div>
                      <div className="text-3xl sm:text-4xl font-bold uppercase tracking-widest font-mono">
                        Dossier <span className="text-[#b8860b]">{dossierId}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="text-[9px] uppercase font-black text-zinc-600 mb-2 tracking-widest font-mono">Vertical Maturity Grade:</div>
                      <div className="px-8 py-4 bg-white text-black text-sm font-black uppercase tracking-[0.3em] shadow-[0_0_30px_rgba(255,255,255,0.1)] font-mono">
                        {getGrade()}
                      </div>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-12 gap-16 mb-16 text-left">
                    <div className="lg:col-span-7 space-y-12">
                      <section className="space-y-6">
                        {/* Highlights: What they are good at */}
                        <div className="text-[10px] uppercase font-black text-[#b8860b] tracking-[0.4em] flex items-center gap-4">
                          <div className="h-px w-8 bg-[#b8860b]/30" />
                          Primary Institutional Asset: {rDetails.strengthDomain}
                        </div>
                        <div className="text-xl font-bold italic mb-4 text-white leading-tight font-serif">
                          "{rDetails.strength}"
                        </div>
                        <p className="text-zinc-400 text-sm leading-relaxed font-light font-serif italic border-l border-[#b8860b]/30 pl-4">
                          The diagnostic validates that you possess foundational greatness here. This core capability forms the cornerstone of your business scale, yet without mechanical offloading, your personal stamina remains its sole container.
                        </p>

                        <div className="h-px bg-zinc-800/50 my-8" />

                        {/* Critical Attention Domain 1 */}
                        <div className="text-[10px] uppercase font-black text-red-400 tracking-[0.4em] flex items-center gap-4">
                          <span className="w-2 h-2 bg-red-400 animate-ping inline-block rounded-full shrink-0" />
                          Critical Attention Domain 01: {rDetails.attentionDomain1}
                        </div>
                        <div className="text-xl font-bold italic text-white leading-tight font-serif">
                          "{rDetails.refinement1}"
                        </div>
                        <p className="text-zinc-300 text-sm font-light mt-2 italic">
                          {rDetails.domainInsights[rDetails.attentionDomain1]?.urgency}
                        </p>

                        {/* Forensic Symptoms */}
                        <div className="border border-white/5 bg-white/[0.01] p-6 rounded-xs">
                          <span className="text-[9px] uppercase font-black text-red-400/80 tracking-widest block mb-4 flex items-center gap-2 font-mono">
                            <AlertTriangle className="w-4 h-4 text-red-400" /> Operational Friction Symptoms (Detected)
                          </span>
                          <ul className="space-y-3">
                            {rDetails.symptoms1.map((symptom, sIdx) => (
                              <li key={sIdx} className="flex gap-3 text-xs text-zinc-400 italic font-light leading-relaxed font-serif">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#b8860b] mt-1.5 shrink-0" />
                                <span>{symptom}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Objection Handling */}
                        <div className="text-xs text-[#b8860b] italic font-semibold border-l-2 border-[#b8860b]/30 pl-4 py-1">
                          {rDetails.domainInsights[rDetails.attentionDomain1]?.objection}
                        </div>

                        {/* Financial Benefit */}
                        <div className="text-xs text-zinc-400 bg-white/[0.02] border border-white/5 p-4 italic">
                          <span className="font-bold text-[#b8860b] block not-italic uppercase text-[8px] tracking-wider mb-1 font-mono">Systemic Unlock Benefit</span>
                          {rDetails.domainInsights[rDetails.attentionDomain1]?.benefit}
                        </div>

                        <div className="h-px bg-zinc-800/50 my-8" />

                        {/* Critical Attention Domain 2 */}
                        <div className="text-[10px] uppercase font-black text-red-400 tracking-[0.4em] flex items-center gap-4">
                          <span className="w-2 h-2 bg-red-400 animate-ping inline-block rounded-full shrink-0" />
                          Critical Attention Domain 02: {rDetails.attentionDomain2}
                        </div>
                        <div className="text-xl font-bold italic text-white leading-tight font-serif">
                          "{rDetails.refinement2}"
                        </div>
                        <p className="text-zinc-300 text-sm font-light mt-2 italic">
                          {rDetails.domainInsights[rDetails.attentionDomain2]?.urgency}
                        </p>

                        {/* Forensic Symptoms for Attention 2 */}
                        <div className="border border-white/5 bg-white/[0.01] p-6 rounded-xs">
                          <span className="text-[9px] uppercase font-black text-red-400/80 tracking-widest block mb-4 flex items-center gap-2 font-mono">
                            <AlertTriangle className="w-4 h-4 text-red-400" /> Operational Friction Symptoms (Detected)
                          </span>
                          <ul className="space-y-3">
                            {rDetails.symptoms2.map((symptom, sIdx) => (
                              <li key={sIdx} className="flex gap-3 text-xs text-zinc-400 italic font-light leading-relaxed font-serif">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#b8860b] mt-1.5 shrink-0" />
                                <span>{symptom}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Objection Handling for Attention 2 */}
                        <div className="text-xs text-[#b8860b] italic font-semibold border-l-2 border-[#b8860b]/30 pl-4 py-1">
                          {rDetails.domainInsights[rDetails.attentionDomain2]?.objection}
                        </div>

                        {/* Financial Benefit for Attention 2 */}
                        <div className="text-xs text-zinc-400 bg-white/[0.02] border border-white/5 p-4 italic">
                          <span className="font-bold text-[#b8860b] block not-italic uppercase text-[8px] tracking-wider mb-1 font-mono">Systemic Unlock Benefit</span>
                          {rDetails.domainInsights[rDetails.attentionDomain2]?.benefit}
                        </div>

                        {/* Sovereign Prescription */}
                        <div className="border border-[#b8860b]/20 bg-[#b8860b]/5 p-6 rounded-xs mt-8">
                          <span className="text-[9px] uppercase font-black text-white tracking-widest block mb-2 flex items-center gap-2 font-mono">
                            <Zap className="w-4 h-4 text-[#b8860b]" /> Core Sovereign Prescription
                          </span>
                          <p className="text-xs text-zinc-300 italic leading-relaxed font-light">
                            {rDetails.domainInsights[rDetails.attentionDomain1]?.prescription}
                          </p>
                        </div>
                      </section>

                      <section className="p-8 bg-[#b8860b]/5 border border-[#b8860b]/20">
                        <div className="text-[10px] uppercase font-black text-[#b8860b] mb-4 tracking-[0.3em] font-mono">Strategic Priority Intervention</div>
                        <p className="text-white font-bold italic text-lg leading-relaxed font-serif">
                          {rDetails.priority}
                        </p>
                      </section>

                      <section className="grid sm:grid-cols-2 gap-8 font-mono">
                        <div className="p-8 bg-white/[0.02] border border-white/5">
                          <div className="text-[9px] uppercase font-black text-zinc-500 mb-4 tracking-widest">Aggregate Fidelity Indices</div>
                          <div className="flex items-end gap-2 mb-4">
                            <span className="text-4xl font-bold text-[#b8860b]">
                              {Math.round((totalScoreValue / 25) * 100)}
                            </span>
                            <span className="text-xs text-zinc-600 mb-1 font-black">%</span>
                          </div>
                          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.round((totalScoreValue / 25) * 100)}%` }}
                              transition={{ duration: 2, delay: 0.5 }}
                              className="h-full bg-[#b8860b]"
                            />
                          </div>
                        </div>
                        <div className="p-8 bg-white/[0.02] border border-white/5">
                          <div className="text-[9px] uppercase font-black text-zinc-500 mb-4 tracking-widest">Cognitive Bandwidth Reclaimed</div>
                          <div className="flex items-end gap-2 mb-4">
                            <span className="text-4xl font-bold text-white">
                              {Math.round(((Object.values(answers).reduce((a, b) => a + b, 0)) / 15) * 100)}
                            </span>
                            <span className="text-xs text-zinc-600 mb-1 font-black">%</span>
                          </div>
                          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${Math.round(((Object.values(answers).reduce((a, b) => a + b, 0)) / 15) * 100)}%` }}
                              transition={{ duration: 2, delay: 0.7 }}
                              className="h-full bg-white"
                            />
                          </div>
                        </div>
                      </section>

                      {/* Domain Calibration Bar Graphs */}
                      <section>
                        <div className="text-[10px] uppercase font-black text-zinc-600 mb-8 tracking-[0.4em] font-mono">Vertical Domain Calibration (1-5 Scale)</div>
                        <div className="grid grid-cols-1 gap-6">
                          {dScores.map((ds, i) => {
                            const def = rDetails.domainInsights[ds.domain]?.definition;
                            return (
                              <div key={i} className="group text-left">
                                <div className="flex items-center justify-between mb-3">
                                  <div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-1 font-mono">{ds.domain}</span>
                                    <span className="text-[9px] text-zinc-500 italic font-light font-serif">{def}</span>
                                  </div>
                                  <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <div 
                                        key={star} 
                                        className={`w-3 h-3 ${star <= ds.score ? 'bg-[#b8860b]' : 'bg-white/5'} transition-all`}
                                      />
                                    ))}
                                  </div>
                                </div>
                                <div className="h-[2px] w-full bg-white/5 relative overflow-hidden">
                                  <motion.div 
                                      initial={{ width: 0 }}
                                      animate={{ width: `${(ds.score / 5) * 100}%` }}
                                      transition={{ duration: 1, delay: 0.2 * i }}
                                      className="absolute top-0 left-0 h-full bg-[#b8860b]/40"
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </section>
                    </div>

                    <div className="lg:col-span-5">
                      <div className="bg-white/[0.03] border border-white/10 p-8 sm:p-10 relative h-full flex flex-col text-left">
                        <div className="absolute -top-3 -right-3">
                          <Lock className="w-8 h-8 text-[#b8860b] bg-[#111111] p-1.5 border border-[#b8860b]/30" />
                        </div>
                        <h4 className="text-[11px] font-black uppercase tracking-[0.3em] mb-8 text-zinc-600 font-mono">Locked Protocol Modules</h4>
                        <div className="space-y-4 flex-grow">
                          {[
                            { name: "The 90-Day Sovereign Roadmap", benefit: "Calibrate the system for autonomous strategic execution" },
                            { name: "Substrate Re-engineering Blueprint", benefit: "Convert operational energy into structural authority" },
                            { name: "Decision Velocity Calibration Matrix", benefit: "Reclaim 40% of strategic bandwidth for higher-order maneuvers" },
                            { name: "Institutional Permanence Protocol", benefit: "Ensure the vision becomes a structural inevitability" },
                            { name: "Authority Compounding Framework", benefit: "Scale the institution without cognitive dilution" }
                          ].map((item, i) => (
                            <div key={i} className="flex flex-col p-5 border border-white/5 bg-black/40 group cursor-not-allowed">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs text-zinc-400 font-medium tracking-wide">{item.name}</span>
                                <div className="text-[8px] font-black text-[#b8860b]/45 uppercase tracking-widest font-mono">Encrypted</div>
                              </div>
                              <div className="text-[9px] text-zinc-600 italic font-serif">{item.benefit}</div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-10 pt-8 border-t border-white/5">
                          <p className="text-[10px] text-zinc-700 leading-relaxed italic text-center font-serif">
                            Full recalibration requires access to the Sovereign Substrate. These modules are reserved for verified Principals.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Playbook Interactive Add-on Gate */}
                  <div className="my-16 p-8 sm:p-12 border border-[#b8860b]/40 bg-[#b8860b]/5 rounded-sm relative overflow-hidden text-left">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                      <Zap className="w-24 h-24 text-[#b8860b]" />
                    </div>
                    
                    {!playbookSubmitted ? (
                      !showPlaybookOnboard ? (
                        <div className="space-y-6">
                          <span className="text-[9px] uppercase font-black text-[#b8860b] tracking-[0.4em] block font-mono">
                            FREE VALUE ADD-ON GATEWAY
                          </span>
                          <h4 className="text-2xl sm:text-3xl font-bold text-white leading-tight font-serif">
                            Personalized Sovereignty Micro-Playbook
                          </h4>
                          <p className="text-zinc-300 text-sm italic font-light leading-relaxed font-serif">
                            Extract actionable standard operating parameters customized to your legacy preservation timeline and active operational constraints. Complete our fast 3-question profile to compile your free tactical playbook immediately.
                          </p>
                          <button
                            onClick={() => setShowPlaybookOnboard(true)}
                            className="px-8 py-4 bg-[#b8860b] hover:bg-white hover:text-black hover:shadow-2xl text-white text-[10px] font-black uppercase tracking-[0.2em] transition-all font-mono"
                          >
                            Customize My Playbook ➔
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-8">
                          <div>
                            <span className="text-[9px] uppercase font-black text-[#b8860b] tracking-[0.4em] block mb-2 font-mono">
                              STEP 2 OF 2: LEADERSHIP PROFILING
                            </span>
                            <h4 className="text-xl font-bold text-white font-serif">
                              Calibrate Executive Parameters
                            </h4>
                            <p className="text-zinc-400 text-xs italic font-light mt-1 font-serif">
                              Provide your high-stakes context to construct precise, objection-handling alignment gates.
                            </p>
                          </div>

                          <div className="space-y-6">
                            {/* Q1 */}
                            <div className="space-y-3">
                              <label className="text-[10px] font-black uppercase text-zinc-300 tracking-wider block font-mono">
                                1. Handover / Decentralization Horizon
                              </label>
                              <div className="grid sm:grid-cols-2 gap-3">
                                {[
                                  { val: 'Immediate / < 12 Months', label: 'Immediate (< 12 Months)' },
                                  { val: '1-3 Years', label: 'Medium Term (1-3 Years)' },
                                  { val: '3-5 Years', label: 'Strategic Horizon (3-5 Years)' },
                                  { val: 'No current plans', label: 'Continuous Active Principalship' }
                                ].map((opt) => (
                                  <button
                                    key={opt.val}
                                    type="button"
                                    onClick={() => setPlaybookAnswers({ ...playbookAnswers, handoverHorizon: opt.val })}
                                    className={`p-4 border text-left text-xs italic font-serif ${playbookAnswers.handoverHorizon === opt.val ? 'border-[#b8860b] bg-[#b8860b]/20 text-white font-bold' : 'border-white/5 bg-black/20 text-zinc-400 hover:border-white/20'}`}
                                  >
                                    {opt.label}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Q2 */}
                            <div className="space-y-3">
                              <label className="text-[10px] font-black uppercase text-zinc-300 tracking-wider block font-mono">
                                2. Primary Cognitive focus drain point
                              </label>
                              <div className="grid sm:grid-cols-2 gap-3">
                                {[
                                  { val: 'Departmental overlaps and personnel disputes', label: 'Overlaps & Disputes' },
                                  { val: 'Reviewing and approving tactical documents/designs', label: 'Tactical Approvals' },
                                  { val: 'Re-explaining strategic vision repetitively', label: 'Repetitive Alignment' },
                                  { val: 'Micro-managing operational outputs and standards', label: 'Operational Output Checks' }
                                ].map((opt) => (
                                  <button
                                    key={opt.val}
                                    type="button"
                                    onClick={() => setPlaybookAnswers({ ...playbookAnswers, focusBottleneck: opt.val })}
                                    className={`p-4 border text-left text-xs italic font-serif ${playbookAnswers.focusBottleneck === opt.val ? 'border-[#b8860b] bg-[#b8860b]/20 text-white font-bold' : 'border-white/5 bg-black/20 text-zinc-400 hover:border-white/20'}`}
                                  >
                                    {opt.label}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Q3 */}
                            <div className="space-y-3">
                              <label className="text-[10px] font-black uppercase text-zinc-300 tracking-wider block font-mono">
                                3. Current Key-Person Risk Profile
                              </label>
                              <div className="grid sm:grid-cols-2 gap-3">
                                {[
                                  { val: 'The organization would halt or drop speed drastically', label: 'Severe (Immediate Stall)' },
                                  { val: 'Delegation failures would erode client/stakeholder trust', label: 'Trust Erosion Exposure' },
                                  { val: 'Management layers would delay critical strategic moves', label: 'Strategic Latency' },
                                  { val: 'No visible slowdown, systems are fully autonomous', label: 'Zero Key-Person Risk' }
                                ].map((opt) => (
                                  <button
                                    key={opt.val}
                                    type="button"
                                    onClick={() => setPlaybookAnswers({ ...playbookAnswers, keyRiskLevel: opt.val })}
                                    className={`p-4 border text-left text-xs italic font-serif ${playbookAnswers.keyRiskLevel === opt.val ? 'border-[#b8860b] bg-[#b8860b]/20 text-white font-bold' : 'border-white/5 bg-black/20 text-zinc-400 hover:border-white/20'}`}
                                  >
                                    {opt.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>

                          {/* Submit Playbook Button */}
                          <div className="pt-4 text-center sm:text-left">
                            <button
                              onClick={async () => {
                                if (!playbookAnswers.handoverHorizon || !playbookAnswers.focusBottleneck || !playbookAnswers.keyRiskLevel) {
                                  alert("Please select an option for all 3 profiling dimensions to calibrate the playbook accurately.");
                                  return;
                                }
                                setIsGeneratingPlaybook(true);
                                try {
                                  await fetch('/api/contact', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                      name: identity.name,
                                      email: identity.email,
                                      organization: identity.organization,
                                      message: `Playbook Gated Profile Configured // Horizon: ${playbookAnswers.handoverHorizon}, Bottleneck: ${playbookAnswers.focusBottleneck}, Key Risk: ${playbookAnswers.keyRiskLevel}`,
                                      type: 'PLAYBOOK_CONFIGURED',
                                      playbookData: playbookAnswers
                                    })
                                  });
                                } catch (e) {
                                  console.error("Could not register rich lead metrics:", e);
                                }
                                
                                setTimeout(() => {
                                  setPlaybookSubmitted(true);
                                  setIsGeneratingPlaybook(false);
                                }, 1500);
                              }}
                              disabled={isGeneratingPlaybook}
                              className="w-full sm:w-auto px-12 py-5 bg-[#b8860b] hover:bg-white hover:text-black text-white text-[11px] font-black uppercase tracking-[0.3em] transition-all disabled:opacity-50 font-mono"
                            >
                              {isGeneratingPlaybook ? 'Compiling Playbook Framework...' : 'Authorize and Compile Customized Playbook'}
                            </button>
                          </div>
                        </div>
                      )
                    ) : (
                      // Generated Playbook Screen
                      <div className="space-y-10 animate-fade-in text-left">
                        <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <div>
                            <span className="text-[8px] uppercase font-black text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-sm border border-emerald-500/20 tracking-widest inline-block mb-2 font-mono">
                              CUSTOM TULC PLAYBOOK GENERATED
                            </span>
                            <h4 className="text-xl font-bold text-white font-serif">
                              Personalized Sovereignty Micro-Playbook
                            </h4>
                            <p className="text-xs text-zinc-500 italic font-mono uppercase mt-1">
                              ISSUED COMPLIMENTARY // ATTESTATION ID: PBC-{dossierId}
                            </p>
                          </div>
                          <button
                            onClick={() => window.print()}
                            className="text-[9px] font-bold uppercase tracking-widest border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-all flex items-center gap-2 font-mono"
                          >
                            <Download className="w-3 h-3" /> Print / Save Playbook
                          </button>
                        </div>

                        {/* Diagnostic Summary Recaps */}
                        <div className="grid sm:grid-cols-3 gap-6 text-xs p-6 bg-white/[0.02] border border-white/5 rounded-xs font-mono">
                          <div>
                            <span className="text-zinc-500 block uppercase tracking-widest text-[8px] font-bold mb-1">Horizon Range</span>
                            <span className="text-white italic font-semibold">{playbookAnswers.handoverHorizon}</span>
                          </div>
                          <div>
                            <span className="text-zinc-500 block uppercase tracking-widest text-[8px] font-bold mb-1">Focus Bottleneck</span>
                            <span className="text-white italic font-semibold">{playbookAnswers.focusBottleneck}</span>
                          </div>
                          <div>
                            <span className="text-zinc-500 block uppercase tracking-widest text-[8px] font-bold mb-1">Key-Person Risk</span>
                            <span className="text-white italic font-semibold">{playbookAnswers.keyRiskLevel}</span>
                          </div>
                        </div>

                        <div className="space-y-8">
                          <div>
                            <h5 className="text-xs font-bold text-[#b8860b] uppercase tracking-widest mb-4 font-mono">
                              Action Protocol Alpha: Mitigating {rDetails.attentionDomain1}
                            </h5>
                            <div className="p-6 bg-black/40 border border-white/5 space-y-4 font-serif rounded-xs">
                              <p className="text-zinc-300 text-xs italic font-light leading-relaxed">
                                Based on your bottleneck ("{playbookAnswers.focusBottleneck}"), we prescribe a structural circuit breaker to decouple your physical feedback from alignment validation:
                              </p>
                              <div className="space-y-3">
                                <div className="flex gap-3 items-start">
                                  <span className="bg-[#b8860b]/10 text-[#b8860b] font-mono text-[9px] px-1.5 py-0.5 rounded-sm shrink-0">Step 01</span>
                                  <p className="text-zinc-400 text-xs leading-relaxed">
                                    <strong>Protocol Quarantine</strong>: Implement an asymmetric review boundary. Instead of synchronizing in scheduled meetings, force team leads to submit recorded loom-briefs that follow a strict 2-minute decision parameter template.
                                  </p>
                                </div>
                                <div className="flex gap-3 items-start">
                                  <span className="bg-[#b8860b]/10 text-[#b8860b] font-mono text-[9px] px-1.5 py-0.5 rounded-sm shrink-0">Step 02</span>
                                  <p className="text-zinc-400 text-xs leading-relaxed">
                                    <strong>Decutting Thresholds</strong>: Define clear transaction limits. Any operational decision budget under $10,000 (or localized pivot under 2 weeks duration) is legally delegated to your secondary layer, with zero review gates allowed.
                                  </p>
                                </div>
                                <div className="flex gap-3 items-start">
                                  <span className="bg-[#b8860b]/10 text-[#b8860b] font-mono text-[9px] px-1.5 py-0.5 rounded-sm shrink-0">Step 03</span>
                                  <p className="text-zinc-400 text-xs leading-relaxed">
                                    <strong>Structural Verification</strong>: Conduct a mock separation drill—completely cut operational communication for 7 business days to test the structural boundaries, forcing the team to find their own institutional authority.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h5 className="text-xs font-bold text-[#b8860b] uppercase tracking-widest mb-4 font-mono">
                              Action Protocol Beta: Mitigating {rDetails.attentionDomain2}
                            </h5>
                            <div className="p-6 bg-black/40 border border-white/5 space-y-4 font-serif rounded-xs">
                              <p className="text-zinc-300 text-xs italic font-light leading-relaxed">
                                Your reported Risk level ("{playbookAnswers.keyRiskLevel}") outlines a critical exposure window for your legacy transition. Execute this cybernetic alignment cascade immediately:
                              </p>
                              <div className="space-y-3">
                                <div className="flex gap-3 items-start">
                                  <span className="bg-[#b8860b]/10 text-[#b8860b] font-mono text-[9px] px-1.5 py-0.5 rounded-sm shrink-0">Step 01</span>
                                  <p className="text-zinc-400 text-xs leading-relaxed">
                                    <strong>Legacy Hard-coding</strong>: Map out the top 5 repeating operational dilemmas. Establish written, immutable values-matrices that clearly mandate how the organization resolves conflicts, eliminating subjective guesswork by management.
                                  </p>
                                </div>
                                <div className="flex gap-3 items-start">
                                  <span className="bg-[#b8860b]/10 text-[#b8860b] font-mono text-[9px] px-1.5 py-0.5 rounded-sm shrink-0">Step 02</span>
                                  <p className="text-zinc-400 text-xs leading-relaxed">
                                    <strong>Asynchronous Alignment Gates</strong>: Shift alignment verification from synchronous reviews to automated programmatic reviews. The principal acts purely as the source of architectural rules, not the active supervisor of quality.
                                  </p>
                                </div>
                                <div className="flex gap-3 items-start">
                                  <span className="bg-[#b8860b]/10 text-[#b8860b] font-mono text-[9px] px-1.5 py-0.5 rounded-sm shrink-0">Step 03</span>
                                  <p className="text-zinc-400 text-xs leading-relaxed">
                                    <strong>Transition Milestone Calibration</strong>: Calibrate your handover timeline ("{playbookAnswers.handoverHorizon}"). Establish a monthly audit vector measuring the progressive reduction of physical escalations to the Founder's desk.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="pt-6 border-t border-white/10 text-center">
                          <p className="text-zinc-400 text-xs italic font-serif">
                            This micro-playbook is a tactical asset. To scale these rules into an immutable, self-regulating corporate operating system, initiate the In-depth Assessment below.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-16 border-t border-white/10 text-center">
                    <div className="max-w-2xl mx-auto">
                      <h5 className="text-2xl font-bold mb-6 text-white leading-tight font-serif pb-4">
                        The snapshot is complete. The solution is <span className="italic text-[#b8860b]">Architectural.</span>
                      </h5>
                      <p className="text-zinc-400 mb-12 text-base font-light italic leading-relaxed font-serif text-left">
                        This initial diagnostic is a Strategic Trailer—a snapshot of your current institutional substrate. The full Sovereign Model, reserved for paid Principals, identifies the precise calibration vectors through a comprehensive Voice Audit and Cross-Mapping of operational fidelity. Your organization is currently demonstrating architectural potential; the transition from Heroic Intervention to Institutional Sovereignty requires the full-fidelity recalibration found in the In-depth Assessment.
                      </p>
                      <div className="space-y-10">
                        {!isPaid ? (
                          <div className="bg-white/[0.03] border border-[#b8860b]/20 p-10 text-center">
                            <Lock className="w-10 h-10 text-[#b8860b] mx-auto mb-6" />
                            <h5 className="text-xl font-bold mb-4 text-white uppercase tracking-widest font-mono">In-depth Protocol Access Locked</h5>
                            <p className="text-zinc-400 mb-10 italic font-light leading-relaxed font-serif text-sm">
                              The dossier above is an Executive Preview. To maintain the integrity of the Sovereign Substrate, a one-time institutional verification fee is required to unlock the full In-depth Architectural Assessment and the Sovereign Roadmap. This payment redirects you via Razorpay to the secure Sovereign Portal app—the definitive environment for institutional permanence.
                            </p>
                            
                            <button 
                              onClick={handleRazorpayPayment}
                              className="group relative px-12 py-6 bg-[#b8860b] text-white text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all shadow-2xl flex items-center justify-center gap-4 mx-auto font-mono"
                            >
                              <span>Initiate Verification & Unlock Indepth Assessment</span>
                              <ExternalLink className="w-4 h-4" />
                            </button>

                            {/* VIP Invoice Fallback Option */}
                            <div className="mt-8 pt-8 border-t border-white/5">
                              {!showVIPInvoicePanel ? (
                                <button
                                  onClick={() => setShowVIPInvoicePanel(true)}
                                  className="text-zinc-400 hover:text-white text-[10px] font-semibold uppercase tracking-widest underline decoration-zinc-500 hover:decoration-white transition-all font-mono"
                                >
                                  Prefer Invoice Handshake / Offline Ledger? Request VIP Invoice Protocol
                                </button>
                              ) : (
                                <motion.div 
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="mt-6 max-w-md mx-auto p-6 bg-black/60 border border-zinc-800 text-left"
                                >
                                  <h6 className="text-[10px] font-black uppercase text-[#b8860b] tracking-widest mb-2 font-mono flex items-center gap-2">
                                    <Shield className="w-3.5 h-3.5 text-[#b8860b]" /> Offline Sovereign Wire Request
                                  </h6>
                                  <p className="text-[11px] text-zinc-400 font-light italic leading-relaxed mb-4 font-serif">
                                    Should your corporate treasury govern strict transactional card limits or prefer a direct wire invoice, register your details. Our office will establish a secure settlement handshake within 4 hours.
                                  </p>
                                  
                                  {!vipInvoiceSuccess ? (
                                    <form onSubmit={handleVIPInvoiceSubmit} className="space-y-4">
                                      <div>
                                        <label className="text-[8px] font-black uppercase text-zinc-500 tracking-wider block mb-1 font-mono">Strategic Phone / Direct Wire Coordinate</label>
                                        <input
                                          type="text"
                                          placeholder="+1 (555) 0192 / WhatsApp Coordinate"
                                          value={vipInvoiceInputs.phone}
                                          onChange={(e) => setVipInvoiceInputs({ ...vipInvoiceInputs, phone: e.target.value })}
                                          className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 text-white text-xs italic font-serif focus:outline-none focus:border-[#b8860b]"
                                        />
                                      </div>
                                      <div>
                                        <label className="text-[8px] font-black uppercase text-zinc-500 tracking-wider block mb-1 font-mono">Preferred Secure delivery mode</label>
                                        <select
                                          value={vipInvoiceInputs.mode}
                                          onChange={(e) => setVipInvoiceInputs({ ...vipInvoiceInputs, mode: e.target.value })}
                                          className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 text-white text-xs italic font-serif focus:outline-none focus:border-[#b8860b]"
                                        >
                                          <option value="Email">Secure Corporate Email</option>
                                          <option value="WhatsApp">Direct WhatsApp Dispatch</option>
                                          <option value="Signal">Private Signal Protocol</option>
                                        </select>
                                      </div>
                                      <div>
                                        <label className="text-[8px] font-black uppercase text-zinc-500 tracking-wider block mb-1 font-mono">Special ledger Comments</label>
                                        <textarea
                                          placeholder="e.g. Requires corporate cost center PO references..."
                                          value={vipInvoiceInputs.comments}
                                          onChange={(e) => setVipInvoiceInputs({ ...vipInvoiceInputs, comments: e.target.value })}
                                          className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 text-white text-xs italic font-serif focus:outline-none focus:border-[#b8860b] h-16 resize-none"
                                        />
                                      </div>
                                      
                                      <div className="flex gap-2">
                                        <button
                                          type="submit"
                                          disabled={isSubmittingVIPWire}
                                          className="flex-1 py-3 bg-[#b8860b] hover:bg-white hover:text-black font-mono font-bold uppercase text-[9px] tracking-wider text-white transition-all disabled:opacity-50"
                                        >
                                          {isSubmittingVIPWire ? "Registering..." : "Transmit Private Wire Request"}
                                        </button>
                                        <button
                                          type="button"
                                          onClick={() => setShowVIPInvoicePanel(false)}
                                          className="px-3 py-3 border border-zinc-800 hover:border-zinc-600 font-mono text-[9px] text-zinc-400 hover:text-white uppercase tracking-wider transition-all"
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </form>
                                  ) : (
                                    <div className="p-4 bg-[#b8860b]/10 border border-[#b8860b]/20 text-center">
                                      <Check className="w-6 h-6 text-[#b8860b] mx-auto mb-2" />
                                      <span className="text-[9px] font-mono uppercase text-white font-bold tracking-widest block mb-1">Invoice Protocol Calibrated</span>
                                      <p className="text-[10px] text-zinc-400 italic font-serif">
                                        Suchita&apos;s architectural office is compiling your coordinates. An invoice ledger packet will reach your terminal shortly. Thank you.
                                      </p>
                                    </div>
                                  )}
                                </motion.div>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                            <div className="p-6 bg-[#b8860b]/10 border border-[#b8860b]/30 text-center">
                              <div className="text-[10px] uppercase text-[#b8860b] tracking-[0.4em] font-black mb-2 font-mono">Verification Initiated</div>
                              <div className="text-xs text-zinc-400 italic font-serif">Access to the Indepth Assessment and Sovereign Portal is now authorized.</div>
                            </div>

                            <a 
                              href="https://ai.studio/apps/bc205532-cdb0-43d3-a8fb-919809372614"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group relative px-12 py-10 bg-[#b8860b] text-white text-[13px] font-black uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all duration-500 shadow-[0_30px_60px_rgba(184,134,11,0.4)] flex items-center justify-center gap-8 mx-auto overflow-hidden no-underline border border-[#b8860b] font-mono"
                            >
                              <span className="relative z-10">Access Indepth Assessment</span>
                              <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-3 transition-transform" />
                              <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                            </a>
                            
                            <div className="flex flex-col items-center gap-3">
                              <div className="text-[10px] uppercase text-zinc-400 tracking-[0.6em] font-black font-mono font-sans">Institutional Access Node:</div>
                              <a 
                                href="https://ai.studio/apps/bc205532-cdb0-43d3-a8fb-919809372614"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#b8860b] text-sm font-mono hover:underline tracking-[0.2em] bg-white/5 px-6 py-3 border border-white/10"
                              >
                                Sovereign Portal Authority
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="mt-12 text-[9px] uppercase text-zinc-600 tracking-[0.5em] font-black font-mono">
                        Dispatching Verification to: {identity.email}
                      </div>

                      {/* Sovereign Calibration badge widget area */}
                      <div className="mt-16 pt-12 border-t border-white/5 text-center">
                        <div className="max-w-xl mx-auto">
                          <span className="text-[8px] uppercase font-black text-[#b8860b] tracking-[0.4em] block mb-4 font-mono">
                            INSTITUTIONAL CALIBRATION VERIFICATION BADGE
                          </span>
                          <h6 className="text-[14px] font-bold text-white mb-3 font-serif">
                            Affirm Your Sovereign Calibrated Status
                          </h6>
                          <p className="text-zinc-500 text-xs italic font-serif font-light mb-8 leading-relaxed max-w-md mx-auto text-left">
                            High-governance firms receive our calibrated seal of alignment. Embed this dynamic high-fidelity SVG badge onto your global corporate trust page or investor relations terminal. Each embed directly links to our root registry, building undisputed brand recognition and viral link authority.
                          </p>
                          
                          <div className="flex flex-col md:flex-row items-center gap-8 justify-center bg-black/30 border border-white/5 p-8 rounded-sm">
                            {/* SVG Badge rendering */}
                            <div className="shrink-0">
                              <svg width="120" height="120" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto filter drop-shadow-[0_10px_20px_rgba(184,134,11,0.15)]">
                                <circle cx="100" cy="100" r="94" stroke="#b8860b" strokeWidth="2" strokeDasharray="4 2" />
                                <circle cx="100" cy="100" r="88" stroke="#1f1f1f" strokeWidth="1" />
                                <circle cx="100" cy="100" r="82" stroke="#b8860b" strokeWidth="1" opacity="0.4" />
                                <circle cx="100" cy="100" r="76" fill="#111111" />
                                <path d="M100 45 L113 75 L145 75 L119 94 L130 125 L100 105 L70 125 L81 94 L55 75 L87 75 Z" fill="#b8860b" fillOpacity="0.15" stroke="#b8860b" strokeWidth="1.5" />
                                <path d="M100 55 L109 78 L133 78 L114 92 L121 115 L100 101 L79 115 L86 92 L67 78 L91 78 Z" fill="#b8860b" />
                                <path d="M60 100 A40 40 0 0 0 140 100" stroke="#b8860b" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
                                <defs>
                                  <path id="badgeTextPath" d="M35,100 a65,65 0 1,1 130,0 a65,65 0 1,1 -130,0" />
                                </defs>
                                <text fill="#999" fontSize="9" fontWeight="bold" letterSpacing="0.2em" fontFamily="monospace">
                                  <textPath href="#badgeTextPath" startOffset="0%">
                                    • THE UNBOUNDED LEADERSHIP CO. • SYSTEMIC SOVEREIGNTY CALIBRATED
                                  </textPath>
                                </text>
                              </svg>
                            </div>
                            
                            {/* Embed Code output */}
                            <div className="w-full text-left font-mono">
                              <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest block mb-2">SECURE EMBED CODE (IFRAME HTML)</span>
                              <div className="relative">
                                <textarea
                                  readOnly
                                  value={`<div style="text-align: center; margin: 20px 0;"><a href="https://theunboundedleadership.com" target="_blank" style="text-decoration: none;"><img src="https://theunboundedleadership.com/assets/badges/calibrated.svg" alt="The Unbounded Leadership Co. | Sovereign Sovereignty Calibration Seal" width="180" height="180" style="border: none;" /></a></div>`}
                                  className="w-full h-24 bg-zinc-950 border border-zinc-200 p-3 rounded-xs text-[9px] text-zinc-400 select-all focus:outline-none focus:border-[#b8860b] leading-relaxed resize-none cursor-text scrollbar-thin overflow-auto"
                                />
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(`<div style="text-align: center; margin: 20px 0;"><a href="https://theunboundedleadership.com" target="_blank" style="text-decoration: none;"><img src="https://theunboundedleadership.com/assets/badges/calibrated.svg" alt="The Unbounded Leadership Co. | Sovereign Sovereignty Calibration Seal" width="180" height="180" style="border: none;" /></a></div>`);
                                    setBadgeCopySuccess(true);
                                    setTimeout(() => setBadgeCopySuccess(false), 2000);
                                  }}
                                  className="absolute bottom-2 right-2 p-1.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white rounded-xs transition-colors"
                                  title="Copy code to clipboard"
                                >
                                  {badgeCopySuccess ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5" />
                                  )}
                                </button>
                              </div>
                              <span className="text-[8px] text-zinc-600 block mt-2">
                                Copy and paste this snippet to secure backlinks between your server node and our high-authority directory.
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Assessment;
