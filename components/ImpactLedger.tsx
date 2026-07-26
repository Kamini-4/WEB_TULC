import React from 'react';

const ImpactLedger: React.FC = () => {
  const cases = [
    {
      id: "CASE-091",
      sector: "Global Automotive",
      challenge: "Strategic Drift in a $40B Conglomerate",
      intervention: "Architectural Recalibration of the CXO Substrate",
      outcome: "Reclaimed 35% of CEO strategic bandwidth; Stabilized Board-Executive alignment before a major divestiture.",
      stats: ["-22% Decision Latency", "+15% Operational Fidelity"]
    },
    {
      id: "CASE-114",
      sector: "Deep Tech / AI",
      challenge: "Founder Bottleneck at Series D Transition",
      intervention: "Transition from Heroic Intervention to Systemic Sovereignty",
      outcome: "Zero-hero dependence achieved; Institutional permanence secured through a calibrated leadership OS.",
      stats: ["90-Day Stabilization", "3x Scaling Velocity"]
    },
    {
      id: "CASE-072",
      sector: "Financial Services",
      challenge: "Authority Leakage during Global Expansion",
      intervention: "Sovereign Substrate Calibration & Logic-Driven Governance",
      outcome: "Intent projected with near-absolute fidelity across 12 global hubs; Neutralized 15% 'Inaction Tax'.",
      stats: ["Zero Tactical Noise", "ISO/TULC Compliant"]
    }
  ];

  return (
    <section id="impact-ledger" className="py-20 sm:py-24 md:py-32 bg-[#111111] text-white overflow-hidden relative isolate">
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none -z-10" style={{ backgroundImage: 'radial-gradient(#b8860b 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 sm:mb-24 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-[#b8860b] text-[9px] sm:text-[11px] font-black uppercase mb-4 sm:mb-6 sm:">The Impact Ledger</h2>
            <h3 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
              Anonymized <span className="italic text-[#b8860b]">Institutional Outcomes.</span>
            </h3>
          </div>
          <div className="md:block">
            <p className="text-zinc-500 text-xs sm:text-sm max-w-xs italic font-light">
              Privileged Disclosure: All case data is anonymized to protect the sovereign secrets of our Tier 1 partners.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {cases.map((c, idx) => (
            <div key={idx} className="bg-[#0a0a0a] p-8 sm:p-12 group hover:bg-[#111111] transition-all duration-700 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 md:p-8 text-white/5 text-4xl md:text-6xl font-black italic select-none group-hover:text-[#b8860b]/10 transition-colors">
                {c.id}
              </div>
              
              <div className="mb-8 sm:mb-12">
                <span className="text-[#b8860b] text-[8px] sm:text-[10px] font-black uppercase sm:mb-2 block">{c.sector}</span>
                <h4 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#b8860b] transition-colors leading-snug">
                  {c.challenge}
                </h4>
              </div>

              <div className="space-y-6 sm:space-y-8 mb-8 sm:mb-12">
                <div>
                  <div className="text-[8px] sm:text-[9px] uppercase font-black text-zinc-500 mb-2 sm:mb-3 ">The Intervention:</div>
                  <p className="text-zinc-400 text-sm sm:text-base italic font-light leading-relaxed">
                    {c.intervention}
                  </p>
                </div>
                <div>
                  <div className="text-[8px] sm:text-[9px] uppercase font-black text-zinc-500 mb-2 sm:mb-3 ">The Outcome:</div>
                  <p className="text-white text-sm sm:text-base font-medium leading-relaxed">
                    {c.outcome}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-white/5">
                {c.stats.map((stat, sIdx) => (
                  <span key={sIdx} className="text-[8px] sm:text-[10px] font-black uppercase text-[#b8860b] bg-[#b8860b]/5 px-2 sm:px-3 py-1 border border-[#b8860b]/20">
                    {stat}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 sm:mt-24 text-center">
          <button 
            onClick={() => {
              const element = document.getElementById('intake');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.location.href = '/#intake';
              }
            }}
            className="px-8 sm:px-12 py-4 sm:py-6 bg-transparent border border-zinc-700 text-white text-[9px] sm:text-[11px] font-black uppercase sm:hover:border-[#b8860b] hover:text-[#b8860b] transition-all duration-500"
          >
            Request Full Case Briefings
          </button>
        </div>
      </div>
    </section>
  );
};

export default ImpactLedger;
