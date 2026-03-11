import React, { useState, useEffect } from 'react';

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date('2026-04-05T00:00:00');

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

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
  }, []);

  return (
    <div className="bg-[#111111] text-white py-2 px-4 border-b border-[#b8860b]/20 relative z-[60]">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-8">
        <div className="flex items-center gap-3">
          <span className="text-[#b8860b] text-[10px] sm:text-[8px] font-black uppercase tracking-[0.3em]">Institutional Intake Window</span>
          <div className="h-[1px] w-4 bg-[#b8860b]/30"></div>
          <span className="text-[10px] sm:text-[9px] font-bold uppercase tracking-widest text-zinc-400">Closing April 5th</span>
        </div>
        
        <div className="flex items-center gap-4 sm:gap-6">
          <div className="flex flex-col items-center">
            <span className="text-[16px] sm:text-[14px] font-black tracking-tighter tabular-nums">{timeLeft.days.toString().padStart(2, '0')}</span>
            <span className="text-[7px] sm:text-[6px] uppercase font-bold text-[#b8860b] tracking-widest">Days</span>
          </div>
          <span className="text-[#b8860b]/30 font-light">:</span>
          <div className="flex flex-col items-center">
            <span className="text-[16px] sm:text-[14px] font-black tracking-tighter tabular-nums">{timeLeft.hours.toString().padStart(2, '0')}</span>
            <span className="text-[7px] sm:text-[6px] uppercase font-bold text-[#b8860b] tracking-widest">Hrs</span>
          </div>
          <span className="text-[#b8860b]/30 font-light">:</span>
          <div className="flex flex-col items-center">
            <span className="text-[16px] sm:text-[14px] font-black tracking-tighter tabular-nums">{timeLeft.minutes.toString().padStart(2, '0')}</span>
            <span className="text-[7px] sm:text-[6px] uppercase font-bold text-[#b8860b] tracking-widest">Min</span>
          </div>
          <span className="text-[#b8860b]/30 font-light">:</span>
          <div className="flex flex-col items-center">
            <span className="text-[16px] sm:text-[14px] font-black tracking-tighter tabular-nums text-[#b8860b]">{timeLeft.seconds.toString().padStart(2, '0')}</span>
            <span className="text-[7px] sm:text-[6px] uppercase font-bold text-[#b8860b] tracking-widest">Sec</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <div className="h-[1px] w-4 bg-[#b8860b]/30"></div>
          <span className="text-[8px] font-black uppercase tracking-[0.3em] text-[#b8860b] animate-pulse">Strategic Urgency Active</span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
