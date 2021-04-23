import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useStudentsInThisStudentGroup } from 'helpers/firestoreHooks'
import EditableStudentGroupName from 'components/EditableStudentGroupName'
import { BodyBox } from 'styles'
import { Button, IconButton, useDisclosure, Flex, Box } from '@chakra-ui/react'
import StudentToManage from 'components/StudentToManage'
import { DeleteIcon } from '@chakra-ui/icons'
import AddExistingStudentsModal from 'components/AddExisitingStudentsModal'

type ManageGroupParams = {
  studentGroupId: string
}

const ManageGroup: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const params: ManageGroupParams = useParams()
  const history = useHistory()
  const studentGroupId = params.studentGroupId

  const { studentsInThisStudentGroupDocuments } = useStudentsInThisStudentGroup(studentGroupId)

  const backHandler = () => {
    history.push(`/student-group/${studentGroupId}`)
  }

  return (
    <>
      <BodyBox>
        <EditableStudentGroupName studentGroupId={studentGroupId} />
        <Button
          backgroundColor="var(--white)"
          color="var(--main-color-medium)"
          fontSize="1.25rem"
          border="1px solid var(--main-color-medium)"
          width="14rem"
          minHeight="3rem"
          letterSpacing=".1rem"
          margin="1rem auto"
          onClick={onOpen}
        >
          + ADD STUDENTS
        </Button>
        <Flex
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          width="100%"
          _last={{ marginBottom: '5rem' }}
        >
          {studentsInThisStudentGroupDocuments?.map(studentInThisGroup => {
            return <StudentToManage key={studentInThisGroup.docId} student={studentInThisGroup} />
          })}
        </Flex>
      </BodyBox>
      <Flex
        alignItems="center"
        justifyContent="flex-end"
        position="absolute"
        width="100%"
        height="5rem"
        backgroundColor="var(--grey-very-light)"
        left="0"
        bottom="0"
      >
        <Button
          height="3rem"
          width="10rem"
          marginRight="1rem"
          backgroundColor="var(--main-color-medium)"
          color="var(--white)"
          fontSize="1.1rem"
          fontWeight="600"
          onClick={backHandler}
        >
          BACK TO GROUP
        </Button>
      </Flex>
      <IconButton
        icon={<DeleteIcon fontSize="2rem" />}
        width="4.8rem"
        height="4.8rem"
        position="absolute"
        bottom="6.5rem"
        right="1.5rem"
        borderRadius="50%"
        backgroundColor="var(--main-color-medium)"
        aria-label="trash button"
        color="var(--white)"
      ></IconButton>
      <AddExistingStudentsModal onClose={onClose} isOpen={isOpen} studentGroupId={studentGroupId} />
    </>
  )
}

export default ManageGroup
