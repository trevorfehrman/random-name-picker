import * as React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import 'firebase/firestore'
import { useFirestore } from 'reactfire'
import { Button, Box, Heading, Flex, IconButton } from '@chakra-ui/react'
import { SettingsIcon } from '@chakra-ui/icons'
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
import { InstructionText } from 'components/UI/InstructionText'
import { centeringOffset } from 'my-constants'
import { Popover } from 'components/UI/Popover'

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

  const thereAreNoStudentsInThisGroup = studentsInThisStudentGroupDocuments?.length === 0

  return (
    <Flex
      position="relative"
      flexDirection="column"
      h="100%"
      w="100%"
      alignItems="center"
      justify={{ base: 'flex-start', md: 'center' }}
    >
      <Flex
        top="0"
        left="0"
        position={{ base: 'relative', md: 'absolute' }}
        width="100%"
        alignItems="flex-start"
        justifyContent="space-between"
        padding="0 2rem 1rem 2rem"
        marginTop="1rem"
      >
        <Heading
          as="h3"
          textTransform="uppercase"
          fontSize={{ base: '1.3rem', md: '1.8rem', lg: '2.3rem' }}
          textAlign="start"
          alignSelf="center"
          color="var(--grey-medium-dark)"
        >
          {studentGroupDocument?.studentGroupName}
        </Heading>
        <IconButton
          aria-label="group settings"
          icon={<SettingsIcon />}
          fontSize="1.5rem"
          w="2.5rem"
          h="2.5rem"
          className={thereAreNoStudentsInThisGroup ? 'bounce' : ''}
          onClick={openManageGroupPageHandler}
          zIndex="20"
        />
        <Box position="fixed" top="8rem" right="1rem">
          <Popover
            arrowPosition="right"
            text="Click here to enter group settings"
            shouldShowPopover={thereAreNoStudentsInThisGroup}
            type="below"
          />
        </Box>
      </Flex>
      {thereAreNoStudentsInThisGroup ? (
        <InstructionText>There are no students in this group</InstructionText>
      ) : noStudentSelected ? (
        <Flex
          position="absolute"
          w="100%"
          h="100%"
          justifyContent="center"
          align="center"
          transform={`translateY(-${centeringOffset})`}
        >
          <Button
            w="20rem"
            position="relative"
            height={{ base: '50%', lg: '40%' }}
            minH="7rem"
            backgroundColor="var(--white)"
            color="var(--main-color-medium)"
            border="1px solid var(--main-color-medium)"
            fontSize="2rem"
            onClick={selectStudentAndStudentFactHandler}
            className="noHighlightOnClick bounce"
            zIndex="20"
          >
            Start
          </Button>
        </Flex>
      ) : (
        <Box
          display="grid"
          position={{ base: 'relative', md: 'absolute' }}
          transform={{ base: 'translateY(0)', md: `translateY(-${centeringOffset}rem)` }}
          // h="100%"
          gridTemplateRows={{ base: 'max-content 1fr max-content max-content', md: '5rem .5fr 2fr 1fr' }}
          gridTemplateColumns={{
            base: '1fr minmax(150px, max-content) 1fr',
            md: 'minmax(min-content, 50%) minmax(40%, 50%)',
            lg: '10% 40% 40% 10%',
            xl: '15% 35% 35% 15%',
          }}
          gridTemplateAreas={{
            base: `'        .           studentName           .              '
                '        .           studentPicture        .              '
                '        .           studentFact           .              '
                ' .  studentListNextBtn . '`,
            md: `'      .                .        '
                'studentPicture  studentName'
                'studentPicture  studentFact'
                'studentPicture  studentListNextBtn'`,
            lg: `'        .               .                .                 .       '
              '         .        studentPicture   studentName              .       '
              '         .        studentPicture   studentFact              .       '
              '         .        studentPicture   studentListNextBtn       .       '`,
          }}
          alignItems="center"
          alignContent="center"
          justifyContent="center"
          justifyItems="center"
          w="100%"
          maxW="90rem"
          marginBottom="2rem"
        >
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
            padding={{ base: '0', md: '0 2rem' }}
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
      )}
    </Flex>
  )
}

export default StudentGroup
