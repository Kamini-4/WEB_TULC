import React, { useState } from 'react';
import { Mic, MicOff, Sparkles, Loader2, ShieldAlert, MessageSquare, AlertCircle } from 'lucide-react';
import { simulateBoardroomSparring } from '../services/gemini';

const PRESET_DILEMMAS = [
  {
    title: 'Activist Proxy Contest',
    snippet: '7.8% activist fund demands 2 board seats and immediate spin-off; CEO threatens to resign.',
    prompt: 'A 7.8% activist hedge fund has filed a 13D demanding 2 board seats, an immediate spin-off of our high-margin enterprise infrastructure unit, and CEO replacement within 45 days. The CEO refuses to engage and threatens immediate resignation, which would destabilize our largest sovereign debt refinancing. How should the Lead Independent Director structure the emergency 48-hour board response?'
  },
  {
    title: 'Founder-CEO Succession Collision',
    snippet: 'Founder-CEO is promoting internal loyalist; board and institutional investors demand external scale leader.',
    prompt: 'Our Founder-CEO of 14 years is preparing for transition but insists on hand-picking an internal loyalist EVP who lacks public market credentials. Institutional investors holding 38% of voting shares have discreetly informed the nominating chair that they will vote against any internal candidate without a formal external search. How do we prevent a boardroom mutiny while honoring founder legacy?'
  },
  {
    title: 'Post-Merger C-Suite Impasse',
    snippet: 'Merged entities operating with dual C-suites; capital allocation is completely frozen.',
    prompt: 'Following a major cross-border enterprise merger, the legacy executive teams have formed defensive factions. Decisions on unified operating platforms, product roadmap, and strategic capital expenditure are stalled in redundant co-leadership committees. We are experiencing severe duplicate overhead and paralyzing friction. What is the emergency structural mandate needed to dissolve the impasse?'
  }
];

export const ExecutiveWarRoom: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState<number>(0);
  const [customDilemma, setCustomDilemma] = useState(PRESET_DILEMMAS[0].prompt);
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState<string | null>(null);
  const [sparringResult, setSparringResult] = useState<{
    critique: string;
    unspokenInvariant: string;
    recommendedResolution: string[];
  } | null>(null);

  // Voice input via browser Web Speech API
  const handleToggleVoice = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setVoiceNotice('Speech recognition is not supported in this browser. Please type your dilemma directly.');
      setTimeout(() => setVoiceNotice(null), 4000);
      return;
    }

    if (isRecording) {
      setIsRecording(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsRecording(true);
        setVoiceNotice(null);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setCustomDilemma((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsRecording(false);
      };

      recognition.onerror = (err: any) => {
        console.error('Speech recognition error:', err);
        setIsRecording(false);
        setVoiceNotice('Microphone input encountered an error. You can type directly.');
        setTimeout(() => setVoiceNotice(null), 3000);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } catch (err) {
      console.error(err);
      setIsRecording(false);
      setVoiceNotice('Voice input could not be started. Please type your dilemma.');
      setTimeout(() => setVoiceNotice(null), 3000);
    }
  };

  const handleRunSparring = async () => {
    if (!customDilemma.trim()) return;
    setIsAnalyzing(true);
    try {
      const result = await simulateBoardroomSparring(
        customDilemma,
        PRESET_DILEMMAS[selectedPreset]?.title
      );
      setSparringResult(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section id="war-room" className="py-10 sm:py-14 lg:py-16 border-b border-[#e3dcce] bg-[#f5f1e8]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-5 sm:mb-6">
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase text-[#9d7b38] font-bold mb-1.5 sm:mb-2">
            <span>Executive Simulation</span>
            <span aria-hidden="true" className="text-[#c9bea9]">·</span>
            <span className="text-[#141416] font-bold">AI Boardroom Sparring</span>
            <span aria-hidden="true" className="text-[#c9bea9]">·</span>
            <span>Voice & Text</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#141416] leading-tight">
            The Strategic War Room
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#4a4c52] font-normal leading-relaxed">
            Pressure-test high-stakes governance dilemmas before entering the boardroom. Our advisory engine critiques power dynamics, isolates the unspoken invariant, and formulates decisive resolution protocols.
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          
          {/* Left Column: Input and Preset Selector */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Presets */}
            <div>
              <div className="text-[11px] uppercase text-[#6b6e76] font-bold mb-2">
                Select Benchmark Dilemma or Speak Your Own:
              </div>
              <div className="space-y-1.5">
                {PRESET_DILEMMAS.map((dilemma, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedPreset(idx);
                      setCustomDilemma(dilemma.prompt);
                    }}
                    className={`w-full text-left p-3 rounded border transition-all ${
                      selectedPreset === idx && customDilemma === dilemma.prompt
                        ? 'border-[#141416] bg-white text-[#141416] ring-1 ring-[#141416] shadow-xs'
                        : 'border-[#e3dcce] bg-[#fbf9f5] hover:bg-white text-[#4a4c52]'
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-bold text-[#141416]">
                      {dilemma.title}
                    </div>
                    <div className="text-xs text-[#6b6e76] mt-0.5 line-clamp-1">
                      {dilemma.snippet}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Dilemma Textarea + Voice Control */}
            <div className="p-3.5 sm:p-4 rounded-lg bg-white/95 border border-[#e3dcce] shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2.5 mb-2 border-b border-[#e8e2d5] gap-2">
                <span className="text-[11px] uppercase text-[#6b6e76] font-bold">Dilemma Specification</span>
                
                {/* Voice Input Button */}
                <button
                  type="button"
                  onClick={handleToggleVoice}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs transition-colors self-start sm:self-auto min-h-[36px] ${
                    isRecording
                      ? 'bg-red-100 text-red-700 border border-red-300 animate-pulse font-bold'
                      : 'bg-[#f5f1e8] hover:bg-[#ede6d8] text-[#141416] border border-[#d8cebe] font-semibold'
                  }`}
                  title="Speak your boardroom dilemma using microphone"
                >
                  {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-[#9d7b38]" />}
                  <span>{isRecording ? 'Listening...' : 'Voice Input'}</span>
                </button>
              </div>

              {voiceNotice && (
                <div className="mb-2 p-2 rounded bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                  <span>{voiceNotice}</span>
                </div>
              )}

              <textarea
                value={customDilemma}
                onChange={(e) => setCustomDilemma(e.target.value)}
                rows={4}
                placeholder="State the confidential board dilemma, shareholder dynamic, or C-suite authority conflict..."
                className="w-full bg-[#fbf9f5] border border-[#e3dcce] rounded p-3 text-base sm:text-xs text-[#141416] placeholder:text-[#8c8f97] focus:outline-none focus:border-[#141416] resize-none leading-relaxed"
              />

              <div className="pt-2.5 border-t border-[#e8e2d5] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                <span className="text-xs text-[#6b6e76]">
                  Confidential session · Privileged
                </span>
                <button
                  onClick={handleRunSparring}
                  disabled={isAnalyzing || !customDilemma.trim()}
                  className="w-full sm:w-auto px-4 py-2 text-xs font-bold uppercase text-[#f5f1e8] bg-[#141416] hover:bg-[#282a2e] transition-colors rounded-sm flex items-center justify-center gap-2 disabled:opacity-50 shadow-xs min-h-[40px]"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Sparring Analysis...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Spar With Board Chair</span>
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Sparring Results */}
          <div className="lg:col-span-6">
            <div className="h-full p-4 sm:p-6 rounded-lg bg-white/95 border border-[#e3dcce] flex flex-col justify-between shadow-xs">
              
              <div>
                <div className="flex flex-wrap items-center justify-between pb-2.5 mb-3.5 border-b border-[#e8e2d5] gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#9d7b38]">WAR ROOM</span>
                    <span className="text-[11px] uppercase text-[#6b6e76] font-bold">Lead Director Critique</span>
                  </div>
                  <span className="text-xs text-[#8c8f97]">Tier 1 Sovereign Counsel</span>
                </div>

                {isAnalyzing ? (
                  <div className="py-12 text-center">
                    <Loader2 className="w-7 h-7 text-[#9d7b38] animate-spin mx-auto mb-3" />
                    <div className="text-sm font-bold text-[#141416]">
                      Convening Executive Sparring Engine...
                    </div>
                    <div className="text-xs text-[#6b6e76] mt-1">
                      Deconstructing political factions and governance fault lines
                    </div>
                  </div>
                ) : sparringResult ? (
                  <div className="space-y-3.5">
                    
                    {/* The Unspoken Invariant */}
                    <div className="p-3 rounded bg-[#faf6ee] border border-[#ebdcc0]">
                      <div className="flex items-center gap-1.5 mb-0.5">
                        <ShieldAlert className="w-4 h-4 text-[#9d7b38]" />
                        <span className="text-[11px] uppercase font-bold text-[#9d7b38]">
                          The Unspoken Invariant
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#141416] leading-relaxed font-semibold italic">
                        "{sparringResult.unspokenInvariant}"
                      </p>
                    </div>

                    {/* Core Governance Critique */}
                    <div>
                      <div className="text-[11px] uppercase text-[#6b6e76] font-bold mb-1">
                        Institutional Power & Mandate Diagnosis
                      </div>
                      <p className="text-xs sm:text-sm text-[#33353a] leading-relaxed bg-[#fbf9f5] p-3 rounded border border-[#e3dcce]">
                        {sparringResult.critique}
                      </p>
                    </div>

                    {/* Recommended Resolution Steps */}
                    <div>
                      <div className="text-[11px] uppercase text-[#6b6e76] font-bold mb-1">
                        Mandated 3-Step Boardroom Protocol
                      </div>
                      <div className="space-y-1.5">
                        {sparringResult.recommendedResolution.map((step, idx) => (
                          <div key={idx} className="flex items-start gap-2 p-2.5 rounded bg-[#fbf9f5] border border-[#e3dcce] text-xs text-[#141416]">
                            <span className="text-[#9d7b38] font-bold">0{idx + 1}.</span>
                            <span className="leading-relaxed font-semibold">{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                ) : (
                  <div className="py-10 text-center text-[#8c8f97]">
                    <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-30 text-[#9d7b38]" />
                    <div className="text-sm font-semibold text-[#141416]">
                      Awaiting Boardroom Dilemma
                    </div>
                    <p className="text-xs text-[#6b6e76] mt-1 max-w-sm mx-auto">
                      Select one of the corporate scenarios on the left or speak your dilemma to receive a Lead Director critique.
                    </p>
                  </div>
                )}
              </div>

              {sparringResult && (
                <div className="mt-4 pt-3 border-t border-[#e8e2d5] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-[11px] text-[#7d8089]">
                    Model: Gemini 3.8 Flash Institutional Engine
                  </span>
                  <a
                    href="#contact"
                    className="text-xs text-[#9d7b38] hover:text-[#7d5f24] font-bold underline underline-offset-4"
                  >
                    Engage Retained Advisory →
                  </a>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
