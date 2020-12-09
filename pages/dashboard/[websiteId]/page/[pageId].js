import React, { useState } from 'react'
import DefaultErrorPage from 'next/error'
import {
  useToast,
  Heading,
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  Divider,
  FormHelperText,
} from '@chakra-ui/core'
import { useForm } from 'react-hook-form'
import StandardLayout from '../../../../components/layouts/standard-layout'
import { initializeApollo } from '../../../../lib/graphql/apollo-client'
import {
  getPageById,
  getWebsiteById,
  useSavePage,
} from '../../../../lib/graphql/client/hooks'
import { PageCard } from '../../../../components'
import { removeEqualProperties } from '../../../../utils'

export async function getServerSideProps({ params, req }) {
  const apolloClient = initializeApollo({ cookie: req?.headers?.cookie })
  const { websiteId, pageId } = params

  if (!(websiteId && pageId)) return { notFound: true }

  try {
    const website = await getWebsiteById({
      id: websiteId,
      client: apolloClient,
    })

    if (!website) return { notFound: true }

    const page = await getPageById({
      id: pageId,
      client: apolloClient,
    })

    if (!page) return { notFound: true }

    return {
      props: {
        website,
        page,
      },
    }
  } catch (error) {
    console.error(error)
    return {
      props: {
        website: {},
        page: {},
        error: true,
      },
    }
  }
}

export default function Home({ website, page: storedPage, error }) {
  const toast = useToast()
  const [page, setPage] = useState(storedPage)
  const [savePage, { loading: isSaving }] = useSavePage()
  const { handleSubmit, register, errors } = useForm({
    defaultValues: {
      path: storedPage.path,
      blocks: JSON.stringify(storedPage.blocks),
    },
  })

  if (error) {
    toast({
      description:
        "An error occurred loading this page's dashboard. Please try again later.",
      status: 'error',
      duration: 9000,
      isClosable: true,
    })

    return <DefaultErrorPage statusCode={500} />
  }

  const onSaveChanges = handleSubmit(async (pageData) => {
    const deDupedPageData = removeEqualProperties(pageData, storedPage)
    deDupedPageData.blocks =
      deDupedPageData.blocks && deDupedPageData.blocks.length > 0
        ? JSON.parse(deDupedPageData.blocks)
        : undefined

    const { errors } = await savePage({
      id: storedPage.id,
      ...deDupedPageData,
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
      setPage({
        ...storedPage,
        ...deDupedPageData,
      })

      toast({
        title: 'Successfully saved changes.',
        description: 'Your page will reflect the changes soon.',
        status: 'success',
        duration: 8000,
        isClosable: true,
      })
    }
  })

  return (
    <StandardLayout>
      <Box w="100%">
        <Heading>Page</Heading>
        <Divider />
        <Box w="100%" d="flex">
          <Box flex={1}>
            <form onSubmit={onSaveChanges}>
              <FormControl isInvalid={errors.path && errors.path.message}>
                <FormLabel>Path</FormLabel>
                <Input
                  name="path"
                  aria-describedby="path-helper-text"
                  ref={register({
                    maxLength: 120,
                    required: 'Please type a valid path.',
                  })}
                  placeholder="Path"
                />
                <FormErrorMessage>
                  {errors.path && errors.path.message}
                </FormErrorMessage>
                <FormHelperText id="path-helper-text">
                  {"The page's path represents the url for accessing this page. For example, " +
                    "to write to create a page on the site @ '/user/john/' that's accessed " +
                    'from '}
                  <strong>{'/user/john/blog/dayOne'}</strong>
                  {', the page would have a path of '}
                  <strong>{'blog/dayOne'}</strong>.
                </FormHelperText>
              </FormControl>
              <FormControl
                mt={4}
                isInvalid={errors.blocks && errors.blocks.message}
              >
                <FormLabel>Blocks</FormLabel>
                <Textarea name="blocks" ref={register} size="lg" />
                <FormErrorMessage>
                  {errors.blocks && errors.blocks.message}
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
            <PageCard
              websiteId={website.id}
              location={website.location}
              page={page}
              showEdit={false}
            />
          </Box>
        </Box>
      </Box>
    </StandardLayout>
  )
}
