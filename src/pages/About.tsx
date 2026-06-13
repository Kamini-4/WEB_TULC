
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Instagram, Linkedin } from '../../components/BrandIcons.tsx';
import PrincipalDispatch from '../../components/PrincipalDispatch.tsx';

const About: React.FC = () => {
  return (
    <div className="bg-[#f5f5f0] min-h-screen pt-20 pb-20">
      {/* Video showing first on About Page */}
      <section className="-mt-12 mb-8">
        <PrincipalDispatch />
      </section>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h2 className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.4em] mb-4">The Institution</h2>
          <h1 className="text-4xl md:text-5xl font-bold text-[#111111] mb-8 leading-tight">
            Architecting <br />
            <span className="italic text-[#b8860b]">Sovereign Authority.</span>
          </h1>
          <div className="w-16 h-[2px] bg-[#111111] mb-12" />
        </motion.div>

        {/* VISION & MISSION DUAL-PANEL SECTION */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-[#111111] text-white p-12 md:p-16 border border-[#b8860b]/20 relative overflow-hidden flex flex-col justify-between rounded-sm shadow-xl"
          >
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#b8860b]/10 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <span className="text-lg">📊</span>
                <span className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.4em] block">VISION</span>
              </div>
              <p className="text-[#f5f5f0] text-lg md:text-xl leading-relaxed font-light italic border-l border-[#b8860b]/40 pl-6 mb-8">
                To integrate executive strategy with systematic operational design — ensuring scaling enterprises maintain alignment, eliminate decision bottlenecks, and achieve long-term, high-fidelity business continuity.
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
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-[#111111] text-white p-12 md:p-16 border border-[#b8860b]/20 relative overflow-hidden flex flex-col justify-between rounded-sm shadow-xl"
          >
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#b8860b]/10 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <span className="text-lg">🏛️</span>
                <span className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.4em] block">MISSION</span>
              </div>
              <p className="text-white text-lg md:text-xl leading-relaxed font-light italic border-l border-[#b8860b]/40 pl-6 mb-6">
                <strong>We work with high-growth founders and enterprise leaders</strong> to architect the structural conditions for absolute operational alignment.
              </p>
              <p className="text-zinc-300 text-sm md:text-base leading-relaxed font-light italic pl-6">
                Across five foundational domains of systemic alignment, we streamline operational dependency, reduce administrative lag, and build the structural infrastructure that allows an enterprise to grow, scale, and perform reliably — with or without the founder's daily manual intervention.
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 relative z-10">
              <span className="text-[8px] uppercase font-black text-zinc-500 tracking-widest block mb-1">ALIGNMENT DOMAIN COVERAGE</span>
              <span className="text-[9px] text-[#b8860b] uppercase tracking-widest font-bold">Cognitive Clarity • Systemic Integrity • Strategic Velocity • Moral Gravity • Cultural Fidelity</span>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start mb-20">
          <div className="space-y-12">
            <p className="text-2xl text-zinc-800 leading-relaxed font-light italic">
              The Unbounded Leadership Co. (TULC) is not a consultancy. It is an engineering blueprint firm for the leadership substrate. We exist to solve the singular failure mode of scaling enterprises: <strong>Cognitive Insolvency.</strong>
            </p>
            <div className="bg-white p-12 border border-zinc-200 shadow-xl">
              <h3 className="text-xl font-bold mb-6 text-[#111111] border-b border-[#b8860b]/20 pb-4">Our Thesis</h3>
              <p className="text-zinc-600 leading-relaxed font-light italic text-sm mb-6">
                Most governance frameworks treat delegation as a simple task-assignment problem. We treat it as a systemic physics problem. Even when authority is formally transferred, the strategic reasoning structure remains locked inside the founder's head, causing a 15% strategic dilution per organizational layer.
              </p>
              <p className="text-zinc-600 leading-relaxed font-light italic text-sm">
                TULC maps these hidden alignment leaks and hard-codes strategic intent into your enterprise's architecture, creating a self-cohering, high-fidelity execution substrate that gains velocity even in the principal's absence.
              </p>
            </div>
          </div>

          <div className="space-y-12">
            <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center bg-white p-8 border border-zinc-200/80 shadow-sm">
              {/* High-fidelity Portrait Image */}
              <div className="shrink-0 w-28 h-28 sm:w-36 sm:h-36 bg-[#111] border-2 border-[#b8860b] relative rounded-xs overflow-hidden shadow-md group">
                <img 
                  src="https://lh3.googleusercontent.com/d/196xWITxhSq__hUWKTPIB6GxNZGiaQWlw" 
                  alt="Suchita Sancheti" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center grayscale contrast-[1.10] hover:grayscale-0 transition-all duration-500"
                  onError={(e) => {
                    // Fallback to monogram if image fails to load
                    e.currentTarget.style.display = 'none';
                    const fb = document.getElementById('ss-logo-fb');
                    if (fb) fb.classList.remove('hidden');
                  }}
                />
                <div id="ss-logo-fb" className="hidden absolute inset-0 flex flex-col items-center justify-center bg-zinc-950">
                  <span className="text-3xl font-serif text-white font-bold tracking-tight">SS</span>
                  <span className="absolute bottom-1 text-[8px] font-mono uppercase tracking-widest text-[#b8860b] text-center w-full block">PRINCIPAL</span>
                </div>
              </div>
              <div>
                <h4 className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.3em] mb-1">The Principal Architect</h4>
                <p className="text-xl font-semibold text-[#111111] font-serif">Suchita Sancheti</p>
                <div className="text-[9px] uppercase font-mono text-zinc-500 tracking-wider mt-2 leading-relaxed">
                  Computer Science Engineer • Industrial Psychologist <br className="hidden sm:inline" />• SAP Consultant • Handwriting Analyst
                </div>
              </div>
            </div>

            <div className="space-y-6 text-[#111111]">
              <p className="text-zinc-650 leading-relaxed font-light italic text-sm">
                Forged at the intersection of high-stakes technology paradigms and human behavioral mechanics, Suchita Sancheti represents a unique synthesis. As a <strong>Computer Science Engineer</strong> and <strong>Industrial Psychologist</strong>, she treats human coordination deficits as algorithmic anomalies.
              </p>
              <p className="text-zinc-650 leading-relaxed font-light italic text-sm">
                Combining extensive experience as an <strong>SAP Consultant</strong> aligning complex global structures, and a <strong>Handwriting Analyst</strong> assessing the deep, sub-verbal integrity profiles of elite candidates, she has designed the Sovereign Protocol. 
              </p>
              <p className="text-zinc-650 leading-relaxed font-light italic text-sm border-l-2 border-[#b8860b] pl-4">
                She is the holder of an active <strong>provisional patent</strong> for real-time psycho-kinetic alignment diagnostic systems—specifically the 10-Question vocal stress diagnostic that powers the Sovereign assessment. This system has been scientifically validated and benchmarked by **9 elite corporate leaders across four operational tiers** to isolate decision latency and eliminate cognitive tax.
              </p>
            </div>

            <div className="bg-[#111] p-8 text-white space-y-6">
              <span className="text-[10px] uppercase font-mono text-[#b8860b] tracking-[0.3em] block border-b border-white/10 pb-2">Direct Strategic Coordinates</span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-zinc-400">
                <a 
                  href="https://www.linkedin.com/in/suchita-sancheti" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-all flex items-center gap-3 border border-white/5 p-3 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-[#b8860b] shrink-0" />
                  <span className="truncate">linkedin.com/in/suchita-sancheti</span>
                </a>
                <a 
                  href="https://www.instagram.com/transformingleadership" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-all flex items-center gap-3 border border-white/5 p-3 bg-white/[0.02] hover:bg-white/[0.04] transition-colors"
                >
                  <Instagram className="w-4 h-4 text-[#b8860b] shrink-0" />
                  <span className="truncate">@transformingleadership</span>
                </a>
                <a 
                  href="mailto:suchita135sancheti@gmail.com" 
                  className="hover:text-white transition-all flex items-center gap-3 border border-white/5 p-3 bg-white/[0.02] hover:bg-white/[0.04] transition-colors col-span-1 sm:col-span-2"
                >
                  <Mail className="w-4 h-4 text-[#b8860b] shrink-0" />
                  <span className="truncate font-sans font-medium">suchita135sancheti@gmail.com</span>
                </a>
                <a 
                  href="https://wa.me/919325346704" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-all flex items-center gap-3 border border-white/5 p-3 bg-white/[0.02] hover:bg-white/[0.04] transition-colors col-span-1 sm:col-span-2"
                >
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="truncate font-sans font-medium">WhatsApp / Call: +91 9325346704</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
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
        </div>

        <div className="bg-[#111111] p-10 text-white mt-12 rounded-xs border border-[#b8860b]/20">
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
