import React from 'react';
import { 
  Layers, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { InternalLinksMatrix } from '../components/InternalLinksMatrix';

export const MethodologyPage: React.FC = () => {
  const phases = [
    {
      number: '01',
      title: 'Phase I: Heuristic Extraction & Friction Telemetry',
      subtitle: 'Mapping the Unwritten Operating Logic',
      description: 'We audit the implicit decision rules trapped inside the founder\'s brain. Using proprietary cognitive taxonomy models, we uncover why exceptions escalate, where latency accumulates, and which decisions burn executive energy.',
      deliverables: [
        'Cognitive Tax & Meeting Density Audit',
        'Implicit Taste & Quality Criteria Codex',
        'Friction Heatmap across C-Suite and Edge Teams'
      ]
    },
    {
      number: '02',
      title: 'Phase II: Invariant Formulation & Guardrail Architecture',
      subtitle: 'Converting Intuition into Hard-Coded Rules',
      description: 'We synthesize extracted heuristics into binary pass/fail guardrails. We define explicit financial thresholds, brand safety criteria, and pre-approved action envelopes that remove all guessing.',
      deliverables: [
        'Executive Authority Reservation Matrix',
        'Tiered Capital & Spend Authorization Gates',
        'Operational Non-Negotiables (Quality Invariants)'
      ]
    },
    {
      number: '03',
      title: 'Phase III: Substrate Compilation & Operational Embedding',
      subtitle: 'Integrating Logic Directly into Enterprise Software',
      description: 'Slide decks do not execute; software workflows do. We compile the newly defined operating criteria into daily project management runbooks, hiring filters, and automated review gates.',
      deliverables: [
        '1-Page Structured Decision Memo Protocol',
        'Asynchronous Reporting Rhythms (Replacing Status Syncs)',
        'Edge Delegation Envelopes with Autonomous Sign-Off'
      ]
    },
    {
      number: '04',
      title: 'Phase IV: Autonomous Telemetry & Anti-Entropy Calibration',
      subtitle: 'Continuous Verification & Strategic Primacy',
      description: 'We install live telemetry dashboards that monitor decision turnaround velocity, executive meeting density, and strategic fidelity in real time. Leadership catches drift weeks before it affects quarterly earnings.',
      deliverables: [
        'Decision Velocity Index (DVI) Telemetry Dashboard',
        'Quarterly Anti-Entropy Drift Recalibration',
        '15 to 20 Hours of Weekly CEO Bandwidth Permanently Restored'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#f7f4ee] text-[#1c1917] font-serif">
      <SEOHead
        title="Systemic Methodology & Sovereign Governance Architecture"
        description="The 4-phase alignment protocol, cybernetic feedback loops, invariant decision substrates, and cognitive load theory applied to enterprise scale."
        canonicalPath="/methodology"
        keywords="leadership methodology, 4-phase alignment protocol, invariant decision substrates, cybernetic management, step-away test, suchita sancheti"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Systemic Methodology', path: '/methodology' }
        ]}
      />
      <Breadcrumbs items={[{ name: 'Systemic Methodology', path: '/methodology' }]} />

      <div className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto space-y-8 sm:space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-tight text-[#8c6708] font-bold">
            <Layers className="w-4 h-4 text-[#8c6708]" />
            <span>The TULC Architecture</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1c1917] tracking-tight font-serif">
            The 4-Phase Alignment Protocol
          </h1>

          <p className="text-sm sm:text-base text-[#57534e] font-serif leading-relaxed">
            How we systematically transition high-growth organizations from exhausting, personality-driven firefighting to calm, predictable, and anti-fragile systemic authority.
          </p>
        </div>

        {/* Comparison Matrix Table */}
        <div className="bg-[#ffffff] border border-[#ded6c5] rounded-xs p-5 sm:p-7 space-y-4 shadow-2xs">
          <h2 className="text-lg sm:text-xl font-bold font-serif text-[#1c1917]">
            Organizational Physics: The Fundamental Shift
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm font-serif">
              <thead className="bg-[#efebe2] text-[#1c1917] uppercase text-[11px] font-serif font-bold">
                <tr>
                  <th className="p-3 border-b border-[#ded6c5]">Performance Dimension</th>
                  <th className="p-3 border-b border-[#ded6c5] text-rose-800">The Reactive Firefighter Model</th>
                  <th className="p-3 border-b border-[#ded6c5] text-[#8c6708]">The Calibrated TULC Substrate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ded6c5] text-[#57534e]">
                <tr>
                  <td className="p-3 font-bold text-[#1c1917]">Decision Velocity</td>
                  <td className="p-3">2 to 4 weeks trapped in approval queues</td>
                  <td className="p-3 text-[#1c1917] font-semibold">Under 24 hours via automated delegation gates</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-[#1c1917]">Founder Role</td>
                  <td className="p-3">Chief exception handler and daily router</td>
                  <td className="p-3 text-[#1c1917] font-semibold">Sovereign systems architect & capital allocator</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-[#1c1917]">Executive Meetings</td>
                  <td className="p-3">20+ hours weekly of circular status syncs</td>
                  <td className="p-3 text-[#1c1917] font-semibold">Under 4 hours, focused on market growth</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-[#1c1917]">Exit Valuation</td>
                  <td className="p-3">Discounted heavily due to single-person risk</td>
                  <td className="p-3 text-[#1c1917] font-semibold">Maximum institutional multiple for self-running asset</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 4 Phases Breakdown */}
        <div className="space-y-5 sm:space-y-6">
          {phases.map((phase) => (
            <div
              key={phase.number}
              className="bg-[#ffffff] border border-[#ded6c5] hover:border-[#b8860b]/50 transition-all rounded-xs p-5 sm:p-7 space-y-3.5 shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl sm:text-3xl font-bold text-[#8c6708] font-serif">{phase.number}</span>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#1c1917] font-serif">
                    {phase.title}
                  </h3>
                  <div className="text-xs text-[#78716c] font-serif">{phase.subtitle}</div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#57534e] font-serif leading-relaxed pt-1">
                {phase.description}
              </p>

              <div className="pt-3 border-t border-[#e2dcce] space-y-1.5">
                <span className="text-xs uppercase font-bold text-[#8c6708] tracking-tight font-serif">
                  Key Phase Deliverables:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                  {phase.deliverables.map((d, idx) => (
                    <div key={idx} className="p-2.5 bg-[#faf8f5] border border-[#ded6c5] rounded-xs text-xs text-[#57534e] flex items-start gap-2 font-serif">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#8c6708] shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="p-6 sm:p-8 bg-gradient-to-br from-[#ffffff] via-[#faf8f5] to-[#efebe2] border border-[#b8860b]/30 rounded-xs text-center space-y-4 shadow-xs">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1c1917] font-serif">
            Ready to Install the Alignment Protocol?
          </h2>
          <p className="text-xs sm:text-sm text-[#57534e] max-w-xl mx-auto leading-relaxed font-serif">
            Begin with the Two-Week Tension Test or submit your executive parameters for direct review by Suchita Sancheti.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
            <Link
              to="/intake"
              className="inline-flex items-center gap-2 px-7 py-3 bg-black hover:bg-[#b8860b] text-white font-bold text-xs uppercase tracking-tight rounded-xs transition-colors shadow-xs"
            >
              <span>Submit Sovereign Intake</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/assessment"
              className="inline-flex items-center gap-2 px-7 py-3 bg-[#ffffff] hover:bg-[#efebe2] text-[#1c1917] font-semibold text-xs uppercase tracking-tight rounded-xs border border-[#ded6c5] transition-colors"
            >
              <span>Take Two-Week Test</span>
            </Link>
          </div>
        </div>

      </div>
    </div>

    {/* Institutional Internal Linking Matrix */}
    <InternalLinksMatrix currentPath="/methodology" />
  </div>
);
};
