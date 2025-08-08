import { Box, Text, Button, VStack, HStack } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { motion } from "framer-motion";
import CandyIcon from "./candyIcon";

const candyFloat = keyframes`
  0% { transform: translateY(0);}
  100% { transform: translateY(-18px);}
`;

const MotionBox = motion(Box);

const CandyTheme = () => {
  return (
    <Box
      bgGradient="linear(to-br, #f7e7fa 40%, #ff62d4 100%)"
      minH="500px"
      borderRadius="2xl"
      p={10}
      boxShadow="xl"
      position="relative"
      overflow="hidden"
      color="#a20ca3"
      fontFamily="Comic Sans MS, Comic Sans, cursive"
    >
      <HStack gap={8} justifyContent="center">
        <MotionBox
          position="relative"
          initial={{ rotate: -8, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <CandyIcon boxSize={44} />
        </MotionBox>
        <VStack gap={6} align="flex-start">
          <Text fontSize="4xl" fontWeight="bold">
            Buy me a Candy 🍬
          </Text>
          <Text fontSize="lg" maxW="400px">
            Sweeten my day! Thanks for your kind support.
          </Text>
          <Button colorScheme="pink" size="lg" borderRadius="full" shadow="lg">
            Tip in SOL
          </Button>
        </VStack>
      </HStack>
      {/* Animated floating candies */}
      {[...Array(6)].map((_, idx) => (
        <Box
          key={idx}
          position="absolute"
          left={`${8 + idx * 11}%`}
          bottom={`${7 + idx * 8}px`}
          animation={`${candyFloat} ${2.2 + idx * 0.3}s ease-in-out infinite alternate`}
          zIndex={0}
        >
          <CandyIcon boxSize={8 + idx * 2} opacity={0.25 + idx * 0.1} />
        </Box>
      ))}
    </Box>
  );
};

export default CandyTheme;
