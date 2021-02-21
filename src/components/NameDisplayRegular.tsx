import * as React from 'react'
import { NameDisplayBox } from 'styles'
import { Heading } from '@chakra-ui/react'
import { NameDisplayProps } from 'interfacesAndTypes'

const NameDisplayRegular: React.FC<NameDisplayProps> = ({ selectedStudent }) => {
  return (
    <NameDisplayBox>
      {selectedStudent === null ? (
        <Heading as="h3" fontSize="1.5rem">
          {'click "Select Name"'}
        </Heading>
      ) : (
        <Heading as="h1" fontSize="3rem">
          {selectedStudent?.studentName}
        </Heading>
      )}
    </NameDisplayBox>
  )
}

export default NameDisplayRegular
