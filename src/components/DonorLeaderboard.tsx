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
      bg="brand.markerYellow"
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontSize="xs"
      color="brand.ink"
      fontWeight="bold"
      border="1px solid"
      borderColor="brand.ink"
      fontFamily="heading"
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
            className="paper-card"
            p={3}
            borderRadius="md"
            bg={index === 0 ? "brand.markerYellow" : "brand.paper"}
            border="1px solid"
            borderColor="brand.ink"
            transition="all 0.2s"
          >
            <HStack justifyContent="space-between" alignItems="center">
              <HStack gap={3} alignItems="center">
                <RankBadge rank={index + 1} />
                <Box>
                  <Text fontWeight="bold" fontSize="sm" color="brand.ink" fontFamily="body">
                    {entry.donorName}
                  </Text>
                  <Text fontSize="xs" color="brand.inkSoft" fontFamily="body">
                    {entry.tipCount} tip{entry.tipCount === 1 ? "" : "s"} •{" "}
                    {entry.donorWalletAddress.slice(0, 4)}...
                    {entry.donorWalletAddress.slice(-4)}
                  </Text>
                </Box>
              </HStack>
              <Box textAlign="right">
                <Text fontWeight="bold" color="brand.ink" fontSize="md" fontFamily="heading">
                  ◎ {entry.totalAmountSol.toFixed(2)}
                </Text>
              </Box>
            </HStack>
          </Box>
        ))
      ) : (
        <Text color="brand.inkSoft" fontSize="sm" textAlign="center" py={4} fontFamily="body">
          No supporters yet. Be the first! 🍃
        </Text>
      )}
    </VStack>
  );
}
