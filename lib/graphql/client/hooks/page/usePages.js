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
