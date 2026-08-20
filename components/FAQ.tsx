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
      question: "How does the 'Sovereign Voice Mapping' process work in practice? Do I have to record hours of audio?",
      answer: "No. We do not ingest passive audio or require hours of recordings. Instead, we run a highly efficient, semi-structured 60-minute cognitive interview. We present you with synthetic adversarial trade-off scenarios (Strategic Micro-Simulations). By mapping your decision boundaries, risk thresholds, and exception filters across these high-stakes vectors, we compile a mathematical decision matrix that is codified into your organization's delegation rules."
    },
    {
      question: "Can T.U.L.C. integrate with our existing tools (Slack, Teams, Notion, Jira)?",
      answer: "Yes. We do not ask your team to adopt new software. We integrate directly into your current communication and project management substrates. We redesign the reporting structures, automated alert routing, and escalation filters inside your existing stack. This eliminates up to 80% of communication noise and ensures that information flowing to you is pre-filtered for absolute strategic relevance."
    },
    {
      question: "What is the time commitment required from me (the Founder/CEO) during the 14-Day Audit?",
      answer: "We strictly respect your bandwidth. The entire Phase 0.0 Diagnostic Audit requires exactly three hours of your direct time: a 60-minute initial context briefing, a 60-minute Adversarial Mapping interview, and a 60-minute private feedback briefing to deliver your Cognitive Bandwidth Blueprint. All other telemetry and background data gathering are handled asynchronously with your operations team."
    },
    {
      question: "What does a 'metabolic leak' or 'Cognitive Tax' look like on a day-to-day basis?",
      answer: "Day-to-day, a metabolic leak manifests as: constant status-update meetings that produce no actual strategic advancement, middle managers constantly escalating trade-offs they should handle autonomously, and key executives waiting days for your approval before taking action. This inaction tax slows down your company's momentum, causes key talent burnout, and silently dilutes enterprise value."
    },
    {
      question: "We have multiple business units or a holding company structure. Can you handle multi-hub operations?",
      answer: "Yes. We regularly design alignment substrates for multi-company board members, holding corporations, and venture funds with portfolio companies across our London, New York, and Singapore hubs. We specialize in cross-entity governance protocols that preserve local operating speed while maintaining absolute strategic and fiduciary fidelity to the parent holding or investment thesis."
    },
    {
      question: "What exact scientific frameworks or methodologies are these audits based on?",
      answer: "Our diagnostics and interventions are built on self-regulating systems theory, John Sweller's Cognitive Load Theory, and first-principles complexity science. We translate these frameworks into clear organizational logic gates, ensuring your enterprise operates like a self-regulating operating model rather than a chaotic hierarchy."
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
      question: "How does architectural substrate engineering complement traditional strategic advisory?",
      answer: "Strategic advisory excels at defining market position and growth horizons, while architectural engineering focuses on execution infrastructure. T.U.L.C. bridges the gap between high-level strategy and frontline operations by engineering self-regulating corporate substrates. We install live operational logic gates and automated protocols directly into your operating infrastructure, ensuring absolute strategic fidelity and sustainable operational leverage."
    },
    {
      question: "Is the Yield Calibration or 'Strategic Alignment Audit' the complete process?",
      answer: "The digital Yield Calibration on this platform is a highly calibrated pre-diagnostic snapshot (the 'Trailer') designed for preliminary mapping. It is a precursor to the definitive, deep-dive 'Institutional Alignment Instrument' administered in-person or via our secure portal. The results of the initial diagnostic benchmark your cognitive tax and identify immediate structural quick-wins."
    },
    {
      question: "What is the tangible ROI of undergoing an alignment intervention?",
      answer: "Our clients typically experience a 40% reduction in operational decision delays within 90 days, a 15% increase in EBITDA by eliminating coordination drag, and the immediate reclamation of 30-40% of the founder's weekly cognitive capacity. This allows you to step out of daily fire dousing and assume the role of the Aligned Architect of your enterprise."
    },
    {
      question: "How do you reconcile systems architecture with human behavior and emotional burnout?",
      answer: "We treat systems architecture as the structural framework; human cognitive alignment is the living core. Systems designed for an idealized vacuum often struggle because they overlook human cognitive bandwidth. We take the reverse approach: we treat human energy, emotional clarity, and decision fatigue as the foundational constraints of any enterprise. A systems architecture that honors human cognitive limits prevents operational drift, eliminates unnecessary meeting tax, and liberates executive creative energy."
    },
    {
      question: "How does the protocol integrate human leadership with systemic architecture across the operational phases?",
      answer: "Across Phases 2 through 4, we integrate human leadership dynamics with operational systems through three core pillars: 1) Cognitive Bandwidth Optimization: We map executive decision frequency to eliminate low-level exception handling and reclaim focus for high-stakes bets. 2) Behavioral Logic Gates: Instead of relying on brute willpower or endless check-in meetings, we codify founder intent into clear, self-executing operational guardrails. 3) Safeguards Against Drift: Our long-term safeguards actively monitor organizational health signals, insulating the enterprise from operational decay and preserving founder intent across generations. In short, we architect Sovereign Systems—automated protocols that liberate human vision, intuition, and strategic execution."
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
          <h2 className="text-[#b8860b] text-[11px] font-black uppercase mb-4 ">Institutional Clearness</h2>
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
             className="px-10 py-4 bg-[#111111] text-white text-[10px] font-bold uppercase hover:bg-[#b8860b] transition-all cursor-pointer"
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
