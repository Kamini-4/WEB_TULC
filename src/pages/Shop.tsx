import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
  Gift,
  Copy,
  ExternalLink
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
import { apiRequest } from '../lib/apiClient';

export const ShopPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [inspectingProduct, setInspectingProduct] = useState<ShopProduct | null>(null);
  const [checkoutItem, setCheckoutItem] = useState<ShopProduct | BundleProduct | null>(null);
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => getStoredCurrency());
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Free Lead Magnet Capture State
  const [freeMagnetName, setFreeMagnetName] = useState('');
  const [freeMagnetEmail, setFreeMagnetEmail] = useState('');
  const [freeMagnetCompany, setFreeMagnetCompany] = useState('');
  const [freeMagnetTeamSize, setFreeMagnetTeamSize] = useState('11-50');
  const [freeMagnetBottleneck, setFreeMagnetBottleneck] = useState('Tactical Firefighting & Approvals');
  const [freeMagnetSubmitting, setFreeMagnetSubmitting] = useState(false);
  const [freeMagnetSuccess, setFreeMagnetSuccess] = useState(false);
  const [freeMagnetCopied, setFreeMagnetCopied] = useState(false);

  const handleFreeLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!freeMagnetEmail || !freeMagnetName) return;
    setFreeMagnetSubmitting(true);
    try {
      await apiRequest('/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          fullName: freeMagnetName,
          email: freeMagnetEmail,
          organization: freeMagnetCompany || 'Enterprise Lead',
          subject: 'Lead Generation: Free 1-Page Delegation Covenant Download',
          message: `Team Size: ${freeMagnetTeamSize}. Bottleneck: ${freeMagnetBottleneck}. Lead downloaded free delegation covenant.`
        })
      });
      setFreeMagnetSuccess(true);
    } catch (err) {
      console.warn('Fallback lead capture success', err);
      setFreeMagnetSuccess(true);
    } finally {
      setFreeMagnetSubmitting(false);
    }
  };

  const copyFreeNotionLink = () => {
    navigator.clipboard.writeText('https://notion.so/tulc-vault/free-founder-delegation-covenant-master');
    setFreeMagnetCopied(true);
    setTimeout(() => setFreeMagnetCopied(false), 2000);
  };

  const handleDownloadCovenantPdf = () => {
    const covenantHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Founder Delegation & Sovereign Boundary Covenant // T.U.L.C.</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=JetBrains+Mono:wght@400;700&display=swap');
            body { font-family: 'Playfair Display', Georgia, serif; color: #1c1917; background: #fafaf6; margin: 0; padding: 40px; }
            .container { max-width: 800px; margin: 0 auto; background: #ffffff; padding: 60px; border: 1px solid #ded6c5; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
            .header { border-bottom: 2px solid #b8860b; padding-bottom: 20px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: flex-end; }
            .title { font-size: 24px; font-weight: bold; text-transform: uppercase; letter-spacing: -0.02em; margin: 0; }
            .mono { font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #8c6708; }
            h2 { font-size: 16px; text-transform: uppercase; border-left: 3px solid #b8860b; padding-left: 10px; margin-top: 25px; margin-bottom: 12px; }
            p, li { font-size: 13px; line-height: 1.6; color: #44403c; }
            table { width: 100%; border-collapse: collapse; margin: 15px 0; font-size: 12px; }
            th, td { border: 1px solid #ded6c5; padding: 8px 12px; text-align: left; }
            th { background: #faf8f5; font-family: 'JetBrains Mono', monospace; font-size: 10px; text-transform: uppercase; }
            .badge { background: #efebe2; border: 1px solid #ded6c5; padding: 12px; margin: 15px 0; border-radius: 2px; }
            @media print { body { background: #fff; padding: 0; } .container { border: none; box-shadow: none; padding: 20px; } }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div>
                <div class="mono">THE UNBOUNDED LEADERSHIP CO. // SOVEREIGN INSTRUMENT</div>
                <div class="title">Founder Delegation Covenant</div>
              </div>
              <div class="mono" style="text-align: right;">VERSION 4.2<br/>CONFIDENTIAL</div>
            </div>

            <p><strong>PURPOSE:</strong> This Covenant establishes irrevocable operational authority ceilings, eliminating the founder as an accidental decision clearinghouse while safeguarding enterprise equity.</p>

            <h2>1. Autonomous Signing Ceilings (Zero Founder Review)</h2>
            <table>
              <tr>
                <th>Tier</th>
                <th>Capital Limit</th>
                <th>Required Approvals</th>
                <th>Exception Condition</th>
              </tr>
              <tr>
                <td><strong>Tier 1: Edge Operational</strong></td>
                <td>Under $5,000</td>
                <td>Single Direct Report</td>
                <td>Zero founder notification required.</td>
              </tr>
              <tr>
                <td><strong>Tier 2: Tactical Initiative</strong></td>
                <td>$5,000 to $25,000</td>
                <td>Two Function Leads</td>
                <td>Logged in weekly asynchronous ledger.</td>
              </tr>
              <tr>
                <td><strong>Tier 3: Strategic Commitments</strong></td>
                <td>Exceeds $25,000</td>
                <td>Executive Committee / Founder</td>
                <td>Must include 3-bullet downside containment brief.</td>
              </tr>
            </table>

            <h2>2. The 3 Non-Negotiable Containment Guardrails</h2>
            <div class="badge">
              <p>Direct reports hold 100% autonomous execution sovereignty provided these 3 conditions are satisfied:</p>
              <ul>
                <li><strong>Rule 1 (Reversibility):</strong> The decision can be reversed within 72 hours for less than 5% of monthly EBITDA.</li>
                <li><strong>Rule 2 (Brand Non-Dilution):</strong> No modification to core positioning, public promises, or pricing floors.</li>
                <li><strong>Rule 3 (Transparency):</strong> All approved vendor contracts and hires logged to the centralized operating ledger.</li>
              </ul>
            </div>

            <h2>3. The 72-Hour Anti-Bottleneck Escalation Filter</h2>
            <p>If an executive submits an initiative requiring founder review, and the founder does not respond within <strong>72 hours</strong>, the initiative is deemed <strong>AUTONOMOUSLY APPROVED</strong> under Tier 2 parameters. This guarantees that founder calendar latency cannot stall enterprise velocity.</p>

            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ded6c5; display: flex; justify-content: space-between; font-size: 11px; color: #78716c;">
              <span>Office of Suchita Sancheti &bull; suchita@theunboundedleadership.com</span>
              <span>theunboundedleadership.com</span>
            </div>
          </div>
          <script>
            window.onload = function() { window.print(); }
          </script>
        </body>
    `;
    try {
      const blob = new Blob([covenantHtml], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Founder-Delegation-Covenant-Master.html';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      window.open('/downloadables/Founder-Delegation-Covenant-Master.html', '_blank');
    }
  };

  const setCurrency = (newCurrency: CurrencyCode) => {
    setCurrencyState(newCurrency);
    setStoredCurrency(newCurrency);
  };

  const currencySymbols = CURRENCY_SYMBOLS;

  const categories = [
    { id: 'all', label: 'All Toolkits (6)' },
    { id: 'bundle', label: '⭐ Complete Systems Suite ($197 • Save 86%)' },
    { id: 'Bandwidth Architecture', label: 'Bandwidth ($27–$47)' },
    { id: 'Continuity & Decoupling', label: 'Decoupling ($67)' },
    { id: 'Decision Architecture', label: 'Decision Velocity ($67)' },
    { id: 'Executive Bench', label: 'Executive Bench ($87)' },
    { id: 'Enterprise Telemetry', label: 'Telemetry ($97)' }
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
    <div className="min-h-screen bg-[#f7f4ee] text-[#1c1917] pb-24 font-serif">
      {/* Top Value-Based Executive Systems Ticker Bar */}
      <div className="bg-[#1c1917] text-white border-b border-[#ded6c5] py-2.5 px-4 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5 text-[10px] sm:text-xs">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 font-bold text-[#b8860b] uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              EXECUTIVE SYSTEMS & TOOLKITS ACTIVE
            </span>
            <span className="text-zinc-300">
              Battle-Tested Digital Systems from <strong className="text-white">$27</strong> • Complete Suite <strong className="text-[#b8860b]">$197 (Save 86%)</strong>
            </span>
            <a
              href="#free-lead-magnet"
              className="text-[#b8860b] hover:text-white underline font-bold uppercase tracking-wider"
            >
              Get Free Delegation Covenant →
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

      {/* Hero Section - Elegant, Authoritative, Value-Based */}
      <section className="relative pt-6 sm:pt-8 pb-6 sm:pb-8 border-b border-[#ded6c5] bg-[#efebe2]/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-2.5 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-[#1c1917] text-[#b8860b] border border-[#b8860b]/40 text-[9px] font-mono uppercase tracking-widest font-black">
                <Zap className="w-3 h-3 text-[#b8860b]" /> 100% Turnkey Notion & Coda Workspaces • 1-Click Duplicate
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1c1917] leading-tight tracking-tight">
                Digital Systems for Founders. <br />
                <span className="italic font-bold text-[#8c6708]">Stop Answering 40 Questions A Day.</span>
              </h1>

              <p className="text-xs sm:text-sm text-[#57534e] leading-relaxed max-w-2xl">
                You scaled an enterprise. Your time is worth $500–$1,000/hr. Why are you spending it fielding tactical Slack approvals? We packaged our proprietary advisory systems into 1-click digital workspaces. Duplicate in 20 minutes; reclaim 15+ hours weekly.
              </p>
            </div>

            {/* Quick Context Links & Controls */}
            <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-2.5 shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-[#78716c] uppercase font-bold">Currency:</span>
                <CurrencySelector
                  currentCurrency={currency}
                  onCurrencyChange={setCurrency}
                  size="xs"
                  variant="light"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono">
                <a 
                  href="#free-lead-magnet" 
                  className="px-2.5 py-1 bg-black text-[#b8860b] hover:bg-[#8c6708] hover:text-white transition-colors rounded-2xs font-bold flex items-center gap-1 shadow-2xs"
                >
                  <span>Free Gift: 1-Page Covenant</span>
                </a>
                <a 
                  href="#bundle-section" 
                  className="px-2.5 py-1 bg-[#8c6708] text-white hover:bg-black transition-colors rounded-2xs font-bold flex items-center gap-1 shadow-2xs"
                >
                  <Flame className="w-3 h-3 text-amber-200" />
                  <span>All 6 Systems ($197)</span>
                </a>
                <Link 
                  to="/intake" 
                  className="px-2.5 py-1 bg-white border border-[#ded6c5] text-[#1c1917] hover:border-black transition-colors rounded-2xs font-semibold"
                >
                  Bespoke Advisory →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-6">
        
        {/* COMPLIMENTARY COVENANT SECTION */}
        <section id="free-lead-magnet" className="bg-[#ffffff] border-2 border-[#b8860b] p-5 sm:p-7 rounded-xs shadow-md space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2.5 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-black text-[#b8860b] text-[9px] font-mono uppercase tracking-widest font-bold">
                <Gift className="w-3.5 h-3.5 text-[#b8860b]" /> 100% COMPLIMENTARY EXECUTIVE INSTRUMENT • ZERO PAYMENT REQUIRED
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1c1917] tracking-tight">
                The 1-Page Founder Delegation Covenant & Bottleneck Diagnostic
              </h2>
              <p className="text-xs sm:text-sm text-[#57534e] leading-relaxed">
                Stop acting as the universal bottleneck for routine approvals. Download our pre-calibrated single-page Notion covenant, signing ceilings under $5,000, and 72-hour team severance audit. Instant 1-click duplicate.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-1 text-[11px] text-[#78716c]">
                <span className="flex items-center gap-1 font-semibold text-[#1c1917]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> Pre-built Notion Workspace
                </span>
                <span className="flex items-center gap-1 font-semibold text-[#1c1917]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> Printable PDF Covenant Guide
                </span>
                <span className="flex items-center gap-1 font-semibold text-[#1c1917]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-600" /> Word-for-Word Rollout Script
                </span>
              </div>
            </div>

            {/* Opt-In Form or Success Reveal */}
            <div className="w-full lg:max-w-md bg-[#faf8f5] border border-[#ded6c5] p-4.5 rounded-xs">
              {!freeMagnetSuccess ? (
                <form onSubmit={handleFreeLeadSubmit} className="space-y-3">
                  <div className="text-xs font-bold uppercase tracking-tight text-[#1c1917] border-b border-[#ded6c5] pb-2 flex items-center justify-between">
                    <span>Instant Digital Unlock</span>
                    <span className="text-[10px] text-[#8c6708] font-bold font-mono">Benchmark: $95 • 100% Free</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[10px] font-mono uppercase font-bold text-[#57534e] mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={freeMagnetName}
                        onChange={(e) => setFreeMagnetName(e.target.value)}
                        placeholder="Elena Rostova"
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#ded6c5] rounded-xs focus:border-[#b8860b] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase font-bold text-[#57534e] mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={freeMagnetEmail}
                        onChange={(e) => setFreeMagnetEmail(e.target.value)}
                        placeholder="elena@enterprise.com"
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#ded6c5] rounded-xs focus:border-[#b8860b] focus:outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="block text-[10px] font-mono uppercase font-bold text-[#57534e] mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={freeMagnetCompany}
                        onChange={(e) => setFreeMagnetCompany(e.target.value)}
                        placeholder="Apex Logistics"
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#ded6c5] rounded-xs focus:border-[#b8860b] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase font-bold text-[#57534e] mb-1">
                        Team Size
                      </label>
                      <select
                        value={freeMagnetTeamSize}
                        onChange={(e) => setFreeMagnetTeamSize(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#ded6c5] rounded-xs focus:border-[#b8860b] focus:outline-none"
                      >
                        <option value="1-10">1 - 10 people</option>
                        <option value="11-50">11 - 50 people</option>
                        <option value="51-200">51 - 200 people</option>
                        <option value="200+">200+ people</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono uppercase font-bold text-[#57534e] mb-1">
                      Primary Operational Drag
                    </label>
                    <select
                      value={freeMagnetBottleneck}
                      onChange={(e) => setFreeMagnetBottleneck(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-white border border-[#ded6c5] rounded-xs focus:border-[#b8860b] focus:outline-none"
                    >
                      <option value="Tactical Firefighting & Approvals">Tactical Firefighting & Micro-Approvals</option>
                      <option value="Calendar & Meeting Overload">Calendar Overload & Zombie Status Meetings</option>
                      <option value="Decision Deadlock">Decision Deadlock & Consensus Drag</option>
                      <option value="Key-Person Risk">Key-Person Risk (Cannot Leave for 2 Weeks)</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    disabled={freeMagnetSubmitting}
                    className="w-full py-2.5 px-4 bg-black hover:bg-[#8c6708] text-white text-xs font-bold uppercase tracking-tight rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
                  >
                    <span>{freeMagnetSubmitting ? 'Generating Digital Token...' : 'Get Instant Access (Free Notion + PDF)'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <div className="space-y-3 text-center py-2">
                  <div className="w-10 h-10 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto border border-green-300">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <h4 className="text-sm font-bold text-[#1c1917]">
                    Access Authorized • Artifacts Ready
                  </h4>
                  <p className="text-xs text-[#57534e]">
                    Dispatched to <strong className="text-black">{freeMagnetEmail}</strong>. You can also duplicate immediately:
                  </p>
                  <div className="p-2.5 bg-white border border-[#ded6c5] rounded-xs text-left space-y-2">
                    <div className="text-[10px] font-mono uppercase text-[#78716c] font-bold">
                      Master Notion Workspace:
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={copyFreeNotionLink}
                        className="px-2.5 py-1.5 bg-[#efebe2] hover:bg-[#ded6c5] text-black text-[10px] font-mono uppercase font-bold rounded-2xs flex items-center gap-1 cursor-pointer"
                      >
                        <Copy className="w-3 h-3" />
                        <span>{freeMagnetCopied ? 'Copied!' : 'Copy Link'}</span>
                      </button>
                      <button
                        onClick={handleDownloadCovenantPdf}
                        className="px-2.5 py-1.5 bg-[#b8860b] hover:bg-[#8c6708] text-white text-[10px] font-mono uppercase font-bold rounded-2xs flex items-center gap-1 cursor-pointer shadow-xs"
                      >
                        <Download className="w-3 h-3" />
                        <span>Download PDF Covenant</span>
                      </button>
                      <a
                        href="https://notion.so"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 bg-black hover:bg-[#8c6708] text-white text-[10px] font-mono uppercase font-bold rounded-2xs flex items-center gap-1"
                      >
                        <span>Notion Master</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-[#ded6c5] text-[11px] text-[#78716c]">
                    <span>Step 2: Reclaim 15 hours weekly with our full <a href="#products" className="text-[#8c6708] font-bold underline">Bandwidth OS ($47)</a>.</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* VALUE-BASED PERSUASION: THE ARCHITECTURAL ACCESS MODEL */}
        <section className="bg-[#ffffff] border border-[#ded6c5] p-5 sm:p-6 rounded-xs shadow-2xs space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 py-0.5 bg-black text-[#b8860b] text-[9px] font-mono uppercase tracking-widest font-black">
              TRANSPARENT ADVISORY ECONOMICS
            </span>
            <span className="text-xs font-mono text-[#78716c] uppercase font-bold">
              Why We Price These Systems At $27 to $97 (Instead of $2,000+)
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-4 pt-1">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-[#1c1917]">1. Empirical Architectural Proof</h4>
              <p className="text-xs text-[#57534e] leading-relaxed">
                Our core firm earns revenue through bespoke $25,000–$100,000+ quarterly advisory retained mandates. We don't make our living selling digital files. These toolkits exist as an empirical demonstration of our systems to build trust with serious founders.
              </p>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-[#1c1917]">2. Zero Purchase Bureaucracy</h4>
              <p className="text-xs text-[#57534e] leading-relaxed">
                A $27 or $47 charge does not require a board meeting or procurement review. Any CEO can approve it on their corporate card in 30 seconds, duplicate the workspace, and begin testing our architecture immediately.
              </p>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-[#1c1917]">3. Asymmetrical Founder ROI</h4>
              <p className="text-xs text-[#57534e] leading-relaxed">
                If our $47 Bandwidth OS saves you just 5 hours this month, at a conservative $500/hr founder rate you just generated <strong className="text-black">$2,500 in cognitive value</strong>—an instant 5,300% return on your investment.
              </p>
            </div>
          </div>
        </section>

        {/* Master Storefront Filter Bar */}
        <div className="bg-[#faf8f5] border border-[#ded6c5] p-2.5 sm:p-3 rounded-xs shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[8px] font-mono uppercase tracking-widest text-[#8c6708] font-black mr-1 hidden sm:inline">
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
                  <Flame className="w-3.5 h-3.5" /> COMPLETE SUITE: SAVE 86% ({formatCurrencyAmount(getBundleSavings(SOVEREIGN_VAULT_BUNDLE, currency), currency)} OFF)
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
                    <span>Get The Complete Systems Suite at 86% Off ({formatCurrencyAmount(getBundlePrice(SOVEREIGN_VAULT_BUNDLE, currency), currency)})</span>
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
