import * as React from 'react'
import { useParams } from 'react-router-dom'
import 'firebase/firestore'
import { useFirestore, useUser, useFirestoreDocData } from 'reactfire'
import { Input, Button, Heading, Box } from '@chakra-ui/react'
import { IStudentGroup } from 'interfacesAndTypes/interfacesAndTypes'

interface Params {
  groupId: string
}

const StudentGroup: React.FC = () => {
  const [studentInput, setStudentInput] = React.useState('')

  const params: Params = useParams()
  const studentGroupId = params.groupId

  const { data: user } = useUser()

  const studentGroupRef = useFirestore()
    .collection('teachers')
    .doc(user.uid)
    .collection('studentGroups')
    .doc(studentGroupId)
  const studentGroupDocument = useFirestoreDocData<IStudentGroup & { docId: string }>(studentGroupRef, {
    idField: 'docId',
  }).data

  const addNameHandler = () => {
    studentGroupRef
      .update({ students: [...studentGroupDocument.students, { studentName: studentInput }] })
      .catch(err => console.log(err))
    setStudentInput('')
  }

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Heading as="h1">{studentGroupDocument?.studentGroupName}</Heading>

        <Box display="flex" alignItems="center">
          <label htmlFor="student-name">Name:</label>
          <Input
            placeholder="Student name"
            id="student-name"
            aria-label="student-name"
            onChange={e => setStudentInput(e.target.value)}
          ></Input>
          <Button aria-label="add" onClick={addNameHandler}>
            Add
          </Button>
        </Box>
      </Box>
      <Box>
        {studentGroupDocument.students.map(doc => {
          return <div key={doc.studentName}>{doc.studentName}</div>
        })}
      </Box>
    </>
  )
}

export default StudentGroup
