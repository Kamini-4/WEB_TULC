import React, { useState } from 'react';
import { PlaybookLetter, GODIN_PLAYBOOK } from '../data/godinPlaybookData';
import { Search, Filter, BookOpen, Quote, Sparkles, Check, Copy, ArrowRight, X } from 'lucide-react';

interface PlaybookExplorerProps {
  onOpenCalibration: () => void;
}

export const PlaybookExplorer: React.FC<PlaybookExplorerProps> = ({ onOpenCalibration }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLetterModal, setActiveLetterModal] = useState<PlaybookLetter | null>(null);
  const [copiedScriptLetter, setCopiedScriptLetter] = useState<string | null>(null);

  const categories = [
    'All',
    'Tribal Attraction',
    'Constructive Tension',
    'Generosity & Proof',
    'Prestige Scarcity'
  ];

  const filteredLetters = GODIN_PLAYBOOK.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.letter.toLowerCase() === searchTerm.toLowerCase() ||
      item.godinRule.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory =
      selectedCategory === 'All' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleCopyScript = (letter: string, script: string) => {
    navigator.clipboard.writeText(script);
    setCopiedScriptLetter(letter);
    setTimeout(() => {
      setCopiedScriptLetter(null);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-amber-400 font-mono text-xs uppercase tracking-widest mb-3">
          The Seth Godin Playbook (A to Z)
        </div>
        <h2 className="serif-heading text-3xl sm:text-5xl font-bold text-zinc-100 tracking-tight">
          How Seth Godin Would Sell Our Services
        </h2>
        <p className="text-zinc-400 text-base sm:text-lg mt-4 font-light">
          A 26-point sovereign masterclass replacing generic consultative pitches with radical positioning, permission marketing, constructive tension, and tribal identity.
        </p>
      </div>

      {/* Quick Letter Navigation Bar (A to Z) */}
      <div className="flex flex-wrap items-center justify-center gap-1.5 max-w-4xl mx-auto mb-8 p-2 rounded-xl bg-zinc-950 border border-zinc-800/80">
        {GODIN_PLAYBOOK.map(item => {
          const isSelected = activeLetterModal?.letter === item.letter;
          return (
            <button
              key={item.letter}
              onClick={() => setActiveLetterModal(item)}
              title={`${item.letter}: ${item.title}`}
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded text-xs font-mono font-semibold transition-all duration-150 flex items-center justify-center cursor-pointer ${
                isSelected
                  ? 'bg-amber-400 text-zinc-950 font-bold scale-110 shadow-sm shadow-amber-400/30'
                  : 'bg-zinc-900/60 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800'
              }`}
            >
              {item.letter}
            </button>
          );
        })}
      </div>

      {/* Controls: Search & Category Filters */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 max-w-5xl mx-auto">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            type="text"
            placeholder="Search letters, rules, scripts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-amber-400/60 transition-colors"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-zinc-950 font-semibold'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Letters Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredLetters.map(item => (
          <div
            key={item.letter}
            onClick={() => setActiveLetterModal(item)}
            className="p-6 rounded-xl bg-zinc-950 border border-zinc-800/80 hover:border-amber-500/40 hover:bg-zinc-900/40 transition-all duration-300 cursor-pointer flex flex-col justify-between group shadow-sm hover:shadow-lg hover:shadow-amber-500/5"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center font-serif text-xl font-bold text-amber-400 group-hover:scale-110 group-hover:border-amber-500/40 transition-all">
                  {item.letter}
                </div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                  {item.category}
                </span>
              </div>

              <h3 className="serif-heading text-xl font-bold text-zinc-100 mb-2 group-hover:text-amber-300 transition-colors">
                {item.title}
              </h3>

              <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                {item.tagline}
              </p>

              <div className="p-3 rounded-lg bg-zinc-900/60 border border-zinc-850 text-xs text-zinc-300 font-serif italic mb-4">
                "{item.godinRule}"
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-900 flex items-center justify-between text-xs text-amber-400/90 font-mono">
              <span>View Sovereign Blueprint</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Detail Dossier Modal */}
      {activeLetterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-zinc-950 border border-amber-500/30 rounded-2xl p-6 sm:p-8 shadow-2xl text-zinc-100">
            {/* Close button */}
            <button
              onClick={() => setActiveLetterModal(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-amber-400/10 border border-amber-500/30 flex items-center justify-center font-serif text-3xl font-bold text-amber-400">
                {activeLetterModal.letter}
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400">
                  {activeLetterModal.category}
                </span>
                <h3 className="serif-heading text-2xl sm:text-3xl font-bold text-zinc-100">
                  {activeLetterModal.title}
                </h3>
              </div>
            </div>

            <p className="text-base text-zinc-300 font-light italic mb-6 pb-6 border-b border-zinc-800">
              "{activeLetterModal.tagline}"
            </p>

            {/* Seth Godin Rule */}
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 flex items-center gap-2 mb-2">
                <Quote className="w-3.5 h-3.5" />
                The Seth Godin Doctrine
              </h4>
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-200 font-serif leading-relaxed italic">
                "{activeLetterModal.godinRule}"
              </div>
            </div>

            {/* TULC Execution */}
            <div className="mb-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 flex items-center gap-2 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                How TULC Executes It In Market
              </h4>
              <p className="text-sm text-zinc-300 leading-relaxed bg-zinc-900/40 p-4 rounded-xl border border-zinc-850">
                {activeLetterModal.tulcExecution}
              </p>
            </div>

            {/* Executive Script */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
                  Executive Verbatim Script
                </h4>
                <button
                  onClick={() => handleCopyScript(activeLetterModal.letter, activeLetterModal.executiveScript)}
                  className="inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-mono cursor-pointer"
                >
                  {copiedScriptLetter === activeLetterModal.letter ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copied to clipboard</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Script</span>
                    </>
                  )}
                </button>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900/90 border border-amber-500/20 text-amber-100/90 text-sm font-mono leading-relaxed">
                {activeLetterModal.executiveScript}
              </div>
            </div>

            {/* Reflection Question */}
            <div className="mb-8 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
              <h4 className="text-xs font-mono uppercase tracking-wider text-amber-300 mb-1">
                Introspective Calibration Question
              </h4>
              <p className="text-sm text-zinc-200 font-serif italic">
                {activeLetterModal.reflectionQuestion}
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-6 border-t border-zinc-850">
              <button
                onClick={() => setActiveLetterModal(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-zinc-900 text-zinc-400 hover:text-zinc-200 text-xs font-mono cursor-pointer"
              >
                Close Dossier
              </button>
              <button
                onClick={() => {
                  setActiveLetterModal(null);
                  onOpenCalibration();
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-amber-400 text-zinc-950 font-semibold text-xs uppercase tracking-wider hover:bg-amber-300 transition-colors cursor-pointer"
              >
                Calibrate Your Leadership System
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
