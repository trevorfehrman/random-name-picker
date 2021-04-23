import * as React from 'react'
import 'firebase/firestore'

import { useUser } from 'reactfire'

import StudentGroupPreview from 'components/StudentGroupPreview'
import styled from '@emotion/styled'
import { BodyBox } from 'styles'
import { useDisclosure, Box } from '@chakra-ui/react'
import CreateNewStudentGroupModal from 'components/CreateNewStudentGroupModal'
import PlusButton from 'components/UI/PlusButton'
import Header from 'components/Header'
import { useStudentGroups } from 'helpers/firestoreHooks'

const GroupBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 4rem;
`

const StudentGroups: React.FC = () => {
  const { data: user } = useUser()

  const { isOpen, onClose, onOpen } = useDisclosure()

  const { studentGroupsDocuments } = useStudentGroups()

  return (
    <Box height="100vh" overflowY="hidden">
      <Header />
      <BodyBox>
        <GroupBox>
          {studentGroupsDocuments?.map(doc => {
            return (
              <StudentGroupPreview
                key={doc.docId}
                studentGroupId={doc.docId}
                studentGroupName={doc.studentGroupName}
                userId={user.uid}
              />
            )
          })}
          <PlusButton onOpen={onOpen} />
        </GroupBox>
        <CreateNewStudentGroupModal isOpen={isOpen} onClose={onClose} />
      </BodyBox>
    </Box>
  )
}

export default StudentGroups
