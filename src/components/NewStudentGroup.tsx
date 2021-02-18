import React from 'react'
import { Box, FormLabel, Input, Button } from '@chakra-ui/react'
import firebase from 'firebase'
import { useHistory } from 'react-router-dom'

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
    <>
      <Box>
        <FormLabel htmlFor="studentGroupName">Student Group Name</FormLabel>
        <Input
          onChange={e => setStudentGroupNameInput(e.target.value)}
          placeholder="Student Group Name"
          id="studentGroupName"
          isRequired
        ></Input>
        <Button onClick={submitHandler}>Create</Button>
      </Box>
    </>
  )
}

export default NewStudentGroup
