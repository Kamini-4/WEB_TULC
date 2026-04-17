
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
                Sovereign Protocol was forged in the high-stakes environments of global enterprise and private family offices. It represents a synthesis of Second-Order Cybernetics, Complexity Theory, and deep-tech AI reasoning.
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
