import { ShopProduct, BundleProduct } from '../data/shopProducts';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'INR' | 'AED';

export interface CurrencyConfig {
  code: CurrencyCode;
  label: string;
  symbol: string;
  name: string;
}

export const SUPPORTED_CURRENCIES: CurrencyConfig[] = [
  { code: 'USD', label: 'USD', symbol: '$', name: 'US Dollar ($)' },
  { code: 'EUR', label: 'EUR', symbol: '€', name: 'Euro (€)' },
  { code: 'GBP', label: 'GBP', symbol: '£', name: 'British Pound (£)' },
  { code: 'INR', label: 'INR', symbol: '₹', name: 'Indian Rupee (₹)' },
  { code: 'AED', label: 'AED', symbol: 'AED ', name: 'UAE Dirham (AED)' }
];

export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  INR: '₹',
  AED: 'AED '
};

export const CURRENCY_MULTIPLIERS: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83,
  AED: 3.67
};

export const formatCurrencyAmount = (amount: number, currency: CurrencyCode): string => {
  const symbol = CURRENCY_SYMBOLS[currency] || '$';
  const rounded = Math.round(amount);
  
  if (currency === 'INR') {
    return `${symbol}${rounded.toLocaleString('en-IN')}`;
  }
  return `${symbol}${rounded.toLocaleString('en-US')}`;
};

export const getProductPrice = (product: ShopProduct, currency: CurrencyCode): number => {
  if (!product || !product.pricing) return 0;
  switch (currency) {
    case 'EUR': return product.pricing.eur || Math.round(product.pricing.usd * 0.92);
    case 'GBP': return product.pricing.gbp || Math.round(product.pricing.usd * 0.79);
    case 'INR': return product.pricing.inr || Math.round(product.pricing.usd * 83);
    case 'AED': return product.pricing.aed || Math.round(product.pricing.usd * 3.67);
    case 'USD':
    default:
      return product.pricing.usd;
  }
};

export const getProductOriginalPrice = (product: ShopProduct, currency: CurrencyCode): number => {
  const current = getProductPrice(product, currency);
  return current * 2; // Standard 50% early bird discount across all currencies
};

export const getBundlePrice = (bundle: BundleProduct, currency: CurrencyCode): number => {
  if (!bundle || !bundle.pricing) return 0;
  switch (currency) {
    case 'EUR': return bundle.pricing.eur || Math.round(bundle.pricing.usd * 0.92);
    case 'GBP': return bundle.pricing.gbp || Math.round(bundle.pricing.usd * 0.79);
    case 'INR': return bundle.pricing.inr || Math.round(bundle.pricing.usd * 83);
    case 'AED': return bundle.pricing.aed || Math.round(bundle.pricing.usd * 3.67);
    case 'USD':
    default:
      return bundle.pricing.usd;
  }
};

export const getBundleOriginalPrice = (bundle: BundleProduct, currency: CurrencyCode): number => {
  switch (currency) {
    case 'EUR': return 1350;
    case 'GBP': return 1150;
    case 'INR': return 119999;
    case 'AED': return 5320;
    case 'USD':
    default:
      return bundle.pricing.originalUsd || 1450;
  }
};

export const getBundleSavings = (bundle: BundleProduct, currency: CurrencyCode): number => {
  const orig = getBundleOriginalPrice(bundle, currency);
  const current = getBundlePrice(bundle, currency);
  return orig - current;
};

const STORAGE_KEY = 'TULC_SHOP_CURRENCY';

export const getStoredCurrency = (): CurrencyCode => {
  if (typeof window === 'undefined') return 'USD';
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && ['USD', 'EUR', 'GBP', 'INR', 'AED'].includes(saved)) {
      return saved as CurrencyCode;
    }
  } catch (e) {
    console.warn('Unable to read currency preference from storage', e);
  }
  return 'USD';
};

export const setStoredCurrency = (currency: CurrencyCode): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, currency);
  } catch (e) {
    console.warn('Unable to save currency preference to storage', e);
  }
};
