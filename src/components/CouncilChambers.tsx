import React, { useState } from 'react';
import { Crown, ArrowRight, Lock, CheckCircle2, Sparkles, Shield, Users, Compass, Zap } from 'lucide-react';

interface CouncilChambersProps {
  onApplyForSeat: () => void;
  onExploreImplementation?: () => void;
  onSelectDiagnostic?: () => void;
}

export const CouncilChambers: React.FC<CouncilChambersProps> = ({ 
  onApplyForSeat,
  onExploreImplementation,
  onSelectDiagnostic 
}) => {
  const [selectedCity, setSelectedCity] = useState<'zurich' | 'london' | 'singapore' | 'newyork'>('zurich');

  const CONCLAVES = {
    zurich: {
      city: 'Zurich',
      location: 'Private Alpine Pavilion, The Dolder Grand',
      focus: 'Protecting Capital & Resolving Boardroom Deadlocks',
      dates: 'Q1 Conclave · Chatham House Rule',
      tasteTopic: 'How to stress-test your Diagnostic Friction Score with peer CEOs',
      implementationTopic: 'Full capital protection playbook & multi-jurisdiction asset defense'
    },
    london: {
      city: 'London',
      location: 'The Carlton Club & Private Boardroom Suite',
      focus: 'Shareholder Alignment & Eliminating Executive Politics',
      dates: 'Q2 Conclave · In-Camera Session',
      tasteTopic: 'Identifying hidden board friction uncovered in your diagnostic',
      implementationTopic: 'Hands-on live negotiation simulations and activist defense playbooks'
    },
    singapore: {
      city: 'Singapore',
      location: 'Capella Private Sanctuary, Sentosa Island',
      focus: 'Cross-Border Expansion & Generational Hand-off',
      dates: 'Q3 Conclave · Sovereign Syndicate',
      tasteTopic: 'Evaluating your 14-Day Step-Away results alongside international peers',
      implementationTopic: 'Structuring autonomous regional leadership that runs without founder input'
    },
    newyork: {
      city: 'New York',
      location: 'Private Penthouse Suite, Central Park South',
      focus: 'Enterprise Scale & Decoupling Founders from Daily Firefighting',
      dates: 'Q4 Conclave · Annual Syndicate Summit',
      tasteTopic: 'Benchmarking your company’s EBITDA drag against top private companies',
      implementationTopic: 'War-room mobilization and continuous architectural governance steering'
    }
  };

  return (
    <section id="council-chambers" className="py-10 sm:py-12 lg:py-14 border-b border-[#e5decfe0] bg-[#141416] text-white relative overflow-hidden">
      {/* Background ambient gold lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-1/3 w-[450px] h-[450px] bg-[#d4af37]/25 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 w-[350px] h-[350px] bg-[#c5a059]/15 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-6 sm:mb-8 gap-4 sm:gap-6">
          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs uppercase text-[#d4af37] font-bold mb-2">
              <Crown className="w-4 h-4 text-[#d4af37]" />
              <span className="bg-[#242731] border border-[#d4af37]/40 px-2 py-0.5 rounded-xs text-[#d4af37] font-mono">
                Included with the Diagnostic
              </span>
              <span aria-hidden="true" className="text-[#555] sm:inline">·</span>
              <span className="text-[#a6a9b2]">Closed-Door Peer Sparring</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
              The Council Chambers
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#a6a9b2] font-normal leading-relaxed italic">
              Where verified CEOs and business owners test the decisions they cannot discuss anywhere else. <strong className="font-bold text-white not-italic">No press. No junior consultants. Total confidentiality under Chatham House rules.</strong>
            </p>
          </div>

          {/* Feature Positioning Card */}
          <div className="p-4 rounded-lg bg-[#1c1e24] border border-[#d4af37]/40 flex flex-col justify-between shrink-0 lg:w-80 shadow-md">
            <div className="flex items-center gap-1.5 text-[11px] uppercase text-[#d4af37] font-bold mb-0.5">
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
              <span>Diagnostic Feature</span>
            </div>
            <div className="text-base sm:text-lg font-bold text-white mb-1">
              Taste Included With Diagnostic
            </div>
            <div className="text-xs text-[#a6a9b2] mb-3 leading-relaxed">
              Order our <strong className="text-white">Forensic Diagnostic</strong> to unlock a private closed-door session with peer leaders.
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={onSelectDiagnostic || onApplyForSeat}
                className="w-full py-2.5 text-xs font-bold uppercase text-[#141416] bg-gold-gradient hover:opacity-95 transition-all rounded-sm text-center shadow-xs cursor-pointer active:scale-98"
              >
                Get Diagnostic & Council Session
              </button>
              {onExploreImplementation && (
                <button
                  onClick={onExploreImplementation}
                  className="w-full py-2 text-[11px] font-semibold text-[#d4af37] hover:text-white transition-colors text-center cursor-pointer"
                >
                  Want full strategic version? See Implementation →
                </button>
              )}
            </div>
          </div>
        </div>

        {/* TWO-TIER ACCESS COMPARISON: Taste vs Full Strategic Version */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          
          {/* Taste: Sold with Diagnostic */}
          <div className="p-4 sm:p-5 rounded-lg bg-[#181a20] border-2 border-[#d4af37]/50 relative">
            <div className="flex items-center justify-between mb-2">
              <span className="px-2 py-0.5 rounded-xs bg-[#292c36] text-[#d4af37] text-[10px] font-mono uppercase font-bold tracking-wider">
                1. A Taste (With Diagnostic)
              </span>
              <span className="text-xs text-stone-300 font-mono">Included in Diagnostic Mandate</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-1.5">
              Foundational Council Sparring Session
            </h3>
            <p className="text-xs text-[#b0b3bf] leading-relaxed mb-3">
              When you purchase the <strong>Mandate Forensic Diagnostic</strong>, you receive an exclusive invitation to attend one closed-door peer conclave to stress-test your findings with experienced peers in a confidential setting.
            </p>
            <div className="space-y-1.5 text-xs text-[#e0e2eb]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <span>One 90-minute closed-door executive sparring session</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <span>Test your Diagnostic Friction Score with 6–8 non-competing peers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <span>Direct forensic debrief with Suchita Sancheti</span>
              </div>
            </div>
          </div>

          {/* Full Strategic Version: With Implementation Categories */}
          <div className="p-4 sm:p-5 rounded-lg bg-gradient-to-br from-[#1f222b] to-[#16181f] border-2 border-[#d4af37] shadow-xl relative">
            <div className="flex items-center justify-between mb-2">
              <span className="px-2.5 py-0.5 rounded-xs bg-[#d4af37] text-[#141416] text-[10px] font-mono uppercase font-black tracking-wider">
                2. Full Strategic Version (With Implementation)
              </span>
              <span className="text-xs text-[#d4af37] font-mono font-bold">Category 02 & 03</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-1.5">
              Year-Round Sovereign Syndicate & War Room
            </h3>
            <p className="text-xs text-[#b0b3bf] leading-relaxed mb-3">
              Choose an implementation category (<strong>90-Day Transformation</strong> or <strong>Annual Retainer</strong>) to unlock the full strategic Council Chambers experience with continuous access and live crisis support.
            </p>
            <div className="space-y-1.5 text-xs text-[#e0e2eb]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <span>Quarterly in-person summits in <strong>Zurich, London, Singapore & New York</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <span><strong>Emergency War Room:</strong> 4-hour mobilization for critical board or leadership issues</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <span>Continuous peer mastermind with Fortune 500 chairs & founders</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <span>Ongoing architectural steering to ensure systems stay permanent</span>
              </div>
            </div>
          </div>

        </div>

        {/* Conclaves Interactive Selector */}
        <div className="mb-2 text-xs font-mono uppercase text-[#d4af37] font-bold">
          Explore The 4 Global Conclave Locations:
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-6">
          {(Object.keys(CONCLAVES) as Array<keyof typeof CONCLAVES>).map((cityKey) => {
            const conclave = CONCLAVES[cityKey];
            const isSelected = selectedCity === cityKey;
            return (
              <button
                key={cityKey}
                onClick={() => setSelectedCity(cityKey)}
                className={`p-3 sm:p-3.5 rounded-lg border text-left transition-all duration-300 fluid-card-lift min-h-[70px] cursor-pointer ${
                  isSelected
                    ? 'border-[#d4af37] bg-[#1f2129] shadow-md ring-1 ring-[#d4af37]'
                    : 'border-[#2e313b] bg-[#181a20] hover:bg-[#1e2027] text-[#a6a9b2]'
                }`}
              >
                <div className={`text-sm sm:text-base font-bold ${isSelected ? 'text-white' : 'text-[#8c8f97]'}`}>
                  {conclave.city}
                </div>
                <div className="text-[10px] sm:text-[11px] text-[#d4af37] font-semibold mt-0.5 line-clamp-1">
                  {conclave.dates}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Conclave Details */}
        <div className="p-4 sm:p-6 lg:p-7 rounded-lg bg-[#181a20] border border-[#2e313b] shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="text-[11px] uppercase text-[#d4af37] font-bold">
              {CONCLAVES[selectedCity].city} Conclave Dossier
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {CONCLAVES[selectedCity].focus}
            </h3>
            <p className="text-xs sm:text-sm text-[#c4c7d2] leading-relaxed">
              Convened at <strong className="text-white">{CONCLAVES[selectedCity].location}</strong>. 
              Twenty-four leaders gather behind closed doors under Chatham House rules to discuss high-stakes decisions, leadership succession, and capital growth with zero outside interference.
            </p>

            <div className="p-3 bg-[#22252e] border-l-3 border-[#d4af37] rounded-r text-xs space-y-1">
              <div>
                <strong className="text-[#d4af37]">Diagnostic Taste Focus:</strong> {CONCLAVES[selectedCity].tasteTopic}
              </div>
              <div>
                <strong className="text-white">Full Strategic Implementation Focus:</strong> {CONCLAVES[selectedCity].implementationTopic}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 p-4 sm:p-5 rounded-lg bg-[#1c1e24] border border-[#383c48] flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#d4af37] uppercase">
                <Lock className="w-4 h-4 text-[#d4af37]" />
                <span>Next Step to Join</span>
              </div>
              <p className="text-xs text-[#a6a9b2] leading-relaxed">
                Take the initial step with the <strong className="text-white">Forensic Diagnostic</strong> to experience your first session, or petition directly for a full Implementation mandate.
              </p>
            </div>
            <button
              onClick={onApplyForSeat}
              className="mt-4 w-full py-3 text-xs font-bold uppercase text-[#141416] bg-gold-gradient hover:opacity-95 transition-all rounded-sm flex items-center justify-center gap-2 shadow-xs min-h-[40px] cursor-pointer"
            >
              <span>Petition For Admission</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
