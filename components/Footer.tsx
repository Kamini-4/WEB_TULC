
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Phone, Instagram, Linkedin } from './BrandIcons';

interface FooterProps {
  onLegalClick: (type: 'disclosure' | 'terms' | 'disclaimer') => void;
}

const Footer: React.FC<FooterProps> = ({ onLegalClick }) => {
  const navigate = useNavigate();
  return (
    <footer className="bg-[#111111] text-[#f5f5f0] pt-8 sm:pt-12 pb-6 sm:pb-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Detailed Manifesto Section */}
        <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 mb-8 sm:mb-12 items-start">
          <div className="lg:col-span-7">
            <h2 className="text-[#b8860b] text-[9px] sm:text-[10px] font-black uppercase mb-4 sm:mb-6 tracking-[0.4em] sm:tracking-[0.5em]">The Strategic Manifesto</h2>
            <div className="space-y-3 sm:space-y-4">
              <p className="text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.15] text-white">
                Leadership is not a performance. It is an <span className="italic text-[#b8860b]">Architectural Fact.</span>
              </p>
              <div className="h-[1.5px] w-12 sm:w-16 bg-[#b8860b]"></div>
              <div className="space-y-3 text-zinc-350 text-sm sm:text-base font-light italic leading-relaxed max-w-2xl">
                <p>
                  Advice is secondary; the engineering of aligned leadership systems is primary. The Unbounded exists to establish operational integrity across scaling layers.
                </p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5 bg-white/[0.03] p-4 sm:p-6 md:p-8 border border-white/10 backdrop-blur-3xl relative group overflow-hidden mt-4 lg:mt-0">
             <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#b8860b]/10 blur-[120px] rounded-full group-hover:bg-[#b8860b]/20 transition-all duration-1000" />
             <h3 className="text-[8px] sm:text-[9px] font-black uppercase text-[#b8860b] mb-4 sm:mb-6 tracking-[0.3em] sm:tracking-[0.4em]">Operational Pillars</h3>
             <ul className="space-y-4 sm:space-y-6">
               <ManifestoPoint 
                title="Architectural Determinism" 
                desc="Structure dictates destiny. Outcomes are not hoped for; systems make them mandatory." 
               />
               <ManifestoPoint 
                title="High-Fidelity Intent" 
                desc="Vision must maintain frequency across every scaling layer." 
               />
             </ul>
          </div>
        </div>

        {/* Major Final CTA Block - Spaced Smartly & Designed for Peak Conversion */}
        <div className="border border-[#b8860b]/30 p-6 sm:p-8 md:p-10 mb-8 sm:mb-12 bg-gradient-to-b from-white/[0.02] to-transparent relative overflow-hidden rounded-xs text-left">
          <div className="absolute top-0 right-0 p-3 font-mono text-[7px] text-[#b8860b] tracking-widest uppercase font-black bg-[#b8860b]/10">Direct Action Gateway</div>
          <div className="relative z-10 grid lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="inline-flex items-center gap-2 px-2 py-0.5 border border-[#b8860b]/20 bg-[#b8860b]/5 text-[8px] font-mono uppercase tracking-widest text-[#b8860b]">
                ⚡ Verified Performance Impact
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-white leading-tight">
                Eliminate Operational Bleed. <br/>
                <span className="italic text-[#b8860b] font-light">Claim Sovereign Command.</span>
              </h3>
              <p className="text-zinc-400 text-xs leading-relaxed italic font-light max-w-xl">
                Elite leadership operates with systems precision, not guesswork. Align with the Principal Architect to reclaim up to 40% of your strategic capacity.
              </p>
              
              {/* High-converting Trust Factors/Stats underneath the paragraph */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-white/5">
                <div>
                  <div className="text-[10px] font-black text-white uppercase tracking-wider">98% Retainer Renewal</div>
                  <div className="text-[8px] text-zinc-500 font-mono uppercase">Fortune 500 & Unicorn Principals</div>
                </div>
                <div>
                  <div className="text-[10px] font-black text-white uppercase tracking-wider">14-Day Velocity Audit</div>
                  <div className="text-[8px] text-zinc-500 font-mono uppercase">Immediate Logic Diagnostics</div>
                </div>
                <div>
                  <div className="text-[10px] font-black text-[#b8860b] uppercase tracking-wider">3 Client Limit / Qtr</div>
                  <div className="text-[8px] text-zinc-500 font-mono uppercase">Uncompromising Architecture</div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-5 flex flex-col gap-2.5 w-full">
              <button 
                onClick={() => navigate('/assessment')}
                className="w-full px-5 py-3 bg-[#b8860b] text-white hover:bg-white hover:text-black text-[9px] font-black uppercase tracking-[0.25em] transition-all duration-300 font-bold shadow-[0_0_30px_rgba(184,134,11,0.15)] text-center cursor-pointer"
              >
                1. Start Private Calibration (15m)
              </button>
              <button 
                onClick={() => navigate('/intake')}
                className="w-full px-5 py-3 bg-transparent border border-zinc-700 text-white hover:border-[#b8860b] hover:text-[#b8860b] text-[9px] font-black uppercase tracking-[0.25em] transition-all duration-300 font-bold text-center cursor-pointer"
              >
                2. Request Admittance & File Intake
              </button>
              <a 
                href="https://calendly.com/d/d3jb-kpx-r6q" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full px-5 py-3 bg-zinc-900 border border-white/5 text-zinc-350 hover:text-white hover:bg-zinc-800 text-[9px] font-black uppercase tracking-[0.25em] transition-all duration-300 font-bold text-center inline-block cursor-pointer"
              >
                3. Book Direct Briefing Segment
              </a>
              <div className="text-center">
                <span className="text-[8px] font-mono uppercase tracking-widest text-zinc-500">
                  🔒 Zero-Knowledge secure protocol. Data never trains models.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Global Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 sm:gap-12 mb-10 sm:mb-12 border-t border-white/5 pt-8 sm:pt-10">
          <div className="col-span-2">
            <div className="text-xl sm:text-2xl font-bold mb-3 text-white tracking-tighter">THE UNBOUNDED</div>
            <div className="text-[#b8860b] text-[8px] sm:text-[9px] font-black uppercase tracking-[0.3em] mb-4">Suchita Sancheti | Principal Architect</div>
            <p className="text-white/60 text-[9px] sm:text-[10px] leading-relaxed max-w-sm uppercase font-black mb-4 sm:mb-6 tracking-widest leading-loose">
              Re-architecting leadership operating systems for global organizational scaling.
            </p>
            <div className="flex flex-col gap-2 font-mono text-[9px] text-zinc-400">
              <span className="text-[7px] font-black uppercase text-zinc-650 tracking-widest block mb-0.5">Direct Paths</span>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#b8860b] text-zinc-350 transition-colors flex items-center gap-2">
                <Linkedin className="w-3 h-3 text-[#b8860b] shrink-0" />
                <span>linkedin.com/company/theunboundedleadership</span>
              </a>
              <a href="https://www.instagram.com/transformingleadership" target="_blank" rel="noopener noreferrer" className="hover:text-[#b8860b] text-zinc-350 transition-colors flex items-center gap-2">
                <Instagram className="w-3 h-3 text-[#b8860b] shrink-0" />
                <span>instagram.com/transformingleadership</span>
              </a>
              <a href="mailto:kaminiagnihotri249@gmail.com" className="hover:text-[#b8860b] text-zinc-350 transition-colors flex items-center gap-2">
                <Mail className="w-3 h-3 text-[#b8860b] shrink-0" />
                <span>Assistant: kaminiagnihotri249@gmail.com</span>
              </a>
            </div>
          </div>
          
          <div>
            <h5 className="text-white text-[9px] uppercase font-black mb-4 tracking-widest">Philosophy</h5>
            <ul className="text-white/50 text-[9px] uppercase space-y-2 font-bold tracking-widest">
              <li><Link to="/about" className="hover:text-[#b8860b] transition-colors uppercase">About the Firm</Link></li>
              <li><Link to="/methodology" className="hover:text-[#b8860b] transition-colors uppercase">Strategic Alignment Protocol</Link></li>
              <li><Link to="/services" className="hover:text-[#b8860b] transition-colors uppercase">Services Spectrum</Link></li>
              <li><Link to="/#mandates" className="hover:text-[#b8860b] transition-colors uppercase">Strategic Mandates</Link></li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-white text-[9px] uppercase font-black mb-4 tracking-widest">Intelligence</h5>
            <ul className="text-white/50 text-[9px] uppercase space-y-2 font-bold tracking-widest">
              <li><Link to="/library" className="hover:text-[#b8860b] transition-colors uppercase">Intellectual Authority</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 sm:pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8">
            <div className="max-w-md text-center md:text-left">
              <p className="text-[#b8860b] text-[9px] sm:text-[10px] uppercase font-black tracking-[0.2em] mb-2">
                "Apply → Yield Calibration → Scalable Performance."
              </p>
              <div className="text-white/20 text-[8px] sm:text-[9px] uppercase font-bold">© {new Date().getFullYear()} THE UNBOUNDED LEADERSHIP CO. • PROVISIONAL PATENT PENDING</div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-[7px] sm:text-[8px] uppercase text-white/10 font-black tracking-widest">
              <button onClick={() => onLegalClick('disclosure')} className="hover:text-white transition-colors cursor-pointer">Information Disclosure</button>
              <button onClick={() => onLegalClick('terms')} className="hover:text-white transition-colors cursor-pointer">Terms of Consultation</button>
              <button onClick={() => onLegalClick('disclaimer')} className="hover:text-white transition-colors cursor-pointer">Corporate Disclaimer</button>
            </div>
        </div>

        {/* Base Legal Disclaimer */}
        <div className="mt-8 pt-4 border-t border-white/[0.03] text-center">
          <p className="text-white/10 text-[7px] sm:text-[8px] uppercase font-black tracking-[0.2em] sm:tracking-[0.25em] max-w-5xl mx-auto leading-relaxed">
            DISCLOSURE: THE UNBOUNDED LEADERSHIP CO. IS A STRATEGIC ARCHITECTURE AND OPERATIONAL DIAGNOSTIC ADVISORY. ALL DATA TRANSMITTED DURING THE YIELD CALIBRATION PROCESS IS PROCESSED VIA COMPLIANT ZERO DATA RETENTION PROTOCOLS.
          </p>
        </div>
      </div>
    </footer>
  );
};

const ManifestoPoint: React.FC<{ title: string, desc: string }> = ({ title, desc }) => (
  <li className="flex gap-6 group">
    <div className="w-[1px] h-14 bg-[#b8860b]/20 group-hover:bg-[#b8860b] transition-all duration-700" />
    <div>
      <div className="text-white text-base font-bold uppercase tracking-[0.2em] mb-2">{title}</div>
      <div className="text-zinc-500 text-sm italic font-light leading-relaxed">{desc}</div>
    </div>
  </li>
);

export default Footer;
