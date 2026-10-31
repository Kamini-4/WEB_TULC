import React, { useState } from 'react';
import { 
  ArrowRight, 
  ArrowLeft,
  RotateCcw, 
  TrendingDown, 
  Clock, 
  Sparkles
} from 'lucide-react';

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
        description: 'Trapped answering messages, putting out fires, and resolving operational questions my team should solve.',
        score: 4,
        lostHours: 15,
        delayCost: 45000
      },
      {
        label: 'Constant Interruptions & Sign-Offs',
        description: 'I try to focus on growth, but team members keep asking for approval before taking any action.',
        score: 11,
        lostHours: 8,
        delayCost: 25000
      },
      {
        label: 'Protected Strategic Growth',
        description: 'Zero routine questions reach my desk. My leadership bench resolves operational friction autonomously.',
        score: 20,
        lostHours: 0,
        delayCost: 0
      }
    ]
  },
  {
    id: 'systemic_integrity',
    domainNumber: '02',
    domainName: 'Delegation Fidelity',
    prompt: 'When you hand off a major initiative to your leadership team, what happens?',
    options: [
      {
        label: 'Incomplete Output & Personal Rework',
        description: 'Deliverables fall below standard, forcing me to step in, rewrite, or finish execution myself.',
        score: 4,
        lostHours: 14,
        delayCost: 50000
      },
      {
        label: 'Hesitant Delays on Tough Calls',
        description: 'They manage routine work well, but freeze when tough trade-offs or spending decisions arise.',
        score: 12,
        lostHours: 6,
        delayCost: 20000
      },
      {
        label: 'Flawless Autonomous Delivery',
        description: 'Projects finish on schedule to exact standards with zero need for executive intervention.',
        score: 20,
        lostHours: 0,
        delayCost: 0
      }
    ]
  },
  {
    id: 'strategic_velocity',
    domainNumber: '03',
    domainName: 'Decision Speed',
    prompt: 'How fast does your company make critical business decisions?',
    options: [
      {
        label: 'Stuck in Endless Review Meetings',
        description: 'Decisions bounce across multiple committees. Weeks pass before anything gets signed off.',
        score: 4,
        lostHours: 12,
        delayCost: 40000
      },
      {
        label: 'Second-Guessing After Sign-Off',
        description: 'We agree on plans in meetings, but execution slows down due to doubts and backchannel debates.',
        score: 11,
        lostHours: 6,
        delayCost: 20000
      },
      {
        label: 'Decisive 72-Hour Execution Loops',
        description: 'Designated leaders make decisions in days and execute with full authority and speed.',
        score: 20,
        lostHours: 0,
        delayCost: 0
      }
    ]
  },
  {
    id: 'moral_gravity',
    domainNumber: '04',
    domainName: 'Founder Absence',
    prompt: 'What happens to your business if you take an unexpected 30-day absence?',
    options: [
      {
        label: 'Operations Freeze & Revenue Stalls',
        description: 'Client deals, key hires, and major initiatives ground to a complete halt until I return.',
        score: 4,
        lostHours: 16,
        delayCost: 60000
      },
      {
        label: 'Day-to-Day Survives, Strategy Stops',
        description: 'Routine work gets done, but tough problems pile up and strategic expansion pauses.',
        score: 12,
        lostHours: 8,
        delayCost: 25000
      },
      {
        label: 'Company Runs and Expands Smoothly',
        description: 'The executive bench hits quarterly targets without any disruption or executive guidance.',
        score: 20,
        lostHours: 0,
        delayCost: 0
      }
    ]
  },
  {
    id: 'cultural_fidelity',
    domainNumber: '05',
    domainName: 'Team Alignment',
    prompt: 'How aligned is your senior leadership team on company priorities?',
    options: [
      {
        label: 'Departmental Silos & Disagreements',
        description: 'Leads pull in conflicting directions, protect their turf, and drag me in to resolve disputes.',
        score: 4,
        lostHours: 10,
        delayCost: 35000
      },
      {
        label: 'Polite Agreement, Sluggish Action',
        description: 'Everyone nods in executive reviews, but follow-through stalls once the meeting ends.',
        score: 12,
        lostHours: 5,
        delayCost: 15000
      },
      {
        label: 'Total Alignment & Mutual Accountability',
        description: 'Senior leaders challenge each other openly, own outcomes completely, and execute as one.',
        score: 20,
        lostHours: 0,
        delayCost: 0
      }
    ]
  }
];

interface SimpleNeedsTestProps {
  onConsultationRequest: (summary: any) => void;
  onExplorePartnerships: () => void;
  onProceedToInDepth: () => void;
}

export const SimpleNeedsTest: React.FC<SimpleNeedsTestProps> = ({
  onConsultationRequest,
  onExplorePartnerships,
  onProceedToInDepth
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

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
  };

  // Computations
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

  const isSevereBottleneck = totalScore < 50;
  const isModerateFriction = totalScore >= 50 && totalScore < 80;

  const handleScheduleCall = () => {
    const summary = {
      score: totalScore,
      lostHours: totalLostHours,
      delayCost: totalDelayCost,
      status: isSevereBottleneck ? 'Critical Bottleneck' : isModerateFriction ? 'Moderate Friction' : 'Autonomous High-Performer'
    };
    onConsultationRequest(summary);
  };

  const currentQ = FIVE_DOMAINS_QUESTIONS[currentStep];

  return (
    <section id="simple-test" className="py-4 sm:py-6 px-3 sm:px-6 bg-[#f8f6f0] text-black">
      <div className="max-w-3xl mx-auto">
        
        {!isCompleted ? (
          /* ========================================================================= */
          /* QUESTIONNAIRE: NO WASTED SPACING, QUESTION & CHOICES VISIBLE IMMEDIATELY   */
          /* ========================================================================= */
          <div className="bg-white rounded-lg border-2 border-[#d8cebe] p-4 sm:p-6 shadow-sm space-y-4">
            
            {/* Ultra-Compact Top Progress Bar */}
            <div className="flex items-center justify-between pb-2.5 border-b border-[#ebdcc0]">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-black text-[#d4af37] text-[11px] font-mono uppercase font-bold rounded-xs">
                  60-Sec Audit
                </span>
                <span className="text-xs font-mono font-bold text-black uppercase">
                  Question {currentStep + 1} of 5 · <span className="text-[#9d7b38]">{currentQ.domainName}</span>
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-black">
                {Math.round(((currentStep + 1) / FIVE_DOMAINS_QUESTIONS.length) * 100)}%
              </span>
            </div>

            {/* Progress line */}
            <div className="w-full bg-[#ede5d6] h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-black h-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / FIVE_DOMAINS_QUESTIONS.length) * 100}%` }}
              />
            </div>

            {/* Question Heading in Jet Black — Straight to the point */}
            <h2 className="text-base sm:text-xl font-black text-black leading-snug">
              {currentQ.prompt}
            </h2>

            {/* Compact, Highly Readable Choices in Jet Black */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className="w-full text-left p-3.5 sm:p-4 rounded-md bg-[#faf8f4] hover:bg-black text-black hover:text-white border-2 border-[#e2d8c9] hover:border-black transition-all cursor-pointer group flex items-start justify-between gap-3 shadow-2xs hover:shadow-sm"
                >
                  <div className="space-y-0.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#ebdcc0] text-black group-hover:bg-[#d4af37] group-hover:text-black text-[11px] font-mono font-black flex items-center justify-center shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-sm sm:text-base font-bold text-black group-hover:text-white">
                        {opt.label}
                      </span>
                    </div>
                    <p className="text-xs sm:text-[13px] text-zinc-800 group-hover:text-zinc-200 pl-7 leading-relaxed font-normal">
                      {opt.description}
                    </p>
                  </div>

                  <ArrowRight className="w-4 h-4 text-[#9d7b38] group-hover:text-[#d4af37] group-hover:translate-x-0.5 transition-transform shrink-0 mt-0.5" />
                </button>
              ))}
            </div>

            {/* Back button */}
            {currentStep > 0 && (
              <div className="pt-1 flex justify-start">
                <button
                  onClick={() => {
                    setCurrentStep(currentStep - 1);
                    setAnswers(answers.slice(0, -1));
                  }}
                  className="inline-flex items-center gap-1 text-xs font-mono font-bold text-black hover:text-[#9d7b38] cursor-pointer"
                >
                  <ArrowLeft className="w-3 h-3" />
                  <span>Previous Question</span>
                </button>
              </div>
            )}

          </div>
        ) : (
          /* ========================================================================= */
          /* COMPACT EXECUTIVE SCORECARD: ZERO WASTED VERTICAL SCROLLING                */
          /* ========================================================================= */
          <div className="space-y-4 animate-in fade-in duration-200">
            
            {/* Top Bar with Status and Retake */}
            <div className="bg-white rounded-lg border-2 border-[#d8cebe] p-3.5 sm:p-4 flex items-center justify-between gap-3 shadow-xs">
              <div className="flex items-center gap-3">
                <div className="p-1 bg-[#0c1322] border-2 border-[#d4af37] rounded-sm w-10 h-10 shrink-0 flex items-center justify-center">
                  <img 
                    src="/assets/tulc-gold-navy-crest.jpg" 
                    alt="The Sovereign Seal" 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#9d7b38] font-black tracking-wider block">
                    Operating Audit Result
                  </span>
                  <h3 className="text-sm sm:text-base font-black text-black">
                    Executive Sovereignty Score: <strong className="text-[#9d7b38]">{totalScore}</strong> / 100
                  </h3>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-mono font-bold text-black bg-[#faf8f4] hover:bg-[#ede5d6] border border-[#d8cebe] rounded-xs cursor-pointer"
              >
                <RotateCcw className="w-3 h-3 text-[#9d7b38]" />
                <span>Retake</span>
              </button>
            </div>

            {/* CARD 1: THE CORE VERDICT (COMPACT JET BLACK & GOLD ANCHOR) */}
            <div className="p-5 sm:p-6 rounded-lg bg-black text-white border-2 border-[#d4af37] shadow-md space-y-2.5">
              <span className={`inline-block px-2.5 py-0.5 rounded-xs text-[11px] font-mono uppercase font-black tracking-wider ${
                isSevereBottleneck ? 'bg-rose-900 text-rose-200' : isModerateFriction ? 'bg-amber-900 text-amber-200' : 'bg-emerald-900 text-emerald-200'
              }`}>
                {isSevereBottleneck ? 'Status: Severe Founder Bottleneck' : isModerateFriction ? 'Status: Moderate Friction' : 'Status: High Autonomy'}
              </span>

              <h4 className="text-lg sm:text-xl font-black text-[#f4ecd8] leading-snug">
                {isSevereBottleneck 
                  ? 'You built a great business, but you are currently trapped inside it.'
                  : isModerateFriction
                  ? 'Your company gets work done, but decision delays are slowing growth.'
                  : 'Your executive bench runs with high autonomy and disciplined execution.'}
              </h4>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
                {isSevereBottleneck ? (
                  <>Because routine decisions, spending sign-offs, and daily fires flow to your desk, your leadership team has developed learned helplessness. The entire company moves at the speed of your personal stamina.</>
                ) : isModerateFriction ? (
                  <>Your team handles day-to-day work, but they hesitate on major trade-offs. Decisions bounce across multiple meetings and reviews, wasting valuable executive focus.</>
                ) : (
                  <>Your team operates with strong ownership. Your next frontier is hard-coding permanent enterprise governance so the company compounds seamlessly without you.</>
                )}
              </p>
            </div>

            {/* CARD 2: THE TWO CRITICAL NUMBERS (COMPACT SIDE-BY-SIDE) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Lost Hours */}
              <div className="p-4 rounded-lg bg-white border-2 border-[#d8cebe] shadow-2xs space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-rose-700">
                  <Clock className="w-3.5 h-3.5 text-rose-700" />
                  <span>Executive Time Lost</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-black">
                  {totalLostHours}+ Hours / Wk
                </div>
                <p className="text-xs text-zinc-900 font-medium leading-snug">
                  Consumed putting out fires, answering messages, and sitting in update meetings your managers should run.
                </p>
              </div>

              {/* Financial Inaction Cost */}
              <div className="p-4 rounded-lg bg-white border-2 border-[#d8cebe] shadow-2xs space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-amber-800">
                  <TrendingDown className="w-3.5 h-3.5 text-amber-800" />
                  <span>Annual Delay Cost</span>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-black">
                  ${totalDelayCost.toLocaleString()} / Yr
                </div>
                <p className="text-xs text-zinc-900 font-medium leading-snug">
                  Lost enterprise value and slowed execution caused by delayed initiatives waiting for executive review.
                </p>
              </div>

            </div>

            {/* CARD 3: THE 3-STEP FIX (TIGHT, COMPACT, JET BLACK) */}
            <div className="p-4 sm:p-5 rounded-lg bg-white border-2 border-[#d8cebe] shadow-2xs space-y-3">
              <div className="text-xs font-mono uppercase text-[#9d7b38] font-bold tracking-wider">
                90-Day Decoupling Roadmap
              </div>

              <div className="space-y-2">
                <div className="p-2.5 rounded bg-[#faf8f4] border border-[#e2d8c9] flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-black text-[#d4af37] text-[11px] font-mono font-black flex items-center justify-center shrink-0 mt-0.5">1</span>
                  <p className="text-xs text-black">
                    <strong className="font-bold">Set $5,000 Authority Limits:</strong> Give managers immediate permission to make decisions under $5,000 without waiting for your sign-off.
                  </p>
                </div>

                <div className="p-2.5 rounded bg-[#faf8f4] border border-[#e2d8c9] flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-black text-[#d4af37] text-[11px] font-mono font-black flex items-center justify-center shrink-0 mt-0.5">2</span>
                  <p className="text-xs text-black">
                    <strong className="font-bold">Kill Status Meetings with 14-Day Sprints:</strong> Assign exactly one owner per initiative and hold them accountable to bi-weekly delivery loops.
                  </p>
                </div>

                <div className="p-2.5 rounded bg-[#faf8f4] border border-[#e2d8c9] flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-black text-[#d4af37] text-[11px] font-mono font-black flex items-center justify-center shrink-0 mt-0.5">3</span>
                  <p className="text-xs text-black">
                    <strong className="font-bold">The 30-Day Founder Absence Rule:</strong> Codify operational rules so your business generates revenue flawlessly even if you take a full month off.
                  </p>
                </div>
              </div>
            </div>

            {/* COMPACT ACTION SECTION */}
            <div className="p-5 rounded-lg bg-black text-white border-2 border-[#d4af37] shadow-lg flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
              <div className="space-y-0.5">
                <h4 className="text-base sm:text-lg font-black text-[#f4ecd8]">
                  Ready to Reclaim 15+ Hours Every Week?
                </h4>
                <p className="text-xs text-zinc-300">
                  Book a confidential 20-minute strategy call with Suchita Sancheti to design your 90-day decoupling plan.
                </p>
              </div>

              <button
                onClick={handleScheduleCall}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#d4af37] via-[#f5e6b3] to-[#d4af37] hover:brightness-110 text-black font-black text-xs uppercase tracking-wider rounded-xs transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer font-mono shrink-0"
              >
                <span>Book 20-Min Call</span>
                <ArrowRight className="w-3.5 h-3.5 text-black" />
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
