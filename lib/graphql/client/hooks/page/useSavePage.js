import { useMutation, useQuery } from '@apollo/client'
import { SAVE_PAGE } from '../../page'

export const useSavePage = ({ location }) => {
  const [] = useMutation(SAVE_PAGE, {
    variables: { location },
  })

  return {
    loading,
    error,
    page: data?.getPage,
  }
}
