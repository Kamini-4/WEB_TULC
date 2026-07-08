import React from 'react';
import VideoPlayer from './VideoPlayer';
import { motion } from 'motion/react';

const PrincipalDispatch: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section id="principal" className="py-20 sm:py-24 md:py-32 bg-[#f5f5f0] overflow-hidden relative isolate">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div 
          className="grid lg:grid-cols-12 gap-10 sm:gap-16 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={containerVariants}
        >
          <motion.div className="lg:col-span-5 relative w-full max-w-[450px] mx-auto lg:mx-0" variants={imageVariants}>
            <VideoPlayer 
              videoUrl="https://drive.google.com/file/d/1435SE1X1AMP7jWn7Dwcqx9JD1kHtov7w/view?usp=drive_link" 
              aspectRatio="portrait"
              title="Strategic Briefing"
              className="shadow-2xl border border-white/10"
            />
            {/* Decorative Frame */}
            <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-16 h-16 sm:w-24 sm:h-24 border-t-2 border-l-2 border-[#b8860b]/30 -z-10" />
            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-16 h-16 sm:w-24 sm:h-24 border-b-2 border-r-2 border-[#b8860b]/30 -z-10" />
          </motion.div>
          
          <div className="lg:col-span-7">
            <motion.h2 className="text-[#b8860b] text-[9px] sm:text-[11px] font-black uppercase mb-6 sm:mb-8 tracking-[0.4em] sm:tracking-[0.5em]" variants={itemVariants}>
              Principal Dispatch
            </motion.h2>
            <div className="space-y-6 sm:space-y-10">
              <motion.h3 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#111111] leading-tight" variants={itemVariants}>
                Strategy is secondary; <span className="italic text-[#b8860b]">Organizational Integrity</span> is primary.
              </motion.h3>
              <motion.div className="h-[2px] w-24 sm:w-32 bg-[#b8860b]" variants={itemVariants} />
              
              <div className="space-y-6 sm:space-y-8 text-zinc-600 text-lg sm:text-xl md:text-2xl font-light italic leading-relaxed">
                <motion.p variants={itemVariants}>
                  "Most advisories focus on mentoring people. We focus on engineering the system. A leader's decision is only as effective as the structure that carries it."
                </motion.p>
                <motion.p variants={itemVariants}>
                  "Our mission is to install structural guardrails that guarantee flawless execution at every level, freeing you to lead without constant personal intervention."
                </motion.p>
                <motion.div className="mt-8 flex items-center gap-4" variants={itemVariants}>
                  <div className="w-8 h-px bg-[#b8860b]/30" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#111111]">TULC Architecture</span>
                </motion.div>
              </div>
              
              <motion.div className="pt-8 sm:pt-12 flex flex-wrap gap-6 sm:gap-8" variants={itemVariants}>
                <div className="flex flex-col">
                  <span className="text-[8px] sm:text-[10px] font-black uppercase text-zinc-400 mb-1 sm:mb-2 tracking-widest">Current Focus</span>
                  <span className="text-xs sm:text-sm font-bold text-[#111111] uppercase tracking-wider">Strategic Recalibration</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] sm:text-[10px] font-black uppercase text-zinc-400 mb-1 sm:mb-2 tracking-widest">Availability</span>
                  <span className="text-xs sm:text-sm font-bold text-[#b8860b] uppercase tracking-wider">Limited Intake</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PrincipalDispatch;
