
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
      className="bg-[#ecece4] min-h-screen pt-6 md:pt-16 pb-12"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-7xl font-bold mb-8 leading-tight">
            Enterprise <span className="text-[#b8860b] italic">Intake Console.</span>
          </h1>
          <div className="h-1 w-24 bg-[#b8860b] mx-auto mb-10"></div>
          <p className="text-xl sm:text-2xl text-zinc-600 font-light italic leading-relaxed">
            The transition to clean strategic scaling and operational alignment begins here. Please provide your business coordinates to initiate the protocol.
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          <Waitlist defaultOpen={true} />
        </div>

        <div className="mt-16 text-center space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono">
            <a href="tel:+919325346704" aria-label="Call +91 9325346704" className="text-[#b8860b] hover:underline font-bold">
              📞 Direct Line: +91 9325346704
            </a>
            <span className="text-zinc-400">•</span>
            <a href="mailto:suchita@theunboundedleadership.com" aria-label="Email suchita@theunboundedleadership.com" className="text-zinc-700 hover:text-[#b8860b] transition-colors">
              ✉️ suchita@theunboundedleadership.com
            </a>
            <span className="text-zinc-400">•</span>
            <a href="https://business.google.com/n/14240239232288232619/searchprofile?hl=en-GB" target="_blank" rel="noopener noreferrer" aria-label="Google Business Profile" className="text-zinc-700 hover:text-[#b8860b] transition-colors">
              📍 Google Business Profile
            </a>
          </div>
          <p className="text-zinc-500 text-sm italic font-light max-w-2xl mx-auto pt-2">
            Note: Intake is strictly prioritized to ensure highest standards of alignment. All inquiries are processed with strict confidentiality and discretion.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default IntakePage;
