import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Pages
import { Home } from './src/pages/Home';
import { Library } from './src/pages/Library';
import { AssessmentPage } from './src/pages/AssessmentPage';
import { CognitiveTaxPage } from './src/pages/CognitiveTaxPage';
import { ServicesPage } from './src/pages/ServicesPage';
import { MethodologyPage } from './src/pages/MethodologyPage';
import { About } from './src/pages/About';
import { IntakePage } from './src/pages/IntakePage';
import { ArticleRouteWrapper } from './components/ArticleRouteWrapper';

export const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0b0c10] text-[#e0e2ec]">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/library" element={<Library />} />
          <Route path="/library/:slug" element={<ArticleRouteWrapper />} />
          
          {/* Legacy & direct routes for dispatches */}
          <Route path="/article/:slug" element={<ArticleRouteWrapper />} />
          <Route path="/dispatch/:slug" element={<ArticleRouteWrapper />} />
          
          {/* Strategic Diagnostics */}
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/cognitive-tax" element={<CognitiveTaxPage />} />
          
          {/* Institutional Advisory */}
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/mandates" element={<ServicesPage />} />
          <Route path="/methodology" element={<MethodologyPage />} />
          
          {/* Principal & Intake */}
          <Route path="/about" element={<About />} />
          <Route path="/intake" element={<IntakePage />} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
