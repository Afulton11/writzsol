import React, { useState } from 'react'
import DefaultErrorPage from 'next/error'
import {
  useToast,
  Heading,
  Text,
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Divider,
  FormHelperText,
} from '@chakra-ui/core'
import { useForm } from 'react-hook-form'
import StandardLayout from '../../components/layouts/standard-layout'
import { initializeApollo } from '../../lib/graphql/apollo-client'
import {
  getPages,
  getWebsiteById,
  useSaveWebsite,
} from '../../lib/graphql/client/hooks'
import { PageCard, WebsiteCard, CreatePageModal } from '../../components'
import { removeEqualProperties } from '../../utils'

export async function getServerSideProps({ params, req }) {
  const apolloClient = initializeApollo({ cookie: req?.headers?.cookie })
  const { websiteId } = params

  try {
    const website = await getWebsiteById({
      id: websiteId,
      client: apolloClient,
    })

    if (!website) return { notFound: true }

    const pages = await getPages({
      location: website.location,
      client: apolloClient,
    })

    return {
      props: {
        website,
        pages,
      },
    }
  } catch (error) {
    console.error(error)
    return {
      props: {
        website: {},
        pages: [],
        error: true,
      },
    }
  }
}

export default function Home({ website: storedWebsite, pages, error }) {
  const toast = useToast()
  const [website, setWebsite] = useState(storedWebsite)
  const [saveWebsite, { loading: isSaving }] = useSaveWebsite()
  const { handleSubmit, register, errors } = useForm({
    defaultValues: {
      ...website,
    },
  })

  if (error) {
    toast({
      description:
        "An error occurred loading this website's dashboard. Please try again later.",
      duration: 9000,
      status: 'error',
      isClosable: true,
    })

    return <DefaultErrorPage statusCode={500} />
  }

  const onSaveChanges = async (websiteData) => {
    const deDupedWebsiteData = removeEqualProperties(websiteData, website)
    const { errors } = await saveWebsite({
      id: website.id,
      ...deDupedWebsiteData,
    })

    if (errors) {
      toast({
        title: 'Something went wrong.',
        description: 'Are you logged in? We had trouble saving your changes.',
        status: 'error',
        duration: 8000,
        isClosable: true,
      })
    } else {
      setWebsite({
        ...website,
        ...deDupedWebsiteData,
      })

      toast({
        title: 'Successfully saved changes.',
        description: 'Your site will reflect the cahnges soon.',
        status: 'success',
        duration: 8000,
        isClosable: true,
      })
    }
  }

  return (
    <StandardLayout>
      <Box w="100%">
        <Heading>Website</Heading>
        <Divider />
        <Box w="100%" d="flex">
          <Box flex={1}>
            <form onSubmit={handleSubmit(onSaveChanges)}>
              <FormControl isInvalid={errors.title && errors.title.message}>
                <FormLabel>Title</FormLabel>
                <Input
                  name="title"
                  ref={register({
                    maxLength: 60,
                    required: 'Please type a website title',
                  })}
                  placeholder={'Title'}
                />
                <FormErrorMessage>
                  {errors.title && errors.title.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                mt={4}
                isInvalid={errors.location && errors.location.message}
              >
                <FormLabel>Location</FormLabel>
                <Input
                  name="location"
                  aria-describedby="location-helper-text"
                  ref={register({
                    maxLength: 120,
                    required: 'Please enter a site location.',
                  })}
                  placeholder="Location"
                />
                <FormHelperText id="location-helper-text">
                  {'The location represents the path of the website at '}
                  <i>
                    <strong>{'https://www.writzsol.com/user'}</strong>
                  </i>
                  {'. For example to set the ' +
                    'location of my site to "https://www.writzsol.com/user/play/test"' +
                    ', The location represents the path of the url, e.g. '}
                  <strong>{'"play/test"'}</strong>
                </FormHelperText>
                <FormErrorMessage>
                  {errors.location && errors.location.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                mt={4}
                isInvalid={errors.defaultTheme && errors.defaultTheme.message}
              >
                <FormLabel>Default Theme</FormLabel>
                <Input
                  name="defaultTheme"
                  ref={register({
                    required: 'Please type a default theme.',
                  })}
                  placeholder="light"
                />
                <FormErrorMessage>
                  {errors.defaultTheme && errors.defaultTheme.message}
                </FormErrorMessage>
              </FormControl>
              <Box pt={4}>
                <Button
                  type="submit"
                  leftIcon="edit"
                  variantColor="green"
                  isLoading={isSaving}
                  loadingText="Saving..."
                >
                  Save Changes
                </Button>
              </Box>
            </form>
          </Box>
          <Box flex={1} pl={8}>
            <WebsiteCard website={website} showEdit={false} />
          </Box>
        </Box>

        <Heading mt={8}>Pages</Heading>
        <Divider />
        <Box>
          <CreatePageModal disabled={isSaving} websiteId={website.id} />
        </Box>
        {pages.length > 0 ? (
          pages.map((page) => <PageCard location={location} page={page} />)
        ) : (
          <Text p={4}>{`No pages exist.`}</Text>
        )}
      </Box>
    </StandardLayout>
  )
}
