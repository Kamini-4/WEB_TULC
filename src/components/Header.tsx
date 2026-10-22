import React, { useState } from 'react';
import { Menu, X, Zap, ArrowRight } from 'lucide-react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  onLaunchDiagnostic: () => void;
  currentView?: string;
}

export const Header: React.FC<HeaderProps> = ({ 
  onNavigate, 
  onLaunchDiagnostic,
  currentView = 'home'
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (target: string) => {
    onNavigate(target);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#f8f6f0]/95 backdrop-blur-md border-b border-[#e5decfe0] transition-colors">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-4">
        
        {/* Brand Zone — Prestigious Crest & Clean Typography */}
        <a 
          href="#top" 
          onClick={(e) => { e.preventDefault(); handleNavClick('top'); }}
          className="flex items-center gap-2.5 sm:gap-3 text-base sm:text-lg font-bold text-[#17181c] hover:text-[#9d7b38] transition-colors tracking-tight truncate shrink-0 group"
        >
          <img 
            src="/assets/aistudio/WhatsApp_Image_2026-01-09_at_13.01.23_3b22d7ab.jpeg" 
            alt="The Unbounded Leadership Co. Crest" 
            className="h-8 sm:h-9 w-auto rounded-xs object-cover border border-[#9d7b38]/40 shadow-xs group-hover:border-[#9d7b38] transition-all"
          />
          <div className="flex flex-col text-left">
            <span className="font-bold tracking-tight text-sm sm:text-base leading-tight">The Unbounded Leadership Co.</span>
            <span className="text-[10px] font-mono tracking-widest text-[#9d7b38] uppercase hidden sm:inline-block">Elevating Cultures, Transforming Leadership</span>
          </div>
        </a>

        {/* Desktop Nav Zone — Clutter-Free: Only What's Necessary */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-[#4e5159]">
          <a
            href="#test"
            onClick={(e) => { e.preventDefault(); handleNavClick('test'); }}
            className={`transition-colors whitespace-nowrap py-1 border-b-2 ${
              currentView === 'test'
                ? 'text-[#17181c] border-[#9d7b38] font-bold'
                : 'text-[#4e5159] hover:text-[#17181c] border-transparent hover:border-[#9d7b38]'
            }`}
          >
            The Test
          </a>
          <a
            href="#domains"
            onClick={(e) => { e.preventDefault(); handleNavClick('domains'); }}
            className={`transition-colors whitespace-nowrap py-1 border-b-2 ${
              currentView === 'domains'
                ? 'text-[#17181c] border-[#9d7b38] font-bold'
                : 'text-[#4e5159] hover:text-[#17181c] border-transparent hover:border-[#9d7b38]'
            }`}
          >
            5 Domains
          </a>
          <a
            href="#partnerships"
            onClick={(e) => { e.preventDefault(); handleNavClick('partnerships'); }}
            className={`transition-colors whitespace-nowrap py-1 border-b-2 ${
              currentView === 'partnerships'
                ? 'text-[#17181c] border-[#9d7b38] font-bold'
                : 'text-[#4e5159] hover:text-[#17181c] border-transparent hover:border-[#9d7b38]'
            }`}
          >
            Partnerships
          </a>
          <a
            href="#library"
            onClick={(e) => { e.preventDefault(); handleNavClick('library'); }}
            className={`transition-colors whitespace-nowrap py-1 border-b-2 ${
              currentView === 'library'
                ? 'text-[#17181c] border-[#9d7b38] font-bold'
                : 'text-[#4e5159] hover:text-[#17181c] border-transparent hover:border-[#9d7b38]'
            }`}
          >
            Dispatches
          </a>
          <a
            href="#about"
            onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}
            className={`transition-colors whitespace-nowrap py-1 border-b-2 ${
              currentView === 'about'
                ? 'text-[#17181c] border-[#9d7b38] font-bold'
                : 'text-[#4e5159] hover:text-[#17181c] border-transparent hover:border-[#9d7b38]'
            }`}
          >
            About
          </a>
        </nav>

        {/* Action Zone — Single clean CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavClick('test')}
            className="px-4 py-2 text-xs font-bold uppercase text-[#f8f6f0] bg-[#17181c] hover:bg-[#282a30] transition-all rounded-sm shadow-xs whitespace-nowrap active:scale-[0.98] min-h-[38px] flex items-center gap-1.5 cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Take Free Test</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
            className="md:hidden p-2 rounded text-[#17181c] hover:bg-[#ede5d6] transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#f8f6f0] border-b border-[#e5decfe0] px-4 pt-2 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-2 text-sm font-semibold text-[#17181c]">
            <a
              href="#test"
              onClick={(e) => { e.preventDefault(); handleNavClick('test'); }}
              className="py-2 px-3 rounded hover:bg-[#ede5d6] flex items-center justify-between"
            >
              <span>The Test (60-Sec Free Audit)</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#9d7b38]" />
            </a>
            <a
              href="#domains"
              onClick={(e) => { e.preventDefault(); handleNavClick('domains'); }}
              className="py-2 px-3 rounded hover:bg-[#ede5d6] flex items-center justify-between"
            >
              <span>5 Domains Architecture</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#9d7b38]" />
            </a>
            <a
              href="#partnerships"
              onClick={(e) => { e.preventDefault(); handleNavClick('partnerships'); }}
              className="py-2 px-3 rounded hover:bg-[#ede5d6] flex items-center justify-between"
            >
              <span>How We Partner (3 Categories)</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#9d7b38]" />
            </a>
            <a
              href="#council"
              onClick={(e) => { e.preventDefault(); handleNavClick('council'); }}
              className="py-2 px-3 rounded hover:bg-[#ede5d6] flex items-center justify-between"
            >
              <span>Council Chambers</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#9d7b38]" />
            </a>
            <a
              href="#diagnostic"
              onClick={(e) => { e.preventDefault(); handleNavClick('diagnostic'); }}
              className="py-2 px-3 rounded hover:bg-[#ede5d6] flex items-center justify-between"
            >
              <span>In-Depth L.O.S. Diagnostic™</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#9d7b38]" />
            </a>
            <a
              href="#library"
              onClick={(e) => { e.preventDefault(); handleNavClick('library'); }}
              className="py-2 px-3 rounded hover:bg-[#ede5d6] flex items-center justify-between"
            >
              <span>Dispatches & Blogs</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#9d7b38]" />
            </a>
            <a
              href="#about"
              onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}
              className="py-2 px-3 rounded hover:bg-[#ede5d6] flex items-center justify-between"
            >
              <span>About (Vision & Mission)</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#9d7b38]" />
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}
              className="py-2 px-3 rounded hover:bg-[#ede5d6] text-[#9d7b38] flex items-center justify-between font-bold"
            >
              <span>Confidential Inquiry</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#9d7b38]" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
