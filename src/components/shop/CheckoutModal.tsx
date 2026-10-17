import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Download, 
  Copy, 
  ExternalLink, 
  Lock, 
  Mail, 
  Sparkles,
  ArrowRight,
  FileCheck,
  CreditCard,
  Building,
  Loader2,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { ShopProduct, BundleProduct } from '../../data/shopProducts';
import { CurrencyCode, formatCurrencyAmount, getProductPrice, getBundlePrice } from '../../lib/currency';
import { CurrencySelector } from './CurrencySelector';
import { useCheckoutProcessor } from '../../core/di/useServices';
import { Link } from 'react-router-dom';

interface CheckoutModalProps {
  item: ShopProduct | BundleProduct | null;
  onClose: () => void;
  currencySymbol?: string;
  currencyPrice?: number;
  currency?: CurrencyCode;
  onCurrencyChange?: (newCurrency: CurrencyCode) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  item,
  onClose,
  currencySymbol = '$',
  currencyPrice,
  currency = 'USD',
  onCurrencyChange
}) => {
  const checkoutProcessor = useCheckoutProcessor();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [teamSize, setTeamSize] = useState('11-50');
  const [bottleneck, setBottleneck] = useState('Tactical Approvals & Firefighting');
  const [step, setStep] = useState<'checkout' | 'success'>('checkout');
  const [paymentMethod, setPaymentMethod] = useState<'api_gateway' | 'razorpay' | 'corporate_invoice'>('api_gateway');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isDuplicatePrevented, setIsDuplicatePrevented] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeVaultLink, setActiveVaultLink] = useState('');
  
  // Per-session idempotency key to reliably prevent duplicate charges & race conditions
  const [idempotencyKey] = useState(() => `tulc_order_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`);

  if (!item) return null;

  const isBundle = 'includes' in item;

  const currentPrice = currencyPrice !== undefined
    ? currencyPrice
    : isBundle
      ? getBundlePrice(item as BundleProduct, currency)
      : getProductPrice(item as ShopProduct, currency);

  const handleCompleteOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !fullName || isProcessing) return;

    setIsProcessing(true);
    setErrorMessage('');

    try {
      const result = await checkoutProcessor.executeCheckout({
        itemId: item.id,
        itemTitle: item.title,
        amount: currentPrice,
        currency,
        idempotencyKey,
        customer: {
          email: email.trim().toLowerCase(),
          fullName: fullName.trim(),
          organization: organization.trim()
        }
      }, paymentMethod);

      if (!result.success) {
        setErrorMessage(result.errorMessage || 'Payment gateway timed out. Please retry.');
        return;
      }

      if (result.isDuplicatePrevented) {
        setIsDuplicatePrevented(true);
      }
      setActiveVaultLink(result.vaultLink || `/portal?vault=${item.id}-license-${result.licenseToken || 'AUTH'}`);
      setStep('success');
    } catch (err: any) {
      console.error('Checkout failed:', err);
      setErrorMessage(err.message || 'Payment processing error. Please retry.');
    } finally {
      setIsProcessing(false);
    }
  };

  const currentVaultLink = activeVaultLink || `/portal?vault=${item.id}-license-PROD`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentVaultLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/75 backdrop-blur-md animate-fade-in">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-xl bg-[#fbfbf9] text-[#111111] rounded-xs shadow-2xl border border-zinc-200 overflow-hidden my-6"
        >
          {/* Header */}
          <div className="p-6 bg-[#111111] text-white border-b border-[#b8860b]/30 relative">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-zinc-400 hover:text-white p-1 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-[#b8860b] text-[8px] font-mono uppercase font-black mb-1">
              <Lock className="w-3 h-3" /> Secure Institutional Ingress • Early Bird Allocation
            </div>
            <h3 className="text-xl font-bold text-white">
              {step === 'checkout' ? 'Lock In Your Early Bird License' : 'Vault Access Granted • Sovereign License Activated'}
            </h3>
            <p className="text-xs text-zinc-400 font-light mt-0.5">
              {item.title}
            </p>
          </div>

          {step === 'checkout' ? (
            <form onSubmit={handleCompleteOrder} className="p-6 sm:p-8 space-y-6">
              {/* Order Summary Pill */}
              <div className="p-4 bg-white border border-zinc-200 rounded-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="text-xs font-bold text-[#111111]">{item.title}</div>
                  <div className="text-[9px] font-mono text-zinc-500">
                    Instant 1-Click Digital Deployment • Enterprise Team License
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 self-end sm:self-auto">
                  {onCurrencyChange && (
                    <CurrencySelector
                      currentCurrency={currency}
                      onCurrencyChange={onCurrencyChange}
                      size="xs"
                      variant="light"
                    />
                  )}
                  <div className="text-right font-mono">
                    <div className="text-base font-black text-[#b8860b]">
                      {formatCurrencyAmount(currentPrice, currency)}
                    </div>
                    <div className="text-[8px] text-red-600 font-bold uppercase">{currency} • Early Bird Locked</div>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-[9px] font-mono uppercase font-bold text-zinc-600 mb-1">
                    Executive / Principal Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Elena Rostova"
                    className="w-full px-3 py-2 text-xs bg-white border border-zinc-300 rounded-2xs focus:border-[#b8860b] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-mono uppercase font-bold text-zinc-600 mb-1">
                    Corporate / Work Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="elena@enterprise.com"
                    className="w-full px-3 py-2 text-xs bg-white border border-zinc-300 rounded-2xs focus:border-[#b8860b] focus:outline-none"
                  />
                  <span className="text-[8px] font-mono text-zinc-400 mt-1 block">
                    Your master digital operating workspace & PDF files are dispatched here immediately.
                  </span>
                </div>

                <div>
                  <label className="block text-[9px] font-mono uppercase font-bold text-zinc-600 mb-1">
                    Enterprise / Firm Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="e.g. Apex Holdings Ltd"
                    className="w-full px-3 py-2 text-xs bg-white border border-zinc-300 rounded-2xs focus:border-[#b8860b] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-mono uppercase font-bold text-zinc-600 mb-1">
                      Organization Size
                    </label>
                    <select
                      value={teamSize}
                      onChange={(e) => setTeamSize(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-zinc-300 rounded-2xs focus:border-[#b8860b] focus:outline-none"
                    >
                      <option value="1-10">1 - 10 people</option>
                      <option value="11-50">11 - 50 people</option>
                      <option value="51-200">51 - 200 people</option>
                      <option value="200+">200+ people</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[9px] font-mono uppercase font-bold text-zinc-600 mb-1">
                      Primary Operational Drag
                    </label>
                    <select
                      value={bottleneck}
                      onChange={(e) => setBottleneck(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-zinc-300 rounded-2xs focus:border-[#b8860b] focus:outline-none"
                    >
                      <option value="Tactical Approvals & Firefighting">Tactical Approvals</option>
                      <option value="Meeting & Calendar Overload">Meeting Overload</option>
                      <option value="Decision Deadlock">Decision Deadlock</option>
                      <option value="Founder Key-Person Risk">Key-Person Risk</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono uppercase text-[#111111] font-bold block">
                  Select Settlement Channel
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('api_gateway')}
                    className={`p-2.5 rounded-2xs border text-left transition-all cursor-pointer ${
                      paymentMethod === 'api_gateway'
                        ? 'border-[#b8860b] bg-[#111111] text-white shadow-xs'
                        : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-[9px] font-mono uppercase font-bold">
                      <CreditCard className="w-3 h-3 text-[#b8860b]" /> Cards
                    </div>
                    <div className="text-[8px] opacity-70 mt-0.5 font-sans">Apple Pay / Visa / MC</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('razorpay')}
                    className={`p-2.5 rounded-2xs border text-left transition-all cursor-pointer ${
                      paymentMethod === 'razorpay'
                        ? 'border-[#b8860b] bg-[#111111] text-white shadow-xs'
                        : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-[9px] font-mono uppercase font-bold">
                      <Zap className="w-3 h-3 text-[#b8860b]" /> Razorpay
                    </div>
                    <div className="text-[8px] opacity-70 mt-0.5 font-sans">UPI / NetBanking / Cards</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('corporate_invoice')}
                    className={`p-2.5 rounded-2xs border text-left transition-all cursor-pointer ${
                      paymentMethod === 'corporate_invoice'
                        ? 'border-[#b8860b] bg-[#111111] text-white shadow-xs'
                        : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-[9px] font-mono uppercase font-bold">
                      <Building className="w-3 h-3 text-[#b8860b]" /> Wire / PO
                    </div>
                    <div className="text-[8px] opacity-70 mt-0.5 font-sans">Corporate Invoice</div>
                  </button>
                </div>
              </div>

              {/* Payment Methods Info */}
              <div className="p-2.5 bg-zinc-100/90 border border-zinc-200 rounded-2xs flex items-center justify-between text-[9px] font-mono text-zinc-600">
                <span className="flex items-center gap-1.5 font-bold">
                  <Lock className="w-3 h-3 text-[#b8860b]" /> 
                  {paymentMethod === 'razorpay' 
                    ? 'Razorpay Encrypted Node • UPI & GST Enabled' 
                    : paymentMethod === 'corporate_invoice'
                    ? 'Direct Procurement Protocol • Net 30 Available'
                    : '256-bit Encrypted Card Clearing • Instant Key'}
                </span>
                <span className="text-zinc-500 font-bold">PCI-DSS Compliant</span>
              </div>

              {/* TULC Performance Commitment Banner */}
              <div className="p-3 bg-green-50/70 border border-green-200 text-green-950 rounded-2xs space-y-1.5">
                <div className="flex items-center gap-1.5 font-bold text-[10px] text-green-900">
                  <ShieldCheck className="w-3.5 h-3.5 text-green-700" />
                  <span>The TULC Performance Commitment:</span>
                </div>
                <ul className="space-y-1 text-[10px] text-green-800 font-light">
                  <li className="flex items-start gap-1.5">
                    <span className="text-green-700 font-bold">•</span>
                    <span>30-Day Evaluation: Test and deploy with your leadership team.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-green-700 font-bold">•</span>
                    <span>Direct Velocity Standard: Full prompt refund if demonstrable bandwidth isn't gained.</span>
                  </li>
                </ul>
              </div>

              {/* Error Message & Retry */}
              {errorMessage && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-2xs text-xs flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCompleteOrder}
                    className="inline-flex items-center gap-1 text-[10px] font-mono uppercase text-red-700 hover:text-red-900 underline font-bold"
                  >
                    <RefreshCw className="w-3 h-3" /> Retry
                  </button>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3 px-4 bg-[#111111] hover:bg-[#b8860b] text-white text-[10px] font-mono uppercase font-black tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Authorizing Early Bird Token...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Order & Lock Early Bird Rate ({formatCurrencyAmount(currentPrice, currency)})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Success & Instant Delivery Screen */
            <div className="p-6 sm:p-8 space-y-6 text-center">
              <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto border border-green-300">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <h4 className="text-lg font-bold text-[#111111]">
                  Institutional License Authorized
                </h4>
                {isDuplicatePrevented ? (
                  <div className="inline-block my-1 px-3 py-1 bg-amber-50 border border-amber-300 rounded-2xs text-[10px] font-mono uppercase text-amber-900 font-bold">
                    Duplicate Order Neutralized • Existing License Verified (No Double Charge)
                  </div>
                ) : null}
                <p className="text-xs text-zinc-600 font-light max-w-md mx-auto">
                  A verification confirmation and official receipt have been dispatched to <strong className="text-black">{email}</strong>.
                </p>
              </div>

              {/* Live Digital Workspace Access */}
              <div className="p-4 bg-white border border-zinc-300 rounded-xs text-left space-y-2">
                <div className="text-[8px] font-mono uppercase text-zinc-500 font-bold flex items-center justify-between">
                  <span>Your Master Workspace Deployment Link:</span>
                  <span className="text-green-600 font-mono">Status: ACTIVE</span>
                </div>
                <div className="flex items-center gap-2 p-2 bg-zinc-50 border border-zinc-200 rounded-2xs text-xs font-mono text-zinc-800 break-all select-all">
                  <span className="truncate">{currentVaultLink}</span>
                </div>
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    onClick={copyToClipboard}
                    className="px-3 py-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-[9px] font-mono uppercase font-bold rounded-2xs flex items-center gap-1.5 transition-colors"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                  </button>
                  <a
                    href="/portal"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-[#111111] hover:bg-[#b8860b] text-white text-[9px] font-mono uppercase font-bold rounded-2xs flex items-center gap-1.5 transition-colors"
                  >
                    <span>Duplicate into Workspace</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Immediate Download Deliverables */}
              <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xs text-left space-y-2">
                <div className="text-[8px] font-mono uppercase text-zinc-500 font-bold">
                  Included Artifacts (Available for Instant Save):
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between py-1.5 border-b border-zinc-200">
                    <span className="font-mono text-[10px] text-zinc-800">1. Executive Delegation Covenant Master</span>
                    <a
                      href="/downloadables/Founder-Delegation-Covenant-Master.html"
                      download="Founder-Delegation-Covenant-Master.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#111111] hover:bg-[#b8860b] text-white text-[9px] font-mono uppercase font-bold rounded-2xs transition-colors"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download File</span>
                    </a>
                  </div>
                  <div className="flex items-center justify-between py-1.5 border-b border-zinc-200">
                    <span className="font-mono text-[10px] text-zinc-800">2. 72-Hour Absence Readiness Audit</span>
                    <a
                      href="/downloadables/TULC-72-Hour-Founder-Absence-Readiness-Audit.html"
                      download="TULC-72-Hour-Founder-Absence-Readiness-Audit.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#111111] hover:bg-[#b8860b] text-white text-[9px] font-mono uppercase font-bold rounded-2xs transition-colors"
                    >
                      <Download className="w-3 h-3" />
                      <span>Download Audit</span>
                    </a>
                  </div>
                  <div className="flex items-center justify-between py-1.5">
                    <span className="font-mono text-[10px] text-zinc-800">3. Priority Diagnostic Voucher</span>
                    <Link
                      to="/intake"
                      onClick={onClose}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#b8860b] hover:bg-[#8c6708] text-black text-[9px] font-mono uppercase font-black rounded-2xs transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      <span>Redeem Voucher</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* VIP Strategic Next Step: High-Ticket Lead Conversion Bridge */}
              <div className="p-4 bg-[#1c1917] text-white border border-[#b8860b]/40 rounded-xs text-left space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-mono uppercase text-[#b8860b] font-bold">
                    VIP FAST-TRACK ADVISORY INVITATION
                  </span>
                  <span className="px-1.5 py-0.2 bg-[#b8860b] text-black text-[8px] font-mono uppercase font-black rounded-2xs">
                    Fee Waived
                  </span>
                </div>
                <h5 className="text-xs font-bold text-white">
                  Claim Your 1-on-1 Confidential Founder Severance Audit
                </h5>
                <p className="text-[11px] text-zinc-300 font-light leading-relaxed">
                  As an authorized toolkit owner, your $1,500 diagnostic intake fee is 100% waived. Review your organizational bottlenecks directly with Founder Suchita Sancheti.
                </p>
                <Link
                  to="/intake"
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#b8860b] hover:bg-white hover:text-black text-black text-[9px] font-mono uppercase font-black tracking-wider transition-colors rounded-2xs mt-1"
                >
                  <span>Apply for Confidential Audit →</span>
                </Link>
              </div>

              <button
                onClick={onClose}
                className="w-full py-2.5 px-4 bg-zinc-200 hover:bg-zinc-300 text-[#111111] text-[9px] font-mono uppercase font-bold transition-colors cursor-pointer"
              >
                Close & Return to Sovereign Vault
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
