import { FC } from 'react'
import {
  Heading,
  Button,
  Flex,
  Box,
  Badge,
  Divider,
  Text,
  Link,
  Icon,
} from '@chakra-ui/core'
import TimeAgo from 'react-timeago'
import { Page } from '../../lib/graphql/server'

interface PageCardProps {
  location: string
  page: Page
}

export const PageCard: FC<PageCardProps> = ({ location, page }) => {
  const { path, isPublished, updatedAt } = page
  return (
    <Box maxW="lg" minW="sm" borderWidth="1px" rounded="lg" overflow="hidden">
      <Box p={6}>
        <Flex justify="space-between" mb={3}>
          <Heading size="lg">{path}</Heading>
          <Button size="md" variant="solid" variantColor="green">
            <Icon name="edit" />
            <Box pl={1} pr={1}>
              Edit
            </Box>
          </Button>
        </Flex>
        <Flex flexDir="row">
          <Box pr={2}>
            <Badge rounded="full" px="2" variantColor="green">
              {isPublished ? 'Published' : 'Private'}
            </Badge>
          </Box>
          <Link href={`https://${location}/${path}`} mt="2px">
            <Heading size="sm">{`${path}`}</Heading>
          </Link>
        </Flex>

        <Divider />
        <Flex w="100%" justify="space-between">
          <Box />
          <Text fontSize="sm" textAlign="right">
            {'Updated '} <TimeAgo date={updatedAt} live={false} />
          </Text>
        </Flex>
      </Box>
    </Box>
  )
}
