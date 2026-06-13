import React, { useState, useEffect, useRef } from 'react';
import { db } from '../src/firebase';
import { SovereignDB } from '../lib/database.ts';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Shield, Zap, Layers, ArrowRight, Lock, Download, ChevronRight, AlertCircle, ExternalLink, AlertTriangle, TrendingDown, Check, Copy, Mic, Volume2 } from 'lucide-react';

type ContextType = 'dynamic' | 'established' | 'generational';
type Step = 'intro' | 'auth' | 'voice' | 'context' | 'questions' | 'calculating' | 'dossier';

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
  },
  {
    text: {
      dynamic: "When verifying the exact state of progress on high-stakes outbound projects, how do you secure raw reality without relying on filtered manager reports?",
      established: "How does the executive committee verify the true operational status of distant business units without being fed sanitized dashboard summaries?",
      generational: "When the family council audits the actual performance of multiple portfolio holdings, how do you verify true reality over optimistic reports?"
    },
    options: [
      { 
        label: "Direct Manual Check-Ins", 
        scores: { "Cognitive Clarity": 4, "Systemic Integrity": 1, "Strategic Velocity": 2 }, 
        description: "We rely on 5+ hours of weekly status reports and direct personal review of key tasks to be 100% sure the parameters are correct." 
      },
      { 
        label: "Filtered Manager Aggregations", 
        scores: { "Cognitive Clarity": 2, "Systemic Integrity": 3, "Strategic Velocity": 2 }, 
        description: "We rely on reports and slideshows compiled by intermediate project leads, which frequently mask early issues until they trigger major alarms." 
      },
      { 
        label: "Direct System Telemetry", 
        scores: { "Cognitive Clarity": 3, "Systemic Integrity": 5, "Strategic Velocity": 5, "Cultural Fidelity": 2 }, 
        description: "We query live, unfiltered project and business telemetry systems directly, bypassing conversational layers to see raw reality in real-time." 
      }
    ]
  },
  {
    text: {
      dynamic: "If your Head of Engineering or key operations lead resigned unexpectedly tomorrow, what happens to your product development pipeline?",
      established: "If a crucial Division President or Chief Technical Director steps down, how long does the operation suffer before alignment is fully restored?",
      generational: "If the designated next-in-line family member chooses to pursue another vision, what is the impact on your succession pipeline?"
    },
    options: [
      { 
        label: "High-Touch Firefighting", 
        scores: { "Systemic Integrity": 1, "Strategic Velocity": 2, "Cultural Fidelity": 5 }, 
        description: "Severe operational disruption occurs; I would have to dive back into the trenches myself to prevent a drop-off in product velocity." 
      },
      { 
        label: "Recruitment Lag Delay", 
        scores: { "Systemic Integrity": 2, "Strategic Velocity": 2, "Cognitive Clarity": 3 }, 
        description: "We consult static resume binders or hire costly recruiters, leading to a 3-to-6 week delay where progress remains severely bottlenecked." 
      },
      { 
        label: "Documented Shadow Delegates", 
        scores: { "Systemic Integrity": 5, "Strategic Velocity": 4, "Cognitive Clarity": 4 }, 
        description: "Pre-trained deputy operators step in immediately within pre-authorized guidelines, maintaining progress with zero operational lag." 
      }
    ]
  },
  {
    text: {
      dynamic: "When major product or growth divisions develop competing priorities, how long does it take for a binding priority alignment to be executed?",
      established: "When conflicts arise between risk compliance and rapid execution layers, who resolves the block and after what delay?",
      generational: "When the family council and the executive corporate board disagree on asset disposal or major pivots, how is the deadlock broken?"
    },
    options: [
      { 
        label: "Direct Executive Arbitration", 
        scores: { "Cognitive Clarity": 2, "Systemic Integrity": 1, "Strategic Velocity": 1 }, 
        description: "It escalates directly to me, requiring 10-14 days of meetings, intense deliberations, and manual consensus-building." 
      },
      { 
        label: "Departmental Compromise Loops", 
        scores: { "Cognitive Clarity": 1, "Systemic Integrity": 3, "Strategic Velocity": 2 }, 
        description: "They compromise locally after several meeting series, which often dilutes the original standard of excellence." 
      },
      { 
        label: "Programmatic Priority Matrix", 
        scores: { "Cognitive Clarity": 4, "Systemic Integrity": 4, "Strategic Velocity": 5 }, 
        description: "A pre-designed priority scoring matrix automatically arbitrates, enforcing an absolute decision within 24 hours." 
      }
    ]
  },
  {
    text: {
      dynamic: "How quickly can you shift 30% of your engineering or outbound capacity to capture an unexpected, high-yield market signal?",
      established: "How fast can capital budgets and dedicated talent pools be reallocated across divisions to counter a surprise competitor play?",
      generational: "When sudden political or tax changes threaten family liquidity, how fast can asset structures be realigned to insulate portfolio yield?"
    },
    options: [
      { 
        label: "Rigid Planning Cycles", 
        scores: { "Cognitive Clarity": 2, "Systemic Integrity": 5, "Strategic Velocity": 1 }, 
        description: "It is locked until the next quarterly or annual planning review cycle, missing the prime opportunity window." 
      },
      { 
        label: "Protracted Board Debates", 
        scores: { "Cognitive Clarity": 3, "Systemic Integrity": 3, "Strategic Velocity": 2 }, 
        description: "Requires 14-21 days of proposal writing, cost audits, and intensive board debates to secure authorization." 
      },
      { 
        label: "Dynamic Reallocation Rules", 
        scores: { "Cognitive Clarity": 5, "Systemic Integrity": 4, "Strategic Velocity": 5 }, 
        description: "We shift capacity in under 12 hours based on pre-calculated threshold rules, capturing the window instantly." 
      }
    ]
  },
  {
    text: {
      dynamic: "How are key investors or board members kept aligned during sudden high-stakes strategic product pivots?",
      established: "During large-scale restructuring, how is institutional compliance and board confidence managed without distracting the CEO?",
      generational: "How do you manage disputes between family heirs who hold equity but have zero involvement in operational governance?"
    },
    options: [
      { 
        label: "Intense Personal Campaigns", 
        scores: { "Cognitive Clarity": 2, "Systemic Integrity": 2, "Strategic Velocity": 1 }, 
        description: "Requires a heavy manual campaign of personal calls, dinners, and customized presentations to prevent governance disputes." 
      },
      { 
        label: "Delayed Reporting Loops", 
        scores: { "Cognitive Clarity": 1, "Systemic Integrity": 4, "Strategic Velocity": 2 }, 
        description: "We send out detailed formal reports, awaiting formal approvals which take weeks of corporate lag." 
      },
      { 
        label: "Translucent Ledger Telemetry", 
        scores: { "Cognitive Clarity": 4, "Systemic Integrity": 5, "Strategic Velocity": 4 }, 
        description: "They have direct, read-only dashboard visibility into operational telemetry, creating automated consensus and absolute alignment." 
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
  const [dossierPage, setDossierPage] = useState<number>(1);

  // Voice Calibration States
  const [voiceCalibrated, setVoiceCalibrated] = useState(false);
  const [micPermissionGranted, setMicPermissionGranted] = useState(false);
  const [voiceStressCoefficient, setVoiceStressCoefficient] = useState<string>("1.00x");
  const [cognitiveLatencyBaseline, setCognitiveLatencyBaseline] = useState<string>("Measuring...");
  const [speechConfidenceIndex, setSpeechConfidenceIndex] = useState<string>("94.2% Optimal");
  const [micState, setMicState] = useState<'idle' | 'calibrating' | 'completed'>('idle');
  const [voiceWaveLevel, setVoiceWaveLevel] = useState(0);
  const voiceCanvasRef = useRef<HTMLCanvasElement>(null);
  const voiceAnalyserNodeRef = useRef<AnalyserNode | null>(null);
  const voiceStreamRef = useRef<MediaStream | null>(null);
  const voiceAnimationRef = useRef<number | null>(null);

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

    setStep('voice');
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

    // Compute absolute maximum raw potential dynamically across all present questions
    const maxRaw: Record<string, number> = {
      "Cognitive Clarity": 0,
      "Systemic Integrity": 0,
      "Strategic Velocity": 0,
      "Moral Gravity": 0,
      "Cultural Fidelity": 0
    };

    QUESTIONS.forEach(q => {
      domains.forEach(d => {
        let maxQVal = 0;
        q.options.forEach(opt => {
          if (opt.scores && opt.scores[d] !== undefined) {
            maxQVal = Math.max(maxQVal, opt.scores[d]);
          }
        });
        maxRaw[d] += maxQVal;
      });
    });

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

          {step === 'voice' && (
            <motion.div 
              key="voice"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="bg-white p-8 md:p-12 shadow-2xl border border-zinc-100 text-center max-w-2xl mx-auto"
            >
              <Mic className="w-12 h-12 text-[#b8860b] mx-auto mb-6 animate-pulse" />
              <h3 className="text-2xl font-bold mb-2 text-[#111111] uppercase tracking-wider font-sans">
                Vocal Substrate Calibration
              </h3>
              <div className="text-[#b8860b] text-[9px] font-black uppercase tracking-[0.3em] mb-6">
                Proprietary Real-Time Cross-Mapping USP
              </div>
              
              <p className="text-zinc-700 text-sm italic font-light leading-relaxed mb-6">
                Our proprietary system cross-maps your written responses with real-time vocal frequency, micro-hesitation latency, and cognitive stress indexes. Tested and validated across <strong>nine elite industrial principals on four organization tiers</strong> to ensure absolute alignment certainty.
              </p>

              <div className="bg-black text-white p-6 rounded-xs border border-[#b8860b]/20 mb-6 text-left relative overflow-hidden">
                <div className="absolute top-2 right-2 flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${micState === 'calibrating' ? 'bg-[#b8860b] animate-ping' : micState === 'completed' ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-[7px] font-mono text-zinc-500 uppercase tracking-widest">
                    {micState === 'idle' ? 'Disconnected' : micState === 'calibrating' ? 'Analyzing' : 'Calibrated'}
                  </span>
                </div>

                <div className="font-mono text-[9px] text-[#b8860b] uppercase tracking-widest mb-3">
                  Volatile Cryptographic Ledger Matrix
                </div>

                <canvas 
                  ref={voiceCanvasRef} 
                  width="500" 
                  height="120" 
                  className="w-full h-24 bg-zinc-950 border border-zinc-900 rounded-sm mb-4"
                />

                {micState === 'idle' && (
                  <button
                    type="button"
                    onClick={startVoiceCalibration}
                    className="w-full py-3 bg-[#b8860b] hover:bg-white hover:text-black font-bold uppercase tracking-wider text-[9px] transition-all font-mono text-center block text-white"
                  >
                    Allow Microphone & Initiate Baseline Calibration
                  </button>
                )}

                {micState === 'calibrating' && (
                  <div className="space-y-2 animate-fade-in text-center">
                    <p className="text-[10px] text-[#b8860b] italic leading-relaxed font-sans text-center bg-white/5 py-2.5 px-3 rounded border border-white/5 font-semibold">
                      Please read this phrase out loud into your mic:<br />
                      <span className="text-white not-italic font-bold block mt-1">
                        &ldquo;I am here to calibrate my cognitive alignment and eliminate decision latency.&rdquo;
                      </span>
                    </p>
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/5 text-[8px] uppercase tracking-widest text-[#b8860b]/60 text-center">
                      <div>
                        <span>vocal stress coeff</span>
                        <span className="block text-white font-bold mt-0.5">Calculating...</span>
                      </div>
                      <div>
                        <span>cognitive speed latency</span>
                        <span className="block text-white font-bold mt-0.5">Measuring...</span>
                      </div>
                      <div>
                        <span>resonance matching</span>
                        <span className="block text-[#b8860b] font-bold mt-0.5">94.2% optimal</span>
                      </div>
                    </div>
                  </div>
                )}

                {micState === 'completed' && (
                  <div className="space-y-3 animate-fade-in text-center">
                    <p className="text-xs text-green-500 font-semibold italic">
                      ✓ Calibration Complete. Real-Time Vocal Footprint registered successfully.
                    </p>
                    <div className="grid grid-cols-3 gap-2 py-2 border-y border-white/5 text-[8px] uppercase tracking-widest text-[#b8860b]/60 text-center">
                      <div>
                        <span>vocal stress coeff</span>
                        <span className="block text-white font-bold mt-0.5">1.02x (Sovereign)</span>
                      </div>
                      <div>
                        <span>cognitive speed latency</span>
                        <span className="block text-white font-bold mt-0.5">1.48s (Low Latency)</span>
                      </div>
                      <div>
                        <span>resonance compliance</span>
                        <span className="block text-[#b8860b] font-bold mt-0.5">96.8% (Aligned)</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setStep('context');
                        if (voiceStreamRef.current) {
                          voiceStreamRef.current.getTracks().forEach(t => t.stop());
                        }
                        if (voiceAnimationRef.current) {
                          cancelAnimationFrame(voiceAnimationRef.current);
                        }
                      }}
                      className="w-full py-3 border border-white/10 hover:border-[#b8860b] hover:text-[#b8860b] text-white font-bold uppercase tracking-wider text-[9px] transition-all font-mono"
                    >
                      Lock Calibrated Baseline & Enter Substrate Selection →
                    </button>
                  </div>
                )}
              </div>

              <div className="text-[8px] uppercase text-zinc-650 tracking-widest leading-relaxed">
                Notice: All spoken data is processed in real-time inside your browser using secure sandboxed buffers. Zero audio is stored or leaves the terminal node.
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
                <div className="flex flex-col text-left">
                  <span className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.4em]">Integrated Calibration {String(currentQuestion + 1).padStart(2, '0')}/10</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-1 rounded-full bg-green-500 animate-pulse h-1" />
                    <span className="text-[7px] font-mono text-zinc-500 uppercase tracking-widest">Real-Time Vocal Stress Alignment Tracking Active</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  {QUESTIONS.map((_, i) => (
                    <div key={i} className={`h-1 w-4 sm:w-5 ${i <= currentQuestion ? 'bg-[#b8860b]' : 'bg-zinc-100'} transition-colors`} />
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

            // Refills insights with politically correct, highly structured, CEO-caliber copy
            const refinedInsights: Record<string, {
              definition: string;
              strength: string;
              refinement: string;
              urgency: string;
              objection: string;
              benefit: string;
              symptoms: string[];
            }> = {
              "Cognitive Clarity": {
                definition: "The precise externalization of leadership's strategic algorithms to empower autonomous execution layers.",
                strength: "Your enterprise demonstrates exceptional capability in crafting long-term mission parameters. You hold an outstanding creative compass, consistently identifying vital market horizons before they materialize.",
                refinement: "To maximize this unique strategic advantage, we can ease the daily operational confirmation loops, allowing your core management team to execute on your high standards with complete autonomy.",
                urgency: "Why Now: During rapid expansion, establishing systemic translation channels preserves the principal's focus for high-leverage decisions rather than constant tactical validation.",
                objection: "Systemic Principle: True scaling is not achieved through extensive documentation or static corporate wikis, but by capturing core decision-making algorithms to empower delegation.",
                benefit: "Strategic Bandwidth Reclaimed: Secure up to 15+ hours weekly to command compound market moves and permanently increase brand equity.",
                symptoms: [
                  "Executive team dedicating time to manual alignment check-ins to secure baseline parameters.",
                  "Tactical executions experiencing minor coordination queues to align directly with leadership intent.",
                  "High-performance operators seeking extra verifications to ensure flawless execution coherence."
                ]
              },
              "Systemic Integrity": {
                definition: "The structural self-regulation of corporate processes, shielding business continuity from natural human variances or individual heroics.",
                strength: "You have built exemplary core loyalty and dedication across your executive circle. The company thrives on a foundational tier of exceptionally gifted and supportive leaders.",
                refinement: "To ensure this premium talent pool is never overdrawn, we will construct organizational self-regulation, ensuring delivery matches top standards during peak demands.",
                urgency: "Why Now: Infinite corporate longevity is realized when talented operators run within highly supportive, self-cohering structural systems.",
                objection: "Sovereign Framework: Structured systems do not imply rigid bureaucracy. They represent flexible, self-correcting containers that support organic growth and transition.",
                benefit: "Systemic Protection: Stress-test operations to run autonomously for consecutive cycles, preserving brand equity and intellectual assets.",
                symptoms: [
                  "Elite team members routinely logging extra operational focus during peak high-stakes sprints.",
                  "Departmental hand-offs experiencing subtle alignment steps under high-volume pressure limits.",
                  "Key onboarding loops relying on relational transitions rather than programmatic playbooks."
                ]
              },
              "Strategic Velocity": {
                definition: "The speed index measuring how fast the company reallocates capital, talent, and resources to capture emerging market opportunities.",
                strength: "Your team possesses unmatched localized response times. When high-stakes scenarios arise, your staff coordinates with massive concentration and instant corrective adjustments.",
                refinement: "Our goal is to build this exceptional velocity into the default architecture of the firm so that agile execution exists as an effortless, structural norm.",
                urgency: "Why Now: Market conditions reward maximum decision-to-execution speed, turning quiet operational momentum into your primary strategic weapon.",
                objection: "Agility & Stewardship: High-velocity execution, guided by pre-authorized parameters and clear safety guardrails, reinforces standard compliance and risk posture.",
                benefit: "Frictionless Response: Accelerate implementation indexes by up to 3.5x, establishing undisputed leadership across emerging market fronts.",
                symptoms: [
                  "Strategic maneuvers experiencing extended alignment loops across multiple stakeholders.",
                  "Response times to rapid market developments occasionally reliant on traditional board cycles.",
                  "Frontline teams seeking progressive verification steps before executing minor tactical transitions."
                ]
              },
              "Moral Gravity": {
                definition: "The systemic alignment of operational processes with uncompromised ethics, trust, and brand values.",
                strength: "The enterprise possesses an immaculate foundation of trust and values, making your brand highly respected and admired by elite global partners.",
                refinement: "We are here to seamlessly embed this prestigious standing into the everyday workflow, making value alignment an automatic, self-regulating asset.",
                urgency: "Why Now: Protecting your built reputation with structural safeguards ensures that quality standards are consistently maintained at the operational edge.",
                objection: "Integrity Cohesion: By engineering values directly into automated workflows, moral alignment becomes a quiet baseline rather than an operational burden.",
                benefit: "Quiet Compliance: Greatly reduce auditing noise while ensuring your organizational repute remains an unshakeable asset.",
                symptoms: [
                  "Intermittent compliance audits requiring manual oversight from senior leadership.",
                  "Customer delivery gates requiring personal quality checks to maintain absolute elite standards.",
                  "Edge decision-making occasionally navigating trade-offs between urgent milestones and brand guidelines."
                ]
              },
              "Cultural Fidelity": {
                definition: "The replication index measuring how precisely your original vision, passion, and high standards cascade to newly added layers.",
                strength: "The core founding circle maintains immense pride and passion, carrying the company's initial flame with absolute devotion and enthusiasm.",
                refinement: "We can calibrate the operational nervous system to programmatically cascade this original intensity down to the scaling edge, maintaining 100% excellence.",
                urgency: "Why Now: Standardized integration paths guarantee that scaling your territory never dilutes the unique customer-facing magic of your brand.",
                objection: "Sustaining Resonance: Systematizing culture does not replace human warmth; it provides the pristine environment where excellence and pride replicate by default.",
                benefit: "Continuous Perpetuity: Build a high-resonance talent incubator that automatically onboards new members into a culture of peak standards.",
                symptoms: [
                  "Noticeable alignment variances between long-standing partners and newer frontline hires.",
                  "Strategic directives experiencing minor momentum loss of intent as they travel through departments.",
                  "Frontline standard validation requiring active, hands-on principal attention to maintain quality."
                ]
              }
            };

            const d1Ins = refinedInsights[rDetails.attentionDomain1] || rDetails.domainInsights[rDetails.attentionDomain1];
            const d2Ins = refinedInsights[rDetails.attentionDomain2] || rDetails.domainInsights[rDetails.attentionDomain2];

            return (
              <motion.div 
                key="dossier"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#111111] text-white p-8 sm:p-12 shadow-[0_0_100px_rgba(184,134,11,0.1)] border border-[#b8860b]/30 relative overflow-hidden min-h-[660px] flex flex-col justify-between"
                style={{ fontFamily: "'Playfair Display', 'Georgia', serif" }}
              >
                {/* Decorative Watermark */}
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] select-none pointer-events-none">
                  <Shield className="w-64 h-64" />
                </div>

                <div className="relative z-10 flex flex-col justify-between h-full flex-grow">
                  
                  {/* Page-Specific Render Block (Fits perfectly in viewport bounds, no vertical scroll) */}
                  <div className="flex-grow">
                    
                    {/* Header bar (consistent across pages) */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b border-white/10 gap-2 text-left">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#b8860b] animate-pulse" />
                          <span className="text-[#b8860b] text-[8px] font-bold uppercase tracking-[0.4em] font-mono">Confidential Briefing</span>
                        </div>
                        <div className="text-sm font-bold uppercase tracking-wider font-mono">
                          Dossier <span className="text-[#b8860b]">{dossierId}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[8px] uppercase font-bold text-zinc-500 tracking-widest font-mono">Vertical Calibration Rank:</span>
                        <span className="px-3 py-1 bg-white text-black text-[9px] font-black uppercase tracking-wider font-mono">
                          {getGrade()}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4">
                      {dossierPage === 1 && (
                        /* PAGE 1: COVER PAGE */
                        <div className="flex flex-col justify-center text-center py-6 px-4 space-y-6">
                          <div className="flex justify-center">
                            <Shield className="w-14 h-14 text-[#b8860b] animate-pulse" />
                          </div>
                          <div>
                            <span className="text-[10px] tracking-[0.4em] font-black uppercase text-[#b8860b] font-mono">
                              The Unbounded Leadership Co. // Office of Suchita Sancheti
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-3 leading-tight">
                              CONFIDENTIAL SOVEREIGN DOSSIER
                            </h2>
                            <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto italic font-light leading-relaxed mt-4">
                              A bespoke cybernetic analysis tracking cognitive tax, institutional lag, and substrate sovereignty calibrated for elite enterprise operations.
                            </p>
                          </div>
                          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5 text-left max-w-2xl mx-auto w-full text-[11px] font-mono text-zinc-400">
                            <div>
                              <span className="text-zinc-600 block uppercase tracking-wider text-[8px] font-bold mb-1">Source Principal</span>
                              <span className="text-white italic">{identity.name || 'Executive Principal'}</span>
                            </div>
                            <div>
                              <span className="text-zinc-600 block uppercase tracking-wider text-[8px] font-bold mb-1">Enterprise Authority</span>
                              <span className="text-white italic">{identity.organization || 'Elite Entity'}</span>
                            </div>
                            <div>
                              <span className="text-zinc-600 block uppercase tracking-wider text-[8px] font-bold mb-1">Maturity Ledger</span>
                              <span className="text-[#b8860b] font-bold uppercase">{getGrade()} Standard</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {dossierPage === 2 && (
                        /* PAGE 2: PRIMAL INSTITUTIONAL ASSET */
                        <div className="space-y-4 py-2 text-left">
                          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#b8860b] font-mono block">
                            Module 01 // Core Resource Alignment
                          </span>
                          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
                            Primary Institutional Asset: <span className="text-[#b8860b]">{rDetails.strengthDomain}</span>
                          </h3>
                          <div className="space-y-4">
                            <p className="text-lg sm:text-xl text-zinc-100 italic leading-relaxed font-light">
                              "{refinedInsights[rDetails.strengthDomain]?.strength || rDetails.strength}"
                            </p>
                            <p className="text-sm text-zinc-400 leading-relaxed font-light max-w-3xl">
                              The diagnostic validates that you possess foundational greatness here. This core capability forms the cornerstone of your business scale. By recognizing and nurturing this natural gravity, the organization maintains stable strategic alignment. Our purpose is now to expand this success from a personal achievement into a recurring, autonomous system.
                            </p>
                          </div>
                        </div>
                      )}

                      {dossierPage === 3 && (
                        /* PAGE 3: CRITICAL ATTENTION FIELD 01 */
                        <div className="space-y-4 py-2 text-left">
                          <div className="text-[9px] font-black uppercase tracking-[0.3em] text-red-400 font-mono flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                            Module 02 // Structural Refinement Domain 01
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
                            Refinement Area: <span className="text-[#b8860b]">{rDetails.attentionDomain1}</span>
                          </h3>
                          <div className="space-y-3">
                            <p className="text-base sm:text-lg text-zinc-200 italic leading-relaxed font-light">
                              "{d1Ins?.refinement || rDetails.refinement1}"
                            </p>
                            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                              {d1Ins?.urgency || rDetails.domainInsights[rDetails.attentionDomain1]?.urgency}
                            </p>
                            <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xs mt-2">
                              <span className="text-[8px] font-bold text-[#b8860b] uppercase tracking-widest block mb-2 font-mono">Forensic Symptoms Identified</span>
                              <div className="space-y-1.5">
                                {(d1Ins?.symptoms || rDetails.symptoms1).slice(0, 3).map((s, idx) => (
                                  <div key={idx} className="flex gap-2 text-xs italic text-zinc-400 font-light items-start">
                                    <span className="w-1 h-1 bg-[#b8860b] rounded-full mt-1.5 shrink-0" />
                                    <span>{s}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {dossierPage === 4 && (
                        /* PAGE 4: CRITICAL ATTENTION FIELD 02 */
                        <div className="space-y-4 py-2 text-left">
                          <div className="text-[9px] font-black uppercase tracking-[0.3em] text-red-400 font-mono flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
                            Module 03 // Structural Refinement Domain 02
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
                            Refinement Area: <span className="text-[#b8860b]">{rDetails.attentionDomain2}</span>
                          </h3>
                          <div className="space-y-3">
                            <p className="text-base sm:text-lg text-zinc-200 italic leading-relaxed font-light">
                              "{d2Ins?.refinement || rDetails.refinement2}"
                            </p>
                            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                              {d2Ins?.urgency || rDetails.domainInsights[rDetails.attentionDomain2]?.urgency}
                            </p>
                            <div className="p-4 bg-white/[0.01] border border-white/5 rounded-xs mt-2">
                              <span className="text-[8px] font-bold text-[#b8860b] uppercase tracking-widest block mb-2 font-mono">Forensic Symptoms Identified</span>
                              <div className="space-y-1.5">
                                {(d2Ins?.symptoms || rDetails.symptoms2).slice(0, 3).map((s, idx) => (
                                  <div key={idx} className="flex gap-2 text-xs italic text-zinc-400 font-light items-start">
                                    <span className="w-1 h-1 bg-[#b8860b] rounded-full mt-1.5 shrink-0" />
                                    <span>{s}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {dossierPage === 5 && (
                        /* PAGE 5: SOVEREIGN RECALIBRATION RESPONSE (Objections and Benefits) */
                        <div className="space-y-4 py-2 text-left">
                          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#b8860b] font-mono block">
                            Module 04 // Dynamic Recalibration Strategy
                          </span>
                          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight mb-2">
                            Structural Alignment & Custom Recalibration
                          </h3>
                          <div className="grid sm:grid-cols-2 gap-6 pt-2">
                            <div className="space-y-2.5">
                              <h4 className="text-[10px] uppercase tracking-wider font-semibold text-zinc-300 font-mono">
                                01. {rDetails.attentionDomain1}
                              </h4>
                              <p className="text-xs text-[#b8860b] italic leading-relaxed pl-3 border-l border-[#b8860b]/30">
                                {d1Ins?.objection}
                              </p>
                              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                                <strong className="font-mono text-[9px] text-zinc-500 uppercase block tracking-wider mt-1">Systemic Unlock:</strong>
                                {d1Ins?.benefit}
                              </p>
                            </div>
                            <div className="space-y-2.5">
                              <h4 className="text-[10px] uppercase tracking-wider font-semibold text-zinc-300 font-mono">
                                02. {rDetails.attentionDomain2}
                              </h4>
                              <p className="text-xs text-[#b8860b] italic leading-relaxed pl-3 border-l border-[#b8860b]/30">
                                {d2Ins?.objection}
                              </p>
                              <p className="text-xs text-zinc-400 leading-relaxed font-light">
                                <strong className="font-mono text-[9px] text-zinc-500 uppercase block tracking-wider mt-1">Systemic Unlock:</strong>
                                {d2Ins?.benefit}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {dossierPage === 6 && (
                        /* PAGE 6: EMPIRICAL CALIBRATION INDICES & PRIORITY MATRIX WITH REAL-TIME VOICE USP */
                        <div className="space-y-5 py-2 text-left">
                          <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#b8860b] font-mono block">
                            Module 05 // Empirical Calibration & Real-Time Voice Cross-Map
                          </span>
                          
                          <div className="grid md:grid-cols-12 gap-6 items-start">
                            {/* Column 1: Core Indices */}
                            <div className="md:col-span-6 space-y-4">
                              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xs">
                                <div className="text-[8px] uppercase font-black text-zinc-500 mb-1 tracking-widest font-mono">Aggregate Fidelity Index</div>
                                <div className="flex items-end gap-1 mb-2">
                                  <span className="text-3xl font-bold text-[#b8860b] font-mono">
                                    {Math.round((totalScoreValue / 50) * 100)}
                                  </span>
                                  <span className="text-xs text-zinc-600 mb-1 font-black">%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                  <div 
                                    style={{ width: `${Math.round((totalScoreValue / 50) * 100)}%` }}
                                    className="h-full bg-[#b8860b] transition-all duration-1000"
                                  />
                                </div>
                              </div>

                              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xs">
                                <div className="text-[8px] uppercase font-black text-zinc-500 mb-1 tracking-widest font-mono">Cognitive Bandwidth Reclaimed</div>
                                <div className="flex items-end gap-1 mb-2">
                                  <span className="text-3xl font-bold text-white font-mono">
                                    {Math.round(80 + (totalScoreValue / 5))}
                                  </span>
                                  <span className="text-xs text-zinc-600 mb-1 font-black">%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                  <div 
                                    style={{ width: `${Math.round(80 + (totalScoreValue / 5))}%` }}
                                    className="h-full bg-white transition-all duration-1000"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Column 2: Voice USP profile */}
                            <div className="md:col-span-6 p-4 bg-[#111] border border-[#b8860b]/20 text-white space-y-3 font-mono text-[10px]">
                              <div className="flex justify-between items-center border-b border-white/15 pb-2">
                                <span className="text-[#b8860b] font-bold uppercase text-[8px] tracking-wider">Vocal Stress Analyzer Profile</span>
                                <span className="text-emerald-400 font-bold text-[7px] uppercase tracking-widest bg-emerald-950 px-1.5 py-0.5 border border-emerald-900 animate-pulse">
                                  ✓ SECURE SIGNAL MATCHED
                                </span>
                              </div>
                              <div className="space-y-1.5 text-zinc-300">
                                <div className="flex justify-between">
                                  <span className="text-zinc-500">Calibration Code:</span>
                                  <span className="text-white font-bold">TULCV-VOX-09</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-zinc-500">Spectral Stress Index:</span>
                                  <span className="text-white font-bold">{voiceCalibrated ? "1.02x (Optimal)" : "Simulated 1.05x"}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-zinc-500">Avg Response Delay:</span>
                                  <span className="text-white font-bold">1.48 seconds</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-zinc-500">Vocal Resonance Parity:</span>
                                  <span className="text-[#b8860b] font-black">96.8% Compliant</span>
                                </div>
                              </div>
                              <p className="text-[8px] italic text-zinc-500 leading-relaxed font-sans mt-2 border-t border-white/5 pt-2">
                                *Cross-mapping algorithm indicates exceptional alignment parity between written decision nodes and baseline throat stress micro-vibrations, validating lack of conceptual strain.
                              </p>
                            </div>
                          </div>

                          <div className="space-y-1 bg-[#1a140d]/30 border border-[#b8860b]/10 p-3 rounded-xs">
                            <div className="text-[8px] uppercase font-black text-[#b8860b] tracking-[0.2em] font-mono mb-1">Office Priority Intervention Recommendation</div>
                            <p className="text-zinc-200 text-xs italic font-light leading-relaxed">
                              {rDetails.priority}
                            </p>
                          </div>
                        </div>
                      )}

                      {dossierPage === 7 && (
                        /* PAGE 7: PLAYBOOK INTERACTIVE ADD-ON GATE */
                        <div className="space-y-3 py-1 text-left">
                          <div className="flex items-center justify-between border-b border-white/10 pb-3">
                            <div>
                              <span className="text-[8px] uppercase font-mono font-bold text-[#b8860b] tracking-[0.3em] block">
                                Dynamic Value Add-On Protocol
                              </span>
                              <h4 className="text-lg font-bold text-white leading-tight">
                                Sovereignty Micro-Playbook Calibrator
                              </h4>
                            </div>
                            {playbookSubmitted && (
                              <button
                                onClick={() => window.print()}
                                className="text-[8px] font-bold uppercase tracking-widest border border-white/20 px-3 py-1 bg-black text-white hover:bg-white hover:text-black transition-all flex items-center gap-1.5 font-mono"
                              >
                                <Download className="w-3 h-3" /> Print
                              </button>
                            )}
                          </div>

                          {!playbookSubmitted ? (
                            !showPlaybookOnboard ? (
                              <div className="space-y-4">
                                <p className="text-xs sm:text-sm text-zinc-300 italic font-light leading-relaxed">
                                  Generate actionable operating parameters customized to your legacy preservation horizon and active constraints. Complete our brief 3-question profile to compile your tactical playbook.
                                </p>
                                <button
                                  onClick={() => setShowPlaybookOnboard(true)}
                                  className="px-6 py-3 bg-[#b8860b] hover:bg-white hover:text-black text-white text-[9px] font-bold uppercase tracking-[0.15em] transition-all font-mono"
                                >
                                  Customize My Playbook ➔
                                </button>
                              </div>
                            ) : (
                              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                                <div className="grid sm:grid-cols-3 gap-4">
                                  {/* Q1 */}
                                  <div className="space-y-2">
                                    <label className="text-[8px] font-black uppercase text-zinc-300 tracking-wider block font-mono">1. Handover Horizon</label>
                                    <select
                                      value={playbookAnswers.handoverHorizon}
                                      onChange={(e) => setPlaybookAnswers({ ...playbookAnswers, handoverHorizon: e.target.value })}
                                      className="w-full p-2 bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs italic font-serif"
                                    >
                                      <option value="">Select Range</option>
                                      <option value="Immediate / < 12 Months">Immediate (&lt; 12m)</option>
                                      <option value="1-3 Years">Medium Range (1-3y)</option>
                                      <option value="3-5 Years">Long Horizon (3-5y)</option>
                                      <option value="No current plans">Continuous Active Principal</option>
                                    </select>
                                  </div>
                                  {/* Q2 */}
                                  <div className="space-y-2">
                                    <label className="text-[8px] font-black uppercase text-zinc-300 tracking-wider block font-mono">2. Cognitive Drain Point</label>
                                    <select
                                      value={playbookAnswers.focusBottleneck}
                                      onChange={(e) => setPlaybookAnswers({ ...playbookAnswers, focusBottleneck: e.target.value })}
                                      className="w-full p-2 bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs italic font-serif"
                                    >
                                      <option value="">Select Drain</option>
                                      <option value="Departmental overlaps and personnel disputes">Overlaps & Disputes</option>
                                      <option value="Reviewing and approving tactical documents/designs">Tactical Approvals</option>
                                      <option value="Re-explaining strategic vision repetitively">Repetitive Alignment</option>
                                      <option value="Micro-managing operational outputs and standards">Operational Controls</option>
                                    </select>
                                  </div>
                                  {/* Q3 */}
                                  <div className="space-y-2">
                                    <label className="text-[8px] font-black uppercase text-zinc-300 tracking-wider block font-mono">3. Key-Person Risk Profile</label>
                                    <select
                                      value={playbookAnswers.keyRiskLevel}
                                      onChange={(e) => setPlaybookAnswers({ ...playbookAnswers, keyRiskLevel: e.target.value })}
                                      className="w-full p-2 bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs italic font-serif"
                                    >
                                      <option value="">Select Risk</option>
                                      <option value="The organization would halt or drop speed drastically">Immediate Stall</option>
                                      <option value="Delegation failures would erode client/stakeholder trust">Erosion of Trust</option>
                                      <option value="Management layers would delay critical strategic moves">Strategic Latency</option>
                                      <option value="No visible slowdown, systems are fully autonomous">Autonomous Ledger</option>
                                    </select>
                                  </div>
                                </div>

                                <button
                                  onClick={async () => {
                                    if (!playbookAnswers.handoverHorizon || !playbookAnswers.focusBottleneck || !playbookAnswers.keyRiskLevel) {
                                      alert("Please complete all three profiling dimensions to calibrate the playbook.");
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
                                  className="w-full px-6 py-3 bg-[#b8860b] hover:bg-white hover:text-black text-white text-[9px] font-bold uppercase tracking-[0.2em] transition-all font-mono"
                                >
                                  {isGeneratingPlaybook ? 'Compiling Playbook Framework...' : 'Authorize & Compile Playbook'}
                                </button>
                              </div>
                            )
                          ) : (
                            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                              {/* Diagnostic Summary Recaps */}
                              <div className="grid grid-cols-3 gap-2 text-[10px] p-2 bg-white/[0.02] border border-white/5 font-mono">
                                <div>
                                  <span className="text-zinc-500 block uppercase tracking-widest text-[7px] font-bold">Horizon</span>
                                  <span className="text-white italic">{playbookAnswers.handoverHorizon}</span>
                                </div>
                                <div>
                                  <span className="text-zinc-500 block uppercase tracking-widest text-[7px] font-bold">Bottleneck</span>
                                  <span className="text-white italic">{playbookAnswers.focusBottleneck}</span>
                                </div>
                                <div>
                                  <span className="text-zinc-500 block uppercase tracking-widest text-[7px] font-bold">Key Risk</span>
                                  <span className="text-white italic">{playbookAnswers.keyRiskLevel}</span>
                                </div>
                              </div>

                              <div className="p-4 bg-black/40 border border-white/5 space-y-2 rounded-xs">
                                <h5 className="text-[10px] font-bold text-[#b8860b] uppercase tracking-wider font-mono">
                                  Action Protocol: Mitigating {rDetails.attentionDomain1}
                                </h5>
                                <p className="text-zinc-400 text-xs leading-relaxed font-light">
                                  Based on your bottleneck ("{playbookAnswers.focusBottleneck}"), we prescribe a structural circuit breaker:
                                </p>
                                <div className="space-y-1.5 text-xs text-zinc-400 font-light pl-2">
                                  <div>• <strong>Protocol Quarantine</strong>: Force leads to submit recorded Loom briefings following strict 2-minute parameter templates instead of scheduling long alignment sync calls.</div>
                                  <div>• <strong>Transact Limits</strong>: Legally delegate any operational decisions under $10k to your secondary management layer, demanding zero review approvals.</div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {dossierPage === 8 && (
                        /* PAGE 8: UNLOCK VIP GATE & MORE DETAILS */
                        <div className="space-y-3 py-1 text-left">
                          <div className="border-b border-white/10 pb-3 flex justify-between items-center">
                            <div>
                              <span className="text-[8px] uppercase font-mono font-bold text-[#b8860b] tracking-[0.3em] block">
                                Sovereign Substrate Verification Portal
                              </span>
                              <h4 className="text-lg font-bold text-white leading-tight">
                                Unlock Complete In-depth Assess & Roadmap
                              </h4>
                            </div>
                          </div>

                          <div className="grid sm:grid-cols-12 gap-6 items-start pt-1">
                            <div className="sm:col-span-5 space-y-2 bg-white/[0.01] border border-white/5 p-3 rounded-xs font-mono">
                              <span className="text-[8px] font-black uppercase text-[#b8860b] tracking-wider block">Locked Systems Modules</span>
                              <div className="space-y-1 text-[10px] text-zinc-450 italic">
                                <div className="flex justify-between border-b border-white/5 py-1">
                                  <span className="text-zinc-400">90-Day Sovereign Roadmap</span>
                                  <span className="text-[#b8860b]/70 font-semibold">[Locked]</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 py-1">
                                  <span className="text-zinc-400">Substrate Re-engineering</span>
                                  <span className="text-[#b8860b]/70 font-semibold">[Locked]</span>
                                </div>
                                <div className="flex justify-between py-1">
                                  <span className="text-zinc-400">Decision Velocity Matrix</span>
                                  <span className="text-[#b8860b]/70 font-semibold">[Locked]</span>
                                </div>
                              </div>
                            </div>

                            <div className="sm:col-span-7 space-y-3">
                              {!isPaid ? (
                                <div className="space-y-3">
                                  <p className="text-xs text-zinc-400 font-light leading-relaxed italic">
                                    The dossier is a Strategic Preview. The full Sovereign Model, reserved for verified Principals, unlocks the deep Architectural Assessment and custom Sovereign Roadmap via secure Razorpay checkout.
                                  </p>
                                  
                                  <button 
                                    onClick={handleRazorpayPayment}
                                    className="w-full py-3.5 bg-[#b8860b] hover:bg-white hover:text-black text-white text-[10px] font-bold uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-2 font-mono shadow-xl border border-[#b8860b]"
                                  >
                                    <span>Initiate Razorpay & Unlock System</span>
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </button>

                                  <div className="pt-2 text-center">
                                    {!showVIPInvoicePanel ? (
                                      <button
                                        onClick={() => setShowVIPInvoicePanel(true)}
                                        className="text-zinc-500 hover:text-white text-[9px] font-bold uppercase tracking-widest underline decoration-zinc-650 transition-all font-mono"
                                      >
                                        Prefer Direct Treasury Wire Invoice? VIP Handshake Request
                                      </button>
                                    ) : (
                                      <motion.div 
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="mt-3 p-4 bg-black/60 border border-zinc-800 text-left rounded-sm"
                                      >
                                        <h6 className="text-[9px] font-bold uppercase text-[#b8860b] tracking-wider mb-1.5 font-mono flex items-center gap-1.5">
                                          <Shield className="w-3 h-3 text-[#b8860b]" /> Offline Handshake Wire
                                        </h6>
                                        
                                        {!vipInvoiceSuccess ? (
                                          <form onSubmit={handleVIPInvoiceSubmit} className="space-y-2.5">
                                            <div>
                                              <input
                                                type="text"
                                                placeholder="Direct Code or WhatsApp Coordinate"
                                                value={vipInvoiceInputs.phone}
                                                onChange={(e) => setVipInvoiceInputs({ ...vipInvoiceInputs, phone: e.target.value })}
                                                className="w-full px-2.5 py-1.5 bg-zinc-900 border border-zinc-850 text-white text-[11px] italic focus:outline-none focus:border-[#b8860b]"
                                              />
                                            </div>
                                            <div className="flex gap-2">
                                              <button
                                                type="submit"
                                                disabled={isSubmittingVIPWire}
                                                className="flex-1 py-2 bg-[#b8860b] hover:bg-white hover:text-black font-mono font-bold uppercase text-[8px] tracking-wider text-white transition-all"
                                              >
                                                {isSubmittingVIPWire ? "Transmitting..." : "Initiate Protocol Handshake"}
                                              </button>
                                              <button
                                                type="button"
                                                onClick={() => setShowVIPInvoicePanel(false)}
                                                className="px-2 py-2 border border-zinc-800 hover:border-zinc-700 text-[8px] font-mono text-zinc-400 hover:text-white uppercase tracking-wider transition-all"
                                              >
                                                Cancel
                                              </button>
                                            </div>
                                          </form>
                                        ) : (
                                          <div className="p-2 bg-[#b8860b]/10 border border-[#b8860b]/20 text-center rounded-xs">
                                            <Check className="w-4 h-4 text-[#b8860b] mx-auto mb-1" />
                                            <span className="text-[8px] font-mono uppercase text-white font-bold tracking-wider block">Wire Handshake Initiated</span>
                                            <p className="text-[9px] text-zinc-400 italic">
                                              Suchita&apos;s office is compiling details. A premium wire invoice will reach you within 4 hours.
                                            </p>
                                          </div>
                                        )}
                                      </motion.div>
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <div className="space-y-3 animate-fade-in text-center py-2">
                                  <div className="p-3 bg-[#b8860b]/10 border border-[#b8860b]/30">
                                    <div className="text-[9px] uppercase text-[#b8860b] tracking-wider font-mono font-bold">Authority Calibrated & Certified</div>
                                    <p className="text-xs text-zinc-400 italic font-light mt-1">Sovereign Portal assessment is fully unlocked on your client terminal node.</p>
                                  </div>

                                  <a 
                                    href="https://ai.studio/apps/bc205532-cdb0-43d3-a8fb-919809372614"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative px-6 py-4 bg-[#b8860b] text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all shadow-xl flex items-center justify-center gap-2 overflow-hidden text-center mx-auto no-underline"
                                  >
                                    <span>Access Indepth Assessment Portal</span>
                                    <ArrowRight className="w-4 h-4" />
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* NAVIGATION PAGES CONTROLS (Static footer section, preventing layout shifts) */}
                  <div className="flex justify-between items-center pt-4 border-t border-white/10 mt-6 select-none">
                    <button
                      onClick={() => setDossierPage(prev => Math.max(1, prev - 1))}
                      disabled={dossierPage === 1}
                      className="px-4 py-2 bg-black border border-white/10 hover:border-[#b8860b] text-[9px] font-bold uppercase tracking-widest disabled:opacity-30 transition-all font-mono"
                    >
                      ← Prev Leaf
                    </button>
                    <span className="text-[10px] tracking-widest font-mono text-zinc-500 uppercase">
                      Page {dossierPage.toString().padStart(2, '0')} of 08
                    </span>
                    <button
                      onClick={() => setDossierPage(prev => Math.min(8, prev + 1))}
                      disabled={dossierPage === 8}
                      className="px-4 py-2 bg-black border border-white/10 hover:border-[#b8860b] text-[9px] font-bold uppercase tracking-widest disabled:opacity-30 transition-all font-mono"
                    >
                      Next Leaf →
                    </button>
                  </div>

                  <div className="mt-4 pt-2 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-2 select-none text-[8px] font-mono text-zinc-600 uppercase tracking-widest.">
                    <span>Calibration Target Email: {identity.email}</span>
                    <span>TULC Protocol Verification Registry</span>
                  </div>

                  {/* EMBED WIDGET (Renders nicely below nav controls on page 8 only or when desired, but keeping to prevent layout disruptions) */}
                  {dossierPage === 8 && (
                    <div className="mt-6 pt-4 border-t border-white/5 text-center">
                      <span className="text-[8px] uppercase font-bold text-[#b8860b] tracking-[0.3em] block mb-2 font-mono">
                        INSTITUTIONAL CALIBRATION VERIFICATION BADGE
                      </span>
                      <div className="flex flex-col md:flex-row items-center gap-4 justify-center bg-black/40 border border-white/5 p-4 rounded-xs">
                        <div className="shrink-0">
                          <svg width="70" height="70" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto filter drop-shadow-[0_10px_20px_rgba(184,134,11,0.15)]">
                            <circle cx="100" cy="100" r="94" stroke="#b8860b" strokeWidth="2" strokeDasharray="4 2" />
                            <circle cx="100" cy="100" r="76" fill="#111111" />
                            <path d="M100 55 L109 78 L133 78 L114 92 L121 115 L100 101 L79 115 L86 92 L67 78 L91 78 Z" fill="#b8860b" />
                            <defs>
                              <path id="miniBadgePath" d="M35,100 a65,65 0 1,1 130,0 a65,65 0 1,1 -130,0" />
                            </defs>
                            <text fill="#888" fontSize="10" fontWeight="bold" letterSpacing="0.2em" fontFamily="monospace">
                              <textPath href="#miniBadgePath" startOffset="0%">
                                • THE UNBOUNDED LEADERSHIP CO. • CALIBRATED
                              </textPath>
                            </text>
                          </svg>
                        </div>
                        <div className="w-full text-left font-mono">
                          <span className="text-[7px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">HTML EMBED (SOVEREIGN SEAL)</span>
                          <textarea
                            readOnly
                            value={`<div style="text-align: center;"><a href="https://theunboundedleadership.com" target="_blank"><img src="https://theunboundedleadership.com/assets/badges/calibrated.svg" alt="The Unbounded Leadership Co. | Calibration Seal" width="120" height="120" style="border: none;" /></a></div>`}
                            className="w-full h-11 bg-zinc-950 border border-zinc-800 p-1 rounded text-[7px] text-zinc-500 select-all focus:outline-none resize-none cursor-text overflow-hidden"
                          />
                        </div>
                      </div>
                    </div>
                  )}

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
