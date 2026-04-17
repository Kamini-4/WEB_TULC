import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Cpu, Zap, Shield, Heart } from 'lucide-react';

interface Domain {
  name: string;
  icon: any;
  frontDesc: string;
  backTitle: string;
  backDesc: string;
  metric: string;
  failureState: string;
}

const domains: Domain[] = [
  {
    name: "Cognitive",
    icon: Brain,
    frontDesc: "Distillation of institutional intent.",
    backTitle: "Cognitive Clarity",
    backDesc: "Does the leadership possess absolute clarity, or is intent obscured by operational noise? Calibrating this substrate reclaims up to 40% of strategic bandwidth.",
    metric: "40% Bandwidth Reclamation",
    failureState: "Strategic Drift / Decision Fatigue"
  },
  {
    name: "Systemic",
    icon: Cpu,
    frontDesc: "Structural order without intervention.",
    backTitle: "Systemic Integrity",
    backDesc: "Order as a structural property, not a behavioral choice. Systems designed to function for 30 days without principal oversight.",
    metric: "Zero-Hero Dependence",
    failureState: "Fragility / Crisis Management"
  },
  {
    name: "Strategic",
    icon: Zap,
    frontDesc: "Advantage through velocity.",
    backTitle: "Strategic Velocity",
    backDesc: "The acceleration of strategic pivots through autonomous recalibration. Converting market disruption into systemic delta.",
    metric: "3x Decision Velocity",
    failureState: "Rigidity / Market Lag"
  },
  {
    name: "Moral",
    icon: Shield,
    frontDesc: "The core that commands compliance.",
    backTitle: "Moral Gravity",
    backDesc: "An ethical core so heavy it attracts alignment naturally. Reputational maintenance becomes a structural inevitability.",
    metric: "99% Intent Fidelity",
    failureState: "Reputational Leakage / Ethical Drift"
  },
  {
    name: "Cultural",
    icon: Heart,
    frontDesc: "The soul at the operational edge.",
    backTitle: "Cultural Fidelity",
    backDesc: "The institutional 'soul' carrying absolute fidelity to the furthest edge. Excellence executing itself without direct supervision.",
    metric: "Asymptotic Resonance",
    failureState: "Operational Noise / Value Dilution"
  }
];

const FiveDomains: React.FC = () => {
  return (
    <section className="py-32 bg-[#111111] overflow-hidden relative">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#b8860b 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-[#b8860b] text-[10px] font-black uppercase mb-6 tracking-[0.5em]">The 5 Sovereign Domains</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-8">Architecting <span className="italic text-[#b8860b]">Absolute Authority.</span></h3>
          <div className="w-24 h-px bg-[#b8860b]/30 mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {domains.map((domain, idx) => (
            <DomainCard key={idx} domain={domain} index={idx} />
          ))}
        </div>

        <div className="mt-24 text-center">
           <button 
             onClick={() => document.getElementById('assessment')?.scrollIntoView({ behavior: 'smooth' })}
             className="px-12 py-6 border border-[#b8860b]/30 text-[#b8860b] text-[10px] font-black uppercase tracking-[0.4em] hover:bg-[#b8860b] hover:text-white transition-all duration-700"
           >
             Initiate Domain Audit
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
      className="relative h-[450px] w-full perspective-1000 cursor-pointer group"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full transition-all duration-700 preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        {/* Front Side */}
        <div className="absolute inset-0 backface-hidden bg-[#1a1a1a] border border-white/5 p-10 flex flex-col items-center justify-between text-center group-hover:border-[#b8860b]/30 transition-colors">
          <div className="text-[#b8860b]/20 text-6xl font-black italic">0{index + 1}</div>
          <div className="flex flex-col items-center gap-6">
            <domain.icon className="w-12 h-12 text-[#b8860b]" />
            <h4 className="text-2xl font-bold text-white uppercase tracking-widest">{domain.name}</h4>
          </div>
          <p className="text-zinc-500 text-xs italic font-light leading-relaxed">
            {domain.frontDesc}
          </p>
          <div className="text-[9px] font-black uppercase text-[#b8860b] tracking-[0.3em] opacity-40 group-hover:opacity-100 transition-opacity">
            Flip to Access ↓
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 backface-hidden bg-[#b8860b] p-10 flex flex-col justify-between text-white rotate-y-180">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 border-b border-white/20 pb-2">Diagnostic Data</div>
            <h4 className="text-2xl font-bold mb-6 leading-tight uppercase tracking-wider">{domain.backTitle}</h4>
            <p className="text-sm leading-relaxed font-medium italic mb-8">
              {domain.backDesc}
            </p>
          </div>
          
          <div className="space-y-6">
             <div>
                <div className="text-[9px] font-black uppercase tracking-widest text-black/40 mb-2">Yield Vector:</div>
                <div className="text-lg font-black uppercase tracking-widest">{domain.metric}</div>
             </div>
             <div>
                <div className="text-[9px] font-black uppercase tracking-widest text-black/40 mb-2">Failure State:</div>
                <div className="text-xs font-bold uppercase tracking-widest text-white/80">{domain.failureState}</div>
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FiveDomains;
