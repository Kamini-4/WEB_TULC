import React, { useState } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  TrendingDown,
  Clock,
  Sparkles,
  CreditCard,
  Calendar,
  FileDown,
  CheckCircle2,
  Brain,
  Cpu,
  Zap,
  Shield,
  Layers,
  Activity,
} from 'lucide-react';
import { PaymentModal, PaymentItem } from './payment/PaymentModal';
import { CalendlyModal } from './CalendlyModal';
import {
  downloadAssessmentPdfReport,
  DomainResultEntry,
} from '../utils/generateAssessmentPdf';

interface DomainQuestion {
  id: string;
  domainNumber: string;
  domainName: string;
  prompt: string;
  options: {
    label: string;
    description: string;
    score: number;
    lostHours: number;
    delayCost: number;
  }[];
}

const FIVE_DOMAINS_QUESTIONS: DomainQuestion[] = [
  {
    id: 'cognitive_clarity',
    domainNumber: '01',
    domainName: 'Executive Focus',
    prompt: 'Where does most of your time and focus go on an average work week?',
    options: [
      {
        label: 'Firefighting & Daily Emergencies',
        description:
          'Trapped answering messages, putting out fires, and resolving operational questions my team should solve.',
        score: 4,
        lostHours: 15,
        delayCost: 45000,
      },
      {
        label: 'Constant Interruptions & Sign-Offs',
        description:
          'I try to focus on growth, but team members keep asking for approval before taking action.',
        score: 11,
        lostHours: 8,
        delayCost: 25000,
      },
      {
        label: 'Protected Strategic Growth',
        description:
          'Zero routine questions reach my desk. My leadership bench resolves operational friction autonomously.',
        score: 20,
        lostHours: 0,
        delayCost: 0,
      },
    ],
  },
  {
    id: 'systemic_integrity',
    domainNumber: '02',
    domainName: 'Delegation Fidelity',
    prompt: 'When you hand off a major initiative to your leadership team, what happens?',
    options: [
      {
        label: 'Incomplete Output & Personal Rework',
        description:
          'Deliverables fall below standard, forcing me to step in, rewrite, or finish execution myself.',
        score: 4,
        lostHours: 14,
        delayCost: 50000,
      },
      {
        label: 'Hesitant Delays on Tough Calls',
        description:
          'They manage routine work well, but freeze when tough trade-offs or spending decisions arise.',
        score: 12,
        lostHours: 6,
        delayCost: 20000,
      },
      {
        label: 'Flawless Autonomous Delivery',
        description:
          'Projects finish on schedule to exact standards with zero need for executive intervention.',
        score: 20,
        lostHours: 0,
        delayCost: 0,
      },
    ],
  },
  {
    id: 'strategic_velocity',
    domainNumber: '03',
    domainName: 'Decision Speed',
    prompt: 'How fast does your company make critical business decisions?',
    options: [
      {
        label: 'Stuck in Endless Review Meetings',
        description:
          'Decisions bounce across multiple committees. Weeks pass before anything gets signed off.',
        score: 4,
        lostHours: 12,
        delayCost: 40000,
      },
      {
        label: 'Second-Guessing After Sign-Off',
        description:
          'We agree on plans in meetings, but execution slows down due to doubts and backchannel debates.',
        score: 11,
        lostHours: 6,
        delayCost: 20000,
      },
      {
        label: 'Decisive 72-Hour Execution Loops',
        description:
          'Designated leaders make decisions in days and execute with full authority and speed.',
        score: 20,
        lostHours: 0,
        delayCost: 0,
      },
    ],
  },
  {
    id: 'moral_gravity',
    domainNumber: '04',
    domainName: 'Founder Absence',
    prompt: 'What happens to your business if you take an unexpected 30-day absence?',
    options: [
      {
        label: 'Operations Freeze & Revenue Stalls',
        description:
          'Client deals, key hires, and major initiatives grind to a complete halt until I return.',
        score: 4,
        lostHours: 16,
        delayCost: 60000,
      },
      {
        label: 'Day-to-Day Survives, Strategy Stops',
        description:
          'Routine work gets done, but tough problems pile up and strategic expansion pauses.',
        score: 12,
        lostHours: 8,
        delayCost: 25000,
      },
      {
        label: 'Company Runs & Expands Smoothly',
        description:
          'The executive bench hits quarterly targets without disruption or constant guidance.',
        score: 20,
        lostHours: 0,
        delayCost: 0,
      },
    ],
  },
  {
    id: 'cultural_fidelity',
    domainNumber: '05',
    domainName: 'Team Alignment',
    prompt: 'How aligned is your senior leadership team on company priorities?',
    options: [
      {
        label: 'Departmental Silos & Disagreements',
        description:
          'Leads pull in conflicting directions, protect turf, and escalate disputes to me.',
        score: 4,
        lostHours: 10,
        delayCost: 35000,
      },
      {
        label: 'Polite Agreement, Sluggish Action',
        description:
          'Everyone nods in executive reviews, but follow-through stalls once the meeting ends.',
        score: 12,
        lostHours: 5,
        delayCost: 15000,
      },
      {
        label: 'Total Alignment & Mutual Accountability',
        description:
          'Senior leaders challenge each other openly, own outcomes completely, and execute as one.',
        score: 20,
        lostHours: 0,
        delayCost: 0,
      },
    ],
  },
];

const OPERATIONAL_MODEL_CIRCUITS = [
  {
    num: '01',
    name: 'Executive Focus',
    icon: Brain,
    breaksToday: 'Routine tactical questions hit your desk all day, wiping out deep strategic work.',
    whatWeInstall: 'Asynchronous escalation filters and protected focus blocks so managers solve frontline issues.',
    outcome: '15+ hrs/wk reclaimed',
  },
  {
    num: '02',
    name: 'Delegation Fidelity',
    icon: Cpu,
    breaksToday: 'Teams hesitate or deliver half-baked work because your decision criteria live only in your head.',
    whatWeInstall: 'Written authority thresholds ($5k–$50k+) and clear quality charters teams follow without guessing.',
    outcome: 'Zero founder rework',
  },
  {
    num: '03',
    name: 'Decision Speed',
    icon: Zap,
    breaksToday: 'Initiatives stall in consensus meetings for 4–6 weeks while competitors move.',
    whatWeInstall: 'Single-owner 14-day execution sprints with clear 72-hour decision SLAs.',
    outcome: '3x faster execution',
  },
  {
    num: '04',
    name: 'Peer Accountability',
    icon: Shield,
    breaksToday: 'Substandard work slips through unless you personally catch and fix it.',
    whatWeInstall: 'Peer review standards and department scorecards caught before reaching the executive desk.',
    outcome: 'Self-correcting standards',
  },
  {
    num: '05',
    name: 'Business Independence',
    icon: Layers,
    breaksToday: 'Taking 2–4 weeks unplugged stalls revenue, client deals, and key hires.',
    whatWeInstall: 'Decoupled leadership bench tested under a live 30-day absence protocol.',
    outcome: 'Higher exit valuation',
  },
];

const METHODOLOGY_STEPS = [
  {
    step: '01',
    title: 'Forensic Operating Audit (Weeks 1–2)',
    detail:
      'We inspect real calendar load, approval queues, and leadership handoffs to pinpoint where decisions stall—no generic surveys.',
  },
  {
    step: '02',
    title: 'Written Decision Architecture (Weeks 3–5)',
    detail:
      'We codify your unspoken judgment into clear spending thresholds, authority matrices, and single-owner rules.',
  },
  {
    step: '03',
    title: 'Embedded Cadence Install (Weeks 6–10)',
    detail:
      'Working directly with you and your leadership team (zero junior staff), we run live 14-day sprints until autonomous execution sticks.',
  },
  {
    step: '04',
    title: 'Validated Handoff & Exit (Weeks 11–12)',
    detail:
      'We pressure-test operations with a real step-away sprint, leave 100% of the operating playbooks with your team, and exit cleanly on Day 90.',
  },
];

interface SimpleNeedsTestProps {
  onConsultationRequest: (summary: Record<string, unknown>) => void;
  onExplorePartnerships?: () => void;
  onProceedToInDepth?: () => void;
  initialViewTab?: 'assessment' | 'model';
}

export const SimpleNeedsTest: React.FC<SimpleNeedsTestProps> = ({
  onConsultationRequest,
  onExplorePartnerships,
  initialViewTab = 'assessment',
}) => {
  const [activeWorkspace, setActiveWorkspace] = useState<'assessment' | 'model'>(initialViewTab);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [activeDomainIdx, setActiveDomainIdx] = useState<number>(0);
  const [activePaymentItem, setActivePaymentItem] = useState<PaymentItem | null>(null);
  const [showCalendlyModal, setShowCalendlyModal] = useState(false);
  const [pdfDownloaded, setPdfDownloaded] = useState(false);

  const handleSelectOption = (optionIndex: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentStep] = optionIndex;
    setAnswers(updatedAnswers);

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
    setPdfDownloaded(false);
  };

  // Computations per domain
  const domainResults: DomainResultEntry[] = FIVE_DOMAINS_QUESTIONS.map((q, qIdx) => {
    const optIdx = answers[qIdx] ?? 0;
    const chosen = q.options[optIdx] ?? q.options[0];
    return {
      domainNumber: q.domainNumber,
      domainName: q.domainName,
      selectedLabel: chosen.label,
      score: chosen.score,
      maxScore: 20,
      lostHours: chosen.lostHours,
      delayCost: chosen.delayCost,
    };
  });

  const totalScore = answers.reduce((acc, optIdx, qIdx) => {
    const q = FIVE_DOMAINS_QUESTIONS[qIdx];
    return acc + (q?.options[optIdx]?.score ?? 0);
  }, 0);

  const totalLostHours = answers.reduce((acc, optIdx, qIdx) => {
    const q = FIVE_DOMAINS_QUESTIONS[qIdx];
    return acc + (q?.options[optIdx]?.lostHours ?? 0);
  }, 0);

  const totalDelayCost = answers.reduce((acc, optIdx, qIdx) => {
    const q = FIVE_DOMAINS_QUESTIONS[qIdx];
    return acc + (q?.options[optIdx]?.delayCost ?? 0);
  }, 0);

  const weakestDomains = domainResults
    .filter((d) => d.score <= 12)
    .sort((a, b) => a.score - b.score)
    .slice(0, 3)
    .map((d) => d.domainName);

  const isSevereBottleneck = totalScore < 50;
  const isModerateFriction = totalScore >= 50 && totalScore < 80;

  const statusLabel = isSevereBottleneck
    ? 'Critical Founder Bottleneck'
    : isModerateFriction
    ? 'Moderate Approval & Alignment Drag'
    : 'High Operational Autonomy';

  const verdictHeadline = isSevereBottleneck
    ? `You are the single point of failure across ${weakestDomains.length > 0 ? weakestDomains.join(' & ') : 'core operations'}.`
    : isModerateFriction
    ? `Your team delivers daily work, but ${weakestDomains.length > 0 ? weakestDomains.join(' and ') : 'decision loops'} are throttling scale.`
    : 'Your leadership team runs smoothly—now lock in institutional permanence.';

  const verdictSummary = isSevereBottleneck
    ? `At a ${totalScore}/100 autonomy score, roughly ${totalLostHours}+ hours of your week and $${totalDelayCost.toLocaleString()}/yr in delayed execution are trapped waiting on your personal sign-off. Without explicit decision rights and 14-day execution loops, hiring more senior managers will only increase your review load.`
    : isModerateFriction
    ? `At ${totalScore}/100, routine work moves, yet leadership hesitates on tough trade-offs and re-opens settled calls—costing ${totalLostHours}+ executive hours weekly and $${totalDelayCost.toLocaleString()}/yr in stalled momentum. Codifying spending thresholds and peer accountability eliminates this drag within 90 days.`
    : `At ${totalScore}/100, your organization already operates with strong autonomy. The priority over the next 90 days is formalizing written succession protocols and governance cadences so enterprise valuation commands a top-quartile multiple without founder reliance.`;

  const recommendedTrackName = isSevereBottleneck
    ? 'Operating Architecture Embedding (90-Day Overhaul)'
    : isModerateFriction
    ? 'Mandate Forensic Diagnostic (14-Day Rapid Audit)'
    : 'Fractional COO & Sovereign Counsel Retainer';

  const recommendedTrackSummary = isSevereBottleneck
    ? 'Directly embed for 90 days to install $5k+ delegation rules, kill status meetings, and run the 30-day absence test.'
    : isModerateFriction
    ? 'Isolate your exact decision bottlenecks in 14 days and deploy targeted execution cadences with senior leaders.'
    : 'Preserve high velocity through quarterly governance sparring and boardroom succession architecture.';

  const handleScheduleCall = () => {
    onConsultationRequest({
      score: totalScore,
      lostHours: totalLostHours,
      delayCost: totalDelayCost,
      priorityDomain: weakestDomains[0] || 'Strategic Velocity',
      status: statusLabel,
    });
  };

  const handleDownloadPdf = () => {
    downloadAssessmentPdfReport({
      totalScore,
      totalLostHours,
      totalDelayCost,
      statusLabel,
      verdictHeadline,
      verdictSummary,
      domainResults,
      weakestDomains,
      recommendedTrackName,
      recommendedTrackSummary,
    });
    setPdfDownloaded(true);
    setTimeout(() => setPdfDownloaded(false), 3000);
  };

  const currentQ = FIVE_DOMAINS_QUESTIONS[currentStep];
  const selectedCircuit = OPERATIONAL_MODEL_CIRCUITS[activeDomainIdx];

  return (
    <section
      id="assessment-hub"
      className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 bg-[#f8f6f0] text-[#17181c] border-b border-[#dfd7c8]"
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Unified Section Header & Mode Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#dfd7c8] pb-4">
          <div className="space-y-1">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#9d7b38] font-bold block">
              Diagnostic & Operational Model · One Unified View
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#17181c] leading-tight">
              Pinpoint the Bottleneck. See the 90-Day Fix.
            </h2>
          </div>

          {/* Interactive Workspace Toggle */}
          <div className="inline-flex p-1 bg-[#ede5d6] border border-[#d8cebe] rounded-sm shrink-0 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActiveWorkspace('assessment')}
              className={`px-3.5 py-2 text-xs font-mono font-bold uppercase rounded-xs transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeWorkspace === 'assessment'
                  ? 'bg-[#17181c] text-[#f8f6f0]'
                  : 'text-[#4e5159] hover:text-[#17181c]'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>60-Sec Assessment</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveWorkspace('model')}
              className={`px-3.5 py-2 text-xs font-mono font-bold uppercase rounded-xs transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                activeWorkspace === 'model'
                  ? 'bg-[#17181c] text-[#f8f6f0]'
                  : 'text-[#4e5159] hover:text-[#17181c]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Operational Model (5 Domains)</span>
            </button>
          </div>
        </div>

        {/* ===================================================================== */}
        {/* TAB 1: 60-SECOND ASSESSMENT + PERSUASIVE 90-DAY RESULT & PDF REPORT   */}
        {/* ===================================================================== */}
        {activeWorkspace === 'assessment' ? (
          !isCompleted ? (
            <div className="bg-white rounded-md border border-[#d8cebe] p-5 sm:p-7 shadow-xs space-y-5">
              {/* Top Progress Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#ebdcc0]">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 bg-[#17181c] text-[#d4af37] text-[11px] font-mono uppercase font-bold rounded-xs">
                    60-Sec Audit
                  </span>
                  <span className="text-xs font-mono font-bold text-[#17181c] uppercase">
                    Domain {currentStep + 1} of 5 ·{' '}
                    <span className="text-[#9d7b38]">{currentQ.domainName}</span>
                  </span>
                </div>
                <span className="text-xs font-mono font-bold text-[#17181c] tabular-nums">
                  {Math.round(((currentStep + 1) / FIVE_DOMAINS_QUESTIONS.length) * 100)}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#ede5d6] h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#17181c] h-full transition-all duration-300"
                  style={{
                    width: `${((currentStep + 1) / FIVE_DOMAINS_QUESTIONS.length) * 100}%`,
                  }}
                />
              </div>

              {/* Question */}
              <h3 className="text-lg sm:text-2xl font-bold font-serif text-[#17181c] leading-snug">
                {currentQ.prompt}
              </h3>

              {/* Choices */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectOption(idx)}
                    className="w-full text-left p-4 rounded-sm bg-[#faf8f4] hover:bg-[#17181c] text-[#17181c] hover:text-white border border-[#dfd7c8] hover:border-[#17181c] transition-all cursor-pointer group flex items-start justify-between gap-3"
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-[#ebdcc0] text-[#17181c] group-hover:bg-[#d4af37] text-[11px] font-mono font-black flex items-center justify-center shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-sm sm:text-base font-bold">{opt.label}</span>
                      </div>
                      <p className="text-xs sm:text-[13px] text-[#4e5159] group-hover:text-zinc-200 pl-7 leading-relaxed">
                        {opt.description}
                      </p>
                    </div>

                    <ArrowRight className="w-4 h-4 text-[#9d7b38] group-hover:text-[#d4af37] group-hover:translate-x-0.5 transition-transform shrink-0 mt-1" />
                  </button>
                ))}
              </div>

              {/* Back Button & Quick Model Switch */}
              <div className="pt-1 flex items-center justify-between text-xs font-mono">
                {currentStep > 0 ? (
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentStep(currentStep - 1);
                      setAnswers(answers.slice(0, -1));
                    }}
                    className="inline-flex items-center gap-1 font-bold text-[#17181c] hover:text-[#9d7b38] cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous Question</span>
                  </button>
                ) : (
                  <span className="text-[#6b6e76]">5 questions · Immediate score + 90-day PDF roadmap</span>
                )}

                <button
                  type="button"
                  onClick={() => setActiveWorkspace('model')}
                  className="text-[#9d7b38] hover:text-[#7d5f24] font-bold underline underline-offset-4 cursor-pointer"
                >
                  Inspect 5-Domain Model First
                </button>
              </div>
            </div>
          ) : (
            /* =============================================================== */
            /* PERSUASIVE RESULT + 90-DAY ROADMAP + HOW WE DO IT + PDF EXPORT  */
            /* =============================================================== */
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Top Result Control Bar with Download PDF */}
              <div className="bg-white rounded-md border border-[#d8cebe] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-1 bg-[#0c1322] border border-[#d4af37] rounded-sm w-11 h-11 shrink-0 flex items-center justify-center">
                    <img
                      src="/assets/tulc-gold-navy-crest.jpg"
                      alt="The Unbounded Leadership Co."
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#9d7b38] font-bold tracking-wider block">
                      60-Second Executive Audit Complete
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-[#17181c]">
                      Operating Autonomy Score: <span className="text-[#9d7b38] tabular-nums">{totalScore} / 100</span>
                    </h3>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleDownloadPdf}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-mono font-bold uppercase text-[#f8f6f0] bg-[#17181c] hover:bg-[#282a30] border border-[#d4af37]/60 rounded-xs cursor-pointer shadow-xs transition-colors whitespace-nowrap"
                  >
                    <FileDown className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>{pdfDownloaded ? 'PDF Report Downloaded' : 'Download PDF Report'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1 px-3 py-2 text-xs font-mono font-bold text-[#17181c] bg-[#faf8f4] hover:bg-[#ede5d6] border border-[#d8cebe] rounded-xs cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3 text-[#9d7b38]" />
                    <span>Retake</span>
                  </button>
                </div>
              </div>

              {/* Executive Diagnosis & Quantified Cost */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <div className="lg:col-span-7 p-5 sm:p-6 rounded-md bg-[#141416] text-white border border-[#d4af37] space-y-3">
                  <span className="text-[11px] font-mono uppercase font-bold tracking-wider text-[#d4af37] block">
                    {statusLabel}
                  </span>
                  <h4 className="text-xl sm:text-2xl font-bold font-serif text-[#f4ecd8] leading-snug">
                    {verdictHeadline}
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {verdictSummary}
                  </p>
                  {weakestDomains.length > 0 && (
                    <div className="pt-2 border-t border-[#2b2d33] text-xs text-[#f4ecd8]">
                      <span className="font-mono uppercase text-[10px] text-[#d4af37] font-bold block mb-1">
                        Urgent Bottleneck Vectors Flagged
                      </span>
                      <span>
                        Your responses show acute drag in{' '}
                        <strong className="text-white">{weakestDomains.join(', ')}</strong>. Fixing these first yields the fastest recovery in leadership capacity.
                      </span>
                    </div>
                  )}
                </div>

                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                  <div className="p-4 rounded-md bg-white border border-[#d8cebe] space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-rose-700">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Executive Time Trapped</span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-[#17181c] tabular-nums">
                      {totalLostHours}+ Hours / Wk
                    </div>
                    <p className="text-xs text-[#4e5159]">
                      Spent in escalations, sign-offs, and rework your leadership bench should own.
                    </p>
                  </div>

                  <div className="p-4 rounded-md bg-white border border-[#d8cebe] space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-[#9d7b38]">
                      <TrendingDown className="w-3.5 h-3.5" />
                      <span>Estimated Annual Execution Cost</span>
                    </div>
                    <div className="text-2xl sm:text-3xl font-black text-[#17181c] tabular-nums">
                      ${totalDelayCost.toLocaleString()} / Yr
                    </div>
                    <p className="text-xs text-[#4e5159]">
                      Compound margin and speed lost while initiatives wait for founder approval.
                    </p>
                  </div>
                </div>
              </div>

              {/* 5-Domain Scorecard Breakdown */}
              <div className="bg-white rounded-md border border-[#d8cebe] p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase text-[#9d7b38] font-bold tracking-wider">
                    5-Domain Scorecard Breakdown
                  </span>
                  <span className="text-[11px] font-mono text-[#6b6e76]">20 pts per domain</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
                  {domainResults.map((d) => {
                    const pct = Math.round((d.score / d.maxScore) * 100);
                    const isCritical = d.score <= 8;
                    const isMid = d.score > 8 && d.score <= 14;
                    return (
                      <div
                        key={d.domainNumber}
                        className="p-3 rounded-xs bg-[#faf8f4] border border-[#e2d8c9] space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono font-bold">
                          <span className="text-[#9d7b38]">{d.domainNumber}</span>
                          <span
                            className={`tabular-nums ${
                              isCritical
                                ? 'text-rose-700'
                                : isMid
                                ? 'text-amber-700'
                                : 'text-emerald-700'
                            }`}
                          >
                            {d.score}/20
                          </span>
                        </div>
                        <div className="text-xs font-bold text-[#17181c]">{d.domainName}</div>
                        <div className="w-full h-1.5 bg-[#e8dfd0] rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              isCritical
                                ? 'bg-rose-600'
                                : isMid
                                ? 'bg-amber-600'
                                : 'bg-emerald-600'
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <div className="text-[11px] text-[#555861] leading-snug">
                          {d.selectedLabel}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Next 90-Day Roadmap */}
              <div className="bg-white rounded-md border border-[#d8cebe] p-5 sm:p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#ebdcc0] pb-3">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-[#9d7b38] font-bold tracking-wider block">
                      Your Action Plan
                    </span>
                    <h4 className="text-lg sm:text-xl font-bold font-serif text-[#17181c]">
                      Next 90-Day Roadmap to Eliminate Founder Dependency
                    </h4>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#17181c] bg-[#faf8f4] border border-[#d8cebe] px-2.5 py-1 rounded-xs self-start sm:self-auto">
                    Definitive 90-Day Runway
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-sm bg-[#faf8f4] border border-[#d8cebe] space-y-2">
                    <div className="text-xs font-mono font-black uppercase text-[#9d7b38]">
                      Days 1–30 · Stabilize & Reclaim Time
                    </div>
                    <h5 className="text-sm font-bold text-[#17181c]">
                      Stop Routine Escalations & Reclaim 10+ Hrs/Wk
                    </h5>
                    <ul className="space-y-1.5 text-xs text-[#3f424a]">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#9d7b38] shrink-0 mt-0.5" />
                        <span>Audit every approval hitting your desk and eliminate non-essential sign-offs.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#9d7b38] shrink-0 mt-0.5" />
                        <span>Grant managers clear $5,000+ decision and spend limits immediately.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#9d7b38] shrink-0 mt-0.5" />
                        <span>Assign single-threaded owners to resolve {weakestDomains[0] || 'priority drag'}.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-sm bg-[#faf8f4] border border-[#d8cebe] space-y-2">
                    <div className="text-xs font-mono font-black uppercase text-[#9d7b38]">
                      Days 31–60 · Install Decision Architecture
                    </div>
                    <h5 className="text-sm font-bold text-[#17181c]">
                      Kill Status Meetings & Lock 14-Day Sprints
                    </h5>
                    <ul className="space-y-1.5 text-xs text-[#3f424a]">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#9d7b38] shrink-0 mt-0.5" />
                        <span>Codify your operating standards into written rules so work ships without rework.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#9d7b38] shrink-0 mt-0.5" />
                        <span>Replace circular weekly meetings with 14-day delivery commitments.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#9d7b38] shrink-0 mt-0.5" />
                        <span>Enforce 72-hour decision SLAs across leadership.</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-sm bg-[#faf8f4] border border-[#d8cebe] space-y-2">
                    <div className="text-xs font-mono font-black uppercase text-[#9d7b38]">
                      Days 61–90 · Independent Execution
                    </div>
                    <h5 className="text-sm font-bold text-[#17181c]">
                      Run the 30-Day Absence Test & Exit
                    </h5>
                    <ul className="space-y-1.5 text-xs text-[#3f424a]">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#9d7b38] shrink-0 mt-0.5" />
                        <span>Activate peer accountability reviews so low-grade work never reaches you.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#9d7b38] shrink-0 mt-0.5" />
                        <span>Stress-test pipeline, hiring, and client delivery without founder intervention.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#9d7b38] shrink-0 mt-0.5" />
                        <span>Transfer 100% ownership of playbooks and complete our Day-90 exit.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* How We Do It */}
              <div className="bg-white rounded-md border border-[#d8cebe] p-5 sm:p-6 space-y-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-mono uppercase text-[#9d7b38] font-bold tracking-wider block">
                    Execution Methodology
                  </span>
                  <h4 className="text-lg sm:text-xl font-bold font-serif text-[#17181c]">
                    How We Do It — Without Slide Decks or Endless Retainers
                  </h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {METHODOLOGY_STEPS.map((item) => (
                    <div
                      key={item.step}
                      className="p-4 rounded-sm bg-[#faf8f4] border border-[#e2d8c9] space-y-1.5"
                    >
                      <span className="text-xs font-mono font-black text-[#9d7b38]">
                        STEP {item.step}
                      </span>
                      <div className="text-sm font-bold text-[#17181c] leading-snug">
                        {item.title}
                      </div>
                      <p className="text-xs text-[#4e5159] leading-relaxed">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Persuasive Conversion Footer Card */}
              <div className="p-5 sm:p-6 rounded-md bg-[#141416] text-white border border-[#d4af37] space-y-4">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-1 max-w-2xl">
                    <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase text-[#d4af37] font-bold">
                      <Sparkles className="w-3 h-3 text-[#d4af37]" />
                      <span>Recommended Next Step · {recommendedTrackName}</span>
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold font-serif text-[#f4ecd8]">
                      Stop Losing {totalLostHours}+ Hours Every Week. Let’s Walk Through Your Roadmap.
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      {recommendedTrackSummary} Download your full PDF report now, or book a confidential 20-minute debrief with Suchita Sancheti to review your exact numbers.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => setShowCalendlyModal(true)}
                      className="px-5 py-3 bg-[#d4af37] hover:bg-[#e3c04f] text-[#141416] font-black text-xs uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer font-mono whitespace-nowrap"
                    >
                      <Calendar className="w-3.5 h-3.5" />
                      <span>Book 20-Min Debrief</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleDownloadPdf}
                      className="px-4 py-3 bg-zinc-900 hover:bg-zinc-800 text-[#f4ecd8] border border-[#d4af37]/60 font-mono font-bold text-xs uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                    >
                      <FileDown className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Download PDF Report</span>
                    </button>
                  </div>
                </div>

                {/* Secondary Quick Paths */}
                <div className="pt-3 border-t border-[#2b2d33] grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() =>
                      setActivePaymentItem({
                        id: 'delegation-matrix',
                        title: 'The $5,000 Delegation Matrix',
                        subtitle:
                          'Immediate rulebook to recover 15 hours/week by delegating decisions under $5,000.',
                        priceUSD: 95,
                        category: 'toolkit',
                        deliverables: [
                          '1-Page Delegation Rulebook',
                          'Reversible Decision Matrix',
                          'Emergency Escalation Protocol',
                        ],
                      })
                    }
                    className="w-full py-2.5 px-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white rounded-xs text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <CreditCard className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Start Immediately: Delegation Matrix · $95</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleScheduleCall}
                    className="w-full py-2.5 px-3 bg-white hover:bg-stone-100 text-[#141416] rounded-xs text-xs font-mono font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5 text-[#9d7b38]" />
                    <span>Send Results to Advisory Desk</span>
                  </button>
                </div>
              </div>
            </div>
          )
        ) : (
          /* =================================================================== */
          /* TAB 2: THE 5-DOMAIN OPERATIONAL MODEL (INTEGRATED, NO SEPARATE PAGE)*/
          /* =================================================================== */
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="bg-white rounded-md border border-[#d8cebe] p-5 sm:p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#ebdcc0] pb-4">
                <div>
                  <span className="text-[11px] font-mono uppercase text-[#9d7b38] font-bold tracking-wider block">
                    The Operating Model
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold font-serif text-[#17181c]">
                    Five Core Operating Circuits That Remove Founder Dependency
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveWorkspace('assessment')}
                  className="px-4 py-2 bg-[#17181c] hover:bg-[#282a30] text-[#f8f6f0] text-xs font-mono font-bold uppercase rounded-xs flex items-center gap-1.5 cursor-pointer self-start sm:self-auto whitespace-nowrap"
                >
                  <span>Run 60-Sec Audit</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#d4af37]" />
                </button>
              </div>

              {/* 5 Domain Selector Pills */}
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                {OPERATIONAL_MODEL_CIRCUITS.map((c, idx) => {
                  const Icon = c.icon;
                  const active = idx === activeDomainIdx;
                  return (
                    <button
                      key={c.num}
                      type="button"
                      onClick={() => setActiveDomainIdx(idx)}
                      className={`p-3 rounded-sm text-left border transition-all cursor-pointer ${
                        active
                          ? 'bg-[#17181c] text-white border-[#17181c]'
                          : 'bg-[#faf8f4] text-[#17181c] border-[#dfd7c8] hover:border-[#9d7b38]'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono font-bold mb-1">
                        <span className={active ? 'text-[#d4af37]' : 'text-[#9d7b38]'}>
                          DOMAIN {c.num}
                        </span>
                        <Icon className={`w-3.5 h-3.5 ${active ? 'text-[#d4af37]' : 'text-[#9d7b38]'}`} />
                      </div>
                      <div className="text-xs font-bold leading-snug">{c.name}</div>
                    </button>
                  );
                })}
              </div>

              {/* Active Domain Comparison Detail */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                <div className="p-4 rounded-sm bg-[#faf6f6] border border-rose-200 space-y-1.5">
                  <div className="text-[11px] font-mono font-bold uppercase text-rose-800">
                    What Breaks Today
                  </div>
                  <p className="text-xs sm:text-sm text-[#3f424a] leading-relaxed">
                    {selectedCircuit.breaksToday}
                  </p>
                </div>

                <div className="p-4 rounded-sm bg-[#f4f9f5] border border-emerald-200 space-y-1.5">
                  <div className="text-[11px] font-mono font-bold uppercase text-emerald-800">
                    What We Install in 90 Days
                  </div>
                  <p className="text-xs sm:text-sm text-[#2f4537] leading-relaxed">
                    {selectedCircuit.whatWeInstall}
                  </p>
                </div>

                <div className="p-4 rounded-sm bg-[#141416] text-white border border-[#d4af37]/60 flex flex-col justify-between space-y-2">
                  <div>
                    <div className="text-[10px] font-mono font-bold uppercase text-[#d4af37]">
                      Verified Target Outcome
                    </div>
                    <div className="text-lg font-black text-[#f4ecd8] mt-1">
                      {selectedCircuit.outcome}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveWorkspace('assessment')}
                    className="w-full py-2 px-3 bg-[#d4af37] hover:bg-[#e3c04f] text-[#141416] text-xs font-mono font-black uppercase rounded-xs cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Score Your Business Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Integrated 90-Day How We Do It Strip */}
              <div className="pt-4 border-t border-[#ebdcc0] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {METHODOLOGY_STEPS.map((item) => (
                  <div
                    key={item.step}
                    className="p-3.5 rounded-sm bg-[#faf8f4] border border-[#e2d8c9] space-y-1"
                  >
                    <span className="text-[10px] font-mono font-black text-[#9d7b38]">
                      HOW WE DO IT · {item.step}
                    </span>
                    <div className="text-xs font-bold text-[#17181c]">{item.title}</div>
                    <p className="text-[11px] text-[#4e5159] leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {onExplorePartnerships && (
              <div className="flex items-center justify-end">
                <button
                  type="button"
                  onClick={onExplorePartnerships}
                  className="text-xs font-mono font-bold text-[#9d7b38] hover:text-[#7d5f24] flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Explore Service Tracks & Fractional COO Retainers</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <PaymentModal
        isOpen={!!activePaymentItem}
        onClose={() => setActivePaymentItem(null)}
        item={activePaymentItem}
      />

      <CalendlyModal
        isOpen={showCalendlyModal}
        onClose={() => setShowCalendlyModal(false)}
        customTitle="Book 20-Min Operating Audit Debrief via Calendly"
        contextNote={`Audit Score: ${totalScore}/100 · Time Reclaimable: ${totalLostHours} hrs/wk · Estimated Delay Cost: $${totalDelayCost.toLocaleString()}/yr.`}
      />
    </section>
  );
};
