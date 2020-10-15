import React from 'react';
import SessionButtons from '../components/session-buttons';

import { Heading, Flex, ButtonGroup } from '@chakra-ui/core';

export default function Home() {
  return (
    <Flex maxW="lg" alignItems="center" alignSelf="center" flexDir="column">
      <Heading mt={8}>
        POC using NextAuth, Graphql, Prisma, Nexus, and Apollo-Server!
      </Heading>
      <ButtonGroup
        justifyContent="center"
        w="100%"
        borderRadius={8}
        spacing={8}
        p={8}
        m={8}
      >
        <SessionButtons alignSelf="center" />
      </ButtonGroup>
    </Flex>
  );
}
