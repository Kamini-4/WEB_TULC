import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, CheckCircle2, Clock, DollarSign, Layers, ArrowRight, Play, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FrictionCard {
  id: string;
  tag: string;
  scenario: string;
  executiveQuote: string;
  metabolicCost: string;
  financialDrain: string;
  rootFailure: string;
  installedGate: string;
  clinicalFix: string;
  domainRef: string;
}

const frictionScenarios: FrictionCard[] = [
  {
    id: "01",
    tag: "COGNITIVE OVERLOAD",
    scenario: "The Sunday Night Deck Review",
    executiveQuote: "“If I don't review every slide myself before the board meeting, someone will present unchecked assumptions.”",
    metabolicCost: "16.5 hrs / month burned in tactical double-checking",
    financialDrain: "Dilutes CEO strategic bandwidth by 35%",
    rootFailure: "Lack of Invariant Heuristic Filters; managers don't know the exact risk tolerance parameters of the apex desk.",
    installedGate: "Gate 01: Pre-Verified Assumption Matrices",
    clinicalFix: "Replaces manual slide-by-slide reviews with standardized execution protocols that require managers to verify core assumptions against hard-coded financial heuristics before submission.",
    domainRef: "Domain 01: Cognitive Clarity"
  },
  {
    id: "02",
    tag: "COORDINATION DRAG",
    scenario: "The 10-Person Status Meeting Tax",
    executiveQuote: "“We have a 90-minute weekly sync where 8 people sit silently waiting for 2 people to finish their verbal updates.”",
    metabolicCost: "18.5 hrs / week across leadership tier",
    financialDrain: "$240,000+ in annual executive salary waste",
    rootFailure: "Conversational reporting substituted for self-verifying operational telemetry.",
    installedGate: "Gate 04: Asynchronous Context Broadcasting",
    clinicalFix: "Eradicates passive verbal syncs. Replaces them with 5-minute async telemetry logs; meetings are strictly preserved for two-way strategic debate and capital decisions.",
    domainRef: "Domain 03: Strategic Velocity"
  },
  {
    id: "03",
    tag: "EXECUTION DRIFT",
    scenario: "The Second-Guess Delegation Trap",
    executiveQuote: "“I delegated this critical strategic expansion, but three weeks in, they took it in a direction I never approved.”",
    metabolicCost: "40+ hours of executive rework & delay",
    financialDrain: "2 to 3-month strategic delay to market",
    rootFailure: "Delegating tasks without codifying the underlying decision boundaries and trade-off hierarchy.",
    installedGate: "Gate 02: Autonomous Execution Envelopes",
    clinicalFix: "Installs strictly bounded execution envelopes. Middle management operates with 100% autonomy within explicit risk boundaries, eliminating drift and the need for rework.",
    domainRef: "Domain 02: Systemic Integrity"
  },
  {
    id: "04",
    tag: "ESCALATION DENSITY",
    scenario: "The Routine Budget Escalation",
    executiveQuote: "“My department heads still message me on weekend mornings to approve $50,000 vendor invoices.”",
    metabolicCost: "94/100 Escalation Density Index",
    financialDrain: "CEO forced into daily tactical firefighting",
    rootFailure: "Zero clear thresholding for capital autonomy and fear of personal liability in management.",
    installedGate: "Gate 03: Tiered Capital Logic & Escalation Filter",
    clinicalFix: "Codifies hard rules permitting escalations to the CEO strictly under 3 conditions: existential legal/brand risk, budget variances >$250k, or core ethics violations.",
    domainRef: "Domain 04: Moral Gravity"
  },
  {
    id: "05",
    tag: "ORGANIZATIONAL SILENCE",
    scenario: "The 'Silence of Compliance'",
    executiveQuote: "“Everyone nodded in the Monday executive meeting, but Friday afternoon we found out the deadline was missed by 3 weeks.”",
    metabolicCost: "21-day latency in error discovery",
    financialDrain: "Compounding operational & reputational risk",
    rootFailure: "Defensive culture where surfacing friction early is penalized, leading to sugarcoated reporting.",
    installedGate: "Gate 07: 15-Minute Zero-Delay Error Channel",
    clinicalFix: "Creates a friction-free, non-punitive operational channel that mandates immediate reporting of operational drift within 15 minutes of detection.",
    domainRef: "Domain 05: Cultural Fidelity"
  },
  {
    id: "06",
    tag: "KEY-PERSON EXPOSURE",
    scenario: "The Single Resignation Panic",
    executiveQuote: "“If our Head of Product or Chief Architect walked out tomorrow, our entire roadmap would freeze for 6 months.”",
    metabolicCost: "100% Key-Person Vulnerability",
    financialDrain: "25–35% institutional valuation discount",
    rootFailure: "Institutional knowledge stored exclusively in biological brains instead of codified systemic architecture.",
    installedGate: "Gate 11: Leader-Agnostic Succession Substrate",
    clinicalFix: "Extracts and codifies proprietary architecture, vendor relationships, and operational playbooks into an automated, leader-agnostic organizational substrate.",
    domainRef: "Domain 05: Cultural Fidelity"
  }
];

const ExecutiveFrictionScanner: React.FC = () => {
  const [activeId, setActiveId] = useState<string>("01");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const navigate = useNavigate();

  const selected = frictionScenarios.find(item => item.id === (hoveredId || activeId)) || frictionScenarios[0];

  return (
    <section className="py-14 sm:py-20 bg-[#0c0c0c] text-white border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Netflix-style Micro-Trailer Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-white/10 pb-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#b8860b]/10 border border-[#b8860b]/30 rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#b8860b]" />
              <span className="text-[#b8860b] text-[10px] font-black uppercase font-mono tracking-wider">
                Instant Interactive Friction Scanner • Micro-Diagnostics
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-white tracking-tight">
              The Daily Leaks You Suffer. <span className="text-[#b8860b] italic font-light">The Installed Fixes.</span>
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm font-sans mt-2 leading-relaxed">
              Hover or tap any operational friction point below to instantly preview the hidden metabolic burn, root systemic failure, and the codified execution protocol that neutralizes it.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <button
              onClick={() => navigate('/assessment')}
              className="px-4 py-2.5 bg-[#b8860b] hover:bg-white hover:text-black text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xs transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <span>Audit Your Leakage</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2-Column Netflix/Prime Style Interactive Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Tactile Scenario Cards (Thumbnails / Row items) */}
          <div className="lg:col-span-5 space-y-2.5">
            <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-2 flex items-center justify-between">
              <span>SELECT AN OPERATIONAL BOTTLENECK</span>
              <span className="text-[#b8860b]">06 CLASSIFIED ARCHETYPES</span>
            </div>

            {frictionScenarios.map((item) => {
              const isCurrent = item.id === selected.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveId(item.id)}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`p-3.5 sm:p-4 rounded-xs border transition-all duration-200 cursor-pointer text-left relative overflow-hidden group ${
                    isCurrent
                      ? 'bg-[#181818] border-[#b8860b] shadow-lg translate-x-1'
                      : 'bg-[#121212] border-white/5 hover:border-white/20 hover:bg-[#151515]'
                  }`}
                >
                  {isCurrent && (
                    <div className="absolute top-0 left-0 bottom-0 w-1 bg-[#b8860b]" />
                  )}

                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400 group-hover:text-zinc-300">
                      LEAK 0{item.id} // {item.tag}
                    </span>
                    <span className="text-[10px] font-mono text-[#b8860b] flex items-center gap-1 opacity-80 group-hover:opacity-100">
                      <Play className="w-2.5 h-2.5 fill-current" /> Preview
                    </span>
                  </div>

                  <h4 className={`text-sm sm:text-base font-bold font-serif transition-colors ${
                    isCurrent ? 'text-white' : 'text-zinc-300 group-hover:text-white'
                  }`}>
                    {item.scenario}
                  </h4>

                  <p className="text-xs text-zinc-400 italic font-serif mt-1 truncate">
                    {item.executiveQuote}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: High-Impact Forensic Breakdown (The "Trailer / Preview Player") */}
          <div className="lg:col-span-7 sticky top-24">
            <div className="bg-[#141414] border border-[#b8860b]/40 rounded-xs p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-[#b8860b]">
                    DECLASSIFIED FORENSIC INSPECTOR // {selected.domainRef.toUpperCase()}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-serif text-white mt-1">
                    {selected.scenario}
                  </h3>
                </div>
                <div className="px-2.5 py-1 bg-[#b8860b]/20 border border-[#b8860b]/50 text-[#b8860b] text-[10px] font-mono font-bold uppercase rounded-xs">
                  CASE 0{selected.id}
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selected.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {/* Executive Voice Quote */}
                  <div className="p-4 bg-black/60 border-l-2 border-[#b8860b] rounded-xs">
                    <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest block mb-1">
                      The Founder's Exact Dilemma:
                    </span>
                    <p className="text-sm sm:text-base font-serif italic text-zinc-100 leading-relaxed">
                      {selected.executiveQuote}
                    </p>
                  </div>

                  {/* Impact Telemetry Badges */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-[#1a1a1a] border border-rose-500/30 p-3.5 rounded-xs flex items-start gap-3">
                      <Clock className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[9px] font-mono uppercase text-rose-400 font-bold block">Metabolic Burn</span>
                        <span className="text-xs text-zinc-200 font-mono font-semibold">{selected.metabolicCost}</span>
                      </div>
                    </div>
                    <div className="bg-[#1a1a1a] border border-amber-500/30 p-3.5 rounded-xs flex items-start gap-3">
                      <DollarSign className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[9px] font-mono uppercase text-amber-400 font-bold block">Financial / Strategic Drag</span>
                        <span className="text-xs text-zinc-200 font-mono font-semibold">{selected.financialDrain}</span>
                      </div>
                    </div>
                  </div>

                  {/* Forensic Cause & Installed Gate */}
                  <div className="space-y-4 pt-2">
                    <div className="p-4 bg-white/5 border border-white/5 rounded-xs space-y-1.5">
                      <div className="flex items-center gap-2 text-zinc-300">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                        <span className="text-[10px] font-mono uppercase font-bold tracking-wider text-rose-300">
                          Root Systemic Failure:
                        </span>
                      </div>
                      <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                        {selected.rootFailure}
                      </p>
                    </div>

                    <div className="p-4 bg-[#1b1b1b] border border-[#b8860b]/40 rounded-xs space-y-1.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[#b8860b]">
                          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                          <span className="text-[10px] font-mono uppercase font-bold tracking-wider">
                            Installed Sovereign Execution Protocol:
                          </span>
                        </div>
                        <span className="text-[9px] font-mono px-2 py-0.5 bg-[#b8860b] text-black font-bold rounded-xs">
                          {selected.installedGate.split(':')[0]}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-200 leading-relaxed font-sans font-medium">
                        {selected.clinicalFix}
                      </p>
                    </div>
                  </div>

                  {/* Immediate Action Bar */}
                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-[10px] font-mono text-zinc-400">
                      Included in the 10-Node Institutional Triangulation Audit
                    </span>
                    <button
                      onClick={() => navigate('/assessment')}
                      className="px-4 py-2 bg-[#b8860b] hover:bg-white hover:text-black text-black font-mono font-bold text-[10px] uppercase tracking-wider rounded-xs transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                    >
                      <span>Diagnose Your Enterprise</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                </motion.div>
              </AnimatePresence>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ExecutiveFrictionScanner;
