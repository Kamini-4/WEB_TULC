import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle, 
  ShieldCheck, 
  Sparkles, 
  Lock, 
  Zap,
  TrendingUp,
  Crown,
  ChevronRight
} from 'lucide-react';
import FAQ from '../../components/FAQ.tsx';

interface ServiceCategory {
  id: string;
  badge: string;
  tier: string;
  categoryName: string;
  name: string;
  hook: string;
  outcomeMetric: string;
  idealFor: string;
  commitment: string;
  investmentTier: string;
  investmentNote: string;
  coreHighlights: string[];
  psychologicalAnchor: string;
  ctaText: string;
  isRecommended?: boolean;
}

const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'diagnostic',
    badge: 'Phase 0.0 • Diagnostic Entry',
    tier: 'Category 01',
    categoryName: 'Diagnostic & Forensic Architecture',
    name: '10-Node Triangulation Audit',
    hook: 'Mathematically isolate your 2.0-point translation gap and decision leaks in under 48 hours.',
    outcomeMetric: '48-Hour Forensic Blueprint',
    idealFor: 'Founders & CEOs demanding empirical proof and zero operational disruption before a full rollout.',
    commitment: 'Asynchronous 10-node cross-section (No operational drag)',
    investmentTier: 'Upon Request',
    investmentNote: '100% credited toward full institutional engagement',
    coreHighlights: [
      'Simultaneous 10-node telemetry across Apex, C-Suite, Legal & Edge',
      'Confidential Sovereign Board Dossier & Decision Leak Map',
      'Pinpoint the exact 3 unsealed execution protocols draining executive energy',
      'Private 60-Minute Adversarial & Readout Briefing with Suchita Sancheti'
    ],
    psychologicalAnchor: 'Low-friction entry that eliminates risk with a 100% fee credit applied to ongoing architecture.',
    ctaText: 'Run 10-Node Diagnostic'
  },
  {
    id: 'transformation',
    badge: 'Phases 01–03 • Core Installation',
    tier: 'Category 02',
    categoryName: 'Enterprise Execution Protocol Transformation',
    name: '90-Day Sovereign Transformation',
    hook: 'Hard-code your decision logic into 12 self-regulating operational gates to guarantee 100% execution fidelity.',
    outcomeMetric: '40% Bandwidth Reclaimed in 90 Days',
    idealFor: 'Enterprises ($10M–$250M+ ARR) suffering from coordination bloat and constant CEO bottlenecking.',
    commitment: '90-Day Comprehensive Installation',
    investmentTier: 'Upon Request',
    investmentNote: 'Permanent operational infrastructure setup',
    coreHighlights: [
      'Install 12 custom invariant execution protocols to automate routine trade-offs',
      'Eradicate recurring alignment meetings and middle-management friction',
      'Reclaim up to 40% of executive strategic bandwidth in 90 days',
      'Pass the 30-Day Step-Away Test with zero operational degradation',
      'Institutionalize key-person insulation to maximize EBITDA exit multiples'
    ],
    psychologicalAnchor: 'A structural overhaul that turns heroic founder intervention into permanent, self-executing systems.',
    ctaText: 'Apply for 90-Day Transformation'
  },
  {
    id: 'retainer',
    badge: '★ Board Recommended • Highest Institutional Yield',
    tier: 'Category 03',
    categoryName: 'Sovereign Governance & Board Oversight',
    name: 'The Sovereign Retainer & Board Seat',
    hook: 'Permanent executive insulation, real-time drift prevention, and compounding valuation protection.',
    outcomeMetric: 'Continuous 100% Fidelity & Alpha',
    idealFor: 'Enterprise Conglomerates, High-Growth Scale-Ups, and Family Offices / Board Chairs who refuse to let operational drag dilute enterprise valuation.',
    commitment: 'Quarterly Audits • Dedicated Priority Hotline • Board Integration',
    investmentTier: 'Annual Retainer',
    investmentNote: 'Guaranteed highest ROI — continuous executive insulation and strategic arbitrage',
    coreHighlights: [
      'Bi-annual operating substrate audits to catch cultural & execution drift before it costs millions',
      'Immediate, prioritized advisory access to Suchita Sancheti for high-stakes capital & M&A bets',
      'Continuous early-warning telemetry detecting leadership fatigue and succession risks',
      'Complete insulation from low-level operational noise, preserving 15+ hours/week permanently',
      'Full governance alignment ensuring founder intent remains the uncontested law of the enterprise'
    ],
    psychologicalAnchor: 'The definitive choice for elite leaders. Secures long-term enterprise value while freeing the CEO to operate purely in vision and capital allocation.',
    ctaText: 'Secure Sovereign Retainer Partnership',
    isRecommended: true
  }
];

const ServicesPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const previousTitle = document.title;
    document.title = 'Mandates & Services | The Three Institutional Service Categories | TULC';
    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Hard-code founder intent directly into your enterprise substrate. Discover our 3 Sovereign Service Categories: Diagnostic & Forensic Audit, 90-Day Transformation, and Sovereign Retainer.');
    }
    return () => {
      document.title = previousTitle;
      if (metaDesc && prevDesc) {
        metaDesc.setAttribute('content', prevDesc);
      }
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-[#f5f5f0] min-h-screen pt-2 md:pt-4 pb-10 text-left"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* =========================================================
            HEADER: 3 SERVICE CATEGORIES (AT THE VERY BEGINNING)
        ========================================================= */}
        <div className="mb-6 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#b8860b]/10 border border-[#b8860b]/30 rounded-full mb-2">
            <Sparkles className="w-3 h-3 text-[#b8860b]" />
            <span className="text-[#b8860b] text-[9px] font-mono font-bold uppercase tracking-widest">
              Sovereign Enterprise Architecture
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 leading-tight font-serif text-[#111111]">
            Our Three Sovereign <span className="text-[#b8860b] italic font-light">Service Categories.</span>
          </h1>
          
          <p className="text-xs sm:text-sm text-zinc-700 font-serif italic leading-relaxed max-w-2xl mx-auto">
            We do not sell generic advisory hours. We provide three battle-tested architectural categories engineered to eliminate executive bottlenecks, protect capital, and guarantee continuous institutional execution.
          </p>
        </div>

        {/* =========================================================
            THE 3 SERVICE CATEGORIES GRID (FRONT & CENTER)
        ========================================================= */}
        <section className="mb-8">
          <div className="grid lg:grid-cols-3 gap-5 items-stretch">
            {SERVICE_CATEGORIES.map((service) => {
              const isRec = service.isRecommended;
              return (
                <div 
                  key={service.id}
                  className={`flex flex-col rounded-xs border transition-all duration-300 relative ${
                    isRec 
                      ? 'bg-zinc-950 text-white border-[#b8860b] shadow-[0_25px_60px_rgba(184,134,11,0.22)] ring-2 ring-[#b8860b] -translate-y-2 lg:scale-[1.03] z-10 p-7 sm:p-8' 
                      : 'bg-white text-zinc-900 border-zinc-200 hover:border-zinc-300 shadow-sm p-6 sm:p-7'
                  }`}
                >
                  {/* Top Conversion Pill */}
                  {isRec ? (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-[#b8860b] via-amber-400 to-[#b8860b] text-black text-[9px] font-mono font-black uppercase tracking-wider rounded-full shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                      <Crown className="w-3.5 h-3.5 fill-black" />
                      <span>Most Value & Institutional Protection</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400 block">
                        {service.tier}
                      </span>
                      <span className="text-[8px] font-mono uppercase text-[#b8860b] font-semibold">
                        {service.categoryName}
                      </span>
                    </div>
                  )}

                  {/* Header info */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-xs ${
                        isRec ? 'bg-[#b8860b]/20 text-[#b8860b] border border-[#b8860b]/40' : 'bg-[#b8860b]/10 text-[#b8860b]'
                      }`}>
                        {service.badge}
                      </span>
                      {isRec && (
                        <span className="text-[#b8860b] font-mono text-[9px] font-bold uppercase">
                          Long-Term Alpha
                        </span>
                      )}
                    </div>

                    <h2 className={`text-2xl font-bold font-serif leading-tight mb-2 ${isRec ? 'text-white' : 'text-zinc-900'}`}>
                      {service.name}
                    </h2>

                    <p className={`text-xs font-serif italic leading-relaxed mb-4 ${isRec ? 'text-zinc-300' : 'text-zinc-600'}`}>
                      {service.hook}
                    </p>

                    {/* Metric Highlight Box */}
                    <div className={`p-3 rounded-xs border mb-4 font-mono ${
                      isRec 
                        ? 'bg-zinc-900/90 border-[#b8860b]/40 text-[#b8860b]' 
                        : 'bg-zinc-50 border-zinc-200 text-zinc-900'
                    }`}>
                      <span className="text-[8px] uppercase tracking-wider text-zinc-400 block mb-0.5">
                        Architectural Target:
                      </span>
                      <span className="text-xs font-bold block">
                        ⚡ {service.outcomeMetric}
                      </span>
                    </div>
                  </div>

                  {/* Pricing / Investment Anchor */}
                  <div className={`py-3.5 border-t border-b my-auto mb-5 ${
                    isRec ? 'border-white/10' : 'border-zinc-150'
                  }`}>
                    <span className="text-[8px] uppercase font-mono font-bold text-zinc-400 block mb-0.5">
                      Investment Structure
                    </span>
                    <div className={`text-xl sm:text-2xl font-extrabold font-serif ${isRec ? 'text-[#b8860b]' : 'text-zinc-900'}`}>
                      {service.investmentTier}
                    </div>
                    <span className={`text-[10px] font-serif italic block mt-0.5 ${isRec ? 'text-zinc-400' : 'text-zinc-500'}`}>
                      {service.investmentNote}
                    </span>
                  </div>

                  {/* Highlights List */}
                  <div className="space-y-2 mb-5">
                    <span className="text-[8px] uppercase font-mono font-bold text-zinc-400 block">
                      Core Institutional Mandates
                    </span>
                    <ul className="space-y-1.5">
                      {service.coreHighlights.map((hl, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs font-serif italic leading-snug">
                          <CheckCircle className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isRec ? 'text-[#b8860b]' : 'text-zinc-900'}`} />
                          <span className={isRec ? 'text-zinc-200' : 'text-zinc-700'}>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Psychological Anchor Quote */}
                  <div className={`p-3 rounded-xs border text-[10px] font-serif italic mb-5 leading-relaxed ${
                    isRec 
                      ? 'bg-[#b8860b]/10 border-[#b8860b]/30 text-amber-200/90' 
                      : 'bg-zinc-50 border-zinc-200 text-zinc-600'
                  }`}>
                    <strong className="not-italic font-sans uppercase text-[8px] font-bold block mb-0.5 text-zinc-400">
                      Why Leaders Choose This:
                    </strong>
                    "{service.psychologicalAnchor}"
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => navigate('/intake')}
                    className={`w-full py-3 text-[10px] font-mono font-bold uppercase tracking-wider transition-all mt-auto rounded-xs cursor-pointer shadow-md flex items-center justify-center gap-2 ${
                      isRec
                        ? 'bg-[#b8860b] hover:bg-white text-black font-black hover:text-black shadow-lg shadow-[#b8860b]/20'
                        : 'bg-zinc-900 hover:bg-[#b8860b] text-white'
                    }`}
                  >
                    <span>{service.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Institutional Scarcity Bar */}
          <div className="mt-5 bg-white border border-[#b8860b]/40 p-3.5 sm:p-4 rounded-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-7 h-7 rounded-full bg-[#b8860b]/10 border border-[#b8860b]/30 flex items-center justify-center shrink-0">
                <Lock className="w-3.5 h-3.5 text-[#b8860b]" />
              </div>
              <p className="text-zinc-800 text-xs font-serif italic">
                Strict Institutional Intake: We accept only <strong className="text-zinc-950 font-bold">3 enterprise mandates per quarter</strong>. 2 seats committed for Q3. <strong>Only 1 opening remains.</strong>
              </p>
            </div>
            <button
              onClick={() => navigate('/intake')}
              className="px-4 py-2 bg-[#111111] hover:bg-[#b8860b] text-white font-mono text-[9px] uppercase font-bold tracking-wider rounded-xs transition-colors shrink-0 cursor-pointer"
            >
              Verify Intake Availability
            </button>
          </div>
        </section>

        {/* =========================================================
            SECTION 2: WHY THE RETAINER OUTPERFORMS (PSYCHOLOGY OF SOVEREIGNTY)
        ========================================================= */}
        <section className="mb-8 bg-white border border-zinc-200 p-5 sm:p-7 rounded-xs shadow-sm">
          <div className="max-w-3xl mb-5">
            <span className="text-[#b8860b] text-[9px] font-mono font-bold uppercase tracking-widest block mb-1">
              Executive Economics
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-zinc-900">
              Why Board Chairs & High-Growth CEOs Favor the Sovereign Retainer
            </h3>
            <p className="text-zinc-600 text-xs sm:text-sm font-serif italic mt-1 leading-relaxed">
              When an enterprise scales, the highest financial risk is not lack of effort—it is <strong>silent operational drift</strong>. The Retainer creates an impenetrable governance moat around the executive team.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-3.5 font-serif text-xs">
            <div className="p-3.5 bg-zinc-50 border border-zinc-200/80 rounded-xs space-y-1">
              <div className="flex items-center gap-2 text-zinc-900 font-bold font-mono text-[10px] uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-[#b8860b]" />
                <span>01. Drift Prevention</span>
              </div>
              <p className="text-zinc-600 italic leading-relaxed text-[11px]">
                Continuous early-warning telemetry detects friction, alignment decay, and key-person burnout months before it impacts quarterly EBITDA.
              </p>
            </div>

            <div className="p-3.5 bg-zinc-50 border border-zinc-200/80 rounded-xs space-y-1">
              <div className="flex items-center gap-2 text-zinc-900 font-bold font-mono text-[10px] uppercase">
                <Zap className="w-3.5 h-3.5 text-[#b8860b]" />
                <span>02. Asymmetric Leverage</span>
              </div>
              <p className="text-zinc-600 italic leading-relaxed text-[11px]">
                Direct, priority advisory access to Suchita Sancheti for high-stakes capital allocation, succession architecture, and M&A integration.
              </p>
            </div>

            <div className="p-3.5 bg-zinc-50 border border-zinc-200/80 rounded-xs space-y-1">
              <div className="flex items-center gap-2 text-zinc-900 font-bold font-mono text-[10px] uppercase">
                <TrendingUp className="w-3.5 h-3.5 text-[#b8860b]" />
                <span>03. Valuation Alpha</span>
              </div>
              <p className="text-zinc-600 italic leading-relaxed text-[11px]">
                Enterprises with hard-coded execution protocols and decoupled founder dependency command up to 35% higher exit multiples in private markets.
              </p>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-[11px] font-mono text-zinc-500 italic">
              Unsure which substrate matches your scaling complexity?
            </span>
            <button
              onClick={() => navigate('/assessment')}
              className="px-4 py-2 bg-zinc-100 hover:bg-[#b8860b] hover:text-white text-zinc-900 font-mono text-[9px] uppercase font-bold tracking-wider rounded-xs transition-all cursor-pointer"
            >
              Run 90-Sec Sovereign Friction Scan
            </button>
          </div>
        </section>

        {/* =========================================================
            FAQ: ESSENTIAL OBJECTION HANDLING
        ========================================================= */}
        <div className="mt-8 -mx-4 sm:-mx-6">
          <FAQ />
        </div>

      </div>
    </motion.div>
  );
};

export default ServicesPage;
