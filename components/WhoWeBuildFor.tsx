import React from 'react';
import { Target, Users, Shield, ArrowUpRight, Calculator, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const WhoWeBuildFor: React.FC = () => {
  const profiles = [
    {
      icon: <Target className="w-5 h-5 text-[#b8860b]" />,
      category: "High-Growth Founders",
      title: "The Visionary Bottleneck",
      description: "Scaling past 50+ headcount but spending 40% of your week resolving operational misalignment instead of expanding market dominance.",
      outcome: "Reclaim 15+ hours weekly. Your leadership team executes high-stakes decisions with 100% of your precision—without your daily involvement.",
      linkTrack: "/services",
      trackName: "90-Day Kinetic Alignment"
    },
    {
      icon: <Users className="w-5 h-5 text-[#b8860b]" />,
      category: "Institutional CEOs & C-Suites",
      title: "Coordination Drag & Meeting Tax",
      description: "Enterprise CEOs and leadership teams trapped in consensus meetings, multi-layered approvals, and strategic intent decay across verticals.",
      outcome: "Self-regulating operating execution protocols that compress multi-week approval cycles into real-time autonomous execution.",
      linkTrack: "/services",
      trackName: "Systemic Transformation"
    },
    {
      icon: <Shield className="w-5 h-5 text-[#b8860b]" />,
      category: "VC & PE Partners & Board Chairs",
      title: "Key-Person Risk & Valuation Drag",
      description: "Capital partners and board members needing to de-risk founder dependency, protect portfolio EBITDA margins, and command premium exit multiples.",
      outcome: "Institutional operating architecture that permanently eliminates single-point founder risk and unlocks premium enterprise valuation.",
      linkTrack: "/services",
      trackName: "Portfolio Governance Track"
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
        ease: [0.16, 1, 0.3, 1] as const
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
          <motion.span className="text-[#b8860b] text-[10px] font-black uppercase block mb-3" variants={itemVariants}>
            Target Alignment Profiles
          </motion.span>
          <motion.h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-zinc-950 leading-tight mb-4 font-serif" variants={itemVariants}>
            Built for leaders who govern by <span className="italic font-light">design</span>, not by <span className="italic text-[#b8860b] font-medium">reaction.</span>
          </motion.h2>
          <motion.div className="h-[2px] w-16 bg-[#b8860b] mb-4" variants={itemVariants} />
          <motion.p className="text-zinc-700 text-sm md:text-base italic font-light leading-relaxed" variants={itemVariants}>
            The Unbounded Leadership Co. partners with high-leverage decision-makers who recognize that executive time and clarity are the ultimate rate-limiting substrates of enterprise value. We walk alongside you through every step of implementation.
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
                  <span className="text-[10px] font-black uppercase text-[#b8860b]">
                    Profile 0{idx + 1}
                  </span>
                </div>

                <span className="text-zinc-400 text-[9px] font-black uppercase block mb-2">
                  {profile.category}
                </span>
                <h3 className="text-xl font-bold text-zinc-900 mb-4">
                  {profile.title}
                </h3>
                <p className="text-zinc-600 text-xs italic font-light leading-relaxed mb-8">
                  "{profile.description}"
                </p>
              </div>

              <div className="pt-6 border-t border-zinc-200/60 group-hover:border-[#b8860b]/20 transition-colors space-y-4">
                <div>
                  <span className="text-[9px] font-black uppercase text-zinc-900 block mb-2 font-mono">
                    Alignment Outcome:
                  </span>
                  <p className="text-zinc-700 text-xs font-medium leading-relaxed flex items-start gap-2">
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#b8860b] shrink-0 mt-0.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                    <span>{profile.outcome}</span>
                  </p>
                </div>

                {/* Profile-Specific Direct Interlinks */}
                <div className="pt-3 border-t border-zinc-200/40 flex items-center justify-between gap-2">
                  <Link 
                    to={profile.linkTrack}
                    className="text-[9px] font-mono font-bold text-zinc-800 hover:text-[#b8860b] flex items-center gap-1 uppercase transition-colors"
                  >
                    <span>{profile.trackName}</span>
                    <ArrowRight className="w-3 h-3 text-[#b8860b]" />
                  </Link>
                  <Link 
                    to="/assessment"
                    className="text-[8px] font-mono font-bold text-zinc-500 hover:text-[#b8860b] flex items-center gap-1 uppercase transition-colors"
                  >
                    <Calculator className="w-2.5 h-2.5 text-[#b8860b]" />
                    <span>Audit Profile</span>
                  </Link>
                </div>
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
          <p className="text-zinc-500 text-[10px] font-bold uppercase italic">
            * Strict selection protocol: We accept only 3 new corporate clients per quarter to preserve operational depth.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhoWeBuildFor;
