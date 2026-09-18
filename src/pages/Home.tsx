import React from 'react';
import Hero from '../../components/Hero.tsx';
import ExecutiveFrictionScanner from '../../components/ExecutiveFrictionScanner.tsx';
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
      {/* 01. Brand Vision, Institutional Scarcity & Altitude Filter */}
      <Hero onBriefClick={onBriefClick} />

      {/* 02. Interactive Micro-Diagnostics & Friction Scanner */}
      <ExecutiveFrictionScanner />

      {/* 03. Principal Strategic Video Dispatch */}
      <PrincipalDispatch />

      {/* 04. Declassified Sovereign Dossier (Condensed Executive Briefing Card + Full Modal) */}
      <DossierCaseStudyPreview onBriefClick={onBriefClick} briefingMode={true} />
      
      {/* 05. Direct Intake & Calendar Booking */}
      <Waitlist />
    </motion.div>
  );
};

export default Home;
