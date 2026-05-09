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
            ? "linear-gradient(135deg, #22c55e, #16a34a)"
            : isActive
            ? "linear-gradient(135deg, #7928CA, #FF0080)"
            : "whiteAlpha.100"
        }
        color={isComplete || isActive ? "white" : "whiteAlpha.400"}
        border={isActive ? "none" : "1px solid rgba(255,255,255,0.1)"}
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

      <Container maxW="container.sm" py={{ base: 12, md: 20 }}>
        <VStack gap={8} alignItems="center">
          {/* Step Indicators */}
          <HStack gap={4}>
            <StepIndicator step={1} current={currentStep} />
            <Box w={8} h="1px" bg="whiteAlpha.200" />
            <StepIndicator step={2} current={currentStep} />
            <Box w={8} h="1px" bg="whiteAlpha.200" />
            <StepIndicator step={3} current={currentStep} />
          </HStack>

          {/* Step Labels */}
          <HStack gap={6} fontSize="xs" color="whiteAlpha.400">
            <Text color={currentStep >= 1 ? "whiteAlpha.700" : undefined}>Connect</Text>
            <Text color={currentStep >= 2 ? "whiteAlpha.700" : undefined}>Profile</Text>
            <Text color={currentStep >= 3 ? "whiteAlpha.700" : undefined}>Done</Text>
          </HStack>

          {/* Main Card */}
          <MotionBox
            className="glass-strong"
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
                  bg="whiteAlpha.50"
                  display="inline-flex"
                >
                  <FiUser size={32} color="#7928CA" />
                </Box>
                <Heading as="h1" size="lg" color="white" fontFamily="'Fredoka', sans-serif">
                  Connect Your Wallet
                </Heading>
                <Text color="whiteAlpha.500" fontSize="sm" lineHeight="1.7">
                  Connect your Solana wallet using the button in the header to get started.
                  We use wallet signatures for authentication — no passwords needed.
                </Text>
                <Button
                  variant="outline"
                  color="whiteAlpha.700"
                  borderColor="whiteAlpha.200"
                  _hover={{ bg: "whiteAlpha.100" }}
                  onClick={() => router.push("/")}
                  borderRadius="xl"
                >
                  ← Back to Home
                </Button>
              </VStack>
            )}

            {/* ── Step 2: Registration Form ─── */}
            {connected && !success && (
              <VStack gap={6} alignItems="stretch">
                <VStack gap={1} textAlign="center">
                  <Heading as="h1" size="lg" color="white" fontFamily="'Fredoka', sans-serif">
                    Create Your Profile
                  </Heading>
                  <Text color="whiteAlpha.500" fontSize="sm">
                    Set up your creator page and start receiving tips
                  </Text>
                </VStack>

                {error && (
                  <Box
                    p={3}
                    borderRadius="lg"
                    bg="rgba(239, 68, 68, 0.1)"
                    border="1px solid rgba(239, 68, 68, 0.2)"
                  >
                    <Text fontSize="sm" color="red.300">{error}</Text>
                  </Box>
                )}

                {/* Username */}
                <Box>
                  <Text mb={2} fontWeight="600" fontSize="sm" color="whiteAlpha.800">
                    Username <span style={{ color: "#FF0080" }}>*</span>
                  </Text>
                  <Input
                    placeholder="yourname"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    disabled={loading}
                    size="lg"
                  />
                  <Text fontSize="xs" color="whiteAlpha.400" mt={1}>
                    Your tip page: pufftip.com/u/{formData.username || "yourname"}
                  </Text>
                </Box>

                {/* Display Name */}
                <Box>
                  <Text mb={2} fontWeight="600" fontSize="sm" color="whiteAlpha.800">
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
                  <Text mb={2} fontWeight="600" fontSize="sm" color="whiteAlpha.800">
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
                  bg="linear-gradient(135deg, #7928CA 0%, #FF0080 100%)"
                  color="white"
                  _hover={{ opacity: 0.9, transform: "translateY(-1px)" }}
                  transition="all 0.3s"
                  borderRadius="xl"
                  onClick={handleRegister}
                  loading={loading}
                  boxShadow="0 4px 20px rgba(121, 40, 202, 0.3)"
                >
                  🍃 Create Profile
                </Button>

                {/* Wallet Info */}
                <Text fontSize="xs" color="whiteAlpha.400" textAlign="center">
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
                    bg="rgba(34, 197, 94, 0.1)"
                    display="inline-flex"
                  >
                    <FiEdit3 size={32} color="#22c55e" />
                  </Box>
                  <Heading size="md" color="white" fontFamily="'Fredoka', sans-serif">
                    You&apos;re In! 🎉
                  </Heading>
                  <Text color="whiteAlpha.500" fontSize="sm">
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
