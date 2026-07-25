import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Cpu, HeartHandshake, FileCode2, ArrowRight } from 'lucide-react';

const HumanSubstrateManifesto: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 sm:py-16 bg-[#0a0a0a] text-white border-t border-white/10 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#b8860b]/10 border border-[#b8860b]/30 rounded-full mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b8860b]" />
            <span className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.25em]">Methodology & Philosophy</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-bold font-serif text-white tracking-tight">
            Systems As <span className="text-[#b8860b] italic font-light">Codified Human Behavior.</span>
          </h2>
        </div>

        {/* Core Manifesto Card */}
        <div className="bg-[#111111] border border-[#b8860b]/30 p-6 sm:p-10 md:p-12 rounded-xs shadow-2xl relative">
          
          {/* Main Thesis Quote */}
          <blockquote className="text-base sm:text-lg md:text-xl font-serif text-zinc-200 italic leading-relaxed border-l-2 border-[#b8860b] pl-5 sm:pl-8 mb-8">
            "Our methodology does not separate human behavior from systems architecture. We treat systems as codified human behavior, and human behavior as the ultimate substrate of the system."
          </blockquote>

          {/* Phase Breakdown Grid */}
          <div className="grid md:grid-cols-3 gap-6 pt-6 border-t border-white/10 mb-8">
            
            {/* Substrate */}
            <div className="bg-white/5 p-5 border border-white/5 rounded-xs space-y-2.5">
              <div className="flex items-center justify-between text-[10px] font-black uppercase text-[#b8860b] font-mono">
                <span>Phase 01: The Substrate</span>
                <HeartHandshake className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white font-serif">Purely Human Diagnostic</h3>
              <p className="text-xs text-zinc-300 italic font-light leading-relaxed">
                Maps the founder's cognitive bandwidth, emotional focus, and strategic bottlenecks. Includes our <strong className="text-white">Provisional Patent-Filed Assessment</strong> and <strong className="text-white">Voice & Handwriting Behavioral Stress Mapping</strong>.
              </p>
            </div>

            {/* Alignment Protocol */}
            <div className="bg-white/5 p-5 border border-white/5 rounded-xs space-y-2.5">
              <div className="flex items-center justify-between text-[10px] font-black uppercase text-[#b8860b] font-mono">
                <span>Phase 02: Alignment Protocol</span>
                <Cpu className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white font-serif">Logic Gate Engineering</h3>
              <p className="text-xs text-zinc-300 italic font-light leading-relaxed">
                Hard-codes human DNA into self-regulating organizational logic gates. We establish non-negotiable cultural postures and automated exception-handling channels to eliminate micromanagement.
              </p>
            </div>

            {/* Resonance Safeguard */}
            <div className="bg-white/5 p-5 border border-white/5 rounded-xs space-y-2.5">
              <div className="flex items-center justify-between text-[10px] font-black uppercase text-[#b8860b] font-mono">
                <span>Phases 03 & 04: Resonance</span>
                <Shield className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-white font-serif">Human Succession & Protection</h3>
              <p className="text-xs text-zinc-300 italic font-light leading-relaxed">
                Focuses heavily on the human succession pipeline, leadership drift, and psychological insulation. We do not align databases; we align decision-making architecture.
              </p>
            </div>

          </div>

          {/* 5 Sovereign Domains Patent Preview Bar */}
          <div className="bg-black border border-[#b8860b]/40 p-5 rounded-xs mb-8 text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 border-b border-white/10 pb-3">
              <div>
                <span className="text-[9px] font-mono font-bold uppercase tracking-[0.25em] text-[#b8860b] block">
                  Provisional Patent-Filed Framework
                </span>
                <h4 className="text-base font-bold font-serif text-white">
                  The 5 Sovereign Domains of Systemic Alignment
                </h4>
              </div>
              <button 
                onClick={() => navigate('/services')}
                className="text-[9px] font-mono text-[#b8860b] hover:text-white uppercase tracking-widest flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <span>View Full Matrix</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 text-[11px] font-mono">
              <div className="bg-white/5 border border-white/5 p-2.5 rounded-xs hover:border-[#b8860b]/40 transition-colors">
                <span className="text-[#b8860b] font-bold block text-[10px]">01. Cognitive Clarity</span>
                <span className="text-zinc-400 text-[9.5px] leading-tight block">Decision Flow & Bandwidth</span>
              </div>
              <div className="bg-white/5 border border-white/5 p-2.5 rounded-xs hover:border-[#b8860b]/40 transition-colors">
                <span className="text-[#b8860b] font-bold block text-[10px]">02. Systemic Integrity</span>
                <span className="text-zinc-400 text-[9.5px] leading-tight block">Organizational Architecture</span>
              </div>
              <div className="bg-white/5 border border-white/5 p-2.5 rounded-xs hover:border-[#b8860b]/40 transition-colors">
                <span className="text-[#b8860b] font-bold block text-[10px]">03. Strategic Velocity</span>
                <span className="text-zinc-400 text-[9.5px] leading-tight block">Operational Directives</span>
              </div>
              <div className="bg-white/5 border border-white/5 p-2.5 rounded-xs hover:border-[#b8860b]/40 transition-colors">
                <span className="text-[#b8860b] font-bold block text-[10px]">04. Moral Gravity</span>
                <span className="text-zinc-400 text-[9.5px] leading-tight block">Governance & Compliance</span>
              </div>
              <div className="bg-white/5 border border-white/5 p-2.5 rounded-xs hover:border-[#b8860b]/40 transition-colors">
                <span className="text-[#b8860b] font-bold block text-[10px]">05. Cultural Fidelity</span>
                <span className="text-zinc-400 text-[9.5px] leading-tight block">Continuity & Succession</span>
              </div>
            </div>
          </div>

          {/* Concluding Statement */}
          <div className="bg-[#b8860b]/10 border border-[#b8860b]/30 p-5 rounded-xs flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div>
              <p className="text-xs sm:text-sm font-bold text-white tracking-wide">
                "We do not build machines; we build an organizational nervous system that protects, insulates, and multiplies human strategic energy."
              </p>
              <span className="text-[10px] text-[#b8860b] font-mono uppercase tracking-widest block mt-1">
                — Suchita Sancheti, Principal Architect
              </span>
            </div>
            <button 
              onClick={() => navigate('/assessment')}
              className="px-6 py-3 bg-[#b8860b] text-white hover:bg-white hover:text-black text-[9px] font-black uppercase tracking-[0.2em] transition-all shrink-0 cursor-pointer flex items-center gap-2"
            >
              <span>Explore Assessment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};

export default HumanSubstrateManifesto;
