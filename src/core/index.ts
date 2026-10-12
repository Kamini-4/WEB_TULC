/**
 * Core Architecture & SOLID Principles Barrel Export
 */

// Contracts (Interface Segregation & Abstractions)
export * from './contracts/storage';
export * from './contracts/currency';
export * from './contracts/pricing';
export * from './contracts/checkout';
export * from './contracts/assessment';

// Strategies (Open/Closed Principle & Liskov Substitution)
export * from './strategies/PricingStrategies';
export * from './strategies/PaymentStrategies';
export * from './strategies/AssessmentStrategies';

// Concrete Services (Single Responsibility Principle)
export * from './services/StorageService';
export * from './services/CurrencyService';
export * from './services/PricingService';
export * from './services/CheckoutProcessor';
export * from './services/AssessmentScorer';

// Dependency Injection (Dependency Inversion Principle)
export * from './di/ServiceContainer';
export * from './di/context';
export * from './di/useServices';
export * from './di/ServiceContext';
