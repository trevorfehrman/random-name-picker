import * as React from 'react'
import { Spinner, Flex } from '@chakra-ui/react'

export const SpinnerCentered: React.FC = () => {
  return (
    <Flex h="calc(100% - 2.25rem)" justify="center" align="center">
      <Spinner size="xl" thickness="6px" emptyColor="var(--grey-light)" />
    </Flex>
  )
}
