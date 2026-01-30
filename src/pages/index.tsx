import { Box, VStack, Text, Flex, Heading } from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Button } from "@chakra-ui/react";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';

export default function Home() {
  const { scrollYProgress } = useScroll();
  const { isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const opacity1 = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.15, 0.5], [0, 1]);
  const opacity3 = useTransform(scrollYProgress, [0.45, 1], [0, 1]);

  return (
    <Box
      minH="200vh"
      bgColor="#1a202c"
      bgGradient="linear(to-br, gray.900, purple.900)"
      bgSize="cover"
      backgroundPosition="center"
      bgRepeat="no-repeat"
      bgAttachment="fixed"
      position="relative"
      overflowX="hidden"
      color="white"
    >
      {/* Navbar / Header */}
      <Flex
        position="fixed"
        top={0}
        left={0}
        right={0}
        p={4}
        justify="space-between"
        align="center"
        zIndex={100}
        bg="rgba(0,0,0,0.3)"
        backdropFilter="blur(10px)"
      >
        <Box
          fontSize={["2xl", "3xl"]}
          fontWeight="extrabold"
          fontFamily="heading"
          textShadow="0 2px 8px black"
          cursor="pointer"
        >
          pufftip
        </Box>
        <Box>
            <ConnectButton />
        </Box>
      </Flex>

      {/* Hero Section */}
      <VStack
        maxW="800px"
        mx="auto"
        gap={16}
        minH="100vh"
        justify="center"
        align="center"
        textAlign="center"
        pt={32}
        zIndex={10}
        position="relative"
        px={4}
      >
        <motion.div style={{ opacity: opacity1 }}>
          <VStack gap={6}>
              <Heading size="4xl" bgGradient="linear(to-r, teal.300, blue.500)" bgClip="text">
                  Crypto Tipping, Reimagined
              </Heading>
              <Text
                fontSize={["xl", "2xl"]}
                fontWeight="medium"
                color="gray.200"
                maxW="600px"
              >
                Seamlessly receive ETH tips from your fans. 
                Customize your page, integrate with streams, and own your earnings.
              </Text>
          </VStack>
        </motion.div>

        <motion.div style={{ opacity: opacity2 }}>
           <Text
            fontSize={["2xl", "4xl"]}
            fontWeight="bold"
            bg="rgba(255,255,255,0.05)"
            p={8}
            borderRadius="3xl"
            backdropFilter="blur(10px)"
            boxShadow="xl"
            border="1px solid rgba(255,255,255,0.1)"
          >
            Powered by Ethereum & Smart Contracts
          </Text>
        </motion.div>

        <motion.div style={{ opacity: opacity3 }}>
         <Text
            fontSize={["xl", "3xl"]}
            fontWeight="bold"
            bg="rgba(255,255,255,0.05)"
            p={8}
            borderRadius="3xl"
             backdropFilter="blur(10px)"
             boxShadow="xl"
             border="1px solid rgba(255,255,255,0.1)"
          >
             2% Flat Fee. Instant Settlements. No Middlemen.
          </Text>
        </motion.div>
      </VStack>

      {/* CTA Button */}
      <Box
        position="fixed"
        left="50%"
        bottom={10}
        transform="translateX(-50%)"
        zIndex={200}
        width="full"
        textAlign="center"
      >
        {mounted && isConnected ? (
             <Link href="/dashboard" passHref legacyBehavior>
             <Button
               as="a"
               size="lg"
               colorScheme="purple"
               fontWeight="bold"
               fontSize={["lg", "2xl"]}
               px={12}
               py={8}
               borderRadius="full"
               shadow="2xl"
               _hover={{
                 transform: "scale(1.05)",
                 boxShadow: "0 0 20px rgba(128, 90, 213, 0.6)",
               }}
             >
               Go to Dashboard
             </Button>
           </Link>
        ) : (
             <Box
                bg="blackAlpha.600"
                p={4}
                borderRadius="xl"
                backdropFilter="blur(5px)"
             >
                 <Text fontWeight="bold" fontSize="lg">Connect your wallet to get started</Text>
             </Box>
        )}
       
      </Box>
    </Box>
  );
}
