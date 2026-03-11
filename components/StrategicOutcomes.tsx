import React from 'react';

const StrategicOutcomes: React.FC = () => {
  return (
    <section id="outcomes" className="py-40 bg-[#0a0e1a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-[#b8860b] text-[11px] font-black uppercase mb-8 tracking-[0.4em]">The Standard of Excellence</h2>
          <h3 className="text-4xl md:text-6xl font-medium leading-[1.15] text-white max-w-4xl mx-auto">
            Reclaiming the <span className="italic text-[#b8860b]">Sovereign Yield.</span>
          </h3>
          <div className="w-24 h-[1px] bg-[#b8860b] mx-auto mt-16 opacity-30"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16 mb-24">
          <OutcomeCard 
            vector="01"
            title="Authority Reclamation"
            description="Re-wiring teams to process systemic risk without your constant intervention. Reclaim the 40% of strategic velocity currently lost to noise—achieving Board-grade clarity and unimpeded execution."
            kpi="40% Bandwidth Reclamation"
          />
          <OutcomeCard 
            vector="02"
            title="Institutional Autopilot"
            description="Eliminating fragile dependence on human heroics. Evolving into a sovereign entity that executes your vision as a natural law, ensuring Zero-hero dependence and operational resilience."
            kpi="90-Day Permanence Cycle"
          />
          <OutcomeCard 
            vector="03"
            title="Architectural Command"
            description="Shift from individual exhaustion to substrate-driven dominance. Triple your strategic yield through absolute structural design and Succession readiness."
            kpi="3x Strategic Velocity"
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-8 text-center">
           <p className="text-zinc-500 text-sm italic font-light max-w-2xl">
             These are not improvements; they are engineered inevitabilities. To operate without these vectors is to accept a permanent tax on your leadership potential.
           </p>
           <button 
             onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
             className="px-12 py-5 border border-[#b8860b] text-[#b8860b] text-[11px] font-black uppercase tracking-widest hover:bg-[#b8860b] hover:text-white transition-all shadow-2xl"
           >
             Secure Your Outcome Vector
           </button>
        </div>
      </div>
    </section>
  );
};

const OutcomeCard: React.FC<{ vector: string; title: string; description: string; kpi: string }> = ({ vector, title, description, kpi }) => (
  <div className="bg-white/5 p-12 border-l-2 border-[#b8860b]/30 flex flex-col h-full hover:bg-white/10 transition-all duration-700 group">
    <div className="mb-10">
      <div className="text-[10px] font-black text-[#b8860b] mb-6 tracking-[0.4em] uppercase">Vector {vector}</div>
      <h4 className="text-white text-2xl font-bold mb-6 group-hover:text-[#b8860b] transition-colors">{title}</h4>
      <p className="text-white/60 font-light text-lg leading-[1.7] italic pr-2 mb-8">
        {description}
      </p>
      <button 
        onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
        className="text-[9px] font-black uppercase text-[#b8860b] border-b border-[#b8860b]/30 pb-1 hover:text-white hover:border-white transition-all tracking-widest"
      >
        Architect this Vector
      </button>
    </div>
    <div className="mt-auto">
      <div className="h-[1px] w-10 bg-white/10 mb-8"></div>
      <div className="text-white/40 text-[9px] uppercase font-black mb-2 tracking-widest">Mandatory Benchmark:</div>
      <div className="text-[#b8860b] text-[12px] uppercase font-black tracking-[0.2em]">{kpi}</div>
    </div>
  </div>
);

export default StrategicOutcomes;