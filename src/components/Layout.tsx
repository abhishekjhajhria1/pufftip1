/**
 * Layout Component — Premium Edition
 *
 * - Glassmorphic sticky header with mobile hamburger drawer
 * - Full nav on desktop, slide-in drawer on mobile
 * - Multi-column footer with Solana branding
 * - Smooth page transitions via framer-motion
 */

import { Box, Container, HStack, Text, Button, Grid, GridItem, VStack } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";
import { FiMenu, FiX, FiHome, FiSearch, FiMonitor, FiLayout, FiUsers, FiPlay } from "react-icons/fi";

const WalletMultiButton = dynamic(
  () => import("@solana/wallet-adapter-react-ui").then((mod) => mod.WalletMultiButton),
  { ssr: false }
);

interface LayoutProps {
  children: React.ReactNode;
}

const NAV_LINKS = [
  { label: "home", href: "/", icon: <FiHome size={16} /> },
  { label: "explore", href: "/explore", icon: <FiSearch size={16} /> },
  { label: "for creators", href: "/for-creators", icon: <FiUsers size={16} /> },
  { label: "demos", href: "/demos", icon: <FiPlay size={16} /> },
  { label: "dashboard", href: "/dashboard", icon: <FiLayout size={16} /> },
];

function Navbar() {
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Box
        as="header"
        position="sticky"
        top={0}
        zIndex={100}
        py={3}
        px={4}
        bg="var(--theme-nav-bg)"
        backdropFilter="blur(16px)"
        borderBottom="var(--theme-nav-border)"
        transition="background 0.4s ease"
      >
        <Container maxW="container.xl">
          <HStack justifyContent="space-between" alignItems="center">
            {/* Logo */}
            <Link href="/" style={{ textDecoration: "none" }}>
              <Text fontSize="xl" fontFamily="heading" fontWeight="700" color="brand.ink" position="relative">
                pufftip<Box as="span" className="solana-gradient">.</Box>
              </Text>
            </Link>

            {/* Desktop Nav */}
            <HStack gap={1} className="hide-mobile">
              {NAV_LINKS.map((link) => {
                const isActive = router.pathname === link.href;
                return (
                  <Button
                    key={link.href}
                    variant="ghost"
                    size="sm"
                    color={isActive ? "brand.ink" : "brand.inkSoft"}
                    fontFamily="heading"
                    fontSize="sm"
                    fontWeight={isActive ? "700" : "500"}
                    _hover={{ color: "brand.ink", bg: "transparent" }}
                    onClick={() => router.push(link.href)}
                    borderRadius="md"
                    px={3}
                    py={1}
                    transition="all 0.2s"
                    minH="auto"
                    h="auto"
                    position="relative"
                  >
                    {link.label}
                    {isActive && (
                      <Box
                        position="absolute"
                        bottom="-2px"
                        left="20%"
                        right="20%"
                        h="2px"
                        className="solana-accent"
                        borderRadius="full"
                      />
                    )}
                  </Button>
                );
              })}
            </HStack>

            {/* Right side */}
            <HStack gap={3}>
              <Button
                title={theme === "notebook" ? "Switch to Studio" : "Switch to Notebook"}
                onClick={toggleTheme}
                variant="ghost"
                size="sm"
                color="brand.inkSoft"
                fontFamily="heading"
                fontSize="xs"
                _hover={{ color: "brand.ink" }}
                className="hide-mobile"
              >
                {theme === "notebook" ? "✨ studio" : "✎ notebook"}
              </Button>
              <WalletMultiButton />

              {/* Mobile hamburger */}
              <Button
                variant="ghost"
                size="sm"
                color="brand.ink"
                onClick={() => setDrawerOpen(true)}
                className="hide-desktop"
                p={1}
                minW="auto"
              >
                <FiMenu size={22} />
              </Button>
            </HStack>
          </HStack>
        </Container>
      </Box>

      {/* Mobile Drawer */}
      <Box className={`mobile-drawer-overlay ${drawerOpen ? "open" : ""}`} onClick={() => setDrawerOpen(false)} />
      <Box className={`mobile-drawer ${drawerOpen ? "open" : ""}`}>
        <VStack align="stretch" py={4} gap={0}>
          {/* Close button */}
          <HStack justifyContent="space-between" px={5} mb={4}>
            <Text fontFamily="heading" fontWeight="700" color="brand.ink" fontSize="lg">
              pufftip<Box as="span" className="solana-gradient">.</Box>
            </Text>
            <Button variant="ghost" size="sm" onClick={() => setDrawerOpen(false)} color="brand.ink" p={1} minW="auto">
              <FiX size={20} />
            </Button>
          </HStack>

          {/* Nav Links */}
          {NAV_LINKS.map((link) => {
            const isActive = router.pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`mobile-drawer-link ${isActive ? "active" : ""}`}
                onClick={() => setDrawerOpen(false)}
              >
                {link.icon}
                {link.label}
              </Link>
            );
          })}

          {/* Theme toggle */}
          <Box px={5} mt={4}>
            <Button
              onClick={() => { toggleTheme(); setDrawerOpen(false); }}
              variant="outline"
              size="sm"
              w="full"
              color="brand.inkSoft"
              borderColor="brand.inkSoft"
              fontFamily="heading"
              _hover={{ bg: "brand.paperDeep" }}
            >
              {theme === "notebook" ? "✨ switch to studio" : "✎ switch to notebook"}
            </Button>
          </Box>
        </VStack>
      </Box>
    </>
  );
}

function Footer() {
  return (
    <Box as="footer" className="site-footer" py={12} px={4} mt={10}>
      <Container maxW="container.xl">
        <Grid templateColumns={{ base: "1fr 1fr", md: "2fr 1fr 1fr 1fr" }} gap={{ base: 6, md: 12 }}>
          <GridItem colSpan={{ base: 2, md: 1 }}>
            <Text fontFamily="heading" fontSize="xl" fontWeight="700" color="brand.ink" mb={3}>
              pufftip<Box as="span" className="solana-gradient">.</Box>
            </Text>
            <Text color="brand.inkSoft" fontSize="sm" fontFamily="body" maxW="300px" lineHeight="1.7">
              the next-gen Solana tipping platform for creators. instant payments, real-time OBS alerts, zero middlemen.
            </Text>
            <Box mt={3} className="solana-badge" display="inline-flex">◎ Powered by Solana</Box>
          </GridItem>

          <GridItem>
            <Text fontFamily="heading" fontSize="xs" fontWeight="700" color="brand.ink" mb={3} textTransform="uppercase" letterSpacing="wider">Product</Text>
            <VStack alignItems="flex-start" gap={2}>
              {[
                { label: "for streamers", href: "/for-streamers" },
                { label: "for creators", href: "/for-creators" },
                { label: "features", href: "/features" },
                { label: "demos", href: "/demos" },
                { label: "pricing", href: "/pricing" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="footer-link">{link.label}</Link>
              ))}
            </VStack>
          </GridItem>

          <GridItem>
            <Text fontFamily="heading" fontSize="xs" fontWeight="700" color="brand.ink" mb={3} textTransform="uppercase" letterSpacing="wider">Resources</Text>
            <VStack alignItems="flex-start" gap={2}>
              {[
                { label: "explore creators", href: "/explore" },
                { label: "obs setup guide", href: "/obs" },
                { label: "dashboard", href: "/dashboard" },
                { label: "faq & help", href: "/faq" },
                { label: "about pufftip", href: "/about" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="footer-link">{link.label}</Link>
              ))}
            </VStack>
          </GridItem>

          <GridItem>
            <Text fontFamily="heading" fontSize="xs" fontWeight="700" color="brand.ink" mb={3} textTransform="uppercase" letterSpacing="wider">Showcase</Text>
            <VStack alignItems="flex-start" gap={2}>
              {[
                { label: "🎸 smokey jazz", href: "/showcase/smokeyjazz" },
                { label: "🎨 pixel artist", href: "/showcase/pixelartist" },
                { label: "💻 code streamer", href: "/showcase/codingstreamer" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="footer-link">{link.label}</Link>
              ))}
              <Box px={3} py={1} border="1px solid" borderColor="brand.inkSoft" borderRadius="md" mt={2}>
                <Text fontSize="xs" color="brand.ink" fontFamily="body" fontWeight="700">Devnet</Text>
              </Box>
            </VStack>
          </GridItem>
        </Grid>

        <Box mt={10} pt={6} borderTop="1px solid" borderColor="var(--theme-card-border)">
          <HStack justifyContent="space-between" flexWrap="wrap" gap={4}>
            <Text fontSize="xs" color="brand.inkSoft" fontFamily="body">
              © 2026 PuffTip. built with <Box as="span" className="solana-gradient">Solana</Box>.
            </Text>
            <HStack gap={4}>
              <Link href="/faq" className="footer-link" style={{ fontSize: "12px" }}>FAQ</Link>
              <Link href="/about" className="footer-link" style={{ fontSize: "12px" }}>About</Link>
              <Text fontSize="xs" color="brand.inkSoft" fontFamily="body">devnet — no real money.</Text>
            </HStack>
          </HStack>
        </Box>
      </Container>
    </Box>
  );
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();

  return (
    <Box position="relative" minH="100vh" display="flex" flexDirection="column">
      <Box position="relative" zIndex={1} display="flex" flexDirection="column" flex={1}>
        <Navbar />
        <Box as="main" flex={1}>
          <AnimatePresence mode="wait">
            <motion.div
              key={router.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
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
