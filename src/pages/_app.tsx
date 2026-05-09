/**
 * PuffTip App Root Component
 *
 * Sets up the global provider stack:
 * 1. SolanaConfigProvider - Manages wallet connection & blockchain access
 * 2. QueryClientProvider - Manages async data fetching cache
 * 3. Provider - Chakra UI + theme configuration
 * 4. Layout - Global nav, footer, animated background
 *
 * Font imports are loaded globally for the entire app.
 */

import Head from "next/head";
import { Provider } from "@/components/ui/provider";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SolanaConfigProvider } from "@/lib/solanaConfig";
import Layout from "@/components/Layout";

// Global styles (dark theme, glassmorphism, scrollbar, wallet overrides)
import "@/styles/globals.css";

// Global font imports - used across all pages
import "@fontsource/bangers";
import "@fontsource/fredoka";
import "@fontsource/outfit";

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
        <meta name="theme-color" content="#0a0015" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SolanaConfigProvider>
        <QueryClientProvider client={queryClient}>
          <Provider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Provider>
        </QueryClientProvider>
      </SolanaConfigProvider>
    </>
  );
}
