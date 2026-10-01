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
import { apiRequest } from '../../lib/apiClient.ts';
import { CurrencyCode, formatCurrencyAmount, getProductPrice, getBundlePrice } from '../../lib/currency';
import { CurrencySelector } from './CurrencySelector';

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
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [step, setStep] = useState<'checkout' | 'success'>('checkout');
  const [isProcessing, setIsProcessing] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isDuplicatePrevented, setIsDuplicatePrevented] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [activeVaultLink, setActiveVaultLink] = useState('');
  
  // Per-session idempotency key to strictly prevent duplicate charges & race conditions
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
      // Dispatch idempotent checkout with timeout & retry handling
      const result = await apiRequest('/api/shop/checkout', {
        method: 'POST',
        timeoutMs: 12000,
        retries: 1,
        body: JSON.stringify({
          itemId: item.id,
          email: email.trim().toLowerCase(),
          fullName: fullName.trim(),
          organization: organization.trim(),
          idempotencyKey,
          currency,
          amount: currentPrice
        })
      });

      if (result.isDuplicatePrevented) {
        setIsDuplicatePrevented(true);
      }
      setActiveVaultLink(result.vaultLink || `https://notion.so/tulc-vault/${item.id}-license-${result.licenseToken || 'AUTH'}`);
      setStep('success');
    } catch (err: any) {
      console.error('Checkout failed:', err);
      setErrorMessage(err.message || 'Payment gateway timed out. Please retry.');
    } finally {
      setIsProcessing(false);
    }
  };

  const currentVaultLink = activeVaultLink || `https://notion.so/tulc-vault/${item.id}-license-PROD`;

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
                    Your master Notion duplicate workspace & PDF files are dispatched here immediately.
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
              </div>

              {/* Payment Methods Info */}
              <div className="p-3 bg-zinc-100/80 border border-zinc-200 rounded-2xs flex items-center justify-between text-[9px] font-mono text-zinc-600">
                <span className="flex items-center gap-1.5 font-bold">
                  <CreditCard className="w-3.5 h-3.5 text-[#b8860b]" /> Card / Corporate Wire / Invoice
                </span>
                <span className="text-zinc-500">256-bit Encrypted Checkout</span>
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

              {/* Live Notion Duplicate Link */}
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
                    href="https://notion.so"
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
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between py-1 border-b border-zinc-200">
                    <span className="font-mono text-[10px]">1. Executive PDF Playbook & Field Guide</span>
                    <span className="text-[9px] font-mono text-[#b8860b] font-bold">PDF Ready</span>
                  </div>
                  <div className="flex items-center justify-between py-1 border-b border-zinc-200">
                    <span className="font-mono text-[10px]">2. Video Walkthrough & Team Loom Script</span>
                    <span className="text-[9px] font-mono text-[#b8860b] font-bold">1080p HD Stream</span>
                  </div>
                  <div className="flex items-center justify-between py-1">
                    <span className="font-mono text-[10px]">3. Priority Architect Diagnostic Voucher</span>
                    <span className="text-[9px] font-mono text-green-600 font-bold">Attached</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-full py-2.5 px-4 bg-zinc-200 hover:bg-zinc-300 text-[#111111] text-[9px] font-mono uppercase font-bold transition-colors"
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
