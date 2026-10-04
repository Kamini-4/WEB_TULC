import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Layers, 
  Compass, 
  Zap, 
  AlertCircle, 
  Crown, 
  Calendar,
  FileSpreadsheet,
  Check,
  ChevronRight
} from 'lucide-react';
import Newsletter from '../../components/Newsletter.tsx';

interface MethodologyPageProps {
  onBriefClick: (id?: string) => void;
}

interface StepPhase {
  number: string;
  timeframe: string;
  name: string;
  tagline: string;
  summary: string;
  ceoInvestment: string;
  deliverables: string[];
  systemShift: {
    before: string;
    after: string;
  };
}

const IMPLEMENTATION_STEPS: StepPhase[] = [
  {
    number: '00',
    timeframe: 'Hours 0–48',
    name: 'The 10-Node Forensic Audit',
    tagline: 'Isolate The Leaks with Zero Operational Drag',
    summary: 'A 100% asynchronous forensic cross-section of your communication channels, escalation tickets, and executive calendar to isolate your exact 2.0 translation gap.',
    ceoInvestment: '45-minute structured briefing + read-only data handshake.',
    deliverables: [
      'Comprehensive 10-Node Forensic Leak Map',
      'Quantified Cognitive Tax & Inaction Cost calculation',
      'Immediate identification of the 3 acute operational bottlenecks',
      '100% fee credit applied directly to full OS deployment'
    ],
    systemShift: {
      before: 'Founder intuition suspects team drag, but lacks empirical root-cause telemetry.',
      after: 'Mathematical diagnosis of where intent stalls between the boardroom and frontlines.'
    }
  },
  {
    number: '01',
    timeframe: 'Days 1–30',
    name: 'Judgment Codification & Architecture',
    tagline: 'Hard-Code Founder Instinct into 12 Invariant Gates',
    summary: 'We extract your implicit decision-making heuristics (risk thresholds, capital allocation trade-offs, priority hierarchies) and convert them into explicit mathematical operational protocols.',
    ceoInvestment: 'Two 60-minute deep extraction interviews with Suchita Sancheti.',
    deliverables: [
      '12 Invariant Operational Decision Protocols tailored to your business model',
      'Decoupled Escalation Matrix (kills 80% of routine Slack/email reviews)',
      'Autonomous Resource Allocation Gates for VP and Director tiers',
      'Meeting Hygiene Standard (permanently eliminates 10+ hrs/wk of recurring syncs)'
    ],
    systemShift: {
      before: 'Directors constantly request permission and escalate routine trade-offs.',
      after: 'Team makes high-stakes decisions using codified founder logic.'
    }
  },
  {
    number: '02',
    timeframe: 'Days 31–60',
    name: 'Substrate Calibration & Team Rollout',
    tagline: 'Practical Scenario Simulations (No Fluffy Workshops)',
    summary: 'We install the protocols directly into your executive committee and department heads through live operational scenario simulation—ensuring muscle memory without business disruption.',
    ceoInvestment: 'Zero hours. TULC architects co-run the integration with your leadership tier.',
    deliverables: [
      'Full executive committee protocol certification',
      'Middle-management autonomous delegation clearances',
      'Weekly telemetry reports tracking executive calendar hours liberated',
      'Live friction removal on active cross-functional initiatives'
    ],
    systemShift: {
      before: 'Leadership team hesitates to take bold action without CEO rubber-stamp.',
      after: 'Autonomous execution velocity increases by 40% with zero quality degradation.'
    }
  },
  {
    number: '03',
    timeframe: 'Days 61–90',
    name: 'The 30-Day Step-Away & Sovereignty Test',
    tagline: 'Prove Complete Decoupling from Daily Execution',
    summary: 'The ultimate institutional milestone: the founder takes an intentional 14 to 30-day step-away window. The enterprise operates with 100% fidelity without daily intervention.',
    ceoInvestment: 'Step back from daily operations and preside purely as Board Chair.',
    deliverables: [
      'Full 30-Day Autonomous Continuity Certification',
      'Audit report confirming 15–20 hours reclaimed weekly on CEO calendar',
      'Institutional Governance Dossier for Private Equity / Board of Directors',
      'Elimination of founder key-person risk to defend exit multiples'
    ],
    systemShift: {
      before: 'Enterprise stalls or drifts when founder is absent for more than 48 hours.',
      after: 'Operations compound smoothly whether the founder is in the room or on sabbatical.'
    }
  }
];

const MethodologyPage: React.FC<MethodologyPageProps> = ({ onBriefClick }) => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const previousTitle = document.title;
    document.title = 'How It Works | The Sovereign Installation Protocol | TULC';
    const metaDesc = document.querySelector('meta[name="description"]');
    const prevDesc = metaDesc?.getAttribute('content');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Explore the 4-step implementation roadmap from 48-Hour Forensic Audit to 90-Day Sovereign OS and permanent board governance.');
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
      transition={{ duration: 0.5 }}
      className="bg-[#0a0a0a] min-h-screen text-white text-left"
    >
      {/* =========================================================
          HERO: CLEAR, CONFIDENT & AUTHORITATIVE
      ========================================================= */}
      <section className="pt-10 sm:pt-16 md:pt-20 pb-12 sm:pb-16 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#b8860b]/15 border border-[#b8860b]/30 rounded-full mb-4">
              <Compass className="w-3.5 h-3.5 text-[#b8860b]" />
              <span className="text-[#b8860b] text-[10px] font-mono font-bold uppercase tracking-widest">
                The Sovereign Installation Blueprint
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-tight text-white mb-4">
              How It <span className="italic text-[#b8860b]">Works.</span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-zinc-300 font-serif italic leading-relaxed">
              We do not hand you a 100-slide PDF and leave. We co-implement alongside your executive team to hard-code founder judgment into 12 self-regulating operational gates in 90 days—reclaiming 15+ hours of your weekly focus.
            </p>
          </div>

          {/* 3 Executive Anchor Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-10 pt-8 border-t border-white/10 font-mono">
            <div className="p-5 bg-zinc-900/60 border border-white/5 rounded-xs">
              <div className="flex items-center gap-2 text-zinc-400 text-xs uppercase mb-1">
                <Clock className="w-4 h-4 text-[#b8860b]" />
                <span>Founder Time Required</span>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-white block">2–3 Hours Total</span>
              <p className="text-[11px] text-zinc-400 font-serif italic mt-1">
                Zero busywork. Asynchronous analysis & senior architect delivery.
              </p>
            </div>

            <div className="p-5 bg-zinc-900/60 border border-white/5 rounded-xs">
              <div className="flex items-center gap-2 text-zinc-400 text-xs uppercase mb-1">
                <ShieldCheck className="w-4 h-4 text-[#b8860b]" />
                <span>Operational Drag</span>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-emerald-400 block">0% Disruption</span>
              <p className="text-[11px] text-zinc-400 font-serif italic mt-1">
                Runs parallel to existing workflows without interrupting delivery.
              </p>
            </div>

            <div className="p-5 bg-zinc-900/60 border border-white/5 rounded-xs">
              <div className="flex items-center gap-2 text-zinc-400 text-xs uppercase mb-1">
                <Zap className="w-4 h-4 text-[#b8860b]" />
                <span>Guaranteed Standard</span>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-[#b8860b] block">15+ Hrs Reclaimed</span>
              <p className="text-[11px] text-zinc-400 font-serif italic mt-1">
                Verified through the 30-day founder step-away protocol.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          THE 4-PHASE IMPLEMENTATION TIMELINE (LINEAR & CRISP)
      ========================================================= */}
      <section className="py-16 sm:py-20 md:py-24 border-b border-white/10 bg-[#0e0e0e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="text-[#b8860b] text-[10px] font-mono font-bold uppercase tracking-widest block mb-2">
              Chronological Roadmap
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-white leading-snug">
              The 4 Implementation Phases
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-serif italic mt-2 leading-relaxed">
              Every phase is engineered with strict milestones, concrete deliverables, and quantifiable bandwidth returns.
            </p>
          </div>

          <div className="space-y-8 sm:space-y-12">
            {IMPLEMENTATION_STEPS.map((step, idx) => (
              <div 
                key={step.number}
                className="bg-zinc-950 border border-white/10 p-6 sm:p-8 md:p-10 rounded-xs shadow-xl relative overflow-hidden group hover:border-[#b8860b]/50 transition-all duration-300"
              >
                {/* Step Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl sm:text-4xl font-serif font-black text-[#b8860b]">
                      Phase {step.number}
                    </span>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                        {step.name}
                      </h3>
                      <p className="text-xs font-mono text-[#b8860b] uppercase font-bold tracking-wider">
                        {step.tagline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-xs text-zinc-300 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#b8860b]" />
                      <span>{step.timeframe}</span>
                    </div>
                  </div>
                </div>

                {/* Step Body */}
                <div className="grid lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Summary & Founder Commitment */}
                  <div className="lg:col-span-5 space-y-6">
                    <p className="text-xs sm:text-sm text-zinc-300 font-serif italic leading-relaxed">
                      {step.summary}
                    </p>

                    <div className="p-4 bg-zinc-900 border border-white/5 rounded-xs">
                      <span className="text-[9px] font-mono text-[#b8860b] uppercase font-bold tracking-wider block mb-1">
                        Founder Time Commitment:
                      </span>
                      <p className="text-xs text-white font-mono font-medium">
                        {step.ceoInvestment}
                      </p>
                    </div>

                    {/* System Shift (Before vs After) */}
                    <div className="space-y-3 font-serif text-xs">
                      <div className="p-3 bg-red-950/20 border border-red-800/30 rounded-xs text-red-200/90">
                        <strong className="font-mono text-[9px] uppercase tracking-wider block text-red-400 mb-0.5">
                          Before Intervention:
                        </strong>
                        {step.systemShift.before}
                      </div>
                      <div className="p-3 bg-emerald-950/20 border border-emerald-800/30 rounded-xs text-emerald-200/90">
                        <strong className="font-mono text-[9px] uppercase tracking-wider block text-emerald-400 mb-0.5">
                          After Installation:
                        </strong>
                        {step.systemShift.after}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Tangible Deliverables */}
                  <div className="lg:col-span-7 bg-zinc-900/60 border border-white/5 p-6 rounded-xs space-y-4">
                    <span className="text-[9px] font-mono uppercase font-bold tracking-wider text-zinc-400 block">
                      Guaranteed Tangible Deliverables:
                    </span>
                    <div className="space-y-3">
                      {step.deliverables.map((deliv, dIdx) => (
                        <div key={dIdx} className="flex items-start gap-3 text-xs sm:text-sm">
                          <CheckCircle2 className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
                          <span className="text-zinc-200 font-serif italic leading-snug">
                            {deliv}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t border-white/10 flex justify-end">
                      <button
                        onClick={() => onBriefClick(step.number)}
                        className="text-[10px] font-mono uppercase font-bold text-[#b8860b] hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>Request Phase {step.number} Protocol</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          ONGOING LAYER: THE SOVEREIGN RETAINER & BOARD SEAT
      ========================================================= */}
      <section className="py-16 sm:py-20 md:py-24 border-b border-white/10 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-zinc-950 via-[#111111] to-zinc-950 border-2 border-[#b8860b] p-8 sm:p-12 rounded-xs shadow-2xl relative overflow-hidden">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
              <div className="space-y-3 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#b8860b]/20 border border-[#b8860b]/40 rounded-full">
                  <Crown className="w-3.5 h-3.5 text-[#b8860b]" />
                  <span className="text-[#b8860b] text-[10px] font-mono font-bold uppercase tracking-widest">
                    The Permanent Enterprise Moat
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-white leading-tight">
                  Beyond 90 Days: <span className="text-[#b8860b]">The Sovereign Retainer & Board Seat</span>
                </h3>
                <p className="text-xs sm:text-sm text-zinc-300 font-serif italic leading-relaxed">
                  After installing the core 90-Day OS, 94% of our enterprise clients transition to The Sovereign Retainer. Suchita Sancheti assumes a strategic board advisory role, providing a direct 24/7 Red Phone for high-stakes decisions, bi-annual drift immunity audits, and continuous defense of your enterprise EBITDA multiple.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
                <button
                  onClick={() => navigate('/services')}
                  className="px-6 py-3.5 bg-[#b8860b] hover:bg-white text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <span>Explore Retainer Specs</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => navigate('/intake')}
                  className="px-6 py-3.5 bg-zinc-900 hover:bg-zinc-800 text-white border border-white/10 font-mono font-bold text-xs uppercase tracking-wider rounded-xs transition-all text-center cursor-pointer"
                >
                  <span>Check Q4 Seat Availability</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          THE ARCHITECTURAL DIFFERENCE: WHY THIS STICKS
      ========================================================= */}
      <section className="py-16 sm:py-20 md:py-24 border-b border-white/10 bg-[#0e0e0e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="text-[#b8860b] text-[10px] font-mono font-bold uppercase tracking-widest block mb-2">
              The Architecture of Permanence
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-white leading-snug">
              Why Traditional Advisory Fails vs. Why The Substrate Sticks
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 font-serif italic mt-2 leading-relaxed">
              Most organizational change efforts collapse into cynicism because they mistake recommendations for operational physics.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-6 sm:p-8 bg-zinc-950 border border-white/10 rounded-xs space-y-4">
              <span className="text-[10px] font-mono uppercase font-bold text-red-400 block">
                Traditional Management Consulting
              </span>
              <h4 className="text-lg font-serif font-bold text-white">
                100-Slide Strategy Decks
              </h4>
              <p className="text-xs text-zinc-400 font-serif italic leading-relaxed">
                Charges $250k+ to interview your team and hand back an abstract theoretical report that sits on Google Drive, leaving your leadership to execute alone.
              </p>
              <div className="pt-3 border-t border-white/10 text-[10px] font-mono text-zinc-500">
                Outcome: 0% permanent behavioral change.
              </div>
            </div>

            <div className="p-6 sm:p-8 bg-zinc-950 border border-white/10 rounded-xs space-y-4">
              <span className="text-[10px] font-mono uppercase font-bold text-amber-400 block">
                Executive Leadership Coaching
              </span>
              <h4 className="text-lg font-serif font-bold text-white">
                Vague Motivational Pep-Talks
              </h4>
              <p className="text-xs text-zinc-400 font-serif italic leading-relaxed">
                Focuses on mindset and open-ended journaling without fixing the broken operational routing, leaving founder calendars flooded on Monday morning.
              </p>
              <div className="pt-3 border-t border-white/10 text-[10px] font-mono text-zinc-500">
                Outcome: Temporary relief, recurring systemic fires.
              </div>
            </div>

            <div className="p-6 sm:p-8 bg-zinc-950 border-2 border-[#b8860b]/60 rounded-xs space-y-4 shadow-xl">
              <span className="text-[10px] font-mono uppercase font-bold text-[#b8860b] block">
                TULC Sovereign Architecture
              </span>
              <h4 className="text-lg font-serif font-bold text-white">
                12 Self-Regulating Operational Gates
              </h4>
              <p className="text-xs text-zinc-300 font-serif italic leading-relaxed">
                We engineer concrete decision parameters directly into your enterprise operating model, automating routine trade-offs so frontline teams execute autonomously.
              </p>
              <div className="pt-3 border-t border-[#b8860b]/30 text-[10px] font-mono text-[#b8860b] font-bold">
                Outcome: Permanent 15+ hours reclaimed weekly.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL ACTION TERMINAL & NEWSLETTER
      ========================================================= */}
      <section className="py-16 sm:py-20 md:py-24 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-16">
          <div className="p-8 sm:p-10 bg-zinc-950 border border-white/10 rounded-xs flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="space-y-2 text-left max-w-xl">
              <span className="text-[9px] font-mono font-bold uppercase text-[#b8860b] block">
                Begin With Phase 0.0 Diagnostic
              </span>
              <h4 className="text-xl sm:text-2xl font-bold font-serif text-white">
                Ready to locate your enterprise decision leaks?
              </h4>
              <p className="text-xs sm:text-sm text-zinc-400 font-serif italic leading-relaxed">
                Run the 10-Node Forensic Audit to receive your complete 48-Hour Leak Map. 100% of the audit fee is credited toward full OS installation.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <button
                onClick={() => navigate('/intake')}
                className="px-6 py-3.5 bg-[#b8860b] text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xs hover:bg-white transition-all shadow-md cursor-pointer whitespace-nowrap"
              >
                Run 10-Node Diagnostic →
              </button>
            </div>
          </div>

          {/* Cross-Domain Internal Links Matrix */}
          <div className="p-6 bg-zinc-950 border border-white/10 rounded-xs">
            <span className="text-[10px] font-mono font-bold uppercase text-[#b8860b] block mb-3">
              Explore The Complete Sovereign Architecture
            </span>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <button
                onClick={() => navigate('/services')}
                className="p-3 bg-zinc-900/80 border border-white/5 hover:border-[#b8860b] text-left transition-colors rounded-xs cursor-pointer group"
              >
                <span className="text-[9px] font-mono text-[#b8860b] font-bold block mb-1">MANDATES & TIERS</span>
                <span className="text-white font-bold block group-hover:text-[#b8860b] transition-colors">Sovereign Retainer →</span>
                <span className="text-[10px] text-zinc-400 font-serif italic block mt-0.5">Explore 3 sovereign tiers and board governance advisory.</span>
              </button>
              <button
                onClick={() => navigate('/toolkits')}
                className="p-3 bg-zinc-900/80 border border-white/5 hover:border-[#b8860b] text-left transition-colors rounded-xs cursor-pointer group"
              >
                <span className="text-[9px] font-mono text-[#b8860b] font-bold block mb-1">DIGITAL ARSENAL</span>
                <span className="text-white font-bold block group-hover:text-[#b8860b] transition-colors">Founder Toolkits →</span>
                <span className="text-[10px] text-zinc-400 font-serif italic block mt-0.5">Instant 1-click clone Notion/Coda workspaces.</span>
              </button>
              <button
                onClick={() => navigate('/assessment')}
                className="p-3 bg-zinc-900/80 border border-white/5 hover:border-[#b8860b] text-left transition-colors rounded-xs cursor-pointer group"
              >
                <span className="text-[9px] font-mono text-[#b8860b] font-bold block mb-1">DIAGNOSTIC</span>
                <span className="text-white font-bold block group-hover:text-[#b8860b] transition-colors">90-Sec Audit →</span>
                <span className="text-[10px] text-zinc-400 font-serif italic block mt-0.5">Evaluate the 5 Sovereign Domains in under 2 minutes.</span>
              </button>
              <button
                onClick={() => navigate('/cognitive-tax')}
                className="p-3 bg-zinc-900/80 border border-white/5 hover:border-[#b8860b] text-left transition-colors rounded-xs cursor-pointer group"
              >
                <span className="text-[9px] font-mono text-[#b8860b] font-bold block mb-1">FINANCIAL DRAG</span>
                <span className="text-white font-bold block group-hover:text-[#b8860b] transition-colors">Cognitive Drag →</span>
                <span className="text-[10px] text-zinc-400 font-serif italic block mt-0.5">Calculate executive bandwidth leakage and monetary cost.</span>
              </button>
            </div>
          </div>

          <Newsletter />
        </div>
      </section>
    </motion.div>
  );
};

export default MethodologyPage;
