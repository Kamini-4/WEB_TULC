import React, { useState, useEffect } from 'react';
import { db } from '../src/firebase';
import { SovereignDB } from '../lib/database.ts';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
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

declare global {
  interface Window {
    Razorpay: any;
  }
}

const QUESTIONS: Question[] = [
  {
    domain: "Cognitive Clarity",
    text: {
      dynamic: "Does the institutional leadership possess absolute clarity on the primary strategic vector, or is intent obscured by operational noise?",
      established: "Is the organizational vision distilled into a singular, unambiguous directive that executes without manual clarification?",
      generational: "Is the family's core purpose preserved with high fidelity across all governance layers and external advisors?"
    },
    options: [
      { label: "Obscured", value: 1, description: "Intent is frequently lost in translation, requiring constant manual correction." },
      { label: "Coherent", value: 3, description: "The vision is understood but lacks the sharp edge required for autonomous execution." },
      { label: "Absolute", value: 5, description: "Clarity is a structural property; intent executes with 100% fidelity." }
    ]
  },
  {
    domain: "Systemic Integrity",
    text: {
      dynamic: "Are the organization's protocols designed to maintain order during high-velocity pivots without heroic intervention?",
      established: "Does the institutional substrate possess the structural resilience to function for 30 days without principal oversight?",
      generational: "Is the legacy's continuity protected by a governing architecture that transcends individual behavioral variables?"
    },
    options: [
      { label: "Fragile", value: 1, description: "The system is a collection of individual efforts; without 'heroes', it dissolves." },
      { label: "Resilient", value: 3, description: "Protocols exist but require frequent validation to prevent systemic drift." },
      { label: "Sovereign", value: 5, description: "Integrity is built into the design; order is a structural inevitability." }
    ]
  },
  {
    domain: "Strategic Velocity",
    text: {
      dynamic: "Can the organizational substrate convert external disruption into a systemic advantage within a single quarter?",
      established: "Is decision-making velocity a structural advantage, or is the institution slowed by consensus-seeking noise?",
      generational: "Is the estate's asset allocation designed to automatically hedge against global geopolitical volatility?"
    },
    options: [
      { label: "Rigid", value: 1, description: "Change is slow and requires significant political capital to initiate." },
      { label: "Adaptive", value: 3, description: "The organization can pivot, but the process is manual and energy-intensive." },
      { label: "Antifragile", value: 5, description: "Velocity is a structural property; the substrate gains strength from disruption." }
    ]
  },
  {
    domain: "Moral Gravity",
    text: {
      dynamic: "Does the organization's ethical core command absolute compliance, or is 'culture' a secondary consideration?",
      established: "Is trust in the institution a structural inevitability, or does it rely on constant reputational maintenance?",
      generational: "Are the family's core values consistently upheld by the inner circle, even in the absence of the Principal?"
    },
    options: [
      { label: "Variable", value: 1, description: "Ethics and trust are behavioral variables, dependent on current leadership." },
      { label: "Principled", value: 3, description: "Values are documented but require constant oversight to ensure alignment." },
      { label: "Gravitational", value: 5, description: "Moral gravity is a structural property; alignment is inevitable." }
    ]
  },
  {
    domain: "Cultural Fidelity",
    text: {
      dynamic: "Does the institutional 'soul' carry absolute fidelity to the furthest operational edge of the organization?",
      established: "Do stakeholders execute standards exactly as the Principal would, without direct supervision?",
      generational: "Is the institutional culture preserved across generations through structural design rather than oral tradition?"
    },
    options: [
      { label: "Diluted", value: 1, description: "Culture experiences operational drift as it moves away from the direct resonance of the Principal." },
      { label: "Aligned", value: 3, description: "The team understands the culture but lacks the 'resonance' of the original intent." },
      { label: "Embodied", value: 5, description: "Fidelity is a structural property; the culture executes itself autonomously." }
    ]
  }
];

const Assessment: React.FC = () => {
  const [step, setStep] = useState<Step>('intro');
  const [identity, setIdentity] = useState({ name: '', email: '', organization: '' });
  const [context, setContext] = useState<ContextType | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isPaid, setIsPaid] = useState(false);
  const [assessmentId, setAssessmentId] = useState<string | null>(null);
  const [dossierId] = useState(() => Math.floor(Math.random() * 100000).toString().padStart(6, '0'));

  const handleStart = () => {
    setStep('auth');
  };

  const handleIdentitySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identity.name || !identity.email || !identity.organization) {
      setAuthError("All institutional identifiers are required for verification.");
      return;
    }

    // Trigger Initial Engagement Email & Admin Notify
    try {
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: identity.name,
          email: identity.email,
          organization: identity.organization,
          type: 'SIGNUP_INITIATED'
        })
      });
    } catch (e) {
      console.error("Initial handshake failure:", e);
    }

    setStep('context');
  };

  const handleRazorpayPayment = () => {
    // Open the specific Razorpay payment link provided by the user
    window.open('https://rzp.io/rzp/T7d50Uma', '_blank');
    
    // In this architectural flow, we authorize the portal access upon initiation
    // to ensure the Principal is not blocked by latency.
    setIsPaid(true);
    if (assessmentId) {
      SovereignDB.updateAssessmentPayment(assessmentId);
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
      const totalScoreValue = Object.values(finalAnswers).reduce((a, b) => a + b, 0);
      const maxScore = QUESTIONS.length * 5;
      const percentage = (totalScoreValue / maxScore) * 100;
      
      const domainScores = QUESTIONS.map((q, i) => ({
        domain: q.domain,
        score: finalAnswers[i] || 1
      }));

      const result = await SovereignDB.saveAssessment({
        userId: 'anonymous-sovereign',
        name: identity.name,
        email: identity.email,
        organization: identity.organization,
        context: context!,
        answers: finalAnswers,
        totalScore: totalScoreValue,
        percentage,
        domainScores
      });

      if (result?.id) {
        setAssessmentId(result.id);
        
        // Notify Admin
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: identity.name,
            email: identity.email,
            organization: identity.organization,
            message: `Free Assessment Completed. Total Score: ${totalScoreValue}/25. Domain Scores: ${domainScores.map(d => `${d.domain}: ${d.score}`).join(', ')}`,
            type: 'ASSESSMENT_COMPLETED',
            assessmentData: {
              totalScore: totalScoreValue,
              domainScores
            }
          })
        }).catch(err => console.error("Assessment notify failed", err));
      }

      // Simulate cinematic calculation
      setTimeout(() => {
        setStep('dossier');
        setIsSubmitting(false);
      }, 800);
    } catch (error) {
      console.error("Error saving assessment", error);
      setIsSubmitting(false);
    }
  };

  const getGrade = () => {
    const totalScoreValue = Object.values(answers).reduce((a, b) => a + b, 0);
    if (totalScoreValue >= 20) return 'Sovereign';
    if (totalScoreValue >= 15) return 'Architectural';
    if (totalScoreValue >= 10) return 'Systemic';
    return 'Manual';
  };

  const getReportDetails = () => {
    const totalScoreValue = Object.values(answers).reduce((a, b) => a + b, 0);
    
    // Identify Strength and Calibration Point
    const sortedScores = Object.entries(answers).sort(([, a], [, b]) => b - a);
    const strengthIndex = Number(sortedScores[0][0]);
    const calibrationIndex = Number(sortedScores[sortedScores.length - 1][0]);
    
    const strengthDomain = QUESTIONS[strengthIndex].domain;
    const calibrationDomain = QUESTIONS[calibrationIndex].domain;

    const insights: Record<string, { definition: string; strength: string; refinement: string }> = {
      "Cognitive Clarity": {
        definition: "The ability of leadership to distill strategic intent into ambiguous logic and high-fidelity output.",
        strength: "Your organization demonstrates a profound capacity for strategic alignment; intent is distilled with exceptional precision at the core. Your team feels seen through the clarity of your vision.",
        refinement: "There is a significant opportunity to further distill institutional intent. Calibrating this substrate allows for the reclamation of up to 40% of strategic bandwidth currently utilized for operational clarification."
      },
      "Systemic Integrity": {
        definition: "The structural resilience of protocols to maintain institutional order independent of behavioral variables.",
        strength: "The institutional substrate demonstrates remarkable structural resilience. Your people are valued because the systems you've built protect their focus and energy.",
        refinement: "The organization is positioned to transition from manual oversight to architectural inevitability. This calibration ensures that systemic order becomes a structural property, independent of individual intervention."
      },
      "Strategic Velocity": {
        definition: "The rate at which an organization converts strategic intent into revenue and market permanence.",
        strength: "You possess a high-velocity maneuverability. This inherent speed is a testament to the trust you've fostered within your ranks.",
        refinement: "An opportunity exists to further enhance strategic velocity by refining decision-making protocols. This adjustment positions the institution to capture a significant competitive edge by reducing operational friction."
      },
      "Moral Gravity": {
        definition: "The ethical weight of an institution that leads to the structural inevitability of trust.",
        strength: "The ethical core of your institution commands absolute compliance. This gravity makes your leadership undisputed and your legacy safe.",
        refinement: "Trust is currently a foundational asset. By further embedding this moral gravity into the structural design, the organization can reduce the cognitive load of reputational maintenance by 30%."
      },
      "Cultural Fidelity": {
        definition: "The recursive accuracy of institutional values as they propagate to the operational edge.",
        strength: "The institutional 'soul' is embodied at the operational edge. Your values are not just posters; they are the lived reality of every stakeholder.",
        refinement: "There is a unique opportunity to further enhance cultural resonance. Refining these protocols ensures that the institutional culture executes itself autonomously, eliminating the risk of operational drift."
      }
    };

    return {
      strength: insights[strengthDomain]?.strength || "The organization demonstrates foundational stability in its core protocols.",
      refinement: insights[calibrationDomain]?.refinement || "The institutional substrate is currently optimized for manual intervention, creating a hard ceiling on strategic scale.",
      strengthDomain,
      calibrationDomain,
      domainInsights: insights,
      priority: totalScoreValue < 15 
        ? "IMMEDIATE CALIBRATION: Your current institutional substrate is performing with resilience. Scaling your existing strengths is the correct next move to unlock strategic velocity and preserve your leadership legacy."
        : "ARCHITECTURAL SCALE: You are positioned for institutional permanence. Challenging your organization to move beyond 'Heroic Management' into 'Pure Architecture' is the definitive next step for your legacy."
    };
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
              <h2 className="text-[#b8860b] text-[10px] font-black uppercase mb-6 tracking-[0.4em]">The Free Yield Calibration</h2>
              <h3 className="text-4xl sm:text-6xl font-bold mb-8 text-[#111111] leading-tight">
                Architectural <span className="italic text-[#b8860b]">Maturity.</span>
              </h3>
              <p className="text-zinc-600 text-xl mb-12 font-light italic leading-relaxed max-w-2xl mx-auto">
                A free 5-domain diagnostic to map your institutional substrate. Identify the primary constraint preventing your transition from Hero to Architect.
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
                  <Link 
                    to="/portal" 
                    className="text-[#b8860b] text-xs font-mono hover:underline tracking-widest flex items-center gap-2"
                  >
                    Enter The Sovereign Portal <ArrowRight className="w-3 h-3" />
                  </Link>
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
              className="bg-white p-8 md:p-12 shadow-2xl border border-zinc-100 text-center max-w-2xl mx-auto"
            >
              <Shield className="w-12 h-12 text-[#b8860b] mx-auto mb-8" />
              <h3 className="text-2xl font-bold mb-4 text-[#111111] uppercase tracking-wider">Identity Protocol</h3>
              <p className="text-zinc-500 mb-10 italic font-light">
                Access to the Sovereign Protocol requires institutional verification. Please provide your strategic identifiers.
              </p>
              
              <form onSubmit={handleIdentitySubmit} className="space-y-6 text-left">
                <div>
                  <label className="text-[9px] font-black uppercase text-zinc-400 tracking-[0.3em] block mb-2">Institutional Identity</label>
                  <input 
                    type="text"
                    required
                    placeholder="Full Name"
                    value={identity.name}
                    onChange={(e) => setIdentity({...identity, name: e.target.value})}
                    className="w-full px-4 py-4 bg-zinc-50 border border-zinc-200 text-xs focus:outline-none focus:border-[#b8860b] italic"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase text-zinc-400 tracking-[0.3em] block mb-2">Strategic Email</label>
                  <input 
                    type="email"
                    required
                    placeholder="Institutional Email"
                    value={identity.email}
                    onChange={(e) => setIdentity({...identity, email: e.target.value})}
                    className="w-full px-4 py-4 bg-zinc-50 border border-zinc-200 text-xs focus:outline-none focus:border-[#b8860b] italic"
                  />
                </div>
                <div>
                  <label className="text-[9px] font-black uppercase text-zinc-400 tracking-[0.3em] block mb-2">Organization</label>
                  <input 
                    type="text"
                    required
                    placeholder="Principal Institution"
                    value={identity.organization}
                    onChange={(e) => setIdentity({...identity, organization: e.target.value})}
                    className="w-full px-4 py-4 bg-zinc-50 border border-zinc-200 text-xs focus:outline-none focus:border-[#b8860b] italic"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-6 bg-[#111111] text-white text-[11px] font-black uppercase tracking-[0.3em] hover:bg-[#b8860b] transition-all shadow-xl"
                >
                  Initiate Verification
                </button>
              </form>
              
              {authError && (
                <div className="mt-6 p-4 bg-red-50 border border-red-100 text-red-600 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>Verification Error</span>
                  </div>
                  {authError}
                </div>
              )}

              <div className="text-[9px] uppercase text-zinc-400 tracking-widest mt-8">
                Zero Data Retention (ZDR) Mandate Active
              </div>
            </motion.div>
          )}

          {step === 'context' && (
            <motion.div 
              key="context"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center max-w-5xl mx-auto"
            >
              <h3 className="text-2xl font-bold mb-4 text-[#111111] uppercase tracking-widest">Select Institutional Substrate</h3>
              <p className="text-zinc-500 mb-12 italic font-light max-w-2xl mx-auto">
                The diagnostic must be calibrated to your specific theater of operation. Select the substrate that most accurately reflects your current institutional complexity.
              </p>
              
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  { 
                    id: 'dynamic', 
                    label: 'Dynamic Protocol', 
                    icon: Zap, 
                    desc: 'Agility & Innovation',
                    longDesc: 'Optimized for high-velocity environments and disruptive strategic pivots. Ideal for growth-stage ventures and agile leadership.'
                  },
                  { 
                    id: 'established', 
                    label: 'Established Protocol', 
                    icon: Layers, 
                    desc: 'Stability & Scale',
                    longDesc: 'Designed for mature institutions requiring systemic stability, operational scale, and complex authority preservation.'
                  },
                  { 
                    id: 'generational', 
                    label: 'Generational Protocol', 
                    icon: Shield, 
                    desc: 'Legacy & Continuity',
                    longDesc: 'Engineered for the long-term preservation of legacy, family governance, and the multi-decade transition of power.'
                  }
                ].map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => handleContextSelect(item.id as ContextType)}
                    className="bg-white p-10 border border-zinc-100 hover:border-[#b8860b] hover:shadow-2xl transition-all group flex flex-col items-center text-center relative overflow-hidden h-full"
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-zinc-100 group-hover:bg-[#b8860b] transition-colors" />
                    <item.icon className="w-10 h-10 text-zinc-300 group-hover:text-[#b8860b] mb-6 transition-colors" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#111111] mb-2">{item.label}</span>
                    <span className="text-[8px] text-[#b8860b] uppercase tracking-widest font-black mb-4">{item.desc}</span>
                    <p className="text-[10px] text-zinc-500 leading-relaxed font-light italic">
                      {item.longDesc}
                    </p>
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
              <p className="text-zinc-500 italic font-light animate-pulse">Calibrating systemic resonance and strategic bandwidth vectors...</p>
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
                      <h3 className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.5em]">Institutional Snapshot (Trailer)</h3>
                    </div>
                    <div className="text-3xl sm:text-4xl font-bold uppercase tracking-widest font-mono">
                      Dossier <span className="text-[#b8860b]">{dossierId}</span>
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
                        Institutional Asset: {getReportDetails().strengthDomain}
                      </div>
                      <div className="text-xl font-bold italic mb-6 text-white leading-tight">
                        "{getReportDetails().strength}"
                      </div>
                      
                      <div className="text-[10px] uppercase font-black text-[#b8860b]/60 mb-6 tracking-[0.4em] flex items-center gap-4 mt-12">
                        <div className="h-px w-8 bg-[#b8860b]/20" />
                        Architectural Challenge: Scaling Excellence
                      </div>
                      <div className="text-xl font-bold italic mb-6 text-white leading-tight">
                        "{getReportDetails().refinement}"
                      </div>
                      <p className="text-zinc-400 text-lg font-light leading-relaxed italic border-l-2 border-[#b8860b]/20 pl-8">
                        Our forensic analysis indicates that while you possess foundational brilliance, your currently "Manual" intervention is reaching its strategic ceiling. The path to institutional sovereignty requires scaling this brilliance into a structural inevitability.
                      </p>
                    </section>

                    <section className="p-8 bg-[#b8860b]/5 border border-[#b8860b]/20">
                      <div className="text-[10px] uppercase font-black text-[#b8860b] mb-4 tracking-[0.3em]">Strategic Priority</div>
                      <p className="text-white font-bold italic text-lg leading-relaxed">
                        {getReportDetails().priority}
                      </p>
                    </section>

                    <section className="grid sm:grid-cols-2 gap-8">
                      <div className="p-8 bg-white/[0.02] border border-white/5">
                        <div className="text-[9px] uppercase font-black text-zinc-500 mb-4 tracking-widest">Aggregate Fidelity</div>
                        <div className="flex items-end gap-2 mb-4">
                          <span className="text-4xl font-bold text-[#b8860b]">
                            {Math.round((Object.values(answers).reduce((a, b) => a + b, 0) / (QUESTIONS.length * 5)) * 100)}
                          </span>
                          <span className="text-xs text-zinc-600 mb-1 font-black">%</span>
                        </div>
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.round((Object.values(answers).reduce((a, b) => a + b, 0) / (QUESTIONS.length * 5)) * 100)}%` }}
                            transition={{ duration: 2, delay: 0.5 }}
                            className="h-full bg-[#b8860b]"
                          />
                        </div>
                      </div>
                      <div className="p-8 bg-white/[0.02] border border-white/5">
                        <div className="text-[9px] uppercase font-black text-zinc-500 mb-4 tracking-widest">Cognitive Bandwidth</div>
                        <div className="flex items-end gap-2 mb-4">
                          <span className="text-4xl font-bold text-white">
                            {Math.round((Object.values(answers).reduce((a, b) => a + b, 0) / (QUESTIONS.length * 5)) * 100)}
                          </span>
                          <span className="text-xs text-zinc-600 mb-1 font-black">%</span>
                        </div>
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.round((Object.values(answers).reduce((a, b) => a + b, 0) / (QUESTIONS.length * 5)) * 100)}%` }}
                            transition={{ duration: 2, delay: 0.7 }}
                            className="h-full bg-white"
                          />
                        </div>
                      </div>
                    </section>

                    <section>
                      <div className="text-[10px] uppercase font-black text-zinc-500 mb-8 tracking-[0.4em]">Vertical Domain Calibration (1-5 Scale)</div>
                      <div className="grid grid-cols-1 gap-6">
                        {QUESTIONS.map((q, i) => (
                          <div key={i} className="group">
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block mb-1">{q.domain}</span>
                                <span className="text-[9px] text-zinc-600 italic font-light">{getReportDetails().domainInsights[q.domain]?.definition}</span>
                              </div>
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <div 
                                    key={star} 
                                    className={`w-3 h-3 ${star <= (answers[i] || 1) ? 'bg-[#b8860b]' : 'bg-white/5'} transition-all`}
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="h-[2px] w-full bg-white/5 relative overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${((answers[i] || 1) / 5) * 100}%` }}
                                transition={{ duration: 1, delay: 0.2 * i }}
                                className="absolute top-0 left-0 h-full bg-[#b8860b]/40"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>

                  <div className="lg:col-span-5">
                    <div className="bg-white/[0.03] border border-white/10 p-8 sm:p-10 relative h-full flex flex-col">
                      <div className="absolute -top-3 -right-3">
                        <Lock className="w-8 h-8 text-[#b8860b] bg-[#111111] p-1.5 border border-[#b8860b]/30" />
                      </div>
                      <h4 className="text-[11px] font-black uppercase tracking-[0.3em] mb-8 text-zinc-400">Locked Protocol Modules</h4>
                      <div className="space-y-4 flex-grow">
                        {[
                          { name: "The 90-Day Sovereign Roadmap", benefit: "Calibrate the system for autonomous strategic execution" },
                          { name: "Substrate Re-engineering Blueprint", benefit: "Convert operational energy into structural authority" },
                          { name: "Decision Velocity Calibration Matrix", benefit: "Reclaim 40% of strategic bandwidth for higher-order maneuvers" },
                          { name: "Institutional Permanence Protocol", benefit: "Ensure the vision becomes a structural inevitability" },
                          { name: "Authority Compounding Framework", benefit: "Scale the institution without cognitive dilution" }
                        ].map((item, i) => (
                          <div key={i} className="flex flex-col p-5 border border-white/5 bg-black/40 group cursor-not-allowed">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs text-zinc-400 font-medium tracking-wide">{item.name}</span>
                              <div className="text-[8px] font-black text-[#b8860b]/40 uppercase tracking-widest">Encrypted</div>
                            </div>
                            <div className="text-[9px] text-zinc-600 italic">{item.benefit}</div>
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
                      The snapshot is complete. The solution is <span className="italic text-[#b8860b]">Architectural.</span>
                    </h5>
                    <p className="text-zinc-500 mb-12 text-lg font-light italic leading-relaxed">
                      This initial diagnostic is a Strategic Trailer—a snapshot of your current institutional substrate. The full Sovereign Model, reserved for paid Principals, identifies the precise calibration vectors through a comprehensive Voice Audit and Cross-Mapping of operational fidelity. Your organization is currently demonstrating architectural potential; the transition from Heroic Intervention to Institutional Sovereignty requires the full-fidelity recalibration found in the In-depth Assessment.
                    </p>
                    <div className="space-y-10">
                      {!isPaid ? (
                        <div className="bg-white/[0.03] border border-[#b8860b]/20 p-10 text-center">
                          <Lock className="w-10 h-10 text-[#b8860b] mx-auto mb-6" />
                          <h5 className="text-xl font-bold mb-4 text-white uppercase tracking-widest">In-depth Protocol Access Locked</h5>
                          <p className="text-zinc-500 mb-10 italic font-light leading-relaxed">
                            The dossier above is an Executive Preview. To maintain the integrity of the Sovereign Substrate, a one-time institutional verification fee is required to unlock the full In-depth Architectural Assessment and the Sovereign Roadmap. This payment redirects you via Razorpay to the secure Sovereign Portal app—the definitive environment for institutional permanence.
                          </p>
                          
                          <button 
                            onClick={handleRazorpayPayment}
                            className="group relative px-12 py-6 bg-[#b8860b] text-white text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all shadow-2xl flex items-center justify-center gap-4 mx-auto"
                          >
                            <span>Initiate Verification & Unlock Indepth Assessment</span>
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                          <div className="p-6 bg-[#b8860b]/10 border border-[#b8860b]/30 text-center">
                            <div className="text-[10px] uppercase text-[#b8860b] tracking-[0.4em] font-black mb-2">Verification Initiated</div>
                            <div className="text-xs text-zinc-400 italic">Access to the Indepth Assessment and Sovereign Portal is now authorized.</div>
                          </div>

                          <Link 
                            to="/portal"
                            className="group relative px-12 py-10 bg-[#b8860b] text-white text-[13px] font-black uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all duration-500 shadow-[0_30px_60px_rgba(184,134,11,0.4)] flex items-center justify-center gap-8 mx-auto overflow-hidden no-underline border border-[#b8860b]"
                          >
                            <span className="relative z-10">Access Indepth Assessment</span>
                            <ArrowRight className="w-6 h-6 relative z-10 group-hover:translate-x-3 transition-transform" />
                            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                          </Link>
                          
                          <div className="flex flex-col items-center gap-3">
                            <div className="text-[10px] uppercase text-zinc-400 tracking-[0.6em] font-black">Institutional Access Node:</div>
                            <Link 
                              to="/portal" 
                              className="text-[#b8860b] text-sm font-mono hover:underline tracking-[0.2em] bg-white/5 px-6 py-3 border border-white/10"
                            >
                              theunboundedleadership.com/portal
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mt-12 text-[9px] uppercase text-zinc-600 tracking-[0.5em] font-black">
                      Dispatching Verification to: {identity.email}
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
