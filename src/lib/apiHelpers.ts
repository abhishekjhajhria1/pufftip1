/**
 * API Helpers for PuffTip Backend
 *
 * Provides core business logic functions:
 * - Wallet authentication (signature verification, nonce generation)
 * - Creator profile & statistics queries
 * - Tip creation & retrieval
 * - Platform statistics
 * - User profile management
 *
 * Dependencies:
 * - @solana/web3.js - Wallet address validation
 * - tweetnacl - Signature verification
 * - bs58 - Base58 encoding/decoding
 * - crypto - Random nonce generation
 * - @prisma/client - Database operations
 */

import { prisma } from "@/lib/prisma";
import { PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";
import bs58 from "bs58";
import { randomBytes } from "crypto";

/**
 * Verify wallet signature using TweetNaCl
 *
 * Flow:
 * 1. Decode message, signature, and public key from base58
 * 2. Use nacl.sign.detached.verify to validate signature matches the public key
 * 3. Return verification result (does not throw on invalid signatures)
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
  } catch {
    return false;
  }
}

/**
 * Fetch creator profile and statistics
 *
 * Returns:
 * - user: Full user object including most recent 10 tips
 * - stats: Aggregated statistics (totalTipsReceived, tipCount, isPremium)
 *
 * Returns null if user not found.
 */
export async function getCreator(username: string) {
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

  const stats = {
    totalTipsReceived: user.tips.reduce((sum, tip) => sum + Number(tip.creatorAmount), 0),
    tipCount: user.tips.length,
    isPremium: user.isPremium,
  };

  return {
    user,
    stats,
  };
}

/**
 * Fetch tip history for a creator
 *
 * Parameters:
 * - username: Creator's username
 * - limit: Max tips to return (default 20)
 * - offset: Pagination offset (default 0)
 *
 * Returns empty array if user not found.
 */
export async function getTips(username: string, limit = 20, offset = 0) {
  const user = await prisma.user.findUnique({
    where: { username },
    select: { id: true },
  });

  if (!user) {
    return [];
  }

  return await prisma.tip.findMany({
    where: { recipientId: user.id },
    orderBy: { createdAt: "desc" },
    skip: offset,
    take: limit,
  });
}

/**
 * Create a new tip transaction
 *
 * Workflow:
 * 1. Validate tip amount (must be positive finite number)
 * 2. Verify recipient exists in database
 * 3. Validate message length (max 500 chars)
 * 4. Calculate splits: 95% to creator, 5% platform fee
 * 5. Create placeholder tip record (actual tx submitted by frontend)
 *
 * Parameters:
 * - recipientUsername: Creator receiving the tip
 * - amountSol: Amount in SOL
 * - message: Optional message from tipper
 * - donorName: Optional display name for tipper
 * - donorWalletAddress: Tipper's wallet (auto-filled if signed)
 *
 * Throws on validation errors or if recipient not found.
 */
export async function createTip(
  recipientUsername: string,
  amountSol: number,
  message: string,
  donorName?: string,
  donorWalletAddress?: string
) {
  if (!Number.isFinite(amountSol) || amountSol <= 0) {
    throw new Error("Amount must be greater than 0");
  }

  const recipient = await prisma.user.findUnique({
    where: { username: recipientUsername },
  });

  if (!recipient) {
    throw new Error("Recipient not found");
  }

  if (message.length > 500) {
    throw new Error("Message too long (max 500 characters)");
  }

  const amountLamports = Math.floor(amountSol * 1_000_000_000);
  const platformFee = Math.floor(amountLamports / 20); // 5%
  const creatorAmount = amountLamports - platformFee; // 95%

  return await prisma.tip.create({
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
}

/**
 * Generate a nonce for wallet authentication
 *
 * Workflow:
 * 1. Validate wallet address is a valid Solana PublicKey
 * 2. Generate random 16-byte hex nonce
 * 3. Return nonce + pre-formatted message for user to sign
 *
 * The user signs this message to prove wallet ownership.
 */
export async function generateNonce(walletAddress: string) {
  new PublicKey(walletAddress);

  const nonce = randomBytes(16).toString("hex");

  return {
    nonce,
    message: `Sign this message to prove you own ${walletAddress}: ${nonce}`,
  };
}

/**
 * Verify wallet signature and create/retrieve user session
 *
 * Workflow:
 * 1. Verify the signature matches the message & wallet
 * 2. Look up user by wallet address
 * 3. If user doesn't exist, create new user with default username
 * 4. Return authenticated user object
 *
 * Throws on invalid signature or database errors.
 */
export async function verifyWallet(
  walletAddress: string,
  message: string,
  signature: string
) {
  if (!verifySignature(message, signature, walletAddress)) {
    throw new Error("Invalid signature");
  }

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
}

/**
 * Fetch or create platform statistics for today
 *
 * Returns daily aggregated stats:
 * - totalTipsCount: Number of tips sent today
 * - totalVolumeSol: Total SOL moved today
 * - platformFeeCollected: Platform fees earned today
 * - uniqueDonors: Unique tipper wallets today
 * - uniqueCreators: Unique recipient wallets today
 * - activeUsers: Users who sent/received today
 * - premiumUsersCount: Premium members active today
 */
export async function getPlatformStats() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let stats = await prisma.platformStats.findUnique({
    where: { date: today },
  });

  if (!stats) {
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
}

/**
 * Update user profile (premium features)
 *
 * Allows customization of:
 * - displayName: Public name shown on creator page
 * - bio: Short description
 * - profileImage: Avatar URL
 * - customPageColor: Theme color for creator page
 * - customThankyouMessage: Custom thank-you message after tipping
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
  return await prisma.user.update({
    where: { id: userId },
    data: updates,
  });
}
