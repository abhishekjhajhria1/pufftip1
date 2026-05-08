/**
 * POST /api/auth/nonce
 * Generate a nonce for wallet authentication
 */

import { NextApiRequest, NextApiResponse } from "next";
import { generateNonce } from "@/lib/apiHelpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { walletAddress } = req.body;

  if (!walletAddress) {
    return res.status(400).json({ error: "Wallet address required" });
  }

  try {
    const nonce = await generateNonce(walletAddress);
    res.status(200).json(nonce);
  } catch (error) {
    const err = error as Error;
    console.error("API error:", err);
    res.status(400).json({ error: err.message });
  }
}
