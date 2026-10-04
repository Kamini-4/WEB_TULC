
import React from 'react';
import Assessment from '../../components/Assessment.tsx';
import ExecutiveFrictionScanner from '../../components/ExecutiveFrictionScanner.tsx';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

const AssessmentPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-[#f5f5f0]"
    >
      <div className="max-w-7xl mx-auto px-6 py-2 md:py-4">
        <div id="assessment" className="scroll-mt-28 md:scroll-mt-32">
          <Assessment onCtaClick={() => navigate('/intake')} />
        </div>

        {/* Forensic Friction Scenarios Diagnostic */}
        <div className="mt-12 pt-8 border-t border-zinc-200">
          <ExecutiveFrictionScanner />
        </div>

        {/* Cross-Domain Next Actions & Internal Links Gateway */}
        <div className="mt-14 mb-8 bg-white border border-zinc-300/80 p-6 sm:p-8 rounded-xs shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200">
            <div>
              <span className="text-[9px] font-mono uppercase font-black tracking-widest text-[#b8860b] block">
                COMPREHENSIVE EXECUTIVE PROTOCOLS
              </span>
              <h3 className="text-base sm:text-lg font-bold font-serif text-[#111111]">
                Next Steps in Your Organizational Decoupling
              </h3>
            </div>
            <span className="text-[10px] font-mono text-zinc-400">
              The Unbounded Leadership Co.
            </span>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 pt-4 text-xs font-mono">
            <button
              onClick={() => navigate('/toolkits')}
              className="p-3.5 bg-zinc-50 border border-zinc-200 hover:border-[#b8860b] transition-colors rounded-2xs text-left cursor-pointer group"
            >
              <span className="text-[8px] uppercase tracking-wider text-[#b8860b] font-bold block mb-1">
                INSTANT CLONE
              </span>
              <span className="font-bold text-zinc-900 group-hover:text-[#b8860b] block mb-1">
                Founder Toolkits →
              </span>
              <p className="text-[10px] text-zinc-500 font-serif italic">
                Turnkey Notion & Coda decision matrices and delegation runbooks.
              </p>
            </button>

            <button
              onClick={() => navigate('/services')}
              className="p-3.5 bg-zinc-50 border border-zinc-200 hover:border-[#b8860b] transition-colors rounded-2xs text-left cursor-pointer group"
            >
              <span className="text-[8px] uppercase tracking-wider text-[#b8860b] font-bold block mb-1">
                EXECUTIVE TIERS
              </span>
              <span className="font-bold text-zinc-900 group-hover:text-[#b8860b] block mb-1">
                Sovereign Retainer →
              </span>
              <p className="text-[10px] text-zinc-500 font-serif italic">
                10-Node Forensic Audit, 90-Day Sovereign OS & Board Advisory.
              </p>
            </button>

            <button
              onClick={() => navigate('/cognitive-tax')}
              className="p-3.5 bg-zinc-50 border border-zinc-200 hover:border-[#b8860b] transition-colors rounded-2xs text-left cursor-pointer group"
            >
              <span className="text-[8px] uppercase tracking-wider text-[#b8860b] font-bold block mb-1">
                FINANCIAL DRAG
              </span>
              <span className="font-bold text-zinc-900 group-hover:text-[#b8860b] block mb-1">
                Cognitive Tax Calc →
              </span>
              <p className="text-[10px] text-zinc-500 font-serif italic">
                Calculate the exact annual dollar drag of bottlenecked decisions.
              </p>
            </button>

            <button
              onClick={() => navigate('/intake')}
              className="p-3.5 bg-[#111111] text-white hover:bg-[#b8860b] transition-colors rounded-2xs text-left cursor-pointer group shadow-xs"
            >
              <span className="text-[8px] uppercase tracking-wider text-[#b8860b] font-bold block mb-1">
                DIRECT INTAKE
              </span>
              <span className="font-bold text-white block mb-1">
                Enterprise Console →
              </span>
              <p className="text-[10px] text-zinc-300 font-serif italic">
                Submit coordinates for private calibration and Q4 intake.
              </p>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AssessmentPage;
