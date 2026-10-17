import React, { useState } from 'react';
import { PlaybookExplorer } from '../components/PlaybookExplorer';
import { ConciergeModal } from '../../components/ConciergeModal';
import { SEOHead } from '../components/SEOHead';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { InternalLinksMatrix } from '../components/InternalLinksMatrix';

export const PlaybookPage: React.FC = () => {
  const [conciergeOpen, setConciergeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans">
      <SEOHead
        title="Strategic Doctrine & Executive Playbook (A–Z)"
        description="Comprehensive strategic doctrine on constructive tension, permission marketing, tribe building, and sovereign decision-making for enterprise founders."
        canonicalPath="/playbook"
        keywords="strategic doctrine, sovereign playbook, constructive tension, permission marketing, tribe building, leadership architecture"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Strategic Playbook', path: '/playbook' }
        ]}
      />
      <Breadcrumbs items={[{ name: 'Strategic Playbook (A–Z)', path: '/playbook' }]} className="bg-zinc-900/90 border-zinc-800 text-zinc-400" />

      <div className="flex-1 py-8">
        <PlaybookExplorer onOpenCalibration={() => setConciergeOpen(true)} />
      </div>

      {/* Institutional Internal Linking Matrix */}
      <InternalLinksMatrix currentPath="/playbook" />

      <ConciergeModal isOpen={conciergeOpen} onClose={() => setConciergeOpen(false)} />
    </div>
  );
};

export default PlaybookPage;
