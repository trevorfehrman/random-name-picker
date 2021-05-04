import React from 'react'
import { Flex, Button } from '@chakra-ui/react'

type FooterWithButtonsProps = {
  onCancel?: () => void
  addExistingHandler: () => void
}

const FooterForAddExistingStudentsModal: React.FC<FooterWithButtonsProps> = ({ onCancel, addExistingHandler }) => {
  return (
    <Flex
      backgroundColor="var(--grey-very-light)"
      borderRadius="0 0 5px 5px"
      position="absolute"
      left="0"
      bottom="0"
      width="100%"
      height="4rem"
      justifyContent="space-between"
      padding="0 1rem"
      alignItems="center"
      z-index="140"
    >
      {onCancel ? (
        <Button backgroundColor="var(--grey-medium-dark)" color="white" onClick={onCancel}>
          CANCEL
        </Button>
      ) : null}
      <Button onClick={addExistingHandler} backgroundColor="var(--main-color-medium)" color="var(--white)">
        ADD TO GROUP
      </Button>
    </Flex>
  )
}

export default FooterForAddExistingStudentsModal
