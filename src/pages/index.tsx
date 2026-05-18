/**
 * Home Page — Clean Marketing Landing
 *
 * Sections:
 * 1. Hero — clean headline, subtitle, CTAs, social proof
 * 2. Features — 8 built features in clean cards
 * 3. How It Works — 3-step timeline
 * 4. Streamers — featured creator grid
 * 5. Why Solana — blockchain advantage
 * 6. CTA — conversion section
 * 7. Stats — live platform numbers
 */

import {
  Box, VStack, Heading, Text, Button, Container,
  Grid, GridItem, HStack, Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import Link from "next/link";

interface Stats {
  totalTipsCount: number;
  totalVolumeSol: string;
  platformFeeCollected: string;
  uniqueDonors: number;
  uniqueCreators: number;
  premiumUsersCount: number;
}

const M = motion(Box);

const FEATURES = [
  { icon: "🖥️", title: "OBS Overlay", desc: "One browser source URL. Tips appear on stream as animated notifications in real-time." },
  { icon: "⚡", title: "Instant SOL", desc: "Tips hit your wallet in under a second. No holding periods, no minimum payout." },
  { icon: "🌐", title: "WebSocket Live", desc: "Tips are pushed instantly via WebSocket. Your overlay stays perfectly in sync." },
  { icon: "🔔", title: "Notification System", desc: "Toast, modal, slide-in, or banner — you pick what fits your stream." },
  { icon: "📓", title: "Tip Wall", desc: "Every tip shows as a sticky note on your page. Viewers see the conversation live." },
  { icon: "🏆", title: "Donor Leaderboard", desc: "Top supporters ranked by total tips. Give your biggest fans recognition." },
  { icon: "📊", title: "Creator Dashboard", desc: "Track tips, earnings, supporter count. Manage everything from one place." },
  { icon: "🎨", title: "Dual Themes", desc: "Notebook for the hand-drawn vibe, Studio for sleek dark mode." },
];

const STREAMERS = [
  { emoji: "🎸", name: "Smokey Jazz", handle: "smokeyjazz", bio: "late-night chill streams + lo-fi sets", fans: "12.4k", sol: "413", isLive: true },
  { emoji: "👻", name: "Ghost Roast", handle: "ghostroast", bio: "horror speedruns w/ commentary", fans: "48.1k", sol: "1820", isLive: true },
  { emoji: "💻", name: "Late Shift", handle: "lateshift", bio: "we code at 3am", fans: "6.2k", sol: "88", isLive: false },
  { emoji: "🍜", name: "Miso Kitchen", handle: "misokitchen", bio: "ramen, knives, chaos", fans: "21.7k", sol: "522", isLive: false },
  { emoji: "🚀", name: "Zero-G Pete", handle: "zerogpete", bio: "factorio rocket builds", fans: "33.9k", sol: "778", isLive: true },
  { emoji: "📷", name: "Polaroid Kid", handle: "polaroid_kid", bio: "indie photo walks + chats", fans: "4.1k", sol: "42", isLive: false },
];

export default function Home() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stats").then(r => r.ok ? r.json() : null).then(setStats).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Head>
        <title>PuffTip — The Solana Tipping Platform for Streamers</title>
        <meta name="description" content="Get tipped in SOL with real-time OBS alerts, WebSocket delivery, donor leaderboards, and a custom creator page. Built on Solana." />
      </Head>

      {/* ═══ HERO ═══ */}
      <Box position="relative" overflow="hidden">
        <Box className="hero-glow" />
        <Box className="hero-glow-2" />

        <Container maxW="container.lg" py={{ base: "5rem", md: "8rem" }} position="relative" zIndex={2}>
          <VStack gap={6} textAlign="center" maxW="680px" mx="auto">
            <M initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Heading as="h1" fontSize={{ base: "3xl", sm: "5xl", lg: "6xl" }} fontFamily="heading" lineHeight="1.08" color="brand.ink">
                The next-gen{" "}
                <Box as="span" className="gradient-text">tipping platform</Box>
                {" "}for streamers
              </Heading>
            </M>

            <M initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <Text fontSize={{ base: "md", md: "lg" }} color="brand.inkSoft" fontFamily="body" maxW="520px" lineHeight="1.7">
                Get tipped in SOL with real-time OBS alerts, animated notifications, a donor leaderboard, and your own creator page. Set up in 90 seconds.
              </Text>
            </M>

            <M initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <HStack gap={3} flexWrap="wrap" justifyContent="center" mt={2}>
                <button className="premium-btn primary" onClick={() => router.push("/register")}>
                  Start Getting Tipped →
                </button>
                <button className="premium-btn secondary" onClick={() => router.push("/for-creators")}>
                  See What You Get
                </button>
              </HStack>
            </M>

            <M initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
              <HStack gap={8} mt={6} flexWrap="wrap" justifyContent="center">
                {[
                  { val: "Sub-second", label: "finality" },
                  { val: "<$0.001", label: "per tx" },
                  { val: "95%", label: "to creator" },
                ].map(s => (
                  <VStack key={s.label} gap={0}>
                    <Text fontFamily="heading" fontWeight="700" fontSize="lg" color="brand.ink">{s.val}</Text>
                    <Text fontFamily="body" fontSize="xs" color="brand.inkSoft">{s.label}</Text>
                  </VStack>
                ))}
              </HStack>
            </M>
          </VStack>
        </Container>
      </Box>

      {/* ═══ FEATURES ═══ */}
      <Container maxW="container.lg" py="var(--section-py)">
        <VStack gap={3} mb={10} textAlign="center">
          <Heading as="h2" fontSize={{ base: "2xl", md: "4xl" }} fontFamily="heading" color="brand.ink">
            Everything a streamer needs
          </Heading>
          <Text fontFamily="body" fontSize="md" color="brand.inkSoft" maxW="500px">
            Not another generic tip jar. Every feature is built for live content creators.
          </Text>
        </VStack>

        <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr", lg: "repeat(4, 1fr)" }} gap={4}>
          {FEATURES.map((f, i) => (
            <M key={f.title} className="glass-card" p={5} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.03 * i }}>
              <Text fontSize="2xl" mb={3}>{f.icon}</Text>
              <Text fontFamily="heading" fontSize="sm" fontWeight="700" color="brand.ink" mb={1}>{f.title}</Text>
              <Text fontFamily="body" fontSize="xs" color="brand.inkSoft" lineHeight="1.6">{f.desc}</Text>
            </M>
          ))}
        </Grid>
      </Container>

      {/* ═══ HOW IT WORKS ═══ */}
      <Container maxW="container.lg" py="var(--section-py)">
        <VStack gap={3} mb={10} textAlign="center">
          <Heading as="h2" fontSize={{ base: "2xl", md: "4xl" }} fontFamily="heading" color="brand.ink">
            Go live in three steps
          </Heading>
        </VStack>

        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
          {[
            { num: "01", title: "Create your page", desc: "Claim your @handle, connect your Solana wallet, write your bio. Takes 90 seconds.", icon: "📓" },
            { num: "02", title: "Wire up OBS", desc: "Paste a single browser source URL. Tips show up on stream with sound alerts.", icon: "🖥️" },
            { num: "03", title: "Get tipped in SOL", desc: "Viewers send SOL with a message. Money lands in your wallet instantly.", icon: "◎" },
          ].map((step, i) => (
            <M key={step.num} className="glass-card" p={6} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.08 * i }}>
              <HStack justifyContent="space-between" mb={4}>
                <Text fontFamily="heading" fontSize="3xl" fontWeight="700" className="gradient-text">{step.num}</Text>
                <Text fontSize="2xl">{step.icon}</Text>
              </HStack>
              <Text fontFamily="heading" fontSize="lg" fontWeight="700" color="brand.ink" mb={2}>{step.title}</Text>
              <Text fontFamily="body" fontSize="sm" color="brand.inkSoft" lineHeight="1.6">{step.desc}</Text>
            </M>
          ))}
        </Grid>
      </Container>

      {/* ═══ STREAMERS ═══ */}
      <Container maxW="container.lg" py="var(--section-py)">
        <HStack justifyContent="space-between" alignItems="baseline" mb={8} flexWrap="wrap" gap={4}>
          <Heading as="h2" fontSize={{ base: "2xl", md: "4xl" }} fontFamily="heading" color="brand.ink">People on PuffTip</Heading>
          <Link href="/explore" style={{ textDecoration: "none" }}>
            <Text fontFamily="body" fontSize="sm" color="brand.inkSoft" fontWeight="500" _hover={{ color: "brand.ink" }}>see all →</Text>
          </Link>
        </HStack>

        <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr", lg: "repeat(3, 1fr)" }} gap={4}>
          {STREAMERS.map((s, i) => (
            <M key={s.handle} className="streamer-card" p={5} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.04 * i }} onClick={() => router.push(`/u/${s.handle}`)}>
              <HStack gap={3} mb={3}>
                <Box w={11} h={11} borderRadius="full" bg="brand.paperDeep" display="flex" alignItems="center" justifyContent="center" fontSize="xl" border="1.5px solid" borderColor="var(--theme-card-border)" flexShrink={0}>{s.emoji}</Box>
                <Box flex={1} minW={0}>
                  <HStack gap={2} alignItems="center">
                    <Text fontFamily="heading" fontSize="md" fontWeight="700" color="brand.ink" lineClamp={1}>{s.name}</Text>
                    {s.isLive && <Box className="live-badge"><Box className="live-dot" />LIVE</Box>}
                  </HStack>
                  <Text fontFamily="body" fontSize="xs" color="brand.inkSoft">@{s.handle}</Text>
                </Box>
              </HStack>
              <Text fontFamily="body" fontSize="xs" color="brand.inkSoft" mb={3} lineHeight="1.5">{s.bio}</Text>
              <HStack gap={4}>
                <Text className="stat-pill">{s.fans} fans</Text>
                <Text className="stat-pill">◎ {s.sol} SOL</Text>
              </HStack>
            </M>
          ))}
        </Grid>
      </Container>

      {/* ═══ WHY SOLANA ═══ */}
      <Box className="cta-section" py="var(--section-py)">
        <Container maxW="container.lg">
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={10} alignItems="center">
            <Box>
              <Heading as="h2" fontSize={{ base: "2xl", md: "4xl" }} fontFamily="heading" color="brand.ink" mb={4}>
                Built for speed,{" "}
                <Box as="span" className="gradient-text">built for creators</Box>
              </Heading>
              <Text fontFamily="body" fontSize="md" color="brand.inkSoft" lineHeight="1.7">
                Traditional tipping platforms take 30-50% in fees, hold your money for weeks, and require complex payouts. PuffTip settles every tip directly to your wallet in under a second.
              </Text>
            </Box>
            <Grid templateColumns="1fr 1fr" gap={4}>
              {[
                { val: "<1s", label: "Settlement time" },
                { val: "<$0.001", label: "Transaction cost" },
                { val: "95%", label: "Goes to creator" },
                { val: "0", label: "Holding period" },
              ].map((stat, i) => (
                <M key={stat.label} className="glass-card" p={5} textAlign="center" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35, delay: 0.06 * i }}>
                  <Text fontFamily="heading" fontSize="2xl" fontWeight="700" className="gradient-text">{stat.val}</Text>
                  <Text fontFamily="body" fontSize="xs" color="brand.inkSoft" mt={1}>{stat.label}</Text>
                </M>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ═══ CTA ═══ */}
      <Container maxW="container.md" py="var(--section-py)" textAlign="center">
        <M initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
          <Heading as="h2" fontSize={{ base: "2xl", md: "4xl" }} fontFamily="heading" color="brand.ink" mb={4}>
            Start getting tipped{" "}
            <Box as="span" className="gradient-text">tonight</Box>
          </Heading>
          <Text fontFamily="body" fontSize="md" color="brand.inkSoft" maxW="lg" mx="auto" mb={8} lineHeight="1.7">
            Grab your handle. Paste an OBS URL. Start collecting SOL from your community in minutes.
          </Text>
          <HStack gap={3} justifyContent="center" flexWrap="wrap">
            <button className="premium-btn primary" onClick={() => router.push("/register")}>
              Create Your Page →
            </button>
            <button className="premium-btn secondary" onClick={() => router.push("/demos")}>
              See Live Demos
            </button>
          </HStack>
        </M>
      </Container>

      {/* ═══ STATS ═══ */}
      {stats && (
        <Container maxW="container.lg" py="var(--section-py)">
          <VStack gap={3} mb={8} textAlign="center">
            <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }} fontFamily="heading" color="brand.ink">Platform Stats</Heading>
          </VStack>
          <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }} gap={4}>
            {[
              { label: "Total Tips", value: stats.totalTipsCount.toLocaleString() },
              { label: "SOL Volume", value: `◎ ${Number(stats.totalVolumeSol).toFixed(2)}` },
              { label: "Creators", value: stats.uniqueCreators.toLocaleString() },
              { label: "Supporters", value: stats.uniqueDonors.toLocaleString() },
              { label: "Platform Fees", value: `◎ ${Number(stats.platformFeeCollected).toFixed(2)}` },
              { label: "Premium", value: stats.premiumUsersCount.toLocaleString() },
            ].map((s, i) => (
              <GridItem key={s.label}>
                <M className="glass-card" p={5} textAlign="center" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35, delay: 0.04 * i }}>
                  <Text fontFamily="heading" fontSize="3xl" fontWeight="700" color="brand.ink">{s.value}</Text>
                  <Text fontFamily="body" fontSize="xs" color="brand.inkSoft" letterSpacing="wider" mt={1}>{s.label}</Text>
                </M>
              </GridItem>
            ))}
          </Grid>
        </Container>
      )}

      {loading && (
        <Container maxW="container.lg" py={12}>
          <VStack><Spinner size="lg" color="brand.solana" /></VStack>
        </Container>
      )}
    </>
  );
}
