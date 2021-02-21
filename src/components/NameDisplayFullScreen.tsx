import * as React from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import { NameDisplayProps } from 'interfacesAndTypes'

const NameDisplayFullScreen: React.FC<NameDisplayProps> = ({ selectedStudent }) => {
  return (
    <Flex h="100%" w="100%" justify="center" align="center">
      {selectedStudent === null ? (
        <Heading as="h3" fontSize="3rem">
          {'click to select'}
        </Heading>
      ) : (
        <Heading as="h1" fontSize="20vw">
          {selectedStudent?.studentName}
        </Heading>
      )}
    </Flex>
  )
}

export default NameDisplayFullScreen
