import React, { useState } from 'react';
import { Menu, X, Crown, Zap, BookOpen } from 'lucide-react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  onLaunchDiagnostic: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, onLaunchDiagnostic }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigate(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#f8f6f0]/95 backdrop-blur-md border-b border-[#e5decfe0]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-4">
        
        {/* Brand Zone */}
        <a 
          href="#top" 
          onClick={(e) => { e.preventDefault(); handleNavClick('top'); }}
          className="text-base sm:text-lg font-bold text-[#17181c] hover:text-[#9d7b38] transition-colors truncate shrink-0 max-w-[210px] sm:max-w-none"
        >
          The Unbounded Leadership Co.
        </a>

        {/* Desktop Nav Zone */}
        <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-[#4e5159]">
          <a
            href="#simple-test"
            onClick={(e) => { e.preventDefault(); handleNavClick('simple-test'); }}
            className="hover:text-[#17181c] transition-colors whitespace-nowrap py-1 border-b border-transparent hover:border-[#9d7b38] flex items-center gap-1 font-semibold text-[#17181c]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#9d7b38]" />
            <span>Free 5-Domain Audit</span>
          </a>
          <a
            href="#partnerships"
            onClick={(e) => { e.preventDefault(); handleNavClick('partnerships'); }}
            className="hover:text-[#17181c] transition-colors whitespace-nowrap py-1 border-b border-transparent hover:border-[#17181c]"
          >
            How We Partner
          </a>
          <a
            href="#diagnostic"
            onClick={(e) => { e.preventDefault(); handleNavClick('diagnostic'); }}
            className="hover:text-[#17181c] transition-colors whitespace-nowrap py-1 border-b border-transparent hover:border-[#17181c] flex items-center gap-1.5"
          >
            <span>In-Depth Diagnostic</span>
            <span className="text-[9px] text-[#8f6d28] font-bold bg-[#eae2d3] px-1.5 py-0.5 rounded">PAT.PEND</span>
          </a>
          <a
            href="#council-chambers"
            onClick={(e) => { e.preventDefault(); handleNavClick('council-chambers'); }}
            className="hover:text-[#9d7b38] transition-colors whitespace-nowrap py-1 border-b border-transparent hover:border-[#9d7b38] flex items-center gap-1 font-semibold"
          >
            <Crown className="w-3.5 h-3.5 text-[#9d7b38]" />
            <span>Council Chambers</span>
          </a>
          <a
            href="#blogs"
            onClick={(e) => { e.preventDefault(); handleNavClick('blogs'); }}
            className="hover:text-[#17181c] transition-colors whitespace-nowrap py-1 border-b border-transparent hover:border-[#17181c] flex items-center gap-1"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#9d7b38]" />
            <span>Dispatches & Blogs</span>
          </a>
          <a
            href="#briefing"
            onClick={(e) => { e.preventDefault(); handleNavClick('briefing'); }}
            className="hover:text-[#17181c] transition-colors whitespace-nowrap py-1 border-b border-transparent hover:border-[#17181c]"
          >
            Video Briefing
          </a>
          <a
            href="#about"
            onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}
            className="hover:text-[#17181c] transition-colors whitespace-nowrap py-1 border-b border-transparent hover:border-[#17181c]"
          >
            Vision & Philosophy
          </a>
          <a
            href="#war-room"
            onClick={(e) => { e.preventDefault(); handleNavClick('war-room'); }}
            className="hover:text-[#17181c] transition-colors whitespace-nowrap py-1 border-b border-transparent hover:border-[#17181c]"
          >
            War Room
          </a>
          <a
            href="#proof"
            onClick={(e) => { e.preventDefault(); handleNavClick('proof'); }}
            className="hover:text-[#17181c] transition-colors whitespace-nowrap py-1 border-b border-transparent hover:border-[#17181c]"
          >
            Case Proof
          </a>
        </nav>

        {/* Action Zone */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => { onLaunchDiagnostic(); setMobileMenuOpen(false); }}
            className="hidden sm:inline-flex px-4 py-2 text-xs font-bold uppercase text-[#f8f6f0] bg-[#17181c] hover:bg-[#282a30] transition-all rounded-sm shadow-xs whitespace-nowrap active:scale-[0.98] min-h-[40px] items-center gap-1.5"
          >
            <Zap className="w-3 h-3 text-[#d4af37]" />
            <span>Take Test</span>
          </button>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="lg:hidden p-2 rounded text-[#17181c] hover:bg-[#ede5d6] transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Fluid Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#f8f6f0] border-b border-[#e5decfe0] px-4 py-4 space-y-2.5 shadow-lg">
          <nav className="flex flex-col space-y-1 text-sm font-semibold text-[#17181c]">
            <a
              href="#simple-test"
              onClick={(e) => { e.preventDefault(); handleNavClick('simple-test'); }}
              className="py-2.5 px-2 rounded hover:bg-[#ede5d6] border-b border-[#e8e2d5]/60 min-h-[44px] flex items-center justify-between text-[#9d7b38]"
            >
              <span>The 60-Sec Founder Test</span>
              <span className="text-[10px] bg-[#ede5d6] text-[#17181c] px-2 py-0.5 rounded font-mono font-bold">START HERE</span>
            </a>
            <a
              href="#partnerships"
              onClick={(e) => { e.preventDefault(); handleNavClick('partnerships'); }}
              className="py-2.5 px-2 rounded hover:bg-[#ede5d6] border-b border-[#e8e2d5]/60 min-h-[44px] flex items-center"
            >
              How We Partner (3 Categories)
            </a>
            <a
              href="#diagnostic"
              onClick={(e) => { e.preventDefault(); handleNavClick('diagnostic'); }}
              className="py-2.5 px-2 rounded hover:bg-[#ede5d6] border-b border-[#e8e2d5]/60 flex items-center justify-between min-h-[44px]"
            >
              <span>The Diagnostic</span>
              <span className="text-[9px] text-[#8f6d28] bg-[#eae2d3] px-1.5 py-0.5 rounded font-bold">PAT.PEND</span>
            </a>
            <a
              href="#blogs"
              onClick={(e) => { e.preventDefault(); handleNavClick('blogs'); }}
              className="py-2.5 px-2 rounded hover:bg-[#ede5d6] border-b border-[#e8e2d5]/60 min-h-[44px] flex items-center justify-between"
            >
              <span>Dispatches & Blogs</span>
              <BookOpen className="w-4 h-4 text-[#9d7b38]" />
            </a>
            <a
              href="#council-chambers"
              onClick={(e) => { e.preventDefault(); handleNavClick('council-chambers'); }}
              className="py-2.5 px-2 rounded hover:bg-[#ede5d6] border-b border-[#e8e2d5]/60 text-[#9d7b38] flex items-center justify-between min-h-[44px]"
            >
              <span>Council Chambers</span>
              <Crown className="w-4 h-4 text-[#9d7b38]" />
            </a>
            <a
              href="#briefing"
              onClick={(e) => { e.preventDefault(); handleNavClick('briefing'); }}
              className="py-2.5 px-2 rounded hover:bg-[#ede5d6] border-b border-[#e8e2d5]/60 min-h-[44px] flex items-center"
            >
              Executive Video Briefing
            </a>
            <a
              href="#about"
              onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}
              className="py-2.5 px-2 rounded hover:bg-[#ede5d6] border-b border-[#e8e2d5]/60 min-h-[44px] flex items-center"
            >
              Vision & Philosophy (Humans + Architecture)
            </a>
            <a
              href="#war-room"
              onClick={(e) => { e.preventDefault(); handleNavClick('war-room'); }}
              className="py-2.5 px-2 rounded hover:bg-[#ede5d6] border-b border-[#e8e2d5]/60 min-h-[44px] flex items-center"
            >
              Executive War Room
            </a>
            <a
              href="#proof"
              onClick={(e) => { e.preventDefault(); handleNavClick('proof'); }}
              className="py-2.5 px-2 rounded hover:bg-[#ede5d6] border-b border-[#e8e2d5]/60 min-h-[44px] flex items-center"
            >
              Case Proof & Data
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}
              className="py-2.5 px-2 rounded bg-[#17181c] text-white min-h-[44px] flex items-center justify-center font-bold text-xs uppercase tracking-wider mt-2"
            >
              Request Confidential Briefing
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
