import React from 'react';

const YieldStatement: React.FC = () => {
  return (
    <section id="yield-statement" className="py-24 bg-white border-y border-zinc-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-[#b8860b] text-[10px] font-black uppercase mb-6 tracking-[0.4em]">The Operational Yield Statement</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-[#111111] leading-tight mb-8">
              Quantifying the <span className="italic text-[#b8860b]">Value of Alignment.</span>
            </h3>
            <p className="text-zinc-600 text-lg md:text-xl font-light italic leading-relaxed mb-10">
              We do not provide standard coaching or consulting. We engineer the structural and operational frameworks that ensure reliable, high-fidelity strategic execution.
            </p>
            <div className="space-y-6">
              <YieldPoint 
                label="Strategic Bandwidth Reclamation" 
                value="30-45%" 
                desc="The recovery of active leadership hours to focus on growth and capital allocation."
              />
              <YieldPoint 
                label="Strategic Intent Fidelity" 
                value="99.8%" 
                desc="The elimination of alignment decay as strategy moves from leadership to front-line execution layers."
              />
              <YieldPoint 
                label="Decision Velocity Gain" 
                value="3x" 
                desc="The acceleration of strategic response times through standardized operational guardrails."
              />
            </div>
          </div>
          
          <div className="bg-[#111111] p-12 sm:p-16 border border-[#b8860b]/30 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#b8860b]/5 blur-[100px] rounded-full group-hover:bg-[#b8860b]/10 transition-all duration-1000" />
            <div className="relative z-10">
              <div className="text-[#b8860b] text-[9px] font-black uppercase tracking-[0.3em] mb-12">Yield Projection v1.0</div>
              <div className="space-y-12">
                <div className="flex justify-between items-end border-b border-white/10 pb-6">
                  <span className="text-white/60 text-[10px] uppercase font-bold tracking-widest">Coordination Friction</span>
                  <span className="text-white text-2xl font-mono">High Variance</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/10 pb-6">
                  <span className="text-white/60 text-[10px] uppercase font-bold tracking-widest">Projected Stability</span>
                  <span className="text-[#b8860b] text-2xl font-mono">99.8% Fidelity</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/10 pb-6">
                  <span className="text-white/60 text-[10px] uppercase font-bold tracking-widest">Calibration Window</span>
                  <span className="text-white text-2xl font-mono">90 Days</span>
                </div>
              </div>
              <div className="mt-16">
                <p className="text-zinc-700 text-[10px] italic leading-relaxed mb-8">
                  *Projections are dependent on organization scale, headcount, and specific active strategic alignment gaps.
                </p>
                <button 
                  onClick={() => document.getElementById('intake')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full py-5 bg-[#b8860b] text-white text-[11px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                >
                  Request Your Yield Projection
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const YieldPoint: React.FC<{ label: string; value: string; desc: string }> = ({ label, value, desc }) => (
  <div className="flex gap-6 items-start">
    <div className="text-2xl font-bold text-[#b8860b] min-w-[80px]">{value}</div>
    <div>
      <div className="text-sm font-bold text-[#111111] uppercase tracking-wider mb-1">{label}</div>
      <div className="text-zinc-600 text-xs italic font-light leading-relaxed">{desc}</div>
    </div>
  </div>
);

export default YieldStatement;
