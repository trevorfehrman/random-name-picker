import React from 'react'
import FooterWithButtons from 'components/UI/FooterWithButtons'
import { useParams } from 'react-router-dom'
import { useStudentsInThisStudentGroup } from 'helpers/firestoreHooks'
import EditableStudentGroupName from 'components/EditableStudentGroupName'
import { BodyBox } from 'styles'
import { Flex } from '@chakra-ui/layout'
import { Button } from '@chakra-ui/button'

type ManageGroupParams = {
  studentGroupId: string
}

const ManageGroup: React.FC = () => {
  const params: ManageGroupParams = useParams()
  const studentGroupId = params.studentGroupId

  const { studentsInThisStudentGroupDocuments } = useStudentsInThisStudentGroup(studentGroupId)

  //   const teacherRef = useFirestore().collection('teachers')

  return (
    <BodyBox>
      <EditableStudentGroupName studentGroupId={studentGroupId} />
      <Button
        backgroundColor="var(--white)"
        color="var(--main-color-medium)"
        fontSize="1.25rem"
        border="1px solid var(--main-color-medium)"
        width="14rem"
        height="3rem"
        letterSpacing=".1rem"
        margin="1rem auto"
      >
        + ADD STUDENTS
      </Button>
      <Flex direction="column" justifyContent="flex-start" alignItems="flex-start" width="100%">
        {studentsInThisStudentGroupDocuments.map(studentInThisGroup => {
          return <div key={studentInThisGroup.docId}>{studentInThisGroup.studentInfo.studentName}</div>
        })}
      </Flex>
    </BodyBox>
  )
}

export default ManageGroup
