import React from 'react';
import { 
  Shield, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  FileCheck, 
  Scale, 
  TrendingUp,
  Cpu
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const ServicesPage: React.FC = () => {
  const mandates = [
    {
      id: 'sovereign_substrate',
      title: 'Mandate I: Sovereign Operating Substrate Engineering',
      tagline: 'Decoupling Enterprise Velocity from Founder Metabolic Burn',
      description: 'A comprehensive institutional architecture installation. We extract, compile, and embed your unique founder heuristics into self-executing operational criteria across leadership tiers.',
      deliverables: [
        'Heuristic Extraction & Codification Blueprint',
        'Invariant Decision Guardrails & Expenditure Envelopes',
        'Asymmetric Delegation Architecture (Zero-Bottleneck Framework)',
        'Weekly Operating Cadence & Asynchronous Telemetry Layer'
      ],
      idealFor: 'Founders & CEOs leading 25 to 500+ person enterprises experiencing calendar bloat and coordination friction.',
      timeframe: '90-Day Deep Architectural Installation'
    },
    {
      id: 'succession_threshold',
      title: 'Mandate II: Founder-to-Chairman Succession Architecture',
      tagline: 'Permanent Institutional Memory & Zero-Valuation-Drop Transition',
      description: 'Over 50% of executive successions destroy shareholder value due to unwritten intuition. We build mathematically defined authority brackets between the incoming CEO and Executive Chairman.',
      deliverables: [
        'Three-Bracket Leadership Threshold Model',
        'Sovereign Authority Reservation Matrix (M&A, Brand, Culture)',
        'Autonomous Operational Execution Envelopes for Incoming Executive',
        'Boardroom Conflict-Arbitration Protocols'
      ],
      idealFor: 'Founders stepping back to Chairman, multi-generational family enterprises, or private equity-backed exits.',
      timeframe: '6-Month Guided Sovereign Handover'
    },
    {
      id: 'vc_portfolio_telemetry',
      title: 'Mandate III: Venture & PE Portfolio Telemetry Substrates',
      tagline: 'Autonomous Operational Guardrails for Multi-Board Investment Partners',
      description: 'Stop burning general partner bandwidth on portfolio firefighting. We install automated operational telemetry across portfolio assets, replacing delayed board decks with real-time leading indicators.',
      deliverables: [
        'Decision Velocity Index (DVI) Portfolio Dashboard',
        'Standardized Cross-Portfolio Governance Protocols',
        'Pre-emptive Friction Neutralization Triggers',
        'Founder Decoupling Runbooks for Growth Assets'
      ],
      idealFor: 'Venture Capital GPs, Private Equity Operating Partners, and Institutional Board Directors.',
      timeframe: 'Annual Institutional Fund-Level Partnership'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#e0e2ec] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-widest text-[#d4af37]">
            <Shield className="w-4 h-4 text-[#d4af37]" />
            <span>Fiduciary Advisory Practices</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-prestige font-bold text-white tracking-tight">
            Institutional Mandates & Architectural Services
          </h1>

          <p className="text-base text-[#9aa1b2] font-serif-prestige leading-relaxed">
            We do not sell general coaching, time-management hacks, or motivational seminars. We engineer sovereign operating systems that turn fragile, founder-dependent ventures into permanent institutions.
          </p>
        </div>

        {/* Mandates Grid */}
        <div className="space-y-8">
          {mandates.map((m) => (
            <div 
              key={m.id}
              className="bg-[#12141a] border border-[#1f232d] hover:border-[#b8860b]/60 transition-all rounded-xs p-6 sm:p-10 shadow-xl space-y-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-[#1f232d] gap-2">
                <div>
                  <span className="text-xs font-mono-tech text-[#d4af37] uppercase tracking-wider">{m.timeframe}</span>
                  <h2 className="text-2xl sm:text-3xl font-serif-prestige font-bold text-white mt-1">
                    {m.title}
                  </h2>
                </div>
                <div className="text-xs font-mono-tech text-[#9aa1b2] bg-[#1a1d26] px-3 py-1.5 rounded-xs self-start md:self-auto">
                  {m.tagline}
                </div>
              </div>

              <p className="text-base text-[#c8cde0] font-serif-prestige leading-relaxed">
                {m.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-3">
                  <h3 className="text-xs uppercase font-bold text-white tracking-wider font-mono-tech">
                    Architectural Deliverables
                  </h3>
                  <ul className="space-y-2">
                    {m.deliverables.map((d, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-[#9aa1b2]">
                        <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-[#161922] p-5 rounded-xs border border-[#232734] space-y-3 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs uppercase font-bold text-[#d4af37] tracking-wider font-mono-tech mb-1">
                      Target Mandate Profile
                    </h3>
                    <p className="text-xs text-[#8c94a6] leading-relaxed">
                      {m.idealFor}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#232734]">
                    <Link
                      to="/intake"
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d4af37] hover:text-white transition-colors"
                    >
                      <span>Inquire About This Mandate</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Sovereign Protocol Summary */}
        <div className="bg-gradient-to-br from-[#1c1f2b] to-[#12141a] border border-[#b8860b]/40 rounded-xs p-8 sm:p-12 text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-serif-prestige font-bold text-white">
              Initiate a Confidential Strategic Engagement
            </h2>
            <p className="text-sm text-[#9aa1b2] font-serif-prestige leading-relaxed">
              Every advisory engagement begins with a private architectural audit conducted directly by Principal Suchita Sancheti. We work with a strictly capped cohort of 6 enterprise mandates per quarter.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/intake"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#b8860b] hover:bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider rounded-xs transition-colors"
            >
              <span>Submit Sovereign Intake</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/methodology"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#171a23] hover:bg-[#202432] text-white font-semibold text-xs uppercase tracking-wider rounded-xs border border-[#2b3040] transition-colors"
            >
              <span>Review 4-Phase Methodology</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
