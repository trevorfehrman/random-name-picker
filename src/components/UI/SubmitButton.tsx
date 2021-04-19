import { Button } from '@chakra-ui/button'
import React from 'react'

const SubmitButton: React.FC<{ text: string }> = ({ text }) => {
  return (
    <Button
      backgroundColor="var(--main-color-medium)"
      color="var(--white)"
      alignSelf="flex-end"
      type="submit"
      marginTop=".5rem"
    >
      {text}
    </Button>
  )
}

export default SubmitButton
