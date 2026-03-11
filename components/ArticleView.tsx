
import React, { useEffect } from 'react';

interface Article {
  id?: string;
  category: string;
  title: string;
  content: string[];
  date?: string;
}

interface ArticleViewProps {
  article: Article | null;
  onClose: () => void;
}

const ArticleView: React.FC<ArticleViewProps> = ({ article, onClose }) => {
  useEffect(() => {
    if (article) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [article]);

  if (!article) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-0 sm:p-4 md:p-10 animate-fade-in">
      <div className="absolute inset-0 bg-[#0a0e1a]/95 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-5xl h-full md:h-auto md:max-h-[90vh] bg-[#f5f5f0] shadow-2xl overflow-y-auto scroll-smooth flex flex-col border border-[#b8860b]/20">
        {/* Header Area */}
        <div className="sticky top-0 bg-[#f5f5f0] border-b border-zinc-200 z-20 flex justify-between items-center px-4 sm:px-8 py-4 sm:py-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-[8px] sm:text-[10px] font-black uppercase text-[#b8860b]">{article.category}</span>
            {article.id && <span className="text-[8px] sm:text-[10px] font-black uppercase text-zinc-400">Dispatch {article.id}</span>}
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <button 
              onClick={onClose}
              className="text-[8px] sm:text-[10px] font-black uppercase text-zinc-500 hover:text-[#111111] transition-colors"
            >
              Close Archive [Esc]
            </button>
          </div>
        </div>

        {/* Article Body */}
        <div className="px-6 sm:px-12 md:px-24 py-12 sm:py-16 md:py-24">
          <header className="mb-12 sm:mb-16">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#111111] leading-[1.1] mb-6 sm:mb-8">
              {article.title}
            </h1>
            <div className="w-16 h-[1px] bg-[#b8860b]"></div>
          </header>

          <div className="prose prose-zinc lg:prose-xl">
            {article.content.map((paragraph, idx) => (
              <p key={idx} className="text-lg sm:text-xl text-zinc-700 leading-relaxed mb-6 sm:mb-8 italic font-light">
                {paragraph}
              </p>
            ))}
          </div>

          <footer className="mt-16 sm:mt-24 pt-8 sm:pt-12 border-t border-zinc-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
              <div>
                <h4 className="text-[8px] sm:text-[10px] font-black uppercase text-[#b8860b] mb-3 sm:mb-4">Institutional Note</h4>
                <p className="text-xs sm:text-sm text-zinc-500 italic">
                  This dispatch is part of the Unbounded Restricted Registry. Unauthorized distribution is prohibited under Privileged Disclosure protocols.
                </p>
              </div>
              <div className="md:text-right flex flex-col md:items-end justify-center gap-3 sm:gap-4">
                <button 
                  onClick={() => {
                    onClose();
                    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full md:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#b8860b] text-white text-[9px] sm:text-[10px] font-bold uppercase hover:bg-[#111111] transition-all shadow-lg tracking-widest"
                >
                  Initiate Structural Audit
                </button>
                <button 
                  onClick={() => {
                    onClose();
                    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full md:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#111111] text-white text-[9px] sm:text-[10px] font-bold uppercase hover:bg-black transition-all"
                >
                  Consult on this Subject
                </button>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default ArticleView;
