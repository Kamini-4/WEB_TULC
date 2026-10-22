import React from 'react';
import { Crown, ArrowRight, Sparkles, CheckCircle2, Lock, Activity, Users, Flame } from 'lucide-react';

interface CouncilChambersPreviewProps {
  onOpenFullDossier: () => void;
  onExploreDiagnostic: () => void;
}

export const CouncilChambersPreview: React.FC<CouncilChambersPreviewProps> = ({
  onOpenFullDossier,
  onExploreDiagnostic
}) => {
  return (
    <section id="council-preview" className="py-10 sm:py-12 lg:py-14 border-b border-[#e5decfe0] bg-[#141416] text-white relative overflow-hidden">
      {/* Background ambient gold lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-[#d4af37]/25 rounded-full blur-[140px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="p-6 sm:p-8 lg:p-10 rounded-lg bg-gradient-to-br from-[#1c1e26] via-[#16181f] to-[#141416] border-2 border-[#d4af37]/60 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left 8 Cols: Overview & Diagnostic Taste */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase font-bold text-[#d4af37]">
                <Crown className="w-4 h-4 text-[#d4af37]" />
                <span className="bg-[#242731] border border-[#d4af37]/40 px-2 py-0.5 rounded-xs">
                  Confidential Strategic Sanctuary
                </span>
                <span aria-hidden="true" className="text-stone-600">·</span>
                <span className="text-stone-300">Challenger Cybernetic Dialectic</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
                The Council Chambers: <br className="hidden sm:inline" />
                <span className="text-[#d4af37]">Sparring Room for Founders & CXOs.</span>
              </h2>

              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed italic max-w-2xl">
                "Not an echo chamber. Powered by organizational cybernetics and Tier-1 institutional research (Harvard, MIT Sloan, McKinsey, Stanford) to stress-test vulnerabilities, calculate your metabolic decision tax, and extract an immutable Code of Action."
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs text-stone-200 font-sans">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                  <span><strong>5 Dedicated Chambers:</strong> Hot-switch across Cognitive, Velocity & Integrity</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                  <span><strong>Triad Roundtable:</strong> Consigliere, Wealth Strategist & Execution Orchestrator</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                  <span><strong>Active Cockpit HUD:</strong> Vocal prosody biometrics & macroeconomic shocks</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                  <span><strong>Zero-Data Retention:</strong> Ephemeral session with 1-click instant memory purge</span>
                </div>
              </div>
            </div>

            {/* Right 4 Cols: Actions */}
            <div className="lg:col-span-4 p-5 rounded-md bg-[#22252e] border border-stone-700 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#d4af37] uppercase font-mono">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Sanctuary Entry</span>
              </div>
              <div className="text-xs text-stone-300 leading-relaxed font-sans">
                Experience a foundational sparring taste included with your Diagnostic, or unlock full year-round strategic conclaves with implementation.
              </div>
              <div className="space-y-2 pt-1">
                <button
                  onClick={onOpenFullDossier}
                  className="w-full py-2.5 px-4 bg-gold-gradient text-[#141416] text-xs font-bold uppercase rounded-sm transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-98"
                >
                  <span>Enter Council Chambers Sanctuary</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={onExploreDiagnostic}
                  className="w-full py-2 px-3 text-[11px] text-[#d4af37] hover:text-white transition-colors text-center cursor-pointer font-semibold"
                >
                  See Diagnostic Details →
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
