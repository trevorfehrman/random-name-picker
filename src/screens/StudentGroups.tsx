import * as React from 'react'
import 'firebase/firestore'

import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire'
import { Button } from '@chakra-ui/react'

import StudentGroupPreview from 'components/StudentGroupPreview'
import { IStudentGroup } from 'interfacesAndTypes'
import NewStudentGroup from 'components/NewStudentGroup'
import { useHistory } from 'react-router-dom'
import styled from '@emotion/styled'
import { PageContentsBox } from 'styles'

const GroupBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
`

const StudentGroups: React.FC = () => {
  const { data: user } = useUser()
  const history = useHistory()

  const studentGroupsRef = useFirestore().collection('teachers').doc(user.uid).collection('studentGroups')
  const studentGroupsDocuments = useFirestoreCollectionData<IStudentGroup & { docId: string }>(studentGroupsRef, {
    idField: 'docId',
  })

  const manageStudentsHandler = () => {
    history.push('/manage-students')
  }

  return (
    <PageContentsBox>
      <NewStudentGroup studentGroupsRef={studentGroupsRef} />
      <Button onClick={manageStudentsHandler}>Manage Students</Button>
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
