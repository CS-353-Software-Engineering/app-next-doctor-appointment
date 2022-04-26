import "../styles/globals.scss";
import "bootstrap/dist/css/bootstrap.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { StateProvider } from "../src/providers/StateProvider";
import { AuthProvider } from "../src/providers/AuthProvider";
import { loadAppConfig } from "../src/config";

import SafeHydrate from "../src/components/core/SafeHydrate";

function MyApp({ Component, pageProps }: AppProps) {
  //Load Configs
  useEffect(() => {
    loadAppConfig();
  }, []);

  return (
    <SafeHydrate>
      <StateProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </StateProvider>
    </SafeHydrate>
  );
}

export default MyApp;
