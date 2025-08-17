import { LightningAddress } from '@getalby/lightning-tools';

/**
 * Invoice generation options
 */
export interface InvoiceGenerationOptions {
  amount: number; // Amount in satoshis
  description?: string;
  expiry?: number; // Expiry in seconds (default: 3600 = 1 hour)
}

/**
 * Lightning invoice generation service using Lightning Address
 */
export class LightningInvoiceService {
  private lightningAddress?: string;

  constructor() {
    this.lightningAddress = process.env.LIGHTNING_ADDRESS;
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
   * Check if Lightning service is properly configured
   */
  isConfigured(): boolean {
    return !!this.lightningAddress;
  }

  /**
   * Get configuration status for debugging
   */
  getConfigStatus(): { lightningAddress: boolean } {
    return {
      lightningAddress: !!this.lightningAddress
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

