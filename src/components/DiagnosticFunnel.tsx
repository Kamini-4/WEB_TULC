import React, { useState } from 'react';
import { Activity, ShieldCheck, ArrowRight, RotateCcw, AlertCircle, CheckCircle, Clock, Zap } from 'lucide-react';

interface DiagnosticQuestion {
  id: string;
  category: 'Cognitive' | 'Decisions' | 'Culture' | 'Autonomy';
  title: string;
  description: string;
  options: {
    label: string;
    score: number; // 0 to 25
    description: string;
    godinDiagnosis: string;
  }[];
}

const QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'q1',
    category: 'Cognitive',
    title: '1. Executive Communication & Cognitive Surplus',
    description: 'How do urgent questions and internal requests reach you throughout a standard business day?',
    options: [
      {
        label: 'Continuous Reactive Pings',
        score: 5,
        description: 'Constantly pinged via Slack, WhatsApp, and email; I respond within minutes all day.',
        godinDiagnosis: 'Cognitive slot machine syndrome. Constant interruptions leave zero space for strategic synthesis.'
      },
      {
        label: 'Periodic Triage',
        score: 12,
        description: 'I try to batch responses, but major fires regularly drag me back into operational chat.',
        godinDiagnosis: 'Partial systemic leakage. Your intention is sound, but boundaries lack architectural enforcement.'
      },
      {
        label: 'Structured Daily Windows',
        score: 19,
        description: 'Direct reports know I only check messages during 2 designated windows daily.',
        godinDiagnosis: 'Healthy boundary setting. Close to sovereign state with occasional friction.'
      },
      {
        label: 'Pure Asynchronous Governance',
        score: 25,
        description: 'Zero impromptu operational pings. Communication occurs exclusively via structured decision memos.',
        godinDiagnosis: 'Sovereign institutional clarity. Exceptional cognitive surplus preserved for vision.'
      }
    ]
  },
  {
    id: 'q2',
    category: 'Decisions',
    title: '2. Decision Geometry & Threshold Delegation',
    description: 'What level of decision requires your personal sign-off before your team can proceed?',
    options: [
      {
        label: 'Almost Everything',
        score: 5,
        description: 'Any hiring, client concession, or expenditure over $1,000 must pass through me.',
        godinDiagnosis: 'The Founder Bottleneck Trap. You are the single point of failure in your enterprise.'
      },
      {
        label: 'Moderate Operational Approvals',
        score: 12,
        description: 'Directors make small decisions, but anything strategic or over $10k lands on my desk.',
        godinDiagnosis: 'Managerial drag. High decision latency is quietly stifling your market velocity.'
      },
      {
        label: 'Defined Threshold Matrices',
        score: 19,
        description: 'Clear written parameters allow VPs to commit up to $50k autonomously within quarterly plans.',
        godinDiagnosis: 'Advanced institutional maturity. Team moves quickly with minor escalation friction.'
      },
      {
        label: 'Complete Autonomous Frameworks',
        score: 25,
        description: 'Executives operate within a 1-page Sovereign Decision Treaty; I only calibrate directional guardrails.',
        godinDiagnosis: 'Sovereign architectural mastery. Enterprise compounds without your presence.'
      }
    ]
  },
  {
    id: 'q3',
    category: 'Culture',
    title: '3. Tribal Standards & Peer Accountability',
    description: 'What happens inside your organization when a team member submits mediocre work?',
    options: [
      {
        label: 'I Have to Personally Intervene',
        score: 5,
        description: 'If I do not catch and rewrite it myself, low-quality work slips out to clients or partners.',
        godinDiagnosis: 'Absence of tribal immune system. You are acting as chief proofreader instead of statesman.'
      },
      {
        label: 'Managers Grumble Privately',
        score: 12,
        description: 'Issues are discussed in private reviews, but peer confrontations are avoided.',
        godinDiagnosis: 'Consensus theater. Politeness is prioritized over institutional excellence.'
      },
      {
        label: 'Active Feedback Loops',
        score: 18,
        description: 'Directors hold direct reports accountable to performance rubrics consistently.',
        godinDiagnosis: 'Solid organizational hygiene. Approaching genuine cultural self-defense.'
      },
      {
        label: 'Fierce Peer Defense ("People Like Us")',
        score: 25,
        description: 'The team self-regulates immediately; mediocre output is rejected by peers before leaders ever see it.',
        godinDiagnosis: 'Seth Godin Tribal Nirvana. Culture acts as an autonomous immune system.'
      }
    ]
  },
  {
    id: 'q4',
    category: 'Autonomy',
    title: '4. The 90-Day Sovereign Stress Test',
    description: 'If you were completely off-grid for 90 days with zero phone or internet, what would happen?',
    options: [
      {
        label: 'Enterprise Paralysis',
        score: 5,
        description: 'Critical deals would stall, internal disputes would escalate, and revenue would plummet.',
        godinDiagnosis: 'Operational imprisonment. You own a high-stress job, not a self-sustaining asset.'
      },
      {
        label: 'Treading Water',
        score: 12,
        description: 'The business would survive on current momentum, but all growth initiatives would freeze.',
        godinDiagnosis: 'Momentum plateau. The company can coast, but cannot steer without you.'
      },
      {
        label: 'Steady Execution',
        score: 19,
        description: 'Operations would continue cleanly; leadership team would handle 90% of emergencies.',
        godinDiagnosis: 'High operational resilience. Ready for full institutional sovereign graduation.'
      },
      {
        label: 'Autonomous Compounding',
        score: 25,
        description: 'The company would grow faster, close major contracts, and return record margins.',
        godinDiagnosis: 'The Holy Grail of Enterprise Sovereignty. An enduring, transcendent institution.'
      }
    ]
  }
];

interface DiagnosticFunnelProps {
  onOpenCalibration: () => void;
}

export const DiagnosticFunnel: React.FC<DiagnosticFunnelProps> = ({ onOpenCalibration }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleSelectOption = (questionId: string, score: number) => {
    const updatedAnswers = { ...answers, [questionId]: score };
    setAnswers(updatedAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setIsCompleted(false);
  };

  // Calculate scores
  const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
  const maxScore = 100;
  const percentage = Math.min(100, Math.round((totalScore / maxScore) * 100));

  let scoreTier = {
    title: 'Operational Firefighting (Critical Vulnerability)',
    description: 'Your enterprise is fundamentally reliant on your daily physical presence. You are carrying severe cognitive drag that caps enterprise valuation and exposes the organization to key-person collapse.',
    color: 'text-red-400',
    border: 'border-red-900',
    bg: 'bg-red-950/20',
    prescription: 'Install TULC 5-Domain Governance Architecture immediately to decouple your nervous system from daily operations.'
  };

  if (percentage >= 75) {
    scoreTier = {
      title: 'Sovereign Institutional Guild (Elite Mastery)',
      description: 'Your leadership system operates with remarkable autonomy, clarity, and tribal self-regulation. Your executive team commands high trust and low decision friction.',
      color: 'text-emerald-400',
      border: 'border-emerald-800',
      bg: 'bg-emerald-950/20',
      prescription: 'Calibrate your capital velocity and board-level statesman posture to compound enterprise value into generational permanence.'
    };
  } else if (percentage >= 50) {
    scoreTier = {
      title: 'Managerial Transition (High Friction)',
      description: 'You have begun delegating tactical tasks, but your leadership circuits still suffer from high decision latency, consensus drag, and intermittent founder bottlenecks.',
      color: 'text-amber-400',
      border: 'border-amber-800',
      bg: 'bg-amber-950/20',
      prescription: 'Transition from ad-hoc task delegation to a 1-page Sovereign Operating Treaty to eliminate the delegation voltage drop.'
    };
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-amber-400 font-mono text-xs uppercase tracking-widest mb-3">
          Constructive Tension Assessment
        </div>
        <h2 className="serif-heading text-3xl sm:text-5xl font-bold text-zinc-100 tracking-tight">
          The Sovereign Operating Index
        </h2>
        <p className="text-zinc-400 text-base sm:text-lg mt-3 font-light">
          A 4-minute diagnostic revealing where your leadership operating system leaks executive energy, decision speed, and enterprise valuation.
        </p>
      </div>

      {!isCompleted ? (
        <div className="bg-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Progress bar */}
          <div className="w-full bg-zinc-900 h-1.5 rounded-full mb-8 overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-500 to-amber-300 h-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-zinc-500 mb-6">
            <span>STAGE {currentStep + 1} OF {QUESTIONS.length}</span>
            <span>DOMAIN: {QUESTIONS[currentStep].category.toUpperCase()}</span>
          </div>

          <h3 className="serif-heading text-2xl sm:text-3xl font-bold text-zinc-100 mb-2">
            {QUESTIONS[currentStep].title}
          </h3>
          <p className="text-sm text-zinc-400 mb-8 font-light">
            {QUESTIONS[currentStep].description}
          </p>

          {/* Options */}
          <div className="space-y-4">
            {QUESTIONS[currentStep].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(QUESTIONS[currentStep].id, option.score)}
                className="w-full text-left p-5 rounded-xl bg-zinc-900/60 border border-zinc-850 hover:border-amber-500/50 hover:bg-zinc-900 transition-all duration-200 cursor-pointer group flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="text-sm font-semibold text-zinc-200 group-hover:text-amber-300 transition-colors flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-zinc-800 text-zinc-400 text-xs font-mono flex items-center justify-center group-hover:bg-amber-400 group-hover:text-zinc-950">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    {option.label}
                  </div>
                  <div className="text-xs text-zinc-400 mt-1 pl-7">
                    {option.description}
                  </div>
                </div>

                <div className="shrink-0 text-xs font-mono text-zinc-500 group-hover:text-amber-400 pl-7 sm:pl-0">
                  Select Stage →
                </div>
              </button>
            ))}
          </div>

          {currentStep > 0 && (
            <div className="mt-8 pt-6 border-t border-zinc-900 flex justify-start">
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
              >
                ← Back to previous question
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results View */
        <div className="bg-zinc-950 border border-amber-500/30 rounded-2xl p-6 sm:p-10 shadow-2xl relative">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-amber-400 font-mono text-xs uppercase tracking-widest mb-3">
              Diagnostic Complete
            </span>
            <h3 className="serif-heading text-3xl sm:text-4xl font-bold text-zinc-100 mb-4">
              Your Sovereign Operating Score
            </h3>

            {/* Score Ring / Badge */}
            <div className="inline-flex flex-col items-center justify-center w-36 h-36 rounded-full bg-gradient-to-b from-zinc-900 to-zinc-950 border-2 border-amber-500/40 my-4 shadow-xl shadow-amber-500/10">
              <span className="serif-heading text-5xl font-bold text-zinc-100">
                {percentage}%
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">
                Sovereignty Index
              </span>
            </div>

            <div className={`text-xl font-bold font-serif ${scoreTier.color} mt-4`}>
              {scoreTier.title}
            </div>
            <p className="text-sm text-zinc-400 mt-2 font-light leading-relaxed">
              {scoreTier.description}
            </p>
          </div>

          {/* Breakdown by Domain */}
          <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800 mb-8 space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400">
              Dimensional Friction Analysis
            </h4>

            {QUESTIONS.map((q) => {
              const score = answers[q.id] || 0;
              const selectedOpt = q.options.find(o => o.score === score);
              return (
                <div key={q.id} className="pt-3 border-t border-zinc-850 first:pt-0 first:border-0">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold text-zinc-300">{q.title}</span>
                    <span className="font-mono text-amber-400">{score} / 25 pts</span>
                  </div>
                  <p className="text-xs text-zinc-400 italic">
                    Diagnosis: {selectedOpt?.godinDiagnosis}
                  </p>
                </div>
              );
            })}
          </div>

          {/* The Prescription */}
          <div className="p-6 rounded-xl bg-amber-500/5 border border-amber-500/20 mb-8">
            <h4 className="text-xs font-mono uppercase tracking-wider text-amber-300 flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-amber-400" />
              The TULC Sovereign Prescription
            </h4>
            <p className="text-sm text-zinc-200 font-light leading-relaxed">
              {scoreTier.prescription}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onOpenCalibration}
              className="w-full sm:w-auto px-8 py-4 rounded-sm bg-gradient-to-r from-amber-400 to-amber-500 text-zinc-950 font-semibold text-xs tracking-wider uppercase hover:from-amber-300 hover:to-amber-400 transition-all duration-200 shadow-lg shadow-amber-500/10 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Schedule 48-Hour Diagnostic Debrief</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={handleReset}
              className="w-full sm:w-auto px-6 py-4 rounded-sm bg-zinc-900 hover:bg-zinc-850 text-zinc-400 hover:text-zinc-200 text-xs font-mono flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Diagnostic</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
