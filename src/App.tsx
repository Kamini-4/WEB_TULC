import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { VideoBriefingSection } from './components/VideoBriefingSection';
import { DomainPreviewBanner } from './components/DomainPreviewBanner';
import { TestInvitationBanner } from './components/TestInvitationBanner';
import { AboutSection } from './components/AboutSection';
import { PartnershipPathways } from './components/PartnershipPathways';
import { RecentDispatchesPreview } from './components/RecentDispatchesPreview';
import { ConfidentialInquiry } from './components/ConfidentialInquiry';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { OutcomeComparisonTable } from './components/OutcomeComparisonTable';
import { SEOHead } from './components/SEOHead';
import { PartnershipModelId, PartnershipPathway } from './types';
import { ArrowLeft, Loader2, Sparkles, ArrowRight, Scale, Video, Layers, BookOpen, Compass, ShieldCheck, Zap, Lock } from 'lucide-react';
import { ShopDocument } from './components/ExecutiveShop';

// Dynamic Code Splitting for Performance & Mobile Optimization (Action Item 1 & 2)
const SimpleNeedsTest = lazy(() => import('./components/SimpleNeedsTest').then(m => ({ default: m.SimpleNeedsTest })));
const DomainDescriptions = lazy(() => import('./components/DomainDescriptions').then(m => ({ default: m.DomainDescriptions })));
const PatentPendingDiagnostic = lazy(() => import('./components/PatentPendingDiagnostic').then(m => ({ default: m.PatentPendingDiagnostic })));
const ExecutiveShop = lazy(() => import('./components/ExecutiveShop').then(m => ({ default: m.ExecutiveShop })));
const BlogSection = lazy(() => import('./components/BlogSection').then(m => ({ default: m.BlogSection })));
const ExecutiveWarRoom = lazy(() => import('./components/ExecutiveWarRoom').then(m => ({ default: m.ExecutiveWarRoom })));
const InstitutionalCaseStudies = lazy(() => import('./components/InstitutionalCaseStudies').then(m => ({ default: m.InstitutionalCaseStudies })));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const InstitutionalPortal = lazy(() => import('./components/InstitutionalPortal').then(m => ({ default: m.InstitutionalPortal })));

export type AppView = 
  | 'home' 
  | 'test' 
  | 'domains' 
  | 'diagnostic' 
  | 'library' 
  | 'about' 
  | 'shop' 
  | 'war-room' 
  | 'case-studies'
  | 'privacy'
  | 'contact'
  | 'portal'
  | 'briefing'
  | 'partnerships';

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
      } else if (hash === 'shop' || hash === 'store' || hash === 'documents' || hash === 'publications' || hash === 'codex' || hash === 'blueprints') {
        setCurrentView('shop');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === 'blogs' || hash === 'library' || hash === 'dispatches') {
        setCurrentView('library');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === 'about' || hash === 'vision-mission') {
        setCurrentView('about');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === 'briefing' || hash === 'video' || hash === 'founder-briefing') {
        setCurrentView('briefing');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === 'partnerships' || hash === 'services' || hash === 'retainer') {
        setCurrentView('partnerships');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === 'privacy' || hash === 'privacy-policy' || hash === 'terms') {
        setCurrentView('privacy');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === 'contact' || hash === 'inquiry') {
        setCurrentView('contact');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === 'portal' || hash === 'clearance' || hash === 'client-portal' || hash === 'gate') {
        setCurrentView('portal');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (hash === 'council' || hash === 'council-chambers') {
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
      } else if (hash === 'comparison' || hash === 'outcomes' || hash === 'versus' || hash === 'why-us') {
        setCurrentView('home');
        setTimeout(() => {
          document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
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
    } else if (target === 'briefing' || target === 'video') {
      setCurrentView('briefing');
      window.location.hash = 'briefing';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'partnerships' || target === 'services') {
      setCurrentView('partnerships');
      window.location.hash = 'services';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'comparison' || target === 'outcomes' || target === 'versus' || target === 'table') {
      setCurrentView('home');
      window.location.hash = 'comparison';
      setTimeout(() => {
        document.getElementById('comparison')?.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    } else if (target === 'shop' || target === 'store' || target === 'publications' || target === 'codex' || target === 'blueprints') {
      setCurrentView('shop');
      window.location.hash = 'blueprints';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'privacy' || target === 'privacy-policy') {
      setCurrentView('privacy');
      window.location.hash = 'privacy';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'contact' || target === 'inquiry') {
      setCurrentView('contact');
      window.location.hash = 'contact';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'portal' || target === 'clearance') {
      setCurrentView('portal');
      window.location.hash = 'portal';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (target === 'council' || target === 'council-chambers') {
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

  const handleSelectPartnership = (id: PartnershipModelId) => {
    setSelectedPartnership(id);
    navigateTo('contact');
  };

  const handleOpenConsultationWithModel = (model: PartnershipPathway) => {
    setSelectedPartnership(model.id);
    setInquiryContext(`Partnership Track Selected: ${model.name} (${model.cadence})`);
    navigateTo('contact');
  };

  const handleConsultationRequestFromDiagnostic = (data: any) => {
    setInquiryContext(`Diagnostic Outcome Calibration: Priority domain flagged as ${data.priorityDomain || 'Strategic Velocity'} with severe latency vector. Requesting confidential review.`);
    navigateTo('contact');
  };

  const handleConsultationRequestFromBlog = (articleTitle?: string) => {
    setInquiryContext(articleTitle ? `Strategic Intelligence Inquiry: Follow-up regarding executive dispatch "${articleTitle}".` : 'Strategic Intelligence Inquiry: General research dispatch inquiry.');
    navigateTo('contact');
  };

  const handleInquireDocument = (doc: ShopDocument) => {
    setInquiryContext(`Institutional Publication Order: Requesting official copy of "${doc.title}" (${doc.priceFormatted} · 100% credited toward retainer/audit).`);
    navigateTo('contact');
  };

  // Subpage Top Navigation Bar
  const renderSubpageBreadcrumb = (title: string, subtitle: string) => (
    <div className="bg-[#f0eade] border-b border-[#dfd7c8] py-1.5 sm:py-2 px-3 sm:px-6 lg:px-8">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-3">
        <button
          onClick={() => navigateTo('home')}
          aria-label="Go back"
          title="Go back"
          className="p-2 -ml-2 rounded-full text-[#17181c] hover:text-[#9d7b38] hover:bg-[#e4dcce] transition-colors cursor-pointer flex items-center justify-center min-w-[36px] min-h-[36px]"
        >
          <ArrowLeft className="w-5 h-5 text-[#9d7b38]" />
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
      
      {/* Top Header Navigation */}
      <Header
        onNavigate={navigateTo}
        onLaunchDiagnostic={() => navigateTo('test')}
        currentView={currentView}
      />

      <main className="flex-1">
        
        {/* 1. CLUTTER-FREE STREAMLINED LANDING PAGE */}
        {currentView === 'home' && (
          <>
            <SEOHead
              title="The Unbounded Leadership Co. | Sovereign Architecture"
              description="Decouple founders from daily operations in 90 days. Sovereign enterprise architecture, leadership operating systems, and executive diagnostics."
              canonicalPath="/"
            />

            {/* Front Page Hero Section */}
            <HeroSection
              onLaunchDiagnostic={() => {
                const el = document.getElementById('inaction-calculator') || document.getElementById('simple-test');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  navigateTo('test');
                }
              }}
              onExplorePartnerships={() => navigateTo('partnerships')}
            />

            {/* Inaction Calculator & Diagnostic on Front Page */}
            <div id="inaction-calculator" className="scroll-mt-16">
              <Suspense fallback={<div className="py-12 text-center text-[#9d7b38] font-mono text-xs flex justify-center items-center gap-2"><Loader2 className="w-4 h-4 animate-spin"/> Loading Assessment...</div>}>
                <SimpleNeedsTest
                  onConsultationRequest={handleConsultationRequestFromDiagnostic}
                  onExplorePartnerships={() => navigateTo('partnerships')}
                  onProceedToInDepth={() => navigateTo('diagnostic')}
                />
              </Suspense>
            </div>

            {/* About Section with Photo & Embedded Small Comparison Table */}
            <AboutSection
              onOpenConsultation={() => navigateTo('contact')}
            />

            {/* Compact Executive Briefing Gateway Strip */}
            <div className="py-2.5 sm:py-3.5 px-4 sm:px-6 lg:px-8 bg-[#17181c] text-[#f8f6f0] border-b border-[#9d7b38]/40">
              <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
                <div className="space-y-0.5">
                  <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase text-[#d4af37] font-bold">
                    <Sparkles className="w-3 h-3 text-[#d4af37]" />
                    <span>Executive Briefing · 8-Minute Direct Video</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-bold font-serif text-[#f8f6f0]">
                    "When You Scale Without Architecture, You Just Scale Your Personal Exhaustion."
                  </h3>
                  <p className="text-[11px] text-[#a0a4ad] font-serif max-w-2xl">
                    Suchita Sancheti unpacks the governing decision boundaries and 90-day decoupling methodology.
                  </p>
                </div>
                <button
                  onClick={() => navigateTo('briefing')}
                  className="px-4 py-2 bg-[#9d7b38] hover:bg-[#88692c] text-[#17181c] font-bold text-xs uppercase font-mono tracking-wider rounded-xs transition-colors shadow-xs flex items-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <span>Watch 8-Min Briefing</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Compact 5 Sovereign Domains Gateway Strip */}
            <div className="py-2.5 sm:py-3.5 px-4 sm:px-6 lg:px-8 bg-[#ede5d6]/70 border-b border-[#dfd7c8]">
              <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
                <div>
                  <span className="text-[9.5px] font-mono uppercase text-[#9d7b38] font-bold tracking-widest block">
                    Sovereign Enterprise Architecture
                  </span>
                  <h3 className="text-sm sm:text-base font-bold font-serif text-[#17181c]">
                    The 5 Sovereign Domains of Decoupled Leadership
                  </h3>
                  <p className="text-[11px] text-[#555861] font-mono mt-0.5">
                    Cognitive Clarity · Systemic Integrity · Strategic Velocity · Moral Gravity · Cultural Fidelity
                  </p>
                </div>
                <button
                  onClick={() => navigateTo('domains')}
                  className="px-4 py-2 border border-[#17181c] text-[#17181c] hover:bg-[#17181c] hover:text-[#f8f6f0] font-mono text-xs uppercase tracking-wider font-bold rounded-xs transition-colors shrink-0 cursor-pointer flex items-center gap-1.5"
                >
                  <span>Explore 5 Domains Blueprint</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* The 3 Partnership Pathways */}
            <div id="partnerships" className="scroll-mt-16">
              <PartnershipPathways
                selectedModelId={selectedPartnership}
                onSelectModel={(id) => setSelectedPartnership(id)}
                onOpenConsultationWithModel={handleOpenConsultationWithModel}
              />
            </div>

            {/* Compact Strategic Intelligence Strip */}
            <div className="py-2.5 sm:py-3.5 px-4 sm:px-6 lg:px-8 bg-[#f2ede2] border-b border-[#dfd7c8]">
              <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
                <div>
                  <span className="text-[9.5px] font-mono uppercase text-[#9d7b38] font-bold tracking-widest block">
                    Strategic Intelligence Desk
                  </span>
                  <h3 className="text-sm sm:text-base font-bold font-serif text-[#17181c]">
                    19 Institutional Research Dispatches & Boardroom Monographs
                  </h3>
                  <p className="text-[11px] text-[#555861] font-serif italic mt-0.5">
                    By Suchita Sancheti — addressing founder traps, executive compensation drift, and decoupling protocols.
                  </p>
                </div>
                <button
                  onClick={() => navigateTo('library')}
                  className="px-4 py-2 bg-[#17181c] text-[#f8f6f0] hover:bg-[#9d7b38] hover:text-[#17181c] font-mono text-xs uppercase tracking-wider font-bold rounded-xs transition-colors shrink-0 cursor-pointer flex items-center gap-1.5"
                >
                  <span>Read 19 Strategic Dispatches</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Confidential Executive Inquiry & Briefing Request */}
            <ConfidentialInquiry
              initialPartnership={selectedPartnership}
              initialContext={inquiryContext}
            />
          </>
        )}

        {/* 2. DEDICATED SEPARATE TEST VIEW */}
        {currentView === 'test' && (
          <div>
            <SEOHead
              title="60-Second Operating Audit | TULC"
              description="Evaluate key-person risk, decision lag, and organizational drag with our 100% free, confidential 60-second diagnostic."
              canonicalPath="/test"
            />
            {renderSubpageBreadcrumb('The Sovereign Operating Audit', '100% Free · 60 Seconds · Instant Outcome Report')}
            <Suspense fallback={<div className="py-20 text-center text-[#9d7b38] font-mono text-xs flex justify-center items-center gap-2"><Loader2 className="w-4 h-4 animate-spin"/> Loading Sovereign Assessment...</div>}>
              <SimpleNeedsTest
                onConsultationRequest={handleConsultationRequestFromDiagnostic}
                onExplorePartnerships={() => navigateTo('partnerships')}
                onProceedToInDepth={() => navigateTo('diagnostic')}
              />
            </Suspense>
          </div>
        )}

        {/* 3. DEDICATED SEPARATE 5 DOMAINS DESCRIPTION VIEW */}
        {currentView === 'domains' && (
          <div>
            <SEOHead
              title="5 Sovereign Domains | TULC"
              description="Explore the 5 domains of sovereign operating architecture: Cognitive Clarity, Systemic Integrity, Strategic Velocity, Moral Gravity, Cultural Fidelity."
              canonicalPath="/domains"
            />
            {renderSubpageBreadcrumb('5 Sovereign Operating Domains', 'Architecture Guide & Mission Blueprint')}
            <Suspense fallback={<div className="py-20 text-center text-[#9d7b38] font-mono text-xs flex justify-center items-center gap-2"><Loader2 className="w-4 h-4 animate-spin"/> Loading Domain Architecture...</div>}>
              <DomainDescriptions
                onTakeTest={() => navigateTo('test')}
                onOpenConsultation={() => navigateTo('contact')}
              />
            </Suspense>
          </div>
        )}

        {/* 4. DEDICATED IN-DEPTH L.O.S. DIAGNOSTIC VIEW */}
        {currentView === 'diagnostic' && (
          <div>
            <SEOHead
              title="Phase 2 Forensic Diagnostic | TULC"
              description="Patent-pending organizational architecture diagnostic isolating friction vectors across executive leadership cadences."
              canonicalPath="/diagnostic"
            />
            {renderSubpageBreadcrumb('Phase 2 In-Depth Assessment', 'Patent-Pending L.O.S. Diagnostic™')}
            <Suspense fallback={<div className="py-20 text-center text-[#9d7b38] font-mono text-xs flex justify-center items-center gap-2"><Loader2 className="w-4 h-4 animate-spin"/> Loading Diagnostic Engine...</div>}>
              <PatentPendingDiagnostic
                onSelectPartnership={handleSelectPartnership}
                onConsultationRequest={handleConsultationRequestFromDiagnostic}
              />
            </Suspense>
          </div>
        )}

        {/* 5. DEDICATED EXECUTIVE DISPATCHES & BLOGS LIBRARY VIEW */}
        {currentView === 'library' && (
          <div>
            <SEOHead
              title="Strategic Intelligence Library | TULC"
              description="19 institutional research dispatches and monographs by Suchita Sancheti on executive governance and enterprise sovereignty."
              canonicalPath="/library"
            />
            {renderSubpageBreadcrumb('Intelligence Library', '19 Strategic Dispatches by Suchita Sancheti')}
            <Suspense fallback={<div className="py-20 text-center text-[#9d7b38] font-mono text-xs flex justify-center items-center gap-2"><Loader2 className="w-4 h-4 animate-spin"/> Loading Intelligence Library...</div>}>
              <BlogSection
                onOpenConsultation={handleConsultationRequestFromBlog}
              />
            </Suspense>
          </div>
        )}

        {/* 6. DEDICATED SOVEREIGN BLUEPRINTS VIEW */}
        {currentView === 'shop' && (
          <div>
            <SEOHead
              title="Executive Blueprints & Systems | TULC"
              description="Codified institutional blueprints and operating frameworks for founder decoupling and leadership operating systems."
              canonicalPath="/blueprints"
            />
            <Suspense fallback={<div className="py-20 text-center text-[#9d7b38] font-mono text-xs flex justify-center items-center gap-2"><Loader2 className="w-4 h-4 animate-spin"/> Loading Executive Blueprints...</div>}>
              <ExecutiveShop
                onBackToHome={() => navigateTo('home')}
                onExploreServices={() => navigateTo('partnerships')}
                onInquireDocument={handleInquireDocument}
              />
            </Suspense>
          </div>
        )}

        {/* 7. DEDICATED ABOUT & PHILOSOPHY VIEW */}
        {currentView === 'about' && (
          <div>
            <SEOHead
              title="About Suchita Sancheti & The Firm | TULC"
              description="Learn about Suchita Sancheti and the institutional methodology behind Sovereign Enterprise Architecture."
              canonicalPath="/about"
            />
            {renderSubpageBreadcrumb('The Architect & The Firm', 'Vision, Mission & Executive Mastery')}
            <AboutSection
              onOpenConsultation={() => navigateTo('contact')}
            />
          </div>
        )}

        {/* 8. DEDICATED EXECUTIVE WAR ROOM VIEW */}
        {currentView === 'war-room' && (
          <div>
            <SEOHead
              title="Executive War Room | TULC"
              description="Simulate real-time governance friction scenarios and quantify annual EBITDA recovery with our interactive simulator."
              canonicalPath="/war-room"
            />
            {renderSubpageBreadcrumb('Executive War Room', 'Strategic Scenario Simulator')}
            <Suspense fallback={<div className="py-20 text-center text-[#9d7b38] font-mono text-xs flex justify-center items-center gap-2"><Loader2 className="w-4 h-4 animate-spin"/> Loading War Room Simulator...</div>}>
              <ExecutiveWarRoom />
            </Suspense>
          </div>
        )}

        {/* 9. DEDICATED CASE STUDIES VIEW */}
        {currentView === 'case-studies' && (
          <div>
            <SEOHead
              title="Institutional Case Studies | TULC"
              description="Quantitative evidence and performance logs from enterprise decoupling and 90-day operating system transformations."
              canonicalPath="/case-studies"
            />
            {renderSubpageBreadcrumb('Institutional Case Proof', 'Quantitative Evidence & Performance Logs')}
            <Suspense fallback={<div className="py-20 text-center text-[#9d7b38] font-mono text-xs flex justify-center items-center gap-2"><Loader2 className="w-4 h-4 animate-spin"/> Loading Case Studies...</div>}>
              <InstitutionalCaseStudies />
            </Suspense>
          </div>
        )}

        {/* 10. DEDICATED PRIVACY POLICY & DATA GOVERNANCE VIEW (Key Pages Requirement) */}
        {currentView === 'privacy' && (
          <div>
            <SEOHead
              title="Privacy Policy & Data Covenant | TULC"
              description="Institutional privacy policy, Chatham House confidentiality covenants, and GDPR/CCPA data governance standards."
              canonicalPath="/privacy"
            />
            <Suspense fallback={<div className="py-20 text-center text-[#9d7b38] font-mono text-xs flex justify-center items-center gap-2"><Loader2 className="w-4 h-4 animate-spin"/> Loading Privacy Docket...</div>}>
              <PrivacyPolicy
                onBackToHome={() => navigateTo('home')}
                onNavigate={navigateTo}
              />
            </Suspense>
          </div>
        )}

        {/* 11. DEDICATED CONTACT & ADVISORY DESK VIEW (Key Pages Requirement) */}
        {currentView === 'contact' && (
          <div>
            <SEOHead
              title="Contact Advisory Desk | TULC"
              description="Initiate confidential mandate dialogue under Chatham House non-disclosure rules. Direct telephone and corporate email access."
              canonicalPath="/contact"
            />
            {renderSubpageBreadcrumb('Confidential Advisory Desk', 'Chatham House Protocol · In-Camera Privilege Enforced')}
            <ConfidentialInquiry
              initialPartnership={selectedPartnership}
              initialContext={inquiryContext}
            />
          </div>
        )}

        {/* 12. DEDICATED INSTITUTIONAL CLEARANCE & CLIENT PORTAL */}
        {currentView === 'portal' && (
          <div>
            <SEOHead
              title="Institutional Clearance & Sovereign Client Portal | TULC"
              description="Authorized cryptographic access terminal for active retainer enterprise clients, board directors, and institutional partners."
              canonicalPath="/portal"
            />
            {renderSubpageBreadcrumb('Institutional Clearance Portal', 'Encrypted Client Access & Stress-Testing Suite')}
            <Suspense fallback={<div className="py-20 text-center text-[#9d7b38] font-mono text-xs flex justify-center items-center gap-2"><Loader2 className="w-4 h-4 animate-spin"/> Authenticating Clearance Gateway...</div>}>
              <InstitutionalPortal
                onBackToHome={() => navigateTo('home')}
                onRequestAccess={() => navigateTo('contact')}
              />
            </Suspense>
          </div>
        )}

        {/* 13. DEDICATED EXECUTIVE VIDEO BRIEFING VIEW */}
        {currentView === 'briefing' && (
          <div>
            <SEOHead
              title="Executive Video Briefing | TULC"
              description="Direct founder briefing by Suchita Sancheti on 90-day decoupling methodology and sovereign operating architecture."
              canonicalPath="/briefing"
            />
            {renderSubpageBreadcrumb('Executive Video Briefing', 'Direct Founder Briefing by Suchita Sancheti')}
            <VideoBriefingSection
              onOpenConsultation={() => navigateTo('contact')}
              onTakeTest={() => navigateTo('test')}
            />
          </div>
        )}

        {/* 14. DEDICATED PARTNERSHIP PATHWAYS & SERVICES VIEW */}
        {currentView === 'partnerships' && (
          <div>
            <SEOHead
              title="Sovereign Partnership Pathways | TULC"
              description="Explore the 3 institutional engagement models: 90-Day Decoupling Retainer, Foundation Advisory, and Enterprise Conclave."
              canonicalPath="/services"
            />
            {renderSubpageBreadcrumb('Partnership Pathways & Retainers', '3 Sovereign Engagement Tracks')}
            <div className="py-6 sm:py-8">
              <PartnershipPathways
                selectedModelId={selectedPartnership}
                onSelectModel={(id) => setSelectedPartnership(id)}
                onOpenConsultationWithModel={handleOpenConsultationWithModel}
              />
            </div>
          </div>
        )}

      </main>

      {/* Global Footer with Vision, Mission, Direct Phone, Emails & Social Profiles */}
      <Footer onNavigate={navigateTo} />

      {/* Fluid Mobile Bottom Dock */}
      <MobileBottomNav onNavigate={navigateTo} currentView={currentView} />
    </div>
  );
};

export default App;
