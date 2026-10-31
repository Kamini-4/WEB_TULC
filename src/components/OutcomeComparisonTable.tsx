import React, { useState } from 'react';
import { 
  Check, 
  X, 
  Zap, 
  ArrowRight, 
  Clock, 
  TrendingUp, 
  ShieldCheck, 
  FileText, 
  Layers, 
  Award,
  Sparkles,
  ChevronRight,
  SlidersHorizontal
} from 'lucide-react';

interface OutcomeComparisonProps {
  onOpenConsultation?: () => void;
  onTakeTest?: () => void;
}

interface ComparisonDimension {
  id: string;
  category: 'freedom' | 'roi' | 'governance' | 'all';
  dimension: string;
  categoryLabel: string;
  theOtherWay: {
    title: string;
    description: string;
    result: string;
  };
  theTulcWay: {
    title: string;
    description: string;
    result: string;
    badge?: string;
  };
}

const COMPARISON_DATA: ComparisonDimension[] = [
  {
    id: 'ultimate-outcome',
    category: 'freedom',
    categoryLabel: 'Founder Freedom & Time',
    dimension: 'Primary Deliverable & Ultimate Outcome',
    theOtherWay: {
      title: 'A 200-Slide Slide Deck & Endless Recommendations',
      description: 'You receive theoretical analysis and PowerPoint decks. The implementation burden falls squarely back on your shoulders while your operational calendar remains choked.',
      result: 'You remain trapped in the daily firefights.'
    },
    theTulcWay: {
      title: 'Structural Founder Decoupling in 90 Days',
      description: 'We install permanent, autonomous operating infrastructure. Your executive leadership team resolves bottlenecks, makes critical decisions, and runs operations without your daily presence.',
      result: 'Reclaim 20+ executive hours every single week.',
      badge: 'Guaranteed Decoupling'
    }
  },
  {
    id: 'calendar-footprint',
    category: 'freedom',
    categoryLabel: 'Founder Freedom & Time',
    dimension: 'Your Day-to-Day Operational Footprint',
    theOtherWay: {
      title: 'More Meetings, Homework & Steering Committees',
      description: 'Consultants schedule weekly check-ins, status reviews, and action items that consume another 6–10 hours of executive time just to manage the consultants.',
      result: 'Your calendar gets heavier, not lighter.'
    },
    theTulcWay: {
      title: 'Dismantles 70% of Consensus Meetings',
      description: 'We replace multi-person alignment committees with 14-day asynchronous decision loops and codified decision boundaries that run smoothly in your absence.',
      result: 'Zero operational bottlenecking at your desk.'
    }
  },
  {
    id: 'roi-valuation',
    category: 'roi',
    categoryLabel: 'Financial ROI & Valuation',
    dimension: 'Enterprise Valuation & Key-Person Multiple',
    theOtherWay: {
      title: 'Zero Impact on Key-Person Valuation Discount',
      description: 'Advisory decks do not change buyer perception. Private equity and acquirers still identify the founder as the sole single point of failure and heavily discount valuation.',
      result: 'Your enterprise value remains tied to your personal presence.'
    },
    theTulcWay: {
      title: '30%–100%+ Valuation Multiple Expansion',
      description: 'By proving the business operates with institutional predictability and zero founder dependency, you eliminate the key-man discount and unlock institutional-grade enterprise value.',
      result: 'Millions in latent enterprise value unlocked.'
    }
  },
  {
    id: 'measurement-accountability',
    category: 'roi',
    categoryLabel: 'Financial ROI & Valuation',
    dimension: 'Financial Accountability & Impact Tracking',
    theOtherWay: {
      title: 'Subjective Surveys & Abstract Culture Scores',
      description: 'They measure success through employee satisfaction questionnaires, smiley-face ratings, and personality indexes that offer zero correlation to EBITDA.',
      result: 'No quantifiable dollar return on capital.'
    },
    theTulcWay: {
      title: 'Quantified EBITDA Recovery & Latency Costing',
      description: 'Our proprietary formula audits the exact monetary leakage in your cadence, calculating friction vectors down to the dollar and measuring speed of strategic execution.',
      result: 'Hard, balance-sheet-verifiable capital recovery.'
    }
  },
  {
    id: 'intellectual-property',
    category: 'governance',
    categoryLabel: 'Governance & Systems',
    dimension: 'Intellectual Property & Perpetuity',
    theOtherWay: {
      title: 'Proprietary Black Box & Perpetual Dependency',
      description: 'Consultants keep their core methodologies locked. Every time your company encounters new scale or friction, you must hire them again on an ongoing retainer.',
      result: 'Perpetual reliance on external advisors.'
    },
    theTulcWay: {
      title: '100% Codified IP Handover to Your Board',
      description: 'You receive the entire Sovereign Leadership Operating System (LOS™)—fully documented, customized, and transferred to your organization to own forever.',
      result: 'An enduring asset that compounds for decades.'
    }
  },
  {
    id: 'diagnostic-rigor',
    category: 'governance',
    categoryLabel: 'Governance & Systems',
    dimension: 'Diagnostic Depth & Institutional Rigor',
    theOtherWay: {
      title: 'Off-the-Shelf HR Surveys & Myers-Briggs Quizzes',
      description: 'Generic templates borrowed from mid-market corporate HR that tell you what you already know: people are tired, communication is slow, and priorities overlap.',
      result: 'Surface-level diagnoses that treat symptoms only.'
    },
    theTulcWay: {
      title: 'Patent-Pending L.O.S.-P721 Forensic Architecture',
      description: 'A mathematical, 5-domain diagnostic (Cognitive Clarity, Systemic Integrity, Strategic Velocity, Moral Gravity, Cultural Fidelity) isolating root structural vectors.',
      result: 'Surgical clarity into the real institutional friction.',
      badge: 'Patent Pending'
    }
  },
  {
    id: 'engagement-timeline',
    category: 'freedom',
    categoryLabel: 'Founder Freedom & Time',
    dimension: 'Speed to Results & Runway Commitment',
    theOtherWay: {
      title: 'Indefinite 12 to 24-Month Billable Engagements',
      description: 'Open-ended engagements designed to maximize consultant billing hours, with junior associates rotated through your account to perform billable research.',
      result: 'Exhausting timeline with shifting goalposts.'
    },
    theTulcWay: {
      title: 'Decisive 90-Day Sovereign Sprint',
      description: 'A rapid, disciplined, uncompromising 90-day runway led directly by Suchita Sancheti. Zero junior staffing. Clear milestones, definitive completion, and permanent exit.',
      result: 'Clean, irreversible autonomy within 90 days.'
    }
  },
  {
    id: 'confidentiality-prestige',
    category: 'governance',
    categoryLabel: 'Governance & Systems',
    dimension: 'Discretion & Executive Caliber',
    theOtherWay: {
      title: 'Standard Corporate NDA & Junior Associate Staffing',
      description: 'Your sensitive board discussions and internal leadership tensions are analyzed by 26-year-old associates and stored on shared consultancy servers.',
      result: 'Generic treatment without true board-level discretion.'
    },
    theTulcWay: {
      title: 'In-Camera Privilege & Chatham House Protocol',
      description: 'Strict, legally fortified in-camera privilege. Closed-door executive conclave sessions. You work exclusively with Suchita Sancheti and seasoned senior principals.',
      result: 'Absolute board-grade privacy and gravitas.'
    }
  }
];

export const OutcomeComparisonTable: React.FC<OutcomeComparisonProps> = ({
  onOpenConsultation,
  onTakeTest
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'freedom' | 'roi' | 'governance'>('all');

  const filteredData = activeFilter === 'all' 
    ? COMPARISON_DATA 
    : COMPARISON_DATA.filter(item => item.category === activeFilter);

  return (
    <section 
      id="comparison" 
      aria-labelledby="comparison-heading"
      className="py-16 sm:py-24 bg-[#f8f6f0] border-t border-[#dfd7c8] scroll-mt-20"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Zone — Centre-Oriented & Focused on What the Reader Wants to Hear */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#ede5d6] border border-[#d8cebe] rounded-xs mb-4 shadow-2xs">
            <Sparkles className="w-4 h-4 text-[#9d7b38]" />
            <span className="text-[11px] font-mono tracking-[0.2em] uppercase font-bold text-[#685327]">
              The Transformation Ledger
            </span>
          </div>

          <h2 
            id="comparison-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#17181c] font-serif leading-[1.15] mb-5"
          >
            What You Actually <span className="italic text-[#9d7b38]">Walk Away With.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#484b54] font-serif leading-relaxed font-normal">
            You don’t hire us for advice, motivational speeches, or billable hours. You hire us to permanently buy back your executive freedom and engineer an operating architecture that scales without you.
          </p>

          {/* Quick Value Proof Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-[#e2d9ca]">
            <div className="p-3 sm:p-4 bg-[#f3ede1] border border-[#dcd3c2] rounded-xs text-center">
              <span className="block text-2xl sm:text-3xl font-bold text-[#17181c] font-mono tracking-tight">
                90 Days
              </span>
              <span className="text-[11px] sm:text-xs font-mono text-[#685327] uppercase tracking-wider font-semibold">
                To Full Decoupling
              </span>
            </div>

            <div className="p-3 sm:p-4 bg-[#f3ede1] border border-[#dcd3c2] rounded-xs text-center">
              <span className="block text-2xl sm:text-3xl font-bold text-[#9d7b38] font-mono tracking-tight">
                20+ Hrs
              </span>
              <span className="text-[11px] sm:text-xs font-mono text-[#685327] uppercase tracking-wider font-semibold">
                Reclaimed Weekly
              </span>
            </div>

            <div className="p-3 sm:p-4 bg-[#f3ede1] border border-[#dcd3c2] rounded-xs text-center">
              <span className="block text-2xl sm:text-3xl font-bold text-[#17181c] font-mono tracking-tight">
                100% IP
              </span>
              <span className="text-[11px] sm:text-xs font-mono text-[#685327] uppercase tracking-wider font-semibold">
                Transferred to You
              </span>
            </div>

            <div className="p-3 sm:p-4 bg-[#f3ede1] border border-[#dcd3c2] rounded-xs text-center">
              <span className="block text-2xl sm:text-3xl font-bold text-[#9d7b38] font-mono tracking-tight">
                $0
              </span>
              <span className="text-[11px] sm:text-xs font-mono text-[#685327] uppercase tracking-wider font-semibold">
                Key-Man Discount
              </span>
            </div>
          </div>
        </div>

        {/* Filter Tabs Zone */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider font-semibold rounded-xs transition-all cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-[#17181c] text-[#f8f6f0] shadow-sm'
                : 'bg-[#ede5d6] text-[#484b54] hover:bg-[#e4dcce]'
            }`}
          >
            All Outcomes ({COMPARISON_DATA.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('freedom')}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider font-semibold rounded-xs transition-all cursor-pointer ${
              activeFilter === 'freedom'
                ? 'bg-[#17181c] text-[#f8f6f0] shadow-sm'
                : 'bg-[#ede5d6] text-[#484b54] hover:bg-[#e4dcce]'
            }`}
          >
            Executive Freedom & Time (3)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('roi')}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider font-semibold rounded-xs transition-all cursor-pointer ${
              activeFilter === 'roi'
                ? 'bg-[#17181c] text-[#f8f6f0] shadow-sm'
                : 'bg-[#ede5d6] text-[#484b54] hover:bg-[#e4dcce]'
            }`}
          >
            Valuation & Financial ROI (2)
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('governance')}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider font-semibold rounded-xs transition-all cursor-pointer ${
              activeFilter === 'governance'
                ? 'bg-[#17181c] text-[#f8f6f0] shadow-sm'
                : 'bg-[#ede5d6] text-[#484b54] hover:bg-[#e4dcce]'
            }`}
          >
            Governance & Permanence (3)
          </button>
        </div>

        {/* Desktop & Tablet Side-by-Side Comparison Matrix */}
        <div className="hidden lg:block border border-[#d8cebe] rounded-sm bg-[#faf7f0] shadow-md overflow-hidden">
          
          {/* Header Row */}
          <div className="grid grid-cols-12 border-b border-[#d8cebe] bg-[#f0eade]">
            <div className="col-span-4 p-5 flex items-center">
              <span className="font-mono text-xs uppercase tracking-widest text-[#685327] font-bold">
                Strategic Dimension & Need
              </span>
            </div>

            <div className="col-span-4 p-5 bg-[#e8e2d4] border-x border-[#d8cebe] flex items-center gap-2.5">
              <div className="w-5 h-5 rounded-full bg-red-100 border border-red-300 flex items-center justify-center text-red-600 shrink-0">
                <X className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="font-serif font-bold text-sm text-[#3a3c42] block">
                  Other Advisory Firms & Coaches
                </span>
                <span className="font-mono text-[10px] text-[#71747d] uppercase tracking-wider block">
                  Big-4 · Management Consulting · Agencies
                </span>
              </div>
            </div>

            <div className="col-span-4 p-5 bg-[#17181c] text-[#f8f6f0] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[#d4af37] shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="font-serif font-bold text-sm text-white block">
                    The Unbounded Leadership Co.
                  </span>
                  <span className="font-mono text-[10px] text-[#d4af37] uppercase tracking-widest font-semibold block">
                    Sovereign Enterprise Architecture
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-mono uppercase bg-[#d4af37]/20 border border-[#d4af37]/50 text-[#d4af37] px-2 py-0.5 rounded-xs font-bold">
                The Outcome
              </span>
            </div>
          </div>

          {/* Data Rows */}
          <div className="divide-y divide-[#dfd7c8]">
            {filteredData.map((row, idx) => (
              <div 
                key={row.id}
                className={`grid grid-cols-12 transition-colors ${
                  idx % 2 === 0 ? 'bg-[#faf7f0]' : 'bg-[#f4efe4]'
                }`}
              >
                {/* Dimension Column */}
                <div className="col-span-4 p-6 flex flex-col justify-center">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#9d7b38] font-bold mb-1">
                    {row.categoryLabel}
                  </span>
                  <h3 className="font-serif text-base font-bold text-[#17181c] leading-snug">
                    {row.dimension}
                  </h3>
                </div>

                {/* Other Organizations Column */}
                <div className="col-span-4 p-6 bg-[#f0e9dc]/60 border-x border-[#dfd7c8] flex flex-col justify-between">
                  <div>
                    <div className="flex items-start gap-2 mb-2">
                      <X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <h4 className="font-serif text-sm font-semibold text-[#3b3d44] leading-snug">
                        {row.theOtherWay.title}
                      </h4>
                    </div>
                    <p className="text-xs text-[#5f636d] leading-relaxed pl-6">
                      {row.theOtherWay.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#dfd7c8] pl-6">
                    <span className="text-[11px] font-mono text-[#7a4242] font-medium block">
                      Pain Point: {row.theOtherWay.result}
                    </span>
                  </div>
                </div>

                {/* The Unbounded Leadership Co. Column — Deep Black & Golden Text */}
                <div className="col-span-4 p-6 bg-[#000000] text-[#f4ecd8] border-l-2 border-r-2 border-[#d4af37] flex flex-col justify-between relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#d4af37]/10 blur-2xl pointer-events-none" />
                  
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                        <h4 className="font-serif text-sm font-bold text-[#f3e5ab] leading-snug">
                          {row.theTulcWay.title}
                        </h4>
                      </div>
                      {row.theTulcWay.badge && (
                        <span className="text-[9px] font-mono uppercase bg-[#141520] border border-[#d4af37] text-[#f3e5ab] px-2 py-0.5 rounded-xs shrink-0 font-bold shadow-xs">
                          {row.theTulcWay.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#ded8cb] leading-relaxed pl-6 font-normal">
                      {row.theTulcWay.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#d4af37]/40 pl-6 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#f3e5ab] font-bold block">
                      Outcome: {row.theTulcWay.result}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Mobile & Small Screen Interactive Cards */}
        <div className="lg:hidden space-y-6">
          {filteredData.map((row) => (
            <div 
              key={row.id}
              className="bg-[#faf7f0] border border-[#d8cebe] rounded-sm overflow-hidden shadow-sm"
            >
              {/* Card Header */}
              <div className="p-4 bg-[#f0eade] border-b border-[#dfd7c8]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#9d7b38] font-bold block mb-1">
                  {row.categoryLabel}
                </span>
                <h3 className="font-serif text-base font-bold text-[#17181c]">
                  {row.dimension}
                </h3>
              </div>

              {/* Other Way */}
              <div className="p-4 bg-[#f7f2e9] border-b border-[#dfd7c8]">
                <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-wider text-red-700 font-bold">
                  <X className="w-4 h-4 text-red-600 shrink-0" />
                  <span>Other Advisory Firms</span>
                </div>
                <h4 className="font-serif text-sm font-semibold text-[#27292f] mb-1.5">
                  {row.theOtherWay.title}
                </h4>
                <p className="text-xs text-[#525660] leading-relaxed mb-3">
                  {row.theOtherWay.description}
                </p>
                <div className="text-[11px] font-mono text-[#8a3838] bg-red-50/50 p-2 rounded-xs border border-red-200/60 font-medium">
                  {row.theOtherWay.result}
                </div>
              </div>

              {/* TULC Sovereign Way — Black Background & Golden Text */}
              <div className="p-5 bg-[#000000] border-2 border-[#d4af37] text-[#f4ecd8] relative shadow-lg">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#d4af37] font-bold">
                    <Check className="w-4 h-4 text-[#d4af37] shrink-0" />
                    <span className="text-[#f3e5ab]">The Unbounded Leadership Co.</span>
                  </div>
                  {row.theTulcWay.badge && (
                    <span className="text-[9px] font-mono uppercase bg-[#141520] border border-[#d4af37] text-[#f3e5ab] px-2 py-0.5 rounded-xs font-bold shadow-xs">
                      {row.theTulcWay.badge}
                    </span>
                  )}
                </div>

                <h4 className="font-serif text-base font-bold text-[#f3e5ab] mb-2">
                  {row.theTulcWay.title}
                </h4>

                <p className="text-xs text-[#ded8cb] leading-relaxed mb-4">
                  {row.theTulcWay.description}
                </p>

                <div className="text-xs font-mono text-[#f3e5ab] bg-[#12131b] p-2.5 rounded-xs border border-[#d4af37]/60 font-bold flex items-center justify-between">
                  <span>{row.theTulcWay.result}</span>
                  <Check className="w-3.5 h-3.5 text-[#d4af37]" />
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Synthesis & Call to Action Zone — Black Background & Golden Text */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-10 rounded-sm bg-[#08090d] border-2 border-[#d4af37] text-[#f4ecd8] shadow-2xl relative overflow-hidden text-center max-w-4xl mx-auto">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#d4af37]/15 blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#d4af37] font-bold block mb-2">
              The Sovereign Verdict
            </span>

            <h3 className="text-2xl sm:text-3xl font-bold font-serif mb-4 text-[#f3e5ab]">
              Stop Paying For Advice. Invest In <span className="italic text-[#d4af37]">Permanent Machinery.</span>
            </h3>

            <p className="text-sm sm:text-base text-[#ded8cb] font-serif leading-relaxed mb-8">
              Every day your enterprise depends on your personal intervention is a day your strategic valuation sits discounted. In 60 seconds, calculate the exact friction vector in your leadership operating system.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={onTakeTest}
                className="w-full sm:w-auto px-7 py-3.5 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider bg-gradient-to-r from-[#d4af37] via-[#f5e6b3] to-[#d4af37] hover:brightness-110 text-[#0c0d12] rounded-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <Zap className="w-4 h-4 text-[#0c0d12]" />
                <span>Take 60-Sec Friction Audit (Free)</span>
              </button>

              <button
                type="button"
                onClick={onOpenConsultation}
                className="w-full sm:w-auto px-7 py-3.5 text-xs sm:text-sm font-mono font-bold uppercase tracking-wider bg-[#141520] hover:bg-[#1d1f2d] text-[#f3e5ab] border border-[#d4af37]/70 hover:border-[#d4af37] rounded-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
              >
                <span>Initiate Confidential Inquiry</span>
                <ArrowRight className="w-4 h-4 text-[#d4af37]" />
              </button>
            </div>

            <p className="mt-4 text-[11px] font-mono text-[#a1a1aa]">
              Strict Chatham House Rules · In-Camera Executive Privilege Enforced
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
