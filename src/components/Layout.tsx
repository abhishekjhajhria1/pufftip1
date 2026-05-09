/**
 * Layout Component
 *
 * Global page wrapper providing:
 * - Animated dark background
 * - Sticky header with nav links + wallet button
 * - Footer with branding
 * - Smooth page transitions via framer-motion
 *
 * Every page is rendered inside this layout via _app.tsx.
 */

import { Box, Container, HStack, Text, Button } from "@chakra-ui/react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Animated background with floating orbs — gives the whole app
 * a premium feel without using the heavier Background.tsx component.
 */
function AnimatedBackground() {
  return (
    <Box
      position="fixed"
      inset={0}
      zIndex={0}
      overflow="hidden"
      pointerEvents="none"
    >
      {/* Base gradient */}
      <Box
        position="absolute"
        inset={0}
        bg="linear-gradient(135deg, #0a0015 0%, #1a0b2e 40%, #0d001a 100%)"
      />

      {/* Floating orb 1 — purple */}
      <motion.div
        style={{
          position: "absolute",
          top: "10%",
          left: "15%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(121,40,202,0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: [0, 50, -30, 0],
          y: [0, -40, 20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating orb 2 — pink */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "10%",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,0,128,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: [0, -40, 30, 0],
          y: [0, 30, -50, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating orb 3 — cyan */}
      <motion.div
        style={{
          position: "absolute",
          top: "50%",
          left: "60%",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,191,255,0.08) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -30, 40, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Noise overlay for texture */}
      <Box
        position="absolute"
        inset={0}
        opacity={0.03}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
    </Box>
  );
}

/**
 * Navigation bar — sticky top, glassmorphism style
 */
function Navbar() {
  const { connected } = useWallet();
  const router = useRouter();

  const navLinks = [
    { label: "Home", href: "/" },
    ...(connected
      ? [
          { label: "Dashboard", href: "/dashboard" },
          { label: "Register", href: "/register" },
        ]
      : []),
  ];

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={100}
      py={3}
      px={4}
      bg="rgba(10, 0, 21, 0.7)"
      backdropFilter="blur(16px)"
      borderBottom="1px solid rgba(255,255,255,0.06)"
    >
      <Container maxW="container.xl">
        <HStack justifyContent="space-between" alignItems="center">
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none" }}>
            <HStack gap={2} cursor="pointer">
              <Text fontSize="xl" fontFamily="'Bangers', system-ui" letterSpacing="1px">
                <span className="gradient-text">🍃 PuffTip</span>
              </Text>
            </HStack>
          </Link>

          {/* Nav Links */}
          <HStack gap={1} display={{ base: "none", md: "flex" }}>
            {navLinks.map((link) => (
              <Button
                key={link.href}
                variant="ghost"
                size="sm"
                color={router.pathname === link.href ? "white" : "whiteAlpha.700"}
                fontWeight={router.pathname === link.href ? "700" : "400"}
                _hover={{ color: "white", bg: "whiteAlpha.100" }}
                onClick={() => router.push(link.href)}
                borderRadius="lg"
                fontSize="sm"
              >
                {link.label}
              </Button>
            ))}
          </HStack>

          {/* Wallet Button */}
          <WalletMultiButton />
        </HStack>
      </Container>
    </Box>
  );
}

/**
 * Footer — simple, branded
 */
function Footer() {
  return (
    <Box
      as="footer"
      py={6}
      px={4}
      borderTop="1px solid rgba(255,255,255,0.06)"
      bg="rgba(10, 0, 21, 0.5)"
    >
      <Container maxW="container.xl">
        <HStack justifyContent="space-between" flexWrap="wrap" gap={4}>
          <Text fontSize="sm" color="whiteAlpha.500">
            © 2026 PuffTip — Built on Solana
          </Text>
          <HStack gap={4}>
            <Text fontSize="xs" color="whiteAlpha.400">Devnet</Text>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
}

/**
 * Main Layout — wraps every page
 */
export default function Layout({ children }: LayoutProps) {
  const router = useRouter();

  return (
    <Box position="relative" minH="100vh" display="flex" flexDirection="column">
      <AnimatedBackground />

      <Box position="relative" zIndex={1} display="flex" flexDirection="column" flex={1}>
        <Navbar />

        <Box as="main" flex={1}>
          <AnimatePresence mode="wait">
            <motion.div
              key={router.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </Box>

        <Footer />
      </Box>
    </Box>
  );
}
