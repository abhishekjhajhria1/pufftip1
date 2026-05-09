import { Box, VStack, Heading, Text, Button, Container, Spinner, HStack, Badge, useDisclosure } from "@chakra-ui/react";
import { FiCheck, FiAlertCircle, FiBell } from "react-icons/fi";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { TipForm } from "@/components/TipForm";
import { useWebSocketTips } from "@/hooks/useWebSocketTips";
import { NotificationManager } from "@/components/NotificationManager";
import { NotificationSettings } from "@/components/NotificationSettings";

interface Creator {
  user: {
    id: string;
    username: string;
    displayName?: string;
    bio?: string;
    profileImage?: string;
    isPremium: boolean;
  };
  stats: {
    totalTipsReceived: number;
    tipCount: number;
  };
}

interface Tip {
  id: string;
  donorName?: string;
  amount: string;
  message?: string;
  createdAt: string;
}

export default function UserPublicPage() {
  const router = useRouter();
  const { username } = router.query;
  const { open: isSettingsOpen, onOpen: onSettingsOpen, onClose: onSettingsClose } = useDisclosure();

  const [creator, setCreator] = useState<Creator | null>(null);
  const [tips, setTips] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Real-time WebSocket integration
  const { isConnected } = useWebSocketTips(
    typeof username === "string" ? username : ""
  );

  useEffect(() => {
    if (!username || typeof username !== "string") return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const [creatorRes, tipsRes] = await Promise.all([
          fetch(`/api/creators/${username}`),
          fetch(`/api/tips/${username}?limit=20`),
        ]);

        if (creatorRes.ok) {
          const creatorData = await creatorRes.json();
          setCreator(creatorData);
        }

        if (tipsRes.ok) {
          const tipsData = await tipsRes.json();
          setTips(tipsData.tips || []);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [username]);

  /**
   * Handle successful tip submission
   * Refresh tip history and show success message
   */
  const handleTipSuccess = async () => {
    try {
      setSuccessMessage("Tip sent successfully! 🎉");
      
      // Refresh tips list
      const tipsRes = await fetch(`/api/tips/${username}?limit=20`);
      if (tipsRes.ok) {
        const tipsData = await tipsRes.json();
        setTips(tipsData.tips || []);
      }

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      console.error("Failed to refresh tips:", error);
    }
  };

  /**
   * Handle tip submission error
   */
  const handleTipError = (error: string) => {
    setErrorMessage(error);
    // Clear error message after 5 seconds
    setTimeout(() => setErrorMessage(null), 5000);
  };

  if (!username) {
    return <Text>Loading...</Text>;
  }

  if (loading) {
    return (
      <Container centerContent py={20}>
        <Spinner size="lg" />
      </Container>
    );
  }

  if (!creator) {
    return (
      <Container centerContent py={20}>
        <VStack gap={4}>
          <Heading>Creator Not Found</Heading>
          <Button onClick={() => router.push("/")} colorScheme="blue">
            Go Home
          </Button>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.lg" py={8}>
      {/* Notification System */}
      <NotificationManager creatorId={typeof username === "string" ? username : ""} />

      <VStack gap={8}>
        <Box textAlign="center" py={8} borderBottomWidth="1px" w="full">
          <HStack justifyContent="center" mb={2} gap={2}>
            <Heading as="h1" size="2xl">
              {creator.user.displayName || creator.user.username}
            </Heading>
            {creator.user.isPremium && <Badge colorScheme="yellow">Premium</Badge>}
          </HStack>
          {creator.user.bio && (
            <Text color="gray.600" mb={2}>
              {creator.user.bio}
            </Text>
          )}
          <Text fontSize="sm" color="gray.500" mb={4}>
            {creator.stats.tipCount} tips • {Number(creator.stats.totalTipsReceived).toFixed(2)} SOL received
          </Text>
          {/* Settings Button */}
          <Button
            colorScheme="purple"
            variant="outline"
            size="sm"
            onClick={onSettingsOpen}
          >
            <FiBell style={{ marginRight: "8px" }} />
            Notification Settings
          </Button>
        </Box>

        {/* Tip Form Section */}
        <Box maxW="500px" w="full" mx="auto">
          <VStack gap={4} alignItems="stretch">
            <Heading as="h2" size="md">
              Send a Tip
            </Heading>

            {/* Success Message */}
            {successMessage && (
              <Box 
                p={3} 
                borderRadius="md" 
                bg="green.50" 
                borderLeft="4px solid #22863a"
                display="flex" 
                alignItems="flex-start"
                gap={2}
              >
                <FiCheck style={{ marginTop: "2px", color: "#22863a", flexShrink: 0 }} />
                <Text fontSize="sm">{successMessage}</Text>
              </Box>
            )}

            {/* Error Message */}
            {errorMessage && (
              <Box 
                p={3} 
                borderRadius="md" 
                bg="red.50" 
                borderLeft="4px solid #cb2431"
                display="flex" 
                alignItems="flex-start"
                gap={2}
              >
                <FiAlertCircle style={{ marginTop: "2px", color: "#cb2431", flexShrink: 0 }} />
                <Text fontSize="sm">{errorMessage}</Text>
              </Box>
            )}

            {/* WebSocket Connection Status */}
            <Box fontSize="sm" color={isConnected ? "green.500" : "gray.500"}>
              {isConnected ? "✓ Live notifications enabled" : "⌛ Connecting..."}
            </Box>

            {/* Tip Form Component */}
            <TipForm
              username={typeof username === "string" ? username : ""}
              onSuccess={handleTipSuccess}
              onError={handleTipError}
            />
          </VStack>
        </Box>

        <Box w="full" p={6} borderTopWidth="1px" mt={8}>
          <Heading as="h3" size="md" mb={4}>
            Recent Tips ({tips.length})
          </Heading>
          {tips.length > 0 ? (
            <VStack gap={4} alignItems="stretch">
              {tips.map((tip) => (
                <Box key={tip.id} p={4} borderWidth="1px" borderRadius="md">
                  <HStack justifyContent="space-between" mb={2}>
                    <Text fontWeight="bold">{tip.donorName || "Anonymous"}</Text>
                    <Text fontWeight="bold" color="purple.600">
                      {Number(tip.amount).toFixed(2)} SOL
                    </Text>
                  </HStack>
                  {tip.message && (
                    <Text color="gray.700" mb={2}>
                      &quot;{tip.message}&quot;
                    </Text>
                  )}
                  <Text fontSize="xs" color="gray.500">
                    {new Date(tip.createdAt).toLocaleString()}
                  </Text>
                </Box>
              ))}
            </VStack>
          ) : (
            <Text color="gray.600">No tips yet. Be the first to support this creator!</Text>
          )}
        </Box>
      </VStack>

      {/* Notification Settings Modal */}
      <NotificationSettings
        creatorId={typeof username === "string" ? username : ""}
        isOpen={isSettingsOpen}
        onClose={onSettingsClose}
      />
    </Container>
  );
}
