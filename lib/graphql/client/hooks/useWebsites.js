import { useQuery } from '@apollo/react-hooks'
import { GET_WEBSITES } from '../website'

export const useWebsites = () => {
  const { loading, error, data } = useQuery(GET_WEBSITES)

  return {
    loading,
    error,
    websites: data?.websites ?? [],
  }
}
