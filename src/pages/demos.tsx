/**
 * Demos Page — Interactive Feature Gallery
 */
import {
  Box, VStack, Heading, Text, Container, Grid, HStack, GridItem,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import Head from "next/head";

const M = motion(Box);

export default function DemosPage() {
  const router = useRouter();
  const [activeNotif, setActiveNotif] = useState<string | null>(null);
  const [activeStack, setActiveStack] = useState("stack");
  const [previewKey, setPreviewKey] = useState(0);
  const [playingSound, setPlayingSound] = useState<string | null>(null);

  const triggerNotif = useCallback((mode: string) => {
    setActiveNotif(null);
    setTimeout(() => { setActiveNotif(mode); setPreviewKey(k => k + 1); }, 50);
    setTimeout(() => setActiveNotif(null), 3000);
  }, []);

  return (
    <>
      <Head>
        <title>Demos — PuffTip</title>
        <meta name="description" content="Interactive demos of PuffTip notification modes, content styles, sound alerts, and theme options." />
      </Head>

      {/* HERO */}
      <Box position="relative" overflow="hidden">
        <Box className="glow-orb purple" w="500px" h="500px" top="-200px" left="40%" />
        <Container maxW="container.lg" py={{ base: "3rem", md: "5rem" }} position="relative" zIndex={2}>
          <VStack gap={4} textAlign="center" maxW="600px" mx="auto">
            <M initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Box className="solana-badge">🎮 INTERACTIVE DEMOS</Box>
            </M>
            <M initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Heading as="h1" fontSize={{ base: "3xl", md: "5xl" }} fontFamily="heading" color="brand.ink">
                See PuffTip <Box as="span" className="gradient-text">in action</Box>
              </Heading>
            </M>
            <M initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <Text fontSize="md" color="brand.inkSoft" fontFamily="body" lineHeight="1.7">
                Click, tap, and explore every feature.
              </Text>
            </M>
          </VStack>
        </Container>
      </Box>

      {/* NOTIFICATION MODES */}
      <Container maxW="container.lg" py="var(--section-py)">
        <VStack gap={2} mb={8} textAlign="center">
          <Text fontFamily="body" fontSize="xs" color="brand.solana" fontWeight="700" letterSpacing="widest" textTransform="uppercase">TRY IT</Text>
          <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }} fontFamily="heading" color="brand.ink">Notification Modes</Heading>
          <Text fontFamily="body" fontSize="sm" color="brand.inkSoft">Click each to preview</Text>
        </VStack>
        <Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap={6}>
          <GridItem>
            <Box className="demo-container" minH="320px">
              <Box className="demo-toolbar">
                <Box className="demo-dot" bg="#FF5F57" /><Box className="demo-dot" bg="#FEBC2E" /><Box className="demo-dot" bg="#28C840" />
                <Text ml={2} fontSize="xs" color="brand.inkSoft" fontFamily="body">Live Preview</Text>
              </Box>
              <Box position="relative" minH="260px">
                {activeNotif && (
                  <M key={`n-${previewKey}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {activeNotif === "toast" && (
                      <Box position="absolute" bottom="16px" right="16px" maxW="280px">
                        <Box className="mini-toast"><Text fontSize="lg">◎</Text><Box><Text fontFamily="heading" fontSize="sm" fontWeight="700" color="brand.ink">@viewer tipped 2.5 SOL</Text><Text fontFamily="body" fontSize="xs" color="brand.inkSoft">&quot;great stream! 🔥&quot;</Text></Box></Box>
                      </Box>
                    )}
                    {activeNotif === "banner" && (
                      <Box position="absolute" top="16px" left="16px" right="16px">
                        <Box className="mini-banner">🎉 @whale tipped 10.0 SOL</Box>
                      </Box>
                    )}
                    {activeNotif === "slide-in" && (
                      <Box position="absolute" right="16px" top="40%">
                        <Box className="mini-slide-in"><HStack gap={3}><Text fontSize="xl">💸</Text><Box><Text fontFamily="heading" fontSize="sm" fontWeight="700" color="brand.ink">New Tip!</Text><Text fontFamily="body" fontSize="xs" color="brand.inkSoft">@chill — ◎ 1.0</Text></Box></HStack></Box>
                      </Box>
                    )}
                    {activeNotif === "modal" && (
                      <Box className="mini-modal-backdrop"><Box className="mini-modal"><Text fontSize="2xl" mb={2}>🎉</Text><Text fontFamily="heading" fontWeight="700" color="brand.ink">Mega Tip!</Text><Text fontFamily="heading" fontSize="xl" fontWeight="700" className="gradient-text">◎ 50.0</Text></Box></Box>
                    )}
                  </M>
                )}
                {!activeNotif && (
                  <VStack position="absolute" inset={0} alignItems="center" justifyContent="center" opacity={0.4}>
                    <Text fontSize="3xl">👆</Text><Text fontFamily="body" fontSize="sm" color="brand.inkSoft">Click a mode to preview</Text>
                  </VStack>
                )}
                <Box position="absolute" inset={0} opacity={0.03} bg="repeating-linear-gradient(0deg, var(--theme-text) 0px, transparent 1px, transparent 20px), repeating-linear-gradient(90deg, var(--theme-text) 0px, transparent 1px, transparent 20px)" borderRadius="md" />
              </Box>
            </Box>
          </GridItem>
          <GridItem>
            <VStack gap={3} align="stretch">
              {[
                { id: "toast", icon: "🍞", label: "Toast", desc: "Corner pop-up" },
                { id: "banner", icon: "📢", label: "Banner", desc: "Full-width alert" },
                { id: "slide-in", icon: "➡️", label: "Slide-in", desc: "Right edge slide" },
                { id: "modal", icon: "🪟", label: "Modal", desc: "Center takeover" },
              ].map((mode, i) => (
                <M key={mode.id} className={`notification-preview ${activeNotif === mode.id ? "active" : ""}`} minH="auto" p={4} onClick={() => triggerNotif(mode.id)} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: 0.06 * i }}>
                  <HStack gap={3}><Text fontSize="xl">{mode.icon}</Text><Box flex={1}><Text fontFamily="heading" fontSize="md" fontWeight="700" color="brand.ink">{mode.label}</Text><Text fontFamily="body" fontSize="xs" color="brand.inkSoft">{mode.desc}</Text></Box></HStack>
                </M>
              ))}
            </VStack>
          </GridItem>
        </Grid>
      </Container>

      {/* CONTENT STYLES */}
      <Box className="cta-section" py="var(--section-py)">
        <Container maxW="container.lg">
          <VStack gap={2} mb={8} textAlign="center">
            <Text fontFamily="body" fontSize="xs" color="brand.solana" fontWeight="700" letterSpacing="widest" textTransform="uppercase">VISUAL EFFECTS</Text>
            <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }} fontFamily="heading" color="brand.ink">Content Styles</Heading>
          </VStack>
          <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(5, 1fr)" }} gap={4}>
            {[
              { icon: "✏️", label: "Simple", desc: "Clean text" },
              { icon: "🎨", label: "Rich", desc: "Styled card" },
              { icon: "🎊", label: "Confetti", desc: "Particles" },
              { icon: "🪙", label: "Coin", desc: "Coin drop" },
              { icon: "⚡", label: "All", desc: "Random" },
            ].map((s, i) => (
              <M key={s.label} className="content-style-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.06 * i }}>
                <Box className="style-preview-icon">{s.icon}</Box>
                <Text fontFamily="heading" fontSize="sm" fontWeight="700" color="brand.ink" mb={1}>{s.label}</Text>
                <Text fontFamily="body" fontSize="xs" color="brand.inkSoft">{s.desc}</Text>
              </M>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* STACKING MODES */}
      <Container maxW="container.lg" py="var(--section-py)">
        <VStack gap={2} mb={8} textAlign="center">
          <Text fontFamily="body" fontSize="xs" color="brand.solana" fontWeight="700" letterSpacing="widest" textTransform="uppercase">MULTIPLE TIPS</Text>
          <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }} fontFamily="heading" color="brand.ink">Stacking Modes</Heading>
        </VStack>
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
          {[
            { id: "stack", icon: "📚", label: "Stack", desc: "Tips pile up on screen. All visible simultaneously." },
            { id: "replace", icon: "🔄", label: "Replace", desc: "New tips replace old ones. Only latest visible." },
            { id: "queue", icon: "📋", label: "Queue", desc: "Tips display one by one. Each gets its moment." },
          ].map((mode, i) => (
            <M key={mode.id} className="glass-card" p={6} textAlign="center" cursor="pointer" onClick={() => setActiveStack(mode.id)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.08 * i }} border={activeStack === mode.id ? "1.5px solid" : "1px solid"} borderColor={activeStack === mode.id ? "var(--theme-solana)" : "var(--theme-card-border)"}>
              <Text fontSize="2xl" mb={3}>{mode.icon}</Text>
              <Text fontFamily="heading" fontSize="lg" fontWeight="700" color="brand.ink" mb={2}>{mode.label}</Text>
              <Text fontFamily="body" fontSize="sm" color="brand.inkSoft" lineHeight="1.6">{mode.desc}</Text>
            </M>
          ))}
        </Grid>
      </Container>

      {/* SOUND BOARD */}
      <Box className="cta-section" py="var(--section-py)">
        <Container maxW="container.lg">
          <VStack gap={2} mb={8} textAlign="center">
            <Text fontFamily="body" fontSize="xs" color="brand.solana" fontWeight="700" letterSpacing="widest" textTransform="uppercase">AUDIO</Text>
            <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }} fontFamily="heading" color="brand.ink">Sound Alert Board</Heading>
          </VStack>
          <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(5, 1fr)" }} gap={4} maxW="650px" mx="auto">
            {[
              { id: "chime", icon: "🔔", label: "Chime" },
              { id: "coinDrop", icon: "🪙", label: "Coin Drop" },
              { id: "blip", icon: "💫", label: "Blip" },
              { id: "cashRegister", icon: "🏦", label: "Cash Register" },
              { id: "bell", icon: "🛎️", label: "Bell" },
            ].map((s, i) => (
              <M key={s.id} className={`sound-btn ${playingSound === s.id ? "playing" : ""}`} onClick={() => { setPlayingSound(s.id); setTimeout(() => setPlayingSound(null), 800); }} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: 0.06 * i }}>
                <Box className="sound-icon">{s.icon}</Box><Text fontSize="xs" fontWeight="700">{s.label}</Text>
              </M>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* SHOWCASE PROFILES */}
      <Container maxW="container.lg" py="var(--section-py)">
        <VStack gap={2} mb={8} textAlign="center">
          <Text fontFamily="body" fontSize="xs" color="brand.solana" fontWeight="700" letterSpacing="widest" textTransform="uppercase">SHOWCASE</Text>
          <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }} fontFamily="heading" color="brand.ink">Example Creator Pages</Heading>
        </VStack>
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
          {[
            { emoji: "🎸", name: "Smokey Jazz", handle: "smokeyjazz", type: "Music Streamer", desc: "Studio theme, rich notifications, lo-fi vibes", tags: ["Studio", "Slide-in", "Rich"] },
            { emoji: "🎨", name: "Pixel Artist", handle: "pixelartist", type: "Digital Artist", desc: "Notebook theme, confetti notifications, gallery-style", tags: ["Notebook", "Toast", "Confetti"] },
            { emoji: "💻", name: "Code Streamer", handle: "codingstreamer", type: "Tech Streamer", desc: "Studio theme, simple notifications, minimal layout", tags: ["Studio", "Banner", "Simple"] },
          ].map((c, i) => (
            <M key={c.handle} className="gradient-border-card" p={6} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.08 * i }} cursor="pointer" onClick={() => router.push(`/showcase/${c.handle}`)}>
              <HStack gap={3} mb={4}>
                <Box className="showcase-avatar" w="56px" h="56px" fontSize="1.8rem">{c.emoji}</Box>
                <Box><Text fontFamily="heading" fontSize="lg" fontWeight="700" color="brand.ink">{c.name}</Text><Text fontFamily="body" fontSize="xs" color="brand.solana" fontWeight="600">{c.type}</Text></Box>
              </HStack>
              <Text fontFamily="body" fontSize="sm" color="brand.inkSoft" lineHeight="1.6" mb={4}>{c.desc}</Text>
              <HStack gap={2} flexWrap="wrap">
                {c.tags.map(t => <Text key={t} className="stat-pill">✨ {t}</Text>)}
              </HStack>
              <Text fontFamily="body" fontSize="xs" color="brand.solana" fontWeight="600" mt={4}>View demo →</Text>
            </M>
          ))}
        </Grid>
      </Container>

      {/* CTA */}
      <Container maxW="container.md" py="var(--section-py)" textAlign="center">
        <M initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }} fontFamily="heading" color="brand.ink" mb={4}>
            Ready to build <Box as="span" className="gradient-text">yours</Box>?
          </Heading>
          <HStack gap={3} justifyContent="center" flexWrap="wrap">
            <button className="premium-btn primary" onClick={() => router.push("/register")}>Create Your Page →</button>
            <button className="premium-btn secondary" onClick={() => router.push("/features")}>All Features</button>
          </HStack>
        </M>
      </Container>
    </>
  );
}
