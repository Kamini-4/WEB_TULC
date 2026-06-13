import React from 'react';
import VideoPlayer from './VideoPlayer';

const VarianceItem: React.FC<{ num: string, title: string; desc: string }> = ({ num, title, desc }) => (
  <div className="py-8 border-b border-zinc-300 group hover:bg-white transition-all px-8 flex gap-8">
    <span className="text-[#b8860b] text-xl font-bold italic w-8">{num}</span>
    <div className="flex-grow">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1">
        <h5 className="text-xl font-bold text-[#111111] group-hover:text-[#b8860b] transition-colors">{title}</h5>
        <span className="text-[#b8860b] text-[9px] font-black uppercase opacity-40 group-hover:opacity-100 transition-opacity tracking-widest">Risk Vector {num}</span>
      </div>
      <p className="text-zinc-700 text-sm italic font-light leading-relaxed">{desc}</p>
    </div>
  </div>
);

const Problem: React.FC = () => {
  return (
    <section id="problem" className="py-16 sm:py-24 bg-[#ecece4] border-y border-zinc-200 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#111111]/[0.02] -skew-x-12 transform translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-24 items-start mb-16 sm:mb-20">
          <div>
            <h2 className="text-[#b8860b] text-[9px] sm:text-[11px] font-black uppercase mb-4 sm:mb-6 tracking-[0.3em]">The Governance Threshold</h2>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] mb-8 sm:mb-10 text-[#111111]">
              Why Traditional Governance <br />
              <span className="italic text-[#b8860b]">Fails as Complexity Scales.</span>
            </h3>
            <div className="space-y-6 sm:space-y-8 text-zinc-600 text-lg sm:text-xl leading-relaxed italic font-light">
              <p>
                Every hour spent managing tactical friction is brilliance <span className="text-[#111111] font-bold underline decoration-[#b8860b]/30 decoration-2 underline-offset-8">stolen from your legacy</span>. This isn't just an inefficiency; it is a betrayal of the vision you are meant to build. Reclaim <span className="text-[#111111] font-bold not-italic">Board-level focus</span> and <span className="text-[#111111] font-bold not-italic">strategic bandwidth</span> today.
              </p>
              
              {/* High Fidelity Video Player - Lazy Loaded to prevent browser-specific audio noise */}
              <div className="mb-8 w-full max-w-[480px]">
                <VideoPlayer 
                  videoUrl="https://drive.google.com/file/d/1435SE1X1AMP7jWn7Dwcqx9JD1kHtov7w/view?usp=drive_link" 
                  aspectRatio="portrait"
                  title="Institutional Briefing"
                  className="shadow-2xl border border-[#b8860b]/30"
                />
                <div className="mt-4 flex justify-end">
                  <span className="text-[8px] font-black text-[#b8860b] uppercase tracking-[0.3em] bg-white/95 px-3 py-1 border border-[#b8860b]/20 shadow-sm">Institutional Briefing v1.0</span>
                </div>
              </div>

              <p className="text-[#b8860b] font-bold text-xl sm:text-2xl border-l-4 border-[#b8860b] pl-6 sm:pl-8 py-2">
                "To lead through force is to accept friction. To lead through architecture is to achieve effortless alignment."
              </p>

              <div className="pt-4">
                <button 
                  onClick={() => document.getElementById('intake')?.scrollIntoView({ behavior: 'smooth' })}
                  className="px-6 sm:px-8 py-4 bg-[#111111] text-white text-[9px] sm:text-[10px] font-bold uppercase hover:bg-black transition-all shadow-lg tracking-widest"
                >
                  Secure Strategic Bandwidth
                </button>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-[9px] sm:text-[10px] font-black uppercase text-zinc-600 mb-4 sm:mb-6 tracking-widest">Evidence of Strategic Decay</h4>
            <div className="grid grid-cols-1 gap-1">
              <VarianceItem 
                num="01"
                title="Role Dislocation" 
                desc="The slow transfer of your executive focus to the upkeep of uncalibrated systems." 
              />
              <VarianceItem 
                num="02"
                title="Strategic Dilution" 
                desc="The loss of executive clarity as intent travels through complex operational layers." 
              />
              <VarianceItem 
                num="03"
                title="Executive Fatigue" 
                desc="Foundational leadership energy being consumed by reactive fixes rather than forward creation." 
              />
              <VarianceItem 
                num="04"
                title="System Inertia" 
                desc="The hidden resistance inside aging structures that slows decision-to-execution speeds." 
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-stretch justify-between gap-8 sm:gap-12 border border-[#b8860b]/20 bg-white shadow-2xl overflow-hidden">
          <div className="flex-grow p-8 sm:p-12">
            <h4 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">You are one calibration away from total institutional fact.</h4>
            <p className="text-zinc-700 text-base sm:text-lg italic font-light leading-relaxed">Stop managing the descent and start architecting the ascent. Reclaim the authority that structural noise is currently absorbing.</p>
          </div>
          <div className="bg-[#111111] p-8 sm:p-12 flex flex-col gap-4 items-center justify-center">
            <button 
              onClick={() => document.getElementById('assessment')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full px-10 sm:px-12 py-4 sm:py-5 bg-[#b8860b] text-white text-[9px] sm:text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-[#111111] transition-all whitespace-nowrap shadow-xl"
            >
              Calibrate Your System
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Problem;