import React from 'react';
import { VideoPlayer } from './VideoPlayer';
import { ShieldCheck, ArrowRight, Zap, CheckCircle2, Sparkles, HeartHandshake, Compass } from 'lucide-react';

interface VideoBriefingProps {
  onOpenConsultation: () => void;
  onTakeTest: () => void;
}

export const VideoBriefingSection: React.FC<VideoBriefingProps> = ({ onOpenConsultation, onTakeTest }) => {
  return (
    <section id="briefing" className="py-10 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 border-b border-[#e5decfe0] bg-[#f2ede2] relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left 7 Columns: Persuasive Narrative — "Humans + Architecture" */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#17181c] text-[#d4af37] text-xs font-mono uppercase font-bold rounded-xs shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Direct Founder Briefing · Suchita Sancheti</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#17181c] leading-tight tracking-tight [text-wrap:balance]">
              When You Scale Without Architecture, <br className="hidden sm:inline" />
              <span className="text-[#9d7b38]">You Just Scale Your Personal Exhaustion.</span>
            </h2>

            <p className="text-sm sm:text-base text-[#4e5159] leading-relaxed italic">
              "You hired high-caliber people. You pay top compensation. You hold weekly strategy meetings. Yet somehow, <strong className="text-[#17181c] not-italic font-bold">every high-stakes decision still lands on your desk at 8:00 PM</strong>. Your team isn't incompetent—they are simply paralyzed by uncodified rules."
            </p>

            {/* The Core Doctrine: Humans + Architecture */}
            <div className="p-4 sm:p-5 rounded-md bg-[#ffffff] border border-[#d8cebe] shadow-xs space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#9d7b38] font-bold">
                <HeartHandshake className="w-4 h-4 text-[#9d7b38]" />
                <span>Our Governing Formula: Humans + Architecture</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                <div className="p-3 rounded-xs bg-[#faf8f5] border border-[#e5decfe0] space-y-1">
                  <div className="font-bold text-[#17181c] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#9d7b38]" />
                    <span>The Humans</span>
                  </div>
                  <p className="text-[#555861] leading-relaxed">
                    We eliminate learned helplessness and blame-avoidance. Your senior leaders stop hiding behind consensus decks and discover the psychological safety to act with courage.
                  </p>
                </div>

                <div className="p-3 rounded-xs bg-[#faf8f5] border border-[#e5decfe0] space-y-1">
                  <div className="font-bold text-[#17181c] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#17181c]" />
                    <span>The Architecture</span>
                  </div>
                  <p className="text-[#555861] leading-relaxed">
                    We hard-code your decision thresholds, risk boundaries, and signing matrices into self-executing operational criteria. When criteria are met, teams execute without permission.
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#f0eade] text-xs text-[#17181c] font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>The Outcome: You reclaim 15+ hours weekly, stop midnight firefighting, and own an asset that compounds without you.</span>
              </div>
            </div>

            {/* Action Row */}
            <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={onOpenConsultation}
                className="px-6 py-3 text-xs font-bold uppercase text-white bg-[#17181c] hover:bg-[#282a30] transition-all rounded-sm flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-98"
              >
                <span>Request Private Advisory Briefing</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onTakeTest}
                className="px-5 py-3 text-xs font-bold uppercase text-[#17181c] hover:bg-[#ffffff] bg-[#f8f6f0] border border-[#d8cebe] transition-colors rounded-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Run Free 5-Domain Scan</span>
              </button>
            </div>

          </div>

          {/* Right 5 Columns: Video Player Card with Lazy Load & Fast Interaction */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-[380px] bg-[#ffffff] p-2.5 sm:p-3 border border-[#d8cebe] rounded-lg shadow-md space-y-2.5">
              
              <VideoPlayer 
                videoUrl="https://drive.google.com/file/d/1435SE1X1AMP7jWn7Dwcqx9JD1kHtov7w/view?usp=drive_link" 
                aspectRatio="portrait"
                title="How We Transition Founders to Sovereign Architecture"
                className="rounded-sm"
              />

              <div className="text-center px-2 py-1">
                <div className="text-xs font-bold text-[#17181c] uppercase tracking-normal">
                  Briefing: The Decoupling Protocol
                </div>
                <div className="text-[11px] text-[#6e727c] mt-0.5">
                  Direct personal briefing with Suchita Sancheti (Enterprise Architect)
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
