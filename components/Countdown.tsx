import React, { useState, useEffect } from 'react';

const getNextTargetDate = () => {
  const now = new Date();
  const target = new Date(now.getFullYear(), now.getMonth(), 15);
  
  // If we've passed the 15th of this month, go to the 15th of next month
  if (now.getDate() >= 15) {
    target.setMonth(target.getMonth() + 1);
  }
  
  return target;
};

const Countdown: React.FC = () => {
  const targetDate = React.useMemo(() => getNextTargetDate(), []);
  const targetLabel = targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetTime = targetDate.getTime();
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetTime - now.getTime();

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="bg-[#0e0e0e] text-zinc-300 py-1 sm:py-1.5 px-4 border-b border-[#b8860b]/20 relative z-[60] select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 text-[10px] sm:text-[11px] font-mono">
        <div className="flex items-center gap-2 truncate">
          <span className="w-1.5 h-1.5 rounded-full bg-[#b8860b] animate-pulse shrink-0" />
          <span className="text-[#b8860b] font-bold uppercase tracking-wider shrink-0">Executive Intake</span>
          <span className="text-zinc-600 hidden xs:inline">•</span>
          <span className="text-zinc-300 truncate">Window Closes {targetLabel}</span>
        </div>
        
        <div className="flex items-center gap-1 font-semibold tracking-wider shrink-0 text-white">
          <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] sm:text-[11px] tabular-nums">{timeLeft.days}d</span>
          <span className="text-[#b8860b] font-bold">:</span>
          <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] sm:text-[11px] tabular-nums">{timeLeft.hours}h</span>
          <span className="text-[#b8860b] font-bold">:</span>
          <span className="bg-white/10 px-1.5 py-0.5 rounded text-[10px] sm:text-[11px] tabular-nums">{timeLeft.minutes}m</span>
          <span className="text-[#b8860b] font-bold">:</span>
          <span className="bg-[#b8860b]/20 text-[#b8860b] px-1.5 py-0.5 rounded text-[10px] sm:text-[11px] tabular-nums">{timeLeft.seconds}s</span>
        </div>

        <div className="hidden md:flex items-center gap-2 text-zinc-400 text-[10px] uppercase tracking-wider shrink-0">
          <span className="text-zinc-600">•</span>
          <span className="text-[#b8860b]/90 font-medium">Strictly 3 Mandates / Qtr</span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
