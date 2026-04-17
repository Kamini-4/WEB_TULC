
import React from 'react';
import { motion } from 'framer-motion';

const Portal: React.FC = () => {
  return (
    <div className="bg-[#111111] min-h-screen text-white pt-36 pb-24 overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at center, #b8860b 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <header className="max-w-4xl mb-24">
          <h2 className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.5em] mb-8">Proprietary Interface</h2>
          <h1 className="text-5xl md:text-8xl font-bold mb-12">The <br /><span className="italic text-[#b8860b]">Sovereign Portal.</span></h1>
          <p className="text-zinc-400 text-xl leading-relaxed italic font-light">
            Your high-fidelity terminal for institutional telemetry, diagnostic dispatches, and real-time substrate monitoring.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <div className="group border-l border-white/10 pl-8 transition-all hover:border-[#b8860b]">
              <h3 className="text-xl font-bold mb-4">Sovereign Index Tracking</h3>
              <p className="text-zinc-500 text-sm italic font-light leading-relaxed">Quantify your cognitive equity and institutional resonance across 12 strategic dimensions.</p>
            </div>
            <div className="group border-l border-white/10 pl-8 transition-all hover:border-[#b8860b]">
              <h3 className="text-xl font-bold mb-4">The Dispatch Archive</h3>
              <p className="text-zinc-500 text-sm italic font-light leading-relaxed">Direct, privileged architectural briefs delivered by the Principal Architect specifically for your substrate.</p>
            </div>
            <div className="group border-l border-white/10 pl-8 transition-all hover:border-[#b8860b]">
              <h3 className="text-xl font-bold mb-4">Substrate Telemetry</h3>
              <p className="text-zinc-500 text-sm italic font-light leading-relaxed">Real-time mapping of institutional lag and decision velocity. Visualizing the health of your architecture.</p>
            </div>
          </div>

          <div className="relative">
             <div className="bg-white/[0.03] border border-white/10 p-12 aspect-square flex flex-col justify-center items-center text-center shadow-2xl backdrop-blur-sm">
                <div className="w-16 h-16 border-2 border-[#b8860b] rotate-45 mb-12 flex items-center justify-center">
                  <div className="w-6 h-6 bg-[#b8860b]" />
                </div>
                <h4 className="text-2xl font-bold mb-6 italic text-[#b8860b]">Access Restricted.</h4>
                <p className="text-zinc-500 mb-12 text-sm max-w-xs font-light tracking-wide">
                  The Portal is reserved for Principals currently engaged in the Sovereign Protocol.
                </p>
                <div className="space-y-4 w-full max-w-xs">
                  <input type="password" placeholder="PRINCIPAL KEY" className="w-full bg-white/5 border border-white/20 p-4 text-white text-xs text-center tracking-[0.4em] focus:outline-none focus:border-[#b8860b]" />
                  <button className="w-full py-4 bg-white text-black text-[10px] font-black uppercase tracking-widest hover:bg-[#b8860b] hover:text-white transition-all">Authenticate</button>
                </div>
             </div>
             {/* Decorative elements */}
             <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#b8860b]/5 blur-[80px] rounded-full" />
             <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-[#b8860b]/5 blur-[80px] rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portal;
