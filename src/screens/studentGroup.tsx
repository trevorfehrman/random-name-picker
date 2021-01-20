import * as React from 'react'
import { useParams } from 'react-router-dom'
import 'firebase/firestore'
import { useFirestore, useUser, useFirestoreDocData } from 'reactfire'
import { Input, Button, Heading, Box } from '@chakra-ui/react'

interface Params {
  groupId: string
}

interface IStudentGroup {
  studentGroupName: string
  students: []
  docId: string
}

const StudentGroup: React.FC = () => {
  const params: Params = useParams()
  const studentGroupId = params.groupId

  const { data: user } = useUser()

  const studentGroupRef = useFirestore()
    .collection('teachers')
    .doc(user.uid)
    .collection('studentGroups')
    .doc(studentGroupId)
  const studentGroupDocument = useFirestoreDocData<IStudentGroup>(studentGroupRef, {
    idField: 'docId',
  }).data
  console.log(studentGroupDocument)

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Heading as="h1">{studentGroupDocument.studentGroupName}</Heading>

      <Box display="flex">
        <label htmlFor="student-name">Name:</label>
        <Input placeholder="Student name" id="student-name" aria-label="student-name"></Input>
        <Button aria-label="add">Add</Button>
      </Box>
    </Box>
  )
}

export default StudentGroup
