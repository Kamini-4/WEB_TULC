import React from 'react';
import { 
  ArrowRight, 
  Compass, 
  Layers, 
  Activity, 
  Calculator, 
  ShieldCheck, 
  Clock, 
  TrendingUp, 
  CheckCircle2,
  BookOpen,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { INSTITUTIONAL_ARTICLES } from '../lib/articles';

export const Home: React.FC = () => {
  const featuredArticles = INSTITUTIONAL_ARTICLES.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#e0e2ec]">
      
      {/* 1. Hero Statement Section */}
      <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#1f232d] overflow-hidden">
        {/* Subtle background architectural grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-5xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 bg-[#171a23] border border-[#b8860b]/30 rounded-xs text-xs font-mono-tech text-[#d4af37] uppercase tracking-widest shadow-sm">
            <Compass className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Institutional Governance & Systems Architecture</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif-prestige font-bold text-white tracking-tight leading-[1.08]">
            Decouple Enterprise Scale From Founder Metabolic Burn.
          </h1>

          <p className="text-lg sm:text-xl text-[#9aa1b2] font-serif-prestige max-w-3xl mx-auto leading-relaxed">
            The Unbounded Leadership Co. re-engineers operating systems for high-growth CXOs, multi-board directors, and institutional investors—converting personality-dependent friction into anti-fragile systemic authority.
          </p>

          {/* Action CTAs */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/assessment"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#b8860b] to-[#8c6708] hover:from-[#d4af37] hover:to-[#a17812] text-black font-bold text-xs uppercase tracking-wider rounded-xs transition-all shadow-lg shadow-[#b8860b]/10"
            >
              <span>Audit Your Inaction Tax (90-Sec Scan)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/library"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#141720] hover:bg-[#1c202d] text-white font-semibold text-xs uppercase tracking-wider rounded-xs border border-[#232734] transition-colors"
            >
              <span>Explore Strategic Dispatches</span>
            </Link>
          </div>

          {/* Institutional Trust Band */}
          <div className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-[#1a1d26] max-w-4xl mx-auto text-left">
            <div>
              <div className="text-2xl font-mono-tech font-bold text-[#d4af37]">15 - 20 Hrs</div>
              <div className="text-xs text-[#7d8495] mt-0.5">Weekly Bandwidth Reclaimed per CEO</div>
            </div>
            <div>
              <div className="text-2xl font-mono-tech font-bold text-emerald-400">15% EBITDA</div>
              <div className="text-xs text-[#7d8495] mt-0.5">Average Leaking Margin Recovered</div>
            </div>
            <div>
              <div className="text-2xl font-mono-tech font-bold text-white">&lt; 24 Hours</div>
              <div className="text-xs text-[#7d8495] mt-0.5">Edge Decision Turnaround Speed</div>
            </div>
            <div>
              <div className="text-2xl font-mono-tech font-bold text-white">100% Zero-Drop</div>
              <div className="text-xs text-[#7d8495] mt-0.5">Valuation Resilience at Succession</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. The Core Problem Statement */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-[#1f232d] bg-[#0e1017]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-6 space-y-4">
            <span className="text-xs uppercase font-mono-tech text-[#d4af37] tracking-widest">
              The Architectural Bottleneck
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif-prestige font-bold text-white leading-tight">
              Why Companies with Brilliant People Still Move at a Snail's Pace.
            </h2>
            <p className="text-base text-[#9aa1b2] font-serif-prestige leading-relaxed">
              When a company scales from 15 to 100 or 500 people, communication complexity explodes quadratically. Without explicit, rule-based decision thresholds, managers default to self-defense: they schedule more meetings, create committees, and escalate every uncomfortable choice to the founder's desk.
            </p>
            <p className="text-base text-[#9aa1b2] font-serif-prestige leading-relaxed">
              The founder becomes an exhausted human router. And the enterprise operates at the speed of a single inbox.
            </p>
            <div className="pt-2">
              <Link
                to="/methodology"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d4af37] hover:underline"
              >
                <span>Read How the 4-Phase Protocol Fixes This</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="md:col-span-6 bg-[#13161f] border border-[#232734] rounded-xs p-6 sm:p-8 space-y-5">
            <h3 className="text-base font-serif-prestige font-bold text-white border-b border-[#232734] pb-3">
              The Two Operating Realities
            </h3>

            <div className="space-y-4 text-xs font-serif-prestige">
              <div className="p-4 bg-rose-950/20 border border-rose-900/40 rounded-xs space-y-1 text-rose-200">
                <div className="font-bold text-rose-400 font-mono-tech uppercase">The Charismatic Trap (Founder-Dependent)</div>
                <p>Every non-standard $10,000 decision requires CEO sign-off. The founder works 14-hour days, attends 25+ hours of weekly status meetings, and key-person risk depresses enterprise exit multiples.</p>
              </div>

              <div className="p-4 bg-[#181d28] border border-[#b8860b]/40 rounded-xs space-y-1 text-[#dcdfe8]">
                <div className="font-bold text-[#d4af37] font-mono-tech uppercase">The TULC Substrate (Sovereign Architecture)</div>
                <p>Implicit founder intuition is codified into binary if-then guardrails. Edge teams execute within pre-authorized envelopes with zero latency. The CEO focuses 100% on capital, vision, and high-alpha expansion.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Three Pillars of the Sovereign Substrate */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-[#1f232d]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs uppercase font-mono-tech text-[#d4af37] tracking-widest">
              Core Engineering Pillars
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif-prestige font-bold text-white">
              The Anatomy of an Autonomous Enterprise
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#12141a] border border-[#1f232d] p-6 sm:p-8 rounded-xs space-y-4">
              <div className="w-10 h-10 rounded-xs bg-[#1a1d26] border border-[#b8860b]/30 flex items-center justify-center text-[#d4af37]">
                <Layers className="w-5 h-5 text-[#d4af37]" />
              </div>
              <h3 className="text-xl font-serif-prestige font-bold text-white">
                I. Invariant Decision Rules
              </h3>
              <p className="text-sm text-[#8c94a6] leading-relaxed">
                Replace subjective guesswork with non-negotiable guidelines for hiring, pricing, capital expenditure, and product quality that edge teams can inspect and execute instantly.
              </p>
            </div>

            <div className="bg-[#12141a] border border-[#1f232d] p-6 sm:p-8 rounded-xs space-y-4">
              <div className="w-10 h-10 rounded-xs bg-[#1a1d26] border border-[#b8860b]/30 flex items-center justify-center text-[#d4af37]">
                <Activity className="w-5 h-5 text-[#d4af37]" />
              </div>
              <h3 className="text-xl font-serif-prestige font-bold text-white">
                II. Zero-Latency Execution Gates
              </h3>
              <p className="text-sm text-[#8c94a6] leading-relaxed">
                Establish pre-authorized spending and operational envelopes. Teams act with 100% binding authority without needing the CEO's signature or a multi-department committee review.
              </p>
            </div>

            <div className="bg-[#12141a] border border-[#1f232d] p-6 sm:p-8 rounded-xs space-y-4">
              <div className="w-10 h-10 rounded-xs bg-[#1a1d26] border border-[#b8860b]/30 flex items-center justify-center text-[#d4af37]">
                <ShieldCheck className="w-5 h-5 text-[#d4af37]" />
              </div>
              <h3 className="text-xl font-serif-prestige font-bold text-white">
                III. Automated Telemetry Layers
              </h3>
              <p className="text-sm text-[#8c94a6] leading-relaxed">
                Replace delayed, backward-looking quarterly board decks with live operational telemetry that flags coordination friction and strategic drift weeks before it hurts revenue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Executive Briefings Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-[#1f232d] bg-[#0c0e14]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs uppercase font-mono-tech text-[#d4af37] tracking-widest">
                Executive Intelligence
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif-prestige font-bold text-white">
                Strategic Dispatches & Thought Leadership
              </h2>
            </div>
            <Link
              to="/library"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d4af37] hover:underline"
            >
              <span>View All 19 Briefings</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArticles.map((article) => (
              <Link
                key={article.id}
                to={`/library/${article.slug}`}
                className="bg-[#12141a] border border-[#1f232d] hover:border-[#b8860b] rounded-xs overflow-hidden flex flex-col group transition-all"
              >
                {article.image && (
                  <div className="h-44 overflow-hidden relative border-b border-[#1f232d]">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover filter grayscale group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#0b0c10]/80 px-2 py-0.5 text-[10px] uppercase font-mono-tech text-[#d4af37]">
                      {article.category}
                    </div>
                  </div>
                )}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  <h3 className="text-lg font-serif-prestige font-bold text-white group-hover:text-[#d4af37] transition-colors leading-snug">
                    {article.title}
                  </h3>
                  <p className="text-xs text-[#7d8495] line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="pt-3 border-t border-[#1a1d26] flex items-center justify-between text-xs text-[#d4af37] font-bold uppercase tracking-wider font-mono-tech">
                    <span>Read Dispatch</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Pre-Intake Strategic Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#1a1e2b] via-[#12141a] to-[#0b0c10] border border-[#b8860b]/40 rounded-xs p-8 sm:p-14 text-center space-y-6 shadow-2xl">
          <div className="w-12 h-12 rounded-xs bg-[#171a23] border border-[#b8860b]/40 flex items-center justify-center text-[#d4af37] mx-auto">
            <Compass className="w-6 h-6 text-[#d4af37]" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif-prestige font-bold text-white">
            Transform Your Business from Personal Grind to Institutional Authority.
          </h2>

          <p className="text-base text-[#9aa1b2] font-serif-prestige max-w-xl mx-auto leading-relaxed">
            Begin with a confidential diagnostic to quantify your enterprise friction, or submit your leadership parameters directly to Principal Suchita Sancheti.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/intake"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#b8860b] hover:bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider rounded-xs transition-colors"
            >
              <span>Initiate Sovereign Intake</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/cognitive-tax"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#171a23] hover:bg-[#202432] text-white font-semibold text-xs uppercase tracking-wider rounded-xs border border-[#2b3040] transition-colors"
            >
              <span>Simulate Cognitive Tax</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
