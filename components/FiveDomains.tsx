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
    subtitle: "(The CPU)",
    benefit: "Elimination of 40% Cognitive Tax. Undistorted signal flow from intent to execution.",
    pain: "Decision fatigue, tactical noise, calendar owned by Slack/email.",
    outcome: "30–45% strategic bandwidth reclaimed in 90 days. Meetings shrink. You think at title altitude.",
    vision: "Mental sovereignty. No more low-grade dread. The organization anticipates your intent before you speak it."
  },
  {
    title: "Systemic Integrity",
    subtitle: "(The Nervous System)",
    benefit: "Zero intent dilution. No 15% loss per layer. Authority that never leaks.",
    pain: "Vision corruption, constant checking, politics at the edge.",
    outcome: "Near-absolute fidelity across 12 global hubs or one. Hybrid friction disappears.",
    vision: "Institutional permanence. You can step away for weeks and the system still moves exactly as set."
  },
  {
    title: "Strategic Velocity",
    subtitle: "(The Logic Substrate)",
    benefit: "Eliminating authority dilution across the organizational substrate. Zero-latency transmission of strategic mandate.",
    pain: "15% fidelity loss per management layer. Strategic drift and operational misalignment.",
    outcome: "Near-absolute parity between board-level intent and edge-level execution.",
    vision: "Architectural infallibility. The organization becomes a high-fidelity mirror of the principal's mind."
  },
  {
    title: "Moral Gravity",
    subtitle: "(The Gravitational Center)",
    benefit: "Non-negotiable ethical & purpose substrate. Moral authority that radiates.",
    pain: "Polarization, performative purpose, constant scrutiny.",
    outcome: "Difficult calls become clean and authoritative. Talent retention becomes structural.",
    vision: "Legacy without loneliness. The system itself enforces moral consistency. Your name outlasts you."
  },
  {
    title: "Cultural Fidelity",
    subtitle: "(The DNA Reproducer)",
    benefit: "Infinite resonance. Culture architected into autonomous governance.",
    pain: "Hero-dependent culture, succession gaps, engagement managed by speeches.",
    outcome: "Zero-hero dependence. Bench strength guaranteed. Next-gen leaders emerge ready.",
    vision: "Sovereign displacement. You step out of the hero role and watch the empire run itself with greater clarity than when you carried it."
  }
];

const FiveDomains: React.FC = () => {
  return (
    <section id="domains" className="py-16 md:py-20 bg-[#0a0a0a] overflow-hidden relative border-t border-white/5">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#b8860b_1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-[#b8860b] text-[10px] font-black uppercase mb-4 tracking-[0.5em]">The 5 Sovereign Domains</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">Architecting <span className="italic text-[#b8860b]">Absolute Authority.</span></h3>
          <p className="max-w-2xl mx-auto text-zinc-700 text-sm italic font-light leading-relaxed">
            Excellence is not a habitual act, but a structural property of these five vertical domains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {domains.map((domain, idx) => (
            <DomainCard key={idx} domain={domain} index={idx} />
          ))}
        </div>

        <div className="mt-12 text-center">
           <button 
             onClick={() => document.getElementById('assessment')?.scrollIntoView({ behavior: 'smooth' })}
             className="px-10 py-5 border border-[#b8860b]/30 text-[#b8860b] text-[10px] font-black uppercase tracking-[0.4em] hover:bg-[#b8860b] hover:text-white transition-all duration-700"
           >
             Initiate Institutional Audit
           </button>
        </div>
      </div>
    </section>
  );
};

const DomainCard: React.FC<{ domain: Domain; index: number }> = ({ domain, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative h-[460px] md:h-[500px] w-full cursor-pointer group"
      style={{ perspective: '2000px' }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
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
          className="absolute inset-0 bg-[#111111] border border-white/5 p-8 flex flex-col items-center justify-between text-center group-hover:border-[#b8860b]/50 transition-all duration-700"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="text-[#b8860b]/10 text-7xl font-light italic font-serif">0{index + 1}</div>
          <div className="flex flex-col items-center gap-3">
            <h4 className="text-lg md:text-xl font-bold text-white uppercase tracking-[0.2em] leading-tight px-4">{domain.title}</h4>
            <div className="text-[10px] text-[#b8860b] font-black uppercase tracking-widest italic">{domain.subtitle}</div>
            <div className="w-12 h-px bg-[#b8860b]/30 mt-2" />
          </div>
          <p className="text-zinc-600 text-[11px] italic font-light leading-relaxed px-2">
            Analysis of {domain.title.toLowerCase()} and institutional alignment.
          </p>
          <div className="bg-white/5 p-3 rounded-full opacity-30 group-hover:opacity-100 transition-opacity">
            <svg className="w-4 h-4 text-[#b8860b] transform group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Back Side (The Diagnostic Yield) */}
        <div 
          className="absolute inset-0 bg-[#b8860b] p-8 flex flex-col justify-between text-white shadow-2xl"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="space-y-5 overflow-y-auto no-scrollbar">
            <div className="text-[9px] font-black uppercase tracking-[0.4em] mb-2 border-b border-white/20 pb-2">Institutional Yield</div>
            <h4 className="text-xl font-bold leading-tight uppercase tracking-wider font-serif italic mb-4">{domain.title}</h4>
            
            <div className="space-y-4">
              <section aria-label="Immediate Benefit">
                <span className="text-[8px] font-black uppercase tracking-widest text-black/40 block mb-1">Immediate Benefit</span>
                <p className="text-[11px] leading-relaxed font-bold">
                  {domain.benefit}
                </p>
              </section>
              
              <div className="w-full h-px bg-white/10" />
              
              <section aria-label="The Unpaid Tax">
                <span className="text-[8px] font-black uppercase tracking-widest text-black/40 block mb-1">The Unpaid Tax</span>
                <p className="text-[11px] leading-relaxed font-semibold italic">
                  {domain.pain}
                </p>
              </section>

               <div className="w-full h-px bg-white/10" />
              
              <section aria-label="90-Day Outcome">
                <span className="text-[8px] font-black uppercase tracking-widest text-black/40 block mb-1">90-Day Outcome</span>
                <p className="text-[11px] leading-relaxed font-bold">
                  {domain.outcome}
                </p>
              </section>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-white/20">
             <div className="text-[8px] font-black uppercase tracking-widest text-black/40 mb-2">Sovereignty Vision:</div>
             <div className="text-[11px] font-bold uppercase tracking-widest leading-relaxed text-[#111111]">{domain.vision}</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FiveDomains;
