import React, { useState, useEffect } from 'react';
import { auth, db, signInWithGoogle } from '../src/firebase';
import { SovereignDB } from '../lib/database.ts';
import { onAuthStateChanged, User } from 'firebase/auth';
import { motion, AnimatePresence } from 'motion/react';
import { LucideIcon, Shield, Zap, Cpu, Layers, Heart, ArrowRight, Lock, Download, ChevronRight, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react';

type ContextType = 'dynamic' | 'established' | 'generational';
type Step = 'intro' | 'auth' | 'context' | 'questions' | 'calculating' | 'dossier';

interface Option {
  label: string;
  value: number;
  description: string;
}

interface Question {
  domain: string;
  text: {
    dynamic: string;
    established: string;
    generational: string;
  };
  options: Option[];
}

const QUESTIONS: Question[] = [
  {
    domain: "Cognitive Authority",
    text: {
      dynamic: "Does your strategic intent execute autonomously across the substrate?",
      established: "Can your operations run at full capacity for 30 days without a single phone call to you?",
      generational: "Is the family’s vision preserved in the estate’s management even when you are completely offline?"
    },
    options: [
      { label: "Fragile", value: 0, description: "I am the single point of failure for all critical decisions." },
      { label: "Resilient", value: 5, description: "Systems exist but require my frequent validation to proceed." },
      { label: "Sovereign", value: 10, description: "Intent executes with absolute fidelity without my presence." }
    ]
  },
  {
    domain: "Systemic Thinking",
    text: {
      dynamic: "Is success independent of 'heroic' interventions?",
      established: "Is your profitability built into the process, or does it depend on you 'putting out fires' every day?",
      generational: "Is the continuity of the legacy protected by a governing structure, or does it rely on the strength of a single individual?"
    },
    options: [
      { label: "Reactive", value: 0, description: "Success depends on my personal energy and daily 'heroics'." },
      { label: "Procedural", value: 5, description: "We have playbooks, but they fail without constant oversight." },
      { label: "Architectural", value: 10, description: "The result is a structural inevitability of the system design." }
    ]
  },
  {
    domain: "Cultural Intelligence",
    text: {
      dynamic: "Does vision carry absolute fidelity to the operational edge?",
      established: "Do the people on the floor understand and execute your standards exactly as you would?",
      generational: "Are the family’s core values consistently upheld by every advisor and staff member in the inner circle?"
    },
    options: [
      { label: "Diluted", value: 0, description: "The vision fractures as it moves away from my direct control." },
      { label: "Aligned", value: 5, description: "The team understands the goal but lacks the 'soul' of the intent." },
      { label: "Embodied", value: 10, description: "The culture executes the vision with 100% fidelity autonomously." }
    ]
  },
  {
    domain: "Strategic Adaptability",
    text: {
      dynamic: "Is your organizational substrate designed to convert external market disruption into a systemic competitive advantage?",
      established: "Can your operations pivot to a new product line within a single quarter without manual intervention?",
      generational: "Is your estate's asset allocation designed to automatically hedge against global geopolitical volatility?"
    },
    options: [
      { label: "Rigid", value: 0, description: "Change is slow, painful, and requires my constant pushing." },
      { label: "Flexible", value: 5, description: "We can adapt, but it requires significant manual re-tooling." },
      { label: "Antifragile", value: 10, description: "The substrate is designed to gain strength from disruption." }
    ]
  },
  {
    domain: "Moral & Emotional Gravity",
    text: {
      dynamic: "Does your authority compound exponentially as the organization scales, rather than fracturing under pressure?",
      established: "Does your reputation for quality and reliability allow you to command a premium even in a commoditized market?",
      generational: "Is trust in your institution a structural inevitability, rather than a behavioral variable?"
    },
    options: [
      { label: "Variable", value: 0, description: "Trust and authority depend on my current mood and behavior." },
      { label: "Reputational", value: 5, description: "We have a good name, but it requires constant maintenance." },
      { label: "Inevitable", value: 10, description: "Authority is a structural property of the institutional design." }
    ]
  }
];

const Assessment: React.FC = () => {
  const [step, setStep] = useState<Step>('intro');
  const [user, setUser] = useState<User | null>(null);
  const [context, setContext] = useState<ContextType | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [dossierId] = useState(() => Math.floor(Math.random() * 100000).toString().padStart(6, '0'));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u && step === 'auth') {
        setStep('context');
      }
    });
    return () => unsubscribe();
  }, [step]);

  const handleStart = () => {
    if (user) {
      setStep('context');
    } else {
      setStep('auth');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Sign in failed", error);
    }
  };

  const handleContextSelect = (c: ContextType) => {
    setContext(c);
    setStep('questions');
  };

  const handleAnswer = (value: number) => {
    const newAnswers = { ...answers, [currentQuestion]: value };
    setAnswers(newAnswers);
    
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitAssessment(newAnswers);
    }
  };

  const submitAssessment = async (finalAnswers: Record<number, number>) => {
    setStep('calculating');
    setIsSubmitting(true);
    
    try {
      const totalScore = Object.values(finalAnswers).reduce((a, b) => a + b, 0);
      const maxScore = QUESTIONS.length * 10;
      const percentage = (totalScore / maxScore) * 100;
      
      await SovereignDB.saveAssessment({
        userId: user?.uid || '',
        email: user?.email || '',
        context: context!,
        answers: finalAnswers,
        totalScore,
        percentage
      });

      // Simulate cinematic calculation
      setTimeout(() => {
        setStep('dossier');
        setIsSubmitting(false);
      }, 400);
    } catch (error) {
      console.error("Error saving assessment", error);
      setIsSubmitting(false);
    }
  };

  const getGrade = () => {
    const totalScore = Object.values(answers).reduce((a, b) => a + b, 0);
    if (totalScore >= 45) return 'Sovereign';
    if (totalScore >= 35) return 'Architectural';
    if (totalScore >= 25) return 'Systemic';
    return 'Manual';
  };

  const getConstraint = () => {
    const minVal = Math.min(...Object.values(answers));
    const minIndex = Object.entries(answers).find(([_, v]) => v === minVal)?.[0];
    return QUESTIONS[Number(minIndex)]?.domain || "Systemic Integrity";
  };

  return (
    <section id="assessment" className="py-24 bg-[#f5f5f0] min-h-[800px] flex flex-col justify-center relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#b8860b_1px,transparent_1px)] [background-size:40px_40px]"></div>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 w-full">
        <AnimatePresence mode="wait">
          {step === 'intro' && (
            <motion.div 
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <h2 className="text-[#b8860b] text-[10px] font-black uppercase mb-6 tracking-[0.4em]">The Yield Calibration</h2>
              <h3 className="text-4xl sm:text-6xl font-bold mb-8 text-[#111111] leading-tight">
                Architectural <span className="italic text-[#b8860b]">Maturity.</span>
              </h3>
              <p className="text-zinc-600 text-xl mb-12 font-light italic leading-relaxed max-w-2xl mx-auto">
                A 5-domain diagnostic to map your institutional substrate. Identify the primary constraint preventing your transition from Hero to Architect.
              </p>
              <div className="flex flex-col items-center gap-8">
                <button 
                  onClick={handleStart}
                  className="px-12 py-6 bg-[#111111] text-white text-[11px] font-black uppercase tracking-[0.3em] hover:bg-[#b8860b] transition-all shadow-2xl"
                >
                  Initiate Identity Verification
                </button>
                
                <div className="flex flex-col items-center gap-2">
                  <div className="text-[9px] uppercase text-zinc-400 tracking-[0.5em] font-black">Already a Principal?</div>
                  <a 
                    href="https://sovereign-protocol.com/access" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#b8860b] text-xs font-mono hover:underline tracking-widest flex items-center gap-2"
                  >
                    Enter The Sovereign Portal <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          )}

          {step === 'auth' && (
            <motion.div 
              key="auth"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="bg-white p-12 shadow-2xl border border-zinc-100 text-center"
            >
              <Shield className="w-12 h-12 text-[#b8860b] mx-auto mb-8" />
              <h3 className="text-2xl font-bold mb-4 text-[#111111] uppercase tracking-wider">Identity Verification</h3>
              <p className="text-zinc-500 mb-10 italic font-light">
                Access to the Sovereign Protocol requires institutional verification.
              </p>
              <button 
                onClick={handleGoogleSignIn}
                className="w-full py-5 border-2 border-zinc-100 flex items-center justify-center gap-4 hover:bg-zinc-50 transition-all mb-4 group"
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                <span className="text-[11px] font-black uppercase tracking-widest text-zinc-600 group-hover:text-black">Verify with Google</span>
              </button>
              <div className="text-[9px] uppercase text-zinc-400 tracking-widest mt-6">
                Secure SSL Encryption Enabled
              </div>
            </motion.div>
          )}

          {step === 'context' && (
            <motion.div 
              key="context"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center"
            >
              <h3 className="text-2xl font-bold mb-12 text-[#111111] uppercase tracking-widest">Select Institutional Substrate</h3>
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  { id: 'dynamic', label: 'Dynamic Protocol', icon: Zap, desc: 'Agility & Innovation' },
                  { id: 'established', label: 'Established Protocol', icon: Layers, desc: 'Stability & Scale' },
                  { id: 'generational', label: 'Generational Protocol', icon: Shield, desc: 'Legacy & Continuity' }
                ].map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => handleContextSelect(item.id as ContextType)}
                    className="bg-white p-10 border border-zinc-100 hover:border-[#b8860b] hover:shadow-2xl transition-all group flex flex-col items-center text-center relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-zinc-100 group-hover:bg-[#b8860b] transition-colors" />
                    <item.icon className="w-10 h-10 text-zinc-300 group-hover:text-[#b8860b] mb-6 transition-colors" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#111111] mb-2">{item.label}</span>
                    <span className="text-[8px] text-zinc-400 uppercase tracking-widest font-medium">{item.desc}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'questions' && (
            <motion.div 
              key="questions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white p-12 shadow-2xl border border-zinc-100"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.4em]">Domain 0{currentQuestion + 1}</span>
                <div className="flex gap-1">
                  {QUESTIONS.map((_, i) => (
                    <div key={i} className={`h-1 w-8 ${i <= currentQuestion ? 'bg-[#b8860b]' : 'bg-zinc-100'} transition-colors`} />
                  ))}
                </div>
              </div>

              <h4 className="text-2xl sm:text-3xl font-bold mb-12 text-[#111111] leading-tight italic">
                "{QUESTIONS[currentQuestion].text[context!]}"
              </h4>

              <div className="space-y-4">
                {QUESTIONS[currentQuestion].options.map((opt) => (
                  <button 
                    key={opt.value}
                    onClick={() => handleAnswer(opt.value)}
                    className="w-full p-8 border border-zinc-100 hover:border-[#b8860b] hover:bg-zinc-50 transition-all text-left group flex justify-between items-center"
                  >
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-[#b8860b] mb-2">{opt.label}</div>
                      <div className="text-zinc-500 font-light italic">{opt.description}</div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-zinc-300 group-hover:text-[#b8860b] transition-colors" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 'calculating' && (
            <motion.div 
              key="calculating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="relative w-24 h-24 mx-auto mb-12">
                <div className="absolute inset-0 border-4 border-zinc-100 rounded-full"></div>
                <motion.div 
                  className="absolute inset-0 border-4 border-t-[#b8860b] rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <h3 className="text-xl font-bold mb-4 text-[#111111] uppercase tracking-[0.3em]">Architectural Audit in Progress</h3>
              <p className="text-zinc-500 italic font-light animate-pulse">Mapping systemic constraints and authority leakage points...</p>
            </motion.div>
          )}

          {step === 'dossier' && (
            <motion.div 
              key="dossier"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#111111] text-white p-8 sm:p-16 shadow-[0_0_100px_rgba(184,134,11,0.1)] border border-[#b8860b]/30 relative overflow-hidden"
            >
              {/* Decorative Watermark */}
              <div className="absolute top-0 right-0 p-8 opacity-[0.03] select-none pointer-events-none">
                <Shield className="w-64 h-64" />
              </div>

              <div className="relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 pb-8 border-b border-white/10 gap-8">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-2 h-2 bg-[#b8860b] animate-pulse" />
                      <h3 className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.5em]">Structural Integrity Briefing</h3>
                    </div>
                    <div className="text-3xl sm:text-4xl font-bold uppercase tracking-widest font-mono">
                      Dossier <span className="text-[#b8860b]">#{dossierId}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-[9px] uppercase font-black text-zinc-500 mb-2 tracking-widest">Vertical Maturity Grade:</div>
                    <div className="px-8 py-4 bg-white text-black text-sm font-black uppercase tracking-[0.3em] shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                      {getGrade()}
                    </div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-16 mb-16">
                  <div className="lg:col-span-7 space-y-12">
                    <section>
                      <div className="text-[10px] uppercase font-black text-[#b8860b] mb-6 tracking-[0.4em] flex items-center gap-4">
                        <div className="h-px w-8 bg-[#b8860b]/30" />
                        The Primary Constraint
                      </div>
                      <div className="text-3xl font-bold italic mb-6 text-white leading-tight">
                        "{getConstraint()}"
                      </div>
                      <p className="text-zinc-400 text-lg font-light leading-relaxed italic border-l-2 border-[#b8860b]/20 pl-8">
                        Our diagnostic identifies this domain as your "Hole in the Wall." Your current architecture is leaking **Cognitive Equity** through this specific logic gate, forcing you into a cycle of manual intervention to maintain institutional stability.
                      </p>
                    </section>

                    <section className="grid sm:grid-cols-2 gap-8">
                      <div className="p-8 bg-white/[0.02] border border-white/5">
                        <div className="text-[9px] uppercase font-black text-zinc-500 mb-4 tracking-widest">Authority Leakage</div>
                        <div className="flex items-end gap-2 mb-4">
                          <span className="text-4xl font-bold text-[#b8860b]">74</span>
                          <span className="text-xs text-zinc-600 mb-1 font-black">%</span>
                        </div>
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '74%' }}
                            transition={{ duration: 2, delay: 0.5 }}
                            className="h-full bg-[#b8860b]"
                          />
                        </div>
                      </div>
                      <div className="p-8 bg-white/[0.02] border border-white/5">
                        <div className="text-[9px] uppercase font-black text-zinc-500 mb-4 tracking-widest">Cognitive Solvency</div>
                        <div className="flex items-end gap-2 mb-4">
                          <span className="text-4xl font-bold text-white">26</span>
                          <span className="text-xs text-zinc-600 mb-1 font-black">%</span>
                        </div>
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '26%' }}
                            transition={{ duration: 2, delay: 0.7 }}
                            className="h-full bg-white"
                          />
                        </div>
                      </div>
                    </section>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="bg-white/[0.03] border border-white/10 p-8 sm:p-10 relative">
                      <div className="absolute -top-3 -right-3">
                        <Lock className="w-8 h-8 text-[#b8860b] bg-[#111111] p-1.5 border border-[#b8860b]/30" />
                      </div>
                      <h4 className="text-[11px] font-black uppercase tracking-[0.3em] mb-8 text-zinc-400">Locked Protocol Modules</h4>
                      <div className="space-y-4">
                        {[
                          "The 90-Day Sovereign Roadmap",
                          "Substrate Re-engineering Blueprint",
                          "Decision Velocity Calibration Matrix",
                          "Institutional Permanence Protocol",
                          "Authority Compounding Framework"
                        ].map((item, i) => (
                          <div key={i} className="flex items-center justify-between p-5 border border-white/5 bg-black/40 group cursor-not-allowed">
                            <span className="text-xs text-zinc-600 font-medium tracking-wide group-hover:text-zinc-400 transition-colors">{item}</span>
                            <div className="text-[8px] font-black text-[#b8860b]/40 uppercase tracking-widest">Encrypted</div>
                          </div>
                        ))}
                      </div>
                      <div className="mt-10 pt-8 border-t border-white/5">
                        <p className="text-[10px] text-zinc-500 leading-relaxed italic text-center">
                          Full recalibration requires access to the Sovereign Substrate. These modules are reserved for verified Principals.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-16 border-t border-white/10 text-center">
                  <div className="max-w-2xl mx-auto">
                    <h5 className="text-2xl font-bold mb-6 text-white leading-tight">
                      The truth is revealed. The solution is <span className="italic text-[#b8860b]">Architectural.</span>
                    </h5>
                    <p className="text-zinc-500 mb-12 text-lg font-light italic leading-relaxed">
                      Your diagnostic confirms that you are currently the engine of your institution. To become the Architect, you must move beyond this taste of the protocol and secure the full substrate.
                    </p>
                    <div className="space-y-10">
                      {!isPaid ? (
                        <div className="bg-white/[0.03] border border-[#b8860b]/20 p-10 text-center">
                          <Lock className="w-10 h-10 text-[#b8860b] mx-auto mb-6" />
                          <h5 className="text-xl font-bold mb-4 text-white uppercase tracking-widest">Protocol Access Locked</h5>
                          <p className="text-zinc-500 mb-10 italic font-light leading-relaxed">
                            To maintain the integrity of the Sovereign Substrate, a one-time institutional verification fee is required to unlock the portal.
                          </p>
                          
                          <button 
                            onClick={() => {
                              window.open('https://rzp.io/rzp/T7d50Uma', '_blank');
                              setIsPaid(true);
                            }}
                            className="group relative px-12 py-6 bg-[#b8860b] text-white text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all shadow-2xl flex items-center justify-center gap-4 mx-auto"
                          >
                            <span>Initiate Verification & Unlock Portal</span>
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                          <div className="p-6 bg-[#b8860b]/10 border border-[#b8860b]/30 text-center">
                            <div className="text-[10px] uppercase text-[#b8860b] tracking-[0.4em] font-black mb-2">Verification Initiated</div>
                            <div className="text-xs text-zinc-400 italic">Access to the Sovereign Portal is now authorized.</div>
                          </div>

                          <a 
                            href="https://sovereign-protocol.com/access"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group relative px-12 py-10 bg-[#b8860b] text-white text-[13px] font-black uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all duration-500 shadow-[0_30px_60px_rgba(184,134,11,0.4)] flex items-center justify-center gap-8 mx-auto overflow-hidden no-underline border border-[#b8860b]"
                          >
                            <span className="relative z-10">Enter The Sovereign Portal</span>
                            <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-3 transition-transform" />
                            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                          </a>
                          
                          <div className="flex flex-col items-center gap-3">
                            <div className="text-[10px] uppercase text-zinc-400 tracking-[0.6em] font-black">Institutional Access Node:</div>
                            <a 
                              href="https://sovereign-protocol.com/access" 
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#b8860b] text-sm font-mono hover:underline tracking-[0.2em] bg-white/5 px-6 py-3 border border-white/10"
                            >
                              sovereign-protocol.com/access
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mt-12 text-[9px] uppercase text-zinc-600 tracking-[0.5em] font-black">
                      Dispatching Verification to: {user?.email}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Assessment;
