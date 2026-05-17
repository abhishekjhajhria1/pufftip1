/**
 * About Page — Brand Story & Mission
 */
import {
  Box, VStack, Heading, Text, Container, Grid, HStack, Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Head from "next/head";

const M = motion(Box);

interface Stats {
  totalTipsCount: number;
  totalVolumeSol: string;
  uniqueDonors: number;
  uniqueCreators: number;
}

export default function AboutPage() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/stats").then(r => r.ok ? r.json() : null).then(setStats).catch(() => {});
  }, []);

  return (
    <>
      <Head>
        <title>About — PuffTip</title>
        <meta name="description" content="PuffTip is the next-gen Solana tipping platform. Our mission: make creator payments instant, transparent, and fair." />
      </Head>

      {/* HERO */}
      <Box position="relative" overflow="hidden">
        <Box className="glow-orb purple" w="500px" h="500px" top="-200px" left="30%" />
        <Container maxW="container.lg" py={{ base: "4rem", md: "6rem" }} position="relative" zIndex={2}>
          <VStack gap={6} textAlign="center" maxW="650px" mx="auto">
            <M initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <Box className="solana-badge">◎ ABOUT PUFFTIP</Box>
            </M>
            <M initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Heading as="h1" fontSize={{ base: "3xl", md: "5xl" }} fontFamily="heading" color="brand.ink">
                Creators deserve{" "}
                <Box as="span" className="gradient-text">better</Box>
              </Heading>
            </M>
            <M initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <Text fontSize={{ base: "md", md: "lg" }} color="brand.inkSoft" fontFamily="body" lineHeight="1.7">
                Traditional platforms take 30-50% of creator earnings, hold money for weeks, and add layers of complexity. We built PuffTip to fix that — with Solana.
              </Text>
            </M>
          </VStack>
        </Container>
      </Box>

      {/* MISSION */}
      <Container maxW="container.lg" py="var(--section-py)">
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={10} alignItems="center">
          <Box>
            <Text fontFamily="body" fontSize="xs" color="brand.solana" fontWeight="700" letterSpacing="widest" textTransform="uppercase" mb={2}>OUR MISSION</Text>
            <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }} fontFamily="heading" color="brand.ink" mb={4}>
              Make creator payments{" "}
              <Box as="span" className="gradient-text">instant, transparent, and fair</Box>
            </Heading>
            <Text fontFamily="body" fontSize="md" color="brand.inkSoft" lineHeight="1.7" mb={4}>
              We believe creators should receive the money their supporters send — not platforms. PuffTip takes just 5%, settles every tip in under a second, and puts control in the creator&apos;s hands.
            </Text>
            <Text fontFamily="body" fontSize="md" color="brand.inkSoft" lineHeight="1.7">
              No signups to browse. No wallet lock-in. No mandatory features. Just a clean, powerful tipping experience built on the fastest blockchain in the world.
            </Text>
          </Box>

          <VStack gap={4}>
            {[
              { icon: "⚡", title: "Instant", desc: "Sub-second settlement. No holding periods." },
              { icon: "🔍", title: "Transparent", desc: "Every transaction is on-chain and verifiable." },
              { icon: "🤝", title: "Fair", desc: "95% to the creator. Always." },
              { icon: "🎨", title: "Customizable", desc: "Themes, notifications, sounds — your choice." },
            ].map((v, i) => (
              <M key={v.title} className="glass-card" p={5} w="full" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.08 * i }}>
                <HStack gap={3}>
                  <Text fontSize="xl">{v.icon}</Text>
                  <Box>
                    <Text fontFamily="heading" fontSize="md" fontWeight="700" color="brand.ink">{v.title}</Text>
                    <Text fontFamily="body" fontSize="xs" color="brand.inkSoft">{v.desc}</Text>
                  </Box>
                </HStack>
              </M>
            ))}
          </VStack>
        </Grid>
      </Container>

      {/* WHY SOLANA */}
      <Box className="cta-section" py="var(--section-py)">
        <Container maxW="container.lg">
          <VStack gap={2} mb={10} textAlign="center">
            <Text fontFamily="body" fontSize="xs" color="brand.solana" fontWeight="700" letterSpacing="widest" textTransform="uppercase">TECHNOLOGY</Text>
            <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }} fontFamily="heading" color="brand.ink">
              Why we chose <Box as="span" className="gradient-text">Solana</Box>
            </Heading>
          </VStack>

          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
            {[
              { icon: "🚀", title: "Speed", desc: "400ms block times. Tips confirm before the notification animation even finishes.", stat: "<1 second" },
              { icon: "💰", title: "Cost", desc: "Transaction fees are less than $0.001. Tipping $0.50 is viable — try that on Ethereum.", stat: "<$0.001" },
              { icon: "🌐", title: "Scale", desc: "65,000 TPS capacity. PuffTip can handle any creator's audience without breaking a sweat.", stat: "65k TPS" },
            ].map((item, i) => (
              <M key={item.title} className="gradient-border-card" p={6} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.08 * i }}>
                <Text fontSize="2xl" mb={3}>{item.icon}</Text>
                <Text fontFamily="heading" fontSize="lg" fontWeight="700" color="brand.ink" mb={2}>{item.title}</Text>
                <Text fontFamily="body" fontSize="sm" color="brand.inkSoft" lineHeight="1.6" mb={4}>{item.desc}</Text>
                <Text fontFamily="heading" fontSize="2xl" fontWeight="700" className="gradient-text">{item.stat}</Text>
              </M>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* PLATFORM STATS */}
      <Container maxW="container.lg" py="var(--section-py)">
        <VStack gap={2} mb={8} textAlign="center">
          <Text fontFamily="body" fontSize="xs" color="brand.solana" fontWeight="700" letterSpacing="widest" textTransform="uppercase">PLATFORM</Text>
          <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }} fontFamily="heading" color="brand.ink">PuffTip in numbers</Heading>
        </VStack>

        {stats ? (
          <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4, 1fr)" }} gap={4}>
            {[
              { label: "Total Tips", value: stats.totalTipsCount.toLocaleString() },
              { label: "SOL Volume", value: `◎ ${Number(stats.totalVolumeSol).toFixed(2)}` },
              { label: "Creators", value: stats.uniqueCreators.toLocaleString() },
              { label: "Supporters", value: stats.uniqueDonors.toLocaleString() },
            ].map((s, i) => (
              <M key={s.label} className="glass-card" p={5} textAlign="center" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: 0.06 * i }}>
                <Text fontFamily="heading" fontSize="3xl" fontWeight="700" color="brand.ink">{s.value}</Text>
                <Text fontFamily="body" fontSize="xs" color="brand.inkSoft" mt={1}>{s.label}</Text>
              </M>
            ))}
          </Grid>
        ) : (
          <VStack py={8}><Spinner color="brand.solana" /></VStack>
        )}
      </Container>

      {/* ROADMAP */}
      <Box className="cta-section" py="var(--section-py)">
        <Container maxW="container.md">
          <VStack gap={2} mb={10} textAlign="center">
            <Text fontFamily="body" fontSize="xs" color="brand.solana" fontWeight="700" letterSpacing="widest" textTransform="uppercase">ROADMAP</Text>
            <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }} fontFamily="heading" color="brand.ink">
              What&apos;s next
            </Heading>
          </VStack>

          <VStack gap={6} align="stretch">
            {[
              { phase: "Phase 1", title: "Core Platform", status: "complete", items: ["Solana wallet integration", "Creator registration", "Real-time tipping", "OBS overlay"] },
              { phase: "Phase 2", title: "Creator Experience", status: "complete", items: ["Notification system (4 modes)", "Sound alerts (5 sounds)", "Tip wall & leaderboard", "Dual themes"] },
              { phase: "Phase 3", title: "Customization", status: "active", items: ["Content styles", "Stacking modes", "Duration tiers", "Custom page layouts"] },
              { phase: "Phase 4", title: "Growth", status: "upcoming", items: ["Mainnet deployment", "Mobile optimizations", "Creator analytics", "Social integrations"] },
            ].map((phase, i) => (
              <M key={phase.phase} className="roadmap-item" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 * i }}>
                <Box className={`roadmap-dot ${phase.status}`} />
                <Box className="glass-card" p={5}>
                  <HStack mb={2} gap={3}>
                    <Text fontFamily="heading" fontSize="sm" fontWeight="700" className="gradient-text">{phase.phase}</Text>
                    <Text fontFamily="heading" fontSize="md" fontWeight="700" color="brand.ink">{phase.title}</Text>
                    {phase.status === "active" && <Box className="live-badge"><Box className="live-dot" />CURRENT</Box>}
                  </HStack>
                  <HStack gap={2} flexWrap="wrap">
                    {phase.items.map(item => (
                      <Text key={item} className="stat-pill" fontSize="xs">
                        {phase.status === "complete" ? "✅" : phase.status === "active" ? "🔨" : "⏳"} {item}
                      </Text>
                    ))}
                  </HStack>
                </Box>
              </M>
            ))}
          </VStack>
        </Container>
      </Box>

      {/* CTA */}
      <Container maxW="container.md" py="var(--section-py)" textAlign="center">
        <M initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Heading as="h2" fontSize={{ base: "2xl", md: "3xl" }} fontFamily="heading" color="brand.ink" mb={4}>
            Join the <Box as="span" className="gradient-text">movement</Box>
          </Heading>
          <Text fontFamily="body" fontSize="md" color="brand.inkSoft" maxW="lg" mx="auto" mb={8}>
            Create your page. Share your link. Start getting tipped in SOL.
          </Text>
          <HStack gap={3} justifyContent="center" flexWrap="wrap">
            <button className="premium-btn primary" onClick={() => router.push("/register")}>Create Your Page →</button>
            <button className="premium-btn secondary" onClick={() => router.push("/explore")}>Explore Creators</button>
          </HStack>
        </M>
      </Container>
    </>
  );
}
