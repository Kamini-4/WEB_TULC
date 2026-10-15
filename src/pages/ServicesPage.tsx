import React, { useState } from 'react';
import { 
  Shield, 
  ArrowRight, 
  CheckCircle2, 
  Compass,
  Layers,
  Zap,
  Target,
  Award,
  Users,
  Flame,
  Key,
  Lock,
  Headphones,
  FileCheck,
  TrendingUp,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ConciergeModal } from '../../components/ConciergeModal';

export const ServicesPage: React.FC = () => {
  const [conciergeOpen, setConciergeOpen] = useState(false);

  // 1. The 4 Structural Architectural Mandates (Original Core Architecture)
  const structuralMandates = [
    {
      id: '01',
      code: 'MANDATE 01 // ARCHITECTURE',
      title: 'Alignment Architecture',
      tagline: 'Systemic Translation & Intent Fidelity',
      description: 'Comprehensive structural engineering of your organizational operating system. Eliminates intent decay across management layers so board-level decisions propagate directly to frontline operations without dilution or distortion.',
      deliverables: [
        'Organizational Alignment Diagnostic & Signal Mapping',
        'Decision Substrate & Delegation Boundary Blueprints',
        'Operating Cadence & Communication Signal Hierarchy',
        'Cross-Layer Translation Audit (CEO to Edge Delivery)'
      ],
      icon: Layers,
      idealFor: 'Enterprises ($10M–$100M+) where strategy loses 40%+ fidelity between the boardroom and operational execution.'
    },
    {
      id: '02',
      code: 'MANDATE 02 // BANDWIDTH',
      title: 'Executive Bandwidth Optimization',
      tagline: 'Reclaim 15–20 Hours Weekly of High-Stakes Focus',
      description: 'Systematically deconstructs the founder as the universal operational clearinghouse. We eliminate calendar sprawl, automate low-value exception handling, and install autonomous approval thresholds for all direct reports.',
      deliverables: [
        'Cognitive Tax & Meeting Overhead Audit',
        'Autonomous Signing Ceilings (Up to $50,000 without CEO sign-off)',
        'Asynchronous Communication & Escalation Protocols',
        'The Two-Week Step-Away Calibration Protocol'
      ],
      icon: Zap,
      idealFor: 'Apex founders spending over 25 hours weekly on tactical approvals, Slack pings, and internal status check-ins.'
    },
    {
      id: '03',
      code: 'MANDATE 03 // GOVERNANCE',
      title: 'Strategic Alignment Council',
      tagline: 'Continuous Sovereign Retainer & Board Seat',
      description: 'Objective, continuous governance advisory for founders, chairs, and executive committees. We provide external systemic integrity, monitoring organizational drift and insulating key strategic moves during high-stakes scaling.',
      deliverables: [
        'Bi-Annual Substrate Integrity & Friction Audits',
        'M&A and Executive Succession Transition Safeguards',
        'Executive Committee Constructive Tension Mediation',
        'Priority Advisory Access to Suchita Sancheti'
      ],
      icon: Shield,
      idealFor: 'Holding chairs, multi-entity conglomerates, and founders preparing for private equity recapitalization.'
    },
    {
      id: '04',
      code: 'MANDATE 04 // VELOCITY',
      title: 'Execution Velocity Protocol',
      tagline: '72-Hour Surgical Friction Intervention',
      description: 'Rapid diagnostic and structural interventions to eliminate coordination drag, double decision-to-execution frequency, and transform reactive managers into sovereign architects.',
      deliverables: [
        '72-Hour Rapid Diagnostic & Latency Readout',
        'Constraint Neutralization Action Plan',
        'Middle-Management Autonomy Re-Engineering',
        'Automated Velocity Telemetry & Execution Gates'
      ],
      icon: Target,
      idealFor: 'Growth-stage companies experiencing rapid operational slowing after Series B/C hiring rounds.'
    }
  ];

  // 2. The 3 Executive Partnership Tracks
  const partnerships = [
    {
      id: 'founder_freedom',
      tier: 'EXECUTIVE TRACK A',
      title: 'The Founder Freedom Mandate',
      tagline: 'Solve Architectural Decision Latency & Reclaim Strategic Offense',
      description: 'For enterprise founders running 20 to 500+ headcount teams who are exhausted from serving as the default clearinghouse for daily ambiguity. We turn your tacit judgment into unambiguous, self-executing operational guardrails so your leadership team moves with sovereign autonomy.',
      benefits: [
        'Codified Decision Covenants: Explicit criteria for hiring, capital deployment, and pricing trade-offs',
        'Safe Authority Boundaries: Frontline leaders make high-stakes operational moves without asking permission',
        'Meeting Elimination: Cut 60% of recurring status meetings and replace them with asynchronous execution gates',
        'The Two-Week Step-Away Test: You take 14 days completely offline and the company compounds in value'
      ],
      idealFor: 'Founders who built a high-value enterprise, but feel trapped adjudicating routine micro-decisions.',
      timeframe: '90-Day Sovereign Transformation'
    },
    {
      id: 'smooth_handover',
      tier: 'EXECUTIVE TRACK B',
      title: 'The Executive Succession & Transition Mandate',
      tagline: 'Step Back as Chairman Without Dropping Enterprise Valuation',
      description: 'Over 60% of executive successions stumble because the founder’s core intuition was never institutionalized. We extract your mental heuristics and codify them into sovereign governance law, allowing incoming CEOs and executives to operate with your exact strategic standards.',
      benefits: [
        'Crystal-Clear Role Boundaries: Unambiguous division of authority between Executive Chair and CEO',
        'Protected Institutional DNA: Your standards for brand equity, capital rigor, and culture remain non-negotiable',
        'Key-Person Valuation Protection: Acquirers and boards witness an asset that governs itself independently',
        'Permanent Sovereign Legacy: Step back knowing your life’s work compounds beyond your physical presence'
      ],
      idealFor: 'Founders elevating a successor CEO, transitioning to Chairman, or preparing for institutional recapitalization.',
      timeframe: '6-Month Structured Handover'
    },
    {
      id: 'portfolio_freedom',
      tier: 'EXECUTIVE TRACK C',
      title: 'Portfolio Enterprise Governance',
      tagline: 'Build Scalable Governance Across PE & VC Portfolios',
      description: 'For board chairs, private equity sponsors, and venture partners who need their portfolio CEOs to build autonomous leadership systems rather than burning out from heroic exhaustion. We install clear decision boundaries across portfolio companies so businesses scale smoothly.',
      benefits: [
        'Bottleneck Elimination: CEOs cease to be the single point of operational failure',
        'Early-Warning Telemetry: Detect operational drift and execution friction weeks before financial impact',
        'Valuation Multiple Defense: Eradicate key-person discounts during M&A and secondary recapitalizations',
        'Board Bandwidth Conservation: Eliminate crisis management and weekend firefighting calls'
      ],
      idealFor: 'Private Equity Operating Partners, Venture Capital Boards, and Multi-Entity Holding Chairs.',
      timeframe: 'Annual Institutional Partnership'
    }
  ];

  // 3. Seth Godin Thought Process Pillars
  const godinPillars = [
    {
      title: 'Constructive Tension',
      concept: 'The Catalyst of Real Transformation',
      description: 'Seth Godin taught us that growth requires tension—not destructive friction, but the productive tension between where your company is today and what it must become. We don’t pacify founders; we introduce the precise constructive tension needed to break through legacy comfort zones.',
      quote: '"If there’s no tension, there’s no change. Tension creates movement."'
    },
    {
      title: 'The Sovereign Tribe',
      concept: '"People Like Us Do Things Like This"',
      description: 'Culture is not a poster of corporate core values. Culture is the shared operating norms that frontline teams run when the founder is not in the room. We align your leadership tribe around non-negotiable standards of excellence, accountability, and autonomous execution.',
      quote: '"Culture beats strategy, so much that culture is strategy."'
    },
    {
      title: 'Permission Architecture & Edge Crafting',
      concept: 'Replacing Bureaucracy with Sovereign Boundaries',
      description: 'Traditional organizations use approvals to manage fear. Sovereign organizations use permission architecture. We define clear edge boundaries: where your team has 100% permission to execute, make mistakes, and move at market speed without waiting for executive sign-off.',
      quote: '"Do not seek more authority. Seek more responsibility and earn radical permission."'
    },
    {
      title: 'Emotional Labor over Firefighting',
      concept: 'The Discipline of Systems Leadership',
      description: 'Heroic firefighting feels productive and emotionally gratifying, but it is an addictive trap that caps enterprise value. True leadership architecture requires the emotional labor of building self-executing systems that make the founder obsolete in routine operations.',
      quote: '"The work is not about doing everything yourself. The work is building something that matters."'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f7f4ee] text-[#1c1917] py-10 sm:py-14 px-4 sm:px-6 lg:px-8 font-serif">
      <div className="max-w-6xl mx-auto space-y-12 sm:space-y-16">
        
        {/* Header - The Sovereign Covenant (Ambitious & Rigorous) */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-tight text-[#b8860b] font-bold font-mono">
            <Compass className="w-4 h-4 text-[#8c6708]" />
            <span>The Sovereign Covenant</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1c1917] tracking-tight leading-tight">
            Institutional Leadership Architecture: <span className="italic font-bold text-[#b8860b]">Sovereignty at Scale</span>
          </h1>

          <p className="text-base sm:text-lg text-[#57534e] leading-relaxed">
            We partner with ambitious founders, CEOs, and holding chairs ($10M–$100M+) to eliminate <strong className="text-[#1c1917] font-semibold">Architectural Decision Latency</strong>. We turn founder intuition into unambiguous, self-executing governance protocols so your enterprise compounds autonomously.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/assessment"
              className="px-5 py-2.5 bg-black hover:bg-[#8c6708] text-white text-xs font-bold uppercase tracking-tight rounded-xs transition-colors shadow-xs"
            >
              Take The Two-Week Test
            </Link>
            <button
              onClick={() => setConciergeOpen(true)}
              className="px-5 py-2.5 bg-white border border-[#b8860b]/50 hover:border-[#b8860b] text-[#8c6708] text-xs font-bold uppercase tracking-tight rounded-xs transition-colors cursor-pointer"
            >
              Consult Executive Concierge
            </button>
          </div>
        </div>

        {/* SECTION 1: THE 4 STRUCTURAL MANDATES (Restored Original Categories) */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#ded6c5] pb-4 gap-2">
            <div>
              <span className="text-xs font-mono uppercase text-[#8c6708] font-bold tracking-wider">
                Category 01 // Structural Engineering
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1c1917] font-serif">
                The 4 Architectural Mandates
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#78716c] italic max-w-md">
              Targeted systems interventions engineered for scale phases where traditional hierarchy creates coordination drag.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
            {structuralMandates.map((mandate) => {
              const Icon = mandate.icon;
              return (
                <div 
                  key={mandate.id}
                  className="bg-white border border-[#ded6c5] hover:border-[#b8860b] transition-all rounded-xs p-6 sm:p-7 shadow-2xs space-y-4 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold text-[#8c6708] tracking-widest uppercase">
                        {mandate.code}
                      </span>
                      <div className="w-8 h-8 rounded-xs bg-[#efebe2] border border-[#ded6c5] flex items-center justify-center text-[#8c6708] group-hover:bg-[#1c1917] group-hover:text-[#b8860b] transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-[#1c1917] font-serif group-hover:text-[#8c6708] transition-colors">
                      {mandate.title}
                    </h3>

                    <div className="text-xs text-[#8c6708] font-mono font-bold uppercase">
                      {mandate.tagline}
                    </div>

                    <p className="text-xs sm:text-sm text-[#57534e] leading-relaxed">
                      {mandate.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="border-t border-[#f0ebe0] pt-3">
                      <span className="text-[10px] font-mono uppercase font-bold text-[#1c1917] block mb-2">
                        Deliverable Architecture:
                      </span>
                      <ul className="space-y-1.5">
                        {mandate.deliverables.map((d, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-[#57534e]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#b8860b] shrink-0" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 bg-[#faf8f5] border border-[#ded6c5] rounded-xs text-[11px] text-[#78716c] italic">
                      <strong className="text-[#1c1917] not-italic block font-sans text-[10px] uppercase font-bold mb-0.5">Primary Target:</strong>
                      {mandate.idealFor}
                    </div>

                    <div className="pt-1 flex items-center gap-2">
                      <Link
                        to="/intake"
                        className="flex-1 py-2 text-center bg-[#1c1917] hover:bg-[#8c6708] text-white text-xs font-bold uppercase tracking-tight rounded-xs transition-colors"
                      >
                        Request Track Briefing
                      </Link>
                      <Link
                        to="/assessment"
                        className="px-4 py-2 border border-[#ded6c5] hover:border-[#b8860b] text-[#1c1917] text-xs font-bold uppercase tracking-tight rounded-xs transition-colors"
                      >
                        Audit
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: THE 3 EXECUTIVE PARTNERSHIP TRACKS */}
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[#ded6c5] pb-4 gap-2">
            <div>
              <span className="text-xs font-mono uppercase text-[#8c6708] font-bold tracking-wider">
                Category 02 // Executive Deployments
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1c1917] font-serif">
                Comprehensive Partnership Tracks
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#78716c] italic max-w-md">
              Full-spectrum institutional engagements designed for founders stepping from chief firefighter into sovereign governance.
            </p>
          </div>

          <div className="space-y-5 sm:space-y-6">
            {partnerships.map((p) => (
              <div 
                key={p.id}
                className="bg-[#ffffff] border border-[#ded6c5] hover:border-[#b8860b] transition-all rounded-xs p-6 sm:p-8 shadow-2xs space-y-5"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between pb-3.5 border-b border-[#e2dcce] gap-2">
                  <div>
                    <span className="text-xs text-[#b8860b] uppercase tracking-tight font-bold font-mono">{p.tier} • {p.timeframe}</span>
                    <h3 className="text-xl sm:text-2xl font-bold text-[#1c1917] mt-0.5 font-serif">
                      {p.title}
                    </h3>
                  </div>
                  <div className="text-xs text-[#57534e] bg-[#efebe2] px-3 py-1 rounded-xs self-start md:self-auto border border-[#ded6c5] font-medium tracking-tight">
                    {p.tagline}
                  </div>
                </div>

                <p className="text-sm sm:text-base text-[#57534e] leading-relaxed">
                  {p.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
                  <div className="space-y-2.5">
                    <h4 className="text-xs uppercase font-bold text-[#1c1917] tracking-tight">
                      Architectural Outcomes
                    </h4>
                    <ul className="space-y-2">
                      {p.benefits.map((b, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-[#57534e]">
                          <CheckCircle2 className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-[#faf8f5] p-4.5 rounded-xs border border-[#ded6c5] space-y-2.5 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs uppercase font-bold text-[#b8860b] tracking-tight mb-1">
                        Institutional Fit
                      </h4>
                      <p className="text-xs text-[#57534e] leading-relaxed">
                        {p.idealFor}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#ded6c5]/80 flex items-center justify-between gap-2">
                      <span className="text-[10px] text-[#78716c] font-mono uppercase font-bold">
                        Zero Consulting Slop Guarantee
                      </span>
                      <Link
                        to="/intake"
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-black hover:bg-[#8c6708] text-white text-xs font-bold uppercase tracking-tight rounded-xs transition-colors shrink-0"
                      >
                        <span>Apply For Track</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: EMBEDDED SETH GODIN THOUGHT PROCESS (Constructive Tension & Tribe) */}
        <div className="p-8 sm:p-10 md:p-12 bg-[#111111] border border-[#b8860b]/40 rounded-xs text-white shadow-xl space-y-8">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#b8860b]/20 border border-[#b8860b]/40 rounded-full text-[10px] font-mono uppercase text-[#b8860b] font-bold">
              <span>Philosophy & Governance Doctrine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-white leading-tight">
              The Seth Godin Thought Process: <span className="text-[#b8860b] italic font-serif">Constructive Tension & Tribal Governance</span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-serif italic">
              Why traditional management consultancies fail: They treat companies as mathematical spreadsheets. We apply Seth Godin's foundational doctrine: organizations are living tribes driven by tension, culture, and permission.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {godinPillars.map((pillar, idx) => (
              <div 
                key={idx}
                className="bg-white/5 border border-white/10 hover:border-[#b8860b]/60 p-6 rounded-xs space-y-3 transition-colors"
              >
                <div className="text-[10px] font-mono text-[#b8860b] uppercase font-bold tracking-wider">
                  Principle 0{idx + 1} // {pillar.concept}
                </div>
                <h3 className="text-lg font-bold font-serif text-white">
                  {pillar.title}
                </h3>
                <p className="text-xs text-zinc-300 leading-relaxed font-serif">
                  {pillar.description}
                </p>
                <div className="p-3 bg-black/40 border border-white/5 rounded-xs text-xs font-serif italic text-amber-200/90">
                  {pillar.quote}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
            <span className="text-zinc-400">
              Explore the full Seth Godin A–Z Strategic Playbook:
            </span>
            <Link
              to="/playbook"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#b8860b] hover:bg-[#8c6708] text-white font-bold uppercase rounded-xs transition-colors self-start sm:self-auto"
            >
              <span>Launch Playbook</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* SECTION 4: REPHRASED DECISION BOTTLENECKS (Surgical Clarity) */}
        <div className="p-8 sm:p-10 bg-white border border-[#ded6c5] rounded-xs space-y-5">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase text-[#8c6708] font-bold tracking-wider">
              Forensic Diagnosis // Beyond The Jargon
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1c1917] font-serif">
              What Is A "Decision Bottleneck" In Reality?
            </h2>
          </div>

          <p className="text-sm sm:text-base text-[#57534e] leading-relaxed">
            Many consultants casually throw around the word "bottleneck." In reality, a founder bottleneck is <strong className="text-[#1c1917]">Architectural Decision Latency</strong>:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-[#57534e]">
            <div className="p-4 bg-[#faf8f5] border border-[#ded6c5] rounded-xs space-y-1.5">
              <span className="font-mono text-[10px] font-bold text-[#8c6708] uppercase block">The Symptom</span>
              <h4 className="font-bold text-sm text-[#1c1917]">The Accidental Clearinghouse</h4>
              <p>Direct reports escalate routine decisions upward because ambiguity defaults to fear. The founder spends 15+ hours weekly approving basic trade-offs.</p>
            </div>
            <div className="p-4 bg-[#faf8f5] border border-[#ded6c5] rounded-xs space-y-1.5">
              <span className="font-mono text-[10px] font-bold text-[#8c6708] uppercase block">The Mechanism</span>
              <h4 className="font-bold text-sm text-[#1c1917]">Uncodified Risk Boundaries</h4>
              <p>Teams don't lack talent; they lack clear boundary protocols. When signing ceilings and acceptable risk thresholds aren't codified, scale collapses into micromanagement.</p>
            </div>
            <div className="p-4 bg-[#faf8f5] border border-[#ded6c5] rounded-xs space-y-1.5">
              <span className="font-mono text-[10px] font-bold text-[#8c6708] uppercase block">The Solution</span>
              <h4 className="font-bold text-sm text-[#1c1917]">Sovereign Execution Covenants</h4>
              <p>We hard-code your decision heuristics into organizational operating rules. Teams operate with 100% autonomy within explicit boundaries, liberating your calendar.</p>
            </div>
          </div>
        </div>

        {/* BOTTOM CALLOUT WITH CONCIERGE & PORTAL */}
        <div className="p-8 sm:p-10 bg-[#faf8f5] border border-[#b8860b]/40 rounded-xs flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#1c1917]">
              Ready to architect your leadership operating system?
            </h3>
            <p className="text-xs sm:text-sm text-[#57534e]">
              Coordinate directly with Suchita Sancheti at <a href="mailto:suchita@theunboundedleadership.com" className="text-[#8c6708] underline font-mono">suchita@theunboundedleadership.com</a> or initiate via the Executive Concierge.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setConciergeOpen(true)}
              className="px-5 py-2.5 bg-white border border-[#b8860b] text-[#8c6708] hover:text-[#1c1917] text-xs font-bold uppercase tracking-tight rounded-xs transition-colors cursor-pointer"
            >
              Open Concierge
            </button>
            <Link
              to="/portal"
              className="px-5 py-2.5 bg-[#1c1917] hover:bg-[#8c6708] text-white text-xs font-mono uppercase font-bold tracking-wider rounded-xs transition-colors inline-flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5 text-[#b8860b]" />
              <span>Enter Portal</span>
            </Link>
          </div>
        </div>

      </div>

      <ConciergeModal isOpen={conciergeOpen} onClose={() => setConciergeOpen(false)} />
    </div>
  );
};

export default ServicesPage;
