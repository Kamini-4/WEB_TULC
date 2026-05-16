
import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Shield, Zap, Target, Layers } from 'lucide-react';

interface Mandate {
  id: string;
  title: string;
  label: string;
  description: string;
  deliverables: string[];
  icon: React.ReactNode;
}

const mandates: Mandate[] = [
  {
    id: '01',
    label: 'Architecture',
    title: 'Institutional Architecture',
    description: 'A comprehensive structural overhaul of the organizational substrate. We move the institution from Heroic Intervention to Architectural Command.',
    deliverables: ['Logic Gate Map', 'Sovereignty Blueprint', 'Institutional Calibration'],
    icon: <Layers className="w-5 h-5" />
  },
  {
    id: '02',
    label: 'Cognitive',
    title: 'Cognitive Equity Protocol',
    description: 'Precision engineering of the Principal\'s cognitive environment. Reclaiming 30-40% of strategic bandwidth through externalized decision logic.',
    deliverables: ['Bandwidth Forensic Audit', 'Proxy Logic Engine', 'Focus Sovereignty'],
    icon: <Zap className="w-5 h-5" />
  },
  {
    id: '03',
    label: 'Council',
    title: 'Discrete Strategic Council',
    description: 'Ongoing high-fidelity advisory for pivotal decision-making. We serve as the "Architectural Echo" for the Principal\'s most critical moves.',
    deliverables: ['Real-time Strategy Refinement', 'Blind Spot Neutralization', 'Outcome Simulation'],
    icon: <Shield className="w-5 h-5" />
  },
  {
    id: '04',
    label: 'Dispatch',
    title: 'Institutional Dispatch',
    description: 'Rapid, high-stakes intervention for moments of extreme organizational shift. Specialized for M&A, leadership pivots, and systemic crises.',
    deliverables: ['72-Hour Rapid Audit', 'Intervention Logic', 'Stabilization Protocol'],
    icon: <Target className="w-5 h-5" />
  }
];

const StrategicMandates: React.FC = () => {
  return (
    <section id="mandates" className="py-32 bg-[#fdfdfb] border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-px bg-[#b8860b]" />
              <span className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.4em]">Strategic Engagements</span>
            </div>
            <h2 className="text-4xl md:text-7xl font-light leading-[1.1] text-[#111111]">
              The Mandates of <br />
              <span className="italic font-medium text-[#b8860b]">Institutional Sovereignty.</span>
            </h2>
          </div>
          <div className="md:text-right">
            <p className="text-zinc-700 italic max-w-sm ml-auto mb-8 font-light leading-relaxed">
              We do not provide "consulting." We provide architectural interventions designed to hard-code stability into your hierarchy.
            </p>
            <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600">
              Select a track to initiate calibration
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-200 border border-zinc-200 overflow-hidden shadow-2xl">
          {mandates.map((mandate) => (
            <motion.div 
              key={mandate.id}
              whileHover={{ backgroundColor: '#ffffff' }}
              className="bg-[#fdfdfb] p-10 flex flex-col h-full group relative transition-colors duration-500"
            >
              <div className="flex justify-between items-start mb-12">
                <span className="text-[#b8860b] text-2xl font-bold italic opacity-30 group-hover:opacity-100 transition-opacity">{mandate.id}</span>
                <div className="p-3 bg-zinc-100 rounded-full text-zinc-400 group-hover:bg-[#b8860b]/10 group-hover:text-[#b8860b] transition-all">
                  {mandate.icon}
                </div>
              </div>
              
              <div className="mt-auto">
                <div className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-4">{mandate.label}</div>
                <h3 className="text-2xl font-bold mb-6 group-hover:text-[#b8860b] transition-colors leading-tight">{mandate.title}</h3>
                <p className="text-zinc-700 text-sm mb-8 italic font-light leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all">
                  {mandate.description}
                </p>
                
                <ul className="space-y-3 mb-10 overflow-hidden max-h-0 group-hover:max-h-40 transition-all duration-700 opacity-0 group-hover:opacity-100">
                  {mandate.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-[10px] uppercase font-bold tracking-widest text-[#111111]">
                      <div className="w-1 h-1 bg-[#b8860b]" />
                      {item}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => window.location.hash = 'assessment'}
                  className="mt-4 flex items-center gap-4 text-[9px] font-black uppercase tracking-widest text-[#111111] hover:text-[#b8860b] transition-colors"
                >
                  Request Mandate Brief <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 p-12 bg-[#111111] text-white flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[#b8860b] translate-y-full group-hover:translate-y-0 transition-transform duration-1000 opacity-5" />
          <div className="max-w-2xl relative z-10">
            <h4 className="text-2xl md:text-3xl font-bold italic mb-4">Gated: Tactical Mandate Blueprints</h4>
            <p className="text-zinc-200 text-sm italic font-light leading-relaxed">
              For active clients and vetted prospects. Access the high-fidelity blueprints for institutional overhaul, fee structures, and outcome guarantees.
            </p>
          </div>
          <a 
            href="https://ai.studio/apps/bc205532-cdb0-43d3-a8fb-919809372614"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-5 bg-[#b8860b] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all shadow-xl relative z-10"
          >
            Access Sovereign Portal
          </a>
        </div>
      </div>
    </section>
  );
};

export default StrategicMandates;
