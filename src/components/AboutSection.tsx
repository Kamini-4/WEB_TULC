import React, { useState } from 'react';
import { 
  Compass, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2, 
  Sparkles, 
  Target, 
  Eye, 
  Phone, 
  Mail,
  Scale,
  Zap,
  Clock,
  Building2,
  Check,
  X,
  Lock,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { LinkedinIcon, InstagramIcon } from './SocialIcons';

interface AboutSectionProps {
  onOpenConsultation: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenConsultation }) => {
  const [showFullVision, setShowFullVision] = useState(false);
  const [imgSrc, setImgSrc] = useState('/assets/suchita-portrait.svg');

  return (
    <section id="about" className="py-6 sm:py-8 px-4 sm:px-6 lg:px-8 border-b border-[#dfd7c8] bg-[#f8f6f0] relative">
      <div className="max-w-[1440px] mx-auto space-y-6">
        
        {/* Section Header — Compact, Effective Spacing, Refined Fonts */}
        <div className="max-w-3xl mx-auto text-center space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#ede5d6] border border-[#d8cebe] rounded-xs text-[10px] font-mono uppercase text-[#9d7b38] font-bold shadow-2xs">
            <Compass className="w-3 h-3 text-[#9d7b38]" />
            <span>The Architect & Sovereign Standard</span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#17181c] font-serif tracking-tight leading-snug">
            "You Didn't Build An Empire To Remain Trapped In Its Machinery."
          </h2>

          <p className="text-xs sm:text-[13px] text-[#555861] font-serif leading-relaxed italic max-w-xl mx-auto">
            Founded by Suchita Sancheti with Direction by Kamini Agnihotri — engineering permanent founder decoupling and sovereign operating architectures in 90 days.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* PART 1: FOUNDER TRUST CARD & LETTER (USING PHOTO TO BUILD TRUST) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
          
          {/* Left Column: Authentic Portrait & Direct Contact Card (4 cols) */}
          <div className="lg:col-span-4 bg-[#ffffff] border border-[#d4af37]/60 rounded-md p-4 sm:p-5 shadow-xs flex flex-col justify-between space-y-3">
            
            {/* Founder Portrait & Insignia Frame */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[4/3] max-h-[220px] rounded-xs overflow-hidden border border-[#d4af37] shadow-xs bg-[#f4f1ea] group flex items-center justify-center">
              <img 
                src={imgSrc} 
                alt="Suchita Sancheti — Founder & Enterprise Architect, The Unbounded Leadership Co." 
                onError={() => {
                  if (imgSrc !== '/assets/suchita-sancheti.jpg') {
                    setImgSrc('/assets/suchita-sancheti.jpg');
                  }
                }}
                className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                width="360"
                height="270"
                loading="eager"
              />
              <div className="absolute bottom-1.5 left-1.5 right-1.5 bg-[#17181c]/90 backdrop-blur-xs px-2 py-1 rounded-xs border border-[#d4af37]/40 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#d4af37] font-bold">
                  Suchita Sancheti
                </span>
                <span className="text-[8.5px] font-mono uppercase tracking-wider text-[#e5decfe0]">
                  Founder & Architect
                </span>
              </div>
            </div>

            {/* Quick Title & Direction */}
            <div className="space-y-0.5">
              <div className="text-base sm:text-lg font-bold text-[#17181c] font-serif leading-tight">
                Suchita Sancheti
              </div>
              <div className="text-[10.5px] font-bold text-[#9d7b38] uppercase font-mono tracking-wider">
                Direction by Kamini Agnihotri
              </div>
              <p className="text-[11px] text-[#555861] font-serif leading-snug">
                Pioneering sovereign enterprise architecture, executive cadences, and founder decoupling across India, the Middle East, and globally.
              </p>
            </div>

            {/* 4 Concrete Sovereign Commitments */}
            <div className="py-2 border-y border-[#f0eade] space-y-1 text-[11px] text-[#17181c] font-sans">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#9d7b38] shrink-0" />
                <span className="font-semibold">Direct 1-on-1 engagement (Zero junior staff handoffs)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#9d7b38] shrink-0" />
                <span>Strict 90-day runway with definitive exit date</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#9d7b38] shrink-0" />
                <span>Patent-Pending L.O.S.-P721 Operating Diagnostic™</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#9d7b38] shrink-0" />
                <span>In-Camera Board Privilege & Chatham House Protocol</span>
              </div>
            </div>

            {/* Verified Direct Channels & Consultation Trigger */}
            <div className="space-y-2">
              <div className="p-2.5 rounded bg-[#faf6ee] border border-[#ebdcc0] space-y-1.5 text-[11px]">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-[#9d7b38] font-bold">
                    Direct Advisory Desk
                  </span>
                  <div className="flex items-center gap-2">
                    <a href="https://www.linkedin.com/in/suchita-sancheti" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-[#0077b5] hover:opacity-80">
                      <LinkedinIcon className="w-3.5 h-3.5" />
                    </a>
                    <a href="https://www.instagram.com/transformingleadership" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-[#e4405f] hover:opacity-80">
                      <InstagramIcon className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px]">
                  <a href="tel:+919325346704" className="flex items-center gap-1 text-[#17181c] hover:text-[#9d7b38] font-bold">
                    <Phone className="w-3 h-3 text-[#9d7b38] shrink-0" />
                    <span>+91 9325346704</span>
                  </a>
                  <a href="mailto:suchita@theunboundedleadership.com" className="flex items-center gap-1 text-[#484b54] hover:text-[#9d7b38] font-medium truncate">
                    <Mail className="w-3 h-3 text-[#9d7b38] shrink-0" />
                    <span className="truncate">suchita@theunboundedleadership.com</span>
                  </a>
                </div>
              </div>

              <button
                onClick={onOpenConsultation}
                className="w-full py-2 px-3 bg-[#17181c] hover:bg-[#282a30] text-white text-[11px] font-mono font-bold uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer active:scale-98"
              >
                <span>Initiate Private Dialogue</span>
                <ArrowRight className="w-3 h-3 text-[#d4af37]" />
              </button>
            </div>

          </div>

          {/* Right Column: Personal Letter & Core Architecture Metrics (8 cols) */}
          <div className="lg:col-span-8 bg-[#ffffff] border border-[#d8cebe] rounded-md p-4 sm:p-5 shadow-xs flex flex-col justify-between space-y-3.5">
            
            {/* Top Bar of Personal Letter */}
            <div className="flex items-center justify-between border-b border-[#f0eade] pb-2">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#9d7b38]" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#9d7b38] font-bold">
                  A Personal Letter From Suchita Sancheti
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#71747d]">
                Executive In-Camera Brief
              </span>
            </div>

            {/* The Letter Body — Conversational, Empathetic, Inclusive, Simon Sinek / Brené Brown Style */}
            <div className="space-y-2 text-xs sm:text-[13px] text-[#2c2e33] font-serif leading-relaxed">
              <p>
                <strong className="text-[#17181c] text-sm">Dear Founder & Executive Leader,</strong>
              </p>
              <p>
                You built your organization with extraordinary vision, grit, and personal instinct. In the early days, being in every room and approving every decision was your greatest competitive advantage.
              </p>
              <p>
                But past $5M or $20M in revenue, that exact superpower becomes your single biggest operational bottleneck. You hired smart, capable leaders. You pay top compensation. Yet somehow, every complex issue still reaches your desk at 8:00 PM. Your team hesitates not from lack of ambition, but because your decision boundaries are stored in your head rather than hard-coded into the architecture.
              </p>
              <p className="italic text-[#484b54] bg-[#faf7f0] p-2.5 rounded-xs border-l-2 border-[#9d7b38]">
                "When you scale without architecture, you just scale your personal exhaustion. True leadership isn't being indispensable to daily operations—it is building an enterprise that executes with sovereign clarity whether you are in the boardroom or halfway across the globe."
              </p>
              <p>
                We do not deliver theoretical slide decks. We partner with you directly for 90 days to codify decision rights, install asynchronous execution cadences, and build an autonomous operating system that returns your life and accelerates your company's valuation.
              </p>
            </div>

            {/* 4 Quantitative Sovereign Metrics Grid */}
            <div className="pt-2 border-t border-[#f0eade] grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="p-2 rounded-xs bg-[#faf7f0] border border-[#ebdcc0]">
                <div className="font-mono text-base font-bold text-[#17181c]">90 Days</div>
                <div className="text-[9.5px] font-mono uppercase text-[#9d7b38] font-semibold">Strict Runway</div>
              </div>
              <div className="p-2 rounded-xs bg-[#faf7f0] border border-[#ebdcc0]">
                <div className="font-mono text-base font-bold text-[#17181c]">20+ Hrs</div>
                <div className="text-[9.5px] font-mono uppercase text-[#9d7b38] font-semibold">Weekly Reclaimed</div>
              </div>
              <div className="p-2 rounded-xs bg-[#faf7f0] border border-[#ebdcc0]">
                <div className="font-mono text-base font-bold text-[#17181c]">30%+ Bump</div>
                <div className="text-[9.5px] font-mono uppercase text-[#9d7b38] font-semibold">Valuation Multiple</div>
              </div>
              <div className="p-2 rounded-xs bg-[#faf7f0] border border-[#ebdcc0]">
                <div className="font-mono text-base font-bold text-[#17181c]">100% Owned</div>
                <div className="text-[9.5px] font-mono uppercase text-[#9d7b38] font-semibold">IP In Perpetuity</div>
              </div>
            </div>

          </div>

        </div>

        {/* ========================================================================= */}
        {/* PART 2: THE COMPARISON TABLE (COMPACT, HIGH-DENSITY, NO SCROLL REQUIRED) */}
        {/* ========================================================================= */}
        <div id="comparison" className="bg-[#ffffff] border border-[#d8cebe] rounded-md shadow-xs overflow-hidden scroll-mt-20">
          
          {/* Header Bar of the Comparison Table */}
          <div className="py-2.5 px-3 sm:px-4 bg-[#17181c] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#9d7b38]/40">
            <div>
              <div className="flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-[#d4af37]" />
                <span className="text-[9.5px] font-mono uppercase tracking-widest text-[#d4af37] font-bold">
                  The Sovereign Transformation Ledger
                </span>
              </div>
              <h3 className="font-serif text-sm sm:text-base font-bold text-white mt-0.5">
                What You Get: The Unbounded Leadership Co. vs. Traditional Advisory Firms
              </h3>
            </div>
            <span className="text-[10px] font-mono text-[#d4af37] bg-[#252830] px-2 py-0.5 rounded-xs border border-[#d4af37]/30 shrink-0 self-start sm:self-auto">
              Tangible Executive Outcomes
            </span>
          </div>

          {/* Compact Desktop Side-by-Side Table (Small fonts, tight padding, fits screen without scrolling) */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[620px]">
              <thead>
                <tr className="border-b border-[#d8cebe] bg-[#f0eade]">
                  <th className="py-2 px-3 text-[10px] font-mono uppercase tracking-wider text-[#685327] font-bold w-[22%]">
                    Strategic Dimension
                  </th>
                  <th className="py-2 px-3 text-[10px] font-mono uppercase tracking-wider text-[#7a4242] font-bold w-[39%] bg-[#ede5d6] border-x border-[#d8cebe]">
                    <div className="flex items-center gap-1">
                      <X className="w-3 h-3 text-red-600" />
                      <span>Other Advisory Firms & Coaches</span>
                    </div>
                  </th>
                  <th className="py-2 px-3 text-[10px] font-mono uppercase tracking-wider text-[#d4af37] font-bold w-[39%] bg-[#17181c] text-white">
                    <div className="flex items-center gap-1">
                      <Check className="w-3 h-3 text-[#d4af37]" />
                      <span>The Unbounded Leadership Co. (Suchita Sancheti)</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dfd7c8] text-[11px] leading-snug">
                
                {/* Row 1: Deliverable */}
                <tr className="bg-[#faf7f0] hover:bg-[#f6f2e8] transition-colors">
                  <td className="py-2 px-3 font-serif font-bold text-[#17181c]">
                    Primary Deliverable & Outcome
                  </td>
                  <td className="py-2 px-3 bg-[#f4ede0]/70 border-x border-[#dfd7c8] text-[#555861]">
                    <span className="font-semibold text-red-900 block">200-Slide Slide Deck & Theory</span>
                    Unimplemented advice; you stay trapped in the daily firefighting machinery.
                  </td>
                  <td className="py-2 px-3 bg-[#1e2026] text-stone-200">
                    <span className="font-bold text-[#d4af37] block">Codified Decoupled OS in 90 Days</span>
                    Autonomous infrastructure installed directly into your team with strict exit date.
                  </td>
                </tr>

                {/* Row 2: Time Drag */}
                <tr className="bg-[#f5efe4] hover:bg-[#ede5d6] transition-colors">
                  <td className="py-2 px-3 font-serif font-bold text-[#17181c]">
                    Your Weekly Operational Drag
                  </td>
                  <td className="py-2 px-3 bg-[#ede4d4]/70 border-x border-[#dfd7c8] text-[#555861]">
                    <span className="font-semibold text-red-900 block">+6–10 hrs/wk Added Overhead</span>
                    More status check-ins and homework that add work just managing the consultants.
                  </td>
                  <td className="py-2 px-3 bg-[#1a1b20] text-stone-200">
                    <span className="font-bold text-[#d4af37] block">Reclaims 20+ Hours Every Week</span>
                    Dismantles 70% of consensus meetings with 14-day asynchronous execution loops.
                  </td>
                </tr>

                {/* Row 3: Valuation */}
                <tr className="bg-[#faf7f0] hover:bg-[#f6f2e8] transition-colors">
                  <td className="py-2 px-3 font-serif font-bold text-[#17181c]">
                    Enterprise Valuation Impact
                  </td>
                  <td className="py-2 px-3 bg-[#f4ede0]/70 border-x border-[#dfd7c8] text-[#555861]">
                    <span className="font-semibold text-red-900 block">Zero Multiple Impact</span>
                    Acquirers and PE still penalize valuation due to heavy key-person dependency.
                  </td>
                  <td className="py-2 px-3 bg-[#1e2026] text-stone-200">
                    <span className="font-bold text-[#d4af37] block">30%–100%+ Multiple Expansion</span>
                    Eliminates key-man risk, unlocking institutional-grade capital and sovereign exit value.
                  </td>
                </tr>

                {/* Row 4: IP Handover */}
                <tr className="bg-[#f5efe4] hover:bg-[#ede5d6] transition-colors">
                  <td className="py-2 px-3 font-serif font-bold text-[#17181c]">
                    IP Ownership & Handover
                  </td>
                  <td className="py-2 px-3 bg-[#ede4d4]/70 border-x border-[#dfd7c8] text-[#555861]">
                    <span className="font-semibold text-red-900 block">Vendor-Locked Black Box</span>
                    Methodologies kept proprietary so you must re-engage retainers year after year.
                  </td>
                  <td className="py-2 px-3 bg-[#1a1b20] text-stone-200">
                    <span className="font-bold text-[#d4af37] block">100% Codified IP Handover</span>
                    Complete Leadership Operating System (LOS™) transferred to your board in perpetuity.
                  </td>
                </tr>

                {/* Row 5: Staffing */}
                <tr className="bg-[#faf7f0] hover:bg-[#f6f2e8] transition-colors">
                  <td className="py-2 px-3 font-serif font-bold text-[#17181c]">
                    Advisory Staffing & Privilege
                  </td>
                  <td className="py-2 px-3 bg-[#f4ede0]/70 border-x border-[#dfd7c8] text-[#555861]">
                    <span className="font-semibold text-red-900 block">Junior Associates & Standard NDA</span>
                    25-year-old analysts rotated onto your mandate with generic templates.
                  </td>
                  <td className="py-2 px-3 bg-[#1e2026] text-stone-200">
                    <span className="font-bold text-[#d4af37] block">Direct With Suchita Sancheti</span>
                    Senior principal counsel under Chatham House privilege & in-camera discretion.
                  </td>
                </tr>

              </tbody>
            </table>
          </div>

          {/* Quick Footer Action strip on Table */}
          <div className="p-2 sm:px-4 bg-[#f8f5ee] border-t border-[#dfd7c8] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono">
            <span className="text-[#555861] italic text-center sm:text-left">
              * Every metric audited through the Patent-Pending L.O.S. Forensic Assessment™
            </span>
            <button
              onClick={onOpenConsultation}
              className="text-[#9d7b38] hover:text-[#7a5c18] font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>Schedule Sovereign Briefing Dialogue →</span>
            </button>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* OPTIONAL TOGGLE: FULL INSTITUTIONAL VISION & PHILOSOPHY DOSSIER */}
        {/* ========================================================================= */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => setShowFullVision(!showFullVision)}
            className="w-full py-2 px-3 rounded-xs border border-[#dfd7c8] hover:bg-[#ede5d6] bg-[#faf7f0] text-[#17181c] text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-between transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-1.5 text-[#9d7b38]">
              <Eye className="w-3.5 h-3.5" />
              <span>{showFullVision ? 'Collapse Institutional Vision & Dual Philosophy' : 'Expand Institutional Vision, Mission & Philosophy Dossier'}</span>
            </div>
            {showFullVision ? <ChevronUp className="w-4 h-4 text-[#9d7b38]" /> : <ChevronDown className="w-4 h-4 text-[#9d7b38]" />}
          </button>

          {showFullVision && (
            <div className="mt-3 p-4 sm:p-5 rounded-md bg-[#ffffff] border border-[#d8cebe] shadow-xs space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Vision Card */}
                <div className="p-3.5 rounded-xs bg-[#faf7f0] border border-[#ebdcc0] space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[10.5px] font-mono uppercase text-[#9d7b38] font-bold">
                    <Eye className="w-3.5 h-3.5 text-[#9d7b38]" />
                    <span>Our Sovereign Vision</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#17181c] font-serif">
                    Enterprises that Thrive with Structural Independence.
                  </h4>
                  <p className="text-[11px] text-[#484b54] font-serif leading-relaxed italic">
                    “To build a global benchmark where consequential founders and institutions transition from tactical dependency into sovereign governance—unleashing extraordinary institutional compounding.”
                  </p>
                </div>

                {/* Mission Card */}
                <div className="p-3.5 rounded-xs bg-[#faf7f0] border border-[#ebdcc0] space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[10.5px] font-mono uppercase text-[#9d7b38] font-bold">
                    <Target className="w-3.5 h-3.5 text-[#9d7b38]" />
                    <span>Our Sovereign Mission</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#17181c] font-serif">
                    Architecting the Conditions for Absolute Sovereignty.
                  </h4>
                  <p className="text-[11px] text-[#484b54] font-serif leading-relaxed italic">
                    “Dismantling key-person operational friction, hard-coding boundary criteria across 5 systemic domains, and engineering the precise infrastructure that allows an enterprise to compound permanently.”
                  </p>
                </div>

              </div>

              {/* Dual Engine Philosophy */}
              <div className="p-3.5 rounded-xs bg-[#17181c] text-white border border-[#9d7b38]/40 space-y-2">
                <div className="text-[10px] font-mono uppercase text-[#d4af37] font-bold tracking-wider">
                  The Dual-Engine Philosophy: Executive Mastery + Sovereign Architecture
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                  <div className="p-2.5 rounded-xs bg-[#242730] border border-stone-700/60 space-y-1">
                    <span className="font-bold text-[#d4af37] block">1. Executive Mastery</span>
                    <p className="text-stone-300 leading-snug">
                      High-conviction agency and decisiveness that moves leadership past defensive alignment loops into proactive ownership.
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xs bg-[#242730] border border-stone-700/60 space-y-1">
                    <span className="font-bold text-[#d4af37] block">2. Sovereign Architecture</span>
                    <p className="text-stone-300 leading-snug">
                      Codified decision thresholds, risk boundaries, and capital covenants that execute automatically in your absence.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Back and Forward Button Bar (Arrow only for back button, no text!) */}
        <div className="pt-2 border-t border-[#dfd7c8] flex items-center justify-between text-xs font-mono">
          <button
            onClick={() => {
              window.location.hash = 'top';
            }}
            aria-label="Go back"
            title="Go back"
            className="p-1.5 -ml-1 rounded-full text-[#17181c] hover:text-[#9d7b38] hover:bg-[#ede5d6] transition-colors cursor-pointer flex items-center justify-center min-w-[32px] min-h-[32px]"
          >
            <ArrowLeft className="w-4 h-4 text-[#9d7b38]" />
          </button>

          <div className="flex items-center gap-3">
            <a
              href="#partnerships"
              className="text-[#9d7b38] hover:text-[#7a5c18] font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-1"
            >
              <span>Explore 3 Sovereign Retainers →</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
