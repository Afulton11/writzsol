import { useQuery } from '@apollo/client'
import { GET_PAGES } from '../../page'

export const usePages = ({ location }) => {
  const { loading, error, data } = useQuery(GET_PAGES, {
    variables: {
      location,
    },
  })

  return {
    loading,
    error,
    pages: data?.getPages ?? [],
  }
}

export const getPages = async ({ location, client }) => {
  const result = await client.query({
    query: GET_PAGES,
    variables: { location },
  })

  return result?.data?.getPages ?? []
}
