import * as React from 'react'
import { Heading, Flex, Button, Box } from '@chakra-ui/react'
import { IStudentInStudentGroup } from 'interfacesAndTypes'
import StudentInGroup from 'components/StudentInGroup'
import styled from '@emotion/styled'
import { useHistory } from 'react-router-dom'
import { AnimateSharedLayout, motion } from 'framer-motion'

type StudentListProps = {
  studentsInThisStudentGroup: IStudentInStudentGroup[]
  studentGroupId: string
}

const StudentList: React.FC<StudentListProps> = ({ studentGroupId, studentsInThisStudentGroup }) => {
  const [isShowingAll, setIsShowingAll] = React.useState(false)

  return (
    <Box width="100%" textAlign="center">
      <Button margin="0 auto" w="10rem" marginBottom=".5rem" onClick={() => setIsShowingAll(!isShowingAll)}>
        {isShowingAll ? 'Show Some' : 'Show All'}
      </Button>
      <Box width="100%" maxHeight={isShowingAll ? '' : '16.21rem'} overflow="hidden">
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
      </Box>
    </Box>
  )
}

export default StudentList
