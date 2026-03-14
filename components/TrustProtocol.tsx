import React from 'react';

const TrustProtocol: React.FC = () => {
  return (
    <section id="trust" className="py-16 sm:py-24 bg-[#111111] border-y border-[#b8860b]/20 overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '100px 100px' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-20">
          <h2 className="text-[#b8860b] text-[8px] sm:text-[10px] font-black uppercase mb-4 sm:mb-6 tracking-[0.3em] sm:tracking-[0.4em]">Trust Architecture</h2>
          <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">The Sovereign <span className="italic text-[#b8860b]">Data Protocol.</span></h3>
          <div className="w-12 h-px bg-[#b8860b] mx-auto opacity-40"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          <ProtocolCard 
            title="Zero Data Retention (ZDR)" 
            desc="Our diagnostic engine operates on ephemeral ZDR protocols. All inputs, voice prints, and strategic answers are processed in volatile memory and purged the moment your terminal session concludes."
          />
          <ProtocolCard 
            title="The Principal Review" 
            desc="TULC does not rely on black-box automation for critical decisions. Every diagnostic enquiry is personally reviewed by the Principal Architect to ensure near-absolute strategic fidelity."
          />
          <ProtocolCard 
            title="Privileged Disclosure" 
            desc="All architectural blueprints and intervention briefs are handled under a 'Privileged Disclosure Framework,' mirroring the confidentiality of executive legal counsel."
          />
        </div>

        <div className="mt-12 sm:mt-20 p-8 sm:p-12 bg-white/[0.02] border border-white/10 text-center max-w-4xl mx-auto">
          <p className="text-zinc-500 text-xs sm:text-sm italic font-light leading-relaxed">
            "Data sovereignty is the bedrock of institutional authority. Systems are designed to amplify brilliance, not harvest it. Intellectual property remains with the sovereign, always."
          </p>
          <div className="mt-6 sm:mt-8 flex flex-wrap justify-center items-center gap-4 sm:gap-8">
            <span className="text-[8px] sm:text-[9px] uppercase font-black text-[#b8860b] tracking-widest border border-[#b8860b]/30 px-3 sm:px-4 py-2">ISO/TULC-2025 COMPLIANT</span>
            <span className="text-[8px] sm:text-[9px] uppercase font-black text-white/30 tracking-widest">AES-256 ENCRYPTED</span>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProtocolCard: React.FC<{ title: string; desc: string }> = ({ title, desc }) => (
  <div className="group border-l border-white/10 pl-8 py-4 hover:border-[#b8860b] transition-all duration-700">
    <h4 className="text-xl font-bold text-white mb-4 group-hover:text-[#b8860b] transition-colors">{title}</h4>
    <p className="text-zinc-500 text-sm leading-relaxed italic font-light">
      {desc}
    </p>
  </div>
);

export default TrustProtocol;