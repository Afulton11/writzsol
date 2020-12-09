import React from 'react'
import NextLink from 'next/link'
import { Box, Flex, Text, Button, Icon, Link } from '@chakra-ui/core'
import { signIn, signOut } from 'next-auth/client'
import { useUser } from '../../utils'

const MenuItems = (props) => {
  const { children, isLast, to = '/', ...rest } = props
  return (
    <Text
      mb={{ base: isLast ? 0 : 8, sm: 0 }}
      mr={{ base: 0, sm: isLast ? 0 : 8 }}
      display="block"
      {...rest}
    >
      <NextLink href={to} passHref>
        <Link href={to}>{children}</Link>
      </NextLink>
    </Text>
  )
}

const Header = (props) => {
  const [show, setShow] = React.useState(false)
  const [user, isUserLoading] = useUser(false)
  const toggleMenu = () => setShow(!show)

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      pt={8}
      bg={['gray.500', 'gray.500', 'transparent', 'transparent']}
      color={['white', 'white', 'gray.700', 'gray.700']}
      {...props}
    >
      <Flex align="center" mr={8} float="left">
        <Icon name="twitter" />
      </Flex>

      <Box display={{ base: 'block', md: 'none' }} onClick={toggleMenu}>
        {show ? <Icon name="close" /> : <Icon name="menu" />}
      </Box>

      <Box
        display={{ base: show ? 'block' : 'none', md: 'block' }}
        flexBasis={{ base: '100%', md: 'auto' }}
      >
        <Flex
          align={['center', 'center', 'center', 'center']}
          justify={['center', 'space-between', 'flex-end', 'flex-end']}
          direction={['column', 'row', 'row', 'row']}
          pt={[4, 4, 0, 0]}
        >
          <MenuItems to="/">Home</MenuItems>
          <MenuItems to="/dashboard">Dashboard </MenuItems>

          <MenuItems
            to={user ? '/api/auth/signout' : '/api/auth/signin'}
            isLast
          >
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
              {user
                ? `Sign Out of ${user.email || user.name}`
                : 'Create Account'}
            </Button>
          </MenuItems>
        </Flex>
      </Box>
    </Flex>
  )
}

export default Header
