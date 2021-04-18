import * as React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useFirestore, useUser } from 'reactfire'
import NewStudentGroup from './NewStudentGroup'

type CreateNewStudentGroupModalProps = {
  isOpen: boolean
  onClose: () => void
}

const CreateNewStudentGroupModal: React.FC<CreateNewStudentGroupModalProps> = ({ isOpen, onClose }) => {
  const { data: user } = useUser()

  const studentGroupsRef = useFirestore().collection('teachers').doc(user.uid).collection('studentGroups')

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent height="12rem" width="85%" alignSelf="center">
        <ModalHeader paddingBottom="0" paddingLeft=".5rem" paddingTop=".5rem">
          New Student Group
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody paddingTop="0">
          <NewStudentGroup studentGroupsRef={studentGroupsRef} onClose={onClose} />
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CreateNewStudentGroupModal
