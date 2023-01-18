import Document, { Html, Head, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
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
