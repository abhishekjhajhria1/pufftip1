import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

type ThemeType = 'cyberpunk' | 'coffee' | 'pixel' | 'default';

interface BackgroundProps {
    theme?: ThemeType;
    children?: React.ReactNode;
}

const MotionBox = motion(Box);

export default function Background({ theme = 'default', children }: BackgroundProps) {
    return (
        <Box position="relative" minH="100vh" overflow="hidden" bg="brand.dark">
            {/* Background Layer */}
            <Box position="absolute" inset={0} zIndex={0}>
                {theme === 'cyberpunk' && <CyberpunkBg />}
                {theme === 'coffee' && <CoffeeBg />}
                {theme === 'pixel' && <PixelBg />}
                {theme === 'default' && <DefaultBg />}
            </Box>

            {/* Content Layer */}
            <Box position="relative" zIndex={1} w="full" h="full">
                {children}
            </Box>
        </Box>
    );
}

function DefaultBg() {
    return (
        <Box w="full" h="full" bgGradient="linear(to-br, brand.dark, purple.900)" />
    )
}

function CyberpunkBg() {
    return (
        <Box w="full" h="full" bg="black">
            {/* Grid */}
            <Box
                position="absolute"
                inset={0}
                opacity={0.3}
                style={{
                    backgroundImage: `linear-gradient(to right, #FF0080 1px, transparent 1px),
                            linear-gradient(to bottom, #00BFFF 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }}
            />
            {/* Moving Glow */}
            <MotionBox
                position="absolute"
                top="-50%"
                left="-50%"
                w="200%"
                h="200%"
                bgGradient="radial(circle, rgba(255,0,128,0.2) 0%, transparent 70%)"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
        </Box>
    );
}

function CoffeeBg() {
    return (
        <Box w="full" h="full" bgGradient="linear(to-b, #3e2723, #1a0b0e)">
            {/* Floating steam particles */}
            {[...Array(10)].map((_, i) => (
                <MotionBox
                    key={i}
                    position="absolute"
                    bottom="-10%"
                    left={`${Math.random() * 100}%`}
                    w={`${Math.random() * 50 + 20}px`}
                    h={`${Math.random() * 50 + 20}px`}
                    bg="white"
                    opacity={0.1}
                    borderRadius="full"
                    animate={{
                        y: -1000,
                        x: Math.random() * 100 - 50,
                        opacity: [0, 0.2, 0],
                        scale: [1, 2],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 5
                    }}
                />
            ))}
        </Box>
    )
}

function PixelBg() {
    return (
        <Box w="full" h="full" bg="gray.900">
            {/* Static Noise Overlay (Simulated via CSS or image ideally, simple opacity blocks here) */}
            {[...Array(20)].map((_, i) => (
                <MotionBox
                    key={i}
                    position="absolute"
                    top={`${Math.random() * 100}%`}
                    left={`${Math.random() * 100}%`}
                    w={`${Math.random() * 40 + 10}px`}
                    h={`${Math.random() * 40 + 10}px`}
                    bg={i % 2 === 0 ? "brand.cyan" : "brand.pink"}
                    opacity={0.2}
                    animate={{
                        opacity: [0.1, 0.5, 0.1],
                        scale: [1, 1.1, 1]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 2
                    }}
                />
            ))}
        </Box>
    )
}
