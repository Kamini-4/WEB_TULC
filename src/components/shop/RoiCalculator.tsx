import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Calculator, TrendingUp, DollarSign, Clock, ShieldCheck, ArrowRight, Zap } from 'lucide-react';
import { CurrencyCode, CURRENCY_SYMBOLS, CURRENCY_MULTIPLIERS } from '../../lib/currency';
import { CurrencySelector } from './CurrencySelector';

interface RoiCalculatorProps {
  onUnlockVault?: () => void;
  currency?: CurrencyCode;
  onCurrencyChange?: (currency: CurrencyCode) => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ 
  onUnlockVault,
  currency: externalCurrency,
  onCurrencyChange: externalOnCurrencyChange
}) => {
  const [internalCurrency, setInternalCurrency] = useState<CurrencyCode>('USD');
  const currency = externalCurrency || internalCurrency;
  
  const handleCurrencyChange = (newCurr: CurrencyCode) => {
    if (externalOnCurrencyChange) {
      externalOnCurrencyChange(newCurr);
    } else {
      setInternalCurrency(newCurr);
    }
  };

  const [hourlyRate, setHourlyRate] = useState<number>(500);
  const [hoursLostWeekly, setHoursLostWeekly] = useState<number>(15);

  const stats = useMemo(() => {
    const mult = CURRENCY_MULTIPLIERS[currency] || 1;
    const annualWeeks = 48; // Working weeks
    const annualHoursSaved = hoursLostWeekly * annualWeeks;
    const annualEquityWastedUsd = hoursLostWeekly * hourlyRate * annualWeeks;
    const annualEquityWasted = annualEquityWastedUsd * mult;

    // Investment cost: Single asset (~$145) or Complete Vault ($495)
    const vaultCostUsd = 495;
    const vaultCost = vaultCostUsd * mult;

    const roiMultiple = Math.round(annualEquityWastedUsd / vaultCostUsd);
    const weeklyWaste = (hoursLostWeekly * hourlyRate) * mult;

    return {
      annualHoursSaved,
      annualEquityWasted,
      weeklyWaste,
      vaultCost,
      roiMultiple
    };
  }, [hourlyRate, hoursLostWeekly, currency]);

  const sym = CURRENCY_SYMBOLS[currency] || '$';

  const formatNumber = (num: number) => {
    if (currency === 'INR') {
      if (num >= 10000000) return `${(num / 10000000).toFixed(2)} Cr`;
      if (num >= 100000) return `${(num / 100000).toFixed(1)} Lakhs`;
      return Math.round(num).toLocaleString('en-IN');
    }
    if (num >= 1000000) return `${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(0)}K`;
    return Math.round(num).toLocaleString('en-US');
  };

  return (
    <div className="border border-zinc-200/80 bg-white/80 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-sm shadow-sm relative overflow-hidden">
      {/* Subtle Glow */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#b8860b]/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Title & Currency Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-200/60 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-[#b8860b] text-[8px] font-mono uppercase tracking-widest font-black mb-1">
            <Zap className="w-3 h-3" /> Empirical Cognitive Equity Audit
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-[#111111]">
            Calculate Your Bandwidth Reclamation ROI
          </h3>
          <p className="text-xs text-zinc-600 font-light mt-0.5">
            Every hour a visionary spends in low-leverage tactical firefighting is unpriced capital destruction.
          </p>
        </div>

        {/* Currency Tabs */}
        <CurrencySelector
          currentCurrency={currency}
          onCurrencyChange={handleCurrencyChange}
          size="sm"
          variant="light"
        />
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-center">
        {/* Sliders Control Panel */}
        <div className="lg:col-span-6 space-y-6">
          {/* Slider 1: Hourly Value */}
          <div className="space-y-2 bg-zinc-50/60 p-4 border border-zinc-200/60 rounded-xs">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-[#111111] flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-[#b8860b]" /> Your Hourly Executive Value
              </span>
              <span className="font-mono font-bold text-sm text-[#b8860b]">
                {sym}{formatNumber(hourlyRate * CURRENCY_MULTIPLIERS[currency])}/hr
              </span>
            </div>
            <input
              type="range"
              min={150}
              max={2500}
              step={50}
              value={hourlyRate}
              onChange={(e) => setHourlyRate(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-[#b8860b]"
            />
            <div className="flex justify-between text-[8px] font-mono text-zinc-400">
              <span>{sym}{formatNumber(150 * CURRENCY_MULTIPLIERS[currency])} (Director)</span>
              <span>{sym}{formatNumber(500 * CURRENCY_MULTIPLIERS[currency])} (Founder/CEO)</span>
              <span>{sym}{formatNumber(2500 * CURRENCY_MULTIPLIERS[currency])} (Apex Principal)</span>
            </div>
          </div>

          {/* Slider 2: Weekly Hours Lost */}
          <div className="space-y-2 bg-zinc-50/60 p-4 border border-zinc-200/60 rounded-xs">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-[#111111] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#b8860b]" /> Weekly Hours Trapped in Firefighting & Meetings
              </span>
              <span className="font-mono font-bold text-sm text-[#b8860b]">
                {hoursLostWeekly} hrs / week
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={35}
              step={1}
              value={hoursLostWeekly}
              onChange={(e) => setHoursLostWeekly(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-[#b8860b]"
            />
            <div className="flex justify-between text-[8px] font-mono text-zinc-400">
              <span>5 hrs (Minor Drag)</span>
              <span>15 hrs (Average Founder Drain)</span>
              <span>35 hrs (Crisis Mode)</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-[#b8860b]" />
            <span>Benchmark based on 140+ institutional audits conducted across Series A–C & enterprise teams.</span>
          </div>
        </div>

        {/* Dynamic ROI Output Display Card */}
        <div className="lg:col-span-6 bg-[#111111] text-white p-6 sm:p-8 rounded-xs border border-[#b8860b]/30 relative shadow-xl">
          <div className="absolute top-3 right-3 px-2 py-0.5 bg-[#b8860b]/20 border border-[#b8860b]/40 text-[#b8860b] text-[8px] font-mono uppercase font-black">
            Compound Return Telemetry
          </div>

          <div className="space-y-6">
            <div>
              <div className="text-[8px] font-mono uppercase tracking-widest text-zinc-400 font-bold mb-1">
                Annual Cognitive Capital Leaked
              </div>
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#b8860b] font-mono">
                {sym}{formatNumber(stats.annualEquityWasted)}
              </div>
              <div className="text-[10px] text-zinc-400 font-mono mt-1">
                That is <span className="text-white font-bold">{sym}{formatNumber(stats.weeklyWaste)}</span> drained out of your enterprise every single week.
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10">
              <div>
                <div className="text-[8px] font-mono uppercase text-zinc-400">Annual Hours Reclaimed</div>
                <div className="text-xl sm:text-2xl font-bold text-white font-mono mt-0.5">
                  {stats.annualHoursSaved} hrs
                </div>
                <div className="text-[9px] text-zinc-500 mt-0.5 font-light">Equivalent to 18 full working days</div>
              </div>
              <div>
                <div className="text-[8px] font-mono uppercase text-zinc-400">Projected System ROI</div>
                <div className="text-xl sm:text-2xl font-bold text-green-400 font-mono mt-0.5 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" /> {stats.roiMultiple}x
                </div>
                <div className="text-[9px] text-zinc-500 mt-0.5 font-light">Against Sovereign Vault investment</div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onUnlockVault}
                className="w-full py-3 px-4 bg-[#b8860b] hover:bg-white hover:text-[#111111] text-white font-mono text-[10px] uppercase font-black tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <span>Reclaim {stats.annualHoursSaved} Hours with Sovereign Vault</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <div className="text-center text-[8px] font-mono text-zinc-400 mt-2">
                The TULC Performance Commitment: 30-Day Friction-Free Evaluation Period
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
