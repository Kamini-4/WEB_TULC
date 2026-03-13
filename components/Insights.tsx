import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";

interface Article {
  category: string;
  title: string;
  excerpt: string;
  content: string[];
}

interface InsightsProps {
  onArticleClick: (article: Article) => void;
}

const articles: Article[] = [
  {
    category: "Systems Design",
    title: "The Architecture of Authority: Why Systems Outperform Personal Brands",
    excerpt: "Analyzing the transition points where institutional logic unlocks unprecedented organizational growth.",
    content: [
      "Authority is the most potent lever in leadership. While charisma is essential for the 0-to-1 phase, architectural integrity becomes the dominant force in the scaling phase.",
      "When an institution relies on the systems rather than the individual, it creates a 'Velocity Substrate.' Every decision is amplified by the collective architecture, creating a scale that challenges market paradigms exponentially.",
      "True institutional legacy requires the transition from 'Charismatic Authority' to 'Architectural Sovereignty.' This means building foundations that operate with the same integrity and vision as the leader, but with autonomous momentum.",
      "Our work at The Unbounded involves neutralizing friction by hard-coding vision into the leadership substrate. We don't remove the leader; we amplify them through systemic excellence."
    ]
  },
  {
    category: "Cognitive Architecture",
    title: "Strategic Substrates: The Invisible Tax of Latent Inefficiency",
    excerpt: "How aligning mental models at the board level yields compounding institutional velocity.",
    content: [
      "Strategic Substrates are the foundational logic layers of decision-making. High-velocity institutions recognize that short-term tactical wins are best served by long-term structural integrity.",
      "In our deep-dive audits of global boards, we find that most 'breakthroughs' are simply the result of aligning mental models to market reality. A calibrated system is, by definition, an anti-fragile system.",
      "To maximize velocity, leaders must engage in Cognitive Calibration. This is about identifying the specific logic levers that govern how you process opportunity and risk.",
      "Once the substrate is aligned, the organization experiences a 'Velocity Delta'—a sudden, permanent increase in its ability to convert intent into market leadership."
    ]
  },
  {
    category: "Future of Governance",
    title: "Sovereign Leadership: Designing for Anti-Fragility in the Age of AI",
    excerpt: "Transitioning from individual effort to systemic intelligence as the core competitive advantage.",
    content: [
      "The age of AI demands a new kind of leader: the Sovereign Architect. As synthetic intelligence handles data-heavy governance, the human leader's role shifts to the design of anti-fragile substrates.",
      "An anti-fragile system is one that doesn't just survive disruption but gains momentum from it. This requires a leadership architecture that can integrate AI-driven insights while maintaining human sovereign integrity.",
      "The primary competitive advantage in 2025 and beyond will be the leadership architecture that can most effectively govern and amplify human and synthetic intelligence.",
      "At The Unbounded, we prepare Tier 1 leaders for this transition, ensuring their institutional legacy is built on a substrate of systemic excellence."
    ]
  }
];

const Insights: React.FC<InsightsProps> = ({ onArticleClick }) => {
  const [pulseQuery, setPulseQuery] = useState('');
  const [pulseResult, setPulseResult] = useState<{text: string, links: {uri: string, title: string}[]} | null>(null);
  const [isPulseLoading, setIsPulseLoading] = useState(false);
  const [articleImages, setArticleImages] = useState<Record<number, string>>({});

  useEffect(() => {
    const generateImages = async () => {
      const apiKey = process.env.API_KEY;
      if (!apiKey) return;

      const ai = new GoogleGenAI({ apiKey });
      const newImages: Record<number, string> = {};
      
      const requests = articles.map(async (article, idx) => {
        try {
          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image',
            contents: {
              parts: [{ 
                text: `Create a minimalist, high-end conceptual architectural art piece for a global leadership consultancy. Theme: "${article.title}". Style: Brutalist elegance, beige and charcoal tones, sharp geometric lines, vast empty spaces, institutional authority. No text in image.` 
              }]
            },
            config: { imageConfig: { aspectRatio: "16:9" } }
          });
          
          const parts = response.candidates?.[0]?.content?.parts;
          if (parts) {
            for (const part of parts) {
              if (part.inlineData) {
                newImages[idx] = `data:image/png;base64,${part.inlineData.data}`;
              }
            }
          }
        } catch (e) {
          console.error("Image gen failed for article", idx, e);
        }
      });

      await Promise.all(requests);
      setArticleImages(prev => ({ ...prev, ...newImages }));
    };

    generateImages();
  }, []);

  const handlePulseSearch = async () => {
    if (!pulseQuery) return;
    setIsPulseLoading(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze the following strategic vector for a global CXO and provide architectural implications for excellence: "${pulseQuery}". Focus on recent news and trends. 
        IMPORTANT: Provide the response in clean plain text. Do NOT use markdown formatting, asterisks, hashtags, or bold markers.`,
        config: {
          tools: [{ googleSearch: {} }],
        },
      });

      const links = response.candidates?.[0]?.groundingMetadata?.groundingChunks
        ?.filter(chunk => chunk.web)
        ?.map(chunk => ({ uri: chunk.web?.uri || '', title: chunk.web?.title || 'Source' })) || [];

      const cleanText = (response.text || "Substrate analysis complete. No variance detected.")
        .replace(/[*#]/g, '')
        .trim();

      setPulseResult({
        text: cleanText,
        links: links.slice(0, 4)
      });
    } catch (error) {
      console.error(error);
      setPulseResult({ text: "Intelligence gathering recalibrated. Please re-initiate.", links: [] });
    } finally {
      setIsPulseLoading(false);
    }
  };

  return (
    <section id="insights" className="py-24 border-t border-zinc-200 bg-[#f5f5f0]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
          <div className="max-w-xl">
            <h2 className="text-[#b8860b] text-[10px] font-bold uppercase mb-4 tracking-widest">Intellectual Authority</h2>
            <h3 className="text-3xl md:text-5xl font-bold leading-tight text-[#111111]">The Sovereign Library.</h3>
          </div>
          <div className="flex gap-4">
             <button className="text-[#111111] text-[10px] font-bold uppercase border border-[#111111]/20 px-6 py-3 hover:bg-[#111111] hover:text-white transition-all">
              White Papers
            </button>
            <button className="text-[#b8860b] text-[10px] font-bold uppercase border border-[#b8860b]/30 px-6 py-3 hover:bg-[#b8860b] hover:text-white transition-all">
              Institutional Reports
            </button>
             <button 
              onClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 bg-[#111111] text-white text-[10px] font-bold uppercase hover:bg-black transition-all shadow-lg"
             >
              Consult
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-12 mb-20">
          {articles.map((article, idx) => (
            <div key={idx} className="group cursor-pointer" onClick={() => onArticleClick(article)}>
              <div className="mb-6 overflow-hidden bg-[#111111] aspect-[16/10] relative border border-zinc-200">
                {articleImages[idx] ? (
                  <img 
                    src={articleImages[idx]} 
                    alt={article.title} 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 border-t border-[#b8860b] rounded-full animate-spin" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#111111] bg-white px-6 py-3 shadow-2xl">Access Briefing</span>
                </div>
              </div>
              <div className="text-[#b8860b] text-[9px] uppercase font-black mb-3 tracking-widest">{article.category}</div>
              <h4 className="text-xl font-bold text-[#111111] mb-3 group-hover:text-[#b8860b] transition-colors leading-snug">
                {article.title}
              </h4>
              <p className="text-zinc-500 text-sm leading-relaxed mb-4 font-normal italic line-clamp-2">
                {article.excerpt}
              </p>
              <div className="w-8 h-px bg-zinc-300 group-hover:w-full group-hover:bg-[#b8860b] transition-all duration-700" />
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
                  onClick={handlePulseSearch}
                  className="bg-[#b8860b] px-8 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all disabled:opacity-50"
                >
                  {isPulseLoading ? 'Gathering...' : 'Calibrate Intel'}
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