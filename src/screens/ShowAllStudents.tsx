import * as React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useUser, useFirestore, useFirestoreCollectionData, useFirestoreDocData } from 'reactfire'
import { Heading, Box } from '@chakra-ui/react'
import { IStudentInStudentGroup, GroupParams, IStudentGroup } from 'interfacesAndTypes'
import StudentInGroup from 'components/StudentInGroup'
import HeadingBoxWithBackButton from 'components/HeadingBoxWithBackButton'
import { PageContentsBox } from 'styles'

const ShowAllStudents: React.FC = () => {
  const params: GroupParams = useParams()
  const history = useHistory()
  const studentGroupId = params.groupId
  const { data: user } = useUser()

  const teacherRef = useFirestore().collection('teachers').doc(user.uid)

  const studentGroupRef = teacherRef.collection('studentGroups').doc(studentGroupId)
  const studentGroupDoc = useFirestoreDocData<IStudentGroup & { docId: string }>(studentGroupRef).data
  const studentsInStudentGroupsRef = teacherRef.collection('studentsInStudentGroups')

  const studentsInThisStudentGroupRef = studentsInStudentGroupsRef.where('studentGroupId', '==', studentGroupId)
  const studentsInThisStudentGroupDocuments = useFirestoreCollectionData<IStudentInStudentGroup & { docId: string }>(
    studentsInThisStudentGroupRef,
    { idField: 'docId' },
  ).data

  const backHandler = () => {
    history.push(`/student-group/${studentGroupId}`)
  }

  return (
    <PageContentsBox>
      <HeadingBoxWithBackButton backHandler={backHandler}>
        <Heading as="h1">{`All Students `}</Heading>
        <Heading as="h2" size="md">
          {`in ${studentGroupDoc?.studentGroupName}`}
        </Heading>
      </HeadingBoxWithBackButton>
      <Box w="100%" margin="1rem 0">
        {studentsInThisStudentGroupDocuments?.map(doc => {
          return (
            <StudentInGroup selected={doc.selected} key={doc.docId} student={doc} studentInStudentGroupId={doc.docId} />
          )
        })}
      </Box>
    </PageContentsBox>
  )
}

export default ShowAllStudents
