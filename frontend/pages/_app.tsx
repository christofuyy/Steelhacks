import * as React from "react";
import Head from "next/head";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider, EmotionCache } from "@emotion/react";
import theme from "constants/theme";
import createEmotionCache from "util/createEmotionCache";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider
      session={pageProps.session}
    >
      <Component {...pageProps} />
    </SessionProvider>
  )
}
