import * as React from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import { Login } from 'components/Login'

export const HeaderForWelcome: React.FC = () => {
  return (
    <Flex bg="var(--main-color-medium)" h="4.5rem" justify="space-between" align="center" paddingX="2rem">
      <Heading as="h1" color="var(--white)">
        Picker
      </Heading>
      <Login />
    </Flex>
  )
}
