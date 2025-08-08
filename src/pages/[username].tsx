// src/pages/[username].tsx
import { useRouter } from "next/router";
import { Box, Flex, Avatar, Heading, Text, Button } from "@chakra-ui/react";
import CoffeeProfileScene from "../themes/profileVisuals/coffee";
import PizzaProfileScene from "../themes/profileVisuals/pizza";
import CandyProfileScene from "../themes/profileVisuals/candy";
import CigaretteProfileScene from "../themes/profileVisuals/cigarette";

// Add more profile visual components as you make them

type Profile = {
  theme: string;
  username: string;
  profilePic: string;
  bio: string;
  wallet: string;
};

const mockProfiles: { [key: string]: Profile } = {
  lily: {
    theme: "coffee",
    username: "lily",
    profilePic: "/avatars/lily.png",
    bio: "Solana dev, coffee lover ☕",
    wallet: "123ABC...",
  },
  mike: {
    theme: "pizza",
    username: "mike",
    profilePic: "/avatars/mike.png",
    bio: "Building on Web3. Tip me a pizza slice!",
    wallet: "345DEF...",
  },
  candy: {
    theme: "candy",
    username: "candy",
    profilePic: "/avatars/candy.png",
    bio: "Your sweet friend on Solana 🚀",
    wallet: "789GHI...",
  },
  
  // add more profiles
};

// Map theme keys to profile visuals
const themeProfiles: { [key: string]: React.ReactNode } = {
  coffee: <CoffeeProfileScene />,
  pizza: <PizzaProfileScene />,
  candy: <CandyProfileScene />,
  cigarette: <CigaretteProfileScene />,
  // Add more themes if needed
};

export default function ProfilePage() {
  const { query, isReady } = useRouter();
  const username = typeof query.username === "string" ? query.username : undefined;

  if (!isReady || !username) return <Box p={8}>Loading...</Box>;

  const profile = mockProfiles[username];

  if (!profile) {
    return (
      <Box p={10} textAlign="center">
        <Heading size="lg">User Not Found</Heading>
        <Text mt={4}>This profile does not exist (yet!).</Text>
      </Box>
    );
  }

  return (
    <Box minH="100vh" position="relative" overflow="hidden">
      {/* Animated theme visual as background */}
      <Box position="absolute" inset={0} zIndex={0} style={{ pointerEvents: "none" }}>
        {themeProfiles[profile.theme]}
      </Box>

      {/* Frosted Glass Card & Layout */}
      <Flex
        direction={["column", "row"]}
        align={["center", "flex-start"]}
        justify="center"
        minH="100vh"
        position="relative"
        zIndex={2}
        px={[4, 10]}
      >
        {/* Avatar */}
    
        <Avatar.Root size="2xl">
          <Avatar.Fallback name={profile.username} />
          <Avatar.Image src={profile.profilePic} />
        </Avatar.Root>

        {/* Info Card */}
        <Box
          bg="rgba(255,255,255,0.85)"
          borderRadius="2xl"
          boxShadow="2xl"
          p={[7, 14]}
          minW={["98%", "320px"]}
          maxW="450px"
          backdropFilter="blur(10px)"
          border="1px solid #f3ae6d"
        >
          <Heading
            as="h2"
            size="xl"
            mb={2}
            fontWeight="extrabold"
            letterSpacing="0.05em"
            color="#f3ae6d"
          >
            {profile.username}
          </Heading>
          <Text color="gray.700" fontSize="lg" mb={5} fontWeight="medium">
            {profile.bio}
          </Text>
          <Button
            colorScheme={
              profile.theme === "coffee" ? "orange" :
              profile.theme === "pizza" ? "orange" :
              profile.theme === "candy" ? "pink" :
              "teal"
            }
            size="lg"
            width="100%"
            borderRadius="xl"
            fontSize={["lg", "xl"]}
            fontWeight="bold"
            boxShadow="lg"
            _hover={{
              bg: "#f3ae6d",
              color: "#fff",
              transform: "scale(1.045)",
              boxShadow: "0 0 20px #f3ae6dbb",
            }}
            mb={2}
          >
            💸 Tip {profile.username}
          </Button>
          <Text fontSize="sm" color="gray.400" mt={3}>
            Wallet: {profile.wallet}
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}
