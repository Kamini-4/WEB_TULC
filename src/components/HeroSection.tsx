import React, { useState } from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onLaunchDiagnostic: () => void;
  onExplorePartnerships: () => void;
}

export const HeroSection: React.FC<HeroProps> = ({ onLaunchDiagnostic, onExplorePartnerships }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="top" className="relative pt-8 pb-10 sm:pt-10 sm:pb-12 lg:pt-12 lg:pb-14 border-b border-[#e5decfe0] bg-[#f8f6f0] overflow-hidden">
      {/* Soothing warm golden ambient glow */}
      <div className="absolute inset-0 pointer-events-none opacity-50">
        <div className="absolute top-0 right-1/4 w-[320px] sm:w-[600px] h-[320px] sm:h-[450px] bg-[#eedec0]/40 rounded-full blur-[100px] sm:blur-[140px] animate-fluid-float" />
        <div className="absolute bottom-0 left-1/4 w-[280px] sm:w-[500px] h-[280px] sm:h-[350px] bg-[#f0e3cc]/35 rounded-full blur-[90px] sm:blur-[120px] animate-fluid-glow" />
        <div className="absolute inset-0 bg-[radial-gradient(#c5a05912_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Unboxed institutional kicker */}
        <div className="flex flex-wrap items-center gap-2 text-xs uppercase text-[#9d7b38] mb-3 sm:mb-4 font-bold">
          <span>Institutional Advisory</span>
          <span aria-hidden="true" className="text-[#c9bea9]">·</span>
          <span>CXOs & Enterprise Boards</span>
          <span aria-hidden="true" className="text-[#c9bea9]">·</span>
          <span>The Work That Matters</span>
        </div>

        {/* Main Headline with punchy, unvarnished cadence */}
        <div className="max-w-4xl mb-6 sm:mb-7">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#17181c] leading-[1.15] [text-wrap:balance]">
            Management is about compliance. <br className="hidden sm:inline" />
            <span className="text-[#9d7b38]">Leadership is about courage.</span>
          </h1>
          <p className="mt-3.5 sm:mt-4 text-sm sm:text-base lg:text-lg text-[#4e5159] font-normal leading-relaxed max-w-3xl italic">
            When organizations stall, it is rarely a strategy problem. It is almost always a <strong className="font-bold text-[#17181c] not-italic">hiding problem</strong>. Consensus is comfortable. Decisive mandate creates tension. <strong className="font-bold text-[#9d7b38] not-italic">We re-architect the operating system so leadership can happen.</strong>
          </p>
        </div>

        {/* Executive Action Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
          <button
            onClick={onLaunchDiagnostic}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative overflow-hidden px-6 sm:px-8 py-3.5 text-xs font-bold uppercase text-white bg-[#17181c] hover:bg-[#282a30] transition-all rounded-sm flex items-center justify-center gap-2.5 shadow-md hover:shadow-[#c5a059]/25 active:scale-[0.98] min-h-[48px] group"
          >
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />
            
            <span className="relative z-10 text-gold-gradient font-bold">
              Take The 60-Sec Test (Do You Need Us?)
            </span>
            <ArrowRight className={`relative z-10 w-4 h-4 text-[#d4af37] transition-transform duration-200 ${isHovered ? 'translate-x-1' : ''}`} />
          </button>

          <button
            onClick={onExplorePartnerships}
            className="px-5 sm:px-6 py-3.5 text-xs font-bold uppercase text-[#17181c] hover:text-black bg-white hover:bg-[#faf7f0] border border-[#d8cebe] hover:border-[#c5a059] transition-all rounded-sm shadow-xs text-center min-h-[48px] flex items-center justify-center gap-2"
          >
            <span>How We Partner (3 Categories)</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-[#6e727c] sm:ml-2 self-center sm:self-auto pt-1 sm:pt-0">
            <ShieldCheck className="w-4 h-4 text-[#9d7b38] shrink-0" />
            <span>Strict Boardroom Privilege</span>
          </div>
        </div>

        {/* THE 4 BLACK BOXES — COMPACT, ZERO EMPTY SPACE, BACKED EMPIRICAL STATISTICS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-[#e5decfe0]">
          
          {/* Box 1: 72% Consensus Friction (McKinsey) */}
          <div className="p-4 sm:p-5 rounded-lg bg-[#141416] border border-[#2b2d33] hover:border-[#d4af37] shadow-lg hover:shadow-[#c5a059]/15 transition-all duration-300 relative group flex flex-col justify-between fluid-card-lift">
            <div>
              <div className="flex items-baseline justify-between">
                <div className="text-2xl sm:text-3xl lg:text-3xl font-bold text-[#d4af37] tabular-nums">
                  72%
                </div>
                <span className="text-[10px] font-bold uppercase text-[#c5a059] tracking-wider">
                  Consensus Drag
                </span>
              </div>
              <div className="mt-2.5">
                <div className="text-xs sm:text-sm font-bold text-white">
                  Capital isn't accounting. It's conviction.
                </div>
                <div className="text-xs text-[#a6a9b2] mt-1 leading-relaxed italic">
                  72% of senior leaders report bad strategic decisions stem from consensus compromises rather than analytical error.
                </div>
              </div>
            </div>
            <div className="mt-3 pt-2.5 border-t border-[#23252b] flex items-center justify-between text-[10px] text-[#8e929b]">
              <span className="font-medium text-[#c5a059]">McKinsey Decision Survey</span>
              <span className="text-[#686b74]">Empirical Benchmark</span>
            </div>
            <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#d4af37] opacity-70 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Box 2: 61% Time on Alignment vs Market (HBR) */}
          <div className="p-4 sm:p-5 rounded-lg bg-[#141416] border border-[#2b2d33] hover:border-[#d4af37] shadow-lg hover:shadow-[#c5a059]/15 transition-all duration-300 relative group flex flex-col justify-between fluid-card-lift">
            <div>
              <div className="flex items-baseline justify-between">
                <div className="text-2xl sm:text-3xl lg:text-3xl font-bold text-[#d4af37] tabular-nums">
                  61%
                </div>
                <span className="text-[10px] font-bold uppercase text-[#c5a059] tracking-wider">
                  Alignment Bleed
                </span>
              </div>
              <div className="mt-2.5">
                <div className="text-xs sm:text-sm font-bold text-white">
                  Meetings aren't strategy.
                </div>
                <div className="text-xs text-[#a6a9b2] mt-1 leading-relaxed italic">
                  61% of executive hours are consumed by internal alignment politics rather than decisive market execution.
                </div>
              </div>
            </div>
            <div className="mt-3 pt-2.5 border-t border-[#23252b] flex items-center justify-between text-[10px] text-[#8e929b]">
              <span className="font-medium text-[#c5a059]">Harvard Business Review</span>
              <span className="text-[#686b74]">C-Suite Time Study</span>
            </div>
            <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#d4af37] opacity-70 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Box 3: 82% Succession Vulnerability (PwC Directors Survey) */}
          <div className="p-4 sm:p-5 rounded-lg bg-[#141416] border border-[#2b2d33] hover:border-[#d4af37] shadow-lg hover:shadow-[#c5a059]/15 transition-all duration-300 relative group flex flex-col justify-between fluid-card-lift">
            <div>
              <div className="flex items-baseline justify-between">
                <div className="text-2xl sm:text-3xl lg:text-3xl font-bold text-[#d4af37] tabular-nums">
                  82%
                </div>
                <span className="text-[10px] font-bold uppercase text-[#c5a059] tracking-wider">
                  Succession Risk
                </span>
              </div>
              <div className="mt-2.5">
                <div className="text-xs sm:text-sm font-bold text-white">
                  People don't leave hard work.
                </div>
                <div className="text-xs text-[#a6a9b2] mt-1 leading-relaxed italic">
                  82% of enterprise boards identify uncodified succession benches as their primary unhedged governance risk.
                </div>
              </div>
            </div>
            <div className="mt-3 pt-2.5 border-t border-[#23252b] flex items-center justify-between text-[10px] text-[#8e929b]">
              <span className="font-medium text-[#c5a059]">PwC Directors Survey</span>
              <span className="text-[#686b74]">Boardroom Benchmark</span>
            </div>
            <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#d4af37] opacity-70 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Box 4: < 14 Days Audit Velocity (Patent-Pending L.O.S. Diagnostic) */}
          <div className="p-4 sm:p-5 rounded-lg bg-[#141416] border border-[#d4af37] shadow-lg hover:shadow-[#c5a059]/25 transition-all duration-300 relative group flex flex-col justify-between fluid-card-lift">
            <div>
              <div className="flex items-baseline justify-between">
                <div className="text-2xl sm:text-3xl lg:text-3xl font-bold text-gold-gradient tabular-nums">
                  &lt; 14 Days
                </div>
                <span className="text-[10px] font-bold uppercase text-[#d4af37] tracking-wider">
                  Friction Audit
                </span>
              </div>
              <div className="mt-2.5">
                <div className="text-xs sm:text-sm font-bold text-white">
                  You already know where it hurts.
                </div>
                <div className="text-xs text-[#a6a9b2] mt-1 leading-relaxed italic">
                  Our patent-pending audit isolates structural friction vectors and restores executive decision autonomy within 14 days.
                </div>
              </div>
            </div>
            <div className="mt-3 pt-2.5 border-t border-[#23252b] flex items-center justify-between text-[10px] text-[#8e929b]">
              <span className="font-medium text-[#d4af37]">Patent-Pending L.O.S.™</span>
              <span className="text-[#686b74]">Empirical Protocol</span>
            </div>
            <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#d4af37] animate-gold-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};
