import * as React from 'react'
import { IconButton, Icon } from '@chakra-ui/react'
// import { ArrowBackIcon } from '@chakra-ui/icons'
import { BiArrowBack } from 'react-icons/bi'

type BackButtonProps = {
  backHandler: () => void
}

const BackButton: React.FC<BackButtonProps> = ({ backHandler }) => {
  return (
    <IconButton
      onClick={backHandler}
      icon={<Icon as={BiArrowBack} />}
      aria-label="back"
      position="absolute"
      top={0}
      left={0}
      border="1px solid var(--grey-dark)"
      zIndex={10}
    />
  )
}

export default BackButton
