/**
 * Currency Service Contract
 * SOLID: Interface Segregation & Dependency Inversion
 * Exposes only formatting and exchange rate methods needed by consumer components.
 */

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'INR' | 'AED';

export interface CurrencyConfig {
  code: CurrencyCode;
  label: string;
  symbol: string;
  name: string;
}

export interface ICurrencyService {
  readonly supportedCurrencies: readonly CurrencyConfig[];
  readonly defaultCurrency: CurrencyCode;
  getSymbol(currency: CurrencyCode): string;
  getMultiplier(currency: CurrencyCode): number;
  format(amount: number, currency: CurrencyCode): string;
  convert(amountUsd: number, targetCurrency: CurrencyCode): number;
  isValidCurrency(code: string): code is CurrencyCode;
}
