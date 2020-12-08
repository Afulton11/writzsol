import { useMutation } from '@apollo/client'
import { CREATE_PAGE, GET_PAGES } from '../../page'

export const useCreatePage = ({ path, location }) => {
  const [createPageMutation, { error, loading, data }] = useMutation(
    CREATE_PAGE,
    {
      variables: {
        path,
        location,
      },
      update: (cache, { data }) => {
        const cachedData = cache.readQuery({
          query: GET_PAGES,
          variables: { location },
        })

        const newPage = data.createPage

        cache.writeQuery({
          query: GET_PAGES,
          variables: { location },
          data: {
            ...cachedData,
            getPages: [newPage, ...cachedData.getPages],
          },
        })
      },
    }
  )

  const createPage = async () => {
    const { errors, data } = await createPageMutation({
      variables: {
        path,
        location,
      },
    })

    return {
      errors,
      createdPage: data?.createPage,
    }
  }

  return {
    createPage,
    loading,
    error,
    createdPage: data?.createPage,
  }
}
