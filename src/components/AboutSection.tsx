import React from 'react';
import { 
  Compass, 
  ShieldCheck, 
  ArrowRight, 
  Award, 
  CheckCircle2, 
  HeartHandshake, 
  Sparkles, 
  Target, 
  Eye, 
  Clock, 
  Lock 
} from 'lucide-react';

interface AboutSectionProps {
  onOpenConsultation: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenConsultation }) => {
  return (
    <section id="about" className="py-10 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 border-b border-[#e5decfe0] bg-[#f8f6f0] relative">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-6 sm:mb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase text-[#9d7b38] font-bold mb-2">
            <Compass className="w-4 h-4 text-[#9d7b38]" />
            <span>The Architect & The Firm</span>
            <span aria-hidden="true" className="text-[#c9bea9]">·</span>
            <span className="text-[#17181c] font-bold">Vision & Mission</span>
            <span aria-hidden="true" className="text-[#c9bea9]">·</span>
            <span>Executive Mastery + Sovereign Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#17181c] leading-tight tracking-tight [text-wrap:balance]">
            "You Didn't Build a Company to Live in Slack. <br className="hidden sm:inline" />
            <span className="text-[#9d7b38]">We Engineer The Systems That Set You Free."</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#4e5159] font-normal leading-relaxed italic">
            At The Unbounded Leadership Co., we believe true success isn't working 80 hours a week to prove your dedication. True success is owning a self-governing enterprise that scales profitably while you reclaim your Wednesday afternoons and lead with total composure.
          </p>
        </div>

        {/* Vision, Mission & Dual Architecture Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start mb-8">
          
          {/* Left Column: Suchita Sancheti Bio Card (4 Cols) */}
          <div className="lg:col-span-4 bg-[#ffffff] border border-[#d8cebe] rounded-lg p-5 sm:p-6 shadow-sm space-y-4">
            
            {/* Official Heraldic Crest Insignia */}
            <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-[#d4af37] shadow-md mx-auto sm:mx-0">
              <img 
                src="/assets/aistudio/WhatsApp_Image_2026-01-09_at_13.01.23_3b22d7ab.jpeg" 
                alt="The Unbounded Leadership Co. Insignia" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-xl font-bold text-[#17181c]">Suchita Sancheti</h3>
              <div className="text-xs font-bold text-[#9d7b38] uppercase">Founder & Enterprise Architect</div>
              <p className="text-xs text-[#6e727c]">
                Synthesizing cybernetic systems architecture, executive governance, and behavioral decision design.
              </p>
            </div>

            <div className="p-3.5 rounded-md bg-[#faf8f5] border border-[#e5decfe0] text-xs text-[#555861] leading-relaxed italic">
              "When a company stalls, consultants write 200-page slide decks and coaches tell you to breathe. We do neither. We step inside your boardroom, identify where unwritten rules freeze your leadership, and hard-code boundary covenants so your people lead with courage."
            </div>

            <div className="pt-2 border-t border-[#f0eade] space-y-2 text-xs text-[#17181c]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#9d7b38] shrink-0" />
                <span>Zero junior handoffs — confidential 1-on-1 advisory</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#9d7b38] shrink-0" />
                <span>No hourly billing — pure outcome-driven mandates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#9d7b38] shrink-0" />
                <span>100% focused on Enterprise Decoupling ($10M–$100M+)</span>
              </div>
            </div>

            <button
              onClick={onOpenConsultation}
              className="w-full py-2.5 px-4 bg-[#17181c] hover:bg-[#282a30] text-white text-xs font-bold uppercase rounded-sm transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer active:scale-98"
            >
              <span>Initiate Private Dialogue</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#d4af37]" />
            </button>
          </div>

          {/* Right Column: Vision, Mission & "Humans + Architecture" Core System (8 Cols) */}
          <div className="lg:col-span-8 space-y-5">
            
            {/* Vision & Mission Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Mission */}
              <div className="p-5 rounded-lg bg-[#ffffff] border border-[#d8cebe] shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#9d7b38] font-bold">
                  <Target className="w-4 h-4 text-[#9d7b38]" />
                  <span>Our Mission</span>
                </div>
                <h4 className="text-lg font-bold text-[#17181c] leading-snug">
                  To Decouple Founders & Reclaim Their Freedom in 90 Days.
                </h4>
                <p className="text-xs sm:text-sm text-[#4e5159] leading-relaxed">
                  We install unbreakable decision architecture inside high-growth companies—fusing human courage with codified operating systems—so founders reclaim 15+ hours weekly, eliminate late-night firefighting, and watch their enterprises compound without daily micromanagement.
                </p>
              </div>

              {/* Vision */}
              <div className="p-5 rounded-lg bg-[#ffffff] border border-[#d8cebe] shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#9d7b38] font-bold">
                  <Eye className="w-4 h-4 text-[#9d7b38]" />
                  <span>Our Vision</span>
                </div>
                <h4 className="text-lg font-bold text-[#17181c] leading-snug">
                  An Era of Enduring, Self-Governing Sovereign Institutions.
                </h4>
                <p className="text-xs sm:text-sm text-[#4e5159] leading-relaxed">
                  We envision a corporate world where enterprises are not constrained by single-person bottlenecks, but operate as resilient sovereign assets where leadership wisdom governs autonomously across market shifts, M&A integrations, and generational succession.
                </p>
              </div>

            </div>

            {/* OUR SYSTEM: EXECUTIVE MASTERY + SOVEREIGN SYSTEMS ARCHITECTURE (Winning Them Over) */}
            <div className="p-5 sm:p-7 rounded-lg bg-gradient-to-br from-[#17181c] via-[#20232b] to-[#17181c] text-white border-2 border-[#d4af37]/60 shadow-lg space-y-4">
              
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#282a33] text-[#d4af37] text-xs font-mono uppercase font-bold rounded-xs border border-[#d4af37]/40">
                  <HeartHandshake className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>The Proprietary Dual-Engine Philosophy</span>
                </div>
                <span className="text-xs font-mono text-stone-300">
                  Why Great Leaders Choose TULC
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
                  The Dual Architecture: <span className="text-[#d4af37]">Executive Mastery + Sovereign Systems.</span>
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed italic">
                  "Most consultancies offer executive coaching without architecture, or organizational charts without executive conviction. We unite the two: cultivating decisive executive judgment while installing an invariant operating architecture that scales autonomously."
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                
                <div className="p-4 rounded-md bg-[#252830] border border-stone-700/80 space-y-1.5">
                  <div className="text-sm font-bold text-[#d4af37] flex items-center gap-1.5">
                    <span>1. Executive Mastery (Conviction & Trust)</span>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    We unlock decisive leadership agency, mutual executive trust, and proactive ownership. Your leadership team operates with uncompromised clarity and high-velocity conviction, eliminating committee delays and decision fatigue.
                  </p>
                </div>

                <div className="p-4 rounded-md bg-[#252830] border border-stone-700/80 space-y-1.5">
                  <div className="text-sm font-bold text-[#d4af37] flex items-center gap-1.5">
                    <span>2. Sovereign Systems Architecture (Clarity & Invariant Governance)</span>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed">
                    We translate founder intuition into explicit boundary covenants, pre-ratified capital thresholds, and 14-day asynchronous execution loops. When criteria are satisfied, initiatives execute autonomously at market velocity.
                  </p>
                </div>

              </div>

              {/* What They Want To Hear */}
              <div className="p-4 rounded-md bg-[#141416] border border-[#d4af37]/40 space-y-2">
                <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#d4af37]" />
                  <span>What You Experience In 90 Days:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs text-stone-300">
                  <div className="flex items-start gap-1.5">
                    <span className="text-[#d4af37] font-bold">✓</span>
                    <span><strong>15+ Hours Returned:</strong> Your focus shifts from operational triage to strategic capital allocation and enterprise scale.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-[#d4af37] font-bold">✓</span>
                    <span><strong>Autonomous Execution:</strong> Direct reports resolve high-stakes trade-offs within codified guardrails without escalating routine decisions.</span>
                  </div>
                  <div className="flex items-start gap-1.5">
                    <span className="text-[#d4af37] font-bold">✓</span>
                    <span><strong>Asset Multiplier:</strong> A self-governing business commands up to 35% higher valuation multiple.</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
