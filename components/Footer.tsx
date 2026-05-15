
import React from 'react';
import { Link } from 'react-router-dom';

interface FooterProps {
  onLegalClick: (type: 'disclosure' | 'terms' | 'disclaimer') => void;
}

const Footer: React.FC<FooterProps> = ({ onLegalClick }) => {
  return (
    <footer className="bg-[#111111] text-[#f5f5f0] pt-20 sm:pt-24 md:pt-32 pb-12 sm:pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* The Soul: Sovereign Manifesto Section */}
        <div className="grid lg:grid-cols-12 gap-12 sm:gap-16 mb-24 sm:mb-32 md:mb-40 items-start">
          <div className="lg:col-span-7">
            <h2 className="text-[#b8860b] text-[9px] sm:text-[11px] font-black uppercase mb-8 sm:mb-12 tracking-[0.4em] sm:tracking-[0.5em]">The Sovereign Manifesto</h2>
            <div className="space-y-6 sm:space-y-10">
              <p className="text-3xl sm:text-4xl md:text-6xl font-bold leading-[1.1] text-white">
                Leadership is not a performance. It is an <span className="italic text-[#b8860b]">Architectural Fact.</span>
              </p>
              <div className="h-[2px] w-24 sm:w-32 bg-[#b8860b]"></div>
              <div className="space-y-6 sm:space-y-8 text-zinc-400 text-lg sm:text-xl md:text-2xl font-light italic leading-relaxed max-w-2xl">
                <p>
                  Advice is secondary; the re-engineering of the physics of authority is primary. The Unbounded exists at the intersection of surgical precision and infinite potential.
                </p>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-5 bg-white/[0.03] p-8 sm:p-12 md:p-16 border border-white/10 backdrop-blur-3xl relative group overflow-hidden mt-8 sm:mt-12 lg:mt-0">
             <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#b8860b]/10 blur-[120px] rounded-full group-hover:bg-[#b8860b]/20 transition-all duration-1000" />
             <h3 className="text-[8px] sm:text-[10px] font-black uppercase text-[#b8860b] mb-8 sm:mb-12 tracking-[0.3em] sm:tracking-[0.4em]">Institutional Pillars</h3>
             <ul className="space-y-8 sm:space-y-10">
               <ManifestoPoint 
                title="Architectural Determinism" 
                desc="Structure dictates destiny. Outcomes are not hoped for; systems are designed to make them mandatory." 
               />
               <ManifestoPoint 
                title="Infinite Resonance" 
                desc="Vision must maintain frequency across every layer." 
               />
             </ul>
          </div>
        </div>

        {/* Major Final CTA Block */}
        <div className="border border-[#b8860b]/30 p-10 sm:p-16 md:p-24 text-center mb-20 sm:mb-32 bg-gradient-to-b from-white/[0.02] to-transparent relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-8 sm:mb-10 leading-tight">Ready to re-code your <br/><span className="italic text-[#b8860b]">Institutional Reality?</span></h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <button 
                onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full sm:w-auto px-10 sm:px-16 py-5 sm:py-6 bg-[#b8860b] text-white text-[9px] sm:text-[11px] font-black uppercase hover:bg-white hover:text-black transition-all shadow-2xl tracking-[0.2em]"
              >
                Request Sovereign Access
              </button>
            </div>
          </div>
        </div>

        {/* Global Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 sm:gap-16 mb-16 sm:mb-20 border-t border-white/5 pt-16 sm:pt-20">
          <div className="col-span-2">
            <div className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-white tracking-tighter">THE UNBOUNDED</div>
            <p className="text-white/40 text-[9px] sm:text-[11px] leading-relaxed max-w-xs uppercase font-black mb-6 sm:mb-8 tracking-widest">
              Re-architecting leadership operating systems for global institutional authority.
            </p>
            <div className="flex gap-4">
              <a href="https://www.linkedin.com/company/the-unbounded-leadership-co" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-[#b8860b] transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h5 className="text-white text-[9px] sm:text-[11px] uppercase font-black mb-6 sm:mb-8 tracking-widest">Philosophy</h5>
            <ul className="text-white/30 text-[9px] sm:text-[11px] uppercase space-y-3 sm:space-y-4 font-bold tracking-widest">
              <li><Link to="/about" className="hover:text-[#b8860b] transition-colors uppercase">About the Firm</Link></li>
              <li><Link to="/methodology" className="hover:text-[#b8860b] transition-colors uppercase">Sovereign Protocol</Link></li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-white text-[9px] sm:text-[11px] uppercase font-black mb-6 sm:mb-8 tracking-widest">Intelligence</h5>
            <ul className="text-white/30 text-[9px] sm:text-[11px] uppercase space-y-3 sm:space-y-4 font-bold tracking-widest">
              <li><Link to="/library" className="hover:text-[#b8860b] transition-colors uppercase">Intellectual Authority</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 sm:pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 sm:gap-12">
            <div className="max-w-md text-center md:text-left">
              <p className="text-[#b8860b] text-[9px] sm:text-[11px] uppercase font-black tracking-[0.2em] mb-3 sm:mb-4">
                "Apply → Yield Calibration → Institutional Legacy."
              </p>
              <div className="text-white/20 text-[8px] sm:text-[10px] uppercase font-bold">© {new Date().getFullYear()} THE UNBOUNDED LEADERSHIP CO.</div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-[7px] sm:text-[9px] uppercase text-white/10 font-black tracking-widest">
              <button onClick={() => onLegalClick('disclosure')} className="hover:text-white transition-colors cursor-pointer">Privileged Disclosure</button>
              <button onClick={() => onLegalClick('terms')} className="hover:text-white transition-colors cursor-pointer">Terms of Authority</button>
              <button onClick={() => onLegalClick('disclaimer')} className="hover:text-white transition-colors cursor-pointer">Institutional Disclaimer</button>
            </div>
        </div>

        {/* Base Legal Disclaimer */}
        <div className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-white/[0.03] text-center">
          <p className="text-white/10 text-[7px] sm:text-[8px] uppercase font-black tracking-[0.2em] sm:tracking-[0.25em] max-w-5xl mx-auto leading-relaxed">
            PRIVILEGED DISCLOSURE: THE UNBOUNDED LEADERSHIP CO. IS A STRATEGIC ARCHITECTURE AND INSTITUTIONAL DIAGNOSTIC ADVISORY. ALL DATA TRANSMITTED DURING THE YIELD CALIBRATION PROCESS IS PROCESSED VIA EPHEMERAL ZERO DATA RETENTION (ZDR) PROTOCOLS.
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
