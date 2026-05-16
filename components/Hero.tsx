import React from 'react';

interface HeroProps {
  onBriefClick: (phaseId?: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onBriefClick }) => {
  return (
    <section className="relative pt-12 pb-16 sm:pt-16 sm:pb-20 md:pt-24 md:pb-32 overflow-hidden bg-[#f5f5f0]">
      {/* Structural Accent - Subtle Pattern */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140vw] h-[140vw] max-w-[1400px] max-h-[900px] bg-[#b8860b]/5 blur-[100px] sm:blur-[160px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          {/* Tagline */}
          <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <span className="text-[#b8860b] text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em]">The Institutional Standard for Sovereignty</span>
            <div className="h-[1px] w-6 sm:w-10 bg-[#b8860b]/30"></div>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-[#111111] leading-[1.05] tracking-tight mb-8 sm:mb-10 animate-fade-in text-center" style={{ animationDelay: '0.2s' }}>
            Architecting the <br className="hidden sm:block" />
            <span className="italic text-[#b8860b]">Inevitable.</span>
          </h1>

          {/* The Soul / Integrative Statement */}
          <div className="max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <p className="text-lg md:text-xl text-zinc-800 font-medium italic leading-relaxed mb-12 text-center px-4">
              Sovereignty is the state where vision and execution are indistinguishable. By recalibrating the leadership substrate across five vertical domains—<span className="text-[#111111] font-bold not-italic">Cognitive Clarity</span>, <span className="text-[#111111] font-bold not-italic">Systemic Integrity</span>, <span className="text-[#111111] font-bold not-italic">Strategic Velocity</span>, <span className="text-[#111111] font-bold not-italic">Moral Gravity</span>, and <span className="text-[#111111] font-bold not-italic">Cultural Fidelity</span>—the organization is rendered anti-fragile. This is the surgical engineering of institutional permanence, ensuring intent is projected with absolute resonance from the Board to the operational edge.
            </p>

            {/* Yields Visualization - High Attention Black Block */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-800 mb-16 border border-zinc-800 shadow-2xl overflow-hidden">
              <div className="flex flex-col items-center bg-[#111111] p-8 transition-colors hover:bg-zinc-900">
                <span className="text-3xl font-bold text-white mb-1">30%</span>
                <span className="text-[9px] font-black uppercase text-[#b8860b] tracking-widest mb-3">Strategic Bandwidth</span>
                <p className="text-[10px] text-zinc-300 italic leading-relaxed max-w-[160px]">Reclaiming the capacity for high-stakes architectural thought.</p>
              </div>
              <div className="flex flex-col items-center bg-[#111111] p-8 transition-colors hover:bg-zinc-900">
                <span className="text-2xl font-bold text-white mb-1">Near-Absolute</span>
                <span className="text-[9px] font-black uppercase text-[#b8860b] tracking-widest mb-3">Cognitive Reclamation</span>
                <p className="text-[10px] text-zinc-300 italic leading-relaxed max-w-[160px]">Purging tactical noise to restore absolute decision velocity.</p>
              </div>
              <div className="flex flex-col items-center bg-[#111111] p-8 transition-colors hover:bg-zinc-900">
                <span className="text-2xl font-bold text-white mb-1">Asymptotic</span>
                <span className="text-[9px] font-black uppercase text-[#b8860b] tracking-widest mb-3">Intent Fidelity</span>
                <p className="text-[10px] text-zinc-300 italic leading-relaxed max-w-[160px]">Eliminating authority dilution across the organizational substrate.</p>
              </div>
              <div className="flex flex-col items-center bg-[#111111] p-8 transition-colors hover:bg-zinc-900">
                <span className="text-3xl font-bold text-white mb-1">∞</span>
                <span className="text-[9px] font-black uppercase text-[#b8860b] tracking-widest mb-3">Legacy Yield</span>
                <p className="text-[10px] text-zinc-300 italic leading-relaxed max-w-[160px]">Engineering institutional permanence independent of presence.</p>
              </div>
            </div>

            {/* Legacy Risk Statement (Suggestion 2) */}
            <div className="mb-10 px-6 py-4 border-l-2 border-[#b8860b] bg-white/50 backdrop-blur-sm inline-block text-left max-w-2xl">
              <p className="text-xs md:text-sm text-zinc-600 font-medium italic leading-relaxed">
                Strategic intent is currently being diluted by institutional noise. Reclaim the authority that structural entropy is absorbing before the next board cycle concludes.
              </p>
            </div>

            {/* CTAs (Suggestion 1) */}
            <div className="flex flex-col items-center gap-12 animate-fade-in">
              <div className="flex flex-wrap gap-6 justify-center">
                <button 
                  onClick={() => window.open('https://rzp.io/rzp/8H0bV3bW', '_blank')}
                  className="px-12 py-6 bg-[#b8860b] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500 shadow-2xl relative overflow-hidden group"
                >
                  <span className="relative z-10 font-bold">Secure Institutional Consult</span>
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
                <button 
                  onClick={() => document.getElementById('assessment')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-12 py-6 border border-zinc-300 text-[#111111] text-[10px] font-black uppercase tracking-[0.3em] hover:border-[#b8860b] hover:text-[#b8860b] transition-all duration-500"
                >
                  Initiate Substrate Audit
                </button>
              </div>

              {/* 5 Domains Technical Visualization (Suggestion 3 - Lightweight) */}
              <div className="w-full max-w-3xl grid grid-cols-5 gap-4 opacity-30 group">
                {['Cognitive', 'Systemic', 'Strategic', 'Moral', 'Cultural'].map((domain, i) => (
                  <div key={i} className="flex flex-col items-center gap-3">
                    <div className="w-full h-[1px] bg-zinc-300 group-hover:bg-[#b8860b]/50 transition-colors duration-700" />
                    <span className="text-[7px] font-black uppercase tracking-[0.3em] text-zinc-600 group-hover:text-[#b8860b] transition-colors duration-700">{domain}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Floating accent */}
        <div className="absolute bottom-[-80px] right-6 hidden xl:block opacity-[0.02]">
           <span className="text-[120px] font-black italic tracking-tighter select-none">Sovereignty</span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-20">
        <span className="text-[7px] font-black uppercase tracking-[0.4em] rotate-90 mb-3">RECLAIM</span>
        <div className="w-[1px] h-10 bg-[#b8860b]" />
      </div>
    </section>
  );
};

export default Hero;
