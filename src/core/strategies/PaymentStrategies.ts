/**
 * Payment Strategies
 * SOLID:
 * - Open/Closed: New payment gateways (Stripe, Razorpay, Escrow, Wire) can be added cleanly
 * - Liskov Substitution: All strategies conform to IPaymentStrategy and return standardized CheckoutResult
 */

import { CheckoutOrderPayload, CheckoutResult, IPaymentStrategy } from '../contracts/checkout';
import { apiRequest } from '../../lib/apiClient';

/** Standard online checkout using the secure server-side proxy */
export class ApiGatewayPaymentStrategy implements IPaymentStrategy {
  readonly paymentMethodId = 'api_gateway';
  readonly label = 'Instant Digital Clearance (Cards & Apple Pay)';

  async processPayment(order: CheckoutOrderPayload): Promise<CheckoutResult> {
    try {
      const response = await apiRequest('/api/shop/checkout', {
        method: 'POST',
        timeoutMs: 12000,
        retries: 1,
        body: JSON.stringify({
          itemId: order.itemId,
          email: order.customer.email.trim().toLowerCase(),
          fullName: order.customer.fullName.trim(),
          organization: order.customer.organization?.trim() || '',
          idempotencyKey: order.idempotencyKey,
          currency: order.currency,
          amount: order.amount
        })
      });

      return {
        success: true,
        orderId: response.orderId || order.idempotencyKey,
        licenseToken: response.licenseToken || 'AUTH-LICENSED',
        vaultLink: response.vaultLink || `https://notion.so/tulc-vault/${order.itemId}-auth`,
        isDuplicatePrevented: !!response.isDuplicatePrevented
      };
    } catch (err: any) {
      console.error('[ApiGatewayPaymentStrategy] Checkout failed:', err);
      return {
        success: false,
        errorMessage: err.message || 'Payment processing encountered an unexpected delay. Please retry.'
      };
    }
  }
}

/** Institutional Direct Invoice Strategy for enterprise accounts */
export class DirectCorporateInvoiceStrategy implements IPaymentStrategy {
  readonly paymentMethodId = 'corporate_invoice';
  readonly label = 'Corporate Procurement / Wire Invoice';

  async processPayment(order: CheckoutOrderPayload): Promise<CheckoutResult> {
    try {
      const response = await apiRequest('/api/leads/submit', {
        method: 'POST',
        timeoutMs: 10000,
        body: JSON.stringify({
          name: order.customer.fullName,
          email: order.customer.email,
          organization: order.customer.organization || 'Corporate Account',
          message: `Corporate Procurement Order: ${order.itemTitle} (${order.currency} ${order.amount})`,
          context: 'corporate_order_invoice',
          itemId: order.itemId,
          amount: order.amount,
          currency: order.currency
        })
      });

      return {
        success: true,
        orderId: `INV-${Date.now().toString().slice(-6)}`,
        licenseToken: 'PENDING-WIRE',
        vaultLink: `https://theunboundedleadership.com/intake?invoice=${order.idempotencyKey}`,
        requiresRedirect: false
      };
    } catch (err: any) {
      return {
        success: false,
        errorMessage: err.message || 'Invoice requisition failed.'
      };
    }
  }
}
