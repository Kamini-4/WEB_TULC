import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Award, CheckCircle2 } from 'lucide-react';

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
        staggerChildren: 0.08,
        delayChildren: 0.04
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section className="relative pt-8 pb-12 sm:pt-12 sm:pb-16 overflow-hidden bg-[#f5f5f0]">
      {/* Background Accent Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120vw] h-[120vw] max-w-[1200px] max-h-[500px] bg-[#b8860b]/5 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center flex flex-col items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow: Institutional Positioning */}
          <motion.div className="inline-flex flex-wrap items-center justify-center gap-2 px-4 py-1.5 bg-white/90 border border-zinc-200 rounded-full mb-6 shadow-2xs" variants={itemVariants}>
            <span className="w-2 h-2 rounded-full bg-[#b8860b] animate-pulse" />
            <span className="text-[#111111] text-[10px] sm:text-[11px] font-black uppercase tracking-wider">BOUTIQUE EXECUTIVE ADVISORY</span>
            <span className="text-zinc-300">•</span>
            <span className="text-[#b8860b] text-[10px] sm:text-[11px] font-mono font-bold uppercase flex items-center gap-1">
              <Award className="w-3.5 h-3.5" /> STRICTLY 3 CEO MANDATES PER QUARTER
            </span>
          </motion.div>

          {/* Core Headline */}
          <motion.h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] mb-4 text-center font-serif text-[#111111]" variants={itemVariants}>
            Turn Your Leadership Into a <span className="text-[#b8860b] italic font-light">System.</span> <br />
            <span className="text-xl sm:text-2xl lg:text-3xl font-light text-zinc-700 block mt-2 font-sans">
              Stop being the operational bottleneck in your own enterprise.
            </span>
          </motion.h1>

          {/* Quick Context & 3 Scannable Pointers */}
          <motion.div className="w-full max-w-3xl mb-8 space-y-4" variants={itemVariants}>
            <p className="text-sm sm:text-base text-zinc-700 font-normal leading-relaxed text-center px-4">
              When a company scales past $10M, founder calendar overload kills velocity. We install self-executing management systems so your leadership team makes decisions without you in every meeting.
            </p>

            {/* 3 Executive Pointers (No Wall of Text) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-left">
              <div className="bg-white/80 border border-zinc-200/90 p-3.5 rounded-xs flex items-start gap-2.5 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] font-bold text-[#111111] uppercase tracking-wide">Free 15+ Hrs / Week</div>
                  <div className="text-[11px] text-zinc-600 mt-0.5 leading-snug">Eradicate status syncs, reactive fire-fighting & review bottlenecks.</div>
                </div>
              </div>
              <div className="bg-white/80 border border-zinc-200/90 p-3.5 rounded-xs flex items-start gap-2.5 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] font-bold text-[#111111] uppercase tracking-wide">Autonomous Delegation</div>
                  <div className="text-[11px] text-zinc-600 mt-0.5 leading-snug">Codify your judgment into boundaries so directors make calls safely.</div>
                </div>
              </div>
              <div className="bg-white/80 border border-zinc-200/90 p-3.5 rounded-xs flex items-start gap-2.5 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[11px] font-bold text-[#111111] uppercase tracking-wide">The 30-Day Step-Away</div>
                  <div className="text-[11px] text-zinc-600 mt-0.5 leading-snug">Pass the ultimate test: your company scales without key-person risk.</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Exactly 2 Clear Actions (No Choice Paralysis) */}
          <motion.div className="flex flex-col items-center gap-3 mb-10" variants={itemVariants}>
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
              <a 
                href="https://calendly.com/d/d3jb-kpx-r6q"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#b8860b] text-white text-[10px] sm:text-[11px] font-black uppercase hover:bg-[#111111] transition-all duration-300 shadow-md inline-block text-center cursor-pointer font-bold tracking-wider"
              >
                Schedule Private Consultation →
              </a>
              <button 
                onClick={() => navigate('/assessment')}
                className="px-8 py-4 bg-white border border-zinc-300 text-[#111111] text-[10px] sm:text-[11px] font-black uppercase hover:border-[#b8860b] hover:text-[#b8860b] transition-all duration-300 shadow-xs cursor-pointer font-bold tracking-wider"
              >
                Take Free Bandwidth Audit (3 Min)
              </button>
            </div>
            <span className="text-[10px] sm:text-[11px] text-zinc-500 font-mono">
              ✦ For CEOs, Holding Chairs & Scale-Up Founders ($10M–$100M+)
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

