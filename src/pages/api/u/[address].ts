import type { NextApiRequest, NextApiResponse } from 'next';

// Mock Database (In-memory)
// In a real app, use Supabase, Firebase, or MongoDB
interface ProfileData {
    username: string;
    bio: string;
    theme: string;
    socials?: {
        twitter?: string;
        github?: string;
        website?: string;
    };
    goal?: {
        title: string;
        amount: number; // ETH target
    };
}
const MOCK_DB = new Map<string, ProfileData>();

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { address } = req.query;
    const userAddress = (address as string).toLowerCase();

    if (req.method === 'GET') {
        const profile = MOCK_DB.get(userAddress) || {
            username: "Anon",
            bio: "Just another crypto enthusiast.",
            theme: "default",
            goal: { title: "My First 1 ETH", amount: 1.0 }
        };
        return res.status(200).json(profile);
    }

    if (req.method === 'POST') {
        // In production: Verify a signature here to prove ownership of the address!
        // For now, we trust the frontend call (Prototype mode).
        const { username, bio, theme, socials, goal } = req.body;

        const newProfile = { username, bio, theme, socials, goal };
        MOCK_DB.set(userAddress, newProfile);

        return res.status(200).json({ success: true, profile: newProfile });
    }

    return res.status(405).end();
}
