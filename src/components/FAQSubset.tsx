import React from 'react';
import { HelpCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { FAQItem } from '../data/faqData';

interface FAQSubsetProps {
  title?: string;
  subtitle?: string;
  items: FAQItem[];
  onNavigate: (target: string) => void;
  showViewAllLink?: boolean;
}

export const FAQSubset: React.FC<FAQSubsetProps> = ({
  title = 'Frequently Asked Questions',
  subtitle = 'Institutional insights on leadership architecture and founder delegation.',
  items,
  onNavigate,
  showViewAllLink = true,
}) => {
  return (
    <div className="p-4 sm:p-6 bg-[#faf7f0] border border-[#dfd7c8] rounded-md shadow-xs my-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-[#ebdcc0] gap-2">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-mono uppercase text-[#9d7b38] font-bold">
            <HelpCircle className="w-3.5 h-3.5 text-[#9d7b38]" />
            <span>Essential Executive FAQ</span>
          </div>
          <h3 className="text-base sm:text-lg font-serif font-bold text-[#17181c] mt-0.5">
            {title}
          </h3>
          <p className="text-xs text-[#6b6e76] font-mono mt-0.5">
            {subtitle}
          </p>
        </div>

        {showViewAllLink && (
          <button
            onClick={() => onNavigate('faq')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono font-bold uppercase rounded-xs bg-[#17181c] text-[#f8f6f0] hover:bg-[#9d7b38] hover:text-[#17181c] transition-colors shrink-0 cursor-pointer"
          >
            <span>View All 27 Questions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <article
            key={item.id}
            id={item.id}
            className="p-3.5 sm:p-4 bg-[#ffffff] border border-[#e8dfd0] rounded-xs shadow-2xs hover:border-[#9d7b38] transition-colors"
          >
            {/* Visible Question Heading */}
            <h4 className="text-sm sm:text-base font-serif font-bold text-[#17181c] leading-snug">
              <span className="text-[#9d7b38] font-mono text-xs mr-2 font-bold">Q{item.number}.</span>
              {item.question}
            </h4>

            {/* Answer Immediately Below It */}
            <p className="mt-2 text-xs sm:text-sm text-[#44403c] font-serif leading-relaxed">
              {item.answer}
            </p>

            {item.relevantLink && (
              <div className="mt-2.5 pt-2 border-t border-[#f2ede4] flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#9d7b38] font-bold">
                  {item.categoryLabel}
                </span>
                <button
                  onClick={() => onNavigate(item.relevantLink!.target)}
                  className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-[#17181c] hover:text-[#9d7b38] transition-colors cursor-pointer"
                >
                  <span>{item.relevantLink.label}</span>
                  <ExternalLink className="w-3 h-3 text-[#9d7b38]" />
                </button>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
};
