/**
 * Dashboard Page — Creator Control Center
 *
 * Shows:
 * 1. Creator profile summary with share link
 * 2. Platform stats in sketchy cards
 * 3. Quick actions (open public page, edit profile)
 *
 * Falls back to registration prompt if no creator data found.
 */

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  Spinner,
  Text,
  VStack,
  Grid,
  GridItem,
  Input,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Head from "next/head";
import { FiCopy, FiExternalLink, FiCheck } from "react-icons/fi";
import { getStoredCreator, type StoredCreator } from "@/lib/creatorStorage";

interface PlatformStats {
  totalTipsCount: number;
  totalVolumeSol: string;
  platformFeeCollected: string;
  uniqueDonors: number;
  uniqueCreators: number;
  premiumUsersCount: number;
}

const MotionBox = motion(Box);

export default function DashboardPage() {
  const router = useRouter();
  const [creator, setCreator] = useState<StoredCreator | null>(null);
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCreator(getStoredCreator());
  }, []);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await fetch("/api/stats");
        if (response.ok) {
          setStats(await response.json());
        }
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  const profileUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/u/${creator?.username || "demo"}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // ── Dashboard ──
  return (
    <>
      <Head>
        <title>Dashboard — PuffTip</title>
      </Head>
      <Container maxW="container.lg" py="var(--section-py)">
        <VStack gap={8} align="stretch">
          
          {/* ── Unregistered Banner ── */}
          {!creator && !loading && (
            <MotionBox
              className="glass-card"
              p={6}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <HStack justifyContent="space-between" flexWrap="wrap" gap={4}>
                <Box>
                  <Heading size="md" color="brand.ink" fontFamily="heading">
                    Viewing in Demo Mode 👀
                  </Heading>
                  <Text color="brand.inkSoft" fontSize="sm" mt={1} fontFamily="body">
                    Register your wallet to claim your custom tip page and track your personal earnings.
                  </Text>
                </Box>
                <button className="premium-btn primary" style={{ fontSize: "14px", padding: "8px 20px" }} onClick={() => router.push("/register")}>
                  Register Now →
                </button>
              </HStack>
            </MotionBox>
          )}
          
          {/* ── Profile Header ── */}
          <MotionBox
            className="glass-card"
            p={{ base: 5, md: 8 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            position="relative"
          >
            <Box position="absolute" top="-10px" left="20px" transform="rotate(calc(var(--theme-rot-3) * 1.5))" w="4rem" className="washi bg-washi-pink" />
            <HStack justifyContent="space-between" flexWrap="wrap" gap={4} mt={2}>
              <Box>
                <Text fontSize="xs" color="brand.solana" mb={1} textTransform="uppercase" letterSpacing="wider" fontWeight="700" fontFamily="body">
                  Creator Dashboard
                </Text>
                <Heading size="2xl" color="brand.ink" fontFamily="heading">
                  {creator?.displayName || "Your Dashboard"}
                </Heading>
                <Text color="brand.inkSoft" mt={1} fontSize="sm">
                  {creator?.bio || "Manage your PuffTip profile and track activity."}
                </Text>
              </Box>

              {/* Avatar circle with initials */}
              <Box
                w={16}
                h={16}
                borderRadius="full"
                bg="brand.markerRed"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="2xl"
                fontWeight="700"
                fontFamily="heading"
                color="brand.paper"
                flexShrink={0}
                border="2px solid"
                borderColor="brand.ink"
                transform="rotate(calc(var(--theme-rot-2) * 2.5))"
              >
                {(creator?.displayName || creator?.username || "?")[0].toUpperCase()}
              </Box>
            </HStack>
          </MotionBox>

          {/* ── Share Link ── */}
          <MotionBox
            className="glass-card"
            p={4}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            bg="brand.paperDeep"
          >
            <Text fontSize="sm" color="brand.ink" mb={2} fontWeight="600" fontFamily="body">
              YOUR TIP PAGE
            </Text>
            <HStack gap={2}>
              <Input
                value={profileUrl}
                readOnly
                size="sm"
                flex={1}
                fontSize="sm"
                color="brand.inkSoft"
                bg="brand.paper"
                borderColor="brand.ink"
              />
              <Button
                size="sm"
                bg="brand.paper"
                border="2px solid"
                borderColor="brand.ink"
                color="brand.ink"
                _hover={{ bg: "brand.paperDeep" }}
                onClick={handleCopy}
                borderRadius="md"
                minW="80px"
              >
                {copied ? <><FiCheck size={14} /> Copied</> : <><FiCopy size={14} /> Copy</>}
              </Button>
              <Button
                size="sm"
                bg="brand.markerYellow"
                border="2px solid"
                borderColor="brand.ink"
                color="brand.ink"
                _hover={{ transform: "rotate(var(--theme-rot-1))" }}
                onClick={() => router.push(`/u/${creator?.username || "demo"}`)}
                borderRadius="md"
              >
                <FiExternalLink size={14} />
              </Button>
            </HStack>
          </MotionBox>

          {/* ── Quick Actions ── */}
          <HStack gap={3} flexWrap="wrap">
            <Button
              bg="brand.ink"
              color="brand.paper"
              className="shadow-sticker"
              _hover={{ transform: "rotate(-2deg) translateY(-1px)", opacity: 0.9 }}
              transition="all 0.2s"
              borderRadius="md"
              fontFamily="heading"
              fontSize="lg"
              onClick={() => router.push(`/u/${creator?.username || "demo"}`)}
            >
              Open Public Page
            </Button>
            <Button
              bg="transparent"
              color="brand.inkSoft"
              border="2px solid"
              borderColor="brand.inkSoft"
              _hover={{ bg: "brand.paperDeep", color: "brand.ink", borderColor: "brand.ink" }}
              borderRadius="md"
              fontFamily="body"
              onClick={() => router.push("/")}
            >
              Back to Home
            </Button>
          </HStack>

          {/* ── Stats Grid ── */}
          <Box>
            <Heading size="lg" color="brand.ink" mb={4} fontFamily="heading">
              <span className="marker-highlight">Platform Overview</span>
            </Heading>
            {loading ? (
              <VStack py={8}>
                <Spinner color="brand.ink" />
              </VStack>
            ) : (
              <Grid
                templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
                gap={4}
              >
                {[
                  { label: "Total Tips", value: stats?.totalTipsCount ?? 0, icon: "💸" },
                  { label: "Volume", value: `${Number(stats?.totalVolumeSol ?? 0).toFixed(2)} SOL`, icon: "📊" },
                  { label: "Creators", value: stats?.uniqueCreators ?? 0, icon: "🎨" },
                  { label: "Supporters", value: stats?.uniqueDonors ?? 0, icon: "❤️" },
                  { label: "Fees Earned", value: `${Number(stats?.platformFeeCollected ?? 0).toFixed(2)} SOL`, icon: "🏦" },
                  { label: "Premium Users", value: stats?.premiumUsersCount ?? 0, icon: "⭐" },
                ].map((stat, i) => (
                  <GridItem key={stat.label}>
                    <MotionBox
                      className="paper-card"
                      p={5}
                      textAlign="center"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.05 * i }}
                    >
                      <Text fontSize="2xl" mb={1}>{stat.icon}</Text>
                      <Text fontSize="xs" color="brand.inkSoft" mb={1} textTransform="uppercase" letterSpacing="wider">
                        {stat.label}
                      </Text>
                      <Heading size="lg" color="brand.ink" fontFamily="heading">
                        {stat.value}
                      </Heading>
                    </MotionBox>
                  </GridItem>
                ))}
              </Grid>
            )}
          </Box>

          {/* ── Wallet Info ── */}
          <Box className="border-sketch" p={4} borderStyle="dashed">
            <Text fontSize="xs" color="brand.inkSoft" mb={1} fontFamily="body">Connected Wallet</Text>
            <Text fontSize="sm" color="brand.ink" fontFamily="monospace">
              {creator?.walletAddress || "Not connected"}
            </Text>
          </Box>
        </VStack>
      </Container>
    </>
  );
}
