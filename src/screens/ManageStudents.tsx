import * as React from 'react'
import { Heading } from '@chakra-ui/react'
import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire'
import { IStudent } from 'interfacesAndTypes/interfacesAndTypes'

const ManageStudents: React.FC = () => {
  const { data: user } = useUser()

  const teacherRef = useFirestore().collection('teachers').doc(user.uid)
  const allStudentsRef = teacherRef.collection('students')
  const allStudentsDocuments = useFirestoreCollectionData<IStudent & { docId: string }>(allStudentsRef, {
    idField: 'docId',
  }).data

  return (
    <>
      <Heading as="h1">All Students</Heading>
      {allStudentsDocuments?.map(doc => {
        return <div key={doc.docId}>{doc.studentName}</div>
      })}
    </>
  )
}

export default ManageStudents
