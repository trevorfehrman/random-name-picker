import * as React from 'react'
import { Heading, Box } from '@chakra-ui/react'
import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire'
import { IStudentInGroup } from 'interfacesAndTypes/interfacesAndTypes'
import Student from 'components/Student'
import BackButton from 'components/UI/BackButton'
import { useHistory } from 'react-router-dom'

const ManageStudents: React.FC = () => {
  const { data: user } = useUser()

  const history = useHistory()

  const teacherRef = useFirestore().collection('teachers').doc(user.uid)
  const allStudentsRef = teacherRef.collection('students')
  const allStudentsDocuments = useFirestoreCollectionData<IStudentInGroup & { docId: string }>(allStudentsRef, {
    idField: 'docId',
  }).data

  const backHandler = () => {
    history.push('/')
  }

  return (
    <>
      <Box position="relative" h="75px" textAlign="center" padding="10px">
        <BackButton backHandler={backHandler} />
        <Heading as="h1">All Students</Heading>
      </Box>

      {allStudentsDocuments?.map(doc => {
        return <Student key={doc.docId} studentName={doc.studentName} docId={doc.docId} />
      })}
    </>
  )
}

export default ManageStudents
