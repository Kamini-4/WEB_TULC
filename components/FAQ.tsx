import React, { useState } from 'react';
import { motion } from 'motion/react';

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "Who is Suchita Sancheti?",
      answer: "Suchita Sancheti is an elite enterprise architect, computer science engineer, and industrial psychologist. She serves as the Principal of The Unbounded Leadership Co., partnering with global founders, venture capitalists, and CEOs to align corporate frameworks and reduce decision delays by 40% in 90 days."
    },
    {
      question: "What is Intent Dilution?",
      answer: "Intent dilution is the structural degradation of strategic clarity as direction propagates down hierarchical layers. This systematic decay forces teams to execute low-fidelity approximations of the original vision, creating severe coordination drag and operational latency."
    },
    {
      question: "What is the Cognitive Tax?",
      answer: "The cognitive tax is the compound mental exhaustion and creative depletion paid by elite leadership when forced to step out of high-stakes long-term vision planning to resolve ongoing operational misalignments."
    },
    {
      question: "What is the Inaction Tax?",
      answer: "The inaction tax is the compound opportunity cost, delayed strategic alignment, frozen initiatives, and systemic indecision that occurs when scaling organizations lack durable, self-regulating operating structures."
    },
    {
      question: "How does Suchita Sancheti reduce decision delays?",
      answer: "Suchita Sancheti reduces decision delays by 40% in 90 days. This is achieved by engineering high-fidelity operational logic gates directly into the organization's substrate, automating alignment, and eliminating the need for manual, meeting-heavy alignment checks."
    },
    {
      question: "How does T.U.L.C. differ from management consulting?",
      answer: "Traditional consulting delivers static, recommendation-heavy advisory reports. The Unbounded Leadership Co. (T.U.L.C.) builds durable, self-regulating corporate architectures. We hard-code active operational systems into your company's daily substrate, ensuring absolute strategic fidelity and permanent structural autonomy."
    }
  ];

  // JSON-LD Schema for SEO and AI Platforms (Google, Perplexity, OpenAI, Gemini)
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
          <h2 className="text-[#b8860b] text-[11px] font-black uppercase mb-4 tracking-[0.3em]">Institutional Clearness</h2>
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
             onClick={() => {
               const el = document.getElementById('intake');
               if (el) {
                 el.scrollIntoView({ behavior: 'smooth' });
               } else {
                 window.location.href = '/intake';
               }
             }}
             className="px-10 py-4 bg-[#111111] text-white text-[10px] font-bold uppercase tracking-widest hover:bg-[#b8860b] transition-all cursor-pointer"
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
        className="w-full flex justify-between items-center text-left focus:outline-none cursor-pointer"
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
