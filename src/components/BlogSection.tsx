import React, { useState, useMemo } from 'react';
import { BLOG_POSTS, BlogPost } from '../data/blogData';
import { SEOHead } from './SEOHead';
import { useFounderPhoto } from '../utils/founderPhoto';
import { 
  BookOpen, 
  Sparkles, 
  Share2, 
  Check, 
  Clock, 
  ChevronRight, 
  HelpCircle, 
  ArrowRight, 
  ArrowLeft,
  AlertTriangle,
  FileText,
  Bookmark,
  Search,
  Layers,
  ShieldCheck,
  Zap,
  Target,
  MessageSquare
} from 'lucide-react';

interface BlogSectionProps {
  onOpenConsultation: (topic?: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onOpenConsultation }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost>(BLOG_POSTS[0]);
  const { photoUrl: founderPhotoUrl } = useFounderPhoto('/assets/suchita-portrait.svg');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedLinkedInId, setCopiedLinkedInId] = useState<string | null>(null);

  const categories = useMemo(() => {
    return ['All', ...Array.from(new Set(BLOG_POSTS.map(p => p.category)))];
  }, []);

  const filteredPosts = useMemo(() => {
    return BLOG_POSTS.filter(post => {
      const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
      const matchesSearch = searchQuery.trim() === '' || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.hook.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleCopyLinkedIn = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLinkedInId(id);
    setTimeout(() => {
      setCopiedLinkedInId(null);
    }, 2500);
  };

  const handleSelectPost = (post: BlogPost) => {
    setSelectedPost(post);
    const readerEl = document.getElementById('blog-reader-view');
    if (readerEl) {
      readerEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section id="blogs" className="py-8 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 border-b border-[#e5decfe0] bg-[#f5f1e8] relative">
      <div className="max-w-[1440px] mx-auto">
        
        {/* FIRST THING THEY SEE: THE COMPLETE ARTICLE READER */}
        <div 
          id="blog-reader-view"
          className="max-w-4xl mx-auto bg-[#ffffff] border border-[#d8cebe] rounded-none p-5 sm:p-8 lg:p-10 shadow-md space-y-8 scroll-mt-20 mb-12 sm:mb-16"
        >
            
            {/* Article Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#f0eade]">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded-none bg-[#f0eade] text-[#17181c] text-xs font-mono font-bold">
                  {selectedPost.category}
                </span>
                <span className="text-xs font-mono text-[#6e727c] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#9d7b38]" />
                  {selectedPost.readTime}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    document.getElementById('all-dispatches-grid')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-[#f0eade] hover:bg-[#e4dcce] text-[#17181c] text-xs font-mono transition-all cursor-pointer border border-[#ded6c5]"
                >
                  <span>All 18 Dispatches (Grid) ↓</span>
                </button>

                {/* LinkedIn Copy Button */}
                <button
                  onClick={() => handleCopyLinkedIn(selectedPost.id, selectedPost.linkedInPostSummary)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-[#17181c] hover:bg-[#282a30] text-[#d4af37] text-xs font-mono transition-all cursor-pointer shadow-2xs"
                  title="Copy formatted post ready for LinkedIn"
                >
                  {copiedLinkedInId === selectedPost.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Copy for LinkedIn</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Dynamic SEOHead for Article / FAQ Schema & AEO */}
            <SEOHead
              title={`${selectedPost.title} | TULC Intelligence`}
              description={selectedPost.executiveSummary}
              canonicalPath={`/library/${selectedPost.slug}`}
              keywords={selectedPost.keywords.join(', ')}
              type="article"
              articleData={{
                datePublished: '2026-08-01T08:00:00+00:00',
                dateModified: '2026-10-24T00:00:00+00:00',
                authorName: 'Suchita Sancheti',
                category: selectedPost.category,
                wordCount: 1600
              }}
              faqData={selectedPost.faqItems?.map(f => ({ question: f.question, answer: f.answer }))}
            />

            {/* VIVID TOPIC IMAGE (Topic Photography) */}
            {selectedPost.imageUrl && (
              <div className="relative w-full aspect-16/9 sm:aspect-21/9 overflow-hidden rounded-none border border-[#d8cebe] shadow-xs bg-[#ede5d6]">
                <img 
                  src={selectedPost.imageUrl} 
                  alt={selectedPost.title} 
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between text-white text-[11px] font-mono">
                  <span className="bg-[#17181c]/90 px-2.5 py-1 border border-[#d4af37]/70 font-bold text-[#d4af37]">
                    {selectedPost.category} · Sovereign Leadership
                  </span>
                  <span className="text-stone-300 hidden sm:inline">
                    Authored by Suchita Sancheti
                  </span>
                </div>
              </div>
            )}

            {/* Title & Subtitle */}
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#17181c] leading-[1.2] tracking-tight font-serif">
                {selectedPost.title}
              </h1>
              <p className="text-sm sm:text-base text-[#57534e] font-serif italic leading-relaxed">
                {selectedPost.subtitle}
              </p>
            </div>

            {/* DIRECT EXECUTIVE ANSWER (AEO & GEO KEY TAKEAWAY) */}
            {selectedPost.aeoDirectAnswer && (
              <div className="article-direct-answer p-4 sm:p-5 rounded-none bg-[#faf6ee] border-2 border-[#9d7b38]/60 shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#9d7b38] font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Direct Executive Answer (AEO / GEO Key Takeaway)</span>
                </div>
                <p className="text-sm font-serif font-bold text-[#17181c] leading-relaxed">
                  {selectedPost.aeoDirectAnswer.coreDefinition}
                </p>
                <div className="text-xs font-serif text-[#555861] leading-relaxed pt-2 border-t border-[#ebdcc0] flex items-start gap-2">
                  <span className="font-mono uppercase text-[10px] text-[#8c6708] font-bold shrink-0 mt-0.5">ACTIONABLE PROTOCOL:</span>
                  <span>{selectedPost.aeoDirectAnswer.executiveActionSnippet}</span>
                </div>
              </div>
            )}

            {/* CONVERSATIONAL 1-ON-1 LETTER FROM SUCHITA SANCHETI (BLACK BACKGROUND & GOLDEN TEXT) */}
            {selectedPost.conversationalLetter && (
              <div className="p-5 sm:p-7 rounded-none bg-[#0c0d14] border-2 border-[#d4af37] shadow-xl space-y-4 relative overflow-hidden text-[#f4ecd8]">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 border-b border-[#d4af37]/40">
                  <div className="flex items-center gap-3">
                    <img 
                      src={founderPhotoUrl} 
                      alt="Suchita Sancheti" 
                      className="w-12 h-12 rounded-full object-cover object-[center_15%] border-2 border-[#d4af37] shadow-md shrink-0 bg-[#050608]" 
                    />
                    <div>
                      <div className="text-sm font-bold text-[#f3e5ab] font-serif">
                        Suchita Sancheti
                      </div>
                      <div className="text-[10px] font-mono text-[#d4af37] uppercase tracking-wider font-bold">
                        Founder & Enterprise Architect
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37] font-bold px-3 py-1 bg-[#13141f] rounded-none border border-[#d4af37]/50 flex items-center gap-1.5 shadow-sm">
                    <MessageSquare className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>A 1-on-1 Note for You</span>
                  </span>
                </div>

                <div className="space-y-3 font-serif">
                  <p className="text-sm sm:text-base font-bold text-[#f3e5ab] italic">
                    "{selectedPost.conversationalLetter.salutation}"
                  </p>
                  <p className="text-xs sm:text-sm text-[#ded8cb] leading-relaxed">
                    {selectedPost.conversationalLetter.openingScene}
                  </p>
                  <div className="p-4 rounded-none bg-[#131420] border-l-4 border-[#d4af37] border-y border-r border-[#d4af37]/40 text-xs sm:text-[13.5px] text-[#f3e5ab] leading-relaxed italic shadow-inner">
                    {selectedPost.conversationalLetter.heartfeltValidation}
                  </div>
                </div>
              </div>
            )}

            {/* Controversial Opening */}
            <div className="p-5 rounded-none bg-[#faf8f5] border-l-4 border-[#9d7b38] text-[#17181c] text-sm sm:text-base leading-relaxed font-serif italic">
              "{selectedPost.controversialOpening}"
            </div>

            {/* FIRST COMES THE ARTICLE: Full Body Sections & Case Analyses */}
            <div className="space-y-8 sm:space-y-10 border-b border-[#f0eade] pb-8">
              {selectedPost.bodySections.map((section, idx) => (
                <div key={idx} className="space-y-3.5">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#17181c] tracking-tight font-serif">
                    {section.heading}
                  </h2>
                  {section.subheading && (
                    <h3 className="text-xs sm:text-sm font-mono text-[#9d7b38] font-bold">
                      {section.subheading}
                    </h3>
                  )}

                  <div className="space-y-3 text-sm sm:text-base text-[#4e5159] leading-relaxed">
                    {section.content.map((p, pIdx) => (
                      <p 
                        key={pIdx} 
                        dangerouslySetInnerHTML={{ 
                          __html: p
                            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#17181c] font-bold">$1</strong>')
                            .replace(/\*(.*?)\*/g, '<em class="text-[#8c6708] italic font-semibold">$1</em>') 
                        }} 
                      />
                    ))}
                  </div>

                  {/* Executive Framework Case Breakdown */}
                  {section.executiveFramework && (
                    <div className="mt-4 p-4 sm:p-5 rounded-none bg-[#17181c] text-white border border-[#3e4350] space-y-3 text-xs sm:text-sm font-serif shadow-sm">
                      <div className="text-xs font-mono uppercase tracking-widest text-[#d4af37] font-bold flex items-center gap-1.5 pb-2 border-b border-[#2d313b]">
                        <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>Executive In-Camera Case Analysis</span>
                      </div>

                      {/* Problem Story */}
                      <div className="space-y-0.5">
                        <span className="text-[11px] font-mono text-[#d4af37] uppercase font-bold tracking-wider">
                          The Operational Tension:
                        </span>
                        <p className="text-stone-300 italic text-xs leading-relaxed">
                          "{section.executiveFramework.problemStory}"
                        </p>
                      </div>

                      {/* Compounding Friction */}
                      <div className="pt-2 border-t border-[#2d313b] space-y-0.5">
                        <span className="text-[11px] font-mono text-rose-400 uppercase font-bold tracking-wider">
                          Compounding Toll on Enterprise Valuation:
                        </span>
                        <p className="text-stone-300 text-xs leading-relaxed">
                          {section.executiveFramework.affects}
                        </p>
                      </div>

                      {/* Sovereign Solution */}
                      <div className="pt-2 border-t border-[#2d313b] space-y-0.5 bg-[#22252c] p-3 rounded-none border-l-2 border-[#d4af37]">
                        <span className="text-[11px] font-mono text-emerald-400 uppercase font-bold tracking-wider">
                          The Sovereign Remedy:
                        </span>
                        <p className="text-white font-semibold text-xs leading-relaxed">
                          {section.executiveFramework.solution}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* UNVARNISHED PROBLEM: THE DIRECT BOARDROOM DIAGNOSIS */}
            <div className="p-5 sm:p-6 rounded-none bg-[#faf3e8] border-l-4 border-amber-600 border-y border-r border-[#ebd7b5] text-xs sm:text-sm space-y-2 shadow-2xs">
              <div className="font-mono text-xs uppercase tracking-wider text-amber-900 font-bold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                <span>The Unvarnished Problem (Direct Boardroom Diagnosis)</span>
              </div>
              <p className="text-[#3c3427] leading-relaxed font-serif font-medium text-sm sm:text-[14.5px]">
                {selectedPost.problemDirectCallout}
              </p>
            </div>

            {/* SQUARED SOVEREIGN EXECUTION STEPS */}
            <div className="p-5 sm:p-6 rounded-none bg-[#141416] text-white border border-[#2b2d33] space-y-4 shadow-md">
              <div className="flex items-center justify-between border-b border-[#2d313b] pb-3">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#d4af37] font-bold">
                  <Target className="w-4 h-4 text-[#d4af37]" />
                  <span>Sovereign Execution Steps</span>
                </div>
                <span className="text-[10px] font-mono text-[#a6a9b2] uppercase">
                  Actionable Architecture
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Step 1 */}
                <div className="p-3.5 rounded-none bg-[#1f2127] border border-[#343742] space-y-2">
                  <div className="flex items-center gap-1.5 text-[#d4af37] font-mono text-xs font-bold">
                    <span className="w-5 h-5 rounded-none bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[10px]">1</span>
                    <span className="truncate">{selectedPost.threeStepSolution.step1.title}</span>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed font-serif">
                    {selectedPost.threeStepSolution.step1.action}
                  </p>
                  <div className="pt-2 border-t border-[#2e313b] text-[10.5px] font-mono text-[#c5a059]">
                    <span className="text-stone-400 block font-normal text-[9.5px]">DELIVERABLE:</span>
                    {selectedPost.threeStepSolution.step1.deliverable}
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-3.5 rounded-none bg-[#1f2127] border border-[#343742] space-y-2">
                  <div className="flex items-center gap-1.5 text-[#d4af37] font-mono text-xs font-bold">
                    <span className="w-5 h-5 rounded-none bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[10px]">2</span>
                    <span className="truncate">{selectedPost.threeStepSolution.step2.title}</span>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed font-serif">
                    {selectedPost.threeStepSolution.step2.action}
                  </p>
                  <div className="pt-2 border-t border-[#2e313b] text-[10.5px] font-mono text-[#c5a059]">
                    <span className="text-stone-400 block font-normal text-[9.5px]">DELIVERABLE:</span>
                    {selectedPost.threeStepSolution.step2.deliverable}
                  </div>
                </div>

                {/* Step 3 */}
                <div className="p-3.5 rounded-none bg-[#1f2127] border border-[#343742] space-y-2">
                  <div className="flex items-center gap-1.5 text-[#d4af37] font-mono text-xs font-bold">
                    <span className="w-5 h-5 rounded-none bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[10px]">3</span>
                    <span className="truncate">{selectedPost.threeStepSolution.step3.title}</span>
                  </div>
                  <p className="text-xs text-stone-300 leading-relaxed font-serif">
                    {selectedPost.threeStepSolution.step3.action}
                  </p>
                  <div className="pt-2 border-t border-[#2e313b] text-[10.5px] font-mono text-[#c5a059]">
                    <span className="text-stone-400 block font-normal text-[9.5px]">DELIVERABLE:</span>
                    {selectedPost.threeStepSolution.step3.deliverable}
                  </div>
                </div>
              </div>
            </div>

            {/* ARCHITECTURE DIAGRAM & METRIC COMPARISON */}
            {selectedPost.diagram && (
              <div className="p-5 sm:p-6 rounded-none bg-[#0f1115] text-stone-200 border border-[#2b2e38] space-y-4 shadow-md">
                <div className="flex items-center justify-between border-b border-[#252833] pb-2.5">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#d4af37] font-bold flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    <span>System Architecture Blueprint & Telemetry</span>
                  </span>
                  <span className="text-[10px] font-mono text-stone-500 uppercase">
                    Invariant Substrate
                  </span>
                </div>

                <div className="text-xs text-stone-300 font-serif italic">
                  {selectedPost.diagram.caption}
                </div>

                {/* Monospace ASCII Flow Blueprint */}
                <div className="p-3 sm:p-4 rounded-none bg-[#07080a] border border-[#1e2029] overflow-x-auto text-[11px] font-mono text-[#d4af37] leading-relaxed whitespace-pre selection:bg-[#d4af37] selection:text-black">
                  {selectedPost.diagram.asciiFlow.trim()}
                </div>

                {/* Metric Comparison Table */}
                <div className="pt-2">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#a6a9b2] mb-2 font-bold">
                    Empirical Transformation Benchmarks:
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-serif border-collapse">
                      <thead>
                        <tr className="border-b border-[#252833] text-[10px] font-mono text-[#8f929c] uppercase">
                          <th className="py-2 pr-4 font-bold">Performance Dimension</th>
                          <th className="py-2 pr-4 font-bold text-rose-400">Broken / Default State</th>
                          <th className="py-2 font-bold text-emerald-400">Sovereign Architecture</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#1e2029]">
                        {selectedPost.diagram.metricComparison.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-[#16181f]/60 transition-colors">
                            <td className="py-2.5 pr-4 font-bold text-white text-[11.5px] font-mono">{row.label}</td>
                            <td className="py-2.5 pr-4 text-stone-400 italic text-xs">{row.brokenState}</td>
                            <td className="py-2.5 text-stone-200 font-semibold text-xs text-[#d4af37]">{row.sovereignState}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* THE BIG QUESTION KEEPING YOU AWAKE & DEFINITIVE ANSWER */}
            {selectedPost.theBigQuestion && (
              <div className="p-5 sm:p-6 rounded-none bg-[#141416] text-white border-2 border-[#d4af37]/70 shadow-lg space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#d4af37] font-bold">
                  <HelpCircle className="w-4 h-4 text-[#d4af37]" />
                  <span>The Big Question Answered</span>
                </div>
                <h3 className="text-base sm:text-lg lg:text-xl font-serif font-bold text-white leading-snug">
                  "{selectedPost.theBigQuestion.question}"
                </h3>
                <p className="text-xs sm:text-sm text-stone-200 font-serif leading-relaxed pt-2.5 border-t border-[#2d313b]">
                  {selectedPost.theBigQuestion.answer}
                </p>
                <div className="pt-2 text-xs font-mono text-[#d4af37] flex items-start gap-2 bg-[#1f222a] p-2.5 rounded-none border border-[#343844]">
                  <span className="font-bold text-[10px] uppercase text-stone-300 shrink-0">The Strategic Shift:</span>
                  <span className="text-[#e2c168]">{selectedPost.theBigQuestion.actionableShift}</span>
                </div>
              </div>
            )}

            {/* FROM SUCHITA'S BOOK: SOVEREIGN ARCHITECTURE */}
            {selectedPost.bookExcerpt && (
              <div className="p-5 rounded-none bg-[#faf6ee] border border-[#d8cebe] border-l-4 border-[#9d7b38] shadow-xs space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#9d7b38] font-bold">
                    <BookOpen className="w-4 h-4 text-[#9d7b38]" />
                    <span>From Suchita's Book: {selectedPost.bookExcerpt.chapter}</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#8c6708] italic font-semibold">
                    Sovereign Architecture (The Book)
                  </span>
                </div>
                <blockquote className="text-xs sm:text-sm font-serif italic text-[#17181c] leading-relaxed pl-3 border-l-2 border-[#d4af37]/60">
                  "{selectedPost.bookExcerpt.passage}"
                </blockquote>
                <div className="pt-2 text-xs font-mono text-[#685327] flex items-start gap-2 border-t border-[#ebdcc0]">
                  <span className="font-bold uppercase text-[9.5px] shrink-0 text-[#9d7b38]">Introspective Reflection:</span>
                  <span className="italic text-[#4e5159]">{selectedPost.bookExcerpt.reflectionPrompt}</span>
                </div>
              </div>
            )}
            {/* Strategic Executive Takeaways */}
            <div className="p-5 rounded-none bg-[#faf8f5] border border-[#ded6c5] space-y-3">
              <h4 className="text-sm font-bold uppercase tracking-wider text-[#17181c] font-mono">
                Key Strategic Takeaways
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-[#4e5159]">
                {selectedPost.keyTakeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#9d7b38] font-bold mt-0.5">✦</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Introspective Boardroom Prompt */}
            <div className="p-5 rounded-none bg-[#f0eade] border border-[#ded6c5] space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#9d7b38] uppercase font-bold tracking-wider">
                <HelpCircle className="w-4 h-4 text-[#9d7b38]" />
                <span>Boardroom Introspective Prompt</span>
              </div>
              <p className="text-base sm:text-lg font-bold text-[#17181c] italic font-serif">
                "{selectedPost.introspectiveQuestion}"
              </p>
            </div>

            {/* EXECUTIVE INQUIRIES & SEARCH ANSWERS (AEO & GEO FAQ) */}
            {selectedPost.faqItems && selectedPost.faqItems.length > 0 && (
              <div className="p-5 sm:p-6 rounded-none bg-white border border-[#ded6c5] shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-2.5 border-b border-[#ebdcc0]">
                  <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#9d7b38] font-bold">
                    <HelpCircle className="w-4 h-4 text-[#9d7b38]" />
                    <span>Executive Inquiries & Search Answers (AEO / GEO FAQ)</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#8c6708] uppercase font-semibold">
                    Direct Answer Engine Node
                  </span>
                </div>
                <div className="space-y-3">
                  {selectedPost.faqItems.map((item, qIdx) => (
                    <div key={qIdx} className="p-3.5 rounded-none bg-[#faf8f5] border border-[#ebdcc0] space-y-1.5">
                      <h4 className="text-xs sm:text-sm font-serif font-bold text-[#17181c]">
                        {item.question}
                      </h4>
                      <p className="text-xs text-[#4e5159] font-serif leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* THE SOVEREIGN COVENANT & WELCOMING INVITATION */}
            <div className="p-6 sm:p-8 rounded-none bg-[#141416] text-white border-2 border-[#d4af37] text-center space-y-4 shadow-xl relative overflow-hidden">
              <div className="inline-block px-3 py-1 bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] text-[10px] font-mono uppercase tracking-widest font-bold rounded-none">
                The Unbounded Leadership Covenant
              </div>
              <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight font-serif max-w-xl mx-auto">
                You Do Not Have to Carry This Alone. We Re-Architect Your Operating System in 90 Days.
              </h4>
              <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mx-auto leading-relaxed font-serif">
                We have profound faith in this work because we witness the transformation firsthand: founders regaining 15+ hours of strategic clarity every week, leadership teams executing with autonomous conviction, and enterprises compounding value without key-person operational drag. Whenever you are ready to explore what sovereign operating architecture looks like for your boardroom, we welcome a private, confidential dialogue.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => onOpenConsultation(`Dialogue initiated via Dispatch: "${selectedPost.title}"`)}
                  className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-[#d4af37] to-[#b8860b] hover:from-[#e5be48] hover:to-[#c99518] text-[#17181c] font-bold text-xs uppercase tracking-wider rounded-none transition-all shadow-md inline-flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>Initiate In-Camera Executive Dialogue</span>
                  <ArrowRight className="w-4 h-4 text-[#17181c]" />
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('inaction-calculator') || document.getElementById('simple-test');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    } else {
                      window.location.hash = 'test';
                    }
                  }}
                  className="w-full sm:w-auto px-5 py-3.5 bg-[#22242c] hover:bg-[#2c2f38] text-[#e5decfe0] hover:text-white border border-[#444754] text-xs font-mono uppercase tracking-wider rounded-none transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Take Free 60-Sec Audit (Self-Diagnostic)</span>
                </button>
              </div>
            </div>

            {/* Navigation Back Buttons */}
            <div className="pt-4 border-t border-[#f0eade] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
              <button
                onClick={() => {
                  window.location.hash = 'top';
                }}
                aria-label="Go back"
                title="Go back"
                className="p-2 -ml-2 rounded-full text-[#17181c] hover:text-[#9d7b38] hover:bg-[#ede5d6] transition-colors cursor-pointer flex items-center justify-center min-w-[36px] min-h-[36px]"
              >
                <ArrowLeft className="w-5 h-5 text-[#9d7b38]" />
              </button>

              <button
                onClick={() => {
                  window.location.hash = 'blueprints';
                }}
                className="text-[#9d7b38] hover:text-[#7d5f24] transition-colors py-1 cursor-pointer font-bold flex items-center gap-1.5"
              >
                <span>Explore Sovereign Blueprints & Toolkits →</span>
              </button>
            </div>

          </div>

          {/* ALL DISPATCHES: 2 IN A ROW SQUARE GRID */}
          <div id="all-dispatches-grid" className="max-w-[1440px] mx-auto pt-10 border-t-2 border-[#d8cebe] space-y-8 scroll-mt-20">
            
            {/* Header: Clean, Dignified */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#17181c] text-[#d4af37] text-xs font-mono uppercase tracking-normal font-bold rounded-none shadow-xs">
                  <BookOpen className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Sovereign Intelligence · 18 Strategic Dispatches</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#17181c] leading-tight tracking-tight font-serif">
                  Executive Dispatches & Monographs
                </h2>
                <p className="text-sm text-[#4e5159] leading-relaxed">
                  Direct boardroom diagnoses, concrete sovereign remedies, and battle-tested governance architecture for leaders commanding $10M–$100M+ enterprises.
                </p>
              </div>

              {/* Search Input */}
              <div className="w-full md:w-80 relative">
                <Search className="w-4 h-4 text-[#8f6d28] absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text"
                  placeholder="Search 18 dispatches (e.g. EBITDA, AI, Vacation)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-[#d8cebe] rounded-none text-xs text-[#17181c] placeholder:text-[#888] focus:outline-none focus:border-[#9d7b38] shadow-2xs"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-[#dfd7c8]">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-none text-xs font-mono transition-all cursor-pointer ${
                    activeCategory === cat
                      ? 'bg-[#17181c] text-[#d4af37] font-bold shadow-xs'
                      : 'bg-[#ede5d6] text-[#4e5159] hover:bg-[#e4dcce] hover:text-[#17181c]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* 2 IN A ROW SQUARE GRID */}
            {filteredPosts.length === 0 ? (
              <div className="p-10 text-center bg-white border border-[#ded6c5] rounded-none text-xs text-[#6e727c]">
                No dispatches match your search query. Try searching for "EBITDA", "Consensus", or "Delegation".
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {filteredPosts.map((post) => {
                  const isSelected = selectedPost.id === post.id;
                  return (
                    <div
                      key={post.id}
                      onClick={() => handleSelectPost(post)}
                      className={`p-5 sm:p-6 rounded-none border transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
                        isSelected
                          ? 'bg-[#ffffff] border-2 border-[#17181c] shadow-lg ring-1 ring-[#17181c]/10'
                          : 'bg-[#faf8f5] border-[#ded6c5] hover:border-[#9d7b38] hover:bg-[#ffffff] shadow-2xs hover:shadow-md'
                      }`}
                    >
                      <div className="space-y-4">
                        {/* Topic Image in Square / Crisp Geometry */}
                        {post.imageUrl && (
                          <div className="w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden rounded-none border border-[#d8cebe] bg-[#ede5d6] relative">
                            <img 
                              src={post.imageUrl} 
                              alt={post.title} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                            <div className="absolute top-2.5 left-2.5">
                              <span className="px-2.5 py-1 bg-[#17181c]/90 text-[#d4af37] text-[10px] font-mono uppercase font-bold tracking-wider border border-[#d4af37]/60">
                                {post.category}
                              </span>
                            </div>
                            <div className="absolute bottom-2.5 right-2.5">
                              <span className="px-2.5 py-0.5 bg-black/85 text-stone-200 text-[10px] font-mono flex items-center gap-1 border border-stone-700">
                                <Clock className="w-3 h-3 text-[#d4af37]" />
                                <span>{post.readTime}</span>
                              </span>
                            </div>
                          </div>
                        )}

                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-[11px] font-mono text-[#6e727c]">
                            <span className="text-[#9d7b38] font-bold uppercase">{post.category}</span>
                            {isSelected ? (
                              <span className="px-2 py-0.5 bg-[#17181c] text-[#d4af37] text-[10px] font-bold">
                                ✦ Currently Reading Above
                              </span>
                            ) : (
                              <span className="text-[#8c6708] text-[10px]">
                                Click to Read Above
                              </span>
                            )}
                          </div>

                          <h3 className="text-base sm:text-lg lg:text-xl font-bold text-[#17181c] group-hover:text-[#9d7b38] transition-colors leading-snug font-serif">
                            {post.title}
                          </h3>

                          <p className="text-xs sm:text-sm text-[#57534e] leading-relaxed italic line-clamp-3">
                            "{post.hook}"
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 pt-3.5 border-t border-[#f0eade] flex items-center justify-between text-xs font-semibold">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`font-mono text-xs font-bold ${
                            isSelected ? 'text-[#9d7b38]' : 'text-[#17181c] group-hover:text-[#9d7b38]'
                          }`}>
                            {isSelected ? '✦ Reading Above' : 'Read Full Dispatch →'}
                          </span>
                          {post.theBigQuestion && (
                            <span className="text-[9px] font-mono text-[#8c6708] bg-[#faf6ee] px-1 py-0.5 rounded-none border border-[#ebdcc0] font-semibold">
                              Q&A
                            </span>
                          )}
                          {post.bookExcerpt && (
                            <span className="text-[9px] font-mono text-[#17181c] bg-[#f0eade] px-1 py-0.5 rounded-none font-semibold">
                              Book
                            </span>
                          )}
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#9d7b38] group-hover:translate-x-1.5 transition-transform" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Quick Briefing Conclave Card */}
            <div className="p-5 sm:p-6 rounded-none bg-[#17181c] text-white border border-[#3e4350] space-y-3 shadow-md mt-8">
              <div className="flex items-center gap-2 text-xs font-mono text-[#d4af37] font-bold uppercase">
                <Bookmark className="w-3.5 h-3.5" />
                <span>Executive Briefing Conclave</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-3xl">
                Need these protocols installed directly into your C-suite? Request an In-Camera Executive Briefing with Suchita Sancheti to re-architect your leadership operating system in 90 days.
              </p>
              <button
                onClick={() => onOpenConsultation('Executive Briefing Request via Library')}
                className="pt-1 text-xs font-mono text-[#d4af37] hover:text-white transition-colors flex items-center gap-1.5 font-bold cursor-pointer"
              >
                <span>Initiate Private Briefing Dialogue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

      </div>
    </section>
  );
};
