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

interface IStudentGroup {
  studentGroupName: string
  students: []
  docId: string
}

type StudentGroupProps = {
  studentGroup: IStudentGroup
}

const StudentGroup: React.FC<StudentGroupProps> = ({ studentGroup }) => {
  const studentGroupRef = useFirestore().collection('studentGroups')

  const openStudentGroupHandler = () => {
    console.log('hello')
  }

  const deleteHandler = (event: React.MouseEvent) => {
    event.stopPropagation()
    console.log('Ill be working soon')
    studentGroupRef
      .doc(studentGroup.docId)
      .delete()
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <StudentGroupDiv onClick={openStudentGroupHandler}>
      <Heading as="h2" size="lg">
        {studentGroup.studentGroupName}
      </Heading>
      <ButtonDiv>
        <Button onClick={event => deleteHandler(event)}>Delete</Button>
        <Button>Edit</Button>
      </ButtonDiv>
    </StudentGroupDiv>
  )
}

export default StudentGroup
