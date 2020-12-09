import { useMemo } from 'react'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { Constants } from '../../utils'

let apolloClient

function createApolloClient(cookie) {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphLink(cookie),
    cache: new InMemoryCache(),
  })
}

export function initializeApollo(
  { initialState = null, cookie = '' } = { initialState: null, cookie: '' }
) {
  const _apolloClient = apolloClient ?? createApolloClient(cookie)

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState })
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient
  return _apolloClient
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState])
  return store
}

function createIsomorphLink(cookie) {
  const fetchWithCookie = (url, init) => {
    return fetch(url, {
      ...init,
      headers: {
        ...init.headers,
        Cookie: cookie,
      },
    }).then((response) => response)
  }

  return new HttpLink({
    uri: `${Constants.BASE_URL}/api/gql`,
    credentials: 'same-origin',
    fetch: fetchWithCookie,
  })
}
