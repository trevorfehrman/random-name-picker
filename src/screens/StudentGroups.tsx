import * as React from 'react'
import 'firebase/firestore'

import StudentGroupPreview from 'components/StudentGroupPreview'
import styled from '@emotion/styled'
import { BodyBox } from 'styles'
import { useDisclosure, Box, Flex, Checkbox, Heading } from '@chakra-ui/react'
import CreateNewStudentGroupModal from 'components/CreateNewStudentGroupModal'
import PlusButton from 'components/UI/PlusButton'
import { useStudentGroups, useStudentsInStudentGroups } from 'helpers/firestoreHooks'
import ManageButton from 'components/UI/ManageButton'
import DeleteButton from 'components/UI/DeleteButton'
import ConfirmationModal from 'components/ConfirmationModal'
import firebase from 'firebase'
import { SpinnerCentered } from 'components/UI/SpinnerCentered'
import { InstructionText } from 'components/UI/InstructionText'

const GroupBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
`

const StudentGroups: React.FC = () => {
  const [managerIsOpen, setManagerIsOpen] = React.useState(false)

  const [selectedToDelete, setSelectedToDelete] = React.useState<string[]>([])

  const [thereIsOneGroupWithNoStudents, setThereIsOneGroupWithNoStudents] = React.useState(false)

  const { isOpen, onClose, onOpen } = useDisclosure()

  const { studentGroupsDocuments, studentGroupsRef } = useStudentGroups()

  const studentsInStudentGroupsRef = useStudentsInStudentGroups()

  React.useEffect(() => {
    if (studentGroupsDocuments?.length === 0) {
      setThereIsOneGroupWithNoStudents(false)
    }
  }, [studentGroupsDocuments])

  const deleteHandler = () => {
    selectedToDelete.forEach(studentGroupId => {
      const batch = firebase.firestore().batch()
      batch.delete(studentGroupsRef.doc(studentGroupId))
      const studentsInThisStudentGroupRef = studentsInStudentGroupsRef.where('studentGroupId', '==', studentGroupId)
      studentsInThisStudentGroupRef
        .get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            batch.delete(doc.ref)
          })
          batch.commit()
        })
        .catch(err => console.log(err))
    })
    onClose()
    setManagerIsOpen(false)
  }

  const selectAllHandler = () => {
    console.log('this worked!')
    const updatedSelectedToDelete: string[] = []
    if (selectedToDelete.length < studentGroupsDocuments.length) {
      studentGroupsDocuments.forEach(doc => updatedSelectedToDelete.push(doc.docId))
    }
    setSelectedToDelete(updatedSelectedToDelete)
  }

  const thereAreNoGroups = studentGroupsDocuments?.length === 0

  return (
    <Box height="100%" overflowY="hidden" padding="2rem">
      {!studentGroupsDocuments ? (
        <SpinnerCentered />
      ) : (
        <BodyBox>
          <Heading as="h2">Your groups</Heading>
          <Flex width="100%" justifyContent={managerIsOpen ? 'space-between' : 'flex-end'} alignItems="flex-end">
            {managerIsOpen ? (
              <Flex alignItems="center">
                <Checkbox
                  marginRight=".5rem"
                  border="1px solid var(--main-color-light)"
                  borderRadius="3px"
                  isChecked={selectedToDelete.length === studentGroupsDocuments.length}
                  onChange={selectAllHandler}
                />
                <Heading as="h3" fontSize="1rem">
                  Select All
                </Heading>
              </Flex>
            ) : null}
            {thereAreNoGroups ? null : (
              <ManageButton
                primaryText="Manage Groups"
                secondaryText="Close Manager"
                managerIsOpen={managerIsOpen}
                setManagerIsOpen={setManagerIsOpen}
              />
            )}
          </Flex>

          <GroupBox>
            {thereAreNoGroups ? (
              <InstructionText>Click the plus sign to create a new group!</InstructionText>
            ) : (
              studentGroupsDocuments?.map(doc => {
                return (
                  <Flex key={doc.docId} w="100%" justifyContent="center" direction="column">
                    <StudentGroupPreview
                      studentGroupId={doc.docId}
                      studentGroupName={doc.studentGroupName}
                      managerIsOpen={managerIsOpen}
                      setSelectedToDelete={setSelectedToDelete}
                      selectedToDelete={selectedToDelete}
                      thisIsTheOnlyStudentGroup={studentGroupsDocuments?.length === 1}
                      setThereIsOneGroupWithNoStudents={setThereIsOneGroupWithNoStudents}
                    />
                  </Flex>
                )
              })
            )}
            {thereIsOneGroupWithNoStudents && <InstructionText>Click on the group to enter</InstructionText>}
            {managerIsOpen ? (
              <DeleteButton onOpen={onOpen} />
            ) : (
              <PlusButton thereAreNoDocuments={thereAreNoGroups} onOpen={onOpen} ariaLabel="add group" />
            )}
          </GroupBox>

          {managerIsOpen ? (
            <ConfirmationModal
              buttonText="Confirm"
              modalHeadingText="Confirm Delete"
              isOpen={isOpen}
              onClose={onClose}
              onConfirm={deleteHandler}
            >
              <p>{`Are you sure you want to delete the selected groups?`}</p>
            </ConfirmationModal>
          ) : (
            <CreateNewStudentGroupModal isOpen={isOpen} onClose={onClose} />
          )}
        </BodyBox>
      )}
    </Box>
  )
}

export default StudentGroups
