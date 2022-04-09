import * as React from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import { centeringOffset } from 'my-constants'

export const InstructionText: React.FC = ({ children }) => {
  console.log(centeringOffset)

  return (
    <Flex
      h="100%"
      w="100%"
      justify="center"
      align="center"
      position="absolute"
      bottom="0"
      left="0"
      paddingX="1.5rem"
      zIndex="-10"
    >
      <Heading
        as="h2"
        textAlign="center"
        transform={`translateY(-${centeringOffset}rem)`}
        color="var(--grey-dark)"
        opacity="0.7"
        fontWeight="semi-light"
      >
        {children}
      </Heading>
    </Flex>
  )
}
