import React from 'react';
import { useNavigate } from 'react-router-dom';

interface HeroProps {
  onBriefClick: (phaseId?: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onBriefClick }) => {
  const navigate = useNavigate();
  return (
    <section className="relative pt-6 pb-12 sm:pt-8 sm:pb-16 md:pt-12 md:pb-20 overflow-hidden bg-[#f5f5f0]">
      {/* Structural Accent - Subtle Pattern */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140vw] h-[140vw] max-w-[1400px] max-h-[900px] bg-[#b8860b]/5 blur-[100px] sm:blur-[160px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
          {/* Tagline */}
          <div className="flex flex-col items-center justify-center gap-1.5 mb-4 sm:mb-5 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <span className="text-[#111111] text-[10px] sm:text-[11px] font-black uppercase tracking-[0.5em] mb-1">The Unbounded Leadership Co.</span>
            <div className="flex items-center gap-3">
              <span className="text-[#b8860b] text-[8px] sm:text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em]">The Structural Standard for Enterprise Alignment</span>
              <div className="h-[1px] w-6 sm:w-10 bg-[#b8860b]/30"></div>
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.2] tracking-tight mb-5 sm:mb-6 animate-fade-in text-center" style={{ animationDelay: '0.2s' }}>
            <span className="text-[#111111]">Lead Through </span>
            <span className="text-[#b8860b] italic">Architecture.</span>
          </h1>

          {/* The Soul / Integrative Statement */}
          <div className="max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <p className="text-base sm:text-lg md:text-xl text-zinc-800 font-medium italic leading-relaxed mb-8 text-center px-4">
              For high-growth founders, VCs, and enterprise leaders seeking to eliminate decision bottlenecks, reduce human alignment friction, and reclaim 40% of their strategic bandwidth. We design the self-cohering operating frameworks that ensure delegated actions execute with <span className="text-[#b8860b] font-extrabold not-italic">uncompromised strategic precision</span>, saving organizations crores in coordination and latency costs.
            </p>

            {/* Yields Visualization - High Attention Black Block */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-800 mb-8 md:mb-10 border border-zinc-800 shadow-2xl overflow-hidden">
              <div className="flex flex-col items-center bg-[#111111] p-5 transition-colors hover:bg-zinc-900">
                <span className="text-2xl font-bold text-white mb-1">30%+</span>
                <span className="text-[9px] font-black uppercase text-[#b8860b] tracking-widest mb-2 text-center">Strategic Bandwidth Reclamation</span>
                <p className="text-[10px] text-zinc-300 italic leading-relaxed max-w-[160px] text-center">Reclaiming high-impact hours from low-value operational reviews.</p>
              </div>
              <div className="flex flex-col items-center bg-[#111111] p-5 transition-colors hover:bg-zinc-900">
                <span className="text-xl font-bold text-white mb-1">40% Less Delay</span>
                <span className="text-[9px] font-black uppercase text-[#b8860b] tracking-widest mb-2 text-center">Decision Velocity Gain</span>
                <p className="text-[10px] text-zinc-300 italic leading-relaxed max-w-[160px] text-center">Reducing administrative drag to accelerate market responsiveness.</p>
              </div>
              <div className="flex flex-col items-center bg-[#111111] p-5 transition-colors hover:bg-zinc-900">
                <span className="text-xl font-bold text-white mb-1">100% Parity</span>
                <span className="text-[9px] font-black uppercase text-[#b8860b] tracking-widest mb-2 text-center">Strategic Precision</span>
                <p className="text-[10px] text-zinc-300 italic leading-relaxed max-w-[160px] text-center">Ensuring delegated actions execute with reliable, standard alignment.</p>
              </div>
              <div className="flex flex-col items-center bg-[#111111] p-5 transition-colors hover:bg-zinc-900">
                <span className="text-2xl font-bold text-white mb-1">Active</span>
                <span className="text-[9px] font-black uppercase text-[#b8860b] tracking-widest mb-2 text-center">Business Continuity</span>
                <p className="text-[10px] text-zinc-300 italic leading-relaxed max-w-[160px] text-center">Establishing repeatable workflows independent of individual presence.</p>
              </div>
            </div>

            {/* Legacy Risk Statement (Suggestion 2) */}
            <div className="mb-6 md:mb-8 px-6 py-3.5 border-l-2 border-[#b8860b] bg-white/50 backdrop-blur-sm inline-block text-left max-w-2xl">
              <p className="text-xs text-zinc-600 font-medium italic leading-relaxed">
                Organizational performance suffers when strategic alignment is diluted across management layers. Secure your operation against coordination drag and administrative bottlenecks before your next scaling phase.
              </p>
            </div>

            {/* CTAs (Suggestion 1) */}
            <div className="flex flex-col items-center gap-8 animate-fade-in">
              <div className="flex flex-wrap gap-4 justify-center">
                <a 
                  href="https://calendly.com/d/d3jb-kpx-r6q"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 sm:px-10 sm:py-5 bg-[#b8860b] text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500 shadow-2xl relative overflow-hidden group inline-block cursor-pointer text-center"
                >
                  <span className="relative z-10 font-bold">Secure Enterprise Consult</span>
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </a>
                <button 
                  onClick={() => navigate('/assessment')}
                  className="px-8 py-4 sm:px-10 sm:py-5 border border-zinc-300 text-[#111111] text-[10px] font-black uppercase tracking-[0.3em] hover:border-[#b8860b] hover:text-[#b8860b] transition-all duration-500"
                >
                  Initiate Strategic Alignment Audit
                </button>
              </div>

              {/* 5 Domains Technical Visualization (Suggestion 3 - Lightweight) */}
              <div className="w-full max-w-2xl grid grid-cols-5 gap-4 opacity-30 group">
                {['Cognitive', 'Systemic', 'Strategic', 'Moral', 'Cultural'].map((domain, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
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
           <span className="text-[120px] font-black italic tracking-tighter select-none">Alignment</span>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-20">
        <span className="text-[7px] font-black uppercase tracking-[0.4em] rotate-90 mb-3">ALIGN</span>
        <div className="w-[1px] h-10 bg-[#b8860b]" />
      </div>
    </section>
  );
};

export default Hero;
