import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { TribeManifesto } from './components/TribeManifesto';
import { PlaybookExplorer } from './components/PlaybookExplorer';
import { DiagnosticFunnel } from './components/DiagnosticFunnel';
import { BlogSection } from './components/BlogSection';
import { CalibrationModal } from './components/CalibrationModal';
import { Footer } from './components/Footer';

export function App() {
  const [activeTab, setActiveTab] = useState<'tribe' | 'playbook' | 'diagnostic' | 'essays'>('tribe');
  const [isCalibrationModalOpen, setIsCalibrationModalOpen] = useState(false);

  const openCalibrationModal = () => setIsCalibrationModalOpen(true);
  const closeCalibrationModal = () => setIsCalibrationModalOpen(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-amber-500/20 selection:text-amber-300">
      {/* Top Navigation */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openCalibrationModal={openCalibrationModal}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* If Tribe is active, show the full Sovereign Landing Page flow */}
        {activeTab === 'tribe' && (
          <div>
            <HeroSection
              onStartDiagnostic={() => setActiveTab('diagnostic')}
              onExplorePlaybook={() => setActiveTab('playbook')}
              openCalibrationModal={openCalibrationModal}
            />
            <TribeManifesto
              onTakeDiagnostic={() => setActiveTab('diagnostic')}
              openCalibrationModal={openCalibrationModal}
            />
          </div>
        )}

        {/* Seth Godin A-Z Playbook view */}
        {activeTab === 'playbook' && (
          <div>
            <PlaybookExplorer onOpenCalibration={openCalibrationModal} />
          </div>
        )}

        {/* Interactive Constructive Tension Diagnostic Funnel */}
        {activeTab === 'diagnostic' && (
          <div>
            <DiagnosticFunnel onOpenCalibration={openCalibrationModal} />
          </div>
        )}

        {/* Rewritten Executive Essays (HBR Rigor / No Jargon) */}
        {activeTab === 'essays' && (
          <div>
            <BlogSection onOpenCalibration={openCalibrationModal} />
          </div>
        )}
      </main>

      {/* White-Glove Executive Calibration Modal */}
      <CalibrationModal
        isOpen={isCalibrationModalOpen}
        onClose={closeCalibrationModal}
      />

      {/* Institutional Footer */}
      <Footer
        onSelectTab={setActiveTab}
        openCalibrationModal={openCalibrationModal}
      />
    </div>
  );
}

export default App;
