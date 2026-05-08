import { Box, VStack, Heading, Text, Button, Container, Grid, GridItem, Spinner } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Stats {
  totalTipsCount: number;
  totalVolumeSol: string;
  platformFeeCollected: string;
  uniqueDonors: number;
  uniqueCreators: number;
  premiumUsersCount: number;
}

export default function Home() {
  const { connected } = useWallet();
  const router = useRouter();
  
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/api/stats");
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const handleRegister = () => {
    if (!connected) {
      return;
    }
    router.push("/register");
  };

  const handleSupport = () => {
    router.push("/u/demo");
  };

  return (
    <Container maxW="container.lg" py={20}>
      <VStack gap={12} alignItems="center">
        <Heading as="h1" size="2xl" textAlign="center">
          Welcome to PuffTip
        </Heading>
        <Text fontSize="lg" color="gray.600" textAlign="center" maxW="600px">
          The easiest way for creators to receive tips in Solana along with messages from their supporters.
        </Text>
        
        <Box mb={8}>
          <WalletMultiButton />
        </Box>

        {connected ? (
          <VStack gap={4} maxW="400px" w="full">
            <Heading as="h2" size="md">
              Get Started
            </Heading>
            <Button w="full" colorScheme="purple" size="lg" onClick={handleRegister}>
              Register as Creator
            </Button>
            <Button w="full" colorScheme="blue" variant="outline" size="lg" onClick={handleSupport}>
              Become a Supporter
            </Button>
          </VStack>
        ) : (
          <Text color="gray.500">Connect your wallet to get started</Text>
        )}

        <Box w="full" mt={12} pt={8} borderTopWidth="1px">
          <Heading as="h2" size="lg" textAlign="center" mb={8}>
            Platform Stats
          </Heading>
          
          {loading ? (
            <VStack justifyContent="center" py={8}>
              <Spinner size="lg" />
            </VStack>
          ) : stats ? (
            <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={6}>
              <GridItem p={6} borderWidth="1px" borderRadius="lg" textAlign="center">
                <Text fontSize="sm" color="gray.600" mb={2}>Total Tips</Text>
                <Heading size="md">{stats.totalTipsCount}</Heading>
              </GridItem>
              <GridItem p={6} borderWidth="1px" borderRadius="lg" textAlign="center">
                <Text fontSize="sm" color="gray.600" mb={2}>Total Volume</Text>
                <Heading size="md">{Number(stats.totalVolumeSol).toFixed(2)} SOL</Heading>
              </GridItem>
              <GridItem p={6} borderWidth="1px" borderRadius="lg" textAlign="center">
                <Text fontSize="sm" color="gray.600" mb={2}>Platform Fees</Text>
                <Heading size="md">{Number(stats.platformFeeCollected).toFixed(2)} SOL</Heading>
              </GridItem>
              <GridItem p={6} borderWidth="1px" borderRadius="lg" textAlign="center">
                <Text fontSize="sm" color="gray.600" mb={2}>Creators</Text>
                <Heading size="md">{stats.uniqueCreators}</Heading>
              </GridItem>
              <GridItem p={6} borderWidth="1px" borderRadius="lg" textAlign="center">
                <Text fontSize="sm" color="gray.600" mb={2}>Supporters</Text>
                <Heading size="md">{stats.uniqueDonors}</Heading>
              </GridItem>
              <GridItem p={6} borderWidth="1px" borderRadius="lg" textAlign="center">
                <Text fontSize="sm" color="gray.600" mb={2}>Premium Users</Text>
                <Heading size="md">{stats.premiumUsersCount}</Heading>
              </GridItem>
            </Grid>
          ) : null}
        </Box>
      </VStack>
    </Container>
  );
}
