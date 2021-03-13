import * as React from 'react'
import { Heading, Icon, IconButton, useDisclosure } from '@chakra-ui/react'
// import { DeleteIcon } from '@chakra-ui/icons'
import { BiTrash } from 'react-icons/bi'
import { useFirestore, useUser } from 'reactfire'
import ConfirmationModal from 'components/ConfirmationModal'
import { StudentContainer } from 'styles'
import { useHistory } from 'react-router-dom'

type StudentProps = {
  studentName: string
  docId: string
}

const Student: React.FC<StudentProps> = ({ studentName, docId }) => {
  const { onClose, onOpen, isOpen } = useDisclosure()

  const { data: user } = useUser()

  const history = useHistory()

  const teacherRef = useFirestore().collection('teachers').doc(user.uid)
  const studentRef = teacherRef.collection('students').doc(docId)
  const studentsInStudentGroupsRef = teacherRef.collection('studentsInStudentGroups').where('studentId', '==', docId)

  const deleteBatch = useFirestore().batch()

  const deleteHandler = async (e: React.SyntheticEvent) => {
    e.stopPropagation()
    deleteBatch.delete(studentRef)
    const snapshot = await studentsInStudentGroupsRef.get()
    if (snapshot.docs.length > 0) {
      snapshot.docs.forEach(doc => {
        deleteBatch.delete(doc.ref)
      })
    }
    deleteBatch.commit()
  }

  const openEditStudentHandler = () => {
    history.push(`/edit-student/${docId}`)
  }

  const openModalHandler = (e: React.SyntheticEvent) => {
    e.stopPropagation()
    onOpen()
  }

  return (
    <>
      <StudentContainer onClick={openEditStudentHandler}>
        <Heading as="h3" size="md">
          {studentName}
        </Heading>
        <IconButton icon={<Icon as={BiTrash} />} aria-label="delete" onClick={openModalHandler} />
      </StudentContainer>
      <ConfirmationModal
        buttonText="Confirm"
        modalHeadingText="Confirm Delete"
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={deleteHandler}
      >
        Are you sure you want to delete this student? They will be removed from all groups.
      </ConfirmationModal>
    </>
  )
}

export default Student
