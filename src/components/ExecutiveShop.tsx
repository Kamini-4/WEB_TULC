import React from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  ArrowLeft,
  CreditCard,
  Percent
} from 'lucide-react';

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

export interface ToolkitItem {
  id: string;
  tierNumber: string;
  title: string;
  subtitle: string;
  priceUSD: number;
  bestFor: string;
  whatItFixes: string;
  deliverables: string[];
  isPopular?: boolean;
}

export const TOOLKITS: ToolkitItem[] = [
  {
    id: 'delegation-matrix',
    tierNumber: '01',
    title: 'The $5,000 Delegation Matrix',
    subtitle: 'Give managers pre-approved signing rights under $5,000 without asking you.',
    priceUSD: 95,
    bestFor: 'Founders answering daily approval messages for small purchases.',
    whatItFixes: 'Stops small decisions from piling up. Empowers leads to act immediately.',
    deliverables: [
      '1-Page Delegation Rulebook (Hand directly to managers)',
      'Reversible Decision Matrix (Defines what needs your sign-off)',
      'Emergency Escalation Protocol (Clear CEO boundaries)'
    ]
  },
  {
    id: 'execution-loop',
    tierNumber: '02',
    title: 'The 14-Day Autonomous Execution Loop',
    subtitle: 'Kill status update meetings with bi-weekly delivery commitments.',
    priceUSD: 145,
    bestFor: 'Teams trapped in endless check-in calls and circular debates.',
    whatItFixes: 'Removes weekly check-in meetings. 1 owner per outcome delivers on time.',
    deliverables: [
      'Meeting-Free 14-Day Delivery Sprint Template',
      'Asynchronous Weekly Check-In (Replaces live status calls)',
      'Single-Point Ownership Rubric (Zero shared committee excuses)'
    ],
    isPopular: true
  },
  {
    id: 'founder-decoupling-suite',
    tierNumber: '03',
    title: 'The Complete Founder Decoupling Suite',
    subtitle: 'The full system to make your business run smoothly when you take 30 days off.',
    priceUSD: 295,
    bestFor: 'Founders preparing for enterprise scale or board governance.',
    whatItFixes: 'Removes key-person risk. Delivery and sales close without your physical presence.',
    deliverables: [
      'Includes Both Toolkits 01 & 02 ($240 Value)',
      '30-Day Founder Absence Runbook',
      'C-Suite Governance Charter & Decision Rights Map',
      'Executive Compensation & Autonomous Authority Thresholds'
    ]
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
  const handleRequisition = (item: ToolkitItem) => {
    const doc: ShopDocument = {
      id: item.id,
      title: item.title,
      subtitle: item.subtitle,
      badge: `Tier ${item.tierNumber}`,
      pages: item.id === 'founder-decoupling-suite' ? 76 : item.id === 'execution-loop' ? 42 : 28,
      format: 'Instant Digital PDF & Notion Workspace',
      priceFormatted: `$${item.priceUSD} USD (100% Retainer Credited)`,
      description: item.whatItFixes
    };
    onInquireDocument(doc);
  };

  return (
    <div className="min-h-screen bg-[#f8f6f0] text-black py-4 sm:py-6 px-3 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
        
        {/* COMPACT TOP BAR & VALUE PROMISE */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#d8cebe]">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-black hover:text-[#9d7b38] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#9d7b38]" />
            <span>Back to Home</span>
          </button>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-white border border-[#d8cebe] rounded-xs text-[11px] text-black font-bold">
            <Percent className="w-3 h-3 text-[#9d7b38] shrink-0" />
            <span>100% Advisory Credit: Toolkit cost credited toward any future mandate</span>
          </div>

          <button
            onClick={onExploreServices}
            className="text-xs font-mono font-bold uppercase text-black hover:text-[#9d7b38] transition-colors cursor-pointer"
          >
            <span>View Services →</span>
          </button>
        </div>

        {/* ULTRA-COMPACT HEADER — DIRECT AND NO-NONSENSE */}
        <div className="text-center space-y-1">
          <h1 className="text-xl sm:text-3xl font-black text-black tracking-tight">
            Executive Toolkits & Delegation Systems
          </h1>
          <p className="text-xs sm:text-sm text-black font-normal max-w-2xl mx-auto">
            Ready-to-use delegation rules, decision templates, and meeting-free execution frameworks by <strong>Suchita Sancheti</strong>.
          </p>
        </div>

        {/* 3 RECTANGULAR TOOLKIT CARDS PLACED SIDE BY SIDE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 items-stretch">
          {TOOLKITS.map((item) => {
            const isPopular = item.isPopular;

            return (
              <div
                key={item.id}
                className={`bg-white rounded-lg flex flex-col justify-between transition-all duration-150 relative shadow-2xs hover:shadow-sm ${
                  isPopular 
                    ? 'border-2 border-black ring-2 ring-[#9d7b38]/20' 
                    : 'border-2 border-[#d8cebe] hover:border-black'
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-[#d4af37] text-[10px] font-mono uppercase font-black tracking-wider px-2.5 py-0.5 rounded-full shadow-2xs flex items-center gap-1 whitespace-nowrap">
                    <Sparkles className="w-2.5 h-2.5 text-[#d4af37]" />
                    <span>RECOMMENDED CHOICE</span>
                  </div>
                )}

                <div className="p-4 sm:p-5 space-y-3">
                  
                  {/* Header Row: Tier + Price */}
                  <div className="flex items-baseline justify-between border-b border-[#ebdcc0] pb-2">
                    <span className="text-[11px] font-mono font-black text-[#9d7b38] uppercase">
                      Toolkit 0{item.tierNumber}
                    </span>
                    <div className="text-right">
                      <span className="text-2xl sm:text-3xl font-black text-black">
                        ${item.priceUSD}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-600 block">
                        One-Time · Instant Access
                      </span>
                    </div>
                  </div>

                  {/* Title & Subtitle in Jet Black */}
                  <div className="space-y-0.5">
                    <h2 className="text-base sm:text-lg font-black text-black leading-snug">
                      {item.title}
                    </h2>
                    <p className="text-xs text-black font-normal leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Best For */}
                  <div className="p-2.5 bg-[#faf8f4] border border-[#e2d8c9] rounded-xs space-y-0.5">
                    <span className="text-[9.5px] font-mono uppercase text-[#9d7b38] font-black tracking-wider block">
                      Best For:
                    </span>
                    <p className="text-[11.5px] text-black font-medium leading-snug">
                      {item.bestFor}
                    </p>
                  </div>

                  {/* What's Inside Checklist */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-mono uppercase text-black font-black tracking-wider block">
                      What's Inside:
                    </span>
                    <ul className="space-y-1.5 text-xs text-black">
                      {item.deliverables.map((del, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#9d7b38] shrink-0 mt-0.5" />
                          <span className="text-black font-medium leading-snug">{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Bottom CTA Button */}
                <div className="p-4 sm:p-5 pt-0 mt-2 border-t border-[#f0ede6]">
                  <button
                    onClick={() => handleRequisition(item)}
                    className="w-full py-2.5 px-3 bg-black hover:bg-zinc-800 text-white font-black text-xs font-mono uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-98"
                  >
                    <CreditCard className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Get Instant Access · ${item.priceUSD}</span>
                  </button>
                  <span className="text-[10px] font-mono text-zinc-600 text-center block mt-1.5">
                    Printable PDF + Editable Templates
                  </span>
                </div>

              </div>
            );
          })}
        </div>

        {/* TIGHT COMPACT FAQ */}
        <div className="bg-white rounded-lg border-2 border-[#d8cebe] p-4 sm:p-5 shadow-2xs space-y-3">
          <h2 className="text-sm sm:text-base font-black text-black">
            Quick Answers
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-black">
            <div className="p-2.5 bg-[#faf8f4] rounded-xs border border-[#e2d8c9] space-y-1">
              <strong className="font-bold block">Instant Delivery:</strong>
              <p className="font-normal text-zinc-900 leading-relaxed">
                Download links for print-ready PDFs and editable templates (Google Docs & Notion) appear immediately upon checkout.
              </p>
            </div>

            <div className="p-2.5 bg-[#faf8f4] rounded-xs border border-[#e2d8c9] space-y-1">
              <strong className="font-bold block">100% Retainer Credit:</strong>
              <p className="font-normal text-zinc-900 leading-relaxed">
                Any amount invested in toolkits is 100% credited toward future advisory or diagnostic mandates with Suchita Sancheti.
              </p>
            </div>

            <div className="p-2.5 bg-[#faf8f4] rounded-xs border border-[#e2d8c9] space-y-1">
              <strong className="font-bold block">Need 1-on-1 Counsel?</strong>
              <p className="font-normal text-zinc-900 leading-relaxed">
                If you prefer Suchita to personally enter your boardroom and install these operating cadences, you can book an advisory retainer.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
