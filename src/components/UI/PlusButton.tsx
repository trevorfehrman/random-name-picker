import React from 'react'
import { Button } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'

type PlusButtonProps = {
  onOpen: () => void
}

const PlusButton: React.FC<PlusButtonProps> = ({ onOpen }) => {
  return (
    <Button
      onClick={onOpen}
      alignSelf="flex-end"
      marginBottom=".5rem"
      position="fixed"
      right="1.1rem"
      bottom="1.1rem"
      width="4.4rem"
      height="4.4rem"
      borderRadius="50%"
      backgroundColor="var(--main-color-medium)"
    >
      <AddIcon color="white" fontSize="1.5rem" />
    </Button>
  )
}

export default PlusButton
