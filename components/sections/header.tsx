import { useState, ReactNode, FC } from 'react'
import NextLink from 'next/link'
import { Box, Flex, Text, Button, Icon, Link, BoxProps } from '@chakra-ui/core'
interface HeaderProps {
  children?: ReactNode
  [rest: string]: any
}

type MenuItemProps = {
  isLast?: boolean
  to: string
  [rest: string]: any
} & BoxProps

export const MenuItem: FC<MenuItemProps> = ({
  children,
  isLast = false,
  to = '/',
  ...rest
}) => {
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

export const Header: FC<HeaderProps> = ({ children, ...rest }) => {
  const [show, setShow] = useState(false)
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
      // @ts-ignore
      color={['white', 'white', 'gray.700', 'gray.700']}
      {...rest}
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
          {children}
        </Flex>
      </Box>
    </Flex>
  )
}
