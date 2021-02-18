import * as React from 'react'
import { Heading, IconButton, useDisclosure } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import styled from '@emotion/styled'
import { useHistory } from 'react-router-dom'

import 'firebase/firestore'
import { useFirestore } from 'reactfire'
import ConfirmationModal from 'components/ConfirmationModal'

const StudentGroupContainer = styled.div`
  border: 1px solid black;
  margin: 3px 0;
  display: flex;
  justify-content: space-between;
  &:hover {
    cursor: pointer;
  }
`

const ButtonDiv = styled.div`
  display: flex;
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
        <Heading as="h2" size="lg">
          {studentGroupName}
        </Heading>
        <ButtonDiv>
          <IconButton icon={<DeleteIcon />} onClick={openHandler} aria-label="delete">
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
