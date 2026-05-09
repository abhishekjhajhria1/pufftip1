/**
 * DonorLeaderboard Component
 *
 * Displays top supporters ranked by total SOL tipped.
 * Shows rank medals (🥇🥈🥉) for top 3, numbered badges for rest.
 *
 * Props:
 * - entries: DonorLeaderboardEntry[] — sorted by totalAmountSol descending
 *
 * Data comes from GET /api/tips/[username]/leaderboard
 * which calls getDonorLeaderboard() in apiHelpers.ts
 */

import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import type { DonorLeaderboardEntry } from "@/lib/apiHelpers";

interface DonorLeaderboardProps {
  entries: DonorLeaderboardEntry[];
}

/** Rank medal or number badge */
function RankBadge({ rank }: { rank: number }) {
  const medals = ["🥇", "🥈", "🥉"];

  if (rank <= 3) {
    return <Text fontSize="lg">{medals[rank - 1]}</Text>;
  }

  return (
    <Box
      w={6}
      h={6}
      borderRadius="full"
      bg="whiteAlpha.100"
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontSize="xs"
      color="whiteAlpha.500"
      fontWeight="600"
    >
      {rank}
    </Box>
  );
}

export function DonorLeaderboard({ entries }: DonorLeaderboardProps) {
  return (
    <VStack gap={2} align="stretch">
      {entries.length > 0 ? (
        entries.map((entry, index) => (
          <Box
            key={entry.donorKey}
            className="glass-hover"
            p={3}
            borderRadius="lg"
            bg={index === 0 ? "rgba(121, 40, 202, 0.08)" : "transparent"}
            border="1px solid"
            borderColor={index === 0 ? "rgba(121, 40, 202, 0.15)" : "rgba(255,255,255,0.05)"}
            transition="all 0.2s"
          >
            <HStack justifyContent="space-between" alignItems="center">
              <HStack gap={3} alignItems="center">
                <RankBadge rank={index + 1} />
                <Box>
                  <Text fontWeight="600" fontSize="sm" color="whiteAlpha.800">
                    {entry.donorName}
                  </Text>
                  <Text fontSize="xs" color="whiteAlpha.400">
                    {entry.tipCount} tip{entry.tipCount === 1 ? "" : "s"} •{" "}
                    {entry.donorWalletAddress.slice(0, 4)}...
                    {entry.donorWalletAddress.slice(-4)}
                  </Text>
                </Box>
              </HStack>
              <Box textAlign="right">
                <Text fontWeight="700" color="whiteAlpha.800" fontSize="sm">
                  ◎ {entry.totalAmountSol.toFixed(2)}
                </Text>
              </Box>
            </HStack>
          </Box>
        ))
      ) : (
        <Text color="whiteAlpha.400" fontSize="sm" textAlign="center" py={4}>
          No supporters yet. Be the first! 🍃
        </Text>
      )}
    </VStack>
  );
}
