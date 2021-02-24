import * as React from 'react'
import { Button, Input, Flex } from '@chakra-ui/react'
import { FormBox } from 'styles'
import firebase from 'firebase'

type NewStudentProps = {
  studentsRef: firebase.firestore.CollectionReference
  studentsInStudentGroupsRef: firebase.firestore.CollectionReference
  studentGroupDocument: firebase.firestore.DocumentData
  studentGroupId: string
  openAddExistingModalHandler: () => void
}

const NewStudent: React.FC<NewStudentProps> = ({
  openAddExistingModalHandler,
  studentsRef,
  studentGroupDocument,
  studentsInStudentGroupsRef,
  studentGroupId,
}) => {
  const [studentInput, setStudentInput] = React.useState('')

  const addStudentHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (studentInput === '') {
      return
    }
    try {
      const studentResult = await studentsRef.add({
        studentName: studentInput,
      })
      console.log(studentResult)
      studentsInStudentGroupsRef
        .add({
          studentId: studentResult.id,
          studentName: studentInput,
          studentGroupId,
          studentGroupName: studentGroupDocument.studentGroupName,
          selected: false,
        })
        .catch(err => console.log(err))
      setStudentInput('')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <FormBox>
      <form onSubmit={addStudentHandler}>
        <label htmlFor="student-name">Name:</label>
        <Input
          placeholder="Student name"
          id="student-name"
          aria-label="student-name"
          onChange={e => setStudentInput(e.target.value)}
          value={studentInput}
        ></Input>
        <Flex justifyContent="space-between">
          <Button aria-label="add" type="submit">
            Add New
          </Button>
          <Button onClick={openAddExistingModalHandler}>Add Existing</Button>
        </Flex>
      </form>
    </FormBox>
  )
}

export default NewStudent
