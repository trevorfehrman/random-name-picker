import * as React from 'react'
import { Checkbox, Heading } from '@chakra-ui/react'
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
      marginTop="3px"
      borderRadius="5px"
      spacing="1rem"
      _hover={{ cursor: 'pointer' }}
    >
      <Heading as="h3" size="md" textAlign="left">
        {studentName}
      </Heading>
    </Checkbox>
  )
}

export default StudentPreview
