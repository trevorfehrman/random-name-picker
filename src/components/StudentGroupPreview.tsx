import * as React from 'react'
import { Heading, IconButton } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import styled from '@emotion/styled'

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

interface IClassroom {
  studentGroupName: string
  students: []
  docId: string
}

type StudentGroupProps = {
  doc: IClassroom
  userId: string
}

const StudentGroup: React.FC<StudentGroupProps> = ({ doc, userId }) => {
  const studentGroupRef = useFirestore().collection('teachers').doc(userId).collection('studentGroups')

  const openStudentGroupHandler = () => {
    console.log('hello')
  }

  const deleteHandler = (event: React.MouseEvent) => {
    event.stopPropagation()
    studentGroupRef
      .doc(doc.docId)
      .delete()
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <StudentGroupDiv onClick={openStudentGroupHandler}>
      <Heading as="h2" size="lg">
        {doc.studentGroupName}
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
