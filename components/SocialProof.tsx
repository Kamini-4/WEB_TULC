import React from 'react';

const SocialProof: React.FC = () => {
  return (
    <section id="testimonials" className="py-40 bg-[#0a0e1a] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-[#b8860b] text-[11px] font-black uppercase mb-8 ">The Institutional Verdict</h2>
          <h3 className="text-4xl md:text-6xl font-medium leading-[1.15] text-white max-w-3xl mx-auto">
            Where structural authority meets <span className="italic text-[#b8860b]">validated results.</span>
          </h3>
          <div className="w-24 h-[1px] bg-[#b8860b] mx-auto mt-16 opacity-30"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16 mb-24">
          <TestimonialCard 
            quote="TULC didn't just coach our executive team; they re-wired how we process systemic risk. The decision-making velocity across our global portfolio has increased by 40%."
            author="Executive Chairman"
            org="Global FinTech Holdings"
          />
          <TestimonialCard 
            quote="The TULC methodology is surgical. We transitioned from fragile leader-dependence to robust institutional-resilience in 90 days. This is the new standard for board intervention."
            author="Managing Director"
            org="Tier 1 Private Equity Firm"
          />
          <TestimonialCard 
            quote="Strategic execution is no longer a matter of heroic individual effort. The architecture is now doing the heavy lifting. Our internal velocity has tripled since the redesign."
            author="Chief Executive Officer"
            org="International Infrastructure Ltd."
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-8 text-center">
           <p className="text-zinc-500 text-sm italic font-light">Validation available upon request for verified Institutional Partners.</p>
           <button 
             onClick={() => document.getElementById('intake')?.scrollIntoView({ behavior: 'smooth' })}
             className="px-12 py-5 border border-[#b8860b] text-[#b8860b] text-[11px] font-black uppercase hover:bg-[#b8860b] hover:text-white transition-all"
           >
             Request Alumnus Reference
           </button>
        </div>
      </div>
    </section>
  );
};

const TestimonialCard: React.FC<{ quote: string; author: string; org: string }> = ({ quote, author, org }) => (
  <div className="bg-white/5 p-12 border-l-2 border-[#b8860b]/30 flex flex-col h-full hover:bg-white/10 transition-all duration-700 group">
    <div className="mb-10">
      <span className="text-7xl text-[#b8860b]/10 font-serif leading-none h-6 block mb-6 group-hover:text-[#b8860b]/30 transition-all">“</span>
      <p className="text-white/70 font-light text-xl leading-[1.7] italic pr-2">
        {quote}
      </p>
    </div>
    <div className="mt-auto">
      <div className="h-[1px] w-10 bg-white/10 mb-8"></div>
      <div className="text-white text-[11px] font-bold uppercase mb-2 ">{author}</div>
      <div className="text-[#b8860b] text-[10px] uppercase font-black ">{org}</div>
    </div>
  </div>
);

export default SocialProof;