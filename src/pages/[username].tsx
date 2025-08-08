// src/pages/[username].tsx
import { useRouter } from "next/router";
import { Box, VStack, Avatar, Text, Heading, Button } from "@chakra-ui/react";
import CoffeeTheme from "../themes/coffee";
import PizzaTheme from "../themes/pizza";
import CandyTheme from "../themes/candy";
// Add more as you make them

type Profile = {
  theme: string;
  username: string;
  profilePic: string;
  bio: string;
  wallet: string;
};

const mockProfiles: { [key: string]: Profile } = {
  lily: {
    theme: "Coffee",
    username: "lily",
    profilePic: "/avatars/lily.png", // Place a static or placeholder image in public/avatars/
    bio: "Solana dev, coffee lover ☕",
    wallet: "123ABC...",
  },
  mike: {
    theme: "Pizza",
    username: "mike",
    profilePic: "/avatars/mike.png",
    bio: "Building on Web3. Tip me a pizza slice!",
    wallet: "345DEF...",
  },
};

const themeComponents: { [key: string]: React.ReactNode } = {
  Coffee: <CoffeeTheme />,
  Pizza: <PizzaTheme />,
  Candy: <CandyTheme />,
};

export default function ProfilePage() {
  const { query, isReady } = useRouter();
  const username =
    typeof query.username === "string" ? query.username : undefined;

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
    <Box pt={10} minH="100vh" bg="gray.50">
      {/* Main themed area */}
      <Box mb={8}>{themeComponents[profile.theme]}</Box>
      <VStack gap={3} align="center" mb={10}>
        <Avatar.Root size="2xl">
          <Avatar.Fallback name={profile.username} />
          <Avatar.Image src={profile.profilePic} />
        </Avatar.Root>
        <Heading size="lg">{profile.username}</Heading>
        <Text color="gray.600">{profile.bio}</Text>
        {/* This will be replaced with real wallet logic! */}
        <Button colorScheme="teal" size="lg">
          Tip in SOL
        </Button>
      </VStack>
    </Box>
  );
}
