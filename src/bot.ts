import 'websocket-polyfill';
import { SimplePool, getPublicKey, finalizeEvent, generateSecretKey, nip19, type Filter } from 'nostr-tools';
import BlockPollService, { NewBlockCallback } from './utils/blockPoll.js';
import { parseRouletteBet } from './utils/ruletaUtils.js';
import { createLightningInvoice, formatInvoiceForDisplay } from './utils/lightningUtils.js';
import { paymentMonitor } from './monitors/PaymentMonitor.js';
import { RouletteBetRepository } from './database/rouletteBetRepository.js';
import type { 
  NostrEvent, 
  UnsignedEvent,
  RouletteBetParseResult,
  BlockData
} from './types.js';

// Configuration
const RELAYS: string[] = [
  'ws://localhost:8080'
];

class NostrBot {
  private pool: SimplePool;
  private botSecretKey: Uint8Array;
  private botPublicKey: string;
  private botNpub: string;
  private repliedToEvents: Set<string>;
  private blockService: BlockPollService;
  private betRepository: RouletteBetRepository;

  constructor() {
    this.pool = new SimplePool();
    this.botSecretKey = this.getSecretKey();
    this.botPublicKey = getPublicKey(this.botSecretKey);
    this.botNpub = nip19.npubEncode(this.botPublicKey);
    this.repliedToEvents = new Set<string>();
    this.blockService = new BlockPollService();
    this.betRepository = new RouletteBetRepository();

    this.blockService.registerCallback(this.newBlockCallback)
    
    console.log(`🤖 Bot initialized with npub: ${this.botNpub}`);
  }

  /**
   * Called every time block poll service finds a new block.
   * Handles processing bets that have been placed for the current block.
   * Must be arrow function to preserve `this` binding.
   * @param blockData 
   * @returns 
   */
  private newBlockCallback = async (blockData: BlockData) => {
    const { blockHeight, blockHash } = blockData;
    if (!blockHeight) {
      throw Error("No block height")
    }
    
    const bets = await this.betRepository.findByBlockHeight(blockHeight);
    
    console.log(`Found ${bets.length} bets for block ${blockHeight}:`)
    for (const bet of bets) {
      console.log(JSON.stringify(bet))
      console.log("\n")
    }
    return;
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

  async publishReply(originalEvent: NostrEvent, replyContent: string): Promise<NostrEvent> {
    try {
      const replyEvent: UnsignedEvent = {
        kind: 1,
        created_at: Math.floor(Date.now() / 1000),
        tags: [
          ['e', originalEvent.id, '', 'reply'],
          ['p', originalEvent.pubkey]
        ],
        content: replyContent,
        pubkey: this.botPublicKey,
      };

      const signedEvent = finalizeEvent(replyEvent, this.botSecretKey);
      
      const publishPromises = this.pool.publish(RELAYS, signedEvent);
      const results = await Promise.allSettled(publishPromises);
      
      const successful = results.filter(r => r.status === 'fulfilled').length;
      console.log(`📤 Reply published to ${successful}/${RELAYS.length} relays`);
      
      return signedEvent;
    } catch (error) {
      console.error('❌ Error publishing reply:', error);
      throw error;
    }
  }

  async handleMention(event: NostrEvent): Promise<void> {
    // Avoid replying to our own events or events we've already replied to
    if (event.pubkey === this.botPublicKey || this.repliedToEvents.has(event.id)) {
      return;
    }

    // Handle initial bet, e.g. "@NostrBot red 100"
    // Anything else will return null and be ignored
    const placedBet = await parseRouletteBet(
      event.content, 
      this.botNpub, 
      event.pubkey, 
      event.id
    );

    if (placedBet) {
      let replyContent: string = "";
      try {
        // Generate Lightning invoice for the bet amount
        const invoice = await this.generateInvoiceForBet(placedBet.amountInSats, placedBet.id);
        
        // TODO: Store invoice details in database
        // Update bet with payment hash and payment request
        
        replyContent = `Bet initiated: ${placedBet.bet.toUpperCase()} for ${placedBet.amountInSats} sats.`
          + `\nBet ${placedBet.id} created.`
          + `\n\n${formatInvoiceForDisplay(invoice, placedBet.amountInSats, `Nostr Bot Roulette Bet ${placedBet.id} - ${placedBet.amountInSats} sats`)}`
          + "\n\nOnce invoice is paid, your Ruleta spin will use the hash of current block +2 as seed.";
        
        await this.publishReply(event, replyContent);
        
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
        
        // Mark as replied to avoid duplicates
        this.repliedToEvents.add(event.id);
        
        // Limit Set size to prevent memory growth
        if (this.repliedToEvents.size > 1000) {
          const firstItem = this.repliedToEvents.values().next().value;
          if (firstItem) this.repliedToEvents.delete(firstItem);
        }      
      } catch (error) {
        console.error('❌ Failed to reply to mention:', error);
        
        // Send error message to user
        try {
          const errorReply = `❌ Error processing bet: ${error instanceof Error ? error.message : 'Unknown error'}`;
          await this.publishReply(event, errorReply);
          this.repliedToEvents.add(event.id);
        } catch (replyError) {
          console.error('❌ Failed to send error reply:', replyError);
        }
      }
    }
  }

  async handlePaymentReceived(betId: string, paymentHash: string, originalEvent: NostrEvent): Promise<void> {
    try {
      console.log(`💰 Payment received for bet ${betId} with hash ${paymentHash}`);

      const { blockHeight } = this.blockService.getBlockData()
      if (!blockHeight) {
        throw Error("Unable to retrieve block height")
      }

      // Update bet status to PLACED and save blockHeight + 2 for the spin
      const targetBlockHeight = blockHeight + 2;
      const updatedBet = await this.betRepository.update(betId, {
        status: 'PLACED' as any,
        blockHeight: targetBlockHeight
      });

      if (!updatedBet) {
        throw new Error(`Failed to update bet ${betId} in database`);
      }

      console.log(`✅ Bet ${betId} marked as PLACED with target block ${targetBlockHeight}`);
      
      const replyContent = `⚡ Payment confirmed for bet ${betId}!\n\n`
        + `Your roulette spin will be processed using the hash of block ${targetBlockHeight} as the seed.\n`
        + `Waiting for block confirmation...`;
      
      await this.publishReply(originalEvent, replyContent);
      
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
      
      await this.publishReply(originalEvent, replyContent);
      
    } catch (error) {
      console.error(`❌ Error handling payment expiry for bet ${betId}:`, error);
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
