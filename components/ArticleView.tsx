import React, { useEffect, useState, useRef } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from 'react-router-dom';
import { Share2, Link as LinkIcon, Mail, Check, X, ArrowRight, BookOpen, Zap, Layers, Clock, FileText } from 'lucide-react';
import { Linkedin } from './BrandIcons';
import { PermanentArtwork } from './PermanentArtwork';
import { INSTITUTIONAL_ARTICLES } from '../src/lib/articles.ts';
import { GooglePreferredSource } from './GooglePreferredSource';

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

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          url: shareUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-0 sm:p-2 md:p-6 lg:p-8 animate-fade-in overscroll-none">
      {/* Structured Schema.org data for AI crawlers */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "headline": article.title,
            "description": article.excerpt || (article.content && article.content[0] ? article.content[0].substring(0, 160) : ""),
            "image": article.image || "https://theunboundedleadership.com/og-image.jpg",
            "datePublished": "2026-07-10T00:00:00+00:00",
            "author": {
              "@type": "Person",
              "name": "Suchita Sancheti",
              "jobTitle": "Founder & Enterprise Architect",
              "url": "https://theunboundedleadership.com/about"
            },
            "publisher": {
              "@type": "Organization",
              "name": "The Unbounded Leadership Co.",
              "logo": {
                "@type": "ImageObject",
                "url": "https://theunboundedleadership.com/logo.jpg"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": shareUrl
            },
            "wordCount": getArticleStats(article).words.replace(/,/g, '')
          })
        }}
      />

      {/* Dimmed backdrop */}
      <div 
        className="absolute inset-0 bg-[#0a0e1a]/95 backdrop-blur-sm cursor-pointer" 
        onClick={onClose}
        aria-label="Close modal overlay"
      />
      
      {/* Fluid Reader Container: full viewport height on mobile, comfortable card on tablet/desktop */}
      <div 
        key={article?.id || article?.slug || 'article-view'}
        ref={contentContainerRef}
        onScroll={handleScroll}
        className="relative w-full max-w-5xl h-[100dvh] sm:h-auto sm:max-h-[92vh] bg-[#f5f5f0] shadow-2xl overflow-y-auto overflow-x-hidden scroll-smooth flex flex-col border-0 sm:border border-[#b8860b]/20 sm:rounded-sm overscroll-contain"
      >
        {/* Sticky Header with Smooth Fluid Progress Bar */}
        <div className="sticky top-0 bg-[#f5f5f0]/95 backdrop-blur-md border-b border-zinc-200 z-30 flex justify-between items-center px-3.5 sm:px-6 md:px-8 py-2.5 sm:py-3.5 shadow-2xs">
          {/* Top Progress Line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-zinc-200">
            <div 
              className="h-full bg-gradient-to-r from-[#b8860b] via-[#d4af37] to-[#b8860b] transition-all duration-150"
              style={{ width: `${scrollProgress}%` }}
            />
          </div>

          <div className="flex items-center gap-2 sm:gap-3 min-w-0 pr-2">
            <span className="text-xs font-bold uppercase text-[#b8860b] bg-[#b8860b]/10 border border-[#b8860b]/30 px-2.5 py-1 rounded-xs shrink-0 tracking-wider">
              {article.category}
            </span>
            <span className="text-xs uppercase text-zinc-600 truncate hidden xs:inline tracking-wide">
              Executive Dispatch
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <div className="hidden md:flex items-center gap-2 border-r border-zinc-200 pr-3">
              <GooglePreferredSource variant="compact" />
            </div>

            <div className="hidden sm:flex items-center gap-2 border-r border-zinc-200 pr-3">
              <span className="text-xs uppercase text-zinc-500 font-medium">Share:</span>
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
                  className="p-1.5 text-zinc-400 hover:text-[#b8860b] transition-colors"
                  title={`Share on ${link.name}`}
                  aria-label={`Share on ${link.name}`}
                >
                  {link.icon}
                </a>
              ))}
              <button 
                onClick={handleCopyLink}
                className="p-1.5 text-zinc-400 hover:text-[#b8860b] transition-colors cursor-pointer"
                title="Copy Link"
                aria-label="Copy Link"
              >
                {copied ? <Check size={14} className="text-green-600" /> : <LinkIcon size={14} />}
              </button>
            </div>

            <button 
              onClick={handleNativeShare}
              className="sm:hidden p-1.5 text-zinc-600 hover:text-[#b8860b] bg-white border border-zinc-200 rounded-xs"
              title="Share brief"
              aria-label="Share brief"
            >
              <Share2 size={15} />
            </button>

            <button 
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-200 hover:bg-zinc-300 text-zinc-800 hover:text-black rounded-xs transition-colors cursor-pointer text-xs font-bold uppercase tracking-wider shrink-0"
              aria-label="Close Archive"
            >
              <X size={15} className="shrink-0" />
              <span>Close <span className="hidden sm:inline">[Esc]</span></span>
            </button>
          </div>
        </div>

        {/* Article Body - Generous Editorial Typography */}
        <div className="px-6 sm:px-12 md:px-16 lg:px-20 py-8 sm:py-10 md:py-12">
          <header className="mb-8 sm:mb-10">
            <div className="mb-4">
              <div className="flex items-center gap-2.5 mb-3 flex-wrap">
                <span className="text-xs font-bold uppercase text-[#b8860b] px-2.5 py-1 bg-[#b8860b]/10 border border-[#b8860b]/30 rounded-xs tracking-wider">
                  {article.category}
                </span>
                <span className="text-xs uppercase text-zinc-600 tracking-wide">
                  Institutional Intelligence Dispatch
                </span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#111111] leading-tight mb-4 font-serif break-words">
                {article.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-sm uppercase text-zinc-600">
                <span className="text-zinc-800 font-bold">Author: Suchita Sancheti</span>
                <span className="text-zinc-300">•</span>
                <span className="inline-flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-zinc-500" />
                  {getArticleStats(article).words} Words
                </span>
                <span className="text-zinc-300">•</span>
                <span className="text-[#b8860b] font-bold inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#b8860b]" />
                  {getArticleStats(article).readTime} Min Read
                </span>
                {article.date && (
                  <>
                    <span className="text-zinc-300">•</span>
                    <span>{article.date}</span>
                  </>
                )}
              </div>
            </div>

            {/* Quick-Action Internal Navigation Bridges Strip */}
            <div className="flex items-center gap-2 sm:gap-2.5 py-3.5 my-5 border-y border-zinc-200 text-xs uppercase overflow-x-auto no-scrollbar -mx-6 sm:mx-0 px-6 sm:px-0">
              <span className="text-[#b8860b] font-bold mr-1 shrink-0 hidden xs:inline">Hubs:</span>
              <Link 
                to="/toolkits" 
                onClick={onClose} 
                className="px-3.5 py-1.5 bg-white border border-zinc-300 hover:border-[#b8860b] text-zinc-800 hover:text-[#b8860b] font-bold transition-colors inline-flex items-center gap-1 shrink-0 rounded-xs"
              >
                📦 Toolkits
              </Link>
              <Link 
                to="/assessment" 
                onClick={onClose} 
                className="px-3.5 py-1.5 bg-white border border-zinc-300 hover:border-[#b8860b] text-zinc-800 hover:text-[#b8860b] font-bold transition-colors inline-flex items-center gap-1 shrink-0 rounded-xs"
              >
                ⚡ Diagnostic
              </Link>
              <Link 
                to="/services" 
                onClick={onClose} 
                className="px-3.5 py-1.5 bg-white border border-zinc-300 hover:border-[#b8860b] text-zinc-800 hover:text-[#b8860b] font-bold transition-colors inline-flex items-center gap-1 shrink-0 rounded-xs"
              >
                💼 Retainer
              </Link>
              <Link 
                to="/methodology" 
                onClick={onClose} 
                className="px-3.5 py-1.5 bg-white border border-zinc-300 hover:border-[#b8860b] text-zinc-800 hover:text-[#b8860b] font-bold transition-colors inline-flex items-center gap-1 shrink-0 rounded-xs"
              >
                🏛️ Protocol
              </Link>
              <Link 
                to="/cognitive-tax" 
                onClick={onClose} 
                className="px-3.5 py-1.5 bg-white border border-zinc-300 hover:border-[#b8860b] text-zinc-800 hover:text-[#b8860b] font-bold transition-colors inline-flex items-center gap-1 shrink-0 rounded-xs"
              >
                ⚖️ Cognitive Tax
              </Link>
              <Link 
                to="/intake" 
                onClick={onClose} 
                className="px-3.5 py-1.5 bg-[#b8860b] text-white hover:bg-black font-bold transition-colors inline-flex items-center gap-1 shrink-0 rounded-xs"
              >
                ✍️ Intake
              </Link>
            </div>

            {/* Executive Diagnostic Thesis Box */}
            {article.excerpt && (
              <div className="my-6 p-6 sm:p-7 bg-white border-l-4 border-[#b8860b] border-y border-r border-zinc-200/80 shadow-xs rounded-r-xs">
                <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase text-[#b8860b] tracking-wider">
                  <Zap className="w-4 h-4 text-[#b8860b] shrink-0" /> 
                  <span>Executive Thesis // Core Strategic Premise</span>
                </div>
                <p className="text-zinc-800 text-sm sm:text-base md:text-lg font-serif italic leading-relaxed">
                  "{article.excerpt}"
                </p>
              </div>
            )}
          </header>

          {/* Primary Prose Content - Visible Immediately Above The Fold */}
          <div className="prose prose-zinc lg:prose-xl max-w-none">
            {article.content.map((paragraph, idx) => (
              <div key={idx} className="mb-4 sm:mb-6">
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: ({ node, ...props }) => {
                      const isInternal = props.href?.startsWith('/');
                      if (isInternal) {
                        return (
                          <Link 
                            to={props.href!} 
                            className="inline-flex items-center gap-1 text-[#b8860b] hover:text-[#996f08] font-bold border-b border-[#b8860b]/40 hover:border-[#b8860b] transition-colors" 
                            onClick={onClose}
                          >
                            <span>{props.children}</span>
                            <ArrowRight className="w-3 h-3 inline-block shrink-0" />
                          </Link>
                        );
                      }
                      return <a {...props} className="text-[#b8860b] hover:underline font-semibold" target="_blank" rel="noopener noreferrer" />;
                    },
                    h2: ({ node, ...props }) => (
                      <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#111111] mt-10 mb-4 border-b border-[#b8860b]/30 pb-3 break-words leading-snug" {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#111111] mt-8 mb-3 break-words leading-snug" {...props} />
                    ),
                    p: ({ node, ...props }) => (
                      <p className="text-zinc-800 text-base sm:text-lg md:text-[19px] leading-[1.8] mb-5 font-serif" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul className="space-y-2.5 my-5 list-disc pl-6 text-zinc-800 font-serif text-base sm:text-lg leading-relaxed" {...props} />
                    ),
                    table: ({ node, ...props }) => (
                      <div className="my-8 w-full overflow-x-auto border border-zinc-300 rounded-xs shadow-xs bg-white">
                        <div className="sm:hidden px-3 py-1.5 bg-zinc-100 border-b border-zinc-200 text-xs font-serif text-zinc-600 uppercase flex items-center justify-between">
                          <span>Operational Matrix</span>
                          <span className="text-[#b8860b]">← Drag to scroll →</span>
                        </div>
                        <table className="w-full min-w-[550px] text-left text-sm text-zinc-800 divide-y divide-zinc-200" {...props} />
                      </div>
                    ),
                    thead: ({ node, ...props }) => (
                      <thead className="bg-zinc-100 text-zinc-900 text-xs font-bold uppercase tracking-wider" {...props} />
                    ),
                    th: ({ node, ...props }) => (
                      <th className="px-4 py-3 font-bold border-b border-zinc-200 text-xs" {...props} />
                    ),
                    td: ({ node, ...props }) => (
                      <td className="px-4 py-3.5 border-b border-zinc-100 font-serif text-sm sm:text-base text-zinc-800 leading-normal" {...props} />
                    ),
                  }}
                >
                  {paragraph}
                </Markdown>
              </div>
            ))}
          </div>

          {/* Related Strategic Dispatches - Internal Knowledge Graph Linking */}
          {relatedArticles.length > 0 && (
            <div className="my-10 pt-8 border-t border-zinc-200">
              <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase text-[#b8860b] tracking-wider">
                  <BookOpen className="w-4 h-4 text-[#b8860b]" />
                  <span>Related Strategic Dispatches // Internal Network</span>
                </div>
                <Link 
                  to="/library" 
                  onClick={onClose} 
                  className="text-xs text-zinc-600 hover:text-[#b8860b] uppercase font-bold flex items-center gap-1.5 transition-colors tracking-wide"
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
                    className="p-4 sm:p-5 bg-white border border-zinc-200 hover:border-[#b8860b] text-left transition-all group flex flex-col justify-between rounded-xs cursor-pointer shadow-xs hover:shadow-md"
                  >
                    <div>
                      <span className="text-xs font-bold uppercase text-[#b8860b] block mb-2 tracking-wider">
                        {rel.category}
                      </span>
                      <h4 className="text-sm sm:text-base font-bold font-serif text-[#111111] group-hover:text-[#b8860b] line-clamp-2 transition-colors leading-snug">
                        {rel.title}
                      </h4>
                    </div>
                    <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
                      <span>{getArticleStats(rel).readTime} Min Read</span>
                      <span className="text-[#b8860b] font-bold group-hover:translate-x-1 transition-transform">Read →</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Secondary Supporting Visual Reference (Placed at the end so it never blocks content) */}
          {article.image && (
            <div className="my-10 border border-zinc-200 bg-white p-4 sm:p-5 rounded-xs shadow-xs">
              <div className="text-xs text-zinc-600 uppercase tracking-wider mb-3 flex items-center justify-between flex-wrap gap-2">
                <span className="font-bold text-zinc-800">Archival Visual Reference Substrate</span>
                <span className="text-xs text-[#b8860b] bg-[#b8860b]/10 px-2.5 py-0.5 rounded-xs font-bold tracking-wide">
                  Archival Exhibit
                </span>
              </div>
              <div className="aspect-[21/9] max-h-[240px] sm:max-h-[300px] overflow-hidden relative rounded-2xs border border-zinc-100">
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#f5f5f0]/30 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          )}

          {/* Contextual Ecosystem Cross-Linking Gateway */}
          <div className="my-8 sm:my-10 p-5 sm:p-7 md:p-8 bg-white border border-[#b8860b]/30 rounded-xs shadow-2xs space-y-4">
            <div className="flex items-center gap-2 text-[#b8860b] text-xs font-bold uppercase tracking-wider">
              <Layers className="w-4 h-4 text-[#b8860b] shrink-0" /> 
              <span>Operational Execution Bridges & Institutional Assets</span>
            </div>
            <p className="text-sm text-zinc-700 font-normal leading-relaxed">
              Connect the strategic architecture in this briefing directly to turnkey digital systems, organizational diagnostics, and dedicated executive mandates:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2 text-xs">
              <Link 
                to="/toolkits" 
                onClick={onClose} 
                className="p-4 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 hover:border-[#b8860b] transition-all block group rounded-xs"
              >
                <div className="font-bold text-[#111111] group-hover:text-[#b8860b] flex items-center justify-between mb-1.5">
                  <span>📦 Founder Toolkits</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#b8860b]" />
                </div>
                <div className="text-xs text-zinc-600 leading-normal">
                  Turnkey Notion/Coda master workspaces & delegation filters.
                </div>
              </Link>
              
              <Link 
                to="/assessment" 
                onClick={onClose} 
                className="p-4 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 hover:border-[#b8860b] transition-all block group rounded-xs"
              >
                <div className="font-bold text-[#111111] group-hover:text-[#b8860b] flex items-center justify-between mb-1.5">
                  <span>⚡ Yield Diagnostic</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#b8860b]" />
                </div>
                <div className="text-xs text-zinc-600 leading-normal">
                  Benchmark your firm across 5 domains to isolate hidden friction.
                </div>
              </Link>

              <Link 
                to="/services" 
                onClick={onClose} 
                className="p-4 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 hover:border-[#b8860b] transition-all block group rounded-xs"
              >
                <div className="font-bold text-[#111111] group-hover:text-[#b8860b] flex items-center justify-between mb-1.5">
                  <span>💼 Sovereign Retainer</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#b8860b]" />
                </div>
                <div className="text-xs text-zinc-600 leading-normal">
                  Retain the Principal Architect for ongoing substrate oversight.
                </div>
              </Link>

              <Link 
                to="/methodology" 
                onClick={onClose} 
                className="p-4 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 hover:border-[#b8860b] transition-all block group rounded-xs"
              >
                <div className="font-bold text-[#111111] group-hover:text-[#b8860b] flex items-center justify-between mb-1.5">
                  <span>🏛️ Alignment Protocol</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#b8860b]" />
                </div>
                <div className="text-xs text-zinc-600 leading-normal">
                  The 4-phase transformation from hero-led to systemic authority.
                </div>
              </Link>

              <Link 
                to="/cognitive-tax" 
                onClick={onClose} 
                className="p-4 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 hover:border-[#b8860b] transition-all block group rounded-xs"
              >
                <div className="font-bold text-[#111111] group-hover:text-[#b8860b] flex items-center justify-between mb-1.5">
                  <span>⚖️ Cognitive Tax Engine</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#b8860b]" />
                </div>
                <div className="text-xs text-zinc-600 leading-normal">
                  Simulate annual EBITDA drained by coordination bottlenecks.
                </div>
              </Link>

              <Link 
                to="/intake" 
                onClick={onClose} 
                className="p-4 bg-[#111111] text-white hover:bg-[#b8860b] transition-all block group rounded-xs"
              >
                <div className="font-bold text-[#b8860b] group-hover:text-white flex items-center justify-between mb-1.5">
                  <span>✍️ Private Mandate Intake</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
                <div className="text-xs text-zinc-300 group-hover:text-zinc-100 leading-normal">
                  Direct confidential intake docket to the Principal Architect desk.
                </div>
              </Link>
            </div>
          </div>

          {/* Up Next in Track Binge Engine Card */}
          {nextArticle && (
            <div className="my-10 p-6 sm:p-8 bg-[#111111] text-white border border-[#b8860b]/40 rounded-xs shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#b8860b] animate-pulse" />
                  <span className="text-xs uppercase font-bold text-[#b8860b] tracking-wider">
                    UP NEXT IN THE EXECUTIVE ARCHIVE // EPISODIC SEQUENCE
                  </span>
                </div>
                <span className="text-xs text-zinc-400">
                  {getArticleStats(nextArticle).readTime} MIN READ
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-serif text-white mb-2.5 break-words">
                {nextArticle.title}
              </h3>

              <p className="text-sm sm:text-base text-zinc-300 font-serif italic mb-6 leading-relaxed">
                {nextArticle.excerpt}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                <span className="text-xs text-zinc-400">
                  Category: {nextArticle.category}
                </span>
                <button
                  onClick={handleNextArticleClick}
                  className="px-5 py-2.5 bg-[#b8860b] hover:bg-white hover:text-black text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 rounded-xs shadow-md cursor-pointer ml-auto"
                >
                  <span>Continue to Next Brief</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          <footer className="mt-14 sm:mt-16 pt-8 border-t border-zinc-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6">
              <div>
                <h4 className="text-xs font-bold uppercase text-[#b8860b] mb-2 tracking-wider">Institutional Note</h4>
                <p className="text-sm text-zinc-600 italic leading-relaxed">
                  This dispatch is part of the Unbounded Restricted Registry. Unauthorized distribution is prohibited under Privileged Disclosure protocols.
                </p>
              </div>
              <div className="md:text-right flex flex-col md:items-end justify-center gap-3">
                <button 
                  onClick={() => {
                    onClose();
                    window.location.href = '/intake';
                  }}
                  className="w-full md:w-auto px-6 py-3 bg-[#b8860b] text-white text-xs font-bold uppercase hover:bg-[#111111] transition-all shadow-md cursor-pointer tracking-wider"
                >
                  Initiate Yield Calibration
                </button>
              </div>
            </div>

            {/* Google Preferred Source Integration */}
            <div className="mb-6">
              <GooglePreferredSource variant="inline" />
            </div>

            {/* Seamless Ecosystem Interlinks Matrix */}
            <div className="p-5 bg-zinc-100 border border-zinc-200 rounded-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="text-zinc-700 uppercase font-bold tracking-wide text-center sm:text-left shrink-0">
                Next Architectural Steps:
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Link 
                  to="/toolkits" 
                  onClick={onClose}
                  className="px-3.5 py-1.5 bg-white border border-zinc-300 hover:border-[#b8860b] text-zinc-800 font-bold uppercase transition-all rounded-xs"
                >
                  Founder Toolkits
                </Link>
                <Link 
                  to="/assessment" 
                  onClick={onClose}
                  className="px-3.5 py-1.5 bg-white border border-zinc-300 hover:border-[#b8860b] text-zinc-800 font-bold uppercase transition-all rounded-xs"
                >
                  Audit Inaction Tax
                </Link>
                <Link 
                  to="/services" 
                  onClick={onClose}
                  className="px-3.5 py-1.5 bg-white border border-zinc-300 hover:border-[#b8860b] text-zinc-800 font-bold uppercase transition-all rounded-xs"
                >
                  Sovereign Retainer
                </Link>
                <Link 
                  to="/methodology" 
                  onClick={onClose}
                  className="px-3.5 py-1.5 bg-white border border-zinc-300 hover:border-[#b8860b] text-zinc-800 font-bold uppercase transition-all rounded-xs"
                >
                  Alignment Protocol
                </Link>
                <Link 
                  to="/cognitive-tax" 
                  onClick={onClose}
                  className="px-3.5 py-1.5 bg-white border border-zinc-300 hover:border-[#b8860b] text-zinc-800 font-bold uppercase transition-all rounded-xs"
                >
                  Cognitive Tax
                </Link>
                <Link 
                  to="/intake" 
                  onClick={onClose}
                  className="px-3.5 py-1.5 bg-[#b8860b] text-white font-bold uppercase hover:bg-black transition-all rounded-xs"
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
