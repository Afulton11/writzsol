import { useQuery } from '@apollo/client'
import { GET_WEBSITE_BY_LOCATION } from '../../website'

export const useGetWebsiteByLocation = (location) => {
  const { loading, error, data } = useQuery(GET_WEBSITE_BY_LOCATION, {
    variables: { location },
  })

  return {
    loading,
    error,
    websites: data?.getWebsiteByLocation ?? {},
  }
}

export const getWebsiteByLocation = async ({ location, client }) => {
  const result = await client.query({
    query: GET_WEBSITE_BY_LOCATION,
    variables: {
      location,
    },
  })

  const website = result.data.getWebsiteByLocation

  return website
}
