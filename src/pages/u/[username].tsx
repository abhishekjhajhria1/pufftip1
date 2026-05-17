/**
 * User Public Page — Creator Tip Page
 *
 * This is the page supporters visit to send tips.
 * URL: /u/[username]
 *
 * Features:
 * - Creator profile header with polaroid avatar
 * - Real-time WebSocket connection for live tips
 * - Tip form with preset amounts
 * - Recent tips feed rendered as sticky notes
 * - Top supporters leaderboard
 * - Notification system integration
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
          <Spinner size="lg" color="brand.ink" />
          <Text color="brand.inkSoft" fontSize="sm">Loading creator page...</Text>
        </VStack>
      </Container>
    );
  }

  // ── Not Found ──
  if (!creator) {
    return (
      <Container maxW="container.md" py={20}>
        <MotionBox
          className="paper-card"
          p={8}
          textAlign="center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <VStack gap={4}>
            <Text fontSize="4xl">🔍</Text>
            <Heading size="lg" color="brand.ink" fontFamily="heading">
              Creator Not Found
            </Heading>
            <Text color="brand.inkSoft" fontSize="sm">
              No creator with username &quot;{username}&quot; exists yet.
            </Text>
            <Button
              variant="outline"
              color="brand.ink"
              borderColor="brand.inkSoft"
              _hover={{ bg: "brand.paperDeep" }}
              onClick={() => router.push("/")}
              borderRadius="md"
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
            <VStack gap={8} align="stretch">
              {/* Profile Header */}
              <MotionBox
                className="paper-card rotate-doodle-2"
                p={{ base: 5, md: 8 }}
                position="relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Box position="absolute" top="-3" left="33%" transform="rotate(var(--theme-rot-3))" w="5rem" className="washi bg-washi-yellow" />
                
                <HStack gap={5} flexWrap="wrap" alignItems="flex-start">
                  {/* Polaroid Avatar Mock */}
                  <Box
                    bg="white"
                    p={2}
                    pb={6}
                    boxShadow="sm"
                    transform="rotate(var(--theme-rot-3))"
                    w="96px"
                    border="1px solid #eaeaea"
                  >
                    <Box
                      w="100%"
                      aspectRatio="1"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      fontSize="4xl"
                      bgGradient="linear(to-br, orange.300, pink.300)"
                      fontFamily="heading"
                    >
                      <span style={{ filter: "drop-shadow(1px 1px 0 rgba(0,0,0,0.2))" }}>
                        {displayName[0].toUpperCase()}
                      </span>
                    </Box>
                  </Box>

                  <Box flex={1} pt={2}>
                    <HStack gap={2} mb={1} flexWrap="wrap">
                      <Heading
                        as="h1"
                        size="xl"
                        color="brand.ink"
                        fontFamily="heading"
                      >
                        {displayName}
                      </Heading>
                      {creator.user.isPremium && (
                        <Badge
                          bg="brand.markerYellow"
                          color="brand.ink"
                          fontSize="xs"
                          borderRadius="sm"
                          px={2}
                          border="1px solid"
                          borderColor="brand.ink"
                        >
                          ⭐ Premium
                        </Badge>
                      )}
                    </HStack>

                    {creator.user.bio && (
                      <Text color="brand.inkSoft" fontSize="md" mb={2} fontFamily="heading">
                        {creator.user.bio}
                      </Text>
                    )}

                    <HStack gap={4} fontSize="xs" color="brand.inkSoft" fontFamily="body">
                      <Text>{creator.stats.tipCount} tips</Text>
                      <Text>•</Text>
                      <Text>{Number(creator.stats.totalTipsReceived).toFixed(2)} SOL received</Text>
                    </HStack>
                  </Box>
                </HStack>

                {/* Actions Row */}
                <HStack mt={6} gap={2} px={2}>
                  <HStack fontSize="xs" color={isConnected ? "brand.markerGreen" : "brand.inkSoft"} gap={1}>
                    <Box className={isConnected ? "pulse-dot" : undefined} w="8px" h="8px" borderRadius="full" bg={isConnected ? "brand.markerGreen" : "gray.300"} />
                    <Text fontWeight="bold">{isConnected ? "Live" : "Connecting..."}</Text>
                  </HStack>
                  <Box flex={1} />
                  <Button
                    variant="ghost"
                    size="xs"
                    color="brand.inkSoft"
                    _hover={{ color: "brand.ink", bg: "brand.paperDeep" }}
                    onClick={() => setIsSettingsOpen(true)}
                    borderRadius="md"
                    fontFamily="body"
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
                <Heading as="h3" size="md" color="brand.ink" mb={6} fontFamily="heading">
                  <span className="marker-highlight">tip wall ({tips.length})</span>
                </Heading>
                {tips.length > 0 ? (
                  <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }} gap={4}>
                    {tips.map((tip, i) => {
                      const colorClass = i % 3 === 0 ? "pink" : i % 3 === 1 ? "cyan" : "";
                      const rotation = i % 2 === 0 ? "rotate(1.5deg)" : "rotate(-1.5deg)";
                      return (
                        <MotionBox
                          key={tip.id}
                          className={`sticky-note ${colorClass}`}
                          style={{ transform: rotation }}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.3, delay: 0.05 * i }}
                        >
                          <Box position="absolute" top="-2" left="50%" transform="translateX(-50%)" w={3} h={3} bg="brand.markerRed" borderRadius="full" boxShadow="sm" border="1px solid var(--theme-card-border)" />
                          <HStack justifyContent="space-between" mb={2}>
                            <Text fontWeight="bold" color="brand.inkSoft" fontSize="xs" fontFamily="body">
                              @{tip.donorName || "anonymous"}
                            </Text>
                            <Badge
                              bg="transparent"
                              color="brand.ink"
                              border="1px solid"
                              borderColor="brand.ink"
                              borderRadius="full"
                              px={2}
                              fontSize="xs"
                              fontFamily="body"
                            >
                              ◎ {Number(tip.amount).toFixed(2)}
                            </Badge>
                          </HStack>
                          {tip.message && (
                            <Text color="brand.ink" fontSize="lg" mb={2} fontFamily="heading" lineHeight="1.3">
                              {tip.message}
                            </Text>
                          )}
                          <Text fontSize="2xs" color="brand.inkSoft" fontFamily="body">
                            {new Date(tip.createdAt).toLocaleDateString()}
                          </Text>
                        </MotionBox>
                      );
                    })}
                  </Grid>
                ) : (
                  <Box className="border-sketch" p={8} textAlign="center" borderStyle="dashed">
                    <Text color="brand.inkSoft" fontSize="md" fontFamily="heading">
                      no notes here yet. be the first to stick one! 🍃
                    </Text>
                  </Box>
                )}
              </MotionBox>
            </VStack>
          </GridItem>

          {/* ── Right Column: Tip Form + Leaderboard ── */}
          <GridItem>
            <VStack gap={8} align="stretch" position={{ lg: "sticky" }} top={{ lg: "40px" }}>
              {/* Tip Form Card */}
              <MotionBox
                className="paper-card"
                p={{ base: 5, md: 6 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Heading as="h2" size="lg" color="brand.ink" mb={4} fontFamily="heading">
                  send a tip
                </Heading>

                {/* Success Message */}
                {successMessage && (
                  <Box
                    p={3}
                    borderRadius="md"
                    bg="brand.markerGreen"
                    border="2px solid"
                    borderColor="brand.ink"
                    display="flex"
                    alignItems="flex-start"
                    gap={2}
                    mb={4}
                  >
                    <FiCheck style={{ marginTop: "2px", color: "var(--theme-text)", flexShrink: 0 }} />
                    <Text fontSize="sm" color="brand.ink" fontFamily="body" fontWeight="bold">{successMessage}</Text>
                  </Box>
                )}

                {/* Error Message */}
                {errorMessage && (
                  <Box
                    p={3}
                    borderRadius="md"
                    bg="brand.markerRed"
                    border="2px solid"
                    borderColor="brand.ink"
                    display="flex"
                    alignItems="flex-start"
                    gap={2}
                    mb={4}
                  >
                    <FiAlertCircle style={{ marginTop: "2px", color: "var(--theme-bg)", flexShrink: 0 }} />
                    <Text fontSize="sm" color="brand.paper" fontFamily="body" fontWeight="bold">{errorMessage}</Text>
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
                className="border-sketch"
                p={{ base: 5, md: 6 }}
                bg="brand.paperDeep"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Heading as="h3" size="md" color="brand.ink" mb={4} fontFamily="heading">
                  🏆 top supporters
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
