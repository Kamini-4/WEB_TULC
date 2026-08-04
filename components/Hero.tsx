import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Award, FileCode2, Mic, Cpu } from 'lucide-react';

interface HeroProps {
  onBriefClick?: (phaseId?: string) => void;
}

const Hero: React.FC<HeroProps> = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section className="relative pt-6 pb-12 sm:pt-8 sm:pb-16 md:pt-10 md:pb-16 overflow-hidden bg-[#f5f5f0]">
      {/* Background Accent Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-[120vw] max-w-[1200px] max-h-[600px] bg-[#b8860b]/5 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          className="max-w-5xl mx-auto text-center flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow & Institutional Credentials */}
          <motion.div className="inline-flex flex-wrap items-center justify-center gap-2 px-3.5 py-1.5 bg-white/80 border border-zinc-200/90 rounded-full mb-5 shadow-2xs" variants={itemVariants}>
            <span className="w-2 h-2 rounded-full bg-[#b8860b] animate-pulse" />
            <span className="text-[#111111] text-[10px] sm:text-[11px] font-black uppercase">The Unbounded Leadership Co.</span>
            <span className="text-zinc-300">|</span>
            <span className="text-[#b8860b] text-[10px] sm:text-[11px] font-mono font-bold uppercase flex items-center gap-1">
              <Award className="w-3.5 h-3.5" /> Provisional Patent-Pending System
            </span>
          </motion.div>

          {/* Unified Headline: Tightened font size with high-conversion client alignment */}
          <motion.h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.18] mb-4 text-center font-serif text-[#111111]" variants={itemVariants}>
            Lead Through <span className="text-[#b8860b] italic font-light">Architecture.</span> <br />
            <span className="text-xl sm:text-2xl lg:text-3xl font-light text-zinc-800">
              You Scaled an Enterprise. So Why Are You Still Solving Operational Fires?
            </span>
          </motion.h1>

          {/* Core Value Proposition & End-to-End Partnership Reassurance */}
          <motion.p className="text-xs sm:text-sm md:text-base text-zinc-700 font-light italic leading-relaxed mb-6 text-center max-w-3xl px-2" variants={itemVariants}>
            Up to <strong className="text-[#111111] font-semibold not-italic">40% of executive bandwidth</strong> is consumed resolving alignment friction. We do not offer generic advisory—we partner with you <span className="text-[#111111] font-bold not-italic">at every step of your scaling journey</span> to build <span className="text-[#b8860b] font-extrabold not-italic">self-executing operational architecture</span> that hard-codes founder intent for total cognitive liberation.
          </motion.p>

          {/* Proprietary Technical Capabilities Pills */}
          <motion.div className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mb-8 max-w-4xl" variants={itemVariants}>
            <div className="flex items-center gap-2 px-3.5 py-2 bg-white border border-zinc-200 rounded-xs shadow-2xs text-[10px] sm:text-[11px] font-mono text-zinc-800">
              <FileCode2 className="w-3.5 h-3.5 text-[#b8860b]" />
              <span><strong>Patent-Pending</strong> Substrate Assessment</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 bg-white border border-zinc-200 rounded-xs shadow-2xs text-[10px] sm:text-[11px] font-mono text-zinc-800">
              <Mic className="w-3.5 h-3.5 text-[#b8860b]" />
              <span><strong>Sub-Verbal & Voice</strong> Stress Mapping</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-2 bg-white border border-zinc-200 rounded-xs shadow-2xs text-[10px] sm:text-[11px] font-mono text-zinc-800">
              <Cpu className="w-3.5 h-3.5 text-[#b8860b]" />
              <span><strong>Human-Embedded</strong> Logic Gates</span>
            </div>
          </motion.div>

          {/* Direct Action CTAs */}
          <motion.div className="flex flex-wrap gap-3 sm:gap-4 justify-center mb-10" variants={itemVariants}>
            <a 
              href="https://calendly.com/d/d3jb-kpx-r6q"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-[#b8860b] text-white text-[10px] sm:text-[11px] font-black uppercase hover:bg-[#111111] transition-all duration-300 shadow-md inline-block text-center cursor-pointer font-bold"
            >
              Book Private Consult
            </a>
            <button 
              onClick={() => navigate('/assessment')}
              className="px-8 py-4 bg-white border border-zinc-300 text-[#111111] text-[10px] sm:text-[11px] font-black uppercase hover:border-[#b8860b] hover:text-[#b8860b] transition-all duration-300 shadow-xs cursor-pointer font-bold"
            >
              Audit Alignment Score
            </button>
          </motion.div>

          {/* Explicit Target Qualification Box ("Black Box" Styling) */}
          <motion.div 
            className="w-full max-w-5xl bg-[#111111] border border-[#b8860b]/30 p-6 sm:p-8 rounded-xs text-left mb-10 shadow-2xl relative overflow-hidden"
            variants={itemVariants}
          >
            <div className="absolute top-0 right-0 px-3.5 py-1 bg-[#b8860b]/20 text-[#b8860b] text-[8px] sm:text-[9px] font-black uppercase font-mono">
              Target Client Profile
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-xl">
                <span className="text-[#b8860b] text-[9px] font-black uppercase font-mono block">Exclusively Built For</span>
                <h3 className="text-lg sm:text-xl font-bold font-serif text-white">High-Growth Founders & Enterprise Leaders</h3>
                <p className="text-zinc-300 text-xs sm:text-sm font-light italic leading-relaxed">
                  Engineered specifically for executives running 20 to 500+ headcount enterprises who have scaled market presence but remain bogged down in daily operational alignment friction.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 md:border-l border-white/10 md:pl-6 text-[11px] font-mono">
                <div className="bg-white/5 p-3 rounded-xs border border-white/5">
                  <span className="text-[#b8860b] font-bold block mb-0.5">VC-Backed CEOs</span>
                  <span className="text-zinc-400 text-[10px] leading-tight block">Series A to Scale-Up</span>
                </div>
                <div className="bg-white/5 p-3 rounded-xs border border-white/5">
                  <span className="text-[#b8860b] font-bold block mb-0.5">Enterprise Founders</span>
                  <span className="text-zinc-400 text-[10px] leading-tight block">Multi-Crore Scale</span>
                </div>
                <div className="bg-white/5 p-3 rounded-xs border border-white/5">
                  <span className="text-[#b8860b] font-bold block mb-0.5">Board Chairs</span>
                  <span className="text-zinc-400 text-[10px] leading-tight block">Key-Person Protection</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* High-Impact Executive Yield Metrics (High-Attention Black Box Grid) */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-800 border border-zinc-800 shadow-2xl overflow-hidden w-full max-w-5xl mb-12 rounded-xs"
            variants={itemVariants}
          >
            <div className="flex flex-col items-center bg-[#111111] p-5 hover:bg-zinc-900 transition-colors">
              <span className="text-xl sm:text-2xl font-extrabold text-[#b8860b] block mb-1">40% Deficit</span>
              <span className="text-[9px] font-black uppercase text-zinc-300 block mb-1">Bandwidth Reclaimed</span>
              <span className="text-[10px] text-zinc-400 italic font-light block text-center">Eliminate reactive review traps</span>
            </div>
            <div className="flex flex-col items-center bg-[#111111] p-5 hover:bg-zinc-900 transition-colors">
              <span className="text-xl sm:text-2xl font-extrabold text-[#b8860b] block mb-1">100% Fidelity</span>
              <span className="text-[9px] font-black uppercase text-zinc-300 block mb-1">Delegation Parity</span>
              <span className="text-[10px] text-zinc-400 italic font-light block text-center">Zero strategic signal loss</span>
            </div>
            <div className="flex flex-col items-center bg-[#111111] p-5 hover:bg-zinc-900 transition-colors">
              <span className="text-xl sm:text-2xl font-extrabold text-white block mb-1">Zero Risk</span>
              <span className="text-[9px] font-black uppercase text-zinc-300 block mb-1">Key-Person Protection</span>
              <span className="text-[10px] text-zinc-400 italic font-light block text-center">Continuity without presence</span>
            </div>
            <div className="flex flex-col items-center bg-[#111111] p-5 hover:bg-zinc-900 transition-colors">
              <span className="text-xl sm:text-2xl font-extrabold text-emerald-400 block mb-1">90 Days</span>
              <span className="text-[9px] font-black uppercase text-zinc-300 block mb-1">Full Calibration</span>
              <span className="text-[10px] text-zinc-400 italic font-light block text-center">Self-cohering governance</span>
            </div>
          </motion.div>

          {/* Structured 3 Core Pillars Section */}
          <motion.div className="w-full text-left max-w-5xl" variants={itemVariants}>
            <div className="flex items-center justify-between mb-5 pb-2 border-b border-zinc-300">
              <span className="text-[10px] font-black uppercase text-[#b8860b]">The 3 Pillars of Alignment Architecture</span>
              <button 
                onClick={() => navigate('/services')}
                className="text-[9px] font-bold uppercase text-zinc-600 hover:text-[#b8860b] transition-colors"
              >
                View Full Protocols &rarr;
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              <div 
                onClick={() => navigate('/services')}
                className="bg-white border border-zinc-200 p-5 rounded-xs hover:border-[#b8860b]/60 transition-all cursor-pointer group shadow-xs hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-black uppercase text-[#b8860b] font-mono">Phase 01</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b8860b] group-hover:scale-150 transition-transform" />
                </div>
                <h3 className="text-base font-bold text-zinc-900 mb-1.5 font-serif group-hover:text-[#b8860b] transition-colors">Substrate Audit</h3>
                <p className="text-xs text-zinc-600 italic font-light leading-relaxed">
                  Forensic analysis of institutional lag, decision bottlenecks, and cognitive leaks across leadership layers.
                </p>
              </div>

              <div 
                onClick={() => navigate('/services')}
                className="bg-white border border-zinc-200 p-5 rounded-xs hover:border-[#b8860b]/60 transition-all cursor-pointer group shadow-xs hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-black uppercase text-[#b8860b] font-mono">Phase 02</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b8860b] group-hover:scale-150 transition-transform" />
                </div>
                <h3 className="text-base font-bold text-zinc-900 mb-1.5 font-serif group-hover:text-[#b8860b] transition-colors">Logic Gate Engineering</h3>
                <p className="text-xs text-zinc-600 italic font-light leading-relaxed">
                  Hard-coding strategic rules and founder reasoning into operational logic gates for 100% execution fidelity.
                </p>
              </div>

              <div 
                onClick={() => navigate('/services')}
                className="bg-white border border-zinc-200 p-5 rounded-xs hover:border-[#b8860b]/60 transition-all cursor-pointer group shadow-xs hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-[10px] font-black uppercase text-[#b8860b] font-mono">Phase 03</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#b8860b] group-hover:scale-150 transition-transform" />
                </div>
                <h3 className="text-base font-bold text-zinc-900 mb-1.5 font-serif group-hover:text-[#b8860b] transition-colors">Institutional Calibration</h3>
                <p className="text-xs text-zinc-600 italic font-light leading-relaxed">
                  Embedding trust resonance and self-cohering team accountability to ensure momentum without founder presence.
                </p>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
