/**
 * Dashboard Page — Creator Control Center
 *
 * Shows:
 * 1. Creator profile summary with share link
 * 2. Platform stats in glassmorphism cards
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
      <Container maxW="container.lg" py={{ base: 8, md: 16 }}>
        <VStack gap={8} align="stretch">
          
          {/* ── Unregistered Banner ── */}
          {!creator && !loading && (
            <MotionBox
              className="glass-strong"
              p={6}
              bg="rgba(121, 40, 202, 0.15)"
              borderColor="rgba(121, 40, 202, 0.3)"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <HStack justifyContent="space-between" flexWrap="wrap" gap={4}>
                <Box>
                  <Heading size="sm" color="white" fontFamily="'Fredoka', sans-serif">
                    Viewing in Demo Mode 👀
                  </Heading>
                  <Text color="whiteAlpha.700" fontSize="sm" mt={1}>
                    Register your wallet to claim your custom tip page and track your personal earnings.
                  </Text>
                </Box>
                <Button
                  size="sm"
                  bg="linear-gradient(135deg, #7928CA 0%, #FF0080 100%)"
                  color="white"
                  _hover={{ opacity: 0.9 }}
                  borderRadius="lg"
                  onClick={() => router.push("/register")}
                >
                  Register Now
                </Button>
              </HStack>
            </MotionBox>
          )}
          {/* ── Profile Header ── */}
          <MotionBox
            className="glass-strong"
            p={{ base: 5, md: 8 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <HStack justifyContent="space-between" flexWrap="wrap" gap={4}>
              <Box>
                <Text fontSize="xs" color="whiteAlpha.400" mb={1} textTransform="uppercase" letterSpacing="wider">
                  Creator Dashboard
                </Text>
                <Heading size="xl" color="white" fontFamily="'Fredoka', sans-serif">
                  {creator?.displayName || "Your Dashboard"}
                </Heading>
                <Text color="whiteAlpha.500" mt={1} fontSize="sm">
                  {creator?.bio || "Manage your PuffTip profile and track activity."}
                </Text>
              </Box>

              {/* Avatar circle with initials */}
              <Box
                w={16}
                h={16}
                borderRadius="full"
                bg="linear-gradient(135deg, #7928CA, #FF0080)"
                display="flex"
                alignItems="center"
                justifyContent="center"
                fontSize="xl"
                fontWeight="700"
                color="white"
                flexShrink={0}
              >
                {(creator?.displayName || creator?.username || "?")[0].toUpperCase()}
              </Box>
            </HStack>
          </MotionBox>

          {/* ── Share Link ── */}
          <MotionBox
            className="glass"
            p={4}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Text fontSize="xs" color="whiteAlpha.400" mb={2} fontWeight="600">
              YOUR TIP PAGE
            </Text>
            <HStack gap={2}>
              <Input
                value={profileUrl}
                readOnly
                size="sm"
                flex={1}
                fontSize="sm"
                color="whiteAlpha.700"
              />
              <Button
                size="sm"
                variant="outline"
                borderColor="whiteAlpha.200"
                color="whiteAlpha.700"
                _hover={{ bg: "whiteAlpha.100" }}
                onClick={handleCopy}
                borderRadius="lg"
                minW="80px"
              >
                {copied ? <><FiCheck size={14} /> Copied</> : <><FiCopy size={14} /> Copy</>}
              </Button>
              <Button
                size="sm"
                bg="linear-gradient(135deg, #7928CA, #FF0080)"
                color="white"
                _hover={{ opacity: 0.9 }}
                onClick={() => router.push(`/u/${creator?.username || "demo"}`)}
                borderRadius="lg"
              >
                <FiExternalLink size={14} />
              </Button>
            </HStack>
          </MotionBox>

          {/* ── Quick Actions ── */}
          <HStack gap={3} flexWrap="wrap">
            <Button
              bg="linear-gradient(135deg, #7928CA 0%, #FF0080 100%)"
              color="white"
              _hover={{ opacity: 0.9, transform: "translateY(-1px)" }}
              transition="all 0.3s"
              borderRadius="xl"
              onClick={() => router.push(`/u/${creator?.username || "demo"}`)}
            >
              Open Public Page
            </Button>
            <Button
              variant="outline"
              color="whiteAlpha.700"
              borderColor="whiteAlpha.200"
              _hover={{ bg: "whiteAlpha.100" }}
              borderRadius="xl"
              onClick={() => router.push("/")}
            >
              Back to Home
            </Button>
          </HStack>

          {/* ── Stats Grid ── */}
          <Box>
            <Heading size="md" color="white" mb={4} fontFamily="'Fredoka', sans-serif">
              Platform Overview
            </Heading>
            {loading ? (
              <VStack py={8}>
                <Spinner color="purple.400" />
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
                      className="glass glass-hover"
                      p={5}
                      textAlign="center"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.05 * i }}
                    >
                      <Text fontSize="2xl" mb={1}>{stat.icon}</Text>
                      <Text fontSize="xs" color="whiteAlpha.500" mb={1} textTransform="uppercase" letterSpacing="wider">
                        {stat.label}
                      </Text>
                      <Heading size="md" color="white" fontFamily="'Fredoka', sans-serif">
                        {stat.value}
                      </Heading>
                    </MotionBox>
                  </GridItem>
                ))}
              </Grid>
            )}
          </Box>

          {/* ── Wallet Info ── */}
          <Box className="glass" p={4}>
            <Text fontSize="xs" color="whiteAlpha.400" mb={1}>Connected Wallet</Text>
            <Text fontSize="sm" color="whiteAlpha.600" fontFamily="monospace">
              {creator?.walletAddress || "Not connected"}
            </Text>
          </Box>
        </VStack>
      </Container>
    </>
  );
}
