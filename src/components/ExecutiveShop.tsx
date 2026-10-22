import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Lock, 
  Eye, 
  ArrowLeft,
  Search,
  Hash,
  Award
} from 'lucide-react';

export interface ShopDocument {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  pages: number;
  format: string;
  category: 'Diagnostic Instrument' | 'Operating Architecture' | 'Governance & Speed' | 'Leadership Forensics' | 'Master Bundle';
  description: string;
  tableOfContents: string[];
  keyDeliverables: string[];
  sampleExcerpt: string;
  recommendedFor: string;
  investmentAnchor: string;
}

export const SHOP_DOCUMENTS: ShopDocument[] = [
  {
    id: 'sovereign-dossier-specimen',
    title: 'The Sovereign Dossier™ Patent-Pending Specification & Field Specimen',
    subtitle: 'The unsparing, PhD-level diagnostic instrument blueprint for high-consequence founders and boards.',
    badge: 'Flagship Document · Patent Pending',
    pages: 58,
    format: 'High-Fidelity PDF & LaTeX/Word Board Template',
    category: 'Diagnostic Instrument',
    investmentAnchor: '$950 USD · Institutional License',
    description: 'The definitive architectural documentation and redacted executive specimen of The Sovereign Dossier™. Includes the complete Anti-Gaming Audit algorithms, Vocal & Acoustic Telemetry protocols, Score-Narrative Parity Engine (Protocol C & D), Inquisitor Counter-Hypothesis matrix, and SHA-256 cryptographic verification hash specification.',
    tableOfContents: [
      'Section I: Cybernetic Enterprise Diagnostics & Founder Dependency Ratio',
      'Section II: Signal Refraction & Intent Fragmentation Telemetry',
      'Section III: Systemic Traps (Authority Loop, Consensus Trap, Ghost Command)',
      'Section IV: 5-Domain Architecture Benchmark (Cognitive Clarity to Moral Gravity)',
      'Section V: Anti-Gaming Audit & Semantic Substance Ratio Algorithms',
      'Section VI: Dual-Channel Acoustic Divergence & Vocal Prosody Standards',
      'Section VII: The Inquisitor Adversarial Counter-Hypothesis Engine',
      'Section VIII: Cryptographic SHA-256 System Verification Seal & Board Mandate Printout'
    ],
    keyDeliverables: [
      'Full 58-Page Annotated Dossier Architecture PDF',
      'Print-ready Boardroom Mandate with legal watermarks',
      'Cryptographic verification seal technical spec',
      'Redacted Fortune 500 founder field diagnostic case specimen'
    ],
    sampleExcerpt: '“The real cost of founder dependency is rarely revealed in quarterly EBITDA; it compounds silently in the Principal Dependency Ratio. When critical decisions stall pending apex intervention, enterprise valuation suffers an unhedged key-person discount of 22% to 40%.”',
    recommendedFor: 'Founders, Board Chairs, and Lead Independent Directors seeking institutional audit rigor.'
  },
  {
    id: 'founder-decoupling-blueprint',
    title: 'The Founder Decoupling Blueprint™ (Codified Protocol Manual)',
    subtitle: 'The operational handbook to systematically dismantle key-person reliance into autonomous institutional law.',
    badge: 'Executive Manual',
    pages: 44,
    format: 'Institutional PDF & Decoupling Charters',
    category: 'Operating Architecture',
    investmentAnchor: '$650 USD · Executive License',
    description: 'A relentless, step-by-step operational manual for transitioning an organization from founder dependency into perpetual, self-compounding sovereignty. Provides mathematical models for the Systemic Survival Index (30, 90, 365 days) and codifies 14-day asynchronous decision loops.',
    tableOfContents: [
      'Module 01: Auditing the Principal Dependency Ratio',
      'Module 02: Calculating the Systemic Survival Probability Index',
      'Module 03: The Authority Handover Charter: Ending Heroic Intervention',
      'Module 04: Engineering 14-Day Asynchronous Decision Loops',
      'Module 05: Replacing 70% of Synchronous Executive Committee Meetings',
      'Module 06: Building the Self-Compounding Institutional Cadence'
    ],
    keyDeliverables: [
      '44-Page Implementation Manual PDF',
      'Ready-to-ratify Authority Decoupling Charter',
      'Decision latency measurement templates',
      'Founder calendar insulation protocol'
    ],
    sampleExcerpt: '“Heroic intervention is an institutional vulnerability disguised as leadership virtue. Until execution standards are codified into sovereign decision thresholds, the founder remains the primary bottleneck to enterprise valuation.”',
    recommendedFor: 'Founders with $20M–$500M ARR aiming to scale or position for liquidity without operational collapse.'
  },
  {
    id: '5-domain-scorecard',
    title: 'The 5-Domain Architecture Benchmark & Executive Scorecard',
    subtitle: 'The quantitative evaluation kit for Cognitive Clarity, Cultural Fidelity, Strategic Velocity, Systemic Integrity, and Moral Gravity.',
    badge: 'Boardroom Kit',
    pages: 36,
    format: 'Executive PDF & Scoring Models',
    category: 'Operating Architecture',
    investmentAnchor: '$450 USD · Single Organization',
    description: 'Diagnose your executive suite across the 5 Immutable Core Domains. Maps leadership into objective Maturity Tiers (The Operator → The Guardian → The Architect → The Apex Sovereign) complete with valuation multiple expansion estimates.',
    tableOfContents: [
      'Part 1: The 5 Immutable Core Domains Framework',
      'Part 2: Cognitive Clarity: Bandwidth Defense & Focus Sovereignty',
      'Part 3: Cultural Fidelity: Distributed Intelligence vs. Silos',
      'Part 4: Strategic Velocity: Asymmetric Market Speed vs. Drag',
      'Part 5: Systemic Integrity: Flawless Zero-Latency Execution',
      'Part 6: Moral Gravity: Institutional Perpetuity vs. Reputational Decay',
      'Part 7: Valuation Multiple Expansion Matrix (1.8x – 4.2x Alpha)'
    ],
    keyDeliverables: [
      '36-Page Benchmark Guide PDF',
      'Executive Suite 5-Domain Self-Scoring Worksheet',
      'Valuation multiple expansion calculation table',
      'Board-ready maturity tier presentation template'
    ],
    sampleExcerpt: '“Enterprises do not decay from external competition; they decay from internal entropy. When Moral Gravity and Systemic Integrity diverge, short-term commercial expansion masks catastrophic structural vulnerability.”',
    recommendedFor: 'C-suite executives, Chief Operating Officers, and Private Equity Operating Partners.'
  },
  {
    id: 'boardroom-authority-matrix',
    title: 'The Boardroom Authority & Escalation Density Matrix',
    subtitle: 'Codified spending thresholds, veto frameworks, and decision handoff charters to eradicate consensus drag.',
    badge: 'Governance Standard',
    pages: 32,
    format: 'Institutional PDF & Delegated Charters',
    category: 'Governance & Speed',
    investmentAnchor: '$400 USD · Board License',
    description: 'Replaces defensive committee slide decks with explicit authority boundaries. Grants pre-ratified spending covenants ($50,000–$500,000+) and establishes clear escalation thresholds so senior executives move with sovereign conviction.',
    tableOfContents: [
      'Chapter 1: The Anatomy of Consensus Paralysis',
      'Chapter 2: Pre-Ratified Spending Covenants by C-Suite Tier',
      'Chapter 3: The Zero-Meeting Asynchronous Escalation Framework',
      'Chapter 4: Veto Boundaries & Sovereign Oversight Covenants',
      'Chapter 5: Board-to-CEO Mandate Resolution Protocol'
    ],
    keyDeliverables: [
      '32-Page Governance Protocol PDF',
      'Delegated Authority Schedule (Matrix Template)',
      'Escalation Density Audit Sheet',
      'Asynchronous Decision Resolution Guide'
    ],
    sampleExcerpt: '“When everyone must agree, no one takes ownership. True organizational velocity requires pre-ratified liability boundaries where executives possess unilateral execution rights within defined strategic envelopes.”',
    recommendedFor: 'Board Governance Committees, Enterprise General Counsels, and Chief of Staff offices.'
  },
  {
    id: 'anti-gaming-field-guide',
    title: 'The Anti-Gaming & Rhetorical Substance Field Guide',
    subtitle: 'Forensic methods to detect corporate evasions, audit semantic substance, and expose private uncertainty.',
    badge: 'Diagnostic Field Guide',
    pages: 28,
    format: 'Field Guide PDF & Executive Audit Guide',
    category: 'Leadership Forensics',
    investmentAnchor: '$350 USD · Executive Guide',
    description: 'High-status executives frequently game evaluations using rehearsed platitudes and performative modesty. This field guide provides the unvarnished Semantic Substance Ratio methodology, flags rhetorical evasions, and measures the Social Desirability Delta.',
    tableOfContents: [
      'Protocol 1: Calculating the Semantic Substance Ratio (0–100%)',
      'Protocol 2: Cataloging Rhetorical Evasions ("Moving the Needle", "Synergizing")',
      'Protocol 3: Measuring the Social Desirability Delta in C-Suite Interviews',
      'Protocol 4: Dwell-Time & Latency Behavioral Telemetry Indicators',
      'Protocol 5: Formulating the Inquisitor Counter-Hypothesis'
    ],
    keyDeliverables: [
      '28-Page Forensic Field Guide PDF',
      'The 25 Corporate Evasion Patterns & Counter-Probes',
      'Semantic Substance Scoring Guide',
      'Executive Cross-Examination Framework'
    ],
    sampleExcerpt: '“Performative modesty is often the most dangerous disguise for unaccountable leadership. By stripping corporate jargon down to measurable operational commitments, the organization restores intellectual honesty.”',
    recommendedFor: 'Nomination & Governance Committees, Executive Search Partners, and Advisory Chairs.'
  },
  {
    id: 'master-compendium-bundle',
    title: 'The Complete Sovereign Architecture Compendium (All 5 Publications)',
    subtitle: 'The comprehensive institutional repository: every manual, scorecard, governance matrix, and diagnostic blueprint.',
    badge: 'Institutional Master Bundle · Best Value',
    pages: 198,
    format: 'Complete 5-Volume PDF Suite + Editable Charters',
    category: 'Master Bundle',
    investmentAnchor: '$1,950 USD · Comprehensive Institutional Archive',
    description: 'The complete institutional archive of The Unbounded Leadership Co., authored by Suchita Sancheti. Includes all 5 foundational volumes, board mandate templates, diagnostic scoring matrices, and lifetime updates for your organization.',
    tableOfContents: [
      'Volume I: The Sovereign Dossier™ Patent-Pending Specification (58 Pages)',
      'Volume II: The Founder Decoupling Blueprint™ (44 Pages)',
      'Volume III: The 5-Domain Architecture Benchmark & Scorecard (36 Pages)',
      'Volume IV: The Boardroom Authority & Escalation Density Matrix (32 Pages)',
      'Volume V: The Anti-Gaming & Rhetorical Substance Field Guide (28 Pages)',
      'Master Appendix: Complete Boardroom Implementation Slides & Editable Templates'
    ],
    keyDeliverables: [
      'All 5 Institutional Volumes (198 Total Pages)',
      'Editable Word, PowerPoint, and LaTeX templates',
      'Priority access to future revisions and research dispatches',
      'Direct dispatch of formal cryptographically stamped archive'
    ],
    sampleExcerpt: '“To align human ambition with enduring organizational architecture — so that power, scale, and perpetuity compound as one, and what the world’s greatest founders build today commands the future long after they have conquered it.”',
    recommendedFor: 'Enterprise Boards, Sovereign Family Offices, and Private Equity Sponsors seeking comprehensive organizational transformation.'
  }
];

interface ExecutiveShopProps {
  onBackToHome: () => void;
  onExploreServices: () => void;
  onInquireDocument: (doc: ShopDocument) => void;
}

export const ExecutiveShop: React.FC<ExecutiveShopProps> = ({
  onBackToHome,
  onExploreServices,
  onInquireDocument
}) => {
  const [selectedDoc, setSelectedDoc] = useState<ShopDocument | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [downloadSuccessModal, setDownloadSuccessModal] = useState<ShopDocument | null>(null);

  const categories = ['All', 'Diagnostic Instrument', 'Operating Architecture', 'Governance & Speed', 'Leadership Forensics', 'Master Bundle'];

  const filteredDocs = SHOP_DOCUMENTS.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          doc.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSimulateInstantAcquisition = (doc: ShopDocument) => {
    setDownloadSuccessModal(doc);
  };

  return (
    <div className="min-h-screen bg-[#f8f6f0] text-[#17181c] py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1440px] mx-auto">
        
        {/* TOP NAVIGATION BREADCRUMB & BACK BUTTONS */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-8 border-b border-[#dfd7c8]">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-white hover:bg-[#ede5d6] text-[#17181c] text-xs font-bold uppercase rounded-sm border border-[#d8cebe] transition-colors cursor-pointer shadow-2xs"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#9d7b38]" />
              <span>← Back to Overview</span>
            </button>

            <button
              onClick={onExploreServices}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 bg-[#f0eade] hover:bg-[#e4ded0] text-[#555861] hover:text-[#17181c] text-xs font-mono font-bold rounded-sm border border-[#ded6c5] transition-colors cursor-pointer"
            >
              <span>View Advisory Services</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase text-[#9d7b38] font-bold">The Sovereign Executive Shop</span>
            <span className="text-xs text-[#9d7b38]">·</span>
            <span className="text-xs font-mono text-[#6b6e76] hidden md:inline">Instant PDF Publications & Governance Toolkits</span>
          </div>
        </div>

        {/* HERO BANNER — STRIKING BLACK BACKGROUND AS REQUIRED FOR HIGH-CONSEQUENCE ASSETS */}
        <div className="bg-black border-2 border-[#d4af37] rounded-xl p-6 sm:p-10 text-white shadow-2xl mb-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl relative z-10 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1c1d24] border border-[#d4af37]/60 rounded-full text-[11px] font-mono uppercase text-[#d4af37] font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Authoritative Institutional Publications & Forensic Templates</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold font-serif leading-tight tracking-tight text-white">
              The Sovereign Document & Field Toolkit Repository
            </h1>

            <p className="text-sm sm:text-base text-stone-300 font-serif leading-relaxed">
              Acquire the unvarnished manuals, diagnostic specifications, and board governance charters developed by <strong className="text-[#d4af37]">Suchita Sancheti</strong> for high-consequence founders and enterprise chairs. Sold as standalone digital extras with instant PDF delivery.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono text-stone-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                Institutional Copyright
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-[#d4af37]" />
                Encrypted Board PDF Delivery
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-[#d4af37]" />
                Includes Printable Charters & Formulas
              </span>
            </div>
          </div>
        </div>

        {/* CONTROLS BAR: CATEGORY FILTER & SEARCH */}
        <div className="bg-white border border-[#d8cebe] rounded-lg p-4 sm:p-5 shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Categories */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-mono font-bold rounded-sm transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#17181c] text-[#d4af37] shadow-xs'
                    : 'bg-[#faf8f5] text-[#4e5159] hover:bg-[#ede5d6] border border-[#e5decfe0]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#9d7b38] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter publications..."
              className="w-full pl-9 pr-3 py-2 text-xs font-mono bg-[#faf8f5] border border-[#d8cebe] rounded-sm focus:outline-hidden focus:border-[#9d7b38] text-[#17181c]"
            />
          </div>
        </div>

        {/* DOCUMENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredDocs.map((doc) => {
            const isMaster = doc.category === 'Master Bundle';
            return (
              <div
                key={doc.id}
                className={`rounded-xl border transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-xl ${
                  isMaster 
                    ? 'bg-black text-white border-2 border-[#d4af37] ring-1 ring-[#d4af37]/40' 
                    : 'bg-white text-[#17181c] border-[#d8cebe] hover:border-[#bda57b]'
                }`}
              >
                {/* Header Zone */}
                <div className="p-5 sm:p-6 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-xs ${
                      isMaster ? 'bg-[#d4af37] text-black' : 'bg-[#faf6ee] text-[#9d7b38] border border-[#ebdcc0]'
                    }`}>
                      {doc.badge}
                    </span>
                    <span className={`text-xs font-mono font-bold ${isMaster ? 'text-stone-300' : 'text-[#6b6e76]'}`}>
                      {doc.pages} Pages · {doc.format}
                    </span>
                  </div>

                  <h3 className={`text-lg sm:text-xl font-bold font-serif leading-snug ${isMaster ? 'text-white' : 'text-[#17181c]'}`}>
                    {doc.title}
                  </h3>

                  <p className={`text-xs font-serif leading-relaxed line-clamp-3 ${isMaster ? 'text-stone-300' : 'text-[#555861]'}`}>
                    {doc.description}
                  </p>

                  {/* Highlights */}
                  <div className={`p-3 rounded-md text-xs font-mono space-y-1.5 ${
                    isMaster ? 'bg-[#181920] border border-stone-800 text-stone-200' : 'bg-[#faf8f5] border border-[#ebe4d6] text-[#4e5159]'
                  }`}>
                    <div className="font-bold uppercase text-[10px] text-[#9d7b38]">Key Document Inclusions:</div>
                    <ul className="space-y-1">
                      {doc.keyDeliverables.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#9d7b38] shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Action Zone */}
                <div className={`p-4 sm:p-5 border-t flex flex-col gap-3 ${
                  isMaster ? 'border-stone-800 bg-[#121318]' : 'border-[#dfd7c8] bg-[#fcfaf7]'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-[#9d7b38] block font-bold">Investment</span>
                      <span className={`text-sm font-bold font-mono ${isMaster ? 'text-[#d4af37]' : 'text-[#17181c]'}`}>
                        {doc.investmentAnchor}
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedDoc(doc)}
                      className={`px-3 py-1.5 text-xs font-mono font-bold rounded-sm border transition-colors flex items-center gap-1 cursor-pointer ${
                        isMaster 
                          ? 'border-stone-700 text-stone-300 hover:text-white hover:bg-stone-800' 
                          : 'border-[#d8cebe] text-[#4e5159] hover:text-[#17181c] hover:bg-white'
                      }`}
                    >
                      <Eye className="w-3.5 h-3.5 text-[#9d7b38]" />
                      <span>Preview Specimen</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => handleSimulateInstantAcquisition(doc)}
                      className="w-full py-2.5 px-3 text-xs font-bold uppercase text-black bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#b8860b] hover:opacity-95 rounded-sm transition-all shadow-xs flex items-center justify-center gap-1.5 font-mono cursor-pointer active:scale-98"
                    >
                      <Download className="w-3.5 h-3.5 text-black" />
                      <span>Acquire PDF</span>
                    </button>

                    <button
                      onClick={() => onInquireDocument(doc)}
                      className={`w-full py-2.5 px-3 text-xs font-bold uppercase rounded-sm border transition-colors flex items-center justify-center gap-1 font-mono cursor-pointer ${
                        isMaster
                          ? 'bg-[#1e2029] text-white border-stone-700 hover:bg-[#282a36]'
                          : 'bg-[#17181c] text-white border-[#17181c] hover:bg-[#282a30]'
                      }`}
                    >
                      <span>Inquire / Invoice</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM GLOBAL BACK BUTTON ROW */}
        <div className="p-6 bg-white border border-[#d8cebe] rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div>
            <h4 className="text-base font-bold text-[#17181c]">Ready to discuss institutional architecture with Suchita Sancheti?</h4>
            <p className="text-xs text-[#555861] mt-0.5">Explore our comprehensive forensic audits, embedding tracks, and sovereign retainers.</p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onBackToHome}
              className="px-4 py-2.5 bg-[#faf8f5] hover:bg-[#ede5d6] text-[#17181c] border border-[#d8cebe] rounded-sm text-xs font-bold uppercase transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#9d7b38]" />
              <span>Return to Overview</span>
            </button>

            <button
              onClick={onExploreServices}
              className="px-5 py-2.5 bg-[#17181c] hover:bg-[#282a30] text-white rounded-sm text-xs font-bold uppercase transition-colors cursor-pointer flex items-center gap-1.5 font-mono"
            >
              <span>Explore Services</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#d4af37]" />
            </button>
          </div>
        </div>

      </div>

      {/* DOCUMENT PREVIEW MODAL */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#f8f6f0] border-2 border-[#9d7b38] rounded-xl max-w-3xl w-full p-5 sm:p-8 shadow-2xl relative max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 mb-4 border-b border-[#dfd7c8] shrink-0">
              <div>
                <span className="text-[11px] font-mono uppercase text-[#9d7b38] font-bold">
                  Publication Blueprint & Table of Contents
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#17181c] mt-0.5">
                  {selectedDoc.title}
                </h3>
                <div className="text-xs font-mono text-[#6b6e76] mt-1">
                  {selectedDoc.pages} Pages · {selectedDoc.format} · {selectedDoc.investmentAnchor}
                </div>
              </div>

              <button
                onClick={() => setSelectedDoc(null)}
                aria-label="Close Preview"
                className="p-1.5 text-[#6b6e76] hover:text-[#17181c] hover:bg-[#ede5d6] rounded transition-colors text-lg font-bold min-h-[38px] min-w-[38px] flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="space-y-4 overflow-y-auto pr-2 text-xs sm:text-sm text-[#33353a]">
              
              {/* Sample Excerpt */}
              <div className="p-4 rounded-md bg-black text-white border border-[#d4af37] space-y-2">
                <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-[#d4af37] font-bold">
                  <Sparkles className="w-3 h-3 text-[#d4af37]" />
                  <span>Representative Text Excerpt:</span>
                </div>
                <p className="italic font-serif leading-relaxed text-stone-200">
                  {selectedDoc.sampleExcerpt}
                </p>
                <div className="text-[10px] font-mono text-stone-400">
                  — Suchita Sancheti · Sovereign Enterprise Architecture
                </div>
              </div>

              {/* Table of Contents */}
              <div>
                <h4 className="text-xs font-bold uppercase text-[#9d7b38] font-mono mb-2">
                  Complete Table of Contents
                </h4>
                <div className="p-3 bg-white rounded border border-[#dfd7c8] space-y-1.5">
                  {selectedDoc.tableOfContents.map((chapter, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#26282e]">
                      <span className="font-mono text-[#9d7b38] font-bold">{String(idx + 1).padStart(2, '0')}.</span>
                      <span className="font-serif font-medium">{chapter}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Deliverables */}
              <div>
                <h4 className="text-xs font-bold uppercase text-[#9d7b38] font-mono mb-2">
                  What You Receive Upon Acquisition
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedDoc.keyDeliverables.map((item, idx) => (
                    <div key={idx} className="p-2.5 bg-white rounded border border-[#dfd7c8] flex items-center gap-2 text-xs font-medium text-[#17181c]">
                      <CheckCircle2 className="w-4 h-4 text-[#9d7b38] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Audience */}
              <div className="p-3 bg-[#f0eade] rounded border border-[#ded6c5] text-xs">
                <strong className="text-[#17181c] font-mono uppercase text-[11px] block mb-0.5">Recommended Executive Profile:</strong>
                <span className="text-[#4e5159] italic">{selectedDoc.recommendedFor}</span>
              </div>
            </div>

            {/* Modal Footer with BACK and ACQUIRE buttons */}
            <div className="mt-5 pt-4 border-t border-[#dfd7c8] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <button
                onClick={() => setSelectedDoc(null)}
                className="w-full sm:w-auto px-4 py-2.5 text-xs font-bold uppercase text-[#4e5159] hover:text-[#17181c] bg-white hover:bg-[#ede5d6] border border-[#d8cebe] rounded-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#9d7b38]" />
                <span>← Back to Document List</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => {
                    const doc = selectedDoc;
                    setSelectedDoc(null);
                    handleSimulateInstantAcquisition(doc);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold uppercase text-black bg-gradient-to-r from-[#d4af37] to-[#c5a059] hover:opacity-95 rounded-sm font-mono shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-black" />
                  <span>Acquire PDF ({selectedDoc.investmentAnchor.split('·')[0].trim()})</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* DOWNLOAD / INSTANT ACCESS MODAL */}
      {downloadSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-black border-2 border-[#d4af37] rounded-xl max-w-lg w-full p-6 sm:p-8 text-white shadow-2xl relative text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-[#d4af37]/20 border border-[#d4af37] flex items-center justify-center mx-auto text-[#d4af37]">
              <Sparkles className="w-6 h-6 text-[#d4af37]" />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-mono uppercase text-[#d4af37] font-bold tracking-widest">
                Instant PDF Dispatch Simulator
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                {downloadSuccessModal.title}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-stone-300 font-serif leading-relaxed">
              Your institutional release has been prepared with full SHA-256 verification seals and printable board mandate charters.
            </p>

            <div className="p-3 rounded bg-[#16171d] border border-stone-800 text-left font-mono text-xs space-y-1 text-stone-300">
              <div className="flex justify-between text-stone-400 text-[10px]">
                <span>ENCRYPTION:</span>
                <span className="text-[#d4af37]">SHA-256 SOVEREIGN AUDIT SEAL</span>
              </div>
              <div className="flex justify-between text-stone-400 text-[10px]">
                <span>PAGES:</span>
                <span className="text-white">{downloadSuccessModal.pages} Pages</span>
              </div>
              <div className="flex justify-between text-stone-400 text-[10px]">
                <span>FORMAT:</span>
                <span className="text-white">{downloadSuccessModal.format}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href="#download"
                onClick={(e) => {
                  e.preventDefault();
                  // Trigger browser download of sample data
                  const blob = new Blob([
                    `============================================================\n` +
                    `THE UNBOUNDED LEADERSHIP CO. · INSTITUTIONAL PUBLICATION\n` +
                    `Authored by Suchita Sancheti\n` +
                    `Document: ${downloadSuccessModal.title}\n` +
                    `Pages: ${downloadSuccessModal.pages}\n` +
                    `Category: ${downloadSuccessModal.category}\n` +
                    `============================================================\n\n` +
                    `VISION:\n` +
                    `"To align human ambition with enduring organizational architecture — so that power, scale, and perpetuity compound as one, and what the world's greatest founders build today commands the future long after they have conquered it."\n\n` +
                    `EXCERPT:\n` +
                    `${downloadSuccessModal.sampleExcerpt}\n\n` +
                    `TABLE OF CONTENTS:\n` +
                    downloadSuccessModal.tableOfContents.map((c, i) => `${i+1}. ${c}`).join('\n') + `\n\n` +
                    `KEY DELIVERABLES:\n` +
                    downloadSuccessModal.keyDeliverables.map(d => `- ${d}`).join('\n') + `\n\n` +
                    `SYSTEM VERIFICATION HASH: sha256_dossier_${Date.now().toString(16)}_sovereign_mandate\n`
                  ], { type: 'text/plain;charset=utf-8' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${downloadSuccessModal.id}-executive-specimen.txt`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="w-full py-3 px-4 text-xs font-bold uppercase text-black bg-gradient-to-r from-[#d4af37] via-[#e5c158] to-[#b8860b] hover:opacity-95 rounded-sm transition-all shadow-md flex items-center justify-center gap-2 font-mono"
              >
                <Download className="w-4 h-4 text-black" />
                <span>Download Sample Specimen (.TXT / Spec)</span>
              </a>

              <button
                onClick={() => {
                  const doc = downloadSuccessModal;
                  setDownloadSuccessModal(null);
                  onInquireDocument(doc);
                }}
                className="w-full py-2.5 px-4 text-xs font-bold uppercase text-white bg-[#1e2029] hover:bg-[#282a36] border border-stone-700 rounded-sm transition-colors font-mono cursor-pointer"
              >
                Request Official Institutional Invoice & Full PDF
              </button>
            </div>

            <div className="pt-2 border-t border-stone-800">
              <button
                onClick={() => setDownloadSuccessModal(null)}
                className="text-xs font-mono text-stone-400 hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5 mx-auto py-1"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>← Back to Repository</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
