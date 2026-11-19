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
} from 'lucide-react';
import { PaymentModal, PaymentItem } from './payment/PaymentModal';
import { formatExactAmount } from '../utils/pricing';

interface PathwaysProps {
  onSelectModel: (modelId: PartnershipModelId) => void;
  onOpenConsultationWithModel: (model: PartnershipPathway) => void;
  selectedModelId?: PartnershipModelId;
}

export interface ExactTrackPricing {
  fullFeeUSD: number;
  cadenceUnit: string;
  formulaBreakdown: string;
  depositPercent: number;
  depositUSD: number;
  balanceUSD: number;
  balanceSchedule: string;
}

const TRACK_PRICING: Record<PartnershipModelId, ExactTrackPricing> = {
  diagnostic: {
    fullFeeUSD: 9650.00,
    cadenceUnit: '14-Day Engagement',
    formulaBreakdown: '22 hrs forensic audit @ $385.00/hr ($8,470.00) + 1 Executive Board session ($1,180.00)',
    depositPercent: 25,
    depositUSD: 2412.50,
    balanceUSD: 7237.50,
    balanceSchedule: '$7,237.50 due upon engagement kickoff',
  },
  embedding: {
    fullFeeUSD: 31680.00,
    cadenceUnit: '90-Day Engagement',
    formulaBreakdown: '64 hrs systems engineering @ $395.00/hr ($25,280.00) + Charter ($3,440.00) + Absence Test ($2,960.00)',
    depositPercent: 20,
    depositUSD: 6336.00,
    balanceUSD: 25344.00,
    balanceSchedule: '2 × $12,672.00 milestones (Day 30 & Day 60)',
  },
  retainer: {
    fullFeeUSD: 17850.00,
    cadenceUnit: 'Per Quarter ($71,400.00/yr)',
    formulaBreakdown: '14 hrs/mo direct Fractional COO counsel @ $425.00/hr ($5,950.00/mo × 3 mos)',
    depositPercent: 30,
    depositUSD: 5355.00,
    balanceUSD: 12495.00,
    balanceSchedule: '$12,495.00 billed at quarterly commencement',
  },
};

export const PARTNERSHIP_PATHWAYS: PartnershipPathway[] = [
  {
    id: 'diagnostic',
    tierNumber: '01',
    name: 'Mandate Forensic Diagnostic',
    tagline: 'You cannot fix what you refuse to name.',
    investmentAnchor: '$9,650.00 Total · $2,412.50 Deposit',
    cadence: '14-Day Rapid Audit',
    thePain:
      'Decisions take weeks of defensive committee slide decks. Latent tension between CEO and leadership stalls execution while competitors move.',
    theDesire:
      'An objective empirical mirror with zero political baggage that brings unspoken friction into sharp, actionable focus.',
    theOutcome:
      'An indisputable map of who owns what decision, where execution is leaking, and the exact 3 structural interventions to unblock velocity.',
    deliverables: [
      '22 Hours Forensic Decision & Calendar Audit ($8,470.00)',
      'Founder Dependency Friction Matrix & Territory Map',
      '14-Day Executive Intervention Blueprint',
      'Closed-Door CEO & Board Debrief with Suchita Sancheti ($1,180.00)',
    ],
    idealClient: 'Boards and CEOs preparing for an inflection point or resolving structural friction.',
  },
  {
    id: 'embedding',
    tierNumber: '02',
    name: 'Operating Architecture Embedding',
    tagline: 'Velocity is a structural choice. We build the machinery.',
    investmentAnchor: '$31,680.00 Total · $6,336.00 Deposit',
    cadence: '90-Day Transformation Runway',
    thePain:
      'Org chart reorganizations changed nothing. Senior leaders still hedge bets, seek endless consensus, and defer hard choices across redundant meetings.',
    theDesire:
      'An operating system that runs autonomously, where executives own their decisions with conviction and ship initiatives without routine sign-offs.',
    theOutcome:
      'We embed inside your executive cadence for 90 days. We dismantle consensus meetings, codify authority matrices, and install 14-day execution loops.',
    deliverables: [
      '64 Hours Direct Embedded Architecture Engineering ($25,280.00)',
      'Authority Decoupling Charter & Capital Limits ($3,440.00)',
      '14-Day Execution Loops Replacing 70% of Syncs',
      'Live 30-Day Absence Validation Sprint & Clean Day-90 Exit ($2,960.00)',
    ],
    idealClient: 'Growth-stage CEOs and multi-unit leadership teams scaling past founder bottlenecks.',
  },
  {
    id: 'retainer',
    tierNumber: '03',
    name: 'Fractional COO & Strategic Retainer',
    tagline: 'The private counsel leaders turn to when stakes are existential.',
    investmentAnchor: '$17,850.00 / Qtr · $5,355.00 Lock',
    cadence: 'Quarterly Fractional COO Mandate',
    thePain:
      'At the top, there is no one you can safely think aloud with. When succession fractures, M&A hits friction, or growth accelerates, you carry it alone.',
    theDesire:
      'An uncompromising peer in your corner with no equity agenda and the operating spine to enforce execution.',
    theOutcome:
      'Continuous on-call Fractional COO counsel with Suchita Sancheti covering succession governance, M&A integration, and high-stakes decisions.',
    deliverables: [
      '14 Hours/Month Direct Senior Counsel @ $425.00/hr ($17,850.00/qtr)',
      'Executive Advisory Board Annual Seat Across Global Conclaves',
      '4-Hour Emergency War Room Response Guarantee',
      'Quarterly In-Camera Succession & Operating Audits',
    ],
    idealClient: 'Enterprise CEOs, Board Chairs, and Founders navigating scale and leadership transitions.',
  },
];

const CONCLAVE_BREAKDOWN = {
  roundtable: 1120.00,
  preBriefing: 445.00,
  dossier: 220.00,
  total: 1785.00,
};

export const PartnershipPathways: React.FC<PathwaysProps> = ({
  onSelectModel,
  onOpenConsultationWithModel,
  selectedModelId = 'embedding',
}) => {
  const [, setActiveModelId] = useState<PartnershipModelId>(selectedModelId);
  const [showSpecModal, setShowSpecModal] = useState<PartnershipPathway | null>(null);
  const [activePaymentItem, setActivePaymentItem] = useState<PaymentItem | null>(null);

  const handleSelect = (model: PartnershipPathway) => {
    setActiveModelId(model.id);
    onSelectModel(model.id);
    onOpenConsultationWithModel(model);
  };

  const handlePayTrackDeposit = (model: PartnershipPathway) => {
    const pricing = TRACK_PRICING[model.id];
    setActivePaymentItem({
      id: `mandate-deposit-${model.id}`,
      title: `${model.name} — ${pricing.depositPercent}% Reservation Deposit`,
      subtitle: `${pricing.formulaBreakdown}. Full Mandate: ${formatExactAmount(pricing.fullFeeUSD)} USD | ${pricing.balanceSchedule}.`,
      priceUSD: pricing.depositUSD,
      category: 'retainer_deposit',
      deliverables: model.deliverables,
    });
  };

  const handlePayConclaveSeat = () => {
    setActivePaymentItem({
      id: 'conclave-seat-reservation',
      title: 'The Executive Advisory Board — Delegate Seat',
      subtitle: `Full-day Roundtable (${formatExactAmount(CONCLAVE_BREAKDOWN.roundtable)}) + 90-Min Pre-Briefing (${formatExactAmount(CONCLAVE_BREAKDOWN.preBriefing)}) + Strategic Dossier (${formatExactAmount(CONCLAVE_BREAKDOWN.dossier)}) = ${formatExactAmount(CONCLAVE_BREAKDOWN.total)}`,
      priceUSD: CONCLAVE_BREAKDOWN.total,
      category: 'conclave_seat',
      deliverables: [
        `Chatham House Closed-Door Roundtable (${formatExactAmount(CONCLAVE_BREAKDOWN.roundtable)})`,
        `90-Min Private Pre-Briefing with Suchita Sancheti (${formatExactAmount(CONCLAVE_BREAKDOWN.preBriefing)})`,
        `Confidential Strategic Peer Review Dossier (${formatExactAmount(CONCLAVE_BREAKDOWN.dossier)})`,
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
            <span>Exact Calculated Fee Schedule · Three Execution Tracks</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#17181c] leading-tight">
            How Leaders Partner With Us — <span className="text-[#9d7b38]">Transparent Fixed Pricing</span>
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-[#4e5159] leading-relaxed">
            Every mandate fee is itemized down to exact engineering hours, deliverables, and percentage-based kickoff deposits—zero opaque hourly padding or rounded guesswork.
          </p>
        </div>

        {/* 3 Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch mb-6">
          {PARTNERSHIP_PATHWAYS.map((model) => {
            const isEmbedding = model.id === 'embedding';
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
                {isEmbedding && (
                  <div className="bg-[#17181c] text-[#d4af37] text-[10px] font-mono uppercase font-black tracking-wider px-4 py-1.5 rounded-t-sm flex items-center justify-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-[#d4af37]" />
                    <span>FLAGSHIP 90-DAY TRANSFORMATION</span>
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

                    {/* Exact Fee Calculation Box */}
                    <div className="mt-3 p-3.5 bg-[#141416] text-white rounded-xs border border-[#d4af37]/60 space-y-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-[10px] font-mono uppercase text-[#d4af37] font-bold">
                          Total Mandate Fee
                        </span>
                        <span className="text-xs font-mono text-zinc-300">{pricing.cadenceUnit}</span>
                      </div>
                      <div className="text-2xl font-black text-[#d4af37] tabular-nums">
                        {formatExactAmount(pricing.fullFeeUSD)} <span className="text-xs font-mono text-zinc-300">USD</span>
                      </div>
                      <p className="text-[11px] font-mono text-zinc-300 leading-snug pt-0.5">
                        {pricing.formulaBreakdown}
                      </p>
                    </div>
                  </div>

                  {/* Guaranteed Outcome */}
                  <div className="p-3 bg-[#faf8f4] border border-[#e2d8c9] rounded-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-[#9d7b38] font-bold">
                      <Zap className="w-3 h-3 text-[#9d7b38]" />
                      <span>Guaranteed Operating Outcome</span>
                    </div>
                    <p className="text-xs text-[#17181c] font-medium leading-relaxed">
                      {model.theOutcome}
                    </p>
                  </div>

                  {/* Key Deliverables */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-mono uppercase text-[#9d7b38] font-bold tracking-wider block">
                      Itemized Deliverables
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
                  <div className="pt-2.5 border-t border-[#ebdcc0] space-y-1 text-xs font-mono">
                    <div className="flex items-center justify-between">
                      <span className="text-[#6b6e76] uppercase text-[10px]">
                        Kickoff Deposit ({pricing.depositPercent}%):
                      </span>
                      <span className="font-black text-[#9d7b38] tabular-nums">
                        {formatExactAmount(pricing.depositUSD)} USD
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-[#4e5159]">
                      <span>Remaining Balance:</span>
                      <span className="font-semibold text-[#17181c]">{pricing.balanceSchedule}</span>
                    </div>
                  </div>
                </div>

                {/* Bottom Buttons */}
                <div className="p-5 pt-0 space-y-2">
                  <button
                    type="button"
                    onClick={() => handlePayTrackDeposit(model)}
                    className="w-full py-2.5 px-3 bg-[#17181c] hover:bg-[#282a30] text-[#f8f6f0] font-bold text-xs font-mono uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <CreditCard className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>
                      Lock {pricing.depositPercent}% Deposit · {formatExactAmount(pricing.depositUSD)}
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
                      <span>Fee & Scope</span>
                    </button>
                  </div>
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
              <span>
                Executive Advisory Board Seat · {formatExactAmount(CONCLAVE_BREAKDOWN.total)} USD
              </span>
            </div>
            <h4 className="text-base sm:text-lg font-bold font-serif text-[#f4ecd8]">
              Closed-Door CEO Sparring Conclaves Across Zurich, London & New York
            </h4>
            <p className="text-xs text-zinc-300 max-w-2xl font-mono">
              Exact Seat Breakdown: Roundtable ({formatExactAmount(CONCLAVE_BREAKDOWN.roundtable)}) + 90-Min Pre-Briefing ({formatExactAmount(CONCLAVE_BREAKDOWN.preBriefing)}) + Peer Dossier ({formatExactAmount(CONCLAVE_BREAKDOWN.dossier)}) ={' '}
              <strong className="text-[#d4af37]">{formatExactAmount(CONCLAVE_BREAKDOWN.total)}</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 shrink-0">
            <button
              type="button"
              onClick={handlePayConclaveSeat}
              className="px-4 py-2.5 bg-[#d4af37] hover:bg-[#e3c04f] text-[#141416] font-black text-xs uppercase tracking-wider rounded-xs font-mono cursor-pointer whitespace-nowrap flex items-center gap-1.5"
            >
              <CreditCard className="w-3.5 h-3.5 text-[#141416]" />
              <span>Reserve Seat · {formatExactAmount(CONCLAVE_BREAKDOWN.total)}</span>
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
                  Fee Breakdown & Scope · Track {showSpecModal.tierNumber}
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
                  <span className="text-[#d4af37] font-bold">Total Mandate Fee:</span>
                  <span className="text-[#d4af37] font-black">
                    {formatExactAmount(TRACK_PRICING[showSpecModal.id].fullFeeUSD)} USD
                  </span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span>Kickoff Deposit ({TRACK_PRICING[showSpecModal.id].depositPercent}%):</span>
                  <span>{formatExactAmount(TRACK_PRICING[showSpecModal.id].depositUSD)} USD</span>
                </div>
                <div className="flex justify-between text-zinc-300">
                  <span>Remaining Balance:</span>
                  <span>{TRACK_PRICING[showSpecModal.id].balanceSchedule}</span>
                </div>
              </div>

              <div className="p-3 bg-[#faf8f4] border border-[#d8cebe] rounded-xs space-y-1">
                <strong className="text-[#9d7b38] block text-[11px] font-mono uppercase">
                  Calculation Formula
                </strong>
                <p>{TRACK_PRICING[showSpecModal.id].formulaBreakdown}</p>
              </div>

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
                    Pay {TRACK_PRICING[showSpecModal.id].depositPercent}% Deposit ·{' '}
                    {formatExactAmount(TRACK_PRICING[showSpecModal.id].depositUSD)}
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
