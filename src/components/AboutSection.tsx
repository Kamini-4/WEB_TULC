import React from 'react';
import { 
  Compass, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft,
  Award, 
  CheckCircle2, 
  HeartHandshake, 
  Sparkles, 
  Target, 
  Eye, 
  Clock, 
  Lock,
  Phone,
  Mail
} from 'lucide-react';
import { LinkedinIcon, InstagramIcon } from './SocialIcons';

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
            "You Didn't Build an Empire to Be Trapped in Tactical Firefighting. <br className="hidden sm:inline" />
            <span className="text-[#9d7b38]">We Architect The Structural Systems That Command The Future."</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#4e5159] font-normal leading-relaxed italic">
            At The Unbounded Leadership Co., founded by Suchita Sancheti, we believe true sovereign scale is not working 80 hours a week in endless triage. True sovereignty is commanding an enduring, self-governing enterprise that compounds enterprise value autonomously while you lead with total strategic composure.
          </p>
        </div>

        {/* Vision, Mission & Dual Architecture Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start mb-8">
          
          {/* Left Column: Suchita Sancheti Portrait & Bio Dossier (4 Cols) */}
          <div className="lg:col-span-4 bg-[#ffffff] border-2 border-[#d4af37]/60 rounded-lg p-5 sm:p-6 shadow-md space-y-4">
            
            {/* Founder Portrait: Suchita Sancheti */}
            <div className="relative w-full aspect-[4/5] sm:aspect-square max-h-[340px] rounded-md overflow-hidden border-2 border-[#d4af37] shadow-lg bg-[#141416] group">
              <img 
                src="/assets/suchita-sancheti.jpg" 
                alt="Suchita Sancheti — Founder & Enterprise Architect, The Unbounded Leadership Co." 
                className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                width="400"
                height="450"
                loading="eager"
              />
              <div className="absolute bottom-2 left-2 right-2 bg-[#17181c]/90 backdrop-blur-xs px-2.5 py-1.5 rounded-xs border border-[#d4af37]/40 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37] font-bold">
                  Suchita Sancheti
                </span>
                <span className="text-[9px] font-mono uppercase tracking-wider text-[#e5decfe0]">
                  Founder & Architect
                </span>
              </div>
            </div>

            <div className="space-y-1 text-center sm:text-left">
              <div className="inline-block px-2 py-0.5 bg-[#faf6ee] border border-[#ebdcc0] text-[10px] font-mono uppercase font-bold text-[#9d7b38] rounded-xs mb-1">
                Verified Enterprise Authority
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#17181c]">Suchita Sancheti</h3>
              <div className="text-xs font-bold text-[#9d7b38] uppercase tracking-wide">Founder & Enterprise Architect</div>
              <p className="text-xs text-[#6e727c] leading-relaxed">
                Synthesizing cybernetic systems architecture, executive governance, and behavioral decision design to establish absolute organizational sovereignty.
              </p>
            </div>

            <div className="p-3.5 rounded-md bg-[#faf8f5] border border-[#e5decfe0] text-xs text-[#555861] leading-relaxed italic">
              "When an enterprise stalls, consultants produce 200-page slide decks and coaches offer platitudes. We do neither. We step inside your boardroom, identify where structural friction freezes your leadership, and hard-code boundary covenants so your executives lead with unyielding conviction."
            </div>

            <div className="pt-2 border-t border-[#f0eade] space-y-2 text-xs text-[#17181c]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#9d7b38] shrink-0" />
                <span>Zero junior handoffs — direct confidential 1-on-1 advisory</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#9d7b38] shrink-0" />
                <span>No hourly billing — pure sovereign outcome-driven mandates</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#9d7b38] shrink-0" />
                <span>100% focused on Enterprise Decoupling ($10M–$100M+)</span>
              </div>
            </div>

            {/* Direct Contact & Social Links */}
            <div className="p-3 rounded bg-[#faf6ee] border border-[#ebdcc0] space-y-1.5 text-xs">
              <a href="tel:+919325346704" className="flex items-center gap-1.5 text-[#17181c] hover:text-[#9d7b38] font-bold">
                <Phone className="w-3.5 h-3.5 text-[#9d7b38]" />
                <span>+91 9325346704</span>
              </a>
              <a href="mailto:suchita@theunboundedleadership.com" className="flex items-center gap-1.5 text-[#484b54] hover:text-[#9d7b38]">
                <Mail className="w-3.5 h-3.5 text-[#9d7b38]" />
                <span className="truncate">suchita@theunboundedleadership.com</span>
              </a>
              <div className="pt-1.5 border-t border-[#ebdcc0]/60 flex items-center gap-3">
                <a href="https://www.linkedin.com/in/suchita-sancheti" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#0077b5] font-semibold hover:underline">
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
                <a href="https://www.instagram.com/transformingleadership" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[#e4405f] font-semibold hover:underline">
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>@transformingleadership</span>
                </a>
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

          {/* Right Column: Exact Verbatim Vision, Mission & "Humans + Architecture" Core System (8 Cols) */}
          <div className="lg:col-span-8 space-y-5">
            
            {/* Vision & Mission Cards (Exact Verbatim Mandate) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Vision Card */}
              <div className="p-5 sm:p-6 rounded-lg bg-[#ffffff] border border-[#d8cebe] shadow-xs space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#9d7b38] font-bold">
                  <Eye className="w-4 h-4 text-[#9d7b38]" />
                  <span>Vision</span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-[#17181c] leading-snug">
                  To Align Human Ambition With Enduring Architecture.
                </h4>
                <p className="text-xs sm:text-sm text-[#383a42] font-serif leading-relaxed italic">
                  “To align human ambition with enduring organizational architecture — so that power, scale, and perpetuity compound as one, and what the world's greatest founders build today commands the future long after they have conquered it.”
                </p>
              </div>

              {/* Mission Card */}
              <div className="p-5 sm:p-6 rounded-lg bg-[#ffffff] border border-[#d8cebe] shadow-xs space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#9d7b38] font-bold">
                  <Target className="w-4 h-4 text-[#9d7b38]" />
                  <span>Mission</span>
                </div>
                <h4 className="text-base sm:text-lg font-bold text-[#17181c] leading-snug">
                  Architecting Conditions for Absolute Organizational Sovereignty.
                </h4>
                <p className="text-xs sm:text-sm text-[#383a42] font-serif leading-relaxed italic">
                  “We work with the world's most consequential founders to architect the structural conditions for absolute organizational sovereignty. Across five foundational domains of systemic alignment, we dismantle operational dependency, dissolve leadership entropy, and engineer the precise infrastructure that allows an empire to grow, scale, and compound — with or without its founder at the helm.”
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

          {/* Navigation Back Button */}
          <div className="mt-8 pt-6 border-t border-[#dfd7c8] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
            <button
              onClick={() => {
                window.location.hash = 'top';
              }}
              aria-label="Go back"
              title="Go back"
              className="p-2 -ml-2 rounded-full text-[#17181c] hover:text-[#9d7b38] hover:bg-[#ede5d6] transition-colors cursor-pointer flex items-center justify-center min-w-[36px] min-h-[36px]"
            >
              <ArrowLeft className="w-5 h-5 text-[#9d7b38]" />
            </button>

            <button
              onClick={() => {
                window.location.hash = 'partnerships';
              }}
              className="text-[#9d7b38] hover:text-[#7d5f24] transition-colors py-1 cursor-pointer font-bold flex items-center gap-1.5"
            >
              <span>Explore Services Tracks →</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
