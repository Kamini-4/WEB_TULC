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
  const targetLabel = targetDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

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
    <div className="bg-[#111111] text-white py-2 px-4 border-b border-[#b8860b]/20 relative z-[60]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8">
        <div className="flex items-center gap-3">
          <span className="text-[#b8860b] text-[10px] sm:text-[8px] font-black uppercase ">Institutional Intake Window</span>
          <div className="h-[1px] w-4 bg-[#b8860b]/30"></div>
          <span className="text-[10px] sm:text-[9px] font-bold uppercase text-zinc-400">Closing {targetLabel}</span>
        </div>
        
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex flex-col items-center">
            <span className="text-[16px] sm:text-[14px] font-black tabular-nums">{timeLeft.days.toString().padStart(2, '0')}</span>
            <span className="text-[7px] sm:text-[6px] uppercase font-bold text-[#b8860b] ">Days</span>
          </div>
          <span className="text-[#b8860b]/30 font-light">:</span>
          <div className="flex flex-col items-center">
            <span className="text-[16px] sm:text-[14px] font-black tabular-nums">{timeLeft.hours.toString().padStart(2, '0')}</span>
            <span className="text-[7px] sm:text-[6px] uppercase font-bold text-[#b8860b] ">Hrs</span>
          </div>
          <span className="text-[#b8860b]/30 font-light">:</span>
          <div className="flex flex-col items-center">
            <span className="text-[16px] sm:text-[14px] font-black tabular-nums">{timeLeft.minutes.toString().padStart(2, '0')}</span>
            <span className="text-[7px] sm:text-[6px] uppercase font-bold text-[#b8860b] ">Min</span>
          </div>
          <span className="text-[#b8860b]/30 font-light">:</span>
          <div className="flex flex-col items-center">
            <span className="text-[16px] sm:text-[14px] font-black tabular-nums text-[#b8860b]">{timeLeft.seconds.toString().padStart(2, '0')}</span>
            <span className="text-[7px] sm:text-[6px] uppercase font-bold text-[#b8860b] ">Sec</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <div className="h-[1px] w-4 bg-[#b8860b]/30"></div>
          <span className="text-[8px] font-black uppercase text-[#b8860b] animate-pulse">Strategic Urgency Active</span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
