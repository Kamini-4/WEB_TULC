import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Award, AlertTriangle, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';

interface HeroProps {
  onBriefClick?: (phaseId?: string) => void;
}

const Hero: React.FC<HeroProps> = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 1, y: 0 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section className="relative pt-6 pb-12 sm:pt-10 sm:pb-16 overflow-hidden bg-[#f5f5f0]">
      {/* Background Accent Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-[120vw] max-w-[1200px] max-h-[500px] bg-[#b8860b]/5 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          className="max-w-5xl mx-auto text-center flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow: Institutional Positioning */}
          <motion.div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 bg-white/90 border border-zinc-200 rounded-full mb-5 shadow-2xs" variants={itemVariants}>
            <span className="w-2 h-2 rounded-full bg-[#b8860b] animate-pulse" />
            <span className="text-[#111111] text-[10px] sm:text-[11px] font-black uppercase tracking-wider">BOUTIQUE EXECUTIVE ADVISORY</span>
            <span className="text-zinc-300">•</span>
            <span className="text-[#b8860b] text-[10px] sm:text-[11px] font-mono font-bold uppercase flex items-center gap-1">
              <Award className="w-3.5 h-3.5" /> STRICTLY 3 CEO MANDATES PER QUARTER
            </span>
          </motion.div>

          {/* Core Headline - Answers the core pain in under 3 seconds */}
          <motion.h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] mb-3 text-center font-serif text-[#111111]" variants={itemVariants}>
            Eliminate Founder Dependency and <br className="hidden sm:inline" />
            <span className="text-[#b8860b] italic font-light">Reclaim 15+ Hours Weekly.</span>
          </motion.h1>

          <motion.p className="text-base sm:text-lg lg:text-xl font-light text-zinc-700 max-w-3xl mb-8 leading-relaxed font-sans" variants={itemVariants}>
            Turn your leadership into a self-executing system so your enterprise scales without you trapped in every operational meeting.
          </motion.p>

          {/* 8-Second Visual Ribbon: Problem → How We Do It → Your 3 Steps */}
          <motion.div className="w-full mb-10 text-left" variants={itemVariants}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              {/* Column 1: The Problem */}
              <div className="bg-white border-2 border-red-500/20 p-5 rounded-xs shadow-xs relative overflow-hidden group hover:border-red-500/40 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-red-50 border border-red-200 text-red-700 text-[9px] font-mono font-black uppercase rounded-2xs">
                    <AlertTriangle className="w-3 h-3" /> 01. The Problem
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">Bottleneck</span>
                </div>
                <h2 className="text-base font-bold text-[#111111] mb-1.5 font-serif">
                  Founder Key-Person Drag
                </h2>
                <p className="text-xs text-zinc-600 leading-relaxed mb-3">
                  Past $10M, founder intuition becomes the single point of failure. Constant firefighting, review meetings, and decision lag bleed 15+ hours weekly.
                </p>
                <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px] font-mono text-red-600 font-bold">
                  <span>Symptom:</span>
                  <span>15+ hrs/wk lost in tactical syncs</span>
                </div>
              </div>

              {/* Column 2: How We Do It */}
              <div className="bg-white border-2 border-[#b8860b]/30 p-5 rounded-xs shadow-xs relative overflow-hidden group hover:border-[#b8860b] transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-amber-50 border border-[#b8860b]/30 text-[#b8860b] text-[9px] font-mono font-black uppercase rounded-2xs">
                    <Cpu className="w-3 h-3" /> 02. How We Do It
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">Architecture</span>
                </div>
                <h2 className="text-base font-bold text-[#111111] mb-1.5 font-serif">
                  Self-Executing Leadership OS
                </h2>
                <p className="text-xs text-zinc-600 leading-relaxed mb-3">
                  We install the 10-Node Triangulation Audit & 12 Invariant Execution Protocols—hard-coding your strategic judgment into autonomous decision gates.
                </p>
                <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px] font-mono text-[#b8860b] font-bold">
                  <span>Method:</span>
                  <span>10-Node Precision Diagnostic</span>
                </div>
              </div>

              {/* Column 3: The Steps Required From You */}
              <div className="bg-white border-2 border-emerald-500/20 p-5 rounded-xs shadow-xs relative overflow-hidden group hover:border-emerald-500/40 transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-[9px] font-mono font-black uppercase rounded-2xs">
                    <CheckCircle2 className="w-3 h-3" /> 03. Your 3 Steps
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">Execution</span>
                </div>
                <h2 className="text-base font-bold text-[#111111] mb-1.5 font-serif">
                  Diagnose → Install → Scale
                </h2>
                <p className="text-xs text-zinc-600 leading-relaxed mb-3">
                  <strong>1.</strong> 90-sec Audit or Consultation Call.<br />
                  <strong>2.</strong> Phase 0.0 Triangulation Audit.<br />
                  <strong>3.</strong> Full installation in 90 days. Pass the 30-day step-away test.
                </p>
                <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px] font-mono text-emerald-700 font-bold">
                  <span>Outcome:</span>
                  <span>The 30-Day Step-Away Test</span>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Dual-Path Action Section */}
          <motion.div className="flex flex-col items-center gap-3 mb-10" variants={itemVariants}>
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center w-full max-w-xl">
              <a 
                href="https://calendly.com/d/d3jb-kpx-r6q"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[240px] px-6 py-4 bg-[#b8860b] text-white text-[11px] font-black uppercase hover:bg-[#111111] transition-all duration-300 shadow-md inline-flex items-center justify-center gap-2 cursor-pointer font-bold tracking-wider"
              >
                <span>Schedule Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <button 
                onClick={() => navigate('/assessment')}
                className="flex-1 min-w-[240px] px-6 py-4 bg-white border border-zinc-300 text-[#111111] text-[11px] font-black uppercase hover:border-[#b8860b] hover:text-[#b8860b] transition-all duration-300 shadow-xs cursor-pointer font-bold tracking-wider inline-flex items-center justify-center gap-2"
              >
                <span>Take 90-Sec Bandwidth Diagnostic</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <span className="text-[10px] sm:text-[11px] text-zinc-500 font-mono">
              ✦ For CEOs, Board Chairs & Scale-Up Principals ($10M–$100M+) • Zero Data Retention
            </span>
          </motion.div>

          {/* 4 Proof Metric Cards */}
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-zinc-800 border border-zinc-800 shadow-2xl overflow-hidden w-full max-w-4xl rounded-xs"
            variants={itemVariants}
          >
            <div className="flex flex-col items-center bg-[#111111] p-4 sm:p-5 hover:bg-zinc-900 transition-colors">
              <span className="text-xl sm:text-2xl font-extrabold text-[#b8860b] block mb-1">+40% Focus</span>
              <span className="text-[9px] font-black uppercase text-zinc-300 block mb-1">Bandwidth Reclaimed</span>
              <span className="text-[10px] text-zinc-400 font-light block text-center">15+ hrs/wk saved from meetings</span>
            </div>
            <div className="flex flex-col items-center bg-[#111111] p-4 sm:p-5 hover:bg-zinc-900 transition-colors">
              <span className="text-xl sm:text-2xl font-extrabold text-[#b8860b] block mb-1">100% Fidelity</span>
              <span className="text-[9px] font-black uppercase text-zinc-300 block mb-1">Zero-Loss Delegation</span>
              <span className="text-[10px] text-zinc-400 font-light block text-center">Your judgment executed at the edge</span>
            </div>
            <div className="flex flex-col items-center bg-[#111111] p-4 sm:p-5 hover:bg-zinc-900 transition-colors">
              <span className="text-xl sm:text-2xl font-extrabold text-white block mb-1">Zero Risk</span>
              <span className="text-[9px] font-black uppercase text-zinc-300 block mb-1">Key-Person Protection</span>
              <span className="text-[10px] text-zinc-400 font-light block text-center">Pass the 30-day step-away test</span>
            </div>
            <div className="flex flex-col items-center bg-[#111111] p-4 sm:p-5 hover:bg-zinc-900 transition-colors">
              <span className="text-xl sm:text-2xl font-extrabold text-emerald-400 block mb-1">90 Days</span>
              <span className="text-[9px] font-black uppercase text-zinc-300 block mb-1">Full Installation</span>
              <span className="text-[10px] text-zinc-400 font-light block text-center">Permanent autonomous operating OS</span>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
