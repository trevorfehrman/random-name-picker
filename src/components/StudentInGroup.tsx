import * as React from 'react'
import { Heading } from '@chakra-ui/react'
import { useFirestore, useUser } from 'reactfire'
import { StudentInGroupContainer } from 'styles'
import { IStudentInStudentGroup } from 'interfacesAndTypes'
import { useStudentGroup } from 'helpers/firestoreHooks'

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

  const { studentGroupRef } = useStudentGroup(student.studentGroupId)

  const removeHandler = () => {
    console.log(student.studentId, selectedStudentId)
    if (student.studentId === selectedStudentId) {
      studentGroupRef.update({ selectedStudent: null })
    }
    studentsInStudentGroupsRef.delete()
  }

  return (
    <StudentInGroupContainer layout style={{ color: student.selected ? 'var(--main-color-light)' : '' }}>
      <Heading as="h3" size="sm">
        {student.studentInfo.studentName}
      </Heading>
    </StudentInGroupContainer>
  )
}

export default StudentInGroup
