
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface FloatingCTAProps {
  onAuditClick: () => void;
}

const FloatingCTA: React.FC<FloatingCTAProps> = ({ onAuditClick }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Make it appear almost immediately
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="fixed bottom-24 right-4 sm:bottom-28 sm:right-6 md:bottom-[100px] md:right-8 z-50 scale-90 sm:scale-100 origin-bottom-right"
        >
          <button
            onClick={onAuditClick}
            className="group relative flex items-center gap-4 bg-[#111111] text-white p-1 pr-6 border border-[#b8860b]/30 shadow-2xl hover:border-[#b8860b] transition-all duration-500"
          >
            <div className="bg-[#b8860b] p-4 group-hover:bg-[#d4af37] transition-colors duration-500">
              <span className="text-white font-black text-xs">FREE</span>
            </div>
            <div className="flex flex-col items-start px-2">
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-[#b8860b] mb-1">Institutional Audit</span>
              <span className="text-[11px] font-bold uppercase tracking-widest">Free Assessment</span>
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
