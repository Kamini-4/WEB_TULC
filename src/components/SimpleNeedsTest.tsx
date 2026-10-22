import React, { useState } from 'react';
import { 
  ArrowRight, 
  RotateCcw, 
  AlertTriangle, 
  TrendingDown, 
  ShieldCheck, 
  Clock, 
  Zap, 
  CheckCircle2, 
  Sparkles,
  ChevronDown,
  Brain,
  Cpu,
  Layers,
  Shield,
  HelpCircle,
  FileText
} from 'lucide-react';

interface DomainQuestion {
  id: string;
  domainNumber: string;
  domainName: string;
  domainSubtitle: string;
  oneSentenceMission: string;
  icon: typeof Brain;
  prompt: string;
  options: {
    label: string;
    description: string;
    penaltyDays: number;
    score: number; // 0 to 20 per domain (total 100)
    ebitdaImpactPercent: number;
    painPointDiagnostic: string;
    desiredOutcome: string;
  }[];
}

const FIVE_DOMAINS_QUESTIONS: DomainQuestion[] = [
  {
    id: 'cognitive_clarity',
    domainNumber: '01',
    domainName: 'Bandwidth Insulation & Focus Sovereignty',
    domainSubtitle: 'Protecting executive calendar & prefrontal bandwidth from tactical triage',
    oneSentenceMission: 'Insulates executive focus from reactive firefighting, returning 15+ hours weekly for capital allocation and strategic growth.',
    icon: Brain,
    prompt: 'As a CXO or Executive Principal, how is your daily leadership bandwidth and strategic attention predominantly consumed?',
    options: [
      {
        label: 'Reactive Operational Triage (Severe Friction)',
        description: 'My schedule is consumed by urgent operational escalations, reactive triage, and fielding routine tactical questions from direct reports.',
        penaltyDays: 14,
        score: 4,
        ebitdaImpactPercent: 4.5,
        painPointDiagnostic: 'Executive bandwidth is trapped in reaction mode; your high-leverage strategic insight is held hostage by operational noise.',
        desiredOutcome: 'Hard-code executive insulation protocols to reclaim 15+ hours weekly for strategic capital compounding.'
      },
      {
        label: 'Fragmented Attention (Frequent Interruptions)',
        description: 'Strategic time blocks are scheduled, but sudden departmental escalations and sign-off requests routinely breach deep-work sessions.',
        penaltyDays: 7,
        score: 11,
        ebitdaImpactPercent: 2.5,
        painPointDiagnostic: 'Escalation thresholds are ambiguous, causing direct reports to pass routine trade-offs upward to your desk.',
        desiredOutcome: 'Institute explicit boundary covenants so senior managers resolve operational trade-offs autonomously.'
      },
      {
        label: 'Insulated Strategic Focus (Zero Friction)',
        description: 'Codified asynchronous governance protects deep work; zero routine operational interruptions reach my desk.',
        penaltyDays: 0,
        score: 20,
        ebitdaImpactPercent: 0,
        painPointDiagnostic: 'Your executive schedule is impeccably defended, leaving maximal cognitive equity for high-conviction decisions.',
        desiredOutcome: 'Maintain invariant decision boundaries and steward enterprise expansion with total composure.'
      }
    ]
  },
  {
    id: 'systemic_integrity',
    domainNumber: '02',
    domainName: 'Delegation Architecture & Execution Fidelity',
    domainSubtitle: 'Codifying decision boundaries so teams execute with 100% fidelity without sign-offs',
    oneSentenceMission: 'Translates executive standards into codified decision thresholds so leaders deliver flawless execution with zero rework.',
    icon: Cpu,
    prompt: 'When mission-critical initiatives and departmental mandates are delegated across senior leadership, what is the default operational reality?',
    options: [
      {
        label: 'Executive Rework & Subpar Delivery (Critical Bottleneck)',
        description: 'Deliverables routinely deviate from strategic standards, forcing the C-suite to step in, rewrite, or rescue execution directly.',
        penaltyDays: 16,
        score: 4,
        ebitdaImpactPercent: 5.5,
        painPointDiagnostic: 'Teams depend on executive safety nets, preventing authentic decentralized ownership and diluting institutional output.',
        desiredOutcome: 'Codify founder and C-suite standards into immutable decision blueprints that guarantee flawless autonomous delivery.'
      },
      {
        label: 'Hesitant Escalation Loops (Approval Drag)',
        description: 'Competent leaders execute routine items well, but pause before committing capital or deciding trade-offs, seeking executive confirmation.',
        penaltyDays: 9,
        score: 12,
        ebitdaImpactPercent: 3.0,
        painPointDiagnostic: 'Hesitation around unratified liability slows operational velocity and draws the C-suite into routine procedural reviews.',
        desiredOutcome: 'Grant pre-ratified spending covenants ($50,000+ limits) and explicit veto frameworks to unlock autonomous velocity.'
      },
      {
        label: 'Flawless Autonomous Delivery (Institutional Sovereignty)',
        description: 'Initiatives conclude on schedule to exact institutional standards with zero C-suite rework or intervention required.',
        penaltyDays: 0,
        score: 20,
        ebitdaImpactPercent: 0,
        painPointDiagnostic: 'Your leadership bench operates with complete executive maturity and decisive individual accountability.',
        desiredOutcome: 'Scale enterprise divisions and enter new markets without requiring additional executive supervision.'
      }
    ]
  },
  {
    id: 'strategic_velocity',
    domainNumber: '03',
    domainName: 'Market Agility & Decision Compression',
    domainSubtitle: 'Compressing decision cadences from 6 weeks to 72 hours via single-person vetoes',
    oneSentenceMission: 'Eliminates consensus committee gridlock so your enterprise manifests strategic pivots in 72 hours instead of 6 weeks.',
    icon: Zap,
    prompt: 'From the moment an executive decision or high-stakes pivot is ratified, how long does it take your enterprise to deploy it into live market execution?',
    options: [
      {
        label: 'Committee Gridlock & Consensus Drag (6 to 12+ Weeks)',
        description: 'Directives bounce across multi-department review decks, risk hedging committees, and sequential approval rounds.',
        penaltyDays: 24,
        score: 4,
        ebitdaImpactPercent: 6.0,
        painPointDiagnostic: 'Diffused accountability incentivizes defensive stalling, allowing agile market competitors to seize advantage.',
        desiredOutcome: 'Compress decision cycle latency from 60+ days down to 72 hours via single-principal veto frameworks.'
      },
      {
        label: 'Linear Approval Cascades (3 to 5 Weeks)',
        description: 'Initiatives move through standard linear gates with weekly status check-ins and cross-functional handoff friction.',
        penaltyDays: 10,
        score: 12,
        ebitdaImpactPercent: 3.0,
        painPointDiagnostic: 'Procedural meetings dilute urgency and delay high-value customer acquisitions and product deployments.',
        desiredOutcome: 'Replace bi-weekly status rituals with 14-day asynchronous execution loops and rapid deployment sprints.'
      },
      {
        label: 'High-Velocity Sovereign Manifestation (Under 7 Days)',
        description: 'Direct reports possess explicit authority to deploy budget and mobilize personnel immediately upon strategic signal.',
        penaltyDays: 1,
        score: 20,
        ebitdaImpactPercent: 0,
        painPointDiagnostic: 'Your institution operates at market-leading velocity, compounding competitive advantage through relentless execution.',
        desiredOutcome: 'Compound market dominance through continuous asynchronous operational superiority.'
      }
    ]
  },
  {
    id: 'moral_gravity',
    domainNumber: '04',
    domainName: 'Peer Calibration & Cultural Standards',
    domainSubtitle: 'Enforcing peer-to-peer accountability so substandard work is arrested immediately',
    oneSentenceMission: 'Installs peer accountability cadences where leaders self-regulate and challenge mediocrity before it reaches executive exposure.',
    icon: Shield,
    prompt: 'When executive deliverables, team standards, or performance benchmarks fall below institutional expectations, how is it confronted?',
    options: [
      {
        label: 'Single-Person Filter (C-Suite Bottleneck)',
        description: 'The chief executive or founder must personally identify deficiencies and demand corrections; without top oversight, quality deteriorates.',
        penaltyDays: 12,
        score: 4,
        ebitdaImpactPercent: 4.5,
        painPointDiagnostic: 'You are operating as the enterprise proofreader and disciplinarian, burning valuable leadership capital on baseline quality.',
        desiredOutcome: 'Install mutual quality covenants so the executive team rigorously critiques and elevates work autonomously.'
      },
      {
        label: 'Diplomatic Avoidance (Polite Silence)',
        description: 'Shortfalls are avoided in public conclaves to maintain collegiality, leaving structural underperformance unaddressed.',
        penaltyDays: 8,
        score: 11,
        ebitdaImpactPercent: 2.5,
        painPointDiagnostic: 'Artificial harmony masks performance drag, slowly eroding institutional excellence and profitability.',
        desiredOutcome: 'Cultivate radical, high-trust executive candor where senior leaders challenge each other constructively.'
      },
      {
        label: 'Ruthless Peer Calibration (Self-Correcting)',
        description: 'The executive bench self-regulates immediately; peers rigorously challenge, refine, and elevate deliverables before boardroom exposure.',
        penaltyDays: 0,
        score: 20,
        ebitdaImpactPercent: 0,
        painPointDiagnostic: 'Your leadership team demonstrates collective stewardship, fiercely defending institutional integrity.',
        desiredOutcome: 'Scale headcount and enterprise footprint without diluting uncompromising operational standards.'
      }
    ]
  },
  {
    id: 'cultural_fidelity',
    domainNumber: '05',
    domainName: 'Institutional Perpetuity & Decoupling',
    domainSubtitle: 'Ensuring enterprise momentum accelerates even during complete executive absence',
    oneSentenceMission: 'Dismantles single-person dependency so the enterprise compounds faster during a 14-day executive absence than when present.',
    icon: Layers,
    prompt: 'If the chief executive or primary executive principal were completely unreachable (zero phone, email, or messaging) for 14 straight days, what would occur?',
    options: [
      {
        label: 'Enterprise Paralysis (Critical Key-Person Risk)',
        description: 'Major transactions freeze, partner disputes bottleneck, and executive momentum halts awaiting the principal\'s return.',
        penaltyDays: 28,
        score: 4,
        ebitdaImpactPercent: 7.5,
        painPointDiagnostic: 'You have constructed a high-revenue enterprise that remains a fragile personal dependency; stepping away threatens stability.',
        desiredOutcome: 'Decouple founder and executive dependency in 90 days, enabling autonomous operational perpetuity.'
      },
      {
        label: 'Operational Stagnation (Coasting on Momentum)',
        description: 'Routine workflows continue smoothly, but high-stakes contract negotiations, strategic partnerships, and new initiatives pause.',
        penaltyDays: 12,
        score: 12,
        ebitdaImpactPercent: 3.5,
        painPointDiagnostic: 'The business maintains status quo but lacks decentralized authority to close transformative opportunities without the principal.',
        desiredOutcome: 'Ratify sovereign negotiation mandates empowering C-suite direct reports to close multi-million dollar contracts independently.'
      },
      {
        label: 'Compounding Sovereign Momentum (Fully Decoupled)',
        description: 'The enterprise accelerates; leadership closes strategic deals, expands margins, and compounds value with zero operational disruption.',
        penaltyDays: 0,
        score: 20,
        ebitdaImpactPercent: 0,
        painPointDiagnostic: 'The pinnacle of organizational maturity: a self-governing sovereign institution commanding premium enterprise valuation.',
        desiredOutcome: 'Enjoy unencumbered sovereignty while your executive architecture compounds enterprise equity perpetually.'
      }
    ]
  }
];

interface SimpleNeedsTestProps {
  onConsultationRequest: (testSummary: string) => void;
  onExplorePartnerships: () => void;
  onProceedToInDepth: () => void;
}

export const SimpleNeedsTest: React.FC<SimpleNeedsTestProps> = ({
  onConsultationRequest,
  onExplorePartnerships,
  onProceedToInDepth
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [annualRevenue, setAnnualRevenue] = useState<number>(15000000); // $15M default
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleSelectOption = (optionIndex: number) => {
    const updated = [...answers, optionIndex];
    setAnswers(updated);

    if (currentStep < FIVE_DOMAINS_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setIsCompleted(false);
  };

  // Calculations across 5 domains
  const totalScore = answers.reduce((sum, optIdx, qIdx) => {
    return sum + (FIVE_DOMAINS_QUESTIONS[qIdx]?.options[optIdx]?.score || 0);
  }, 0);

  const totalPenaltyDays = answers.reduce((sum, optIdx, qIdx) => {
    return sum + (FIVE_DOMAINS_QUESTIONS[qIdx]?.options[optIdx]?.penaltyDays || 0);
  }, 0);

  const totalEbitdaLossPercent = answers.reduce((sum, optIdx, qIdx) => {
    return sum + (FIVE_DOMAINS_QUESTIONS[qIdx]?.options[optIdx]?.ebitdaImpactPercent || 0);
  }, 0);

  const estimatedAnnualEbitdaBleed = (annualRevenue * totalEbitdaLossPercent) / 100;
  const needsUsVerdict = totalScore < 75;

  const handleSendResultsToBriefing = () => {
    const summary = `5-Domain Sovereign Operating Audit Results:
- Overall Sovereignty Index: ${totalScore}/100 (${needsUsVerdict ? 'CRITICAL BOTTLENECK - REQUIRES OPERATIONAL DECOUPLING' : 'SOVEREIGN MATURITY'})
- Annual Revenue Baseline: $${(annualRevenue / 1000000).toFixed(1)}M USD
- Annual Inaction Tax (EBITDA Bleed): $${(estimatedAnnualEbitdaBleed / 1000).toFixed(0)}k USD (${totalEbitdaLossPercent.toFixed(1)}% of top-line)
- Accumulated Decision Latency: ${totalPenaltyDays} Days delay per strategic cycle
- Bandwidth Recovery Opportunity: 15–20 Hours Every Week
- 5 Domains Evaluated:
  1. Cognitive Clarity: ${FIVE_DOMAINS_QUESTIONS[0].options[answers[0] ?? 0]?.label} (${FIVE_DOMAINS_QUESTIONS[0].options[answers[0] ?? 0]?.score}/20 pts)
  2. Systemic Integrity: ${FIVE_DOMAINS_QUESTIONS[1].options[answers[1] ?? 0]?.label} (${FIVE_DOMAINS_QUESTIONS[1].options[answers[1] ?? 0]?.score}/20 pts)
  3. Strategic Velocity: ${FIVE_DOMAINS_QUESTIONS[2].options[answers[2] ?? 0]?.label} (${FIVE_DOMAINS_QUESTIONS[2].options[answers[2] ?? 0]?.score}/20 pts)
  4. Moral Gravity: ${FIVE_DOMAINS_QUESTIONS[3].options[answers[3] ?? 0]?.label} (${FIVE_DOMAINS_QUESTIONS[3].options[answers[3] ?? 0]?.score}/20 pts)
  5. Cultural Fidelity: ${FIVE_DOMAINS_QUESTIONS[4].options[answers[4] ?? 0]?.label} (${FIVE_DOMAINS_QUESTIONS[4].options[answers[4] ?? 0]?.score}/20 pts)
- Recommendation: Proceed immediately to In-Depth L.O.S. Diagnostic & Confidential Advisory Debrief.`;

    onConsultationRequest(summary);
  };

  const currentQ = FIVE_DOMAINS_QUESTIONS[currentStep];
  const CurrentIcon = currentQ?.icon || Brain;

  return (
    <section id="simple-test" className="py-10 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 border-b border-[#e5decfe0] bg-[#f8f6f0] relative">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header Card & 100% Free Trigger Button */}
        <div className="bg-[#ffffff] border border-[#d8cebe] rounded-lg p-5 sm:p-7 shadow-xs mb-6 text-center space-y-3">
          
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#17181c] text-[#d4af37] text-xs font-mono uppercase font-bold rounded-xs shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>100% Free · No Payment Required</span>
            </span>
            <span className="text-xs font-mono text-[#8f6d28] font-bold bg-[#faf6ee] border border-[#ebdcc0] px-2.5 py-1 rounded-xs">
              5 Core Institutional Domains · Instant Outcome Report
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#17181c] leading-tight tracking-tight [text-wrap:balance]">
            The 5-Domain Sovereign Operating Audit
          </h2>
          
          <p className="text-sm sm:text-base text-[#4e5159] leading-relaxed max-w-2xl mx-auto">
            Diplomatically evaluate your enterprise across <strong className="text-[#17181c]">Cognitive Clarity, Systemic Integrity, Strategic Velocity, Moral Gravity</strong>, and <strong className="text-[#17181c]">Cultural Fidelity</strong>. Uncover where executive latency is quietly draining your EBITDA.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            {!isOpen ? (
              <button
                onClick={() => setIsOpen(true)}
                className="w-full sm:w-auto px-7 py-3 text-xs font-bold uppercase text-white bg-[#17181c] hover:bg-[#282a30] transition-all rounded-sm flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-98"
              >
                <span>Launch Free 5-Domain Assessment (60 Sec)</span>
                <ChevronDown className="w-4 h-4 text-[#d4af37]" />
              </button>
            ) : !isCompleted ? (
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#6e727c]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Assessment Active: Domain {currentStep + 1} of 5</span>
              </div>
            ) : (
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#f0eade] hover:bg-[#e4ded0] text-xs font-mono text-[#17181c] rounded-xs transition-colors cursor-pointer border border-[#ded6c5]"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#9d7b38]" />
                <span>Retake Free Assessment</span>
              </button>
            )}
          </div>
        </div>

        {/* ASSESSMENT BODY (Under the Button) */}
        {isOpen && (
          <div>
            {!isCompleted ? (
              /* Questionnaire Card */
              <div className="bg-[#ffffff] border border-[#d8cebe] rounded-lg p-5 sm:p-8 shadow-sm transition-all relative">
                
                {/* Step Indicator (Domain Names Hidden During Assessment) */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs font-mono text-[#6e727c] mb-2.5">
                    <div className="flex items-center gap-2">
                      <CurrentIcon className="w-4 h-4 text-[#9d7b38]" />
                      <span className="font-bold text-[#17181c] uppercase tracking-wider">
                        STRATEGIC INVARIANT {currentQ.domainNumber} OF 05
                      </span>
                    </div>
                    <span className="text-[#9d7b38] font-bold font-mono">
                      {Math.round(((currentStep + 1) / FIVE_DOMAINS_QUESTIONS.length) * 100)}% COMPLETE
                    </span>
                  </div>

                  {/* 5-Step Progress Indicators */}
                  <div className="grid grid-cols-5 gap-1.5 h-1.5 rounded-full overflow-hidden bg-[#f0eade]">
                    {FIVE_DOMAINS_QUESTIONS.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-full transition-all duration-300 ${
                          idx <= currentStep ? 'bg-[#9d7b38]' : 'bg-transparent'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="text-[11px] font-mono text-[#8f6d28] mt-1.5">
                    Executive Operating Calibration · Confidential Evaluation
                  </div>
                </div>

                {/* Prompt Details */}
                <div className="mb-5 space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-bold text-[#17181c] leading-snug">
                    {currentQ.prompt}
                  </h3>
                  <p className="text-xs text-[#6e727c]">
                    Select the option that reflects your organization's objective operating reality.
                  </p>
                </div>

                {/* Executive Context Box (No Domain Names Revealed) */}
                <div className="p-3 sm:p-3.5 bg-[#faf8f5] border-l-4 border-[#9d7b38] rounded-r-md text-xs sm:text-sm text-[#17181c] leading-relaxed shadow-2xs mb-5">
                  <div className="font-bold text-[#9d7b38] uppercase text-[11px] font-mono tracking-normal mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#9d7b38]" />
                    <span>Executive Calibration Metric:</span>
                  </div>
                  <p className="font-medium text-[#4e5159] italic">
                    Measuring organizational velocity, decentralized decision rights, and latent key-person bottleneck risks.
                  </p>
                </div>

                {/* Politically Correct Options */}
                <div className="space-y-3">
                  {currentQ.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className="w-full text-left p-4 sm:p-5 rounded-md bg-[#faf8f5] hover:bg-[#17181c] text-[#17181c] hover:text-white border border-[#ded6c5] hover:border-[#17181c] transition-all duration-200 cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs hover:shadow-md"
                    >
                      <div className="space-y-1 pr-2">
                        <div className="text-sm sm:text-base font-bold flex items-center gap-2 group-hover:text-[#d4af37] transition-colors">
                          <span className="w-6 h-6 rounded-full bg-[#ede5d6] text-[#17181c] group-hover:bg-[#d4af37] group-hover:text-[#17181c] text-xs font-mono font-bold flex items-center justify-center shrink-0">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{opt.label}</span>
                        </div>
                        <p className="text-xs sm:text-[13px] text-[#5e626d] group-hover:text-stone-300 pl-8 leading-relaxed">
                          {opt.description}
                        </p>
                      </div>

                      <div className="shrink-0 pl-8 sm:pl-0 flex items-center gap-1 text-xs font-mono text-[#9d7b38] group-hover:text-[#d4af37] font-semibold">
                        <span>Select</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  ))}
                </div>

                {/* Navigation Back */}
                {currentStep > 0 && (
                  <div className="mt-6 pt-4 border-t border-[#f0eade] flex justify-start">
                    <button
                      onClick={() => {
                        setCurrentStep(currentStep - 1);
                        setAnswers(answers.slice(0, -1));
                      }}
                      className="text-xs font-mono text-[#6e727c] hover:text-[#17181c] transition-colors flex items-center gap-1.5 cursor-pointer py-1"
                    >
                      <span>← Return to previous domain</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* IN-DEPTH FORENSIC REPORT — DEEP BLACK, IMMUTABLE PERSUASION & URGENT ONBOARDING ENGINE */
              <div className="bg-black border-2 border-[#d4af37] rounded-xl p-5 sm:p-8 lg:p-10 shadow-2xl space-y-8 animate-in fade-in duration-300 text-white">
                
                {/* Header of Report */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-800">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="px-2.5 py-0.5 rounded-xs bg-[#d4af37] text-black text-[10px] font-mono uppercase font-black tracking-widest">
                        Confidential Forensic Memorandum
                      </span>
                      <span className="text-[11px] font-mono text-[#d4af37]">
                        Privileged Advisory Synthesis · Signed by Suchita Sancheti
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                      C-Suite Sovereignty Ledger & Vulnerability Map
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#17181c] hover:bg-[#252830] text-xs font-mono text-stone-300 rounded-xs transition-colors cursor-pointer border border-stone-700"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Retake Calibration</span>
                    </button>
                  </div>
                </div>

                {/* THE UNVARNISHED CXO VERDICT: PRESSING WHERE IT HURTS */}
                <div className="p-6 sm:p-7 rounded-lg bg-[#0e0f12] text-white border-2 border-[#d4af37] shadow-xl">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                    <div className="space-y-3 max-w-2xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-xs text-[11px] font-mono uppercase font-black ${
                          needsUsVerdict ? 'bg-rose-900/90 text-rose-200 border border-rose-500' : 'bg-emerald-900/90 text-emerald-200 border border-emerald-500'
                        }`}>
                          {needsUsVerdict ? 'DIAGNOSIS: ACUTE OPERATIONAL CONFINEMENT' : 'DIAGNOSIS: GOVERNANCE FRICTION DETECTED'}
                        </span>
                        <span className="text-xs font-mono text-[#d4af37] font-semibold">
                          Executive Sovereignty Score: {totalScore} / 100
                        </span>
                      </div>

                      <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white">
                        {needsUsVerdict 
                          ? 'You built an empire, but your leadership operating system has trapped you inside it.'
                          : 'Your enterprise demonstrates resilience, but latent structural latency compromises scale.'}
                      </h4>

                      <p className="text-xs sm:text-sm text-stone-300 leading-relaxed italic border-l-2 border-[#d4af37] pl-3.5">
                        {needsUsVerdict ? (
                          <>
                            "You are currently the primary operational bottleneck of your enterprise. When strategic initiatives, pricing deviations, and personnel disputes flow back to your desk, your leadership bench develops learned helplessness. Every day you delay installing sovereign decision architecture compounds operational drag, bleeds enterprise EBITDA, and discounts your valuation multiple."
                          </>
                        ) : (
                          <>
                            "Your core operational circuits function cleanly, but cross-functional hesitation and approval delays continue to cost valuable strategic velocity. The next step is installing permanent institutional governance."
                          </>
                        )}
                      </p>
                    </div>

                    {/* Score Dial */}
                    <div className="shrink-0 self-center lg:self-auto flex flex-col items-center justify-center w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-[#d4af37] bg-[#14151a] text-center shadow-2xl ring-4 ring-[#d4af37]/20">
                      <span className="text-3xl sm:text-4xl font-bold font-mono text-[#d4af37] tabular-nums">
                        {totalScore}%
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-stone-400 mt-0.5">
                        Sovereign Index
                      </span>
                    </div>
                  </div>
                </div>

                {/* THE QUANTIFIED INACTION TAX (CREATING EXTREME URGENCY) */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-mono uppercase tracking-wider text-[#d4af37] font-bold">
                      Forensic Metrics & Compounding Inaction Cost:
                    </div>
                    <span className="text-[11px] font-mono text-stone-400">
                      Calibrated for ${(annualRevenue / 1000000).toFixed(1)}M USD Revenue
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                    
                    {/* Metric 1: Daily Cost */}
                    <div className="p-4 rounded-lg bg-[#111216] border border-rose-800/80 shadow-md space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-rose-400 font-bold uppercase font-mono">
                        <TrendingDown className="w-4 h-4 text-rose-400" />
                        <span>Daily Cost of Delay</span>
                      </div>
                      <div className="text-2xl font-bold font-mono text-rose-300 tabular-nums">
                        ${Math.round(estimatedAnnualEbitdaBleed / 365).toLocaleString()} / day
                      </div>
                      <div className="text-[11px] text-stone-400">
                        Every day without codified architecture burns real capital in executive drag.
                      </div>
                    </div>

                    {/* Metric 2: Annual EBITDA Drain */}
                    <div className="p-4 rounded-lg bg-[#111216] border border-rose-800/80 shadow-md space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-rose-400 font-bold uppercase font-mono">
                        <AlertTriangle className="w-4 h-4 text-rose-400" />
                        <span>Annual EBITDA Leak</span>
                      </div>
                      <div className="text-2xl font-bold font-mono text-rose-300 tabular-nums">
                        ${(estimatedAnnualEbitdaBleed / 1000).toLocaleString(undefined, { maximumFractionDigits: 0 })}k / yr
                      </div>
                      <div className="text-[11px] text-stone-400">
                        {totalEbitdaLossPercent.toFixed(1)}% of gross top-line forfeited to coordination friction.
                      </div>
                    </div>

                    {/* Metric 3: Decision Cycle Delay */}
                    <div className="p-4 rounded-lg bg-[#111216] border border-amber-800/80 shadow-md space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-amber-400 font-bold uppercase font-mono">
                        <Clock className="w-4 h-4 text-amber-400" />
                        <span>Decision Cycle Drag</span>
                      </div>
                      <div className="text-2xl font-bold font-mono text-amber-300 tabular-nums">
                        {totalPenaltyDays} Days → 72 Hrs
                      </div>
                      <div className="text-[11px] text-stone-400">
                        Strategic pivots stall across committee rounds while competitors deploy in days.
                      </div>
                    </div>

                    {/* Metric 4: Valuation Multiple Discount */}
                    <div className="p-4 rounded-lg bg-[#111216] border border-[#d4af37]/70 shadow-md space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-[#d4af37] font-bold uppercase font-mono">
                        <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                        <span>Multiple Penalty</span>
                      </div>
                      <div className="text-2xl font-bold font-mono text-white tabular-nums">
                        -25% to -35%
                      </div>
                      <div className="text-[11px] text-stone-400">
                        Institutional investors heavily discount firms tethered to key-person dependency.
                      </div>
                    </div>

                  </div>
                </div>

                {/* Revenue Calibrator Slider (Black Theme) */}
                <div className="p-4 sm:p-5 bg-[#0f1014] border border-stone-800 rounded-lg space-y-3 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-stone-300 font-bold uppercase tracking-wider font-mono">
                      Calibrate Annual Enterprise Revenue Baseline:
                    </span>
                    <span className="text-[#d4af37] font-bold text-base sm:text-lg font-mono">
                      ${(annualRevenue / 1000000).toFixed(1)}M USD Annual Revenue
                    </span>
                  </div>
                  <input
                    type="range"
                    min={2000000}
                    max={100000000}
                    step={1000000}
                    value={annualRevenue}
                    onChange={(e) => setAnnualRevenue(Number(e.target.value))}
                    className="w-full accent-[#d4af37] cursor-pointer h-2 bg-stone-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-stone-500">
                    <span>$2M (Emerging Scale-Up)</span>
                    <span>$20M (Mid-Market Engine)</span>
                    <span>$100M+ (Enterprise Conglomerate)</span>
                  </div>
                </div>

                {/* 5 Strategic Invariants Forensic Friction Breakdown */}
                <div className="p-5 sm:p-6 rounded-lg bg-[#0e0f13] border border-stone-800 space-y-4 text-xs">
                  <div className="flex items-center justify-between border-b border-stone-800 pb-2">
                    <span className="font-mono uppercase tracking-wider text-[#d4af37] font-bold text-xs">
                      Forensic Audit Breakdown Across the 5 Strategic Invariants:
                    </span>
                    <span className="text-[11px] font-mono text-stone-400">
                      Audit Lead: Suchita Sancheti
                    </span>
                  </div>

                  <div className="space-y-4">
                    {FIVE_DOMAINS_QUESTIONS.map((q, idx) => {
                      const selectedOpt = q.options[answers[idx] ?? 0];
                      const Icon = q.icon;
                      return (
                        <div key={q.id} className="pt-3 border-t border-stone-800/80 first:pt-0 first:border-0 space-y-1.5">
                          <div className="flex items-center justify-between font-bold text-white">
                            <span className="flex items-center gap-2">
                              <Icon className="w-4 h-4 text-[#d4af37]" />
                              <span className="text-sm font-serif">Strategic Invariant {q.domainNumber}: {q.domainName}</span>
                            </span>
                            <span className="font-mono text-[#d4af37]">{selectedOpt.score} / 20 pts</span>
                          </div>
                          <div className="text-stone-300 leading-relaxed pl-6">
                            <span className="font-semibold text-rose-400 font-mono uppercase text-[11px]">Identified Friction:</span> {selectedOpt.painPointDiagnostic}
                          </div>
                          <div className="text-emerald-300 leading-relaxed pl-6">
                            <span className="font-semibold text-emerald-400 font-mono uppercase text-[11px]">Sovereign Fix:</span> {selectedOpt.desiredOutcome}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* WHY TRADITIONAL CONSULTING FAILS & WHY TULC IS ESSENTIAL */}
                <div className="p-5 sm:p-6 rounded-lg bg-[#111217] border border-[#d4af37]/40 space-y-3 text-xs text-stone-300">
                  <div className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 font-mono">
                    <Sparkles className="w-4 h-4 text-[#d4af37]" />
                    <span>Why Conventional Solutions Have Failed Your C-Suite:</span>
                  </div>
                  <p className="leading-relaxed italic">
                    "Management consultants sell 200-page slide decks that leave unwritten rules and committee paralysis intact. Executive coaches treat executive exhaustion as personal stress rather than architectural failure. Neither changes your governance cybernetics. Suchita Sancheti enters your boardroom to install explicit boundary covenants, dismantle founder bottleneck dependencies, and install 14-day asynchronous execution cadences that compound permanently without you."
                  </p>
                </div>

                {/* URGENT ONBOARDING CALL TO ACTION — LIMITED QUARTERLY MANDATES */}
                <div className="p-6 sm:p-8 rounded-lg bg-gradient-to-br from-[#181920] via-black to-[#181920] text-white border-2 border-[#d4af37] space-y-5 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 px-3 py-1 bg-[#d4af37] text-black text-[10px] font-mono uppercase font-black tracking-widest rounded-bl-sm">
                    Advisory Intake Constraint: Only 2 Mandates / Quarter
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-mono text-[#d4af37] uppercase tracking-wider font-bold">
                      <Sparkles className="w-4 h-4 text-[#d4af37]" />
                      <span>Immediate Onboarding & Sovereign Intervention</span>
                    </div>

                    <h4 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                      Stop Paying The Daily Inaction Tax. <br />
                      <span className="text-[#d4af37]">Onboard With Suchita Sancheti Today.</span>
                    </h4>

                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-3xl">
                      Every week of delay drains an estimated <strong>${(estimatedAnnualEbitdaBleed / 52).toLocaleString(undefined, { maximumFractionDigits: 0 })} USD</strong> in operational latency. To guarantee senior-partner immersion, Suchita Sancheti personally leads every mandate, capping new client onboarding to two enterprises per quarter.
                    </p>
                  </div>

                  {/* High-Intent Conversion CTAs */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                    <button
                      onClick={handleSendResultsToBriefing}
                      className="px-8 py-4 bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#b8860b] hover:opacity-95 text-black font-extrabold text-xs uppercase tracking-wider rounded-sm transition-all shadow-xl flex items-center justify-center gap-2.5 cursor-pointer active:scale-98 font-mono"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Onboard Today · Lock Sovereign Mandate</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={onProceedToInDepth}
                      className="px-6 py-4 bg-[#1f2129] hover:bg-[#2c2f3a] text-white font-semibold text-xs uppercase tracking-wider rounded-sm border border-stone-600 transition-colors flex items-center justify-center gap-2 cursor-pointer font-mono"
                    >
                      <span>Launch In-Depth L.O.S. Diagnostic™</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#d4af37]" />
                    </button>
                  </div>

                  <div className="text-[11px] text-stone-400 flex items-center gap-2 pt-1 font-mono">
                    <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                    <span>Strict Boardroom Privilege · Direct 1-on-1 Advisory with Suchita Sancheti</span>
                  </div>
                </div>

              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
