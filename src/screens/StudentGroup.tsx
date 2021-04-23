import * as React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import 'firebase/firestore'
import { useFirestore } from 'reactfire'
import { Button, Box, Heading, Flex } from '@chakra-ui/react'
import { IStudentInStudentGroup, GroupParams } from 'interfacesAndTypes'
import FullScreenDisplay from 'components/FullScreenDisplay'
import { BodyBox } from 'styles'
import NameDisplay from 'components/NameDisplay'
import StudentList from 'components/StudentList'
import {
  addSelectedStudentFactAndRefillStudentFactsIfEmpty,
  resetSelectedStatusOnStudents,
  updateStudentFactsOnFirebase,
} from 'helpers/student-group-helpers'
import BackButton from 'components/UI/BackButton'
import {
  useStudentGroup,
  useStudents,
  useStudentsInStudentGroups,
  useStudentsInThisStudentGroup,
  useUnselectedStudents,
} from 'helpers/firestoreHooks'

const StudentGroup: React.FC = () => {
  const [noStudentSelected, setNoStudentSelected] = React.useState(true)
  const [unselected, setUnselected] = React.useState<IStudentInStudentGroup[]>([])
  const [fullScreenDisplayIsOpen, setFullScreenDisplayIsOpen] = React.useState(false)

  const history = useHistory()
  const params: GroupParams = useParams()
  const studentGroupId = params.groupId

  const { studentGroupDocument, studentGroupRef } = useStudentGroup(studentGroupId)

  const { studentDocuments } = useStudents()

  const { studentsInThisStudentGroupRef, studentsInThisStudentGroupDocuments } = useStudentsInThisStudentGroup(
    studentGroupId,
  )
  const studentsInStudentGroupsRef = useStudentsInStudentGroups()
  const { unselectedStudentsDocuments } = useUnselectedStudents(studentGroupId)

  React.useEffect(() => {
    unselectedStudentsDocuments &&
      setUnselected(
        unselectedStudentsDocuments.sort((a: IStudentInStudentGroup, b: IStudentInStudentGroup) => a.order - b.order),
      )
  }, [unselectedStudentsDocuments])

  const backHandler = () => {
    history.push('/')
  }

  const updateBatch = useFirestore().batch()

  const selectStudentAndStudentFactHandler = async () => {
    if (unselected.length === 0) {
      console.log('made it here')
      return
    }
    const selectedStudent = unselected[0]
    console.log(selectedStudent)
    const { selectedStudentWithStudentFact, updatedStudentFacts } = addSelectedStudentFactAndRefillStudentFactsIfEmpty(
      selectedStudent,
      studentDocuments,
    )
    try {
      await updateStudentFactsOnFirebase(studentsInStudentGroupsRef, selectedStudent, updatedStudentFacts)

      if (unselected.length <= 1) {
        await resetSelectedStatusOnStudents(
          updateBatch,
          studentsInThisStudentGroupDocuments,
          studentsInThisStudentGroupRef,
        )
      } else {
        await studentsInStudentGroupsRef.doc(selectedStudent.docId).update({
          selected: true,
        })
      }
      await studentGroupRef.update({ selectedStudent: selectedStudentWithStudentFact })
      setNoStudentSelected(false)
    } catch (err) {
      console.log(err)
    }
  }

  const openManageGroupPageHandler = () => {
    history.push(`/manage-group/${studentGroupId}`)
  }

  return (
    <>
      <BodyBox>
        <Box
          position="relative"
          width="92%"
          maxWidth="28rem"
          height="2.5rem"
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <BackButton backHandler={backHandler} />
          <Heading as="h3" size="sm" textAlign="end">
            {studentGroupDocument?.studentGroupName}
          </Heading>
          {/* <EditableStudentGroupName studentGroupId={studentGroupId} /> */}
        </Box>
        <Box width="85vw" maxWidth="40rem" maxHeight="40rem">
          <NameDisplay
            selectedStudent={studentGroupDocument?.selectedStudent}
            setFullScreenDisplayIsOpen={setFullScreenDisplayIsOpen}
            selectStudentAndStudentFactHandler={selectStudentAndStudentFactHandler}
            noStudentSelected={noStudentSelected}
          />
        </Box>

        {/* <Button alignSelf="flex-end" marginBottom=".3rem" onClick={onOpen}>
          <Icon as={BiUserPlus} marginRight=".5rem" fontSize="2rem" />
          Add Students
        </Button> */}
        <Box
          width="100%"
          height="4.8rem"
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          overflowY="hidden"
          marginTop=".3rem"
          maxWidth="30rem"
        >
          <Box width="52%" height="100%" padding=".1rem" borderRadius="3px">
            {studentsInThisStudentGroupDocuments?.length === 0 ? (
              <Flex width="100%" height="100%" direction="column" onClick={openManageGroupPageHandler}>
                <Heading textTransform="uppercase" as="h3" size="md" color="var(--main-color-medium)">
                  click here
                </Heading>
                <Heading as="h3" size="sm">
                  to add students
                </Heading>
              </Flex>
            ) : (
              <StudentList
                studentsInThisStudentGroup={studentsInThisStudentGroupDocuments
                  ?.sort((a, b) => {
                    return a.order - b.order
                  })
                  .sort((a, b) => {
                    return +a.selected - +b.selected
                  })}
                selectedStudentId={studentGroupDocument?.selectedStudent?.studentId}
                openManageGroupPageHandler={openManageGroupPageHandler}
              />
            )}
          </Box>
          <Button
            minWidth="28%"
            height="4.8rem"
            backgroundColor="var(--white)"
            color="var(--main-color-medium)"
            border="1px solid var(--main-color-medium)"
            fontSize="2rem"
            onClick={selectStudentAndStudentFactHandler}
          >
            NEXT
          </Button>
        </Box>

        <FullScreenDisplay
          modalHeadingText="FullScreenMode"
          onClose={() => setFullScreenDisplayIsOpen(false)}
          isOpen={fullScreenDisplayIsOpen}
          selectStudentAndStudentFactHandler={selectStudentAndStudentFactHandler}
        >
          <NameDisplay
            selectedStudent={studentGroupDocument?.selectedStudent}
            isFullScreen
            setFullScreenDisplayIsOpen={setFullScreenDisplayIsOpen}
            selectStudentAndStudentFactHandler={selectStudentAndStudentFactHandler}
            noStudentSelected={noStudentSelected}
          />
        </FullScreenDisplay>
      </BodyBox>
    </>
  )
}

export default StudentGroup
