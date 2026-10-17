import React from 'react';
import { XCircle, CheckCircle2, AlertTriangle, ShieldCheck, ChevronRight, Target, Flame, Anchor } from 'lucide-react';

interface TribeManifestoProps {
  onTakeDiagnostic: () => void;
  openCalibrationModal: () => void;
}

export const TribeManifesto: React.FC<TribeManifestoProps> = ({
  onTakeDiagnostic,
  openCalibrationModal
}) => {
  return (
    <div className="space-y-24 py-12">
      {/* 1. The Polarization Matrix: What We Reject vs What We Build */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-amber-400 font-mono text-xs uppercase tracking-widest mb-3">
            Constructive Tension & Polarization
          </div>
          <h2 className="serif-heading text-3xl sm:text-5xl font-bold text-zinc-100 tracking-tight">
            The Two Destinies of the Enterprise Leader
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg mt-4 font-light">
            First principles teach us that contrast creates clarity. You cannot claim sovereign leadership while endorsing the behaviors of an overworked operator.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Column 1: What the Tribe Rejects (The Firefighting Operator) */}
          <div className="p-8 rounded-xl bg-zinc-950 border border-red-950/60 relative overflow-hidden group hover:border-red-900/80 transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-1 bg-red-600/40"></div>
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-xs uppercase tracking-widest text-red-400 font-semibold flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-400" />
                The Heroic Operator Trap (Status Quo)
              </span>
              <span className="text-xs px-2.5 py-1 rounded bg-red-950/40 text-red-300 border border-red-900/40 font-mono">
                Fragile Scale
              </span>
            </div>

            <h3 className="serif-heading text-2xl font-bold text-zinc-200 mb-4">
              What the Sovereign Tribe Rejects
            </h3>

            <ul className="space-y-4 text-sm text-zinc-300">
              <li className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-zinc-100">The 80-Hour Workweek Myth:</strong> Wearing exhaustion and sleep deprivation as a badge of honor while decision quality degrades.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-zinc-100">Constant Slack Responsiveness:</strong> Conditioning your team to ping you for every tiny ambiguity instead of cultivating autonomy.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-zinc-100">200-Page Consulting Decks:</strong> Paying millions for academic slide shows that gather dust and create zero operational compounding.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-zinc-100">Toxic Consensus Culture:</strong> Prolonging 10-person meetings to avoid individual accountability and decision ownership.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-zinc-100">Auditioning for RFPs:</strong> Begging corporate procurement departments for permission to solve their systemic crises.
                </div>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-zinc-900 text-xs text-zinc-500 italic">
              Result: High personal wealth, zero personal peace, and an enterprise that shatters the moment you step away.
            </div>
          </div>

          {/* Column 2: What the Tribe Installs (The Sovereign Architect) */}
          <div className="p-8 rounded-xl bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-amber-500/30 relative overflow-hidden shadow-xl shadow-amber-500/5 group hover:border-amber-400/60 transition-all duration-300">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-amber-600"></div>
            <div className="flex items-center justify-between mb-6">
              <span className="font-mono text-xs uppercase tracking-widest text-amber-400 font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                The Sovereign Architect (TULC Model)
              </span>
              <span className="text-xs px-2.5 py-1 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 font-mono">
                Durable Freedom
              </span>
            </div>

            <h3 className="serif-heading text-2xl font-bold text-zinc-100 mb-4">
              What We Install Permanently
            </h3>

            <ul className="space-y-4 text-sm text-zinc-200">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-zinc-100">Autonomous Governance Circuits:</strong> Lucid decision boundaries allowing directors to make $100k calls without bothering the CEO.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-zinc-100">Cognitive Surplus Protection:</strong> 15+ hours of uninterrupted strategic white-space booked weekly for synthesis and market moves.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-zinc-100">1-Page Sovereign Operating Treaty:</strong> An undeniable executive pact that takes minutes to read and permanently aligns the executive suite.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-zinc-100">Sovereign Standard of Excellence:</strong> Unspoken institutional laws defended autonomously by peer leaders, not policed by founders.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-zinc-100">Absolute Institutional Pull:</strong> Operating with such distinct excellence that clients and talent seek you out unconditionally.
                </div>
              </li>
            </ul>

            <div className="mt-8 pt-6 border-t border-zinc-800 text-xs text-amber-300/80 font-mono">
              Result: An enterprise that compounds faster while you sleep than it ever did while you were panicking.
            </div>
          </div>
        </div>
      </section>

      {/* 2. The 5 Institutional Domains of TULC Calibration */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-amber-400 font-mono text-xs uppercase tracking-widest mb-3">
            Proprietary Architecture
          </div>
          <h2 className="serif-heading text-3xl sm:text-5xl font-bold text-zinc-100 tracking-tight">
            The Five Sovereign Governance Domains
          </h2>
          <p className="text-zinc-400 text-base sm:text-lg mt-4 font-light">
            We do not offer fragmented advice. We calibrate your entire organization across five interlocking structural circuits.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg bg-zinc-900/60 border border-zinc-800 hover:border-amber-500/40 transition-all duration-300">
            <div className="w-10 h-10 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-mono font-bold text-sm mb-4">
              01
            </div>
            <h4 className="serif-heading text-xl font-bold text-zinc-100 mb-2">Cognitive Sovereignty</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Elimination of attention residue and notification churn. We construct an impenetrable moat around executive focus to preserve high-stakes judgment.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-zinc-900/60 border border-zinc-800 hover:border-amber-500/40 transition-all duration-300">
            <div className="w-10 h-10 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-mono font-bold text-sm mb-4">
              02
            </div>
            <h4 className="serif-heading text-xl font-bold text-zinc-100 mb-2">Decision Geometry</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Codifying decision rights and threshold matrices so 90% of tactical issues never reach the C-suite, reducing decision latency from days to minutes.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-zinc-900/60 border border-zinc-800 hover:border-amber-500/40 transition-all duration-300">
            <div className="w-10 h-10 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-mono font-bold text-sm mb-4">
              03
            </div>
            <h4 className="serif-heading text-xl font-bold text-zinc-100 mb-2">Tribal Accountability</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Transforming vague core values into self-enforcing sovereign law: An uncompromising institutional standard defended fiercely by peers.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-zinc-900/60 border border-zinc-800 hover:border-amber-500/40 transition-all duration-300 md:col-span-1">
            <div className="w-10 h-10 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-mono font-bold text-sm mb-4">
              04
            </div>
            <h4 className="serif-heading text-xl font-bold text-zinc-100 mb-2">Systemic Compounding</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Replacing heroic human interventions with durable operating scripts, ensuring that every quarter builds directly on the progress of the last.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-zinc-900/60 border border-zinc-800 hover:border-amber-500/40 transition-all duration-300 md:col-span-2">
            <div className="w-10 h-10 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-mono font-bold text-sm mb-4">
              05
            </div>
            <h4 className="serif-heading text-xl font-bold text-zinc-100 mb-2">Statesman Posture & Voice</h4>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Elevating the leader from a firefighting manager to a revered institutional statesman who commands boardroom confidence, attracts premier talent, and negotiates from sovereign pull.
            </p>
          </div>
        </div>
      </section>

      {/* 3. The Unapologetic Exclusion Matrix ("Who We Are NOT For") */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-2xl bg-zinc-950 border border-zinc-800 relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-400 mb-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                Principle X: Sovereign Exclusion Criteria
              </div>
              <h3 className="serif-heading text-3xl font-bold text-zinc-100">
                Who The Unbounded Leadership Co. Is NOT For
              </h3>
            </div>
            <div className="px-3 py-1 rounded bg-zinc-900 border border-zinc-800 text-zinc-400 font-mono text-xs text-right">
              We Disqualify &gt;80% of Inquiries
            </div>
          </div>

          <p className="text-sm text-zinc-400 mb-8 leading-relaxed">
            Following our foundational doctrine on radical alignment and selective partnership, we do not want to waste your time or ours. If any of the following describe your leadership philosophy, we respectfully recommend engaging a standard management consultancy instead:
          </p>

          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded bg-zinc-900/60 border border-zinc-800/80 flex items-start gap-3">
              <span className="text-red-400 font-mono font-bold text-xs">01</span>
              <div className="text-zinc-300">
                <strong className="text-zinc-100 block mb-0.5">Control Enthusiasts & Micromanagers:</strong>
                Leaders who derive their personal self-esteem from being the only person who can approve purchase orders or client emails.
              </div>
            </div>

            <div className="p-4 rounded bg-zinc-900/60 border border-zinc-800/80 flex items-start gap-3">
              <span className="text-red-400 font-mono font-bold text-xs">02</span>
              <div className="text-zinc-300">
                <strong className="text-zinc-100 block mb-0.5">Vanity Metric Seekers:</strong>
                Executives looking for awards, PR spin, or performative "thought leadership" rather than structural operating integrity.
              </div>
            </div>

            <div className="p-4 rounded bg-zinc-900/60 border border-zinc-800/80 flex items-start gap-3">
              <span className="text-red-400 font-mono font-bold text-xs">03</span>
              <div className="text-zinc-300">
                <strong className="text-zinc-100 block mb-0.5">Corporate RFP Bidders:</strong>
                Organizations bound by procurement committees requiring 3 competitive pitch decks and endless vendor comparison spreadsheets.
              </div>
            </div>

            <div className="p-4 rounded bg-zinc-900/60 border border-zinc-800/80 flex items-start gap-3">
              <span className="text-red-400 font-mono font-bold text-xs">04</span>
              <div className="text-zinc-300">
                <strong className="text-zinc-100 block mb-0.5">Habitual Excuse-Makers:</strong>
                Teams that blame their market, their staff, or their investors rather than taking ruthless responsibility for their organizational design.
              </div>
            </div>
          </div>

          <div className="mt-10 p-6 rounded-xl bg-amber-500/5 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="serif-heading text-lg font-bold text-amber-200">
                Do you recognize yourself in the Sovereign Tribe?
              </div>
              <div className="text-xs text-zinc-400 mt-1">
                Take our 5-minute diagnostic to determine your organization's exact calibration readiness.
              </div>
            </div>

            <button
              onClick={onTakeDiagnostic}
              className="px-6 py-3 rounded-sm bg-amber-400 text-zinc-950 font-semibold text-xs uppercase tracking-wider hover:bg-amber-300 transition-all shrink-0 cursor-pointer flex items-center gap-2"
            >
              <span>Take Diagnostic</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
