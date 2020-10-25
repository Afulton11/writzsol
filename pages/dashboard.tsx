import React from 'react';
import NextLink from 'next/link';
import StandardLayout from '../components/layouts/standard-layout';

import { Heading, Text, Grid, Spinner, Link } from '@chakra-ui/core';
import { useSession } from 'next-auth/client';
import { WebsiteCard } from '../components/ui/website-card';
import { Website } from '@prisma/client';

const websites = [
  {
    title: "Andrew's Blog",
    defaultTheme: 'light',
    status: 'PUBLISHED',
    location: 'andrew.writzsol.com',
    updatedAt: new Date().getTime() - 1000 * 60 * 60 * 24 * 32
  }
];

type DashboardProps = {
  websites: Website[];
};

export default function Dashboard(props: DashboardProps) {
  const [session, isLoading] = useSession();
  const { websites } = props;
  return (
    <StandardLayout>
      <Heading alignSelf="flex-start">Site Dashboard</Heading>
      <Grid templateColumns="repeat(1, 1fr)" gap={6} mt={8}>
        {isLoading && <Spinner />}
        {!isLoading && (!websites || websites.length < 1) && (
          <Text>
            {`No websites created. `}
            <NextLink href="/site/create">
              <Link>Create a website here.</Link>
            </NextLink>
          </Text>
        )}
        {!isLoading &&
          websites &&
          websites.length > 0 &&
          websites.map((site) => <WebsiteCard {...site} />)}
      </Grid>
    </StandardLayout>
  );
}
