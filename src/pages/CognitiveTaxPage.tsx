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
    <div className="min-h-screen bg-[#f7f4ee] text-[#1c1917] py-16 px-4 sm:px-6 lg:px-8 font-serif">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#8c6708] font-bold">
            <Calculator className="w-4 h-4 text-[#8c6708]" />
            <span>Economic Simulation Engine</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1c1917] tracking-tight font-serif">
            The Cognitive Tax Simulator
          </h1>

          <p className="text-sm sm:text-base text-[#57534e] font-serif max-w-2xl mx-auto leading-relaxed">
            Quantify the exact balance-sheet destruction caused by using multi-hundred-thousand-dollar executive minds as routine operational routers.
          </p>
        </div>

        {/* Interactive Calculator Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Controls Column */}
          <div className="lg:col-span-6 bg-[#ffffff] border border-[#ded6c5] rounded-xs p-6 sm:p-8 space-y-6 shadow-xs font-serif">
            <h2 className="text-lg font-bold text-[#1c1917] pb-3 border-b border-[#e2dcce] font-serif">
              Executive Team Parameters
            </h2>

            {/* Parameter 1: Headcount */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-serif">
                <span className="text-[#57534e] uppercase font-bold">Executive Leadership Tier Headcount:</span>
                <span className="text-[#8c6708] font-bold">{executiveHeadcount} CXOs / VPs</span>
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
              <div className="flex justify-between text-[10px] text-[#78716c] font-serif">
                <span>2 (Core Co-Founders)</span>
                <span>10 (Mid-Stage Executive Tier)</span>
                <span>25 (Enterprise C-Suite)</span>
              </div>
            </div>

            {/* Parameter 2: Average Comp */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-serif">
                <span className="text-[#57534e] uppercase font-bold">Avg Fully Loaded Executive Comp:</span>
                <span className="text-[#8c6708] font-bold">${(averageExecutiveComp / 1000).toLocaleString()}k / Year</span>
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
              <div className="flex justify-between text-[10px] text-[#78716c] font-serif">
                <span>$150k</span>
                <span>$350k (Market Standard)</span>
                <span>$800k (Tier 1 Global)</span>
              </div>
            </div>

            {/* Parameter 3: Meeting Density */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-serif">
                <span className="text-[#57534e] uppercase font-bold">Internal Alignment Syncs / Week:</span>
                <span className="text-[#8c6708] font-bold">{weeklyMeetingHours} Hours / Exec</span>
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
              <div className="flex justify-between text-[10px] text-[#78716c] font-serif">
                <span>5 Hours (Lean Substrate)</span>
                <span>20 Hours (Standard Average)</span>
                <span>35 Hours (High-Drag Trap)</span>
              </div>
            </div>

            {/* Parameter 4: Tactical Firefighting */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-serif">
                <span className="text-[#57534e] uppercase font-bold">Tactical Exception Triage & Firefighting:</span>
                <span className="text-[#8c6708] font-bold">{unstructuredTriageHours} Hours / Week</span>
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
              <div className="flex justify-between text-[10px] text-[#78716c] font-serif">
                <span>2 Hours (Self-Regulating)</span>
                <span>12 Hours (Typical Burn)</span>
                <span>25 Hours (Critical Overload)</span>
              </div>
            </div>

          </div>

          {/* Results Display Column */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#ffffff] via-[#faf8f5] to-[#efebe2] border border-[#b8860b]/40 rounded-xs p-6 sm:p-8 flex flex-col justify-between space-y-6 shadow-sm font-serif">
            
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#ded6c5]">
                <span className="text-xs uppercase font-bold text-[#8c6708] font-serif">Simulation Projection</span>
                <span className="text-[11px] text-[#78716c] font-serif">Annualized Impact</span>
              </div>

              {/* Main Total Callout */}
              <div className="space-y-1">
                <div className="text-xs text-[#57534e] uppercase tracking-wider font-serif font-bold">
                  Total Annualized Balance-Sheet Loss:
                </div>
                <div className="text-4xl sm:text-5xl font-bold font-serif text-rose-800">
                  ${(annualTeamLoss / 1000).toLocaleString(undefined, { maximumFractionDigits: 0 })}k
                </div>
                <p className="text-xs text-[#57534e] leading-relaxed pt-1 font-serif">
                  Capital directly burned paying executive salaries for bureaucratic coordination, meeting bloat, and ad-hoc exception handling.
                </p>
              </div>

              {/* Breakdown Grid */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-[#ffffff] border border-[#ded6c5] rounded-xs space-y-1 shadow-2xs">
                  <div className="text-[11px] text-[#78716c] uppercase font-bold font-serif">Hours Trapped / Week</div>
                  <div className="text-2xl font-bold font-serif text-amber-800">
                    {Math.round(wastedWeeklyHours * executiveHeadcount)} Hrs
                  </div>
                  <div className="text-[10px] text-[#78716c] font-serif">Combined executive hours lost across team.</div>
                </div>

                <div className="p-4 bg-[#ffffff] border border-[#ded6c5] rounded-xs space-y-1 shadow-2xs">
                  <div className="text-[11px] text-[#78716c] uppercase font-bold font-serif">Recoverable Yield</div>
                  <div className="text-2xl font-bold font-serif text-emerald-800">
                    +${(annualRecoverableValue / 1000).toLocaleString(undefined, { maximumFractionDigits: 0 })}k
                  </div>
                  <div className="text-[10px] text-[#78716c] font-serif">Annual value restored with TULC protocols.</div>
                </div>
              </div>

              <div className="p-4 bg-[#ffffff] border border-[#ded6c5] rounded-xs space-y-2 text-xs text-[#57534e] shadow-2xs">
                <div className="flex items-center gap-2 text-[#1c1917] font-bold">
                  <CheckCircle className="w-4 h-4 text-[#8c6708]" />
                  <span>The Calibrated Alternative</span>
                </div>
                <p className="leading-relaxed font-serif">
                  Installing sovereign delegation envelopes and codified heuristic filters eliminates {recoverableWeeklyHours} hours of tactical noise per executive, converting reactive drag into category-defining strategic expansion.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-[#ded6c5] flex flex-col sm:flex-row gap-3">
              <Link
                to="/intake"
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-[#b8860b] to-[#8c6708] hover:from-[#c99518] hover:to-[#9e7610] text-white font-bold text-xs uppercase tracking-wider rounded-xs transition-colors shadow-sm"
              >
                <span>Request Architectural Audit</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/assessment"
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-[#ffffff] hover:bg-[#efebe2] text-[#1c1917] font-semibold text-xs uppercase tracking-wider rounded-xs border border-[#ded6c5] transition-colors"
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
