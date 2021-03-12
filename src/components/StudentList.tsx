import * as React from 'react'
import { Box } from '@chakra-ui/react'
import { IStudentInStudentGroup } from 'interfacesAndTypes'
import StudentInGroup from 'components/StudentInGroup'
import styled from '@emotion/styled'

const StudentBox = styled.div`
  width: 100%;
  min-height: 42%;
`

type StudentListProps = {
  studentsInThisStudentGroup: IStudentInStudentGroup[]
  studentGroupId: string
}

const StudentList: React.FC<StudentListProps> = ({ studentsInThisStudentGroup }) => {
  return (
    <Box width="100%">
      <StudentBox>
        {studentsInThisStudentGroup?.map(doc => {
          return (
            <StudentInGroup
              key={doc.studentId}
              student={doc}
              studentInStudentGroupId={doc.docId}
              selected={doc.selected}
            />
          )
        })}
      </StudentBox>
    </Box>
  )
}

export default StudentList
