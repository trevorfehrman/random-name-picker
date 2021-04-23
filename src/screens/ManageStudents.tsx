import * as React from 'react'
import { Flex, useDisclosure, Box } from '@chakra-ui/react'
import Student from 'components/Student'
import { BodyBox } from 'styles'
import CreateNewStudentModal from 'components/CreateNewStudentModal'
import PlusButton from 'components/UI/PlusButton'
import Header from 'components/Header'
import { useStudents } from 'helpers/firestoreHooks'

const ManageStudents: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { studentDocuments } = useStudents()

  return (
    <Box height="100vh" overflowY="hidden">
      <Header />
      <BodyBox>
        <Flex width="100%" minHeight="6rem" flexDirection="column">
          {studentDocuments?.map(doc => {
            return <Student key={doc.docId} student={doc} />
          })}
        </Flex>
        <PlusButton onOpen={onOpen} />
        <CreateNewStudentModal onClose={onClose} isOpen={isOpen} />
      </BodyBox>
    </Box>
  )
}

export default ManageStudents
