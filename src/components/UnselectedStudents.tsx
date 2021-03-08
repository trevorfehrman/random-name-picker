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

type UnselectedStudentsProps = {
  unselected: IStudentInStudentGroup[]
  studentsInThisStudentGroup: IStudentInStudentGroup[]
  selected: IStudentInStudentGroup[]
  studentGroupId: string
}

const UnselectedStudents: React.FC<UnselectedStudentsProps> = ({ studentGroupId, studentsInThisStudentGroup }) => {
  const history = useHistory()

  const showAllHandler = () => {
    history.push(`/show-all-students/${studentGroupId}`)
  }

  return (
    <Box width="100%">
      <Flex justify="space-between" width="100%" alignItems="center">
        <Heading as="h2" fontSize="1.2rem">
          Unselected:
        </Heading>
        <Button onClick={showAllHandler}>Show All</Button>
      </Flex>

      <StudentBox>
        <AnimateSharedLayout>
          <motion.div layout>
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
            {/* {unselected?.map(doc => {
              return (
                <StudentInGroup key={doc.studentId} studentName={doc.studentName} studentInStudentGroupId={doc.docId} />
              )
            })}
            {selected?.map(doc => {
              return (
                <StudentInGroup key={doc.studentId} studentName={doc.studentName} studentInStudentGroupId={doc.docId} />
              )
            })} */}
          </motion.div>
        </AnimateSharedLayout>
      </StudentBox>
    </Box>
  )
}

export default UnselectedStudents
