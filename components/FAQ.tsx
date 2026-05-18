import React, { useState } from 'react';

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "What is Intent Fragmentation?",
      answer: "Intent Fragmentation is the structural loss of strategic fidelity as leadership directives pass through organisational layers. T.U.L.C. diagnostic data shows an average 60% fidelity loss within three management layers, producing measurable operational overspend and cultural misalignment."
    },
    {
      question: "What is the Metabolic Tax?",
      answer: "The Metabolic Tax is the quantifiable cost of institutional friction — the financial, operational, and cultural energy wasted when leadership intent is diluted before it reaches execution. T.U.L.C. measures it through structured Metabolic Decision Audits."
    },
    {
      question: "What is the Cognitive Shadow?",
      answer: "The Cognitive Shadow is the gap between a leader's public strategic commitment and their private cognitive conviction. When this gap exists, the organisation transmits the doubt, not the strategy. It is the primary lead indicator of institutional drift."
    },
    {
      question: "What is institutional permanence?",
      answer: "Institutional permanence is the condition in which an organisation's decision logic, cultural heuristics, and leadership DNA operate with high fidelity independently of any individual's presence — persisting and scaling across leadership generations."
    },
    {
      question: "How is T.U.L.C. different from management consulting?",
      answer: "Traditional consulting produces strategic recommendations. T.U.L.C. produces permanent institutional architecture — a codified, legally structured operating logic that remains in the organisation after the engagement concludes."
    },
    {
      question: "How long does an engagement take?",
      answer: "Foundational engagements typically span 12 to 24 months, calibrated to the specific fracture profile identified in Phase 01. Dynastic Window protocols involve longer-term retainer arrangements."
    },
    {
      question: "What does the engagement investment cover?",
      answer: "Every engagement includes hundreds of architect-directed hours targeted specifically at the fracture points identified in the Institutional Fracture Report. All sessions are led directly by a T.U.L.C. Strategic Architect, not delegated to junior consultants."
    },
    {
      question: "Is T.U.L.C.'s methodology proprietary?",
      answer: "Yes. The Metabolic Decision Models are under provisional patent. The Intent Fragmentation Map, Cognitive Shadow Diagnostics, and Dynastic Code Architecture are proprietary T.U.L.C. intellectual property. Clients receive their own institutional DNA as a codified, legally structured organisational asset."
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
          <p className="text-zinc-700 text-sm max-w-lg mx-auto italic">Addressing the structural refinements of institutional sovereignty and deliverability for global leadership.</p>
          <div className="w-12 h-[1px] bg-[#b8860b] mx-auto mt-6 opacity-30"></div>
        </div>

        <div className="space-y-2">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
        
        <div className="mt-16 p-10 border border-[#b8860b]/20 bg-white/40 text-center">
           <h4 className="text-xl font-bold mb-3">Seeking specific structural refinement?</h4>
           <p className="text-zinc-600 text-sm italic mb-6">For high-resonance inquiries regarding institutional substrates in London, NYC, or Singapore, request a secure briefing.</p>
           <button 
             onClick={() => document.getElementById('intake')?.scrollIntoView({ behavior: 'smooth' })}
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