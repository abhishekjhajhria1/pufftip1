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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Provider>
      <Component {...pageProps} />
    </Provider>
    </>
    
  );
}
export default MyApp;
