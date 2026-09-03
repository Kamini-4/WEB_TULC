import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Building2, Compass, ShieldAlert, Sparkles, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface AltitudeProfile {
  id: string;
  label: string;
  role: string;
  primaryRisk: string;
  coreVulnerability: string;
  keyDomainPriority: string;
  typicalCoordinationDrag: string;
  immediateIntervention: string;
  benchmarkOutcome: string;
}

const altitudeProfiles: AltitudeProfile[] = [
  {
    id: "conglomerate",
    label: "Enterprise Conglomerate & Group CEO",
    role: "Fiduciary governance across multiple business units, geographies & boards",
    primaryRisk: "Context Dilution & The Silence of Compliance",
    coreVulnerability: "Board directives lose up to 66% of strategic fidelity by Tier 3 frontline execution; defensive reporting hides operational drag.",
    keyDomainPriority: "Domain 01: Cognitive Clarity & Domain 05: Cultural Fidelity",
    typicalCoordinationDrag: "$1.4M–$3.2M annual leakage in coordination drag and delayed strategic pivots.",
    immediateIntervention: "Install Asynchronous Telemetry Broadcasting and 15-Minute Zero-Delay Error Channels.",
    benchmarkOutcome: "Real-time enterprise-wide fidelity; elimination of defensive status reporting."
  },
  {
    id: "scaleup",
    label: "Deeptech & High-Growth Scale-Up ($10M–$100M+)",
    role: "Apex founder transitioning from 'hands-on operator' to 'institutional architect'",
    primaryRisk: "Speed-to-Market Degradation & Meeting Tax",
    coreVulnerability: "Middle management freezes on high-stakes calls; tactical escalations flood the CEO desk, causing 3-month launch delays.",
    keyDomainPriority: "Domain 02: Systemic Integrity & Domain 03: Strategic Velocity",
    typicalCoordinationDrag: "18.5+ hrs/week in redundant status syncs; 40% loss of strategic momentum.",
    immediateIntervention: "Install 3-Condition Escalation Filter and Bounded Capital Autonomy Gates (<$250k).",
    benchmarkOutcome: "2.5x Decision-to-execution velocity and +15 reclaimed CEO hours/week for market offense."
  },
  {
    id: "family-office",
    label: "Single-Family Office & Holding Chair",
    role: "Preserving multi-generational wealth, board continuity & sovereign governance",
    primaryRisk: "Key-Person & Succession Fragility",
    coreVulnerability: "Generational capital transition relies on informal founder knowledge rather than codified decision gates.",
    keyDomainPriority: "Domain 05: Cultural Fidelity & Domain 04: Moral Gravity",
    typicalCoordinationDrag: "25–35% Valuation discount applied by institutional acquirers for key-person dependency.",
    immediateIntervention: "Install Leader-Agnostic Succession Substrate and codified investment execution protocols to ensure generational perpetuity.",
    benchmarkOutcome: "Zero transition dip across leadership shifts; 100% codified board-level intent."
  }
];

interface Props {
  onSelectProfile?: (profile: AltitudeProfile) => void;
}

const ExecutiveAltitudeFilter: React.FC<Props> = ({ onSelectProfile }) => {
  const [selectedId, setSelectedId] = useState<string>("conglomerate");
  const navigate = useNavigate();

  const profile = altitudeProfiles.find(p => p.id === selectedId) || altitudeProfiles[0];

  const handleSelect = (p: AltitudeProfile) => {
    setSelectedId(p.id);
    if (onSelectProfile) onSelectProfile(p);
  };

  return (
    <div className="bg-[#111111] border border-[#b8860b]/40 rounded-xs p-5 sm:p-7 shadow-xl text-left my-8">
      {/* Netflix-style "Personalized Perspective" Eyebrow */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-5">
        <div className="flex items-center gap-2">
          <Compass className="w-4 h-4 text-[#b8860b]" />
          <span className="text-[10px] font-mono uppercase font-bold text-zinc-300 tracking-wider">
            EXECUTIVE ALTITUDE LENS // SELECT YOUR INSTITUTIONAL PROFILE
          </span>
        </div>
        <span className="text-[9px] font-mono text-[#b8860b] bg-[#b8860b]/10 border border-[#b8860b]/30 px-2 py-0.5 rounded-full">
          Tailored Diagnostic Architecture
        </span>
      </div>

      {/* 3 Altitude Selector Pills */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 mb-6">
        {altitudeProfiles.map((p) => {
          const isSelected = p.id === selectedId;
          return (
            <button
              key={p.id}
              onClick={() => handleSelect(p)}
              className={`p-3 rounded-xs border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-[#1c1c1c] border-[#b8860b] text-white shadow-md'
                  : 'bg-black/40 border-white/5 text-zinc-400 hover:border-white/20 hover:text-zinc-200'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[9px] font-mono uppercase text-[#b8860b] font-bold">
                  {p.id === 'conglomerate' ? 'CONGLOMERATE' : p.id === 'scaleup' ? 'SCALE-UP' : 'FAMILY OFFICE'}
                </span>
                {isSelected && <CheckCircle className="w-3.5 h-3.5 text-[#b8860b]" />}
              </div>
              <span className="text-xs font-serif font-bold text-white leading-snug">
                {p.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Profile Diagnostic Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={profile.id}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="bg-black/50 border border-white/5 p-4 sm:p-5 rounded-xs space-y-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
            <div>
              <span className="text-[9px] font-mono uppercase text-zinc-500 block">PRIMARY MANDATE & SCOPE</span>
              <p className="text-xs text-zinc-200 font-sans font-medium">{profile.role}</p>
            </div>
            <span className="text-[10px] font-mono text-rose-400 bg-rose-500/10 border border-rose-500/30 px-2.5 py-1 rounded-xs shrink-0 flex items-center gap-1.5">
              <ShieldAlert className="w-3 h-3" />
              <span>Critical Threat: {profile.primaryRisk}</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3 bg-[#151515] border border-white/5 rounded-xs space-y-1">
              <span className="text-[9px] font-mono uppercase text-[#b8860b] font-bold block">1. The Core Vulnerability</span>
              <p className="text-zinc-300 font-sans text-[11px] leading-relaxed">{profile.coreVulnerability}</p>
            </div>
            <div className="p-3 bg-[#151515] border border-white/5 rounded-xs space-y-1">
              <span className="text-[9px] font-mono uppercase text-amber-400 font-bold block">2. Measurable Drag</span>
              <p className="text-zinc-300 font-sans text-[11px] leading-relaxed">{profile.typicalCoordinationDrag}</p>
            </div>
            <div className="p-3 bg-[#151515] border border-[#b8860b]/30 rounded-xs space-y-1">
              <span className="text-[9px] font-mono uppercase text-emerald-400 font-bold block">3. 90-Day Installed Fix</span>
              <p className="text-zinc-200 font-sans text-[11px] leading-relaxed font-medium">{profile.benchmarkOutcome}</p>
            </div>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono">
            <span className="text-zinc-400">
              Primary Vector Focus: <strong className="text-white">{profile.keyDomainPriority}</strong>
            </span>
            <button
              onClick={() => navigate('/assessment')}
              className="text-[#b8860b] hover:text-white flex items-center gap-1 uppercase font-bold cursor-pointer"
            >
              <span>Run {profile.label.split(' ')[0]} Diagnostic</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ExecutiveAltitudeFilter;
