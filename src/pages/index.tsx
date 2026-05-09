/**
 * Home Page — PuffTip Landing
 *
 * The first thing users see. Designed to:
 * 1. Wow with animated hero + gradient text
 * 2. Explain the product in 3 simple steps
 * 3. Show platform stats with glassmorphism cards
 * 4. Clear CTAs for creators and supporters
 *
 * No wallet required to view — connects when user clicks CTA.
 */

import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Container,
  Grid,
  GridItem,
  HStack,
  Spinner,
} from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import { FiZap, FiUsers, FiShield } from "react-icons/fi";

interface Stats {
  totalTipsCount: number;
  totalVolumeSol: string;
  platformFeeCollected: string;
  uniqueDonors: number;
  uniqueCreators: number;
  premiumUsersCount: number;
}

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

export default function Home() {
  const { connected } = useWallet();
  const router = useRouter();

  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      <Head>
        <title>PuffTip — Instant Solana Tips for Creators</title>
      </Head>

      {/* ── Hero Section ──────────────────────────── */}
      <Container maxW="container.lg" py={{ base: 16, md: 24 }}>
        <VStack gap={8} alignItems="center" textAlign="center">
          {/* Badge */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              className="glass"
              px={4}
              py={1.5}
              borderRadius="full"
              display="inline-flex"
              alignItems="center"
              gap={2}
            >
              <Box className="pulse-dot" />
              <Text fontSize="xs" color="whiteAlpha.700" fontWeight="600">
                Live on Solana Devnet
              </Text>
            </Box>
          </MotionBox>

          {/* Main Heading */}
          <MotionHeading
            as="h1"
            fontSize={{ base: "3xl", md: "5xl", lg: "6xl" }}
            fontFamily="'Bangers', system-ui"
            letterSpacing="2px"
            lineHeight="1.1"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="gradient-text">Tips Hit Different</span>
            <br />
            <Text as="span" color="white" fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}>
              When They&apos;re On-Chain
            </Text>
          </MotionHeading>

          {/* Subtitle */}
          <MotionText
            fontSize={{ base: "md", md: "lg" }}
            color="whiteAlpha.600"
            maxW="550px"
            lineHeight="1.7"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            The easiest way for creators to receive instant tips in SOL.
            Zero middlemen. Real-time notifications. Your wallet, your money.
          </MotionText>

          {/* CTA Buttons */}
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <HStack gap={4} flexWrap="wrap" justifyContent="center">
              {connected ? (
                <>
                  <Button
                    size="lg"
                    bg="linear-gradient(135deg, #7928CA 0%, #FF0080 100%)"
                    color="white"
                    _hover={{ opacity: 0.9, transform: "translateY(-2px)" }}
                    transition="all 0.3s"
                    borderRadius="xl"
                    px={8}
                    onClick={() => router.push("/register")}
                    boxShadow="0 4px 20px rgba(121, 40, 202, 0.4)"
                  >
                    🍃 Start as Creator
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    color="whiteAlpha.800"
                    borderColor="whiteAlpha.200"
                    _hover={{ bg: "whiteAlpha.100", borderColor: "whiteAlpha.300" }}
                    borderRadius="xl"
                    px={8}
                    onClick={() => router.push("/u/demo")}
                  >
                    Support a Creator
                  </Button>
                </>
              ) : (
                <Text color="whiteAlpha.500" fontSize="sm">
                  Connect your wallet above to get started →
                </Text>
              )}
            </HStack>
          </MotionBox>
        </VStack>
      </Container>

      {/* ── How It Works ─────────────────────────── */}
      <Container maxW="container.lg" py={16}>
        <VStack gap={12}>
          <Heading
            as="h2"
            fontSize={{ base: "xl", md: "2xl" }}
            fontFamily="'Fredoka', sans-serif"
            color="white"
            textAlign="center"
          >
            How It Works
          </Heading>

          <Grid
            templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
            gap={6}
            w="full"
          >
            {[
              {
                icon: <FiZap size={24} />,
                title: "1. Connect Wallet",
                desc: "Link your Solana wallet (Phantom, Solflare, etc.) — no passwords, no emails.",
                color: "#7928CA",
              },
              {
                icon: <FiUsers size={24} />,
                title: "2. Create Profile",
                desc: "Pick a username, write a bio. Your tip page goes live instantly at /u/yourname.",
                color: "#FF0080",
              },
              {
                icon: <FiShield size={24} />,
                title: "3. Receive Tips",
                desc: "Share your link. Supporters send SOL directly — 95% goes to you, 5% platform fee.",
                color: "#00BFFF",
              },
            ].map((step, i) => (
              <MotionBox
                key={step.title}
                className="glass glass-hover"
                p={6}
                textAlign="center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
              >
                <Box
                  display="inline-flex"
                  p={3}
                  borderRadius="xl"
                  bg={`${step.color}20`}
                  color={step.color}
                  mb={4}
                >
                  {step.icon}
                </Box>
                <Heading as="h3" size="sm" color="white" mb={2} fontFamily="'Fredoka', sans-serif">
                  {step.title}
                </Heading>
                <Text fontSize="sm" color="whiteAlpha.600" lineHeight="1.6">
                  {step.desc}
                </Text>
              </MotionBox>
            ))}
          </Grid>
        </VStack>
      </Container>

      {/* ── Platform Stats ───────────────────────── */}
      <Container maxW="container.lg" py={16}>
        <VStack gap={8}>
          <Heading
            as="h2"
            fontSize={{ base: "xl", md: "2xl" }}
            fontFamily="'Fredoka', sans-serif"
            color="white"
            textAlign="center"
          >
            Platform Stats
          </Heading>

          {loading ? (
            <VStack py={8}>
              <Spinner size="lg" color="purple.400" />
            </VStack>
          ) : stats ? (
            <Grid
              templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
              gap={4}
              w="full"
            >
              {[
                { label: "Total Tips", value: stats.totalTipsCount.toLocaleString(), icon: "💸" },
                { label: "Volume", value: `${Number(stats.totalVolumeSol).toFixed(2)} SOL`, icon: "📊" },
                { label: "Creators", value: stats.uniqueCreators.toLocaleString(), icon: "🎨" },
                { label: "Supporters", value: stats.uniqueDonors.toLocaleString(), icon: "❤️" },
                { label: "Platform Fees", value: `${Number(stats.platformFeeCollected).toFixed(2)} SOL`, icon: "🏦" },
                { label: "Premium", value: stats.premiumUsersCount.toLocaleString(), icon: "⭐" },
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
          ) : null}
        </VStack>
      </Container>
    </>
  );
}
