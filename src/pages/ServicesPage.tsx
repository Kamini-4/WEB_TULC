import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
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
        title: 'Expose Hidden Decision Leaks',
        description: 'Pinpoints exactly where founder intent stalls between the boardroom and frontlines, eliminating approval logjams.'
      },
      {
        title: 'Zero Operational Drag',
        description: '100% asynchronous 10-node cross-sectional diagnosis executed without disrupting your leadership calendar.'
      },
      {
        title: 'Unseal Broken Operating Protocols',
        description: 'Reveals the 3 specific systemic bottlenecks draining 15+ hours of executive energy each week.'
      },
      {
        title: '100% Investment Credit',
        description: 'Your complete diagnostic fee is applied 100% as a direct credit toward full system installation.'
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
        title: 'Reclaim 15+ Hours Weekly',
        description: 'Permanently eliminates low-value operational reviews, redundant status syncs, and founder micromanagement.'
      },
      {
        title: '12 Invariant Governance Protocols',
        description: 'Codifies executive decision thresholds into written architecture so VPs make autonomous calls safely.'
      },
      {
        title: '30-Day Founder Absence Certification',
        description: 'Proves your business functions seamlessly with zero performance loss when you step away for 30 continuous days.'
      },
      {
        title: 'Valuation & Multiple Protection',
        description: 'Eradicates single-point key-person risk to defend your EBITDA multiples in eventual transactions or funding rounds.'
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
        description: '78% of unmonitored systems silently decay within 180 days. Bi-annual audits prevent regression and protect EBITDA multiples.'
      },
      {
        title: '24/7 Priority Red Phone with Suchita Sancheti',
        description: 'Direct on-call strategic counsel for high-stakes M&A negotiations, board votes, executive hires, and critical capital allocation.'
      },
      {
        title: 'Reclaim 20+ Hours Weekly For Life',
        description: 'Complete sovereign insulation from operational noise, low-level reviews, and daily Slack fires. You preside cleanly as Fiduciary Source.'
      },
      {
        title: '+35% EBITDA Valuation Alpha',
        description: 'Decouples founder key-person drag to command premier institutional valuation multiples upon acquisition or private equity recapitalization.'
      },
      {
        title: 'All Protocols, Workspaces & Audits Included',
        description: 'Zero nickel-and-diming. Full enterprise access to all current and future operational frameworks, telemetry suites, and team calibrations.'
      },
      {
        title: 'Quarterly Board Alignment Docket',
        description: 'Independent structural audit heatmaps and governance risk reports delivered directly to your board of directors and advisory committee.'
      },
      {
        title: 'Succession & Step-Away Certification',
        description: 'Continuous testing of leadership redundancy ensuring the enterprise operates seamlessly during extended executive absence.'
      },
      {
        title: 'Fiduciary Divergence Neutralization',
        description: 'Monthly asynchronous friction mapping to isolate and eliminate executive misalignment before it leaks into customer-facing operations.'
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
                    <div className={`p-2.5 rounded-xs border mb-3.5 font-mono text-[11px] ${
                      isApex 
                        ? 'bg-zinc-900/90 border-[#b8860b]/40 text-[#b8860b]' 
                        : 'bg-zinc-50 border-zinc-200 text-zinc-800'
                    }`}>
                      <span className="text-zinc-400 text-[8px] uppercase tracking-wider block leading-none mb-0.5">
                        Target Metric:
                      </span>
                      <span className="font-bold block break-words leading-tight">
                        ⚡ {service.targetOutcome}
                      </span>
                    </div>

                    {/* Key Benefits List - Full Value Display A to Z */}
                    <div className="space-y-2 mb-4">
                      <span className={`text-[8px] uppercase font-mono font-bold tracking-wider block ${isApex ? 'text-[#b8860b]' : 'text-zinc-400'}`}>
                        {isApex ? '★ Sovereign Deliverables (All Included):' : 'Core Deliverables:'}
                      </span>
                      
                      <div className="space-y-2.5">
                        {service.keyBenefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs leading-relaxed">
                            <CheckCircle className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isApex ? 'text-[#b8860b]' : 'text-zinc-800'}`} />
                            <div>
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

          {/* Contextual Internal Links Banner */}
          <div className="mt-8 bg-zinc-100 border border-zinc-300/80 p-3 sm:p-4 rounded-xs flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <span className="text-zinc-700 font-bold uppercase text-[10px] flex items-center gap-1.5">
              <span>✦</span> Cross-Platform Navigation:
            </span>
            <div className="flex flex-wrap items-center gap-2 text-[10px]">
              <Link to="/toolkits" className="px-2.5 py-1 bg-white border border-zinc-300 text-zinc-900 hover:border-[#b8860b] hover:text-[#b8860b] transition-colors rounded-2xs font-semibold">
                Explore Digital Toolkits →
              </Link>
              <Link to="/methodology" className="px-2.5 py-1 bg-white border border-zinc-300 text-zinc-900 hover:border-[#b8860b] hover:text-[#b8860b] transition-colors rounded-2xs font-semibold">
                How It Works (90-Day OS) →
              </Link>
              <Link to="/assessment" className="px-2.5 py-1 bg-white border border-zinc-300 text-zinc-900 hover:border-[#b8860b] hover:text-[#b8860b] transition-colors rounded-2xs font-semibold">
                90-Sec Diagnostic →
              </Link>
              <Link to="/cognitive-tax" className="px-2.5 py-1 bg-white border border-zinc-300 text-zinc-900 hover:border-[#b8860b] hover:text-[#b8860b] transition-colors rounded-2xs font-semibold">
                Drag Calculator →
              </Link>
            </div>
          </div>

          {/* =========================================================
              THE SOVEREIGN RETAINER: A-TO-Z VALUE & GOVERNANCE ARCHITECTURE
          ========================================================= */}
          <div className="mt-10 sm:mt-12 bg-[#0c0c0c] text-white border-2 border-[#b8860b] p-6 sm:p-8 md:p-10 rounded-xs shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#b8860b]/10 blur-[100px] pointer-events-none" />

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-white/10">
              <div className="space-y-1.5 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#b8860b] text-[#111111] text-[8px] font-mono uppercase tracking-widest font-black">
                  <Crown className="w-3 h-3" /> FULL SPECTRUM DELIVERABLES • ZERO SHORTCUTS
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold font-serif text-white">
                  The Sovereign Retainer: <span className="text-[#b8860b] italic font-light">A-to-Z Value Architecture</span>
                </h3>
                <p className="text-xs text-zinc-400 font-serif italic leading-relaxed">
                  Every benefit and governance deliverable engineered into your annual advisory seat—complete, untruncated, and compounding across every department.
                </p>
              </div>

              <button
                onClick={() => navigate('/intake')}
                className="px-5 py-2.5 bg-[#b8860b] hover:bg-white text-black font-mono text-xs uppercase font-black tracking-wider rounded-xs transition-all shrink-0 cursor-pointer shadow-md"
              >
                Verify Retainer Seat Availability →
              </button>
            </div>

            {/* A to Z Deliverables Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6 text-xs">
              <div className="p-4 bg-zinc-900/80 border border-white/10 rounded-xs space-y-1 hover:border-[#b8860b]/60 transition-colors">
                <div className="flex items-center gap-2 text-[#b8860b] font-mono text-[10px] font-bold uppercase">
                  <span>[ A ]</span>
                  <span className="text-white">Asynchronous Executive Red-Phone</span>
                </div>
                <p className="text-[11px] text-zinc-300 font-serif italic leading-relaxed">
                  Direct, priority advisory line to Suchita Sancheti for high-stakes boardroom votes, M&A evaluations, and critical capital allocation with a guaranteed sub-4-hour turnaround.
                </p>
              </div>

              <div className="p-4 bg-zinc-900/80 border border-white/10 rounded-xs space-y-1 hover:border-[#b8860b]/60 transition-colors">
                <div className="flex items-center gap-2 text-[#b8860b] font-mono text-[10px] font-bold uppercase">
                  <span>[ B ]</span>
                  <span className="text-white">Bi-Annual Forensic Drift Audits</span>
                </div>
                <p className="text-[11px] text-zinc-300 font-serif italic leading-relaxed">
                  Comprehensive 10-node operational telemetry sweeps performed every 6 months to mathematically identify and arrest silent execution drift before it dilutes enterprise margins.
                </p>
              </div>

              <div className="p-4 bg-zinc-900/80 border border-white/10 rounded-xs space-y-1 hover:border-[#b8860b]/60 transition-colors">
                <div className="flex items-center gap-2 text-[#b8860b] font-mono text-[10px] font-bold uppercase">
                  <span>[ C ]</span>
                  <span className="text-white">Continuous Board Governance Dockets</span>
                </div>
                <p className="text-[11px] text-zinc-300 font-serif italic leading-relaxed">
                  Independent structural audit heatmaps and governance compliance dockets formatted for quarterly board meetings, private equity sponsors, and investment committees.
                </p>
              </div>

              <div className="p-4 bg-zinc-900/80 border border-white/10 rounded-xs space-y-1 hover:border-[#b8860b]/60 transition-colors">
                <div className="flex items-center gap-2 text-[#b8860b] font-mono text-[10px] font-bold uppercase">
                  <span>[ D ]</span>
                  <span className="text-white">Decoupled Key-Person Architecture</span>
                </div>
                <p className="text-[11px] text-zinc-300 font-serif italic leading-relaxed">
                  Total cognitive insulation of the founder's calendar. Low-value reviews and operational fire-drills are structurally trapped and resolved by autonomous leadership gates.
                </p>
              </div>

              <div className="p-4 bg-zinc-900/80 border border-white/10 rounded-xs space-y-1 hover:border-[#b8860b]/60 transition-colors">
                <div className="flex items-center gap-2 text-[#b8860b] font-mono text-[10px] font-bold uppercase">
                  <span>[ E ]</span>
                  <span className="text-white">Enterprise Multiple Defense (+35%)</span>
                </div>
                <p className="text-[11px] text-zinc-300 font-serif italic leading-relaxed">
                  Proactive eradication of single-point founder dependency, expanding EBITDA acquisition multiples by up to 35% during private equity recaps or strategic buyouts.
                </p>
              </div>

              <div className="p-4 bg-zinc-900/80 border border-white/10 rounded-xs space-y-1 hover:border-[#b8860b]/60 transition-colors">
                <div className="flex items-center gap-2 text-[#b8860b] font-mono text-[10px] font-bold uppercase">
                  <span>[ F ]</span>
                  <span className="text-white">Full Institutional Toolkits Ecosystem</span>
                </div>
                <p className="text-[11px] text-zinc-300 font-serif italic leading-relaxed">
                  Unrestricted enterprise licensing to all present and upcoming digital workspaces, delegation matrices, decision charters, and executive runbooks with zero additional licensing fees.
                </p>
              </div>

              <div className="p-4 bg-zinc-900/80 border border-white/10 rounded-xs space-y-1 hover:border-[#b8860b]/60 transition-colors">
                <div className="flex items-center gap-2 text-[#b8860b] font-mono text-[10px] font-bold uppercase">
                  <span>[ G ]</span>
                  <span className="text-white">Governance & C-Suite Sparring</span>
                </div>
                <p className="text-[11px] text-zinc-300 font-serif italic leading-relaxed">
                  Confidential advisory sparring on executive hiring, equity compensation structures, co-founder realignments, and multi-entity corporate restructuring.
                </p>
              </div>

              <div className="p-4 bg-zinc-900/80 border border-white/10 rounded-xs space-y-1 hover:border-[#b8860b]/60 transition-colors">
                <div className="flex items-center gap-2 text-[#b8860b] font-mono text-[10px] font-bold uppercase">
                  <span>[ H ]</span>
                  <span className="text-white">High-Fidelity Step-Away Certification</span>
                </div>
                <p className="text-[11px] text-zinc-300 font-serif italic leading-relaxed">
                  Continuous stress-testing of leadership redundancy ensuring your leadership committee functions with 100% fidelity during extended founder absence of 30+ consecutive days.
                </p>
              </div>

              <div className="p-4 bg-zinc-900/80 border border-white/10 rounded-xs space-y-1 hover:border-[#b8860b]/60 transition-colors">
                <div className="flex items-center gap-2 text-[#b8860b] font-mono text-[10px] font-bold uppercase">
                  <span>[ Z ]</span>
                  <span className="text-white">Zero-Leak Operating Guarantee</span>
                </div>
                <p className="text-[11px] text-zinc-300 font-serif italic leading-relaxed">
                  A definitive, permanent governance moat protecting executive focus, organizational bandwidth, and compounding enterprise valuation year after year.
                </p>
              </div>
            </div>
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
