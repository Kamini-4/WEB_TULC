import React from 'react';

const Stat: React.FC<{ label: string; value: string; isFirst?: boolean; isLast?: boolean }> = ({ label, value, isFirst, isLast }) => (
  <div className={`group px-2 sm:px-4 md:px-8 ${!isFirst ? 'md:border-l border-white/10' : ''}`}>
    <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 text-white group-hover:text-[#b8860b] transition-colors duration-700 tracking-tight">
      {value}
    </div>
    <div className="text-[8px] sm:text-[10px] md:text-[11px] uppercase text-[#b8860b] font-black leading-relaxed tracking-[0.2em] sm:tracking-[0.25em]">
      {label}
    </div>
    <div className="w-6 sm:w-8 h-[1px] bg-[#b8860b]/30 mt-4 sm:mt-6 group-hover:w-full transition-all duration-700" />
  </div>
);

const InstitutionalMetrics: React.FC = () => {
  return (
    <section className="bg-[#111111] border-y border-[#b8860b]/20 py-12 sm:py-16 md:py-24 relative overflow-hidden">
      {/* Texture & Accent */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #b8860b 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 sm:gap-y-12 md:gap-y-0">
          <Stat label="Avg. Efficiency Reclamation" value="73%" isFirst />
          <Stat label="Institutional ROI" value="4.1x" />
          <Stat label="Decision Velocity Gain" value="45%" />
          <Stat label="Calibration Window" value="90d" isLast />
        </div>
        
        <div className="mt-12 sm:mt-16 flex justify-center">
          <button 
            onClick={() => document.getElementById('scale-evidence')?.scrollIntoView({ behavior: 'smooth' })}
            className="text-[8px] sm:text-[10px] font-black uppercase text-[#b8860b] tracking-[0.2em] sm:tracking-[0.3em] hover:text-white transition-colors flex items-center gap-2 sm:gap-3 group"
          >
            Examine the Physics of Scale <span className="group-hover:translate-x-2 transition-transform">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default InstitutionalMetrics;