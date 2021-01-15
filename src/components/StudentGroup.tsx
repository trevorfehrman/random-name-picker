import * as React from 'react'
import { Heading, Button } from '@chakra-ui/react'
import styled from '@emotion/styled'

import 'firebase/firestore'
import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire'

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
  studentGroupName: string
  studentGroupId: string
  doc: IClassroom
}

const StudentGroup: React.FC<StudentGroupProps> = ({ doc }) => {
  const studentGroupRef = useFirestore().collection('studentGroups')

  const openStudentGroupHandler = () => {
    console.log('hello')
  }

  const deleteHandler = (event: React.MouseEvent) => {
    event.stopPropagation()
    console.log('Ill be working soon')
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
        <Button onClick={event => deleteHandler(event)}>Delete</Button>
        <Button>Edit</Button>
      </ButtonDiv>
    </StudentGroupDiv>
  )
}

export default StudentGroup
