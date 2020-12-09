import { useMutation } from '@apollo/client'
import { CREATE_PAGE, GET_PAGES } from '../../page'

export const useCreatePage = () => {
  const [createPageMutation, mutationState] = useMutation(CREATE_PAGE)

  const createPage = async ({ path, location }) => {
    const { errors, data } = await createPageMutation({
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
    })

    return {
      errors,
      createdPage: data?.createPage,
    }
  }

  return {
    createPage,
    mutationState,
  }
}
