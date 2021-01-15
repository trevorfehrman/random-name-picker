import * as React from 'react'
import { useForm } from 'react-hook-form'
import 'firebase/firestore'

import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire'

import { FormErrorMessage, FormLabel, FormControl, Input, Button } from '@chakra-ui/react'

import StudentGroup from 'components/StudentGroup'

const StudentGroups: React.FC = () => {
  const { handleSubmit, errors, register, formState } = useForm<FormData>()

  const { data: user } = useUser()

  const studentGroupsRef = useFirestore().collection('teachers').doc(user.uid).collection('studentGroups')
  const studentGroupsData = useFirestoreCollectionData(studentGroupsRef)
  console.log(studentGroupsData)

  type FormData = {
    studentGroupName: string
  }

  //Steve is the druel-ist.
  interface IClassroom {
    studentGroupName: string
    students: []
    docId: string
  }

  const studentGroupRef = useFirestore().collection('studentGroups')
  const studentGroupDocuments = useFirestoreCollectionData<IClassroom & { docId: string }>(studentGroupRef, {
    idField: 'docId',
  })

  async function onSubmit(data: FormData, e: React.BaseSyntheticEvent | undefined) {
    await studentGroupRef.add({
      studentGroupName: data.studentGroupName,
      students: [],
    })
    e?.target.reset()
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.studentGroupName}>
          <FormLabel htmlFor="studentGroupName">Group Name</FormLabel>
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
      </form>
      {studentGroupDocuments.data?.map(doc => {
        return (
          <StudentGroup key={doc.docId} studentGroupName={doc.studentGroupName} doc={doc} studentGroupId={doc.docId} />
        )
      })}
    </>
  )
}

export default StudentGroups
