import * as React from 'react'
import styled from '@emotion/styled'
import { Editable, EditablePreview, EditableInput, FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'
import { useStudentGroup } from 'helpers/firestoreHooks'

type EditableStudentGroupNameProps = {
  studentGroupId: string
}

const StudentGroupNameForm = styled.form`
  position: relative;
  width: 100%;
  display: flex;
  margin: 2rem auto;
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
      <FormControl isInvalid={errors.length > 0} display="flex" alignItems="center" w="100%">
        {studentGroupDocument && (
          <>
            <FormLabel htmlFor="group-name" whiteSpace="nowrap" fontSize="1.3rem">
              Group Name:
            </FormLabel>
            <Editable
              defaultValue={studentGroupDocument.studentGroupName}
              id="group-name"
              placeholder="Student Group Name"
              w="100%"
              textAlign="center"
              color="var(--grey-dark)"
              fontSize="2rem"
              letterSpacing=".12em"
              lineHeight="1.75rem"
              textTransform="uppercase"
              onSubmit={submitHandler}
              startWithEditView
            >
              <EditablePreview _hover={{ cursor: 'pointer' }} zIndex={1} position="relative" />
              <EditableInput />
            </Editable>
          </>
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
