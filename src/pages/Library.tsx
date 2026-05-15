
import React from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import Insights from '../../components/Insights.tsx';
import Blog from '../../components/Blog.tsx';

interface LibraryProps {
  onArticleClick: (article: any) => void;
}

const Library: React.FC<LibraryProps> = ({ onArticleClick }) => {
  const { articleId } = useParams<{ articleId: string }>();

  const handleDownload = (title: string, summary: string) => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>${title}</title>
            <style>
              body { font-family: 'Times New Roman', serif; padding: 50px; line-height: 1.6; color: #1a1a1a; }
              .header { border-bottom: 2px solid #b8860b; padding-bottom: 20px; margin-bottom: 30px; }
              .logo { font-size: 14px; letter-spacing: 0.4em; text-transform: uppercase; color: #b8860b; margin-bottom: 10px; }
              .title { font-size: 32px; font-weight: bold; margin: 0; }
              .summary { font-style: italic; font-size: 18px; color: #444; margin-bottom: 40px; }
              .content { font-size: 16px; }
              .footer { margin-top: 50px; border-top: 1px solid #eee; padding-top: 20px; font-size: 10px; color: #999; text-align: center; }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="logo">The Unbounded Leadership Co.</div>
              <h1 class="title">${title}</h1>
            </div>
            <div class="summary">${summary}</div>
            <div class="content">
              <p>This document is an executive summary of the proprietary architectural audit conducted by The Unbounded Leadership Co.</p>
              <p>Our methodology focuses on the elimination of cognitive friction and the engineering of institutional permanence. By transitioning from heroic leadership to architectural governance, organizations can achieve a state of sovereign momentum.</p>
              <p>For the full 45-page white paper and technical substrate analysis, please contact the Office of the Principal directly or authenticate via the Sovereign Portal.</p>
            </div>
            <div class="footer">
              CONFIDENTIAL • PROPRIETARY INTELLIGENCE • LONDON • NEW YORK • SINGAPORE
            </div>
            <script>
              window.onload = function() { window.print(); window.close(); }
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="bg-[#0a0a0a] min-h-screen pt-24 pb-24 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <nav className="flex items-center gap-2 text-[8px] uppercase tracking-[0.3em] font-black text-zinc-500 mb-8">
          <a href="/" className="hover:text-[#b8860b] transition-colors">Home</a>
          <span className="text-zinc-700">/</span>
          <span className="text-[#b8860b]">Library</span>
        </nav>
        <header className="mb-16">
          <h2 className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.4em] mb-6">Intellectual Authority</h2>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            The Sovereign <br />
            <span className="italic text-[#b8860b]">Library.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-zinc-500 text-base italic font-light leading-relaxed">
            A centralized repository of institutional intelligence, strategic substrates, and real-time leadership telemetry.
          </p>
          <div className="w-16 h-[2px] bg-[#b8860b] mt-8" />
        </header>

        {/* Core Articles & Pulse */}
        <div className="-mx-6">
          <Insights onArticleClick={onArticleClick} hideHeader />
        </div>

        {/* Dynamic Dispatches */}
        <div className="mt-16 -mx-6">
          <Blog onArticleClick={onArticleClick} hideHeader />
        </div>

        {/* White Papers Section */}
        <div className="mt-16 pt-16 border-t border-white/5 pb-24">
          <h3 className="text-[10px] font-black uppercase text-zinc-400 tracking-[0.2em] mb-10 border-b border-white/10 pb-4">Architectural White Papers</h3>
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="group bg-white/5 p-10 border border-white/10 hover:border-[#b8860b]/30 transition-all duration-700">
              <span className="text-[#b8860b] text-[8px] uppercase font-black tracking-widest block mb-3">Physics of Power</span>
              <h4 className="text-2xl font-bold text-white mb-5 group-hover:text-[#b8860b] transition-colors">Sovereign Protocol: A Total Architectural Audit</h4>
              <p className="text-zinc-500 italic font-light leading-relaxed mb-8 text-sm">
                An in-depth 45-page exploration of institutional lag, cognitive insolvency, and the cybernetic transition from Charismatic to Architectural Authority.
              </p>
              <button 
                onClick={() => handleDownload('Sovereign Protocol: A Total Architectural Audit', 'An in-depth 45-page exploration of institutional lag, cognitive insolvency, and the cybernetic transition from Charismatic to Architectural Authority.')}
                className="text-[9px] font-black uppercase tracking-widest border border-white/20 px-6 py-3 hover:bg-white hover:text-black transition-all"
              >
                Download Briefing
              </button>
            </div>

            <div className="group bg-white/5 p-10 border border-white/10 hover:border-[#b8860b]/30 transition-all duration-700">
              <span className="text-[#b8860b] text-[8px] uppercase font-black tracking-widest block mb-3">Strategic Substrates</span>
              <h4 className="text-2xl font-bold text-white mb-5 group-hover:text-[#b8860b] transition-colors">Cognitive Equity: Reclaiming the Architect's seat</h4>
              <p className="text-zinc-500 italic font-light leading-relaxed mb-8 text-sm">
                Quantifying the metabolic burn rate of leadership and the systemic return on architectural integrity.
              </p>
              <button 
                onClick={() => handleDownload('Cognitive Equity: Reclaiming the Architect\'s Seat', 'Quantifying the metabolic burn rate of leadership and the systemic return on architectural integrity.')}
                className="text-[9px] font-black uppercase tracking-widest border border-white/20 px-6 py-3 hover:bg-white hover:text-black transition-all"
              >
                Download Briefing
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
