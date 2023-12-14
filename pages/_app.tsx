import { AppCacheProvider } from '@mui/material-nextjs/v13-pagesRouter'; // or `v14-pages` if you are using Next.js v14
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apollo/client'

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <AppCacheProvider {...pageProps}>
        <Component {...pageProps} />
      </AppCacheProvider>
    </ApolloProvider>
  )
}
