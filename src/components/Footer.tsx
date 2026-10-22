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
          <div className="flex items-start sm:items-center gap-4">
            <img 
              src="/assets/aistudio/WhatsApp_Image_2026-01-09_at_13.01.23_3b22d7ab.jpeg" 
              alt="The Unbounded Leadership Co. Insignia & Crest" 
              className="h-16 sm:h-20 w-auto max-w-[160px] sm:max-w-[200px] rounded-sm object-contain border-2 border-[#9d7b38]/60 shadow-md shrink-0 bg-white/80 p-1"
              style={{ imageRendering: '-webkit-optimize-contrast' }}
            />
            <div>
              <div className="text-lg sm:text-xl font-bold text-[#141416] tracking-tight">
                The Unbounded Leadership Co.
              </div>
              <p className="text-[#9d7b38] font-mono text-[11px] font-bold tracking-wider uppercase">
                Founded by Suchita Sancheti · Elevating Cultures, Transforming Leadership
              </p>
              <p className="text-[#6b6e76] text-xs mt-0.5 max-w-md font-normal leading-relaxed italic">
                Engineering executive governance cadences and sovereign systems architecture for enterprise founders and institutional boards worldwide.
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
              href="#test"
              onClick={(e) => { e.preventDefault(); onNavigate('test'); }}
              className="hover:text-[#9d7b38] transition-colors py-1 flex items-center gap-1 font-bold text-[#141416]"
            >
              <Zap className="w-3.5 h-3.5 text-[#9d7b38]" />
              <span>The Test</span>
            </a>
            <a
              href="#services"
              onClick={(e) => { e.preventDefault(); onNavigate('partnerships'); }}
              className="hover:text-[#141416] transition-colors py-1 font-bold text-[#141416]"
            >
              Services
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
              href="#about"
              onClick={(e) => { e.preventDefault(); onNavigate('about'); }}
              className="hover:text-[#141416] transition-colors py-1"
            >
              Vision & Mission
            </a>
            <a
              href="#blogs"
              onClick={(e) => { e.preventDefault(); onNavigate('blogs'); }}
              className="hover:text-[#141416] transition-colors flex items-center gap-1 py-1"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#9d7b38]" />
              <span>Dispatches</span>
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

        {/* VERBATIM VISION & MISSION IN FOOTER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-6 mb-6 border-b border-[#dfd7c8]">
          
          {/* Vision */}
          <div className="p-5 rounded-md bg-[#f6f2e9] border border-[#dcd3c2] space-y-2 shadow-2xs">
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-[#9d7b38] font-bold">
              <Eye className="w-3.5 h-3.5 text-[#9d7b38]" />
              <span>Our Vision</span>
            </div>
            <p className="text-[13px] sm:text-sm text-[#26282e] font-serif leading-relaxed italic">
              “To align human ambition with enduring organizational architecture — so that power, scale, and perpetuity compound as one, and what the world's greatest founders build today commands the future long after they have conquered it.”
            </p>
          </div>

          {/* Mission */}
          <div className="p-5 rounded-md bg-[#f6f2e9] border border-[#dcd3c2] space-y-2 shadow-2xs">
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-[#9d7b38] font-bold">
              <Target className="w-3.5 h-3.5 text-[#9d7b38]" />
              <span>Our Mission</span>
            </div>
            <p className="text-[13px] sm:text-sm text-[#26282e] font-serif leading-relaxed italic">
              “We work with the world's most consequential founders to architect the structural conditions for absolute organizational sovereignty. Across five foundational domains of systemic alignment, we dismantle operational dependency, dissolve leadership entropy, and engineer the precise infrastructure that allows an empire to grow, scale, and compound — with or without its founder at the helm.”
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
