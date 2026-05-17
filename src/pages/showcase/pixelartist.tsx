/**
 * Showcase Demo — Pixel Artist (Digital Artist)
 * Notebook theme, confetti notifications, gallery-style tip wall
 */
import {
  Box, VStack, Heading, Text, Container, Grid, HStack, Badge, GridItem,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Head from "next/head";

const M = motion(Box);

const TIPS = [
  { name: "art_collector", amount: "15.00", message: "this piece is incredible!! 🖼️", color: "" },
  { name: "pixel_fan", amount: "3.50", message: "your color palettes are insane", color: "pink" },
  { name: "nft_hunter", amount: "25.00", message: "when NFT drop? need this as my PFP", color: "cyan" },
  { name: "design_student", amount: "1.00", message: "you inspire me to keep drawing ✨", color: "" },
  { name: "gallery_owner", amount: "100.00", message: "would love to feature your work", color: "pink" },
  { name: "doodle_queen", amount: "5.00", message: "teach me your ways sensei 🎨", color: "cyan" },
];

const LEADERBOARD = [
  { rank: 1, name: "gallery_owner", total: "450.00", tips: 12, emoji: "🏆" },
  { rank: 2, name: "nft_hunter", total: "225.00", tips: 20, emoji: "🥈" },
  { rank: 3, name: "art_collector", total: "178.50", tips: 31, emoji: "🥉" },
  { rank: 4, name: "doodle_queen", total: "89.00", tips: 22, emoji: "4" },
  { rank: 5, name: "pixel_fan", total: "45.20", tips: 15, emoji: "5" },
];

export default function ShowcasePixelArtist() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Pixel Artist — PuffTip Showcase</title>
        <meta name="description" content="Demo creator page: Pixel Artist — digital artist with Notebook theme, confetti notifications, and gallery-style tip wall." />
      </Head>

      <Box bg="brand.markerYellow" py={2} textAlign="center">
        <Text fontFamily="heading" fontSize="xs" fontWeight="700" color="#1B1B1B" letterSpacing="wider">
          🎨 DEMO PAGE — This showcases how a digital artist&apos;s PuffTip page could look
        </Text>
      </Box>

      <Container maxW="container.lg" py={{ base: 6, md: 12 }}>
        <Grid templateColumns={{ base: "1fr", lg: "1fr 380px" }} gap={8}>
          <GridItem>
            <VStack gap={8} align="stretch">
              {/* Profile */}
              <M className="paper-card" p={{ base: 5, md: 8 }} position="relative" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <Box position="absolute" top="-3" left="33%" transform="rotate(var(--theme-rot-3))" w="5rem" className="washi bg-washi-yellow" />
                <HStack gap={5} flexWrap="wrap" alignItems="flex-start">
                  <Box bg="white" p={2} pb={6} boxShadow="sm" transform="rotate(var(--theme-rot-3))" w="96px" border="1px solid #eaeaea">
                    <Box w="100%" aspectRatio="1" display="flex" alignItems="center" justifyContent="center" fontSize="4xl" bgGradient="linear(to-br, cyan.300, purple.400)">🎨</Box>
                  </Box>
                  <Box flex={1} pt={2}>
                    <HStack gap={2} mb={1}>
                      <Heading as="h1" size="xl" color="brand.ink" fontFamily="heading">Pixel Artist</Heading>
                      <Badge bg="brand.markerYellow" color="brand.ink" fontSize="xs" borderRadius="sm" px={2} border="1px solid" borderColor="brand.ink">⭐ Premium</Badge>
                    </HStack>
                    <Text color="brand.inkSoft" fontSize="sm" fontFamily="body" mb={1}>@pixelartist</Text>
                    <Text color="brand.inkSoft" fontSize="md" mb={2} fontFamily="body">digital art, pixel illustrations, and character design. commissions open. every pixel placed with love.</Text>
                    <HStack gap={4} fontSize="xs" color="brand.inkSoft" fontFamily="body">
                      <Text>89 tips</Text><Text>•</Text><Text>987.70 SOL received</Text>
                    </HStack>
                  </Box>
                </HStack>
                <HStack mt={4} gap={3} flexWrap="wrap">
                  <Text className="stat-pill">📓 Notebook Theme</Text>
                  <Text className="stat-pill">🎊 Confetti Style</Text>
                  <Text className="stat-pill">🍞 Toast Mode</Text>
                </HStack>
              </M>

              {/* Tip Wall */}
              <M initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Heading as="h3" size="md" color="brand.ink" mb={6} fontFamily="heading">
                  <span className="marker-highlight">tip wall ({TIPS.length})</span>
                </Heading>
                <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }} gap={4}>
                  {TIPS.map((tip, i) => (
                    <M key={`${tip.name}-${i}`} className={`sticky-note ${tip.color}`} style={{ transform: `rotate(${i % 2 === 0 ? '2deg' : '-1.5deg'})` }} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: 0.05 * i }}>
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
              <M className="paper-card" p={6} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Heading as="h2" size="lg" color="brand.ink" mb={4} fontFamily="heading">send a tip</Heading>
                <VStack gap={3} align="stretch">
                  <Box bg="brand.paperDeep" border="1px solid" borderColor="var(--theme-card-border)" borderRadius="md" p={3}>
                    <Text fontFamily="body" fontSize="xs" color="brand.inkSoft" mb={1}>Amount (SOL)</Text>
                    <Text fontFamily="heading" fontSize="xl" color="brand.ink">◎ 5.00</Text>
                  </Box>
                  <HStack gap={2}>
                    {["1.0", "5.0", "10", "25", "50"].map(a => (
                      <Box key={a} flex={1} bg={a === "5.0" ? "brand.markerYellow" : "brand.paperDeep"} color="brand.ink" borderRadius="md" p={2} textAlign="center" fontSize="sm" fontFamily="heading" fontWeight="700" border="1.5px solid" borderColor="brand.ink">
                        {a}
                      </Box>
                    ))}
                  </HStack>
                  <Box bg="brand.paperDeep" border="1px solid" borderColor="var(--theme-card-border)" borderRadius="md" p={3}>
                    <Text fontFamily="body" fontSize="xs" color="brand.inkSoft" mb={1}>Message</Text>
                    <Text fontFamily="body" fontSize="sm" color="brand.ink">your art is beautiful! 🎨</Text>
                  </Box>
                  <button className="premium-btn primary" style={{ width: "100%" }}>Send ◎ 5.00 SOL →</button>
                </VStack>
              </M>

              <M className="border-sketch" p={6} bg="brand.paperDeep" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Heading as="h3" size="md" color="brand.ink" mb={4} fontFamily="heading">🏆 top supporters</Heading>
                <VStack align="stretch" gap={3}>
                  {LEADERBOARD.map((e) => (
                    <HStack key={e.name} gap={3} p={2} bg={e.rank <= 3 ? "brand.paper" : "transparent"} borderRadius="md" border={e.rank === 1 ? "1.5px solid" : "none"} borderColor="brand.markerYellow">
                      <Text fontSize="lg" minW="28px" textAlign="center">{e.emoji}</Text>
                      <Box flex={1}><Text fontFamily="heading" fontSize="sm" fontWeight="700" color="brand.ink">@{e.name}</Text><Text fontFamily="body" fontSize="xs" color="brand.inkSoft">{e.tips} tips</Text></Box>
                      <Text fontFamily="heading" fontSize="md" fontWeight="700" className="gradient-text">◎ {e.total}</Text>
                    </HStack>
                  ))}
                </VStack>
              </M>
            </VStack>
          </GridItem>
        </Grid>
      </Container>

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
