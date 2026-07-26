import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

interface MethodologyProps {
  onBriefClick: (phaseId?: string) => void;
}

const Methodology: React.FC<MethodologyProps> = ({ onBriefClick }) => {
  const navigate = useNavigate();
  return (
    <section id="methodology" className="py-10 sm:py-12 md:py-14 bg-[#0a0a0a] text-white overflow-hidden relative isolate">
      <style>
        {`
          @keyframes executivePulse {
            0% { box-shadow: 0 0 0 0 rgba(184, 134, 11, 0.4); }
            70% { box-shadow: 0 0 0 15px rgba(184, 134, 11, 0); }
            100% { box-shadow: 0 0 0 0 rgba(184, 134, 11, 0); }
          }
          .animate-pulse-executive {
            animation: executivePulse 3s infinite cubic-bezier(0.66, 0, 0, 1);
          }
        `}
      </style>
      
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none -z-10 bg-black">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c5a32b2a1f52?auto=format&fit=crop&q=80&w=1920" 
          alt="Architectural Background" 
          className="w-full h-full object-cover grayscale"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 sm:mb-24 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-[#b8860b] text-[9px] sm:text-[11px] font-black uppercase mb-4 sm:mb-6 sm:flex flex-wrap items-center gap-2">
              <span>The Strategic Alignment Protocol</span>
            </h2>
            <h3 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
              The Architecture of <span className="italic text-[#b8860b]">Scalability.</span>
            </h3>
          </div>
          <div className="pb-2 w-full md:w-auto">
            <button 
              onClick={() => onBriefClick()}
              className="w-full md:w-auto px-8 sm:px-10 py-4 sm:py-5 bg-[#b8860b] text-white text-[9px] sm:text-[10px] font-black uppercase sm:hover:bg-white hover:text-black transition-all duration-500 shadow-2xl animate-pulse-executive"
            >
              Request Full Protocol
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
          <PhaseCard 
            phase="01"
            title="Yield Calibration"
            subtitle="The Diagnostic"
            action="Deployment of the Alignment Assessment to map the operational execution maturity of your organization."
            outcome="Identification of systemic constraints and coordination leakage points."
            systemLayer="Continuous passive data scanning to establish baseline organizational execution telemetry."
            humanIntegration="We establish baseline trusted relationship vectors and map the active channels where executive directives suffer initial resistance or dilution."
            image="https://images.unsplash.com/photo-1507679799987-c7077948a7eb?auto=format&fit=crop&q=80&w=800"
            onBriefClick={() => onBriefClick('01')}
          />
          <PhaseCard 
            phase="02"
            title="Strategic Domain Mapping"
            subtitle="The Synthesis"
            action="Generation of the Structural Alignment Report, isolating exactly 2 of the 5 global domains for immediate, targeted calibration based on your Phase 01 results."
            outcome="A definitive operational blueprint focusing exclusively on those 2 domains for maximum executive bandwidth reclamation."
            systemLayer="We map operational and decision-making workflows."
            humanIntegration="We do not use arbitrary business templates. We perform a forensic diagnostic on the founder’s personal cognitive profile (their bias, velocity, and core vision). The resulting logic gates are a direct, systemic mirror of the founder’s organic thinking, ensuring the system feels natural, intuitive, and human-first."
            image="https://images.unsplash.com/photo-1518349619113-03114f06ac3a?auto=format&fit=crop&q=80&w=800"
            onBriefClick={() => onBriefClick('02')}
          />
          <PhaseCard 
            phase="03"
            title="Architectural Intervention"
            subtitle="The Calibration"
            action="Tailored implementation of leadership protocols configured for your organization's specific requirements."
            outcome="Elimination of coordination friction and acceleration of strategic response rates."
            systemLayer="We install 12+ customized logic gates to automate daily operational micro-decisions."
            humanIntegration="This phase is entirely behavioral. We establish absolute alignment fidelity down to the frontline teams. By automating micro-decisions, we eliminate the constant 'meeting-tax' and alignment drag. Frontline teams are given systemic sovereignty—they no longer have to ask permission because the guardrails are clear, giving them trust, agency, and operational peace of mind."
            image="https://images.unsplash.com/photo-1504917595217-d4dc5f649e6b?auto=format&fit=crop&q=80&w=800"
            onBriefClick={() => onBriefClick('03')}
          />
          <PhaseCard 
            phase="04"
            title="Strategic Integration"
            subtitle="The Integration"
            action="Implementing validated governance structures to guarantee high strategic intent fidelity."
            outcome="Long-term operational resilience. Strategic decisions translate into reliable team performance."
            systemLayer="We establish continuous shadow metrics and automated drift detection."
            humanIntegration="This phase acts as a psychological shield. It insulates the executive leadership team from background noise, allowing them to remain in a state of 'uninhibited vision.' Crucially, it de-risks succession planning: by externalizing the founder's wisdom into organizational logic, the business can seamlessly transition leadership to the next generation of stewards without losing its operational soul or strategic integrity."
            image="https://images.unsplash.com/photo-1486406146926-c5a32b2a1f52?auto=format&crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4OTQyNzI4OQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=800"
            onBriefClick={() => onBriefClick('04')}
          />
        </div>

        {/* Boardroom Soundbite */}
        <div className="mt-20 max-w-4xl mx-auto border border-[#b8860b]/30 bg-zinc-950/80 p-8 sm:p-10 relative overflow-hidden shadow-2xl rounded-xs">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#b8860b]/5 blur-3xl rounded-full"></div>
          <div className="flex flex-col md:flex-row items-start gap-8 relative z-10">
            <div className="flex-shrink-0 flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-[#b8860b]/30 bg-zinc-900 flex items-center justify-center text-[#b8860b]">
                <span className="text-xl">🎙️</span>
              </div>
              <div className="text-[8px] font-black uppercase text-[#b8860b] font-mono">Principal Audio</div>
              <div className="flex items-end gap-1 h-6 pt-1">
                <span className="w-1 h-3 bg-[#b8860b]/40 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                <span className="w-1 h-5 bg-[#b8860b] rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
                <span className="w-1 h-2 bg-[#b8860b]/60 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></span>
                <span className="w-1 h-4 bg-[#b8860b] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-1 h-3 bg-[#b8860b]/80 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
              </div>
            </div>
            <div className="space-y-4 flex-grow">
              <span className="text-[10px] font-black uppercase text-[#b8860b] block">The Boardroom Soundbite</span>
              <blockquote className="text-zinc-200 text-base md:text-lg italic font-light leading-relaxed">
                "Standard consultants write manuals that collect dust because they design systems for a perfect world, ignoring human behavior. We do the opposite. We treat human bandwidth, emotional peace, and decision-fatigue as the primary constraints of any enterprise.
                <br /><br />
                We build system-level architectures exclusively to protect human strategic energy. By phase 2 and 3, your frontline staff aren’t memorizing policy manuals; they are operating within customized 'logic gates' that make the correct strategic choice natural and effortless. In phase 4, we insulate your executive bandwidth entirely from daily firefighting. We don't just build systems; we build an organizational nervous system that keeps your human talent acting in perfect, autonomous harmony with your legacy."
              </blockquote>
              <div className="pt-4 border-t border-white/5 flex justify-between items-center text-xs text-zinc-500 font-mono">
                <span>Suchita Sancheti, Principal Architect</span>
                <span>DURATION: 1:45</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 sm:mt-24 flex flex-wrap justify-center gap-4 sm:gap-8">
          <button 
            onClick={() => navigate('/intake')}
            className="px-8 sm:px-12 py-4 sm:py-6 border border-white/20 text-white text-[9px] sm:text-[11px] font-black uppercase sm:hover:border-[#b8860b] hover:text-[#b8860b] transition-all duration-500"
          >
            Initiate Phase 01
          </button>
          <button 
            onClick={() => navigate('/intake')}
            className="px-8 sm:px-12 py-4 sm:py-6 bg-white text-black text-[9px] sm:text-[11px] font-black uppercase sm:hover:bg-[#b8860b] hover:text-white transition-all duration-500 shadow-2xl animate-pulse-executive"
          >
            Secure Strategic Intake
          </button>
        </div>
      </div>
    </section>
  );
};

const PhaseCard: React.FC<{ 
  phase: string; 
  title: string; 
  subtitle: string; 
  action: string; 
  outcome: string;
  systemLayer?: string;
  humanIntegration?: string;
  image: string;
  onBriefClick: () => void;
}> = ({ phase, title, subtitle, action, outcome, systemLayer, humanIntegration, image, onBriefClick }) => {
  const [activeTab, setActiveTab] = useState<'core' | 'alignment'>('core');

  return (
    <div className="bg-[#0a0a0a] p-8 lg:p-10 group relative overflow-hidden flex flex-col h-full hover:bg-[#111111] transition-all duration-700">
      <div className="absolute top-0 right-0 w-full h-full opacity-0 group-hover:opacity-[0.05] transition-opacity duration-1000 -z-10">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 grayscale"
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="flex justify-between items-start mb-6 gap-4">
        <div className="flex flex-col">
          <span className="text-[#b8860b] text-[10px] font-black uppercase mb-2">Phase {phase}</span>
          <span className="text-white/30 text-[9px] uppercase font-bold ">{subtitle}</span>
        </div>
        <div className="text-white/5 text-6xl md:text-8xl font-black italic select-none group-hover:text-[#b8860b]/10 transition-colors duration-700">
          {phase}
        </div>
      </div>

      <h4 className="text-2xl lg:text-3xl font-bold mb-6 text-white group-hover:text-[#b8860b] transition-colors duration-500">
        {title}
      </h4>

      {/* Dynamic View Toggle Tabs */}
      <div className="flex border-b border-white/5 mb-6 text-[9px] font-black uppercase font-mono">
        <button
          onClick={() => setActiveTab('core')}
          className={`pb-3 pr-4 border-b-2 transition-all duration-300 relative ${
            activeTab === 'core' 
              ? 'border-[#b8860b] text-white font-bold' 
              : 'border-transparent text-white/30 hover:text-white/70'
          }`}
        >
          01 / Core Protocol
        </button>
        <button
          onClick={() => setActiveTab('alignment')}
          className={`pb-3 px-4 border-b-2 transition-all duration-300 relative ${
            activeTab === 'alignment' 
              ? 'border-[#b8860b] text-white font-bold' 
              : 'border-transparent text-white/30 hover:text-white/70'
          }`}
        >
          02 / Deep Alignment
        </button>
      </div>

      <div className="mb-8 flex-grow">
        <AnimatePresence mode="wait">
          {activeTab === 'core' ? (
            <motion.div
              key="core"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div>
                <div className="text-[9px] uppercase font-black text-[#b8860b] mb-2 opacity-60">The Action:</div>
                <p className="text-zinc-400 text-base leading-relaxed italic font-light">
                  {action}
                </p>
              </div>
              <div>
                <div className="text-[9px] uppercase font-black text-[#b8860b] mb-2 opacity-60">The Outcome:</div>
                <p className="text-white text-base leading-relaxed font-medium">
                  {outcome}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="alignment"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {systemLayer && (
                <div className="space-y-4">
                  <div>
                    <div className="text-[9px] uppercase font-black text-white/50 mb-1.5 font-mono">The System Layer:</div>
                    <p className="text-zinc-300 text-sm leading-relaxed font-light font-mono">
                      {systemLayer}
                    </p>
                  </div>
                  <div>
                    <div className="text-[9px] uppercase font-black text-[#b8860b] mb-1.5 ">The Human Integration:</div>
                    <p className="text-zinc-300 text-sm leading-relaxed italic font-light">
                      {humanIntegration}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="pt-8 border-t border-white/5">
        <button 
          onClick={onBriefClick}
          className="text-[10px] font-black uppercase text-white/40 group-hover:text-[#b8860b] transition-all flex items-center gap-3"
        >
          Request Briefing <span>→</span>
        </button>
      </div>
    </div>
  );
};

export default Methodology;
