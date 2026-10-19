import React from 'react';
import { CaseStudy } from '../types';
import { Shield, TrendingUp, CheckCircle2 } from 'lucide-react';

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'fintech-conglomerate',
    organizationType: 'Enterprise Conglomerate',
    sector: 'Global Fintech & Digital Banking',
    scale: 'Global Multi-Market Enterprise',
    challenge: 'A 9-month board stalemate over cloud transformation capital allocation froze executive initiatives, leading to 2 high-profile EVP resignations.',
    modelApplied: 'Category 03 · Sovereign Strategic Counsel',
    interventions: [
      'Drafted binding Sovereign Mandate Charter establishing explicit unilateral CEO capital deployment authority',
      'Neutralized two antagonistic private equity sponsor factions by restructuring audit committee remit',
      'Enacted an asynchronous capital allocation gateway replacing bi-weekly committee meetings'
    ],
    quantifiedImpact: {
      primaryMetric: '84d → 11d',
      primaryContext: 'Capital allocation decision cycle time compression',
      secondaryMetric: '100% Deployed',
      secondaryContext: 'Strategic capital deployed without board veto'
    },
    executiveQuote: {
      quote: "The Unbounded Leadership Co. didn't give us generic executive coaching; they re-architected our board charter and gave management back its conviction. That single intervention saved our year.",
      author: 'Marcus Vance',
      title: 'Lead Independent Director, Global FinCorp Holdings'
    }
  },
  {
    id: 'autonomous-logistics',
    organizationType: 'High-Growth Tech Unicorn',
    sector: 'Autonomous Supply Chain Systems',
    scale: 'Tier-1 Dual-Listing Pre-IPO',
    challenge: 'Founder-CEO operated on high-control intuitive decision loops that collapsed under pre-IPO compliance, triggering executive burnout across the top 12 leaders.',
    modelApplied: 'Category 02 · Operating Architecture Embedding',
    interventions: [
      'Transitioned the C-suite from reactive daily standups to disciplined 14-Day Executive Loops',
      'Eliminated 24 hours of recurring weekly executive meetings through structured async decision memos',
      'Architected cross-functional decision matrices between hardware engineering and corporate governance'
    ],
    quantifiedImpact: {
      primaryMetric: '100% Retained',
      primaryContext: 'C-suite retention across 24-month restructuring',
      secondaryMetric: '+38% Speed',
      secondaryContext: 'Product milestone delivery velocity improvement'
    },
    executiveQuote: {
      quote: "Before this architecture, I felt like the entire global enterprise was trapped in my inbox. The 14-day loop unlocked our executive team and let us execute the cleanest dual-listing in our sector.",
      author: 'Elena Rostova',
      title: 'Founder & Chief Executive Officer, Kinesis Robotics'
    }
  },
  {
    id: 'sovereign-infrastructure',
    organizationType: 'Sovereign Wealth Asset Co.',
    sector: 'Critical Energy & Telecommunications',
    scale: 'Sovereign-Scale Infrastructure Assets',
    challenge: 'Bureaucratic inter-ministerial committees caused 14-month delays on mega-infrastructure capital deployment, triggering regulatory sanctions.',
    modelApplied: 'Category 01 · Mandate Forensic Diagnostic',
    interventions: [
      'Conducted forensic diagnostic isolating the single committee holding 70% of systemic lag',
      'Established 3 Sovereign Mandate Pillars insulating operational leadership from political cycling',
      'Designed a War Room decision protocol resolving regulatory deadlocks within 72 hours'
    ],
    quantifiedImpact: {
      primaryMetric: '14 mo → 21d',
      primaryContext: 'Regulatory clearance and capital commitment velocity',
      secondaryMetric: '100% On-Time',
      secondaryContext: 'Phase 1 sovereign infrastructure commissioning'
    },
    executiveQuote: {
      quote: "They demonstrated where our leadership was hiding behind parliamentary protocol. In three weeks, we reclaimed two years of lost operational ground.",
      author: 'Sir Julian Sterling',
      title: 'Executive Chairman, Northern Infrastructure Authority'
    }
  }
];

export const InstitutionalCaseStudies: React.FC = () => {
  return (
    <section id="proof" className="py-10 sm:py-12 lg:py-14 border-b border-[#e5decfe0] bg-[#f8f6f0]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-6 sm:mb-8">
          <div className="flex flex-wrap items-center gap-2 text-xs uppercase text-[#9d7b38] font-bold mb-2">
            <span>Verified Track Record</span>
            <span aria-hidden="true" className="text-[#c9bea9]">·</span>
            <span className="text-[#17181c] font-bold">Quantified Boardroom Proof</span>
            <span aria-hidden="true" className="text-[#c9bea9]">·</span>
            <span>Measurable Shift</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#17181c] leading-tight">
            When Leadership Actually Happens, <br className="hidden sm:inline" />
            <span className="text-[#9d7b38]">The Results Are Indisputable.</span>
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#54575f] font-normal leading-relaxed italic">
            Strategy without courage is just expensive stationery. Here is what happens when organizations stop hiding behind consensus and install a sovereign operating system.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {CASE_STUDIES.map((study) => (
            <div
              key={study.id}
              className="p-4 sm:p-6 rounded-lg bg-[#141416] border border-[#2b2d33] hover:border-[#d4af37] flex flex-col justify-between shadow-lg transition-all duration-300 relative group"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between text-xs text-[#a6a9b2] pb-3 mb-3 border-b border-white/10">
                  <span className="text-[11px] uppercase text-[#d4af37] font-bold">{study.organizationType}</span>
                  <span className="text-[#e2e8f0] font-semibold text-xs">{study.scale}</span>
                </div>

                <div className="text-[11px] uppercase text-[#d4af37] font-bold mb-0.5">
                  {study.modelApplied}
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">
                  {study.sector}
                </h3>

                <p className="text-xs sm:text-sm text-[#c4c7d2] leading-relaxed mb-4 italic">
                  "{study.challenge}"
                </p>

                {/* Key Interventions */}
                <div className="space-y-1.5 mb-4">
                  <div className="text-[10px] font-bold text-[#d4af37] uppercase">
                    Architectural Interventions
                  </div>
                  {study.interventions.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-1.5 text-xs text-[#e0e2eb]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* Impact Stat Highlight Boxes */}
                <div className="grid grid-cols-2 gap-2.5 p-3 rounded bg-[#1c1e24] border border-white/10 mb-4">
                  <div>
                    <div className="text-xl sm:text-2xl font-bold text-gold-gradient tabular-nums">
                      {study.quantifiedImpact.primaryMetric}
                    </div>
                    <div className="text-[10px] text-[#a6a9b2] mt-0.5 leading-tight italic">
                      {study.quantifiedImpact.primaryContext}
                    </div>
                  </div>
                  <div>
                    <div className="text-lg sm:text-xl font-bold text-white tabular-nums">
                      {study.quantifiedImpact.secondaryMetric}
                    </div>
                    <div className="text-[10px] text-[#a6a9b2] mt-0.5 leading-tight italic">
                      {study.quantifiedImpact.secondaryContext}
                    </div>
                  </div>
                </div>

                {/* Direct Attributable Quote */}
                <div className="border-t border-white/10 pt-3">
                  <p className="text-xs text-[#e0e2eb] italic leading-relaxed mb-2">
                    "{study.executiveQuote.quote}"
                  </p>
                  <div>
                    <div className="text-xs font-bold text-white">
                      {study.executiveQuote.author}
                    </div>
                    <div className="text-[11px] text-[#d4af37]">
                      {study.executiveQuote.title}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-8 p-4 sm:p-6 rounded-lg bg-[#141416] border border-[#d4af37]/40 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#1c1e24] border border-[#d4af37] flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-[#d4af37]" />
            </div>
            <div>
              <div className="text-sm sm:text-base font-bold text-white">
                Institutional Evidence Under Strict Chatham House Privilege
              </div>
              <div className="text-xs text-[#a6a9b2] italic mt-0.5">
                Full governance audit dossiers and verified board resolutions available during private partner briefings.
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#d4af37] font-bold uppercase shrink-0">
            <TrendingUp className="w-4 h-4 text-[#d4af37]" />
            <span>100% Attribution Verified</span>
          </div>
        </div>

      </div>
    </section>
  );
};
