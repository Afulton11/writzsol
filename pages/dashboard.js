import React from 'react'
import { Heading, Text, Grid, Spinner, Box, useToast } from '@chakra-ui/core'
import { useQuery } from '@apollo/client'

import { useUser } from '../utils/hooks/useUser'
import StandardLayout from '../components/layouts/standard-layout'
import { WebsiteCard } from '../components/ui/website-card'
import { withApollo } from '../lib/graphql/client/apollo-client'
import { CreateWebsiteModal } from '../components/sections/create-website-modal'
import { GET_USER_WEBSITES } from '../lib/graphql/client/website'

const DashboardSkeleton = (
  <StandardLayout>
    <StandardLayout>
      <Heading alignSelf="flex-start">Site Dashboard</Heading>
      <Box w="100%">
        <CreateWebsiteModal disabled />
      </Box>
      <Grid templateColumns="repeat(1, 1fr)" gap={6} mt={8}>
        <Spinner />
      </Grid>
    </StandardLayout>
  </StandardLayout>
)

function Dashboard(props) {
  const [user, isUserLoading] = useUser()
  const toast = useToast()
  const { error, loading, data } = useQuery(GET_USER_WEBSITES)

  if (isUserLoading) return DashboardSkeleton
  if (!user) return <p>Redirecting...</p>

  const websites = data?.websites ?? []

  if (error) {
    toast({
      title: 'Error fetching websites.',
      description:
        'We were unable to fetch your websites from our server. Try again later.',
      status: 'error',
      duration: 9000,
      isClosable: true,
    })
  }

  const renderWebsiteCards = () => {
    if (loading) return <Spinner />

    if (websites.length == 0) return <Text>{`No websites created.`}</Text>
    else {
      const websiteCards = websites.map((site) => (
        <WebsiteCard {...site} key={site.id} />
      ))

      return websiteCards
    }
  }

  return (
    <StandardLayout>
      <Heading alignSelf="flex-start">Site Dashboard</Heading>
      <Box w="100%">
        <CreateWebsiteModal disabled={!user} />
      </Box>
      <Grid templateColumns="repeat(1, 1fr)" gap={6} mt={8}>
        {renderWebsiteCards()}
      </Grid>
    </StandardLayout>
  )
}

export default withApollo(Dashboard, { ssr: false })
