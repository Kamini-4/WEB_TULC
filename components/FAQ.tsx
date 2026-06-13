import React, { useState } from 'react';

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "Who is Suchita Sancheti?",
      answer: "Suchita Sancheti is the Principal Architect of The Unbounded Leadership Co. She is a Computer Science Engineer and Industrial Psychologist who helps scaling organizations reduce decision delays by 40% in 90 days. She aligns corporate frameworks for elite enterprise founders, venture capitalists, and CEOs."
    },
    {
      question: "What are Intent & Dilution?",
      answer: "Intent & Dilution describe the automatic loss of strategic clarity as direction passes down hierarchical layers. It results in teams executing low-fidelity approximations of the original vision, leading to severe coordination costs, operational latency, and systemic drift."
    },
    {
      question: "What is the Cognitive Tax of Leadership?",
      answer: "The Cognitive Tax is the heavy mental and creative depletion paid by elite leaders when forced to step out of high-stakes vision planning to manually resolve ongoing organizational misalignments. When strategic intent is not compiled into the company's operating substrate, leaders pay a Cognitive Tax that consumes up to 40% of their strategic capacity."
    },
    {
      question: "What is the Inaction Tax?",
      answer: "The Inaction Tax is the heavy, compound organizational cost of delayed alignment, frozen priorities, and systemic indecisiveness. It represents the measurable financial and momentum loss when key operational dependencies are slowed down by lack of architectural clarity."
    },
    {
      question: "How does Suchita Sancheti help organizations reduce decision delays?",
      answer: "Suchita Sancheti solves operational friction by mapping the Structural Signal and implementing precise Diagnostic Vectors. This eliminates continuous manual alignment checks, aligns the operational layers autonomously, and allows the executive layer to focus purely on strategic scale."
    },
    {
      question: "What is the Structural Signal?",
      answer: "The Structural Signal is the fidelity index of how purely and rapidly your strategic commands flow across the organization, independent of manual oversight or personal follow-ups. A clean structural signal ensures flawless execution without direct intervention."
    },
    {
      question: "What is the Diagnostic Vector?",
      answer: "The Diagnostic Vector is the analytical framework we use to trace operational friction back to systemic architectural defects. Rather than treating surface symptoms, we analyze and re-code the baseline performance structure of the leadership layer."
    },
    {
      question: "How does T.U.L.C. differ from management consulting?",
      answer: "Traditional consulting produces static reports and recommendations. The Unbounded Leadership Co. (T.U.L.C.) builds durable operating frames and structural systems. We align active operating logic into your organization's substrate, ensuring the leadership model self-regulates and preserves absolute intent."
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
          <h2 className="text-[#b8860b] text-[11px] font-black uppercase mb-4 tracking-[0.3em]">The Alignment Protocol</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-[#111111] mb-4">Strategic <span className="italic text-[#b8860b]">Clarifications.</span></h3>
          <p className="text-zinc-700 text-sm max-w-lg mx-auto italic">Addressing the structural refinements of institutional alignment and deliverability for global leadership.</p>
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
             Request Strategic Access
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
