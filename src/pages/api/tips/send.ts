/**
 * POST /api/tips/send
 * Send a tip - constructs transaction for frontend to sign
 */

import { NextApiRequest, NextApiResponse } from "next";
import { createTip } from "@/lib/apiHelpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { recipientUsername, amountSol, message, donorName, donorWalletAddress } =
    req.body;

  if (!recipientUsername || !amountSol || !message) {
    return res.status(400).json({
      error: "Missing required fields: recipientUsername, amountSol, message",
    });
  }

  if (amountSol <= 0) {
    return res.status(400).json({ error: "Amount must be greater than 0" });
  }

  try {
    const tip = await createTip(
      recipientUsername,
      amountSol,
      message,
      donorName,
      donorWalletAddress
    );

    res.status(201).json({
      success: true,
      tip,
      message: "Tip recorded. Awaiting blockchain confirmation.",
    });
  } catch (error) {
    const err = error as Error;
    console.error("API error:", err);
    res.status(400).json({ error: err.message });
  }
}
