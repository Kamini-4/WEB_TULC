import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Calculator, 
  Building, 
  Users, 
  Clock, 
  AlertTriangle, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Printer, 
  CheckCircle2, 
  FileText,
  Activity,
  TrendingDown,
  Lock
} from 'lucide-react';

type CurrencyType = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED';

interface CurrencyConfig {
  code: CurrencyType;
  symbol: string;
  defaultRevenue: number;
  minRevenue: number;
  maxRevenue: number;
  unit: string;
  multiplier: number; // Multiplier to get standard base currency value
  format: (val: number) => string;
}

const CURRENCIES: Record<CurrencyType, CurrencyConfig> = {
  INR: {
    code: 'INR',
    symbol: '₹',
    defaultRevenue: 500,
    minRevenue: 10,
    maxRevenue: 2500,
    unit: 'Cr',
    multiplier: 10000000,
    format: (val: number) => {
      if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
      if (val >= 100000) return `₹${(val / 100000).toFixed(1)} Lakhs`;
      return `₹${Math.round(val).toLocaleString('en-IN')}`;
    }
  },
  USD: {
    code: 'USD',
    symbol: '$',
    defaultRevenue: 60,
    minRevenue: 2,
    maxRevenue: 300,
    unit: 'M',
    multiplier: 1000000,
    format: (val: number) => {
      if (val >= 1000000) return `$${(val / 1000000).toFixed(2)}M`;
      if (val >= 1000) return `$${(val / 1000).toFixed(0)}K`;
      return `$${Math.round(val).toLocaleString('en-US')}`;
    }
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    defaultRevenue: 55,
    minRevenue: 2,
    maxRevenue: 280,
    unit: 'M',
    multiplier: 1000000,
    format: (val: number) => {
      if (val >= 1000000) return `€${(val / 1000000).toFixed(2)}M`;
      if (val >= 1000) return `€${(val / 1000).toFixed(0)}K`;
      return `€${Math.round(val).toLocaleString('de-DE')}`;
    }
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    defaultRevenue: 45,
    minRevenue: 2,
    maxRevenue: 250,
    unit: 'M',
    multiplier: 1000000,
    format: (val: number) => {
      if (val >= 1000000) return `£${(val / 1000000).toFixed(2)}M`;
      if (val >= 1000) return `£${(val / 1000).toFixed(0)}K`;
      return `£${Math.round(val).toLocaleString('en-GB')}`;
    }
  },
  AED: {
    code: 'AED',
    symbol: 'AED ',
    defaultRevenue: 220,
    minRevenue: 10,
    maxRevenue: 1000,
    unit: 'M',
    multiplier: 1000000,
    format: (val: number) => {
      if (val >= 1000000) return `AED ${(val / 1000000).toFixed(2)}M`;
      if (val >= 1000) return `AED ${(val / 1000).toFixed(0)}K`;
      return `AED ${Math.round(val).toLocaleString('en-US')}`;
    }
  }
};

const CognitiveTaxPage: React.FC = () => {
  const navigate = useNavigate();
  const [currency, setCurrency] = useState<CurrencyType>('INR');
  const currencyConfig = CURRENCIES[currency];

  const [revenue, setRevenue] = useState<number>(currencyConfig.defaultRevenue);
  const [headcount, setHeadcount] = useState<number>(12); // Direct reports / Tier-2 leaders
  const [meetingHours, setMeetingHours] = useState<number>(24); // Tactical meetings / week
  const [decisionDelayDays, setDecisionDelayDays] = useState<number>(14); // Days to clear strategic pivots
  const [refractionPercent, setRefractionPercent] = useState<number>(65); // Estimated signal loss down hierarchy

  // Handle currency switch
  const handleCurrencyChange = (newCurr: CurrencyType) => {
    setCurrency(newCurr);
    setRevenue(CURRENCIES[newCurr].defaultRevenue);
  };

  // Calculations
  const metrics = useMemo(() => {
    const rawAnnualRevenue = revenue * currencyConfig.multiplier;
    // Estimated executive hourly opportunity value (based on standard 2,000 work hours/year)
    const executiveHourValue = rawAnnualRevenue / 2000;
    
    // 40% of tactical meeting time is typically lost in alignment drag/re-explaining
    const weeklyLostHours = meetingHours * (0.35 + (refractionPercent / 200));
    const annualLostMeetingCost = executiveHourValue * weeklyLostHours * 48; // 48 active executive weeks
    
    // Coordination delay cost across direct reports
    const coordinationFrictionFactor = (headcount / 10) * (decisionDelayDays / 10);
    const annualCoordinationLeak = rawAnnualRevenue * (0.015 * coordinationFrictionFactor);

    // Total Inaction Tax
    const totalTax = annualLostMeetingCost + annualCoordinationLeak;
    
    // Strategic capacity reclaimed if engineered (35-45% average)
    const reclaimedHoursPerYear = weeklyLostHours * 48;
    const strategicVelocityMultiplier = (1 + (refractionPercent / 40)).toFixed(1);

    return {
      rawAnnualRevenue,
      executiveHourValue,
      weeklyLostHours: Math.round(weeklyLostHours),
      annualLostMeetingCost,
      annualCoordinationLeak,
      totalTax: Math.round(totalTax),
      reclaimedHoursPerYear: Math.round(reclaimedHoursPerYear),
      strategicVelocityMultiplier,
      bandwidthDrainPct: Math.min(85, Math.round((weeklyLostHours / 45) * 100))
    };
  }, [revenue, headcount, meetingHours, decisionDelayDays, refractionPercent, currencyConfig]);

  const handlePrintBrief = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Cognitive Tax & Systemic Friction Brief // TULC</title>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=JetBrains+Mono:wght@400;700&display=swap');
              body { font-family: 'Playfair Display', Georgia, serif; background: #FAF9F5; color: #0A0A0A; padding: 40px; font-size: 13px; line-height: 1.6; }
              .header { border-bottom: 2px solid #C5A021; padding-bottom: 20px; text-align: center; margin-bottom: 30px; }
              .badge { display: inline-block; font-size: 9px; font-weight: bold; letter-spacing: 0.15em; color: #8a6d1a; background: rgba(197,160,33,0.1); padding: 4px 12px; border: 1px solid rgba(197,160,33,0.3); text-transform: uppercase; margin-bottom: 10px; font-family: 'JetBrains Mono', monospace; }
              .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin: 25px 0; }
              .card { border: 1px solid #ddd; background: #fff; padding: 15px; text-align: center; }
              .val { font-size: 22px; font-weight: bold; color: #C5A021; margin: 5px 0; }
              .mono { font-family: 'JetBrains Mono', monospace; font-size: 10px; }
              .section { margin: 25px 0; }
              .section-title { font-size: 14px; font-weight: bold; text-transform: uppercase; border-bottom: 1px solid #000; padding-bottom: 5px; }
            </style>
          </head>
          <body>
            <div class="header">
              <div class="badge">CONFIDENTIAL EXECUTIVE BRIEF // COGNITIVE TAX FORENSIC SIMULATION</div>
              <h1 style="margin: 6px 0; font-size: 24px;">Cognitive Tax & Institutional Friction Audit</h1>
              <div class="mono" style="color: #666;">PREPARED BY THE UNBOUNDED LEADERSHIP CO. • OFFICE OF THE PRINCIPAL ARCHITECT</div>
            </div>

            <div class="grid">
              <div class="card">
                <div class="mono">ANNUAL INACTION TAX</div>
                <div class="val">${currencyConfig.format(metrics.totalTax)}</div>
                <div class="mono" style="color:#666;">Leaked Strategic Equity</div>
              </div>
              <div class="card">
                <div class="mono">WEEKLY ATTENTION LOSS</div>
                <div class="val" style="color:#0A0A0A;">${metrics.weeklyLostHours} Hrs/Wk</div>
                <div class="mono" style="color:#666;">Manual Operational Override</div>
              </div>
              <div class="card">
                <div class="mono">COORDINATION MULTIPLIER</div>
                <div class="val" style="color:#0A0A0A;">${metrics.strategicVelocityMultiplier}x</div>
                <div class="mono" style="color:#666;">Labor Delay Drag</div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">SIMULATION PARAMETERS</div>
              <p>
                <strong>Enterprise Revenue Baseline:</strong> ${currencyConfig.symbol}${revenue}${currencyConfig.unit}<br/>
                <strong>Direct Leadership Reports:</strong> ${headcount} executives<br/>
                <strong>Tactical Meeting Volume:</strong> ${meetingHours} hours/week<br/>
                <strong>Decision Latency Delta:</strong> ${decisionDelayDays} days per strategic pivot<br/>
                <strong>Downstream Refraction Risk:</strong> ${refractionPercent}% signal dilution
              </p>
            </div>

            <div class="section">
              <div class="section-title">ARCHITECTURAL IMPLICATION</div>
              <p style="font-style: italic;">
                "Your enterprise is absorbing the metabolic cost of execution through manual founder willpower rather than automated organizational architecture. Eliminating this friction reclaims an estimated ${metrics.reclaimedHoursPerYear} hours of apex strategic focus annually."
              </p>
            </div>

            <div style="margin-top: 50px; border-top: 1px solid #ccc; padding-top: 15px; font-size: 10px; color: #888; text-align: center;" class="mono">
              PROPRIETARY & CONFIDENTIAL // THE UNBOUNDED LEADERSHIP CO.
            </div>
            <script>window.print();</script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#0A0A0A] font-serif selection:bg-[#b8860b] selection:text-white">
      {/* Top Banner / Header Context */}
      <section className="bg-[#111111] text-white pt-16 pb-20 border-b border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#b8860b]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#b8860b] animate-pulse" />
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#b8860b] uppercase">
                STRATEGIC SIMULATION ENGINE // COGNITIVE SOLVENCY
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Quantify Your <span className="text-[#b8860b] italic font-light">Cognitive Tax.</span>
            </h1>
            <p className="mt-4 text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
              When executive intent is not hard-coded into organizational infrastructure, the founder absorbs the metabolic friction of execution. Isolate your firm's annual financial and bandwidth leak below.
            </p>
          </div>

          {/* Quick Currency Selector Switcher */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="text-zinc-400 text-[11px] uppercase">Base Currency:</span>
              <div className="flex items-center bg-black/60 border border-white/15 p-1 rounded-xs gap-1">
                {(['INR', 'USD', 'EUR', 'GBP', 'AED'] as CurrencyType[]).map((c) => (
                  <button
                    key={c}
                    onClick={() => handleCurrencyChange(c)}
                    className={`px-3 py-1 text-[10px] font-bold uppercase transition-all rounded-xs cursor-pointer ${
                      currency === c
                        ? 'bg-[#b8860b] text-black shadow-sm'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrintBrief}
                className="px-4 py-2 bg-[#1c1c1c] hover:bg-[#252525] border border-white/15 text-white text-[10px] font-mono font-bold uppercase tracking-wider rounded-xs transition-all flex items-center gap-2 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-[#b8860b]" />
                <span>Export Executive Brief</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Laboratory */}
      <section className="py-16 sm:py-20 relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Sliders & Parameter Calibration */}
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-white border border-zinc-200 p-6 sm:p-8 rounded-xs shadow-sm space-y-8">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                  <div className="flex items-center gap-2">
                    <Calculator className="w-4 h-4 text-[#8a6d1a]" />
                    <h2 className="text-xs font-mono font-bold text-zinc-900 uppercase tracking-wider">
                      Alignment Parameters
                    </h2>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400 uppercase">Interactive Calibration</span>
                </div>

                {/* Slider 1: Annual Revenue */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="flex items-center gap-2 font-sans font-medium text-zinc-700">
                      <Building className="w-4 h-4 text-[#8a6d1a]" /> Annual Enterprise Revenue
                    </span>
                    <span className="font-mono font-bold text-zinc-900 text-sm">
                      {currencyConfig.symbol}{revenue} {currencyConfig.unit}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={currencyConfig.minRevenue}
                    max={currencyConfig.maxRevenue}
                    step={currency === 'INR' ? 10 : 2}
                    value={revenue}
                    onChange={(e) => setRevenue(Number(e.target.value))}
                    className="w-full accent-[#b8860b] bg-zinc-200 h-1.5 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                    <span>{currencyConfig.symbol}{currencyConfig.minRevenue} {currencyConfig.unit}</span>
                    <span>{currencyConfig.symbol}{currencyConfig.maxRevenue} {currencyConfig.unit}+</span>
                  </div>
                </div>

                {/* Slider 2: Direct Reports & Key Leaders */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="flex items-center gap-2 font-sans font-medium text-zinc-700">
                      <Users className="w-4 h-4 text-[#8a6d1a]" /> Direct Reports & Tier-2 Leads
                    </span>
                    <span className="font-mono font-bold text-zinc-900 text-sm">
                      {headcount} Leaders
                    </span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="40"
                    value={headcount}
                    onChange={(e) => setHeadcount(Number(e.target.value))}
                    className="w-full accent-[#b8860b] bg-zinc-200 h-1.5 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                    <span>3 (Lean Core)</span>
                    <span>40+ (Multi-Division Enterprise)</span>
                  </div>
                </div>

                {/* Slider 3: Tactical Meeting Hours per Week */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="flex items-center gap-2 font-sans font-medium text-zinc-700">
                      <Clock className="w-4 h-4 text-[#8a6d1a]" /> Tactical Meeting Load / Week
                    </span>
                    <span className="font-mono font-bold text-[#8a6d1a] text-sm">
                      {meetingHours} Hours / Wk
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    value={meetingHours}
                    onChange={(e) => setMeetingHours(Number(e.target.value))}
                    className="w-full accent-[#b8860b] bg-zinc-200 h-1.5 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                    <span>5 Hrs (Calibrated)</span>
                    <span>50 Hrs (High Dependency)</span>
                  </div>
                </div>

                {/* Slider 4: Decision Latency Delta */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="flex items-center gap-2 font-sans font-medium text-zinc-700">
                      <Activity className="w-4 h-4 text-[#8a6d1a]" /> Decision Latency (Days to Execute Pivots)
                    </span>
                    <span className="font-mono font-bold text-zinc-900 text-sm">
                      {decisionDelayDays} Days
                    </span>
                  </div>
                  <input
                    type="range"
                    min="2"
                    max="60"
                    value={decisionDelayDays}
                    onChange={(e) => setDecisionDelayDays(Number(e.target.value))}
                    className="w-full accent-[#b8860b] bg-zinc-200 h-1.5 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                    <span>2 Days (Rapid)</span>
                    <span>60 Days (Heavy Bureaucracy)</span>
                  </div>
                </div>

                {/* Slider 5: Downstream Refraction Risk */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="flex items-center gap-2 font-sans font-medium text-zinc-700">
                      <TrendingDown className="w-4 h-4 text-[#8a6d1a]" /> Downstream Intent Refraction
                    </span>
                    <span className="font-mono font-bold text-rose-700 text-sm">
                      {refractionPercent}% Signal Loss
                    </span>
                  </div>
                  <input
                    type="range"
                    min="15"
                    max="95"
                    value={refractionPercent}
                    onChange={(e) => setRefractionPercent(Number(e.target.value))}
                    className="w-full accent-[#b8860b] bg-zinc-200 h-1.5 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                    <span>15% (High Context)</span>
                    <span>95% (Extreme Refraction)</span>
                  </div>
                </div>
              </div>

              {/* Forensic Rationale Card */}
              <div className="bg-[#111111] text-white p-6 rounded-xs border border-white/10 space-y-3">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-[#b8860b]" />
                  <span className="text-xs font-mono font-bold text-[#b8860b] uppercase">
                    The Law of Executive Conservation
                  </span>
                </div>
                <p className="text-xs text-zinc-300 font-serif italic leading-relaxed">
                  "Every minute an apex leader spends clarifying directives or arbitrating tactical consensus is a minute stolen from market arbitrage, capital allocation, and dynastic architecture."
                </p>
              </div>
            </div>

            {/* Right Column: Real-Time Forensic Diagnostics */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Primary Output Display */}
              <div className="bg-[#111111] text-white border border-[#b8860b]/30 p-6 sm:p-8 rounded-xs shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
                  <AlertTriangle className="w-32 h-32 text-[#b8860b]" />
                </div>

                <div className="relative z-10 space-y-6">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <span className="text-[10px] font-mono font-bold text-[#b8860b] uppercase tracking-wider">
                      LEAKED COGNITIVE EQUITY AUDIT
                    </span>
                    <span className="text-[10px] font-mono text-zinc-400 uppercase">
                      CONFIDENTIAL DIAGNOSTIC
                    </span>
                  </div>

                  <div>
                    <span className="text-zinc-400 text-xs font-serif italic block mb-1">
                      Estimated Annual Inaction Tax & Coordination Friction:
                    </span>
                    <div className="text-3xl sm:text-5xl font-serif font-bold text-[#b8860b] tracking-tight">
                      {currencyConfig.format(metrics.totalTax)}
                    </div>
                    <span className="text-[11px] text-zinc-400 font-mono block mt-1">
                      Equivalent to {(metrics.totalTax / metrics.rawAnnualRevenue * 100).toFixed(1)}% of top-line annual revenue.
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 font-mono">
                    <div className="bg-black/60 p-4 border border-white/10 rounded-xs">
                      <span className="text-[9px] text-zinc-400 uppercase block mb-1">
                        Bandwidth Drain
                      </span>
                      <div className="text-xl font-bold text-white">
                        {metrics.weeklyLostHours} Hrs / Wk
                      </div>
                      <span className="text-[10px] text-amber-400/90 font-serif italic">
                        {metrics.bandwidthDrainPct}% of Executive Capacity
                      </span>
                    </div>

                    <div className="bg-black/60 p-4 border border-white/10 rounded-xs">
                      <span className="text-[9px] text-zinc-400 uppercase block mb-1">
                        Coordination Drag
                      </span>
                      <div className="text-xl font-bold text-white">
                        {metrics.strategicVelocityMultiplier}x Overhead
                      </div>
                      <span className="text-[10px] text-zinc-400 font-serif italic">
                        vs. Autonomous Execution Protocol
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#b8860b] mt-1.5 shrink-0" />
                      <p className="text-xs text-zinc-300 font-serif leading-relaxed">
                        <strong>Substrate Leak:</strong> Estimated <span className="text-white font-bold">{metrics.reclaimedHoursPerYear} hours per year</span> spent manually steering operations that could be governed by autonomous logic charters.
                      </p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#b8860b] mt-1.5 shrink-0" />
                      <p className="text-xs text-zinc-300 font-serif leading-relaxed">
                        <strong>Refraction Vulnerability:</strong> Strategic intent degrades by {refractionPercent}% across management tiers, forcing tactical escalations back to the apex node.
                      </p>
                    </div>
                  </div>

                  {/* Primary Next Action */}
                  <div className="pt-6 border-t border-white/10 space-y-3">
                    <button
                      onClick={() => navigate('/assessment')}
                      className="w-full py-3.5 bg-[#b8860b] hover:bg-white hover:text-black text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                    >
                      <span>Take the Full Sovereign Diagnostic (15m)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => navigate('/intake')}
                      className="w-full py-3 bg-[#181818] hover:bg-[#222] border border-white/15 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Request Principal Substrate Audit</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Side-by-Side Comparison Box */}
              <div className="bg-white border border-zinc-200 p-6 rounded-xs shadow-sm space-y-4">
                <div className="text-xs font-mono font-bold text-zinc-900 uppercase tracking-wider border-b border-zinc-100 pb-3">
                  Structural Comparison: Current vs. Engineered
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="space-y-2 border-r border-zinc-200 pr-4">
                    <span className="text-[10px] font-mono font-bold text-rose-700 uppercase block">
                      Current: Leader-Dependent
                    </span>
                    <ul className="space-y-1.5 text-zinc-600 text-[11px] font-serif">
                      <li>• Escalations bypass logic</li>
                      <li>• 60%+ time on tactical friction</li>
                      <li>• Refraction causes lag</li>
                      <li>• Succession dependency</li>
                    </ul>
                  </div>

                  <div className="space-y-2 pl-2">
                    <span className="text-[10px] font-mono font-bold text-[#8a6d1a] uppercase block">
                      Target: Sovereign OS
                    </span>
                    <ul className="space-y-1.5 text-zinc-800 text-[11px] font-serif font-medium">
                      <li>• Hard-coded execution protocols</li>
                      <li>• 40% strategic bandwidth reclaimed</li>
                      <li>• Pure signal resonance</li>
                      <li>• 60+ month institutional half-life</li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Footer Navigation Interlink CTA */}
      <section className="py-16 bg-[#111111] text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 text-center space-y-6">
          <span className="text-[10px] font-mono font-bold text-[#b8860b] tracking-widest uppercase block">
            NEXT STAGE // INSTITUTIONAL RECALIBRATION
          </span>
          <h3 className="text-2xl sm:text-3xl font-bold font-serif max-w-2xl mx-auto">
            Ready to Transition from the <span className="text-[#b8860b] italic">Hero</span> to the <span className="text-[#b8860b] italic">Architect</span>?
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm font-serif max-w-xl mx-auto leading-relaxed">
            Run your 5-Domain Sovereign Diagnostic to extract your institutional vector scores across Cognitive Clarity, Systemic Integrity, Strategic Velocity, Moral Gravity, and Cultural Fidelity.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={() => navigate('/assessment')}
              className="px-6 py-3 bg-[#b8860b] hover:bg-white hover:text-black text-black text-xs font-mono font-bold uppercase tracking-wider rounded-xs transition-all cursor-pointer"
            >
              Start Sovereign Diagnostic →
            </button>
            <button
              onClick={() => navigate('/library')}
              className="px-6 py-3 bg-transparent border border-white/20 hover:border-white text-white text-xs font-mono font-bold uppercase tracking-wider rounded-xs transition-all cursor-pointer"
            >
              Explore Research Library
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CognitiveTaxPage;
