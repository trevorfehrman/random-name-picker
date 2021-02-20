import * as React from 'react'
import styled from '@emotion/styled'
import { IStudentInStudentGroup } from 'interfacesAndTypes/interfacesAndTypes'
import { Heading, Flex } from '@chakra-ui/react'

const NameDisplayBox = styled.div`
  display: flex;
  min-height: 7rem;
  w: 100%;
  justify-content: center;
  align-items: center;
  padding: 2%;
`

type NameDisplayProps = {
  selectedStudent: IStudentInStudentGroup | null
  isFullScreen?: boolean
}

const NameDisplay: React.FC<NameDisplayProps> = ({ selectedStudent, isFullScreen }) => {
  return (
    <>
      {!isFullScreen ? (
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
      ) : (
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
      )}
    </>
  )
}

export default NameDisplay
