import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Cpu, Zap, Shield, Heart } from 'lucide-react';

interface Domain {
  name: string;
  frontDesc: string;
  expectedYield: string;
  unpaidTax: string;
  symptom: string;
  backTitle: string;
}

const domains: Domain[] = [
  {
    name: "Cognitive",
    frontDesc: "The architecture of the Principal's mind.",
    backTitle: "Cognitive Sovereignty",
    expectedYield: "Absolute Strategic Bandwidth. Decision velocity that out-paces market volatility by 10x.",
    unpaidTax: "Hero Fatigue Tax. The literal burning of your intellectual capital on trivial operational variances.",
    symptom: "The Principal is the definitive bottleneck for every high-stakes decision in the enterprise."
  },
  {
    name: "Systemic",
    frontDesc: "Structural order as an autonomous property.",
    backTitle: "Systemic Integrity",
    expectedYield: "Zero-Intervention Continuity. A foundation that functions with absolute fidelity in your absence.",
    unpaidTax: "Intervention Debt. The compounded cost of constant firefighting and hero-led operations.",
    symptom: "Significant operational degradation within 72 hours of the Principal's strategic withdrawal."
  },
  {
    name: "Strategic",
    frontDesc: "Advantage through velocity and design.",
    backTitle: "Strategic Velocity",
    expectedYield: "Market Arbitrage. The ability to pivot the institutional vessel with zero structural friction.",
    unpaidTax: "Lag Penalty. The invisible erosion of market cap due to rigid logic and reactive positioning.",
    symptom: "Identifying profound market shifts only after competitors have already captured the alpha."
  },
  {
    name: "Moral",
    frontDesc: "The gravity of institutional intent.",
    backTitle: "Moral Gravity",
    expectedYield: "Effortless Alignment. An ethical core so heavy it anchors the entire global workforce naturally.",
    unpaidTax: "Compliance Friction. The massive overhead required to enforce standards that should be natural laws.",
    symptom: "High attrition of Tier 1 talent and persistent deviations from core institutional standards."
  },
  {
    name: "Cultural",
    frontDesc: "Resonance from the source to the edge.",
    backTitle: "Cultural Fidelity",
    expectedYield: "Pure Intent Resonance. Brilliance executing itself at the periphery without supervision.",
    unpaidTax: "Signal Dilution. The 80% loss of strategic fidelity as intent passes through organizational static.",
    symptom: "Front-line decisions that fundamentally contradict boardroom strategy, requiring constant intervention."
  }
];

const FiveDomains: React.FC = () => {
  return (
    <section className="py-32 bg-[#111111] overflow-hidden relative border-t border-white/5">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#b8860b 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <h2 className="text-[#b8860b] text-[10px] font-black uppercase mb-6 tracking-[0.5em]">The 5 Sovereign Domains</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-8">Architecting <span className="italic text-[#b8860b]">Absolute Authority.</span></h3>
          <p className="max-w-2xl mx-auto text-zinc-500 text-sm italic font-light leading-relaxed">
            Excellence is not a habitual act, but a structural property of these five vertical domains.
          </p>
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
      className="relative h-[480px] w-full perspective-1000 cursor-pointer group"
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
        <div className="absolute inset-0 backface-hidden bg-[#111111] border border-white/5 p-10 flex flex-col items-center justify-between text-center group-hover:border-[#b8860b]/50 transition-all duration-500">
          <div className="text-[#b8860b]/10 text-7xl font-light italic font-serif">0{index + 1}</div>
          <div className="flex flex-col items-center gap-2">
            <h4 className="text-xl font-bold text-white uppercase tracking-[0.2em]">{domain.name}</h4>
            <div className="w-8 h-px bg-[#b8860b]/30" />
            <div className="text-[10px] text-[#b8860b] font-black uppercase tracking-widest mt-2 italic">Domain</div>
          </div>
          <p className="text-zinc-500 text-xs italic font-light leading-relaxed">
            {domain.frontDesc}
          </p>
          <div className="bg-white/5 p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-4 h-4 text-[#b8860b]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 backface-hidden bg-[#b8860b] p-10 flex flex-col justify-between text-white rotate-y-180 shadow-2xl">
          <div className="space-y-6">
            <div className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 border-b border-white/20 pb-2">Institutional Yield</div>
            <h4 className="text-2xl font-bold leading-tight uppercase tracking-wider font-serif italic">{domain.backTitle}</h4>
            
            <div className="space-y-4">
              <div>
                <span className="text-[9px] font-black uppercase tracking-widest text-black/40 block mb-1">Expected Yield</span>
                <p className="text-xs leading-relaxed font-semibold">
                  {domain.expectedYield}
                </p>
              </div>
              
              <div className="w-full h-px bg-white/10" />
              
              <div>
                <span className="text-[9px] font-black uppercase tracking-widest text-black/40 block mb-1">The Unpaid Tax</span>
                <p className="text-xs leading-relaxed font-medium italic opacity-90">
                  {domain.unpaidTax}
                </p>
              </div>
            </div>
          </div>
          
          <div className="p-4 bg-black/10 border border-white/10">
             <div className="text-[9px] font-black uppercase tracking-widest text-black/40 mb-2">Organizational Symptom:</div>
             <div className="text-[11px] font-bold uppercase tracking-widest leading-relaxed text-black/80">{domain.symptom}</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default FiveDomains;
