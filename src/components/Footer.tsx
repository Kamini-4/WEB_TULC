import React from 'react';
import { ArrowUpRight, Shield, Mail } from 'lucide-react';

interface FooterProps {
  onSelectTab: (tab: 'tribe' | 'playbook' | 'diagnostic' | 'essays') => void;
  openCalibrationModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, openCalibrationModal }) => {
  return (
    <footer className="border-t border-zinc-900 bg-zinc-950 text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Brand & Doctrine */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-sm bg-amber-400/10 border border-amber-500/30 flex items-center justify-center text-amber-400 font-serif font-bold text-sm">
                Ω
              </div>
              <span className="serif-heading text-lg font-bold text-zinc-100">
                The Unbounded Leadership Co.
              </span>
            </div>
            <p className="text-zinc-400 max-w-sm leading-relaxed font-light">
              An elite institutional leadership consultancy platform focusing on re-architecting leadership operating systems for CXOs and boards.
            </p>
            <div className="text-zinc-500 font-mono text-[11px] italic">
              "People like us do things like this." — The Sovereign Creed
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <div className="font-mono text-zinc-200 uppercase tracking-widest text-[11px] mb-4">
              Architecture & Insights
            </div>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={() => onSelectTab('tribe')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  The Sovereign Tribe Manifesto
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('playbook')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Seth Godin A–Z Playbook
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('diagnostic')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Constructive Tension Diagnostic
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('essays')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Rewritten Executive Essays (HBR Rigor)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Institutional Access */}
          <div>
            <div className="font-mono text-zinc-200 uppercase tracking-widest text-[11px] mb-4">
              Institutional Access
            </div>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={openCalibrationModal}
                  className="text-amber-400 hover:text-amber-300 font-medium transition-colors cursor-pointer flex items-center gap-1"
                >
                  <span>Request Calibration</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              </li>
              <li className="text-zinc-500 font-mono text-[11px]">
                Capacity: 4 Engagements / Quarter
              </li>
              <li className="text-zinc-500 font-mono text-[11px]">
                Swiss Banking Confidentiality
              </li>
              <li className="text-zinc-500 font-mono text-[11px]">
                Zero RFPs · 1-Page Sovereign Treaty
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-600 font-mono">
          <div>
            © {new Date().getFullYear()} The Unbounded Leadership Co. All sovereign rights reserved.
          </div>
          <div>
            Positioned according to Seth Godin's Sovereign Tribal Doctrine.
          </div>
        </div>
      </div>
    </footer>
  );
};
