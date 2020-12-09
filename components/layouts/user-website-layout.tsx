import { FC } from 'react'
import { Flex, FlexProps } from '@chakra-ui/core'
import { Header, MenuItem } from '../sections'
import { Website, Page } from '../../lib/graphql/server'
import { Constants } from '../../utils'

type UserWebsiteLayoutProps = {
  website: Website
  page: Page
  [rest: string]: any
} & FlexProps

export const UserWebsiteLayout: FC<UserWebsiteLayoutProps> = ({
  website,
  page,
  children,
  ...rest
}) => {
  const baseUrl = `${Constants.WEBSITE_BASE_URL}/${website.location}`
  return (
    <Flex
      direction="column"
      align="center"
      w={{ sm: '400px', md: '700px', lg: '900px', xl: '1200px' }}
      m="0 auto"
      {...rest}
    >
      <Header>
        <MenuItem to={baseUrl}>Home</MenuItem>
        <MenuItem to={`${baseUrl}/blog`}>Blog</MenuItem>
        <MenuItem to={`${baseUrl}/about`}>About</MenuItem>
      </Header>
      {children}
      {/* <Footer /> */}
    </Flex>
  )
}
