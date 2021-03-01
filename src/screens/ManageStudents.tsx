import * as React from 'react'
import { Heading, Box } from '@chakra-ui/react'
import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire'
import { IStudent } from 'interfacesAndTypes'
import Student from 'components/Student'
import { useHistory } from 'react-router-dom'
import { PageContentsBox } from 'styles'
import HeadingBoxWithBackButton from 'components/HeadingBoxWithBackButton'
import Header from 'components/Header'

const ManageStudents: React.FC = () => {
  const { data: user } = useUser()

  const history = useHistory()

  const teacherRef = useFirestore().collection('teachers').doc(user.uid)
  const allStudentsRef = teacherRef.collection('students')
  const allStudentsDocuments = useFirestoreCollectionData<IStudent & { docId: string }>(allStudentsRef, {
    idField: 'docId',
  }).data

  const backHandler = () => {
    history.push('/')
  }

  return (
    <PageContentsBox>
      <Header />
      {/* <HeadingBoxWithBackButton backHandler={backHandler}>
        <Heading as="h1">All Students</Heading>
      </HeadingBoxWithBackButton> */}
      <Heading as="h1" size="lg" marginTop="1rem">
        All Students
      </Heading>
      <Box width="100%" maxHeight="75vh" minHeight="6rem" overflowY="auto">
        {allStudentsDocuments?.map(doc => {
          return <Student key={doc.docId} studentName={doc.studentName} docId={doc.docId} />
        })}
      </Box>
    </PageContentsBox>
  )
}

export default ManageStudents
