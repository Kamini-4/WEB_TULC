
import React, { useEffect, useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Link } from 'react-router-dom';
import { Share2, Link as LinkIcon, Mail, Check, X, ArrowRight, Play, Compass, BookOpen } from 'lucide-react';
import { Linkedin } from './BrandIcons';
import { PermanentArtwork } from './PermanentArtwork';
import { INSTITUTIONAL_ARTICLES } from '../src/lib/articles.ts';
import { GooglePreferredSource } from './GooglePreferredSource';

interface Article {
  id?: string;
  slug?: string;
  category: string;
  title: string;
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

const ArticleView: React.FC<ArticleViewProps> = ({ article, onClose, onSelectArticle }) => {
  const [copied, setCopied] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [prevArticleId, setPrevArticleId] = useState<string | undefined>(undefined);

  if (article && article.id !== prevArticleId) {
    setPrevArticleId(article.id);
    setImageFailed(false);
  }

  // Find next article in sequence (Binge / Episodic Engine)
  const currentIndex = article ? INSTITUTIONAL_ARTICLES.findIndex(a => a.id === article.id || a.slug === article.slug) : -1;
  const nextArticle = (currentIndex !== -1 && currentIndex < INSTITUTIONAL_ARTICLES.length - 1)
    ? INSTITUTIONAL_ARTICLES[currentIndex + 1]
    : (INSTITUTIONAL_ARTICLES.length > 0 ? INSTITUTIONAL_ARTICLES[0] : null);

  useEffect(() => {
    if (article) {
      document.body.style.overflow = 'hidden';
      // Update metadata for SEO/GEO discovery
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
        },
        'url': articleUrl,
        'datePublished': article.date || '2026-01-01',
        'articleSection': article.category || 'Institutional Dispatch',
        'inLanguage': 'en-US'
      };

      scriptTag.text = JSON.stringify(articleSchema);

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
      };
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [article]);

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
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-0 sm:p-4 md:p-10 animate-fade-in">
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
      <div className="absolute inset-0 bg-[#0a0e1a]/95 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-5xl h-full md:h-auto md:max-h-[90vh] bg-[#f5f5f0] shadow-2xl overflow-y-auto scroll-smooth flex flex-col border border-[#b8860b]/20">
        {/* Header Area */}
        <div className="sticky top-0 bg-[#f5f5f0] border-b border-zinc-200 z-20 flex justify-between items-center px-4 sm:px-8 py-4 sm:py-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-[8px] sm:text-[10px] font-black uppercase text-[#b8860b]">{article.category}</span>
            {article.id && <span className="text-[8px] sm:text-[10px] font-black uppercase text-zinc-400">Dispatch {article.id}</span>}
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="hidden sm:flex items-center gap-2 border-r border-zinc-200 pr-3">
              <GooglePreferredSource variant="compact" />
            </div>
            <div className="hidden sm:flex items-center gap-2 border-r border-zinc-200 pr-4 mr-2">
              <span className="text-[8px] font-black uppercase text-zinc-400 ">Share:</span>
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
                  className="p-2 text-zinc-400 hover:text-[#b8860b] transition-colors"
                  title={`Share on ${link.name}`}
                >
                  {link.icon}
                </a>
              ))}
              <button 
                onClick={handleCopyLink}
                className="p-2 text-zinc-400 hover:text-[#b8860b] transition-colors"
                title="Copy Link"
              >
                {copied ? <Check size={14} className="text-green-600" /> : <LinkIcon size={14} />}
              </button>
            </div>
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
            {article.image && (
              <div className="mb-12 aspect-[21/9] overflow-hidden border border-[#b8860b]/20 shadow-2xl relative">
                {imageFailed ? (
                  <PermanentArtwork id={article.id || "generic"} title={article.title} className="w-full h-full" />
                ) : (
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={() => setImageFailed(true)}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#f5f5f0] via-transparent to-transparent opacity-20" />
              </div>
            )}
            <div className="flex justify-between items-start mb-6 sm:mb-8">
              <div className="flex-grow">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-[#111111] leading-[1.1] mb-4">
                  {article.title}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono uppercase text-zinc-500 ">
                  <span>Author: Suchita Sancheti</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{getArticleStats(article).words} Words</span>
                  <span>•</span>
                  <span>{getArticleStats(article).readTime} Min Read</span>
                  {article.date && (
                    <>
                      <span>•</span>
                      <span>{article.date}</span>
                    </>
                  )}
                </div>
              </div>
              <button 
                onClick={handleNativeShare}
                className="sm:hidden p-3 bg-white border border-zinc-200 rounded-full text-[#b8860b] shadow-sm ml-4"
              >
                <Share2 size={16} />
              </button>
            </div>
            <div className="w-16 h-[1px] bg-[#b8860b] mt-6"></div>
          </header>

          <div className="prose prose-zinc lg:prose-xl max-w-none">
            {article.content.map((paragraph, idx) => (
              <div key={idx} className="mb-6 sm:mb-8">
                <Markdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: ({ node, ...props }) => {
                      const isInternal = props.href?.startsWith('/');
                      if (isInternal) {
                        return <Link to={props.href!} className="text-[#b8860b] hover:underline font-bold" onClick={onClose}>{props.children}</Link>;
                      }
                      return <a {...props} className="text-[#b8860b] hover:underline font-semibold" target="_blank" rel="noopener noreferrer" />;
                    },
                    h2: ({ node, ...props }) => (
                      <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#111111] mt-8 mb-4 border-b border-[#b8860b]/30 pb-2" {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                      <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#111111] mt-6 mb-3" {...props} />
                    ),
                    p: ({ node, ...props }) => (
                      <p className="text-zinc-800 text-base sm:text-lg leading-relaxed mb-3 font-serif" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul className="space-y-2 my-4 list-disc pl-6 text-zinc-800 font-serif text-base sm:text-lg" {...props} />
                    ),
                    table: ({ node, ...props }) => (
                      <div className="my-8 overflow-x-auto border border-zinc-300 rounded-xs shadow-sm bg-white">
                        <table className="w-full text-left text-sm text-zinc-800 divide-y divide-zinc-200" {...props} />
                      </div>
                    ),
                    thead: ({ node, ...props }) => (
                      <thead className="bg-zinc-100 text-zinc-900 font-mono text-xs uppercase" {...props} />
                    ),
                    th: ({ node, ...props }) => (
                      <th className="px-4 py-3 font-bold border-b border-zinc-200" {...props} />
                    ),
                    td: ({ node, ...props }) => (
                      <td className="px-4 py-3 border-b border-zinc-100 font-sans" {...props} />
                    ),
                  }}
                >
                  {paragraph}
                </Markdown>
              </div>
            ))}
          </div>

          {/* Netflix-Style "Up Next in Track" Binge Engine Card */}
          {nextArticle && (
            <div className="my-12 p-6 sm:p-8 bg-[#111111] text-white border border-[#b8860b]/40 rounded-xs shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#b8860b] animate-pulse" />
                  <span className="text-[10px] font-mono uppercase font-bold text-[#b8860b] tracking-wider">
                    UP NEXT IN THE EXECUTIVE ARCHIVE // EPISODIC SEQUENCE
                  </span>
                </div>
                <span className="text-[9px] font-mono text-zinc-400">
                  {getArticleStats(nextArticle).readTime} MIN READ
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold font-serif text-white mb-2">
                {nextArticle.title}
              </h3>

              <p className="text-xs sm:text-sm text-zinc-300 font-serif italic mb-5 leading-relaxed">
                {nextArticle.excerpt}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
                <span className="text-[10px] font-mono text-zinc-400">
                  Category: {nextArticle.category}
                </span>
                <button
                  onClick={handleNextArticleClick}
                  className="px-5 py-2.5 bg-[#b8860b] hover:bg-white hover:text-black text-black font-mono font-bold text-[10px] uppercase tracking-wider transition-all flex items-center gap-2 rounded-xs shadow-md cursor-pointer"
                >
                  <span>Continue to Next Brief</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          <footer className="mt-16 sm:mt-24 pt-8 sm:pt-12 border-t border-zinc-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mb-8">
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
                    window.location.href = '/intake';
                  }}
                  className="w-full md:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#b8860b] text-white text-[9px] sm:text-[10px] font-bold uppercase hover:bg-[#111111] transition-all shadow-lg cursor-pointer"
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
            <div className="p-6 bg-zinc-100 border border-zinc-200 rounded-xs flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[9px]">
              <div className="text-zinc-600 uppercase font-bold text-center sm:text-left">
                Next Architectural Steps:
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <Link 
                  to="/assessment" 
                  onClick={onClose}
                  className="px-3 py-1.5 bg-white border border-zinc-300 hover:border-[#b8860b] text-zinc-800 font-bold uppercase transition-all"
                >
                  Audit Inaction Tax
                </Link>
                <Link 
                  to="/services" 
                  onClick={onClose}
                  className="px-3 py-1.5 bg-white border border-zinc-300 hover:border-[#b8860b] text-zinc-800 font-bold uppercase transition-all"
                >
                  Engagement Tracks
                </Link>
                <Link 
                  to="/library" 
                  onClick={onClose}
                  className="px-3 py-1.5 bg-[#b8860b] text-white font-bold uppercase hover:bg-black transition-all"
                >
                  Research Registry
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
