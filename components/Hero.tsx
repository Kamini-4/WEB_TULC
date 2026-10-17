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
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  return (
    <section className="relative pt-4 pb-8 sm:pt-6 sm:pb-10 overflow-hidden bg-[#f5f5f0]">
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
          <motion.div className="inline-flex flex-wrap items-center justify-center gap-2 px-3.5 py-1 bg-white/90 border border-zinc-200 rounded-full mb-3.5 shadow-2xs" variants={itemVariants}>
            <span className="w-2 h-2 rounded-full bg-[#b8860b] animate-pulse" />
            <span className="text-[#111111] text-[10px] sm:text-[11px] font-black uppercase tracking-wider">BOUTIQUE EXECUTIVE ADVISORY</span>
            <span className="text-zinc-300">•</span>
            <span className="text-[#b8860b] text-[10px] sm:text-[11px] font-mono font-bold uppercase flex items-center gap-1">
              <Award className="w-3.5 h-3.5" /> 3 CEO MANDATES PER QUARTER
            </span>
          </motion.div>

          {/* Core Headline - Answers the core pain in under 3 seconds */}
          <motion.h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.15] mb-2.5 text-center font-serif text-[#111111]" variants={itemVariants}>
            Eliminate Founder Dependency and <br className="hidden sm:inline" />
            <span className="text-[#b8860b] italic font-light">Reclaim 15+ Hours Weekly.</span>
          </motion.h1>

          <motion.p className="text-sm sm:text-base lg:text-lg font-light text-zinc-700 max-w-3xl mb-5 leading-relaxed font-sans" variants={itemVariants}>
            Turn your leadership into a self-executing system so your enterprise scales without you trapped in every operational meeting.
          </motion.p>

          {/* Dual-Path Action Section with Internal Link Shortcuts */}
          <motion.div className="flex flex-col items-center gap-2.5 mb-6" variants={itemVariants}>
            <div className="flex flex-wrap gap-2.5 sm:gap-3 justify-center w-full max-w-xl">
              <a 
                href="https://calendly.com/d/d3jb-kpx-r6q"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[220px] px-5 py-3 bg-[#b8860b] text-white text-[10px] font-black uppercase hover:bg-[#111111] transition-all duration-300 shadow-md inline-flex items-center justify-center gap-2 cursor-pointer font-bold tracking-wider"
              >
                <span>Schedule Consultation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <button 
                onClick={() => navigate('/assessment')}
                className="flex-1 min-w-[220px] px-5 py-3 bg-white border border-zinc-300 text-[#111111] text-[10px] font-black uppercase hover:border-[#b8860b] hover:text-[#b8860b] transition-all duration-300 shadow-xs cursor-pointer font-bold tracking-wider inline-flex items-center justify-center gap-2"
              >
                <span>Take 90-Sec Bandwidth Diagnostic</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Internal Links Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-[10px] font-mono">
              <button 
                onClick={() => navigate('/toolkits')}
                className="px-2.5 py-1 bg-white border border-zinc-300 text-zinc-800 hover:border-[#b8860b] hover:text-[#b8860b] transition-colors rounded-2xs font-semibold cursor-pointer"
              >
                ⚡ Explore Founder Toolkits →
              </button>
              <button 
                onClick={() => navigate('/services')}
                className="px-2.5 py-1 bg-white border border-zinc-300 text-zinc-800 hover:border-[#b8860b] hover:text-[#b8860b] transition-colors rounded-2xs font-semibold cursor-pointer"
              >
                👑 Sovereign Retainer & Services →
              </button>
              <button 
                onClick={() => navigate('/intake')}
                className="px-2.5 py-1 bg-white border border-zinc-300 text-zinc-800 hover:border-[#b8860b] hover:text-[#b8860b] transition-colors rounded-2xs font-semibold cursor-pointer"
              >
                🏛 Enterprise Intake →
              </button>
            </div>

            <span className="text-[10px] sm:text-[11px] text-zinc-500 font-mono">
              ✦ For CEOs, Board Chairs & Enterprise Leaders Scaling $10M to $100M+ • Zero Data Retention
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
