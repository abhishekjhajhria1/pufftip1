/**
 * User Public Page — Creator Tip Page
 *
 * This is the page supporters visit to send tips.
 * URL: /u/[username]
 *
 * Features:
 * - Creator profile header with avatar initials
 * - Real-time WebSocket connection for live tips
 * - Tip form with preset amounts
 * - Recent tips feed with animations
 * - Top supporters leaderboard with medals
 * - Notification system integration
 *
 * Data flow:
 *   1. Page loads → fetch creator profile + tips + leaderboard (parallel)
 *   2. WebSocket connects → subscribe to live tips
 *   3. User submits tip → POST /api/tips/send
 *   4. Success → refresh tips list + show success message
 */

import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Container,
  Spinner,
  HStack,
  Badge,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { FiCheck, FiAlertCircle, FiBell } from "react-icons/fi";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import { TipForm } from "@/components/TipForm";
import { DonorLeaderboard } from "@/components/DonorLeaderboard";
import { useWebSocketTips } from "@/hooks/useWebSocketTips";
import { NotificationManager } from "@/components/NotificationManager";
import { NotificationSettings } from "@/components/NotificationSettings";

const MotionBox = motion(Box);

interface Creator {
  user: {
    id: string;
    username: string;
    displayName?: string;
    bio?: string;
    profileImage?: string;
    isPremium: boolean;
  };
  stats: {
    totalTipsReceived: number;
    tipCount: number;
  };
}

interface Tip {
  id: string;
  donorName?: string;
  amount: string;
  message?: string;
  createdAt: string;
}

interface LeaderboardEntry {
  donorKey: string;
  donorName: string;
  donorWalletAddress: string;
  totalAmountSol: number;
  tipCount: number;
  latestTipAt: string;
}

export default function UserPublicPage() {
  const router = useRouter();
  const { username } = router.query;

  // Notification settings modal state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const [creator, setCreator] = useState<Creator | null>(null);
  const [tips, setTips] = useState<Tip[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Real-time WebSocket integration
  const { isConnected } = useWebSocketTips(
    typeof username === "string" ? username : ""
  );

  useEffect(() => {
    if (!username || typeof username !== "string") return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const [creatorRes, tipsRes, leaderboardRes] = await Promise.all([
          fetch(`/api/creators/${username}`),
          fetch(`/api/tips/${username}?limit=20`),
          fetch(`/api/tips/${username}/leaderboard?limit=5`),
        ]);

        if (creatorRes.ok) {
          setCreator(await creatorRes.json());
        }
        if (tipsRes.ok) {
          const tipsData = await tipsRes.json();
          setTips(tipsData.tips || []);
        }
        if (leaderboardRes.ok) {
          const leaderboardData = await leaderboardRes.json();
          setLeaderboard(leaderboardData.leaderboard || []);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  /** Refresh tips + leaderboard after successful tip */
  const handleTipSuccess = async () => {
    try {
      setSuccessMessage("Tip sent successfully! 🎉");

      const [tipsRes, leaderboardRes] = await Promise.all([
        fetch(`/api/tips/${username}?limit=20`),
        fetch(`/api/tips/${username}/leaderboard?limit=5`),
      ]);
      if (tipsRes.ok) {
        setTips((await tipsRes.json()).tips || []);
      }
      if (leaderboardRes.ok) {
        setLeaderboard((await leaderboardRes.json()).leaderboard || []);
      }

      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error("Failed to refresh tips:", error);
    }
  };

  const handleTipError = (error: string) => {
    setErrorMessage(error);
    setTimeout(() => setErrorMessage(null), 5000);
  };

  // ── Loading ──
  if (!username || loading) {
    return (
      <Container maxW="container.lg" py={20}>
        <VStack>
          <Spinner size="lg" color="purple.400" />
          <Text color="whiteAlpha.500" fontSize="sm">Loading creator page...</Text>
        </VStack>
      </Container>
    );
  }

  // ── Not Found ──
  if (!creator) {
    return (
      <Container maxW="container.md" py={20}>
        <MotionBox
          className="glass-strong"
          p={8}
          textAlign="center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <VStack gap={4}>
            <Text fontSize="4xl">🔍</Text>
            <Heading size="lg" color="white" fontFamily="'Fredoka', sans-serif">
              Creator Not Found
            </Heading>
            <Text color="whiteAlpha.500" fontSize="sm">
              No creator with username &quot;{username}&quot; exists yet.
            </Text>
            <Button
              variant="outline"
              color="whiteAlpha.700"
              borderColor="whiteAlpha.200"
              _hover={{ bg: "whiteAlpha.100" }}
              onClick={() => router.push("/")}
              borderRadius="xl"
            >
              ← Back to Home
            </Button>
          </VStack>
        </MotionBox>
      </Container>
    );
  }

  const displayName = creator.user.displayName || creator.user.username;

  return (
    <>
      <Head>
        <title>{displayName} — PuffTip</title>
        <meta name="description" content={`Send a tip to ${displayName} on PuffTip. Instant SOL tips for creators.`} />
      </Head>

      {/* Notification System (invisible orchestrator) */}
      <NotificationManager creatorId={typeof username === "string" ? username : ""} />

      <Container maxW="container.lg" py={{ base: 6, md: 12 }}>
        <Grid templateColumns={{ base: "1fr", lg: "1fr 380px" }} gap={8}>
          {/* ── Left Column: Profile + Tips Feed ── */}
          <GridItem>
            <VStack gap={6} align="stretch">
              {/* Profile Header */}
              <MotionBox
                className="glass-strong"
                p={{ base: 5, md: 8 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <HStack gap={5} flexWrap="wrap">
                  {/* Avatar */}
                  <Box
                    w={20}
                    h={20}
                    borderRadius="2xl"
                    bg="linear-gradient(135deg, #7928CA, #FF0080)"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    fontSize="2xl"
                    fontWeight="700"
                    color="white"
                    flexShrink={0}
                  >
                    {displayName[0].toUpperCase()}
                  </Box>

                  <Box flex={1}>
                    <HStack gap={2} mb={1} flexWrap="wrap">
                      <Heading
                        as="h1"
                        size="xl"
                        color="white"
                        fontFamily="'Fredoka', sans-serif"
                      >
                        {displayName}
                      </Heading>
                      {creator.user.isPremium && (
                        <Badge
                          bg="linear-gradient(135deg, #FFE600, #FF8C00)"
                          color="black"
                          fontSize="xs"
                          borderRadius="full"
                          px={2}
                        >
                          ⭐ Premium
                        </Badge>
                      )}
                    </HStack>

                    {creator.user.bio && (
                      <Text color="whiteAlpha.600" fontSize="sm" mb={2}>
                        {creator.user.bio}
                      </Text>
                    )}

                    <HStack gap={4} fontSize="sm" color="whiteAlpha.400">
                      <Text>{creator.stats.tipCount} tips</Text>
                      <Text>•</Text>
                      <Text>{Number(creator.stats.totalTipsReceived).toFixed(2)} SOL received</Text>
                    </HStack>
                  </Box>
                </HStack>

                {/* Actions Row */}
                <HStack mt={4} gap={2}>
                  <HStack fontSize="xs" color={isConnected ? "green.400" : "whiteAlpha.400"} gap={1}>
                    <Box className={isConnected ? "pulse-dot" : undefined} w="6px" h="6px" borderRadius="full" bg={isConnected ? "green.400" : "whiteAlpha.300"} />
                    <Text>{isConnected ? "Live" : "Connecting..."}</Text>
                  </HStack>
                  <Box flex={1} />
                  <Button
                    variant="ghost"
                    size="xs"
                    color="whiteAlpha.500"
                    _hover={{ color: "whiteAlpha.800", bg: "whiteAlpha.100" }}
                    onClick={() => setIsSettingsOpen(true)}
                    borderRadius="lg"
                  >
                    <FiBell size={14} />
                    <Text ml={1}>Notifications</Text>
                  </Button>
                </HStack>
              </MotionBox>

              {/* Recent Tips Feed */}
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Heading as="h3" size="sm" color="whiteAlpha.700" mb={4} fontFamily="'Fredoka', sans-serif">
                  Recent Tips ({tips.length})
                </Heading>
                {tips.length > 0 ? (
                  <VStack gap={3} align="stretch">
                    {tips.map((tip, i) => (
                      <MotionBox
                        key={tip.id}
                        className="glass glass-hover"
                        p={4}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.03 * i }}
                      >
                        <HStack justifyContent="space-between" mb={1}>
                          <Text fontWeight="600" color="whiteAlpha.800" fontSize="sm">
                            {tip.donorName || "Anonymous"}
                          </Text>
                          <Badge
                            bg="linear-gradient(135deg, #7928CA, #FF0080)"
                            color="white"
                            borderRadius="full"
                            px={2}
                            fontSize="xs"
                          >
                            ◎ {Number(tip.amount).toFixed(2)}
                          </Badge>
                        </HStack>
                        {tip.message && (
                          <Text color="whiteAlpha.500" fontSize="sm" mb={1}>
                            &quot;{tip.message}&quot;
                          </Text>
                        )}
                        <Text fontSize="xs" color="whiteAlpha.300">
                          {new Date(tip.createdAt).toLocaleString()}
                        </Text>
                      </MotionBox>
                    ))}
                  </VStack>
                ) : (
                  <Box className="glass" p={6} textAlign="center">
                    <Text color="whiteAlpha.400" fontSize="sm">
                      No tips yet. Be the first to support this creator! 🍃
                    </Text>
                  </Box>
                )}
              </MotionBox>
            </VStack>
          </GridItem>

          {/* ── Right Column: Tip Form + Leaderboard ── */}
          <GridItem>
            <VStack gap={6} align="stretch" position={{ lg: "sticky" }} top={{ lg: "100px" }}>
              {/* Tip Form Card */}
              <MotionBox
                className="glass-strong"
                p={{ base: 5, md: 6 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Heading as="h2" size="sm" color="white" mb={4} fontFamily="'Fredoka', sans-serif">
                  🍃 Send a Tip
                </Heading>

                {/* Success Message */}
                {successMessage && (
                  <Box
                    p={3}
                    borderRadius="lg"
                    bg="rgba(34, 197, 94, 0.1)"
                    border="1px solid rgba(34, 197, 94, 0.2)"
                    display="flex"
                    alignItems="flex-start"
                    gap={2}
                    mb={4}
                  >
                    <FiCheck style={{ marginTop: "2px", color: "#4ade80", flexShrink: 0 }} />
                    <Text fontSize="sm" color="green.300">{successMessage}</Text>
                  </Box>
                )}

                {/* Error Message */}
                {errorMessage && (
                  <Box
                    p={3}
                    borderRadius="lg"
                    bg="rgba(239, 68, 68, 0.1)"
                    border="1px solid rgba(239, 68, 68, 0.2)"
                    display="flex"
                    alignItems="flex-start"
                    gap={2}
                    mb={4}
                  >
                    <FiAlertCircle style={{ marginTop: "2px", color: "#f87171", flexShrink: 0 }} />
                    <Text fontSize="sm" color="red.300">{errorMessage}</Text>
                  </Box>
                )}

                <TipForm
                  username={typeof username === "string" ? username : ""}
                  onSuccess={handleTipSuccess}
                  onError={handleTipError}
                />
              </MotionBox>

              {/* Leaderboard */}
              <MotionBox
                className="glass"
                p={{ base: 5, md: 6 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Heading as="h3" size="sm" color="whiteAlpha.700" mb={4} fontFamily="'Fredoka', sans-serif">
                  🏆 Top Supporters
                </Heading>
                <DonorLeaderboard entries={leaderboard} />
              </MotionBox>
            </VStack>
          </GridItem>
        </Grid>
      </Container>

      {/* Notification Settings Modal */}
      <NotificationSettings
        creatorId={typeof username === "string" ? username : ""}
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
}
