/**
 * Checkout Processor Implementation
 * SOLID:
 * - Single Responsibility: Coordinates validation and delegates payment execution
 * - Open/Closed: Strategies can be registered dynamically
 * - Dependency Inversion: Operates purely against IPaymentStrategy contracts
 */

import { CheckoutOrderPayload, CheckoutResult, ICheckoutProcessor, IPaymentStrategy } from '../contracts/checkout';
import { ApiGatewayPaymentStrategy, DirectCorporateInvoiceStrategy } from '../strategies/PaymentStrategies';

export class CheckoutProcessor implements ICheckoutProcessor {
  private strategies = new Map<string, IPaymentStrategy>();
  private defaultStrategyId = 'api_gateway';

  constructor() {
    this.registerStrategy(new ApiGatewayPaymentStrategy());
    this.registerStrategy(new DirectCorporateInvoiceStrategy());
  }

  registerStrategy(strategy: IPaymentStrategy): void {
    this.strategies.set(strategy.paymentMethodId, strategy);
  }

  getStrategy(methodId: string): IPaymentStrategy | undefined {
    return this.strategies.get(methodId);
  }

  async executeCheckout(order: CheckoutOrderPayload, paymentMethodId?: string): Promise<CheckoutResult> {
    // 1. Validation
    if (!order.customer.email || !order.customer.email.includes('@')) {
      return {
        success: false,
        errorMessage: 'A valid email address is required to dispatch digital license keys.'
      };
    }

    if (!order.customer.fullName || order.customer.fullName.trim().length < 2) {
      return {
        success: false,
        errorMessage: 'Full name is required for institutional licensing.'
      };
    }

    if (!order.itemId || order.amount <= 0) {
      return {
        success: false,
        errorMessage: 'Invalid order item or amount.'
      };
    }

    // 2. Select strategy
    const targetId = paymentMethodId || this.defaultStrategyId;
    const strategy = this.strategies.get(targetId) || this.strategies.get(this.defaultStrategyId);

    if (!strategy) {
      return {
        success: false,
        errorMessage: `Payment strategy "${targetId}" is not available.`
      };
    }

    // 3. Execute
    return strategy.processPayment(order);
  }
}
