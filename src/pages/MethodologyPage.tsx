import React from 'react';
import { 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  Search, 
  Cpu, 
  Sliders, 
  Radio, 
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

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
    <div className="min-h-screen bg-[#0b0c10] text-[#e0e2ec] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-widest text-[#d4af37]">
            <Layers className="w-4 h-4 text-[#d4af37]" />
            <span>The TULC Architecture</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-prestige font-bold text-white tracking-tight">
            The 4-Phase Alignment Protocol
          </h1>

          <p className="text-base text-[#9aa1b2] font-serif-prestige leading-relaxed">
            How we systematically transition high-growth organizations from exhausting, personality-driven firefighting to calm, predictable, and anti-fragile systemic authority.
          </p>
        </div>

        {/* Comparison Matrix Table */}
        <div className="bg-[#12141a] border border-[#1f232d] rounded-xs p-6 sm:p-8 space-y-6">
          <h2 className="text-xl font-serif-prestige font-bold text-white">
            Organizational Physics: The Fundamental Shift
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#181b24] text-white uppercase font-mono-tech text-[11px]">
                <tr>
                  <th className="p-3.5 border-b border-[#232734]">Performance Dimension</th>
                  <th className="p-3.5 border-b border-[#232734] text-rose-300">The Reactive Firefighter Model</th>
                  <th className="p-3.5 border-b border-[#232734] text-[#d4af37]">The Calibrated TULC Substrate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e222e] text-[#9aa1b2]">
                <tr>
                  <td className="p-3.5 font-bold text-white">Decision Velocity</td>
                  <td className="p-3.5">2 to 4 weeks trapped in approval queues</td>
                  <td className="p-3.5 text-white font-medium">Under 24 hours via automated delegation gates</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-white">Founder Role</td>
                  <td className="p-3.5">Chief exception handler and daily router</td>
                  <td className="p-3.5 text-white font-medium">Sovereign systems architect & capital allocator</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-white">Executive Meetings</td>
                  <td className="p-3.5">20+ hours weekly of circular status syncs</td>
                  <td className="p-3.5 text-white font-medium">Under 4 hours, focused strictly on market growth</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-bold text-white">Exit Valuation</td>
                  <td className="p-3.5">Discounted heavily due to single-person risk</td>
                  <td className="p-3.5 text-white font-medium">Maximum institutional multiple for self-running asset</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 4 Phases Breakdown */}
        <div className="space-y-8">
          {phases.map((phase) => (
            <div
              key={phase.number}
              className="bg-[#12141a] border border-[#1f232d] hover:border-[#b8860b]/50 transition-all rounded-xs p-6 sm:p-10 space-y-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl sm:text-3xl font-mono-tech font-bold text-[#b8860b]">{phase.number}</span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-serif-prestige font-bold text-white">
                    {phase.title}
                  </h3>
                  <div className="text-xs font-mono-tech text-[#7d8495]">{phase.subtitle}</div>
                </div>
              </div>

              <p className="text-sm sm:text-base text-[#c8cde0] font-serif-prestige leading-relaxed pt-2">
                {phase.description}
              </p>

              <div className="pt-4 border-t border-[#1f232d] space-y-2">
                <span className="text-xs uppercase font-bold text-[#d4af37] tracking-wider font-mono-tech">
                  Key Phase Deliverables:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  {phase.deliverables.map((d, idx) => (
                    <div key={idx} className="p-3 bg-[#171a23] border border-[#232734] rounded-xs text-xs text-[#9aa1b2] flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37] shrink-0 mt-0.5" />
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Final CTA */}
        <div className="p-8 sm:p-10 bg-[#13161f] border border-[#b8860b]/40 rounded-xs text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-serif-prestige font-bold text-white">
            Ready to Install the Alignment Protocol?
          </h2>
          <p className="text-sm text-[#9aa1b2] max-w-xl mx-auto leading-relaxed">
            Begin with the 90-second Inaction Tax Diagnostic or submit your executive parameters for direct review by Principal Suchita Sancheti.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/intake"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#b8860b] hover:bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider rounded-xs transition-colors"
            >
              <span>Submit Sovereign Intake</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/assessment"
              className="inline-flex items-center gap-2 px-8 py-3 bg-[#181b24] hover:bg-[#222634] text-white font-semibold text-xs uppercase tracking-wider rounded-xs border border-[#262a38] transition-colors"
            >
              <span>Take Inaction Tax Diagnostic</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
