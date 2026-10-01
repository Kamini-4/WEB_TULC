import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Flame, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Clock, 
  Layers, 
  HelpCircle, 
  Download, 
  Lock, 
  Award,
  ChevronDown,
  Target,
  Trophy,
  Gift
} from 'lucide-react';
import { SHOP_PRODUCTS, SOVEREIGN_VAULT_BUNDLE, ShopProduct, BundleProduct } from '../data/shopProducts';
import { GoldenCircleGraphic } from '../components/shop/GoldenCircleGraphic';
import { RoiCalculator } from '../components/shop/RoiCalculator';
import { ProductCard } from '../components/shop/ProductCard';
import { ProductModal } from '../components/shop/ProductModal';
import { CheckoutModal } from '../components/shop/CheckoutModal';
import { CurrencySelector } from '../components/shop/CurrencySelector';
import { 
  CurrencyCode, 
  CURRENCY_SYMBOLS, 
  formatCurrencyAmount, 
  getProductPrice, 
  getProductOriginalPrice,
  getBundlePrice, 
  getBundleOriginalPrice, 
  getBundleSavings, 
  getStoredCurrency, 
  setStoredCurrency 
} from '../lib/currency';

export const ShopPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [inspectingProduct, setInspectingProduct] = useState<ShopProduct | null>(null);
  const [checkoutItem, setCheckoutItem] = useState<ShopProduct | BundleProduct | null>(null);
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => getStoredCurrency());
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const setCurrency = (newCurrency: CurrencyCode) => {
    setCurrencyState(newCurrency);
    setStoredCurrency(newCurrency);
  };

  const currencySymbols = CURRENCY_SYMBOLS;

  const categories = [
    { id: 'all', label: 'All Products (7)' },
    { id: 'bundle', label: '⭐ Flagship Vault (Save 65%)' },
    { id: 'Bandwidth Architecture', label: 'Bandwidth' },
    { id: 'Continuity & Decoupling', label: 'Decoupling' },
    { id: 'Decision Architecture', label: 'Decision Velocity' },
    { id: 'Executive Bench', label: 'Executive Bench' },
    { id: 'Enterprise Telemetry', label: 'Telemetry' }
  ];

  const faqs = [
    {
      q: 'How fast do I get access to the digital toolkits?',
      bullets: [
        'Instant Authorization: Immediate redirection to your private digital access page upon checkout.',
        '1-Click Workspace Duplicate: Native Notion & Coda master workspaces ready to duplicate into your team workspace.',
        'Downloadable Files: Complete PDF runbooks, executive policy templates, and editable documents.',
        'Collaborative Canvases: Figma & Miro boards for visual decision and delegation workflows.',
        'Direct Email Dispatch: All master template links dispatched instantly to your email inbox.'
      ]
    },
    {
      q: 'Are these digital templates or consulting services?',
      bullets: [
        '100% Digital Products: You receive instant access to pre-built Notion workspaces, Coda templates, decision trees, and PDF runbooks.',
        'Zero Consulting Traps: No required phone calls, no long onboarding schedules, and no recurring agency retainers.',
        'Immediate Execution: Duplicate the workspace in 1 click, customize your organization details in 20 minutes, and share with your team.',
        'Permanent Ownership: Single one-time investment covering your entire company forever.'
      ]
    },
    {
      q: 'What is the 30-Day Digital Performance Guarantee?',
      bullets: [
        '30-Day Testing Window: Duplicate and test the templates across your leadership team.',
        'Real Bandwidth Reclaimed: Measurable reduction in daily operational pings, meeting hours, and approval bottlenecks.',
        'Unconditional Courtesy Refund: If you are not completely satisfied with the digital systems, email suchita@theunboundedleadership.com for an immediate full refund.',
        'Zero Risk: We only win if these digital tools deliver immediate operational leverage to your business.'
      ]
    },
    {
      q: 'What makes the Early Bird pricing limited?',
      bullets: [
        'Strict Allocation: Introductory launch rate of 50% to 65% off for the first 25 founders.',
        'Digital Bonus Pack: Includes the pre-linked Master Unified Notion Hub and editable executive slide deck.',
        'Automatic Expiration: Standard rates ($290–$390 per toolkit, $1,450 for the complete suite) restore once the 25 licenses are claimed.'
      ]
    },
    {
      q: 'Can my entire leadership team duplicate and use these digital files?',
      bullets: [
        'Company-Wide License: Unrestricted deployment across all founders, VPs, directors, and team leads.',
        'Zero Per-Seat Fees: No monthly subscription fees or user limits.',
        'Lifetime Updates: Free access to all future template revisions and new module updates.'
      ]
    }
  ];

  const filteredProducts = (selectedCategory === 'all' || selectedCategory === 'bundle')
    ? SHOP_PRODUCTS
    : SHOP_PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#f5f5f0] text-[#111111] pb-24">
      {/* Top Scarcity / Early Bird Ticker Bar */}
      <div className="bg-[#111111] text-white border-b border-[#b8860b]/40 py-2.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5 text-[10px] sm:text-xs font-mono">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 font-black text-[#b8860b] uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              EARLY BIRD ALLOCATION OPEN
            </span>
            <span className="text-zinc-300">
              First 25 Founders Save Up To 65% • <strong>Only 6 Complete Suites Remaining</strong>
            </span>
            <a
              href="#bundle-section"
              className="text-[#b8860b] hover:text-white underline font-bold uppercase tracking-wider"
            >
              Claim Complete Suite →
            </a>
          </div>
          <CurrencySelector
            currentCurrency={currency}
            onCurrencyChange={setCurrency}
            size="xs"
            variant="dark"
            showLabel={false}
          />
        </div>
      </div>

      {/* Hero Section - Ultra-Compact & High-Impact */}
      <section className="relative pt-3 sm:pt-4 pb-2.5 sm:pb-3 border-b border-zinc-200/80 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[350px] h-[350px] bg-[#b8860b]/5 rounded-full blur-[90px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="space-y-1.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2 py-0.5 bg-[#111111] text-[#b8860b] border border-[#b8860b]/40 text-[8px] sm:text-[9px] font-mono uppercase tracking-widest font-black">
                <Zap className="w-3 h-3" /> 100% Digital Workspaces & Templates • Instant Duplicate
              </div>

              <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#111111] leading-tight font-serif">
                Founder Toolkits. <span className="italic text-[#b8860b] font-light">Stop answering 40 questions a day.</span>
              </h1>

              <p className="text-xs text-zinc-700 leading-normal font-serif italic">
                Turnkey Notion workspaces, decision matrices, and delegation runbooks. Clone in 1 click, customize in 20 minutes, and hand to your team. Pure digital tools—zero consulting calls.
              </p>
            </div>

            {/* Quick Context Internal Links & Currency Controller */}
            <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-2 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-zinc-500 uppercase font-semibold">Currency:</span>
                <CurrencySelector
                  currentCurrency={currency}
                  onCurrencyChange={setCurrency}
                  size="xs"
                  variant="light"
                />
              </div>

              <div className="flex flex-wrap items-center gap-1.5 text-[9px] font-mono">
                <Link to="/services" className="px-2 py-0.5 bg-white border border-zinc-300 text-zinc-800 hover:border-[#b8860b] hover:text-[#b8860b] transition-colors rounded-2xs font-semibold">
                  Bespoke Advisory →
                </Link>
                <Link to="/assessment" className="px-2 py-0.5 bg-white border border-zinc-300 text-zinc-800 hover:border-[#b8860b] hover:text-[#b8860b] transition-colors rounded-2xs font-semibold">
                  90-Sec Audit →
                </Link>
                <a href="#bundle-section" className="px-2 py-0.5 bg-[#111111] text-[#b8860b] hover:bg-black transition-colors rounded-2xs font-bold flex items-center gap-1">
                  <Flame className="w-2.5 h-2.5 text-red-500" />
                  <span>Suite (65% Off)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container - Compact Spacing so Products are First in Viewport */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 space-y-5">
        
        {/* Master Storefront Filter Bar */}
        <div className="bg-white border border-zinc-200/90 p-2.5 sm:p-3 rounded-xs shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[8px] font-mono uppercase tracking-widest text-[#b8860b] font-black mr-1 hidden sm:inline">
              FILTER:
            </span>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 text-[9px] font-mono uppercase font-bold tracking-wider transition-all rounded-2xs cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#111111] text-white shadow-2xs'
                    : 'bg-zinc-100 text-zinc-600 hover:text-black hover:bg-zinc-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-600">
            <ShieldCheck className="w-3.5 h-3.5 text-green-700" />
            <span>Instant 1-Click Notion/Coda Duplicate</span>
          </div>
        </div>

        {/* Section 1: Individual Toolkits Catalog (SHOWN FIRST - PRODUCTS PROMINENT) */}
        {selectedCategory !== 'bundle' && (
          <section id="products" className="space-y-3.5">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1.5 border-b border-zinc-200/80 pb-2">
              <div>
                <span className="font-mono text-[8px] uppercase tracking-widest text-[#b8860b] font-black block leading-none mb-0.5">
                  INSTANT 1-CLICK CLONE • DIGITAL ARSENAL
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-[#111111] font-serif">
                  {selectedCategory === 'all' ? 'Digital Founder Toolkits' : `${selectedCategory} Toolkits`}
                </h2>
              </div>
              <span className="text-[11px] font-mono text-zinc-500">
                {filteredProducts.length} Turnkey Toolkits Ready
              </span>
            </div>
              <span className="text-xs font-mono text-zinc-500">
                {filteredProducts.length} Turnkey Toolkits Ready
              </span>
            </div>

            {/* Product Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onInspect={(p) => setInspectingProduct(p)}
                  onAcquire={(p) => setCheckoutItem(p)}
                  currencySymbol={currencySymbols[currency]}
                  currencyPrice={getProductPrice(product, currency)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Section 2: The Complete Founder Systems Suite Bundle (Save 65%) */}
        {(selectedCategory === 'all' || selectedCategory === 'bundle') && (
          <section id="bundle-section" className="border-2 border-[#b8860b] bg-[#111111] text-white p-5 sm:p-7 md:p-8 rounded-xs shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#b8860b]/15 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 items-center relative z-10">
              <div className="lg:col-span-7 space-y-3.5">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#b8860b] text-[#111111] text-[8px] font-mono uppercase tracking-widest font-black">
                  <Flame className="w-3.5 h-3.5" /> COMPLETE SUITE: SAVE 65% ({formatCurrencyAmount(getBundleSavings(SOVEREIGN_VAULT_BUNDLE, currency), currency)} OFF)
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug font-serif">
                  The Complete Founder Systems Suite <br />
                  <span className="italic text-[#b8860b] font-light">All 6 Digital Toolkits In One Pre-Connected Workspace</span>
                </h2>

                <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed max-w-xl">
                  Deploy the complete digital architecture across your entire firm to eliminate founder bottlenecks and secure operational autonomy. Includes full Notion, Coda, Figma, and PDF frameworks. Instant 1-click clone.
                </p>

                {/* All 6 Systems Bulleted Breakdown */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[8px] font-mono uppercase tracking-widest text-[#b8860b] font-bold">
                    All 6 Core Digital Toolkits Included:
                  </div>
                  <ul className="space-y-1.5 text-xs text-zinc-300 font-light">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
                      <span><strong className="text-white font-medium">Asset 00 (Delegation Filter):</strong> Rapid-deployment authority gate and 72-hour severance audit to stop micro-approvals under $5,000.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
                      <span><strong className="text-white font-medium">Asset 01 (Bandwidth OS):</strong> Reclaim 15+ weekly hours via 4-lane incoming triage and 30-day meeting expiration Notion workspace.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
                      <span><strong className="text-white font-medium">Asset 02 (Decoupling Runbook):</strong> 4-week founder severance drill and signing ceilings ensuring 30-day continuous operation.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
                      <span><strong className="text-white font-medium">Asset 03 (Decision Matrix):</strong> 72-hour hard escalation clocks and Single DRI charters eliminating consensus bottlenecks.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
                      <span><strong className="text-white font-medium">Asset 04 (Onboarding Codex):</strong> Day 30/60/90 binary delivery covenants reducing executive ramp from 180 to 30 days.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
                      <span><strong className="text-white font-medium">Asset 05 (Team Diagnostic):</strong> 5-domain diagnostic score audit generating empirical organizational heatmaps for board review.</span>
                    </li>
                  </ul>
                </div>

                {/* Digital Bonuses */}
                <div className="p-3 bg-white/5 border border-white/10 rounded-xs space-y-1">
                  <div className="text-[8px] font-mono uppercase text-[#b8860b] font-black flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5 text-[#b8860b]" />
                    Included Digital Bonus Pack ($590 Value):
                  </div>
                  <ul className="text-[11px] text-zinc-300 space-y-1 font-light">
                    {SOVEREIGN_VAULT_BUNDLE.bonuses.map((b, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#b8860b] shrink-0 mt-0.5">★</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bundle Pricing Card */}
              <div className="lg:col-span-5 bg-white text-[#111111] p-5 sm:p-6 rounded-xs shadow-xl border border-zinc-200 space-y-4">
                <div className="border-b border-zinc-200 pb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] font-mono uppercase text-zinc-400 font-bold">
                      Early Bird Complete Suite
                    </span>
                    <span className="px-2 py-0.5 bg-red-600 text-white text-[8px] font-mono uppercase font-black rounded-2xs">
                      6 Suites Left At This Price
                    </span>
                  </div>
                  <div className="flex items-baseline gap-3 mt-1">
                    <span className="text-3xl sm:text-4xl font-black font-mono text-[#111111]">
                      {formatCurrencyAmount(getBundlePrice(SOVEREIGN_VAULT_BUNDLE, currency), currency)}
                    </span>
                    <span className="text-sm font-mono text-zinc-400 line-through">
                      {formatCurrencyAmount(getBundleOriginalPrice(SOVEREIGN_VAULT_BUNDLE, currency), currency)}
                    </span>
                    <span className="px-2 py-0.5 bg-green-100 text-green-800 text-[8px] font-mono uppercase font-bold">
                      Save {formatCurrencyAmount(getBundleSavings(SOVEREIGN_VAULT_BUNDLE, currency), currency)}
                    </span>
                  </div>
                  <div className="text-[9px] font-mono text-zinc-500 pt-1.5 mt-1.5 border-t border-zinc-100">
                    Instant 1-Click Notion/Coda Duplicate • Unlimited Company-Wide License
                  </div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => setCheckoutItem(SOVEREIGN_VAULT_BUNDLE)}
                    className="w-full py-3 px-5 bg-[#111111] hover:bg-[#b8860b] text-white text-[10px] font-mono uppercase font-black tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  >
                    <span>Get The Complete Systems Suite at 65% Off</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <div className="flex items-center justify-center gap-2 text-[9px] font-mono text-zinc-500 text-center">
                    <Lock className="w-3 h-3 text-[#b8860b]" />
                    <span>Single One-Time Payment • No Monthly Subscriptions • Multi-Team Access</span>
                  </div>
                </div>

                <div className="p-2.5 bg-zinc-50 border border-zinc-200 rounded-2xs text-[10px] text-zinc-700 leading-relaxed">
                  <div className="font-bold text-[#111111] mb-0.5 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                    30-Day Digital Performance Guarantee:
                  </div>
                  <ul className="space-y-0.5 text-zinc-600 font-light">
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#b8860b] font-bold">•</span>
                      <span>Duplicate and test the templates across your company for 30 days.</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-[#b8860b] font-bold">•</span>
                      <span>Prompt courtesy refund if your team does not gain demonstrable operational velocity.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Section 3: Psychological Architectural Selling (Simon Sinek's Golden Circle: WHY -> HOW -> WHAT) */}
        <section id="why-digital" className="bg-white border border-zinc-200/90 p-5 sm:p-7 md:p-8 rounded-xs shadow-xs space-y-4">
          <div className="max-w-3xl space-y-1.5">
            <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-widest text-[#b8860b] font-black">
              THE PSYCHOLOGY OF OPERATIONAL LEVERAGE
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#111111] font-serif">
              Why Founders Buy Digital Systems Instead of Hiring More People
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed">
              When a company scales, founders usually default to one of two traps: working 70-hour weeks answering daily questions, or hiring expensive agencies to tell them what they already know. Here is the mathematical truth behind true operational leverage.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-6 pt-3 border-t border-zinc-100">
            {/* 1. THE WHY */}
            <div className="space-y-2 bg-[#fbfbf9] p-4 border border-zinc-200/80 rounded-2xs">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#111111] text-[#b8860b] text-[8px] font-mono uppercase tracking-widest font-black">
                01 • THE WHY (The Psychological Trap)
              </div>
              <h3 className="text-sm font-bold text-[#111111] font-serif">
                You Are The Involuntary Bottleneck
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed font-light">
                You hired talented people, but they still ping you for $1,000 approvals and routine project pivots. Why? Because the unwritten operating laws are stored only in your brain. Without documented parameters, your team hesitates—and you pay for missing systems with your personal freedom.
              </p>
            </div>

            {/* 2. THE HOW */}
            <div className="space-y-2 bg-[#fbfbf9] p-4 border border-zinc-200/80 rounded-2xs">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#b8860b] text-[#111111] text-[8px] font-mono uppercase tracking-widest font-black">
                02 • THE HOW (The Digital Mechanism)
              </div>
              <h3 className="text-sm font-bold text-[#111111] font-serif">
                Install Written Code Over Personal Presence
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed font-light">
                You do not need a 6-month consulting retainer or endless Zoom coaching calls. You need written rules: pre-calibrated delegation limits, 72-hour escalation timers, and single-owner decision charters. When the boundaries live in a workspace, your team executes with owner-level conviction.
              </p>
            </div>

            {/* 3. THE WHAT */}
            <div className="space-y-2 bg-[#fbfbf9] p-4 border border-zinc-200/80 rounded-2xs">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-[#111111] text-white text-[8px] font-mono uppercase tracking-widest font-black">
                03 • THE WHAT (Pure Digital Artifacts)
              </div>
              <h3 className="text-sm font-bold text-[#111111] font-serif">
                Instant-Access Digital Workspaces
              </h3>
              <p className="text-xs text-zinc-600 leading-relaxed font-light">
                Turnkey Notion masters, Coda systems, and PDF runbooks. Clone with 1 click. Zero recurring subscriptions, zero consulting calls, and zero fluff. Download the files today, customize in 20 minutes, and permanently reclaim your focus.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: ROI Bandwidth Calculator */}
        <section id="calculator">
          <div className="mb-6">
            <span className="font-mono text-[8px] uppercase tracking-widest text-[#b8860b] font-black block mb-1">
              COLD EMPIRICAL DATA
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111111] font-serif">
              Quantify The Financial Cost of Operational Drag
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 font-light mt-1">
              See what executive time actually costs when absorbed by tactical triage instead of strategic leverage.
            </p>
          </div>
          <RoiCalculator 
            currency={currency}
            onCurrencyChange={setCurrency}
            onUnlockVault={() => setCheckoutItem(SOVEREIGN_VAULT_BUNDLE)} 
          />
        </section>

        {/* Section 4: The Leverage Architecture Matrix (Operational Truth -> The Architecture -> The Outcome) */}
        <section>
          <div className="mb-6">
            <span className="font-mono text-[8px] uppercase tracking-widest text-[#b8860b] font-black block mb-1">
              THE LEVERAGE CODEX
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#111111] font-serif">
              The Operational Truth vs. The Delivered Outcome
            </h2>
            <p className="text-xs sm:text-sm text-zinc-600 font-light mt-1">
              Where uncodified teams get caught in reactive loops, strategic leaders install clear operating systems and compound executive velocity.
            </p>
          </div>
          <GoldenCircleGraphic onSelectProduct={(id) => {
            const p = SHOP_PRODUCTS.find(item => item.id === id);
            if (p) setInspectingProduct(p);
          }} />
        </section>

        {/* Section 5: Institutional FAQs */}
        <section className="border-t border-zinc-200 pt-12">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-1">
              <span className="font-mono text-[8px] uppercase tracking-widest text-[#b8860b] font-black">
                TRANSPARENT ADVISORY TERMS
              </span>
              <h3 className="text-2xl font-bold text-[#111111]">
                Frequently Addressed Inquiries
              </h3>
              <p className="text-xs text-zinc-500">
                Direct answers for leaders who value precision over boilerplate.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-zinc-200/90 rounded-xs overflow-hidden"
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between text-xs sm:text-sm font-bold text-[#111111] hover:text-[#b8860b] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-zinc-400 transition-transform ${
                        activeFaq === idx ? 'rotate-180 text-[#b8860b]' : ''
                      }`}
                    />
                  </button>
                  {activeFaq === idx && (
                    <div className="p-4 pt-0 border-t border-zinc-100">
                      <ul className="space-y-2 text-xs text-zinc-700 leading-relaxed font-light mt-3">
                        {faq.bullets.map((bullet, bIdx) => (
                          <li key={bIdx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#b8860b] mt-1.5 shrink-0" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Product Deep-Dive Inspection Modal */}
      <ProductModal
        product={inspectingProduct}
        onClose={() => setInspectingProduct(null)}
        onAcquire={(p) => {
          setInspectingProduct(null);
          setCheckoutItem(p);
        }}
        currency={currency}
        onCurrencyChange={setCurrency}
        currencySymbol={currencySymbols[currency]}
        currencyPrice={inspectingProduct ? getProductPrice(inspectingProduct, currency) : 0}
      />

      {/* Checkout & License Authorization Modal */}
      <CheckoutModal
        item={checkoutItem}
        onClose={() => setCheckoutItem(null)}
        currency={currency}
        onCurrencyChange={setCurrency}
        currencySymbol={currencySymbols[currency]}
        currencyPrice={
          checkoutItem
            ? 'includes' in checkoutItem
              ? getBundlePrice(checkoutItem, currency)
              : getProductPrice(checkoutItem, currency)
            : 0
        }
      />
    </div>
  );
};

export default ShopPage;
