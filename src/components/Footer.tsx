import React from 'react';
import { Phone, Mail, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { LinkedinIcon, InstagramIcon } from './SocialIcons';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLink = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    onNavigate(target);
  };

  return (
    <footer className="bg-[#0f1014] text-[#c8c2b6] border-t-2 border-[#d4af37]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Main 4-Column Institutional Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-8 border-b border-[#262830]">
          {/* Col 1: Brand Authority & Thesis */}
          <div className="lg:col-span-4 space-y-4">
            <a
              href="/"
              onClick={(e) => handleLink(e, 'top')}
              className="inline-flex items-center gap-3 group"
            >
              <img
                src="/assets/tulc-gold-navy-crest.jpg"
                alt="The Unbounded Leadership Co. Crest"
                className="h-12 w-auto rounded-sm object-contain border border-[#d4af37]/70 bg-[#0a0c14] p-0.5 shrink-0"
                width="120"
                height="80"
                loading="lazy"
              />
              <div>
                <div className="text-base sm:text-lg font-bold font-serif text-[#f8f6f0] group-hover:text-[#d4af37] transition-colors leading-tight">
                  The Unbounded Leadership Co.
                </div>
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#d4af37] mt-0.5">
                  Founded by Suchita Sancheti
                </div>
              </div>
            </a>

            <p className="text-xs sm:text-[13px] text-[#b5afa2] leading-relaxed max-w-sm">
              We partner with founders and boards to eliminate operational dependency, codify{' '}
              <span className="text-[#d4af37] font-semibold">autonomous decision rights</span>, and
              build self-running executive teams within a fixed{' '}
              <span className="text-[#d4af37] font-semibold">90-day mandate</span>.
            </p>

            <div className="flex items-center gap-2 text-[11px] font-mono text-[#d4af37] pt-1">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
              <span>Chatham House &amp; In-Camera Privilege Enforced</span>
            </div>
          </div>

          {/* Col 2: Core Practice */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#d4af37]">
              Practice
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="/"
                  onClick={(e) => handleLink(e, 'top')}
                  className="hover:text-[#d4af37] transition-colors"
                >
                  Overview
                </a>
              </li>
              <li>
                <a
                  href="/assessment"
                  onClick={(e) => handleLink(e, 'test')}
                  className="text-[#f3e5ab] hover:text-[#d4af37] font-semibold transition-colors"
                >
                  60-Sec Audit &amp; Model
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  onClick={(e) => handleLink(e, 'partnerships')}
                  className="hover:text-[#d4af37] transition-colors"
                >
                  Services &amp; Retainers
                </a>
              </li>
              <li>
                <a
                  href="/comparison"
                  onClick={(e) => handleLink(e, 'comparison')}
                  className="hover:text-[#d4af37] transition-colors"
                >
                  Outcomes Comparison
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  onClick={(e) => handleLink(e, 'about')}
                  className="hover:text-[#d4af37] transition-colors"
                >
                  About Suchita Sancheti
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Toolkits, Research & Access */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#d4af37]">
              Resources &amp; Client Access
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="/shop"
                  onClick={(e) => handleLink(e, 'shop')}
                  className="text-[#f3e5ab] hover:text-[#d4af37] font-semibold transition-colors"
                >
                  Executive Toolkits &amp; Direct Pay
                </a>
              </li>
              <li>
                <a
                  href="/case-studies"
                  onClick={(e) => handleLink(e, 'case-studies')}
                  className="hover:text-[#d4af37] transition-colors"
                >
                  Verified Client Case Studies
                </a>
              </li>
              <li>
                <a
                  href="/library"
                  onClick={(e) => handleLink(e, 'library')}
                  className="hover:text-[#d4af37] transition-colors"
                >
                  Research Dispatches
                </a>
              </li>
              <li>
                <a
                  href="/briefing"
                  onClick={(e) => handleLink(e, 'briefing')}
                  className="hover:text-[#d4af37] transition-colors"
                >
                  Executive Video Briefing
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  onClick={(e) => handleLink(e, 'faq')}
                  className="hover:text-[#d4af37] transition-colors"
                >
                  Corporate FAQ
                </a>
              </li>
              <li>
                <a
                  href="/portal"
                  onClick={(e) => handleLink(e, 'portal')}
                  className="hover:text-[#d4af37] transition-colors"
                >
                  Institutional Client Portal
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Direct Advisory Desk */}
          <div className="lg:col-span-3">
            <div className="p-4 rounded-sm bg-[#16181f] border border-[#d4af37]/40 space-y-3">
              <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#d4af37]">
                Direct Executive Desk
              </div>

              <div className="space-y-2 text-xs">
                <a
                  href="tel:+919325346704"
                  className="flex items-center gap-2 text-[#f8f6f0] hover:text-[#d4af37] font-bold transition-colors tabular-nums"
                >
                  <Phone className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                  <span>+91 9325346704</span>
                </a>

                <a
                  href="mailto:suchita@theunboundedleadership.com"
                  className="flex items-center gap-2 text-[#e0dacd] hover:text-[#d4af37] transition-colors break-all"
                >
                  <Mail className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                  <span>suchita@theunboundedleadership.com</span>
                </a>
              </div>

              <div className="pt-1 space-y-2">
                <a
                  href="/booking"
                  onClick={(e) => handleLink(e, 'booking')}
                  className="w-full py-2.5 px-3 bg-[#d4af37] hover:bg-[#e5c14d] text-[#0f1014] text-xs font-mono font-black uppercase tracking-wider rounded-xs flex items-center justify-center gap-1.5 transition-colors whitespace-nowrap"
                >
                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                  <span>Book 20-Min Briefing</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </a>
              </div>

              <div className="pt-2 border-t border-[#262830] flex items-center gap-4 text-[11px] font-semibold">
                <a
                  href="https://www.linkedin.com/in/suchita-sancheti"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#d4af37] hover:text-[#f8f6f0] transition-colors"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://www.instagram.com/transformingleadership"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#d4af37] hover:text-[#f8f6f0] transition-colors"
                >
                  <InstagramIcon className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Clean Bottom Legal Strip */}
        <div className="pt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-[#8d887c]">
          <div>
            &copy; {new Date().getFullYear()}{' '}
            <span className="text-[#f4ecd8] font-semibold">The Unbounded Leadership Co.</span> All
            institutional rights reserved.
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href="/privacy"
              onClick={(e) => handleLink(e, 'privacy')}
              className="text-[#d4af37] hover:underline font-semibold"
            >
              Privacy Policy
            </a>
            <span aria-hidden="true" className="text-[#3b3e4a]">&middot;</span>
            <a
              href="/contact"
              onClick={(e) => handleLink(e, 'contact')}
              className="text-[#f4ecd8] hover:text-[#d4af37] transition-colors"
            >
              Confidential Inquiry
            </a>
            <span aria-hidden="true" className="text-[#3b3e4a]">&middot;</span>
            <span>Patent Pending: <span className="text-[#d4af37]">L.O.S.-P721</span></span>
          </div>
        </div>
      </div>
    </footer>
  );
};
