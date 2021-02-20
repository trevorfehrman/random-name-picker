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
  selectHandler: () => void
}

const FullScreenDisplay: React.FC<FullScreenDisplayProps> = ({
  children,
  modalHeadingText,
  onClose,
  isOpen,
  selectHandler,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="full" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{modalHeadingText}</ModalHeader>
        <ModalCloseButton />
        <ModalBody onClick={selectHandler}>{children}</ModalBody>
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
