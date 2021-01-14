import * as React from 'react'
import { useForm } from 'react-hook-form'
import 'firebase/firestore'

import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire'

import { FormErrorMessage, FormLabel, FormControl, Input, Button } from '@chakra-ui/react'

import Classroom from 'components/Classroom'

const Classrooms: React.FC = () => {
  const { handleSubmit, errors, register, formState, reset } = useForm<FormData>()

  const user = useUser()

  type FormData = {
    classroomName: string
  }

  //Steve is the coolest
  interface IClassroom {
    docId: string
    classroomName: string
    students: []
  }

  const classroomRef = useFirestore().collection('classrooms')
  const classroomDocuments = useFirestoreCollectionData<IClassroom>(classroomRef, { idField: 'docId' })

  async function onSubmit(data: FormData, e: React.BaseSyntheticEvent | undefined) {
    await classroomRef.add({
      classroomName: data.classroomName,
      students: [],
    })
    e?.target.reset()
  }

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
      {!!classroomDocuments
        ? classroomDocuments.data.map(doc => {
            return <Classroom key={doc.docId} classroomName={doc.classroomName} />
          })
        : null}
    </>
  )
}

export default Classrooms
