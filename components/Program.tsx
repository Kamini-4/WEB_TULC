import React from 'react';

interface ProgramProps {
  onBriefClick: (phaseId?: string) => void;
}

const Program: React.FC<ProgramProps> = ({ onBriefClick }) => {
  return (
    <section id="program" className="py-24 bg-[#ecece4] isolate overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-start">
          <div className="md:col-span-4 sticky top-32 z-10">
            <h2 className="text-[#b8860b] text-[10px] font-bold uppercase mb-4 tracking-[0.3em]">The Intervention</h2>
            <h3 className="text-3xl md:text-4xl font-bold leading-tight mb-6 text-[#111111]">
              Total Architecture.
            </h3>
            <p className="text-zinc-600 mb-8 leading-relaxed font-normal italic">
              A 6-9 month modular evolution of your leadership operating system. We stabilize constraints first, utilizing onsite intensives and silent work to achieve unshakeable institutional resonance.
            </p>
            <div className="space-y-4">
              <button 
                onClick={() => document.getElementById('intake')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full px-10 py-5 bg-[#111111] text-white text-[10px] font-black uppercase tracking-widest hover:bg-[#b8860b] transition-all shadow-xl"
              >
                Request Access
              </button>
              <button 
                onClick={() => document.getElementById('assessment')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full px-10 py-5 border border-[#111111] text-[#111111] text-[10px] font-black uppercase tracking-widest hover:bg-[#111111] hover:text-white transition-all shadow-sm"
              >
                Start Yield Calibration
              </button>
            </div>
            <div className="mt-12 p-8 border border-[#b8860b]/20 bg-white/50 backdrop-blur-sm">
              <h4 className="text-[9px] font-black uppercase text-zinc-400 mb-4 tracking-widest">The Format Mix</h4>
              <ul className="space-y-3 text-[10px] font-bold text-zinc-800 uppercase tracking-widest">
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#b8860b]" /> Onsite Intensives</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#b8860b]" /> Office-Led Diagnostics</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#b8860b]" /> Closed-Door Labs</li>
                <li className="flex items-center gap-2"><div className="w-1 h-1 bg-[#b8860b]" /> Silent Structural Work</li>
              </ul>
            </div>
          </div>
          
          <div className="md:col-span-8 space-y-8 relative z-0">
            <TimelineStep 
              step="01" 
              title="Diagnostic Interpretation & Constraint Stabilization" 
              description="Phase 0. Surgical identification of primary constraints within your vertical domains. We stabilize fractures before initiating the OS recalibration—identifying Board-level risks and immediate efficiency gains."
              onBriefClick={() => onBriefClick()}
            />
            <TimelineStep 
              step="02" 
              title="Domain-Specific Intervention Tracks" 
              description="Deploying onsite intensives and executive field assignments to evolutionize the mental, relational, and systemic substrates of your authority—calibrating for succession readiness and leadership depth."
              onBriefClick={() => onBriefClick()}
            />
            <TimelineStep 
              step="03" 
              title="Shadow Metrics & Board-Grade Review" 
              description="Utilizing metrics invisible to the internal eye to verify that your culture now self-regulates and your strategy executes without heroics—verifying institutional permanence and long-term value."
              onBriefClick={() => onBriefClick()}
            />

            <div className="mt-12 p-10 bg-[#111111] text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-2xl">
              <div className="text-left">
                <h4 className="text-xl font-bold mb-2">Initialize Total Architecture?</h4>
                <p className="text-zinc-400 text-sm italic font-light">Available for Q3/Q4 2026 Board Intake.</p>
              </div>
              <button 
                onClick={() => document.getElementById('intake')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-12 py-5 bg-[#b8860b] text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
              >
                Inquire Regarding Intake
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TimelineStep: React.FC<{ step: string; title: string; description: string; onBriefClick: (phaseId?: string) => void }> = ({ step, title, description, onBriefClick }) => (
  <div className="flex flex-col sm:flex-row gap-8 pb-12 border-b border-zinc-200 last:border-0 group">
    <div className="text-[#b8860b]/20 text-5xl font-bold leading-none shrink-0 group-hover:text-[#b8860b]/40 transition-colors">{step}</div>
    <div className="flex-grow min-w-0">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-4">
        <h4 className="text-xl font-bold text-[#111111] leading-tight max-w-md min-w-0">{title}</h4>
        <button 
          onClick={() => onBriefClick()}
          className="text-[9px] font-black uppercase text-zinc-400 hover:text-[#b8860b] tracking-widest transition-all whitespace-nowrap shrink-0"
        >
          Request Briefing →
        </button>
      </div>
      <p className="text-zinc-600 text-base leading-relaxed max-w-xl font-normal italic mb-6">{description}</p>
      <div className="flex flex-wrap gap-4">
        <button 
          onClick={() => onBriefClick()}
          className="text-[9px] font-black uppercase text-[#b8860b] tracking-widest border border-[#b8860b]/20 px-6 py-3 hover:bg-[#b8860b] hover:text-white transition-all"
        >
          Request Syllabus
        </button>
        <button 
          onClick={() => document.getElementById('intake')?.scrollIntoView({ behavior: 'smooth' })}
          className="text-[9px] font-black uppercase text-zinc-400 tracking-widest px-6 py-3 hover:text-[#111111] transition-all"
        >
          View Outcome Review
        </button>
      </div>
    </div>
  </div>
);

export default Program;