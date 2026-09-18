import React from 'react';
import { motion } from 'motion/react';
import HumanSubstrateManifesto from '../../components/HumanSubstrateManifesto.tsx';
import Methodology from '../../components/Methodology.tsx';
import StrategicOutcomes from '../../components/StrategicOutcomes.tsx';
import ThreePillars from '../../components/ThreePillars.tsx';
import Newsletter from '../../components/Newsletter.tsx';
import Problem from '../../components/Problem.tsx';

interface MethodologyPageProps {
  onBriefClick: (id?: string) => void;
}

const MethodologyPage: React.FC<MethodologyPageProps> = ({ onBriefClick }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-[#0a0a0a] min-h-screen"
    >
      {/* Editorial Header */}
      <section className="pt-6 md:pt-12 pb-8 bg-[#0a0a0a] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[#b8860b] text-[10px] font-black uppercase mb-2 font-mono tracking-widest">End-to-End Methodology</h2>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight font-serif">Systemic <span className="italic text-[#b8860b]">Alignment.</span></h1>
          <p className="max-w-3xl text-zinc-300 text-sm sm:text-base leading-relaxed italic font-light font-serif">
            Moving beyond superficial advisory into the physics of structural alignment. We partner with leadership at every step of the journey—from diagnostic substrate mapping to self-cohering operational governance.
          </p>
        </div>
      </section>

      {/* 01. The Human Substrate Manifesto: Systems as Codified Human Behavior */}
      <HumanSubstrateManifesto />

      {/* 02. Problem Diagnostics: The Root Friction */}
      <div className="bg-[#0a0a0a] border-t border-white/5 py-4">
        <Problem />
      </div>
      
      {/* 03. Core 3-Phase Installation Protocol */}
      <div className="bg-[#0a0a0a]">
        <Methodology onBriefClick={onBriefClick} />
      </div>

      {/* 04. Strategic Outcomes & Value Yield */}
      <div className="bg-[#0a0a0a]">
        <StrategicOutcomes />
      </div>
      
      {/* 05. Three Pillars: TULC Core IP Framework */}
      <ThreePillars />

      {/* 06. Strategic Newsletter & Dispatch Terminal */}
      <section className="py-20 bg-[#0a0a0a] text-white border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <Newsletter />
        </div>
      </section>
    </motion.div>
  );
};

export default MethodologyPage;
