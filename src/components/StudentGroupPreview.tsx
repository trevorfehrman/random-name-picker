import * as React from 'react'
import { Flex, Heading, Icon, Badge, useDisclosure } from '@chakra-ui/react'
// import { DeleteIcon } from '@chakra-ui/icons'
import { BiTrash, BiGroup } from 'react-icons/bi'
import styled from '@emotion/styled'
import { useHistory } from 'react-router-dom'

import 'firebase/firestore'
import { useFirestore, useFirestoreCollectionData } from 'reactfire'
import ConfirmationModal from 'components/ConfirmationModal'

const StudentGroupContainer = styled.div`
  border: 1px solid #d6d6d6;
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
    border-color: #00b5d8;
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

const StudentGroup: React.FC<StudentGroupProps> = ({ userId, studentGroupId, studentGroupName }) => {
  // const [modalIsOpen, setModalIsOpen] = React.useState(false)

  const { onOpen, isOpen, onClose } = useDisclosure()

  const studentGroupRef = useFirestore().collection('teachers').doc(userId).collection('studentGroups')

  const studentsInStudentGroupsRef = useFirestore()
    .collection('teachers')
    .doc(userId)
    .collection('studentsInStudentGroups')
    .where('studentGroupId', '==', studentGroupId)

  const studentsInStudentGroupsDocuments = useFirestoreCollectionData(studentsInStudentGroupsRef).data

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

  const openHandler = (event: React.SyntheticEvent) => {
    event?.stopPropagation()
    onOpen()
  }

  return (
    <>
      <StudentGroupContainer onClick={openStudentGroupHandler}>
        <Flex direction="column">
          <Heading as="h2" size="md" color="gray.600" fontSize="2rem" marginBottom="1.4rem">
            {studentGroupName}
          </Heading>
          {/* <Heading as="h2" size="md" color="cyan.200" opacity=".9">
              {studentsInStudentGroupsDocuments?.length}{' '}
              {studentsInStudentGroupsDocuments?.length === 1 ? 'student' : 'students'}
            </Heading> */}
          <Badge variant="solid" colorScheme="cyan" padding=".3rem" alignSelf="flex-start">
            {studentsInStudentGroupsDocuments?.length}{' '}
            {studentsInStudentGroupsDocuments?.length === 1 ? 'student' : 'students'}
          </Badge>
        </Flex>
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
