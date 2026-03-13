
import React, { useState, useEffect } from 'react';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import InstitutionalMetrics from './components/InstitutionalMetrics.tsx';
import Problem from './components/Problem.tsx';
import Assessment from './components/Assessment.tsx';
import Program from './components/Program.tsx';
import Methodology from './components/Methodology.tsx';
import ScaleEvidence from './components/ScaleEvidence.tsx';
import ImpactLedger from './components/ImpactLedger.tsx';
import PrincipalDispatch from './components/PrincipalDispatch.tsx';
import EliteReasoning from './components/EliteReasoning.tsx';
import Insights from './components/Insights.tsx';
import Blog from './components/Blog.tsx';
import FAQ from './components/FAQ.tsx';
import Waitlist from './components/Waitlist.tsx';
import Footer from './components/Footer.tsx';
import ArticleView from './components/ArticleView.tsx';
import TrustProtocol from './components/TrustProtocol.tsx';
import StrategicOutcomes from './components/StrategicOutcomes.tsx';
import YieldStatement from './components/YieldStatement.tsx';
import AdminDashboard from './components/AdminDashboard.tsx';

interface Article {
  id?: string;
  category: string;
  title: string;
  content: string[];
  date?: string;
}

import Countdown from './components/Countdown.tsx';

const App: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [showAssessment, setShowAssessment] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  const handleOpenArticle = (article: any) => {
    setActiveArticle(article);
  };

  const handleLegalClick = (type: 'disclosure' | 'terms') => {
    const legalContent: Record<string, Article> = {
      disclosure: {
        category: "Institutional Protocol",
        title: "Privileged Disclosure & Data Sovereignty",
        content: [
          "The Unbounded Leadership Co. (TULC) operates under a Zero Data Retention (ZDR) mandate. We recognize that for the Sovereign Leader, data is not merely information—it is institutional power. Our systems are architected to ensure that this power remains exclusively with the Principal.",
          "All diagnostic inputs, including strategic assessments and organizational telemetry, are processed in volatile memory. Upon the conclusion of a terminal session, all raw data is purged. We do not maintain a persistent database of client strategic secrets.",
          "We do not engage in data harvesting, third-party analytics sharing, or the training of public models on client-specific substrates. Our AI interventions are siloed and ephemeral, ensuring that your institutional 'moat' remains uncompromised.",
          "By engaging with the Sovereign Ledger or the Yield Calibration, you acknowledge that TULC acts as a temporary diagnostic conduit. Your intellectual property and strategic intent remain your own, protected by our Privileged Disclosure protocols."
        ]
      },
      terms: {
        category: "Governance Standard",
        title: "Terms of Institutional Authority",
        content: [
          "Engagement with The Unbounded Leadership Co. is governed by the principle of Limited Intake. We do not operate as a mass-market consultancy. Access to the Sovereign Ledger is granted at the sole discretion of the Principal Architect based on strategic alignment and institutional readiness.",
          "TULC provides architectural diagnostics and structural recalibration. While our methodologies are anchored in the 'Physics of Scale,' outcomes are subject to organizational variance. We do not guarantee specific market cap increases; results are unique to the structural integrity and leadership substrate of each individual organization. No two institutional outcomes are identical.",
          "All materials, dispatches, and methodologies provided by TULC are the intellectual property of the firm and are shared under a non-redistribution mandate. Unauthorized disclosure of TULC protocols is a violation of the Privileged Disclosure Framework.",
          "By utilizing this terminal, you agree to operate within the bounds of Institutional Sovereignty. TULC reserves the right to terminate any diagnostic intervention if the leadership substrate is found to be fundamentally uncalibrated or resistant to architectural integrity."
        ]
      }
    };
    setActiveArticle(legalContent[type]);
  };

  const handleBriefClick = (phaseId?: string) => {
    if (phaseId === '01') {
      setActiveArticle({
        category: "Methodology Phase 01",
        title: "Yield Calibration (Diagnostic)",
        content: [
          "The Yield Calibration is a non-invasive, high-fidelity diagnostic that measures your institutional substrate across five vertical domains.",
          "This is not a survey; it is a stress-test of your leadership operating system. We identify the specific 'cracks' in your substrate where strategic intent is being diluted and where cognitive bandwidth is being consumed by tactical noise.",
          "The Deliverable: A comprehensive 'Constraint Map' that serves as the blueprint for the subsequent stabilization and recalibration phases."
        ]
      });
      return;
    }
    
    if (phaseId === '02') {
      setActiveArticle({
        category: "Methodology Phase 02",
        title: "Strategic Domain Mapping (Synthesis)",
        content: [
          "Data without direction is entropy. In this phase, we isolate the Two Primary Domains that represent your highest constraint and your greatest leverage.",
          "You receive a comprehensive Structural Integrity Report—a definitive mapping of your current entropy against projected stability.",
          "This report serves as the architectural blueprint for the intervention, ensuring we only move the levers that yield the highest strategic return."
        ]
      });
      return;
    }

    if (phaseId === '03') {
      setActiveArticle({
        category: "Methodology Phase 03",
        title: "Architectural Intervention (Calibration)",
        content: [
          "We move from mapping to engineering. This is a Bespoke Calibration of your leadership operating system, built strictly to your institutional requirements.",
          "We do not use templates; we re-build your decision-making protocols, communication substrates, and governance logic from the ground up.",
          "This phase is tailored to your specific mandate, ensuring the system is calibrated for your unique scale."
        ]
      });
      return;
    }

    if (phaseId === '04') {
      setActiveArticle({
        category: "Methodology Phase 04",
        title: "Sovereign Integration (Integration)",
        content: [
          "The final phase is the transition from intervention to Sovereignty. We ensure the new structural logic is autonomous, self-correcting, and projected with 100% fidelity across your organization.",
          "The result is the elimination of 'Authority Leakage.' You are no longer managing a team; you are presiding over an institution that functions with the precision of your own strategic intent.",
          "The Legacy: Total institutional permanence. Strategic outcomes become natural law."
        ]
      });
      return;
    }

    const briefContent: Article = {
      category: "Institutional Protocol",
      title: "The Sovereignty Brief: Architectural Recalibration",
      content: [
        "Institutional Sovereignty is the state where vision and execution are indistinguishable. It is the immunity to organizational entropy and the restoration of absolute strategic focus.",
        "The Five Vertical Domains of Recalibration:",
        "I. Cognitive Clarity: The removal of tactical fog to restore high-stakes decision velocity.",
        "II. Systemic Integrity: The engineering of self-regulating substrates that execute vision as natural law, eliminating fragile dependence on human heroics.",
        "III. Strategic Velocity: The capacity to convert external disruption into systemic advantage through autonomous substrate recalibration.",
        "IV. Moral Gravity: The weight and integrity that prevents institutional drift, ensuring intent is projected with absolute resonance.",
        "V. Cultural Fidelity: The elimination of authority dilution, ensuring the vision at the operational edge is a high-fidelity mirror of the source.",
        "The Yield: 30% Strategic Bandwidth Reclamation, 100% Intent Fidelity, and the engineering of Institutional Permanence.",
        "The Window for Architectural Transition: Strategic intent is currently being diluted by institutional noise. Reclaim the authority that structural entropy is absorbing before the next board cycle concludes."
      ]
    };
    setActiveArticle(briefContent);
  };

  return (
    <div className="min-h-screen selection:bg-[#b8860b] selection:text-white bg-[#f5f5f0]">
      <div className="fixed top-0 left-0 right-0 z-[100]">
        <Countdown />
        <Header onAdminTrigger={() => setShowAdmin(true)} />
      </div>
      <main className="pt-28 sm:pt-32 md:pt-36">
        <Hero onBriefClick={handleBriefClick} />
        <InstitutionalMetrics />
        <ScaleEvidence onBriefClick={handleBriefClick} />
        <Problem />
        <StrategicOutcomes />
        <YieldStatement />
        <Assessment onCtaClick={() => document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })} />
        <Program onBriefClick={handleBriefClick} />
        <Methodology onBriefClick={handleBriefClick} />
        <ImpactLedger />
        <TrustProtocol />
        <EliteReasoning />
        <Insights onArticleClick={handleOpenArticle} />
        <Blog onArticleClick={handleOpenArticle} />
        <PrincipalDispatch />
        <FAQ />
        <Waitlist />
      </main>
      <Footer onLegalClick={handleLegalClick} />
      
      <ArticleView 
        article={activeArticle} 
        onClose={() => setActiveArticle(null)} 
      />

      {showAdmin && (
        <AdminDashboard onClose={() => setShowAdmin(false)} />
      )}
    </div>
  );
};

export default App;
