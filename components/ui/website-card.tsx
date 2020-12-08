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
import { Website } from '../../lib/graphql/server'

interface WebsiteCardProps {
  website: Website
  showEdit?: boolean
}

export const WebsiteCard: FC<WebsiteCardProps> = ({
  website,
  showEdit = true,
}) => {
  const {
    id,
    title,
    status,
    location,
    defaultTheme,
    createdAt,
    updatedAt,
  } = website
  return (
    <Box
      maxW={showEdit ? 'lg' : undefined}
      minW={showEdit ? 'sm' : undefined}
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
    >
      <Box p={6}>
        <Flex justify="space-between" mb={3}>
          <Heading size="lg">{title}</Heading>
          {showEdit ? (
            <Link href={`/dashboard/${id}`}>
              <Button size="md" variant="solid" variantColor="green">
                <Icon name="edit" />
                <Box pl={1} pr={1}>
                  Edit
                </Box>
              </Button>
            </Link>
          ) : undefined}
        </Flex>

        <Box pr={2}>
          <Badge rounded="full" px="2" variantColor="green">
            {status}
          </Badge>
        </Box>
        <Text fontSize="sm" fontStyle="bold">
          {`Location `}
          <Link href={`${location}`} mt="2px">
            <strong>{`https://www.writzsol.com/user/${location}`}</strong>
          </Link>
        </Text>
        {defaultTheme ? (
          <Box d="flex" alignItems="baseline">
            <Text fontSize="sm" fontStyle="bold">
              {`Default Theme `}
              <strong>{defaultTheme}</strong>
            </Text>
          </Box>
        ) : undefined}

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
