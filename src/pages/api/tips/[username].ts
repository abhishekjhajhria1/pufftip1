/**
 * GET /api/tips/[username]
 * Get tip history for a creator with pagination
 */

import { NextApiRequest, NextApiResponse } from "next";
import { getTips } from "@/lib/apiHelpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, limit = "20", offset = "0" } = req.query;

  if (!username || typeof username !== "string") {
    return res.status(400).json({ error: "Username required" });
  }

  try {
    const limitNum = Math.min(parseInt(limit as string) || 20, 100);
    const offsetNum = parseInt(offset as string) || 0;

    const tips = await getTips(username, limitNum, offsetNum);

    res.status(200).json({
      tips,
      count: tips.length,
      limit: limitNum,
      offset: offsetNum,
    });
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
