import { useMutation, useQuery } from '@apollo/client'
import { SAVE_WEBSITE } from '../../website'

export const useSaveWebsite = () => {
  const [saveWebsiteMutation, mutationState] = useMutation(SAVE_WEBSITE)

  const saveWebsite = async (website) => {
    const { errors, data } = await saveWebsiteMutation({
      variables: website,
    })

    return {
      errors,
      website: data?.savePage,
    }
  }

  return [saveWebsite, mutationState]
}
