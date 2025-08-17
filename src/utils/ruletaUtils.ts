import crypto from "crypto";
import type { RouletteBetParseResult } from '../types';
import { RouletteBetRepository } from '../database/rouletteBetRepository.js';
import type { RouletteBet } from '.prisma/client';

/**
 * Utility functions for roulette game functionality
 */

/**
 * Parses a roulette bet from a nostr message and stores it in the database
 * Expected format: "nostr:<bot_npub> <roulette_bet> <amount_in_sats>"
 * @param content - The message content to parse
 * @param botNpub - The bot's npub to validate mentions
 * @param userNpub - The user's npub who placed the bet
 * @param eventId - The nostr event ID
 * @param blockHeight - Current block height for the bet
 * @returns Created RouletteBet or null if parsing/creation failed
 */
export async function parseRouletteBet(
  content: string, 
  botNpub: string, 
  userNpub: string, 
  eventId: string, 
): Promise<RouletteBet | null> {
  try {
    // Remove extra whitespace and split by spaces
    const parts = content.trim().split(/\s+/);
    
    // Check if we have at least 3 parts: nostr:<npub>, bet, amount
    if (parts.length < 3) {
      return null;
    }
    
    // Extract and validate the nostr mention
    const mention = parts[0];
    if (!mention.startsWith('nostr:') || !mention.includes(botNpub)) {
      return null;
    }
    
    // Extract bet and amount
    const bet = parts[1].toLowerCase();
    const amountStr = parts[2];
    
    // Validate amount is a number
    const amount = parseInt(amountStr, 10);
    if (isNaN(amount) || amount <= 0) {
      console.error('Amount must be a positive number in sats');
      return null;
    }
    
    // Validate bet type
    let betType: 'color' | 'number';
    
    if (bet === 'red' || bet === 'black') {
      betType = 'color';
    } else {
      // Check if it's a valid roulette number (0-36)
      const number = parseInt(bet, 10);
      if (isNaN(number) || number < 0 || number > 36 || bet.length > 2) {
        console.error('Bet must be "red", "black", or a number between 0-36');
        return null;
      }
      betType = 'number';
    }

    
    
    // Store the bet in the database
    const repository = new RouletteBetRepository();
    const createdBet = await repository.create({
      betType,
      bet,
      amountInSats: amount,
      userNpub,
      eventId,
    });

    return createdBet;
  } catch (error) {
    console.error('Failed to parse and store roulette bet:', error);
    return null;
  }
}

/**
 * Uses a seed to generate a sha256 hash, and modulo to get an integer between
 * min and max. Performs rejection sampling to remove modulo bias.
 */
export function intFromSeed(seed: string, min: number, max: number): number {
  const range = BigInt(max - min + 1);
  const maxValidValue = (1n << 256n) - ((1n << 256n) % range);
  let counter = 0;
  while (true) {
    const hash = crypto.createHash("sha256")
      .update(seed + counter.toString())
      .digest("hex");
    const bigVal = BigInt(`0x${hash}`);
    
    if (bigVal < maxValidValue) {
      return Number(bigVal % range) + min;
    }
    counter++;
  }
}

export function getRouletteColor(n: number): string {
  if (n < 0 || n > 37) throw new Error("Number must be 0–37 (37 = 00)");
  if (n === 0 || n === 37) return "green";
  const red = new Set([1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36]);
  return red.has(n) ? "red" : "black";
}

/**
 * Determines if a bet wins based on the roulette number and bet type
 */
export function checkWin(bet: string, rouletteNumber: number): boolean {
  const color = getRouletteColor(rouletteNumber);
  const betLower = bet.toLowerCase();
  
  // Color bets
  if (betLower === "red" || betLower === "black" || betLower === "green") {
    return betLower === color;
  }
  
  // Number bets
  const betNumber = parseInt(bet);
  if (!isNaN(betNumber)) {
    return betNumber === rouletteNumber;
  }
  
  // Even/odd bets
  if (betLower === "even") {
    return rouletteNumber !== 0 && rouletteNumber !== 37 && rouletteNumber % 2 === 0;
  }
  if (betLower === "odd") {
    return rouletteNumber !== 0 && rouletteNumber !== 37 && rouletteNumber % 2 === 1;
  }
  
  return false;
}

/**
 * Calculate payout multiplier based on bet type
 */
export function getPayoutMultiplier(bet: string): number {
  const betLower = bet.toLowerCase();
  
  // Color bets (red/black) - 2x payout
  if (betLower === "red" || betLower === "black") {
    return 2;
  }
  
  // Green (0 or 00) - higher payout due to lower odds
  if (betLower === "green") {
    return 18; // 36:1 odds for green
  }
  
  // Number bets - 36x payout
  const betNumber = parseInt(bet);
  if (!isNaN(betNumber) && betNumber >= 0 && betNumber <= 37) {
    return 36;
  }
  
  // Even/odd bets - 2x payout
  if (betLower === "even" || betLower === "odd") {
    return 2;
  }
  
  return 1; // Default fallback
}
