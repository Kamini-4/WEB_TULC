import React, { useState } from 'react';
import { PartnershipPathway, PartnershipModelId } from '../types';
import {
  ArrowRight,
  CheckCircle2,
  Download,
  ShieldCheck,
  Sparkles,
  Check,
  CreditCard,
  CalendarClock,
  Users,
  Globe,
} from 'lucide-react';
import { PaymentModal, PaymentItem } from './payment/PaymentModal';
import {
  SettlementCurrency,
  computeExactClientPreview,
  formatExactAmount,
} from '../utils/pricing';

interface PathwaysProps {
  onSelectModel: (modelId: PartnershipModelId) => void;
  onOpenConsultationWithModel: (model: PartnershipPathway) => void;
  selectedModelId?: PartnershipModelId;
}

export type DiagnosticCohortId = 'solo' | 'group';

export interface DiagnosticCohortOption {
  id: DiagnosticCohortId;
  skuId: string;
  shortLabel: string;
  title: string;
  fullFeeINR: number;
  sneakPeek: string;
  scopeNote: string;
}

export const DIAGNOSTIC_COHORT_OPTIONS: DiagnosticCohortOption[] = [
  {
    id: 'solo',
    skuId: 'mandate-diagnostic-solo',
    shortLabel: 'Solo Founder / CEO',
    title: 'Solo Founder / CEO Diagnostic',
    fullFeeINR: 38450,
    sneakPeek: 'Audit ₹28500 + Debrief ₹6450 + Platform ₹3500',
    scopeNote: '1:1 founder diagnostic, bottleneck map & 90-day fix plan. Full single payment.',
  },
  {
    id: 'group',
    skuId: 'mandate-diagnostic-group',
    shortLabel: 'Group (3+ Leaders)',
    title: 'Group CXO Analysis (3+ Senior Leaders)',
    fullFeeINR: 89450,
    sneakPeek: '3+ CXO Audit ₹64900 + Alignment ₹14800 + Multi-Seat Platform ₹9750',
    scopeNote: '3 or more senior leaders assessed together (saves 22.45% vs. solo). Full single payment.',
  },
];

export type EmbeddingInstalmentPlanId = 'monthly' | 'split' | 'deposit';

export interface EmbeddingInstalmentOption {
  id: EmbeddingInstalmentPlanId;
  skuId: string;
  shortLabel: string;
  title: string;
  payNowINR: number;
  scheduleSummary: string;
  totalFeeINR: number;
}

export const EMBEDDING_INSTALMENT_OPTIONS: EmbeddingInstalmentOption[] = [
  {
    id: 'monthly',
    skuId: 'mandate-embedding-instalment-monthly',
    shortLabel: '3 Monthly',
    title: '3 Monthly Instalments (0% Interest)',
    payNowINR: 94884,
    scheduleSummary: '₹94884 Day 1, ₹94883 Day 30, ₹94883 Day 60',
    totalFeeINR: 284650,
  },
  {
    id: 'split',
    skuId: 'mandate-embedding-instalment-split',
    shortLabel: '2 Split',
    title: '2 Bi-Monthly Instalments (50/50 Split)',
    payNowINR: 142325,
    scheduleSummary: '2 × ₹142325 (Day 1 & Day 45)',
    totalFeeINR: 284650,
  },
  {
    id: 'deposit',
    skuId: 'mandate-deposit-embedding',
    shortLabel: '25% Lock',
    title: '25% Kickoff Lock + 2 Milestones',
    payNowINR: 71162.5,
    scheduleSummary: '₹71162.50 kickoff + 2 × ₹106743.75 (Day 30 & Day 60)',
    totalFeeINR: 284650,
  },
];

export type RetainerInstalmentPlanId = 'monthly' | 'split' | 'deposit';

export interface RetainerInstalmentOption {
  id: RetainerInstalmentPlanId;
  skuId: string;
  shortLabel: string;
  title: string;
  payNowINR: number;
  scheduleSummary: string;
  totalQuarterlyINR: number;
}

export const RETAINER_INSTALMENT_OPTIONS: RetainerInstalmentOption[] = [
  {
    id: 'monthly',
    skuId: 'mandate-retainer-instalment-monthly',
    shortLabel: '3 Monthly',
    title: '3 Monthly Instalments (0% Interest)',
    payNowINR: 68450,
    scheduleSummary: '3 × ₹68450 (Day 1, Day 30, Day 60)',
    totalQuarterlyINR: 205350,
  },
  {
    id: 'split',
    skuId: 'mandate-retainer-instalment-split',
    shortLabel: '2 Split',
    title: '2 Bi-Monthly Instalments (50/50 Split)',
    payNowINR: 102675,
    scheduleSummary: '2 × ₹102675 (Day 1 & Day 45)',
    totalQuarterlyINR: 205350,
  },
  {
    id: 'deposit',
    skuId: 'mandate-deposit-retainer',
    shortLabel: '30% Lock',
    title: '30% Quarter Lock Deposit',
    payNowINR: 61605,
    scheduleSummary: '₹61605 now + ₹143745 at kickoff',
    totalQuarterlyINR: 205350,
  },
];

interface TrackPricingMeta {
  fullFeeINR: number;
  cadenceUnit: string;
  sneakPeek: string;
  cardFeeNote: string;
}

const TRACK_PRICING: Record<PartnershipModelId, TrackPricingMeta> = {
  diagnostic: {
    fullFeeINR: 38450,
    cadenceUnit: '14-Day Audit',
    sneakPeek: 'Audit ₹28500 + Debrief ₹6450 + Platform ₹3500',
    cardFeeNote: 'Solo fee: ₹38450 ex-GST · Full single payment (Group breakdown in Fee & Scope)',
  },
  embedding: {
    fullFeeINR: 284650,
    cadenceUnit: '90-Day Build',
    sneakPeek: '56 hrs Build ₹221200 + Charter ₹28450 + Test ₹19600 + Platform ₹15400',
    cardFeeNote: 'Fee: ₹284650 ex-GST · 0% instalments available in Fee & Scope',
  },
  retainer: {
    fullFeeINR: 205350,
    cadenceUnit: 'Per Quarter',
    sneakPeek: 'Counsel ₹60900/mo + Telemetry ₹7550/mo = ₹68450/mo × 3',
    cardFeeNote: 'Fee: ₹205350 / Qtr ex-GST · 0% instalments available in Fee & Scope',
  },
};

export const PARTNERSHIP_PATHWAYS: PartnershipPathway[] = [
  {
    id: 'diagnostic',
    tierNumber: '01',
    name: 'Mandate Forensic Diagnostic',
    tagline: 'See exactly what is slowing your company down — in 14 days.',
    investmentAnchor: '14-Day Diagnostic',
    cadence: '14-Day Rapid Audit',
    thePain:
      'Decisions bounce between meetings and land back on the founder desk while real bottlenecks stay unspoken.',
    theDesire:
      'Plain, objective proof of what is broken and what to fix first — with zero politics.',
    theOutcome:
      'Available for a solo founder or 3+ senior leaders (CEO & CXOs) together. Walk away with an exact map of who owns what, where time and margin leak, and your top 3 fixes for the next 90 days.',
    deliverables: [
      'Take it solo or as a group of 3+ senior leaders (CEO & CXOs)',
      'Exact map of decision bottlenecks & weekly founder time leaks',
      'Written 90-day fix plan ranked by fastest business impact',
      'Private closed-door debrief directly with Suchita Sancheti',
    ],
    idealClient: 'Founders or leadership teams of 3+ executives who want crystal-clear answers before committing to a 90-day overhaul.',
  },
  {
    id: 'embedding',
    tierNumber: '02',
    name: 'Operating Architecture Embedding',
    tagline: 'We build the operating system so your team runs without your constant sign-off.',
    investmentAnchor: '90-Day Build',
    cadence: '90-Day Transformation',
    thePain:
      'Org charts changed nothing. Senior leaders still hesitate on tough calls and escalate routine work back to you.',
    theDesire:
      'A self-running leadership bench that owns decisions cleanly and delivers on time without status meetings.',
    theOutcome:
      'We embed with your leadership team for 90 days to install written delegation limits, 14-day execution sprints, peer scorecards, and a live 30-day founder absence test — then exit cleanly on Day 90.',
    deliverables: [
      'Direct principal-led operating system build (zero junior handoffs)',
      'Written delegation limits & clear single-owner decision rights',
      '14-day execution sprints replacing redundant status meetings',
      'Live 30-day absence stress-test & 100% playbook handover',
    ],
    idealClient: 'Growth-stage CEOs and leadership teams ready to remove founder bottlenecks permanently in 90 days.',
  },
  {
    id: 'retainer',
    tierNumber: '03',
    name: 'Fractional COO & Strategic Retainer',
    tagline: 'Direct executive operating counsel when the stakes are highest.',
    investmentAnchor: 'Quarterly Retainer',
    cadence: 'Quarterly Mandate',
    thePain:
      'At the top, there is no neutral peer with operating discipline to pressure-test major decisions and keep execution sharp.',
    theDesire:
      'An uncompromising Fractional COO in your corner with zero internal politics.',
    theOutcome:
      'Ongoing Fractional COO governance with Suchita Sancheti covering leadership alignment, succession, M&A integration, and high-stakes execution calls.',
    deliverables: [
      'Direct Fractional COO counsel with Suchita Sancheti',
      'Ongoing C-suite cadence, scorecard & accountability oversight',
      '4-hour emergency war-room response guarantee',
      'Quarterly in-camera succession & operating health audits',
    ],
    idealClient: 'Growth CEOs, Board Chairs, and Founders navigating rapid expansion or leadership transitions.',
  },
];

const CONCLAVE_SEAT_PRICE_INR = 24850;
const CURRENCIES: SettlementCurrency[] = ['INR', 'USD', 'EUR', 'GBP', 'AED'];

export const PartnershipPathways: React.FC<PathwaysProps> = ({
  onSelectModel,
  onOpenConsultationWithModel,
  selectedModelId = 'embedding',
}) => {
  const [, setActiveModelId] = useState<PartnershipModelId>(selectedModelId);
  const [diagnosticCohortId, setDiagnosticCohortId] = useState<DiagnosticCohortId>('solo');
  const [embeddingPlanId, setEmbeddingPlanId] = useState<EmbeddingInstalmentPlanId>('monthly');
  const [retainerPlanId, setRetainerPlanId] = useState<RetainerInstalmentPlanId>('monthly');
  const [feeCurrency, setFeeCurrency] = useState<SettlementCurrency>('INR');
  const [showSpecModal, setShowSpecModal] = useState<PartnershipPathway | null>(null);
  const [activePaymentItem, setActivePaymentItem] = useState<PaymentItem | null>(null);
  const [checkoutCurrency, setCheckoutCurrency] = useState<SettlementCurrency>('INR');

  const selectedDiagnosticCohort =
    DIAGNOSTIC_COHORT_OPTIONS.find((d) => d.id === diagnosticCohortId) ||
    DIAGNOSTIC_COHORT_OPTIONS[0];

  const selectedEmbeddingPlan =
    EMBEDDING_INSTALMENT_OPTIONS.find((p) => p.id === embeddingPlanId) ||
    EMBEDDING_INSTALMENT_OPTIONS[0];

  const selectedRetainerPlan =
    RETAINER_INSTALMENT_OPTIONS.find((p) => p.id === retainerPlanId) ||
    RETAINER_INSTALMENT_OPTIONS[0];

  const formatConvertedPreview = (skuId: string, inrFallback: number, curr: SettlementCurrency) => {
    const q = computeExactClientPreview(skuId, inrFallback, curr, 1);
    const amount = curr === 'INR' ? q.subtotal : q.subtotal + q.fxConversionFee;
    return `${formatExactAmount(amount, q.symbol, q.locale)} ${curr}`;
  };

  const handleSelect = (model: PartnershipPathway) => {
    setActiveModelId(model.id);
    onSelectModel(model.id);
    onOpenConsultationWithModel(model);
  };

  const handleCheckoutTrack = (model: PartnershipPathway, currencyToUse: SettlementCurrency) => {
    setCheckoutCurrency(currencyToUse);

    if (model.id === 'diagnostic') {
      setActivePaymentItem({
        id: selectedDiagnosticCohort.skuId,
        title: `${model.name} — ${selectedDiagnosticCohort.title}`,
        subtitle: `Single Full Payment (No Instalments) · ${selectedDiagnosticCohort.scopeNote}`,
        priceINR: selectedDiagnosticCohort.fullFeeINR,
        category: 'retainer_deposit',
        deliverables: model.deliverables,
      });
      return;
    }

    if (model.id === 'embedding') {
      setActivePaymentItem({
        id: selectedEmbeddingPlan.skuId,
        title: `${model.name} — ${selectedEmbeddingPlan.title}`,
        subtitle: `${selectedEmbeddingPlan.scheduleSummary}`,
        priceINR: selectedEmbeddingPlan.payNowINR,
        category: 'retainer_deposit',
        deliverables: model.deliverables,
      });
      return;
    }

    setActivePaymentItem({
      id: selectedRetainerPlan.skuId,
      title: `${model.name} — ${selectedRetainerPlan.title}`,
      subtitle: `${selectedRetainerPlan.scheduleSummary}`,
      priceINR: selectedRetainerPlan.payNowINR,
      category: 'retainer_deposit',
      deliverables: model.deliverables,
    });
  };

  const handlePayConclaveSeat = () => {
    setCheckoutCurrency('INR');
    setActivePaymentItem({
      id: 'conclave-seat-reservation',
      title: 'The Executive Advisory Board — Delegate Seat',
      subtitle: 'Closed-door CEO roundtable seat with private pre-briefing & peer dossier.',
      priceINR: CONCLAVE_SEAT_PRICE_INR,
      category: 'conclave_seat',
      deliverables: [
        'Chatham House Closed-Door Roundtable Seat',
        '60-Min Private Pre-Briefing with Suchita Sancheti',
        'Confidential Strategic Peer Review Dossier',
      ],
    });
  };

  return (
    <section
      id="partnerships"
      className="py-8 sm:py-10 border-b border-[#dfd7c8] bg-[#f2ede2] relative"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-6">
          <div className="flex items-center gap-2 text-xs uppercase text-[#9d7b38] font-bold mb-1">
            <ShieldCheck className="w-4 h-4 text-[#9d7b38]" />
            <span>Fixed Scope · Direct Principal Execution · Clean Day-90 Exit</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#17181c] leading-tight">
            How Leaders Partner With Us
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-[#4e5159] leading-relaxed">
            Three direct ways to remove founder bottlenecks and install autonomous execution. Open{' '}
            <strong className="text-[#17181c]">Fee &amp; Scope</strong> on any track for full fee details, group options, instalment schedules (Tracks 02 &amp; 03), and international currency conversion.
          </p>
        </div>

        {/* 3 Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch mb-6">
          {PARTNERSHIP_PATHWAYS.map((model) => {
            const isDiagnostic = model.id === 'diagnostic';
            const isEmbedding = model.id === 'embedding';
            const isRetainer = model.id === 'retainer';
            const pricing = TRACK_PRICING[model.id];

            return (
              <div
                key={model.id}
                className={`bg-white rounded-md flex flex-col justify-between transition-all duration-200 relative shadow-2xs ${
                  isEmbedding
                    ? 'border-2 border-[#17181c] ring-1 ring-[#d4af37]/60'
                    : 'border border-[#d8cebe] hover:border-[#9d7b38]'
                }`}
              >
                {isDiagnostic && (
                  <div className="bg-[#141416] text-[#d4af37] text-[10px] font-mono uppercase font-black tracking-wider px-4 py-1.5 rounded-t-sm flex items-center justify-center gap-1.5 border-b border-[#d4af37]/40">
                    <Users className="w-3 h-3 text-[#d4af37]" />
                    <span>FOR 1 FOUNDER OR 3+ LEADERS TOGETHER</span>
                  </div>
                )}

                {isEmbedding && (
                  <div className="bg-[#17181c] text-[#d4af37] text-[10px] font-mono uppercase font-black tracking-wider px-4 py-1.5 rounded-t-sm flex items-center justify-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#d4af37]" />
                    <span>FLAGSHIP 90-DAY BUILD · 0% INSTALMENTS</span>
                  </div>
                )}

                {isRetainer && (
                  <div className="bg-[#141416] text-[#d4af37] text-[10px] font-mono uppercase font-black tracking-wider px-4 py-1.5 rounded-t-sm flex items-center justify-center gap-1.5 border-b border-[#d4af37]/40">
                    <CalendarClock className="w-3 h-3 text-[#d4af37]" />
                    <span>QUARTERLY FRACTIONAL COO · 0% INSTALMENTS</span>
                  </div>
                )}

                <div className="p-5 space-y-3.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-[#ebdcc0] pb-2">
                      <span className="text-xs font-mono font-black text-[#9d7b38] uppercase tracking-wider">
                        Track {model.tierNumber}
                      </span>
                      <span className="text-[11px] font-mono font-bold text-[#17181c] bg-[#faf8f4] border border-[#d8cebe] px-2 py-0.5 rounded-xs">
                        {model.cadence}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-lg sm:text-xl font-bold font-serif text-[#17181c] leading-snug">
                        {model.name}
                      </h3>
                      <p className="text-xs text-[#555861] italic font-serif leading-relaxed">
                        "{model.tagline}"
                      </p>
                    </div>

                    {/* Plain-Language Outcome Summary */}
                    <div className="p-3 bg-[#faf8f4] border border-[#e2d8c9] rounded-xs">
                      <p className="text-xs text-[#17181c] leading-relaxed">
                        {model.theOutcome}
                      </p>
                    </div>

                    {/* Key Deliverables */}
                    <div className="space-y-1.5 pt-0.5">
                      <span className="text-[10px] font-mono uppercase text-[#9d7b38] font-bold tracking-wider block">
                        What We Deliver
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#17181c]">
                        {model.deliverables.map((del, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#9d7b38] shrink-0 mt-0.5" />
                            <span className="font-medium leading-snug">{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Understated Small-Font Fee Line Only */}
                  <div className="pt-2.5 border-t border-[#ebdcc0]">
                    <p className="text-[11px] font-mono text-[#6b6e76] leading-snug">
                      {pricing.cardFeeNote}
                    </p>
                  </div>
                </div>

                {/* Clean Price-Free Action Buttons */}
                <div className="p-5 pt-0 space-y-2">
                  <button
                    type="button"
                    onClick={() => setShowSpecModal(model)}
                    className="w-full py-2.5 px-3 bg-[#17181c] hover:bg-[#282a30] text-[#f8f6f0] font-bold text-xs font-mono uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-[#d4af37]/40"
                  >
                    <Download className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                    <span>View Fee &amp; Scope</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelect(model)}
                    className="w-full py-2 px-2 bg-white hover:bg-stone-100 text-[#17181c] text-[11px] font-mono uppercase font-bold rounded-xs border border-stone-300 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <span>Inquire First</span>
                    <ArrowRight className="w-3 h-3 text-[#9d7b38]" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Advisory Board Conclave Strip */}
        <div
          id="council-feature"
          className="p-5 rounded-md bg-[#141416] text-white border border-[#d4af37] shadow-md flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left"
        >
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase text-[#d4af37] font-bold">
              <Sparkles className="w-3 h-3 text-[#d4af37]" />
              <span>Executive Advisory Board Conclave</span>
            </div>
            <h4 className="text-base sm:text-lg font-bold font-serif text-[#f4ecd8]">
              Closed-Door CEO Sparring Conclaves Across Mumbai, Bengaluru, Dubai &amp; London
            </h4>
            <p className="text-[11px] text-zinc-400 font-mono">
              Chatham House roundtable seat with private pre-briefing &amp; peer dossier · Delegate fee: {formatExactAmount(CONCLAVE_SEAT_PRICE_INR)} ex-GST
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 shrink-0">
            <button
              type="button"
              onClick={handlePayConclaveSeat}
              className="px-4 py-2.5 bg-[#d4af37] hover:bg-[#e3c04f] text-[#141416] font-black text-xs uppercase tracking-wider rounded-xs font-mono cursor-pointer whitespace-nowrap flex items-center gap-1.5"
            >
              <CreditCard className="w-3.5 h-3.5 text-[#141416]" />
              <span>Reserve Delegate Seat</span>
            </button>

            <button
              type="button"
              onClick={() => {
                const retainer =
                  PARTNERSHIP_PATHWAYS.find((p) => p.id === 'retainer') ||
                  PARTNERSHIP_PATHWAYS[0];
                onOpenConsultationWithModel(retainer);
              }}
              className="px-3.5 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-stone-200 border border-zinc-700 text-xs uppercase font-mono tracking-wider rounded-xs cursor-pointer whitespace-nowrap"
            >
              <span>Inquire Protocol</span>
            </button>
          </div>
        </div>
      </div>

      {/* FEE & SCOPE MODAL (ONLY PLACE FOR GROUP BREAKDOWN, INSTALMENT SELECTION & CURRENCY CONVERSION) */}
      {showSpecModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-2xs p-4 overflow-y-auto">
          <div className="bg-white border-2 border-[#17181c] rounded-md max-w-xl w-full p-5 sm:p-6 shadow-2xl space-y-4 my-8 animate-in fade-in duration-200 text-[#17181c]">
            <div className="flex items-start justify-between border-b border-[#d8cebe] pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#9d7b38] font-black">
                  Fee &amp; Scope · Track {showSpecModal.tierNumber}
                </span>
                <h3 className="text-lg font-bold font-serif text-[#17181c] mt-0.5">
                  {showSpecModal.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSpecModal(null)}
                className="text-[#17181c] hover:text-rose-700 text-xl font-bold p-1 cursor-pointer"
                aria-label="Close Fee and Scope"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-[#17181c] max-h-[62vh] overflow-y-auto pr-1">
              {/* Currency Converter — Exclusively Inside Fee & Scope */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-[#faf8f4] border border-[#d8cebe] rounded-xs">
                <span className="text-[10px] font-mono uppercase text-[#4e5159] font-bold flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#9d7b38]" />
                  <span>Convert Fee Currency</span>
                </span>
                <div className="flex items-center gap-1">
                  {CURRENCIES.map((curr) => (
                    <button
                      key={curr}
                      type="button"
                      onClick={() => setFeeCurrency(curr)}
                      className={`px-2 py-0.5 rounded-2xs text-[10px] font-mono font-bold transition-colors cursor-pointer ${
                        feeCurrency === curr
                          ? 'bg-[#141416] text-[#d4af37]'
                          : 'bg-white border border-[#d8cebe] text-[#4e5159] hover:text-[#17181c]'
                      }`}
                    >
                      {curr}
                    </button>
                  ))}
                </div>
              </div>

              {/* Compact Small-Font Fee Summary Box */}
              <div className="p-3 bg-[#141416] text-white border border-[#d4af37] rounded-xs space-y-1 font-mono text-[11px]">
                <div className="flex justify-between gap-2">
                  <span className="text-[#d4af37] font-bold">
                    {showSpecModal.id === 'diagnostic'
                      ? selectedDiagnosticCohort.title
                      : `Total Fee (${feeCurrency === 'INR' ? 'Ex-GST' : 'Incl. FX'})`}
                  </span>
                  <span className="text-[#d4af37] font-bold tabular-nums shrink-0">
                    {showSpecModal.id === 'diagnostic'
                      ? formatConvertedPreview(
                          selectedDiagnosticCohort.skuId,
                          selectedDiagnosticCohort.fullFeeINR,
                          feeCurrency
                        )
                      : formatConvertedPreview(
                          `total-${showSpecModal.id}`,
                          TRACK_PRICING[showSpecModal.id].fullFeeINR,
                          feeCurrency
                        )}
                  </span>
                </div>

                {feeCurrency === 'INR' && (
                  <div className="text-[10px] text-zinc-400">
                    {showSpecModal.id === 'diagnostic'
                      ? selectedDiagnosticCohort.sneakPeek
                      : TRACK_PRICING[showSpecModal.id].sneakPeek}
                  </div>
                )}

                {showSpecModal.id === 'diagnostic' && (
                  <div className="flex justify-between text-zinc-300 pt-1 text-[10px]">
                    <span>Payment Terms:</span>
                    <span className="text-[#f3e5ab] font-bold">
                      Single Full Payment (No Instalments)
                    </span>
                  </div>
                )}

                {showSpecModal.id === 'embedding' && (
                  <div className="flex justify-between text-zinc-300 pt-1 text-[10px]">
                    <span>Selected Instalment ({selectedEmbeddingPlan.shortLabel}):</span>
                    <span className="text-[#f3e5ab] font-bold tabular-nums">
                      {formatConvertedPreview(
                        selectedEmbeddingPlan.skuId,
                        selectedEmbeddingPlan.payNowINR,
                        feeCurrency
                      )}{' '}
                      due today
                    </span>
                  </div>
                )}

                {showSpecModal.id === 'retainer' && (
                  <div className="flex justify-between text-zinc-300 pt-1 text-[10px]">
                    <span>Selected Instalment ({selectedRetainerPlan.shortLabel}):</span>
                    <span className="text-[#f3e5ab] font-bold tabular-nums">
                      {formatConvertedPreview(
                        selectedRetainerPlan.skuId,
                        selectedRetainerPlan.payNowINR,
                        feeCurrency
                      )}{' '}
                      due today
                    </span>
                  </div>
                )}

                {feeCurrency !== 'INR' && (
                  <div className="text-[10px] text-zinc-400 pt-0.5">
                    0% Export GST Exempt · Includes cross-border FX conversion.
                  </div>
                )}
              </div>

              {/* TRACK 01 ONLY: Solo vs Group (3+ CXOs) Breakdown */}
              {showSpecModal.id === 'diagnostic' && (
                <div className="p-3 bg-[#faf6ee] border border-[#d4af37]/70 rounded-xs space-y-2">
                  <strong className="text-[#9d7b38] block text-[10px] font-mono uppercase">
                    Solo Founder vs. Group Analysis (3+ Senior Leaders) — Single Payment
                  </strong>
                  <div className="space-y-1.5">
                    {DIAGNOSTIC_COHORT_OPTIONS.map((opt) => {
                      const active = diagnosticCohortId === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setDiagnosticCohortId(opt.id)}
                          className={`w-full text-left p-2.5 rounded-xs border transition-colors cursor-pointer flex items-center justify-between gap-2 ${
                            active
                              ? 'bg-[#141416] text-white border-[#d4af37]'
                              : 'bg-white text-[#17181c] border-[#d8cebe] hover:border-[#9d7b38]'
                          }`}
                        >
                          <div>
                            <div
                              className={`text-xs font-bold ${
                                active ? 'text-[#d4af37]' : 'text-[#17181c]'
                              }`}
                            >
                              {opt.title}
                            </div>
                            <div
                              className={`text-[10px] font-mono ${
                                active ? 'text-zinc-300' : 'text-[#4e5159]'
                              }`}
                            >
                              {feeCurrency === 'INR' ? opt.sneakPeek : opt.scopeNote}
                            </div>
                          </div>
                          <span
                            className={`text-[11px] font-mono font-bold tabular-nums shrink-0 ${
                              active ? 'text-[#d4af37]' : 'text-[#9d7b38]'
                            }`}
                          >
                            {formatConvertedPreview(opt.skuId, opt.fullFeeINR, feeCurrency)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TRACK 02 ONLY: 90-Day Embedding 0% Instalment Selector */}
              {showSpecModal.id === 'embedding' && (
                <div className="p-3 bg-[#faf6ee] border border-[#d4af37]/70 rounded-xs space-y-2">
                  <strong className="text-[#9d7b38] block text-[10px] font-mono uppercase">
                    Choose 90-Day Build Payment Plan (0% Interest)
                  </strong>
                  <div className="space-y-1.5">
                    {EMBEDDING_INSTALMENT_OPTIONS.map((opt) => {
                      const active = embeddingPlanId === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setEmbeddingPlanId(opt.id)}
                          className={`w-full text-left p-2.5 rounded-xs border transition-colors cursor-pointer flex items-center justify-between gap-2 ${
                            active
                              ? 'bg-[#141416] text-white border-[#d4af37]'
                              : 'bg-white text-[#17181c] border-[#d8cebe] hover:border-[#9d7b38]'
                          }`}
                        >
                          <div>
                            <div
                              className={`text-xs font-bold ${
                                active ? 'text-[#d4af37]' : 'text-[#17181c]'
                              }`}
                            >
                              {opt.title}
                            </div>
                            <div
                              className={`text-[10px] font-mono ${
                                active ? 'text-zinc-300' : 'text-[#4e5159]'
                              }`}
                            >
                              {feeCurrency === 'INR'
                                ? opt.scheduleSummary
                                : `Converted at live ${feeCurrency} schedule (0% markup)`}
                            </div>
                          </div>
                          <span
                            className={`text-[11px] font-mono font-bold tabular-nums shrink-0 ${
                              active ? 'text-[#d4af37]' : 'text-[#9d7b38]'
                            }`}
                          >
                            {formatConvertedPreview(opt.skuId, opt.payNowINR, feeCurrency)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TRACK 03 ONLY: Fractional COO Retainer 0% Instalment Selector */}
              {showSpecModal.id === 'retainer' && (
                <div className="p-3 bg-[#faf6ee] border border-[#d4af37]/70 rounded-xs space-y-2">
                  <strong className="text-[#9d7b38] block text-[10px] font-mono uppercase">
                    Choose Retainer Instalment Plan (0% Interest)
                  </strong>
                  <div className="space-y-1.5">
                    {RETAINER_INSTALMENT_OPTIONS.map((opt) => {
                      const active = retainerPlanId === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setRetainerPlanId(opt.id)}
                          className={`w-full text-left p-2.5 rounded-xs border transition-colors cursor-pointer flex items-center justify-between gap-2 ${
                            active
                              ? 'bg-[#141416] text-white border-[#d4af37]'
                              : 'bg-white text-[#17181c] border-[#d8cebe] hover:border-[#9d7b38]'
                          }`}
                        >
                          <div>
                            <div
                              className={`text-xs font-bold ${
                                active ? 'text-[#d4af37]' : 'text-[#17181c]'
                              }`}
                            >
                              {opt.title}
                            </div>
                            <div
                              className={`text-[10px] font-mono ${
                                active ? 'text-zinc-300' : 'text-[#4e5159]'
                              }`}
                            >
                              {feeCurrency === 'INR'
                                ? opt.scheduleSummary
                                : `Converted at live ${feeCurrency} schedule (0% markup)`}
                            </div>
                          </div>
                          <span
                            className={`text-[11px] font-mono font-bold tabular-nums shrink-0 ${
                              active ? 'text-[#d4af37]' : 'text-[#9d7b38]'
                            }`}
                          >
                            {formatConvertedPreview(opt.skuId, opt.payNowINR, feeCurrency)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div>
                <strong className="text-[#9d7b38] block text-[10px] font-mono uppercase mb-1.5">
                  Included Deliverables
                </strong>
                <ul className="space-y-1.5">
                  {showSpecModal.deliverables.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 bg-[#faf8f4] p-2 rounded-xs border border-[#e2d8c9]"
                    >
                      <Check className="w-3.5 h-3.5 text-[#9d7b38] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-[#d8cebe] flex flex-wrap items-center justify-between gap-3">
              <span className="text-[11px] font-mono font-bold text-[#9d7b38]">
                {showSpecModal.cadence}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowSpecModal(null)}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-[#17181c] text-xs font-bold rounded-xs cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const m = showSpecModal;
                    setShowSpecModal(null);
                    handleCheckoutTrack(m, feeCurrency);
                  }}
                  className="px-3.5 py-1.5 bg-[#d4af37] hover:bg-[#e3c04f] text-[#141416] text-xs font-black uppercase font-mono rounded-xs cursor-pointer flex items-center gap-1.5"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>Proceed to Payment</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <PaymentModal
        isOpen={!!activePaymentItem}
        onClose={() => setActivePaymentItem(null)}
        item={activePaymentItem}
        initialCurrency={checkoutCurrency}
        allowCurrencySwitch={false}
      />
    </section>
  );
};
