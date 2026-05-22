
import React from 'react';
import { motion } from 'framer-motion';
import Methodology from '../../components/Methodology.tsx';
import StrategicOutcomes from '../../components/StrategicOutcomes.tsx';

interface MethodologyPageProps {
  onBriefClick: (id?: string) => void;
}

const MethodologyPage: React.FC<MethodologyPageProps> = ({ onBriefClick }) => {
  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      <section className="pt-16 pb-8 bg-[#0a0a0a] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.4em] mb-4">Deep Dive</h2>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Systemic <br /><span className="italic text-[#b8860b]">Physics.</span></h1>
          <p className="max-w-3xl text-zinc-500 text-lg leading-relaxed italic font-light">
            Moving beyond psychometrics into the realm of architectural integrity. We analyze the forces that govern institutional growth.
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
           <h3 className="text-3xl font-bold mb-12">The Four Pillars of <span className="italic text-[#b8860b]">Sovereign Integrity.</span></h3>
           <div className="grid gap-12">
             <div className="border-l-2 border-[#b8860b] pl-8">
               <h4 className="text-xl font-bold mb-4">01. Substrate Density</h4>
               <p className="text-zinc-400 leading-relaxed italic font-light">The ability of the foundation to carry strategic weight without structural variance.</p>
             </div>
             <div className="border-l-2 border-[#b8860b] pl-8">
               <h4 className="text-xl font-bold mb-4">02. Decision Velocity</h4>
               <p className="text-zinc-400 leading-relaxed italic font-light">The speed at which strategic intent is converted into market delta.</p>
             </div>
             <div className="border-l-2 border-[#b8860b] pl-8">
               <h4 className="text-xl font-bold mb-4">03. Trust Resonance</h4>
               <p className="text-zinc-400 leading-relaxed italic font-light">The alignment of relational infrastructure with architectural command.</p>
             </div>
             <div className="border-l-2 border-[#b8860b] pl-8">
               <h4 className="text-xl font-bold mb-4">04. Sovereign Peace</h4>
               <p className="text-zinc-400 leading-relaxed italic font-light">The ultimate yield: decoupling your impact from your cognitive burn rate.</p>
             </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default MethodologyPage;
