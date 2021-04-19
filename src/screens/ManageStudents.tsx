import * as React from 'react'
import { Flex, useDisclosure } from '@chakra-ui/react'
import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire'
import { IStudent } from 'interfacesAndTypes'
import Student from 'components/Student'
import { PageContentsBox } from 'styles'
import CreateNewStudentModal from 'components/CreateNewStudentModal'
import PlusButton from 'components/UI/PlusButton'

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
      <Flex width="100%" minHeight="6rem" flexDirection="column">
        {allStudentsDocuments?.map(doc => {
          return <Student key={doc.docId} student={doc} docId={doc.docId} />
        })}
      </Flex>
      <PlusButton onOpen={onOpen} />
      <CreateNewStudentModal onClose={onClose} isOpen={isOpen} />
    </PageContentsBox>
  )
}

export default ManageStudents
