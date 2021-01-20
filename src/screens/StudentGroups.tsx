import * as React from 'react'
import { useHistory } from 'react-router-dom'
// import { useForm } from 'react-hook-form'
import 'firebase/firestore'

import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire'

import { FormErrorMessage, FormLabel, FormControl, Input, Button } from '@chakra-ui/react'

import StudentGroupPreview from 'components/StudentGroupPreview'

const StudentGroups: React.FC = () => {
  const [studentGroupName, setStudentGroupName] = React.useState('')

  // const { handleSubmit, errors, register, formState } = useForm<FormData>()

  const { data: user } = useUser()

  const history = useHistory()

  // const studentGroupsRef = useFirestore().collection('teachers').doc(user.uid).collection('studentGroups')
  // const studentGroupsData = useFirestoreCollectionData(studentGroupsRef)

  // type FormData = {
  //   studentGroupName: string
  // }

  //Steve is the druel-ist.
  interface IStudentGroup {
    studentGroupName: string
    students: []
    docId: string
  }

  const studentGroupsRef = useFirestore().collection('teachers').doc(user.uid).collection('studentGroups')
  const studentGroupsDocuments = useFirestoreCollectionData<IStudentGroup & { docId: string }>(studentGroupsRef, {
    idField: 'docId',
  })

  async function submitHandler(e: React.BaseSyntheticEvent | undefined) {
    e?.preventDefault()
    try {
      const result = await studentGroupsRef.add({
        studentGroupName: studentGroupName,
        students: [],
      })
      console.log(result.id)
      history.push('/student-group/' + result.id)
    } catch (err) {
      console.log(err)
    }

    e?.target.reset()
  }

  return (
    <>
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
      {studentGroupsDocuments.data?.map(doc => {
        return <StudentGroupPreview key={doc.docId} doc={doc} userId={user.uid} />
      })}
    </>
  )
}

export default StudentGroups
