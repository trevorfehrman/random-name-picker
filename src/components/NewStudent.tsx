import * as React from 'react'
import { Button, Input, Flex } from '@chakra-ui/react'
import { FormBox } from 'styles'
import firebase from 'firebase'

type NewStudentProps = {
  studentsRef: firebase.firestore.CollectionReference
  studentsInStudentGroupsRef: firebase.firestore.CollectionReference
  studentsInThisGroupLength: number
  studentGroupDocument: firebase.firestore.DocumentData
}

const NewStudent: React.FC<NewStudentProps> = ({
  studentsRef,
  studentGroupDocument,
  studentsInStudentGroupsRef,
  studentsInThisGroupLength,
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
          studentGroupId: studentGroupDocument.docId,
          studentGroupName: studentGroupDocument.studentGroupName,
          selected: false,
          order: studentsInThisGroupLength + 1,
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
        <Flex justifyContent="flex-end" padding=".7rem 0">
          <Button colorScheme="blue" aria-label="add" type="submit" ml="1rem">
            Add New
          </Button>
        </Flex>
      </form>
    </FormBox>
  )
}

export default NewStudent
