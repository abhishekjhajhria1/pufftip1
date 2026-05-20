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
  Box,
  VStack,
  Heading,
  Text,
  Container,
  Grid,
  HStack,
  Spinner,
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

const TICKER_ITEMS = [
  "cryptowhale → smokeyjazz · 2.5 SOL",
  "spookz → ghostroast · 5.0 SOL",
  "factorybro → zerogpete · 3.2 SOL",
  "noodlefan → misokitchen · 1.0 SOL",
  "miso → smokeyjazz · 0.5 SOL",
  "devbro → lateshift · 0.4 SOL",
  "anon → polaroid_kid · 0.2 SOL",
  "ghostr → smokeyjazz · 1.2 SOL",
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
      {/* ═══ TOP TICKER ═══ */}
      <Container maxW="container.lg" pt={{ base: "1.5rem", md: "2rem" }}>
        <Box className="ticker">
          <Box className="ticker-track">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <Text key={`${item}-${i}`} className="ticker-item">{item}</Text>
            ))}
          </Box>
        </Box>
      </Container>

      {/* ═══ HERO ═══ */}
      <Container maxW="container.lg" py={{ base: "2.5rem", md: "4rem" }}>
        <Grid templateColumns={{ base: "1fr", md: "1.1fr 0.9fr" }} gap={{ base: 10, md: 12 }} alignItems="center">
          <VStack align="start" gap={5}>
            <Text fontFamily="heading" fontSize="sm" color="brand.inkSoft">★ a streamer tipping notebook</Text>
            <Heading as="h1" fontSize={{ base: "3xl", md: "5xl" }} fontFamily="heading" color="brand.ink" lineHeight="1.05">
              tips with a smoke<br />on the house.
            </Heading>
            <Text fontFamily="body" fontSize={{ base: "md", md: "lg" }} color="brand.inkSoft" lineHeight="1.7">
              pufftip is a <strong>solana</strong> tipping page for streamers — every viewer&apos;s tip arrives in OBS with a note, an animation, and a little compliment from the house. drawn by hand, runs on chain.
            </Text>
            <HStack gap={3} flexWrap="wrap">
              <Link href="/explore" style={{ textDecoration: "none" }}>
                <button className="premium-btn primary">find a streamer →</button>
              </Link>
              <Link href="/u/smokeyjazz" style={{ textDecoration: "none" }}>
                <button className="premium-btn secondary">see a sample page</button>
              </Link>
            </HStack>
            <Text fontFamily="body" fontSize="sm" color="brand.inkSoft">
              {stats
                ? `${stats.totalTipsCount.toLocaleString()} tips sent today · ◎ ${Number(stats.totalVolumeSol).toFixed(2)} volume · 0 sign-ups required`
                : "3,412 tips sent today · ~$48k volume · 0 sign-ups required"}
            </Text>
          </VStack>

          <Box>
            <Box className="hero-card" p={5} position="relative">
              <HStack justifyContent="space-between" mb={4}>
                <HStack gap={2}>
                  <Text fontSize="xl">🎸</Text>
                  <Box>
                    <Text fontFamily="heading" fontSize="md" fontWeight="700" color="brand.ink">smokey jazz</Text>
                    <Text fontFamily="body" fontSize="xs" color="brand.inkSoft">@smokeyjazz · live now</Text>
                  </Box>
                </HStack>
                <Box className="live-badge"><Box className="live-dot" />ON AIR</Box>
              </HStack>

              <Grid templateColumns="repeat(3, 1fr)" gap={4} mb={4}>
                {[
                  { label: "SOL received", value: "412" },
                  { label: "fans", value: "12.4k" },
                  { label: "tips this week", value: "238" },
                ].map((stat) => (
                  <Box key={stat.label} className="metric-card" textAlign="center">
                    <Text className="metric-value">{stat.value}</Text>
                    <Text className="metric-label">{stat.label}</Text>
                  </Box>
                ))}
              </Grid>

              <VStack gap={2} align="stretch" mb={3}>
                {[
                  { name: "@cryptowhale", amount: "2.5 SOL", message: "this set goes hard. smoke break for u" },
                  { name: "@miso", amount: "0.5 SOL", message: "play the rain one again pls" },
                ].map((tip) => (
                  <Box key={tip.name} className="paper-card" p={3}>
                    <Text fontFamily="heading" fontSize="xs" color="brand.ink">{tip.name} · {tip.amount}</Text>
                    <Text fontFamily="body" fontSize="xs" color="brand.inkSoft">{tip.message}</Text>
                  </Box>
                ))}
              </VStack>
              <Link href="/u/smokeyjazz" style={{ textDecoration: "none" }}>
                <Text fontFamily="body" fontSize="sm" color="brand.inkSoft">send a puff →</Text>
              </Link>
            </Box>
            <Text fontFamily="body" fontSize="xs" color="brand.inkSoft" mt={2}>live demo</Text>
          </Box>
        </Grid>
      </Container>

      {/* ═══ HOW IT WORKS ═══ */}
      <Container maxW="container.lg" py="var(--section-py)">
        <VStack gap={3} mb={8} textAlign="center">
          <Heading as="h2" fontSize={{ base: "2xl", md: "4xl" }} fontFamily="heading" color="brand.ink">
            how it works (it&apos;s three steps, in pen)
          </Heading>
        </VStack>

        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
          {[
            { num: "1", title: "make your page", desc: "claim your @handle. drop a polaroid, write your bio in marker. takes 90 seconds.", icon: "📓" },
            { num: "2", title: "wire up OBS", desc: "paste a single browser source URL. tips show up on stream as sticky notes.", icon: "🖥️" },
            { num: "3", title: "get tipped", desc: "viewers send SOL with a note. money lands in your wallet, smoke lands on stream.", icon: "✈️" },
          ].map((step, i) => (
            <M key={step.num} className="glass-card" p={6} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.08 * i }}>
              <HStack justifyContent="space-between" mb={3}>
                <HStack gap={2}>
                  <Box className="zine-number">{step.num}</Box>
                  <Text fontFamily="heading" fontSize="sm" color="brand.ink">{step.title}</Text>
                </HStack>
                <Text fontSize="xl">{step.icon}</Text>
              </HStack>
              <Text fontFamily="body" fontSize="sm" color="brand.inkSoft" lineHeight="1.6">{step.desc}</Text>
            </M>
          ))}
        </Grid>
      </Container>

      {/* ═══ PEOPLE ═══ */}
      <Container maxW="container.lg" py="var(--section-py)">
        <HStack justifyContent="space-between" alignItems="baseline" mb={8} flexWrap="wrap" gap={4}>
          <Heading as="h2" fontSize={{ base: "2xl", md: "4xl" }} fontFamily="heading" color="brand.ink">
            people on pufftip
          </Heading>
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
                <Text className="stat-pill">◎ {s.sol} SOL received</Text>
              </HStack>
            </M>
          ))}
        </Grid>
      </Container>

      {/* ═══ CTA ═══ */}
      <Container maxW="container.md" py="var(--section-py)" textAlign="center">
        <Heading as="h2" fontSize={{ base: "2xl", md: "4xl" }} fontFamily="heading" color="brand.ink" mb={4}>
          your page is waiting.
        </Heading>
        <Text fontFamily="body" fontSize="md" color="brand.inkSoft" maxW="lg" mx="auto" mb={8} lineHeight="1.7">
          grab a handle. paste an OBS URL. start collecting tips by tonight. seriously, that&apos;s it.
        </Text>
        <HStack gap={3} justifyContent="center" flexWrap="wrap">
          <Link href="/explore" style={{ textDecoration: "none" }}>
            <button className="premium-btn primary">browse streamers</button>
          </Link>
          <Link href="/obs" style={{ textDecoration: "none" }}>
            <button className="premium-btn secondary">read the obs guide</button>
          </Link>
        </HStack>
      </Container>

      {/* ═══ STATS ═══ */}
      {stats ? (
        <Container maxW="container.lg" pb="var(--section-py)">
          <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }} gap={4}>
            {[
              { label: "Total Tips", value: stats.totalTipsCount.toLocaleString() },
              { label: "Volume", value: `◎ ${Number(stats.totalVolumeSol).toFixed(2)}` },
              { label: "Creators", value: stats.uniqueCreators.toLocaleString() },
              { label: "Supporters", value: stats.uniqueDonors.toLocaleString() },
              { label: "Platform Fees", value: `◎ ${Number(stats.platformFeeCollected).toFixed(2)}` },
              { label: "Premium Users", value: stats.premiumUsersCount.toLocaleString() },
            ].map((s, i) => (
              <M key={s.label} className="glass-card" p={5} textAlign="center" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: 0.06 * i }}>
                <Text fontFamily="heading" fontSize="2xl" fontWeight="700" color="brand.ink">{s.value}</Text>
                <Text fontFamily="body" fontSize="xs" color="brand.inkSoft" mt={1}>{s.label}</Text>
              </M>
            ))}
          </Grid>
        </Container>
      ) : (
        <VStack py={10}><Spinner color="brand.ink" /></VStack>
      )}
      )}

      {loading && (
        <Container maxW="container.lg" py={12}>
          <VStack><Spinner size="lg" color="brand.solana" /></VStack>
        </Container>
      )}
    </>
  );
}
