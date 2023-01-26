import { AppProps } from "next/app"

import "styles/globals.css"
import {useEffect, useState} from "react";
import {ThemeProvider} from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "../ThemeConfig";
// import useDarkMode from "use-dark-mode";
import {PT_Sans, PT_Serif} from '@next/font/google'
import React from "react";

const pt_sans = PT_Sans({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

const pt_serif = PT_Serif({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})
export default function App({ Component, pageProps }: AppProps) {
  const [isMounted, setIsMounted] = useState(false)

  // const darkmode = useDarkMode()
  const theme = lightTheme
  // const theme = darkmode.value ? darkTheme : lightTheme

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <style jsx global>{`
        :root{
          --iv-pt-sans-font: ${ pt_sans.style.fontFamily };
          --iv-pt-serif-font: ${ pt_serif.style.fontFamily };
        }
      `}</style>
      <GlobalStyles />
      <React.StrictMode>
      {isMounted && <Component {...pageProps} />}
      </React.StrictMode>
    </ThemeProvider>
  )
}
