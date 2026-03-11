import React, { useState } from 'react';

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "How does the Sovereign Protocol facilitate institutional permanence during high-stakes CEO succession?",
      answer: "Succession is often treated as a personnel transition. We treat it as a structural handoff. By stabilizing the leadership substrate before the change, we ensure that the new CEO inherits a calibrated operating system rather than a collection of tactical fractures, preserving institutional momentum and shareholder value."
    },
    {
      question: "Is the TULC architectural intervention available for multi-national firms headquartered in London, New York, and Singapore?",
      answer: "Yes. TULC operates as a global 'silent partner' for institutional-scale firms. Our methodology is designed for the complexity of multi-national operations, with onsite intensives available in London, New York, Singapore, and Dubai. We harmonize cross-border leadership substrates to ensure unshakeable resonance across all vertical domains."
    },
    {
      question: "What distinguishes TULC's structural recalibration from traditional executive coaching or Tier-1 management consulting?",
      answer: "Executive coaching focuses on the individual; management consulting focuses on the strategy. TULC focuses on the architecture that connects them. We recalibrate the leadership operating system itself, ensuring that strategic intent is transmitted with 100% fidelity through the organizational substrate, rendering heroic human effort unnecessary."
    },
    {
      question: "How is the yield of systemic velocity and strategic intent fidelity quantified for Board-level reporting?",
      answer: "We quantify success through 'Decision Harmony' and 'Execution Yield.' Partners typically see a 45% gain in cognitive velocity and a significant reduction in the window between Board-level intent and market impact. These metrics provide the empirical evidence required for Board-grade review of architectural mastery."
    },
    {
      question: "How does the Zero Data Retention (ZDR) mandate protect privileged strategic substrates during a structural audit?",
      answer: "Privacy is our primary constraint. The ZDR mandate ensures that all privileged strategic data—from relational audits to structural diagnostics—is processed within a secure, ephemeral environment. No data is retained post-intervention, ensuring that your institutional secrets remain your own while the architectural gains remain permanent."
    }
  ];

  // JSON-LD Schema for SEO and AI Platforms
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section id="faq" className="py-24 bg-[#f5f5f0] border-t border-zinc-200">
      {/* Structured Data for AI & Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-[#b8860b] text-[11px] font-black uppercase mb-4 tracking-[0.3em]">The Sovereignty Protocol</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-[#111111] mb-4">Strategic <span className="italic text-[#b8860b]">Clarifications.</span></h3>
          <p className="text-zinc-500 text-sm max-w-lg mx-auto italic">Addressing the structural refinements of institutional sovereignty and deliverability for global leadership.</p>
          <div className="w-12 h-[1px] bg-[#b8860b] mx-auto mt-6 opacity-30"></div>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
        
        <div className="mt-16 p-10 border border-[#b8860b]/20 bg-white/40 text-center">
           <h4 className="text-xl font-bold mb-3">Seeking specific structural refinement?</h4>
           <p className="text-zinc-500 text-sm italic mb-6">For high-resonance inquiries regarding institutional substrates in London, NYC, or Singapore, request a secure briefing.</p>
           <button 
             onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
             className="px-10 py-4 bg-[#111111] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#b8860b] transition-all"
           >
             Request Sovereign Access
           </button>
        </div>
      </div>
    </section>
  );
};

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-zinc-200 py-6 group transition-all">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left focus:outline-none"
      >
        <span className="text-xl md:text-2xl font-bold text-[#111111] group-hover:text-[#b8860b] transition-colors pr-8 leading-tight">
          {question}
        </span>
        <span className={`text-2xl text-[#b8860b] transform transition-transform duration-500 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
          +
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-700 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
        <p className="text-zinc-600 text-lg leading-relaxed italic font-light max-w-3xl border-l-2 border-[#b8860b]/20 pl-8">
          {answer}
        </p>
      </div>
    </div>
  );
};

export default FAQ;