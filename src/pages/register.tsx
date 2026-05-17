/**
 * Register Page — Creator Registration
 *
 * Flow:
 * 1. User must connect wallet first (enforced)
 * 2. Fill in username (required), display name, bio
 * 3. Saves to localStorage (TODO: wire to DB API in Phase 5)
 * 4. Redirects to dashboard on success
 *
 * Uses glassmorphism card on dark background with step indicators.
 */

import {
  Box,
  VStack,
  Heading,
  Text,
  Button,
  Container,
  Input,
  Textarea,
  HStack,
} from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { motion } from "framer-motion";
import Head from "next/head";
import { FiCheck, FiUser, FiEdit3 } from "react-icons/fi";
import { setStoredCreator } from "@/lib/creatorStorage";

const MotionBox = motion(Box);

/** Step indicator component */
function StepIndicator({ step, current }: { step: number; current: number }) {
  const isComplete = current > step;
  const isActive = current === step;

  return (
    <HStack gap={2}>
      <Box
        w={8}
        h={8}
        borderRadius="full"
        display="flex"
        alignItems="center"
        justifyContent="center"
        fontSize="sm"
        fontWeight="700"
        bg={
          isComplete
            ? "brand.markerGreen"
            : isActive
            ? "brand.markerYellow"
            : "transparent"
        }
        color={isComplete || isActive ? "brand.ink" : "brand.inkSoft"}
        border={isActive || isComplete ? "2px solid var(--theme-text)" : "2px dashed var(--theme-text-soft)"}
        transition="all 0.3s"
      >
        {isComplete ? <FiCheck size={14} /> : step}
      </Box>
    </HStack>
  );
}

export default function Register() {
  const { connected, publicKey } = useWallet();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    displayName: "",
    bio: "",
  });

  // Determine current step
  const currentStep = !connected ? 1 : success ? 3 : 2;

  const handleRegister = async () => {
    if (!connected || !publicKey) return;
    setError(null);

    const username = formData.username.trim().toLowerCase();

    if (!username) {
      setError("Username is required");
      return;
    }

    if (username.length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }

    if (!/^[a-z0-9_-]+$/.test(username)) {
      setError("Username can only contain letters, numbers, hyphens, and underscores");
      return;
    }

    try {
      setLoading(true);

      // Store locally (TODO: Phase 5 — call smart contract initialize_creator)
      const creatorData = {
        username,
        displayName: formData.displayName || username,
        bio: formData.bio,
        walletAddress: publicKey.toString(),
      };

      setStoredCreator(creatorData);
      setSuccess(true);

      // Redirect after brief success animation
      setTimeout(() => router.push("/dashboard"), 1500);
    } catch (err) {
      console.error("Registration failed:", err);
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Register — PuffTip</title>
        <meta name="description" content="Create your PuffTip creator profile and start receiving tips in SOL." />
      </Head>

      <Container maxW="container.sm" py="var(--section-py)">
        <VStack gap={8} alignItems="center">
          {/* Step Indicators */}
          <HStack gap={4}>
            <StepIndicator step={1} current={currentStep} />
            <Box w={8} h="2px" bg="var(--theme-card-border)" borderRadius="full" />
            <StepIndicator step={2} current={currentStep} />
            <Box w={8} h="2px" bg="var(--theme-card-border)" borderRadius="full" />
            <StepIndicator step={3} current={currentStep} />
          </HStack>

          {/* Step Labels */}
          <HStack gap={6} fontSize="xs" color="brand.inkSoft" fontFamily="body" fontWeight="bold">
            <Text color={currentStep >= 1 ? "brand.ink" : undefined}>Connect</Text>
            <Text color={currentStep >= 2 ? "brand.ink" : undefined}>Profile</Text>
            <Text color={currentStep >= 3 ? "brand.ink" : undefined}>Done</Text>
          </HStack>

          {/* Main Card */}
          <MotionBox
            className="paper-card"
            p={{ base: 6, md: 8 }}
            w="full"
            maxW="460px"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* ── Step 1: Not Connected ─── */}
            {!connected && (
              <VStack gap={6} textAlign="center">
                <Box
                  p={4}
                  borderRadius="full"
                  bg="brand.markerPink"
                  border="2px solid"
                  borderColor="brand.ink"
                  display="inline-flex"
                  className="rotate-doodle-1"
                >
                  <FiUser size={32} color="var(--theme-text)" />
                </Box>
                <Heading as="h1" size="xl" color="brand.ink" fontFamily="heading">
                  connect your wallet
                </Heading>
                <Text color="brand.inkSoft" fontSize="md" lineHeight="1.7" fontFamily="body">
                  Connect your Solana wallet using the button in the header to get started.
                  Authentication is on-chain — no passwords, no emails. Just your wallet.
                </Text>
                <Button
                  variant="outline"
                  color="brand.ink"
                  borderColor="brand.ink"
                  _hover={{ bg: "brand.paperDeep" }}
                  onClick={() => router.push("/")}
                  borderRadius="md"
                  fontFamily="body"
                >
                  ← Back to Home
                </Button>
              </VStack>
            )}

            {/* ── Step 2: Registration Form ─── */}
            {connected && !success && (
              <VStack gap={6} alignItems="stretch">
                <VStack gap={1} textAlign="center">
                  <Heading as="h1" size="xl" color="brand.ink" fontFamily="heading">
                    create your profile
                  </Heading>
                  <Text color="brand.inkSoft" fontSize="md" fontFamily="body">
                    Set up your creator page and start receiving SOL tips on stream
                  </Text>
                </VStack>

                {error && (
                  <Box
                    p={3}
                    borderRadius="md"
                    bg="brand.markerRed"
                    border="2px solid"
                    borderColor="brand.ink"
                  >
                    <Text fontSize="sm" color="brand.paper" fontWeight="bold">{error}</Text>
                  </Box>
                )}

                {/* Username */}
                <Box>
                  <Text mb={2} fontWeight="600" fontSize="sm" color="brand.ink" fontFamily="body">
                    Username <span style={{ color: "var(--theme-marker-red)" }}>*</span>
                  </Text>
                  <Input
                    placeholder="yourname"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    disabled={loading}
                    size="lg"
                  />
                  <Text fontSize="xs" color="brand.inkSoft" mt={1} fontFamily="body">
                    Your tip page: pufftip.com/u/{formData.username || "yourname"}
                  </Text>
                </Box>

                {/* Display Name */}
                <Box>
                  <Text mb={2} fontWeight="600" fontSize="sm" color="brand.ink" fontFamily="body">
                    Display Name
                  </Text>
                  <Input
                    placeholder="How supporters see you"
                    value={formData.displayName}
                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                    disabled={loading}
                    size="lg"
                  />
                </Box>

                {/* Bio */}
                <Box>
                  <Text mb={2} fontWeight="600" fontSize="sm" color="brand.ink" fontFamily="body">
                    Bio
                  </Text>
                  <Textarea
                    placeholder="Tell supporters about yourself..."
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={3}
                    disabled={loading}
                  />
                </Box>

                {/* Submit */}
                <Button
                  size="lg"
                  bg="brand.ink"
                  color="brand.paper"
                  _hover={{ opacity: 0.9, transform: "rotate(var(--theme-rot-1))" }}
                  transition="all 0.3s"
                  borderRadius="md"
                  onClick={handleRegister}
                  loading={loading}
                  className="shadow-sticker"
                  fontFamily="heading"
                  fontSize="xl"
                >
                  🍃 create profile
                </Button>

                {/* Wallet Info */}
                <Text fontSize="xs" color="brand.inkSoft" textAlign="center" fontFamily="body">
                  Wallet: {publicKey?.toString().slice(0, 8)}...{publicKey?.toString().slice(-4)}
                </Text>
              </VStack>
            )}

            {/* ── Step 3: Success ─── */}
            {success && (
              <MotionBox
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <VStack gap={4} textAlign="center" py={4}>
                  <Box
                    p={4}
                    borderRadius="full"
                    bg="brand.markerGreen"
                    border="2px solid"
                    borderColor="brand.ink"
                    display="inline-flex"
                    className="rotate-doodle-2"
                  >
                    <FiEdit3 size={32} color="var(--theme-text)" />
                  </Box>
                  <Heading size="xl" color="brand.ink" fontFamily="heading">
                    you&apos;re in! 🎉
                  </Heading>
                  <Text color="brand.inkSoft" fontSize="md" fontFamily="body">
                    Redirecting to your dashboard...
                  </Text>
                </VStack>
              </MotionBox>
            )}
          </MotionBox>
        </VStack>
      </Container>
    </>
  );
}
