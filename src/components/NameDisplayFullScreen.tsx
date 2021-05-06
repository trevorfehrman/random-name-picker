import * as React from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import { ISelectedStudent } from 'interfacesAndTypes'
import StudentProfile from 'components/StudentProfile'

type NameDisplayFullScreenProps = {
  selectedStudent: ISelectedStudent | null
  noStudentSelected: boolean
  fullScreenDisplayIsOpen: boolean
  setFullScreenDisplayIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}
const NameDisplayFullScreen: React.FC<NameDisplayFullScreenProps> = ({
  selectedStudent,
  noStudentSelected,
  fullScreenDisplayIsOpen,
  setFullScreenDisplayIsOpen,
}) => {
  return (
    <Flex w="100%" justify="center" align="center" height="100%">
      {selectedStudent === null || noStudentSelected ? (
        <Heading as="h3" fontSize="1.5rem">
          {'click to select'}
        </Heading>
      ) : (
        <StudentProfile
          selectedStudent={selectedStudent}
          setFullScreenDisplayIsOpen={setFullScreenDisplayIsOpen}
          fullScreenDisplayIsOpen={fullScreenDisplayIsOpen}
        />
      )}
    </Flex>
  )
}

export default NameDisplayFullScreen
