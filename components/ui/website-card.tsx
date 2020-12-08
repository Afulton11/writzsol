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

type WebsiteCardProps = Website

export const WebsiteCard: FC<WebsiteCardProps> = ({
  id,
  title,
  status,
  location,
  updatedAt,
}) => (
  <Box maxW="lg" minW="sm" borderWidth="1px" rounded="lg" overflow="hidden">
    <Box p={6}>
      <Flex justify="space-between" mb={3}>
        <Heading size="lg">{title}</Heading>
        <Link href={`/dashboard/${id}`}>
          <Button size="md" variant="solid" variantColor="green">
            <Icon name="edit" />
            <Box pl={1} pr={1}>
              Edit
            </Box>
          </Button>
        </Link>
      </Flex>
      <Flex flexDir="row">
        <Box pr={2}>
          <Badge rounded="full" px="2" variantColor="green">
            {status}
          </Badge>
        </Box>
        <Link href={`https://${location}`} mt="2px">
          <Heading size="sm">{`${location}`}</Heading>
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
