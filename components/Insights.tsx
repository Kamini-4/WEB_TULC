import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Share2, Link as LinkIcon, X, Check } from 'lucide-react';
import { Linkedin } from './BrandIcons';
import { GoogleGenAI } from "@google/genai";
import { INSTITUTIONAL_ARTICLES, Article } from '../src/lib/articles';
import { PermanentArtwork } from './PermanentArtwork';

interface InsightsProps {
  onArticleClick: (article: Article) => void;
  hideHeader?: boolean;
}

const articles = INSTITUTIONAL_ARTICLES.slice(0, 3);

const getArticleStats = (article: any) => {
  const text = Array.isArray(article.content) ? article.content.join(' ') : (article.content || '');
  const words = text.split(/\s+/).filter(Boolean).length;
  const finalWords = words > 100 ? words : 1250;
  const readTime = Math.max(2, Math.ceil(finalWords / 200));
  return {
    words: finalWords.toLocaleString(),
    readTime
  };
};

const Insights: React.FC<InsightsProps> = ({ onArticleClick, hideHeader }) => {
  const [pulseQuery, setPulseQuery] = useState('');
  const [pulseResult, setPulseResult] = useState<{text: string, links: {uri: string, title: string}[]} | null>(null);
  const [isPulseLoading, setIsPulseLoading] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(true);
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

  const handleShare = (e: React.MouseEvent, article: Article) => {
    e.stopPropagation();
    if (sharingId === article.id) {
      setSharingId(null);
    } else {
      setSharingId(article.id);
    }
  };

  const handleCopyLink = (e: React.MouseEvent, article: Article) => {
    e.stopPropagation();
    const url = `${baseShareUrl}/library/${article.slug || article.id}`;
    navigator.clipboard.writeText(url);
    setCopiedId(article.id);
    setTimeout(() => setCopiedId(null), 2000);
    setSharingId(null);
  };

  useEffect(() => {
    const checkApiKey = async () => {
      if (typeof window !== 'undefined' && (window as any).aistudio) {
        const selected = await (window as any).aistudio.hasSelectedApiKey();
        setHasApiKey(selected);
      }
    };
    checkApiKey();
  }, []);

  const handleOpenKeyDialog = async () => {
    if (typeof window !== 'undefined' && (window as any).aistudio) {
      await (window as any).aistudio.openSelectKey();
      setHasApiKey(true);
    }
  };

  const handlePulseSearch = async () => {
    if (!pulseQuery) return;
    setIsPulseLoading(true);
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "gemini-3.5-flash",
          contents: `Analyze the following strategic vector for a global CXO and provide architectural implications for excellence: "${pulseQuery}". Focus on recent news and trends. 
          IMPORTANT: Provide the response in clean plain text. Do NOT use markdown formatting, asterisks, hashtags, or bold markers.`,
          config: {
            tools: [{ googleSearch: {} }],
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate content');
      }

      const data = await response.json();

      // Note: Grounding metadata is not easily returned in a simple proxy without more complex mapping
      // For now, we'll just show the text.
      const cleanText = (data.text || "Substrate analysis complete. No variance detected.")
        .replace(/[*#]/g, '')
        .trim();

      setPulseResult({
        text: cleanText,
        links: [] // Links are harder to proxy without full response mapping
      });
    } catch (error) {
      console.error(error);
      setPulseResult({ text: "Intelligence gathering recalibrated. Please ensure GEMINI_API_KEY is set in Cloud Run variables.", links: [] });
    } finally {
      setIsPulseLoading(false);
    }
  };

  return (
    <section id="insights" className={`${hideHeader ? 'py-12' : 'py-24'} border-t border-[#ded6c5] bg-[#f7f4ee] text-[#1c1917] transition-all duration-500 font-serif`}>
      <div className="max-w-7xl mx-auto px-6">
        {!hideHeader && (
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
            <div className="max-w-xl">
              <h2 className="text-[#8c6708] text-[10px] font-bold uppercase mb-2 tracking-widest font-serif">Intellectual Authority</h2>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif leading-tight text-[#1c1917]">The Sovereign Library.</h3>
            </div>
            <div className="flex gap-4">
               <button className="text-[#292524] text-[10px] font-bold uppercase border border-[#ded6c5] px-6 py-3 hover:bg-[#efebe2] hover:text-[#1c1917] transition-all font-serif bg-[#ffffff]">
                White Papers
              </button>
              <button className="text-[#8c6708] text-[10px] font-bold uppercase border border-[#b8860b]/40 px-6 py-3 hover:bg-[#efebe2] transition-all font-serif bg-[#ffffff]">
                Institutional Reports
              </button>
               <button 
                onClick={() => document.getElementById('intake')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 bg-gradient-to-r from-[#b8860b] to-[#8c6708] text-white text-[10px] font-bold uppercase hover:from-[#c99518] hover:to-[#9e7610] transition-all shadow-sm font-serif"
               >
                Consult
              </button>
            </div>
          </div>
        )}

        <div className={`grid md:grid-cols-3 gap-12 ${hideHeader ? 'mb-12' : 'mb-20'}`}>
          {articles.map((article, idx) => (
            <div key={idx} className="group cursor-pointer font-serif" onClick={() => {
              onArticleClick(article);
              if (article.slug) {
                navigate(`/library/${article.slug}`);
              } else if (article.id) {
                navigate(`/library/${article.id}`);
              }
            }}>
              <div className="mb-6 overflow-hidden bg-[#efebe2] aspect-[16/10] relative border border-[#ded6c5] rounded-xs">
                {failedImages[article.id] ? (
                  <PermanentArtwork id={article.id} title={article.title} className="w-full h-full" />
                ) : (
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    onError={() => setFailedImages(prev => ({ ...prev, [article.id]: true }))}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                  <span className="text-[10px] font-bold uppercase text-[#1c1917] bg-[#ffffff] px-6 py-3 shadow-xl font-serif">Access Briefing</span>
                </div>
              </div>
              <div className="flex justify-between items-center mb-3">
                <div className="flex flex-col gap-1">
                  <div className="text-[#8c6708] text-[9px] uppercase font-bold font-serif">{article.category}</div>
                  <div className="text-[#78716c] font-serif text-[8.5px] uppercase">
                    {getArticleStats(article).words} words • {getArticleStats(article).readTime} min read
                  </div>
                </div>
                <div className="relative">
                  <button 
                    onClick={(e) => handleShare(e, article)}
                    className="p-1 text-[#78716c] hover:text-[#8c6708] transition-colors"
                  >
                    <Share2 size={12} />
                  </button>
                  {sharingId === article.id && (
                    <div className="absolute right-0 top-6 bg-[#ffffff] border border-[#ded6c5] p-2 z-20 shadow-xl flex flex-col gap-2 min-w-[100px] animate-fade-in rounded-xs">
                      <button 
                        onClick={(e) => handleCopyLink(e, article)}
                        className="flex items-center gap-2 text-[9px] uppercase font-bold text-[#292524] hover:text-[#8c6708] transition-colors p-1"
                      >
                        {copiedId === article.id ? <Check size={10} className="text-green-600" /> : <LinkIcon size={10} />}
                        {copiedId === article.id ? 'Copied' : 'Copy Link'}
                      </button>
                      <a 
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${baseShareUrl}/library/${article.slug || article.id}`)}&text=${encodeURIComponent(article.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 text-[9px] uppercase font-bold text-[#292524] hover:text-[#8c6708] transition-colors p-1"
                      >
                        <X size={10} /> X / Twitter
                      </a>
                      <a 
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${baseShareUrl}/library/${article.slug || article.id}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          const shareUrl = `${baseShareUrl}/library/${article.slug || article.id}`;
                          navigator.clipboard.writeText(shareUrl).catch((err) => console.error(err));
                        }}
                        className="flex items-center gap-2 text-[9px] uppercase font-bold text-[#292524] hover:text-[#8c6708] transition-colors p-1"
                      >
                        <Linkedin size={10} /> LinkedIn
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <h4 className="text-base sm:text-lg font-bold font-serif text-[#1c1917] mb-2 group-hover:text-[#8c6708] transition-colors leading-snug">
                {article.title}
              </h4>
              <p className="text-[#57534e] text-xs sm:text-sm leading-relaxed mb-4 font-normal italic line-clamp-2">
                {article.excerpt}
              </p>
              <div className="w-8 h-px bg-[#ded6c5] group-hover:w-full group-hover:bg-[#8c6708] transition-all duration-700" />
            </div>
          ))}
        </div>

        <div className="bg-[#ffffff] text-[#1c1917] p-10 md:p-16 relative overflow-hidden border border-[#ded6c5] rounded-xs shadow-xs">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#b8860b]/5 blur-[100px] rounded-full" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h4 className="text-[#8c6708] text-[10px] font-bold uppercase mb-6 font-serif">Live Intelligence Pulse</h4>
              <h5 className="text-3xl font-bold mb-6 leading-tight text-[#1c1917]">
                Map global trends against <span className="text-[#996515] italic">architectural excellence.</span>
              </h5>
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="text"
                  placeholder="e.g., Geopolitical shifts in semiconductor supply chains..."
                  value={pulseQuery}
                  onChange={(e) => setPulseQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handlePulseSearch()}
                  className="flex-grow bg-[#faf8f5] border border-[#d8cebe] p-4 text-[#1c1917] text-sm focus:outline-none focus:border-[#b8860b] transition-colors italic font-normal placeholder:text-[#a8a29e]"
                />
                <button 
                  disabled={isPulseLoading || !pulseQuery}
                  onClick={hasApiKey ? handlePulseSearch : handleOpenKeyDialog}
                  className="bg-gradient-to-r from-[#b8860b] to-[#8c6708] text-white px-8 py-4 text-[10px] font-bold uppercase hover:from-[#c99518] hover:to-[#9e7610] transition-all disabled:opacity-50 shadow-sm"
                >
                  {!hasApiKey ? 'Configure API Key' : isPulseLoading ? 'Gathering...' : 'Calibrate Intel'}
                </button>
              </div>
            </div>

            <div className="min-h-[160px] flex flex-col justify-center bg-[#faf8f5] border border-[#ded6c5] p-6 rounded-xs">
              {pulseResult ? (
                <div className="fade-in">
                  <p className="text-[#292524] text-sm leading-relaxed mb-6 italic font-normal">
                    {pulseResult.text}
                  </p>
                  {pulseResult.links.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-[9px] uppercase font-bold text-[#8c6708]">Grounding Sources</p>
                      <div className="flex flex-wrap gap-4">
                        {pulseResult.links.map((link, i) => (
                          <a key={i} href={link.uri} target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#57534e] hover:text-[#1c1917] underline decoration-[#8c6708]/40">
                            {link.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  <button onClick={() => setPulseResult(null)} className="mt-6 text-[9px] font-bold uppercase text-[#78716c] hover:text-[#8c6708] transition-all">Reset Pulse</button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className="w-10 h-[1px] bg-[#ded6c5] mx-auto mb-4" />
                  <p className="text-[#78716c] text-[10px] uppercase font-bold">Awaiting Pulse Vector</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Insights;