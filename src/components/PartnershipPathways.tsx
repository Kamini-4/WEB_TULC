import React, { useState } from 'react';
import { PartnershipPathway, PartnershipModelId } from '../types';
import { ArrowRight, CheckCircle2, Download, ShieldCheck, Flame, Compass, Zap } from 'lucide-react';

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
    thePain: 'You feel the friction every day. Decisions take weeks of defensive committee slide decks. You know there is unspoken tension between the CEO and the board chair, but nobody will say it aloud. Enterprise velocity sits frozen while competitors move.',
    theDesire: 'You want unvarnished, undeniable truth. You want an external institutional authority with zero political baggage to hand the board an objective mirror so the hiding stops immediately.',
    theOutcome: 'In 14 days, you hold the full Sovereign Leadership Operating System Audit. An indisputable map of who owns what decision, where execution is leaking, and the exact 3 structural interventions to unblock enterprise velocity.',
    deliverables: [
      'Sovereign Authority Friction Matrix: Pinpointing where conviction and mandate stall',
      'Board-to-C-Suite Territory Map: Ending back-channel politicking and second-guessing',
      '14-Day Executive Intervention Blueprint: Immediate structural remedies for the CEO',
      'In-Camera Board Audit Presentation with our Managing Partner'
    ],
    idealClient: 'Boards and CEOs preparing for an inflection point, leadership succession, or resolving structural friction.'
  },
  {
    id: 'embedding',
    tierNumber: '02',
    name: 'Operating Architecture Embedding',
    tagline: 'Velocity is a structural choice. We build the machinery.',
    investmentAnchor: 'In-Situ Operating Overhaul',
    cadence: '90-Day Transformation Runway',
    thePain: 'You reorganized the org chart last year, and nothing actually changed. The same senior leaders still hedge their bets, seek endless consensus, and defer hard choices. Execution velocity is bleeding out across 18 committees.',
    theDesire: 'You want an operating system that runs autonomously. You want your executives to own their decisions with courage, without running to you or hiding behind consensus decks.',
    theOutcome: 'We embed directly inside your executive cadence for 90 days. We tear out the consensus meetings, codify explicit authority matrices, and institute 14-day asynchronous decision loops. When we exit, high-velocity leadership is permanent infrastructure.',
    deliverables: [
      'In-Situ Operating System Architect assigned to the executive suite',
      'Authority Decoupling Charter: Sovereign decision boundaries ratified by the Board',
      '14-Day Executive Loop Installation: Replacing 70% of synchronous committee meetings',
      'C-Suite Sparring Cadence: Weekly live coaching for senior leaders on decisive mandate'
    ],
    idealClient: 'Multi-divisional enterprise boards suffering from consensus gridlock and executive fatigue.'
  },
  {
    id: 'retainer',
    tierNumber: '03',
    name: 'Sovereign Strategic Counsel',
    tagline: 'The private counsel leaders turn to when the stakes are existential.',
    investmentAnchor: 'Senior Advisory Mandate',
    cadence: 'Annual Sovereign Mandate',
    thePain: 'At the top, there is no one you can safely think aloud with. Your board is evaluating you. Your executive team wants answers from you. The market is watching. When an activist appears or succession fractures, you are entirely on your own.',
    theDesire: 'An uncompromising, deeply experienced peer in your corner. Someone with no equity stake, no political ambition, and the institutional spine to tell you what everyone else is too afraid to say.',
    theOutcome: 'Continuous, on-call strategic sparring for the CEO and Board Chair. Direct guidance through activist defenses, board reconstitutions, M&A integrations, and sudden leadership transitions. You lead with calm, sovereign authority.',
    deliverables: [
      'Unrestricted 24/7 direct access to Senior Advisory Partner for Chair & CEO',
      'Emergency War Room Mobilization within 4 hours for unexpected governance crises',
      'Quarterly In-Camera Board Sparring Sessions: Challenging strategy before market exposure',
      'Private Conclave Admission into The Council Chambers'
    ],
    idealClient: 'Enterprise CEOs, Board Chairs, and Sovereign Trustees navigating high-stakes transitions.'
  }
];

export const PartnershipPathways: React.FC<PathwaysProps> = ({
  onSelectModel,
  onOpenConsultationWithModel,
  selectedModelId = 'retainer'
}) => {
  const [activeModelId, setActiveModelId] = useState<PartnershipModelId>(selectedModelId);
  const [showSpecModal, setShowSpecModal] = useState<PartnershipPathway | null>(null);

  const activeModel = PARTNERSHIP_PATHWAYS.find(m => m.id === activeModelId) || PARTNERSHIP_PATHWAYS[0];

  const handleSelect = (id: PartnershipModelId) => {
    setActiveModelId(id);
    onSelectModel(id);
  };

  return (
    <section id="partnerships" className="py-10 sm:py-14 lg:py-16 border-b border-[#e5decfe0] bg-[#f2ede2] relative overflow-hidden transition-all duration-300">
      {/* Fluid ambient golden graphic glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[400px] bg-[#eedec0]/35 rounded-full blur-[140px] pointer-events-none animate-fluid-float" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-6 sm:mb-8">
          <div className="flex items-center gap-2 text-xs uppercase text-[#9d7b38] font-bold mb-2">
            <ShieldCheck className="w-4 h-4 text-[#9d7b38]" />
            <span className="text-[#17181c] font-bold">3 Sovereign Categories</span>
            <span aria-hidden="true" className="text-[#c9bea9]">·</span>
            <span>Structured for Permanent Momentum</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#17181c] leading-tight">
            How Leaders Partner With Us.
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#555861] leading-relaxed italic">
            We do not sell hours. We do not write reports that gather dust. Every engagement is built around <strong className="text-[#17181c] not-italic font-bold">one specific institutional shift</strong>. Choose the category that matches your reality.
          </p>
        </div>

        {/* 3 Pathway Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 mb-6 sm:mb-8">
          {PARTNERSHIP_PATHWAYS.map((model) => {
            const isSelected = model.id === activeModelId;
            return (
              <button
                key={model.id}
                onClick={() => handleSelect(model.id)}
                className={`p-4 sm:p-5 text-left rounded-lg border transition-all duration-300 relative group flex flex-col justify-between fluid-card-lift min-h-[170px] ${
                  isSelected
                    ? 'bg-[#141416] border-[#d4af37] text-white shadow-xl scale-[1.005] gold-glow-subtle'
                    : 'bg-[#fcfaf7] border-[#d8cebe] text-[#17181c] hover:border-[#bda57b] hover:bg-white shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[11px] font-bold uppercase ${isSelected ? 'text-[#d4af37]' : 'text-[#9d7b38]'}`}>
                      Category {model.tierNumber}
                    </span>
                    <span className={`text-[11px] font-semibold ${isSelected ? 'text-[#a6a9b2]' : 'text-[#6b6e76]'}`}>
                      {model.cadence}
                    </span>
                  </div>

                  <h3 className={`text-lg sm:text-xl font-bold ${isSelected ? 'text-white' : 'text-[#17181c]'}`}>
                    {model.name}
                  </h3>

                  <p className={`text-xs mt-1.5 italic leading-relaxed ${isSelected ? 'text-[#d0d3dc]' : 'text-[#555861]'}`}>
                    "{model.tagline}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-inherit flex items-center justify-between">
                  <span className={`text-xs font-bold ${isSelected ? 'text-[#d4af37]' : 'text-[#17181c]'}`}>
                    {model.investmentAnchor}
                  </span>
                  <span className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-[#9d7b38]'}`}>
                    {isSelected ? 'Active Mandate' : 'Explore Details →'}
                  </span>
                </div>

                {isSelected && (
                  <div className="absolute -top-2.5 right-4 px-2 py-0.5 rounded-full bg-[#d4af37] text-black text-[9px] font-bold uppercase tracking-normal shadow-xs">
                    Selected Mandate
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Pathway Deep-Dive Cockpit */}
        <div className="p-4 sm:p-6 lg:p-8 rounded-xl bg-white border border-[#d8cebe] shadow-lg relative overflow-hidden transition-all duration-300">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-5 border-b border-[#e8e2d5]">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase font-bold text-[#9d7b38] mb-1">
                <span>Selected Category {activeModel.tierNumber}</span>
                <span aria-hidden="true" className="text-[#c9bea9]">·</span>
                <span className="text-[#17181c]">{activeModel.cadence}</span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#17181c]">
                {activeModel.name}: <span className="font-normal italic text-[#54575f]">"{activeModel.tagline}"</span>
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                onClick={() => setShowSpecModal(activeModel)}
                className="px-3.5 py-2 text-xs font-bold uppercase text-[#17181c] bg-[#f8f6f0] hover:bg-[#ede5d6] border border-[#d8cebe] transition-colors rounded-sm flex items-center gap-1.5 min-h-[40px]"
              >
                <Download className="w-3.5 h-3.5 text-[#9d7b38]" />
                <span>View Full Spec</span>
              </button>

              <button
                onClick={() => onOpenConsultationWithModel(activeModel)}
                className="px-5 py-2 text-xs font-bold uppercase text-[#f8f6f0] bg-[#17181c] hover:bg-[#282a30] transition-colors rounded-sm whitespace-nowrap shadow-xs min-h-[40px] text-center"
              >
                Initiate {activeModel.name}
              </button>
            </div>
          </div>

          {/* THE 3-PART CONVERSION ENGINE: THE PAIN · THE DESIRE · THE OUTCOME */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5 sm:gap-4 mb-6">
            
            {/* The Pain */}
            <div className="p-4 sm:p-5 rounded-lg bg-[#fcfaf7] border border-[#ebdcc0] relative flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs uppercase font-bold text-red-800 mb-2">
                  <Flame className="w-4 h-4 text-red-700 shrink-0" />
                  <span>The Acute Institutional Pain</span>
                </div>
                <p className="text-xs sm:text-sm text-[#2b2d32] leading-relaxed italic">
                  "{activeModel.thePain}"
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-[#ebdcc0]/60 text-[11px] text-[#7d8089]">
                Where organizations bleed momentum and morale.
              </div>
            </div>

            {/* The Desire */}
            <div className="p-4 sm:p-5 rounded-lg bg-[#faf6ee] border border-[#ebdcc0] relative flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs uppercase font-bold text-[#8f6d28] mb-2">
                  <Compass className="w-4 h-4 text-[#8f6d28] shrink-0" />
                  <span>The Leader's Real Desire</span>
                </div>
                <p className="text-xs sm:text-sm text-[#2b2d32] leading-relaxed italic">
                  "{activeModel.theDesire}"
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-[#ebdcc0]/60 text-[11px] text-[#7d8089]">
                What executive sovereignty and peace of mind look like.
              </div>
            </div>

            {/* The Outcome */}
            <div className="p-4 sm:p-5 rounded-lg bg-[#141416] text-white border border-[#2b2d33] shadow-sm relative flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs uppercase font-bold text-[#d4af37] mb-2">
                  <Zap className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span>The Irrevocable Outcome</span>
                </div>
                <p className="text-xs sm:text-sm text-[#e0e2eb] leading-relaxed">
                  {activeModel.theOutcome}
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-white/10 text-[11px] text-[#a6a9b2]">
                Guaranteed by binding institutional mandate.
              </div>
            </div>
          </div>

          {/* Deliverables & Bottom Commitment Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center pt-5 border-t border-[#e8e2d5]">
            <div className="lg:col-span-8">
              <h4 className="text-xs uppercase text-[#9d7b38] font-bold mb-3">
                Specific Institutional Deliverables Under {activeModel.name}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeModel.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2.5 rounded bg-[#f8f6f0] border border-[#e5decfe0] text-xs text-[#17181c]">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#9d7b38] shrink-0 mt-0.5" />
                    <span className="font-semibold leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 p-4 sm:p-5 rounded-lg bg-[#f8f6f0] border border-[#e5decfe0] flex flex-col justify-between">
              <div>
                <div className="text-[11px] uppercase font-bold text-[#6b6e76] mb-0.5">
                  Engagement Architecture
                </div>
                <div className="text-xl font-bold text-[#17181c] mb-0.5">
                  {activeModel.investmentAnchor}
                </div>
                <div className="text-xs text-[#54575f] italic">
                  Runway: {activeModel.cadence}
                </div>
              </div>

              <button
                onClick={() => onOpenConsultationWithModel(activeModel)}
                className="mt-4 w-full py-3 text-xs font-bold uppercase text-[#f8f6f0] bg-[#17181c] hover:bg-[#282a30] transition-all rounded-sm flex items-center justify-center gap-2 shadow-xs active:scale-[0.98] min-h-[42px]"
              >
                <span>Book Mandate Briefing</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#d4af37]" />
              </button>
            </div>
          </div>
        </div>

        {/* Spec Modal */}
        {showSpecModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm">
            <div className="bg-[#f8f6f0] border border-[#d8cebe] rounded-lg max-w-2xl w-full p-4 sm:p-6 shadow-2xl relative max-h-[88vh] flex flex-col">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#e5decfe0] shrink-0">
                <div>
                  <span className="text-[11px] text-[#9d7b38] uppercase font-bold">Partnership Specification</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#17181c]">{showSpecModal.name}</h3>
                </div>
                <button
                  onClick={() => setShowSpecModal(null)}
                  className="text-[#6b6e76] hover:text-[#17181c] text-lg p-1 font-bold min-h-[36px] min-w-[36px] flex items-center justify-center"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm text-[#33353a] overflow-y-auto pr-1">
                <div>
                  <h4 className="font-bold text-[#17181c] text-xs uppercase text-[#9d7b38]">Mandate Scope</h4>
                  <p className="mt-0.5 text-[#17181c] font-semibold">{showSpecModal.investmentAnchor} · {showSpecModal.cadence}</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#17181c] text-xs uppercase text-[#9d7b38]">The Problem We Remove</h4>
                  <p className="mt-0.5 text-[#4e5159] leading-relaxed italic">{showSpecModal.thePain}</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#17181c] text-xs uppercase text-[#9d7b38]">The Permanent Shift Delivered</h4>
                  <p className="mt-0.5 text-[#4e5159] leading-relaxed font-semibold">{showSpecModal.theOutcome}</p>
                </div>
                <div>
                  <h4 className="font-bold text-[#17181c] text-xs uppercase text-[#9d7b38]">Engagement Deliverables</h4>
                  <ul className="mt-1.5 space-y-1 list-disc list-inside text-[#4e5159]">
                    {showSpecModal.deliverables.map((d, i) => (
                      <li key={i}><strong className="text-[#17181c]">{d}</strong></li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#e5decfe0] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shrink-0">
                <span className="text-xs text-[#6b6e76]">Institutional Engagement Agreement</span>
                <button
                  onClick={() => {
                    const model = showSpecModal;
                    setShowSpecModal(null);
                    onOpenConsultationWithModel(model);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold uppercase text-[#f8f6f0] bg-[#17181c] hover:bg-[#282a30] rounded-sm text-center min-h-[40px]"
                >
                  Initiate Partnership
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
