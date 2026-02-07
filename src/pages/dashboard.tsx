import { Box, VStack, Heading, Text, Button, Input, Flex, SimpleGrid, Icon } from "@chakra-ui/react";
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt, useBalance, usePublicClient } from "wagmi";
import { useState, useEffect } from "react";
import { PUFFTIP_ABI } from "@/utils/abi";
import { getPuffTipAddress } from "@/utils/contract";
import { parseEther, formatEther, parseAbiItem } from "viem";
import Link from 'next/link';
import { toaster } from "@/components/ui/toaster";
import Background from "@/components/visuals/Background";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

type ThemeType = "cyberpunk" | "coffee" | "pixel" | "default";

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
  const [userTheme, setUserTheme] = useState<ThemeType>("default");

  // Fetch user theme for the dashboard background
  useEffect(() => {
    if (!address) return;
    fetch(`/api/u/${address}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.theme) setUserTheme(data.theme);
      })
      .catch(console.error);
  }, [address]);

  if (!isConnected) {
    return (
      <Background theme="default">
        <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
          <Text fontSize="3xl" fontFamily="heading" color="white">Please connect your wallet.</Text>
        </Box>
      </Background>
    );
  }

  return (
    <Background theme={userTheme}>
      <Box minH="100vh" color="white" p={[4, 8]}>
        <Flex justify="space-between" align="center" mb={8} bg="rgba(0,0,0,0.4)" p={4} borderRadius="xl" backdropFilter="blur(10px)">
          <Heading size="lg" fontFamily="heading" color="brand.cyan">Dashboard</Heading>
          <Link href={`/u/${address}`} passHref>
            <Button colorScheme="pink" variant="solid" size="sm" fontFamily="subheading">
              View Public Page ↗
            </Button>
          </Link>
        </Flex>

        {/* Custom Tabs Navigation */}
        <Flex gap={4} mb={8} borderBottom="1px solid" borderColor="whiteAlpha.300" pb={2}>
          {['overview', 'profile', 'overlay'].map((tab) => (
            <Button
              key={tab}
              variant="ghost"
              color={activeTab === tab ? "brand.pink" : "gray.400"}
              borderBottom={activeTab === tab ? "2px solid" : "none"}
              borderColor="brand.pink"
              borderRadius="0"
              _hover={{ color: "brand.yellow", bg: "transparent" }}
              onClick={() => setActiveTab(tab)}
              textTransform="capitalize"
              fontFamily="heading"
              fontSize="xl"
            >
              {tab}
            </Button>
          ))}
        </Flex>

        <Box maxW="1000px" mx="auto">
          <MotionBox
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && <OverviewTab address={address} chainId={chainId} />}
            {activeTab === 'profile' && <ProfileTab address={address} chainId={chainId} setTheme={setUserTheme} />}
            {activeTab === 'overlay' && <OverlayTab address={address} />}
          </MotionBox>
        </Box>
      </Box>
    </Background>
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
        const currentBlock = await publicClient.getBlockNumber();
        const fromBlock = currentBlock - 5000n > 0n ? currentBlock - 5000n : 0n;

        const logs = await publicClient.getLogs({
          address: contractAddress as `0x${string}`,
          event: parseAbiItem('event TipSent(address indexed tipper, address indexed recipient, uint256 amount, string message, uint256 timestamp)'),
          args: {
            recipient: address
          },
          fromBlock: fromBlock
        });

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
    <VStack align="start" gap={8} w="full">
      {/* Stats Cards */}
      <SimpleGrid columns={[1, 2]} gap={6} w="full">
        <Box
          p={8}
          bg="rgba(255,255,255,0.05)"
          borderRadius="2xl"
          backdropFilter="blur(10px)"
          border="1px solid"
          borderColor="brand.purple"
          boxShadow="lg"
        >
          <Text color="gray.400" mb={1} fontFamily="subheading">WALLET BALANCE</Text>
          <Text fontSize="4xl" fontWeight="bold" fontFamily="heading" color="brand.yellow">
            {balance ? `${Number(balance.formatted).toFixed(4)} ${balance.symbol}` : "..."}
          </Text>
        </Box>
        <Box
          p={8}
          bg="rgba(255,255,255,0.05)"
          borderRadius="2xl"
          backdropFilter="blur(10px)"
          border="1px solid"
          borderColor="brand.purple"
          boxShadow="lg"
        >
          <Text color="gray.400" mb={1} fontFamily="subheading">TOTAL TIPS</Text>
          <Text fontSize="4xl" fontWeight="bold" fontFamily="heading" color="brand.pink">
            {recentTips.length}
          </Text>
        </Box>
      </SimpleGrid>

      <Box w="full">
        <Heading size="md" mb={4} fontFamily="heading" color="brand.cyan">RECENT ACTIVITY</Heading>
        {recentTips.length === 0 ? (
          <Text color="gray.500" fontStyle="italic">No tips found yet. Share your profile!</Text>
        ) : (
          <VStack align="stretch" gap={4}>
            {recentTips.map((log) => (
              <Box
                key={log.transactionHash}
                p={5}
                bg="rgba(0,0,0,0.3)"
                borderRadius="xl"
                borderLeft="4px solid"
                borderColor="brand.pink"
                transition="all 0.2s"
                _hover={{ bg: "rgba(0,0,0,0.5)", transform: "translateX(5px)" }}
              >
                <Flex justify="space-between" align="center">
                  <Box>
                    <Text fontWeight="bold" color="white" fontSize="lg">
                      {formatEther(log.args.amount)} ETH
                    </Text>
                    <Text fontSize="sm" color="gray.400">
                      Top Fan: {log.args.tipper.slice(0, 6)}...{log.args.tipper.slice(-4)}
                    </Text>
                  </Box>
                  <Text fontSize="xs" color="gray.500">Block #{log.blockNumber.toString()}</Text>
                </Flex>
                {log.args.message && (
                  <Text mt={3} fontStyle="italic" color="brand.cyan">&quot;{log.args.message}&quot;</Text>
                )}
              </Box>
            ))}
          </VStack>
        )}
      </Box>
    </VStack>
  )
}

import { FaTwitter, FaGithub, FaGlobe } from "react-icons/fa";

// ... inside ProfileTab component ...

function ProfileTab({ address, chainId, setTheme }: { address: `0x${string}` | undefined, chainId?: number, setTheme: (t: ThemeType) => void }) {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [theme, setLocalTheme] = useState<ThemeType>("coffee");

  // New State
  const [twitter, setTwitter] = useState("");
  const [github, setGithub] = useState("");
  const [website, setWebsite] = useState("");
  const [goalTitle, setGoalTitle] = useState("");
  const [goalAmount, setGoalAmount] = useState("1.0");

  const contractAddress = getPuffTipAddress(chainId);

  useEffect(() => {
    if (!address) return;
    fetch(`/api/u/${address}`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          setName(data.username || "");
          setBio(data.bio || "");
          setLocalTheme((data.theme as ThemeType) || "coffee");
          setTheme((data.theme as ThemeType) || "coffee");

          // Load new fields
          if (data.socials) {
            setTwitter(data.socials.twitter || "");
            setGithub(data.socials.github || "");
            setWebsite(data.socials.website || "");
          }
          if (data.goal) {
            setGoalTitle(data.goal.title || "");
            setGoalAmount(data.goal.amount?.toString() || "1.0");
          }
        }
      })
      .catch(err => console.error("Failed to load profile", err));
  }, [address, setTheme]);

  // ... (contract hooks remain same) ...

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
    try {
      writeContract({
        address: contractAddress,
        abi: PUFFTIP_ABI,
        functionName: "updateProfile",
        args: ["stored-off-chain"],
        value: updateFee ? updateFee : parseEther("0.001"),
      })
    } catch (error) {
      console.error(error);
      toaster.create({ title: "Error", description: "Failed to initiate transaction", type: "error" });
    }
  };

  useEffect(() => {
    if (isConfirmed && address) {
      const payload = {
        username: name,
        bio,
        theme,
        socials: { twitter, github, website },
        goal: { title: goalTitle, amount: parseFloat(goalAmount) }
      };

      fetch(`/api/u/${address}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
        .then(() => {
          toaster.create({ title: "Success!", description: "Profile updated!", type: "success" });
          setTheme(theme);
        })
        .catch(() => {
          toaster.create({ title: "Warning", description: "Fee paid, but API save failed.", type: "warning" });
        });
    }
  }, [isConfirmed, address, name, bio, theme, setTheme, twitter, github, website, goalTitle, goalAmount])

  const themes = [
    { id: 'cyberpunk', emoji: '🤖', label: 'Cyberpunk' },
    { id: 'coffee', emoji: '☕', label: 'Cozy Coffee' },
    { id: 'pixel', emoji: '👾', label: '8-Bit Pixel' },
  ];

  return (
    <Box p={8} bg="rgba(255,255,255,0.05)" borderRadius="2xl" border="1px solid" borderColor="brand.purple" backdropFilter="blur(10px)">
      <Heading size="md" mb={6} fontFamily="heading">EDIT PROFILE</Heading>
      <VStack gap={6} align="stretch">

        {/* Basic Info */}
        <Box>
          <Text mb={2} color="gray.300" fontSize="sm" fontFamily="subheading">DISPLAY NAME</Text>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Satoshi"
            bg="rgba(0,0,0,0.3)"
            border="none"
            color="white"
            h="50px"
            borderRadius="lg"
            _focus={{ boxShadow: "0 0 0 2px #FF0080" }}
          />
        </Box>
        <Box>
          <Text mb={2} color="gray.300" fontSize="sm" fontFamily="subheading">BIO</Text>
          <Input
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Tell your fans about you..."
            bg="rgba(0,0,0,0.3)"
            border="none"
            color="white"
            h="50px"
            borderRadius="lg"
            _focus={{ boxShadow: "0 0 0 2px #FF0080" }}
          />
        </Box>

        {/* Socials Section */}
        <Box>
          <Text mb={3} color="brand.cyan" fontSize="sm" fontFamily="heading" letterSpacing="wide">SOCIAL LINKS</Text>
          <SimpleGrid columns={[1, 3]} gap={4}>
            <Flex align="center" bg="rgba(0,0,0,0.3)" p={2} borderRadius="lg">
              <Icon as={FaTwitter} color="twitter.400" mr={2} boxSize={5} />
              <Input
                value={twitter} onChange={e => setTwitter(e.target.value)}
                placeholder="@username" variant="flushed" color="white" fontSize="sm" borderBottom="none"
              />
            </Flex>
            <Flex align="center" bg="rgba(0,0,0,0.3)" p={2} borderRadius="lg">
              <Icon as={FaGithub} color="white" mr={2} boxSize={5} />
              <Input
                value={github} onChange={e => setGithub(e.target.value)}
                placeholder="github user" variant="flushed" color="white" fontSize="sm" borderBottom="none"
              />
            </Flex>
            <Flex align="center" bg="rgba(0,0,0,0.3)" p={2} borderRadius="lg">
              <Icon as={FaGlobe} color="brand.pink" mr={2} boxSize={5} />
              <Input
                value={website} onChange={e => setWebsite(e.target.value)}
                placeholder="website.com" variant="flushed" color="white" fontSize="sm" borderBottom="none"
              />
            </Flex>
          </SimpleGrid>
        </Box>

        {/* Goal Section */}
        <Box>
          <Text mb={3} color="brand.yellow" fontSize="sm" fontFamily="heading" letterSpacing="wide">FUNDING GOAL</Text>
          <Flex gap={4} direction={['column', 'row']}>
            <Box flex={1}>
              <Text fontSize="xs" color="gray.400" mb={1}>GOAL TITLE</Text>
              <Input
                value={goalTitle} onChange={e => setGoalTitle(e.target.value)}
                placeholder="e.g. New Camera Fund"
                bg="rgba(0,0,0,0.3)" border="none" color="white"
              />
            </Box>
            <Box w={['100%', '150px']}>
              <Text fontSize="xs" color="gray.400" mb={1}>TARGET (ETH)</Text>
              <Input
                value={goalAmount} onChange={e => setGoalAmount(e.target.value)}
                placeholder="1.0"
                bg="rgba(0,0,0,0.3)" border="none" color="white" type="number" step="0.1"
              />
            </Box>
          </Flex>
        </Box>

        <Box>
          <Text mb={3} color="gray.300" fontSize="sm" fontFamily="subheading">THEME</Text>
          <SimpleGrid columns={3} gap={4}>
            {themes.map(t => (
              <Button
                key={t.id}
                h="80px"
                variant="outline"
                borderColor={theme === t.id ? "brand.pink" : "gray.700"}
                bg={theme === t.id ? "rgba(255,0,128,0.1)" : "transparent"}
                color="white"
                onClick={() => setLocalTheme(t.id as ThemeType)}
                _hover={{ borderColor: "brand.pink", transform: "translateY(-2px)" }}
                flexDir="column"
                gap={1}
              >
                <Text fontSize="2xl">{t.emoji}</Text>
                <Text fontSize="xs">{t.label}</Text>
              </Button>
            ))}
          </SimpleGrid>
        </Box>
        <Button
          mt={4}
          size="lg"
          bgGradient="linear(to-r, brand.pink, brand.purple)"
          _hover={{ bgGradient: "linear(to-r, brand.yellow, brand.pink)" }}
          onClick={handleUpdateProfile}
          loading={isPending || isConfirming}
          loadingText="CONFIRMING..."
          fontFamily="heading"
          borderRadius="full"
        >
          SAVE PROFILE (Fee: {updateFee ? formatEther(updateFee) : "0.001"} ETH)
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
    <Box p={8} bg="rgba(255,255,255,0.05)" borderRadius="2xl" border="1px solid" borderColor="brand.purple" backdropFilter="blur(10px)">
      <Heading size="md" mb={4} fontFamily="heading">STREAM OVERLAY</Heading>
      <Text mb={6} color="gray.400">Add this URL to OBS as a Browser Source.</Text>

      <Flex gap={2} bg="blackAlpha.600" p={4} borderRadius="xl" align="center" border="1px dashed" borderColor="gray.600">
        <Text fontFamily="monospace" flex={1} overflow="hidden" whiteSpace="nowrap" textOverflow="ellipsis" color="brand.cyan">
          {overlayUrl}
        </Text>
        <Button size="sm" onClick={copyToClipboard} colorScheme="pink">COPY</Button>
      </Flex>
    </Box>
  )
}
