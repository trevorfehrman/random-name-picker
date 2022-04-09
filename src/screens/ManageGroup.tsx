import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useStudentsInThisStudentGroup, useStudentsInStudentGroups, useStudentGroup } from 'helpers/firestoreHooks'
import {
  Button,
  IconButton,
  useDisclosure,
  Flex,
  Checkbox,
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'
import StudentToManage from 'components/StudentToManage'
import { DeleteIcon } from '@chakra-ui/icons'
import AddExistingStudentsModal from 'components/AddExisitingStudentsModal'
import { useFirestore } from 'reactfire'
import { InstructionText } from 'components/UI/InstructionText'

type ManageGroupParams = {
  studentGroupId: string
}

const ManageGroup: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const params: ManageGroupParams = useParams()
  const history = useHistory()
  const studentGroupId = params.studentGroupId
  const [selectedStudents, setSelectedStudents] = React.useState<string[]>([])
  const [shouldBounce, setShouldBounce] = React.useState(false)

  const { studentsInThisStudentGroupDocuments } = useStudentsInThisStudentGroup(studentGroupId)

  const { studentGroupDocument, studentGroupRef } = useStudentGroup(studentGroupId)

  const studentsInStudentGroupsRef = useStudentsInStudentGroups()

  const backHandler = () => {
    history.push(`/student-group/${studentGroupId}`)
  }

  const thereAreNoStudentsInThisGroup = studentsInThisStudentGroupDocuments?.length === 0

  React.useEffect(() => {
    if (thereAreNoStudentsInThisGroup) {
      setShouldBounce(true)
    }
  }, [thereAreNoStudentsInThisGroup])

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

  const handleOpen = () => {
    setShouldBounce(false)
    onOpen()
  }

  const editStudentGroupNameHandler = (value: string) => {
    studentGroupRef.update({ studentGroupName: value }).catch(err => {
      console.log(err)
    })
  }

  return (
    <>
      <Flex direction="column" w="95%" maxW="50rem" marginX="auto">
        <Flex w="100%" justify="center">
          <FormControl display="flex" flexDirection="column" w="100%" marginY="2rem">
            <FormLabel whiteSpace="nowrap">Group Name:</FormLabel>
            <Input
              fontSize="1.3rem"
              padding="1rem"
              defaultValue={studentGroupDocument?.studentGroupName}
              onBlur={e => {
                editStudentGroupNameHandler(e.target.value)
              }}
            ></Input>
          </FormControl>
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
          onClick={handleOpen}
          className={shouldBounce ? 'bounce' : ''}
        >
          + ADD STUDENTS
        </Button>

        {thereAreNoStudentsInThisGroup ? (
          <InstructionText>This is where your students will be listed. Click add students!</InstructionText>
        ) : null}

        <Flex
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          width="100%"
          _last={{ marginBottom: '7rem' }}
        >
          {studentsInThisStudentGroupDocuments?.length > 1 ? (
            <>
              <Heading as="h2">Students in this group:</Heading>
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
      </Flex>
      <Box display="block" position="fixed" bottom="0" left="0" h="5rem" w="full">
        <Flex
          alignItems="center"
          justifyContent="flex-end"
          position="absolute"
          width="100%"
          height="5rem"
          backgroundColor="var(--grey-very-light)"
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
      </Box>

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
