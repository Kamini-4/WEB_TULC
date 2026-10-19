import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { PartnershipPathways } from './components/PartnershipPathways';
import { CouncilChambers } from './components/CouncilChambers';
import { PatentPendingDiagnostic } from './components/PatentPendingDiagnostic';
import { ExecutiveWarRoom } from './components/ExecutiveWarRoom';
import { InstitutionalCaseStudies } from './components/InstitutionalCaseStudies';
import { ConfidentialInquiry } from './components/ConfidentialInquiry';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { PartnershipPathway, PartnershipModelId } from './types';

export const App: React.FC = () => {
  const [selectedPartnership, setSelectedPartnership] = useState<PartnershipModelId>('retainer');
  const [inquiryContext, setInquiryContext] = useState<string>('');

  const scrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPartnership = (modelId: PartnershipModelId) => {
    setSelectedPartnership(modelId);
    scrollTo('partnerships');
  };

  const handleOpenConsultationWithModel = (model: PartnershipPathway) => {
    setSelectedPartnership(model.id);
    setInquiryContext(`Selected Mandate Pathway: ${model.name} (${model.investmentAnchor} · ${model.cadence}). Objective: ${model.theOutcome}`);
    scrollTo('contact');
  };

  const handleConsultationRequestFromDiagnostic = (diagnosticSummary?: string) => {
    if (diagnosticSummary) {
      setInquiryContext(diagnosticSummary);
    }
    scrollTo('contact');
  };

  const handleApplyForCouncilSeat = () => {
    setInquiryContext('Council Chambers Fellowship Application: Requesting admission dossier for private conclave seat (By Formal Petition).');
    scrollTo('contact');
  };

  return (
    <div className="min-h-screen bg-[#f8f6f0] text-[#17181c] flex flex-col font-serif selection:bg-[#17181c] selection:text-[#f8f6f0] pb-14 lg:pb-0">
      {/* Top Bar adhering to Top Bar Contract */}
      <Header
        onNavigate={scrollTo}
        onLaunchDiagnostic={() => scrollTo('diagnostic')}
      />

      <main className="flex-1">
        {/* Front Page Hero Section: The 4 Black Boxes, Seth Godin style conviction */}
        <HeroSection
          onLaunchDiagnostic={() => scrollTo('diagnostic')}
          onExplorePartnerships={() => scrollTo('partnerships')}
        />

        {/* The 3 Partnership Pathways: The Retainer, The Embedding, The Diagnostic */}
        <PartnershipPathways
          selectedModelId={selectedPartnership}
          onSelectModel={(id) => setSelectedPartnership(id)}
          onOpenConsultationWithModel={handleOpenConsultationWithModel}
        />

        {/* The Council Chambers: Private Closed-Door Conclaves */}
        <CouncilChambers
          onApplyForSeat={handleApplyForCouncilSeat}
        />

        {/* The Patent-Pending L.O.S. Diagnostic™ (3 Architectural Switches, Vector State, AI Boardroom Memo) */}
        <PatentPendingDiagnostic
          onSelectPartnership={handleSelectPartnership}
          onConsultationRequest={handleConsultationRequestFromDiagnostic}
        />

        {/* Executive War Room & Scenario Sparring Simulator (with preset high-stakes dilemmas and Gemini critique) */}
        <ExecutiveWarRoom />

        {/* Quantitative Adjacent Case Proof */}
        <InstitutionalCaseStudies />

        {/* Confidential Executive Inquiry & Briefing Request */}
        <ConfidentialInquiry
          initialPartnership={selectedPartnership}
          initialContext={inquiryContext}
        />
      </main>

      {/* Quiet, refined footer */}
      <Footer onNavigate={scrollTo} />

      {/* Fluid Mobile Bottom Dock */}
      <MobileBottomNav onNavigate={scrollTo} />
    </div>
  );
};

export default App;
