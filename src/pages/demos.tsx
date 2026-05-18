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
  const [previewTheme, setPreviewTheme] = useState<"notebook" | "studio">("studio");
  const [previewAccent, setPreviewAccent] = useState("#9945FF");

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
          <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }} fontFamily="heading" color="brand.ink">notification modes</Heading>
          <Text fontFamily="body" fontSize="sm" color="brand.inkSoft">click each to preview</Text>
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
            <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }} fontFamily="heading" color="brand.ink">content styles</Heading>
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
          <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }} fontFamily="heading" color="brand.ink">stacking modes</Heading>
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
            <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }} fontFamily="heading" color="brand.ink">sound alert board</Heading>
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

      {/* THEME PREVIEW */}
      <Container maxW="container.lg" py="var(--section-py)">
        <VStack gap={2} mb={8} textAlign="center">
          <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }} fontFamily="heading" color="brand.ink">theme preview</Heading>
          <Text fontFamily="body" fontSize="sm" color="brand.inkSoft">toggle between notebook and studio — just for this preview</Text>
        </VStack>
        <VStack gap={4} align="center">
          <HStack gap={2}>
            <button
              className={`premium-btn ${previewTheme === "notebook" ? "primary" : "secondary"}`}
              style={{ padding: "6px 16px", fontSize: "13px" }}
              onClick={() => setPreviewTheme("notebook")}
            >✎ notebook</button>
            <button
              className={`premium-btn ${previewTheme === "studio" ? "primary" : "secondary"}`}
              style={{ padding: "6px 16px", fontSize: "13px" }}
              onClick={() => setPreviewTheme("studio")}
            >✨ studio</button>
          </HStack>
          <Box className="theme-compare-container" w="full" maxW="800px">
            <M
              key={previewTheme}
              className={`theme-preview ${previewTheme}-preview`}
              gridColumn="1 / -1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Box className="theme-label">{previewTheme === "notebook" ? "✎ Notebook" : "✨ Studio"}</Box>
              <Box
                bg={previewTheme === "notebook" ? "#FCFBF8" : "#0A0A0B"}
                p={6}
                minH="280px"
              >
                {/* Profile card */}
                <Box
                  bg={previewTheme === "notebook" ? "white" : "rgba(255,255,255,0.04)"}
                  borderRadius={previewTheme === "notebook" ? "12px" : "14px"}
                  border={`1px solid ${previewTheme === "notebook" ? "rgba(27,27,27,0.12)" : "rgba(255,255,255,0.08)"}`}
                  p={5}
                  mb={4}
                >
                  <HStack gap={3} mb={2}>
                    <Box
                      w={10} h={10} borderRadius="full"
                      bg={previewTheme === "notebook" ? "#FFC900" : "linear-gradient(135deg, #9945FF, #14F195)"}
                      display="flex" alignItems="center" justifyContent="center"
                      fontSize="lg"
                      border={previewTheme === "notebook" ? "1.5px solid #1B1B1B" : "none"}
                      fontFamily={previewTheme === "notebook" ? "'Patrick Hand', cursive" : "'Inter', sans-serif"}
                      fontWeight="700"
                      color={previewTheme === "notebook" ? "#1B1B1B" : "white"}
                    >S</Box>
                    <Box>
                      <Text fontFamily={previewTheme === "notebook" ? "'Patrick Hand', cursive" : "'Inter', sans-serif"} fontWeight="700" fontSize="md" color={previewTheme === "notebook" ? "#1B1B1B" : "#EDEDEF"}>SmokeCreator</Text>
                      <Text fontFamily={previewTheme === "notebook" ? "'Space Grotesk', sans-serif" : "'Inter', sans-serif"} fontSize="xs" color={previewTheme === "notebook" ? "#6B6B6B" : "rgba(255,255,255,0.5)"}>late-night streams & lo-fi sets</Text>
                    </Box>
                  </HStack>
                </Box>
                {/* Tip notes */}
                <Grid templateColumns="1fr 1fr" gap={3}>
                  {[
                    { user: "@fan_123", msg: "love it! 🎨", color: previewTheme === "notebook" ? "#FFC900" : "rgba(255,255,255,0.04)" },
                    { user: "@collector", msg: "amazing work", color: previewTheme === "notebook" ? "#FF66F4" : "rgba(255,255,255,0.04)" },
                  ].map(tip => (
                    <Box
                      key={tip.user}
                      bg={tip.color}
                      borderRadius={previewTheme === "notebook" ? "12px" : "14px"}
                      border={previewTheme === "studio" ? "1px solid rgba(255,255,255,0.08)" : "none"}
                      p={3}
                      transform={previewTheme === "notebook" ? "rotate(-1deg)" : "none"}
                    >
                      <Text fontFamily={previewTheme === "notebook" ? "'Patrick Hand', cursive" : "'Inter', sans-serif"} fontSize="xs" color={previewTheme === "notebook" ? "#1B1B1B" : "rgba(255,255,255,0.5)"} fontWeight="700">{tip.user}</Text>
                      <Text fontFamily={previewTheme === "notebook" ? "'Patrick Hand', cursive" : "'Inter', sans-serif"} fontSize="sm" color={previewTheme === "notebook" ? "#1B1B1B" : "#EDEDEF"}>{tip.msg}</Text>
                    </Box>
                  ))}
                </Grid>
              </Box>
            </M>
          </Box>
        </VStack>
      </Container>

      {/* DURATION TIERS */}
      <Box className="cta-section" py="var(--section-py)">
        <Container maxW="container.lg">
          <VStack gap={2} mb={8} textAlign="center">
            <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }} fontFamily="heading" color="brand.ink">duration tiers</Heading>
            <Text fontFamily="body" fontSize="sm" color="brand.inkSoft">bigger tips stay on screen longer — reward your biggest fans</Text>
          </VStack>
          <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap={4} maxW="800px" mx="auto">
            {[
              { amount: "< 0.5 SOL", duration: "3 seconds", icon: "💨", label: "Quick" },
              { amount: "0.5–2 SOL", duration: "5 seconds", icon: "🌿", label: "Standard" },
              { amount: "2–10 SOL", duration: "8 seconds", icon: "🔥", label: "Featured" },
              { amount: "10+ SOL", duration: "12 seconds", icon: "🐋", label: "Whale" },
            ].map((tier, i) => (
              <M key={tier.label} className="glass-card" p={5} textAlign="center" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.06 * i }}>
                <Text fontSize="2xl" mb={2}>{tier.icon}</Text>
                <Text fontFamily="heading" fontSize="sm" fontWeight="700" color="brand.ink" mb={1}>{tier.label}</Text>
                <Text fontFamily="body" fontSize="xs" color="brand.inkSoft" mb={2}>{tier.amount}</Text>
                <Text fontFamily="heading" fontSize="lg" fontWeight="700" className="gradient-text">{tier.duration}</Text>
              </M>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ACCENT COLORS */}
      <Container maxW="container.lg" py="var(--section-py)">
        <VStack gap={2} mb={8} textAlign="center">
          <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }} fontFamily="heading" color="brand.ink">accent colors</Heading>
          <Text fontFamily="body" fontSize="sm" color="brand.inkSoft">pick an accent for your tip page — make it yours</Text>
        </VStack>
        <HStack gap={4} justifyContent="center" flexWrap="wrap" mb={6}>
          {[
            { name: "Solana", color: "#9945FF" },
            { name: "Ocean", color: "#0EA5E9" },
            { name: "Sunset", color: "#F97316" },
            { name: "Forest", color: "#22C55E" },
            { name: "Rose", color: "#F43F5E" },
            { name: "Gold", color: "#EAB308" },
          ].map(c => (
            <VStack
              key={c.name}
              gap={2}
              cursor="pointer"
              onClick={() => setPreviewAccent(c.color)}
              opacity={previewAccent === c.color ? 1 : 0.6}
              transition="opacity 0.2s"
            >
              <Box
                w={12} h={12} borderRadius="full" bg={c.color}
                border={previewAccent === c.color ? "3px solid var(--theme-text)" : "2px solid var(--theme-card-border)"}
                transition="all 0.2s"
                transform={previewAccent === c.color ? "scale(1.1)" : "none"}
              />
              <Text fontFamily="body" fontSize="xs" color="brand.ink" fontWeight={previewAccent === c.color ? "700" : "400"}>{c.name}</Text>
            </VStack>
          ))}
        </HStack>
        {/* Preview card with accent */}
        <Box maxW="360px" mx="auto">
          <M className="glass-card" p={5} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={previewAccent}>
            <HStack gap={3} mb={3}>
              <Box w={10} h={10} borderRadius="full" bg={previewAccent} display="flex" alignItems="center" justifyContent="center" fontSize="lg" color="white" fontWeight="700" fontFamily="heading">P</Box>
              <Box>
                <Text fontFamily="heading" fontSize="md" fontWeight="700" color="brand.ink">Preview Creator</Text>
                <Text fontFamily="body" fontSize="xs" color="brand.inkSoft">your accent color in action</Text>
              </Box>
            </HStack>
            <Box h="2px" bg={previewAccent} borderRadius="full" mb={3} opacity={0.6} />
            <Box bg="brand.paperDeep" borderRadius="md" p={3} border="1px solid" borderColor="var(--theme-card-border)">
              <HStack justifyContent="space-between" mb={1}>
                <Text fontFamily="body" fontSize="xs" color="brand.inkSoft" fontWeight="700">@supporter</Text>
                <Text fontFamily="heading" fontSize="xs" fontWeight="700" style={{ color: previewAccent }}>◎ 5.00</Text>
              </HStack>
              <Text fontFamily="heading" fontSize="sm" color="brand.ink">great stream, keep it up! 🔥</Text>
            </Box>
          </M>
        </Box>
      </Container>

      {/* SHOWCASE PROFILES */}
      <Container maxW="container.lg" py="var(--section-py)">
        <VStack gap={2} mb={8} textAlign="center">
          <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }} fontFamily="heading" color="brand.ink">example creator pages</Heading>
        </VStack>
        <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
          {[
            { emoji: "🎸", name: "Smokey Jazz", handle: "smokeyjazz", type: "Music Streamer", desc: "Studio theme, rich notifications, lo-fi vibes", tags: ["Studio", "Slide-in", "Rich"] },
            { emoji: "🎨", name: "Pixel Artist", handle: "pixelartist", type: "Digital Artist", desc: "Notebook theme, confetti notifications, gallery-style", tags: ["Notebook", "Toast", "Confetti"] },
            { emoji: "💻", name: "Code Streamer", handle: "codingstreamer", type: "Tech Streamer", desc: "Studio theme, simple notifications, minimal layout", tags: ["Studio", "Banner", "Simple"] },
          ].map((c, i) => (
            <M key={c.handle} className="glass-card" p={6} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.06 * i }} cursor="pointer" onClick={() => router.push(`/showcase/${c.handle}`)}>
              <HStack gap={3} mb={4}>
                <Box className="showcase-avatar" w="56px" h="56px" fontSize="1.8rem">{c.emoji}</Box>
                <Box><Text fontFamily="heading" fontSize="lg" fontWeight="700" color="brand.ink">{c.name}</Text><Text fontFamily="body" fontSize="xs" color="brand.solana" fontWeight="600">{c.type}</Text></Box>
              </HStack>
              <Text fontFamily="body" fontSize="sm" color="brand.inkSoft" lineHeight="1.6" mb={4}>{c.desc}</Text>
              <HStack gap={2} flexWrap="wrap">
                {c.tags.map(t => <Text key={t} className="stat-pill">✨ {t}</Text>)}
              </HStack>
              <Text fontFamily="body" fontSize="xs" color="brand.solana" fontWeight="600" mt={4}>view demo →</Text>
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
