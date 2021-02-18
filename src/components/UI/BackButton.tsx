import * as React from 'react'
import { IconButton } from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'

type BackButtonProps = {
  backHandler: () => void
}

const BackButton: React.FC<BackButtonProps> = ({ backHandler }) => {
  return (
    <IconButton
      onClick={backHandler}
      icon={<ArrowBackIcon />}
      aria-label="back"
      position="absolute"
      top="10px"
      left="10px"
    />
  )
}

export default BackButton
