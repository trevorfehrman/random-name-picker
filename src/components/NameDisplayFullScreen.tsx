import * as React from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import { IStudentInStudentGroup } from 'interfacesAndTypes'
import StudentProfile from 'components/StudentProfile'

type NameDisplayFullScreenProps = {
  selectedStudent: IStudentInStudentGroup | null
}
const NameDisplayFullScreen: React.FC<NameDisplayFullScreenProps> = ({ selectedStudent }) => {
  return (
    <Flex w="100%" justify="center" align="center" height="100%">
      {selectedStudent === null ? (
        <Heading as="h3" fontSize="3rem">
          {'click to select'}
        </Heading>
      ) : (
        <StudentProfile selectedStudent={selectedStudent} />
      )}
    </Flex>
  )
}

export default NameDisplayFullScreen
