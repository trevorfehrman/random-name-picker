import * as React from 'react'
import { useHistory } from 'react-router-dom'
// import { useForm } from 'react-hook-form'
import 'firebase/firestore'

import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire'

import { Box, FormLabel, Input, Button } from '@chakra-ui/react'

import StudentGroupPreview from 'components/StudentGroupPreview'
import { IStudentGroup } from 'interfaces and types/IStudentGroup'
import ConfirmationModal from 'components/ConfirmationModal'

const StudentGroups: React.FC = () => {
  const [studentGroupNameInput, setStudentGroupNameInput] = React.useState('')

  const { data: user } = useUser()

  const history = useHistory()

  const studentGroupsRef = useFirestore().collection('teachers').doc(user.uid).collection('studentGroups')
  const studentGroupsDocuments = useFirestoreCollectionData<IStudentGroup & { docId: string }>(studentGroupsRef, {
    idField: 'docId',
  })

  async function submitHandler(e: React.BaseSyntheticEvent | undefined) {
    e?.preventDefault()
    try {
      const result = await studentGroupsRef.add({
        studentGroupName: studentGroupNameInput,
      })
      history.push(`/student-group/${result.id}`)
    } catch (err) {
      console.log(err)
    }
    setStudentGroupNameInput('')
  }

  const manageStudentsHandler = () => {
    history.push('/manage-students')
  }

  return (
    <>
      <Box>
        <FormLabel htmlFor="studentGroupName">Student Group Name</FormLabel>
        <Input
          onChange={e => setStudentGroupNameInput(e.target.value)}
          placeholder="Student Group Name"
          id="studentGroupName"
          isRequired
        ></Input>
        <Button onClick={submitHandler}>Create</Button>
        <Button onClick={manageStudentsHandler}>Manage Students</Button>
      </Box>
      {studentGroupsDocuments.data?.map(doc => {
        return (
          <StudentGroupPreview
            key={doc.docId}
            studentGroupId={doc.docId}
            studentGroupName={doc.studentGroupName}
            userId={user.uid}
          />
        )
      })}
    </>
  )
}

export default StudentGroups
