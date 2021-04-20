import * as React from 'react'
import { Flex, useDisclosure, Box } from '@chakra-ui/react'
import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire'
import { IStudent } from 'interfacesAndTypes'
import Student from 'components/Student'
import { BodyBox } from 'styles'
import CreateNewStudentModal from 'components/CreateNewStudentModal'
import PlusButton from 'components/UI/PlusButton'
import Header from 'components/Header'

const ManageStudents: React.FC = () => {
  const { data: user } = useUser()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const teacherRef = useFirestore().collection('teachers').doc(user.uid)
  const allStudentsRef = teacherRef.collection('students')
  const allStudentsDocuments = useFirestoreCollectionData<IStudent & { docId: string }>(allStudentsRef, {
    idField: 'docId',
  }).data

  return (
    <Box height="100vh" overflowY="hidden">
      <Header />
      <BodyBox>
        <Flex width="100%" minHeight="6rem" flexDirection="column">
          {allStudentsDocuments?.map(doc => {
            return <Student key={doc.docId} student={doc} docId={doc.docId} />
          })}
        </Flex>
        <PlusButton onOpen={onOpen} />
        <CreateNewStudentModal onClose={onClose} isOpen={isOpen} />
      </BodyBox>
    </Box>
  )
}

export default ManageStudents
