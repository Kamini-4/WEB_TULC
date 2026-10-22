import React, { useState } from 'react';
import { PartnershipPathway, PartnershipModelId } from '../types';
import { ArrowRight, CheckCircle2, Download, ShieldCheck, Flame, Compass, Zap, Sparkles } from 'lucide-react';

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
    theDesire: 'You want unvarnished, objective clarity. You want an external institutional authority with zero political baggage to hand the board an empirical mirror that brings unspoken dynamics into sharp, actionable focus.',
    theOutcome: 'In 14 days, you hold the full Sovereign Leadership Operating System Audit. An indisputable map of who owns what decision, where execution is leaking, and the exact 3 structural interventions to unblock enterprise velocity.',
    deliverables: [
      'The Council Chambers Taste: 1 Closed-Door Conclave Sparring Session to stress-test findings with peer CEOs',
      'Sovereign Authority Friction Matrix: Pinpointing where conviction and mandate stall',
      'Board-to-C-Suite Territory Map: Ending back-channel politicking and second-guessing',
      '14-Day Executive Intervention Blueprint: Immediate structural remedies for the CEO',
      'In-Camera Board Audit Presentation with Suchita Sancheti'
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
    thePain: 'You reorganized the org chart last year, and nothing actually changed. The same senior leaders still hedge their bets, seek endless consensus, and defer hard choices. Execution velocity is bleeding out across redundant committees.',
    theDesire: 'You want an operating system that runs autonomously. You want your executives to own their decisions with conviction, driving initiatives forward without seeking routine sign-offs or consensus decks.',
    theOutcome: 'We embed directly inside your executive cadence for 90 days. We tear out the consensus meetings, codify explicit authority matrices, and institute 14-day asynchronous decision loops. When we exit, high-velocity leadership is permanent infrastructure.',
    deliverables: [
      'Full Strategic Council Chambers Access: Annual syndicate seat across Zurich, London, Singapore & New York',
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
    name: 'The Sovereign Retainer',
    tagline: 'The private counsel leaders turn to when the stakes are existential.',
    investmentAnchor: 'Senior Sovereign Retainer',
    cadence: 'Annual Sovereign Mandate',
    thePain: 'At the top, there is no one you can safely think aloud with. Your board is evaluating you. Your executive team wants answers from you. The market is watching. When an activist appears or succession fractures, you are entirely on your own.',
    theDesire: 'An uncompromising, deeply experienced peer in your corner. Someone with no equity stake, no political ambition, and the institutional spine to tell you what everyone else is too afraid to say.',
    theOutcome: 'Continuous, on-call strategic sparring for the CEO and Board Chair directly with Suchita Sancheti. Direct guidance through activist defenses, board reconstitutions, M&A integrations, and sudden leadership transitions. You lead with calm, sovereign authority.',
    deliverables: [
      'Full Strategic Council Chambers Access: Year-round sovereign conclave seat and private syndicate admission',
      'Unrestricted 24/7 direct access to Suchita Sancheti for Board Chair & CEO',
      'Emergency War Room Mobilization within 4 hours for unexpected governance crises',
      'Quarterly In-Camera Board Sparring Sessions: Challenging strategy before market exposure'
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
    <section id="partnerships" className="py-10 sm:py-12 lg:py-14 border-b border-[#e5decfe0] bg-[#f2ede2] relative overflow-hidden transition-all duration-300">
      {/* Fluid ambient golden graphic glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[400px] bg-[#eedec0]/35 rounded-full blur-[140px] pointer-events-none animate-fluid-float" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-6 sm:mb-8">
          <div className="flex items-center gap-2 text-xs uppercase text-[#9d7b38] font-bold mb-2">
            <ShieldCheck className="w-4 h-4 text-[#9d7b38]" />
            <span className="text-[#17181c] font-bold">Services & Sovereign Tracks</span>
            <span aria-hidden="true" className="text-[#c9bea9]">·</span>
            <span>Structured for Permanent Momentum</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#17181c] leading-tight">
            How Leaders Partner With Us.
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#555861] leading-relaxed italic">
            We do not sell hours. We do not write reports that gather dust. Every engagement is built around <strong className="text-[#17181c] not-italic font-bold">one specific institutional shift</strong>. Choose the engagement track that matches your reality.
          </p>
        </div>

        {/* 3 Pathway Selector Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4 mb-6 sm:mb-8">
          {PARTNERSHIP_PATHWAYS.map((model) => {
            const isSelected = model.id === activeModelId;
            const isRetainer = model.id === 'retainer';
            return (
              <button
                key={model.id}
                onClick={() => handleSelect(model.id)}
                className={`p-4 sm:p-5 text-left rounded-lg border transition-all duration-300 relative group flex flex-col justify-between fluid-card-lift min-h-[175px] ${
                  isSelected
                    ? 'bg-black border-[#d4af37] text-white shadow-2xl scale-[1.01] ring-1 ring-[#d4af37]/50'
                    : 'bg-[#fcfaf7] border-[#d8cebe] text-[#17181c] hover:border-[#bda57b] hover:bg-white shadow-xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[11px] font-bold uppercase tracking-wider ${isSelected ? 'text-[#d4af37]' : 'text-[#9d7b38]'}`}>
                      {isRetainer ? 'Retainer' : `Track ${model.tierNumber}`}
                    </span>
                    <span className={`text-[11px] font-semibold ${isSelected ? 'text-stone-300' : 'text-[#6b6e76]'}`}>
                      {model.cadence}
                    </span>
                  </div>

                  <h3 className={`text-lg sm:text-xl font-bold ${isSelected ? 'text-white' : 'text-[#17181c]'}`}>
                    {model.name}
                  </h3>

                  <p className={`text-xs mt-1.5 italic leading-relaxed ${isSelected ? 'text-stone-300' : 'text-[#555861]'}`}>
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

        {/* Selected Pathway Deep-Dive Cockpit — DEEP BLACK FOR HIGH-STAKES IMPORTANCE */}
        <div className="p-5 sm:p-7 lg:p-8 rounded-xl bg-black border-2 border-[#d4af37]/70 text-white shadow-2xl relative overflow-hidden transition-all duration-300">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 mb-5 border-b border-stone-800">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase font-bold text-[#d4af37] mb-1">
                <span>{activeModel.id === 'retainer' ? 'Retainer Mandate' : `Engagement Track ${activeModel.tierNumber}`}</span>
                <span aria-hidden="true" className="text-stone-600">·</span>
                <span className="text-stone-300">{activeModel.cadence}</span>
                <span aria-hidden="true" className="text-stone-600">·</span>
                <span className="text-[#d4af37]">Led by Suchita Sancheti</span>
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight">
                {activeModel.name}: <span className="font-normal italic text-stone-300">"{activeModel.tagline}"</span>
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                onClick={() => setShowSpecModal(activeModel)}
                className="px-3.5 py-2 text-xs font-bold uppercase text-stone-200 bg-[#1c1d22] hover:bg-[#282a32] border border-stone-700 transition-colors rounded-sm flex items-center gap-1.5 min-h-[40px] cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>View Full Spec</span>
              </button>

              <button
                onClick={() => onOpenConsultationWithModel(activeModel)}
                className="px-5 py-2 text-xs font-bold uppercase text-black bg-gradient-to-r from-[#d4af37] to-[#c5a059] hover:opacity-95 transition-all rounded-sm whitespace-nowrap shadow-md min-h-[40px] text-center font-mono cursor-pointer active:scale-98"
              >
                Initiate {activeModel.name}
              </button>
            </div>
          </div>

          {/* THE 3-PART CONVERSION ENGINE: THE PAIN · THE DESIRE · THE OUTCOME */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3.5 sm:gap-4 mb-6">
            
            {/* The Pain */}
            <div className="p-4 sm:p-5 rounded-lg bg-[#14151a] border border-rose-900/60 relative flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs uppercase font-bold text-rose-400 mb-2">
                  <Flame className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>The Acute Institutional Pain</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed italic">
                  "{activeModel.thePain}"
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-rose-900/40 text-[11px] text-stone-400">
                Where organizations bleed momentum and morale.
              </div>
            </div>

            {/* The Desire */}
            <div className="p-4 sm:p-5 rounded-lg bg-[#14151a] border border-amber-900/60 relative flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs uppercase font-bold text-amber-300 mb-2">
                  <Compass className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>The Leader's Real Desire</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed italic">
                  "{activeModel.theDesire}"
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-amber-900/40 text-[11px] text-stone-400">
                What executive sovereignty and peace of mind look like.
              </div>
            </div>

            {/* The Outcome */}
            <div className="p-4 sm:p-5 rounded-lg bg-[#181920] text-white border border-[#d4af37]/60 shadow-lg relative flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-xs uppercase font-bold text-[#d4af37] mb-2">
                  <Zap className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span>The Irrevocable Outcome</span>
                </div>
                <p className="text-xs sm:text-sm text-white leading-relaxed">
                  {activeModel.theOutcome}
                </p>
              </div>
              <div className="mt-3 pt-2.5 border-t border-white/10 text-[11px] text-[#d4af37]">
                Guaranteed by binding sovereign mandate.
              </div>
            </div>
          </div>

          {/* Deliverables & Bottom Commitment Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center pt-5 border-t border-stone-800">
            <div className="lg:col-span-8">
              <h4 className="text-xs uppercase text-[#d4af37] font-bold mb-3 tracking-wider">
                Specific Institutional Deliverables Under {activeModel.name}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeModel.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2.5 rounded bg-[#14151a] border border-stone-800 text-xs text-stone-200">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                    <span className="font-semibold leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 p-4 sm:p-5 rounded-lg bg-[#14151a] border border-stone-800 flex flex-col justify-between">
              <div>
                <div className="text-[11px] uppercase font-bold text-stone-400 mb-0.5">
                  Engagement Architecture
                </div>
                <div className="text-xl font-bold text-white mb-0.5">
                  {activeModel.investmentAnchor}
                </div>
                <div className="text-xs text-stone-400 italic">
                  Runway: {activeModel.cadence}
                </div>
              </div>

              <button
                onClick={() => onOpenConsultationWithModel(activeModel)}
                className="mt-4 w-full py-3 text-xs font-bold uppercase text-black bg-gradient-to-r from-[#d4af37] to-[#c5a059] hover:opacity-95 transition-all rounded-sm flex items-center justify-center gap-2 shadow-md active:scale-[0.98] min-h-[42px] cursor-pointer"
              >
                <span>Book Mandate Briefing</span>
                <ArrowRight className="w-3.5 h-3.5 text-black" />
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            EXCLUSIVE ADVISORY FEATURE: THE SOVEREIGN COUNCIL CHAMBER™
            (Off-site Conclaves & Peer Cross-Examination sold as an elite service feature)
           ========================================================================= */}
        <div id="council-feature" className="mt-8 sm:mt-10 p-6 sm:p-8 lg:p-10 rounded-xl bg-black border-2 border-[#d4af37] text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-stone-800">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#191a22] border border-[#d4af37]/60 rounded-full text-[10px] sm:text-[11px] font-mono uppercase text-[#d4af37] font-bold mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Elite Advisory Capability · Off-Site Executive Conclave</span>
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif text-white tracking-tight">
                  The Sovereign Council Chamber™
                </h3>
                <p className="text-xs sm:text-sm font-mono text-stone-300 mt-1">
                  Closed-Door Conclaves Across Zurich, London, Singapore & New York · Chatham House Sanctity
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-3">
                <button
                  onClick={() => {
                    const retainer = PARTNERSHIP_PATHWAYS.find(p => p.id === 'retainer') || PARTNERSHIP_PATHWAYS[0];
                    onOpenConsultationWithModel(retainer);
                  }}
                  className="px-5 py-2.5 text-xs font-bold uppercase text-black bg-gradient-to-r from-[#d4af37] to-[#c5a059] hover:opacity-95 transition-all rounded-sm font-mono shadow-md flex items-center gap-1.5 cursor-pointer active:scale-98 whitespace-nowrap"
                >
                  <span>Inquire for Conclave Seat</span>
                  <ArrowRight className="w-3.5 h-3.5 text-black" />
                </button>
              </div>
            </div>

            <div className="max-w-4xl mb-6">
              <p className="text-xs sm:text-sm text-stone-300 font-serif leading-relaxed">
                The Council Chamber is an exclusive, off-site advisory feature reserved for enterprise founders, family office principals, and enterprise board chairs. Rather than qualitative consulting or theoretical exercises, the Council provides an uncompromising crucible where leaders submit their most high-consequence moves to confidential peer cross-examination before committing enterprise capital.
              </p>
            </div>

            {/* 4 Feature Deliverables */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="p-4 rounded-lg bg-[#14151b] border border-stone-800 space-y-2">
                <div className="text-[11px] font-mono uppercase text-[#d4af37] font-bold">
                  01. Peer Cross-Examination
                </div>
                <h4 className="text-sm font-bold text-white font-serif">
                  Adversarial Stress-Testing
                </h4>
                <p className="text-xs text-stone-300 font-serif leading-relaxed">
                  Direct dialectic sparring with vetted peer CEOs facing identical scale thresholds. Eliminates internal confirmation bias and untested assumptions.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#14151b] border border-stone-800 space-y-2">
                <div className="text-[11px] font-mono uppercase text-[#d4af37] font-bold">
                  02. Chatham House Sanctity
                </div>
                <h4 className="text-sm font-bold text-white font-serif">
                  Absolute Board Confidentiality
                </h4>
                <p className="text-xs text-stone-300 font-serif leading-relaxed">
                  Protected under strict non-disclosure covenants. Zero digital recording, zero transcription, and total immunity from market leaks or political exposure.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#14151b] border border-stone-800 space-y-2">
                <div className="text-[11px] font-mono uppercase text-[#d4af37] font-bold">
                  03. Pre-Market Crucible
                </div>
                <h4 className="text-sm font-bold text-white font-serif">
                  High-Stakes Scenario Defense
                </h4>
                <p className="text-xs text-stone-300 font-serif leading-relaxed">
                  Stress-test activist defense postures, board reconstitutions, CEO succession handoffs, and transformative M&A integrations before exposure to public markets.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-[#14151b] border border-stone-800 space-y-2">
                <div className="text-[11px] font-mono uppercase text-[#d4af37] font-bold">
                  04. Direct Access & Inclusion
                </div>
                <h4 className="text-sm font-bold text-white font-serif">
                  How Leaders Access
                </h4>
                <p className="text-xs text-stone-300 font-serif leading-relaxed">
                  Included as a standard feature within <strong className="text-white">Track 02 (Operating Architecture Embedding)</strong> and <strong className="text-white">The Sovereign Retainer</strong>, or via standalone Syndicate Fellowship.
                </p>
              </div>
            </div>

            {/* Inclusions summary strip */}
            <div className="p-3.5 rounded bg-[#181922] border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-stone-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Quarterly Conclaves: Zurich (Q1) · London (Q2) · Singapore (Q3) · New York (Q4)</span>
              </div>
              <div className="text-[#d4af37] font-bold">
                Chatham House Rule Enforced · Strict Boardroom Privilege
              </div>
            </div>
          </div>
        </div>

        {/* Spec Modal with BACK BUTTON */}
        {showSpecModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm">
            <div className="bg-[#f8f6f0] border-2 border-[#9d7b38] rounded-lg max-w-2xl w-full p-4 sm:p-6 shadow-2xl relative max-h-[88vh] flex flex-col">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#e5decfe0] shrink-0">
                <div>
                  <span className="text-[11px] text-[#9d7b38] uppercase font-bold font-mono">Services Specification</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#17181c]">{showSpecModal.name}</h3>
                </div>
                <button
                  onClick={() => setShowSpecModal(null)}
                  className="text-[#6b6e76] hover:text-[#17181c] text-lg p-1 font-bold min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer"
                  aria-label="Close Specification"
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
                <button
                  onClick={() => setShowSpecModal(null)}
                  className="px-4 py-2 text-xs font-bold uppercase text-[#4e5159] hover:text-[#17181c] bg-white hover:bg-[#ede5d6] border border-[#d8cebe] rounded-sm transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>← Back to Services</span>
                </button>

                <button
                  onClick={() => {
                    const model = showSpecModal;
                    setShowSpecModal(null);
                    onOpenConsultationWithModel(model);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold uppercase text-[#f8f6f0] bg-[#17181c] hover:bg-[#282a30] rounded-sm text-center min-h-[40px] cursor-pointer"
                >
                  Initiate Partnership Track
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
