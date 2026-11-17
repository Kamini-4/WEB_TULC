import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { VideoBriefingSection } from './components/VideoBriefingSection';
import { AboutSection } from './components/AboutSection';
import { PartnershipPathways } from './components/PartnershipPathways';
import { ConfidentialInquiry } from './components/ConfidentialInquiry';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { SEOHead } from './components/SEOHead';
import { PartnershipModelId, PartnershipPathway } from './types';
import { ArrowLeft, Loader2, Copy, CheckCircle2 } from 'lucide-react';
import { ShopDocument } from './components/ExecutiveShop';

// Dynamic Code Splitting for Performance & Mobile Optimization
const SimpleNeedsTest = lazy(() =>
  import('./components/SimpleNeedsTest').then((m) => ({ default: m.SimpleNeedsTest }))
);
const ExecutiveShop = lazy(() =>
  import('./components/ExecutiveShop').then((m) => ({ default: m.ExecutiveShop }))
);
const BlogSection = lazy(() =>
  import('./components/BlogSection').then((m) => ({ default: m.BlogSection }))
);
const InstitutionalCaseStudies = lazy(() =>
  import('./components/InstitutionalCaseStudies').then((m) => ({
    default: m.InstitutionalCaseStudies,
  }))
);
const PrivacyPolicy = lazy(() =>
  import('./components/PrivacyPolicy').then((m) => ({ default: m.PrivacyPolicy }))
);
const InstitutionalPortal = lazy(() =>
  import('./components/InstitutionalPortal').then((m) => ({
    default: m.InstitutionalPortal,
  }))
);
const CalendlyBookingView = lazy(() =>
  import('./components/CalendlyBookingView').then((m) => ({
    default: m.CalendlyBookingView,
  }))
);
const FAQPage = lazy(() =>
  import('./components/FAQPage').then((m) => ({ default: m.FAQPage }))
);

export type AppView =
  | 'home'
  | 'test'
  | 'library'
  | 'about'
  | 'shop'
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
  const [assessmentTab, setAssessmentTab] = useState<'assessment' | 'model'>('assessment');
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

  // Map clean URL paths to unified view modes (diagnostic & operational model consolidated into 'test')
  const resolveRouteFromLocation = (): {
    view: AppView;
    tab: 'assessment' | 'model';
  } => {
    const rawPath = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
    const rawHash = window.location.hash.replace('#', '').toLowerCase();
    const route = rawPath || rawHash;

    if (
      route === 'assessment' ||
      route === 'simple-test' ||
      route === 'audit' ||
      route === 'founder-assessment' ||
      route === 'diagnostic' ||
      route === 'deep-assessment' ||
      route === 'forensic-diagnostic' ||
      route === 'war-room'
    ) {
      return { view: 'test', tab: 'assessment' };
    } else if (route === 'domains' || route === '5-domains' || route === 'framework') {
      return { view: 'test', tab: 'model' };
    } else if (
      route === 'shop' ||
      route === 'store' ||
      route === 'documents' ||
      route === 'publications' ||
      route === 'blueprints' ||
      route === 'toolkits'
    ) {
      return { view: 'shop', tab: 'assessment' };
    } else if (
      route === 'blogs' ||
      route === 'library' ||
      route === 'dispatches' ||
      route === 'articles'
    ) {
      return { view: 'library', tab: 'assessment' };
    } else if (route === 'about' || route === 'vision-mission' || route === 'founder') {
      return { view: 'about', tab: 'assessment' };
    } else if (route === 'briefing' || route === 'video' || route === 'founder-briefing') {
      return { view: 'briefing', tab: 'assessment' };
    } else if (route === 'partnerships' || route === 'services' || route === 'retainer') {
      return { view: 'partnerships', tab: 'assessment' };
    } else if (route === 'privacy' || route === 'privacy-policy' || route === 'terms') {
      return { view: 'privacy', tab: 'assessment' };
    } else if (route === 'contact' || route === 'inquiry') {
      return { view: 'contact', tab: 'assessment' };
    } else if (
      route === 'booking' ||
      route === 'schedule' ||
      route === 'calendly' ||
      route === 'calendar'
    ) {
      return { view: 'booking', tab: 'assessment' };
    } else if (
      route === 'portal' ||
      route === 'clearance' ||
      route === 'client-portal' ||
      route === 'gate'
    ) {
      return { view: 'portal', tab: 'assessment' };
    } else if (route === 'proof' || route === 'case-studies') {
      return { view: 'case-studies', tab: 'assessment' };
    } else if (route === 'faq' || route === 'faqs' || route === 'questions') {
      return { view: 'faq', tab: 'assessment' };
    }
    return { view: 'home', tab: 'assessment' };
  };

  useEffect(() => {
    const handleUrlChange = () => {
      const { view, tab } = resolveRouteFromLocation();
      setCurrentView(view);
      setAssessmentTab(tab);

      const rawPath = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();

      if (rawPath === 'comparison' || rawPath === 'outcomes') {
        setTimeout(() => {
          const el = document.getElementById('comparison');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 120);
        return;
      }

      if (window.location.hash && !window.location.hash.startsWith('#faq-')) {
        const hash = window.location.hash.replace('#', '').toLowerCase();
        let cleanPath = '/';
        if (
          hash === 'assessment' ||
          hash === 'simple-test' ||
          hash === 'audit' ||
          hash === 'founder-assessment' ||
          hash === 'diagnostic' ||
          hash === 'war-room'
        ) {
          cleanPath = '/assessment';
        } else if (hash === 'domains' || hash === '5-domains' || hash === 'framework') {
          cleanPath = '/assessment';
        } else if (
          hash === 'shop' ||
          hash === 'store' ||
          hash === 'publications' ||
          hash === 'blueprints' ||
          hash === 'toolkits'
        ) {
          cleanPath = '/shop';
        } else if (
          hash === 'blogs' ||
          hash === 'library' ||
          hash === 'dispatches' ||
          hash === 'articles'
        ) {
          cleanPath = '/library';
        } else if (hash === 'about' || hash === 'vision-mission' || hash === 'founder') {
          cleanPath = '/about';
        } else if (hash === 'briefing' || hash === 'video' || hash === 'founder-briefing') {
          cleanPath = '/briefing';
        } else if (hash === 'partnerships' || hash === 'services' || hash === 'retainer') {
          cleanPath = '/services';
        } else if (hash === 'privacy' || hash === 'privacy-policy' || hash === 'terms') {
          cleanPath = '/privacy';
        } else if (hash === 'contact' || hash === 'inquiry') {
          cleanPath = '/contact';
        } else if (
          hash === 'booking' ||
          hash === 'schedule' ||
          hash === 'calendly' ||
          hash === 'calendar'
        ) {
          cleanPath = '/booking';
        } else if (
          hash === 'portal' ||
          hash === 'clearance' ||
          hash === 'client-portal' ||
          hash === 'gate'
        ) {
          cleanPath = '/portal';
        } else if (hash === 'proof' || hash === 'case-studies') {
          cleanPath = '/case-studies';
        } else if (hash === 'faq' || hash === 'faqs' || hash === 'questions') {
          cleanPath = '/faq';
        } else if (hash === 'comparison' || hash === 'outcomes') {
          cleanPath = '/comparison';
        }

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
    let targetTab: 'assessment' | 'model' = 'assessment';
    let shouldScrollToSection: string | null = null;

    if (target === 'top' || target === 'home') {
      targetView = 'home';
      targetPath = '/';
    } else if (
      target === 'assessment' ||
      target === 'test' ||
      target === 'simple-test' ||
      target === 'audit' ||
      target === 'founder-assessment' ||
      target === 'diagnostic' ||
      target === 'deep-assessment' ||
      target === 'forensic-diagnostic' ||
      target === 'war-room'
    ) {
      targetView = 'test';
      targetPath = '/assessment';
      targetTab = 'assessment';
    } else if (target === 'domains' || target === '5-domains' || target === 'framework') {
      targetView = 'test';
      targetPath = '/assessment';
      targetTab = 'model';
    } else if (
      target === 'blogs' ||
      target === 'library' ||
      target === 'dispatches' ||
      target === 'articles'
    ) {
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
    } else if (
      target === 'comparison' ||
      target === 'outcomes' ||
      target === 'versus' ||
      target === 'table'
    ) {
      targetView = 'home';
      targetPath = '/';
      shouldScrollToSection = 'comparison';
    } else if (
      target === 'shop' ||
      target === 'store' ||
      target === 'publications' ||
      target === 'blueprints' ||
      target === 'toolkits'
    ) {
      targetView = 'shop';
      targetPath = '/shop';
    } else if (target === 'privacy' || target === 'privacy-policy' || target === 'terms') {
      targetView = 'privacy';
      targetPath = '/privacy';
    } else if (target === 'contact' || target === 'inquiry') {
      targetView = 'contact';
      targetPath = '/contact';
    } else if (
      target === 'booking' ||
      target === 'schedule' ||
      target === 'calendly' ||
      target === 'calendar'
    ) {
      targetView = 'booking';
      targetPath = '/booking';
    } else if (
      target === 'portal' ||
      target === 'clearance' ||
      target === 'client-portal' ||
      target === 'gate'
    ) {
      targetView = 'portal';
      targetPath = '/portal';
    } else if (target === 'proof' || target === 'case-studies') {
      targetView = 'case-studies';
      targetPath = '/case-studies';
    } else if (target === 'faq' || target === 'faqs' || target === 'questions') {
      targetView = 'faq';
      targetPath = '/faq';
    } else {
      targetView = 'home';
      targetPath = '/';
      shouldScrollToSection = target;
    }

    setCurrentView(targetView);
    setAssessmentTab(targetTab);

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

  const handleOpenConsultationWithModel = (model: PartnershipPathway) => {
    setSelectedPartnership(model.id);
    setInquiryContext(`Partnership Track Selected: ${model.name} (${model.cadence})`);
    navigateTo('contact');
  };

  const handleConsultationRequestFromDiagnostic = (data: Record<string, unknown>) => {
    setInquiryContext(
      `Diagnostic Outcome Calibration: Priority domain flagged as ${
        String(data.priorityDomain || 'Executive Focus')
      } (Score: ${String(data.score ?? 'N/A')}/100). Requesting confidential review.`
    );
    navigateTo('contact');
  };

  const handleConsultationRequestFromBlog = (articleTitle?: string) => {
    setInquiryContext(
      articleTitle
        ? `Strategic Intelligence Inquiry: Follow-up regarding executive dispatch "${articleTitle}".`
        : 'Strategic Intelligence Inquiry: General research dispatch inquiry.'
    );
    navigateTo('contact');
  };

  const handleInquireDocument = (doc: ShopDocument) => {
    setInquiryContext(
      `Institutional Publication Order: Requesting official copy of "${doc.title}" (${doc.priceFormatted} · 100% credited toward retainer/assessment).`
    );
    navigateTo('contact');
  };

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
                <span className="hidden md:inline text-[11px] font-mono text-[#6b6e76]">
                  Direct link:
                </span>
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
                      <span className="text-emerald-700 font-bold">Copied</span>
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
            <span className="hidden sm:inline text-xs text-[#6b6e76] ml-2 font-mono">
              · {subtitle}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8f6f0] text-[#17181c] flex flex-col font-serif selection:bg-[#17181c] selection:text-[#f8f6f0] pb-14 md:pb-0">
      <Header
        onNavigate={navigateTo}
        onLaunchDiagnostic={() => {
          if (currentView === 'home') {
            const el = document.getElementById('assessment-hub');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
              return;
            }
          }
          navigateTo('test');
        }}
        currentView={currentView}
      />

      <main className="flex-1">
        {/* 1. STREAMLINED LANDING PAGE */}
        {currentView === 'home' && (
          <>
            <SEOHead
              title="The Unbounded Leadership Co. | Scale Beyond Founder Dependency · Fractional COO"
              description="Eliminate founder dependency, scale beyond founder bottlenecks, and install Fractional COO executive operating systems in 90 days."
              canonicalPath="/"
              keywords="founder dependency, scale beyond founder dependency, fractional COO, eliminate founder bottlenecks, executive operating systems, leadership architecture"
            />

            <HeroSection
              onLaunchDiagnostic={() => {
                const el = document.getElementById('assessment-hub');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  navigateTo('test');
                }
              }}
              onExplorePartnerships={() => {
                const el = document.getElementById('partnerships');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                } else {
                  navigateTo('partnerships');
                }
              }}
            />

            {/* Unified 60-Sec Diagnostic & 5-Domain Operational Model */}
            <Suspense
              fallback={
                <div className="py-12 text-center text-[#9d7b38] font-mono text-xs flex justify-center items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Loading Assessment...
                </div>
              }
            >
              <SimpleNeedsTest
                key={`home-${assessmentTab}`}
                initialViewTab={assessmentTab}
                onConsultationRequest={handleConsultationRequestFromDiagnostic}
                onExplorePartnerships={() => navigateTo('partnerships')}
              />
            </Suspense>

            <AboutSection onOpenConsultation={() => navigateTo('contact')} />

            <div id="partnerships" className="scroll-mt-16">
              <PartnershipPathways
                selectedModelId={selectedPartnership}
                onSelectModel={(id) => setSelectedPartnership(id)}
                onOpenConsultationWithModel={handleOpenConsultationWithModel}
              />
            </div>

            <ConfidentialInquiry
              initialPartnership={selectedPartnership}
              initialContext={inquiryContext}
            />
          </>
        )}

        {/* 2. UNIFIED ASSESSMENT & OPERATIONAL MODEL VIEW */}
        {currentView === 'test' && (
          <div>
            <SEOHead
              title="60-Second Assessment & 5-Domain Operational Model | TULC"
              description="Evaluate key-person risk, decision lag, and organizational drag with our free 60-second assessment and 5-domain operational model."
              canonicalPath="/assessment"
            />
            {renderSubpageBreadcrumb(
              '60-Sec Assessment & Operational Model',
              'Instant Score · 90-Day Roadmap · PDF Report',
              '/assessment'
            )}
            <Suspense
              fallback={
                <div className="py-20 text-center text-[#9d7b38] font-mono text-xs flex justify-center items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Loading Assessment...
                </div>
              }
            >
              <SimpleNeedsTest
                key={`view-${assessmentTab}`}
                initialViewTab={assessmentTab}
                onConsultationRequest={handleConsultationRequestFromDiagnostic}
                onExplorePartnerships={() => navigateTo('partnerships')}
              />
            </Suspense>
          </div>
        )}

        {/* 3. RESEARCH DISPATCHES & LIBRARY */}
        {currentView === 'library' && (
          <div>
            <SEOHead
              title="Strategic Intelligence Library | TULC"
              description="19 institutional research dispatches and monographs by Suchita Sancheti on executive governance and enterprise sovereignty."
              canonicalPath="/library"
            />
            {renderSubpageBreadcrumb(
              'Intelligence Library',
              '19 Strategic Dispatches by Suchita Sancheti',
              '/library'
            )}
            <Suspense
              fallback={
                <div className="py-20 text-center text-[#9d7b38] font-mono text-xs flex justify-center items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Loading Intelligence Library...
                </div>
              }
            >
              <BlogSection onOpenConsultation={handleConsultationRequestFromBlog} />
            </Suspense>
          </div>
        )}

        {/* 4. EXECUTIVE TOOLKITS */}
        {currentView === 'shop' && (
          <div>
            <SEOHead
              title="Executive Blueprints & Systems | TULC"
              description="Codified institutional blueprints and operating frameworks for founder decoupling and leadership operating systems."
              canonicalPath="/shop"
            />
            {renderSubpageBreadcrumb(
              'Executive Blueprints & Systems Toolkits',
              'Systems Toolkits & Governance Blueprints',
              '/shop'
            )}
            <Suspense
              fallback={
                <div className="py-20 text-center text-[#9d7b38] font-mono text-xs flex justify-center items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Loading Executive Blueprints...
                </div>
              }
            >
              <ExecutiveShop
                onBackToHome={() => navigateTo('home')}
                onExploreServices={() => navigateTo('partnerships')}
                onInquireDocument={handleInquireDocument}
              />
            </Suspense>
          </div>
        )}

        {/* 5. ABOUT */}
        {currentView === 'about' && (
          <div>
            <SEOHead
              title="About Suchita Sancheti & The Firm | TULC"
              description="Learn about Suchita Sancheti and the institutional methodology behind Sovereign Enterprise Architecture."
              canonicalPath="/about"
            />
            {renderSubpageBreadcrumb(
              'The Firm & Founder Suchita Sancheti',
              'Vision, Mission & Executive Architecture',
              '/about'
            )}
            <AboutSection onOpenConsultation={() => navigateTo('contact')} />
          </div>
        )}

        {/* 6. CASE STUDIES */}
        {currentView === 'case-studies' && (
          <div>
            <SEOHead
              title="Institutional Case Studies | TULC"
              description="Quantitative evidence and performance logs from enterprise decoupling and 90-day operating system transformations."
              canonicalPath="/case-studies"
            />
            {renderSubpageBreadcrumb(
              'Institutional Case Proof & Performance Logs',
              'Quantitative Evidence & Performance Logs',
              '/case-studies'
            )}
            <Suspense
              fallback={
                <div className="py-20 text-center text-[#9d7b38] font-mono text-xs flex justify-center items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Loading Case Studies...
                </div>
              }
            >
              <InstitutionalCaseStudies />
            </Suspense>
          </div>
        )}

        {/* 7. PRIVACY POLICY */}
        {currentView === 'privacy' && (
          <div>
            <SEOHead
              title="Privacy Policy & Data Covenant | TULC"
              description="Institutional privacy policy, Chatham House confidentiality covenants, and GDPR/CCPA data governance standards."
              canonicalPath="/privacy"
            />
            {renderSubpageBreadcrumb(
              'Privacy Policy & Data Covenant',
              'Institutional Privacy & Governance Standards',
              '/privacy'
            )}
            <Suspense
              fallback={
                <div className="py-20 text-center text-[#9d7b38] font-mono text-xs flex justify-center items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Loading Privacy Docket...
                </div>
              }
            >
              <PrivacyPolicy
                onBackToHome={() => navigateTo('home')}
                onNavigate={navigateTo}
              />
            </Suspense>
          </div>
        )}

        {/* 8. CONTACT */}
        {currentView === 'contact' && (
          <div>
            <SEOHead
              title="Contact Advisory Desk | TULC"
              description="Initiate confidential mandate dialogue under Chatham House non-disclosure rules. Direct telephone and corporate email access."
              canonicalPath="/contact"
            />
            {renderSubpageBreadcrumb(
              'Confidential Advisory Desk',
              'Chatham House Protocol · In-Camera Privilege Enforced',
              '/contact'
            )}
            <ConfidentialInquiry
              initialPartnership={selectedPartnership}
              initialContext={inquiryContext}
            />
          </div>
        )}

        {/* 9. CLIENT PORTAL */}
        {currentView === 'portal' && (
          <div>
            <SEOHead
              title="Institutional Clearance & Sovereign Client Portal | TULC"
              description="Authorized cryptographic access terminal for active retainer enterprise clients, board directors, and institutional partners."
              canonicalPath="/portal"
            />
            {renderSubpageBreadcrumb(
              'Institutional Clearance Portal',
              'Encrypted Client Access & Stress-Testing Suite',
              '/portal'
            )}
            <Suspense
              fallback={
                <div className="py-20 text-center text-[#9d7b38] font-mono text-xs flex justify-center items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Authenticating Clearance Gateway...
                </div>
              }
            >
              <InstitutionalPortal
                onBackToHome={() => navigateTo('home')}
                onRequestAccess={() => navigateTo('contact')}
              />
            </Suspense>
          </div>
        )}

        {/* 10. VIDEO BRIEFING */}
        {currentView === 'briefing' && (
          <div>
            <SEOHead
              title="Executive Video Briefing | TULC"
              description="Direct founder briefing by Suchita Sancheti on 90-day decoupling methodology and sovereign operating architecture."
              canonicalPath="/briefing"
            />
            {renderSubpageBreadcrumb(
              'Executive Video Briefing',
              'Direct Founder Briefing by Suchita Sancheti',
              '/briefing'
            )}
            <VideoBriefingSection
              onOpenConsultation={() => navigateTo('contact')}
              onTakeTest={() => navigateTo('test')}
            />
          </div>
        )}

        {/* 11. SERVICES & PARTNERSHIPS */}
        {currentView === 'partnerships' && (
          <div>
            <SEOHead
              title="Sovereign Partnership Pathways | TULC"
              description="Explore the 3 institutional engagement models: 90-Day Decoupling Retainer, Foundation Advisory, and Enterprise Conclave."
              canonicalPath="/services"
            />
            {renderSubpageBreadcrumb(
              'Partnership Pathways & Retainers',
              '3 Sovereign Engagement Tracks',
              '/services'
            )}
            <div className="py-6 sm:py-8">
              <PartnershipPathways
                selectedModelId={selectedPartnership}
                onSelectModel={(id) => setSelectedPartnership(id)}
                onOpenConsultationWithModel={handleOpenConsultationWithModel}
              />
            </div>
          </div>
        )}

        {/* 12. CALENDLY BOOKING */}
        {currentView === 'booking' && (
          <div>
            <SEOHead
              title="Schedule Private Executive Briefing | TULC"
              description="Direct Calendly calendar reservation for 20-minute executive briefing with Suchita Sancheti under Chatham House rules."
              canonicalPath="/booking"
            />
            {renderSubpageBreadcrumb(
              'Executive Scheduling Desk',
              'Direct Calendly Calendar Integration',
              '/booking'
            )}
            <Suspense
              fallback={
                <div className="py-20 text-center text-[#9d7b38] font-mono text-xs flex justify-center items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Loading Calendar Interface...
                </div>
              }
            >
              <CalendlyBookingView
                onBackToHome={() => navigateTo('home')}
                onNavigateToContact={() => navigateTo('contact')}
              />
            </Suspense>
          </div>
        )}

        {/* 13. FAQ */}
        {currentView === 'faq' && (
          <div>
            <SEOHead
              title="Corporate FAQ & Leadership Architecture Guide | The Unbounded Leadership Co."
              description="Official 27-question guide on founder dependency, leadership architecture, decision rights, and organizational alignment by Suchita Sancheti."
              canonicalPath="/faq"
            />
            {renderSubpageBreadcrumb(
              'Corporate FAQ & Architecture Guide',
              '27 Verified Institutional Answers',
              '/faq'
            )}
            <Suspense
              fallback={
                <div className="py-20 text-center text-[#9d7b38] font-mono text-xs flex justify-center items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" /> Loading Corporate FAQ...
                </div>
              }
            >
              <FAQPage
                onNavigate={navigateTo}
                onOpenConsultation={() => navigateTo('contact')}
              />
            </Suspense>
          </div>
        )}
      </main>

      <Footer onNavigate={navigateTo} />

      <MobileBottomNav onNavigate={navigateTo} currentView={currentView} />
    </div>
  );
};

export default App;
