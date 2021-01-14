import * as React from 'react'
import { useForm } from 'react-hook-form'
import 'firebase/firestore'

import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire'

import { FormErrorMessage, FormLabel, FormControl, Input, Button } from '@chakra-ui/react'

import Classroom from 'components/Classroom'

const Classrooms: React.FC = () => {
  const { handleSubmit, errors, register, formState } = useForm<FormData>()

  const user = useUser()

  type FormData = {
    classroomName: string
  }

  interface IClassroom {
    docId: string
    classroomName: string
    students: []
  }

  const classroomRef = useFirestore().collection('classrooms')
  const classroomDocuments = useFirestoreCollectionData(classroomRef, { idField: 'docId' })
  console.log({ classroomDocuments, user })

  async function onSubmit(values: FormData) {
    console.log(values)
    await classroomRef.add({
      classroomName: values.classroomName,
      students: [],
    })
  }

  //   function validateName(value: string) {
  //     console.log(value)
  //     if (value === 'Steve') {
  //       return 'Fuck you, Steve'
  //     } else {
  //       return true
  //     }
  //   }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.classroomName}>
          <FormLabel htmlFor="classroomName">Classroom Name</FormLabel>
          <Input name="classroomName" placeholder="Classroom name" ref={register({ required: true, minLength: 3 })} />
          {errors.classroomName && errors.classroomName.type === 'required' && (
            <FormErrorMessage>This field is required</FormErrorMessage>
          )}
          {errors.classroomName && errors.classroomName.type === 'minLength' && (
            <FormErrorMessage>Please enter a classroom name with at least 3 characters</FormErrorMessage>
          )}
        </FormControl>
        <Button mt={4} colorScheme="teal" isLoading={formState.isSubmitting} type="submit">
          Submit
        </Button>
      </form>
      {classroomDocuments.data.map((doc: IClassroom) => {
        return <Classroom key={doc.docId} classroomName={doc.classroomName} />
      })}
    </>
  )
}

export default Classrooms
