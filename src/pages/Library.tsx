
import React from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import Insights from '../../components/Insights.tsx';
import Blog from '../../components/Blog.tsx';
import { WHITE_PAPERS } from '../../data/whitepapers.ts';

interface LibraryProps {
  onArticleClick: (article: any) => void;
}

const Library: React.FC<LibraryProps> = ({ onArticleClick }) => {
  const { articleId } = useParams<{ articleId: string }>();

  const handleDownload = (wpKey: 'sovereign_protocol' | 'cognitive_equity') => {
    const paper = WHITE_PAPERS[wpKey];
    if (!paper) {
      alert("Sovereign Document unavailable. Archive synchronization in progress.");
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
                  <div class="cover-brand">The Unbounded Leadership Co.</div>
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
                  DUPLICATION OR TRANSMISSIONS INFRINGE UPON ESTABLISHED COGNITIVE PATENTS.
                </div>
                <div class="page-number">II</div>
              </div>
            </div>
            
            <!-- Page 3: Sovereign Metrics & Protocols • Sections 3, 4 & Exhibits -->
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
            
            <!-- Page 4: Sovereign Registry Admission & Registry Authentication -->
            <div class="page">
              <div class="cert-border">
                <div>
                  <div class="cert-title">Sovereign Registry Certificate</div>
                  <div style="font-family: 'Inter', sans-serif; font-size: 8px; font-weight: 900; letter-spacing: 0.3em; text-transform: uppercase; color: #777766; margin-top: 5px;">
                    Admission Ledger Verification & Intellectual Asset Protection
                  </div>
                </div>
                
                <div class="cert-seal">
                  TULC<br/>OFFICIAL
                </div>
                
                <div class="cert-body">
                  "This document certifies that the accompanying architectural parameters have been verified and logged inside the sovereign registry. The recipient is granted a single-user, non-transferable, licensed viewing of high-stakes leadership frameworks mapped by The Unbounded Leadership Co. Any systemic execution outside the licensed perimeter falls under the second-order cybernetic compliance protocol."
                </div>
                
                <div class="cert-meta">
                  <div class="cert-meta-item">
                    <div class="cert-meta-label">Registry ID</div>
                    <div class="cert-meta-value">TULC-WP-${wpKey === 'sovereign_protocol' ? '01-ALPHA' : '02-BETA'}</div>
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
                onClick={() => handleDownload('sovereign_protocol')}
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
                onClick={() => handleDownload('cognitive_equity')}
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
