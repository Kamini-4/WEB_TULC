export type SettlementCurrency = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED';

export interface CurrencyMeta {
  code: SettlementCurrency;
  symbol: string;
  locale: 'en-IN' | 'en-US';
  /** Conversion multiplier relative to 1.00 INR */
  rateFromInr: number;
  /** Human-readable FX display: how many INR equal 1 unit of this currency */
  inrPerUnit: number;
  /** International cross-border delivery & multi-region AI/DB parity in basis points (0 for India INR, 2000 = 20.00% international) */
  intlParityBps: number;
  /** International FX conversion & cross-border gateway processing fee in basis points (0 for India INR, 450 = 4.50% international) */
  fxFeeBps: number;
  taxRatePercent: number;
  taxLabel: string;
}

export const CURRENCY_SCHEDULE: Record<SettlementCurrency, CurrencyMeta> = {
  INR: {
    code: 'INR',
    symbol: '₹',
    locale: 'en-IN',
    rateFromInr: 1,
    inrPerUnit: 1,
    intlParityBps: 0,
    fxFeeBps: 0,
    taxRatePercent: 18,
    taxLabel: '18.00% IGST / GST',
  },
  USD: {
    code: 'USD',
    symbol: '$',
    locale: 'en-US',
    rateFromInr: 1 / 84.5,
    inrPerUnit: 84.5,
    intlParityBps: 2000,
    fxFeeBps: 450,
    taxRatePercent: 0,
    taxLabel: '0.00% Export Exempt',
  },
  EUR: {
    code: 'EUR',
    symbol: '€',
    locale: 'en-US',
    rateFromInr: 0.92 / 84.5,
    inrPerUnit: Number((84.5 / 0.92).toFixed(2)),
    intlParityBps: 2000,
    fxFeeBps: 450,
    taxRatePercent: 0,
    taxLabel: '0.00% Reverse Charge',
  },
  GBP: {
    code: 'GBP',
    symbol: '£',
    locale: 'en-US',
    rateFromInr: 0.79 / 84.5,
    inrPerUnit: Number((84.5 / 0.79).toFixed(2)),
    intlParityBps: 2000,
    fxFeeBps: 450,
    taxRatePercent: 0,
    taxLabel: '0.00% Export Exempt',
  },
  AED: {
    code: 'AED',
    symbol: 'AED ',
    locale: 'en-US',
    rateFromInr: 3.67 / 84.5,
    inrPerUnit: Number((84.5 / 3.67).toFixed(2)),
    intlParityBps: 2000,
    fxFeeBps: 450,
    taxRatePercent: 0,
    taxLabel: '0.00% Export Exempt',
  },
};

/**
 * Authoritative India INR catalog denominated in integer paise (must match server.js 1:1).
 * Zero rounded-off estimates — every fee sums directly from principal hours, AI compute, and encrypted database ops.
 */
export const EXACT_CATALOG_INR_PAISE: Record<string, number> = {
  'delegation-matrix': 685000, // ₹2750.00 Rulebook + ₹2250.00 Capital Matrix + ₹1850.00 AI & DB Pack = ₹6850.00
  'execution-loop': 985000, // ₹3950.00 Sprint Spec + ₹3250.00 Async Cadence + ₹2650.00 AI & DB Schema = ₹9850.00
  'founder-decoupling-suite': 1485000, // ₹6150.00 Runbook + ₹4950.00 Charter + ₹3750.00 AI & Vault Pack = ₹14850.00
  'complete-executive-bundle': 2366250, // ₹31550.00 sum - 25.00% (₹7887.50) = ₹23662.50
  'mandate-deposit-diagnostic': 1922500, // 50.00% kickoff lock of Solo Diagnostic ₹38450.00 = ₹19225.00
  'mandate-deposit-diagnostic-group': 4472500, // 50.00% kickoff lock of Group CXO Cohort (3+ CXOs) ₹89450.00 = ₹44725.00
  'mandate-deposit-embedding': 7116250, // 25.00% kickoff lock of 90-Day Embedding ₹284650.00 = ₹71162.50
  'mandate-deposit-retainer': 6160500, // 30.00% lock of ₹205350.00 quarterly = ₹61605.00
  'mandate-retainer-instalment-monthly': 6845000, // Instalment 1 of 3 monthly @ ₹68450.00 (0.00% markup)
  'mandate-retainer-instalment-split': 10267500, // Instalment 1 of 2 bi-monthly @ ₹102675.00 (50/50 split)
  'conclave-seat-reservation': 2485000, // ₹14950.00 Roundtable + ₹6250.00 Pre-Briefing + ₹3650.00 AI Dossier & Vault = ₹24850.00
};

export function formatExactAmount(
  amount: number,
  symbol = '₹',
  _locale?: 'en-IN' | 'en-US'
): string {
  const fixed = amount.toFixed(2);
  const clean = fixed.endsWith('.00') ? fixed.slice(0, -3) : fixed;
  return `${symbol}${clean}`;
}

/** PDF-safe INR formatter without commas (jsPDF built-in Helvetica cannot render the Unicode ₹ glyph cleanly). */
export function formatExactInrPdf(amount: number): string {
  const fixed = amount.toFixed(2);
  const clean = fixed.endsWith('.00') ? fixed.slice(0, -3) : fixed;
  return `INR ${clean}`;
}

export interface ExactQuoteBreakdown {
  currency: SettlementCurrency;
  symbol: string;
  locale: 'en-IN' | 'en-US';
  inrPerUnit: number;
  baseInr: number;
  intlParityPercent: number;
  intlParityInr: number;
  fxFeePercent: number;
  fxConversionFee: number;
  subtotal: number;
  taxAmount: number;
  totalExact: number;
  taxLabel: string;
}

export function computeExactClientPreview(
  itemId: string,
  fallbackPriceInr: number,
  currency: SettlementCurrency,
  quantity = 1
): ExactQuoteBreakdown {
  const cfg = CURRENCY_SCHEDULE[currency];
  const unitPaise = EXACT_CATALOG_INR_PAISE[itemId] ?? Math.round(fallbackPriceInr * 100);
  const basePaise = unitPaise * quantity;
  const intlParityPaise = Math.round((basePaise * cfg.intlParityBps) / 10000);
  const adjustedInrPaise = basePaise + intlParityPaise;
  const subtotalSmallest = Math.round(adjustedInrPaise * cfg.rateFromInr);
  const fxFeeSmallest = Math.round((subtotalSmallest * cfg.fxFeeBps) / 10000);
  const taxableSmallest = subtotalSmallest + fxFeeSmallest;
  const taxBps = Math.round(cfg.taxRatePercent * 100);
  const taxSmallest = Math.round((taxableSmallest * taxBps) / 10000);
  const totalSmallest = taxableSmallest + taxSmallest;

  return {
    currency,
    symbol: cfg.symbol,
    locale: cfg.locale,
    inrPerUnit: cfg.inrPerUnit,
    baseInr: Number((basePaise / 100).toFixed(2)),
    intlParityPercent: cfg.intlParityBps / 100,
    intlParityInr: Number((intlParityPaise / 100).toFixed(2)),
    fxFeePercent: cfg.fxFeeBps / 100,
    fxConversionFee: Number((fxFeeSmallest / 100).toFixed(2)),
    subtotal: Number((subtotalSmallest / 100).toFixed(2)),
    taxAmount: Number((taxSmallest / 100).toFixed(2)),
    totalExact: Number((totalSmallest / 100).toFixed(2)),
    taxLabel: cfg.taxLabel,
  };
}
