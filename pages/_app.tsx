import { AppCacheProvider } from '@mui/material-nextjs/v13-pagesRouter'; // or `v14-pages` if you are using Next.js v14
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apollo/client'
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, createTheme } from '@mui/material';

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState)

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ApolloProvider client={apolloClient}>
      <AppCacheProvider {...pageProps}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </AppCacheProvider>
    </ApolloProvider>
  )
}
