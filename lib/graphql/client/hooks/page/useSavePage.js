import { useMutation, useQuery } from '@apollo/client'
import { SAVE_PAGE } from '../../page'

export const useSavePage = () => {
  const [savePageMutation, mutationState] = useMutation(SAVE_PAGE)

  const savePage = async (page) => {
    const { errors, data } = await savePageMutation({
      variables: { page },
    })

    return {
      savedPage: data?.savePage,
      errors,
    }
  }

  return [savePage, mutationState]
}
