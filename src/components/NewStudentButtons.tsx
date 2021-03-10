import * as React from 'react'
import { Button, Input, Flex } from '@chakra-ui/react'
import { FormBox } from 'styles'
import firebase from 'firebase'

type NewStudentProps = {
  studentsRef: firebase.firestore.CollectionReference
  studentsInStudentGroupsRef: firebase.firestore.CollectionReference
  studentsInThisGroupLength: number
  studentGroupDocument: firebase.firestore.DocumentData
  studentGroupId: string
  openAddExistingModalHandler: () => void
  openAddNewModalHandler: () => void
}

const NewStudent: React.FC<NewStudentProps> = ({
  openAddExistingModalHandler,
  openAddNewModalHandler,
  studentsRef,
  studentGroupDocument,
  studentsInStudentGroupsRef,
  studentsInThisGroupLength,
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
      <Flex justifyContent="center" padding=".7rem 0" maxWidth="25rem" justify="space-evenly">
        <Button onClick={openAddExistingModalHandler}>Add Existing</Button>
        <Button colorScheme="blue" aria-label="add" onClick={openAddNewModalHandler}>
          Add New
        </Button>
      </Flex>
    </FormBox>
  )
}

export default NewStudent
