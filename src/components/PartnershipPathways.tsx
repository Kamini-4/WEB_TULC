import React, { useState } from 'react';
import { PartnershipPathway, PartnershipModelId } from '../types';
import {
  ArrowRight,
  CheckCircle2,
  Download,
  ShieldCheck,
  Zap,
  Sparkles,
  Check,
  CreditCard,
  CalendarClock,
  Users,
  Globe,
} from 'lucide-react';
import { PaymentModal, PaymentItem } from './payment/PaymentModal';
import { formatExactAmount } from '../utils/pricing';

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
  depositPercent: number;
  depositINR: number;
  balanceSchedule: string;
  sneakPeek: string;
  scopeNote: string;
}

export const DIAGNOSTIC_COHORT_OPTIONS: DiagnosticCohortOption[] = [
  {
    id: 'solo',
    skuId: 'mandate-deposit-diagnostic',
    shortLabel: 'Solo CEO · ₹38450',
    title: 'Solo Founder / CEO Diagnostic',
    fullFeeINR: 38450,
    depositPercent: 50,
    depositINR: 19225,
    balanceSchedule: '₹19225 due upon debrief',
    sneakPeek: 'Audit ₹28500 + Debrief ₹6450 + Platform ₹3500',
    scopeNote: '1:1 founder diagnostic, friction matrix & 90-day blueprint.',
  },
  {
    id: 'group',
    skuId: 'mandate-deposit-diagnostic-group',
    shortLabel: '3+ CXOs · ₹89450',
    title: 'Group CXO Cohort Diagnostic (3+ Executives)',
    fullFeeINR: 89450,
    depositPercent: 50,
    depositINR: 44725,
    balanceSchedule: '₹44725 due upon cohort debrief',
    sneakPeek: '3+ CXO Audit ₹64900 + Alignment ₹14800 + Multi-Seat Platform ₹9750',
    scopeNote: 'For 3+ CXOs together (saves 22.45% vs. solo rates).',
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
  financingNote: string;
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
    financingNote: 'Zero interest · 3 equal monthly payments',
  },
  {
    id: 'split',
    skuId: 'mandate-retainer-instalment-split',
    shortLabel: '2 Split',
    title: '2 Bi-Monthly Instalments (50/50 Split)',
    payNowINR: 102675,
    scheduleSummary: '2 × ₹102675 (Day 1 & Day 45)',
    totalQuarterlyINR: 205350,
    financingNote: 'Zero interest · 2 equal instalments',
  },
  {
    id: 'deposit',
    skuId: 'mandate-deposit-retainer',
    shortLabel: '30% Lock',
    title: '30% Quarter Lock Deposit',
    payNowINR: 61605,
    scheduleSummary: '₹61605 now + ₹143745 at kickoff',
    totalQuarterlyINR: 205350,
    financingNote: 'Locks calendar slot prior to kickoff',
  },
];

export interface ExactTrackPricing {
  fullFeeINR: number;
  cadenceUnit: string;
  sneakPeek: string;
  depositPercent: number;
  depositINR: number;
  balanceINR: number;
  balanceSchedule: string;
}

const TRACK_PRICING: Record<PartnershipModelId, ExactTrackPricing> = {
  diagnostic: {
    fullFeeINR: 38450,
    cadenceUnit: '14-Day Audit',
    sneakPeek: 'Audit ₹28500 + Debrief ₹6450 + Platform ₹3500',
    depositPercent: 50,
    depositINR: 19225,
    balanceINR: 19225,
    balanceSchedule: '₹19225 due upon debrief',
  },
  embedding: {
    fullFeeINR: 284650,
    cadenceUnit: '90-Day Build',
    sneakPeek: '56 hrs Build ₹221200 + Charter ₹28450 + Test ₹19600 + Platform ₹15400',
    depositPercent: 25,
    depositINR: 71162.50,
    balanceINR: 213487.50,
    balanceSchedule: '2 × ₹106743.75 milestones (Day 30 & Day 60)',
  },
  retainer: {
    fullFeeINR: 205350,
    cadenceUnit: 'Per Quarter (₹821400/yr)',
    sneakPeek: 'Counsel ₹60900/mo + Telemetry ₹7550/mo = ₹68450/mo × 3',
    depositPercent: 30,
    depositINR: 61605,
    balanceINR: 143745,
    balanceSchedule: '3 monthly instalments of ₹68450 available (0% markup)',
  },
};

export const PARTNERSHIP_PATHWAYS: PartnershipPathway[] = [
  {
    id: 'diagnostic',
    tierNumber: '01',
    name: 'Mandate Forensic Diagnostic',
    tagline: 'You cannot fix what you refuse to name.',
    investmentAnchor: '₹38450 Solo · ₹89450 Group (3+ CXOs)',
    cadence: '14-Day Rapid Audit',
    thePain:
      'Decisions take weeks of defensive committee slide decks. Latent tension between CEO and leadership stalls execution while competitors move.',
    theDesire:
      'An objective empirical mirror with zero political baggage that brings unspoken friction into sharp, actionable focus.',
    theOutcome:
      'An indisputable map of who owns what decision, where execution is leaking, and the exact 3 structural interventions to unblock velocity.',
    deliverables: [
      'Solo Founder / CEO Audit (₹38450)',
      'Group CXO Assessment for 3+ Executives (₹89450)',
      'Founder Dependency Friction Matrix & 90-Day Blueprint',
      'Closed-Door Executive Debrief with Suchita Sancheti',
    ],
    idealClient: 'Founders and 3+ CXO leadership teams preparing for an inflection point or resolving structural friction.',
  },
  {
    id: 'embedding',
    tierNumber: '02',
    name: 'Operating Architecture Embedding',
    tagline: 'Velocity is a structural choice. We build the machinery.',
    investmentAnchor: '₹284650 Total · ₹71162.50 Deposit',
    cadence: '90-Day Transformation Runway',
    thePain:
      'Org chart reorganizations changed nothing. Senior leaders still hedge bets, seek endless consensus, and defer hard choices across redundant meetings.',
    theDesire:
      'An operating system that runs autonomously, where executives own their decisions with conviction and ship initiatives without routine sign-offs.',
    theOutcome:
      'We embed inside your executive cadence for 90 days. We dismantle consensus meetings, codify authority matrices, and install 14-day execution loops.',
    deliverables: [
      'Direct Embedded Operating Architecture Engineering',
      'Authority Decoupling Charter & Capital Limits',
      '14-Day Execution Loops Replacing 70% of Syncs',
      'Live 30-Day Absence Validation Sprint & Clean Day-90 Exit',
    ],
    idealClient: 'Growth-stage CEOs and multi-unit leadership teams scaling past founder bottlenecks.',
  },
  {
    id: 'retainer',
    tierNumber: '03',
    name: 'Fractional COO & Strategic Retainer',
    tagline: 'The private counsel leaders turn to when stakes are existential.',
    investmentAnchor: '₹205350 / Qtr · ₹68450 / Mo Instalments',
    cadence: 'Quarterly Fractional COO Mandate',
    thePain:
      'At the top, there is no one you can safely think aloud with. When succession fractures, M&A hits friction, or growth accelerates, you carry it alone.',
    theDesire:
      'An uncompromising peer in your corner with no equity agenda and the operating spine to enforce execution.',
    theOutcome:
      'Continuous on-call Fractional COO counsel with Suchita Sancheti covering succession governance, M&A integration, and high-stakes decisions.',
    deliverables: [
      'Direct Fractional COO Executive Counsel',
      'Flexible 3-Month (₹68450) or 2-Split (₹102675) Instalments',
      '4-Hour Emergency War Room Response Guarantee',
      'Quarterly In-Camera Succession & Operating Audits',
    ],
    idealClient: 'Growth CEOs, Board Chairs, and Founders navigating rapid scale and leadership transitions.',
  },
];

const CONCLAVE_SEAT_PRICE_INR = 24850;
const CONCLAVE_SNEAK_PEEK = 'Roundtable ₹14950 + Pre-Briefing ₹6250 + Dossier ₹3650';

export const PartnershipPathways: React.FC<PathwaysProps> = ({
  onSelectModel,
  onOpenConsultationWithModel,
  selectedModelId = 'embedding',
}) => {
  const [, setActiveModelId] = useState<PartnershipModelId>(selectedModelId);
  const [diagnosticCohortId, setDiagnosticCohortId] = useState<DiagnosticCohortId>('solo');
  const [retainerPlanId, setRetainerPlanId] = useState<RetainerInstalmentPlanId>('monthly');
  const [showSpecModal, setShowSpecModal] = useState<PartnershipPathway | null>(null);
  const [activePaymentItem, setActivePaymentItem] = useState<PaymentItem | null>(null);

  const selectedDiagnosticCohort =
    DIAGNOSTIC_COHORT_OPTIONS.find((d) => d.id === diagnosticCohortId) ||
    DIAGNOSTIC_COHORT_OPTIONS[0];

  const selectedRetainerPlan =
    RETAINER_INSTALMENT_OPTIONS.find((p) => p.id === retainerPlanId) ||
    RETAINER_INSTALMENT_OPTIONS[0];

  const handleSelect = (model: PartnershipPathway) => {
    setActiveModelId(model.id);
    onSelectModel(model.id);
    onOpenConsultationWithModel(model);
  };

  const handlePayTrackDeposit = (model: PartnershipPathway) => {
    const pricing = TRACK_PRICING[model.id];

    if (model.id === 'diagnostic') {
      setActivePaymentItem({
        id: selectedDiagnosticCohort.skuId,
        title: `${model.name} — ${selectedDiagnosticCohort.title}`,
        subtitle: `Full Fee: ${formatExactAmount(selectedDiagnosticCohort.fullFeeINR)} INR ex-GST | ${selectedDiagnosticCohort.balanceSchedule}.`,
        priceINR: selectedDiagnosticCohort.depositINR,
        category: 'retainer_deposit',
        deliverables: model.deliverables,
      });
      return;
    }

    if (model.id === 'retainer') {
      setActivePaymentItem({
        id: selectedRetainerPlan.skuId,
        title: `${model.name} — ${selectedRetainerPlan.title}`,
        subtitle: `${selectedRetainerPlan.scheduleSummary}. Quarterly Fee: ${formatExactAmount(pricing.fullFeeINR)} INR ex-GST.`,
        priceINR: selectedRetainerPlan.payNowINR,
        category: 'retainer_deposit',
        deliverables: model.deliverables,
      });
      return;
    }

    setActivePaymentItem({
      id: `mandate-deposit-${model.id}`,
      title: `${model.name} — ${pricing.depositPercent}% Reservation Deposit`,
      subtitle: `Full Mandate: ${formatExactAmount(pricing.fullFeeINR)} INR ex-GST | ${pricing.balanceSchedule}.`,
      priceINR: pricing.depositINR,
      category: 'retainer_deposit',
      deliverables: model.deliverables,
    });
  };

  const handlePayConclaveSeat = () => {
    setActivePaymentItem({
      id: 'conclave-seat-reservation',
      title: 'The Executive Advisory Board — Delegate Seat',
      subtitle: `${CONCLAVE_SNEAK_PEEK} = ${formatExactAmount(CONCLAVE_SEAT_PRICE_INR)} INR ex-GST`,
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
            <span>India INR Schedule · Group CXO Cohort · International Custom Mandates</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#17181c] leading-tight">
            How Leaders Partner With Us —{' '}
            <span className="text-[#9d7b38]">Exact Fixed INR Pricing</span>
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-[#4e5159] leading-relaxed">
            India mandates are billed in INR (ex-GST; 18% GST at checkout). Retainers include{' '}
            <strong className="text-[#9d7b38]">zero-markup monthly and bi-monthly instalments</strong>. International clients settle in USD, EUR, GBP, or AED with automatic FX conversion or custom mandate scoping.
          </p>
        </div>

        {/* 3 Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch mb-6">
          {PARTNERSHIP_PATHWAYS.map((model) => {
            const isDiagnostic = model.id === 'diagnostic';
            const isEmbedding = model.id === 'embedding';
            const isRetainer = model.id === 'retainer';
            const pricing = TRACK_PRICING[model.id];

            const activeFullFee = isDiagnostic
              ? selectedDiagnosticCohort.fullFeeINR
              : pricing.fullFeeINR;
            const activeSneakPeek = isDiagnostic
              ? selectedDiagnosticCohort.sneakPeek
              : pricing.sneakPeek;
            const activeDepositPercent = isDiagnostic
              ? selectedDiagnosticCohort.depositPercent
              : pricing.depositPercent;
            const activeDepositINR = isDiagnostic
              ? selectedDiagnosticCohort.depositINR
              : pricing.depositINR;
            const activeBalanceSchedule = isDiagnostic
              ? selectedDiagnosticCohort.balanceSchedule
              : pricing.balanceSchedule;

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
                    <span>SOLO CEO ₹38450 · GROUP 3+ CXOS ₹89450</span>
                  </div>
                )}

                {isEmbedding && (
                  <div className="bg-[#17181c] text-[#d4af37] text-[10px] font-mono uppercase font-black tracking-wider px-4 py-1.5 rounded-t-sm flex items-center justify-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#d4af37]" />
                    <span>FLAGSHIP 90-DAY TRANSFORMATION</span>
                  </div>
                )}

                {isRetainer && (
                  <div className="bg-[#141416] text-[#d4af37] text-[10px] font-mono uppercase font-black tracking-wider px-4 py-1.5 rounded-t-sm flex items-center justify-center gap-1.5 border-b border-[#d4af37]/40">
                    <CalendarClock className="w-3 h-3 text-[#d4af37]" />
                    <span>FLEXIBLE INSTALMENTS · 0% MARKUP</span>
                  </div>
                )}

                <div className="p-5 space-y-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-[#ebdcc0] pb-2 mb-2.5">
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

                    {/* Exact Fee Box + Short Sneak-Peek Calculation */}
                    <div className="mt-3 p-3 bg-[#141416] text-white rounded-xs border border-[#d4af37]/60 space-y-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-[10px] font-mono uppercase text-[#d4af37] font-bold">
                          {isDiagnostic
                            ? selectedDiagnosticCohort.id === 'group'
                              ? 'Group Cohort (3+ CXOs)'
                              : 'Solo CEO (Ex-GST)'
                            : 'Total Mandate Fee (Ex-GST)'}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-300">
                          {pricing.cadenceUnit}
                        </span>
                      </div>
                      <div className="text-sm font-mono font-bold text-[#d4af37] tabular-nums">
                        {formatExactAmount(activeFullFee)}{' '}
                        <span className="text-[10px] font-mono text-zinc-300">INR</span>
                      </div>
                      <p className="text-[10px] font-mono text-zinc-400 leading-snug pt-0.5">
                        {activeSneakPeek}
                      </p>
                    </div>
                  </div>

                  {/* Interactive Solo vs Group CXO Selector (Track 01 Only) */}
                  {isDiagnostic && (
                    <div className="p-3 bg-[#faf6ee] border border-[#d4af37]/70 rounded-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase text-[#9d7b38] font-black flex items-center gap-1">
                          <Users className="w-3 h-3 text-[#9d7b38]" />
                          <span>Select Assessment Scope</span>
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-1 bg-[#ede5d6] p-1 rounded-xs">
                        {DIAGNOSTIC_COHORT_OPTIONS.map((opt) => {
                          const active = diagnosticCohortId === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => setDiagnosticCohortId(opt.id)}
                              className={`py-1.5 px-1.5 text-[10px] font-mono font-bold uppercase rounded-2xs transition-colors cursor-pointer whitespace-nowrap ${
                                active
                                  ? 'bg-[#141416] text-[#d4af37]'
                                  : 'text-[#4e5159] hover:text-[#17181c]'
                              }`}
                            >
                              {opt.shortLabel}
                            </button>
                          );
                        })}
                      </div>

                      <div className="text-[10px] font-mono text-[#4e5159] leading-snug">
                        {selectedDiagnosticCohort.scopeNote}
                      </div>
                    </div>
                  )}

                  {/* Interactive Retainer Instalment Selector (Track 03 Only) */}
                  {isRetainer && (
                    <div className="p-3 bg-[#faf6ee] border border-[#d4af37]/70 rounded-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase text-[#9d7b38] font-black flex items-center gap-1">
                          <CalendarClock className="w-3 h-3 text-[#9d7b38]" />
                          <span>Choose Retainer Payment Plan</span>
                        </span>
                        <span className="text-[10px] font-mono text-[#17181c] font-bold">
                          0% Interest
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-1 bg-[#ede5d6] p-1 rounded-xs">
                        {RETAINER_INSTALMENT_OPTIONS.map((opt) => {
                          const active = retainerPlanId === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => setRetainerPlanId(opt.id)}
                              className={`py-1.5 px-1 text-[10px] font-mono font-bold uppercase rounded-2xs transition-colors cursor-pointer whitespace-nowrap ${
                                active
                                  ? 'bg-[#141416] text-[#d4af37]'
                                  : 'text-[#4e5159] hover:text-[#17181c]'
                              }`}
                            >
                              {opt.shortLabel}
                            </button>
                          );
                        })}
                      </div>

                      <div className="space-y-0.5 text-[11px] font-mono">
                        <div className="flex items-center justify-between">
                          <span className="text-[#4e5159]">Due Today (Ex-GST):</span>
                          <span className="font-bold text-[#9d7b38] tabular-nums">
                            {formatExactAmount(selectedRetainerPlan.payNowINR)}
                          </span>
                        </div>
                        <div className="text-[10px] text-[#17181c] font-semibold">
                          {selectedRetainerPlan.scheduleSummary}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Guaranteed Outcome for Track 02 */}
                  {isEmbedding && (
                    <div className="p-3 bg-[#faf8f4] border border-[#e2d8c9] rounded-xs space-y-1">
                      <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-[#9d7b38] font-bold">
                        <Zap className="w-3 h-3 text-[#9d7b38]" />
                        <span>Guaranteed Operating Outcome</span>
                      </div>
                      <p className="text-xs text-[#17181c] font-medium leading-relaxed">
                        {model.theOutcome}
                      </p>
                    </div>
                  )}

                  {/* Key Deliverables */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-mono uppercase text-[#9d7b38] font-bold tracking-wider block">
                      Included Deliverables
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

                  {/* Exact Deposit vs Balance Schedule */}
                  {!isRetainer && (
                    <div className="pt-2.5 border-t border-[#ebdcc0] space-y-1 text-xs font-mono">
                      <div className="flex items-center justify-between">
                        <span className="text-[#6b6e76] uppercase text-[10px]">
                          Kickoff Deposit ({activeDepositPercent}%):
                        </span>
                        <span className="font-bold text-[#9d7b38] tabular-nums">
                          {formatExactAmount(activeDepositINR)} INR
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-[#4e5159] gap-2">
                        <span className="shrink-0">Remaining Balance:</span>
                        <span className="font-semibold text-[#17181c] text-right">
                          {activeBalanceSchedule}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Bottom Buttons */}
                <div className="p-5 pt-0 space-y-2">
                  <button
                    type="button"
                    onClick={() => handlePayTrackDeposit(model)}
                    className="w-full py-2.5 px-3 bg-[#17181c] hover:bg-[#282a30] text-[#f8f6f0] font-bold text-xs font-mono uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer border border-[#d4af37]/40"
                  >
                    <CreditCard className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                    <span className="truncate">
                      {isRetainer
                        ? `Pay ${selectedRetainerPlan.shortLabel} · ${formatExactAmount(selectedRetainerPlan.payNowINR)}`
                        : `Lock ${activeDepositPercent}% Deposit · ${formatExactAmount(activeDepositINR)}`}
                    </span>
                  </button>

                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleSelect(model)}
                      className="w-full py-2 px-2 bg-white hover:bg-stone-100 text-[#17181c] text-[11px] font-mono uppercase font-bold rounded-xs border border-stone-300 transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>Inquire First</span>
                      <ArrowRight className="w-3 h-3 text-[#9d7b38]" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowSpecModal(model)}
                      className="w-full py-2 px-2 bg-[#faf8f4] hover:bg-[#ede5d6] text-[#17181c] text-[11px] font-mono uppercase font-bold rounded-xs border border-[#d8cebe] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <Download className="w-3 h-3 text-[#9d7b38]" />
                      <span>Fee &amp; Scope</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Concise International Custom Mandate Strip */}
        <div className="mb-5 px-4 py-3 rounded-md bg-white border border-[#d8cebe] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
          <div className="flex items-start sm:items-center gap-2 text-xs text-[#3f424a]">
            <Globe className="w-4 h-4 text-[#9d7b38] shrink-0 mt-0.5 sm:mt-0" />
            <span>
              <strong className="text-[#17181c]">Outside India (USD / EUR / GBP / AED):</strong>{' '}
              International settlements include automatic FX conversion at checkout or custom cross-border mandate scoping.
            </span>
          </div>
          <button
            type="button"
            onClick={() => handleSelect(PARTNERSHIP_PATHWAYS[1])}
            className="text-[11px] font-mono font-bold uppercase text-[#9d7b38] hover:text-[#17181c] inline-flex items-center gap-1 cursor-pointer shrink-0"
          >
            <span>Request Custom Quote</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Advisory Board Conclave Strip */}
        <div
          id="council-feature"
          className="p-5 rounded-md bg-[#141416] text-white border border-[#d4af37] shadow-md flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left"
        >
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase text-[#d4af37] font-bold">
              <Sparkles className="w-3 h-3 text-[#d4af37]" />
              <span>
                Executive Advisory Board Seat · {formatExactAmount(CONCLAVE_SEAT_PRICE_INR)} INR (Ex-GST)
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-bold font-serif text-[#f4ecd8]">
              Closed-Door CEO Sparring Conclaves Across Mumbai, Bengaluru, Dubai &amp; London
            </h4>
            <p className="text-xs text-zinc-300 max-w-2xl font-mono">
              {CONCLAVE_SNEAK_PEEK} = <strong className="text-[#d4af37]">{formatExactAmount(CONCLAVE_SEAT_PRICE_INR)}</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 shrink-0">
            <button
              type="button"
              onClick={handlePayConclaveSeat}
              className="px-4 py-2.5 bg-[#d4af37] hover:bg-[#e3c04f] text-[#141416] font-black text-xs uppercase tracking-wider rounded-xs font-mono cursor-pointer whitespace-nowrap flex items-center gap-1.5"
            >
              <CreditCard className="w-3.5 h-3.5 text-[#141416]" />
              <span>Reserve Seat · {formatExactAmount(CONCLAVE_SEAT_PRICE_INR)}</span>
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

      {/* SPEC & FEE MODAL */}
      {showSpecModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-2xs p-4 overflow-y-auto">
          <div className="bg-white border-2 border-[#17181c] rounded-md max-w-xl w-full p-5 sm:p-6 shadow-2xl space-y-4 my-8 animate-in fade-in duration-200 text-[#17181c]">
            <div className="flex items-start justify-between border-b border-[#d8cebe] pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#9d7b38] font-black">
                  Fee &amp; Scope Overview · Track {showSpecModal.tierNumber}
                </span>
                <h3 className="text-lg font-bold font-serif text-[#17181c] mt-0.5">
                  {showSpecModal.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSpecModal(null)}
                className="text-[#17181c] hover:text-rose-700 text-xl font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-[#17181c] max-h-[60vh] overflow-y-auto pr-1">
              <div className="p-3 bg-[#141416] text-white border border-[#d4af37] rounded-xs space-y-1 font-mono">
                <div className="flex justify-between">
                  <span className="text-[#d4af37] font-bold">Total Mandate Fee (Ex-GST):</span>
                  <span className="text-[#d4af37] font-bold tabular-nums">
                    {formatExactAmount(
                      showSpecModal.id === 'diagnostic'
                        ? selectedDiagnosticCohort.fullFeeINR
                        : TRACK_PRICING[showSpecModal.id].fullFeeINR
                    )}{' '}
                    INR
                  </span>
                </div>
                <div className="text-[10px] text-zinc-400">
                  {showSpecModal.id === 'diagnostic'
                    ? selectedDiagnosticCohort.sneakPeek
                    : TRACK_PRICING[showSpecModal.id].sneakPeek}
                </div>
                {showSpecModal.id === 'retainer' ? (
                  <>
                    <div className="flex justify-between text-zinc-300 pt-1">
                      <span>Selected Instalment Plan:</span>
                      <span className="text-[#f3e5ab] font-bold">
                        {selectedRetainerPlan.shortLabel} ({formatExactAmount(selectedRetainerPlan.payNowINR)})
                      </span>
                    </div>
                    <div className="flex justify-between text-zinc-300">
                      <span>Instalment Schedule:</span>
                      <span className="text-right">{selectedRetainerPlan.scheduleSummary}</span>
                    </div>
                  </>
                ) : showSpecModal.id === 'diagnostic' ? (
                  <>
                    <div className="flex justify-between text-zinc-300 pt-1">
                      <span>Selected Diagnostic Tier:</span>
                      <span className="text-[#f3e5ab] font-bold">
                        {selectedDiagnosticCohort.shortLabel}
                      </span>
                    </div>
                    <div className="flex justify-between text-zinc-300">
                      <span>Kickoff Deposit ({selectedDiagnosticCohort.depositPercent}%):</span>
                      <span className="tabular-nums">
                        {formatExactAmount(selectedDiagnosticCohort.depositINR)} INR
                      </span>
                    </div>
                    <div className="flex justify-between text-zinc-300">
                      <span>Remaining Balance:</span>
                      <span className="text-right">{selectedDiagnosticCohort.balanceSchedule}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between text-zinc-300 pt-1">
                      <span>Kickoff Deposit ({TRACK_PRICING[showSpecModal.id].depositPercent}%):</span>
                      <span className="tabular-nums">
                        {formatExactAmount(TRACK_PRICING[showSpecModal.id].depositINR)} INR
                      </span>
                    </div>
                    <div className="flex justify-between text-zinc-300">
                      <span>Remaining Balance:</span>
                      <span className="text-right">{TRACK_PRICING[showSpecModal.id].balanceSchedule}</span>
                    </div>
                  </>
                )}
              </div>

              {showSpecModal.id === 'diagnostic' && (
                <div className="p-3 bg-[#faf6ee] border border-[#d4af37]/70 rounded-xs space-y-2">
                  <strong className="text-[#9d7b38] block text-[11px] font-mono uppercase">
                    Select Solo CEO vs. Group CXO Cohort (3+ CXOs)
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
                              {opt.sneakPeek}
                            </div>
                          </div>
                          <span
                            className={`text-xs font-mono font-bold tabular-nums shrink-0 ${
                              active ? 'text-[#d4af37]' : 'text-[#9d7b38]'
                            }`}
                          >
                            {formatExactAmount(opt.fullFeeINR)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {showSpecModal.id === 'retainer' && (
                <div className="p-3 bg-[#faf6ee] border border-[#d4af37]/70 rounded-xs space-y-2">
                  <strong className="text-[#9d7b38] block text-[11px] font-mono uppercase">
                    Select Retainer Instalment Structure (0% Financing)
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
                              className={`text-[11px] font-mono ${
                                active ? 'text-zinc-300' : 'text-[#4e5159]'
                              }`}
                            >
                              {opt.scheduleSummary}
                            </div>
                          </div>
                          <span
                            className={`text-xs font-mono font-bold tabular-nums shrink-0 ${
                              active ? 'text-[#d4af37]' : 'text-[#9d7b38]'
                            }`}
                          >
                            {formatExactAmount(opt.payNowINR)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div>
                <strong className="text-[#9d7b38] block text-[11px] font-mono uppercase mb-1.5">
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
              <span className="text-xs font-mono font-bold text-[#9d7b38]">
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
                    handlePayTrackDeposit(m);
                  }}
                  className="px-3.5 py-1.5 bg-[#d4af37] hover:bg-[#e3c04f] text-[#141416] text-xs font-black uppercase font-mono rounded-xs cursor-pointer flex items-center gap-1.5"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>
                    {showSpecModal.id === 'retainer'
                      ? `Pay ${selectedRetainerPlan.shortLabel} · ${formatExactAmount(selectedRetainerPlan.payNowINR)}`
                      : showSpecModal.id === 'diagnostic'
                      ? `Pay ${selectedDiagnosticCohort.depositPercent}% Deposit · ${formatExactAmount(selectedDiagnosticCohort.depositINR)}`
                      : `Pay ${TRACK_PRICING[showSpecModal.id].depositPercent}% Deposit · ${formatExactAmount(TRACK_PRICING[showSpecModal.id].depositINR)}`}
                  </span>
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
      />
    </section>
  );
};
