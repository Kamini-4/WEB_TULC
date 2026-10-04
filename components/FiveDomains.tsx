import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Brain, Cpu, Zap, Shield, Layers, Award, ArrowRight, FileText, Calculator, AlertTriangle, CheckCircle2, HelpCircle } from 'lucide-react';

interface Domain {
  id: string;
  title: string;
  subtitle: string;
  founderTerm: string;
  coreQuestion: string;
  symptom: string;
  benefit: string;
  outcome: string;
  vision: string;
  icon: React.ReactNode;
}

const domains: Domain[] = [
  {
    id: "01",
    title: "Cognitive Clarity",
    subtitle: "Executive Decision Flow & Bandwidth",
    founderTerm: "Founder Bandwidth & Focus",
    coreQuestion: "Is your brain working on $10M strategic moves, or getting drained by daily tactical brushfires?",
    symptom: "Mornings consumed by slide reviews, approving minor expenses, and resolving repetitive operational escalations that dilute founder vision.",
    benefit: "Reclaims 15+ hours/week for pure market offense, capital allocation, and uninterrupted strategic leadership.",
    outcome: "100% of liberated executive bandwidth redirected strictly to enterprise growth, key partnerships, and high-leverage moves within 90 days.",
    vision: "An insulated C-suite operating with zero daily operational bottlenecks and absolute strategic decision clarity.",
    icon: <Brain className="w-4 h-4 text-[#b8860b]" />
  },
  {
    id: "02",
    title: "Systemic Integrity",
    subtitle: "Organizational Execution Architecture",
    founderTerm: "Zero-Loss Delegation",
    coreQuestion: "When you hand off a major initiative, does it execute to your exact standards—or do you have to step in and fix it?",
    symptom: "Constant check-in meetings, execution drift, and rework because middle managers lack codified decision parameters.",
    benefit: "Hard-codes founder intent into automated operational execution protocols so teams execute with your exact risk appetite without asking permission.",
    outcome: "Cross-functional directives and SOPs execute autonomously with zero quality degradation or need for manual founder intervention.",
    vision: "A self-cohering organizational engine that operates at peak fidelity regardless of executive physical presence.",
    icon: <Cpu className="w-4 h-4 text-[#b8860b]" />
  },
  {
    id: "03",
    title: "Strategic Velocity",
    subtitle: "Operational Directives & Speed",
    founderTerm: "Speed to Market",
    coreQuestion: "How many weeks does it take from deciding on a strategic initiative to seeing it live in the market?",
    symptom: "Multi-layered management lag, committee paralysis, endless alignment calls, and delayed market rollouts.",
    benefit: "High-conviction strategic initiatives deploy in days instead of quarters by eliminating unnecessary verification loops.",
    outcome: "Doubles decision-to-deployment velocity, delivering market initiatives on target, ahead of schedule, and with 40% less meeting drag.",
    vision: "A frictionless execution engine that translates board-level intent into market reality immediately.",
    icon: <Zap className="w-4 h-4 text-[#b8860b]" />
  },
  {
    id: "04",
    title: "Moral Gravity",
    subtitle: "Governance & Ownership Standards",
    founderTerm: "Executive Conviction & Trust",
    coreQuestion: "Do your managers make high-stakes calls with your exact values, or do they freeze and pass the buck upward?",
    symptom: "Department heads playing it safe, avoiding bold decisions, and escalating risk up to the CEO desk to dodge personal accountability.",
    benefit: "Instills a culture of sovereign ownership where leaders act with absolute integrity and make tough calls aligned to your core ethos.",
    outcome: "Zero governance blindspots, self-policing operational standards, and permanent protection of enterprise valuation and brand equity.",
    vision: "A bulletproof governance framework that safeguards long-term enterprise valuation across market cycles.",
    icon: <Shield className="w-4 h-4 text-[#b8860b]" />
  },
  {
    id: "05",
    title: "Cultural Fidelity",
    subtitle: "Continuity, Transparency & Key-Person De-risking",
    founderTerm: "No-BS Communication & Succession",
    coreQuestion: "Do you hear bad news immediately, or do people sugarcoat failures until it becomes a full-blown emergency?",
    symptom: "The 'Silence of Compliance'—teams nodding in status meetings, then hiding operational friction until deadlines are missed.",
    benefit: "Zero-delay error transparency protocol where execution problems surface in 15 minutes rather than 15 weeks.",
    outcome: "Elimination of defensive reporting, 100% leadership bench strength, and total resilience during executive transitions.",
    vision: "Complete institutional perpetuity and multi-generational business continuity driven by repeatable governance protocols.",
    icon: <Layers className="w-4 h-4 text-[#b8860b]" />
  }
];

const FiveDomains: React.FC = () => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const navigate = useNavigate();

  return (
    <section 
      id="domains" 
      className="py-14 sm:py-20 bg-[#0a0a0a] text-white border-t border-white/10 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-white/10 pb-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#b8860b]/10 border border-[#b8860b]/30 rounded-full mb-3">
              <Award className="w-3.5 h-3.5 text-[#b8860b]" />
              <span className="text-[#b8860b] text-[10px] font-black uppercase font-mono tracking-wider">
                Provisional Patent-Pending Architecture
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-white tracking-tight">
              The 5 Sovereign <span className="text-[#b8860b] italic font-light">Domains.</span>
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm font-serif mt-2 leading-relaxed">
              We translate founder intuition into permanent operating architecture. Select any domain below to inspect the daily friction we eliminate and the 90-day benchmark outcomes we install.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <button
              onClick={() => navigate('/assessment')}
              className="px-4 py-2.5 bg-[#b8860b] hover:bg-white hover:text-black text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xs transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Audit Your 5 Domains</span>
            </button>
          </div>
        </div>

        {/* Domain Selection Tabs / Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {domains.map((domain, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xs border text-xs transition-all cursor-pointer font-mono ${
                selectedIdx === idx 
                  ? 'bg-[#b8860b] text-black border-[#b8860b] shadow-md font-bold' 
                  : 'bg-zinc-900/80 text-zinc-300 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              <span className="text-[10px] opacity-70">0{idx + 1}.</span>
              <span>{domain.title}</span>
              <span className="text-[10px] opacity-60 hidden md:inline">// {domain.founderTerm}</span>
            </button>
          ))}
        </div>

        {/* Active Domain Detail Inspector Box (Executive UI) */}
        <div className="bg-[#121212] border border-[#b8860b]/40 p-6 sm:p-8 rounded-xs shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 px-3 py-1 bg-[#b8860b]/20 text-[#b8860b] text-[9px] font-mono uppercase font-bold tracking-wider">
            DOMAIN 0{selectedIdx + 1} DIAGNOSTIC MATRIX
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedIdx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Top Banner: Plain-English Concept & Core Question */}
              <div className="border-b border-white/10 pb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 bg-[#b8860b]/10 border border-[#b8860b]/30 rounded-xs">
                    {domains[selectedIdx].icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-[#b8860b] uppercase font-mono font-bold">
                        Domain 0{selectedIdx + 1} // {domains[selectedIdx].subtitle}
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold font-serif text-white mt-0.5">
                      {domains[selectedIdx].title} <span className="text-zinc-400 font-serif font-normal text-lg sm:text-xl">({domains[selectedIdx].founderTerm})</span>
                    </h3>
                  </div>
                </div>

                {/* Core Question Callout */}
                <div className="mt-4 p-4 bg-[#181818] border-l-4 border-[#b8860b] rounded-xs">
                  <span className="text-[9px] font-mono font-bold uppercase text-[#b8860b] tracking-wider block mb-1 flex items-center gap-1.5">
                    <HelpCircle className="w-3 h-3" />
                    The Diagnostic Question Every Founder Must Answer:
                  </span>
                  <p className="text-sm sm:text-base font-serif italic text-zinc-100">
                    &ldquo;{domains[selectedIdx].coreQuestion}&rdquo;
                  </p>
                </div>
              </div>

              {/* 3-Column Diagnostic Reality Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                
                {/* Column 1: Daily Bleed */}
                <div className="bg-[#181818] border border-rose-500/30 p-5 rounded-xs space-y-2">
                  <div className="flex items-center gap-2 text-rose-400">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
                      The Daily Bleed (Friction)
                    </span>
                  </div>
                  <p className="text-xs text-zinc-300 font-serif leading-relaxed">
                    {domains[selectedIdx].symptom}
                  </p>
                </div>

                {/* Column 2: The Fixed State */}
                <div className="bg-[#181818] border border-[#b8860b]/40 p-5 rounded-xs space-y-2">
                  <div className="flex items-center gap-2 text-[#b8860b]">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
                      The Installed Solution
                    </span>
                  </div>
                  <p className="text-xs text-zinc-200 font-serif leading-relaxed">
                    {domains[selectedIdx].benefit}
                  </p>
                </div>

                {/* Column 3: 90-Day Metric Outcome */}
                <div className="bg-[#181818] border border-emerald-500/30 p-5 rounded-xs space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Award className="w-3.5 h-3.5 shrink-0" />
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider">
                      90-Day Measurable Target
                    </span>
                  </div>
                  <p className="text-xs text-zinc-200 font-sans font-medium leading-relaxed">
                    {domains[selectedIdx].outcome}
                  </p>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Action Interlink Bar */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b8860b]"></span>
              <span>CALIBRATE DOMAIN 0{selectedIdx + 1} // {domains[selectedIdx].founderTerm.toUpperCase()}</span>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <Link 
                to="/assessment" 
                className="px-4 py-2 bg-[#b8860b] hover:bg-white hover:text-black text-black text-[10px] font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 rounded-xs shadow-sm"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Audit This Domain</span>
              </Link>
              <Link 
                to="/services" 
                className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-white/10 text-[10px] font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 rounded-xs"
              >
                <ArrowRight className="w-3.5 h-3.5 text-[#b8860b]" />
                <span>Explore Mandates</span>
              </Link>
              <Link 
                to="/library" 
                className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-white/10 text-[10px] font-mono font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 rounded-xs"
              >
                <FileText className="w-3.5 h-3.5 text-[#b8860b]" />
                <span>Read Dispatches</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FiveDomains;
