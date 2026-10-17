import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle, ShieldCheck, ArrowRight, Compass, Mail, Lock } from 'lucide-react';
import { EXECUTIVE_FAQS } from '../data/executiveFaqData';
import { Link } from 'react-router-dom';
import { ConciergeModal } from '../../components/ConciergeModal';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { InternalLinksMatrix } from '../components/InternalLinksMatrix';

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [conciergeOpen, setConciergeOpen] = useState(false);

  const categories = ['All', 'Decision Latency & Delegation', 'Coaching vs Architecture', 'Scaling & Sabbatical', 'Valuation & Key-Person Risk', 'Board & Cap Table', 'Payments & Engagement'];

  const filteredFaqs = EXECUTIVE_FAQS.filter(f => activeCategory === 'All' || f.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#f7f4ee] text-[#1c1917] font-serif">
      <SEOHead
        title="Executive FAQ & Founder Governance Inquiries"
        description="Authoritative answers to top founder dilemmas: stepping away, executive compensation, board management, delegation standards, and decision velocity."
        canonicalPath="/faq"
        keywords="founder faq, executive coaching vs architecture, key person risk, decision latency, scaling dilemmas, suchita sancheti"
        faqData={EXECUTIVE_FAQS.map(faq => ({ question: faq.question, answer: faq.answer }))}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Executive FAQ', path: '/faq' }
        ]}
      />
      <Breadcrumbs items={[{ name: 'Executive FAQs', path: '/faq' }]} />

      <div className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-10 sm:space-y-12">
        {/* Page Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-tight text-[#b8860b] font-bold">
            <Compass className="w-4 h-4 text-[#8c6708]" />
            <span>Executive Inquiries & Governance Dilemmas</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1c1917] tracking-tight">
            Frequently Asked Questions: <span className="italic font-bold text-[#b8860b]">The Scaling Codex</span>
          </h1>

          <p className="text-base sm:text-lg text-[#57534e] leading-relaxed">
            Direct, forensic answers addressing the most urgent founder bottlenecks, delegation friction, and governance questions raised across enterprise boardrooms and executive forums.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(null);
              }}
              className={`px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider rounded-xs transition-colors cursor-pointer ${
                activeCategory === cat
                  ? 'bg-black text-[#b8860b] font-bold border border-[#b8860b]'
                  : 'bg-white hover:bg-[#efebe2] text-zinc-700 border border-[#ded6c5]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FAQs List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-[#ded6c5] hover:border-[#b8860b]/60 rounded-xs transition-all shadow-2xs overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-[#8c6708] uppercase tracking-wider block font-bold">
                      {faq.category}
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-[#1c1917] font-serif leading-snug">
                      {faq.question}
                    </h2>
                    {faq.executiveContext && (
                      <span className="text-xs text-[#78716c] italic block font-serif">
                        Executive Context: {faq.executiveContext}
                      </span>
                    )}
                  </div>
                  <div className={`p-1.5 rounded-full bg-[#f7f4ee] border border-[#ded6c5] text-[#8c6708] shrink-0 transition-transform duration-200 mt-1 ${isOpen ? 'rotate-180' : ''}`}>
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
                      <div className="px-5 sm:px-6 pb-6 pt-2 border-t border-[#f0ebe0] text-sm sm:text-base text-[#57534e] leading-relaxed font-serif">
                        <p>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Concierge & Intake Callout */}
        <div className="p-8 sm:p-10 bg-white border border-[#b8860b]/40 rounded-xs text-center space-y-4 shadow-sm">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-[#8c6708] font-bold">
            <ShieldCheck className="w-4 h-4 text-[#8c6708]" />
            <span>Private Advisory Coordination</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold font-serif text-[#1c1917]">
            Require a Private Docket or Custom Alignment Brief?
          </h3>

          <p className="text-sm text-[#57534e] max-w-xl mx-auto leading-relaxed">
            Inquiries regarding confidential mandates, private equity portfolio alignment, or sovereign board seats are coordinated directly with Suchita Sancheti.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setConciergeOpen(true)}
              className="px-6 py-2.5 bg-black hover:bg-[#8c6708] text-white text-xs font-bold uppercase tracking-tight rounded-xs transition-colors cursor-pointer"
            >
              Open Executive Concierge
            </button>
            <Link
              to="/portal"
              className="px-6 py-2.5 bg-[#efebe2] border border-[#ded6c5] hover:border-[#b8860b] text-[#1c1917] text-xs font-mono uppercase font-bold tracking-wider rounded-xs transition-colors inline-flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5 text-[#8c6708]" />
              <span>Enter Clearance Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </div>

    {/* Institutional Internal Linking Matrix */}
    <InternalLinksMatrix currentPath="/faq" />

    <ConciergeModal isOpen={conciergeOpen} onClose={() => setConciergeOpen(false)} />
  </div>
);
};

export default FAQPage;
