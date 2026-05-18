
import React, { useEffect } from 'react';
import Waitlist from '../../components/Waitlist.tsx';
import { motion } from 'motion/react';

const IntakePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-[#ecece4] min-h-screen pt-24 pb-12"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-7xl font-bold mb-8 leading-tight">
            Institutional <span className="text-[#b8860b] italic">Intake Console.</span>
          </h1>
          <div className="h-1 w-24 bg-[#b8860b] mx-auto mb-10"></div>
          <p className="text-xl sm:text-2xl text-zinc-600 font-light italic leading-relaxed">
            The transition from entropy to authority begins here. Provide your institutional coordinates to initiate the Sovereign Protocol.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <Waitlist />
        </div>

        <div className="mt-24 text-center">
          <p className="text-zinc-500 text-sm italic font-light max-w-2xl mx-auto">
            Note: Intake is strictly gated to ensure strategic depth. All inquiries are processed with absolute institutional privilege and discretion.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default IntakePage;
