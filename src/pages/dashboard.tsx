import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Button, Container, Heading, HStack, Spinner, Stack, Text, VStack } from "@chakra-ui/react";
import { getStoredCreator, type StoredCreator } from "@/lib/creatorStorage";

interface PlatformStats {
  totalTipsCount: number;
  totalVolumeSol: string;
  platformFeeCollected: string;
  uniqueDonors: number;
  uniqueCreators: number;
  premiumUsersCount: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [creator, setCreator] = useState<StoredCreator | null>(null);
  const [stats, setStats] = useState<PlatformStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCreator(getStoredCreator());
  }, []);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const response = await fetch("/api/stats");
        if (response.ok) {
          setStats(await response.json());
        }
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

  if (!creator && !loading) {
    return (
      <Container maxW="container.md" py={20}>
        <VStack gap={4} align="start">
          <Heading size="xl">Dashboard</Heading>
          <Text color="gray.600">Register as a creator first to populate your dashboard.</Text>
          <Button colorScheme="purple" onClick={() => router.push("/register")}>Register</Button>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.lg" py={16}>
      <VStack gap={8} align="stretch">
        <Box>
          <Text fontSize="sm" color="gray.500" mb={2}>
            Creator workspace
          </Text>
          <Heading size="2xl">{creator?.displayName || "Your dashboard"}</Heading>
          <Text color="gray.600" mt={2}>
            {creator?.bio || "Manage your PuffTip profile, track platform activity, and share your public page."}
          </Text>
        </Box>

        <HStack gap={3} wrap="wrap">
          <Button colorScheme="purple" onClick={() => router.push(`/u/${creator?.username || "demo"}`)}>
            Open public page
          </Button>
          <Button variant="outline" onClick={() => router.push("/")}>
            Back to home
          </Button>
        </HStack>

        <Box borderWidth="1px" borderRadius="xl" p={6}>
          <Heading size="md" mb={4}>Quick stats</Heading>
          {loading ? (
            <Spinner />
          ) : (
            <Stack direction={{ base: "column", md: "row" }} gap={4}>
              <StatCard label="Tips" value={stats?.totalTipsCount ?? 0} />
              <StatCard label="Volume" value={`${Number(stats?.totalVolumeSol ?? 0).toFixed(2)} SOL`} />
              <StatCard label="Creators" value={stats?.uniqueCreators ?? 0} />
            </Stack>
          )}
        </Box>
      </VStack>
    </Container>
  );
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <Box flex={1} borderWidth="1px" borderRadius="lg" p={4} bg="gray.50">
      <Text fontSize="sm" color="gray.500">
        {label}
      </Text>
      <Heading size="md" mt={1}>
        {value}
      </Heading>
    </Box>
  );
}
