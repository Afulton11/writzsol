import { useMutation } from '@apollo/client'
import { CREATE_PAGE, GET_PAGES } from '../../page'

export const useCreatePage = () => {
  const [createPageMutation, mutationState] = useMutation(CREATE_PAGE)

  const createPage = async (page) => {
    const { errors, data } = await createPageMutation({
      variables: {
        page,
      },
      update: (cache, { data: { createPage } }) => {
        const variables = {
          location: createPage.website.location,
        }

        const cachedData = cache.readQuery({
          query: GET_PAGES,
          variables,
        })

        cache.writeQuery({
          query: GET_PAGES,
          variables,
          data: {
            ...cachedData,
            getPages: [...(cachedData?.getPages ?? []), createPage],
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
