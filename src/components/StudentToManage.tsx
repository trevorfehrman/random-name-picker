import { Image } from '@chakra-ui/image'
import { Box, Flex, Heading, Checkbox } from '@chakra-ui/react'
import { IStudentInStudentGroup } from 'interfacesAndTypes'
import React from 'react'

type StudentToManageProps = {
  student: IStudentInStudentGroup
}

const StudentToManage: React.FC<StudentToManageProps> = ({ student }) => {
  return (
    <Flex margin="1rem .5rem" width="100%" alignItems="center">
      <Checkbox marginRight="1rem"></Checkbox>
      <Box w="4rem" h="4rem">
        <Image src={student.studentInfo.profilePic} borderRadius="50%" boxSize="100%" fit="cover" />
      </Box>
      <Heading as="h2" fontSize="1.25rem" marginLeft="1rem" letterSpacing=".05rem">
        {student.studentInfo.studentName}
      </Heading>
    </Flex>
  )
}

export default StudentToManage
