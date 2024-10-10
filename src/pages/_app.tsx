// pages/_app.tsx
import "../app/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen w-full p-0 m-0 ">
          <Component {...pageProps} />
      </div>
    </QueryClientProvider>
  );
}

export default MyApp;
