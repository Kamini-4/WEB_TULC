import React, { useEffect, useState, useRef } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from 'react-router-dom';
import { Share2, Link as LinkIcon, Mail, Check, X, ArrowRight, BookOpen, Clock, FileText } from 'lucide-react';
import { Linkedin } from './BrandIcons';
import { PermanentArtwork } from './PermanentArtwork';
import { INSTITUTIONAL_ARTICLES } from '../src/lib/articles';
import { GooglePreferredSource } from './GooglePreferredSource';
import { SEOHead } from '../src/components/SEOHead';

interface Article {
  id?: string;
  slug?: string;
  category: string;
  title: string;
  excerpt?: string;
  content: string[];
  date?: string;
  image?: string;
  timestamp?: number;
  season?: string;
  episode?: string;
}

interface ArticleViewProps {
  article: Article | null;
  onClose: () => void;
  onSelectArticle?: (article: any) => void;
}

const getArticleStats = (article: Article) => {
  const text = Array.isArray(article.content) ? article.content.join(' ') : (article.content || '');
  const words = text.split(/\s+/).filter(Boolean).length;
  const finalWords = words > 100 ? words : 1250;
  const readTime = Math.max(2, Math.ceil(finalWords / 200));
  return {
    words: finalWords.toLocaleString(),
    readTime
  };
};

interface ParsedArticle {
  coreParagraphs: string[];
  takeaways: string[];
  introspectiveQuestion: string | null;
  tulcOperationalSection: string[];
}

function parseArticleContent(paragraphs: string[]): ParsedArticle {
  if (!paragraphs || !paragraphs.length) {
    return { coreParagraphs: [], takeaways: [], introspectiveQuestion: null, tulcOperationalSection: [] };
  }

  const coreParagraphs: string[] = [];
  const takeaways: string[] = [];
  let introspectiveQuestion: string | null = null;
  const tulcOperationalSection: string[] = [];

  let mode: 'core' | 'takeaways' | 'question' | 'tulc' = 'core';

  for (const raw of paragraphs) {
    const trimmed = raw.trim();
    const lower = trimmed.toLowerCase();

    if (lower.startsWith('### key takeaways') || lower.startsWith('## key takeaways') || lower.startsWith('key takeaways:')) {
      mode = 'takeaways';
      continue;
    }
    if (lower.startsWith('### an introspective question') || lower.startsWith('## an introspective question') || lower.startsWith('an introspective question')) {
      mode = 'question';
      continue;
    }
    if (lower.startsWith('### how the unbounded') || lower.startsWith('### how tulc') || lower.startsWith('## how the unbounded') || lower.startsWith('## how tulc')) {
      mode = 'tulc';
    }

    if (mode === 'takeaways') {
      const lines = trimmed.split('\n');
      for (const line of lines) {
        const clean = line.replace(/^[-*•]\s*/, '').trim();
        if (clean && !clean.toLowerCase().includes('key takeaway')) {
          takeaways.push(clean);
        }
      }
    } else if (mode === 'question') {
      const clean = trimmed.replace(/^>\s*/, '').replace(/^"|"$/g, '').trim();
      if (clean && !clean.toLowerCase().includes('introspective question')) {
        introspectiveQuestion = introspectiveQuestion ? introspectiveQuestion + ' ' + clean : clean;
      }
    } else if (mode === 'tulc') {
      tulcOperationalSection.push(trimmed);
    } else {
      coreParagraphs.push(trimmed);
    }
  }

  // Fallback: If no explicit takeaways exist in the text, synthesize 3 strategic takeaways
  if (takeaways.length === 0 && coreParagraphs.length > 0) {
    takeaways.push("*Foundational Alignment:* **Systemic clarity** is the primary driver of institutional velocity; ambiguity at the leadership level compounds throughout the entire organization.");
    takeaways.push("*Strategic Execution:* Eliminate operational bottlenecks by **codifying decision rules** and establishing non-negotiable execution boundaries.");
    takeaways.push("*Sovereign Authority:* Transition from reactive individual intervention to **self-sustaining architectural systems** that preserve leadership bandwidth.");
  }

  return { coreParagraphs, takeaways, introspectiveQuestion, tulcOperationalSection };
}

export const ArticleView: React.FC<ArticleViewProps> = ({ article, onClose, onSelectArticle }) => {
  const [copied, setCopied] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [prevArticleId, setPrevArticleId] = useState<string | undefined>(undefined);
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentContainerRef = useRef<HTMLDivElement>(null);

  if (article && article.id !== prevArticleId) {
    setPrevArticleId(article.id);
    setImageFailed(false);
    setScrollProgress(0);
  }

  // Find next article in sequence (Binge / Episodic Engine)
  const currentIndex = article ? INSTITUTIONAL_ARTICLES.findIndex(a => a.id === article.id || a.slug === article.slug) : -1;
  const nextArticle = (currentIndex !== -1 && currentIndex < INSTITUTIONAL_ARTICLES.length - 1)
    ? INSTITUTIONAL_ARTICLES[currentIndex + 1]
    : (INSTITUTIONAL_ARTICLES.length > 0 ? INSTITUTIONAL_ARTICLES[0] : null);

  // Filter 3 related articles from the registry for internal link cross-pollination
  const relatedArticles = INSTITUTIONAL_ARTICLES.filter(
    a => (a.id !== article?.id && a.slug !== article?.slug)
  ).slice(0, 3);

  // Track fluid scroll progress
  const handleScroll = () => {
    if (contentContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentContainerRef.current;
      const totalScroll = scrollHeight - clientHeight;
      if (totalScroll > 0) {
        const progress = Math.min(100, Math.max(0, (scrollTop / totalScroll) * 100));
        setScrollProgress(progress);
      }
    }
  };

  useEffect(() => {
    if (article) {
      document.body.style.overflow = 'hidden';
      const previousTitle = document.title;
      const previousDesc = document.querySelector('meta[name="description"]')?.getAttribute('content');
      
      document.title = `${article.title} | Suchita Sancheti | TULC`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', article.content[0]?.substring(0, 160) + '...');
      }

      // Inject dynamic Article JSON-LD Schema
      const scriptId = 'article-json-ld';
      let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = scriptId;
        scriptTag.type = 'application/ld+json';
        document.head.appendChild(scriptTag);
      }

      const articleUrl = `https://theunboundedleadership.com/library/${article.slug || article.id || ''}`;
      const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        'headline': article.title,
        'description': article.content[0]?.substring(0, 200) || '',
        'author': {
          '@type': 'Person',
          'name': 'Suchita Sancheti',
          'jobTitle': 'Founder & Enterprise Architect',
          'url': 'https://theunboundedleadership.com/about'
        },
        'publisher': {
          '@type': 'Organization',
          'name': 'The Unbounded Leadership Co.',
          'url': 'https://theunboundedleadership.com',
          'logo': {
            '@type': 'ImageObject',
            'url': 'https://theunboundedleadership.com/og-image.jpg'
          }
        },
        'mainEntityOfPage': {
          '@type': 'WebPage',
          '@id': articleUrl
        }
      };
      scriptTag.textContent = JSON.stringify(articleSchema);

      // Keyboard Esc listener for fast exit
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = 'unset'; 
        document.title = previousTitle;
        if (metaDesc && previousDesc) {
          metaDesc.setAttribute('content', previousDesc);
        }
        const existingScript = document.getElementById(scriptId);
        if (existingScript) {
          existingScript.remove();
        }
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [article, onClose]);

  if (!article) return null;

  const baseShareUrl = typeof window !== 'undefined' && 
    !window.location.hostname.includes('localhost') && 
    !window.location.hostname.includes('127.0.0.1') && 
    !window.location.hostname.includes('run.app') && 
    !window.location.hostname.includes('webcontainer')
      ? window.location.origin 
      : 'https://theunboundedleadership.com';
  const shareUrl = baseShareUrl + (article.slug || article.id ? `/library/${article.slug || article.id}` : '/library');
  const shareTitle = `${article.title} | The Unbounded Leadership Co.`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleNextArticleClick = () => {
    if (nextArticle && onSelectArticle) {
      onSelectArticle(nextArticle);
    }
  };

  const shareLinks = [
    {
      name: 'X',
      icon: <X size={14} />,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin size={14} />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: 'Email',
      icon: <Mail size={14} />,
      url: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`Review this executive intelligence brief from The Unbounded Leadership Co.:\n\n${shareUrl}`)}`,
    }
  ];

  // Parse structured sections to deliver context & value first, and other stuff at the bottom
  const { coreParagraphs, takeaways, introspectiveQuestion, tulcOperationalSection } = parseArticleContent(article.content);

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-0 sm:p-2 md:p-6 lg:p-8 animate-fade-in overscroll-none font-serif">
      {/* Dynamic SEO, GEO & AEO Meta and Schema */}
      <SEOHead
        title={article.title}
        description={article.excerpt || (article.content && article.content[0] ? article.content[0].substring(0, 160) : '')}
        canonicalPath={`/library/${article.slug || article.id || ''}`}
        type="article"
        image={article.image || 'https://theunboundedleadership.com/og-image.jpg'}
        keywords={`${article.category.toLowerCase()}, leadership architecture, executive governance, suchita sancheti, decision velocity, institutional dispatch`}
        articleData={{
          authorName: 'Suchita Sancheti',
          category: article.category,
          wordCount: getArticleStats(article).words,
          thesis: article.excerpt
        }}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Executive Library', path: '/library' },
          { name: article.title, path: `/library/${article.slug || article.id || ''}` }
        ]}
      />

      {/* Dimmed backdrop */}
      <div 
        className="absolute inset-0 bg-[#0a0e1a]/95 backdrop-blur-sm cursor-pointer" 
        onClick={onClose}
        aria-label="Close modal overlay"
      />
      
      {/* Fluid Reader Container: Warm Archival Paper Surface (#faf8f5) - Gentle on Eyes */}
      <div 
        key={article?.id || article?.slug || 'article-view'}
        ref={contentContainerRef}
        onScroll={handleScroll}
        className="relative w-full max-w-5xl h-[100dvh] sm:h-auto sm:max-h-[92vh] bg-[#faf8f5] shadow-2xl overflow-y-auto overflow-x-hidden scroll-smooth flex flex-col border-0 sm:border border-[#b8860b]/25 sm:rounded-sm overscroll-contain font-serif"
      >
        {/* Minimal Clean Sticky Header with Fluid Progress Bar - NO Distracting Links at Top */}
        <div className="sticky top-0 bg-[#faf8f5]/96 backdrop-blur-md border-b border-stone-200/80 z-30 flex justify-between items-center px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 shadow-2xs">
          {/* Top Progress Line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-stone-200">
            <div 
              className="h-full bg-gradient-to-r from-[#b8860b] via-[#d4af37] to-[#b8860b] transition-all duration-150"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>

          {/* Left Kicker: Unboxed Clean Editorial Metadata */}
          <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 pr-2">
            <span className="text-xs font-serif font-bold uppercase text-[#b8860b] tracking-wider shrink-0">
              {article.category}
            </span>
            <span className="text-stone-300 select-none">·</span>
            <span className="text-xs uppercase text-stone-600 truncate hidden xs:inline tracking-wide font-serif">
              Executive Dispatch
            </span>
          </div>

          {/* Right Controls: Fast Close affordance */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button 
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-200/90 hover:bg-stone-300 text-stone-800 hover:text-black rounded-xs transition-colors cursor-pointer text-xs font-serif font-bold uppercase tracking-wider shrink-0"
              aria-label="Close Article"
            >
              <X size={14} className="shrink-0" />
              <span>Close <span className="hidden sm:inline">[Esc]</span></span>
            </button>
          </div>
        </div>

        {/* Article Reading Column - Centered, Easy-on-Eyes Measure (max-w-3xl) */}
        <div className="w-full max-w-3xl mx-auto px-6 sm:px-10 md:px-12 py-8 sm:py-12 md:py-14">
          <header className="mb-8 sm:mb-10">
            {/* Clickable Internal Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-xs text-stone-500 font-serif flex-wrap">
              <Link to="/" onClick={onClose} className="hover:text-[#8c6708] transition-colors">Home</Link>
              <span className="text-stone-300">/</span>
              <Link to="/library" onClick={onClose} className="hover:text-[#8c6708] transition-colors">Executive Library</Link>
              <span className="text-stone-300">/</span>
              <span className="text-[#8c6708] font-semibold truncate max-w-[280px]">{article.title}</span>
            </nav>

            {/* Category Kicker */}
            <div className="flex items-center gap-2 text-xs uppercase text-[#b8860b] font-serif font-bold tracking-widest mb-2.5">
              <span>{article.category}</span>
              <span className="text-stone-300">·</span>
              <span className="text-stone-600 font-normal">Institutional Intelligence Dispatch</span>
            </div>
            
            {/* Reduced Title Font Size in Pure Playfair Display */}
            <h1 className="text-xl sm:text-2xl md:text-[27px] lg:text-[30px] font-bold text-[#1c1917] leading-[1.32] mb-3.5 font-serif break-words tracking-tight">
              {article.title}
            </h1>
            
            {/* Quiet, Legible Metadata */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-[13px] text-stone-600 font-serif mb-6 pb-4 border-b border-stone-200/80">
              <span className="text-stone-900 font-bold">Author: Suchita Sancheti</span>
              <span className="text-stone-300">•</span>
              <span className="inline-flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-stone-500" />
                {getArticleStats(article).words} Words
              </span>
              <span className="text-stone-300">•</span>
              <span className="text-[#996f08] font-bold inline-flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#996f08]" />
                {getArticleStats(article).readTime} Min Read
              </span>
              {article.date && (
                <>
                  <span className="text-stone-300">•</span>
                  <span>{article.date}</span>
                </>
              )}
            </div>

            {/* Context First: Executive Context & Strategic Thesis Box */}
            {article.excerpt && (
              <div className="my-6 p-5 sm:p-6 bg-[#f4efe6] border-l-2 border-[#b8860b] border-y border-r border-stone-200/80 rounded-r-xs shadow-2xs">
                <div className="flex items-center gap-2 mb-2 text-xs font-serif font-bold uppercase tracking-wider text-[#996f08]">
                  <span>Executive Context & Strategic Thesis</span>
                </div>
                <p className="text-[#2c2825] text-base sm:text-[17.5px] font-serif italic leading-relaxed">
                  "{article.excerpt}"
                </p>
              </div>
            )}
          </header>

          {/* We Deliver The Value: Primary Prose Content in Relaxed Cadence */}
          <div className="font-serif">
            {coreParagraphs.map((paragraph, idx) => (
              <div key={idx} className="mb-5 sm:mb-6">
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: ({ node, ...props }) => {
                      const isInternal = props.href?.startsWith('/');
                      if (isInternal) {
                        return (
                          <Link 
                            to={props.href!} 
                            className="inline-flex items-center gap-1 text-[#b8860b] hover:text-[#996f08] font-bold font-serif border-b border-[#b8860b]/40 hover:border-[#b8860b] transition-colors" 
                            onClick={onClose}
                          >
                            <span>{props.children}</span>
                            <ArrowRight className="w-3 h-3 inline-block shrink-0" />
                          </Link>
                        );
                      }
                      return <a {...props} className="text-[#b8860b] hover:underline font-serif font-semibold" target="_blank" rel="noopener noreferrer" />;
                    },
                    h2: ({ node, ...props }) => (
                      <h2 className="text-xl sm:text-2xl md:text-[25px] font-bold font-serif text-[#1c1917] mt-10 mb-4 border-b border-[#b8860b]/20 pb-2.5 break-words leading-snug tracking-tight" {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3 className="text-lg sm:text-xl md:text-[21px] font-bold font-serif text-[#22201e] mt-8 mb-3 break-words leading-snug tracking-normal" {...props} />
                    ),
                    p: ({ node, ...props }) => (
                      <p className="text-[#262422] text-base sm:text-lg md:text-[18px] leading-[1.85] mb-5 font-serif font-normal" {...props} />
                    ),
                    blockquote: ({ node, ...props }) => (
                      <blockquote className="my-7 pl-5 sm:pl-6 py-3 border-l-2 border-[#b8860b] bg-[#f4efe6]/70 italic text-[#24201d] font-serif text-base sm:text-lg rounded-r-xs" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul className="space-y-3 my-5 list-disc pl-6 text-[#2c2825] font-serif text-base sm:text-lg leading-relaxed" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                      <ol className="space-y-3 my-5 list-decimal pl-6 text-[#2c2825] font-serif text-base sm:text-lg leading-relaxed" {...props} />
                    ),
                    strong: ({ node, ...props }) => (
                      <strong className="font-bold text-[#111111] font-serif" {...props} />
                    ),
                    em: ({ node, ...props }) => (
                      <em className="italic text-[#8c6708] font-serif font-semibold" {...props} />
                    ),
                    table: ({ node, ...props }) => (
                      <div className="my-8 w-full overflow-x-auto border border-stone-200/90 rounded-xs shadow-2xs bg-white">
                        <div className="sm:hidden px-3 py-1.5 bg-stone-100 border-b border-stone-200 text-xs font-serif text-stone-600 uppercase flex items-center justify-between">
                          <span>Operational Matrix</span>
                          <span className="text-[#b8860b]">← Drag to scroll →</span>
                        </div>
                        <table className="w-full min-w-[520px] text-left text-sm text-stone-800 divide-y divide-stone-200 font-serif" {...props} />
                      </div>
                    ),
                    thead: ({ node, ...props }) => (
                      <thead className="bg-[#f5efe6] text-stone-900 text-xs font-bold uppercase tracking-wider font-serif" {...props} />
                    ),
                    th: ({ node, ...props }) => (
                      <th className="px-4 py-3 font-bold border-b border-stone-200 text-xs font-serif" {...props} />
                    ),
                    td: ({ node, ...props }) => (
                      <td className="px-4 py-3.5 border-b border-stone-100 font-serif text-sm sm:text-base text-stone-800 leading-normal" {...props} />
                    ),
                  }}
                >
                  {paragraph}
                </Markdown>
              </div>
            ))}
          </div>

          {/* Key Strategic Takeaways - Dedicated High-Impact Component */}
          {takeaways.length > 0 && (
            <div className="my-10 p-6 sm:p-8 bg-[#f4efe6] border border-[#b8860b]/40 rounded-xs shadow-xs">
              <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-[#b8860b]/20">
                <span className="text-[#b8860b] text-base select-none">✦</span>
                <h3 className="text-base sm:text-lg font-bold font-serif text-[#1c1917] uppercase tracking-wider">
                  Key Strategic Takeaways
                </h3>
              </div>
              <p className="text-xs uppercase text-stone-500 font-serif tracking-widest mb-4">
                Executive Synthesis & Core Principles
              </p>
              <ul className="space-y-3.5 font-serif text-base sm:text-[17.5px] leading-relaxed text-[#262422]">
                {takeaways.map((item, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-3">
                    <span className="text-[#b8860b] font-bold text-base mt-0.5 select-none shrink-0">▪</span>
                    <div className="flex-1 font-serif">
                      <Markdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ node, ...props }) => <span {...props} />,
                          strong: ({ node, ...props }) => <strong className="font-bold text-[#111111] font-serif" {...props} />,
                          em: ({ node, ...props }) => <em className="italic text-[#1a1715] font-serif font-semibold" {...props} />
                        }}
                      >
                        {item}
                      </Markdown>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Introspective Question for the Executive Mind */}
          {introspectiveQuestion && (
            <div className="my-8 p-6 sm:p-7 bg-white border border-stone-200/90 rounded-xs shadow-2xs">
              <div className="flex items-center gap-2 mb-2.5 text-xs font-serif font-bold uppercase tracking-wider text-[#996f08]">
                <span>✧ An Introspective Question for the Executive Mind</span>
              </div>
              <p className="text-[#262422] text-base sm:text-[18px] font-serif italic leading-relaxed">
                "{introspectiveQuestion}"
              </p>
            </div>
          )}

          {/* At The Bottom: We Place The Other Stuff and Links */}

          {/* 1. Operational Implementation Fixes from Article */}
          {tulcOperationalSection.length > 0 && (
            <div className="my-10 p-6 sm:p-7 bg-white border border-[#b8860b]/30 rounded-xs shadow-2xs space-y-3 font-serif">
              {tulcOperationalSection.map((p, pIdx) => (
                <div key={pIdx}>
                  <Markdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h3: ({ node, ...props }) => (
                        <h3 className="text-base sm:text-lg font-bold font-serif text-[#1c1917] mb-2 uppercase tracking-wide" {...props} />
                      ),
                      p: ({ node, ...props }) => (
                        <p className="text-sm sm:text-base text-stone-700 font-serif leading-relaxed mb-3" {...props} />
                      ),
                      ul: ({ node, ...props }) => <ul className="space-y-2 font-serif text-sm text-stone-700 my-2 pl-4 list-disc" {...props} />,
                      li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
                      a: ({ node, ...props }) => {
                        const isInternal = props.href?.startsWith('/');
                        if (isInternal) {
                          return (
                            <Link
                              to={props.href!}
                              onClick={onClose}
                              className="inline-flex items-center gap-1 text-[#b8860b] hover:text-[#996f08] font-bold font-serif border-b border-[#b8860b]/40 hover:border-[#b8860b] transition-colors"
                            >
                              <span>{props.children}</span>
                              <ArrowRight className="w-3 h-3 inline-block shrink-0" />
                            </Link>
                          );
                        }
                        return <a {...props} className="text-[#b8860b] hover:underline font-serif font-semibold" target="_blank" rel="noopener noreferrer" />;
                      }
                    }}
                  >
                    {p}
                  </Markdown>
                </div>
              ))}
            </div>
          )}

          {/* 2. Quick-Action Internal Navigation Bridges Strip (Moved from Top to Bottom) */}
          <div className="my-8 p-5 sm:p-6 bg-white border border-stone-200/90 rounded-xs shadow-xs font-serif">
            <div className="flex items-center justify-between mb-3.5 flex-wrap gap-2">
              <span className="text-xs font-serif font-bold uppercase text-[#b8860b] tracking-wider">
                Operational Hubs & Institutional Bridges
              </span>
              <span className="text-xs text-stone-500 font-serif italic">
                Turn intelligence into execution
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs font-serif">
              <Link 
                to="/toolkits" 
                onClick={onClose} 
                className="px-3.5 py-1.5 bg-[#faf8f5] hover:bg-white border border-stone-300 hover:border-[#b8860b] text-stone-800 hover:text-[#b8860b] font-bold transition-colors inline-flex items-center gap-1 shrink-0 rounded-xs font-serif"
              >
                Founder Toolkits
              </Link>
              <Link 
                to="/assessment" 
                onClick={onClose} 
                className="px-3.5 py-1.5 bg-[#faf8f5] hover:bg-white border border-stone-300 hover:border-[#b8860b] text-stone-800 hover:text-[#b8860b] font-bold transition-colors inline-flex items-center gap-1 shrink-0 rounded-xs font-serif"
              >
                Yield Diagnostic
              </Link>
              <Link 
                to="/services" 
                onClick={onClose} 
                className="px-3.5 py-1.5 bg-[#faf8f5] hover:bg-white border border-stone-300 hover:border-[#b8860b] text-stone-800 hover:text-[#b8860b] font-bold transition-colors inline-flex items-center gap-1 shrink-0 rounded-xs font-serif"
              >
                Sovereign Retainer
              </Link>
              <Link 
                to="/methodology" 
                onClick={onClose} 
                className="px-3.5 py-1.5 bg-[#faf8f5] hover:bg-white border border-stone-300 hover:border-[#b8860b] text-stone-800 hover:text-[#b8860b] font-bold transition-colors inline-flex items-center gap-1 shrink-0 rounded-xs font-serif"
              >
                Alignment Protocol
              </Link>
              <Link 
                to="/cognitive-tax" 
                onClick={onClose} 
                className="px-3.5 py-1.5 bg-[#faf8f5] hover:bg-white border border-stone-300 hover:border-[#b8860b] text-stone-800 hover:text-[#b8860b] font-bold transition-colors inline-flex items-center gap-1 shrink-0 rounded-xs font-serif"
              >
                Cognitive Tax
              </Link>
              <Link 
                to="/intake" 
                onClick={onClose} 
                className="px-3.5 py-1.5 bg-[#b8860b] text-white hover:bg-[#1a1715] font-bold transition-colors inline-flex items-center gap-1 shrink-0 rounded-xs font-serif"
              >
                Private Intake Desk
              </Link>
            </div>
          </div>

          {/* 3. Contextual Ecosystem Cross-Linking Gateway */}
          <div className="my-8 sm:my-10 p-5 sm:p-7 md:p-8 bg-white border border-[#b8860b]/30 rounded-xs shadow-2xs space-y-4 font-serif">
            <div className="flex items-center gap-2 text-[#b8860b] text-xs font-bold uppercase tracking-wider font-serif">
              <span>Operational Execution Bridges & Institutional Assets</span>
            </div>
            <p className="text-sm text-stone-700 font-serif font-normal leading-relaxed">
              Connect the strategic architecture in this briefing directly to turnkey digital systems, organizational diagnostics, and dedicated executive mandates:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2 text-xs font-serif">
              <Link 
                to="/toolkits" 
                onClick={onClose} 
                className="p-4 bg-stone-50 hover:bg-stone-100 border border-stone-200 hover:border-[#b8860b] transition-all block group rounded-xs font-serif"
              >
                <div className="font-bold text-[#111111] group-hover:text-[#b8860b] flex items-center justify-between mb-1.5 font-serif">
                  <span>Founder Toolkits</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#b8860b]" />
                </div>
                <div className="text-xs text-stone-600 leading-normal font-serif">
                  Turnkey production-ready digital workspaces & delegation filters.
                </div>
              </Link>
              
              <Link 
                to="/assessment" 
                onClick={onClose} 
                className="p-4 bg-stone-50 hover:bg-stone-100 border border-stone-200 hover:border-[#b8860b] transition-all block group rounded-xs font-serif"
              >
                <div className="font-bold text-[#111111] group-hover:text-[#b8860b] flex items-center justify-between mb-1.5 font-serif">
                  <span>Yield Diagnostic</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#b8860b]" />
                </div>
                <div className="text-xs text-stone-600 leading-normal font-serif">
                  Benchmark your firm across 5 domains to isolate hidden friction.
                </div>
              </Link>

              <Link 
                to="/services" 
                onClick={onClose} 
                className="p-4 bg-stone-50 hover:bg-stone-100 border border-stone-200 hover:border-[#b8860b] transition-all block group rounded-xs font-serif"
              >
                <div className="font-bold text-[#111111] group-hover:text-[#b8860b] flex items-center justify-between mb-1.5 font-serif">
                  <span>Sovereign Retainer</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#b8860b]" />
                </div>
                <div className="text-xs text-stone-600 leading-normal font-serif">
                  Retain Suchita Sancheti for ongoing substrate oversight.
                </div>
              </Link>

              <Link 
                to="/methodology" 
                onClick={onClose} 
                className="p-4 bg-stone-50 hover:bg-stone-100 border border-stone-200 hover:border-[#b8860b] transition-all block group rounded-xs font-serif"
              >
                <div className="font-bold text-[#111111] group-hover:text-[#b8860b] flex items-center justify-between mb-1.5 font-serif">
                  <span>Alignment Protocol</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#b8860b]" />
                </div>
                <div className="text-xs text-stone-600 leading-normal font-serif">
                  The 4-phase transformation from hero-led to systemic authority.
                </div>
              </Link>

              <Link 
                to="/cognitive-tax" 
                onClick={onClose} 
                className="p-4 bg-stone-50 hover:bg-stone-100 border border-stone-200 hover:border-[#b8860b] transition-all block group rounded-xs font-serif"
              >
                <div className="font-bold text-[#111111] group-hover:text-[#b8860b] flex items-center justify-between mb-1.5 font-serif">
                  <span>Cognitive Tax Engine</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#b8860b]" />
                </div>
                <div className="text-xs text-stone-600 leading-normal font-serif">
                  Simulate annual EBITDA drained by coordination bottlenecks.
                </div>
              </Link>

              <Link 
                to="/intake" 
                onClick={onClose} 
                className="p-4 bg-[#111111] text-white hover:bg-[#b8860b] transition-all block group rounded-xs font-serif"
              >
                <div className="font-bold text-[#b8860b] group-hover:text-white flex items-center justify-between mb-1.5 font-serif">
                  <span>Private Mandate Intake</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs text-stone-300 group-hover:text-stone-100 leading-normal font-serif">
                  Direct confidential intake docket to Suchita Sancheti's desk.
                </div>
              </Link>
            </div>
          </div>

          {/* 4. Related Strategic Dispatches */}
          {relatedArticles.length > 0 && (
            <div className="my-10 pt-8 border-t border-stone-200/80 font-serif">
              <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#b8860b] tracking-wider font-serif">
                  <BookOpen className="w-4 h-4 text-[#b8860b]" />
                  <span>Related Strategic Dispatches // Internal Network</span>
                </div>
                <Link 
                  to="/library" 
                  onClick={onClose} 
                  className="text-xs text-stone-600 hover:text-[#b8860b] uppercase font-bold flex items-center gap-1.5 transition-colors tracking-wide font-serif"
                >
                  <span>All Dispatches</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {relatedArticles.map((rel) => (
                  <button
                    key={rel.id}
                    onClick={() => {
                      if (onSelectArticle) {
                        onSelectArticle(rel);
                      }
                    }}
                    className="p-4 sm:p-5 bg-white border border-stone-200 hover:border-[#b8860b] text-left transition-all group flex flex-col justify-between rounded-xs cursor-pointer shadow-xs hover:shadow-md font-serif"
                  >
                    <div>
                      <span className="text-xs font-bold uppercase text-[#b8860b] block mb-2 tracking-wider font-serif">
                        {rel.category}
                      </span>
                      <h4 className="text-sm sm:text-base font-bold font-serif text-[#111111] group-hover:text-[#b8860b] line-clamp-2 transition-colors leading-snug">
                        {rel.title}
                      </h4>
                    </div>
                    <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-serif">
                      <span>{getArticleStats(rel).readTime} Min Read</span>
                      <span className="text-[#b8860b] font-bold group-hover:translate-x-1 transition-transform">Read →</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 5. Supporting Archival Visual Exhibit (Placed cleanly at bottom so it never blocks content) */}
          {article.image && (
            <div className="my-10 border border-stone-200 bg-white p-4 sm:p-5 rounded-xs shadow-xs font-serif">
              <div className="text-xs text-stone-600 uppercase tracking-wider mb-3 flex items-center justify-between flex-wrap gap-2">
                <span className="font-bold text-stone-800 font-serif">Archival Visual Reference Substrate</span>
                <span className="text-xs text-[#b8860b] bg-[#b8860b]/10 px-2.5 py-0.5 rounded-xs font-bold tracking-wide font-serif">
                  Archival Exhibit
                </span>
              </div>
              <div className="aspect-[21/9] max-h-[220px] sm:max-h-[280px] overflow-hidden relative rounded-2xs border border-stone-100">
                {imageFailed ? (
                  <PermanentArtwork id={article.id || "generic"} title={article.title} className="w-full h-full" />
                ) : (
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                    onError={() => setImageFailed(true)}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#faf8f5]/30 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          )}

          {/* 6. Up Next in Episodic Sequence */}
          {nextArticle && (
            <div className="my-10 p-6 sm:p-8 bg-[#111111] text-white border border-[#b8860b]/40 rounded-xs shadow-xl relative overflow-hidden font-serif">
              <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-bold text-[#b8860b] tracking-wider font-serif">
                    UP NEXT IN THE EXECUTIVE ARCHIVE // EPISODIC SEQUENCE
                  </span>
                </div>
                <span className="text-xs text-stone-400 font-serif">
                  {getArticleStats(nextArticle).readTime} MIN READ
                </span>
              </div>

              <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-serif text-white mb-2.5 break-words">
                {nextArticle.title}
              </h3>

              <p className="text-sm sm:text-base text-stone-300 font-serif italic mb-6 leading-relaxed">
                {nextArticle.excerpt}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 font-serif">
                <span className="text-xs text-stone-400 font-serif">
                  Category: {nextArticle.category}
                </span>
                <button
                  onClick={handleNextArticleClick}
                  className="px-5 py-2.5 bg-[#b8860b] hover:bg-white hover:text-black text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 rounded-xs shadow-md cursor-pointer ml-auto font-serif"
                >
                  <span>Continue to Next Brief</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* 7. Institutional Footer Strip & Sharing Options */}
          <footer className="mt-14 sm:mt-16 pt-8 border-t border-stone-200/80 font-serif">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6">
              <div>
                <h4 className="text-xs font-bold uppercase text-[#b8860b] mb-2 tracking-wider font-serif">Institutional Note</h4>
                <p className="text-sm text-stone-600 italic leading-relaxed font-serif">
                  This dispatch is part of the Unbounded Restricted Registry. Unauthorized distribution is prohibited under Privileged Disclosure protocols.
                </p>
              </div>
              <div className="md:text-right flex flex-col md:items-end justify-center gap-3">
                <button 
                  onClick={() => {
                    onClose();
                    window.location.href = '/intake';
                  }}
                  className="w-full md:w-auto px-6 py-3 bg-[#b8860b] text-white text-xs font-serif font-bold uppercase hover:bg-[#111111] transition-all shadow-md cursor-pointer tracking-wider"
                >
                  Initiate Yield Calibration
                </button>
              </div>
            </div>

            {/* Social Share & Verification Strip at Bottom */}
            <div className="py-4 my-4 border-y border-stone-200/70 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-600 font-serif">
              <div className="flex items-center gap-2">
                <span className="font-bold text-stone-800">Share Dispatch:</span>
                {shareLinks.map((link) => (
                  <a 
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => {
                      if (link.name === 'LinkedIn') {
                        navigator.clipboard.writeText(shareUrl).catch((err) => console.error(err));
                      }
                    }}
                    className="p-1.5 text-stone-500 hover:text-[#b8860b] transition-colors"
                    title={`Share on ${link.name}`}
                    aria-label={`Share on ${link.name}`}
                  >
                    {link.icon}
                  </a>
                ))}
                <button 
                  onClick={handleCopyLink}
                  className="p-1.5 text-stone-500 hover:text-[#b8860b] transition-colors cursor-pointer inline-flex items-center gap-1"
                  title="Copy Link"
                  aria-label="Copy Link"
                >
                  {copied ? <Check size={14} className="text-green-600" /> : <LinkIcon size={14} />}
                  <span className="text-[11px] uppercase font-bold">{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div>
                <GooglePreferredSource variant="compact" />
              </div>
            </div>

            {/* Seamless Ecosystem Interlinks Matrix */}
            <div className="p-5 bg-stone-100 border border-stone-200 rounded-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-serif">
              <div className="text-stone-700 uppercase font-bold tracking-wide text-center sm:text-left shrink-0 font-serif">
                Next Architectural Steps:
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 font-serif">
                <Link 
                  to="/toolkits" 
                  onClick={onClose}
                  className="px-3 py-1.5 bg-white border border-stone-300 hover:border-[#b8860b] text-stone-800 font-bold uppercase transition-all rounded-xs font-serif"
                >
                  Founder Toolkits
                </Link>
                <Link 
                  to="/assessment" 
                  onClick={onClose}
                  className="px-3 py-1.5 bg-white border border-stone-300 hover:border-[#b8860b] text-stone-800 font-bold uppercase transition-all rounded-xs font-serif"
                >
                  Audit Inaction Tax
                </Link>
                <Link 
                  to="/services" 
                  onClick={onClose}
                  className="px-3 py-1.5 bg-white border border-stone-300 hover:border-[#b8860b] text-stone-800 font-bold uppercase transition-all rounded-xs font-serif"
                >
                  Sovereign Retainer
                </Link>
                <Link 
                  to="/methodology" 
                  onClick={onClose}
                  className="px-3 py-1.5 bg-white border border-stone-300 hover:border-[#b8860b] text-stone-800 font-bold uppercase transition-all rounded-xs font-serif"
                >
                  Alignment Protocol
                </Link>
                <Link 
                  to="/cognitive-tax" 
                  onClick={onClose}
                  className="px-3 py-1.5 bg-white border border-stone-300 hover:border-[#b8860b] text-stone-800 font-bold uppercase transition-all rounded-xs font-serif"
                >
                  Cognitive Tax
                </Link>
                <Link 
                  to="/intake" 
                  onClick={onClose}
                  className="px-3 py-1.5 bg-[#b8860b] text-white font-bold uppercase hover:bg-black transition-all rounded-xs font-serif"
                >
                  Intake Mandate
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default ArticleView;
