import * as React from 'react'
import { Heading, Icon, IconButton, Flex } from '@chakra-ui/react'
import { BiX } from 'react-icons/bi'
import { useFirestore, useUser } from 'reactfire'
import { StudentInGroupContainer } from 'styles'
import { IStudentInStudentGroup } from 'interfacesAndTypes'
import { BiUser } from 'react-icons/bi'

type StudentInGroupProps = {
  student: IStudentInStudentGroup
  selectedStudentId: string
}

const StudentInGroup: React.FC<StudentInGroupProps> = ({ student, selectedStudentId }) => {
  const { data: user } = useUser()

  const studentsInStudentGroupsRef = useFirestore()
    .collection('teachers')
    .doc(user.uid)
    .collection('studentsInStudentGroups')
    .doc(student.docId)

  const studentGroupRef = useFirestore()
    .collection('teachers')
    .doc(user.uid)
    .collection('studentGroups')
    .doc(student.studentGroupId)

  const removeHandler = () => {
    console.log(student.studentId, selectedStudentId)
    if (student.studentId === selectedStudentId) {
      studentGroupRef.update({ selectedStudent: null })
    }
    studentsInStudentGroupsRef.delete()
  }

  return (
    <StudentInGroupContainer layout style={{ backgroundColor: student.selected ? '#90CDF4' : '' }}>
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
        <IconButton icon={<Icon fontSize="1.3rem" as={BiX} />} aria-label="delete" onClick={removeHandler} />
      </Flex>
    </StudentInGroupContainer>
  )
}

export default StudentInGroup
