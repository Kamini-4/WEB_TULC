import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield, Sparkles, Zap, ArrowRight, CheckCircle, Calculator, Building, Users, Clock, AlertTriangle } from 'lucide-react';

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
  const [selectedService, setSelectedService] = useState<string>('diagnostic');
  const [revenue, setRevenue] = useState<number>(500); // in Crores
  const [headcount, setHeadcount] = useState<number>(10); // number of direct reports
  const [meetingHours, setMeetingHours] = useState<number>(25); // meetings per week

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Calculate estimated Cognitive Tax based on sliders
  const cognitiveTaxCost = useMemo(() => {
    // Basic conceptual math for opportunity cost of leadership friction in INR Rupees
    // revenue is Cr, so revenue * 10,000,000 Rupees
    const executiveHourValue = (revenue * 10000000) / 2000; // estimated output value per hour
    const weeklyLostHours = meetingHours * 0.4; // 40% estimated meeting waste / cognitive tax
    const annualLostOpportunityValue = executiveHourValue * weeklyLostHours * 48; // 48 active weeks
    return Math.round(annualLostOpportunityValue);
  }, [revenue, meetingHours]);

  const formatCurrency = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Crores`;
    }
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(1)} Lakhs`;
    }
    return `₹${val.toLocaleString('en-IN')}`;
  };

  const handleCtaClick = (service: Service) => {
    navigate('/intake');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-[#f5f5f0] min-h-screen pt-4 md:pt-12 pb-24"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="mb-20 text-center max-w-4xl mx-auto">
          <h2 className="text-[#b8860b] text-xs font-black uppercase tracking-[0.4em] mb-4">The Alignment Spectrum</h2>
          <h1 className="text-4xl md:text-7xl font-bold mb-8 leading-tight">
            Institutional <span className="text-[#b8860b] italic">Services.</span>
          </h1>
          <div className="h-1 w-24 bg-[#b8860b] mx-auto mb-10"></div>
          <p className="text-xl text-zinc-600 font-light italic leading-relaxed">
            Every operational bottleneck is a design flaw. Our service engagements are engineered to isolate, neutralize, and restructure your leadership operating systems.
          </p>
        </div>

        {/* Private Calibration Baseline Banner */}
        <div className="mb-20 max-w-5xl mx-auto bg-gradient-to-r from-[#111111] to-[#1a1a1a] p-6 sm:p-8 border border-[#b8860b]/30 shadow-2xl relative overflow-hidden text-left flex flex-col md:flex-row items-center justify-between gap-6 rounded-sm">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#b8860b]/20 to-transparent pointer-events-none" />
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#b8860b]/20 border border-[#b8860b]/30 text-[#b8860b] text-[8px] font-black uppercase tracking-[0.25em] rounded-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b8860b] animate-ping" /> Private Alignment Baseline
            </div>
            <h3 className="text-lg md:text-xl font-bold text-white tracking-tight">
              Quantify Your Current Leadership Friction
            </h3>
            <p className="text-zinc-400 text-xs italic font-light leading-relaxed">
              Formally gauge your organization's decision latency coefficient and map your current cognitive bandwidth preservation score. Protected under the highest standard of institutional non-disclosure.
            </p>
          </div>
          <button
            onClick={() => navigate('/assessment')}
            className="w-full md:w-auto px-8 py-4 bg-[#b8860b] hover:bg-white hover:text-zinc-900 text-white text-[9px] font-black uppercase tracking-[0.2em] transition-all shrink-0 shadow-lg border border-[#b8860b] hover:border-white"
          >
            Start Free Assessment
          </button>
        </div>

        {/* Start With Why / Sinek & Psychological Care Section */}
        <div className="mb-20 max-w-5xl mx-auto bg-white border border-zinc-200/80 p-8 md:p-12 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-2.5 h-full bg-[#b8860b]" />
          <div className="space-y-6">
            <span className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.3em] block">Our Foundation: Start with Why</span>
            
            <h3 className="text-3xl md:text-4xl font-bold text-zinc-900 leading-tight">
              We believe your brilliance is too precious to be consumed by tactical noise.
            </h3>
            
            <p className="text-zinc-600 text-base leading-relaxed italic font-light">
              <strong>Why we do what we do:</strong> The traditional corporate world measures success by endurance—how much fire you can fight, how much fatigue you can carry. We reject this. We exist because we care deeply about the human behind the title. We believe that elite leadership is not a test of survival, but an art of pure creative transmission. Our entire architecture is built to protect your peace of mind, restore your strategic bandwidth, and ensure your original vision propagates with absolute fidelity.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-zinc-100">
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">The Cost of Systemic Friction:</h4>
                <ul className="space-y-3 text-xs text-zinc-600 italic font-light">
                  <li className="flex items-start gap-3">
                    <span className="text-red-700 font-bold text-sm leading-none">•</span>
                    <span><strong>Decay of Strategic Bandwidth:</strong> Up to 40% of your cognitive energy is consumed correcting alignment errors rather than designing your organization's future.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-700 font-bold text-sm leading-none">•</span>
                    <span><strong>Intent Dilution Tax:</strong> Your direct reports execute a lower-fidelity version of your strategic vision. The signal decays down the ranks.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-red-700 font-bold text-sm leading-none">•</span>
                    <span><strong>Decision Fatigue & Burnout:</strong> Compounding psychological exhaustion that slowly drains your personal creative engine.</span>
                  </li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">The Cost of Deferred Alignment:</h4>
                <p className="text-xs text-zinc-600 italic font-light leading-relaxed mb-2">
                  Permitting structural latency to persist is an active operational choice. Over time, this friction cements itself as organizational culture—diluting original strategic vision and quietly compounding executive drag.
                </p>
                <div className="p-4 bg-zinc-50 border border-zinc-200/60 rounded-xs">
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1">Exclusive Capacity Threshold:</p>
                  <p className="text-xs text-[#b8860b] italic font-semibold">
                    Suchita Sancheti accepts only <strong className="font-extrabold text-[#b8860b]">3 active corporate calibrations per quarter</strong>. Currently, 2 slots are occupied. Only 1 remains.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Architectural Calibration Benchmark */}
        <section className="mb-24 max-w-5xl mx-auto bg-zinc-950 text-white border border-red-900/30 p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-radial-gradient from-red-950/20 to-transparent pointer-events-none" />
          <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-gradient-to-tr from-[#b8860b]/5 to-transparent pointer-events-none" />
          
          <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-red-400 text-[10px] font-mono font-black uppercase tracking-[0.3em] block flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" /> Kinetic Latency Analysis
              </span>
              <h3 className="text-3xl md:text-5xl font-bold font-sans tracking-tight text-white leading-tight">
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
            
            <div className="lg:col-span-5 bg-zinc-900/80 border border-red-900/20 p-6 md:p-8 space-y-6 rounded-xs relative">
              <span className="text-[9px] font-mono font-bold text-red-400 uppercase tracking-widest block">Structural Inaction Impact Index</span>
              
              <div className="space-y-4 font-mono text-[11px]">
                <div className="flex justify-between items-start border-b border-zinc-800/60 pb-3">
                  <span className="text-zinc-500 uppercase text-left">Estimated Leakage Coefficient:</span>
                  <span className="text-red-400 font-bold text-right">~₹2.4 Cr to ₹15 Cr / Year</span>
                </div>
                <div className="flex justify-between items-start border-b border-zinc-800/60 pb-3">
                  <span className="text-zinc-500 uppercase text-left">Fidelity Decay Rate:</span>
                  <span className="text-red-400 font-bold text-right">15% Loss per Org Layer</span>
                </div>
                <div className="flex justify-between items-start border-b border-zinc-800/60 pb-3">
                  <span className="text-zinc-500 uppercase text-left">Exit Valuation Discount:</span>
                  <span className="text-red-400 font-bold text-right">Up to 35% "Owner-Key" Penalty</span>
                </div>
                <div className="flex justify-between items-start">
                  <span className="text-zinc-500 uppercase text-left">Cognitive Bandwidth Deficit:</span>
                  <span className="text-red-400 font-bold text-right">40% Average Deficit</span>
                </div>
              </div>

              <div className="bg-red-950/20 border border-red-800/30 p-4 text-xs italic font-light text-zinc-300">
                "Delaying calibration is an active decision to continue leaking your life’s work. When you are gone, your systems remain. If there are no systems, there is no legacy."
              </div>

              <button 
                onClick={() => navigate('/assessment')}
                className="w-full py-4 bg-red-950 border border-red-700/60 hover:bg-red-900 hover:border-red-500 text-white text-[9px] font-black uppercase tracking-[0.2em] transition-all"
              >
                Benchmark Your Drift Coefficient
              </button>
            </div>
          </div>
        </section>

        {/* Structural Divergence Index for Institutional Calibration */}
        <section className="mb-24 max-w-5xl mx-auto bg-white border border-zinc-200/80 p-8 md:p-12 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#b8860b]/10 to-transparent pointer-events-none" />
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.3em] block mb-3">Institutional Operations Model</span>
            <h3 className="text-3xl font-bold text-zinc-900 leading-tight">The Structural Divergence Index</h3>
            <p className="text-zinc-500 text-xs italic font-medium mt-2">
              A side-by-side comparative analysis of uncalibrated friction nodes versus custom-architected systemic governance.
            </p>
          </div>

          <div className="space-y-8">
            {/* Contrast Header */}
            <div className="grid md:grid-cols-2 gap-6 pb-4 border-b border-zinc-200 text-center font-mono uppercase tracking-widest text-[10px] font-black hidden md:grid">
              <div className="text-red-700 bg-red-50/50 py-3 border border-red-200/40 rounded-xs flex items-center justify-center gap-2">
                <span>✕</span> The Uncalibrated Operating Model (Friction & Drift)
              </div>
              <div className="text-emerald-700 bg-emerald-50/50 py-3 border border-emerald-200/40 rounded-xs flex items-center justify-center gap-2">
                <span>✓</span> The Calibrated Sovereign Model (Autopilot Execution)
              </div>
            </div>

            {/* Contrast Row 1 */}
            <div className="space-y-2">
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block font-mono">01. Founder / CEO Bandwidth</span>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-5 bg-red-50/20 border border-red-200/20 hover:border-red-500/20 transition-all rounded-xs relative">
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
            <div className="space-y-2">
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block font-mono">02. Execution & Delegation Fidelity</span>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-5 bg-red-50/20 border border-red-200/20 hover:border-red-500/20 transition-all rounded-xs relative">
                  <div className="absolute top-4 right-4 text-red-500 text-xs font-bold font-mono">DRAG</div>
                  <h4 className="text-xs font-bold text-red-800 uppercase tracking-wider mb-2">Intent Dilution Tax</h4>
                  <p className="text-zinc-600 text-xs italic font-light leading-relaxed">
                    Your strategic intent decays by approximately <strong>15% with every subsequent layer</strong> of organization. Direct reports execute a lower-fidelity, diluted version of your original vision, causing expensive misalignment.
                  </p>
                </div>
                <div className="p-5 bg-emerald-50/20 border border-emerald-200/20 hover:border-emerald-500/20 transition-all rounded-xs relative">
                  <div className="absolute top-4 right-4 text-emerald-600 text-xs font-bold font-mono">CALIBRATED</div>
                  <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">Absolute Alignment Resonance</h4>
                  <p className="text-zinc-600 text-xs italic font-light leading-relaxed">
                    Your exact strategic reasoning structure and operational values are hard-coded directly into <strong>self-cohering decision parameters</strong>. Direct reports execute with 100% precision, even in your absence.
                  </p>
                </div>
              </div>
            </div>

            {/* Contrast Row 3 */}
            <div className="space-y-2">
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block font-mono">03. Operational Decision Velocity</span>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-5 bg-red-50/20 border border-red-200/20 hover:border-red-500/20 transition-all rounded-xs relative">
                  <div className="absolute top-4 right-4 text-red-500 text-xs font-bold font-mono">DRAG</div>
                  <h4 className="text-xs font-bold text-red-800 uppercase tracking-wider mb-2">Meeting-Tax Saturation</h4>
                  <p className="text-zinc-600 text-xs italic font-light leading-relaxed">
                    Operations rely heavily on manual coordination, constant alignment meetings, and committee consensus. Simple decisions require hours of face-to-face friction to execute.
                  </p>
                </div>
                <div className="p-5 bg-emerald-50/20 border border-emerald-200/20 hover:border-emerald-500/20 transition-all rounded-xs relative">
                  <div className="absolute top-4 right-4 text-emerald-600 text-xs font-bold font-mono">CALIBRATED</div>
                  <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">Logic-Gate Automation</h4>
                  <p className="text-zinc-600 text-xs italic font-light leading-relaxed">
                    We install <strong>12+ customized operational logic gates</strong> that automate daily decision paths. Systemic coordination costs are dissolved, boosting decision velocity by up to <strong>10x</strong>.
                  </p>
                </div>
              </div>
            </div>

            {/* Contrast Row 4 */}
            <div className="space-y-2">
              <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest block font-mono">04. Organizational Permanence & Enterprise Value</span>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-5 bg-red-50/20 border border-red-200/20 hover:border-red-500/20 transition-all rounded-xs relative">
                  <div className="absolute top-4 right-4 text-red-500 text-xs font-bold font-mono">DRAG</div>
                  <h4 className="text-xs font-bold text-red-800 uppercase tracking-wider mb-2">Extreme Person-Dependency</h4>
                  <p className="text-zinc-600 text-xs italic font-light leading-relaxed">
                    The company is heavily dependent on your daily physical presence. If you step away for a week, strategic momentum stalls, operations freeze, and Enterprise value experiences sudden degradation.
                  </p>
                </div>
                <div className="p-5 bg-emerald-50/20 border border-emerald-200/20 hover:border-emerald-500/20 transition-all rounded-xs relative">
                  <div className="absolute top-4 right-4 text-emerald-600 text-xs font-bold font-mono">CALIBRATED</div>
                  <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2">Institutional Sovereignty</h4>
                  <p className="text-zinc-600 text-xs italic font-light leading-relaxed">
                    We transition your firm from "Hero" dependency to a <strong>self-governing structural asset</strong>. The company compounds and thrives seamlessly on autopilot, de-risking succession and maximizing valuation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-4">
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

        {/* Pricing Matrix / Buying Menus */}
        <div className="grid lg:grid-cols-3 gap-8 items-stretch mb-24">
          {SERVICES_SPECTRUM.map((service) => {
            const isDiag = service.id === 'diagnostic';
            return (
              <div 
                key={service.id} 
                className={`flex flex-col relative h-full transition-all duration-500 rounded-sm border p-8 bg-white ${
                  service.isPopular 
                    ? 'border-[#b8860b] shadow-[0_15px_40px_rgba(184,134,11,0.08)] ring-1 ring-[#b8860b]/20' 
                    : 'border-zinc-200 hover:border-[#b8860b]/50 shadow-sm'
                }`}
              >
                {service.isPopular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#b8860b] text-white text-[8px] font-black uppercase tracking-[0.2em] rounded-full">
                    Immediate Activation Available
                  </span>
                )}

                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[#b8860b] px-2.5 py-1 bg-[#b8860b]/10 rounded-xs">
                      {service.badge}
                    </span>
                    <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
                      {service.duration}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-900 mb-1 leading-tight">{service.title}</h3>
                  <p className="text-xs text-zinc-500 italic mb-6 font-medium">{service.subtitle}</p>
                  <p className="text-zinc-600 text-sm italic font-light leading-relaxed">{service.description}</p>
                </div>

                <div className="my-auto pt-4 pb-8 border-t border-zinc-100/80">
                  <span className="text-[10px] uppercase font-black text-zinc-400 tracking-widest block mb-2">Cost Price & Investment</span>
                  <div className="flex items-baseline gap-2">
                    <span className={`text-4xl font-extrabold ${isDiag ? 'text-[#b8860b]' : 'text-zinc-900 font-bold'}`}>
                      {service.price}
                    </span>
                  </div>
                  <span className="text-[10px] text-zinc-500 italic mt-1 block">{service.billingDetail}</span>
                </div>

                <div className="space-y-4 mb-10">
                  <span className="text-[9px] uppercase font-black text-zinc-400 tracking-widest block">Structural Inclusions</span>
                  <ul className="space-y-3.5">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex gap-3 text-xs text-zinc-700 italic font-light leading-snug">
                        <CheckCircle className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => handleCtaClick(service)}
                  className={`w-full py-5 text-[10px] font-black uppercase tracking-[0.2em] transition-all-500 mt-auto shadow-sm ${
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

        {/* Custom Interactive Calculator - Cognitive Equity Estimator */}
        <section className="bg-zinc-950 text-white rounded-sm p-8 md:p-14 overflow-hidden relative border border-[#b8860b]/20">
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#b8860b]/5 to-transparent pointer-events-none" />
          
          <div className="grid lg:grid-cols-12 gap-16 items-center relative z-10">
            <div className="lg:col-span-6 space-y-8">
              <div className="inline-flex items-center gap-3 bg-[#b8860b]/10 text-[#b8860b] px-4 py-2 rounded-xs border border-[#b8860b]/20">
                <Calculator className="w-4 h-4" />
                <span className="text-[10px] uppercase font-black tracking-widest">Alignment Estimator</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                Quantify Your <br />
                <span className="text-[#b8860b] italic">Cognitive Tax.</span>
              </h2>
              <p className="text-zinc-400 text-sm italic font-light leading-relaxed">
                Strategic drift and un-automated execution represent a major hidden loss. Drag the coordinates below to isolate your firm's metabolic leak.
              </p>

              {/* Slider Controls */}
              <div className="space-y-8 pt-4">
                <div>
                  <div className="flex justify-between items-center mb-3 text-xs uppercase tracking-widest text-zinc-300">
                    <span className="flex items-center gap-2"><Building className="w-3.5 h-3.5 text-zinc-500" /> Annual Org Revenue</span>
                    <span className="font-bold text-[#b8860b]">₹{revenue} Cr</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="2000" 
                    value={revenue} 
                    onChange={(e) => setRevenue(Number(e.target.value))}
                    className="w-full accent-[#b8860b] bg-zinc-800 h-1 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-zinc-500 mt-1 uppercase tracking-widest">
                    <span>₹10 Cr</span>
                    <span>₹2,000 Cr+</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3 text-xs uppercase tracking-widest text-zinc-300">
                    <span className="flex items-center gap-2"><Users className="w-3.5 h-3.5 text-zinc-500" /> Direct Reports / Leaders</span>
                    <span className="font-bold text-[#b8860b]">{headcount} Leaders</span>
                  </div>
                  <input 
                    type="range" 
                    min="3" 
                    max="45" 
                    value={headcount} 
                    onChange={(e) => setHeadcount(Number(e.target.value))}
                    className="w-full accent-[#b8860b] bg-zinc-800 h-1 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-zinc-500 mt-1 uppercase tracking-widest">
                    <span>3 Key Players</span>
                    <span>45+ Enterprise Roles</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3 text-xs uppercase tracking-widest text-zinc-300">
                    <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-zinc-500" /> Tactical Meeting Hours / Wk</span>
                    <span className="font-bold text-[#b8860b]">{meetingHours} Hours</span>
                  </div>
                  <input 
                    type="range" 
                    min="5" 
                    max="60" 
                    value={meetingHours} 
                    onChange={(e) => setMeetingHours(Number(e.target.value))}
                    className="w-full accent-[#b8860b] bg-zinc-800 h-1 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-zinc-500 mt-1 uppercase tracking-widest">
                    <span>5 Hrs (Lean)</span>
                    <span>60 Hrs (Saturated)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-zinc-900 border border-white/5 p-8 md:p-10 relative rounded-sm flex flex-col justify-between h-full">
                <div className="absolute top-4 right-4 text-[#b8860b]/20">
                  <AlertTriangle className="w-16 h-16" />
                </div>

                <div className="space-y-6">
                  <span className="text-[10px] font-black uppercase text-zinc-500 tracking-[0.25em] block">Leaked Cognitive Equity Summary</span>
                  
                  <div>
                    <span className="text-zinc-400 text-xs italic font-light block mb-1">Estimated Annual Inaction Tax</span>
                    <div className="text-3xl md:text-5xl font-extrabold text-[#b8860b] tracking-tight">
                      {formatCurrency(cognitiveTaxCost)}
                    </div>
                  </div>

                  <div className="h-px bg-white/10" />

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#b8860b] mt-1.5" />
                      <p className="text-xs text-zinc-400 italic">
                        Estimated <strong className="text-white">{(meetingHours * 0.4).toFixed(0)} hours per week</strong> of key leadership attention spent resolving systemic variances rather than compounding strategic advantage.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#b8860b] mt-1.5" />
                      <p className="text-xs text-zinc-400 italic">
                        Current organizational velocity coefficient is throttled. Strategic decisions require <strong className="text-white">3.5x</strong> more coordination labor than custom logic-gate baselines.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 p-6 bg-[#b8860b]/5 border border-[#b8860b]/20 flex flex-col sm:flex-row items-center gap-6 justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-1">Audit Your Substrate</h4>
                    <p className="text-[10px] text-zinc-400 italic">Request your Phase 0.0 Diagnostic to engineer absolute performance.</p>
                  </div>
                  <button 
                    onClick={() => navigate('/intake')}
                    className="px-8 py-3.5 bg-[#b8860b] text-white hover:bg-white hover:text-black text-[9px] font-black uppercase tracking-widest transition-all shrink-0"
                  >
                    Request Audit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </motion.div>
  );
};

export default ServicesPage;
