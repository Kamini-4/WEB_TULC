import React from 'react';
import VideoPlayer from './VideoPlayer';

const PrincipalDispatch: React.FC = () => {
  return (
    <section id="principal" className="py-20 sm:py-24 md:py-32 bg-[#f5f5f0] overflow-hidden relative isolate">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-10 sm:gap-16 items-center">
          <div className="lg:col-span-5 relative w-full max-w-[450px] mx-auto lg:mx-0">
            <VideoPlayer 
              videoUrl="https://drive.google.com/file/d/1435SE1X1AMP7jWn7Dwcqx9JD1kHtov7w/view?usp=drive_link" 
              aspectRatio="portrait"
              title="Sovereign Briefing"
              className="shadow-2xl border border-white/10"
            />
            <div className="absolute bottom-2 left-4 sm:bottom-4 sm:left-8 pointer-events-none z-10">
              <div className="text-white text-xl sm:text-2xl font-bold mb-1 drop-shadow-lg">The Sovereign Briefing</div>
              <div className="text-[#b8860b] text-[7px] sm:text-[9px] font-black uppercase tracking-[0.4em] drop-shadow-lg">Principal Architect</div>
            </div>
            {/* Decorative Frame */}
            <div className="absolute -top-4 -left-4 sm:-top-6 sm:-left-6 w-16 h-16 sm:w-24 sm:h-24 border-t-2 border-l-2 border-[#b8860b]/30 -z-10" />
            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 w-16 h-16 sm:w-24 sm:h-24 border-b-2 border-r-2 border-[#b8860b]/30 -z-10" />
          </div>
          
          <div className="lg:col-span-7">
            <h2 className="text-[#b8860b] text-[9px] sm:text-[11px] font-black uppercase mb-6 sm:mb-8 tracking-[0.4em] sm:tracking-[0.5em]">Principal Dispatch</h2>
            <div className="space-y-6 sm:space-y-10">
              <h3 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#111111] leading-tight">
                Advice is secondary; the <span className="italic text-[#b8860b]">Physics of Authority</span> is primary.
              </h3>
              <div className="h-[2px] w-24 sm:w-32 bg-[#b8860b]"></div>
              <div className="space-y-6 sm:space-y-8 text-zinc-600 text-lg sm:text-xl md:text-2xl font-light italic leading-relaxed">
                <p>
                  "Most leadership consultancies focus on behavior. We focus on Architecture. A leader is only as sovereign as the system they command."
                </p>
                <p>
                  "My role as Principal Architect is not to 'coach' you, but to provide the surgical diagnostics required to re-engineer your organizational nervous system."
                </p>
              </div>
              
              <div className="pt-8 sm:pt-12 flex flex-wrap gap-6 sm:gap-8">
                <div className="flex flex-col">
                  <span className="text-[8px] sm:text-[10px] font-black uppercase text-zinc-400 mb-1 sm:mb-2 tracking-widest">Current Focus</span>
                  <span className="text-xs sm:text-sm font-bold text-[#111111] uppercase tracking-wider">Institutional Recalibration</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] sm:text-[10px] font-black uppercase text-zinc-400 mb-1 sm:mb-2 tracking-widest">Availability</span>
                  <span className="text-xs sm:text-sm font-bold text-[#b8860b] uppercase tracking-wider">Limited Intake</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrincipalDispatch;
