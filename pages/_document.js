import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import OneSignal from 'react-onesignal';

const settings = {
  app_name: 'RSM Wealerronde',
  app_description: 'RSM Wealerronde PWA App',
  app_theme: "ED1C24",
  app_domain: 'https://rsmwealerronde.nl'
}

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta name="application-name" content={settings.app_name} />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="default" />
          <meta name="apple-mobile-web-app-title" content="RSM Wealerronde" />
          <meta name="description" content={settings.app_description} />
          <meta name="format-detection" content="telephone=no" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content={settings.app_theme} />
          <meta name="msapplication-config" content="/icons/browserconfig.xml" />
          <meta name="msapplication-TileColor" content="#2B5797" />
          <meta name="msapplication-tap-highlight" content="no" />

          <link rel="manifest" href="/manifest.webmanifest" />
          <link rel="shortcut icon" href="/favicon.ico" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:url" content={settings.app_domain} />
          <meta name="twitter:title" content={settings.app_name} />
          <meta name="twitter:description" content={settings.app_description} />
          <meta name="twitter:image" content="https://yourdomain.com/icons/android-chrome-192x192.png" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={settings.app_name} />
          <meta property="og:description" content={settings.app_description} />
          <meta property="og:site_name" content={settings.app_name} />
          <meta property="og:url" content={settings.app_domain} />
          <meta property="og:image" content="https://yourdomain.com/icons/apple-touch-icon.png" />
        </Head>
        <body>
          <script dangerouslySetInnerHTML={{ __html: `(function() {storageKey = 'darkMode';var classNameDark = 'dark-mode';var classNameLight = 'light-mode';function setClassOnDocumentBody(darkMode) {document.body.classList.add(darkMode ? classNameDark : classNameLight);document.body.classList.remove(darkMode ? classNameLight : classNameDark);}var preferDarkQuery = '(prefers-color-scheme: dark)';var mql = window.matchMedia(preferDarkQuery);var supportsColorSchemeQuery = mql.media === preferDarkQuery;var localStorageTheme = null;try {localStorageTheme = localStorage.getItem(storageKey);} catch (err) {}var localStorageExists = localStorageTheme !== null;if (localStorageExists) {localStorageTheme = JSON.parse(localStorageTheme);}if (localStorageExists) { setClassOnDocumentBody(localStorageTheme);} else if (supportsColorSchemeQuery) { setClassOnDocumentBody(mql.matches); localStorage.setItem(storageKey, mql.matches);} else { var isDarkMode = document.body.classList.contains(classNameDark); localStorage.setItem(storageKey, JSON.stringify(isDarkMode));}})();` }}>
          </script>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }

  static async getInitialProps(ctx)
  {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }
}
