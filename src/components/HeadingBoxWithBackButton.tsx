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
      justifyContent="flex-end"
      alignItems="flex-end"
      position="relative"
      w="100%"
      padding="1rem 0"
    >
      <BackButton backHandler={backHandler} />
      {/* <Flex direction="column" w="100%" backgroundColor="blue.400" justify="center"> */}
      {children}
      {/* </Flex> */}
    </Flex>
  )
}

export default HeadingBoxWithBackButton
