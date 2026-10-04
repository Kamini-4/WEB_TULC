/**
 * Service Container
 * SOLID: Dependency Inversion Principle
 * High-level composition root that wires abstractions and concrete dependencies.
 */

import { IStorageService } from '../contracts/storage';
import { ICurrencyService } from '../contracts/currency';
import { IPricingCalculator } from '../contracts/pricing';
import { ICheckoutProcessor } from '../contracts/checkout';
import { IAssessmentScorer } from '../contracts/assessment';

import { LocalStorageService } from '../services/StorageService';
import { CurrencyService } from '../services/CurrencyService';
import { PricingService } from '../services/PricingService';
import { CheckoutProcessor } from '../services/CheckoutProcessor';
import { AssessmentScorer } from '../services/AssessmentScorer';

export interface IServices {
  storage: IStorageService;
  currency: ICurrencyService;
  pricing: IPricingCalculator;
  checkout: ICheckoutProcessor;
  assessment: IAssessmentScorer;
}

export class ServiceContainer implements IServices {
  readonly storage: IStorageService;
  readonly currency: ICurrencyService;
  readonly pricing: IPricingCalculator;
  readonly checkout: ICheckoutProcessor;
  readonly assessment: IAssessmentScorer;

  constructor(customServices?: Partial<IServices>) {
    this.storage = customServices?.storage ?? new LocalStorageService();
    this.currency = customServices?.currency ?? new CurrencyService();
    this.pricing = customServices?.pricing ?? new PricingService(this.currency);
    this.checkout = customServices?.checkout ?? new CheckoutProcessor();
    this.assessment = customServices?.assessment ?? new AssessmentScorer();
  }
}

/** Global default service container instance */
export const defaultServiceContainer = new ServiceContainer();
