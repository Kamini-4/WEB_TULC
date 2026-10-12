import React, { useState } from 'react';
import { 
  Activity, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  RotateCcw,
  TrendingDown,
  Building2,
  DollarSign
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface Question {
  id: string;
  domain: string;
  question: string;
  subtext: string;
  options: {
    label: string;
    description: string;
    penaltyDays: number;
    ebitdaImpactPercent: number;
  }[];
}

const ASSESSMENT_QUESTIONS: Question[] = [
  {
    id: 'decision_velocity',
    domain: 'Decision Latency',
    question: 'How long does a major strategic or capital expenditure approval take in your company?',
    subtext: 'Measures executive friction from proposal submission to green light.',
    options: [
      {
        label: 'Under 24 Hours',
        description: 'Decentralized decision thresholds; automated edge authority.',
        penaltyDays: 1,
        ebitdaImpactPercent: 0,
      },
      {
        label: '3 to 7 Days',
        description: 'Standard multi-step approval with weekly executive sync review.',
        penaltyDays: 5,
        ebitdaImpactPercent: 3.5,
      },
      {
        label: '2 to 4 Weeks',
        description: 'Requires committee debate, revised decks, and alignment syncs.',
        penaltyDays: 18,
        ebitdaImpactPercent: 8.5,
      },
      {
        label: 'Over 1 Month',
        description: 'Chronic hesitation, back-and-forth second guessing, and stalling.',
        penaltyDays: 35,
        ebitdaImpactPercent: 14.0,
      },
    ],
  },
  {
    id: 'founder_exception_handling',
    domain: 'Founder Dependency',
    question: 'What happens to operations when the CEO or founder is unavailable for 2 weeks?',
    subtext: 'Assesses single-person key-risk and operational coupling.',
    options: [
      {
        label: 'Zero Interruption',
        description: 'Systems and codified rules govern operations autonomously.',
        penaltyDays: 0,
        ebitdaImpactPercent: 0,
      },
      {
        label: 'Minor Delays in Outliers',
        description: 'Frontline moves forward; non-standard contracts await sign-off.',
        penaltyDays: 4,
        ebitdaImpactPercent: 2.0,
      },
      {
        label: 'Multiple Decisions Frozen',
        description: 'Executives park difficult decisions in inbox waiting for return.',
        penaltyDays: 14,
        ebitdaImpactPercent: 7.0,
      },
      {
        label: 'Complete Bottleneck & Anxiety',
        description: 'Teams freeze, clients stall, and executive progress halts.',
        penaltyDays: 28,
        ebitdaImpactPercent: 12.5,
      },
    ],
  },
  {
    id: 'meeting_density',
    domain: 'Meeting Density',
    question: 'What percentage of your executive team\'s calendar is spent in internal alignment meetings?',
    subtext: 'Evaluates coordination drag vs. high-alpha market execution.',
    options: [
      {
        label: 'Under 15%',
        description: 'Asynchronous dashboards and written 1-page decision memos.',
        penaltyDays: 0,
        ebitdaImpactPercent: 0,
      },
      {
        label: '15% to 35%',
        description: 'Weekly syncs plus standard cross-functional checkpoints.',
        penaltyDays: 4,
        ebitdaImpactPercent: 3.0,
      },
      {
        label: '35% to 60%',
        description: 'Back-to-back calendar bloat, leaving zero deep-work blocks.',
        penaltyDays: 12,
        ebitdaImpactPercent: 7.5,
      },
      {
        label: 'Over 60%',
        description: 'Entire days spent talking about work instead of executing work.',
        penaltyDays: 22,
        ebitdaImpactPercent: 13.0,
      },
    ],
  },
  {
    id: 'strategy_signal_decay',
    domain: 'Execution Signal Fidelity',
    question: 'How accurately do frontline teams execute board and founder strategic mandates?',
    subtext: 'Checks signal dilution as instructions travel across management tiers.',
    options: [
      {
        label: '95%+ Fidelity',
        description: 'Hard-coded binary checklists and explicit invariant guardrails.',
        penaltyDays: 1,
        ebitdaImpactPercent: 0,
      },
      {
        label: '75% to 90% Fidelity',
        description: 'General alignment with occasional strategic drift or rework.',
        penaltyDays: 6,
        ebitdaImpactPercent: 3.5,
      },
      {
        label: '50% to 75% Fidelity',
        description: 'Departments build competing priorities; 50% signal decay.',
        penaltyDays: 15,
        ebitdaImpactPercent: 8.0,
      },
      {
        label: 'Under 50% Fidelity',
        description: 'Strategy decks collect dust; frontlines operate on guesswork.',
        penaltyDays: 30,
        ebitdaImpactPercent: 15.0,
      },
    ],
  },
];

export const AssessmentPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [annualRevenue, setAnnualRevenue] = useState<number>(10000000);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const handleSelectOption = (optionIndex: number) => {
    const nextAnswers = [...answers, optionIndex];
    setAnswers(nextAnswers);

    if (currentStep + 1 < ASSESSMENT_QUESTIONS.length) {
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

  // Calculation logic
  const totalPenaltyDays = answers.reduce((acc, optIdx, qIdx) => {
    return acc + ASSESSMENT_QUESTIONS[qIdx].options[optIdx].penaltyDays;
  }, 0);

  const totalEbitdaLossPercent = answers.reduce((acc, optIdx, qIdx) => {
    return acc + ASSESSMENT_QUESTIONS[qIdx].options[optIdx].ebitdaImpactPercent;
  }, 0);

  const estimatedAnnualEbitdaBleed = (annualRevenue * totalEbitdaLossPercent) / 100;

  return (
    <div className="min-h-screen bg-[#f7f4ee] text-[#1c1917] py-10 sm:py-12 px-4 sm:px-6 lg:px-8 font-serif">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-tight text-[#8c6708] font-bold">
            <Activity className="w-4 h-4 text-[#8c6708]" />
            <span>TULC Operational Telemetry</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1c1917] tracking-tight font-serif">
            The Inaction Tax Diagnostic
          </h1>

          <p className="text-sm sm:text-base text-[#57534e] font-serif max-w-xl mx-auto leading-relaxed">
            Quantify the precise dollar drag and executive latency bleeding your company's operating margin.
          </p>
        </div>

        {!isCompleted ? (
          /* Questionnaire Active State */
          <div className="bg-[#ffffff] border border-[#ded6c5] rounded-xs p-5 sm:p-8 shadow-xs space-y-6">
            
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-[#78716c] font-serif">
                <span>Domain {currentStep + 1} of {ASSESSMENT_QUESTIONS.length}: {ASSESSMENT_QUESTIONS[currentStep].domain}</span>
                <span className="font-bold text-[#8c6708]">{Math.round(((currentStep + 1) / ASSESSMENT_QUESTIONS.length) * 100)}% Complete</span>
              </div>
              <div className="w-full bg-[#efebe2] h-2 rounded-xs overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-[#b8860b] to-[#8c6708] h-full transition-all duration-300" 
                  style={{ width: `${((currentStep + 1) / ASSESSMENT_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question Details */}
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1c1917] font-serif">
                {ASSESSMENT_QUESTIONS[currentStep].question}
              </h2>
              <p className="text-xs sm:text-sm text-[#57534e] font-serif">
                {ASSESSMENT_QUESTIONS[currentStep].subtext}
              </p>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-1 gap-3.5">
              {ASSESSMENT_QUESTIONS[currentStep].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  className="w-full text-left p-5 bg-[#faf8f5] hover:bg-[#efebe2] border border-[#ded6c5] hover:border-[#b8860b] rounded-xs transition-all group flex items-start justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8c6708]"
                >
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-[#1c1917] group-hover:text-[#8c6708] transition-colors font-serif">
                      {option.label}
                    </div>
                    <div className="text-xs text-[#57534e] leading-relaxed font-serif">
                      {option.description}
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full border border-[#ded6c5] group-hover:border-[#8c6708] flex items-center justify-center text-[#8c6708] shrink-0 mt-0.5">
                    <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </button>
              ))}
            </div>

          </div>
        ) : (
          /* Completed Telemetry Results State */
          <div className="bg-[#ffffff] border border-[#b8860b]/40 rounded-xs p-6 sm:p-10 shadow-xs space-y-10 animate-in fade-in duration-300">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#e2dcce] gap-4">
              <div>
                <span className="text-xs text-[#8c6708] font-bold uppercase tracking-wider font-serif">Telemetry Diagnostic Completed</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#1c1917] mt-1 font-serif">
                  Executive Friction Assessment Ledger
                </h2>
              </div>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#efebe2] hover:bg-[#e4ded0] text-xs font-serif text-[#57534e] hover:text-[#1c1917] rounded-xs transition-colors self-start sm:self-auto cursor-pointer border border-[#ded6c5]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Diagnostic</span>
              </button>
            </div>

            {/* Revenue Slider Input */}
            <div className="p-6 bg-[#faf8f5] border border-[#ded6c5] rounded-xs space-y-3 font-serif">
              <div className="flex items-center justify-between text-xs font-serif">
                <span className="text-[#57534e] uppercase font-bold">Adjust Annual Enterprise Revenue Baseline:</span>
                <span className="text-[#8c6708] font-bold text-sm sm:text-base">
                  ${(annualRevenue / 1000000).toFixed(1)}M USD
                </span>
              </div>
              <input
                type="range"
                min={1000000}
                max={100000000}
                step={1000000}
                value={annualRevenue}
                onChange={(e) => setAnnualRevenue(Number(e.target.value))}
                className="w-full accent-[#b8860b] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#78716c] font-serif">
                <span>$1M (Emerging Scale-Up)</span>
                <span>$50M (Mid-Market)</span>
                <span>$100M+ (Institutional Enterprise)</span>
              </div>
            </div>

            {/* Critical Financial Drag Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 bg-[#faf8f5] border border-[#ded6c5] rounded-xs space-y-2">
                <div className="flex items-center gap-2 text-xs text-[#8c6708] font-bold uppercase font-serif">
                  <TrendingDown className="w-4 h-4 text-rose-700" />
                  <span>Annual EBITDA Drag</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-serif text-rose-800">
                  ${(estimatedAnnualEbitdaBleed / 1000).toLocaleString(undefined, { maximumFractionDigits: 0 })}k
                </div>
                <div className="text-[11px] text-[#57534e] leading-normal font-serif">
                  Silent profit lost to executive coordination friction ({totalEbitdaLossPercent.toFixed(1)}% of revenue).
                </div>
              </div>

              <div className="p-5 bg-[#faf8f5] border border-[#ded6c5] rounded-xs space-y-2">
                <div className="flex items-center gap-2 text-xs text-[#8c6708] font-bold uppercase font-serif">
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  <span>Accumulated Decision Delay</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-serif text-amber-800">
                  {totalPenaltyDays} Days
                </div>
                <div className="text-[11px] text-[#57534e] leading-normal font-serif">
                  Average calendar lag suffered per strategic initiative across tiers.
                </div>
              </div>

              <div className="p-5 bg-[#faf8f5] border border-[#ded6c5] rounded-xs space-y-2">
                <div className="flex items-center gap-2 text-xs text-[#8c6708] font-bold uppercase font-serif">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Reclaimable Capacity</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold font-serif text-emerald-800">
                  15 - 20 Hrs/Wk
                </div>
                <div className="text-[11px] text-[#57534e] leading-normal font-serif">
                  High-alpha strategic bandwidth recoverable through TULC substrates.
                </div>
              </div>
            </div>

            {/* Strategic Prescription & CTA */}
            <div className="p-6 bg-gradient-to-br from-[#ffffff] via-[#faf8f5] to-[#efebe2] border border-[#b8860b]/40 rounded-xs space-y-4 shadow-2xs font-serif">
              <h3 className="text-lg font-bold text-[#1c1917] font-serif">
                Principal Advisory Prescription
              </h3>
              <p className="text-sm text-[#57534e] font-serif leading-relaxed">
                Your diagnostic confirms that internal latency is not a personnel capability problem—it is an uncalibrated operating system defect. Installing sovereign decision thresholds and binary invariant rules can recover up to 85% of this leaking EBITDA.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/intake"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#b8860b] to-[#8c6708] hover:from-[#c99518] hover:to-[#9e7610] text-white font-bold text-xs uppercase tracking-wider rounded-xs transition-colors shadow-sm"
                >
                  <span>Submit Diagnostic to Sovereign Desk</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#ffffff] hover:bg-[#efebe2] text-[#1c1917] font-semibold text-xs uppercase tracking-wider rounded-xs border border-[#ded6c5] transition-colors"
                >
                  <span>Explore Advisory Tracks</span>
                </Link>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
