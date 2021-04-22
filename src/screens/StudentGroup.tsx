import * as React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import 'firebase/firestore'
import { useFirestore, useUser, useFirestoreDocData, useFirestoreCollectionData } from 'reactfire'
import { Button, useDisclosure, Box, Heading } from '@chakra-ui/react'
import { IStudentGroup, IStudent, IStudentInStudentGroup, GroupParams } from 'interfacesAndTypes'
import FullScreenDisplay from 'components/FullScreenDisplay'
import AddExistingStudentsModal from 'components/AddExisitingStudentsModal'
import { BodyBox } from 'styles'
import NameDisplay from 'components/NameDisplay'
import StudentList from 'components/StudentList'
import {
  addSelectedStudentFactAndRefillStudentFactsIfEmpty,
  resetSelectedStatusOnStudents,
  updateStudentFactsOnFirebase,
} from 'helpers/student-group-helpers'
import BackButton from 'components/UI/BackButton'

const StudentGroup: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [noStudentSelected, setNoStudentSelected] = React.useState(true)
  const [unselected, setUnselected] = React.useState<IStudentInStudentGroup[]>([])
  const [fullScreenDisplayIsOpen, setFullScreenDisplayIsOpen] = React.useState(false)

  const history = useHistory()
  const params: GroupParams = useParams()
  const studentGroupId = params.groupId

  const { data: user } = useUser()

  const teacherRef = useFirestore().collection('teachers').doc(user.uid)

  const studentGroupRef = teacherRef.collection('studentGroups').doc(studentGroupId)
  const studentGroupDocument = useFirestoreDocData<IStudentGroup & { docId: string }>(studentGroupRef, {
    idField: 'docId',
  }).data

  const studentsInStudentGroupsRef = teacherRef.collection('studentsInStudentGroups')

  const studentsInThisStudentGroupRef = studentsInStudentGroupsRef.where('studentGroupId', '==', studentGroupId)
  const studentsInThisStudentGroupDocuments = useFirestoreCollectionData<IStudentInStudentGroup & { docId: string }>(
    studentsInThisStudentGroupRef,
    { idField: 'docId' },
  ).data

  const unselectedStudentsRef = studentsInStudentGroupsRef
    .where('studentGroupId', '==', studentGroupId)
    .where('selected', '==', false)

  const unselectedStudentsDocuments = useFirestoreCollectionData<IStudentInStudentGroup & { docId: string }>(
    unselectedStudentsRef,
    { idField: 'docId' },
  ).data

  const studentsRef = teacherRef.collection('students')
  const studentDocuments = useFirestoreCollectionData<IStudent & { docId: string }>(studentsRef, { idField: 'docId' })
    .data

  React.useEffect(() => {
    unselectedStudentsDocuments && setUnselected(unselectedStudentsDocuments.sort((a, b) => a.order - b.order))
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

  return (
    <>
      {/* <Header /> */}
      <BodyBox>
        {/* <HeadingBoxWithBackButton backHandler={backHandler}>
          <Flex justify="flex-end" alignItems="flex-start">
            <EditableStudentGroupName studentGroupDocument={studentGroupDocument} studentGroupRef={studentGroupRef} />
          </Flex>
        </HeadingBoxWithBackButton> */}
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
              <p>click here to add students</p>
            ) : (
              <StudentList
                studentsInThisStudentGroup={studentsInThisStudentGroupDocuments
                  ?.sort((a, b) => {
                    return a.order - b.order
                  })
                  .sort((a, b) => {
                    return +a.selected - +b.selected
                  })}
                studentGroupId={studentGroupId}
                selectedStudentId={studentGroupDocument?.selectedStudent?.studentId}
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

        <AddExistingStudentsModal
          onClose={onClose}
          isOpen={isOpen}
          studentDocuments={studentDocuments}
          studentsInThisStudentGroupDocuments={studentsInThisStudentGroupDocuments}
          studentsInStudentGroupsRef={studentsInStudentGroupsRef}
          studentGroupDocument={studentGroupDocument}
          studentsRef={studentsRef}
        />

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
