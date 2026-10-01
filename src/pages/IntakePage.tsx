
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Waitlist from '../../components/Waitlist.tsx';
import { motion } from 'motion/react';
import { Compass, Calculator, Layers, Shield, FileText, ArrowRight, Activity, Cpu } from 'lucide-react';

const IntakePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-[#ecece4] min-h-screen pt-6 md:pt-16 pb-16"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-8 sm:mb-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111111] text-[#b8860b] border border-[#b8860b]/40 text-[9px] font-mono uppercase tracking-widest font-black mb-3">
            Institutional Coordinate
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 leading-snug font-serif text-[#111111]">
            Enterprise <span className="text-[#b8860b] italic font-light">Intake Console.</span>
          </h1>
          <div className="h-0.5 w-16 bg-[#b8860b] mx-auto mb-4"></div>
          <p className="text-xs sm:text-sm text-zinc-600 font-light italic leading-relaxed max-w-xl mx-auto mb-4">
            The transition to clean strategic scaling and operational alignment begins here. Please provide your business coordinates to initiate the protocol.
          </p>

          {/* Pre-Intake Contextual Internal Links Strip */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-mono">
            <span className="text-zinc-500 uppercase font-semibold">Pre-Intake Checklist:</span>
            <Link to="/assessment" className="px-2.5 py-1 bg-white border border-zinc-300 text-zinc-800 hover:border-[#b8860b] hover:text-[#b8860b] transition-colors rounded-2xs font-bold flex items-center gap-1">
              <Activity className="w-3 h-3 text-[#b8860b]" />
              <span>90-Sec Diagnostic</span>
            </Link>
            <Link to="/cognitive-tax" className="px-2.5 py-1 bg-white border border-zinc-300 text-zinc-800 hover:border-[#b8860b] hover:text-[#b8860b] transition-colors rounded-2xs font-bold flex items-center gap-1">
              <Calculator className="w-3 h-3 text-[#b8860b]" />
              <span>Calculate Drag</span>
            </Link>
            <Link to="/services" className="px-2.5 py-1 bg-white border border-zinc-300 text-zinc-800 hover:border-[#b8860b] hover:text-[#b8860b] transition-colors rounded-2xs font-bold flex items-center gap-1">
              <Shield className="w-3 h-3 text-[#b8860b]" />
              <span>Service Levels</span>
            </Link>
            <Link to="/toolkits" className="px-2.5 py-1 bg-white border border-zinc-300 text-zinc-800 hover:border-[#b8860b] hover:text-[#b8860b] transition-colors rounded-2xs font-bold flex items-center gap-1">
              <Layers className="w-3 h-3 text-[#b8860b]" />
              <span>Digital Toolkits</span>
            </Link>
          </div>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <Waitlist defaultOpen={true} />
        </div>

        {/* Strategic Cross-Domain Internal Links Matrix */}
        <div className="max-w-5xl mx-auto mt-14 bg-white border border-zinc-300/80 p-6 sm:p-8 rounded-xs shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
            <div>
              <span className="text-[9px] font-mono uppercase font-black tracking-widest text-[#b8860b] block">
                EXPLORE ARCHITECTURAL DOMAINS
              </span>
              <h3 className="text-base sm:text-lg font-bold font-serif text-[#111111]">
                Institutional Architecture & Research Gateway
              </h3>
            </div>
            <span className="text-[10px] font-mono text-zinc-400">
              The Unbounded Leadership Co.
            </span>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 pt-4">
            <Link 
              to="/services" 
              className="p-3.5 bg-zinc-50 border border-zinc-200 hover:border-[#b8860b] transition-colors rounded-2xs group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1.5 text-[#b8860b] text-[10px] font-mono font-bold uppercase mb-1">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Service Mandates</span>
                </div>
                <h4 className="text-xs font-bold text-zinc-900 group-hover:text-[#b8860b] transition-colors font-serif mb-1">
                  10-Node Audit & Sovereign Retainer
                </h4>
                <p className="text-[11px] text-zinc-600 font-serif italic leading-relaxed">
                  Explore our 3 sovereign tiers—from 48-hr forensic audit to ongoing board advisory.
                </p>
              </div>
              <span className="text-[9px] font-mono uppercase font-bold text-[#b8860b] pt-2 flex items-center gap-1">
                View Services →
              </span>
            </Link>

            <Link 
              to="/methodology" 
              className="p-3.5 bg-zinc-50 border border-zinc-200 hover:border-[#b8860b] transition-colors rounded-2xs group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1.5 text-[#b8860b] text-[10px] font-mono font-bold uppercase mb-1">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>The Protocol</span>
                </div>
                <h4 className="text-xs font-bold text-zinc-900 group-hover:text-[#b8860b] transition-colors font-serif mb-1">
                  4-Phase Systemic Alignment
                </h4>
                <p className="text-[11px] text-zinc-600 font-serif italic leading-relaxed">
                  Review the engineering physics behind our 90-day executive decoupling protocol.
                </p>
              </div>
              <span className="text-[9px] font-mono uppercase font-bold text-[#b8860b] pt-2 flex items-center gap-1">
                Read Methodology →
              </span>
            </Link>

            <Link 
              to="/toolkits" 
              className="p-3.5 bg-zinc-50 border border-zinc-200 hover:border-[#b8860b] transition-colors rounded-2xs group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1.5 text-[#b8860b] text-[10px] font-mono font-bold uppercase mb-1">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Digital Systems</span>
                </div>
                <h4 className="text-xs font-bold text-zinc-900 group-hover:text-[#b8860b] transition-colors font-serif mb-1">
                  Turnkey Founder Toolkits
                </h4>
                <p className="text-[11px] text-zinc-600 font-serif italic leading-relaxed">
                  Immediate 1-click clone Notion workspaces, decision matrices & delegation filters.
                </p>
              </div>
              <span className="text-[9px] font-mono uppercase font-bold text-[#b8860b] pt-2 flex items-center gap-1">
                Explore Toolkits →
              </span>
            </Link>

            <Link 
              to="/cognitive-tax" 
              className="p-3.5 bg-zinc-50 border border-zinc-200 hover:border-[#b8860b] transition-colors rounded-2xs group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1.5 text-[#b8860b] text-[10px] font-mono font-bold uppercase mb-1">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Simulation Engine</span>
                </div>
                <h4 className="text-xs font-bold text-zinc-900 group-hover:text-[#b8860b] transition-colors font-serif mb-1">
                  Cognitive Tax Simulator
                </h4>
                <p className="text-[11px] text-zinc-600 font-serif italic leading-relaxed">
                  Simulate your company's exact annual inaction tax and leadership bandwidth drain.
                </p>
              </div>
              <span className="text-[9px] font-mono uppercase font-bold text-[#b8860b] pt-2 flex items-center gap-1">
                Simulate Now →
              </span>
            </Link>

            <Link 
              to="/assessment" 
              className="p-3.5 bg-zinc-50 border border-zinc-200 hover:border-[#b8860b] transition-colors rounded-2xs group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1.5 text-[#b8860b] text-[10px] font-mono font-bold uppercase mb-1">
                  <Activity className="w-3.5 h-3.5" />
                  <span>Diagnostic Tool</span>
                </div>
                <h4 className="text-xs font-bold text-zinc-900 group-hover:text-[#b8860b] transition-colors font-serif mb-1">
                  Yield Calibration Audit
                </h4>
                <p className="text-[11px] text-zinc-600 font-serif italic leading-relaxed">
                  Score your firm across the 5 Sovereign Domains in under 90 seconds.
                </p>
              </div>
              <span className="text-[9px] font-mono uppercase font-bold text-[#b8860b] pt-2 flex items-center gap-1">
                Take Diagnostic →
              </span>
            </Link>

            <Link 
              to="/library" 
              className="p-3.5 bg-zinc-50 border border-zinc-200 hover:border-[#b8860b] transition-colors rounded-2xs group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1.5 text-[#b8860b] text-[10px] font-mono font-bold uppercase mb-1">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Research Registry</span>
                </div>
                <h4 className="text-xs font-bold text-zinc-900 group-hover:text-[#b8860b] transition-colors font-serif mb-1">
                  Executive White Papers
                </h4>
                <p className="text-[11px] text-zinc-600 font-serif italic leading-relaxed">
                  Declassified dispatches on succession, latency physics, and sovereign governance.
                </p>
              </div>
              <span className="text-[9px] font-mono uppercase font-bold text-[#b8860b] pt-2 flex items-center gap-1">
                Browse Library →
              </span>
            </Link>
          </div>
        </div>

        <div className="mt-12 text-center space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono">
            <a href="tel:+919325346704" aria-label="Call +91 9325346704" className="text-[#b8860b] hover:underline font-bold">
              📞 Direct Line: +91 9325346704
            </a>
            <span className="text-zinc-400">•</span>
            <a href="mailto:suchita@theunboundedleadership.com" aria-label="Email suchita@theunboundedleadership.com" className="text-zinc-700 hover:text-[#b8860b] transition-colors">
              ✉️ suchita@theunboundedleadership.com
            </a>
            <span className="text-zinc-400">•</span>
            <a href="https://business.google.com/n/14240239232288232619/searchprofile?hl=en-GB" target="_blank" rel="noopener noreferrer" aria-label="Google Business Profile" className="text-zinc-700 hover:text-[#b8860b] transition-colors">
              📍 Google Business Profile
            </a>
          </div>
          <p className="text-zinc-500 text-xs italic font-light max-w-2xl mx-auto pt-1">
            Note: Intake is strictly prioritized to ensure highest standards of alignment. All inquiries are processed with strict confidentiality and discretion.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default IntakePage;
