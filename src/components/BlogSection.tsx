import React, { useState, useMemo } from 'react';
import { BLOG_POSTS, BlogPost } from '../data/blogData';
import { 
  BookOpen, 
  Sparkles, 
  Share2, 
  Check, 
  Clock, 
  ChevronRight, 
  HelpCircle, 
  ArrowRight, 
  AlertTriangle,
  FileText,
  Bookmark,
  Search,
  Layers,
  ShieldCheck,
  Zap,
  Target
} from 'lucide-react';

interface BlogSectionProps {
  onOpenConsultation: (topic?: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onOpenConsultation }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost>(BLOG_POSTS[0]);
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
    // On mobile, smooth scroll to the article reader
    if (window.innerWidth < 1024) {
      const readerEl = document.getElementById('blog-reader-view');
      if (readerEl) {
        readerEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section id="blogs" className="py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 border-b border-[#e5decfe0] bg-[#f5f1e8] relative">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-8">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#17181c] text-[#d4af37] text-xs font-mono uppercase tracking-normal font-bold rounded-xs shadow-xs">
              <BookOpen className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Sovereign Intelligence · 18 Value-Driven Strategic Dispatches</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#17181c] leading-tight tracking-tight [text-wrap:balance] font-serif">
              Challenging Dogma for <br className="hidden sm:inline" />
              <span className="text-[#9d7b38]">Sovereign Founders & Enterprise CXOs</span>
            </h2>
            <p className="text-sm text-[#4e5159] leading-relaxed">
              Straightforward problem diagnoses, concrete 3-step sovereign remedies, and battle-tested governance architecture for leaders commanding $10M–$100M+ enterprises.
            </p>
          </div>

          {/* Search Input */}
          <div className="w-full md:w-72 relative">
            <Search className="w-4 h-4 text-[#8f6d28] absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search 18 dispatches (e.g. EBITDA, AI, Vacation)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-[#d8cebe] rounded-sm text-xs text-[#17181c] placeholder:text-[#888] focus:outline-none focus:border-[#9d7b38] shadow-2xs"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-[#dfd7c8] mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-sm text-xs font-mono transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#17181c] text-[#d4af37] font-bold shadow-xs'
                  : 'bg-[#ede5d6] text-[#4e5159] hover:bg-[#e4dcce] hover:text-[#17181c]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Main Split Layout: Article List on Left, Deep Reader on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Column: Essay Selection Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-3.5 max-h-[1400px] overflow-y-auto pr-1 custom-scrollbar">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#6e727c] px-1 pb-1">
              <span>Dispatches ({filteredPosts.length})</span>
              <span className="text-[#9d7b38]">3-Step Solutions Included</span>
            </div>

            {filteredPosts.length === 0 ? (
              <div className="p-8 text-center bg-white border border-[#ded6c5] rounded-md text-xs text-[#6e727c]">
                No dispatches match your search query. Try searching for "EBITDA", "Consensus", or "Delegation".
              </div>
            ) : (
              filteredPosts.map((post) => {
                const isSelected = selectedPost.id === post.id;
                return (
                  <div
                    key={post.id}
                    onClick={() => handleSelectPost(post)}
                    className={`p-4 sm:p-5 rounded-md border transition-all duration-200 cursor-pointer text-left flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#ffffff] border-2 border-[#17181c] shadow-md ring-1 ring-[#17181c]/10'
                        : 'bg-[#faf8f5] border-[#ded6c5] hover:border-[#9d7b38] hover:bg-[#ffffff] shadow-2xs'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#6e727c] mb-2">
                        <span className="text-[#9d7b38] font-semibold">{post.category}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#9d7b38]" />
                          {post.readTime}
                        </span>
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-[#17181c] mb-2 leading-snug font-serif">
                        {post.title}
                      </h3>

                      <p className="text-xs text-[#57534e] line-clamp-2 leading-relaxed italic">
                        "{post.hook}"
                      </p>
                    </div>

                    <div className="mt-3.5 pt-2.5 border-t border-[#f0eade] flex items-center justify-between text-xs">
                      <span className={`font-mono text-[11px] font-bold ${
                        isSelected ? 'text-[#9d7b38]' : 'text-[#6e727c]'
                      }`}>
                        {isSelected ? '✦ Currently Reading' : 'Explore 3-Step Protocol →'}
                      </span>
                      <ChevronRight className={`w-3.5 h-3.5 transition-transform ${
                        isSelected ? 'rotate-90 text-[#9d7b38]' : 'text-[#a6a9b2]'
                      }`} />
                    </div>
                  </div>
                );
              })
            )}

            {/* Quick Briefing Request Card */}
            <div className="p-4 rounded-md bg-[#17181c] text-white border border-[#3e4350] space-y-2 shadow-xs mt-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#d4af37] font-bold uppercase">
                <Bookmark className="w-3.5 h-3.5" />
                <span>Executive Briefing Conclave</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                Need these protocols installed directly into your C-suite? Request an In-Camera Executive Briefing with Suchita Sancheti.
              </p>
              <button
                onClick={() => onOpenConsultation('Executive Briefing Request via Library')}
                className="pt-1 text-xs font-mono text-[#d4af37] hover:text-white transition-colors flex items-center gap-1 font-bold cursor-pointer"
              >
                <span>Initiate Private Briefing Dialogue</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Right Column: Full Essay Reader View (7 Cols) */}
          <div 
            id="blog-reader-view"
            className="lg:col-span-7 bg-[#ffffff] border border-[#d8cebe] rounded-lg p-5 sm:p-8 lg:p-10 shadow-md space-y-8 scroll-mt-24"
          >
            
            {/* Article Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[#f0eade]">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-1 rounded-xs bg-[#f0eade] text-[#17181c] text-xs font-mono font-bold">
                  {selectedPost.category}
                </span>
                <span className="text-xs font-mono text-[#6e727c] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#9d7b38]" />
                  {selectedPost.readTime}
                </span>
              </div>

              {/* LinkedIn Copy Button */}
              <button
                onClick={() => handleCopyLinkedIn(selectedPost.id, selectedPost.linkedInPostSummary)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-[#17181c] hover:bg-[#282a30] text-[#d4af37] text-xs font-mono transition-all cursor-pointer shadow-2xs"
                title="Copy formatted post ready for LinkedIn"
              >
                {copiedLinkedInId === selectedPost.id ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied to Clipboard!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Copy for LinkedIn</span>
                  </>
                )}
              </button>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#17181c] leading-[1.2] tracking-tight font-serif">
                {selectedPost.title}
              </h1>
              <p className="text-sm sm:text-base text-[#57534e] font-serif italic leading-relaxed">
                {selectedPost.subtitle}
              </p>
            </div>

            {/* STRAIGHT OUT CALL THE PROBLEM: THE BRUTAL BOARDROOM REALITY */}
            <div className="p-5 sm:p-6 rounded-md bg-[#faf3e8] border-l-4 border-amber-600 border-y border-r border-[#ebd7b5] text-xs sm:text-sm space-y-2 shadow-2xs">
              <div className="font-mono text-xs uppercase tracking-wider text-amber-900 font-bold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                <span>The Unvarnished Problem (Direct Boardroom Diagnosis)</span>
              </div>
              <p className="text-[#3c3427] leading-relaxed font-serif font-medium text-sm sm:text-[14.5px]">
                {selectedPost.problemDirectCallout}
              </p>
            </div>

            {/* CONCRETE 3-STEP SOVEREIGN SOLUTION */}
            <div className="p-5 sm:p-6 rounded-md bg-[#141416] text-white border border-[#2b2d33] space-y-4 shadow-md">
              <div className="flex items-center justify-between border-b border-[#2d313b] pb-3">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[#d4af37] font-bold">
                  <Target className="w-4 h-4 text-[#d4af37]" />
                  <span>The 3-Step Sovereign Remedy</span>
                </div>
                <span className="text-[10px] font-mono text-[#a6a9b2] uppercase">
                  Actionable Architecture
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Step 1 */}
                <div className="p-3.5 rounded bg-[#1f2127] border border-[#343742] space-y-2">
                  <div className="flex items-center gap-1.5 text-[#d4af37] font-mono text-xs font-bold">
                    <span className="w-5 h-5 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[10px]">1</span>
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
                <div className="p-3.5 rounded bg-[#1f2127] border border-[#343742] space-y-2">
                  <div className="flex items-center gap-1.5 text-[#d4af37] font-mono text-xs font-bold">
                    <span className="w-5 h-5 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[10px]">2</span>
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
                <div className="p-3.5 rounded bg-[#1f2127] border border-[#343742] space-y-2">
                  <div className="flex items-center gap-1.5 text-[#d4af37] font-mono text-xs font-bold">
                    <span className="w-5 h-5 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center text-[10px]">3</span>
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
              <div className="p-5 sm:p-6 rounded-md bg-[#0f1115] text-stone-200 border border-[#2b2e38] space-y-4 shadow-md">
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
                <div className="p-3 sm:p-4 rounded bg-[#07080a] border border-[#1e2029] overflow-x-auto text-[11px] font-mono text-[#d4af37] leading-relaxed whitespace-pre selection:bg-[#d4af37] selection:text-black">
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

            {/* Controversial Opening */}
            <div className="p-5 rounded-md bg-[#faf8f5] border-l-4 border-[#9d7b38] text-[#17181c] text-sm sm:text-base leading-relaxed font-serif italic">
              "{selectedPost.controversialOpening}"
            </div>

            {/* Body Sections */}
            <div className="space-y-8 sm:space-y-10">
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
                    <div className="mt-4 p-4 sm:p-5 rounded-md bg-[#17181c] text-white border border-[#3e4350] space-y-3 text-xs sm:text-sm font-serif shadow-sm">
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
                      <div className="pt-2 border-t border-[#2d313b] space-y-0.5 bg-[#22252c] p-3 rounded-xs border-l-2 border-[#d4af37]">
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

            {/* Strategic Executive Takeaways */}
            <div className="p-5 rounded-md bg-[#faf8f5] border border-[#ded6c5] space-y-3">
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
            <div className="p-5 rounded-md bg-[#f0eade] border border-[#ded6c5] space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#9d7b38] uppercase font-bold tracking-wider">
                <HelpCircle className="w-4 h-4 text-[#9d7b38]" />
                <span>Boardroom Introspective Prompt</span>
              </div>
              <p className="text-base sm:text-lg font-bold text-[#17181c] italic font-serif">
                "{selectedPost.introspectiveQuestion}"
              </p>
            </div>

            {/* TULC Solution Callout & Action */}
            <div className="p-6 rounded-md bg-[#17181c] text-white border border-[#d4af37]/60 text-center space-y-3 shadow-md">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37] font-bold">
                The Unbounded Leadership Protocol
              </span>
              <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-serif">
                Stop Managing Fires. Command Your Operating Architecture.
              </h4>
              <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto leading-relaxed">
                {selectedPost.tulcSolutionCallout}
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onOpenConsultation(`Inquiry following Essay: "${selectedPost.title}"`)}
                  className="px-6 py-3 bg-gradient-to-r from-[#d4af37] to-[#b8860b] hover:from-[#e5be48] hover:to-[#c99518] text-[#17181c] font-bold text-xs uppercase tracking-wider rounded-sm transition-all shadow-md inline-flex items-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>{selectedPost.callToAction.primaryText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Navigation Back Buttons */}
            <div className="pt-4 border-t border-[#f0eade] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
              <button
                onClick={() => {
                  window.location.hash = 'top';
                }}
                className="text-[#6e727c] hover:text-[#17181c] transition-colors py-1 cursor-pointer font-bold flex items-center gap-1.5"
              >
                <span>← Return to Home Overview</span>
              </button>

              <button
                onClick={() => {
                  window.location.hash = 'codex';
                }}
                className="text-[#9d7b38] hover:text-[#7d5f24] transition-colors py-1 cursor-pointer font-bold flex items-center gap-1.5"
              >
                <span>Explore The Sovereign Codex & Toolkits →</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
