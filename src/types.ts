/**
 * TypeScript interfaces and types for the Nostr bot
 */

// Nostr event interfaces
export interface NostrEvent {
  id: string;
  pubkey: string;
  created_at: number;
  kind: number;
  tags: string[][];
  content: string;
  sig?: string;
}

export interface UnsignedEvent {
  kind: number;
  created_at: number;
  tags: string[][];
  content: string;
  pubkey: string;
}

// Bitcoin RPC interfaces
export interface RpcRequest {
  jsonrpc: string;
  id: string;
  method: string;
  params: any[];
}

export interface RpcResponse<T = any> {
  result: T;
  error?: {
    code: number;
    message: string;
  };
  id: string;
}

export interface BlockData {
  blockHeight: number | null;
  blockHash: string | null;
}

export interface CreateRouletteBetInput {
  betType: 'color' | 'number';
  bet: string;
  amountInSats: number;
  userNpub: string;
  eventId: string;
}

export interface UpdateRouletteBetInput {
  status?: 'init' | 'placed' | 'lost' | 'won' | 'wonAndPaid';
  blockHeight?: number;
}

export interface RouletteBetParseResult {
  success?: boolean;
  error?: string;
  betType?: 'color' | 'number';
  bet?: string;
  amount?: number;
}

export interface RouletteSpinResult {
  number: string; // 0-36, 00 as string
  color: 'red' | 'black' | 'green';
}

// Nostr subscription interfaces
export interface SubscriptionFilter {
  kinds?: number[];
  '#p'?: string[];
  since?: number;
  until?: number;
  limit?: number;
}

export interface SubscriptionOptions {
  onevent?: (event: NostrEvent) => void;
  oneose?: () => void;
  onclose?: (reason: string) => void;
}

// Lightning invoice interfaces
export interface LightningInvoice {
  paymentRequest: string;
  paymentHash: string;
  verify?: string;
}

export interface InvoiceGenerationOptions {
  amount: number; // Amount in satoshis
  description?: string;
  expiry?: number; // Expiry in seconds (default: 3600 = 1 hour)
}

// Environment variables interface
// Database types (re-export from Prisma)
export interface RouletteBet {
  id: string;
  createdAt: Date;
  betType: 'COLOR' | 'NUMBER';
  bet: string;
  amountInSats: number;
  userNpub: string;
  eventId: string;
  status: 'INIT' | 'PLACED' | 'WON' | 'LOST';
  blockHeight: number | null;
  rouletteNumber?: number;
  payout?: number;
}

export interface EnvConfig {
  NOSTR_BOT_NSEC: string;
  RPC_USER?: string;
  RPC_PASSWORD?: string;
  RPC_URL?: string;
  LIGHTNING_ADDRESS?: string;
}
