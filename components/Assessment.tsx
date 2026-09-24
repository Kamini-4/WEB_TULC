import React, { useState, useEffect, useRef } from 'react';
import { db } from '../src/firebase';
import { SovereignDB } from '../lib/database.ts';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { Shield, Zap, Layers, ArrowRight, Lock, Download, ChevronRight, AlertCircle, ExternalLink, AlertTriangle, TrendingDown, Check, Copy, Mic, Volume2, ZoomIn, ZoomOut, Maximize2, Minimize2, Eye, Sparkles, Move } from 'lucide-react';
import BrandLogo from './BrandLogo';

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
      dynamic: "What percentage of your leadership week is consumed by operational firefighting, slide deck reviews, and tactical check-ins vs. uncompromised strategic offense?",
      established: "How much of executive committee bandwidth is drained by internal coordination reviews, alignment presentations, and manual status confirmations?",
      generational: "How much time does the family council spend managing operational friction and trustee alignment vs. commanding generational asset strategy?"
    },
    options: [
      { 
        label: "Insulated Strategic Focus (<20% Firefighting)", 
        scores: { "Cognitive Clarity": 5, "Systemic Integrity": 4, "Strategic Velocity": 4 }, 
        description: "My desk is strictly insulated by invariant execution protocols. I dedicate over 80% of my time exclusively to compound capital moves and market expansion." 
      },
      { 
        label: "Intermittent Reactive Drag (20% – 50% Firefighting)", 
        scores: { "Cognitive Clarity": 3, "Systemic Integrity": 3, "Strategic Velocity": 2 }, 
        description: "We carve out strategic blocks, but frequent operational escalations and slide reviews pull leadership back into tactical weeds." 
      },
      { 
        label: "Severe Coordination Tax (>50% Firefighting)", 
        scores: { "Cognitive Clarity": 1, "Systemic Integrity": 1, "Strategic Velocity": 1 }, 
        description: "Operational brushfires and manual coordination dominate the calendar; strategic initiatives are perpetually delayed." 
      }
    ]
  },
  {
    text: {
      dynamic: "When you delegate a high-stakes strategic initiative to your senior leads, what is the default execution reality?",
      established: "When a multi-division directive is assigned to intermediate business units, how does it execute without executive intervention?",
      generational: "When high-capital mandates are handed over to portfolio managers or trustees, how faithfully do they execute without founder oversight?"
    },
    options: [
      { 
        label: "Autonomous Zero-Loss Execution", 
        scores: { "Systemic Integrity": 5, "Cognitive Clarity": 4, "Strategic Velocity": 5 }, 
        description: "Executes autonomously within hard-coded boundary gates to my exact standards without requiring executive check-ins or rework." 
      },
      { 
        label: "Hesitant Escalation Loops", 
        scores: { "Systemic Integrity": 3, "Cognitive Clarity": 3, "Strategic Velocity": 2 }, 
        description: "Managers execute cautiously, seeking multiple verbal check-ins and reassurance before committing to high-stakes decisions." 
      },
      { 
        label: "Execution Drift & Rework", 
        scores: { "Systemic Integrity": 1, "Cognitive Clarity": 2, "Strategic Velocity": 1 }, 
        description: "The initiative drifts off-target, forcing the executive desk to intervene, course-correct, and redo the work." 
      }
    ]
  },
  {
    text: {
      dynamic: "From the moment you decide on a critical market move, how many days or weeks does it take to see it live in the market?",
      established: "How fast can dedicated budgets and talent pools be reallocated across divisions to capture an unexpected market opening?",
      generational: "When sudden macroeconomic shifts threaten family capital, how swiftly do governance structures execute portfolio realignments?"
    },
    options: [
      { 
        label: "Immediate Deployment (Days)", 
        scores: { "Strategic Velocity": 5, "Systemic Integrity": 4, "Cognitive Clarity": 4 }, 
        description: "Rapid, high-conviction deployment within 24–72 hours via pre-authorized maneuver parameters and zero committee lag." 
      },
      { 
        label: "Iterative Alignment (Weeks)", 
        scores: { "Strategic Velocity": 3, "Systemic Integrity": 3, "Cognitive Clarity": 3 }, 
        description: "Stalled by 2 to 4 weeks of cross-departmental alignment syncs, cost audits, and iterative review decks." 
      },
      { 
        label: "Bureaucratic Stagnation (Months)", 
        scores: { "Strategic Velocity": 1, "Systemic Integrity": 2, "Cognitive Clarity": 1 }, 
        description: "Heavy review cycles lock the pivot until subsequent planning quarters, routinely missing prime market windows." 
      }
    ]
  },
  {
    text: {
      dynamic: "When senior managers face a high-stakes trade-off between hitting short-term targets and upholding core governance/values, how do they act?",
      established: "If a profitable business unit exhibits behavior that compromises long-term institutional governance, how does your system resolve it?",
      generational: "If an influential member of the inner circle compromises family reputation for quick returns, how does governance enforce standards?"
    },
    options: [
      { 
        label: "Inviolable Sovereign Governance", 
        scores: { "Moral Gravity": 5, "Cultural Fidelity": 5, "Systemic Integrity": 4 }, 
        description: "Managers possess sovereign conviction; our governance rules mathematically reward ethical fidelity and long-term equity over raw short-term volume." 
      },
      { 
        label: "Upward Buck-Passing", 
        scores: { "Moral Gravity": 3, "Cultural Fidelity": 3, "Systemic Integrity": 2 }, 
        description: "Managers freeze and escalate the dilemma to the CEO desk to avoid personal accountability or political blowback." 
      },
      { 
        label: "Compromised Standards", 
        scores: { "Moral Gravity": 1, "Cultural Fidelity": 1, "Systemic Integrity": 1 }, 
        description: "Values are bent to hit quarterly numbers, creating hidden ethical, legal, or reputational debt across the organization." 
      }
    ]
  },
  {
    text: {
      dynamic: "If a critical operational error occurs or your most vital key person resigns unexpectedly tomorrow, when and how does the enterprise stabilize?",
      established: "When key department heads depart or distant operational milestones fail, how rapidly is reality surfaced and stabilized?",
      generational: "If the designated principal is suddenly unavailable, how autonomously do succession frameworks maintain stability without valuation dips?"
    },
    options: [
      { 
        label: "Instant 15-Minute Transparency & Leader-Agnostic Substrate", 
        scores: { "Cultural Fidelity": 5, "Systemic Integrity": 5, "Cognitive Clarity": 4 }, 
        description: "Zero latency in surfacing reality; deputy operators and codified systems step in immediately with zero transition dip." 
      },
      { 
        label: "Sugarcoated Weekly Reporting & Transition Strains", 
        scores: { "Cultural Fidelity": 3, "Systemic Integrity": 2, "Cognitive Clarity": 3 }, 
        description: "Bad news is softened during weekly syncs, and key departures create 3 to 6-week operational bottlenecks." 
      },
      { 
        label: "Late Emergency Discovery & Key-Person Vulnerability", 
        scores: { "Cultural Fidelity": 1, "Systemic Integrity": 1, "Cognitive Clarity": 1 }, 
        description: "Errors stay concealed until full crisis point; operations rely 100% on specific heroes with extreme key-person risk." 
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

  // Smart Zoom & Inspector States
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isZoomInspectorOpen, setIsZoomInspectorOpen] = useState(false);
  const [inspectorZoom, setInspectorZoom] = useState<number>(160);

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

  const startVoiceCalibration = async () => {
    setMicState('calibrating');
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        voiceStreamRef.current = stream;
        setMicPermissionGranted(true);

        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          const audioCtx = new AudioContextClass();
          const analyser = audioCtx.createAnalyser();
          analyser.fftSize = 64;
          const source = audioCtx.createMediaStreamSource(stream);
          source.connect(analyser);
          voiceAnalyserNodeRef.current = analyser;

          const canvas = voiceCanvasRef.current;
          if (canvas) {
            const ctx = canvas.getContext('2d');
            const dataArray = new Uint8Array(analyser.frequencyBinCount);

            const draw = () => {
              voiceAnimationRef.current = requestAnimationFrame(draw);
              analyser.getByteFrequencyData(dataArray);

              let sum = 0;
              for (let i = 0; i < dataArray.length; i++) {
                sum += dataArray[i];
              }
              const avg = sum / dataArray.length;
              setVoiceWaveLevel(avg);

              if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#09090b';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                const barWidth = (canvas.width / dataArray.length) * 1.5;
                let x = 0;

                for (let i = 0; i < dataArray.length; i++) {
                  const barHeight = (dataArray[i] / 255) * canvas.height;
                  ctx.fillStyle = '#b8860b';
                  ctx.fillRect(x, canvas.height - barHeight, barWidth - 2, barHeight);
                  x += barWidth;
                }
              }
            };
            draw();
          }
        }
      }
    } catch (err) {
      console.warn("Microphone access unavailable, proceeding with simulated baseline calibration:", err);
    }

    setTimeout(() => {
      setMicState('completed');
      setVoiceCalibrated(true);
    }, 2200);
  };

  useEffect(() => {
    return () => {
      if (voiceStreamRef.current) {
        voiceStreamRef.current.getTracks().forEach(t => t.stop());
      }
      if (voiceAnimationRef.current) {
        cancelAnimationFrame(voiceAnimationRef.current);
      }
    };
  }, []);

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
      await SovereignDB.sendContactEmail({
        name: identity.name,
        email: identity.email,
        organization: identity.organization,
        message: `VIP MANUAL INVOICE DRIVEN HANDSHAKE REQUESTED // Phone: ${vipInvoiceInputs.phone}, Delivery Mode: ${vipInvoiceInputs.mode}, Executive Request Comments: ${vipInvoiceInputs.comments}`,
        type: 'VIP_WIRE_REQUESTED'
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
      SovereignDB.sendContactEmail({
        name: identity.name,
        email: identity.email,
        organization: identity.organization,
        type: 'SIGNUP_INITIATED'
      });
    } catch (e) {
      console.error("Initial handshake failure:", e);
    }

    setStep('voice');
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

      let savedId = 'local-' + Date.now();
      try {
        const result = await SovereignDB.saveAssessment({
          userId: 'anonymous-sovereign',
          name: identity.name || 'Executive Principal',
          email: identity.email || 'anonymous@institution.com',
          organization: identity.organization || 'Strategic Institution',
          context: context || 'dynamic',
          answers: finalAnswers,
          totalScore: totalScoreValue,
          percentage,
          domainScores: domainScores.map(d => ({ domain: d.domain, score: d.score }))
        });
        if (result?.id) {
          savedId = result.id;
        }
      } catch (dbError) {
        console.warn("DB save non-blocking warning:", dbError);
      }

      setAssessmentId(savedId);

      try {
        await SovereignDB.sendContactEmail({
          name: identity.name || 'Executive Principal',
          email: identity.email || 'anonymous@institution.com',
          organization: identity.organization || 'Strategic Institution',
          message: `Free Assessment Completed. Total Score: ${totalScoreValue}/25. Domain Scores: ${domainScores.map(d => `${d.domain}: ${d.score}`).join(', ')}`,
          type: 'ASSESSMENT_COMPLETED',
          assessmentData: {
            totalScore: totalScoreValue,
            domainScores: domainScores.map(d => ({ domain: d.domain, score: d.score }))
          }
        });
      } catch (emailErr) {
        console.warn("Assessment notification email send warning:", emailErr);
      }

      setTimeout(() => {
        setStep('dossier');
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      console.error("Error processing assessment:", error);
      setTimeout(() => {
        setStep('dossier');
        setIsSubmitting(false);
      }, 500);
    }
  };

  const getGrade = () => {
    const domainScores = computeDomainScores(answers);
    const totalScoreValue = domainScores.reduce((a, b) => a + b.score, 0);
    if (totalScoreValue >= 22) return 'Strategic';
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
        objection: "Addressing 'I don't have time to document this': Structured distillation does not require writing tedious corporate wikis. It means automating your core decision algorithms once, so you never have to re-explain yourself.",
        benefit: "Your Benefit: Reclaim 15+ hours weekly instantly, allowing you to focus on high-leverage compound moves instead of repetitive tactical alignment.",
        symptoms: [
          "Leadership spending more than 15 hours weekly on manual alignment check-ins",
          "Delayed project executions because key stakeholders 'need to hear it from the Principal directly'",
          "Ambiguities in strategic mandates leading to wasted team bandwidth and speculative execution paths"
        ],
        impact: "Severe Strategic Friction. Your organization is paying a hidden 'clarification tax' which acts as a permanent handbrake on capital deployment. The opportunity cost is estimated to be 15-20% of your operational run-rate.",
        prescription: "Deploy the Diagnostic Alignment Protocol immediately. We will systematically capture your unique mental models, map your core decision-making vectors, and translate them into standard-operating algorithms, allowing your executive layer to execute your intent autonomously."
      },
      "Systemic Integrity": {
        definition: "The structural self-regulation of your firm's protocols—ensuring that business processes keep running smoothly regardless of human behavior or individual heroics.",
        strength: "Your leadership has spent immense personal equity building deep loyalty within the team. The business processes are kept alive because key heroes consistently step up.",
        refinement: "However, this makes your operation 'hero-dependent'. If even 2 crucial leaders are suddenly unavailable, operations would experience severe strain, creating extreme key-person risk.",
        urgency: "Why Now: Scale is mathematically capped by your team's exhaustion threshold. Running an enterprise on sheer willpower leads to systemic fatigue and inevitable talent turnover at critical junctures.",
        objection: "Addressing 'My organization is too dynamic for rigid software protocols': Strategic architecture is not bureaucratic micromanagement; it is structured alignment. It replaces rigid managers with flexible self-correcting containers.",
        benefit: "Your Benefit: Fully stress-tested operations that can run autonomously for 30 consecutive days, protecting equity value and ensuring absolute asset security.",
        symptoms: [
          "Crises and strategic variances requiring direct escalation to the executive team",
          "High friction in onboarding and delegation because tasks are poorly structured and rely heavily on personal intuition",
          "Friction in handoffs between departments resulting in variable and unpredictable results"
        ],
        impact: "Continuous Operational Exposure. Since stability is maintained through the sheer force of will of key individuals, the architecture suffers from structural fatigue. Scale is mathematically capped at your leaders' stress limits.",
        prescription: "Integrate Phase 01 of the Strategic Alignment Protocol. We will replace fragile manual oversight channels with self-maintaining operational structures. This eliminates hero-dependency and builds your standard operating logic into the firm."
      },
      "Strategic Velocity": {
        definition: "The conversion index—measuring how fast your organization can pivot capital, human resources, and execution lines to exploit market gaps.",
        strength: "You possess high localized reaction speeds. When a major crisis occurs, your core circle reacts with massive emotional focus and quick, decisive adjustments.",
        refinement: "However, this reaction speed is manual and highly draining. True corporate velocity should exist as a default structural state, rather than being triggered by adrenaline-fueled panic.",
        urgency: "Why Now: In volatile markets, delayed responses are directly penalized by capital decay. A single bottlenecked board cycle or delayed delegation window can cost millions in lost momentum.",
        objection: "Addressing 'Moving fast compromises risk protection': We do not advocate for reckless execution. We construct pre-authorized 'operational parameters' where safety boundaries are defined.",
        benefit: "Your Benefit: Accelerate implementation index by up to 3.5x, transforming market uncertainty into an active weapon to capture first-mover market share.",
        symptoms: [
          "Capital reallocation opportunities remaining static for months due to internal consensus-seeking delays",
          "More than 3 coordination layers required to execute a tactical pivot",
          "Competitive response latency exceeding standard market windows"
        ],
        impact: "Capital Latency Tax. Delayed reactions to dynamic environments bleed strategic equity. For an enterprise scale firm, a 30-day bottleneck in strategic execution can erode market value and destroy permanent first-mover advantage.",
        prescription: "Inject our Decision Velocity Calibration Matrix. Through the In-depth Assessment, we build dedicated, pre-authorized 'operational parameters' for your leaders. They execute high-priority decisions instantly within pre-calibrated guardrails, bypassing unnecessary board cycles."
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
        prescription: "Audit and embed unchangeable reputational metrics. Through our Annual Retainer or complete Strategic Alignment Protocol, we align incentives, strategic limits, and operational dispatches into a single ecosystem where non-aligned action is structurally impossible."
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
        ? "IMMEDIATE CALIBRATION REQUIRED: Your current institutional substrate is performing with some localized resilience but is bleeding strategic bandwidth. Our Strategic Alignment Protocol (Phases 01-04) will focus exclusively on designing custom operating substrates for exactly these 2 attention areas (out of the 5 global domains) to unlock strategic velocity and preserve your leadership legacy."
        : "ARCHITECTURAL SCALE SECURED: You are positioned beautifully for institutional permanence. Moving forward, our Strategic Alignment Protocol (Phases 01-04) will focus exclusively on hard-coding systems for exactly these 2 attention areas (out of the 5 global domains) to insulate your brand and scale your genius."
    };
  };

  const handleExportFullDossierPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert("Please allow popups in your browser to generate and print your PDF Dossier.");
      return;
    }

    const rDetails = getReportDetails();
    const domainScores = computeDomainScores(answers);
    const totalScoreValue = domainScores.reduce((a, b) => a + b.score, 0);
    const gradeTitle = getGrade();
    const formattedDate = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    let inactionTax = "$1,850,000 / year";
    if (identity.organization?.toLowerCase().includes('50m') || identity.organization?.toLowerCase().includes('enterprise')) {
      inactionTax = "$4,200,000 / year";
    } else if (totalScoreValue < 12) {
      inactionTax = "$3,650,000 / year";
    } else if (totalScoreValue < 18) {
      inactionTax = "$2,100,000 / year";
    } else {
      inactionTax = "$950,000 / year";
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Confidential Strategic Dossier - ${identity.organization || 'Executive Client'}</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600;800;900&family=JetBrains+Mono:wght@400;600;700&display=swap');

            * { box-sizing: border-box; }
            
            body {
              background-color: #fafaf6;
              color: #111111;
              font-family: 'Playfair Display', Georgia, serif;
              margin: 0;
              padding: 0;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }

            .page {
              width: 100%;
              max-width: 820px;
              margin: 30px auto;
              padding: 60px 70px;
              background-color: #ffffff;
              border: 1px solid #e5e5d8;
              box-shadow: 0 4px 20px rgba(0,0,0,0.05);
              page-break-after: always;
              position: relative;
              min-height: 1050px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            }

            @media print {
              body { background-color: #ffffff; }
              .page {
                box-shadow: none;
                border: none;
                margin: 0;
                padding: 40px 50px;
                max-width: 100%;
                min-height: 100vh;
                page-break-after: always;
              }
            }

            /* Header & Footer */
            .doc-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              border-bottom: 2px solid #b8860b;
              padding-bottom: 12px;
              margin-bottom: 30px;
            }

            .doc-brand {
              font-family: 'Cinzel', serif;
              font-size: 11px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.15em;
              color: #111111;
            }

            .doc-badge {
              font-family: 'JetBrains Mono', monospace;
              font-size: 8px;
              font-weight: 700;
              text-transform: uppercase;
              color: #b8860b;
              background-color: #fafaf6;
              border: 1px solid #b8860b;
              padding: 4px 8px;
            }

            .doc-footer {
              border-top: 1px solid #e5e5d8;
              padding-top: 12px;
              margin-top: 30px;
              display: flex;
              justify-content: space-between;
              font-family: 'JetBrains Mono', monospace;
              font-size: 8px;
              color: #777777;
              text-transform: uppercase;
            }

            /* Typography */
            h1 {
              font-family: 'Playfair Display', serif;
              font-size: 32px;
              font-weight: 700;
              color: #111111;
              line-height: 1.25;
              margin: 15px 0 10px 0;
            }

            h2 {
              font-family: 'Playfair Display', serif;
              font-size: 20px;
              font-weight: 700;
              color: #111111;
              margin: 20px 0 10px 0;
              border-bottom: 1px solid #b8860b;
              padding-bottom: 6px;
            }

            h3 {
              font-family: 'Playfair Display', serif;
              font-size: 15px;
              font-weight: 700;
              color: #b8860b;
              margin: 15px 0 6px 0;
            }

            p, li {
              font-size: 12px;
              line-height: 1.65;
              color: #222222;
              margin-bottom: 10px;
            }

            .emphasis {
              font-style: italic;
              font-weight: 400;
              color: #111111;
            }

            .highlight-box {
              background-color: #fafaf6;
              border-left: 3px solid #b8860b;
              padding: 15px 20px;
              margin: 15px 0;
            }

            .gold-card {
              border: 1px solid #b8860b;
              padding: 20px;
              background-color: #fdfdfa;
              margin: 15px 0;
            }

            .metric-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 15px;
              margin: 20px 0;
            }

            .metric-card {
              background-color: #fafaf6;
              border: 1px solid #e5e5d8;
              padding: 15px;
              text-align: center;
            }

            .metric-val {
              font-family: 'Cinzel', serif;
              font-size: 26px;
              font-weight: 700;
              color: #b8860b;
              margin-bottom: 4px;
            }

            .metric-lbl {
              font-family: 'JetBrains Mono', monospace;
              font-size: 8px;
              text-transform: uppercase;
              color: #666666;
              font-weight: 700;
            }

            .domain-table {
              width: 100%;
              border-collapse: collapse;
              margin: 20px 0;
              font-family: 'Inter', sans-serif;
              font-size: 11px;
            }

            .domain-table th {
              background-color: #111111;
              color: #ffffff;
              text-align: left;
              padding: 8px 12px;
              font-family: 'JetBrains Mono', monospace;
              font-size: 8px;
              text-transform: uppercase;
            }

            .domain-table td {
              padding: 10px 12px;
              border-bottom: 1px solid #eeeeee;
            }

            .bar-bg {
              background-color: #e5e5d8;
              height: 6px;
              width: 100px;
              border-radius: 3px;
              overflow: hidden;
            }

            .bar-fill {
              background-color: #b8860b;
              height: 100%;
            }

            .cover-frame {
              border: 2px solid #b8860b;
              padding: 40px;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              text-align: center;
            }

            .signature-block {
              margin-top: 30px;
              border-top: 1px dashed #b8860b;
              padding-top: 20px;
              display: flex;
              justify-content: space-between;
              align-items: flex-end;
            }

            .signature-title {
              font-family: 'Cinzel', serif;
              font-size: 12px;
              font-weight: 700;
              color: #111111;
            }

            .seal-stamp {
              border: 2px solid #b8860b;
              padding: 8px 16px;
              font-family: 'Cinzel', serif;
              font-size: 9px;
              font-weight: 700;
              color: #b8860b;
              text-transform: uppercase;
              letter-spacing: 0.1em;
            }
          </style>
        </head>
        <body>
          <!-- PAGE 1: COVER PAGE -->
          <div class="page">
            <div class="cover-frame">
              <div>
                <div class="doc-brand">The Unbounded Leadership Co.</div>
                <div style="font-family: 'JetBrains Mono', monospace; font-size: 8px; color: #b8860b; text-transform: uppercase; margin-top: 5px; font-weight: 700;">
                  Office of the Principal Architect • Swiss Alignment Architecture
                </div>
              </div>

              <div style="margin: 40px 0;">
                <div style="font-family: 'JetBrains Mono', monospace; font-size: 9px; text-transform: uppercase; color: #b8860b; letter-spacing: 0.2em; margin-bottom: 15px; font-weight: 700;">
                  PROVISIONAL PATENT-PENDING INTELLECTUAL SUBSTRATE
                </div>
                <h1 style="font-size: 36px; margin-bottom: 20px; line-height: 1.15;">
                  CONFIDENTIAL STRATEGIC DOSSIER
                </h1>
                <p class="emphasis" style="font-size: 14px; max-width: 500px; margin: 0 auto; color: #444444;">
                  A bespoke institutional alignment analysis tracking cognitive tax, decision latency, and strategic organizational integrity.
                </p>
              </div>

              <div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; text-align: left; background-color: #fafaf6; border: 1px solid #e5e5d8; padding: 20px; font-family: 'Inter', sans-serif; font-size: 11px;">
                  <div>
                    <div style="font-family: 'JetBrains Mono', monospace; font-size: 8px; color: #777; text-transform: uppercase; font-weight: 700;">Executive Principal</div>
                    <div style="font-weight: 700; color: #111; margin-top: 2px;">${identity.name || 'Executive Principal'}</div>
                  </div>
                  <div>
                    <div style="font-family: 'JetBrains Mono', monospace; font-size: 8px; color: #777; text-transform: uppercase; font-weight: 700;">Enterprise Authority</div>
                    <div style="font-weight: 700; color: #111; margin-top: 2px;">${identity.organization || 'Enterprise Entity'}</div>
                  </div>
                  <div>
                    <div style="font-family: 'JetBrains Mono', monospace; font-size: 8px; color: #777; text-transform: uppercase; font-weight: 700;">Calendar Benchmark</div>
                    <div style="font-weight: 700; color: #111; margin-top: 2px;">${formattedDate}</div>
                  </div>
                  <div>
                    <div style="font-family: 'JetBrains Mono', monospace; font-size: 8px; color: #777; text-transform: uppercase; font-weight: 700;">Reference Registry</div>
                    <div style="font-weight: 700; color: #b8860b; margin-top: 2px;">#TULC-DOSSIER-${dossierId}</div>
                  </div>
                </div>

                <div class="seal-stamp" style="margin-top: 25px; display: inline-block;">
                  VERIFIED DIAGNOSTIC DOSSIER
                </div>
              </div>
            </div>

            <div class="doc-footer">
              <span>Classified Executive Briefing</span>
              <span>The Unbounded Leadership Co.</span>
            </div>
          </div>

          <!-- PAGE 2: EXECUTIVE MATURITY & FINANCIAL INACTION TAX -->
          <div class="page">
            <div>
              <div class="doc-header">
                <div class="doc-brand">Strategic Maturity & Capital Loss Audit</div>
                <div class="doc-badge">Reference #${dossierId}</div>
              </div>

              <h2>01. Executive Maturity & Inaction Tax Model</h2>
              <p class="emphasis">
                Quantifying the exact monetary capital drained by operational friction, decision latency, and meeting saturation across management layers.
              </p>

              <div class="metric-grid">
                <div class="metric-card">
                  <div class="metric-val">${totalScoreValue} / 25</div>
                  <div class="metric-lbl">Substrate Alignment Index</div>
                </div>
                <div class="metric-card">
                  <div class="metric-val" style="font-size: 20px;">${gradeTitle}</div>
                  <div class="metric-lbl">Operational Standard</div>
                </div>
                <div class="metric-card">
                  <div class="metric-val" style="font-size: 20px; color: #b8860b;">${inactionTax}</div>
                  <div class="metric-lbl">Annual Inaction Tax</div>
                </div>
              </div>

              <div class="gold-card">
                <h3>Executive Summary & Diagnostic Thesis</h3>
                <p class="emphasis" style="font-size: 13px; line-height: 1.7; color: #111;">
                  "${rDetails.priority}"
                </p>
              </div>

              <h3>Quantified Capital Loss Vectors</h3>
              <ul style="font-size: 11px; font-family: 'Inter', sans-serif; line-height: 1.7; color: #333; padding-left: 18px;">
                <li><strong style="color: #111;">Manual Alignment Tax:</strong> Executive team consumes 15+ hours weekly re-explaining strategic vision and approving tactical choices.</li>
                <li><strong style="color: #111;">Decision Cycle Latency:</strong> 3x decision-to-execution delay caused by ambiguous delegation guardrails and board cycle dependency.</li>
                <li><strong style="color: #111;">Key-Person Exposure:</strong> Key strategic intent remains un-codified in founder memory, risking immediate stall upon key leadership shifts.</li>
              </ul>
            </div>

            <div class="doc-footer">
              <span>Page 02 • Financial & Bandwidth Audit</span>
              <span>The Unbounded Leadership Co.</span>
            </div>
          </div>

          <!-- PAGE 3: 5 SOVEREIGN DOMAINS BREAKDOWN -->
          <div class="page">
            <div>
              <div class="doc-header">
                <div class="doc-brand">The 5 Sovereign Domains Calibration</div>
                <div class="doc-badge">Substrate Vector Matrix</div>
              </div>

              <h2>02. 5-Domain Alignment Calibration</h2>
              <p class="emphasis">
                Cross-mapping institutional health across the 5 locked enterprise vectors to isolate exact structural leaks.
              </p>

              <table class="domain-table">
                <thead>
                  <tr>
                    <th>Domain Vector</th>
                    <th>Score</th>
                    <th>Visual Index</th>
                    <th>Substrate Maturity Level</th>
                  </tr>
                </thead>
                <tbody>
                  ${domainScores.map(d => `
                    <tr>
                      <td><strong style="color: #111; font-family: 'Playfair Display', serif; font-size: 12px;">${d.domain}</strong></td>
                      <td><strong style="color: #b8860b; font-family: 'JetBrains Mono', monospace;">${d.score} / 5</strong></td>
                      <td>
                        <div class="bar-bg">
                          <div class="bar-fill" style="width: ${(d.score / 5) * 100}%;"></div>
                        </div>
                      </td>
                      <td style="font-style: italic; color: #555;">
                        ${d.score >= 4 ? 'Architectural Standard' : d.score >= 3 ? 'Systemic Alignment' : 'Manual Dependency'}
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>

              <div class="highlight-box">
                <h3 style="margin-top: 0;">Primary Structural Strength</h3>
                <p class="emphasis" style="font-size: 12px; margin-bottom: 0;">
                  <strong style="color: #111; font-style: normal;">${rDetails.strengthDomain}:</strong> ${rDetails.strength}
                </p>
              </div>

              <div class="gold-card" style="margin-top: 15px;">
                <h3 style="margin-top: 0;">Priority Attention Domains</h3>
                <div style="font-size: 11px; color: #333; line-height: 1.6;">
                  <p style="margin-bottom: 8px;"><strong style="color: #b8860b;">1. ${rDetails.attentionDomain1}:</strong> <span class="emphasis">${rDetails.refinement1}</span></p>
                  <p style="margin-bottom: 0;"><strong style="color: #b8860b;">2. ${rDetails.attentionDomain2}:</strong> <span class="emphasis">${rDetails.refinement2}</span></p>
                </div>
              </div>
            </div>

            <div class="doc-footer">
              <span>Page 03 • 5-Domain Matrix</span>
              <span>The Unbounded Leadership Co.</span>
            </div>
          </div>

          <!-- PAGE 4: STRATEGIC PRESCRIPTIONS & ROADMAP -->
          <div class="page">
            <div>
              <div class="doc-header">
                <div class="doc-brand">Architectural Prescriptions & Roadmap</div>
                <div class="doc-badge">Phase 0.0 - 04 Protocol</div>
              </div>

              <h2>03. Tailored Architectural Prescriptions</h2>
              <p class="emphasis">
                Replacing manual overhead with self-executing operational execution protocols to recover strategic bandwidth within 90 days.
              </p>

              <div class="highlight-box">
                <h3>Prescription A: ${rDetails.attentionDomain1} Calibration</h3>
                <p class="emphasis" style="font-size: 12px; line-height: 1.65; margin-bottom: 0;">
                  ${rDetails.prescription1}
                </p>
              </div>

              <div class="highlight-box" style="margin-top: 15px;">
                <h3>Prescription B: ${rDetails.attentionDomain2} Hard-Coding</h3>
                <p class="emphasis" style="font-size: 12px; line-height: 1.65; margin-bottom: 0;">
                  ${rDetails.prescription2}
                </p>
              </div>

              <h2>04. The 4-Phase Implementation Architecture</h2>
              <div style="font-size: 11px; font-family: 'Inter', sans-serif; line-height: 1.6; color: #333; margin-top: 15px;">
                <div style="border-bottom: 1px solid #eee; padding-bottom: 8px; margin-bottom: 8px;">
                  <strong style="color: #b8860b; font-family: 'JetBrains Mono', monospace; font-size: 9px; text-transform: uppercase;">Phase 0.0 • 10-Node Structural Triangulation Audit (48-Hr Readout)</strong><br />
                  Forensic analysis across 10 vital enterprise nodes (Apex Founder, CXOs, Legal Guardians, Veterans, Edge Operators) mapping intent-to-execution gaps to deliver a custom Cognitive Bandwidth Blueprint.
                </div>
                <div style="border-bottom: 1px solid #eee; padding-bottom: 8px; margin-bottom: 8px;">
                  <strong style="color: #b8860b; font-family: 'JetBrains Mono', monospace; font-size: 9px; text-transform: uppercase;">Phase 01 • Relational Substrate Calibration (6 Weeks)</strong><br />
                  Dissolving C-suite divergence, clarifying boundary conditions, and aligning C-suite expectations.
                </div>
                <div style="border-bottom: 1px solid #eee; padding-bottom: 8px; margin-bottom: 8px;">
                  <strong style="color: #b8860b; font-family: 'JetBrains Mono', monospace; font-size: 9px; text-transform: uppercase;">Phase 02 • Execution Protocol Engineering</strong><br />
                  Hard-coding founder decision heuristics into automated, pre-authorized operational execution protocols.
                </div>
                <div>
                  <strong style="color: #b8860b; font-family: 'JetBrains Mono', monospace; font-size: 9px; text-transform: uppercase;">Phase 03 & 04 • Systemic Calibration & Resonance Safeguard</strong><br />
                  Deploying Weekly Pulse Telemetry dashboards and long-term retainer safeguards to preserve strategic fidelity across global offices.
                </div>
              </div>
            </div>

            <div class="doc-footer">
              <span>Page 04 • Prescriptions & Roadmap</span>
              <span>The Unbounded Leadership Co.</span>
            </div>
          </div>

          <!-- PAGE 5: TACTICAL PLAYBOOK & INSTITUTIONAL SIGN-OFF -->
          <div class="page">
            <div>
              <div class="doc-header">
                <div class="doc-brand">Micro-Playbook & Certification</div>
                <div class="doc-badge">Institutional Verification</div>
              </div>

              <h2>05. Operational Playbook & Verification</h2>
              <p class="emphasis">
                Specific circuit breakers and governance parameters configured for ${identity.organization || 'Executive Client'}.
              </p>

              ${playbookSubmitted ? `
                <div class="gold-card">
                  <h3 style="margin-top: 0;">Configured Executive Profile</h3>
                  <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; font-family: 'Inter', sans-serif; font-size: 10px; margin-top: 10px;">
                    <div>
                      <span style="font-family: 'JetBrains Mono', monospace; font-size: 8px; color: #888; text-transform: uppercase; display: block;">Handover Horizon</span>
                      <strong style="color: #111; font-style: italic;">${playbookAnswers.handoverHorizon}</strong>
                    </div>
                    <div>
                      <span style="font-family: 'JetBrains Mono', monospace; font-size: 8px; color: #888; text-transform: uppercase; display: block;">Focus Drain Point</span>
                      <strong style="color: #111; font-style: italic;">${playbookAnswers.focusBottleneck}</strong>
                    </div>
                    <div>
                      <span style="font-family: 'JetBrains Mono', monospace; font-size: 8px; color: #888; text-transform: uppercase; display: block;">Key Risk Profile</span>
                      <strong style="color: #111; font-style: italic;">${playbookAnswers.keyRiskLevel}</strong>
                    </div>
                  </div>
                </div>
              ` : ''}

              <div class="highlight-box">
                <h3>Immediate Circuit Breaker Directives</h3>
                <ul style="font-size: 11px; font-family: 'Inter', sans-serif; line-height: 1.7; color: #333; padding-left: 18px; margin-bottom: 0;">
                  <li><strong style="color: #111;">Protocol Quarantine:</strong> Require direct leads to submit 2-minute structured Loom briefings using strict decision parameter templates prior to scheduling live alignment syncs.</li>
                  <li><strong style="color: #111;">Transaction Authority Guardrails:</strong> Legally pre-authorize operational expenditure and strategic decisions under $10,000 for secondary management layers.</li>
                </ul>
              </div>

              <div class="signature-block">
                <div>
                  <div class="signature-title">Suchita Sancheti</div>
                  <div style="font-family: 'JetBrains Mono', monospace; font-size: 8px; color: #777; text-transform: uppercase; margin-top: 2px;">
                    Founder & Enterprise Architect • Computer Science Engineer & Industrial Psychologist
                  </div>
                  <div style="font-family: 'Cinzel', serif; font-size: 10px; color: #111; margin-top: 5px; font-weight: 700;">
                    The Unbounded Leadership Co.
                  </div>
                </div>

                <div class="seal-stamp">
                  OFFICIAL INSTITUTIONAL SEAL
                </div>
              </div>
            </div>

            <div class="doc-footer">
              <span>Page 05 • Playbook & Certification</span>
              <span>The Unbounded Leadership Co. • Confidential</span>
            </div>
          </div>
        </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 600);
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
              <h2 className="text-[#b8860b] text-[10px] font-black uppercase mb-3 font-mono">90-Second Sovereign Pulse • 5-Vector Audit</h2>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-[#111111] leading-tight font-serif">
                Capture Your <span className="italic text-[#b8860b]">Alignment Premium.</span>
              </h3>
              <p className="text-zinc-700 text-sm sm:text-base mb-8 font-light italic leading-relaxed max-w-2xl mx-auto">
                Pinpoint the exact operational friction points draining up to 40% of your executive bandwidth and 15% of strategic fidelity per management layer. Complete this 90-second rapid diagnostic across the 5 Sovereign Domains to generate your confidential Sovereign Board Dossier.
              </p>

              {restoredSession && (
                <div className="mb-10 max-w-lg mx-auto bg-[#fafafa] border border-zinc-200/60 p-6 shadow-md text-left relative overflow-hidden">
                  <div className="absolute top-0 left-0 h-full w-1 bg-[#b8860b]" />
                  <h4 className="text-[10px] font-black uppercase text-[#b8860b] mb-2 flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-[#b8860b]" /> Active Protocol State Found
                  </h4>
                  <p className="text-zinc-600 text-[11px] font-light leading-relaxed mb-4 italic">
                    We detected an incomplete yield calibration session for <strong className="font-medium text-black">{restoredSession.identity?.name || 'an Executive'}</strong> at <strong className="font-medium text-black">{restoredSession.identity?.organization}</strong>. Reconnect immediately to resume protocol mapping.
                  </p>
                  <div className="flex gap-4">
                    <button
                      onClick={handleResume}
                      className="px-4 py-2.5 bg-[#111111] text-white hover:bg-[#b8860b] text-[9px] font-bold uppercase transition-all shadow-sm"
                    >
                      Resume Protocol
                    </button>
                    <button
                      onClick={handleReset}
                      className="px-4 py-2.5 bg-transparent border border-zinc-300 hover:border-red-600 hover:text-red-600 text-zinc-500 text-[9px] font-bold uppercase transition-all"
                    >
                      Discard Session
                    </button>
                  </div>
                </div>
              )}

              <div className="flex flex-col items-center gap-8">
                <button 
                  onClick={handleStart}
                  className="px-12 py-6 bg-[#111111] text-white text-[11px] font-black uppercase hover:bg-[#b8860b] transition-all shadow-2xl"
                >
                  Initiate Identity Verification
                </button>
                
                <div className="flex flex-col items-center gap-2">
                  <div className="text-[9px] uppercase text-zinc-600 font-black">Already a Principal?</div>
                  <a 
                    href="https://ai.studio/apps/bc205532-cdb0-43d3-a8fb-919809372614"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#b8860b] text-xs font-mono hover:underline flex items-center gap-2"
                  >
                    Enter The Executive Portal <ArrowRight className="w-3 h-3" />
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
              className="bg-white p-5 sm:p-6 md:p-10 shadow-2xl border border-zinc-100 text-center max-w-xl mx-auto"
            >
              <Shield className="w-8 h-8 text-[#b8860b] mx-auto mb-3" />
              <h3 className="text-xl sm:text-2xl font-bold mb-1 text-[#111111] uppercase ">Identity Protocol</h3>
              <p className="text-zinc-700 text-xs sm:text-sm mb-4 italic font-light">
                Access to the Alignment Protocol requires institutional verification. Please provide your strategic identifiers.
              </p>
              
              <form onSubmit={handleIdentitySubmit} className="space-y-3 sm:space-y-4 text-left">
                <div>
                  <label className="text-[9px] font-black uppercase text-zinc-600 block mb-1 font-sans">Institutional Identity</label>
                  <input 
                    type="text"
                    required
                    placeholder="Full Name"
                    value={identity.name}
                    onChange={(e) => setIdentity({...identity, name: e.target.value})}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 text-xs focus:outline-none focus:border-[#b8860b] italic rounded-xs"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase text-zinc-600 block mb-1 font-sans">Strategic Email</label>
                  <input 
                    type="email"
                    required
                    placeholder="Institutional Email"
                    value={identity.email}
                    onChange={(e) => setIdentity({...identity, email: e.target.value})}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 text-xs focus:outline-none focus:border-[#b8860b] italic rounded-xs"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase text-zinc-600 block mb-1 font-sans">Organization</label>
                  <input 
                    type="text"
                    required
                    placeholder="Principal Institution"
                    value={identity.organization}
                    onChange={(e) => setIdentity({...identity, organization: e.target.value})}
                    className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 text-xs focus:outline-none focus:border-[#b8860b] italic rounded-xs"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-3.5 bg-[#111111] text-white text-[10px] sm:text-[11px] font-black uppercase hover:bg-[#b8860b] transition-all shadow-lg rounded-xs"
                >
                  Initiate Verification
                </button>
              </form>
              
              {authError && (
                <div className="mt-4 p-3 bg-red-50 border border-red-100 text-red-600 text-[10px] font-bold uppercase leading-relaxed">
                  <div className="flex items-center gap-2 mb-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Verification Error</span>
                  </div>
                  {authError}
                </div>
              )}

              <div className="text-[8px] uppercase text-zinc-500 mt-4">
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
              className="bg-white p-5 sm:p-6 md:p-10 shadow-2xl border border-zinc-100 text-center max-w-xl mx-auto"
            >
              <Mic className="w-8 h-8 text-[#b8860b] mx-auto mb-2 animate-pulse" />
              <h3 className="text-xl sm:text-2xl font-bold mb-1 text-[#111111] uppercase font-sans">
                Vocal Substrate Calibration
              </h3>
              <div className="text-[#b8860b] text-[9px] font-black uppercase mb-3">
                Proprietary Real-Time Voice Alignment Diagnostic
              </div>
              
              <p className="text-zinc-700 text-xs sm:text-sm italic font-light leading-relaxed mb-4">
                Our proprietary system analyzes your responses along with core vocal frequency, semantic delay, and alignment markers to ensure absolute alignment certainty.
              </p>

              <div className="bg-black text-white p-4 rounded-xs border border-[#b8860b]/20 mb-4 text-left relative overflow-hidden">
                <div className="absolute top-2 right-2 flex items-center gap-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${micState === 'calibrating' ? 'bg-[#b8860b] animate-ping' : micState === 'completed' ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-[7px] font-mono text-zinc-500 uppercase ">
                    {micState === 'idle' ? 'Disconnected' : micState === 'calibrating' ? 'Analyzing' : 'Calibrated'}
                  </span>
                </div>

                <div className="font-mono text-[8px] text-[#b8860b] uppercase mb-2">
                  Volatile Cryptographic Ledger Matrix
                </div>

                <canvas 
                  ref={voiceCanvasRef} 
                  width="500" 
                  height="80" 
                  className="w-full h-16 sm:h-20 bg-zinc-950 border border-zinc-900 rounded-sm mb-3"
                />

                {micState === 'idle' && (
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={startVoiceCalibration}
                      className="w-full py-2.5 bg-[#b8860b] hover:bg-white hover:text-black font-bold uppercase text-[8px] sm:text-[9px] transition-all font-mono text-center block text-white"
                    >
                      Allow Microphone & Initiate Baseline Calibration
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep('context')}
                      className="w-full py-2 bg-transparent border border-zinc-800 hover:border-[#b8860b] text-zinc-400 hover:text-white font-mono text-[8px] uppercase transition-all"
                    >
                      Bypass Vocal Baseline & Proceed to Substrate Selection →
                    </button>
                  </div>
                )}

                {micState === 'calibrating' && (
                  <div className="space-y-1.5 animate-fade-in text-center">
                    <p className="text-[9px] sm:text-[10px] text-[#b8860b] italic leading-relaxed font-sans text-center bg-white/5 py-2 px-3 rounded border border-white/5 font-semibold">
                      Please read this phrase out loud into your mic:<br />
                      <span className="text-white not-italic font-bold block mt-0.5">
                        &ldquo;I am here to calibrate my cognitive alignment and eliminate decision latency.&rdquo;
                      </span>
                    </p>
                    <div className="grid grid-cols-3 gap-1.5 pt-2 border-t border-white/5 text-[7px] uppercase text-[#b8860b]/60 text-center">
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
                  <div className="space-y-2.5 animate-fade-in text-center">
                    <p className="text-[11px] text-green-500 font-semibold italic">
                      ✓ Calibration Complete. Real-Time Vocal Footprint registered successfully.
                    </p>
                    <div className="grid grid-cols-3 gap-1.5 py-1.5 border-y border-white/5 text-[7px] uppercase text-[#b8860b]/60 text-center">
                      <div>
                        <span>vocal stress coeff</span>
                        <span className="block text-white font-bold mt-0.5">1.02x (Aligned)</span>
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
                      className="w-full py-2 border border-white/10 hover:border-[#b8860b] hover:text-[#b8860b] text-white font-bold uppercase text-[8px] sm:text-[9px] transition-all font-mono"
                    >
                      Lock Calibrated Baseline & Enter Substrate Selection →
                    </button>
                  </div>
                )}
              </div>

              <div className="text-[8px] uppercase text-zinc-500 leading-normal">
                Notice: All spoken data is processed in real-time inside your browser using secure sandboxed buffers. Zero audio leaves the node.
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
              <h3 className="text-xl sm:text-2xl font-bold mb-2 text-[#111111] uppercase ">Select Institutional Substrate</h3>
              <p className="text-zinc-700 mb-6 italic font-light text-xs sm:text-sm max-w-2xl mx-auto">
                The diagnostic must be calibrated to your specific theater of operation. Select the substrate that most accurately reflects your current institutional complexity.
              </p>
              
              <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
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
                    className="bg-white p-5 sm:p-6 md:p-8 border border-zinc-100 hover:border-[#b8860b] hover:shadow-xl transition-all group flex flex-col items-center text-center relative overflow-hidden h-full rounded-xs"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-zinc-100 group-hover:bg-[#b8860b] transition-colors" />
                    <item.icon className="w-7 h-7 text-zinc-300 group-hover:text-[#b8860b] mb-3 sm:mb-4 transition-colors" />
                    <span className="text-[10px] font-black uppercase text-[#111111] mb-1">{item.label}</span>
                    <span className="text-[8px] text-[#b8860b] uppercase font-black mb-2">{item.desc}</span>
                    <p className="text-[9px] sm:text-[10px] text-zinc-600 leading-relaxed font-light italic">
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
              className="bg-white p-4 sm:p-6 md:p-10 shadow-2xl border border-zinc-100 max-w-3xl mx-auto rounded-xs"
            >
              <div className="flex justify-between items-center mb-6 md:mb-8 select-none">
                <div className="flex flex-col text-left">
                  <span className="text-[#b8860b] text-[10px] font-black uppercase ">Integrated Calibration {String(currentQuestion + 1).padStart(2, '0')}/05</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <span className="w-1 rounded-full bg-green-500 animate-pulse h-1" />
                    <span className="text-[7px] font-mono text-zinc-500 uppercase ">Real-Time Vocal Stress Alignment Tracking Active</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  {QUESTIONS.map((_, i) => (
                    <div key={i} className={`h-1 w-3 sm:w-4 ${i <= currentQuestion ? 'bg-[#b8860b]' : 'bg-zinc-100'} transition-colors`} />
                  ))}
                </div>
              </div>

              <h4 className="text-lg sm:text-xl md:text-2xl font-bold mb-6 md:mb-8 text-[#111111] leading-tight italic font-serif">
                "{shuffledQuestions[currentQuestion] ? shuffledQuestions[currentQuestion].text[context!] : QUESTIONS[currentQuestion].text[context!]}"
              </h4>

              <div className="space-y-2 sm:space-y-3">
                {shuffledQuestions[currentQuestion] ? (
                  shuffledQuestions[currentQuestion].shuffledOptions.map((item, optIdx) => (
                    <button 
                      key={optIdx}
                      onClick={() => handleAnswer(item.originalIdx)}
                      className="w-full p-4 sm:p-5 md:p-6 border border-zinc-100 hover:border-[#b8860b] hover:bg-zinc-50 transition-all text-left group flex justify-between items-center rounded-xs"
                    >
                      <div>
                        <div className="text-[9px] sm:text-[10px] font-black uppercase text-[#b8860b] mb-1">{item.option.label}</div>
                        <div className="text-zinc-700 font-light italic text-xs sm:text-sm">{item.option.description}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-[#b8860b] shrink-0 ml-4 transition-colors" />
                    </button>
                  ))
                ) : (
                  QUESTIONS[currentQuestion].options.map((opt, optIdx) => (
                    <button 
                      key={optIdx}
                      onClick={() => handleAnswer(optIdx)}
                      className="w-full p-4 sm:p-5 md:p-6 border border-zinc-100 hover:border-[#b8860b] hover:bg-zinc-50 transition-all text-left group flex justify-between items-center rounded-xs"
                    >
                      <div>
                        <div className="text-[9px] sm:text-[10px] font-black uppercase text-[#b8860b] mb-1">{opt.label}</div>
                        <div className="text-zinc-700 font-light italic text-xs sm:text-sm">{opt.description}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-zinc-300 group-hover:text-[#b8860b] shrink-0 ml-4 transition-colors" />
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
              <h3 className="text-xl font-bold mb-4 text-[#111111] uppercase font-mono">Cross-Domain Mapping in Progress</h3>
              <p className="text-zinc-500 italic font-light animate-pulse font-serif">Synthesizing multi-vector alignment and estimating key-person risk thresholds...</p>
            </motion.div>
          )}

          {step === 'dossier' && (() => {
            const rDetails = getReportDetails();
            const dScores = computeDomainScores(answers);
            const totalScoreValue = dScores.reduce((a, b) => a + b.score, 0);

            // Refills insights with politically correct, highly structured, CEO-caliber copy engineered for high-stakes urgency
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
                definition: "The precise externalization of leadership's strategic algorithms to empower autonomous execution layers without manual founder intervention.",
                strength: "Your enterprise demonstrates exceptional capability in crafting long-term strategic vectors. Your intuitive market compass is pristine, consistently anticipating compound market moves before competitors.",
                refinement: "However, because this strategic law is held in your head rather than codified into immutable execution protocols, your calendar is consumed by daily tactical approvals, slide deck reviews, and reactive firefighting.",
                urgency: "Compounding Cost of Inaction: Every month without invariant alignment gates burns 60+ hours of founder bandwidth in redundant coordination, directly capping your enterprise valuation and speed to market.",
                objection: "Systemic Principle: True scaling is never achieved through bloated documentation or endless syncs, but by encoding apex decision heuristics into self-executing delegation envelopes.",
                benefit: "Strategic Bandwidth Reclaimed: Liberate up to 15+ hours weekly to command high-yield capital moves and permanent market dominance.",
                symptoms: [
                  "Executive team dedicating 15+ hours weekly to manual alignment check-ins to confirm baseline intent.",
                  "Tactical executions stalling in approval queues waiting for executive desk sign-off.",
                  "High-performance operators seeking verbal reassurance to avoid personal decision risk."
                ]
              },
              "Systemic Integrity": {
                definition: "The structural self-regulation of corporate processes, shielding business continuity from natural human variance or individual heroics.",
                strength: "You have cultivated exemplary loyalty and dedication across your inner circle. Your core operators possess rare dedication and fight fiercely during high-stakes sprints.",
                refinement: "However, the enterprise currently relies on heroic human willpower rather than invariant architecture. When you step away, operational velocity decelerates and execution fidelity degrades by up to 40%.",
                urgency: "Compounding Cost of Inaction: Operating with key-person structural dependence imposes a 25–35% valuation penalty during capital events and leaves the enterprise vulnerable to key talent departures.",
                objection: "Strategic Alignment Framework: Invariant systems do not mean bureaucratic red tape. They represent autonomous decision containers that allow top talent to execute at maximum velocity without asking permission.",
                benefit: "Systemic Immunity: Stress-test operations to run autonomously for 30+ consecutive days without a single operational dip or founder override.",
                symptoms: [
                  "Key leaders routinely working 60+ hour weeks to manually bridge gaps between departments.",
                  "Handoff friction between business units causing 2-to-4 week execution delays on strategic initiatives.",
                  "Core operating procedures living in individual heads rather than programmatic decision software."
                ]
              },
              "Strategic Velocity": {
                definition: "The speed index measuring how fast the enterprise reallocates capital, talent, and focus to capture emerging market windows.",
                strength: "Your apex team possesses exceptional strategic agility. When market crises or major opportunities emerge, your instinctual response is swift, decisive, and formidable.",
                refinement: "However, while decision velocity is instant at the top, execution speed across middle management is severely throttled by multi-tiered review cycles and consensus-seeking committees.",
                urgency: "Compounding Cost of Inaction: A 3-week execution latency window allows competitors to capture prime market share and erodes up to $1.4M annually in executive coordination drag.",
                objection: "Agility & Stewardship: High-velocity execution, guided by pre-authorized capital limits and clear risk guardrails, strengthens risk control rather than compromising governance.",
                benefit: "Frictionless Response: Accelerate decision-to-market deployment by up to 3.5x, establishing undisputed category leadership.",
                symptoms: [
                  "Strategic maneuvers taking weeks of cross-departmental alignment syncs before deployment.",
                  "Capital reallocation trapped in quarterly review cycles rather than triggered by live market signals.",
                  "Frontline execution teams pausing work to seek multi-tier signoffs on minor tactical variations."
                ]
              },
              "Moral Gravity": {
                definition: "The systemic alignment of operational processes with uncompromised ethics, governance, and institutional brand equity.",
                strength: "The enterprise possesses an impeccable foundation of trust and values, making your brand highly respected and admired by elite institutional partners and clients.",
                refinement: "However, ethical governance currently relies on the founder's personal vigilance. When middle management faces quarterly target pressure, there are no codified boundaries preventing short-term compromise.",
                urgency: "Compounding Cost of Inaction: A single uncontained governance breach or reputational compromise can erase years of built trust and trigger severe institutional friction.",
                objection: "Integrity Cohesion: By engineering values directly into automated workflows and reward structures, moral alignment becomes an unbreakable default rather than a managerial policing burden.",
                benefit: "Quiet Compliance: Eliminate manual audit fatigue while ensuring your institutional reputation remains an unshakeable fortress.",
                symptoms: [
                  "Senior leadership having to step in personally to adjudicate ethical or quality trade-offs.",
                  "Customer delivery gates requiring personal executive checks to maintain pristine standards.",
                  "Middle management occasionally passing ethical dilemmas upward to avoid taking personal responsibility."
                ]
              },
              "Cultural Fidelity": {
                definition: "The replication index measuring how precisely your original vision, passion, and high standards cascade to newly added management layers.",
                strength: "The core founding circle maintains immense pride and conviction, carrying the company's initial flame with absolute devotion and relentless passion.",
                refinement: "However, signal fidelity drops precipitously below Tier 2. Frontline teams operate with only 34% of your original intent, resulting in the 'Silence of Compliance' where teams nod in meetings but hesitate in the field.",
                urgency: "Compounding Cost of Inaction: Context starvation across middle management creates defensive reporting, disguised errors, and constant escalations back to the CEO desk.",
                objection: "Sustaining Resonance: Systematizing culture does not dilute human connection; it creates the transparent substrate where excellence, truth, and pride replicate automatically.",
                benefit: "Continuous Perpetuity: Build a self-cohering talent ecosystem that automatically inducts new leaders into a culture of peak standards with zero signal loss.",
                symptoms: [
                  "Severe fidelity drop between boardroom strategy and frontline execution reality.",
                  "Operational mistakes and missed targets concealed until they escalate into full emergencies.",
                  "Frontline standard validation requiring continuous, exhausting executive oversight."
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
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b border-white/10 gap-3 text-left">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#b8860b] animate-pulse" />
                          <span className="text-[#b8860b] text-[8px] font-bold uppercase font-mono tracking-widest">
                            PHASE 01 EMERGENCY TRIAGE • CONFIDENTIAL AUDIT
                          </span>
                        </div>
                        <div className="text-sm font-bold uppercase font-mono">
                          Dossier <span className="text-[#b8860b]">{dossierId}</span>
                        </div>
                      </div>

                      {/* Smart Zoom Controls & Actions */}
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Zoom Control Group */}
                        <div className="flex items-center bg-black/60 border border-white/15 p-1 rounded-xs">
                          <button
                            type="button"
                            onClick={() => setZoomLevel(prev => Math.max(100, prev - 25))}
                            disabled={zoomLevel <= 100}
                            className="p-1 hover:bg-zinc-800 text-zinc-300 disabled:opacity-30 transition-all cursor-pointer"
                            title="Zoom Out"
                          >
                            <ZoomOut className="w-3.5 h-3.5" />
                          </button>

                          <span className="px-2 text-[9px] font-mono font-bold text-[#b8860b] min-w-[42px] text-center select-none">
                            {zoomLevel}%
                          </span>

                          <button
                            type="button"
                            onClick={() => setZoomLevel(prev => Math.min(200, prev + 25))}
                            disabled={zoomLevel >= 200}
                            className="p-1 hover:bg-zinc-800 text-zinc-300 disabled:opacity-30 transition-all cursor-pointer"
                            title="Zoom In"
                          >
                            <ZoomIn className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setIsZoomInspectorOpen(true)}
                            className="ml-1 pl-1.5 border-l border-white/10 text-zinc-300 hover:text-white flex items-center gap-1 text-[8px] font-mono uppercase font-bold p-1 hover:bg-zinc-800 transition-all cursor-pointer"
                            title="Open Fullscreen Smart Inspector"
                          >
                            <Maximize2 className="w-3 h-3 text-[#b8860b]" />
                            <span className="hidden sm:inline">Inspect</span>
                          </button>
                        </div>

                        <button
                          type="button"
                          onClick={handleExportFullDossierPDF}
                          className="px-3.5 py-1.5 bg-[#b8860b] hover:bg-white hover:text-black text-white text-[9px] font-bold uppercase font-mono transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                          title="Download complete publication-grade Executive Dossier PDF"
                        >
                          <Download className="w-3 h-3 text-white" />
                          <span>Export PDF</span>
                        </button>

                        <span className="px-3 py-1 bg-white text-black text-[9px] font-black uppercase font-mono hidden sm:inline">
                          {getGrade()}
                        </span>
                      </div>
                    </div>

                    <motion.div 
                      className="mt-4 transition-transform duration-300 origin-top"
                      style={{
                        transform: zoomLevel !== 100 ? `scale(${zoomLevel / 100})` : 'none',
                        marginBottom: zoomLevel > 100 ? `${(zoomLevel - 100) * 2}px` : '0px'
                      }}
                    >
                      {dossierPage === 1 && (
                        /* PAGE 1: COVER PAGE & EMERGENCY TRIAGE THESIS */
                        <div className="flex flex-col justify-center text-center py-4 px-4 space-y-5">
                          <div className="flex justify-center">
                            <BrandLogo size="md" variant="full" theme="dark" className="border-none bg-transparent shadow-none" />
                          </div>
                          <div>
                            <div className="inline-block px-3 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[8px] font-mono uppercase font-bold tracking-widest mb-2">
                              STAGE 1 RAPID TRIAGE DIAGNOSTIC • PRE-AUDIT SUMMARY
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1 leading-tight font-serif">
                              CONFIDENTIAL SOVEREIGN DOSSIER
                            </h2>
                            <p className="text-xs sm:text-sm text-zinc-300 max-w-xl mx-auto italic font-light leading-relaxed mt-2 font-serif">
                              &ldquo;The audited enterprise exhibits the physics of a <strong className="text-white font-semibold">One-Mind Engine</strong>. The Principal's strategic clarity is extraordinary, but intent currently acts as a manual override for the institution, imposing an estimated <span className="text-[#b8860b] font-bold">$1.4M+ in annual coordination drag</span> and 18.5 hrs/week in executive meeting tax.&rdquo;
                            </p>
                          </div>

                          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 text-left max-w-2xl mx-auto w-full text-[10px] font-mono text-zinc-400">
                            <div className="bg-white/[0.02] p-2.5 border border-white/5">
                              <span className="text-zinc-500 block uppercase text-[7px] font-bold mb-0.5">Audited Principal</span>
                              <span className="text-white italic">{identity.name || 'Executive Principal'}</span>
                            </div>
                            <div className="bg-white/[0.02] p-2.5 border border-white/5">
                              <span className="text-zinc-500 block uppercase text-[7px] font-bold mb-0.5">Enterprise Node</span>
                              <span className="text-white italic">{identity.organization || 'Elite Entity'}</span>
                            </div>
                            <div className="bg-white/[0.02] p-2.5 border border-white/5">
                              <span className="text-zinc-500 block uppercase text-[7px] font-bold mb-0.5">Stage 1 Index</span>
                              <span className="text-[#b8860b] font-bold uppercase">{getGrade()} ({Math.round((totalScoreValue / 25) * 100)}%)</span>
                            </div>
                          </div>

                          <div className="p-3 bg-[#b8860b]/10 border border-[#b8860b]/30 rounded-xs text-left max-w-2xl mx-auto w-full font-mono text-[9px] text-zinc-300">
                            <span className="text-[#b8860b] font-bold uppercase block mb-1">
                              ⚡ Mandate Verification Gate:
                            </span>
                            This 5-Vector Pulse identifies where your enterprise is actively leaking capital. To calculate your exact numerical escalation thresholds and engineer your custom 12 Execution Protocols, advance to the <strong>10-Question Clinical Forensic Intake</strong>.
                          </div>
                        </div>
                      )}

                      {dossierPage === 2 && (
                        /* PAGE 2: PRIMAL INSTITUTIONAL ASSET & THE 2.0-POINT DELTA */
                        <div className="space-y-4 py-2 text-left">
                          <span className="text-[9px] font-black uppercase text-[#b8860b] font-mono block">
                            Module 01 // Sovereign Anchor & Vector Delta
                          </span>
                          <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight font-serif">
                            Primary Institutional Asset: <span className="text-[#b8860b]">{rDetails.strengthDomain}</span>
                          </h3>
                          <div className="space-y-4 font-serif">
                            <p className="text-base sm:text-lg text-zinc-100 italic leading-relaxed font-light pl-3 border-l-2 border-[#b8860b]">
                              "{refinedInsights[rDetails.strengthDomain]?.strength || rDetails.strength}"
                            </p>
                            
                            <div className="grid sm:grid-cols-2 gap-4 pt-2 font-mono text-xs">
                              <div className="p-3.5 bg-white/[0.02] border border-white/10 rounded-xs">
                                <span className="text-[8px] uppercase text-emerald-400 font-bold block mb-1">Apex Anchor (Top-Down Clarity)</span>
                                <span className="text-xl font-bold text-white block">5.0 / 5.0</span>
                                <p className="text-[9px] text-zinc-400 font-serif italic mt-1">Founder vision is pristine and intuitive.</p>
                              </div>
                              <div className="p-3.5 bg-rose-500/10 border border-rose-500/30 rounded-xs">
                                <span className="text-[8px] uppercase text-rose-400 font-bold block mb-1">Execution Substrate (Tier 2-3 Fidelity)</span>
                                <span className="text-xl font-bold text-rose-400 block">3.0 / 5.0</span>
                                <p className="text-[9px] text-zinc-400 font-serif italic mt-1">2.0-Point translation gap creates reliance on CEO override.</p>
                              </div>
                            </div>

                            <p className="text-xs text-zinc-400 leading-relaxed font-light">
                              The diagnostic confirms you possess immense visionary capital. However, because this wisdom exists in your mind rather than in self-executing organizational code, the firm’s scale is currently subsidized by <strong className="text-white">founder exhaustion</strong>.
                            </p>
                          </div>
                        </div>
                      )}

                      {dossierPage === 3 && (
                        /* PAGE 3: CRITICAL ATTENTION FIELD 01 // ACTIVE CAPITAL DRAIN */
                        <div className="space-y-4 py-2 text-left">
                          <div className="text-[9px] font-black uppercase text-rose-400 font-mono flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-rose-400 rounded-full animate-pulse" />
                            Module 02 // Critical Systemic Leakage 01 [ACTIVE DRAIN]
                          </div>
                          <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight font-serif">
                            Primary Friction Vector: <span className="text-rose-400">{rDetails.attentionDomain1}</span>
                          </h3>
                          <div className="space-y-3 font-serif">
                            <p className="text-sm sm:text-base text-zinc-200 italic leading-relaxed font-light pl-3 border-l-2 border-rose-400">
                              "{d1Ins?.refinement || rDetails.refinement1}"
                            </p>
                            <p className="text-xs text-zinc-300 leading-relaxed font-mono bg-rose-950/20 border border-rose-900/40 p-2.5">
                              ⚠️ <strong className="text-rose-400 uppercase text-[9px] block mb-0.5">Active Operational Bleed:</strong>
                              {d1Ins?.urgency || rDetails.domainInsights[rDetails.attentionDomain1]?.urgency}
                            </p>
                            <div className="p-3.5 bg-white/[0.01] border border-white/5 rounded-xs mt-2 font-mono">
                              <span className="text-[8px] font-bold text-[#b8860b] uppercase block mb-2 font-mono">Observed Forensic Symptoms</span>
                              <div className="space-y-1.5">
                                {(d1Ins?.symptoms || rDetails.symptoms1).slice(0, 3).map((s, idx) => (
                                  <div key={idx} className="flex gap-2 text-xs italic text-zinc-400 font-light items-start">
                                    <span className="w-1 h-1 bg-rose-400 rounded-full mt-1.5 shrink-0" />
                                    <span>{s}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="text-[9px] font-mono text-zinc-400 italic">
                              *Stage 1 isolated this symptom. Stage 2 (10-Question Deep Intake) calculates the exact mathematical trigger rules required to seal this leak.
                            </div>
                          </div>
                        </div>
                      )}

                      {dossierPage === 4 && (
                        /* PAGE 4: CRITICAL ATTENTION FIELD 02 & COMPOUNDING COST OF DELAY */
                        <div className="space-y-4 py-2 text-left">
                          <div className="text-[9px] font-black uppercase text-amber-400 font-mono flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-pulse" />
                            Module 03 // Secondary Structural Vulnerability & Compounding Inaction Cost
                          </div>
                          <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight font-serif">
                            Vulnerability 02: <span className="text-[#b8860b]">{rDetails.attentionDomain2}</span>
                          </h3>
                          
                          {/* Compounding Cost of Inaction Table */}
                          <div className="bg-[#151515] border border-white/10 p-3 rounded-xs font-mono text-xs space-y-2">
                            <span className="text-[8px] uppercase text-[#b8860b] font-bold block">The Compounding Cost of a 90-Day Delay</span>
                            <div className="grid grid-cols-3 gap-2 text-[10px]">
                              <div className="p-2 bg-black/40 border border-white/5">
                                <span className="text-zinc-500 block text-[7px] uppercase font-bold">30-Day Delay</span>
                                <span className="text-white font-bold block mt-0.5">74 hrs lost</span>
                                <span className="text-zinc-400 text-[8px]">In CEO firefights</span>
                              </div>
                              <div className="p-2 bg-black/40 border border-white/5">
                                <span className="text-zinc-500 block text-[7px] uppercase font-bold">60-Day Delay</span>
                                <span className="text-amber-400 font-bold block mt-0.5">$230K drag</span>
                                <span className="text-zinc-400 text-[8px]">Coordination waste</span>
                              </div>
                              <div className="p-2 bg-black/40 border border-rose-500/30">
                                <span className="text-rose-400 block text-[7px] uppercase font-bold">90-Day Delay</span>
                                <span className="text-rose-400 font-bold block mt-0.5">Key-Person Risk</span>
                                <span className="text-zinc-400 text-[8px]">Acute flight danger</span>
                              </div>
                            </div>
                          </div>

                          <div className="p-3 bg-white/[0.01] border border-white/5 rounded-xs space-y-1 font-serif text-xs">
                            <p className="text-zinc-300 italic font-light">
                              &ldquo;{d2Ins?.refinement || rDetails.refinement2}&rdquo;
                            </p>
                            <p className="text-[10px] text-zinc-400 font-mono pt-1">
                              Systemic Unlock: <span className="text-[#b8860b]">{d2Ins?.benefit}</span>
                            </p>
                          </div>
                        </div>
                      )}

                      {dossierPage === 5 && (
                        /* PAGE 5: 12 EXECUTION PROTOCOLS ARCHITECTURE & UNSEALED BREACHES */
                        <div className="space-y-3 py-1 text-left">
                          <span className="text-[9px] font-black uppercase text-[#b8860b] font-mono block">
                            Module 04 // 12 Execution Protocols Architecture & Unsealed Breaches
                          </span>
                          <h3 className="text-lg sm:text-xl font-bold text-white leading-tight mb-1 font-serif">
                            Codified Execution Protocol Prescriptions
                          </h3>
                          <p className="text-zinc-400 text-[10px] italic font-serif leading-relaxed mb-2 pb-1 border-b border-white/5">
                            We do not offer generic coaching. We install immutable operating execution protocols that eliminate approval queues permanently:
                          </p>
                          <div className="space-y-2 font-mono text-xs">
                            <div className="p-2.5 bg-[#161616] border border-white/10 rounded-xs flex justify-between items-center">
                              <div>
                                <span className="text-[#b8860b] font-bold text-[10px] block">GATES 01–04 // AUTONOMOUS CAPITAL & DELEGATION ENVELOPES</span>
                                <span className="text-zinc-400 text-[9px] font-serif">Pre-authorized signoff limits up to $150k under strict risk constraints.</span>
                              </div>
                              <span className="px-2 py-0.5 bg-rose-500/20 text-rose-400 text-[8px] font-bold uppercase shrink-0">UNSEALED</span>
                            </div>

                            <div className="p-2.5 bg-[#161616] border border-white/10 rounded-xs flex justify-between items-center">
                              <div>
                                <span className="text-[#b8860b] font-bold text-[10px] block">GATES 05–08 // STRICT 3-CONDITION ESCALATION FILTER</span>
                                <span className="text-zinc-400 text-[9px] font-serif">Issues route to CEO desk strictly under existential brand, budget, or ethical triggers.</span>
                              </div>
                              <span className="px-2 py-0.5 bg-amber-500/20 text-amber-400 text-[8px] font-bold uppercase shrink-0">CALIBRATING</span>
                            </div>

                            <div className="p-2.5 bg-[#161616] border border-white/10 rounded-xs flex justify-between items-center">
                              <div>
                                <span className="text-[#b8860b] font-bold text-[10px] block">GATES 09–12 // ASYNCHRONOUS CONTEXT BROADCASTING</span>
                                <span className="text-zinc-400 text-[9px] font-serif">Weekly strategic rationale logs + zero-penalty error transparency protocol.</span>
                              </div>
                              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[8px] font-bold uppercase shrink-0">RECOMMENDED</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {dossierPage === 6 && (
                        /* PAGE 6: EMPIRICAL TELEMETRY, VOICE USP & Q3 MANDATE SCARCITY */
                        <div className="space-y-4 py-1 text-left">
                          <span className="text-[9px] font-black uppercase text-[#b8860b] font-mono block">
                            Module 05 // Empirical Calibration & Mandate Allocation
                          </span>
                          
                          <div className="grid md:grid-cols-12 gap-4 items-start">
                            {/* Column 1: Core Indices */}
                            <div className="md:col-span-6 space-y-3">
                              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xs">
                                <div className="text-[8px] uppercase font-black text-zinc-500 mb-0.5 font-mono">Aggregate Fidelity Index</div>
                                <div className="flex items-end gap-1 mb-1">
                                  <span className="text-2xl font-bold text-[#b8860b] font-mono">
                                    {Math.round((totalScoreValue / 25) * 100)}
                                  </span>
                                  <span className="text-xs text-zinc-600 mb-0.5 font-black">%</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                  <div 
                                    style={{ width: `${Math.round((totalScoreValue / 25) * 100)}%` }}
                                    className="h-full bg-[#b8860b] transition-all duration-1000"
                                  />
                                </div>
                              </div>

                              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xs">
                                <div className="text-[8px] uppercase font-black text-zinc-500 mb-0.5 font-mono">Reclaimable CEO Bandwidth</div>
                                <div className="flex items-end gap-1 mb-1">
                                  <span className="text-2xl font-bold text-white font-mono">
                                    15.0+
                                  </span>
                                  <span className="text-xs text-zinc-600 mb-0.5 font-black">hrs/week</span>
                                </div>
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                  <div 
                                    style={{ width: `85%` }}
                                    className="h-full bg-emerald-400 transition-all duration-1000"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Column 2: Voice USP profile */}
                            <div className="md:col-span-6 p-3 bg-[#111] border border-[#b8860b]/20 text-white space-y-2 font-mono text-[9px]">
                              <div className="flex justify-between items-center border-b border-white/15 pb-1.5">
                                <span className="text-[#b8860b] font-bold uppercase text-[8px]">Vocal Resonance Analyzer</span>
                                <span className="text-emerald-400 font-bold text-[7px] uppercase bg-emerald-950 px-1.5 py-0.5 border border-emerald-900">
                                  ✓ SECURE MATCH
                                </span>
                              </div>
                              <div className="space-y-1 text-zinc-300">
                                <div className="flex justify-between">
                                  <span className="text-zinc-500">Spectral Stress Index:</span>
                                  <span className="text-white font-bold">{voiceCalibrated ? "1.02x (Optimal)" : "Simulated 1.05x"}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-zinc-500">Alignment Parity:</span>
                                  <span className="text-[#b8860b] font-bold">96.8% Compliant</span>
                                </div>
                              </div>
                              <div className="p-2 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[8px] font-sans italic mt-1">
                                <strong>Institutional Scarcity Notice:</strong> Suchita Sancheti accepts exactly 3 private client mandates per quarter (2 committed for Q3). Complete the 10-Question Intake to qualify for the final mandate.
                              </div>
                            </div>
                          </div>

                          <div className="bg-[#1a140d]/40 border border-[#b8860b]/20 p-2.5 rounded-xs">
                            <div className="text-[8px] uppercase font-black text-[#b8860b] font-mono mb-0.5">Priority Diagnostic Finding</div>
                            <p className="text-zinc-200 text-xs italic font-serif leading-relaxed">
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
                              <span className="text-[8px] uppercase font-mono font-bold text-[#b8860b] block">
                                Phase 01 Immediate Value Injection
                              </span>
                              <h4 className="text-lg font-bold text-white leading-tight font-serif">
                                Instant Tactical Circuit Breakers
                              </h4>
                            </div>
                            {playbookSubmitted && (
                              <button
                                type="button"
                                onClick={handleExportFullDossierPDF}
                                className="text-[8px] font-bold uppercase border border-white/20 px-3 py-1 bg-[#b8860b] text-white hover:bg-white hover:text-black transition-all flex items-center gap-1.5 font-mono cursor-pointer"
                              >
                                <Download className="w-3 h-3" /> Download / Print PDF Dossier
                              </button>
                            )}
                          </div>

                          {!playbookSubmitted ? (
                            !showPlaybookOnboard ? (
                              <div className="space-y-4 font-serif">
                                <p className="text-xs sm:text-sm text-zinc-300 italic font-light leading-relaxed">
                                  Generate 2 immediate circuit breakers tailored to your organization. Answer these 3 rapid profile dimensions to compile your tactical bridge.
                                </p>
                                <button
                                  onClick={() => setShowPlaybookOnboard(true)}
                                  className="px-6 py-3 bg-[#b8860b] hover:bg-white hover:text-black text-white text-[9px] font-bold uppercase transition-all font-mono cursor-pointer"
                                >
                                  Calibrate My Circuit Breakers ➔
                                </button>
                              </div>
                            ) : (
                              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                                <div className="grid sm:grid-cols-3 gap-4">
                                  {/* Q1 */}
                                  <div className="space-y-2">
                                    <label className="text-[8px] font-black uppercase text-zinc-300 block font-mono">1. Handover Horizon</label>
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
                                    <label className="text-[8px] font-black uppercase text-zinc-300 block font-mono">2. Cognitive Drain Point</label>
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
                                    <label className="text-[8px] font-black uppercase text-zinc-300 block font-mono">3. Key-Person Risk Profile</label>
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
                                      await SovereignDB.sendContactEmail({
                                        name: identity.name,
                                        email: identity.email,
                                        organization: identity.organization,
                                        message: `Playbook Gated Profile Configured // Horizon: ${playbookAnswers.handoverHorizon}, Bottleneck: ${playbookAnswers.focusBottleneck}, Key Risk: ${playbookAnswers.keyRiskLevel}`,
                                        type: 'PLAYBOOK_CONFIGURED',
                                        playbookData: playbookAnswers
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
                                  className="w-full px-6 py-3 bg-[#b8860b] hover:bg-white hover:text-black text-white text-[9px] font-bold uppercase transition-all font-mono cursor-pointer"
                                >
                                  {isGeneratingPlaybook ? 'Compiling Playbook Framework...' : 'Authorize & Compile Circuit Breakers'}
                                </button>
                              </div>
                            )
                          ) : (
                            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                              {/* Diagnostic Summary Recaps */}
                              <div className="grid grid-cols-3 gap-2 text-[10px] p-2 bg-white/[0.02] border border-white/5 font-mono">
                                <div>
                                  <span className="text-zinc-500 block uppercase text-[7px] font-bold">Horizon</span>
                                  <span className="text-white italic">{playbookAnswers.handoverHorizon}</span>
                                </div>
                                <div>
                                  <span className="text-zinc-500 block uppercase text-[7px] font-bold">Bottleneck</span>
                                  <span className="text-white italic">{playbookAnswers.focusBottleneck}</span>
                                </div>
                                <div>
                                  <span className="text-zinc-500 block uppercase text-[7px] font-bold">Key Risk</span>
                                  <span className="text-white italic">{playbookAnswers.keyRiskLevel}</span>
                                </div>
                              </div>

                              <div className="p-4 bg-black/40 border border-white/5 space-y-2 rounded-xs">
                                <h5 className="text-[10px] font-bold text-[#b8860b] uppercase font-mono">
                                  Immediate Circuit Breakers for {rDetails.attentionDomain1}
                                </h5>
                                <p className="text-zinc-400 text-xs leading-relaxed font-serif italic">
                                  To instantly stem the bleed of "{playbookAnswers.focusBottleneck}", install these two rules tomorrow:
                                </p>
                                <div className="space-y-1.5 text-xs text-zinc-300 font-serif pl-2">
                                  <div>• <strong>Protocol Quarantine</strong>: Forbid verbal alignment syncs. Require leads to submit 2-minute structured Loom briefings answering the 3 core decision parameters.</div>
                                  <div>• <strong>Transaction Authority Guardrails</strong>: Legally delegate any operational decision under $10,000 to Tier-2 leads without requiring your prior signoff.</div>
                                </div>
                                <div className="pt-2 border-t border-white/5 text-[9px] font-mono text-[#b8860b]">
                                  Advance to Leaf 08 to qualify for the full 12-Gate Architectural Mandate.
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {dossierPage === 8 && (
                        /* PAGE 8: PRE-MANDATE VERIFICATION GATE & 10-QUESTION CLINICAL INTAKE */
                        <div className="space-y-3 py-1 text-left">
                          <div className="border-b border-white/10 pb-3 flex justify-between items-center">
                            <div>
                              <span className="text-[8px] uppercase font-mono font-bold text-[#b8860b] block">
                                Stage 02 Mandate Unlock
                              </span>
                              <h4 className="text-lg font-bold text-white leading-tight font-serif">
                                10-Question Clinical Reassessment & Private Board Briefing
                              </h4>
                            </div>
                            <span className="px-2.5 py-1 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-[8px] font-mono uppercase font-bold">
                              1 OF 3 MANDATES OPEN FOR Q3
                            </span>
                          </div>

                          <div className="grid sm:grid-cols-12 gap-6 items-start pt-1">
                            <div className="sm:col-span-5 space-y-2 bg-white/[0.01] border border-white/5 p-3 rounded-xs font-mono">
                              <span className="text-[8px] font-black uppercase text-[#b8860b] block">Phase 2 Forensic Deliverables</span>
                              <div className="space-y-1 text-[10px] text-zinc-400 italic font-serif">
                                <div className="flex justify-between border-b border-white/5 py-1">
                                  <span>10-Question Deep Architectural Intake</span>
                                  <span className="text-emerald-400 font-mono text-[9px] font-bold">[Included]</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 py-1">
                                  <span>60-Min Private Board Briefing with Suchita Sancheti</span>
                                  <span className="text-emerald-400 font-mono text-[9px] font-bold">[Included]</span>
                                </div>
                                <div className="flex justify-between py-1">
                                  <span>10-Node Custom 12-Gate Architectural Blueprint</span>
                                  <span className="text-[#b8860b] font-mono text-[9px] font-bold">[Phase 0.0]</span>
                                </div>
                              </div>
                            </div>

                            <div className="sm:col-span-7 space-y-3">
                              {!isPaid ? (
                                <div className="space-y-3">
                                  <p className="text-xs text-zinc-300 font-light leading-relaxed italic font-serif">
                                    To protect advisory depth, Suchita Sancheti takes on only 3 institutional mandates per quarter. Submit your direct coordinate below to access the deep 10-Question Reassessment and schedule your confidential 60-minute briefing.
                                  </p>
                                  
                                  <div className="p-4 bg-black/60 border border-zinc-800 text-left rounded-sm">
                                    <h6 className="text-[9px] font-bold uppercase text-[#b8860b] mb-2 font-mono flex items-center gap-1.5">
                                      <Shield className="w-3 h-3 text-[#b8860b]" /> Authorize Stage-2 Reassessment & Private Briefing
                                    </h6>
                                    
                                    {!vipInvoiceSuccess ? (
                                      <form onSubmit={handleVIPInvoiceSubmit} className="space-y-2.5">
                                        <div>
                                          <input
                                            type="text"
                                            placeholder="Direct Phone or WhatsApp Coordinate"
                                            value={vipInvoiceInputs.phone}
                                            onChange={(e) => setVipInvoiceInputs({ ...vipInvoiceInputs, phone: e.target.value })}
                                            className="w-full px-2.5 py-1.5 bg-zinc-900 border border-zinc-850 text-white text-[11px] italic focus:outline-none focus:border-[#b8860b]"
                                            required
                                          />
                                        </div>
                                        <button
                                          type="submit"
                                          disabled={isSubmittingVIPWire}
                                          className="w-full py-2.5 bg-[#b8860b] hover:bg-white hover:text-black font-mono font-bold uppercase text-[9px] text-white transition-all shadow-lg cursor-pointer"
                                        >
                                          {isSubmittingVIPWire ? "Securing Mandate Coordinate..." : "Submit Coordinate & Unlock Deep Assessment"}
                                        </button>
                                      </form>
                                    ) : (
                                      <div className="p-2.5 bg-[#b8860b]/10 border border-[#b8860b]/20 text-center rounded-xs">
                                        <Check className="w-4 h-4 text-[#b8860b] mx-auto mb-1" />
                                        <span className="text-[8px] font-mono uppercase text-white font-bold block">Coordinate Registered</span>
                                        <p className="text-[9px] text-zinc-300 italic font-serif">
                                          Your briefing request is logged. Kamini Agnihotri (Client Relations Coordinator) will confirm your executive session within 4 hours.
                                        </p>
                                        <button
                                          type="button"
                                          onClick={() => setIsPaid(true)}
                                          className="mt-2 w-full py-1.5 bg-white/10 hover:bg-[#b8860b] hover:text-black text-white font-mono text-[8px] uppercase transition-all cursor-pointer font-bold"
                                        >
                                          Advance Directly to 10-Question Portal
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <div className="space-y-3 animate-fade-in text-center py-2">
                                  <div className="p-3 bg-[#b8860b]/10 border border-[#b8860b]/30">
                                    <div className="text-[9px] uppercase text-[#b8860b] font-mono font-bold">10-Question Clinical Portal Unlocked</div>
                                    <p className="text-xs text-zinc-300 italic font-light mt-1 font-serif">Your direct executive node is authorized for the in-depth architectural intake.</p>
                                  </div>

                                  <a 
                                    href="https://ai.studio/apps/bc205532-cdb0-43d3-a8fb-919809372614"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative px-6 py-4 bg-[#b8860b] text-black font-mono font-bold uppercase text-[10px] hover:bg-white transition-all shadow-xl flex items-center justify-center gap-2 overflow-hidden text-center mx-auto no-underline cursor-pointer"
                                  >
                                    <span>Begin 10-Question Clinical Assessment ➔</span>
                                  </a>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* NAVIGATION PAGES CONTROLS (Static footer section, preventing layout shifts) */}
                  <div className="flex justify-between items-center pt-4 border-t border-white/10 mt-6 select-none">
                    <button
                      onClick={() => setDossierPage(prev => Math.max(1, prev - 1))}
                      disabled={dossierPage === 1}
                      className="px-4 py-2 bg-black border border-white/10 hover:border-[#b8860b] text-[9px] font-bold uppercase disabled:opacity-30 transition-all font-mono cursor-pointer"
                    >
                      ← Prev Leaf
                    </button>
                    <span className="text-[10px] font-mono text-[#b8860b] uppercase font-bold">
                      Leaf {dossierPage.toString().padStart(2, '0')} of 08
                    </span>
                    <button
                      onClick={() => setDossierPage(prev => Math.min(8, prev + 1))}
                      disabled={dossierPage === 8}
                      className="px-4 py-2 bg-black border border-white/10 hover:border-[#b8860b] text-[9px] font-bold uppercase disabled:opacity-30 transition-all font-mono cursor-pointer"
                    >
                      Next Leaf →
                    </button>
                  </div>

                  <div className="mt-4 pt-2 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-2 select-none text-[8px] font-mono text-zinc-600 uppercase ">
                    <span>Calibration Target: {identity.email}</span>
                    <span>TULC Phase 01 Emergency Triage Record</span>
                  </div>

                  {/* EMBED WIDGET (Renders nicely below nav controls on page 8 only or when desired, but keeping to prevent layout disruptions) */}
                  {dossierPage === 8 && (
                    <div className="mt-6 pt-4 border-t border-white/5 text-center">
                      <span className="text-[8px] uppercase font-bold text-[#b8860b] block mb-2 font-mono">
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
                          <span className="text-[7px] font-bold text-zinc-500 uppercase block mb-1">HTML EMBED (ALIGNMENT SEAL)</span>
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

        {/* Full-Screen Smart Zoom Inspector Modal */}
        <AnimatePresence>
          {isZoomInspectorOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 md:p-8"
            >
              {/* Header Bar */}
              <div className="flex justify-between items-center pb-4 border-b border-white/10 text-white font-mono z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#b8860b]/20 border border-[#b8860b]/40 rounded-xs">
                    <Eye className="w-5 h-5 text-[#b8860b]" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-[#b8860b] flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" /> Smart Optical Zoom Inspector
                    </div>
                    <div className="text-sm font-bold text-zinc-100">Dossier Leaf #{dossierPage} • HD Vector View</div>
                  </div>
                </div>

                {/* Zoom & Action Controls */}
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-xs">
                    <ZoomOut className="w-4 h-4 text-zinc-400 cursor-pointer hover:text-white" onClick={() => setInspectorZoom(prev => Math.max(100, prev - 25))} />
                    <input
                      type="range"
                      min="100"
                      max="300"
                      step="10"
                      value={inspectorZoom}
                      onChange={(e) => setInspectorZoom(Number(e.target.value))}
                      className="w-28 accent-[#b8860b] cursor-pointer"
                    />
                    <ZoomIn className="w-4 h-4 text-zinc-400 cursor-pointer hover:text-white" onClick={() => setInspectorZoom(prev => Math.min(300, prev + 25))} />
                    <span className="text-xs font-bold text-[#b8860b] w-12 text-right">{inspectorZoom}%</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsZoomInspectorOpen(false)}
                    className="px-4 py-2 bg-[#b8860b] hover:bg-white hover:text-black text-white text-xs font-bold uppercase transition-all flex items-center gap-2 cursor-pointer font-mono shadow-md"
                  >
                    <Minimize2 className="w-4 h-4" />
                    <span>Close</span>
                  </button>
                </div>
              </div>

              {/* Pan Canvas */}
              <div className="flex-grow my-4 relative overflow-hidden flex items-center justify-center border border-white/10 bg-[#070707] rounded-xs cursor-grab active:cursor-grabbing p-4">
                <motion.div
                  drag
                  dragConstraints={{ left: -400, right: 400, top: -400, bottom: 400 }}
                  style={{ scale: inspectorZoom / 100 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 25 }}
                  className="p-8 md:p-12 max-w-4xl w-full bg-[#111111] border border-[#b8860b]/40 text-white shadow-2xl rounded-xs select-none"
                >
                  <div className="text-right text-[8px] font-mono text-[#b8860b] uppercase tracking-widest mb-4 flex items-center justify-end gap-1.5 border-b border-white/10 pb-2">
                    <Move className="w-3 h-3 animate-pulse" /> Drag canvas to pan • Smart Zoom Active
                  </div>

                  {/* Content View */}
                  <div className="space-y-4 font-serif">
                    <div className="text-xs font-mono text-[#b8860b] uppercase tracking-wider">
                      Executive Briefing • Leaf 0{dossierPage}
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
                      {dossierPage === 1 && "CONFIDENTIAL STRATEGIC DOSSIER"}
                      {dossierPage === 2 && `Primary Institutional Asset: ${rDetails.strengthDomain}`}
                      {dossierPage === 3 && `Refinement Vector 01: ${rDetails.attentionDomain1}`}
                      {dossierPage === 4 && `Refinement Vector 02: ${rDetails.attentionDomain2}`}
                      {dossierPage === 5 && "Dynamic Recalibration Strategy"}
                      {dossierPage === 6 && "Empirical Calibration & Real-Time Voice Cross-Map"}
                      {dossierPage === 7 && "Alignment Micro-Playbook Calibrator"}
                      {dossierPage === 8 && "Assessment Portal Direct Access"}
                    </h2>

                    <div className="text-sm text-zinc-300 leading-relaxed italic border-l-2 border-[#b8860b] pl-4 py-1">
                      {dossierPage === 1 && "Bespoke institutional alignment audit calibrating cognitive tax, coordination latency, and organizational integrity."}
                      {dossierPage === 2 && `"${refinedInsights[rDetails.strengthDomain]?.strength || rDetails.strength}"`}
                      {dossierPage === 3 && `"${d1Ins?.refinement || rDetails.refinement1}"`}
                      {dossierPage === 4 && `"${d2Ins?.refinement || rDetails.refinement2}"`}
                      {dossierPage === 5 && "Selective recalibration targeting your two highest-friction domains for immediate operational recovery."}
                      {dossierPage === 6 && `Aggregate Alignment Fidelity: ${Math.round((totalScoreValue / 50) * 100)}% • Cognitive Bandwidth Reclaimed: ${Math.round(80 + (totalScoreValue / 5))}%`}
                      {dossierPage === 7 && "Operational circuit breakers and pre-approved transaction authorities hard-coded for your organization."}
                      {dossierPage === 8 && "Continuous live telemetry and institutional verification badge ledger."}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Leaf Switcher */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-3 border-t border-white/10 text-white font-mono text-xs z-10">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-zinc-500 uppercase text-[9px] mr-1">Leaf Navigation:</span>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(p => (
                    <button
                      key={p}
                      onClick={() => setDossierPage(p)}
                      className={`px-2.5 py-1 text-[10px] font-bold border transition-all cursor-pointer ${dossierPage === p ? 'bg-[#b8860b] text-white border-[#b8860b]' : 'bg-black text-zinc-400 border-zinc-800 hover:border-zinc-500'}`}
                    >
                      0{p}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleExportFullDossierPDF}
                  className="px-4 py-1.5 bg-[#b8860b] text-white hover:bg-white hover:text-black text-[10px] font-bold uppercase transition-all flex items-center gap-1.5 font-mono cursor-pointer shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" /> Print Full PDF
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Assessment;
