import React from 'react'
import { FormLabel, Input, Box } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import { FormBox } from 'styles'
import styled from '@emotion/styled'
import SubmitButton from './UI/SubmitButton'
import { useStudentGroups } from 'helpers/firestoreHooks'

type NewStudentGroupProps = {
  onClose: () => void
}

const NewStudentGroupForm = styled.form`
  display: flex;
  flex-direction: column;
`

const NewStudentGroup: React.FC<NewStudentGroupProps> = ({ onClose }) => {
  const [studentGroupNameInput, setStudentGroupNameInput] = React.useState('')

  const { studentGroupsRef } = useStudentGroups()

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
        <Box margin=".5rem 0 .8rem 0">
          <FormLabel color="var(--main-color-medium)" htmlFor="studentGroupName" marginTop="0" marginBottom=".1rem">
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
