import * as React from 'react'
import { Heading } from '@chakra-ui/react'
import { StudentInGroupContainer } from 'styles'
import { IStudentInStudentGroup } from 'interfacesAndTypes'

type StudentInGroupProps = {
  student: IStudentInStudentGroup
  selectedStudentId: string
}

const StudentInGroup: React.FC<StudentInGroupProps> = ({ student }) => {
  return (
    <StudentInGroupContainer layout style={{ color: student.selected ? 'var(--main-color-light)' : '' }}>
      <Heading as="h3" size="sm" fontSize={{ base: '1rem', lg: '1.5rem' }}>
        {student.studentInfo.studentName}
      </Heading>
    </StudentInGroupContainer>
  )
}

export default StudentInGroup
