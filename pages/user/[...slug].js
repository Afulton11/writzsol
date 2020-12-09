import React from 'react'
import DefaultErrorPage from 'next/error'
import Head from 'next/head'
import { useToast, Heading, Text, Link, Box } from '@chakra-ui/core'
import StandardLayout from '../../components/layouts/standard-layout'
import { initializeApollo } from '../../lib/graphql/apollo-client'
import { getPage, getWebsiteByLocation } from '../../lib/graphql/client/hooks'
import { useRouter } from 'next/router'
import { join } from 'path'
import { UserWebsiteLayout } from '../../components'

export async function getStaticPaths() {
  // Enable Lazy-static page rendering
  return { paths: [], fallback: true }
}

export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo()
  const { slug } = params

  const location = slug.shift()
  const path = slug.length === 0 ? '/' : join(...slug)

  if (location.length > 120) {
    return { props: { website: {} } }
  }

  try {
    const website = await getWebsiteByLocation({
      location,
      client: apolloClient,
    })

    const { page, errors } = await getPage({
      path,
      location,
      client: apolloClient,
    })

    if (errors) console.error(errors)

    return {
      revalidate: 5,
      props: {
        website: website ?? {},
        page: page ?? {},
        path,
        error: !!errors,
        isFound: !!page,
      },
    }
  } catch (error) {
    console.error(error)
    return {
      revalidate: 1,
      props: {
        page: {},
        website: {},
        error: true,
        path,
      },
    }
  }
}

export default function Home({ page, path, website, error, isFound }) {
  const toast = useToast()
  const { isFallback } = useRouter()

  if (isFallback) {
    return (
      <StandardLayout>
        <p>Hi! Your website is loading 😅</p>
        <br />
        <p>
          If you are not redirected soon, please <Link href="">refresh</Link>{' '}
          the page.
        </p>
      </StandardLayout>
    )
  }

  if (error) {
    toast({
      description: `An error occurred loading this website at page ${path}. Please try again later.`,
      duration: 9000,
      isClosable: true,
      status: 'error',
    })
  }

  if (!isFound) {
    return (
      <>
        <Head>
          <meta name="robots" content="noindex" />
        </Head>
        <DefaultErrorPage statusCode={404} />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{website.title}</title>
      </Head>
      <UserWebsiteLayout website={website} page={page}>
        <Heading>{website.title}</Heading>
        <Box minW="50%">
          <Text>Created On: {website.createdAt}</Text>
          <Text>Last Updated On: {website.updatedAt}</Text>
          <Text>Status: {website.status}</Text>
          <Text>Theme: {website.defaultTheme}</Text>
        </Box>

        <Heading>About this page</Heading>
        <Box minW="50%">
          <Text>
            <strong>page's path:</strong> {page.path}
          </Text>
          <Text>
            <strong>Page's blocks:</strong> <br />
            {page.blocks ? JSON.stringify(page.blocks) : 'No blocks added.'}
          </Text>
        </Box>
      </UserWebsiteLayout>
    </>
  )
}
