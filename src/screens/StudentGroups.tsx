import * as React from 'react'
import 'firebase/firestore'

import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire'
import { Button, Heading } from '@chakra-ui/react'

import StudentGroupPreview from 'components/StudentGroupPreview'
import { IStudentGroup } from 'interfacesAndTypes'
import NewStudentGroup from 'components/NewStudentGroup'
import { useHistory } from 'react-router-dom'
import styled from '@emotion/styled'
import { PageContentsBox } from 'styles'
import Header from 'components/Header'

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
  const history = useHistory()

  const studentGroupsRef = useFirestore().collection('teachers').doc(user.uid).collection('studentGroups')
  const studentGroupsDocuments = useFirestoreCollectionData<IStudentGroup & { docId: string }>(studentGroupsRef, {
    idField: 'docId',
  })

  return (
    <PageContentsBox>
      <Header />
      <NewStudentGroup studentGroupsRef={studentGroupsRef} />
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
    </PageContentsBox>
  )
}

export default StudentGroups
