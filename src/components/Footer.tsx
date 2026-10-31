import React from 'react';
import { BookOpen, Zap, Target, Eye, Phone, Mail, Shield, Lock, FileText } from 'lucide-react';
import { LinkedinIcon, InstagramIcon } from './SocialIcons';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#ede7da] border-t border-[#dfd7c8] py-8 sm:py-12 text-[#6b6e76] text-xs">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header & Brand Statement */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-6 mb-6 border-b border-[#dfd7c8] gap-5">
          <div className="flex items-start sm:items-center gap-4">
            <img 
              src="/assets/tulc-gold-navy-crest.jpg" 
              alt="The Unbounded Leadership Co. Crest & Official Insignia" 
              className="h-16 sm:h-20 w-auto max-w-[160px] sm:max-w-[200px] rounded-sm object-contain border-2 border-[#9d7b38]/70 shadow-md shrink-0 bg-[#0c1322] p-1"
              style={{ imageRendering: '-webkit-optimize-contrast' }}
              width="200"
              height="140"
              loading="lazy"
            />
            <div>
              <div className="text-lg sm:text-xl font-bold text-[#141416] tracking-tight font-serif">
                The Unbounded Leadership Co.
              </div>
              <p className="text-[#9d7b38] font-mono text-[11px] font-bold tracking-wider uppercase">
                Founded by Suchita Sancheti · Sovereign Operating Architecture
              </p>
              <p className="text-[#6b6e76] text-xs mt-0.5 max-w-md font-normal leading-relaxed italic">
                Engineering executive governance cadences and sovereign systems architecture for enterprise founders and institutional boards worldwide.
              </p>
            </div>
          </div>

          {/* Core Navigation Links */}
          <nav aria-label="Footer Navigation" className="flex flex-wrap items-center gap-3 sm:gap-4 font-semibold text-[#4a4c52]">
            <a
              href="#top"
              onClick={(e) => { e.preventDefault(); onNavigate('top'); }}
              className="hover:text-[#141416] transition-colors py-1"
            >
              Overview
            </a>
            <a
              href="#about"
              onClick={(e) => { e.preventDefault(); onNavigate('about'); }}
              className="hover:text-[#141416] transition-colors py-1 font-bold text-[#141416]"
            >
              About
            </a>
            <a
              href="#services"
              onClick={(e) => { e.preventDefault(); onNavigate('partnerships'); }}
              className="hover:text-[#141416] transition-colors py-1 font-bold text-[#141416]"
            >
              Services
            </a>
            <a
              href="#comparison"
              onClick={(e) => { e.preventDefault(); onNavigate('comparison'); }}
              className="hover:text-[#141416] transition-colors py-1 font-medium"
            >
              The Outcomes
            </a>
            <a
              href="#blueprints"
              onClick={(e) => { e.preventDefault(); onNavigate('shop'); }}
              className="hover:text-[#9d7b38] transition-colors flex items-center gap-1 py-1 font-bold text-[#141416]"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#9d7b38]" />
              <span>Executive Blueprints</span>
            </a>
            <a
              href="#test"
              onClick={(e) => { e.preventDefault(); onNavigate('test'); }}
              className="hover:text-[#9d7b38] transition-colors py-1 flex items-center gap-1 font-bold text-[#141416]"
            >
              <Zap className="w-3.5 h-3.5 text-[#9d7b38]" />
              <span>Free 60-Sec Test</span>
            </a>
            <a
              href="#proof"
              onClick={(e) => { e.preventDefault(); onNavigate('case-studies'); }}
              className="hover:text-[#141416] transition-colors py-1"
            >
              Case Studies
            </a>
            <a
              href="#portal"
              onClick={(e) => { e.preventDefault(); onNavigate('portal'); }}
              className="hover:text-[#9d7b38] transition-colors py-1 flex items-center gap-1 font-bold text-[#141416]"
            >
              <Lock className="w-3.5 h-3.5 text-[#9d7b38]" />
              <span>Client Portal</span>
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}
              className="text-[#9d7b38] hover:text-[#7d5f24] font-bold transition-colors py-1"
            >
              Contact
            </a>
            <a
              href="#privacy"
              onClick={(e) => { e.preventDefault(); onNavigate('privacy'); }}
              className="hover:text-[#141416] transition-colors py-1 underline underline-offset-2"
            >
              Privacy Policy
            </a>
          </nav>
        </div>

        {/* Executive Direct Contact & Social Media Strip */}
        <div className="p-4 sm:p-5 rounded-md bg-[#f6f2e9] border border-[#dcd3c2] mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Clickable Phone & Email Links */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-mono uppercase text-[#9d7b38] font-bold tracking-wider block">
                Direct Confidential Executive Channels
              </span>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs">
                <a 
                  href="tel:+919325346704" 
                  className="flex items-center gap-2 text-[#17181c] hover:text-[#9d7b38] font-bold transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#9d7b38] shrink-0" />
                  <span>+91 9325346704</span>
                </a>

                <a 
                  href="mailto:suchita@theunboundedleadership.com" 
                  className="flex items-center gap-2 text-[#17181c] hover:text-[#9d7b38] font-semibold transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#9d7b38] shrink-0" />
                  <span>suchita@theunboundedleadership.com</span>
                </a>

                <a 
                  href="mailto:suchita135sancheti@gmail.com" 
                  className="flex items-center gap-2 text-[#17181c] hover:text-[#9d7b38] font-semibold transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#9d7b38] shrink-0" />
                  <span>suchita135sancheti@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="space-y-1.5 lg:text-right">
              <span className="text-[10px] font-mono uppercase text-[#9d7b38] font-bold tracking-wider block">
                Official Social & Institutional Profiles
              </span>
              <div className="flex items-center lg:justify-end gap-3 text-xs">
                <a 
                  href="https://www.linkedin.com/in/suchita-sancheti" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#ffffff] hover:bg-[#faf7f0] border border-[#d8cebe] hover:border-[#9d7b38] rounded-xs text-[#17181c] font-semibold transition-all shadow-2xs group"
                >
                  <LinkedinIcon className="w-3.5 h-3.5 text-[#0077b5] group-hover:scale-110 transition-transform" />
                  <span>LinkedIn (Suchita Sancheti)</span>
                </a>

                <a 
                  href="https://www.instagram.com/transformingleadership" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#ffffff] hover:bg-[#faf7f0] border border-[#d8cebe] hover:border-[#9d7b38] rounded-xs text-[#17181c] font-semibold transition-all shadow-2xs group"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-[#e4405f] group-hover:scale-110 transition-transform" />
                  <span>@transformingleadership</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Verbatim Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pb-6 mb-6 border-b border-[#dfd7c8]">
          
          {/* Vision */}
          <div className="p-4 sm:p-5 rounded-md bg-[#f6f2e9] border border-[#dcd3c2] space-y-2 shadow-2xs">
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-[#9d7b38] font-bold">
              <Eye className="w-3.5 h-3.5 text-[#9d7b38]" />
              <span>Our Vision</span>
            </div>
            <p className="text-[13px] sm:text-sm text-[#26282e] font-serif leading-relaxed italic">
              “To align human ambition with enduring organizational architecture — so that power, scale, and perpetuity compound as one, and what the world's greatest founders build today commands the future long after they have conquered it.”
            </p>
          </div>

          {/* Mission */}
          <div className="p-4 sm:p-5 rounded-md bg-[#f6f2e9] border border-[#dcd3c2] space-y-2 shadow-2xs">
            <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-[#9d7b38] font-bold">
              <Target className="w-3.5 h-3.5 text-[#9d7b38]" />
              <span>Our Mission</span>
            </div>
            <p className="text-[13px] sm:text-sm text-[#26282e] font-serif leading-relaxed italic">
              “We work with the world's most consequential founders to architect the structural conditions for absolute organizational sovereignty. Across five foundational domains of systemic alignment, we dismantle operational dependency, dissolve leadership entropy, and engineer the precise infrastructure that allows an empire to grow, scale, and compound — with or without its founder at the helm.”
            </p>
          </div>

        </div>

        {/* Bottom Legal, Privacy & Compliance Ledger */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5 text-[#7d8089] text-[11px]">
          <div>
            © {new Date().getFullYear()} The Unbounded Leadership Co. All institutional rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <a 
              href="#privacy" 
              onClick={(e) => { e.preventDefault(); onNavigate('privacy'); }}
              className="text-[#17181c] hover:text-[#9d7b38] font-semibold underline"
            >
              Privacy Policy
            </a>
            <span aria-hidden="true" className="text-[#c9bea9]">·</span>
            <a 
              href="#contact" 
              onClick={(e) => { e.preventDefault(); onNavigate('contact'); }}
              className="text-[#17181c] hover:text-[#9d7b38] font-semibold"
            >
              Contact Advisory Desk
            </a>
            <span aria-hidden="true" className="text-[#c9bea9]">·</span>
            <span>Patent Pending: L.O.S.-P721</span>
            <span aria-hidden="true" className="text-[#c9bea9]">·</span>
            <span>Executive Mastery + Sovereign Systems Architecture</span>
            <span aria-hidden="true" className="text-[#c9bea9]">·</span>
            <span>In-Camera Privilege Enforced</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
