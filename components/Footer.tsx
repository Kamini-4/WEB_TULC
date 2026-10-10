import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ShieldCheck, Mail, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#07080a] border-t border-[#1a1d26] text-[#9aa1b2] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xs bg-[#12141a] border border-[#b8860b]/40 flex items-center justify-center text-[#d4af37]">
                <Compass className="w-4 h-4 text-[#d4af37]" />
              </div>
              <span className="font-monumental tracking-widest text-sm font-bold text-white uppercase">
                The Unbounded Leadership Co.
              </span>
            </div>
            <p className="text-sm text-[#7d8495] max-w-md leading-relaxed font-serif-prestige">
              Institutional architecture, sovereign substrates, and governance engineering for enterprise founders, CXOs, and board directors.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs font-mono-tech text-[#5e6575]">
              <ShieldCheck className="w-4 h-4 text-[#b8860b]" />
              <span>Sovereign Fiduciary Standard · Confidential Advisory</span>
            </div>
          </div>

          {/* Quick Links 1: Intelligence */}
          <div className="space-y-3">
            <h4 className="text-white uppercase font-bold tracking-wider text-xs">Strategic Assets</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/library" className="hover:text-[#d4af37] transition-colors">
                  Executive Briefings & Library
                </Link>
              </li>
              <li>
                <Link to="/assessment" className="hover:text-[#d4af37] transition-colors">
                  Inaction Tax Diagnostic
                </Link>
              </li>
              <li>
                <Link to="/cognitive-tax" className="hover:text-[#d4af37] transition-colors">
                  Cognitive Tax Engine
                </Link>
              </li>
              <li>
                <Link to="/toolkits" className="hover:text-[#d4af37] transition-colors">
                  Founder Runbooks & Toolkits
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links 2: Institutional */}
          <div className="space-y-3">
            <h4 className="text-white uppercase font-bold tracking-wider text-xs">Advisory & Protocols</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/methodology" className="hover:text-[#d4af37] transition-colors">
                  4-Phase Alignment Protocol
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#d4af37] transition-colors">
                  Executive Mandates & Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#d4af37] transition-colors">
                  Principal Architect (Suchita Sancheti)
                </Link>
              </li>
              <li>
                <Link to="/intake" className="hover:text-[#d4af37] transition-colors">
                  Sovereign Intake Facility
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Engagement */}
          <div className="space-y-3">
            <h4 className="text-white uppercase font-bold tracking-wider text-xs">Private Desk</h4>
            <p className="text-[#7d8495] leading-relaxed">
              Confidential inquiries directly reviewed by Principal Advisory:
            </p>
            <div className="pt-1">
              <a 
                href="mailto:suchita135sancheti@gmail.com" 
                className="inline-flex items-center gap-1.5 text-xs text-[#d4af37] hover:underline font-mono-tech"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>suchita135sancheti@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#1a1d26] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#5e6575]">
          <div>
            © {new Date().getFullYear()} The Unbounded Leadership Co. All sovereign rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Security Protocol v4.2</span>
            <span>·</span>
            <span>Anti-Entropy Governance</span>
            <span>·</span>
            <Link to="/intake" className="text-[#9aa1b2] hover:text-[#d4af37] inline-flex items-center gap-1">
              <span>Client Portal</span>
              <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
