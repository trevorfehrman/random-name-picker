import { Image } from '@chakra-ui/image'
import { Box, Flex, Heading, Checkbox } from '@chakra-ui/react'
import { IStudentInStudentGroup } from 'interfacesAndTypes'
import React, { SetStateAction } from 'react'
import { useFirebaseImageUrl } from 'helpers/firestoreHooks'

type StudentToManageProps = {
  student: IStudentInStudentGroup
  onCheck: React.Dispatch<SetStateAction<string[]>>
  selectedStudents: string[]
}

const StudentToManage: React.FC<StudentToManageProps> = ({ student, onCheck, selectedStudents }) => {
  const imageUrl = useFirebaseImageUrl(student.studentInfo)

  const checkHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
    onCheck(prevSelectedStudents => {
      if (prevSelectedStudents.includes(student.docId)) {
        return prevSelectedStudents.filter(id => {
          return id !== student.docId
        })
      } else {
        return [...prevSelectedStudents, student.docId]
      }
    })
  }

  return (
    <Checkbox onClick={checkHandler} isChecked={selectedStudents.includes(student.docId)} colorScheme="blue">
      <Flex margin="1rem .5rem" width="100%" alignItems="center">
        <Box w="4rem" h="4rem">
          <Image src={imageUrl} borderRadius="50%" boxSize="100%" fit="cover" />
        </Box>
        <Heading as="h2" fontSize="1.25rem" marginLeft="1rem" letterSpacing=".05rem" textAlign="left">
          {student.studentInfo.studentName}
        </Heading>
      </Flex>
    </Checkbox>
  )
}

export default StudentToManage
