
import React from 'react';
import { motion } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { Award, BookOpen, Shield, Calculator, ArrowRight, CheckCircle } from 'lucide-react';
import Insights from '../../components/Insights';
import Blog from '../../components/Blog';
import { WHITE_PAPERS } from '../../data/whitepapers';
import Newsletter from '../../components/Newsletter';
import { GooglePreferredSource } from '../../components/GooglePreferredSource';
import { SEOHead } from '../components/SEOHead';
import { InternalLinksMatrix } from '../components/InternalLinksMatrix';

interface LibraryProps {
  onArticleClick?: (article: any) => void;
}

export const Library: React.FC<LibraryProps> = ({ onArticleClick }) => {
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
              @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
              
              * {
                font-family: 'Playfair Display', Georgia, serif !important;
              }

              body {
                background-color: #fafaf6;
                color: #111111;
                font-family: 'Playfair Display', Georgia, serif !important;
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
                font-family: 'Playfair Display', Georgia, serif;
                font-size: 14px;
                letter-spacing: 0.12em;
                text-transform: uppercase;
                color: #111111;
                font-weight: bold;
                border-bottom: 2px solid #b8860b;
                padding-bottom: 12px;
                display: inline-block;
                margin-bottom: 70px;
              }
              
              .cover-category {
                font-family: 'Playfair Display', Georgia, serif;
                font-size: 10px;
                font-weight: 700;
                letter-spacing: 0.15em;
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
                font-family: 'Playfair Display', Georgia, serif;
              }
              
              .cover-subtitle {
                font-size: 16px;
                font-style: italic;
                color: #555544;
                line-height: 1.6;
                max-width: 550px;
                margin: 0 auto;
                font-family: 'Playfair Display', Georgia, serif;
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
                font-family: 'Playfair Display', Georgia, serif;
                font-size: 11px;
                letter-spacing: 0.1em;
                text-transform: uppercase;
                color: #111111;
                font-weight: bold;
              }
              
              .signature-author {
                font-size: 15px;
                font-weight: bold;
                font-style: italic;
                color: #b8860b;
                margin-top: 6px;
                margin-bottom: 2px;
                font-family: 'Playfair Display', Georgia, serif;
              }
              
              .signature-sub {
                font-family: 'Playfair Display', Georgia, serif;
                font-size: 9px;
                text-transform: uppercase;
                letter-spacing: 0.08em;
                color: #777766;
                font-weight: bold;
              }
              
              .signature-meta {
                font-family: 'Playfair Display', Georgia, serif;
                font-size: 9px;
                font-style: italic;
                color: #aaaa99;
                margin-top: 4px;
              }
              
              /* Running Headers and Footers */
              .running-header {
                font-family: 'Playfair Display', Georgia, serif;
                display: flex;
                justify-content: space-between;
                font-size: 8.5px;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.08em;
                color: #888888;
                border-bottom: 1px solid #e5e5d8;
                padding-bottom: 10px;
                margin-bottom: 35px;
              }
              
              .running-footer {
                font-family: 'Playfair Display', Georgia, serif;
                border-top: 1px solid #e5e5d8;
                padding-top: 15px;
                margin-top: 40px;
                font-size: 8px;
                font-style: italic;
                color: #aaaa99;
                text-align: center;
                line-height: 1.5;
              }
              
              .page-number {
                font-family: 'Playfair Display', Georgia, serif;
                font-size: 10px;
                color: #111111;
                font-weight: bold;
                font-style: italic;
                text-align: center;
                margin-top: 15px;
              }
              
              /* Section Styles */
              .section-header {
                border-bottom: 1px solid #b8860b;
                padding-bottom: 8px;
                margin-top: 30px;
                margin-bottom: 20px;
              }
              
              .section-title {
                font-family: 'Playfair Display', Georgia, serif;
                font-size: 16px;
                font-weight: bold;
                letter-spacing: 0.08em;
                text-transform: uppercase;
                color: #111111;
                margin: 0;
              }
              
              .para {
                font-size: 14.5px;
                line-height: 1.8;
                text-align: justify;
                margin-bottom: 22px;
                color: #222222;
                font-family: 'Playfair Display', Georgia, serif;
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
                font-family: 'Playfair Display', Georgia, serif;
                font-size: 12px;
                font-weight: bold;
                letter-spacing: 0.08em;
                text-transform: uppercase;
                color: #b8860b;
                margin-top: 0;
                margin-bottom: 12px;
                border-bottom: 1px solid #e5e5d8;
                padding-bottom: 6px;
              }
              
              table {
                width: 100%;
                border-collapse: collapse;
                font-family: 'Playfair Display', Georgia, serif;
                font-size: 11px;
              }
              
              th {
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.06em;
                color: #111111;
                border-bottom: 2px solid #b8860b;
                padding: 8px 6px;
                text-align: left;
                font-family: 'Playfair Display', Georgia, serif;
              }
              
              td {
                padding: 10px 6px;
                border-bottom: 1px solid #e5e5d8;
                color: #333333;
                font-family: 'Playfair Display', Georgia, serif;
              }
              
              tr:last-child td {
                border-bottom: none;
              }
              
              .mono {
                font-family: 'Playfair Display', Georgia, serif;
                font-style: italic;
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
                font-family: 'Playfair Display', Georgia, serif;
                font-size: 22px;
                letter-spacing: 0.06em;
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
                font-family: 'Playfair Display', Georgia, serif;
                font-size: 9px;
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
                font-size: 13.5px;
                line-height: 1.8;
                max-width: 480px;
                margin: 0 auto;
                color: #444444;
                font-style: italic;
                font-family: 'Playfair Display', Georgia, serif;
              }
              
              .cert-meta {
                display: flex;
                justify-content: space-around;
                margin-top: 50px;
                border-top: 1px solid #e5e5d8;
                padding-top: 25px;
                font-family: 'Playfair Display', Georgia, serif;
                font-size: 10px;
              }
              
              .cert-meta-item {
                display: flex;
                flex-direction: column;
                align-items: center;
              }
              
              .cert-meta-label {
                font-weight: 700;
                color: #aaaa99;
                text-transform: uppercase;
                letter-spacing: 0.08em;
                margin-bottom: 4px;
                font-family: 'Playfair Display', Georgia, serif;
              }
              
              .cert-meta-value {
                font-family: 'Playfair Display', Georgia, serif;
                color: #111111;
                font-weight: bold;
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
                      <text x="250" y="165" text-anchor="middle" fill="url(#gold-grad-print)" font-size="28" font-weight="bold" font-family="'Playfair Display', Georgia, serif">THE UNBOUNDED</text>
                      <line x1="85" y1="185" x2="185" y2="185" stroke="url(#gold-grad-print)" stroke-width="1.2" />
                      <text x="250" y="190" text-anchor="middle" fill="url(#gold-grad-print)" font-size="14" font-weight="700" letter-spacing="0.1em" font-family="'Playfair Display', Georgia, serif">LEADERSHIP CO.</text>
                      <line x1="315" y1="185" x2="415" y2="185" stroke="url(#gold-grad-print)" stroke-width="1.2" />
                      <text x="250" y="215" text-anchor="middle" fill="#8a640f" font-size="11" font-family="'Playfair Display', Georgia, serif" font-weight="400" font-style="italic">Elevating Cultures, Transforming Leadership</text>
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
                  <div style="font-family: 'Playfair Display', Georgia, serif; font-size: 9.5px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: #777766; margin-top: 5px;">
                    Admission Ledger Verification & Intellectual Asset Protection
                  </div>
                </div>
                
                <div class="cert-seal">
                  TULC<br/>OFFICIAL
                </div>
                
                <div class="cert-body">
                  "This document certifies that the accompanying architectural parameters have been verified and logged inside the systemic registry. The recipient is granted a single-user, non-transferable, licensed viewing of high-stakes leadership frameworks mapped by The Unbounded Leadership Co. Any systemic execution outside the licensed perimeter falls under our proprietary institutional governance and IP protection framework."
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
      className="bg-[#f7f4ee] min-h-screen text-[#1c1917] flex flex-col font-serif"
    >
      <SEOHead
        title="Executive Intelligence Library & Dispatches"
        description="Rigorous executive research dispatches, governance models, and systemic operational blueprints for enterprise founders, CXOs, and boards."
        canonicalPath="/library"
        keywords="executive briefings, governance research, personal brand paradox, founder delegation, decision architecture, inaction tax, suchita sancheti"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Executive Library', path: '/library' }
        ]}
      />

      {/* 01. COMPACT EXECUTIVE HEADER (MINIMAL VERTICAL FOOTPRINT) */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-4">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs uppercase text-[#78716c] mb-3 tracking-wide">
          <Link to="/" className="hover:text-[#8c6708] transition-colors">Home</Link>
          <span className="text-[#a8a29e]">/</span>
          <span className="text-[#8c6708] font-bold" aria-current="page">Executive Intelligence Library</span>
        </nav>
        
        <header className="mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#efebe2] border border-[#b8860b]/30 rounded-full mb-3">
            <Award className="w-3.5 h-3.5 text-[#8c6708]" />
            <span className="text-[#8c6708] text-xs font-bold uppercase tracking-wider font-serif">
              Executive Blog & Intelligence Archive
            </span>
          </div>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif leading-tight text-[#1c1917] mb-2.5">
            Strategic Blogs & <span className="italic text-[#996515] font-normal">Dispatches.</span>
          </h1>
          
          <p className="max-w-3xl text-[#57534e] text-sm sm:text-base md:text-lg font-serif italic leading-relaxed mb-4">
            Forensic research on leadership substrate physics, cognitive tax, and institutional sovereignty. Select any dispatch to read immediately.
          </p>
        </header>
      </div>

      {/* Strategic Intelligence Archive: Dispatches & Articles Delivered Immediately Above The Fold */}
      <Blog onArticleClick={onArticleClick} hideHeader={true} />

      {/* Cross-Domain Architecture Internal Links Bar Placed At The Bottom */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 border-t border-[#ded6c5]">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <span className="text-xs uppercase font-serif font-bold text-[#8c6708] tracking-wider">
            Operational Hubs & Institutional Bridges:
          </span>
          <span className="text-xs text-[#78716c] font-serif italic">
            Convert strategic intelligence into organizational execution
          </span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 text-xs uppercase overflow-x-auto no-scrollbar font-serif">
          <Link to="/toolkits" className="px-3.5 py-1.5 bg-[#ffffff] hover:bg-[#b8860b] hover:text-white text-[#292524] border border-[#ded6c5] transition-colors rounded-xs shrink-0 font-medium shadow-2xs">
            Founder Toolkits
          </Link>
          <Link to="/assessment" className="px-3.5 py-1.5 bg-[#ffffff] hover:bg-[#b8860b] hover:text-white text-[#292524] border border-[#ded6c5] transition-colors rounded-xs shrink-0 font-medium shadow-2xs">
            Two-Week Diagnostic
          </Link>
          <Link to="/services" className="px-3.5 py-1.5 bg-[#ffffff] hover:bg-[#b8860b] hover:text-white text-[#292524] border border-[#ded6c5] transition-colors rounded-xs shrink-0 font-medium shadow-2xs">
            Sovereign Retainer
          </Link>
          <Link to="/methodology" className="px-3.5 py-1.5 bg-[#ffffff] hover:bg-[#b8860b] hover:text-white text-[#292524] border border-[#ded6c5] transition-colors rounded-xs shrink-0 font-medium shadow-2xs">
            Governance Protocol
          </Link>
          <Link to="/cognitive-tax" className="px-3.5 py-1.5 bg-[#ffffff] hover:bg-[#b8860b] hover:text-white text-[#292524] border border-[#ded6c5] transition-colors rounded-xs shrink-0 font-medium shadow-2xs">
            Cognitive Tax Scan
          </Link>
          <Link to="/intake" className="px-3.5 py-1.5 bg-gradient-to-r from-[#b8860b] to-[#8c6708] text-white hover:from-[#c99518] hover:to-[#9e7610] font-bold transition-colors rounded-xs shrink-0 shadow-sm">
            Advisory Intake
          </Link>
        </div>
      </div>

      {/* 03. Direct Subscriber Gateway */}
      <section className="py-12 sm:py-16 bg-[#efebe2]/60 border-t border-[#ded6c5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Newsletter />
        </div>
      </section>

      {/* 04. Google Preferred Source Integration */}
      <section className="py-12 sm:py-16 bg-[#f7f4ee] border-t border-[#ded6c5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <GooglePreferredSource variant="card" />
        </div>
      </section>

      {/* 05. White Papers Section */}
      <div className="bg-[#efebe2]/60 border-t border-[#ded6c5] py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#ded6c5] gap-4">
            <div>
              <span className="text-[#8c6708] text-xs font-bold uppercase block mb-2 tracking-wider">
                Patent-Pending Frameworks
              </span>
              <h3 className="text-3xl sm:text-4xl font-bold font-serif text-[#1c1917]">
                Architectural White Papers
              </h3>
            </div>
            <p className="text-[#57534e] text-sm sm:text-base italic font-normal max-w-md leading-relaxed">
              Peer-level technical briefings explaining the systemic physics of coordination lag, cognitive burn rate, and institutional alignment.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* White Paper 01 */}
            <div className="group bg-[#ffffff] p-8 sm:p-10 border border-[#ded6c5] hover:border-[#b8860b]/50 transition-all duration-500 flex flex-col justify-between shadow-xs relative">
              <div className="absolute top-0 right-0 px-3.5 py-1.5 bg-[#efebe2] text-[#8c6708] text-xs uppercase font-bold tracking-wider">
                REF: TULC-WP-01
              </div>
              
              <div>
                <span className="text-[#8c6708] text-xs uppercase font-bold block mb-2 tracking-wider">
                  Dynamics of Alignment
                </span>
                <h4 className="text-xl sm:text-2xl font-bold font-serif text-[#1c1917] mb-3 group-hover:text-[#8c6708] transition-colors leading-snug">
                  Strategic Alignment Protocol: A Total Architectural Audit
                </h4>
                <p className="text-[#57534e] italic font-normal leading-relaxed mb-6 text-sm sm:text-base">
                  An in-depth 45-page exploration of coordination lag, strategic dilution across organizational tiers, and the transition from individual founder dependency to automated alignment.
                </p>
              </div>

              <div className="space-y-4 pt-6 border-t border-[#e2dcce]">
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={() => setActivePaperKey('alignment_protocol')}
                    className="text-xs font-bold uppercase bg-[#b8860b] text-white px-6 py-2.5 hover:bg-[#a17812] transition-all shadow-sm cursor-pointer tracking-wider"
                  >
                    Read Online
                  </button>
                  <button 
                    onClick={() => handleDownload('alignment_protocol')}
                    className="text-xs font-bold uppercase border border-[#ded6c5] text-[#292524] hover:bg-[#efebe2] px-6 py-2.5 transition-all cursor-pointer tracking-wider"
                  >
                    Print / Save PDF
                  </button>
                </div>
                
                {/* Interlink CTA */}
                <div className="pt-2 flex items-center justify-between">
                  <Link 
                    to="/assessment" 
                    className="text-xs font-bold text-[#8c6708] hover:text-[#1c1917] transition-colors flex items-center gap-1.5 uppercase tracking-wide"
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Audit This Protocol in Assessment →</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* White Paper 02 */}
            <div className="group bg-[#ffffff] p-8 sm:p-10 border border-[#ded6c5] hover:border-[#b8860b]/50 transition-all duration-500 flex flex-col justify-between shadow-xs relative">
              <div className="absolute top-0 right-0 px-3.5 py-1.5 bg-[#efebe2] text-[#8c6708] text-xs uppercase font-bold tracking-wider">
                REF: TULC-WP-02
              </div>

              <div>
                <span className="text-[#8c6708] text-xs uppercase font-bold block mb-2 tracking-wider">
                  Strategic Substrates
                </span>
                <h4 className="text-xl sm:text-2xl font-bold font-serif text-[#1c1917] mb-3 group-hover:text-[#8c6708] transition-colors leading-snug">
                  Cognitive Equity: Reclaiming the Architect's Seat
                </h4>
                <p className="text-[#57534e] italic font-normal leading-relaxed mb-6 text-sm sm:text-base">
                  Quantifying the metabolic burn rate of leadership, calculating the hidden cost of micro-management friction, and engineering the systemic return on architectural integrity.
                </p>
              </div>

              <div className="space-y-4 pt-6 border-t border-[#e2dcce]">
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={() => setActivePaperKey('cognitive_equity')}
                    className="text-xs font-bold uppercase bg-[#b8860b] text-white px-6 py-2.5 hover:bg-[#a17812] transition-all shadow-sm cursor-pointer tracking-wider"
                  >
                    Read Online
                  </button>
                  <button 
                    onClick={() => handleDownload('cognitive_equity')}
                    className="text-xs font-bold uppercase border border-[#ded6c5] text-[#292524] hover:bg-[#efebe2] px-6 py-2.5 transition-all cursor-pointer tracking-wider"
                  >
                    Print / Save PDF
                  </button>
                </div>

                {/* Interlink CTA */}
                <div className="pt-2 flex items-center justify-between">
                  <Link 
                    to="/assessment" 
                    className="text-xs font-bold text-[#8c6708] hover:text-[#1c1917] transition-colors flex items-center gap-1.5 uppercase tracking-wide"
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Calculate Your Inaction Tax →</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* High-Converting Executive Action Banner */}
          <div className="mt-16 p-8 sm:p-10 bg-gradient-to-r from-[#ffffff] via-[#fcfbf9] to-[#efebe2] border border-[#b8860b]/30 rounded-xs flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="space-y-2 max-w-2xl text-left">
              <span className="text-[9px] font-bold uppercase text-[#8c6708] block">
                From Research To Hard-Coded Execution
              </span>
              <h4 className="text-xl sm:text-2xl font-bold font-serif text-[#1c1917]">
                Ready to hard-code these protocols into your organization?
              </h4>
              <p className="text-[#57534e] text-xs sm:text-sm italic font-light leading-relaxed">
                We do not hand off static recommendations. Our firm co-implements alongside your executive team to automate governance, reclaim bandwidth, and lock in operational sovereignty.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <Link
                to="/assessment"
                className="px-6 py-3 bg-gradient-to-r from-[#b8860b] to-[#8c6708] text-white hover:from-[#c99518] hover:to-[#9e7610] text-[10px] font-bold uppercase transition-all text-center rounded-xs shadow-sm flex items-center justify-center gap-2"
              >
                <Calculator className="w-3.5 h-3.5" />
                <span>Run Diagnostic Audit</span>
              </Link>
              <Link
                to="/intake"
                className="px-6 py-3 bg-zinc-800 text-zinc-200 hover:bg-zinc-700 border border-white/10 text-[10px] font-bold uppercase transition-all text-center rounded-xs flex items-center justify-center gap-2"
              >
                <span>Request Briefing</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#b8860b]" />
              </Link>
            </div>
          </div>
        </div>
      </div>

        {/* Immersive Online White Paper Reader */}
        {activePaperKey && WHITE_PAPERS[activePaperKey] && (() => {
          const paper = WHITE_PAPERS[activePaperKey];
          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 bg-stone-900/60 backdrop-blur-sm animate-fade-in font-serif">
              <div className="bg-[#faf8f5] border border-[#ded6c5] max-w-4xl w-full h-[100dvh] sm:h-[88vh] flex flex-col relative shadow-2xl sm:rounded-sm overflow-hidden text-[#1c1917]">
                {/* Control Header Bar */}
                <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 bg-[#efebe2] border-b border-[#ded6c5] select-none">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase text-[#8c6708] bg-[#efebe2] border border-[#b8860b]/30 px-2 py-0.5 rounded-sm">
                      {paper.category}
                    </span>
                    <span className="text-[#78716c] text-[9px] sm:text-[10px] font-serif hidden sm:inline">
                      SECURE DOCUMENT ARCHIVE // VERIFIED
                    </span>
                  </div>
                  <button 
                    onClick={() => setActivePaperKey(null)}
                    className="text-[#57534e] hover:text-[#1c1917] text-[10px] sm:text-xs font-serif uppercase flex items-center gap-1.5 border border-[#ded6c5] px-2.5 sm:px-3 py-1 hover:border-[#b8860b] transition-all rounded-xs"
                  >
                    <span>Close</span> <span>✕</span>
                  </button>
                </div>

                {/* Sub-Header Actions */}
                <div className="flex justify-between items-center px-8 py-3 bg-[#f7f4ee] border-b border-[#ded6c5] select-none text-left">
                  <span className="text-[#78716c] text-[9px] font-serif">
                    REGISTRY ID: TULC-WP-{activePaperKey === 'alignment_protocol' ? '01-ALPHA' : '02-BETA'}
                  </span>
                  <button
                    onClick={() => handleDownload(activePaperKey)}
                    className="text-[9px] font-bold uppercase text-[#8c6708] hover:text-[#1c1917] transition-colors bg-[#ffffff] hover:bg-[#efebe2] px-4 py-1.5 border border-[#ded6c5] rounded-sm shadow-2xs"
                  >
                    Print or Download PDF
                  </button>
                </div>

                {/* Scrollable White Paper Content Panel */}
                <div className="flex-1 overflow-y-auto px-6 md:px-16 py-12 text-[#1c1917] selection:bg-[#b8860b]/20 text-left bg-[#faf8f5]">
                  <div className="max-w-2xl mx-auto space-y-10">
                    {/* Document Header block */}
                    <div className="text-center pb-8 border-b border-[#ded6c5] select-none">
                      <div className="text-[#8c6708] text-[9px] font-bold uppercase mb-4 tracking-wider">
                        THE UNBOUNDED LEADERSHIP CO. TECHNICAL BRIEFING
                      </div>
                      <h1 className="text-3xl md:text-5xl font-extrabold text-[#1c1917] leading-tight font-serif mb-4">
                        {paper.title}
                      </h1>
                      <p className="text-[#57534e] text-sm md:text-base italic leading-relaxed font-serif max-w-lg mx-auto">
                        {paper.subtitle}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-[#ded6c5] max-w-sm mx-auto text-left font-serif">
                        <div>
                          <div className="text-[#78716c] text-[8px] uppercase">Architect</div>
                          <div className="text-[#1c1917] text-[10px] font-bold">{paper.author}</div>
                        </div>
                        <div>
                          <div className="text-[#78716c] text-[8px] uppercase">Released</div>
                          <div className="text-[#1c1917] text-[10px] font-bold">{paper.date}</div>
                        </div>
                      </div>
                    </div>

                    {/* Editorial Content sections */}
                    <div className="space-y-12">
                      {paper.sections.map((sec, sIdx) => (
                        <section key={sIdx} className="space-y-4">
                          <h2 className="text-lg md:text-xl font-bold font-serif text-[#8c6708] mb-4 uppercase border-l-2 border-[#8c6708] pl-3 text-left">
                            {sec.title}
                          </h2>
                          {sec.paragraphs.map((p, pIdx) => (
                            <p key={pIdx} className="text-[#292524] font-serif text-base md:text-lg leading-relaxed text-justify">
                              {p}
                            </p>
                          ))}
                        </section>
                      ))}
                    </div>

                    {/* Exhibits/Tables inside the document */}
                    {paper.exhibits && paper.exhibits.map((ex, eIdx) => (
                      <div key={eIdx} className="my-10 p-6 bg-[#ffffff] border border-[#ded6c5] rounded-sm overflow-hidden shadow-2xs">
                        <div className="text-[#8c6708] text-[10px] font-bold uppercase mb-4 font-serif tracking-wider text-center">
                          {ex.title}
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left font-serif text-[11px] sm:text-xs">
                            <thead>
                              <tr className="border-b border-[#ded6c5] text-[#78716c] uppercase">
                                {ex.headers.map((h, hIdx) => (
                                  <th key={hIdx} className="pb-3 px-3 font-semibold">{h}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#ded6c5]">
                              {ex.rows.map((row, rIdx) => (
                                <tr key={rIdx} className="hover:bg-[#f7f4ee]">
                                  <td className="py-3 px-3 font-bold text-[#1c1917]">{row[0]}</td>
                                  <td className="py-3 px-3 text-[#57534e]">{row[1]}</td>
                                  {row[2] && <td className="py-3 px-3 text-[#8c6708] font-bold font-serif">{row[2]}</td>}
                                  {row[3] && <td className="py-3 px-3 text-[#57534e]">{row[3]}</td>}
                                  {row[4] && <td className="py-3 px-3 text-[#996515] font-bold font-serif">{row[4]}</td>}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}

                    {/* Official Document Seal Footer */}
                    <div className="border-t border-[#ded6c5] pt-8 mt-12 text-center select-none">
                      <div className="inline-block border border-[#ded6c5] px-6 py-4 bg-[#ffffff] rounded-sm text-left max-w-sm mx-auto shadow-2xs">
                        <div className="flex justify-between items-center gap-6 mb-3">
                          <div className="text-[#78716c] text-[8px] font-bold uppercase">Registry Document Status</div>
                          <div className="bg-emerald-50 text-emerald-800 text-[8px] font-bold px-1.5 py-0.5 rounded-sm uppercase border border-emerald-200">
                            Verified Ledger
                          </div>
                        </div>
                        <div className="text-[10px] font-serif italic text-[#57534e] leading-relaxed">
                          "This systemic asset is admission-verified and logged under registration key TULC-WP-{activePaperKey === 'alignment_protocol' ? '01-ALPHA' : '02-BETA'}."
                        </div>
                        <div className="mt-4 pt-3 border-t border-[#ded6c5] flex justify-between items-end">
                          <div>
                            <div className="text-[8px] text-[#78716c] uppercase font-serif">Signatory</div>
                            <div className="text-[10px] font-bold text-[#8c6708]">Suchita Sancheti</div>
                          </div>
                          <div className="text-[9px] font-serif text-[#78716c] font-bold">
                            LEVEL: ASYMPTOTIC
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="flex justify-between items-center px-6 py-4 bg-[#efebe2] border-t border-[#ded6c5] select-none">
                  <button 
                    onClick={() => setActivePaperKey(null)}
                    className="text-[#57534e] hover:text-[#1c1917] text-[10px] font-bold uppercase border border-[#ded6c5] hover:border-[#b8860b] px-4 py-2 transition-all rounded-sm bg-[#ffffff]"
                  >
                    Dismiss Document
                  </button>
                  <p className="text-[8px] font-serif text-[#78716c] hidden md:block">
                    CONFIDENTIALITY INTEGRITY ACCESSIBILITY PROTOCOLS ACTIVE
                  </p>
                  <button 
                    onClick={() => handleDownload(activePaperKey)}
                    className="bg-gradient-to-r from-[#b8860b] to-[#8c6708] text-white hover:from-[#c99518] hover:to-[#9e7610] text-[10px] font-bold uppercase px-6 py-2 transition-all rounded-sm shadow-sm"
                  >
                    Print & Save Briefing
                  </button>
                </div>
              </div>
            </div>
          );
        })()}

      {/* Institutional Internal Linking Matrix */}
      <InternalLinksMatrix currentPath="/library" />
    </motion.div>
  );
};

export default Library;
