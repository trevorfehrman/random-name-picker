import * as React from 'react'
import { Heading, Icon, IconButton } from '@chakra-ui/react'
import { BiTrash } from 'react-icons/bi'
import { useFirestore, useUser } from 'reactfire'
import { StudentContainer } from 'styles'

type StudentInGroupProps = {
  studentName: string
  studentInStudentGroupId: string
  selected: boolean
}

const StudentInGroup: React.FC<StudentInGroupProps> = ({ studentName, studentInStudentGroupId, selected }) => {
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
      <Heading as="h3" size="md">
        {studentName}
      </Heading>
      <IconButton icon={<Icon as={BiTrash} />} aria-label="delete" onClick={removeHandler} />
    </StudentContainer>
  )
}

export default StudentInGroup
