import { Box, Text, Button, VStack, HStack } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { motion } from "framer-motion";
import CigaretteIcon from "./cigaretteIcon";

const smokeAnimation = keyframes`
  0% { opacity: 0.8; transform: translateY(0) rotate(0deg);}
  50% { opacity: 0.4; transform: translateY(-30px) rotate(5deg);}
  100% { opacity: 0; transform: translateY(-60px) rotate(10deg);}
`;

const MotionBox = motion(Box);

const CigaretteTheme = () => {
  return (
    <Box
      bgGradient="linear(to-br, #495057, #bcbcbc)"
      minH="500px"
      borderRadius="2xl"
      p={10}
      boxShadow="xl"
      position="relative"
      overflow="hidden"
      color="white"
      fontFamily="monospace"
    >
      <HStack gap={8} justifyContent="center">
        {/* Cigarette icon with animated smoke */}
        <MotionBox
          position="relative"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <CigaretteIcon boxSize={40} />
          {/* Smoke animation */}
          {[...Array(5)].map((_, idx) => (
            <Box
              key={idx}
              position="absolute"
              top="10px"
              left={`${20 + idx * 6}%`}
              w="12px"
              h="24px"
              bg="whiteAlpha.600"
              borderRadius="full"
              animation={`${smokeAnimation} 3s ease-in-out infinite`}
              style={{ animationDelay: `${idx * 0.5}s` }}
              filter="blur(2px)"
              pointerEvents="none"
            />
          ))}
        </MotionBox>

        <VStack gap={6} align="flex-start">
          <Text fontSize="4xl" fontWeight="bold">
            Buy me a Cigarette 🚬
          </Text>
          <Text fontSize="lg" maxW="400px">
            Thanks for supporting me! Your tip goes a long way to brighten my day.
          </Text>
          <Button colorScheme="gray" size="lg" borderRadius="full" shadow="lg">
            Tip in SOL
          </Button>
        </VStack>
      </HStack>

      {/* Extra background/fun elements */}
      <Box
        position="absolute"
        bottom="20px"
        right="20px"
        width="80px"
        height="120px"
        bgGradient="radial(circle, #ff6347, #c93030)"
        borderRadius="full"
        opacity={0.5}
        filter="blur(20px)"
        transform="rotate(15deg)"
      />

      <Box
        position="absolute"
        top="30px"
        left="10px"
        width="40px"
        height="80px"
        bgGradient="radial(circle, #ffffffaa, #bcbcbccc)"
        borderRadius="full"
        opacity={0.3}
        filter="blur(15px)"
        transform="rotate(-25deg)"
      />
    </Box>
  );
};

export default CigaretteTheme;
