import { AppProps } from "next/app"

import "styles/globals.css"
import {useEffect, useState} from "react";
import {ThemeProvider} from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "../ThemeConfig";
// import useDarkMode from "use-dark-mode";
import { PT_Sans } from '@next/font/google'

const font = PT_Sans({
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
          --iv-display: ${ font.style.fontFamily }
        }
        
        html{
          font-family: ${ font.style.fontFamily }
        }
      `}</style>
      <GlobalStyles />
      {isMounted && <Component {...pageProps} />}
    </ThemeProvider>
  )
}
