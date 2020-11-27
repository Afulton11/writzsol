import React from 'react'
import { Heading, Text, Grid, Spinner, Box } from '@chakra-ui/core'
import { useSession } from 'next-auth/client'
import { useQuery } from '@apollo/client'

import StandardLayout from '../components/layouts/standard-layout'
import { WebsiteCard } from '../components/ui/website-card'
import { withApollo } from '../lib/graphql/client/apollo-client'
import { CreateWebsiteModal } from '../components/sections/create-website-modal'
import { GET_USER_WEBSITES } from '../lib/graphql/client/website'

const DasboardSkeleton = (
  <StandardLayout>
    <StandardLayout>
      <Heading alignSelf="flex-start">Site Dashboard</Heading>
      <Box w="100%">
        <CreateWebsiteModal disabled={!session} />
      </Box>
      <Grid templateColumns="repeat(1, 1fr)" gap={6} mt={8}>
        {renderWebsiteCards()}
      </Grid>
    </StandardLayout>
  </StandardLayout>
)

function Dashboard(props) {
  const [session, isSessionLoading] = useSession()
  let isLoadingData = false
  const isLoading = () => isSessionLoading || isLoadingData
  const { isLoadingData = loading, error, data } = useQuery(GET_USER_WEBSITES)

  const renderWebsiteCards = () => {
    if (isLoading()) return <Spinner />
    const { websites } = data

    if (!websites || websites.length == 0)
      return <Text>{`No websites created.`}</Text>
    else {
      const websiteCards = data.websites.map((site) => (
        <WebsiteCard {...site} key={site.id} />
      ))

      return websiteCards
    }
  }

  return (
    <StandardLayout>
      <Heading alignSelf="flex-start">Site Dashboard</Heading>
      <Box w="100%">
        <CreateWebsiteModal disabled={!session} />
      </Box>
      <Grid templateColumns="repeat(1, 1fr)" gap={6} mt={8}>
        {renderWebsiteCards()}
      </Grid>
    </StandardLayout>
  )
}

export default withApollo(Dashboard, { ssr: false })
