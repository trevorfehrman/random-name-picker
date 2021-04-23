import * as React from 'react'
import { Flex, Heading, useDisclosure, Box } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { useHistory } from 'react-router-dom'

import 'firebase/firestore'
import { useFirestore } from 'reactfire'
import ConfirmationModal from 'components/ConfirmationModal'
import { useStudentGroups, useStudentsInThisStudentGroup } from 'helpers/firestoreHooks'

const StudentGroupContainer = styled.div`
  border: 1px solid var(--grey-light);
  border-radius: 5px;
  width: 100%;
  margin: 1.1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s;
  padding: 1.1rem 0.8rem;
  &:hover {
    cursor: pointer;
    background-color: var(--main-color-very-light);
    transform: translateY(-0.2rem);
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.5);
  }
  &:active {
    background-color: var(--main-color-light);
    transform: translateY(-0.1rem);
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.7);
  }
`

type StudentGroupProps = {
  studentGroupId: string
  studentGroupName: string
  userId: string
}

const StudentGroup: React.FC<StudentGroupProps> = ({ studentGroupId, studentGroupName }) => {
  // const [modalIsOpen, setModalIsOpen] = React.useState(false)

  const { onOpen, isOpen, onClose } = useDisclosure()

  const { studentGroupsRef } = useStudentGroups()

  const { studentsInThisStudentGroupDocuments, studentsInThisStudentGroupRef } = useStudentsInThisStudentGroup(
    studentGroupId,
  )

  const history = useHistory()

  const openStudentGroupHandler = () => {
    history.push(`/student-group/${studentGroupId}`)
  }

  const batch = useFirestore().batch()

  const deleteHandler = (event: React.MouseEvent) => {
    event.stopPropagation()
    batch.delete(studentGroupsRef.doc(studentGroupId))
    studentsInThisStudentGroupRef
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          batch.delete(doc.ref)
        })
        return batch.commit()
      })
      .catch(err => console.log(err))
  }

  // const openHandler = (event: React.SyntheticEvent) => {
  //   event?.stopPropagation()
  //   onOpen()
  // }

  return (
    <>
      <StudentGroupContainer onClick={openStudentGroupHandler}>
        <Flex justify="flex-start" alignItems="center">
          <Flex direction="column">
            <Heading as="h2" fontSize="1.4rem" paddingBottom=".8rem">
              {studentGroupName}
            </Heading>
            <Box
              fontSize="var(--font-size-small)"
              color="var(--white)"
              bg="var(--main-color-medium)"
              opacity=".9"
              padding=".2rem .3rem"
              borderRadius="3px"
              textAlign="center"
              width="7.3rem"
              textTransform="uppercase"
            >
              {studentsInThisStudentGroupDocuments?.length}{' '}
              {studentsInThisStudentGroupDocuments?.length === 1 ? 'student' : 'students'}
            </Box>
          </Flex>
        </Flex>

        {/* <ButtonDiv>
          <IconButton icon={<Icon as={BiTrash} />} onClick={openHandler} aria-label="delete">
            Delete
          </IconButton>
        </ButtonDiv> */}
      </StudentGroupContainer>
      <ConfirmationModal
        buttonText="Confirm"
        modalHeadingText="Confirm Delete"
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={deleteHandler}
      >
        <p>{`Are you sure you want to delete "${studentGroupName}"?`}</p>
      </ConfirmationModal>
    </>
  )
}

export default StudentGroup
