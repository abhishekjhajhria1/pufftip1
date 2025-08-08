// src/pages/register.tsx

import { useState } from "react";
import { Box, VStack, Button, Heading } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { px } from "framer-motion";

// Dynamically import your Framer Motion visual themes
const CoffeeScene = dynamic(() => import("../themes/themeVisuals/coffee"), { ssr: false });
const CandyScene = dynamic(() => import("../themes/themeVisuals/candy"), { ssr: false });
const PizzaScene = dynamic(() => import("../themes/themeVisuals/pizza"), { ssr: false });
const CigaretteScene = dynamic(() => import("../themes/themeVisuals/cigarette"), { ssr: false });

// Add more as you build

const THEMES = [
  {
    key: "coffee",
    label: "Coffeehouse",
    visual: <CoffeeScene />,
    colorScheme: "orange"
  },
  {
    key: "candy",
    label: "Candy Pop",
    visual: <CandyScene />,
    colorScheme: "pink"
  },
  {
    key: "pizza",
    label: "Pizzeria",
    visual: <PizzaScene />,
    colorScheme: "orange"
  },
  {
    key: "cigarette",
    label: "Cigarette Lounge",
    visual: <CigaretteScene />,
    colorScheme: "brown"
  }
  // Add more as you wish
];

export default function Register() {
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const chosen = THEMES.find(t => t.key === e.target.value);
    setSelectedTheme(chosen || THEMES[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setUsername("");
    setEmail("");
    setTimeout(() => setSuccess(false), 2500);
  };

  return (
    <Box minH="100vh" position="relative" overflow="hidden">
      {/* Render only the selected animated scene/background */}
      <Box position="absolute" inset={0} zIndex={0}>
        {selectedTheme.visual}
      </Box>

      {/* Centered card */}
      <Box
        position="relative"
        zIndex={3}
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <VStack
          gap={7}
          maxW="md"
          width="100%"
          boxShadow="2xl"
          opacity={0.95}
          borderRadius="2xl"
          border="2px"
          px={[6, 12]}
          py={[7, 10]}
        >
          <Heading fontSize="2xl" fontWeight="bold" textAlign="center" mb={2}>
            Create Your Tipping Profile
          </Heading>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <VStack gap={5} width="100%">
              {/* Username */}
              <label style={{ width: "100%", fontWeight: "bold" }}>
                Username*
                <input
                  required
                  placeholder="Choose a username"
                  style={{
                    width: "100%",
                    marginTop: 4,
                    padding: "12px 10px",
                    borderRadius: 8,
                    border: "1px solid #bbb",
                    fontSize: "1rem",
                  }}
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </label>
              {/* Email */}
              <label style={{ width: "100%", fontWeight: "bold" }}>
                Email (optional)
                <input
                  type="email"
                  placeholder="you@email.com"
                  style={{
                    width: "100%",
                    marginTop: 4,
                    padding: "12px 10px",
                    borderRadius: 8,
                    border: "1px solid #bbb",
                    fontSize: "1rem",
                  }}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </label>
              {/* Theme selection */}
              <label style={{ width: "100%", fontWeight: "bold" }}>
                Theme*
                <select
                  required
                  style={{
                    width: "100%",
                    marginTop: 4,
                    padding: "12px 10px",
                    borderRadius: 8,
                    border: "1px solid #bbb",
                    fontSize: "1rem",
                  }}
                  value={selectedTheme.key}
                  onChange={handleThemeChange}
                >
                  {THEMES.map(t => (
                    <option value={t.key} key={t.key}>{t.label}</option>
                  ))}
                </select>
              </label>
              {/* Submit button */}
              <Button
                type="submit"
                colorScheme={selectedTheme.colorScheme}
                fontWeight="bold"
                borderRadius="xl"
                fontSize="lg"
                width="100%"
                py={6}
                _hover={{
                  transform: "scale(1.04)",
                  boxShadow: "xl",
                }}
              >
                Register
              </Button>
            </VStack>
          </form>
          {/* Success message */}
          {success && (
            <Box color="green.600" fontWeight="bold" textAlign="center" mt={1}>
              🎉 Registration successful!
            </Box>
          )}
        </VStack>
      </Box>
    </Box>
  );
}
