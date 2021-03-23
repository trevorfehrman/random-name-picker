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

type FullScreenDisplayProps = {
  modalHeadingText: string
  onClose: () => void
  isOpen: boolean
  selectStudentAndStudentFactHandler: () => void
}

const FullScreenDisplay: React.FC<FullScreenDisplayProps> = ({
  children,
  modalHeadingText,
  onClose,
  isOpen,
  selectStudentAndStudentFactHandler,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent margin="0" minHeight="100vh">
        <ModalHeader>{modalHeadingText}</ModalHeader>
        <ModalCloseButton />
        <ModalBody onClick={selectStudentAndStudentFactHandler}>{children}</ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default FullScreenDisplay
