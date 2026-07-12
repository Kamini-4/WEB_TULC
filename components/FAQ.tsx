import React, { useState } from 'react';
import { motion } from 'motion/react';

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "Who is Suchita Sancheti, and how does T.U.L.C. operate?",
      answer: "Suchita Sancheti is an elite enterprise architect, computer science engineer, and industrial psychologist. Serving as the Principal of The Unbounded Leadership Co. (T.U.L.C.), she builds self-regulating corporate architectures for elite founders, venture capitalists, and CEOs to systematically reduce decision delays by 40% in 90 days."
    },
    {
      question: "Why does decision-making slow down as my company scales? (The Coordination Tax)",
      answer: "As an organization grows, the number of communication lines increases exponentially. This is what John Sweller's Cognitive Load theory identifies as extraneous coordination drag. Without a Sovereign Operating Substrate™ (Patent Pending), the team is forced into constant alignment meetings, creating severe meeting bloat and executive latency. This inaction tax dilutes your founding vision, forcing you to pay a high metabolic cost—or Cognitive Tax—to keep operations aligned."
    },
    {
      question: "What is Sovereign Voice Mapping™ (Patent Pending), and how does it delegate high-stakes decisions?",
      answer: "Standard delegation fails because it transfers tasks, not the founder's mental criteria. Sovereign Voice Mapping™ (Patent Pending) is a proprietary, scientific process where we extract your precise strategic heuristics, risk tolerance, and decision-making filters, codifying them into automated operational logic gates. This allows your executive team to execute decisions with 100% of your exact values and risk appetite autonomously, keeping you in pure strategic design."
    },
    {
      question: "How does the 10-Point Friction Audit™ (Patent Pending) measure my organization's latency?",
      answer: "Our signature 10-Point Friction Audit™ (Patent Pending) analyzes ten critical vectors of organizational friction, including decision cycle times, middle-management autonomy thresholds, meeting frequency, and intent dilution. By mathematically benchmarking your executive latency, we pinpoint the exact structural leaks draining your strategic capacity and design a clear path to reclaim up to 15 hours of weekly schedule."
    },
    {
      question: "Is our company's private strategy, voice mapping, and corporate data safe? (Security & Zero Retention)",
      answer: "Absolutely. T.U.L.C. operates under a strict Zero Data Retention (ZDR) mandate. All diagnostic data and strategic inputs are processed in transient volatile memory. We do not store, sell, or train public AI models on your private corporate telemetry. Your sovereign IP remains strictly yours, protected by our Privileged Disclosure framework."
    },
    {
      question: "How is this different from hiring premium management consultants like McKinsey, Bain, or BCG?",
      answer: "Traditional consulting firms deliver expensive, static slide decks containing recommendations that middle management struggles to execute. These decks quickly become outdated. T.U.L.C. does not sell recommendations; we engineer active, self-regulating corporate substrates. We install live operational logic gates and automated protocols directly into your company's infrastructure, ensuring absolute strategic fidelity and sustainable operational leverage."
    },
    {
      question: "Is the Yield Calibration or 'Strategic Alignment Audit' the complete process?",
      answer: "The digital Yield Calibration on this platform is a highly calibrated pre-diagnostic snapshot (the 'Trailer') designed for preliminary mapping. It is a precursor to the definitive, deep-dive 'Institutional Alignment Instrument' administered in-person or via our secure portal. The results of the initial diagnostic benchmark your cognitive tax and identify immediate structural quick-wins."
    },
    {
      question: "What is the tangible ROI of undergoing an alignment intervention?",
      answer: "Our clients typically experience a 40% reduction in operational decision delays within 90 days, a 15% increase in EBITDA by eliminating coordination drag, and the immediate reclamation of 30-40% of the founder's weekly cognitive capacity. This allows you to step out of daily fire dousing and assume the role of the Aligned Architect of your enterprise."
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
