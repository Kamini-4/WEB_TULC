import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle, 
  Calculator, 
  FileText, 
  Layers, 
  Shield, 
  Brain, 
  GitMerge, 
  Cpu, 
  Users, 
  Lock, 
  TrendingUp, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import FAQ from '../../components/FAQ.tsx';
import OperationalDeliverablesMatrix from '../../components/OperationalDeliverablesMatrix.tsx';
import { GooglePreferredSource } from '../../components/GooglePreferredSource.tsx';

interface Service {
  id: string;
  badge: string;
  tier: string;
  title: string;
  subtitle: string;
  duration: string;
  targetAudience: string;
  description: string;
  price: string;
  billingDetail: string;
  features: string[];
  ctaText: string;
  ctaAction: 'payment' | 'intake';
  isPopular?: boolean;
}

const THREE_SUBSTRATES = [
  {
    id: 'cognitive',
    number: '01',
    name: 'The Cognitive Substrate',
    tagline: "The Founder's Apex Heuristics & Decision Envelopes",
    icon: Brain,
    description: "The mental operating system of the founder. When a company scales past 50 people, the founder's raw intuitive judgment becomes the primary bottleneck. We mathematically codify your implicit trade-offs, risk thresholds, and capital allocation criteria into explicit, transferable decision parameters.",
    metrics: [
      { label: 'Reclaimed Bandwidth', value: '15+ Hrs/Week' },
      { label: 'Decision Latency Reduction', value: '78%' },
      { label: 'CEO Burnout Protection', value: 'Permanent' }
    ],
    symptoms: 'Constant Slack approvals, double-checking executive work, feeling like the sole problem-solver in the room.'
  },
  {
    id: 'relational',
    number: '02',
    name: 'The Relational Substrate',
    tagline: 'Middle-Management Friction & Translation Fidelity',
    icon: GitMerge,
    description: "The human transmission layer between the C-Suite and the frontline. Intent decays by ~15% at every organizational tier. We eliminate interpersonal political drag, align incentives mathematically, and establish 100% translation fidelity so direct reports execute with the exact judgment of the founder.",
    metrics: [
      { label: 'Execution Parity', value: '100% Zero-Loss' },
      { label: 'Coordination Meeting Cut', value: 'Up to 60%' },
      { label: 'Cross-Functional Speed', value: '3.4x Velocity' }
    ],
    symptoms: 'Recurring status meetings that resolve nothing, passive escalation of trade-offs, finger-pointing across departments.'
  },
  {
    id: 'structural',
    number: '03',
    name: 'The Structural Substrate',
    tagline: 'The 12 Invariant Logic Gates & Autonomous Operating Code',
    icon: Cpu,
    description: "The autonomous architecture embedded into your daily tools. We hard-code 12 immutable Logic Gates directly into your communications, ERP, and workflows—enabling autonomous capital deployment, automated escalation filters, and asynchronous broadcasts that run seamlessly without founder intervention.",
    metrics: [
      { label: 'Autonomous Gateways', value: '12 Logic Gates' },
      { label: 'Step-Away Continuity', value: '30+ Days Verified' },
      { label: 'Valuation Multiple Moat', value: '+35% Enterprise Value' }
    ],
    symptoms: 'Company stalls when founder takes a 2-week vacation, unsealed capital approvals leaking cash, reliance on key-person memory.'
  }
];

const TEN_NODES = [
  { role: 'The Apex Chair & CEO', count: '1 Stakeholder', focus: 'Strategic Intent, Sovereign Horizon, Capital Thresholds' },
  { role: 'Key C-Suite (COO, CFO, CTO)', count: '2–3 Stakeholders', focus: 'Operational Friction, Allocation Drag, Resource Contention' },
  { role: 'Legal & Governance Guardians', count: '1–2 Stakeholders', focus: 'Fiduciary Envelopes, Regulatory Exposure, Risk Perimeter' },
  { role: 'Long-Tenured Institutional Memory', count: '1–2 Stakeholders', focus: 'Cultural Drift, Historical Bottlenecks, Tacit Workarounds' },
  { role: 'Frontline Edge Delivery Operators', count: '2–3 Stakeholders', focus: 'Customer Telemetry, Ground-Level Latency, Daily Friction' }
];

const COMMERCIAL_MANDATES: Service[] = [
  {
    id: 'diagnostic',
    badge: 'Phase 0.0 • High-Velocity Entry',
    tier: 'Mandate I',
    title: '10-Node Institutional Triangulation Audit',
    subtitle: 'Zero-Disruption Cross-Sectional Telemetry & Bandwidth Blueprint',
    duration: '10-Stakeholder Pulse • 48-Hour Clinical Readout',
    targetAudience: 'Founders & Board Chairs requiring empirical proof before full institutional integration.',
    description: 'A forensic diagnostic mapping decision cycle times across the 10 vital nervous nodes of your enterprise. Mathematically exposes the exact 2.0-point translation gap between boardroom intent and frontline reality with zero operational disruption.',
    price: 'Upon Request',
    billingDetail: '100% investment credit applied directly toward full-scale protocol integration.',
    features: [
      'Simultaneous 10-node cross-sectional telemetry (Apex → CXOs → Legal → Veterans → Edge)',
      'Quantified 6-Page Confidential Board Dossier & Cognitive Bandwidth Blueprint',
      'Pinpoint the 3 primary unsealed logic gates draining founder bandwidth',
      'Private 60-Minute Adversarial & Feedback Briefing with Principal Suchita Sancheti',
      'Full investment credit applied directly toward 90-Day Sovereign Transformation'
    ],
    ctaText: 'Initiate 10-Node Diagnostic Intake',
    ctaAction: 'intake',
    isPopular: true
  },
  {
    id: 'alignment_protocol',
    badge: 'Phases 01–03 • Core Transformation',
    tier: 'Mandate II',
    title: 'The Sovereign Enterprise Transformation',
    subtitle: 'Full 3-Substrate Calibration & 12 Logic Gates Installation',
    duration: '90-Day Comprehensive Architecture Setup',
    targetAudience: 'Growth-stage enterprises ($10M–$250M+ ARR) seeking permanent liberation from founder bottlenecks.',
    description: 'Our flagship architectural intervention. We re-engineer the Cognitive, Relational, and Structural substrates of your firm. We hard-code your strategic reasoning directly into 12 self-regulating operational logic gates—guaranteeing 100% execution fidelity.',
    price: 'Upon Request',
    billingDetail: 'Permanent operational operating system. Strictly capped to 3 clients per quarter.',
    features: [
      'Establish 100% execution fidelity across frontline and middle management',
      'Install all 12 customized logic gates to automate daily operational micro-decisions',
      'Reclaim up to 40% of executive strategic bandwidth within 90 days',
      'Eradicate recurring alignment meetings and coordination drag permanently',
      'Pass the rigorous 30-Day Step-Away Test with complete operational continuity',
      'Institutionalize key-person insulation to maximize EBITDA exit multiples'
    ],
    ctaText: 'Apply for Sovereign Transformation',
    ctaAction: 'intake'
  },
  {
    id: 'board_oversight',
    badge: 'Ongoing Institutional Stewardship',
    tier: 'Mandate III',
    title: 'Resonance Safeguard & Board Retainer',
    subtitle: 'Continuous Telemetry, Substrate Health & M&A Drift Insulation',
    duration: 'Annual Strategic Retainer (Quarterly Audits)',
    targetAudience: 'Family Offices, Private Equity sponsors, and post-scale enterprise Boards.',
    description: 'Long-term stewardship of your enterprise operating substrate. Continuous operational health monitoring, drift prevention, and immediate intervention protocols designed to insulate your leadership team and protect enterprise valuation.',
    price: 'Upon Request',
    billingDetail: 'Bespoke ongoing governance partnership. Subject to strict intake vetting.',
    features: [
      'Bi-annual corporate operating substrate integrity audits',
      'Direct, priority advisory access to Suchita Sancheti for high-stakes strategic bets',
      'Continuous early-warning drift alerts to catch friction before it compounds',
      'De-risk succession planning and protect institutional EBITDA multiples',
      'Permanent executive insulation from low-level operational noise'
    ],
    ctaText: 'Apply for Retainer Partnership',
    ctaAction: 'intake'
  }
];

const ServicesPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCtaClick = (_service: Service) => {
    navigate('/intake');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-[#f5f5f0] min-h-screen pt-4 md:pt-10 pb-16 text-left"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* =========================================================
            HERO SECTION: EXECUTIVE ORIENTATION & AUTHORITY
        ========================================================= */}
        <div className="mb-14 text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-8 h-px bg-[#b8860b]" />
            <h2 className="text-[#b8860b] text-[10px] sm:text-xs font-mono font-black uppercase tracking-widest">
              Sovereign Enterprise Architecture
            </h2>
            <span className="w-8 h-px bg-[#b8860b]" />
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight font-serif text-[#111111]">
            Hard-Code Founder Intent Directly <br />
            <span className="text-[#b8860b] italic font-light">Into Your Enterprise Substrate.</span>
          </h1>
          
          <div className="h-1 w-16 bg-[#b8860b] mx-auto mb-5" />
          
          <p className="text-sm sm:text-base text-zinc-700 font-serif italic leading-relaxed max-w-3xl mx-auto">
            Traditional consulting treats symptoms with meetings and decks. We re-engineer the <strong>Three Foundational Substrates</strong> of your organization—transforming human coordination drag into permanent, self-executing operational architecture.
          </p>

          {/* Quick-Jump Interlink Bar */}
          <div className="mt-8 pt-6 border-t border-zinc-200/80 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#substrates"
              className="px-3.5 py-1.5 bg-white border border-zinc-200 hover:border-[#b8860b] text-zinc-800 text-[10px] font-mono font-bold uppercase transition-all rounded-xs flex items-center gap-1.5 shadow-xs"
            >
              <Brain className="w-3 h-3 text-[#b8860b]" />
              <span>01. The 3 Substrates</span>
            </a>
            <a
              href="#mandates"
              className="px-3.5 py-1.5 bg-white border border-zinc-200 hover:border-[#b8860b] text-zinc-800 text-[10px] font-mono font-bold uppercase transition-all rounded-xs flex items-center gap-1.5 shadow-xs"
            >
              <Layers className="w-3 h-3 text-[#b8860b]" />
              <span>02. Commercial Mandates</span>
            </a>
            <a
              href="#ten-nodes"
              className="px-3.5 py-1.5 bg-white border border-zinc-200 hover:border-[#b8860b] text-zinc-800 text-[10px] font-mono font-bold uppercase transition-all rounded-xs flex items-center gap-1.5 shadow-xs"
            >
              <Users className="w-3 h-3 text-[#b8860b]" />
              <span>03. 10-Node Triangulation</span>
            </a>
            <Link
              to="/assessment"
              className="px-3.5 py-1.5 bg-[#b8860b] text-white hover:bg-black text-[10px] font-mono font-bold uppercase transition-all rounded-xs flex items-center gap-1.5 shadow-xs"
            >
              <Calculator className="w-3 h-3" />
              <span>90-Sec Friction Scan</span>
            </Link>
          </div>
        </div>

        {/* =========================================================
            SECTION 1: THE THREE FOUNDATIONAL SUBSTRATES (FIRST)
        ========================================================= */}
        <section id="substrates" className="mb-20 scroll-mt-20">
          <div className="mb-10 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#b8860b]/10 border border-[#b8860b]/30 rounded-full mb-3">
              <Sparkles className="w-3 h-3 text-[#b8860b]" />
              <span className="text-[#b8860b] text-[9px] font-mono font-bold uppercase tracking-wider">
                Foundational Science
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-900 font-serif">
              The Three Core <span className="text-[#b8860b] italic font-light">Substrates</span>
            </h2>
            <p className="text-zinc-600 text-xs sm:text-sm font-serif italic mt-2">
              Every enterprise bottleneck, coordination failure, or valuation discount lives within one of these three layers. We calibrate all three.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {THREE_SUBSTRATES.map((sub) => {
              const Icon = sub.icon;
              return (
                <div 
                  key={sub.id}
                  className="bg-white border border-zinc-200/90 rounded-xs p-7 shadow-sm hover:border-[#b8860b] transition-all duration-300 relative flex flex-col justify-between group"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-zinc-200 via-[#b8860b]/40 to-zinc-200 group-hover:from-[#b8860b] group-hover:to-[#b8860b] transition-all" />
                  
                  <div>
                    {/* Number & Icon */}
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-3xl font-serif font-black text-zinc-200 group-hover:text-[#b8860b]/30 transition-colors">
                        {sub.number}
                      </span>
                      <div className="w-12 h-12 rounded-xs bg-zinc-50 border border-zinc-200 flex items-center justify-center text-[#b8860b] group-hover:bg-[#b8860b] group-hover:text-white transition-all shadow-2xs">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Titles */}
                    <h3 className="text-xl font-bold font-serif text-zinc-900 mb-1 leading-tight">
                      {sub.name}
                    </h3>
                    <p className="text-xs font-mono font-bold text-[#b8860b] uppercase tracking-wider mb-4">
                      {sub.tagline}
                    </p>

                    {/* Core Description */}
                    <p className="text-zinc-600 text-xs sm:text-sm font-serif italic leading-relaxed mb-6">
                      {sub.description}
                    </p>
                  </div>

                  <div>
                    {/* Benchmark Metrics Grid */}
                    <div className="p-4 bg-zinc-50 border border-zinc-150 rounded-xs mb-5 space-y-2 font-mono text-xs">
                      <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider block">
                        Architectural Target
                      </span>
                      {sub.metrics.map((metric, idx) => (
                        <div key={idx} className="flex justify-between items-center text-[11px] border-b border-zinc-200/60 pb-1.5 last:border-0 last:pb-0">
                          <span className="text-zinc-600">{metric.label}:</span>
                          <span className="font-bold text-zinc-900">{metric.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Uncalibrated Symptom */}
                    <div className="p-3 bg-red-50/50 border border-red-200/50 rounded-xs text-[11px] font-serif text-red-950 italic">
                      <strong className="font-sans font-bold uppercase text-[9px] text-red-800 block not-italic mb-0.5">
                        Active Friction Indicator:
                      </strong>
                      "{sub.symptoms}"
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================================================
            SECTION 2: THE 10-NODE TRIANGULATION ARCHITECTURE
        ========================================================= */}
        <section id="ten-nodes" className="mb-20 max-w-5xl mx-auto bg-zinc-950 text-white border border-[#b8860b]/40 p-8 sm:p-10 shadow-2xl relative overflow-hidden rounded-xs scroll-mt-20">
          <div className="absolute top-0 right-0 w-80 h-80 bg-radial-gradient from-[#b8860b]/20 to-transparent pointer-events-none" />
          
          <div className="relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
              <div>
                <span className="text-[#b8860b] text-[10px] font-mono font-black uppercase tracking-widest block mb-1">
                  Proprietary Diagnostic Engine
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white">
                  The 10-Node Institutional Triangulation Protocol
                </h3>
              </div>
              <div className="px-3.5 py-1.5 bg-[#b8860b]/20 border border-[#b8860b]/50 text-[#b8860b] text-[10px] font-mono font-bold uppercase rounded-xs shrink-0">
                Zero Disruption • 48-Hour Readout
              </div>
            </div>

            <p className="text-zinc-300 text-sm font-serif italic leading-relaxed mb-8 max-w-3xl">
              We do not conduct slow, multi-week consulting interviews that disrupt operations. Instead, our proprietary software engine deploys an asynchronous 10-question forensic pulse simultaneously across the <strong>10 vital nervous nodes of your enterprise</strong>, cross-mapping the exact mathematical delta between Apex intent and edge execution:
            </p>

            {/* Stakeholder Node Matrix */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {TEN_NODES.map((node, idx) => (
                <div key={idx} className="p-4 bg-zinc-900/90 border border-white/10 rounded-xs flex items-start gap-3.5">
                  <span className="w-6 h-6 rounded-full bg-[#b8860b]/20 border border-[#b8860b]/40 text-[#b8860b] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-white font-bold text-xs uppercase font-mono">{node.role}</h4>
                      <span className="text-[#b8860b] text-[9px] font-mono uppercase font-bold">{node.count}</span>
                    </div>
                    <p className="text-zinc-400 text-xs font-serif italic">{node.focus}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Callout */}
            <div className="p-4 bg-black/60 border border-[#b8860b]/30 rounded-xs flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left">
                <span className="text-emerald-400 text-[10px] font-mono font-bold uppercase block">
                  ✓ Instant Mathematical Translation Index
                </span>
                <p className="text-zinc-300 text-xs font-serif italic">
                  Isolates the 2.0-point translation decay and specifies which of the 12 Logic Gates are unsealed.
                </p>
              </div>
              <button
                onClick={() => navigate('/assessment')}
                className="w-full sm:w-auto px-6 py-3 bg-[#b8860b] hover:bg-white hover:text-black text-black font-mono font-bold text-[10px] uppercase tracking-wider rounded-xs transition-all shadow-md shrink-0 cursor-pointer"
              >
                Run Phase 01 Diagnostic Pulse
              </button>
            </div>
          </div>
        </section>

        {/* =========================================================
            SECTION 3: THE 3 COMMERCIAL ENGAGEMENT MANDATES
        ========================================================= */}
        <section id="mandates" className="mb-20 scroll-mt-20">
          <div className="mb-10 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#b8860b]/10 border border-[#b8860b]/30 rounded-full mb-3">
              <Shield className="w-3 h-3 text-[#b8860b]" />
              <span className="text-[#b8860b] text-[9px] font-mono font-bold uppercase tracking-wider">
                Engagement Structures
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 font-serif">
              Select Your Institutional <span className="text-[#b8860b] italic font-light">Mandate.</span>
            </h2>
            <p className="text-zinc-600 text-xs sm:text-sm font-serif italic mt-2">
              Structured for high-growth enterprise founders, VCs, and CEOs seeking immediate cognitive bandwidth reclamation.
            </p>
          </div>

          {/* Pricing & Mandates Grid */}
          <div className="grid lg:grid-cols-3 gap-8 items-stretch mb-12">
            {COMMERCIAL_MANDATES.map((service) => {
              const isPopular = service.isPopular;
              return (
                <div 
                  key={service.id}
                  className={`flex flex-col relative h-full transition-all duration-500 rounded-xs border p-7 sm:p-8 bg-white ${
                    isPopular 
                      ? 'border-[#b8860b] shadow-[0_20px_50px_rgba(184,134,11,0.14)] ring-1 ring-[#b8860b]' 
                      : 'border-zinc-200 hover:border-[#b8860b]/60 shadow-sm'
                  }`}
                >
                  {isPopular && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#b8860b] text-white text-[8px] font-mono font-black uppercase tracking-wider rounded-full shadow-md">
                      Recommended Initial Engagement
                    </span>
                  )}

                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] font-mono font-black uppercase text-[#b8860b] px-2.5 py-1 bg-[#b8860b]/10 rounded-xs">
                        {service.badge}
                      </span>
                      <span className="text-[10px] font-mono uppercase font-bold text-zinc-400">
                        {service.tier}
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-zinc-900 mb-1 leading-tight font-serif">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[#b8860b] italic mb-3 font-semibold font-serif">
                      {service.subtitle}
                    </p>
                    <div className="px-2.5 py-1 bg-zinc-100 border border-zinc-200 text-zinc-700 text-[10px] font-mono uppercase rounded-xs mb-4 inline-block">
                      ⏱ {service.duration}
                    </div>
                    <p className="text-zinc-600 text-xs sm:text-sm font-serif italic leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-4 pb-6 border-t border-zinc-100 my-auto">
                    <span className="text-[9px] uppercase font-mono font-bold text-zinc-400 block mb-1">
                      Investment Structure
                    </span>
                    <div className="text-2xl sm:text-3xl font-extrabold font-serif text-zinc-900">
                      {service.price}
                    </div>
                    <span className="text-[11px] text-zinc-500 font-serif italic mt-1 block">
                      {service.billingDetail}
                    </span>
                  </div>

                  <div className="space-y-3 mb-8">
                    <span className="text-[9px] uppercase font-mono font-bold text-zinc-400 block">
                      Architectural Deliverables
                    </span>
                    <ul className="space-y-2.5">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-700 font-serif italic leading-snug">
                          <CheckCircle className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => handleCtaClick(service)}
                    className={`w-full py-4 text-[10px] font-mono font-bold uppercase tracking-wider transition-all mt-auto rounded-xs shadow-md cursor-pointer ${
                      isPopular
                        ? 'bg-[#111111] hover:bg-[#b8860b] text-white'
                        : 'border border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white'
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

          {/* Quarterly Capacity Banner */}
          <div className="max-w-4xl mx-auto bg-white border border-[#b8860b]/40 p-6 rounded-xs shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#b8860b]/10 border border-[#b8860b]/30 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5 text-[#b8860b]" />
              </div>
              <div>
                <span className="text-[#b8860b] text-[9px] font-mono uppercase font-bold tracking-widest block">
                  Strict Institutional Scarcity
                </span>
                <p className="text-zinc-800 text-xs sm:text-sm font-serif italic">
                  Accepting only <strong className="text-zinc-950 font-bold">3 enterprise mandates per quarter</strong>. 2 seats committed for Q3. <strong>Only 1 opening remains.</strong>
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/intake')}
              className="px-5 py-2.5 bg-[#111111] hover:bg-[#b8860b] text-white font-mono text-[9px] uppercase font-bold tracking-wider rounded-xs transition-colors shrink-0 cursor-pointer"
            >
              Verify Intake Availability
            </button>
          </div>
        </section>

        {/* =========================================================
            SECTION 4: FORENSIC HANDWRITING ADVISORY MODALITY
        ========================================================= */}
        <section className="mb-20 max-w-5xl mx-auto bg-white border border-[#b8860b]/40 p-6 sm:p-8 shadow-sm relative overflow-hidden rounded-xs">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#b8860b]" />
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-zinc-100 pb-4 mb-5">
            <div>
              <span className="text-[#b8860b] text-[9px] font-mono font-black uppercase tracking-wider block">
                SPECIALIZED EXECUTIVE MODALITY // BESPOKE ADVISORY PRACTICE
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-zinc-900 mt-1">
                Bespoke 1-on-1 Forensic Handwriting & Behavioral Profiling
              </h3>
            </div>
            <div className="px-3 py-1 bg-zinc-100 border border-zinc-300 text-zinc-700 text-[9px] font-mono font-bold uppercase rounded-xs shrink-0">
              Personal Clinical Advisory • Not App-Automated
            </div>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-zinc-700 font-serif leading-relaxed">
            <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-xs text-xs text-amber-950 font-sans space-y-1">
              <strong className="font-bold text-[#8a6d1a] uppercase text-[10px] block tracking-wide">
                Important Modality Distinction:
              </strong>
              <p className="italic">
                Forensic handwriting analysis is <strong>not an automated software feature or in-app algorithmic tool</strong>. It is a distinct, human-dependent clinical discipline and a core personal strength of Principal Architect <strong>Suchita Sancheti</strong> (Certified Handwriting Analyst & Industrial Psychologist).
              </p>
            </div>

            <p className="italic font-light">
              This specialized capability is provided <strong>exclusively as a private, one-on-one executive consultation</strong>. Through confidential physical or digital manuscript examination, Suchita personally decodes subconscious stress patterns, risk tolerances, and leadership alignment dynamics that standard corporate surveys fail to capture.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 pt-2 font-sans text-xs">
              <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xs">
                <span className="text-[10px] font-bold text-zinc-900 uppercase block mb-1">01. 1-on-1 Exclusive</span>
                <span className="text-zinc-600 text-[11px] leading-snug block">Conducted directly and privately with Suchita Sancheti, independent of the digital app.</span>
              </div>
              <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xs">
                <span className="text-[10px] font-bold text-zinc-900 uppercase block mb-1">02. Deep Behavioral Substrate</span>
                <span className="text-zinc-600 text-[11px] leading-snug block">Uncovers latent executive decision filters, burnout vectors, and cognitive stress nodes.</span>
              </div>
              <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-xs">
                <span className="text-[10px] font-bold text-zinc-900 uppercase block mb-1">03. Custom Integration</span>
                <span className="text-zinc-600 text-[11px] leading-snug block">Can be added as a bespoke module during private leadership intake or board alignment.</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-100">
              <span className="text-[10px] font-mono text-zinc-500 italic">
                Interested in adding 1-on-1 forensic handwriting analysis to your executive calibration?
              </span>
              <button
                onClick={() => navigate('/intake')}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#111111] hover:bg-[#b8860b] text-white text-[9px] font-mono font-bold uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs shrink-0"
              >
                <span>Request 1-on-1 Forensic Profiling</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </section>

        {/* Operational Deliverables Matrix */}
        <OperationalDeliverablesMatrix />

        {/* Google Preferred Sources Integration Card */}
        <div className="my-16 max-w-5xl mx-auto">
          <GooglePreferredSource variant="card" />
        </div>

        {/* Strategic Objection Handling - FAQ */}
        <div className="mt-16 md:mt-24 -mx-4 sm:-mx-6 md:-mx-12">
          <FAQ />
        </div>

      </div>
    </motion.div>
  );
};

export default ServicesPage;
