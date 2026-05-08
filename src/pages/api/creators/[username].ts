/**
 * GET /api/creators/[username]
 * Get creator profile, stats, and recent tips
 */

import { NextApiRequest, NextApiResponse } from "next";
import { getCreator } from "@/lib/apiHelpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username } = req.query;

  if (!username || typeof username !== "string") {
    return res.status(400).json({ error: "Username required" });
  }

  try {
    const result = await getCreator(username);

    if (!result) {
      return res.status(404).json({ error: "Creator not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("API error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
