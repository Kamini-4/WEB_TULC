import React, { useState } from 'react';
import { DiagnosticLevers, DiagnosticResult, PartnershipModelId } from '../types';
import { generateExecutiveMemorandum } from '../services/gemini';
import { Loader2, Sparkles, Activity, ShieldCheck, ArrowRight, RefreshCw } from 'lucide-react';

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

  const [activeTab, setActiveTab] = useState<'interactive' | 'memorandum'>('interactive');
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
          ? 'Category 03 · Sovereign Strategic Counsel: Direct in-camera counsel to Chair & CEO to neutralize board friction and restore sovereign authority.'
          : recommendedModel === 'embedding'
          ? 'Category 02 · Operating Architecture Embedding: In-situ 90-day overhaul replacing consensus meetings with autonomous 14-day execution loops.'
          : 'Category 01 · Mandate Forensic Diagnostic: 14-day forensic teardown of governance lag and uncodified authority lines.',
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
    <section id="diagnostic" className="py-10 sm:py-14 lg:py-16 border-b border-[#e5decfe0] bg-[#f8f6f0] relative">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-5 sm:mb-6">
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase text-[#9d7b38] font-bold mb-1.5 sm:mb-2">
            <span>Proprietary Assessment</span>
            <span aria-hidden="true" className="text-[#c9bea9]">·</span>
            <span className="text-[#17181c] font-bold">Patent Pending Ref: L.O.S.-P721</span>
            <span aria-hidden="true" className="text-[#c9bea9]">·</span>
            <span>Architectural Vectoring</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#17181c] leading-tight">
            The Patent-Pending Leadership Operating System (L.O.S.) Diagnostic™
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#4e5159] font-normal leading-relaxed italic">
            Conventional leadership surveys measure symptoms and polite corporate feelings. Our <strong className="font-bold text-[#17181c] not-italic">patent-pending architectural diagnostic</strong> isolates where organizational fear hides behind meetings, committees, and consensus loops.
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

            <div className="grid grid-cols-2 sm:flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setActiveTab('interactive')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded transition-colors min-h-[38px] flex items-center justify-center ${
                  activeTab === 'interactive'
                    ? 'bg-[#17181c] text-[#f8f6f0] shadow-xs'
                    : 'text-[#4e5159] hover:text-[#17181c] bg-[#f8f6f0] border border-[#e5decfe0]'
                }`}
              >
                1. Vector Switches
              </button>
              <button
                onClick={handleGenerateMemorandum}
                className={`px-3.5 py-1.5 text-xs font-bold rounded transition-colors flex items-center justify-center gap-1.5 min-h-[38px] ${
                  activeTab === 'memorandum'
                    ? 'bg-[#17181c] text-[#f8f6f0] shadow-xs'
                    : 'text-[#9d7b38] hover:text-[#7d5f24] bg-[#faf6ee] border border-[#ebdcc0]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                <span>2. Generate Board Memo</span>
              </button>
            </div>
          </div>

          {activeTab === 'interactive' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
              
              {/* Left 7 Columns: The 3 Governance Switches */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-5">
                
                {/* Switch 1: Decision Velocity */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs uppercase font-bold text-[#17181c]">
                      Category 01 · Decision Velocity & Mandate Cadence
                    </label>
                    <span className="text-[11px] text-[#6b6e76] italic">Where does conviction stall?</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      {
                        id: 'consensus-stalled',
                        label: 'Consensus Paralysis',
                        sub: 'Decisions hide in committees',
                      },
                      {
                        id: 'hybrid-friction',
                        label: 'Post-Facto Review',
                        sub: 'Second-guessing after signoff',
                      },
                      {
                        id: 'autonomous-cadence',
                        label: 'Sovereign Mandate',
                        sub: 'Explicit 14-day yes/no loops',
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectOption('decisionVelocity', opt.id as any)}
                        className={`p-3 rounded text-left border transition-all min-h-[58px] ${
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
                      Category 02 · Board-Executive Governance Alignment
                    </label>
                    <span className="text-[11px] text-[#6b6e76] italic">Governance vs. Interrogation</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      {
                        id: 'factional-impasse',
                        label: 'Factional Impasse',
                        sub: 'Sponsor & investor rivalry',
                      },
                      {
                        id: 'reactive-review',
                        label: 'Audit Theater',
                        sub: 'Historical operational auditing',
                      },
                      {
                        id: 'sovereign-coherence',
                        label: 'Strategic Alignment',
                        sub: 'In-camera alignment on capital',
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectOption('boardAlignment', opt.id as any)}
                        className={`p-3 rounded text-left border transition-all min-h-[58px] ${
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
                      Category 03 · Leadership Bench & Succession Runway
                    </label>
                    <span className="text-[11px] text-[#6b6e76] italic">Institution vs. Individual</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {[
                      {
                        id: 'single-point-fragile',
                        label: 'Single-Point Fragility',
                        sub: 'Founder or CEO bottle-necking',
                      },
                      {
                        id: 'ad-hoc-bench',
                        label: 'Uncodified Bench',
                        sub: 'Succession discussed in hallways',
                      },
                      {
                        id: 'multi-tier-runway',
                        label: 'Institutional Runway',
                        sub: 'Succession codified & insulated',
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => handleSelectOption('successionResilience', opt.id as any)}
                        className={`p-3 rounded text-left border transition-all min-h-[58px] ${
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
                  <div className="p-3.5 rounded bg-white border border-[#ebdcc0] mb-3">
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
                    className="w-full py-2.5 px-3 text-xs font-bold text-[#9d7b38] hover:text-[#7d5f24] bg-[#faf6ee] hover:bg-[#f5ede0] border border-[#ebdcc0] transition-colors rounded-sm flex items-center justify-center gap-1.5 min-h-[42px]"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Generate Confidential Boardroom Memorandum</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
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
                    className="px-3.5 py-1.5 text-xs font-bold text-[#4e5159] hover:text-[#17181c] border border-[#e5decfe0] rounded bg-white min-h-[38px]"
                  >
                    ← Back to Switches
                  </button>
                  <button
                    onClick={() => onConsultationRequest(aiMemorandum || currentResult.boardMemorandumPreview)}
                    className="px-4 py-1.5 text-xs font-bold uppercase text-[#f8f6f0] bg-[#17181c] hover:bg-[#282a30] rounded-sm shadow-xs min-h-[38px]"
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
          )}
        </div>
      </div>
    </section>
  );
};
