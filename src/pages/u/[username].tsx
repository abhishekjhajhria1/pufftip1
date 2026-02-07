import { useRouter } from "next/router";
import { Box, Flex, Avatar, Heading, Text, Button, Spinner, Center } from "@chakra-ui/react";
import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useChainId } from "wagmi";
import { parseEther } from "viem";
import { useState, useEffect } from "react";
import { PUFFTIP_ABI } from "@/utils/abi";
import { getPuffTipAddress } from "@/utils/contract";
import { toaster } from "@/components/ui/toaster";
import CoffeeProfileScene from "../../themes/profileVisuals/coffee";
// Import other themes as needed or use a default

export default function ProfilePage() {
  const router = useRouter();
  const { username: addressParam } = router.query;
  // Map "username" param to address because file is named [username].tsx but we route /u/0xAddress
  const accountAddress = typeof addressParam === "string" ? addressParam as `0x${string}` : undefined;

  const chainId = useChainId();
  const contractAddress = getPuffTipAddress(chainId);

  const [tipAmount, setTipAmount] = useState("0.01");
  const [message, setMessage] = useState("Great content!");

  const { data: profile, isLoading: isLoadingProfile } = useReadContract({
    address: contractAddress,
    abi: PUFFTIP_ABI,
    functionName: "profiles",
    args: accountAddress ? [accountAddress] : undefined,
    query: {
      enabled: !!accountAddress
    }
  });

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

  if (!router.isReady || isLoadingProfile) {
    return <Center minH="100vh" bg="gray.900"><Spinner size="xl" color="white" /></Center>;
  }

  // Contract returns [metadataURI, exists]
  const exists = profile ? profile[1] : false;
  const metadataURI = profile ? profile[0] : "";

  // Parser for metadata. For V1 prototype, assuming metadataURI implies theme content or just default.
  // Real implementation: Fetch JSON from IPFS using metadataURI.
  // For now, we'll try to parse JSON from the URI string if it's a raw JSON string for demo, 
  // or fallback to defaults.

  let profileData = { username: "User", bio: "Crypto Tipper", theme: "coffee" };
  try {
    if (metadataURI && metadataURI.startsWith("{")) {
      profileData = JSON.parse(metadataURI);
    }
  } catch (e) {
    // ignore
  }

  if (!exists) {
    return (
      <Box p={10} textAlign="center" bg="gray.900" minH="100vh" color="white" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <Heading size="lg">User Not Found</Heading>
        <Text mt={4}>This address has not created a PuffTip profile yet.</Text>
        <Text fontSize="sm" mt={2} color="gray.500">{accountAddress}</Text>
      </Box>
    );
  }

  return (
    <Box minH="100vh" position="relative" overflow="hidden" bg="gray.900">
      {/* Background Visual */}
      <Box position="absolute" inset={0} zIndex={0} opacity={0.5}>
        <CoffeeProfileScene />
      </Box>

      <Flex
        direction={["column", "row"]}
        align="center"
        justify="center"
        minH="100vh"
        position="relative"
        zIndex={2}
        px={4}
      >
        <Box
          bg="rgba(0,0,0,0.7)"
          borderRadius="2xl"
          p={10}
          maxW="500px"
          w="full"
          border="1px solid"
          borderColor="gray.700"
          backdropFilter="blur(10px)"
        >
          <Flex align="center" mb={6} direction="column">
            <Avatar.Root size="2xl" mb={4}>
              <Avatar.Fallback name={profileData.username || "User"} />
              <Avatar.Image src="" />
            </Avatar.Root>
            <Heading size="xl" color="white" mb={2}>{profileData.username || "Anon"}</Heading>
            <Text color="gray.300">{profileData.bio}</Text>
          </Flex>

          <Box>
            <Text color="gray.400" mb={2} fontSize="sm">Leave a message</Text>
            <Box mb={4}>
              <input
                style={{ width: '100%', padding: '12px', borderRadius: '8px', background: '#2D3748', border: '1px solid #4A5568', color: 'white', outline: 'none' }}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Say something nice..."
              />
            </Box>

            <Flex gap={2} mb={6}>
              {["0.001", "0.01", "0.05"].map(amt => (
                <Button
                  key={amt}
                  size="sm"
                  variant="outline"
                  colorScheme="whiteAlpha"
                  onClick={() => setTipAmount(amt)}
                  bg={tipAmount === amt ? "whiteAlpha.200" : "transparent"}
                  borderColor="gray.600"
                  color="white"
                >
                  {amt} ETH
                </Button>
              ))}
            </Flex>

            <Button
              colorScheme="pink"
              size="lg"
              width="full"
              onClick={handleTip}
              loading={isPending || isConfirming}
              loadingText="Sending..."
              bgGradient="linear(to-r, pink.400, purple.500)"
              _hover={{ bgGradient: "linear(to-r, pink.500, purple.600)" }}
            >
              Send Tip ({tipAmount} ETH)
            </Button>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}
