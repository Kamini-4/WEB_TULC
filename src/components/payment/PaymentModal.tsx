import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Download,
  Copy,
  FileText,
  Building2,
  Sparkles,
  Loader2,
  AlertCircle,
  Clock
} from 'lucide-react';
import {
  SettlementCurrency,
  computeExactClientPreview,
  formatExactAmount,
} from '../../utils/pricing';

export interface PaymentItem {
  id: string;
  title: string;
  subtitle?: string;
  priceINR: number;
  category: 'toolkit' | 'retainer_deposit' | 'conclave_seat' | 'fast_track_clearance' | 'custom_retainer';
  deliverables?: string[];
}

export interface PaymentReceipt {
  orderId: string;
  transactionId: string;
  timestamp: string;
  amount: number;
  currency: string;
  customerEmail: string;
  customerName: string;
  paymentMethod: string;
  itemTitle: string;
  creditVoucherCode: string;
  status: 'paid' | 'pending_wire';
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: PaymentItem | null;
  onSuccess?: (receipt: PaymentReceipt) => void;
  initialCurrency?: SettlementCurrency;
  allowCurrencySwitch?: boolean;
}

interface ServerQuote {
  orderId: string;
  razorpayOrderId: string;
  razorpayKeyId: string;
  currency: string;
  amountSmallestUnit: number;
  subtotal: number;
  discountAmount: number;
  fxConversionFee?: number;
  taxAmount: number;
  totalDisplay: number;
  itemTitle: string;
}

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, cb: (resp: unknown) => void) => void;
    };
  }
}

function loadRazorpayCheckoutScript(): Promise<boolean> {
  if (typeof window === 'undefined') return Promise.resolve(false);
  if (window.Razorpay) return Promise.resolve(true);
  return new Promise((resolve) => {
    const existing = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existing) {
      existing.addEventListener('load', () => resolve(Boolean(window.Razorpay)));
      existing.addEventListener('error', () => resolve(false));
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(Boolean(window.Razorpay));
    script.onerror = () => resolve(false);
    document.head.appendChild(script);
  });
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  item,
  onSuccess,
  initialCurrency = 'INR',
  allowCurrencySwitch = true,
}) => {
  const [activeTab, setActiveTab] = useState<'gateway' | 'wire'>('gateway');
  const [isProcessing, setIsProcessing] = useState(false);
  const [receipt, setReceipt] = useState<PaymentReceipt | null>(null);
  const [copiedVoucher, setCopiedVoucher] = useState(false);
  const [currency, setCurrency] = useState<SettlementCurrency>(initialCurrency);
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [detailStep, setDetailStep] = useState<0 | 1>(0);
  const [couponCode, setCouponCode] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);
  const [serverQuote, setServerQuote] = useState<ServerQuote | null>(null);

  useEffect(() => {
    if (isOpen) {
      setReceipt(null);
      setIsProcessing(false);
      setValidationError(null);
      setServerQuote(null);
      setCurrency(initialCurrency);
      setDetailStep(0);
    }
  }, [isOpen, item, initialCurrency]);

  const handleCloseModal = () => {
    setValidationError(null);
    setServerQuote(null);
    onClose();
  };

  if (!isOpen || !item) return null;

  const exactPreview = computeExactClientPreview(item.id, item.priceINR, currency, 1);
  const currencySymbol = exactPreview.symbol;

  const handleInitiateRazorpayCheckout = async () => {
    const normalizedEmail = email.trim();
    if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setValidationError('Please enter a valid institutional or corporate email address.');
      return;
    }

    setValidationError(null);
    setIsProcessing(true);

    try {
      // Server independently looks up itemId, computes totals/taxes/discounts, and creates Razorpay order
      const orderResp = await fetch('/api/payments/create-order', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemId: item.id,
          quantity: 1,
          currency,
          customerEmail: normalizedEmail,
          organization: organization.trim(),
          couponCode: couponCode.trim() || undefined
        })
      });

      const orderData = await orderResp.json().catch(() => ({}));
      if (!orderResp.ok) {
        setValidationError(
          orderData.error ||
            'Online gateway checkout is temporarily unavailable. Please use Corporate Wire / Invoice or contact the Advisory Desk.'
        );
        setIsProcessing(false);
        return;
      }

      const quote = orderData as ServerQuote;
      setServerQuote(quote);

      const sdkLoaded = await loadRazorpayCheckoutScript();
      if (!sdkLoaded || !window.Razorpay || !quote.razorpayKeyId) {
        setValidationError(
          'Unable to initialize hosted Razorpay Checkout. Please verify connectivity or select Corporate Wire / Invoice.'
        );
        setIsProcessing(false);
        return;
      }

      const rzp = new window.Razorpay({
        key: quote.razorpayKeyId,
        amount: quote.amountSmallestUnit,
        currency: quote.currency,
        name: 'The Unbounded Leadership Co.',
        description: quote.itemTitle,
        order_id: quote.razorpayOrderId,
        prefill: {
          email: normalizedEmail
        },
        theme: {
          color: '#17181c'
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          }
        },
        handler: async (rzpResponse: Record<string, string>) => {
          try {
            const verifyResp = await fetch('/api/payments/verify', {
              method: 'POST',
              credentials: 'same-origin',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderId: quote.orderId,
                razorpay_order_id: rzpResponse.razorpay_order_id,
                razorpay_payment_id: rzpResponse.razorpay_payment_id,
                razorpay_signature: rzpResponse.razorpay_signature
              })
            });

            const verifyData = await verifyResp.json().catch(() => ({}));
            if (!verifyResp.ok || !verifyData.verified) {
              setValidationError(
                verifyData.error || 'Server payment signature verification failed. Access has not been granted.'
              );
              setIsProcessing(false);
              return;
            }

            const confirmedReceipt: PaymentReceipt = {
              orderId: quote.orderId,
              transactionId: verifyData.transactionId,
              timestamp: verifyData.timestamp,
              amount: verifyData.amount,
              currency: verifyData.currency,
              customerEmail: verifyData.customerEmail,
              customerName: organization.trim() || 'Authorized Executive Officer',
              paymentMethod: 'Razorpay Hosted Checkout (Signature Verified)',
              itemTitle: verifyData.itemTitle,
              creditVoucherCode: verifyData.creditVoucherCode,
              status: 'paid'
            };

            setReceipt(confirmedReceipt);
            setIsProcessing(false);
            if (onSuccess) onSuccess(confirmedReceipt);
          } catch {
            setValidationError('Unable to reach server to verify payment. Please contact support with your order ID.');
            setIsProcessing(false);
          }
        }
      });

      rzp.on('payment.failed', () => {
        setValidationError('Payment authorization was declined or failed by your bank.');
        setIsProcessing(false);
      });

      rzp.open();
    } catch {
      setValidationError('Payment server unreachable. Please check connectivity or contact the Advisory Desk.');
      setIsProcessing(false);
    }
  };

  const handleRequestWireInvoice = async () => {
    const normalizedEmail = email.trim();
    if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setValidationError('Please enter a valid institutional or corporate email address.');
      return;
    }

    setValidationError(null);
    setIsProcessing(true);

    try {
      const resp = await fetch('/api/payments/wire-request', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemId: item.id,
          quantity: 1,
          currency,
          customerEmail: normalizedEmail,
          organization: organization.trim()
        })
      });

      const data = await resp.json().catch(() => ({}));
      if (!resp.ok) {
        setValidationError(data.error || 'Unable to generate pro-forma invoice.');
        setIsProcessing(false);
        return;
      }

      const pendingReceipt: PaymentReceipt = {
        orderId: data.orderId,
        transactionId: data.invoiceReference,
        timestamp: data.timestamp,
        amount: data.amount,
        currency: data.currency,
        customerEmail: data.customerEmail,
        customerName: organization.trim() || 'Authorized Executive Officer',
        paymentMethod: 'Corporate Wire / Pro-Forma Invoice (Awaiting Settlement)',
        itemTitle: data.itemTitle,
        creditVoucherCode: 'ISSUED UPON WIRE SETTLEMENT',
        status: 'pending_wire'
      };

      setReceipt(pendingReceipt);
    } catch {
      setValidationError('Unable to reach server for invoice creation.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownloadDeliverable = async () => {
    if (!receipt || receipt.status !== 'paid') return;

    try {
      const resp = await fetch(`/api/payments/entitlement/${encodeURIComponent(receipt.orderId)}`, {
        method: 'GET',
        credentials: 'same-origin'
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        setValidationError(err.error || 'Payment verification required before downloading materials.');
        return;
      }

      const data = await resp.json();
      const content = data.deliverablePackageText || '';
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${item.id}-licensed-package.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      setValidationError('Unable to download verified deliverable package.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div
        className="bg-white border-2 border-black rounded-lg max-w-xl w-full p-4 sm:p-6 shadow-2xl relative my-auto text-black animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-dialog-title"
      >
        <button
          onClick={handleCloseModal}
          className="absolute top-3.5 right-3.5 p-1.5 text-zinc-600 hover:text-black rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
          aria-label="Close Payment Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {receipt ? (
          <div className="space-y-4 py-2">
            <div className="text-center space-y-2">
              <div
                className={`w-12 h-12 rounded-full border-2 flex items-center justify-center mx-auto shadow-sm ${
                  receipt.status === 'paid'
                    ? 'bg-emerald-50 border-emerald-600 text-emerald-600'
                    : 'bg-amber-50 border-amber-600 text-amber-700'
                }`}
              >
                {receipt.status === 'paid' ? (
                  <CheckCircle2 className="w-7 h-7" />
                ) : (
                  <Clock className="w-7 h-7" />
                )}
              </div>
              <span
                className={`text-[10px] font-mono uppercase tracking-widest font-bold block ${
                  receipt.status === 'paid' ? 'text-emerald-800' : 'text-amber-800'
                }`}
              >
                {receipt.status === 'paid'
                  ? 'Payment Verified Server-Side · Signature Confirmed'
                  : 'Pro-Forma Wire Docket Created · Pending Bank Settlement'}
              </span>
              <h2 id="payment-dialog-title" className="text-xl sm:text-2xl font-black text-black">
                {receipt.status === 'paid'
                  ? 'Access Granted & Receipt Confirmed'
                  : 'Corporate Wire Instructions Issued'}
              </h2>
              <p className="text-xs text-zinc-700 max-w-md mx-auto">
                {receipt.status === 'paid' ? (
                  <>
                    Receipt recorded for <strong className="text-black font-bold">{receipt.customerEmail}</strong>.
                  </>
                ) : (
                  <>
                    Digital deliverables unlock automatically once wire settlement is verified for{' '}
                    <strong className="text-black font-bold">{receipt.customerEmail}</strong>.
                  </>
                )}
              </p>
            </div>

            {validationError && (
              <div className="p-2.5 bg-rose-50 border border-rose-300 text-rose-800 rounded text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{validationError}</span>
              </div>
            )}

            <div className="bg-[#faf8f4] border-2 border-[#d8cebe] rounded-md p-3.5 sm:p-4 text-xs space-y-2 font-mono">
              <div className="flex justify-between border-b border-[#e5decfe0] pb-2">
                <span className="text-zinc-600">Item Requisitioned:</span>
                <span className="font-bold text-black text-right max-w-[240px] truncate">{receipt.itemTitle}</span>
              </div>
              <div className="flex justify-between border-b border-[#e5decfe0] pb-2">
                <span className="text-zinc-600">Reference ID:</span>
                <span className="font-bold text-black">{receipt.transactionId}</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#e5decfe0] pb-2">
                <span className="text-zinc-600">Server-Verified Exact Total:</span>
                <span className="font-black text-[#9d7b38] text-sm tabular-nums">
                  {formatExactAmount(receipt.amount, `${receipt.currency} `)}
                </span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-zinc-600">100.00% Retainer Credit Voucher:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-[#d4af37] bg-[#141416] px-2 py-0.5 rounded-xs border border-[#d4af37]/50">
                    {receipt.creditVoucherCode}
                  </span>
                  {receipt.status === 'paid' && (
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(receipt.creditVoucherCode);
                        setCopiedVoucher(true);
                        setTimeout(() => setCopiedVoucher(false), 2000);
                      }}
                      className="p-1 hover:bg-stone-200 rounded cursor-pointer text-zinc-700"
                      title="Copy Voucher"
                    >
                      {copiedVoucher ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-md flex items-start gap-2.5 text-xs">
              <Sparkles className="w-4 h-4 text-[#9d7b38] shrink-0 mt-0.5" />
              <p className="text-zinc-800 leading-snug">
                <strong>100% Retainer Guarantee:</strong> All verified investments are credited toward future executive mandates or diagnostic audits with Suchita Sancheti.
              </p>
            </div>

            <div className="space-y-2 pt-1">
              {receipt.status === 'paid' && (
                <button
                  onClick={handleDownloadDeliverable}
                  className="w-full py-3 px-4 bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase font-mono tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98"
                >
                  <Download className="w-4 h-4 text-[#d4af37]" />
                  <span>Download Verified Materials Package</span>
                </button>
              )}

              <button
                onClick={handleCloseModal}
                className="w-full py-2 px-3 border border-stone-300 hover:bg-stone-100 text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
              >
                Return to Advisory Hub
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="border-b border-stone-200 pb-3 pr-6">
              <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-[#9d7b38] font-black">
                <ShieldCheck className="w-3.5 h-3.5 text-[#9d7b38]" />
                <span>Server-Verified Executive Checkout · Institutional Clearance</span>
              </div>
              <h2 id="payment-dialog-title" className="text-lg sm:text-xl font-black text-black mt-0.5 leading-snug">
                {item.title}
              </h2>
              {item.subtitle && <p className="text-xs text-zinc-700 mt-0.5">{item.subtitle}</p>}
            </div>

            {/* Exact Server-Authoritative Calculation Ledger */}
            <div className="rounded-md border border-[#d8cebe] overflow-hidden bg-[#faf8f4]">
              <div className="p-3 border-b border-[#e5decfe0] flex flex-wrap items-center justify-between gap-2">
                <span className="text-[10px] font-mono uppercase text-[#9d7b38] font-bold">
                  Exact Settlement Calculation ({currency})
                </span>
                {allowCurrencySwitch ? (
                  <div className="flex items-center gap-1 text-xs font-mono font-bold">
                    {(['INR', 'USD', 'EUR', 'GBP', 'AED'] as const).map((curr) => (
                      <button
                        key={curr}
                        type="button"
                        onClick={() => {
                          setCurrency(curr);
                          setServerQuote(null);
                        }}
                        className={`px-2 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                          currency === curr
                            ? 'bg-[#141416] text-[#d4af37] font-black border border-[#d4af37]/60'
                            : 'bg-white border border-stone-200 text-zinc-700 hover:bg-stone-100'
                        }`}
                      >
                        {curr}
                      </button>
                    ))}
                  </div>
                ) : (
                  <span className="px-2 py-0.5 rounded bg-[#141416] text-[#d4af37] text-[10px] font-mono font-bold">
                    {currency}
                  </span>
                )}
              </div>

              <div className="p-3 space-y-1.5 text-[11px] font-mono">
                <div className="flex justify-between text-zinc-700">
                  <span>{currency === 'INR' ? 'Taxable Subtotal (INR):' : `International Subtotal (${currency}):`}</span>
                  <span className="font-bold text-[#141416] tabular-nums">
                    {formatExactAmount(
                      serverQuote ? serverQuote.subtotal : exactPreview.subtotal,
                      currencySymbol,
                      exactPreview.locale
                    )}
                  </span>
                </div>

                {serverQuote && serverQuote.discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Verified Mandate Credit Applied:</span>
                    <span className="tabular-nums">
                      -{formatExactAmount(serverQuote.discountAmount, currencySymbol, exactPreview.locale)}
                    </span>
                  </div>
                )}

                {currency !== 'INR' && (
                  <div className="flex justify-between text-zinc-700">
                    <span>FX Conversion &amp; Gateway Fee ({exactPreview.fxFeePercent.toFixed(2)}%):</span>
                    <span className="font-bold text-[#141416] tabular-nums">
                      {formatExactAmount(
                        serverQuote && typeof serverQuote.fxConversionFee === 'number'
                          ? serverQuote.fxConversionFee
                          : exactPreview.fxConversionFee,
                        currencySymbol,
                        exactPreview.locale
                      )}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-zinc-700">
                  <span>Statutory Tax ({exactPreview.taxLabel}):</span>
                  <span className="font-bold text-[#141416] tabular-nums">
                    {formatExactAmount(
                      serverQuote ? serverQuote.taxAmount : exactPreview.taxAmount,
                      currencySymbol,
                      exactPreview.locale
                    )}
                  </span>
                </div>
              </div>

              <div className="px-3 py-2.5 bg-[#141416] text-white flex items-center justify-between border-t border-[#d4af37]/50">
                <span className="text-[11px] font-mono uppercase font-bold text-[#f4ecd8]">
                  Exact Total Payable ({currency})
                </span>
                <span className="text-sm font-bold text-[#d4af37] font-mono tabular-nums">
                  {formatExactAmount(
                    serverQuote ? serverQuote.totalDisplay : exactPreview.totalExact,
                    currencySymbol,
                    exactPreview.locale
                  )}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1.5 bg-stone-100 p-1 rounded-md text-xs font-mono font-bold">
              <button
                type="button"
                onClick={() => setActiveTab('gateway')}
                className={`py-2 px-2 rounded-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'gateway' ? 'bg-white text-black shadow-xs font-black' : 'text-zinc-600 hover:text-black'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5 text-[#9d7b38]" />
                <span>Razorpay Checkout (Card / UPI)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('wire')}
                className={`py-2 px-2 rounded-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'wire' ? 'bg-white text-black shadow-xs font-black' : 'text-zinc-600 hover:text-black'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-[#9d7b38]" />
                <span>Corporate Wire / Invoice</span>
              </button>
            </div>

            {validationError && (
              <div className="p-2.5 bg-rose-50 border border-rose-300 text-rose-800 rounded text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{validationError}</span>
              </div>
            )}

            {/* One-by-One Customer Detail Capture */}
            <div className="p-3 bg-[#fcfaf7] border border-stone-200 rounded-md space-y-2.5">
              <div className="flex items-center justify-between text-[10px] font-mono uppercase">
                <span className="text-[#9d7b38] font-bold">
                  {detailStep === 0 ? 'Step 1 of 2 · Receipt Email' : 'Step 2 of 2 · Organization'}
                </span>
                {detailStep === 1 && (
                  <button
                    type="button"
                    onClick={() => setDetailStep(0)}
                    className="text-zinc-600 hover:text-black underline cursor-pointer"
                  >
                    Edit Email
                  </button>
                )}
              </div>

              {detailStep === 0 ? (
                <div className="space-y-2">
                  <label className="block text-[11px] font-bold text-black">
                    What corporate email should receive the tax invoice &amp; access link?
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      required
                      placeholder="chair@enterprise.com"
                      value={email}
                      onChange={(e) => {
                        setValidationError(null);
                        setEmail(e.target.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const trimmed = email.trim();
                          if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
                            setValidationError('Please enter a valid corporate email address.');
                          } else {
                            setValidationError(null);
                            setDetailStep(1);
                          }
                        }
                      }}
                      className="flex-1 bg-white border border-stone-300 rounded px-2.5 py-2 text-xs text-black placeholder:text-stone-400 focus:outline-none focus:border-black shadow-2xs"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const trimmed = email.trim();
                        if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
                          setValidationError('Please enter a valid corporate email address.');
                        } else {
                          setValidationError(null);
                          setDetailStep(1);
                        }
                      }}
                      className="px-3.5 py-2 bg-[#141416] hover:bg-black text-[#d4af37] font-mono text-[11px] font-bold uppercase rounded-xs cursor-pointer shrink-0"
                    >
                      Next →
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-[11px] font-mono text-zinc-600">
                    Receipt email: <strong className="text-black">{email}</strong>
                  </div>
                  <label className="block text-[11px] font-bold text-black">
                    What is your enterprise or organization name?
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Industrial Group"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded px-2.5 py-2 text-xs text-black placeholder:text-stone-400 focus:outline-none focus:border-black shadow-2xs"
                  />
                </div>
              )}
            </div>

            {activeTab === 'gateway' && (
              <div className="space-y-3 pt-1">
                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-700 font-bold mb-1">
                    Authorized Mandate / Discount Code (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="Validated exclusively on server"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    className="w-full bg-[#fcfaf7] border border-stone-300 rounded px-2.5 py-1.5 text-xs text-black font-mono uppercase placeholder:text-stone-400 focus:outline-none focus:border-black"
                  />
                </div>

                <div className="p-3 bg-stone-50 border border-stone-200 rounded-md text-xs text-zinc-700 space-y-1">
                  <div className="font-bold text-black flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-[#9d7b38]" />
                    <span>Zero Client-Side Card Handling (PCI-DSS Compliant)</span>
                  </div>
                  <p className="text-[11px] leading-snug">
                    Card, UPI, and net-banking details are tokenized directly inside Razorpay&apos;s hosted gateway. Totals, taxes, and payment signatures are verified server-side before unlocking materials.
                  </p>
                </div>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleInitiateRazorpayCheckout}
                  className="w-full py-3 px-4 bg-black hover:bg-zinc-800 disabled:bg-zinc-400 text-white font-black text-xs uppercase font-mono tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#d4af37]" />
                      <span>Verifying Order on Server...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Proceed to Hosted Razorpay Checkout</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {activeTab === 'wire' && (
              <div className="space-y-2.5 pt-1 text-xs">
                <div className="p-3 bg-[#faf8f4] border border-[#d8cebe] rounded space-y-1.5 font-mono">
                  <div className="flex justify-between border-b border-stone-200 pb-1 font-bold text-black">
                    <span>Beneficiary:</span>
                    <span>The Unbounded Leadership Co.</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-200 pb-1">
                    <span className="text-zinc-600">Domestic INR Settlement:</span>
                    <span className="font-bold text-black">NEFT / RTGS / IMPS (GST Tax Invoice)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600">International Wire:</span>
                    <span className="font-bold text-black">SWIFT / Corporate Pro-Forma</span>
                  </div>
                </div>

                <p className="text-[11px] text-zinc-600 italic">
                  A server-tracked GST pro-forma invoice reference will be issued with exact settlement details. Digital materials unlock automatically upon bank reconciliation.
                </p>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleRequestWireInvoice}
                  className="w-full py-3 px-4 bg-black hover:bg-zinc-800 text-white font-black text-xs uppercase font-mono tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#d4af37]" />
                      <span>Generating Server Invoice Docket...</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Generate Corporate Pro-Forma Invoice</span>
                    </>
                  )}
                </button>
              </div>
            )}

            <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-[10px] font-mono text-zinc-600">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#9d7b38]" />
                <span>256-Bit TLS · Server-Authoritative Verification</span>
              </div>
              <span className="text-[#9d7b38] font-bold">100% Retainer Credited</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
