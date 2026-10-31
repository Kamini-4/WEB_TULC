import React, { useState } from 'react';
import { 
  ArrowRight, 
  ArrowLeft,
  RotateCcw, 
  AlertTriangle, 
  TrendingDown, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  Sparkles,
  Brain,
  Cpu,
  Layers,
  Calendar,
  Users
} from 'lucide-react';

interface DomainQuestion {
  id: string;
  domainNumber: string;
  domainName: string;
  prompt: string;
  options: {
    label: string;
    description: string;
    score: number; // 0 to 20
    lostHours: number;
    delayCost: number;
    frictionSummary: string;
    fixAction: string;
  }[];
}

const FIVE_DOMAINS_QUESTIONS: DomainQuestion[] = [
  {
    id: 'cognitive_clarity',
    domainNumber: '01',
    domainName: 'Executive Time & Focus',
    prompt: 'Where does most of your time and mental focus go on an average work week?',
    options: [
      {
        label: 'Firefighting & Daily Emergencies',
        description: 'My day is consumed by urgent Slack messages, putting out fires, and answering operational questions my team should solve.',
        score: 4,
        lostHours: 15,
        delayCost: 45000,
        frictionSummary: 'Your focus is trapped in daily noise. High-level strategy is constantly delayed.',
        fixAction: 'Set clear escalation rules so routine issues never reach your desk.'
      },
      {
        label: 'Constant Interruptions & Approval Requests',
        description: 'I try to focus on big initiatives, but team members keep knocking or emailing asking for my approval before they act.',
        score: 11,
        lostHours: 8,
        delayCost: 25000,
        frictionSummary: 'Unclear decision boundaries cause managers to seek reassurance instead of taking ownership.',
        fixAction: 'Give team leads pre-approved spending limits up to $5,000 without sign-offs.'
      },
      {
        label: 'Protected Strategic Growth',
        description: 'My focus is defended. Zero routine questions reach me; my senior team resolves problems on their own.',
        score: 20,
        lostHours: 0,
        delayCost: 0,
        frictionSummary: 'Your focus is defended. You have bandwidth for high-conviction moves.',
        fixAction: 'Keep maintaining invariant boundaries as you scale.'
      }
    ]
  },
  {
    id: 'systemic_integrity',
    domainNumber: '02',
    domainName: 'Delegation & Execution',
    prompt: 'When you hand off a major initiative or responsibility to your leadership team, what happens?',
    options: [
      {
        label: 'Incomplete Output & Personal Rework',
        description: 'Work comes back incomplete or below standard, forcing me to step in, rewrite, or finish it myself.',
        score: 4,
        lostHours: 14,
        delayCost: 50000,
        frictionSummary: 'Your team treats you as a safety net, which destroys their confidence and multiplies your hours.',
        fixAction: 'Codify standards into 1-page checklists that define what finished work looks like.'
      },
      {
        label: 'Hesitant Delays on Tough Calls',
        description: 'They manage routine work well, but freeze when tough trade-offs or difficult decisions are required.',
        score: 12,
        lostHours: 6,
        delayCost: 20000,
        frictionSummary: 'Fear of making a mistake slows momentum and brings decisions back to your desk.',
        fixAction: 'Institute reversible decision rules: let them decide anything that can be undone.'
      },
      {
        label: 'Flawless Autonomous Delivery',
        description: 'Work finishes on schedule to exact standards with zero need for me to step in or review.',
        score: 20,
        lostHours: 0,
        delayCost: 0,
        frictionSummary: 'Your team executes decisively with high ownership and low supervision.',
        fixAction: 'Scale new units without adding management layers.'
      }
    ]
  },
  {
    id: 'strategic_velocity',
    domainNumber: '03',
    domainName: 'Decision Speed & Meetings',
    prompt: 'How fast does your company make critical business decisions?',
    options: [
      {
        label: 'Stuck in Endless Review Meetings',
        description: 'Decisions bounce through multiple meetings and committee reviews. Weeks pass before anything gets signed off.',
        score: 4,
        lostHours: 12,
        delayCost: 40000,
        frictionSummary: 'Consensus meetings disguise fear of accountability. Speed decays to zero.',
        fixAction: 'Assign exactly 1 owner to each decision. Remove committee approvals.'
      },
      {
        label: 'Frequent Second-Guessing After Sign-Off',
        description: 'We agree on a plan, but people hesitate, reopen debates, or wait for final reassurance before executing.',
        score: 11,
        lostHours: 6,
        delayCost: 20000,
        frictionSummary: 'Lack of clear written authority creates backchannel doubts and sluggish rollout.',
        fixAction: 'Install 14-day autonomous delivery sprints with clear deadlines.'
      },
      {
        label: 'Decisive 72-Hour Execution Loops',
        description: 'Designated leaders make decisions within 72 hours and execute with full authority and speed.',
        score: 20,
        lostHours: 0,
        delayCost: 0,
        frictionSummary: 'High market velocity. You outpace slower, committee-bound competitors.',
        fixAction: 'Preserve direct execution loops as revenue grows.'
      }
    ]
  },
  {
    id: 'moral_gravity',
    domainNumber: '04',
    domainName: 'Founder Absence Stress-Test',
    prompt: 'What happens to your business if you take an unexpected 30-day absence?',
    options: [
      {
        label: 'Operations Freeze & Revenue Stalls',
        description: 'Critical client deals, key hires, and major projects ground to a complete halt until I return.',
        score: 4,
        lostHours: 16,
        delayCost: 60000,
        frictionSummary: 'Extreme key-person dependency. The business is an extension of your stamina.',
        fixAction: 'Decouple essential systems so client delivery runs automatically without you.'
      },
      {
        label: 'Day-to-Day Survives, Strategic Growth Stops',
        description: 'Routine customer work gets done, but strategic initiatives pause and tough problems pile up on my desk.',
        score: 12,
        lostHours: 8,
        delayCost: 25000,
        frictionSummary: 'Operational tasks are delegated, but strategic decision rights remain locked in your head.',
        fixAction: 'Designate interim operational command with pre-set authority covenants.'
      },
      {
        label: 'Company Runs and Expands Smoothly',
        description: 'The executive bench operates autonomously, meeting growth targets with zero disruption.',
        score: 20,
        lostHours: 0,
        delayCost: 0,
        frictionSummary: 'True sovereign organization. Your company holds institutional perpetuity.',
        fixAction: 'Explore high-multiple strategic acquisition or perpetual board leadership.'
      }
    ]
  },
  {
    id: 'cultural_fidelity',
    domainNumber: '05',
    domainName: 'Leadership Team Alignment',
    prompt: 'How aligned is your senior leadership team on company priorities?',
    options: [
      {
        label: 'Departmental Silos & Disagreements',
        description: 'Leads pull in conflicting directions, protect their own departments, and drag me in to arbitrate disagreements.',
        score: 4,
        lostHours: 10,
        delayCost: 35000,
        frictionSummary: 'Departmental friction wastes executive energy and fragments company focus.',
        fixAction: 'Tie executive rewards to unified enterprise outcomes, not individual department metrics.'
      },
      {
        label: 'Polite Agreement in Meetings, Slow Execution in Practice',
        description: 'Everyone nods and agrees during our executive meetings, but execution slows down once the door closes.',
        score: 12,
        lostHours: 5,
        delayCost: 15000,
        frictionSummary: 'Passive resistance and lack of clear commitments stall team follow-through.',
        fixAction: 'Require written commitments and public 14-day completion scorecards.'
      },
      {
        label: 'Total Alignment & Mutual Accountability',
        description: 'Senior leaders challenge each other constructively, own decisions completely, and resolve friction together.',
        score: 20,
        lostHours: 0,
        delayCost: 0,
        frictionSummary: 'High-trust, high-accountability executive bench.',
        fixAction: 'Nurture decentralized leadership as you enter new markets.'
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
    <section id="simple-test" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#f8f6f0] text-black">
      <div className="max-w-3xl mx-auto">
        
        {!isCompleted ? (
          /* ========================================================================= */
          /* QUESTIONNAIRE: OVERLY SIMPLIFIED, GENEROUS SPACING, JET BLACK TEXT        */
          /* ========================================================================= */
          <div className="space-y-8">
            
            {/* Header: Clean, Crisp, Zero Clutter */}
            <div className="text-center space-y-3 pb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-black text-[#d4af37] text-xs font-mono uppercase font-bold rounded-xs tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>60-Second Operating Audit</span>
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black tracking-tight">
                Where is your business getting stuck?
              </h2>

              <p className="text-sm sm:text-base text-zinc-900 max-w-xl mx-auto leading-relaxed">
                Answer 5 simple questions about your daily operations to see how much time and momentum you lose to bottleneck delays.
              </p>
            </div>

            {/* Question Card */}
            <div className="bg-white rounded-xl border-2 border-[#d8cebe] p-6 sm:p-9 shadow-sm space-y-6">
              
              {/* Step indicator */}
              <div className="flex items-center justify-between pb-4 border-b border-[#ebdcc0]">
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-black">
                  Question {currentStep + 1} of 5 · <span className="text-[#9d7b38]">{currentQ.domainName}</span>
                </div>
                <div className="text-xs font-mono font-bold text-black">
                  {Math.round(((currentStep + 1) / FIVE_DOMAINS_QUESTIONS.length) * 100)}%
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-[#ede5d6] h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-black h-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / FIVE_DOMAINS_QUESTIONS.length) * 100}%` }}
                />
              </div>

              {/* Question Text in Jet Black */}
              <h3 className="text-lg sm:text-2xl font-bold text-black leading-snug pt-2">
                {currentQ.prompt}
              </h3>

              {/* Options */}
              <div className="space-y-3.5 pt-1">
                {currentQ.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className="w-full text-left p-5 rounded-lg bg-[#faf8f4] hover:bg-black text-black hover:text-white border-2 border-[#e2d8c9] hover:border-black transition-all duration-200 cursor-pointer group flex items-start justify-between gap-4 shadow-xs hover:shadow-md"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-full bg-[#ebdcc0] text-black group-hover:bg-[#d4af37] group-hover:text-black text-xs font-mono font-black flex items-center justify-center shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-base font-bold text-black group-hover:text-white">
                          {opt.label}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-800 group-hover:text-zinc-200 pl-8 leading-relaxed font-normal">
                        {opt.description}
                      </p>
                    </div>

                    <ArrowRight className="w-4 h-4 text-[#9d7b38] group-hover:text-[#d4af37] group-hover:translate-x-1 transition-transform shrink-0 mt-1" />
                  </button>
                ))}
              </div>

              {/* Back button */}
              {currentStep > 0 && (
                <div className="pt-3 flex justify-start">
                  <button
                    onClick={() => {
                      setCurrentStep(currentStep - 1);
                      setAnswers(answers.slice(0, -1));
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-black hover:text-[#9d7b38] cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to previous question</span>
                  </button>
                </div>
              )}

            </div>

          </div>
        ) : (
          /* ========================================================================= */
          /* REPORT: STRATEGIC, OVERLY SIMPLIFIED 3-CARD SCORECARD (ZERO CLUTTER)     */
          /* ========================================================================= */
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* Top Bar with Seal & Retake Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#d8cebe]">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-[#0c1322] border-2 border-[#d4af37] rounded-md shadow-sm w-16 h-16 shrink-0 flex items-center justify-center">
                  <img 
                    src="/assets/tulc-gold-navy-crest.jpg" 
                    alt="The Sovereign Seal" 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div>
                  <span className="text-[11px] font-mono uppercase text-[#9d7b38] font-black tracking-widest block">
                    Confidential Operating Report
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-black">
                    Your Operational Reality Check
                  </h2>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-mono font-bold text-black bg-white hover:bg-[#ede5d6] border border-[#d8cebe] rounded-sm transition-colors cursor-pointer self-start sm:self-auto"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#9d7b38]" />
                <span>Retake Audit</span>
              </button>
            </div>

            {/* CARD 1: THE CORE VERDICT (JET BLACK & GOLD ANCHOR) */}
            <div className="p-7 sm:p-9 rounded-xl bg-black text-white border-2 border-[#d4af37] shadow-xl space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className={`px-3 py-1 rounded-xs text-xs font-mono uppercase font-black tracking-wider ${
                  isSevereBottleneck ? 'bg-rose-900 text-rose-200' : isModerateFriction ? 'bg-amber-900 text-amber-200' : 'bg-emerald-900 text-emerald-200'
                }`}>
                  {isSevereBottleneck ? 'Status: Severe Founder Bottleneck' : isModerateFriction ? 'Status: Moderate Operational Friction' : 'Status: High Autonomous Sovereignty'}
                </span>

                <div className="text-sm font-mono text-[#d4af37] font-bold">
                  Score: <strong className="text-2xl text-white">{totalScore}</strong> / 100
                </div>
              </div>

              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#f4ecd8] leading-snug">
                {isSevereBottleneck 
                  ? 'You built a great business, but you are currently trapped inside it.'
                  : isModerateFriction
                  ? 'Your company gets work done, but decision delays are slowing your growth.'
                  : 'Your executive bench runs with high autonomy and disciplined execution.'}
              </h3>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-normal">
                {isSevereBottleneck ? (
                  <>
                    Because routine decisions, spending sign-offs, and daily fires flow to your desk, your leadership team has developed learned helplessness. When you are the only one who can make a call, the entire business moves at the speed of your personal stamina.
                  </>
                ) : isModerateFriction ? (
                  <>
                    Your team handles day-to-day work, but they hesitate on major trade-offs. Decisions bounce across multiple meetings and reviews, causing you to spend valuable hours in unnecessary alignment sessions.
                  </>
                ) : (
                  <>
                    Your team operates with strong ownership. Your next frontier is installing permanent governance and enterprise systems so the company compounds seamlessly whether you are in the office or away.
                  </>
                )}
              </p>
            </div>

            {/* CARD 2: THE TWO CRITICAL NUMBERS (GENEROUS SPACING, JET BLACK TYPOGRAPHY) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Lost Hours */}
              <div className="p-6 sm:p-7 rounded-xl bg-white border-2 border-[#d8cebe] shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-rose-700">
                  <Clock className="w-4 h-4 text-rose-700" />
                  <span>Executive Time Lost</span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-black">
                  {totalLostHours}+ Hours / Wk
                </div>
                <p className="text-xs sm:text-sm text-zinc-900 leading-relaxed pt-1 font-medium">
                  Spent putting out fires, answering routine messages, and attending status meetings your managers should handle without you.
                </p>
              </div>

              {/* Financial Inaction Cost */}
              <div className="p-6 sm:p-7 rounded-xl bg-white border-2 border-[#d8cebe] shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-amber-800">
                  <TrendingDown className="w-4 h-4 text-amber-800" />
                  <span>Annual Delay Cost</span>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-black">
                  ${totalDelayCost.toLocaleString()} / Yr
                </div>
                <p className="text-xs sm:text-sm text-zinc-900 leading-relaxed pt-1 font-medium">
                  Lost enterprise value and slowed execution caused by delayed initiatives waiting for executive review.
                </p>
              </div>

            </div>

            {/* CARD 3: THE 3-STEP FIX IN 90 DAYS (PLAIN ENGLISH, JET BLACK TEXT) */}
            <div className="p-7 sm:p-8 rounded-xl bg-white border-2 border-[#d8cebe] shadow-sm space-y-6">
              <div>
                <span className="text-xs font-mono uppercase text-[#9d7b38] font-bold tracking-wider block">
                  The 90-Day Decoupling Roadmap
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-black mt-1">
                  Three Steps to Remove Yourself as the Bottleneck:
                </h3>
              </div>

              <div className="space-y-4">
                
                {/* Step 1 */}
                <div className="p-4 rounded-lg bg-[#faf8f4] border border-[#e2d8c9] flex items-start gap-3.5">
                  <span className="w-7 h-7 rounded-full bg-black text-[#d4af37] text-xs font-mono font-black flex items-center justify-center shrink-0 mt-0.5">
                    1
                  </span>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-black">
                      Set $5,000 Pre-Approved Authority Limits
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-900 leading-relaxed">
                      Give your managers explicit permission to make operational decisions under $5,000 immediately without messaging you or waiting for approval.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-4 rounded-lg bg-[#faf8f4] border border-[#e2d8c9] flex items-start gap-3.5">
                  <span className="w-7 h-7 rounded-full bg-black text-[#d4af37] text-xs font-mono font-black flex items-center justify-center shrink-0 mt-0.5">
                    2
                  </span>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-black">
                      Replace Status Meetings with 14-Day Delivery Sprints
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-900 leading-relaxed">
                      Eliminate routine check-in calls. Assign exactly one owner per initiative and hold them accountable to measurable 14-day delivery loops.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-4 rounded-lg bg-[#faf8f4] border border-[#e2d8c9] flex items-start gap-3.5">
                  <span className="w-7 h-7 rounded-full bg-black text-[#d4af37] text-xs font-mono font-black flex items-center justify-center shrink-0 mt-0.5">
                    3
                  </span>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-black">
                      Decouple the Founder (The 30-Day Absence Test)
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-900 leading-relaxed">
                      Document operating rules so your business generates revenue and serves clients flawlessly even if you take an entire month completely off.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* DIRECT ACTION SECTION: ONE HIGH-IMPACT NEXT STEP */}
            <div className="p-7 sm:p-9 rounded-xl bg-black text-white border-2 border-[#d4af37] shadow-xl text-center space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#17181c] border border-[#d4af37] rounded-full text-xs font-mono text-[#d4af37] font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Confidential Advisory</span>
              </div>

              <div className="space-y-2 max-w-xl mx-auto">
                <h3 className="text-2xl sm:text-3xl font-black text-[#f4ecd8] leading-tight">
                  Ready to Reclaim 15+ Hours Every Week?
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                  Book a confidential 20-minute strategy call directly with Suchita Sancheti. We will review your operating bottlenecks and design your 90-day decoupling plan.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
                <button
                  onClick={handleScheduleCall}
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#d4af37] via-[#f5e6b3] to-[#d4af37] hover:brightness-110 text-black font-black text-xs uppercase tracking-wider rounded-xs transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer font-mono"
                >
                  <span>Book 20-Min Strategy Call</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </button>

                <button
                  onClick={onProceedToInDepth}
                  className="w-full sm:w-auto px-6 py-4 bg-[#141520] hover:bg-[#1f2233] text-white font-bold text-xs uppercase tracking-wider rounded-xs border border-zinc-700 transition-colors flex items-center justify-center gap-2 cursor-pointer font-mono"
                >
                  <span>Explore Phase 2 Diagnostic</span>
                </button>
              </div>

              <div className="text-[11px] font-mono text-zinc-400 pt-1">
                Strict Chatham House Rule · 100% Confidential
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
