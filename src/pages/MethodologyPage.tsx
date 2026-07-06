import React from 'react';
import { motion } from 'framer-motion';
import Methodology from '../../components/Methodology.tsx';
import StrategicOutcomes from '../../components/StrategicOutcomes.tsx';
import Newsletter from '../../components/Newsletter.tsx';

interface MethodologyPageProps {
  onBriefClick: (id?: string) => void;
}

const MethodologyPage: React.FC<MethodologyPageProps> = ({ onBriefClick }) => {
  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <section className="pt-6 md:pt-12 pb-8 bg-[#0a0a0a] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.4em] mb-4">Deep Dive</h2>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Systemic <br /><span className="italic text-[#b8860b]">Alignment.</span></h1>
          <p className="max-w-3xl text-zinc-500 text-lg leading-relaxed italic font-light">
            Moving beyond superficial coaching into the realm of structural alignment. We analyze the forces that govern scalable enterprise growth.
          </p>
        </div>
      </section>
      
      <div className="bg-[#0a0a0a]">
        <Methodology onBriefClick={onBriefClick} />
      </div>
      <div className="bg-[#0a0a0a]">
        <StrategicOutcomes />
      </div>
      
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
    </div>
  );
};

export default MethodologyPage;
