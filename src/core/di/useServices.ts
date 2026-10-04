/**
 * DI Hooks for React Components
 * SOLID: Dependency Inversion Principle
 */

import { useContext } from 'react';
import { ServiceContext } from './context';
import { IServices } from './ServiceContainer';
import { ICurrencyService } from '../contracts/currency';
import { IPricingCalculator } from '../contracts/pricing';
import { ICheckoutProcessor } from '../contracts/checkout';
import { IAssessmentScorer } from '../contracts/assessment';
import { IStorageService } from '../contracts/storage';

export const useServices = (): IServices => {
  return useContext(ServiceContext);
};

export const useCurrencyService = (): ICurrencyService => {
  return useContext(ServiceContext).currency;
};

export const usePricingCalculator = (): IPricingCalculator => {
  return useContext(ServiceContext).pricing;
};

export const useCheckoutProcessor = (): ICheckoutProcessor => {
  return useContext(ServiceContext).checkout;
};

export const useAssessmentScorer = (): IAssessmentScorer => {
  return useContext(ServiceContext).assessment;
};

export const useStorageService = (): IStorageService => {
  return useContext(ServiceContext).storage;
};
