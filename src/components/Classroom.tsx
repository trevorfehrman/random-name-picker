import * as React from 'react'
import { Heading, Button } from '@chakra-ui/react'
import styled from '@emotion/styled'

import 'firebase/firestore'
import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire'

const ClassroomDiv = styled.div`
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

type ClassroomProps = {
  classroomName: string
  classroomId: string
}

const Classroom: React.FC<ClassroomProps> = ({ classroomName, classroomId }) => {
  const classroomRef = useFirestore().collection('classrooms')

  const openClassroomHandler = () => {
    console.log('hello')
  }

  const deleteHandler = (event: React.MouseEvent) => {
    event.stopPropagation()
    console.log('Ill be working soon')
    classroomRef
      .doc(classroomId)
      .delete()
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <ClassroomDiv onClick={openClassroomHandler}>
      <Heading as="h2" size="lg">
        {classroomName}
      </Heading>
      <ButtonDiv>
        <Button onClick={event => deleteHandler(event)}>Delete</Button>
        <Button>Edit</Button>
      </ButtonDiv>
    </ClassroomDiv>
  )
}

export default Classroom
