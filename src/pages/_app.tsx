/**
 * PuffTip App Root Component
 *
 * Sets up the global provider stack:
 * 1. SolanaConfigProvider - Manages wallet connection & blockchain access
 * 2. QueryClientProvider - Manages async data fetching cache
 * 3. Provider - Chakra UI + theme configuration
 * 4. ThemeProvider - Manages custom dark/light aesthetic toggle
 * 5. Layout - Global nav, footer, neo-brutalist background
 *
 * Font imports are loaded globally for the entire app.
 */

import Head from "next/head";
import { Provider } from "@/components/ui/provider";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SolanaConfigProvider } from "@/lib/solanaConfig";
import Layout from "@/components/Layout";
import { ThemeProvider } from "@/components/ThemeProvider";

// Global styles
import "@/styles/globals.css";

// Global font imports - used across all pages
import "@fontsource/space-grotesk/400.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/patrick-hand";
import "@fontsource/fredoka"; // Kept for backwards compatibility
import "@fontsource-variable/inter"; // Studio theme font

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>PuffTip — Solana Tips for Creators</title>
        <meta
          name="description"
          content="The easiest way for creators to receive instant tips in SOL with real-time notifications."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#fdfbf7" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SolanaConfigProvider>
        <QueryClientProvider client={queryClient}>
          <Provider>
            <ThemeProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ThemeProvider>
          </Provider>
        </QueryClientProvider>
      </SolanaConfigProvider>
    </>
  );
}
