import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { Flex, useDisclosure, Box, Checkbox, Heading, Button, Spinner } from '@chakra-ui/react'
import Student from 'components/Student'
import { BodyBox } from 'styles'
import CreateNewStudentModal from 'components/CreateNewStudentModal'
import PlusButton from 'components/UI/PlusButton'
import { useSharedProfiles, useStudents, useStudentsInStudentGroups } from 'helpers/firestoreHooks'
import styled from '@emotion/styled'
import ManageButton from 'components/UI/ManageButton'
import DeleteButton from 'components/UI/DeleteButton'
import ConfirmationModal from 'components/ConfirmationModal'
import firebase from 'firebase'
import { SpinnerCentered } from 'components/UI/SpinnerCentered'
import { InstructionText } from 'components/UI/InstructionText'
import { Popover } from 'components/UI/Popover'

const StudentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 7rem;
`

const ManageStudents: React.FC = () => {
  const [managerIsOpen, setManagerIsOpen] = React.useState(false)

  const [selectedToDelete, setSelectedToDelete] = React.useState<{ studentId: string; profilePic: string }[]>([])

  const [thereAreNoStudents, setThereAreNoStudents] = React.useState(false)

  const [initialStudentNumber, setInitialStudentNumber] = React.useState<null | number>(null)

  const [isAddingStudent, setIsAddingStudent] = React.useState(false)

  const history = useHistory()

  const storage = firebase.storage()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { studentDocuments, studentsRef } = useStudents()

  const { sharedProfiles } = useSharedProfiles()

  const sharedProfileAmount = sharedProfiles?.length

  const studentsInStudentGroupsRef = useStudentsInStudentGroups()

  React.useEffect(() => {
    if (studentDocuments?.length === 0) {
      setThereAreNoStudents(true)
    } else {
      setThereAreNoStudents(false)
    }
  }, [studentDocuments])

  React.useEffect(() => {
    if (studentDocuments && initialStudentNumber === null) {
      setInitialStudentNumber(studentDocuments.length)
    }
  }, [initialStudentNumber, studentDocuments])

  const selectAllHandler = () => {
    console.log('this worked!')
    const updatedSelectedToDelete: { studentId: string; profilePic: string }[] = []
    if (selectedToDelete.length < studentDocuments.length) {
      studentDocuments.forEach(doc =>
        updatedSelectedToDelete.push({ studentId: doc.docId, profilePic: doc.profilePic }),
      )
    }
    setSelectedToDelete(updatedSelectedToDelete)
  }

  const deleteHandler = async () => {
    selectedToDelete.forEach(async studentToDelete => {
      console.log(studentToDelete.studentId)
      const deleteBatch = firebase.firestore().batch()
      deleteBatch.delete(studentsRef.doc(studentToDelete.studentId))
      const allGroupsWithThisStudentRef = studentsInStudentGroupsRef.where('studentId', '==', studentToDelete.studentId)
      const snapshot = await allGroupsWithThisStudentRef.get()
      if (snapshot.docs.length > 0) {
        snapshot.docs.forEach(doc => {
          deleteBatch.delete(doc.ref)
        })
      }
      await deleteBatch.commit()
      const existingImageUrl = studentToDelete.profilePic
      const existingImageRef = storage.ref(existingImageUrl)
      existingImageRef.delete()
    })
    onClose()
    setManagerIsOpen(false)
    setSelectedToDelete([])
  }

  return (
    <Box height="calc(100vh - 4.5rem)">
      <Box position="fixed" right="8rem" top="5rem" zIndex="1000">
        <Popover
          text="once you've created your students, head back to the groups page"
          shouldShowPopover={initialStudentNumber === 0 && studentDocuments?.length > 0}
          type="below"
        />
      </Box>

      {!studentDocuments ? (
        <SpinnerCentered />
      ) : (
        <BodyBox>
          {sharedProfileAmount > 0 ? (
            <Flex marginY="2rem" align="center">
              <Heading as="h3">{`You have ${sharedProfileAmount} new profile${
                sharedProfileAmount > 1 ? 's' : ''
              } to approve`}</Heading>
              <Button
                marginLeft="1rem"
                onClick={() => {
                  history.push('/review-new-profiles')
                }}
              >
                View new profiles
              </Button>
            </Flex>
          ) : null}
          <Flex direction="column" align="center">
            <Heading as="h2" marginTop="2rem">
              Your students
            </Heading>

            {isAddingStudent && (
              <Flex position="absolute" top="5rem">
                <Spinner />
              </Flex>
            )}
          </Flex>

          {!thereAreNoStudents && (
            <Flex width="100%" justifyContent={managerIsOpen ? 'space-between' : 'flex-end'} alignItems="flex-end">
              {managerIsOpen ? (
                <Flex alignItems="center">
                  <Checkbox
                    marginRight=".5rem"
                    border="1px solid var(--main-color-light)"
                    borderRadius="3px"
                    isChecked={selectedToDelete.length === studentDocuments.length}
                    onChange={selectAllHandler}
                  />
                  <Heading as="h3" fontSize="1rem">
                    Select All
                  </Heading>
                </Flex>
              ) : null}
              <ManageButton
                primaryText="Manage Students"
                secondaryText="Close Manager"
                managerIsOpen={managerIsOpen}
                setManagerIsOpen={setManagerIsOpen}
              />
            </Flex>
          )}
          {thereAreNoStudents ? (
            <InstructionText>You have no students</InstructionText>
          ) : (
            <StudentBox>
              {studentDocuments?.map(doc => {
                return (
                  <Student
                    key={doc.docId}
                    student={doc}
                    selectedToDelete={selectedToDelete}
                    setSelectedToDelete={setSelectedToDelete}
                    managerIsOpen={managerIsOpen}
                  />
                )
              })}
            </StudentBox>
          )}
          {managerIsOpen ? (
            <ConfirmationModal
              buttonText="Confirm"
              modalHeadingText="Confirm Delete"
              isOpen={isOpen}
              onClose={onClose}
              onConfirm={deleteHandler}
            >
              Are you sure you want to delete the selected Students? They will be removed from all groups.
            </ConfirmationModal>
          ) : (
            <CreateNewStudentModal onClose={onClose} isOpen={isOpen} setIsAddingStudent={setIsAddingStudent} />
          )}
        </BodyBox>
      )}
      <Box position="fixed" bottom="8rem" right="1.5rem">
        <Popover
          text="click on the plus sign to create a student"
          shouldShowPopover={thereAreNoStudents}
          type="above"
        />
      </Box>
      {managerIsOpen ? (
        <DeleteButton onOpen={onOpen} />
      ) : (
        <PlusButton thereAreNoDocuments={studentDocuments?.length === 0} onOpen={onOpen} ariaLabel="add student" />
      )}
    </Box>
  )
}

export default ManageStudents
