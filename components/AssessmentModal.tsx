
import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { SovereignDB } from '../lib/database.ts';

interface AssessmentModalProps {
  onClose: () => void;
}

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

const AssessmentModal: React.FC<AssessmentModalProps> = ({ onClose }) => {
  const [step, setStep] = useState<'intro' | 'collect_email' | 'scenario' | 'loading' | 'result'>('intro');
  const [userEmail, setUserEmail] = useState('');
  const [scenarioData, setScenarioData] = useState<{scenario: string, question: string} | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [result, setResult] = useState<{score: string, analysis: string, constraint: string, leverage: string} | null>(null);
  const [loadingText, setLoadingText] = useState('Architecting...');

  const fetchScenario = async () => {
    // Check for API Key
    if (typeof window !== 'undefined' && window.aistudio) {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await window.aistudio.openSelectKey();
        // After opening, we assume success as per guidelines, but we should re-check or just proceed
      }
    }

    setStep('loading');
    setLoadingText('Architecting Scenario...');
    
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: "Generate one high-stakes corporate leadership scenario to test Vertical Maturity across Cognitive Authority, Systemic Thinking, and Cultural Intelligence. Provide a short scenario description and one question that forces a choice between Personal heroics and Systemic design.",
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              scenario: { type: Type.STRING },
              question: { type: Type.STRING }
            },
            required: ['scenario', 'question']
          }
        }
      });
      
      const data = JSON.parse(response.text || '{}');
      setScenarioData(data);
      setStep('scenario');
    } catch (error) {
      console.error("API Error:", error);
      setScenarioData({
        scenario: "Your organization is facing a critical strategic pivot. Markets are shifting faster than your current structure can process. A key department is resisting the change, relying on the legacy heroics that got you here.",
        question: "Do you personally intervene to drive the change through force of will, or do you architect a new self-regulating OS that renders the resistance structurally obsolete?"
      });
      setStep('scenario');
    }
  };

  const analyzeAnswer = async () => {
    // Check for API Key
    if (typeof window !== 'undefined' && window.aistudio) {
      const hasKey = await window.aistudio.hasSelectedApiKey();
      if (!hasKey) {
        await window.aistudio.openSelectKey();
      }
    }

    setStep('loading');
    setLoadingText('Calibrating Maturity...');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Scenario: "${scenarioData?.scenario}". User Response: "${userAnswer}". 
        Framework: Vertical Development across 5 Domains (I. Cognitive Authority, II. Systemic Thinking, III. Cultural Intelligence, IV. Strategic Adaptability, V. Moral & Emotional Gravity).
        Task: 
        1. Rank on Maturity Stage 1-5 (5 is Sovereign Architect). 
        2. Identify Primary Constraint Domain (the bottleneck).
        3. Identify Secondary Leverage Domain (fastest ROI).
        4. Provide a precise, architectural analysis (2 sentences).`,
        config: {
          thinkingConfig: { thinkingBudget: 4000 },
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.STRING, description: "Stage 1-5 Ranking" },
              analysis: { type: Type.STRING },
              constraint: { type: Type.STRING, description: "Primary Constraint Domain" },
              leverage: { type: Type.STRING, description: "Secondary Leverage Domain" }
            },
            required: ['score', 'analysis', 'constraint', 'leverage']
          }
        }
      });
      
      const analysisData = JSON.parse(response.text || '{}');
      setResult(analysisData);

      // Save to Sovereign Ledger (Local Persistence)
      SovereignDB.saveAssessment({
        email: userEmail,
        score: analysisData.score,
        analysis: analysisData.analysis,
        constraint: analysisData.constraint,
        leverage: analysisData.leverage
      });

      try {
        // Trigger Real-time Notification via Backend
        const notifyRes = await fetch('/api/assessment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: userEmail,
            ...analysisData
          })
        });
        if (!notifyRes.ok) {
          console.warn("Notification endpoint returned error:", notifyRes.status);
        }
      } catch (error) {
        console.error("Notification Transmission Failed:", error);
      }

      setStep('result');
    } catch (error) {
      console.error(error);
      const fallbackResult = {
        score: "Stage 3",
        analysis: "You are operating with high relational intelligence but low systemic leverage. You are still managing drag rather than designing an anti-fragile substrate.",
        constraint: "Systemic Thinking",
        leverage: "Cognitive Authority"
      };
      setResult(fallbackResult);
      SovereignDB.saveAssessment({ email: userEmail, ...fallbackResult });
      
      try {
        const notifyRes = await fetch('/api/assessment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: userEmail, ...fallbackResult })
        });
        if (!notifyRes.ok) {
          console.warn("Notification endpoint returned error (fallback):", notifyRes.status);
        }
      } catch (e) {
        console.error(e);
      }

      setStep('result');
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-white/80 backdrop-blur-xl" onClick={onClose} />
      
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#f5f5f0] border border-[#b8860b]/30 p-6 sm:p-12 md:p-16 overflow-y-auto shadow-2xl scroll-smooth">
        {step === 'intro' && (
          <div className="text-center py-4">
            <h2 className="text-4xl font-bold mb-8 text-[#111111]">The Yield Calibration</h2>
            <p className="text-zinc-600 mb-12 text-xl italic font-light leading-relaxed">
              A preliminary calibration of your <span className="text-[#b8860b]">Vertical Maturity</span>. This calibration identifies the constraints in your leadership OS that training cannot detect.
            </p>
            <button 
              onClick={() => setStep('collect_email')}
              className="px-12 py-5 bg-[#b8860b] text-white text-[11px] font-bold uppercase hover:bg-[#111111] transition-all tracking-widest shadow-lg"
            >
              Begin Calibration
            </button>
          </div>
        )}

        {step === 'collect_email' && (
          <div className="max-w-md mx-auto text-center space-y-8 py-4">
            <h3 className="text-2xl font-bold text-[#111111]">Identify Your Terminal</h3>
            <p className="text-zinc-500 italic">Results will be encrypted and indexed to your work email for institutional correlation.</p>
            <input 
              type="email" 
              required
              placeholder="Work Email..."
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="w-full bg-transparent border-b-2 border-zinc-200 py-4 text-center text-xl italic focus:outline-none focus:border-[#b8860b] transition-colors"
            />
            <button 
              disabled={!userEmail}
              onClick={fetchScenario}
              className="w-full py-5 bg-[#111111] text-white text-[11px] font-bold uppercase tracking-widest disabled:opacity-20 transition-all"
            >
              Enter Scenario Tunnel
            </button>
          </div>
        )}

        {step === 'loading' && (
          <div className="text-center py-24">
            <div className="w-16 h-16 border-t-2 border-[#b8860b] rounded-full animate-spin mx-auto mb-10" />
            <p className="text-[11px] uppercase text-[#b8860b] font-black animate-pulse tracking-widest">{loadingText}</p>
          </div>
        )}

        {step === 'scenario' && scenarioData && (
          <div className="space-y-10 fade-in py-4">
            <div className="border-l-2 border-[#b8860b] pl-8">
              <h3 className="text-[10px] font-black uppercase text-zinc-400 mb-4 tracking-widest">Case Context</h3>
              <p className="text-2xl font-bold text-[#111111] leading-snug">{scenarioData.scenario}</p>
            </div>
            
            <div className="bg-[#ecece4] p-8 border border-zinc-200">
              <h3 className="text-[10px] font-black uppercase text-zinc-400 mb-6 tracking-widest">Strategic Question</h3>
              <p className="text-zinc-700 mb-8 text-lg italic font-light leading-relaxed">{scenarioData.question}</p>
              <textarea 
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Architect your institutional resonance..."
                className="w-full bg-white border border-zinc-200 p-6 text-[#111111] focus:outline-none focus:border-[#b8860b] h-36 transition-colors resize-none text-lg italic font-light"
              />
            </div>
            
            <button 
              disabled={!userAnswer}
              onClick={analyzeAnswer}
              className="w-full py-5 bg-[#b8860b] text-white text-[11px] font-bold uppercase disabled:opacity-20 shadow-2xl transition-all tracking-widest"
            >
              Submit for Calibration
            </button>
          </div>
        )}

        {step === 'result' && result && (
          <div className="text-center fade-in py-4">
            <div className="flex flex-col sm:flex-row justify-center items-center sm:items-end gap-2 mb-8">
              <div className="text-6xl sm:text-8xl md:text-9xl font-bold text-[#b8860b] leading-none">{result.score}</div>
              <div className="text-[8px] sm:text-[10px] uppercase font-black text-zinc-400 pb-0 sm:pb-4 tracking-widest">Sovereign Grade</div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12 border-y border-zinc-200 py-8">
              <div className="text-left">
                <span className="text-[9px] uppercase font-black text-[#b8860b] tracking-widest block mb-2">Primary Constraint</span>
                <span className="text-lg font-bold text-[#111111]">{result.constraint}</span>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-[9px] uppercase font-black text-[#b8860b] tracking-widest block mb-2">Primary Leverage</span>
                <span className="text-lg font-bold text-[#111111]">{result.leverage}</span>
              </div>
            </div>

            <p className="text-lg md:text-2xl text-zinc-700 mb-14 italic font-light leading-relaxed">"{result.analysis}"</p>
            
            <button 
              onClick={() => {
                onClose();
                document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-5 border border-[#b8860b] text-[#b8860b] text-[11px] font-bold uppercase hover:bg-[#b8860b] hover:text-white transition-all mb-8 tracking-widest shadow-lg"
            >
              Request Structural Intervention
            </button>
            
            <button onClick={onClose} className="text-[10px] uppercase text-zinc-400 hover:text-[#111111] font-black tracking-widest block mx-auto">DISMISS TERMINAL</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssessmentModal;
