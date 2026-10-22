import React, { useState } from 'react';
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
  Bookmark
} from 'lucide-react';

interface BlogSectionProps {
  onOpenConsultation: (topic?: string) => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onOpenConsultation }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost>(BLOG_POSTS[0]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [copiedLinkedInId, setCopiedLinkedInId] = useState<string | null>(null);

  const categories = ['All', ...Array.from(new Set(BLOG_POSTS.map(p => p.category)))];

  const filteredPosts = activeCategory === 'All' 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(p => p.category === activeCategory);

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
    <section id="blogs" className="py-10 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-8 border-b border-[#e5decfe0] bg-[#f5f1e8] relative">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#17181c] text-[#d4af37] text-xs font-mono uppercase tracking-normal font-bold rounded-xs shadow-xs">
              <BookOpen className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Executive Dispatches & Sovereign Intelligence</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#17181c] leading-tight tracking-tight [text-wrap:balance]">
              Provocative Insights for <br className="hidden sm:inline" />
              <span className="text-[#9d7b38]">Sovereign Founders & CXOs</span>
            </h2>
            <p className="text-sm text-[#4e5159] leading-relaxed">
              Challenging corporate dogma, shattering management myths, and recoding leadership operating systems in high-impact, actionable language.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pt-2 md:pt-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-sm text-xs font-mono transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#17181c] text-white font-bold shadow-xs'
                    : 'bg-[#ede5d6] text-[#4e5159] hover:bg-[#e4dcce] hover:text-[#17181c]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Main Split Layout: Article List on Left, Deep Reader on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Column: Essay Selection Cards (4 Cols) */}
          <div className="lg:col-span-5 space-y-3.5">
            <div className="flex items-center justify-between text-xs font-mono uppercase tracking-wider text-[#6e727c] px-1 pb-1">
              <span>Curated Essays ({filteredPosts.length})</span>
              <span className="text-[#9d7b38]">HBR Rigor · No Fluff</span>
            </div>

            {filteredPosts.map((post) => {
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

                    <h3 className="text-base sm:text-lg font-bold text-[#17181c] mb-2 leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs text-[#57534e] line-clamp-2 leading-relaxed">
                      {post.hook}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#f0eade] flex items-center justify-between text-xs">
                    <span className={`font-mono text-xs font-bold ${
                      isSelected ? 'text-[#9d7b38]' : 'text-[#6e727c]'
                    }`}>
                      {isSelected ? '✦ Currently Reading' : 'Read Full Essay'}
                    </span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${
                      isSelected ? 'rotate-90 text-[#9d7b38]' : 'text-[#a6a9b2]'
                    }`} />
                  </div>
                </div>
              );
            })}

            {/* Quick White Paper Download Card */}
            <div className="p-4 rounded-md bg-[#17181c] text-white border border-[#3e4350] space-y-2 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-mono text-[#d4af37] font-bold uppercase">
                <Bookmark className="w-3.5 h-3.5" />
                <span>The 2026 Executive Briefing Dossier</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                Download the complete 42-page institutional framework on eliminating founder dependency and installing autonomous boundary governance.
              </p>
              <button
                onClick={() => onOpenConsultation('Executive White Paper Request')}
                className="pt-1 text-xs font-mono text-[#d4af37] hover:text-white transition-colors flex items-center gap-1 font-bold cursor-pointer"
              >
                <span>Request Executive Dossier via Briefing</span>
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
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#17181c] leading-[1.2] tracking-tight">
                {selectedPost.title}
              </h1>
              <p className="text-sm sm:text-base text-[#57534e] font-serif italic leading-relaxed">
                {selectedPost.subtitle}
              </p>
            </div>

            {/* Myth Dismantled Callout */}
            <div className="p-4 sm:p-5 rounded-md bg-rose-50 border border-rose-200 text-xs sm:text-sm space-y-1">
              <div className="font-mono text-xs uppercase tracking-wider text-rose-800 font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-700" />
                <span>Management Dogma Dismantled</span>
              </div>
              <p className="text-rose-950 leading-relaxed font-serif">
                {selectedPost.mythBusted}
              </p>
            </div>

            {/* Controversial Opening */}
            <div className="p-5 rounded-md bg-[#faf8f5] border-l-4 border-[#9d7b38] text-[#17181c] text-sm sm:text-base leading-relaxed font-serif italic">
              "{selectedPost.controversialOpening}"
            </div>

            {/* Body Sections */}
            <div className="space-y-8 sm:space-y-10">
              {selectedPost.bodySections.map((section, idx) => (
                <div key={idx} className="space-y-3.5">
                  <h2 className="text-xl sm:text-2xl font-bold text-[#17181c] tracking-tight">
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

                  {/* Executive Diagnosis & Architectural Prescription */}
                  {section.executiveFramework && (
                    <div className="mt-4 p-4 sm:p-5 rounded-md bg-[#17181c] text-white border border-[#3e4350] space-y-3 text-xs sm:text-sm font-serif shadow-sm">
                      <div className="text-xs font-mono uppercase tracking-widest text-[#d4af37] font-bold flex items-center gap-1.5 pb-2 border-b border-[#2d313b]">
                        <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>Executive Case Breakdown</span>
                      </div>

                      {/* Problem Story */}
                      <div className="space-y-0.5">
                        <span className="text-[11px] font-mono text-[#d4af37] uppercase font-bold tracking-wider">
                          The In-Chair Reality (The Problem):
                        </span>
                        <p className="text-stone-300 italic text-xs leading-relaxed">
                          "{section.executiveFramework.problemStory}"
                        </p>
                      </div>

                      {/* Compounding Friction */}
                      <div className="pt-2 border-t border-[#2d313b] space-y-0.5">
                        <span className="text-[11px] font-mono text-rose-400 uppercase font-bold tracking-wider">
                          Compounding Enterprise Toll:
                        </span>
                        <p className="text-stone-300 text-xs leading-relaxed">
                          {section.executiveFramework.affects}
                        </p>
                      </div>

                      {/* Sovereign Solution */}
                      <div className="pt-2 border-t border-[#2d313b] space-y-0.5 bg-[#22252c] p-3 rounded-xs border-l-2 border-[#d4af37]">
                        <span className="text-[11px] font-mono text-emerald-400 uppercase font-bold tracking-wider">
                          The Sovereign Architectural Solution:
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
              <p className="text-base sm:text-lg font-bold text-[#17181c] italic">
                "{selectedPost.introspectiveQuestion}"
              </p>
            </div>

            {/* TULC Solution Callout & Action */}
            <div className="p-6 rounded-md bg-[#17181c] text-white border border-[#d4af37]/60 text-center space-y-3 shadow-md">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37] font-bold">
                The Unbounded Leadership Protocol
              </span>
              <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
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
