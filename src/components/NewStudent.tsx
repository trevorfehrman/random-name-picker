import * as React from 'react'
import { Flex, Input, FormErrorMessage, FormLabel } from '@chakra-ui/react'
import { FormBox, FormControlWithMargin } from 'styles'
import firebase from 'firebase'
import { useForm } from 'react-hook-form'
import StudentFactInput from 'components/StudentFactInput'
import { studentFactInputs, createStudentFactsObject } from 'student-facts'
import { INewStudentValues } from 'interfacesAndTypes'
import SubmitButton from './UI/SubmitButton'

type NewStudentProps = {
  studentsRef: firebase.firestore.CollectionReference
  onClose: () => void
}

const NewStudent: React.FC<NewStudentProps> = ({ studentsRef, onClose }) => {
  const { register, handleSubmit, errors } = useForm()

  const addStudentHandler = async (values: INewStudentValues) => {
    const { studentName, profilePic } = values
    const studentFacts = createStudentFactsObject(values)
    try {
      studentsRef.add({
        studentName,
        profilePic,
        studentFacts,
      })
      onClose()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <FormBox>
      <form onSubmit={handleSubmit(addStudentHandler)}>
        <Flex direction="column" justify="center" align="center">
          <FormControlWithMargin isInvalid={errors.name} isRequired>
            <FormLabel htmlFor="studentName">Name</FormLabel>
            <Input
              id="studentName"
              name="studentName"
              placeholder="Student Name"
              ref={register({ minLength: 5, required: true })}
            />
            {errors.studentName && errors.studentName.type === 'required' && <FormErrorMessage>Oops!</FormErrorMessage>}
            {errors.studentName && errors.studentName.type === 'minLength' && (
              <FormErrorMessage>Need more!</FormErrorMessage>
            )}
          </FormControlWithMargin>

          <FormControlWithMargin isInvalid={errors.profilePic} isRequired>
            <FormLabel htmlFor="profile-pic">Profile Pic</FormLabel>
            <Input id="profile-pic" name="profilePic" placeholder="Profile Pic" ref={register({ required: true })} />
            {errors.profilePic && errors.profilePic.type === 'required' && <FormErrorMessage>Oops!</FormErrorMessage>}
          </FormControlWithMargin>

          {studentFactInputs.map(studentFactInput => {
            return <StudentFactInput key={studentFactInput} register={register} studentFactInput={studentFactInput} />
          })}

          <SubmitButton text="Submit" />
        </Flex>
      </form>
    </FormBox>
  )
}

export default NewStudent
