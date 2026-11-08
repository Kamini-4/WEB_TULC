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
import { ArrowLeft, Loader2, Sparkles, ArrowRight, Scale, Video, Layers, BookOpen, Compass, ShieldCheck, Zap, Lock, Copy, CheckCircle2 } from 'lucide-react';
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
const CalendlyBookingView = lazy(() => import('./components/CalendlyBookingView').then(m => ({ default: m.CalendlyBookingView })));
const FAQPage = lazy(() => import('./components/FAQPage').then(m => ({ default: m.FAQPage })));

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
  | 'partnerships'
  | 'booking'
  | 'faq';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedPartnership, setSelectedPartnership] = useState<PartnershipModelId>('retainer');
  const [inquiryContext, setInquiryContext] = useState<string>('');
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  const copyPageUrl = (path: string) => {
    try {
      const fullUrl = `${window.location.origin}${path}`;
      navigator.clipboard.writeText(fullUrl);
      setCopiedPath(path);
      setTimeout(() => setCopiedPath(null), 2000);
    } catch {
      setCopiedPath(path);
      setTimeout(() => setCopiedPath(null), 2000);
    }
  };

  // Map clean URL paths to view modes without hashtag in link
  const getViewFromUrl = (): AppView => {
    // 1. Check pathname (e.g. /assessment, /portal, /services, /booking)
    const rawPath = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
    // 2. Check hash as legacy fallback (e.g. #portal, #assessment)
    const rawHash = window.location.hash.replace('#', '').toLowerCase();
    const route = rawPath || rawHash;

    if (route === 'assessment' || route === 'test' || route === 'simple-test' || route === 'audit' || route === 'founder-assessment') {
      return 'test';
    } else if (route === 'domains' || route === '5-domains' || route === 'framework') {
      return 'domains';
    } else if (route === 'diagnostic' || route === 'deep-assessment' || route === 'forensic-diagnostic') {
      return 'diagnostic';
    } else if (route === 'shop' || route === 'store' || route === 'documents' || route === 'publications' || route === 'blueprints' || route === 'toolkits') {
      return 'shop';
    } else if (route === 'blogs' || route === 'library' || route === 'dispatches' || route === 'articles') {
      return 'library';
    } else if (route === 'about' || route === 'vision-mission' || route === 'founder') {
      return 'about';
    } else if (route === 'briefing' || route === 'video' || route === 'founder-briefing') {
      return 'briefing';
    } else if (route === 'partnerships' || route === 'services' || route === 'retainer') {
      return 'partnerships';
    } else if (route === 'privacy' || route === 'privacy-policy' || route === 'terms') {
      return 'privacy';
    } else if (route === 'contact' || route === 'inquiry') {
      return 'contact';
    } else if (route === 'booking' || route === 'schedule' || route === 'calendly' || route === 'calendar') {
      return 'booking';
    } else if (route === 'portal' || route === 'clearance' || route === 'client-portal' || route === 'gate') {
      return 'portal';
    } else if (route === 'war-room') {
      return 'war-room';
    } else if (route === 'proof' || route === 'case-studies') {
      return 'case-studies';
    } else if (route === 'faq' || route === 'faqs' || route === 'questions') {
      return 'faq';
    } else if (route === 'comparison' || route === 'outcomes' || route === 'versus' || route === 'table') {
      return 'home';
    }
    return 'home';
  };

  // Synchronize clean path routing for direct URLs, back/forward buttons, and bookmarks
  useEffect(() => {
    const handleUrlChange = () => {
      const view = getViewFromUrl();
      setCurrentView(view);

      const rawPath = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();

      // If accessing comparison page directly, scroll to the comparison ledger
      if (rawPath === 'comparison' || rawPath === 'outcomes') {
        setTimeout(() => {
          const el = document.getElementById('comparison');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
        return;
      }

      // Sanitize any legacy hashtag in the link to clean URL path (preserving specific #faq-* deep-link anchors)
      if (window.location.hash && !window.location.hash.startsWith('#faq-')) {
        const hash = window.location.hash.replace('#', '').toLowerCase();
        let cleanPath = '/';
        if (hash === 'assessment' || hash === 'test' || hash === 'simple-test' || hash === 'audit' || hash === 'founder-assessment') cleanPath = '/assessment';
        else if (hash === 'domains' || hash === '5-domains' || hash === 'framework') cleanPath = '/domains';
        else if (hash === 'diagnostic' || hash === 'deep-assessment' || hash === 'forensic-diagnostic') cleanPath = '/diagnostic';
        else if (hash === 'shop' || hash === 'store' || hash === 'publications' || hash === 'blueprints' || hash === 'toolkits') cleanPath = '/shop';
        else if (hash === 'blogs' || hash === 'library' || hash === 'dispatches' || hash === 'articles') cleanPath = '/library';
        else if (hash === 'about' || hash === 'vision-mission' || hash === 'founder') cleanPath = '/about';
        else if (hash === 'briefing' || hash === 'video' || hash === 'founder-briefing') cleanPath = '/briefing';
        else if (hash === 'partnerships' || hash === 'services' || hash === 'retainer') cleanPath = '/services';
        else if (hash === 'privacy' || hash === 'privacy-policy' || hash === 'terms') cleanPath = '/privacy';
        else if (hash === 'contact' || hash === 'inquiry') cleanPath = '/contact';
        else if (hash === 'booking' || hash === 'schedule' || hash === 'calendly' || hash === 'calendar') cleanPath = '/booking';
        else if (hash === 'portal' || hash === 'clearance' || hash === 'client-portal' || hash === 'gate') cleanPath = '/portal';
        else if (hash === 'war-room') cleanPath = '/war-room';
        else if (hash === 'proof' || hash === 'case-studies') cleanPath = '/case-studies';
        else if (hash === 'faq' || hash === 'faqs' || hash === 'questions') cleanPath = '/faq';
        else if (hash === 'comparison' || hash === 'outcomes') cleanPath = '/comparison';

        try {
          window.history.replaceState(null, '', cleanPath);
        } catch {}
      }

      if (window.location.hash && window.location.hash.startsWith('#faq-')) {
        const targetId = window.location.hash.replace('#', '');
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const navigateTo = (target: string) => {
    let targetPath = '/';
    let targetView: AppView = 'home';
    let shouldScrollToSection: string | null = null;

    if (target === 'top' || target === 'home') {
      targetView = 'home';
      targetPath = '/';
    } else if (target === 'assessment' || target === 'test' || target === 'simple-test' || target === 'audit' || target === 'founder-assessment') {
      targetView = 'test';
      targetPath = '/assessment';
    } else if (target === 'domains' || target === '5-domains' || target === 'framework') {
      targetView = 'domains';
      targetPath = '/domains';
    } else if (target === 'diagnostic' || target === 'deep-assessment' || target === 'forensic-diagnostic') {
      targetView = 'diagnostic';
      targetPath = '/diagnostic';
    } else if (target === 'blogs' || target === 'library' || target === 'dispatches' || target === 'articles') {
      targetView = 'library';
      targetPath = '/library';
    } else if (target === 'about' || target === 'founder') {
      targetView = 'about';
      targetPath = '/about';
    } else if (target === 'briefing' || target === 'video' || target === 'founder-briefing') {
      targetView = 'briefing';
      targetPath = '/briefing';
    } else if (target === 'partnerships' || target === 'services' || target === 'retainer') {
      targetView = 'partnerships';
      targetPath = '/services';
    } else if (target === 'comparison' || target === 'outcomes' || target === 'versus' || target === 'table') {
      targetView = 'home';
      targetPath = '/';
      shouldScrollToSection = 'comparison';
    } else if (target === 'shop' || target === 'store' || target === 'publications' || target === 'blueprints' || target === 'toolkits') {
      targetView = 'shop';
      targetPath = '/shop';
    } else if (target === 'privacy' || target === 'privacy-policy' || target === 'terms') {
      targetView = 'privacy';
      targetPath = '/privacy';
    } else if (target === 'contact' || target === 'inquiry') {
      targetView = 'contact';
      targetPath = '/contact';
    } else if (target === 'booking' || target === 'schedule' || target === 'calendly' || target === 'calendar') {
      targetView = 'booking';
      targetPath = '/booking';
    } else if (target === 'portal' || target === 'clearance' || target === 'client-portal' || target === 'gate') {
      targetView = 'portal';
      targetPath = '/portal';
    } else if (target === 'war-room') {
      targetView = 'war-room';
      targetPath = '/war-room';
    } else if (target === 'proof' || target === 'case-studies') {
      targetView = 'case-studies';
      targetPath = '/case-studies';
    } else if (target === 'faq' || target === 'faqs' || target === 'questions') {
      targetView = 'faq';
      targetPath = '/faq';
    } else {
      // In-page section
      targetView = 'home';
      targetPath = '/';
      shouldScrollToSection = target;
    }

    setCurrentView(targetView);

    try {
      if (window.location.pathname !== targetPath || window.location.hash) {
        window.history.pushState(null, '', targetPath);
      }
    } catch {}

    if (shouldScrollToSection) {
      setTimeout(() => {
        const el = document.getElementById(shouldScrollToSection);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
    setInquiryContext(`Institutional Publication Order: Requesting official copy of "${doc.title}" (${doc.priceFormatted} · 100% credited toward retainer/assessment).`);
    navigateTo('contact');
  };

  // Subpage Top Navigation Bar with active Direct URL badge and 1-Click Copy
  const renderSubpageBreadcrumb = (title: string, subtitle: string, directPath?: string) => {
    const isCopied = directPath ? copiedPath === directPath : false;
    return (
      <div className="bg-[#f0eade] border-b border-[#dfd7c8] py-2 px-3 sm:px-6 lg:px-8">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => navigateTo('home')}
              aria-label="Go back to Home"
              title="Go back to Home"
              className="p-1.5 -ml-1 rounded-full text-[#17181c] hover:text-[#9d7b38] hover:bg-[#e4dcce] transition-colors cursor-pointer flex items-center justify-center min-w-[34px] min-h-[34px]"
            >
              <ArrowLeft className="w-4 h-4 text-[#9d7b38]" />
            </button>
            {directPath && (
              <div className="flex items-center gap-1.5">
                <span className="hidden md:inline text-[11px] font-mono text-[#6b6e76]">Direct link:</span>
                <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-xs bg-[#ffffff] border border-[#d8cebe] text-[#9d7b38]">
                  {directPath}
                </span>
                <button
                  onClick={() => copyPageUrl(directPath)}
                  title={`Copy direct link for ${directPath}`}
                  className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-mono font-medium rounded-xs bg-[#ffffff] hover:bg-[#17181c] text-[#17181c] hover:text-[#f8f6f0] border border-[#d8cebe] transition-colors cursor-pointer"
                >
                  {isCopied ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
          <div className="text-right ml-auto">
            <span className="text-xs font-bold text-[#17181c] uppercase">{title}</span>
            <span className="hidden sm:inline text-xs text-[#6b6e76] ml-2 font-mono">· {subtitle}</span>
          </div>
        </div>
      </div>
    );
  };

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
              title="The Unbounded Leadership Co. | Scale Beyond Founder Dependency · Fractional COO"
              description="Eliminate founder dependency, scale beyond founder bottlenecks, and install Fractional COO executive operating systems in 90 days."
              canonicalPath="/"
              keywords="founder dependency, scale beyond founder dependency, fractional COO, eliminate founder bottlenecks, executive operating systems, leadership architecture"
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
                    Scale Beyond Founder Dependency · Fractional COO
                  </span>
                  <h3 className="text-sm sm:text-base font-bold font-serif text-[#17181c]">
                    The 5 Core Domains of Decoupled Leadership
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
              title="Founder Dependency Assessment & Needs Test | TULC"
              description="Evaluate key-person risk, decision lag, and organizational drag with our 100% free, confidential 60-second diagnostic."
              canonicalPath="/assessment"
            />
            {renderSubpageBreadcrumb('The Founder Dependency Assessment', '100% Free · 60 Seconds · Instant Outcome Report', '/assessment')}
            <Suspense fallback={<div className="py-20 text-center text-[#9d7b38] font-mono text-xs flex justify-center items-center gap-2"><Loader2 className="w-4 h-4 animate-spin"/> Loading Assessment...</div>}>
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
              title="5 Core Domains of Decoupled Leadership | TULC"
              description="Explore the 5 domains of decoupled operating architecture: Cognitive Clarity, Systemic Integrity, Strategic Velocity, Moral Gravity, Cultural Fidelity."
              canonicalPath="/domains"
            />
            {renderSubpageBreadcrumb('5 Core Operating Domains', 'Architecture Guide & Mission Blueprint', '/domains')}
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
            {renderSubpageBreadcrumb('Phase 2 In-Depth Assessment', 'Patent-Pending L.O.S. Diagnostic™', '/diagnostic')}
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
            {renderSubpageBreadcrumb('Intelligence Library', '19 Strategic Dispatches by Suchita Sancheti', '/library')}
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
              canonicalPath="/shop"
            />
            {renderSubpageBreadcrumb('Executive Blueprints & Systems Toolkits', 'Systems Toolkits & Governance Blueprints', '/shop')}
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
            {renderSubpageBreadcrumb('The Firm & Founder Suchita Sancheti', 'Vision, Mission & Executive Architecture', '/about')}
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
            {renderSubpageBreadcrumb('Executive War Room Simulator', 'Strategic Scenario Simulator', '/war-room')}
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
            {renderSubpageBreadcrumb('Institutional Case Proof & Performance Logs', 'Quantitative Evidence & Performance Logs', '/case-studies')}
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
            {renderSubpageBreadcrumb('Privacy Policy & Data Covenant', 'Institutional Privacy & Governance Standards', '/privacy')}
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
            {renderSubpageBreadcrumb('Confidential Advisory Desk', 'Chatham House Protocol · In-Camera Privilege Enforced', '/contact')}
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
            {renderSubpageBreadcrumb('Institutional Clearance Portal', 'Encrypted Client Access & Stress-Testing Suite', '/portal')}
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
            {renderSubpageBreadcrumb('Executive Video Briefing', 'Direct Founder Briefing by Suchita Sancheti', '/briefing')}
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
            {renderSubpageBreadcrumb('Partnership Pathways & Retainers', '3 Sovereign Engagement Tracks', '/services')}
            <div className="py-6 sm:py-8">
              <PartnershipPathways
                selectedModelId={selectedPartnership}
                onSelectModel={(id) => setSelectedPartnership(id)}
                onOpenConsultationWithModel={handleOpenConsultationWithModel}
              />
            </div>
          </div>
        )}

        {/* 15. DEDICATED CALENDLY BOOKING VIEW */}
        {currentView === 'booking' && (
          <div>
            <SEOHead
              title="Schedule Private Executive Briefing | TULC"
              description="Direct Calendly calendar reservation for 20-minute executive briefing with Suchita Sancheti under Chatham House rules."
              canonicalPath="/booking"
            />
            {renderSubpageBreadcrumb('Executive Scheduling Desk', 'Direct Calendly Calendar Integration', '/booking')}
            <Suspense fallback={<div className="py-20 text-center text-[#9d7b38] font-mono text-xs flex justify-center items-center gap-2"><Loader2 className="w-4 h-4 animate-spin"/> Loading Calendar Interface...</div>}>
              <CalendlyBookingView
                onBackToHome={() => navigateTo('home')}
                onNavigateToContact={() => navigateTo('contact')}
              />
            </Suspense>
          </div>
        )}

        {/* 16. DEDICATED CORPORATE FAQ & ARCHITECTURE GUIDE VIEW */}
        {currentView === 'faq' && (
          <div>
            <SEOHead
              title="Corporate FAQ & Leadership Architecture Guide | The Unbounded Leadership Co."
              description="Official 27-question guide on founder dependency, leadership architecture, decision rights, and organizational alignment by Suchita Sancheti."
              canonicalPath="/faq"
            />
            {renderSubpageBreadcrumb('Corporate FAQ & Architecture Guide', '27 Verified Institutional Answers', '/faq')}
            <Suspense fallback={<div className="py-20 text-center text-[#9d7b38] font-mono text-xs flex justify-center items-center gap-2"><Loader2 className="w-4 h-4 animate-spin"/> Loading Corporate FAQ...</div>}>
              <FAQPage
                onNavigate={navigateTo}
                onOpenConsultation={() => navigateTo('contact')}
              />
            </Suspense>
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
