import * as React from 'react'
import 'firebase/firestore'

import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire'

import StudentGroupPreview from 'components/StudentGroupPreview'
import { IStudentGroup } from 'interfacesAndTypes'
import styled from '@emotion/styled'
import { PageContentsBox } from 'styles'
import { useDisclosure } from '@chakra-ui/react'
import CreateNewStudentGroupModal from 'components/CreateNewStudentGroupModal'
import PlusButton from 'components/UI/PlusButton'
import Header from 'components/Header'

const GroupBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const StudentGroups: React.FC = () => {
  const { data: user } = useUser()

  const { isOpen, onClose, onOpen } = useDisclosure()

  const studentGroupsRef = useFirestore().collection('teachers').doc(user.uid).collection('studentGroups')
  const studentGroupsDocuments = useFirestoreCollectionData<IStudentGroup & { docId: string }>(studentGroupsRef, {
    idField: 'docId',
  })

  return (
    <>
      <Header />
      <PageContentsBox>
        {/* <Heading as="h1" margin="1rem 0 2rem 0" letterSpacing="wide" color="var(--main-color-very-dark)" fontWeight="500">
        Manage Groups
      </Heading> */}

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
          <PlusButton onOpen={onOpen} />
        </GroupBox>
        <CreateNewStudentGroupModal isOpen={isOpen} onClose={onClose} />
      </PageContentsBox>
    </>
  )
}

export default StudentGroups
