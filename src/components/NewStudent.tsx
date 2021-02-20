import * as React from 'react'
import { Button, Input, Flex } from '@chakra-ui/react'
import { FormBox } from 'styles'

type NewStudentProps = {
  addStudentHandler: (
    e: React.SyntheticEvent,
    studentInput: string,
    setStudentInput: React.Dispatch<React.SetStateAction<string>>,
  ) => Promise<void>
  openAddExistingModalHandler: () => void
}

const NewStudent: React.FC<NewStudentProps> = ({ addStudentHandler, openAddExistingModalHandler }) => {
  const [studentInput, setStudentInput] = React.useState('')

  return (
    <FormBox>
      <form onSubmit={event => addStudentHandler(event, studentInput, setStudentInput)}>
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
