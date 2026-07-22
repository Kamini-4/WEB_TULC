import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle } from 'lucide-react';
import FAQ from '../../components/FAQ.tsx';

interface Service {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  duration: string;
  description: string;
  price: string;
  billingDetail: string;
  features: string[];
  ctaText: string;
  ctaAction: 'payment' | 'intake';
  paymentUrl?: string;
  isPopular?: boolean;
}

const SERVICES_SPECTRUM: Service[] = [
  {
    id: 'diagnostic',
    badge: 'Phase 0.0',
    title: 'Substrate Diagnostic Audit',
    subtitle: 'Why: To Stop the Silent Hemorrhaging of Your Creative Energy',
    duration: '14-Day Deep Engagement',
    description: 'We care too much to let you guess where your power is leaking. This forensic audit maps your personal decision frequency, identifying exactly where operational friction is stealing your strategic peace. Stop paying the hidden Cognitive Tax today.',
    price: 'Upon Request',
    billingDetail: 'Exclusively structured for founders requiring immediate clarity.',
    features: [
      'Pinpoint exactly where your original strategic intent gets diluted',
      'Receive a custom-mapped Personal Cognitive Bandwidth Blueprint',
      'Expose the 3 primary operational leakages draining your executive focus',
      'A personal, private feedback briefing with Principal Suchita Sancheti',
      'Full credit applied directly to full-scale protocol integration'
    ],
    ctaText: 'Reclaim Your Sanity Now',
    ctaAction: 'intake',
    isPopular: true
  },
  {
    id: 'alignment_protocol',
    badge: 'Phase 01-04',
    title: 'Strategic Alignment Protocol',
    subtitle: 'Why: To Turn Your Vision Into an Inevitable, Self-Governing Force',
    duration: '6-Week Architecture Setup',
    description: 'Our core architectural intervention. We do not write standard recommendation reports; we hard-code your strategic DNA into self-regulating logic gates. We protect your legacy, so you can step out of the daily firefighter loop and return to pure, uninhibited vision.',
    price: 'Upon Request',
    billingDetail: 'A permanent operational vaccine. Only 1 opening remaining this quarter.',
    features: [
      'Establish absolute alignment fidelity down to your frontline teams',
      'Install 12+ customized logic gates to automate daily decision-making',
      'Reclaim up to 40% of your strategic time in the first 90 days',
      'Eradicate the constant meeting-tax and alignment drag forever',
      'Unshakeable organizational permanence that runs autonomously'
    ],
    ctaText: 'Secure Final Q2 Allocation',
    ctaAction: 'intake'
  },
  {
    id: 'board_oversight',
    badge: 'Retainer',
    title: 'Resonance Safeguard Retainer',
    subtitle: 'Why: Because True Permanence Requires Vigilant Stewardship',
    duration: 'Ongoing Strategic Partnership',
    description: 'We walk with you as long-term guardians of your strategic peace. Continuous shadow metrics, drift detection, and immediate intervention structures designed to defend your mental bandwidth against future organizational decay.',
    price: 'Upon Request',
    billingDetail: 'Bespoke ongoing stewardship pricing. Subject to rigorous intake vetting.',
    features: [
      'Bi-annual corporate substrate integrity re-audits',
      'Priority access to Suchita Sancheti for high-stakes decisions',
      'Continuous structural health metrics & early drift alerts',
      'De-risk succession planning and insulate enterprise value',
      'Total cognitive insulation from operational noise'
    ],
    ctaText: 'Apply for Partnership Intake',
    ctaAction: 'intake'
  }
];

const ServicesPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCtaClick = (service: Service) => {
    navigate('/intake');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-[#f5f5f0] min-h-screen pt-4 md:pt-10 pb-16"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section - Client Reality First */}
        <div className="mb-12 text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-8 h-px bg-[#b8860b]" />
            <h2 className="text-[#b8860b] text-xs font-black uppercase tracking-[0.4em]">Targeted Enterprise Interventions</h2>
            <span className="w-8 h-px bg-[#b8860b]" />
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight font-serif text-[#111111]">
            Is Your Enterprise Losing Velocity <br />
            <span className="text-[#b8860b] italic font-light">To Hidden Alignment Friction?</span>
          </h1>
          <div className="h-1 w-20 bg-[#b8860b] mx-auto mb-6"></div>
          <p className="text-base sm:text-lg text-zinc-700 font-light italic leading-relaxed">
            Every operational bottleneck is a design flaw. Before selecting an engagement protocol below, explore how structural latency erodes your bandwidth and why standard executive coaching fails to fix it.
          </p>
        </div>

        {/* 1. Kinetic Latency Analysis - The Cost of Inaction First */}
        <section className="mb-12 max-w-5xl mx-auto bg-zinc-950 text-white border border-red-900/30 p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-radial-gradient from-red-950/20 to-transparent pointer-events-none" />
          <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-gradient-to-tr from-[#b8860b]/5 to-transparent pointer-events-none" />
          
          <div className="relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-red-400 text-[10px] font-mono font-black uppercase tracking-[0.3em] block flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" /> Diagnostic Reality Check
              </span>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold font-serif tracking-tight text-white leading-tight">
                The Cost of Latency:<br />
                Where Board Directives <span className="text-red-400 italic font-light">Lose Fidelity.</span>
              </h3>
              
              <div className="h-[2px] w-16 bg-red-800" />
              
              <p className="text-zinc-300 text-sm leading-relaxed italic font-light">
                You built this company to create enterprise value. Instead, <strong className="text-white font-medium">operational firefighting dominates your calendar</strong>. 
              </p>
              
              <p className="text-zinc-400 text-xs leading-relaxed italic font-light">
                Trapped in the "Heroic Solver" loop, stepping away for 30 days causes growth to plateau, leadership teams to stall, and operations to slide into coordination drag. 
              </p>

              <p className="text-zinc-400 text-xs leading-relaxed italic font-light">
                This is a <strong className="text-white">compounding erosion of your exit valuation and your personal peace</strong>. Every hour spent resolving executive alignment errors is stolen from compounding your ultimate strategic advantage.
              </p>
            </div>
            
            <div className="lg:col-span-5 bg-zinc-900/90 border border-red-900/30 p-5 md:p-6 space-y-4 rounded-xs relative shadow-xl">
              <span className="text-[9px] font-mono font-bold text-red-400 uppercase tracking-widest block">Structural Inaction Impact Index</span>
              
              <div className="space-y-3 font-mono text-[11px]">
                <div className="flex justify-between items-start border-b border-zinc-800/60 pb-2">
                  <span className="text-zinc-500 uppercase text-left">Estimated Annual Leakage:</span>
                  <span className="text-red-400 font-bold text-right">~₹2.4 Cr to ₹15 Cr</span>
                </div>
                <div className="flex justify-between items-start border-b border-zinc-800/60 pb-2">
                  <span className="text-zinc-500 uppercase text-left">Fidelity Decay Rate:</span>
                  <span className="text-red-400 font-bold text-right">15% Loss per Org Layer</span>
                </div>
                <div className="flex justify-between items-start border-b border-zinc-800/60 pb-2">
                  <span className="text-zinc-500 uppercase text-left">Key-Person Discount:</span>
                  <span className="text-red-400 font-bold text-right">Up to 35% Valuation Penalty</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-zinc-500 uppercase text-left">Cognitive Deficit:</span>
                  <span className="text-red-400 font-bold text-right">40% Wasted Bandwidth</span>
                </div>
              </div>

              <div className="bg-red-950/30 border border-red-800/40 p-3 text-xs italic font-light text-zinc-300">
                "Delaying calibration is an active decision to continue leaking your life’s work. Solid architecture is the only permanent antidote."
              </div>

              <button 
                onClick={() => navigate('/assessment')}
                className="w-full py-3 bg-red-950 border border-red-700/60 hover:bg-red-900 hover:border-red-500 text-white text-[9px] font-black uppercase tracking-[0.2em] transition-all"
              >
                Benchmark Your Drift Coefficient
              </button>
            </div>
          </div>
        </section>

        {/* 2. Start With Why / Psychological Care Section */}
        <div className="mb-12 max-w-5xl mx-auto bg-white border border-zinc-200/80 p-6 sm:p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2.5 h-full bg-[#b8860b]" />
          <div className="space-y-4">
            <span className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.3em] block">Our Foundation: Why We Architect</span>
            
            <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 leading-tight font-serif">
              We believe your creative genius is too precious to be consumed by tactical friction.
            </h3>
            
            <p className="text-zinc-600 text-xs sm:text-sm md:text-sm lg:text-base leading-relaxed italic font-light">
              <strong>Why we do what we do:</strong> The traditional corporate world measures success by endurance—how many fires you can extinguish, how much fatigue you can carry. We reject this. We exist because we care deeply about the human behind the title. Elite leadership is not a test of physical survival, but an art of pure strategic transmission. Our entire architecture is built to protect your peace of mind, restore your bandwidth, and ensure your vision executes with absolute fidelity.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-zinc-100">
              <div className="space-y-3">
                <h4 className="text-xs sm:text-sm font-bold text-zinc-900 uppercase tracking-wider">The Hidden Costs You Pay Daily:</h4>
                <ul className="space-y-2 text-xs text-zinc-600 italic font-light">
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-700 font-bold text-sm leading-none">•</span>
                    <span><strong>Decay of Strategic Bandwidth:</strong> Up to 40% of cognitive energy is consumed correcting alignment errors rather than inventing the future.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-700 font-bold text-sm leading-none">•</span>
                    <span><strong>Intent Dilution Tax:</strong> Direct reports execute a diluted version of your strategic vision down the hierarchy.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-700 font-bold text-sm leading-none">•</span>
                    <span><strong>Decision Fatigue:</strong> Compounding psychological exhaustion that slowly drains your personal creative engine.</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-xs sm:text-sm font-bold text-zinc-900 uppercase tracking-wider">Strict Engagement Capacity:</h4>
                <p className="text-xs text-zinc-600 italic font-light leading-relaxed mb-2">
                  To preserve absolute signal quality and zero-dilution focus, Principal Suchita Sancheti maintains strict limits on client onboarding.
                </p>
                <div className="p-3.5 bg-zinc-50 border border-zinc-200/80 rounded-xs">
                  <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider mb-0.5">Quarterly Capacity Limit:</p>
                  <p className="text-xs text-[#b8860b] italic font-semibold">
                    Accepting only <strong className="font-extrabold text-[#b8860b]">3 enterprise calibrations per quarter</strong>. Currently 2 slots are committed. Only 1 opening remains for Q2.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. The Structural Divergence Index (Uncalibrated vs. Calibrated) */}
        <section className="mb-16 max-w-5xl mx-auto bg-white border border-zinc-200/80 p-6 sm:p-8 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#b8860b]/10 to-transparent pointer-events-none" />
          
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.3em] block mb-2 font-mono">Operations Diagnostic</span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900 leading-tight font-serif">The Structural Divergence Index</h3>
            <p className="text-zinc-500 text-xs italic font-medium mt-1">
              Side-by-side comparison of uncalibrated friction nodes versus custom-architected systemic governance.
            </p>
          </div>

          <div className="space-y-6">
            {/* Contrast Header */}
            <div className="grid md:grid-cols-2 gap-4 pb-3 border-b border-zinc-200 text-center font-mono uppercase tracking-widest text-[10px] font-black hidden md:grid">
              <div className="text-red-700 bg-red-50/50 py-2 border border-red-200/40 rounded-xs flex items-center justify-center gap-2">
                <span>✕</span> Uncalibrated Operating Model (Friction & Drag)
              </div>
              <div className="text-emerald-700 bg-emerald-50/50 py-2 border border-emerald-200/40 rounded-xs flex items-center justify-center gap-2">
                <span>✓</span> Calibrated Sovereign Model (Autopilot Execution)
              </div>
            </div>

            {/* Contrast Row 1 */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block font-mono">01. Founder / CEO Bandwidth</span>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50/20 border border-red-200/30 rounded-xs relative">
                  <div className="absolute top-4 right-4 text-red-500 text-xs font-bold font-mono">DRAG</div>
                  <h4 className="text-xs font-bold text-red-800 uppercase tracking-wider mb-1">Cognitive Insolvency</h4>
                  <p className="text-zinc-600 text-xs italic font-light leading-relaxed">
                    Founder trapped spending <strong>60+ hours per week</strong> handling reactive firefighting, double-checking work, and resolving recurring team friction.
                  </p>
                </div>
                <div className="p-4 bg-emerald-50/20 border border-emerald-200/30 rounded-xs relative">
                  <div className="absolute top-4 right-4 text-emerald-600 text-xs font-bold font-mono">CALIBRATED</div>
                  <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">Cognitive Liberation</h4>
                  <p className="text-zinc-600 text-xs italic font-light leading-relaxed">
                    <strong>Reclaims up to 40% of strategic bandwidth</strong> in 90 days. Permanently insulated from daily operational noise.
                  </p>
                </div>
              </div>
            </div>

            {/* Contrast Row 2 */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block font-mono">02. Delegation Fidelity</span>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50/20 border border-red-200/30 rounded-xs relative">
                  <div className="absolute top-4 right-4 text-red-500 text-xs font-bold font-mono">DRAG</div>
                  <h4 className="text-xs font-bold text-red-800 uppercase tracking-wider mb-1">Intent Dilution Tax</h4>
                  <p className="text-zinc-600 text-xs italic font-light leading-relaxed">
                    Strategic intent decays by <strong>~15% with every org layer</strong>. Direct reports execute a diluted version of your original vision.
                  </p>
                </div>
                <div className="p-4 bg-emerald-50/20 border border-emerald-200/30 rounded-xs relative">
                  <div className="absolute top-4 right-4 text-emerald-600 text-xs font-bold font-mono">CALIBRATED</div>
                  <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">Zero-Dilution Parity</h4>
                  <p className="text-zinc-600 text-xs italic font-light leading-relaxed">
                    Strategic reasoning hardcoded directly into <strong>self-cohering decision parameters</strong>. Direct reports execute with 100% precision.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. NOW PRESENT THE SERVICE SPECTRUM / BUYING MENU */}
        <div className="mb-10 text-center max-w-3xl mx-auto">
          <span className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.3em] block mb-2 font-mono">Architectural Solution Menu</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#111111] font-serif">
            Select Your Calibration <span className="text-[#b8860b] italic font-light">Protocol.</span>
          </h2>
          <p className="text-xs text-zinc-500 italic font-medium mt-2">
            Structured for high-growth enterprise founders, VCs, and CEOs seeking immediate cognitive bandwidth reclamation.
          </p>
        </div>

        {/* Pricing Matrix / Buying Menus */}
        <div className="grid lg:grid-cols-3 gap-6 items-stretch mb-16">
          {SERVICES_SPECTRUM.map((service) => {
            const isDiag = service.id === 'diagnostic';
            return (
              <div 
                key={service.id} 
                className={`flex flex-col relative h-full transition-all duration-500 rounded-sm border p-6 bg-white ${
                  service.isPopular 
                    ? 'border-[#b8860b] shadow-[0_15px_40px_rgba(184,134,11,0.12)] ring-1 ring-[#b8860b]/30' 
                    : 'border-zinc-200 hover:border-[#b8860b]/50 shadow-sm'
                }`}
              >
                {service.isPopular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#b8860b] text-white text-[8px] font-black uppercase tracking-[0.2em] rounded-full shadow-md">
                    Immediate Activation Available
                  </span>
                )}

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[#b8860b] px-2.5 py-1 bg-[#b8860b]/10 rounded-xs font-mono">
                      {service.badge}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                      {service.duration}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 mb-1 leading-tight font-serif">{service.title}</h3>
                  <p className="text-xs text-[#b8860b] italic mb-4 font-semibold">{service.subtitle}</p>
                  <p className="text-zinc-600 text-xs sm:text-sm italic font-light leading-relaxed">{service.description}</p>
                </div>

                <div className="my-auto pt-4 pb-6 border-t border-zinc-100/80">
                  <span className="text-[10px] uppercase font-black text-zinc-400 tracking-widest block mb-2 font-mono">Investment Terms</span>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-2xl sm:text-3xl font-extrabold ${isDiag ? 'text-[#b8860b]' : 'text-zinc-900 font-bold'}`}>
                      {service.price}
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-500 italic mt-1 block">{service.billingDetail}</span>
                </div>

                <div className="space-y-2 mb-6">
                  <span className="text-[9px] uppercase font-black text-zinc-400 tracking-widest block font-mono">Structural Deliverables</span>
                  <ul className="space-y-2.5">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex gap-2.5 text-xs text-zinc-700 italic font-light leading-snug">
                        <CheckCircle className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleCtaClick(service)}
                  className={`w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] transition-all mt-auto shadow-md ${
                    service.isPopular
                      ? 'bg-[#111111] text-white hover:bg-[#b8860b]'
                      : 'border border-[#111111] text-[#111111] hover:bg-[#111111] hover:text-white'
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    {service.ctaText} <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Private Calibration Baseline Banner */}
        <div className="mb-10 md:mb-12 max-w-5xl mx-auto bg-gradient-to-r from-[#111111] to-[#1a1a1a] p-5 sm:p-6 md:p-8 border border-[#b8860b]/30 shadow-xl relative overflow-hidden text-left flex flex-col md:flex-row items-center justify-between gap-4 rounded-sm">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#b8860b]/20 to-transparent pointer-events-none" />
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-2 px-2 py-0.5 bg-[#b8860b]/20 border border-[#b8860b]/30 text-[#b8860b] text-[8px] font-black uppercase tracking-[0.25em] rounded-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b8860b] animate-ping" /> Private Alignment Baseline
            </div>
            <h3 className="text-base sm:text-lg md:text-xl font-bold text-white tracking-tight">
              Quantify Your Current Leadership Friction
            </h3>
            <p className="text-zinc-400 text-xs italic font-light leading-relaxed">
              Formally gauge your organization's decision latency coefficient and map your current cognitive bandwidth preservation score. Protected under the highest standard of institutional non-disclosure.
            </p>
          </div>
          <button
            onClick={() => navigate('/assessment')}
            className="w-full md:w-auto px-6 py-3 bg-[#b8860b] hover:bg-white hover:text-zinc-900 text-white text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] transition-all shrink-0 shadow-lg border border-[#b8860b] hover:border-white"
          >
            Start Free Assessment
          </button>
        </div>

        {/* Start With Why / Sinek & Psychological Care Section */}
        <div className="mb-10 md:mb-12 max-w-5xl mx-auto bg-white border border-zinc-200/80 p-5 sm:p-6 md:p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2.5 h-full bg-[#b8860b]" />
          <div className="space-y-4">
            <span className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.3em] block">Our Foundation: Start with Why</span>
            
            <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 leading-tight">
              We believe your brilliance is too precious to be consumed by tactical noise.
            </h3>
            
            <p className="text-zinc-600 text-xs sm:text-sm md:text-sm lg:text-base leading-relaxed italic font-light">
              <strong>Why we do what we do:</strong> The traditional corporate world measures success by endurance—how much fire you can fight, how much fatigue you can carry. We reject this. We exist because we care deeply about the human behind the title. We believe that elite leadership is not a test of survival, but an art of pure creative transmission. Our entire architecture is built to protect your peace of mind, restore your strategic bandwidth, and ensure your original vision propagates with absolute fidelity.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-zinc-100">
              <div className="space-y-3">
                <h4 className="text-xs sm:text-sm font-bold text-zinc-900 uppercase tracking-wider">The Cost of Systemic Friction:</h4>
                <ul className="space-y-2 text-xs text-zinc-600 italic font-light">
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-700 font-bold text-sm leading-none">•</span>
                    <span><strong>Decay of Strategic Bandwidth:</strong> Up to 40% of your cognitive energy is consumed correcting alignment errors rather than designing your organization's future.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-700 font-bold text-sm leading-none">•</span>
                    <span><strong>Intent Dilution Tax:</strong> Your direct reports execute a lower-fidelity version of your strategic vision. The signal decays down the ranks.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-red-700 font-bold text-sm leading-none">•</span>
                    <span><strong>Decision Fatigue & Burnout:</strong> Compounding psychological exhaustion that slowly drains your personal creative engine.</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-xs sm:text-sm font-bold text-zinc-900 uppercase tracking-wider">The Cost of Deferred Alignment:</h4>
                <p className="text-xs text-zinc-600 italic font-light leading-relaxed mb-2">
                  Permitting structural latency to persist is an active operational choice. Over time, this friction cements itself as organizational culture—diluting original strategic vision and quietly compounding executive drag.
                </p>
                <div className="p-3 bg-zinc-50 border border-zinc-200/60 rounded-xs">
                  <p className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider mb-0.5">Exclusive Capacity Threshold:</p>
                  <p className="text-xs text-[#b8860b] italic font-semibold">
                    Suchita Sancheti accepts only <strong className="font-extrabold text-[#b8860b]">3 active corporate calibrations per quarter</strong>. Currently, 2 slots are occupied. Only 1 remains.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Architectural Calibration Benchmark */}
        <section className="mb-10 md:mb-12 max-w-5xl mx-auto bg-zinc-950 text-white border border-red-900/30 p-5 sm:p-6 md:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-radial-gradient from-red-950/20 to-transparent pointer-events-none" />
          <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-gradient-to-tr from-[#b8860b]/5 to-transparent pointer-events-none" />
          
          <div className="relative z-10 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-red-400 text-[10px] font-mono font-black uppercase tracking-[0.3em] block flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" /> Kinetic Latency Analysis
              </span>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold font-sans tracking-tight text-white leading-tight">
                The Cost of Latency:<br />
                Where Board Directives <span className="text-red-400 italic">Lose Fidelity.</span>
              </h3>
              
              <div className="h-[2px] w-16 bg-red-800" />
              
              <p className="text-zinc-300 text-sm leading-relaxed italic font-light">
                You built this company so you could own an asset. Instead, <strong className="text-white font-medium">the asset owns you</strong>. 
              </p>
              
              <p className="text-zinc-400 text-xs leading-relaxed italic font-light">
                You are trapped in the "Heroic Solver" loop. If you step away for just 30 days, your growth plateaus, your leadership team stalls, and operations slide into chaos. The business doesn’t scale without your raw physical presence. 
              </p>

              <p className="text-zinc-400 text-xs leading-relaxed italic font-light">
                This is not just operational drag—it is a <strong className="text-white">compounding erosion of your exit valuation and your personal longevity</strong>. Every single hour you spend resolving executive coordination errors is an hour stolen from compounding your ultimate strategic advantage.
              </p>
            </div>
            
            <div className="lg:col-span-5 bg-zinc-900/80 border border-red-900/20 p-5 md:p-6 space-y-4 rounded-xs relative">
              <span className="text-[9px] font-mono font-bold text-red-400 uppercase tracking-widest block">Structural Inaction Impact Index</span>
              
              <div className="space-y-3 font-mono text-[11px]">
                <div className="flex justify-between items-start border-b border-zinc-800/60 pb-2">
                  <span className="text-zinc-500 uppercase text-left">Estimated Leakage Coefficient:</span>
                  <span className="text-red-400 font-bold text-right">~₹2.4 Cr to ₹15 Cr / Year</span>
                </div>
                <div className="flex justify-between items-start border-b border-zinc-800/60 pb-2">
                  <span className="text-zinc-500 uppercase text-left">Fidelity Decay Rate:</span>
                  <span className="text-red-400 font-bold text-right">15% Loss per Org Layer</span>
                </div>
                <div className="flex justify-between items-start border-b border-zinc-800/60 pb-2">
                  <span className="text-zinc-500 uppercase text-left">Exit Valuation Discount:</span>
                  <span className="text-red-400 font-bold text-right">Up to 35% "Owner-Key" Penalty</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-zinc-500 uppercase text-left">Cognitive Bandwidth Deficit:</span>
                  <span className="text-red-400 font-bold text-right">40% Average Deficit</span>
                </div>
              </div>

              <div className="bg-red-950/20 border border-red-800/30 p-3 text-xs italic font-light text-zinc-300">
                "Delaying calibration is an active decision to continue leaking your life’s work. When you are gone, your systems remain. If there are no systems, there is no legacy."
              </div>

              <button 
                onClick={() => navigate('/assessment')}
                className="w-full py-3 bg-red-950 border border-red-700/60 hover:bg-red-900 hover:border-red-500 text-white text-[9px] font-black uppercase tracking-[0.2em] transition-all"
              >
                Benchmark Your Drift Coefficient
              </button>
            </div>
          </div>
        </section>

        {/* Structural Divergence Index for Institutional Calibration */}
        <section className="mb-10 md:mb-12 max-w-5xl mx-auto bg-white border border-zinc-200/80 p-5 sm:p-6 md:p-8 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#b8860b]/10 to-transparent pointer-events-none" />
          
          <div className="text-center max-w-2xl mx-auto mb-6 md:mb-8">
            <span className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.3em] block mb-2">Institutional Operations Model</span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900 leading-tight">The Structural Divergence Index</h3>
            <p className="text-zinc-500 text-xs italic font-medium mt-1">
              A side-by-side comparative analysis of uncalibrated friction nodes versus custom-architected systemic governance.
            </p>
          </div>

          <div className="space-y-4 md:space-y-6">
            {/* Contrast Header */}
            <div className="grid md:grid-cols-2 gap-4 pb-3 border-b border-zinc-200 text-center font-mono uppercase tracking-widest text-[10px] font-black hidden md:grid">
              <div className="text-red-700 bg-red-50/50 py-2 border border-red-200/40 rounded-xs flex items-center justify-center gap-2">
                <span>✕</span> The Uncalibrated Operating Model (Friction & Drift)
              </div>
              <div className="text-emerald-700 bg-emerald-50/50 py-2 border border-emerald-200/40 rounded-xs flex items-center justify-center gap-2">
                <span>✓</span> The Calibrated Sovereign Model (Autopilot Execution)
              </div>
            </div>

            {/* Contrast Row 1 */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block font-mono">01. Founder / CEO Bandwidth</span>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50/20 border border-red-200/20 hover:border-red-500/20 transition-all rounded-xs relative">
                  <div className="absolute top-4 right-4 text-red-500 text-xs font-bold font-mono">DRAG</div>
                  <h4 className="text-xs font-bold text-red-800 uppercase tracking-wider mb-2">Cognitive Insolvency</h4>
                  <p className="text-zinc-600 text-xs italic font-light leading-relaxed">
                    Founder is trapped spending over <strong>60+ hours per week</strong> handling reactive firefighting, double-checking delegated tasks, and resolving repetitive operational crises. Your strategic mind is bankrupt.
                  </p>
                </div>
                <div className="p-5 bg-emerald-50/20 border border-emerald-200/20 hover:border-emerald-500/20 transition-all rounded-xs relative">
                  <div className="absolute top-4 right-4 text-emerald-600 text-xs font-bold font-mono">CALIBRATED</div>
                  <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">Cognitive Liberation</h4>
                  <p className="text-zinc-600 text-xs italic font-light leading-relaxed">
                    <strong>Reclaims up to 40% of strategic bandwidth</strong> in the first 90 days. You are permanently insulated from daily noise, returned to pure long-term creative vision and uninhibited legacy expansion.
                  </p>
                </div>
              </div>
            </div>

            {/* Contrast Row 2 */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block font-mono">02. Execution & Delegation Fidelity</span>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50/20 border border-red-200/20 hover:border-red-500/20 transition-all rounded-xs relative">
                  <div className="absolute top-4 right-4 text-red-500 text-xs font-bold font-mono">DRAG</div>
                  <h4 className="text-xs font-bold text-red-800 uppercase tracking-wider mb-2">Intent Dilution Tax</h4>
                  <p className="text-zinc-600 text-xs italic font-light leading-relaxed">
                    Your strategic intent decays by approximately <strong>15% with every subsequent layer</strong> of organization. Direct reports execute a lower-fidelity, diluted version of your original vision, causing expensive misalignment.
                  </p>
                </div>
                <div className="p-4 bg-emerald-50/20 border border-emerald-200/20 hover:border-emerald-500/20 transition-all rounded-xs relative">
                  <div className="absolute top-4 right-4 text-emerald-600 text-xs font-bold font-mono">CALIBRATED</div>
                  <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">Absolute Alignment Resonance</h4>
                  <p className="text-zinc-600 text-xs italic font-light leading-relaxed">
                    Your exact strategic reasoning structure and operational values are hard-coded directly into <strong>self-cohering decision parameters</strong>. Direct reports execute with 100% precision, even in your absence.
                  </p>
                </div>
              </div>
            </div>

            {/* Contrast Row 3 */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block font-mono">03. Operational Decision Velocity</span>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50/20 border border-red-200/20 hover:border-red-500/20 transition-all rounded-xs relative">
                  <div className="absolute top-4 right-4 text-red-500 text-xs font-bold font-mono">DRAG</div>
                  <h4 className="text-xs font-bold text-red-800 uppercase tracking-wider mb-2">Meeting-Tax Saturation</h4>
                  <p className="text-zinc-600 text-xs italic font-light leading-relaxed">
                    Operations rely heavily on manual coordination, constant alignment meetings, and committee consensus. Simple decisions require hours of face-to-face friction to execute.
                  </p>
                </div>
                <div className="p-4 bg-emerald-50/20 border border-emerald-200/20 hover:border-emerald-500/20 transition-all rounded-xs relative">
                  <div className="absolute top-4 right-4 text-emerald-600 text-xs font-bold font-mono">CALIBRATED</div>
                  <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">Logic-Gate Automation</h4>
                  <p className="text-zinc-600 text-xs italic font-light leading-relaxed">
                    We install <strong>12+ customized operational logic gates</strong> that automate daily decision paths. Systemic coordination costs are dissolved, boosting decision velocity by up to <strong>10x</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Contrast Row 4 */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block font-mono">04. Organizational Permanence & Enterprise Value</span>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-red-50/20 border border-red-200/20 hover:border-red-500/20 transition-all rounded-xs relative">
                  <div className="absolute top-4 right-4 text-red-500 text-xs font-bold font-mono">DRAG</div>
                  <h4 className="text-xs font-bold text-red-800 uppercase tracking-wider mb-2">Extreme Person-Dependency</h4>
                  <p className="text-zinc-600 text-xs italic font-light leading-relaxed">
                    The company is heavily dependent on your daily physical presence. If you step away for a week, strategic momentum stalls, operations freeze, and Enterprise value experiences sudden degradation.
                  </p>
                </div>
                <div className="p-4 bg-emerald-50/20 border border-emerald-200/20 hover:border-emerald-500/20 transition-all rounded-xs relative">
                  <div className="absolute top-4 right-4 text-emerald-600 text-xs font-bold font-mono">CALIBRATED</div>
                  <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">Institutional Sovereignty</h4>
                  <p className="text-zinc-600 text-xs italic font-light leading-relaxed">
                    We transition your firm from "Hero" dependency to a <strong>self-governing structural asset</strong>. The company compounds and thrives seamlessly on autopilot, de-risking succession and maximizing valuation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider italic">
              Stop paying the compound Inaction Tax. Recalibrate your operating system today.
            </span>
            <div className="flex gap-4">
              <button 
                onClick={() => navigate('/assessment')}
                className="px-6 py-2.5 bg-zinc-950 text-white hover:bg-[#b8860b] text-[9px] font-black uppercase tracking-widest transition-all"
              >
                Calculate Your Friction Index
              </button>
            </div>
          </div>
        </section>

        {/* 03. Low-Friction Modular Engagement Entry - Shifted from Home */}
        <div className="mt-16 md:mt-24 -mx-6 md:-mx-12">
          <section className="py-24 sm:py-32 bg-[#111111] text-white overflow-hidden relative">
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #b8860b 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
            <div className="max-w-7xl mx-auto px-6 relative z-10">
              <div className="grid lg:grid-cols-12 gap-16 md:gap-24 items-center">
                <div className="lg:col-span-7 text-left">
                  <h2 className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.4em] mb-6">Modular Entry Track</h2>
                  <h3 className="text-4xl md:text-6xl font-bold mb-8 leading-[1.1]">
                    Neutralize <span className="italic text-[#b8860b]">Risk.</span> <br />
                    Verify the <span className="italic font-light">Signal.</span>
                  </h3>
                  <p className="text-zinc-200 text-base md:text-lg leading-relaxed mb-10 italic font-light max-w-2xl">
                    For principals requiring architectural proof before full institutional integration. A 14-day high-fidelity diagnostic of your leadership substrate.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-6 mb-10">
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-px bg-[#b8860b] mt-3" />
                      <div>
                        <h4 className="font-bold text-xs uppercase tracking-widest mb-1">Cognitive Calibration</h4>
                        <p className="text-[11px] text-zinc-400 italic">Mapping your personal decision frequency.</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-px bg-[#b8860b] mt-3" />
                      <div>
                        <h4 className="font-bold text-xs uppercase tracking-widest mb-1">Logic Leak Audit</h4>
                        <p className="text-[11px] text-zinc-400 italic">Identifying the 30% bandwidth drain.</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <button 
                      onClick={() => navigate('/intake')}
                      className="px-8 py-4 bg-[#b8860b] text-white text-[9px] font-black uppercase tracking-[0.25em] hover:bg-white hover:text-black transition-all shadow-[0_0_50px_rgba(184,134,11,0.2)]"
                    >
                      Inquire for Diagnostic Audit
                    </button>
                    <div>
                      <div className="text-[9px] font-black uppercase text-[#b8860b] tracking-widest mb-0.5">Pricing Model</div>
                      <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Upon Request</div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-5">
                  <div className="aspect-[4/5] bg-zinc-900 border border-white/10 p-1 flex flex-col items-center justify-center relative group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#b8860b]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <div className="w-12 h-12 border-2 border-[#b8860b] mb-6 rotate-45 flex items-center justify-center">
                      <div className="w-4 h-4 bg-[#b8860b]/50 animate-pulse" />
                    </div>
                    <h4 className="text-xl font-bold italic mb-2">Phase 0.0</h4>
                    <div className="text-[9px] font-black uppercase tracking-[0.5em] text-[#b8860b] mb-6">Diagnostic Protocol</div>
                    <ul className="text-center space-y-2 text-zinc-300 text-xs italic font-light">
                      <li>Institutional Telemetry Scan</li>
                      <li>Principal Logic Synthesis</li>
                      <li>Substrate Integrity Report</li>
                      <li>Execution Velocity Map</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>



        {/* Strategic Objection Handling - FAQ */}
        <div className="mt-16 md:mt-24 -mx-6 md:-mx-12">
          <FAQ />
        </div>

      </div>
    </motion.div>
  );
};

export default ServicesPage;
