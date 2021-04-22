import * as React from 'react'
import { Box } from '@chakra-ui/react'
import { IStudentInStudentGroup } from 'interfacesAndTypes'
import StudentInGroup from 'components/StudentInGroup'
import styled from '@emotion/styled'
import { useHistory } from 'react-router'

const StudentBox = styled.div`
  width: 100%;
  min-height: 42%;
`

type StudentListProps = {
  studentsInThisStudentGroup: IStudentInStudentGroup[]
  studentGroupId: string
  selectedStudentId: string
}

const StudentList: React.FC<StudentListProps> = ({ studentsInThisStudentGroup, selectedStudentId, studentGroupId }) => {
  const history = useHistory()
  const openManageGroupPageHandler = () => {
    history.push(`/manage-group/${studentGroupId}`)
  }
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
