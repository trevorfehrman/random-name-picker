import * as React from 'react'
import { NameDisplayBox } from 'styles'
import { Heading, Flex } from '@chakra-ui/react'
import { NameDisplayProps } from 'interfacesAndTypes'
import StudentProfile from './StudentProfile'

const NameDisplayRegular: React.FC<NameDisplayProps> = ({
  selectedStudent,
  fullScreenDisplayIsOpen,
  setFullScreenDisplayIsOpen,
  selectStudentAndStudentFactHandler,
  noStudentSelected,
}) => {
  return (
    <NameDisplayBox
      onClick={
        fullScreenDisplayIsOpen
          ? selectStudentAndStudentFactHandler
          : () => {
              console.log('nope')
            }
      }
    >
      {selectedStudent === null || noStudentSelected ? (
        <Flex justify="center" align="center" height="16rem" maxHeight="33rem">
          <Heading as="h3" fontSize="1.2rem" color="var(--grey-dark)" fontWeight="400">
            {'click "NEXT" to select'}
          </Heading>
        </Flex>
      ) : (
        <StudentProfile
          selectedStudent={selectedStudent}
          setFullScreenDisplayIsOpen={setFullScreenDisplayIsOpen}
          fullScreenDisplayIsOpen={fullScreenDisplayIsOpen}
        />
      )}
    </NameDisplayBox>
  )
}

export default NameDisplayRegular
