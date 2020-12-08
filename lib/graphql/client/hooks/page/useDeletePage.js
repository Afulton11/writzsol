import { useMutation, useQuery } from '@apollo/client'
import { DELETE_PAGE, GET_PAGES } from '../../page'

export const useDeletePage = ({ path, location }) => {
  const [deletePageMutation, { error, loading, data }] = useMutation(
    DELETE_PAGE,
    {
      variables: {
        path,
        location,
      },
      update: (cache, { data: deletePage }) => {},
    }
  )

  const deletePage = async () => {
    const { errors, data } = await deletePageMutation({
      variables: {
        path,
        location,
      },
    })
    return {
      errors,
      deletedPage: data?.deletePage,
    }
  }

  return {
    deletePage,
    loading,
    error,
    deletedPage: data?.deletePage,
  }
}
