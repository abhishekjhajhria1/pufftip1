import { useRouter } from "next/router";
import { Box, Flex, Avatar, Heading, Text, Button, Spinner, Center, Input, Progress, Icon, Link as ChakraLink } from "@chakra-ui/react";
import { useWriteContract, useWaitForTransactionReceipt, useChainId, useBalance } from "wagmi";
import { parseEther } from "viem";
import { useState, useEffect } from "react";
import { PUFFTIP_ABI } from "@/utils/abi";
import { getPuffTipAddress } from "@/utils/contract";
import { toaster } from "@/components/ui/toaster";
import Background from "@/components/visuals/Background";
import { motion } from "framer-motion";
import { FaTwitter, FaGithub, FaGlobe } from "react-icons/fa";

const MotionBox = motion(Box);

export default function ProfilePage() {
  const router = useRouter();
  const { username: addressParam } = router.query;
  const accountAddress = typeof addressParam === "string" ? addressParam as `0x${string}` : undefined;

  const chainId = useChainId();
  const contractAddress = getPuffTipAddress(chainId);

  // Fetch balance for Goal Progress
  const { data: balance } = useBalance({ address: accountAddress });

  const [tipAmount, setTipAmount] = useState("0.01");
  const [message, setMessage] = useState("Great content!");
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);

  // Profile State
  interface ProfileState {
    username: string;
    bio: string;
    theme: "cyberpunk" | "coffee" | "pixel" | "default";
    socials?: { twitter?: string; github?: string; website?: string };
    goal?: { title: string; amount: number };
  }

  const [profileData, setProfileData] = useState<ProfileState>({
    username: "Loading...",
    bio: "...",
    theme: "default"
  });

  // Fetch from API
  useEffect(() => {
    if (!accountAddress) return;
    fetch(`/api/u/${accountAddress}`)
      .then(res => res.json())
      .then(data => {
        if (data) {
          setProfileData({
            username: data.username || "Anon",
            bio: data.bio || "Just another cypherpunk.",
            theme: data.theme || "default",
            socials: data.socials,
            goal: data.goal
          });
        }
        setIsLoadingProfile(false);
      })
      .catch(e => {
        console.error(e);
        setIsLoadingProfile(false);
      });
  }, [accountAddress]);


  const { data: hash, writeContract, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  const handleTip = async () => {
    if (!accountAddress) return;
    try {
      writeContract({
        address: contractAddress,
        abi: PUFFTIP_ABI,
        functionName: "tip",
        args: [accountAddress, message],
        value: parseEther(tipAmount)
      });
    } catch (err) {
      console.error(err);
      toaster.create({ title: "Error", description: "Failed to send tip", type: "error" });
    }
  };

  useEffect(() => {
    if (isConfirmed) {
      toaster.create({ title: "Sent!", description: "Tip sent successfully!", type: "success" });
    }
  }, [isConfirmed]);

  // Goal Calculation
  const currentEth = balance ? parseFloat(balance.formatted) : 0;
  const goalTarget = profileData.goal ? profileData.goal.amount : 1;
  const progressPercent = Math.min((currentEth / goalTarget) * 100, 100);

  if (!router.isReady || isLoadingProfile) {
    return (
      <Background theme="default">
        <Center minH="100vh"><Spinner size="xl" color="white" /></Center>
      </Background>
    );
  }

  return (
    <Background theme={profileData.theme}>
      <Flex
        direction="column"
        align="center"
        justify="center"
        minH="100vh"
        px={4}
      >
        <MotionBox
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
          bg="rgba(0,0,0,0.6)"
          borderRadius="3xl"
          p={10}
          maxW="500px"
          w="full"
          border="1px solid"
          borderColor="brand.purple"
          backdropFilter="blur(20px)"
          boxShadow="0 0 40px rgba(0,0,0,0.5)"
        >
          {/* Header Section */}
          <Flex align="center" mb={6} direction="column">
            <MotionBox
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <Avatar.Root size="2xl" mb={4} border="4px solid" borderColor="brand.pink">
                <Avatar.Fallback name={profileData.username} bg="brand.purple" color="white" fontSize="3xl" />
                <Avatar.Image src="" />
              </Avatar.Root>
            </MotionBox>

            <Heading size="3xl" color="white" mb={2} fontFamily="heading" textShadow="0 0 10px rgba(255,255,255,0.5)">
              {profileData.username}
            </Heading>
            <Text color="brand.cyan" fontFamily="subheading" fontSize="lg" textAlign="center">{profileData.bio}</Text>

            {/* Social Icons */}
            {profileData.socials && (
              <Flex gap={4} mt={4}>
                {profileData.socials.twitter && (
                  <ChakraLink href={`https://twitter.com/${profileData.socials.twitter}`} target="_blank" rel="noopener noreferrer" color="gray.400" _hover={{ color: "twitter.400", transform: "scale(1.2)" }}>
                    <Icon as={FaTwitter} boxSize={6} />
                  </ChakraLink>
                )}
                {profileData.socials.github && (
                  <ChakraLink href={`https://github.com/${profileData.socials.github}`} target="_blank" rel="noopener noreferrer" color="gray.400" _hover={{ color: "white", transform: "scale(1.2)" }}>
                    <Icon as={FaGithub} boxSize={6} />
                  </ChakraLink>
                )}
                {profileData.socials.website && (
                  <ChakraLink href={`https://${profileData.socials.website}`} target="_blank" rel="noopener noreferrer" color="gray.400" _hover={{ color: "brand.pink", transform: "scale(1.2)" }}>
                    <Icon as={FaGlobe} boxSize={6} />
                  </ChakraLink>
                )}
              </Flex>
            )}
          </Flex>

          {/* Goal Section */}
          {profileData.goal && (
            <MotionBox
              mb={8}
              bg="rgba(255,255,255,0.1)"
              p={4}
              borderRadius="xl"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Flex justify="space-between" mb={2} color="brand.yellow" fontFamily="heading" fontSize="sm">
                <Text>{profileData.goal.title}</Text>
                <Text>{currentEth.toFixed(2)} / {profileData.goal.amount} ETH</Text>
              </Flex>
              <Progress.Root value={progressPercent} size="sm" colorScheme="pink" borderRadius="full">
                <Progress.Track bg="rgba(0,0,0,0.5)">
                  <Progress.Range />
                </Progress.Track>
              </Progress.Root>
            </MotionBox>
          )}

          {/* Tipping Section */}
          <Box>
            <Text color="gray.400" mb={2} fontSize="sm" fontFamily="body">LEAVE A MESSAGE</Text>
            <Box mb={6}>
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Say something nice..."
                bg="rgba(255,255,255,0.1)"
                border="none"
                color="white"
                _focus={{ boxShadow: "0 0 0 2px #FF0080" }}
                p={6}
                fontSize="lg"
                borderRadius="xl"
              />
            </Box>

            <Flex gap={3} mb={8} justify="center">
              {["0.001", "0.01", "0.05"].map(amt => (
                <Button
                  key={amt}
                  size="md"
                  variant="outline"
                  onClick={() => setTipAmount(amt)}
                  bg={tipAmount === amt ? "brand.pink" : "transparent"}
                  borderColor="brand.pink"
                  color="white"
                  borderRadius="xl"
                  _hover={{ bg: "brand.pink", transform: "translateY(-2px)" }}
                  fontFamily="monospace"
                >
                  {amt} ETH
                </Button>
              ))}
            </Flex>

            <Button
              size="2xl"
              width="full"
              onClick={handleTip}
              loading={isPending || isConfirming}
              loadingText="SENDING..."
              bgGradient="linear(to-r, brand.pink, brand.purple)"
              _hover={{
                bgGradient: "linear(to-r, brand.yellow, brand.pink)",
                transform: "scale(1.02)",
                boxShadow: "0 0 20px #FF0080"
              }}
              color="white"
              borderRadius="full"
              fontFamily="heading"
              fontSize="2xl"
              boxShadow="0 4px 15px rgba(0,0,0,0.3)"
            >
              SEND TIP ({tipAmount} ETH)
            </Button>
          </Box>
        </MotionBox>
      </Flex>
    </Background>
  );
}
