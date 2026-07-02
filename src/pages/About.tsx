import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Instagram, Linkedin } from '../../components/BrandIcons.tsx';
import PrincipalDispatch from '../../components/PrincipalDispatch.tsx';
import BrandLogo from '../../components/BrandLogo.tsx';

const About: React.FC = () => {
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
        "https://www.instagram.com/transformingleadership"
      ]
    }
  };

  return (
    <div className="bg-[#f5f5f0] min-h-screen pt-20 pb-20">
      {/* Structured Schema Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* HERO TITLE & BRAND LOGO BLOCK */}
        <div className="grid md:grid-cols-12 gap-8 items-center mb-12">
          {/* HERO TITLE BLOCK */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="md:col-span-7 space-y-4"
          >
            <h2 className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.4em]">The Principal Architect</h2>
            <h1 className="text-4xl md:text-5xl font-bold text-[#111111] leading-tight">
              Suchita Sancheti <br />
              <span className="italic text-[#b8860b]">Enterprise Alignment.</span>
            </h1>
            <div className="w-16 h-[2px] bg-[#111111] mt-4" />
          </motion.div>

          {/* BRAND LOGO CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="md:col-span-5 flex justify-center md:justify-end"
          >
            <BrandLogo size="md" variant="full" theme="dark" className="w-full" />
          </motion.div>
        </div>

        {/* 40% RECOVERY HIGHLIGHT BANNER - PLACED PROMINENTLY AT TOP */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="bg-[#111111] text-white p-8 md:p-12 mb-16 border border-[#b8860b]/30 relative overflow-hidden flex flex-col justify-center rounded-sm shadow-2xl"
        >
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#b8860b]/10 to-transparent pointer-events-none" />
          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <span className="text-[#b8860b] text-[9px] font-black tracking-[0.4em] uppercase block mb-3">Core Performance Mandate</span>
            <p className="text-[#f5f5f0] text-2xl md:text-4xl leading-snug font-serif font-light italic mb-2">
              "You help organizations reduce decision delays by <span className="text-[#b8860b] font-bold not-italic font-sans">40%</span> in <span className="text-[#b8860b] font-bold not-italic font-sans">90 days</span>."
            </p>
            <div className="h-px w-24 bg-[#b8860b]/50 mx-auto mt-6 mb-4"></div>
            <p className="text-zinc-400 text-xs tracking-wider uppercase font-mono">
              Structural alignment designed specifically for enterprise founders, VCs, and CEOs.
            </p>
          </div>
        </motion.div>

        {/* SECTION 1: PHOTO & CREDENTIALS FIRST */}
        <div className="grid md:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          
          {/* Portrait Photo & Credentials (Left columns) */}
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
                  <span className="text-5xl font-serif text-white font-bold tracking-tight">SS</span>
                  <span className="absolute bottom-2 text-[8px] font-mono uppercase tracking-widest text-[#b8860b] text-center w-full block font-semibold">PRINCIPAL ARCHITECT</span>
                </div>
              </div>

              {/* Credentials Sub-block - Rephrased as "How I Help You" */}
              <div className="text-center w-full">
                <h3 className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.3em] mb-3">How I Help You Calibrate</h3>
                <div className="space-y-2 text-zinc-800 font-serif text-sm">
                  <div className="py-2.5 border-y border-zinc-100 flex flex-col items-start px-2 text-left">
                    <span className="text-zinc-500 text-[10px] font-sans font-bold uppercase tracking-wider mb-1">Systems Logic (Computer Science Engineer)</span>
                    <span className="font-medium text-zinc-900 text-xs italic">"I map your corporate workflows as precise, high-frequency logic gates—turning vague tasks into absolute, self-executing system actions."</span>
                  </div>
                  <div className="py-2.5 border-b border-zinc-100 flex flex-col items-start px-2 text-left">
                    <span className="text-zinc-500 text-[10px] font-sans font-bold uppercase tracking-wider mb-1">Human Alignment (Industrial Psychologist)</span>
                    <span className="font-medium text-zinc-900 text-xs italic">"I pinpoint and dissolve the invisible cognitive bottlenecks, coordination friction, and alignment drag that exhaust your executive team."</span>
                  </div>
                  <div className="py-2.5 border-b border-zinc-100 flex flex-col items-start px-2 text-left">
                    <span className="text-zinc-500 text-[10px] font-sans font-bold uppercase tracking-wider mb-1">Enterprise Scale (SAP Consultant)</span>
                    <span className="font-medium text-zinc-900 text-xs italic">"I build unshakeable, enterprise-grade architecture that ensures your strategic vision propagates to the frontline with absolute, zero-dilution fidelity."</span>
                  </div>
                  <div className="py-2.5 border-b border-zinc-100 flex flex-col items-start px-2 text-left">
                    <span className="text-zinc-500 text-[10px] font-sans font-bold uppercase tracking-wider mb-1">Sub-Verbal Profiling (Handwriting Analyst)</span>
                    <span className="font-medium text-zinc-900 text-xs italic">"I run rapid, non-disruptive behavioral audits to uncover underlying motivators and verify deep alignment among your key directors."</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Client-Centric Impact Stats */}
            <div className="grid grid-cols-2 gap-8 bg-white p-6 border border-zinc-200 shadow-sm text-center">
              <div>
                <div className="text-4xl font-extrabold text-[#b8860b] mb-2">40%</div>
                <div className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Bandwidth Recovered</div>
              </div>
              <div>
                <div className="text-4xl font-extrabold text-[#b8860b] mb-2">0%</div>
                <div className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Alignment Dilution</div>
              </div>
            </div>
          </div>

          {/* Biography Narrative - Customer-Centric Positioning */}
          <div className="md:col-span-7 space-y-10">
            <div className="space-y-6 text-[#111111]">
              <p className="text-2xl text-zinc-800 leading-relaxed font-semibold italic text-[#b8860b]">
                "You do not need advice to file away in a drawer. You need a system that makes strategic misalignment and operational drag mathematically impossible."
              </p>
              
              <div className="h-[1px] w-20 bg-[#b8860b]/30" />

              <p className="text-zinc-700 leading-relaxed font-light italic text-base">
                If your scaling company is losing its edge, you don't need a cheerleader—you need a systems architect. Suchita Sancheti treats organizational bottlenecks not as a human failing, but as a structural design flaw. She doesn't just evaluate your leaders; she recalibrates your entire leadership operating system to run autonomously.
              </p>
              <p className="text-zinc-700 leading-relaxed font-light italic text-base">
                By combining elite systems logic with behavioral psychology, she helps you design high-fidelity delegation structures. She bridges the gap between your strategic intent and executive execution, so your direct reports operate at the exact frequency of your mind—leaving you completely insulated from tactical firefighting.
              </p>
              <p className="text-zinc-700 leading-relaxed font-medium italic text-base border-l-2 border-[#b8860b] pl-6 py-2 bg-white/40">
                "If you are spending more than 15% of your week resolving coordination errors rather than compounding your next strategic advantage, you are paying a voluntary tax on your own legacy. My job is to reclaim your peace of mind and make your strategic intent an inevitable force."
              </p>
            </div>

            {/* Our Thesis Block */}
            <div className="bg-white p-8 md:p-10 border border-zinc-200 shadow-lg">
              <h3 className="text-lg font-bold mb-4 text-[#111111] border-b border-[#b8860b]/20 pb-3 flex items-center gap-2">
                <span className="text-zinc-400 font-mono text-xs">01 /</span> Our Thesis
              </h3>
              <p className="text-zinc-600 leading-relaxed font-light italic text-sm mb-4">
                Most governance frameworks treat delegation as a simple task-assignment problem. We treat it as a systemic alignment problem. Even when authority is formally transferred, the strategic reasoning structure remains locked inside the founder's head, causing up to a 15% strategic dilution per organizational layer.
              </p>
              <p className="text-zinc-600 leading-relaxed font-light italic text-sm">
                TULC maps these hidden alignment leaks and implements strategic intent into your enterprise's architecture—utilizing our proprietary, provisional-patent-filed Strategic Alignment Protocol™—creating a self-cohering, high-frequent execution structure that gains velocity even in your absence.
              </p>
            </div>

            {/* Staff Profile Block within the Office of the Principal */}
            <div className="bg-white p-8 border border-zinc-200 shadow-sm space-y-4">
              <div className="flex items-center gap-4 border-b border-zinc-100 pb-4">
                <div className="w-12 h-12 bg-[#111] border border-[#b8860b] flex items-center justify-center rounded-xs shrink-0 font-serif text-white font-bold">
                  KA
                </div>
                <div>
                  <h4 className="text-[#b8860b] text-[8px] font-black uppercase tracking-[0.3em]">Office of the Principal Architect</h4>
                  <p className="text-base font-semibold text-[#111111] font-serif font-medium">Kamini Agnihotri — kaminiagnihotri249@gmail.com</p>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Operations & Client Relations Coordinator</p>
                </div>
              </div>
              <p className="text-zinc-600 leading-relaxed font-light italic text-xs">
                Within the Office of the Principal, Kamini Agnihotri, reached directly at kaminiagnihotri249@gmail.com, manages operational flow, coordinating client scheduling, secure communications, administrative protocols, and accounts.
              </p>
            </div>
          </div>
        </div>

        {/* SECURE COMMUNICATION CHANNELS BLOCK */}
        <div className="bg-[#111] p-8 md:p-12 text-white space-y-8 mb-24 rounded-sm border border-[#b8860b]/20">
          <div>
            <span className="text-[10px] uppercase font-mono text-[#b8860b] tracking-[0.3em] block border-b border-white/10 pb-2">Office of the Principal</span>
            <h3 className="text-xl md:text-2xl font-bold mt-2 font-serif text-[#f5f5f0]">Secure Communication Channels</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono text-zinc-400">
            <a 
              href="https://www.linkedin.com" 
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
              href="mailto:kaminiagnihotri249@gmail.com" 
              className="hover:text-white transition-all flex items-center gap-3 border border-white/5 p-4 bg-white/[0.02] hover:bg-white/[0.04] transition-colors font-sans font-medium"
            >
              <Mail className="w-4 h-4 text-[#b8860b] shrink-0" />
              <span className="truncate">Assistant: kaminiagnihotri249@gmail.com</span>
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
            className="bg-[#111111] text-white p-12 md:p-16 border border-[#b8860b]/20 relative overflow-hidden flex flex-col justify-between rounded-sm shadow-xl"
          >
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#b8860b]/10 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <span className="text-lg">📊</span>
                <span className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.4em] block">VISION</span>
              </div>
              <p className="text-[#f5f5f0] text-lg md:text-xl leading-relaxed font-light italic border-l border-[#b8860b]/40 pl-6 mb-8">
                "To align human ambition with enduring organizational architecture — so that power, scale, and perpetuity compound as one, and what the world's greatest founders build today commands the future long after they have conquered it."
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 relative z-10">
              <span className="text-[9px] uppercase font-mono text-zinc-500 tracking-wider block mb-2">DESIGN INSIGHT & CALIBRATION</span>
              <p className="text-[10px] text-zinc-400 italic font-mono leading-relaxed">
                Aligning structure with execution — our methodology focuses on concrete, measurable gains in strategic velocity, eliminating coordination costs and organizational bottlenecks.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#111111] text-white p-12 md:p-16 border border-[#b8860b]/20 relative overflow-hidden flex flex-col justify-between rounded-sm shadow-xl"
          >
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#b8860b]/10 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <span className="text-lg">🏛️</span>
                <span className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.4em] block">MISSION</span>
              </div>
              <p className="text-white text-lg md:text-xl leading-relaxed font-light italic border-l border-[#b8860b]/40 pl-6 mb-6">
                "We work with the world's most consequential founders to architect the structural conditions for absolute organizational sovereignty. Across five foundational domains of systemic alignment, we dismantle operational dependency, dissolve leadership entropy, and engineer the precise infrastructure that allows an empire to grow, scale, and compound — with or without its founder at the helm."
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 relative z-10">
              <span className="text-[8px] uppercase font-black text-zinc-500 tracking-widest block mb-1">ALIGNMENT DOMAIN COVERAGE</span>
              <span className="text-[9px] text-[#b8860b] uppercase tracking-widest font-bold">Cognitive Clarity • Systemic Integrity • Strategic Velocity • Moral Gravity • Cultural Fidelity</span>
            </div>
          </motion.div>
        </div>

        {/* SECTION 2: VIDEO AND PRINCIPAL DISPATCH PLACED LATER */}
        <section className="mb-16 -mx-6 md:-mx-12 border-t border-b border-zinc-200">
          <div className="py-4 bg-[#f2f2eb] text-center text-xs text-[#b8860b] font-mono tracking-widest uppercase font-semibold">
            ✦ HIGH FIDELITY VIDEO BRIEFING ✦
          </div>
          <PrincipalDispatch />
        </section>

        {/* CREDO SECTION */}
        <div className="bg-[#111111] p-10 text-white rounded-xs border border-[#b8860b]/20">
          <h4 className="text-[#b8860b] text-[10px] font-black uppercase tracking-widest mb-4 font-mono">Institutional Credo</h4>
          <p className="text-sm italic font-light text-zinc-350 leading-relaxed">
            "We do not focus on temporary coaching. We build durable operating guardrails. Solid architecture is the only way to reliably delegate strategic intent at scale."
          </p>
        </div>

      </div>
    </div>
  );
};

export default About;
