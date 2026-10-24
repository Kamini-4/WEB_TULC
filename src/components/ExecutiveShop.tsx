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
  Award,
  CreditCard,
  DollarSign,
  Clock,
  Flame,
  Check,
  TrendingUp,
  Percent
} from 'lucide-react';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'CHF' | 'SGD' | 'AED';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rate: number; // multiplier relative to USD
}

export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar (USD)', rate: 1.0 },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro (EUR)', rate: 0.92 },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound (GBP)', rate: 0.79 },
  CHF: { code: 'CHF', symbol: 'CHF ', name: 'Swiss Franc (CHF)', rate: 0.88 },
  SGD: { code: 'SGD', symbol: 'S$ ', name: 'Singapore Dollar (SGD)', rate: 1.34 },
  AED: { code: 'AED', symbol: 'AED ', name: 'UAE Dirham (AED)', rate: 3.67 }
};

export interface CodexChoice {
  id: string;
  tierNumber: string;
  tierLabel: string;
  badge: string;
  isPopular?: boolean;
  title: string;
  subtitle: string;
  regularPriceUSD: number;
  earlyBirdPriceUSD: number;
  earlyBirdSpotsRemaining: number;
  pages: number;
  format: string;
  primaryBenefit: string;
  description: string;
  tableOfContents: string[];
  keyDeliverables: string[];
  sampleExcerpt: string;
  recommendedFor: string;
  valueEquivalent: string;
}

export interface ShopDocument {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  pages: number;
  format: string;
  priceFormatted: string;
  description: string;
}

export const CODEX_CHOICES: CodexChoice[] = [
  {
    id: 'founder-severance-filter',
    tierNumber: '01',
    tierLabel: 'ENTRY BLUEPRINT',
    badge: 'Quick Deploy · Under 100',
    title: 'The 72-Hour Founder Severance Protocol & Delegation Filter',
    subtitle: 'Tactical operational filter to eliminate routine approval bottlenecks under $5,000.',
    regularPriceUSD: 190,
    earlyBirdPriceUSD: 95,
    earlyBirdSpotsRemaining: 4,
    pages: 28,
    format: 'Executive Operational Guide & Delegated Signing Matrix',
    primaryBenefit: 'Eliminates 80% of routine micro-approval drag within 72 hours',
    description: 'Establishes mathematical signing ceilings and delegation guardrails. Empowers tier-2 department leads to make irreversible decisions under $5,000 with zero executive sign-off, freeing the principal from tactical firefighting.',
    tableOfContents: [
      'Module 1: The Anatomy of Founder Approval Bottlenecks',
      'Module 2: The Binary $5,000 Expenditure Signing Covenant',
      'Module 3: Type-1 vs Type-2 Reversible Decision Filters',
      'Module 4: The 72-Hour Silent Severance Team Audit',
      'Module 5: Emergency Escalation Trigger Protocol'
    ],
    keyDeliverables: [
      '28-Page Codified Operational Guide',
      'One-Page Executive Delegation Covenant',
      'Asynchronous Team Rollout Directive',
      'Pre-Ratified Authority Threshold Matrix'
    ],
    sampleExcerpt: '“If an executive must approve an expense under $5,000 or routine process adjustments, they have not built a leadership team — they have built an administrative bottleneck centered on their inbox.”',
    recommendedFor: 'Founders, Managing Partners, and COOs fielding 30+ daily operational requests.',
    valueEquivalent: 'Replaces $15,000 boutique operational efficiency audits.'
  },
  {
    id: 'sovereign-dossier-specimen',
    tierNumber: '02',
    tierLabel: 'FLAGSHIP INSTRUMENT',
    badge: 'Patent Pending · Most Selected',
    isPopular: true,
    title: 'The Sovereign Dossier™ Specification & Decoupling Blueprint',
    subtitle: 'The PhD-level diagnostic architecture and 30-day founder continuity runbook.',
    regularPriceUSD: 490,
    earlyBirdPriceUSD: 245,
    earlyBirdSpotsRemaining: 3,
    pages: 58,
    format: 'Boardroom Diagnostic Specification & Legal Mandate Engine',
    primaryBenefit: 'Codifies enterprise cybernetics & unlocks 2x–3x EBITDA valuation alpha',
    description: 'The definitive architectural documentation of The Sovereign Dossier™. Includes the Anti-Gaming Audit algorithms, Vocal Prosody Telemetry protocols, Score-Narrative Parity Engine (Protocol C & D), Inquisitor Counter-Hypothesis matrix, and print-ready Board Mandate templates.',
    tableOfContents: [
      'Section I: Cybernetic Enterprise Diagnostics & Founder Dependency Ratio',
      'Section II: Intent-to-Execution Refraction Index Telemetry',
      'Section III: Systemic Traps (Authority Loop, Consensus Trap, Ghost Command)',
      'Section IV: 5-Domain Architecture Benchmark (Cognitive Clarity to Moral Gravity)',
      'Section V: Anti-Gaming Audit & Semantic Substance Ratio Algorithms',
      'Section VI: Dual-Channel Acoustic Divergence & Vocal Prosody Standards',
      'Section VII: The Inquisitor Adversarial Counter-Hypothesis Engine',
      'Section VIII: Cryptographic SHA-256 System Verification Seal & Board Mandate'
    ],
    keyDeliverables: [
      '58-Page Annotated Dossier Architecture Release',
      'Print-ready Boardroom Mandate with legal watermarks',
      'Cryptographic verification seal technical spec',
      'Adversarial Inquisitor Counter-Hypothesis Template',
      'Complete 30-Day Decoupling Runbook & Red-Phone Protocol'
    ],
    sampleExcerpt: '“The Inquisitor section formulates the exact adversarial counter-thesis an activist investor, predator competitor, or dissident board faction would deploy against your current operating posture.”',
    recommendedFor: 'Founders approaching institutional capital raises, secondary sales, or board governance transitions.',
    valueEquivalent: 'Replaces $75,000 Big-4 Governance & Risk Consulting slide decks.'
  },
  {
    id: 'sovereign-master-archive',
    tierNumber: '03',
    tierLabel: 'COMPLETE INSTITUTIONAL ARCHIVE',
    badge: '5-Volume Suite · Maximum Value',
    title: 'The Sovereign Master Archive: 5-Volume Codex & Enterprise Vault',
    subtitle: 'The comprehensive institutional repository: every manual, scorecard, and board charter.',
    regularPriceUSD: 980,
    earlyBirdPriceUSD: 490,
    earlyBirdSpotsRemaining: 2,
    pages: 198,
    format: 'Complete 5-Volume Archive + Master Presentation Deck',
    primaryBenefit: 'Complete enterprise-wide governance suite with lifetime revisions',
    description: 'The complete institutional archive of The Unbounded Leadership Co., authored by Suchita Sancheti. Includes all 5 foundational volumes, board mandate templates, diagnostic scoring matrices, editable Word/LaTeX charters, and lifetime organizational updates.',
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
      'Direct dispatch of formal cryptographically stamped archive',
      '100% $490 Direct Financial Voucher toward any advisory retainer'
    ],
    sampleExcerpt: '“To align human ambition with enduring organizational architecture — so that power, scale, and perpetuity compound as one, and what the world’s greatest founders build today commands the future long after they have conquered it.”',
    recommendedFor: 'Enterprise Boards, Sovereign Family Offices, and Private Equity Sponsors seeking comprehensive organizational transformation.',
    valueEquivalent: 'Replaces $150,000+ McKinsey/Bain strategy and governance engagements.'
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
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('USD');
  const [selectedChoice, setSelectedChoice] = useState<CodexChoice | null>(null);
  const [downloadSuccessModal, setDownloadSuccessModal] = useState<CodexChoice | null>(null);

  const currency = CURRENCIES[selectedCurrency];

  const formatPrice = (usdAmount: number): string => {
    const converted = Math.round(usdAmount * currency.rate);
    return `${currency.symbol}${converted.toLocaleString()} ${currency.code}`;
  };

  const handleAcquireSpecimen = (choice: CodexChoice) => {
    setDownloadSuccessModal(choice);
  };

  const handleFormalRequisition = (choice: CodexChoice) => {
    const doc: ShopDocument = {
      id: choice.id,
      title: choice.title,
      subtitle: choice.subtitle,
      badge: choice.badge,
      pages: choice.pages,
      format: choice.format,
      priceFormatted: `${formatPrice(choice.earlyBirdPriceUSD)} (Early Bird Rate · 100% Retainer Credited)`,
      description: choice.description
    };
    onInquireDocument(doc);
  };

  return (
    <div className="min-h-screen bg-[#f8f6f0] text-[#17181c] py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1440px] mx-auto">
        
        {/* TOP NAVIGATION BREADCRUMB, CURRENCY SELECTOR & BACK BUTTON */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-6 border-b border-[#dfd7c8]">
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
              <span>View Services</span>
            </button>
          </div>

          {/* CURRENCY SELECTOR */}
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-sm border border-[#d8cebe] shadow-2xs">
            <span className="text-[11px] font-mono uppercase font-bold text-[#6b6e76] flex items-center gap-1">
              <DollarSign className="w-3 h-3 text-[#9d7b38]" />
              Currency:
            </span>
            <div className="flex items-center gap-1">
              {(Object.keys(CURRENCIES) as CurrencyCode[]).map((cur) => (
                <button
                  key={cur}
                  onClick={() => setSelectedCurrency(cur)}
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-xs font-bold transition-all cursor-pointer ${
                    selectedCurrency === cur
                      ? 'bg-[#17181c] text-[#d4af37] shadow-xs'
                      : 'text-[#555861] hover:bg-[#ede5d6] hover:text-[#17181c]'
                  }`}
                >
                  {cur}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* HERO BANNER — STRIKING BLACK & GOLD, SMALLER REFINED TITLE FONT */}
        <div className="bg-black border-2 border-[#d4af37] rounded-xl p-5 sm:p-7 md:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1c1d24] border border-[#d4af37]/60 rounded-full text-[10px] font-mono uppercase text-[#d4af37] font-bold">
              <Sparkles className="w-3 h-3 text-[#d4af37]" />
              <span>The Sovereign Codex · Executive Lead Funnel</span>
              <span className="text-[#888]">·</span>
              <span className="text-[#4ade80] flex items-center gap-1">
                <Flame className="w-3 h-3" /> Early Bird Allocation Active
              </span>
            </div>

            {/* Smaller font size for title as requested */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold leading-tight tracking-tight text-white">
              The Sovereign Codex & Field Toolkits
            </h1>

            <p className="text-xs sm:text-sm text-stone-300 font-serif leading-relaxed">
              Unvarnished diagnostic specifications, delegation covenants, and board governance charters authored by <strong className="text-[#d4af37]">Suchita Sancheti</strong> for high-consequence founders and enterprise chairs.
            </p>

            {/* VALUE FOR MONEY BANNER STRIP */}
            <div className="mt-3 p-3 bg-[#17181c] border border-[#d4af37]/40 rounded-sm flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-[#d4af37] font-bold">
                <Percent className="w-4 h-4" />
                <span>100% Value Offset Credit:</span>
                <span className="text-stone-300 font-normal">
                  Every dollar invested is 100% credited against your firm's Diagnostic Audit or Sovereign Retainer.
                </span>
              </div>
              <div className="text-[11px] font-mono text-[#4ade80] font-bold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Net $0 Implementation Cost Upon Retainer</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 CHOICES SIDE BY SIDE (3-COLUMN RESPONSIVE GRID) */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#9d7b38] font-bold block">
                SELECT OPERATIONAL ARCHITECTURE
              </span>
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#17181c]">
                Three Sovereign Choices · Side by Side
              </h2>
            </div>
            <span className="text-xs font-mono text-[#6b6e76] hidden sm:block">
              Showing active prices in {currency.name}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
            {CODEX_CHOICES.map((choice) => {
              const isPopular = choice.isPopular;

              return (
                <div
                  key={choice.id}
                  className={`bg-white rounded-lg border flex flex-col justify-between transition-all duration-300 relative shadow-sm hover:shadow-md ${
                    isPopular 
                      ? 'border-2 border-[#9d7b38] ring-4 ring-[#9d7b38]/10' 
                      : 'border-[#ded6c5] hover:border-[#9d7b38]/60'
                  }`}
                >
                  {/* Popular Flagship Badge */}
                  {isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#17181c] text-[#d4af37] border border-[#d4af37] text-[10px] font-mono uppercase font-bold tracking-wider px-3 py-0.5 rounded-full shadow-sm flex items-center gap-1 whitespace-nowrap">
                      <Sparkles className="w-3 h-3 text-[#d4af37]" />
                      <span>RECOMMENDED CORE CHOICE</span>
                    </div>
                  )}

                  <div className="p-5 sm:p-6 space-y-4">
                    {/* Header Row: Tier Number & Early Bird Badge */}
                    <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#9d7b38] bg-[#faf6ee] border border-[#ebdcc0] px-2 py-0.5 rounded-xs">
                          TIER {choice.tierNumber}
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#6b6e76] font-semibold">
                          {choice.tierLabel}
                        </span>
                      </div>
                      
                      {/* Early Bird Discount Pill */}
                      <span className="text-[10px] font-mono font-bold bg-[#ecfdf5] text-[#065f46] border border-[#a7f3d0] px-2 py-0.5 rounded-xs flex items-center gap-1">
                        <Flame className="w-3 h-3 text-[#059669]" />
                        50% OFF
                      </span>
                    </div>

                    {/* Product Title — Smaller font size as requested */}
                    <div>
                      <h3 className="text-base sm:text-lg font-serif font-bold text-[#17181c] leading-snug">
                        {choice.title}
                      </h3>
                      <p className="mt-1 text-xs text-[#555861] font-serif leading-relaxed">
                        {choice.subtitle}
                      </p>
                    </div>

                    {/* PRICING BLOCK: Crossed-Out Regular Price + Bold Early Bird Price */}
                    <div className="bg-[#faf8f4] border border-[#ebdcc0] rounded-md p-3.5 space-y-1.5">
                      <div className="flex items-baseline justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-[#78716c]">
                          Early Bird Rate:
                        </span>
                        <div className="text-right">
                          <span className="text-xs font-mono text-[#a8a29e] line-through mr-2">
                            {formatPrice(choice.regularPriceUSD)}
                          </span>
                          <span className="text-xl sm:text-2xl font-bold font-serif text-[#17181c]">
                            {formatPrice(choice.earlyBirdPriceUSD)}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono pt-1 border-t border-[#ebdcc0]/60">
                        <span className="text-[#059669] font-bold flex items-center gap-1">
                          <Check className="w-3 h-3" /> Save {formatPrice(choice.regularPriceUSD - choice.earlyBirdPriceUSD)}
                        </span>
                        <span className="text-[#b45309] font-bold flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {choice.earlyBirdSpotsRemaining} spots left
                        </span>
                      </div>
                    </div>

                    {/* Value-for-Money Hook */}
                    <div className="text-[11px] bg-[#f0ede6] border-l-2 border-[#9d7b38] px-2.5 py-1.5 text-[#374151]">
                      <strong className="text-[#17181c] font-bold block">100% Value Offset Credit:</strong>
                      <span>{formatPrice(choice.earlyBirdPriceUSD)} credited toward any future Diagnostic or Retainer.</span>
                    </div>

                    {/* Key Specs Row */}
                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#555861] pt-1">
                      <div className="border border-[#e7e1d4] p-1.5 rounded-xs bg-white">
                        <span className="text-[#888] block text-[9px]">VOLUME SPEC:</span>
                        <span className="font-bold text-[#17181c]">{choice.pages} Codified Pages</span>
                      </div>
                      <div className="border border-[#e7e1d4] p-1.5 rounded-xs bg-white">
                        <span className="text-[#888] block text-[9px]">CONSULTING PARITY:</span>
                        <span className="font-bold text-[#17181c] truncate block">{choice.valueEquivalent.split(' ')[1]} Value</span>
                      </div>
                    </div>

                    {/* Description Paragraph */}
                    <p className="text-xs text-[#4b5563] leading-relaxed pt-1">
                      {choice.description}
                    </p>

                    {/* Key Deliverables */}
                    <div className="space-y-1.5 pt-2">
                      <span className="text-[9px] font-mono uppercase tracking-wider text-[#9d7b38] font-bold block">
                        Included Deliverables:
                      </span>
                      <ul className="space-y-1 text-xs text-[#374151]">
                        {choice.keyDeliverables.slice(0, 3).map((item, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#9d7b38] shrink-0 mt-0.5" />
                            <span className="text-[11px] leading-snug">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Bottom CTA Actions */}
                  <div className="p-5 sm:p-6 pt-0 border-t border-[#f0ede6] mt-4 space-y-2.5">
                    <button
                      onClick={() => handleFormalRequisition(choice)}
                      className={`w-full py-2.5 px-4 text-xs font-bold uppercase rounded-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[0.98] ${
                        isPopular
                          ? 'bg-[#17181c] text-[#f8f6f0] hover:bg-[#2c2f38] border border-[#d4af37]/60'
                          : 'bg-[#17181c] text-white hover:bg-[#2c2f38]'
                      }`}
                    >
                      <CreditCard className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Instant Requisition · {formatPrice(choice.earlyBirdPriceUSD)}</span>
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setSelectedChoice(choice)}
                        className="py-1.5 px-2 bg-white hover:bg-[#f5f0e6] text-[#17181c] text-[10px] font-mono uppercase font-bold rounded-sm border border-[#d8cebe] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Eye className="w-3 h-3 text-[#9d7b38]" />
                        <span>Inspect Index</span>
                      </button>

                      <button
                        onClick={() => handleAcquireSpecimen(choice)}
                        className="py-1.5 px-2 bg-[#f0eade] hover:bg-[#e4ded0] text-[#17181c] text-[10px] font-mono uppercase font-bold rounded-sm border border-[#ded6c5] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Download className="w-3 h-3 text-[#9d7b38]" />
                        <span>Redacted Specimen</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* PROMINENT "VALUE FOR MONEY" EXECUTIVE BREAKDOWN SECTION */}
        <div className="bg-[#ffffff] border-2 border-[#ebdcc0] rounded-xl p-6 sm:p-8 md:p-10 shadow-md mb-12">
          <div className="max-w-3xl mb-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#9d7b38] font-bold mb-1">
              <TrendingUp className="w-4 h-4 text-[#9d7b38]" />
              <span>EMPIRICAL ROI CALCULATION</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#17181c]">
              Why The Codex is the Highest Value-for-Money Investment in Executive Governance
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-[#4b5563] font-serif leading-relaxed">
              We engineered The Sovereign Codex to serve as a high-intent lead funnel for enterprise leaders. Here is the rigorous mathematical calculation behind why this is an undeniable return on capital:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {/* Pillar 1 */}
            <div className="p-4 bg-[#faf8f4] border border-[#ebdcc0] rounded-md space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#17181c] text-[#d4af37] flex items-center justify-center text-xs font-mono font-bold">
                100%
              </div>
              <h3 className="text-sm font-bold text-[#17181c] font-serif">
                Net-Zero Advisory Offset
              </h3>
              <p className="text-xs text-[#555861] leading-relaxed">
                100% of your Codex acquisition fee is credited directly as a dollar-for-dollar financial deduction against any future Diagnostic Audit or Sovereign Retainer invoice.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="p-4 bg-[#faf8f4] border border-[#ebdcc0] rounded-md space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#17181c] text-[#d4af37] flex items-center justify-center text-xs font-mono font-bold">
                150x
              </div>
              <h3 className="text-sm font-bold text-[#17181c] font-serif">
                Consulting Cost Arbitrage
              </h3>
              <p className="text-xs text-[#555861] leading-relaxed">
                Traditional consulting firms bill $150,000–$300,000 to deploy junior associates who interview staff for 6 months. The Codex delivers unvarnished operational law immediately on Monday morning.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="p-4 bg-[#faf8f4] border border-[#ebdcc0] rounded-md space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#17181c] text-[#d4af37] flex items-center justify-center text-xs font-mono font-bold">
                $260k
              </div>
              <h3 className="text-sm font-bold text-[#17181c] font-serif">
                Founder Bandwidth ROI
              </h3>
              <p className="text-xs text-[#555861] leading-relaxed">
                Reclaiming just 5 hours of founder approval latency per week at an apex founder rate of $1,000/hour recovers <strong>$260,000/year</strong> in compounding sovereign executive focus.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="p-4 bg-[#faf8f4] border border-[#ebdcc0] rounded-md space-y-2">
              <div className="w-8 h-8 rounded-full bg-[#17181c] text-[#d4af37] flex items-center justify-center text-xs font-mono font-bold">
                ∞
              </div>
              <h3 className="text-sm font-bold text-[#17181c] font-serif">
                Permanent Firm Ownership
              </h3>
              <p className="text-xs text-[#555861] leading-relaxed">
                Zero recurring software subscriptions, zero per-seat fees. One-time acquisition grants your entire board and leadership suite perpetual enterprise duplication rights.
              </p>
            </div>
          </div>
        </div>

        {/* BOTTOM NAVIGATION BACK BUTTONS */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-[#dfd7c8]">
          <button
            onClick={onBackToHome}
            aria-label="Go back"
            title="Go back"
            className="p-2 -ml-2 rounded-full text-[#17181c] hover:text-[#9d7b38] hover:bg-[#ede5d6] transition-colors flex items-center justify-center cursor-pointer min-w-[36px] min-h-[36px]"
          >
            <ArrowLeft className="w-5 h-5 text-[#9d7b38]" />
          </button>

          <button
            onClick={onExploreServices}
            className="text-xs font-bold uppercase text-[#9d7b38] hover:text-[#7d5f24] transition-colors flex items-center gap-2 cursor-pointer py-1"
          >
            <span>Explore 3 Sovereign Services & Conclave →</span>
          </button>
        </div>

      </div>

      {/* MODAL 1: INSPECT INDEX & EXCERPT */}
      {selectedChoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border-2 border-[#9d7b38] rounded-lg max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 my-8 animate-in fade-in duration-200">
            <div className="flex items-start justify-between border-b border-[#dfd7c8] pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#9d7b38] font-bold">
                  ARCHITECTURAL INSPECTION · {selectedChoice.tierLabel}
                </span>
                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#17181c] mt-1">
                  {selectedChoice.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedChoice(null)}
                className="text-[#6b6e76] hover:text-[#17181c] text-xl font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              <div>
                <span className="text-xs font-mono uppercase text-[#6b6e76] font-bold block mb-1">
                  Verbatim Architectural Excerpt:
                </span>
                <blockquote className="p-3 bg-[#faf6ee] border-l-2 border-[#9d7b38] text-xs font-serif italic text-[#374151] leading-relaxed">
                  {selectedChoice.sampleExcerpt}
                </blockquote>
              </div>

              <div>
                <span className="text-xs font-mono uppercase text-[#6b6e76] font-bold block mb-2">
                  Codified Table of Contents ({selectedChoice.pages} Pages):
                </span>
                <ul className="space-y-1.5 text-xs text-[#374151]">
                  {selectedChoice.tableOfContents.map((ch, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-[#f8f6f0] p-2 rounded-xs">
                      <span className="font-mono text-[#9d7b38] font-bold shrink-0">{idx + 1}.</span>
                      <span>{ch}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-xs font-mono uppercase text-[#6b6e76] font-bold block mb-1">
                  Target Operating Posture:
                </span>
                <p className="text-xs text-[#555861]">
                  {selectedChoice.recommendedFor}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[#dfd7c8] flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-mono text-[#059669] font-bold">
                Early Bird: {formatPrice(selectedChoice.earlyBirdPriceUSD)} (100% Credited)
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedChoice(null)}
                  className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-[#17181c] text-xs font-bold uppercase rounded-sm cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const ch = selectedChoice;
                    setSelectedChoice(null);
                    handleFormalRequisition(ch);
                  }}
                  className="px-4 py-2 bg-[#17181c] hover:bg-[#2c2f38] text-white text-xs font-bold uppercase rounded-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <CreditCard className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Requisition Official Release</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: REDACTED SPECIMEN DOWNLOAD REVEAL */}
      {downloadSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white border-2 border-[#9d7b38] rounded-lg max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5 animate-in fade-in duration-200 text-center">
            <div className="w-12 h-12 bg-[#faf6ee] text-[#9d7b38] border-2 border-[#9d7b38] rounded-full flex items-center justify-center mx-auto">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase text-[#9d7b38] font-bold block mb-1">
                INSTITUTIONAL SPECIMEN DISPATCH
              </span>
              <h3 className="text-lg font-serif font-bold text-[#17181c]">
                Redacted Specimen Ready
              </h3>
              <p className="mt-1 text-xs text-[#555861] leading-relaxed">
                You have requested the redacted preview specimen for <strong className="text-[#17181c]">{downloadSuccessModal.title}</strong>.
              </p>
            </div>

            <div className="p-3 bg-[#faf8f4] border border-[#ebdcc0] rounded-sm text-left text-xs space-y-1">
              <div className="flex justify-between font-mono text-[10px]">
                <span className="text-[#888]">EARLY BIRD RATE:</span>
                <span className="font-bold text-[#059669]">{formatPrice(downloadSuccessModal.earlyBirdPriceUSD)}</span>
              </div>
              <div className="flex justify-between font-mono text-[10px]">
                <span className="text-[#888]">FULL VOLUME:</span>
                <span className="font-bold">{downloadSuccessModal.pages} Codified Pages</span>
              </div>
              <div className="flex justify-between font-mono text-[10px]">
                <span className="text-[#888]">RETAINER CREDIT:</span>
                <span className="font-bold text-[#9d7b38]">100% Value Offset Guaranteed</span>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  const ch = downloadSuccessModal;
                  setDownloadSuccessModal(null);
                  handleFormalRequisition(ch);
                }}
                className="w-full py-2.5 bg-[#17181c] hover:bg-[#2c2f38] text-white text-xs font-bold uppercase rounded-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <CreditCard className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>Requisition Full Unredacted Codex</span>
              </button>

              <button
                onClick={() => setDownloadSuccessModal(null)}
                className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-[#555861] text-xs font-bold uppercase rounded-sm cursor-pointer"
              >
                Close Specimen Viewer
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
