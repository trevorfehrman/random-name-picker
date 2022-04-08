import * as React from 'react'
import { Spinner, Flex } from '@chakra-ui/react'

export const SpinnerCentered: React.FC = () => {
  return (
    <Flex h="100%" justify="center" align="center" transform="translateY(-2.25rem)">
      <Spinner size="xl" thickness="6px" emptyColor="var(--grey-light)" />
    </Flex>
  )
}
