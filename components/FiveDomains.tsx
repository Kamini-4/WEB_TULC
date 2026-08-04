import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Cpu, Zap, Shield, HeartCheck, Layers, ChevronRight, Award, ArrowRight, FileText, Calculator } from 'lucide-react';

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
    subtitle: "Executive Decision Flow & Bandwidth",
    benefit: "Reclaims 30–40% of executive leadership schedule by stripping away operational review clutter and low-leverage oversight loops.",
    pain: "Calendar bogged down in reactive micro-decisions, status meetings, and cognitive friction that dilutes long-range founder focus.",
    outcome: "100% of liberated executive bandwidth redirected strictly to capital allocation, strategic partnerships, and enterprise vision within 90 days.",
    vision: "An insulated C-suite operating with zero daily operational bottlenecks and absolute strategic decision clarity.",
    icon: <Brain className="w-4 h-4 text-[#b8860b]" />
  },
  {
    id: "02",
    title: "Systemic Integrity",
    subtitle: "Organizational Execution Architecture",
    benefit: "Hard-codes founder intent into automated operational logic gates so directives execute flawlessly across all business units.",
    pain: "Strategic signal loss, constant follow-ups, execution drift, and inconsistent departmental output as headcount expands.",
    outcome: "SOPs and cross-functional directives execute autonomously with zero quality degradation or need for manual management intervention.",
    vision: "A self-cohering organizational structure that operates at peak fidelity regardless of executive physical presence.",
    icon: <Cpu className="w-4 h-4 text-[#b8860b]" />
  },
  {
    id: "03",
    title: "Strategic Velocity",
    subtitle: "Operational Directives & Speed",
    benefit: "Compresses the cycle time between board-approved strategic decisions and on-the-ground market deployment.",
    pain: "Multi-layered management drag, decision latency, committee paralysis, and delayed market initiative rollouts.",
    outcome: "Doubles organizational decision-to-execution frequency, delivering market initiatives precisely on target and ahead of schedule.",
    vision: "A frictionless, high-frequency execution engine that translates executive vision into market action instantly.",
    icon: <Zap className="w-4 h-4 text-[#b8860b]" />
  },
  {
    id: "04",
    title: "Moral Gravity",
    subtitle: "Governance & Compliance Standards",
    benefit: "Establishes unyielding institutional compliance, ethical safeguards, and unified governance structures across all operations.",
    pain: "Regulatory vulnerabilities, policy non-compliance, internal friction, and reputational exposures from decentralized decisions.",
    outcome: "A self-policing culture of radical accountability that mitigates legal, regulatory, and operational enterprise risks before they materialize.",
    vision: "A bulletproof governance framework that safeguards long-term enterprise valuation and brand equity across market cycles.",
    icon: <Shield className="w-4 h-4 text-[#b8860b]" />
  },
  {
    id: "05",
    title: "Cultural Fidelity",
    subtitle: "Continuity, Key-Person Protection & Succession",
    benefit: "Insulates the organization against key-person dependency risks while locking in permanent institutional memory and leadership culture.",
    pain: "Severe vulnerability to key executive exits, knowledge silos, leadership drift, and fragile succession planning.",
    outcome: "Codified leadership criteria, active bench-strength talent pipelines, and zero operational disruption during executive transitions.",
    vision: "Complete operational resilience and multi-generational business continuity driven by repeatable succession protocols.",
    icon: <Layers className="w-4 h-4 text-[#b8860b]" />
  }
];

const FiveDomains: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const navigate = useNavigate();

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
              <span className="text-[#b8860b] text-[10px] font-black uppercase font-mono">
                Provisional Patent-Pending System
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-serif text-white">
              The 5 Sovereign <span className="text-[#b8860b] italic font-light">Domains.</span>
            </h2>
          </div>
          <p className="text-zinc-300 text-xs sm:text-sm italic font-light max-w-md leading-relaxed">
            The core architecture of founder liberation. Select any domain below to inspect the exact operational friction we eliminate and the 90-day benchmark outcomes we engineer for your enterprise.
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
          <div className="absolute top-0 right-0 px-3 py-1 bg-[#b8860b]/20 text-[#b8860b] text-[8px] font-mono uppercase font-bold">
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
                    <span className="text-[10px] text-[#b8860b] uppercase font-mono block font-bold">
                      {domains[selectedIdx].subtitle}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                      {domains[selectedIdx].title}
                    </h3>
                  </div>
                </div>

                <div className="p-4 bg-white/5 border border-white/5 rounded-xs space-y-1.5">
                  <span className="text-[9px] font-black uppercase text-[#b8860b] font-mono block">
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
                  <span className="text-[9px] font-black uppercase text-[#b8860b] font-mono block">
                    Key Benefit
                  </span>
                  <p className="text-xs text-zinc-200 font-medium leading-relaxed">
                    {domains[selectedIdx].benefit}
                  </p>
                </div>

                {/* Friction */}
                <div className="bg-zinc-900 border border-white/10 p-4 rounded-xs space-y-1.5">
                  <span className="text-[9px] font-black uppercase text-red-400 font-mono block">
                    Friction Avoided
                  </span>
                  <p className="text-xs text-zinc-300 italic font-light leading-relaxed">
                    {domains[selectedIdx].pain}
                  </p>
                </div>

                {/* Outcome */}
                <div className="bg-zinc-900 border border-white/10 p-4 rounded-xs space-y-1.5">
                  <span className="text-[9px] font-black uppercase text-emerald-400 font-mono block">
                    90-Day Outcome
                  </span>
                  <p className="text-xs text-zinc-200 font-semibold leading-relaxed">
                    {domains[selectedIdx].outcome}
                  </p>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Seamless Interlink Action Matrix */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="text-[10px] font-mono text-zinc-400 uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b8860b]"></span>
              <span>CALIBRATE DOMAIN 0{selectedIdx + 1} ({domains[selectedIdx].title.toUpperCase()}):</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <Link 
                to="/assessment" 
                className="px-3.5 py-2 bg-[#b8860b] hover:bg-white hover:text-black text-white text-[9px] font-bold uppercase transition-all flex items-center gap-1.5 rounded-xs"
              >
                <Calculator className="w-3 h-3" />
                <span>Audit Domain in Assessment</span>
              </Link>
              <Link 
                to="/services" 
                className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-white/10 text-[9px] font-bold uppercase transition-all flex items-center gap-1.5 rounded-xs"
              >
                <ArrowRight className="w-3 h-3 text-[#b8860b]" />
                <span>View Engagement Tracks</span>
              </Link>
              <Link 
                to="/library" 
                className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-white/10 text-[9px] font-bold uppercase transition-all flex items-center gap-1.5 rounded-xs"
              >
                <FileText className="w-3 h-3 text-[#b8860b]" />
                <span>Read White Paper</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FiveDomains;

