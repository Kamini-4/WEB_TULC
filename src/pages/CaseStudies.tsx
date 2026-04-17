
import React from 'react';
import { motion } from 'framer-motion';

const cases = [
  {
    sector: "Multi-Generational SFO",
    title: "The Generational Handover",
    challenge: "A $4B family office facing 'Logic Decay' as the patriarch transitions to a stewardship role. The inner circle relied on intuitive proximity rather than architectural logic.",
    outcome: "Implemented Sovereign Protocol Phase 02 (Logic Gate Engineering). Reclaimed 40% of the Principal's bandwidth. Reached 'Trust Resonance' across three geographic regions within 180 days.",
    metric: "3.5x Decision Velocity"
  },
  {
    sector: "NASDAQ-Listed Fintech",
    title: "Post-Merger Substrate Alignment",
    challenge: "Two disparate leadership archetypes creating 'Cultural Entropy' following a major acquisition. Executive intent was being lost in a consensus-heavy substrate.",
    outcome: "Forensic Substrate Audit identified 12 critical authority leaks. Hard-coded the 'Source Intent' into the governance protocol. Reduced operational friction by calculated 22%.",
    metric: "22% Metabolic Efficiency Gain"
  },
  {
    sector: "Apex Private Equity",
    title: "The Velocity Mandate",
    challenge: "Portfolio company leaders trapped in 'Heroic Intervention' mode, becoming the primary bottleneck for $500M+ expansion plays.",
    outcome: "Modular Strategic Audit lead to a full Institutional Calibration. Decoupled Principal impact from hours worked. Transitioned Source to Architect seat.",
    metric: "10x Strategic Bandwidth"
  }
];

const CaseStudies: React.FC = () => {
  return (
    <div className="bg-[#111111] min-h-screen pt-36 pb-24 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <h2 className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.5em] mb-8">The Registry</h2>
          <h1 className="text-4xl md:text-6xl font-bold mb-8">Institutional <span className="italic text-[#b8860b]">Evidence.</span></h1>
          <p className="max-w-2xl mx-auto text-zinc-500 italic font-light leading-relaxed">
            In respect of the Sovereign Principals we serve, all registry entries are anonymized. These represents the high-fidelity refraction of institutional excellence.
          </p>
        </motion.div>

        <div className="space-y-1">
          {cases.map((c, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="grid md:grid-cols-4 border-y border-white/5 py-16 group hover:bg-white/[0.02] transition-all duration-700 px-8"
            >
              <div className="col-span-1 border-r border-[#b8860b]/20 mb-8 md:mb-0">
                <div className="text-[#b8860b] text-[10px] font-black uppercase tracking-widest mb-4">{c.sector}</div>
                <div className="text-3xl font-bold text-[#b8860b]">{c.metric}</div>
              </div>
              
              <div className="col-span-3 md:pl-16">
                <h3 className="text-2xl font-bold mb-6 group-hover:text-[#b8860b] transition-colors">{c.title}</h3>
                <div className="grid md:grid-cols-2 gap-12">
                  <div>
                    <h4 className="text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-4">The Challenge</h4>
                    <p className="text-sm italic font-light text-zinc-400 leading-relaxed">{c.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase text-zinc-500 tracking-widest mb-4">The Intervention</h4>
                    <p className="text-sm italic font-light text-zinc-400 leading-relaxed">{c.outcome}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 p-12 bg-white/5 border border-white/10 text-center max-w-3xl mx-auto">
          <h4 className="text-xl font-bold mb-4">Verification Needed?</h4>
          <p className="text-zinc-500 text-sm mb-8 italic font-light">
            Due to the privileged nature of our work, case details can only be discussed after a primary alignment session.
          </p>
          <button className="bg-[#b8860b] px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">
            Request Reference
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;
