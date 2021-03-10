import * as React from 'react'
import { Heading, Box } from '@chakra-ui/react'
import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire'
import { IStudent } from 'interfacesAndTypes'
import Student from 'components/Student'
import { PageContentsBox } from 'styles'
import Header from 'components/Header'

const ManageStudents: React.FC = () => {
  const { data: user } = useUser()

  const teacherRef = useFirestore().collection('teachers').doc(user.uid)
  const allStudentsRef = teacherRef.collection('students')
  const allStudentsDocuments = useFirestoreCollectionData<IStudent & { docId: string }>(allStudentsRef, {
    idField: 'docId',
  }).data

  return (
    <PageContentsBox>
      <Header />
      <Heading as="h1" size="lg" marginTop="1rem">
        All Students
      </Heading>
      <Box width="100%" minHeight="6rem">
        {allStudentsDocuments?.map(doc => {
          return <Student key={doc.docId} studentName={doc.studentName} docId={doc.docId} />
        })}
      </Box>
    </PageContentsBox>
  )
}

export default ManageStudents
