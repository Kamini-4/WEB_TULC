import React from 'react';

interface ScaleEvidenceProps {
  onBriefClick: (phaseId?: string) => void;
}

const ScaleEvidence: React.FC<ScaleEvidenceProps> = ({ onBriefClick }) => {
  return (
    <section id="scale-evidence" className="py-16 sm:py-24 bg-[#f5f5f0] border-b border-zinc-200 overflow-hidden relative isolate">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-12 sm:gap-16 items-start">
          <div className="lg:w-1/2">
            <h2 className="text-[#b8860b] text-[8px] sm:text-[10px] font-black uppercase mb-4 sm:mb-6 sm:">The Dynamics of Scale</h2>
            <h3 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#111111] leading-tight mb-6 sm:mb-8">
              Why Traditional Governance <span className="italic text-[#b8860b]">Fails as Complexity Scales.</span>
            </h3>
            <p className="text-zinc-600 text-base sm:text-lg leading-relaxed italic font-light mb-8 sm:mb-10">
              In high-complexity environments, strategic intent is often diluted by the sheer complexity of the organizational structure. We call this "Strategic Delay"—the gap between senior-level decisions and operational execution.
            </p>
            
            <div className="space-y-6 sm:space-y-8">
              <ScalePoint 
                title="Intent Dilution" 
                metric="~15% Loss per Layer"
                desc="In a 10-layer organization, the original intent of the CEO is often reduced to less than 20% fidelity by the time it reaches the operational front line."
              />
              <ScalePoint 
                title="Cognitive Tax" 
                metric="40% Bandwidth Leak"
                desc="Tier 1 leaders in unaligned environments spend nearly half their time resolving tactical variances that should be handled autonomously by the leadership frameworks."
              />
              <ScalePoint 
                title="The Inaction Tax" 
                metric="Compounding Latency"
                desc="For an enterprise-scale firm, a 30-day delay in strategic execution can result in a permanent loss of market position that exceeds the cost of any intervention."
              />
            </div>
          </div>
          
          <div className="lg:w-1/2 bg-[#111111] p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden group w-full">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#b8860b]/10 blur-[100px] rounded-full -z-10" />
            <h4 className="text-[8px] sm:text-[10px] font-black uppercase text-[#b8860b] mb-8 sm:mb-12 sm:">The Operational Variance</h4>
            
            <div className="space-y-8 sm:space-y-12">
              <div className="relative pl-6 sm:pl-8 border-l border-[#b8860b]/30">
                <div className="text-3xl sm:text-4xl font-bold mb-1 sm:mb-2">2.5x</div>
                <div className="text-[8px] sm:text-[10px] uppercase font-black text-zinc-500 mb-3 sm:mb-4">Yield Multiplier</div>
                <p className="text-zinc-400 text-xs sm:text-sm italic font-light leading-relaxed">
                  Firms with high board-operational alignment outperform their peers by 250% in total shareholder return over a 5-year cycle.
                </p>
              </div>
              
              <div className="relative pl-6 sm:pl-8 border-l border-[#b8860b]/30">
                <div className="text-3xl sm:text-4xl font-bold mb-1 sm:mb-2">Zero</div>
                <div className="text-[8px] sm:text-[10px] uppercase font-black text-zinc-500 mb-3 sm:mb-4">Tactical Intervention</div>
                <p className="text-zinc-400 text-xs sm:text-sm italic font-light leading-relaxed">
                  Our goal is to execute the leadership team's strategic vision with high-fidelity, requiring minimal daily intervention once the operational structure is aligned.
                </p>
              </div>
 
              <div className="pt-6 sm:pt-8">
                <button 
                  onClick={onBriefClick}
                  className="w-full py-4 sm:py-5 border border-[#b8860b] text-[#b8860b] text-[8px] sm:text-[10px] font-black uppercase sm:hover:bg-[#b8860b] hover:text-white transition-all duration-500"
                >
                  Request Scale Briefing
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ScalePoint: React.FC<{ title: string; metric: string; desc: string }> = ({ title, metric, desc }) => (
  <div className="flex gap-6 group">
    <div className="flex-shrink-0 w-12 h-12 rounded-full border border-zinc-200 flex items-center justify-center group-hover:border-[#b8860b] transition-colors">
      <div className="w-2 h-2 rounded-full bg-[#b8860b]" />
    </div>
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
        <h4 className="text-xl font-bold text-[#111111]">{title}</h4>
        <span className="text-[10px] font-black uppercase text-[#b8860b] ">{metric}</span>
      </div>
      <p className="text-zinc-500 text-sm leading-relaxed italic font-light">{desc}</p>
    </div>
  </div>
);

export default ScaleEvidence;
