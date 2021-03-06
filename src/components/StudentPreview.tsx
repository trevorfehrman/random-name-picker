import * as React from 'react'
import { Flex, Heading } from '@chakra-ui/react'

interface IStudentToAdd {
  studentId: string
  studentName: string
}

type StudentPreviewProps = {
  studentName: string
  studentId: string
  selectedStudentsToAdd: IStudentToAdd[]
  setSelectedStudentsToAdd: React.Dispatch<React.SetStateAction<IStudentToAdd[]>>
}

const StudentPreview: React.FC<StudentPreviewProps> = ({
  studentName,
  studentId,
  selectedStudentsToAdd,
  setSelectedStudentsToAdd,
}) => {
  const [isSelected, setIsSelected] = React.useState(false)

  const selectHandler = () => {
    let updatedStudentsToAdd
    if (!isSelected) {
      updatedStudentsToAdd = [...selectedStudentsToAdd, { studentId, studentName }]
    } else {
      updatedStudentsToAdd = selectedStudentsToAdd.filter(student => {
        return student.studentId !== studentId
      })
    }
    setSelectedStudentsToAdd(updatedStudentsToAdd)
    setIsSelected(!isSelected)
  }

  return (
    <Flex
      align="center"
      justify="space-between"
      padding=".6rem"
      onClick={selectHandler}
      backgroundColor={isSelected ? 'tomato' : 'null'}
      marginTop="3px"
      borderRadius="5px"
      _hover={{ cursor: 'pointer' }}
    >
      <Heading as="h3" size="md">
        {studentName}
      </Heading>
    </Flex>
  )
}

export default StudentPreview
