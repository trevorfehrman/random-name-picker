import React from 'react'
import { FormLabel, Input, Button } from '@chakra-ui/react'
import firebase from 'firebase'
import { useHistory } from 'react-router-dom'
import { FormBox } from 'styles'

type NewStudentGroupProps = {
  studentGroupsRef: firebase.firestore.CollectionReference
}

const NewStudentGroup: React.FC<NewStudentGroupProps> = ({ studentGroupsRef }) => {
  const [studentGroupNameInput, setStudentGroupNameInput] = React.useState('')

  const history = useHistory()

  async function submitHandler(e: React.BaseSyntheticEvent) {
    e?.preventDefault()
    try {
      const result = await studentGroupsRef.add({
        studentGroupName: studentGroupNameInput,
      })
      history.push(`/student-group/${result.id}`)
    } catch (err) {
      console.log(err)
    }
    setStudentGroupNameInput('')
  }

  return (
    <FormBox>
      <form onSubmit={submitHandler}>
        <FormLabel htmlFor="studentGroupName">Student Group Name</FormLabel>
        <Input
          onChange={e => setStudentGroupNameInput(e.target.value)}
          placeholder="Student Group Name"
          id="studentGroupName"
          isRequired
        ></Input>
        <Button type="submit">Create</Button>
      </form>
    </FormBox>
  )
}

export default NewStudentGroup
