import SessionButtons from '../components/session-buttons'

import { Heading, ButtonGroup } from '@chakra-ui/core'
import { StandardLayout } from '../components'

export default function Home() {
  return (
    <StandardLayout>
      <Heading mt={8}>
        POC using NextAuth, Graphql, typeorm, type-graphql, and Apollo-Server!
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
    </StandardLayout>
  )
}
