import * as React from 'react'
import { Flex } from '@chakra-ui/react'
import BackButton from 'components/UI/BackButton'

type HeadingBoxWithBackButtonProps = {
  backHandler: () => void
}
const HeadingBoxWithBackButton: React.FC<HeadingBoxWithBackButtonProps> = ({ children, backHandler }) => {
  return (
    <Flex flexDirection="column" justifyContent="flex-start" alignItems="flex-end" position="relative" w="100%">
      {children}
      <BackButton backHandler={backHandler} />
    </Flex>
  )
}

export default HeadingBoxWithBackButton
