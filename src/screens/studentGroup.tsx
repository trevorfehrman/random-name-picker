import * as React from 'react'
import { useParams } from 'react-router-dom'
import 'firebase/firestore'
import { useFirestore, useUser, useFirestoreDocData, useFirestoreCollectionData } from 'reactfire'
import { Input, Button, Box, Editable, EditablePreview, EditableInput } from '@chakra-ui/react'
import { IStudentGroup } from 'interfaces and types/IStudentGroup'
import styled from '@emotion/styled'

interface Params {
  groupId: string
}

const StudentBox = styled.div`
  margin: auto;
  width: 90%;
  border: 1px solid black;
  min-height: 100px;
`

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

  const studentsRef = useFirestore().collection('teachers').doc(user.uid).collection('students')
  const students = useFirestoreCollectionData(studentsRef, { idField: 'docId' })

  const addStudentHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const studentResult = await studentsRef.add({
        studentName: studentInput,
      })
      console.log(studentResult.id)
      studentGroupRef
        .update({
          students: [...studentGroupDocument.students, { studentId: studentResult.id, studentName: studentInput }],
        })
        .catch(err => console.log(err))
      setStudentInput('')
    } catch (err) {
      console.log(err)
    }
  }

  const editStudentGroupNameHandler = (value: string) => {
    console.log(value)
    studentGroupRef.update({ studentGroupName: value }).catch(err => {
      console.log(err)
    })
  }

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center">
        {studentGroupDocument && (
          <Editable
            defaultValue={studentGroupDocument.studentGroupName}
            onSubmit={editStudentGroupNameHandler}
            fontSize="2.5rem"
          >
            <EditablePreview _hover={{ cursor: 'pointer' }} />
            <EditableInput />
          </Editable>
        )}
        <form onSubmit={addStudentHandler}>
          <label htmlFor="student-name">Name:</label>
          <Input
            placeholder="Student name"
            id="student-name"
            aria-label="student-name"
            onChange={e => setStudentInput(e.target.value)}
            value={studentInput}
          ></Input>
          <Button aria-label="add" type="submit">
            Add
          </Button>
        </form>
      </Box>
      <StudentBox>
        {studentGroupDocument?.students.map(doc => {
          //
          return <div key={doc.studentId}>{doc.studentName}</div> // Create Student Component
        })}
      </StudentBox>
    </>
  )
}

export default StudentGroup
