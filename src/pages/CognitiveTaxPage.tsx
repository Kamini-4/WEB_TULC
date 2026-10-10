import React, { useState } from 'react';
import { 
  Calculator, 
  ArrowRight, 
  TrendingDown, 
  Clock, 
  DollarSign, 
  Users, 
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const CognitiveTaxPage: React.FC = () => {
  // Inputs
  const [executiveHeadcount, setExecutiveHeadcount] = useState<number>(6);
  const [averageExecutiveComp, setAverageExecutiveComp] = useState<number>(320000);
  const [weeklyMeetingHours, setWeeklyMeetingHours] = useState<number>(24);
  const [unstructuredTriageHours, setUnstructuredTriageHours] = useState<number>(14);

  // Computations
  const totalWeeklyHours = 45;
  const executiveHourlyRate = averageExecutiveComp / (50 * totalWeeklyHours); // 50 working weeks
  const wastedWeeklyHours = (weeklyMeetingHours * 0.6) + (unstructuredTriageHours * 0.7); // 60% meeting drag, 70% triage drag
  const weeklyDollarLossPerExec = wastedWeeklyHours * executiveHourlyRate;
  const annualTeamLoss = weeklyDollarLossPerExec * executiveHeadcount * 50;
  
  // Reclaimable strategic yield
  const recoverableWeeklyHours = Math.round(wastedWeeklyHours * 0.75);
  const annualRecoverableValue = annualTeamLoss * 0.75;

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#e0e2ec] py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono-tech uppercase tracking-widest text-[#d4af37]">
            <Calculator className="w-4 h-4 text-[#d4af37]" />
            <span>Economic Simulation Engine</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif-prestige font-bold text-white tracking-tight">
            The Cognitive Tax Simulator
          </h1>

          <p className="text-sm sm:text-base text-[#9aa1b2] font-serif-prestige max-w-2xl mx-auto leading-relaxed">
            Quantify the exact balance-sheet destruction caused by using multi-hundred-thousand-dollar executive minds as routine operational routers.
          </p>
        </div>

        {/* Interactive Calculator Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls Column */}
          <div className="lg:col-span-6 bg-[#12141a] border border-[#1f232d] rounded-xs p-6 sm:p-8 space-y-6">
            <h2 className="text-lg font-serif-prestige font-bold text-white pb-3 border-b border-[#1f232d]">
              Executive Team Parameters
            </h2>

            {/* Parameter 1: Headcount */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono-tech">
                <span className="text-[#9aa1b2] uppercase">Executive Leadership Tier Headcount:</span>
                <span className="text-[#d4af37] font-bold">{executiveHeadcount} CXOs / VPs</span>
              </div>
              <input
                type="range"
                min={2}
                max={25}
                step={1}
                value={executiveHeadcount}
                onChange={(e) => setExecutiveHeadcount(Number(e.target.value))}
                className="w-full accent-[#b8860b] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#5e6575] font-mono-tech">
                <span>2 (Core Co-Founders)</span>
                <span>10 (Mid-Stage Executive Tier)</span>
                <span>25 (Enterprise C-Suite)</span>
              </div>
            </div>

            {/* Parameter 2: Average Comp */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono-tech">
                <span className="text-[#9aa1b2] uppercase">Avg Fully Loaded Executive Comp:</span>
                <span className="text-[#d4af37] font-bold">${(averageExecutiveComp / 1000).toLocaleString()}k / Year</span>
              </div>
              <input
                type="range"
                min={150000}
                max={800000}
                step={25000}
                value={averageExecutiveComp}
                onChange={(e) => setAverageExecutiveComp(Number(e.target.value))}
                className="w-full accent-[#b8860b] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#5e6575] font-mono-tech">
                <span>$150k</span>
                <span>$350k (Market Standard)</span>
                <span>$800k (Tier 1 Global)</span>
              </div>
            </div>

            {/* Parameter 3: Meeting Density */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono-tech">
                <span className="text-[#9aa1b2] uppercase">Internal Alignment Syncs / Week:</span>
                <span className="text-[#d4af37] font-bold">{weeklyMeetingHours} Hours / Exec</span>
              </div>
              <input
                type="range"
                min={5}
                max={35}
                step={1}
                value={weeklyMeetingHours}
                onChange={(e) => setWeeklyMeetingHours(Number(e.target.value))}
                className="w-full accent-[#b8860b] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#5e6575] font-mono-tech">
                <span>5 Hours (Lean Substrate)</span>
                <span>20 Hours (Standard Average)</span>
                <span>35 Hours (High-Drag Trap)</span>
              </div>
            </div>

            {/* Parameter 4: Tactical Firefighting */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-mono-tech">
                <span className="text-[#9aa1b2] uppercase">Tactical Exception Triage & Firefighting:</span>
                <span className="text-[#d4af37] font-bold">{unstructuredTriageHours} Hours / Week</span>
              </div>
              <input
                type="range"
                min={2}
                max={25}
                step={1}
                value={unstructuredTriageHours}
                onChange={(e) => setUnstructuredTriageHours(Number(e.target.value))}
                className="w-full accent-[#b8860b] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#5e6575] font-mono-tech">
                <span>2 Hours (Self-Regulating)</span>
                <span>12 Hours (Typical Burn)</span>
                <span>25 Hours (Critical Overload)</span>
              </div>
            </div>

          </div>

          {/* Results Display Column */}
          <div className="lg:col-span-6 bg-[#13161f] border border-[#b8860b]/40 rounded-xs p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-2xl">
            
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#232734]">
                <span className="text-xs font-mono-tech uppercase text-[#d4af37]">Simulation Projection</span>
                <span className="text-[11px] font-mono-tech text-[#7d8495]">Annualized Impact</span>
              </div>

              {/* Main Total Callout */}
              <div className="space-y-1">
                <div className="text-xs text-[#9aa1b2] uppercase tracking-wider font-mono-tech">
                  Total Annualized Balance-Sheet Loss:
                </div>
                <div className="text-4xl sm:text-5xl font-bold font-mono-tech text-rose-400">
                  ${(annualTeamLoss / 1000).toLocaleString(undefined, { maximumFractionDigits: 0 })}k
                </div>
                <p className="text-xs text-[#8c94a6] leading-relaxed pt-1">
                  Capital directly burned paying executive salaries for bureaucratic coordination, meeting bloat, and ad-hoc exception handling.
                </p>
              </div>

              {/* Breakdown Grid */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-[#181b25] border border-[#232734] rounded-xs space-y-1">
                  <div className="text-[11px] text-[#7d8495] font-mono-tech uppercase">Hours Trapped / Week</div>
                  <div className="text-2xl font-bold font-mono-tech text-amber-400">
                    {Math.round(wastedWeeklyHours * executiveHeadcount)} Hrs
                  </div>
                  <div className="text-[10px] text-[#5e6575]">Combined executive hours lost across team.</div>
                </div>

                <div className="p-4 bg-[#181b25] border border-[#232734] rounded-xs space-y-1">
                  <div className="text-[11px] text-[#7d8495] font-mono-tech uppercase">Recoverable Yield</div>
                  <div className="text-2xl font-bold font-mono-tech text-emerald-400">
                    +${(annualRecoverableValue / 1000).toLocaleString(undefined, { maximumFractionDigits: 0 })}k
                  </div>
                  <div className="text-[10px] text-[#5e6575]">Annual value restored with TULC protocols.</div>
                </div>
              </div>

              <div className="p-4 bg-[#181b25] border border-[#232734] rounded-xs space-y-2 text-xs text-[#9aa1b2]">
                <div className="flex items-center gap-2 text-white font-bold">
                  <CheckCircle className="w-4 h-4 text-[#d4af37]" />
                  <span>The Calibrated Alternative</span>
                </div>
                <p className="leading-relaxed">
                  Installing sovereign delegation envelopes and codified heuristic filters eliminates {recoverableWeeklyHours} hours of tactical noise per executive, converting reactive drag into category-defining strategic expansion.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-[#232734] flex flex-col sm:flex-row gap-3">
              <Link
                to="/intake"
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-[#b8860b] hover:bg-[#d4af37] text-black font-bold text-xs uppercase tracking-wider rounded-xs transition-colors"
              >
                <span>Request Architectural Audit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/assessment"
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-[#181b25] hover:bg-[#232734] text-white font-semibold text-xs uppercase tracking-wider rounded-xs border border-[#2b3040] transition-colors"
              >
                <span>Take Inaction Diagnostic</span>
              </Link>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
