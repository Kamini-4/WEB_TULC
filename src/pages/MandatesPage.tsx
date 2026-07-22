import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import StrategicMandates from '../../components/StrategicMandates.tsx';

const MandatesPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen"
    >
      <StrategicMandates />
    </motion.div>
  );
};

export default MandatesPage;
