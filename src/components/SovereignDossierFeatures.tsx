import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Terminal, 
  Activity, 
  AlertTriangle, 
  Layers, 
  Binary, 
  Lock, 
  Mic, 
  Scale, 
  Sparkles, 
  Printer, 
  Compass, 
  ArrowRight,
  TrendingDown,
  Eye,
  CheckCircle2,
  Fingerprint
} from 'lucide-react';

interface SovereignDossierFeaturesProps {
  onTakeTest?: () => void;
  onBookBriefing?: () => void;
}

export const SovereignDossierFeatures: React.FC<SovereignDossierFeaturesProps> = ({
  onTakeTest,
  onBookBriefing
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'part1' | 'part2'>('all');
  const [activeSimTier, setActiveSimTier] = useState<number>(3); // 1, 2, 3, 4
  const [simulatedHash, setSimulatedHash] = useState<string>('a8f94c71b02de897c31d5e2397184ff98203cba799d1235b88c148286a4e3210');
  const [isVerifyingHash, setIsVerifyingHash] = useState<boolean>(false);

  const handleRegenerateHash = () => {
    setIsVerifyingHash(true);
    setTimeout(() => {
      const chars = '0123456789abcdef';
      let result = '';
      for (let i = 0; i < 64; i++) {
        result += chars[Math.floor(Math.random() * chars.length)];
      }
      setSimulatedHash(result);
      setIsVerifyingHash(false);
    }, 450);
  };

  const tiers = [
    {
      tier: 'Tier 1: The Operator',
      desc: 'Tactical execution reliant on founder stamina. High principal friction; operations stall during founder absence.',
      multiple: '1.0x Base Valuation Multiple (High Risk Discount)',
      status: 'Critical Dependency'
    },
    {
      tier: 'Tier 2: The Guardian',
      desc: 'Direct reports handle day-to-day items but escalate strategic trade-offs upward. Latent coordination drag.',
      multiple: '1.4x Valuation Multiple (+40% expansion)',
      status: 'Ad-hoc Architecture'
    },
    {
      tier: 'Tier 3: The Architect',
      desc: 'Codified decision boundaries and autonomous 14-day execution loops. C-suite commands functional domains independently.',
      multiple: '2.1x Valuation Multiple (+110% expansion)',
      status: 'Sovereign Institutional Model'
    },
    {
      tier: 'Tier 4: The Apex Sovereign',
      desc: 'Perpetual self-compounding organizational architecture. Total decoupling from key-person risk with continuous market advantage.',
      multiple: '3.0x+ Valuation Multiple (Institutional Perpetuity Premium)',
      status: 'Absolute Perpetuity'
    }
  ];

  return (
    <section className="bg-black text-[#f8f6f0] py-14 sm:py-20 border-y-2 border-[#d4af37]/40 relative overflow-hidden font-sans">
      {/* Background Architectural Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #d4af37 1px, transparent 0)`,
          backgroundSize: '36px 36px'
        }}
      />
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#9d7b38]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Badge & Title with Official Gold & Navy Crest */}
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-10 sm:mb-14">
          <div className="flex justify-center mb-3">
            <div className="p-2 rounded-lg border-2 border-[#d4af37] shadow-2xl bg-[#0c1322] max-w-[240px] sm:max-w-[280px]">
              <img 
                src="/assets/tulc-gold-navy-crest.jpg" 
                alt="The Sovereign Dossier Official Crest" 
                className="w-full h-auto rounded-xs object-contain"
              />
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#181920] border border-[#d4af37]/60 text-xs font-mono text-[#d4af37] uppercase tracking-wider shadow-lg">
            <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
            <span>Patent-Pending Diagnostic Instrument · Ref: L.O.S.-P721</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif tracking-tight text-white leading-tight">
            The Sovereign Dossier™
          </h2>

          <p className="text-base sm:text-lg text-[#dcdfe6] leading-relaxed max-w-3xl mx-auto font-normal">
            The Sovereign Dossier is an unsparing, PhD-level diagnostic instrument engineered for high-consequence founders, family principals, and enterprise boards.
          </p>

          <p className="text-xs sm:text-sm text-[#a8abb4] italic leading-relaxed max-w-2xl mx-auto border-t border-b border-stone-800 py-3">
            Unlike conventional personality tests or qualitative consulting slides, the Dossier diagnoses <span className="text-[#d4af37] not-italic font-semibold">organizational cybernetics</span>, <span className="text-[#d4af37] not-italic font-semibold">leadership entropy</span>, and <span className="text-[#d4af37] not-italic font-semibold">institutional perpetuity</span>.
          </p>
        </div>

        {/* Navigation Tabs (Part I / Part II / Full Matrix) */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mb-10">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider font-bold rounded-sm transition-all border ${
              activeTab === 'all'
                ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-lg shadow-[#d4af37]/20'
                : 'bg-[#14151a] text-stone-300 border-stone-800 hover:border-[#d4af37]/50 hover:text-white'
            }`}
          >
            Complete Architecture
          </button>
          <button
            onClick={() => setActiveTab('part1')}
            className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider font-bold rounded-sm transition-all border ${
              activeTab === 'part1'
                ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-lg shadow-[#d4af37]/20'
                : 'bg-[#14151a] text-stone-300 border-stone-800 hover:border-[#d4af37]/50 hover:text-white'
            }`}
          >
            Part I: What The Dossier Reveals
          </button>
          <button
            onClick={() => setActiveTab('part2')}
            className={`px-5 py-2.5 text-xs font-mono uppercase tracking-wider font-bold rounded-sm transition-all border ${
              activeTab === 'part2'
                ? 'bg-[#d4af37] text-black border-[#d4af37] shadow-lg shadow-[#d4af37]/20'
                : 'bg-[#14151a] text-stone-300 border-stone-800 hover:border-[#d4af37]/50 hover:text-white'
            }`}
          >
            Part II: Undeniable & Ungameable Features
          </button>
        </div>

        {/* ========================================================================= */}
        {/* PART I: WHAT THE DOSSIER REVEALS */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'part1') && (
          <div className="space-y-8 mb-14">
            
            <div className="flex items-center gap-3 border-b-2 border-[#d4af37]/40 pb-3">
              <span className="px-2.5 py-1 bg-[#d4af37] text-black font-mono font-black text-xs uppercase tracking-wider rounded-xs">
                Part I
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-tight">
                What the Dossier Reveals
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* 1. The Real Cost of Founder Dependency */}
              <div className="p-6 rounded-lg bg-[#0e0f14] border border-[#d4af37]/50 shadow-xl space-y-4 hover:border-[#d4af37] transition-all">
                <div className="flex items-center gap-2.5 text-[#d4af37]">
                  <Activity className="w-5 h-5 text-[#d4af37]" />
                  <span className="text-xs font-mono uppercase tracking-wider font-bold">Vector 01</span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold font-serif text-white">
                  1. The Real Cost of Founder Dependency
                </h4>
                <div className="space-y-3.5 text-xs sm:text-sm text-stone-300 leading-relaxed">
                  <div className="p-3 bg-black/60 rounded border border-stone-800 space-y-1">
                    <span className="font-bold text-[#d4af37] font-mono block">Principal Dependency Ratio</span>
                    <p className="text-stone-300">
                      The exact percentage of critical enterprise operations that ground to a halt unless the founder applies "heroic intervention."
                    </p>
                  </div>
                  <div className="p-3 bg-black/60 rounded border border-stone-800 space-y-1">
                    <span className="font-bold text-[#d4af37] font-mono block">Systemic Survival Index</span>
                    <p className="text-stone-300">
                      The mathematical probability that the enterprise survives 30, 90, or 365 days of high-velocity growth if the founder suddenly steps away.
                    </p>
                  </div>
                  <div className="p-3 bg-black/60 rounded border border-stone-800 space-y-1">
                    <span className="font-bold text-[#d4af37] font-mono block">Economic Opportunity Burn</span>
                    <p className="text-stone-300">
                      The quantifiable dollar capital and strategic bandwidth squandered while the apex leader is trapped firefighting operational friction rather than compounding sovereign alpha.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2. Signal Refraction & Intent Fragmentation */}
              <div className="p-6 rounded-lg bg-[#0e0f14] border border-[#d4af37]/50 shadow-xl space-y-4 hover:border-[#d4af37] transition-all">
                <div className="flex items-center gap-2.5 text-[#d4af37]">
                  <Binary className="w-5 h-5 text-[#d4af37]" />
                  <span className="text-xs font-mono uppercase tracking-wider font-bold">Vector 02</span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold font-serif text-white">
                  2. Signal Refraction & Intent Fragmentation
                </h4>
                <div className="space-y-3.5 text-xs sm:text-sm text-stone-300 leading-relaxed">
                  <div className="p-3 bg-black/60 rounded border border-stone-800 space-y-1">
                    <span className="font-bold text-[#d4af37] font-mono block">Intent-to-Execution Dilution (Refraction Index)</span>
                    <p className="text-stone-300">
                      How much strategic intent is lost or distorted between the founder’s mind and the front-line operator.
                    </p>
                  </div>
                  <div className="p-3 bg-black/60 rounded border border-stone-800 space-y-1">
                    <span className="font-bold text-[#d4af37] font-mono block">Metabolic Burn & Escalation Density</span>
                    <p className="text-stone-300">
                      The hidden friction tax paid by the organization—measuring approval bottlenecks, decision latency, and stalled authority handoffs.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. Systemic Traps & Anomaly Loops */}
              <div className="p-6 rounded-lg bg-[#0e0f14] border border-[#d4af37]/50 shadow-xl space-y-4 hover:border-[#d4af37] transition-all lg:col-span-2">
                <div className="flex items-center gap-2.5 text-[#d4af37]">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                  <span className="text-xs font-mono uppercase tracking-wider font-bold">Vector 03</span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold font-serif text-white">
                  3. Systemic Traps & Anomaly Loops
                </h4>
                <p className="text-xs sm:text-sm text-stone-400 italic">
                  Exposes insidious organizational failure patterns before they manifest as crises:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="p-3.5 bg-black/70 rounded border border-amber-900/60 space-y-1">
                    <span className="font-bold text-amber-300 font-mono text-xs block">The Authority Loop</span>
                    <p className="text-stone-300 text-xs">
                      High founder clarity compensating for broken, drag-heavy operational systems.
                    </p>
                  </div>
                  <div className="p-3.5 bg-black/70 rounded border border-amber-900/60 space-y-1">
                    <span className="font-bold text-amber-300 font-mono text-xs block">The Consensus Trap</span>
                    <p className="text-stone-300 text-xs">
                      Over-indexing on harmony while execution velocity decays to zero.
                    </p>
                  </div>
                  <div className="p-3.5 bg-black/70 rounded border border-amber-900/60 space-y-1">
                    <span className="font-bold text-amber-300 font-mono text-xs block">The Fragile Alpha</span>
                    <p className="text-stone-300 text-xs">
                      High commercial expansion decoupled from ethical and governance bedrock.
                    </p>
                  </div>
                  <div className="p-3.5 bg-black/70 rounded border border-amber-900/60 space-y-1">
                    <span className="font-bold text-amber-300 font-mono text-xs block">The Ghost Command</span>
                    <p className="text-stone-300 text-xs">
                      The leader's physical presence substituting for documented institutional law.
                    </p>
                  </div>
                </div>
              </div>

              {/* 4. The 5-Domain Architecture Benchmark */}
              <div className="p-6 rounded-lg bg-[#0e0f14] border border-[#d4af37]/50 shadow-xl space-y-5 hover:border-[#d4af37] transition-all lg:col-span-2">
                <div className="flex items-center gap-2.5 text-[#d4af37]">
                  <Layers className="w-5 h-5 text-[#d4af37]" />
                  <span className="text-xs font-mono uppercase tracking-wider font-bold">Vector 04</span>
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-bold font-serif text-white">
                    4. The 5-Domain Architecture Benchmark
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-400 mt-1">
                    Diagnoses the enterprise across the 5 Immutable Core Domains:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  <div className="p-3 bg-black/60 rounded border border-stone-800">
                    <span className="text-[11px] font-mono text-[#d4af37] uppercase block font-bold">Domain 01</span>
                    <div className="font-bold text-white text-xs mt-0.5">Cognitive Clarity</div>
                    <div className="text-[11px] text-stone-400 mt-1">Psychological Sovereignty vs. Decision Exhaustion</div>
                  </div>
                  <div className="p-3 bg-black/60 rounded border border-stone-800">
                    <span className="text-[11px] font-mono text-[#d4af37] uppercase block font-bold">Domain 02</span>
                    <div className="font-bold text-white text-xs mt-0.5">Cultural Fidelity</div>
                    <div className="text-[11px] text-stone-400 mt-1">Distributed Intelligence vs. Operational Silos</div>
                  </div>
                  <div className="p-3 bg-black/60 rounded border border-stone-800">
                    <span className="text-[11px] font-mono text-[#d4af37] uppercase block font-bold">Domain 03</span>
                    <div className="font-bold text-white text-xs mt-0.5">Strategic Velocity</div>
                    <div className="text-[11px] text-stone-400 mt-1">Asymmetric Market Advantage vs. Inertial Drag</div>
                  </div>
                  <div className="p-3 bg-black/60 rounded border border-stone-800">
                    <span className="text-[11px] font-mono text-[#d4af37] uppercase block font-bold">Domain 04</span>
                    <div className="font-bold text-white text-xs mt-0.5">Systemic Integrity</div>
                    <div className="text-[11px] text-stone-400 mt-1">Zero-Latency Manifestation vs. Single-Point Bottlenecks</div>
                  </div>
                  <div className="p-3 bg-black/60 rounded border border-stone-800">
                    <span className="text-[11px] font-mono text-[#d4af37] uppercase block font-bold">Domain 05</span>
                    <div className="font-bold text-white text-xs mt-0.5">Moral Gravity</div>
                    <div className="text-[11px] text-stone-400 mt-1">Institutional Perpetuity vs. Reputational Decay</div>
                  </div>
                </div>

                {/* Objective Maturity Tiers 1 through 4 */}
                <div className="pt-4 border-t border-stone-800 space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#d4af37] font-bold">
                    Objective Maturity Tiers & Valuation Multiple Expansion Estimates:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {tiers.map((t, idx) => {
                      const tierNum = idx + 1;
                      const isSelected = activeSimTier === tierNum;
                      return (
                        <div
                          key={t.tier}
                          onClick={() => setActiveSimTier(tierNum)}
                          className={`p-3.5 rounded border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-[#181922] border-[#d4af37] shadow-lg shadow-[#d4af37]/20 ring-1 ring-[#d4af37]'
                              : 'bg-black/80 border-stone-800 hover:border-stone-600'
                          }`}
                        >
                          <div className="text-xs font-bold text-white flex items-center justify-between">
                            <span>{t.tier}</span>
                            {isSelected && <span className="w-2 h-2 rounded-full bg-[#d4af37]" />}
                          </div>
                          <div className="text-[11px] text-stone-400 mt-1 leading-relaxed">
                            {t.desc}
                          </div>
                          <div className="mt-2 pt-2 border-t border-stone-800 text-[11px] font-mono text-[#d4af37] font-semibold">
                            {t.multiple}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* PART II: UNDENIABLE & UNGAMEABLE FEATURES */}
        {/* ========================================================================= */}
        {(activeTab === 'all' || activeTab === 'part2') && (
          <div className="space-y-8 mb-12">
            
            <div className="flex items-center gap-3 border-b-2 border-[#d4af37]/40 pb-3">
              <span className="px-2.5 py-1 bg-[#d4af37] text-black font-mono font-black text-xs uppercase tracking-wider rounded-xs">
                Part II
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-serif text-white tracking-tight">
                Undeniable & Ungameable Features
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Feature 1: Anti-Gaming & "Rubbish" Stress-Test Defense */}
              <div className="p-6 rounded-lg bg-[#0e0f14] border border-[#d4af37]/50 shadow-xl space-y-4 hover:border-[#d4af37] transition-all">
                <div className="flex items-center gap-2.5 text-[#d4af37]">
                  <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
                  <span className="text-xs font-mono uppercase tracking-wider font-bold">Feature 01</span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold font-serif text-white">
                  1. Anti-Gaming & "Rubbish" Stress-Test Defense
                </h4>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed italic">
                  High-status executives frequently attempt to game assessments using rehearsed corporate platitudes, consulting buzzwords, or performative modesty.
                </p>
                <div className="space-y-3 pt-1">
                  <span className="text-xs font-mono uppercase text-[#d4af37] font-bold block">
                    The Dossier runs an active Anti-Gaming Audit:
                  </span>
                  <div className="p-3 bg-black/60 rounded border border-stone-800 space-y-1">
                    <span className="font-bold text-white text-xs block">Semantic Substance Ratio (0–100%)</span>
                    <p className="text-stone-300 text-xs">
                      Calculates an unvarnished Semantic Substance Ratio (0–100%) distinguishing concrete operational commitments from empty rhetoric.
                    </p>
                  </div>
                  <div className="p-3 bg-black/60 rounded border border-stone-800 space-y-1">
                    <span className="font-bold text-white text-xs block">Rhetorical Evasion Flagging</span>
                    <p className="text-stone-300 text-xs">
                      Flags rhetorical evasions ("synergizing cross-functional alignment", "moving the needle").
                    </p>
                  </div>
                  <div className="p-3 bg-black/60 rounded border border-stone-800 space-y-1">
                    <span className="font-bold text-white text-xs block">Social Desirability Delta</span>
                    <p className="text-stone-300 text-xs">
                      Measures the Social Desirability Delta to identify where the leader is telling the system what they think a CEO "ought" to say.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 2: Dual-Channel Acoustic & Behavioral Cross-Examination */}
              <div className="p-6 rounded-lg bg-[#0e0f14] border border-[#d4af37]/50 shadow-xl space-y-4 hover:border-[#d4af37] transition-all">
                <div className="flex items-center gap-2.5 text-[#d4af37]">
                  <Mic className="w-5 h-5 text-[#d4af37]" />
                  <span className="text-xs font-mono uppercase tracking-wider font-bold">Feature 02</span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold font-serif text-white">
                  2. Dual-Channel Acoustic & Behavioral Cross-Examination
                </h4>
                <div className="space-y-3 pt-1">
                  <div className="p-3 bg-black/60 rounded border border-stone-800 space-y-1">
                    <span className="font-bold text-[#d4af37] text-xs font-mono block">Observable Vocal Prosody</span>
                    <p className="text-stone-300 text-xs">
                      When the leader submits an audio declaration, the engine analyzes cadence, pitch variance, and glottal tension without subjective human bias.
                    </p>
                  </div>
                  <div className="p-3 bg-black/60 rounded border border-stone-800 space-y-1">
                    <span className="font-bold text-[#d4af37] text-xs font-mono block">Semantic-Acoustic Divergence</span>
                    <p className="text-stone-300 text-xs">
                      Cross-examines spoken claims against physical delivery and written choices. If a founder declares “my executive bench operates completely autonomously” while their written data indicates decision logjams and acoustic telemetry reveals micro-hesitations, the Dossier pinpoints that exact cognitive dissonance.
                    </p>
                  </div>
                  <div className="p-3 bg-black/60 rounded border border-stone-800 space-y-1">
                    <span className="font-bold text-[#d4af37] text-xs font-mono block">Dwell Time & Revision Telemetry</span>
                    <p className="text-stone-300 text-xs">
                      Tracks micro-hesitations, latency to first action, and option toggles before decision lock, exposing private uncertainty on high-stakes topics.
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 3: Strict Score-Narrative Parity Engine (Protocol C & D) */}
              <div className="p-6 rounded-lg bg-[#0e0f14] border border-[#d4af37]/50 shadow-xl space-y-3 hover:border-[#d4af37] transition-all">
                <div className="flex items-center gap-2.5 text-[#d4af37]">
                  <Scale className="w-5 h-5 text-[#d4af37]" />
                  <span className="text-xs font-mono uppercase tracking-wider font-bold">Feature 03</span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold font-serif text-white">
                  3. Strict Score-Narrative Parity Engine (Protocol C & D)
                </h4>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed italic">
                  Conventional AI reporting often outputs glowing praise that contradicts poor quantitative scores.
                </p>
                <div className="p-3.5 bg-black/60 rounded border border-stone-800 space-y-2 text-xs sm:text-sm text-stone-300">
                  <p>
                    The Dossier enforces an <strong className="text-white">immutable parity audit</strong>: narrative text must strictly match numerical domain metrics.
                  </p>
                  <p className="text-stone-400 text-xs">
                    If contradictory praise or hallucinated alignment is detected, the engine triggers an automatic failover to a deterministic mathematical matrix.
                  </p>
                </div>
              </div>

              {/* Feature 4: The Inquisitor Counter-Hypothesis */}
              <div className="p-6 rounded-lg bg-[#0e0f14] border border-[#d4af37]/50 shadow-xl space-y-3 hover:border-[#d4af37] transition-all">
                <div className="flex items-center gap-2.5 text-[#d4af37]">
                  <AlertTriangle className="w-5 h-5 text-rose-400" />
                  <span className="text-xs font-mono uppercase tracking-wider font-bold text-rose-400">Feature 04</span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold font-serif text-white">
                  4. The Inquisitor Counter-Hypothesis
                </h4>
                <div className="p-3.5 bg-black/60 rounded border border-rose-950/70 space-y-2 text-xs sm:text-sm text-stone-300">
                  <p>
                    Dedicates an adversarial section to formulating the <strong className="text-rose-300">exact counter-thesis</strong> an activist investor, predator competitor, or dissident board faction would deploy against the founder’s current operating posture.
                  </p>
                  <p className="text-stone-400 text-xs italic">
                    Exposes vulnerable blindspots before external adversaries exploit them.
                  </p>
                </div>
              </div>

              {/* Feature 5: Cryptographic System Verification Hash */}
              <div className="p-6 rounded-lg bg-[#0e0f14] border border-[#d4af37]/50 shadow-xl space-y-4 hover:border-[#d4af37] transition-all lg:col-span-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5 text-[#d4af37]">
                    <Lock className="w-5 h-5 text-[#d4af37]" />
                    <span className="text-xs font-mono uppercase tracking-wider font-bold">Feature 05</span>
                  </div>
                  <span className="text-[11px] font-mono text-[#d4af37] bg-[#1a1b22] px-2 py-0.5 rounded border border-[#d4af37]/40">
                    SHA-256 Protocol
                  </span>
                </div>
                <div>
                  <h4 className="text-lg sm:text-xl font-bold font-serif text-white">
                    5. Cryptographic System Verification Hash
                  </h4>
                  <p className="text-xs sm:text-sm text-stone-300 leading-relaxed mt-1">
                    Every Dossier generates an immutable SHA-256 cryptographic verification seal (<code className="text-[#d4af37] font-mono text-xs">system_verification_hash</code>) linking the executive’s name, organization, timestamp, and metrics—guaranteeing board-level auditability that cannot be retroactively manipulated or forged.
                  </p>
                </div>

                {/* Live Cryptographic Seal Visualizer */}
                <div className="p-4 bg-black rounded-lg border border-stone-800 space-y-2 font-mono text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-stone-400 gap-1 text-[11px]">
                    <span className="flex items-center gap-1.5 text-[#d4af37]">
                      <Fingerprint className="w-4 h-4" />
                      <span>system_verification_hash (Immutable Board Seal)</span>
                    </span>
                    <button
                      onClick={handleRegenerateHash}
                      disabled={isVerifyingHash}
                      className="text-[10px] text-stone-300 hover:text-white underline cursor-pointer"
                    >
                      {isVerifyingHash ? 'Recalculating...' : 'Simulate SHA-256 Re-Hash'}
                    </button>
                  </div>
                  <div className="bg-[#121318] p-3 rounded border border-stone-800 text-[#d4af37] break-all select-all font-mono text-xs">
                    0x{simulatedHash}
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-stone-500 pt-1">
                    <span>Target: Board Audit Committee & Lead Independent Director</span>
                    <span className="text-emerald-400">Status: Cryptographically Sealed & Validated</span>
                  </div>
                </div>
              </div>

              {/* Feature 6: Codified Decoupling Blueprint & Mandate Print Engine */}
              <div className="p-6 rounded-lg bg-[#0e0f14] border border-[#d4af37]/50 shadow-xl space-y-4 hover:border-[#d4af37] transition-all lg:col-span-2">
                <div className="flex items-center gap-2.5 text-[#d4af37]">
                  <Printer className="w-5 h-5 text-[#d4af37]" />
                  <span className="text-xs font-mono uppercase tracking-wider font-bold">Feature 06</span>
                </div>
                <h4 className="text-lg sm:text-xl font-bold font-serif text-white">
                  6. Codified Decoupling Blueprint & Mandate Print Engine
                </h4>
                <div className="p-4 bg-black/70 rounded border border-stone-800 text-xs sm:text-sm text-stone-300 space-y-2 leading-relaxed">
                  <p>
                    Concludes not with abstract advice, but with an actionable <strong className="text-white">Decoupling Action Directive</strong> and print-ready <strong className="text-white">Board Mandate</strong> formatted with legal watermarks, risk disclosures, and structured milestones to transition an organization from founder dependency into perpetual, self-compounding sovereignty.
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Action Callout Bar */}
        <div className="p-6 sm:p-8 rounded-lg bg-gradient-to-r from-[#171821] via-black to-[#171821] border-2 border-[#d4af37] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="text-xs font-mono uppercase tracking-wider text-[#d4af37] font-bold flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span>Sovereign Advisory Intake</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-bold font-serif text-white">
              Ready to Subject Your Enterprise to The Sovereign Dossier™?
            </h4>
            <p className="text-xs sm:text-sm text-stone-300 max-w-2xl">
              Initiate the diagnostic or request an in-camera confidential briefing with Suchita Sancheti.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            {onTakeTest && (
              <button
                onClick={onTakeTest}
                className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-[#d4af37] via-[#e8c868] to-[#b8860b] hover:opacity-95 text-black font-extrabold text-xs uppercase tracking-wider rounded-sm transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer font-mono"
              >
                <span>Take 60-Sec Audit</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
            {onBookBriefing && (
              <button
                onClick={onBookBriefing}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#1b1c24] hover:bg-[#252733] text-white font-bold text-xs uppercase tracking-wider rounded-sm border border-stone-700 transition-colors flex items-center justify-center gap-2 cursor-pointer font-mono"
              >
                <span>Request In-Camera Briefing</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
