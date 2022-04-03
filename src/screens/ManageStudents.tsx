import * as React from 'react'
import { useHistory } from 'react-router-dom'
import { Flex, useDisclosure, Box, Checkbox, Heading, Image, Button } from '@chakra-ui/react'
import Student from 'components/Student'
import { BodyBox } from 'styles'
import CreateNewStudentModal from 'components/CreateNewStudentModal'
import PlusButton from 'components/UI/PlusButton'
import { useStudents, useStudentsInStudentGroups } from 'helpers/firestoreHooks'
import styled from '@emotion/styled'
import ManageButton from 'components/UI/ManageButton'
import DeleteButton from 'components/UI/DeleteButton'
import ConfirmationModal from 'components/ConfirmationModal'
import firebase from 'firebase'
import { IStudent } from 'interfacesAndTypes'

const StudentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 7rem;
`

const ManageStudents: React.FC<{ sharedProfiles: IStudent[] }> = ({ sharedProfiles }) => {
  const [managerIsOpen, setManagerIsOpen] = React.useState(false)

  const [selectedToDelete, setSelectedToDelete] = React.useState<string[]>([])

  const history = useHistory()

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { studentDocuments, studentsRef } = useStudents()

  const studentsInStudentGroupsRef = useStudentsInStudentGroups()

  const selectAllHandler = () => {
    console.log('this worked!')
    const updatedSelectedToDelete: string[] = []
    if (selectedToDelete.length < studentDocuments.length) {
      studentDocuments.forEach(doc => updatedSelectedToDelete.push(doc.docId))
    }
    setSelectedToDelete(updatedSelectedToDelete)
  }

  const deleteHandler = async () => {
    selectedToDelete.forEach(async studentId => {
      const deleteBatch = firebase.firestore().batch()
      deleteBatch.delete(studentsRef.doc(studentId))
      const allGroupsWithThisStudentRef = studentsInStudentGroupsRef.where('studentId', '==', studentId)
      const snapshot = await allGroupsWithThisStudentRef.get()
      if (snapshot.docs.length > 0) {
        snapshot.docs.forEach(doc => {
          deleteBatch.delete(doc.ref)
        })
      }
      deleteBatch.commit()
    })
    onClose()
    setManagerIsOpen(false)
  }

  const handleReviewProfile = (profileId: string) => {
    console.log(profileId)
    history.push(`/review-new-profile/${profileId}`)
  }

  return (
    <Box height="100vh">
      <BodyBox>
        {sharedProfiles?.length > 0 ? (
          <Flex direction="column" w="100%" marginY="3rem" align="center">
            <Heading as="h2" marginBottom="2rem">
              New students
            </Heading>
            {sharedProfiles.map(sharedProfile => {
              const { studentName } = sharedProfile
              if (!studentDocuments?.some(element => element.profileId === sharedProfile.docId)) {
                return (
                  <Flex
                    key={sharedProfile.docId}
                    onClick={() => handleReviewProfile(sharedProfile.docId)}
                    border="1px solid var(--grey-medium)"
                    w="100%"
                    padding="1rem"
                    borderRadius="5px"
                    cursor="pointer"
                    align="center"
                    justify="space-between"
                  >
                    <Flex align="center">
                      <Image src={sharedProfile.profilePic} w="70px" h="70px" borderRadius="50%" marginRight="1rem" />
                      <Heading as="h3" fontSize="1.3rem">
                        {studentName}
                      </Heading>
                    </Flex>
                    <Flex _notLast={{ padding: '1rem' }}>
                      <Button>Review</Button>
                      <Button>Accept</Button>
                      <Button>Reject</Button>
                    </Flex>
                  </Flex>
                )
              } else {
                return null
              }
            })}
          </Flex>
        ) : null}
        <Heading as="h2">Your students</Heading>
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
        <StudentBox>
          {studentDocuments?.map(doc => {
            return (
              <Student
                key={doc.docId}
                student={doc}
                selectedToDelete={selectedToDelete}
                setSelectedToDelete={setSelectedToDelete}
                managerIsOpen={managerIsOpen}
                hasReviewPending={sharedProfiles?.some(element => element.docId === doc.profileId)}
              />
            )
          })}
        </StudentBox>
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
          <CreateNewStudentModal onClose={onClose} isOpen={isOpen} />
        )}
      </BodyBox>
      {managerIsOpen ? <DeleteButton onOpen={onOpen} /> : <PlusButton onOpen={onOpen} />}
    </Box>
  )
}

export default ManageStudents
