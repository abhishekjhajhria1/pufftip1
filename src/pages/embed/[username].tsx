import { Box, Container, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { TipForm } from "@/components/TipForm";
import { useWallet } from "@solana/wallet-adapter-react";
import Head from "next/head";

/**
 * Simple embed page – renders only the tip form for a creator.
 * Intended to be loaded in an <iframe> on external sites.
 */
export default function EmbedPage() {
  const router = useRouter();
  const { username } = router.query as { username: string };
  const { connected } = useWallet();

  return (
    <>
      <Head>
        <title>{username ? `${username} – Tip Form` : "PuffTip Embed"}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Container maxW="container.sm" py={8}>
        <VStack gap={4} align="stretch">
          <Heading size="md" textAlign="center" fontFamily="body">
            Support {username || "Creator"}
          </Heading>
          {connected ? (
            <TipForm username={typeof username === "string" ? username : ""} onSuccess={() => {}} onError={(e) => console.error(e)} />
          ) : (
            <Box textAlign="center">
              <Text mb={4}>Connect your wallet to tip.</Text>
              <Button onClick={() => router.push("/register")} size="sm" bg="linear-gradient(135deg, #7928CA 0%, #FF0080 100%)" color="white">
                Register / Connect
              </Button>
            </Box>
          )}
        </VStack>
      </Container>
    </>
  );
}
