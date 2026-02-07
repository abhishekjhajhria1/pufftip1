import { Box, VStack, Text, Flex, Heading, Grid, Accordion, Badge } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@chakra-ui/react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import Background from "@/components/visuals/Background";

const MotionBox = motion(Box);
const MotionText = motion(Text);

export default function Home() {
  const { isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Background theme="cyberpunk">
      <Box color="white" minH="100vh">
        {/* Navbar */}
        <Flex
          position="fixed"
          top={0} left={0} right={0}
          p={6}
          justify="space-between"
          align="center"
          zIndex={100}
          bgGradient="linear(to-b, rgba(0,0,0,0.8), transparent)"
          backdropFilter="blur(5px)"
        >
          <Heading
            size="2xl"
            fontFamily="heading"
            color="brand.cyan"
            textShadow="0 0 10px #00BFFF"
            style={{ letterSpacing: '2px' }}
          >
            PUFFTIP
          </Heading>
          <ConnectButton />
        </Flex>

        {/* Hero */}
        <VStack
          minH="100vh"
          justify="center"
          align="center"
          textAlign="center"
          gap={8}
          px={4}
          pt={20}
        >
          <MotionBox
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <Badge colorScheme="purple" mb={4} fontSize="lg" px={4} py={1} borderRadius="full">
              WEB3 TIPPING FOR EVERYONE
            </Badge>
            <Heading
              size="6xl"
              fontFamily="heading"
              lineHeight="shorter"
              bgGradient="linear(to-r, brand.pink, brand.yellow)"
              bgClip="text"
              filter="drop-shadow(0 0 5px rgba(255,0,128,0.5))"
            >
              LEVEL UP YOUR <br /> CREATIVE INCOME
            </Heading>
          </MotionBox>

          <MotionText
            fontSize="2xl"
            color="gray.300"
            maxW="700px"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            fontFamily="subheading"
          >
            Streamers, Artists, Devs. Receive ETH tips directly.
            <br />
            No middleman. <Text as="span" color="brand.yellow">Instant Payouts.</Text> Zero platform risk.
          </MotionText>

          <MotionBox
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {mounted && isConnected ? (
              <Link href="/dashboard" passHref>
                <Button
                  size="2xl"
                  bg="brand.pink"
                  color="white"
                  fontFamily="heading"
                  fontSize="3xl"
                  px={12}
                  py={8}
                  borderRadius="full"
                  _hover={{
                    transform: "scale(1.1) rotate(-2deg)",
                    boxShadow: "0 0 30px #FF0080"
                  }}
                  boxShadow="0 0 15px #FF0080"
                >
                  GO TO DASHBOARD 🚀
                </Button>
              </Link>
            ) : (
              <Box
                p={6}
                bg="rgba(0,0,0,0.6)"
                borderRadius="xl"
                border="1px solid"
                borderColor="brand.purple"
                backdropFilter="blur(10px)"
              >
                <Text fontSize="xl" fontFamily="heading" mb={2} color="brand.cyan">Connect Wallet to Start</Text>
                <Text fontSize="sm" color="gray.400">(Metamask, Rainbow, etc.)</Text>
              </Box>
            )}
          </MotionBox>
        </VStack>

        {/* Features / Value Prop */}
        <Box bg="blackAlpha.800" py={24} position="relative" zIndex={2}>
          <VStack gap={16} maxW="1200px" mx="auto" px={4}>
            <Heading textAlign="center" size="3xl" color="brand.yellow" fontFamily="heading">WHY PUFFTIP?</Heading>

            <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={10} w="full">
              {[
                { title: "真正 Instant", desc: "Tips go directly to your wallet. No 'Net-30' payout delays.", icon: "⚡" },
                { title: "Zero De-Platforming", desc: "Your page lives on the blockchain. No one can ban your income.", icon: "🛡️" },
                { title: "Fun & Anime", desc: "Rich aesthetics, overlays, and themes that vibe with your community.", icon: "✨" }
              ].map((feature, i) => (
                <MotionBox
                  key={i}
                  whileHover={{ y: -10, borderColor: "#00BFFF" }}
                  p={8}
                  bg="rgba(255,255,255,0.03)"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  borderRadius="2xl"
                  textAlign="left"
                >
                  <Text fontSize="5xl" mb={4}>{feature.icon}</Text>
                  <Heading size="lg" mb={3} color="white">{feature.title}</Heading>
                  <Text color="gray.400" fontSize="lg">{feature.desc}</Text>
                </MotionBox>
              ))}
            </Grid>
          </VStack>
        </Box>

        {/* How It Works */}
        <Box bg="brand.dark" py={24} position="relative" zIndex={2}>
          <Heading textAlign="center" size="3xl" mb={16} color="brand.pink" fontFamily="heading">HOW IT WORKS</Heading>

          <Grid
            templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
            gap={8}
            maxW="1200px"
            mx="auto"
            px={4}
          >
            {[
              { emoji: "🔗", title: "Connect", desc: "Link your ETH wallet. No signups." },
              { emoji: "🎨", title: "Customize", desc: "Set your Theme, Bio, Socials & Goal." },
              { emoji: "💸", title: "Receive", desc: "Share your link or use the Overlay." }
            ].map((item, i) => (
              <MotionBox
                key={i}
                whileHover={{ scale: 1.05 }}
                p={8}
                bg="card"
                border="1px solid"
                borderColor="brand.purple"
                borderRadius="2xl"
                textAlign="center"
              >
                <Text fontSize="6xl" mb={4}>{item.emoji}</Text>
                <Heading size="xl" mb={2} color="brand.cyan">{item.title}</Heading>
                <Text color="gray.400" fontSize="lg">{item.desc}</Text>
              </MotionBox>
            ))}
          </Grid>
        </Box>

        {/* FAQ Section */}
        <Box py={24} maxW="800px" mx="auto" px={4}>
          <Heading textAlign="center" size="2xl" mb={12} color="white" fontFamily="heading">FAQ</Heading>
          <Accordion.Root collapsible>
            {[
              { q: "Is there a fee?", a: "Yes, a tiny 2% protocol fee to support the dev. 98% goes to you instantly." },
              { q: "Do I need a bank account?", a: "Nope! You just need an Ethereum wallet like MetaMask." },
              { q: "Can I use this for non-streaming?", a: "Absolutely. Writers, coders, and artists use PuffTip as a 'Buy Me a Coffee' alternative." }
            ].map((item, i) => (
              <Accordion.Item key={i} value={`item-${i}`} border="1px solid" borderColor="whiteAlpha.200" mb={4} borderRadius="lg" bg="rgba(0,0,0,0.4)">
                <Accordion.ItemTrigger p={6}>
                  <Box flex="1" textAlign="left" fontWeight="bold" fontSize="xl">
                    {item.q}
                  </Box>
                  <Accordion.ItemIndicator />
                </Accordion.ItemTrigger>
                <Accordion.ItemContent pb={6} px={6} color="gray.300">
                  {item.a}
                </Accordion.ItemContent>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Box>

        {/* Footer */}
        <Box py={10} textAlign="center" color="gray.600">
          <Text>Built with 💜 on Ethereum</Text>
        </Box>
      </Box>
    </Background>
  );
}
