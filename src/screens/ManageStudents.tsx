import * as React from 'react'
import { Flex, useDisclosure, Box } from '@chakra-ui/react'
import Student from 'components/Student'
import { BodyBox } from 'styles'
import CreateNewStudentModal from 'components/CreateNewStudentModal'
import PlusButton from 'components/UI/PlusButton'
import Header from 'components/Header'
import { useStudents } from 'helpers/firestoreHooks'
import styled from '@emotion/styled'

const StudentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 7rem;
`

const ManageStudents: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { studentDocuments } = useStudents()

  return (
    <Box height="100vh" overflowY="hidden">
      <Header />
      <BodyBox>
        <StudentBox>
          {studentDocuments?.map(doc => {
            return <Student key={doc.docId} student={doc} />
          })}
        </StudentBox>
        <CreateNewStudentModal onClose={onClose} isOpen={isOpen} />
      </BodyBox>
      <PlusButton onOpen={onOpen} />
    </Box>
  )
}

export default ManageStudents
