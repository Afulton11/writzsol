import { useQuery } from '@apollo/client'
import { GET_WEBSITES } from '../../website'

export const useWebsites = () => {
  const { loading, error, data } = useQuery(GET_WEBSITES)

  return {
    loading,
    error,
    websites: data?.websites ?? [],
  }
}
