import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useStudentsInThisStudentGroup, useStudentsInStudentGroups } from 'helpers/firestoreHooks'
import EditableStudentGroupName from 'components/EditableStudentGroupName'
import { BodyBox } from 'styles'
import { Button, IconButton, useDisclosure, Flex, Checkbox, Heading } from '@chakra-ui/react'
import StudentToManage from 'components/StudentToManage'
import { DeleteIcon } from '@chakra-ui/icons'
import AddExistingStudentsModal from 'components/AddExisitingStudentsModal'
import { useFirestore } from 'reactfire'

type ManageGroupParams = {
  studentGroupId: string
}

const ManageGroup: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const params: ManageGroupParams = useParams()
  const history = useHistory()
  const studentGroupId = params.studentGroupId
  const [selectedStudents, setSelectedStudents] = React.useState<string[]>([])

  const { studentsInThisStudentGroupDocuments } = useStudentsInThisStudentGroup(studentGroupId)

  const studentsInStudentGroupsRef = useStudentsInStudentGroups()

  const backHandler = () => {
    history.push(`/student-group/${studentGroupId}`)
  }

  const selectAllHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
    const selection: string[] = []
    if (selectedStudents.length < studentsInThisStudentGroupDocuments.length) {
      studentsInThisStudentGroupDocuments.forEach(studentInThisGroup => {
        selection.push(studentInThisGroup.docId)
      })
    }
    setSelectedStudents(selection)
  }

  const removeBatch = useFirestore().batch()

  const removeHandler = () => {
    selectedStudents.forEach(selectedStudentId => {
      removeBatch.delete(studentsInStudentGroupsRef.doc(selectedStudentId))
    })
    removeBatch.commit().then(() => {
      setSelectedStudents([])
    })
  }

  return (
    <>
      <BodyBox>
        <Flex>
          <EditableStudentGroupName studentGroupId={studentGroupId} />
        </Flex>

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
          _last={{ marginBottom: '7rem' }}
        >
          {studentsInThisStudentGroupDocuments?.length > 1 ? (
            <>
              <Checkbox
                spacing="1rem"
                margin="1rem 0 .5rem 0"
                onClick={selectAllHandler}
                isChecked={selectedStudents.length === studentsInThisStudentGroupDocuments?.length}
              >
                <Heading as="h3" size="md" fontWeight="700">
                  Select All
                </Heading>
              </Checkbox>
              <hr style={{ width: '100%' }} />
            </>
          ) : null}

          {studentsInThisStudentGroupDocuments?.map(studentInThisGroup => {
            return (
              <StudentToManage
                key={studentInThisGroup.docId}
                student={studentInThisGroup}
                selectedStudents={selectedStudents}
                onCheck={setSelectedStudents}
              />
            )
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
      {selectedStudents.length > 0 ? (
        <IconButton
          icon={<DeleteIcon fontSize="2rem" />}
          width="4rem"
          height="4rem"
          position="absolute"
          bottom="6rem"
          right="1rem"
          borderRadius="50%"
          backgroundColor="var(--main-color-medium)"
          aria-label="trash button"
          color="var(--white)"
          onClick={removeHandler}
        ></IconButton>
      ) : null}
      <AddExistingStudentsModal onClose={onClose} isOpen={isOpen} studentGroupId={studentGroupId} />
    </>
  )
}

export default ManageGroup
