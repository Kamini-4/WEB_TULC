import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Instagram, Linkedin } from '../../components/BrandIcons.tsx';
import PrincipalDispatch from '../../components/PrincipalDispatch.tsx';

const About: React.FC = () => {
  return (
    <div className="bg-[#f5f5f0] min-h-screen pt-20 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* HERO TITLE BLOCK */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mb-12"
        >
          <h2 className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.4em] mb-4">The Principal Architect</h2>
          <h1 className="text-4xl md:text-5xl font-bold text-[#111111] mb-6 leading-tight">
            Suchita Sancheti <br />
            <span className="italic text-[#b8860b]">Enterprise Alignment.</span>
          </h1>
          <div className="w-16 h-[2px] bg-[#111111]" />
        </motion.div>

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
              "I help organizations reduce decision delays by <span className="text-[#b8860b] font-bold not-italic font-sans">40%</span> in <span className="text-[#b8860b] font-bold not-italic font-sans">90 days</span>."
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
              {/* Portrait Image */}
              <div className="shrink-0 w-full max-w-[280px] sm:max-w-[320px] aspect-[3/4] bg-[#111] border-2 border-[#b8860b] relative rounded-xs overflow-hidden shadow-lg group transition-all duration-500 hover:shadow-[#b8860b]/25 mb-6">
                <img 
                  src="https://lh3.googleusercontent.com/d/196xWITxhSq__hUWKTPIB6GxNZGiaQWlw" 
                  alt="Suchita Sancheti" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-all duration-700 hover:scale-105 ease-out"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fb = document.getElementById('ss-logo-fb-about');
                    if (fb) fb.classList.remove('hidden');
                  }}
                />
                <div id="ss-logo-fb-about" className="hidden absolute inset-0 flex flex-col items-center justify-center bg-zinc-950">
                  <span className="text-5xl font-serif text-white font-bold tracking-tight">SS</span>
                  <span className="absolute bottom-2 text-[8px] font-mono uppercase tracking-widest text-[#b8860b] text-center w-full block font-semibold">PRINCIPAL ARCHITECT</span>
                </div>
              </div>

              {/* Credentials Sub-block */}
              <div className="text-center w-full">
                <h3 className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.3em] mb-3">Principal Credentials</h3>
                <div className="space-y-2 text-zinc-800 font-serif text-sm">
                  <div className="py-2.5 border-y border-zinc-100 flex justify-between items-center px-2">
                    <span className="text-zinc-500 text-xs font-sans font-medium uppercase tracking-wider text-left">Academic Paradigm</span>
                    <span className="font-semibold text-zinc-900 text-right">Computer Science Engineer</span>
                  </div>
                  <div className="py-2.5 border-b border-zinc-100 flex justify-between items-center px-2">
                    <span className="text-zinc-500 text-xs font-sans font-medium uppercase tracking-wider text-left">Behavioral Blueprint</span>
                    <span className="font-semibold text-zinc-900 text-right">Industrial Psychologist</span>
                  </div>
                  <div className="py-2.5 border-b border-zinc-100 flex justify-between items-center px-2">
                    <span className="text-zinc-500 text-xs font-sans font-medium uppercase tracking-wider text-left">Systems Alignment</span>
                    <span className="font-semibold text-zinc-900 text-right">SAP Consultant</span>
                  </div>
                  <div className="py-2.5 border-b border-zinc-100 flex justify-between items-center px-2">
                    <span className="text-zinc-500 text-xs font-sans font-medium uppercase tracking-wider text-left">Sub-verbal Audits</span>
                    <span className="font-semibold text-zinc-900 text-right">Handwriting Analyst</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scale stats */}
            <div className="grid grid-cols-2 gap-8 bg-white p-6 border border-zinc-200 shadow-sm text-center">
              <div>
                <div className="text-4xl font-bold text-[#111111] mb-2">$10B+</div>
                <div className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">AUM Influenced</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-[#111111] mb-2">50+</div>
                <div className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">Global Board Audits</div>
              </div>
            </div>
          </div>

          {/* Biography Narrative (Right columns) */}
          <div className="md:col-span-7 space-y-10">
            <div className="space-y-6 text-[#111111]">
              <p className="text-2xl text-zinc-800 leading-relaxed font-light italic">
                The Unbounded Leadership Co. (TULC) is not a conventional consultancy. It is a structural engineering firm for leadership architecture. We exist to solve the singular failure mode of scaling enterprises: <strong>Strategic Attrition.</strong>
              </p>
              
              <div className="h-[1px] w-20 bg-[#b8860b]/30" />

              <p className="text-zinc-700 leading-relaxed font-light italic text-base">
                Forged at the intersection of high-stakes technology paradigms and human behavioral mechanics, Suchita Sancheti represents a unique synthesis. As a <strong>Computer Science Engineer</strong> and <strong>Industrial Psychologist</strong>, she treats human coordination errors as systemic alignment anomalies.
              </p>
              <p className="text-zinc-700 leading-relaxed font-light italic text-base">
                Combining extensive experience as an <strong>SAP Consultant</strong> aligning complex global structures, and a <strong>Handwriting Analyst</strong> assessing the deep, sub-verbal integrity profiles of elite candidates, she designs the structural conditions for absolute leadership synergy. 
              </p>
              <p className="text-zinc-700 leading-relaxed font-light italic text-base border-l-2 border-[#b8860b] pl-6 py-1">
                Her proprietary diagnostics analyze leadership performance trends, vocal frequency metrics, and operational lag. This customized system has been validated and benchmarked with elite corporate leaders across multiple operational tiers to successfully isolate decision latency, reclaim executive energy, and eliminate cognitive tax.
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
                TULC maps these hidden alignment leaks and implements strategic intent into your enterprise's architecture, creating a self-cohering, high-frequent execution structure that gains velocity even in your absence.
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
                  <p className="text-base font-semibold text-[#111111] font-serif">Kamini Agnihotri</p>
                  <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Operations & Client Relations Coordinator</p>
                </div>
              </div>
              <p className="text-zinc-600 leading-relaxed font-light italic text-xs">
                Within the Office of the Principal, Kamini Agnihotri manages operational flow, coordinating client scheduling, secure communications, administrative protocols, and accounts.
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
              href="mailto:suchita135sancheti@gmail.com" 
              className="hover:text-white transition-all flex items-center gap-3 border border-white/5 p-4 bg-white/[0.02] hover:bg-white/[0.04] transition-colors font-sans font-medium"
            >
              <Mail className="w-4 h-4 text-[#b8860b] shrink-0" />
              <span className="truncate">Principal: suchita135sancheti@gmail.com</span>
            </a>
            <a 
              href="mailto:kaminiagnihotri249@gmail.com" 
              className="hover:text-white transition-all flex items-center gap-3 border border-white/5 p-4 bg-white/[0.02] hover:bg-white/[0.04] transition-colors font-sans font-medium"
            >
              <Mail className="w-4 h-4 text-[#b8860b] shrink-0" />
              <span className="truncate">Assistant: kaminiagnihotri249@gmail.com</span>
            </a>
            <a 
              href="https://wa.me/919325346704" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-all flex items-center gap-3 border border-white/5 p-4 bg-white/[0.02] hover:bg-white/[0.04] transition-colors sm:col-span-2 lg:col-span-1"
            >
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="truncate font-sans font-medium">Call / WhatsApp: +91 9325346704</span>
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
