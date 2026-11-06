import React, { useState, useMemo, useEffect } from 'react';
import { 
  HelpCircle, 
  Search, 
  Copy, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink, 
  Layers, 
  UserCheck, 
  Globe2, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { SEOHead } from './SEOHead';
import { FAQ_ITEMS, FAQ_CATEGORIES, FAQItem } from '../data/faqData';

interface FAQPageProps {
  onNavigate: (target: string) => void;
  onOpenConsultation?: () => void;
}

export const FAQPage: React.FC<FAQPageProps> = ({ onNavigate, onOpenConsultation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedFaqId, setCopiedFaqId] = useState<string | null>(null);

  // Handle URL hash anchor scrolling (e.g. /faq#faq-6)
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, []);

  const copyQuestionLink = (faqId: string) => {
    try {
      const url = `${window.location.origin}/faq#${faqId}`;
      navigator.clipboard.writeText(url);
      setCopiedFaqId(faqId);
      setTimeout(() => setCopiedFaqId(null), 2000);
    } catch {
      setCopiedFaqId(faqId);
      setTimeout(() => setCopiedFaqId(null), 2000);
    }
  };

  // Filter questions based on category and search query
  const filteredFaqs = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesQuery = 
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.categoryLabel.toLowerCase().includes(q) ||
        `q${item.number}`.includes(q) ||
        item.number.toString() === q;

      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  // Generate Schema.org FAQPage structured data
  const faqSchema = useMemo(() => {
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': FAQ_ITEMS.map((item) => ({
        '@type': 'Question',
        'name': item.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': item.answer
        }
      }))
    };
  }, []);

  return (
    <div className="bg-[#f8f6f0] text-[#17181c] min-h-screen py-6 sm:py-10">
      <SEOHead
        title="Corporate FAQ & Leadership Architecture Guide | The Unbounded Leadership Co."
        description="Official 27-question guide on founder dependency, leadership architecture, decision rights, and organizational alignment by Suchita Sancheti."
        canonicalPath="/faq"
        keywords="founder dependency FAQ, leadership architecture FAQ, global leadership consultancy, decision rights, organizational alignment, Suchita Sancheti, delegation outcomes"
      />

      {/* JSON-LD Schema.org FAQPage script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Hero Section */}
        <header className="max-w-3xl mx-auto text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs bg-[#f0eade] border border-[#dfd7c8] text-[#9d7b38] font-mono text-xs uppercase tracking-wider font-bold mb-3">
            <Globe2 className="w-3.5 h-3.5" />
            <span>Global Leadership Consultancy · Founded by Suchita Sancheti</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-serif text-[#17181c] tracking-tight leading-tight">
            Leadership Architecture & Governance FAQ
          </h1>

          <p className="mt-3 text-sm sm:text-base text-[#575a63] font-serif leading-relaxed max-w-2xl mx-auto">
            Twenty-seven definitive institutional answers addressing founder dependency, decision bottlenecks, global alignment, and self-sustaining organizational structures.
          </p>

          {/* Quick Key Fact Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-[11px] font-mono text-[#6b6e76]">
            <span className="px-2.5 py-1 bg-[#ffffff] border border-[#d8cebe] rounded-xs font-semibold text-[#17181c]">
              27 Verified Institutional Answers
            </span>
            <span className="px-2.5 py-1 bg-[#ffffff] border border-[#d8cebe] rounded-xs font-semibold text-[#17181c]">
              5 Foundational Operating Categories
            </span>
            <span className="px-2.5 py-1 bg-[#ffffff] border border-[#d8cebe] rounded-xs font-semibold text-[#9d7b38]">
              Schema.org FAQPage Validated
            </span>
          </div>
        </header>

        {/* Real-time Search & Category Navigation Bar */}
        <div className="bg-[#ffffff] border border-[#dfd7c8] p-4 sm:p-5 rounded-md shadow-xs mb-8 space-y-4">
          
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#9d7b38] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, keyword, or question (e.g. 'delegation', 'bottleneck', 'family office', 'decision rights')..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm font-serif bg-[#fbf9f5] border border-[#d8cebe] rounded-xs focus:outline-none focus:border-[#9d7b38] focus:bg-[#ffffff] text-[#17181c] placeholder:text-[#8c8f99] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#6b6e76] hover:text-[#17181c] cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#f0eade]">
            {FAQ_CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              const count = cat.id === 'all' 
                ? FAQ_ITEMS.length 
                : FAQ_ITEMS.filter(i => i.category === cat.id).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 text-xs font-mono font-medium rounded-xs transition-colors cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#17181c] text-[#f8f6f0] font-bold shadow-2xs'
                      : 'bg-[#faf6ee] text-[#555861] hover:bg-[#ede5d6] hover:text-[#17181c] border border-[#e2d8c7]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-2xs ${
                    isActive ? 'bg-[#9d7b38] text-[#17181c]' : 'bg-[#e8decb] text-[#6b6e76]'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between pb-3 mb-4 text-xs font-mono text-[#6b6e76] border-b border-[#dfd7c8]">
          <span>
            Displaying <strong className="text-[#17181c] font-bold">{filteredFaqs.length}</strong> of {FAQ_ITEMS.length} questions
          </span>
          {searchQuery && (
            <span className="text-[#9d7b38]">
              Filtered by: "{searchQuery}"
            </span>
          )}
        </div>

        {/* FAQ List with Visible Question Heading & Answer Immediately Below */}
        <div className="space-y-5">
          {filteredFaqs.map((faq) => {
            const isCopied = copiedFaqId === faq.id;

            return (
              <article
                key={faq.id}
                id={faq.id}
                className="p-5 sm:p-6 bg-[#ffffff] border border-[#dfd7c8] hover:border-[#9d7b38] rounded-xs shadow-2xs transition-all scroll-mt-24 group"
              >
                {/* Meta Ribbon: Number, Category & 1-Click Copy Link */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2 mb-3 border-b border-[#f4ede2]">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-2xs bg-[#faf6ee] text-[#9d7b38] border border-[#ebdcc0]">
                      Question {faq.number}
                    </span>
                    <span className="text-[11px] font-mono text-[#6b6e76]">
                      {faq.categoryLabel}
                    </span>
                  </div>

                  <button
                    onClick={() => copyQuestionLink(faq.id)}
                    title={`Copy direct link for Question ${faq.number}`}
                    className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-1 rounded-2xs bg-[#faf6ee] hover:bg-[#17181c] text-[#17181c] hover:text-[#f8f6f0] border border-[#dfd7c8] transition-colors cursor-pointer"
                  >
                    {isCopied ? (
                      <>
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-700 font-bold">Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 text-[#9d7b38]" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Visible Heading Immediately Above the Answer */}
                <h2 className="text-base sm:text-lg lg:text-xl font-serif font-bold text-[#17181c] leading-snug tracking-tight">
                  {faq.question}
                </h2>

                {/* Answer Immediately Below the Heading */}
                <p className="mt-3 text-[13.5px] sm:text-[15px] font-serif text-[#33363f] leading-relaxed">
                  {faq.answer}
                </p>

                {/* Relevant Resource / Context Link */}
                {faq.relevantLink && (
                  <div className="mt-4 pt-3 border-t border-[#f4ede2] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <span className="text-[11px] font-mono text-[#8a8d96] italic">
                      Explore grounded architecture in this domain:
                    </span>
                    <button
                      onClick={() => onNavigate(faq.relevantLink!.target)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#17181c] hover:text-[#9d7b38] transition-colors self-start sm:self-auto cursor-pointer group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>{faq.relevantLink.label}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#9d7b38]" />
                    </button>
                  </div>
                )}
              </article>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="p-8 text-center bg-[#ffffff] border border-[#dfd7c8] rounded-md space-y-3">
              <HelpCircle className="w-8 h-8 text-[#9d7b38] mx-auto opacity-70" />
              <h3 className="text-base font-serif font-bold text-[#17181c]">
                No matching questions found
              </h3>
              <p className="text-xs text-[#6b6e76] font-mono max-w-md mx-auto">
                No questions matched your search query "{searchQuery}". Try searching for broader terms such as "delegation", "accountability", "alignment", or "architecture".
              </p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="px-4 py-2 text-xs font-mono uppercase font-bold bg-[#17181c] text-[#f8f6f0] rounded-xs hover:bg-[#9d7b38] hover:text-[#17181c] transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Editorial Guidance & Publication Covenant Card */}
        <div className="mt-12 p-6 sm:p-8 bg-[#faf6ee] border border-[#ebdcc0] rounded-md shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#9d7b38] font-bold">
            <Sparkles className="w-4 h-4 text-[#9d7b38]" />
            <span>Institutional Perspective · Suchita Sancheti</span>
          </div>

          <h3 className="text-lg sm:text-xl font-serif font-bold text-[#17181c]">
            About The Unbounded Leadership Co. & Our Global Focus
          </h3>

          <p className="text-xs sm:text-sm text-[#44403c] font-serif leading-relaxed">
            The Unbounded Leadership Co. is a global leadership consultancy founded by Suchita Sancheti. We work with founders, CEOs and senior leadership teams in enterprise organisations, high-growth scale-ups and family offices worldwide. Our work focuses on leadership architecture: designing clearer ownership, decision authority and operating structures so that organisational performance depends less on constant intervention from individual leaders.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
            <div className="p-3 bg-[#ffffff] border border-[#e2d8c7] rounded-xs">
              <span className="font-bold text-[#17181c] block">3-Stage Protocol</span>
              <span className="text-[#6b6e76] text-[11px] mt-0.5 block">Baseline Audit · Structural Transformation · Sustained Alignment</span>
            </div>
            <div className="p-3 bg-[#ffffff] border border-[#e2d8c7] rounded-xs">
              <span className="font-bold text-[#17181c] block">5 Aligned Domains</span>
              <span className="text-[#6b6e76] text-[11px] mt-0.5 block">Cognitive Clarity · Systemic Integrity · Velocity · Moral Gravity · Fidelity</span>
            </div>
            <div className="p-3 bg-[#ffffff] border border-[#e2d8c7] rounded-xs">
              <span className="font-bold text-[#17181c] block">Global Reach</span>
              <span className="text-[#6b6e76] text-[11px] mt-0.5 block">Cross-market governance for enterprise & family office leaders</span>
            </div>
          </div>

          <div className="pt-3 border-t border-[#ebdcc0] flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-[#6b6e76] font-mono">
              Ready to evaluate your organisation's leadership architecture?
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('test')}
                className="px-3.5 py-2 text-xs font-mono font-bold uppercase rounded-xs bg-[#ffffff] hover:bg-[#17181c] text-[#17181c] hover:text-[#f8f6f0] border border-[#d8cebe] transition-colors cursor-pointer"
              >
                Take Free 60-Sec Assessment
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="px-4 py-2 text-xs font-mono font-bold uppercase rounded-xs bg-[#17181c] text-[#f8f6f0] hover:bg-[#9d7b38] hover:text-[#17181c] transition-colors cursor-pointer"
              >
                Contact Advisory Desk
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
