import { useRouter } from "next/router";
import { Box, Text, Flex, Heading } from "@chakra-ui/react";
import { usePublicClient, useChainId } from "wagmi";
import { useState, useEffect } from "react";
import { parseAbiItem, formatEther } from "viem";
import { getPuffTipAddress } from "@/utils/contract";

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

export default function OverlayPage() {
    const router = useRouter();
    const { address } = router.query;
    const chainId = useChainId();
    const contractAddress = getPuffTipAddress(chainId);
    const publicClient = usePublicClient();

    const [currentTip, setCurrentTip] = useState<TipLog | null>(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (!publicClient || !address || !contractAddress) return;

        console.log("Listening for tips to:", address);

        const unwatch = publicClient.watchEvent({
            address: contractAddress as `0x${string}`,
            event: parseAbiItem('event TipSent(address indexed tipper, address indexed recipient, uint256 amount, string message, uint256 timestamp)'),
            args: {
                recipient: address as `0x${string}`
            },
            onLogs: (logs) => {
                console.log("New Tip Logic triggered!", logs);
                if (logs.length > 0) {
                    // Show the latest tip
                    // Cast to unknown then TipLog to satisfy TS if structure matches
                    const latest = logs[logs.length - 1] as unknown as TipLog;
                    setCurrentTip(latest);
                    setShow(true);

                    // Hide after 5 seconds
                    setTimeout(() => {
                        setShow(false);
                    }, 5000);
                }
            }
        });

        return () => {
            unwatch();
        }
    }, [publicClient, address, contractAddress]);

    if (!show || !currentTip) return null;

    return (
        <Flex
            minH="100vh"
            justify="center"
            align="center"
            bg="transparent" // Important for OBS
        >
            <Box
                textAlign="center"
                className="animate-bounce" // Add animation class if you have css or use keyframes
            >
                {/* You can replace this with a Gif or Image */}
                <Heading
                    size="4xl"
                    color="yellow.400"
                    textShadow="0 0 10px rgba(0,0,0,0.8)"
                    mb={4}
                >
                    🎉 NEW TIP!
                </Heading>

                <Box
                    bg="rgba(0,0,0,0.8)"
                    p={6}
                    borderRadius="xl"
                    border="2px solid white"
                >
                    <Heading size="2xl" color="white" mb={2}>
                        {formatEther(currentTip.args.amount)} ETH
                    </Heading>
                    <Text fontSize="xl" color="gray.300" fontWeight="bold">
                        From: {currentTip.args.tipper.slice(0, 6)}...
                    </Text>
                    {currentTip.args.message && (
                        <Text fontSize="2xl" color="white" mt={4} fontStyle="italic">
                            &quot;{currentTip.args.message}&quot;
                        </Text>
                    )}
                </Box>
            </Box>
        </Flex>
    );
}
