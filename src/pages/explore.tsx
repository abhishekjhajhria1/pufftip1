/**
 * Explore Page — The Corkboard
 */

import { Box, VStack, Heading, Text, Container, Grid, HStack, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { motion } from "framer-motion";
import Head from "next/head";

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

const ALL_STREAMERS = [
  { emoji: "🎸", name: "Smokey Jazz", handle: "smokeyjazz", bio: "late-night chill streams + lo-fi sets", fans: "12.4k", sol: "413", isLive: true, category: "music" },
  { emoji: "👻", name: "Ghost Roast", handle: "ghostroast", bio: "horror speedruns w/ commentary", fans: "48.1k", sol: "1820", isLive: true, category: "gaming" },
  { emoji: "💻", name: "Late Shift", handle: "lateshift", bio: "we code at 3am", fans: "6.2k", sol: "88", isLive: false, category: "code" },
  { emoji: "🍜", name: "Miso Kitchen", handle: "misokitchen", bio: "ramen, knives, chaos", fans: "21.7k", sol: "522", isLive: false, category: "irl" },
  { emoji: "🚀", name: "Zero-G Pete", handle: "zerogpete", bio: "factorio rocket builds", fans: "33.9k", sol: "778", isLive: true, category: "gaming" },
  { emoji: "📷", name: "Polaroid Kid", handle: "polaroid_kid", bio: "indie photo walks + chats", fans: "4.1k", sol: "42", isLive: false, category: "irl" },
  { emoji: "🎮", name: "Pixel Drift", handle: "pixeldrift", bio: "retro games & pixel art", fans: "9.8k", sol: "234", isLive: false, category: "gaming" },
  { emoji: "🎧", name: "Bass Drop", handle: "bassdrop", bio: "EDM producer live sessions", fans: "15.3k", sol: "612", isLive: true, category: "music" },
  { emoji: "🎨", name: "Ink Flow", handle: "inkflow", bio: "digital art & illustration streams", fans: "7.6k", sol: "167", isLive: false, category: "art" },
];

export default function ExplorePage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "live" | "music" | "irl" | "gaming" | "code" | "art">("all");
  const categoryFilters = ["music", "irl", "gaming", "code", "art"] as const;

  const filtered = ALL_STREAMERS.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.handle.toLowerCase().includes(search.toLowerCase()) || s.bio.toLowerCase().includes(search.toLowerCase());
    const isCategoryFilter = categoryFilters.includes(filter as typeof categoryFilters[number]);
    const matchesFilter =
      filter === "all" ||
      (filter === "live" && s.isLive) ||
      (isCategoryFilter && s.category === filter);
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
          <Box className="ticker">
            <Box className="ticker-track">
              {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                <Text key={`${item}-${i}`} className="ticker-item">{item}</Text>
              ))}
            </Box>
          </Box>

          <VStack gap={2} alignItems="flex-start">
            <Heading as="h1" fontSize={{ base: "2xl", md: "4xl" }} fontFamily="heading" color="brand.ink">
              the corkboard
            </Heading>
            <Text fontFamily="body" fontSize="md" color="brand.inkSoft" maxW="lg">
              every streamer on pufftip, pinned up like polaroids. click one, send a puff, leave a note.
            </Text>
          </VStack>

          <HStack gap={3} flexWrap="wrap" alignItems="center">
            <Box flex={1} minW="200px" maxW="400px">
              <Input placeholder="Search by name, handle, or vibe..." value={search} onChange={(e) => setSearch(e.target.value)} size="lg" fontFamily="body" />
            </Box>
            <Box className="corkboard-filter">
              {([
                { key: "all", label: "all" },
                { key: "live", label: "● live now" },
                { key: "music", label: "music" },
                { key: "irl", label: "irl" },
                { key: "gaming", label: "gaming" },
                { key: "code", label: "code" },
                { key: "art", label: "art" },
              ] as const).map((f) => (
                <button
                  key={f.key}
                  className={filter === f.key ? "active" : ""}
                  onClick={() => setFilter(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </Box>
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

          <Box pt={6}>
            <Heading as="h2" fontSize={{ base: "xl", md: "2xl" }} fontFamily="heading" color="brand.ink" mb={4}>
              top earners (this week, give or take)
            </Heading>
            <VStack align="stretch" gap={3}>
              {[
                { rank: "1", emoji: "🎸", name: "Ghost Roast", handle: "@ghostroast · Resident Evil 4", sol: "1820.4", fans: "48.1k" },
                { rank: "2", emoji: "👻", name: "Zero-G Pete", handle: "@zerogpete · Factorio", sol: "778.2", fans: "33.9k" },
                { rank: "3", emoji: "💻", name: "Miso Kitchen", handle: "@misokitchen · IRL", sol: "522.1", fans: "21.7k" },
                { rank: "4", emoji: "🍜", name: "Smokey Jazz", handle: "@smokeyjazz · Just Chatting", sol: "412.8", fans: "12.4k" },
                { rank: "5", emoji: "🚀", name: "Late Shift", handle: "@lateshift · VS Code", sol: "88.3", fans: "6.2k" },
                { rank: "6", emoji: "📷", name: "Polaroid Kid", handle: "@polaroid_kid · IRL", sol: "41.6", fans: "4.1k" },
              ].map((entry) => (
                <Box key={entry.rank} className="paper-card" p={4}>
                  <HStack gap={3} alignItems="center">
                    <Text fontFamily="heading" fontSize="sm" color="brand.inkSoft" minW="22px">{entry.rank}</Text>
                    <Text fontSize="xl">{entry.emoji}</Text>
                    <Box flex={1} minW={0}>
                      <Text fontFamily="heading" fontSize="sm" fontWeight="700" color="brand.ink">{entry.name}</Text>
                      <Text fontFamily="body" fontSize="xs" color="brand.inkSoft">{entry.handle}</Text>
                    </Box>
                    <Box textAlign="right">
                      <Text fontFamily="heading" fontSize="sm" color="brand.ink">{entry.sol} SOL</Text>
                      <Text fontFamily="body" fontSize="xs" color="brand.inkSoft">{entry.fans} fans</Text>
                    </Box>
                  </HStack>
                </Box>
              ))}
            </VStack>
          </Box>

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
