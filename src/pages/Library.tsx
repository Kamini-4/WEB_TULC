
import React from 'react';
import { motion } from 'motion/react';
import { useParams } from 'react-router-dom';
import Insights from '../../components/Insights.tsx';
import Blog from '../../components/Blog.tsx';
import { WHITE_PAPERS } from '../../data/whitepapers.ts';
import Newsletter from '../../components/Newsletter.tsx';

interface LibraryProps {
  onArticleClick: (article: any) => void;
}

const Library: React.FC<LibraryProps> = ({ onArticleClick }) => {
  const { articleId } = useParams<{ articleId: string }>();
  const [activePaperKey, setActivePaperKey] = React.useState<'alignment_protocol' | 'cognitive_equity' | null>(null);

  const handleDownload = (wpKey: 'alignment_protocol' | 'cognitive_equity') => {
    const paper = WHITE_PAPERS[wpKey];
    if (!paper) {
      alert("Requested Document unavailable. Archive synchronization in progress.");
      return;
    }

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>${paper.title}</title>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500;700;900&family=JetBrains+Mono&display=swap');
              
              body {
                background-color: #fafaf6;
                color: #111111;
                font-family: 'Playfair Display', Georgia, serif;
                margin: 0;
                padding: 0;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }
              
              .page {
                box-sizing: border-box;
                width: 100%;
                max-width: 800px;
                margin: 40px auto;
                padding: 80px 90px;
                page-break-after: always;
                position: relative;
                background-color: #ffffff;
                min-height: 1050px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.04);
                border: 1px solid #e5e5d8;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
              }
              
              @media print {
                body {
                  background-color: #ffffff;
                }
                .page {
                  box-shadow: none;
                  border: none;
                  margin: 0;
                  padding: 50px 60px;
                  max-width: 100%;
                  min-height: 100%;
                  page-break-after: always;
                }
              }
              
              /* Cover Page */
              .cover-container {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                height: 100%;
                flex-grow: 1;
                border: 1px solid #b8860b;
                padding: 50px;
                box-sizing: border-box;
              }
              
              .cover-top {
                text-align: center;
                margin-top: 30px;
              }
              
              .cover-brand {
                font-family: 'Cinzel', serif;
                font-size: 13px;
                letter-spacing: 0.4em;
                text-transform: uppercase;
                color: #111111;
                font-weight: bold;
                border-bottom: 2px solid #b8860b;
                padding-bottom: 12px;
                display: inline-block;
                margin-bottom: 70px;
              }
              
              .cover-category {
                font-family: 'Inter', sans-serif;
                font-size: 8px;
                font-weight: 900;
                letter-spacing: 0.35em;
                text-transform: uppercase;
                color: #b8860b;
                margin-bottom: 25px;
              }
              
              .cover-title {
                font-size: 34px;
                line-height: 1.3;
                font-weight: 700;
                margin: 0 0 25px 0;
                color: #111111;
                font-family: 'Cinzel', serif;
              }
              
              .cover-subtitle {
                font-size: 16px;
                font-style: italic;
                color: #555544;
                line-height: 1.6;
                max-width: 550px;
                margin: 0 auto;
              }
              
              .cover-bottom {
                text-align: center;
                margin-bottom: 30px;
              }
              
              .cover-signature {
                border-top: 1px solid #e5e5d8;
                padding-top: 25px;
                max-width: 320px;
                margin: 0 auto;
              }
              
              .signature-title {
                font-family: 'Cinzel', serif;
                font-size: 11px;
                letter-spacing: 0.2em;
                text-transform: uppercase;
                color: #111111;
                font-weight: bold;
              }
              
              .signature-author {
                font-size: 14px;
                font-weight: bold;
                color: #b8860b;
                margin-top: 6px;
                margin-bottom: 2px;
              }
              
              .signature-sub {
                font-family: 'Inter', sans-serif;
                font-size: 8px;
                text-transform: uppercase;
                letter-spacing: 0.15em;
                color: #777766;
                font-weight: bold;
              }
              
              .signature-meta {
                font-family: 'Inter', sans-serif;
                font-size: 8px;
                color: #aaaa99;
                margin-top: 4px;
                letter-spacing: 0.05em;
              }
              
              /* Running Headers and Footers */
              .running-header {
                font-family: 'Inter', sans-serif;
                display: flex;
                justify-content: space-between;
                font-size: 7px;
                font-weight: 900;
                text-transform: uppercase;
                letter-spacing: 0.25em;
                color: #888888;
                border-bottom: 1px solid #e5e5d8;
                padding-bottom: 10px;
                margin-bottom: 35px;
              }
              
              .running-footer {
                font-family: 'Inter', sans-serif;
                border-top: 1px solid #e5e5d8;
                padding-top: 15px;
                margin-top: 40px;
                font-size: 7px;
                color: #aaaa99;
                text-align: center;
                line-height: 1.5;
                letter-spacing: 0.08em;
              }
              
              .page-number {
                font-family: 'Inter', sans-serif;
                font-size: 8px;
                color: #111111;
                font-weight: bold;
                text-align: center;
                margin-top: 15px;
                letter-spacing: 0.1em;
              }
              
              /* Section Styles */
              .section-header {
                border-bottom: 1px solid #b8860b;
                padding-bottom: 8px;
                margin-top: 30px;
                margin-bottom: 20px;
              }
              
              .section-title {
                font-family: 'Cinzel', serif;
                font-size: 15px;
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 0.15em;
                color: #111111;
                margin: 0;
              }
              
              .para {
                font-size: 14.5px;
                line-height: 1.8;
                text-align: justify;
                margin-bottom: 22px;
                color: #222222;
              }
              
              /* Tables and Exhibits */
              .exhibit-container {
                margin-top: 30px;
                margin-bottom: 20px;
                border: 1px solid #e5e5d8;
                background-color: #fafaf8;
                padding: 20px;
              }
              
              .exhibit-title {
                font-family: 'Cinzel', serif;
                font-size: 11px;
                font-weight: bold;
                text-transform: uppercase;
                letter-spacing: 0.15em;
                color: #b8860b;
                margin-top: 0;
                margin-bottom: 12px;
                border-bottom: 1px solid #e5e5d8;
                padding-bottom: 6px;
              }
              
              table {
                width: 100%;
                border-collapse: collapse;
                font-family: 'Inter', sans-serif;
                font-size: 10px;
              }
              
              th {
                font-weight: 900;
                text-transform: uppercase;
                letter-spacing: 0.08em;
                color: #111111;
                border-bottom: 2px solid #b8860b;
                padding: 8px 6px;
                text-align: left;
              }
              
              td {
                padding: 10px 6px;
                border-bottom: 1px solid #e5e5d8;
                color: #333333;
              }
              
              tr:last-child td {
                border-bottom: none;
              }
              
              .mono {
                font-family: 'JetBrains Mono', monospace;
              }
              
              .bold {
                font-weight: bold;
              }
              
              /* Back Cover / Certificate */
              .cert-border {
                border: 2px double #b8860b;
                padding: 40px;
                height: 100%;
                box-sizing: border-box;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                flex-grow: 1;
                text-align: center;
              }
              
              .cert-title {
                font-family: 'Cinzel', serif;
                font-size: 20px;
                letter-spacing: 0.2em;
                color: #b8860b;
                margin-top: 20px;
                text-transform: uppercase;
                font-weight: bold;
              }
              
              .cert-seal {
                width: 80px;
                height: 80px;
                border: 1px solid #b8860b;
                border-radius: 50%;
                margin: 40px auto;
                display: flex;
                align-items: center;
                justify-content: center;
                font-family: 'Cinzel', serif;
                font-size: 8px;
                font-weight: bold;
                letter-spacing: 0.1em;
                color: #b8860b;
                position: relative;
              }
              
              .cert-seal::after {
                content: '';
                position: absolute;
                top: 3px;
                left: 3px;
                right: 3px;
                bottom: 3px;
                border: 1px dashed #b8860b;
                border-radius: 50%;
              }
              
              .cert-body {
                font-size: 13px;
                line-height: 1.8;
                max-width: 480px;
                margin: 0 auto;
                color: #444444;
                font-style: italic;
              }
              
              .cert-meta {
                display: flex;
                justify-content: space-around;
                margin-top: 50px;
                border-top: 1px solid #e5e5d8;
                padding-top: 25px;
                font-family: 'Inter', sans-serif;
                font-size: 9px;
              }
              
              .cert-meta-item {
                display: flex;
                flex-direction: column;
                align-items: center;
              }
              
              .cert-meta-label {
                font-weight: 900;
                color: #aaaa99;
                text-transform: uppercase;
                letter-spacing: 0.1em;
                margin-bottom: 4px;
              }
              
              .cert-meta-value {
                font-family: 'JetBrains Mono', monospace;
                color: #111111;
              }
            </style>
          </head>
          <body>
            
            <!-- Page 1: Cover Page -->
            <div class="page">
              <div class="cover-container">
                <div class="cover-top">
                  <div style="margin-bottom: 25px; display: flex; justify-content: center;">
                    <svg viewBox="0 0 500 240" style="width: 250px; height: auto;" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="gold-grad-print" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stop-color="#8a640f" />
                          <stop offset="30%" stop-color="#d1b46a" />
                          <stop offset="50%" stop-color="#f3e5ab" />
                          <stop offset="70%" stop-color="#d1b46a" />
                          <stop offset="100%" stop-color="#8a640f" />
                        </linearGradient>
                      </defs>
                      <g>
                        <!-- Monogram TUC -->
                        <path d="M 215 35 L 215 80 C 215 105, 230 115, 250 115 C 270 115, 285 105, 285 80 L 285 35 L 297 35 L 297 80 C 297 112, 275 126, 250 126 C 225 126, 203 112, 203 80 L 203 35 Z" fill="url(#gold-grad-print)" />
                        <path d="M 190 25 L 310 25 L 310 35 L 256 35 L 256 112 L 244 112 L 244 35 L 190 35 Z" fill="url(#gold-grad-print)" />
                        <path d="M 285 55 C 295 55, 305 62, 308 72 L 318 67 C 314 52, 300 43, 285 43 C 255 43, 240 65, 240 85 C 240 105, 255 127, 285 127 C 300 127, 314 118, 318 103 L 308 98 C 305 108, 295 115, 285 105 C 265 105, 252 90, 252 85 C 252 70, 265 55, 285 55 Z" fill="url(#gold-grad-print)" />
                        <path d="M 195 118 L 305 118 L 295 124 L 205 124 Z" fill="url(#gold-grad-print)" />
                      </g>
                      
                      <!-- Text -->
                      <text x="250" y="165" text-anchor="middle" fill="url(#gold-grad-print)" font-size="28" font-weight="bold" letter-spacing="0.16em" font-family="'Cinzel', 'Playfair Display', serif">THE UNBOUNDED</text>
                      <line x1="85" y1="185" x2="185" y2="185" stroke="url(#gold-grad-print)" stroke-width="1.2" />
                      <text x="250" y="190" text-anchor="middle" fill="url(#gold-grad-print)" font-size="14" font-weight="900" letter-spacing="0.32em" font-family="'Inter', sans-serif">LEADERSHIP CO.</text>
                      <line x1="315" y1="185" x2="415" y2="185" stroke="url(#gold-grad-print)" stroke-width="1.2" />
                      <text x="250" y="215" text-anchor="middle" fill="#8a640f" font-size="10.5" letter-spacing="0.06em" font-family="'Inter', sans-serif" font-weight="300" font-style="italic">Elevating Cultures, Transforming Leadership</text>
                    </svg>
                  </div>
                  <div class="cover-category">${paper.category}</div>
                  <h1 class="cover-title">${paper.title}</h1>
                  <p class="cover-subtitle">"${paper.subtitle}"</p>
                </div>
                
                <div class="cover-bottom">
                  <div class="cover-signature">
                    <div class="signature-title">Office of the Principal Architect</div>
                    <div class="signature-author">${paper.author}</div>
                    <div class="signature-sub">The Unbounded Leadership Co.</div>
                    <div class="signature-meta">Published ${paper.date} • London • New York • Singapore</div>
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Page 2: Analytical Substrate • Sections 1 & 2 -->
            <div class="page">
              <div>
                <div class="running-header">
                  <span>${paper.title}</span>
                  <span>Section I - II</span>
                </div>
                
                <div class="section-header">
                  <h2 class="section-title">${paper.sections[0].title}</h2>
                </div>
                ${paper.sections[0].paragraphs.map(p => `<p class="para">${p}</p>`).join('')}
                
                <div class="section-header" style="margin-top: 40px;">
                  <h2 class="section-title">${paper.sections[1].title}</h2>
                </div>
                ${paper.sections[1].paragraphs.map(p => `<p class="para">${p}</p>`).join('')}
              </div>
              
              <div>
                <div class="running-footer">
                  THE UNBOUNDED LEADERSHIP CO. • CONFIDENTIAL PRIVILEGED DISCLOSURE<br/>
                  DUPLICATION OR TRANSMISSIONS INFRINGE UPON ESTABLISHED INTELLECTUAL PROPERTY AND METHODOLOGY DESIGN RIGHTS.
                </div>
                <div class="page-number">II</div>
              </div>
            </div>
            
            <!-- Page 3: Dynamic Metrics & Protocols • Sections 3, 4 & Exhibits -->
            <div class="page">
              <div>
                <div class="running-header">
                  <span>${paper.title}</span>
                  <span>Section III - IV</span>
                </div>
                
                <div class="section-header">
                  <h2 class="section-title">${paper.sections[2].title}</h2>
                </div>
                ${paper.sections[2].paragraphs.map(p => `<p class="para">${p}</p>`).join('')}
                
                <div class="section-header" style="margin-top: 30px;">
                  <h2 class="section-title">${paper.sections[3].title}</h2>
                </div>
                ${paper.sections[3].paragraphs.map(p => `<p class="para">${p}</p>`).join('')}
                
                ${paper.exhibits ? paper.exhibits.map(ex => `
                  <div class="exhibit-container">
                    <div class="exhibit-title">${ex.title}</div>
                    <table>
                      <thead>
                        <tr>
                          ${ex.headers.map(h => `<th>${h}</th>`).join('')}
                        </tr>
                      </thead>
                      <tbody>
                        ${ex.rows.map(row => `
                          <tr>
                            <td class="bold">${row[0]}</td>
                            <td>${row[1]}</td>
                            ${row[2] ? `<td class="mono font-bold">${row[2]}</td>` : ''}
                            ${row[3] ? `<td>${row[3]}</td>` : ''}
                            ${row[4] ? `<td class="mono font-bold text-amber-700">${row[4]}</td>` : ''}
                          </tr>
                        `).join('')}
                      </tbody>
                    </table>
                  </div>
                `).join('') : ''}
              </div>
              
              <div>
                <div class="running-footer">
                  THE UNBOUNDED LEADERSHIP CO. • SYSTEMIC OPERATING SYSTEM MANUAL<br/>
                  AUTHENTICATED ENTRY SEQUENCE FOR INTERNAL DISTRIBUTION ONLY.
                </div>
                <div class="page-number">III</div>
              </div>
            </div>
            
            <!-- Page 4: Systemic Registry Admission & Registry Authentication -->
            <div class="page">
              <div class="cert-border">
                <div>
                  <div class="cert-title">Systemic Registry Certificate</div>
                  <div style="font-family: 'Inter', sans-serif; font-size: 8px; font-weight: 900; letter-spacing: 0.3em; text-transform: uppercase; color: #777766; margin-top: 5px;">
                    Admission Ledger Verification & Intellectual Asset Protection
                  </div>
                </div>
                
                <div class="cert-seal">
                  TULC<br/>OFFICIAL
                </div>
                
                <div class="cert-body">
                  "This document certifies that the accompanying architectural parameters have been verified and logged inside the systemic registry. The recipient is granted a single-user, non-transferable, licensed viewing of high-stakes leadership frameworks mapped by The Unbounded Leadership Co. Any systemic execution outside the licensed perimeter falls under the second-order cybernetic compliance protocol."
                </div>
                
                <div class="cert-meta">
                  <div class="cert-meta-item">
                    <div class="cert-meta-label">Registry ID</div>
                    <div class="cert-meta-value">TULC-WP-${wpKey === 'alignment_protocol' ? '01-ALPHA' : '02-BETA'}</div>
                  </div>
                  <div class="cert-meta-item">
                    <div class="cert-meta-label">Fidelity Level</div>
                    <div class="cert-meta-value">Asymptotic [99.98%]</div>
                  </div>
                  <div class="cert-meta-item">
                    <div class="cert-meta-label">Principal Signature</div>
                    <div class="cert-meta-value" style="font-family: 'Playfair Display', Georgia, serif; font-style: italic; font-weight: bold; color: #b8860b;">Suchita Sancheti</div>
                  </div>
                </div>
              </div>
            </div>
            
            <script>
              window.onload = function() {
                setTimeout(function() {
                  window.print();
                }, 500);
              }
            </script>
          </body>
        </html>
      `;
      printWindow.document.write(htmlContent);
      printWindow.document.close();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-[#0a0a0a] min-h-screen text-white flex flex-col"
    >
      <div className="max-w-7xl w-full mx-auto px-6 pt-12 md:pt-16 pb-8">
        <nav className="flex items-center gap-2 text-[8px] uppercase tracking-[0.3em] font-black text-zinc-500 mb-8">
          <a href="/" className="hover:text-[#b8860b] transition-colors">Home</a>
          <span className="text-zinc-700">/</span>
          <span className="text-[#b8860b]">Library</span>
        </nav>
        <header className="mb-16">
          <h2 className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.4em] mb-6">Intellectual Authority</h2>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            The Strategic <br />
            <span className="italic text-[#b8860b]">Library.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-zinc-500 text-base italic font-light leading-relaxed">
            A centralized repository of institutional intelligence, strategic alignment, and real-time leadership telemetry.
          </p>
          <div className="w-16 h-[2px] bg-[#b8860b] mt-8" />
        </header>
      </div>

      {/* Core Articles & Pulse */}
      <Insights onArticleClick={onArticleClick} hideHeader />

      {/* Dynamic Dispatches */}
      <Blog onArticleClick={onArticleClick} hideHeader />

      {/* White Papers Section */}
      <div className="bg-[#0a0a0a] border-t border-white/5 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-[10px] font-black uppercase text-zinc-400 tracking-[0.2em] mb-10 border-b border-white/10 pb-4">Architectural White Papers</h3>
          <div className="grid lg:grid-cols-2 gap-10">
            <div className="group bg-white/5 p-10 border border-white/10 hover:border-[#b8860b]/30 transition-all duration-700">
              <span className="text-[#b8860b] text-[8px] uppercase font-black tracking-widest block mb-3">Dynamics of Alignment</span>
              <h4 className="text-2xl font-bold text-white mb-5 group-hover:text-[#b8860b] transition-colors">Strategic Alignment Protocol: A Total Architectural Audit</h4>
              <p className="text-zinc-500 italic font-light leading-relaxed mb-8 text-sm">
                An in-depth 45-page exploration of coordination lag, strategic dilution, and the transition from individual dependence to organizational alignment.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setActivePaperKey('alignment_protocol')}
                  className="text-[9px] font-black uppercase tracking-widest bg-[#b8860b] text-white px-6 py-3 hover:bg-white hover:text-black transition-all shadow-md"
                >
                  Read Online
                </button>
                <button 
                  onClick={() => handleDownload('alignment_protocol')}
                  className="text-[9px] font-black uppercase tracking-widest border border-white/20 px-6 py-3 hover:bg-white hover:text-black transition-all"
                >
                  Print / Save PDF
                </button>
              </div>
            </div>

            <div className="group bg-white/5 p-10 border border-white/10 hover:border-[#b8860b]/30 transition-all duration-700">
              <span className="text-[#b8860b] text-[8px] uppercase font-black tracking-widest block mb-3">Strategic Substrates</span>
              <h4 className="text-2xl font-bold text-white mb-5 group-hover:text-[#b8860b] transition-colors">Cognitive Equity: Reclaiming the Architect's seat</h4>
              <p className="text-zinc-500 italic font-light leading-relaxed mb-8 text-sm">
                Quantifying the metabolic burn rate of leadership and the systemic return on architectural integrity.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => setActivePaperKey('cognitive_equity')}
                  className="text-[9px] font-black uppercase tracking-widest bg-[#b8860b] text-white px-6 py-3 hover:bg-white hover:text-black transition-all shadow-md"
                >
                  Read Online
                </button>
                <button 
                  onClick={() => handleDownload('cognitive_equity')}
                  className="text-[9px] font-black uppercase tracking-widest border border-white/20 px-6 py-3 hover:bg-white hover:text-black transition-all"
                >
                  Print / Save PDF
                </button>
              </div>
            </div>
          </div>

          {/* Strategic Newsletter Placement - Library Terminal */}
          <div className="mt-20 pt-16 border-t border-white/10 max-w-4xl mx-auto">
            <Newsletter />
          </div>
        </div>
      </div>

        {/* Immersive Online White Paper Reader */}
        {activePaperKey && WHITE_PAPERS[activePaperKey] && (() => {
          const paper = WHITE_PAPERS[activePaperKey];
          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#050505]/95 backdrop-blur-md animate-fade-in">
              <div className="bg-[#111111] border border-white/10 max-w-4xl w-full h-[88vh] flex flex-col relative shadow-2xl rounded-sm overflow-hidden">
                {/* Control Header Bar */}
                <div className="flex justify-between items-center px-6 py-4 bg-black/40 border-b border-white/10 select-none">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#b8860b] bg-[#b8860b]/10 px-2 py-1 rounded-sm">
                      {paper.category}
                    </span>
                    <span className="text-zinc-500 text-[10px] font-mono tracking-widest hidden sm:inline">
                      SECURE DOCUMENT ARCHIVE // VERIFIED
                    </span>
                  </div>
                  <button 
                    onClick={() => setActivePaperKey(null)}
                    className="text-zinc-400 hover:text-white text-xs font-mono uppercase tracking-widest flex items-center gap-2 border border-white/10 px-3 py-1 hover:border-white/20 transition-all"
                  >
                    Close Terminal <span>✕</span>
                  </button>
                </div>

                {/* Sub-Header Actions */}
                <div className="flex justify-between items-center px-8 py-3 bg-zinc-900/30 border-b border-white/5 select-none text-left">
                  <span className="text-zinc-500 text-[9px] font-mono">
                    REGISTRY ID: TULC-WP-{activePaperKey === 'alignment_protocol' ? '01-ALPHA' : '02-BETA'}
                  </span>
                  <button
                    onClick={() => handleDownload(activePaperKey)}
                    className="text-[9px] font-bold uppercase tracking-widest text-[#b8860b] hover:text-white transition-colors bg-white/5 hover:bg-[#b8860b] px-4 py-1.5 border border-[#b8860b]/30 rounded-sm"
                  >
                    Print or Download PDF
                  </button>
                </div>

                {/* Scrollable White Paper Content Panel */}
                <div className="flex-1 overflow-y-auto px-6 md:px-16 py-12 text-zinc-100 selection:bg-[#b8860b]/30 text-left">
                  <div className="max-w-2xl mx-auto space-y-10">
                    {/* Document Header block */}
                    <div className="text-center pb-8 border-b border-zinc-800/60 select-none">
                      <div className="text-[#b8860b] text-[9px] font-black tracking-[0.4em] uppercase mb-4">
                        THE UNBOUNDED LEADERSHIP CO. TECHNICAL BRIEFING
                      </div>
                      <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight font-serif mb-4">
                        {paper.title}
                      </h1>
                      <p className="text-zinc-400 text-sm md:text-base italic leading-relaxed font-serif max-w-lg mx-auto">
                        {paper.subtitle}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-zinc-900/50 max-w-sm mx-auto text-left font-mono">
                        <div>
                          <div className="text-zinc-600 text-[8px] uppercase tracking-widest">Architect</div>
                          <div className="text-zinc-300 text-[9px] font-bold">{paper.author}</div>
                        </div>
                        <div>
                          <div className="text-zinc-600 text-[8px] uppercase tracking-widest">Released</div>
                          <div className="text-zinc-300 text-[9px] font-bold">{paper.date}</div>
                        </div>
                      </div>
                    </div>

                    {/* Editorial Content sections */}
                    <div className="space-y-12">
                      {paper.sections.map((sec, sIdx) => (
                        <section key={sIdx} className="space-y-4">
                          <h2 className="text-lg md:text-xl font-bold font-sans text-[#b8860b] mb-4 uppercase tracking-widest border-l-2 border-[#b8860b] pl-3 text-left">
                            {sec.title}
                          </h2>
                          {sec.paragraphs.map((p, pIdx) => (
                            <p key={pIdx} className="text-zinc-300 font-serif text-base md:text-lg leading-relaxed font-light text-justify">
                              {p}
                            </p>
                          ))}
                        </section>
                      ))}
                    </div>

                    {/* Exhibits/Tables inside the document */}
                    {paper.exhibits && paper.exhibits.map((ex, eIdx) => (
                      <div key={eIdx} className="my-10 p-6 bg-black/40 border border-white/5 rounded-sm overflow-hidden">
                        <div className="text-[#b8860b] text-[8px] font-black tracking-wider uppercase mb-4 font-sans text-center">
                          {ex.title}
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left font-sans text-[11px] sm:text-xs">
                            <thead>
                              <tr className="border-b border-zinc-800 text-zinc-500 uppercase tracking-wider">
                                {ex.headers.map((h, hIdx) => (
                                  <th key={hIdx} className="pb-3 px-3 font-semibold">{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-900/30">
                              {ex.rows.map((row, rIdx) => (
                                <tr key={rIdx} className="hover:bg-white/[0.01]">
                                  <td className="py-3 px-3 font-bold text-zinc-300">{row[0]}</td>
                                  <td className="py-3 px-3 text-zinc-400">{row[1]}</td>
                                  {row[2] && <td className="py-3 px-3 text-[#b8860b] font-bold font-mono">{row[2]}</td>}
                                  {row[3] && <td className="py-3 px-3 text-zinc-400">{row[3]}</td>}
                                  {row[4] && <td className="py-3 px-3 text-amber-500 font-bold font-mono">{row[4]}</td>}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}

                    {/* Official Document Seal Footer */}
                    <div className="border-t border-zinc-800/80 pt-8 mt-12 text-center select-none">
                      <div className="inline-block border border-white/10 px-6 py-4 bg-zinc-950/40 rounded-sm text-left max-w-sm mx-auto">
                        <div className="flex justify-between items-center gap-6 mb-3">
                          <div className="text-zinc-500 text-[7px] font-bold uppercase tracking-widest">Registry Document Status</div>
                          <div className="bg-emerald-500/10 text-emerald-400 text-[7px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider border border-emerald-500/20">
                            Verified Ledger
                          </div>
                        </div>
                        <div className="text-[10px] font-serif italic text-zinc-400 leading-relaxed">
                          "This systemic asset is admission-verified and logged under registration key TULC-WP-{activePaperKey === 'alignment_protocol' ? '01-ALPHA' : '02-BETA'}."
                        </div>
                        <div className="mt-4 pt-3 border-t border-zinc-900 flex justify-between items-end">
                          <div>
                            <div className="text-[7px] text-zinc-600 uppercase font-mono">Signatory</div>
                            <div className="text-[9px] font-bold text-[#b8860b]">Suchita Sancheti</div>
                          </div>
                          <div className="text-[9px] font-mono text-zinc-500 font-black">
                            LEVEL: ASYMPTOTIC
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="flex justify-between items-center px-6 py-4 bg-black/40 border-t border-white/10 select-none">
                  <button 
                    onClick={() => setActivePaperKey(null)}
                    className="text-zinc-500 hover:text-white text-[10px] font-bold uppercase tracking-widest border border-white/10 hover:border-white/20 px-4 py-2 transition-all rounded-sm"
                  >
                    Dismiss Document
                  </button>
                  <p className="text-[8px] font-mono text-zinc-600 hidden md:block">
                    CONFIDENTIALITY INTEGRITY ACCESSIBILITY PROTOCOLS ACTIVE
                  </p>
                  <button 
                    onClick={() => handleDownload(activePaperKey)}
                    className="bg-[#b8860b] text-white hover:bg-white hover:text-black text-[10px] font-bold uppercase tracking-widest px-6 py-2 transition-all rounded-sm shadow-md"
                  >
                    Print & Save Briefing
                  </button>
                </div>
              </div>
            </div>
          );
        })()}
    </motion.div>
  );
};

export default Library;
