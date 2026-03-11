
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
import AssessmentModal from './components/AssessmentModal.tsx';
import TrustProtocol from './components/TrustProtocol.tsx';
import StrategicOutcomes from './components/StrategicOutcomes.tsx';
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
        title: "Privileged Disclosure Framework",
        content: [
          "The Unbounded Leadership Co. (TULC) operates under a Zero Data Retention (ZDR) mandate. We recognize that for the Sovereign Leader, data is not merely information—it is institutional power. Our systems are architected to ensure that this power remains exclusively with the Principal.",
          "All diagnostic inputs, including voice prints, strategic assessments, and organizational telemetry, are processed in volatile memory. Upon the conclusion of a terminal session or diagnostic cycle, all raw data is purged. We do not maintain a persistent database of client strategic secrets.",
          "We do not engage in data harvesting, third-party analytics sharing, or the training of public models on client-specific substrates. Our AI interventions are siloed and ephemeral, ensuring that your institutional 'moat' remains uncompromised.",
          "By engaging with the Sovereign Ledger or the Structural Audit, you acknowledge that TULC acts as a temporary diagnostic conduit. Your intellectual property and strategic intent remain your own, protected by our Privileged Disclosure protocols."
        ]
      },
      terms: {
        category: "Governance Standard",
        title: "Terms of Institutional Authority",
        content: [
          "Engagement with The Unbounded Leadership Co. is governed by the principle of Limited Intake. We do not operate as a mass-market consultancy. Access to the Sovereign Ledger is granted at the sole discretion of the Principal Architect based on strategic alignment and institutional readiness.",
          "TULC provides architectural diagnostics and structural recalibration. While our methodologies are anchored in the 'Physics of Scale,' outcomes are subject to organizational variance. We do not guarantee specific market cap increases but provide the structural conditions that make such outcomes inevitable.",
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
        title: "The Diagnostic Audit Protocol",
        content: [
          "The Diagnostic Audit is a non-invasive, high-fidelity mapping of your institutional 'nervous system.' We don't ask for opinions; we observe the flow of strategic intent.",
          "Key Diagnostic Vectors:",
          "1. Intent Dilution Analysis: Identifying where the Principal's vision loses fidelity as it moves through the organizational layers.",
          "2. Cognitive Friction Mapping: Locating the specific operational bottlenecks that consume 80% of leadership bandwidth for 20% of the value.",
          "3. Structural Fragility Assessment: Stress-testing the systems that currently rely on individual heroics rather than systemic integrity.",
          "The Deliverable: A comprehensive 'Constraint Map' that serves as the blueprint for the subsequent stabilization and recalibration phases."
        ]
      });
      return;
    }
    
    if (phaseId === '02') {
      setActiveArticle({
        category: "Methodology Phase 02",
        title: "Structural Stabilization Framework",
        content: [
          "Stabilization is about stopping the bleed. Before we can re-architect, we must ensure the current foundation is not actively eroding strategic focus.",
          "Intervention Protocols:",
          "1. Relational Substrate Repair: Resolving the high-level misalignments that create 'relational drag' at the board and executive level.",
          "2. Operational Leak Plugging: Immediate implementation of 'Silent Work' protocols to reclaim lost time and focus.",
          "3. Bandwidth Reclamation: Targeted removal of tactical noise from the Principal's daily cycle.",
          "The Outcome: A 20-30% reclamation of cognitive bandwidth within the first 30 days, creating the necessary space for architectural evolution."
        ]
      });
      return;
    }

    if (phaseId === '03') {
      setActiveArticle({
        category: "Methodology Phase 03",
        title: "Architectural Recalibration Strategy",
        content: [
          "Recalibration is the core of our work. We move from fixing the past to engineering the future by re-wiring how the organization processes intent.",
          "Architectural Shifts:",
          "1. Autonomous Execution Substrates: Building systems that execute vision as natural law, requiring zero tactical oversight.",
          "2. Feedback Loop Optimization: Engineering high-fidelity signals that allow for rapid strategic adjustment without manual intervention.",
          "3. Vision-System Integration: Ensuring the 'Physics of Scale' are embedded in every operational layer.",
          "The Result: A self-regulating leadership tier where the Principal's presence is a strategic choice, not an operational necessity."
        ]
      });
      return;
    }

    if (phaseId === '04') {
      setActiveArticle({
        category: "Methodology Phase 04",
        title: "Institutional Governance & Legacy",
        content: [
          "The final phase ensures that the new architecture is permanent and independent of any single individual, including the Principal.",
          "Governance Standards:",
          "1. Shadow Metrics Implementation: Monitoring institutional health through high-level indicators that don't require 'deep dives.'",
          "2. Legacy Preservation Protocols: Codifying the institutional 'DNA' to ensure continuity across leadership generations.",
          "3. Sovereignty Maintenance: Establishing the long-term guardrails that prevent structural entropy from returning.",
          "The Legacy: Total institutional permanence. The organization now possesses the structural integrity to endure and thrive indefinitely."
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
        <Assessment onCtaClick={() => setShowAssessment(true)} />
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

      {showAssessment && (
        <AssessmentModal onClose={() => setShowAssessment(false)} />
      )}

      {showAdmin && (
        <AdminDashboard onClose={() => setShowAdmin(false)} />
      )}
    </div>
  );
};

export default App;
