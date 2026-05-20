/**
 * Dashboard Page — Streamer Cockpit (Preview)
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

  const weekBars = [3.2, 5.8, 4.1, 7.6, 12.4, 9.1, 6.3];
  const weekLabels = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  const recentTips = [
    { name: "@cryptowhale", time: "2m", note: "this set goes hard. smoke break for u", amount: "+2.50 SOL" },
    { name: "@miso", time: "11m", note: "play the one with the rain again pls", amount: "+0.50 SOL" },
    { name: "@ghostr", time: "34m", note: "kebab fund +1", amount: "+1.20 SOL" },
    { name: "@anon", time: "1h", note: "saw u on stream, instant follow", amount: "+0.18 SOL" },
    { name: "@lateshift", time: "2h", note: "ur lo-fi made me ship the feature", amount: "+0.75 SOL" },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Head>
        <title>Dashboard — PuffTip</title>
      </Head>
      <Container maxW="container.lg" py="var(--section-py)">
        <VStack gap={8} align="stretch">
          {!creator && !loading && (
            <MotionBox className="glass-card" p={6} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
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

          <Box>
            <Text fontFamily="heading" fontSize="sm" color="brand.inkSoft">peek</Text>
            <Text fontFamily="body" fontSize="sm" color="brand.inkSoft">
              streamer cockpit · viewing as @{creator?.username || "smokeyjazz"}
            </Text>
            <Heading as="h1" fontSize={{ base: "2xl", md: "4xl" }} fontFamily="heading" color="brand.ink" mt={2}>
              your week, in pen
            </Heading>
            <Text fontFamily="body" fontSize="md" color="brand.inkSoft" maxW="lg" mt={2}>
              this is what your dashboard looks like — wired straight to your wallet, your overlay, your fans. no auth needed to look around.
            </Text>
          </Box>

          <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap={4}>
            {[
              { label: "this week", value: "48.5 SOL", note: "+18% vs last" },
              { label: "all-time", value: "413 SOL", note: "since you joined" },
              { label: "tips today", value: "12", note: "avg. 0.42 SOL" },
              { label: "top tip", value: "5.0 SOL", note: "from @spookz" },
            ].map((stat) => (
              <Box key={stat.label} className="metric-card">
                <Text className="metric-label">{stat.label}</Text>
                <Text className="metric-value">{stat.value}</Text>
                <Text fontFamily="body" fontSize="xs" color="brand.inkSoft">{stat.note}</Text>
              </Box>
            ))}
          </Grid>

          <Grid templateColumns={{ base: "1fr", md: "1.2fr 1fr" }} gap={6}>
            <VStack gap={6} align="stretch">
              <Box className="paper-card" p={6}>
                <Heading as="h3" size="sm" color="brand.ink" fontFamily="heading" mb={2}>tips this week</Heading>
                <Text fontFamily="body" fontSize="xs" color="brand.inkSoft" mb={4}>drawn by hand, in marker</Text>
                <HStack alignItems="flex-end" gap={3}>
                  {weekBars.map((val, i) => (
                    <VStack key={weekLabels[i]} gap={2}>
                      <Box
                        bg="brand.markerYellow"
                        border="1px solid"
                        borderColor="brand.ink"
                        borderRadius="md"
                        w={8}
                        h={`${val * 6}px`}
                      />
                      <Text fontFamily="body" fontSize="xs" color="brand.inkSoft">{weekLabels[i]}</Text>
                    </VStack>
                  ))}
                </HStack>
                <Text fontFamily="body" fontSize="xs" color="brand.inkSoft" mt={4}>friday was a banger. also you streamed for 6h that day, so. yeah.</Text>
              </Box>

              <Box className="paper-card" p={6}>
                <Heading as="h3" size="sm" color="brand.ink" fontFamily="heading" mb={4}>recent tips</Heading>
                <VStack align="stretch" gap={3}>
                  {recentTips.map((tip) => (
                    <HStack key={tip.name} justifyContent="space-between" alignItems="center">
                      <Box>
                        <Text fontFamily="heading" fontSize="sm" color="brand.ink">{tip.name} · {tip.time}</Text>
                        <Text fontFamily="body" fontSize="xs" color="brand.inkSoft">{tip.note}</Text>
                      </Box>
                      <Text fontFamily="heading" fontSize="sm" color="brand.ink">{tip.amount}</Text>
                    </HStack>
                  ))}
                </VStack>
              </Box>
            </VStack>

            <VStack gap={6} align="stretch">
              <Box className="paper-card" p={6}>
                <Heading as="h3" size="sm" color="brand.ink" fontFamily="heading" mb={2}>overlay editor</Heading>
                <Text fontFamily="body" fontSize="xs" color="brand.inkSoft" mb={4}>tweak how tips show up on stream.</Text>
                <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                  {[
                    { label: "style", value: "sticky note ✓" },
                    { label: "duration", value: "8 seconds" },
                    { label: "sound", value: "match strike 🚬" },
                    { label: "min. amount", value: "0.05 SOL" },
                    { label: "TTS", value: "off (good for vibes)" },
                  ].map((item) => (
                    <Box key={item.label} className="metric-card">
                      <Text className="metric-label">{item.label}</Text>
                      <Text fontFamily="heading" fontSize="sm" color="brand.ink">{item.value}</Text>
                    </Box>
                  ))}
                </Grid>
                <Text fontFamily="body" fontSize="xs" color="brand.inkSoft" mt={4}>
                  browser source url: https://pufftip.com/overlay/@{creator?.username || "smokeyjazz"}?key=•••
                </Text>
              </Box>

              <Box className="paper-card" p={6}>
                <Heading as="h3" size="sm" color="brand.ink" fontFamily="heading" mb={3}>live preview</Heading>
                <Box className="sticky-note">
                  <Text fontFamily="heading" fontSize="sm" color="brand.ink">@cryptowhale · 2.5 SOL</Text>
                  <Text fontFamily="heading" fontSize="md" color="brand.ink">huge play! smoke break for u 🚬</Text>
                </Box>
                <Text fontFamily="body" fontSize="xs" color="brand.inkSoft" mt={3}>
                  ↑ that&apos;s how tips appear on stream
                </Text>
              </Box>
            </VStack>
          </Grid>

          <Grid templateColumns={{ base: "1fr", md: "1.2fr 1fr" }} gap={6}>
            <Box className="paper-card" p={6}>
              <HStack justifyContent="space-between" mb={3}>
                <Box>
                  <Heading as="h3" size="sm" color="brand.ink" fontFamily="heading">customize your page</Heading>
                  <Text fontFamily="body" fontSize="xs" color="brand.inkSoft">editing as <strong>@{creator?.username || "smokeyjazz"}</strong> · saved in your browser</Text>
                </Box>
                <Button size="sm" variant="ghost" onClick={() => router.push(`/u/${creator?.username || "demo"}`)}>
                  open & inline edit →
                </Button>
              </HStack>

              <HStack gap={2} mb={4} flexWrap="wrap">
                {[
                  "@smokeyjazz",
                  "@ghostroast",
                  "@lateshift",
                  "@misokitchen",
                  "@zerogpete",
                  "@polaroid_kid",
                ].map((handle) => (
                  <button key={handle} className="premium-btn secondary" style={{ padding: "6px 10px", fontSize: "12px" }}>
                    {handle}
                  </button>
                ))}
              </HStack>

              <HStack gap={2} mb={4} flexWrap="wrap">
                {[
                  "profile",
                  "theme",
                  "tips",
                  "sections",
                  "blocks",
                ].map((tab) => (
                  <button key={tab} className="premium-btn secondary" style={{ padding: "6px 12px", fontSize: "12px" }}>
                    {tab}
                  </button>
                ))}
              </HStack>

              <VStack align="stretch" gap={3}>
                {[
                  { label: "display name", value: "Smokey Jazz" },
                  { label: "game / category", value: "Just Chatting" },
                  { label: "tagline", value: "late-night chill streams + lo-fi sets" },
                  { label: "bio", value: "i play guitar, code, and chain-smoke metaphors. tip me a coffee or a kebab — your call." },
                ].map((field) => (
                  <Box key={field.label}>
                    <Text fontFamily="body" fontSize="xs" color="brand.inkSoft" mb={1}>{field.label}</Text>
                    <Input value={field.value} readOnly size="sm" />
                  </Box>
                ))}
              </VStack>
            </Box>

            <Box className="paper-card" p={6}>
              <Text fontSize="sm" color="brand.ink" mb={2} fontWeight="600" fontFamily="body">
                YOUR TIP PAGE
              </Text>
              <HStack gap={2} mb={4}>
                <Input value={profileUrl} readOnly size="sm" flex={1} fontSize="sm" color="brand.inkSoft" bg="brand.paper" borderColor="brand.ink" />
                <Button size="sm" bg="brand.paper" border="2px solid" borderColor="brand.ink" color="brand.ink" _hover={{ bg: "brand.paperDeep" }} onClick={handleCopy} borderRadius="md" minW="80px">
                  {copied ? <><FiCheck size={14} /> Copied</> : <><FiCopy size={14} /> Copy</>}
                </Button>
                <Button size="sm" bg="brand.markerYellow" border="2px solid" borderColor="brand.ink" color="brand.ink" _hover={{ transform: "rotate(var(--theme-rot-1))" }} onClick={() => router.push(`/u/${creator?.username || "demo"}`)} borderRadius="md">
                  <FiExternalLink size={14} />
                </Button>
              </HStack>
              <HStack gap={3} flexWrap="wrap">
                <Button bg="brand.ink" color="brand.paper" className="shadow-sticker" _hover={{ transform: "rotate(-2deg) translateY(-1px)", opacity: 0.9 }} transition="all 0.2s" borderRadius="md" fontFamily="heading" fontSize="sm" onClick={() => router.push(`/u/${creator?.username || "demo"}`)}>
                  Open Public Page
                </Button>
                <Button bg="transparent" color="brand.inkSoft" border="2px solid" borderColor="brand.inkSoft" _hover={{ bg: "brand.paperDeep", color: "brand.ink", borderColor: "brand.ink" }} borderRadius="md" fontFamily="body" fontSize="sm" onClick={() => router.push("/")}>Back to Home</Button>
              </HStack>
            </Box>
          </Grid>

          <Box>
            <Heading size="lg" color="brand.ink" mb={4} fontFamily="heading">
              <span className="marker-highlight">Platform Overview</span>
            </Heading>
            {loading ? (
              <VStack py={8}><Spinner color="brand.ink" /></VStack>
            ) : (
              <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }} gap={4}>
                {[
                  { label: "Total Tips", value: stats?.totalTipsCount ?? 0, icon: "💸" },
                  { label: "Volume", value: `${Number(stats?.totalVolumeSol ?? 0).toFixed(2)} SOL`, icon: "📊" },
                  { label: "Creators", value: stats?.uniqueCreators ?? 0, icon: "🎨" },
                  { label: "Supporters", value: stats?.uniqueDonors ?? 0, icon: "❤️" },
                  { label: "Fees Earned", value: `${Number(stats?.platformFeeCollected ?? 0).toFixed(2)} SOL`, icon: "🏦" },
                  { label: "Premium Users", value: stats?.premiumUsersCount ?? 0, icon: "⭐" },
                ].map((stat, i) => (
                  <GridItem key={stat.label}>
                    <MotionBox className="paper-card" p={5} textAlign="center" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.05 * i }}>
                      <Text fontSize="2xl" mb={2}>{stat.icon}</Text>
                      <Text fontFamily="heading" fontSize="xl" fontWeight="700" color="brand.ink">{stat.value}</Text>
                      <Text fontFamily="body" fontSize="xs" color="brand.inkSoft">{stat.label}</Text>
                    </MotionBox>
                  </GridItem>
                ))}
              </Grid>
            )}
          </Box>
        </VStack>
      </Container>
    </>
  );
}
