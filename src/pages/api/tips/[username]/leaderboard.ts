/**
 * GET /api/tips/[username]/leaderboard
 * Get top donors for a creator
 */

import { NextApiRequest, NextApiResponse } from "next";
import { getDonorLeaderboard } from "@/lib/apiHelpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, limit = "5" } = req.query;

  if (!username || typeof username !== "string") {
    return res.status(400).json({ error: "Username required" });
  }

  try {
    const limitNum = Math.min(parseInt(limit as string) || 5, 20);
    const leaderboard = await getDonorLeaderboard(username, limitNum);

    res.status(200).json({
      leaderboard,
      count: leaderboard.length,
      limit: limitNum,
    });
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
