import * as React from 'react'
import 'firebase/firestore'

import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire'
import styled from '@emotion/styled'

import { IStudentGroup } from 'interfacesAndTypes'
import { PageContentsBox } from 'styles'

import { useDisclosure, IconButton } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

import CreateNewStudentGroupModal from 'components/CreateNewStudentGroupModal'
import StudentGroupPreview from 'components/StudentGroupPreview'

const GroupBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  overflow-y: auto;
`

const StudentGroups: React.FC = () => {
  const { data: user } = useUser()

  const { isOpen, onClose, onOpen } = useDisclosure()

  const studentGroupsRef = useFirestore().collection('teachers').doc(user.uid).collection('studentGroups')
  const studentGroupsDocuments = useFirestoreCollectionData<IStudentGroup & { docId: string }>(studentGroupsRef, {
    idField: 'docId',
  })

  return (
    <PageContentsBox style={{ position: 'relative', height: '88vh' }}>
      <GroupBox>
        {studentGroupsDocuments.data?.map(doc => {
          return (
            <StudentGroupPreview
              key={doc.docId}
              studentGroupId={doc.docId}
              studentGroupName={doc.studentGroupName}
              userId={user.uid}
            />
          )
        })}
      </GroupBox>
      <IconButton
        style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem' }}
        isRound
        size="lg"
        aria-label="Add Group"
        onClick={onOpen}
        icon={<AddIcon />}
      ></IconButton>
      <CreateNewStudentGroupModal isOpen={isOpen} onClose={onClose} />
    </PageContentsBox>
  )
}

export default StudentGroups
