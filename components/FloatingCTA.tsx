
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface FloatingCTAProps {
  onAuditClick: () => void;
}

const FloatingCTA: React.FC<FloatingCTAProps> = ({ onAuditClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-8 right-8 z-50 hidden md:block"
        >
          <button
            onClick={onAuditClick}
            className="group relative flex items-center gap-4 bg-[#111111] text-white p-1 pr-6 border border-[#b8860b]/30 shadow-2xl hover:border-[#b8860b] transition-all duration-500"
          >
            <div className="bg-[#b8860b] p-4 group-hover:bg-[#d4af37] transition-colors duration-500">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-[#b8860b] mb-1">Institutional Audit</span>
              <span className="text-[11px] font-bold uppercase tracking-widest">Reclaim Your Bandwidth</span>
            </div>
            
            {/* Pulse Effect */}
            <div className="absolute inset-0 border border-[#b8860b]/50 animate-ping opacity-20 pointer-events-none" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingCTA;
