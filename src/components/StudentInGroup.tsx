import * as React from 'react'
import { Heading, IconButton } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { useFirestore, useUser } from 'reactfire'
import { StudentContainer } from 'styles'

type StudentInGroupProps = {
  studentName: string
  studentInStudentGroupId: string
}

const StudentInGroup: React.FC<StudentInGroupProps> = ({ studentName, studentInStudentGroupId }) => {
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
    <StudentContainer>
      <Heading as="h3" size="md">
        {studentName}
      </Heading>
      <IconButton icon={<DeleteIcon />} aria-label="delete" onClick={removeHandler} />
    </StudentContainer>
  )
}

export default StudentInGroup
