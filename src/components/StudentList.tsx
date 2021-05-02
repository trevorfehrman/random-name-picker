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
  selectedStudentId: string
  openManageGroupPageHandler: () => void
}

const StudentList: React.FC<StudentListProps> = ({
  studentsInThisStudentGroup,
  selectedStudentId,
  openManageGroupPageHandler,
}) => {
  return (
    <Box width="100%" height="100%" position="relative" onClick={openManageGroupPageHandler}>
      <StudentBox>
        {studentsInThisStudentGroup?.map(doc => {
          return <StudentInGroup key={doc.studentId} student={doc} selectedStudentId={selectedStudentId} />
        })}
      </StudentBox>
    </Box>
  )
}

export default StudentList
