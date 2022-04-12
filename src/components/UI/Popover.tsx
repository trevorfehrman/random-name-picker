import * as React from 'react'
import { Flex, Box, Text, IconButton } from '@chakra-ui/react'
import { CloseIcon } from '@chakra-ui/icons'

export const Popover: React.FC<{
  shouldShowPopover: boolean
  text: string
  type: 'below' | 'above'
  arrowPosition?: 'right'
}> = ({ text, shouldShowPopover, type, arrowPosition }) => {
  const [isDismissed, setIsDismissed] = React.useState(false)

  return (
    <>
      {shouldShowPopover && !isDismissed && (
        <Flex
          marginTop="1rem"
          maxW="15rem"
          borderX="1px solid var(--grey-dark)"
          borderRadius="5px"
          justify="center"
          align="center"
          position="relative"
          borderBottom="1px solid var(--grey-dark)"
          opacity=".9"
          boxShadow="2px 4px 8px rgba(0, 0, 0, 0.2)"
          zIndex="1000"
        >
          <IconButton
            aria-label="close tip"
            position="absolute"
            right="-.5rem"
            top="-.5rem"
            bg="transparent"
            zIndex="40"
            cursor="pointer"
            icon={<CloseIcon fontSize="10px" />}
            _hover={{ bg: 'transparent' }}
            _active={{ bg: 'transparent', border: '' }}
            onClick={() => {
              console.log('double buttz')
              setIsDismissed(true)
            }}
          />

          <Box
            w="1rem"
            h="1rem"
            border="1px solid var(--grey-dark)"
            transform="translateX(3rem) rotate(45deg)"
            position="absolute"
            top={type === 'below' ? '-.3rem' : 'none'}
            bottom={type === 'above' ? '-.5rem' : 'none'}
            left={type === 'below' && arrowPosition !== 'right' ? '0' : 'none'}
            right={type === 'above' || arrowPosition === 'right' ? '5rem' : 'none'}
            bg="var(--white)"
            zIndex="0"
          />
          <Box
            position="absolute"
            w="100%"
            h="100%"
            top="0"
            left="0"
            zIndex="-20"
            borderRadius="5px"
            borderTop="1px solid var(--grey-dark)"
          />
          <Box
            position="absolute"
            w="100%"
            h="calc(100% - 1px)"
            bg="var(--white)"
            bottom="0"
            left="0"
            zIndex="10"
            borderRadius="5px"
          />

          <Text fontSize="1.2rem" as="h3" zIndex="30" padding="1rem 1.5rem">
            {text}
          </Text>
        </Flex>
      )}
    </>
  )
}
