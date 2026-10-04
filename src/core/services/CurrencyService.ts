/**
 * Currency Service Implementation
 * SOLID: Single Responsibility Principle
 * Pure calculation & formatting logic decoupled from persistence and UI components.
 */

import { CurrencyCode, CurrencyConfig, ICurrencyService } from '../contracts/currency';

export class CurrencyService implements ICurrencyService {
  readonly defaultCurrency: CurrencyCode = 'USD';

  readonly supportedCurrencies: readonly CurrencyConfig[] = [
    { code: 'USD', label: 'USD', symbol: '$', name: 'US Dollar ($)' },
    { code: 'EUR', label: 'EUR', symbol: '€', name: 'Euro (€)' },
    { code: 'GBP', label: 'GBP', symbol: '£', name: 'British Pound (£)' },
    { code: 'INR', label: 'INR', symbol: '₹', name: 'Indian Rupee (₹)' },
    { code: 'AED', label: 'AED', symbol: 'AED ', name: 'UAE Dirham (AED)' }
  ];

  private readonly symbols: Record<CurrencyCode, string> = {
    USD: '$',
    EUR: '€',
    GBP: '£',
    INR: '₹',
    AED: 'AED '
  };

  private readonly multipliers: Record<CurrencyCode, number> = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    INR: 83,
    AED: 3.67
  };

  getSymbol(currency: CurrencyCode): string {
    return this.symbols[currency] || '$';
  }

  getMultiplier(currency: CurrencyCode): number {
    return this.multipliers[currency] || 1;
  }

  format(amount: number, currency: CurrencyCode): string {
    const symbol = this.getSymbol(currency);
    const rounded = Math.round(amount);

    if (currency === 'INR') {
      return `${symbol}${rounded.toLocaleString('en-IN')}`;
    }
    return `${symbol}${rounded.toLocaleString('en-US')}`;
  }

  convert(amountUsd: number, targetCurrency: CurrencyCode): number {
    const mult = this.getMultiplier(targetCurrency);
    return Math.round(amountUsd * mult);
  }

  isValidCurrency(code: string): code is CurrencyCode {
    return ['USD', 'EUR', 'GBP', 'INR', 'AED'].includes(code);
  }
}
