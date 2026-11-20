import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Zap,
  ArrowRight,
  Lock,
  CreditCard,
  Calendar,
  HelpCircle,
  BookOpen,
  FileText,
  User,
  Video,
  Shield,
} from 'lucide-react';
import { LinkedinIcon, InstagramIcon } from './SocialIcons';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  onLaunchDiagnostic: () => void;
  currentView?: string;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  onLaunchDiagnostic,
  currentView = 'home',
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (target: string) => {
    onNavigate(target);
    setMenuOpen(false);
  };

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const isAssessmentView =
    currentView === 'test' || currentView === 'diagnostic' || currentView === 'domains';

  return (
    <header className="sticky top-0 z-50 bg-[#f8f6f0]/95 backdrop-blur-md border-b border-[#e5decfe0] transition-colors">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-4">
        {/* Brand Zone — Single Clean Wordmark + Crest */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('top');
          }}
          className="flex items-center gap-2.5 sm:gap-3 text-base sm:text-lg font-bold text-[#17181c] hover:text-[#9d7b38] transition-colors tracking-tight shrink-0 group py-1"
        >
          <img
            src="/assets/tulc-gold-navy-crest.jpg"
            alt="The Unbounded Leadership Co."
            className="h-9 sm:h-10 w-auto rounded-sm object-contain border border-[#9d7b38]/70 bg-[#0a1122] p-0.5 shrink-0"
            width="120"
            height="80"
          />
          <span className="font-serif font-bold tracking-tight text-sm sm:text-base md:text-lg text-[#17181c] group-hover:text-[#9d7b38] transition-colors whitespace-nowrap">
            The Unbounded Leadership Co.
          </span>
        </a>

        {/* Essential Top Navigation Links (Desktop) */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-6 lg:gap-8 text-[14px] font-semibold text-[#484b54]"
        >
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('top');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              currentView === 'home'
                ? 'text-[#17181c] border-[#9d7b38] font-bold'
                : 'text-[#484b54] hover:text-[#17181c] border-transparent hover:border-[#9d7b38]'
            }`}
          >
            Overview
          </a>

          <a
            href="/assessment"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('test');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 flex items-center gap-1.5 ${
              isAssessmentView
                ? 'text-[#17181c] border-[#9d7b38] font-bold'
                : 'text-[#484b54] hover:text-[#17181c] border-transparent hover:border-[#9d7b38]'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-[#9d7b38] shrink-0" />
            <span>Assessment & Model</span>
          </a>

          <a
            href="/services"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('partnerships');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              currentView === 'partnerships'
                ? 'text-[#17181c] border-[#9d7b38] font-bold'
                : 'text-[#484b54] hover:text-[#17181c] border-transparent hover:border-[#9d7b38]'
            }`}
          >
            Services
          </a>

          <a
            href="/contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('contact');
            }}
            className={`transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
              currentView === 'contact'
                ? 'text-[#9d7b38] border-[#9d7b38] font-bold'
                : 'text-[#484b54] hover:text-[#17181c] border-transparent hover:border-[#9d7b38]'
            }`}
          >
            Contact
          </a>
        </nav>

        {/* Action Zone: Portal Button + Primary CTA + Unified Menu Button */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="/portal"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('portal');
            }}
            className={`inline-flex px-3 py-2 text-xs font-mono font-bold uppercase rounded-sm transition-colors whitespace-nowrap shrink-0 min-h-[38px] items-center gap-1.5 border ${
              currentView === 'portal'
                ? 'bg-[#141416] text-[#d4af37] border-[#d4af37]'
                : 'bg-[#faf6ee] hover:bg-[#141416] text-[#17181c] hover:text-[#d4af37] border-[#9d7b38]/60'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-[#9d7b38] shrink-0" />
            <span>Portal</span>
          </a>

          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              onLaunchDiagnostic();
            }}
            className="hidden sm:inline-flex px-4 py-2 text-xs font-bold uppercase text-[#f8f6f0] bg-[#17181c] hover:bg-[#282a30] transition-all rounded-sm shadow-xs whitespace-nowrap shrink-0 active:scale-[0.98] min-h-[38px] items-center gap-1.5 cursor-pointer border border-[#9d7b38]/40"
          >
            <Zap className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
            <span>60-Sec Assessment</span>
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle Navigation Menu"
            aria-expanded={menuOpen}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-sm border border-[#d8cebe] bg-white hover:bg-[#ede5d6] text-xs font-mono font-bold uppercase text-[#17181c] transition-colors min-h-[38px] cursor-pointer whitespace-nowrap shrink-0"
          >
            {menuOpen ? <X className="w-4 h-4 text-[#9d7b38]" /> : <Menu className="w-4 h-4 text-[#17181c]" />}
            <span>{menuOpen ? 'Close' : 'Menu'}</span>
          </button>
        </div>
      </div>

      {/* Unified Menu Drawer (All Screen Sizes — Secondary Destinations & Quick Actions) */}
      {menuOpen && (
        <div className="bg-[#f8f6f0] border-b border-[#d8cebe] shadow-xl animate-in slide-in-from-top-2 duration-200">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-5 space-y-5">
            {/* Primary Links (Mobile visibility + Quick jump) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-sm font-semibold text-[#17181c]">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('top');
                }}
                className="p-3 rounded-xs bg-white border border-[#e5decfe0] hover:border-[#9d7b38] flex items-center justify-between transition-colors"
              >
                <span>Overview</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#9d7b38]" />
              </a>

              <a
                href="/assessment"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('test');
                }}
                className="p-3 rounded-xs bg-[#17181c] text-[#f8f6f0] border border-[#d4af37]/60 hover:bg-[#282a30] flex items-center justify-between transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[#d4af37]" />
                  <span>60-Sec Assessment & Model</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#d4af37]" />
              </a>

              <a
                href="/services"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('partnerships');
                }}
                className="p-3 rounded-xs bg-white border border-[#e5decfe0] hover:border-[#9d7b38] flex items-center justify-between transition-colors"
              >
                <span>Services & Retainers</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#9d7b38]" />
              </a>

              <a
                href="/booking"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('booking');
                }}
                className="p-3 rounded-xs bg-[#faf6ee] border border-[#9d7b38] text-[#17181c] hover:bg-[#f1e7d2] flex items-center justify-between transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#9d7b38]" />
                  <span>Book 1-on-1 Call</span>
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-[#9d7b38]" />
              </a>
            </div>

            {/* Secondary Destinations Organized Cleanly */}
            <div className="pt-3 border-t border-[#e5decfe0]">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#685327] font-bold mb-2.5">
                Firm Resources, Intelligence & Client Access
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs font-semibold text-[#17181c]">
                <a
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('about');
                  }}
                  className="py-2.5 px-3 rounded-xs hover:bg-[#ede5d6] flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-[#9d7b38]" />
                    <span>About Suchita Sancheti</span>
                  </span>
                  <ArrowRight className="w-3 h-3 text-[#9d7b38]" />
                </a>

                <a
                  href="/shop"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('shop');
                  }}
                  className="py-2.5 px-3 rounded-xs hover:bg-[#ede5d6] flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <CreditCard className="w-3.5 h-3.5 text-[#9d7b38]" />
                    <span>Executive Toolkits & Pay</span>
                  </span>
                  <ArrowRight className="w-3 h-3 text-[#9d7b38]" />
                </a>

                <a
                  href="/library"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('library');
                  }}
                  className="py-2.5 px-3 rounded-xs hover:bg-[#ede5d6] flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-[#9d7b38]" />
                    <span>Research Dispatches</span>
                  </span>
                  <ArrowRight className="w-3 h-3 text-[#9d7b38]" />
                </a>

                <a
                  href="/case-studies"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('case-studies');
                  }}
                  className="py-2.5 px-3 rounded-xs hover:bg-[#ede5d6] flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-[#9d7b38]" />
                    <span>Case Studies</span>
                  </span>
                  <ArrowRight className="w-3 h-3 text-[#9d7b38]" />
                </a>

                <a
                  href="/briefing"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('briefing');
                  }}
                  className="py-2.5 px-3 rounded-xs hover:bg-[#ede5d6] flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Video className="w-3.5 h-3.5 text-[#9d7b38]" />
                    <span>Executive Video Briefing</span>
                  </span>
                  <ArrowRight className="w-3 h-3 text-[#9d7b38]" />
                </a>

                <a
                  href="/faq"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('faq');
                  }}
                  className="py-2.5 px-3 rounded-xs hover:bg-[#ede5d6] flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-3.5 h-3.5 text-[#9d7b38]" />
                    <span>Corporate FAQ</span>
                  </span>
                  <ArrowRight className="w-3 h-3 text-[#9d7b38]" />
                </a>

                <a
                  href="/portal"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('portal');
                  }}
                  className="py-2.5 px-3 rounded-xs hover:bg-[#ede5d6] flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Lock className="w-3.5 h-3.5 text-[#9d7b38]" />
                    <span>Client Clearance Portal</span>
                  </span>
                  <ArrowRight className="w-3 h-3 text-[#9d7b38]" />
                </a>

                <a
                  href="/privacy"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('privacy');
                  }}
                  className="py-2.5 px-3 rounded-xs hover:bg-[#ede5d6] flex items-center justify-between transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-[#9d7b38]" />
                    <span>Privacy & Data Covenant</span>
                  </span>
                  <ArrowRight className="w-3 h-3 text-[#9d7b38]" />
                </a>
              </div>
            </div>

            {/* Bottom Strip: Contact + Social */}
            <div className="pt-3 border-t border-[#e5decfe0] flex flex-wrap items-center justify-between gap-3 text-xs">
              <a
                href="/contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('contact');
                }}
                className="font-bold text-[#9d7b38] hover:text-[#7d5f24] flex items-center gap-1.5"
              >
                <span>Direct Confidential Advisory Desk</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center gap-4">
                <a
                  href="https://www.linkedin.com/in/suchita-sancheti"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[#0077b5] font-semibold hover:underline"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-[#0077b5]" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://www.instagram.com/transformingleadership"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[#e4405f] font-semibold hover:underline"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-[#e4405f]" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
