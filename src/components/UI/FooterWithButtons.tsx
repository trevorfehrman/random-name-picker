import React from 'react'
import { Flex, Button } from '@chakra-ui/react'

type FooterWithButtonsProps = {
  onCancel?: () => void
  submitText: string
}

const FooterWithButtons: React.FC<FooterWithButtonsProps> = ({ onCancel, submitText }) => {
  return (
    <Flex
      backgroundColor="var(--grey-very-light)"
      borderRadius="0 0 5px 5px"
      position="fixed"
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
      <Button type="submit" backgroundColor="var(--main-color-medium)" color="var(--white)">
        {submitText}
      </Button>
    </Flex>
  )
}

export default FooterWithButtons
