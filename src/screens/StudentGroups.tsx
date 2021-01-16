import * as React from 'react'
import { useForm } from 'react-hook-form'
import 'firebase/firestore'

import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire'

import { FormErrorMessage, FormLabel, FormControl, Input, Button } from '@chakra-ui/react'

import StudentGroup from 'components/StudentGroup'

const StudentGroups: React.FC = () => {
  const { handleSubmit, errors, register, formState } = useForm<FormData>()

  const { data: user } = useUser()

  type FormData = {
    studentGroupName: string
  }

  //Trevor is the cruelest.
  interface IStudentGroup {
    studentGroupName: string
    students: []
  }

  const studentGroupsRef = useFirestore().collection('teachers').doc(user.uid).collection('studentGroups')
  const studentGroupsDocuments = useFirestoreCollectionData<IStudentGroup & { docId: string }>(studentGroupsRef, {
    idField: 'docId',
  })

  async function onSubmit(data: FormData, e: React.BaseSyntheticEvent | undefined) {
    await studentGroupsRef.add({
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
      {studentGroupsDocuments.data?.map(doc => {
        return (
          <StudentGroup
            key={doc.docId}
            studentGroupName={doc.studentGroupName}
            studentGroupId={doc.docId}
            userId={user.uid}
          />
        )
      })}
    </>
  )
}

export default StudentGroups
