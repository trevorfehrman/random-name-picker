import * as React from 'react'
import { Heading, Icon, IconButton, Flex } from '@chakra-ui/react'
import { BiTrash } from 'react-icons/bi'
import { useFirestore, useUser } from 'reactfire'
import { StudentContainer } from 'styles'
import { IStudentInStudentGroup } from 'interfacesAndTypes'
import { BiUser } from 'react-icons/bi'

type StudentInGroupProps = {
  student: IStudentInStudentGroup
  studentInStudentGroupId: string
  selected: boolean
}

const StudentInGroup: React.FC<StudentInGroupProps> = ({ student, studentInStudentGroupId, selected }) => {
  const { data: user } = useUser()

  const studentsInStudentGroupsRef = useFirestore()
    .collection('teachers')
    .doc(user.uid)
    .collection('studentsInStudentGroups')
    .doc(studentInStudentGroupId)

  const removeHandler = () => {
    studentsInStudentGroupsRef.delete()
  }

  return (
    <StudentContainer layout style={{ backgroundColor: selected ? '#90CDF4' : '' }}>
      <Flex w="70%">
        <Icon as={BiUser} fontSize="1.5rem" marginRight=".5rem" />
        <Heading as="h3" size="md">
          {student.studentInfo.studentName}
        </Heading>
      </Flex>

      <Flex justify="space-between" alignItems="center">
        {student.order < 0 && !student.selected ? (
          <Heading color="blue.500" as="h4" size="xs">
            Recently Added
          </Heading>
        ) : null}
        <IconButton icon={<Icon as={BiTrash} />} aria-label="delete" onClick={removeHandler} />
      </Flex>
    </StudentContainer>
  )
}

export default StudentInGroup
