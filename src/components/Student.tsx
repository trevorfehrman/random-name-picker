import * as React from 'react'
import styled from '@emotion/styled'
import { Heading, IconButton, Flex } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import { useFirestore, useUser } from 'reactfire'

type StudentProps = {
  studentName: string
  studentInStudentGroupId: string
}

// const StudentContainer = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   border: 1px solid black;
//   padding: 10px;
// `

const Student: React.FC<StudentProps> = ({ studentName, studentInStudentGroupId }) => {
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
    <Flex align="center" justify="space-between" padding="10px" border="1px solid black">
      <Heading as="h3" size="md">
        {studentName}
      </Heading>
      <IconButton icon={<DeleteIcon />} aria-label="delete" onClick={removeHandler} />
    </Flex>
  )
}

export default Student
