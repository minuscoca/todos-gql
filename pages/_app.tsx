import { CacheProvider } from '@emotion/react';
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apollo/client'
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, createTheme } from '@mui/material';
import createEmotionCache from '../libs/createEmotionCache';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

export default function App(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const apolloClient = useApollo(pageProps.initialApolloState)

  return (
    <ApolloProvider client={apolloClient}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </ApolloProvider>
  )
}