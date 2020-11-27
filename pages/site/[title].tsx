import React from 'react'

import { Heading, Flex, ButtonGroup, Button } from '@chakra-ui/core'

export default function Home() {
  return (
    <Flex maxW="lg" alignItems="center" alignSelf="center" flexDir="column">
      <Heading mt={8}>Site Dashboard</Heading>
      <ButtonGroup
        justifyContent="center"
        w="100%"
        borderRadius={8}
        spacing={8}
        p={8}
        m={8}
      >
        <Button>Create Site</Button>
      </ButtonGroup>
    </Flex>
  )
}
