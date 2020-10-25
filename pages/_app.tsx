import Head from 'next/head';
import theme from '../styles/theme';

import { AppProps } from 'next/dist/next-server/lib/router/router';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { Global, css } from '@emotion/core';
import { Provider as AuthProvider } from 'next-auth/client';

const GlobalStyle = ({ children }) => (
  <>
    <CSSReset />
    <Global
      styles={css`
        ::selection {
          background-color: #ff9cf9;
          color: #fefefe;
        }
        html {
          min-width: 360px;
          scroll-behavior: smooth;
        }
        #__next {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          background: white;
        }
      `}
    />
    {children}
  </>
);

function WritzsolApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Writzsol</title>
        <meta
          key="viewport"
          name="viewport"
          content="initial-scale=1.0, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        <GlobalStyle>
          <AuthProvider session={pageProps.session}>
            <Component {...pageProps} />
          </AuthProvider>
        </GlobalStyle>
      </ThemeProvider>
    </>
  );
}

export default WritzsolApp;
