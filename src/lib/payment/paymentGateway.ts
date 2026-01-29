/**
 * Payment gateway integration for góp vốn / ESG investment.
 * Stub: returns null (no redirect); replace with VNPay/Momo/Stripe when ready.
 * Env: payment URL and keys should be server-side (Edge Function / backend); client only redirects to URL.
 */

export interface CreatePaymentParams {
  amount: number;
  orderId: string;
  userId: string;
  opportunityId: string;
  returnUrl: string;
  cancelUrl: string;
  description?: string;
}

export interface CreatePaymentResult {
  /** When set, client should redirect user to this URL to complete payment. */
  redirectUrl: string | null;
  transactionId: string | null;
  error?: string;
}

/**
 * Create payment and return redirect URL for gateway, or null for stub/sync success.
 * Real implementation would call backend/Edge Function to create order and return gateway URL.
 */
export async function createPaymentUrl(params: CreatePaymentParams): Promise<CreatePaymentResult> {
  // Stub: no redirect; flow continues as sync success. Replace with real API call.
  if (import.meta.env.VITE_PAYMENT_GATEWAY_URL) {
    // TODO: call backend/Edge Function to create payment, return redirectUrl
    // const res = await fetch(...); return { redirectUrl: res.url, transactionId: res.id };
  }
  return { redirectUrl: null, transactionId: `tx-${Date.now()}` };
}
