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
import { FiMenu, FiX, FiHome, FiSearch, FiMonitor, FiLayout, FiDollarSign } from "react-icons/fi";

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
  { label: "dashboard", href: "/dashboard", icon: <FiLayout size={16} /> },
  { label: "obs setup", href: "/obs", icon: <FiMonitor size={16} /> },
  { label: "fees", href: "/pricing", icon: <FiDollarSign size={16} /> },
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
              <HStack gap={3} className="brand-logo">
                <Box className="brand-badge">P</Box>
                <Box>
                  <Text fontSize="lg" fontFamily="heading" fontWeight="700" color="brand.ink" lineHeight="1">
                    pufftip
                  </Text>
                  <Text fontSize="xs" fontFamily="body" color="brand.inkSoft" lineHeight="1">
                    a tip / a smoke
                  </Text>
                </Box>
              </HStack>
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
                    fontWeight={isActive ? "700" : "400"}
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
              <Box className="demo-pill hide-mobile">
                <Text className="demo-pill-amount">5.00 SOL</Text>
                <Text className="demo-pill-label">demo</Text>
              </Box>
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
            <HStack gap={2}>
              <Box className="brand-badge">P</Box>
              <Box>
                <Text fontFamily="heading" fontWeight="700" color="brand.ink" fontSize="lg" lineHeight="1">
                  pufftip
                </Text>
                <Text fontFamily="body" fontSize="xs" color="brand.inkSoft" lineHeight="1">
                  a tip / a smoke
                </Text>
              </Box>
            </HStack>
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
          <Box px={5} mt={3}>
            <Box className="demo-pill" style={{ justifyContent: "center" }}>
              <Text className="demo-pill-amount">5.00 SOL</Text>
              <Text className="demo-pill-label">demo</Text>
            </Box>
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
        <Grid templateColumns={{ base: "1fr", md: "1.5fr 1fr 1fr" }} gap={{ base: 6, md: 12 }}>
          <GridItem>
            <HStack gap={2} mb={3}>
              <Box className="brand-badge">P</Box>
              <Text fontFamily="heading" fontSize="xl" fontWeight="700" color="brand.ink">pufftip</Text>
            </HStack>
            <Text color="brand.inkSoft" fontSize="sm" fontFamily="body" maxW="300px" lineHeight="1.7">
              crypto tips for streamers — every tip arrives with a smoke on the house. built by night-owls, for night-owls.
            </Text>
          </GridItem>

          <GridItem>
            <Text fontFamily="heading" fontSize="xs" fontWeight="700" color="brand.ink" mb={3} textTransform="uppercase" letterSpacing="wider">explore</Text>
            <VStack alignItems="flex-start" gap={2}>
              {[
                { label: "streamers", href: "/explore" },
                { label: "dashboard preview", href: "/dashboard" },
                { label: "obs setup", href: "/obs" },
                { label: "fees", href: "/pricing" },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="footer-link">{link.label}</Link>
              ))}
            </VStack>
          </GridItem>

          <GridItem>
            <Text fontFamily="heading" fontSize="xs" fontWeight="700" color="brand.ink" mb={3} textTransform="uppercase" letterSpacing="wider">notes</Text>
            <Text color="brand.inkSoft" fontSize="sm" fontFamily="body" lineHeight="1.7">
              built on solana. no signups required to browse. demo mode means no real money moves until you connect a real wallet.
            </Text>
          </GridItem>
        </Grid>

        <Box mt={10} pt={6} borderTop="1px solid" borderColor="var(--theme-card-border)">
          <HStack justifyContent="space-between" flexWrap="wrap" gap={4}>
            <Text fontSize="xs" color="brand.inkSoft" fontFamily="body">
              © 2026 pufftip — drawn by hand, mostly. *
            </Text>
            <HStack gap={4}>
              <Link href="/faq" className="footer-link" style={{ fontSize: "12px" }}>FAQ</Link>
              <Link href="/about" className="footer-link" style={{ fontSize: "12px" }}>About</Link>
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

      <Box className="corner-hint hide-mobile">
        <Text>psst — hit Cmd+K to jump anywhere.</Text>
        <HStack gap={2}>
          <button className="corner-hint-btn">another →</button>
          <button className="corner-hint-btn">explore</button>
        </HStack>
      </Box>

      <button className="mascot-btn" aria-label="puffy the mascot">
        <span>💨</span>
        <span>👻</span>
      </button>
    </Box>
  );
}
