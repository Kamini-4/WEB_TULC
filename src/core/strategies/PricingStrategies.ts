/**
 * Pricing & Discount Strategies
 * SOLID: Open/Closed Principle
 * New promotional rules, tier discounts, and bundle bonuses can be added
 * without modifying the core PricingService.
 */

import { CurrencyCode } from '../contracts/currency';
import { IDiscountStrategy, IPricedItem } from '../contracts/pricing';

/** Early-bird 50% discount strategy for introductory launch licenses */
export class EarlyBirdDiscountStrategy implements IDiscountStrategy {
  readonly name = 'Early Bird Allocation (50% Off)';

  isApplicable(item: IPricedItem): boolean {
    return 'earlyBird' in item || (item.pricing && !!item.pricing.originalUsd);
  }

  calculateDiscount(item: IPricedItem, currency: CurrencyCode, currentPrice: number): number {
    // If standard item, original price is 2x current early bird price
    const original = currentPrice * 2;
    return original - currentPrice;
  }
}

/** Complete Flagship Vault Bundle discount strategy (65% off) */
export class BundleDiscountStrategy implements IDiscountStrategy {
  readonly name = 'Flagship Sovereign Vault Bundle (65% Off)';

  isApplicable(item: IPricedItem): boolean {
    return item.id.includes('bundle') || item.id.includes('vault') || 'includes' in item;
  }

  calculateDiscount(item: IPricedItem, currency: CurrencyCode, currentPrice: number): number {
    const originalUsd = item.pricing.originalUsd || 1450;
    const currentUsd = item.pricing.usd || 495;
    return Math.max(0, originalUsd - currentUsd);
  }
}

/** Default zero-discount baseline strategy */
export class StandardPricingStrategy implements IDiscountStrategy {
  readonly name = 'Standard Catalog Price';

  isApplicable(): boolean {
    return true;
  }

  calculateDiscount(): number {
    return 0;
  }
}
