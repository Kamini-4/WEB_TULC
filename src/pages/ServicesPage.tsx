import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle, 
  ShieldCheck, 
  Crown, 
  Zap, 
  TrendingUp, 
  ShieldAlert, 
  Star,
  Lock
} from 'lucide-react';
import FAQ from '../../components/FAQ.tsx';
import ExecutiveAltitudeFilter from '../../components/ExecutiveAltitudeFilter.tsx';

interface ServiceItem {
  id: string;
  tierLabel: string;
  name: string;
  oneLiner: string;
  targetOutcome: string;
  investmentTier: string;
  investmentNote: string;
  keyBenefits: {
    title: string;
    description: string;
  }[];
  ctaText: string;
  isApexMandate?: boolean;
}

const SERVICES: ServiceItem[] = [
  {
    id: 'diagnostic',
    tierLabel: '01 · Forensic Audit',
    name: '10-Node Forensic Audit',
    oneLiner: 'Mathematically isolate your 2.0-point translation gap and unsealed decision leaks in 48 hours.',
    targetOutcome: '48-Hour Forensic Blueprint',
    investmentTier: 'Upon Request',
    investmentNote: '100% credited toward The Sovereign Retainer',
    keyBenefits: [
      {
        title: 'Expose Decision Leaks',
        description: 'Pinpoints where founder intent stalls between boardroom and frontlines.'
      },
      {
        title: 'Zero Operational Drag',
        description: '100% asynchronous 10-node cross-section with zero team or calendar drag.'
      },
      {
        title: 'Unseal Broken Protocols',
        description: 'Reveals the 3 specific systems draining 15+ hours of executive energy.'
      },
      {
        title: '100% Risk-Free Credit',
        description: 'Full audit fee is credited toward full installation if you proceed.'
      }
    ],
    ctaText: 'Run 10-Node Diagnostic'
  },
  {
    id: 'transformation',
    tierLabel: '02 · Core Installation',
    name: '90-Day Sovereign OS',
    oneLiner: 'Hard-code founder judgment into 12 self-regulating operational gates to automate routine trade-offs.',
    targetOutcome: 'Reclaim 15+ Hours Weekly (90 Days)',
    investmentTier: 'Custom Fixed Scope',
    investmentNote: 'Permanent operational infrastructure setup',
    keyBenefits: [
      {
        title: 'Reclaim 15+ Hours/Week',
        description: 'Permanently kill low-value reviews, status syncs & micromanagement.'
      },
      {
        title: '12 Invariant Protocols',
        description: 'Codifies executive judgment so directors make autonomous calls safely.'
      },
      {
        title: 'Pass 30-Day Step-Away',
        description: 'Enterprise operates seamlessly without daily founder intervention.'
      },
      {
        title: 'Maximize Valuation Multiple',
        description: 'Eradicates founder key-person risk to defend EBITDA multiples at exit.'
      }
    ],
    ctaText: 'Apply for 90-Day OS'
  },
  {
    id: 'retainer',
    tierLabel: '03 · Permanent Moat',
    name: 'The Sovereign Retainer',
    oneLiner: 'Continuous executive insulation, 24/7 red-phone strategic advisory, and compounding valuation defense.',
    targetOutcome: 'Continuous 100% Fidelity & Valuation Alpha',
    investmentTier: 'Annual Retainer',
    investmentNote: 'Includes All Audits & Protocols • ~24x Return',
    isApexMandate: true,
    keyBenefits: [
      {
        title: 'Permanent Drift Immunity ($3M+ Shield)',
        description: '78% of unmonitored systems silently decay in 180 days. Bi-annual audits prevent regression.'
      },
      {
        title: '24/7 Priority Red Phone with Suchita Sancheti',
        description: 'Direct on-call counsel for high-stakes M&A, board votes, capital bets, and executive disputes.'
      },
      {
        title: 'Reclaim 20+ Hours Weekly For Life',
        description: 'Complete sovereign insulation from operational noise. You preside as Fiduciary Source.'
      },
      {
        title: '+35% EBITDA Valuation Alpha',
        description: 'Decouples founder key-person drag to command premier private equity multiples.'
      },
      {
        title: 'All Protocols & Audits Included',
        description: 'Zero hidden billings. Continuous telemetry and 12 protocol updates for your leadership team.'
      }
    ],
    ctaText: 'Request Private Vetting for Board Seat'
  }
];

const ServicesPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const previousTitle = document.title;
    document.title = 'Services | The Sovereign Retainer & Enterprise Architecture | TULC';
    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Discover our 3 Sovereign Service Levels: 10-Node Forensic Audit, 90-Day Sovereign OS Installation, and The Sovereign Retainer & Board Seat.');
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
      transition={{ duration: 0.3 }}
      className="bg-[#f5f5f0] min-h-screen pt-3 sm:pt-4 pb-12 text-left"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* =========================================================
            COMPACT HEADER: IMMEDIATE VISIBILITY WITHOUT SCROLLING
        ========================================================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mb-4 sm:mb-5 pb-3 border-b border-zinc-200/80">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#b8860b]/10 border border-[#b8860b]/25 rounded-full mb-1">
              <Crown className="w-3 h-3 text-[#b8860b]" />
              <span className="text-[#b8860b] text-[9px] font-mono font-bold uppercase tracking-widest">
                Institutional Sovereign Architecture
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#111111] leading-tight">
              Our Three Sovereign <span className="text-[#b8860b] italic font-light">Services.</span>
            </h1>
          </div>
          
          <p className="text-xs text-zinc-600 font-serif italic max-w-md leading-relaxed">
            Calibrated for enterprise founders and boards to eliminate operational drag and defend valuation multiples.
          </p>
        </div>

        {/* =========================================================
            THE 3 SOVEREIGN SERVICES: COMPACT, BALANCED & FULLY VISIBLE
        ========================================================= */}
        <section className="mb-10 sm:mb-14">
          <div className="grid lg:grid-cols-3 gap-4 xl:gap-5 items-stretch">
            {SERVICES.map((service) => {
              const isApex = service.isApexMandate;
              
              return (
                <div 
                  key={service.id}
                  className={`flex flex-col justify-between rounded-xs transition-all duration-300 relative ${
                    isApex 
                      ? 'bg-zinc-950 text-white border-2 border-[#b8860b] shadow-xl p-4 sm:p-5 xl:p-6 z-10' 
                      : 'bg-white text-zinc-900 border border-zinc-200/90 shadow-xs hover:border-zinc-300 p-4 sm:p-5 xl:p-6'
                  }`}
                >
                  {/* Card Header & Labels */}
                  <div>
                    {isApex ? (
                      <div className="flex flex-col gap-1 mb-2.5">
                        <div className="flex items-center justify-between">
                          <span className="bg-gradient-to-r from-[#b8860b] via-amber-400 to-[#b8860b] text-black font-black text-[8px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-2xs shadow-xs flex items-center gap-1">
                            <Crown className="w-2.5 h-2.5 fill-black shrink-0" />
                            <span>APEX MANDATE • 94% CLIENT CHOICE</span>
                          </span>
                          <span className="text-[#b8860b] font-mono text-[8px] font-bold uppercase tracking-wider">
                            HIGHEST ROI
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[9px] font-mono text-amber-200/90 pt-0.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                          <span>Strictly 1 Q4 Advisory Seat Remaining</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between mb-2.5">
                        <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                          {service.tierLabel}
                        </span>
                        <span className="text-[8px] font-mono uppercase text-[#b8860b] font-semibold">
                          Institutional Tier
                        </span>
                      </div>
                    )}

                    <h2 className={`text-xl sm:text-2xl font-bold font-serif leading-snug mb-1.5 ${isApex ? 'text-white' : 'text-zinc-900'}`}>
                      {service.name}
                    </h2>

                    <p className={`text-xs font-serif italic leading-relaxed mb-3 ${isApex ? 'text-zinc-300' : 'text-zinc-600'}`}>
                      {service.oneLiner}
                    </p>

                    {/* Target Metric Pill */}
                    <div className={`p-2 rounded-xs border mb-3.5 font-mono text-[11px] ${
                      isApex 
                        ? 'bg-zinc-900/90 border-[#b8860b]/40 text-[#b8860b]' 
                        : 'bg-zinc-50 border-zinc-200 text-zinc-800'
                    }`}>
                      <span className="text-zinc-400 text-[8px] uppercase tracking-wider block leading-none mb-0.5">
                        Target Metric:
                      </span>
                      <span className="font-bold block truncate">
                        ⚡ {service.targetOutcome}
                      </span>
                    </div>

                    {/* Key Benefits List */}
                    <div className="space-y-2 mb-4">
                      <span className={`text-[8px] uppercase font-mono font-bold tracking-wider block ${isApex ? 'text-[#b8860b]' : 'text-zinc-400'}`}>
                        {isApex ? '★ Sovereign Deliverables:' : 'Core Deliverables:'}
                      </span>
                      
                      <div className="space-y-1.5">
                        {service.keyBenefits.slice(0, 3).map((benefit, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs leading-snug">
                            <CheckCircle className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isApex ? 'text-[#b8860b]' : 'text-zinc-800'}`} />
                            <div className="line-clamp-2">
                              <strong className={`font-sans font-semibold ${isApex ? 'text-white' : 'text-zinc-900'}`}>
                                {benefit.title}:
                              </strong>{' '}
                              <span className={`font-serif italic ${isApex ? 'text-zinc-300' : 'text-zinc-600'}`}>
                                {benefit.description}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Investment & CTA */}
                  <div className={`pt-3 border-t ${isApex ? 'border-white/10' : 'border-zinc-200/80'}`}>
                    <div className="flex items-baseline justify-between mb-2 text-xs font-mono">
                      <span className="text-zinc-400 uppercase text-[9px]">Terms:</span>
                      <div className="text-right">
                        <span className={`font-bold block text-xs ${isApex ? 'text-[#b8860b]' : 'text-zinc-900'}`}>
                          {service.investmentTier}
                        </span>
                        <span className={`text-[9px] font-serif italic ${isApex ? 'text-zinc-400' : 'text-zinc-500'}`}>
                          {service.investmentNote}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate('/intake')}
                      className={`w-full py-2.5 sm:py-3 text-xs font-mono font-bold uppercase tracking-wider transition-all rounded-xs cursor-pointer shadow-xs flex items-center justify-center gap-1.5 ${
                        isApex
                          ? 'bg-gradient-to-r from-[#b8860b] via-amber-400 to-[#b8860b] hover:from-white hover:to-white text-black font-black shadow-md'
                          : 'bg-[#111111] hover:bg-[#b8860b] text-white'
                      }`}
                    >
                      <span>{service.ctaText}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Strategic Context & Decoy Section */}
          <div className="mt-8 sm:mt-10 bg-white border border-zinc-200/90 p-6 sm:p-8 rounded-xs flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#b8860b]/10 border border-[#b8860b]/30 flex items-center justify-center shrink-0 mt-0.5">
                <Crown className="w-5 h-5 text-[#b8860b]" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold font-serif text-zinc-900 mb-1">
                  Why 94% of Enterprise Principals Secure <span className="text-[#b8860b]">The Sovereign Retainer</span>
                </h3>
                <p className="text-zinc-600 text-xs sm:text-sm font-serif italic leading-relaxed max-w-3xl">
                  Categories 01 and 02 resolve existing bottlenecks. The Retainer permanently insulates your personal time, grants a direct 24/7 Red Phone to Suchita Sancheti for high-stakes decisions, and prevents the silent execution drift that damages enterprise valuation.
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/intake')}
              className="px-6 py-3 bg-[#111111] hover:bg-[#b8860b] text-white font-mono text-xs uppercase font-bold tracking-wider rounded-xs transition-colors shrink-0 cursor-pointer shadow-xs whitespace-nowrap"
            >
              Verify Retainer Eligibility →
            </button>
          </div>
        </section>

        {/* Tailored Institutional Altitude Selector */}
        <section className="mb-14 sm:mb-18 md:mb-24">
          <ExecutiveAltitudeFilter />
        </section>

        {/* =========================================================
            SECTION 2: EXECUTIVE VALUE ARCHITECTURE (SPACIOUS & CALM)
        ========================================================= */}
        <section className="mb-14 sm:mb-18 md:mb-24 bg-white border border-zinc-200 p-8 sm:p-10 md:p-12 rounded-xs shadow-xs">
          <div className="max-w-3xl mb-8">
            <span className="text-[#b8860b] text-[10px] font-mono font-bold uppercase tracking-widest block mb-1">
              The Sovereign Shield
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold font-serif text-zinc-900 leading-snug">
              Why Board Chairs & Scale-Up Founders Favor Continuous Governance
            </h3>
            <p className="text-zinc-600 text-xs sm:text-sm font-serif italic mt-2 leading-relaxed">
              When an enterprise scales past $10M–$50M, the greatest financial danger is not lack of ambition—it is <strong>silent operational drift and key-person burnout</strong>. The Retainer creates an impenetrable governance moat.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 font-serif text-xs">
            <div className="p-6 bg-zinc-50 border border-zinc-200/80 rounded-xs space-y-2">
              <div className="flex items-center gap-2 text-zinc-900 font-bold font-mono text-xs uppercase">
                <ShieldAlert className="w-4 h-4 text-[#b8860b]" />
                <span>01. The $3M Drift Shield</span>
              </div>
              <p className="text-zinc-600 italic leading-relaxed text-xs">
                Without continuous early-warning telemetry, executive teams silently revert to old firefighting habits within 6 months, leaking margin and diluting valuation.
              </p>
            </div>

            <div className="p-6 bg-zinc-50 border border-zinc-200/80 rounded-xs space-y-2">
              <div className="flex items-center gap-2 text-zinc-900 font-bold font-mono text-xs uppercase">
                <Zap className="w-4 h-4 text-[#b8860b]" />
                <span>02. The Red Phone Advantage</span>
              </div>
              <p className="text-zinc-600 italic leading-relaxed text-xs">
                Direct, priority advisory access to Suchita Sancheti for high-stakes M&A negotiations, boardroom disputes, executive hiring, and capital allocation.
              </p>
            </div>

            <div className="p-6 bg-zinc-50 border border-zinc-200/80 rounded-xs space-y-2">
              <div className="flex items-center gap-2 text-zinc-900 font-bold font-mono text-xs uppercase">
                <TrendingUp className="w-4 h-4 text-[#b8860b]" />
                <span>03. +35% Valuation Alpha</span>
              </div>
              <p className="text-zinc-600 italic leading-relaxed text-xs">
                Enterprises with decoupled founder dependency and verified board governance command up to 35% higher exit multiples in private equity acquisitions.
              </p>
            </div>
          </div>

          {/* Testimonial / Social Proof Callout */}
          <div className="mt-8 p-6 bg-[#fbf9f4] border border-[#b8860b]/30 rounded-xs flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
            <div className="flex items-start gap-3">
              <Star className="w-5 h-5 text-[#b8860b] fill-[#b8860b] shrink-0 mt-0.5" />
              <div>
                <p className="text-zinc-900 text-xs sm:text-sm font-serif italic leading-relaxed">
                  "The Sovereign Retainer is the highest ROI capital expenditure on our balance sheet. It gave me back 18 hours every week, eliminated boardroom friction, and added millions to our enterprise valuation."
                </p>
                <span className="text-xs font-mono text-zinc-500 font-bold block mt-1">
                  — CEO & Founder, $48M Enterprise Scale-Up (Sovereign Retainer Client)
                </span>
              </div>
            </div>
            <button
              onClick={() => navigate('/intake')}
              className="px-5 py-2.5 bg-[#111111] hover:bg-[#b8860b] text-white font-mono text-xs uppercase font-bold tracking-wider rounded-xs transition-all shrink-0 cursor-pointer shadow-xs whitespace-nowrap"
            >
              Verify Retainer Eligibility →
            </button>
          </div>
        </section>

        {/* =========================================================
            FAQ: ESSENTIAL OBJECTION HANDLING
        ========================================================= */}
        <div className="mt-14 sm:mt-18 md:mt-24 -mx-4 sm:-mx-6 lg:-mx-8">
          <FAQ />
        </div>

      </div>
    </motion.div>
  );
};

export default ServicesPage;
