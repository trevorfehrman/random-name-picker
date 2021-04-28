import * as React from 'react'
import { Checkbox, Flex, Heading } from '@chakra-ui/react'
import { IStudent, IStudentToAdd } from 'interfacesAndTypes'

type StudentPreviewProps = {
  student: IStudent
  selectedStudentsToAdd: IStudentToAdd[]
  setSelectedStudentsToAdd: React.Dispatch<React.SetStateAction<IStudentToAdd[]>>
  selectedStudents: string[]
  setSelectedStudents: React.Dispatch<React.SetStateAction<string[]>>
}

const StudentPreview: React.FC<StudentPreviewProps> = ({
  student,
  selectedStudentsToAdd,
  setSelectedStudentsToAdd,
  selectedStudents,
  setSelectedStudents,
}) => {
  const [isSelected, setIsSelected] = React.useState(false)

  const { studentName, studentFacts, profilePic, docId } = student

  const checkHandler = (e: React.SyntheticEvent) => {
    e.preventDefault()
    setSelectedStudentsToAdd(prevSelectedStudents => {
      if (prevSelectedStudents.findIndex(selectedStudent => selectedStudent.studentId === student.docId) >= 0) {
        return prevSelectedStudents.filter(selectedStudent => {
          return selectedStudent.studentId !== student.docId
        })
      } else {
        return [
          ...prevSelectedStudents,
          {
            studentId: docId,
            studentName,
            profilePic,
            studentFacts,
          },
        ]
      }
    })
  }

  return (
    <Checkbox
      display="flex"
      isChecked={selectedStudentsToAdd.findIndex(selectedStudent => selectedStudent.studentId === student.docId) >= 0}
      align="center"
      justify="space-between"
      padding=".6rem"
      onClick={checkHandler}
      backgroundColor={isSelected ? 'var(--main-color-very-light)' : 'null'}
      marginTop="3px"
      borderRadius="5px"
      spacing="1rem"
      _hover={{ cursor: 'pointer' }}
    >
      <Heading as="h3" size="md">
        {studentName}
      </Heading>
    </Checkbox>
  )
}

export default StudentPreview
