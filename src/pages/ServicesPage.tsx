import React, { useEffect, useState } from 'react';
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
  LayoutGrid, 
  Table, 
  Flame, 
  AlertTriangle, 
  ShieldAlert, 
  Star,
  Check
} from 'lucide-react';
import FAQ from '../../components/FAQ.tsx';
import ExecutiveAltitudeFilter from '../../components/ExecutiveAltitudeFilter.tsx';

interface ServiceItem {
  id: string;
  badge: string;
  category: string;
  name: string;
  subtitle: string;
  oneLiner: string;
  targetOutcome: string;
  investmentTier: string;
  investmentNote: string;
  keyBenefits: {
    title: string;
    description: string;
  }[];
  ctaText: string;
  ctaSubtext?: string;
  isApexMandate?: boolean;
  isPopular?: boolean;
  scarcityBadge?: string;
}

const SERVICES: ServiceItem[] = [
  {
    id: 'diagnostic',
    badge: 'Phase 0.0 • Diagnostic Entry',
    category: 'Category 01 · Diagnostic Entry',
    name: '10-Node Forensic Audit',
    subtitle: 'Step 1: Isolate The Leaks',
    oneLiner: 'Mathematically isolate your 2.0 translation gap and decision leaks in 48 hours.',
    targetOutcome: '48-Hour Forensic Leak Map',
    investmentTier: 'Upon Request',
    investmentNote: '100% credited toward The Sovereign Retainer',
    keyBenefits: [
      {
        title: 'Expose Decision Leaks',
        description: 'Pinpoints where founder intent stalls between boardroom and edge.'
      },
      {
        title: 'Zero Operational Drag',
        description: '100% asynchronous 10-node cross-section with zero team disruption.'
      },
      {
        title: 'Pinpoint Broken Protocols',
        description: 'Reveals the 3 specific systems draining 15+ hours of CEO energy.'
      },
      {
        title: '100% Risk-Free Credit',
        description: 'Full audit fee credited toward The Sovereign Retainer upon proceeding.'
      }
    ],
    ctaText: 'Run 10-Node Diagnostic',
    ctaSubtext: 'Low friction entry point • 48hr delivery'
  },
  {
    id: 'transformation',
    badge: 'Phases 01–03 • One-Off Overhaul',
    category: 'Category 02 · Transitional Setup',
    name: '90-Day Sovereign OS',
    subtitle: 'Step 2: Install Core Protocols',
    oneLiner: 'Hard-code founder judgment into 12 self-regulating operational gates.',
    targetOutcome: 'Reclaim 15+ Hrs/Wk (90 Days)',
    investmentTier: 'Custom Scope',
    investmentNote: 'Included free inside Year 1 Retainer',
    keyBenefits: [
      {
        title: 'Reclaim 15+ Hours/Week',
        description: 'Permanently kill low-value reviews, status syncs & micromanagement.'
      },
      {
        title: '12 Invariant Protocols',
        description: 'Codifies executive judgment so directors make autonomous calls.'
      },
      {
        title: 'Pass 30-Day Step-Away',
        description: 'Enterprise operates seamlessly without daily founder intervention.'
      },
      {
        title: 'Initial Risk Shield',
        description: 'Eliminates acute bottlenecks (Upgrades to Retainer for ongoing defense).'
      }
    ],
    ctaText: 'Apply for 90-Day OS',
    ctaSubtext: 'Standalone installation or roll into Retainer'
  },
  {
    id: 'retainer',
    badge: '👑 THE APEX MANDATE • 94% OF CEOS CHOOSE THIS',
    category: 'Category 03 · Permanent Enterprise Moat',
    name: 'The Sovereign Retainer',
    subtitle: 'The Crown Mandate: Board Seat & Permanent Insulation',
    oneLiner: 'Continuous executive insulation, 24/7 red-phone advisory, and compounding valuation defense.',
    targetOutcome: 'Continuous 100% Fidelity • +35% EBITDA Multiple',
    investmentTier: 'Annual Retainer',
    investmentNote: 'Includes All Diagnostics & Protocols • ~24x Value Multiple',
    scarcityBadge: 'STRICTLY 1 ADVISORY SEAT REMAINING FOR Q4',
    isApexMandate: true,
    keyBenefits: [
      {
        title: 'Permanent Drift Immunity ($3M+ Risk Shield)',
        description: '78% of unmonitored systems suffer silent drift within 180 days. Bi-annual audits protect your balance sheet.'
      },
      {
        title: '24/7 Direct Red Phone with Suchita Sancheti',
        description: 'Immediate, unmediated advisory for high-stakes M&A, board votes, capital bets, and executive disputes.'
      },
      {
        title: 'Reclaim 20+ Hours Weekly For Life',
        description: 'Complete sovereign insulation from operational noise. You preside as Fiduciary Source while the OS executes.'
      },
      {
        title: 'Maximize Enterprise Exit Multiples',
        description: 'Eradicates founder key-person risk to command up to 35% higher valuation in private equity markets.'
      },
      {
        title: 'Complete Protocol & Audit Suite Included',
        description: 'Zero hidden costs. Includes full 10-Node Audits and all 12 Invariant Protocol updates continuously.'
      }
    ],
    ctaText: 'Request Confidential Vetting for Board Seat',
    ctaSubtext: 'Direct 45-min Principal session with Suchita Sancheti • Strictly 1 seat left'
  }
];

const ServicesPage: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'cards' | 'matrix'>('cards');

  useEffect(() => {
    window.scrollTo(0, 0);
    const previousTitle = document.title;
    document.title = 'Services | The Sovereign Retainer & Enterprise Architecture | TULC';
    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Hard-code founder sovereignty directly into your enterprise substrate. Discover our 3 Service Categories anchored by The Sovereign Retainer & Board Seat.');
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
      className="bg-[#f5f5f0] min-h-screen pt-2 sm:pt-3 pb-12 text-left"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* =========================================================
            COMPACT HEADER: DESIGNED TO KEEP EVERYTHING ABOVE THE FOLD
        ========================================================= */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-3 sm:mb-4 border-b border-zinc-200/90 pb-3">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#b8860b]/15 border border-[#b8860b]/35 rounded-full mb-1">
              <Crown className="w-2.5 h-2.5 text-[#b8860b]" />
              <span className="text-[#b8860b] text-[9px] font-mono font-bold uppercase tracking-widest">
                Institutional Sovereign Architecture
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-[#111111] leading-tight">
              Our Sovereign <span className="text-[#b8860b] italic font-light">Services.</span>
            </h1>
            
            <p className="text-xs sm:text-sm text-zinc-700 font-serif italic max-w-2xl mt-0.5">
              Engineered for CEOs and Board Chairs who refuse to trade velocity for sanity. All benefits in one view.
            </p>
          </div>

          {/* Psychological Proof & View Toggle */}
          <div className="flex items-center gap-3 self-start sm:self-end shrink-0">
            <div className="hidden lg:flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 bg-white px-2.5 py-1 border border-zinc-200 rounded-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Institutional Q4 Capacity: <strong>1 Retainer Seat Left</strong></span>
            </div>

            <div className="inline-flex p-0.5 bg-white border border-zinc-200 rounded-xs shadow-2xs">
              <button
                onClick={() => setViewMode('cards')}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-mono uppercase font-bold transition-all rounded-2xs cursor-pointer ${
                  viewMode === 'cards' 
                    ? 'bg-[#111111] text-white' 
                    : 'text-zinc-600 hover:text-[#111111]'
                }`}
                title="Cards View"
              >
                <LayoutGrid className="w-3 h-3" />
                <span>Cards</span>
              </button>
              <button
                onClick={() => setViewMode('matrix')}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-mono uppercase font-bold transition-all rounded-2xs cursor-pointer ${
                  viewMode === 'matrix' 
                    ? 'bg-[#111111] text-white' 
                    : 'text-zinc-600 hover:text-[#111111]'
                }`}
                title="Benefits Comparison Matrix"
              >
                <Table className="w-3 h-3" />
                <span>Benefits Matrix</span>
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================
            VIEW 1: COMPACT 3-COLUMN EXECUTIVE CARDS (ALL BENEFITS IN ONE GO)
            WITH THE 3RD CARD COMMANDING COMPLETE PSYCHOLOGICAL PRESTIGE
        ========================================================= */}
        {viewMode === 'cards' && (
          <section className="mb-5">
            <div className="grid lg:grid-cols-3 gap-3.5 xl:gap-4.5 items-stretch">
              {SERVICES.map((service) => {
                const isApex = service.isApexMandate;
                
                return (
                  <div 
                    key={service.id}
                    className={`flex flex-col justify-between rounded-xs transition-all duration-300 relative ${
                      isApex 
                        ? 'bg-gradient-to-b from-zinc-950 via-[#10100f] to-zinc-950 text-white border-2 border-[#b8860b] shadow-[0_20px_50px_rgba(184,134,11,0.28)] ring-2 ring-[#b8860b]/40 lg:scale-[1.03] lg:-translate-y-2 z-20 p-4.5 sm:p-5' 
                        : 'bg-white text-zinc-900 border border-zinc-250 shadow-2xs hover:border-[#b8860b]/60 p-4.5 sm:p-5'
                    }`}
                  >
                    {/* Top Scarcity / Prestige Banner */}
                    {isApex ? (
                      <div className="flex flex-col gap-1 mb-2">
                        <div className="flex items-center justify-between">
                          <span className="bg-gradient-to-r from-[#b8860b] via-amber-400 to-[#b8860b] text-black font-black text-[8px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-2xs shadow-xs flex items-center gap-1">
                            <Crown className="w-3 h-3 fill-black shrink-0" />
                            <span>THE APEX MANDATE • 94% CLIENT CHOICE</span>
                          </span>
                          <span className="text-[#b8860b] font-mono text-[8px] font-bold uppercase tracking-wider">
                            HIGHEST ROI
                          </span>
                        </div>

                        {/* Real-Time Live Scarcity Indicator */}
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-[#b8860b]/15 border border-[#b8860b]/30 rounded-2xs text-[9px] font-mono text-amber-200">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                          <span className="font-bold">{service.scarcityBadge}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-[8px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-2xs bg-zinc-100 text-zinc-700 border border-zinc-200">
                          {service.badge}
                        </span>
                        <span className="text-[8px] font-mono uppercase text-zinc-400 font-semibold">
                          {service.category}
                        </span>
                      </div>
                    )}

                    {/* Service Name & Punchline */}
                    <div>
                      <div className="flex items-baseline justify-between mb-0.5">
                        <h2 className={`text-xl sm:text-2xl font-bold font-serif leading-tight ${isApex ? 'text-white' : 'text-zinc-900'}`}>
                          {service.name}
                        </h2>
                      </div>
                      
                      <div className={`text-[10px] font-mono uppercase tracking-wider font-semibold mb-1 ${isApex ? 'text-[#b8860b]' : 'text-zinc-500'}`}>
                        {service.subtitle}
                      </div>

                      <p className={`text-[11px] font-serif italic leading-snug mb-2.5 ${isApex ? 'text-zinc-300' : 'text-zinc-600'}`}>
                        {service.oneLiner}
                      </p>

                      {/* Primary Metric Tag */}
                      <div className={`px-2.5 py-1.5 rounded-2xs border mb-3 font-mono flex items-center justify-between text-[10px] ${
                        isApex 
                          ? 'bg-[#b8860b]/10 border-[#b8860b]/50 text-amber-300' 
                          : 'bg-zinc-50 border-zinc-200 text-zinc-800'
                      }`}>
                        <span className="text-zinc-400 text-[8px] uppercase tracking-wider">Target Yield:</span>
                        <span className="font-bold">{service.targetOutcome}</span>
                      </div>
                    </div>

                    {/* KEY BENEFITS LIST (COMPACT, BOLD, SCANNABLE) */}
                    <div 
                      className="space-y-2 mb-3 border-t border-b py-2.5 my-auto" 
                      style={{ borderColor: isApex ? 'rgba(184,134,11,0.25)' : 'rgba(0,0,0,0.06)' }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-[8px] uppercase font-mono font-bold tracking-wider ${isApex ? 'text-[#b8860b]' : 'text-zinc-500'}`}>
                          {isApex ? '★ Complete Sovereign Benefits:' : 'Core Institutional Deliverables:'}
                        </span>
                        {isApex && (
                          <span className="text-[8px] font-mono uppercase text-emerald-400 font-bold">
                            Zero Operational Drift
                          </span>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        {service.keyBenefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-[11px] leading-tight font-sans">
                            <CheckCircle className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${isApex ? 'text-[#b8860b] fill-[#b8860b]/20' : 'text-zinc-700'}`} />
                            <div>
                              <strong className={`font-bold ${isApex ? 'text-white' : 'text-zinc-900'}`}>
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

                    {/* Investment & Direct Action */}
                    <div className="pt-1">
                      <div className={`p-2 rounded-2xs border mb-2 font-mono text-[9px] ${
                        isApex 
                          ? 'bg-zinc-900/90 border-[#b8860b]/30 text-zinc-300' 
                          : 'bg-zinc-50 border-zinc-200 text-zinc-600'
                      }`}>
                        <div className="flex items-center justify-between">
                          <span className="text-zinc-400 uppercase text-[8px]">Terms & Structure:</span>
                          <span className={`font-bold ${isApex ? 'text-[#b8860b]' : 'text-zinc-900'}`}>
                            {service.investmentTier}
                          </span>
                        </div>
                        <span className={`block text-[9px] font-serif italic mt-0.5 ${isApex ? 'text-amber-200/90' : 'text-zinc-500'}`}>
                          {service.investmentNote}
                        </span>
                      </div>

                      <button
                        onClick={() => navigate('/intake')}
                        className={`w-full py-2.5 text-[10px] font-mono font-bold uppercase tracking-wider transition-all rounded-xs cursor-pointer shadow-md flex items-center justify-center gap-1.5 ${
                          isApex
                            ? 'bg-gradient-to-r from-[#b8860b] via-amber-400 to-[#b8860b] hover:from-white hover:to-white text-black font-black shadow-lg shadow-[#b8860b]/25 hover:scale-[1.01]'
                            : 'bg-[#111111] hover:bg-[#b8860b] text-white'
                        }`}
                      >
                        <span>{service.ctaText}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      {service.ctaSubtext && (
                        <span className={`block text-center text-[8px] font-mono mt-1 ${isApex ? 'text-amber-300/80 font-bold' : 'text-zinc-400'}`}>
                          {service.ctaSubtext}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Psychological Anchor & Decoy Explanation Banner */}
            <div className="mt-3.5 bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 border border-[#b8860b]/40 p-3 sm:p-3.5 rounded-xs text-white flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#b8860b]/20 border border-[#b8860b]/40 flex items-center justify-center shrink-0">
                  <Crown className="w-4 h-4 text-[#b8860b]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold font-serif text-white">
                    Why 94% of Enterprise Principals Choose <span className="text-[#b8860b]">The Sovereign Retainer</span>:
                  </h4>
                  <p className="text-zinc-300 text-[11px] font-serif italic">
                    Categories 01 & 02 fix yesterday's bottlenecks. The Retainer permanently insulates your personal time, grants a direct 24/7 Red Phone to Suchita Sancheti, and builds an untouchable $10M+ valuation defense.
                  </p>
                </div>
              </div>
              <button
                onClick={() => navigate('/intake')}
                className="px-4 py-2 bg-[#b8860b] hover:bg-white text-black font-mono text-[9px] uppercase font-black tracking-wider rounded-xs transition-all shrink-0 cursor-pointer shadow-md whitespace-nowrap"
              >
                Apply for The 1 Remaining Retainer Seat →
              </button>
            </div>
          </section>
        )}

        {/* =========================================================
            VIEW 2: UNIFIED BENEFITS MATRIX (ALL BENEFITS SIDE-BY-SIDE IN ONE GO)
            WITH PERMANENT GOLD PROMINENCE ON THE SOVEREIGN RETAINER
        ========================================================= */}
        {viewMode === 'matrix' && (
          <section className="mb-6 bg-white border border-zinc-250 rounded-xs overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-zinc-900 text-white font-mono text-[9px] uppercase tracking-wider">
                    <th className="p-3 w-1/4 border-r border-zinc-800">Architectural Dimension</th>
                    <th className="p-3 w-1/4 border-r border-zinc-800">01. 10-Node Forensic Audit</th>
                    <th className="p-3 w-1/4 border-r border-zinc-800">02. 90-Day Sovereign OS</th>
                    <th className="p-3 w-1/4 bg-zinc-950 text-[#b8860b] border-2 border-[#b8860b]">
                      👑 03. The Sovereign Retainer (Apex)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 font-serif">
                  <tr className="hover:bg-zinc-50">
                    <td className="p-3 font-mono font-bold text-[10px] text-zinc-800 bg-zinc-50">Core Purpose</td>
                    <td className="p-3 text-zinc-700 italic">48-Hr Diagnostic snapshot</td>
                    <td className="p-3 text-zinc-700 italic">90-Day protocol installation</td>
                    <td className="p-3 text-zinc-900 font-bold bg-[#b8860b]/10">
                      Permanent Board Seat, 24/7 Red Phone & Complete Immunity
                    </td>
                  </tr>
                  <tr className="hover:bg-zinc-50">
                    <td className="p-3 font-mono font-bold text-[10px] text-zinc-800 bg-zinc-50">Drift Immunity</td>
                    <td className="p-3 text-zinc-500">None (Diagnostic only)</td>
                    <td className="p-3 text-zinc-700">Protected for initial 90 days</td>
                    <td className="p-3 text-zinc-950 font-bold bg-[#b8860b]/10 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#b8860b]" />
                      <span>Permanent (Continuous early-warning telemetry)</span>
                    </td>
                  </tr>
                  <tr className="hover:bg-zinc-50">
                    <td className="p-3 font-mono font-bold text-[10px] text-zinc-800 bg-zinc-50">Principal Direct Line</td>
                    <td className="p-3 text-zinc-600">Single 60-min debrief</td>
                    <td className="p-3 text-zinc-600">Bi-weekly sprints (90 days)</td>
                    <td className="p-3 text-zinc-950 font-bold bg-[#b8860b]/10">
                      24/7 Priority Red Phone (Direct Signal/Hotline access to Suchita Sancheti)
                    </td>
                  </tr>
                  <tr className="hover:bg-zinc-50">
                    <td className="p-3 font-mono font-bold text-[10px] text-zinc-800 bg-zinc-50">Enterprise Valuation Yield</td>
                    <td className="p-3 text-zinc-600">Identifies leak zones</td>
                    <td className="p-3 text-zinc-700">Reduces key-person drag</td>
                    <td className="p-3 text-zinc-950 font-bold bg-[#b8860b]/10">
                      +35% EBITDA Multiple Expansion & continuous M&A protection
                    </td>
                  </tr>
                  <tr className="hover:bg-zinc-50">
                    <td className="p-3 font-mono font-bold text-[10px] text-zinc-800 bg-zinc-50">Investment ROI Equation</td>
                    <td className="p-3 font-mono text-[10px] font-bold text-[#b8860b]">100% Credited to Retainer</td>
                    <td className="p-3 font-mono text-[10px] text-zinc-700">Custom Scope</td>
                    <td className="p-3 font-mono text-[10px] font-bold text-[#b8860b] bg-[#b8860b]/10">
                      All Audits & Protocols Included (~24x Value Multiplier)
                    </td>
                  </tr>
                  <tr className="bg-zinc-50">
                    <td className="p-3 font-mono text-[10px] text-zinc-500">Action</td>
                    <td className="p-3">
                      <button onClick={() => navigate('/intake')} className="px-3 py-1.5 bg-[#111111] hover:bg-[#b8860b] text-white font-mono text-[9px] uppercase font-bold rounded-xs cursor-pointer">
                        Run Diagnostic →
                      </button>
                    </td>
                    <td className="p-3">
                      <button onClick={() => navigate('/intake')} className="px-3 py-1.5 bg-zinc-800 hover:bg-[#b8860b] text-white font-mono text-[9px] uppercase font-bold rounded-xs cursor-pointer">
                        Apply for 90-Day OS →
                      </button>
                    </td>
                    <td className="p-3 bg-[#b8860b]/15">
                      <button onClick={() => navigate('/intake')} className="w-full px-4 py-2 bg-gradient-to-r from-[#b8860b] via-amber-400 to-[#b8860b] hover:from-black hover:to-black hover:text-white text-black font-mono text-[9px] uppercase font-black rounded-xs cursor-pointer shadow-md">
                        Request Retainer Vetting (1 Seat Left) →
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* Institutional Intake Bar */}
        <div className="bg-white border border-[#b8860b]/35 p-3 sm:p-3.5 rounded-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left shadow-2xs mb-8">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-[#b8860b]/10 border border-[#b8860b]/30 flex items-center justify-center shrink-0">
              <Lock className="w-3 h-3 text-[#b8860b]" />
            </div>
            <p className="text-zinc-800 text-xs font-serif italic">
              Strict Institutional Intake: Firm-wide policy strictly limits Suchita Sancheti to <strong className="text-zinc-950 font-bold">4 active Sovereign Retainer mandates</strong> to guarantee uncompromising depth.
            </p>
          </div>
          <button
            onClick={() => navigate('/intake')}
            className="px-3.5 py-1.5 bg-[#111111] hover:bg-[#b8860b] text-white font-mono text-[9px] uppercase font-bold tracking-wider rounded-xs transition-colors shrink-0 cursor-pointer"
          >
            Check Retainer Seat Availability
          </button>
        </div>

        {/* Tailored Institutional Altitude Selector */}
        <section className="mb-8">
          <ExecutiveAltitudeFilter />
        </section>

        {/* =========================================================
            SECTION 2: EXECUTIVE VALUE ARCHITECTURE & PSYCHOLOGICAL PROOF
        ========================================================= */}
        <section className="mb-8 bg-white border border-zinc-200 p-5 sm:p-6 rounded-xs shadow-2xs">
          <div className="max-w-3xl mb-4">
            <span className="text-[#b8860b] text-[9px] font-mono font-bold uppercase tracking-widest block mb-0.5">
              The Sovereign Shield
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-zinc-900">
              Why Elite Chairs & Scale-Up Founders Lock in The Sovereign Retainer
            </h3>
            <p className="text-zinc-600 text-xs sm:text-sm font-serif italic mt-0.5 leading-relaxed">
              When an enterprise scales past $10M–$50M, the greatest financial danger is not lack of ambition—it is <strong>silent operational drift and key-person burnout</strong>. The Retainer creates an impenetrable governance moat.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-3 font-serif text-xs">
            <div className="p-3.5 bg-zinc-50 border border-zinc-200/80 rounded-xs space-y-1 relative overflow-hidden">
              <div className="flex items-center gap-1.5 text-zinc-900 font-bold font-mono text-[10px] uppercase">
                <ShieldAlert className="w-3.5 h-3.5 text-[#b8860b]" />
                <span>01. The $3M Drift Shield</span>
              </div>
              <p className="text-zinc-600 italic leading-relaxed text-[11px]">
                Without continuous early-warning telemetry, executive teams silently revert to old firefighting habits within 6 months, leaking margin and diluting valuation.
              </p>
            </div>

            <div className="p-3.5 bg-zinc-50 border border-zinc-200/80 rounded-xs space-y-1">
              <div className="flex items-center gap-1.5 text-zinc-900 font-bold font-mono text-[10px] uppercase">
                <Zap className="w-3.5 h-3.5 text-[#b8860b]" />
                <span>02. The Red Phone Advantage</span>
              </div>
              <p className="text-zinc-600 italic leading-relaxed text-[11px]">
                Direct, priority advisory access to Suchita Sancheti for high-stakes M&A negotiations, boardroom disputes, executive hiring, and capital allocation.
              </p>
            </div>

            <div className="p-3.5 bg-zinc-50 border border-zinc-200/80 rounded-xs space-y-1">
              <div className="flex items-center gap-1.5 text-zinc-900 font-bold font-mono text-[10px] uppercase">
                <TrendingUp className="w-3.5 h-3.5 text-[#b8860b]" />
                <span>03. +35% Valuation Alpha</span>
              </div>
              <p className="text-zinc-600 italic leading-relaxed text-[11px]">
                Enterprises with decoupled founder dependency and verified board governance command up to 35% higher exit multiples in private equity acquisitions.
              </p>
            </div>
          </div>

          {/* Testimonial / Social Proof Callout */}
          <div className="mt-4 p-3.5 bg-[#fbf9f4] border border-[#b8860b]/30 rounded-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
            <div className="flex items-start gap-2.5">
              <Star className="w-4 h-4 text-[#b8860b] fill-[#b8860b] shrink-0 mt-0.5" />
              <div>
                <p className="text-zinc-900 text-xs font-serif italic">
                  "The Sovereign Retainer is the highest ROI capital expenditure on our balance sheet. It gave me back 18 hours every week, eliminated boardroom friction, and added millions to our enterprise valuation."
                </p>
                <span className="text-[10px] font-mono text-zinc-500 font-bold block mt-0.5">
                  — CEO & Founder, $48M Enterprise Scale-Up (Sovereign Retainer Client)
                </span>
              </div>
            </div>
            <button
              onClick={() => navigate('/intake')}
              className="px-4 py-2 bg-[#111111] hover:bg-[#b8860b] text-white font-mono text-[9px] uppercase font-bold tracking-wider rounded-xs transition-all shrink-0 cursor-pointer shadow-xs whitespace-nowrap"
            >
              Verify Retainer Eligibility →
            </button>
          </div>
        </section>

        {/* =========================================================
            FAQ: ESSENTIAL OBJECTION HANDLING
        ========================================================= */}
        <div className="mt-6 -mx-4 sm:-mx-6">
          <FAQ />
        </div>

      </div>
    </motion.div>
  );
};

export default ServicesPage;
