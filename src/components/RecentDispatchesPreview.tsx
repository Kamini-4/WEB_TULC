import React from 'react';
import { BLOG_POSTS, BlogPost } from '../data/blogData';
import { BookOpen, ArrowRight, Clock, Sparkles } from 'lucide-react';

interface RecentDispatchesPreviewProps {
  onOpenFullLibrary: () => void;
  onSelectPost?: (post: BlogPost) => void;
}

export const RecentDispatchesPreview: React.FC<RecentDispatchesPreviewProps> = ({
  onOpenFullLibrary
}) => {
  const featuredPosts = BLOG_POSTS.slice(0, 3);

  return (
    <section id="dispatches-preview" className="py-10 sm:py-12 lg:py-14 border-b border-[#e5decfe0] bg-[#f8f6f0] relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs uppercase text-[#9d7b38] font-bold mb-2">
              <BookOpen className="w-4 h-4 text-[#9d7b38]" />
              <span>Sovereign Intelligence</span>
              <span aria-hidden="true" className="text-[#c9bea9]">·</span>
              <span className="text-[#17181c] font-bold">Executive Dispatches</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#17181c] leading-tight">
              Strategic Dispatches & Thought Leadership
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-[#555861] leading-relaxed">
              Uncompromising essays on executive decoupling, decision velocity, and building enduring enterprises.
            </p>
          </div>

          <button
            onClick={onOpenFullLibrary}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#17181c] hover:bg-[#282a30] text-[#f8f6f0] text-xs font-bold uppercase rounded-sm transition-all shadow-xs cursor-pointer active:scale-98 shrink-0 self-start sm:self-auto"
          >
            <span>View All Dispatches ({BLOG_POSTS.length})</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#d4af37]" />
          </button>
        </div>

        {/* 3 Featured Dispatch Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {featuredPosts.map((post, idx) => (
            <div
              key={post.id}
              onClick={onOpenFullLibrary}
              className="p-5 rounded-lg bg-[#ffffff] border border-[#d8cebe] hover:border-[#9d7b38] shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#8f6d28]">
                  <span className="px-2 py-0.5 rounded-xs bg-[#faf6ee] border border-[#ebdcc0] font-bold">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1 text-[#6b6e76]">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-[#17181c] group-hover:text-[#9d7b38] transition-colors leading-snug line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-xs text-[#555861] leading-relaxed line-clamp-3 italic">
                  "{post.hook}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#f0eade] flex items-center justify-between text-xs font-semibold text-[#17181c] group-hover:text-[#9d7b38] transition-colors">
                <span>Read Full Dispatch</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#9d7b38]" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
