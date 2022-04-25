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
import NewStudent from 'components/NewStudent'

type CreateNewStudentModalProps = {
  isOpen: boolean
  onClose: () => void
  setIsAddingStudent: React.Dispatch<React.SetStateAction<boolean>>
}

const CreateNewStudentModal: React.FC<CreateNewStudentModalProps> = ({ isOpen, onClose, setIsAddingStudent }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxHeight="80vh" width="85%" color="var(--grey-dark)" alignSelf="center">
        <ModalHeader>New Student</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="scroll">
          <NewStudent onClose={onClose} setIsAddingStudent={setIsAddingStudent} />
        </ModalBody>
        {/* <FooterWithButtons onCancel={onCancel} onSubmit={onSubmit} submitText="CREATE" /> */}

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CreateNewStudentModal
