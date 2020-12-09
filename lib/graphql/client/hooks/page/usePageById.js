import { useQuery } from '@apollo/client'
import { GET_PAGE_BY_ID } from '../../page'

export const usePageById = ({ id }) => {
  const { loading, error, data } = useQuery(GET_PAGE_BY_ID, {
    variables: {
      id,
    },
  })

  return {
    loading,
    error,
    page: data?.getPageById,
  }
}

export const getPageById = async ({ id, client }) => {
  const result = await client.query({
    query: GET_PAGE_BY_ID,
    variables: {
      id,
    },
  })

  return result?.data?.getPageById
}
