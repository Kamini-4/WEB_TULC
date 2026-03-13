import React from 'react';

interface AssessmentProps {
  onCtaClick: () => void;
}

const Assessment: React.FC<AssessmentProps> = ({ onCtaClick }) => {
  return (
    <section id="assessment" className="py-24 bg-[#f5f5f0]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 sm:mb-20">
          <h2 className="text-[#b8860b] text-[9px] sm:text-[10px] font-bold uppercase mb-4 tracking-[0.2em]">The Yield Calibration</h2>
          <h3 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-6 sm:mb-8 text-[#111111] max-w-4xl leading-[1.1]">
            Vertical Development. <span className="italic text-[#b8860b]">Sovereignty</span> is the evolution of architectural maturity.
          </h3>
          <p className="text-zinc-600 text-base sm:text-xl max-w-3xl font-light italic leading-relaxed">
            Our calibration measures maturity across 5 Vertical Domains. We identify your primary constraint and secondary leverage points to stabilize your architecture before engineering expansion.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-200 border border-zinc-200 shadow-2xl">
          <DomainCard 
            num="I"
            title="Cognitive Authority" 
            reason="Measuring the standard of decision-making under high-stakes uncertainty. Moving from reaction to architectural command—achieving Decision Velocity."
            cost="Decision Velocity"
            points={[
              "Real-time diagnostic simulations of high-stakes board scenarios.",
              "Surgical calibration of judgment under extreme market volatility.",
              "Elimination of reactive bias through architectural command."
            ]}
          />
          <DomainCard 
            num="II"
            title="Systemic Thinking" 
            reason="Evaluating whether institutional outcomes currently rely on individual heroics or superior structural design—ensuring Design Autonomy."
            cost="Design Autonomy"
            points={[
              "Re-engineering organizational logic to remove human-dependent heroics.",
              "Designing self-regulating substrates that execute vision as natural law.",
              "Structural transition from managing drag to architecting ascent."
            ]}
          />
          <DomainCard 
            num="III"
            title="Cultural Intelligence" 
            reason="Identifying what truly governs organizational behavior when the system is placed under extreme market pressure—securing Resonant Alignment."
            cost="Resonant Alignment"
            points={[
              "Latent resonance mapping to identify invisible cultural constraints.",
              "Alignment of the leadership tier to support global institutional velocity.",
              "Hard-coding vision into the organizational nervous system."
            ]}
          />
          <DomainCard 
            num="IV"
            title="Strategic Adaptability" 
            reason="The capacity to convert external disruption into systemic advantage through autonomous substrate recalibration—maximizing Conversion Yield."
            cost="Conversion Yield"
            points={[
              "Substrate recalibration to convert external disruption into advantage.",
              "Deployment of onsite intensives for rapid architectural pivots.",
              "Maximizing conversion yield through autonomous system response."
            ]}
          />
          <DomainCard 
            num="V"
            title="Moral & Emotional Gravity" 
            reason="Evaluating the architecture of trust and intent. Does your authority compound or fracture as it scales?—building Trust Resonance."
            cost="Trust Resonance"
            points={[
              "Implementation of the Privileged Disclosure Framework for absolute trust.",
              "Architecting authority that compounds exponentially as it scales.",
              "Securing institutional permanence through moral alignment."
            ]}
          />
          
          <div className="bg-[#111111] p-10 flex flex-col justify-center text-white group h-full min-h-[450px]">
             <div className="text-[10px] uppercase text-[#b8860b] mb-4 font-black tracking-[0.3em]">Vertical Maturity Calibration</div>
             <p className="text-lg text-zinc-400 mb-8 italic font-light leading-relaxed">
               Stabilize constraints. Maximize leverage. This is not a skills test; it is an evolution of your sovereign substrate.
             </p>
             <button 
                onClick={onCtaClick}
                className="w-full py-5 bg-[#b8860b] text-white text-[11px] font-bold uppercase hover:bg-white hover:text-[#111111] transition-all shadow-xl tracking-[0.2em]"
             >
                Initiate Yield Calibration
             </button>
          </div>
        </div>
        
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-8 py-8 border-t border-zinc-200">
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-black uppercase text-zinc-400 tracking-[0.2em]">Institutional Standard:</span>
            <div className="h-[1px] w-12 bg-zinc-300"></div>
            <span className="text-[10px] font-bold text-[#b8860b] uppercase italic tracking-widest">Vertical Evolution Enabled</span>
          </div>
          <p className="text-zinc-400 text-[10px] uppercase font-black tracking-widest">Verified Alumnus Access Only</p>
        </div>
      </div>
    </section>
  );
};

const DomainCard: React.FC<{ num: string, title: string; reason: string; cost: string; points: string[] }> = ({ num, title, reason, cost, points }) => (
  <div className="group [perspective:1500px] h-full min-h-[450px]">
    <div className="relative w-full h-full transition-transform duration-1000 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
      {/* Front Face - Pure White */}
      <div className="absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] bg-white p-8 sm:p-12 flex flex-col h-full border border-zinc-100 shadow-sm">
        <div className="absolute top-0 right-0 p-4 sm:p-6 text-[#b8860b]/5 text-4xl sm:text-7xl font-black italic select-none">
          {num}
        </div>
        
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <div className="w-1 h-8 sm:h-10 bg-[#b8860b]" />
          <span className="text-[10px] sm:text-[11px] font-black uppercase text-[#b8860b] tracking-[0.2em] sm:tracking-[0.3em]">Vertical Domain {num}</span>
        </div>

        <h4 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-[#111111] leading-tight">
          {title}
        </h4>

        <p className="text-sm sm:text-base text-zinc-500 leading-relaxed mb-8 sm:mb-10 italic font-light flex-grow">
          {reason}
        </p>

        <div className="mt-auto pt-4 sm:pt-6 border-t border-zinc-50">
          <div className="text-[8px] sm:text-[9px] uppercase font-black text-zinc-400 mb-1 sm:mb-2 tracking-widest">Primary Metric:</div>
          <div className="text-xs sm:text-sm font-bold text-[#111111] uppercase tracking-widest">
            {cost}
          </div>
        </div>
      </div>

      {/* Back Face - Black and Golden with Pointers */}
      <div className="absolute inset-0 [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)] bg-[#111111] p-8 sm:p-12 flex flex-col h-full border border-[#b8860b]/30 shadow-2xl">
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <div className="w-1 h-8 sm:h-10 bg-[#b8860b]" />
          <span className="text-[10px] sm:text-[11px] font-black uppercase text-[#b8860b] tracking-[0.2em] sm:tracking-[0.3em]">Program Architecture</span>
        </div>

        <h4 className="text-base sm:text-xl font-bold mb-6 sm:mb-8 text-white leading-tight uppercase tracking-wider">
          Engineering {title}
        </h4>

        <ul className="space-y-4 sm:space-y-6 flex-grow">
          {points.map((point, i) => (
            <li key={i} className="flex gap-3 sm:gap-4 items-start">
              <div className="w-1.5 h-1.5 bg-[#b8860b] mt-1.5 sm:mt-2 shrink-0" />
              <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed italic font-light">
                {point}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6 sm:pt-8 border-t border-white/10">
          <button 
            onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
            className="w-full py-3 sm:py-4 bg-[#b8860b] text-white text-[9px] sm:text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
          >
            Request Intervention Briefing
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default Assessment;