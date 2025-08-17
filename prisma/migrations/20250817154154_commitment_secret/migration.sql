/*
  Warnings:

  - You are about to drop the column `blockHeight` on the `roulette_bets` table. All the data in the column will be lost.
  - Added the required column `secret` to the `roulette_bets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "BetStatus" ADD VALUE 'wonPaymentFailed';
ALTER TYPE "BetStatus" ADD VALUE 'wonPaymentError';

-- AlterTable
ALTER TABLE "roulette_bets" DROP COLUMN "blockHeight",
ADD COLUMN     "secret" TEXT NOT NULL;
