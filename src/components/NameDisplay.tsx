import * as React from 'react'
import styled from '@emotion/styled'
import { IStudentInStudentGroup } from 'interfacesAndTypes/interfacesAndTypes'
import { Heading } from '@chakra-ui/react'

const NameDisplayBox = styled.div`
  display: flex;
  h: 7rem;
  w: 100%;
  justify-content: center;
  align-items: center;
  padding: 5%;
`

type NameDisplayProps = {
  selectedStudent: IStudentInStudentGroup | null
}

const NameDisplay: React.FC<NameDisplayProps> = ({ selectedStudent }) => {
  return (
    <>
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
    </>
  )
}

export default NameDisplay
