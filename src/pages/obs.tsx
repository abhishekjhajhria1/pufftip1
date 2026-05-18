/**
 * OBS Setup Guide — Premium
 */

import { Box, VStack, Heading, Text, Container, Grid, HStack, Button } from "@chakra-ui/react";
import { useState } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import { FiCopy, FiCheck, FiMonitor, FiZap, FiBell, FiSettings } from "react-icons/fi";

const M = motion(Box);

export default function OBSPage() {
  const [copied, setCopied] = useState(false);
  const sampleUrl = "https://pufftip.com/embed/yourusername";

  const handleCopy = () => {
    navigator.clipboard.writeText(sampleUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <Head>
        <title>OBS Setup Guide — PuffTip</title>
        <meta name="description" content="Add real-time Solana tip notifications to your OBS stream in under 2 minutes." />
      </Head>

      <Container maxW="container.lg" py="var(--section-py)">
        <VStack gap={10} align="stretch">
          {/* Header */}
          <VStack gap={2} textAlign="center" maxW="600px" mx="auto">
            <Heading as="h1" fontSize={{ base: "2xl", md: "4xl" }} fontFamily="heading" color="brand.ink">
              Tip alerts on stream in{" "}
              <Box as="span" className="gradient-text">2 minutes</Box>
            </Heading>
            <Text fontFamily="body" fontSize="md" color="brand.inkSoft" lineHeight="1.7">
              Add real-time Solana tip notifications to your OBS stream using a single browser source URL.
            </Text>
          </VStack>

          {/* Steps */}
          <VStack gap={6} align="stretch">
            {[
              {
                num: "01",
                title: "Register your account",
                desc: "Connect your Solana wallet and create a username. This gives you a unique tip page and overlay URL.",
                icon: <FiSettings size={20} />,
              },
              {
                num: "02",
                title: "Copy your overlay URL",
                desc: "Your overlay URL is automatically generated. It follows this format:",
                icon: <FiCopy size={20} />,
                hasUrl: true,
              },
              {
                num: "03",
                title: "Add Browser Source in OBS",
                desc: "In OBS Studio, add a new Browser Source. Paste your overlay URL, set width to 800 and height to 600. Make sure \"Shutdown source when not visible\" is unchecked.",
                icon: <FiMonitor size={20} />,
              },
              {
                num: "04",
                title: "Go live & receive tips",
                desc: "That's it. When someone sends you SOL through your tip page, the notification will appear on your stream with animations and sound alerts.",
                icon: <FiZap size={20} />,
              },
            ].map((step, i) => (
              <M key={step.num} className="glass-card" p={6} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.08 * i }}>
                <HStack gap={4} alignItems="flex-start" flexWrap={{ base: "wrap", md: "nowrap" }}>
                  <Box w={10} h={10} borderRadius="full" display="flex" alignItems="center" justifyContent="center" bg="brand.paperDeep" border="1.5px solid" borderColor="var(--theme-card-border)" flexShrink={0} color="brand.ink">
                    {step.icon}
                  </Box>
                  <Box flex={1}>
                    <HStack gap={3} mb={2}>
                      <Text fontFamily="heading" fontSize="sm" fontWeight="700" className="gradient-text">{step.num}</Text>
                      <Text fontFamily="heading" fontSize="lg" fontWeight="700" color="brand.ink">{step.title}</Text>
                    </HStack>
                    <Text fontFamily="body" fontSize="sm" color="brand.inkSoft" lineHeight="1.7">{step.desc}</Text>
                    {step.hasUrl && (
                      <HStack mt={3} gap={2} flexWrap="wrap">
                        <Box flex={1} minW="200px" bg="brand.paperDeep" border="1px solid" borderColor="var(--theme-card-border)" borderRadius="md" px={3} py={2}>
                          <Text fontFamily="body" fontSize="sm" color="brand.ink" wordBreak="break-all">{sampleUrl}</Text>
                        </Box>
                        <Button onClick={handleCopy} size="sm" bg={copied ? "brand.markerGreen" : "brand.ink"} color="brand.paper" fontFamily="heading" borderRadius="md" _hover={{ opacity: 0.9 }}>
                          <HStack gap={1}>{copied ? <FiCheck /> : <FiCopy />}<Text>{copied ? "Copied!" : "Copy"}</Text></HStack>
                        </Button>
                      </HStack>
                    )}
                  </Box>
                </HStack>
              </M>
            ))}
          </VStack>

          {/* Features Grid */}
          <Box>
            <Heading as="h2" fontSize={{ base: "xl", md: "2xl" }} fontFamily="heading" color="brand.ink" mb={4} textAlign="center">Overlay features</Heading>
            <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr", md: "repeat(4, 1fr)" }} gap={4}>
              {[
                { icon: "⚡", title: "Real-time", desc: "WebSocket powered — zero delay" },
                { icon: "🔔", title: "Sound alerts", desc: "Audio notifications on each tip" },
                { icon: "🎨", title: "Animated", desc: "Smooth entry/exit animations" },
                { icon: "💬", title: "Messages", desc: "Shows donor name, amount & note" },
              ].map((f, i) => (
                <M key={f.title} className="glass-card" p={4} textAlign="center" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.05 * i }}>
                  <Text fontSize="xl" mb={2}>{f.icon}</Text>
                  <Text fontFamily="heading" fontSize="sm" fontWeight="700" color="brand.ink" mb={1}>{f.title}</Text>
                  <Text fontFamily="body" fontSize="xs" color="brand.inkSoft">{f.desc}</Text>
                </M>
              ))}
            </Grid>
          </Box>

          {/* CTA */}
          <Box className="glass-card" p={8} textAlign="center">
            <Heading as="h3" fontSize="xl" fontFamily="heading" color="brand.ink" mb={2}>Ready to add tip alerts?</Heading>
            <Text fontFamily="body" fontSize="sm" color="brand.inkSoft" mb={4}>Register your account and start receiving SOL tips on stream.</Text>
            <button className="premium-btn primary" onClick={() => window.location.href = "/register"}>
              Create Your Account →
            </button>
          </Box>
        </VStack>
      </Container>
    </>
  );
}
