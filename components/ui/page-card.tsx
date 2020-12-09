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
import { Constants } from '../../utils'

interface PageCardProps {
  location: string
  websiteId: string
  page: Page
  showEdit?: boolean
}

export const PageCard: FC<PageCardProps> = ({
  location,
  websiteId,
  page,
  showEdit = true,
}) => {
  const { id, path, isPublished, createdAt, updatedAt } = page
  const url = `${Constants.WEBSITE_BASE_URL}/${location}/${path}`
  const displayUrl = (function () {
    if (url.length < 28) return url
    if (path.length > 27) return `.../${path}`

    const baseUrlLength = url.length - path.length - 1
    return '...' + url.substring(url.length - baseUrlLength)
  })()

  return (
    <Box maxW="lg" minW="xs" borderWidth="1px" rounded="lg" overflow="hidden">
      <Box p={6}>
        <Flex justify="space-between" mb={3}>
          <Heading size="lg">{path}</Heading>
          {showEdit ? (
            <Link href={`/dashboard/${websiteId}/page/${id}`}>
              <Button
                minW={undefined}
                leftIcon="edit"
                size="md"
                variant="solid"
                variantColor="green"
              >
                {`Edit`}
              </Button>
            </Link>
          ) : undefined}
        </Flex>
        <Box>
          <Box pr={2}>
            <Badge
              rounded="full"
              px="2"
              variantColor={isPublished ? 'green' : 'yellow'}
            >
              {isPublished ? 'Published' : 'Draft'}
            </Badge>
          </Box>
          <Text fontSize="sm" fontStyle="bold">
            {`Location `}
            <Link href={url} mt="2px">
              <strong>{displayUrl}</strong>
            </Link>
          </Text>
        </Box>

        <Divider />
        <Box
          d={showEdit ? 'flex' : 'block'}
          w="100%"
          justifyContent="space-between"
        >
          {createdAt ? (
            <Text fontSize="sm" textAlign="left">
              {'Created '} <TimeAgo date={createdAt} live={false} />
            </Text>
          ) : (
            <Box />
          )}
          <Text fontSize="sm" textAlign={showEdit ? 'right' : 'left'}>
            {'Updated '} <TimeAgo date={updatedAt} live={false} />
          </Text>
        </Box>
      </Box>
    </Box>
  )
}
