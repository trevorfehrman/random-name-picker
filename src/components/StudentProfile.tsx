import * as React from 'react'
import { Flex, Heading, Image } from '@chakra-ui/react'
import { ISelectedStudent } from 'interfacesAndTypes'

type StudentProfileProps = {
  selectedStudent: ISelectedStudent
}
const StudentProfile: React.FC<StudentProfileProps> = ({ selectedStudent }) => {
  return (
    <Flex
      height={{ base: '19rem', sm: 'null' }}
      direction={{ base: 'column', sm: 'row' }}
      justify="center"
      alignItems="center"
      w="100%"
    >
      <Flex w="50%" justifyContent={{ base: 'center', md: 'flex-end' }}>
        <Image
          boxSize={{ base: '12rem', sm: '17rem', md: '20rem', lg: '29rem' }}
          minW={{ base: '12rem', sm: '17', md: '20rem', lg: '29rem' }}
          borderRadius="3px"
          boxShadow="1px 4px 6px rgba(0,0,0, 0.6)"
          src={selectedStudent?.studentInfo.profilePic}
          position="relative"
          objectFit="cover"
          marginBottom={{ base: '.2rem', md: '0' }}
        />
      </Flex>
      <Flex
        direction="column"
        // w={{ base: '16rem', md: '26rem', lg: '33rem' }}
        w={{ base: '12rem', md: '50%' }}
        height="50%"
        align={{ base: 'center', sm: 'flex-start' }}
        justify={{ base: 'flex-start', md: 'space-evenly' }}
        padding={{ base: '0', sm: '0 0 0 3rem' }}
      >
        <Heading
          as="h2"
          fontSize={{ base: '2rem', sm: '2.5rem', md: '4rem', lg: '5.5rem' }}
          margin={{ base: '.5rem 0', md: '0' }}
          textAlign={{ base: 'center', sm: 'left' }}
        >
          {selectedStudent?.studentInfo.studentName}
        </Heading>
        {selectedStudent?.studentInfo.selectedFact && selectedStudent?.studentInfo.selectedFact.value && (
          <Flex direction="column" justify="center" alignItems={{ base: 'center', sm: 'flex-start' }} w="100%">
            <Heading as="h2" fontSize={{ base: '1rem', md: '1.6rem', lg: '2.1rem' }} color="var(--main-color-medium)">
              {selectedStudent.studentInfo.selectedFact.title}
            </Heading>

            <Heading
              as="h2"
              fontSize={{ base: '1.3rem', md: '2.2rem', lg: '2.9rem' }}
              textAlign={{ base: 'center', sm: 'left' }}
            >
              {selectedStudent?.studentInfo.selectedFact.value}
            </Heading>
          </Flex>
        )}
      </Flex>
    </Flex>
  )
}

export default StudentProfile
