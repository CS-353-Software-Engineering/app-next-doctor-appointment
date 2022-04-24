import "../styles/globals.scss";
import "bootstrap/dist/css/bootstrap.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { APPLICATION_NAME } from "../src/constants";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{APPLICATION_NAME}</title>
        <link rel="icon" href="/doctor.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
