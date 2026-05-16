
import React from 'react';
import Assessment from '../../components/Assessment.tsx';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

const AssessmentPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-[#f5f5f0]"
    >
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-24">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-8">
            The Institutional <span className="text-[#b8860b] italic">Diagnostic.</span>
          </h1>
          <p className="text-xl text-zinc-600 font-light italic leading-relaxed">
            Execute a high-fidelity audit of your leadership substrate. Identify cognitive tax, institutional lag, and substrate friction in less than 4 minutes.
          </p>
        </div>
        
        <div id="assessment">
          <Assessment onCtaClick={() => {
            const waitlist = document.getElementById('waitlist-footer');
            if (waitlist) {
              waitlist.scrollIntoView({ behavior: 'smooth' });
            } else {
              navigate('/');
              setTimeout(() => {
                document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }
          }} />
        </div>
      </div>
    </motion.div>
  );
};

export default AssessmentPage;
