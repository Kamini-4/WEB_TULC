import React from 'react';
import { Zap, ArrowRight, Sparkles, Clock, ShieldCheck } from 'lucide-react';

interface TestInvitationBannerProps {
  onLaunchTest: () => void;
}

export const TestInvitationBanner: React.FC<TestInvitationBannerProps> = ({ onLaunchTest }) => {
  return (
    <section id="test-invitation" className="py-8 sm:py-10 border-b border-[#e5decfe0] bg-[#f8f6f0] relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-lg bg-gradient-to-br from-[#17181c] via-[#20232b] to-[#17181c] text-white border-2 border-[#d4af37]/60 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#d4af37] text-[#17181c] text-[10px] font-mono uppercase font-black rounded-xs">
                <Sparkles className="w-3 h-3 text-[#17181c]" />
                <span>100% Free · 60 Seconds</span>
              </span>
              <span className="text-xs font-mono text-stone-300">
                5 Core Operating Domains
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
              The 5-Domain Sovereign Operating Audit
            </h2>

            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed italic">
              "Discover your exact decision latency, annual EBITDA drag, and founder bottleneck score across Clear Thinking, Delegation, Execution Speed, Team Standards, and Business Independence."
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-stone-300 pt-1">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>60-second completion</span>
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Immediate outcome report</span>
              </span>
              <span className="flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Unlocks In-Depth Diagnostic</span>
              </span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col gap-2">
            <button
              onClick={onLaunchTest}
              className="px-6 py-3.5 text-xs font-bold uppercase text-[#17181c] bg-gold-gradient hover:opacity-95 transition-all rounded-sm flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-98"
            >
              <Zap className="w-4 h-4 fill-current text-[#17181c]" />
              <span>Launch Free 60-Sec Audit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] text-stone-400 text-center font-mono">
              Confidential · Zero email required to view score
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};
