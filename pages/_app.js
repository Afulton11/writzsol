import { Provider as AuthProvider } from 'next-auth/client'
import { ThemeProvider, CSSReset } from '@chakra-ui/core'
import { Global, css } from '@emotion/core'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../lib/graphql/apollo-client'
import Head from 'next/head'
import theme from '../utils/theme'

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
)

function WritzsolApp({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps)

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
            <ApolloProvider client={apolloClient}>
              <Component {...pageProps} />
            </ApolloProvider>
          </AuthProvider>
        </GlobalStyle>
      </ThemeProvider>
    </>
  )
}

export default WritzsolApp
