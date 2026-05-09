/**
 * PuffTip App Root Component
 *
 * Sets up the global provider stack:
 * 1. SolanaConfigProvider - Manages wallet connection & blockchain access
 * 2. QueryClientProvider - Manages async data fetching cache
 * 3. Provider - Chakra UI + theme configuration
 *
 * Font imports are loaded globally for the entire app.
 */

import { Provider } from "@/components/ui/provider"
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SolanaConfigProvider } from '@/lib/solanaConfig';

// Global font imports - used across all pages
import "@fontsource/bangers";
import "@fontsource/fredoka";
import "@fontsource/outfit";

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SolanaConfigProvider>
      <QueryClientProvider client={queryClient}>
        <Provider>
          <Component {...pageProps} />
        </Provider>
      </QueryClientProvider>
    </SolanaConfigProvider>
  );
}
