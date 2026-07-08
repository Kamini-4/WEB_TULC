import React from 'react';
import { Target, Users, Shield, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

const WhoWeBuildFor: React.FC = () => {
  const profiles = [
    {
      icon: <Target className="w-5 h-5 text-[#b8860b]" />,
      category: "High-Growth Founders",
      title: "The Visionary Trap",
      description: "Scaling past $10M+ but spending 40% of your time in meeting-tax loops and manual alignment checks instead of strategic command.",
      outcome: "Autonomous alignment frameworks that guarantee standard quality execution without your live presence."
    },
    {
      icon: <Users className="w-5 h-5 text-[#b8860b]" />,
      category: "Institutional Leaders",
      title: "Sovereign Operations",
      description: "Enterprise CEOs, family offices, and executives drowning in coordination drag, wanting to transition their teams to self-cohering operating systems.",
      outcome: "Absolute alignment on mission targets, hard-coded accountability matrices, and zero-loss delegation."
    },
    {
      icon: <Shield className="w-5 h-5 text-[#b8860b]" />,
      category: "VC & PE Partners",
      title: "Portfolio Safeguarding",
      description: "Investors looking to audit, calibrate, and secure the operational capability of portfolio executive teams to ensure rapid decision velocity.",
      outcome: "High-fidelity diagnostic telemetry and structured leadership guardrails to de-risk founder dependencies."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  return (
    <section id="who-is-this-for" className="py-24 md:py-32 bg-white relative overflow-hidden border-b border-zinc-200/50">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #b8860b 1px, transparent 0)`, backgroundSize: '32px 32px' }} />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          className="max-w-3xl mb-16 md:mb-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={containerVariants}
        >
          <motion.span className="text-[#b8860b] text-[10px] font-black uppercase tracking-[0.4em] block mb-4" variants={itemVariants}>
            Target Alignment Profiles
          </motion.span>
          <motion.h2 className="text-4xl md:text-6xl font-bold text-zinc-950 leading-tight tracking-tight mb-6" variants={itemVariants}>
            Built for those who lead by <span className="italic font-light">design</span>, not by <span className="italic text-[#b8860b] font-medium">reaction.</span>
          </motion.h2>
          <motion.div className="h-[2px] w-20 bg-[#b8860b] mb-6" variants={itemVariants} />
          <motion.p className="text-zinc-600 text-base md:text-lg italic font-light leading-relaxed" variants={itemVariants}>
            The Unbounded Leadership methodology is exclusive to high-leverage decision-makers who recognize that their personal time is the ultimate rate-limiting substrate of their business.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={containerVariants}
        >
          {profiles.map((profile, idx) => (
            <motion.div 
              key={idx} 
              className="p-8 md:p-10 bg-zinc-50 border border-zinc-200/60 transition-all duration-500 flex flex-col justify-between group relative"
              variants={itemVariants}
              whileHover={{
                y: -6,
                borderColor: 'rgba(184, 134, 11, 0.4)',
                backgroundColor: '#ffffff',
                boxShadow: '0 20px 40px rgba(184, 134, 11, 0.05)'
              }}
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="p-3 bg-white border border-zinc-200 rounded-none group-hover:border-[#b8860b]/30 transition-colors">
                    {profile.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#b8860b]">
                    Profile 0{idx + 1}
                  </span>
                </div>

                <span className="text-zinc-400 text-[9px] font-black uppercase tracking-[0.3em] block mb-2">
                  {profile.category}
                </span>
                <h3 className="text-xl font-bold text-zinc-900 mb-4 tracking-tight">
                  {profile.title}
                </h3>
                <p className="text-zinc-600 text-xs italic font-light leading-relaxed mb-8">
                  "{profile.description}"
                </p>
              </div>

              <div className="pt-6 border-t border-zinc-200/60 group-hover:border-[#b8860b]/20 transition-colors">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-900 block mb-2">
                  Alignment Outcome:
                </span>
                <p className="text-zinc-700 text-xs font-medium leading-relaxed flex items-start gap-2">
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#b8860b] shrink-0 mt-0.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                  <span>{profile.outcome}</span>
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest italic">
            * Strict selection protocol: We accept only 3 new corporate clients per quarter to preserve operational depth.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoWeBuildFor;
