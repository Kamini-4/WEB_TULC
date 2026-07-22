import React from 'react';
import Hero from '../../components/Hero.tsx';
import HumanSubstrateManifesto from '../../components/HumanSubstrateManifesto.tsx';
import QuantifyFriction from '../../components/QuantifyFriction.tsx';
import Waitlist from '../../components/Waitlist.tsx';
import { motion } from 'motion/react';

interface HomeProps {
  onBriefClick: (id?: string) => void;
  onArticleClick: (article: any) => void;
}

const Home: React.FC<HomeProps> = ({ onBriefClick }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* 01. Brand Vision & Core Pillars */}
      <Hero onBriefClick={onBriefClick} />
      
      {/* 02. Human-Embedded Architecture Methodology */}
      <HumanSubstrateManifesto />

      {/* 03. Quantify leadership friction & leakage */}
      <QuantifyFriction />
      
      {/* 04. Direct Intake & Calendar Booking */}
      <Waitlist />
    </motion.div>
  );
};

export default Home;
