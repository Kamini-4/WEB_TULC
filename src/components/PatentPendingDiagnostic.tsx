import React, { useState } from 'react';
import { DiagnosticLevers, DiagnosticResult, PartnershipModelId } from '../types';
import { generateExecutiveMemorandum } from '../services/gemini';
import { Loader2, Sparkles, Activity, ShieldCheck, ArrowRight, RefreshCw, FileText } from 'lucide-react';
import { SovereignDossierFeatures } from './SovereignDossierFeatures';

interface DiagnosticProps {
  onSelectPartnership: (modelId: PartnershipModelId) => void;
  onConsultationRequest: (diagnosticSummary?: string) => void;
}

export const PatentPendingDiagnostic: React.FC<DiagnosticProps> = ({
  onSelectPartnership,
  onConsultationRequest
}) => {
  const [levers, setLevers] = useState<DiagnosticLevers>({
    decisionVelocity: 'consensus-stalled',
    boardAlignment: 'factional-impasse',
    successionResilience: 'single-point-fragile',
  });

  const [activeTab, setActiveTab] = useState<'interactive' | 'memorandum' | 'dossier'>('interactive');
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiMemorandum, setAiMemorandum] = useState<string | null>(null);

  // Compute diagnostic metrics
  const computeResult = (currentLevers: DiagnosticLevers): DiagnosticResult => {
    let score = 0;

    if (currentLevers.decisionVelocity === 'consensus-stalled') score += 35;
    else if (currentLevers.decisionVelocity === 'hybrid-friction') score += 20;
    else score += 5;

    if (currentLevers.boardAlignment === 'factional-impasse') score += 40;
    else if (currentLevers.boardAlignment === 'reactive-review') score += 22;
    else score += 5;

    if (currentLevers.successionResilience === 'single-point-fragile') score += 25;
    else if (currentLevers.successionResilience === 'ad-hoc-bench') score += 15;
    else score += 5;

    let frictionLevel: 'low' | 'moderate' | 'acute' | 'critical' = 'critical';
    let velocityDrag = 12;
    let primaryVulnerability = 'Minor governance latency';
    let recommendedModel: PartnershipModelId = 'embedding';

    if (score >= 70) {
      frictionLevel = 'critical';
      velocityDrag = 48.6;
      primaryVulnerability = 'Consensus Theater & Paralyzing Board-Executive Impasse';
      recommendedModel = 'retainer';
    } else if (score >= 40) {
      frictionLevel = 'acute';
      velocityDrag = 34.2;
      primaryVulnerability = 'Diffusion of Responsibility & Bureaucratic Meeting Loops';
      recommendedModel = 'embedding';
    } else {
      frictionLevel = 'moderate';
      velocityDrag = 18.5;
      primaryVulnerability = 'Latent Decision Drag & Unclear Authority Boundaries';
      recommendedModel = 'diagnostic';
    }

    return {
      frictionScore: score,
      frictionLevel,
      velocityDragPercent: velocityDrag,
      primaryVulnerability,
      recommendedModel,
      executivePrescription:
        recommendedModel === 'retainer'
          ? 'Track 03 (Retainer) · Sovereign Strategic Counsel: Direct in-camera counsel to Chair & CEO to neutralize board friction and restore sovereign authority.'
          : recommendedModel === 'embedding'
          ? 'Track 02 · Operating Architecture Embedding: In-situ 90-day overhaul replacing consensus meetings with autonomous 14-day execution loops.'
          : 'Track 01 · Forensic Audit Diagnostic: 14-day forensic teardown of governance lag and uncodified authority lines.',
      boardMemorandumPreview: `Institutional Friction Index: ${score}/100. Capital Velocity Drag: -${velocityDrag}%. Primary Failure Mode: ${primaryVulnerability}. Recommended Pathway: ${
        recommendedModel === 'retainer'
          ? 'Sovereign Strategic Counsel'
          : recommendedModel === 'embedding'
          ? 'Operating Architecture Embedding'
          : 'Mandate Forensic Diagnostic'
      }.`,
    };
  };

  const currentResult = computeResult(levers);

  const handleSelectOption = (
    category: keyof DiagnosticLevers,
    value: DiagnosticLevers[keyof DiagnosticLevers]
  ) => {
    setLevers((prev) => ({ ...prev, [category]: value }));
  };

  const handleGenerateMemorandum = async () => {
    setIsGeneratingAi(true);
    setActiveTab('memorandum');
    const modelTitle =
      currentResult.recommendedModel === 'retainer'
        ? 'Sovereign Strategic Counsel'
        : currentResult.recommendedModel === 'embedding'
        ? 'Operating Architecture Embedding'
        : 'Mandate Forensic Diagnostic';

    try {
      const memo = await generateExecutiveMemorandum(
        levers,
        currentResult.frictionScore,
        modelTitle
      );
      setAiMemorandum(memo);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const recommendedTitle =
    currentResult.recommendedModel === 'retainer'
      ? 'Sovereign Strategic Counsel'
      : currentResult.recommendedModel === 'embedding'
      ? 'Operating Architecture Embedding'
      : 'Mandate Forensic Diagnostic';

  return (
    <section id="diagnostic" className="py-10 sm:py-12 lg:py-14 border-b border-[#e5decfe0] bg-[#f8f6f0] relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-5 sm:mb-6">
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase text-[#9d7b38] font-bold mb-1.5 sm:mb-2">
            <span className="bg-[#17181c] text-[#d4af37] px-2 py-0.5 rounded-xs font-mono">Phase 2 · In-Depth Assessment</span>
            <span aria-hidden="true" className="text-[#c9bea9]">·</span>
            <span className="text-[#17181c] font-bold">Patent Pending Ref: L.O.S.-P721</span>
            <span aria-hidden="true" className="text-[#c9bea9]">·</span>
            <span>Architectural Vectoring</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#17181c] leading-tight">
            The In-Depth Leadership Operating System (L.O.S.) Diagnostic™
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#4e5159] font-normal leading-relaxed italic">
            Conventional leadership surveys measure surface symptoms. Our <strong className="font-bold text-[#17181c] not-italic">patent-pending architectural diagnostic</strong> isolates where operational drag and latency accumulate across meetings, committees, and consensus loops.
          </p>
        </div>

        {/* Diagnostic Cockpit Container */}
        <div className="bg-white/95 border border-[#e5decfe0] rounded-lg p-4 sm:p-6 lg:p-7 shadow-xs">
          
          {/* Top Bar of Diagnostic */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3.5 mb-4 sm:mb-5 border-b border-[#e8e2d5] gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] text-[#6b6e76] uppercase font-bold">Assessment Engine:</span>
              <span className="text-[11px] font-bold text-[#17181c] bg-[#f8f6f0] border border-[#e5decfe0] px-2.5 py-0.5 rounded shadow-xs">
                3 Decisive Governance Levers
              </span>
              <span className="text-[11px] text-[#9d7b38] font-bold bg-[#faf6ee] border border-[#ebdcc0] px-2 py-0.5 rounded flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37] animate-gold-pulse" />
                <em>Immediate Architectural Vectoring</em>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setActiveTab('interactive')}
                className={`px-3 py-1.5 text-xs font-bold rounded transition-colors min-h-[38px] flex items-center justify-center ${
                  activeTab === 'interactive'
                    ? 'bg-[#17181c] text-[#f8f6f0] shadow-xs'
                    : 'text-[#4e5159] hover:text-[#17181c] bg-[#f8f6f0] border border-[#e5decfe0]'
                }`}
              >
                1. Vector Switches
              </button>
              <button
                onClick={handleGenerateMemorandum}
                className={`px-3 py-1.5 text-xs font-bold rounded transition-colors flex items-center justify-center gap-1.5 min-h-[38px] ${
                  activeTab === 'memorandum'
                    ? 'bg-[#17181c] text-[#f8f6f0] shadow-xs'
                    : 'text-[#9d7b38] hover:text-[#7d5f24] bg-[#faf6ee] border border-[#ebdcc0]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>2. Board Memo</span>
              </button>
              <button
                onClick={() => setActiveTab('dossier')}
                className={`px-3 py-1.5 text-xs font-bold rounded transition-colors flex items-center justify-center gap-1.5 min-h-[38px] ${
                  activeTab === 'dossier'
                    ? 'bg-black text-[#d4af37] border-2 border-[#d4af37] shadow-xs'
                    : 'text-[#17181c] hover:text-[#d4af37] bg-[#14151a] text-white border border-[#2b2d33]'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>3. The Sovereign Dossier™ (Features)</span>
              </button>
            </div>
          </div>

          {activeTab === 'interactive' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
              
              {/* Left 7 Columns: The 3 Governance Switches */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-5">
                
                {/* Switch 1: Decision Speed */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs uppercase font-bold text-[#17181c]">
                      Governance Vector 01 · Decision Speed & Follow-Through
                    </label>
                    <span className="text-[11px] text-[#6b6e76] italic">Where do decisions get delayed?</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      {
                        id: 'consensus-stalled',
                        label: 'Consensus Paralysis',
                        sub: 'Decisions stall in endless review cycles',
                      },
                      {
                        id: 'hybrid-friction',
                        label: 'Second-Guessing',
                        sub: 'People hesitate after sign-off',
                      },
                      {
                        id: 'autonomous-cadence',
                        label: 'Clear Decision Rights',
                        sub: 'Fast 14-day yes/no loops',
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectOption('decisionVelocity', opt.id as any)}
                        className={`p-3 rounded text-left border transition-all min-h-[58px] cursor-pointer ${
                          levers.decisionVelocity === opt.id
                            ? 'bg-[#17181c] border-[#17181c] text-[#f8f6f0] shadow-xs'
                            : 'bg-[#fcfaf7] border-[#e5decfe0] hover:border-[#c5a059] text-[#17181c]'
                        }`}
                      >
                        <div className="text-xs font-bold">{opt.label}</div>
                        <div className={`text-[10px] sm:text-[11px] mt-0.5 italic ${levers.decisionVelocity === opt.id ? 'text-[#c4c7d2]' : 'text-[#6b6e76]'}`}>
                          {opt.sub}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Switch 2: Board Alignment */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs uppercase font-bold text-[#17181c]">
                      Governance Vector 02 · Board & Leadership Team Alignment
                    </label>
                    <span className="text-[11px] text-[#6b6e76] italic">Support vs. Interrogation</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      {
                        id: 'factional-impasse',
                        label: 'Boardroom Deadlock',
                        sub: 'Investors pull in opposite ways',
                      },
                      {
                        id: 'reactive-review',
                        label: 'Interrogation Meetings',
                        sub: 'Debating past mistakes',
                      },
                      {
                        id: 'sovereign-coherence',
                        label: 'Complete Strategic Unity',
                        sub: 'United on long-term priorities',
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectOption('boardAlignment', opt.id as any)}
                        className={`p-3 rounded text-left border transition-all min-h-[58px] cursor-pointer ${
                          levers.boardAlignment === opt.id
                            ? 'bg-[#17181c] border-[#17181c] text-[#f8f6f0] shadow-xs'
                            : 'bg-[#fcfaf7] border-[#e5decfe0] hover:border-[#c5a059] text-[#17181c]'
                        }`}
                      >
                        <div className="text-xs font-bold">{opt.label}</div>
                        <div className={`text-[10px] sm:text-[11px] mt-0.5 italic ${levers.boardAlignment === opt.id ? 'text-[#c4c7d2]' : 'text-[#6b6e76]'}`}>
                          {opt.sub}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Switch 3: Succession Resilience */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs uppercase font-bold text-[#17181c]">
                      Governance Vector 03 · Key-Person Independence & Bench Strength
                    </label>
                    <span className="text-[11px] text-[#6b6e76] italic">Could the business run without you?</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      {
                        id: 'single-point-fragile',
                        label: 'Founder Bottleneck',
                        sub: 'Everything freezes without CEO',
                      },
                      {
                        id: 'ad-hoc-bench',
                        label: 'Unclear Succession',
                        sub: 'Future leaders not prepared',
                      },
                      {
                        id: 'multi-tier-runway',
                        label: 'Autonomous Leadership',
                        sub: 'Units run smoothly without CEO',
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectOption('successionResilience', opt.id as any)}
                        className={`p-3 rounded text-left border transition-all min-h-[58px] cursor-pointer ${
                          levers.successionResilience === opt.id
                            ? 'bg-[#17181c] border-[#17181c] text-[#f8f6f0] shadow-xs'
                            : 'bg-[#fcfaf7] border-[#e5decfe0] hover:border-[#c5a059] text-[#17181c]'
                        }`}
                      >
                        <div className="text-xs font-bold">{opt.label}</div>
                        <div className={`text-[10px] sm:text-[11px] mt-0.5 italic ${levers.successionResilience === opt.id ? 'text-[#c4c7d2]' : 'text-[#6b6e76]'}`}>
                          {opt.sub}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Diagnostic Footer Notice */}
                <div className="p-3 rounded bg-[#faf6ee] border border-[#ebdcc0] flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#9d7b38] shrink-0" />
                    <span className="text-xs text-[#33353a]">
                      <strong>Confidential Vector Isolation:</strong> Calculations execute locally under client privilege.
                    </span>
                  </div>
                  <button
                    onClick={() => setLevers({
                      decisionVelocity: 'consensus-stalled',
                      boardAlignment: 'factional-impasse',
                      successionResilience: 'single-point-fragile'
                    })}
                    className="text-xs text-[#6b6e76] hover:text-[#17181c] flex items-center gap-1 font-semibold shrink-0"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              {/* Right 5 Columns: Instant Diagnosis Output */}
              <div className="lg:col-span-5 flex flex-col justify-between p-4 sm:p-5 rounded-lg bg-[#fbf9f5] border border-[#e5decfe0] shadow-xs relative">
                
                <div>
                  <div className="flex flex-wrap items-center justify-between pb-2.5 border-b border-[#e8e2d5] mb-3.5 gap-2">
                    <div className="flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-[#9d7b38] animate-pulse" />
                      <span className="text-[11px] uppercase text-[#6b6e76] font-bold">Real-Time Vector State</span>
                    </div>
                    <span className="text-[10px] text-[#9d7b38] font-bold bg-[#faf6ee] border border-[#ebdcc0] px-2 py-0.5 rounded">
                      Patent Pending Ref: L.O.S.-P721
                    </span>
                  </div>

                  {/* Big Number Metrics */}
                  <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mb-3.5">
                    <div className="p-3 rounded bg-white border border-[#e5decfe0] shadow-xs">
                      <div className="text-[11px] text-[#6b6e76] font-medium">Institutional Friction</div>
                      <div className="text-2xl font-bold text-[#17181c] tabular-nums mt-0.5">
                        {currentResult.frictionScore}
                        <span className="text-xs text-[#8c8f97] font-normal"> /100</span>
                      </div>
                      <div className="text-[10px] text-red-700 mt-0.5 uppercase font-bold">
                        {currentResult.frictionLevel} Risk
                      </div>
                    </div>

                    <div className="p-3 rounded bg-white border border-[#e5decfe0] shadow-xs">
                      <div className="text-[11px] text-[#6b6e76] font-medium">Velocity Drag Tax</div>
                      <div className="text-2xl font-bold text-[#9d7b38] tabular-nums mt-0.5">
                        -{currentResult.velocityDragPercent}%
                      </div>
                      <div className="text-[10px] text-[#6b6e76] mt-0.5 italic">
                        Capital cycle slowdown
                      </div>
                    </div>
                  </div>

                  {/* Primary Vulnerability Box */}
                  <div className="p-3.5 rounded bg-[#17181c] text-white border border-[#2b2d33] mb-3">
                    <div className="text-[10px] uppercase text-[#d4af37] font-bold mb-0.5">
                      Primary Institutional Failure Mode
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-white leading-snug">
                      {currentResult.primaryVulnerability}
                    </div>
                    <div className="mt-1 text-xs text-[#a6a9b2] leading-relaxed italic">
                      Organizations don't stall because they lack talent; they stall because no one has permission to make an uncomfortable call.
                    </div>
                  </div>

                  {/* Prescribed Partnership Pathway */}
                  <div className="p-3.5 rounded bg-white border border-[#ebdcc0] mb-2.5">
                    <div className="text-[10px] uppercase text-[#9d7b38] font-bold mb-0.5">
                      Prescribed Partnership Pathway
                    </div>
                    <div className="text-sm font-bold text-[#17181c]">
                      {recommendedTitle}
                    </div>
                    <div className="text-xs text-[#54575f] mt-1 leading-relaxed italic">
                      {currentResult.executivePrescription}
                    </div>
                  </div>

                  {/* Council Chambers Feature Inclusion */}
                  <div className="p-3 rounded bg-[#17181c] text-[#f8f6f0] border border-[#d4af37]/60 mb-3 space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-[#d4af37] font-bold">
                      <Sparkles className="w-3 h-3 text-[#d4af37]" />
                      <span>Council Chambers Feature Included</span>
                    </div>
                    <p className="text-[11px] text-stone-300 leading-relaxed">
                      This diagnostic gives you a <strong>taste of The Council Chambers</strong> (1 private sparring session with peer CEOs). Want the full strategic year-round version? It unlocks when you select an Implementation pathway.
                    </p>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="space-y-2 pt-3 border-t border-[#e8e2d5]">
                  <button
                    onClick={() => onSelectPartnership(currentResult.recommendedModel)}
                    className="w-full py-2.5 px-3 text-xs font-bold uppercase text-[#f8f6f0] bg-[#17181c] hover:bg-[#282a30] transition-colors rounded-sm flex items-center justify-center gap-2 shadow-xs min-h-[42px]"
                  >
                    <span>View {recommendedTitle}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#d4af37]" />
                  </button>
                  <button
                    onClick={handleGenerateMemorandum}
                    className="w-full py-2.5 px-3 text-xs font-bold text-[#9d7b38] hover:text-[#7d5f24] bg-[#faf6ee] hover:bg-[#f5ede0] border border-[#ebdcc0] transition-colors rounded-sm flex items-center justify-center gap-1.5 min-h-[42px] cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Generate Confidential Boardroom Memorandum</span>
                  </button>

                  <div className="pt-2 flex items-center justify-between text-xs font-mono">
                    <button
                      onClick={() => {
                        window.location.hash = 'test';
                      }}
                      className="text-[#6b6e76] hover:text-[#17181c] transition-colors py-1 cursor-pointer font-bold"
                    >
                      ← Return to Free 60-Sec Test
                    </button>
                    <button
                      onClick={() => {
                        window.location.hash = 'top';
                      }}
                      className="text-[#6b6e76] hover:text-[#17181c] transition-colors py-1 cursor-pointer"
                    >
                      ← Back to Home
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : activeTab === 'memorandum' ? (
            /* AI Boardroom Memorandum View */
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#e8e2d5] gap-2.5">
                <div>
                  <div className="text-[11px] uppercase font-bold text-[#9d7b38]">
                    Synthesized Boardroom Intelligence · Privileged
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#17181c] mt-0.5">
                    Executive Board Diagnostic Memorandum
                  </h3>
                </div>
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={() => setActiveTab('interactive')}
                    className="px-3.5 py-1.5 text-xs font-bold text-[#4e5159] hover:text-[#17181c] border border-[#e5decfe0] rounded bg-white min-h-[38px] cursor-pointer"
                  >
                    ← Back to Switches
                  </button>
                  <button
                    onClick={() => {
                      window.location.hash = 'top';
                    }}
                    className="px-3 py-1.5 text-xs font-mono text-[#6b6e76] hover:text-[#17181c] border border-[#e5decfe0] rounded bg-white min-h-[38px] cursor-pointer"
                  >
                    ← Back to Home
                  </button>
                  <button
                    onClick={() => onConsultationRequest(aiMemorandum || currentResult.boardMemorandumPreview)}
                    className="px-4 py-1.5 text-xs font-bold uppercase text-[#f8f6f0] bg-[#17181c] hover:bg-[#282a30] rounded-sm shadow-xs min-h-[38px] cursor-pointer"
                  >
                    Book In-Camera Briefing
                  </button>
                </div>
              </div>

              {isGeneratingAi ? (
                <div className="py-14 flex flex-col items-center justify-center space-y-3">
                  <div className="relative">
                    <Loader2 className="w-8 h-8 text-[#c5a059] animate-spin" />
                    <Sparkles className="w-3.5 h-3.5 text-[#d4af37] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#17181c]">
                    Synthesizing Board Mandate & Capital Friction Vectors...
                  </div>
                  <div className="text-xs text-[#6b6e76] italic">
                    Cross-referencing sovereign governance protocols and authority boundaries
                  </div>
                </div>
              ) : (
                <div className="bg-[#fcfaf7] border border-[#ebdcc0] rounded p-4 sm:p-6 space-y-3">
                  <div className="prose max-w-none text-[#2b2d32] text-xs sm:text-sm leading-relaxed whitespace-pre-line font-serif">
                    {aiMemorandum || currentResult.boardMemorandumPreview}
                  </div>
                  <div className="pt-4 border-t border-[#e8e2d5] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="text-xs text-[#6b6e76] italic">
                      Strict Chatham House Privilege. Distributed only to Lead Director & Chief Executive.
                    </div>
                    <button
                      onClick={() => onConsultationRequest(aiMemorandum || currentResult.boardMemorandumPreview)}
                      className="px-5 py-2 text-xs font-bold uppercase text-[#f8f6f0] bg-[#17181c] hover:bg-[#282a30] rounded-sm text-center min-h-[38px]"
                    >
                      Commission Formal Audit
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Dossier Tab View */
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#e8e2d5]">
                <div className="text-xs uppercase font-bold text-[#9d7b38]">
                  Patent Pending Architecture · Reference L.O.S.-P721
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('interactive')}
                    className="px-3.5 py-1.5 text-xs font-bold text-[#4e5159] hover:text-[#17181c] border border-[#e5decfe0] rounded bg-white cursor-pointer"
                  >
                    ← Back to Vector Switches
                  </button>
                  <button
                    onClick={() => {
                      window.location.hash = 'top';
                    }}
                    className="px-3 py-1.5 text-xs font-mono text-[#6b6e76] hover:text-[#17181c] border border-[#e5decfe0] rounded bg-white cursor-pointer"
                  >
                    ← Back to Home
                  </button>
                </div>
              </div>
              <SovereignDossierFeatures
                onTakeTest={() => setActiveTab('interactive')}
                onBookBriefing={() => onConsultationRequest(aiMemorandum || currentResult.boardMemorandumPreview)}
              />
            </div>
          )}
        </div>

        {/* Global Deep-Dive Section for The Sovereign Dossier on the Diagnostic page */}
        <div className="mt-10 sm:mt-12">
          <SovereignDossierFeatures
            onTakeTest={() => {
              setActiveTab('interactive');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBookBriefing={() => onConsultationRequest(aiMemorandum || currentResult.boardMemorandumPreview)}
          />
        </div>

      </div>
    </section>
  );
};
