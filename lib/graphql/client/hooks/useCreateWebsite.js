import { useMutation } from '@apollo/react-hooks'
import { CREATE_WEBSITE, GET_WEBSITES } from '../website'

export const useCreateWebsite = (website) => {
  const [createWebsiteMutation, { error, loading }] = useMutation(
    CREATE_WEBSITE,
    {
      variables: {
        website,
      },
      update: (cache, { data }) => {
        const cachedData = cache.readQuery({
          query: GET_WEBSITES,
        })

        const newWebsite = data.createWebsite

        cache.writeQuery({
          query: GET_WEBSITES,
          data: {
            ...cachedData,
            websites: [newWebsite, ...cachedData.websites],
          },
        })
      },
    }
  )

  const createWebsite = async ({ title, location, defaultTheme, status }) => {
    const { errors, data } = await createWebsiteMutation({
      variables: {
        website: {
          title,
          location,
          defaultTheme,
          status,
        },
      },
    })

    return {
      errors,
      createdWebsite: data?.createWebsite,
    }
  }

  return {
    createWebsite,
    error,
    loading,
  }
}