#!/usr/bin/env tsx
/**
 * Test script for Lightning invoice generation
 * Run with: npm run dev -- src/test-lightning.ts
 */

import { createLightningInvoice, LightningInvoiceService, formatInvoiceForDisplay } from './utils/lightningUtils.js';

async function testLightningInvoice() {
  console.log('🧪 Testing Lightning Invoice Generation...\n');

  // Test configuration status
  const service = new LightningInvoiceService();
  const configStatus = service.getConfigStatus();
  
  console.log('📋 Configuration Status:');
  console.log(`  Lightning Address: ${configStatus.lightningAddress ? '✅ Configured' : '❌ Not configured'}`);
  console.log(`  Service Ready: ${service.isConfigured() ? '✅ Ready' : '❌ Not ready'}\n`);

  if (!service.isConfigured()) {
    console.log('⚠️  No Lightning backend configured.');
    console.log('Please set LIGHTNING_ADDRESS in your .env file.\n');
    console.log('Example Lightning Address setup:');
    console.log('LIGHTNING_ADDRESS=your-address@getalby.com\n');
    return;
  }

  try {
    // Test invoice generation
    console.log('🔄 Generating test invoice for 1000 sats...');
    
    const invoice = await createLightningInvoice(
      1000, 
      'Test Nostr Bot Roulette Bet - 1000 sats'
    );

    console.log('✅ Invoice generated successfully!\n');
    console.log(formatInvoiceForDisplay(invoice, 1000, 'Test Nostr Bot Roulette Bet - 1000 sats'));
    console.log('\n📋 Raw Invoice Data:');
    console.log(`Payment Hash: ${invoice.paymentHash}`);
    console.log(`Payment Request: ${invoice.paymentRequest}`);
    console.log(`Verify URL: ${invoice.verify}`);
    console.log(`Success Action: ${JSON.stringify(invoice.successAction, null, 2)}`);

  } catch (error) {
    console.error('❌ Error generating invoice:', error);
    
    if (error instanceof Error) {
      console.error('Error details:', error.message);
    }
  }
}

// Run the test
testLightningInvoice().catch(console.error);
