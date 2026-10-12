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
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Cpu,
  BarChart3,
  AlertTriangle,
  Award,
  BookOpen
} from 'lucide-react';

interface DossierCaseStudyPreviewProps {
  onBriefClick?: (id?: string) => void;
  briefingMode?: boolean;
}

const DOSSIER_PAGES = [
  {
    pageNumber: 1,
    id: 'page-1',
    tabName: '01. Executive Identity & Indices',
    title: 'Page 01 // Executive Identity, Systemic Indices & Clinical Thesis',
    subtitle: 'Apex Telemetry & Baseline Friction Audit',
    badge: 'CONFIDENTIAL • CASE REF #849201'
  },
  {
    pageNumber: 2,
    id: 'page-2',
    tabName: '02. 5 Sovereign Domains',
    title: 'Page 02 // The 5 Sovereign Domains — Forensic Vector Diagnostic',
    subtitle: 'Multidimensional Architectural Geometry & Radar Analysis',
    badge: 'PROVISIONAL PATENT-PENDING FRAMEWORK'
  },
  {
    pageNumber: 3,
    id: 'page-3',
    tabName: '03. Meeting Tax & Latency',
    title: 'Page 03 // Operational Latency, Escalation Density & Meeting Tax',
    subtitle: 'The Authority Isolation Loop & Intent Dilution Mapping',
    badge: 'FORENSIC FRICTION ANALYSIS'
  },
  {
    pageNumber: 4,
    id: 'page-4',
    tabName: '04. Directive Transmission',
    title: 'Page 04 // Executive Communication & Strategic Intent Transmission',
    subtitle: 'Leadership Delivery Archetype & Context-to-Command Ratio',
    badge: 'COGNITIVE SUBSTRATE MAPPING'
  },
  {
    pageNumber: 5,
    id: 'page-5',
    tabName: '05. Execution Protocol Calibration',
    title: 'Page 05 // Structural Execution Protocol Calibration & Decision Architecture',
    subtitle: '12-Gate Operational Intervention & Delegation Guardrails',
    badge: 'OPERATIONAL INTERVENTION MATRIX'
  },
  {
    pageNumber: 6,
    id: 'page-6',
    tabName: '06. 10-Yr Sovereign Decree',
    title: 'Page 06 // The 10-Year Sovereign Generational Decree & Governance Charter',
    subtitle: 'Dynastic Perpetuity, Key-Person De-risking & Exit Valuation',
    badge: 'INSTITUTIONAL PERPETUITY BLUEPRINT'
  }
];

const DossierCaseStudyPreview: React.FC<DossierCaseStudyPreviewProps> = ({ onBriefClick, briefingMode = false }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>TULC // Declassified Sovereign Systemic Dossier (Complete Board Artifact)</title>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=JetBrains+Mono:wght@400;600;700&family=Inter:wght@300;400;600;700&display=swap');
              @page { size: A4; margin: 20mm; }
              body { font-family: 'Playfair Display', Georgia, serif; background: #FAF9F5; color: #0A0A0A; padding: 20px; font-size: 11pt; line-height: 1.6; }
              .page { page-break-after: always; padding: 25px 0; min-height: 90vh; border-bottom: 2px dashed #C5A021; margin-bottom: 40px; }
              .page:last-child { page-break-after: avoid; border-bottom: none; }
              .header { border-bottom: 2px solid #C5A021; padding-bottom: 15px; text-align: center; margin-bottom: 25px; }
              .badge { display: inline-block; font-size: 8pt; font-weight: bold; letter-spacing: 0.15em; color: #8a6d1a; background: rgba(197,160,33,0.12); padding: 4px 12px; border: 1px solid rgba(197,160,33,0.4); text-transform: uppercase; margin-bottom: 8px; font-family: 'JetBrains Mono', monospace; }
              .page-footer { margin-top: 35px; border-top: 1px solid #ccc; padding-top: 10px; font-size: 8pt; color: #777; display: flex; justify-content: space-between; font-family: 'JetBrains Mono', monospace; }
              .metrics-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin: 20px 0; font-family: 'Inter', sans-serif; }
              .metric-box { border: 1px solid #dcd8cb; background: #fff; padding: 12px; text-align: center; }
              .metric-val { font-size: 20pt; font-weight: 700; color: #0A0A0A; font-family: 'Playfair Display', serif; }
              .section-heading { font-size: 13pt; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 4px; margin: 20px 0 10px 0; color: #0A0A0A; }
              .callout-box { background: rgba(197,160,33,0.08); border-left: 4px solid #C5A021; padding: 14px 18px; font-style: italic; margin: 18px 0; }
              .mono { font-family: 'JetBrains Mono', monospace; font-size: 9pt; }
              .sans { font-family: 'Inter', sans-serif; font-size: 10pt; }
              .redacted { background: #000; color: #000; padding: 0 4px; border-radius: 2px; user-select: none; }
              table { width: 100%; border-collapse: collapse; margin: 15px 0; font-family: 'Inter', sans-serif; font-size: 9pt; }
              th, td { border: 1px solid #dcd8cb; padding: 8px 10px; text-align: left; }
              th { background: #f0ece1; font-family: 'JetBrains Mono', monospace; font-size: 8pt; text-transform: uppercase; }
            </style>
          </head>
          <body>
            
            <!-- PAGE 1: EXECUTIVE IDENTITY & INDICES -->
            <div class="page">
              <div class="header">
                <div class="badge">DECLASSIFIED INSTITUTIONAL CASE ARTIFACT // TULC EXECUTIVE ARCHIVE</div>
                <h1 style="margin: 6px 0; text-transform: uppercase; font-size: 22pt;">Sovereign Systemic Dossier</h1>
                <div class="mono" style="color: #666;">FINGERPRINT: CASE_REF-849201 // RECORD: <span style="color:#b8860b;">ANONYMIZED FOR CONFIDENTIALITY</span></div>
                <div class="mono" style="margin-top: 4px; color: #444;">PRINCIPAL: <span class="redacted">Suchita Sancheti Client</span> [GROUP FOUNDER & CEO] // ENTITY: <span class="redacted">Global Industrial Corp</span> [GLOBAL DEEPTECH & MANUFACTURING CONGLOMERATE]</div>
              </div>

              <div class="metrics-grid">
                <div class="metric-box"><div class="mono" style="font-size: 7.5pt; color:#888;">SOVEREIGN INDEX</div><div class="metric-val" style="color:#C5A021;">79.0%</div><div style="font-size: 8.5pt; color:#666;">Apex Sovereignty</div></div>
                <div class="metric-box"><div class="mono" style="font-size: 7.5pt; color:#888;">METABOLIC BURN</div><div class="metric-val">70.0%</div><div style="font-size: 8.5pt; color:#666;">Personal Override Load</div></div>
                <div class="metric-box"><div class="mono" style="font-size: 7.5pt; color:#888;">SIGNAL DILUTION</div><div class="metric-val" style="color:#b82b2b;">100.0%</div><div style="font-size: 8.5pt; color:#666;">Decay below Tier 2</div></div>
                <div class="metric-box"><div class="mono" style="font-size: 7.5pt; color:#888;">HALF-LIFE BASELINE</div><div class="metric-val" style="color:#137333;">14 Mos</div><div style="font-size: 8.5pt; color:#666;">Longevity Without Founder</div></div>
              </div>

              <div class="callout-box">
                <strong>Executive Clinical Thesis:</strong> "The audited enterprise operates under the physics of a One-Mind Engine. The Principal's cognitive clarity is extraordinary (5.00/5.0), but intent currently acts as a manual override for the entire institution. The founder absorbs the metabolic cost of daily tactical execution with personal willpower rather than automating it through immutable organizational architecture. This imposes an estimated 35% drag on strategic velocity and introduces acute key-person vulnerability."
              </div>

              <div class="section-heading">CALIBRATION 01 // THE APEX CONVICTION PARADOX</div>
              <p class="sans" style="line-height: 1.6;">
                The diagnostic audit reveals an apex node operating with absolute conviction. Decisions are anchored in internally generated strategic law rather than external validation. However, because this conviction is stored in the founder's head rather than codified into self-executing execution protocols, every critical decision routes back to the CEO desk. Escalation Density is measured at <strong>94/100 (Critical)</strong>, forcing the Principal into 18+ hours of reactive tactical firefighting per week.
              </p>

              <div class="page-footer">
                <span>THE UNBOUNDED LEADERSHIP CO. // CASE_REF-849201</span>
                <span>PAGE 1 OF 6</span>
                <span>CONFIDENTIAL & ANONYMIZED FORENSIC RECORD</span>
              </div>
            </div>

            <!-- PAGE 2: 5 SOVEREIGN DOMAINS -->
            <div class="page">
              <div class="header">
                <div class="badge">PROVISIONAL PATENT-PENDING DIAGNOSTIC MATRIX</div>
                <h2 style="margin: 4px 0; text-transform: uppercase; font-size: 18pt;">The 5 Sovereign Domains Forensic Diagnostic</h2>
                <div class="mono" style="color: #666;">CROSS-DOMAIN VECTOR SCORING & ORGANIZATIONAL GEOMETRY</div>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Domain Vector</th>
                    <th>Score</th>
                    <th>Status</th>
                    <th>Forensic Finding & Operational Reality</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>01. Cognitive Clarity</strong></td>
                    <td style="color:#C5A021; font-weight:bold;">5.00 / 5.0</td>
                    <td>Sovereign Anchor</td>
                    <td>Apex conviction is absolute. Uncompromised vision and pristine intuitive compass.</td>
                  </tr>
                  <tr>
                    <td><strong>02. Systemic Integrity</strong></td>
                    <td style="font-weight:bold;">3.67 / 5.0</td>
                    <td>Refinement Vector</td>
                    <td>The gap between boardroom decisions and SOP execution. Requires hard-coded execution protocols.</td>
                  </tr>
                  <tr>
                    <td><strong>03. Strategic Velocity</strong></td>
                    <td style="color:#C5A021; font-weight:bold;">4.00 / 5.0</td>
                    <td>High Performance</td>
                    <td>Rapid market arbitrage at the top; intermediate execution delayed by verification loops.</td>
                  </tr>
                  <tr>
                    <td><strong>04. Moral Gravity</strong></td>
                    <td style="color:#C5A021; font-weight:bold;">4.00 / 5.0</td>
                    <td>Stable Anchor</td>
                    <td>Values are deeply felt but not yet externalized into autonomous operational governance.</td>
                  </tr>
                  <tr>
                    <td><strong>05. Cultural Fidelity</strong></td>
                    <td style="color:#b82b2b; font-weight:bold;">3.00 / 5.0</td>
                    <td>Critical Leakage</td>
                    <td>Signal degrades significantly below Tier 2, creating the 'Silence of Compliance' and hesitation.</td>
                  </tr>
                </tbody>
              </table>

              <div class="callout-box">
                <strong>Architectural Parity Rule:</strong> "When all 5 sovereign vectors achieve mathematical parity, the organization transitions from a leader-dependent pyramid to a self-cohering organism capable of compound expansion."
              </div>

              <div class="section-heading">VECTOR ANALYSIS // THE CONTEXT STARVATION LEAK</div>
              <p class="sans" style="line-height: 1.6;">
                While Cognitive Clarity stands at 5.0, Cultural Fidelity drops to 3.0. This delta of 2.0 points represents the exact zone where the founder's vision is lost in translation. Middle managers do not lack competence; they lack the codified decision parameters necessary to act with the founder's exact risk appetite without booking a meeting.
              </p>

              <div class="page-footer">
                <span>THE UNBOUNDED LEADERSHIP CO. // CASE_REF-849201</span>
                <span>PAGE 2 OF 6</span>
                <span>CONFIDENTIAL & ANONYMIZED FORENSIC RECORD</span>
              </div>
            </div>

            <!-- PAGE 3: MEETING TAX & LATENCY -->
            <div class="page">
              <div class="header">
                <div class="badge">FORENSIC FRICTION & COORDINATION AUDIT</div>
                <h2 style="margin: 4px 0; text-transform: uppercase; font-size: 18pt;">Operational Latency, Escalation Density & Meeting Tax</h2>
                <div class="mono" style="color: #666;">SYSTEMIC BOTTLENECK & ORGANIZATIONAL DRAG QUANTIFICATION</div>
              </div>

              <div class="metrics-grid">
                <div class="metric-box"><div class="mono" style="font-size: 7.5pt; color:#888;">ESCALATION DENSITY</div><div class="metric-val" style="color:#b82b2b;">94 / 100</div><div style="font-size: 8.5pt; color:#666;">Critical Centralization</div></div>
                <div class="metric-box"><div class="mono" style="font-size: 7.5pt; color:#888;">WEEKLY MEETING TAX</div><div class="metric-val">18.5 Hrs</div><div style="font-size: 8.5pt; color:#666;">Spent in Status Alignment</div></div>
                <div class="metric-box"><div class="mono" style="font-size: 7.5pt; color:#888;">ANNUAL DRAG COST</div><div class="metric-val" style="color:#C5A021;">$1.42M</div><div style="font-size: 8.5pt; color:#666;">Executive Latency Drag</div></div>
                <div class="metric-box"><div class="mono" style="font-size: 7.5pt; color:#888;">RECLAIMABLE FOCUS</div><div class="metric-val" style="color:#137333;">15+ Hrs/Wk</div><div style="font-size: 8.5pt; color:#666;">Via Execution Protocol Interventions</div></div>
              </div>

              <div class="section-heading">SIGNAL DECAY ACROSS MANAGEMENT TIERS</div>
              <table>
                <thead>
                  <tr>
                    <th>Tier / Hierarchy Node</th>
                    <th>Fidelity %</th>
                    <th>Observed Operational Behavior</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Apex Executive Desk</strong></td>
                    <td>100%</td>
                    <td>Flawless intent, strategic clarity, high-speed intuitive reasoning.</td>
                  </tr>
                  <tr>
                    <td><strong>Tier 1: Direct C-Suite</strong></td>
                    <td>82%</td>
                    <td>High alignment on goals; moderate friction in inter-departmental handoffs.</td>
                  </tr>
                  <tr>
                    <td><strong>Tier 2: Department VPs / Directors</strong></td>
                    <td>58%</td>
                    <td>Context gap emerges. Unsure of risk boundaries; decisions delayed for CEO signoff.</td>
                  </tr>
                  <tr>
                    <td><strong>Tier 3: Frontline & Team Leads</strong></td>
                    <td>34%</td>
                    <td>Defensive reporting, adherence to obsolete SOPs, fear of punitive feedback.</td>
                  </tr>
                </tbody>
              </table>

              <div class="callout-box">
                <strong>The Authority Isolation Loop:</strong> "Because Tier 2 and 3 operate at only 34-58% context fidelity, they routinely escalate micro-decisions upward. The founder responds by reviewing more work, inadvertently reinforcing the dependency loop."
              </div>

              <div class="page-footer">
                <span>THE UNBOUNDED LEADERSHIP CO. // CASE_REF-849201</span>
                <span>PAGE 3 OF 6</span>
                <span>CONFIDENTIAL & ANONYMIZED FORENSIC RECORD</span>
              </div>
            </div>

            <!-- PAGE 4: DIRECTIVE TRANSMISSION -->
            <div class="page">
              <div class="header">
                <div class="badge">COGNITIVE TRANSMISSION AUDIT</div>
                <h2 style="margin: 4px 0; text-transform: uppercase; font-size: 18pt;">Executive Communication & Strategic Intent Transmission</h2>
                <div class="mono" style="color: #666;">LEADERSHIP DELIVERY ARCHETYPE & DELEGATION FIDELITY</div>
              </div>

              <div class="metrics-grid">
                <div class="metric-box"><div class="mono" style="font-size: 7.5pt; color:#888;">LEADERSHIP ARCHETYPE</div><div class="metric-val" style="font-size: 16pt;">Orchestrator</div><div style="font-size: 8.5pt; color:#666;">High Tonal Authority</div></div>
                <div class="metric-box"><div class="mono" style="font-size: 7.5pt; color:#888;">COMMAND RATIO</div><div class="metric-val" style="color:#C5A021;">80% / 20%</div><div style="font-size: 8.5pt; color:#666;">80% Directive vs. Context</div></div>
                <div class="metric-box"><div class="mono" style="font-size: 7.5pt; color:#888;">DIRECTIVE FIDELITY</div><div class="metric-val" style="color:#137333;">94%</div><div style="font-size: 8.5pt; color:#666;">Source Conviction</div></div>
                <div class="metric-box"><div class="mono" style="font-size: 7.5pt; color:#888;">30-DAY SABBATICAL TEST</div><div class="metric-val" style="color:#b82b2b;">FAIL</div><div style="font-size: 8.5pt; color:#666;">Enterprise Stalls in Absence</div></div>
              </div>

              <div class="section-heading">FORENSIC OBSERVATIONS ON LEADERSHIP TRANSMISSION</div>
              <p class="sans" style="line-height: 1.6;">
                The Principal's delivery carries immense gravitational weight. Subordinates immediately recognize the authority of directives, but frequently misunderstand the underlying <em>why</em>. When novel operational conditions arise that don't fit the explicit command, teams pause execution rather than extrapolating the founder's reasoning.
              </p>

              <div class="callout-box">
                <strong>Strategic Pivot Required:</strong> Shift command ratio from 80/20 (Directive-heavy) to 60/40 (Context-heavy), paired with pre-authorized decision charters that empower direct reports to act with sovereign certainty.
              </div>

              <div class="page-footer">
                <span>THE UNBOUNDED LEADERSHIP CO. // CASE_REF-849201</span>
                <span>PAGE 4 OF 6</span>
                <span>CONFIDENTIAL & ANONYMIZED FORENSIC RECORD</span>
              </div>
            </div>

            <!-- PAGE 5: EXECUTION PROTOCOL INTERVENTION -->
            <div class="page">
              <div class="header">
                <div class="badge">SYSTEMIC INTERVENTION ARCHITECTURE</div>
                <h2 style="margin: 4px 0; text-transform: uppercase; font-size: 18pt;">Structural Execution Protocol Calibration & Decision Architecture</h2>
                <div class="mono" style="color: #666;">12-GATE RE-ARCHITECTURE OF ORGANIZATIONAL OPERATING SYSTEM</div>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Gate Group</th>
                    <th>Installed Operating Logic</th>
                    <th>Target Outcome</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Gates 01–04:<br/>Autonomous Capital & Scope</strong></td>
                    <td>Pre-approved budget and initiative logic up to $150,000 without requiring CEO signature, provided 3 risk-containment guardrails are met.</td>
                    <td>Eliminates 12 weekly approval bottlenecks; accelerates procurement by 8x.</td>
                  </tr>
                  <tr>
                    <td><strong>Gates 05–08:<br/>Escalation Filter Architecture</strong></td>
                    <td>Issues may only escalate to the Principal if: (1) Existential legal/brand hazard, (2) Strategic budget variance >$250k, or (3) Core cultural violation.</td>
                    <td>Reduces Escalation Density by 45%; cuts meeting load by 10 hours/week.</td>
                  </tr>
                  <tr>
                    <td><strong>Gates 09–12:<br/>Distributed Context Charters</strong></td>
                    <td>Automated weekly broadcast of strategic priorities and decision rationales. Zero-penalty error transparency protocol across all units.</td>
                    <td>Eliminates defensive reporting; lifts frontline fidelity from 34% to 85%.</td>
                  </tr>
                </tbody>
              </table>

              <div class="callout-box">
                <strong>Operational Transformation:</strong> "We do not write generic advisory recommendations. We engineer codified rules of engagement that permanently alter how information, authority, and accountability flow through your business."
              </div>

              <div class="page-footer">
                <span>THE UNBOUNDED LEADERSHIP CO. // CASE_REF-849201</span>
                <span>PAGE 5 OF 6</span>
                <span>CONFIDENTIAL & ANONYMIZED FORENSIC RECORD</span>
              </div>
            </div>

            <!-- PAGE 6: 10-YEAR GENERATIONAL DECREE -->
            <div class="page">
              <div class="header">
                <div class="badge">INSTITUTIONAL PERPETUITY & VALUATION HARDENING</div>
                <h2 style="margin: 4px 0; text-transform: uppercase; font-size: 18pt;">The 10-Year Sovereign Generational Decree</h2>
                <div class="mono" style="color: #666;">GOVERNANCE PERPETUITY, KEY-PERSON RISK ELIMINATION & EXIT VALUATION</div>
              </div>

              <div class="sans" style="line-height: 1.7; margin-bottom: 20px;">
                <p><strong>YEAR 1: THE RECALIBRATION & BANDWIDTH LIBERATION</strong><br/>
                Implement the 12 Execution Protocols. Reduce Escalation Density from 94 to 45. Reclaim 15+ hours/week for the Principal. Pass the 30-Day Step-Away Sabbatical Test with zero operational degradation.</p>

                <p><strong>YEARS 2–4: DISTRIBUTED OPERATIONAL INTELLIGENCE</strong><br/>
                Elevate Cultural Fidelity to 4.8/5.0. Permanently eradicate defensive reporting. Empower C-Suite executives to make high-stakes capital allocations with 100% of the founder's reasoning.</p>

                <p><strong>YEARS 5–10: DYNASTIC PERPETUITY & VALUATION PREMIUM</strong><br/>
                Codify founder wisdom into immutable institutional governance. Permanently eliminate the key-person valuation discount (commanding up to 35% enterprise premium during capital events or generational succession).</p>
              </div>

              <div class="callout-box" style="border-left-color: #137333; background: rgba(19,115,51,0.06);">
                <strong>Forensic Certification & Governance Seal:</strong><br/>
                <em>"Certified as a validated clinical forensic audit of institutional operating architecture. Designed and calibrated by The Unbounded Leadership Co."</em><br/>
                <div style="margin-top: 10px; font-weight: bold; font-family: 'JetBrains Mono', monospace; font-size: 8.5pt;">
                  SUCHITA SANCHETI // FOUNDER & ALIGNMENT ARCHITECT<br/>
                  RECORD: DECLASSIFIED & SANITIZED // ARCHIVE CODE: TULC-849201
                </div>
              </div>

              <div class="page-footer">
                <span>THE UNBOUNDED LEADERSHIP CO. // CASE_REF-849201</span>
                <span>PAGE 6 OF 6</span>
                <span>CONFIDENTIAL & ANONYMIZED FORENSIC RECORD</span>
              </div>
            </div>

            <script>window.print();</script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-[#0a0a0a] text-white border-t border-b border-white/10 relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#b8860b]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-zinc-800/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 pb-6 border-b border-white/10 gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#b8860b] animate-pulse" />
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#b8860b] uppercase">
                DECLASSIFIED INSTITUTIONAL CASE ARTIFACT • CONFIDENTIAL & ANONYMIZED
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
              The Complete Sovereign Dossier <span className="text-[#b8860b] italic">in Practice</span>
            </h2>
            <p className="mt-3 text-zinc-300 text-sm sm:text-base font-light leading-relaxed font-serif">
              Every audited principal receives an exhaustive clinical forensic blueprint—mapping apex cognitive bandwidth, 5-domain vector geometry, escalation density, meeting tax drag, execution protocol intervention, and a generational institutional decree.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2.5 bg-[#171717] hover:bg-[#222] border border-white/15 hover:border-[#b8860b] text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xs transition-all flex items-center gap-2 cursor-pointer shadow-sm group"
            >
              <Maximize2 className="w-3.5 h-3.5 text-[#b8860b] group-hover:scale-110 transition-transform" />
              <span>Inspect Full Artifact</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2.5 bg-[#1f1a10] hover:bg-[#b8860b] hover:text-black border border-[#b8860b]/40 text-[#b8860b] text-xs font-mono font-bold uppercase tracking-wider rounded-xs transition-all flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Complete Dossier</span>
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
              <span>Run Diagnostic</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 6-PAGE INTERACTIVE EXECUTIVE DOSSIER VIEWER OR CONDENSED BRIEFING CARD */}
        {briefingMode ? (
          <div className="bg-[#111111] border border-[#b8860b]/40 rounded-xs shadow-2xl p-6 sm:p-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#b8860b]/10 blur-3xl rounded-full pointer-events-none" />

            {/* Header Metadata */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-white/10 gap-3">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-2.5 py-1 bg-[#b8860b]/20 text-[#b8860b] border border-[#b8860b]/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                  CONFIDENTIAL ARCHIVE // CASE REF #849201
                </span>
                <span className="text-zinc-400 text-xs font-mono">
                  Principal: <strong className="text-white">Group CEO</strong> • Multi-Entity Enterprise ($65M+ Rev / 5,000+ Team)
                </span>
              </div>
              <div className="text-[11px] font-mono text-zinc-400">
                Audited by: <span className="text-[#b8860b] font-bold">The Unbounded Leadership Co.</span>
              </div>
            </div>

            {/* Core Findings & Metrics Grid */}
            <div className="py-6 grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="text-[10px] font-mono font-bold uppercase text-[#b8860b] tracking-wider">
                  CLINICAL PATHOLOGY & TRANSFORMATION
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white leading-snug">
                  Eradicating the Authority Isolation Loop & $1.42M Coordination Tax
                </h3>
                <p className="text-zinc-300 text-sm font-serif italic font-light leading-relaxed">
                  &ldquo;Because Tier 2 and Tier 3 leaders operated with only 34–58% context fidelity, routine decisions were escalated upward daily. The CEO spent 18.5 hrs/week in status alignment, inadvertently reinforcing dependency. By installing 12 autonomous execution gates, we converted heroic founder intervention into self-executing operational governance.&rdquo;
                </p>
                <div className="p-3.5 bg-black/70 border border-[#b8860b]/30 rounded-xs text-xs font-mono text-zinc-300 flex items-center gap-3">
                  <span className="text-[#b8860b] text-base">✦</span>
                  <span><strong>The 2.0-Point Delta:</strong> Founder cognitive clarity scored 5.0, but cultural fidelity was 3.0. Codified execution protocols bridged the context gap.</span>
                </div>
              </div>

              {/* 4 Quantitative Proof Metrics */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-3">
                <div className="bg-black/60 border border-white/10 p-4 rounded-xs">
                  <span className="text-[9px] font-mono text-zinc-400 uppercase block mb-1">Reclaimed Focus</span>
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-[#b8860b] block">+35%</span>
                  <span className="text-[10px] font-mono text-zinc-400">15+ hrs/wk saved from firefighting</span>
                </div>
                <div className="bg-black/60 border border-white/10 p-4 rounded-xs">
                  <span className="text-[9px] font-mono text-zinc-400 uppercase block mb-1">Drag Eradicated</span>
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-emerald-400 block">$1.42M</span>
                  <span className="text-[10px] font-mono text-zinc-400">Annual coordination waste saved</span>
                </div>
                <div className="bg-black/60 border border-white/10 p-4 rounded-xs">
                  <span className="text-[9px] font-mono text-zinc-400 uppercase block mb-1">Decisions Sealed</span>
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-white block">12 Gates</span>
                  <span className="text-[10px] font-mono text-zinc-400">Autonomous execution protocols</span>
                </div>
                <div className="bg-black/60 border border-white/10 p-4 rounded-xs">
                  <span className="text-[9px] font-mono text-zinc-400 uppercase block mb-1">Exit Multiple</span>
                  <span className="text-2xl sm:text-3xl font-serif font-bold text-[#b8860b] block">+35%</span>
                  <span className="text-[10px] font-mono text-zinc-400">Key-person risk discounted to 0</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                <FileText className="w-4 h-4 text-[#b8860b]" />
                <span>6-Page Dossier: Apex Indices, 5-Domain Vector Diagnostic, Meeting Tax Audit, & 10-Yr Decree</span>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-3 bg-[#b8860b] text-black hover:bg-white text-xs font-mono font-black uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg font-bold"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span>Inspect Complete 6-Page Board Dossier</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="px-4 py-3 bg-zinc-900 hover:bg-zinc-800 border border-white/20 text-zinc-300 hover:text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Dossier</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
        <div className="bg-[#111111] border border-white/15 rounded-xs shadow-2xl overflow-hidden">
          
          {/* Top Metadata Strip */}
          <div className="bg-black/90 px-6 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#b8860b]" />
                <span className="text-zinc-300 font-bold">CASE ARCHIVE:</span>
                <span className="text-[#b8860b]">#CASE_REF-849201 [ANONYMIZED]</span>
              </div>
              <div className="text-zinc-500 hidden sm:inline">|</div>
              <div className="text-zinc-400">
                PRINCIPAL: <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-xs text-[10px]">[REDACTED] GROUP CEO</span>
              </div>
              <div className="text-zinc-500 hidden sm:inline">|</div>
              <div className="text-zinc-400">
                ENTITY: <span className="bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-xs text-[10px]">[REDACTED] GLOBAL ENTERPRISE</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] text-[#b8860b] font-bold">PAGE {currentPage} OF 6</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className={`p-1.5 border rounded-xs transition-colors ${currentPage === 1 ? 'border-white/5 text-zinc-600 cursor-not-allowed' : 'border-white/20 text-white hover:border-[#b8860b]'}`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(6, prev + 1))}
                  disabled={currentPage === 6}
                  className={`p-1.5 border rounded-xs transition-colors ${currentPage === 6 ? 'border-white/5 text-zinc-600 cursor-not-allowed' : 'border-white/20 text-white hover:border-[#b8860b]'}`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Dossier Navigation Tab Bar */}
          <div className="bg-[#161616] px-4 sm:px-6 border-b border-white/10 flex overflow-x-auto no-scrollbar gap-2 sm:gap-4 font-mono text-xs">
            {DOSSIER_PAGES.map((page) => (
              <button
                key={page.id}
                onClick={() => setCurrentPage(page.pageNumber)}
                className={`py-3.5 px-2.5 border-b-2 font-bold uppercase transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  currentPage === page.pageNumber
                    ? 'border-[#b8860b] text-[#b8860b]'
                    : 'border-transparent text-zinc-400 hover:text-white'
                }`}
              >
                <span>Page 0{page.pageNumber}</span>
                <span className="hidden md:inline text-zinc-500 font-normal">// {page.tabName.split('. ')[1]}</span>
              </button>
            ))}
          </div>

          {/* Current Page Content Container */}
          <div className="p-6 sm:p-10 min-h-[520px]">
            <AnimatePresence mode="wait">
              
              {/* PAGE 1: EXECUTIVE IDENTITY, INDICES & CLINICAL THESIS */}
              {currentPage === 1 && (
                <motion.div
                  key="page-1"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-8"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#b8860b] uppercase tracking-wider block">
                        PAGE 01 // CORE TELEMETRY
                      </span>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                        Executive Identity, Sovereign Indices & Clinical Thesis
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 bg-[#b8860b]/10 border border-[#b8860b]/30 text-[#b8860b] text-[9px] font-mono uppercase font-bold shrink-0">
                      CASE_REF-849201 • DECLASSIFIED
                    </span>
                  </div>

                  {/* 4 Core Metrics Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-[#181818] border border-white/10 p-5 rounded-xs text-center">
                      <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                        Sovereign Index
                      </span>
                      <div className="text-3xl font-serif font-bold text-[#b8860b] my-1">
                        79.0%
                      </div>
                      <span className="text-[11px] text-zinc-400 font-serif italic block">
                        Apex Clarity with Coordination Latency
                      </span>
                    </div>

                    <div className="bg-[#181818] border border-white/10 p-5 rounded-xs text-center">
                      <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                        Metabolic Burn Rate
                      </span>
                      <div className="text-3xl font-serif font-bold text-white my-1">
                        70.0%
                      </div>
                      <span className="text-[11px] text-amber-400 font-serif italic block">
                        Personal Willpower Override Load
                      </span>
                    </div>

                    <div className="bg-[#181818] border border-white/10 p-5 rounded-xs text-center">
                      <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                        Signal Dilution Index
                      </span>
                      <div className="text-3xl font-serif font-bold text-rose-400 my-1">
                        100.0%
                      </div>
                      <span className="text-[11px] text-rose-300 font-serif italic block">
                        Critical Distortion below Tier 2
                      </span>
                    </div>

                    <div className="bg-[#181818] border border-white/10 p-5 rounded-xs text-center">
                      <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider block mb-1">
                        Longevity Half-Life
                      </span>
                      <div className="text-3xl font-serif font-bold text-emerald-400 my-1">
                        14 Mos
                      </div>
                      <span className="text-[11px] text-zinc-400 font-serif italic block">
                        Without Founder (Target: 60+ Mos)
                      </span>
                    </div>
                  </div>

                  {/* Clinical Thesis Statement */}
                  <div className="bg-[#151515] border-l-4 border-[#b8860b] p-6 sm:p-8 rounded-xs space-y-3">
                    <span className="text-[10px] font-mono uppercase font-bold text-[#b8860b] tracking-wider block">
                      Primary Clinical Diagnostic Thesis:
                    </span>
                    <p className="text-base sm:text-lg font-serif italic text-zinc-200 leading-relaxed">
                      &ldquo;The audited enterprise operates under the physics of a One-Mind Engine. The Principal's cognitive clarity is extraordinary (5.00/5.0), but intent currently acts as a manual override for the entire institution. The founder absorbs the metabolic cost of daily tactical execution with personal willpower rather than automating it through immutable organizational architecture. This imposes an estimated 35% drag on strategic velocity and introduces acute key-person vulnerability.&rdquo;
                    </p>
                    <div className="text-[11px] font-mono text-zinc-400 pt-2 border-t border-white/10 flex items-center justify-between">
                      <span>Forensic Auditor: Suchita Sancheti, Founder & Alignment Architect</span>
                      <span className="text-[#b8860b]">Status: Immediate Calibration Prescribed</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* PAGE 2: THE 5 SOVEREIGN DOMAINS */}
              {currentPage === 2 && (
                <motion.div
                  key="page-2"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#b8860b] uppercase tracking-wider block">
                        PAGE 02 // MULTIDIMENSIONAL VECTOR DIAGNOSTIC
                      </span>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                        The 5 Sovereign Domains Forensic Geometry
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 bg-white/5 border border-white/10 text-zinc-300 text-[9px] font-mono uppercase font-bold shrink-0">
                      5-AXIS RADAR CALCULATION
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Domain 01 */}
                    <div className="bg-[#161616] border border-[#b8860b]/50 p-5 rounded-xs space-y-2.5">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-xs font-mono font-bold text-[#b8860b] uppercase">01. Cognitive Clarity</span>
                          <span className="text-[9px] font-mono text-emerald-400 block font-bold">• SOVEREIGN ANCHOR (Founder Bandwidth)</span>
                        </div>
                        <span className="px-2 py-0.5 bg-[#b8860b] text-black font-mono font-bold text-xs rounded-xs">5.0 / 5.0</span>
                      </div>
                      <p className="text-xs text-zinc-300 font-serif leading-relaxed">
                        Absolute strategic vision at the top. The founder thinks in multi-million dollar moves with zero hesitation, but currently expends cognitive fuel approving operational minutiae.
                      </p>
                    </div>

                    {/* Domain 02 */}
                    <div className="bg-[#161616] border border-white/10 p-5 rounded-xs space-y-2.5">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-xs font-mono font-bold text-white uppercase">02. Systemic Integrity</span>
                          <span className="text-[9px] font-mono text-amber-400 block font-bold">• REFINEMENT VECTOR (Zero-Loss Delegation)</span>
                        </div>
                        <span className="px-2 py-0.5 bg-zinc-800 text-zinc-200 font-mono font-bold text-xs rounded-xs">3.67 / 5.0</span>
                      </div>
                      <p className="text-xs text-zinc-300 font-serif leading-relaxed">
                        The handoff friction gap. When projects are delegated, teams check in repeatedly or produce work that requires executive rework because decision rules are not codified.
                      </p>
                    </div>

                    {/* Domain 03 */}
                    <div className="bg-[#161616] border border-[#b8860b]/50 p-5 rounded-xs space-y-2.5">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-xs font-mono font-bold text-[#b8860b] uppercase">03. Strategic Velocity</span>
                          <span className="text-[9px] font-mono text-emerald-400 block font-bold">• HIGH PERFORMANCE (Speed to Market)</span>
                        </div>
                        <span className="px-2 py-0.5 bg-[#b8860b] text-black font-mono font-bold text-xs rounded-xs">4.0 / 5.0</span>
                      </div>
                      <p className="text-xs text-zinc-300 font-serif leading-relaxed">
                        Ability to spot and execute market opportunities. Executive instincts are rapid; middle management execution drags due to multi-layer approval dependencies.
                      </p>
                    </div>

                    {/* Domain 04 */}
                    <div className="bg-[#161616] border border-[#b8860b]/50 p-5 rounded-xs space-y-2.5">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-xs font-mono font-bold text-[#b8860b] uppercase">04. Moral Gravity</span>
                          <span className="text-[9px] font-mono text-emerald-400 block font-bold">• STABLE ANCHOR (Executive Conviction)</span>
                        </div>
                        <span className="px-2 py-0.5 bg-[#b8860b] text-black font-mono font-bold text-xs rounded-xs">4.0 / 5.0</span>
                      </div>
                      <p className="text-xs text-zinc-300 font-serif leading-relaxed">
                        Deep personal founder integrity and values. The mandate now is codifying this ethical spine into automated compliance gates across business units.
                      </p>
                    </div>

                    {/* Domain 05 */}
                    <div className="bg-[#161616] border border-rose-500/40 p-5 rounded-xs space-y-2.5 md:col-span-2 lg:col-span-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-xs font-mono font-bold text-rose-400 uppercase">05. Cultural Fidelity & Context Distribution</span>
                          <span className="text-[9px] font-mono text-rose-400 block font-bold">• CRITICAL SYSTEMIC BOTTLENECK (No-BS Transparency)</span>
                        </div>
                        <span className="px-2 py-0.5 bg-rose-500/20 text-rose-300 font-mono font-bold text-xs rounded-xs">3.0 / 5.0</span>
                      </div>
                      <p className="text-xs text-zinc-300 font-serif leading-relaxed">
                        The 'Silence of Compliance'—teams nod in meetings, then fail to act autonomously or sugarcoat friction. Frontline teams lack the reasoning parameters to execute without asking permission, leading to constant escalations to the CEO desk.
                      </p>
                    </div>
                  </div>

                  <div className="bg-black/60 p-4 border border-white/10 rounded-xs flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs font-mono gap-2">
                    <span className="text-zinc-300 font-bold">Executive Diagnostic Finding:</span>
                    <span className="text-[#b8860b]">A 2.0-point delta between Founder Clarity (5.0) and Team Communication (3.0) represents $1.4M+ in annual coordination drag.</span>
                  </div>
                </motion.div>
              )}

              {/* PAGE 3: OPERATIONAL LATENCY, BOTTLENECK FORENSICS & MEETING TAX */}
              {currentPage === 3 && (
                <motion.div
                  key="page-3"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#b8860b] uppercase tracking-wider block">
                        PAGE 03 // COORDINATION FRICTION AUDIT
                      </span>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                        Operational Latency, Escalation Density & Meeting Tax
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 bg-amber-400/10 border border-amber-400/30 text-amber-400 text-[9px] font-mono uppercase font-bold shrink-0">
                      ESCALATION DENSITY: 94/100 (CRITICAL)
                    </span>
                  </div>

                  {/* Signal Dilution Hierarchy Table */}
                  <div className="bg-[#151515] border border-white/10 rounded-xs overflow-hidden">
                    <div className="p-4 bg-black/60 border-b border-white/10 text-xs font-mono font-bold text-zinc-300 uppercase">
                      Signal Degradation by Organizational Hierarchy Level
                    </div>
                    <div className="divide-y divide-white/5 text-xs font-mono">
                      <div className="p-4 flex items-center justify-between">
                        <span className="text-white font-bold">Apex Executive Tier (Founder / CEO)</span>
                        <div className="flex items-center gap-4">
                          <span className="text-zinc-400 text-[11px]">100% Intent Clarity</span>
                          <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 font-bold text-[10px]">SOVEREIGN</span>
                        </div>
                      </div>
                      <div className="p-4 flex items-center justify-between bg-white/[0.02]">
                        <span className="text-zinc-300">Tier 1: Direct Reports & C-Suite</span>
                        <div className="flex items-center gap-4">
                          <span className="text-zinc-400 text-[11px]">82% Strategic Fidelity</span>
                          <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-300 text-[10px]">ALIGNED</span>
                        </div>
                      </div>
                      <div className="p-4 flex items-center justify-between">
                        <span className="text-zinc-300">Tier 2: Department Heads & VPs</span>
                        <div className="flex items-center gap-4">
                          <span className="text-amber-400 text-[11px]">58% Context Fidelity</span>
                          <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 text-[10px]">CONTEXT GAP</span>
                        </div>
                      </div>
                      <div className="p-4 flex items-center justify-between bg-white/[0.02]">
                        <span className="text-zinc-300">Tier 3: Frontline Execution Teams</span>
                        <div className="flex items-center gap-4">
                          <span className="text-rose-400 text-[11px]">34% Intent Fidelity</span>
                          <span className="px-2 py-0.5 bg-rose-500/20 text-rose-300 text-[10px]">TACTICAL NOISE</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Meeting Tax Breakdown */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-[#181818] border border-white/10 p-5 rounded-xs space-y-2">
                      <span className="text-[10px] font-mono uppercase text-zinc-400 block">Weekly Executive Meeting Load</span>
                      <div className="text-2xl font-serif font-bold text-white">18.5 Hours / Week</div>
                      <p className="text-xs text-zinc-400 font-serif italic">
                        Consumed by status checks, alignment reviews, and tactical clarification loops.
                      </p>
                    </div>
                    <div className="bg-[#181818] border border-emerald-500/30 p-5 rounded-xs space-y-2">
                      <span className="text-[10px] font-mono uppercase text-emerald-400 block">Reclaimable Bandwidth via Execution Protocols</span>
                      <div className="text-2xl font-serif font-bold text-emerald-400">+15.0 Hours / Week</div>
                      <p className="text-xs text-zinc-300 font-serif italic">
                        Liberated for pure strategic expansion, market offense, and uninhibited leadership vision.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* PAGE 4: EXECUTIVE COMMUNICATION & INTENT TRANSMISSION */}
              {currentPage === 4 && (
                <motion.div
                  key="page-4"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#b8860b] uppercase tracking-wider block">
                        PAGE 04 // EXECUTIVE TRANSMISSION PROFILE
                      </span>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                        Executive Communication & Strategic Intent Delivery
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 bg-white/5 border border-white/10 text-zinc-300 text-[9px] font-mono uppercase font-bold shrink-0">
                      LEADERSHIP ARCHETYPE: ORCHESTRATOR
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-[#181818] border border-white/10 p-5 rounded-xs space-y-2">
                      <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase block">LEADERSHIP ARCHETYPE</span>
                      <div className="text-xl font-serif font-bold text-white">The Orchestrator</div>
                      <p className="text-xs text-zinc-400 font-serif italic">
                        Commands through high conviction and immediate presence; direct reports rely heavily on live access.
                      </p>
                    </div>
                    <div className="bg-[#181818] border border-white/10 p-5 rounded-xs space-y-2">
                      <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase block">COMMAND-TO-CONTEXT RATIO</span>
                      <div className="text-xl font-serif font-bold text-[#b8860b]">80% Command / 20% Context</div>
                      <p className="text-xs text-zinc-400 font-serif italic">
                        Prescription: Shift to 60/40 to empower autonomous middle-tier decision authority.
                      </p>
                    </div>
                    <div className="bg-[#181818] border border-white/10 p-5 rounded-xs space-y-2">
                      <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase block">30-DAY SABBATICAL TEST</span>
                      <div className="text-xl font-serif font-bold text-rose-400">Current: At Risk</div>
                      <p className="text-xs text-zinc-400 font-serif italic">
                        Enterprise execution slows without founder presence. Target: 100% autonomous operation.
                      </p>
                    </div>
                  </div>

                  <div className="bg-[#151515] p-6 border border-white/10 rounded-xs space-y-3 font-serif">
                    <h4 className="text-sm font-bold text-white uppercase font-mono tracking-wider">Forensic Finding: Directive Gravitational Pull</h4>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic">
                      &ldquo;When directives are delivered with 80% command and 20% context, direct reports execute the immediate order but hesitate when unexpected edge cases arise. Installing clear decision guardrails converts implicit founder intuition into explicit operational rules that frontline teams execute with confidence.&rdquo;
                    </p>
                  </div>
                </motion.div>
              )}

              {/* PAGE 5: STRUCTURAL EXECUTION PROTOCOL INTERVENTION */}
              {currentPage === 5 && (
                <motion.div
                  key="page-5"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#b8860b] uppercase tracking-wider block">
                        PAGE 05 // SYSTEMIC INTERVENTION BLUEPRINT
                      </span>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                        Structural Execution Protocol Calibration & Decision Architecture
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 bg-[#b8860b]/10 border border-[#b8860b]/30 text-[#b8860b] text-[9px] font-mono uppercase font-bold shrink-0">
                      12 CODIFIED OPERATIONAL GATES
                    </span>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    {/* Gate Set 1 */}
                    <div className="bg-[#161616] border border-white/10 p-4 rounded-xs space-y-2">
                      <div className="flex justify-between items-center text-[#b8860b] font-bold">
                        <span>GATES 01–04 // AUTONOMOUS CAPITAL & RESOURCE ALLOCATION</span>
                        <span className="text-[10px] text-emerald-400">INSTALLED</span>
                      </div>
                      <p className="text-zinc-300 text-xs font-serif leading-relaxed">
                        Pre-authorized budget and initiative parameters up to $150,000 without requiring CEO signoff, provided 3 containment risk rules are satisfied. Eliminates 12 weekly approval bottlenecks.
                      </p>
                    </div>

                    {/* Gate Set 2 */}
                    <div className="bg-[#161616] border border-white/10 p-4 rounded-xs space-y-2">
                      <div className="flex justify-between items-center text-[#b8860b] font-bold">
                        <span>GATES 05–08 // STRICT ESCALATION FILTER ARCHITECTURE</span>
                        <span className="text-[10px] text-emerald-400">INSTALLED</span>
                      </div>
                      <p className="text-zinc-300 text-xs font-serif leading-relaxed">
                        Hard rules permitting escalation to the CEO desk only under 3 conditions: (1) Existential brand or legal risk, (2) Strategic budget variance over $250k, or (3) Core ethical violation. Cuts escalation density by 45%.
                      </p>
                    </div>

                    {/* Gate Set 3 */}
                    <div className="bg-[#161616] border border-white/10 p-4 rounded-xs space-y-2">
                      <div className="flex justify-between items-center text-[#b8860b] font-bold">
                        <span>GATES 09–12 // DISTRIBUTED STRATEGIC CONTEXT BROADCASTS</span>
                        <span className="text-[10px] text-emerald-400">INSTALLED</span>
                      </div>
                      <p className="text-zinc-300 text-xs font-serif leading-relaxed">
                        Automated weekly transmission of strategic priority rationales and decision logs. Zero-penalty error transparency protocol across all operating units. Lifts frontline intent fidelity from 34% to 85%.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* PAGE 6: 10-YEAR GENERATIONAL DECREE */}
              {currentPage === 6 && (
                <motion.div
                  key="page-6"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-[#b8860b] uppercase tracking-wider block">
                        PAGE 06 // INSTITUTIONAL PERPETUITY CHARTER
                      </span>
                      <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                        The 10-Year Sovereign Generational Decree
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[9px] font-mono uppercase font-bold shrink-0">
                      VALUATION HARDENING & DYNASTIC PERPETUITY
                    </span>
                  </div>

                  <div className="space-y-4 font-serif">
                    <div className="border-l-2 border-[#b8860b] pl-4 py-1.5 space-y-1">
                      <span className="text-[11px] font-mono font-bold text-white uppercase block">
                        YEAR 1: THE RECALIBRATION & BANDWIDTH LIBERATION
                      </span>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        Reduce Escalation Density by 40% via Contextual Governance Charters. Reclaim 15+ hours/week for the Principal. Pass the 30-Day Step-Away Sabbatical Test with zero operational degradation.
                      </p>
                    </div>

                    <div className="border-l-2 border-[#b8860b] pl-4 py-1.5 space-y-1">
                      <span className="text-[11px] font-mono font-bold text-white uppercase block">
                        YEARS 2–4: DISTRIBUTED OPERATIONAL INTELLIGENCE
                      </span>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        Elevate Cultural Fidelity to 4.8/5.0. Permanently eradicate defensive reporting. Empower C-Suite executives to execute high-stakes capital allocations with 100% of founder reasoning.
                      </p>
                    </div>

                    <div className="border-l-2 border-[#b8860b] pl-4 py-1.5 space-y-1">
                      <span className="text-[11px] font-mono font-bold text-white uppercase block">
                        YEARS 5–10: DYNASTIC PERPETUITY & VALUATION MULTIPLE EXPANSION
                      </span>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        Codify founder wisdom into immutable institutional governance. Permanently eliminate the key-person discount, commanding up to a 35% enterprise valuation premium during capital rounds or succession.
                      </p>
                    </div>
                  </div>

                  {/* Certified Seal Box */}
                  <div className="bg-[#151515] border border-[#b8860b]/40 p-5 rounded-xs flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
                    <div>
                      <span className="text-[#b8860b] font-bold uppercase block mb-1">
                        Validated Clinical Forensic Record // Certified by TULC
                      </span>
                      <span className="text-zinc-400 text-[11px]">
                        Suchita Sancheti, Founder & Alignment Architect • Case Artifact Ref #849201
                      </span>
                    </div>
                    <button
                      onClick={handlePrint}
                      className="px-4 py-2 bg-[#b8860b] text-black font-bold uppercase text-[10px] hover:bg-white transition-all cursor-pointer shrink-0"
                    >
                      Print Full 6 Pages →
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Bottom Action Footer Strip */}
          <div className="bg-black/95 px-6 py-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <Lock className="w-3.5 h-3.5 text-[#b8860b]" />
              <span>Complete Clinical Audit Artifact Available for Review</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className={`px-3 py-1.5 text-xs font-mono uppercase border rounded-xs transition-all ${currentPage === 1 ? 'border-white/5 text-zinc-600 cursor-not-allowed' : 'border-white/20 text-white hover:border-[#b8860b]'}`}
              >
                Previous Page
              </button>

              <button
                onClick={() => setCurrentPage(prev => Math.min(6, prev + 1))}
                disabled={currentPage === 6}
                className={`px-3 py-1.5 text-xs font-mono uppercase border rounded-xs transition-all ${currentPage === 6 ? 'border-white/5 text-zinc-600 cursor-not-allowed' : 'border-white/20 text-white hover:border-[#b8860b]'}`}
              >
                Next Page
              </button>

              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-[#1c1c1c] hover:bg-[#282828] text-white text-xs font-mono font-bold uppercase rounded-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <Maximize2 className="w-3.5 h-3.5 text-[#b8860b]" />
                <span>Full-Screen Modal</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-[#b8860b] hover:bg-white hover:text-black text-black text-xs font-mono font-bold uppercase rounded-xs transition-all flex items-center gap-2 cursor-pointer font-bold shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print PDF</span>
              </button>
            </div>
          </div>

        </div>
        )}

      </div>

      {/* FULL-SCREEN MODAL DOSSIER INSPECTOR */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="bg-[#FAF9F5] text-[#0A0A0A] max-w-5xl w-full max-h-[92vh] rounded-xs shadow-2xl overflow-hidden flex flex-col font-serif"
            >
              {/* Modal Topbar */}
              <div className="bg-[#111111] text-white px-6 py-4 flex items-center justify-between border-b border-white/10 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#b8860b] animate-pulse" />
                  <span className="text-[#b8860b] font-bold uppercase">DECLASSIFIED SOVEREIGN DOSSIER // COMPLETE CASE ARTIFACT</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePrint}
                    className="px-3.5 py-1.5 bg-[#b8860b] text-black font-bold uppercase text-[10px] flex items-center gap-1.5 hover:bg-white cursor-pointer transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Print Complete Dossier</span>
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-1.5 text-zinc-400 hover:text-white cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Modal Content Scroll Area - Showing all 6 full authentic pages */}
              <div className="overflow-y-auto p-6 sm:p-12 space-y-12 text-xs leading-relaxed text-[#111]">
                
                {/* PAGE 1 IN MODAL */}
                <div className="border-b-2 border-[#C5A021] pb-10">
                  <div className="text-center pb-6 border-b border-zinc-200">
                    <div className="inline-block font-mono text-[9px] font-bold text-[#8a6d1a] bg-[#C5A021]/10 px-3 py-1 border border-[#C5A021]/30 uppercase mb-2">
                      PAGE 1 OF 6 // EXECUTIVE IDENTIFICATION & CORE TELEMETRY INDICES
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold uppercase my-2">Sovereign Systemic Dossier</h1>
                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                      CASE_REF-849201 • PRINCIPAL: <span className="bg-black text-black px-2 py-0.5 rounded-xs select-none">[REDACTED]</span> [GROUP CEO] • ENTITY: <span className="bg-black text-black px-2 py-0.5 rounded-xs select-none">[REDACTED]</span> [CONGLOMERATE]
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
                    <div className="border border-zinc-200 bg-white p-3 text-center">
                      <span className="font-mono text-[9px] text-zinc-500 uppercase block">Sovereign Index</span>
                      <div className="text-xl font-bold text-[#C5A021]">79.0%</div>
                      <span className="text-[10px] text-zinc-500">Apex Sovereignty</span>
                    </div>
                    <div className="border border-zinc-200 bg-white p-3 text-center">
                      <span className="font-mono text-[9px] text-zinc-500 uppercase block">Metabolic Burn</span>
                      <div className="text-xl font-bold text-zinc-900">70.0%</div>
                      <span className="text-[10px] text-zinc-500">Manual Override Load</span>
                    </div>
                    <div className="border border-zinc-200 bg-white p-3 text-center">
                      <span className="font-mono text-[9px] text-zinc-500 uppercase block">Signal Dilution</span>
                      <div className="text-xl font-bold text-rose-700">100.0%</div>
                      <span className="text-[10px] text-zinc-500">Decay below Tier 2</span>
                    </div>
                    <div className="border border-zinc-200 bg-white p-3 text-center">
                      <span className="font-mono text-[9px] text-zinc-500 uppercase block">Longevity Half-Life</span>
                      <div className="text-xl font-bold text-emerald-700">14 Mos</div>
                      <span className="text-[10px] text-zinc-500">Without Founder</span>
                    </div>
                  </div>

                  <div className="bg-[#C5A021]/10 border-l-4 border-[#C5A021] p-4 italic text-zinc-800 my-4">
                    <strong>Core Clinical Thesis:</strong> &ldquo;The audited enterprise operates under the physics of a One-Mind Engine. The Principal absorbs the metabolic cost of daily execution with personal willpower rather than automating it through immutable organizational architecture. This imposes an estimated 35% drag on strategic velocity.&rdquo;
                  </div>
                </div>

                {/* PAGE 2 IN MODAL */}
                <div className="border-b-2 border-[#C5A021] pb-10">
                  <div className="flex justify-between items-center border-b border-black pb-2 mb-4">
                    <span className="font-bold text-sm uppercase">Page 02 // The 5 Sovereign Domains Forensic Matrix</span>
                    <span className="font-mono text-[10px] text-[#8a6d1a] font-bold">CALIB-02</span>
                  </div>
                  <p className="mb-4">
                    Cross-domain vector scoring reveals exceptional apex strength (5.00 Cognitive Clarity) paired with severe distribution friction (3.00 Cultural Fidelity). The 2.0-point delta creates the Authority Isolation Loop, where teams freeze until the founder reviews their output.
                  </p>
                </div>

                {/* PAGE 3 IN MODAL */}
                <div className="border-b-2 border-[#C5A021] pb-10">
                  <div className="flex justify-between items-center border-b border-black pb-2 mb-4">
                    <span className="font-bold text-sm uppercase">Page 03 // Operational Latency & Meeting Tax Audit</span>
                    <span className="font-mono text-[10px] text-[#8a6d1a] font-bold">CALIB-03</span>
                  </div>
                  <p className="mb-4">
                    Escalation Density is measured at 94/100 (Critical). The Principal spends 18.5 hours weekly in reactive alignment meetings. Installing automated execution protocols recovers 15+ hours weekly of deep strategic thinking time.
                  </p>
                </div>

                {/* PAGE 4 IN MODAL */}
                <div className="border-b-2 border-[#C5A021] pb-10">
                  <div className="flex justify-between items-center border-b border-black pb-2 mb-4">
                    <span className="font-bold text-sm uppercase">Page 04 // Directive Transmission & Leadership Delivery</span>
                    <span className="font-mono text-[10px] text-[#8a6d1a] font-bold">CALIB-04</span>
                  </div>
                  <p className="mb-4">
                    Leadership Archetype is diagnosed as &ldquo;The Orchestrator.&rdquo; Directives stand at 80% Command vs. 20% Contextual Reasoning. To enable zero-loss delegation, delivery must transition to 60% Command / 40% Context paired with codified decision charters.
                  </p>
                </div>

                {/* PAGE 5 IN MODAL */}
                <div className="border-b-2 border-[#C5A021] pb-10">
                  <div className="flex justify-between items-center border-b border-black pb-2 mb-4">
                    <span className="font-bold text-sm uppercase">Page 05 // Structural Execution Protocol Calibration (12 Gates)</span>
                    <span className="font-mono text-[10px] text-[#8a6d1a] font-bold">CALIB-05</span>
                  </div>
                  <p className="mb-4">
                    Installs 12 codified execution protocols: (1) Autonomous Capital Logic up to $150k, (2) Strict 3-Condition Escalation Filter to protect CEO calendar, and (3) Distributed Context Broadcasting to permanently eliminate defensive reporting.
                  </p>
                </div>

                {/* PAGE 6 IN MODAL */}
                <div>
                  <div className="flex justify-between items-center border-b border-black pb-2 mb-4">
                    <span className="font-bold text-sm uppercase">Page 06 // The 10-Year Generational Decree & Exit Valuation</span>
                    <span className="font-mono text-[10px] text-[#8a6d1a] font-bold">CALIB-06</span>
                  </div>
                  <p className="mb-4">
                    A multi-phase perpetuity charter: Year 1 eliminates 40% of escalation density; Years 2–4 establish distributed intelligence; Years 5–10 codify dynastic perpetuity, permanently removing the key-person discount to command up to a 35% enterprise valuation premium.
                  </p>
                </div>

                {/* Modal Footer Callout */}
                <div className="bg-[#111111] text-white p-6 rounded-xs flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div>
                    <div className="text-[#b8860b] font-mono font-bold text-xs uppercase mb-1">
                      Ready for Your Institutional Diagnosis?
                    </div>
                    <div className="text-zinc-300 text-xs font-serif">
                      Run the diagnostic assessment to extract your enterprise's sovereign systemic dossier.
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
                    Start Diagnostic Assessment →
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
