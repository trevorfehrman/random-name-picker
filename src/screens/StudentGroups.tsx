import * as React from 'react'
import 'firebase/firestore'

import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire'
import { Button } from '@chakra-ui/react'

import StudentGroupPreview from 'components/StudentGroupPreview'
import { IStudentGroup } from 'interfacesAndTypes/interfacesAndTypes'
import NewStudentGroup from 'components/NewStudentGroup'
import { useHistory } from 'react-router-dom'
import styled from '@emotion/styled'
import { PageContentsBox } from 'styles'

const GroupBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem auto;
  width: 100%;
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
    // <Flex w="100%" direction="column" align="center"></Flex>
    <PageContentsBox>
      <NewStudentGroup studentGroupsRef={studentGroupsRef} />
      <Button onClick={manageStudentsHandler} alignSelf="center">
        Manage Students
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
    </PageContentsBox>
  )
}

export default StudentGroups
