
import React from 'react';
import { motion } from 'framer-motion';
import PrincipalDispatch from '../../components/PrincipalDispatch.tsx';

const About: React.FC = () => {
  return (
    <div className="bg-[#f5f5f0] min-h-screen pt-20 pb-20">
      {/* Video showing first on About Page */}
      <section className="-mt-12 mb-8">
        <PrincipalDispatch />
      </section>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h2 className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.4em] mb-4">The Institution</h2>
          <h1 className="text-4xl md:text-5xl font-bold text-[#111111] mb-8 leading-tight">
            Architecting <br />
            <span className="italic text-[#b8860b]">Sovereign Authority.</span>
          </h1>
          <div className="w-16 h-[2px] bg-[#111111] mb-12" />
        </motion.div>

        {/* VISION & MISSION DUAL-PANEL SECTION */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-[#111111] text-white p-12 md:p-16 border border-[#b8860b]/20 relative overflow-hidden flex flex-col justify-between rounded-sm shadow-xl"
          >
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#b8860b]/10 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <span className="text-lg">🌍</span>
                <span className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.4em] block">VISION</span>
              </div>
              <p className="text-[#f5f5f0] text-lg md:text-xl leading-relaxed font-light italic border-l border-[#b8860b]/40 pl-6 mb-8">
                To align human ambition with enduring organizational architecture — so that power, scale, and perpetuity compound as one, and what the world's greatest founders build today commands the future long after they have conquered it.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 relative z-10">
              <span className="text-[9px] uppercase font-mono text-zinc-500 tracking-wider block mb-2">DESIGN INSIGHT & CALIBRATION</span>
              <p className="text-[10px] text-zinc-400 italic font-mono leading-relaxed">
                "Commands the future" + "conquered it" — this is the language of dominion, not legacy. Our audience doesn't want to be remembered. They want to have won.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#111111] text-white p-12 md:p-16 border border-[#b8860b]/20 relative overflow-hidden flex flex-col justify-between rounded-sm shadow-xl"
          >
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#b8860b]/10 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <span className="text-lg">🏛️</span>
                <span className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.4em] block">MISSION</span>
              </div>
              <p className="text-white text-lg md:text-xl leading-relaxed font-light italic border-l border-[#b8860b]/40 pl-6 mb-6">
                <strong>We work with the world's most consequential founders</strong> to architect the structural conditions for absolute organizational sovereignty.
              </p>
              <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-light italic pl-6">
                Across five foundational domains of systemic alignment, we dismantle operational dependency, dissolve leadership entropy, and engineer the precise infrastructure that allows an empire to grow, scale, and compound — with or without its founder at the helm.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 relative z-10">
              <span className="text-[8px] uppercase font-black text-zinc-500 tracking-widest block mb-1">ALIGNMENT DOMAIN COVERAGE</span>
              <span className="text-[9px] text-[#b8860b] uppercase tracking-widest font-bold">Cognitive Clarity • Systemic Integrity • Strategic Velocity • Moral Gravity • Cultural Fidelity</span>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start mb-20">
          <div className="space-y-12">
            <p className="text-2xl text-zinc-800 leading-relaxed font-light italic">
              The Unbounded Leadership Co. (TULC) is not a consultancy. It is a design firm for the leadership substrate. We exist to solve the singular failure mode of the elite: <strong>Cognitive Insolvency.</strong>
            </p>
            <div className="bg-white p-12 border border-zinc-200 shadow-xl">
              <h3 className="text-xl font-bold mb-6 text-[#111111] border-b border-[#b8860b]/20 pb-4">Our Thesis</h3>
              <p className="text-zinc-600 leading-relaxed font-light italic text-sm mb-6">
                Most governance frameworks treat delegation as a decision-rights problem. We treat it as a systemic physics problem. Even when authority is formally transferred, the reasoning structure often remains locked in the leader's head.
              </p>
              <p className="text-zinc-600 leading-relaxed font-light italic text-sm">
                TULC identifies these logic leaks and hard-codes strategic intent into the organizational architecture, creating a high-fidelity execution machine that gains velocity in your absence.
              </p>
            </div>
          </div>

          <div className="space-y-16">
            <div>
              <h4 className="text-[#b8860b] text-[10px] font-black uppercase tracking-widest mb-6">The Principal Architect</h4>
              <p className="text-zinc-600 leading-relaxed font-light italic">
                Suchita Sancheti is the architect behind the Sovereign Protocol. Forged in the high-stakes environments of global enterprise and private family offices, her methodology represents a synthesis of Second-Order Cybernetics, Complexity Theory, and deep-tech AI reasoning.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-4xl font-bold text-[#111111] mb-2">$10B+</div>
                <div className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">AUM Influenced</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#111111] mb-2">50+</div>
                <div className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Global Board Audits</div>
              </div>
            </div>

            <div className="bg-[#111111] p-10 text-white">
              <h4 className="text-[#b8860b] text-[10px] font-black uppercase tracking-widest mb-4">Institutional Credo</h4>
              <p className="text-sm italic font-light text-zinc-400 leading-relaxed">
                "We do not build better managers. We build better buildings. Architecture is the only way to scale the soul of a leader."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
