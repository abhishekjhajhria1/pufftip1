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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SolanaConfigProvider } from '@/lib/solanaConfig';

// Fonts
import "@fontsource/bangers";
import "@fontsource/fredoka";
import "@fontsource/outfit";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
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
export default MyApp;
