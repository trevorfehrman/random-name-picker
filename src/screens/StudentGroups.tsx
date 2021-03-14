import * as React from 'react'
import 'firebase/firestore'

import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire'

import StudentGroupPreview from 'components/StudentGroupPreview'
import { IStudentGroup } from 'interfacesAndTypes'
import styled from '@emotion/styled'
import { PageContentsBox } from 'styles'
import Header from 'components/Header'
import { Button, Heading, useDisclosure } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import CreateNewStudentGroupModal from 'components/CreateNewStudentGroupModal'

const GroupBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-height: 60%;
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
    <PageContentsBox>
      <Header />
      <Heading as="h1" margin=".5rem 0 2rem 0" letterSpacing="wide" color="blue.800" fontWeight="500">
        Manage Groups
      </Heading>
      <Button onClick={onOpen} alignSelf="flex-end" marginBottom=".5rem">
        <AddIcon marginRight=".5rem" />
        New Student Group
      </Button>
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
      <CreateNewStudentGroupModal isOpen={isOpen} onClose={onClose} />
    </PageContentsBox>
  )
}

export default StudentGroups
