import React from 'react';

interface MethodologyProps {
  onBriefClick: (phaseId?: string) => void;
}

const Methodology: React.FC<MethodologyProps> = ({ onBriefClick }) => {
  return (
    <section id="methodology" className="py-20 sm:py-24 md:py-32 bg-[#0a0a0a] text-white overflow-hidden relative isolate">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none -z-10">
        <img 
          src="https://picsum.photos/seed/architecture/1920/1080?grayscale&blur=2" 
          alt="Architectural Background" 
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 sm:mb-24 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-[#b8860b] text-[9px] sm:text-[11px] font-black uppercase mb-4 sm:mb-6 tracking-[0.3em] sm:tracking-[0.4em]">The Methodology</h2>
            <h3 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
              The Architecture of <span className="italic text-[#b8860b]">Inevitability.</span>
            </h3>
          </div>
          <div className="pb-2 w-full md:w-auto">
            <button 
              onClick={() => onBriefClick()}
              className="w-full md:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-[#b8860b] text-white text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500 shadow-2xl"
            >
              Request Full Protocol
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
          <PhaseCard 
            phase="01"
            title="The Diagnostic Mapping"
            subtitle="The 'What'"
            action="We deploy 'Silent Work' diagnostics to map the invisible constraints in your leadership OS."
            outcome="A 'Constraint Map' identifying exactly where your strategic intent is being diluted."
            image="https://picsum.photos/seed/audit/800/600?grayscale"
            onBriefClick={() => onBriefClick('01')}
          />
          <PhaseCard 
            phase="02"
            title="Structural Stabilization"
            subtitle="The 'How'"
            action="Onsite intensives to 'plug the leaks.' We stabilize the team’s relational and operational substrates."
            outcome="Immediate reclamation of 20-30% of your cognitive bandwidth."
            image="https://picsum.photos/seed/stabilize/800/600?grayscale"
            onBriefClick={() => onBriefClick('02')}
          />
          <PhaseCard 
            phase="03"
            title="Architectural Recalibration"
            subtitle="The 'Evolution'"
            action="Re-wiring the organizational 'nervous system' so it executes vision as natural law."
            outcome="A self-regulating leadership tier that requires 0% tactical intervention."
            image="https://picsum.photos/seed/calibration/800/600?grayscale"
            onBriefClick={() => onBriefClick('03')}
          />
          <PhaseCard 
            phase="04"
            title="Institutional Governance"
            subtitle="The 'Legacy'"
            action="Implementing 'Shadow Metrics' that allow you to monitor health without being 'in' the business."
            outcome="Total institutional permanence. Your legacy is now independent of your presence."
            image="https://picsum.photos/seed/governance/800/600?grayscale"
            onBriefClick={() => onBriefClick('04')}
          />
        </div>

        <div className="mt-16 sm:mt-24 flex flex-wrap justify-center gap-4 sm:gap-8">
          <button 
            onClick={() => document.getElementById('assessment')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 sm:px-12 py-4 sm:py-6 border border-white/20 text-white text-[9px] sm:text-[11px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] hover:border-[#b8860b] hover:text-[#b8860b] transition-all duration-500"
          >
            Initiate Phase 01
          </button>
          <button 
            onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 sm:px-12 py-4 sm:py-6 bg-white text-black text-[9px] sm:text-[11px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] hover:bg-[#b8860b] hover:text-white transition-all duration-500 shadow-2xl"
          >
            Secure Strategic Intake
          </button>
        </div>
      </div>
    </section>
  );
};

const PhaseCard: React.FC<{ 
  phase: string; 
  title: string; 
  subtitle: string; 
  action: string; 
  outcome: string;
  image: string;
  onBriefClick: () => void;
}> = ({ phase, title, subtitle, action, outcome, image, onBriefClick }) => (
  <div className="bg-[#0a0a0a] p-12 lg:p-16 group relative overflow-hidden flex flex-col h-full hover:bg-[#111111] transition-all duration-700">
    <div className="absolute top-0 right-0 w-full h-full opacity-0 group-hover:opacity-[0.05] transition-opacity duration-1000 -z-10">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
      />
    </div>

    <div className="flex justify-between items-start mb-12 gap-4">
      <div className="flex flex-col">
        <span className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.4em] mb-2">Phase {phase}</span>
        <span className="text-white/30 text-[9px] uppercase font-bold tracking-widest">{subtitle}</span>
      </div>
      <div className="text-white/5 text-6xl md:text-8xl font-black italic select-none group-hover:text-[#b8860b]/10 transition-colors duration-700">
        {phase}
      </div>
    </div>

    <h4 className="text-2xl lg:text-3xl font-bold mb-8 text-white group-hover:text-[#b8860b] transition-colors duration-500">
      {title}
    </h4>

    <div className="space-y-8 mb-12 flex-grow">
      <div>
        <div className="text-[9px] uppercase font-black text-[#b8860b] mb-3 tracking-widest opacity-60">The Action:</div>
        <p className="text-zinc-400 text-lg leading-relaxed italic font-light">
          {action}
        </p>
      </div>
      <div>
        <div className="text-[9px] uppercase font-black text-[#b8860b] mb-3 tracking-widest opacity-60">The Outcome:</div>
        <p className="text-white text-lg leading-relaxed font-medium">
          {outcome}
        </p>
      </div>
    </div>

    <div className="pt-8 border-t border-white/5">
      <button 
        onClick={onBriefClick}
        className="text-[10px] font-black uppercase text-white/40 group-hover:text-[#b8860b] tracking-[0.3em] transition-all flex items-center gap-3"
      >
        Request Briefing <span>→</span>
      </button>
    </div>
  </div>
);

export default Methodology;
