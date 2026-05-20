/**
 * For Creators Page — Non-Streamer Creator Landing
 *
 * Sections:
 * 1. Hero — creator-focused messaging
 * 2. Custom Page Showcase — Notebook vs Studio theme comparison
 * 3. Tip Wall Demo — populated sticky notes
 * 4. Leaderboard Demo — populated rankings
 * 5. Customization Grid — all creator choices
 * 6. Link-in-Bio — how PuffTip replaces link-in-bio tools
 * 7. Fee Strip — simple "98% to you"
 * 8. CTA
 */

import {
  Box, VStack, Heading, Text, Container, Grid, HStack, GridItem, Badge,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Head from "next/head";
import { FiCheck } from "react-icons/fi";

const M = motion(Box);

const DEMO_TIPS = [
  { name: "pixel_queen", amount: "5.00", message: "love your art!! 🎨", color: "" },
  { name: "solana_whale", amount: "25.00", message: "masterpiece. keep creating.", color: "pink" },
  { name: "art_collector", amount: "2.50", message: "buying this as NFT when?", color: "cyan" },
  { name: "night_owl", amount: "1.00", message: "your work inspires me ✨", color: "" },
  { name: "crypto_fan", amount: "10.00", message: "take my SOL, legend!", color: "pink" },
  { name: "new_viewer", amount: "0.50", message: "first tip, love what you do", color: "cyan" },
];

const DEMO_LEADERBOARD = [
  { rank: 1, name: "solana_whale", total: "142.50", tips: 23, emoji: "🏆" },
  { rank: 2, name: "pixel_queen", total: "89.00", tips: 18, emoji: "🥈" },
  { rank: 3, name: "art_collector", total: "67.20", tips: 15, emoji: "🥉" },
  { rank: 4, name: "crypto_fan", total: "45.00", tips: 12, emoji: "4" },
  { rank: 5, name: "night_owl", total: "23.80", tips: 8, emoji: "5" },
];

const CUSTOMIZATION_OPTIONS = [
  { icon: "🎨", title: "Dual Themes", desc: "Notebook (hand-drawn, warm) or Studio (sleek, dark mode). Your page, your vibe." },
  { icon: "🔔", title: "4 Notification Modes", desc: "Toast, Modal, Banner, or Slide-in. Pick how tips appear." },
  { icon: "🎊", title: "5 Content Styles", desc: "Simple text, Rich cards, Confetti bursts, Coin drops, or All random." },
  { icon: "🔊", title: "5 Sound Alerts", desc: "Chime, Coin Drop, Blip, Cash Register, or Bell. Adjustable volume." },
  { icon: "📚", title: "Stacking Modes", desc: "Stack, Replace, or Queue multiple incoming tips on screen." },
  { icon: "⏱️", title: "Duration Tiers", desc: "Set different display times based on tip amount. Big tips stay longer." },
  { icon: "📊", title: "Creator Dashboard", desc: "Track tips, earnings, supporter count. Manage everything in one place." },
  { icon: "🏆", title: "Donor Leaderboard", desc: "Top supporters ranked. Give your biggest fans recognition." },
];

export default function ForCreatorsPage() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>For Creators — PuffTip</title>
        <meta name="description" content="Get paid for what you create. Custom tip page, donor leaderboard, tip wall, dual themes, and instant SOL payments. Built for all creators." />
      </Head>

      {/* ═══ HERO ═══ */}
      <Box position="relative" overflow="hidden">
        <Box className="glow-orb purple" w="600px" h="600px" top="-250px" left="20%" />
        <Box className="glow-orb pink" w="400px" h="400px" bottom="-150px" right="15%" />

        <Container maxW="container.lg" py={{ base: "4rem", md: "7rem" }} position="relative" zIndex={2}>
          <VStack gap={6} textAlign="center" maxW="700px" mx="auto">


            <M initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <Heading as="h1" fontSize={{ base: "3xl", sm: "5xl", lg: "6xl" }} fontFamily="heading" lineHeight="1.08" color="brand.ink">
                Get paid for{" "}
                <Box as="span" className="gradient-text">what you create</Box>
              </Heading>
            </M>

            <M initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <Text fontSize={{ base: "md", md: "lg" }} color="brand.inkSoft" fontFamily="body" maxW="560px" lineHeight="1.7">
                Artists, musicians, writers, photographers — your custom tip page with a donor leaderboard, tip wall, dual themes, and instant SOL payments. No middlemen.
              </Text>
            </M>

            <M initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
              <HStack gap={3} flexWrap="wrap" justifyContent="center" mt={2}>
                <button className="premium-btn primary" onClick={() => router.push("/register")}>
                  Create Your Page →
                </button>
                <button className="premium-btn secondary" onClick={() => router.push("/demos")}>
                  See Examples
                </button>
              </HStack>
            </M>

            <M initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}>
              <HStack gap={6} mt={4} flexWrap="wrap" justifyContent="center">
                {[
                  { val: "98%", label: "goes to you" },
                  { val: "<1s", label: "to your wallet" },
                  { val: "Free", label: "to start" },
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

      {/* ═══ THEME SHOWCASE ═══ */}
      <Container maxW="container.lg" py="var(--section-py)">
        <VStack gap={2} mb={10} textAlign="center">
          <Heading as="h2" fontSize={{ base: "2xl", md: "4xl" }} fontFamily="heading" color="brand.ink">
            two themes, <Box as="span" className="gradient-text">one you</Box>
          </Heading>
          <Text fontFamily="body" fontSize="md" color="brand.inkSoft" maxW="500px">
            Notebook for the warm, handcrafted feel. Studio for the sleek, modern dark mode. Switch anytime.
          </Text>
        </VStack>

        <Box className="theme-compare-container">
          {/* Notebook Preview */}
          <M className="theme-preview notebook-preview" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Box className="theme-label">✎ Notebook</Box>
            <Box bg="#FCFBF8" p={6} minH="280px">
              <Box bg="white" borderRadius="12px" border="1px solid rgba(27,27,27,0.12)" p={5} boxShadow="0 2px 12px rgba(0,0,0,0.06)" mb={4}>
                <HStack gap={3} mb={2}>
                  <Box w={10} h={10} borderRadius="full" bg="#FFC900" display="flex" alignItems="center" justifyContent="center" fontSize="lg" border="1.5px solid #1B1B1B" fontFamily="'Patrick Hand', cursive">A</Box>
                  <Box>
                    <Text fontFamily="'Patrick Hand', cursive" fontWeight="700" fontSize="md" color="#1B1B1B">ArtistName</Text>
                    <Text fontFamily="'Space Grotesk', sans-serif" fontSize="xs" color="#6B6B6B">digital art & illustration</Text>
                  </Box>
                </HStack>
              </Box>
              <Grid templateColumns="1fr 1fr" gap={3}>
                <Box bg="#FFC900" borderRadius="12px" p={3} transform="rotate(-1.5deg)">
                  <Text fontFamily="'Patrick Hand', cursive" fontSize="xs" color="#1B1B1B" fontWeight="700">@fan_123</Text>
                  <Text fontFamily="'Patrick Hand', cursive" fontSize="sm" color="#1B1B1B">love it! 🎨</Text>
                </Box>
                <Box bg="#FF66F4" borderRadius="12px" p={3} transform="rotate(1deg)">
                  <Text fontFamily="'Patrick Hand', cursive" fontSize="xs" color="#1B1B1B" fontWeight="700">@collector</Text>
                  <Text fontFamily="'Patrick Hand', cursive" fontSize="sm" color="#1B1B1B">amazing work</Text>
                </Box>
              </Grid>
            </Box>
          </M>

          {/* Studio Preview */}
          <M className="theme-preview studio-preview" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <Box className="theme-label">✨ Studio</Box>
            <Box bg="#08060E" p={6} minH="280px">
              <Box bg="rgba(255,255,255,0.03)" borderRadius="16px" border="1px solid rgba(255,255,255,0.06)" p={5} mb={4}>
                <HStack gap={3} mb={2}>
                  <Box w={10} h={10} borderRadius="full" bg="linear-gradient(135deg, #9945FF, #14F195)" display="flex" alignItems="center" justifyContent="center" fontSize="lg" color="white" fontFamily="'Inter', sans-serif" fontWeight="700">A</Box>
                  <Box>
                    <Text fontFamily="'Inter', sans-serif" fontWeight="700" fontSize="md" color="#EAEAEA">ArtistName</Text>
                    <Text fontFamily="'Inter', sans-serif" fontSize="xs" color="rgba(255,255,255,0.45)">digital art & illustration</Text>
                  </Box>
                </HStack>
              </Box>
              <Grid templateColumns="1fr 1fr" gap={3}>
                <Box bg="rgba(255,255,255,0.03)" borderRadius="16px" border="1px solid rgba(255,255,255,0.06)" p={3}>
                  <Text fontFamily="'Inter', sans-serif" fontSize="xs" color="rgba(255,255,255,0.45)" fontWeight="700">@fan_123</Text>
                  <Text fontFamily="'Inter', sans-serif" fontSize="sm" color="#EAEAEA">love it! 🎨</Text>
                </Box>
                <Box bg="rgba(255,255,255,0.03)" borderRadius="16px" border="1px solid rgba(255,255,255,0.06)" p={3}>
                  <Text fontFamily="'Inter', sans-serif" fontSize="xs" color="rgba(255,255,255,0.45)" fontWeight="700">@collector</Text>
                  <Text fontFamily="'Inter', sans-serif" fontSize="sm" color="#EAEAEA">amazing work</Text>
                </Box>
              </Grid>
            </Box>
          </M>
        </Box>
      </Container>

      {/* ═══ TIP WALL DEMO ═══ */}
      <Box className="cta-section" py="var(--section-py)">
        <Container maxW="container.lg">
          <VStack gap={2} mb={10} textAlign="center">
            <Heading as="h2" fontSize={{ base: "2xl", md: "4xl" }} fontFamily="heading" color="brand.ink">
              every tip becomes a <Box as="span" className="gradient-text">sticky note</Box>
            </Heading>
            <Text fontFamily="body" fontSize="md" color="brand.inkSoft" maxW="500px">
              supporters leave messages that stick to your page. it&apos;s a living, breathing wall of gratitude.
            </Text>
          </VStack>

          <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }} gap={4} maxW="800px" mx="auto">
            {DEMO_TIPS.map((tip, i) => (
              <M
                key={tip.name}
                className={`sticky-note ${tip.color}`}
                style={{ transform: `rotate(${i % 2 === 0 ? '1.5deg' : '-1.5deg'})` }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.06 * i }}
              >
                <Box position="absolute" top="-2" left="50%" transform="translateX(-50%)" w={3} h={3} bg="brand.markerRed" borderRadius="full" boxShadow="sm" border="1px solid var(--theme-card-border)" />
                <HStack justifyContent="space-between" mb={2}>
                  <Text fontWeight="bold" color="brand.inkSoft" fontSize="xs" fontFamily="body">@{tip.name}</Text>
                  <Badge bg="transparent" color="brand.ink" border="1px solid" borderColor="brand.ink" borderRadius="full" px={2} fontSize="xs" fontFamily="body">
                    ◎ {tip.amount}
                  </Badge>
                </HStack>
                <Text color="brand.ink" fontSize="md" fontFamily="heading" lineHeight="1.3">{tip.message}</Text>
              </M>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ═══ LEADERBOARD DEMO ═══ */}
      <Container maxW="container.lg" py="var(--section-py)">
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={10} alignItems="center">
          <Box>

            <Heading as="h2" fontSize={{ base: "2xl", md: "4xl" }} fontFamily="heading" color="brand.ink" mb={4}>
              give your fans <Box as="span" className="gradient-text">recognition</Box>
            </Heading>
            <Text fontFamily="body" fontSize="md" color="brand.inkSoft" lineHeight="1.7" mb={4}>
              Top supporters are ranked by total tips. The leaderboard updates in real-time. Your biggest fans see their name at the top — and they love it.
            </Text>
            <HStack gap={3} flexWrap="wrap">
              <Text className="stat-pill">🏆 Auto-ranked</Text>
              <Text className="stat-pill">⚡ Real-time updates</Text>
              <Text className="stat-pill">📊 Tip count tracking</Text>
            </HStack>
          </Box>

          <M className="glass-card" p={6} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Heading as="h3" size="md" color="brand.ink" mb={4} fontFamily="heading">🏆 Top Supporters</Heading>
            <VStack align="stretch" gap={3}>
              {DEMO_LEADERBOARD.map((entry, i) => (
                <M key={entry.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.08 * i }}>
                  <HStack
                    gap={3}
                    p={3}
                    bg={entry.rank <= 3 ? "brand.paperDeep" : "transparent"}
                    borderRadius="md"
                    border={entry.rank === 1 ? "1.5px solid" : "none"}
                    borderColor={entry.rank === 1 ? "brand.markerYellow" : "transparent"}
                  >
                    <Text fontSize="lg" minW="28px" textAlign="center">{entry.emoji}</Text>
                    <Box flex={1}>
                      <Text fontFamily="heading" fontSize="sm" fontWeight="700" color="brand.ink">@{entry.name}</Text>
                      <Text fontFamily="body" fontSize="xs" color="brand.inkSoft">{entry.tips} tips</Text>
                    </Box>
                    <Text fontFamily="heading" fontSize="md" fontWeight="700" className="gradient-text">◎ {entry.total}</Text>
                  </HStack>
                </M>
              ))}
            </VStack>
          </M>
        </Grid>
      </Container>

      {/* ═══ CUSTOMIZATION GRID ═══ */}
      <Box className="cta-section" py="var(--section-py)">
        <Container maxW="container.lg">
          <VStack gap={2} mb={10} textAlign="center">
            <Heading as="h2" fontSize={{ base: "2xl", md: "4xl" }} fontFamily="heading" color="brand.ink">
              your page, <Box as="span" className="gradient-text">your choices</Box>
            </Heading>
          </VStack>

          <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" }} gap={4}>
            {CUSTOMIZATION_OPTIONS.map((opt, i) => (
              <M key={opt.title} className="glass-card" p={5} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.03 * i }}>
                <Text fontSize="2xl" mb={3}>{opt.icon}</Text>
                <Text fontFamily="heading" fontSize="sm" fontWeight="700" color="brand.ink" mb={1}>{opt.title}</Text>
                <Text fontFamily="body" fontSize="xs" color="brand.inkSoft" lineHeight="1.6">{opt.desc}</Text>
              </M>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ═══ LINK-IN-BIO ═══ */}
      <Container maxW="container.lg" py="var(--section-py)">
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={10} alignItems="center">
          <M className="glass-card" p={6} textAlign="center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Box w={16} h={16} borderRadius="full" bg="brand.markerPink" display="flex" alignItems="center" justifyContent="center" fontSize="3xl" mx="auto" mb={4} border="2px solid" borderColor="brand.ink">
              🎸
            </Box>
            <Text fontFamily="heading" fontSize="xl" fontWeight="700" color="brand.ink" mb={1}>@smokeyjazz</Text>
            <Text fontFamily="body" fontSize="sm" color="brand.inkSoft" mb={4}>late-night chill streams + lo-fi sets</Text>
            <VStack gap={2} maxW="240px" mx="auto">
              <Box w="full" bg="brand.paperDeep" border="1px solid" borderColor="var(--theme-card-border)" borderRadius="md" p={2.5} textAlign="center">
                <Text fontFamily="body" fontSize="sm" color="brand.ink">💸 Tip me in SOL</Text>
              </Box>
              <Box w="full" bg="brand.paperDeep" border="1px solid" borderColor="var(--theme-card-border)" borderRadius="md" p={2.5} textAlign="center">
                <Text fontFamily="body" fontSize="sm" color="brand.ink">🎵 Spotify</Text>
              </Box>
              <Box w="full" bg="brand.paperDeep" border="1px solid" borderColor="var(--theme-card-border)" borderRadius="md" p={2.5} textAlign="center">
                <Text fontFamily="body" fontSize="sm" color="brand.ink">📺 YouTube</Text>
              </Box>
            </VStack>
          </M>

          <Box>

            <Heading as="h2" fontSize={{ base: "2xl", md: "4xl" }} fontFamily="heading" color="brand.ink" mb={4}>
              More than a{" "}
              <Box as="span" className="gradient-text">link-in-bio</Box>
            </Heading>
            <Text fontFamily="body" fontSize="md" color="brand.inkSoft" lineHeight="1.7" mb={6}>
              Your PuffTip page is a tip page, a fan engagement hub, and a link-in-bio all in one. Share one URL — pufftip.com/u/you — and let supporters interact with you directly.
            </Text>
            <VStack align="stretch" gap={3}>
              {[
                "Custom URL: pufftip.com/u/yourname",
                "Real-time tip wall with messages",
                "Donor leaderboard for top fans",
                "Instant SOL to your wallet",
                "Works on any device, no app needed",
              ].map(feature => (
                <HStack key={feature} gap={3}>
                  <Box color="var(--theme-solana-green)" flexShrink={0}><FiCheck size={16} /></Box>
                  <Text fontFamily="body" fontSize="sm" color="brand.ink">{feature}</Text>
                </HStack>
              ))}
            </VStack>
          </Box>
        </Grid>
      </Container>

      {/* ═══ CTA ═══ */}
      <Container maxW="container.md" py="var(--section-py)" textAlign="center">
        <M initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Heading as="h2" fontSize={{ base: "2xl", md: "4xl" }} fontFamily="heading" color="brand.ink" mb={4}>
            Start getting tipped{" "}
            <Box as="span" className="gradient-text">today</Box>
          </Heading>
          <Text fontFamily="body" fontSize="md" color="brand.inkSoft" maxW="lg" mx="auto" mb={8} lineHeight="1.7">
            Claim your handle, customize your page, share your link. Tips land in your Solana wallet instantly.
          </Text>
          <HStack gap={3} justifyContent="center" flexWrap="wrap">
            <button className="premium-btn primary" onClick={() => router.push("/register")}>
              Create Your Page →
            </button>
            <button className="premium-btn secondary" onClick={() => router.push("/for-streamers")}>
              I&apos;m a Streamer
            </button>
          </HStack>
        </M>
      </Container>
    </>
  );
}
