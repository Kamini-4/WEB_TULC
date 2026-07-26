import React from 'react';
import { motion } from 'motion/react';
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
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-[#0a0a0a] min-h-screen"
    >
      <section className="pt-6 md:pt-12 pb-8 bg-[#0a0a0a] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[#b8860b] text-[10px] font-black uppercase mb-2 font-mono">End-to-End Methodology</h2>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 leading-tight font-serif">Systemic <span className="italic text-[#b8860b]">Alignment.</span></h1>
          <p className="max-w-3xl text-zinc-300 text-sm sm:text-base leading-relaxed italic font-light">
            Moving beyond superficial advisory into the physics of structural alignment. We partner with leadership at every step of the journey—from diagnostic substrate mapping to self-cohering operational governance.
          </p>
        </div>
      </section>

      {/* Problem Section: Establish the Friction Before Introducing the Solution */}
      <div className="bg-[#0a0a0a] border-t border-white/5 py-4">
        <Problem />
      </div>
      
      <div className="bg-[#0a0a0a]">
        <Methodology onBriefClick={onBriefClick} />
      </div>
      <div className="bg-[#0a0a0a]">
        <StrategicOutcomes />
      </div>
      
      {/* Three Pillars: TULC Core IP Framework */}
      <ThreePillars />
      
      <section className="py-12 bg-[#0a0a0a] text-white border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6">
           <h3 className="text-3xl font-bold mb-12">The Four Pillars of <span className="italic text-[#b8860b]">Enterprise Alignment.</span></h3>
           <div className="grid gap-12">
             <div className="border-l-2 border-[#b8860b] pl-8">
               <h4 className="text-xl font-bold mb-4">01. Structural Foundation</h4>
               <p className="text-zinc-400 leading-relaxed italic font-light">The capacity of the operational foundation to support scaling volume without performance drift.</p>
             </div>
             <div className="border-l-2 border-[#b8860b] pl-8">
               <h4 className="text-xl font-bold mb-4">02. Decision Velocity</h4>
               <p className="text-zinc-400 leading-relaxed italic font-light">The speed at which strategic intent is converted into market response.</p>
             </div>
             <div className="border-l-2 border-[#b8860b] pl-8">
               <h4 className="text-xl font-bold mb-4">03. Operational Alignment</h4>
               <p className="text-zinc-400 leading-relaxed italic font-light">The direct alignment of team execution layers with leadership's core strategic vision.</p>
             </div>
             <div className="border-l-2 border-[#b8860b] pl-8">
               <h4 className="text-xl font-bold mb-4">04. Strategic Continuity</h4>
               <p className="text-zinc-400 leading-relaxed italic font-light">The ultimate yield: decoupling your enterprise's scaling capacity from day-to-day individual oversight.</p>
             </div>
           </div>
        </div>
      </section>

      {/* Strategic Newsletter Placement - Methodology Endpoint */}
      <section className="py-20 bg-[#0a0a0a] text-white border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <Newsletter />
        </div>
      </section>
    </motion.div>
  );
};

export default MethodologyPage;
