import React, { useState } from 'react';
import { BLOG_POSTS, BlogPost } from '../data/blogData';
import { BookOpen, Sparkles, Share2, Copy, Check, Clock, ChevronRight, HelpCircle, ArrowRight, ExternalLink } from 'lucide-react';

interface BlogSectionProps {
  onOpenCalibration: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ onOpenCalibration }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost>(BLOG_POSTS[0]);
  const [copiedLinkedInId, setCopiedLinkedInId] = useState<string | null>(null);

  const handleCopyLinkedIn = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLinkedInId(id);
    setTimeout(() => {
      setCopiedLinkedInId(null);
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-amber-400 font-mono text-xs uppercase tracking-widest mb-3">
          HBR Rigor · No Fluff · LinkedIn Ready
        </div>
        <h2 className="serif-heading text-3xl sm:text-5xl font-bold text-zinc-100 tracking-tight">
          Executive Sovereign Intelligence
        </h2>
        <p className="text-zinc-400 text-base sm:text-lg mt-4 font-light">
          Challenging corporate dogma, shattering management myths, and recoding leadership operating systems in high-impact, accessible language.
        </p>
      </div>

      {/* Main Layout: Article Selector on Left, Full Article on Right */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Post Selector Navigation */}
        <div className="lg:col-span-4 space-y-4">
          <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-2 px-2">
            Selected Strategic Briefings ({BLOG_POSTS.length})
          </div>

          {BLOG_POSTS.map(post => {
            const isSelected = selectedPost.id === post.id;
            return (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className={`p-5 rounded-xl border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-zinc-900/90 border-amber-500/50 shadow-md shadow-amber-500/5'
                    : 'bg-zinc-950/60 border-zinc-850 hover:border-zinc-700 hover:bg-zinc-900/30'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mb-2">
                  <span className="text-amber-400/90">{post.category}</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="serif-heading text-base font-bold text-zinc-100 mb-2 leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                  {post.hook}
                </p>

                <div className="mt-4 pt-3 border-t border-zinc-850 flex items-center justify-between text-xs">
                  <span className="font-mono text-amber-400/80 text-[11px]">
                    {isSelected ? 'Currently Viewing' : 'Read Full Essay'}
                  </span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'rotate-90 text-amber-400' : 'text-zinc-500'}`} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Full Essay Viewer */}
        <div className="lg:col-span-8 bg-zinc-950 border border-zinc-800 rounded-2xl p-6 sm:p-10 shadow-2xl">
          {/* Article Meta Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-zinc-850">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-mono">
                {selectedPost.category}
              </span>
              <span className="text-xs font-mono text-zinc-500 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {selectedPost.readTime}
              </span>
            </div>

            {/* LinkedIn Copy Button */}
            <button
              onClick={() => handleCopyLinkedIn(selectedPost.id, selectedPost.linkedInPostSummary)}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-850 text-amber-300 text-xs font-mono border border-amber-500/30 hover:border-amber-400 transition-all cursor-pointer"
              title="Copy formatted version ready to paste on LinkedIn"
            >
              {copiedLinkedInId === selectedPost.id ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied LinkedIn Post!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Copy LinkedIn Post</span>
                </>
              )}
            </button>
          </div>

          {/* Main Title & Subtitle */}
          <div className="my-8">
            <h1 className="serif-heading text-3xl sm:text-4xl font-bold text-zinc-100 leading-tight mb-4">
              {selectedPost.title}
            </h1>
            <p className="text-lg text-zinc-300 font-light italic leading-relaxed">
              {selectedPost.subtitle}
            </p>
          </div>

          {/* Myth Buster Callout */}
          <div className="p-5 rounded-xl bg-red-950/20 border border-red-900/40 text-sm mb-8">
            <div className="font-mono text-xs uppercase tracking-wider text-red-400 font-bold mb-1 flex items-center gap-2">
              <span>⚠️ Management Myth Dismantled</span>
            </div>
            <div className="text-zinc-200 leading-relaxed">
              {selectedPost.mythBusted}
            </div>
          </div>

          {/* Controversial Opening */}
          <div className="p-6 rounded-xl bg-zinc-900/50 border-l-4 border-amber-400 text-zinc-200 text-base leading-relaxed mb-10 font-serif italic">
            "{selectedPost.controversialOpening}"
          </div>

          {/* Body Sections with Triple-Angle repetition */}
          <div className="space-y-12">
            {selectedPost.bodySections.map((section, idx) => (
              <div key={idx} className="space-y-4">
                <h2 className="serif-heading text-2xl font-bold text-zinc-100">
                  {section.heading}
                </h2>
                {section.subheading && (
                  <h3 className="text-sm font-mono text-amber-400/90 -mt-2">
                    {section.subheading}
                  </h3>
                )}

                <div className="space-y-3 text-zinc-300 text-sm sm:text-base leading-relaxed">
                  {section.content.map((p, pIdx) => (
                    <p key={pIdx} dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.*?)\*\*/g, '<strong class="text-zinc-100 font-semibold">$1</strong>').replace(/\*(.*?)\*/g, '<em class="text-amber-200 font-normal italic">$1</em>') }} />
                  ))}
                </div>

                {/* Executive Case Breakdown Card: Problem • Affects • Sovereign Solution */}
                {section.executiveFramework && (
                  <div className="mt-5 p-5 sm:p-6 rounded-xs bg-[#1c1917] border border-[#b8860b]/40 text-stone-200 space-y-4 font-serif shadow-xs">
                    <div className="text-xs font-mono uppercase tracking-widest text-[#d4af37] font-bold flex items-center gap-2 border-b border-stone-800 pb-2.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Executive Diagnosis & Architectural Prescription</span>
                    </div>

                    {/* Problem Story */}
                    <div className="space-y-1">
                      <span className="text-[11px] font-mono text-[#b8860b] uppercase tracking-wider block font-bold">
                        The In-Chair Reality (The Problem):
                      </span>
                      <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-serif italic">
                        "{section.executiveFramework.problemStory}"
                      </p>
                    </div>

                    {/* Compounding Effects */}
                    <div className="pt-3 border-t border-stone-800/80 space-y-1">
                      <span className="text-[11px] font-mono text-red-400 uppercase tracking-wider block font-bold">
                        Compounding Systemic Friction (The Toll):
                      </span>
                      <p className="text-xs sm:text-sm text-stone-300 leading-relaxed font-serif">
                        {section.executiveFramework.affects}
                      </p>
                    </div>

                    {/* Value-Driven Solution */}
                    <div className="pt-3 border-t border-stone-800/80 space-y-1 bg-[#24201c] p-3 rounded-xs border-l-2 border-[#b8860b]">
                      <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block font-bold">
                        The Sovereign Architectural Solution:
                      </span>
                      <p className="text-xs sm:text-sm text-stone-100 font-serif font-semibold leading-relaxed">
                        {section.executiveFramework.solution}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Key Takeaways */}
          <div className="mt-12 p-6 rounded-xl bg-zinc-900/80 border border-zinc-800">
            <h3 className="serif-heading text-xl font-bold text-zinc-100 mb-4">
              Strategic Executive Takeaways
            </h3>
            <ul className="space-y-2.5 text-sm text-zinc-300">
              {selectedPost.keyTakeaways.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-amber-400 font-mono text-xs mt-0.5">✦</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Introspective Question */}
          <div className="mt-8 p-6 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <div className="flex items-center gap-2 text-amber-300 font-mono text-xs uppercase tracking-wider mb-2">
              <HelpCircle className="w-4 h-4 text-amber-400" />
              <span>Introspective Boardroom Prompt</span>
            </div>
            <p className="serif-heading text-xl font-semibold text-zinc-100 italic">
              "{selectedPost.introspectiveQuestion}"
            </p>
          </div>

          {/* TULC Solution Callout & Final CTA */}
          <div className="mt-10 p-8 rounded-xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-amber-500/40 text-center space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
              The TULC Sovereign Solution
            </span>
            <h3 className="serif-heading text-2xl font-bold text-zinc-100">
              Transform Your Organization Into an Autonomous Institution
            </h3>
            <p className="text-sm text-zinc-300 max-w-xl mx-auto font-light leading-relaxed">
              {selectedPost.tulcSolutionCallout}
            </p>

            <button
              onClick={onOpenCalibration}
              className="mt-4 px-8 py-4 rounded-sm bg-gradient-to-r from-amber-400 to-amber-500 text-zinc-950 font-semibold text-xs tracking-wider uppercase hover:from-amber-300 hover:to-amber-400 transition-all duration-200 shadow-lg shadow-amber-500/10 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>{selectedPost.callToAction.primaryText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <div className="text-[11px] font-mono text-zinc-500 mt-2">
              {selectedPost.callToAction.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
