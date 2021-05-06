import * as React from 'react'
import { NameDisplayBox } from 'styles'
import { Heading, IconButton, Icon, Flex } from '@chakra-ui/react'
import { BiExpand } from 'react-icons/bi'
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
        <Flex direction="column" justify="center" align="center" height="calc(85vw + 7.3rem)" maxHeight="33rem">
          <Heading as="h3" fontSize="1.5rem" color="var(--grey-dark)" fontWeight="400">
            {'click "NEXT" to select'}
          </Heading>
          <Heading
            as="h3"
            fontSize="1.2rem"
            onClick={() => setFullScreenDisplayIsOpen(true)}
            color="var(--main-color-medium)"
            marginTop="1rem"
            _hover={{ color: 'var(--main-color-dark)', cursor: 'pointer' }}
          >
            {'click Here for Full Screen'}
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
