/**
 * API Routes for PuffTip
 *
 * These are Next.js API routes that serve as the backend for the frontend.
 * Each route handles specific business logic.
 */

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";
import bs58 from "bs58";

const prisma = new PrismaClient();

/**
 * Helper: Verify wallet signature
 * Users prove ownership by signing a nonce with their wallet
 */
export function verifySignature(
  message: string,
  signature: string,
  publicKey: string
): boolean {
  try {
    const messageBuffer = Buffer.from(message);
    const signatureBuffer = bs58.decode(signature);
    const publicKeyBuffer = bs58.decode(publicKey);

    return nacl.sign.detached.verify(
      messageBuffer,
      signatureBuffer,
      publicKeyBuffer
    );
  } catch (error) {
    console.error("Signature verification failed:", error);
    return false;
  }
}

/**
 * GET /api/creators/{username}
 * Get creator profile and stats
 */
export async function getCreator(username: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
      include: {
        tips: {
          orderBy: { createdAt: "desc" },
          take: 10,
        },
        customPage: true,
      },
    });

    if (!user) {
      return null;
    }

    // Calculate stats
    const stats = {
      totalTipsReceived: user.tips.reduce((sum, tip) => sum + Number(tip.creatorAmount), 0),
      tipCount: user.tips.length,
      isPremium: user.isPremium,
    };

    return {
      user,
      stats,
    };
  } catch (error) {
    console.error("Error getting creator:", error);
    throw error;
  }
}

/**
 * GET /api/tips/{username}
 * Get tip history for a creator
 */
export async function getTips(username: string, limit = 20, offset = 0) {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
      select: { id: true },
    });

    if (!user) {
      return [];
    }

    const tips = await prisma.tip.findMany({
      where: { recipientId: user.id },
      orderBy: { createdAt: "desc" },
      skip: offset,
      take: limit,
    });

    return tips;
  } catch (error) {
    console.error("Error getting tips:", error);
    throw error;
  }
}

/**
 * POST /api/tips
 * Create a tip transaction
 * This constructs the Solana transaction for the frontend to sign
 */
export async function createTip(
  recipientUsername: string,
  amountSol: number,
  message: string,
  donorName?: string,
  donorWalletAddress?: string
) {
  try {
    // Verify recipient exists
    const recipient = await prisma.user.findUnique({
      where: { username: recipientUsername },
    });

    if (!recipient) {
      throw new Error("Recipient not found");
    }

    // Validate message length
    if (message.length > 500) {
      throw new Error("Message too long (max 500 characters)");
    }

    // Convert SOL to lamports
    const amountLamports = Math.floor(amountSol * 1_000_000_000);
    const platformFee = Math.floor(amountLamports / 20); // 5%
    const creatorAmount = amountLamports - platformFee; // 95%

    // In Phase 3, we just create a placeholder
    // The actual transaction will be created by the frontend
    // and submitted to the Solana program
    const tip = await prisma.tip.create({
      data: {
        donorWalletAddress: donorWalletAddress || "pending",
        recipientId: recipient.id,
        amount: (amountLamports / 1_000_000_000).toString(),
        message,
        donorName,
        transactionHash: "pending",
        platformFee: (platformFee / 1_000_000_000).toString(),
        creatorAmount: (creatorAmount / 1_000_000_000).toString(),
        confirmationStatus: "pending",
      },
    });

    return tip;
  } catch (error) {
    console.error("Error creating tip:", error);
    throw error;
  }
}

/**
 * POST /api/auth/nonce
 * Generate a nonce for wallet authentication
 */
export async function generateNonce(walletAddress: string) {
  try {
    // Validate wallet address
    new PublicKey(walletAddress);

    // Generate random nonce
    const nonce = Math.random().toString(36).substring(2, 15);

    // Store in cache or database (in production, use Redis)
    // For now, we'll return it directly
    return {
      nonce,
      message: `Sign this message to prove you own ${walletAddress}: ${nonce}`,
    };
  } catch (error) {
    console.error("Error generating nonce:", error);
    throw error;
  }
}

/**
 * POST /api/auth/verify
 * Verify wallet signature and create session
 */
export async function verifyWallet(
  walletAddress: string,
  message: string,
  signature: string
) {
  try {
    // Verify signature
    if (!verifySignature(message, signature, walletAddress)) {
      throw new Error("Invalid signature");
    }

    // Get or create user
    let user = await prisma.user.findUnique({
      where: { walletAddress },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          walletAddress,
          username: walletAddress.slice(0, 8),
        },
      });
    }

    return {
      user,
      authenticated: true,
    };
  } catch (error) {
    console.error("Error verifying wallet:", error);
    throw error;
  }
}

/**
 * GET /api/stats
 * Get platform statistics
 */
export async function getPlatformStats() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let stats = await prisma.platformStats.findUnique({
      where: { date: today },
    });

    if (!stats) {
      // Create today's stats
      stats = await prisma.platformStats.create({
        data: {
          date: today,
          totalTipsCount: 0,
          totalVolumeSol: "0",
          platformFeeCollected: "0",
          uniqueDonors: 0,
          uniqueCreators: 0,
          activeUsers: 0,
          premiumUsersCount: 0,
        },
      });
    }

    return stats;
  } catch (error) {
    console.error("Error getting stats:", error);
    throw error;
  }
}

/**
 * UPDATE /api/users/profile
 * Update user profile (for premium customization)
 */
export async function updateUserProfile(
  userId: string,
  updates: {
    displayName?: string;
    bio?: string;
    profileImage?: string;
    customPageColor?: string;
    customThankyouMessage?: string;
  }
) {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: updates,
    });

    return user;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
}
