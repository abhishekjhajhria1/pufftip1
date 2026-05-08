/**
 * POST /api/auth/verify
 * Verify wallet signature and authenticate user
 */

import { NextApiRequest, NextApiResponse } from "next";
import { verifyWallet } from "@/lib/apiHelpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { walletAddress, message, signature } = req.body;

  if (!walletAddress || !message || !signature) {
    return res.status(400).json({
      error: "Missing required fields: walletAddress, message, signature",
    });
  }

  try {
    const result = await verifyWallet(walletAddress, message, signature);
    
    // In production, set JWT or session here
    res.status(200).json(result);
  } catch (error) {
    const err = error as Error;
    console.error("API error:", err);
    res.status(401).json({ error: err.message });
  }
}
