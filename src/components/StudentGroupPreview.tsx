import * as React from 'react'
import { Flex, Heading, Icon, IconButton, useDisclosure } from '@chakra-ui/react'
// import { DeleteIcon } from '@chakra-ui/icons'
import { BiTrash, BiGroup } from 'react-icons/bi'
import styled from '@emotion/styled'
import { useHistory } from 'react-router-dom'

import 'firebase/firestore'
import { useFirestore, useFirestoreCollectionData } from 'reactfire'
import ConfirmationModal from 'components/ConfirmationModal'
import { IStudentInStudentGroup } from 'interfacesAndTypes'

const ButtonDiv = styled.div`
  display: flex;
`

const StudentGroupContainer = styled.div`
  border: 1px solid black;
  border-radius: 5px;
  width: 100%;
  margin: 0.7rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s;
  padding: 0.8rem;
  &:hover {
    cursor: pointer;
    background-color: #dbedf8;
    transform: translateY(-0.2rem);
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.5);
  }
  &:active {
    background-color: #bee3f8;
    transform: translateY(-0.1rem);
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.7);
  }
`

type StudentGroupProps = {
  studentGroupId: string
  studentGroupName: string
  userId: string
}

const StudentGroup: React.FC<StudentGroupProps> = ({ userId, studentGroupId, studentGroupName }) => {
  // const [modalIsOpen, setModalIsOpen] = React.useState(false)

  const { onOpen, isOpen, onClose } = useDisclosure()

  const studentGroupRef = useFirestore().collection('teachers').doc(userId).collection('studentGroups')

  const studentsInStudentGroupsRef = useFirestore()
    .collection('teachers')
    .doc(userId)
    .collection('studentsInStudentGroups')
    .where('studentGroupId', '==', studentGroupId)

  const studentsInStudentGroupsDocuments = useFirestoreCollectionData<IStudentInStudentGroup & { docId: string }>(
    studentsInStudentGroupsRef,
    { idField: 'docId' },
  ).data

  const history = useHistory()

  const openStudentGroupHandler = () => {
    history.push(`/student-group/${studentGroupId}`)
  }

  const batch = useFirestore().batch()

  const deleteHandler = (event: React.MouseEvent) => {
    event.stopPropagation()
    batch.delete(studentGroupRef.doc(studentGroupId))
    studentsInStudentGroupsRef
      .get()
      .then(snapshot => {
        snapshot.docs.forEach(doc => {
          batch.delete(doc.ref)
        })
        return batch.commit()
      })
      .catch(err => console.log(err))
  }

  console.log(studentsInStudentGroupsDocuments)

  const openHandler = (event: React.SyntheticEvent) => {
    event?.stopPropagation()
    onOpen()
  }

  return (
    <>
      <StudentGroupContainer onClick={openStudentGroupHandler}>
        <Flex justify="flex-start" alignItems="center">
          <Icon as={BiGroup} fontSize="2rem" margin="0 1rem 0 .5rem" color="blue.800" />
          <Flex direction="column">
            <Heading as="h2" size="md" color="blue.800">
              {studentGroupName}
            </Heading>
            <Heading as="h2" size="md" color="blue.500">
              {studentsInStudentGroupsDocuments?.length}{' '}
              {studentsInStudentGroupsDocuments?.length === 1 ? 'student' : 'students'}
            </Heading>
          </Flex>
        </Flex>

        <ButtonDiv>
          <IconButton icon={<Icon as={BiTrash} />} onClick={openHandler} aria-label="delete">
            Delete
          </IconButton>
        </ButtonDiv>
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
