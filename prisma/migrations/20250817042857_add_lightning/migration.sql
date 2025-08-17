-- CreateEnum
CREATE TYPE "BetType" AS ENUM ('color', 'number');

-- CreateEnum
CREATE TYPE "BetStatus" AS ENUM ('init', 'placed', 'lost', 'won', 'wonAndPaid');

-- CreateTable
CREATE TABLE "roulette_bets" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "betType" "BetType" NOT NULL,
    "bet" TEXT NOT NULL,
    "amountInSats" INTEGER NOT NULL,
    "userNpub" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "playerLightningAddress" TEXT NOT NULL,
    "status" "BetStatus" NOT NULL DEFAULT 'init',
    "blockHeight" INTEGER,
    "paymentHash" TEXT,
    "paymentRequest" TEXT,
    "invoicePaid" BOOLEAN NOT NULL DEFAULT false,
    "paidAt" TIMESTAMP(3),

    CONSTRAINT "roulette_bets_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "roulette_bets_eventId_key" ON "roulette_bets"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "roulette_bets_paymentHash_key" ON "roulette_bets"("paymentHash");
