/**
 * OBS Setup Guide — Hand-Drawn Zine
 */

import { Box, VStack, Heading, Text, Container, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Head from "next/head";
import { FiCopy } from "react-icons/fi";

const M = motion(Box);

export default function OBSPage() {
  const sampleUrl = "https://pufftip.com/overlay/@yourhandle?key=•••";

  return (
    <>
      <Head>
        <title>OBS Setup Guide — PuffTip</title>
        <meta name="description" content="Add real-time Solana tip notifications to your OBS stream in under 2 minutes." />
      </Head>

      <Container maxW="container.lg" py="var(--section-py)">
        <VStack gap={10} align="stretch">
          <Box textAlign="center">
            <Text fontFamily="heading" fontSize="sm" color="brand.inkSoft">"zine #1"</Text>
            <Text fontFamily="body" fontSize="sm" color="brand.inkSoft">a hand-drawn guide</Text>
            <Heading as="h1" fontSize={{ base: "3xl", md: "5xl" }} fontFamily="heading" color="brand.ink" mt={2}>
              wire up OBS
            </Heading>
            <Text fontFamily="body" fontSize="md" color="brand.inkSoft" mt={2}>
              four steps. takes about three minutes. no plugins, no installs — just one browser source URL.
            </Text>
          </Box>

          <VStack gap={4} align="stretch">
            {[
              {
                num: "1",
                title: "claim your handle",
                desc: "pick a @handle (yours forever). pufftip generates a unique URL for your tip overlay.",
                note: "→ keep this URL secret-ish. anyone with it can spoof tips on YOUR overlay.",
              },
              {
                num: "2",
                title: "open OBS · add browser source",
                desc: "in OBS, hit + on Sources → Browser. paste the URL. set width 800, height 600. transparent by default.",
              },
              {
                num: "3",
                title: "test it",
                desc: "from your dashboard, hit 'send a fake tip'. it should appear on stream in under a second.",
              },
              {
                num: "4",
                title: "go live, get tipped",
                desc: "share your /u/handle URL anywhere — bio, panels, chat. tips land in the wallet you connected.",
              },
            ].map((step) => (
              <Box key={step.num} className="zine-step">
                <Box className="zine-number">{step.num}</Box>
                <Box>
                  <Heading as="h3" size="sm" fontFamily="heading" color="brand.ink" mb={1}>{step.title}</Heading>
                  <Text fontFamily="body" fontSize="sm" color="brand.inkSoft" lineHeight="1.7">{step.desc}</Text>
                  {step.note && (
                    <Text fontFamily="body" fontSize="sm" color="brand.inkSoft" mt={2}>{step.note}</Text>
                  )}
                  {step.num === "1" && (
                    <Box className="zine-card" mt={3}>
                      <Text fontFamily="body" fontSize="xs" color="brand.inkSoft"># your overlay url</Text>
                      <HStack justifyContent="space-between" mt={1}>
                        <Text fontFamily="heading" fontSize="sm" color="brand.ink">{sampleUrl}</Text>
                        <ButtonLikeCopy value={sampleUrl} />
                      </HStack>
                    </Box>
                  )}
                  {step.num === "2" && (
                    <Box className="zine-card" mt={3}>
                      <Text fontFamily="body" fontSize="xs" color="brand.inkSoft">+ Browser Source</Text>
                      <Text fontFamily="body" fontSize="xs" color="brand.inkSoft">URL: [paste]</Text>
                      <Text fontFamily="body" fontSize="xs" color="brand.inkSoft">Width: 800</Text>
                      <Text fontFamily="body" fontSize="xs" color="brand.inkSoft">Height: 600</Text>
                      <Text fontFamily="body" fontSize="xs" color="brand.inkSoft">✓ Refresh on becoming active</Text>
                    </Box>
                  )}
                  {step.num === "3" && (
                    <Box className="paper-card" p={3} mt={3}>
                      <Text fontFamily="heading" fontSize="xs" color="brand.ink">@cryptowhale · 2.5 SOL</Text>
                      <Text fontFamily="heading" fontSize="sm" color="brand.ink">huge play! smoke break for u 🚬</Text>
                    </Box>
                  )}
                  {step.num === "4" && (
                    <Box className="zine-card" mt={3}>
                      <Text fontFamily="body" fontSize="xs" color="brand.inkSoft">pufftip.com/u/yourhandle</Text>
                      <Text fontFamily="body" fontSize="xs" color="brand.inkSoft">share this. that&apos;s the page.</Text>
                    </Box>
                  )}
                </Box>
              </Box>
            ))}
          </VStack>

          <Box>
            <Heading as="h2" size="md" fontFamily="heading" color="brand.ink" mb={3}>scribbles in the margin</Heading>
            <VStack align="stretch" gap={3}>
              {[
                { q: "do viewers need a wallet?", a: "yes — phantom or backpack. takes 30 seconds. they can also tip with apple pay (we onramp behind the scenes)." },
                { q: "what&apos;s the fee?", a: "2%. that&apos;s it. see /pricing for the receipt." },
                { q: "what about USDC?", a: "yep, USDC and USDT on solana too. we auto-swap if your viewer sends a different token." },
                { q: "can i customize the overlay?", a: "absolutely — fonts, colors, animations, sounds. dashboard has a live editor." },
              ].map((item) => (
                <Box key={item.q} className="paper-card" p={4}>
                  <Text fontFamily="heading" fontSize="sm" color="brand.ink">{item.q}</Text>
                  <Text fontFamily="body" fontSize="sm" color="brand.inkSoft">{item.a}</Text>
                </Box>
              ))}
            </VStack>
          </Box>

          <Box className="paper-card" p={6} textAlign="center">
            <Heading as="h3" size="sm" fontFamily="heading" color="brand.ink" mb={2}>stuck?</Heading>
            <Text fontFamily="body" fontSize="sm" color="brand.inkSoft" mb={4}>we hang out in discord. drop in, we&apos;ll walk you through it.</Text>
            <HStack justifyContent="center" gap={3} flexWrap="wrap">
              <button className="premium-btn primary" onClick={() => window.location.href = "/explore"}>browse streamers instead</button>
              <button className="premium-btn secondary" onClick={() => window.location.href = "/register"}>claim your handle →</button>
            </HStack>
          </Box>
        </VStack>
      </Container>
    </>
  );
}

function ButtonLikeCopy({ value }: { value: string }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
  };

  return (
    <button className="premium-btn secondary" style={{ padding: "6px 12px", fontSize: "12px" }} onClick={handleCopy}>
      <FiCopy size={14} /> copy
    </button>
  );
}
