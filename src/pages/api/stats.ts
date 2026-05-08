/**
 * GET /api/stats
 * Get platform-wide statistics
 */

import { NextApiRequest, NextApiResponse } from "next";
import { getPlatformStats } from "@/lib/apiHelpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const stats = await getPlatformStats();
    res.status(200).json(stats);
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
