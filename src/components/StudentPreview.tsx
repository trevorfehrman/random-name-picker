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
    setIsSelected(true)
    const updatedStudentsToAdd = [...selectedStudentsToAdd, { studentId, studentName }]
    setSelectedStudentsToAdd(updatedStudentsToAdd)
  }

  return (
    <Flex
      align="center"
      justify="space-between"
      padding="10px"
      onClick={selectHandler}
      backgroundColor={isSelected ? 'aqua' : 'null'}
    >
      <Heading as="h3" size="md">
        {studentName}
      </Heading>
    </Flex>
  )
}

export default StudentPreview
