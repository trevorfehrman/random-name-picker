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
import { useFirestore, useUser } from 'reactfire'

type CreateNewStudentModalProps = {
  isOpen: boolean
  onClose: () => void
}

const CreateNewStudentModal: React.FC<CreateNewStudentModalProps> = ({ isOpen, onClose }) => {
  const { data: user } = useUser()

  const studentsRef = useFirestore().collection('teachers').doc(user.uid).collection('students')

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxHeight="80vh" width="85%" color="var(--grey-dark)" alignSelf="center">
        <ModalHeader>New Student</ModalHeader>
        <ModalCloseButton />
        <ModalBody overflowY="scroll">
          <NewStudent studentsRef={studentsRef} onClose={onClose} />
        </ModalBody>
        {/* <FooterWithButtons onCancel={onCancel} onSubmit={onSubmit} submitText="CREATE" /> */}

        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CreateNewStudentModal
