import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  ArrowLeft,
  CreditCard,
  Check,
  Percent,
  Clock
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
    subtitle: 'Give your managers instant permission to make decisions under $5,000 without asking you.',
    priceUSD: 95,
    bestFor: 'Founders spending hours every day answering Slack messages and approving routine purchases.',
    whatItFixes: 'Stops small decisions from piling up on your desk. Empowers department leads to act immediately without waiting for your sign-off.',
    deliverables: [
      '1-Page Delegation Rulebook (Print and hand to your managers)',
      'Reversible Decision Matrix (Defines what needs your sign-off and what doesn’t)',
      'Emergency Escalation Protocol (Explicit boundaries on when to alert the CEO)'
    ]
  },
  {
    id: 'execution-loop',
    tierNumber: '02',
    title: 'The 14-Day Autonomous Execution Loop',
    subtitle: 'Kill status update meetings and replace them with clear bi-weekly delivery commitments.',
    priceUSD: 145,
    bestFor: 'Leadership teams trapped in endless check-in calls, circular debates, and missed deadlines.',
    whatItFixes: 'Removes the need for weekly catch-up meetings. Assigns exactly 1 owner to each company outcome so delivery happens on time.',
    deliverables: [
      'Meeting-Free 14-Day Delivery Sprint Template',
      'Asynchronous Weekly Accountability Check-In (Replaces live status calls)',
      'Single-Point Ownership Rubric (Eliminates shared committee excuses)'
    ],
    isPopular: true
  },
  {
    id: 'founder-decoupling-suite',
    tierNumber: '03',
    title: 'The Complete Founder Decoupling Suite',
    subtitle: 'The full operating system to make your business run smoothly when you step away for 30 days.',
    priceUSD: 295,
    bestFor: 'Founders preparing for enterprise scale, board governance, or a clean future acquisition.',
    whatItFixes: 'Removes key-person dependency completely. Ensures client delivery, sales, and operations run flawlessly without your physical presence.',
    deliverables: [
      'Includes Both Toolkits 01 & 02 ($240 Value)',
      'The 30-Day Founder Absence Runbook (Stress-test your company without you)',
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
  const [purchasedItem, setPurchasedItem] = useState<ToolkitItem | null>(null);

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
    <div className="min-h-screen bg-[#f8f6f0] text-black py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
        
        {/* TOP NAVIGATION BREADCRUMB */}
        <div className="flex items-center justify-between pb-4 border-b border-[#d8cebe]">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase text-black hover:text-[#9d7b38] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#9d7b38]" />
            <span>Back to Home</span>
          </button>

          <button
            onClick={onExploreServices}
            className="text-xs font-mono font-bold uppercase text-black hover:text-[#9d7b38] transition-colors cursor-pointer"
          >
            <span>View Advisory Services →</span>
          </button>
        </div>

        {/* STRATEGIC HEADER: OVERLY SIMPLIFIED, GENEROUS SPACING, JET BLACK TEXT */}
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-[#d4af37] text-xs font-mono uppercase font-bold rounded-xs tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Turnkey Founder Toolkits</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black tracking-tight leading-tight">
            Stop answering daily questions.
          </h1>

          <p className="text-base sm:text-lg text-black font-normal leading-relaxed max-w-2xl mx-auto">
            Ready-to-use delegation rules, decision templates, and meeting-free execution frameworks authored by <strong>Suchita Sancheti</strong> to run your business without you.
          </p>

          {/* 100% Credit Guarantee Banner */}
          <div className="p-3.5 bg-white border-2 border-[#d8cebe] rounded-lg inline-flex items-center gap-2 text-xs text-black font-bold shadow-xs">
            <Percent className="w-4 h-4 text-[#9d7b38] shrink-0" />
            <span>100% Advisory Credit: Every dollar spent on toolkits is credited toward your future advisory mandate.</span>
          </div>
        </div>

        {/* 3 TOOLKIT CARDS: STRATEGIC, SPACIOUS, JET BLACK TYPOGRAPHY */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 sm:gap-8 items-stretch">
          {TOOLKITS.map((item) => {
            const isPopular = item.isPopular;

            return (
              <div
                key={item.id}
                className={`bg-white rounded-xl flex flex-col justify-between transition-all duration-200 relative shadow-sm hover:shadow-md ${
                  isPopular 
                    ? 'border-3 border-black ring-4 ring-[#9d7b38]/15' 
                    : 'border-2 border-[#d8cebe] hover:border-black'
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-black text-[#d4af37] text-xs font-mono uppercase font-black tracking-wider px-3 py-0.5 rounded-full shadow-sm flex items-center gap-1.5 whitespace-nowrap">
                    <Sparkles className="w-3 h-3 text-[#d4af37]" />
                    <span>MOST POPULAR CHOICE</span>
                  </div>
                )}

                <div className="p-6 sm:p-8 space-y-5">
                  
                  {/* Tier Number & Price */}
                  <div className="flex items-baseline justify-between border-b border-[#ebdcc0] pb-4">
                    <span className="text-xs font-mono font-black text-[#9d7b38] uppercase tracking-wider">
                      Toolkit 0{item.tierNumber}
                    </span>
                    <div className="text-right">
                      <span className="text-3xl sm:text-4xl font-black text-black">
                        ${item.priceUSD}
                      </span>
                      <span className="text-xs font-mono text-zinc-600 block">
                        One-Time · Instant Access
                      </span>
                    </div>
                  </div>

                  {/* Title & Subtitle in Jet Black */}
                  <div className="space-y-1.5">
                    <h2 className="text-xl sm:text-2xl font-black text-black leading-snug">
                      {item.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-black font-normal leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Best For Box in Jet Black */}
                  <div className="p-3.5 bg-[#faf8f4] border border-[#e2d8c9] rounded-md space-y-1">
                    <span className="text-[10px] font-mono uppercase text-[#9d7b38] font-black tracking-wider block">
                      Best For:
                    </span>
                    <p className="text-xs text-black font-medium leading-relaxed">
                      {item.bestFor}
                    </p>
                  </div>

                  {/* What's Inside Checklist in Jet Black */}
                  <div className="space-y-2 pt-2">
                    <span className="text-xs font-mono uppercase text-black font-black tracking-wider block">
                      What's Inside:
                    </span>
                    <ul className="space-y-2 text-xs sm:text-sm text-black">
                      {item.deliverables.map((del, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-[#9d7b38] shrink-0 mt-0.5" />
                          <span className="text-black font-medium leading-snug">{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Bottom CTA Button */}
                <div className="p-6 sm:p-8 pt-0 mt-4 border-t border-[#f0ede6]">
                  <button
                    onClick={() => handleRequisition(item)}
                    className="w-full py-3.5 px-4 bg-black hover:bg-zinc-800 text-white font-black text-xs font-mono uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98"
                  >
                    <CreditCard className="w-4 h-4 text-[#d4af37]" />
                    <span>Get Instant Access · ${item.priceUSD}</span>
                  </button>
                  <span className="text-[11px] font-mono text-zinc-600 text-center block mt-2">
                    Printable PDF + Editable Templates
                  </span>
                </div>

              </div>
            );
          })}
        </div>

        {/* OVERLY SIMPLIFIED FAQ & REASSURANCE IN JET BLACK */}
        <div className="bg-white rounded-xl border-2 border-[#d8cebe] p-7 sm:p-10 shadow-sm max-w-4xl mx-auto space-y-6">
          <h2 className="text-xl sm:text-2xl font-black text-black">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4 divide-y divide-[#ebdcc0]">
            
            <div className="pt-4 first:pt-0 space-y-1">
              <h3 className="text-base font-bold text-black">
                How do I get access after purchasing?
              </h3>
              <p className="text-xs sm:text-sm text-black leading-relaxed font-normal">
                You receive instant download links for print-ready PDFs and editable templates (Google Docs & Notion) immediately upon checkout. You can hand them to your leadership team in 5 minutes.
              </p>
            </div>

            <div className="pt-4 space-y-1">
              <h3 className="text-base font-bold text-black">
                How does the 100% Advisory Credit work?
              </h3>
              <p className="text-xs sm:text-sm text-black leading-relaxed font-normal">
                Every dollar you spend on these toolkits is fully credited toward an advisory mandate or forensic diagnostic with Suchita Sancheti within 12 months.
              </p>
            </div>

            <div className="pt-4 space-y-1">
              <h3 className="text-base font-bold text-black">
                Can I get 1-on-1 implementation help?
              </h3>
              <p className="text-xs sm:text-sm text-black leading-relaxed font-normal">
                Yes. If you prefer Suchita Sancheti to personally enter your boardroom and install these operating cadences for you, you can book an in-camera advisory consultation.
              </p>
            </div>

          </div>
        </div>

        {/* BOTTOM INVITATION BAR */}
        <div className="text-center space-y-3 pt-4">
          <p className="text-sm text-black font-bold">
            Need bespoke boardroom counsel instead of templates?
          </p>
          <button
            onClick={onExploreServices}
            className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white hover:bg-zinc-800 text-xs font-mono uppercase font-bold tracking-wider rounded-xs transition-colors cursor-pointer"
          >
            <span>Explore 3 Advisory Partnerships</span>
            <ArrowRight className="w-4 h-4 text-[#d4af37]" />
          </button>
        </div>

      </div>
    </div>
  );
};
