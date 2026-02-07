import { useRouter } from "next/router";
import { Box, Text, Flex, Heading } from "@chakra-ui/react";
import { usePublicClient, useChainId } from "wagmi";
import { useState, useEffect } from "react";
import { parseAbiItem, formatEther } from "viem";
import { getPuffTipAddress } from "@/utils/contract";
import { motion, AnimatePresence } from "framer-motion";

const MotionBox = motion(Box);

type ThemeType = "cyberpunk" | "coffee" | "pixel" | "default";

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
    const [theme, setTheme] = useState<ThemeType>("default");

    // Fetch theme
    useEffect(() => {
        if (!address) return;
        fetch(`/api/u/${address}`)
            .then(res => res.json())
            .then(data => {
                if (data && data.theme) setTheme(data.theme);
            })
            .catch(console.error);
    }, [address]);

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
                if (logs.length > 0) {
                    const latest = logs[logs.length - 1] as unknown as TipLog; // Cast for now
                    setCurrentTip(latest);
                    setShow(true);

                    // Hide after 8 seconds
                    setTimeout(() => {
                        setShow(false);
                    }, 8000);
                }
            }
        });

        return () => {
            unwatch();
        }
    }, [publicClient, address, contractAddress]);

    return (
        <Flex
            minH="100vh"
            justify="center"
            align="center"
            bg="transparent"
        >
            <AnimatePresence>
                {show && currentTip && (
                    <AlertBox theme={theme} tip={currentTip} />
                )}
            </AnimatePresence>
        </Flex>
    );
}

function AlertBox({ theme, tip }: { theme: ThemeType, tip: TipLog }) {
    const amount = formatEther(tip.args.amount);
    const sender = `${tip.args.tipper.slice(0, 6)}...`;
    const message = tip.args.message;

    if (theme === 'cyberpunk') {
        return (
            <MotionBox
                initial={{ x: -300, opacity: 0, skewX: 20 }}
                animate={{ x: 0, opacity: 1, skewX: 0 }}
                exit={{ x: 300, opacity: 0, skewX: -20 }}
                bg="black"
                border="2px solid #00BFFF"
                boxShadow="0 0 20px #FF0080"
                p={8}
                maxW="600px"
                position="relative"
                overflow="hidden"
            >
                <Heading size="3xl" color="#FF0080" fontFamily="heading" mb={2} textShadow="2px 2px #00BFFF">
                    NEW DONATION!
                </Heading>
                <Text fontSize="4xl" color="white" fontWeight="bold" fontFamily="monospace">
                    {amount} ETH
                </Text>
                <Text fontSize="xl" color="#00BFFF" mb={4}>from {sender}</Text>
                {message && <Text fontSize="2xl" color="white" bg="rgba(255,0,128,0.2)" p={2}>&quot;{message}&quot;</Text>}
            </MotionBox>
        )
    }

    if (theme === 'pixel') {
        return (
            <MotionBox
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 10 }}
                bg="white"
                border="8px solid black"
                p={8}
                maxW="500px"
                boxShadow="8px 8px 0px rgba(0,0,0,0.5)"
            >
                <Heading size="2xl" color="black" fontFamily="heading" mb={4}>
                    👾 LEVEL UP!
                </Heading>
                <Text fontSize="4xl" color="brand.purple" fontWeight="bold">
                    {amount} ETH
                </Text>
                <Text fontSize="lg" color="gray.600" mb={4}>{sender} joined the party</Text>
                {message && (
                    <Box border="2px dashed black" p={4} bg="gray.100">
                        <Text fontSize="xl" color="black" fontFamily="monospace">{message}</Text>
                    </Box>
                )}
            </MotionBox>
        )
    }

    // Default & Coffee
    return (
        <MotionBox
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            bg="rgba(255,255,255,0.9)"
            p={8}
            borderRadius="3xl"
            boxShadow="0 10px 40px rgba(0,0,0,0.3)"
            maxW="500px"
            textAlign="center"
        >
            <Heading size="2xl" color="brand.pink" fontFamily="heading" mb={2}>
                ✨ Tip Received!
            </Heading>
            <Text fontSize="4xl" fontWeight="bold" color="gray.800">
                {amount} ETH
            </Text>
            <Text fontSize="lg" color="gray.500" mb={4}>from {sender}</Text>
            {message && (
                <Text fontSize="2xl" color="gray.700" fontStyle="italic">&quot;{message}&quot;</Text>
            )}
        </MotionBox>
    )
}
