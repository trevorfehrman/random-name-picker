import * as React from 'react'
import { Flex, useDisclosure, Box, Checkbox, Heading } from '@chakra-ui/react'
import Student from 'components/Student'
import { BodyBox } from 'styles'
import CreateNewStudentModal from 'components/CreateNewStudentModal'
import PlusButton from 'components/UI/PlusButton'
import Header from 'components/Header'
import { useStudents, useStudentsInStudentGroups } from 'helpers/firestoreHooks'
import styled from '@emotion/styled'
import ManageButton from 'components/UI/ManageButton'
import DeleteButton from 'components/UI/DeleteButton'
import ConfirmationModal from 'components/ConfirmationModal'
import firebase from 'firebase'

const StudentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 7rem;
`

const ManageStudents: React.FC = () => {
  const [managerIsOpen, setManagerIsOpen] = React.useState(false)

  const [selectedToDelete, setSelectedToDelete] = React.useState<string[]>([])

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

  const deleteHandler = async (event: React.MouseEvent) => {
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

  return (
    <Box height="100vh" overflowY="hidden">
      <Header />
      <BodyBox>
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
