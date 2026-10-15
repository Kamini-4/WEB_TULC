
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Share2, Link as LinkIcon, X, Check } from 'lucide-react';
import { Linkedin } from './BrandIcons';
import { SovereignDB, BlogEntry } from '../lib/database';
import { INSTITUTIONAL_ARTICLES } from '../src/lib/articles';
import { PermanentArtwork } from './PermanentArtwork';

interface BlogProps {
  onArticleClick?: (article: any) => void;
  hideHeader?: boolean;
}


const INITIAL_POSTS = INSTITUTIONAL_ARTICLES;

const getArticleStats = (post: any) => {
  const text = Array.isArray(post.content) ? post.content.join(' ') : (post.content || '');
  const words = text.split(/\s+/).filter(Boolean).length;
  const finalWords = words > 100 ? words : 1250;
  const readTime = Math.max(2, Math.ceil(finalWords / 200));
  return {
    words: finalWords.toLocaleString(),
    readTime
  };
};

const Blog: React.FC<BlogProps> = ({ onArticleClick, hideHeader }) => {
  const [posts, setPosts] = useState<any[]>(INITIAL_POSTS);
  const [sharingId, setSharingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();

  const baseShareUrl = typeof window !== 'undefined' && 
    !window.location.hostname.includes('localhost') && 
    !window.location.hostname.includes('127.0.0.1') && 
    !window.location.hostname.includes('run.app') && 
    !window.location.hostname.includes('webcontainer')
      ? window.location.origin 
      : 'https://theunboundedleadership.com';

  const handleShare = (e: React.MouseEvent, post: any) => {
    e.stopPropagation();
    if (sharingId === post.id) {
      setSharingId(null);
    } else {
      setSharingId(post.id);
    }
  };

  const handleCopyLink = (e: React.MouseEvent, post: any) => {
    e.stopPropagation();
    const url = `${baseShareUrl}/library/${post.slug || post.id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(post.id);
    setTimeout(() => setCopiedId(null), 2000);
    setSharingId(null);
  };

  useEffect(() => {
    const unsub = SovereignDB.subscribeToBlog((storedPosts) => {
      if (storedPosts.length > 0) {
        const customPosts = storedPosts.filter(sp => !INITIAL_POSTS.some(ip => ip.title === sp.title));
        setPosts([...INITIAL_POSTS, ...customPosts]);
      } else {
        setPosts(INITIAL_POSTS);
      }
    });
    return () => unsub();
  }, []);

  return (
    <section id="registry" className={`${hideHeader ? 'pt-2 sm:pt-4 pb-16 sm:pb-24' : 'py-16 sm:py-24'} bg-transparent text-[#1c1917] overflow-hidden isolate transition-all duration-500`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {!hideHeader && (
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 sm:mb-14 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-[#8c6708] text-xs sm:text-sm font-bold uppercase tracking-widest mb-2 font-serif">The Registry</h2>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif leading-tight text-[#1c1917]">
                Institutional <span className="italic text-[#996515]">Dispatches.</span>
              </h3>
            </div>
            <div className="md:block">
              <p className="text-[#57534e] text-sm sm:text-base max-w-md italic font-normal leading-relaxed font-serif">
                A curated journal of systemic discourse and executive intelligence for the sovereign leader.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {posts.map((post, idx) => (
            <div 
              key={idx} 
              onClick={() => {
                if (typeof onArticleClick === 'function') {
                  onArticleClick(post);
                }
                if (post.slug) {
                  navigate(`/library/${post.slug}`);
                } else if (post.id) {
                  navigate(`/library/${post.id}`);
                }
              }}
              className="registry-card group cursor-pointer flex flex-col h-full relative isolate p-6 sm:p-7 rounded-xs border border-[#ded6c5] hover:border-[#b8860b]/60 bg-[#ffffff] hover:bg-[#faf8f5] transition-all duration-300 shadow-xs hover:shadow-md font-serif"
            >
              {post.image && (
                <div className="mb-5 overflow-hidden bg-[#efebe2] aspect-[16/10] relative border border-[#ded6c5] group-hover:border-[#b8860b]/30 transition-all duration-700 rounded-xs">
                  {failedImages[post.id] ? (
                    <PermanentArtwork id={post.id} title={post.title} className="w-full h-full" />
                  ) : (
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={() => setFailedImages(prev => ({ ...prev, [post.id]: true }))}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
                </div>
              )}
              
              <div className="flex justify-between items-center mb-4 relative z-10 gap-3 font-serif">
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 min-w-0">
                  <span className="registry-category text-[#8c6708] text-xs font-bold uppercase tracking-wider font-serif">
                    {post.category}
                  </span>
                  <span className="text-[#a8a29e] text-xs uppercase hidden xs:inline">•</span>
                  <span className="text-[#78716c] text-xs uppercase font-serif">
                    {getArticleStats(post).words} words • {getArticleStats(post).readTime} min read
                  </span>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[#78716c] text-xs uppercase hidden sm:inline font-serif">
                    {post.date}
                  </span>
                  <div className="relative">
                    <button 
                      onClick={(e) => handleShare(e, post)}
                      className="p-1.5 text-[#78716c] hover:text-[#8c6708] transition-colors rounded-xs"
                      aria-label="Share post"
                    >
                      <Share2 size={15} />
                    </button>
                    {sharingId === post.id && (
                      <div className="absolute right-0 top-7 bg-[#ffffff] border border-[#ded6c5] p-2.5 z-20 shadow-xl flex flex-col gap-2 min-w-[130px] animate-fade-in text-left rounded-xs font-serif">
                        <button 
                          onClick={(e) => handleCopyLink(e, post)}
                          className="flex items-center gap-2 text-xs uppercase font-bold text-[#292524] hover:text-[#8c6708] transition-colors p-1.5 w-full font-serif"
                        >
                          {copiedId === post.id ? <Check size={13} className="text-green-600" /> : <LinkIcon size={13} />}
                          {copiedId === post.id ? 'Copied' : 'Copy Link'}
                        </button>
                        <a 
                          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${baseShareUrl}/library/${post.slug || post.id}`)}&text=${encodeURIComponent(post.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 text-xs uppercase font-bold text-[#292524] hover:text-[#8c6708] transition-colors p-1.5 font-serif"
                        >
                          <X size={13} /> X / Twitter
                        </a>
                        <a 
                          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${baseShareUrl}/library/${post.slug || post.id}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            const shareUrl = `${baseShareUrl}/library/${post.slug || post.id}`;
                            navigator.clipboard.writeText(shareUrl).catch((err) => console.error(err));
                          }}
                          className="flex items-center gap-2 text-xs uppercase font-bold text-[#292524] hover:text-[#8c6708] transition-colors p-1.5 font-serif"
                        >
                          <Linkedin size={13} /> LinkedIn
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="my-3 h-px bg-[#e2dcce] relative z-10"></div>
              
              <h4 className="registry-title text-lg sm:text-xl font-bold font-serif mb-2.5 leading-snug relative z-10 break-words text-[#1c1917] group-hover:text-[#8c6708] transition-colors">
                {post.title}
              </h4>
              
              <p className="text-[#57534e] text-sm sm:text-base leading-relaxed mb-6 italic font-normal flex-grow relative z-10 break-words line-clamp-3 font-serif">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between text-xs sm:text-sm font-bold uppercase text-[#8c6708] tracking-wider relative z-10 pt-4 border-t border-[#e2dcce]">
                <span>Read Executive Briefing</span>
                <span className="text-base transition-transform group-hover:translate-x-1 duration-300">→</span>
              </div>
            </div>
          ))}
        </div>

        {/* Strategic Cross-Ecosystem Navigation Bridges */}
        <div className="mt-16 sm:mt-20 pt-10 border-t border-[#ded6c5] flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 text-xs">
          <div className="text-[#1c1917] uppercase font-bold tracking-wider text-center md:text-left">
            Institutional Bridges // Convert Intelligence to Execution:
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link 
              to="/toolkits" 
              className="px-4 py-2 bg-[#ffffff] border border-[#ded6c5] hover:border-[#b8860b] text-[#292524] hover:text-[#8c6708] uppercase font-bold tracking-wide transition-all rounded-xs shadow-2xs"
            >
              Founder Toolkits
            </Link>
            <Link 
              to="/assessment" 
              className="px-4 py-2 bg-[#ffffff] border border-[#ded6c5] hover:border-[#b8860b] text-[#292524] hover:text-[#8c6708] uppercase font-bold tracking-wide transition-all rounded-xs shadow-2xs"
            >
              Yield Diagnostic
            </Link>
            <Link 
              to="/services" 
              className="px-4 py-2 bg-[#ffffff] border border-[#ded6c5] hover:border-[#b8860b] text-[#292524] hover:text-[#8c6708] uppercase font-bold tracking-wide transition-all rounded-xs shadow-2xs"
            >
              Sovereign Retainer
            </Link>
            <Link 
              to="/methodology" 
              className="px-4 py-2 bg-[#ffffff] border border-[#ded6c5] hover:border-[#b8860b] text-[#292524] hover:text-[#8c6708] uppercase font-bold tracking-wide transition-all rounded-xs shadow-2xs"
            >
              Alignment Protocol
            </Link>
            <Link 
              to="/cognitive-tax" 
              className="px-4 py-2 bg-[#ffffff] border border-[#ded6c5] hover:border-[#b8860b] text-[#292524] hover:text-[#8c6708] uppercase font-bold tracking-wide transition-all rounded-xs shadow-2xs"
            >
              Cognitive Tax
            </Link>
            <Link 
              to="/intake" 
              className="px-4 py-2 bg-gradient-to-r from-[#b8860b] to-[#8c6708] hover:from-[#c99518] hover:to-[#9e7610] text-white font-bold uppercase tracking-wide transition-all rounded-xs shadow-sm"
            >
              Intake Docket
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blog;
