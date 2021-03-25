import * as React from 'react'
import firebase from 'firebase'
import styled from '@emotion/styled'
import { Editable, EditablePreview, EditableInput, FormControl, FormErrorMessage } from '@chakra-ui/react'

type EditableStudentGroupNameProps = {
  studentGroupDocument: firebase.firestore.DocumentData
  studentGroupRef: firebase.firestore.DocumentReference
}

const StudentGroupNameForm = styled.form`
  position: relative;
  display: flex;
  width: 100%;
`

const EditableStudentGroupName: React.FC<EditableStudentGroupNameProps> = ({
  studentGroupDocument,
  studentGroupRef,
}) => {
  const [errors, setErrors] = React.useState<string[]>([])

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
      <FormControl isInvalid={errors.length > 0} display="flex" flexDirection="column" alignItems="center">
        {studentGroupDocument && (
          <Editable
            defaultValue={studentGroupDocument.studentGroupName}
            placeholder="Student Group Name"
            color="var(--main-color-very-dark)"
            fontSize="1.2rem"
            fontWeight="bolder"
            onSubmit={submitHandler}
            width="100%"
            textAlign="center"
          >
            <EditablePreview _hover={{ cursor: 'pointer' }} zIndex={1} position="relative" color="gray.600" />
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
