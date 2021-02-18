import * as React from 'react'
import { Heading } from '@chakra-ui/react'
import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire'
import { IStudentInGroup } from 'interfacesAndTypes/interfacesAndTypes'
import Student from 'components/Student'

const ManageStudents: React.FC = () => {
  const { data: user } = useUser()

  const teacherRef = useFirestore().collection('teachers').doc(user.uid)
  const allStudentsRef = teacherRef.collection('students')
  const allStudentsDocuments = useFirestoreCollectionData<IStudentInGroup & { docId: string }>(allStudentsRef, {
    idField: 'docId',
  }).data

  return (
    <>
      <Heading as="h1">All Students</Heading>
      {allStudentsDocuments?.map(doc => {
        return <Student key={doc.docId} studentName={doc.studentName} docId={doc.docId} />
      })}
    </>
  )
}

export default ManageStudents
