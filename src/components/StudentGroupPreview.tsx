import * as React from 'react'
import { Heading, IconButton } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import styled from '@emotion/styled'
import { useHistory } from 'react-router-dom'

import 'firebase/firestore'
import { useFirestore } from 'reactfire'

const StudentGroupDiv = styled.div`
  border: 1px solid black;
  margin: 3px 0;
  display: flex;
  justify-content: space-between;
  &:hover {
    cursor: pointer;
  }
`

const ButtonDiv = styled.div`
  display: flex;
`

// interface IClassroom {
//   studentGroupName: string
//   students: []
//   docId: string
// }

type StudentGroupProps = {
  studentGroupId: string
  studentGroupName: string
  userId: string
}

const StudentGroup: React.FC<StudentGroupProps> = ({ userId, studentGroupId, studentGroupName }) => {
  const studentGroupRef = useFirestore().collection('teachers').doc(userId).collection('studentGroups')

  const history = useHistory()

  const openStudentGroupHandler = () => {
    history.push('/student-group/' + studentGroupId)
  }

  const deleteHandler = (event: React.MouseEvent) => {
    event.stopPropagation()
    studentGroupRef
      .doc(studentGroupId)
      .delete()
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <StudentGroupDiv onClick={openStudentGroupHandler}>
      <Heading as="h2" size="lg">
        {studentGroupName}
      </Heading>
      <ButtonDiv>
        <IconButton icon={<DeleteIcon />} onClick={event => deleteHandler(event)} aria-label="delete">
          Delete
        </IconButton>
      </ButtonDiv>
    </StudentGroupDiv>
  )
}

export default StudentGroup
