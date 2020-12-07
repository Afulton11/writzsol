import React from 'react'
import { Heading, Text, Grid, Spinner, Box, useToast } from '@chakra-ui/core'

import { useUser } from '../utils/hooks/useUser'
import StandardLayout from '../components/layouts/standard-layout'
import { WebsiteCard } from '../components/ui/website-card'
import { CreateWebsiteModal } from '../components/sections/create-website-modal'
import { useWebsites } from '../lib/graphql/client/hooks/useWebsites'

const DashboardSkeleton = (
  <StandardLayout>
    <Heading alignSelf="flex-start">Dashboard</Heading>
    <Box w="100%">
      <CreateWebsiteModal disabled />
    </Box>
    <Grid templateColumns="repeat(1fr, 1fr)" gap={6} mt={8}>
      <Spinner />
    </Grid>
  </StandardLayout>
)

export default function Dashboard(props) {
  const [user, isUserLoading] = useUser()
  const toast = useToast()
  const { error, loading, websites } = useWebsites()

  if (isUserLoading) return DashboardSkeleton
  if (!user) return <p>Redirecting...</p>

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
      <Heading alignSelf="flex-start">Dashboard</Heading>
      <Box w="100%">
        <CreateWebsiteModal disabled={!user} />
      </Box>
      <Grid templateColumns="repeat(auto)" gap={6} mt={8}>
        {renderWebsiteCards()}
      </Grid>
    </StandardLayout>
  )
}
