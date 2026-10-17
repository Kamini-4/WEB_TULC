import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Countdown } from './components/Countdown';
import { Footer } from './components/Footer';
import { ConciergeModal } from './components/ConciergeModal';
import { Headphones } from 'lucide-react';

// Pages
import { Home } from './src/pages/Home';
import { Library } from './src/pages/Library';
import { AssessmentPage } from './src/pages/AssessmentPage';
import { CognitiveTaxPage } from './src/pages/CognitiveTaxPage';
import { ServicesPage } from './src/pages/ServicesPage';
import { MethodologyPage } from './src/pages/MethodologyPage';
import { About } from './src/pages/About';
import { IntakePage } from './src/pages/IntakePage';
import { ShopPage } from './src/pages/Shop';
import { ArticleRouteWrapper } from './components/ArticleRouteWrapper';
import Portal from './src/pages/Portal';
import { FAQPage } from './src/pages/FAQPage';

export const App: React.FC = () => {
  const [floatingConciergeOpen, setFloatingConciergeOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#f7f4ee] text-[#1c1917] font-serif selection:bg-[#b8860b] selection:text-white relative">
      <Countdown />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/library/:slug" element={<ArticleRouteWrapper />} />
          
          {/* Digital Products & Systems */}
          <Route path="/products" element={<ShopPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/toolkits" element={<ShopPage />} />
          
          {/* Legacy & direct routes for dispatches */}
          <Route path="/article/:slug" element={<ArticleRouteWrapper />} />
          <Route path="/dispatch/:slug" element={<ArticleRouteWrapper />} />
          
          {/* Strategic Diagnostics */}
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/cognitive-tax" element={<CognitiveTaxPage />} />
          
          {/* Institutional Advisory & Services */}
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/mandates" element={<ServicesPage />} />
          <Route path="/methodology" element={<MethodologyPage />} />
          
          {/* Executive Clarifications */}
          <Route path="/faq" element={<FAQPage />} />
          
          {/* Institutional Portal */}
          <Route path="/portal" element={<Portal />} />
          
          {/* Leadership & Intake */}
          <Route path="/about" element={<About />} />
          <Route path="/intake" element={<IntakePage />} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />

      {/* Persistent Executive Concierge Launcher */}
      <div className="fixed bottom-5 right-5 z-40 hidden sm:block">
        <button
          type="button"
          onClick={() => setFloatingConciergeOpen(true)}
          className="flex items-center gap-2 px-3.5 py-2.5 bg-[#1c1917] hover:bg-[#8c6708] text-white border border-[#b8860b]/60 rounded-xs shadow-2xl transition-all cursor-pointer group hover:scale-[1.02]"
          title="Direct Executive Concierge Desk"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <Headphones className="w-3.5 h-3.5 text-[#b8860b] group-hover:text-white" />
          <span className="text-[11px] font-mono uppercase font-bold tracking-wider">Executive Concierge</span>
        </button>
      </div>

      <ConciergeModal isOpen={floatingConciergeOpen} onClose={() => setFloatingConciergeOpen(false)} />
    </div>
  );
};

export default App;

