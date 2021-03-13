import * as React from 'react'
import { Heading, Flex, Button, useDisclosure } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire'
import { IStudent } from 'interfacesAndTypes'
import Student from 'components/Student'
import { PageContentsBox } from 'styles'
import Header from 'components/Header'
import CreateNewStudentModal from 'components/CreateNewStudentModal'

const ManageStudents: React.FC = () => {
  const { data: user } = useUser()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const teacherRef = useFirestore().collection('teachers').doc(user.uid)
  const allStudentsRef = teacherRef.collection('students')
  const allStudentsDocuments = useFirestoreCollectionData<IStudent & { docId: string }>(allStudentsRef, {
    idField: 'docId',
  }).data

  return (
    <PageContentsBox>
      <Header />
      <Heading as="h1" size="lg" margin="1rem 0">
        Manage Students
      </Heading>
      <Flex width="100%" minHeight="6rem" flexDirection="column">
        <Button alignSelf="flex-end" marginBottom=".5rem" onClick={onOpen}>
          <AddIcon marginRight=".5rem" />
          New Student
        </Button>
        {allStudentsDocuments?.map(doc => {
          return <Student key={doc.docId} studentName={doc.studentName} docId={doc.docId} />
        })}
      </Flex>
      <CreateNewStudentModal onClose={onClose} isOpen={isOpen} />
    </PageContentsBox>
  )
}

export default ManageStudents
