import React, { useState } from 'react';
import { 
  ArrowRight, 
  Compass, 
  Clock, 
  ShieldCheck, 
  FileText,
  Layers,
  Zap,
  Gift,
  CheckCircle2,
  Flame
} from 'lucide-react';
import { Link } from 'react-router-dom';
import VideoPlayer from '../../components/VideoPlayer';
import { INSTITUTIONAL_ARTICLES } from '../lib/articles';
import { FAQ } from '../../components/FAQ';
import { SEOHead } from '../components/SEOHead';
import { InternalLinksMatrix } from '../components/InternalLinksMatrix';

export const Home: React.FC = () => {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const featuredArticles = INSTITUTIONAL_ARTICLES.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f7f4ee] text-[#1c1917] font-serif selection:bg-black selection:text-white">
      <SEOHead
        title="The Unbounded Leadership Co. | Sovereign Leadership & Executive Governance"
        description="Eliminate founder dependency and reclaim 15+ hours weekly. We enable CXOs and enterprise founders to build sovereign operating systems that run without them in 90 days."
        canonicalPath="/"
        keywords="leadership architecture, founder bottleneck, decision latency, two-week test, executive bandwidth, sovereign governance, Suchita Sancheti, inaction tax"
        faqData={[
          {
            question: "What is the Two-Week Step-Away Test?",
            answer: "An adversarial operational stress test where the apex founder or CEO steps away completely for 14 continuous days. If decision velocity degrades or operational crises stall execution, the enterprise possesses a key-person architectural bottleneck rather than a sovereign operating system."
          },
          {
            question: "How does The Unbounded Leadership Co. eliminate founder dependency?",
            answer: "We install 12 invariant execution protocols across cognitive, relational, and structural substrates, hard-coding strategic heuristics into existing communication channels and software dockets to automate routine trade-offs and eradicate meeting drag."
          },
          {
            question: "How much executive bandwidth can be reclaimed in 90 days?",
            answer: "Our enterprise transformation protocol systematically reclaims up to 40% (15–20 hours per week) of executive bandwidth within 90 days by decentralizing decision thresholds and removing operational bottlenecks."
          }
        ]}
      />
      
      {/* 1. Hero Statement Section - Clean, Elegant Spacing, No Sticker, Black Highlights */}
      <section className="relative pt-8 pb-10 sm:pt-12 sm:pb-14 px-4 sm:px-6 lg:px-8 border-b border-[#ded6c5] overflow-hidden">
        {/* Subtle architectural grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#b8860b_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-4xl mx-auto text-center space-y-5 sm:space-y-6 relative z-10">
          
          {/* Elite Context Question with subtle aristocratic pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#efebe2]/90 border border-[#b8860b]/30 rounded-full text-xs uppercase tracking-tight text-[#8c6708] font-bold shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b8860b]"></span>
            <span>You scaled a company.</span>
            <span className="text-[#57534e] italic normal-case font-normal">So why are you still putting out fires?</span>
          </div>

          {/* Main Headline: Exactly as requested */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1c1917] tracking-tighter leading-[1.12]">
            Eliminate Founder Dependency and <br className="hidden sm:inline" />
            <span className="italic font-bold text-[#b8860b]">Reclaim 15+ Hours Weekly.</span>
          </h1>

          {/* Subheadline: Clean text without black stripes */}
          <p className="text-base sm:text-lg text-[#57534e] max-w-3xl mx-auto leading-relaxed tracking-tight">
            We enable founders to build <strong className="font-bold text-[#1c1917]">companies that run without them in 90 days</strong> without <strong className="font-bold text-[#1c1917]">micromanagement, midnight firefighting, or decision bottlenecks</strong>.
          </p>

          {/* Action CTAs - Clean High Contrast & Elegant */}
          <div className="pt-1 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              to="/assessment"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 bg-black hover:bg-[#b8860b] text-white font-bold text-xs uppercase tracking-tight rounded-xs transition-all shadow-sm cursor-pointer"
            >
              <span>Take The Two-Week Test</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/products"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 bg-[#efebe2] hover:bg-black hover:text-white text-[#1c1917] font-bold text-xs uppercase tracking-tight rounded-xs border border-[#b8860b]/50 transition-all shadow-2xs cursor-pointer"
            >
              <Zap className="w-4 h-4 text-[#8c6708]" />
              <span>Browse Digital Systems ($27–$97)</span>
            </Link>
          </div>

          {/* 4 Proof Metric Cards Highlighted with Black Background */}
          <div className="pt-4 sm:pt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5 max-w-4xl mx-auto text-left">
            <div className="bg-black text-white p-3.5 sm:p-4 border border-[#b8860b]/30 hover:border-[#b8860b] transition-colors rounded-xs shadow-sm flex flex-col justify-between">
              <div className="text-xl sm:text-2xl font-bold text-[#b8860b] tracking-tight">15+ Hours</div>
              <div className="text-xs text-zinc-300 mt-1 tracking-tight font-medium"><em className="italic text-zinc-100">Wednesday afternoons</em> returned</div>
            </div>
            <div className="bg-black text-white p-3.5 sm:p-4 border border-[#b8860b]/30 hover:border-[#b8860b] transition-colors rounded-xs shadow-sm flex flex-col justify-between">
              <div className="text-xl sm:text-2xl font-bold text-[#b8860b] tracking-tight">Zero Dread</div>
              <div className="text-xs text-zinc-300 mt-1 tracking-tight font-medium">No <em className="italic text-zinc-100">late-night panics</em> or Slack triage</div>
            </div>
            <div className="bg-black text-white p-3.5 sm:p-4 border border-[#b8860b]/30 hover:border-[#b8860b] transition-colors rounded-xs shadow-sm flex flex-col justify-between">
              <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">Full Freedom</div>
              <div className="text-xs text-zinc-300 mt-1 tracking-tight font-medium"><strong className="font-bold text-[#b8860b]">14 days away</strong> without operational freeze</div>
            </div>
            <div className="bg-black text-white p-3.5 sm:p-4 border border-[#b8860b]/30 hover:border-[#b8860b] transition-colors rounded-xs shadow-sm flex flex-col justify-between">
              <div className="text-xl sm:text-2xl font-bold text-[#b8860b] tracking-tight">Enterprise Scale</div>
              <div className="text-xs text-zinc-300 mt-1 tracking-tight font-medium"><strong className="font-bold text-white">Sovereign Architecture</strong> for $10M–$100M+ Leaders</div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. THE 4 IMPORTANT THINGS (Drawn in 4 Distinct Boxes, No Distance Between Alphabets) */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8 border-b border-[#ded6c5] bg-[#ffffff]">
        <div className="max-w-6xl mx-auto space-y-7 sm:space-y-8">
          
          <div className="text-center space-y-2.5 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-tight text-[#b8860b] font-bold">
              The Architecture of Independence
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1c1917] tracking-tight">
              4 Structural Pillars of a <span className="italic font-bold text-[#b8860b]">Self-Governing Company</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#57534e] tracking-tight">
              Everything required to transition from founder-dependent firefighting to sovereign, compounding enterprise value.
            </p>
          </div>

          {/* 4 Distinct Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            
            {/* Box 1 */}
            <div className="bg-[#faf8f5] hover:bg-[#ffffff] border border-[#ded6c5] hover:border-[#b8860b] transition-all p-5 rounded-xs flex flex-col justify-between shadow-2xs hover:shadow-md group relative">
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="bg-black text-[#b8860b] border border-[#b8860b]/30 px-2 py-0.5 text-[10px] font-bold uppercase rounded-xs tracking-tight">
                    01 // Diagnostic
                  </span>
                  <div className="w-7 h-7 rounded-xs bg-[#efebe2] border border-[#ded6c5] flex items-center justify-center text-[#b8860b]">
                    <Clock className="w-3.5 h-3.5 text-[#b8860b]" />
                  </div>
                </div>
                
                <h3 className="text-base sm:text-lg font-bold text-[#1c1917] tracking-tight group-hover:text-[#b8860b] transition-colors">
                  The Two-Week Tension Test
                </h3>
                
                <p className="text-xs text-[#57534e] leading-relaxed tracking-tight">
                  A rapid diagnostic isolating what breaks or freezes if you turn your phone off for <strong className="text-[#1c1917] font-semibold">14 consecutive days</strong>. Pinpoints the exact 3 bottlenecks consuming <em className="italic text-[#8c6708]">80% of your energy</em>.
                </p>

                <div className="pt-2 border-t border-[#ded6c5] text-[11px] text-[#78716c] tracking-tight">
                  <span className="bg-black text-white px-1.5 py-0.5 rounded-xs font-semibold inline-block mr-1">Result:</span> Instant visibility into single-point founder risks.
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/assessment"
                  className="w-full inline-flex items-center justify-between px-3.5 py-2 bg-black hover:bg-[#b8860b] text-white text-xs font-bold uppercase tracking-tight rounded-xs transition-all shadow-xs"
                >
                  <span>Run Tension Scan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Box 2 */}
            <div className="bg-[#faf8f5] hover:bg-[#ffffff] border border-[#ded6c5] hover:border-[#b8860b] transition-all p-5 rounded-xs flex flex-col justify-between shadow-2xs hover:shadow-md group relative">
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="bg-black text-[#b8860b] border border-[#b8860b]/30 px-2 py-0.5 text-[10px] font-bold uppercase rounded-xs tracking-tight">
                    02 // Synthesis
                  </span>
                  <div className="w-7 h-7 rounded-xs bg-[#efebe2] border border-[#ded6c5] flex items-center justify-center text-[#b8860b]">
                    <Layers className="w-3.5 h-3.5 text-[#b8860b]" />
                  </div>
                </div>
                
                <h3 className="text-base sm:text-lg font-bold text-[#1c1917] tracking-tight group-hover:text-[#b8860b] transition-colors">
                  Decision Rule Codification
                </h3>
                
                <p className="text-xs text-[#57534e] leading-relaxed tracking-tight">
                  Translates unwritten founder judgment into <strong className="text-[#1c1917] font-semibold">self-executing operational criteria</strong>, autonomous spending boundaries, and explicit escalation guardrails for your leadership team.
                </p>

                <div className="pt-2 border-t border-[#ded6c5] text-[11px] text-[#78716c] tracking-tight">
                  <span className="bg-black text-white px-1.5 py-0.5 rounded-xs font-semibold inline-block mr-1">Result:</span> Senior staff decides with 100% of your fidelity.
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/methodology"
                  className="w-full inline-flex items-center justify-between px-3.5 py-2 bg-black hover:bg-[#b8860b] text-white text-xs font-bold uppercase tracking-tight rounded-xs transition-all shadow-xs"
                >
                  <span>Explore Methodology</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Box 3 */}
            <div className="bg-[#faf8f5] hover:bg-[#ffffff] border border-[#ded6c5] hover:border-[#b8860b] transition-all p-5 rounded-xs flex flex-col justify-between shadow-2xs hover:shadow-md group relative">
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="bg-black text-[#b8860b] border border-[#b8860b]/30 px-2 py-0.5 text-[10px] font-bold uppercase rounded-xs tracking-tight">
                    03 // Decoupling
                  </span>
                  <div className="w-7 h-7 rounded-xs bg-[#efebe2] border border-[#ded6c5] flex items-center justify-center text-[#b8860b]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#b8860b]" />
                  </div>
                </div>
                
                <h3 className="text-base sm:text-lg font-bold text-[#1c1917] tracking-tight group-hover:text-[#b8860b] transition-colors">
                  90-Day Sovereign Transformation
                </h3>
                
                <p className="text-xs text-[#57534e] leading-relaxed tracking-tight">
                  Installs 12+ permanent execution guardrails across finance, hiring, and delivery. Eradicates <strong className="text-[#1c1917] font-semibold">micromanagement, midnight fires, and meeting drag</strong> so you reclaim 15+ hours weekly.
                </p>

                <div className="pt-2 border-t border-[#ded6c5] text-[11px] text-[#78716c] tracking-tight">
                  <span className="bg-black text-white px-1.5 py-0.5 rounded-xs font-semibold inline-block mr-1">Result:</span> Operations compound smoothly on autopilot.
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/services"
                  className="w-full inline-flex items-center justify-between px-3.5 py-2 bg-black hover:bg-[#b8860b] text-white text-xs font-bold uppercase tracking-tight rounded-xs transition-all shadow-xs"
                >
                  <span>Explore Services</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Box 4 */}
            <div className="bg-[#faf8f5] hover:bg-[#ffffff] border border-[#ded6c5] hover:border-[#b8860b] transition-all p-5 rounded-xs flex flex-col justify-between shadow-2xs hover:shadow-md group relative">
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="bg-black text-[#b8860b] border border-[#b8860b]/30 px-2 py-0.5 text-[10px] font-bold uppercase rounded-xs tracking-tight">
                    04 // Advisory
                  </span>
                  <div className="w-7 h-7 rounded-xs bg-[#efebe2] border border-[#ded6c5] flex items-center justify-center text-[#b8860b]">
                    <Compass className="w-3.5 h-3.5 text-[#b8860b]" />
                  </div>
                </div>
                
                <h3 className="text-base sm:text-lg font-bold text-[#1c1917] tracking-tight group-hover:text-[#b8860b] transition-colors">
                  Institutional Architecture Advisory
                </h3>
                
                <p className="text-xs text-[#57534e] leading-relaxed tracking-tight">
                  Confidential, 1-on-1 institutional alignment conducted personally by <strong className="text-[#1c1917] font-semibold">Suchita Sancheti</strong>. Engineered with uncompromising architectural rigor for founders scaling to $100M+.
                </p>

                <div className="pt-2 border-t border-[#ded6c5] text-[11px] text-[#78716c] tracking-tight">
                  <span className="bg-black text-white px-1.5 py-0.5 rounded-xs font-semibold inline-block mr-1">Result:</span> Bespoke governance without junior handoffs.
                </div>
              </div>

              <div className="pt-4">
                <Link
                  to="/intake"
                  className="w-full inline-flex items-center justify-between px-3.5 py-2 bg-black hover:bg-[#b8860b] text-white text-xs font-bold uppercase tracking-tight rounded-xs transition-all shadow-xs"
                >
                  <span>Request Intake</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. The Core Problem & Video Briefing (Centered around them, Elite Tone) */}
      <section id="briefing" className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8 border-b border-[#ded6c5] bg-[#efebe2]/60">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs uppercase text-[#b8860b] tracking-tight font-bold">
              The Founder's Private Misery
            </span>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1c1917] leading-tight tracking-tight">
              When You Grow Without Systems, <br />
              <span className="italic font-bold text-[#b8860b]">You Just Scale Your Personal Exhaustion.</span>
            </h2>
            
            <p className="text-sm sm:text-base text-[#57534e] leading-relaxed tracking-tight">
              You hired exceptional people. You pay competitive compensation. You run weekly strategic alignments. Yet somehow, <strong className="font-bold text-[#1c1917]">every high-friction choice still lands on your desk at 8:00 PM</strong>.
            </p>
            
            <p className="text-sm sm:text-base text-[#57534e] leading-relaxed tracking-tight">
              You catch yourself thinking: <em className="text-[#8c6708] font-bold">"Why must every decision flow through my desk? Why does scale feel heavier instead of lighter?"</em>
            </p>

            {/* Rephrased Elite Tone Quote */}
            <div className="p-4 sm:p-4.5 bg-[#ffffff] border-l-3 border-[#b8860b] rounded-r-xs space-y-1.5 shadow-2xs">
              <p className="text-xs sm:text-sm text-[#292524] leading-relaxed tracking-tight">
                "There are two kinds of founders. The first believes suffering is proof of competence—wearing 14-hour days and midnight messages like badges of honor. The second realizes that if the business freezes without them, they don't own an asset; they own an exhausting job. <strong className="font-bold text-[#1c1917]">Sovereign leaders engineer self-governing architecture</strong> that <em className="italic font-semibold text-[#b8860b]">guarantees lasting institutional freedom</em>."
              </p>
            </div>

            {/* The Two Operating Realities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 sm:p-4 bg-rose-50/90 border border-rose-200 rounded-xs space-y-1 text-xs text-rose-950 shadow-2xs">
                <div className="font-bold text-rose-800 uppercase tracking-tight">The Exhausted Hero</div>
                <p className="leading-relaxed text-rose-900/80 tracking-tight text-[11.5px]">
                  Every decision over $1,000 needs you. You live in status meetings. Taking two weeks off feels impossible. <strong className="font-bold text-rose-950">You own a stressful job.</strong>
                </p>
              </div>

              <div className="p-3.5 sm:p-4 bg-[#ffffff] border border-[#ded6c5] rounded-xs space-y-1 text-xs text-[#292524] shadow-2xs">
                <div className="font-bold text-black uppercase tracking-tight">The Sovereign Architect</div>
                <p className="leading-relaxed text-[#57534e] tracking-tight text-[11.5px]">
                  Your team knows your judgment principles and makes the call. You focus on capital and market expansion. <strong className="font-bold text-[#1c1917]">The business governs itself.</strong>
                </p>
              </div>
            </div>

            <div className="pt-1">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-tight text-[#b8860b] hover:text-[#1c1917] transition-colors"
              >
                <span>Explore Our Institutional Advisory Mandates</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Video Player (Clean container, no emojis) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-[360px] bg-[#ffffff] p-2.5 border border-[#ded6c5] rounded-xs shadow-md">
              <VideoPlayer 
                videoUrl="https://drive.google.com/file/d/1435SE1X1AMP7jWn7Dwcqx9JD1kHtov7w/view?usp=drive_link" 
                aspectRatio="portrait"
                title="How We Help Founders Build Self-Running Companies"
                className="shadow-xs"
              />
              <div className="mt-2.5 text-center">
                <span className="text-[11px] font-bold text-black block uppercase tracking-tight">
                  Briefing: The Transition to Sovereign Freedom
                </span>
                <span className="text-[10px] text-[#78716c] block mt-0.5 tracking-tight">
                  Direct personal briefing with Suchita Sancheti
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3.5 Digital Systems & Entry Gateways (Lead Generation Showcase) */}
      <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 border-b border-[#ded6c5] bg-[#ffffff]">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-black text-[#b8860b] text-[9px] font-mono uppercase tracking-widest font-black">
                <Zap className="w-3.5 h-3.5 text-[#b8860b]" /> TURNKEY DIGITAL ARSENAL • EXECUTIVE TOOLKITS
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1c1917] tracking-tight">
                Test Our Systems in 20 Minutes <br />
                <span className="italic font-bold text-[#8c6708]">Before Retaining Our Firm.</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#57534e] leading-relaxed">
                Our bespoke advisory engagements are $25k–$100k+. We packaged the exact operational frameworks into 1-click digital workspaces priced from <strong className="text-black">$27 to $97</strong> so high-growth founders can experience autonomous operations with zero friction.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-start sm:items-center gap-2.5">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-black hover:bg-[#8c6708] text-white text-xs font-bold uppercase tracking-tight rounded-xs transition-all shadow-sm"
              >
                <span>View All 6 Digital Toolkits</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* 3 Featured Sovereign Systems Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* System 1: Asset 00 */}
            <div className="bg-[#faf8f5] border border-[#ded6c5] hover:border-black p-5 rounded-xs flex flex-col justify-between shadow-2xs hover:shadow-md transition-all group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-black text-[#b8860b] text-[9px] font-mono uppercase font-black">
                    ASSET 00 • QUICK START
                  </span>
                  <span className="text-[10px] font-mono text-[#78716c] font-bold">15-Min Deploy</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1c1917] group-hover:text-[#8c6708] transition-colors">
                    The 72-Hour Founder Severance Protocol
                  </h3>
                  <p className="text-xs text-[#57534e] mt-1 leading-relaxed">
                    Binary delegation covenants and spending thresholds under $5,000. Stops your inbox from being the universal bottleneck.
                  </p>
                </div>
                <div className="pt-2 border-t border-[#ded6c5] space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#78716c] uppercase font-bold">Direct Toolkit Rate:</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-black font-mono text-black">$27</span>
                      <span className="text-xs font-mono text-[#a8a29e] line-through">$150</span>
                    </div>
                  </div>
                  <div className="text-[10px] text-[#8c6708] font-bold">Save 82% • Instant Notion Clone</div>
                </div>
              </div>
              <div className="pt-4 mt-2">
                <Link
                  to="/products"
                  className="w-full py-2 px-3 bg-white hover:bg-black hover:text-white text-[#1c1917] text-xs font-bold uppercase tracking-tight border border-[#ded6c5] hover:border-black rounded-xs transition-colors flex items-center justify-between"
                >
                  <span>Explore Asset 00</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* System 2: Asset 01 (Flagship) */}
            <div className="bg-[#ffffff] border-2 border-[#b8860b] p-5 rounded-xs flex flex-col justify-between shadow-md hover:shadow-lg transition-all group relative">
              <div className="absolute -top-3 right-4 px-2 py-0.5 bg-[#8c6708] text-white text-[9px] font-mono uppercase font-black rounded-2xs">
                MOST POPULAR TOOLKIT
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-black text-[#b8860b] text-[9px] font-mono uppercase font-black">
                    ASSET 01 • FLAGSHIP OS
                  </span>
                  <span className="text-[10px] font-mono text-[#78716c] font-bold">35-Min Deploy</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1c1917] group-hover:text-[#8c6708] transition-colors">
                    The 15-Hour Founder Bandwidth Reclamation OS
                  </h3>
                  <p className="text-xs text-[#57534e] mt-1 leading-relaxed">
                    4-Lane Ingress Triage + 30-Day Calendar Guillotine. Claw back 15 hours of strategic focus every single week.
                  </p>
                </div>
                <div className="pt-2 border-t border-[#ded6c5] space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#78716c] uppercase font-bold">Direct Toolkit Rate:</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-black font-mono text-black">$47</span>
                      <span className="text-xs font-mono text-[#a8a29e] line-through">$290</span>
                    </div>
                  </div>
                  <div className="text-[10px] text-[#8c6708] font-bold">Save 84% • Value: $360K/yr Bandwidth</div>
                </div>
              </div>
              <div className="pt-4 mt-2">
                <Link
                  to="/products"
                  className="w-full py-2 px-3 bg-black hover:bg-[#8c6708] text-white text-xs font-bold uppercase tracking-tight rounded-xs transition-colors flex items-center justify-between"
                >
                  <span>Lock In Asset 01 ($47)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Gateway 3: Complete Suite */}
            <div className="bg-[#1c1917] text-white border border-[#b8860b]/50 p-5 rounded-xs flex flex-col justify-between shadow-md hover:shadow-xl transition-all group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-[#b8860b] text-black text-[9px] font-mono uppercase font-black">
                    COMPLETE SUITE (SAVE 86%)
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400 font-bold">All 6 Toolkits</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#b8860b] transition-colors">
                    The Complete Founder Systems Suite
                  </h3>
                  <p className="text-xs text-zinc-300 mt-1 leading-relaxed">
                    All 6 production systems in one pre-connected Master Unified Notion Hub. Complete company-wide license + $590 bonuses.
                  </p>
                </div>
                <div className="pt-2 border-t border-zinc-800 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-zinc-400 uppercase font-bold">Early Bird Suite:</span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-lg font-black font-mono text-[#b8860b]">$197</span>
                      <span className="text-xs font-mono text-zinc-500 line-through">$1,450</span>
                    </div>
                  </div>
                  <div className="text-[10px] text-green-400 font-bold">Save $1,253 • 6 Licenses Left</div>
                </div>
              </div>
              <div className="pt-4 mt-2">
                <Link
                  to="/products"
                  className="w-full py-2 px-3 bg-[#b8860b] hover:bg-white hover:text-black text-black text-xs font-bold uppercase tracking-tight rounded-xs transition-colors flex items-center justify-between"
                >
                  <span>Get Complete Suite ($197)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Free Delegation Magnet Callout */}
          <div className="p-4 sm:p-5 bg-[#faf8f5] border border-[#ded6c5] rounded-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#efebe2] border border-[#b8860b]/40 flex items-center justify-center shrink-0">
                <Gift className="w-4 h-4 text-[#8c6708]" />
              </div>
              <div>
                <span className="font-bold text-[#1c1917] block">Want to start 100% free?</span>
                <span className="text-[#57534e]">Download the 1-Page Founder Delegation Covenant (Instant Notion + PDF).</span>
              </div>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-black hover:bg-[#8c6708] text-white text-xs font-bold uppercase tracking-tight rounded-xs shrink-0 transition-colors"
            >
              <span>Claim Free Download</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

        </div>
      </section>

      {/* 4. Strategic Dispatches (With Fixed Images & Fallback) */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8 border-b border-[#ded6c5] bg-[#f7f4ee]">
        <div className="max-w-6xl mx-auto space-y-6 sm:space-y-7">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div className="space-y-1.5">
              <span className="text-xs uppercase text-[#b8860b] tracking-tight font-bold">
                Intellectual Dispatches
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1c1917] tracking-tight">
                Provocative Insights for <span className="italic font-bold text-[#b8860b]">Sovereign Founders</span>
              </h2>
            </div>
            <Link
              to="/library"
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-tight text-black hover:text-[#b8860b] transition-colors"
            >
              <span>Explore All Dispatches</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            {featuredArticles.map((article) => (
              <Link
                key={article.id}
                to={`/library/${article.slug}`}
                className="bg-[#ffffff] border border-[#ded6c5] hover:border-[#b8860b] rounded-xs overflow-hidden flex flex-col group transition-all shadow-2xs hover:shadow-md"
              >
                <div className="h-40 overflow-hidden relative border-b border-[#ded6c5] bg-[#efebe2]">
                  {!failedImages[article.id] && article.image ? (
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover filter grayscale group-hover:scale-105 transition-transform duration-500"
                      onError={() => setFailedImages(prev => ({ ...prev, [article.id]: true }))}
                    />
                  ) : (
                    /* Fallback Card if image ever fails to load */
                    <div className="w-full h-full flex flex-col items-center justify-center p-5 bg-gradient-to-br from-[#ffffff] to-[#efebe2] text-[#8c6708]">
                      <FileText className="w-8 h-8 mb-1.5 opacity-60" />
                      <span className="text-[11px] font-bold uppercase tracking-tight text-[#1c1917]">{article.category}</span>
                      <span className="text-[10px] text-[#78716c] tracking-tight">TULC Executive Dispatch</span>
                    </div>
                  )}
                  <div className="absolute top-2.5 left-2.5 bg-black text-white px-2 py-0.5 text-[10px] uppercase font-bold shadow-xs">
                    {article.category}
                  </div>
                </div>

                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-2.5">
                  <h3 className="text-base sm:text-lg font-bold text-[#1c1917] group-hover:text-[#b8860b] transition-colors leading-snug tracking-tight">
                    {article.title}
                  </h3>
                  <p className="text-xs text-[#57534e] line-clamp-3 leading-relaxed tracking-tight">
                    {article.excerpt}
                  </p>
                  <div className="pt-2.5 border-t border-[#ded6c5] flex items-center justify-between text-xs text-black group-hover:text-[#b8860b] font-bold uppercase tracking-tight">
                    <span>Read Dispatch</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4.5 Executive & Founder Governance FAQs Section */}
      <FAQ />

      {/* 5. Sovereign Invitation (Clean, High Contrast, Black Button) */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8 bg-[#efebe2]/50">
        <div className="max-w-4xl mx-auto bg-[#ffffff] border border-[#ded6c5] rounded-xs p-6 sm:p-10 text-center space-y-4 sm:space-y-5 shadow-xs">
          <div className="w-10 h-10 rounded-xs bg-black flex items-center justify-center text-[#b8860b] mx-auto shadow-2xs">
            <Compass className="w-5 h-5 text-[#b8860b]" />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1c1917] tracking-tight">
            Ready to Cease Tactical Firefighting and <span className="italic font-bold text-[#b8860b]">Reclaim Your Calendar</span>?
          </h2>

          <p className="text-sm sm:text-base text-[#57534e] max-w-xl mx-auto leading-relaxed tracking-tight">
            Begin with our <strong className="font-bold text-[#1c1917]">Two-Week Tension Test</strong> to discover where key-person dependency is capping your valuation, or initiate a confidential advisory dialogue directly with <strong className="font-bold text-[#b8860b]">Suchita Sancheti</strong>. We partner with ambitious founders, CEOs, and holding chairs scaling sovereign enterprises without operational friction.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
            <Link
              to="/intake"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 bg-black hover:bg-[#b8860b] text-white font-bold text-xs uppercase tracking-tight rounded-xs transition-colors shadow-xs cursor-pointer"
            >
              <span>Request Advisory Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/assessment"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 bg-[#ffffff] hover:bg-black hover:text-white text-[#1c1917] font-semibold text-xs uppercase tracking-tight rounded-xs border border-[#ded6c5] transition-colors cursor-pointer"
            >
              <span>Take The Two-Week Test</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Institutional Internal Linking Matrix */}
      <InternalLinksMatrix currentPath="/" />

    </div>
  );
};

export default Home;
