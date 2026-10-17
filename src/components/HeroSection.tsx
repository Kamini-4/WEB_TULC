import React from 'react';
import { ArrowRight, Sparkles, Shield, Cpu, Activity, Clock } from 'lucide-react';

interface HeroSectionProps {
  onStartDiagnostic: () => void;
  onReadEssays: () => void;
  openCalibrationModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartDiagnostic,
  onReadEssays,
  openCalibrationModal
}) => {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden border-b border-zinc-900">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-amber-500/5 blur-[120px] pointer-events-none rounded-full"></div>
      
      {/* Hairline grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a15_1px,transparent_1px),linear-gradient(to_bottom,#27272a15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none"></div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Tribal Creed Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-amber-500/30 text-amber-300 text-xs font-mono tracking-wider mb-8 shadow-inner shadow-amber-500/5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>SOVEREIGN INSTITUTIONAL RE-POSITIONING</span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-400 font-sans">For Enterprise CXOs & Founders</span>
        </div>

        {/* The Tribal Hook (Sovereign Doctrine) */}
        <h1 className="serif-heading text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-zinc-100 leading-[1.08] mb-6">
          Sovereign Architects <br className="hidden sm:inline" />
          <span className="text-gold-gradient italic font-normal">Build What Outlives Them.</span>
        </h1>

        {/* Constructive Tension Subhead */}
        <p className="max-w-3xl mx-auto text-lg sm:text-xl text-zinc-300 leading-relaxed font-light mb-10">
          We do not submit RFPs. We do not pitch hourly consulting. We exist exclusively for the 
          <strong className="text-zinc-100 font-semibold"> 100 enterprise leaders</strong> whose companies cannot 
          scale without their leadership operating systems being fundamentally re-engineered.
        </p>

        {/* Dual High-Value Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onStartDiagnostic}
            className="w-full sm:w-auto px-8 py-4 rounded-sm bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-zinc-950 font-semibold text-sm tracking-wide uppercase hover:brightness-110 transition-all duration-200 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-3 cursor-pointer group"
          >
            <Activity className="w-4 h-4 text-zinc-950 group-hover:scale-110 transition-transform" />
            <span>Launch Sovereign Diagnostic</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onReadEssays}
            className="w-full sm:w-auto px-8 py-4 rounded-sm bg-zinc-900 hover:bg-zinc-850 text-zinc-200 border border-zinc-800 hover:border-zinc-700 font-medium text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Read Executive Dispatches</span>
          </button>
        </div>

        {/* Micro-Metrics / Proof of Architecture */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-zinc-900/80">
          <div className="p-4 rounded-lg bg-zinc-900/40 border border-zinc-800/60 text-left">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <Clock className="w-4 h-4" />
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">Time Reclaimed</span>
            </div>
            <div className="text-2xl font-semibold font-serif text-zinc-100">18.4 hrs/wk</div>
            <p className="text-xs text-zinc-500 mt-1">Returned to high-conviction strategic vision</p>
          </div>

          <div className="p-4 rounded-lg bg-zinc-900/40 border border-zinc-800/60 text-left">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <Cpu className="w-4 h-4" />
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">Decision Churn</span>
            </div>
            <div className="text-2xl font-semibold font-serif text-zinc-100">-76%</div>
            <p className="text-xs text-zinc-500 mt-1">Replaced by autonomous governance protocols</p>
          </div>

          <div className="p-4 rounded-lg bg-zinc-900/40 border border-zinc-800/60 text-left">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <Shield className="w-4 h-4" />
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">Quarterly Cohort</span>
            </div>
            <div className="text-2xl font-semibold font-serif text-zinc-100">Max 4 Firms</div>
            <p className="text-xs text-zinc-500 mt-1">Strict capacity to guarantee deep immersion</p>
          </div>

          <div className="p-4 rounded-lg bg-zinc-900/40 border border-zinc-800/60 text-left">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <Activity className="w-4 h-4" />
              <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">Contract Length</span>
            </div>
            <div className="text-2xl font-semibold font-serif text-zinc-100">1-Page Treaty</div>
            <p className="text-xs text-zinc-500 mt-1">Zero procurement bureaucracy; instant start</p>
          </div>
        </div>
      </div>
    </section>
  );
};
