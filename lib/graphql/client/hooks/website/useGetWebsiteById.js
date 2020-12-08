import { useQuery } from '@apollo/client'
import { GET_WEBSITE_BY_ID } from '../../website'

export const useGetWebsiteById = (id) => {
  const { loading, error, data } = useQuery(GET_WEBSITE_BY_ID, {
    variables: { id },
  })

  return {
    loading,
    error,
    websites: data?.getWebsiteById ?? {},
  }
}

export const getWebsiteById = async ({ id, client }) => {
  const result = await client.query({
    query: GET_WEBSITE_BY_ID,
    variables: {
      id,
    },
  })

  const website = result?.data?.getWebsiteById

  return website
}
