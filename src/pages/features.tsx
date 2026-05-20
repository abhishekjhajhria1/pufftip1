/**
 * Features Deep-Dive Page
 */
import {
  Box, VStack, Heading, Text, Container, Grid, HStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Head from "next/head";

const M = motion(Box);

const FEATURES = [
  { num: "01", icon: "🖥️", title: "OBS Overlay", desc: "One browser source URL. Tips appear on stream as animated notifications in real-time. No plugins, no extensions.", detail: "Paste a single URL into OBS Studio as a Browser Source. Set width to 800, height to 600. Tips show up automatically with smooth entry/exit animations. Works with any streaming software that supports browser sources." },
  { num: "02", icon: "⚡", title: "Instant SOL Payments", desc: "Tips hit your wallet in under a second. No holding periods, no minimum payout, no middlemen.", detail: "Every tip is a direct Solana transaction. The SOL goes straight to your wallet — not to our platform first. We take a 2% fee at the transaction level, and you receive 98% immediately. No waiting days or weeks." },
  { num: "03", icon: "🌐", title: "WebSocket Real-Time", desc: "Tips are pushed instantly via WebSocket. Your overlay stays perfectly in sync.", detail: "We use persistent WebSocket connections between your tip page, the OBS overlay, and our server. When a tip comes in, it's pushed to all connected clients simultaneously — zero polling, zero delay." },
  { num: "04", icon: "🔔", title: "4 Notification Modes", desc: "Toast, Modal, Banner, or Slide-in. Pick what fits your stream.", detail: "Toast: compact corner pop-up. Banner: full-width top alert. Slide-in: smooth right-edge entry. Modal: center-screen takeover for big tips. Mix and match, or let the system choose based on tip amount." },
  { num: "05", icon: "🎊", title: "5 Content Styles", desc: "Simple, Rich, Confetti, Coin, or All. Visual effects for every tip.", detail: "Simple: clean text notification. Rich: styled card with avatar and colors. Confetti: celebration particle burst. Coin: animated coin drop with sound. All: random rotation through all styles." },
  { num: "06", icon: "🔊", title: "5 Sound Alerts", desc: "Chime, Coin Drop, Blip, Cash Register, or Bell. Volume control included.", detail: "Each sound is carefully crafted for stream use — clear but not jarring. Adjustable volume slider, mute toggle, and the ability to switch sounds anytime from notification settings." },
  { num: "07", icon: "📓", title: "Tip Wall", desc: "Every tip shows as a sticky note on your page. A living wall of supporter messages.", detail: "Tips are rendered as colorful sticky notes with pin decorations. They alternate between yellow, pink, and green with subtle rotation. Supporters see each other's messages, creating a community vibe." },
  { num: "08", icon: "🏆", title: "Donor Leaderboard", desc: "Top supporters ranked by total tips. Real-time updated rankings.", detail: "Automatic ranking by total SOL donated. Shows rank, name, total amount, and tip count. Top 3 get special styling. Updates in real-time as new tips come in." },
  { num: "09", icon: "📊", title: "Creator Dashboard", desc: "Track tips, earnings, supporter count. Manage everything in one place.", detail: "See your total tips received, SOL volume, number of unique supporters. Copy your share link, open your public page, and manage your profile — all from one dashboard." },
  { num: "10", icon: "🎨", title: "Dual Themes", desc: "Notebook for the hand-drawn vibe, Studio for the sleek dark mode.", detail: "Notebook: warm paper background, hand-drawn fonts, washi tape, sticky notes, doodle rotations. Studio: dark mode, glassmorphism, Solana gradient accents, clean Inter font." },
  { num: "11", icon: "📚", title: "Stacking Modes", desc: "Stack, Replace, or Queue. Control how multiple tips appear.", detail: "Stack: all tips pile up on screen simultaneously. Replace: new tips instantly replace old ones. Queue: tips display one by one in order, each getting its moment." },
  { num: "12", icon: "⏱️", title: "Duration Tiers", desc: "Set different display times based on tip amount. Big tips stay longer.", detail: "Configure amount-based tiers: tips over 50 SOL stay for 10 seconds, over 10 SOL for 7 seconds, etc. Fully customizable thresholds and durations." },
];

export default function FeaturesPage() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Features — PuffTip</title>
        <meta name="description" content="Every feature in PuffTip: OBS overlay, notifications, sound alerts, tip wall, leaderboard, dual themes, and more." />
      </Head>

      {/* HERO */}
      <Box position="relative" overflow="hidden">
        <Box className="glow-orb purple" w="500px" h="500px" top="-200px" right="20%" />
        <Container maxW="container.lg" py={{ base: "3rem", md: "5rem" }} position="relative" zIndex={2}>
          <VStack gap={4} textAlign="center" maxW="600px" mx="auto">

            <M initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Heading as="h1" fontSize={{ base: "3xl", md: "5xl" }} fontFamily="heading" color="brand.ink">
                Everything you get with <Box as="span" className="gradient-text">PuffTip</Box>
              </Heading>
            </M>
            <M initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <Text fontSize="md" color="brand.inkSoft" fontFamily="body" lineHeight="1.7">
                12 built features. Zero plugins. Free to use. Every feature is included for every creator.
              </Text>
            </M>
          </VStack>
        </Container>
      </Box>

      {/* FEATURES GRID */}
      <Container maxW="container.lg" py="var(--section-py)">
        <VStack gap={6} align="stretch">
          {FEATURES.map((f, i) => (
            <M
              key={f.num}
              className="feature-showcase-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.04 * i }}
            >
              <Grid templateColumns={{ base: "1fr", md: "auto 1fr" }} gap={0}>
                <Box p={{ base: 5, md: 8 }} display="flex" alignItems="flex-start" gap={4} borderRight={{ md: "1px solid" }} borderColor={{ md: "var(--theme-card-border)" }}>
                  <Box className="feature-number" display={{ base: "none", md: "block" }}>{f.num}</Box>
                  <Box>
                    <HStack gap={2} mb={2}>
                      <Text fontSize="xl">{f.icon}</Text>
                      <Text fontFamily="heading" fontSize="lg" fontWeight="700" color="brand.ink">{f.title}</Text>
                    </HStack>
                    <Text fontFamily="body" fontSize="sm" color="brand.inkSoft" lineHeight="1.6" fontWeight="600">{f.desc}</Text>
                  </Box>
                </Box>
                <Box p={{ base: 5, md: 8 }} bg="brand.paperDeep" display="flex" alignItems="center">
                  <Text fontFamily="body" fontSize="sm" color="brand.inkSoft" lineHeight="1.7">{f.detail}</Text>
                </Box>
              </Grid>
            </M>
          ))}
        </VStack>
      </Container>

      {/* STATS STRIP */}
      <Box className="cta-section" py={10}>
        <Container maxW="container.lg">
          <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap={4}>
            {[
              { val: "12", label: "Built features" },
              { val: "4", label: "Notification modes" },
              { val: "5", label: "Sound alerts" },
              { val: "2", label: "Themes" },
            ].map((s, i) => (
              <M key={s.label} className="glass-card" p={5} textAlign="center" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: 0.06 * i }}>
                <Text fontFamily="heading" fontSize="3xl" fontWeight="700" className="gradient-text">{s.val}</Text>
                <Text fontFamily="body" fontSize="xs" color="brand.inkSoft" mt={1}>{s.label}</Text>
              </M>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
      <Container maxW="container.md" py="var(--section-py)" textAlign="center">
        <M initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }} fontFamily="heading" color="brand.ink" mb={4}>
            All features. <Box as="span" className="gradient-text">Free.</Box>
          </Heading>
          <Text fontFamily="body" fontSize="md" color="brand.inkSoft" maxW="lg" mx="auto" mb={8}>
            No premium tiers, no feature gates. Every creator gets everything. We only take 2% per tip.
          </Text>
          <HStack gap={3} justifyContent="center" flexWrap="wrap">
            <button className="premium-btn primary" onClick={() => router.push("/register")}>Create Your Page →</button>
            <button className="premium-btn secondary" onClick={() => router.push("/demos")}>Try the Demos</button>
          </HStack>
        </M>
      </Container>
    </>
  );
}
