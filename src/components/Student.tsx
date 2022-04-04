import * as React from 'react'
import { Flex, Heading, Checkbox, Button } from '@chakra-ui/react'
// import { DeleteIcon } from '@chakra-ui/icons'
import { StudentContainer } from 'styles'
import { useHistory } from 'react-router-dom'
import { Image } from '@chakra-ui/react'
import { IStudent } from 'interfacesAndTypes'

type StudentProps = {
  student: IStudent
  managerIsOpen: boolean
  selectedToDelete: string[]
  setSelectedToDelete: React.Dispatch<React.SetStateAction<string[]>>
}

const Student: React.FC<StudentProps> = ({ student, managerIsOpen, selectedToDelete, setSelectedToDelete }) => {
  const history = useHistory()

  // TODO if the last unselected student gets deleted from a group the selected status of
  // the remaining students in that group needs to be reset

  const openEditStudentHandler = () => {
    history.push(`/edit-student/${student.docId}`)
  }

  const checkHandler = () => {
    console.log(student.docId)
    setSelectedToDelete(prevSelectedToDelete => {
      console.log(prevSelectedToDelete.includes(student.docId))
      if (prevSelectedToDelete.includes(student.docId)) {
        return prevSelectedToDelete.filter(studentId => studentId !== student.docId)
      } else return [...prevSelectedToDelete, student.docId]
    })
  }

  return (
    <>
      <StudentContainer
        onClick={
          managerIsOpen
            ? () => {
                return
              }
            : openEditStudentHandler
        }
      >
        <Flex align="center">
          {managerIsOpen ? (
            <Checkbox
              border="1px solid var(--main-color-light)"
              borderRadius="3px"
              marginRight="1rem"
              isChecked={selectedToDelete.includes(student.docId)}
              onChange={checkHandler}
            />
          ) : null}
          <Image
            src={student?.profilePic}
            fit="cover"
            height="4.5rem"
            w="4.5rem"
            borderRadius="50%"
            marginRight="1.2rem"
          />
          <Heading as="h3" size="md">
            {student?.studentName}
          </Heading>
        </Flex>
      </StudentContainer>
    </>
  )
}

export default Student
