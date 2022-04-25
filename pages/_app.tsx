import "../styles/globals.scss";
import "bootstrap/dist/css/bootstrap.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { AppConfig } from "../src/config";
import { StateProvider } from "../src/providers/StateProvider";
import { AuthProvider } from "../src/providers/AuthProvider";

function MyApp({ Component, pageProps }: AppProps) {
  //Load Configs
  useEffect(() => {
    AppConfig.shared.load();
  }, []);

  return (
    // <>
    //   <Head>
    //     <title>{APPLICATION_NAME}</title>
    //     <link rel="icon" href="/doctor.png" />
    //   </Head>
    //   <Component {...pageProps} />
    // </>

    <StateProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </StateProvider>
  );
}

export default MyApp;
