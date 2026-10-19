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
    domainName: 'Clear Thinking & Focus',
    domainSubtitle: 'Protecting your calendar from daily firefighting',
    oneSentenceMission: 'Frees your mind from daily emergencies so you can focus on major growth moves and get back 15+ hours every single week.',
    icon: Brain,
    prompt: 'How do you spend your working hours each day as the leader?',
    options: [
      {
        label: 'Constant Firefighting (Most Friction)',
        description: 'My days are eaten alive by Slack pings, endless emails, and answering small questions for my team.',
        penaltyDays: 14,
        score: 4,
        ebitdaImpactPercent: 4.5,
        painPointDiagnostic: 'You are stuck in reaction mode. Your best strategic thinking is held hostage by daily interruptions.',
        desiredOutcome: 'Protect your calendar so you get back 15+ hours weekly to work on real growth.'
      },
      {
        label: 'Divided Attention (Frequent Interruptions)',
        description: 'I try to block out time for big-picture strategy, but daily team emergencies keep dragging me back in.',
        penaltyDays: 7,
        score: 11,
        ebitdaImpactPercent: 2.5,
        painPointDiagnostic: 'Your time is unprotected. Because there are no clear escalation rules, every problem flows up to you.',
        desiredOutcome: 'Set clear rules so managers resolve everyday issues on their own without asking you.'
      },
      {
        label: 'Protected Focus (Zero Friction)',
        description: 'Clear communication rules protect my time. Zero routine interruptions reach my desk during deep work.',
        penaltyDays: 0,
        score: 20,
        ebitdaImpactPercent: 0,
        painPointDiagnostic: 'Your calendar is well protected. You have total freedom to focus on high-impact strategy.',
        desiredOutcome: 'Maintain clear boundaries and lead the business with calm, decisive clarity.'
      }
    ]
  },
  {
    id: 'systemic_integrity',
    domainNumber: '02',
    domainName: 'Execution & Delegation',
    domainSubtitle: 'Giving teams clear authority so they execute without asking permission',
    oneSentenceMission: 'Puts your decision rules in writing so your team executes projects correctly without asking your permission for every small step.',
    icon: Cpu,
    prompt: 'When you hand off an important project to your leaders, what actually happens without your direct supervision?',
    options: [
      {
        label: 'Mistakes & Founder Rework (Critical Bottleneck)',
        description: 'Things drift off course, and I frequently have to step in, rewrite the work, or fix it myself.',
        penaltyDays: 16,
        score: 4,
        ebitdaImpactPercent: 5.5,
        painPointDiagnostic: 'Your team knows you will catch their mistakes, so they never take true personal ownership.',
        desiredOutcome: 'Write down your unwritten standards so your team executes with 100% of your quality.'
      },
      {
        label: 'Hesitant Check-ins (Slow Approvals)',
        description: 'My team works hard, but they constantly pause to ask for my confirmation before making the final call.',
        penaltyDays: 9,
        score: 12,
        ebitdaImpactPercent: 3.0,
        painPointDiagnostic: 'Fear of making the wrong move slows down execution and drains your energy with constant check-ins.',
        desiredOutcome: 'Give managers pre-approved spending limits and authority to make $50,000+ decisions without asking you.'
      },
      {
        label: 'Independent High-Quality Delivery (Autonomous)',
        description: 'Projects finish on time to our exact standards with zero rework needed from me.',
        penaltyDays: 0,
        score: 20,
        ebitdaImpactPercent: 0,
        painPointDiagnostic: 'Your team executes with complete reliability and strong individual accountability.',
        desiredOutcome: 'Scale teams and enter new markets without needing more founder supervision.'
      }
    ]
  },
  {
    id: 'strategic_velocity',
    domainNumber: '03',
    domainName: 'Speed to Market',
    domainSubtitle: 'Cutting out meetings so ideas turn into results in days, not weeks',
    oneSentenceMission: 'Cuts out endless consensus meetings so your team turns ideas into market action in 72 hours instead of 6 weeks.',
    icon: Zap,
    prompt: 'How long does it typically take from agreeing on a new business idea to actually launching it in the market?',
    options: [
      {
        label: 'Stuck in Meetings (6 to 12+ Weeks)',
        description: 'Proposals bounce between endless committee presentations, risk reviews, and approval rounds.',
        penaltyDays: 24,
        score: 4,
        ebitdaImpactPercent: 6.0,
        painPointDiagnostic: 'Nobody wants to be blamed for a mistake, so decisions get delayed by endless group discussions.',
        desiredOutcome: 'Cut decision time from 60+ days down to 72 hours with clear single-person decision rights.'
      },
      {
        label: 'Slow Step-by-Step Approvals (3 to 5 Weeks)',
        description: 'Work follows standard multi-step processes with weekly update meetings and slow hand-offs.',
        penaltyDays: 10,
        score: 12,
        ebitdaImpactPercent: 3.0,
        painPointDiagnostic: 'Slow internal bureaucracy allows faster, more agile competitors to win deals before you move.',
        desiredOutcome: 'Replace bi-weekly status meetings with fast, 14-day action cycles.'
      },
      {
        label: 'Fast Execution (Under 7 Days)',
        description: 'Leaders have clear authority to deploy budget and talent immediately without waiting for committee approval.',
        penaltyDays: 1,
        score: 20,
        ebitdaImpactPercent: 0,
        painPointDiagnostic: 'Your organization acts with elite speed and turns strategic ideas into revenue rapidly.',
        desiredOutcome: 'Win more market share through continuous execution speed.'
      }
    ]
  },
  {
    id: 'moral_gravity',
    domainNumber: '04',
    domainName: 'Team Standards & Accountability',
    domainSubtitle: 'Holding leaders accountable so low-quality work never reaches your desk',
    oneSentenceMission: 'Creates a team culture where leaders hold each other accountable and catch poor work before it ever reaches your desk.',
    icon: Shield,
    prompt: 'What happens when a team deliverable falls below your standards?',
    options: [
      {
        label: 'I Have to Catch Everything (Heavy Founder Load)',
        description: 'If I do not personally review and demand fixes, substandard work goes straight out to clients.',
        penaltyDays: 12,
        score: 4,
        ebitdaImpactPercent: 4.5,
        painPointDiagnostic: 'You are acting as the company’s chief proofreader instead of focusing on growing the business.',
        desiredOutcome: 'Set shared quality standards so your leadership team reviews and filters work on their own.'
      },
      {
        label: 'Polite Silence in Public (Uncomfortable Feedback)',
        description: 'Issues are only discussed quietly in private 1-on-1s because nobody wants awkward confrontations in meetings.',
        penaltyDays: 8,
        score: 11,
        ebitdaImpactPercent: 2.5,
        painPointDiagnostic: 'People are choosing polite comfort over high performance, causing quiet quality decline over time.',
        desiredOutcome: 'Build a culture of open, honest feedback where leaders directly help each other improve.'
      },
      {
        label: 'Direct Peer Accountability (Self-Correcting)',
        description: 'The leadership team self-regulates immediately; peers challenge and refine work before it ever reaches me.',
        penaltyDays: 0,
        score: 20,
        ebitdaImpactPercent: 0,
        painPointDiagnostic: 'Your leaders take full pride in collective excellence and protect your company’s reputation.',
        desiredOutcome: 'Maintain uncompromising standards even as your headcount doubles.'
      }
    ]
  },
  {
    id: 'cultural_fidelity',
    domainNumber: '05',
    domainName: 'Business Independence',
    domainSubtitle: 'Making the business grow even when you take a 2-week vacation',
    oneSentenceMission: 'Removes single-person dependence so your company compounds faster during a 14-day absence than when you are in the room.',
    icon: Layers,
    prompt: 'What would happen to the business if you went completely offline with zero phone or email for 14 straight days?',
    options: [
      {
        label: 'Total Standstill (Critical Key-Person Risk)',
        description: 'Major deals would pause, disputes would pile up in my inbox, and the team would freeze waiting for my return.',
        penaltyDays: 28,
        score: 4,
        ebitdaImpactPercent: 7.5,
        painPointDiagnostic: 'You have built a successful multi-million dollar business, but you are trapped inside a high-stress job.',
        desiredOutcome: 'Remove your daily operational dependency in 90 days so the business runs smoothly without you.'
      },
      {
        label: 'Slowdown & Stagnation (Coasting on Past Work)',
        description: 'Routine tasks and existing clients continue fine, but new strategic initiatives and big sales halt.',
        penaltyDays: 12,
        score: 12,
        ebitdaImpactPercent: 3.5,
        painPointDiagnostic: 'The business coasts on past momentum, but cannot close new opportunities without your personal involvement.',
        desiredOutcome: 'Give senior leaders explicit authority to negotiate and close key deals independently.'
      },
      {
        label: 'Smooth Compounding Growth (Fully Independent)',
        description: 'The business runs smoothly, closes new contracts, and grows profit without needing my daily presence.',
        penaltyDays: 0,
        score: 20,
        ebitdaImpactPercent: 0,
        painPointDiagnostic: 'The highest level of business maturity. Your company is a truly valuable, self-sustaining asset.',
        desiredOutcome: 'Enjoy full personal freedom while your leadership team stewards enterprise growth.'
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
                
                {/* Domain Header & Step Indicator */}
                <div className="mb-6">
                  <div className="flex items-center justify-between text-xs font-mono text-[#6e727c] mb-2.5">
                    <div className="flex items-center gap-2">
                      <CurrentIcon className="w-4 h-4 text-[#9d7b38]" />
                      <span className="font-bold text-[#17181c] uppercase">
                        DOMAIN {currentQ.domainNumber}: {currentQ.domainName.toUpperCase()}
                      </span>
                    </div>
                    <span className="text-[#9d7b38] font-bold">
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

                  <div className="text-[11px] font-mono text-[#8f6d28] mt-1.5 italic">
                    Focus: {currentQ.domainSubtitle}
                  </div>
                </div>

                {/* Prompt Details */}
                <div className="mb-4 space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-bold text-[#17181c] leading-snug">
                    {currentQ.prompt}
                  </h3>
                  <p className="text-xs text-[#6e727c]">
                    Select the option that reflects your organization's objective operating reality.
                  </p>
                </div>

                {/* What This Domain Does & What We Achieve */}
                <div className="p-3 sm:p-3.5 bg-[#faf8f5] border-l-4 border-[#9d7b38] rounded-r-md text-xs sm:text-sm text-[#17181c] leading-relaxed shadow-2xs mb-5">
                  <div className="font-bold text-[#9d7b38] uppercase text-[11px] font-mono tracking-normal mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#9d7b38]" />
                    <span>Domain {currentQ.domainNumber} Purpose · What We Achieve:</span>
                  </div>
                  <p className="font-medium text-[#17181c] italic">
                    "{currentQ.oneSentenceMission}"
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
              /* PERSUASIVE, OUTCOME-BASED REPORT — PRESSES WHERE IT HURTS & LEADS TO IN-DEPTH ASSESSMENT */
              <div className="bg-[#ffffff] border-2 border-[#17181c] rounded-lg p-5 sm:p-8 lg:p-10 shadow-xl space-y-8 animate-in fade-in duration-300">
                
                {/* Header of Report */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#e5decfe0]">
                  <div>
                    <span className="px-2.5 py-0.5 rounded-xs bg-[#17181c] text-[#d4af37] text-[10px] font-mono uppercase font-bold tracking-widest">
                      Diagnostic Audit Synthesis
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#17181c] mt-1 tracking-tight">
                      Executive Sovereignty Ledger & Vulnerability Map
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#f0eade] hover:bg-[#e4ded0] text-xs font-mono text-[#17181c] rounded-xs transition-colors cursor-pointer border border-[#ded6c5]"
                    >
                      <RotateCcw className="w-3.5 h-3.5 text-[#9d7b38]" />
                      <span>Retake</span>
                    </button>
                  </div>
                </div>

                {/* THE UNVARNISHED VERDICT: PRESSING WHERE IT HURTS */}
                <div className="p-5 sm:p-6 rounded-md bg-[#17181c] text-white border-2 border-[#d4af37]/70 shadow-md">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
                    <div className="space-y-2.5 max-w-xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-xs text-[11px] font-mono uppercase font-black bg-[#d4af37] text-[#17181c]">
                          {needsUsVerdict ? 'VERDICT: OPERATIONAL CONFINEMENT' : 'VERDICT: ADVANCED AUTONOMY'}
                        </span>
                        <span className="text-xs font-mono text-[#a6a9b2]">
                          Sovereignty Index: {totalScore} / 100
                        </span>
                      </div>

                      <h4 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                        {needsUsVerdict 
                          ? 'You scaled a multi-million dollar business, but you built an expensive prison.'
                          : 'Your company demonstrates resilience, but latent governance friction remains.'}
                      </h4>

                      <p className="text-xs sm:text-sm text-stone-300 leading-relaxed italic">
                        {needsUsVerdict ? (
                          <>
                            "You are currently the primary single point of failure in your enterprise. When every strategic contract, pricing concession, and personnel issue flows back to your inbox, you are not leading—you are acting as an overworked universal clearinghouse. Your direct reports have developed learned helplessness, and stepping away for 14 days would paralyze growth."
                          </>
                        ) : (
                          <>
                            "Your core operational circuits function cleanly, but cross-departmental alignment still bleeds strategic speed. You are ready for formal board-level statesman alignment."
                          </>
                        )}
                      </p>
                    </div>

                    {/* Score Gauge */}
                    <div className="shrink-0 self-center sm:self-auto flex flex-col items-center justify-center w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-[#d4af37] bg-[#22242a] text-center shadow-lg">
                      <span className="text-3xl sm:text-4xl font-bold font-mono text-[#d4af37] tabular-nums">
                        {totalScore}%
                      </span>
                      <span className="text-[9px] font-mono uppercase tracking-widest text-stone-300">
                        Sovereign Index
                      </span>
                    </div>
                  </div>
                </div>

                {/* THE 3 TANGIBLE OUTCOMES (OUTCOME-BASED PROOF) */}
                <div className="space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#9d7b38] font-bold">
                    Target Transformation Outcomes (Within 90 Days):
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                    
                    <div className="p-4 rounded-md bg-[#faf8f5] border border-rose-300/80 shadow-2xs space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-rose-800 font-bold uppercase">
                        <TrendingDown className="w-4 h-4 text-rose-700" />
                        <span>Annual EBITDA Leakage</span>
                      </div>
                      <div className="text-2xl font-bold font-mono text-rose-900 tabular-nums">
                        ${(estimatedAnnualEbitdaBleed / 1000).toLocaleString(undefined, { maximumFractionDigits: 0 })}k/yr
                      </div>
                      <div className="text-xs text-[#5e626d]">
                        <strong className="text-[#17181c]">Outcome:</strong> Reclaim up to 85% of this leaking operating profit by eliminating alignment friction.
                      </div>
                    </div>

                    <div className="p-4 rounded-md bg-[#faf8f5] border border-amber-300/80 shadow-2xs space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-amber-800 font-bold uppercase">
                        <Clock className="w-4 h-4 text-amber-700" />
                        <span>Decision Cycle Compression</span>
                      </div>
                      <div className="text-2xl font-bold font-mono text-amber-900 tabular-nums">
                        {totalPenaltyDays} Days → 72 Hrs
                      </div>
                      <div className="text-xs text-[#5e626d]">
                        <strong className="text-[#17181c]">Outcome:</strong> Deploy market directives in days instead of waiting across multi-week committee reviews.
                      </div>
                    </div>

                    <div className="p-4 rounded-md bg-[#faf8f5] border border-emerald-300/80 shadow-2xs space-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-bold uppercase">
                        <ShieldCheck className="w-4 h-4 text-emerald-700" />
                        <span>Executive Time Liberated</span>
                      </div>
                      <div className="text-2xl font-bold font-mono text-emerald-900 tabular-nums">
                        15 - 20 Hrs/Wk
                      </div>
                      <div className="text-xs text-[#5e626d]">
                        <strong className="text-[#17181c]">Outcome:</strong> Reclaim Wednesday afternoons and weekends; focus 100% of bandwidth on capital allocation.
                      </div>
                    </div>

                  </div>
                </div>

                {/* Revenue Calibrator Slider */}
                <div className="p-4 sm:p-5 bg-[#faf8f5] border border-[#ded6c5] rounded-md space-y-3 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span className="text-[#57534e] font-bold uppercase">
                      Calibrate Annual Enterprise Revenue Baseline:
                    </span>
                    <span className="text-[#17181c] font-bold text-sm sm:text-base font-mono">
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
                    className="w-full accent-[#9d7b38] cursor-pointer h-2 bg-[#e8e0d0] rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-[#78716c]">
                    <span>$2M (Emerging Scale-Up)</span>
                    <span>$20M (Mid-Market Engine)</span>
                    <span>$100M+ (Enterprise Conglomerate)</span>
                  </div>
                </div>

                {/* 5-Domain Friction Breakdown Analysis */}
                <div className="p-5 rounded-md bg-[#faf8f5] border border-[#ded6c5] space-y-3 text-xs">
                  <div className="font-mono uppercase tracking-wider text-[#9d7b38] font-bold">
                    Audit Breakdown Across the 5 Domains:
                  </div>

                  <div className="space-y-3">
                    {FIVE_DOMAINS_QUESTIONS.map((q, idx) => {
                      const selectedOpt = q.options[answers[idx] ?? 0];
                      const Icon = q.icon;
                      return (
                        <div key={q.id} className="pt-2.5 border-t border-[#e5decfe0] first:pt-0 first:border-0 space-y-1">
                          <div className="flex items-center justify-between font-bold text-[#17181c]">
                            <span className="flex items-center gap-1.5">
                              <Icon className="w-3.5 h-3.5 text-[#9d7b38]" />
                              <span>Domain {q.domainNumber}: {q.domainName}</span>
                            </span>
                            <span className="font-mono text-[#9d7b38]">{selectedOpt.score} / 20 pts</span>
                          </div>
                          <div className="text-[#4e5159] leading-relaxed">
                            <span className="font-semibold text-rose-800">Friction Diagnostic:</span> {selectedOpt.painPointDiagnostic}
                          </div>
                          <div className="text-emerald-800 leading-relaxed">
                            <span className="font-semibold text-emerald-900">Target Outcome:</span> {selectedOpt.desiredOutcome}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* CRITICAL: THIS TEST LEADS TO THE IN-DEPTH ASSESSMENT */}
                <div className="p-6 rounded-md bg-gradient-to-br from-[#17181c] via-[#21232b] to-[#17181c] text-white border-2 border-[#d4af37] space-y-4 shadow-xl">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#d4af37] uppercase tracking-wider font-bold">
                    <Sparkles className="w-4 h-4 text-[#d4af37]" />
                    <span>Next Mandatory Phase: The In-Depth Diagnostic</span>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      This Preliminary Audit Confirms Your Bottleneck. <br className="hidden sm:inline" />
                      <span className="text-[#d4af37]">Now Run The In-Depth Patent-Pending L.O.S. Diagnostic™.</span>
                    </h4>
                    <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                      You have identified your high-friction domains. Our <strong>Patent-Pending Leadership Operating System (L.O.S.) Diagnostic™</strong> goes beneath symptoms to map out your exact architectural switches, calculate capital velocity drag, and generate an AI-powered Boardroom Memorandum to unfreeze your executive suite.
                    </p>
                    <div className="p-3 bg-[#242732] border border-[#d4af37]/40 rounded-sm text-xs text-stone-200 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-[#d4af37]">Council Chamber Taste Included:</strong> Ordering the Diagnostic gives you admission to 1 private closed-door executive sparring session with peer CEOs. <em>(Want the full strategic year-round version? It unlocks when you choose an Implementation Pathway).</em>
                      </div>
                    </div>
                  </div>

                  {/* High-Intent Conversion CTAs */}
                  <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button
                      onClick={onProceedToInDepth}
                      className="px-6 py-3.5 bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#b8860b] hover:opacity-95 text-[#17181c] font-bold text-xs uppercase tracking-wider rounded-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    >
                      <span>Proceed to In-Depth L.O.S. Diagnostic™</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={handleSendResultsToBriefing}
                      className="px-6 py-3.5 bg-[#2a2d36] hover:bg-[#343844] text-white font-semibold text-xs uppercase tracking-wider rounded-sm border border-[#434856] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Submit Audit to Sovereign Desk</span>
                    </button>
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
