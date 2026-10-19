import React, { useState } from 'react';
import { Crown, ArrowRight, Lock, CheckCircle2 } from 'lucide-react';

interface CouncilChambersProps {
  onApplyForSeat: () => void;
}

export const CouncilChambers: React.FC<CouncilChambersProps> = ({ onApplyForSeat }) => {
  const [selectedCity, setSelectedCity] = useState<'zurich' | 'london' | 'singapore' | 'newyork'>('zurich');

  const CONCLAVES = {
    zurich: {
      city: 'Zurich',
      location: 'Private Alpine Pavilion, The Dolder Grand',
      focus: 'Sovereign Capital Defense & Geopolitical Friction',
      dates: 'Q1 Conclave · Chatham House Rule',
    },
    london: {
      city: 'London',
      location: 'The Carlton Club & Private Boardroom Suite',
      focus: 'Activist Shareholder Neutralization & Boardroom Impasse',
      dates: 'Q2 Conclave · In-Camera Session',
    },
    singapore: {
      city: 'Singapore',
      location: 'Capella Private Sanctuary, Sentosa Island',
      focus: 'Cross-Border Dual Listing & Multi-Generational Succession',
      dates: 'Q3 Conclave · Sovereign Syndicate',
    },
    newyork: {
      city: 'New York',
      location: 'Private Penthouse Suite, Central Park South',
      focus: 'Hostile Takeover Readiness & Mega-Cap Executive Architecture',
      dates: 'Q4 Conclave · Annual Syndicate Summit',
    }
  };

  return (
    <section id="council-chambers" className="py-10 sm:py-14 lg:py-16 border-b border-[#e5decfe0] bg-[#141416] text-white relative overflow-hidden">
      {/* Background ambient gold lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 right-1/3 w-[450px] h-[450px] bg-[#d4af37]/25 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 w-[350px] h-[350px] bg-[#c5a059]/15 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-6 sm:mb-8 gap-4 sm:gap-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-xs uppercase text-[#d4af37] font-bold mb-2">
              <Crown className="w-4 h-4 text-[#d4af37]" />
              <span>By Invitation Only</span>
              <span aria-hidden="true" className="text-[#555] sm:inline">·</span>
              <span className="text-[#a6a9b2]">Strict 24-Seat Annual Cap</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
              The Council Chambers
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#a6a9b2] font-normal leading-relaxed italic">
              Where Fortune 500 CEOs and Sovereign Chairs test the decisions they cannot discuss anywhere else. <strong className="font-bold text-white not-italic">No press. No advisors. No recorded minutes.</strong>
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#1c1e24] border border-[#d4af37]/40 flex flex-col justify-between shrink-0 lg:w-72">
            <div className="text-[11px] uppercase text-[#d4af37] font-bold mb-0.5">
              Fellowship Remit
            </div>
            <div className="text-lg font-bold text-white mb-0.5">
              By Formal Petition
            </div>
            <div className="text-xs text-[#a6a9b2] mb-3">
              4 Seats Remaining for 2026/2027 Cohort
            </div>
            <button
              onClick={onApplyForSeat}
              className="w-full py-2.5 text-xs font-bold uppercase text-[#141416] bg-gold-gradient hover:opacity-95 transition-all rounded-sm text-center shadow-sm min-h-[40px]"
            >
              Petition For Admission
            </button>
          </div>
        </div>

        {/* Conclaves Interactive Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-6">
          {(Object.keys(CONCLAVES) as Array<keyof typeof CONCLAVES>).map((cityKey) => {
            const conclave = CONCLAVES[cityKey];
            const isSelected = selectedCity === cityKey;
            return (
              <button
                key={cityKey}
                onClick={() => setSelectedCity(cityKey)}
                className={`p-3 sm:p-3.5 rounded-lg border text-left transition-all duration-300 fluid-card-lift min-h-[70px] ${
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
        <div className="p-4 sm:p-6 lg:p-8 rounded-lg bg-[#181a20] border border-[#2e313b] shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="text-[11px] uppercase text-[#d4af37] font-bold">
              {CONCLAVES[selectedCity].city} Conclave Dossier
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              {CONCLAVES[selectedCity].focus}
            </h3>
            <p className="text-xs sm:text-sm text-[#c4c7d2] leading-relaxed">
              Convened at <strong className="text-white">{CONCLAVES[selectedCity].location}</strong>. 
              Twenty-four leaders gather behind closed doors for 36 hours of rigorous, Chatham House sparring on multi-tier capital allocation, activist hostile defense, and high-stakes succession maneuvers.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              <div className="flex items-center gap-2 text-xs text-[#e0e2eb]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <span>Zero external advisors or press credentials permitted</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#e0e2eb]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <span>Mutual Sovereign NDA and attorney-client privilege binding</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#e0e2eb]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <span>Quarterly in-camera confidential sparring sessions</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#e0e2eb]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
                <span>Emergency Syndicate War Room mobilization network</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 p-4 sm:p-5 rounded-lg bg-[#1c1e24] border border-[#383c48] flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#d4af37] uppercase">
                <Lock className="w-4 h-4 text-[#d4af37]" />
                <span>Admission Protocol</span>
              </div>
              <p className="text-xs text-[#a6a9b2] leading-relaxed">
                Admission requires dual-sponsor recommendation from existing Fellows or unanimous approval by the Advisory Governance Board.
              </p>
            </div>
            <button
              onClick={onApplyForSeat}
              className="mt-4 w-full py-3 text-xs font-bold uppercase text-[#141416] bg-gold-gradient hover:opacity-95 transition-all rounded-sm flex items-center justify-center gap-2 shadow-xs min-h-[40px]"
            >
              <span>Submit Admission Credentials</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
