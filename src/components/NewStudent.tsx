import * as React from 'react'
import { Button, Input, Box } from '@chakra-ui/react'

type NewStudentProps = {
  addStudentHandler: (
    e: React.SyntheticEvent,
    studentInput: string,
    setStudentInput: React.Dispatch<React.SetStateAction<string>>,
  ) => Promise<void>
}

const NewStudent: React.FC<NewStudentProps> = ({ addStudentHandler }) => {
  const [studentInput, setStudentInput] = React.useState('')

  return (
    <Box margin="25px">
      <form onSubmit={event => addStudentHandler(event, studentInput, setStudentInput)}>
        <label htmlFor="student-name">Name:</label>
        <Input
          placeholder="Student name"
          id="student-name"
          aria-label="student-name"
          onChange={e => setStudentInput(e.target.value)}
          value={studentInput}
        ></Input>
        <Button aria-label="add" type="submit">
          Add New
        </Button>
      </form>
    </Box>
  )
}

export default NewStudent
