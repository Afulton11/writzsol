import { useMutation, useQuery } from '@apollo/client'
import { GET_WEBSITE_BY_ID, SAVE_WEBSITE } from '../../website'

export const useSaveWebsite = () => {
  const [saveWebsiteMutation, mutationState] = useMutation(SAVE_WEBSITE)

  const saveWebsite = async (website) => {
    const { errors, data } = await saveWebsiteMutation({
      variables: { website },
      update: (cache, { data: { saveWebsite } }) => {
        const cachedData = cache.readQuery({
          query: GET_WEBSITE_BY_ID,
        })

        // const cachedWebsites = cachedData.websites
        debugger
        // const doesWebsiteExist = cachedData.websites.
        // if ()
        // const existingWebsite = cachedData.websites
      },
    })

    return {
      errors,
      website: data?.savePage,
    }
  }

  return [saveWebsite, mutationState]
}
