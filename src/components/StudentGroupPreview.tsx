import * as React from 'react'
import { Flex, Heading, Box, Checkbox } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { useHistory } from 'react-router-dom'

import 'firebase/firestore'
import { useStudentsInThisStudentGroup } from 'helpers/firestoreHooks'

const StudentGroupContainer = styled.div`
  border: 1px solid var(--grey-light);
  border-radius: 5px;
  width: 100%;
  margin: 1.1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s;
  padding: 1.1rem 0.8rem;
  &:hover {
    cursor: pointer;
    border: 1px solid var(--main-color-medium);
  }
`

type StudentGroupProps = {
  studentGroupId: string
  studentGroupName: string
  managerIsOpen: boolean
  setSelectedToDelete: React.Dispatch<React.SetStateAction<string[]>>
  selectedToDelete: string[]
  thisIsTheOnlyStudentGroup: boolean
  setThereIsOneGroupWithNoStudents: React.Dispatch<React.SetStateAction<boolean>>
}

const StudentGroup: React.FC<StudentGroupProps> = ({
  studentGroupId,
  studentGroupName,
  managerIsOpen,
  selectedToDelete,
  setSelectedToDelete,
  thisIsTheOnlyStudentGroup,
  setThereIsOneGroupWithNoStudents,
}) => {
  const { studentsInThisStudentGroupDocuments } = useStudentsInThisStudentGroup(studentGroupId)

  const history = useHistory()

  const thereAreNoStudentsInThisGroup = studentsInThisStudentGroupDocuments?.length === 0

  React.useEffect(() => {
    console.log('ran')
    if (thereAreNoStudentsInThisGroup && thisIsTheOnlyStudentGroup) {
      setThereIsOneGroupWithNoStudents(true)
    } else {
      setThereIsOneGroupWithNoStudents(false)
    }
  }, [setThereIsOneGroupWithNoStudents, thereAreNoStudentsInThisGroup, thisIsTheOnlyStudentGroup])

  const openStudentGroupHandler = () => {
    history.push(`/student-group/${studentGroupId}`)
  }

  const checkHandler = () => {
    setSelectedToDelete(prevSelectedToDelete => {
      console.log(prevSelectedToDelete.includes(studentGroupId))
      if (prevSelectedToDelete.includes(studentGroupId)) {
        return prevSelectedToDelete.filter(studentGroup => studentGroup !== studentGroupId)
      } else return [...prevSelectedToDelete, studentGroupId]
    })
  }

  return (
    <>
      <StudentGroupContainer
        className={thisIsTheOnlyStudentGroup && thereAreNoStudentsInThisGroup ? 'bounce' : ''}
        onClick={
          managerIsOpen
            ? () => {
                return
              }
            : openStudentGroupHandler
        }
      >
        <Flex justify="flex-start" alignItems="center">
          {managerIsOpen ? (
            <Checkbox
              marginRight="1rem"
              border="1px solid var(--main-color-light)"
              borderRadius="3px"
              isChecked={selectedToDelete.includes(studentGroupId)}
              onChange={checkHandler}
            />
          ) : null}
          <Flex direction="column">
            <Heading as="h2" fontSize="1.4rem" paddingBottom=".8rem">
              {studentGroupName}
            </Heading>
            <Box
              fontSize="var(--font-size-small)"
              color="var(--white)"
              bg="var(--main-color-medium)"
              opacity=".9"
              padding=".2rem .3rem"
              borderRadius="3px"
              textAlign="center"
              width="7.3rem"
              textTransform="uppercase"
            >
              {studentsInThisStudentGroupDocuments?.length}{' '}
              {studentsInThisStudentGroupDocuments?.length === 1 ? 'student' : 'students'}
            </Box>
          </Flex>
        </Flex>
      </StudentGroupContainer>
    </>
  )
}

export default StudentGroup
