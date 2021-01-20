import * as React from 'react'
// import { useForm } from 'react-hook-form'
import 'firebase/firestore'

import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire'

import { FormErrorMessage, FormLabel, FormControl, Input, Button } from '@chakra-ui/react'

import StudentGroup from 'components/StudentGroup'

const StudentGroups: React.FC = () => {
  const [studentGroupName, setStudentGroupName] = React.useState('')

  // const { handleSubmit, errors, register, formState } = useForm<FormData>()

  const { data: user } = useUser()

  const studentGroupsRef = useFirestore().collection('teachers').doc(user.uid).collection('studentGroups')
  const studentGroupsData = useFirestoreCollectionData(studentGroupsRef)
  console.log(studentGroupsData)

  // type FormData = {
  //   studentGroupName: string
  // }

  //Steve is the druel-ist.
  interface IClassroom {
    studentGroupName: string
    students: []
    docId: string
  }

  const studentGroupRef = useFirestore().collection('teachers').doc(user.uid).collection('studentGroups')
  const studentGroupDocuments = useFirestoreCollectionData<IClassroom & { docId: string }>(studentGroupRef, {
    idField: 'docId',
  })

  async function submitHandler(e: React.BaseSyntheticEvent | undefined) {
    e?.preventDefault()
    await studentGroupRef.add({
      studentGroupName: studentGroupName,
      students: [],
    })
    e?.target.reset()
  }

  return (
    <>
      {/* <form onSubmit={handleSubmit(onSubmit)}>
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
      </form> */}
      <form onSubmit={e => submitHandler(e)}>
        <FormLabel htmlFor="studentGroupName">Student Group Name</FormLabel>
        <Input
          onChange={e => setStudentGroupName(e.target.value)}
          placeholder="Student Group Name"
          id="studentGroupName"
          isRequired
        ></Input>
        <Button type="submit">Create</Button>
      </form>
      {studentGroupDocuments.data?.map(doc => {
        return <StudentGroup key={doc.docId} doc={doc} userId={user.uid} />
      })}
    </>
  )
}

export default StudentGroups
