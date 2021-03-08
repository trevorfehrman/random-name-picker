import * as React from 'react'
import { NameDisplayBox } from 'styles'
import { Heading, IconButton, Icon } from '@chakra-ui/react'
import { BiExpand } from 'react-icons/bi'
import { NameDisplayProps } from 'interfacesAndTypes'

const NameDisplayRegular: React.FC<NameDisplayProps> = ({
  selectedStudent,
  setFullScreenDisplayIsOpen,
  selectHandler,
}) => {
  const expandHandler = (e: React.SyntheticEvent) => {
    e.stopPropagation()
    setFullScreenDisplayIsOpen(true)
  }

  return (
    <NameDisplayBox onClick={selectHandler}>
      {selectedStudent === null ? (
        <Heading as="h3" fontSize="1.2rem" color="gray.700" fontWeight="400">
          {'click this box to select'}
        </Heading>
      ) : (
        <Heading as="h1" fontSize="3rem">
          {selectedStudent?.studentName}
        </Heading>
      )}
      <IconButton
        icon={<Icon as={BiExpand} />}
        aria-label="expand"
        onClick={expandHandler}
        position="absolute"
        right=".2rem"
        bottom=".2rem"
        size="sm"
        border="1px solid black"
      />
      {/* <Heading as="h6" size="sm" position="absolute" bottom={0}>
        -click this box to select-
      </Heading> */}
    </NameDisplayBox>
  )
}

export default NameDisplayRegular
