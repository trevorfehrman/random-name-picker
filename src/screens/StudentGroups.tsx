import * as React from 'react'
import { useForm } from 'react-hook-form'
import 'firebase/firestore'

import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire'

import { FormErrorMessage, FormLabel, FormControl, Input, Button } from '@chakra-ui/react'

import StudentGroup from 'components/StudentGroup'

const Classrooms: React.FC = () => {
  const { handleSubmit, errors, register, formState, reset } = useForm<FormData>()

  const user = useUser()

  type FormData = {
    studentGroupName: string
  }
  interface IClassroom {
    docId: string
    studentGroupName: string
    students: []
  }

  // tried getting to the correct user this way but it doesn't seem to be working well for me
  const studentGroupQuery = useFirestore().collection('users').where('uid', '==', user.data.uid)
  studentGroupQuery.get().then(result => {
    console.log(result)
  })
  console.log(studentGroupQuery)

  // This is creating new phantom user docs that have the google id as the docId
  const studentGroupRef = useFirestore().collection('users').doc(user.data.uid).collection('studentGroups')
  const studentGroupDocuments = useFirestoreCollectionData<IClassroom>(studentGroupRef, { idField: 'docId' })

  function onSubmit(data: FormData) {
    console.log(data, user)
    studentGroupRef
      .add({
        classroomName: data.studentGroupName,
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
        <FormControl isInvalid={!!errors.studentGroupName}>
          <FormLabel htmlFor="studentGroupName">Classroom Name</FormLabel>
          <Input
            name="studentGroupName"
            placeholder="Classroom name"
            ref={register({ required: true, minLength: 3 })}
          />
          {errors.studentGroupName && errors.studentGroupName.type === 'required' && (
            <FormErrorMessage>This field is required</FormErrorMessage>
          )}
          {errors.studentGroupName && errors.studentGroupName.type === 'minLength' && (
            <FormErrorMessage>Please enter a classroom name with at least 3 characters</FormErrorMessage>
          )}
        </FormControl>
        <Button mt={4} colorScheme="teal" isLoading={formState.isSubmitting} type="submit">
          Submit
        </Button>
      </form>
      {!!studentGroupDocuments.data
        ? studentGroupDocuments.data.map(doc => {
            return <StudentGroup key={doc.docId} studentGroupName={doc.studentGroupName} studentGroupId={doc.docId} />
          })
        : null}
    </>
  )
}

export default Classrooms
