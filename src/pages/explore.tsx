/**
 * Explore Page — Discover Streamers (Premium)
 */

import { Box, VStack, Heading, Text, Container, Grid, HStack, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { motion } from "framer-motion";
import Head from "next/head";

const M = motion(Box);

const ALL_STREAMERS = [
  { emoji: "🎸", name: "Smokey Jazz", handle: "smokeyjazz", bio: "late-night chill streams + lo-fi sets", fans: "12.4k", sol: "413", isLive: true },
  { emoji: "👻", name: "Ghost Roast", handle: "ghostroast", bio: "horror speedruns w/ commentary", fans: "48.1k", sol: "1820", isLive: true },
  { emoji: "💻", name: "Late Shift", handle: "lateshift", bio: "we code at 3am", fans: "6.2k", sol: "88", isLive: false },
  { emoji: "🍜", name: "Miso Kitchen", handle: "misokitchen", bio: "ramen, knives, chaos", fans: "21.7k", sol: "522", isLive: false },
  { emoji: "🚀", name: "Zero-G Pete", handle: "zerogpete", bio: "factorio rocket builds", fans: "33.9k", sol: "778", isLive: true },
  { emoji: "📷", name: "Polaroid Kid", handle: "polaroid_kid", bio: "indie photo walks + chats", fans: "4.1k", sol: "42", isLive: false },
  { emoji: "🎮", name: "Pixel Drift", handle: "pixeldrift", bio: "retro games & pixel art", fans: "9.8k", sol: "234", isLive: false },
  { emoji: "🎧", name: "Bass Drop", handle: "bassdrop", bio: "EDM producer live sessions", fans: "15.3k", sol: "612", isLive: true },
  { emoji: "🎨", name: "Ink Flow", handle: "inkflow", bio: "digital art & illustration streams", fans: "7.6k", sol: "167", isLive: false },
];

export default function ExplorePage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "live">("all");

  const filtered = ALL_STREAMERS.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.handle.toLowerCase().includes(search.toLowerCase()) || s.bio.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || (filter === "live" && s.isLive);
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <Head>
        <title>Explore Streamers — PuffTip</title>
        <meta name="description" content="Discover streamers on PuffTip. Send SOL tips to your favorite creators." />
      </Head>

      <Container maxW="container.lg" py="var(--section-py)">
        <VStack gap={8} align="stretch">
          <VStack gap={2} alignItems="flex-start">
            <Heading as="h1" fontSize={{ base: "2xl", md: "4xl" }} fontFamily="heading" color="brand.ink">
              Explore Streamers
            </Heading>
            <Text fontFamily="body" fontSize="md" color="brand.inkSoft" maxW="lg">
              Find creators with OBS overlays, real-time tip walls, and Solana-powered tipping. No signup needed — just pick someone and send a puff.
            </Text>
          </VStack>

          {/* Search + Filter */}
          <HStack gap={3} flexWrap="wrap">
            <Box flex={1} minW="200px" maxW="400px">
              <Input placeholder="Search by name, handle, or vibe..." value={search} onChange={(e) => setSearch(e.target.value)} size="lg" fontFamily="body" />
            </Box>
            <HStack gap={1}>
              {(["all", "live"] as const).map(f => (
                <button key={f} className={`premium-btn ${filter === f ? "primary" : "secondary"}`} onClick={() => setFilter(f)} style={{ padding: "6px 16px", fontSize: "13px" }}>
                  {f === "live" && "🔴 "}{f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </HStack>
          </HStack>

          {filtered.some(s => s.isLive) && filter !== "live" && (
            <HStack gap={2}>
              <Box className="live-badge"><Box className="live-dot" />LIVE NOW</Box>
              <Text fontFamily="body" fontSize="sm" color="brand.inkSoft">{filtered.filter(s => s.isLive).length} streamers are live</Text>
            </HStack>
          )}

          <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={4}>
            {filtered.map((s, i) => (
              <M key={s.handle} className="streamer-card" p={5} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.03 * i }} onClick={() => router.push(`/u/${s.handle}`)}>
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

          {filtered.length === 0 && (
            <Box className="glass-card" p={8} textAlign="center">
              <Text fontSize="3xl" mb={3}>🔍</Text>
              <Heading size="md" color="brand.ink" fontFamily="heading" mb={2}>No streamers found</Heading>
              <Text color="brand.inkSoft" fontSize="sm" fontFamily="body">Try a different search term or filter.</Text>
            </Box>
          )}
        </VStack>
      </Container>
    </>
  );
}
