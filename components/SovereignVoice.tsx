import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality, Blob } from '@google/genai';

interface SovereignVoiceProps {
  onClose: () => void;
}

export default function SovereignVoice({ onClose }: SovereignVoiceProps) {
  const [status, setStatus] = useState<'idle' | 'connecting' | 'active' | 'error'>('idle');
  const [transcription, setTranscription] = useState<string[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [telemetry, setTelemetry] = useState<string[]>([
    "LINK: ESTABLISHED",
    "SUBSTRATE: SCANNING",
    "INTENT_LAYER: DETECTED",
  ]);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const sessionRef = useRef<any>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number>(0);

  useEffect(() => {
    if (status !== 'active') return;
    const items = [
      "CALIBRATING VELOCITY...",
      "RESONANCE: 94.2%",
      "ARCHITECTURAL DRIFT: NEUTRALIZED",
      "SIGNAL_PURITY: OPTIMAL",
      "SUBSTRATE_STABILITY: SECURE",
      "EXECUTING LOGIC PASS...",
      "HARMONIZING INTENT...",
    ];
    const interval = setInterval(() => {
      setTelemetry(prev => [items[Math.floor(Math.random() * items.length)], ...prev.slice(0, 7)]);
    }, 2500);
    return () => clearInterval(interval);
  }, [status]);

  const decode = (base64: string) => {
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) bytes[i] = binaryString.charCodeAt(i);
    return bytes;
  };

  const decodeAudioData = async (data: Uint8Array, ctx: AudioContext, sampleRate: number, numChannels: number) => {
    const dataInt16 = new Int16Array(data.buffer);
    const frameCount = dataInt16.length / numChannels;
    const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = buffer.getChannelData(channel);
      for (let i = 0; i < frameCount; i++) channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
    return buffer;
  };

  const encode = (bytes: Uint8Array) => {
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) binary += String.fromCharCode(bytes[i]);
    return btoa(binary);
  };

  const drawVisualizer = () => {
    if (!canvasRef.current || !analyserRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const renderFrame = () => {
      animationFrameRef.current = requestAnimationFrame(renderFrame);
      analyserRef.current?.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const barWidth = (canvas.width / bufferLength) * 2;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height;
        const opacity = (dataArray[i] / 255) * 0.8 + 0.1;
        ctx.fillStyle = `rgba(184, 134, 11, ${opacity})`;
        
        const center = canvas.height / 2;
        ctx.fillRect(x, center - barHeight/2, barWidth, barHeight);
        
        x += barWidth + 2;
      }
    };
    renderFrame();
  };

  const startSession = async () => {
    setStatus('connecting');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      
      const analyser = outputCtx.createAnalyser();
      analyser.fftSize = 128;
      analyserRef.current = analyser;
      audioContextRef.current = outputCtx;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-04-2026',
        callbacks: {
          onopen: () => {
            setStatus('active');
            drawVisualizer();
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
              const pcmBlob: Blob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            if (message.serverContent?.outputTranscription) {
              const text = message.serverContent.outputTranscription.text;
              setTranscription(prev => {
                const last = prev[prev.length - 1];
                if (last?.startsWith('ARCHITECT:')) {
                   const updated = prev.slice(0, -1);
                   return [...updated, last + text];
                }
                return [...prev.slice(-2), `ARCHITECT: ${text}`];
              });
            }

            const audioData = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (audioData) {
              setIsSpeaking(true);
              const buffer = await decodeAudioData(decode(audioData), outputCtx, 24000, 1);
              const source = outputCtx.createBufferSource();
              source.buffer = buffer;
              source.connect(analyser);
              analyser.connect(outputCtx.destination);
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += buffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => {
                sourcesRef.current.delete(source);
                if (sourcesRef.current.size === 0) setIsSpeaking(false);
              };
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (e) => setStatus('error'),
          onclose: () => setStatus('idle'),
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Charon' } } },
          systemInstruction: 'You are the Sovereign Leadership Architect. Your voice is the frequency of institutional command. Provide surgical, elite diagnostic audits. You do not offer advice; you offer structural re-coding. Speak with absolute gravitas. Focus on: Resonance, Calibration, Substrate, and Velocity.',
          outputAudioTranscription: {},
        }
      });
      sessionRef.current = await sessionPromise;
    } catch (error) {
      setStatus('error');
    }
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) streamRef.current.getTracks().forEach(t => t.stop());
      if (audioContextRef.current) audioContextRef.current.close();
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (sessionRef.current) sessionRef.current.close();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-[#0a0b14] text-[#f5f5f0] p-6 md:p-10 font-inter">
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />

      <div className="absolute top-12 left-12">
        <div className="flex items-center gap-4">
          <div className="w-8 h-[2px] bg-[#b8860b]" />
          <span className="text-[10px] font-black uppercase text-[#b8860b] tracking-[0.5em]">SOVEREIGN TERMINAL 2.5</span>
        </div>
      </div>

      <div className="absolute top-12 right-12">
        <button onClick={onClose} className="group flex items-center gap-4">
          <span className="text-[9px] font-black text-zinc-600 group-hover:text-white uppercase tracking-widest">[ CONCLUDE AUDIT ]</span>
          <div className="w-8 h-8 flex items-center justify-center border border-white/10 group-hover:border-[#b8860b] transition-all">
            <svg className="w-3 h-3 text-zinc-600 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
          </div>
        </button>
      </div>

      <div className="relative w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        <div className="hidden lg:flex lg:col-span-3 flex-col gap-12 border-l border-white/5 pl-10">
          <h3 className="text-[9px] font-black uppercase text-[#b8860b] tracking-[0.4em]">INTELLIGENCE_STREAM</h3>
          <div className="space-y-4">
            {telemetry.map((t, i) => (
              <div key={i} className={`text-[10px] font-bold tracking-widest uppercase ${i === 0 ? 'text-white' : 'text-white/20'}`}>{t}</div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col items-center">
          <div className="relative w-80 h-80 md:w-[450px] md:h-[450px] flex items-center justify-center">
            <canvas ref={canvasRef} width={800} height={400} className="absolute inset-0 w-full h-full pointer-events-none opacity-40" />
            <div className={`absolute inset-0 border border-white/5 rounded-full transition-all duration-[4000ms] ${status === 'active' ? 'scale-110 opacity-100' : 'scale-100 opacity-20'}`} />
            
            <div className="relative z-20">
              {status === 'idle' ? (
                <button 
                  onClick={startSession}
                  className="w-28 h-28 bg-transparent border-2 border-[#b8860b] rounded-full flex items-center justify-center group hover:bg-[#b8860b] transition-all duration-700"
                >
                  <svg className="w-8 h-8 text-[#b8860b] group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                </button>
              ) : (
                <div className={`w-28 h-28 bg-[#b8860b] rounded-full flex items-center justify-center transition-all duration-700 shadow-[0_0_100px_rgba(184,134,11,0.5)] ${isSpeaking ? 'scale-110' : 'scale-100'}`}>
                  {status === 'connecting' && <div className="w-10 h-10 border-2 border-white/20 border-t-white rounded-full animate-spin" />}
                  {status === 'active' && !isSpeaking && <div className="w-4 h-4 bg-white rounded-full animate-ping" />}
                  {isSpeaking && <div className="w-2 h-10 bg-white/40 rounded-full animate-pulse" />}
                </div>
              )}
            </div>
          </div>

          <div className="mt-16 text-center max-w-xl min-h-[80px]">
             {status === 'active' && (
               <div className="flex flex-col gap-3">
                  {transcription.map((t, i) => (
                    <p key={i} className="text-white text-base md:text-lg font-bold uppercase tracking-widest italic animate-fade-in">{t}</p>
                  ))}
               </div>
             )}
          </div>
        </div>

        <div className="hidden lg:flex lg:col-span-3 flex-col gap-12 border-r border-white/5 pr-10 text-right">
          <StatusBlock label="Substrate Alignment" value="Active" />
          <StatusBlock label="Execution Latency" value="2ms" />
          <StatusBlock label="Sovereign Grade" value="Alpha" />
        </div>
      </div>
    </div>
  );
}

const StatusBlock: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <div className="text-[8px] uppercase font-black text-zinc-500 mb-2 tracking-widest">{label}</div>
    <div className="text-xs uppercase font-bold text-white tracking-[0.2em]">{value}</div>
  </div>
);
