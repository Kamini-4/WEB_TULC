/**
 * Pricing Service Implementation
 * SOLID:
 * - Single Responsibility: Exclusively coordinates pricing, savings, and ROI math
 * - Open/Closed: Evaluates extensible IDiscountStrategy implementations
 * - Dependency Inversion: Injects ICurrencyService abstraction
 */

import { CurrencyCode, ICurrencyService } from '../contracts/currency';
import { IDiscountStrategy, IPricedItem, IPricingCalculator, PricingCalculationResult } from '../contracts/pricing';
import { EarlyBirdDiscountStrategy, BundleDiscountStrategy } from '../strategies/PricingStrategies';

export class PricingService implements IPricingCalculator {
  private strategies: IDiscountStrategy[] = [
    new BundleDiscountStrategy(),
    new EarlyBirdDiscountStrategy()
  ];

  constructor(private currencyService: ICurrencyService) {}

  addStrategy(strategy: IDiscountStrategy): void {
    this.strategies.unshift(strategy);
  }

  getItemPriceNumber(item: IPricedItem, currency: CurrencyCode): number {
    if (!item || !item.pricing) return 0;
    switch (currency) {
      case 'EUR':
        return item.pricing.eur ?? Math.round(item.pricing.usd * 0.92);
      case 'GBP':
        return item.pricing.gbp ?? Math.round(item.pricing.usd * 0.79);
      case 'INR':
        return item.pricing.inr ?? Math.round(item.pricing.usd * 83);
      case 'AED':
        return item.pricing.aed ?? Math.round(item.pricing.usd * 3.67);
      case 'USD':
      default:
        return item.pricing.usd;
    }
  }

  getItemOriginalPriceNumber(item: IPricedItem, currency: CurrencyCode): number {
    const isBundle = item.id.includes('bundle') || item.id.includes('vault') || 'includes' in item;
    if (isBundle) {
      switch (currency) {
        case 'EUR': return 1350;
        case 'GBP': return 1150;
        case 'INR': return 119999;
        case 'AED': return 5320;
        case 'USD':
        default:
          return item.pricing.originalUsd ?? 1450;
      }
    }
    const current = this.getItemPriceNumber(item, currency);
    return current * 2;
  }

  calculateItemPrice(item: IPricedItem, currency: CurrencyCode): PricingCalculationResult {
    const finalPrice = this.getItemPriceNumber(item, currency);
    const originalPrice = this.getItemOriginalPriceNumber(item, currency);
    const totalSavings = Math.max(0, originalPrice - finalPrice);
    const savingsPercentage = originalPrice > 0 ? Math.round((totalSavings / originalPrice) * 100) : 0;

    const matchedStrategy = this.strategies.find(s => s.isApplicable(item));

    return {
      basePrice: finalPrice,
      finalPrice,
      originalPrice,
      totalSavings,
      savingsPercentage,
      appliedDiscountName: matchedStrategy?.name
    };
  }

  calculateRoi(hourlyRate: number, hoursLostWeekly: number, currency: CurrencyCode) {
    const mult = this.currencyService.getMultiplier(currency);
    const annualWeeks = 48; // Standard working weeks
    const annualHoursSaved = hoursLostWeekly * annualWeeks;
    const annualEquityWastedUsd = hoursLostWeekly * hourlyRate * annualWeeks;
    const annualEquityWasted = annualEquityWastedUsd * mult;

    // Investment cost: Flagship Sovereign Vault ($495 USD benchmark)
    const vaultCostUsd = 495;
    const vaultCost = vaultCostUsd * mult;

    const roiMultiple = vaultCostUsd > 0 ? Math.round(annualEquityWastedUsd / vaultCostUsd) : 0;
    const weeklyWaste = (hoursLostWeekly * hourlyRate) * mult;

    return {
      annualHoursSaved,
      annualEquityWasted,
      weeklyWaste,
      vaultCost,
      roiMultiple
    };
  }
}
