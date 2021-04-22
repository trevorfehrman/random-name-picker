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
      icon={<Icon fontSize="1.4rem" color="var(--main-color-medium)" as={BiArrowBack} />}
      aria-label="back"
      top={0}
      left={0}
      border="1px solid var(--main-color-medium)"
      backgroundColor="var(--white)"
      zIndex={10}
    />
  )
}

export default BackButton
