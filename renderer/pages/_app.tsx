import React, { useEffect } from "react";
import { AppProps } from "next/app";
import debug from "debug";

global.debug = debug;

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    global.debug.enable(global.env.LOG || "");
  }, []);

  return <Component {...pageProps} />;
}
