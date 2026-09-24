
import React from 'react';
import Assessment from '../../components/Assessment.tsx';
import ExecutiveFrictionScanner from '../../components/ExecutiveFrictionScanner.tsx';
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
      <div className="max-w-7xl mx-auto px-6 py-2 md:py-4">
        <div id="assessment" className="scroll-mt-28 md:scroll-mt-32">
          <Assessment onCtaClick={() => navigate('/intake')} />
        </div>

        {/* Forensic Friction Scenarios Diagnostic */}
        <div className="mt-12 pt-8 border-t border-zinc-200">
          <ExecutiveFrictionScanner />
        </div>
      </div>
    </motion.div>
  );
};

export default AssessmentPage;
