import { AppProps } from "next/app"

import "styles/globals.css"
import {useEffect, useState} from "react";
import {ThemeProvider} from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "../ThemeConfig";
import runOneSignal from 'lib/onesignal';
// import useDarkMode from "use-dark-mode";
import NProgress from "nprogress"
import {PT_Sans, PT_Serif} from '@next/font/google'
import React from "react";
import {Router} from "next/router";
import "nprogress/nprogress.css"
import {syncDrupalPreviewRoutes} from "next-drupal";

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

NProgress.configure({ showSpinner: true })

Router.events.on("routeChangeStart", function (path) {
    syncDrupalPreviewRoutes(path)
    NProgress.start()
})
Router.events.on("routeChangeComplete", () => NProgress.done())
Router.events.on("routeChangeError", () => NProgress.done())

export default function App({ Component, pageProps }: AppProps) {
  const [isMounted, setIsMounted] = useState(false)

  // const darkmode = useDarkMode()
  const theme = lightTheme
  // const theme = darkmode.value ? darkTheme : lightTheme

  useEffect(() => {
    runOneSignal();
    setIsMounted(true)

    // @ts-ignore
    // if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined) {
    //   // @ts-ignore
    //   const wb = window.workbox
    //   // add event listeners to handle any of PWA lifecycle event
    //   // https://developers.google.com/web/tools/workbox/reference-docs/latest/module-workbox-window.Workbox#events
    //   wb.addEventListener('installed', event => {
    //     console.log(`Event ${event.type} is triggered.`)
    //     console.log(event)
    //   })
    //
    //   wb.addEventListener('controlling', event => {
    //     console.log(`Event ${event.type} is triggered.`)
    //     console.log(event)
    //   })
    //
    //   wb.addEventListener('activated', event => {
    //     console.log(`Event ${event.type} is triggered.`)
    //     console.log(event)
    //   })
    //
    //   // A common UX pattern for progressive web apps is to show a banner when a service worker has updated and waiting to install.
    //   // NOTE: MUST set skipWaiting to false in next.config.js pwa object
    //   // https://developers.google.com/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users
    //   const promptNewVersionAvailable = event => {
    //     // `event.wasWaitingBeforeRegister` will be false if this is the first time the updated service worker is waiting.
    //     // When `event.wasWaitingBeforeRegister` is true, a previously updated service worker is still waiting.
    //     // You may want to customize the UI prompt accordingly.
    //     if (confirm('Er is een nieuwere versie van deze app beschikbaar, herladen om te updaten?')) {
    //       wb.addEventListener('controlling', event => {
    //         window.location.reload()
    //       })
    //
    //       // Send a message to the waiting service worker, instructing it to activate.
    //       wb.messageSkipWaiting()
    //     } else {
    //       console.log(
    //         'User rejected to reload the web app, keep using old version. New version will be automatically load when user open the app next time.'
    //       )
    //     }
    //   }
    //
    //   wb.addEventListener('waiting', promptNewVersionAvailable)
    //
    //   // ISSUE - this is not working as expected, why?
    //   // I could only make message event listenser work when I manually add this listenser into sw.js file
    //   wb.addEventListener('message', event => {
    //     console.log(`Event ${event.type} is triggered.`)
    //     console.log(event)
    //   })
    //
    //   /*
    //   wb.addEventListener('redundant', event => {
    //     console.log(`Event ${event.type} is triggered.`)
    //     console.log(event)
    //   })
    //   wb.addEventListener('externalinstalled', event => {
    //     console.log(`Event ${event.type} is triggered.`)
    //     console.log(event)
    //   })
    //   wb.addEventListener('externalactivated', event => {
    //     console.log(`Event ${event.type} is triggered.`)
    //     console.log(event)
    //   })
    //   */
    //
    //   // never forget to call register as auto register is turned off in next.config.js
    //   wb.register()
    // }
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
