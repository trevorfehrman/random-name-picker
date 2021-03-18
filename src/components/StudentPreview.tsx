import * as React from 'react'
import { Flex, Heading } from '@chakra-ui/react'
import { IStudent, IStudentToAdd } from 'interfacesAndTypes'

type StudentPreviewProps = {
  student: IStudent
  selectedStudentsToAdd: IStudentToAdd[]
  setSelectedStudentsToAdd: React.Dispatch<React.SetStateAction<IStudentToAdd[]>>
}

const StudentPreview: React.FC<StudentPreviewProps> = ({
  student,
  selectedStudentsToAdd,
  setSelectedStudentsToAdd,
}) => {
  const [isSelected, setIsSelected] = React.useState(false)

  const { studentName, studentFacts, profilePic, docId } = student

  const selectHandler = () => {
    let updatedStudentsToAdd
    if (!isSelected) {
      updatedStudentsToAdd = [...selectedStudentsToAdd, { studentId: docId, studentName, profilePic, studentFacts }]
    } else {
      updatedStudentsToAdd = selectedStudentsToAdd.filter(student => {
        return student.studentId !== docId
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
      backgroundColor={isSelected ? 'blue.100' : 'null'}
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
