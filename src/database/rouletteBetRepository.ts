import { PrismaClient, RouletteBet, BetType, BetStatus } from '../generated/client';
import { getPrismaClient } from './database.js';
import { CreateRouletteBetInput, UpdateRouletteBetInput } from '../types.js';

export class RouletteBetRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = getPrismaClient();
  }

  // Create a new roulette bet
  async create(input: CreateRouletteBetInput): Promise<RouletteBet> {
    return await this.prisma.rouletteBet.create({
      data: {
        betType: input.betType === 'color' ? BetType.COLOR : BetType.NUMBER,
        bet: input.bet,
        amountInSats: input.amountInSats,
        userNpub: input.userNpub,
        eventId: input.eventId,
        playerLightningAddress: input.playerLightningAddress,
      },
    });
  }

  // Find bet by ID
  async findById(id: string): Promise<RouletteBet | null> {
    return await this.prisma.rouletteBet.findUnique({
      where: { id },
    });
  }

  // Find bet by event ID
  async findByEventId(eventId: string): Promise<RouletteBet | null> {
    return await this.prisma.rouletteBet.findUnique({
      where: { eventId },
    });
  }

  // Find bets by user npub
  async findByUserNpub(userNpub: string, limit?: number): Promise<RouletteBet[]> {
    return await this.prisma.rouletteBet.findMany({
      where: { userNpub },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  // Find bets by status
  async findByStatus(status: BetStatus, limit?: number): Promise<RouletteBet[]> {
    return await this.prisma.rouletteBet.findMany({
      where: { status },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  }

  // Find bets by block height
  async findByBlockHeight(blockHeight: number): Promise<RouletteBet[]> {
    return await this.prisma.rouletteBet.findMany({
      where: { blockHeight },
      orderBy: { createdAt: 'desc' },
    });
  }

  // Update bet
  async update(id: string, input: Partial<Pick<RouletteBet, 'status' | 'blockHeight' | 'paymentHash'>> & { rouletteNumber?: number; payout?: number }): Promise<RouletteBet | null> {
    try {
      return await this.prisma.rouletteBet.update({
        where: { id },
        data: input,
      });
    } catch (error) {
      // Handle case where bet doesn't exist
      return null;
    }
  }

  // Get total count of bets
  async count(): Promise<number> {
    return await this.prisma.rouletteBet.count();
  }
}
