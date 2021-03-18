import * as React from 'react'
import { Button, Input, FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'
import { FormBox } from 'styles'
import firebase from 'firebase'
import { useForm } from 'react-hook-form'
import StudentFactInput from 'components/StudentFactInput'
import { studentFactInputInfo } from 'my-constants'

type NewStudentProps = {
  studentsRef: firebase.firestore.CollectionReference
  onClose: () => void
}

const NewStudent: React.FC<NewStudentProps> = ({ studentsRef, onClose }) => {
  const [studentFactInputs, setStudentFactInputs] = React.useState(studentFactInputInfo)

  const { register, handleSubmit, errors } = useForm()

  const addStudentHandler = async (values: Record<string, unknown>) => {
    const { studentName, profilePic } = values
    console.log(values)
    const studentFacts: Record<string, unknown> = {}
    studentFactInputInfo.forEach(studentFact => {
      studentFacts[studentFact.camelCase] = {
        value: values[studentFact.camelCase],
        title: studentFact.display,
      }
    })
    console.log(studentFacts)
    try {
      const studentResult = studentsRef.add({
        studentName,
        profilePic,
        studentFacts,
      })
      console.log(studentResult)
      // reset({
      //   studentName: '',
      //   profilePic: '',
      //   favoriteFood: '',

      // })
      onClose()
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <FormBox>
      <form onSubmit={handleSubmit(addStudentHandler)}>
        <FormControl isInvalid={errors.name}>
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
        </FormControl>
        <FormControl isInvalid={errors.profilePic}>
          <FormLabel htmlFor="profile-pic">Profile Pic</FormLabel>
          <Input id="profile-pic" name="profilePic" placeholder="Profile Pic" ref={register({ required: true })} />
          {errors.profilePic && errors.profilePic.type === 'required' && <FormErrorMessage>Oops!</FormErrorMessage>}
        </FormControl>
        {studentFactInputs.map(studentFactInput => {
          return (
            <StudentFactInput
              key={studentFactInput.camelCase}
              register={register}
              camelCase={studentFactInput.camelCase}
              display={studentFactInput.display}
            />
          )
        })}
        {/* <FormControl isInvalid={errors.favoriteFood}>
          <FormLabel htmlFor="favorite-food">Favorite Food</FormLabel>
          <Input
            id="favorite-food"
            name="favoriteFood"
            placeholder="Favorite Food"
            ref={register({ required: true })}
          />
          {errors.favoriteFood && errors.favoriteFood.type === 'required' && <FormErrorMessage>Oops!</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={errors.favoriteMovie}>
          <FormLabel htmlFor="favorite-movie">Favorite Movie</FormLabel>
          <Input
            id="favorite-movie"
            name="favoriteMovie"
            placeholder="Favorite Movie"
            ref={register({ required: true })}
          />
          {errors.favoriteMovie && errors.favoriteMovie.type === 'required' && (
            <FormErrorMessage>Oops!</FormErrorMessage>
          )}
        </FormControl> */}
        <Button type="submit">Submit</Button>
      </form>
    </FormBox>
  )
}

export default NewStudent
