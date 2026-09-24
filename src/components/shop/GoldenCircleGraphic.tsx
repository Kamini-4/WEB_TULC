import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, ShieldCheck, Flame, Zap, Target, Lock, Trophy } from 'lucide-react';

interface GoldenCircleGraphicProps {
  onSelectProduct?: (productId: string) => void;
}

export const GoldenCircleGraphic: React.FC<GoldenCircleGraphicProps> = ({ onSelectProduct }) => {
  const [activeTier, setActiveTier] = useState<'truth' | 'weapon' | 'outcome'>('truth');

  const tiers = {
    truth: {
      tag: 'STAGE 01 // UNFILTERED DIAGNOSIS',
      title: 'THE OPERATIONAL TRUTH',
      subtitle: 'The Invisible Ceiling That Caps Fast-Growing Firms',
      color: '#dc2626', // High impact red/amber
      quote: 'High-leverage leaders don’t negotiate with friction; they redesign the system.',
      headline: 'Being indispensable feels noble, but it is the invisible bottleneck capping your company.',
      narrative:
        'Let’s examine the operational reality: working 70-hour weeks is rarely an indicator of business complexity—it is the natural symptom of missing systemic filters. When an executive answers every inquiry within seconds or sits through status meetings that could be read in three minutes, high-value strategic attention is consumed by low-leverage coordination. If company momentum pauses the moment you step onto a flight, the business hasn’t failed; it simply hasn’t yet been codified into an independent operating machine.',
      axioms: [
        'Stepping in to resolve every crisis provides immediate relief, but leaves the underlying system unbuilt.',
        'Unstructured consensus diffuses accountability; decisions stall when single-point ownership is missing.',
        'Uncodified operations face significant valuation discounts during institutional diligence.'
      ]
    },
    weapon: {
      tag: 'STAGE 02 // EXECUTIVE ARCHITECTURE',
      title: 'THE WEAPON',
      subtitle: 'How High-Leverage Leaders Engineer Velocity',
      color: '#b8860b', // Gold / High status
      quote: 'I don’t play the odds. I play the system.',
      headline: 'Deterministic logic gates that empower your team to bring solutions, not open-ended problems.',
      narrative:
        'Sustainable scale doesn’t require working more hours or generic advisory. It requires rigorous systems architecture: 4-lane incoming request filters, formal financial signing ceilings, two-way door decision gates, and 72-hour escalation timers. When the operational boundaries are crystal clear, your team executes autonomously with confidence, and you engage only where strategic leverage demands your attention.',
      axioms: [
        'The 85% Rule: 85% of decisions are completely reversible and belong at the frontline.',
        'The 72-Hour Invariant: Decisions resolve or escalate on a hard clock—zero committee drift.',
        'Delegated Authority Ceilings: Clear financial thresholds that eliminate hesitation on the spot.'
      ]
    },
    outcome: {
      tag: 'STAGE 03 // THE OPERATING DIVIDEND',
      title: 'THE OUTCOME',
      subtitle: 'What You Reclaim Within 72 Hours',
      color: '#16a34a', // Victory green
      quote: 'True autonomy isn’t requested from others; it is engineered through architecture.',
      headline: '15 hours reclaimed every week and an enterprise that expands with greater autonomy.',
      narrative:
        'This is what operational sovereignty looks like: 15 hours stripped off your weekly calendar, zero late-night emergency pings, cross-functional initiatives shipping in 4 days instead of 6 weeks, and the institutional confidence to step away for 30 consecutive days without operations missing a beat. Your enterprise commands a premium valuation because investors know the machine runs on codified systems, not founder adrenaline.',
      axioms: [
        'Reclaim 15+ hours weekly: Equivalent to 18 full working days returned every year.',
        'The 30-Day Disappearance Drill: True continuity insurance for board and investors.',
        '3x Decision Velocity: Cross-functional roadblocks resolved in under 72 hours.'
      ]
    }
  };

  const current = tiers[activeTier];

  return (
    <div className="relative border border-zinc-200/90 bg-[#111111] text-white p-6 sm:p-8 md:p-10 rounded-xs overflow-hidden shadow-2xl">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#b8860b]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-900/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar with Early Bird Ticker */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#b8860b]/20 border border-[#b8860b]/40 text-[#b8860b] text-[8px] font-mono uppercase tracking-widest font-black mb-2">
            <Flame className="w-3.5 h-3.5 text-[#b8860b]" /> The Executive Reality Check
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Diagnose The Architecture. <span className="italic text-[#b8860b] font-light">Deploy The Outcome.</span>
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-2xl font-light leading-relaxed">
            Every growing enterprise reaches a critical inflection point: either leadership remains the central operational switchboard, or they install sovereign architecture that compounds velocity independently.
          </p>
        </div>

        {/* Tier Selector Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-xs shrink-0 self-start md:self-auto">
          {(['truth', 'weapon', 'outcome'] as const).map((key) => {
            const t = tiers[key];
            const isActive = activeTier === key;
            return (
              <button
                key={key}
                onClick={() => setActiveTier(key)}
                className={`px-3 sm:px-4 py-2 text-[9px] font-mono uppercase font-black tracking-wider transition-all duration-300 rounded-2xs cursor-pointer ${
                  isActive
                    ? 'bg-[#b8860b] text-[#111111] shadow-md'
                    : 'text-zinc-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {t.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Visual + Deep Narrative Grid */}
      <div className="grid lg:grid-cols-12 gap-8 items-center">
        {/* Left Visual Interactive Leverage Dial */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-4">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
            {/* Outer Ring: THE OUTCOME */}
            <motion.div
              onClick={() => setActiveTier('outcome')}
              className={`absolute inset-0 rounded-full border-2 cursor-pointer transition-all duration-500 flex items-center justify-center ${
                activeTier === 'outcome'
                  ? 'border-green-500 bg-green-500/10 shadow-[0_0_30px_rgba(22,163,74,0.3)]'
                  : 'border-white/20 hover:border-green-500/50 bg-transparent'
              }`}
              whileHover={{ scale: 1.02 }}
            >
              <div className="absolute top-2.5 font-mono text-[8px] font-black uppercase tracking-widest text-green-400">
                03 // THE OUTCOME (15 Hrs Back)
              </div>
            </motion.div>

            {/* Middle Ring: THE WEAPON */}
            <motion.div
              onClick={() => setActiveTier('weapon')}
              className={`absolute w-52 h-52 sm:w-56 sm:h-56 rounded-full border-2 cursor-pointer transition-all duration-500 flex items-center justify-center ${
                activeTier === 'weapon'
                  ? 'border-[#b8860b] bg-[#b8860b]/15 shadow-[0_0_30px_rgba(184,134,11,0.35)]'
                  : 'border-white/20 hover:border-[#b8860b]/50 bg-transparent'
              }`}
              whileHover={{ scale: 1.03 }}
            >
              <div className="absolute top-2 font-mono text-[8px] font-black uppercase tracking-widest text-[#b8860b]">
                02 // THE WEAPON (Logic Gates)
              </div>
            </motion.div>

            {/* Inner Core: THE HARSH TRUTH */}
            <motion.div
              onClick={() => setActiveTier('truth')}
              className={`relative w-32 h-32 sm:w-36 sm:h-36 rounded-full border-2 cursor-pointer transition-all duration-500 flex flex-col items-center justify-center text-center p-3 z-10 ${
                activeTier === 'truth'
                  ? 'border-red-500 bg-red-600 text-white shadow-[0_0_35px_rgba(220,38,38,0.5)]'
                  : 'border-red-500/50 bg-red-950/40 text-red-300 hover:bg-red-900/50'
              }`}
              animate={activeTier === 'truth' ? { scale: [1, 1.04, 1] } : {}}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            >
              <span className="text-[7px] font-mono uppercase tracking-widest font-black opacity-80 mb-0.5">
                REALITY CHECK
              </span>
              <span className="text-sm font-black uppercase tracking-wider">
                THE TRUTH
              </span>
              <span className="text-[8px] font-light italic mt-0.5 leading-tight">
                Resolve The Bottleneck
              </span>
            </motion.div>
          </div>

          <div className="text-center mt-4 text-[9px] font-mono text-zinc-400 uppercase">
            Click any tier to inspect the executive operating difference
          </div>
        </div>

        {/* Right Dynamic Narrative Column */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTier}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: current.color }}
                />
                <span
                  className="font-mono text-[9px] uppercase tracking-widest font-black"
                  style={{ color: current.color }}
                >
                  {current.tag}
                </span>
                <span className="text-zinc-600 text-xs">•</span>
                <span className="text-[9px] font-mono uppercase text-zinc-400">
                  {current.subtitle}
                </span>
              </div>

              {/* Strategic Axiom Callout */}
              <div className="p-3 bg-white/5 border-l-2 border-[#b8860b] text-xs italic font-serif text-zinc-300">
                "{current.quote}"
              </div>

              <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-white leading-snug">
                {current.headline}
              </h4>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                {current.narrative}
              </p>

              {/* Axioms / Rules of Engagement */}
              <div className="space-y-2 pt-2">
                <div className="text-[8px] font-mono uppercase tracking-widest text-[#b8860b] font-bold">
                  The Operating Directives
                </div>
                <div className="space-y-1.5">
                  {current.axioms.map((axiom, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs text-zinc-200 bg-white/5 border border-white/10 p-2.5 rounded-2xs"
                    >
                      <Zap className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
                      <span className="font-medium text-[11px] leading-snug">{axiom}</span>
                    </div>
                  ))}
                </div>
              </div>

              {activeTier === 'outcome' && onSelectProduct && (
                <div className="pt-2">
                  <button
                    onClick={() => onSelectProduct('asset-01-bandwidth-reclamation-os')}
                    className="inline-flex items-center gap-2 text-xs font-mono uppercase font-black text-[#b8860b] hover:text-white transition-colors"
                  >
                    <span>Claim Asset 01 and take your 15 hours back</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
