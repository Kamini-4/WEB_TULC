import React, { useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { VideoBriefingSection } from './components/VideoBriefingSection';
import { SimpleNeedsTest } from './components/SimpleNeedsTest';
import { AboutSection } from './components/AboutSection';
import { PartnershipPathways } from './components/PartnershipPathways';
import { CouncilChambers } from './components/CouncilChambers';
import { PatentPendingDiagnostic } from './components/PatentPendingDiagnostic';
import { BlogSection } from './components/BlogSection';
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

  const handleConsultationRequestFromBlog = (topic?: string) => {
    if (topic) {
      setInquiryContext(`Advisory Consultation Inquiry: ${topic}`);
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
        onLaunchDiagnostic={() => scrollTo('simple-test')}
      />

      <main className="flex-1">
        {/* Front Page Hero Section: The 4 Black Boxes with backed statistics */}
        <HeroSection
          onLaunchDiagnostic={() => scrollTo('simple-test')}
          onExplorePartnerships={() => scrollTo('partnerships')}
        />

        {/* Restored Executive Video Briefing: The Decoupling Protocol by Suchita Sancheti */}
        <VideoBriefingSection
          onOpenConsultation={() => scrollTo('contact')}
          onTakeTest={() => scrollTo('simple-test')}
        />

        {/* The Free 5-Domain Sovereign Audit (Leads to In-Depth Diagnostic) */}
        <SimpleNeedsTest
          onConsultationRequest={handleConsultationRequestFromDiagnostic}
          onExplorePartnerships={() => scrollTo('partnerships')}
          onProceedToInDepth={() => scrollTo('diagnostic')}
        />

        {/* Restored Vision, Mission & Suchita Sancheti: Humans + Architecture */}
        <AboutSection
          onOpenConsultation={() => scrollTo('contact')}
        />

        {/* The 3 Partnership Pathways: Retainer, Embedding, Diagnostic */}
        <PartnershipPathways
          selectedModelId={selectedPartnership}
          onSelectModel={(id) => setSelectedPartnership(id)}
          onOpenConsultationWithModel={handleOpenConsultationWithModel}
        />

        {/* The Council Chambers: A taste sold with Diagnostic, full strategic version with Implementation */}
        <CouncilChambers
          onApplyForSeat={handleApplyForCouncilSeat}
          onExploreImplementation={() => scrollTo('partnerships')}
          onSelectDiagnostic={() => scrollTo('diagnostic')}
        />

        {/* Phase 2: The In-Depth Patent-Pending L.O.S. Diagnostic™ (3 Architectural Switches, Vector State, AI Boardroom Memo) */}
        <PatentPendingDiagnostic
          onSelectPartnership={handleSelectPartnership}
          onConsultationRequest={handleConsultationRequestFromDiagnostic}
        />

        {/* Executive Dispatches & Sovereign Intelligence (The Blogs) */}
        <BlogSection
          onOpenConsultation={handleConsultationRequestFromBlog}
        />

        {/* Executive War Room & Scenario Sparring Simulator */}
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
