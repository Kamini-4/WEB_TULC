import React, { useState } from 'react';
import { PartnershipPathway, PartnershipModelId } from '../types';
import { ArrowRight, CheckCircle2, Download, ShieldCheck, Flame, Compass, Zap, Sparkles, Check, X } from 'lucide-react';

interface PathwaysProps {
  onSelectModel: (modelId: PartnershipModelId) => void;
  onOpenConsultationWithModel: (model: PartnershipPathway) => void;
  selectedModelId?: PartnershipModelId;
}

export const PARTNERSHIP_PATHWAYS: PartnershipPathway[] = [
  {
    id: 'diagnostic',
    tierNumber: '01',
    name: 'Mandate Forensic Diagnostic',
    tagline: 'You cannot fix what you refuse to name.',
    investmentAnchor: 'Forensic Mandate Audit',
    cadence: '14-Day Rapid Audit',
    thePain: 'Decisions take weeks of defensive committee slide decks. Latent tension between the CEO and the board chair stalls execution while competitors move.',
    theDesire: 'An objective empirical mirror with zero political baggage that brings unspoken friction into sharp, actionable focus.',
    theOutcome: 'An indisputable map of who owns what decision, where execution is leaking, and the exact 3 structural interventions to unblock enterprise velocity.',
    deliverables: [
      'The Council Chambers Taste: 1 Closed-Door Conclave Sparring Session',
      'Sovereign Authority Friction Matrix: Isolating decision logjams',
      'Board-to-C-Suite Territory Map: Ending back-channel politicking',
      '14-Day Executive Intervention Blueprint: Immediate remedies for CEO',
      'In-Camera Board Audit Presentation with Suchita Sancheti'
    ],
    idealClient: 'Boards and CEOs preparing for an inflection point or resolving structural friction.'
  },
  {
    id: 'embedding',
    tierNumber: '02',
    name: 'Operating Architecture Embedding',
    tagline: 'Velocity is a structural choice. We build the machinery.',
    investmentAnchor: 'In-Situ Operating Overhaul',
    cadence: '90-Day Transformation Runway',
    thePain: 'Org chart reorganizations changed nothing. Senior leaders still hedge bets, seek endless consensus, and defer hard choices across redundant meetings.',
    theDesire: 'An operating system that runs autonomously, where executives own their decisions with conviction and drive initiatives without routine sign-offs.',
    theOutcome: 'We embed inside your executive cadence for 90 days. We tear out consensus meetings, codify authority matrices, and install 14-day execution loops.',
    deliverables: [
      'Full Strategic Council Chambers Access: Annual syndicate seat across Zurich, London & NY',
      'Authority Decoupling Charter: Sovereign decision boundaries ratified by the Board',
      '14-Day Executive Loop Installation: Replacing 70% of committee meetings',
      'C-Suite Sparring Cadence: Live coaching on decisive mandate execution',
      'Definitive 90-Day Exit: Permanent operating infrastructure left in place'
    ],
    idealClient: 'Multi-divisional enterprise boards suffering from consensus gridlock and executive fatigue.'
  },
  {
    id: 'retainer',
    tierNumber: '03',
    name: 'The Sovereign Retainer',
    tagline: 'The private counsel leaders turn to when the stakes are existential.',
    investmentAnchor: 'Senior Sovereign Retainer',
    cadence: 'Annual Sovereign Mandate',
    thePain: 'At the top, there is no one you can safely think aloud with. When an activist appears, succession fractures, or M&A stalls, you are on your own.',
    theDesire: 'An uncompromising peer in your corner with no equity stake, no political agenda, and the institutional spine to say what others fear to utter.',
    theOutcome: 'Continuous on-call strategic sparring for the CEO and Board Chair with Suchita Sancheti through activist defense, succession, and high-stakes transitions.',
    deliverables: [
      'Full Strategic Council Chambers Access: Year-round sovereign conclave seat',
      'Unrestricted direct 24/7 access to Suchita Sancheti for Chair & CEO',
      'Emergency War Room Mobilization within 4 hours for unexpected crises',
      'Quarterly In-Camera Board Sparring Sessions challenging strategy early',
      'Executive Succession & Key-Person Decoupling Governance Oversight'
    ],
    idealClient: 'Enterprise CEOs, Board Chairs, and Sovereign Trustees navigating high-stakes transitions.'
  }
];

export const PartnershipPathways: React.FC<PathwaysProps> = ({
  onSelectModel,
  onOpenConsultationWithModel,
  selectedModelId = 'embedding'
}) => {
  const [activeModelId, setActiveModelId] = useState<PartnershipModelId>(selectedModelId);
  const [showSpecModal, setShowSpecModal] = useState<PartnershipPathway | null>(null);

  const handleSelect = (model: PartnershipPathway) => {
    setActiveModelId(model.id);
    onSelectModel(model.id);
    onOpenConsultationWithModel(model);
  };

  return (
    <section id="partnerships" className="py-5 sm:py-7 border-b border-[#dfd7c8] bg-[#f2ede2] relative">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-4 sm:mb-5">
          <div className="flex items-center gap-2 text-xs uppercase text-[#9d7b38] font-bold mb-1">
            <ShieldCheck className="w-4 h-4 text-[#9d7b38]" />
            <span className="text-black font-black">Three Sovereign Advisory Tracks</span>
            <span aria-hidden="true" className="text-[#c9bea9]">·</span>
            <span>Side-by-Side Comparison</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-black leading-tight">
            How Leaders Partner With Us.
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-zinc-900 leading-snug">
            We do not sell hours or deliver shelf-ware. Choose the rectangular engagement track that matches your enterprise reality.
          </p>
        </div>

        {/* 3 RECTANGULAR SERVICE CARDS PLACED SIDE BY SIDE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 items-stretch mb-6">
          {PARTNERSHIP_PATHWAYS.map((model) => {
            const isEmbedding = model.id === 'embedding';
            const isRetainer = model.id === 'retainer';
            const isSelected = model.id === activeModelId;

            return (
              <div
                key={model.id}
                className={`bg-white rounded-lg flex flex-col justify-between transition-all duration-200 relative shadow-2xs hover:shadow-md ${
                  isEmbedding
                    ? 'border-2 border-black ring-2 ring-[#d4af37]/30'
                    : 'border-2 border-[#d8cebe] hover:border-black'
                }`}
              >
                {/* Recommended Badge on Flagship Track 02 */}
                {isEmbedding && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-[#d4af37] text-[10px] font-mono uppercase font-black tracking-wider px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1 whitespace-nowrap">
                    <Sparkles className="w-2.5 h-2.5 text-[#d4af37]" />
                    <span>CORE 90-DAY TRANSFORMATION</span>
                  </div>
                )}

                <div className="p-4 sm:p-5 space-y-3.5 flex-1 flex flex-col justify-between">
                  
                  {/* Top Row: Track Number & Cadence */}
                  <div>
                    <div className="flex items-center justify-between border-b border-[#ebdcc0] pb-2 mb-2.5">
                      <span className="text-xs font-mono font-black text-[#9d7b38] uppercase tracking-wider">
                        {isRetainer ? 'Track 03 · Retainer' : `Track ${model.tierNumber}`}
                      </span>
                      <span className="text-[11px] font-mono font-bold text-black bg-[#faf8f4] border border-[#d8cebe] px-2 py-0.5 rounded-xs">
                        {model.cadence}
                      </span>
                    </div>

                    {/* Title & Tagline in Jet Black */}
                    <div className="space-y-0.5">
                      <h3 className="text-lg sm:text-xl font-black text-black leading-snug">
                        {model.name}
                      </h3>
                      <p className="text-xs text-black italic font-serif leading-relaxed">
                        "{model.tagline}"
                      </p>
                    </div>
                  </div>

                  {/* Rectangular Outcome Box */}
                  <div className="p-3 bg-[#faf8f4] border border-[#e2d8c9] rounded-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-[#9d7b38] font-bold">
                      <Zap className="w-3 h-3 text-[#9d7b38]" />
                      <span>Guaranteed Sovereign Outcome:</span>
                    </div>
                    <p className="text-xs text-black font-medium leading-relaxed">
                      {model.theOutcome}
                    </p>
                  </div>

                  {/* The Problem It Solves */}
                  <div className="space-y-1 text-xs text-zinc-900">
                    <span className="text-[10px] font-mono uppercase font-black text-rose-800 tracking-wider block">
                      Friction It Dismantles:
                    </span>
                    <p className="leading-snug">
                      {model.thePain}
                    </p>
                  </div>

                  {/* Key Deliverables */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-mono uppercase text-black font-black tracking-wider block">
                      Specific Inclusions:
                    </span>
                    <ul className="space-y-1.5 text-xs text-black">
                      {model.deliverables.slice(0, 4).map((del, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#9d7b38] shrink-0 mt-0.5" />
                          <span className="text-black font-medium leading-snug">{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Investment Anchor Label */}
                  <div className="pt-2 border-t border-[#ebdcc0] flex items-center justify-between text-xs">
                    <span className="font-mono text-zinc-600 uppercase text-[10px]">
                      Mandate Format:
                    </span>
                    <span className="font-bold text-black font-mono">
                      {model.investmentAnchor}
                    </span>
                  </div>

                </div>

                {/* Bottom Card Action Buttons */}
                <div className="p-4 sm:p-5 pt-0 border-t border-[#f0ede6] space-y-2">
                  <button
                    onClick={() => handleSelect(model)}
                    className={`w-full py-2.5 px-3 font-black text-xs font-mono uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-98 ${
                      isEmbedding
                        ? 'bg-black text-white hover:bg-zinc-800'
                        : isRetainer
                        ? 'bg-[#17181c] text-[#f8f6f0] hover:bg-black border border-[#d4af37]/60'
                        : 'bg-black text-white hover:bg-zinc-800'
                    }`}
                  >
                    <span>Initiate {model.name.split(' ')[0]} Track</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#d4af37]" />
                  </button>

                  <button
                    onClick={() => setShowSpecModal(model)}
                    className="w-full py-1.5 px-2 bg-[#faf8f4] hover:bg-[#ede5d6] text-black text-[11px] font-mono uppercase font-bold rounded-xs border border-[#d8cebe] transition-colors flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <Download className="w-3 h-3 text-[#9d7b38]" />
                    <span>View Detailed Spec Docket</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Compact Council Chamber Capability Strip */}
        <div id="council-feature" className="p-4 sm:p-5 rounded-lg bg-black text-white border-2 border-[#d4af37] shadow-md flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <div className="space-y-0.5">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase text-[#d4af37] font-bold">
              <Sparkles className="w-3 h-3 text-[#d4af37]" />
              <span>Elite Sovereign Capability · Off-Site Executive Conclave</span>
            </div>
            <h4 className="text-sm sm:text-base font-black text-[#f4ecd8]">
              The Sovereign Council Chamber™: Closed-Door Conclaves Across Zurich, London & NY
            </h4>
            <p className="text-xs text-zinc-300 max-w-2xl">
              Confidential peer cross-examination where enterprise founders stress-test high-consequence moves under Chatham House privacy.
            </p>
          </div>

          <button
            onClick={() => {
              const retainer = PARTNERSHIP_PATHWAYS.find(p => p.id === 'retainer') || PARTNERSHIP_PATHWAYS[0];
              onOpenConsultationWithModel(retainer);
            }}
            className="px-4 py-2 bg-gradient-to-r from-[#d4af37] via-[#f5e6b3] to-[#d4af37] text-black font-black text-xs uppercase tracking-wider rounded-xs font-mono shrink-0 cursor-pointer shadow-xs whitespace-nowrap"
          >
            <span>Inquire for Conclave Seat</span>
          </button>
        </div>

      </div>

      {/* SPEC DOCKET MODAL */}
      {showSpecModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-2xs p-4 overflow-y-auto">
          <div className="bg-white border-2 border-black rounded-lg max-w-xl w-full p-5 sm:p-6 shadow-2xl space-y-4 my-8 animate-in fade-in duration-200 text-black">
            <div className="flex items-start justify-between border-b border-[#d8cebe] pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-[#9d7b38] font-black">
                  Mandate Specification Docket · Track {showSpecModal.tierNumber}
                </span>
                <h3 className="text-lg font-black text-black mt-0.5">
                  {showSpecModal.name}
                </h3>
              </div>
              <button
                onClick={() => setShowSpecModal(null)}
                className="text-black hover:text-rose-700 text-xl font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-black max-h-[60vh] overflow-y-auto pr-1">
              <div className="p-3 bg-[#faf8f4] border border-[#d8cebe] rounded-xs space-y-1">
                <strong className="text-black block text-[11px] font-mono uppercase">Full Institutional Outcome:</strong>
                <p>{showSpecModal.theOutcome}</p>
              </div>

              <div>
                <strong className="text-black block text-[11px] font-mono uppercase mb-1.5">All 5 Mandate Deliverables:</strong>
                <ul className="space-y-1.5">
                  {showSpecModal.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-[#faf8f4] p-2 rounded-xs border border-[#e2d8c9]">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <strong className="text-black block text-[11px] font-mono uppercase mb-0.5">Ideal Leadership Profile:</strong>
                <p className="text-zinc-800">{showSpecModal.idealClient}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#d8cebe] flex items-center justify-between gap-3">
              <span className="text-xs font-mono font-bold text-[#9d7b38]">
                Runway: {showSpecModal.cadence}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowSpecModal(null)}
                  className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-black text-xs font-bold rounded-xs cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const m = showSpecModal;
                    setShowSpecModal(null);
                    handleSelect(m);
                  }}
                  className="px-4 py-1.5 bg-black hover:bg-zinc-800 text-white text-xs font-black uppercase font-mono rounded-xs cursor-pointer"
                >
                  Initiate Mandate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
