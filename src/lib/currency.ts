/**
 * Currency & Pricing Facade
 * SOLID:
 * - Single Responsibility: High-level bridge providing backward-compatible facade
 * - Dependency Inversion: Delegates to defaultServiceContainer instances (ICurrencyService, IPricingCalculator, IStorageService)
 */

import { ShopProduct, BundleProduct } from '../data/shopProducts';
import { defaultServiceContainer } from '../core/di/ServiceContainer';
import { CurrencyCode, CurrencyConfig } from '../core/contracts/currency';

export type { CurrencyCode, CurrencyConfig };

export const SUPPORTED_CURRENCIES: CurrencyConfig[] = [
  ...defaultServiceContainer.currency.supportedCurrencies
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
  return defaultServiceContainer.currency.format(amount, currency);
};

export const getProductPrice = (product: ShopProduct, currency: CurrencyCode): number => {
  return defaultServiceContainer.pricing.calculateItemPrice(product, currency).finalPrice;
};

export const getProductOriginalPrice = (product: ShopProduct, currency: CurrencyCode): number => {
  return defaultServiceContainer.pricing.calculateItemPrice(product, currency).originalPrice;
};

export const getBundlePrice = (bundle: BundleProduct, currency: CurrencyCode): number => {
  return defaultServiceContainer.pricing.calculateItemPrice(bundle, currency).finalPrice;
};

export const getBundleOriginalPrice = (bundle: BundleProduct, currency: CurrencyCode): number => {
  return defaultServiceContainer.pricing.calculateItemPrice(bundle, currency).originalPrice;
};

export const getBundleSavings = (bundle: BundleProduct, currency: CurrencyCode): number => {
  return defaultServiceContainer.pricing.calculateItemPrice(bundle, currency).totalSavings;
};

const STORAGE_KEY = 'TULC_SHOP_CURRENCY';

export const getStoredCurrency = (): CurrencyCode => {
  const saved = defaultServiceContainer.storage.getItem<string>(STORAGE_KEY);
  if (saved && defaultServiceContainer.currency.isValidCurrency(saved)) {
    return saved;
  }
  return defaultServiceContainer.currency.defaultCurrency;
};

export const setStoredCurrency = (currency: CurrencyCode): void => {
  defaultServiceContainer.storage.setItem(STORAGE_KEY, currency);
};
