import * as React from 'react'
import { Heading, IconButton, Flex } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

type StudentProps = {
  studentName: string
  docId: string
}

const Student: React.FC<StudentProps> = ({ studentName, docId }) => {
  const deleteHandler = () => {
    console.log('delete student from students collection and all instances from studentsInStudentGroups collection')
  }

  return (
    <Flex align="center" justify="space-between" padding="10px" border="1px solid black" w="100%" margin="auto">
      <Heading as="h3" size="md">
        {studentName}
      </Heading>
      <IconButton icon={<DeleteIcon />} aria-label="delete" onClick={deleteHandler} />
    </Flex>
  )
}

export default Student
