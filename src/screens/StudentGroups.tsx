import * as React from 'react'
import 'firebase/firestore'

import StudentGroupPreview from 'components/StudentGroupPreview'
import styled from '@emotion/styled'
import { BodyBox } from 'styles'
import { useDisclosure, Box, Flex, Checkbox, Heading } from '@chakra-ui/react'
import CreateNewStudentGroupModal from 'components/CreateNewStudentGroupModal'
import PlusButton from 'components/UI/PlusButton'
import Header from 'components/Header'
import { useStudentGroups, useStudentsInStudentGroups } from 'helpers/firestoreHooks'
import ManageButton from 'components/UI/ManageButton'
import DeleteButton from 'components/UI/DeleteButton'
import ConfirmationModal from 'components/ConfirmationModal'
import firebase from 'firebase'

const GroupBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 7rem;
`

const StudentGroups: React.FC = () => {
  const [managerIsOpen, setManagerIsOpen] = React.useState(false)

  const [selectedToDelete, setSelectedToDelete] = React.useState<string[]>([])

  const { isOpen, onClose, onOpen } = useDisclosure()

  const { studentGroupsDocuments, studentGroupsRef } = useStudentGroups()

  const studentsInStudentGroupsRef = useStudentsInStudentGroups()

  const deleteHandler = (event: React.MouseEvent) => {
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

  return (
    <Box height="100vh" overflowY="hidden">
      <Header />
      <BodyBox>
        <Flex width="100%" justifyContent={managerIsOpen ? 'space-between' : 'flex-end'} alignItems="flex-end">
          {managerIsOpen ? (
            <Flex alignItems="center">
              <Checkbox
                marginRight=".5rem"
                isChecked={selectedToDelete.length === studentGroupsDocuments.length}
                onChange={selectAllHandler}
              />
              <Heading as="h3" fontSize="1rem">
                Select All
              </Heading>
            </Flex>
          ) : null}
          <ManageButton
            primaryText="Manage Groups"
            secondaryText="Close Manager"
            managerIsOpen={managerIsOpen}
            setManagerIsOpen={setManagerIsOpen}
          />
        </Flex>
        <GroupBox>
          {studentGroupsDocuments?.map(doc => {
            return (
              <StudentGroupPreview
                key={doc.docId}
                studentGroupId={doc.docId}
                studentGroupName={doc.studentGroupName}
                managerIsOpen={managerIsOpen}
                setSelectedToDelete={setSelectedToDelete}
                selectedToDelete={selectedToDelete}
              />
            )
          })}
          {managerIsOpen ? <DeleteButton onOpen={onOpen} /> : <PlusButton onOpen={onOpen} />}
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
    </Box>
  )
}

export default StudentGroups
