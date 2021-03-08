import * as React from 'react'
import { Heading, Flex, Button, Box } from '@chakra-ui/react'
import { IStudentInStudentGroup } from 'interfacesAndTypes'
import StudentInGroup from 'components/StudentInGroup'
import styled from '@emotion/styled'
import { useHistory } from 'react-router-dom'
import { AnimateSharedLayout, motion } from 'framer-motion'

const StudentBox = styled.div`
  width: 100%;
  min-height: 42%;
`

type StudentListProps = {
  studentsInThisStudentGroup: IStudentInStudentGroup[]
  studentGroupId: string
}

const StudentList: React.FC<StudentListProps> = ({ studentGroupId, studentsInThisStudentGroup }) => {
  return (
    <Box width="100%">
      <StudentBox>
        <AnimateSharedLayout>
          {studentsInThisStudentGroup?.map(doc => {
            console.log(studentsInThisStudentGroup)
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
