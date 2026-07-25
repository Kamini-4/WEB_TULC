import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Cpu, Zap, Shield, HeartCheck, Layers, ChevronRight, Award } from 'lucide-react';

interface Domain {
  id: string;
  title: string;
  subtitle: string;
  benefit: string;
  pain: string;
  outcome: string;
  vision: string;
  icon: React.ReactNode;
}

const domains: Domain[] = [
  {
    id: "01",
    title: "Cognitive Clarity",
    subtitle: "Executive Decision Flow",
    benefit: "Reclaim up to 40% of the executive schedule by eliminating low-level decision-making.",
    pain: "Calendar packed with review meetings and decision fatigue.",
    outcome: "Bandwidth reallocated to capital allocation and strategy in 90 days.",
    vision: "Zero daily operational bottlenecks and absolute priority clarity.",
    icon: <Brain className="w-4 h-4 text-[#b8860b]" />
  },
  {
    id: "02",
    title: "Systemic Integrity",
    subtitle: "Organizational Architecture",
    benefit: "Maintains consistent strategic alignment and execution across operating divisions.",
    pain: "Inconsistent performance, continuous follow-ups, and scaling drift.",
    outcome: "Standard operating procedures execute reliably without manual intervention.",
    vision: "Predictable workflow that functions reliably regardless of supervisor presence.",
    icon: <Cpu className="w-4 h-4 text-[#b8860b]" />
  },
  {
    id: "03",
    title: "Strategic Velocity",
    subtitle: "Operational Directives",
    benefit: "Accelerates response times when deploying new board-approved initiatives.",
    pain: "Delays in executing strategic decisions caused by management layers.",
    outcome: "Initiatives execute precisely on scheduled timelines.",
    vision: "Responsive structure translating executive decisions into action instantly.",
    icon: <Zap className="w-4 h-4 text-[#b8860b]" />
  },
  {
    id: "04",
    title: "Moral Gravity",
    subtitle: "Governance & Compliance",
    benefit: "Establishes institutional compliance and clear corporate governance.",
    pain: "Internal policy friction and reactive handling of governance challenges.",
    outcome: "Unified culture of accountability reducing regulatory and legal risks.",
    vision: "Robust governance framework protecting long-term enterprise value.",
    icon: <Shield className="w-4 h-4 text-[#b8860b]" />
  },
  {
    id: "05",
    title: "Cultural Fidelity",
    subtitle: "Business Continuity",
    benefit: "Guarantees institutional memory, succession readiness, and stability.",
    pain: "Dependency on key personnel and talent exit liabilities.",
    outcome: "Documented leadership criteria and prepared internal talent pipeline.",
    vision: "Long-term operational resilience driven by repeatable succession processes.",
    icon: <Layers className="w-4 h-4 text-[#b8860b]" />
  }
];

const FiveDomains: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'grid' | 'focused'>('grid');

  return (
    <section 
      id="domains" 
      className="py-12 sm:py-16 bg-[#0a0a0a] text-white border-t border-white/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#b8860b]/10 border border-[#b8860b]/30 rounded-full mb-3">
              <Award className="w-3.5 h-3.5 text-[#b8860b]" />
              <span className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.2em] font-mono">
                Provisional Patent-Filed System
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white">
              The 5 Sovereign <span className="text-[#b8860b] italic font-light">Domains.</span>
            </h2>
          </div>
          <p className="text-zinc-400 text-xs sm:text-sm italic font-light max-w-md leading-relaxed">
            Strategic performance is a direct result of structural design across five core operational dimensions. Click any domain to inspect diagnostic metrics.
          </p>
        </div>

        {/* Domain Selection Tabs / Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {domains.map((domain, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xs border text-xs transition-all cursor-pointer font-mono ${
                selectedIdx === idx 
                  ? 'bg-[#b8860b] text-white border-[#b8860b] shadow-md font-bold' 
                  : 'bg-zinc-900/80 text-zinc-400 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              <span className="text-[10px] opacity-70">{domain.id}</span>
              <span>{domain.title}</span>
            </button>
          ))}
        </div>

        {/* Active Domain Detail Inspector Box (Black Box Executive UI) */}
        <div className="bg-[#111111] border border-[#b8860b]/40 p-6 sm:p-8 rounded-xs shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 px-3 py-1 bg-[#b8860b]/20 text-[#b8860b] text-[8px] font-mono uppercase tracking-widest font-bold">
            Domain 0{selectedIdx + 1} Diagnostic Matrix
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIdx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="grid md:grid-cols-12 gap-6 items-center"
            >
              {/* Domain Summary & Vision */}
              <div className="md:col-span-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[#b8860b]/10 border border-[#b8860b]/30 rounded-xs">
                    {domains[selectedIdx].icon}
                  </div>
                  <div>
                    <span className="text-[10px] text-[#b8860b] uppercase font-mono tracking-wider block font-bold">
                      {domains[selectedIdx].subtitle}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                      {domains[selectedIdx].title}
                    </h3>
                  </div>
                </div>

                <div className="p-4 bg-white/5 border border-white/5 rounded-xs space-y-1.5">
                  <span className="text-[9px] font-black uppercase tracking-wider text-[#b8860b] font-mono block">
                    Strategic Operational Vision
                  </span>
                  <p className="text-xs text-zinc-200 italic font-light leading-relaxed">
                    "{domains[selectedIdx].vision}"
                  </p>
                </div>
              </div>

              {/* Diagnostic Triad Grid */}
              <div className="md:col-span-7 grid sm:grid-cols-3 gap-3 text-left">
                
                {/* Benefit */}
                <div className="bg-zinc-900 border border-white/10 p-4 rounded-xs space-y-1.5">
                  <span className="text-[9px] font-black uppercase text-[#b8860b] font-mono tracking-wider block">
                    Key Benefit
                  </span>
                  <p className="text-xs text-zinc-200 font-medium leading-relaxed">
                    {domains[selectedIdx].benefit}
                  </p>
                </div>

                {/* Friction */}
                <div className="bg-zinc-900 border border-white/10 p-4 rounded-xs space-y-1.5">
                  <span className="text-[9px] font-black uppercase text-red-400 font-mono tracking-wider block">
                    Friction Avoided
                  </span>
                  <p className="text-xs text-zinc-300 italic font-light leading-relaxed">
                    {domains[selectedIdx].pain}
                  </p>
                </div>

                {/* Outcome */}
                <div className="bg-zinc-900 border border-white/10 p-4 rounded-xs space-y-1.5">
                  <span className="text-[9px] font-black uppercase text-emerald-400 font-mono tracking-wider block">
                    90-Day Outcome
                  </span>
                  <p className="text-xs text-zinc-200 font-semibold leading-relaxed">
                    {domains[selectedIdx].outcome}
                  </p>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default FiveDomains;

