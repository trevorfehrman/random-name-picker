import * as React from 'react'
import { Button, Input, FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'
import { FormBox } from 'styles'
import firebase from 'firebase'
import { useForm } from 'react-hook-form'

type NewStudentProps = {
  studentsRef: firebase.firestore.CollectionReference
  onClose: () => void
}

interface INewStudentValues {
  name: string
  profilePic: string
  favoriteFood: string
}

const NewStudent: React.FC<NewStudentProps> = ({ studentsRef, onClose }) => {
  const [studentInput, setStudentInput] = React.useState('')

  const { register, reset, handleSubmit, errors } = useForm()

  const addStudentHandler = async (values: INewStudentValues) => {
    console.log(values)
    // e.preventDefault()
    try {
      const studentResult = studentsRef.add({
        studentName: values.name,
      })
      console.log(studentResult)
      // studentsInStudentGroupsRef
      //   .add({
      //     studentId: studentResult.id,
      //     studentName: studentInput,
      //     studentGroupId,
      //     studentGroupName: studentGroupDocument.studentGroupName,
      //     selected: true,
      //     order: 1,
      //   })
      //   .catch(err => console.log(err))
      setStudentInput('')
      reset({
        studentName: '',
        profilePic: '',
        favoriteFood: '',
      })
      onClose()
    } catch (err) {
      console.log(err)
    }
  }

  // const submitHandler = (values: string[]) => {
  //   console.log(values)
  // }

  return (
    <FormBox>
      {/* <form onSubmit={addStudentHandler}>
        <label htmlFor="student-name">Name:</label>
        <Input
          placeholder="Student name"
          id="student-name"
          aria-label="student-name"
          onChange={e => setStudentInput(e.target.value)}
          value={studentInput}
        ></Input>
        <Flex justifyContent="flex-end" padding=".7rem 0">
          <Button onClick={onClose}>Cancel</Button>
          <Button colorScheme="blue" aria-label="add" type="submit" ml="1rem">
            Add New
          </Button>
        </Flex>
      </form> */}
      <form onSubmit={handleSubmit(addStudentHandler)}>
        <FormControl isInvalid={errors.name}>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input id="name" name="name" placeholder="Name" ref={register({ minLength: 5, required: true })} />
          {errors.name && errors.name.type === 'required' && <FormErrorMessage>Oops!</FormErrorMessage>}
          {errors.name && errors.name.type === 'minLength' && <FormErrorMessage>Need more!</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={errors.profilePic}>
          <FormLabel htmlFor="profile-pic">Profile Pic</FormLabel>
          <Input id="profile-pic" name="profilePic" placeholder="Profile Pic" ref={register({ required: true })} />
          {errors.profilePic && errors.profilePic.type === 'required' && <FormErrorMessage>Oops!</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={errors.favoriteFood}>
          <FormLabel htmlFor="favorite-food">Favorite Food</FormLabel>
          <Input
            id="favorite-food"
            name="favoriteFood"
            placeholder="Favorite Food"
            ref={register({ required: true })}
          />
          {errors.favoriteFood && errors.favoriteFood.type === 'required' && <FormErrorMessage>Oops!</FormErrorMessage>}
        </FormControl>
        <Button type="submit">Submit</Button>
      </form>
    </FormBox>
  )
}

export default NewStudent
