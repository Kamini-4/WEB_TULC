import React from 'react';
import { Brain, Cpu, Zap, Shield, Layers, ArrowRight, Sparkles } from 'lucide-react';

interface DomainPreviewBannerProps {
  onOpenDomains: () => void;
  onTakeTest: () => void;
}

export const DomainPreviewBanner: React.FC<DomainPreviewBannerProps> = ({
  onOpenDomains,
  onTakeTest
}) => {
  const domains = [
    { num: '01', title: 'Clear Thinking & Focus', mission: 'Reclaims 15+ hours weekly from tactical emergencies.', icon: Brain },
    { num: '02', title: 'Execution & Delegation', mission: 'Codifies decision boundaries so teams execute with 100% fidelity.', icon: Cpu },
    { num: '03', title: 'Speed to Market', mission: 'Cuts committee delays from 6 weeks down to 72 hours.', icon: Zap },
    { num: '04', title: 'Team Standards', mission: 'Installs autonomous peer accountability before work reaches your desk.', icon: Shield },
    { num: '05', title: 'Business Independence', mission: 'Passes the 14-day vacation test so the enterprise compounds without you.', icon: Layers },
  ];

  return (
    <section id="domains-preview" className="py-8 sm:py-10 border-b border-[#e5decfe0] bg-[#f2ede2] relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-5 gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#9d7b38] font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#9d7b38]" />
              <span>The 5 Architectural Pillars</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#17181c]">
              How We Re-Engineer Leadership Operating Systems
            </h2>
          </div>

          <button
            onClick={onOpenDomains}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-[#17181c] hover:text-[#9d7b38] transition-colors cursor-pointer py-1 self-start sm:self-auto shrink-0"
          >
            <span>Explore 5 Domains Guide</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#9d7b38]" />
          </button>
        </div>

        {/* 5 Compact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {domains.map((d) => {
            const Icon = d.icon;
            return (
              <div
                key={d.num}
                onClick={onOpenDomains}
                className="p-4 rounded-md bg-white border border-[#d8cebe] hover:border-[#9d7b38] shadow-2xs hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-mono text-[#9d7b38] font-bold">
                    <span>DOMAIN {d.num}</span>
                    <Icon className="w-4 h-4 text-[#9d7b38] group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-sm font-bold text-[#17181c] group-hover:text-[#9d7b38] transition-colors leading-snug">
                    {d.title}
                  </h3>
                  <p className="text-[11px] text-[#555861] leading-relaxed line-clamp-2">
                    {d.mission}
                  </p>
                </div>

                <div className="pt-2.5 mt-2 border-t border-[#f0eade] text-[10px] font-bold text-[#9d7b38] uppercase flex items-center justify-between">
                  <span>Learn more</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
