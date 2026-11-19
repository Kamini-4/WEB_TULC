export type SettlementCurrency = 'USD' | 'EUR' | 'GBP' | 'INR' | 'AED';

export interface CurrencyMeta {
  code: SettlementCurrency;
  symbol: string;
  rate: number;
  taxRatePercent: number;
  taxLabel: string;
}

export const CURRENCY_SCHEDULE: Record<SettlementCurrency, CurrencyMeta> = {
  USD: { code: 'USD', symbol: '$', rate: 1, taxRatePercent: 0, taxLabel: '0.00% Export Exempt' },
  EUR: { code: 'EUR', symbol: '€', rate: 0.92, taxRatePercent: 0, taxLabel: '0.00% Reverse Charge' },
  GBP: { code: 'GBP', symbol: '£', rate: 0.79, taxRatePercent: 0, taxLabel: '0.00% Export Exempt' },
  INR: { code: 'INR', symbol: '₹', rate: 84.5, taxRatePercent: 18, taxLabel: '18.00% IGST / GST' },
  AED: { code: 'AED', symbol: 'AED ', rate: 3.67, taxRatePercent: 0, taxLabel: '0.00% Export Exempt' },
};

export const EXACT_CATALOG_USD_CENTS: Record<string, number> = {
  'delegation-matrix': 9840, // $41.20 + $32.80 + $24.40 = $98.40
  'execution-loop': 14680, // $59.40 + $48.20 + $39.20 = $146.80
  'founder-decoupling-suite': 29280, // $119.60 + $98.40 + $74.80 = $292.80
  'complete-executive-bundle': 40350, // $538.00 sum - 25% ($134.50) = $403.50
  'mandate-deposit-diagnostic': 241250, // 25% of $9,650.00 = $2,412.50
  'mandate-deposit-embedding': 633600, // 20% of $31,680.00 = $6,336.00
  'mandate-deposit-retainer': 535500, // 30% of $17,850.00 quarterly = $5,355.00
  'conclave-seat-reservation': 178500, // $1,120.00 + $445.00 + $220.00 = $1,785.00
};

export function formatExactAmount(amount: number, symbol = '$'): string {
  return `${symbol}${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export interface ExactQuoteBreakdown {
  currency: SettlementCurrency;
  symbol: string;
  rate: number;
  baseUsd: number;
  subtotal: number;
  taxAmount: number;
  totalExact: number;
  taxLabel: string;
}

export function computeExactClientPreview(
  itemId: string,
  fallbackPriceUsd: number,
  currency: SettlementCurrency,
  quantity = 1
): ExactQuoteBreakdown {
  const cfg = CURRENCY_SCHEDULE[currency];
  const cents = EXACT_CATALOG_USD_CENTS[itemId] ?? Math.round(fallbackPriceUsd * 100);
  const unitSmallest = Math.round(cents * cfg.rate);
  const subtotalSmallest = unitSmallest * quantity;
  const taxBps = Math.round(cfg.taxRatePercent * 100);
  const taxSmallest = Math.round((subtotalSmallest * taxBps) / 10000);
  const totalSmallest = subtotalSmallest + taxSmallest;

  return {
    currency,
    symbol: cfg.symbol,
    rate: cfg.rate,
    baseUsd: Number(((cents * quantity) / 100).toFixed(2)),
    subtotal: Number((subtotalSmallest / 100).toFixed(2)),
    taxAmount: Number((taxSmallest / 100).toFixed(2)),
    totalExact: Number((totalSmallest / 100).toFixed(2)),
    taxLabel: cfg.taxLabel,
  };
}
