import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calculator, FileText, Layers, Shield } from 'lucide-react';
import { Mail, Phone, Instagram, Linkedin } from '../../components/BrandIcons.tsx';
import BrandLogo from '../../components/BrandLogo.tsx';
import WhoWeBuildFor from '../../components/WhoWeBuildFor.tsx';
import ScaleEvidence from '../../components/ScaleEvidence.tsx';
import ImpactLedger from '../../components/ImpactLedger.tsx';

interface AboutProps {
  onBriefClick: (id?: string) => void;
}

const About: React.FC<AboutProps> = ({ onBriefClick }) => {
  // JSON-LD structured data for GEO/AEO/SEO index optimization
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "Suchita Sancheti",
      "jobTitle": "Principal Architect & Founder",
      "worksFor": {
        "@type": "Organization",
        "name": "The Unbounded Leadership Co."
      },
      "description": "Enterprise architect, computer science engineer, and industrial psychologist reducing corporate decision delays by 40% in 90 days for global CEOs and founders.",
      "knowsAbout": [
        "Enterprise Architecture",
        "Industrial Psychology",
        "SAP Consulting",
        "Cognitive Bandwidth Optimization",
        "Executive Alignment",
        "Strategic Intent Architecture"
      ],
      "url": "https://theunboundedleadership.com/about",
      "sameAs": [
        "https://www.linkedin.com/company/theunboundedleadership",
        "https://www.instagram.com/transformingleadership",
        "https://www.f6s.com/member/suchita-sancheti"
      ]
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-[#f5f5f0] min-h-screen pt-6 md:pt-16 pb-20"
    >
      {/* Structured Schema Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-6">

        {/* ------------------------------------------------------------- */}
        {/* PHASE 1: TALK ABOUT THEM FIRST — THE CLIENT REALITY & PAIN    */}
        {/* ------------------------------------------------------------- */}
        <section className="mb-20">
          
          {/* Header Tagline & Brand Badge */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6 border-b border-zinc-200 pb-8">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-px bg-[#b8860b]" />
                <span className="text-[#b8860b] text-[10px] font-black uppercase ">The Executive Reality</span>
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#111111] leading-snug max-w-3xl font-serif">
                You Engineered a High-Growth Enterprise. <br />
                <span className="italic text-[#b8860b] font-light">So Why Does Execution Still Depend on Your Continuous Intervention?</span>
              </h1>
            </div>
            
            <div className="shrink-0">
              <BrandLogo size="sm" variant="full" theme="dark" className="w-48 md:w-56" />
            </div>
          </div>

          {/* Psychological Hook & Core Dilemma */}
          <div className="grid lg:grid-cols-12 gap-8 items-stretch mb-12">
            
            {/* The Main Narrative Hook Card */}
            <div className="lg:col-span-7 bg-[#111111] text-white p-8 md:p-12 border border-[#b8860b]/30 relative overflow-hidden flex flex-col justify-between shadow-2xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#b8860b]/10 blur-3xl rounded-full pointer-events-none" />
              
              <div className="relative z-10 space-y-6">
                <span className="text-[#b8860b] text-[9px] font-mono uppercase block">Diagnostic Observation</span>
                <h2 className="text-2xl md:text-3xl font-serif font-light text-zinc-100 leading-snug">
                  "The bigger your organization grows, the heavier the bottleneck feels. You hired top-tier directors, yet every high-stakes decision still lands on your desk."
                </h2>
                <p className="text-zinc-400 text-sm leading-relaxed font-light italic">
                  This isn't a leadership failing. It is a structural design flaw. When strategic intent is kept inside the founder's mind rather than hardcoded into organizational logic, every growth tier dilutes your execution velocity.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span className="text-[#b8860b]">01 / Operational Bottlenecking</span>
                <span>40%+ Executive Time Wasted</span>
              </div>
            </div>

            {/* Side Callout — The 4 Silent Revenue & Bandwidth Leaks */}
            <div className="lg:col-span-5 bg-white p-8 border border-zinc-200/80 shadow-md flex flex-col justify-between space-y-6">
              <div>
                <span className="text-zinc-400 text-[10px] font-mono uppercase block mb-2">The Hidden Corporate Tax</span>
                <h3 className="text-xl font-bold text-[#111111] mb-4">Where Your Enterprise Is Losing Velocity:</h3>
                
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-xs text-zinc-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#b8860b] mt-1.5 shrink-0" />
                    <div>
                      <strong className="text-zinc-900 block font-semibold">Strategic Intent Dilution:</strong>
                      <span className="text-zinc-600 italic">Up to 15% reasoning loss per management layer.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 text-xs text-zinc-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#b8860b] mt-1.5 shrink-0" />
                    <div>
                      <strong className="text-zinc-900 block font-semibold">Consensus & Alignment Drag:</strong>
                      <span className="text-zinc-600 italic">Endless meetings where directors seek permission instead of driving outcomes.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 text-xs text-zinc-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#b8860b] mt-1.5 shrink-0" />
                    <div>
                      <strong className="text-zinc-900 block font-semibold">Founder Isolation:</strong>
                      <span className="text-zinc-600 italic">Carrying the cognitive load of 500 decisions alone, risking burn-out and strategic drift.</span>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase text-zinc-400">Impact: Delayed Execution</span>
                <button 
                  onClick={() => onBriefClick('assessment')}
                  className="text-[10px] font-black uppercase text-[#b8860b] hover:text-[#111111] transition-colors flex items-center gap-1.5"
                >
                  Request Alignment Audit <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* 4 PROBLEM AGITATION CARDS — Mirroring the Client's Unspoken Frustrations */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 border border-zinc-200/80 shadow-sm hover:border-[#b8860b]/50 transition-all duration-300">
              <div className="text-[#b8860b] font-mono text-xs font-bold mb-3">PROBLEM 01</div>
              <h4 className="font-bold text-[#111111] text-base mb-2">The Firefighter's Trap</h4>
              <p className="text-zinc-600 text-xs leading-relaxed italic font-light">
                You spend 40% of your week resolving operational friction between executives rather than compounding your next strategic advantage.
              </p>
            </div>

            <div className="bg-white p-6 border border-zinc-200/80 shadow-sm hover:border-[#b8860b]/50 transition-all duration-300">
              <div className="text-[#b8860b] font-mono text-xs font-bold mb-3">PROBLEM 02</div>
              <h4 className="font-bold text-[#111111] text-base mb-2">Friction at the Frontline</h4>
              <p className="text-zinc-600 text-xs leading-relaxed italic font-light">
                Your vision is crystal clear in the boardroom, but by the time it reaches frontline teams, it degrades into confused, fragmented activity.
              </p>
            </div>

            <div className="bg-white p-6 border border-zinc-200/80 shadow-sm hover:border-[#b8860b]/50 transition-all duration-300">
              <div className="text-[#b8860b] font-mono text-xs font-bold mb-3">PROBLEM 03</div>
              <h4 className="font-bold text-[#111111] text-base mb-2">The Execution Gap</h4>
              <p className="text-zinc-600 text-xs leading-relaxed italic font-light">
                Strategic plans were formulated, yet without self-executing operational guardrails and execution protocols, intent struggled to translate to frontline execution.
              </p>
            </div>

            <div className="bg-white p-6 border border-zinc-200/80 shadow-sm hover:border-[#b8860b]/50 transition-all duration-300">
              <div className="text-[#b8860b] font-mono text-xs font-bold mb-3">PROBLEM 04</div>
              <h4 className="font-bold text-[#111111] text-base mb-2">Key-Person Risk</h4>
              <p className="text-zinc-600 text-xs leading-relaxed italic font-light">
                If you step away for 30 days, momentum slows down or halts completely because decision authority remains centralized.
              </p>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------- */}
        {/* PHASE 2: THE PARADIGM SHIFT & GUARANTEE BANNER                */}
        {/* ------------------------------------------------------------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[#111111] text-white p-8 md:p-12 mb-20 border border-[#b8860b]/30 relative overflow-hidden flex flex-col justify-center rounded-sm shadow-2xl"
        >
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#b8860b]/10 to-transparent pointer-events-none" />
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <span className="text-[#b8860b] text-[9px] font-black uppercase block mb-3 font-mono">The Institutional Mandate</span>
            <p className="text-[#f5f5f0] text-2xl md:text-3xl leading-snug font-serif font-light italic mb-4">
              "We help enterprise founders reduce decision delays by <span className="text-[#b8860b] font-bold not-italic font-sans">40%</span> in <span className="text-[#b8860b] font-bold not-italic font-sans">90 days</span> without compromising strategic precision, endless personal intervention, or coordination drag."
            </p>
            <div className="h-px w-24 bg-[#b8860b]/50 mx-auto my-4"></div>
            <p className="text-zinc-400 text-xs uppercase font-mono">
              Not motivational coaching. Concrete, high-fidelity enterprise alignment architecture.
            </p>
          </div>
        </motion.div>

        {/* ------------------------------------------------------------- */}
        {/* PHASE 3: NOW INTRODUCE ME / THE FIRM (THE ARCHITECT SOLUTION) */}
        {/* ------------------------------------------------------------- */}
        <section className="mb-24">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-[#b8860b]" />
            <span className="text-[#b8860b] text-[10px] font-black uppercase ">The Principal Architect & Firm</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#111111] mb-12 font-serif">
            Why You Need an Enterprise Architect, <br />
            <span className="italic text-[#b8860b] font-light">Not Another Executive Coach.</span>
          </h2>

          <div className="grid md:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Portrait Photo & Credentials (Left Column) */}
            <div className="md:col-span-5 space-y-8">
              <div className="flex flex-col items-center bg-white p-8 border border-zinc-200/80 shadow-md">
                {/* Portrait Image - Perfect Full-Picture Frame */}
                <div className="shrink-0 w-full max-w-[340px] aspect-[4/5] bg-zinc-900 border-2 border-[#b8860b] relative rounded-xs overflow-hidden shadow-xl group transition-all duration-500 hover:shadow-[#b8860b]/30 mb-6 flex items-center justify-center">
                  <img 
                    src="/Suchita.jpeg" 
                    alt="Suchita Sancheti" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105 ease-out"
                    onError={(e) => {
                      const currentSrc = e.currentTarget.getAttribute('src');
                      if (currentSrc === '/Suchita.jpeg') {
                        e.currentTarget.setAttribute('src', '/suchita_portrait.jpg');
                      } else if (currentSrc === '/suchita_portrait.jpg') {
                        e.currentTarget.setAttribute('src', '/suchita_portrait.png');
                      } else if (currentSrc === '/suchita_portrait.png') {
                        e.currentTarget.setAttribute('src', '/suchita_portrait.webp');
                      } else if (currentSrc === '/suchita_portrait.webp') {
                        e.currentTarget.setAttribute('src', '/suchita_portrait.jpeg');
                      } else if (currentSrc === '/suchita_portrait.jpeg') {
                        e.currentTarget.setAttribute('src', '/suchita_portrait.JPG');
                      } else if (currentSrc === '/suchita_portrait.JPG') {
                        e.currentTarget.setAttribute('src', '/suchita_portrait.PNG');
                      } else if (currentSrc === '/suchita_portrait.PNG') {
                        e.currentTarget.setAttribute('src', '/suchita_portrait.JPEG');
                      } else if (currentSrc === '/suchita_portrait.JPEG') {
                        e.currentTarget.setAttribute('src', '/suchita_portrait.WEBP');
                      } else if (currentSrc === '/suchita_portrait.WEBP') {
                        e.currentTarget.setAttribute('src', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1000');
                      } else {
                        e.currentTarget.style.display = 'none';
                        const fb = document.getElementById('ss-logo-fb-about');
                        if (fb) fb.classList.remove('hidden');
                      }
                    }}
                  />
                  <div id="ss-logo-fb-about" className="hidden absolute inset-0 flex flex-col items-center justify-center bg-zinc-950">
                    <span className="text-5xl font-serif text-white font-bold ">SS</span>
                    <span className="absolute bottom-2 text-[8px] font-mono uppercase text-[#b8860b] text-center w-full block font-semibold">PRINCIPAL ARCHITECT</span>
                  </div>
                </div>

                {/* Sub-block - Rephrased as "How We Calibrate Your Enterprise" */}
                <div className="text-center w-full">
                  <h3 className="text-[#b8860b] text-[10px] font-black uppercase mb-3">Architectural Disciplines</h3>
                  <div className="space-y-2 text-zinc-800 font-serif text-sm">
                    <div className="py-2.5 border-y border-zinc-100 flex flex-col items-start px-2 text-left">
                      <span className="text-zinc-500 text-[10px] font-sans font-bold uppercase mb-1">Systems Logic (Computer Science Engineer)</span>
                      <span className="font-medium text-zinc-900 text-xs italic">"We map your corporate workflows as precise, high-frequency execution protocols—turning vague mandates into explicit, self-executing system actions."</span>
                    </div>
                    <div className="py-2.5 border-b border-zinc-100 flex flex-col items-start px-2 text-left">
                      <span className="text-zinc-500 text-[10px] font-sans font-bold uppercase mb-1">Human Alignment (Industrial Psychologist)</span>
                      <span className="font-medium text-zinc-900 text-xs italic">"We pinpoint and dissolve the invisible cognitive bottlenecks, coordination friction, and alignment drag that exhaust your executive team."</span>
                    </div>
                    <div className="py-2.5 border-b border-zinc-100 flex flex-col items-start px-2 text-left">
                      <span className="text-zinc-500 text-[10px] font-sans font-bold uppercase mb-1">Enterprise Scale (SAP Consultant)</span>
                      <span className="font-medium text-zinc-900 text-xs italic">"We build unshakeable, enterprise-grade architecture that ensures your strategic vision propagates to the frontline with absolute zero-dilution fidelity."</span>
                    </div>
                    <div className="py-2.5 border-b border-zinc-100 flex flex-col items-start px-2 text-left">
                      <span className="text-zinc-500 text-[10px] font-sans font-bold uppercase mb-1">Behavioral Profiling (Certified Handwriting Analyst • 1-on-1 Practice)</span>
                      <span className="font-medium text-zinc-900 text-xs italic">"Conducted personally by Suchita in bespoke 1-on-1 private sessions (separate from automated app software) to uncover latent behavioral stress and alignment dynamics."</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Client-Centric Impact Stats */}
              <div className="grid grid-cols-2 gap-8 bg-white p-6 border border-zinc-200 shadow-sm text-center">
                <div>
                  <div className="text-4xl font-extrabold text-[#b8860b] mb-2">40%</div>
                  <div className="text-[10px] font-black uppercase text-zinc-400 ">Bandwidth Recovered</div>
                </div>
                <div>
                  <div className="text-4xl font-extrabold text-[#b8860b] mb-2">0%</div>
                  <div className="text-[10px] font-black uppercase text-zinc-400 ">Alignment Dilution</div>
                </div>
              </div>
            </div>

            {/* Biography Narrative - Positioning Suchita Sancheti & TULC */}
            <div className="md:col-span-7 space-y-10">
              <div className="space-y-6 text-[#111111]">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#b8860b]/20 pb-3">
                  <h3 className="text-xl font-bold text-[#111111]">
                    Suchita Sancheti — Founder & Enterprise Architect
                  </h3>
                  <a 
                    href="https://www.f6s.com/member/suchita-sancheti?follow=1" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    title="Follow Suchita Sancheti on F6S"
                    className="inline-flex items-center hover:opacity-80 transition-opacity"
                  >
                    <img 
                      src="https://www.f6s.com/images/f6s-follow-secondary.png" 
                      width="78" 
                      height="22" 
                      alt="Follow Suchita Sancheti on F6S" 
                      referrerPolicy="no-referrer"
                      style={{ width: '78px', height: '22px', padding: '0px', margin: '0px' }}
                    />
                  </a>
                </div>

                <p className="text-2xl text-zinc-800 leading-relaxed font-semibold italic text-[#b8860b] font-serif">
                  "You do not need advice to file away in a drawer. You need a system that makes strategic misalignment and operational drag mathematically impossible."
                </p>
                
                <div className="h-[1px] w-20 bg-[#b8860b]/30" />

                <p className="text-zinc-700 leading-relaxed font-light italic text-base">
                  When a scaling enterprise begins losing its edge, the root cause is rarely talent—it is architectural drift. Suchita Sancheti treats organizational bottlenecks not as a human failing, but as a structural design flaw. She doesn't just coach leaders; she recalibrates your entire leadership operating system to run autonomously.
                </p>
                <p className="text-zinc-700 leading-relaxed font-light italic text-base">
                  By combining elite computer science systems logic with industrial psychology, she bridges the gap between your strategic intent and executive execution. Her methodology installs high-fidelity delegation structures so your direct reports operate at the exact frequency of your mind—leaving you completely insulated from tactical firefighting.
                </p>
                <p className="text-zinc-700 leading-relaxed font-medium italic text-base border-l-2 border-[#b8860b] pl-6 py-2 bg-white/40">
                  "If you are spending more than 15% of your week resolving coordination errors rather than compounding your next strategic advantage, you are paying a voluntary tax on your own legacy. My job is to reclaim your cognitive bandwidth and make your strategic intent an inevitable force."
                </p>
              </div>

              {/* Our Core Thesis */}
              <div className="bg-white p-8 md:p-10 border border-zinc-200 shadow-lg space-y-6">
                <div>
                  <h3 className="text-lg font-bold mb-3 text-[#111111] border-b border-[#b8860b]/20 pb-3 flex items-center justify-between">
                    <span className="flex items-center gap-2 font-serif">
                      <span className="text-zinc-400 font-mono text-xs">01 /</span> The Architectural Thesis
                    </span>
                    <span className="text-[9px] font-mono font-bold uppercase text-[#b8860b] bg-[#b8860b]/10 px-2 py-0.5 border border-[#b8860b]/30">
                      Patent-Pending Matrix
                    </span>
                  </h3>
                  <p className="text-zinc-600 leading-relaxed font-light italic text-sm mb-3">
                    Most governance frameworks treat delegation as a simple task-assignment problem. We treat it as a systemic alignment problem. Even when authority is formally transferred, the strategic reasoning structure remains locked inside the founder's head, causing up to a 15% strategic dilution per organizational layer.
                  </p>
                  <p className="text-zinc-600 leading-relaxed font-light italic text-sm">
                    TULC maps these hidden alignment leaks and implements strategic intent into your enterprise's architecture—utilizing our proprietary Strategic Alignment Protocol™—creating a self-cohering, high-frequency execution structure that gains velocity even in your absence.
                  </p>
                </div>

                {/* 5 Sovereign Domains Executive Summary Card */}
                <div className="bg-[#111111] text-white p-5 border border-[#b8860b]/30 rounded-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-[9px] font-mono font-bold uppercase text-[#b8860b]">
                      The 5 Sovereign Domains Framework
                    </span>
                    <span className="text-[8px] font-mono text-zinc-400 uppercase">Core Diagnostic Pillars</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
                    <div className="p-2 bg-white/5 border border-white/5 rounded-xs">
                      <strong className="text-[#b8860b] block text-[10px]">01. Cognitive Clarity</strong>
                      <span className="text-zinc-300 text-[10px] italic">Executive Decision Flow & Bandwidth</span>
                    </div>
                    <div className="p-2 bg-white/5 border border-white/5 rounded-xs">
                      <strong className="text-[#b8860b] block text-[10px]">02. Systemic Integrity</strong>
                      <span className="text-zinc-300 text-[10px] italic">Organizational Execution Architecture</span>
                    </div>
                    <div className="p-2 bg-white/5 border border-white/5 rounded-xs">
                      <strong className="text-[#b8860b] block text-[10px]">03. Strategic Velocity</strong>
                      <span className="text-zinc-300 text-[10px] italic">Operational Directives & Speed</span>
                    </div>
                    <div className="p-2 bg-white/5 border border-white/5 rounded-xs">
                      <strong className="text-[#b8860b] block text-[10px]">04. Moral Gravity</strong>
                      <span className="text-zinc-300 text-[10px] italic">Governance & Compliance Standards</span>
                    </div>
                    <div className="p-2 sm:col-span-2 bg-white/5 border border-white/5 rounded-xs">
                      <strong className="text-[#b8860b] block text-[10px]">05. Cultural Fidelity</strong>
                      <span className="text-zinc-300 text-[10px] italic">Institutional Continuity, Key-Person Protection & Succession</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office of the Principal Staff Block */}
              <div className="bg-white p-8 border border-zinc-200 shadow-sm space-y-4">
                <div className="flex items-center gap-4 border-b border-zinc-100 pb-4">
                  <div className="w-12 h-12 bg-[#111] border border-[#b8860b] flex items-center justify-center rounded-xs shrink-0 font-serif text-white font-bold">
                    SS
                  </div>
                  <div>
                    <h4 className="text-[#b8860b] text-[8px] font-black uppercase ">Office of the Principal Architect</h4>
                    <p className="text-base font-semibold text-[#111111] font-serif font-medium">Suchita Sancheti — suchita@theunboundedleadership.com</p>
                    <p className="text-[10px] font-mono text-zinc-500 uppercase ">Founder & Principal Systems Architect</p>
                  </div>
                </div>
                <p className="text-zinc-600 leading-relaxed font-light italic text-xs">
                  Direct institutional coordinate for founder consultations, sovereign leadership architecture, confidential diagnostics, and retained advisory dockets.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECURE COMMUNICATION CHANNELS BLOCK */}
        <div className="bg-[#111] p-8 md:p-12 text-white space-y-8 mb-24 rounded-sm border border-[#b8860b]/20">
          <div>
            <span className="text-[10px] uppercase font-mono text-[#b8860b] block border-b border-white/10 pb-2">Office of the Principal</span>
            <h3 className="text-xl md:text-2xl font-bold mt-2 font-serif text-[#f5f5f0]">Secure Communication Channels</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono text-zinc-400">
            <a 
              href="https://www.linkedin.com/company/theunboundedleadership" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-all flex items-center gap-3 border border-white/5 p-4 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
            >
              <Linkedin className="w-4 h-4 text-[#b8860b] shrink-0" />
              <span className="truncate">linkedin.com/company/theunboundedleadership</span>
            </a>
            <a 
              href="https://www.instagram.com/transformingleadership" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-all flex items-center gap-3 border border-white/5 p-4 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
            >
              <Instagram className="w-4 h-4 text-[#b8860b] shrink-0" />
              <span className="truncate">@transformingleadership</span>
            </a>
            <a 
              href="https://www.f6s.com/member/suchita-sancheti?follow=1" 
              target="_blank" 
              rel="noopener noreferrer"
              title="Follow Suchita Sancheti on F6S"
              className="hover:text-white transition-all flex items-center justify-between gap-3 border border-white/5 p-4 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
            >
              <span className="truncate">f6s.com/member/suchita-sancheti</span>
              <img 
                src="https://www.f6s.com/images/f6s-follow-secondary.png" 
                width="78" 
                height="22" 
                alt="Follow Suchita Sancheti on F6S" 
                referrerPolicy="no-referrer"
                style={{ width: '78px', height: '22px', padding: '0px', margin: '0px' }}
                className="shrink-0"
              />
            </a>
            <a 
              href="mailto:suchita@theunboundedleadership.com" 
              className="hover:text-white transition-all flex items-center gap-3 border border-white/5 p-4 bg-white/[0.02] hover:bg-white/[0.04] transition-colors font-sans font-medium"
            >
              <Mail className="w-4 h-4 text-[#b8860b] shrink-0" />
              <span className="truncate">suchita@theunboundedleadership.com</span>
            </a>
          </div>
        </div>

        {/* DUAL-PANEL VISION & MISSION SECTION */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#111111] text-white p-10 md:p-14 border border-[#b8860b]/30 relative overflow-hidden flex flex-col justify-between rounded-xs shadow-2xl"
          >
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#b8860b]/10 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xl">🏛️</span>
                <span className="text-[#b8860b] text-[10px] font-mono font-bold uppercase tracking-widest block">VISION</span>
              </div>
              <p className="text-[#f5f5f0] text-lg md:text-xl leading-relaxed font-light italic border-l-2 border-[#b8860b] pl-6 mb-6 font-serif">
                "To align human ambition with enduring organizational architecture — so that power, scale, and perpetuity compound as one, and what the world's greatest founders build today commands the future long after they have conquered it."
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
              <span className="text-[9px] uppercase font-mono text-zinc-500 block mb-1">SYSTEMIC DESIGN THESIS</span>
              <p className="text-[11px] text-zinc-400 italic font-mono leading-relaxed">
                Aligning human ambition with institutional infrastructure — engineering enduring organizational architecture that compounds power, scale, and perpetuity across generations.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#111111] text-white p-10 md:p-14 border border-[#b8860b]/30 relative overflow-hidden flex flex-col justify-between rounded-xs shadow-2xl"
          >
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#b8860b]/10 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className="text-xl">🏛️</span>
                <span className="text-[#b8860b] text-[10px] font-mono font-bold uppercase tracking-widest block">MISSION</span>
              </div>
              <p className="text-[#f5f5f0] text-lg md:text-xl leading-relaxed font-light italic border-l-2 border-[#b8860b] pl-6 mb-6 font-serif">
                "We work with the world's most consequential founders to architect the structural conditions for absolute organizational sovereignty. Across five foundational domains of systemic alignment, we dismantle operational dependency, dissolve leadership entropy, and engineer the precise infrastructure that allows an empire to grow, scale, and compound — with or without its founder at the helm."
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/10 relative z-10">
              <span className="text-[9px] uppercase font-mono text-zinc-500 block mb-1">5 SOVEREIGN DOMAINS OF SYSTEMIC ALIGNMENT</span>
              <span className="text-[10px] text-[#b8860b] uppercase font-mono font-bold">Cognitive Clarity • Systemic Integrity • Strategic Velocity • Moral Gravity • Cultural Fidelity</span>
            </div>
          </motion.div>
        </div>

        {/* ARCHITECTURAL PEDIGREE & SOVEREIGN COVENANT */}
        <section className="mb-20 bg-[#111111] text-white p-8 md:p-12 border border-[#b8860b]/30 rounded-xs shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#b8860b]/10 blur-3xl rounded-full pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl mx-auto space-y-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="text-[#b8860b] text-[10px] font-mono font-bold uppercase tracking-widest block">
                  INSTITUTIONAL PEDIGREE & ARCHITECTURAL FOUNDATION
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mt-1">
                  Computer Science Systems Logic × Industrial Organizational Psychology
                </h3>
              </div>
              <span className="px-3 py-1 bg-[#b8860b]/20 border border-[#b8860b]/40 text-[#b8860b] text-[10px] font-mono font-bold uppercase shrink-0">
                Direct Principal Mandate
              </span>
            </div>

            <p className="text-zinc-300 text-sm sm:text-base font-serif italic font-light leading-relaxed">
              Suchita Sancheti does not approach scaling bottlenecks as HR matters or generic coaching problems. By integrating rigorous computer science systems architecture—proven in high-stakes SAP enterprise integrations—with clinical industrial psychology, she isolates operational latency at its mathematical root.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 pt-4 font-mono text-xs text-zinc-300">
              <div className="bg-black/50 border border-white/10 p-4 rounded-xs">
                <span className="text-[#b8860b] font-bold block mb-1">01. Algorithmic Precision</span>
                <span className="text-[11px] text-zinc-400">Decision heuristics hard-coded into organizational execution gates.</span>
              </div>
              <div className="bg-black/50 border border-white/10 p-4 rounded-xs">
                <span className="text-[#b8860b] font-bold block mb-1">02. Cognitive Liberation</span>
                <span className="text-[11px] text-zinc-400">Reclaims up to 40% of founder bandwidth within 90 calendar days.</span>
              </div>
              <div className="bg-black/50 border border-white/10 p-4 rounded-xs">
                <span className="text-[#b8860b] font-bold block mb-1">03. Generational Sovereignty</span>
                <span className="text-[11px] text-zinc-400">Neutralizes key-person dependency for maximum enterprise exit multiple.</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs font-mono text-zinc-400">
                Direct coordinate: <strong className="text-white">suchita@theunboundedleadership.com</strong>
              </span>
              <a
                href="https://calendly.com/d/d3jb-kpx-r6q"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#b8860b] text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xs hover:bg-white transition-all shadow-md"
              >
                Schedule Private Executive Intake →
              </a>
            </div>
          </div>
        </section>

        {/* CLIENT ALIGNMENT PROFILES & PROOF OF SCALE */}
        <div className="-mx-6 md:-mx-12">
          {/* Target Alignment Profiles */}
          <WhoWeBuildFor />
          
          {/* Dynamics of Scale */}
          <ScaleEvidence onBriefClick={onBriefClick} />
          
          {/* Impact Ledger */}
          <ImpactLedger />
        </div>

        {/* INSTITUTIONAL CREDO & FINAL CALL TO ACTION */}
        <div className="bg-[#111111] p-8 sm:p-10 text-white rounded-xs border border-[#b8860b]/30 mt-16 flex flex-col gap-8 shadow-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/10 pb-6">
            <div className="space-y-3 max-w-2xl text-left">
              <h4 className="text-[#b8860b] text-[10px] font-black uppercase font-mono">Institutional Credo & Partnership Assurance</h4>
              <p className="text-base sm:text-lg italic font-serif font-light text-zinc-200 leading-relaxed">
                "We do not offer temporary advice. We co-implement alongside C-suite leaders to hard-code durable operating guardrails. Solid architecture is the only way to delegate strategic intent at scale with absolute fidelity."
              </p>
            </div>

            <Link 
              to="/intake"
              className="shrink-0 bg-[#b8860b] text-white px-8 py-4 font-bold text-[10px] uppercase hover:bg-white hover:text-black transition-all shadow-xl flex items-center gap-2 rounded-xs"
            >
              <span>Initiate Executive Intake</span> 
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Interlinks Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 font-mono">
            <span className="text-[9px] text-zinc-400 uppercase font-bold">
              Explore The Unbounded Architecture:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <Link 
                to="/#domains" 
                className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-white/10 text-[9px] uppercase font-bold transition-all flex items-center gap-1.5 rounded-xs"
              >
                <Layers className="w-3 h-3 text-[#b8860b]" />
                <span>5 Domains</span>
              </Link>
              <Link 
                to="/services" 
                className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-white/10 text-[9px] uppercase font-bold transition-all flex items-center gap-1.5 rounded-xs"
              >
                <Shield className="w-3 h-3 text-[#b8860b]" />
                <span>Mandate Tracks</span>
              </Link>
              <Link 
                to="/toolkits" 
                className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-white/10 text-[9px] uppercase font-bold transition-all flex items-center gap-1.5 rounded-xs"
              >
                <Layers className="w-3 h-3 text-[#b8860b]" />
                <span>Founder Toolkits</span>
              </Link>
              <Link 
                to="/assessment" 
                className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-white/10 text-[9px] uppercase font-bold transition-all flex items-center gap-1.5 rounded-xs"
              >
                <Calculator className="w-3 h-3 text-[#b8860b]" />
                <span>Diagnostic Tool</span>
              </Link>
              <Link 
                to="/library" 
                className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-white/10 text-[9px] uppercase font-bold transition-all flex items-center gap-1.5 rounded-xs"
              >
                <FileText className="w-3 h-3 text-[#b8860b]" />
                <span>Research Library</span>
              </Link>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};

export default About;

