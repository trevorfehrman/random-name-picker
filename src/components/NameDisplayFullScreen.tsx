import * as React from 'react'
import { Flex, Heading, Image } from '@chakra-ui/react'
import { IStudentInStudentGroup } from 'interfacesAndTypes'

type NameDisplayFullScreenProps = {
  selectedStudent: IStudentInStudentGroup | null
}
const NameDisplayFullScreen: React.FC<NameDisplayFullScreenProps> = ({ selectedStudent }) => {
  return (
    <Flex h="100%" w="100%" justify="center" align="center">
      {selectedStudent === null ? (
        <Heading as="h3" fontSize="3rem">
          {'click to select'}
        </Heading>
      ) : (
        <Flex direction="column" justify="space-evenly" alignItems="center">
          <Image borderRadius="3px" boxShadow="1px 4px 6px" w="60%" src={selectedStudent?.studentInfo.profilePic} />

          <Heading as="h2" fontSize="3rem">
            {selectedStudent?.studentInfo.studentName}
          </Heading>
          <Flex direction="column">
            <Heading as="h2" fontSize="1.5rem">
              Favorite Food:
            </Heading>
            <Heading as="h2" fontSize="2rem">
              {selectedStudent?.studentInfo.favoriteFood}
            </Heading>
          </Flex>
        </Flex>
      )}
    </Flex>
  )
}

export default NameDisplayFullScreen
