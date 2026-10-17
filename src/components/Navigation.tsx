import React from 'react';
import { Compass, BookOpen, Layers, Activity, ShieldCheck, ChevronRight } from 'lucide-react';

interface NavigationProps {
  activeTab: 'tribe' | 'diagnostic' | 'essays';
  setActiveTab: (tab: 'tribe' | 'diagnostic' | 'essays') => void;
  openCalibrationModal: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  openCalibrationModal
}) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <div 
          onClick={() => setActiveTab('tribe')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-amber-400/20 via-zinc-900 to-zinc-950 border border-amber-500/30 flex items-center justify-center text-amber-400 font-serif font-bold text-xl group-hover:border-amber-400/60 transition-all duration-300">
            Ω
          </div>
          <div>
            <span className="serif-heading font-semibold text-lg sm:text-xl tracking-wide text-zinc-100 flex items-center gap-2">
              The Unbounded Leadership Co.
            </span>
            <span className="text-[10px] tracking-widest uppercase text-amber-400/80 font-mono block -mt-1">
              Sovereign Operating Systems
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center gap-1 bg-zinc-900/60 border border-zinc-800 p-1 rounded-full text-xs">
          <button
            onClick={() => setActiveTab('tribe')}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${
              activeTab === 'tribe'
                ? 'bg-amber-400 text-zinc-950 font-semibold shadow-sm shadow-amber-400/20'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            The Sovereign Tribe
          </button>

          <button
            onClick={() => setActiveTab('diagnostic')}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${
              activeTab === 'diagnostic'
                ? 'bg-amber-400 text-zinc-950 font-semibold shadow-sm shadow-amber-400/20'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Diagnostic Funnel
          </button>

          <button
            onClick={() => setActiveTab('essays')}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 flex items-center gap-2 ${
              activeTab === 'essays'
                ? 'bg-amber-400 text-zinc-950 font-semibold shadow-sm shadow-amber-400/20'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Rewritten Executive Essays
          </button>
        </nav>

        {/* Primary Calibration Action */}
        <div className="flex items-center gap-3">
          <div className="hidden xl:flex items-center gap-2 text-xs font-mono text-zinc-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Q3 Cohort: 1 Spot Remaining</span>
          </div>

          <button
            onClick={openCalibrationModal}
            className="px-4 sm:px-5 py-2.5 rounded-sm bg-gradient-to-r from-amber-400 to-amber-500 text-zinc-950 font-semibold text-xs tracking-wider uppercase hover:from-amber-300 hover:to-amber-400 transition-all duration-200 shadow-md shadow-amber-500/10 flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <span>Request Calibration</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="md:hidden flex items-center justify-around border-t border-zinc-800/80 bg-zinc-900/90 py-2.5 px-2 text-xs">
        <button
          onClick={() => setActiveTab('tribe')}
          className={`px-3 py-1.5 rounded-full ${activeTab === 'tribe' ? 'bg-amber-400 text-zinc-950 font-semibold' : 'text-zinc-400'}`}
        >
          Tribe
        </button>
        <button
          onClick={() => setActiveTab('diagnostic')}
          className={`px-3 py-1.5 rounded-full ${activeTab === 'diagnostic' ? 'bg-amber-400 text-zinc-950 font-semibold' : 'text-zinc-400'}`}
        >
          Diagnostic
        </button>
        <button
          onClick={() => setActiveTab('essays')}
          className={`px-3 py-1.5 rounded-full ${activeTab === 'essays' ? 'bg-amber-400 text-zinc-950 font-semibold' : 'text-zinc-400'}`}
        >
          Essays
        </button>
      </div>
    </header>
  );
};
