import * as React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import 'firebase/firestore'
import { useFirestore } from 'reactfire'
import { Button, Box, Heading, Flex } from '@chakra-ui/react'
import { IStudentInStudentGroup, GroupParams } from 'interfacesAndTypes'
import FullScreenDisplay from 'components/FullScreenDisplay'
import NameDisplay from 'components/NameDisplay'
import StudentList from 'components/StudentList'
import {
  addSelectedStudentFactAndRefillStudentFactsIfEmpty,
  resetSelectedStatusOnStudents,
  updateStudentFactsOnFirebase,
} from 'helpers/student-group-helpers'
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
      <Box
        display="grid"
        gridTemplateRows={{ base: '3rem max-content 1fr max-content max-content', md: '5rem 5rem .5fr 2fr 1fr' }}
        gridTemplateColumns={{
          base: '1fr minmax(150px, max-content) 1fr',
          md: 'minmax(min-content, 50%) minmax(40%, 50%)',
          lg: '10% 40% 40% 10%',
          xl: '15% 35% 35% 15%',
        }}
        gridTemplateAreas={{
          base: `'backBtnGroupName   backBtnGroupName   backBtnGroupName  '
                '        .           studentName           .              '
                '        .           studentPicture        .              '
                '        .           studentFact           .              '
                'studentListNextBtn  studentListNextBtn studentListNextBtn'`,
          md: `'backBtnGroupName backBtnGroupName'
                '      .                .        '
                'studentPicture  studentName'
                'studentPicture  studentFact'
                'studentPicture  studentListNextBtn'`,
          lg: `'backBtnGroupName backBtnGroupName backBtnGroupName backBtnGroupName'
               '        .               .                .                 .       '
              '         .        studentPicture   studentName              .       '
              '         .        studentPicture   studentFact              .       '
              '         .        studentPicture   studentListNextBtn       .       '`,
        }}
        alignItems={{ base: 'center', lg: 'center' }}
        alignContent="center"
        justifyItems="center"
      >
        <Box position="relative" width="100%" display="flex" gridArea="backBtnGroupName" padding="0 2rem">
          <Heading as="h3" fontSize={{ base: '1rem', md: '1.4rem', lg: '1.7rem' }} textAlign="end" alignSelf="center">
            {studentGroupDocument?.studentGroupName}
          </Heading>
        </Box>

        <Heading
          as="h2"
          letterSpacing=".1em"
          fontSize={{ base: '1.4rem', md: '2rem', lg: '2.5rem' }}
          textAlign="left"
          alignSelf="flex-end"
          gridArea="studentName"
          justifySelf={{ base: 'end', md: 'start' }}
          padding={{ base: 'none', md: '0 2rem' }}
        >
          {!noStudentSelected && studentGroupDocument?.selectedStudent?.studentInfo.studentName}
        </Heading>
        <Box gridArea="studentPicture">
          <NameDisplay
            selectedStudent={studentGroupDocument?.selectedStudent}
            fullScreenDisplayIsOpen={fullScreenDisplayIsOpen}
            setFullScreenDisplayIsOpen={setFullScreenDisplayIsOpen}
            selectStudentAndStudentFactHandler={selectStudentAndStudentFactHandler}
            noStudentSelected={noStudentSelected}
          />
        </Box>

        <Flex
          direction="column"
          justify="flex-start"
          padding={{ base: 'none', md: '0 2rem' }}
          justifySelf="start"
          alignItems="flex-start"
          minHeight="5.5rem"
          gridArea="studentFact"
        >
          {!noStudentSelected && studentGroupDocument?.selectedStudent?.studentInfo?.selectedFact && (
            <Flex direction="column" justify="flex-start" alignItems="flex-start" lineHeight="28px">
              <Heading
                as="h2"
                fontSize={{ base: '1.1rem', md: '1.6rem', lg: '2rem' }}
                color="var(--main-color-medium)"
                width="100%"
              >
                {studentGroupDocument.selectedStudent.studentInfo.selectedFact.title}
              </Heading>

              <Heading as="h2" fontSize={{ base: '1.5rem', md: '2.3rem', lg: '3rem' }} letterSpacing=".05em">
                {studentGroupDocument.selectedStudent.studentInfo.selectedFact.value}
              </Heading>
            </Flex>
          )}
        </Flex>

        <Box
          width="100%"
          height="4.8rem"
          minHeight={{ base: 'none', lg: '7.3rem' }}
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          overflowY="hidden"
          marginTop=".3rem"
          maxWidth={{ base: '30rem', lg: '35rem' }}
          gridArea="studentListNextBtn"
          padding={{ base: '0 1rem', md: '0 2rem' }}
          justifySelf={{ base: 'center', md: 'start' }}
        >
          <Box width="100%" height="100%" borderRadius="3px">
            {studentsInThisStudentGroupDocuments?.length === 0 ? (
              <Flex
                width="100%"
                height="100%"
                direction="column"
                onClick={openManageGroupPageHandler}
                _hover={{ cursor: 'pointer' }}
              >
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
            height={{ base: '100%', lg: '80%' }}
            backgroundColor="var(--white)"
            color="var(--main-color-medium)"
            border="1px solid var(--main-color-medium)"
            fontSize="2rem"
            onClick={selectStudentAndStudentFactHandler}
            alignSelf={{ base: 'flex-end', lg: 'center' }}
            className="noHighlightOnClick"
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
            fullScreenDisplayIsOpen={fullScreenDisplayIsOpen}
            setFullScreenDisplayIsOpen={setFullScreenDisplayIsOpen}
            selectStudentAndStudentFactHandler={selectStudentAndStudentFactHandler}
            noStudentSelected={noStudentSelected}
          />
        </FullScreenDisplay>
      </Box>
    </>
  )
}

export default StudentGroup
