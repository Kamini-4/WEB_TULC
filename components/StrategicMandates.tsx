
import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Shield, Zap, Target, Layers } from 'lucide-react';
import FiveDomains from './FiveDomains.tsx';

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
    title: 'Alignment Architecture',
    description: 'A comprehensive structural optimization of organizational design. We realign operational structures to ensure that executive directives translate precisely to the execution edge without dilution.',
    deliverables: ['Alignment Diagnostics', 'Structure Auditing', 'Scaling Framework'],
    icon: <Layers className="w-5 h-5" />
  },
  {
    id: '02',
    label: 'Focus',
    title: 'Executive Bandwidth Optimization',
    description: 'Optimization of leadership time allocation. Reclaiming 30-40% of critical executive hours by streamlining delegated decision channels and administrative workflows.',
    deliverables: ['Bandwidth Evaluation', 'Delegation Alignment', 'Focus Management'],
    icon: <Zap className="w-5 h-5" />
  },
  {
    id: '03',
    label: 'Council',
    title: 'Strategic Alignment Council',
    description: 'Objective, ongoing advisory for enterprise board members and scaling leadership teams. We serve as an external partner to maintain structural integrity across growth phases.',
    deliverables: ['Strategic Alignment Reviews', 'Organizational Friction Audits', 'Governance Optimization'],
    icon: <Shield className="w-5 h-5" />
  },
  {
    id: '04',
    label: 'Velocity',
    title: 'Execution Velocity',
    description: 'Rapid diagnostic and structural interventions to eliminate coordination lag, double decision-to-execution frequency, and elevate operational responsive structures.',
    deliverables: ['72-Hour Diagnostic', 'Change Management Roadmap', 'Velocity Optimization Plan'],
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
              <span className="italic font-medium text-[#b8860b]">Enterprise Alignment.</span>
            </h2>
          </div>
          <div className="md:text-right">
            <p className="text-zinc-700 italic max-w-sm ml-auto mb-8 font-light leading-relaxed">
              We provide tailored operational assessments and structural alignment frameworks that secure scale and resolve administrative drag.
            </p>
            <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600">
              Select an engagement track to evaluate operational alignment
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

        {/* The Five Domains of Leadership Architecture */}
        <div className="mt-24">
          <FiveDomains />
        </div>

        {/* Combined Sovereign Protocol */}
        <div className="mt-32 pt-16 border-t border-zinc-200/80">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.4em] block mb-3">Trust Architecture</span>
            <h3 className="text-3xl md:text-5xl font-light text-zinc-950 leading-tight animate-fade-in">
              The Sovereign <span className="italic font-medium text-[#b8860b]">Data Protocol.</span>
            </h3>
            <div className="w-12 h-px bg-[#b8860b] mx-auto mt-6 mb-4 opacity-40"></div>
            <p className="text-zinc-600 text-xs sm:text-sm italic font-light leading-relaxed">
              Data sovereignty is the bedrock of institutional authority. Our systems and engagements are engineered to amplify executive brilliance while ensuring near-absolute strategic confidentiality.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="group border-l border-zinc-200 pl-6 py-2 hover:border-[#b8860b] transition-all duration-500">
              <h4 className="text-lg font-bold text-zinc-900 mb-2 group-hover:text-[#b8860b] transition-colors">Zero Data Retention (ZDR)</h4>
              <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed italic font-light">
                Our diagnostic engine operates on ephemeral ZDR protocols. All inputs, voice prints, and strategic answers are processed in volatile memory and purged the moment your terminal session concludes.
              </p>
            </div>
            <div className="group border-l border-zinc-200 pl-6 py-2 hover:border-[#b8860b] transition-all duration-500">
              <h4 className="text-lg font-bold text-zinc-900 mb-2 group-hover:text-[#b8860b] transition-colors">The Principal Review</h4>
              <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed italic font-light">
                TULC does not rely on black-box automation for critical decisions. Every diagnostic enquiry is personally reviewed by the Principal Architect to ensure near-absolute strategic fidelity.
              </p>
            </div>
            <div className="group border-l border-zinc-200 pl-6 py-2 hover:border-[#b8860b] transition-all duration-500">
              <h4 className="text-lg font-bold text-zinc-900 mb-2 group-hover:text-[#b8860b] transition-colors">Privileged Disclosure</h4>
              <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed italic font-light">
                All architectural blueprints and intervention briefs are handled under a 'Privileged Disclosure Framework,' mirroring the confidentiality of executive legal counsel.
              </p>
            </div>
          </div>

          <div className="p-8 bg-[#111111] text-white rounded-xs text-center border border-[#b8860b]/20 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '100px 100px' }} />
            <p className="text-zinc-400 text-xs sm:text-sm italic font-light leading-relaxed max-w-2xl mx-auto relative z-10">
              "Data sovereignty is the bedrock of institutional authority. Systems are designed to amplify brilliance, not harvest it. Intellectual property remains with the sovereign, always."
            </p>
            <div className="mt-6 flex flex-wrap justify-center items-center gap-6 relative z-10">
              <span className="text-[8px] sm:text-[9px] uppercase font-black text-[#b8860b] tracking-widest border border-[#b8860b]/30 px-3 py-1.5 font-mono">ISO/TULC-2026 COMPLIANT</span>
              <span className="text-[8px] sm:text-[9px] uppercase font-black text-white/30 tracking-widest font-mono">AES-256 ENCRYPTED</span>
            </div>
          </div>
        </div>

        <div className="mt-24 p-12 bg-[#111111] text-white flex flex-col md:flex-row items-center justify-between gap-12 relative overflow-hidden group">
          <div className="absolute inset-0 bg-[#b8860b] translate-y-full group-hover:translate-y-0 transition-transform duration-1000 opacity-5" />
          <div className="max-w-2xl relative z-10">
            <h4 className="text-2xl md:text-3xl font-bold italic mb-4">Secure Access: Strategic Alignment Blueprints</h4>
            <p className="text-zinc-200 text-sm italic font-light leading-relaxed">
              For active enterprise clients and vetted board members. Access the alignment assessment frameworks, corporate case studies, and engagement scopes.
            </p>
          </div>
          <a 
            href="https://ai.studio/apps/bc205532-cdb0-43d3-a8fb-919809372614"
            target="_blank"
            rel="noopener noreferrer"
            className="px-10 py-5 bg-[#b8860b] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all shadow-xl relative z-10"
          >
            Access Client Portal
          </a>
        </div>
      </div>
    </section>
  );
};

export default StrategicMandates;
