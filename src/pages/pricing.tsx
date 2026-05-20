/**
 * Pricing Page — Receipt Style
 */

import { Box, VStack, Heading, Text, Container, Grid, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Head from "next/head";
import { FiCheck } from "react-icons/fi";

const M = motion(Box);

const FEATURES = [
  "no subscription",
  "no setup fees",
  "no minimum payout",
  "no surprise charges",
];

export default function PricingPage() {
  return (
    <>
      <Head>
        <title>Fees & Pricing — PuffTip</title>
        <meta name="description" content="PuffTip takes just 2%. 98% of every SOL tip goes directly to the creator's wallet." />
      </Head>

      <Container maxW="container.lg" py="var(--section-py)">
        <VStack gap={10} align="stretch">
          <VStack gap={2} textAlign="center" maxW="600px" mx="auto">
            <Heading as="h1" fontSize={{ base: "2xl", md: "4xl" }} fontFamily="heading" color="brand.ink">
              fees, on a receipt
            </Heading>
            <Text fontFamily="body" fontSize="md" color="brand.inkSoft" lineHeight="1.7">
              we hate hidden fees too. here&apos;s the whole thing on a piece of paper. taped to the page so it doesn&apos;t blow away.
            </Text>
          </VStack>

          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8} alignItems="center">
            <M className="receipt-card" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <Text className="receipt-title">PUFFTIP RECEIPT</Text>
              <Text fontFamily="body" fontSize="xs" color="brand.inkSoft">no. 0001 · forever</Text>
              <ul className="receipt-list">
                <li><span>tip processed</span><span>10.00 SOL</span></li>
                <li><span>pufftip fee (2%)</span><span>−0.20 SOL</span></li>
                <li><span>solana network</span><span>−0.000005 SOL</span></li>
                <li><span className="receipt-total">YOU GET</span><span className="receipt-total">9.80 SOL</span></li>
              </ul>
              <Text fontFamily="body" fontSize="xs" color="brand.inkSoft" mt={3}>no subs · no setup fee · no PMs</Text>
              <Text fontFamily="heading" fontSize="sm" color="brand.ink" mt={2}>paid in full</Text>
            </M>

            <Box>
              <Heading as="h2" fontSize={{ base: "xl", md: "2xl" }} fontFamily="heading" color="brand.ink" mb={3}>just 2%</Heading>
              <Text fontFamily="body" fontSize="sm" color="brand.inkSoft" lineHeight="1.7" mb={6}>
                flat. for everyone. always. we don&apos;t take more from new streamers, we don&apos;t take less from huge ones. it&apos;s the same to us.
              </Text>
              <VStack align="stretch" gap={3}>
                {FEATURES.map((f) => (
                  <HStack key={f} gap={3} alignItems="flex-start">
                    <Box mt="2px" color="var(--theme-solana-green)" flexShrink={0}><FiCheck size={16} /></Box>
                    <Text fontFamily="body" fontSize="sm" color="brand.ink">{f}</Text>
                  </HStack>
                ))}
              </VStack>
            </Box>
          </Grid>

          <Box>
            <Heading as="h2" fontSize={{ base: "xl", md: "2xl" }} fontFamily="heading" color="brand.ink" mb={4} textAlign="center">vs other tip platforms</Heading>
            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4} maxW="800px" mx="auto">
              {[
                { platform: "Traditional Platforms", fee: "30-50%", speed: "7-30 days", cost: "$0.30+ per tx" },
                { platform: "ETH-based tips", fee: "0%", speed: "~15 seconds", cost: "$2-50+ gas" },
                { platform: "PuffTip (Solana)", fee: "2%", speed: "<1 second", cost: "<$0.001", highlight: true },
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
            <Text fontFamily="body" fontSize="xs" color="brand.inkSoft" textAlign="center" mt={3}>* numbers as of last time we checked. if these are wrong, yell at us, we&apos;ll fix it.</Text>
          </Box>

          <Box textAlign="center">
            <Text fontFamily="heading" fontSize="lg" color="brand.ink">your math, no surprises.</Text>
            <HStack gap={3} justifyContent="center" mt={3}>
              <button className="premium-btn primary" onClick={() => window.location.href = "/explore"}>find a streamer →</button>
              <button className="premium-btn secondary" onClick={() => window.location.href = "/register"}>start getting tipped</button>
            </HStack>
          </Box>
        </VStack>
      </Container>
    </>
  );
}
