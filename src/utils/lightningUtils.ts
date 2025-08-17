import { LightningAddress } from '@getalby/lightning-tools';
import { webln } from '@getalby/sdk';

/**
 * Invoice generation options
 */
export interface InvoiceGenerationOptions {
  amount: number; // Amount in satoshis
  description?: string;
  expiry?: number; // Expiry in seconds (default: 3600 = 1 hour)
}

/**
 * Payment result interface
 */
export interface PaymentResult {
  success: boolean;
  paymentHash?: string;
  error?: string;
  preimage?: string;
}

/**
 * Lightning payment options
 */
export interface PaymentOptions {
  lightningAddress: string;
  amount: number; // Amount in satoshis
  comment?: string;
}

/**
 * Lightning invoice generation and payment service
 */
export class LightningInvoiceService {
  private lightningAddress?: string;
  private nwcUrl?: string;

  constructor() {
    this.lightningAddress = process.env.LIGHTNING_ADDRESS;
    this.nwcUrl = process.env.NWC_URL; // Nostr Wallet Connect URL for payments
  }

  /**
   * Generate a Lightning invoice using Lightning Address
   */
  async generateInvoice(options: InvoiceGenerationOptions) {
    if (!this.lightningAddress) {
      throw new Error('LIGHTNING_ADDRESS environment variable is required');
    }

    try {
      const ln = new LightningAddress(this.lightningAddress);
      await ln.fetch();

      return await ln.requestInvoice({
        satoshi: options.amount,
        comment: options.description || `Nostr Bot Payment - ${options.amount} sats`
      });
    } catch (error) {
      console.error('❌ Error generating Lightning Address invoice:', error);
      throw new Error(`Failed to generate invoice: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Pay to a Lightning Address using Alby SDK
   */
  async payToLightningAddress(options: PaymentOptions): Promise<PaymentResult> {
    if (!this.nwcUrl) {
      throw new Error('NWC_URL environment variable is required for payments');
    }

    try {
      console.log(`💸 Attempting to pay ${options.amount} sats to ${options.lightningAddress}`);

      // Initialize WebLN with NWC
      const nwc = new webln.NostrWebLNProvider({
        nostrWalletConnectUrl: this.nwcUrl
      });

      await nwc.enable();

      // First, get invoice from the Lightning Address
      const ln = new LightningAddress(options.lightningAddress);
      await ln.fetch();

      const invoice = await ln.requestInvoice({
        satoshi: options.amount,
        comment: options.comment || `Nostr Bot Roulette Winnings - ${options.amount} sats`
      });

      if (!invoice || !invoice.paymentRequest) {
        throw new Error('Failed to get payment request from Lightning Address');
      }

      console.log(`📄 Generated invoice for payment: ${invoice.paymentRequest.substring(0, 50)}...`);

      // Pay the invoice
      const paymentResponse = await nwc.sendPayment(invoice.paymentRequest);

      console.log(`🔍 Payment response:`, JSON.stringify(paymentResponse, null, 2));

      if (paymentResponse.preimage) {
        console.log(`✅ Payment successful! Preimage: ${paymentResponse.preimage}`);
        
        // Extract payment hash - it might be in different locations depending on the response structure
        const paymentHash = paymentResponse.paymentHash || 
                           paymentResponse.payment_hash || 
                           paymentResponse.data?.paymentHash ||
                           paymentResponse.data?.payment_hash;

        return {
          success: true,
          paymentHash: paymentHash,
          preimage: paymentResponse.preimage
        };
      } else {
        throw new Error('Payment failed - no preimage received');
      }

    } catch (error) {
      console.error('❌ Error paying to Lightning Address:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown payment error'
      };
    }
  }

  /**
   * Check if Lightning service is properly configured
   */
  isConfigured(): boolean {
    return !!this.lightningAddress;
  }

  /**
   * Check if payment service is properly configured
   */
  isPaymentConfigured(): boolean {
    return !!this.nwcUrl;
  }

  /**
   * Get configuration status for debugging
   */
  getConfigStatus(): { lightningAddress: boolean; nwcUrl: boolean } {
    return {
      lightningAddress: !!this.lightningAddress,
      nwcUrl: !!this.nwcUrl
    };
  }
}

/**
 * Utility function to create a Lightning invoice
 */
export async function createLightningInvoice(
  amount: number, 
  description?: string, 
  expiry?: number
) {
  const service = new LightningInvoiceService();
  return service.generateInvoice({ amount, description, expiry });
}

/**
 * Utility function to pay winnings to a Lightning Address
 */
export async function payWinnings(
  lightningAddress: string,
  amount: number,
  comment?: string
): Promise<PaymentResult> {
  const service = new LightningInvoiceService();
  return service.payToLightningAddress({
    lightningAddress,
    amount,
    comment
  });
}

/**
 * Utility function to format invoice for display
 */
export function formatInvoiceForDisplay(invoice: any, amount: number, description?: string): string {
  const lines = [
    `⚡ Lightning Invoice Generated`,
    `💰 Amount: ${amount} sats`,
    `📝 Description: ${description || 'Nostr Bot Payment'}`,
    `🔗 Invoice: ${invoice.paymentRequest}`
  ];

  return lines.join('\n');
}
