import React, { useState } from 'react';
import { Menu, X, Zap, ArrowRight, Phone, Mail, Lock } from 'lucide-react';
import { LinkedinIcon, InstagramIcon } from './SocialIcons';

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
      
      {/* Top Sovereign Utility Ribbon: Direct Telephone, Email, and Verified Social Channels */}
      <div className="bg-[#141416] text-[#c7cad1] text-[11px] font-mono py-1.5 px-4 sm:px-6 lg:px-8 border-b border-[#23252b]">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-5 flex-wrap">
            <a 
              href="tel:+919325346704" 
              className="flex items-center gap-1.5 text-[#e5decfe0] hover:text-[#d4af37] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#d4af37]" />
              <span className="font-bold">+91 9325346704</span>
            </a>
            <span className="hidden sm:inline text-[#44464f]">|</span>
            <a 
              href="mailto:suchita@theunboundedleadership.com" 
              className="hidden sm:flex items-center gap-1.5 text-[#e5decfe0] hover:text-[#d4af37] transition-colors"
            >
              <Mail className="w-3 h-3 text-[#d4af37]" />
              <span>suchita@theunboundedleadership.com</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden md:inline text-[10px] uppercase text-[#8e929b] tracking-wider">
              Executive Presence:
            </span>
            <a 
              href="https://www.linkedin.com/in/suchita-sancheti" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Suchita Sancheti LinkedIn Profile"
              className="text-[#c7cad1] hover:text-[#d4af37] transition-colors flex items-center gap-1"
            >
              <LinkedinIcon className="w-3 h-3 text-[#0077b5]" />
              <span className="text-[10px] hidden sm:inline">LinkedIn</span>
            </a>
            <a 
              href="https://www.instagram.com/transformingleadership" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="The Unbounded Leadership Co. Instagram Profile"
              className="text-[#c7cad1] hover:text-[#d4af37] transition-colors flex items-center gap-1"
            >
              <InstagramIcon className="w-3 h-3 text-[#e4405f]" />
              <span className="text-[10px] hidden sm:inline">@transformingleadership</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-20 sm:h-22 md:h-24 flex items-center justify-between gap-4">
        
        {/* Brand Zone — Prestigious Crest & 3-Line Authority Hierarchy */}
        <a 
          href="#top" 
          onClick={(e) => { e.preventDefault(); handleNavClick('top'); }}
          className="flex items-center gap-3 sm:gap-4 text-base sm:text-lg font-bold text-[#17181c] hover:text-[#9d7b38] transition-colors tracking-tight shrink-0 group py-1"
        >
          <img 
            src="/assets/tulc-gold-navy-crest.jpg" 
            alt="The Unbounded Leadership Co. Crest & Insignia" 
            className="h-12 sm:h-14 md:h-16 w-auto max-w-[140px] sm:max-w-[200px] rounded-sm object-contain border-2 border-[#9d7b38]/70 shadow-sm group-hover:border-[#9d7b38] transition-all bg-[#0a1122] p-0.5 shrink-0"
            style={{ imageRendering: '-webkit-optimize-contrast' }}
            width="180"
            height="120"
          />
          <div className="flex flex-col text-left">
            <span className="font-serif font-bold tracking-tight text-sm sm:text-base md:text-lg text-[#17181c] leading-tight group-hover:text-[#9d7b38] transition-colors">
              The Unbounded Leadership Co.
            </span>
            <span className="text-[9.5px] sm:text-[10.5px] font-mono tracking-wider text-[#685327] uppercase font-medium mt-0.5">
              By Suchita Sancheti
            </span>
            <span className="text-[8.5px] sm:text-[9.5px] font-mono tracking-widest text-[#9d7b38] uppercase font-bold mt-0.5">
              Sovereign Enterprise Architecture
            </span>
          </div>
        </a>

        {/* Desktop Nav Zone — Key Pages clearly identified */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-5 lg:gap-7 xl:gap-8 text-[14px] lg:text-[15px] font-semibold text-[#484b54]">
          <a
            href="#about"
            onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}
            className={`transition-colors whitespace-nowrap py-1 border-b-2 ${
              currentView === 'about'
                ? 'text-[#17181c] border-[#9d7b38] font-bold'
                : 'text-[#484b54] hover:text-[#17181c] border-transparent hover:border-[#9d7b38]'
            }`}
          >
            About
          </a>
          <a
            href="#services"
            onClick={(e) => { e.preventDefault(); handleNavClick('partnerships'); }}
            className={`transition-colors whitespace-nowrap py-1 border-b-2 ${
              currentView === 'partnerships'
                ? 'text-[#17181c] border-[#9d7b38] font-bold'
                : 'text-[#484b54] hover:text-[#17181c] border-transparent hover:border-[#9d7b38]'
            }`}
          >
            Services
          </a>
          <a
            href="#diagnostic"
            onClick={(e) => { e.preventDefault(); handleNavClick('diagnostic'); }}
            className={`transition-colors whitespace-nowrap py-1 border-b-2 ${
              currentView === 'diagnostic'
                ? 'text-[#17181c] border-[#9d7b38] font-bold'
                : 'text-[#484b54] hover:text-[#17181c] border-transparent hover:border-[#9d7b38]'
            }`}
          >
            The Diagnostic
          </a>
          <a
            href="#codex"
            onClick={(e) => { e.preventDefault(); handleNavClick('shop'); }}
            className={`transition-colors whitespace-nowrap py-1 border-b-2 ${
              currentView === 'shop'
                ? 'text-[#17181c] border-[#9d7b38] font-bold'
                : 'text-[#484b54] hover:text-[#17181c] border-transparent hover:border-[#9d7b38]'
            }`}
          >
            The Codex
          </a>
          <a
            href="#library"
            onClick={(e) => { e.preventDefault(); handleNavClick('library'); }}
            className={`transition-colors whitespace-nowrap py-1 border-b-2 ${
              currentView === 'library'
                ? 'text-[#17181c] border-[#9d7b38] font-bold'
                : 'text-[#484b54] hover:text-[#17181c] border-transparent hover:border-[#9d7b38]'
            }`}
          >
            Dispatches
          </a>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}
            className={`transition-colors whitespace-nowrap py-1 border-b-2 ${
              currentView === 'contact'
                ? 'text-[#9d7b38] border-[#9d7b38] font-bold'
                : 'text-[#9d7b38] hover:text-[#7d5f24] border-transparent hover:border-[#9d7b38]'
            }`}
          >
            Contact
          </a>
        </nav>

        {/* Action Zone — Free 60-Sec Audit CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavClick('test')}
            className="px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-[13px] font-bold uppercase text-[#f8f6f0] bg-[#17181c] hover:bg-[#282a30] transition-all rounded-sm shadow-xs whitespace-nowrap active:scale-[0.98] min-h-[40px] flex items-center gap-2 cursor-pointer border border-[#9d7b38]/40"
          >
            <Zap className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Free 60-Sec Test</span>
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
          
          {/* Quick Direct Mobile Contact */}
          <div className="p-3 rounded bg-[#f3ede1] border border-[#d8cebe] flex items-center justify-between text-xs">
            <a href="tel:+919325346704" className="flex items-center gap-1.5 font-bold text-[#17181c]">
              <Phone className="w-3.5 h-3.5 text-[#9d7b38]" />
              <span>+91 9325346704</span>
            </a>
            <div className="flex items-center gap-2.5">
              <a href="https://www.linkedin.com/in/suchita-sancheti" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedinIcon className="w-4 h-4 text-[#0077b5]" />
              </a>
              <a href="https://www.instagram.com/transformingleadership" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <InstagramIcon className="w-4 h-4 text-[#e4405f]" />
              </a>
            </div>
          </div>

          <nav className="flex flex-col space-y-2 text-sm font-semibold text-[#17181c]">
            <a
              href="#about"
              onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}
              className="py-2.5 px-3 rounded hover:bg-[#ede5d6] flex items-center justify-between font-bold"
            >
              <span>About (Vision, Mission & Founder)</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#9d7b38]" />
            </a>
            <a
              href="#services"
              onClick={(e) => { e.preventDefault(); handleNavClick('partnerships'); }}
              className="py-2.5 px-3 rounded hover:bg-[#ede5d6] flex items-center justify-between"
            >
              <span>Services (3 Sovereign Tracks & Conclave)</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#9d7b38]" />
            </a>
            <a
              href="#diagnostic"
              onClick={(e) => { e.preventDefault(); handleNavClick('diagnostic'); }}
              className="py-2.5 px-3 rounded hover:bg-[#ede5d6] flex items-center justify-between"
            >
              <span>The Diagnostic (Sovereign Dossier™)</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#9d7b38]" />
            </a>
            <a
              href="#codex"
              onClick={(e) => { e.preventDefault(); handleNavClick('shop'); }}
              className="py-2.5 px-3 rounded hover:bg-[#ede5d6] flex items-center justify-between font-bold text-[#17181c]"
            >
              <div className="flex items-center gap-2">
                <span>The Codex (3 Sovereign Blueprints)</span>
                <span className="text-[9px] font-mono font-bold bg-[#17181c] text-[#d4af37] px-1.5 py-0.5 rounded-xs">
                  50% OFF
                </span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#9d7b38]" />
            </a>
            <a
              href="#test"
              onClick={(e) => { e.preventDefault(); handleNavClick('test'); }}
              className="py-2.5 px-3 rounded hover:bg-[#ede5d6] flex items-center justify-between"
            >
              <div className="flex items-center gap-2">
                <span>Free 60-Sec Test (Self-Audit)</span>
                <span className="text-[9px] font-mono font-bold bg-[#d4af37]/20 text-[#8c6708] border border-[#d4af37]/50 px-1.5 py-0.5 rounded-xs">
                  FREE
                </span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-[#9d7b38]" />
            </a>
            <a
              href="#library"
              onClick={(e) => { e.preventDefault(); handleNavClick('library'); }}
              className="py-2.5 px-3 rounded hover:bg-[#ede5d6] flex items-center justify-between"
            >
              <span>Dispatches & Strategic Intelligence</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#9d7b38]" />
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('contact'); }}
              className="py-2.5 px-3 rounded hover:bg-[#ede5d6] text-[#9d7b38] flex items-center justify-between font-bold"
            >
              <span>Contact & Advisory Desk</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#9d7b38]" />
            </a>
            <a
              href="#privacy"
              onClick={(e) => { e.preventDefault(); handleNavClick('privacy'); }}
              className="py-2 px-3 rounded hover:bg-[#ede5d6] text-[#6b6e76] text-xs flex items-center justify-between"
            >
              <span>Privacy Policy & Data Covenant</span>
              <ArrowRight className="w-3 h-3 text-[#9d7b38]" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
