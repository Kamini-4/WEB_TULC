import React from 'react';
import Hero from '../../components/Hero.tsx';
import TrustProtocol from '../../components/TrustProtocol.tsx';
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
      {/* 01. Brand Vision & Primary Focus */}
      <Hero onBriefClick={onBriefClick} />
      
      {/* 02. Core Trust Protocols & Strategic Intake */}
      <TrustProtocol />
      <Waitlist />
    </motion.div>
  );
};

export default Home;
