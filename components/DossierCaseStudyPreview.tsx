import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, 
  Sparkles, 
  Maximize2, 
  Download, 
  Printer, 
  X, 
  Activity, 
  Mic, 
  Compass, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Layers,
  ChevronRight
} from 'lucide-react';

interface DossierCaseStudyPreviewProps {
  onBriefClick?: (id?: string) => void;
}

const DossierCaseStudyPreview: React.FC<DossierCaseStudyPreviewProps> = ({ onBriefClick }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'domains' | 'acoustic' | 'decree'>('overview');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrint = () => {
    // Open printable HTML dossier window or trigger native print dialog
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>TULC // Declassified Sovereign Systemic Dossier</title>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=JetBrains+Mono:wght@400;700&display=swap');
              body { font-family: 'Playfair Display', Georgia, serif; background: #FAF9F5; color: #0A0A0A; padding: 40px; font-size: 13px; line-height: 1.6; }
              .header { border-bottom: 2px solid #C5A021; padding-bottom: 20px; text-align: center; margin-bottom: 30px; }
              .badge { display: inline-block; font-size: 9px; font-weight: bold; letter-spacing: 0.15em; color: #8a6d1a; background: rgba(197,160,33,0.1); padding: 4px 12px; border: 1px solid rgba(197,160,33,0.3); text-transform: uppercase; margin-bottom: 10px; font-family: 'JetBrains Mono', monospace; }
              .metrics { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin: 25px 0; }
              .metric-card { border: 1px solid #ddd; background: #fff; padding: 15px; text-align: center; }
              .metric-val { font-size: 24px; font-weight: bold; color: #0A0A0A; }
              .section { margin: 30px 0; }
              .section-title { font-size: 16px; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 5px; margin-bottom: 15px; }
              .callout { background: rgba(197,160,33,0.08); border-left: 3px solid #C5A021; padding: 15px; font-style: italic; margin: 15px 0; }
              .mono { font-family: 'JetBrains Mono', monospace; font-size: 11px; }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="badge">DECLASSIFIED INSTITUTIONAL CASE ARTIFACT // TULC EXECUTIVE ARCHIVE</div>
              <h1 style="margin: 6px 0; text-transform: uppercase; font-size: 26px;">Sovereign Systemic Dossier</h1>
              <div class="mono" style="color: #666;">FINGERPRINT: CASE_REF-849201 // SECTOR: GLOBAL DEEPTECH & INDUSTRIAL CONGLOMERATE</div>
            </div>
            
            <div class="metrics">
              <div class="metric-card"><div class="mono" style="font-size: 9px; color:#888;">SOVEREIGN INDEX</div><div class="metric-val" style="color:#C5A021;">79.0%</div><div style="font-size: 10px; color:#666;">Apex Sovereignty</div></div>
              <div class="metric-card"><div class="mono" style="font-size: 9px; color:#888;">METABOLIC BURN</div><div class="metric-val">70.0%</div><div style="font-size: 10px; color:#666;">Manual Override Load</div></div>
              <div class="metric-card"><div class="mono" style="font-size: 9px; color:#888;">REFRACTION INDEX</div><div class="metric-val">100.0%</div><div style="font-size: 10px; color:#666;">Signal Degradation</div></div>
              <div class="metric-card"><div class="mono" style="font-size: 9px; color:#888;">SURVIVAL HEALTH</div><div class="metric-val" style="color:#137333;">100%</div><div style="font-size: 10px; color:#666;">Generational Longevity</div></div>
            </div>

            <div class="callout">
              <strong>Core Clinical Thesis:</strong> "Your cognitive intent is currently acting as a manual override for the entire organization. You are absorbing the metabolic cost of execution with personal willpower rather than automating it through immutable organizational architecture. This creates an estimated 35% drag on strategic velocity."
            </div>

            <div class="section">
              <div class="section-title">CALIBRATION 01 // THE APEX FREQUENCY</div>
              <p>Your institutional footprint exhibits an exceptional concentration of cognitive bandwidth at the apex node (5.0/5.0 Cognitive Clarity). However, the physics of your presence operates as a single-point dependency. Escalation Density remains elevated at 94/100, indicating excessive tactical adjudication being forced to your desk.</p>
            </div>

            <div class="section">
              <div class="section-title">CALIBRATION 02 // THE CHASSIS STRESS & OVER-INDEXING</div>
              <p>The Authority Isolation Loop: Absolute executive clarity outruns the team's capacity to digest context. This creates a One-Mind Engine where any focal dilution immediately triggers signal refraction across subordinate management layers.</p>
            </div>

            <div class="section">
              <div class="section-title">CALIBRATION 04 // VOCAL PROSODY & ACOUSTIC TELEMETRY</div>
              <p>Acoustic Archetype: <strong>Orchestrator</strong>. Command Ratio stands at 80% Directive vs. 20% Contextual. While Inflection Integrity is exceptional, the Signal-to-Noise Ratio degrades at Tier-3 management, requiring decentralized context distribution.</p>
            </div>

            <div class="section">
              <div class="section-title">CALIBRATION 05 // THE 10-YEAR GENERATIONAL DECREE</div>
              <p><strong>Year 1:</strong> Recalibrate Escalation Density (-40%) via Contextual Governance Charters.<br/>
              <strong>Years 2-4:</strong> Build Distributed Intelligence & Zero-Fault Telemetry to eliminate the Silence of Compliance.<br/>
              <strong>Years 5-10:</strong> Codify Moral Gravity into immutable organizational infrastructure.</p>
            </div>

            <div style="margin-top: 50px; border-top: 1px solid #ccc; padding-top: 15px; font-size: 10px; color: #888; text-align: center;" class="mono">
              CONFIDENTIAL & ANONYMIZED FORENSIC RECORD // THE UNBOUNDED LEADERSHIP CO.
            </div>
            <script>window.print();</script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <section className="py-24 bg-[#0a0a0a] text-white border-t border-b border-white/10 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#b8860b]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-zinc-800/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-white/10 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#b8860b] animate-pulse" />
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#b8860b] uppercase">
                DECLASSIFIED INSTITUTIONAL ARTIFACT • ANONYMIZED AUDIT CASE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-tight leading-tight">
              The Sovereign Systemic Dossier <span className="text-[#b8860b] italic">in Practice</span>
            </h2>
            <p className="mt-3 text-zinc-400 text-sm sm:text-base font-light leading-relaxed font-serif">
              Every audited principal receives a clinical, mathematically indexed forensic blueprint — mapping cognitive bandwidth, authority refraction, vocal acoustic prosody, and a 10-year sovereignty decree.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2.5 bg-[#171717] hover:bg-[#222] border border-white/15 hover:border-[#b8860b] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xs transition-all flex items-center gap-2 cursor-pointer shadow-sm group"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#b8860b] group-hover:scale-110 transition-transform" />
              <span>Full Dossier Inspector</span>
            </button>
            <button
              onClick={() => {
                if (onBriefClick) {
                  onBriefClick();
                } else {
                  navigate('/assessment');
                }
              }}
              className="px-5 py-2.5 bg-[#b8860b] hover:bg-white hover:text-black text-black text-xs font-mono font-bold uppercase tracking-wider rounded-xs transition-all flex items-center gap-2 cursor-pointer shadow-md"
            >
              <span>Run Your Diagnostic</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Dossier Interactive Card Container */}
        <div className="bg-[#111111] border border-white/15 rounded-xs shadow-2xl overflow-hidden">
          {/* Top Metadata Strip */}
          <div className="bg-black/80 px-6 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#b8860b]" />
                <span className="text-zinc-300 font-bold">CASE ARCHIVE:</span>
                <span className="text-[#b8860b]">#CASE_REF-849201 [ANONYMIZED]</span>
              </div>
              <div className="text-zinc-500 hidden sm:inline">|</div>
              <div className="text-zinc-400">
                FOUNDATION: <span className="text-white font-bold">ARCHITECT</span>
              </div>
              <div className="text-zinc-500 hidden sm:inline">|</div>
              <div className="text-zinc-400">
                ROLE: <span className="text-white font-bold">FOUNDER & GROUP CEO [REDACTED CORP]</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[10px] text-zinc-400 uppercase tracking-wider">Sanitized Sovereign Record</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-[#161616] px-6 border-b border-white/10 flex overflow-x-auto no-scrollbar gap-2 sm:gap-6 font-mono text-xs">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3.5 px-2 border-b-2 font-bold uppercase transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                activeTab === 'overview'
                  ? 'border-[#b8860b] text-[#b8860b]'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>01. Apex Radar & Metrics</span>
            </button>

            <button
              onClick={() => setActiveTab('domains')}
              className={`py-3.5 px-2 border-b-2 font-bold uppercase transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                activeTab === 'domains'
                  ? 'border-[#b8860b] text-[#b8860b]'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>02. 5-Domain Vector Scores</span>
            </button>

            <button
              onClick={() => setActiveTab('acoustic')}
              className={`py-3.5 px-2 border-b-2 font-bold uppercase transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                activeTab === 'acoustic'
                  ? 'border-[#b8860b] text-[#b8860b]'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
              <span>03. Acoustic Prosody Mapping</span>
            </button>

            <button
              onClick={() => setActiveTab('decree')}
              className={`py-3.5 px-2 border-b-2 font-bold uppercase transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                activeTab === 'decree'
                  ? 'border-[#b8860b] text-[#b8860b]'
                  : 'border-transparent text-zinc-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>04. 10-Yr Generational Decree</span>
            </button>
          </div>

          {/* Tab Content Display */}
          <div className="p-6 sm:p-8">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="tab-overview"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  {/* Top 4 Core Metrics */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-[#181818] border border-white/10 p-5 rounded-xs text-center">
                      <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                        Sovereign Index
                      </span>
                      <div className="text-3xl font-serif font-bold text-[#b8860b] my-1">
                        79.0%
                      </div>
                      <span className="text-[11px] text-zinc-400 font-serif italic block">
                        Apex with Structural Latency
                      </span>
                    </div>

                    <div className="bg-[#181818] border border-white/10 p-5 rounded-xs text-center">
                      <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                        Metabolic Burn Rate
                      </span>
                      <div className="text-3xl font-serif font-bold text-white my-1">
                        70.0%
                      </div>
                      <span className="text-[11px] text-amber-400/90 font-serif italic block">
                        High Personal Friction Load
                      </span>
                    </div>

                    <div className="bg-[#181818] border border-white/10 p-5 rounded-xs text-center">
                      <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                        Refraction Index
                      </span>
                      <div className="text-3xl font-serif font-bold text-white my-1">
                        100.0%
                      </div>
                      <span className="text-[11px] text-rose-400/90 font-serif italic block">
                        Signal Dilution in Tiers 2-3
                      </span>
                    </div>

                    <div className="bg-[#181818] border border-white/10 p-5 rounded-xs text-center">
                      <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                        Institutional Half-Life
                      </span>
                      <div className="text-3xl font-serif font-bold text-emerald-400 my-1">
                        14 Mos
                      </div>
                      <span className="text-[11px] text-zinc-400 font-serif italic block">
                        Targeting 60+ Months via Protocol
                      </span>
                    </div>
                  </div>

                  {/* 2-Column: Radar Graph + Clinical Thesis */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#151515] border border-white/10 p-6 sm:p-8 rounded-xs">
                    {/* SVG Radar */}
                    <div className="lg:col-span-5 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-white/10 pb-6 lg:pb-0 lg:pr-6">
                      <div className="text-[10px] font-mono uppercase font-bold text-[#b8860b] tracking-wider mb-3">
                        5-Axis Sovereign Domain Radar
                      </div>
                      <div className="w-full max-w-[240px]">
                        <svg viewBox="0 0 240 240" className="w-full h-auto">
                          {/* Grid pentagons */}
                          <polygon points="120,40 196,95 167,185 73,185 44,95" fill="none" stroke="#333333" strokeWidth="1" />
                          <polygon points="120,60 177,101 155,168 85,168 63,101" fill="none" stroke="#2b2b2b" strokeWidth="1" />
                          <polygon points="120,80 158,107 143,152 97,152 82,107" fill="none" stroke="#222222" strokeWidth="1" />
                          {/* Axis lines */}
                          <line x1="120" y1="120" x2="120" y2="40" stroke="#333333" strokeWidth="1" />
                          <line x1="120" y1="120" x2="196" y2="95" stroke="#333333" strokeWidth="1" />
                          <line x1="120" y1="120" x2="167" y2="185" stroke="#333333" strokeWidth="1" />
                          <line x1="120" y1="120" x2="73" y2="185" stroke="#333333" strokeWidth="1" />
                          <line x1="120" y1="120" x2="44" y2="95" stroke="#333333" strokeWidth="1" />
                          {/* Data Polygon */}
                          <polygon
                            points="120.0,64.0 173.3,102.7 152.9,165.3 87.1,165.3 66.7,102.7"
                            fill="rgba(197, 160, 33, 0.25)"
                            stroke="#C5A021"
                            strokeWidth="2.5"
                          />
                          {/* Labels */}
                          <text x="120" y="30" textAnchor="middle" fontSize="7.5" fontFamily="monospace" fill="#C5A021" fontWeight="bold">CLARITY (5.0)</text>
                          <text x="202" y="98" textAnchor="start" fontSize="7.5" fontFamily="monospace" fill="#e5e5e5" fontWeight="bold">INTEGRITY (3.7)</text>
                          <text x="172" y="198" textAnchor="start" fontSize="7.5" fontFamily="monospace" fill="#C5A021" fontWeight="bold">VELOCITY (4.0)</text>
                          <text x="68" y="198" textAnchor="end" fontSize="7.5" fontFamily="monospace" fill="#C5A021" fontWeight="bold">MORAL GRAV (4.0)</text>
                          <text x="38" y="98" textAnchor="end" fontSize="7.5" fontFamily="monospace" fill="#e5e5e5" fontWeight="bold">FIDELITY (3.0)</text>
                        </svg>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500 mt-2 text-center">
                        Calculated from 12D Vector Assessment Physics
                      </span>
                    </div>

                    {/* Forensic Narrative Excerpt */}
                    <div className="lg:col-span-7 space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 bg-[#b8860b]/20 border border-[#b8860b]/40 text-[#b8860b] text-[9px] font-mono font-bold uppercase">
                          Executive Forensic Summary
                        </span>
                        <span className="text-zinc-500 font-mono text-[10px]">CALIB_01 // THE APEX FREQUENCY</span>
                      </div>

                      <p className="text-zinc-200 text-sm sm:text-base font-serif italic leading-relaxed border-l-2 border-[#b8860b] pl-4">
                        &ldquo;Your cognitive intent is currently acting as a manual override for the broader institution. You are absorbing the metabolic cost of execution with your personal willpower rather than automating it through organizational law. This is costing you 35% in strategic momentum.&rdquo;
                      </p>

                      <div className="bg-black/60 p-4 border border-white/10 rounded-xs space-y-2 font-mono text-xs">
                        <div className="flex justify-between items-center text-zinc-400">
                          <span>Escalation Density:</span>
                          <span className="text-amber-400 font-bold">94 / 100 (Critical)</span>
                        </div>
                        <div className="flex justify-between items-center text-zinc-400">
                          <span>Operational Latency Risk:</span>
                          <span className="text-amber-400 font-bold">Elevated (One-Mind Engine)</span>
                        </div>
                        <div className="flex justify-between items-center text-zinc-400">
                          <span>Primary Strategic Pivot:</span>
                          <span className="text-[#b8860b] font-bold">Transition from Leader to Architect</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'domains' && (
                <motion.div
                  key="tab-domains"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Domain 1 */}
                    <div className="bg-[#161616] border border-[#b8860b]/50 p-5 rounded-xs space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-xs font-mono font-bold text-[#b8860b] uppercase tracking-wider block">
                            Cognitive Clarity
                          </span>
                          <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                            • ANCHOR STRENGTH (SOVEREIGN)
                          </span>
                        </div>
                        <span className="px-2.5 py-1 bg-[#b8860b] text-black font-mono font-bold text-xs rounded-xs">
                          5.00 / 5.0
                        </span>
                      </div>
                      <p className="text-xs text-zinc-300 font-serif leading-relaxed">
                        Internal psychological sovereignty and apex intent. Decision-making is anchored in self-authored moral law rather than external validation.
                      </p>
                      <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-[#b8860b] w-full" />
                      </div>
                    </div>

                    {/* Domain 2 */}
                    <div className="bg-[#161616] border border-white/10 p-5 rounded-xs space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                            Cultural Fidelity
                          </span>
                          <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                            • REFINEMENT VECTOR
                          </span>
                        </div>
                        <span className="px-2.5 py-1 bg-zinc-800 text-zinc-200 font-mono font-bold text-xs rounded-xs">
                          3.00 / 5.0
                        </span>
                      </div>
                      <p className="text-xs text-zinc-300 font-serif leading-relaxed">
                        Distribution of strategic signal across tiers. Signal degrades significantly below tier 2, causing the "Silence of Compliance" and context starvation.
                      </p>
                      <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 w-3/5" />
                      </div>
                    </div>

                    {/* Domain 3 */}
                    <div className="bg-[#161616] border border-[#b8860b]/50 p-5 rounded-xs space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-xs font-mono font-bold text-[#b8860b] uppercase tracking-wider block">
                            Strategic Velocity
                          </span>
                          <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">
                            • ANCHOR STRENGTH (STABLE)
                          </span>
                        </div>
                        <span className="px-2.5 py-1 bg-[#b8860b] text-black font-mono font-bold text-xs rounded-xs">
                          4.00 / 5.0
                        </span>
                      </div>
                      <p className="text-xs text-zinc-300 font-serif leading-relaxed">
                        Capacity to weaponize asymmetric arbitrage in market chaos. Antifragile instincts are exceptionally strong at executive level.
                      </p>
                      <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-[#b8860b] w-4/5" />
                      </div>
                    </div>

                    {/* Domain 4 */}
                    <div className="bg-[#161616] border border-white/10 p-5 rounded-xs space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-xs font-mono font-bold text-white uppercase tracking-wider block">
                            Systemic Integrity
                          </span>
                          <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">
                            • REFINEMENT VECTOR
                          </span>
                        </div>
                        <span className="px-2.5 py-1 bg-zinc-800 text-zinc-200 font-mono font-bold text-xs rounded-xs">
                          3.67 / 5.0
                        </span>
                      </div>
                      <p className="text-xs text-zinc-300 font-serif leading-relaxed">
                        Distance between executive intent and execution manifestation. Requires codifying mental models into automated logic gates.
                      </p>
                      <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 w-[73%]" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-black/50 border border-[#b8860b]/30 p-4 rounded-xs flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-5 h-5 text-[#b8860b] shrink-0" />
                      <span className="text-xs font-serif text-zinc-300 italic">
                        "When these 5 vectors reach parity, the institution operates autonomously with 100% executive fidelity."
                      </span>
                    </div>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="text-[10px] font-mono text-[#b8860b] font-bold uppercase hover:underline shrink-0 hidden sm:inline"
                    >
                      Read Full Audit →
                    </button>
                  </div>
                </motion.div>
              )}

              {activeTab === 'acoustic' && (
                <motion.div
                  key="tab-acoustic"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="border-l-2 border-[#b8860b] pl-4 py-1">
                    <span className="text-[10px] font-mono font-bold text-[#b8860b] uppercase tracking-wider block">
                      Biometric Vocal Telemetry & Cross-Synthesis
                    </span>
                    <p className="text-sm font-serif italic text-zinc-200 mt-1">
                      &ldquo;The voice of a high-stakes architect whose command signal is clear at the source, but whose reasoning requires broader distribution to prevent middle-tier anxiety.&rdquo;
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-[#181818] border border-white/10 p-4 rounded-xs">
                      <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase block mb-1">
                        ACOUSTIC ARCHETYPE
                      </span>
                      <div className="text-lg font-serif font-bold text-white mb-1">
                        Orchestrator
                      </div>
                      <p className="text-[10px] text-zinc-400 font-mono">
                        High pitch stability & command-heavy ratio transmitting executive authority.
                      </p>
                    </div>

                    <div className="bg-[#181818] border border-white/10 p-4 rounded-xs">
                      <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase block mb-1">
                        COMMAND RATIO
                      </span>
                      <div className="text-lg font-serif font-bold text-[#b8860b] mb-1">
                        80% Directive
                      </div>
                      <p className="text-[10px] text-zinc-400 font-mono">
                        80% directive vs. 20% contextual logic. Target: 60/40 for distributed delegation.
                      </p>
                    </div>

                    <div className="bg-[#181818] border border-white/10 p-4 rounded-xs">
                      <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase block mb-1">
                        VOCAL CONGRUENCE
                      </span>
                      <div className="text-lg font-serif font-bold text-emerald-400 mb-1">
                        94% Alignment
                      </div>
                      <p className="text-[10px] text-zinc-400 font-mono">
                        Written conviction matches vocal prosody with exceptional fidelity.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#141414] border border-white/10 p-4 rounded-xs text-xs font-mono text-zinc-400 space-y-2">
                    <div className="text-[#b8860b] font-bold text-[10px] uppercase">
                      ACOUSTIC PHYSICS RATIONALE:
                    </div>
                    <p className="leading-relaxed">
                      Vocal prosody acts as an un-sanitizable biometric indicator of leadership conviction. Fundamental frequencies and steady cadence project authority, ensuring strategic directives filter down intact without signal refraction or institutional noise.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === 'decree' && (
                <motion.div
                  key="tab-decree"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="bg-[#161616] border border-white/10 p-6 rounded-xs space-y-4">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#b8860b]" />
                      <span className="text-xs font-mono font-bold text-[#b8860b] uppercase tracking-wider">
                        10-Year Generational Sovereign Roadmap
                      </span>
                    </div>

                    <div className="space-y-4 font-serif">
                      <div className="border-l border-[#b8860b]/40 pl-4 py-1">
                        <span className="text-[10px] font-mono font-bold text-white uppercase block mb-1">
                          YEAR 1: THE RECALIBRATION
                        </span>
                        <p className="text-xs text-zinc-300 leading-relaxed">
                          Reduce Escalation Density by 40% via Contextual Governance Charters. Shift common strategic pivots from manual executive review to hard-coded organizational logic gates.
                        </p>
                      </div>

                      <div className="border-l border-[#b8860b]/40 pl-4 py-1">
                        <span className="text-[10px] font-mono font-bold text-white uppercase block mb-1">
                          YEARS 2-4: DISTRIBUTED INTELLIGENCE
                        </span>
                        <p className="text-xs text-zinc-300 leading-relaxed">
                          Elevate Cultural Fidelity from 3.0 to 4.5. Implement Zero-Fault Telemetry across all verticals to permanently dismantle the Silence of Compliance.
                        </p>
                      </div>

                      <div className="border-l border-[#b8860b]/40 pl-4 py-1">
                        <span className="text-[10px] font-mono font-bold text-white uppercase block mb-1">
                          YEARS 5-10: INSTITUTIONAL PERPETUITY
                        </span>
                        <p className="text-xs text-zinc-300 leading-relaxed">
                          Codify Moral Gravity into immutable dynastic code. Establish sovereign succession resonance profiles ensuring the enterprise compounds across decades.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Action Footer Bar */}
          <div className="bg-black/90 px-6 py-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <Lock className="w-3.5 h-3.5 text-[#b8860b]" />
              <span>Full 8-Section Sovereign Dossier Available in Archive</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-[#1c1c1c] hover:bg-[#282828] text-white text-xs font-mono font-bold uppercase rounded-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5 text-[#b8860b]" />
                <span>Examine Case Artifact</span>
              </button>
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-[#b8860b] hover:bg-white hover:text-black text-black text-xs font-mono font-bold uppercase rounded-xs transition-all flex items-center gap-2 cursor-pointer font-bold shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Dossier</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FULL-PAGE MODAL INSPECTOR */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#FAF9F5] text-[#0A0A0A] max-w-4xl w-full max-h-[90vh] rounded-xs shadow-2xl overflow-hidden flex flex-col font-serif"
            >
              {/* Modal Topbar */}
              <div className="bg-[#111111] text-white px-6 py-4 flex items-center justify-between border-b border-white/10 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#b8860b] animate-pulse" />
                  <span className="text-[#b8860b] font-bold uppercase">DECLASSIFIED SOVEREIGN DOSSIER // CASE ARTIFACT</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrint}
                    className="px-3 py-1 bg-[#b8860b] text-black font-bold uppercase text-[10px] flex items-center gap-1.5 hover:bg-white cursor-pointer transition-all"
                  >
                    <Download className="w-3 h-3" />
                    <span>Print / Save PDF</span>
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-1 text-zinc-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Content Scroll Area */}
              <div className="overflow-y-auto p-6 sm:p-10 space-y-8 text-xs leading-relaxed text-[#111]">
                {/* Document Header */}
                <div className="border-b-2 border-[#C5A021] pb-6 text-center">
                  <div className="inline-block font-mono text-[9px] font-bold text-[#8a6d1a] bg-[#C5A021]/10 px-3 py-1 border border-[#C5A021]/30 uppercase mb-2">
                    LEGACY ENTERPRISE SOVEREIGN DOSSIER // INSTITUTIONAL STABILITY & SYSTEMIC COMMAND
                  </div>
                  <div className="text-xs font-mono font-bold tracking-[0.3em] text-[#8a6d1a] uppercase">
                    The Unbounded Leadership Co.
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-bold uppercase my-2">
                    Sovereign Systemic Dossier
                  </h1>
                  <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                    Executive Calibration & Institutional DNA Extraction • FINGERPRINT: CASE_REF-849201 [ANONYMIZED]
                  </div>
                </div>

                {/* Metrics 4-Box */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="border border-zinc-200 bg-white p-3 text-center">
                    <span className="font-mono text-[9px] text-zinc-500 uppercase block">Sovereign Index</span>
                    <div className="text-xl font-bold text-[#C5A021]">79.0%</div>
                    <span className="text-[10px] text-zinc-500">Apex Sovereignty</span>
                  </div>
                  <div className="border border-zinc-200 bg-white p-3 text-center">
                    <span className="font-mono text-[9px] text-zinc-500 uppercase block">Metabolic Burn</span>
                    <div className="text-xl font-bold text-zinc-900">70.0%</div>
                    <span className="text-[10px] text-zinc-500">Elevated Load</span>
                  </div>
                  <div className="border border-zinc-200 bg-white p-3 text-center">
                    <span className="font-mono text-[9px] text-zinc-500 uppercase block">Refraction Index</span>
                    <div className="text-xl font-bold text-zinc-900">100.0%</div>
                    <span className="text-[10px] text-zinc-500">Signal Refraction</span>
                  </div>
                  <div className="border border-zinc-200 bg-white p-3 text-center">
                    <span className="font-mono text-[9px] text-zinc-500 uppercase block">Survival Probability</span>
                    <div className="text-xl font-bold text-emerald-700">100%</div>
                    <span className="text-[10px] text-zinc-500">Generational Health</span>
                  </div>
                </div>

                {/* Section I */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center border-b border-black pb-1">
                    <span className="font-bold text-sm uppercase">Section I: Recognition & Presence</span>
                    <span className="font-mono text-[10px] text-[#8a6d1a] font-bold">CALIB-01</span>
                  </div>
                  <p className="italic text-justify">
                    CALIBRATION_01 // THE APEX FREQUENCY. The audited enterprise footprint is characterized by an exceptional concentration of cognitive power within the executive node. The Principal is operating as a primary Architect of reality, where raw focal energy acts as the fundamental driver for the entire enterprise. We identify this as a state of Cognitive Sovereignty. However, the physics of this presence currently functions as a manual override for the broader system. Operational Latency Risk: Executive cognitive intent is currently acting as a manual override. The Principal is absorbing the metabolic cost of execution with personal willpower rather than automating it through organizational law. This is costing an estimated 35% in strategic momentum.
                  </p>
                </div>

                {/* Section II */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center border-b border-black pb-1">
                    <span className="font-bold text-sm uppercase">Section II: Over-Indexed Magnification</span>
                    <span className="font-mono text-[10px] text-[#8a6d1a] font-bold">CALIB-02</span>
                  </div>
                  <p className="italic text-justify">
                    CALIBRATION_02 // THE CHASSIS STRESS. The audit reveals a significant Over-Indexing on Cognitive Clarity, which has inadvertently created a structural bottleneck within the institutional OS. When apex clarity reaches the 5.0 intensity threshold, it triggers The Authority Isolation Loop: absolute executive conviction outrunning the team's ability to absorb context. To transform these virtues into immutable self-regulating systems, we must implement a Decentralized Context Protocol.
                  </p>
                </div>

                {/* Section III */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center border-b border-black pb-1">
                    <span className="font-bold text-sm uppercase">Section III: Seasonal Refinement & Zero-Fault Telemetry</span>
                    <span className="font-mono text-[10px] text-[#8a6d1a] font-bold">CALIB-03</span>
                  </div>
                  <p className="italic text-justify">
                    CALIBRATION_03 // THE SEASONAL HORIZON. Zero-Fault Telemetry Risk: When operational nodes fear punitive signal refraction, raw execution data is sanitized before reaching command level. This creates a Silence of Compliance that blinds executive command to systemic friction. Instituting zero-fault error telemetry is an architectural prerequisite to eliminate hidden operational drag.
                  </p>
                </div>

                {/* Section IV & V */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center border-b border-black pb-1">
                    <span className="font-bold text-sm uppercase">Section V: The Institutional Generational Decree</span>
                    <span className="font-mono text-[10px] text-[#8a6d1a] font-bold">CALIB-05</span>
                  </div>
                  <p className="italic text-justify">
                    CALIBRATION_05 // THE GENERATIONAL DECREE. To ensure the perpetuity of the enterprise and dynastic legacy, we propose a 10-year strategic blueprint focused on Structural Integration and Institutional Insulation. The goal is to transition from a leader-dependent organization to a self-regulating sovereign operating system. Year 1: Reduce Escalation Density by 40%. Years 2-4: Distributed Intelligence. Years 5-10: Institutional Perpetuity.
                  </p>
                </div>

                {/* Modal Footer Callout */}
                <div className="bg-[#111111] text-white p-6 rounded-xs flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div>
                    <div className="text-[#b8860b] font-mono font-bold text-xs uppercase mb-1">
                      Ready for Your Institutional Diagnosis?
                    </div>
                    <div className="text-zinc-300 text-xs font-serif">
                      Run the diagnostic assessment to extract your organization's sovereign vector profile.
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      if (onBriefClick) {
                        onBriefClick();
                      } else {
                        navigate('/assessment');
                      }
                    }}
                    className="px-5 py-2.5 bg-[#b8860b] hover:bg-white hover:text-black text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xs cursor-pointer shrink-0 transition-all"
                  >
                    Start Assessment →
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DossierCaseStudyPreview;
