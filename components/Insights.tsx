import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Share2, Link as LinkIcon, X, Check } from 'lucide-react';
import { Linkedin } from './BrandIcons';
import { GoogleGenAI } from "@google/genai";

interface Article {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  content: string[];
  image: string;
}

interface InsightsProps {
  onArticleClick: (article: Article) => void;
  hideHeader?: boolean;
}

const articles: Article[] = [
  {
    id: "INT-010",
    category: "Systems Design",
    title: "The Architecture of Authority: Why Systems Outperform Personal Brands",
    excerpt: "Analyzing the transition points where institutional logic unlocks unprecedented organizational growth.",
    image: "https://picsum.photos/seed/unbounded-arch-1/1200/800?grayscale&blur=1",
    content: [
      "Authority is the most potent lever in leadership, yet it is often the most misunderstood. While charisma and personal brand are essential for the initial growth phase of any enterprise, architectural integrity becomes the dominant force in the quest for institutional permanence. A system designed around a 'Hero' is inherently limited by that hero's time, energy, and cognitive capacity.",
      "When an organization relies on its 'Sovereign Methodology' rather than an individual leader, it creates what we call a 'Velocity Substrate.' In this environment, every decision is amplified by the collective architecture. This creates a scale that challenges existing market paradigms and allows the organization to move with a speed and precision that individual effort simply cannot match.",
      "The true test of institutional legacy is the successful transition from 'Charismatic Authority' to 'Architectural Sovereignty.' This means building organizational foundations that operate with the same integrity and vision as the leader, but with autonomous momentum. Organizations that master this transition are better positioned to handle global volatility and out-decide their competition consistently.",
      "Our work at The Unbounded focuses on neutralizing institutional friction by hard-coding vision into the leadership substrate. We don't aim to remove the leader, but rather to amplify their impact through systemic excellence. When the architecture itself embodies authority, the Principal is free to focus on the next level of global strategic innovation."
    ]
  },
  {
    id: "INT-011",
    category: "Cognitive Architecture",
    title: "Strategic Substrates: The Invisible Tax of Latent Inefficiency",
    excerpt: "How aligning mental models at the board level yields compounding institutional velocity.",
    image: "https://picsum.photos/seed/unbounded-arch-2/1200/800?grayscale&blur=1",
    content: [
      "Strategic Substrates represent the foundational logic layers of institutional decision-making. High-velocity organizations recognize that achieving significant tactical wins is best served by investing in long-term structural integrity. When these substrates are misaligned, the organization pays an 'Invisible Tax'—a compounding cost of latency and inefficiency that drains potential value.",
      "During our thorough Institutional Audits, we consistently find that 'breakthrough' moments are rarely the result of a single brilliant idea. Instead, they are the natural outcome of aligning the collective mental models of the leadership team with current market reality. A calibrated system is, by definition, an anti-fragile system that thrives on complexity rather than being intimidated by it.",
      "To maximize institutional velocity, leaders must prioritize 'Cognitive Calibration.' This involves identifying and refining the specific logic levers that govern how the organization identifies opportunity and processes risk. By resolving internal logic conflicts at the board level, you clear the path for rapid, decisive action throughout the entire firm.",
      "Once the strategic substrate is correctly aligned, the organization experiences a permanent increase in its 'Velocity Delta.' This is the hallmark of leadership excellence: a state where the conversion of strategic intent into undisputed market leadership happens effortlessly and with high frequency."
    ]
  },
  {
    id: "INT-012",
    category: "Future of Governance",
    title: "Sovereign Leadership: Designing for Anti-Fragility in the Age of AI",
    excerpt: "Transitioning from individual effort to systemic intelligence as the core competitive advantage.",
    image: "https://picsum.photos/seed/unbounded-arch-3/1200/800?grayscale&blur=1",
    content: [
      "The rapid emergence of Generative AI is fundamentally shifting the requirements of elite leadership. In this new era, the most successful leaders will be 'Sovereign Architects.' As synthetic intelligence increasingly manages data-heavy governance and tactical execution, the human leader's primary value shifts to the design and oversight of anti-fragile organizational substrates.",
      "An anti-fragile system does more than just survive disruption; it uses disorder to gain momentum. Building such a system requires a Leadership Architecture that can seamlessly integrate AI-driven strategic insights while strictly maintaining human sovereign integrity. The goal is to create a symbiotic relationship where technology amplifies human judgment without replacing the essential moral and strategic compass.",
      "The primary competitive advantage for the next decade will belong to the leadership architectures that most effectively govern and amplify both human and synthetic intelligence. This shift requires a move away from traditional management models toward a governance structure that is defined by its ability to capitalize on systemic intelligence at every level.",
      "At The Unbounded, we guide institutional leaders through this critical transition. We ensure that their institutional legacy is built on a substrate of systemic excellence that is ready for the future. By designing for anti-fragility today, you secure your organization's seat at the head of the market for the decades to come."
    ]
  }
];

const Insights: React.FC<InsightsProps> = ({ onArticleClick, hideHeader }) => {
  const [pulseQuery, setPulseQuery] = useState('');
  const [pulseResult, setPulseResult] = useState<{text: string, links: {uri: string, title: string}[]} | null>(null);
  const [isPulseLoading, setIsPulseLoading] = useState(false);
  const [hasApiKey, setHasApiKey] = useState(true);
  const [sharingId, setSharingId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const navigate = useNavigate();

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
    const url = `https://theunboundedleadership.com/library/${article.id}`;
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
          model: "gemini-3-flash-preview",
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
    <section id="insights" className={`${hideHeader ? 'py-12' : 'py-24'} border-t border-white/5 bg-[#0a0a0a] text-white transition-all duration-500`}>
      <div className="max-w-7xl mx-auto px-6">
        {!hideHeader && (
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
            <div className="max-w-xl">
              <h2 className="text-[#b8860b] text-[10px] font-bold uppercase mb-4 tracking-widest">Intellectual Authority</h2>
              <h3 className="text-3xl md:text-5xl font-bold leading-tight">The Sovereign Library.</h3>
            </div>
            <div className="flex gap-4">
               <button className="text-white text-[10px] font-bold uppercase border border-white/20 px-6 py-3 hover:bg-white hover:text-black transition-all">
                White Papers
              </button>
              <button className="text-[#b8860b] text-[10px] font-bold uppercase border border-[#b8860b]/30 px-6 py-3 hover:bg-[#b8860b] hover:text-white transition-all">
                Institutional Reports
              </button>
               <button 
                onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 bg-[#b8860b] text-white text-[10px] font-bold uppercase hover:bg-white hover:text-black transition-all shadow-lg"
               >
                Consult
              </button>
            </div>
          </div>
        )}

        <div className={`grid md:grid-cols-3 gap-12 ${hideHeader ? 'mb-12' : 'mb-20'}`}>
          {articles.map((article, idx) => (
            <div key={idx} className="group cursor-pointer" onClick={() => {
              onArticleClick(article);
              if (article.id) navigate(`/library/${article.id}`);
            }}>
              <div className="mb-6 overflow-hidden bg-[#111111] aspect-[16/10] relative border border-white/5">
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#111111] bg-white px-6 py-3 shadow-2xl">Access Briefing</span>
                </div>
              </div>
              <div className="flex justify-between items-center mb-3">
                <div className="text-[#b8860b] text-[9px] uppercase font-black tracking-widest">{article.category}</div>
                <div className="relative">
                  <button 
                    onClick={(e) => handleShare(e, article)}
                    className="p-1 text-zinc-500 hover:text-[#b8860b] transition-colors"
                  >
                    <Share2 size={12} />
                  </button>
                  {sharingId === article.id && (
                    <div className="absolute right-0 top-6 bg-[#1a1a1a] border border-white/10 p-2 z-20 shadow-2xl flex flex-col gap-2 min-w-[100px] animate-fade-in">
                      <button 
                        onClick={(e) => handleCopyLink(e, article)}
                        className="flex items-center gap-2 text-[9px] uppercase font-bold text-zinc-400 hover:text-white transition-colors p-1"
                      >
                        {copiedId === article.id ? <Check size={10} className="text-green-500" /> : <LinkIcon size={10} />}
                        {copiedId === article.id ? 'Copied' : 'Copy Link'}
                      </button>
                      <a 
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent('https://theunboundedleadership.com/library/' + article.id)}&text=${encodeURIComponent(article.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-2 text-[9px] uppercase font-bold text-zinc-400 hover:text-white transition-colors p-1"
                      >
                        <X size={10} /> X / Twitter
                      </a>
                      <a 
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://theunboundedleadership.com/library/' + article.id)}`}
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
              <h4 className="text-xl font-bold text-white mb-3 group-hover:text-[#b8860b] transition-colors leading-snug">
                {article.title}
              </h4>
              <p className="text-zinc-500 text-sm leading-relaxed mb-4 font-normal italic line-clamp-2">
                {article.excerpt}
              </p>
              <div className="w-8 h-px bg-white/10 group-hover:w-full group-hover:bg-[#b8860b] transition-all duration-700" />
            </div>
          ))}
        </div>

        <div className="bg-[#111111] text-white p-10 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#b8860b]/10 blur-[100px] rounded-full" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h4 className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.4em] mb-6">Live Intelligence Pulse</h4>
              <h5 className="text-3xl font-bold mb-6 leading-tight">
                Map global trends against <span className="text-[#b8860b] italic">architectural excellence.</span>
              </h5>
              <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="text"
                  placeholder="e.g., Geopolitical shifts in semiconductor supply chains..."
                  value={pulseQuery}
                  onChange={(e) => setPulseQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handlePulseSearch()}
                  className="flex-grow bg-white/5 border border-white/20 p-4 text-white text-sm focus:outline-none focus:border-[#b8860b] transition-colors italic font-light"
                />
                <button 
                  disabled={isPulseLoading || !pulseQuery}
                  onClick={hasApiKey ? handlePulseSearch : handleOpenKeyDialog}
                  className="bg-[#b8860b] px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all disabled:opacity-50"
                >
                  {!hasApiKey ? 'Configure API Key' : isPulseLoading ? 'Gathering...' : 'Calibrate Intel'}
                </button>
              </div>
            </div>

            <div className="min-h-[160px] flex flex-col justify-center bg-white/[0.02] border border-white/5 p-6">
              {pulseResult ? (
                <div className="fade-in">
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6 italic font-light">
                    {pulseResult.text}
                  </p>
                  {pulseResult.links.length > 0 && (
                    <div className="space-y-3">
                      <p className="text-[9px] uppercase font-black text-[#b8860b] tracking-widest">Grounding Sources</p>
                      <div className="flex flex-wrap gap-4">
                        {pulseResult.links.map((link, i) => (
                          <a key={i} href={link.uri} target="_blank" rel="noopener noreferrer" className="text-[10px] text-zinc-500 hover:text-white underline decoration-[#b8860b]/40">
                            {link.title}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                  <button onClick={() => setPulseResult(null)} className="mt-6 text-[9px] font-black uppercase text-zinc-600 hover:text-[#b8860b] tracking-widest transition-all">Reset Pulse</button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <div className="w-10 h-[1px] bg-white/10 mx-auto mb-4" />
                  <p className="text-zinc-600 text-[10px] uppercase font-black tracking-widest">Awaiting Pulse Vector</p>
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