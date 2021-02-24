import * as React from 'react'
import { Flex } from '@chakra-ui/react'
import BackButton from 'components/UI/BackButton'

type HeadingBoxWithBackButtonProps = {
  backHandler: () => void
}
const HeadingBoxWithBackButton: React.FC<HeadingBoxWithBackButtonProps> = ({ children, backHandler }) => {
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      position="relative"
      w="90%"
      minHeight="60px"
    >
      <BackButton backHandler={backHandler} />
      {children}
    </Flex>
  )
}

export default HeadingBoxWithBackButton
