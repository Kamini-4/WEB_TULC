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
    { id: 'all', label: 'All 5 Weapons' },
    { id: 'Bandwidth Architecture', label: 'Bandwidth Architecture' },
    { id: 'Continuity & Decoupling', label: 'Continuity & Decoupling' },
    { id: 'Decision Architecture', label: 'Decision Architecture' },
    { id: 'Executive Bench', label: 'Executive Bench' },
    { id: 'Enterprise Telemetry', label: 'Enterprise Telemetry' }
  ];

  const faqs = [
    {
      q: 'How fast do I get access to the assets after checkout?',
      bullets: [
        'Instant Authorization: Immediate redirection to your private digital vault upon checkout completion.',
        '1-Click Workspace Duplicate: Native Notion & Coda master workspaces ready to clone into your team space.',
        'Downloadable Artifacts: Complete PDF field guides, executive policy templates, and editable Word documents.',
        'Collaborative Canvases: Miro & Figma architecture boards for cross-functional alignment.',
        'Direct Email Dispatch: All master URLs and executive briefing videos dispatched instantly to your inbox.'
      ]
    },
    {
      q: 'How does TULC turnkey architecture compare to traditional management consulting?',
      bullets: [
        'Traditional Consulting: Charges by the billable hour, prolongs project cycles, and fosters institutional dependency.',
        'TULC Sovereign Architecture: Pre-engineered operating logic deployed in 72 hours with permanent internal ownership.',
        'Direct Velocity: Up to 15 hours of weekly executive bandwidth returned to your calendar starting in Week 1.',
        'Zero Per-User Fees: Single enterprise-wide license covering your entire executive committee.'
      ]
    },
    {
      q: 'What is the TULC 30-Day Performance Commitment?',
      bullets: [
        '30-Day Evaluation Window: Deploy and evaluate the operating systems across your senior leadership team.',
        'Demonstrable Standard: Substantial, measurable gains in executive bandwidth, decision clarity, and execution speed.',
        'Courtesy Refund: If you are not thoroughly satisfied, email suchita@theunboundedleadership.com for an immediate full refund.',
        'Aligned Incentives: We maintain partnerships exclusively where our architecture creates clear, undeniable enterprise value.'
      ]
    },
    {
      q: 'What makes the Early Bird allocation strictly limited?',
      bullets: [
        'Volume Cap: Strictly 25 enterprise licenses allocated at 50% to 60% off standard advisory rates.',
        'Included Bonus Privileges: VIP priority architecture review voucher and live masterclass walkthroughs ($1,250 value).',
        'Automatic Expiration: Standard advisory pricing ($490–$990 per single asset, $2,200 for vault) restores upon allocation fill.'
      ]
    },
    {
      q: 'Can our entire executive team and department heads deploy these assets?',
      bullets: [
        'Enterprise-Wide Rights: Unrestricted deployment across executive committees, VP tiers, and department heads.',
        'Zero Per-User Upcharges: One-time investment with no recurring SaaS subscriptions or licensing penalties.',
        'Perpetual Access: Lifetime access to all modular updates, template refreshes, and diagnostic revisions.'
      ]
    }
  ];

  const filteredProducts = selectedCategory === 'all'
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
              First 25 Enterprise Founders Save Up To 60% • <strong>Only 6 Sovereign Vaults Remaining</strong>
            </span>
            <a
              href="#bundle-section"
              className="text-[#b8860b] hover:text-white underline font-bold uppercase tracking-wider"
            >
              Claim Early Bird Vault →
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

      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-16 pb-14 sm:pb-20 border-b border-zinc-200/80 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#b8860b]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#111111] text-[#b8860b] border border-[#b8860b]/40 text-[8px] sm:text-[9px] font-mono uppercase tracking-widest font-black">
              <Trophy className="w-3.5 h-3.5" /> The Executive Sovereign Arsenal
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#111111] tracking-tight leading-[1.08]">
              Eliminate The Bottleneck. <br />
              <span className="italic text-[#b8860b] font-light">Lead By Architecture. Reclaim Your Enterprise.</span>
            </h1>

            {/* Strategic Leadership Quote Box */}
            <div className="p-4 bg-white border-l-4 border-[#b8860b] rounded-r-xs shadow-xs text-xs sm:text-sm italic font-serif text-zinc-800 leading-relaxed">
              "High-leverage leadership isn't about working more hours; it's about building superior systems. If you spend your week resolving tactical fires, the issue isn't your team's dedication—it is the absence of clear operational filters. Upgrade the architecture, and bandwidth follows."
            </div>

            {/* Strategic Leadership Directives */}
            <div className="space-y-2 pt-1">
              <div className="text-[9px] font-mono uppercase tracking-widest text-[#b8860b] font-bold">
                Target Enterprise Outcomes:
              </div>
              <ul className="grid sm:grid-cols-3 gap-2.5 text-xs text-zinc-800">
                <li className="flex items-start gap-2 bg-white border border-zinc-200/90 p-3 rounded-xs shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
                  <span className="leading-snug"><strong className="font-semibold text-[#111111]">15+ Hours Reclaimed:</strong> Strip low-leverage coordination from your weekly schedule.</span>
                </li>
                <li className="flex items-start gap-2 bg-white border border-zinc-200/90 p-3 rounded-xs shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
                  <span className="leading-snug"><strong className="font-semibold text-[#111111]">30-Day Decoupling:</strong> Protect revenue continuity when leadership is offline.</span>
                </li>
                <li className="flex items-start gap-2 bg-white border border-zinc-200/90 p-3 rounded-xs shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
                  <span className="leading-snug"><strong className="font-semibold text-[#111111]">72-Hour Decision Speed:</strong> Replace consensus delays with single-point ownership.</span>
                </li>
              </ul>
            </div>

            {/* Currency Bar & Trust Signals */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-zinc-200/80">
              <CurrencySelector
                currentCurrency={currency}
                onCurrencyChange={setCurrency}
                size="sm"
                variant="light"
              />

              <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-600 bg-white border border-zinc-300/80 px-2.5 py-1 rounded-2xs">
                <ShieldCheck className="w-3.5 h-3.5 text-green-700" />
                <span>Enterprise-Wide Team License • Instant 1-Click Vault Duplicate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-16 sm:space-y-20">
        {/* Section 1: The Leverage Architecture Matrix (Operational Truth -> The Architecture -> The Outcome) */}
        <section>
          <div className="mb-6">
            <span className="font-mono text-[8px] uppercase tracking-widest text-[#b8860b] font-black block mb-1">
              THE LEVERAGE CODEX
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
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

        {/* Section 2: ROI Bandwidth Calculator */}
        <section>
          <div className="mb-6">
            <span className="font-mono text-[8px] uppercase tracking-widest text-[#b8860b] font-black block mb-1">
              COLD EMPIRICAL DATA
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
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

        {/* Section 3: The 5 Digital Leverage Products */}
        <section id="products">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="font-mono text-[8px] uppercase tracking-widest text-[#b8860b] font-black block mb-1">
                EXECUTIVE PRODUCTION CATALOG (5 WEAPONS)
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#111111]">
                Turnkey Operational Weapons
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 font-light mt-1">
                Each asset eliminates one fatal vector of founder dependency with mathematical certainty.
              </p>
            </div>

            {/* Filter & Currency Controls */}
            <div className="flex flex-wrap items-center gap-3 self-start">
              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-1.5 p-1 bg-zinc-200/60 rounded-xs border border-zinc-300/60">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1 text-[9px] font-mono uppercase font-bold tracking-wider transition-all rounded-2xs cursor-pointer ${
                      selectedCategory === cat.id
                        ? 'bg-[#111111] text-white shadow-xs'
                        : 'text-zinc-600 hover:text-black'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Currency Selector for Catalog */}
              <CurrencySelector
                currentCurrency={currency}
                onCurrencyChange={setCurrency}
                size="sm"
                variant="light"
              />
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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

        {/* Section 4: The Sovereign Leverage Vault Bundle (Money-Bringing Showcase) */}
        <section id="bundle-section" className="border-2 border-[#b8860b] bg-[#111111] text-white p-6 sm:p-10 md:p-12 rounded-xs shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#b8860b]/15 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#b8860b] text-[#111111] text-[8px] font-mono uppercase tracking-widest font-black">
                <Flame className="w-3.5 h-3.5" /> EARLY BIRD BUNDLE: SAVE 60% ({formatCurrencyAmount(getBundleSavings(SOVEREIGN_VAULT_BUNDLE, currency), currency)} OFF)
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-snug">
                The Complete Sovereign Leverage Vault <br />
                <span className="italic text-[#b8860b] font-light">All 5 Turnkey Weapons In One Command Workspace</span>
              </h3>

              <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed max-w-xl">
                Deploy the complete architecture across your entire firm to eliminate founder bottlenecks and secure operational autonomy.
              </p>

              {/* All 5 Systems Bulleted Breakdown */}
              <div className="space-y-2 pt-1">
                <div className="text-[8px] font-mono uppercase tracking-widest text-[#b8860b] font-bold">
                  All 5 Core Weapons & Strategic Deliverables:
                </div>
                <ul className="space-y-2 text-xs text-zinc-300 font-light">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
                    <span><strong className="text-white font-medium">Asset 01 (Bandwidth):</strong> Reclaim 15+ weekly hours via 4-lane incoming triage and 30-day meeting expiration protocols.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
                    <span><strong className="text-white font-medium">Asset 02 (Decoupling):</strong> 4-week founder severance drill and signing ceilings ensuring 30-day continuous operation.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
                    <span><strong className="text-white font-medium">Asset 03 (Velocity):</strong> 72-hour hard escalation clocks and Single DRI charters eliminating consensus bottlenecks.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
                    <span><strong className="text-white font-medium">Asset 04 (Onboarding):</strong> Day 30/60/90 binary delivery covenants reducing executive ramp from 180 to 30 days.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
                    <span><strong className="text-white font-medium">Asset 05 (Telemetry):</strong> 5-domain diagnostic score audit generating empirical organizational heatmaps for board review.</span>
                  </li>
                </ul>
              </div>

              {/* Early Bird Bonuses */}
              <div className="p-4 bg-white/5 border border-white/10 rounded-xs space-y-1.5">
                <div className="text-[8px] font-mono uppercase text-[#b8860b] font-black flex items-center gap-1.5">
                  <Gift className="w-3.5 h-3.5 text-[#b8860b]" />
                  Included Early Bird Privileges ($1,250 Value):
                </div>
                <ul className="text-[11px] text-zinc-300 space-y-1.5 font-light">
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
            <div className="lg:col-span-5 bg-white text-[#111111] p-6 sm:p-8 rounded-xs shadow-xl border border-zinc-200 space-y-6">
              <div className="border-b border-zinc-200 pb-4">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-mono uppercase text-zinc-400 font-bold">
                    Early Bird Allocation Price
                  </span>
                  <span className="px-2 py-0.5 bg-red-600 text-white text-[8px] font-mono uppercase font-black rounded-2xs">
                    6 Vaults Left At This Price
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
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-100">
                  <div className="text-[9px] font-mono text-zinc-500">
                    Instant 1-Click Workspace Duplicate • Enterprise License
                  </div>
                  <CurrencySelector
                    currentCurrency={currency}
                    onCurrencyChange={setCurrency}
                    size="xs"
                    variant="light"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setCheckoutItem(SOVEREIGN_VAULT_BUNDLE)}
                  className="w-full py-4 px-6 bg-[#111111] hover:bg-[#b8860b] text-white text-[10px] font-mono uppercase font-black tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                >
                  <span>Lock The Sovereign Vault at 60% Off</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <div className="flex items-center justify-center gap-2 text-[9px] font-mono text-zinc-500">
                  <Lock className="w-3 h-3 text-[#b8860b]" />
                  <span>Single Enterprise License • No Recurring Subscription • Multi-Team Access</span>
                </div>
              </div>

              <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-2xs text-[10px] text-zinc-700 leading-relaxed">
                <div className="font-bold text-[#111111] mb-1.5 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                  The TULC Performance Commitment:
                </div>
                <ul className="space-y-1 text-zinc-600 font-light">
                  <li className="flex items-start gap-1.5">
                    <span className="text-[#b8860b] font-bold">•</span>
                    <span>30-day evaluation window to install and test systems with your team.</span>
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

        {/* Section 5: Institutional FAQs */}
        <section className="border-t border-zinc-200 pt-12">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-1">
              <span className="font-mono text-[8px] uppercase tracking-widest text-[#b8860b] font-black">
                TRANSPARENT ADVISORY TERMS
              </span>
              <h3 className="text-2xl font-bold tracking-tight text-[#111111]">
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
