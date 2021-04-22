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
import NewStudentGroup from './NewStudentGroup'

type CreateNewStudentGroupModalProps = {
  isOpen: boolean
  onClose: () => void
}

const CreateNewStudentGroupModal: React.FC<CreateNewStudentGroupModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent height="12.5rem" width="85%" alignSelf="center" borderRadius="3px">
        <ModalHeader
          paddingBottom="0"
          paddingLeft=".8rem"
          paddingTop=".5rem"
          color="var(--grey-dark)"
          fontSize="1.4rem"
        >
          New Student Group
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody paddingTop="0">
          <NewStudentGroup onClose={onClose} />
        </ModalBody>

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CreateNewStudentGroupModal
