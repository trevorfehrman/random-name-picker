import * as React from 'react'
import styled from '@emotion/styled'
import { Editable, EditablePreview, EditableInput, FormControl, FormErrorMessage } from '@chakra-ui/react'
import { useStudentGroup } from 'helpers/firestoreHooks'

type EditableStudentGroupNameProps = {
  studentGroupId: string
}

const StudentGroupNameForm = styled.form`
  position: relative;
  width: 16rem;
  max-width: 90%;
  display: flex;
  margin: 0.5rem auto;
`

const EditableStudentGroupName: React.FC<EditableStudentGroupNameProps> = ({ studentGroupId }) => {
  const [errors, setErrors] = React.useState<string[]>([])

  const { studentGroupDocument, studentGroupRef } = useStudentGroup(studentGroupId)

  const editStudentGroupNameHandler = (value: string) => {
    studentGroupRef.update({ studentGroupName: value }).catch(err => {
      console.log(err)
    })
  }

  const checkForErrors = (value: string) => {
    const errorArray = []
    if (value === '') {
      errorArray.push('Please enter a group name')
    }
    if (value.length >= 35) {
      errorArray.push('Please enter a value with less than 35 characters')
    }
    setErrors(errorArray)
    if (errorArray.length > 0) {
      return true
    } else {
      return false
    }
  }

  const submitHandler = (value: string) => {
    const thereAreErrors = checkForErrors(value)
    if (!thereAreErrors) {
      editStudentGroupNameHandler(value)
    }
  }
  return (
    <StudentGroupNameForm>
      <FormControl isInvalid={errors.length > 0} display="flex" flexDirection="column" alignItems="flex-end">
        {studentGroupDocument && (
          <Editable
            defaultValue={studentGroupDocument.studentGroupName}
            placeholder="Student Group Name"
            w="100%"
            textAlign="center"
            color="var(--grey-dark)"
            fontSize="1.5rem"
            letterSpacing=".12em"
            lineHeight="1.75rem"
            textTransform="uppercase"
            onSubmit={submitHandler}
          >
            <EditablePreview _hover={{ cursor: 'pointer' }} zIndex={1} position="relative" />
            <EditableInput />
          </Editable>
        )}
        {errors.map(errorMessage => {
          return (
            <FormErrorMessage margin={0} key={errorMessage}>
              {errorMessage}
            </FormErrorMessage>
          )
        })}
      </FormControl>
    </StudentGroupNameForm>
  )
}

export default EditableStudentGroupName
