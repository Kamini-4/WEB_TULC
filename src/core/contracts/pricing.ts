/**
 * Pricing & Product Contracts
 * SOLID:
 * - Interface Segregation: Segregates large product shapes into small, focused client contracts
 * - Open/Closed: Extensible discount strategies
 */

import { CurrencyCode } from './currency';

export interface CurrencyPricing {
  usd: number;
  originalUsd?: number;
  eur?: number;
  gbp?: number;
  inr?: number;
  aed?: number;
  estimatedBandwidthSavingsAnnualUsd?: number;
}

/** Segregated minimal contract for any item that has a monetary price */
export interface IPricedItem {
  id: string;
  title: string;
  pricing: CurrencyPricing;
}

/** Segregated contract for early-bird eligible items */
export interface IEarlyBirdEligible {
  earlyBird: {
    badge: string;
    discountPercent: number;
    seatsRemaining: number;
    originalPriceUsd: number;
    earlyBirdPriceUsd: number;
    bonusTitle?: string;
    bonusValue?: string;
    expirationNote?: string;
  };
}

/** Segregated contract for catalog listing displays */
export interface ICatalogSummary extends IPricedItem, Partial<IEarlyBirdEligible> {
  assetNumber?: string;
  tagline: string;
  category: string;
  badge?: string;
  format?: string;
  formatIcon?: string;
  installTime?: string;
}

/** Strategy Pattern: Open for extension (e.g. Early Bird, Volume, VIP, Promo Code) */
export interface IDiscountStrategy {
  readonly name: string;
  isApplicable(item: IPricedItem, context?: Record<string, unknown>): boolean;
  calculateDiscount(item: IPricedItem, currency: CurrencyCode, currentPrice: number): number;
}

export interface PricingCalculationResult {
  basePrice: number;
  finalPrice: number;
  originalPrice: number;
  totalSavings: number;
  savingsPercentage: number;
  appliedDiscountName?: string;
}

export interface IPricingCalculator {
  calculateItemPrice(item: IPricedItem, currency: CurrencyCode): PricingCalculationResult;
  calculateRoi(hourlyRate: number, hoursLostWeekly: number, currency: CurrencyCode): {
    annualHoursSaved: number;
    annualEquityWasted: number;
    weeklyWaste: number;
    vaultCost: number;
    roiMultiple: number;
  };
}
