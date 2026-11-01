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
  ArrowRight, 
  Loader2, 
  AlertCircle,
  ExternalLink,
  Printer,
  Calendar,
  Smartphone
} from 'lucide-react';

export interface PaymentItem {
  id: string;
  title: string;
  subtitle?: string;
  priceUSD: number;
  category: 'toolkit' | 'retainer_deposit' | 'conclave_seat' | 'fast_track_clearance' | 'custom_retainer';
  deliverables?: string[];
}

export interface PaymentReceipt {
  transactionId: string;
  timestamp: string;
  amount: number;
  currency: string;
  customerEmail: string;
  customerName: string;
  paymentMethod: string;
  itemTitle: string;
  creditVoucherCode: string;
}

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: PaymentItem | null;
  onSuccess?: (receipt: PaymentReceipt) => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  item,
  onSuccess
}) => {
  const [activeTab, setActiveTab] = useState<'card' | 'wallet' | 'wire'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [receipt, setReceipt] = useState<PaymentReceipt | null>(null);
  const [copiedVoucher, setCopiedVoucher] = useState(false);
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP' | 'INR' | 'AED'>('USD');

  // Form Fields
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardName, setCardName] = useState('');
  const [email, setEmail] = useState('');
  const [organization, setOrganization] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  // Reset states when item opens or closes
  useEffect(() => {
    if (isOpen) {
      setReceipt(null);
      setIsProcessing(false);
      setValidationError(null);
    }
  }, [isOpen, item]);

  if (!isOpen || !item) return null;

  // Currency multiplier calculation
  const currencyRates: Record<string, { symbol: string; rate: number }> = {
    USD: { symbol: '$', rate: 1 },
    EUR: { symbol: '€', rate: 0.92 },
    GBP: { symbol: '£', rate: 0.79 },
    INR: { symbol: '₹', rate: 86.5 },
    AED: { symbol: 'AED ', rate: 3.67 }
  };

  const currentRate = currencyRates[currency] || currencyRates.USD;
  const convertedAmount = Math.round(item.priceUSD * currentRate.rate);
  const formattedPrice = `${currentRate.symbol}${convertedAmount.toLocaleString()}`;

  // Card formatting helpers
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})/g, '$1 ').trim();
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      setCardExpiry(`${raw.slice(0, 2)}/${raw.slice(2, 4)}`);
    } else {
      setCardExpiry(raw);
    }
  };

  const handleFillDemoCard = () => {
    setCardNumber('4242 4242 4242 4242');
    setCardExpiry('12/28');
    setCardCvc('888');
    setCardName('Executive Director');
    if (!email) setEmail('executive@boardroom.org');
    if (!organization) setOrganization('Enterprise Holdings Ltd.');
    setValidationError(null);
  };

  const handleProcessPayment = (methodName: string) => {
    if (!email || !email.includes('@')) {
      setValidationError('Please enter a valid institutional or corporate email address.');
      return;
    }

    if (activeTab === 'card') {
      const cleanCard = cardNumber.replace(/\s/g, '');
      if (cleanCard.length < 15) {
        setValidationError('Please enter a valid 16-digit card number (or click "Fill Demo Card").');
        return;
      }
      if (!cardExpiry || cardExpiry.length < 5) {
        setValidationError('Please enter a valid expiration date (MM/YY).');
        return;
      }
      if (!cardCvc || cardCvc.length < 3) {
        setValidationError('Please enter your 3 or 4 digit security code.');
        return;
      }
    }

    setValidationError(null);
    setIsProcessing(true);

    setTimeout(() => {
      const randNum = Math.floor(100000 + Math.random() * 900000);
      const newReceipt: PaymentReceipt = {
        transactionId: `TXN-TULC-${randNum}`,
        timestamp: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        amount: convertedAmount,
        currency,
        customerEmail: email,
        customerName: cardName || 'Authorized Officer',
        paymentMethod: methodName,
        itemTitle: item.title,
        creditVoucherCode: `CREDIT-90DAY-${randNum.toString().slice(0, 4)}`
      };

      setReceipt(newReceipt);
      setIsProcessing(false);
      if (onSuccess) {
        onSuccess(newReceipt);
      }
    }, 1200);
  };

  const handleDownloadDeliverable = () => {
    const content = `THE UNBOUNDED LEADERSHIP CO.
OFFICIAL EXECUTIVE DELIVERABLE & RECEIPT
=====================================================
Item: ${item.title}
Transaction Reference: ${receipt?.transactionId}
Date: ${receipt?.timestamp}
Authorized Client: ${receipt?.customerName} (${receipt?.customerEmail})
Amount Paid: ${receipt?.currency} ${receipt?.amount}
100% Advisory Credit Voucher: ${receipt?.creditVoucherCode}

EXECUTIVE SUMMARY & OPERATING PROTOCOL:
- Authority Decoupling Rubric (Ready for Board Ratification)
- 14-Day Autonomous Execution Loop
- The $5,000 Delegation Matrix & Reversible Decision Rulebook
- Direct Advisory Access to Suchita Sancheti

HOW TO REDEEM YOUR 100% ADVISORY CREDIT:
Present your voucher code (${receipt?.creditVoucherCode}) during consultation scheduling 
to have 100% of this payment credited against your executive retainer or forensic audit mandate.

Confidential & Privileged — The Unbounded Leadership Co.`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${item.id}-licensed-package.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white border-2 border-black rounded-lg max-w-xl w-full p-4 sm:p-6 shadow-2xl relative my-auto text-black animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="payment-dialog-title"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 p-1.5 text-zinc-600 hover:text-black rounded-full hover:bg-stone-100 transition-colors cursor-pointer"
          aria-label="Close Payment Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ========================================================================= */}
        {/* VIEW A: SUCCESS RECEIPT STATE                                            */}
        {/* ========================================================================= */}
        {receipt ? (
          <div className="space-y-4 py-2">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-full bg-emerald-50 border-2 border-emerald-600 flex items-center justify-center mx-auto text-emerald-600 shadow-sm">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-800 font-bold block">
                Payment Authorized & Cryptographically Confirmed
              </span>
              <h2 id="payment-dialog-title" className="text-xl sm:text-2xl font-black text-black">
                Access Granted & Receipt Dispatched
              </h2>
              <p className="text-xs text-zinc-700 max-w-md mx-auto">
                A formal tax invoice and instant workspace links have been dispatched to{' '}
                <strong className="text-black font-bold">{receipt.customerEmail}</strong>.
              </p>
            </div>

            {/* Official Receipt Docket */}
            <div className="bg-[#faf8f4] border-2 border-[#d8cebe] rounded-md p-3.5 sm:p-4 text-xs space-y-2 font-mono">
              <div className="flex justify-between border-b border-[#e5decfe0] pb-2">
                <span className="text-zinc-600">Item Requisitioned:</span>
                <span className="font-bold text-black text-right max-w-[240px] truncate">{receipt.itemTitle}</span>
              </div>
              <div className="flex justify-between border-b border-[#e5decfe0] pb-2">
                <span className="text-zinc-600">Transaction Reference:</span>
                <span className="font-bold text-black">{receipt.transactionId}</span>
              </div>
              <div className="flex justify-between border-b border-[#e5decfe0] pb-2">
                <span className="text-zinc-600">Total Settled:</span>
                <span className="font-bold text-emerald-700 text-sm">
                  {receipt.currency} {receipt.amount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-zinc-600">100% Retainer Credit Voucher:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-black text-[#9d7b38] bg-[#eedec0] px-2 py-0.5 rounded-xs">
                    {receipt.creditVoucherCode}
                  </span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(receipt.creditVoucherCode);
                      setCopiedVoucher(true);
                      setTimeout(() => setCopiedVoucher(false), 2000);
                    }}
                    className="p-1 hover:bg-stone-200 rounded cursor-pointer text-zinc-700"
                    title="Copy Voucher"
                  >
                    {copiedVoucher ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Retainer Promise Notice */}
            <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-md flex items-start gap-2.5 text-xs">
              <Sparkles className="w-4 h-4 text-[#9d7b38] shrink-0 mt-0.5" />
              <p className="text-zinc-800 leading-snug">
                <strong>100% Retainer Guarantee:</strong> The full amount paid (${item.priceUSD} USD) is now automatically credited toward any future mandate, diagnostic audit, or executive advisory session with Suchita Sancheti.
              </p>
            </div>

            {/* Instant Access & Download Buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleDownloadDeliverable}
                className="w-full py-3 px-4 bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase font-mono tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98"
              >
                <Download className="w-4 h-4 text-[#d4af37]" />
                <span>Download Licensed Materials Package (Instant Access)</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-2 px-3 border border-stone-300 hover:bg-stone-100 text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
              >
                Return to Advisory Hub
              </button>
            </div>
          </div>
        ) : (
          /* ========================================================================= */
          /* VIEW B: CHECKOUT & PAYMENT SELECTION STATE                                */
          /* ========================================================================= */
          <div className="space-y-4">
            
            {/* Header / Item Summary */}
            <div className="border-b border-stone-200 pb-3 pr-6">
              <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-[#9d7b38] font-black">
                <ShieldCheck className="w-3.5 h-3.5 text-[#9d7b38]" />
                <span>Encrypted Executive Checkout · Institutional Clearance</span>
              </div>
              <h2 id="payment-dialog-title" className="text-lg sm:text-xl font-black text-black mt-0.5 leading-snug">
                {item.title}
              </h2>
              {item.subtitle && (
                <p className="text-xs text-zinc-700 mt-0.5">{item.subtitle}</p>
              )}
            </div>

            {/* Price & Currency Bar */}
            <div className="p-3 bg-[#faf8f4] border border-[#d8cebe] rounded-md flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold block">Total Investment</span>
                <span className="text-2xl font-black text-black">{formattedPrice}</span>
                <span className="text-[10px] font-mono text-zinc-600 ml-1.5 uppercase">({currency})</span>
              </div>

              {/* Currency Selector */}
              <div className="flex items-center gap-1 text-xs font-mono font-bold">
                {(['USD', 'EUR', 'GBP', 'INR', 'AED'] as const).map((curr) => (
                  <button
                    key={curr}
                    onClick={() => setCurrency(curr)}
                    className={`px-2 py-1 rounded text-[11px] transition-colors cursor-pointer ${
                      currency === curr 
                        ? 'bg-black text-[#d4af37] font-black' 
                        : 'bg-white border border-stone-200 text-zinc-700 hover:bg-stone-100'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Method Tabs */}
            <div className="grid grid-cols-3 gap-1.5 bg-stone-100 p-1 rounded-md text-xs font-mono font-bold">
              <button
                type="button"
                onClick={() => setActiveTab('card')}
                className={`py-2 px-2 rounded-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'card' 
                    ? 'bg-white text-black shadow-xs font-black' 
                    : 'text-zinc-600 hover:text-black'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5 text-[#9d7b38]" />
                <span>Credit Card</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('wallet')}
                className={`py-2 px-2 rounded-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'wallet' 
                    ? 'bg-white text-black shadow-xs font-black' 
                    : 'text-zinc-600 hover:text-black'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5 text-[#9d7b38]" />
                <span>Apple / Google Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('wire')}
                className={`py-2 px-2 rounded-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  activeTab === 'wire' 
                    ? 'bg-white text-black shadow-xs font-black' 
                    : 'text-zinc-600 hover:text-black'
                }`}
              >
                <Building2 className="w-3.5 h-3.5 text-[#9d7b38]" />
                <span>Wire / Invoice</span>
              </button>
            </div>

            {/* Error Message if any */}
            {validationError && (
              <div className="p-2.5 bg-rose-50 border border-rose-300 text-rose-800 rounded text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Customer Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div>
                <label className="block text-[10px] font-mono uppercase text-zinc-700 font-bold mb-1">
                  Corporate Email (for Delivery & Receipt) *
                </label>
                <input
                  type="email"
                  required
                  placeholder="chair@enterprise.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#fcfaf7] border border-stone-300 rounded px-2.5 py-1.5 text-xs text-black placeholder:text-stone-400 focus:outline-none focus:border-black shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono uppercase text-zinc-700 font-bold mb-1">
                  Enterprise / Organization Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Acme Industrial Group"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="w-full bg-[#fcfaf7] border border-stone-300 rounded px-2.5 py-1.5 text-xs text-black placeholder:text-stone-400 focus:outline-none focus:border-black shadow-2xs"
                />
              </div>
            </div>

            {/* TAB 1: CREDIT / DEBIT CARD */}
            {activeTab === 'card' && (
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-zinc-600 font-bold">
                    Card Payment Details
                  </span>
                  <button
                    type="button"
                    onClick={handleFillDemoCard}
                    className="text-[10px] font-mono text-[#9d7b38] hover:text-[#7d5f24] underline cursor-pointer font-bold"
                  >
                    ⚡ One-Click Fill Demo Card
                  </button>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-700 font-bold mb-0.5">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="Name as printed on card"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full bg-[#fcfaf7] border border-stone-300 rounded px-2.5 py-1.5 text-xs text-black placeholder:text-stone-400 focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase text-zinc-700 font-bold mb-0.5">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="4242 •••• •••• 4242"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      className="w-full bg-[#fcfaf7] border border-stone-300 rounded pl-2.5 pr-10 py-1.5 text-xs text-black font-mono placeholder:text-stone-400 focus:outline-none focus:border-black"
                    />
                    <CreditCard className="w-4 h-4 text-zinc-400 absolute right-3 top-2 pointer-events-none" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[10px] font-mono uppercase text-zinc-700 font-bold mb-0.5">
                      Expiry (MM/YY)
                    </label>
                    <input
                      type="text"
                      placeholder="12/28"
                      value={cardExpiry}
                      onChange={handleExpiryChange}
                      className="w-full bg-[#fcfaf7] border border-stone-300 rounded px-2.5 py-1.5 text-xs text-black font-mono placeholder:text-stone-400 focus:outline-none focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase text-zinc-700 font-bold mb-0.5">
                      CVC / CVV
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      placeholder="•••"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, ''))}
                      className="w-full bg-[#fcfaf7] border border-stone-300 rounded px-2.5 py-1.5 text-xs text-black font-mono placeholder:text-stone-400 focus:outline-none focus:border-black"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => handleProcessPayment('Credit Card (256-Bit Encrypted)')}
                  className="w-full mt-2 py-3 px-4 bg-black hover:bg-zinc-800 disabled:bg-zinc-400 text-white font-black text-xs uppercase font-mono tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#d4af37]" />
                      <span>Authorizing Sovereign Clearance...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Pay {formattedPrice} & Secure Access Now</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* TAB 2: APPLE / GOOGLE PAY */}
            {activeTab === 'wallet' && (
              <div className="space-y-3 pt-2 text-center">
                <div className="p-4 bg-stone-50 border border-stone-200 rounded-md space-y-2">
                  <Smartphone className="w-6 h-6 text-black mx-auto" />
                  <h3 className="text-sm font-bold text-black">1-Tap Sovereign Biometric Authorization</h3>
                  <p className="text-xs text-zinc-600 max-w-sm mx-auto">
                    Authenticate instantly with Apple Pay, Google Pay, or your corporate hardware key.
                  </p>
                </div>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => handleProcessPayment('1-Tap Digital Wallet (Apple/Google Pay)')}
                  className="w-full py-3.5 px-4 bg-black hover:bg-zinc-900 text-white font-black text-xs uppercase font-mono tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#d4af37]" />
                      <span>Processing Digital Token...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Authorize 1-Tap Payment · {formattedPrice}</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* TAB 3: INSTITUTIONAL WIRE / PRO-FORMA INVOICE */}
            {activeTab === 'wire' && (
              <div className="space-y-2.5 pt-1 text-xs">
                <div className="p-3 bg-[#faf8f4] border border-[#d8cebe] rounded space-y-1.5 font-mono">
                  <div className="flex justify-between border-b border-stone-200 pb-1 font-bold text-black">
                    <span>Beneficiary:</span>
                    <span>The Unbounded Leadership Co. Ltd.</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-200 pb-1">
                    <span className="text-zinc-600">Institutional Bank:</span>
                    <span className="font-bold text-black">JPMorgan Chase / Barclays Institutional</span>
                  </div>
                  <div className="flex justify-between border-b border-stone-200 pb-1">
                    <span className="text-zinc-600">Routing / SWIFT:</span>
                    <span className="font-bold text-black">CHASUS33 / BACS 20-00-00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600">Payment Reference:</span>
                    <span className="font-bold text-[#9d7b38]">TULC-INV-{Math.floor(100000 + Math.random() * 900000)}</span>
                  </div>
                </div>

                <p className="text-[11px] text-zinc-600 italic">
                  Selecting corporate wire will dispatch a pro-forma tax invoice and banking details to your corporate email immediately.
                </p>

                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={() => handleProcessPayment('Corporate Wire & Pro-Forma Invoice')}
                  className="w-full py-3 px-4 bg-black hover:bg-zinc-800 text-white font-black text-xs uppercase font-mono tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-98"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#d4af37]" />
                      <span>Generating Pro-Forma Invoice...</span>
                    </>
                  ) : (
                    <>
                      <FileText className="w-3.5 h-3.5 text-[#d4af37]" />
                      <span>Generate Corporate Pro-Forma Invoice ({formattedPrice})</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Security Footer Guarantee */}
            <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-[10px] font-mono text-zinc-600">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#9d7b38]" />
                <span>256-Bit TLS Bank Encryption · PCI-DSS Tier 1</span>
              </div>
              <span className="text-[#9d7b38] font-bold">100% Retainer Credited</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
