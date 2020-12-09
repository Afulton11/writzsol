import React from 'react'
import { Flex, Button } from '@chakra-ui/core'
import { Header, MenuItem } from '../sections'
import { useUser } from '../../utils'

export default function StandardLayout({ children, ...props }) {
  const [user, isUserLoading] = useUser(false)

  return (
    <Flex
      direction="column"
      align="center"
      w={{ sm: '400px', md: '700px', lg: '900px', xl: '1200px' }}
      m="0 auto"
      {...props}
    >
      <Header>
        <MenuItem to="/">Home</MenuItem>
        <MenuItem to="/dashboard">Dashboard </MenuItem>

        <MenuItem to={user ? '/api/auth/signout' : '/api/auth/signin'} isLast>
          <Button
            size="sm"
            rounded="md"
            //@ts-ignore
            color={['gray.500', 'gray.500', 'white', 'white']}
            bg={['white', 'white', 'green.500', 'green.500']}
            _hover={{
              bg: ['gray.100', 'gray.100', 'gray.600', 'gray.600'],
            }}
            loadingText="Loading..."
            isLoading={isUserLoading}
          >
            {user ? `Sign Out of ${user.email || user.name}` : 'Create Account'}
          </Button>
        </MenuItem>
      </Header>
      {children}
      {/* <Footer /> */}
    </Flex>
  )
}
