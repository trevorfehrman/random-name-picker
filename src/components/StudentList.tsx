import * as React from 'react'
import { Box } from '@chakra-ui/react'
import { IStudentInStudentGroup } from 'interfacesAndTypes'
import StudentInGroup from 'components/StudentInGroup'
import styled from '@emotion/styled'
import { AnimateSharedLayout } from 'framer-motion'

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
        <AnimateSharedLayout>
          {studentsInThisStudentGroup?.map(doc => {
            return (
              <StudentInGroup
                key={doc.studentId}
                studentName={doc.studentName}
                studentInStudentGroupId={doc.docId}
                selected={doc.selected}
              />
            )
          })}
        </AnimateSharedLayout>
      </StudentBox>
    </Box>
  )
}

export default StudentList
