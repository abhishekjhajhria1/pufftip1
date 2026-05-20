/**
 * FAQ & Help Page
 */
import { Box, VStack, Heading, Text, Container, HStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { motion } from "framer-motion";
import Head from "next/head";

const M = motion(Box);

const FAQ_SECTIONS = [
  {
    title: "Getting Started",
    items: [
      { q: "What is PuffTip?", a: "PuffTip is a Solana-powered tipping platform for creators and streamers. Supporters can send tips in SOL that arrive in your wallet instantly — no middlemen, no holding periods. You get a custom creator page, real-time OBS overlay, donor leaderboard, and tip wall." },
      { q: "Do I need a Solana wallet?", a: "Yes. Both creators and tippers need a Solana wallet. We support all major Solana wallets including Phantom, Solflare, and Backpack. If you don't have one, Phantom is the easiest to set up — just install the browser extension and create an account." },
      { q: "How do I register?", a: "Click 'Create Your Page', connect your Solana wallet, and fill in a username, display name, and bio. That's it — your custom tip page is live immediately at pufftip.com/u/yourname." },
      { q: "Is PuffTip free to use?", a: "Yes! There's no subscription or setup fee. PuffTip takes a small 2% platform fee on each tip. 98% of every tip goes directly to the creator's wallet." },
    ],
  },
  {
    title: "Fees & Payments",
    items: [
      { q: "What fees does PuffTip charge?", a: "PuffTip charges a 2% platform fee on each tip. For example, if someone tips 1 SOL, you receive 0.98 SOL. The Solana network fee is less than $0.001 per transaction — essentially free." },
      { q: "How fast are payments?", a: "Instant. Every tip is a direct Solana transaction that settles in under 1 second. There's no holding period, no minimum payout, and no withdrawal process. SOL goes straight to your wallet." },
      { q: "How does PuffTip compare to other platforms?", a: "Traditional tipping platforms (like Streamlabs, Ko-fi) take 30-50% in fees and hold your money for 7-30 days. Ethereum-based tips have $2-50+ gas fees. PuffTip: 2% fee, <1 second settlement, <$0.001 per transaction." },
    ],
  },
  {
    title: "OBS & Streaming",
    items: [
      { q: "How do I set up OBS alerts?", a: "After registering, copy your overlay URL (pufftip.com/embed/yourusername). In OBS Studio, add a new Browser Source, paste the URL, set width to 800 and height to 600. That's it — tips will show up on stream with animations and sound." },
      { q: "Can I customize the notifications?", a: "Yes! You have 4 notification modes (Toast, Banner, Slide-in, Modal), 5 content styles (Simple, Rich, Confetti, Coin, All), 5 sound alerts, volume control, stacking modes, and duration tiers. Access all settings from the notification icon on your creator page." },
      { q: "Does the overlay work with Streamlabs OBS?", a: "Yes, the overlay works with any streaming software that supports Browser Sources, including OBS Studio, Streamlabs Desktop, and XSplit." },
    ],
  },
  {
    title: "Customization",
    items: [
      { q: "What are the two themes?", a: "Notebook: warm paper backgrounds, hand-drawn fonts (Patrick Hand), washi tape decorations, sticky notes, doodle rotations. Studio: sleek dark mode, glassmorphism, Solana gradient accents, clean Inter font. Switch anytime." },
      { q: "What notification modes are available?", a: "Toast (compact corner pop-up), Banner (full-width top alert), Slide-in (right-edge slide), and Modal (center-screen takeover). You can enable one or multiple modes simultaneously." },
      { q: "What are stacking modes?", a: "Stack: multiple tips pile up on screen simultaneously. Replace: new tips instantly replace old ones. Queue: tips line up and display one by one. Choose based on your stream style." },
      { q: "Can I set different durations for different tip amounts?", a: "Yes! Duration tiers let you set display times based on tip amount. For example: tips over 50 SOL stay for 10 seconds, over 10 SOL for 7 seconds, etc. Fully customizable." },
    ],
  },
  {
    title: "Technical & Security",
    items: [
      { q: "Is this on mainnet?", a: "Currently PuffTip runs on Solana Devnet — no real money is involved. We'll announce when we migrate to mainnet." },
      { q: "Is my wallet safe?", a: "PuffTip never has access to your wallet's private keys. We use standard Solana wallet adapters for signing transactions. Tips are direct peer-to-peer transactions on the Solana blockchain." },
      { q: "How does real-time delivery work?", a: "We use WebSocket connections between your tip page, the OBS overlay, and our server. When a tip transaction is confirmed on Solana, it's pushed to all connected clients simultaneously — zero polling, zero delay." },
    ],
  },
];

export default function FAQPage() {
  const router = useRouter();
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (key: string) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <>
      <Head>
        <title>FAQ & Help — PuffTip</title>
        <meta name="description" content="Frequently asked questions about PuffTip — setup, fees, OBS integration, customization, and security." />
      </Head>

      {/* HERO */}
      <Container maxW="container.lg" py={{ base: "3rem", md: "5rem" }}>
        <VStack gap={4} textAlign="center" maxW="600px" mx="auto">

          <M initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Heading as="h1" fontSize={{ base: "3xl", md: "5xl" }} fontFamily="heading" color="brand.ink">
              Frequently asked <Box as="span" className="gradient-text">questions</Box>
            </Heading>
          </M>
          <M initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <Text fontSize="md" color="brand.inkSoft" fontFamily="body" lineHeight="1.7">
              Everything you need to know about PuffTip — from setup to customization to payments.
            </Text>
          </M>
        </VStack>
      </Container>

      {/* FAQ SECTIONS */}
      <Container maxW="container.md" py={4} pb="var(--section-py)">
        <VStack gap={10} align="stretch">
          {FAQ_SECTIONS.map((section, si) => (
            <M key={section.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.06 * si }}>
              <Heading as="h3" fontSize="md" fontFamily="heading" color="brand.ink" mb={4}>{section.title}</Heading>
              <VStack gap={2} align="stretch">
                {section.items.map((item, ii) => {
                  const key = `${si}-${ii}`;
                  const isOpen = openItems.has(key);
                  return (
                    <Box key={key} className={`faq-item ${isOpen ? "open" : ""}`}>
                      <button className="faq-trigger" onClick={() => toggleItem(key)}>
                        <span>{item.q}</span>
                        <span className="faq-icon">+</span>
                      </button>
                      <Box className="faq-body">
                        <Box className="faq-body-inner">{item.a}</Box>
                      </Box>
                    </Box>
                  );
                })}
              </VStack>
            </M>
          ))}
        </VStack>
      </Container>

      {/* CTA */}
      <Box className="cta-section" py="var(--section-py)">
        <Container maxW="container.md" textAlign="center">
          <Heading as="h2" fontSize={{ base: "xl", md: "3xl" }} fontFamily="heading" color="brand.ink" mb={4}>
            Still have questions?
          </Heading>
          <Text fontFamily="body" fontSize="md" color="brand.inkSoft" mb={8}>
            Jump in and try it. PuffTip is free — no risk, no commitment.
          </Text>
          <HStack gap={3} justifyContent="center" flexWrap="wrap">
            <button className="premium-btn primary" onClick={() => router.push("/register")}>Create Your Page →</button>
            <button className="premium-btn secondary" onClick={() => router.push("/features")}>Explore Features</button>
          </HStack>
        </Container>
      </Box>
    </>
  );
}
