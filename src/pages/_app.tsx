import { ChakraProvider } from '@chakra-ui/react'
import { SessionProvider } from "next-auth/react"
import theme from '../theme'
import { AppProps } from 'next/app'
import { Layout } from '../components/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider
      // Provider options are not required but can be useful in situations where
      // you have a short session maxAge time. Shown here with default values.
      session={pageProps.session}
    >
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>

      </ChakraProvider>
    </SessionProvider>
  )
}

export default MyApp
