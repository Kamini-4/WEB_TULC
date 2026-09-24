import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Check, 
  ShieldCheck, 
  Clock, 
  Zap, 
  ArrowRight, 
  Layers, 
  FileText, 
  Flame, 
  Lock, 
  Download,
  Target,
  Trophy,
  Gift
} from 'lucide-react';
import { ShopProduct } from '../../data/shopProducts';
import { CurrencyCode, formatCurrencyAmount, getProductPrice, getProductOriginalPrice } from '../../lib/currency';
import { CurrencySelector } from './CurrencySelector';

interface ProductModalProps {
  product: ShopProduct | null;
  onClose: () => void;
  onAcquire: (product: ShopProduct) => void;
  currencySymbol?: string;
  currencyPrice?: number;
  currency?: CurrencyCode;
  onCurrencyChange?: (newCurrency: CurrencyCode) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAcquire,
  currencySymbol = '$',
  currencyPrice,
  currency = 'USD',
  onCurrencyChange
}) => {
  const [activeTab, setActiveTab] = useState<'reality' | 'modules' | 'deliverables'>('reality');

  if (!product) return null;

  const currentPrice = currencyPrice !== undefined ? currencyPrice : getProductPrice(product, currency);
  const originalPrice = getProductOriginalPrice(product, currency);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fade-in">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-4xl bg-[#fbfbf9] text-[#111111] rounded-xs shadow-2xl border border-zinc-200 overflow-hidden my-8 max-h-[90vh] flex flex-col"
        >
          {/* Top Early Bird Notification Banner */}
          <div className="bg-red-950/80 text-red-200 border-b border-red-800/40 px-6 py-2 text-[9px] font-mono flex items-center justify-between shrink-0">
            <span className="flex items-center gap-2 font-black tracking-wider text-red-400">
              <Flame className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              {product.earlyBird.badge} — ONLY {product.earlyBird.seatsRemaining} ALLOCATIONS REMAINING
            </span>
            <span className="text-zinc-300 font-bold hidden sm:inline">
              Includes {product.earlyBird.bonusTitle} ({product.earlyBird.bonusValue})
            </span>
          </div>

          {/* Header Bar */}
          <div className="p-6 sm:p-8 bg-[#111111] text-white border-b border-[#b8860b]/30 shrink-0 relative">
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-zinc-400 hover:text-white p-1 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-[#b8860b]/20 border border-[#b8860b]/40 text-[#b8860b] text-[8px] font-mono uppercase font-black">
                ASSET {product.assetNumber}
              </span>
              <span className="px-2 py-0.5 bg-white/10 text-zinc-300 text-[8px] font-mono uppercase">
                {product.category}
              </span>
              <span className="px-2 py-0.5 bg-red-600/30 text-red-300 border border-red-500/40 text-[8px] font-mono uppercase font-bold">
                Save 50% Early Bird
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white">
              {product.title}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-300 font-light mt-1 max-w-2xl">
              {product.tagline}
            </p>

            {/* Quick Metrics Strip */}
            <div className="flex flex-wrap items-center gap-6 mt-4 pt-4 border-t border-white/10 text-[9px] font-mono text-zinc-300">
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#b8860b]" />
                <span>Deploy Time: {product.installTime}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Target className="w-3.5 h-3.5 text-green-400" />
                <span>Target Result: {product.timeToResult}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span>Format: {product.format}</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 px-6 sm:px-8 border-b border-zinc-200 bg-white shrink-0">
            <button
              onClick={() => setActiveTab('reality')}
              className={`py-3 text-[9px] font-mono uppercase font-black tracking-wider transition-colors border-b-2 cursor-pointer ${
                activeTab === 'reality'
                  ? 'border-[#b8860b] text-[#b8860b]'
                  : 'border-transparent text-zinc-500 hover:text-[#111111]'
              }`}
            >
              The Harsh Truth & The Outcome
            </button>
            <button
              onClick={() => setActiveTab('modules')}
              className={`py-3 text-[9px] font-mono uppercase font-black tracking-wider transition-colors border-b-2 cursor-pointer ${
                activeTab === 'modules'
                  ? 'border-[#b8860b] text-[#b8860b]'
                  : 'border-transparent text-zinc-500 hover:text-[#111111]'
              }`}
            >
              5 Tactical Weapon Modules
            </button>
            <button
              onClick={() => setActiveTab('deliverables')}
              className={`py-3 text-[9px] font-mono uppercase font-black tracking-wider transition-colors border-b-2 cursor-pointer ${
                activeTab === 'deliverables'
                  ? 'border-[#b8860b] text-[#b8860b]'
                  : 'border-transparent text-zinc-500 hover:text-[#111111]'
              }`}
            >
              Deliverables & Performance Commitment
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
            {activeTab === 'reality' && (
              <div className="space-y-6">
                {/* THE BRUTAL REALITY */}
                <div className="p-5 bg-red-50 border-l-4 border-red-600 rounded-r-xs space-y-2">
                  <div className="flex items-center gap-2 text-red-700 font-mono text-[9px] font-black uppercase tracking-wider">
                    <Zap className="w-3.5 h-3.5" /> 1. THE OPERATIONAL TRUTH (The Structural Ceiling)
                  </div>
                  <h4 className="text-base font-bold text-[#111111]">
                    "{product.harshTruth.brutalReality}"
                  </h4>
                  <p className="text-xs text-zinc-700 leading-relaxed font-light">
                    <strong className="font-semibold text-zinc-900">The Ego Trap: </strong>
                    {product.harshTruth.egoTrap}
                  </p>
                  <div className="pt-2 text-[10px] font-mono text-red-900 font-bold">
                    <strong>Unfiltered Diagnosis:</strong> {product.harshTruth.unfilteredDiagnosis}
                  </div>
                </div>

                {/* THE WEAPON / EXECUTIVE LAW */}
                <div className="p-5 bg-zinc-900 text-white border-l-4 border-[#b8860b] rounded-r-xs space-y-2">
                  <div className="flex items-center gap-2 text-[#b8860b] font-mono text-[9px] font-black uppercase tracking-wider">
                    <Trophy className="w-3.5 h-3.5" /> 2. THE ARCHITECTURE (How High-Leverage Leaders Operate)
                  </div>
                  <div className="text-xs italic font-serif text-[#b8860b]">
                    "{product.theWeapon.executiveLaw}"
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed font-light pt-1">
                    {product.theWeapon.leverageMechanism}
                  </p>
                  <div className="space-y-1.5 pt-2">
                    {product.theWeapon.rulesOfEngagement.map((rule, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-zinc-200">
                        <Check className="w-3.5 h-3.5 text-[#b8860b] shrink-0 mt-0.5" />
                        <span className="text-[11px] leading-snug">{rule}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* THE OUTCOME */}
                <div className="p-5 bg-green-50 border-l-4 border-green-600 rounded-r-xs space-y-2">
                  <div className="flex items-center gap-2 text-green-800 font-mono text-[9px] font-black uppercase tracking-wider">
                    <Target className="w-3.5 h-3.5" /> 3. THE DELIVERED OUTCOME (The Operating Dividend)
                  </div>
                  <h4 className="text-base font-bold text-green-950">
                    "{product.theOutcome.tangibleResult}"
                  </h4>
                  <p className="text-xs text-green-900 leading-relaxed">
                    {product.theOutcome.immediateImpact}
                  </p>
                </div>

                {/* Testimonial Quote */}
                <div className="p-4 bg-white border border-zinc-200 rounded-xs shadow-2xs">
                  <div className="text-[8px] font-mono text-zinc-400 uppercase tracking-widest mb-1">
                    Executive Verification
                  </div>
                  <p className="text-xs italic text-zinc-800 font-serif leading-relaxed">
                    "{product.socialProof.quote}"
                  </p>
                  <div className="mt-2 text-[10px] font-mono text-[#111111] font-bold">
                    — {product.socialProof.author}, <span className="text-zinc-500 font-normal">{product.socialProof.title}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'modules' && (
              <div className="space-y-4">
                <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">
                  5 Discrete Weapon Modules engineered into this asset
                </div>
                {product.theOutcome.modules.map((mod) => (
                  <div
                    key={mod.number}
                    className="p-4 bg-white border border-zinc-200/80 rounded-xs space-y-2 hover:border-[#b8860b] transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#111111] text-white flex items-center justify-center font-mono text-[9px] font-bold">
                          {mod.number}
                        </span>
                        <h4 className="font-bold text-sm text-[#111111]">{mod.title}</h4>
                      </div>
                      <span className="text-[8px] font-mono text-zinc-400 uppercase">{mod.subtitle}</span>
                    </div>

                    <p className="text-xs text-zinc-600 leading-relaxed font-light pl-8">
                      {mod.description}
                    </p>

                    <div className="pl-8 pt-1 flex flex-wrap gap-2">
                      {mod.deliverables.map((item, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 bg-zinc-100 text-zinc-800 text-[8px] font-mono rounded-2xs border border-zinc-200"
                        >
                          ✓ {item}
                        </span>
                      ))}
                    </div>

                    <div className="pl-8 text-[9px] font-mono text-[#b8860b] italic font-semibold">
                      Key Law: {mod.keyInsight}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'deliverables' && (
              <div className="space-y-6">
                {/* Early Bird Perk Banner */}
                <div className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-300 rounded-xs space-y-2">
                  <div className="flex items-center gap-2 text-[#b8860b] font-mono text-[9px] font-black uppercase">
                    <Gift className="w-4 h-4" /> Early Bird Special Privilege
                  </div>
                  <div className="text-sm font-bold text-[#111111]">
                    {product.earlyBird.bonusTitle} ({product.earlyBird.bonusValue})
                  </div>
                  <p className="text-xs text-zinc-700 font-light">
                    Allocated free with this order today. Strictly {product.earlyBird.seatsRemaining} licenses remaining before price locks back to standard institutional retainer rates.
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#111111] mb-2 font-mono uppercase">
                    What Arrives in Your Digital Vault (Instant 1-Click Access)
                  </h4>
                  <div className="space-y-2">
                    {product.theOutcome.deliverables.map((file, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 bg-white border border-zinc-200 rounded-xs text-xs"
                      >
                        <Download className="w-4 h-4 text-[#b8860b] shrink-0" />
                        <span className="font-medium text-zinc-900">{file}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* TULC Performance Commitment Card */}
                <div className="p-5 bg-[#111111] text-white rounded-xs border border-[#b8860b] space-y-2.5 shadow-lg">
                  <div className="flex items-center gap-2 text-[#b8860b] font-mono text-[9px] font-black uppercase">
                    <ShieldCheck className="w-4 h-4" /> The TULC Performance Commitment
                  </div>
                  <ul className="space-y-1.5 text-xs text-zinc-200 font-light leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-[#b8860b] font-bold">•</span>
                      <span>30-Day Evaluation: Deploy and test the operating system with your executive leadership.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#b8860b] font-bold">•</span>
                      <span>Bandwidth & Speed Standard: If your enterprise does not gain measurable operational velocity, contact us for an immediate full refund.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#b8860b] font-bold">•</span>
                      <span>Demonstrable ROI: We maintain advisory relationships exclusively where our architecture produces clear, quantifiable results.</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Footer Checkout Bar */}
          <div className="p-4 sm:p-6 bg-white border-t border-zinc-200 shrink-0 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div>
                <div className="text-[8px] font-mono uppercase text-zinc-400 font-bold">
                  Early Bird Intake Rate ({product.earlyBird.seatsRemaining} Allocations Left)
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black font-mono text-[#111111]">
                    {formatCurrencyAmount(currentPrice, currency)}
                  </span>
                  <span className="text-xs font-mono text-zinc-400 line-through">
                    {formatCurrencyAmount(originalPrice, currency)}
                  </span>
                  <span className="text-[9px] font-mono text-red-600 font-black">50% Early Bird Off</span>
                </div>
              </div>

              {onCurrencyChange && (
                <div className="sm:border-l sm:border-zinc-200 sm:pl-4">
                  <CurrencySelector
                    currentCurrency={currency}
                    onCurrencyChange={onCurrencyChange}
                    size="xs"
                    variant="light"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2.5 text-[9px] font-mono uppercase font-bold text-zinc-600 hover:text-black cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onClose();
                  onAcquire(product);
                }}
                className="px-6 py-2.5 bg-[#111111] hover:bg-[#b8860b] text-white text-[9px] font-mono uppercase font-black tracking-wider transition-all duration-300 flex items-center gap-2 shadow-md cursor-pointer"
              >
                <span>Lock Early Bird Access Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
