import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowLeft,
  CreditCard,
  Percent,
  Sparkles,
} from 'lucide-react';
import { PaymentModal, PaymentItem } from './payment/PaymentModal';
import { formatExactAmount } from '../utils/pricing';

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
  formulaNote: string;
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
    priceUSD: 98.40,
    formulaNote: '$41.20 Rulebook + $32.80 Matrix + $24.40 Protocol',
    bestFor: 'Founders answering daily approval messages for small purchases.',
    whatItFixes: 'Stops small decisions from piling up. Empowers leads to act immediately.',
    deliverables: [
      '1-Page Delegation Rulebook ($41.20 value)',
      'Reversible Decision Matrix ($32.80 value)',
      'Emergency Escalation Protocol ($24.40 value)',
    ],
  },
  {
    id: 'execution-loop',
    tierNumber: '02',
    title: 'The 14-Day Autonomous Execution Loop',
    subtitle: 'Eliminate status update meetings with bi-weekly delivery commitments.',
    priceUSD: 146.80,
    formulaNote: '$59.40 Sprint Spec + $48.20 Async Rhythm + $39.20 Rubric',
    bestFor: 'Teams trapped in endless check-in calls and circular debates.',
    whatItFixes: 'Removes weekly check-in meetings. One owner per outcome delivers on time.',
    deliverables: [
      'Meeting-Free 14-Day Delivery Sprint Template ($59.40 value)',
      'Asynchronous Weekly Check-In Protocol ($48.20 value)',
      'Single-Point Ownership Rubric ($39.20 value)',
    ],
    isPopular: true,
  },
  {
    id: 'founder-decoupling-suite',
    tierNumber: '03',
    title: 'The Complete Founder Decoupling Suite',
    subtitle: 'The complete architecture so operations compound across a 30-day absence.',
    priceUSD: 292.80,
    formulaNote: '$119.60 Runbook + $98.40 Charter + $74.80 Comp Map',
    bestFor: 'Founders preparing for enterprise scale or board governance.',
    whatItFixes: 'Removes key-person risk. Delivery and sales close without your physical presence.',
    deliverables: [
      '30-Day Founder Absence Runbook ($119.60 value)',
      'C-Suite Governance Charter & Decision Map ($98.40 value)',
      'Executive Compensation & Authority Thresholds ($74.80 value)',
    ],
  },
];

const BUNDLE_INDIVIDUAL_SUM = 98.40 + 146.80 + 292.80; // $538.00 exact
const BUNDLE_DISCOUNT_AMOUNT = Number((BUNDLE_INDIVIDUAL_SUM * 0.25).toFixed(2)); // $134.50 exact
const BUNDLE_FINAL_PRICE = Number((BUNDLE_INDIVIDUAL_SUM - BUNDLE_DISCOUNT_AMOUNT).toFixed(2)); // $403.50 exact

interface ExecutiveShopProps {
  onBackToHome: () => void;
  onExploreServices: () => void;
  onInquireDocument: (doc: ShopDocument) => void;
}

export const ExecutiveShop: React.FC<ExecutiveShopProps> = ({
  onBackToHome,
  onExploreServices,
}) => {
  const [activePaymentItem, setActivePaymentItem] = useState<PaymentItem | null>(null);

  const handleRequisition = (item: ToolkitItem) => {
    setActivePaymentItem({
      id: item.id,
      title: item.title,
      subtitle: `${item.subtitle} (${item.formulaNote})`,
      priceUSD: item.priceUSD,
      category: 'toolkit',
      deliverables: item.deliverables,
    });
  };

  const handleBuyAllBundle = () => {
    setActivePaymentItem({
      id: 'complete-executive-bundle',
      title: 'The Complete 3-Toolkit Sovereign Suite',
      subtitle: `All 3 Toolkits: ${formatExactAmount(BUNDLE_INDIVIDUAL_SUM)} total value less 25.00% bundle deduction (${formatExactAmount(BUNDLE_DISCOUNT_AMOUNT)} saved)`,
      priceUSD: BUNDLE_FINAL_PRICE,
      category: 'toolkit',
      deliverables: [
        `Toolkit 01: The $5,000 Delegation Matrix (${formatExactAmount(98.40)})`,
        `Toolkit 02: The 14-Day Autonomous Execution Loop (${formatExactAmount(146.80)})`,
        `Toolkit 03: Complete Founder Decoupling Suite (${formatExactAmount(292.80)})`,
        `Exact 25.00% Bundle Credit Applied: -${formatExactAmount(BUNDLE_DISCOUNT_AMOUNT)}`,
      ],
    });
  };

  return (
    <div className="min-h-screen bg-[#f8f6f0] text-[#17181c] py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Top Utility Strip */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#d8cebe]">
          <button
            type="button"
            onClick={onBackToHome}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-[#17181c] hover:text-[#9d7b38] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#9d7b38]" />
            <span>Back to Overview</span>
          </button>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#141416] border border-[#d4af37]/60 rounded-xs text-[11px] font-mono text-[#d4af37] font-bold">
            <Percent className="w-3 h-3 text-[#d4af37] shrink-0" />
            <span>100.00% Advisory Credit: Every Dollar Credited Toward Future Mandates</span>
          </div>

          <button
            type="button"
            onClick={onExploreServices}
            className="text-xs font-mono font-bold uppercase text-[#9d7b38] hover:text-[#17181c] transition-colors cursor-pointer"
          >
            <span>Explore Services →</span>
          </button>
        </div>

        {/* Header */}
        <div className="text-center space-y-1.5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-[#9d7b38] font-bold block">
            Itemized Systems Pricing · Zero Rounded Estimates
          </span>
          <h1 className="text-2xl sm:text-4xl font-bold font-serif text-[#17181c] tracking-tight">
            Executive Toolkits & <span className="text-[#9d7b38]">Delegation Systems</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#4e5159] max-w-2xl mx-auto">
            Ready-to-deploy delegation rules, decision templates, and meeting-free execution frameworks engineered by{' '}
            <strong className="text-[#9d7b38] font-bold">Suchita Sancheti</strong>. Priced directly to the cent by deliverable.
          </p>
        </div>

        {/* 3 Toolkit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {TOOLKITS.map((item) => {
            const isPopular = item.isPopular;

            return (
              <div
                key={item.id}
                className={`bg-white rounded-md flex flex-col justify-between transition-all duration-150 relative shadow-2xs ${
                  isPopular
                    ? 'border-2 border-[#17181c] ring-1 ring-[#d4af37]/50'
                    : 'border border-[#d8cebe] hover:border-[#9d7b38]'
                }`}
              >
                {isPopular && (
                  <div className="bg-[#17181c] text-[#d4af37] text-[10px] font-mono uppercase font-black tracking-wider px-4 py-1.5 rounded-t-sm flex items-center justify-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#d4af37]" />
                    <span>HIGHEST-VELOCITY SELECTION</span>
                  </div>
                )}

                <div className="p-5 space-y-3.5">
                  <div className="flex items-start justify-between border-b border-[#ebdcc0] pb-3 gap-2">
                    <div>
                      <span className="text-[11px] font-mono font-black text-[#9d7b38] uppercase block">
                        Toolkit {item.tierNumber}
                      </span>
                      <span className="text-[10px] font-mono text-[#6b6e76] block mt-0.5">
                        {item.formulaNote}
                      </span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-2xl sm:text-3xl font-black text-[#9d7b38] tabular-nums">
                        {formatExactAmount(item.priceUSD)}
                      </span>
                      <span className="text-[10px] font-mono text-[#6b6e76] block">
                        USD · Exact Fee
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h2 className="text-lg font-bold font-serif text-[#17181c] leading-snug">
                      {item.title}
                    </h2>
                    <p className="text-xs text-[#4e5159] leading-relaxed">{item.subtitle}</p>
                  </div>

                  <div className="p-3 bg-[#faf8f4] border border-[#e2d8c9] rounded-xs space-y-0.5">
                    <span className="text-[10px] font-mono uppercase text-[#9d7b38] font-bold tracking-wider block">
                      Best For
                    </span>
                    <p className="text-xs text-[#17181c] font-medium leading-snug">
                      {item.bestFor}
                    </p>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-mono uppercase text-[#9d7b38] font-bold tracking-wider block">
                      Itemized Deliverables
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#17181c]">
                      {item.deliverables.map((del, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#9d7b38] shrink-0 mt-0.5" />
                          <span className="font-medium leading-snug">{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-5 pt-3 border-t border-[#f0ede6]">
                  <button
                    type="button"
                    onClick={() => handleRequisition(item)}
                    className="w-full py-2.5 px-3 bg-[#17181c] hover:bg-[#282a30] text-[#f8f6f0] font-bold text-xs font-mono uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <CreditCard className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Acquire Now · {formatExactAmount(item.priceUSD)}</span>
                  </button>
                  <span className="text-[10px] font-mono text-[#6b6e76] text-center block mt-1.5">
                    Server computes exact currency & GST breakdown
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Complete Bundle Strip — Exact 25.00% Sum Calculation */}
        <div className="p-5 sm:p-6 rounded-md bg-[#141416] border border-[#d4af37] text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase text-[#d4af37] font-bold">
              <Sparkles className="w-3 h-3 text-[#d4af37]" />
              <span>Exact 25.00% Bundle Calculation · Save {formatExactAmount(BUNDLE_DISCOUNT_AMOUNT)}</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold font-serif text-[#f4ecd8]">
              Complete 3-Toolkit Sovereign Suite: {formatExactAmount(BUNDLE_FINAL_PRICE)} USD
            </h3>
            <p className="text-xs text-zinc-300 max-w-2xl font-mono">
              Exact Sum: {formatExactAmount(98.40)} + {formatExactAmount(146.80)} + {formatExactAmount(292.80)} ={' '}
              <span className="line-through text-zinc-400">{formatExactAmount(BUNDLE_INDIVIDUAL_SUM)}</span>{' '}
              − 25.00% ({formatExactAmount(BUNDLE_DISCOUNT_AMOUNT)}) ={' '}
              <strong className="text-[#d4af37]">{formatExactAmount(BUNDLE_FINAL_PRICE)} USD</strong>
            </p>
          </div>

          <button
            type="button"
            onClick={handleBuyAllBundle}
            className="px-5 py-3 bg-[#d4af37] hover:bg-[#e3c04f] text-[#141416] font-black text-xs uppercase font-mono tracking-wider rounded-xs transition-all shrink-0 cursor-pointer flex items-center gap-2 whitespace-nowrap"
          >
            <CreditCard className="w-4 h-4 text-[#141416]" />
            <span>Acquire Suite · {formatExactAmount(BUNDLE_FINAL_PRICE)}</span>
          </button>
        </div>
      </div>

      <PaymentModal
        isOpen={!!activePaymentItem}
        onClose={() => setActivePaymentItem(null)}
        item={activePaymentItem}
      />
    </div>
  );
};
