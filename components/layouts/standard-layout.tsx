import React from 'react'
import { Flex } from '@chakra-ui/core'
import Header from '../sections/header'

export default function StandardLayout({ children, ...props }) {
  return (
    <Flex
      direction="column"
      align="center"
      w={{ sm: '400px', md: '700px', lg: '900px', xl: '1200px' }}
      m="0 auto"
      {...props}
    >
      <Header />
      {children}
      {/* <Footer /> */}
    </Flex>
  )
}
