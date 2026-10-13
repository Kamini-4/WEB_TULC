
import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Target, Layers, Lock, UserCheck, EyeOff, Award, FileText } from 'lucide-react';
import FiveDomains from './FiveDomains';

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
    description: 'Comprehensive structural optimization of organizational design. Realigns operational workflows so executive directives execute at the operational edge without signal decay.',
    deliverables: ['Alignment Diagnostics', 'Structure Auditing', 'Scaling Framework'],
    icon: <Layers className="w-5 h-5 text-[#b8860b]" />
  },
  {
    id: '02',
    label: 'Bandwidth',
    title: 'Executive Bandwidth Optimization',
    description: 'Reclaims 30–40% of executive bandwidth by streamlining delegated decision channels, eliminating low-value review meetings, and automating exception handling.',
    deliverables: ['Bandwidth Evaluation', 'Delegation Alignment', 'Focus Management'],
    icon: <Zap className="w-5 h-5 text-[#b8860b]" />
  },
  {
    id: '03',
    label: 'Governance',
    title: 'Strategic Alignment Council',
    description: 'Objective, ongoing advisory for founders, board members, and executive teams to maintain structural integrity and eliminate leadership drift across scale phases.',
    deliverables: ['Strategic Alignment Reviews', 'Friction Audits', 'Governance Optimization'],
    icon: <Shield className="w-5 h-5 text-[#b8860b]" />
  },
  {
    id: '04',
    label: 'Velocity',
    title: 'Execution Velocity Protocol',
    description: 'Rapid diagnostic and structural interventions to eliminate coordination friction, double decision-to-execution frequency, and elevate operational responsiveness.',
    deliverables: ['72-Hour Diagnostic', 'Intervention Roadmap', 'Velocity Optimization'],
    icon: <Target className="w-5 h-5 text-[#b8860b]" />
  }
];

const StrategicMandates: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* Primary Engagement Mandates Header & Cards */}
      <section id="mandates" className="py-10 sm:py-14 md:py-16 bg-[#f5f5f0] border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6 border-b border-zinc-300 pb-6">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-zinc-200 rounded-full mb-3 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#b8860b]" />
                <span className="text-[#111111] text-[10px] font-black uppercase font-mono">
                  End-to-End Enterprise Partnership
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight font-serif text-[#111111]">
                The Mandates of <span className="italic font-light text-[#b8860b]">Enterprise Alignment.</span>
              </h1>
            </div>
            
            <div className="md:text-right max-w-md">
              <p className="text-zinc-700 text-xs sm:text-sm italic font-light leading-relaxed mb-3">
                Tailored operational tracks engineered for founders and C-suites who refuse to trade velocity for control. We serve you at every step—from initial friction mapping to hard-coded governance.
              </p>
              <div className="text-[10px] font-mono font-bold uppercase text-[#b8860b] flex items-center md:justify-end gap-1">
                <Award className="w-3.5 h-3.5" /> Select a track to request briefing
              </div>
            </div>
          </div>

          {/* Mandates 2x2 / 4-Col Grid with Always-Visible Deliverables */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {mandates.map((mandate) => (
              <motion.div 
                key={mandate.id}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="bg-white border border-zinc-200/90 p-6 rounded-xs flex flex-col justify-between shadow-xs hover:border-[#b8860b]/60 hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[#b8860b] text-xl font-mono font-bold">{mandate.id}</span>
                    <div className="p-2 bg-zinc-50 border border-zinc-100 rounded-xs group-hover:bg-[#b8860b]/10 transition-colors">
                      {mandate.icon}
                    </div>
                  </div>

                  <div className="text-[9px] font-mono font-bold uppercase text-[#b8860b] mb-1">
                    {mandate.label}
                  </div>
                  <h2 className="text-lg font-bold text-zinc-900 mb-2 font-serif group-hover:text-[#b8860b] transition-colors leading-snug">
                    {mandate.title}
                  </h2>
                  <p className="text-zinc-600 text-xs italic font-light leading-relaxed mb-5">
                    {mandate.description}
                  </p>
                </div>

                <div>
                  <div className="border-t border-zinc-100 pt-3 mb-4 space-y-1.5">
                    <span className="text-[8px] font-mono uppercase font-black text-zinc-400 block mb-1">
                      Key Deliverables
                    </span>
                    {mandate.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-[10px] font-bold text-zinc-800">
                        <span className="w-1 h-1 rounded-full bg-[#b8860b]" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => navigate('/intake')}
                      className="py-2.5 bg-zinc-900 text-white text-[9px] font-bold uppercase hover:bg-[#b8860b] transition-colors flex items-center justify-center gap-1 rounded-xs cursor-pointer"
                    >
                      <span>Briefing</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <button 
                      onClick={() => navigate('/assessment')}
                      className="py-2.5 bg-zinc-100 text-zinc-900 border border-zinc-200 text-[9px] font-bold uppercase hover:bg-zinc-200 transition-colors flex items-center justify-center gap-1 rounded-xs cursor-pointer"
                    >
                      <span>Audit</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* The 5 Sovereign Domains Section */}
      <FiveDomains />

      {/* Unified Executive Black Box: Human-System Integration & Sovereign Data Protocol */}
      <section className="py-12 sm:py-16 bg-[#f5f5f0] border-t border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          
          <div className="bg-[#111111] border border-[#b8860b]/30 p-6 sm:p-10 md:p-12 rounded-xs text-white shadow-2xl relative overflow-hidden">
            
            {/* Header */}
            <div className="max-w-3xl mb-10 pb-6 border-b border-white/10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#b8860b]/10 border border-[#b8860b]/30 rounded-full mb-3">
                <Shield className="w-3.5 h-3.5 text-[#b8860b]" />
                <span className="text-[#b8860b] text-[10px] font-black uppercase font-mono">
                  Trust Architecture & Integration
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white">
                Systems Architecture <span className="text-[#b8860b] italic font-light">& Strategic Sovereignty.</span>
              </h2>
              <p className="text-zinc-300 text-xs sm:text-sm italic font-light leading-relaxed mt-2">
                "We treat systems as codified human behavior, and human behavior as the ultimate substrate of the system. We do not build rigid technical frameworks—we architect Sovereign Systems."
              </p>
            </div>

            {/* Two-Column Matrix: Human Integration (Left) & Data Sovereignty (Right) */}
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              
              {/* Left Column: Human-System Integration */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <h3 className="text-sm font-bold uppercase text-[#b8860b] font-serif">
                    01 / Human-System Integration
                  </h3>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase">Operational Substrate</span>
                </div>

                <div className="space-y-3">
                  <div className="bg-white/5 p-3.5 border border-white/5 rounded-xs space-y-1">
                    <span className="text-[10px] font-bold text-white block">Cognitive Load Optimization</span>
                    <p className="text-xs text-zinc-300 italic font-light leading-relaxed">
                      Maps decision frequency to eliminate low-level review meetings and return executives to high-leverage strategic focus.
                    </p>
                  </div>

                  <div className="bg-white/5 p-3.5 border border-white/5 rounded-xs space-y-1">
                    <span className="text-[10px] font-bold text-white block">Behavioral Execution Protocols</span>
                    <p className="text-xs text-zinc-300 italic font-light leading-relaxed">
                      Codifies founder intent into self-regulating operational gates, aligning human incentives with structural workflow.
                    </p>
                  </div>

                  <div className="bg-white/5 p-3.5 border border-white/5 rounded-xs space-y-1">
                    <span className="text-[10px] font-bold text-white block">Structural Drift Defense</span>
                    <p className="text-xs text-zinc-300 italic font-light leading-relaxed">
                      Monitors human shadow metrics (fatigue, succession, friction) to insulate the enterprise from operational decay.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Sovereign Data Protocol */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <h3 className="text-sm font-bold uppercase text-[#b8860b] font-serif">
                    02 / Sovereign Data Security
                  </h3>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase">Confidentiality Guarantee</span>
                </div>

                <div className="space-y-3">
                  <div className="bg-white/5 p-3.5 border border-white/5 rounded-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-white block">Zero Data Retention (ZDR)</span>
                      <EyeOff className="w-3.5 h-3.5 text-[#b8860b]" />
                    </div>
                    <p className="text-xs text-zinc-300 italic font-light leading-relaxed">
                      All inputs, voice prints, and diagnostic answers are processed in volatile memory and purged immediately upon terminal closure.
                    </p>
                  </div>

                  <div className="bg-white/5 p-3.5 border border-white/5 rounded-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-white block">Executive Review Guarantee</span>
                      <UserCheck className="w-3.5 h-3.5 text-[#b8860b]" />
                    </div>
                    <p className="text-xs text-zinc-300 italic font-light leading-relaxed">
                      Every diagnostic enquiry is personally evaluated by Founder Suchita Sancheti for absolute strategic fidelity.
                    </p>
                  </div>

                  <div className="bg-white/5 p-3.5 border border-white/5 rounded-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-white block">Privileged Disclosure</span>
                      <Lock className="w-3.5 h-3.5 text-[#b8860b]" />
                    </div>
                    <p className="text-xs text-zinc-300 italic font-light leading-relaxed">
                      All intervention briefs and alignment blueprints operate under strict Privileged Disclosure, mirroring executive legal counsel.
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom Direct CTA Banner */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-[9px] uppercase font-mono font-bold text-[#b8860b] border border-[#b8860b]/30 px-2.5 py-1">
                  ISO/TULC-2026 COMPLIANT
                </span>
                <span className="text-[9px] uppercase font-mono text-zinc-400">
                  AES-256 Confidentiality
                </span>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <button 
                  onClick={() => navigate('/services')}
                  className="px-4 py-2.5 bg-white/10 text-white text-[10px] font-bold uppercase hover:bg-white hover:text-black transition-all cursor-pointer rounded-xs border border-white/20"
                >
                  Services & Retainer →
                </button>
                <button 
                  onClick={() => navigate('/toolkits')}
                  className="px-4 py-2.5 bg-white/10 text-white text-[10px] font-bold uppercase hover:bg-white hover:text-black transition-all cursor-pointer rounded-xs border border-white/20"
                >
                  Founder Toolkits →
                </button>
                <a 
                  href="https://calendly.com/d/d3jb-kpx-r6q"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-[#b8860b] text-white text-[10px] font-bold uppercase hover:bg-white hover:text-black transition-all cursor-pointer rounded-xs font-bold"
                >
                  Book Private Consult
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>
    </>
  );
};

export default StrategicMandates;
