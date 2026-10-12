import React, { useState } from 'react';
import { 
  ArrowRight, 
  Compass, 
  Clock, 
  ShieldCheck, 
  FileText,
  Layers
} from 'lucide-react';
import { Link } from 'react-router-dom';
import VideoPlayer from '../../components/VideoPlayer';
import { INSTITUTIONAL_ARTICLES } from '../lib/articles';

export const Home: React.FC = () => {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const featuredArticles = INSTITUTIONAL_ARTICLES.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f7f4ee] text-[#1c1917] font-serif selection:bg-black selection:text-white">
      
      {/* 1. Hero Statement Section - Clean, Elegant Spacing, No Sticker, Black Highlights */}
      <section className="relative pt-16 pb-16 sm:pt-20 sm:pb-20 px-4 sm:px-6 lg:px-8 border-b border-[#ded6c5] overflow-hidden">
        {/* Subtle architectural grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#b8860b_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          
          {/* Elite Context Question */}
          <p className="text-xs sm:text-sm uppercase tracking-tight text-[#8c6708] font-bold">
            You scaled a company. <span className="text-[#57534e] italic normal-case font-normal">So why are you still putting out fires?</span>
          </p>

          {/* Main Headline: Exactly as requested */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1c1917] tracking-tighter leading-[1.12]">
            Eliminate Founder Dependency and <br className="hidden sm:inline" />
            <span className="italic font-bold text-[#b8860b]">Reclaim 15+ Hours Weekly.</span>
          </h1>

          {/* Subheadline with Black Background Highlights */}
          <p className="text-base sm:text-lg md:text-xl text-[#57534e] max-w-3xl mx-auto leading-relaxed tracking-tight">
            We help founders build <span className="bg-black text-white px-2.5 py-0.5 rounded-xs font-bold inline-block shadow-xs">companies that run without them in 90 days</span> without <span className="bg-black text-[#b8860b] px-2.5 py-0.5 rounded-xs font-bold inline-block shadow-xs">micromanagement, midnight firefighting, or decision bottlenecks</span>.
          </p>

          {/* Action CTAs - Clean High Contrast */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/assessment"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-black hover:bg-[#b8860b] text-white font-bold text-xs uppercase tracking-tight rounded-xs transition-all shadow-md cursor-pointer"
            >
              <span>Take The Two-Week Test</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="#briefing"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white hover:bg-black hover:text-white text-[#1c1917] font-semibold text-xs uppercase tracking-tight rounded-xs border border-[#ded6c5] transition-all shadow-xs cursor-pointer"
            >
              <span>Watch Founder Briefing</span>
            </a>
          </div>

          {/* 4 Proof Metric Cards Highlighted with Black Background (As Did Earlier) */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="bg-black text-white p-5 border border-[#b8860b]/30 rounded-xs shadow-md flex flex-col justify-between">
              <div className="text-2xl font-bold text-[#b8860b] tracking-tight">15+ Hours</div>
              <div className="text-xs text-zinc-300 mt-1 tracking-tight font-medium"><em className="italic">Wednesday afternoons</em> returned</div>
            </div>
            <div className="bg-black text-white p-5 border border-[#b8860b]/30 rounded-xs shadow-md flex flex-col justify-between">
              <div className="text-2xl font-bold text-[#b8860b] tracking-tight">Zero Dread</div>
              <div className="text-xs text-zinc-300 mt-1 tracking-tight font-medium">No <em className="italic">late-night panics</em> or Slack triage</div>
            </div>
            <div className="bg-black text-white p-5 border border-zinc-800 rounded-xs shadow-md flex flex-col justify-between">
              <div className="text-2xl font-bold text-white tracking-tight">Full Freedom</div>
              <div className="text-xs text-zinc-300 mt-1 tracking-tight font-medium"><strong className="font-bold text-[#b8860b]">14 days away</strong> without operational freeze</div>
            </div>
            <div className="bg-black text-white p-5 border border-[#b8860b]/30 rounded-xs shadow-md flex flex-col justify-between">
              <div className="text-2xl font-bold text-[#b8860b] tracking-tight">3 Partners</div>
              <div className="text-xs text-zinc-300 mt-1 tracking-tight font-medium"><strong className="font-bold text-white">Artisan limit</strong> per quarterly intake</div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. THE 4 IMPORTANT THINGS (Drawn in 4 Distinct Boxes, No Distance Between Alphabets) */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-[#ded6c5] bg-[#ffffff]">
        <div className="max-w-6xl mx-auto space-y-10">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs uppercase tracking-tight text-[#b8860b] font-bold">
              The Architecture of Independence
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1c1917] tracking-tight">
              4 Structural Pillars of a <span className="italic font-bold text-[#b8860b]">Self-Governing Company</span>
            </h2>
            <p className="text-sm text-[#57534e] tracking-tight">
              Everything required to transition from founder-dependent firefighting to sovereign, compounding enterprise value.
            </p>
          </div>

          {/* 4 Distinct Boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Box 1 */}
            <div className="bg-[#faf8f5] hover:bg-[#ffffff] border-2 border-[#ded6c5] hover:border-black transition-all p-6 rounded-xs flex flex-col justify-between shadow-xs hover:shadow-md group relative">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="bg-black text-[#b8860b] px-2.5 py-1 text-[10px] font-bold uppercase rounded-xs tracking-tight">
                    01 // Diagnostic
                  </span>
                  <div className="w-8 h-8 rounded-xs bg-[#efebe2] border border-[#ded6c5] flex items-center justify-center text-[#b8860b]">
                    <Clock className="w-4 h-4 text-[#b8860b]" />
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-[#1c1917] tracking-tight group-hover:text-[#b8860b] transition-colors">
                  The Two-Week Tension Test
                </h3>
                
                <p className="text-xs text-[#57534e] leading-relaxed tracking-tight">
                  A rapid diagnostic isolating what breaks or freezes if you turn your phone off for <strong className="text-[#1c1917] font-semibold">14 consecutive days</strong>. Pinpoints the exact 3 bottlenecks consuming <em className="italic text-[#8c6708]">80% of your energy</em>.
                </p>

                <div className="pt-2 border-t border-[#ded6c5] text-[11px] text-[#78716c] tracking-tight">
                  <span className="bg-black text-white px-1.5 py-0.5 rounded-xs font-semibold inline-block mr-1">Result:</span> Instant visibility into single-point founder risks.
                </div>
              </div>

              <div className="pt-6">
                <Link
                  to="/assessment"
                  className="w-full inline-flex items-center justify-between px-4 py-2.5 bg-black hover:bg-[#b8860b] text-white text-xs font-bold uppercase tracking-tight rounded-xs transition-all shadow-xs"
                >
                  <span>Run Tension Scan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Box 2 */}
            <div className="bg-[#faf8f5] hover:bg-[#ffffff] border-2 border-[#ded6c5] hover:border-black transition-all p-6 rounded-xs flex flex-col justify-between shadow-xs hover:shadow-md group relative">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="bg-black text-[#b8860b] px-2.5 py-1 text-[10px] font-bold uppercase rounded-xs tracking-tight">
                    02 // Synthesis
                  </span>
                  <div className="w-8 h-8 rounded-xs bg-[#efebe2] border border-[#ded6c5] flex items-center justify-center text-[#b8860b]">
                    <Layers className="w-4 h-4 text-[#b8860b]" />
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-[#1c1917] tracking-tight group-hover:text-[#b8860b] transition-colors">
                  Decision Rule Codification
                </h3>
                
                <p className="text-xs text-[#57534e] leading-relaxed tracking-tight">
                  Translates unwritten founder judgment into <strong className="text-[#1c1917] font-semibold">self-executing operational criteria</strong>, autonomous spending boundaries, and explicit escalation guardrails for your leadership team.
                </p>

                <div className="pt-2 border-t border-[#ded6c5] text-[11px] text-[#78716c] tracking-tight">
                  <span className="bg-black text-white px-1.5 py-0.5 rounded-xs font-semibold inline-block mr-1">Result:</span> Senior staff decides with 100% of your fidelity.
                </div>
              </div>

              <div className="pt-6">
                <Link
                  to="/methodology"
                  className="w-full inline-flex items-center justify-between px-4 py-2.5 bg-black hover:bg-[#b8860b] text-white text-xs font-bold uppercase tracking-tight rounded-xs transition-all shadow-xs"
                >
                  <span>Explore Methodology</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Box 3 */}
            <div className="bg-[#faf8f5] hover:bg-[#ffffff] border-2 border-[#ded6c5] hover:border-black transition-all p-6 rounded-xs flex flex-col justify-between shadow-xs hover:shadow-md group relative">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="bg-black text-[#b8860b] px-2.5 py-1 text-[10px] font-bold uppercase rounded-xs tracking-tight">
                    03 // Decoupling
                  </span>
                  <div className="w-8 h-8 rounded-xs bg-[#efebe2] border border-[#ded6c5] flex items-center justify-center text-[#b8860b]">
                    <ShieldCheck className="w-4 h-4 text-[#b8860b]" />
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-[#1c1917] tracking-tight group-hover:text-[#b8860b] transition-colors">
                  90-Day Sovereign Transformation
                </h3>
                
                <p className="text-xs text-[#57534e] leading-relaxed tracking-tight">
                  Installs 12+ permanent execution guardrails across finance, hiring, and delivery. Eradicates <strong className="text-[#1c1917] font-semibold">micromanagement, midnight fires, and meeting drag</strong> so you reclaim 15+ hours weekly.
                </p>

                <div className="pt-2 border-t border-[#ded6c5] text-[11px] text-[#78716c] tracking-tight">
                  <span className="bg-black text-white px-1.5 py-0.5 rounded-xs font-semibold inline-block mr-1">Result:</span> Operations compound smoothly on autopilot.
                </div>
              </div>

              <div className="pt-6">
                <Link
                  to="/services"
                  className="w-full inline-flex items-center justify-between px-4 py-2.5 bg-black hover:bg-[#b8860b] text-white text-xs font-bold uppercase tracking-tight rounded-xs transition-all shadow-xs"
                >
                  <span>Explore Services</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Box 4 */}
            <div className="bg-[#faf8f5] hover:bg-[#ffffff] border-2 border-[#ded6c5] hover:border-black transition-all p-6 rounded-xs flex flex-col justify-between shadow-xs hover:shadow-md group relative">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="bg-black text-[#b8860b] px-2.5 py-1 text-[10px] font-bold uppercase rounded-xs tracking-tight">
                    04 // Advisory
                  </span>
                  <div className="w-8 h-8 rounded-xs bg-[#efebe2] border border-[#ded6c5] flex items-center justify-center text-[#b8860b]">
                    <Compass className="w-4 h-4 text-[#b8860b]" />
                  </div>
                </div>
                
                <h3 className="text-lg font-bold text-[#1c1917] tracking-tight group-hover:text-[#b8860b] transition-colors">
                  Quarterly Artisan Advisory
                </h3>
                
                <p className="text-xs text-[#57534e] leading-relaxed tracking-tight">
                  Confidential, 1-on-1 institutional alignment conducted personally by <strong className="text-[#1c1917] font-semibold">Suchita Sancheti</strong>. Strictly limited to <em className="italic text-[#8c6708]">3 founders per quarter</em> for uncompromising depth.
                </p>

                <div className="pt-2 border-t border-[#ded6c5] text-[11px] text-[#78716c] tracking-tight">
                  <span className="bg-black text-white px-1.5 py-0.5 rounded-xs font-semibold inline-block mr-1">Result:</span> Bespoke governance without junior handoffs.
                </div>
              </div>

              <div className="pt-6">
                <Link
                  to="/intake"
                  className="w-full inline-flex items-center justify-between px-4 py-2.5 bg-black hover:bg-[#b8860b] text-white text-xs font-bold uppercase tracking-tight rounded-xs transition-all shadow-xs"
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
      <section id="briefing" className="py-20 px-4 sm:px-6 lg:px-8 border-b border-[#ded6c5] bg-[#efebe2]/60">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs uppercase text-[#b8860b] tracking-tight font-bold">
              The Founder's Private Misery
            </span>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1c1917] leading-tight tracking-tight">
              When You Grow Without Systems, <br />
              <span className="italic font-bold text-[#b8860b]">You Just Scale Your Personal Exhaustion.</span>
            </h2>
            
            <p className="text-base text-[#57534e] leading-relaxed tracking-tight">
              You hired exceptional people. You pay competitive compensation. You run weekly strategic alignments. Yet somehow, <strong className="font-bold text-[#1c1917]">every high-friction choice still lands on your desk at 8:00 PM</strong>.
            </p>
            
            <p className="text-base text-[#57534e] leading-relaxed tracking-tight">
              You catch yourself thinking: <em className="text-[#8c6708] font-bold">"Why must every decision flow through my desk? Why does scale feel heavier instead of lighter?"</em>
            </p>

            {/* Rephrased Elite Tone Quote */}
            <div className="p-5 bg-[#ffffff] border-l-4 border-black rounded-r-xs space-y-2 shadow-xs">
              <p className="text-sm text-[#292524] leading-relaxed tracking-tight">
                "There are two kinds of founders. The first believes suffering is proof of competence—wearing 14-hour days and midnight messages like badges of honor. The second realizes that if the business freezes without them, they don't own an asset; they own an exhausting job. <strong className="font-bold text-[#1c1917]">Sovereign leaders engineer self-governing architecture</strong> that <em className="italic font-semibold text-[#b8860b]">guarantees lasting institutional freedom</em>."
              </p>
            </div>

            {/* The Two Operating Realities */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 bg-rose-50 border border-rose-200 rounded-xs space-y-1.5 text-xs text-rose-950">
                <div className="font-bold text-rose-800 uppercase tracking-tight">The Exhausted Hero</div>
                <p className="leading-relaxed text-rose-900/80 tracking-tight">
                  Every decision over $1,000 needs you. You live in status meetings. Taking two weeks off feels impossible. <strong className="font-bold text-rose-950">You own a stressful job.</strong>
                </p>
              </div>

              <div className="p-5 bg-[#ffffff] border border-black/40 rounded-xs space-y-1.5 text-xs text-[#292524] shadow-xs">
                <div className="font-bold text-black uppercase tracking-tight">The Sovereign Architect</div>
                <p className="leading-relaxed text-[#57534e] tracking-tight">
                  Your team knows your judgment principles and makes the call. You focus on capital and market expansion. <strong className="font-bold text-[#1c1917]">The business governs itself.</strong>
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-tight text-[#b8860b] hover:text-[#1c1917] transition-colors"
              >
                <span>Explore How We Partner With 3 Founders Per Quarter</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Video Player (Clean container, no emojis) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-[380px] bg-[#ffffff] p-3 border border-black/20 rounded-xs shadow-md">
              <VideoPlayer 
                videoUrl="https://drive.google.com/file/d/1435SE1X1AMP7jWn7Dwcqx9JD1kHtov7w/view?usp=drive_link" 
                aspectRatio="portrait"
                title="How We Help Founders Build Self-Running Companies"
                className="shadow-sm"
              />
              <div className="mt-3 text-center">
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

      {/* 4. Strategic Dispatches (With Fixed Images & Fallback) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-[#ded6c5] bg-[#f7f4ee]">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs uppercase text-[#b8860b] tracking-tight font-bold">
                Intellectual Dispatches
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1c1917] tracking-tight">
                Provocative Insights for <span className="italic font-bold text-[#b8860b]">Sovereign Founders</span>
              </h2>
            </div>
            <Link
              to="/library"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-tight text-black hover:text-[#b8860b] transition-colors"
            >
              <span>Explore All Dispatches</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArticles.map((article) => (
              <Link
                key={article.id}
                to={`/library/${article.slug}`}
                className="bg-[#ffffff] border border-[#ded6c5] hover:border-black rounded-xs overflow-hidden flex flex-col group transition-all shadow-xs hover:shadow-md"
              >
                <div className="h-44 overflow-hidden relative border-b border-[#ded6c5] bg-[#efebe2]">
                  {!failedImages[article.id] && article.image ? (
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover filter grayscale group-hover:scale-105 transition-transform duration-500"
                      onError={() => setFailedImages(prev => ({ ...prev, [article.id]: true }))}
                    />
                  ) : (
                    /* Fallback Card if image ever fails to load */
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#ffffff] to-[#efebe2] text-[#8c6708]">
                      <FileText className="w-10 h-10 mb-2 opacity-60" />
                      <span className="text-[11px] font-bold uppercase tracking-tight text-[#1c1917]">{article.category}</span>
                      <span className="text-[10px] text-[#78716c] tracking-tight">TULC Executive Dispatch</span>
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-black text-white px-2.5 py-0.5 text-[10px] uppercase font-bold shadow-xs">
                    {article.category}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  <h3 className="text-lg font-bold text-[#1c1917] group-hover:text-[#b8860b] transition-colors leading-snug tracking-tight">
                    {article.title}
                  </h3>
                  <p className="text-xs text-[#57534e] line-clamp-3 leading-relaxed tracking-tight">
                    {article.excerpt}
                  </p>
                  <div className="pt-3 border-t border-[#ded6c5] flex items-center justify-between text-xs text-black group-hover:text-[#b8860b] font-bold uppercase tracking-tight">
                    <span>Read Dispatch</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Sovereign Invitation (Clean, High Contrast, Black Button) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#efebe2]/50">
        <div className="max-w-4xl mx-auto bg-[#ffffff] border-2 border-[#ded6c5] rounded-xs p-8 sm:p-14 text-center space-y-6 shadow-sm">
          <div className="w-12 h-12 rounded-xs bg-black flex items-center justify-center text-[#b8860b] mx-auto shadow-sm">
            <Compass className="w-6 h-6 text-[#b8860b]" />
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-[#1c1917] tracking-tight">
            Ready to Cease Tactical Firefighting and <span className="italic font-bold text-[#b8860b]">Reclaim Your Calendar</span>?
          </h2>

          <p className="text-base text-[#57534e] max-w-xl mx-auto leading-relaxed tracking-tight">
            Begin with our <strong className="font-bold text-[#1c1917]">Two-Week Tension Test</strong> to discover where key-person dependency is capping your valuation, or initiate a confidential advisory dialogue directly with <strong className="font-bold text-[#b8860b]">Suchita Sancheti</strong>. We partner with <em className="italic text-[#8c6708]">only three founders per quarter</em>.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/intake"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-black hover:bg-[#b8860b] text-white font-bold text-xs uppercase tracking-tight rounded-xs transition-colors shadow-sm cursor-pointer"
            >
              <span>Request Advisory Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/assessment"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#ffffff] hover:bg-black hover:text-white text-[#1c1917] font-semibold text-xs uppercase tracking-tight rounded-xs border border-[#ded6c5] transition-colors cursor-pointer"
            >
              <span>Take The Two-Week Test</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
