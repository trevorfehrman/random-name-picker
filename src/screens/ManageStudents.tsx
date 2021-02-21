import * as React from 'react'
import { Heading, Box } from '@chakra-ui/react'
import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire'
import { IStudent } from 'interfacesAndTypes'
import Student from 'components/Student'
import { useHistory } from 'react-router-dom'
import { PageContentsBox } from 'styles'
import HeadingBoxWithBackButton from 'components/HeadingBoxWithBackButton'

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
      <HeadingBoxWithBackButton backHandler={backHandler}>
        <Heading as="h1">All Students</Heading>
      </HeadingBoxWithBackButton>
      <Box width="90%" border="1px solid black" maxHeight="500px" minHeight="100px" padding="10px" overflowY="auto">
        {allStudentsDocuments?.map(doc => {
          return <Student key={doc.docId} studentName={doc.studentName} docId={doc.docId} />
        })}
      </Box>
    </PageContentsBox>
  )
}

export default ManageStudents
