import React from 'react';

const EliteReasoning: React.FC = () => {
  return (
    <section className="py-32 bg-[#f5f5f0]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-[#111111] text-white p-16 md:p-24 relative overflow-hidden border border-[#b8860b]/20 shadow-2xl">
          {/* Subtle gold decoration */}
          <div className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-[#b8860b]/30 to-transparent skew-x-12 opacity-50" />
          
          <div className="max-w-4xl relative z-10">
            <h2 className="text-[10px] font-bold uppercase mb-12 border-b border-white/10 pb-4 inline-block text-[#b8860b] tracking-[0.3em]">The Sovereign Intervention</h2>
            <h3 className="text-3xl md:text-5xl font-bold mb-12 leading-tight">
              Optimization of strategic substrates that coaching <span className="text-[#b8860b] italic">cannot detect.</span>
            </h3>
            
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-6 text-[10px] leading-relaxed uppercase font-black tracking-widest">
                  <div className="pb-4 border-b border-white/10 flex justify-between items-center">
                    <span>Traditional Coaching</span>
                    <span className="text-white/30 italic">Behavioral Modification</span>
                  </div>
                  <div className="pb-4 border-b border-white/10 flex justify-between items-center">
                    <span>Unbounded Intervention</span>
                    <span className="text-[#b8860b]">Architectural Mastery</span>
                  </div>
                </div>
                
                <p className="text-white/60 normal-case text-base font-light italic leading-relaxed">
                  Most firms optimize behavior. TULC optimizes the foundation through audits of latent resonance and alignment of the leadership architecture to support global velocity—ensuring <span className="text-white font-bold">Zero-hero dependence</span> and <span className="text-white font-bold">long-term institutional stability</span>.
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  <button 
                    onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-10 py-5 bg-[#b8860b] text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-xl"
                  >
                    Request Private Access
                  </button>
                  <button 
                    onClick={() => document.getElementById('registry')?.scrollIntoView({ behavior: 'smooth' })}
                    className="px-10 py-5 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest hover:border-[#b8860b] hover:text-[#b8860b] transition-all"
                  >
                    Explore Case Registry
                  </button>
                </div>
              </div>
              
              <div className="bg-white/5 p-12 border border-white/10 flex flex-col justify-center backdrop-blur-md">
                <p className="text-white/40 text-[9px] uppercase font-black mb-6 tracking-[0.2em]">Protocol Objective</p>
                <div className="text-2xl font-bold text-white mb-8 leading-snug">
                  Transition from <span className="text-[#b8860b]">Latent Potential</span> to <span className="text-[#b8860b]">Institutional Sovereignty.</span>
                </div>
                <div className="h-1 w-16 bg-[#b8860b] mb-10" />
                <div className="space-y-4">
                  <button 
                    onClick={() => document.getElementById('program')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-[10px] font-black uppercase text-[#b8860b] hover:text-white transition-all text-left tracking-widest block w-full"
                  >
                    Review Excellence Standards →
                  </button>
                  <button 
                    onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-[10px] font-black uppercase text-white/40 hover:text-[#b8860b] transition-all text-left tracking-widest block w-full"
                  >
                    Inquire Regarding Custom Audit →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EliteReasoning;