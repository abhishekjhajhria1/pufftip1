import { VStack, Heading, Text, Button, Input, Container, Textarea } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Register() {
  const { connected, publicKey } = useWallet();
  const router = useRouter();
  
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    displayName: "",
    bio: "",
  });

  const handleRegister = async () => {
    if (!connected || !publicKey) return;

    if (!formData.username.trim()) {
      return;
    }

    if (formData.username.length < 3) {
      return;
    }

    try {
      setLoading(true);

      // For now, we'll store locally since we need blockchain integration for registration
      // In Phase 5, this will call the smart contract to initialize_creator
      const creatorData = {
        username: formData.username.toLowerCase(),
        displayName: formData.displayName || formData.username,
        bio: formData.bio,
        walletAddress: publicKey.toString(),
      };

      // Store in browser for demo
      localStorage.setItem("creator", JSON.stringify(creatorData));


      // Redirect to dashboard
      router.push("/dashboard");
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!connected) {
    return (
      <Container maxW="container.sm" py={20}>
        <VStack gap={8} alignItems="center">
          <Text color="red.500">Please connect your wallet first</Text>
          <Button onClick={() => router.push("/")} colorScheme="blue">
            Go Home
          </Button>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.sm" py={20}>
      <VStack gap={6} alignItems="stretch">
        <Heading as="h1" size="2xl" textAlign="center">
          Register as Creator
        </Heading>

        <div>
          <Text mb={2} fontWeight="bold">Username *</Text>
          <Input
            placeholder="yourname"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            disabled={loading}
          />
          <Text fontSize="xs" color="gray.500" mt={1}>
            This will be your PuffTip profile URL
          </Text>
        </div>

        <div>
          <Text mb={2} fontWeight="bold">Display Name</Text>
          <Input
            placeholder="Your Display Name"
            value={formData.displayName}
            onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
            disabled={loading}
          />
        </div>

        <div>
          <Text mb={2} fontWeight="bold">Bio</Text>
          <Textarea
            placeholder="Tell supporters about yourself..."
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            rows={3}
            disabled={loading}
          />
        </div>

        <Button
          colorScheme="purple"
          size="lg"
          onClick={handleRegister}
          loading={loading}
        >
          Register
        </Button>

        <Text fontSize="sm" color="gray.500" textAlign="center">
          Wallet: {publicKey?.toString().slice(0, 8)}...{publicKey?.toString().slice(-4)}
        </Text>
      </VStack>
    </Container>
  );
}
