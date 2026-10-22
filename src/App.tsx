import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { VideoBriefingSection } from './components/VideoBriefingSection';
import { SimpleNeedsTest } from './components/SimpleNeedsTest';
import { DomainDescriptions } from './components/DomainDescriptions';
import { DomainPreviewBanner } from './components/DomainPreviewBanner';
import { TestInvitationBanner } from './components/TestInvitationBanner';
import { AboutSection } from './components/AboutSection';
import { PartnershipPathways } from './components/PartnershipPathways';
import { ExecutiveShop, ShopDocument } from './components/ExecutiveShop';
import { PatentPendingDiagnostic } from './components/PatentPendingDiagnostic';
import { BlogSection } from './components/BlogSection';
import { RecentDispatchesPreview } from './components/RecentDispatchesPreview';
import { ExecutiveWarRoom } from './components/ExecutiveWarRoom';
import { InstitutionalCaseStudies } from './components/InstitutionalCaseStudies';
import { ConfidentialInquiry } from './components/ConfidentialInquiry';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { PartnershipPathway, PartnershipModelId } from './types';
import { ArrowLeft } from 'lucide-react';

export type AppView = 
  | 'home' 
  | 'test' 
  | 'domains' 
  | 'diagnostic' 
  | 'library' 
  | 'about' 
  | 'shop' 
  | 'war-room' 
  | 'case-studies';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedPartnership, setSelectedPartnership] = useState<PartnershipModelId>('retainer');
  const [inquiryContext, setInquiryContext] = useState<string>('');

  // Synchronize hash routing for direct URLs, back button, and bookmarks
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'test' || hash === 'simple-test' || hash === 'audit') {
        setCurrentView('test');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === 'domains' || hash === '5-domains' || hash === 'framework') {
        setCurrentView('domains');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === 'diagnostic') {
        setCurrentView('diagnostic');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === 'shop' || hash === 'store' || hash === 'documents') {
        setCurrentView('shop');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === 'blogs' || hash === 'library' || hash === 'dispatches') {
        setCurrentView('library');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === 'about' || hash === 'vision-mission') {
        setCurrentView('about');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === 'council' || hash === 'council-chambers') {
        // Council chamber is an advisory feature sold in the Services section
        setCurrentView('home');
        setTimeout(() => {
          document.getElementById('council-feature')?.scrollIntoView({ behavior: 'smooth' });
        }, 60);
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
    } else if (target === 'test' || target === 'simple-test') {
      setCurrentView('test');
      window.location.hash = 'test';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'domains' || target === '5-domains') {
      setCurrentView('domains');
      window.location.hash = 'domains';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'diagnostic') {
      setCurrentView('diagnostic');
      window.location.hash = 'diagnostic';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'blogs' || target === 'library' || target === 'dispatches') {
      setCurrentView('library');
      window.location.hash = 'library';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'about') {
      setCurrentView('about');
      window.location.hash = 'about';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'shop' || target === 'store') {
      setCurrentView('shop');
      window.location.hash = 'shop';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'council' || target === 'council-chambers') {
      // Council chamber is an advisory feature sold in the Services section
      setCurrentView('home');
      window.location.hash = 'partnerships';
      setTimeout(() => {
        document.getElementById('council-feature')?.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    } else if (target === 'war-room') {
      setCurrentView('war-room');
      window.location.hash = 'war-room';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'proof' || target === 'case-studies') {
      setCurrentView('case-studies');
      window.location.hash = 'case-studies';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // In-page anchor on home view
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

  const handleInquireDocument = (doc: ShopDocument) => {
    setInquiryContext(`Institutional Publication & PDF Order: Requesting official copy of "${doc.title}" (${doc.investmentAnchor}).`);
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
    <div className="min-h-screen bg-[#f8f6f0] text-[#17181c] flex flex-col font-serif selection:bg-[#17181c] selection:text-[#f8f6f0] pb-14 md:pb-0">
      
      {/* Top Header Navigation — Clutter-Free */}
      <Header
        onNavigate={navigateTo}
        onLaunchDiagnostic={() => navigateTo('test')}
        currentView={currentView}
      />

      <main className="flex-1">
        
        {/* 1. CLUTTER-FREE STREAMLINED LANDING PAGE */}
        {currentView === 'home' && (
          <>
            {/* Front Page Hero Section: Clean, bold typography and 4 backed statistics */}
            <HeroSection
              onLaunchDiagnostic={() => navigateTo('test')}
              onExplorePartnerships={() => navigateTo('partnerships')}
            />

            {/* Direct Executive Video Briefing: The Decoupling Protocol by Suchita Sancheti */}
            <VideoBriefingSection
              onOpenConsultation={() => navigateTo('contact')}
              onTakeTest={() => navigateTo('test')}
            />

            {/* Separate Test Invitation Banner (Direct link to separate Test) */}
            <TestInvitationBanner
              onLaunchTest={() => navigateTo('test')}
            />

            {/* Separate 5 Domains Preview Banner (Direct link to separate Domains Guide) */}
            <DomainPreviewBanner
              onOpenDomains={() => navigateTo('domains')}
              onTakeTest={() => navigateTo('test')}
            />

            {/* The 3 Partnership Pathways: Diagnostic, Embedding, Retainer (Includes The Council Chamber feature) */}
            <PartnershipPathways
              selectedModelId={selectedPartnership}
              onSelectModel={(id) => setSelectedPartnership(id)}
              onOpenConsultationWithModel={handleOpenConsultationWithModel}
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

        {/* 2. DEDICATED SEPARATE TEST VIEW (60-Sec 5-Domain Sovereign Operating Audit) */}
        {currentView === 'test' && (
          <div>
            {renderSubpageBreadcrumb('The Sovereign Operating Audit', '100% Free · 60 Seconds · Instant Outcome Report')}
            <SimpleNeedsTest
              onConsultationRequest={handleConsultationRequestFromDiagnostic}
              onExplorePartnerships={() => navigateTo('partnerships')}
              onProceedToInDepth={() => navigateTo('diagnostic')}
            />
          </div>
        )}

        {/* 3. DEDICATED SEPARATE 5 DOMAINS DESCRIPTION VIEW */}
        {currentView === 'domains' && (
          <div>
            {renderSubpageBreadcrumb('5 Sovereign Operating Domains', 'Architecture Guide & Mission Blueprint')}
            <DomainDescriptions
              onTakeTest={() => navigateTo('test')}
              onOpenConsultation={() => navigateTo('contact')}
            />
          </div>
        )}

        {/* 4. DEDICATED IN-DEPTH L.O.S. DIAGNOSTIC VIEW */}
        {currentView === 'diagnostic' && (
          <div>
            {renderSubpageBreadcrumb('Phase 2 In-Depth Assessment', 'Patent-Pending L.O.S. Diagnostic™')}
            <PatentPendingDiagnostic
              onSelectPartnership={handleSelectPartnership}
              onConsultationRequest={handleConsultationRequestFromDiagnostic}
            />
          </div>
        )}

        {/* 5. DEDICATED EXECUTIVE DISPATCHES & BLOGS LIBRARY VIEW */}
        {currentView === 'library' && (
          <div>
            {renderSubpageBreadcrumb('Intelligence Library', '19 Strategic Dispatches by Suchita Sancheti')}
            <BlogSection
              onOpenConsultation={handleConsultationRequestFromBlog}
            />
          </div>
        )}

        {/* 6. DEDICATED SOVEREIGN EXECUTIVE SHOP & PDF DOCUMENTS VIEW */}
        {currentView === 'shop' && (
          <div>
            <ExecutiveShop
              onBackToHome={() => navigateTo('home')}
              onExploreServices={() => navigateTo('partnerships')}
              onInquireDocument={handleInquireDocument}
            />
          </div>
        )}

        {/* 7. DEDICATED ABOUT & PHILOSOPHY VIEW */}
        {currentView === 'about' && (
          <div>
            {renderSubpageBreadcrumb('The Architect & The Firm', 'Vision, Mission & Executive Mastery')}
            <AboutSection
              onOpenConsultation={() => navigateTo('contact')}
            />
          </div>
        )}

        {/* 8. DEDICATED EXECUTIVE WAR ROOM VIEW */}
        {currentView === 'war-room' && (
          <div>
            {renderSubpageBreadcrumb('Executive War Room', 'Strategic Scenario Simulator')}
            <ExecutiveWarRoom />
          </div>
        )}

        {/* 9. DEDICATED CASE STUDIES VIEW */}
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
      <MobileBottomNav onNavigate={navigateTo} currentView={currentView} />
    </div>
  );
};

export default App;
