import React from 'react';
import { Crown, BookOpen, Zap, Target, Eye, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#ede7da] border-t border-[#dfd7c8] py-8 sm:py-10 text-[#6b6e76] text-xs">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header & Brand Statement */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 mb-6 border-b border-[#dfd7c8] gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <img 
              src="/assets/aistudio/WhatsApp_Image_2026-01-09_at_13.01.23_3b22d7ab.jpeg" 
              alt="The Unbounded Leadership Co. Crest" 
              className="h-11 sm:h-12 w-auto rounded-xs object-cover border border-[#9d7b38]/40 shadow-xs shrink-0"
            />
            <div>
              <div className="text-lg font-bold text-[#141416] tracking-tight">
                The Unbounded Leadership Co.
              </div>
              <p className="text-[#9d7b38] font-mono text-[11px] font-bold tracking-wider uppercase">
                Elevating Cultures, Transforming Leadership
              </p>
              <p className="text-[#6b6e76] text-xs mt-0.5 max-w-md font-normal leading-relaxed italic">
                Engineering executive governance cadences and sovereign systems architecture for enterprise founders and institutional boards.
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-3.5 sm:gap-5 font-semibold text-[#4a4c52]">
            <a
              href="#top"
              onClick={(e) => { e.preventDefault(); onNavigate('top'); }}
              className="hover:text-[#141416] transition-colors py-1"
            >
              Overview
            </a>
            <a
              href="#simple-test"
              onClick={(e) => { e.preventDefault(); onNavigate('simple-test'); }}
              className="hover:text-[#9d7b38] transition-colors py-1 flex items-center gap-1 font-bold text-[#141416]"
            >
              <Zap className="w-3.5 h-3.5 text-[#9d7b38]" />
              <span>The 60-Sec Test</span>
            </a>
            <a
              href="#briefing"
              onClick={(e) => { e.preventDefault(); onNavigate('briefing'); }}
              className="hover:text-[#141416] transition-colors py-1"
            >
              Video Briefing
            </a>
            <a
              href="#about"
              onClick={(e) => { e.preventDefault(); onNavigate('about'); }}
              className="hover:text-[#141416] transition-colors py-1 font-bold text-[#141416]"
            >
              Vision & Mission
            </a>
            <a
              href="#partnerships"
              onClick={(e) => { e.preventDefault(); onNavigate('partnerships'); }}
              className="hover:text-[#141416] transition-colors py-1"
            >
              How We Partner
            </a>
            <a
              href="#council-chambers"
              onClick={(e) => { e.preventDefault(); onNavigate('council-chambers'); }}
              className="hover:text-[#9d7b38] transition-colors flex items-center gap-1 py-1"
            >
              <Crown className="w-3.5 h-3.5 text-[#9d7b38]" />
              <span>Council Chambers</span>
            </a>
            <a
              href="#blogs"
              onClick={(e) => { e.preventDefault(); onNavigate('blogs'); }}
              className="hover:text-[#141416] transition-colors flex items-center gap-1 py-1"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#9d7b38]" />
              <span>Blogs & Dispatches</span>
            </a>
            <a
              href="#diagnostic"
              onClick={(e) => { e.preventDefault(); onNavigate('diagnostic'); }}
              className="hover:text-[#141416] transition-colors py-1"
            >
              The Diagnostic
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}
              className="text-[#9d7b38] hover:text-[#7d5f24] font-bold transition-colors py-1"
            >
              Confidential Inquiry
            </a>
          </nav>
        </div>

        {/* RESTORED VISION & MISSION IN FOOTER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-6 mb-6 border-b border-[#dfd7c8]">
          
          {/* Mission */}
          <div className="p-4 rounded-md bg-[#f6f2e9] border border-[#dcd3c2] space-y-1.5 shadow-2xs">
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-[#9d7b38] font-bold">
              <Target className="w-3.5 h-3.5 text-[#9d7b38]" />
              <span>Our Mission</span>
            </div>
            <h4 className="text-sm font-bold text-[#17181c]">
              To Decouple Founders & Accelerate Enterprise Multiples in 90 Days.
            </h4>
            <p className="text-[12px] text-[#555861] leading-relaxed">
              We install invariant decision architecture inside scaling enterprises—fusing executive conviction with codified boundary covenants—so founders reclaim 15+ hours weekly, eliminate late-night escalations, and lead companies that compound without daily operational friction.
            </p>
          </div>

          {/* Vision */}
          <div className="p-4 rounded-md bg-[#f6f2e9] border border-[#dcd3c2] space-y-1.5 shadow-2xs">
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-[#9d7b38] font-bold">
              <Eye className="w-3.5 h-3.5 text-[#9d7b38]" />
              <span>Our Vision</span>
            </div>
            <h4 className="text-sm font-bold text-[#17181c]">
              An Era of Enduring, Self-Governing Sovereign Institutions.
            </h4>
            <p className="text-[12px] text-[#555861] leading-relaxed">
              We envision a corporate ecosystem where enterprises are not constrained by single-person bottlenecks, but operate as resilient sovereign assets where leadership wisdom governs autonomously across market shifts, M&A integrations, and generational succession.
            </p>
          </div>

        </div>

        {/* Bottom Legal & Security Ledger */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-[#7d8089] text-[11px]">
          <div>
            © {new Date().getFullYear()} The Unbounded Leadership Co. All institutional rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <span>Patent Pending Architecture: L.O.S.-P721</span>
            <span aria-hidden="true" className="text-[#c9bea9]">·</span>
            <span>Executive Mastery + Sovereign Systems Architecture</span>
            <span aria-hidden="true" className="text-[#c9bea9]">·</span>
            <span>Advisory Privilege Enforced</span>
            <span aria-hidden="true" className="text-[#c9bea9]">·</span>
            <span>suchita@theunboundedleadership.com</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
