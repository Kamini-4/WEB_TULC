import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Mic, CheckSquare, FileText, ArrowRight, TrendingUp, ShieldAlert, Award } from 'lucide-react';

const ThreePillars: React.FC = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  const pillars = [
    {
      id: '01',
      title: 'Sovereign Voice Mapping (Patent Pending)',
      subtitle: 'Cognitive Authority Protection',
      icon: <Mic className="w-5 h-5" />,
      tagline: 'Scale Your Strategic Reasoning Without Burning Out Your Daily Schedule',
      gains: [
        { label: 'Bandwidth Liberation', desc: 'Reclaim 15+ hours per week. Stop serving as the universal bottleneck and eliminate late-night context-switching.' },
        { label: 'Zero-Loss Delegation', desc: 'Your leadership team executes high-stakes decisions with 100% of your judgment—without booking check-in meetings.' },
        { label: 'The 30-Day Autonomy Test', desc: 'Step away from the business for 30 days with complete peace of mind, knowing operations maintain flawless momentum.' }
      ],
      monetization: 'Transforms founder intuition into a permanent institutional asset, eliminating single-point key-person risk.',
      iconColor: 'text-[#b8860b]',
      borderColor: 'border-[#b8860b]/20'
    },
    {
      id: '02',
      title: '10-Point Friction Audit (Patent Pending)',
      subtitle: 'Systemic Leakage Identification',
      icon: <CheckSquare className="w-5 h-5" />,
      tagline: 'Audit Your True Executive Latency and Stop Costly Coordination Drag',
      gains: [
        { label: 'EBITDA Margin Recovery', desc: 'Recover up to 15% of operating margins lost to slow decision cycles, meeting bloat, and alignment friction.' },
        { label: 'Cognitive Tax Valuation', desc: 'Quantify the exact financial and emotional penalty your enterprise pays daily for organizational drag.' },
        { label: 'Rapid Execution Velocity', desc: 'Compress multi-week approval cycles into real-time autonomous execution protocols across your 5 core domains.' }
      ],
      monetization: 'Pinpoints the exact systemic constraints preventing the transition from tactical firefighting to enterprise architecture.',
      iconColor: 'text-[#b8860b]',
      borderColor: 'border-[#b8860b]/20'
    },
    {
      id: '03',
      title: 'Confidential Strategic Dossier (Patent Pending)',
      subtitle: 'The Alignment Premium Blueprint',
      icon: <FileText className="w-5 h-5" />,
      tagline: 'A Board-Ready Intelligence Report Valuing Your Enterprise Multiple',
      gains: [
        { label: 'Valuation Multiple Premium', desc: 'Eliminate key-person risk to command higher valuation multiples from VCs, PE buyers, and strategic acquirers.' },
        { label: 'Targeted Calibration Roadmap', desc: 'Acquire clear structural prescriptions mapped to your exact scaling bottlenecks and headcount milestones.' },
        { label: 'Direct Access Path', desc: 'Submit pre-calibrated diagnostic findings directly to Suchita Sancheti’s office to fast-track your Phase 0.0 Diagnostic Audit.' }
      ],
      monetization: 'Provides an immediate, boardroom-grade strategic asset valuing your efficiency gaps and detailing the exact roadmap to capture that premium.',
      iconColor: 'text-[#b8860b]',
      borderColor: 'border-[#b8860b]/20'
    }
  ];

  return (
    <section id="three-pillars" className="py-24 sm:py-32 bg-white relative overflow-hidden border-b border-zinc-200">
      {/* Visual Accent */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#b8860b]/3 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-zinc-100 blur-[80px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-8 h-px bg-[#b8860b]" />
            <span className="text-[#b8860b] text-[10px] font-black uppercase ">The Strategic Infrastructure</span>
            <div className="w-8 h-px bg-[#b8860b]" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-[#111111] mb-6 font-serif">
            The Three Pillars of <br />
            <span className="italic text-[#b8860b]">Institutional Calibration.</span>
          </h2>
          
          <p className="text-zinc-600 text-base sm:text-lg italic font-light leading-relaxed max-w-2xl mx-auto">
            We don’t offer generic counseling. We engineer the structural logic-gates that turn your unique leadership intent into an automated, self-executing enterprise operating substrate.
          </p>
        </div>

        {/* Pillars Grid */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {pillars.map((pillar) => (
            <motion.div
              key={pillar.id}
              variants={itemVariants}
              className="bg-[#fdfdfb] border border-zinc-200/80 p-8 sm:p-10 flex flex-col justify-between hover:border-[#b8860b] hover:shadow-2xl transition-all duration-700 relative group"
            >
              {/* Corner Number */}
              <div className="absolute top-6 right-8 text-[#b8860b]/15 text-5xl font-black font-serif select-none group-hover:text-[#b8860b]/25 transition-colors duration-500">
                {pillar.id}
              </div>

              <div>
                {/* Header Icon & Title */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="p-3 bg-zinc-100 rounded-full text-zinc-500 group-hover:bg-[#b8860b]/10 group-hover:text-[#b8860b] transition-all duration-500">
                    {pillar.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#111111] group-hover:text-[#b8860b] transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-[#b8860b] text-[9px] font-black uppercase mt-0.5">
                      {pillar.subtitle}
                    </p>
                  </div>
                </div>

                {/* Tagline Hook */}
                <h4 className="text-sm font-bold text-zinc-800 italic mb-8 border-l-2 border-[#b8860b] pl-3 leading-relaxed">
                  "{pillar.tagline}"
                </h4>

                {/* Core Gains List */}
                <div className="space-y-6 mb-8">
                  <div className="text-[9px] font-black uppercase text-zinc-400 border-b border-zinc-100 pb-2">
                    What You Stand to Gain:
                  </div>
                  {pillar.gains.map((gain, idx) => (
                    <div key={idx} className="flex gap-4">
                      <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#b8860b] mt-1.5" />
                      <div>
                        <h5 className="text-[11px] font-bold uppercase text-zinc-900">
                          {gain.label}
                        </h5>
                        <p className="text-xs text-zinc-500 italic font-light leading-relaxed mt-0.5">
                          {gain.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Monetization / Strategic Value Callout */}
              <div className="mt-8 pt-6 border-t border-zinc-100">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-3.5 h-3.5 text-[#b8860b]" />
                  <span className="text-[9px] font-black uppercase text-zinc-500">
                    Institutional Asset Value:
                  </span>
                </div>
                <p className="text-xs text-zinc-700 italic font-medium leading-relaxed">
                  {pillar.monetization}
                </p>
              </div>

            </motion.div>
          ))}
        </motion.div>

        {/* CTA Integration */}
        <div className="mt-16 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="inline-flex flex-col sm:flex-row items-center gap-6 p-8 bg-[#111111] border border-zinc-800 text-white max-w-4xl w-full text-left"
          >
            <div className="flex-1">
              <span className="text-[#b8860b] text-[9px] font-black uppercase block mb-2">
                Qualifying for Calibration
              </span>
              <h4 className="text-xl font-bold italic mb-2">
                Ready to value your organizational alignment?
              </h4>
              <p className="text-zinc-300 text-xs font-light leading-relaxed">
                Take the first step to identify coordination drag and receive your confidential, multi-page Strategic Dossier. Our system validates vocal patterns and operational metrics in real-time.
              </p>
            </div>
            
            <button
              onClick={() => navigate('/assessment')}
              className="flex-shrink-0 px-8 py-4.5 bg-[#b8860b] text-white text-[10px] font-black uppercase hover:bg-white hover:text-black transition-all duration-500 flex items-center gap-3"
            >
              <span>Begin Strategic Audit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default ThreePillars;
