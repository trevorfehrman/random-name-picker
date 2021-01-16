import * as React from 'react'
import { FormErrorMessage, FormControl, Input, Button, Heading } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { useForm } from 'react-hook-form'

import 'firebase/firestore'
import { useFirestore } from 'reactfire'

const StudentGroupContainer = styled.div`
  border: 1px solid black;
  margin: 3px 0;
  display: flex;
  justify-content: space-between;
  &:hover {
    cursor: pointer;
  }
`

const ButtonDiv = styled.div`
  display: flex;
`

const StyledForm = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

type StudentGroupProps = {
  studentGroupName: string
  studentGroupId: string
  userId: string
}

const StudentGroup: React.FC<StudentGroupProps> = ({ studentGroupName, studentGroupId, userId }) => {
  const [isEditingStudentGroupName, setIsEditingStudentGroupName] = React.useState(false)

  const { handleSubmit, errors, register, formState } = useForm<FormData>()

  type FormData = {
    studentGroupName: string
  }

  const studentGroupsRef = useFirestore().collection('teachers').doc(userId).collection('studentGroups')

  const openStudentGroupHandler = () => {
    console.log('hello')
  }

  const deleteHandler = () => {
    studentGroupsRef
      .doc(studentGroupId)
      .delete()
      .catch(err => {
        console.log(err)
      })
  }

  const onSubmit = (data: FormData) => {
    studentGroupsRef
      .doc(studentGroupId)
      .update({ studentGroupName: data.studentGroupName })
      .catch(err => {
        console.log(err)
      })
    setIsEditingStudentGroupName(false)
  }

  return (
    <StudentGroupContainer>
      {isEditingStudentGroupName ? (
        <StyledForm onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.studentGroupName}>
            <Input name="studentGroupName" placeholder="Group name" ref={register({ required: true, minLength: 3 })} />
            {errors.studentGroupName && errors.studentGroupName.type === 'required' && (
              <FormErrorMessage>This field is required</FormErrorMessage>
            )}
            {errors.studentGroupName && errors.studentGroupName.type === 'minLength' && (
              <FormErrorMessage>Please enter a group name with at least 3 characters</FormErrorMessage>
            )}
          </FormControl>
          <Button mt={4} colorScheme="teal" isLoading={formState.isSubmitting} type="submit">
            Submit
          </Button>
        </StyledForm>
      ) : (
        <>
          <Heading as="h2" size="lg" onClick={openStudentGroupHandler}>
            {studentGroupName}
          </Heading>
          <ButtonDiv>
            <Button onClick={deleteHandler}>Delete</Button>
            <Button onClick={() => setIsEditingStudentGroupName(true)}>Edit</Button>
          </ButtonDiv>
        </>
      )}
    </StudentGroupContainer>
  )
}

export default StudentGroup
