import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  XCircle, 
  CheckCircle2, 
  ArrowRight, 
  Compass, 
  Layers, 
  Sliders, 
  FileSpreadsheet, 
  ShieldCheck, 
  Clock, 
  Zap,
  Building,
  Target
} from 'lucide-react';

export const WhatWeDo: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="py-10 sm:py-14 bg-[#ecece6] border-y border-zinc-300/80 text-[#111111] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-10">
        
        {/* Section Header: The 30-Second Gist */}
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 bg-white border border-zinc-300 rounded-full text-[9px] sm:text-[10px] font-mono uppercase tracking-widest font-black text-[#b8860b] shadow-2xs">
            <Compass className="w-3.5 h-3.5" />
            <span>The 30-Second Clarification</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-serif tracking-tight text-[#111111] leading-tight">
            What We Actually Do <br className="hidden sm:inline" />
            <span className="font-light italic text-zinc-700 font-sans text-lg sm:text-xl md:text-2xl block mt-1">
              (And Why It Replaces Both Generic Coaching & Big Consulting)
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed font-normal">
            Most companies with $10M–$100M+ in revenue stall because the CEO remains the chief problem solver and escalation desk. 
            We install <strong>self-executing management systems</strong> that translate founder judgment into team autonomy—reclaiming 15+ hours of executive focus every week.
          </p>
        </div>

        {/* 3-Column Contrast Matrix: "What We Are NOT" vs "What We ARE" */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Card 1: Not Coaching vs Operational Architecture */}
          <div className="bg-white border border-zinc-300 rounded-xs p-6 sm:p-7 shadow-xs flex flex-col justify-between hover:border-[#b8860b]/60 transition-colors">
            <div className="space-y-4">
              {/* Not This */}
              <div className="pb-3 border-b border-zinc-200">
                <div className="flex items-center gap-2 text-rose-700 text-[10px] font-mono uppercase font-black mb-1.5">
                  <XCircle className="w-4 h-4 shrink-0" />
                  <span>NOT A Coaching Service</span>
                </div>
                <ul className="text-xs text-zinc-600 space-y-1 list-disc list-inside">
                  <li>No motivational pep-talks or vague advice</li>
                  <li>No personality quizzes or open-ended journaling</li>
                  <li>Leaves operational fires burning on Monday</li>
                </ul>
              </div>

              {/* But This */}
              <div>
                <div className="flex items-center gap-2 text-emerald-800 text-[10px] font-mono uppercase font-black mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>WE ARE Systems Engineers</span>
                </div>
                <ul className="text-xs text-zinc-900 font-medium space-y-1 list-disc list-inside">
                  <li>Concrete decision boundaries & delegation rules</li>
                  <li>Meeting hygiene filters eliminating 10+ hrs/wk</li>
                  <li>Permanent accountability gates built into your team</li>
                </ul>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-zinc-100 flex items-center gap-2 text-[10px] font-mono text-zinc-500 uppercase font-bold">
              <Zap className="w-3.5 h-3.5 text-[#b8860b]" />
              <span>Yield: Zero-delay team execution</span>
            </div>
          </div>

          {/* Card 2: Not 200-Slide Reports vs 90-Day Implementation */}
          <div className="bg-white border border-zinc-300 rounded-xs p-6 sm:p-7 shadow-xs flex flex-col justify-between hover:border-[#b8860b]/60 transition-colors">
            <div className="space-y-4">
              {/* Not This */}
              <div className="pb-3 border-b border-zinc-200">
                <div className="flex items-center gap-2 text-rose-700 text-[10px] font-mono uppercase font-black mb-1.5">
                  <XCircle className="w-4 h-4 shrink-0" />
                  <span>NOT Big Agency Slides</span>
                </div>
                <ul className="text-xs text-zinc-600 space-y-1 list-disc list-inside">
                  <li>No 200-page theoretical decks from junior analysts</li>
                  <li>No reports that sit on a drive gathering dust</li>
                  <li>No academic theories disconnected from real ops</li>
                </ul>
              </div>

              {/* But This */}
              <div>
                <div className="flex items-center gap-2 text-emerald-800 text-[10px] font-mono uppercase font-black mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>WE ARE 90-Day Implementers</span>
                </div>
                <ul className="text-xs text-zinc-900 font-medium space-y-1 list-disc list-inside">
                  <li>Hands-on sprint embedded directly with the CEO</li>
                  <li>Co-design, install & stress-test the operating OS</li>
                  <li>Guaranteed run-state that passes the step-away test</li>
                </ul>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-zinc-100 flex items-center gap-2 text-[10px] font-mono text-zinc-500 uppercase font-bold">
              <Clock className="w-3.5 h-3.5 text-[#b8860b]" />
              <span>Yield: 90-Day Complete Turnaround</span>
            </div>
          </div>

          {/* Card 3: Not Complex Software vs Codified Founder Judgment */}
          <div className="bg-white border border-zinc-300 rounded-xs p-6 sm:p-7 shadow-xs flex flex-col justify-between hover:border-[#b8860b]/60 transition-colors">
            <div className="space-y-4">
              {/* Not This */}
              <div className="pb-3 border-b border-zinc-200">
                <div className="flex items-center gap-2 text-rose-700 text-[10px] font-mono uppercase font-black mb-1.5">
                  <XCircle className="w-4 h-4 shrink-0" />
                  <span>NOT Another SaaS App</span>
                </div>
                <ul className="text-xs text-zinc-600 space-y-1 list-disc list-inside">
                  <li>No bloated project software to configure</li>
                  <li>No login fatigue or confusing new tool adoption</li>
                  <li>No extra Slack notifications or notification spam</li>
                </ul>
              </div>

              {/* But This */}
              <div>
                <div className="flex items-center gap-2 text-emerald-800 text-[10px] font-mono uppercase font-black mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>WE ARE Codified Founder Judgment</span>
                </div>
                <ul className="text-xs text-zinc-900 font-medium space-y-1 list-disc list-inside">
                  <li>Codifies your exact risk thresholds into protocols</li>
                  <li>Middle management makes million-dollar calls safely</li>
                  <li>Kills the "founder must approve everything" bottleneck</li>
                </ul>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-zinc-100 flex items-center gap-2 text-[10px] font-mono text-zinc-500 uppercase font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#b8860b]" />
              <span>Yield: Key-person risk eradicated</span>
            </div>
          </div>

        </div>

        {/* 3 Clear Engagement Tracks */}
        <div className="pt-6">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <div className="text-[10px] font-mono uppercase font-black text-[#b8860b] tracking-widest">
              How To Work With Us
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#111111]">
              Three Defined Tracks For Every Stage of Scale
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600">
              Whether you need high-touch advisory, an executive diagnostic, or instant turnkey templates, select your lane below.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 items-stretch">
            
            {/* Track 1: Advisory Mandate */}
            <div className="bg-[#111111] text-white p-7 rounded-xs border border-[#b8860b]/50 shadow-xl flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 px-3 py-1 bg-[#b8860b] text-[#111111] text-[8px] font-mono uppercase font-black">
                High-Touch Flagship
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#b8860b] text-[10px] font-mono uppercase font-bold">
                  <Building className="w-4 h-4" />
                  <span>01. Bespoke Advisory</span>
                </div>
                <h4 className="text-xl font-bold font-serif text-white">
                  The 90-Day Sovereign Mandate
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed font-light">
                  A hands-on implementation sprint for CEOs and founders ($10M–$100M+). We embed with your executive team to rebuild your operating rhythm, eliminate bottlenecking, and pass the 30-day step-away test.
                </p>
                <div className="pt-2 space-y-2 text-[10px] font-mono text-zinc-400">
                  <div className="flex items-center gap-2">
                    <span className="text-[#b8860b]">✓</span> Complete 10-Node Diagnostic & Custom OS
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#b8860b]">✓</span> Weekly Executive Sparring & Board Support
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#b8860b]">✓</span> Limited to 3 client mandates per quarter
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10">
                <a
                  href="https://calendly.com/d/d3jb-kpx-r6q"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-[#b8860b] hover:bg-white hover:text-black text-[#111111] text-[10px] font-mono uppercase font-black tracking-wider transition-all flex items-center justify-center gap-2 rounded-2xs font-bold"
                >
                  <span>Book Private Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Track 2: Diagnostic Audit */}
            <div className="bg-white p-7 rounded-xs border border-zinc-300 shadow-sm flex flex-col justify-between relative group hover:border-[#b8860b] transition-colors">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#b8860b] text-[10px] font-mono uppercase font-bold">
                  <Target className="w-4 h-4" />
                  <span>02. Executive Diagnostic</span>
                </div>
                <h4 className="text-xl font-bold font-serif text-[#111111]">
                  The 3-Minute Bandwidth Audit
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                  Evaluate your organization across the 5 Sovereign Domains. Pinpoint exactly how many hours per week and how much equity are leaking through coordination drag and reactive escalations.
                </p>
                <div className="pt-2 space-y-2 text-[10px] font-mono text-zinc-600">
                  <div className="flex items-center gap-2">
                    <span className="text-[#b8860b]">✓</span> 10-node friction assessment
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#b8860b]">✓</span> Instant Cognitive Tax calculation
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#b8860b]">✓</span> Personalized executive roadmap
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-zinc-200">
                <button
                  type="button"
                  onClick={() => navigate('/assessment')}
                  className="w-full py-3 px-4 bg-[#111111] hover:bg-[#b8860b] text-white text-[10px] font-mono uppercase font-black tracking-wider transition-all flex items-center justify-center gap-2 rounded-2xs cursor-pointer font-bold"
                >
                  <span>Start Free Audit (3 Mins)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Track 3: Digital Toolkits / Shop */}
            <div className="bg-white p-7 rounded-xs border border-zinc-300 shadow-sm flex flex-col justify-between relative group hover:border-[#b8860b] transition-colors">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-[#b8860b] text-[10px] font-mono uppercase font-bold">
                  <Layers className="w-4 h-4" />
                  <span>03. Digital Founder Toolkits</span>
                </div>
                <h4 className="text-xl font-bold font-serif text-[#111111]">
                  Turnkey Leadership Toolkits
                </h4>
                <p className="text-xs text-zinc-600 leading-relaxed font-normal">
                  Battle-tested, ready-to-deploy Notion workspaces, delegation matrices, async communication protocols, and board governance operating assets designed for immediate implementation.
                </p>
                <div className="pt-2 space-y-2 text-[10px] font-mono text-zinc-600">
                  <div className="flex items-center gap-2">
                    <span className="text-[#b8860b]">✓</span> Instant 1-click workspace duplicates
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#b8860b]">✓</span> Pre-built delegation and escalation rules
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#b8860b]">✓</span> Early bird allocations currently active
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-zinc-200">
                <button
                  type="button"
                  onClick={() => navigate('/toolkits')}
                  className="w-full py-3 px-4 bg-white border border-zinc-400 hover:border-[#b8860b] hover:text-[#b8860b] text-[#111111] text-[10px] font-mono uppercase font-black tracking-wider transition-all flex items-center justify-center gap-2 rounded-2xs cursor-pointer font-bold"
                >
                  <span>Explore Founder Toolkits</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

          {/* Quick Internal Navigation Strip */}
          <div className="mt-8 bg-white border border-zinc-300 p-3 sm:p-4 rounded-xs flex flex-wrap items-center justify-between gap-3 text-xs font-mono shadow-2xs">
            <span className="text-zinc-600 uppercase font-semibold text-[10px]">
              Explore Complete Institutional Architecture:
            </span>
            <div className="flex flex-wrap items-center gap-2 text-[10px]">
              <button onClick={() => navigate('/services')} className="px-2.5 py-1 bg-zinc-50 border border-zinc-200 hover:border-[#b8860b] text-zinc-800 transition-colors rounded-2xs font-bold cursor-pointer">
                Sovereign Retainer & Services →
              </button>
              <button onClick={() => navigate('/methodology')} className="px-2.5 py-1 bg-zinc-50 border border-zinc-200 hover:border-[#b8860b] text-zinc-800 transition-colors rounded-2xs font-bold cursor-pointer">
                How It Works (90-Day OS) →
              </button>
              <button onClick={() => navigate('/mandates')} className="px-2.5 py-1 bg-zinc-50 border border-zinc-200 hover:border-[#b8860b] text-zinc-800 transition-colors rounded-2xs font-bold cursor-pointer">
                Strategic Mandates →
              </button>
              <button onClick={() => navigate('/cognitive-tax')} className="px-2.5 py-1 bg-zinc-50 border border-zinc-200 hover:border-[#b8860b] text-zinc-800 transition-colors rounded-2xs font-bold cursor-pointer">
                Cognitive Tax Calculator →
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhatWeDo;
