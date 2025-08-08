import { Box, Text, Button, VStack, HStack } from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { motion } from "framer-motion";
import CoffeeIcon from "./coffeeIcon";

const steamAnimation = keyframes`
  0% { opacity: 0.8; transform: translateY(0) rotate(0deg);}
  50% { opacity: 0.4; transform: translateY(-25px) rotate(2deg);}
  100% { opacity: 0; transform: translateY(-50px) rotate(5deg);}
`;

const MotionBox = motion(Box);

const CoffeeTheme = () => {
    return (
        <Box
            bgGradient="linear(to-br, #6f4e37, #d7ccc8)"
            minH="500px"
            borderRadius="2xl"
            p={10}
            boxShadow="xl"
            position="relative"
            overflow="hidden"
            color="#3e2723"
            fontFamily="Georgia, serif"
        >
            <HStack gap={8} justifyContent="center">
                <MotionBox
                    position="relative"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <CoffeeIcon size="40px" />
                    {/* Animated steam coming from coffee */}
                    {[...Array(4)].map((_, idx) => (
                        <Box
                            key={idx}
                            position="absolute"
                            top="10px"
                            left={`${25 + idx * 7}%`}
                            w="14px"
                            h="28px"
                            bg="#d7ccc8"
                            borderRadius="full"
                            animation={`${steamAnimation} 4s ease-in-out infinite`}
                            style={{ animationDelay: `${idx * 0.7}s` }}
                            filter="blur(3px)"
                            pointerEvents="none"
                        />
                    ))}
                </MotionBox>
                <VStack gap={6} align="flex-start">
                    <Text fontSize="4xl" fontWeight="bold">
                        Buy me a Coffee ☕
                    </Text>
                    <Text fontSize="lg" maxW="400px">
                        Fuel my creativity with a warm coffee. Your support means a lot!
                    </Text>
                    <Button colorScheme="brown" size="lg" borderRadius="full" shadow="lg">
                        Tip in SOL
                    </Button>
                </VStack>
            </HStack>
            {/* Extra decorative blobs for cozy atmosphere */}
            <Box
                position="absolute"
                bottom="30px"
                left="20px"
                width="100px"
                height="140px"
                bgGradient="radial(circle, #6f4e37aa, #3e2723cc)"
                borderRadius="full"
                opacity={0.4}
                filter="blur(25px)"
                transform="rotate(20deg)"
            />
            <Box
                position="absolute"
                top="40px"
                right="30px"
                width="60px"
                height="100px"
                bgGradient="radial(circle, #d7ccc8cc, #6f4e3733)"
                borderRadius="full"
                opacity={0.3}
                filter="blur(15px)"
                transform="rotate(-15deg)"
            />
        </Box>
    );
};

export default CoffeeTheme;
