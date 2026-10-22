import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { VideoBriefingSection } from './components/VideoBriefingSection';
import { SimpleNeedsTest } from './components/SimpleNeedsTest';
import { AboutSection } from './components/AboutSection';
import { PartnershipPathways } from './components/PartnershipPathways';
import { CouncilChambers } from './components/CouncilChambers';
import { CouncilChambersPreview } from './components/CouncilChambersPreview';
import { PatentPendingDiagnostic } from './components/PatentPendingDiagnostic';
import { BlogSection } from './components/BlogSection';
import { RecentDispatchesPreview } from './components/RecentDispatchesPreview';
import { ExecutiveWarRoom } from './components/ExecutiveWarRoom';
import { InstitutionalCaseStudies } from './components/InstitutionalCaseStudies';
import { ConfidentialInquiry } from './components/ConfidentialInquiry';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { PartnershipPathway, PartnershipModelId } from './types';
import { ArrowLeft, Home, Sparkles, Shield, Compass } from 'lucide-react';

export type AppView = 'home' | 'diagnostic' | 'library' | 'about' | 'council' | 'war-room' | 'case-studies';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedPartnership, setSelectedPartnership] = useState<PartnershipModelId>('retainer');
  const [inquiryContext, setInquiryContext] = useState<string>('');

  // Synchronize hash routing for direct URLs, back button, and bookmarks
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'diagnostic') {
        setCurrentView('diagnostic');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === 'blogs' || hash === 'library') {
        setCurrentView('library');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === 'about' || hash === 'vision-mission') {
        setCurrentView('about');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === 'council' || hash === 'council-chambers') {
        setCurrentView('council');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === 'war-room') {
        setCurrentView('war-room');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === 'proof' || hash === 'case-studies') {
        setCurrentView('case-studies');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === 'contact' || hash === 'inquiry') {
        setCurrentView('home');
        setTimeout(() => {
          document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        }, 60);
      } else if (hash === 'simple-test') {
        setCurrentView('home');
        setTimeout(() => {
          document.getElementById('simple-test')?.scrollIntoView({ behavior: 'smooth' });
        }, 60);
      } else if (hash === 'partnerships') {
        setCurrentView('home');
        setTimeout(() => {
          document.getElementById('partnerships')?.scrollIntoView({ behavior: 'smooth' });
        }, 60);
      } else if (hash === 'briefing') {
        setCurrentView('home');
        setTimeout(() => {
          document.getElementById('briefing')?.scrollIntoView({ behavior: 'smooth' });
        }, 60);
      } else {
        // Default home
        if (hash === 'top' || hash === '') {
          setCurrentView('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (target: string) => {
    if (target === 'top' || target === 'home') {
      setCurrentView('home');
      window.location.hash = 'top';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'diagnostic') {
      setCurrentView('diagnostic');
      window.location.hash = 'diagnostic';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'blogs' || target === 'library') {
      setCurrentView('library');
      window.location.hash = 'library';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'about') {
      setCurrentView('about');
      window.location.hash = 'about';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'council' || target === 'council-chambers') {
      setCurrentView('council');
      window.location.hash = 'council';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'war-room') {
      setCurrentView('war-room');
      window.location.hash = 'war-room';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'proof' || target === 'case-studies') {
      setCurrentView('case-studies');
      window.location.hash = 'case-studies';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // In-page section anchor on landing page
      setCurrentView('home');
      window.location.hash = target;
      setTimeout(() => {
        const el = document.getElementById(target);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 60);
    }
  };

  const handleSelectPartnership = (modelId: PartnershipModelId) => {
    setSelectedPartnership(modelId);
    navigateTo('partnerships');
  };

  const handleOpenConsultationWithModel = (model: PartnershipPathway) => {
    setSelectedPartnership(model.id);
    setInquiryContext(`Selected Mandate Pathway: ${model.name} (${model.investmentAnchor} · ${model.cadence}). Objective: ${model.theOutcome}`);
    navigateTo('contact');
  };

  const handleConsultationRequestFromDiagnostic = (diagnosticSummary?: string) => {
    if (diagnosticSummary) {
      setInquiryContext(diagnosticSummary);
    }
    navigateTo('contact');
  };

  const handleConsultationRequestFromBlog = (topic?: string) => {
    if (topic) {
      setInquiryContext(`Advisory Consultation Inquiry: ${topic}`);
    }
    navigateTo('contact');
  };

  const handleApplyForCouncilSeat = () => {
    setInquiryContext('Council Chambers Admission Petition: Requesting formal briefing dossier for private conclave admission (Chatham House Rule).');
    navigateTo('contact');
  };

  // Subpage Top Navigation Bar
  const renderSubpageBreadcrumb = (title: string, subtitle: string) => (
    <div className="bg-[#f0eade] border-b border-[#dfd7c8] py-3.5 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-3">
        <button
          onClick={() => navigateTo('home')}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase text-[#17181c] hover:text-[#9d7b38] transition-colors cursor-pointer py-1"
        >
          <ArrowLeft className="w-4 h-4 text-[#9d7b38]" />
          <span>Return to Overview</span>
        </button>
        <div className="text-right">
          <span className="text-xs font-bold text-[#17181c] uppercase">{title}</span>
          <span className="hidden sm:inline text-xs text-[#6b6e76] ml-2 font-mono">· {subtitle}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8f6f0] text-[#17181c] flex flex-col font-serif selection:bg-[#17181c] selection:text-[#f8f6f0] pb-14 lg:pb-0">
      {/* Top Header Navigation */}
      <Header
        onNavigate={navigateTo}
        onLaunchDiagnostic={() => navigateTo('simple-test')}
      />

      <main className="flex-1">
        
        {/* 1. STREAMLINED LANDING PAGE VIEW */}
        {currentView === 'home' && (
          <>
            {/* Front Page Hero Section: The 4 Black Boxes with backed statistics */}
            <HeroSection
              onLaunchDiagnostic={() => navigateTo('simple-test')}
              onExplorePartnerships={() => navigateTo('partnerships')}
            />

            {/* Direct Executive Video Briefing: The Decoupling Protocol by Suchita Sancheti */}
            <VideoBriefingSection
              onOpenConsultation={() => navigateTo('contact')}
              onTakeTest={() => navigateTo('simple-test')}
            />

            {/* The 100% Free 5-Domain Sovereign Operating Audit (Leads to In-Depth Diagnostic) */}
            <SimpleNeedsTest
              onConsultationRequest={handleConsultationRequestFromDiagnostic}
              onExplorePartnerships={() => navigateTo('partnerships')}
              onProceedToInDepth={() => navigateTo('diagnostic')}
            />

            {/* The 3 Partnership Pathways: Diagnostic, Embedding, Retainer */}
            <PartnershipPathways
              selectedModelId={selectedPartnership}
              onSelectModel={(id) => setSelectedPartnership(id)}
              onOpenConsultationWithModel={handleOpenConsultationWithModel}
            />

            {/* Council Chambers Showcase Banner (Taste sold with Diagnostic) */}
            <CouncilChambersPreview
              onOpenFullDossier={() => navigateTo('council')}
              onExploreDiagnostic={() => navigateTo('diagnostic')}
            />

            {/* Recent Strategic Dispatches Showcase (3 Curated Essays) */}
            <RecentDispatchesPreview
              onOpenFullLibrary={() => navigateTo('library')}
            />

            {/* Confidential Executive Inquiry & Briefing Request */}
            <ConfidentialInquiry
              initialPartnership={selectedPartnership}
              initialContext={inquiryContext}
            />
          </>
        )}

        {/* 2. DEDICATED IN-DEPTH DIAGNOSTIC PAGE */}
        {currentView === 'diagnostic' && (
          <div>
            {renderSubpageBreadcrumb('Phase 2 In-Depth Assessment', 'Patent-Pending L.O.S. Diagnostic™')}
            <PatentPendingDiagnostic
              onSelectPartnership={handleSelectPartnership}
              onConsultationRequest={handleConsultationRequestFromDiagnostic}
            />
          </div>
        )}

        {/* 3. DEDICATED EXECUTIVE DISPATCHES & BLOGS LIBRARY */}
        {currentView === 'library' && (
          <div>
            {renderSubpageBreadcrumb('Intelligence Library', '19 Strategic Dispatches by Suchita Sancheti')}
            <BlogSection
              onOpenConsultation={handleConsultationRequestFromBlog}
            />
          </div>
        )}

        {/* 4. DEDICATED COUNCIL CHAMBERS DOSSIER */}
        {currentView === 'council' && (
          <div>
            {renderSubpageBreadcrumb('The Council Chambers', 'Closed-Door Conclaves in Zurich, London, Singapore & NYC')}
            <CouncilChambers
              onApplyForSeat={handleApplyForCouncilSeat}
              onExploreImplementation={() => navigateTo('partnerships')}
              onSelectDiagnostic={() => navigateTo('diagnostic')}
            />
          </div>
        )}

        {/* 5. DEDICATED ABOUT & PHILOSOPHY PAGE */}
        {currentView === 'about' && (
          <div>
            {renderSubpageBreadcrumb('The Architect & The Firm', 'Vision, Mission & Humans + Architecture')}
            <AboutSection
              onOpenConsultation={() => navigateTo('contact')}
            />
          </div>
        )}

        {/* 6. DEDICATED EXECUTIVE WAR ROOM */}
        {currentView === 'war-room' && (
          <div>
            {renderSubpageBreadcrumb('Executive War Room', 'Strategic Scenario Simulator')}
            <ExecutiveWarRoom />
          </div>
        )}

        {/* 7. DEDICATED CASE STUDIES & PROOF */}
        {currentView === 'case-studies' && (
          <div>
            {renderSubpageBreadcrumb('Institutional Case Proof', 'Quantitative Evidence & Performance Logs')}
            <InstitutionalCaseStudies />
          </div>
        )}

      </main>

      {/* Global Footer with Vision & Mission */}
      <Footer onNavigate={navigateTo} />

      {/* Fluid Mobile Bottom Dock */}
      <MobileBottomNav onNavigate={navigateTo} />
    </div>
  );
};

export default App;
