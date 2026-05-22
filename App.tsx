
import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate, useParams } from 'react-router-dom';
import { doc, getDocFromServer } from 'firebase/firestore';
import { db } from './src/firebase.ts';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import Home from './src/pages/Home.tsx';
import About from './src/pages/About.tsx';
import Library from './src/pages/Library.tsx';
import MethodologyPage from './src/pages/MethodologyPage.tsx';
import AssessmentPage from './src/pages/AssessmentPage.tsx';
import IntakePage from './src/pages/IntakePage.tsx';
import Portal from './src/pages/Portal.tsx';
import ArticleView from './components/ArticleView.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import FloatingCTA from './components/FloatingCTA.tsx';
import AdminDashboard from './components/AdminDashboard.tsx';
import Countdown from './components/Countdown.tsx';
import { INSTITUTIONAL_ARTICLES, getArticleById } from './src/lib/articles.ts';

interface Article {
  id?: string;
  category: string;
  title: string;
  content: string[];
  date?: string;
}

// Institutional Knowledge Graph Resolver
// Removed redundant wrapper in favor of centralized ArticleHandler

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
    
    // Institutional Analytics: Track strategic movement within the sovereignty graph
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'page_view', {
        page_path: pathname + hash,
        page_location: window.location.href,
        page_title: document.title
      });
    }
  }, [pathname, hash]);
  return null;
};

const ArticleHandler: React.FC<{
  activeArticle: Article | null;
  setActiveArticle: (article: Article | null) => void;
}> = ({ activeArticle, setActiveArticle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { articleId } = useParams();

  useEffect(() => {
    if (articleId && (!activeArticle || activeArticle.id !== articleId)) {
      const found = getArticleById(articleId);
      if (found) {
        setActiveArticle(found);
      }
    }
  }, [articleId, activeArticle, setActiveArticle]);

  return (
    <ArticleView 
      article={activeArticle} 
      onClose={() => {
        setActiveArticle(null);
        if (location.pathname.includes('/library/')) {
          navigate('/library');
        } else {
          navigate('/');
        }
      }} 
    />
  );
};

const App: React.FC = () => {
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const testConnection = async () => {
      const path = 'blog';
      try {
        await getDocFromServer(doc(db, path, '_health_check_'));
        console.log("Firestore connection successful.");
      } catch (error: any) {
        if (error.message?.includes('offline')) {
          console.error("Firestore is offline. Please check your Firebase configuration.");
        } else if (error.code === 'permission-denied') {
          console.log("Firestore connection successful (reached backend).");
        } else {
          console.error("Firestore connection test error:", error);
        }
      }
    };
    testConnection();
  }, []);

  const handleOpenArticle = (article: any, navigate: any) => {
    setActiveArticle(article);
    if (article.id) {
      navigate(`/library/${article.id}`);
    }
  };

  const handleLegalClick = (type: 'disclosure' | 'terms' | 'disclaimer') => {
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
      },
      disclaimer: {
        category: "Institutional Integrity",
        title: "Rigorous Institutional Disclaimer",
        content: [
          "THE UNBOUNDED LEADERSHIP CO. (TULC) IS AN ARCHITECTURAL AND STRATEGIC DIAGNOSTIC FIRM. IT IS NOT A LAW FIRM, FINANCIAL ADVISORY, MEDICAL PROVIDER, OR LICENSED PSYCHOLOGICAL SERVICE.",
          "1. NO PROFESSIONAL ADVICE: All dispatches, diagnostics, and architectural blueprints provided via this terminal are for institutional design purposes only. They do not constitute legal, financial, tax, or psychological advice. Principals are expected to consult with their respective licensed professionals before making high-stakes decisions based on TULC diagnostics.",
          "2. TRAILER VS. INSTRUMENT: The 'Yield Calibration' diagnostic on this website is an Institutional Snapshot (Trailer) designed for preliminary substrate mapping. It is a precursor to the definitive 'In-depth Architectural Assessment' (The Instrument). TULC does not guarantee the completeness of the trailer dossier for complex decision-making.",
          "3. THIRD-PARTY REDIRECT: All payments for the In-depth Assessment are processed via Razorpay. Upon successful verification, users are redirected to a standalone operational environment (The Sovereign Portal). TULC's liability for the redirect process is limited to the transaction volume governed by our payment partner's security protocols.",
          "4. LIMITATION OF LIABILITY: TULC, its Principal Architect, and its affiliates shall not be liable for any systemic institutional variance, market loss, or individual leadership burnout resulting from the application or misapplication of Sovereign Protocols. Governance remains the sole responsibility of the Fiduciary Source.",
          "5. INTELLECTUAL SOVEREIGNTY: All methodologies, including 'Cognitive Equity,' 'Institutional Lag,' and 'Structural Decoupling,' are the proprietary intellectual property of The Unbounded Leadership Co. Unauthorized derivation or competitive benchmarking is strictly prohibited."
        ]
      }
    };
    setActiveArticle(legalContent[type]);
  };

  const handleBriefClick = (phaseId?: string) => {    
    const content: Record<string, Article> = {
      '01': {
        category: "The Sovereign Protocol - Phase 01",
        title: "The Substrate Audit: Forensic Analysis of Institutional Lag",
        content: [
          "In Phase 01, we move beyond surface-level management consulting to perform a forensic audit of your organizational substrate. We are identifying the specific points of Institutional Lag—the invisible friction that turns strategic intent into operational entropy. This is not just about efficiency; it is about the preservation of your Strategic Sovereignty.",
          "We analyze the 'rhythm of command' within your institution. Most Principals are trapped in a cycle of tactical resolution, spending over 60% of their bandwidth on variances that should be handled by systemic logic. This is what we define as a Substrate Leak. Your foundation is currently draining your most precious asset: your cognitive equity.",
          "The Audit asks the high-stakes questions: Why does the organization require your direct intervention for tactical execution? Why is your authority being diluted by layers of consensus? We identify every logic gate that currently acts as a bottleneck. These are not merely management issues; they are structural failures that limit your ability to scale.",
          "Using data-driven diagnostics, we map the flow of intent from the Source to the Edge. We often find that the 'Heroic Founder' archetype—while responsible for initial success—is now the primary constraint on institutional growth. The Audit is the first step in transitioning from the 'Hero' who solves problems to the Architect who prevents them.",
          "This phase is deep and analytical. We observe the relational infrastructure and find where 'Trust Resonance' is being lost. We are not looking for incremental improvements; we are looking for the structural arbitrage that will reclaim your strategic bandwidth. This is the foundation of the Sovereign Institution.",
          "The yield of Phase 01 is a clear, documented map of your institutional leaks. It is the moment you stop dousing fires and start analyzing the physics of the building. We are preparing the ground for a total recalibration of your leadership operating system."
        ]
      },
      '02': {
        category: "The Sovereign Protocol - Phase 02",
        title: "Logic Gate Engineering: Hard-Coding Strategic Intent",
        content: [
          "Once the leaks are identified, we move to Logic Gate Engineering. This is the process of externalizing your unique strategic DNA and hard-coding it into the organizational substrate. We are building a high-fidelity proxy of your mind, ensuring the system executes with your precision, even in your absence.",
          "Most delegation fails because the Logic is not transferred—only the Task. Phase 02 solves this by creating autonomous logic gates that handle 80% of tactical variances. We define the parameters, the moral logic, and the strategic boundaries that govern your institution. This is the move from 'Management' to Architectural Command.",
          "Think of this as building the 'Automatic Transmission' for your enterprise. You are no longer shifting the gears of daily operations; you are designing the system that optimizes the shift. We ensure that your vision is not a 'suggestion' that gets lost in translation, but a 'law' that governs the structural design.",
          "This phase creates Operational Leverage. By engineering the substrate, you project your authority with absolute resonance. It is an inclusive process that provides your team with a clear, logical framework. They no longer have to guess your intent; the system makes it obvious. This empowers the edge and liberates the source.",
          "We are targeting a 10x increase in decision velocity. By reclaiming 30-40% of your bandwidth, we restore your capacity for high-stakes strategic work. You are no longer the engine of the company; you are the engineer of the institution. You are moving from the loud noise of execution to the quiet resonance of design.",
          "The soul of this phase is the restoration of your peace. It is the realization that your standards can be met through architecture rather than intervention. You are building a foundation of logic that carries your intent with asymptotic fidelity, ensuring your legacy is built on structure, not just effort."
        ]
      },
      '03': {
        category: "The Sovereign Protocol - Phase 03",
        title: "Institutional Calibration: Achieving Trust Resonance",
        content: [
          "With the logic gates engineered, we must ensure the entire system is in sync. This is Institutional Calibration. We are aligning every layer of the organization—from the boardroom to the front line—to vibrate at the same frequency as your core intent. We call this achieving Trust Resonance.",
          "Trust is not a 'feeling'; it is the gravity that holds your institution together. When resonance is low, there is friction and Institutional Drift. People may be aligned on paper, but they are pulling in different directions in practice. Phase 03 eliminates this drift by calibrating the relational infrastructure.",
          "We use 'Resonance Audits' to identify where the strategic signal is being lost. We recalibrate communication substrates, incentive structures, and governance protocols. We ensure that the 'Moral Logic' engineered in Phase 02 is felt and acted upon at every level. This is the move from 'Heroic Intervention' to Systemic Inevitability.",
          "This is a soulful, yet highly strategic process. We are aligning the human element with the architectural design. We are creating a 'heavy' institution—one with so much institutional gravity that alignment becomes effortless. When resonance is high, you do not 'manage' people; you project intent, and the system executes.",
          "The yield of Calibration is total institutional alignment and the elimination of cultural entropy. Research indicates that high-trust organizations experience 50% higher productivity and significantly lower operational stress. You will feel the difference in the quiet confidence of your leaders and the weight of the intent in every room.",
          "You have built a vessel that can finally carry your vision across the ocean. The organization is no longer a collection of individuals; it is a high-fidelity execution machine, calibrated to your unique strategic frequency. This is the restoration of your institutional peace."
        ]
      },
      '04': {
        category: "The Sovereign Protocol - Phase 04",
        title: "Sovereign Handover: Transitioning to the Architect’s Seat",
        content: [
          "This is the culmination of the methodology: the Sovereign Handover. This is not about your departure; it is about your arrival in the role you were meant to play. You are transitioning from the 'Chief Problem Solver' to the Sovereign Architect. You are finally presiding over the institution.",
          "In Phase 04, we finalize the autonomous protocols and ensure the Adaptive Logic Layers are functioning. Your institution has moved from 'Resilience' to Antifragility. It no longer just survives disruption; it gains from it. It is a self-regulating organism that carries your DNA in every cell.",
          "This is the quiet reclamation of your life. You have restored your Cognitive Equity. You are now cognitively solvent, with the bandwidth to spot the next major market disruption or to simply enjoy the fruits of your labor. You have decoupled your impact from your hours.",
          "This is the Architect’s Mandate. Your primary role is now to maintain the resonance of the design, not to solve the tactical problems of the day. You are the Source. The Principal. The organization is now a sovereign institution that respects your time and your vision, moving as fast as you think and as deep as you feel.",
          "Most leaders stay trapped in the 'Hero' identity until they burn out or the company plateaus. By choosing the path of architecture, you have built something bigger than yourself. You have created a legacy that is truly sovereign, ensuring your intent persists with absolute fidelity long after you have left the room.",
          "The yield is a documented 30-40% increase in strategic bandwidth and a system that out-decides the competition by 10x. But the real yield is the restoration of your sovereignty. You are free. The institution is sovereign. The vision is secure. This is the beginning of your true leadership journey."
        ]
      }
    };

    if (phaseId && content[phaseId]) {
      setActiveArticle(content[phaseId]);
    } else {
      setActiveArticle({
        category: "Institutional Protocol",
        title: "The Sovereignty Brief: A Manifesto for the Sovereign Principal",
        content: [
          "Sovereignty is not a goal; it is a state of architectural integrity. It is the quiet realization that you are no longer a slave to the tactical noise of your own creation. It is the restoration of your original vision, unclouded by the Institutional Lag that plagues the mediocre. This Brief is for the Principal who understands that true power is found in Architecture, not intervention.",
          "We live in an era of Cognitive Insolvency. Most leaders are bankrupt, spending their mental energy on the tactical 'how' while their competitors build the future. This is a tragedy of design. It is a failure to respect the strategic bandwidth of the leader. The Sovereign Institution is the antidote.",
          "A Sovereign Institution is a substrate that hard-codes intent into every logic gate. It is a 'heavy' institution that projects authority with absolute resonance. It is inclusive, resilient, and antifragile. It is the only way to scale impact in a world of infinite complexity. It is the move from 'Heroic Intervention' to Systemic Inevitability.",
          "Think of the weight of your intent. If it is diluted by a broken substrate, it is worthless. But if it is projected through a high-fidelity architecture, it becomes a force of nature. You move from being a bottleneck to being a Source. You move from management to command. You move from the engine to the engineer.",
          "This is the Architect’s Mandate. It is the soulful reclamation of your strategic sovereignty. It is the decision to build a legacy that lasts for generations. It is the only path for the elite Principal who refuses to be consumed by their own creation.",
          "We invite you to join us. To audit your substrate, to engineer your logic gates, and to calibrate your institution. To step into the architect’s seat and finally, truly, preside. This is the yield of our work. This is the restoration of your peace. This is your sovereignty."
        ]
      });
    }
  };

  return (
    <ErrorBoundary>
      <ScrollToTop />
      <div className="min-h-screen selection:bg-[#b8860b] selection:text-white bg-[#f5f5f0]">
        <div className="fixed top-0 left-0 right-0 z-[100]">
          <Countdown />
          <Header onAdminTrigger={() => setShowAdmin(true)} />
        </div>
        <main className="pt-20 sm:pt-24 md:pt-28">
          <Routes>
            <Route path="/" element={<Home onBriefClick={handleBriefClick} onArticleClick={(a) => handleOpenArticle(a, navigate)} />} />
            <Route path="/about" element={<About />} />
            <Route path="/library" element={<Library onArticleClick={(a) => handleOpenArticle(a, navigate)} />} />
            <Route path="/library/:articleId" element={<Library onArticleClick={(a) => handleOpenArticle(a, navigate)} />} />
            <Route path="/methodology" element={<MethodologyPage onBriefClick={handleBriefClick} />} />
            <Route path="/assessment" element={<AssessmentPage />} />
            <Route path="/intake" element={<IntakePage />} />
            <Route path="/portal" element={<Portal />} />
          </Routes>
        </main>
        <Footer onLegalClick={handleLegalClick} />
        
        <FloatingCTA onAuditClick={() => {
          if (location.pathname === '/assessment') {
            document.getElementById('assessment')?.scrollIntoView({ behavior: 'smooth' });
          } else {
            navigate('/assessment');
          }
        }} />

        <Routes>
          <Route path="/library/:articleId" element={<ArticleHandler activeArticle={activeArticle} setActiveArticle={setActiveArticle} />} />
          <Route path="*" element={<ArticleView article={activeArticle} onClose={() => setActiveArticle(null)} />} />
        </Routes>

        {showAdmin && (
          <AdminDashboard onClose={() => setShowAdmin(false)} />
        )}
      </div>
    </ErrorBoundary>
  );
};

export default App;
