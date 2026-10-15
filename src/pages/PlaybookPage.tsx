import React, { useState } from 'react';
import { PlaybookExplorer } from '../components/PlaybookExplorer';
import { ConciergeModal } from '../../components/ConciergeModal';
import { Compass } from 'lucide-react';

export const PlaybookPage: React.FC = () => {
  const [conciergeOpen, setConciergeOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-8">
      <PlaybookExplorer onOpenCalibration={() => setConciergeOpen(true)} />
      <ConciergeModal isOpen={conciergeOpen} onClose={() => setConciergeOpen(false)} />
    </div>
  );
};

export default PlaybookPage;
