import * as React from 'react'
import { NameDisplayBox } from 'styles'
import { Heading, IconButton, Icon, Flex } from '@chakra-ui/react'
import { BiExpand } from 'react-icons/bi'
import { NameDisplayProps } from 'interfacesAndTypes'
import StudentProfile from './StudentProfile'

const NameDisplayRegular: React.FC<NameDisplayProps> = ({
  selectedStudent,
  setFullScreenDisplayIsOpen,
  selectStudentAndStudentFactHandler,
  noStudentSelected,
}) => {
  const expandHandler = (e: React.SyntheticEvent) => {
    e.stopPropagation()
    setFullScreenDisplayIsOpen(true)
  }

  return (
    <NameDisplayBox onClick={selectStudentAndStudentFactHandler}>
      {selectedStudent === null || noStudentSelected ? (
        <Flex justify="center" align="center" height="calc(85vw + 7.3rem)" maxHeight="33rem">
          <Heading as="h3" fontSize="1.2rem" color="var(--grey-dark)" fontWeight="400">
            {'click "NEXT" to select'}
          </Heading>
        </Flex>
      ) : (
        <StudentProfile selectedStudent={selectedStudent} />
      )}
      {/* <IconButton
        icon={<Icon as={BiExpand} />}
        aria-label="expand"
        onClick={expandHandler}
        position="absolute"
        right="6.3rem"
        bottom="6rem"
        size="sm"
        border="1px solid var(--grey-dark)"
      /> */}
    </NameDisplayBox>
  )
}

export default NameDisplayRegular
