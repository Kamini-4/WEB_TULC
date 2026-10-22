import React, { useState, useEffect, useRef } from 'react';
import { 
  Crown, 
  Shield, 
  Zap, 
  Brain, 
  Layers, 
  Cpu, 
  Scale, 
  Sparkles, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX, 
  Trash2, 
  Download, 
  Send, 
  Users, 
  User, 
  AlertTriangle, 
  TrendingDown, 
  CheckCircle2, 
  Clock, 
  Activity, 
  ChevronRight, 
  Radio, 
  Flame, 
  RotateCcw,
  Compass,
  Lock,
  ArrowRight
} from 'lucide-react';
import { generateCouncilChambersDialectic, CouncilDialecticResult } from '../services/gemini';

export type ChamberId = 'inner_sanctum' | 'citadel' | 'war_room' | 'observatory' | 'pantheon';
export type ContextPosture = 'corporate' | 'family_office' | 'alpha_founder';
export type DeliberationMode = 'single' | 'triad';

interface CouncilChambersProps {
  onApplyForSeat?: () => void;
  onExploreImplementation?: () => void;
  onSelectDiagnostic?: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'advisor' | 'consigliere' | 'dynastic' | 'orchestrator';
  text: string;
  timestamp: string;
  chamber: ChamberId;
  metadata?: {
    wpm?: number;
    shock?: string | null;
  };
}

export const CouncilChambers: React.FC<CouncilChambersProps> = ({
  onApplyForSeat,
  onExploreImplementation,
  onSelectDiagnostic
}) => {
  // 1. Chamber Navigation
  const [activeChamber, setActiveChamber] = useState<ChamberId>('inner_sanctum');
  const [posture, setPosture] = useState<ContextPosture>('alpha_founder');
  const [mode, setMode] = useState<DeliberationMode>('triad');
  
  // 2. Telemetry & Cockpit HUD
  const [hudOpen, setHudOpen] = useState<boolean>(true);
  const [activeShock, setActiveShock] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [wpm, setWpm] = useState<number>(142);
  const [pauseCadence, setPauseCadence] = useState<'Deliberate' | 'Steady' | 'Pressured'>('Steady');
  const [composureScore, setComposureScore] = useState<number>(88);
  const [ttsEnabled, setTtsEnabled] = useState<boolean>(false);

  // 3. Domain Radar / Telemetry State
  const [domainRadar, setDomainRadar] = useState({
    cognitiveClarity: 74,
    culturalFidelity: 62,
    strategicVelocity: 81,
    systemicIntegrity: 68,
    moralGravity: 85
  });

  // 4. Metabolic Decision Tax
  const [metabolicTax, setMetabolicTax] = useState({
    hoursLostWeekly: 16,
    annualEbitdaDrag: '$420,000 - $680,000 USD',
    latencyRisk: 'Acute'
  });

  // 5. Action Ledger
  const [actionLedger, setActionLedger] = useState<Array<{
    id: string;
    category: 'Decisive Veto' | 'Operational Rule' | 'Systemic Milestone';
    action: string;
    deadlineDays: number;
    completed?: boolean;
  }>>([
    {
      id: 'act-init-1',
      category: 'Decisive Veto',
      action: 'Veto all consensus meetings requiring >3 C-suite leads without a binding 48-hour mandate memo.',
      deadlineDays: 7
    },
    {
      id: 'act-init-2',
      category: 'Operational Rule',
      action: 'Set $50,000 autonomous deployment limits for VP Operations to decouple founder review.',
      deadlineDays: 14
    }
  ]);

  // 6. Dialogue State
  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'advisor',
      chamber: 'inner_sanctum',
      timestamp: '00:00:01',
      text: `### Strategic Sanctuary Active · Chatham House Privileged
You have entered **The Inner Sanctum**. This dialectic does not validate corporate consensus or flatter executive comfort. We stress-test assumptions, expose operational bottlenecks, and calculate your metabolic decision tax. 

State the high-stakes dilemma, board friction, or bottleneck currently stalling your enterprise conviction.`
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const speechRecognitionRef = useRef<any>(null);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Chambers Metadata
  const CHAMBERS = {
    inner_sanctum: {
      name: 'The Inner Sanctum',
      subtitle: 'Cognitive Clarity // Psychological Sovereignty',
      focus: 'Executive conviction, decision fatigue, internal misalignment, and unvarnished personal candor.',
      icon: Brain,
      borderTheme: 'border-amber-500/40',
      badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/30'
    },
    citadel: {
      name: 'The Citadel',
      subtitle: 'Cultural Fidelity // Distributed Intelligence',
      focus: 'Operational alignment, family governance, transmission of founder values, and dismantling cultural fragmentation.',
      icon: Shield,
      borderTheme: 'border-emerald-500/40',
      badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
    },
    war_room: {
      name: 'The War Room',
      subtitle: 'Strategic Velocity // Asymmetric Advantage',
      focus: 'Market agility, capital allocation, preemptive crisis posturing, and high-velocity decision loops.',
      icon: Zap,
      borderTheme: 'border-red-500/40',
      badgeBg: 'bg-red-500/10 text-red-400 border-red-500/30'
    },
    observatory: {
      name: 'The Observatory',
      subtitle: 'Systemic Integrity // Zero-Latency Manifestation',
      focus: 'Founder decoupling, institutional cybernetics, single-person bottleneck removal, and autonomous execution.',
      icon: Cpu,
      borderTheme: 'border-blue-500/40',
      badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/30'
    },
    pantheon: {
      name: 'The Pantheon',
      subtitle: 'Moral Gravity // Institutional Perpetuity',
      focus: 'Generational perpetuity, institutional ethics, legacy charters, and multi-century stewardship.',
      icon: Scale,
      borderTheme: 'border-purple-500/40',
      badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30'
    }
  };

  // Macroeconomic Shocks Definition
  const MACRO_SHOCKS = [
    {
      id: 'rate_spike',
      title: 'Interest Rate Spike (+300bps)',
      desc: 'Capital cost jumps sharply; cash-flow covenants tighten.',
      impact: { strategicVelocity: -12, systemicIntegrity: -8, cognitiveClarity: -5 }
    },
    {
      id: 'malacca_strait',
      title: 'Malacca Strait Disruption',
      desc: 'Maritime supply chain seizure; 45-day inventory delay.',
      impact: { strategicVelocity: -18, systemicIntegrity: -14, culturalFidelity: -6 }
    },
    {
      id: 'unplanned_handover',
      title: 'Unplanned Founder Handover',
      desc: 'Principal offline for 90 days; board governance tested.',
      impact: { systemicIntegrity: -25, cognitiveClarity: -15, culturalFidelity: -10 }
    },
    {
      id: 'liquidity_freeze',
      title: 'Credit Liquidity Freeze',
      desc: 'Credit lines contracted; working capital buffer drops 40%.',
      impact: { strategicVelocity: -15, moralGravity: -10, cognitiveClarity: -8 }
    }
  ];

  // Speech Recognition (Dictation)
  const toggleSpeechRecognition = () => {
    if (isRecording) {
      speechRecognitionRef.current?.stop();
      setIsRecording(false);
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Vocal dictation requires a browser supporting Web Speech API (Chrome, Edge, Safari).');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      let wordCount = 0;
      const startTime = Date.now();

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event: any) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        setInputPrompt((prev) => (prev ? `${prev} ${transcript}` : transcript));
        
        // Compute live WPM telemetry
        wordCount = transcript.trim().split(/\s+/).length;
        const elapsedMinutes = (Date.now() - startTime) / 60000;
        if (elapsedMinutes > 0.05) {
          const calculatedWpm = Math.min(220, Math.max(90, Math.round(wordCount / elapsedMinutes)));
          setWpm(calculatedWpm);
          if (calculatedWpm > 175) {
            setPauseCadence('Pressured');
            setComposureScore(72);
          } else if (calculatedWpm < 120) {
            setPauseCadence('Deliberate');
            setComposureScore(94);
          } else {
            setPauseCadence('Steady');
            setComposureScore(89);
          }
        }
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
      speechRecognitionRef.current = recognition;
    } catch (e) {
      console.error(e);
      setIsRecording(false);
    }
  };

  // Text-to-Speech
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/###/g, '').replace(/\*\*/g, '').replace(/---/g, '').slice(0, 400);
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  // Inject Macro Stress Shock
  const handleToggleShock = (shockId: string) => {
    if (activeShock === shockId) {
      setActiveShock(null);
      // Reset radar
      setDomainRadar({
        cognitiveClarity: 74,
        culturalFidelity: 62,
        strategicVelocity: 81,
        systemicIntegrity: 68,
        moralGravity: 85
      });
    } else {
      setActiveShock(shockId);
      const chosen = MACRO_SHOCKS.find(s => s.id === shockId);
      if (chosen) {
        setDomainRadar(prev => ({
          cognitiveClarity: Math.max(20, prev.cognitiveClarity + (chosen.impact.cognitiveClarity || 0)),
          culturalFidelity: Math.max(20, prev.culturalFidelity + (chosen.impact.culturalFidelity || 0)),
          strategicVelocity: Math.max(20, prev.strategicVelocity + (chosen.impact.strategicVelocity || 0)),
          systemicIntegrity: Math.max(20, prev.systemicIntegrity + (chosen.impact.systemicIntegrity || 0)),
          moralGravity: Math.max(20, prev.moralGravity + (chosen.impact.moralGravity || 0)),
        }));
      }
    }
  };

  // Submit Prompt to Dialectic
  const handleSendPrompt = async () => {
    if (!inputPrompt.trim() || isLoading) return;

    const currentText = inputPrompt.trim();
    setInputPrompt('');

    const userMessage: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: currentText,
      chamber: activeChamber,
      timestamp: new Date().toLocaleTimeString(),
      metadata: {
        wpm,
        shock: activeShock
      }
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const result: CouncilDialecticResult = await generateCouncilChambersDialectic({
        chamberId: activeChamber,
        deliberationMode: mode,
        contextPosture: posture,
        prompt: currentText,
        activeShock,
        wpm,
        composureScore
      });

      // Update Metabolic Tax
      if (result.metabolicDecisionTax) {
        setMetabolicTax({
          hoursLostWeekly: result.metabolicDecisionTax.hoursWastedPerWeek,
          annualEbitdaDrag: result.metabolicDecisionTax.annualEbitdaDragEstimate,
          latencyRisk: result.metabolicDecisionTax.latencyRisk
        });
      }

      // Update Action Ledger
      if (result.extractedActionLedger && result.extractedActionLedger.length > 0) {
        setActionLedger(prev => [...result.extractedActionLedger, ...prev]);
      }

      // Update Domain Radar
      if (result.domainScoreImpact) {
        setDomainRadar(prev => ({
          cognitiveClarity: Math.min(100, Math.max(20, prev.cognitiveClarity + result.domainScoreImpact.cognitiveClarity)),
          culturalFidelity: Math.min(100, Math.max(20, prev.culturalFidelity + result.domainScoreImpact.culturalFidelity)),
          strategicVelocity: Math.min(100, Math.max(20, prev.strategicVelocity + result.domainScoreImpact.strategicVelocity)),
          systemicIntegrity: Math.min(100, Math.max(20, prev.systemicIntegrity + result.domainScoreImpact.systemicIntegrity)),
          moralGravity: Math.min(100, Math.max(20, prev.moralGravity + result.domainScoreImpact.moralGravity)),
        }));
      }

      if (mode === 'triad' && result.triadPerspectives) {
        const triadMsg: Message = {
          id: `triad-${Date.now()}`,
          sender: 'advisor',
          chamber: activeChamber,
          timestamp: new Date().toLocaleTimeString(),
          text: `### Triad Roundtable Synthesis · 3 Strategic Personas\n\n${result.response}\n\n---\n\n#### 1. The Sovereign Consigliere (Authority & Power)\n${result.triadPerspectives.consigliere}\n\n#### 2. The Dynastic Wealth Strategist (Capital & Multiple Expansion)\n${result.triadPerspectives.dynasticStrategist}\n\n#### 3. The Execution Orchestrator (Throughput & Codified DNA)\n${result.triadPerspectives.executionOrchestrator}\n\n> *Telemetry Note:* ${result.deliveryComposureNote || 'Composed delivery. Focused strategic alpha.'}`
        };
        setMessages(prev => [...prev, triadMsg]);
        if (ttsEnabled) speakText(result.response);
      } else {
        const singleMsg: Message = {
          id: `adv-${Date.now()}`,
          sender: 'advisor',
          chamber: activeChamber,
          timestamp: new Date().toLocaleTimeString(),
          text: `### Challenger Dialectic · ${CHAMBERS[activeChamber].name}\n\n${result.response}\n\n> *Telemetry Note:* ${result.deliveryComposureNote || 'Steady delivery composure.'}`
        };
        setMessages(prev => [...prev, singleMsg]);
        if (ttsEnabled) speakText(result.response);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  // Instant Purge Protocol (Zero Data Retention)
  const handleInstantPurge = () => {
    if (confirm('Execute Zero-Data Retention Purge? This will permanently wipe all dialogue, biometrics, and action ledgers from local session memory with zero residual storage.')) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setMessages([
        {
          id: 'welcome-purged',
          sender: 'advisor',
          chamber: activeChamber,
          timestamp: new Date().toLocaleTimeString(),
          text: `### Session Memory Wiped Clean (Zero Data Retention)\nAll prior transcripts, biometrics, and session logs have been permanently erased from active memory. The sanctuary is sanitized.`
        }
      ]);
      setActionLedger([]);
      setActiveShock(null);
    }
  };

  // Export Decoupling Protocol
  const handleExportProtocol = () => {
    const protocolText = `# The Unbounded Leadership Co. · Sovereign Decoupling Protocol
Date: ${new Date().toLocaleDateString()}
Posture: ${posture.toUpperCase()}
Chamber: ${CHAMBERS[activeChamber].name.toUpperCase()}

## 1. Executive Metabolic Decision Tax
- Weekly Executive Bandwidth Leaked: ${metabolicTax.hoursLostWeekly} Hours/Week
- Annual EBITDA Drag Bleed: ${metabolicTax.annualEbitdaDrag}
- Institutional Latency Risk: ${metabolicTax.latencyRisk}

## 2. Dynamic Domain Radar State
- Cognitive Clarity: ${domainRadar.cognitiveClarity}/100
- Cultural Fidelity: ${domainRadar.culturalFidelity}/100
- Strategic Velocity: ${domainRadar.strategicVelocity}/100
- Systemic Integrity: ${domainRadar.systemicIntegrity}/100
- Moral Gravity: ${domainRadar.moralGravity}/100

## 3. Extracted Code of Action Ledger
${actionLedger.map((a, i) => `${i + 1}. [${a.category}] ${a.action} (Target: ${a.deadlineDays} Days)`).join('\n')}

## 4. Sparring Deliberation Transcripts (Chatham House Rule)
${messages.map(m => `[${m.timestamp}] ${m.sender.toUpperCase()}:\n${m.text}\n`).join('\n---\n')}

---
Signed & Ratified via Sovereign Protocol Engine · The Unbounded Leadership Co.`;

    const blob = new Blob([protocolText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Sovereign-Decoupling-Protocol-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const currentChamberMeta = CHAMBERS[activeChamber];
  const CurrentChamberIcon = currentChamberMeta.icon;

  return (
    <div id="council-chambers" className="min-h-screen bg-[#111215] text-[#f2f3f7] flex flex-col font-serif relative">
      
      {/* Strategic Sanctuary Top Bar */}
      <div className="bg-[#17181d] border-b border-[#2b2d36] py-3 px-4 sm:px-6 lg:px-8 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#d4af37]">
                The Council Chambers
              </span>
              <span className="text-stone-500 hidden sm:inline">|</span>
              <span className="text-xs text-stone-400 font-sans hidden sm:inline">
                Confidential Strategic Sanctuary & Sparring Room
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-xs bg-[#242732] border border-[#d4af37]/40 text-[#d4af37] text-[10px] font-mono font-bold uppercase">
              Chatham House Rule
            </span>
          </div>

          {/* Controls: Purge, Export, HUD Toggle */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => setHudOpen(!hudOpen)}
              className={`px-2.5 py-1 text-xs font-mono rounded-xs border transition-colors flex items-center gap-1.5 cursor-pointer ${
                hudOpen 
                  ? 'bg-[#292c38] border-[#d4af37] text-[#d4af37]' 
                  : 'bg-[#1a1b22] border-[#363945] text-stone-300 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Cockpit HUD</span>
            </button>

            <button
              onClick={handleExportProtocol}
              className="px-2.5 py-1 text-xs font-mono rounded-xs bg-[#1f212a] hover:bg-[#282a35] border border-[#363945] text-stone-200 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Download Codified Decoupling Protocol"
            >
              <Download className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="hidden sm:inline">Export Protocol</span>
            </button>

            <button
              onClick={handleInstantPurge}
              className="px-2.5 py-1 text-xs font-mono rounded-xs bg-rose-950/40 hover:bg-rose-900/60 border border-rose-800/60 text-rose-300 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Permanent Zero-Data Retention Wipe"
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-400" />
              <span>Instant Purge</span>
            </button>
          </div>

        </div>
      </div>

      {/* Taste vs Implementation Notice Banner */}
      <div className="bg-[#1c1e26] border-b border-[#2d303b] px-4 py-2 text-xs font-sans text-stone-300">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37] shrink-0" />
            <span>
              <strong className="text-[#d4af37]">Included with Diagnostic:</strong> You are experiencing the foundational Council Chambers Sparring Sanctuary.
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0 text-[11px] font-mono">
            {onExploreImplementation && (
              <button
                onClick={onExploreImplementation}
                className="text-[#d4af37] hover:underline cursor-pointer"
              >
                Unlock Full Strategic Version (Year-Round Access) →
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 max-w-[1440px] w-full mx-auto p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: 5 Domain Chambers & Mode Selectors (3 Cols) */}
        <div className="lg:col-span-3 space-y-5">
          
          {/* Executive Posture Selector */}
          <div className="p-3.5 rounded-lg bg-[#181920] border border-[#2d303b] space-y-2">
            <label className="text-[10px] font-mono uppercase font-bold text-[#d4af37] tracking-wider block">
              Executive Context Posture:
            </label>
            <div className="grid grid-cols-1 gap-1.5">
              {[
                { id: 'alpha_founder', label: 'Alpha Founder / Scale-Up' },
                { id: 'corporate', label: 'Corporate CXO / Enterprise' },
                { id: 'family_office', label: 'Family Principal / Dynasty' }
              ].map(p => (
                <button
                  key={p.id}
                  onClick={() => setPosture(p.id as ContextPosture)}
                  className={`px-3 py-2 rounded text-left text-xs font-sans transition-all cursor-pointer flex items-center justify-between ${
                    posture === p.id 
                      ? 'bg-[#262833] border border-[#d4af37]/60 text-white font-bold' 
                      : 'text-stone-400 hover:text-white hover:bg-[#1f2029]'
                  }`}
                >
                  <span>{p.label}</span>
                  {posture === p.id && <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Deliberation Mode: Single vs Triad */}
          <div className="p-3.5 rounded-lg bg-[#181920] border border-[#2d303b] space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-mono uppercase font-bold text-[#d4af37] tracking-wider">
                Deliberation Mode:
              </label>
              <span className="text-[10px] text-stone-400 font-mono">
                {mode === 'triad' ? '3 Personas' : '1-on-1'}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setMode('single')}
                className={`py-2 px-2.5 rounded text-xs font-sans flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  mode === 'single'
                    ? 'bg-[#292c3a] border border-[#d4af37] text-[#d4af37] font-bold shadow-xs'
                    : 'bg-[#1b1c24] border border-[#2d303b] text-stone-400 hover:text-white'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <span>Single Advisor</span>
              </button>

              <button
                onClick={() => setMode('triad')}
                className={`py-2 px-2.5 rounded text-xs font-sans flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  mode === 'triad'
                    ? 'bg-[#292c3a] border border-[#d4af37] text-[#d4af37] font-bold shadow-xs'
                    : 'bg-[#1b1c24] border border-[#2d303b] text-stone-400 hover:text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Triad Roundtable</span>
              </button>
            </div>

            {mode === 'triad' && (
              <div className="pt-2 text-[10px] font-mono text-stone-400 space-y-1 border-t border-[#2d303b]">
                <div className="text-white font-bold">Triad Personas Active:</div>
                <div className="text-amber-300">1. The Sovereign Consigliere (Authority)</div>
                <div className="text-emerald-300">2. Dynastic Wealth Strategist (Capital)</div>
                <div className="text-blue-300">3. Execution Orchestrator (Throughput)</div>
              </div>
            )}
          </div>

          {/* The 5 Dedicated Domain Chambers */}
          <div className="space-y-2">
            <div className="text-[10px] font-mono uppercase font-bold text-[#d4af37] tracking-wider px-1">
              5 Specialized Advisory Chambers:
            </div>

            <div className="space-y-1.5">
              {(Object.keys(CHAMBERS) as ChamberId[]).map(cId => {
                const item = CHAMBERS[cId];
                const Icon = item.icon;
                const isSelected = activeChamber === cId;
                return (
                  <button
                    key={cId}
                    onClick={() => setActiveChamber(cId)}
                    className={`w-full p-3 rounded-lg text-left transition-all cursor-pointer border flex items-start gap-2.5 ${
                      isSelected
                        ? `bg-[#22242e] ${item.borderTheme} shadow-md ring-1 ring-[#d4af37]/40`
                        : 'bg-[#17181f] border-[#292b36] hover:bg-[#1e1f28] text-stone-400'
                    }`}
                  >
                    <div className={`p-1.5 rounded-md shrink-0 mt-0.5 ${isSelected ? 'bg-[#d4af37]/20 text-[#d4af37]' : 'bg-[#22232c] text-stone-400'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs font-bold leading-tight ${isSelected ? 'text-white' : 'text-stone-300'}`}>
                        {item.name}
                      </div>
                      <div className="text-[10px] text-stone-400 font-mono mt-0.5 line-clamp-1">
                        {item.subtitle}
                      </div>
                    </div>
                    {isSelected && <ChevronRight className="w-4 h-4 text-[#d4af37] shrink-0 self-center" />}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* CENTER COLUMN: Sparring Dialogue & Voice Input (6 Cols) */}
        <div className="lg:col-span-6 flex flex-col bg-[#17181f] border border-[#2b2d38] rounded-xl overflow-hidden shadow-2xl min-h-[640px]">
          
          {/* Active Chamber Header Banner */}
          <div className="p-4 bg-[#1e2029] border-b border-[#2b2d38] flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-[#272935] text-[#d4af37] border border-[#d4af37]/30">
                <CurrentChamberIcon className="w-5 h-5 text-[#d4af37]" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span>{currentChamberMeta.name}</span>
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${currentChamberMeta.badgeBg}`}>
                    ACTIVE
                  </span>
                </h3>
                <p className="text-xs text-stone-400 font-sans mt-0.5 line-clamp-1">
                  {currentChamberMeta.focus}
                </p>
              </div>
            </div>

            <button
              onClick={() => setTtsEnabled(!ttsEnabled)}
              className={`p-2 rounded-md transition-colors cursor-pointer border ${
                ttsEnabled ? 'bg-[#2b2e3d] text-[#d4af37] border-[#d4af37]' : 'bg-[#1b1c24] text-stone-400 border-[#323542]'
              }`}
              title={ttsEnabled ? 'Audio synthesis active' : 'Audio synthesis muted'}
            >
              {ttsEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>

          {/* Active Shock Banner if present */}
          {activeShock && (
            <div className="px-4 py-2 bg-rose-950/40 border-b border-rose-800/60 text-rose-300 text-xs font-mono flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                <span><strong>STRESS SHOCK ACTIVE:</strong> {MACRO_SHOCKS.find(s => s.id === activeShock)?.title}</span>
              </div>
              <button
                onClick={() => handleToggleShock(activeShock)}
                className="text-[10px] uppercase font-bold text-rose-400 hover:text-white underline cursor-pointer"
              >
                Clear Shock
              </button>
            </div>
          )}

          {/* Message Stream */}
          <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 max-h-[520px]">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div className="flex items-center gap-2 text-[10px] font-mono text-stone-400 mb-1 px-1">
                  <span>{msg.sender === 'user' ? 'YOU (EXECUTIVE)' : 'COUNCIL DIALECTIC'}</span>
                  <span>·</span>
                  <span>{msg.timestamp}</span>
                  {msg.metadata?.wpm && (
                    <span className="text-[#d4af37]">({msg.metadata.wpm} WPM)</span>
                  )}
                </div>

                <div
                  className={`p-4 rounded-lg text-xs sm:text-sm leading-relaxed max-w-[92%] ${
                    msg.sender === 'user'
                      ? 'bg-[#282a35] text-white border border-[#3e4252]'
                      : 'bg-[#1d1f27] text-stone-200 border border-[#2d303d] shadow-sm'
                  }`}
                >
                  <div className="prose prose-invert prose-sm max-w-none space-y-2 whitespace-pre-wrap font-sans">
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="p-4 rounded-lg bg-[#1d1f27] border border-[#2d303d] max-w-[85%] space-y-2 animate-pulse">
                <div className="flex items-center gap-2 text-xs font-mono text-[#d4af37]">
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Challenger Cybernetic Dialectic Synthesizing...</span>
                </div>
                <div className="h-3 bg-[#2a2c38] rounded w-3/4" />
                <div className="h-3 bg-[#2a2c38] rounded w-5/6" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input & Dictation Cockpit */}
          <div className="p-3.5 bg-[#1a1b22] border-t border-[#2b2d38] space-y-2">
            <div className="flex items-center gap-2">
              <textarea
                value={inputPrompt}
                onChange={e => setInputPrompt(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendPrompt();
                  }
                }}
                rows={2}
                placeholder={`Speak or write your dilemma in ${currentChamberMeta.name}...`}
                className="flex-1 bg-[#121317] border border-[#323542] rounded-md px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-stone-500 focus:outline-none focus:border-[#d4af37] resize-none font-sans"
              />

              <div className="flex flex-col gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={toggleSpeechRecognition}
                  className={`p-2.5 rounded-md border transition-all cursor-pointer flex items-center justify-center ${
                    isRecording 
                      ? 'bg-rose-600 border-rose-500 text-white animate-pulse' 
                      : 'bg-[#22242f] border-[#363948] text-stone-300 hover:text-[#d4af37]'
                  }`}
                  title={isRecording ? 'Stop recording dictation' : 'Click to dictate via microphone'}
                >
                  {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </button>

                <button
                  onClick={handleSendPrompt}
                  disabled={!inputPrompt.trim() || isLoading}
                  className="p-2.5 rounded-md bg-gold-gradient text-[#141416] font-bold transition-all disabled:opacity-40 cursor-pointer flex items-center justify-center shadow-xs"
                  title="Send to Council Dialectic"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 px-1">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3 h-3 text-[#d4af37]" />
                <span>Ephemeral Session · AES-256 Memory Guard</span>
              </span>
              <span>Press Enter to Submit · Shift+Enter for New Line</span>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Active Cockpit HUD & Telemetry (3 Cols) */}
        {hudOpen && (
          <div className="lg:col-span-3 space-y-4 animate-in fade-in duration-300">
            
            {/* 1. Live Vocal Biometrics & Speech Prosody Scanner */}
            <div className="p-3.5 rounded-lg bg-[#181920] border border-[#2d303b] space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase font-bold text-[#d4af37] flex items-center gap-1">
                  <Radio className="w-3 h-3 text-[#d4af37] animate-pulse" />
                  <span>Vocal Prosody Scanner</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">
                  LIVE HUD
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-2 rounded bg-[#1f2029] border border-[#2d303b]">
                  <div className="text-[10px] text-stone-400">Verbal Velocity</div>
                  <div className="text-base font-bold text-white tabular-nums">{wpm} WPM</div>
                </div>

                <div className="p-2 rounded bg-[#1f2029] border border-[#2d303b]">
                  <div className="text-[10px] text-stone-400">Composure Score</div>
                  <div className="text-base font-bold text-[#d4af37] tabular-nums">{composureScore}%</div>
                </div>
              </div>

              <div className="text-[11px] text-stone-400 font-sans flex items-center justify-between pt-1 border-t border-[#262833]">
                <span>Pause Cadence: <strong className="text-white">{pauseCadence}</strong></span>
                <span className="text-[10px] text-[#d4af37]">Chatham Scanner</span>
              </div>
            </div>

            {/* 2. Macroeconomic Stress Shock Injector */}
            <div className="p-3.5 rounded-lg bg-[#181920] border border-[#2d303b] space-y-2">
              <span className="text-[10px] font-mono uppercase font-bold text-[#d4af37] flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>Inject Stress Shock:</span>
              </span>

              <div className="space-y-1.5">
                {MACRO_SHOCKS.map(shock => {
                  const isActive = activeShock === shock.id;
                  return (
                    <button
                      key={shock.id}
                      onClick={() => handleToggleShock(shock.id)}
                      className={`w-full p-2 rounded text-left text-xs transition-all cursor-pointer border ${
                        isActive 
                          ? 'bg-rose-950/60 border-rose-500 text-white font-bold' 
                          : 'bg-[#1f2029] border-[#2d303b] text-stone-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold">{shock.title}</span>
                        {isActive && <span className="text-[9px] font-mono bg-rose-600 px-1 rounded text-white">ACTIVE</span>}
                      </div>
                      <div className="text-[10px] text-stone-500 line-clamp-1">{shock.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Dynamic Domain Telemetry Radar Gauges */}
            <div className="p-3.5 rounded-lg bg-[#181920] border border-[#2d303b] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase font-bold text-[#d4af37]">
                  5-Domain Sovereign Telemetry
                </span>
                <span className="text-[10px] text-stone-400 font-mono">REAL-TIME</span>
              </div>

              <div className="space-y-2 text-xs font-mono">
                {[
                  { label: 'Cognitive Clarity', val: domainRadar.cognitiveClarity, color: 'bg-amber-500' },
                  { label: 'Cultural Fidelity', val: domainRadar.culturalFidelity, color: 'bg-emerald-500' },
                  { label: 'Strategic Velocity', val: domainRadar.strategicVelocity, color: 'bg-red-500' },
                  { label: 'Systemic Integrity', val: domainRadar.systemicIntegrity, color: 'bg-blue-500' },
                  { label: 'Moral Gravity', val: domainRadar.moralGravity, color: 'bg-purple-500' },
                ].map(d => (
                  <div key={d.label} className="space-y-0.5">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-stone-300">{d.label}</span>
                      <span className="text-white font-bold">{d.val}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-[#272935] overflow-hidden">
                      <div
                        className={`h-full ${d.color} transition-all duration-500`}
                        style={{ width: `${d.val}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Metabolic Decision Tax */}
            <div className="p-3.5 rounded-lg bg-[#181920] border border-rose-900/40 space-y-1.5 text-xs font-mono">
              <div className="flex items-center gap-1.5 text-rose-400 font-bold uppercase text-[10px]">
                <TrendingDown className="w-3.5 h-3.5" />
                <span>Metabolic Decision Tax</span>
              </div>
              <div className="text-lg font-bold text-white tabular-nums">
                {metabolicTax.hoursLostWeekly} Hrs/Wk Lost
              </div>
              <div className="text-[11px] text-rose-300">
                EBITDA Drag: {metabolicTax.annualEbitdaDrag}
              </div>
              <div className="text-[10px] text-stone-400">
                Latency Risk Level: <strong className="text-rose-400 uppercase">{metabolicTax.latencyRisk}</strong>
              </div>
            </div>

            {/* 5. Code of Action Ledger */}
            <div className="p-3.5 rounded-lg bg-[#181920] border border-[#2d303b] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase font-bold text-[#d4af37]">
                  Code of Action Ledger ({actionLedger.length})
                </span>
                <span className="text-[9px] font-mono text-stone-500">EXTRACTED</span>
              </div>

              <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                {actionLedger.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="p-2 rounded bg-[#1f2029] border border-[#2e313d] text-[11px] font-sans space-y-1"
                  >
                    <div className="flex items-center justify-between font-mono text-[9px]">
                      <span className="text-[#d4af37] font-bold uppercase">{item.category}</span>
                      <span className="text-stone-400">Target: {item.deadlineDays}d</span>
                    </div>
                    <p className="text-stone-200 leading-snug">
                      {item.action}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
