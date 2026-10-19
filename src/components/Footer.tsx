import React from 'react';
import { Crown } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#ede7da] border-t border-[#dfd7c8] py-8 sm:py-10 text-[#6b6e76] text-xs">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 mb-5 border-b border-[#dfd7c8] gap-4">
          
          <div>
            <div className="text-lg font-bold text-[#141416]">
              The Unbounded Leadership Co.
            </div>
            <p className="text-[#6b6e76] text-xs mt-1 max-w-md font-normal leading-relaxed italic">
              Re-architecting leadership operating systems, governance cadences, and decision conviction for enterprise CXOs and institutional boards.
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-4 sm:gap-6 font-semibold text-[#4a4c52]">
            <a
              href="#top"
              onClick={(e) => { e.preventDefault(); onNavigate('top'); }}
              className="hover:text-[#141416] transition-colors py-1"
            >
              Overview
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
              href="#diagnostic"
              onClick={(e) => { e.preventDefault(); onNavigate('diagnostic'); }}
              className="hover:text-[#141416] transition-colors py-1"
            >
              The Diagnostic (Pat. Pend)
            </a>
            <a
              href="#proof"
              onClick={(e) => { e.preventDefault(); onNavigate('proof'); }}
              className="hover:text-[#141416] transition-colors py-1"
            >
              Case Proof
            </a>
            <a
              href="#war-room"
              onClick={(e) => { e.preventDefault(); onNavigate('war-room'); }}
              className="hover:text-[#141416] transition-colors py-1"
            >
              War Room
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

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-[#7d8089] text-[11px]">
          <div>
            © {new Date().getFullYear()} The Unbounded Leadership Co. All institutional rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <span>Patent Pending Architecture: L.O.S.-P721</span>
            <span aria-hidden="true" className="text-[#c9bea9]">·</span>
            <span>Advisory Privilege Enforced</span>
            <span aria-hidden="true" className="text-[#c9bea9]">·</span>
            <span>concierge@theunboundedleadership.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
