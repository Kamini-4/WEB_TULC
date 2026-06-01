
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Share2, Link as LinkIcon, X, Check } from 'lucide-react';
import { Linkedin } from './BrandIcons';
import { SovereignDB, BlogEntry } from '../lib/database.ts';
import { INSTITUTIONAL_ARTICLES } from '../src/lib/articles';
import { PermanentArtwork } from './PermanentArtwork';

interface BlogProps {
  onArticleClick: (article: any) => void;
  hideHeader?: boolean;
}


const INITIAL_POSTS = INSTITUTIONAL_ARTICLES.filter(a => a.id.startsWith('INT-00'));

const Blog: React.FC<BlogProps> = ({ onArticleClick, hideHeader }) => {
  const [posts, setPosts] = useState<any[]>(INITIAL_POSTS);
  const [sharingId, setSharingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const navigate = useNavigate();

  const baseShareUrl = typeof window !== 'undefined' ? window.location.origin : 'https://theunboundedleadership.com';

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
    <section id="registry" className={`${hideHeader ? 'py-12' : 'py-20 sm:py-24'} bg-[#111111] text-[#f5f5f0] overflow-hidden isolate transition-all duration-500`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {!hideHeader && (
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 sm:mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-[#b8860b] text-[9px] sm:text-[11px] font-black uppercase mb-4 sm:mb-6 tracking-[0.3em]">The Registry</h2>
              <h3 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
                Institutional <span className="italic text-[#b8860b]">Dispatches.</span>
              </h3>
            </div>
            <div className="md:block">
              <p className="text-zinc-500 text-xs sm:text-sm max-w-xs italic font-light">
                A curated journal of systemic discourse and executive intelligence for the sovereign leader.
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
          {posts.map((post, idx) => (
            <div 
              key={idx} 
              onClick={() => {
                onArticleClick(post);
                if (post.slug) {
                  navigate(`/library/${post.slug}`);
                } else if (post.id) {
                  navigate(`/library/${post.id}`);
                }
              }}
              className="registry-card group cursor-pointer flex flex-col h-full relative isolate p-2"
            >
              <div className="absolute top-0 left-0 text-[40px] md:text-[60px] font-bold text-white/[0.02] select-none pointer-events-none group-hover:text-[#b8860b]/[0.05] transition-colors duration-700 -z-10 translate-y-[-10%] md:translate-y-[-20%]">
                {post.id}
              </div>
              
              {post.image && (
                <div className="mb-6 overflow-hidden bg-[#1a1a1a] aspect-[16/10] relative border border-white/5 group-hover:border-[#b8860b]/20 transition-all duration-700">
                  {failedImages[post.id] ? (
                    <PermanentArtwork id={post.id} title={post.title} className="w-full h-full" />
                  ) : (
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      onError={() => setFailedImages(prev => ({ ...prev, [post.id]: true }))}
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-60" />
                </div>
              )}
              
              <div className="flex justify-between items-center mb-4 sm:mb-6 relative z-10">
                <span className="registry-category text-[#b8860b] text-[8px] sm:text-[9px] font-black uppercase tracking-widest">
                  {post.category}
                </span>
                <div className="flex items-center gap-4">
                  <span className="text-zinc-600 text-[8px] sm:text-[9px] font-black uppercase tracking-widest">
                    {post.date}
                  </span>
                  <div className="relative">
                    <button 
                      onClick={(e) => handleShare(e, post)}
                      className="p-1 text-zinc-600 hover:text-[#b8860b] transition-colors"
                    >
                      <Share2 size={12} />
                    </button>
                    {sharingId === post.id && (
                      <div className="absolute right-0 top-6 bg-[#1a1a1a] border border-white/10 p-2 z-20 shadow-2xl flex flex-col gap-2 min-w-[100px] animate-fade-in text-left">
                        <button 
                          onClick={(e) => handleCopyLink(e, post)}
                          className="flex items-center gap-2 text-[9px] uppercase font-bold text-zinc-400 hover:text-white transition-colors p-1 w-full"
                        >
                          {copiedId === post.id ? <Check size={10} className="text-green-500" /> : <LinkIcon size={10} />}
                          {copiedId === post.id ? 'Copied' : 'Copy Link'}
                        </button>
                        <a 
                          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${baseShareUrl}/library/${post.slug || post.id}`)}&text=${encodeURIComponent(post.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 text-[9px] uppercase font-bold text-zinc-400 hover:text-white transition-colors p-1"
                        >
                          <X size={10} /> X / Twitter
                        </a>
                        <a 
                          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${baseShareUrl}/library/${post.slug || post.id}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-2 text-[9px] uppercase font-bold text-zinc-400 hover:text-white transition-colors p-1"
                        >
                          <Linkedin size={10} /> LinkedIn
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="registry-separator mb-4 sm:mb-6 relative z-10"></div>
              
              <h4 className="registry-title text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 leading-snug relative z-10">
                {post.title}
              </h4>
              
              <p className="text-zinc-400 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 italic font-light flex-grow relative z-10">
                {post.excerpt}
              </p>
              
              <div className="flex items-center gap-4 text-[9px] sm:text-[10px] font-black uppercase text-[#b8860b] opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-[-10px] group-hover:translate-x-0 relative z-10 tracking-widest">
                Access Archive Entry <span>→</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-zinc-800/50 flex justify-center relative z-10">
          <button className="px-8 sm:px-12 py-4 sm:py-5 border border-zinc-700 text-[9px] sm:text-[11px] font-bold uppercase hover:border-[#b8860b] hover:text-[#b8860b] transition-all duration-500 bg-transparent tracking-widest shadow-lg">
            Open Archive Entries
          </button>
        </div>
      </div>
    </section>
  );
};

export default Blog;
