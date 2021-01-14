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
  interface IClassroom {
    docId: string
    classroomName: string
    students: []
  }

  // tried getting to the correct user this way but it doesn't seem to be working well for me
  const classroomQuery = useFirestore().collection('users').where('uid', '==', user.data.uid)
  classroomQuery.get().then(result => {
    console.log(result)
  })
  console.log(classroomQuery)

  // This is creating new phantom user docs that have the google id as the docId
  const classroomRef = useFirestore().collection('users').doc(user.data.uid).collection('studentGroups')
  const classroomDocuments = useFirestoreCollectionData<IClassroom>(classroomRef, { idField: 'docId' })

  function onSubmit(data: FormData) {
    console.log(data, user)
    classroomRef
      .add({
        classroomName: data.classroomName,
        students: [],
      })
      .catch(err => {
        console.log(err)
      })
    reset()
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
      {!!classroomDocuments.data
        ? classroomDocuments.data.map(doc => {
            return <Classroom key={doc.docId} classroomName={doc.classroomName} classroomId={doc.docId} />
          })
        : null}
    </>
  )
}

export default Classrooms
