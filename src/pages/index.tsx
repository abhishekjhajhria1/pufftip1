import { Box, VStack, Text } from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";

import Link from "next/link";
import { Button } from "@chakra-ui/react";

export default function Home() {
  // Scroll progress from 0 (top) to 1 (bottom)
  const { scrollYProgress } = useScroll();

  // Each message will fade in/out at certain scroll ranges (adjust as needed)
  const opacity1 = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.15, 0.5], [0, 1]);
  const opacity3 = useTransform(scrollYProgress, [0.45, 1], [0, 1]);

  return (
    <Box
      minH="200vh" // Extra height so scrolling can happen
      bgImage="url('/bg.png')" // Place bg.png in your public folder
      bgSize="cover"
      backgroundPosition="center"
      bgRepeat="no-repeat"
      bgAttachment="fixed" // Fixes the background so it doesn't move!
      position="relative"
      overflowX="hidden"
      color="white"
      scrollbar="hidden"
    >
      {/* Pufftip in top left corner, always visible */}
      <Box
        position="fixed"
        top={4}
        left={4}
        fontSize={["2xl", "4xl"]}
        fontWeight="extrabold"
        fontFamily="heading"
        textShadow="0 2px 8px black"
        zIndex={20}
        pointerEvents="none"
      >
        pufftip
      </Box>

      {/* Floating scroll-triggered messages */}
      <VStack
        maxW="600px"
        mx="auto"
        gap={16}
        minH="100vh"
        justify="center"
        align="left"
        top={32}
        left={4}
        pt={32}
        zIndex={10}
        position="relative"
      >
        <motion.div style={{ opacity: opacity1 }}>
          <Text
            fontSize={["xl", "4xl"]}
            fontWeight="bold"
            bg="rgba(0,0,0,0.25)"
            p={6}
            borderRadius="2xl"
            boxShadow="md"
          >
            Decentralized, creator-first tipping platform
          </Text>
        </motion.div>
        <motion.div style={{ opacity: opacity2 }}>
          <Text
            fontSize={["lg", "3xl"]}
            fontWeight="bold"
            bg="rgba(0,0,0,0.20)"
            p={6}
            borderRadius="2xl"
            boxShadow="md"
          >
            Support your favorite creators directly and securely, powered by
            Solana blockchain
          </Text>
        </motion.div>
        <motion.div style={{ opacity: opacity3 }}>
          <Text
            fontSize={["md", "3xl"]}
            fontWeight="bold"
            bg="rgba(0,0,0,0.17)"
            p={6}
            borderRadius="2xl"
            boxShadow="md"
          >
            Fun, transparent tipping — no middlemen, no delays
          </Text>
        </motion.div>
      </VStack>
      <Box
        position="fixed"
        left="50%"
        bottom={6}
        transform="translateX(-50%)"
        zIndex={200}
      >
        <Link href="/register" passHref legacyBehavior>
          <Button
            as="a"
            size="lg"
            colorScheme="teal"
            fontWeight="bold"
            fontSize={["lg", "2xl"]}
            px={10}
            py={6}
            borderRadius="xl"
            shadow="lg"
            _hover={{
              transform: "scale(1.07)",
              boxShadow: "2xl",
            }}
          >
            Create Account
          </Button>
        </Link>
      </Box>
    </Box>
  );
}
