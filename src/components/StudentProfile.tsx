import * as React from 'react'
import { Flex, Heading, Image } from '@chakra-ui/react'
import { ISelectedStudent } from 'interfacesAndTypes'

type StudentProfileProps = {
  selectedStudent: ISelectedStudent
}
const StudentProfile: React.FC<StudentProfileProps> = ({ selectedStudent }) => {
  return (
    <Flex
      height="100%"
      direction="column"
      justify="flex-start"
      alignItems="center"
      w="100%"
      margin="auto"
      maxWidth="28rem"
      maxHeight="33rem"
    >
      <Heading as="h2" letterSpacing=".1em" fontSize="1.4rem" textAlign="center" alignSelf="flex-end">
        {selectedStudent?.studentInfo.studentName}
      </Heading>
      <Flex justifyContent="center" w="85vw" h="85vw" maxWidth="28rem" maxHeight="28rem">
        <Image
          boxSize="100%"
          borderRadius="5px"
          src={selectedStudent?.studentInfo.profilePic}
          position="relative"
          objectFit="cover"
          marginBottom=".2rem"
        />
      </Flex>
      <Flex
        direction="column"
        // w={{ base: '16rem', md: '26rem', lg: '33rem' }}
        justify="flex-start"
        padding="0"
        alignSelf="flex-start"
        alignItems="flex-start"
        minHeight="5.5rem"
      >
        {selectedStudent?.studentInfo?.selectedFact && (
          <Flex direction="column" justify="flex-start" alignItems="flex-start" lineHeight="28px">
            <Heading as="h2" fontSize="1.1rem" color="var(--main-color-medium)" width="100%">
              {selectedStudent.studentInfo.selectedFact.title}
            </Heading>

            <Heading as="h2" fontSize="1.5rem" letterSpacing=".05em">
              {selectedStudent.studentInfo.selectedFact.value}
            </Heading>
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export default StudentProfile
