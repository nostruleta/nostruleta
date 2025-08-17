import 'websocket-polyfill';
import { SimplePool, getPublicKey, finalizeEvent, nip19, type Filter } from 'nostr-tools';
import { parseRouletteBet, calculateWinnings, ROULETTE_COLOR } from './utils/ruletaUtils.js';
import { createLightningInvoice, payWinnings } from './utils/lightningUtils.js';
import { paymentMonitor } from './monitors/PaymentMonitor.js';
import { RouletteBetRepository } from './database/rouletteBetRepository.js';
import type { 
  NostrEvent, 
  UnsignedEvent,
  BlockData
} from './types.js';
import { RouletteBet } from './generated/client';
import crypto from "crypto";


// Configuration
const RELAYS: string[] = process.env.NOSTR_RELAYS?.split(',') || []

function getColorEmoji(color: ROULETTE_COLOR) {
  return color === 'black' ? '⚫' : color === 'red' ? '🔴' : '🟢';
}

class NostrBot {
  private pool: SimplePool;
  private botSecretKey: Uint8Array;
  private botPublicKey: string;
  private botNpub: string;
  private repliedToEvents: Set<string>;
  private betRepository: RouletteBetRepository;

  constructor() {
    this.pool = new SimplePool();
    this.botSecretKey = this.getSecretKey();
    this.botPublicKey = getPublicKey(this.botSecretKey);
    this.botNpub = nip19.npubEncode(this.botPublicKey);
    this.repliedToEvents = new Set<string>();
    this.betRepository = new RouletteBetRepository();    
    console.log(`🤖 Bot initialized with npub: ${this.botNpub}`);
  }

  private getSecretKey(): Uint8Array {
    const nsec = process.env.NOSTR_BOT_NSEC;
    if (!nsec) {
      throw new Error('NOSTR_BOT_NSEC environment variable is required');
    }
    
    try {
      const decoded = nip19.decode(nsec);
      return decoded.data as Uint8Array;
    } catch (error) {
      throw new Error('Invalid NOSTR_BOT_NSEC format');
    }
  }

  async generateInvoiceForBet(amount: number, betId: string) {
    const description = `Nostr Bot Roulette Bet ${betId} - ${amount} sats`;
    return await createLightningInvoice(amount, description, 3600); // 1 hour expiry
  }

  async publishReply(originalEventId: string, originalEventPubkey: string, replyContent: string): Promise<NostrEvent> {
    try {
      const replyEvent: UnsignedEvent = {
        kind: 1,
        created_at: Math.floor(Date.now() / 1000),
        tags: [
          ['e', originalEventId, '', 'reply'],
          ['p', originalEventPubkey]
        ],
        content: replyContent,
        pubkey: this.botPublicKey,
      };

      const signedEvent = finalizeEvent(replyEvent, this.botSecretKey);
      
      const publishPromises = this.pool.publish(RELAYS, signedEvent);
      const results = await Promise.allSettled(publishPromises);
      
      const successful = results.filter(r => r.status === 'fulfilled').length;
      console.log(`📤 Reply published to ${successful}/${RELAYS.length} relays`);

      // Mark as replied to avoid duplicates
      this.repliedToEvents.add(originalEventId);
      // Limit Set size to prevent memory growth
      if (this.repliedToEvents.size > 1000) {
        const firstItem = this.repliedToEvents.values().next().value;
        if (firstItem) this.repliedToEvents.delete(firstItem);
      }
      
      return signedEvent;
    } catch (error) {
      console.error('❌ Error publishing reply:', error);
      throw error;
    }
  }

  /**
   * Get a player's Lightning address from their Nostr profile metadata
   * @param npub - The player's pubkey (hex, not npub)
   * @returns Promise<string | null> - Lightning address if found, null otherwise
   */
  async getPlayerLightningAddress(pubkey: string): Promise<string | null> {
    try {
      // Query for the user's profile metadata (kind 0 event)
      const filter: Filter = {
        kinds: [0], // Profile metadata
        authors: [pubkey],
        limit: 1
      };

      // Get the most recent profile event
      const events = await this.pool.querySync(RELAYS, filter);
      
      if (events.length === 0) {
        console.log(`No profile found for pubkey: ${pubkey}`);
        return null;
      }

      // Sort by created_at to get the most recent profile
      const latestProfile = events.sort((a, b) => b.created_at - a.created_at)[0];
      
      // Parse the profile metadata JSON
      let profileData: any;
      try {
        profileData = JSON.parse(latestProfile.content);
      } catch (parseError) {
        console.error('Failed to parse profile metadata JSON:', parseError);
        return null;
      }

      // Look for Lightning address in common fields
      // Check standard fields: lud16 (Lightning Address), lud06 (LNURL-pay)
      const lightningAddress = profileData.lud16 || 
                              profileData.lightning || 
                              profileData.lightningAddress ||
                              profileData.lnaddress;

      if (lightningAddress && typeof lightningAddress === 'string') {
        // Validate Lightning address format (should be email-like: user@domain.com)
        const lightningAddressRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (lightningAddressRegex.test(lightningAddress)) {
          console.log(`Found Lightning address for ${pubkey}: ${lightningAddress}`);
          return lightningAddress;
        } else {
          console.log(`Invalid Lightning address format for ${pubkey}: ${lightningAddress}`);
        }
      }

      // Also check for LNURL-pay in lud06 field
      const lnurlPay = profileData.lud06;
      if (lnurlPay && typeof lnurlPay === 'string') {
        console.log(`Found LNURL-pay for ${pubkey}: ${lnurlPay}`);
        return lnurlPay;
      }

      console.log(`No Lightning address found in profile for npub: ${pubkey}`);
      return null;

    } catch (error) {
      console.error(`Error fetching Lightning address for ${pubkey}:`, error);
      return null;
    }
  }

  async handleMention(event: NostrEvent): Promise<void> {
    // Avoid replying to our own events or events we've already replied to
    if (event.pubkey === this.botPublicKey || this.repliedToEvents.has(event.id)) {
      return;
    }

    const playerLightningAddress = await this.getPlayerLightningAddress(event.pubkey);
    if (!playerLightningAddress) {
      await this.publishReply(event.id, event.pubkey, "❌ You must have a lightning address in your Nostr profile to play!");
      return;
    }

    // Handle initial bet, e.g. "@NostrBot red 100"
    // Anything else will return null and be ignored
    const placedBet = await parseRouletteBet(
      event.content, 
      this.botNpub, 
      event.pubkey, 
      event.id,
      playerLightningAddress
    );

    if (placedBet) {
      const commitmentHash = crypto.createHash('sha256').update(placedBet.secret).digest('hex');
      
      let replyContent: string = "";
      try {
        // Generate Lightning invoice for the bet amount
        const invoice = await this.generateInvoiceForBet(placedBet.amountInSats, placedBet.id);

        const betStr = placedBet.betType === 'COLOR' ? getColorEmoji(placedBet.bet as ROULETTE_COLOR) : placedBet.bet;
        
        replyContent = `NostRuleta bet initiated: ${placedBet.amountInSats} sats on ${betStr}!`
          + `\n\n${invoice.paymentRequest}`
          + "\nOnce the invoice is paid, your spin will be revealed."
          + `\nBet ID: ${placedBet.id}`
          + `\nCommitment hash: ${commitmentHash}`;
        
        await this.publishReply(event.id, event.pubkey, replyContent);
        
        // Start monitoring payment for this invoice
        paymentMonitor.monitorInvoicePayment(
          invoice,
          async (paymentHash: string) => {
            await this.handlePaymentReceived(placedBet.id, paymentHash, event);
          },
          async (paymentHash: string) => {
            await this.handlePaymentExpired(placedBet.id, paymentHash, event);
          }
        );
        
      } catch (error) {
        console.error('❌ Failed to reply to mention:', error);
        
        // Send error message to user
        try {
          const errorReply = `❌ Error processing bet: ${error instanceof Error ? error.message : 'Unknown error'}`;
          await this.publishReply(event.id, event.pubkey, errorReply);
        } catch (replyError) {
          console.error('❌ Failed to send error reply:', replyError);
        }
      }
    }
  }

  async handlePaymentReceived(betId: string, paymentHash: string, originalEvent: NostrEvent): Promise<void> {
    try {
      console.log(`💰 Payment received for bet ${betId} with hash ${paymentHash}`);

      const bet = await this.betRepository.findById(betId);
      if (bet) {
        const { winnings, rouletteNumber, color } = calculateWinnings(bet)
        if (winnings > 0) {
          // Attempt to pay winnings to user's Lightning address
          await this.payWinningsToUser(bet, winnings, rouletteNumber, color);
        } else {

          const lossMessage = `Better luck next time!\n\n`
          + `🎲 Result: ${rouletteNumber} ${getColorEmoji(color)}\n`
          + `🧩 Committed secret: ${bet.secret}`;

          await this.publishReply(
            bet.eventId,
            bet.userNpub,
            lossMessage
          );
          await this.betRepository.update(bet.id, {
            status: 'LOST',
          })
        }
      }

      console.log(`✅ Bet ${betId} marked as PLACED`);
      
    } catch (error) {
      console.error(`❌ Error handling payment received for bet ${betId}:`, error);
    }
  }

  async handlePaymentExpired(betId: string, paymentHash: string, originalEvent: NostrEvent): Promise<void> {
    try {
      console.log(`⏰ Payment expired for bet ${betId} with hash ${paymentHash}`);
      
      // TODO: Update database - mark bet as expired
      
      const replyContent = `⏰ Payment expired for bet ${betId}.\n\n`
        + `The Lightning invoice has expired. Please create a new bet if you'd like to play.`;
      
      await this.publishReply(originalEvent.id, originalEvent.pubkey, replyContent);
      
    } catch (error) {
      console.error(`❌ Error handling payment expiry for bet ${betId}:`, error);
    }
  }

  /**
   * Pay winnings to user's Lightning address
   */
  async payWinningsToUser(bet: RouletteBet, winnings: number, rouletteNumber: string, color: ROULETTE_COLOR): Promise<void> {
    try {
      console.log(`💰 Processing winnings payment: ${winnings} sats to ${bet.playerLightningAddress}`);

      // Attempt to pay winnings via Lightning
      const paymentResult = await payWinnings(
        bet.playerLightningAddress, 
        winnings, 
        `NostRuleta Winnings - Bet ${bet.id} - ${winnings} sats`
      );

      if (paymentResult.success) {
        // Payment successful
        const successMessage = `🎉 Congratulations! You won ${winnings} sats!\n\n`
          + `🎲 Result: ${rouletteNumber} ${getColorEmoji(color)}\n`
          + `⚡ Payment sent to: ${bet.playerLightningAddress}\n`
          + `🧩 Committed secret: ${bet.secret}`;

        await this.publishReply(bet.eventId, bet.userNpub, successMessage);
        
        // Update bet status to WON with payment details
        await this.betRepository.update(bet.id, {
          status: 'WON_AND_PAID' as any,
          paymentHash: paymentResult.paymentHash
        });

        console.log(`✅ Successfully paid ${winnings} sats to ${bet.playerLightningAddress} for bet ${bet.id}`);

      } else {
        // Payment failed - inform user and update status
        const errorMessage = `🎉 You won ${winnings} sats! The roulette number was ${rouletteNumber} and the color was ${color}.\n\n`
          + `❌ However, there was an issue sending your Lightning payment:\n${paymentResult.error}\n\n`
          + `Please contact support with bet ID: ${bet.id}`;

        await this.publishReply(bet.eventId, bet.userNpub, errorMessage);
        
        // Update bet status to indicate payment failed
        await this.betRepository.update(bet.id, {
          status: 'WON_PAYMENT_FAILED' as any
        });

        console.error(`❌ Failed to pay ${winnings} sats to ${bet.playerLightningAddress} for bet ${bet.id}: ${paymentResult.error}`);
      }

    } catch (error) {
      console.error(`❌ Error processing winnings payment for bet ${bet.id}:`, error);
      
      // Send fallback message to user
      try {
        const fallbackMessage = `🎉 You won ${winnings} sats! The roulette number was ${rouletteNumber} and the color was ${color}.\n\n`
          + `❌ There was a technical issue processing your Lightning payment. Please contact support with bet ID: ${bet.id}`;
        
        await this.publishReply(bet.eventId, bet.userNpub, fallbackMessage);
        
        await this.betRepository.update(bet.id, {
          status: 'WON_PAYMENT_ERROR' as any
        });
        
      } catch (replyError) {
        console.error(`❌ Failed to send fallback message for bet ${bet.id}:`, replyError);
      }
    }
  }

  async start(): Promise<void> {
    console.log('🚀 Starting Nostr bot...');
    console.log(`👀 Watching for mentions of: ${this.botNpub}`);
    
    // Subscribe to mentions of our bot
    const filters: Filter[] = [
      {
        kinds: [1], // Text notes
        '#p': [this.botPublicKey], // Mentions of our public key
        since: Math.floor(Date.now() / 1000) - 60 // Only new events from last minute
      }
    ];

    const options = {
      onevent: (event: NostrEvent) => {
        this.handleMention(event);
      },
      oneose: () => {
        console.log('📡 Subscription established to all relays');
      }
    };

    const subscription = this.pool.subscribeMany(RELAYS, filters, options);

    // Handle graceful shutdown
    process.on('SIGINT', () => {
      console.log('\n🛑 Shutting down bot...');
      
      // Stop all payment monitoring
      paymentMonitor.stopAllMonitoring();
      
      subscription.close();
      this.pool.close(RELAYS);
      process.exit(0);
    });

    console.log('✅ Bot is running! Press Ctrl+C to stop.');
  }
}

// Start the bot
const bot = new NostrBot();
bot.start().catch(console.error);
