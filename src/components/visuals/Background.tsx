/**
 * Background Component
 *
 * Provides ambient visual effects behind the main content.
 * Adapts to the current theme (notebook/studio) via CSS variables.
 * No old theme types — uses the unified dual-theme system.
 */

import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

interface BackgroundProps {
  children?: React.ReactNode;
}

export default function Background({ children }: BackgroundProps) {
  return (
    <Box position="relative" minH="100vh" overflow="hidden">
      {/* Ambient glow layers — visible only in studio mode via CSS */}
      <Box position="absolute" inset={0} zIndex={0} pointerEvents="none">
        <Box className="hero-glow" />
        <Box className="hero-glow-2" />
      </Box>

      {/* Content Layer */}
      <Box position="relative" zIndex={1} w="full" h="full">
        {children}
      </Box>
    </Box>
  );
}
