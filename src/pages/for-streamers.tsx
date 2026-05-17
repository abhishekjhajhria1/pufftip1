/**
 * For Streamers Page — Streamer-Specific Landing
 *
 * Sections:
 * 1. Hero — streamer-focused headline
 * 2. Notification Mode Gallery — interactive preview of all 4 modes
 * 3. Content Style Previews — Simple, Rich, Confetti, Coin, All
 * 4. Sound Alert Board — playable audio previews
 * 5. OBS Integration — setup simplicity showcase
 * 6. Fee Comparison — moved from pricing page
 * 7. CTA — conversion
 */

import {
  Box, VStack, Heading, Text, Container, Grid, HStack, GridItem,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import { FiMonitor, FiZap, FiBell, FiMusic } from "react-icons/fi";

const M = motion(Box);

const NOTIFICATION_MODES = [
  {
    id: "toast",
    label: "Toast",
    icon: "🍞",
    desc: "Compact pop-up in the corner. Clean, non-intrusive, disappears automatically.",
    preview: "toast",
  },
  {
    id: "banner",
    label: "Banner",
    icon: "📢",
    desc: "Full-width alert across the top. High visibility, great for big tips.",
    preview: "banner",
  },
  {
    id: "slide-in",
    label: "Slide-in",
    icon: "➡️",
    desc: "Slides in from the right edge. Smooth, modern, stacks neatly.",
    preview: "slide-in",
  },
  {
    id: "modal",
    label: "Modal",
    icon: "🪟",
    desc: "Center-screen takeover. Maximum impact for milestone tips.",
    preview: "modal",
  },
];

const CONTENT_STYLES = [
  { id: "simple", icon: "✏️", label: "Simple", desc: "Clean text — name, amount, message" },
  { id: "rich", icon: "🎨", label: "Rich", desc: "Styled card with avatar and colors" },
  { id: "confetti", icon: "🎊", label: "Confetti", desc: "Particle burst celebration effect" },
  { id: "coin", icon: "🪙", label: "Coin", desc: "Animated coin drop with sound" },
  { id: "all", icon: "⚡", label: "All", desc: "Random rotation of all styles" },
];

const SOUNDS = [
  { id: "chime", icon: "🔔", label: "Chime", desc: "Gentle bell tone" },
  { id: "coinDrop", icon: "🪙", label: "Coin Drop", desc: "Satisfying coin clink" },
  { id: "blip", icon: "💫", label: "Blip", desc: "Quick electronic pop" },
  { id: "cashRegister", icon: "🏦", label: "Cash Register", desc: "Classic ka-ching" },
  { id: "bell", icon: "🛎️", label: "Bell", desc: "Desk bell ding" },
];

export default function ForStreamersPage() {
  const router = useRouter();
  const [activeMode, setActiveMode] = useState("toast");
  const [activeStyle, setActiveStyle] = useState("rich");
  const [playingSound, setPlayingSound] = useState<string | null>(null);
  const [previewKey, setPreviewKey] = useState(0);

  const handleModeClick = useCallback((id: string) => {
    setActiveMode(id);
    setPreviewKey(k => k + 1);
  }, []);

  const handleSoundClick = useCallback((id: string) => {
    setPlayingSound(id);
    setTimeout(() => setPlayingSound(null), 800);
  }, []);

  return (
    <>
      <Head>
        <title>For Streamers — PuffTip</title>
        <meta name="description" content="Real-time OBS tip alerts, 4 notification modes, 5 content styles, and 5 sound alerts. Built for live streamers on Solana." />
      </Head>

      {/* ═══ HERO ═══ */}
      <Box position="relative" overflow="hidden">
        <Box className="glow-orb purple" w="500px" h="500px" top="-200px" right="10%" />
        <Box className="glow-orb green" w="400px" h="400px" bottom="-150px" left="5%" />

        <Container maxW="container.lg" py={{ base: "4rem", md: "7rem" }} position="relative" zIndex={2}>
          <VStack gap={6} textAlign="center" maxW="700px" mx="auto">
            <M initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Box className="solana-badge">🖥️ BUILT FOR STREAMERS</Box>
            </M>

            <M initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <Heading as="h1" fontSize={{ base: "3xl", sm: "5xl", lg: "6xl" }} fontFamily="heading" lineHeight="1.08" color="brand.ink">
                Your stream.{" "}
                <Box as="span" className="gradient-text">Your tips.</Box>
                {" "}Your rules.
              </Heading>
            </M>

            <M initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              <Text fontSize={{ base: "md", md: "lg" }} color="brand.inkSoft" fontFamily="body" maxW="560px" lineHeight="1.7">
                4 notification modes. 5 content styles. 5 sound alerts. Full OBS integration in under 2 minutes. Every tip lands in your wallet instantly.
              </Text>
            </M>

            <M initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
              <HStack gap={3} flexWrap="wrap" justifyContent="center" mt={2}>
                <button className="premium-btn primary" onClick={() => router.push("/register")}>
                  Start Streaming Tips →
                </button>
                <button className="premium-btn secondary" onClick={() => router.push("/obs")}>
                  OBS Setup Guide
                </button>
              </HStack>
            </M>
          </VStack>
        </Container>
      </Box>

      {/* ═══ NOTIFICATION MODES ═══ */}
      <Container maxW="container.lg" py="var(--section-py)">
        <VStack gap={2} mb={10} textAlign="center">
          <Text fontFamily="body" fontSize="xs" color="brand.solana" fontWeight="700" letterSpacing="widest" textTransform="uppercase">NOTIFICATION MODES</Text>
          <Heading as="h2" fontSize={{ base: "2xl", md: "4xl" }} fontFamily="heading" color="brand.ink">
            Pick how tips{" "}
            <Box as="span" className="gradient-text">appear on stream</Box>
          </Heading>
          <Text fontFamily="body" fontSize="md" color="brand.inkSoft" maxW="500px">
            Choose from 4 display modes. Mix and match. Switch anytime from your notification settings.
          </Text>
        </VStack>

        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
          {/* Preview Panel */}
          <GridItem>
            <Box className="demo-container" minH="300px">
              <Box className="demo-toolbar">
                <Box className="demo-dot" bg="#FF5F57" />
                <Box className="demo-dot" bg="#FEBC2E" />
                <Box className="demo-dot" bg="#28C840" />
                <Text ml={2} fontSize="xs" color="brand.inkSoft" fontFamily="body">OBS Stream Preview</Text>
              </Box>

              <Box position="relative" minH="220px" display="flex" alignItems="center" justifyContent="center" flexDirection="column" gap={3}>
                {/* Render active notification preview */}
                <M key={`${activeMode}-${previewKey}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
                  {activeMode === "toast" && (
                    <Box position="absolute" bottom="16px" right="16px">
                      <Box className="mini-toast">
                        <Text fontSize="lg">◎</Text>
                        <Box>
                          <Text fontFamily="heading" fontSize="sm" fontWeight="700" color="brand.ink">@viewer_420 tipped 2.5 SOL</Text>
                          <Text fontFamily="body" fontSize="xs" color="brand.inkSoft">{"\"great stream!!! 🔥\""}</Text>
                        </Box>
                      </Box>
                    </Box>
                  )}
                  {activeMode === "banner" && (
                    <Box position="absolute" top="16px" left="16px" right="16px">
                      <Box className="mini-banner">
                        🎉 @whale_donor just tipped 10.0 SOL — {"\"you're amazing, keep it up!!\""}
                      </Box>
                    </Box>
                  )}
                  {activeMode === "slide-in" && (
                    <Box position="absolute" right="16px" top="50%" transform="translateY(-50%)">
                      <Box className="mini-slide-in">
                        <HStack gap={3}>
                          <Text fontSize="xl">💸</Text>
                          <Box>
                            <Text fontFamily="heading" fontSize="sm" fontWeight="700" color="brand.ink">New Tip!</Text>
                            <Text fontFamily="body" fontSize="xs" color="brand.inkSoft">@chill_viewer — ◎ 1.0 SOL</Text>
                          </Box>
                        </HStack>
                      </Box>
                    </Box>
                  )}
                  {activeMode === "modal" && (
                    <Box className="mini-modal-backdrop">
                      <Box className="mini-modal">
                        <Text fontSize="2xl" mb={2}>🎉</Text>
                        <Text fontFamily="heading" fontWeight="700" color="brand.ink" fontSize="md" mb={1}>Mega Tip!</Text>
                        <Text fontFamily="body" fontSize="sm" color="brand.inkSoft" mb={1}>@legend_supporter</Text>
                        <Text fontFamily="heading" fontSize="xl" fontWeight="700" className="gradient-text">◎ 50.0 SOL</Text>
                      </Box>
                    </Box>
                  )}
                </M>

                {/* Background grid dots to simulate stream */}
                <Box position="absolute" inset={0} opacity={0.05} bg="repeating-linear-gradient(0deg, var(--theme-text) 0px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, var(--theme-text) 0px, transparent 1px, transparent 20px)" borderRadius="md" />
              </Box>
            </Box>
          </GridItem>

          {/* Mode Selector Cards */}
          <GridItem>
            <VStack gap={3} align="stretch">
              {NOTIFICATION_MODES.map((mode, i) => (
                <M
                  key={mode.id}
                  className={`notification-preview ${activeMode === mode.id ? "active" : ""}`}
                  minH="auto"
                  p={4}
                  onClick={() => handleModeClick(mode.id)}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.06 * i }}
                >
                  <HStack gap={3}>
                    <Text fontSize="xl">{mode.icon}</Text>
                    <Box flex={1}>
                      <Text fontFamily="heading" fontSize="md" fontWeight="700" color="brand.ink">{mode.label}</Text>
                      <Text fontFamily="body" fontSize="xs" color="brand.inkSoft" lineHeight="1.5">{mode.desc}</Text>
                    </Box>
                    {activeMode === mode.id && (
                      <Box w="8px" h="8px" borderRadius="full" bg="brand.solana" flexShrink={0} />
                    )}
                  </HStack>
                </M>
              ))}
            </VStack>
          </GridItem>
        </Grid>
      </Container>

      {/* ═══ CONTENT STYLES ═══ */}
      <Box className="cta-section" py="var(--section-py)">
        <Container maxW="container.lg">
          <VStack gap={2} mb={10} textAlign="center">
            <Text fontFamily="body" fontSize="xs" color="brand.solana" fontWeight="700" letterSpacing="widest" textTransform="uppercase">CONTENT STYLES</Text>
            <Heading as="h2" fontSize={{ base: "2xl", md: "4xl" }} fontFamily="heading" color="brand.ink">
              Choose the{" "}
              <Box as="span" className="gradient-text">vibe</Box>
            </Heading>
            <Text fontFamily="body" fontSize="md" color="brand.inkSoft" maxW="500px">
              From minimal text to particle explosions. Every tip can look exactly how you want.
            </Text>
          </VStack>

          <Grid templateColumns={{ base: "repeat(2, 1fr)", sm: "repeat(3, 1fr)", md: "repeat(5, 1fr)" }} gap={4}>
            {CONTENT_STYLES.map((style, i) => (
              <M
                key={style.id}
                className={`content-style-card ${activeStyle === style.id ? "selected" : ""}`}
                onClick={() => setActiveStyle(style.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.06 * i }}
              >
                <Box className="style-preview-icon">{style.icon}</Box>
                <Text fontFamily="heading" fontSize="sm" fontWeight="700" color="brand.ink" mb={1}>{style.label}</Text>
                <Text fontFamily="body" fontSize="xs" color="brand.inkSoft" lineHeight="1.4">{style.desc}</Text>
              </M>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ═══ SOUND ALERTS ═══ */}
      <Container maxW="container.lg" py="var(--section-py)">
        <VStack gap={2} mb={10} textAlign="center">
          <Text fontFamily="body" fontSize="xs" color="brand.solana" fontWeight="700" letterSpacing="widest" textTransform="uppercase">SOUND ALERTS</Text>
          <Heading as="h2" fontSize={{ base: "2xl", md: "4xl" }} fontFamily="heading" color="brand.ink">
            5 built-in sounds,{" "}
            <Box as="span" className="gradient-text">zero setup</Box>
          </Heading>
          <Text fontFamily="body" fontSize="md" color="brand.inkSoft" maxW="500px">
            Tap to preview. Adjust volume, mute, or swap sounds from your notification settings anytime.
          </Text>
        </VStack>

        <Grid templateColumns={{ base: "repeat(2, 1fr)", sm: "repeat(3, 1fr)", md: "repeat(5, 1fr)" }} gap={4} maxW="700px" mx="auto">
          {SOUNDS.map((sound, i) => (
            <M
              key={sound.id}
              className={`sound-btn ${playingSound === sound.id ? "playing" : ""}`}
              onClick={() => handleSoundClick(sound.id)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.06 * i }}
            >
              <Box className="sound-icon">{sound.icon}</Box>
              <Text fontSize="xs" fontWeight="700">{sound.label}</Text>
            </M>
          ))}
        </Grid>

        <Text fontFamily="body" fontSize="xs" color="brand.inkSoft" textAlign="center" mt={4}>
          Volume slider, mute toggle, and per-tip duration tiers included
        </Text>
      </Container>

      {/* ═══ OBS INTEGRATION ═══ */}
      <Box className="cta-section" py="var(--section-py)">
        <Container maxW="container.lg">
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={10} alignItems="center">
            <Box>
              <Text fontFamily="body" fontSize="xs" color="brand.solana" fontWeight="700" letterSpacing="widest" textTransform="uppercase" mb={2}>OBS INTEGRATION</Text>
              <Heading as="h2" fontSize={{ base: "2xl", md: "4xl" }} fontFamily="heading" color="brand.ink" mb={4}>
                One URL.{" "}
                <Box as="span" className="gradient-text">That&apos;s it.</Box>
              </Heading>
              <Text fontFamily="body" fontSize="md" color="brand.inkSoft" lineHeight="1.7" mb={6}>
                Add a single browser source URL to OBS Studio. Tips show up as animated notifications with sound alerts. No plugins, no extensions, no downloads.
              </Text>
              <VStack align="stretch" gap={3}>
                {[
                  { icon: <FiMonitor size={18} />, text: "Paste one URL as a Browser Source" },
                  { icon: <FiZap size={18} />, text: "WebSocket-powered — zero delay" },
                  { icon: <FiBell size={18} />, text: "Animated notifications with sound" },
                  { icon: <FiMusic size={18} />, text: "Volume, mute, and sound selection" },
                ].map((item, i) => (
                  <HStack key={i} gap={3}>
                    <Box color="brand.solana">{item.icon}</Box>
                    <Text fontFamily="body" fontSize="sm" color="brand.ink">{item.text}</Text>
                  </HStack>
                ))}
              </VStack>
            </Box>

            <Box className="demo-container">
              <Box className="demo-toolbar">
                <Box className="demo-dot" bg="#FF5F57" />
                <Box className="demo-dot" bg="#FEBC2E" />
                <Box className="demo-dot" bg="#28C840" />
                <Text ml={2} fontSize="xs" color="brand.inkSoft" fontFamily="body">OBS Studio — Browser Source</Text>
              </Box>
              <Box bg="brand.paperDeep" border="1px solid" borderColor="var(--theme-card-border)" borderRadius="md" p={4}>
                <Text fontFamily="body" fontSize="xs" color="brand.inkSoft" mb={2}>URL</Text>
                <Box bg="brand.paper" border="1px solid" borderColor="var(--theme-card-border)" borderRadius="md" px={3} py={2} mb={4}>
                  <Text fontFamily="body" fontSize="sm" color="brand.ink" wordBreak="break-all">
                    https://pufftip.com/embed/yourusername
                  </Text>
                </Box>
                <Grid templateColumns="1fr 1fr" gap={3}>
                  <Box>
                    <Text fontFamily="body" fontSize="xs" color="brand.inkSoft" mb={1}>Width</Text>
                    <Box bg="brand.paper" border="1px solid" borderColor="var(--theme-card-border)" borderRadius="md" px={3} py={1.5}>
                      <Text fontFamily="body" fontSize="sm" color="brand.ink">800</Text>
                    </Box>
                  </Box>
                  <Box>
                    <Text fontFamily="body" fontSize="xs" color="brand.inkSoft" mb={1}>Height</Text>
                    <Box bg="brand.paper" border="1px solid" borderColor="var(--theme-card-border)" borderRadius="md" px={3} py={1.5}>
                      <Text fontFamily="body" fontSize="sm" color="brand.ink">600</Text>
                    </Box>
                  </Box>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Container>
      </Box>

      {/* ═══ FEE COMPARISON ═══ */}
      <Container maxW="container.lg" py="var(--section-py)">
        <VStack gap={2} mb={10} textAlign="center">
          <Text fontFamily="body" fontSize="xs" color="brand.solana" fontWeight="700" letterSpacing="widest" textTransform="uppercase">FEES</Text>
          <Heading as="h2" fontSize={{ base: "2xl", md: "4xl" }} fontFamily="heading" color="brand.ink">
            95% of every tip goes{" "}
            <Box as="span" className="gradient-text">straight to you</Box>
          </Heading>
        </VStack>

        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4} maxW="800px" mx="auto">
          {[
            { platform: "Traditional Platforms", fee: "30-50%", speed: "7-30 days", cost: "$0.30+ per tx" },
            { platform: "ETH-based tips", fee: "0%", speed: "~15 seconds", cost: "$2-50+ gas" },
            { platform: "PuffTip (Solana)", fee: "5%", speed: "<1 second", cost: "<$0.001", highlight: true },
          ].map((p, i) => (
            <M key={p.platform} className={p.highlight ? "gradient-border-card" : "glass-card"} p={5} textAlign="center" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.08 * i }}>
              <Text fontFamily="heading" fontSize="sm" fontWeight="700" color={p.highlight ? "brand.solana" : "brand.ink"} mb={4}>{p.platform}</Text>
              <VStack gap={3}>
                <Box>
                  <Text fontFamily="heading" fontSize="xl" fontWeight="700" color="brand.ink">{p.fee}</Text>
                  <Text fontFamily="body" fontSize="xs" color="brand.inkSoft">platform fee</Text>
                </Box>
                <Box>
                  <Text fontFamily="heading" fontSize="xl" fontWeight="700" color="brand.ink">{p.speed}</Text>
                  <Text fontFamily="body" fontSize="xs" color="brand.inkSoft">settlement</Text>
                </Box>
                <Box>
                  <Text fontFamily="heading" fontSize="xl" fontWeight="700" color="brand.ink">{p.cost}</Text>
                  <Text fontFamily="body" fontSize="xs" color="brand.inkSoft">per transaction</Text>
                </Box>
              </VStack>
            </M>
          ))}
        </Grid>
      </Container>

      {/* ═══ CTA ═══ */}
      <Container maxW="container.md" py="var(--section-py)" textAlign="center">
        <M initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Heading as="h2" fontSize={{ base: "2xl", md: "4xl" }} fontFamily="heading" color="brand.ink" mb={4}>
            Go live with tip alerts{" "}
            <Box as="span" className="gradient-text">tonight</Box>
          </Heading>
          <Text fontFamily="body" fontSize="md" color="brand.inkSoft" maxW="lg" mx="auto" mb={8} lineHeight="1.7">
            Register. Copy your overlay URL. Paste it in OBS. Start getting tipped in SOL within minutes.
          </Text>
          <HStack gap={3} justifyContent="center" flexWrap="wrap">
            <button className="premium-btn primary" onClick={() => router.push("/register")}>
              Create Your Stream Page →
            </button>
            <button className="premium-btn secondary" onClick={() => router.push("/demos")}>
              See Live Demos
            </button>
          </HStack>
        </M>
      </Container>
    </>
  );
}
