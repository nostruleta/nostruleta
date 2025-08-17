import type { LightningInvoice } from '../types.js';

/**
 * Payment status monitoring service
 */
export class PaymentMonitor {
  private activeMonitors: Map<string, NodeJS.Timeout> = new Map();

  /**
   * Monitor an invoice for payment
   */
  async monitorInvoicePayment(
    invoice: any,
    onPaid: (paymentHash: string) => Promise<void>,
    onExpired?: (paymentHash: string) => Promise<void>,
    pollIntervalMs: number = 5000,
    timeoutMs: number = 3600000 // 1 hour default
  ): Promise<void> {
    const paymentHash = invoice.paymentHash;
    
    if (this.activeMonitors.has(paymentHash)) {
      console.log(`⚠️ Already monitoring payment for ${paymentHash}`);
      return;
    }

    console.log(`🔍 Starting payment monitor for ${paymentHash}`);

    const startTime = Date.now();
    
    const checkPayment = async () => {
      try {
        const isPaid = await this.checkInvoiceStatus(invoice);
        
        if (isPaid) {
          console.log(`✅ Payment confirmed for ${paymentHash}`);
          this.stopMonitoring(paymentHash);
          await onPaid(paymentHash);
          return;
        }

        // Check if expired
        if (Date.now() - startTime > timeoutMs) {
          console.log(`⏰ Payment monitoring expired for ${paymentHash}`);
          this.stopMonitoring(paymentHash);
          if (onExpired) {
            await onExpired(paymentHash);
          }
          return;
        }

        // Schedule next check
        const timeoutId = setTimeout(checkPayment, pollIntervalMs);
        this.activeMonitors.set(paymentHash, timeoutId);

      } catch (error) {
        console.error(`❌ Error checking payment status for ${paymentHash}:`, error);
        // Continue monitoring despite errors
        const timeoutId = setTimeout(checkPayment, pollIntervalMs);
        this.activeMonitors.set(paymentHash, timeoutId);
      }
    };

    // Start monitoring
    const timeoutId = setTimeout(checkPayment, pollIntervalMs);
    this.activeMonitors.set(paymentHash, timeoutId);
  }

  /**
   * Check if an invoice has been paid using the verify URL
   */
  async checkInvoiceStatus(invoice: any): Promise<boolean> {
    if (!invoice.verify) {
      throw new Error('Invoice does not have a verify URL');
    }

    try {
      const response = await fetch(invoice.verify);
      
      if (!response.ok) {
        throw new Error(`Verify request failed: ${response.status}`);
      }

      const data = await response.json();
      
      // Different providers may have different response formats
      // Common patterns: { settled: true }, { paid: true }, { status: "settled" }
      return data.settled === true || 
             data.paid === true || 
             data.status === 'settled' || 
             data.status === 'paid';
             
    } catch (error) {
      console.error('Error verifying payment:', error);
      return false;
    }
  }

  /**
   * Stop monitoring a specific payment
   */
  stopMonitoring(paymentHash: string): void {
    const timeoutId = this.activeMonitors.get(paymentHash);
    if (timeoutId) {
      clearTimeout(timeoutId);
      this.activeMonitors.delete(paymentHash);
      console.log(`🛑 Stopped monitoring payment for ${paymentHash}`);
    }
  }

  /**
   * Stop all active monitors (cleanup)
   */
  stopAllMonitoring(): void {
    for (const [paymentHash, timeoutId] of this.activeMonitors) {
      clearTimeout(timeoutId);
      console.log(`🛑 Stopped monitoring payment for ${paymentHash}`);
    }
    this.activeMonitors.clear();
  }

  /**
   * Get list of currently monitored payments
   */
  getActiveMonitors(): string[] {
    return Array.from(this.activeMonitors.keys());
  }
}

/**
 * Global payment monitor instance
 */
export const paymentMonitor = new PaymentMonitor();
