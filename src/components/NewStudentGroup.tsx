import React from 'react'
import { FormLabel, Input, Button } from '@chakra-ui/react'
import firebase from 'firebase'
import { useHistory } from 'react-router-dom'
import { FormBox } from 'styles'
import styled from '@emotion/styled'

type NewStudentGroupProps = {
  onClose: () => void
  studentGroupsRef: firebase.firestore.CollectionReference
}

const NewStudentGroupForm = styled.form`
  display: flex;
  flex-direction: column;
`

const NewStudentGroup: React.FC<NewStudentGroupProps> = ({ studentGroupsRef, onClose }) => {
  const [studentGroupNameInput, setStudentGroupNameInput] = React.useState('')

  const history = useHistory()

  async function submitHandler(e: React.BaseSyntheticEvent) {
    e?.preventDefault()
    try {
      const result = await studentGroupsRef.add({
        studentGroupName: studentGroupNameInput,
      })
      onClose()
      history.push(`/student-group/${result.id}`)
    } catch (err) {
      console.log(err)
    }
    setStudentGroupNameInput('')
  }

  return (
    <FormBox>
      <NewStudentGroupForm onSubmit={submitHandler}>
        <FormLabel htmlFor="studentGroupName">Student Group Name</FormLabel>
        <Input
          onChange={e => setStudentGroupNameInput(e.target.value)}
          placeholder="Student Group Name"
          id="studentGroupName"
          isRequired
        ></Input>
        <Button colorScheme="blue" alignSelf="flex-end" type="submit" marginTop=".5rem">
          Create
        </Button>
      </NewStudentGroupForm>
    </FormBox>
  )
}

export default NewStudentGroup
