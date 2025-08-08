import { Box, Text, Button, VStack, HStack } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { motion } from "framer-motion";
import PizzaIcon from "./pizzaIcon";

const cheeseDrip = keyframes`
  0% { transform: translateY(0);}
  100% { transform: translateY(20px);}
`;

const MotionBox = motion(Box);

const PizzaTheme = () => {
  return (
    <Box
      bgGradient="linear(to-br, #ffd469, #ff924a 60%, #e16a32)"
      minH="500px"
      borderRadius="2xl"
      p={10}
      boxShadow="xl"
      position="relative"
      overflow="hidden"
      color="brown"
      fontFamily="cursive"
    >
      <HStack gap={8} justifyContent="center">
        {/* Large Pizza icon with cheese drips */}
        <MotionBox
          position="relative"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <PizzaIcon boxSize={44} />
          {/* Cheese drip animation */}
          <Box
            position="absolute"
            bottom="0"
            left="26%"
            width="10px"
            height="36px"
            bg="yellow.200"
            borderRadius="full"
            animation={`${cheeseDrip} 1.1s ease-in-out infinite alternate`}
            opacity={0.7}
            zIndex={1}
          />
          <Box
            position="absolute"
            bottom="0"
            left="54%"
            width="8px"
            height="24px"
            bg="yellow.100"
            borderRadius="full"
            animation={`${cheeseDrip} 1.7s ease-in-out infinite alternate`}
            opacity={0.5}
          />
        </MotionBox>
        <VStack gap={6} align="flex-start">
          <Text fontSize="4xl" fontWeight="bold">
            Buy me a Pizza 🍕
          </Text>
          <Text fontSize="lg" maxW="400px">
            Every slice brings me closer to my dreams. Thank you for tipping!
          </Text>
          <Button colorScheme="orange" size="lg" borderRadius="full" shadow="lg">
            Tip in SOL
          </Button>
        </VStack>
      </HStack>
      {/* Fun floating pepperoni */}
      {[...Array(6)].map((_, idx) => (
        <Box
          key={idx}
          position="absolute"
          top={`${Math.random() * 80 + 5}px`}
          left={`${Math.random() * 60 + 10}%`}
          width="20px"
          height="20px"
          bg="red.300"
          borderRadius="full"
          border="2px solid #b55137"
          opacity={0.14 * (idx + 2)}
          filter="blur(0.5px)"
        />
      ))}
    </Box>
  );
};

export default PizzaTheme;
