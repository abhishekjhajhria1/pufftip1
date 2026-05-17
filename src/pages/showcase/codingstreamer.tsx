/**
 * Showcase Demo — Code Streamer (Tech Streamer)
 * Studio theme, simple notifications, minimal layout
 */
import {
  Box, VStack, Heading, Text, Container, Grid, HStack, Badge, GridItem,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Head from "next/head";

const M = motion(Box);

const TIPS = [
  { name: "dev_newbie", amount: "2.00", message: "learned so much from this stream!", color: "" },
  { name: "rust_enjoyer", amount: "10.00", message: "finally someone who explains lifetimes properly", color: "pink" },
  { name: "open_source_fan", amount: "5.00", message: "love that you share all the code 🔓", color: "cyan" },
  { name: "startup_founder", amount: "50.00", message: "you just saved my team a week of debugging", color: "" },
  { name: "cs_student", amount: "1.00", message: "better than my university lectures tbh", color: "pink" },
  { name: "api_wizard", amount: "8.00", message: "that error handling pattern was chef's kiss 👨‍🍳", color: "cyan" },
];

const LEADERBOARD = [
  { rank: 1, name: "startup_founder", total: "520.00", tips: 15, emoji: "🏆" },
  { rank: 2, name: "rust_enjoyer", total: "156.00", tips: 24, emoji: "🥈" },
  { rank: 3, name: "open_source_fan", total: "89.50", tips: 18, emoji: "🥉" },
  { rank: 4, name: "api_wizard", total: "67.00", tips: 12, emoji: "4" },
  { rank: 5, name: "dev_newbie", total: "34.00", tips: 20, emoji: "5" },
];

export default function ShowcaseCodingStreamer() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Code Streamer — PuffTip Showcase</title>
        <meta name="description" content="Demo creator page: Code Streamer — tech streamer with Studio theme, simple notifications, and minimal clean layout." />
      </Head>

      <Box bg="linear-gradient(135deg, #9945FF, #14F195)" py={2} textAlign="center">
        <Text fontFamily="body" fontSize="xs" fontWeight="700" color="white" letterSpacing="wider">
          💻 DEMO PAGE — This showcases how a tech streamer&apos;s PuffTip page could look
        </Text>
      </Box>

      <Container maxW="container.lg" py={{ base: 6, md: 12 }}>
        <Grid templateColumns={{ base: "1fr", lg: "1fr 380px" }} gap={8}>
          <GridItem>
            <VStack gap={8} align="stretch">
              {/* Profile */}
              <M className="glass-card" p={{ base: 5, md: 8 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                <HStack gap={5} flexWrap="wrap" alignItems="flex-start">
                  <Box bg="white" p={2} pb={6} boxShadow="sm" w="96px" border="1px solid #eaeaea">
                    <Box w="100%" aspectRatio="1" display="flex" alignItems="center" justifyContent="center" fontSize="4xl" bgGradient="linear(to-br, green.300, blue.400)">💻</Box>
                  </Box>
                  <Box flex={1} pt={2}>
                    <HStack gap={2} mb={1} flexWrap="wrap">
                      <Heading as="h1" size="xl" color="brand.ink" fontFamily="heading">Late Shift</Heading>
                      <Box className="live-badge"><Box className="live-dot" />LIVE</Box>
                    </HStack>
                    <Text color="brand.inkSoft" fontSize="sm" fontFamily="body" mb={1}>@codingstreamer</Text>
                    <Text color="brand.inkSoft" fontSize="md" mb={2} fontFamily="body">we code at 3am. rust, typescript, solana programs. building in public, debugging in real-time.</Text>
                    <HStack gap={4} fontSize="xs" color="brand.inkSoft" fontFamily="body">
                      <Text>89 tips</Text><Text>•</Text><Text>866.50 SOL received</Text><Text>•</Text><Text>6.2k fans</Text>
                    </HStack>
                  </Box>
                </HStack>
                <HStack mt={4} gap={3} flexWrap="wrap">
                  <Text className="stat-pill">✨ Studio Theme</Text>
                  <Text className="stat-pill">✏️ Simple Style</Text>
                  <Text className="stat-pill">📢 Banner Mode</Text>
                </HStack>
              </M>

              {/* Code Terminal Mock */}
              <M className="demo-container" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                <Box className="demo-toolbar">
                  <Box className="demo-dot" bg="#FF5F57" /><Box className="demo-dot" bg="#FEBC2E" /><Box className="demo-dot" bg="#28C840" />
                  <Text ml={2} fontSize="xs" color="brand.inkSoft" fontFamily="body">terminal — zsh</Text>
                </Box>
                <Box fontFamily="monospace" fontSize="sm" color="brand.ink" lineHeight="1.8">
                  <Text><Box as="span" color="brand.solana">$</Box> cargo build --release</Text>
                  <Text color="brand.inkSoft">   Compiling pufftip v0.1.0</Text>
                  <Text color="var(--theme-solana-green)">   Finished release [optimized]</Text>
                  <Text mt={2}><Box as="span" color="brand.solana">$</Box> anchor deploy</Text>
                  <Text color="brand.inkSoft">   Deploying program to devnet...</Text>
                  <Text color="var(--theme-solana-green)">   ✓ Program deployed: PuffT1p...xxx</Text>
                </Box>
              </M>

              {/* Tip Wall */}
              <M initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Heading as="h3" size="md" color="brand.ink" mb={6} fontFamily="heading">
                  <span className="marker-highlight">tip wall ({TIPS.length})</span>
                </Heading>
                <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)" }} gap={4}>
                  {TIPS.map((tip, i) => (
                    <M key={`${tip.name}-${i}`} className={`sticky-note ${tip.color}`} style={{ transform: `rotate(${i % 2 === 0 ? '1deg' : '-1deg'})` }} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: 0.05 * i }}>
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
              <M className="glass-card" p={6} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <Heading as="h2" size="lg" color="brand.ink" mb={4} fontFamily="heading">send a tip</Heading>
                <VStack gap={3} align="stretch">
                  <Box bg="brand.paperDeep" border="1px solid" borderColor="var(--theme-card-border)" borderRadius="md" p={3}>
                    <Text fontFamily="body" fontSize="xs" color="brand.inkSoft" mb={1}>Amount (SOL)</Text>
                    <Text fontFamily="heading" fontSize="xl" color="brand.ink">◎ 1.00</Text>
                  </Box>
                  <HStack gap={2}>
                    {["0.5", "1.0", "2.0", "5.0", "10"].map(a => (
                      <Box key={a} flex={1} bg={a === "1.0" ? "brand.solana" : "brand.paperDeep"} color={a === "1.0" ? "white" : "brand.ink"} borderRadius="md" p={2} textAlign="center" fontSize="sm" fontFamily="heading" fontWeight="700" border="1px solid" borderColor="var(--theme-card-border)">
                        {a}
                      </Box>
                    ))}
                  </HStack>
                  <Box bg="brand.paperDeep" border="1px solid" borderColor="var(--theme-card-border)" borderRadius="md" p={3}>
                    <Text fontFamily="body" fontSize="xs" color="brand.inkSoft" mb={1}>Message</Text>
                    <Text fontFamily="body" fontSize="sm" color="brand.ink">fix the bug live! 🐛</Text>
                  </Box>
                  <button className="premium-btn primary" style={{ width: "100%" }}>Send ◎ 1.00 SOL →</button>
                </VStack>
              </M>

              <M className="glass-card" p={6} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <Heading as="h3" size="md" color="brand.ink" mb={4} fontFamily="heading">🏆 top supporters</Heading>
                <VStack align="stretch" gap={3}>
                  {LEADERBOARD.map((e) => (
                    <HStack key={e.name} gap={3} p={2} bg={e.rank <= 3 ? "brand.paperDeep" : "transparent"} borderRadius="md" border={e.rank === 1 ? "1.5px solid" : "none"} borderColor="brand.markerYellow">
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
