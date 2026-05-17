/**
 * Showcase Demo Page — Smokey Jazz (Music Streamer)
 * Studio theme showcase with rich notifications, populated tip wall
 */
import {
  Box, VStack, Heading, Text, Container, Grid, HStack, Badge, GridItem,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Head from "next/head";

const M = motion(Box);

const TIPS = [
  { name: "vinyl_collector", amount: "5.00", message: "this set is pure vibes 🎶", color: "" },
  { name: "late_nighter", amount: "12.00", message: "play more jazz fusion please!", color: "pink" },
  { name: "solana_whale", amount: "50.00", message: "been listening every night for a month", color: "cyan" },
  { name: "beats_fan", amount: "2.00", message: "lo-fi king 👑", color: "" },
  { name: "chillhop_addict", amount: "8.50", message: "this is better than spotify", color: "pink" },
  { name: "night_owl_99", amount: "1.50", message: "3am vibes, perfect", color: "cyan" },
  { name: "jazz_lover", amount: "25.00", message: "you have real talent, keep going", color: "" },
  { name: "crypto_chill", amount: "3.00", message: "tipping from my phantom wallet ◎", color: "pink" },
];

const LEADERBOARD = [
  { rank: 1, name: "solana_whale", total: "312.50", tips: 42, emoji: "🏆" },
  { rank: 2, name: "jazz_lover", total: "189.00", tips: 28, emoji: "🥈" },
  { rank: 3, name: "late_nighter", total: "134.20", tips: 35, emoji: "🥉" },
  { rank: 4, name: "vinyl_collector", total: "87.00", tips: 19, emoji: "4" },
  { rank: 5, name: "chillhop_addict", total: "56.80", tips: 14, emoji: "5" },
];

export default function ShowcaseSmokeyJazz() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Smokey Jazz — PuffTip Showcase</title>
        <meta name="description" content="Demo creator page: Smokey Jazz — music streamer with Studio theme, rich notifications, and populated tip wall." />
      </Head>

      {/* DEMO BADGE */}
      <Box bg="brand.solana" py={2} textAlign="center">
        <Text fontFamily="body" fontSize="xs" fontWeight="700" color="white" letterSpacing="wider">
          🎮 DEMO PAGE — This is a showcase of how a music streamer&apos;s PuffTip page could look
        </Text>
      </Box>

      <Container maxW="container.lg" py={{ base: 6, md: 12 }}>
        <Grid templateColumns={{ base: "1fr", lg: "1fr 380px" }} gap={8}>
          {/* Left Column */}
          <GridItem>
            <VStack gap={8} align="stretch">
              {/* Profile Header */}
              <M className="glass-card" p={{ base: 5, md: 8 }} position="relative" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <HStack gap={5} flexWrap="wrap" alignItems="flex-start">
                  <Box bg="white" p={2} pb={6} boxShadow="sm" w="96px" border="1px solid #eaeaea">
                    <Box w="100%" aspectRatio="1" display="flex" alignItems="center" justifyContent="center" fontSize="4xl" bgGradient="linear(to-br, purple.400, pink.300)">🎸</Box>
                  </Box>
                  <Box flex={1} pt={2}>
                    <HStack gap={2} mb={1} flexWrap="wrap">
                      <Heading as="h1" size="xl" color="brand.ink" fontFamily="heading">Smokey Jazz</Heading>
                      <Box className="live-badge"><Box className="live-dot" />LIVE</Box>
                    </HStack>
                    <Text color="brand.inkSoft" fontSize="sm" fontFamily="body" mb={1}>@smokeyjazz</Text>
                    <Text color="brand.inkSoft" fontSize="md" mb={2} fontFamily="body">late-night chill streams + lo-fi sets. jazz fusion, vinyl crackle, good vibes only.</Text>
                    <HStack gap={4} fontSize="xs" color="brand.inkSoft" fontFamily="body">
                      <Text>156 tips</Text><Text>•</Text><Text>812.50 SOL received</Text><Text>•</Text><Text>12.4k fans</Text>
                    </HStack>
                  </Box>
                </HStack>
                <HStack mt={4} gap={3} flexWrap="wrap">
                  <Text className="stat-pill">🎵 Studio Theme</Text>
                  <Text className="stat-pill">✨ Rich Notifications</Text>
                  <Text className="stat-pill">➡️ Slide-in Mode</Text>
                </HStack>
              </M>

              {/* Tip Wall */}
              <M initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Heading as="h3" size="md" color="brand.ink" mb={6} fontFamily="heading">
                  <span className="marker-highlight">tip wall ({TIPS.length})</span>
                </Heading>
                <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }} gap={4}>
                  {TIPS.map((tip, i) => (
                    <M key={`${tip.name}-${i}`} className={`sticky-note ${tip.color}`} style={{ transform: `rotate(${i % 2 === 0 ? '1.5deg' : '-1.5deg'})` }} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: 0.05 * i }}>
                      <Box position="absolute" top="-2" left="50%" transform="translateX(-50%)" w={3} h={3} bg="brand.markerRed" borderRadius="full" boxShadow="sm" border="1px solid var(--theme-card-border)" />
                      <HStack justifyContent="space-between" mb={2}>
                        <Text fontWeight="bold" color="brand.inkSoft" fontSize="xs" fontFamily="body">@{tip.name}</Text>
                        <Badge bg="transparent" color="brand.ink" border="1px solid" borderColor="brand.ink" borderRadius="full" px={2} fontSize="xs">◎ {tip.amount}</Badge>
                      </HStack>
                      <Text color="brand.ink" fontSize="md" fontFamily="heading" lineHeight="1.3">{tip.message}</Text>
                    </M>
                  ))}
                </Grid>
              </M>
            </VStack>
          </GridItem>

          {/* Right Column */}
          <GridItem>
            <VStack gap={8} align="stretch" position={{ lg: "sticky" }} top={{ lg: "80px" }}>
              {/* Tip Form Mock */}
              <M className="glass-card" p={6} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Heading as="h2" size="lg" color="brand.ink" mb={4} fontFamily="heading">send a tip</Heading>
                <VStack gap={3} align="stretch">
                  <Box bg="brand.paperDeep" border="1px solid" borderColor="var(--theme-card-border)" borderRadius="md" p={3}>
                    <Text fontFamily="body" fontSize="xs" color="brand.inkSoft" mb={1}>Amount (SOL)</Text>
                    <Text fontFamily="heading" fontSize="xl" color="brand.ink">◎ 2.00</Text>
                  </Box>
                  <HStack gap={2}>
                    {["0.5", "1.0", "2.0", "5.0", "10"].map(a => (
                      <Box key={a} flex={1} bg={a === "2.0" ? "brand.solana" : "brand.paperDeep"} color={a === "2.0" ? "white" : "brand.ink"} borderRadius="md" p={2} textAlign="center" fontSize="sm" fontFamily="heading" fontWeight="700" border="1px solid" borderColor="var(--theme-card-border)">
                        {a}
                      </Box>
                    ))}
                  </HStack>
                  <Box bg="brand.paperDeep" border="1px solid" borderColor="var(--theme-card-border)" borderRadius="md" p={3}>
                    <Text fontFamily="body" fontSize="xs" color="brand.inkSoft" mb={1}>Message</Text>
                    <Text fontFamily="body" fontSize="sm" color="brand.ink">great stream tonight! 🎶</Text>
                  </Box>
                  <button className="premium-btn primary" style={{ width: "100%" }}>
                    Send ◎ 2.00 SOL →
                  </button>
                </VStack>
              </M>

              {/* Leaderboard */}
              <M className="glass-card" p={6} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Heading as="h3" size="md" color="brand.ink" mb={4} fontFamily="heading">🏆 top supporters</Heading>
                <VStack align="stretch" gap={3}>
                  {LEADERBOARD.map((entry, i) => (
                    <HStack key={entry.name} gap={3} p={2} bg={entry.rank <= 3 ? "brand.paperDeep" : "transparent"} borderRadius="md" border={entry.rank === 1 ? "1.5px solid" : "none"} borderColor="brand.markerYellow">
                      <Text fontSize="lg" minW="28px" textAlign="center">{entry.emoji}</Text>
                      <Box flex={1}><Text fontFamily="heading" fontSize="sm" fontWeight="700" color="brand.ink">@{entry.name}</Text><Text fontFamily="body" fontSize="xs" color="brand.inkSoft">{entry.tips} tips</Text></Box>
                      <Text fontFamily="heading" fontSize="md" fontWeight="700" className="gradient-text">◎ {entry.total}</Text>
                    </HStack>
                  ))}
                </VStack>
              </M>
            </VStack>
          </GridItem>
        </Grid>
      </Container>

      {/* CTA */}
      <Box className="cta-section" py={10}>
        <Container maxW="container.md" textAlign="center">
          <Text fontFamily="body" fontSize="sm" color="brand.inkSoft" mb={4}>This is a demo page. Want one like this?</Text>
          <HStack gap={3} justifyContent="center" flexWrap="wrap">
            <button className="premium-btn primary" onClick={() => router.push("/register")}>Create Your Page →</button>
            <button className="premium-btn secondary" onClick={() => router.push("/demos")}>More Demos</button>
          </HStack>
        </Container>
      </Box>
    </>
  );
}
