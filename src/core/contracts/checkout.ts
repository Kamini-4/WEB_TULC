/**
 * Checkout & Payment Contracts
 * SOLID:
 * - Single Responsibility: Separate checkout coordination from payment mechanics
 * - Open/Closed: Payment strategies can be added without modifying the checkout orchestrator
 * - Liskov Substitution: Any IPaymentStrategy can be used interchangeably
 */

import { CurrencyCode } from './currency';

export interface CheckoutCustomerInfo {
  fullName: string;
  email: string;
  organization?: string;
}

export interface CheckoutOrderPayload {
  itemId: string;
  itemTitle: string;
  amount: number;
  currency: CurrencyCode;
  customer: CheckoutCustomerInfo;
  idempotencyKey: string;
}

export interface CheckoutResult {
  success: boolean;
  orderId?: string;
  licenseToken?: string;
  vaultLink?: string;
  isDuplicatePrevented?: boolean;
  errorMessage?: string;
  requiresRedirect?: boolean;
  redirectUrl?: string;
}

export interface IPaymentStrategy {
  readonly paymentMethodId: string;
  readonly label: string;
  processPayment(order: CheckoutOrderPayload): Promise<CheckoutResult>;
}

export interface ICheckoutProcessor {
  registerStrategy(strategy: IPaymentStrategy): void;
  getStrategy(methodId: string): IPaymentStrategy | undefined;
  executeCheckout(order: CheckoutOrderPayload, paymentMethodId?: string): Promise<CheckoutResult>;
}
