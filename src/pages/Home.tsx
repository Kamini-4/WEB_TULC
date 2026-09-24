import React from 'react';
import Hero from '../../components/Hero.tsx';
import WhatWeDo from '../../components/WhatWeDo.tsx';
import PrincipalDispatch from '../../components/PrincipalDispatch.tsx';
import DossierCaseStudyPreview from '../../components/DossierCaseStudyPreview.tsx';
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
      transition={{ duration: 0.6 }}
    >
      {/* 01. Brand Vision, High-Impact Pointers & Core Metrics */}
      <Hero onBriefClick={onBriefClick} />

      {/* 02. Clarity Protocol: What We Do & 3 Defined Engagement Tracks */}
      <WhatWeDo />

      {/* 03. Principal Strategic Video Dispatch */}
      <PrincipalDispatch />

      {/* 04. Declassified Sovereign Dossier (Real-World Case Study Briefing) */}
      <DossierCaseStudyPreview onBriefClick={onBriefClick} briefingMode={true} />
      
      {/* 05. Direct Intake & Calendar Booking Gateway */}
      <Waitlist />
    </motion.div>
  );
};

export default Home;

