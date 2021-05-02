import * as React from 'react'
import { Flex, Input, FormErrorMessage, FormLabel } from '@chakra-ui/react'
import { FormBox, FormControlWithMargin } from 'styles'
import { useForm } from 'react-hook-form'
import StudentFactInput from 'components/StudentFactInput'
import { studentFactInputs, createStudentFactsObject } from 'student-facts'
import { INewStudentValues } from 'interfacesAndTypes'
import FooterWithButtons from 'components/UI/FooterWithButtons'
import { useStudents } from 'helpers/firestoreHooks'

type NewStudentProps = {
  onClose: () => void
}

const NewStudent: React.FC<NewStudentProps> = ({ onClose }) => {
  const { register, handleSubmit, errors } = useForm()

  const { studentsRef } = useStudents()

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
    <form onSubmit={handleSubmit(addStudentHandler)}>
      <FormBox>
        <Flex direction="column" justify="center" align="center" height="100%" overflowY="hidden">
          <FormControlWithMargin isInvalid={errors.name} isRequired>
            <FormLabel color="var(--main-color-medium)" htmlFor="studentName">
              Name
            </FormLabel>
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
            <FormLabel color="var(--main-color-medium)" htmlFor="profile-pic">
              Profile Pic
            </FormLabel>
            <Input id="profile-pic" name="profilePic" placeholder="Profile Pic" ref={register({ required: true })} />
            {errors.profilePic && errors.profilePic.type === 'required' && <FormErrorMessage>Oops!</FormErrorMessage>}
          </FormControlWithMargin>

          {studentFactInputs.map(studentFactInput => {
            return <StudentFactInput key={studentFactInput} register={register} studentFactInput={studentFactInput} />
          })}

          {/* <SubmitButton text="Submit" /> */}
        </Flex>
      </FormBox>
      <FooterWithButtons onCancel={onClose} submitText={'CREATE'} />
    </form>
  )
}

export default NewStudent
