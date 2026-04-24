
import React from 'react';
import { motion } from 'framer-motion';
import Insights from '../../components/Insights.tsx';
import Blog from '../../components/Blog.tsx';

interface LibraryProps {
  onArticleClick: (article: any) => void;
}

const Library: React.FC<LibraryProps> = ({ onArticleClick }) => {
  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-24 pb-24 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-16">
          <h2 className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.4em] mb-6">Intellectual Authority</h2>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            The Sovereign <br />
            <span className="italic text-[#b8860b]">Library.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-zinc-500 text-base italic font-light leading-relaxed">
            A centralized repository of institutional intelligence, strategic substrates, and real-time leadership telemetry.
          </p>
          <div className="w-16 h-[2px] bg-[#b8860b] mt-8" />
        </header>

        {/* Core Articles & Pulse */}
        <div className="-mx-6">
          <Insights onArticleClick={onArticleClick} hideHeader />
        </div>

        {/* Dynamic Dispatches */}
        <div className="mt-16 -mx-6">
          <Blog onArticleClick={onArticleClick} hideHeader />
        </div>

        {/* White Papers Section */}
        <div className="mt-16 pt-16 border-t border-white/5 pb-24">
          <h3 className="text-[10px] font-black uppercase text-zinc-400 tracking-[0.2em] mb-10 border-b border-white/10 pb-4">Architectural White Papers</h3>
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="group bg-white/5 p-10 border border-white/10 hover:border-[#b8860b]/30 transition-all duration-700">
              <span className="text-[#b8860b] text-[8px] uppercase font-black tracking-widest block mb-3">Physics of Power</span>
              <h4 className="text-2xl font-bold text-white mb-5 group-hover:text-[#b8860b] transition-colors">Sovereign Protocol: A Total Architectural Audit</h4>
              <p className="text-zinc-500 italic font-light leading-relaxed mb-8 text-sm">
                An in-depth 45-page exploration of institutional lag, cognitive insolvency, and the cybernetic transition from Charismatic to Architectural Authority.
              </p>
              <button 
                onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-[9px] font-black uppercase tracking-widest border border-white/20 px-6 py-3 hover:bg-white hover:text-black transition-all"
              >
                Download Briefing
              </button>
            </div>

            <div className="group bg-white/5 p-10 border border-white/10 hover:border-[#b8860b]/30 transition-all duration-700">
              <span className="text-[#b8860b] text-[8px] uppercase font-black tracking-widest block mb-3">Strategic Substrates</span>
              <h4 className="text-2xl font-bold text-white mb-5 group-hover:text-[#b8860b] transition-colors">Cognitive Equity: Reclaiming the Architect's seat</h4>
              <p className="text-zinc-500 italic font-light leading-relaxed mb-8 text-sm">
                Quantifying the metabolic burn rate of leadership and the systemic return on architectural integrity.
              </p>
              <button 
                onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-[9px] font-black uppercase tracking-widest border border-white/20 px-6 py-3 hover:bg-white hover:text-black transition-all"
              >
                Download Briefing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
