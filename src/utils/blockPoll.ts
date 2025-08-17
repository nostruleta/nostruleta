import type { RpcRequest, RpcResponse, BlockData } from '../types.js';

// Callback function type for new block events
export type NewBlockCallback = (blockData: BlockData) => Promise<void>;

// Bitcoin block polling service
class BlockPollService {
  private RPC_USER: string | undefined;
  private RPC_PASSWORD: string | undefined;
  private RPC_URL: string | undefined;
  public blockHeight: number | null;
  public blockHash: string | null;
  private pollInterval: NodeJS.Timeout | null;
  private callbacks: Set<NewBlockCallback> = new Set();

  constructor() {
    // Replace with your Bitcoin RPC credentials
    this.RPC_USER = process.env.RPC_USER;
    this.RPC_PASSWORD = process.env.RPC_PASSWORD;
    this.RPC_URL = process.env.RPC_URL;
    
    this.blockHeight = null;
    this.blockHash = null;
    this.pollInterval = null;
    
    // Start polling immediately
    this.start();
  }

  // Helper to make an RPC call
  private async callRpc<T = any>(method: string, params: any[] = []): Promise<T> {
    const body: RpcRequest = {
      jsonrpc: "1.0",
      id: "poll",
      method,
      params,
    };

    if (!this.RPC_URL || !this.RPC_USER || !this.RPC_PASSWORD) {
      throw new Error('RPC credentials not configured');
    }

    const response = await fetch(this.RPC_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + Buffer.from(`${this.RPC_USER}:${this.RPC_PASSWORD}`).toString("base64"),
      },
      body: JSON.stringify(body),
    });

    const data: RpcResponse<T> = await response.json();
    if (data.error) throw new Error(data.error.message);
    return data.result;
  }

  // Poll for next block in sequence
  private async pollNextBlock(): Promise<void> {
    try {
      // For the first poll, get the latest block
      if (this.blockHeight === null) {
        const _blockHeight = await this.callRpc<number>("getblockcount");
        const _blockHash = await this.callRpc<string>("getblockhash", [_blockHeight]);
        
        this.blockHeight = _blockHeight;
        this.blockHash = _blockHash;
        console.log(`Initial block found: ${_blockHeight} - ${_blockHash}`);
        return;
      }

      // After initial poll, always check for the next block in sequence
      const nextBlockHeight = this.blockHeight + 1;
      
      try {
        const _blockHash = await this.callRpc<string>("getblockhash", [nextBlockHeight]);
        
        // If we successfully get the hash, the block exists
        this.blockHeight = nextBlockHeight;
        this.blockHash = _blockHash;
        console.log(`New block found: ${nextBlockHeight} - ${_blockHash}`);
        
        // Notify all registered callbacks
        await this.notifyCallbacks({
          blockHeight: this.blockHeight,
          blockHash: this.blockHash
        });
      } catch (blockNotFoundError) {
        // Block doesn't exist yet, this is expected - just continue polling
        // No need to log this as it's normal behavior
      }
    } catch (err) {
      console.error("RPC error:", (err as Error).message);
    }
  }

  // Get current block data
  getBlockData(): BlockData {
    return {
      blockHeight: this.blockHeight,
      blockHash: this.blockHash
    };
  }

  // Start polling service
  start(): void {
    // Poll immediately on start
    this.pollNextBlock();
    
    // Set up interval for continuous polling every 10 seconds
    this.pollInterval = setInterval(() => {
      this.pollNextBlock();
    }, 10000);
    
    console.log("Block polling service started");
  }

  // Register a callback to be called when a new block is found
  registerCallback(callback: NewBlockCallback): void {
    this.callbacks.add(callback);
    console.log(`📝 Registered new block callback (${this.callbacks.size} total)`);
  }

  // Unregister a callback
  unregisterCallback(callback: NewBlockCallback): void {
    this.callbacks.delete(callback);
    console.log(`🗑️ Unregistered block callback (${this.callbacks.size} remaining)`);
  }

  // Notify all registered callbacks of a new block
  private async notifyCallbacks(blockData: BlockData): Promise<void> {
    if (this.callbacks.size === 0) {
      return;
    }

    console.log(`📢 Notifying ${this.callbacks.size} callbacks of new block`);
    
    const promises = Array.from(this.callbacks).map(async (callback) => {
      try {
        await callback(blockData);
      } catch (error) {
        console.error('❌ Error in block callback:', error);
      }
    });

    await Promise.all(promises);
  }

  // Stop polling service
  stop(): void {
    if (this.pollInterval) {
      clearInterval(this.pollInterval);
      this.pollInterval = null;
      console.log("Block polling service stopped");
    }
  }
}

export default BlockPollService;
