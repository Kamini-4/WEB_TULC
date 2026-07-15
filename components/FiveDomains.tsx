import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Cpu, Zap, Shield, Heart } from 'lucide-react';

interface Domain {
  title: string;
  subtitle: string;
  benefit: string;
  pain: string;
  outcome: string;
  vision: string;
}

const domains: Domain[] = [
  {
    title: "Cognitive Clarity",
    subtitle: "Executive Decision Flow",
    benefit: "Reclaim up to 40% of the executive schedule by eliminating unnecessary operational decision-making.",
    pain: "Calendar packed with low-impact review meetings, constant fire-fighting, and high daily decision fatigue.",
    outcome: "Strategic time reallocated to capital allocation, growth planning, and business development within 90 days.",
    vision: "A structured executive office with zero daily operational bottlenecks and absolute priority clarity."
  },
  {
    title: "Systemic Integrity",
    subtitle: "Organizational Architecture",
    benefit: "Maintains consistent strategic alignment and execution standards across all operating divisions.",
    pain: "Inconsistent performance across departments, continuous follow-ups, and operational drift as the company scales.",
    outcome: "Standard operating procedures execute reliably without constant oversight or manual intervention.",
    vision: "A stable and predictable workflow that functions reliably regardless of supervisor presence."
  },
  {
    title: "Strategic Velocity",
    subtitle: "Operational Directives",
    benefit: "Accelerates response times and reduces delays when deploying new board-approved initiatives.",
    pain: "Delays in executing strategic decisions caused by complex management layers and priority misalignment.",
    outcome: "Execution of major operational initiatives matches initial plans precisely and meets scheduled timelines.",
    vision: "A responsive team structure that translates executive decisions into market action in real time."
  },
  {
    title: "Moral Gravity",
    subtitle: "Governance & Compliance",
    benefit: "Establishes institutional compliance, clear corporate governance, and cohesive standards of conduct.",
    pain: "Internal policy friction, potential reputational risk, and reactive handling of governance challenges.",
    outcome: "A unified culture of accountability and compliance that reduces regulatory and legal risks.",
    vision: "A robust governance framework that enforces ethical standards, protecting long-term enterprise value."
  },
  {
    title: "Cultural Fidelity",
    subtitle: "Business Continuity",
    benefit: "Guarantees institutional memory, succession readiness, and organizational stability.",
    pain: "Dependency on key personnel, high risk on critical exits, and key-man talent liabilities.",
    outcome: "Clearly defined career paths, documented leadership criteria, and a prepared internal talent pipeline.",
    vision: "Long-term operational resilience driven by repeatable talent-pipeline processes and succession plans."
  }
];

const FiveDomains: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  return (
    <section 
      id="domains" 
      className="py-16 bg-[#0a0a0a] overflow-hidden relative border-t border-white/5"
    >
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#b8860b_1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-[#b8860b] text-[10px] font-black uppercase mb-3 tracking-[0.5em] flex flex-wrap items-center justify-center gap-2">
            <span>The 5 Sovereign Domains</span>
            <span className="text-[7px] bg-[#b8860b]/10 text-[#b8860b] px-1.5 py-0.5 border border-[#b8860b]/30 normal-case tracking-normal">Provisional Patent Filed</span>
          </h2>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">Systemic Alignment <span className="italic text-[#b8860b]">At Scale.</span></h3>
          <p className="max-w-2xl mx-auto text-zinc-400 text-xs sm:text-sm italic font-light leading-relaxed mb-4">
            Strategic performance is a direct result of clear structural design across five fundamental operational dimensions.
          </p>
          {/* Diagnostic Active Status Bar */}
          <div className="flex justify-center items-center gap-2 mt-4">
            {domains.map((_, idx) => (
              <button
                key={idx}
                onMouseEnter={() => setActiveIdx(idx)}
                onMouseLeave={() => setActiveIdx(null)}
                onClick={() => {
                  setActiveIdx(activeIdx === idx ? null : idx);
                }}
                className={`h-1.5 transition-all duration-500 rounded-full ${idx === activeIdx ? 'w-8 bg-[#b8860b]' : 'w-2 bg-zinc-700 hover:bg-zinc-500'}`}
                aria-label={`Go to domain ${idx + 1}`}
              />
            ))}
            <span className="text-[8px] font-mono text-zinc-500 uppercase tracking-widest ml-2 flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${activeIdx !== null ? 'bg-[#b8860b] animate-pulse' : 'bg-zinc-600'}`} />
              {activeIdx !== null ? `DOMAIN 0${activeIdx + 1} ENGAGED` : "READY FOR PROTOCOL SCAN"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {domains.map((domain, idx) => (
            <DomainCard 
              key={idx} 
              domain={domain} 
              index={idx} 
              isFlipped={activeIdx === idx}
              onMouseEnter={() => {
                setActiveIdx(idx);
              }}
              onMouseLeave={() => {
                setActiveIdx(null);
              }}
              onClick={() => {
                setActiveIdx(activeIdx === idx ? null : idx);
              }}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
           <button 
             onClick={() => document.getElementById('assessment')?.scrollIntoView({ behavior: 'smooth' })}
             className="px-8 py-4 border border-[#b8860b]/30 text-[#b8860b] text-[10px] font-black uppercase tracking-[0.4em] hover:bg-[#b8860b] hover:text-white transition-all duration-700"
           >
             Initiate Institutional Audit
           </button>
        </div>
      </div>
    </section>
  );
};

const DomainCard: React.FC<{ 
  domain: Domain; 
  index: number; 
  isFlipped: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}> = ({ domain, index, isFlipped, onMouseEnter, onMouseLeave, onClick }) => {

  return (
    <div 
      className="relative h-[380px] sm:h-[400px] md:h-[420px] w-full cursor-pointer group"
      style={{ perspective: '2000px' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      role="button"
      aria-expanded={isFlipped}
      aria-label={`Sovereign Domain: ${domain.title}`}
    >
      <motion.div
        className="relative w-full h-full shadow-2xl"
        style={{ 
          transformStyle: 'preserve-3d',
          willChange: 'transform'
        }}
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ 
          type: "tween", 
          ease: [0.23, 1, 0.32, 1], // Custom cubic-bezier for strategic motion
          duration: 0.8 
        }}
      >
        {/* Front Side */}
        <div 
          className="absolute inset-0 bg-[#111111] border border-white/5 p-6 flex flex-col items-center justify-between text-center group-hover:border-[#b8860b]/50 transition-all duration-700"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="text-[#b8860b]/10 text-5xl font-light italic font-serif">0{index + 1}</div>
          <div className="flex flex-col items-center gap-2">
            <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-[0.15em] leading-tight px-2">{domain.title}</h4>
            <div className="text-[9px] text-[#b8860b] font-black uppercase tracking-widest italic">{domain.subtitle}</div>
            <div className="w-10 h-px bg-[#b8860b]/30 mt-1.5" />
          </div>
          <p className="text-zinc-400 text-[10px] italic font-light leading-relaxed px-1">
            Analysis of {domain.title.toLowerCase()} and strategic alignment metrics.
          </p>
          <div className="bg-white/5 p-2 rounded-full opacity-30 group-hover:opacity-100 transition-opacity">
            <svg className="w-3.5 h-3.5 text-[#b8860b] transform group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Back Side (The Diagnostic Yield) */}
        <div 
          className="absolute inset-0 bg-[#151515] border-2 border-[#b8860b]/40 p-5 flex flex-col justify-between text-white shadow-2xl"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="space-y-4 overflow-y-auto no-scrollbar">
            <div className="text-[8px] font-black uppercase tracking-[0.4em] mb-1.5 border-b border-white/20 pb-1.5 text-[#b8860b]">Diagnostic Value</div>
            <h4 className="text-sm sm:text-base font-bold leading-tight uppercase tracking-wider font-serif italic mb-2.5">{domain.title}</h4>
            
            <div className="space-y-3 text-left">
              <section aria-label="Key Operational Benefit">
                <span className="text-[8px] font-black uppercase tracking-widest text-[#b8860b] block mb-0.5">Key Operational Benefit</span>
                <p className="text-[10px] leading-relaxed font-medium text-zinc-200">
                  {domain.benefit}
                </p>
              </section>
              
              <div className="w-full h-px bg-white/10" />
              
              <section aria-label="Organizational Friction">
                <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500 block mb-0.5">Organizational Friction</span>
                <p className="text-[10px] leading-relaxed font-semibold italic text-red-400/90">
                  {domain.pain}
                </p>
              </section>
              
              <div className="w-full h-px bg-white/10" />
              
              <section aria-label="Expected Benchmark Outcome">
                <span className="text-[8px] font-black uppercase tracking-widest text-emerald-400 block mb-0.5">Expected Benchmark Outcome</span>
                <p className="text-[10px] leading-relaxed font-bold text-zinc-100">
                  {domain.outcome}
                </p>
              </section>
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-white/10 text-left">
             <div className="text-[7px] font-black uppercase tracking-widest text-zinc-400 mb-1">Operational Vision:</div>
             <div className="text-[9px] font-bold uppercase tracking-widest leading-relaxed text-[#b8860b]">{domain.vision}</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FiveDomains;
