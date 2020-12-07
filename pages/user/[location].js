import React from 'react'
import { Heading, Text, Link, useToast } from '@chakra-ui/core'
import StandardLayout from '../../components/layouts/standard-layout'
import { initializeApollo } from '../../lib/graphql/apollo-client'
import { getWebsiteByLocation } from '../../lib/graphql/client/hooks'
import { useRouter } from 'next/router'

export async function getStaticPaths() {
  // Enable Lazy-static page rendering
  return { paths: [], fallback: true }
}

export async function getStaticProps({ params }) {
  const apolloClient = initializeApollo()
  const { location } = params

  if (location.length > 120) {
    return { props: { website: {} } }
  }

  try {
    const website = await getWebsiteByLocation({
      location,
      client: apolloClient,
    })

    console.log('[LOCATION] website', website)

    return {
      revalidate: 5,
      props: {
        website,
      },
    }
  } catch (error) {
    console.error(error)
    return {
      revalidate: 1,
      props: {
        website: {},
        error: true,
      },
    }
  }
}

export default function Home({ website, error }) {
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
      description:
        "An error occurred loading this website's homepage. Please try again later.",
      duration: 9000,
      isClosable: true,
      status: 'error',
    })
  }

  return (
    <StandardLayout>
      <Heading>{website.title}</Heading>
      <Text>Created On: {website.createdAt}</Text>
      <Text>Last Updated On: {website.updatedAt}</Text>
      <Text>Status: {website.status}</Text>
      <Text>Theme: {website.defaultTheme}</Text>
    </StandardLayout>
  )
}
