/**
 * Pricing Page — Premium
 */

import { Box, VStack, Heading, Text, Container, Grid, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Head from "next/head";
import { FiCheck } from "react-icons/fi";

const M = motion(Box);

const FEATURES = [
  "Custom creator page with unique URL",
  "Real-time OBS overlay with animations",
  "WebSocket-powered instant tip delivery",
  "4 notification display modes",
  "Sound alerts & mute controls",
  "Donor leaderboard with rankings",
  "Tip wall with sticky notes",
  "Creator dashboard with analytics",
  "Dual theme support",
  "Unlimited tips & supporters",
];

export default function PricingPage() {
  return (
    <>
      <Head>
        <title>Fees & Pricing — PuffTip</title>
        <meta name="description" content="PuffTip takes just 5%. 95% of every SOL tip goes directly to the creator's wallet." />
      </Head>

      <Container maxW="container.lg" py="var(--section-py)">
        <VStack gap={10} align="stretch">
          {/* Header */}
          <VStack gap={2} textAlign="center" maxW="600px" mx="auto">
            <Heading as="h1" fontSize={{ base: "2xl", md: "4xl" }} fontFamily="heading" color="brand.ink">
              Simple, transparent pricing
            </Heading>
            <Text fontFamily="body" fontSize="md" color="brand.inkSoft" lineHeight="1.7">
              No subscriptions, no hidden fees. PuffTip takes a small 5% platform fee — 95% goes directly to your Solana wallet.
            </Text>
          </VStack>

          {/* Pricing Card */}
          <M className="glass-card" maxW="480px" mx="auto" w="full" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <Box p={8}>
              <Box mb={6}>
                <Text fontFamily="heading" fontSize="sm" fontWeight="600" color="brand.inkSoft" mb={1}>Creator Plan</Text>
                <Heading fontFamily="heading" fontSize="4xl" color="brand.ink">Free</Heading>
              </Box>

              <Box h="1px" bg="var(--theme-card-border)" mb={6} />

              <VStack align="stretch" gap={3} mb={6}>
                {FEATURES.map(f => (
                  <HStack key={f} gap={3} alignItems="flex-start">
                    <Box mt="2px" color="var(--theme-solana-green)" flexShrink={0}><FiCheck size={16} /></Box>
                    <Text fontFamily="body" fontSize="sm" color="brand.ink">{f}</Text>
                  </HStack>
                ))}
              </VStack>

              <Box h="1px" bg="var(--theme-card-border)" mb={6} />

              <VStack gap={1} mb={6}>
                <HStack justifyContent="space-between" w="full">
                  <Text fontFamily="body" fontSize="sm" color="brand.inkSoft">Platform fee</Text>
                  <Text fontFamily="heading" fontSize="md" fontWeight="700" color="brand.ink">5%</Text>
                </HStack>
                <HStack justifyContent="space-between" w="full">
                  <Text fontFamily="body" fontSize="sm" color="brand.inkSoft">Creator receives</Text>
                  <Text fontFamily="heading" fontSize="md" fontWeight="700" className="gradient-text">95%</Text>
                </HStack>
                <HStack justifyContent="space-between" w="full">
                  <Text fontFamily="body" fontSize="sm" color="brand.inkSoft">Solana tx fee</Text>
                  <Text fontFamily="heading" fontSize="md" fontWeight="700" color="brand.ink">&lt;$0.001</Text>
                </HStack>
              </VStack>

              <button className="premium-btn primary" style={{ width: "100%" }} onClick={() => window.location.href = "/register"}>
                Start Getting Tipped →
              </button>
            </Box>
          </M>

          {/* Comparison */}
          <Box>
            <Heading as="h2" fontSize={{ base: "xl", md: "2xl" }} fontFamily="heading" color="brand.ink" mb={4} textAlign="center">How we compare</Heading>
            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4} maxW="800px" mx="auto">
              {[
                { platform: "Traditional Platforms", fee: "30-50%", speed: "7-30 days", cost: "$0.30+ per tx" },
                { platform: "ETH-based tips", fee: "0%", speed: "~15 seconds", cost: "$2-50+ gas" },
                { platform: "PuffTip (Solana)", fee: "5%", speed: "<1 second", cost: "<$0.001", highlight: true },
              ].map((p, i) => (
                <M key={p.platform} className="glass-card" p={5} textAlign="center" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: 0.06 * i }}>
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
          </Box>
        </VStack>
      </Container>
    </>
  );
}
