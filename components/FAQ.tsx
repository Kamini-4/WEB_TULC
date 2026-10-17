import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, MessageSquare, ArrowRight, ShieldCheck, HelpCircle } from 'lucide-react';
import { EXECUTIVE_FAQS, FAQItemData } from '../src/data/executiveFaqData';
import { Link } from 'react-router-dom';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Decision Latency & Delegation', 'Coaching vs Architecture', 'Scaling & Sabbatical', 'Valuation & Key-Person Risk', 'Board & Cap Table', 'Payments & Engagement'];

  const filteredFaqs = EXECUTIVE_FAQS.filter(f => activeCategory === 'All' || f.category === activeCategory);

  // Schema.org FAQPage JSON-LD for rich snippets, GEO, and AEO indexing
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": EXECUTIVE_FAQS.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section id="faq" className="py-20 sm:py-24 bg-[#f5f5f0] border-t border-zinc-200 font-serif">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-[#b8860b]/30 rounded-full mb-3 text-xs font-mono uppercase tracking-widest text-[#8c6708]">
            <HelpCircle className="w-3.5 h-3.5 text-[#8c6708]" />
            <span>Executive & Governance Clarifications</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111111] tracking-tight mb-4 font-serif">
            Strategic <span className="italic text-[#b8860b] font-serif">Clarifications.</span>
          </h2>
          
          <p className="text-zinc-600 text-sm sm:text-base max-w-2xl mx-auto italic leading-relaxed font-serif">
            Uncompromised answers to the top scaling and decision bottleneck questions encountered by enterprise founders and executive boards.
          </p>
          <div className="w-12 h-[1px] bg-[#b8860b] mx-auto mt-6 opacity-30"></div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-10 max-w-3xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(null);
              }}
              className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-xs transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#111111] text-[#b8860b] font-bold border border-[#b8860b]'
                  : 'bg-white hover:bg-[#efebe2] text-zinc-700 border border-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className="bg-white border border-zinc-200 hover:border-[#b8860b]/50 rounded-xs transition-colors shadow-2xs overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[#8c6708] uppercase tracking-wider block">
                      {faq.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-[#111111] font-serif leading-snug">
                      {faq.question}
                    </h3>
                    {faq.executiveContext && (
                      <span className="text-[11px] text-zinc-400 italic block font-serif">
                        Context: {faq.executiveContext}
                      </span>
                    )}
                  </div>
                  <div className={`p-1.5 rounded-full bg-[#f7f4ee] border border-zinc-200 text-[#8c6708] shrink-0 transition-transform duration-200 mt-1 ${isOpen ? 'rotate-180' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-zinc-100 text-sm sm:text-base text-zinc-700 leading-relaxed font-serif">
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout */}
        <div className="mt-14 p-8 sm:p-10 border border-[#b8860b]/30 bg-white/70 rounded-xs text-center space-y-4 shadow-sm">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#8c6708] font-bold">
            <ShieldCheck className="w-4 h-4 text-[#8c6708]" />
            <span>Direct Principal Consultation</span>
          </div>

          <h4 className="text-xl sm:text-2xl font-bold font-serif text-[#111111]">
            Have an institutional bottleneck not addressed here?
          </h4>

          <p className="text-zinc-600 text-xs sm:text-sm italic max-w-xl mx-auto leading-relaxed">
            Reach out directly to <strong className="text-zinc-900">Suchita Sancheti</strong> via our Executive Concierge or email <a href="mailto:suchita@theunboundedleadership.com" className="text-[#8c6708] underline font-mono">suchita@theunboundedleadership.com</a> for private docket scheduling.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/intake"
              className="px-6 py-2.5 bg-[#111111] hover:bg-[#8c6708] text-white text-xs font-bold uppercase tracking-tight rounded-xs transition-colors shadow-sm"
            >
              Initiate Private Intake
            </Link>
            <Link
              to="/assessment"
              className="px-6 py-2.5 bg-white border border-zinc-300 hover:border-[#b8860b] text-[#111111] text-xs font-bold uppercase tracking-tight rounded-xs transition-colors"
            >
              Take Two-Week Diagnostic
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
