import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const Countdown: React.FC = () => {
  return (
    <div className="bg-[#ece6d9] text-[#292524] py-2 sm:py-2.5 px-4 border-b border-[#ded6c5] relative z-[60] select-none font-serif">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs sm:text-[13px]">
        {/* The Two-Week Tension Test */}
        <div className="flex items-center gap-2 text-center sm:text-left">
          <span className="text-[#b8860b] font-bold tracking-tight uppercase text-[11px]">The Two-Week Test:</span>
          <span className="text-[#292524] tracking-tight">
            If you turned your phone off tomorrow, would your company <strong className="font-bold text-[#1c1917]">grow</strong>—or would <em className="italic font-semibold text-[#8c6708]">decisions freeze</em>?
          </span>
        </div>
        
        {/* Artisan Promise & Link */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-[#78716c] text-[11px] hidden md:inline tracking-tight">
            <strong className="font-bold text-[#1c1917]">Artisan Boundary:</strong> <em className="italic text-[#b8860b] font-semibold">3 founders</em> per quarter
          </span>
          <Link 
            to="/assessment"
            className="inline-flex items-center gap-1 text-[#b8860b] hover:text-[#1c1917] font-bold text-[11px] uppercase tracking-tight transition-colors"
          >
            <span>Take The Diagnostic</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
