import { useQuery } from '@apollo/client'
import { GET_PAGE } from '../../page'

export const usePage = ({ path, location }) => {
  const { loading, error, data } = useQuery(GET_PAGE, {
    variables: {
      path,
      location,
    },
  })

  return {
    loading,
    error,
    page: data?.getPage,
  }
}

export const getPage = async ({ path, location, client }) => {
  const { data, errors, error } = await client.query({
    query: GET_PAGE,
    variables: {
      path,
      location,
    },
  })

  return {
    page: data?.getPage,
    errors:
      error || errors
        ? {
            graphql: errors,
            error,
          }
        : undefined,
  }
}
