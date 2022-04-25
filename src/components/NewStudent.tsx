import * as React from 'react'
import { Flex, Input, FormErrorMessage, FormLabel } from '@chakra-ui/react'
import { FormBox } from 'styles'
import { useForm } from 'react-hook-form'
import StudentFactInput from 'components/StudentFactInput'
import { studentFactInputs, createStudentFactsObject } from 'student-facts'
import { INewStudentValues } from 'interfacesAndTypes'
import FooterWithButtons from 'components/UI/FooterWithButtons'
import { useStudents } from 'helpers/firestoreHooks'
import { FormControlStyled } from 'components/FormControlStyled'
import { useStorage, useUser } from 'reactfire'

type NewStudentProps = {
  onClose: () => void
  setIsAddingStudent: React.Dispatch<React.SetStateAction<boolean>>
}

const NewStudent: React.FC<NewStudentProps> = ({ onClose, setIsAddingStudent }) => {
  const { register, handleSubmit, errors } = useForm()

  const storage = useStorage()

  const { data } = useUser()

  const { studentsRef } = useStudents()

  const addStudentHandler = async (values: INewStudentValues) => {
    setIsAddingStudent(true)
    const { studentName, profilePic } = values
    if (profilePic[0].size > 1000000) {
      return console.log('please upload a photo less than 1mb')
    }
    onClose()
    const imageUrl = `images/${data.uid}/${studentName}/${profilePic[0].name}`
    const imagesRef = storage.ref(imageUrl)
    const studentFacts = createStudentFactsObject(values)
    try {
      await imagesRef.put(profilePic[0])
      studentsRef.add({
        studentName,
        profilePic: imageUrl,
        studentFacts,
      })
      setIsAddingStudent(false)
    } catch (err) {
      console.log(err)
      setIsAddingStudent(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(addStudentHandler)}>
      <FormBox>
        <Flex direction="column" justify="center" align="center" height="100%" overflowY="hidden">
          <FormControlStyled isInvalid={errors.name} isRequired>
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
          </FormControlStyled>

          <FormControlStyled isInvalid={errors.profilePic} isRequired>
            <FormLabel color="var(--main-color-medium)" htmlFor="profile-pic">
              Profile Pic
            </FormLabel>
            <Input
              type="file"
              id="profile-pic"
              name="profilePic"
              placeholder="Profile Pic"
              ref={register({ required: true })}
            />
            {errors.profilePic && errors.profilePic.type === 'required' && <FormErrorMessage>Oops!</FormErrorMessage>}
          </FormControlStyled>

          {studentFactInputs.map(studentFactInput => {
            return <StudentFactInput key={studentFactInput} register={register} studentFactInput={studentFactInput} />
          })}
        </Flex>
      </FormBox>
      <FooterWithButtons onCancel={onClose} submitText={'CREATE'} />
    </form>
  )
}

export default NewStudent
