import { useMutation, useQuery } from '@apollo/client'
import { SAVE_PAGE, GET_PAGES } from '../../page'

export const usePages = ({ location }) => {
  const [] = useMutation(SAVE_PAGE, {
    variables: { location },
  })

  return {
    loading,
    error,
    page: data?.getPage,
  }
}
