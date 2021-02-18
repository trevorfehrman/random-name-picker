import * as React from 'react'
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

type ConfirmationModalProps = {
  modalHeadingText: string
  buttonText: string
  onClose: () => void
  isOpen: boolean
  onConfirm: (event: React.MouseEvent) => void
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  children,
  modalHeadingText,
  buttonText,
  onClose,
  isOpen,
  onConfirm,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalHeadingText}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        <ModalFooter>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue" mr={3} onClick={onConfirm}>
            {buttonText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ConfirmationModal
