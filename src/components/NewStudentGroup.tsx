import React from 'react'
import { FormLabel, Input, Heading, Box } from '@chakra-ui/react'
import firebase from 'firebase'
import { useHistory } from 'react-router-dom'
import { FormBox } from 'styles'
import styled from '@emotion/styled'
import SubmitButton from './UI/SubmitButton'

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
        selectedStudent: null,
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
        <Box margin=".5rem 0">
          <FormLabel color="var(--main-color-medium)" htmlFor="studentGroupName" marginTop="0">
            Name
          </FormLabel>
          <Input
            onChange={e => setStudentGroupNameInput(e.target.value)}
            placeholder="Name"
            id="studentGroupName"
            isRequired
          ></Input>
        </Box>

        <SubmitButton text="CREATE" />
      </NewStudentGroupForm>
    </FormBox>
  )
}

export default NewStudentGroup
