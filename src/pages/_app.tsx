// import { Provider } from "@/components/ui/provider"

// import type { AppProps } from "next/app";

// function MyApp({ Component, pageProps }: AppProps) {
//   return (
//     <Provider>
//       <Component {...pageProps} />
//     </Provider>
//   );
// }
// export default MyApp;


import { Provider } from "@/components/ui/provider"
import type { AppProps } from "next/app";
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { config } from '@/config/wagmi';
import '@rainbow-me/rainbowkit/styles.css';

// Fonts
import "@fontsource/bangers";
import "@fontsource/fredoka";
import "@fontsource/outfit";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Provider>
            <Component {...pageProps} />
          </Provider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
export default MyApp;
