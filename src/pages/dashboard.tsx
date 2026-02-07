import { Box, VStack, Heading, Text, Button, Input, Flex } from "@chakra-ui/react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, useBalance, usePublicClient } from "wagmi";
import { useState, useEffect } from "react";
import { PUFFTIP_ABI } from "@/utils/abi";
import { getPuffTipAddress } from "@/utils/contract";
import { parseEther, formatEther, parseAbiItem } from "viem";
import Link from 'next/link';
import { toaster } from "@/components/ui/toaster";

// Define a minimal type for the log we expect
interface TipLog {
  args: {
    tipper: string;
    recipient: string;
    amount: bigint;
    message: string;
    timestamp: bigint;
  };
  transactionHash: string;
  blockNumber: bigint;
}

export default function Dashboard() {
  const { address, isConnected, chainId } = useAccount();
  const [activeTab, setActiveTab] = useState("overview");

  if (!isConnected) {
    return (
      <Box minH="100vh" bg="gray.900" color="white" display="flex" alignItems="center" justifyContent="center">
        <Text fontSize="2xl">Please connect your wallet.</Text>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="gray.900" color="white" p={8}>
      <Flex justify="space-between" align="center" mb={8}>
        <Heading size="lg">Dashboard</Heading>
        <Link href={`/u/${address}`} passHref>
          <Button colorScheme="teal" variant="outline">View Public Page</Button>
        </Link>
      </Flex>

      {/* Custom Tabs Navigation */}
      <Flex gap={4} mb={8} borderBottom="1px solid" borderColor="gray.700" pb={2}>
        {['overview', 'profile', 'overlay'].map((tab) => (
          <Button
            key={tab}
            variant="ghost"
            color={activeTab === tab ? "pink.400" : "gray.400"}
            borderBottom={activeTab === tab ? "2px solid" : "none"}
            borderColor="pink.400"
            borderRadius="0"
            _hover={{ color: "white" }}
            onClick={() => setActiveTab(tab)}
            textTransform="capitalize"
          >
            {tab}
          </Button>
        ))}
      </Flex>

      <Box maxW="800px">
        {activeTab === 'overview' && <OverviewTab address={address} chainId={chainId} />}
        {activeTab === 'profile' && <ProfileTab address={address} chainId={chainId} />}
        {activeTab === 'overlay' && <OverlayTab address={address} />}
      </Box>
    </Box>
  );
}

function OverviewTab({ address, chainId }: { address: `0x${string}` | undefined, chainId?: number }) {
  const { data: balance } = useBalance({ address });
  const [recentTips, setRecentTips] = useState<TipLog[]>([]);
  const publicClient = usePublicClient();
  const contractAddress = getPuffTipAddress(chainId);

  useEffect(() => {
    if (!publicClient || !address || !contractAddress || !chainId) return;

    const fetchTips = async () => {
      try {
        const logs = await publicClient.getLogs({
          address: contractAddress as `0x${string}`,
          event: parseAbiItem('event TipSent(address indexed tipper, address indexed recipient, uint256 amount, string message, uint256 timestamp)'),
          args: {
            recipient: address
          },
          fromBlock: 'earliest'
        });

        // Cast logs to our type since we know the shape matches the event
        const typedLogs = logs.map(log => ({
          args: log.args as TipLog['args'],
          transactionHash: log.transactionHash,
          blockNumber: log.blockNumber
        })) as TipLog[];

        const sortedLogs = typedLogs.sort((a, b) => Number(b.blockNumber) - Number(a.blockNumber));
        setRecentTips(sortedLogs);
      } catch (e) {
        console.error("Failed to fetch tips:", e);
      }
    };

    fetchTips();
  }, [publicClient, address, contractAddress, chainId]);

  return (
    <VStack align="start" gap={6} w="full">
      <Box p={6} bg="gray.800" borderRadius="xl" w="full">
        <Heading size="md" mb={2}>Wallet Balance</Heading>
        <Text fontSize="3xl" fontWeight="bold">
          {balance ? `${Number(balance.formatted).toFixed(4)} ${balance.symbol}` : "Loading..."}
        </Text>
        <Text color="gray.500">
          Tips are sent directly to your wallet.
        </Text>
      </Box>
      <Box p={6} bg="gray.800" borderRadius="xl" w="full">
        <Heading size="md" mb={4}>Recent Tips</Heading>
        {recentTips.length === 0 ? (
          <Text color="gray.500">No tips found yet.</Text>
        ) : (
          <VStack align="stretch" gap={3}>
            {recentTips.map((log) => (
              <Box key={log.transactionHash} p={4} bg="gray.700" borderRadius="md">
                <Flex justify="space-between">
                  <Text fontWeight="bold" color="pink.300">
                    {formatEther(log.args.amount)} ETH
                  </Text>
                  <Text fontSize="sm" color="gray.400">
                    From: {log.args.tipper.slice(0, 6)}...{log.args.tipper.slice(-4)}
                  </Text>
                </Flex>
                {log.args.message && (
                  <Text mt={2} fontStyle="italic" color="whiteAlpha.900">&quot;{log.args.message}&quot;</Text>
                )}
              </Box>
            ))}
          </VStack>
        )}
      </Box>
    </VStack>
  )
}

function ProfileTab({ address, chainId }: { address: `0x${string}` | undefined, chainId?: number }) {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [theme, setTheme] = useState("coffee");
  const contractAddress = getPuffTipAddress(chainId);

  const { data: updateFee } = useReadContract({
    address: contractAddress,
    abi: PUFFTIP_ABI,
    functionName: "profileUpdateFee",
  });

  const { data: hash, writeContract, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    })

  const handleUpdateProfile = async () => {
    const metadata = JSON.stringify({
      username: name,
      bio: bio,
      theme: theme
    });

    try {
      writeContract({
        address: contractAddress,
        abi: PUFFTIP_ABI,
        functionName: "updateProfile",
        args: [metadata],
        value: updateFee ? updateFee : parseEther("0.001"),
      })
    } catch (error) {
      console.error(error);
      toaster.create({ title: "Error", description: "Failed to update profile", type: "error" });
    }
  };

  useEffect(() => {
    if (isConfirmed) {
      toaster.create({ title: "Success!", description: "Profile updated successfully.", type: "success" });
    }
  }, [isConfirmed])

  return (
    <Box p={6} bg="gray.800" borderRadius="xl" w="full">
      <Heading size="md" mb={6}>Edit Profile</Heading>
      <VStack gap={4} align="stretch">
        <Box>
          <Text mb={2}>Display Name</Text>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Satoshi" bg="gray.700" border="none" />
        </Box>
        <Box>
          <Text mb={2}>Bio</Text>
          <Input value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Tell your fans about you..." bg="gray.700" border="none" />
        </Box>
        <Box>
          <Text mb={2}>Theme</Text>
          <Flex gap={2}>
            {['coffee', 'pizza', 'candy'].map(t => (
              <Button
                key={t}
                size="sm"
                variant={theme === t ? "solid" : "outline"}
                colorScheme="purple"
                onClick={() => setTheme(t)}
              >
                {t}
              </Button>
            ))}
          </Flex>
        </Box>
        <Button
          mt={4}
          colorScheme="pink"
          onClick={handleUpdateProfile}
          loading={isPending || isConfirming}
          loadingText="Updating..."
        >
          Save Profile (Fee: {updateFee ? formatEther(updateFee) : "0.001"} ETH)
        </Button>
      </VStack>
    </Box>
  )
}

function OverlayTab({ address }: { address: `0x${string}` | undefined }) {
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const overlayUrl = `${origin}/overlay/${address}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(overlayUrl);
    toaster.create({ title: "Copied!", type: "success" });
  }

  return (
    <Box p={6} bg="gray.800" borderRadius="xl" w="full">
      <Heading size="md" mb={4}>Stream Overlay</Heading>
      <Text mb={4} color="gray.400">Add this URL to OBS as a Browser Source to display alerts.</Text>

      <Flex gap={2} bg="gray.900" p={2} borderRadius="md" align="center">
        <Text fontFamily="monospace" flex={1} overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis">
          {overlayUrl}
        </Text>
        <Button size="sm" onClick={copyToClipboard}>Copy</Button>
      </Flex>
    </Box>
  )
}
