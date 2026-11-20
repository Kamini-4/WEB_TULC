import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

interface HeroProps {
  onLaunchDiagnostic: () => void;
  onExplorePartnerships: () => void;
}

export const HeroSection: React.FC<HeroProps> = ({
  onLaunchDiagnostic,
  onExplorePartnerships,
}) => {
  return (
    <section
      id="top"
      className="relative pt-8 pb-8 sm:pt-10 sm:pb-12 border-b border-[#e5decfe0] bg-[#f8f6f0] overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Immediate Point — Authoritative Frontpage Manifesto */}
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-[2.15rem] italic font-bold text-[#17181c] leading-[1.2] tracking-tight font-serif [text-wrap:balance]">
            Management is about compliance.{' '}
            <span className="text-[#9d7b38] block sm:inline">Leadership is about courage.</span>
          </h1>

          <div className="space-y-3 max-w-3xl mx-auto">
            <p className="text-base sm:text-lg text-[#2b2e36] font-normal leading-relaxed">
              When organizations stall, it is rarely a strategy problem. It is almost always an{' '}
              <strong className="font-bold text-[#9d7b38]">architecture problem.</strong>{' '}
              Consensus diffuses authority across endless decks. Decisive mandate demands{' '}
              <strong className="font-bold text-[#9d7b38]">sovereign clarity.</strong>
            </p>

            <p className="text-sm sm:text-base text-[#3f424a] font-normal leading-relaxed max-w-2xl mx-auto">
              We re-architect the operating system in{' '}
              <strong className="font-bold text-[#9d7b38]">90 days</strong> so leadership operates
              with <strong className="font-bold text-[#9d7b38]">total velocity</strong> — without
              endless consensus committees, bureaucratic approval bottlenecks, and key-person
              operational drag.
            </p>
          </div>

          {/* Primary & Secondary Action */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={onLaunchDiagnostic}
              className="px-6 sm:px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-[#f8f6f0] bg-[#17181c] hover:bg-[#282a30] border border-[#d4af37]/50 transition-all rounded-sm flex items-center justify-center gap-2 shadow-md active:scale-[0.98] min-h-[48px] w-full sm:w-auto cursor-pointer whitespace-nowrap"
            >
              <span>Take the 60-Sec Assessment</span>
              <ArrowRight className="w-4 h-4 text-[#d4af37]" />
            </button>

            <button
              type="button"
              onClick={onExplorePartnerships}
              className="px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#17181c] bg-white hover:bg-[#faf7f0] border border-[#9d7b38]/60 hover:border-[#9d7b38] transition-all rounded-sm text-center min-h-[48px] flex items-center justify-center cursor-pointer w-full sm:w-auto whitespace-nowrap"
            >
              <span>See Services & Fractional COO</span>
            </button>
          </div>

          <div className="pt-1 flex items-center justify-center gap-2 text-xs text-[#6e727c]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#9d7b38] shrink-0" />
            <span>
              Fractional COO &amp; Operating Architecture by{' '}
              <strong className="text-[#9d7b38] font-bold">Suchita Sancheti</strong> · Confidential &amp; Non-Advisory
            </span>
          </div>
        </div>

        {/* 3 Concrete Numbers — Immediately Explain the Stakes */}
        <div className="mt-8 pt-6 border-t border-[#e5decfe0] grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          <div className="p-4 sm:p-5 rounded-md bg-[#141416] border border-[#d4af37]/30 text-white space-y-1.5">
            <div className="text-2xl sm:text-3xl font-black text-[#d4af37] tabular-nums">
              15–20 hrs/wk
            </div>
            <div className="text-sm font-bold text-[#f3e5ab]">
              Reclaimed From Daily Firefighting
            </div>
            <p className="text-xs text-[#a6a9b2] leading-relaxed">
              Stop answering routine team questions and start giving managers clear decision & spending boundaries.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-md bg-[#141416] border border-[#d4af37]/30 text-white space-y-1.5">
            <div className="text-2xl sm:text-3xl font-black text-[#d4af37] tabular-nums">
              72 Hours
            </div>
            <div className="text-sm font-bold text-[#f3e5ab]">
              Decision Velocity vs. 6-Week Committees
            </div>
            <p className="text-xs text-[#a6a9b2] leading-relaxed">
              Replace circular status meetings with single-owner 14-day execution sprints and clear accountability.
            </p>
          </div>

          <div className="p-4 sm:p-5 rounded-md bg-[#141416] border border-[#d4af37]/30 text-white space-y-1.5">
            <div className="text-2xl sm:text-3xl font-black text-[#d4af37] tabular-nums">
              90 Days
            </div>
            <div className="text-sm font-bold text-[#f3e5ab]">
              Complete System Install With Exit Date
            </div>
            <p className="text-xs text-[#a6a9b2] leading-relaxed">
              We build the operating playbook directly with your leadership bench and exit cleanly—no permanent dependency.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
