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

export const getPage = ({ path, location }) => {
  const { data, loading, error } = useQuery(GET_PAGE, {
    variables: {
      path,
      location,
    },
  })

  return {
    page: data?.getPage,
    loading,
    error,
  }
}
