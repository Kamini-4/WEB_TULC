import React from 'react';
import { motion } from 'motion/react';
import { 
  FileCheck2, 
  Activity, 
  BookOpen, 
  DollarSign, 
  Compass, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { Link } from 'react-router-dom';

export interface DeliverableItem {
  id: string;
  code: string;
  title: string;
  phase: string;
  deliverable: string;
  format: string;
  utility: string;
  icon: React.ReactNode;
  auditStatus: string;
}

const deliverables: DeliverableItem[] = [
  {
    id: 'decision-rights',
    code: 'DEL-01',
    title: 'Hard-Coded Decision Rights Map',
    phase: 'Phase 02 • Execution Protocol Engineering',
    deliverable: 'Matrix of 12+ custom operational execution protocols defining explicit delegation parameters, expenditure limits, and automatic escalation pathways.',
    format: 'Executable Digital Codebook & Automated Rule Engine',
    utility: 'Eliminates 80% of daily "founder check-in" approval requests and transfers decision authority with zero risk.',
    icon: <FileCheck2 className="w-5 h-5 text-[#b8860b]" />,
    auditStatus: 'VERIFIED DELIVERABLE'
  },
  {
    id: 'telemetry-dashboard',
    code: 'DEL-02',
    title: 'Weekly Pulse Telemetry Dashboard',
    phase: 'Phase 03 • Systemic Calibration',
    deliverable: 'Live C-suite operational latency dashboard tracking micro-deltas, coordination drag, and alignment drift coefficients across teams.',
    format: 'Interactive C-Suite Telemetry Interface & Automated Board Briefs',
    utility: 'Provides real-time visibility into organizational velocity without holding a single status or alignment meeting.',
    icon: <Activity className="w-5 h-5 text-[#b8860b]" />,
    auditStatus: 'VERIFIED DELIVERABLE'
  },
  {
    id: 'governance-manual',
    code: 'DEL-03',
    title: 'Sovereign Governance Manual',
    phase: 'Phase 02 & 03 • Protocol Codification',
    deliverable: 'Bound institutional master document codifying the Founder’s precise strategic heuristics, risk thresholds, and operational values.',
    format: 'Hardcover Master Manual + Encrypted Digital Vault Archive',
    utility: 'Guarantees 100% strategic fidelity across global offices, acquisitions, and new executive onboarding.',
    icon: <BookOpen className="w-5 h-5 text-[#b8860b]" />,
    auditStatus: 'PROVISIONAL PATENT-PENDING'
  },
  {
    id: 'capital-loss-ledger',
    code: 'DEL-04',
    title: '10-Point Friction & Capital Loss Ledger',
    phase: 'Phase 00 • Substrate Audit',
    deliverable: 'Quantitative financial audit pinpointing exact monetary capital drained by meeting saturation, decision latency, and coordination drag.',
    format: 'Audit Report + Financial Loss Model + ROI Roadmap',
    utility: 'Establishes clear monetary benchmark of annual Inaction Tax and validates immediate ROI of architectural calibration.',
    icon: <DollarSign className="w-5 h-5 text-[#b8860b]" />,
    auditStatus: 'VERIFIED DELIVERABLE'
  },
  {
    id: 'divergence-index',
    code: 'DEL-05',
    title: 'Executive Divergence Index & Heatmap',
    phase: 'Phase 01 • Relational Calibration',
    deliverable: 'Triangulated cross-mapping of strategic misalignment between Founder, COO, CFO, and Board Chair across the 5 Core Domains.',
    format: 'C-Suite Triangulation Heatmap & Conflict Neutralization Plan',
    utility: 'Isolates and resolves hidden leadership friction before it causes key executive turnover or failed strategic initiatives.',
    icon: <Compass className="w-5 h-5 text-[#b8860b]" />,
    auditStatus: 'VERIFIED DELIVERABLE'
  },
  {
    id: 'longitudinal-velocity',
    code: 'DEL-06',
    title: '90-Day Longitudinal Velocity Vector',
    phase: 'Phase 04 • Safeguard Retainer',
    deliverable: 'Quarterly telemetry benchmark calculating friction decay percentage, decision cycle speedup (+/- points), and total reclaimed bandwidth.',
    format: 'Longitudinal Telemetry Dossier & Board Valuation Evidence',
    utility: 'Provides empirical evidence to Board and Investors of compounding operational efficiency and de-risked founder dependency.',
    icon: <TrendingUp className="w-5 h-5 text-[#b8860b]" />,
    auditStatus: 'VERIFIED DELIVERABLE'
  }
];

const OperationalDeliverablesMatrix: React.FC = () => {
  return (
    <section className="py-12 sm:py-16 max-w-5xl mx-auto">
      <div className="bg-white border border-zinc-200 shadow-md p-6 sm:p-8 md:p-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-[#b8860b]/10 to-transparent pointer-events-none" />
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#b8860b]/10 border border-[#b8860b]/30 rounded-full mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#b8860b] animate-pulse" />
            <span className="text-[#b8860b] text-[10px] font-black uppercase font-mono">
              Concrete Outputs • Zero Fluff
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-zinc-900 leading-tight">
            Operational Deliverables Matrix
          </h2>
          <p className="text-zinc-600 text-xs sm:text-sm italic font-light leading-relaxed">
            Every engagement delivers permanent, hard-coded institutional assets. Here is the exact portfolio of tangible operational deliverables you receive.
          </p>
        </div>

        {/* Matrix Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {deliverables.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-5 bg-zinc-50 border border-zinc-200/80 hover:border-[#b8860b]/50 transition-all rounded-xs flex flex-col justify-between group hover:shadow-md"
            >
              <div>
                {/* Top Badge Row */}
                <div className="flex items-center justify-between gap-2 mb-3 border-b border-zinc-200/60 pb-2.5 font-mono text-[9px]">
                  <span className="text-[#b8860b] font-bold uppercase tracking-wider flex items-center gap-1">
                    {item.code} • {item.phase}
                  </span>
                  <span className="px-2 py-0.5 bg-zinc-200 text-zinc-700 font-bold uppercase rounded-2xs text-[8px]">
                    {item.auditStatus}
                  </span>
                </div>

                {/* Title */}
                <div className="flex items-start gap-3 mb-3">
                  <div className="p-2 bg-white border border-zinc-200 rounded-xs shrink-0 group-hover:border-[#b8860b] transition-colors shadow-2xs">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900 font-serif leading-snug">
                      {item.title}
                    </h3>
                    <span className="text-[10px] text-zinc-500 font-mono block italic mt-0.5">
                      Format: {item.format}
                    </span>
                  </div>
                </div>

                {/* Tangible Output Description */}
                <div className="space-y-2 mt-4 text-xs">
                  <div>
                    <span className="text-[9px] font-mono font-bold uppercase text-zinc-900 block mb-1">
                      Tangible Deliverable:
                    </span>
                    <p className="text-zinc-700 italic font-light leading-relaxed">
                      {item.deliverable}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-zinc-200/50">
                    <span className="text-[9px] font-mono font-bold uppercase text-[#b8860b] block mb-1">
                      Strategic Utility:
                    </span>
                    <p className="text-zinc-800 font-medium leading-relaxed flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item.utility}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Interlink */}
              <div className="mt-5 pt-3 border-t border-zinc-200/60 flex items-center justify-between font-mono text-[9px]">
                <span className="text-zinc-400 uppercase font-semibold">100% Deterministic Engine</span>
                <Link
                  to="/assessment"
                  className="text-zinc-800 hover:text-[#b8860b] font-bold uppercase flex items-center gap-1 transition-colors"
                >
                  <span>Audit Your Substrate</span>
                  <ArrowRight className="w-3 h-3 text-[#b8860b]" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-8 p-5 bg-[#111111] text-white border border-[#b8860b]/30 rounded-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xs font-bold font-mono text-[#b8860b] uppercase flex items-center justify-center sm:justify-start gap-1.5">
              <ShieldAlert className="w-4 h-4" />
              <span>Architectural Assurance Guarantee</span>
            </h4>
            <p className="text-xs text-zinc-300 italic font-light">
              All deliverables are powered by deterministic scoring engines and codified protocols — never unconstrained AI hallucination or generic slide templates.
            </p>
          </div>
          <Link
            to="/intake"
            className="shrink-0 px-6 py-3 bg-[#b8860b] text-white hover:bg-white hover:text-black text-[9px] font-black uppercase transition-all shadow-md rounded-2xs"
          >
            Initiate Executive Intake
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OperationalDeliverablesMatrix;
