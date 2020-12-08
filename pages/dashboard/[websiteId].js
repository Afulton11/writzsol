import React from 'react'
import DefaultErrorPage from 'next/error'
import { Heading, Text, useToast, Button } from '@chakra-ui/core'
import StandardLayout from '../../components/layouts/standard-layout'
import { initializeApollo } from '../../lib/graphql/apollo-client'
import { getPages, getWebsiteById } from '../../lib/graphql/client/hooks'
import { PageCard } from '../../components/ui'

export async function getServerSideProps({ params, req }) {
  const apolloClient = initializeApollo({ cookie: req.headers.cookie })
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

export default function Home({ website, pages, error }) {
  const toast = useToast()

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

  return (
    <StandardLayout>
      <Heading>{website.title}</Heading>
      <Text>Created On: {website.createdAt}</Text>
      <Text>Last Updated On: {website.updatedAt}</Text>
      <Text>Status: {website.status}</Text>
      <Text>Theme: {website.defaultTheme}</Text>
      <Heading>Pages</Heading>
      {pages.length > 0 ? (
        pages.map((page) => <PageCard location={location} page={page} />)
      ) : (
        <Text p={4}>{`No pages exist.`}</Text>
      )}
    </StandardLayout>
  )
}
